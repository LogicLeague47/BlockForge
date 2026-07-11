// Persistence layer for multiple worlds.
// Uses CrazyGames SDK Data Module when available (cloud sync),
// falls back to localStorage for local development.

// --- CrazyGames SDK abstraction ---
// The SDK data module is async; we write to both localStorage (instant) and
// the SDK (background cloud sync) so gameplay is never blocked.

function sdkAvailable() {
  return !!(window.CrazyGames && window.CrazyGames.SDK && window.CrazyGames.SDK.data);
}

async function sdkSet(key, value) {
  if (!sdkAvailable()) return;
  try { await window.CrazyGames.SDK.data.setItem(key, value); } catch (_) {}
}

async function sdkGet(key) {
  if (!sdkAvailable()) return undefined;
  try { return await window.CrazyGames.SDK.data.getItem(key); } catch (_) { return undefined; }
}

async function sdkRemove(key) {
  if (!sdkAvailable()) return;
  try { await window.CrazyGames.SDK.data.removeItem(key); } catch (_) {}
}

// --- World list ---

function listKey() { return 'mc-clone-worlds'; }

export function getWorldList() {
  try {
    const raw = localStorage.getItem(listKey());
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function saveWorldList(list) {
  const json = JSON.stringify(list);
  localStorage.setItem(listKey(), json);
  sdkSet(listKey(), json);
}

export function createWorld(name, seed, gamemode, difficulty) {
  const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  let finalSeed = seed;
  if (finalSeed == null || finalSeed === undefined) {
    const buf = new Uint32Array(1);
    crypto.getRandomValues(buf);
    finalSeed = buf[0];
  }
  const world = {
    id,
    name: name || 'New World',
    seed: finalSeed,
    gamemode: gamemode || 'creative',
    difficulty: difficulty || 'normal',
    createdAt: Date.now(),
  };
  const list = getWorldList();
  list.unshift(world);
  saveWorldList(list);
  return world;
}

export function deleteWorld(id) {
  const list = getWorldList().filter(w => w.id !== id);
  saveWorldList(list);
  localStorage.removeItem('mc-clone-world-' + id);
  sdkRemove('mc-clone-world-' + id);
}

function worldDataKey(id) { return 'mc-clone-world-' + id; }

export function saveWorld(id, data) {
  try {
    const json = JSON.stringify(data);
    // Write backup first, then current (atomic-ish)
    try { localStorage.setItem(worldDataKey(id) + '_bak', localStorage.getItem(worldDataKey(id))); } catch (_) {}
    localStorage.setItem(worldDataKey(id), json);
    sdkSet(worldDataKey(id), json);
    return true;
  } catch (e) {
    console.warn('save failed', e);
    return false;
  }
}

export function loadWorld(id) {
  try {
    const raw = localStorage.getItem(worldDataKey(id));
    if (raw) {
      try { return JSON.parse(raw); } catch (e) {
        console.warn('Save corrupted, trying backup...');
        const bak = localStorage.getItem(worldDataKey(id) + '_bak');
        if (bak) {
          try { return JSON.parse(bak); } catch (_) {}
        }
      }
    }
    return null;
  } catch { return null; }
}

export function clearWorld(id) {
  localStorage.removeItem(worldDataKey(id));
  sdkRemove(worldDataKey(id));
}

export function hasSave(id) {
  return !!localStorage.getItem(worldDataKey(id));
}

// Legacy migration: move old single-world save to multi-world format
export function migrateLegacy() {
  try {
    const old = localStorage.getItem('mc-clone-save-v2');
    if (!old) return null;
    const data = JSON.parse(old);
    const world = createWorld('My World', data.seed, data.player?.gamemode || 'creative');
    saveWorld(world.id, data);
    localStorage.removeItem('mc-clone-save-v2');
    return world;
  } catch { return null; }
}

// --- Tutorial / first-time intro persistence (per-user) ---

function _userPrefix() {
  try {
    const name = localStorage.getItem('bf_player_name') || 'default';
    return `bf_u_${name}_`;
  } catch { return 'bf_u_default_'; }
}

export function hasTutorialBeenSeen() {
  try {
    const raw = localStorage.getItem(_userPrefix() + 'tutorial');
    if (raw === '1') return true;
  } catch (_) {}
  return false;
}

export function markTutorialSeen() {
  const key = _userPrefix() + 'tutorial';
  localStorage.setItem(key, '1');
  sdkSet(key, '1');
}

export async function syncTutorialFromSdk() {
  const key = _userPrefix() + 'tutorial';
  try {
    const val = await sdkGet(key);
    if (val === '1') localStorage.setItem(key, '1');
  } catch (_) {}
}

// --- Per-user data ---

export function setUserSetting(key, value) {
  const full = _userPrefix() + key;
  localStorage.setItem(full, JSON.stringify(value));
  sdkSet(full, JSON.stringify(value));
}

export function getUserSetting(key, defaultValue) {
  try {
    const raw = localStorage.getItem(_userPrefix() + key);
    if (raw !== null) return JSON.parse(raw);
  } catch (_) {}
  return defaultValue;
}

// Wipe all data for the current user
export function wipeCurrentUser() {
  const prefix = _userPrefix();
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith(prefix)) keys.push(k);
  }
  for (const k of keys) localStorage.removeItem(k);
  // Also wipe skin data
  localStorage.removeItem('blockforge_skin');
  localStorage.removeItem('blockforge_custom_skin_data');
}

// Get all per-user data keys for the current user
export function listUserKeys() {
  const prefix = _userPrefix();
  const result = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith(prefix)) result.push(k.slice(prefix.length));
  }
  return result;
}
