// Shared balance tables — P3 full game: 6 towers / 6 troops, TH 1-10, prestige, seasons.
export const TOWERS = {
  arrow:  { name: 'Arrow Tower',  dmg: 14, range: 7.5, rate: 1.6, hp: 320, cost: 100, color: 0xffd54a, projColor: 0xffe082 },
  cannon: { name: 'Cannon',       dmg: 34, range: 6.0, rate: 0.7, hp: 460, cost: 200, color: 0xff8a65, projColor: 0xff5722 },
  frost:  { name: 'Frost Spire',  dmg: 8,  range: 6.5, rate: 1.1, hp: 300, cost: 175, color: 0x80deea, projColor: 0x4dd0e1, slow: 0.45 },
  mortar: { name: 'Mortar',       dmg: 55, range: 9.5, rate: 0.45, hp: 520, cost: 450, color: 0xa1887f, projColor: 0x424242, splash: 3.2 },
  tesla:  { name: 'Tesla Coil',   dmg: 11, range: 6.0, rate: 3.0, hp: 380, cost: 600, color: 0x7e57c2, projColor: 0xb39ddb },
  hive:   { name: 'Bee Hive',     dmg: 6,  range: 8.0, rate: 2.2, hp: 340, cost: 500, color: 0xffca28, projColor: 0xffee58 },
};
export const TROOPS = {
  grunt:  { name: 'Grub Grunt',   hp: 90,  dmg: 12, speed: 3.4, cost: 20, housing: 1 },
  archer: { name: ' Twig Archer', hp: 55,  dmg: 16, speed: 3.0, range: 5.5, cost: 30, housing: 1 },
  giant:  { name: 'Gumbo Giant',  hp: 320, dmg: 26, speed: 2.2, cost: 80, housing: 3 },
  bomber: { name: 'Boom Beetle',  hp: 60,  dmg: 55, speed: 3.8, cost: 50, housing: 2, wallMult: 4 },
  healer: { name: 'Moss Healer',  hp: 70,  dmg: 0,  speed: 2.8, range: 5.0, cost: 70, housing: 2, heal: 14 },
  drake:  { name: 'Cinder Drake', hp: 200, dmg: 34, speed: 4.2, range: 3.5, cost: 140, housing: 4 },
};
export const MAX_LVL = 5;
// merge: 3x L -> 1x L+1, power x2.1 per level
export function mergeCost(kind) { return kind === 'tower' ? 50 : 25; }
export function towerStats(type, lvl) {
  const b = TOWERS[type]; const m = Math.pow(2.0, lvl - 1);
  return { dmg: Math.round(b.dmg * m), range: b.range + (lvl - 1) * 0.5, rate: b.rate, hp: Math.round(b.hp * m), slow: b.slow || 0, splash: b.splash || 0 };
}
export function troopStats(type, lvl) {
  const b = TROOPS[type]; const m = Math.pow(1.9, lvl - 1);
  return { hp: Math.round(b.hp * m), dmg: Math.round(b.dmg * m), speed: b.speed, range: b.range || 1.6, heal: b.heal ? Math.round(b.heal * m) : 0, wallMult: b.wallMult || 1 };
}
// defend waves: endless scaling past 8, boss brute every 5
export function waveComp(n) {
  const boss = n % 5 === 0;
  return {
    count: 6 + n * 3,
    hpMul: (1 + (n - 1) * 0.45) * (boss ? 1.6 : 1),
    dmgMul: 1 + (n - 1) * 0.22,
    speed: Math.min(4.5, 2.4 + n * 0.12),
    boss
  };
}
export const RAID_BASES = [
  { name: 'Nib Farm', trophies: 12, towers: [{ type: 'arrow', level: 1, x: 6, z: 6 }, { type: 'cannon', level: 1, x: 9, z: 9 }], walls: [{ x: 7, z: 7 }, { x: 8, z: 7 }] },
  { name: 'Frost Hollow', trophies: 22, towers: [{ type: 'arrow', level: 2, x: 5, z: 5 }, { type: 'frost', level: 1, x: 10, z: 10 }, { type: 'cannon', level: 1, x: 7, z: 10 }], walls: [{ x: 7, z: 7 }, { x: 8, z: 8 }, { x: 7, z: 8 }] },
  { name: 'Gumbo Keep', trophies: 35, towers: [{ type: 'cannon', level: 2, x: 6, z: 10 }, { type: 'arrow', level: 2, x: 10, z: 6 }, { type: 'frost', level: 2, x: 8, z: 8 }], walls: [{ x: 7, z: 7 }, { x: 8, z: 7 }, { x: 7, z: 8 }, { x: 8, z: 9 }] },
  { name: 'Mortar Pit', trophies: 50, towers: [{ type: 'mortar', level: 1, x: 8, z: 8 }, { type: 'arrow', level: 3, x: 5, z: 5 }, { type: 'cannon', level: 2, x: 10, z: 10 }], walls: [{ x: 7, z: 7 }, { x: 8, z: 7 }, { x: 7, z: 8 }] },
  { name: 'Storm Nest', trophies: 70, towers: [{ type: 'tesla', level: 2, x: 6, z: 6 }, { type: 'mortar', level: 2, x: 9, z: 9 }, { type: 'hive', level: 2, x: 8, z: 5 }, { type: 'frost', level: 3, x: 5, z: 10 }], walls: [{ x: 7, z: 7 }, { x: 8, z: 7 }, { x: 7, z: 8 }, { x: 8, z: 8 }] },
];

