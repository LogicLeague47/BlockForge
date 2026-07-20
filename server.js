// BlockForge WebSocket Multiplayer Server
// Run: node server.js

import { WebSocketServer } from 'ws';
import http from 'http';
import { readFileSync, writeFileSync, existsSync, readFile } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, extname } from 'path';
import { randomBytes, scrypt, timingSafeEqual } from 'crypto';
import { promisify } from 'util';
const scryptAsync = promisify(scrypt);

async function getPlayerData(username) {
  const data = await redisCmd(['GET', `player_data:${username}`]);
  return data ? JSON.parse(data) : { stats: {}, settings: {} };
}

async function setPlayerData(username, data) {
  await redisCmd(['SET', `player_data:${username}`, JSON.stringify(data)]);
}

const PROFANITY_WORDS = [
  'fuck','fucker','fuckers','fuckface','fuckhead','fuckhole','fucking',
  'fuckboy','fuckbuddy','fuckstick','fucktard','fuckwit','fucked','fuckedup',
  'blowjob','cum','cumshot','cumslut','cunnilingus','dildo','ejaculate',
  'fellatio','handjob','hentai','masturbate','masturbation','orgasm',
  'penis','penises','porn','porno','pornography','pussy','pussies','pussylips',
  'tits','titties','titty','twat','twatface','twats',
  'ass','assface','asshat','asshead','asshole','asswipe',
  'bastard','bigass','bullshit','crap','damn','damnit','dipshit',
  'douche','douchebag','dumbass','dumbshit','goddamn','goddamnit',
  'hell','horseshit','jackass','jackoff','jerkoff','kissass','lameass',
  'loser','moron','prick','pricks','punkass','scum','scumbag',
  'shit','shitty','sissy','stupid','turd','ugly','wiseass',
  'idiot','bitch','bitches',
  'boob','boobs','cock','dick','dickbag','dickbrain','dickface','dickhead',
  'dickhole','dickless','dicks','dickwad','dickweed',
  'beaner','beaners','chink','chinks','coon','coons','cracker',
  'darkie','darky','gook','gooks','honky','jigaboo','jiggaboo',
  'kike','kikes','negro','negroid','nigga','niggah','niggard',
  'niggardly','niggas','nigger','niggers','redneck','slope','slopes',
  'spic','spick','tacohead','wetback','whitey','wop',
  'dyke','dykes','fag','faggot','faggots','faggy','fagot','fags',
  'homo','queer','queers','tranny',
  'hitler','kkk','lynch','murder','nazi','neonazi','pedo','pedophile',
  'rape','raped','raping','rapist','swastika',
  'bestiality','incest','lolita',
  'cocaine','crack','heroin','junkie','meth','weed',
  'suicide',
  'retard','retarded',
  'slut','sluts','slutbag','whore','whoreface','whorehouse','whores',
  'cunt','cuntface','cuntlicker','cunts',
  'kill yourself','kys','commit suicide','neck yourself',
  'unalive yourself','rope yourself',
];
const _profRegex = new RegExp(`\\b(${PROFANITY_WORDS.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`, 'gi');
function filterProfanity(text) {
  if (!text) return text;
  return text.replace(_profRegex, (m) => '*'.repeat(m.length));
}

function safeSend(ws, data) {
  if (ws && ws.readyState === 1) {
    try { ws.send(data); } catch (_) {}
  }
}

const PORT = process.env.PORT || 4000;
const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_FILE = join(__dirname, 'server-data.json');
const ACCOUNTS_FILE = join(__dirname, 'accounts.json');
const FRIENDS_FILE = join(__dirname, 'friends.json');

// ── Persistence ───────────────────────────────────────────────────────
// Render's free tier has an ephemeral filesystem (wiped on every redeploy), so
// for durable data we use Upstash Redis (free) when its env vars are present.
// Falls back to local JSON files for local dev.
//   Set on Render:  UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN
const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL || '';
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || '';
const USE_REDIS = !!(REDIS_URL && REDIS_TOKEN);

