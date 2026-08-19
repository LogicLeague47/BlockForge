// BlockForge WebSocket Multiplayer Server
// Run: node server.js

import { WebSocketServer } from 'ws';
import http from 'http';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, extname, basename } from 'path';
import { randomBytes, scrypt, timingSafeEqual, createHash } from 'crypto';
import { promisify } from 'util';
import { filterProfanity } from './src/profanity.js';
const scryptAsync = promisify(scrypt);

const PORT = process.env.PORT || 4000;
const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_FILE = join(__dirname, 'server-data.json');
const IS_LAN = process.argv.includes('--lan');
const ACCOUNTS_FILE = join(__dirname, 'accounts.json');
const FRIENDS_FILE = join(__dirname, 'friends.json');
const PENDING_DMS_FILE = join(__dirname, 'pending-dms.json');
const DM_HISTORY_FILE = join(__dirname, 'dm-history.json');
const NEWS_FILE = join(__dirname, 'news.json');
const GLOBAL_BANS_FILE = join(__dirname, 'global-bans.json');

async function getPlayerData(username) {
  if (USE_REDIS) {
    const data = await redisCmd(['GET', `player_data:${username}`]);
    return data ? JSON.parse(data) : { stats: {}, settings: {} };
  }
  try {
    const f = join(__dirname, 'player-data.json');
    if (!existsSync(f)) return { stats: {}, settings: {} };
    const all = JSON.parse(readFileSync(f, 'utf8'));
    return all[username] || { stats: {}, settings: {} };
  } catch { return { stats: {}, settings: {} }; }
}

async function setPlayerData(username, data) {
  if (USE_REDIS) {
    await redisCmd(['SET', `player_data:${username}`, JSON.stringify(data)]);
    return;
  }
  try {
    const f = join(__dirname, 'player-data.json');
    let all = {};
    if (existsSync(f)) all = JSON.parse(readFileSync(f, 'utf8'));
    all[username] = data;
    writeFileSync(f, JSON.stringify(all, null, 2));
  } catch { console.warn('[Data] setPlayerData JSON write failed'); }
}

function safeSend(ws, data) {
  if (ws && ws.readyState === 1) {
    if (ws.bufferedAmount > 65536) return;
    try { ws.send(data); } catch (_) { console.warn('[Server] safeSend failed:', _); }
  }
}



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
const _redisWriters = {}; // key -> latest value writer (used for shutdown flush)
function redisSaveDebounced(key, getValue, ms = 1500) {
  if (!USE_REDIS) return;
  _redisWriters[key] = getValue;
  clearTimeout(_redisTimers[key]);
  _redisTimers[key] = setTimeout(() => flushRedisKey(key), ms);
}
function flushRedisKey(key) {
  const getValue = _redisWriters[key];
  if (!getValue) return Promise.resolve();
  return redisCmd(['SET', 'bf:' + key, JSON.stringify(getValue())])
    .catch(err => { console.warn('[Redis] save failed for ' + key + ':', err); });
}
// On shutdown, write out any pending debounced state so a restart never loses
// accounts/friends/rooms that were saved moments before.
async function flushRedisSaves() {
  await Promise.all(Object.keys(_redisWriters).map(flushRedisKey));
}

let rooms = new Map();
let serverStats = { dailyUsers: {}, monthlyUsers: {}, serversCreated: 0 };

// ── Pending DMs (offline message queue) ─────────────────────────────
// Maps lowercase username → array of { from, text, time, id }
let pendingDMs = {};
let _dmIdCounter = Date.now();
function _nextDmId() { return String(++_dmIdCounter); }

function loadPendingDMs() {
  if (USE_REDIS) {
    redisCmd(['GET', 'bf:pending-dms']).then(data => {
      if (data) try { pendingDMs = JSON.parse(data); } catch {}
    });
    return;
  }
  try {
    if (existsSync(PENDING_DMS_FILE)) {
      pendingDMs = JSON.parse(readFileSync(PENDING_DMS_FILE, 'utf8'));
    }
  } catch { pendingDMs = {}; }
}

function savePendingDMs() {
  if (USE_REDIS) {
    redisSaveDebounced('pending-dms', () => pendingDMs);
    return;
  }
  try { writeFileSync(PENDING_DMS_FILE, JSON.stringify(pendingDMs, null, 2)); } catch {}
}

function _deliverPendingDMs(username) {
  const key = String(username).toLowerCase();
  const msgs = pendingDMs[key];
  if (!msgs || !msgs.length) return;
  const ws = _wsForUser(username);
  if (!ws) return;
  // Deliver each queued DM — status is "sent" (single tick) since they were offline
  for (const m of msgs) {
    safeSend(ws, JSON.stringify({ type: 'dm', from: m.from, text: m.text, id: m.id, offline: true }));
    // Now that they're online, it's delivered
    safeSend(ws, JSON.stringify({ type: 'dm_status', id: m.id, status: 'delivered', from: m.from }));
  }
  // Also send a summary notification
  safeSend(ws, JSON.stringify({ type: 'dm_offline_count', count: msgs.length }));
  // Clear delivered messages
  delete pendingDMs[key];
  savePendingDMs();
  console.log(`[DM] Delivered ${msgs.length} offline DM(s) to ${username}`);
}

// ── DM History (cross-device sync) ────────────────────────────────
// Maps thread key "alice__bob" → array of { from, text, time, id }
const DM_HISTORY_MAX = 200; // per thread
let dmHistory = {};

function _dmThreadKey(a, b) {
  return [a, b].sort().join('__');
}

function loadDmHistory() {
  if (USE_REDIS) {
    redisCmd(['GET', 'bf:dm-history']).then(data => {
      if (data) try { dmHistory = JSON.parse(data); } catch {}
    });
    return;
  }
  try {
    if (existsSync(DM_HISTORY_FILE)) {
      dmHistory = JSON.parse(readFileSync(DM_HISTORY_FILE, 'utf8'));
    }
  } catch { dmHistory = {}; }
}

function saveDmHistory() {
  if (USE_REDIS) {
    redisSaveDebounced('dm-history', () => dmHistory);
    return;
  }
  try { writeFileSync(DM_HISTORY_FILE, JSON.stringify(dmHistory)); } catch {}
}

function _persistDmToHistory(from, to, text, time, id) {
  const key = _dmThreadKey(from, to);
  if (!dmHistory[key]) dmHistory[key] = [];
  // Dedup by id
  if (dmHistory[key].some(m => m.id === id)) return;
  dmHistory[key].push({ from, text, time, id });
  if (dmHistory[key].length > DM_HISTORY_MAX) dmHistory[key] = dmHistory[key].slice(-DM_HISTORY_MAX);
  saveDmHistory();
}

// Merge client-pushed threads into server history. Returns merged result for those threads.
function _mergeDmHistory(clientThreads) {
  const merged = {};
  for (const [key, msgs] of Object.entries(clientThreads)) {
    if (!Array.isArray(msgs)) continue;
    if (!dmHistory[key]) dmHistory[key] = [];
    // Add client messages not already present
    let changed = false;
    for (const m of msgs) {
      if (!m || !m.id) continue;
      if (dmHistory[key].some(s => s.id === m.id)) continue;
      dmHistory[key].push({ from: m.from, text: m.text, time: m.time, id: m.id });
      changed = true;
    }
    if (changed) {
      if (dmHistory[key].length > DM_HISTORY_MAX) dmHistory[key] = dmHistory[key].slice(-DM_HISTORY_MAX);
    }
    merged[key] = dmHistory[key];
  }
  saveDmHistory();
  return merged;
}

// Get all DM history threads involving a specific user
function _getDmHistoryForUser(username) {
  const result = {};
  const lower = username.toLowerCase();
  for (const [key, msgs] of Object.entries(dmHistory)) {
    const parts = key.split('__');
    if (parts.some(p => p.toLowerCase() === lower)) {
      result[key] = msgs;
    }
  }
  return result;
}

function handleDmSyncPush(ws, msg) {
  const pd = ws._playerData;
  if (!pd) return;
  const clientThreads = msg.threads;
  if (!clientThreads || typeof clientThreads !== 'object') return;
  const merged = _mergeDmHistory(clientThreads);
  safeSend(ws, JSON.stringify({ type: 'dm_sync_pull', threads: merged }));
}

function _roomsToObj() {
  if (!rooms) return {};
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
  try { writeFileSync(DATA_FILE, JSON.stringify({ rooms: _roomsToObj(), stats: serverStats }, null, 2));   } catch { console.warn('[Data] saveRooms file write failed'); }
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
        mobs: new Map(),
        _nextMobId: 1,
        created: r.created || Date.now()
      });
    }
    console.log(`[Data] Applied rooms data (${rooms.size} rooms)`);
  }
}

