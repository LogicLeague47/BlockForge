// Multiplayer server management, staff permissions, chat, and commands.
//
// Role hierarchy: owner > admin > staff > player
// - Owner: full control, can promote/demote anyone, change settings
// - Admin: can kick/ban players, manage staff, but can't kick/ban other admins
// - Staff: can kick/ban players, but can't manage staff or other staff
// - Player: no special permissions
//
// Commands (prefix /):
//   /staff <player>          — Promote player to staff
//   /admin <player>          — Promote player to admin
//   /deop <player>           — Demote to player
//   /kick <player>           — Kick a player
//   /ban <player>            — Ban a player
//   /unban <player>          — Unban a player
//   /list                    — List online players
//   /tp <player>             — Teleport to player
//   /gamemode <creative|survival> — Switch gamemode (owner/admin only)

export const ROLE_GAMEDEV = 'gamedev';
export const ROLE_OWNER = 'owner';
export const ROLE_ADMIN = 'admin';
export const ROLE_STAFF = 'staff';
export const ROLE_PLAYER = 'player';
export const ROLE_DEV = 'dev';

const ROLE_LEVEL = { [ROLE_GAMEDEV]: 5, [ROLE_OWNER]: 4, [ROLE_ADMIN]: 3, [ROLE_STAFF]: 2, [ROLE_PLAYER]: 1, [ROLE_DEV]: 6 };

// Hardcoded GameDev account
const GAMEDEV_ACCOUNT = 'LogicLeague';

export function resolveCgUsername(cgUsername) {
  if (cgUsername === GAMEDEV_ACCOUNT) return { role: ROLE_GAMEDEV };
  return null;
}

// Dev tag — editable label for the GameDev role (default: "GameDev")
const DEV_TAG_KEY = 'bf_dev_tag';
const DEFAULT_DEV_TAG = 'GameDev';

export function getDevTag() {
  try { return localStorage.getItem(DEV_TAG_KEY) || DEFAULT_DEV_TAG; } catch { return DEFAULT_DEV_TAG; }
}

export function setDevTag(tag) {
  try { localStorage.setItem(DEV_TAG_KEY, tag || DEFAULT_DEV_TAG); } catch {}
}

export class Server {
  constructor(name, maxPlayers, gameMode, ownerName) {
    this.name = name;
    this.maxPlayers = maxPlayers || 10;
    this.gameMode = gameMode || 'survival';
    this.ownerName = ownerName;
    this.seed = null;
    this.players = [];        // [{name, role, uuid}]
    this.banned = [];         // [{name, reason, bannedBy}]
    this.created = Date.now();
    this.ownerSecret = Server.generateSecret();
    this._addPlayer(ownerName, ROLE_OWNER);
  }

