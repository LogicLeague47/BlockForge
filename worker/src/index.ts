// BlockForge API (Cloudflare Worker) — replaces the Render backend.
// HTTP API surface only; the game client + portal talk to this worker.
// Secrets (wrangler secret put): ELEVENLABS_API_KEY, GEMINI_API_KEY,
// BAN_SYNC_SECRET, GITHUB_CLIENT_ID/SECRET, GOOGLE_CLIENT_ID/SECRET.

import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { mcDevice, mcPollOnce, mcRefreshToken, runChain } from './mc';
import { icLookupKey, icEmojiFor } from './ic';
import { IC_PATCH } from './ic-patch';

interface Env {
  DB: D1Database;
  KV: KVNamespace;
  R2_UPLOADS: R2Bucket;
  R2_IC: R2Bucket;
  MC_CLIENT_ID: string;
  ELEVENLABS_VOICE_ID: string;
  ELEVENLABS_API_KEY?: string;
  GEMINI_API_KEY?: string;
  BAN_SYNC_SECRET?: string;
  GITHUB_CLIENT_ID?: string;
  GITHUB_CLIENT_SECRET?: string;
  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRET?: string;
  OWNER_USERNAME?: string;
  DEV_USERS?: string;
}

const app = new Hono<{ Bindings: Env }>();
app.use('*', cors({ origin: '*', allowMethods: ['GET', 'POST', 'OPTIONS'], allowHeaders: ['Content-Type', 'x-bf-name', 'x-bf-pass', 'x-bf-identity-type', 'x-bf-identity-id', 'x-bf-filename', 'x-ban-secret'] }));

// ─── helpers ─────────────────────────────────────────────────────────
const te = new TextEncoder();
const td = new TextDecoder();

function clientIp(c: any): string {
  return c.req.header('cf-connecting-ip') || (c.req.header('x-forwarded-for') || '').split(',')[0].trim() || '?';
}

// Per-route per-IP per-minute rate limit (KV-backed).
async function rateLimit(env: Env, route: string, ip: string, perMin: number): Promise<boolean> {
  try {
    const min = Math.floor(Date.now() / 60000);
    const key = `rl:${route}:${ip}:${min}`;
    const cur = Number((await env.KV.get(key)) || 0);
    if (cur >= perMin) return false;
    await env.KV.put(key, String(cur + 1), { expirationTtl: 70 });
    return true;
  } catch { return true; /* fail open on KV errors */ }
}

async function readJson(c: any, max = 8192): Promise<any> {
  try {
    const t = await c.req.text();
    if (!t || t.length > max) return {};
    return JSON.parse(t);
  } catch { return {}; }
}