async function loadRooms() {
  if (USE_REDIS) {
    const data = await redisCmd(['GET', 'bf:server-data']);
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

// Create the official server (no owner, undeletable) if it doesn't exist and clear stale rooms
function ensureOfficialServer() {
  const official = rooms.get('OfficialSMP') || {
    seed: 12345,
    gameMode: 'survival',
    maxPlayers: 10,
    ownerName: null,
    ownerSecret: null,
    protected: true,
    players: new Map(),
    banned: new Set(),
    edits: new Map(),
    created: Date.now()
  };
  official.maxPlayers = 10; // hard cap on the public server
  rooms.clear();
  rooms.set('OfficialSMP', official);
  saveRooms();
  console.log('[Room] Cleared stale servers and ensured official server "OfficialSMP"');
}

// ── Role system ───────────────────────────────────────────────────────
const ROLE_GAMEDEV = 'gamedev', ROLE_OWNER = 'owner', ROLE_ADMIN = 'admin', ROLE_STAFF = 'staff', ROLE_PLAYER = 'player', ROLE_DEV = 'dev';
const ROLE_LEVEL = { [ROLE_DEV]: 6, [ROLE_GAMEDEV]: 5, [ROLE_OWNER]: 4, [ROLE_ADMIN]: 3, [ROLE_STAFF]: 2, [ROLE_PLAYER]: 1 };
const OWNER_USERNAME = 'LogicLeague'; // username that always carries the Owner tag

function generateSecret() {
  return randomBytes(24).toString('base64url');
}

function resolveRole(cgUsername, playerName) {
  // NOTE: never grant a privileged role from the client-supplied `cgUsername`.
  // Only real (password-authenticated) accounts and hardcoded devs get powers.
  if (playerName && DEV_USERNAMES.has(playerName.toLowerCase())) return ROLE_DEV;
  if (playerName && OWNER_USERNAME && playerName === OWNER_USERNAME && accounts[playerName]) return ROLE_DEV;
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
    const data = await redisCmd(['GET', 'bf:accounts']);
    if (data) { try { redisAccounts = JSON.parse(data) || {}; } catch { console.warn('[Data] Failed to parse Redis accounts JSON'); } }
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
    const out = {};
    for (const [k, v] of Object.entries(accounts)) if (!fileAccounts[k]) out[k] = v;
    // Persist immediately (not debounced): an account signup must survive a
    // server restart even if the debounce timer hasn't fired yet.
    _redisWriters['accounts'] = () => out;
    clearTimeout(_redisTimers['accounts']);
    redisCmd(['SET', 'bf:accounts', JSON.stringify(out)])
      .catch(err => { console.warn('[Redis] account save failed:', err); });
    return;
  }
  try { writeFileSync(ACCOUNTS_FILE, JSON.stringify(accounts, null, 2)); } catch { console.warn('[Data] saveAccounts file write failed'); }
}

// ── Global bans (timed, cross-server) ──────────────────────────────
let globalBans = {}; // { username: { expiresAt, reason, bannedBy, createdAt } }

function loadGlobalBans() {
  try {
    if (existsSync(GLOBAL_BANS_FILE)) globalBans = JSON.parse(readFileSync(GLOBAL_BANS_FILE, 'utf8')) || {};
  } catch { globalBans = {}; }
  // Purge expired bans on load
  const now = Date.now();
  for (const [user, ban] of Object.entries(globalBans)) {
    if (ban.expiresAt && ban.expiresAt <= now) delete globalBans[user];
  }
  if (Object.keys(globalBans).length !== Object.keys(globalBans).length) saveGlobalBans();
}

function saveGlobalBans() {
  try { writeFileSync(GLOBAL_BANS_FILE, JSON.stringify(globalBans, null, 2)); } catch { console.warn('[Data] saveGlobalBans write failed'); }
}

function isGloballyBanned(username) {
  const key = (username || '').toLowerCase();
  const ban = globalBans[key];
  if (!ban) return null;
  if (ban.expiresAt && ban.expiresAt <= Date.now()) {
    delete globalBans[key];
    saveGlobalBans();
    return null;
  }
  return ban;
}

async function hashPassword(password, salt) {
  const buf = await scryptAsync(password, salt, 64);
  return buf.toString('hex');
}

// Find an account by OAuth/CG identity (provider + providerId)
function findAccountByIdentity(provider, providerId) {
  if (!provider || !providerId) return null;
  for (const [name, acc] of Object.entries(accounts)) {
    if (acc.identities && acc.identities[provider] === providerId) return name;
  }
  return null;
}

// Temporary OAuth link sessions — generated when user wants to link identity from settings
const linkSessions = new Map();
setInterval(() => {
  const now = Date.now();
  for (const [key, val] of linkSessions) {
    if (now - val.createdAt > 600000) linkSessions.delete(key);
  }
}, 600000);

// Returns { ok, reason } — verifies or creates the account
// If identity is provided (e.g. { provider: 'github', id: '12345' }), password is optional
async function authAccount(username, password, mode, identity) {
  // Identity-based auth (OAuth / CrazyGames / etc.)
  if (identity && identity.provider && identity.id) {
    const existingName = findAccountByIdentity(identity.provider, identity.id);
    if (existingName) return { ok: true, username: existingName };
    // No linked account — auto-create with this identity
    if (!username) return { ok: false, reason: 'Username required.' };
    let safeName = filterProfanity(username).replace(/[^a-zA-Z0-9_]/g, '').slice(0, 16);
    if (safeName.length < 2) safeName = 'Player';
    // If name is taken by another account, append a number
    let finalName = safeName;
    let counter = 1;
    while (accounts[finalName] && !accounts[finalName].identities?.[identity.provider]) {
      finalName = Array.from(safeName).slice(0, 14).join('') + String(counter);
      counter++;
      if (counter > 100) { finalName = 'Player' + Date.now().toString(36); break; }
    }
    accounts[finalName] = { hash: '', salt: '', role: ROLE_PLAYER, tag: '', identities: { [identity.provider]: identity.id } };
    saveAccounts();
    return { ok: true, created: true, username: finalName };
  }

  // Password-based auth
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
    const data = await redisCmd(['GET', 'bf:friends']);
    if (data) { try { friends = JSON.parse(data) || {}; } catch { friends = {}; } }
    return;
  }
  if (!existsSync(FRIENDS_FILE)) return;
  try { friends = JSON.parse(readFileSync(FRIENDS_FILE, 'utf8')) || {}; } catch { friends = {}; }
}
function saveFriends() {
  if (USE_REDIS) { redisSaveDebounced('friends', () => friends); return; }
  try { writeFileSync(FRIENDS_FILE, JSON.stringify(friends)); } catch { /* ignored */ }
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
  if (!wss || !wss.clients) return null;
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
const DEV_USERNAMES = new Set(['logicleague', 'cdkide2']);
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS, POST',
};

// ── Community mod store ──────────────────────────────────────────────
// Uploaded .bfmod files are saved into community-mods/ (repo root). A build
// script (scripts/generate-downloads.mjs) also copies them into dist so the
// static client can serve them. The in-memory list is seeded from disk.
const COMMUNITY_MODS_DIR = join(__dirname, 'community-mods');
const COMMUNITY_MODS_INDEX = join(COMMUNITY_MODS_DIR, 'index.json');
let _communityMods = null; // lazy-loaded [{ id, name, version, description, author, icon, file, uploadedAt }]

function loadCommunityMods() {
  if (_communityMods) return _communityMods;
  try {
    if (existsSync(COMMUNITY_MODS_INDEX)) {
      _communityMods = JSON.parse(readFileSync(COMMUNITY_MODS_INDEX, 'utf8')) || [];
    } else {
      _communityMods = [];
    }
  } catch (_) {
    _communityMods = [];
  }
  return _communityMods;
}

function saveCommunityMods() {
  try {
    mkdirSync(COMMUNITY_MODS_DIR, { recursive: true });
    writeFileSync(COMMUNITY_MODS_INDEX, JSON.stringify(_communityMods.map(({ path, ...m }) => m), null, 2));
  } catch (e) {
    console.warn('[Mods] Failed to save community index', e.message);
  }
}

function friendlyMod(m) {
  const { path, ...rest } = m;
  return rest;
}

function communityMods() {
  return loadCommunityMods().map(friendlyMod);
}

function findCommunityMod(id) {
  const m = loadCommunityMods().find((x) => x.id === id) || null;
  if (m && !m.path && m.file) m.path = join(COMMUNITY_MODS_DIR, m.file);
  return m;
}

function slugify(s) {
  return String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 48);
}

// Parse the manifest object out of a .bfmod source string. This is a light
// regex parser — good enough for the mods page. The in-game importer does the
// authoritative validation when a mod is actually installed.
function parseModManifest(code) {
  if (typeof code !== 'string' || !code.includes('export const manifest')) {
    throw new Error('Not a BlockForge mod: missing "export const manifest".');
  }
  const m = code.match(/export\s+const\s+manifest\s*=\s*\{([\s\S]*?)\};/);
  if (!m) throw new Error('Could not parse manifest.');
  const body = m[1];
  const field = (name) => {
    const r = new RegExp(name + '\\s*:\\s*[\'"]([^\'"]*)[\'"]');
    const mm = body.match(r);
    return mm ? mm[1] : undefined;
  };
  const id = field('id') || slugify(field('name'));
  if (!id) throw new Error('Manifest needs an id or name.');
  return {
    id: String(id).replace(/[^a-z0-9-]/gi, ''),
    name: field('name') || id,
    version: field('version') || '1.0',
    description: field('description') || '',
    author: field('author') || 'Unknown',
    icon: field('icon') || '📦',
  };
}

