// BlockForge WebSocket Multiplayer Server
// Run: node server.js

import { WebSocketServer } from 'ws';
import http from 'http';
import { readFileSync, writeFileSync, existsSync, readFile } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, extname } from 'path';
import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';

// Profanity filter (server-side) — matches expanded client list
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

const PORT = process.env.PORT || 4000;
const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_FILE = join(__dirname, 'server-data.json');
const ACCOUNTS_FILE = join(__dirname, 'accounts.json');

// ── Persistence ───────────────────────────────────────────────────────
let rooms = new Map();
let serverStats = { dailyUsers: {}, monthlyUsers: {}, serversCreated: 0 };

function saveRooms() {
  const obj = {};
  for (const [name, room] of rooms) {
    obj[name] = {
      seed: room.seed,
      gameMode: room.gameMode,
      maxPlayers: room.maxPlayers,
      ownerName: room.ownerName,
      ownerSecret: room.ownerSecret || null,
      protected: !!room.protected,
      banned: [...room.banned],
      created: room.created
    };
  }
  try { writeFileSync(DATA_FILE, JSON.stringify({ rooms: obj, stats: serverStats }, null, 2)); } catch {}
}

function loadRooms() {
  if (!existsSync(DATA_FILE)) return;
  try {
    const data = JSON.parse(readFileSync(DATA_FILE, 'utf8'));
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
          players: new Map(),
          banned: new Set(r.banned || []),
          created: r.created || Date.now()
        });
      }
      console.log(`[Data] Loaded ${rooms.size} rooms from disk`);
    }
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
const ROLE_GAMEDEV = 'gamedev', ROLE_OWNER = 'owner', ROLE_ADMIN = 'admin', ROLE_STAFF = 'staff', ROLE_PLAYER = 'player';
const ROLE_LEVEL = { [ROLE_GAMEDEV]: 5, [ROLE_OWNER]: 4, [ROLE_ADMIN]: 3, [ROLE_STAFF]: 2, [ROLE_PLAYER]: 1 };
const GAMEDEV_ACCOUNT = 'PVP_PROTECTOR_BEDWAR';

function generateSecret() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let s = '';
  for (let i = 0; i < 32; i++) s += chars[(Math.random() * chars.length) | 0];
  return s;
}

function resolveRole(cgUsername, playerName) {
  if (cgUsername === GAMEDEV_ACCOUNT) return ROLE_GAMEDEV;
  return null;
}

// ── Account system (username + password) ─────────────────────────────
// Prevents name spoofing: to use a username you must know its password.
let accounts = {}; // { username: { hash, salt } }

function loadAccounts() {
  if (!existsSync(ACCOUNTS_FILE)) return;
  try {
    accounts = JSON.parse(readFileSync(ACCOUNTS_FILE, 'utf8')) || {};
  } catch { accounts = {}; }
}

function saveAccounts() {
  try { writeFileSync(ACCOUNTS_FILE, JSON.stringify(accounts, null, 2)); } catch {}
}

function hashPassword(password, salt) {
  return scryptSync(password, salt, 64).toString('hex');
}

// Returns { ok, reason } — verifies or creates the account
function authAccount(username, password, mode) {
  if (!username || !password) return { ok: false, reason: 'Username and password required.' };
  if (password.length < 3) return { ok: false, reason: 'Password must be at least 3 characters.' };
  const existing = accounts[username];
  if (mode === 'register') {
    if (existing) return { ok: false, reason: 'Username already taken. Please log in.' };
    // Create new account
    const salt = randomBytes(16).toString('hex');
    const hash = hashPassword(password, salt);
    accounts[username] = { hash, salt };
    saveAccounts();
    return { ok: true, created: true };
  }
  // mode === 'login' (or unspecified for backward compat)
  if (!existing) {
    if (mode === 'login') return { ok: false, reason: 'Account not found. Please create one.' };
    // Backward compat: auto-create if no mode specified
    const salt = randomBytes(16).toString('hex');
    const hash = hashPassword(password, salt);
    accounts[username] = { hash, salt };
    saveAccounts();
    return { ok: true, created: true };
  }
  const hash = hashPassword(password, existing.salt);
  const a = Buffer.from(hash, 'hex');
  const b = Buffer.from(existing.hash, 'hex');
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return { ok: false, reason: 'Incorrect password.' };
  }
  return { ok: true };
}

function hasPermission(role, required) {
  return (ROLE_LEVEL[role] || 0) >= (ROLE_LEVEL[required] || 99);
}

// ── Room helpers ──────────────────────────────────────────────────────
function getRoom(name) { return rooms.get(name) || null; }

