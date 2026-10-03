// Shared balance tables — P0 only.
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