// Validate + store an uploaded mod. Returns { ok, mod } or throws.
function addCommunityMod(code) {
  if (typeof code !== 'string' || code.length > 512 * 1024) {
    throw new Error('Mod is empty or too large (max 512KB).');
  }
  const meta = parseModManifest(code);
  const id = slugify(meta.id);
  if (!id) throw new Error('Invalid mod id.');

  const list = loadCommunityMods();
  const existing = list.find((x) => x.id === id);
  const rec = {
    id,
    name: meta.name,
    version: meta.version,
    description: meta.description,
    author: meta.author,
    icon: meta.icon || '📦',
    file: id + '.bfmod',
    path: join(COMMUNITY_MODS_DIR, id + '.bfmod'),
    uploadedAt: existing ? existing.uploadedAt : Date.now(),
    updatedAt: Date.now(),
  };
  try {
    mkdirSync(COMMUNITY_MODS_DIR, { recursive: true });
    writeFileSync(rec.path, code);
  } catch (e) {
    throw new Error('Could not store the mod file.');
  }
  if (existing) Object.assign(existing, rec);
  else list.push(rec);
  saveCommunityMods();
  const { path, ...pub } = rec;
  return { ok: true, mod: pub };
}


function serveFile(filePath, res) {
  try {
    const data = readFileSync(filePath);
    const ext = extname(filePath).toLowerCase();
    res.writeHead(200, { ...CORS, 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  } catch {
    try {
      const html = readFileSync(join(PUBLIC_DIR, 'index.html'));
      res.writeHead(200, { ...CORS, 'Content-Type': MIME['.html'] });
      res.end(html);
    } catch {
      res.writeHead(404, CORS);
      res.end('Not found');
    }
  }
}

// ── OAuth handlers (GitHub, Google, Microsoft) ──────────────────────
// Store CSRF states + target origins (cleaned up after 10 min)
const oauthStates = new Map();
setInterval(() => {
  const now = Date.now();
  for (const [key, val] of oauthStates) {
    if (now - val.createdAt > 600000) oauthStates.delete(key);
  }
}, 600000);

function htmlEsc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

// PKCE helpers — S256 code challenge per RFC 7636
function base64url(buf) {
  return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function pkceVerifier() {
  return base64url(randomBytes(32));
}
function pkceChallenge(verifier) {
  return base64url(createHash('sha256').update(verifier).digest());
}

function sendOAuthResponse(res, provider, username, error, gameOrigin, providerId, linked) {
  const data = JSON.stringify({ provider, username, error, providerId, linked: !!linked }).replace(/<\//g, '<\\/').replace(/<!--/g, '<\\!--');
  const org = gameOrigin || '*';
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`<html><body><script>
    (function(){ try { window.opener.postMessage(${data}, '${htmlEsc(org)}'); } catch(e){} window.close(); })();
  </script><p>${error ? 'Auth failed' : 'Logged in as ' + htmlEsc(username || 'Guest')}. Close this window.</p></body></html>`);
}
const OAUTH_PROVIDERS = {
  github: {
    authUrl: 'https://github.com/login/oauth/authorize',
    tokenUrl: 'https://github.com/login/oauth/access_token',
    userUrl: 'https://api.github.com/user',
    clientId: process.env.GITHUB_CLIENT_ID || '',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    scope: 'read:user',
    parseUser: (data) => ({ username: data.login, providerId: String(data.id), avatar: data.avatar_url }),
    headers: { Accept: 'application/json' },
  },
  google: {
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    userUrl: 'https://www.googleapis.com/oauth2/v2/userinfo',
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    scope: 'openid profile email',
    parseUser: (data) => ({ username: data.name || data.email, providerId: data.id, avatar: data.picture }),
  },
};

function handleOAuth(provider, isCallback, params, baseUrl, res) {
  const cfg = OAUTH_PROVIDERS[provider];
  if (!cfg || !cfg.clientId) {
    sendOAuthResponse(res, provider, 'Guest', 'OAuth not configured', '*');
    return;
  }

  if (!isCallback) {
    const gameOrigin = params.get('origin') || '*';
    if (gameOrigin === '*') console.warn('[OAuth] No ?origin= param — postMessage targetOrigin=* (insecure)');
    const linkToken = params.get('linkToken') || '';
    const redirectUri = `${baseUrl}/auth/${provider}/callback`;
    console.log(`[OAuth] ${provider} auth: redirect_uri=${redirectUri} origin=${gameOrigin}`);
    const state = randomBytes(16).toString('hex');
    // PKCE: generate verifier + challenge, store verifier for callback
    const codeVerifier = pkceVerifier();
    const codeChallenge = pkceChallenge(codeVerifier);
    oauthStates.set(state, { origin: gameOrigin, linkToken, codeVerifier, createdAt: Date.now() });
    const url = `${cfg.authUrl}?client_id=${cfg.clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(cfg.scope)}&state=${state}&response_type=code&code_challenge=${codeChallenge}&code_challenge_method=S256`;
    res.writeHead(302, { Location: url });
    res.end();
    return;
  }

  const code = params.get('code');
  const state = params.get('state');
  if (!code) { res.writeHead(400); res.end('Missing code'); return; }
  const stored = oauthStates.get(state);
  if (!stored) {
    sendOAuthResponse(res, provider, 'Guest', 'Invalid or expired state (CSRF check)', '*');
    return;
  }
  oauthStates.delete(state);
  const gameOrigin = stored.origin;
  const linkToken = stored.linkToken || '';
  const codeVerifier = stored.codeVerifier || '';

  const redirectUri = `${baseUrl}/auth/${provider}/callback`;
  const tokenBody = new URLSearchParams({
    client_id: cfg.clientId,
    client_secret: cfg.clientSecret,
    code,
    redirect_uri: redirectUri,
    grant_type: 'authorization_code',
    ...(codeVerifier ? { code_verifier: codeVerifier } : {}),
  }).toString();

  fetch(cfg.tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
    body: tokenBody,
  })
    .then(r => r.json())
    .then(tokenData => {
      const accessToken = tokenData.access_token;
      if (!accessToken) throw new Error('No access token');
      return fetch(cfg.userUrl, {
        headers: { Authorization: `Bearer ${accessToken}`, ...(cfg.headers || {}) },
      }).then(r => r.json());
    })
    .then(userData => {
      const parsed = cfg.parseUser(userData);
      const providerId = parsed.providerId || parsed.username || userData.sub || '';
      const rawUsername = parsed.username || '';
      const safeName = rawUsername ? rawUsername.replace(/[^a-zA-Z0-9_ -]/g, '').slice(0, 20) : 'Player';

      // If linkToken is present, this is a linking flow
      if (linkToken) {
        const linkSession = linkSessions.get(linkToken);
        if (!linkSession) {
          sendOAuthResponse(res, provider, 'Guest', 'Link session expired. Try again.', gameOrigin, providerId, false);
          return;
        }
        linkSessions.delete(linkToken);
        const targetUsername = linkSession.username;
        const existingName = findAccountByIdentity(provider, providerId);
        if (existingName && existingName !== targetUsername) {
          sendOAuthResponse(res, provider, 'Guest', `Identity already linked to "${existingName}"`, gameOrigin, providerId, false);
          return;
        }
        if (!accounts[targetUsername]) {
          sendOAuthResponse(res, provider, 'Guest', 'Account not found', gameOrigin, providerId, false);
          return;
        }
        if (!accounts[targetUsername].identities) accounts[targetUsername].identities = {};
        accounts[targetUsername].identities[provider] = providerId;
        saveAccounts();
        sendOAuthResponse(res, provider, targetUsername, null, gameOrigin, providerId, true);
        return;
      }

      // Normal login flow — check if identity already linked to an account
      const existingName = findAccountByIdentity(provider, providerId);
      if (existingName) {
        sendOAuthResponse(res, provider, existingName, null, gameOrigin, providerId, true);
      } else {
        sendOAuthResponse(res, provider, safeName, null, gameOrigin, providerId, false);
      }
    })
    .catch(err => {
      console.error('[OAuth]', provider, err);
      sendOAuthResponse(res, provider, 'Guest', err.message, gameOrigin);
    });
}

// ── Identity linking handlers (WebSocket) ────────────────────────────

async function handleLinkIdentity(ws, msg) {
  const { identityType, identityId } = msg;
  if (!ws._playerData) return sendError(ws, 'Not authenticated');
  const username = ws._playerData.name;
  if (!identityType || !identityId) return sendError(ws, 'Missing identity type or ID');
  const existing = findAccountByIdentity(identityType, identityId);
  if (existing && existing !== username) return sendError(ws, `Identity already linked to "${existing}"`);
  if (!accounts[username]) return sendError(ws, 'Account not found');
  if (!accounts[username].identities) accounts[username].identities = {};
  accounts[username].identities[identityType] = identityId;
  saveAccounts();
  safeSend(ws, JSON.stringify({ type: 'link_identity_result', ok: true }));
}

async function handleStartOAuthLink(ws, msg) {
  const { provider } = msg;
  if (!ws._playerData) return sendError(ws, 'Not authenticated');
  if (!OAUTH_PROVIDERS[provider]) return sendError(ws, 'Unknown provider');
  const linkToken = randomBytes(16).toString('hex');
  linkSessions.set(linkToken, { username: ws._playerData.name, createdAt: Date.now() });
  safeSend(ws, JSON.stringify({ type: 'start_oauth_link_result', ok: true, linkToken }));
}

// Link another account (by username + password) into the current account.
// The target's login identities are merged into the current account, then the
// target account record is removed so everything lives under one account.
async function handleLinkCredentials(ws, msg) {
  const pd = ws._playerData;
  if (!pd || !pd.name) return sendError(ws, 'Not authenticated');
  const currentName = pd.name;
  const target = filterProfanity((msg.targetUsername || '').trim());
  const password = msg.targetPassword || '';
  if (!target || !password) return sendError(ws, 'Enter the other account username and password.');
  if (target.toLowerCase() === currentName.toLowerCase()) return sendError(ws, 'That is already your current account.');
  const auth = await authAccount(target, password, 'login');
  if (!auth.ok) return sendError(ws, auth.reason || 'That account could not be verified.');
  if (!accounts[target]) return sendError(ws, 'Account not found.');
  if (!accounts[currentName]) return sendError(ws, 'Your account was not found.');
  const targetIdentities = accounts[target].identities || {};
  const currentIdentities = accounts[currentName].identities || {};
  for (const [prov, id] of Object.entries(targetIdentities)) {
    const existing = findAccountByIdentity(prov, id);
    if (existing && existing !== target && existing !== currentName) {
      return sendError(ws, `"${prov}" is already linked to "${existing}".`);
    }
    currentIdentities[prov] = id;
  }
  accounts[currentName].identities = currentIdentities;
  delete accounts[target];
  saveAccounts();
  safeSend(ws, JSON.stringify({ type: 'link_account_result', ok: true, linkedUsername: target }));
}

function handleUnlinkIdentity(ws, msg) {
  const pd = ws._playerData;
  if (!pd || !pd.name) return sendError(ws, 'Not authenticated');
  const username = pd.name;
  const acc = accounts[username];
  if (!acc) return sendError(ws, 'Account not found.');
  const provider = (msg.identityType || '').trim();
  if (!provider) return sendError(ws, 'Missing provider.');
  const ids = acc.identities || {};
  if (!(provider in ids)) return sendError(ws, `"${provider}" is not linked.`);
  // Don't remove the last login method if there is no password (would lock the player out).
  const remaining = Object.keys(ids).filter(p => p !== provider);
  if (!acc.hash && remaining.length === 0) return sendError(ws, 'Cannot unlink your only login method — set a password first.');
  delete ids[provider];
  acc.identities = ids;
  saveAccounts();
  safeSend(ws, JSON.stringify({ type: 'unlink_identity_result', ok: true, identityType: provider }));
}

const server = http.createServer((req, res) => {
  const { pathname } = new URL(req.url, 'http://localhost');
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

  // --- CrazyGames OAuth-link endpoint (used when on CG and linking GitHub/Google) ---
  if (pathname === '/auth/cg-link' && req.method === 'POST') {
    const corsOrigin = req.headers.origin || '*';
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': corsOrigin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    let body = '';
    let bodyBytes = 0;
    req.on('data', chunk => { body += chunk; bodyBytes += chunk.length; if (bodyBytes > 4096) { req.destroy(); } });
    req.on('end', () => {
      try {
        const { cgUserId, cgUsername } = JSON.parse(body);
        if (!cgUserId) { res.end(JSON.stringify({ ok: false, reason: 'Missing cgUserId' })); return; }
        let username = findAccountByIdentity('crazygames', cgUserId);
        if (!username) {
          const safeName = filterProfanity(cgUsername || 'Player').replace(/[^a-zA-Z0-9_]/g, '').slice(0, 16) || 'Player';
          let finalName = safeName;
          let counter = 1;
          while (accounts[finalName]) {
            finalName = Array.from(safeName).slice(0, 14).join('') + String(counter);
            counter++;
            if (counter > 100) { finalName = 'Player' + Date.now().toString(36); break; }
          }
          accounts[finalName] = { hash: '', salt: '', role: ROLE_PLAYER, tag: '', identities: { crazygames: cgUserId } };
          saveAccounts();
          username = finalName;
        }
        const linkToken = randomBytes(16).toString('hex');
        linkSessions.set(linkToken, { username, createdAt: Date.now() });
        res.end(JSON.stringify({ ok: true, linkToken, username }));
      } catch (e) {
        res.end(JSON.stringify({ ok: false, reason: 'Invalid request' }));
      }
    });
    return;
  }

  // --- CrazyGames identity endpoint ---
  if (pathname === '/auth/crazygames' && req.method === 'POST') {
    const corsOrigin = req.headers.origin || '*';
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': corsOrigin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    let body = '';
    let bodyBytes = 0;
    req.on('data', chunk => { body += chunk; bodyBytes += chunk.length; if (bodyBytes > 4096) { req.destroy(); } });
    req.on('end', () => {
      try {
        const { cgUserId, cgUsername } = JSON.parse(body);
        if (!cgUserId) { res.end(JSON.stringify({ ok: false, reason: 'Missing cgUserId' })); return; }
        const existingName = findAccountByIdentity('crazygames', cgUserId);
        if (existingName) {
          res.end(JSON.stringify({ ok: true, username: existingName, linked: true, provider: 'crazygames', providerId: cgUserId }));
        } else {
          const safeName = filterProfanity(cgUsername || 'Player').replace(/[^a-zA-Z0-9_]/g, '').slice(0, 16) || 'Player';
          res.end(JSON.stringify({ ok: true, username: safeName, linked: false, provider: 'crazygames', providerId: cgUserId }));
        }
      } catch (e) {
        res.end(JSON.stringify({ ok: false, reason: 'Invalid request' }));
      }
    });
    return;
  }

  // --- OAuth routes (GitHub, Google, Microsoft) ---
  const urlObj = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const authMatch = pathname.match(/^\/auth\/(github|google)(?:\/callback)?$/);
  if (authMatch) {
    const provider = authMatch[1];
    const isCallback = pathname.endsWith('/callback');
    const baseUrl = `${req.headers['x-forwarded-proto'] || 'https'}://${req.headers.host || 'localhost'}`;
    return handleOAuth(provider, isCallback, urlObj.searchParams, baseUrl, res);
  }

  // ── Community mods: list + upload + download ─────────────────────
  // Community .bfmod files are stored in community-mods/ (repo root, also
  // copied into dist/mods/community at build time) and advertised to the
  // mods page via /api/mods/community.
  if (pathname === '/api/mods/community') {
    res.writeHead(200, { ...CORS, 'Content-Type': 'application/json' });
    res.end(JSON.stringify(communityMods()));
    return;
  }
  if (pathname === '/api/mods/upload' && req.method === 'POST') {
    const corsOrigin = req.headers.origin || '*';
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': corsOrigin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    let body = '';
    let bodyBytes = 0;
    req.on('data', chunk => { body += chunk; bodyBytes += chunk.length; if (bodyBytes > 512 * 1024) { req.destroy(); } });
    req.on('end', () => {
      try {
        const result = addCommunityMod(body);
        res.end(JSON.stringify(result));
      } catch (e) {
        res.writeHead(400);
        res.end(JSON.stringify({ ok: false, reason: e.message || 'Invalid request' }));
      }
    });
    return;
  }
  // Download a community mod by its canonical id.
  const modDl = pathname.match(/^\/api\/mods\/download\/([\w.-]+)$/);
  if (modDl && req.method === 'GET') {
    const id = decodeURIComponent(modDl[1]);
    const found = findCommunityMod(id);
    if (found && existsSync(found.path)) {
      const data = readFileSync(found.path);
      res.writeHead(200, {
        ...CORS,
        'Content-Type': 'text/plain; charset=utf-8',
        'Content-Disposition': 'attachment; filename="' + found.id + '.bfmod"',
      });
      res.end(data);
    } else {
      res.writeHead(404, CORS);
      res.end(JSON.stringify({ ok: false, reason: 'Mod not found' }));
    }
    return;
  }

  // Serve download files from dist/downloads/ (generated by postbuild)
  // Fall back to GitHub Release for large binaries that can't live in git (>100MB).
  let urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
  if (urlPath.startsWith('/downloads/')) {
    const DL_DIR = join(PUBLIC_DIR, 'downloads');
    const dlPath = join(DL_DIR, urlPath.slice('/downloads/'.length));
    if (dlPath.startsWith(DL_DIR)) {
      try {
        const data = readFileSync(dlPath);
        const ext = extname(dlPath).toLowerCase();
        const dlMime = { '.tgz': 'application/gzip', '.zip': 'application/zip', '.dmg': 'application/x-apple-diskimage', '.exe': 'application/vnd.microsoft.portable-executable', '.apk': 'application/vnd.android.package-archive', '.ipa': 'application/octet-stream' };
        res.writeHead(200, {
          'Content-Type': dlMime[ext] || 'application/octet-stream',
          'Content-Disposition': 'attachment; filename="' + basename(dlPath) + '"',
          'Access-Control-Allow-Origin': '*',
        });
        res.end(data);
        return;
      } catch {
        const releaseUrl = 'https://github.com/LogicLeague47/BlockForge/releases/download/binaries/' + basename(dlPath);
        res.writeHead(302, { Location: releaseUrl });
        res.end('Redirecting to ' + releaseUrl);
        return;
      }
    }
    res.writeHead(403); res.end('Forbidden'); return;
  }
  // Serve static game files from dist/
  if (urlPath === '/') urlPath = '/index.html';
  const filePath = join(PUBLIC_DIR, urlPath);
  // Prevent path traversal
  if (!filePath.startsWith(PUBLIC_DIR)) { res.writeHead(403); res.end('Forbidden'); return; }
  serveFile(filePath, res);
});

// ── WebSocket server ──────────────────────────────────────────────────
const wss = new WebSocketServer({ server, maxPayload: 256 * 1024 }); // 256KB max message

// Rate limiter: max 60 messages per second per connection. Position updates
// stream at 30Hz (12-22 bytes each) plus occasional chat/armor/block messages,
// so a tight cap like 30/s silently dropped position frames and made remote
// players move choppily.
function isRateLimited(ws) {
  const now = Date.now();
  if (!ws._rateLimit) ws._rateLimit = { count: 0, window: now };
  if (now - ws._rateLimit.window > 1000) { ws._rateLimit.count = 0; ws._rateLimit.window = now; }
  ws._rateLimit.count++;
  return ws._rateLimit.count > 60;
}

  wss.on('connection', (ws) => {
    ws._playerData = null;
    ws._roomName = null;
    ws.isAlive = true;
    ws.on('pong', () => { ws.isAlive = true; });
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
      } catch (_) { console.warn('[Server] Binary message parse failed'); }
      return;
    }
    let msg;
    try { msg = JSON.parse(raw); } catch { return; }
    if (isRateLimited(ws)) return;
    if (typeof msg !== 'object' || msg === null) return;

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
        if (ws._playerData) ws._playerData.armor = msg.armor ?? null;
        break;
      case 'player_damage': handlePlayerDamage(ws, msg); break;
      case 'chat': handleChat(ws, msg); break;
      case 'dm': handleDm(ws, msg); break;
      case 'dm_read': handleDmRead(ws, msg); break;
      case 'dm_sync_push': handleDmSyncPush(ws, msg); break;
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
      case 'leaderboard_get': handleLeaderboardGet(ws, msg); break;
      case 'dev_get_all_players': handleDevGetAllPlayers(ws, msg); break;
      case 'dev_list_accounts': handleDevListAccounts(ws, msg); break;
      case 'dev_get_account': handleDevGetAccount(ws, msg); break;
      case 'dev_set_tag': handleDevSetTag(ws, msg); break;
      case 'dev_set_role': handleDevSetRole(ws, msg); break;
      case 'dev_delete_account': handleDevDeleteAccount(ws, msg); break;
      case 'dev_get_stats': handleDevGetStats(ws, msg); break;
      case 'dev_timed_ban': handleDevTimedBan(ws, msg); break;
      case 'dev_unban': handleDevUnban(ws, msg); break;
      case 'dev_global_bans': handleDevGlobalBans(ws, msg); break;
      case 'news_verify': handleNewsVerify(ws, msg); break;
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
      case 'community_chat': handleCommunityChat(ws, msg); break;
      case 'community_chat_history': handleCommunityChatHistory(ws); break;
      case 'news_list': handleNewsList(ws); break;
      case 'news_post': handleNewsPost(ws, msg); break;
      case 'news_delete': handleNewsDelete(ws, msg); break;
      // Identity linking
      case 'link_identity': handleLinkIdentity(ws, msg); break;
      case 'start_oauth_link': handleStartOAuthLink(ws, msg); break;
      case 'get_own_account': handleGetOwnAccount(ws); break;
      case 'link_account': handleLinkCredentials(ws, msg); break;
      case 'unlink_identity': handleUnlinkIdentity(ws, msg); break;
    }
    } catch (err) { console.error('[Server] Error handling message:', msg?.type, err); }
  });

  ws.on('close', () => {
    console.log(`[Conn] Client disconnected`);
    const leavingName = ws._playerData && ws._playerData.name;
    const leavingWasGuest = !!ws._playerData && ws._playerData.isGuest;
    handleLeave(ws);
    // Portal chat leave
    if (ws._portalChat && leavingName) _communityChatLeave(leavingName);
    // Let this user's friends know they went offline.
    if (leavingName && friends[leavingName]) {
      for (const fn of _friendRec(leavingName).friends) notifyFriendState(fn);
    }
    // Guest accounts are throwaway — wipe the username and all its player data
    // the moment they disconnect so they never pile up in the DB.
    if (leavingWasGuest && leavingName) {
      deleteGuestAccount(leavingName);
    }
  });
});