function listRooms() {
  const list = [];
  for (const [name, room] of rooms) {
    list.push({
      name, seed: room.seed, gameMode: room.gameMode,
      maxPlayers: room.maxPlayers, owner: room.ownerName,
      playerCount: room.players.size, created: room.created
    });
  }
  return list;
}

function broadcast(room, msg, exclude) {
  const data = JSON.stringify(msg);
  for (const [ws] of room.players) {
    if (ws !== exclude && ws.readyState === 1) ws.send(data);
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
};
const PUBLIC_DIR = join(__dirname, 'dist');

function serveFile(filePath, res) {
  readFile(filePath, (err, data) => {
    if (err) {
      // SPA fallback → serve index.html
      readFile(join(PUBLIC_DIR, 'index.html'), (e2, html) => {
        if (e2) { res.writeHead(404); res.end('Not found'); return; }
        res.writeHead(200, { 'Content-Type': MIME['.html'] });
        res.end(html);
      });
      return;
    }
    const ext = extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ rooms: rooms.size, status: 'ok', uptime: process.uptime() }));
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
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  ws._playerData = null;
  ws._roomName = null;
  console.log(`[Conn] New client connected (total: ${wss.clients.size})`);

  ws.on('message', (raw) => {
    let msg;
    try { msg = JSON.parse(raw); } catch { return; }

    switch (msg.type) {
      case 'auth': handleAuth(ws, msg); break;
      case 'create_room': handleCreateRoom(ws, msg); break;
      case 'register_room': handleRegisterRoom(ws, msg); break;
      case 'join': handleJoin(ws, msg); break;
      case 'leave': handleLeave(ws); break;
      case 'list_rooms': handleListRooms(ws); break;
      case 'position': handlePosition(ws, msg); break;
      case 'player_damage': handlePlayerDamage(ws, msg); break;
      case 'chat': handleChat(ws, msg); break;
      case 'command': handleCommand(ws, msg); break;
      case 'delete_room': handleDeleteRoom(ws, msg); break;
      case 'get_stats': handleGetStats(ws); break;
      case 'block_update': handleBlockUpdate(ws, msg); break;
    }
  });

  ws.on('close', () => {
    console.log(`[Conn] Client disconnected`);
    handleLeave(ws);
  });
});

// ── Handlers ──────────────────────────────────────────────────────────

// Authenticate a username+password without joining a room (used by login screen)
function handleAuth(ws, msg) {
  const { playerName: rawName, password, mode } = msg;
  const playerName = filterProfanity(rawName);
  // In LAN mode, skip auth and always succeed
  if (IS_LAN) {
    ws.send(JSON.stringify({ type: 'auth_result', ok: true, created: false, reason: '', username: playerName }));
    return;
  }
  const auth = authAccount(playerName, password, mode);
  ws.send(JSON.stringify({
    type: 'auth_result',
    ok: auth.ok,
    created: !!auth.created,
    reason: auth.reason || '',
    username: playerName
  }));
}