  static generateSecret() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let s = '';
    for (let i = 0; i < 32; i++) s += chars[(Math.random() * chars.length) | 0];
    return s;
  }

  _addPlayer(name, role) {
    const existing = this.players.find(p => p.name === name);
    if (existing) {
      existing.role = role;
      return;
    }
    this.players.push({ name, role, uuid: this._uuid() });
  }

  _uuid() {
    return 'xxxxxxxx-xxxx-4xxx'.replace(/x/g, () => (Math.random() * 16 | 0).toString(16));
  }

  addPlayer(name) {
    if (this.isBanned(name)) return { ok: false, reason: 'You are banned from this server.' };
    if (this.players.length >= this.maxPlayers) return { ok: false, reason: 'Server is full.' };
    const existing = this.players.find(p => p.name === name);
    if (existing) return { ok: true }; // already in
    this._addPlayer(name, ROLE_PLAYER);
    return { ok: true };
  }

  addPlayerWithRole(name, role) {
    if (this.isBanned(name)) return { ok: false, reason: 'You are banned from this server.' };
    if (this.players.length >= this.maxPlayers) return { ok: false, reason: 'Server is full.' };
    const existing = this.players.find(p => p.name === name);
    if (existing) { existing.role = role; return { ok: true }; }
    this._addPlayer(name, role);
    return { ok: true };
  }

  removePlayer(name) {
    this.players = this.players.filter(p => p.name !== name);
  }

  getPlayer(name) {
    return this.players.find(p => p.name === name) || null;
  }

  getRole(name) {
    const p = this.getPlayer(name);
    return p ? p.role : null;
  }

  hasPermission(name, requiredRole) {
    const level = ROLE_LEVEL[this.getRole(name)] || 0;
    return level >= (ROLE_LEVEL[requiredRole] || 99);
  }

  // ── Staff management ──────────────────────────────────────────────────

  promoteStaff(name, targetName, newRole) {
    if (!this.hasPermission(name, ROLE_ADMIN)) {
      return { ok: false, reason: 'You need admin or higher to manage staff.' };
    }
    const target = this.getPlayer(targetName);
    if (!target) return { ok: false, reason: 'Player not found on server.' };
    // Admins can't promote other admins (only owner can)
    if (this.getRole(name) === ROLE_ADMIN && target.role === ROLE_ADMIN) {
      return { ok: false, reason: 'Admins cannot promote other admins.' };
    }
    if (ROLE_LEVEL[newRole] >= ROLE_LEVEL[this.getRole(name)]) {
      return { ok: false, reason: 'Cannot promote to your own level or higher.' };
    }
    target.role = newRole;
    return { ok: true, message: `${targetName} is now ${newRole}.` };
  }

  demote(name, targetName) {
    if (!this.hasPermission(name, ROLE_ADMIN)) {
      return { ok: false, reason: 'You need admin or higher to demote.' };
    }
    const target = this.getPlayer(targetName);
    if (!target) return { ok: false, reason: 'Player not found on server.' };
    if (target.role === ROLE_OWNER) return { ok: false, reason: 'Cannot demote the owner.' };
    if (this.getRole(name) === ROLE_ADMIN && target.role === ROLE_ADMIN) {
      return { ok: false, reason: 'Admins cannot demote other admins.' };
    }
    target.role = ROLE_PLAYER;
    return { ok: true, message: `${targetName} is now a player.` };
  }

  // ── Kick / Ban ────────────────────────────────────────────────────────

  kick(name, targetName) {
    if (!this.hasPermission(name, ROLE_STAFF)) {
      return { ok: false, reason: 'You need staff or higher to kick.' };
    }
    const target = this.getPlayer(targetName);
    if (!target) return { ok: false, reason: 'Player not found on server.' };
    if (target.role === ROLE_OWNER) return { ok: false, reason: 'Cannot kick the owner.' };
    // Staff can't kick admin
    if (this.getRole(name) === ROLE_STAFF && target.role === ROLE_ADMIN) {
      return { ok: false, reason: 'Staff cannot kick admins.' };
    }
    // Admins can't kick other admins
    if (this.getRole(name) === ROLE_ADMIN && target.role === ROLE_ADMIN) {
      return { ok: false, reason: 'Admins cannot kick other admins.' };
    }
    this.removePlayer(targetName);
    return { ok: true, message: `${targetName} has been kicked.` };
  }

  ban(name, targetName, reason) {
    if (!this.hasPermission(name, ROLE_STAFF)) {
      return { ok: false, reason: 'You need staff or higher to ban.' };
    }
    const target = this.getPlayer(targetName);
    if (!target) return { ok: false, reason: 'Player not found on server.' };
    if (target.role === ROLE_OWNER) return { ok: false, reason: 'Cannot ban the owner.' };
    if (this.getRole(name) === ROLE_STAFF && target.role === ROLE_ADMIN) {
      return { ok: false, reason: 'Staff cannot ban admins.' };
    }
    if (this.getRole(name) === ROLE_ADMIN && target.role === ROLE_ADMIN) {
      return { ok: false, reason: 'Admins cannot ban other admins.' };
    }
    this.removePlayer(targetName);
    this.banned.push({ name: targetName, reason: reason || 'No reason given', bannedBy: name });
    return { ok: true, message: `${targetName} has been banned.` };
  }

  unban(name, targetName) {
    if (!this.hasPermission(name, ROLE_ADMIN)) {
      return { ok: false, reason: 'You need admin or higher to unban.' };
    }
    const idx = this.banned.findIndex(b => b.name === targetName);
    if (idx === -1) return { ok: false, reason: 'Player is not banned.' };
    this.banned.splice(idx, 1);
    return { ok: true, message: `${targetName} has been unbanned.` };
  }

  isBanned(name) {
    return this.banned.some(b => b.name === name);
  }

  // ── Persistence (localStorage) ────────────────────────────────────────

  save() {
    try {
      const data = {
        name: this.name,
        maxPlayers: this.maxPlayers,
        gameMode: this.gameMode,
        ownerName: this.ownerName,
        seed: this.seed,
        players: this.players,
        banned: this.banned,
        created: this.created,
        ownerSecret: this.ownerSecret,
        isPrivate: !!this.isPrivate
      };
      localStorage.setItem(`bf_server_${this.name}`, JSON.stringify(data));
    } catch (_) {}
  }

  static load(name) {
    try {
      const raw = localStorage.getItem(`bf_server_${name}`);
      if (!raw) return null;
      const d = JSON.parse(raw);
      const s = new Server(d.name, d.maxPlayers, d.gameMode, d.ownerName);
      s.seed = d.seed || null;
      s.players = d.players || [];
      s.banned = d.banned || [];
      s.created = d.created || Date.now();
      s.ownerSecret = d.ownerSecret || Server.generateSecret();
      s.isPrivate = !!d.isPrivate;
      return s;
    } catch (_) { return null; }
  }

  static listAll() {
    const servers = [];
    const seen = new Set();
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('bf_server_')) {
        const name = key.slice(10);
        const s = Server.load(name);
        if (s) { servers.push(s); seen.add(name); }
      }
    }
    // Always include OfficialSMP if not already present
    if (!seen.has('OfficialSMP')) {
      const s = new Server('OfficialSMP', 50, 'survival', null);
      s.seed = 12345;
      s.ownerSecret = null;
      servers.push(s);
    }
    return servers;
  }
}