// ── Handlers ──────────────────────────────────────────────────────────

// Authenticate a username+password without joining a room (used by login screen)
// Also supports identity-based auth (OAuth / CrazyGames) via identityType + identityId
async function handleAuth(ws, msg) {
  const { playerName: rawName, password, mode, identityType, identityId } = msg;
  const playerName = filterProfanity(rawName);
  // In LAN mode, skip auth and always succeed
  if (IS_LAN) {
    safeSend(ws, JSON.stringify({ type: 'auth_result', ok: true, created: false, reason: '', username: playerName }));
    return;
  }
  const identity = (identityType && identityId) ? { provider: identityType, id: identityId } : null;
  const auth = await authAccount(playerName, password, mode, identity);
  const resolvedUsername = auth.username || playerName;
  // Portal chat tracking — always allow, even if auth fails (portal handles login)
  if (mode === 'portal_chat') {
    ws._portalChat = true;
    if (!ws._playerData) {
      const chatRole = resolveRole(null, resolvedUsername) || (accounts[resolvedUsername] || {}).role || ROLE_PLAYER;
      ws._playerData = { name: resolvedUsername, role: chatRole, menuOnly: true, x: 0, y: 40, z: 0, yaw: 0, ws, isGuest: false };
    }
    _communityChatJoin(resolvedUsername);
  }
  // On successful auth, attach a lightweight identity to the socket (no room)
  // so friend management works from the menu without joining a world.
  if (auth.ok && !ws._roomName) {
    const acc = accounts[resolvedUsername] || {};
    if (!accounts[resolvedUsername]) accounts[resolvedUsername] = acc;
    const resolvedRole = resolveRole(null, resolvedUsername) || acc.role || ROLE_PLAYER;
    const isGuest = identityType === 'guest';
    if (isGuest && !acc.isGuest) { acc.isGuest = true; saveAccounts(); }
    ws._playerData = { name: resolvedUsername, role: resolvedRole, menuOnly: true, x: 0, y: 40, z: 0, yaw: 0, ws, isGuest };
    // Let friends know we're online, and send our friend state.
    if (friends[resolvedUsername]) {
      for (const fn of _friendRec(resolvedUsername).friends) notifyFriendState(fn);
    }
    sendFriendState(ws);
    // Deliver any pending offline DMs
    _deliverPendingDMs(resolvedUsername);
    // Send full DM history for cross-device sync
    const userHistory = _getDmHistoryForUser(resolvedUsername);
    if (Object.keys(userHistory).length > 0) {
      safeSend(ws, JSON.stringify({ type: 'dm_sync_pull', threads: userHistory }));
    }
  }
  const acc = accounts[resolvedUsername] || {};
  const resolvedRole = resolveRole(null, resolvedUsername) || acc.role || ROLE_PLAYER;
  safeSend(ws, JSON.stringify({
    type: 'auth_result',
    ok: auth.ok,
    created: !!auth.created,
    reason: auth.reason || '',
    username: resolvedUsername,
    role: resolvedRole,
    tag: acc.tag || ''
  }));
}

