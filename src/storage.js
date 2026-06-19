// localStorage persistence for multiple worlds.
//
// World list: stored as JSON array under 'mc-clone-worlds'.
// Each world: { id, name, seed, gamemode, createdAt, thumbnail }
// Each world's data: stored under 'mc-clone-world-{id}'.

function listKey() { return 'mc-clone-worlds'; }

export function getWorldList() {
  try {
    const raw = localStorage.getItem(listKey());
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function saveWorldList(list) {
  localStorage.setItem(listKey(), JSON.stringify(list));
}

export function createWorld(name, seed, gamemode) {
  const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const world = {
    id,
    name: name || 'New World',
    seed: seed || Math.floor(Math.random() * 2147483647),
    gamemode: gamemode || 'creative',
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
}

function worldDataKey(id) { return 'mc-clone-world-' + id; }

export function saveWorld(id, data) {
  try {
    localStorage.setItem(worldDataKey(id), JSON.stringify(data));
    return true;
  } catch (e) {
    console.warn('save failed', e);
    return false;
  }
}

export function loadWorld(id) {
  try {
    const raw = localStorage.getItem(worldDataKey(id));
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export function clearWorld(id) {
  localStorage.removeItem(worldDataKey(id));
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