async function sha1hex(s: string): Promise<string> {
  const h = await crypto.subtle.digest('SHA-1', te.encode(s));
  return [...new Uint8Array(h)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function randHex(n: number): string {
  const a = new Uint8Array(n);
  crypto.getRandomValues(a);
  return [...a].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function b64urlEncode(buf: ArrayBuffer): string {
  const s = btoa(String.fromCharCode(...new Uint8Array(buf)));
  return s.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function b64urlToBytes(s: string): Uint8Array {
  s = s.replace(/-/g, '+').replace(/_/g, '/');
  while (s.length % 4) s += '=';
  const bin = atob(s);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

function safeName(s: string, max = 16): string {
  return String(s || '').replace(/[^a-zA-Z0-9_]/g, '').slice(0, max) || 'Player';
}

function htmlEsc(s: string): string {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function oauthPage(provider: string, username: string, error: string | null, origin: string, providerId: string, linked: boolean): string {
  const data = JSON.stringify({ provider, username, error, providerId, linked: !!linked }).replace(/<\//g, '<\\/').replace(/<!--/g, '<\\!--');
  return `<html><body><script>(function(){ try { window.opener.postMessage(${data}, '${htmlEsc(origin)}'); } catch(e){} window.close(); })();</script><p>${error ? 'Auth failed' : 'Logged in as ' + htmlEsc(username || 'Guest')}. Close this window.</p></body></html>`;
}

// ─── accounts (D1) ───────────────────────────────────────────────────
// Fresh registry on the cutover: hashes are PBKDF2-SHA256 (Workers has no
// scrypt, which the old Node server used — old password hashes can't be
// verified here, so accounts were re-created).
async function pbkdf(password: string, saltHex: string): Promise<string> {
  const salt = new Uint8Array(saltHex.match(/../g)!.map((h) => parseInt(h, 16)));
  const key = await crypto.subtle.importKey('raw', te.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations: 100000 }, key, 256);
  return [...new Uint8Array(bits)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function getAccount(env: Env, username: string): Promise<any | null> {
  return env.DB.prepare('SELECT username, hash, salt, role, tag, identities FROM accounts WHERE username = ?').bind(username).first();
}

async function findByIdentity(env: Env, provider: string, providerId: string): Promise<string | null> {
  if (!provider || !providerId) return null;
  const { results } = await env.DB.prepare('SELECT username, identities FROM accounts').all();
  for (const r of results || []) {
    try {
      const ids = JSON.parse((r as any).identities || '{}');
      if (ids && ids[provider] === providerId) return (r as any).username;
    } catch { /* skip */ }
  }
  return null;
}

// mode: 'login' | 'register' | undefined (undefined = login-or-create, like join-time auth).
async function authAccount(env: Env, username: string, password: string, mode?: string): Promise<{ ok: boolean; username?: string; reason?: string }> {
  username = String(username || '');
  password = String(password || '');
  if (!username || !password) return { ok: false, reason: 'Username and password required.' };
  if (username.length < 2 || username.length > 16) return { ok: false, reason: 'Username must be 2-16 characters.' };
  if (!/^[a-zA-Z0-9_]+$/.test(username)) return { ok: false, reason: 'Username may only contain letters, numbers, and underscores.' };
  if (password.length < 3) return { ok: false, reason: 'Password must be at least 3 characters.' };
  const existing = await getAccount(env, username);
  if (mode === 'register') {
    if (existing) return { ok: false, reason: 'Username already taken. Please log in.' };
    const salt = randHex(16);
    const hash = await pbkdf(password, salt);
    await env.DB.prepare("INSERT INTO accounts (username, hash, salt, role) VALUES (?, ?, ?, 'player')").bind(username, hash, salt).run();
    return { ok: true, username };
  }
  if (!existing) {
    if (mode === 'login') return { ok: false, reason: 'Account not found. Please create one.' };
    const salt = randHex(16);
    const hash = await pbkdf(password, salt);
    await env.DB.prepare("INSERT INTO accounts (username, hash, salt, role) VALUES (?, ?, ?, 'player')").bind(username, hash, salt).run();
    return { ok: true, username };
  }
  const hash = await pbkdf(password, existing.salt);
  if (hash !== existing.hash) return { ok: false, reason: 'Incorrect password.' };
  return { ok: true, username: existing.username };
}

function resolveRole(env: Env, username: string, dbRole?: string): string {
  if (dbRole && dbRole !== 'player') return dbRole;
  const devs = String(env.DEV_USERS || '').split(',').map((s) => s.trim().toLowerCase()).filter(Boolean);
  if (username && devs.includes(username.toLowerCase())) return 'dev';
  if (env.OWNER_USERNAME && username === env.OWNER_USERNAME) return 'owner';
  return dbRole || 'player';
}

function isNewsPoster(role: string | null): boolean {
  return role === 'dev' || role === 'gamedev' || role === 'owner';
}

// Accepts password login OR linked identity (mirrors galleryAuth).
async function linkedOrPassword(env: Env, name: string, pass: string, idType: string, idId: string): Promise<{ username: string; role: string } | null> {
  if (name && pass) {
    const a = await authAccount(env, name, pass, 'login');
    if (a.ok && a.username) {
      const acc = await getAccount(env, a.username);
      return { username: a.username, role: resolveRole(env, a.username, acc?.role) };
    }
  }
  if (idType && idId) {
    const linked = await findByIdentity(env, idType, idId);
    if (linked) {
      const acc = await getAccount(env, linked);
      return { username: linked, role: resolveRole(env, linked, acc?.role) };
    }
  }
  return null;
}

// ─── CrazyGames JWT verify ───────────────────────────────────────────
let _cgKey: CryptoKey | null = null;
let _cgKeyAt = 0;
async function cgPublicKey(): Promise<CryptoKey> {
  if (_cgKey && Date.now() - _cgKeyAt < 3600000) return _cgKey;
  const r = await fetch('https://sdk.crazygames.com/publicKey.json', { signal: AbortSignal.timeout(10000) });
  if (!r.ok) throw new Error('public key fetch failed');
  const j: any = await r.json();
  if (!j || !j.publicKey) throw new Error('no publicKey');
  _cgKey = await crypto.subtle.importKey('jwk', j.publicKey, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify']);
  _cgKeyAt = Date.now();
  return _cgKey;
}

async function verifyCgToken(token: string): Promise<{ userId: string; username: string } | null> {
  try {
    if (!token || typeof token !== 'string' || token.split('.').length !== 3) return null;
    const [h, p, s] = token.split('.');
    const key = await cgPublicKey();
    const ok = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', key, b64urlToBytes(s), te.encode(h + '.' + p));
    if (!ok) { _cgKey = null; return null; }
    const payload = JSON.parse(td.decode(b64urlToBytes(p)));
    if (!payload || !payload.userId) return null;
    if (payload.exp && Date.now() / 1000 > payload.exp + 60) return null;
    return { userId: String(payload.userId), username: payload.username || '' };
  } catch { return null; }
}

// ─── health ──────────────────────────────────────────────────────────
app.get('/', (c) => c.json({ status: 'ok', service: 'blockforge-api' }));
app.get('/health', (c) => c.json({ status: 'ok', service: 'blockforge-api' }));
app.get('/ping', (c) => c.json({ status: 'ok' }));

// ─── Java Bridge: Microsoft verification ─────────────────────────────
app.post('/api/mc-device', async (c) => {
  if (!(await rateLimit(c.env, 'device', clientIp(c), 10))) return c.json({ ok: false, reason: 'Slow down.' }, 429);
  try {
    const r = await mcDevice(c.env.MC_CLIENT_ID || '0000000048183522');
    if (!r.ok) return c.json(r, 502);
    return c.json({ ok: true, ...r });
  } catch { return c.json({ ok: false, reason: 'Verification failed.' }, 500); }
});

app.post('/api/mc-poll', async (c) => {
  if (!(await rateLimit(c.env, 'poll', clientIp(c), 40))) return c.json({ ok: false, reason: 'Slow down.' }, 429);
  const body = await readJson(c, 2048);
  const deviceCode = String((body && body.device_code) || '');
  if (!deviceCode || deviceCode.length > 1024) return c.json({ ok: false, reason: 'Missing device code.' }, 400);
  try {
    const p = await mcPollOnce(c.env.MC_CLIENT_ID || '0000000048183522', deviceCode);
    if ('pending' in p) return c.json({ ok: true, done: false });
    if ('failed' in p) return c.json({ ok: true, done: false, failed: true, reason: p.reason });
    const ch = await runChain(p.access);
    if (ch.reason) return c.json({ ok: true, done: false, failed: true, reason: ch.reason });
    return c.json({ ok: true, done: true, ...ch.data, msRefresh: p.refresh || undefined });
  } catch { return c.json({ ok: false, reason: 'Verification failed.' }, 500); }
});

app.post('/api/mc-refresh', async (c) => {
  if (!(await rateLimit(c.env, 'refresh', clientIp(c), 10))) return c.json({ ok: false, reason: 'Slow down.' }, 429);
  const body = await readJson(c, 4096);
  const rt = String((body && body.refresh_token) || '');
  if (!rt || rt.length > 4096) return c.json({ ok: false, reason: 'Missing refresh token.' }, 400);
  try {
    const p = await mcRefreshToken(c.env.MC_CLIENT_ID || '0000000048183522', rt);
    if ('failed' in p) return c.json({ ok: true, done: false, failed: true, reason: p.reason });
    if ('pending' in p) return c.json({ ok: true, done: false });
    const ch = await runChain(p.access);
    if (ch.reason) return c.json({ ok: true, done: false, failed: true, reason: ch.reason });
    return c.json({ ok: true, done: true, ...ch.data, msRefresh: p.refresh || rt });
  } catch { return c.json({ ok: false, reason: 'Verification failed.' }, 500); }
});

// ─── Java Bridge: server list ping ───────────────────────────────────
// Workers can't open raw TCP sockets, so the ping runs through the public
// mcsrvstat API server-side and is re-shaped to our contract. SSRF guard:
// hostname rules + private-literal refusal (same as the old backend).
function isPrivateLiteral(host: string): boolean {
  if (/^(localhost|.*\.localhost|.*\.local|.*\.internal)$/i.test(host)) return true;
  const v4 = host.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
  if (v4) {
    const [, a, b] = v4.map(Number);
    if (a === 10 || a === 127 || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) || (a === 169 && b === 254) || a === 0) return true;
    return false;
  }
  if (/^(::1|fc|fd|fe80)/i.test(host)) return true;
  return false;
}

function cleanMotd(s: string): string {
  return String(s || '').replace(/§[0-9a-fk-or]/g, '').slice(0, 200);
}

app.post('/api/mc-ping', async (c) => {
  if (!(await rateLimit(c.env, 'ping', clientIp(c), 20))) return c.json({ ok: false, reason: 'Slow down.' }, 429);
  const body = await readJson(c, 1024);
  let host = String((body && body.host) || '').trim().toLowerCase();
  let port = parseInt(body && body.port, 10);
  if (!port || port < 1 || port > 65535) port = 25565;
  if (!host || host.length > 253 || !/^[a-z0-9.-]+$/.test(host)) {
    return c.json({ ok: true, online: false, reason: 'Bad address.' });
  }
  if (isPrivateLiteral(host)) return c.json({ ok: true, online: false, reason: 'Private address refused.' });
  try {
    const target = port === 25565 ? host : host + ':' + port;
    const r = await fetch('https://api.mcsrvstat.us/3/' + encodeURIComponent(target), { signal: AbortSignal.timeout(10000) });
    const j: any = await r.json();
    if (!j || !j.online) return c.json({ ok: true, online: false, reason: 'offline.' });
    let motd = '';
    try {
      const m = j.motd || {};
      const parts = m.clean || m.raw || [];
      motd = cleanMotd(Array.isArray(parts) ? parts.join(' ') : String(parts));
    } catch { /* keep empty */ }
    return c.json({
      ok: true, online: true,
      version: typeof j.version === 'string' ? j.version : '',
      playersOnline: (j.players && j.players.online) || 0,
      playersMax: (j.players && j.players.max) || 0,
      motd,
      icon: typeof j.icon === 'string' ? j.icon.slice(0, 20000) : null,
    });
  } catch { return c.json({ ok: true, online: false, reason: 'Unreachable.' }); }
});

// ─── NPC voices (ElevenLabs TTS proxy) ───────────────────────────────
app.post('/api/tts', async (c) => {
  const body = await readJson(c, 4096);
  let text = String((body && body.text) || '').replace(/[𐀀-🫏☀-➿⬀-⯿️-️]/gu, '').trim();
  if (!text || text.length > 280) return c.json({ ok: false, reason: 'Text must be 1-280 characters.' }, 400);
  if (!(await rateLimit(c.env, 'tts', clientIp(c), 20))) return c.json({ ok: false, reason: 'Voice is resting. Try again shortly.' }, 429);
  const apiKey = c.env.ELEVENLABS_API_KEY || '';
  if (!apiKey) return c.json({ ok: false, reason: 'voice-unavailable' }, 503);
  let voice = String((body && body.voice) || c.env.ELEVENLABS_VOICE_ID || 'EXAVITQu4vr4xnSDxMaL');
  if (!/^[A-Za-z0-9]{20}$/.test(voice)) voice = 'EXAVITQu4vr4xnSDxMaL';
  const cacheKey = 'tts:' + (await sha1hex(voice + '|' + text));
  try {
    const cached = await c.env.KV.get(cacheKey);
    if (cached) {
      const bin = b64urlToBytes(cached.replace(/-/g, '+').replace(/_/g, '/'));
      return new Response(bin, { headers: { 'Content-Type': 'audio/mpeg', 'Cache-Control': 'public, max-age=86400', 'X-TTS-Cache': 'hit', 'Access-Control-Allow-Origin': '*' } });
    }
  } catch { /* miss → synthesize */ }
  const up = await fetch('https://api.elevenlabs.io/v1/text-to-speech/' + voice, {
    method: 'POST',
    headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, model_id: 'eleven_turbo_v2_5', output_format: 'mp3_44100_64' }),
    signal: AbortSignal.timeout(25000),
  });
  if (!up.ok) return c.json({ ok: false, reason: 'Voice service said no.' }, 502);
  const buf = new Uint8Array(await up.arrayBuffer());
  if (!buf.length || buf.length > 1048576) return c.json({ ok: false, reason: 'Bad voice audio.' }, 502);
  try {
    let bin = '';
    for (let i = 0; i < buf.length; i++) bin += String.fromCharCode(buf[i]);
    await c.env.KV.put(cacheKey, btoa(bin), { expirationTtl: 86400 });
  } catch { /* cache best-effort */ }
  return new Response(buf, { headers: { 'Content-Type': 'audio/mpeg', 'Cache-Control': 'public, max-age=86400', 'X-TTS-Cache': 'miss', 'Access-Control-Allow-Origin': '*' } });
});

// ─── Live server directory ───────────────────────────────────────────
const SERVER_TTL = 90 * 1000;
app.get('/api/servers', async (c) => {
  let list: any[] = [];
  try { list = JSON.parse((await c.env.KV.get('srv:list')) || '[]'); } catch { list = []; }
  const now = Date.now();
  const out = list.map((s: any) => ({
    id: s.id, name: s.name, address: s.address, official: !!s.official,
    version: s.version || '', description: s.description || '',
    online: now - (s.lastSeen || 0) <= SERVER_TTL,
    players: now - (s.lastSeen || 0) <= SERVER_TTL ? s.players || 0 : 0,
    lastSeen: s.lastSeen,
  }));
  out.sort((a: any, b: any) => Number(b.official) - Number(a.official) || Number(b.online) - Number(a.online));
  return c.json(out);
});

app.post('/api/servers', async (c) => {
  const d = await readJson(c, 4096);
  if (!d || !d.address) return c.json({ ok: false, reason: 'address required' }, 400);
  try {
    let list: any[] = [];
    try { list = JSON.parse((await c.env.KV.get('srv:list')) || '[]'); } catch { list = []; }
    const now = Date.now();
    const id = String(d.id || d.address).slice(0, 128);
    const prev = list.find((s: any) => s.id === id);
    const rec = {
      id,
      name: String(d.name || id).slice(0, 48),
      address: String(d.address).slice(0, 256),
      players: Math.max(0, (d.players | 0) || 0),
      official: !!d.official,
      version: String(d.version || '').slice(0, 32),
      description: String(d.description || '').slice(0, 200),
      lastSeen: now,
      createdAt: (prev && prev.createdAt) || now,
    };
    list = [rec, ...list.filter((s: any) => s.id !== id && now - (s.lastSeen || 0) < 3600000)].slice(0, 200);
    await c.env.KV.put('srv:list', JSON.stringify(list));
    return c.json({ ok: true });
  } catch { return c.json({ ok: false, reason: 'store failed' }, 500); }
});

// ─── Community mods ──────────────────────────────────────────────────
function parseModManifest(code: string): any {
  if (typeof code !== 'string' || !code.includes('export const manifest')) throw new Error('Not a BlockForge mod: missing "export const manifest".');
  const m = code.match(/export\s+const\s+manifest\s*=\s*\{([\s\S]*?)\};/);
  if (!m) throw new Error('Could not parse manifest.');
  const body = m[1];
  const field = (name: string): string | undefined => {
    const r = new RegExp(name + '\\s*:\\s*[\'"]([^\'"]*)[\'"]');
    const mm = body.match(r);
    return mm ? mm[1] : undefined;
  };
  const slug = (s: string) => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 48);
  const id = String(field('id') || slug(field('name')) || '').replace(/[^a-z0-9-]/gi, '');
  if (!id) throw new Error('Manifest needs an id or name.');
  return { id, name: field('name') || id, version: field('version') || '1.0', description: field('description') || '', author: field('author') || 'Unknown', icon: field('icon') || '📦' };
}

app.get('/api/mods/community', async (c) => {
  const { results } = await c.env.DB.prepare('SELECT id, name, version, description, author, icon, file, uploadedAt, updatedAt FROM mods ORDER BY updatedAt DESC LIMIT 200').all();
  return c.json(results || []);
});

app.post('/api/mods/upload', async (c) => {
  let code = '';
  try {
    const ct = c.req.header('content-type') || '';
    if (ct.includes('application/json')) {
      const b = await readJson(c, 512 * 1024 + 1024);
      code = String((b && (b.code || b.mod)) || '');
    } else {
      const t = await c.req.text();
      code = t.length > 512 * 1024 + 64 ? '' : t;
    }
  } catch { code = ''; }
  try {
    if (!code || code.length > 512 * 1024) throw new Error('Mod is empty or too large (max 512KB).');
    const meta = parseModManifest(code);
    const id = meta.id.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 48);
    if (!id) throw new Error('Invalid mod id.');
    const now = Date.now();
    const prev: any = await c.env.DB.prepare('SELECT uploadedAt FROM mods WHERE id = ?').bind(id).first();
    await c.env.R2_UPLOADS.put('community/' + id + '.bfmod', code, { httpMetadata: { contentType: 'text/plain; charset=utf-8' } });
    await c.env.DB.prepare('INSERT INTO mods (id, name, version, description, author, icon, file, uploadedAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET name=excluded.name, version=excluded.version, description=excluded.description, author=excluded.author, icon=excluded.icon, file=excluded.file, updatedAt=excluded.updatedAt')
      .bind(id, String(meta.name).slice(0, 80), String(meta.version).slice(0, 16), String(meta.description).slice(0, 500), String(meta.author).slice(0, 48), String(meta.icon).slice(0, 8), id + '.bfmod', (prev && prev.uploadedAt) || now, now).run();
    return c.json({ ok: true, mod: { id, name: meta.name, version: meta.version, description: meta.description, author: meta.author, icon: meta.icon, file: id + '.bfmod', uploadedAt: (prev && prev.uploadedAt) || now, updatedAt: now } });
  } catch (e: any) {
    return c.json({ ok: false, reason: (e && e.message) || 'Invalid request' }, 400);
  }
});

app.get('/api/mods/download/:id', async (c) => {
  const id = decodeURIComponent(c.req.param('id') || '').replace(/[^a-zA-Z0-9.-]/g, '').slice(0, 64);
  const obj = await c.env.R2_UPLOADS.get('community/' + id + '.bfmod');
  if (!obj) return c.json({ ok: false, reason: 'Mod not found' }, 404);
  return new Response(obj.body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Content-Disposition': `attachment; filename="${id}.bfmod"`,
      'Access-Control-Allow-Origin': '*',
    },
  });
});

// ─── Community gallery ───────────────────────────────────────────────
app.get('/api/gallery', async (c) => {
  try {
    const type = new URL(c.req.url).searchParams.get('type') === 'textures' ? 'textures' : 'skins';
    const { results } = await c.env.DB.prepare('SELECT name, data, uploader, date FROM gallery WHERE type = ? ORDER BY date DESC LIMIT 50').bind(type).all();
    return c.json({ ok: true, items: (results || []).map((r: any) => ({ name: r.name, data: r.data, uploader: r.uploader, date: r.date })) });
  } catch { return c.json({ ok: false, reason: 'Gallery unavailable.' }, 500); }
});

app.post('/api/gallery', async (c) => {
  const who = await linkedOrPassword(c.env, c.req.header('x-bf-name') || '', c.req.header('x-bf-pass') || '', c.req.header('x-bf-identity-type') || '', c.req.header('x-bf-identity-id') || '');
  if (!who) return c.json({ ok: false, reason: 'Log in to share with the community.' }, 403);
  const p = await readJson(c, 3 * 1024 * 1024);
  const type = p.type === 'textures' ? 'textures' : 'skins';
  const name = String(p.name || 'upload').slice(0, 64);
  const data = String(p.data || '');
  if (!/^data:image\/(png|jpeg|gif);base64,/.test(data) || data.length > 1500 * 1024 || data.length < 100) {
    return c.json({ ok: false, reason: 'That file is not a supported image.' }, 400);
  }
  try {
    await c.env.DB.prepare('INSERT INTO gallery (type, name, data, uploader, date) VALUES (?, ?, ?, ?, ?)').bind(type, name, data, who.username, Date.now()).run();
    await c.env.DB.prepare('DELETE FROM gallery WHERE type = ? AND id NOT IN (SELECT id FROM gallery WHERE type = ? ORDER BY date DESC LIMIT 100)').bind(type, type).run();
    return c.json({ ok: true });
  } catch { return c.json({ ok: false, reason: 'Invalid upload.' }, 400); }
});

// ─── News video upload (dev-only) + ranged serving ───────────────────
const VIDEO_EXTS = new Set(['.mp4', '.m4v', '.webm', '.mov', '.ogv']);
const MAX_UPLOAD_BYTES = 64 * 1024 * 1024;

app.post('/api/upload', async (c) => {
  if (!String(c.req.header('content-type') || '').toLowerCase().startsWith('video/')) {
    return c.json({ ok: false, reason: 'Only video files can be uploaded.' }, 400);
  }
  const who = await linkedOrPassword(c.env, c.req.header('x-bf-name') || '', c.req.header('x-bf-pass') || '', c.req.header('x-bf-identity-type') || '', c.req.header('x-bf-identity-id') || '');
  if (!who || !isNewsPoster(who.role)) return c.json({ ok: false, reason: 'You need Developer permissions to upload videos.' }, 403);
  const buf = new Uint8Array(await c.req.arrayBuffer());
  if (!buf.length) return c.json({ ok: false, reason: 'Empty upload.' }, 400);
  if (buf.length > MAX_UPLOAD_BYTES) return c.json({ ok: false, reason: 'Video is too large (max 64MB).' }, 413);
  const raw = String(c.req.header('x-bf-filename') || 'video.mp4');
  const dot = raw.lastIndexOf('.');
  const ext = (dot >= 0 ? raw.slice(dot) : '.mp4').toLowerCase();
  const fname = randHex(8) + (VIDEO_EXTS.has(ext) ? ext : '.mp4');
  await c.env.R2_UPLOADS.put('uploads/' + fname, buf, { httpMetadata: { contentType: 'video/' + (ext === '.mp4' || ext === '.m4v' ? 'mp4' : ext.slice(1)) } });
  const url = new URL(c.req.url);
  return c.json({ ok: true, url: url.origin + '/uploads/' + fname, size: buf.length });
});

app.get('/uploads/:fname', async (c) => {
  const fname = c.req.param('fname').replace(/[^a-zA-Z0-9._-]/g, '').slice(0, 64);
  if (!fname) return c.json({ error: 'Not found' }, 404);
  const range = c.req.header('range');
  const obj = await c.env.R2_UPLOADS.get('uploads/' + fname, range ? { range } : undefined);
  if (!obj) return c.json({ error: 'Not found' }, 404);
  const headers: Record<string, string> = { 'Content-Type': 'video/mp4', 'Accept-Ranges': 'bytes', 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'public, max-age=86400' };
  if (obj.range) {
    headers['Content-Range'] = `bytes ${obj.range.offset}-${obj.range.end}/${obj.size}`;
    return new Response(obj.body, { status: 206, headers });
  }
  return new Response(obj.body, { headers });
});

// ─── Global bans (sync feed for community hosts) ─────────────────────
app.get('/api/global-bans', async (c) => {
  const secret = c.env.BAN_SYNC_SECRET || '';
  if (!secret || c.req.header('x-ban-secret') !== secret) return c.json({ error: 'Forbidden' }, 403);
  let bans = {};
  try { bans = JSON.parse((await c.env.KV.get('bans')) || '{}'); } catch { bans = {}; }
  return c.json({ bans }, 200, { 'Cache-Control': 'no-store' });
});

app.post('/api/global-bans', async (c) => {
  const secret = c.env.BAN_SYNC_SECRET || '';
  if (!secret || c.req.header('x-ban-secret') !== secret) return c.json({ error: 'Forbidden' }, 403);
  const b = await readJson(c, 256 * 1024);
  await c.env.KV.put('bans', JSON.stringify((b && b.bans) || {}));
  return c.json({ ok: true });
});

// ─── YT Forge proxies (Invidious failover + embed hygiene) ───────────
const INVIDIOUS = [
  'https://invidious.materialio.us',
  'https://yewtu.be',
  'https://invidious.fdn.fr',
  'https://vid.puffyan.us',
  'https://invidious.nerdvpn.de',
];

async function invidious(path: string): Promise<{ body: string } | null> {
  let lastEmpty: string | null = null;
  for (const base of INVIDIOUS) {
    try {
      const r = await fetch(base + path, { signal: AbortSignal.timeout(6000) });
      const body = await r.text();
      if (body.length > 2000000) continue;
      let d: any = null;
      try { d = JSON.parse(body); } catch { continue; }
      if (Array.isArray(d) && d.length) return { body };
      if (Array.isArray(d)) { lastEmpty = body; continue; }
      if (d && typeof d === 'object') return { body };
    } catch { /* next instance */ }
  }
  return lastEmpty ? { body: lastEmpty } : null;
}

app.get('/api/yt-search', async (c) => {
  const qs = new URL(c.req.url).searchParams;
  const q = (qs.get('q') || '').trim();
  if (!q) return c.json({ error: 'Missing q param' }, 400);
  const clean = (v: string | null, re: RegExp) => (v && re.test(v) ? v : '');
  const sortBy = clean(qs.get('sort_by'), /^(relevance|rating|upload_date|view_count)$/);
  const date = clean(qs.get('date'), /^(hour|today|week|month|year)$/);
  const duration = clean(qs.get('duration'), /^(short|long)$/);
  const page = clean(qs.get('page'), /^[1-9][0-9]?$/);
  let url = '/api/v1/search?q=' + encodeURIComponent(q) + '&type=all';
  if (sortBy) url += '&sort_by=' + sortBy;
  if (date) url += '&date=' + date;
  if (duration) url += '&duration=' + duration;
  if (page) url += '&page=' + page;
  const hit = await invidious(url);
  if (!hit) return c.json({ error: 'All Invidious instances failed' }, 502);
  return new Response(hit.body, { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=300', 'Access-Control-Allow-Origin': '*' } });
});

app.get('/api/yt-channel', async (c) => {
  const qs = new URL(c.req.url).searchParams;
  const channelId = (qs.get('channelId') || '').trim();
  const playlistId = (qs.get('playlistId') || '').trim();
  const tab = (qs.get('tab') || 'info').trim();
  let path = '';
  if (playlistId) {
    if (!/^[A-Za-z0-9_-]{10,64}$/.test(playlistId)) return c.json({ error: 'Bad playlistId' }, 400);
    path = '/api/v1/playlists/' + playlistId;
  } else {
    if (!channelId) return c.json({ error: 'Missing channelId' }, 400);
    if (!/^[A-Za-z0-9_-]{1,64}$/.test(channelId)) return c.json({ error: 'Bad channelId' }, 400);
    if (!['info', 'videos', 'shorts', 'playlists'].includes(tab)) return c.json({ error: 'Bad tab' }, 400);
    path = tab === 'info' ? '/api/v1/channels/' + channelId : '/api/v1/channels/' + channelId + '/' + tab;
  }
  const hit = await invidious(path);
  if (!hit) return c.json({ error: 'All Invidious instances failed' }, 502);
  return new Response(hit.body, { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=300', 'Access-Control-Allow-Origin': '*' } });
});

app.get('/api/yt-embed', async (c) => {
  const vid = (new URL(c.req.url).searchParams.get('v') || '').trim();
  if (!vid || !/^[A-Za-z0-9_-]{11}$/.test(vid)) return c.json({ error: 'Invalid video ID' }, 400);
  try {
    const r = await fetch('https://www.youtube.com/oembed?url=' + encodeURIComponent('https://www.youtube.com/watch?v=' + vid) + '&format=json', { signal: AbortSignal.timeout(8000) });
    return c.json({ embeddable: r.status === 200 }, 200, { 'Cache-Control': 'public, max-age=3600' });
  } catch {
    return c.json({ embeddable: true }, 200, { 'Cache-Control': 'no-store' });
  }
});

const YT_HIDE_CSS = '<style>.ytp-watermark,.ytp-watermark.ytp-logo,[class*="ytp-logo"],[class*="youtube-logo"],.ytp-ce-element,.ytp-endscreen-content,.html5-endscreen,.ytp-cards-teaser,.ytp-show-cards-title,.ytp-cards-button,.ytp-chapters-container,.ytp-pause-overlay,.ytp-suggested-action,.ytp-spinner,.ytp-paid-content-overlay,.ytp-ad-overlay-container,.ytp-ad-text-overlay,.ytp-ad-image-overlay,.annotation,.annotation-link,.annotation-text,[class*="watermark"],[class*="endscreen"],[class*="annotation"]{display:none!important;visibility:hidden!important}</style>';
const YT_HIDE_JS = '<script>(function(){function hideBranding(){var s="ytp-watermark,.ytp-ce-element,.ytp-endscreen-content,.ytp-cards-teaser,.ytp-chapters-container,.ytp-pause-overlay,.html5-endscreen,.annotation";s.split(",").forEach(function(sel){try{document.querySelectorAll(sel).forEach(function(el){el.style.cssText="display:none!important;visibility:hidden!important"})}catch(e){}})}hideBranding();setInterval(hideBranding,1000);new MutationObserver(hideBranding).observe(document.body||document.documentElement,{childList:true,subtree:true});})();<\/script>';

app.get('/api/yt-proxy', async (c) => {
  const vid = (new URL(c.req.url).searchParams.get('v') || '').trim();
  if (!vid || !/^[A-Za-z0-9_-]{11}$/.test(vid)) return new Response('Invalid video ID', { status: 400 });
  try {
    const r = await fetch('https://www.youtube.com/embed/' + vid, {
      signal: AbortSignal.timeout(10000),
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36', 'Accept-Language': 'en-US,en;q=0.9' },
    });
    if (r.status >= 300 && r.status < 400) {
      return new Response(null, { status: r.status, headers: { Location: r.headers.get('location') || '' } });
    }
    if (r.status !== 200) return new Response('YouTube returned ' + r.status, { status: r.status });
    let body = await r.text();
    if (body.length > 500000) body = body.slice(0, 500000);
    body = body.replace(/"\/(player|s|base|ajax|embed|img|vi|results|generate_204)/g, '"https://www.youtube.com/$1');
    body = body.replace(/src="\/(player|s|base|ajax|embed|img|vi)/g, 'src="https://www.youtube.com/$1');
    body = body.replace(/href="\/(player|s|base|ajax|embed|img|vi)/g, 'href="https://www.youtube.com/$1');
    body = body.indexOf('</head>') !== -1 ? body.replace('</head>', YT_HIDE_CSS + YT_HIDE_JS + '</head>') : YT_HIDE_CSS + YT_HIDE_JS + body;
    return new Response(body, { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=3600', 'Access-Control-Allow-Origin': '*' } });
  } catch {
    return new Response('YouTube fetch failed', { status: 502 });
  }
});

// ─── InfiniteCraft dataset + AI fallback ─────────────────────────────
const IC_PATCH_MAP = new Map<string, { name: string; emoji: string }>();
const IC_PATCH_EMOJI = new Map<string, string>();
for (const [sk, name, emoji] of IC_PATCH) {
  if (!IC_PATCH_MAP.has(sk)) IC_PATCH_MAP.set(sk, { name, emoji });
  if (!IC_PATCH_EMOJI.has(name)) IC_PATCH_EMOJI.set(name, emoji);
}

async function icCacheGet(env: Env, sk: string): Promise<any | undefined> {
  try {
    const v = await env.KV.get('ic:' + sk);
    if (!v) return undefined;
    const o = JSON.parse(v);
    return o && o.name ? o : undefined;
  } catch { return undefined; }
}

async function icCacheSet(env: Env, sk: string, val: any): Promise<void> {
  try { await env.KV.put('ic:' + sk, JSON.stringify(val)); } catch { /* best effort */ }
}

async function icAskAI(env: Env, a: string, b: string): Promise<{ name: string; emoji: string } | null> {
  const key = env.GEMINI_API_KEY || '';
  if (!key) return null;
  const prompt = 'In the browser game Infinite Craft (neal.fun), combining two elements creates a new element. '
    + 'What does "' + a + '" + "' + b + '" make? Output ONLY a JSON object like '
    + '{"name": "...", "emoji": "one single emoji"}. No sentences, no preamble. Keep the name to 1-3 words.';
  try {
    const r = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseMimeType: 'application/json', maxOutputTokens: 500, temperature: 0.7 } }),
      signal: AbortSignal.timeout(25000),
    });
    const d: any = await r.json();
    const text = (d && d.candidates && d.candidates[0] && d.candidates[0].content && d.candidates[0].content.parts && d.candidates[0].content.parts[0] && d.candidates[0].content.parts[0].text) || '';
    const o = JSON.parse((text.match(/\{[\s\S]*\}/) || [text])[0].replace(/```json|```/g, '').trim());
    const name = String((o && o.name) || '').trim().slice(0, 40);
    const emoji = Array.from(String((o && o.emoji) || '').trim()).slice(0, 4).join('');
    if (!name || !emoji) return null;
    return { name, emoji };
  } catch { return null; }
}

app.get('/api/ic-lookup', async (c) => {
  const qs = new URL(c.req.url).searchParams;
  const a = (qs.get('a') || '').trim().slice(0, 80);
  const b = (qs.get('b') || '').trim().slice(0, 80);
  if (!a || !b) return c.json({ error: 'Missing a/b params' }, 400);
  const sk = [a, b].sort().join('+');
  const send = (result: any) => new Response(JSON.stringify({ result }), { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=3600', 'Access-Control-Allow-Origin': '*' } });
  if (IC_PATCH_MAP.has(sk)) return send(IC_PATCH_MAP.get(sk));
  try {
    const hit = await icLookupKey(c.env, sk);
    if (hit) return send(hit);
  } catch { /* fall through to AI */ }
  const cached = await icCacheGet(c.env, sk);
  if (cached) return send(cached);
  const ai = await icAskAI(c.env, a, b);
  if (ai) {
    await icCacheSet(c.env, sk, ai);
    await icCacheSet(c.env, 'name:' + ai.name, { name: ai.name, emoji: ai.emoji });
    return send(ai);
  }
  if (!c.env.GEMINI_API_KEY) return send(null);
  return c.json({ error: 'AI generation failed, try again' }, 502);
});

app.get('/api/ic-emojis', async (c) => {
  const qs = new URL(c.req.url).searchParams;
  let names = qs.getAll('n').map((s) => (s || '').trim().slice(0, 80)).filter(Boolean);
  if (!names.length && qs.get('names')) {
    names = qs.get('names')!.split(',').map((s) => (s || '').trim().slice(0, 80)).filter(Boolean);
  }
  names = names.slice(0, 200);
  const out: Record<string, string | null> = {};
  const need: string[] = [];
  for (const n of names) {
    if (IC_PATCH_EMOJI.has(n)) out[n] = IC_PATCH_EMOJI.get(n)!;
    else need.push(n);
  }
  for (const n of need) {
    try {
      const e = await icEmojiFor(c.env, n);
      if (e) { out[n] = e; continue; }
    } catch { /* cache fallback below */ }
    out[n] = null;
  }
  const missing = need.filter((n) => !out[n]);
  for (const n of missing) {
    const h = await icCacheGet(c.env, 'name:' + n);
    if (h && h.emoji) out[n] = h.emoji;
  }
  return new Response(JSON.stringify({ emojis: out }), { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=3600', 'Access-Control-Allow-Origin': '*' } });
});

// ─── CrazyGames identity ─────────────────────────────────────────────
app.post('/auth/cg-link', async (c) => {
  const body = await readJson(c, 8192);
  try {
    const verified = body.cgToken ? await verifyCgToken(body.cgToken) : null;
    if (!verified) return c.json({ ok: false, reason: 'CG verification failed. Refresh and try again.' });
    const cgId = verified.userId;
    const cgName = verified.username || body.cgUsername;
    let username = await findByIdentity(c.env, 'crazygames', cgId);
    if (!username) {
      const base = safeName(cgName || 'Player');
      let finalName = base;
      let counter = 1;
      while (await getAccount(c.env, finalName)) {
        finalName = Array.from(base).slice(0, 14).join('') + String(counter);
        counter++;
        if (counter > 100) { finalName = 'Player' + Date.now().toString(36); break; }
      }
      await c.env.DB.prepare("INSERT INTO accounts (username, hash, salt, role, identities) VALUES (?, '', '', 'player', ?)").bind(finalName, JSON.stringify({ crazygames: body.cgUserId || cgId })).run();
      username = finalName;
    }
    const linkToken = randHex(16);
    await c.env.KV.put('link:' + linkToken, JSON.stringify({ username, createdAt: Date.now() }), { expirationTtl: 600 });
    return c.json({ ok: true, linkToken, username });
  } catch { return c.json({ ok: false, reason: 'Invalid request' }); }
});

app.post('/auth/crazygames', async (c) => {
  const body = await readJson(c, 4096);
  try {
    const verified = body.cgToken ? await verifyCgToken(body.cgToken) : null;
    if (!verified) return c.json({ ok: false, reason: 'CG verification failed. Refresh and try again.' });
    const existing = await findByIdentity(c.env, 'crazygames', verified.userId);
    if (existing) {
      return c.json({ ok: true, username: existing, linked: true, provider: 'crazygames', providerId: verified.userId });
    }
    return c.json({ ok: true, username: safeName(verified.username || 'Player', 20), linked: false, provider: 'crazygames', providerId: verified.userId });
  } catch { return c.json({ ok: false, reason: 'Invalid request' }); }
});

// ─── OAuth (GitHub, Google) ──────────────────────────────────────────
const OAUTH: Record<string, { authUrl: string; tokenUrl: string; userUrl: string; scope: string; headers?: Record<string, string>; parse: (d: any) => { username: string; providerId: string } }> = {
  github: {
    authUrl: 'https://github.com/login/oauth/authorize',
    tokenUrl: 'https://github.com/login/oauth/access_token',
    userUrl: 'https://api.github.com/user',
    scope: 'read:user',
    headers: { Accept: 'application/json' },
    parse: (d: any) => ({ username: d.login, providerId: String(d.id) }),
  },
  google: {
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    userUrl: 'https://www.googleapis.com/oauth2/v2/userinfo',
    scope: 'openid profile email',
    parse: (d: any) => ({ username: d.name || d.email, providerId: d.id }),
  },
};

function oauthClient(env: Env, provider: string): { id: string; secret: string } {
  if (provider === 'github') return { id: env.GITHUB_CLIENT_ID || '', secret: env.GITHUB_CLIENT_SECRET || '' };
  return { id: env.GOOGLE_CLIENT_ID || '', secret: env.GOOGLE_CLIENT_SECRET || '' };
}

app.get('/auth/:provider', async (c) => {
  const provider = c.req.param('provider');
  const cfg = OAUTH[provider];
  const qs = new URL(c.req.url).searchParams;
  const creds = oauthClient(c.env, provider);
  if (!cfg || !creds.id) {
    return new Response(oauthPage(provider, 'Guest', 'OAuth not configured', '*', '', false), { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  }
  const gameOrigin = qs.get('origin') || '*';
  const linkToken = qs.get('linkToken') || '';
  const url = new URL(c.req.url);
  const redirectUri = `${url.origin}/auth/${provider}/callback`;
  const state = randHex(16);
  const verifierBytes = new Uint8Array(32);
  crypto.getRandomValues(verifierBytes);
  const verifier = b64urlEncode(verifierBytes.buffer);
  const challenge = b64urlEncode(await crypto.subtle.digest('SHA-256', te.encode(verifier)));
  await c.env.KV.put('oauth:' + state, JSON.stringify({ origin: gameOrigin, linkToken, verifier, createdAt: Date.now() }), { expirationTtl: 600 });
  const authUrl = `${cfg.authUrl}?client_id=${creds.id}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(cfg.scope)}&state=${state}&response_type=code&code_challenge=${challenge}&code_challenge_method=S256`;
  return c.redirect(authUrl, 302);
});

app.get('/auth/:provider/callback', async (c) => {
  const provider = c.req.param('provider');
  const cfg = OAUTH[provider];
  const creds = oauthClient(c.env, provider);
  const qs = new URL(c.req.url).searchParams;
  const code = qs.get('code') || '';
  const state = qs.get('state') || '';
  const fail = (msg: string, origin = '*') => new Response(oauthPage(provider, 'Guest', msg, origin, '', false), { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  if (!cfg || !creds.id) return fail('OAuth not configured');
  if (!code) return new Response('Missing code', { status: 400 });
  let stored: any = null;
  try { stored = JSON.parse((await c.env.KV.get('oauth:' + state)) || 'null'); } catch { stored = null; }
  if (!stored) return fail('Invalid or expired state (CSRF check)');
  await c.env.KV.delete('oauth:' + state);
  const gameOrigin = stored.origin || '*';
  const url = new URL(c.req.url);
  const redirectUri = `${url.origin}/auth/${provider}/callback`;
  try {
    const tokRes = await fetch(cfg.tokenUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
      body: new URLSearchParams({ client_id: creds.id, client_secret: creds.secret, code, redirect_uri: redirectUri, grant_type: 'authorization_code', ...(stored.verifier ? { code_verifier: stored.verifier } : {}) }).toString(),
      signal: AbortSignal.timeout(15000),
    });
    const tokenData: any = await tokRes.json();
    if (!tokenData.access_token) throw new Error('No access token');
    const userRes = await fetch(cfg.userUrl, { headers: { Authorization: 'Bearer ' + tokenData.access_token, ...(cfg.headers || {}) }, signal: AbortSignal.timeout(15000) });
    const userData: any = await userRes.json();
    const parsed = cfg.parse(userData);
    const providerId = parsed.providerId || parsed.username || userData.sub || '';
    const rawUsername = parsed.username || '';
    const safe = rawUsername ? rawUsername.replace(/[^a-zA-Z0-9_ -]/g, '').slice(0, 20) : 'Player';
    if (stored.linkToken) {
      const sessRaw = await c.env.KV.get('link:' + stored.linkToken);
      if (!sessRaw) {
        return new Response(oauthPage(provider, 'Guest', 'Link session expired. Try again.', gameOrigin, providerId, false), { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
      }
      await c.env.KV.delete('link:' + stored.linkToken);
      const target = JSON.parse(sessRaw).username;
      const existingName = await findByIdentity(c.env, provider, providerId);
      if (existingName && existingName !== target) {
        return new Response(oauthPage(provider, 'Guest', `Identity already linked to "${existingName}"`, gameOrigin, providerId, false), { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
      }
      const targetAcc = await getAccount(c.env, target);
      if (!targetAcc) {
        return new Response(oauthPage(provider, 'Guest', 'Account not found', gameOrigin, providerId, false), { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
      }
      let ids: any = {};
      try { ids = JSON.parse(targetAcc.identities || '{}'); } catch { ids = {}; }
      ids[provider] = providerId;
      await c.env.DB.prepare('UPDATE accounts SET identities = ? WHERE username = ?').bind(JSON.stringify(ids), target).run();
      return new Response(oauthPage(provider, target, null, gameOrigin, providerId, true), { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    }
    const existingName = await findByIdentity(c.env, provider, providerId);
    if (existingName) {
      return new Response(oauthPage(provider, existingName, null, gameOrigin, providerId, true), { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    }
    return new Response(oauthPage(provider, safe, null, gameOrigin, providerId, false), { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  } catch (e: any) {
    return new Response(oauthPage(provider, 'Guest', (e && e.message) || 'Auth failed', gameOrigin, '', false), { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  }
});

export default app;