async function handleCreateRoom(ws, msg) {
  const { name, seed, gameMode, maxPlayers, playerName: rawName, cgUsername, skinIndex, ownerSecret, noOwner, password, isPrivate } = msg;
  const playerName = filterProfanity(rawName);
  if (!name || !playerName) return sendError(ws, 'Missing room name or player name.');
  if (ws._playerData && ws._playerData.isGuest) return sendError(ws, 'You need to create an account to play multiplayer!');

  // Authenticate account (LAN mode skips auth since it's a local/dev server)
  if (!IS_LAN) {
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
      mobs: new Map(),
      _nextMobId: 1,
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
  if (ws._playerData && ws._playerData.isGuest) return sendError(ws, 'You need to create an account to play multiplayer!');

  // Authenticate account (LAN mode skips auth since it's a local/dev server)
  if (!IS_LAN) {
    const auth = await authAccount(playerName, password);
    if (!auth.ok) return sendError(ws, auth.reason);
  }

  const room = getRoom(roomName);
  if (!room) return sendError(ws, `Room "${roomName}" not found.`);

  if (room.banned.has(playerName)) return sendError(ws, 'You are banned from this server.');
  const globalBan = isGloballyBanned(playerName);
  if (globalBan) {
    const until = globalBan.expiresAt ? new Date(globalBan.expiresAt).toLocaleString() : 'permanently';
    return sendError(ws, `Globally banned ${until}: ${globalBan.reason || 'No reason given'}`);
  }
  if (!IS_LAN && !canAccessRoom(room, playerName)) {
    return sendError(ws, 'This is a private world. Ask the owner to add you as a friend.');
  }
  if (room.players.size >= room.maxPlayers) return sendError(ws, 'Server is full (max 10 players). Please play singleplayer or try again later.');

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

  if (room.players.size > 6) {
    safeSend(ws, JSON.stringify({ type: 'chat', name: '§eServer', role: '', text: `§e⚠ There are ${room.players.size} players in this room. Performance may drop with more than 6.` }));
  }

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

  // Deliver any pending offline DMs
  _deliverPendingDMs(playerName);
  // Send full DM history for cross-device sync
  const userHistory = _getDmHistoryForUser(playerName);
  if (Object.keys(userHistory).length > 0) {
    safeSend(ws, JSON.stringify({ type: 'dm_sync_pull', threads: userHistory }));
  }
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
  const x = Math.floor(Number(msg.x)) || 0, y = Math.floor(Number(msg.y)) || 0, z = Math.floor(Number(msg.z)) || 0;
  if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(z)) return;
  if (y < 0 || y > 256) return;
  const block = Math.floor(Math.abs(msg.block)) || 0;
  room.edits.set(`${x},${y},${z}`, block);
  // Broadcast to everyone else in the room
  broadcast(room, { type: 'block_update', x, y, z, block }, ws);
  scheduleSaveRooms();
}