// ── Command executor ─────────────────────────────────────────────────────

// executeCommand returns {ok, message} for chat display.
export function executeCommand(input, playerName, server) {
  const parts = input.trim().split(/\s+/);
  const cmd = (parts[0] || '').toLowerCase().replace(/^\//, '');
  const args = parts.slice(1);

  switch (cmd) {
    case 'staff': {
      if (args.length < 1) return { ok: false, msg: 'Usage: /staff <player>' };
      const sr = server.promoteStaff(playerName, args[0], ROLE_STAFF);
      return { ok: sr.ok, msg: sr.ok ? sr.message : sr.reason };
    }
    case 'admin': {
      if (args.length < 1) return { ok: false, msg: 'Usage: /admin <player>' };
      const ar = server.promoteStaff(playerName, args[0], ROLE_ADMIN);
      return { ok: ar.ok, msg: ar.ok ? ar.message : ar.reason };
    }
    case 'deop': {
      if (args.length < 1) return { ok: false, msg: 'Usage: /deop <player>' };
      const dr = server.demote(playerName, args[0]);
      return { ok: dr.ok, msg: dr.ok ? dr.message : dr.reason };
    }
    case 'kick': {
      if (args.length < 1) return { ok: false, msg: 'Usage: /kick <player>' };
      const kr = server.kick(playerName, args[0]);
      return { ok: kr.ok, msg: kr.ok ? kr.message : kr.reason };
    }
    case 'ban': {
      if (args.length < 1) return { ok: false, msg: 'Usage: /ban <player> [reason]' };
      const br = server.ban(playerName, args[0], args.slice(1).join(' '));
      return { ok: br.ok, msg: br.ok ? br.message : br.reason };
    }
    case 'unban': {
      if (args.length < 1) return { ok: false, msg: 'Usage: /unban <player>' };
      const ur = server.unban(playerName, args[0]);
      return { ok: ur.ok, msg: ur.ok ? ur.message : ur.reason };
    }
    case 'list': {
      const list = server.players.map(p => `${p.name} [${p.role}]`).join(', ');
      return { ok: true, msg: `Players: ${list}` };
    }
    case 'gamemode': {
      if (!server.hasPermission(playerName, ROLE_ADMIN)) {
        return { ok: false, msg: 'You need admin or higher.' };
      }
      const mode = (args[0] || '').toLowerCase();
      if (mode !== 'creative' && mode !== 'survival') {
        return { ok: false, msg: 'Usage: /gamemode <creative|survival>' };
      }
      server.gameMode = mode;
      return { ok: true, msg: `Game mode set to ${mode}.` };
    }
    case 'tp': {
      return { ok: false, msg: 'Teleport requires a target player name.' };
    }
    case 'help': {
      const cmds = [
        '/staff <player> — Promote to staff',
        '/admin <player> — Promote to admin',
        '/deop <player> — Demote to player',
        '/kick <player> — Kick a player',
        '/ban <player> [reason] — Ban a player',
        '/unban <player> — Unban a player',
        '/list — List online players',
        '/gamemode <creative|survival> — Change gamemode (admin)',
        '/help — Show this help'
      ];
      return { ok: true, msg: cmds.join('\n') };
    }
    default:
      return { ok: false, msg: `Unknown command: /${cmd}. Type /help for commands.` };
  }
}