// ---- TH 1-10 (timers short for playtest; scale to hours at launch) ----
export const TH_LEVELS = {
  1: { hp: 1200, towerCap: 4,  wallCap: 20, unlocks: ['arrow'],          costGold: 0,    costElixir: 0,   timeSec: 0 },
  2: { hp: 1600, towerCap: 5,  wallCap: 28, unlocks: ['arrow','cannon'], costGold: 400,  costElixir: 0,   timeSec: 60 },
  3: { hp: 2100, towerCap: 7,  wallCap: 36, unlocks: ['arrow','cannon','frost'], costGold: 900, costElixir: 300, timeSec: 180 },
  4: { hp: 2800, towerCap: 9,  wallCap: 46, unlocks: ['arrow','cannon','frost'], costGold: 2000, costElixir: 900, timeSec: 360 },
  5: { hp: 3600, towerCap: 12, wallCap: 60, unlocks: ['arrow','cannon','frost'], costGold: 4000, costElixir: 2000, timeSec: 600 },
  6: { hp: 4600, towerCap: 14, wallCap: 72, unlocks: ['arrow','cannon','frost','mortar'], costGold: 8000, costElixir: 4000, timeSec: 900 },
  7: { hp: 5800, towerCap: 16, wallCap: 84, unlocks: ['arrow','cannon','frost','mortar','tesla'], costGold: 14000, costElixir: 8000, timeSec: 1500 },
  8: { hp: 7200, towerCap: 18, wallCap: 96, unlocks: ['arrow','cannon','frost','mortar','tesla','hive'], costGold: 24000, costElixir: 14000, timeSec: 2400 },
  9: { hp: 9000, towerCap: 20, wallCap: 110, unlocks: ['arrow','cannon','frost','mortar','tesla','hive'], costGold: 40000, costElixir: 25000, timeSec: 3600 },
  10: { hp: 11500, towerCap: 24, wallCap: 130, unlocks: ['arrow','cannon','frost','mortar','tesla','hive'], costGold: 65000, costElixir: 40000, timeSec: 5400 },
};
export const MAX_TH = 10;
// Mine: passive income per 5s tick
export const MINE_LEVELS = {
  1: { gold: 6,  elixir: 3,  costGold: 0,   costElixir: 0,   timeSec: 0 },
  2: { gold: 10, elixir: 5,  costGold: 300, costElixir: 100, timeSec: 45 },
  3: { gold: 15, elixir: 8,  costGold: 800, costElixir: 350, timeSec: 120 },
  4: { gold: 22, elixir: 12, costGold: 1800, costElixir: 800, timeSec: 300 },
  5: { gold: 32, elixir: 17, costGold: 5000, costElixir: 2500, timeSec: 900 },
  6: { gold: 45, elixir: 25, costGold: 12000, costElixir: 7000, timeSec: 1800 },
};
export const MAX_MINE = 6;
// ---- P1: War chests (rarity + pity) ----
export const CHEST_ODDS = [
  { r: 'Common',    w: 55 }, { r: 'Rare', w: 28 }, { r: 'Epic', w: 12 }, { r: 'Legendary', w: 5 },
];
export function rollChestRarity(pity) {
  // pity guarantees: every 10th chest Epic+, every 25th Legendary
  if ((pity + 1) % 25 === 0) return 'Legendary';
  if ((pity + 1) % 10 === 0) return Math.random() < 0.35 ? 'Legendary' : 'Epic';
  const tot = CHEST_ODDS.reduce((a, o) => a + o.w, 0);
  let x = Math.random() * tot;
  for (const o of CHEST_ODDS) { x -= o.w; if (x <= 0) return o.r; }
  return 'Common';
}
export function chestLoot(rarity) {
  const mult = { Common: 1, Rare: 1.8, Epic: 3.2, Legendary: 6 }[rarity] || 1;
  const troops = { Common: 1, Rare: 2, Epic: 3, Legendary: 5 }[rarity] || 1;
  const troopLvl = { Common: 1, Rare: 1, Epic: 2, Legendary: 3 }[rarity] || 1;
  return {
    gold: Math.round((120 + Math.random() * 120) * mult),
    elixir: Math.round((60 + Math.random() * 80) * mult),
    troops, troopLvl,
  };
}
// ---- P1: Hero Starfall (levels 1-5) ----
export const HERO = { cooldownSec: 40, defendDmg: 220, raidDmg: 320, healPct: 0 };
export const HERO_LEVELS = {
  1: { dmgMult: 1.0, costGold: 0,    costElixir: 0 },
  2: { dmgMult: 1.4, costGold: 800,  costElixir: 400 },
  3: { dmgMult: 1.9, costGold: 2500, costElixir: 1500 },
  4: { dmgMult: 2.6, costGold: 7000, costElixir: 4500 },
  5: { dmgMult: 3.5, costGold: 16000, costElixir: 11000 },
};
export const MAX_HERO = 5;
// ---- P3: prestige / seasons ----
export function ascMult(shards) { return 1 + (shards || 0) * 0.06; }
export function prestigeReward(state) {
  const shards = 1 + Math.floor((state.wave || 0) / 6) + Math.floor((state.trophies || 0) / 400) + Math.floor((state.thLevel || 1) / 3);
  return Math.max(1, Math.min(12, shards));
}
export function seasonId(d = new Date()) {
  // 28-day seasons from fixed epoch
  const epoch = Date.UTC(2026, 0, 5);
  const n = Math.floor((d.getTime() - epoch) / (28 * 86400000));
  return `S${Math.max(1, n + 1)}`;
}
export const SEASON_TIERS = 20;
export function seasonXpForTier(t) { return 100 + (t - 1) * 40; } // xp to go from tier t-1 -> t
export function seasonReward(tier) {
  if (tier % 10 === 0) return { gold: 1500 + tier * 100, elixir: 800 + tier * 50, chest: 'Epic' };
  if (tier % 5 === 0) return { gold: 700 + tier * 50, elixir: 350 + tier * 25, chest: 'Rare' };
  return { gold: 200 + tier * 30, elixir: 100 + tier * 15, chest: null };
}