// ── Mob sync handlers ────────────────────────────────────────────────
function handleMobSpawn(ws, msg) {
  const room = getRoom(ws._roomName);
  if (!room) return;
  const id = Math.floor(Number(msg.id)) || 0;
  const type = String(msg.type ?? '').slice(0, 32);
  if (!id || !type) return;
  const x = +msg.x || 0, y = +msg.y || 0, z = +msg.z || 0;
  room.mobs.set(id, { type, x, y, z });
  broadcast(room, { type: 'mob_spawn', id, type, x, y, z }, ws);
}

function handleMobPosition(ws, msg) {
  const room = getRoom(ws._roomName);
  if (!room) return;
  const id = Math.floor(Number(msg.id)) || 0;
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
  const id = Math.floor(Number(msg.id)) || 0;
  if (!id) return;
  broadcast(room, { type: 'mob_damage', id, hp: Math.floor(Number(msg.hp)) || 0 }, ws);
}

function handleMobDeath(ws, msg) {
  const room = getRoom(ws._roomName);
  if (!room) return;
  const id = Math.floor(Number(msg.id)) || 0;
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

  try {
    removeVoiceClient(ws, roomName);
    for (const [code, group] of voiceGroups) {
      if (group.has(ws)) {
        group.delete(ws);
        const name = pd.name || 'Unknown';
        for (const member of group) {
          safeSend(member, JSON.stringify({ type: 'voice_group_peer_leave', name }));
        }
        if (group.size === 0) voiceGroups.delete(code);
      }
    }
  } catch (_) { console.warn('[Room] handleLeave cleanup error:', _); }

  ws._playerData = null;
  ws._roomName = null;
}

