// Standalone save — localStorage only, zero BlockForge deps.
const KEY = 'mergekeep_p0_v1';
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
    towers, walls,
    army: { grunt: { 1: 6 }, archer: { 1: 6 }, giant: { 1: 3 } },
    selected: null
  };
}

export function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultState();
    const s = { ...defaultState(), ...JSON.parse(raw) };
    return s;
  } catch { return defaultState(); }
}

export function save(s) {
  try { localStorage.setItem(KEY, JSON.stringify(s)); } catch {}
}

export function uid(p) { return p + Math.random().toString(36).slice(2, 8); }