// ---- P2: leagues / daily / collection / second builder ----
export const LEAGUES = [
  { min: 0,   name: 'Wood',    icon: '🪵', bonus: 0 },
  { min: 50,  name: 'Bronze',  icon: '🥉', bonus: 0.05 },
  { min: 120, name: 'Silver',  icon: '🥈', bonus: 0.10 },
  { min: 250, name: 'Gold',    icon: '🥇', bonus: 0.20 },
  { min: 450, name: 'Crystal', icon: '💎', bonus: 0.35 },
  { min: 700, name: 'Legend',  icon: '👑', bonus: 0.50 },
];
export function leagueOf(trophies) {
  let cur = LEAGUES[0];
  for (const l of LEAGUES) if (trophies >= l.min) cur = l;
  const idx = LEAGUES.indexOf(cur);
  const next = LEAGUES[idx + 1] || null;
  return { ...cur, next };
}
export const SECOND_BUILDER_TROPHIES = 150;
// Seeded daily base: same map for everyone each day, scales with progress
function hashStr(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function mulberry(seed) { let a = seed >>> 0; return function () { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
export function todayKey(d = new Date()) { return d.toISOString().slice(0, 10); }
export function dailyBase(dateKey, power = 1) {
  const rnd = mulberry(hashStr('keep' + dateKey));
  const pool = power >= 4 ? ['arrow', 'cannon', 'frost', 'mortar', 'tesla', 'hive'] : power >= 2 ? ['arrow', 'cannon', 'frost', 'mortar'] : ['arrow', 'cannon', 'frost'];
  const types = pool;
  const n = 3 + Math.floor(rnd() * 3) + Math.min(2, Math.floor(power / 2));
  const towers = []; const used = new Set(['7,7']);
  for (let i = 0; i < n; i++) {
    let gx = 4 + Math.floor(rnd() * 8), gz = 4 + Math.floor(rnd() * 8);
    if (used.has(gx + ',' + gz)) continue;
    used.add(gx + ',' + gz);
    towers.push({ type: types[Math.floor(rnd() * types.length)], level: 1 + Math.floor(rnd() * Math.min(3, 1 + power)), x: gx, z: gz });
  }
  const walls = [];
  for (let i = 0; i < 4; i++) walls.push({ x: 6 + Math.floor(rnd() * 4), z: 6 + Math.floor(rnd() * 4) });
  return { name: `Daily ${dateKey}`, trophies: 25, towers, walls, daily: true };
}
// Collection catalog: towers 6x5 + troops 6x5 + waves 12 + raids 5 + chests 4 = 81
export const COLL_TOTAL = 6 * 5 + 6 * 5 + 12 + 5 + 4;
export const COLL_MILESTONES = [
  { pct: 25, gold: 300, elixir: 150 },
  { pct: 50, gold: 700, elixir: 350 },
  { pct: 75, gold: 1500, elixir: 800 },
  { pct: 100, gold: 3000, elixir: 1500 },
];
