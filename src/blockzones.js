import { BLOCK } from './blocks.js';

// ─── BlockZones ────────────────────────────────────────────────────────
// Timed mining frenzy: break as many blocks as possible in a floating arena
// before the clock runs out. Every few seconds a target block is marked as
// the current "zone" — break it for a big bonus and chain up a combo.

export const BZ_Y = 104;           // arena surface level
export const BZ_DURATION = 60;     // seconds
export const BZ_TARGET_EVERY = 7;  // seconds between target rotations

// Arena rings (radius-squared → block pools). Inner rings hold the rare,
// high-value blocks the zone target loves to pick.
const ARENA_TIERS = [
  [26, [BLOCK.DIAMOND_ORE, BLOCK.GOLD_ORE, BLOCK.EMERALD_ORE, BLOCK.GOLD_BLOCK, BLOCK.DIAMOND_BLOCK, BLOCK.END_STONE]],
  [80, [BLOCK.COAL_ORE, BLOCK.IRON_ORE, BLOCK.STONE, BLOCK.COBBLESTONE, BLOCK.STONE_BRICKS]],
  [1e9, [BLOCK.DIRT, BLOCK.SAND, BLOCK.GRAVEL, BLOCK.PLANKS, BLOCK.SANDSTONE, BLOCK.TERRACOTTA, BLOCK.WOOL, BLOCK.NETHER_BRICK, BLOCK.GLASS, BLOCK.SNOW_BLOCK]],
];

export const BZ_BLOCK_NAMES = {
  [BLOCK.DIAMOND_ORE]: 'Diamond Ore',
  [BLOCK.GOLD_ORE]: 'Gold Ore',
  [BLOCK.EMERALD_ORE]: 'Emerald Ore',
  [BLOCK.GOLD_BLOCK]: 'Gold Block',
  [BLOCK.DIAMOND_BLOCK]: 'Diamond Block',
  [BLOCK.END_STONE]: 'End Stone',
  [BLOCK.COAL_ORE]: 'Coal Ore',
  [BLOCK.IRON_ORE]: 'Iron Ore',
  [BLOCK.STONE]: 'Stone',
  [BLOCK.COBBLESTONE]: 'Cobblestone',
  [BLOCK.STONE_BRICKS]: 'Stone Bricks',
  [BLOCK.DIRT]: 'Dirt',
  [BLOCK.SAND]: 'Sand',
  [BLOCK.GRAVEL]: 'Gravel',
  [BLOCK.PLANKS]: 'Planks',
  [BLOCK.SANDSTONE]: 'Sandstone',
  [BLOCK.TERRACOTTA]: 'Terracotta',
  [BLOCK.WOOL]: 'Wool',
  [BLOCK.NETHER_BRICK]: 'Nether Brick',
  [BLOCK.GLASS]: 'Glass',
  [BLOCK.SNOW_BLOCK]: 'Snow Block',
};

let active = false;
let timeLeft = BZ_DURATION;
let score = 0;
let combo = 0;
let comboTime = 0;
let target = null;
let targetTimer = 0;
let _hudEl = null;
let _overlayEl = null;
let _exitCb = null;

function setBlock(world, x, y, z, b) { world.setBlock(x, y, z, b); }

function pick(arr, key) {
  const i = ((key % arr.length) + arr.length) % arr.length;
  return arr[i];
}

export function buildBlockZonesMap(world) {
  for (let dx = -12; dx <= 12; dx++) {
    for (let dz = -12; dz <= 12; dz++) {
      const r2 = dx * dx + dz * dz;
      if (r2 > 164) continue;
      const tier = ARENA_TIERS.find(t => r2 <= t[0]);
      const topPool = tier[1];
      setBlock(world, dx, BZ_Y, dz, pick(topPool, dx * dx * 7 + dz * 13 + dx * dz * 3 + 11));
      const subPool = r2 <= 80 ? [BLOCK.STONE, BLOCK.COBBLESTONE, BLOCK.DIRT] : [BLOCK.DIRT, BLOCK.SAND, BLOCK.PLANKS];
      setBlock(world, dx, BZ_Y + 1, dz, pick(subPool, dx * dz + dz * 5 + 3));
    }
  }
  return { spawn: { x: 0.5, y: BZ_Y + 2, z: 0.5, yaw: 0 } };
}