// Guests are throwaway sessions: on disconnect we purge the account, its
// stats/settings player-data, and any friend records so they never accumulate.
function deleteGuestAccount(name) {
  try {
    const wasGuest = !!(accounts[name] && accounts[name].isGuest);
    // Only purge records that look like a guest — never touch a real account
    // that happened to reconnect under the same name.
    if (accounts[name] && !wasGuest) return;

    delete accounts[name];
    saveAccounts();

    if (friends[name]) {
      delete friends[name];
      // Strip this guest from every other user's friends/incoming/outgoing lists.
      for (const [other, f] of Object.entries(friends)) {
        if (f.friends) f.friends = f.friends.filter(n => n !== name);
        if (f.incoming) f.incoming = f.incoming.filter(n => n !== name);
        if (f.outgoing) f.outgoing = f.outgoing.filter(n => n !== name);
      }
      saveFriends();
    }

    if (USE_REDIS) {
      redisCmd(['DEL', `player_data:${name}`]).catch(() => {});
    } else {
      try {
        const f = join(__dirname, 'player-data.json');
        if (existsSync(f)) {
          const all = JSON.parse(readFileSync(f, 'utf8'));
          if (all[name]) {
            delete all[name];
            writeFileSync(f, JSON.stringify(all, null, 2));
          }
        }
      } catch { console.warn('[Data] deleteGuestAccount player-data write failed'); }
    }
    console.log(`[Data] Guest account "${name}" purged on disconnect`);
  } catch (err) { console.warn('[Data] deleteGuestAccount failed:', err); }
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
  const newX = msg.x ?? 0, newY = msg.y ?? 0, newZ = msg.z ?? 0;
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
  pd.yaw = msg.yaw ?? 0;
  pd.crouching = !!msg.crouching;
  if (msg.armor !== undefined) pd.armor = msg.armor ?? null;

  // Rate-limit broadcast: max 30Hz per player (server side) to match the
  // client's 30Hz position send, giving remote players smooth interpolation.
  const now = Date.now();
  if (pd._lastBroadcast && now - pd._lastBroadcast < 33) return;
  pd._lastBroadcast = now;

  // Broadcast position as binary — proximity culled (skip players >64 blocks away)
  if (!pd._nameBuf) pd._nameBuf = Buffer.from(pd.name, 'utf8');
  const nameBytes = pd._nameBuf;
  const maxSize = 1 + 1 + nameBytes.length + 16 + 1;
  if (!pd._posBuf || pd._posBuf.length < maxSize) pd._posBuf = Buffer.alloc(maxSize);
  const binBuf = pd._posBuf;
  binBuf.writeUInt8(0x01, 0);
  binBuf.writeUInt8(nameBytes.length, 1);
  nameBytes.copy(binBuf, 2);
  let off = 2 + nameBytes.length;
  binBuf.writeFloatBE(pd.x, off); off += 4;
  binBuf.writeFloatBE(pd.y, off); off += 4;
  binBuf.writeFloatBE(pd.z, off); off += 4;
  binBuf.writeFloatBE(pd.yaw, off); off += 4;
  binBuf.writeUInt8(pd.crouching ? 1 : 0, off); off += 1;
  // Broadcast to every other player in the room. No proximity cull:
  // players spawn far apart (saved positions, deterministic seeds) and the
  // client already hides models beyond its render distance. Culling here
  // left remote models marooned at the hardcoded origin spawn point.
  for (const [targetWs] of room.players) {
    if (targetWs === ws) continue;
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

  const text = filterProfanity((msg.text ?? '').trim());
  if (!text) return;

  broadcast(room, { type: 'chat', name: pd.name, role: pd.role, text });
}

function handleDm(ws, msg) {
  const pd = ws._playerData;
  if (!pd) return;

  const target = filterProfanity((msg.to ?? '').trim());
  const text = filterProfanity((msg.text ?? '').trim());
  if (!target || !text) return;
  if (target === pd.name) {
    return safeSend(ws, JSON.stringify({ type: 'friend_msg', text: "You can't DM yourself.", ok: false }));
  }

  const msgId = msg.id || _nextDmId();
  const now = Date.now();
  // Persist to DM history for cross-device sync
  _persistDmToHistory(pd.name, target, text, now, msgId);

  const targetWs = _wsForUser(target);
  if (!targetWs) {
    // Target is offline — queue the message for delivery when they log in
    const key = target.toLowerCase();
    if (!pendingDMs[key]) pendingDMs[key] = [];
    pendingDMs[key].push({ from: pd.name, text, time: Date.now(), id: msgId });
    // Cap per-user queue at 100 messages
    if (pendingDMs[key].length > 100) pendingDMs[key] = pendingDMs[key].slice(-100);
    savePendingDMs();
    // Single tick: sent but not delivered (they're offline)
    return safeSend(ws, JSON.stringify({ type: 'dm_status', id: msgId, status: 'sent', from: target }));
  }

  // Target is online — deliver immediately
  safeSend(targetWs, JSON.stringify({ type: 'dm', from: pd.name, text, id: msgId }));
  // Double grey tick: delivered
  safeSend(ws, JSON.stringify({ type: 'dm_status', id: msgId, status: 'delivered', from: target }));
}

function handleDmRead(ws, msg) {
  const pd = ws._playerData;
  if (!pd) return;
  const from = (msg.from ?? '').trim();
  if (!from) return;
  // Notify the sender that this user read their messages (double blue tick)
  const senderWs = _wsForUser(from);
  if (senderWs) {
    safeSend(senderWs, JSON.stringify({ type: 'dm_status', id: msg.id || '*', status: 'read', from: pd.name }));
  }
}

// ── Community Chat (global, portal-wide) ───────────────────────────────
const _communityChatHistory = [];
const COMMUNITY_CHAT_MAX = 100;
const _communityChatUsers = new Set();

function _broadcastCommunityChat(msg) {
  const data = JSON.stringify(msg);
  if (wss && wss.clients) {
    for (const client of wss.clients) {
      if (client.readyState === 1) safeSend(client, data);
    }
  }
}

function handleCommunityChat(ws, msg) {
  const pd = ws._playerData;
  const name = pd ? pd.name : 'Anonymous';
  const role = pd ? (pd.role || 'player') : 'player';
  const text = filterProfanity((msg.text ?? '').trim());
  if (!text) return;
  const entry = { name, role, text, time: Date.now() };
  _communityChatHistory.push(entry);
  if (_communityChatHistory.length > COMMUNITY_CHAT_MAX) _communityChatHistory.shift();
  _broadcastCommunityChat({ type: 'community_chat', ...entry });
}

function handleCommunityChatHistory(ws) {
  safeSend(ws, JSON.stringify({ type: 'community_chat_history', messages: _communityChatHistory }));
  safeSend(ws, JSON.stringify({ type: 'community_online', count: _communityChatUsers.size }));
}

function _communityChatJoin(name) {
  if (_communityChatUsers.has(name)) return;
  _communityChatUsers.add(name);
  _broadcastCommunityChat({ type: 'community_online', count: _communityChatUsers.size });
  _broadcastCommunityChat({ type: 'community_chat', name: 'System', role: 'system', text: name + ' joined the chat', time: Date.now() });
}

function _communityChatLeave(name) {
  if (!_communityChatUsers.has(name)) return;
  _communityChatUsers.delete(name);
  _broadcastCommunityChat({ type: 'community_online', count: _communityChatUsers.size });
  _broadcastCommunityChat({ type: 'community_chat', name: 'System', role: 'system', text: name + ' left the chat', time: Date.now() });
}

// ── News & Updates (portal announcements) ────────────────────────────────
// Only developer-role accounts (verified server-side) may post news.
// Items persist to Redis (bf:news) with a local JSON fallback.
let newsItems = []; // { id, title, description, mediaUrl, mediaType, author, createdAt }
const NEWS_MAX = 200;

async function loadNews() {
  try {
    if (existsSync(NEWS_FILE)) newsItems = JSON.parse(readFileSync(NEWS_FILE, 'utf8')) || [];
  } catch { newsItems = []; }
  if (USE_REDIS) {
    const data = await redisCmd(['GET', 'bf:news']);
    if (data) { try { const parsed = JSON.parse(data); if (Array.isArray(parsed)) newsItems = parsed; } catch { console.warn('[News] Failed to parse Redis news JSON'); } }
  }
}

function saveNews() {
  try { writeFileSync(NEWS_FILE, JSON.stringify(newsItems, null, 2)); } catch { console.warn('[News] file write failed'); }
  if (USE_REDIS) {
    redisCmd(['SET', 'bf:news', JSON.stringify(newsItems)])
      .catch(err => console.warn('[News] Redis save failed:', err));
  }
}

function _isNewsPoster(role) {
  return role === ROLE_DEV || role === ROLE_GAMEDEV || role === ROLE_OWNER;
}

function _broadcastNews() {
  const data = JSON.stringify({ type: 'news_list', items: newsItems });
  if (wss && wss.clients) {
    for (const client of wss.clients) {
      if (client.readyState === 1) safeSend(client, data);
    }
  }
}

function handleNewsList(ws) {
  safeSend(ws, JSON.stringify({ type: 'news_list', items: newsItems }));
}

function handleNewsPost(ws, msg) {
  if (ws._portalChat) return sendError(ws, 'Authenticate with your password to post news.');
  const role = ws._playerData && ws._playerData.role;
  const author = ws._playerData && ws._playerData.name;
  if (!_isNewsPoster(role)) return sendError(ws, 'You need Developer permissions to post news.');
  const title = filterProfanity((msg.title || '').trim()).slice(0, 120);
  const description = filterProfanity((msg.description || '').trim()).slice(0, 2000);
  if (!title || !description) return sendError(ws, 'A title and description are required.');
  let mediaUrl = (msg.mediaUrl || '').trim().slice(0, 500);
  if (mediaUrl && !/^https?:\/\//i.test(mediaUrl)) return sendError(ws, 'Media URL must start with http:// or https://.');
  const mediaType = msg.mediaType === 'video' ? 'video' : 'image';
  const item = {
    id: 'n' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    title,
    description,
    mediaUrl: mediaUrl || '',
    mediaType,
    author: author || 'Developer',
    createdAt: Date.now(),
  };
  newsItems.unshift(item);
  if (newsItems.length > NEWS_MAX) newsItems.length = NEWS_MAX;
  saveNews();
  _broadcastNews();
  safeSend(ws, JSON.stringify({ type: 'news_posted', ok: true, item }));
}

function handleNewsDelete(ws, msg) {
  if (ws._portalChat) return sendError(ws, 'Authenticate with your password to delete news.');
  const role = ws._playerData && ws._playerData.role;
  if (!_isNewsPoster(role)) return sendError(ws, 'You need Developer permissions to delete news.');
  const idx = newsItems.findIndex(n => n.id === msg.id);
  if (idx === -1) return sendError(ws, 'News item not found.');
  newsItems.splice(idx, 1);
  saveNews();
  _broadcastNews();
  safeSend(ws, JSON.stringify({ type: 'news_deleted', ok: true, id: msg.id }));
}

function handleCommand(ws, msg) {
  const pd = ws._playerData;
  const room = getRoom(ws._roomName);
  if (!pd || !room) return;

  const text = (msg.text ?? '').trim();
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
        '/help — Show this help',
        '/list — List online players',
        '/pm <player> <message> — Private message',
        '/gamemode <creative|survival> — Change gamemode (admin)',
        '/staff <player> — Promote to staff (admin)',
        '/admin <player> — Promote to admin (owner)',
        '/deop <player> — Demote to player (admin)',
        '/kick <player> — Kick a player (staff)',
        '/ban <player> [reason] — Ban a player (staff)',
        '/unban <player> — Unban a player (admin)',
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
  let playersOnline = 0;
  for (const [, room] of rooms) playersOnline += room.players.size;
  safeSend(ws, JSON.stringify({
    type: 'stats',
    dailyUsers: serverStats.dailyUsers[today] || 0,
    monthlyUsers: Object.keys(serverStats.monthlyUsers).filter(k => k.startsWith(month)).length,
    serversCreated: serverStats.serversCreated,
    roomsOnline: rooms.size,
    playersOnline,
    uptime: Math.floor(process.uptime())
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
  const target = filterProfanity((msg.name ?? '').trim());
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
  const from = filterProfanity((msg.name ?? '').trim());
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
  const from = filterProfanity((msg.name ?? '').trim());
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
  const other = filterProfanity((msg.name ?? '').trim());
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
  }).catch(err => { console.warn('[Data] handlePlayerStatsGet failed:', err); });
}

function handlePlayerStatsSet(ws, msg) {
  const pd = ws._playerData;
  if (!pd) return;
  getPlayerData(pd.name).then(data => {
    Object.assign(data.stats, msg.stats ?? {});
    return setPlayerData(pd.name, data);
  }).catch(err => { console.warn('[Data] handlePlayerStatsSet failed:', err); });
}

// ── Leaderboard ──────────────────────────────────────────────────────
// Rank every registered account by a stats metric. Requires an attached
// identity (game login or portal chat socket). Cheap per-user Redis GETs,
// capped at 100 entries.
const LEADERBOARD_METRICS = {
  playTime: 'Play Time',
  level: 'Level',
  mobKillsAny: 'Mob Kills',
  totalBlocksBroken: 'Blocks Broken',
  distanceTraveled: 'Distance',
};

function handleLeaderboardGet(ws, msg) {
  const pd = ws._playerData;
  if (!pd) return;
  const metric = (msg && LEADERBOARD_METRICS[msg.metric]) ? msg.metric : 'playTime';
  const limit = Math.min(parseInt((msg && msg.limit), 10) || 50, 100);
  Promise.all(Object.keys(accounts).map(async (u) => {
    try {
      const data = await getPlayerData(u);
      const s = data.stats || {};
      return { name: u, value: Number(s[metric]) || 0, level: Number(s.level) || 1 };
    } catch { return null; }
  })).then(rows => {
    const sorted = rows.filter(Boolean).filter(r => r.value > 0).sort((a, b) => b.value - a.value);
    const entries = sorted.slice(0, limit).map((r, i) => ({ rank: i + 1, name: r.name, value: r.value, level: r.level }));
    let self = null;
    const selfIdx = sorted.findIndex(r => r.name === pd.name);
    if (selfIdx !== -1) self = { rank: selfIdx + 1, name: sorted[selfIdx].name, value: sorted[selfIdx].value, level: sorted[selfIdx].level };
    safeSend(ws, JSON.stringify({ type: 'leaderboard', metric, entries, self }));
  }).catch(err => { console.warn('[Data] handleLeaderboardGet failed:', err); });
}

function handlePlayerSettingsGet(ws, msg) {
  const pd = ws._playerData;
  if (!pd) return;
  getPlayerData(pd.name).then(data => {
    safeSend(ws, JSON.stringify({ type: 'player_settings', settings: data.settings || {} }));
  }).catch(err => { console.warn('[Data] handlePlayerSettingsGet failed:', err); });
}

function handlePlayerSettingsSet(ws, msg) {
  const pd = ws._playerData;
  if (!pd) return;
  getPlayerData(pd.name).then(data => {
    Object.assign(data.settings, msg.settings ?? {});
    return setPlayerData(pd.name, data);
  }).catch(err => { console.warn('[Data] handlePlayerSettingsSet failed:', err); });
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
      identities: acc.identities || {},
      hasPassword: !!acc.hash,
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
      identities: acc.identities || {},
      hasPassword: !!acc.hash,
      stats: {},
      settings: {}
    }));
  });
}

