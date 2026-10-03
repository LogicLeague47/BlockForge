// Standalone save — localStorage only, zero BlockForge deps.
const KEY = 'mergekeep_p3_v1';
const OLD_KEYS = ['mergekeep_p2_v1', 'mergekeep_p1_v1', 'mergekeep_p0_v1'];
export const GRID = 16;

export function defaultState() {
  // starter base: TH center, 2 arrows, 1 cannon, ring of walls, starter army
  const towers = [
    { id: 't1', type: 'arrow', level: 1, x: 6, z: 6 },
    { id: 't2', type: 'arrow', level: 1, x: 9, z: 6 },
    { id: 't3', type: 'cannon', level: 1, x: 7, z: 9 },
  ];
  const walls = [];
  for (let x = 5; x <= 10; x++) {
    walls.push({ id: 'w' + x + 'a', type: 'wall', level: 1, x, z: 5 });
    walls.push({ id: 'w' + x + 'b', type: 'wall', level: 1, x, z: 10 });
  }
  for (let z = 6; z <= 9; z++) {
    walls.push({ id: 'wla' + z, type: 'wall', level: 1, x: 5, z });
    walls.push({ id: 'wlb' + z, type: 'wall', level: 1, x: 10, z });
  }
  return {
    gold: 600, elixir: 300, trophies: 0,
    wave: 0, // highest defend wave cleared (0-8)
    raidWins: 0,
    th: { x: 7, z: 7, hp: 1200 },
    thLevel: 1, mineLevel: 1,
    builder: null, // {kind:'th'|'mine', toLevel, finishesAt}
    chests: [], // {id, rarity}
    pity: 0,
    heroLevel: 1,
    lastSeen: Date.now(),
    // P2
    buildQueue: [], // [{kind,toLevel,finishesAt}]
    buildersUnlocked: 1,
    daily: { date: '', done: false, streak: 0, lastDate: '' },
    seenChest: {}, // {Common: n, ...}
    raidStars: {}, // {baseName: bestStars}
    collClaimed: [], // [pct...]
    // P3
    ascension: 0, shards: 0,
    endlessBest: 0,
    season: { id: '', xp: 0, tier: 0, claimed: [] },
    towers, walls,
    army: { grunt: { 1: 6 }, archer: { 1: 6 }, giant: { 1: 3 } },
    selected: null
  };
}

function migrate(old) {
  const d = defaultState();
  const s = { ...d, ...old };
  s.th = { ...d.th, ...(old.th || {}) };
  // P1 single-builder -> P2 queue
  if (Array.isArray(old.buildQueue)) s.buildQueue = old.buildQueue;
  else if (old.builder) s.buildQueue = [old.builder];
  else s.buildQueue = d.buildQueue;
  s.builder = null;
  s.chests = Array.isArray(old.chests) ? old.chests : [];
  s.army = old.army || d.army;
  if (!s.thLevel) s.thLevel = 1;
  if (!s.mineLevel) s.mineLevel = 1;
  if (typeof s.pity !== 'number') s.pity = 0;
  if (typeof s.lastSeen !== 'number') s.lastSeen = Date.now();
  if (!s.buildersUnlocked) s.buildersUnlocked = 1;
  if (!s.daily) s.daily = d.daily;
  if (!s.seenChest) s.seenChest = {};
  if (!s.raidStars) s.raidStars = {};
  if (!s.collClaimed) s.collClaimed = [];
  if (typeof s.ascension !== 'number') s.ascension = 0;
  if (typeof s.shards !== 'number') s.shards = 0;
  if (typeof s.endlessBest !== 'number') s.endlessBest = s.wave || 0;
  if (!s.season) s.season = d.season;
  return s;
}

export function load() {
  try {
    let raw = localStorage.getItem(KEY);
    if (raw) return migrate(JSON.parse(raw));
    for (const k of OLD_KEYS) {
      raw = localStorage.getItem(k);
      if (raw) { const s = migrate(JSON.parse(raw)); save(s); return s; }
    }
    return defaultState();
  } catch { return defaultState(); }
}

export function save(s) {
  try { localStorage.setItem(KEY, JSON.stringify(s)); } catch {}
}

export function uid(p) { return p + Math.random().toString(36).slice(2, 8); }