async function redisCmd(cmd) {
  if (!USE_REDIS) return null;
  try {
    const r = await fetch(REDIS_URL, {
      method: 'POST',
      headers: { Authorization: `Bearer ${REDIS_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(cmd),
    });
    const j = await r.json();
    return j.result;
  } catch (e) {
    console.error('[Redis] command failed:', e.message);
    return null;
  }
}
// Debounced writer so rapid changes don't spam the free command quota.
const _redisTimers = {};
function redisSaveDebounced(key, getValue, ms = 1500) {
  if (!USE_REDIS) return;
  clearTimeout(_redisTimers[key]);
  _redisTimers[key] = setTimeout(() => {
    redisCmd(['SET', key, JSON.stringify(getValue())]).catch(() => {});
  }, ms);
}

let rooms = new Map();
let serverStats = { dailyUsers: {}, monthlyUsers: {}, serversCreated: 0 };

function _roomsToObj() {
  const obj = {};
  for (const [name, room] of rooms) {
    obj[name] = {
      seed: room.seed,
      gameMode: room.gameMode,
      maxPlayers: room.maxPlayers,
      ownerName: room.ownerName,
      ownerSecret: room.ownerSecret || null,
      protected: !!room.protected,
      private: !!room.private,
      banned: [...room.banned],
      edits: room.edits ? [...room.edits] : [],
      created: room.created
    };
  }
  return obj;
}

function saveRooms() {
  if (USE_REDIS) {
    redisSaveDebounced('server-data', () => ({ rooms: _roomsToObj(), stats: serverStats }));
    return;
  }
  try { writeFileSync(DATA_FILE, JSON.stringify({ rooms: _roomsToObj(), stats: serverStats }, null, 2)); } catch {}
}

// Debounced room save for high-frequency events (block edits) so a crash loses
// at most a few seconds of building instead of up to the 30s autosave window.
let _saveRoomsTimer = null;
function scheduleSaveRooms(ms = 5000) {
  if (_saveRoomsTimer) return;
  _saveRoomsTimer = setTimeout(() => { _saveRoomsTimer = null; saveRooms(); }, ms);
}

function _applyRoomsData(data) {
  if (!data) return;
  if (data.stats) serverStats = data.stats;
  if (data.rooms) {
    for (const [name, r] of Object.entries(data.rooms)) {
      rooms.set(name, {
        seed: r.seed,
        gameMode: r.gameMode,
        maxPlayers: r.maxPlayers,
        ownerName: r.ownerName,
        ownerSecret: r.ownerSecret || null,
        protected: !!r.protected,
        private: !!r.private,
        players: new Map(),
        banned: new Set(r.banned || []),
        edits: new Map(r.edits || []),
        created: r.created || Date.now()
      });
    }
    console.log(`[Data] Loaded ${rooms.size} rooms`);
  }
}

async function loadRooms() {
  if (USE_REDIS) {
    const data = await redisCmd(['GET', 'server-data']);
    if (data) { try { _applyRoomsData(JSON.parse(data)); } catch (e) { console.error('[Data] Redis parse fail', e.message); } }
    return;
  }
  if (!existsSync(DATA_FILE)) return;
  try {
    _applyRoomsData(JSON.parse(readFileSync(DATA_FILE, 'utf8')));
  } catch (e) {
    console.error('[Data] Failed to load:', e.message);
  }
}

// Create the official server (no owner, undeletable) if it doesn't exist
function ensureOfficialServer() {
  if (!rooms.has('OfficialSMP')) {
    rooms.set('OfficialSMP', {
      seed: 12345,
      gameMode: 'survival',
      maxPlayers: 50,
      ownerName: null,
      ownerSecret: null,
      protected: true,
      players: new Map(),
      banned: new Set(),
      edits: new Map(),
      created: Date.now()
    });
    saveRooms();
    console.log('[Room] Created official server "OfficialSMP"');
  }
}

// ── Role system ───────────────────────────────────────────────────────
const ROLE_GAMEDEV = 'gamedev', ROLE_OWNER = 'owner', ROLE_ADMIN = 'admin', ROLE_STAFF = 'staff', ROLE_PLAYER = 'player', ROLE_DEV = 'dev';
const ROLE_LEVEL = { [ROLE_DEV]: 6, [ROLE_GAMEDEV]: 5, [ROLE_OWNER]: 4, [ROLE_ADMIN]: 3, [ROLE_STAFF]: 2, [ROLE_PLAYER]: 1 };
const GAMEDEV_ACCOUNT = 'LogicLeague';
const OWNER_USERNAME = 'LogicLeague'; // username that always carries the Owner tag

function generateSecret() {
  return randomBytes(24).toString('base64url');
}

function resolveRole(cgUsername, playerName) {
  if (playerName && playerName.toLowerCase() === OWNER_USERNAME.toLowerCase()) return ROLE_DEV;
  if (cgUsername === GAMEDEV_ACCOUNT) return ROLE_GAMEDEV;
  // Check stored account role
  if (playerName && accounts[playerName] && accounts[playerName].role) return accounts[playerName].role;
  return null;
}

// ── Account system (username + password) ─────────────────────────────
// Prevents name spoofing: to use a username you must know its password.
let accounts = {}; // { username: { hash, salt, role?, tag? } }

// Accounts committed in accounts.json (e.g. LogicLeague) are "source accounts":
// always loaded from source and never written to Redis, so they survive even if
// the Redis database is ever lost/crashed.
let fileAccounts = {};

async function loadAccounts() {
  try {
    if (existsSync(ACCOUNTS_FILE)) fileAccounts = JSON.parse(readFileSync(ACCOUNTS_FILE, 'utf8')) || {};
  } catch { fileAccounts = {}; }

  if (USE_REDIS) {
    let redisAccounts = {};
    const data = await redisCmd(['GET', 'accounts']);
    if (data) { try { redisAccounts = JSON.parse(data) || {}; } catch {} }
    // Source accounts override Redis so they always come from the committed file.
    accounts = { ...redisAccounts, ...fileAccounts };
    console.log(`[Data] Accounts: ${Object.keys(redisAccounts).length} from Redis + ${Object.keys(fileAccounts).length} from source`);
    return;
  }
  accounts = { ...fileAccounts };
}

function saveAccounts() {
  if (USE_REDIS) {
    // Never write source accounts (LogicLeague, etc.) to Redis — keep them in source only.
    redisSaveDebounced('accounts', () => {
      const out = {};
      for (const [k, v] of Object.entries(accounts)) if (!fileAccounts[k]) out[k] = v;
      return out;
    });
    return;
  }
  try { writeFileSync(ACCOUNTS_FILE, JSON.stringify(accounts, null, 2)); } catch {}
}

async function hashPassword(password, salt) {
  const buf = await scryptAsync(password, salt, 64);
  return buf.toString('hex');
}

// Returns { ok, reason } — verifies or creates the account
async function authAccount(username, password, mode) {
  if (!username || !password) return { ok: false, reason: 'Username and password required.' };
  if (username.length < 2 || username.length > 16) return { ok: false, reason: 'Username must be 2-16 characters.' };
  if (!/^[a-zA-Z0-9_]+$/.test(username)) return { ok: false, reason: 'Username may only contain letters, numbers, and underscores.' };
  if (password.length < 3) return { ok: false, reason: 'Password must be at least 3 characters.' };
  const existing = accounts[username];
  if (mode === 'register') {
    if (existing) return { ok: false, reason: 'Username already taken. Please log in.' };
    const salt = randomBytes(16).toString('hex');
    const hash = await hashPassword(password, salt);
    accounts[username] = { hash, salt, role: ROLE_PLAYER, tag: '' };
    saveAccounts();
    return { ok: true, created: true };
  }
  if (!existing) {
    if (mode === 'login') return { ok: false, reason: 'Account not found. Please create one.' };
    const salt = randomBytes(16).toString('hex');
    const hash = await hashPassword(password, salt);
    accounts[username] = { hash, salt, role: ROLE_PLAYER, tag: '' };
    saveAccounts();
    return { ok: true, created: true };
  }
  const hash = await hashPassword(password, existing.salt);
  const a = Buffer.from(hash, 'hex');
  const b = Buffer.from(existing.hash, 'hex');
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return { ok: false, reason: 'Incorrect password.' };
  }
  return { ok: true };
}

// ── Friends system ────────────────────────────────────────────────────
// friends = { username: { friends: [names], incoming: [names], outgoing: [names] } }
let friends = {};

async function loadFriends() {
  if (USE_REDIS) {
    const data = await redisCmd(['GET', 'friends']);
    if (data) { try { friends = JSON.parse(data) || {}; } catch { friends = {}; } }
    return;
  }
  if (!existsSync(FRIENDS_FILE)) return;
  try { friends = JSON.parse(readFileSync(FRIENDS_FILE, 'utf8')) || {}; } catch { friends = {}; }
}
function saveFriends() {
  if (USE_REDIS) { redisSaveDebounced('friends', () => friends); return; }
  try { writeFileSync(FRIENDS_FILE, JSON.stringify(friends)); } catch {}
}
function _friendRec(name) {
  if (!friends[name]) friends[name] = { friends: [], incoming: [], outgoing: [] };
  const r = friends[name];
  if (!Array.isArray(r.friends)) r.friends = [];
  if (!Array.isArray(r.incoming)) r.incoming = [];
  if (!Array.isArray(r.outgoing)) r.outgoing = [];
  return r;
}
// Find the online ws for a given username (any room), or null.
function _wsForUser(name) {
  for (const ws of wss.clients) {
    if (ws._playerData && ws._playerData.name === name) return ws;
  }
  return null;
}
function _isOnline(name) { return !!_wsForUser(name); }

// Push the caller's current friend state to them.
function sendFriendState(ws) {
  const pd = ws._playerData;
  if (!pd) return;
  const r = _friendRec(pd.name);
  safeSend(ws, JSON.stringify({
    type: 'friend_state',
    friends: r.friends.map(n => ({ name: n, online: _isOnline(n) })),
    incoming: r.incoming.slice(),
    outgoing: r.outgoing.slice(),
  }));
}
// Notify a user (if online) to refresh their friend state.
function notifyFriendState(name) {
  const w = _wsForUser(name);
  if (w) sendFriendState(w);
}

function hasPermission(role, required) {
  return (ROLE_LEVEL[role] || 0) >= (ROLE_LEVEL[required] || 99);
}

// ── Room helpers ──────────────────────────────────────────────────────
function getRoom(name) { return rooms.get(name) || null; }

function listRooms(viewerName) {
  const list = [];
  for (const [name, room] of rooms) {
    // Hide private worlds from everyone except the owner and their friends.
    if (room.private && viewerName && !canAccessRoom(room, viewerName)) continue;
    if (room.private && !viewerName) continue;
    list.push({
      name, seed: room.seed, gameMode: room.gameMode,
      maxPlayers: room.maxPlayers, owner: room.ownerName,
      playerCount: room.players.size, created: room.created,
      private: !!room.private
    });
  }
  return list;
}

function broadcast(room, msg, exclude) {
  const data = JSON.stringify(msg);
  for (const [ws] of room.players) {
    if (ws !== exclude) safeSend(ws, data);
  }
}

function broadcastBinary(room, buf, exclude) {
  for (const [ws] of room.players) {
    if (ws !== exclude) safeSend(ws, buf);
  }
}

function broadcastPlayerList(room) {
  const players = [];
  for (const [, p] of room.players) players.push({ name: p.name, role: p.role, skinIndex: p.skinIndex });
  broadcast(room, { type: 'player_list', players });
}

// ── HTTP server (serves the built game + health check) ────────────────
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.ogg': 'audio/ogg',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
  '.bin': 'application/octet-stream',
  '.gz': 'application/gzip',
};
const PUBLIC_DIR = join(__dirname, 'dist');

// Allow the CrazyGames iframe (and any origin) to fetch audio/chunk
// assets cross-origin. The client decodes them via fetch()->arrayBuffer()
// (Web Audio), which requires CORS — without this, audio silently 404s
// on CrazyGames even though the files exist on this server.
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
};

function serveFile(filePath, res) {
  readFile(filePath, (err, data) => {
    if (err) {
      // SPA fallback → serve index.html
      readFile(join(PUBLIC_DIR, 'index.html'), (e2, html) => {
        if (e2) { res.writeHead(404, CORS); res.end('Not found'); return; }
        res.writeHead(200, { ...CORS, 'Content-Type': MIME['.html'] });
        res.end(html);
      });
      return;
    }
    const ext = extname(filePath).toLowerCase();
    res.writeHead(200, { ...CORS, 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  if (req.url === '/health' || req.url === '/ping') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ rooms: rooms.size, status: 'ok', uptime: process.uptime() }));
    return;
  }
  // CORS preflight for cross-origin asset fetches (CrazyGames iframe).
  if (req.method === 'OPTIONS') {
    res.writeHead(204, CORS);
    res.end();
    return;
  }
  // Serve static game files from dist/
  let urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
  if (urlPath === '/') urlPath = '/index.html';
  const filePath = join(PUBLIC_DIR, urlPath);
  // Prevent path traversal
  if (!filePath.startsWith(PUBLIC_DIR)) { res.writeHead(403); res.end('Forbidden'); return; }
  serveFile(filePath, res);
});

// ── WebSocket server ──────────────────────────────────────────────────
const wss = new WebSocketServer({ server, maxPayload: 64 * 1024 }); // 64KB max message

// Rate limiter: max 30 messages per second per connection
function isRateLimited(ws) {
  const now = Date.now();
  if (!ws._rateLimit) ws._rateLimit = { count: 0, window: now };
  if (now - ws._rateLimit.window > 1000) { ws._rateLimit.count = 0; ws._rateLimit.window = now; }
  ws._rateLimit.count++;
  return ws._rateLimit.count > 30;
}

wss.on('connection', (ws) => {
  ws._playerData = null;
  ws._roomName = null;
  console.log(`[Conn] New client connected (total: ${wss.clients.size})`);

  ws.on('message', (raw, isBinary) => {
    if (isBinary) {
      if (isRateLimited(ws)) return;
      try {
        const buf = Buffer.isBuffer(raw) ? raw : Buffer.from(raw);
        const type = buf.readUInt8(0);
        if (type === 0x02) {
          let off = 1;
          const nameLen = buf.readUInt8(off); off += 1;
          const name = buf.toString('utf8', off, off + nameLen); off += nameLen;
          const x = buf.readFloatBE(off); off += 4;
          const y = buf.readFloatBE(off); off += 4;
          const z = buf.readFloatBE(off); off += 4;
          const yaw = buf.readFloatBE(off); off += 4;
          const crouching = buf.readUInt8(off) === 1;
          handlePosition(ws, { x, y, z, yaw, crouching });
        }
      } catch (_) {}
      return;
    }
    let msg;
    try { msg = JSON.parse(raw); } catch { return; }
    if (isRateLimited(ws)) return;

    try {
    switch (msg.type) {
      case 'ping': safeSend(ws, JSON.stringify({ type: 'pong' })); break;
      case 'auth': handleAuth(ws, msg); break;
      case 'create_room': handleCreateRoom(ws, msg); break;
      case 'register_room': handleRegisterRoom(ws, msg); break;
      case 'join': handleJoin(ws, msg); break;
      case 'leave': handleLeave(ws); break;
      case 'list_rooms': handleListRooms(ws); break;
      case 'position': handlePosition(ws, msg); break;
      case 'armor_update':
        if (ws._playerData) ws._playerData.armor = msg.armor || null;
        break;
      case 'player_damage': handlePlayerDamage(ws, msg); break;
      case 'chat': handleChat(ws, msg); break;
      case 'command': handleCommand(ws, msg); break;
      case 'delete_room': handleDeleteRoom(ws, msg); break;
      case 'get_stats': handleGetStats(ws); break;
      case 'block_update': handleBlockUpdate(ws, msg); break;
      case 'friend_list': handleFriendList(ws); break;
      case 'friend_request': handleFriendRequest(ws, msg); break;
      case 'friend_accept': handleFriendAccept(ws, msg); break;
      case 'friend_decline': handleFriendDecline(ws, msg); break;
      case 'friend_remove': handleFriendRemove(ws, msg); break;
      case 'player_stats_get': handlePlayerStatsGet(ws, msg); break;
      case 'player_stats_set': handlePlayerStatsSet(ws, msg); break;
      case 'player_settings_get': handlePlayerSettingsGet(ws, msg); break;
      case 'player_settings_set': handlePlayerSettingsSet(ws, msg); break;
      case 'dev_get_all_players': handleDevGetAllPlayers(ws, msg); break;
      case 'dev_list_accounts': handleDevListAccounts(ws, msg); break;
      case 'dev_get_account': handleDevGetAccount(ws, msg); break;
      case 'dev_set_tag': handleDevSetTag(ws, msg); break;
      case 'dev_set_role': handleDevSetRole(ws, msg); break;
      case 'dev_delete_account': handleDevDeleteAccount(ws, msg); break;
      // Voice chat signaling — relay messages to target player in same room
      case 'voice_join': handleVoiceJoin(ws, msg); break;
      case 'voice_leave': removeVoiceClient(ws); break;
      case 'voice_offer':
      case 'voice_answer':
      case 'voice_ice':
        relayVoice(ws, msg);
        break;
      case 'voice_group_create':
      case 'voice_group_join':
      case 'voice_group_leave':
        handleVoiceGroup(ws, msg);
        break;
      case 'mob_spawn': handleMobSpawn(ws, msg); break;
      case 'mob_position': handleMobPosition(ws, msg); break;
      case 'mob_damage': handleMobDamage(ws, msg); break;
      case 'mob_death': handleMobDeath(ws, msg); break;
    }
    } catch (err) { console.error('[Server] Error handling message:', msg?.type, err); }
  });

  ws.on('close', () => {
    console.log(`[Conn] Client disconnected`);
    const leavingName = ws._playerData && ws._playerData.name;
    handleLeave(ws);
    // Let this user's friends know they went offline.
    if (leavingName && friends[leavingName]) {
      for (const fn of _friendRec(leavingName).friends) notifyFriendState(fn);
    }
  });
});

// ── Handlers ──────────────────────────────────────────────────────────

// Authenticate a username+password without joining a room (used by login screen)
async function handleAuth(ws, msg) {
  const { playerName: rawName, password, mode } = msg;
  const playerName = filterProfanity(rawName);
  // In LAN mode, skip auth and always succeed
  if (IS_LAN) {
    safeSend(ws, JSON.stringify({ type: 'auth_result', ok: true, created: false, reason: '', username: playerName }));
    return;
  }
  const auth = await authAccount(playerName, password, mode);
  // On successful auth, attach a lightweight identity to the socket (no room)
  // so friend management works from the menu without joining a world.
  if (auth.ok && !ws._roomName) {
    const acc = accounts[playerName] || {};
    const resolvedRole = resolveRole(null, playerName) || acc.role || ROLE_PLAYER;
    ws._playerData = { name: playerName, role: resolvedRole, menuOnly: true, x: 0, y: 40, z: 0, yaw: 0, ws };
    // Let friends know we're online, and send our friend state.
    if (friends[playerName]) {
      for (const fn of _friendRec(playerName).friends) notifyFriendState(fn);
    }
    sendFriendState(ws);
  }
  const acc = accounts[playerName] || {};
  const resolvedRole = resolveRole(null, playerName) || acc.role || ROLE_PLAYER;
  safeSend(ws, JSON.stringify({
    type: 'auth_result',
    ok: auth.ok,
    created: !!auth.created,
    reason: auth.reason || '',
    username: playerName,
    role: resolvedRole,
    tag: acc.tag || ''
  }));
}

async function handleCreateRoom(ws, msg) {
  const { name, seed, gameMode, maxPlayers, playerName: rawName, cgUsername, skinIndex, ownerSecret, noOwner, password, isPrivate } = msg;
  const playerName = filterProfanity(rawName);
  if (!name || !playerName) return sendError(ws, 'Missing room name or player name.');

  // Authenticate account (skip for CrazyGames GameDev or LAN mode)
  if (!IS_LAN && cgUsername !== GAMEDEV_ACCOUNT) {
    const auth = await authAccount(playerName, password);
    if (!auth.ok) return sendError(ws, auth.reason);
  }

  if (rooms.has(name)) {
    // Room exists — try joining instead
    return handleJoin(ws, { ...msg, room: name });
  }

  const role = noOwner ? ROLE_PLAYER : (resolveRole(cgUsername, playerName) || ROLE_OWNER);
  const room = {
    seed: typeof seed === 'number' ? seed : 42,
    gameMode: gameMode || 'survival',
    maxPlayers: Math.min(Math.max(maxPlayers || 10, 2), 100),
    ownerName: noOwner ? null : playerName,
    ownerSecret: noOwner ? null : (ownerSecret || generateSecret()),
    protected: !!noOwner,
    private: !!isPrivate, // private = only the owner and their friends can join / see it
    players: new Map(),
    banned: new Set(),
    edits: new Map(),
    mobs: new Map(),       // entityId -> { type, x, y, z }
    _nextMobId: 1,
    created: Date.now()
  };
  rooms.set(name, room);

  serverStats.serversCreated++;
  saveRooms();

  _joinRoom(ws, room, name, playerName, role, skinIndex || 0, cgUsername || '');
  console.log(`[Room] Created "${name}" by ${playerName} (seed: ${room.seed})${noOwner ? ' [PROTECTED/OFFICIAL]' : ''}`);
}

// Register a room without joining — used to make locally-saved servers visible to other devices
function handleRegisterRoom(ws, msg) {
  const { name, seed, gameMode, maxPlayers, playerName: rawName, ownerSecret } = msg;
  const playerName = filterProfanity(rawName);
  if (!name || !playerName) return;

  // Only OfficialSMP is allowed on the public server (skip for LAN mode)
  if (!IS_LAN && name !== 'OfficialSMP') return;

  if (!rooms.has(name)) {
    rooms.set(name, {
      seed: typeof seed === 'number' ? seed : 42,
      gameMode: gameMode || 'survival',
      maxPlayers: Math.min(Math.max(maxPlayers || 10, 2), 100),
      ownerName: playerName,
      ownerSecret: ownerSecret || generateSecret(),
      players: new Map(),
      banned: new Set(),
      edits: new Map(),
      created: Date.now()
    });
    saveRooms();
    console.log(`[Room] Registered "${name}" by ${playerName} (from local sync)`);
  }
}

// Private worlds: only the owner and the owner's friends may see/join.
function canAccessRoom(room, playerName) {
  if (!room.private) return true;
  if (room.ownerName === playerName) return true;
  const ownerFriends = (friends[room.ownerName] && friends[room.ownerName].friends) || [];
  return ownerFriends.includes(playerName);
}

async function handleJoin(ws, msg) {
  const { room: roomName, playerName: rawName, cgUsername, skinIndex, ownerSecret, password } = msg;
  const playerName = filterProfanity(rawName);
  if (!roomName || !playerName) return sendError(ws, 'Missing room name or player name.');

  // Authenticate account (skip for CrazyGames GameDev or LAN mode)
  if (!IS_LAN && cgUsername !== GAMEDEV_ACCOUNT) {
    const auth = await authAccount(playerName, password);
    if (!auth.ok) return sendError(ws, auth.reason);
  }

  const room = getRoom(roomName);
  if (!room) return sendError(ws, `Room "${roomName}" not found.`);

  if (room.banned.has(playerName)) return sendError(ws, 'You are banned from this server.');
  if (!IS_LAN && !canAccessRoom(room, playerName)) {
    return sendError(ws, 'This is a private world. Ask the owner to add you as a friend.');
  }
  if (room.players.size >= room.maxPlayers) return sendError(ws, 'Server is full. Create your own server or try again later.');

  for (const [, p] of room.players) {
    if (p.name === playerName && p.ws !== ws) return sendError(ws, 'That username is already taken.');
  }

  // Grant owner role only if the correct owner secret is presented (prevents name spoofing)
  const isOwner = !!ownerSecret && !!room.ownerSecret && ownerSecret === room.ownerSecret;
  const role = resolveRole(cgUsername, playerName) || (isOwner ? ROLE_OWNER : ROLE_PLAYER);
  _joinRoom(ws, room, roomName, playerName, role, skinIndex || 0, cgUsername || '');
}

function _joinRoom(ws, room, roomName, playerName, role, skinIndex, cgUsername) {
  handleLeave(ws);

  const playerData = { name: playerName, role, skinIndex, cgUsername: cgUsername || '', x: 0, y: 40, z: 0, yaw: 0, ws };
  room.players.set(ws, playerData);
  ws._playerData = playerData;
  ws._roomName = roomName;

  // Send join confirmation with full state
  const players = [];
  for (const [, p] of room.players) players.push({ name: p.name, role: p.role, skinIndex: p.skinIndex, cgUsername: p.cgUsername });

  safeSend(ws, JSON.stringify({
    type: 'joined',
    room: roomName,
    seed: room.seed,
    gameMode: room.gameMode,
    maxPlayers: room.maxPlayers,
    ownerName: room.ownerName,
    players,
    role
  }));

  // Friends: send this player their current friend state, and let their online
  // friends know they've come online.
  if (friends[playerName]) {
    for (const fn of _friendRec(playerName).friends) notifyFriendState(fn);
  }
  sendFriendState(ws);

  // Send any existing block edits so the new player's world matches the server
  if (room.edits && room.edits.size > 0) {
    const edits = [];
    for (const [key, block] of room.edits) {
      const [x, y, z] = key.split(',').map(Number);
      edits.push({ x, y, z, block });
    }
    safeSend(ws, JSON.stringify({ type: 'block_batch', edits }));
  }

  // Send existing mobs so the new player sees them
  if (room.mobs && room.mobs.size > 0) {
    for (const [id, mob] of room.mobs) {
      safeSend(ws, JSON.stringify({ type: 'mob_spawn', id, type: mob.type, x: mob.x, y: mob.y, z: mob.z }));
    }
  }

  // Tell everyone else
  broadcast(room, { type: 'player_join', name: playerName, role, skinIndex, cgUsername: cgUsername || '' }, ws);
  broadcastPlayerList(room);

  console.log(`[Room] ${playerName} joined "${roomName}" (${room.players.size}/${room.maxPlayers})`);
}

// Sync block edits (break/place) so all players in a room share one world.
function handleBlockUpdate(ws, msg) {
  const roomName = ws._roomName;
  const room = getRoom(roomName);
  if (!room || !room.edits) return;
  const x = msg.x | 0, y = msg.y | 0, z = msg.z | 0;
  if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(z)) return;
  if (y < 0 || y > 256) return;
  const block = (msg.block | 0) || 0;
  room.edits.set(`${x},${y},${z}`, block);
  // Broadcast to everyone else in the room
  broadcast(room, { type: 'block_update', x, y, z, block }, ws);
  scheduleSaveRooms();
}

// ── Mob sync handlers ────────────────────────────────────────────────
function handleMobSpawn(ws, msg) {
  const room = getRoom(ws._roomName);
  if (!room) return;
  const id = msg.id | 0;
  const type = String(msg.type || '').slice(0, 32);
  if (!id || !type) return;
  const x = +msg.x || 0, y = +msg.y || 0, z = +msg.z || 0;
  room.mobs.set(id, { type, x, y, z });
  broadcast(room, { type: 'mob_spawn', id, type, x, y, z }, ws);
}

function handleMobPosition(ws, msg) {
  const room = getRoom(ws._roomName);
  if (!room) return;
  const id = msg.id | 0;
  if (!id) return;
  const x = +msg.x || 0, y = +msg.y || 0, z = +msg.z || 0;
  const yaw = +msg.yaw || 0;
  const mob = room.mobs.get(id);
  if (mob) { mob.x = x; mob.y = y; mob.z = z; }
  // Rate-limit: max 15Hz per mob
  const now = Date.now();
  const key = '_mobPos_' + id;
  if (ws[key] && now - ws[key] < 66) return;
  ws[key] = now;
  broadcast(room, { type: 'mob_position', id, x, y, z, yaw }, ws);
}

function handleMobDamage(ws, msg) {
  const room = getRoom(ws._roomName);
  if (!room) return;
  const id = msg.id | 0;
  if (!id) return;
  broadcast(room, { type: 'mob_damage', id, hp: msg.hp | 0 }, ws);
}

function handleMobDeath(ws, msg) {
  const room = getRoom(ws._roomName);
  if (!room) return;
  const id = msg.id | 0;
  if (!id) return;
  room.mobs.delete(id);
  broadcast(room, { type: 'mob_death', id }, ws);
}

function handleLeave(ws) {
  const roomName = ws._roomName;
  const pd = ws._playerData;
  if (!roomName || !pd) return;

  const room = getRoom(roomName);
  if (room) {
    room.players.delete(ws);
    broadcast(room, { type: 'player_leave', name: pd.name });
    broadcastPlayerList(room);
    console.log(`[Room] ${pd.name} left "${roomName}" (${room.players.size} players)`);
  }

  ws._playerData = null;
  ws._roomName = null;
}

function handleListRooms(ws) {
  const viewer = ws._playerData && ws._playerData.name;
  safeSend(ws, JSON.stringify({ type: 'room_list', rooms: listRooms(viewer) }));
}

function handlePosition(ws, msg) {
  const pd = ws._playerData;
  const room = getRoom(ws._roomName);
  if (!pd || !room) return;

  // Basic speed validation (anti-speed-hack)
  const newX = msg.x || 0, newY = msg.y || 0, newZ = msg.z || 0;
  if (pd.lastX != null) {
    const dx = newX - pd.lastX, dy = newY - pd.lastY, dz = newZ - pd.lastZ;
    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
    // Allow up to 12 blocks/tick (covers sprinting + flying + lag)
    if (dist > 12) return;
  }
  pd.lastX = newX; pd.lastY = newY; pd.lastZ = newZ;

  pd.x = newX;
  pd.y = newY;
  pd.z = newZ;
  pd.yaw = msg.yaw || 0;
  pd.crouching = !!msg.crouching;
  pd.armor = msg.armor || null;

  // Rate-limit broadcast: max 25Hz per player (server side)
  const now = Date.now();
  if (pd._lastBroadcast && now - pd._lastBroadcast < 30) return;
  pd._lastBroadcast = now;

  // Broadcast position as binary — proximity culled (skip players >64 blocks away)
  const nameBytes = Buffer.from(pd.name, 'utf8');
  const binBuf = Buffer.alloc(1 + 1 + nameBytes.length + 16 + 1);
  binBuf.writeUInt8(0x01, 0);
  binBuf.writeUInt8(nameBytes.length, 1);
  nameBytes.copy(binBuf, 2);
  let off = 2 + nameBytes.length;
  binBuf.writeFloatBE(pd.x, off); off += 4;
  binBuf.writeFloatBE(pd.y, off); off += 4;
  binBuf.writeFloatBE(pd.z, off); off += 4;
  binBuf.writeFloatBE(pd.yaw, off); off += 4;
  binBuf.writeUInt8(pd.crouching ? 1 : 0); off += 1;
  for (const [targetWs, tp] of room.players) {
    if (targetWs === ws) continue;
    const dx = pd.x - tp.x, dz = pd.z - tp.z;
    if (dx * dx + dz * dz > 4096) continue; // >64 blocks
    safeSend(targetWs, binBuf);
  }
}

function handlePlayerDamage(ws, msg) {
  const pd = ws._playerData;
  const room = getRoom(ws._roomName);
  if (!pd || !room) return;

  const targetName = msg.target;
  const damage = Math.min(Math.max(Number(msg.damage) || 1, 0), 20);
  if (!targetName) return;

  for (const [targetWs, tp] of room.players) {
    if (tp.name === targetName) {
      safeSend(targetWs, JSON.stringify({ type: 'player_damage', from: pd.name, damage }));
      break;
    }
  }
}

function handleChat(ws, msg) {
  const pd = ws._playerData;
  const room = getRoom(ws._roomName);
  if (!pd || !room) return;

  const text = filterProfanity((msg.text || '').trim());
  if (!text) return;

  broadcast(room, { type: 'chat', name: pd.name, role: pd.role, text });
}

function handleCommand(ws, msg) {
  const pd = ws._playerData;
  const room = getRoom(ws._roomName);
  if (!pd || !room) return;

  const text = (msg.text || '').trim();
  if (!text.startsWith('/')) return;

  const parts = text.split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  const reply = (text) => safeSend(ws, JSON.stringify({ type: 'chat', name: 'Server', role: 'server', text }));

  switch (cmd) {
    case '/kick': {
      if (!hasPermission(pd.role, ROLE_STAFF)) return reply('You need staff or higher to kick.');
      const targetName = args[0];
      if (!targetName) return reply('Usage: /kick <player>');
      let targetWs = null;
      for (const [cws, p] of room.players) { if (p.name === targetName) { targetWs = cws; break; } }
      if (!targetWs) return reply('Player not found.');
      const tpd = targetWs._playerData;
      if (tpd && hasPermission(tpd.role, ROLE_ADMIN) && !hasPermission(pd.role, ROLE_OWNER)) return reply('Cannot kick this player.');
      safeSend(targetWs, JSON.stringify({ type: 'kicked', reason: `Kicked by ${pd.name}` }));
      handleLeave(targetWs);
      targetWs.close();
      broadcast(room, { type: 'chat', name: 'Server', role: 'server', text: `${targetName} was kicked by ${pd.name}.` });
      break;
    }
    case '/ban': {
      if (!hasPermission(pd.role, ROLE_STAFF)) return reply('You need staff or higher to ban.');
      const targetName = args[0];
      if (!targetName) return reply('Usage: /ban <player> [reason]');
      room.banned.add(targetName);
      saveRooms();
      let targetWs = null;
      for (const [cws, p] of room.players) { if (p.name === targetName) { targetWs = cws; break; } }
      if (targetWs) {
        safeSend(targetWs, JSON.stringify({ type: 'kicked', reason: `Banned by ${pd.name}: ${args.slice(1).join(' ') || 'No reason'}` }));
        handleLeave(targetWs);
        targetWs.close();
      }
      broadcast(room, { type: 'chat', name: 'Server', role: 'server', text: `${targetName} was banned by ${pd.name}.` });
      break;
    }
    case '/unban': {
      if (!hasPermission(pd.role, ROLE_ADMIN)) return reply('You need admin or higher to unban.');
      const targetName = args[0];
      if (!targetName) return reply('Usage: /unban <player>');
      room.banned.delete(targetName);
      saveRooms();
      broadcast(room, { type: 'chat', name: 'Server', role: 'server', text: `${targetName} was unbanned by ${pd.name}.` });
      break;
    }
    case '/list': {
      const p = [];
      for (const [, pl] of room.players) p.push(`${pl.name} [${pl.role}]`);
      reply(`Players: ${p.join(', ')}`);
      break;
    }
    case '/gamemode': {
      if (!hasPermission(pd.role, ROLE_ADMIN)) return reply('You need admin or higher.');
      const mode = (args[0] || '').toLowerCase();
      if (mode !== 'creative' && mode !== 'survival') return reply('Usage: /gamemode <creative|survival>');
      room.gameMode = mode;
      saveRooms();
      broadcast(room, { type: 'gamemode', gameMode: mode });
      broadcast(room, { type: 'chat', name: 'Server', role: 'server', text: `Game mode set to ${mode} by ${pd.name}.` });
      break;
    }
    case '/staff': {
      if (!hasPermission(pd.role, ROLE_ADMIN)) return reply('You need admin or higher.');
      const targetName = args[0];
      if (!targetName) return reply('Usage: /staff <player>');
      let found = false;
      for (const [, p] of room.players) { if (p.name === targetName) { p.role = ROLE_STAFF; found = true; break; } }
      if (!found) return reply(`Player "${targetName}" not found.`);
      broadcastPlayerList(room);
      broadcast(room, { type: 'chat', name: 'Server', role: 'server', text: `${targetName} is now staff.` });
      break;
    }
    case '/admin': {
      if (!hasPermission(pd.role, ROLE_ADMIN)) return reply('You need admin or higher.');
      const targetName = args[0];
      if (!targetName) return reply('Usage: /admin <player>');
      let found = false;
      for (const [, p] of room.players) { if (p.name === targetName) { p.role = ROLE_ADMIN; found = true; break; } }
      if (!found) return reply(`Player "${targetName}" not found.`);
      broadcastPlayerList(room);
      broadcast(room, { type: 'chat', name: 'Server', role: 'server', text: `${targetName} is now admin.` });
      break;
    }
    case '/deop': {
      if (!hasPermission(pd.role, ROLE_ADMIN)) return reply('You need admin or higher.');
      const targetName = args[0];
      if (!targetName) return reply('Usage: /deop <player>');
      let found = false;
      for (const [, p] of room.players) { if (p.name === targetName && p.role !== ROLE_OWNER) { p.role = ROLE_PLAYER; found = true; break; } }
      if (!found) return reply(`Player "${targetName}" not found or cannot be demoted.`);
      broadcastPlayerList(room);
      broadcast(room, { type: 'chat', name: 'Server', role: 'server', text: `${targetName} is now a player.` });
      break;
    }
    case '/pm':
    case '/msg':
    case '/whisper': {
      const targetName = args[0];
      const pmText = args.slice(1).join(' ');
      if (!targetName || !pmText) return reply('Usage: /pm <player> <message>');
      let targetWs = null;
      for (const [cws, p] of room.players) { if (p.name === targetName) { targetWs = cws; break; } }
      if (!targetWs) return reply(`Player "${targetName}" not found.`);
      const pmMsg = JSON.stringify({ type: 'chat', name: `[PM] ${pd.name}`, role: 'pm', text: pmText });
      const pmMsgToSender = JSON.stringify({ type: 'chat', name: `[PM → ${targetName}]`, role: 'pm', text: pmText });
      ws.send(pmMsgToSender);
      targetWs.send(pmMsg);
      break;
    }
    case '/help': {
      reply([
        '/pm <player> <message> — Send a private message',
        '/staff <player> — Promote to staff',
        '/admin <player> — Promote to admin',
        '/deop <player> — Demote to player',
        '/kick <player> — Kick a player',
        '/ban <player> [reason] — Ban a player',
        '/unban <player> — Unban a player',
        '/list — List online players',
        '/gamemode <creative|survival> — Change gamemode',
        '/help — Show this help'
      ].join('\n'));
      break;
    }
  }
}

function handleDeleteRoom(ws, msg) {
  const pd = ws._playerData;
  const roomName = msg.room;
  if (!pd || !roomName) return;

  const room = getRoom(roomName);
  if (!room) return sendError(ws, 'Room not found.');

  if (room.protected) {
    return safeSend(ws, JSON.stringify({ type: 'chat', name: 'Server', role: 'server', text: 'This server is official and cannot be deleted.' }));
  }

  // Deletion requires being joined as the verified owner. Owner role is only
  // granted when the correct ownerSecret was presented at join (see handleJoin),
  // so this ties deletion to the account/secret, not just a matching name.
  const isVerifiedOwner = pd.role === ROLE_OWNER && room.ownerName === pd.name;
  if (!isVerifiedOwner) {
    return safeSend(ws, JSON.stringify({ type: 'chat', name: 'Server', role: 'server', text: 'Only the verified server owner can delete this server.' }));
  }

  for (const [cws] of room.players) {
    safeSend(cws, JSON.stringify({ type: 'kicked', reason: 'Server deleted by owner.' }));
    cws._playerData = null;
    cws._roomName = null;
    cws.close();
  }

  rooms.delete(roomName);
  saveRooms();
  console.log(`[Room] "${roomName}" deleted by owner ${pd.name}`);
}

function handleGetStats(ws) {
  const today = new Date().toISOString().slice(0, 10);
  const month = today.slice(0, 7);
  safeSend(ws, JSON.stringify({
    type: 'stats',
    dailyUsers: serverStats.dailyUsers[today] || 0,
    monthlyUsers: Object.keys(serverStats.monthlyUsers).filter(k => k.startsWith(month)).length,
    serversCreated: serverStats.serversCreated
  }));
}

function sendError(ws, text) {
  safeSend(ws, JSON.stringify({ type: 'error', text }));
}

// ── Friend handlers ───────────────────────────────────────────────────
function handleFriendList(ws) {
  if (!ws._playerData) return;
  sendFriendState(ws);
}

function handleFriendRequest(ws, msg) {
  const pd = ws._playerData;
  if (!pd) return;
  const me = pd.name;
  const target = filterProfanity((msg.name || '').trim());
  if (!target) return sendFriendMsg(ws, 'Enter a username.', false);
  if (target === me) return sendFriendMsg(ws, "You can't friend yourself.", false);
  if (!IS_LAN && !accounts[target]) return sendFriendMsg(ws, `No player named "${target}".`, false);

  const mine = _friendRec(me);
  const theirs = _friendRec(target);
  if (mine.friends.includes(target)) return sendFriendMsg(ws, `You're already friends with ${target}.`, false);
  if (mine.outgoing.includes(target)) return sendFriendMsg(ws, `Request to ${target} already sent.`, false);

  // If they already sent US a request, accept it instead.
  if (mine.incoming.includes(target)) {
    return handleFriendAccept(ws, { name: target });
  }

  mine.outgoing.push(target);
  theirs.incoming.push(me);
  saveFriends();
  sendFriendMsg(ws, `Friend request sent to ${target}.`, true);
  sendFriendState(ws);
  notifyFriendState(target);
}

function handleFriendAccept(ws, msg) {
  const pd = ws._playerData;
  if (!pd) return;
  const me = pd.name;
  const from = filterProfanity((msg.name || '').trim());
  const mine = _friendRec(me);
  if (!mine.incoming.includes(from)) return sendFriendMsg(ws, 'No such request.', false);
  const theirs = _friendRec(from);
  mine.incoming = mine.incoming.filter(n => n !== from);
  theirs.outgoing = theirs.outgoing.filter(n => n !== me);
  if (!mine.friends.includes(from)) mine.friends.push(from);
  if (!theirs.friends.includes(me)) theirs.friends.push(me);
  saveFriends();
  sendFriendMsg(ws, `You are now friends with ${from}.`, true);
  sendFriendState(ws);
  notifyFriendState(from);
}

function handleFriendDecline(ws, msg) {
  const pd = ws._playerData;
  if (!pd) return;
  const me = pd.name;
  const from = filterProfanity((msg.name || '').trim());
  const mine = _friendRec(me);
  mine.incoming = mine.incoming.filter(n => n !== from);
  const theirs = _friendRec(from);
  theirs.outgoing = theirs.outgoing.filter(n => n !== me);
  saveFriends();
  sendFriendState(ws);
  notifyFriendState(from);
}

function handleFriendRemove(ws, msg) {
  const pd = ws._playerData;
  if (!pd) return;
  const me = pd.name;
  const other = filterProfanity((msg.name || '').trim());
  const mine = _friendRec(me);
  const theirs = _friendRec(other);
  mine.friends = mine.friends.filter(n => n !== other);
  theirs.friends = theirs.friends.filter(n => n !== me);
  saveFriends();
  sendFriendState(ws);
  notifyFriendState(other);
}

function sendFriendMsg(ws, text, ok) {
  safeSend(ws, JSON.stringify({ type: 'friend_msg', text, ok: !!ok }));
}

// ── Player stats/settings (per-user Redis) ──────────────────────────
function handlePlayerStatsGet(ws, msg) {
  const pd = ws._playerData;
  if (!pd) return;
  getPlayerData(pd.name).then(data => {
    safeSend(ws, JSON.stringify({ type: 'player_stats', stats: data.stats || {} }));
  }).catch(() => {});
}

function handlePlayerStatsSet(ws, msg) {
  const pd = ws._playerData;
  if (!pd) return;
  getPlayerData(pd.name).then(data => {
    Object.assign(data.stats, msg.stats || {});
    return setPlayerData(pd.name, data);
  }).catch(() => {});
}

function handlePlayerSettingsGet(ws, msg) {
  const pd = ws._playerData;
  if (!pd) return;
  getPlayerData(pd.name).then(data => {
    safeSend(ws, JSON.stringify({ type: 'player_settings', settings: data.settings || {} }));
  }).catch(() => {});
}

function handlePlayerSettingsSet(ws, msg) {
  const pd = ws._playerData;
  if (!pd) return;
  getPlayerData(pd.name).then(data => {
    Object.assign(data.settings, msg.settings || {});
    return setPlayerData(pd.name, data);
  }).catch(() => {});
}

function handleDevGetAllPlayers(ws, msg) {
  const pd = ws._playerData;
  if (!pd || pd.role !== ROLE_DEV) return;
  const playerNames = [];
  for (const [, rp] of rooms) {
    for (const [, p] of rp.players) {
      if (!playerNames.includes(p.name)) playerNames.push(p.name);
    }
  }
  safeSend(ws, JSON.stringify({ type: 'dev_player_list', players: playerNames }));
}

// Dev check helper
function isDev(ws) {
  const pd = ws._playerData;
  return pd && (pd.role === ROLE_DEV || pd.role === ROLE_GAMEDEV);
}

// Returns { username, role, tag, hasPlayed } for every registered account
function handleDevListAccounts(ws, msg) {
  if (!isDev(ws)) return;
  const list = [];
  for (const [username, acc] of Object.entries(accounts)) {
    const resolvedRole = resolveRole(null, username) || acc.role || ROLE_PLAYER;
    list.push({ username, role: resolvedRole, tag: acc.tag || '' });
  }
  // Sort: devs first, then rest alphabetically
  list.sort((a, b) => {
    const aIsDev = a.role === ROLE_DEV || a.role === ROLE_GAMEDEV ? 0 : 1;
    const bIsDev = b.role === ROLE_DEV || b.role === ROLE_GAMEDEV ? 0 : 1;
    if (aIsDev !== bIsDev) return aIsDev - bIsDev;
    return a.username.localeCompare(b.username);
  });
  safeSend(ws, JSON.stringify({ type: 'dev_account_list', accounts: list }));
}

// Get full details for a specific account (includes stats)
function handleDevGetAccount(ws, msg) {
  if (!isDev(ws)) return;
  const target = msg.target;
  if (!target || !accounts[target]) {
    safeSend(ws, JSON.stringify({ type: 'dev_account_detail', error: 'Account not found' }));
    return;
  }
  const acc = accounts[target];
  const resolvedRole = resolveRole(null, target) || acc.role || ROLE_PLAYER;
  getPlayerData(target).then(playerData => {
    safeSend(ws, JSON.stringify({
      type: 'dev_account_detail',
      username: target,
      role: resolvedRole,
      tag: acc.tag || '',
      stats: playerData.stats || {},
      settings: playerData.settings || {}
    }));
  }).catch(err => {
    console.error('[Dev] Error fetching player data:', err);
    safeSend(ws, JSON.stringify({
      type: 'dev_account_detail',
      username: target,
      role: resolvedRole,
      tag: acc.tag || '',
      stats: {},
      settings: {}
    }));
  });
}

// Set a custom tag on an account (player cannot change it themselves)
function handleDevSetTag(ws, msg) {
  if (!isDev(ws)) return;
  const target = msg.target;
  const tag = (msg.tag || '').trim().slice(0, 20);
  if (!target || !accounts[target]) {
    safeSend(ws, JSON.stringify({ type: 'dev_set_tag_result', ok: false, reason: 'Account not found' }));
    return;
  }
  // Don't let non-owners override the owner's tag
  const requester = ws._playerData ? ws._playerData.name : '';
  if (target.toLowerCase() === OWNER_USERNAME.toLowerCase() && requester.toLowerCase() !== OWNER_USERNAME.toLowerCase()) {
    safeSend(ws, JSON.stringify({ type: 'dev_set_tag_result', ok: false, reason: 'Cannot modify owner tag' }));
    return;
  }
  const acc = accounts[target];
  if (!acc.tag && tag === '') {
    safeSend(ws, JSON.stringify({ type: 'dev_set_tag_result', ok: true, tag: '' }));
    return;
  }
  acc.tag = tag;
  saveAccounts();
  safeSend(ws, JSON.stringify({ type: 'dev_set_tag_result', ok: true, tag }));
}

// Set role (promote to dev or demote to player)
function handleDevSetRole(ws, msg) {
  if (!isDev(ws)) return;
  const target = msg.target;
  const newRole = msg.role;
  if (!target || !accounts[target]) {
    safeSend(ws, JSON.stringify({ type: 'dev_set_role_result', ok: false, reason: 'Account not found' }));
    return;
  }
  // Only allow setting 'dev' or 'player'
  if (newRole !== ROLE_DEV && newRole !== ROLE_PLAYER) {
    safeSend(ws, JSON.stringify({ type: 'dev_set_role_result', ok: false, reason: 'Role must be dev or player' }));
    return;
  }
  // Don't allow changing owner role
  if (target.toLowerCase() === OWNER_USERNAME.toLowerCase()) {
    safeSend(ws, JSON.stringify({ type: 'dev_set_role_result', ok: false, reason: 'Cannot modify owner role' }));
    return;
  }
  // Don't allow changing gamedev
  if (fileAccounts[target] && resolveRole(null, target) === ROLE_GAMEDEV) {
    safeSend(ws, JSON.stringify({ type: 'dev_set_role_result', ok: false, reason: 'Cannot modify gamedev role' }));
    return;
  }
  const acc = accounts[target];
  acc.role = newRole;
  saveAccounts();

  // Update all online sessions for this player so the role takes effect immediately
  for (const cws of wss.clients) {
    const pd = cws._playerData;
    if (pd && pd.name === target) {
      pd.role = newRole;
      // Notify the player's client so it updates playerRole
      safeSend(cws, JSON.stringify({ type: 'role_changed', role: newRole }));
      // Refresh the player list in their room so others see the updated role
      if (cws._roomName) {
        const room = getRoom(cws._roomName);
        if (room) broadcastPlayerList(room);
      }
    }
  }

  safeSend(ws, JSON.stringify({ type: 'dev_set_role_result', ok: true, username: target, role: newRole }));
}

function handleDevDeleteAccount(ws, msg) {
  if (!isDev(ws)) return;
  const target = msg.target;
  if (!target || !accounts[target]) {
    safeSend(ws, JSON.stringify({ type: 'dev_delete_account_result', ok: false, reason: 'Account not found' }));
    return;
  }
  if (target.toLowerCase() === OWNER_USERNAME.toLowerCase()) {
    safeSend(ws, JSON.stringify({ type: 'dev_delete_account_result', ok: false, reason: 'Cannot delete owner account' }));
    return;
  }
  if (fileAccounts[target] && resolveRole(null, target) === ROLE_GAMEDEV) {
    safeSend(ws, JSON.stringify({ type: 'dev_delete_account_result', ok: false, reason: 'Cannot delete gamedev account' }));
    return;
  }
  delete accounts[target];
  saveAccounts();
  safeSend(ws, JSON.stringify({ type: 'dev_delete_account_result', ok: true, username: target }));
  // Refresh account list
  handleDevListAccounts(ws, msg);
}

// ── Voice chat signaling ──────────────────────────────────────────────
// Track which clients in a room have voice enabled
const voiceClients = new Map(); // roomName → Set<ws>
// Voice groups: code → Set<ws>
const voiceGroups = new Map();

function handleVoiceJoin(ws, msg) {
  const roomName = ws._roomName;
  if (!roomName) return;
  const room = getRoom(roomName);
  if (!room) return;

  if (!voiceClients.has(roomName)) voiceClients.set(roomName, new Set());
  const set = voiceClients.get(roomName);
  set.add(ws);

  // Send back the list of existing voice peers
  const peers = [];
  for (const other of set) {
    if (other !== ws && other._playerData) {
      peers.push(other._playerData.name);
    }
  }
  safeSend(ws, JSON.stringify({ type: 'voice_join_ack', peers }));

  // Broadcast to other voice peers that a new voice user joined
  const name = ws._playerData ? ws._playerData.name : 'Unknown';
  broadcastVoice(roomName, { type: 'voice_peer_join', name }, ws);
}

function relayVoice(ws, msg) {
  const roomName = ws._roomName;
  if (!roomName) return;
  const room = getRoom(roomName);
  if (!room) return;
  const targetName = msg.target;
  if (!targetName) return;
  for (const [targetWs, p] of room.players) {
    if (p.name === targetName) {
      const out = { ...msg, from: ws._playerData ? ws._playerData.name : 'Unknown' };
      safeSend(targetWs, JSON.stringify(out));
      return;
    }
  }
}

function broadcastVoice(roomName, msg, exclude) {
  const set = voiceClients.get(roomName);
  if (!set) return;
  const json = JSON.stringify(msg);
  for (const ws of set) {
    if (ws !== exclude) {
      safeSend(ws, json);
    }
  }
}

// ── Voice group signaling ────────────────────────────────────────────
function handleVoiceGroup(ws, msg) {
  const pd = ws._playerData;
  if (!pd) return;
  const code = (msg.code || '').toUpperCase().slice(0, 8);
  if (!code) return;

  if (msg.type === 'voice_group_create' || msg.type === 'voice_group_join') {
    if (!voiceGroups.has(code)) voiceGroups.set(code, new Set());
    const group = voiceGroups.get(code);

    // Leave any existing group first
    for (const [gCode, gSet] of voiceGroups) {
      if (gSet.has(ws) && gCode !== code) {
        gSet.delete(ws);
        const name = pd.name;
        for (const member of gSet) {
          safeSend(member, JSON.stringify({ type: 'voice_group_peer_leave', name }));
        }
        if (gSet.size === 0) voiceGroups.delete(gCode);
      }
    }

    group.add(ws);
    // Send the current group members to the joiner
    const members = [];
    for (const member of group) {
      if (member !== ws && member._playerData) {
        members.push(member._playerData.name);
      }
    }
    safeSend(ws, JSON.stringify({ type: 'voice_group_info', code, members }));

    // Notify existing members
    const name = pd.name;
    for (const member of group) {
      if (member !== ws) {
        safeSend(member, JSON.stringify({ type: 'voice_group_peer_join', name, code }));
      }
    }
  } else if (msg.type === 'voice_group_leave') {
    for (const [gCode, gSet] of voiceGroups) {
      if (gSet.has(ws)) {
        gSet.delete(ws);
        const name = pd.name;
        for (const member of gSet) {
          safeSend(member, JSON.stringify({ type: 'voice_group_peer_leave', name }));
        }
        if (gSet.size === 0) voiceGroups.delete(gCode);
        break;
      }
    }
    safeSend(ws, JSON.stringify({ type: 'voice_group_info', code: null, members: [] }));
  }
}

// Remove voice client on disconnect/leave
function removeVoiceClient(ws, roomName) {
  if (!roomName) roomName = ws._roomName;
  if (!roomName) return;
  const set = voiceClients.get(roomName);
  if (!set) return;
  set.delete(ws);
  if (set.size === 0) voiceClients.delete(roomName);
  // Notify remaining voice peers
  const name = ws._playerData ? ws._playerData.name : 'Unknown';
  broadcastVoice(roomName, { type: 'voice_peer_leave', name }, ws);
}

// Patch handleLeave to also clean up voice
const _origHandleLeave = handleLeave;
handleLeave = function(ws) {
  try {
    const roomName = ws._roomName;
    removeVoiceClient(ws, roomName);
    // Clean up voice groups
    for (const [code, group] of voiceGroups) {
      if (group.has(ws)) {
        group.delete(ws);
        const name = ws._playerData ? ws._playerData.name : 'Unknown';
        for (const member of group) {
          safeSend(member, JSON.stringify({ type: 'voice_group_peer_leave', name }));
        }
        if (group.size === 0) voiceGroups.delete(code);
      }
    }
  } catch (_) {}
  _origHandleLeave(ws);
};

// ── Start ─────────────────────────────────────────────────────────────
const IS_LAN = process.argv.includes('--lan');
(async () => {
  await loadRooms();
  await loadAccounts();
  await loadFriends();
  ensureOfficialServer();
  server.listen(PORT, () => {
    console.log(`\n  BlockForge Server`);
    console.log(`  ─────────────────`);
    console.log(`  Mode:    ${IS_LAN ? 'LAN (open rooms, no auth)' : 'Public (custom + private worlds)'}`);
    console.log(`  Storage: ${USE_REDIS ? 'Upstash Redis (persistent)' : 'local files (ephemeral)'}`);
    console.log(`  HTTP:    http://localhost:${PORT}`);
    console.log(`  WS:      ws://localhost:${PORT}`);
    console.log(`  Health:  http://localhost:${PORT}/health`);
    console.log(`  Rooms:   ${rooms.size}\n`);
  });

  // Server-side WebSocket heartbeat — ping all clients every 30s, terminate dead ones
  // This prevents Render's reverse proxy from closing idle WebSocket connections
  setInterval(() => {
    wss.clients.forEach((ws) => {
      if (ws.isAlive === false) {
        console.log(`[Heartbeat] Terminating stale client`);
        return ws.terminate();
      }
      ws.isAlive = false;
      ws.ping();
    });
  }, 30000);

  // Mark new connections as alive
  wss.on('connection', (ws) => {
    ws.isAlive = true;
    ws.on('pong', () => { ws.isAlive = true; });
  });
})();

// Save every 30 seconds
setInterval(saveRooms, 30000);

// Armor sync every 2 seconds (separate from position packets)
setInterval(() => {
  for (const [, room] of rooms) {
    for (const [ws, pd] of room.players) {
      if (!pd.armor) continue;
      const nameBytes = Buffer.from(pd.name, 'utf8');
      const armorStr = pd.armor || '';
      const armorBytes = Buffer.from(armorStr, 'utf8');
      const binBuf = Buffer.alloc(3 + nameBytes.length + armorBytes.length);
      binBuf.writeUInt8(0x03, 0); // type: armor sync
      binBuf.writeUInt8(nameBytes.length, 1);
      nameBytes.copy(binBuf, 2);
      let off = 2 + nameBytes.length;
      binBuf.writeUInt8(armorBytes.length, off); off += 1;
      armorBytes.copy(binBuf, off);
      for (const [targetWs, tp] of room.players) {
        if (targetWs === ws) continue;
        const dx = pd.x - tp.x, dz = pd.z - tp.z;
        if (dx * dx + dz * dz > 4096) continue;
        safeSend(targetWs, binBuf);
      }
    }
  }
}, 2000);