// Return the calling account's own linked identities (any authenticated player).
function handleGetOwnAccount(ws) {
  const pd = ws._playerData;
  if (!pd || !pd.name) return sendError(ws, 'Not authenticated');
  const username = pd.name;
  const acc = accounts[username] || {};
  const resolvedRole = resolveRole(null, username) || acc.role || ROLE_PLAYER;
  safeSend(ws, JSON.stringify({
    type: 'own_account_detail',
    username,
    role: resolvedRole,
    tag: acc.tag || '',
    identities: acc.identities || {},
    hasPassword: !!acc.hash,
  }));
}

// Set a custom tag on an account (player cannot change it themselves)
function handleDevSetTag(ws, msg) {
  if (!isDev(ws)) return;
  const target = msg.target;
  const tag = (msg.tag ?? '').trim().slice(0, 20);
  if (!target || !accounts[target]) {
    safeSend(ws, JSON.stringify({ type: 'dev_set_tag_result', ok: false, reason: 'Account not found' }));
    return;
  }
  // Don't let non-devs override a dev account's tag
  const requester = ws._playerData ? ws._playerData.name : '';
  if (DEV_USERNAMES.has(target.toLowerCase()) && !DEV_USERNAMES.has(requester.toLowerCase())) {
    safeSend(ws, JSON.stringify({ type: 'dev_set_tag_result', ok: false, reason: 'Cannot modify dev account tag' }));
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
  // Don't allow changing dev account role
  if (DEV_USERNAMES.has(target.toLowerCase())) {
    safeSend(ws, JSON.stringify({ type: 'dev_set_role_result', ok: false, reason: 'Cannot modify dev account role' }));
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
  if (DEV_USERNAMES.has(target.toLowerCase())) {
    safeSend(ws, JSON.stringify({ type: 'dev_delete_account_result', ok: false, reason: 'Cannot delete dev account' }));
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

// Dev: get full player stats for any account
function handleDevGetStats(ws, msg) {
  if (!isDev(ws)) return;
  const target = msg.target;
  if (!target) return;
  getPlayerData(target).then(data => {
    safeSend(ws, JSON.stringify({ type: 'dev_stats_result', ok: true, target, stats: data.stats || {} }));
  });
}

// Dev: globally ban a player for a duration
function handleDevTimedBan(ws, msg) {
  if (!isDev(ws)) return;
  const target = (msg.target || '').trim();
  if (!target) return safeSend(ws, JSON.stringify({ type: 'dev_ban_result', ok: false, reason: 'Missing target' }));
  if (DEV_USERNAMES.has(target.toLowerCase())) return safeSend(ws, JSON.stringify({ type: 'dev_ban_result', ok: false, reason: 'Cannot ban a dev account' }));
  if (target === (ws._playerData || {}).name) return safeSend(ws, JSON.stringify({ type: 'dev_ban_result', ok: false, reason: 'Cannot ban yourself' }));
  const durationMs = Number(msg.durationMs) || 0; // 0 = permanent
  const reason = (msg.reason || '').trim().slice(0, 200) || 'No reason given';
  const bannedBy = (ws._playerData || {}).name || 'Dev';
  const now = Date.now();
  const ban = {
    reason,
    bannedBy,
    createdAt: now,
    expiresAt: durationMs > 0 ? now + durationMs : null,
  };
  globalBans[target.toLowerCase()] = ban;
  saveGlobalBans();
  // Kick target if online in any room
  for (const cws of wss.clients) {
    const pd = cws._playerData;
    if (pd && pd.name === target && cws._roomName) {
      const room = getRoom(cws._roomName);
      if (room) {
        broadcast(room, { type: 'chat', name: 'Server', role: 'server', text: `${target} has been banned by ${bannedBy}.` });
      }
      safeSend(cws, JSON.stringify({ type: 'kicked', reason: `Banned by ${bannedBy}: ${reason}` }));
      handleLeave(cws);
      cws.close();
    }
  }
  const duration = durationMs > 0 ? ` for ${Math.round(durationMs / 60000)} minutes` : ' permanently';
  safeSend(ws, JSON.stringify({ type: 'dev_ban_result', ok: true, target, duration, reason }));
}

// Dev: unban a player
function handleDevUnban(ws, msg) {
  if (!isDev(ws)) return;
  const target = (msg.target || '').trim().toLowerCase();
  if (!target) return;
  if (globalBans[target]) {
    delete globalBans[target];
    saveGlobalBans();
    safeSend(ws, JSON.stringify({ type: 'dev_unban_result', ok: true, target }));
  } else {
    safeSend(ws, JSON.stringify({ type: 'dev_unban_result', ok: false, reason: 'Player is not globally banned' }));
  }
}

// Dev: list all active global bans
function handleDevGlobalBans(ws, msg) {
  if (!isDev(ws)) return;
  const now = Date.now();
  const list = [];
  for (const [user, ban] of Object.entries(globalBans)) {
    if (ban.expiresAt && ban.expiresAt <= now) { delete globalBans[user]; continue; }
    list.push({ username: user, reason: ban.reason, bannedBy: ban.bannedBy, expiresAt: ban.expiresAt, createdAt: ban.createdAt });
  }
  saveGlobalBans();
  safeSend(ws, JSON.stringify({ type: 'dev_global_bans', bans: list }));
}

// News verify: check if a connection has dev news-posting permissions
// Used by the portal to show/hide the news form
function handleNewsVerify(ws, msg) {
  const { playerName, password, identityType, identityId } = msg;
  if (ws._playerData && ws._playerData.role && _isNewsPoster(ws._playerData.role)) {
    safeSend(ws, JSON.stringify({ type: 'news_verify_result', ok: true, role: ws._playerData.role }));
    return;
  }
  if (!playerName) {
    safeSend(ws, JSON.stringify({ type: 'news_verify_result', ok: false }));
    return;
  }
  const identity = (identityType && identityId) ? { provider: identityType, id: identityId } : null;
  authAccount(playerName, password, 'login', identity).then(auth => {
    if (auth.ok) {
      const role = resolveRole(null, auth.username || playerName) || ROLE_PLAYER;
      if (_isNewsPoster(role)) {
        safeSend(ws, JSON.stringify({ type: 'news_verify_result', ok: true, role }));
      } else {
        safeSend(ws, JSON.stringify({ type: 'news_verify_result', ok: false }));
      }
    } else {
      safeSend(ws, JSON.stringify({ type: 'news_verify_result', ok: false }));
    }
  });
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
  const code = (msg.code ?? '').toUpperCase().slice(0, 8);
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

// ── Start ─────────────────────────────────────────────────────────────
let _hbInterval;
(async () => {
  await loadRooms();
  await loadAccounts();
  await loadFriends();
  await loadNews();
  loadGlobalBans();
  loadPendingDMs();
  loadDmHistory();
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
    // Warn about missing OAuth env vars
    for (const [p, c] of Object.entries(OAUTH_PROVIDERS)) {
      const varName = `${p.toUpperCase()}_CLIENT_ID`;
      if (!c.clientId) console.warn(`  ⚠ OAuth ${p}: ${varName} not set — "${p}" login will show "not configured"`);
    }
  });

  // Server-side WebSocket heartbeat — ping all clients every 30s, terminate dead ones
  // This prevents Render's reverse proxy from closing idle WebSocket connections
  _hbInterval = setInterval(() => {
    wss.clients.forEach((ws) => {
      if (ws.isAlive === false) {
        console.log(`[Heartbeat] Terminating stale client`);
        return ws.terminate();
      }
      ws.isAlive = false;
      ws.ping();
    });
  }, 30000);

  // Self-ping every 5 minutes to prevent Render free-tier from sleeping.
  // When no clients are connected the server has no traffic; this keeps it alive.
  setInterval(() => {
    const url = `http://127.0.0.1:${PORT}/health`;
    import('http').then(({ get }) => get(url, () => {}).on('error', () => {}));
  }, 5 * 60 * 1000);

  process.on('exit', () => { clearInterval(_hbInterval); clearInterval(_armorInterval); });
  process.on('SIGTERM', () => {
    clearInterval(_hbInterval); clearInterval(_armorInterval);
    flushRedisSaves().then(() => process.exit(0));
  });
  process.on('SIGINT', () => {
    clearInterval(_hbInterval); clearInterval(_armorInterval);
    flushRedisSaves().then(() => process.exit(0));
  });
})();

// Armor sync every 2 seconds (separate from position packets)
const _armorInterval = setInterval(() => {
  for (const [, room] of rooms) {
    for (const [ws, pd] of room.players) {
      if (!pd.armor) continue;
      if (!pd._nameBuf) pd._nameBuf = Buffer.from(pd.name, 'utf8');
      const nameBytes = pd._nameBuf;
      const armorStr = pd.armor || '';
      const armorBytes = Buffer.from(armorStr, 'utf8');
      const maxSize = 3 + nameBytes.length + armorBytes.length;
      if (!pd._armorBuf || pd._armorBuf.length < maxSize) pd._armorBuf = Buffer.alloc(maxSize);
      const binBuf = pd._armorBuf;
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