function handleCreateRoom(ws, msg) {
  const { name, seed, gameMode, maxPlayers, playerName: rawName, cgUsername, skinIndex, ownerSecret, noOwner, password } = msg;
  const playerName = filterProfanity(rawName);
  if (!name || !playerName) return sendError(ws, 'Missing room name or player name.');

  // Authenticate account (skip for CrazyGames GameDev or LAN mode)
  if (!IS_LAN && cgUsername !== GAMEDEV_ACCOUNT) {
    const auth = authAccount(playerName, password);
    if (!auth.ok) return sendError(ws, auth.reason);
  }

  // Only OfficialSMP is allowed on the public server (skip for LAN mode)
  if (!IS_LAN && name !== 'OfficialSMP') return sendError(ws, 'Only OfficialSMP is available on this server.');

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
    players: new Map(),
    banned: new Set(),
    edits: new Map(),
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

function handleJoin(ws, msg) {
  const { room: roomName, playerName: rawName, cgUsername, skinIndex, ownerSecret, password } = msg;
  const playerName = filterProfanity(rawName);
  if (!roomName || !playerName) return sendError(ws, 'Missing room name or player name.');

  // Authenticate account (skip for CrazyGames GameDev or LAN mode)
  if (!IS_LAN && cgUsername !== GAMEDEV_ACCOUNT) {
    const auth = authAccount(playerName, password);
    if (!auth.ok) return sendError(ws, auth.reason);
  }

  const room = getRoom(roomName);
  if (!room) return sendError(ws, `Room "${roomName}" not found.`);

  if (room.banned.has(playerName)) return sendError(ws, 'You are banned from this server.');
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

  ws.send(JSON.stringify({
    type: 'joined',
    room: roomName,
    seed: room.seed,
    gameMode: room.gameMode,
    maxPlayers: room.maxPlayers,
    ownerName: room.ownerName,
    players,
    role
  }));

  // Send any existing block edits so the new player's world matches the server
  if (room.edits && room.edits.size > 0) {
    const edits = [];
    for (const [key, block] of room.edits) {
      const [x, y, z] = key.split(',').map(Number);
      edits.push({ x, y, z, block });
    }
    ws.send(JSON.stringify({ type: 'block_batch', edits }));
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
  ws.send(JSON.stringify({ type: 'room_list', rooms: listRooms() }));
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

  broadcast(room, { type: 'player_position', name: pd.name, x: pd.x, y: pd.y, z: pd.z, yaw: pd.yaw, crouching: pd.crouching, armor: pd.armor }, ws);
}

function handlePlayerDamage(ws, msg) {
  const pd = ws._playerData;
  const room = getRoom(ws._roomName);
  if (!pd || !room) return;

  const targetName = msg.target;
  const damage = msg.damage || 1;
  if (!targetName) return;

  for (const [targetWs, tp] of room.players) {
    if (tp.name === targetName) {
      targetWs.send(JSON.stringify({ type: 'player_damage', from: pd.name, damage }));
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

  const reply = (text) => ws.send(JSON.stringify({ type: 'chat', name: 'Server', role: 'server', text }));

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
      targetWs.send(JSON.stringify({ type: 'kicked', reason: `Kicked by ${pd.name}` }));
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
        targetWs.send(JSON.stringify({ type: 'kicked', reason: `Banned by ${pd.name}: ${args.slice(1).join(' ') || 'No reason'}` }));
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
      for (const [, p] of room.players) { if (p.name === targetName) { p.role = ROLE_STAFF; break; } }
      broadcastPlayerList(room);
      broadcast(room, { type: 'chat', name: 'Server', role: 'server', text: `${targetName} is now staff.` });
      break;
    }
    case '/admin': {
      if (!hasPermission(pd.role, ROLE_ADMIN)) return reply('You need admin or higher.');
      const targetName = args[0];
      if (!targetName) return reply('Usage: /admin <player>');
      for (const [, p] of room.players) { if (p.name === targetName) { p.role = ROLE_ADMIN; break; } }
      broadcastPlayerList(room);
      broadcast(room, { type: 'chat', name: 'Server', role: 'server', text: `${targetName} is now admin.` });
      break;
    }
    case '/deop': {
      if (!hasPermission(pd.role, ROLE_ADMIN)) return reply('You need admin or higher.');
      const targetName = args[0];
      if (!targetName) return reply('Usage: /deop <player>');
      for (const [, p] of room.players) { if (p.name === targetName && p.role !== ROLE_OWNER) { p.role = ROLE_PLAYER; break; } }
      broadcastPlayerList(room);
      broadcast(room, { type: 'chat', name: 'Server', role: 'server', text: `${targetName} is now a player.` });
      break;
    }
    case '/help': {
      reply([
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
    return ws.send(JSON.stringify({ type: 'chat', name: 'Server', role: 'server', text: 'This server is official and cannot be deleted.' }));
  }

  if (room.ownerName !== pd.name) {
    return ws.send(JSON.stringify({ type: 'chat', name: 'Server', role: 'server', text: 'Only the server owner can delete this server.' }));
  }

  for (const [cws] of room.players) {
    cws.send(JSON.stringify({ type: 'kicked', reason: 'Server deleted by owner.' }));
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
  ws.send(JSON.stringify({
    type: 'stats',
    dailyUsers: serverStats.dailyUsers[today] || 0,
    monthlyUsers: Object.keys(serverStats.monthlyUsers).filter(k => k.startsWith(month)).length,
    serversCreated: serverStats.serversCreated
  }));
}

function sendError(ws, text) {
  ws.send(JSON.stringify({ type: 'error', text }));
}

// ── Start ─────────────────────────────────────────────────────────────
const IS_LAN = process.argv.includes('--lan');
loadRooms();
loadAccounts();
ensureOfficialServer();
server.listen(PORT, () => {
  console.log(`\n  BlockForge Server`);
  console.log(`  ─────────────────`);
  console.log(`  Mode:    ${IS_LAN ? 'LAN (open rooms, no auth)' : 'Public (OfficialSMP only)'}`);
  console.log(`  HTTP:    http://localhost:${PORT}`);
  console.log(`  WS:      ws://localhost:${PORT}`);
  console.log(`  Health:  http://localhost:${PORT}/health`);
  console.log(`  Rooms:   ${rooms.size}\n`);
});

// Save every 30 seconds
setInterval(saveRooms, 30000);
