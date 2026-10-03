// Shared balance tables — P1: TH 1-5, builders, chests, hero.
export const TOWERS = {
  arrow:  { name: 'Arrow Tower',  dmg: 14, range: 7.5, rate: 1.6, hp: 320, cost: 100, color: 0xffd54a, projColor: 0xffe082 },
  cannon: { name: 'Cannon',       dmg: 34, range: 6.0, rate: 0.7, hp: 460, cost: 200, color: 0xff8a65, projColor: 0xff5722 },
  frost:  { name: 'Frost Spire',  dmg: 8,  range: 6.5, rate: 1.1, hp: 300, cost: 175, color: 0x80deea, projColor: 0x4dd0e1, slow: 0.45 },
};
export const TROOPS = {
  grunt:  { name: 'Grub Grunt',   hp: 90,  dmg: 12, speed: 3.4, cost: 20, housing: 1 },
  archer: { name: ' Twig Archer', hp: 55,  dmg: 16, speed: 3.0, range: 5.5, cost: 30, housing: 1 },
  giant:  { name: 'Gumbo Giant',  hp: 320, dmg: 26, speed: 2.2, cost: 80, housing: 3 },
};
export const MAX_LVL = 5;
// merge: 3x L -> 1x L+1, power x2.1 per level
export function mergeCost(kind) { return kind === 'tower' ? 50 : 25; }
export function towerStats(type, lvl) {
  const b = TOWERS[type]; const m = Math.pow(2.0, lvl - 1);
  return { dmg: Math.round(b.dmg * m), range: b.range + (lvl - 1) * 0.5, rate: b.rate, hp: Math.round(b.hp * m), slow: b.slow || 0 };
}
export function troopStats(type, lvl) {
  const b = TROOPS[type]; const m = Math.pow(1.9, lvl - 1);
  return { hp: Math.round(b.hp * m), dmg: Math.round(b.dmg * m), speed: b.speed, range: b.range || 1.6 };
}
// defend waves 1..8
export function waveComp(n) {
  // {grunt, runner, brute}
  return {
    count: 6 + n * 3,
    hpMul: 1 + (n - 1) * 0.45,
    dmgMul: 1 + (n - 1) * 0.22,
    speed: 2.4 + n * 0.12
  };
}
export const RAID_BASES = [
  { name: 'Nib Farm', trophies: 12, towers: [{ type: 'arrow', level: 1, x: 6, z: 6 }, { type: 'cannon', level: 1, x: 9, z: 9 }], walls: [{ x: 7, z: 7 }, { x: 8, z: 7 }] },
  { name: 'Frost Hollow', trophies: 22, towers: [{ type: 'arrow', level: 2, x: 5, z: 5 }, { type: 'frost', level: 1, x: 10, z: 10 }, { type: 'cannon', level: 1, x: 7, z: 10 }], walls: [{ x: 7, z: 7 }, { x: 8, z: 8 }, { x: 7, z: 8 }] },
  { name: 'Gumbo Keep', trophies: 35, towers: [{ type: 'cannon', level: 2, x: 6, z: 10 }, { type: 'arrow', level: 2, x: 10, z: 6 }, { type: 'frost', level: 2, x: 8, z: 8 }], walls: [{ x: 7, z: 7 }, { x: 8, z: 7 }, { x: 7, z: 8 }, { x: 8, z: 9 }] },
];

// ---- P1: Town Hall 1-5 (short timers for playtest; scale to hours at launch) ----
export const TH_LEVELS = {
  1: { hp: 1200, towerCap: 4,  wallCap: 20, unlocks: ['arrow'],          costGold: 0,    costElixir: 0,   timeSec: 0 },
  2: { hp: 1600, towerCap: 5,  wallCap: 28, unlocks: ['arrow','cannon'], costGold: 400,  costElixir: 0,   timeSec: 60 },
  3: { hp: 2100, towerCap: 7,  wallCap: 36, unlocks: ['arrow','cannon','frost'], costGold: 900, costElixir: 300, timeSec: 180 },
  4: { hp: 2800, towerCap: 9,  wallCap: 46, unlocks: ['arrow','cannon','frost'], costGold: 2000, costElixir: 900, timeSec: 360 },
  5: { hp: 3600, towerCap: 12, wallCap: 60, unlocks: ['arrow','cannon','frost'], costGold: 4000, costElixir: 2000, timeSec: 600 },
};
export const MAX_TH = 5;
// Mine: passive income per 5s tick
export const MINE_LEVELS = {
  1: { gold: 6,  elixir: 3,  costGold: 0,   costElixir: 0,   timeSec: 0 },
  2: { gold: 10, elixir: 5,  costGold: 300, costElixir: 100, timeSec: 45 },
  3: { gold: 15, elixir: 8,  costGold: 800, costElixir: 350, timeSec: 120 },
  4: { gold: 22, elixir: 12, costGold: 1800, costElixir: 800, timeSec: 300 },
};
export const MAX_MINE = 4;
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
// ---- P1: Hero Starfall ----
export const HERO = { cooldownSec: 40, defendDmg: 220, raidDmg: 320, healPct: 0 };