export function startBlockZones() {
  active = true;
  timeLeft = BZ_DURATION;
  score = 0;
  combo = 0;
  comboTime = 0;
  target = null;
  targetTimer = 0;
  _ensureHud();
  rollTarget();
  updateHud();
}

export function clearBlockZones() {
  active = false;
  if (_hudEl) { _hudEl.remove(); _hudEl = null; }
  if (_overlayEl) { _overlayEl.remove(); _overlayEl = null; }
}

export function setBlockZonesExit(fn) { _exitCb = fn; }

function rollTarget() {
  const pool = Object.keys(BZ_BLOCK_NAMES).map(Number).filter(id => id !== BLOCK.AIR);
  target = pool[Math.floor(Math.random() * pool.length)];
  targetTimer = BZ_TARGET_EVERY;
}

export function onBlockZonesBroken(b) {
  if (!active) return;
  comboTime = 3; // keep the chain alive on any break
  if (b === target) {
    combo = Math.min(combo + 1, 5);
    score += 5 * combo;
  } else {
    score += 1;
    combo = 0;
  }
}

export function tickBlockZones(dt) {
  if (!active) return;
  timeLeft -= dt;
  targetTimer -= dt;
  if (comboTime > 0) { comboTime -= dt; if (comboTime <= 0) combo = 0; }
  if (targetTimer <= 0) rollTarget();
  updateHud();
  if (timeLeft <= 0) {
    timeLeft = 0;
    active = false;
    showEnd();
  }
}

function _ensureHud() {
  if (_hudEl) return;
  _hudEl = document.createElement('div');
  _hudEl.id = 'blockzones-hud';
  _hudEl.style.cssText = 'position:fixed;top:10px;left:50%;transform:translateX(-50%);z-index:100;pointer-events:none;text-align:center;font-family:monospace;text-shadow:0 1px 3px #000;';
  document.body.appendChild(_hudEl);
}

function updateHud() {
  if (!_hudEl) return;
  const m = Math.floor(timeLeft / 60);
  const s = Math.max(0, Math.floor(timeLeft % 60));
  const targetName = target != null ? (BZ_BLOCK_NAMES[target] || '?') : '—';
  const tt = String(Math.max(0, Math.floor(targetTimer))).padStart(2, '0');
  _hudEl.innerHTML =
    '<div style="font:bold 16px monospace;color:#fb0;">🧱 BLOCKZONES</div>' +
    `<div style="font:13px monospace;color:#fff;">⏱ ${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')} &nbsp;·&nbsp; SCORE <b style="color:#6f6;">${score}</b></div>` +
    (combo > 1 ? `<div style="font:12px monospace;color:#f96;">COMBO ×${combo}</div>` : '') +
    `<div style="font:12px monospace;color:#ffd;">TARGET: <b style="color:#ff0;">${targetName}</b> <span style="color:#aaa;">(${tt}s)</span> — break it for ×5!</div>`;
}

function showEnd() {
  if (_overlayEl) _overlayEl.remove();
  _overlayEl = document.createElement('div');
  _overlayEl.id = 'blockzones-overlay';
  _overlayEl.style.cssText = 'position:fixed;inset:0;z-index:200;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.55);font-family:monospace;';
  _overlayEl.innerHTML =
    '<div style="background:rgba(20,20,30,0.95);border:1px solid #fb0;border-radius:12px;padding:26px 40px;text-align:center;">' +
    '<div style="font:bold 26px monospace;color:#fb0;">TIME&rsquo;S UP!</div>' +
    `<div style="font:16px monospace;color:#fff;margin:14px 0 4px;">Final Score</div>` +
    `<div style="font:bold 40px monospace;color:#6f6;">${score}</div>` +
    `<div style="font:12px monospace;color:#aaa;margin-top:6px;">Best combo ×${combo}</div>` +
    '<button id="btn-bz-quit" style="margin-top:18px;font-family:monospace;font-size:15px;background:#fb0;color:#111;border:none;border-radius:8px;padding:10px 26px;cursor:pointer;">BACK TO MINIGAMES</button>' +
    '</div>';
  document.body.appendChild(_overlayEl);
  document.getElementById('btn-bz-quit').addEventListener('click', () => {
    if (typeof _exitCb === 'function') _exitCb();
  });
}