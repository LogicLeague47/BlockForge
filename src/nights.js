import { BLOCK } from './blocks.js';

// ─── 99 Nights ─────────────────────────────────────────────────────────
// Endless-wave night survival. Survive 99 nights on a floating arena while
// the sun is locked to darkness and the undead pour in from the edges. Each
// night is harder than the last. Death ends the run; clearing night 99 wins.

export const N_Y = 100;             // arena surface level
export const N_RADIUS = 13;          // arena radius
export const N_NIGHT_DUR = 40;       // seconds of actual combat per night
export const N_INTERMISSION = 6;     // seconds between nights (breather)
export const N_GOAL = 99;

const NIGHT_MOB_TYPES = ['zombie', 'zombie', 'skeleton', 'spider', 'slime', 'blower'];

// Spawn pads on the arena near the rim (must stay on solid ground — the
// world below the disc is empty void).
const EDGE_SPOTS = [
  [0, -10], [0, 10], [-10, 0], [10, 0],
  [-7, -7], [7, -7], [-7, 7], [7, 7],
  [-10, -4], [10, -4], [-10, 4], [10, 4],
];

let active = false;
let nightsCompleted = 0;
let phase = 'intermission';   // 'night' | 'intermission'
let phaseTimer = 0;
let spawningCount = 0;
let spawnTimer = 0;
let gameOver = false;
let won = false;
let _hudEl = null;
let _overlayEl = null;
let _exitCb = null;

export function buildNightsMap(world) {
  for (let dx = -N_RADIUS; dx <= N_RADIUS; dx++) {
    for (let dz = -N_RADIUS; dz <= N_RADIUS; dz++) {
      const r2 = dx * dx + dz * dz;
      if (r2 > N_RADIUS * N_RADIUS) continue;
      world.setBlock(dx, N_Y, dz, BLOCK.STONE);
      if (r2 <= 4) world.setBlock(dx, N_Y + 1, dz, BLOCK.STONE_BRICKS); // center pad
      // scattered double-block cover pillars
      if (r2 > 40 && r2 <= 140 && (Math.abs(dx) % 5 === 0) && (Math.abs(dz) % 5 === 0)) {
        world.setBlock(dx, N_Y + 1, dz, BLOCK.COBBLESTONE);
        world.setBlock(dx, N_Y + 2, dz, BLOCK.COBBLESTONE);
      }
    }
  }
  return { spawn: { x: 0.5, y: N_Y + 2, z: 0.5, yaw: 0 } };
}

export function startNights() {
  active = true;
  nightsCompleted = 0;
  phase = 'intermission';
  phaseTimer = N_INTERMISSION;
  spawningCount = 0;
  spawnTimer = 0;
  gameOver = false;
  won = false;
  _ensureHud();
  updateHud();
}

export function clearNights() {
  active = false;
  gameOver = false;
  if (_hudEl) { _hudEl.remove(); _hudEl = null; }
  if (_overlayEl) { _overlayEl.remove(); _overlayEl = null; }
}

export function setNightsExit(fn) { _exitCb = fn; }

export function tickNights(dt, ctx) {
  if (!active) return;
  const { player, mobManager } = ctx;
  if (gameOver || won) {
    updateHud();
    return;
  }
  // A night you don't survive is a game over. The normal death screen takes
  // over from here — the HUD just records how far you got.
  if (player && player.isDead()) {
    gameOver = true;
    return;
  }
  phaseTimer -= dt;

  if (phase === 'intermission') {
    if (phaseTimer <= 0) startBattleNight();
  } else {
    // Feed mobs onto the arena.
    if (spawningCount < Math.min(3 + nightsCompleted + 1, 40)) {
      spawnTimer -= dt;
      if (spawnTimer <= 0) {
        spawnTimer = Math.max(0.4, 1.3 - nightsCompleted * 0.012);
        const spot = EDGE_SPOTS[Math.floor(Math.random() * EDGE_SPOTS.length)];
        const type = NIGHT_MOB_TYPES[Math.floor(Math.random() * NIGHT_MOB_TYPES.length)];
        if (mobManager && mobManager.spawnAt) {
          const m = mobManager.spawnAt(type, spot[0] + 0.5, N_Y + 1, spot[1] + 0.5);
          if (m) m.aggro = true;
        }
        spawningCount++;
      }
    }
    if (phaseTimer <= 0) endBattleNight(ctx);
  }
  updateHud();
}

function startBattleNight() {
  phase = 'night';
  phaseTimer = N_NIGHT_DUR;
  spawningCount = 0;
  spawnTimer = 1.2;
}

function endBattleNight(ctx) {
  if (ctx.mobManager) ctx.mobManager.clear(); // clear leftovers before the breather
  nightsCompleted++;
  if (nightsCompleted >= N_GOAL) {
    won = true;
    showEnd();
  } else {
    phase = 'intermission';
    phaseTimer = N_INTERMISSION;
    spawningCount = 0;
  }
}

function _ensureHud() {
  if (_hudEl) return;
  _hudEl = document.createElement('div');
  _hudEl.id = '99nights-hud';
  _hudEl.style.cssText = 'position:fixed;top:10px;left:50%;transform:translateX(-50%);z-index:100;pointer-events:none;text-align:center;font-family:monospace;text-shadow:0 1px 3px #000;';
  document.body.appendChild(_hudEl);
}

function updateHud() {
  if (!_hudEl) return;
  const n = Math.min(nightsCompleted + 1, N_GOAL);
  let body = '';
  if (gameOver) {
    body = `<div style="font:bold 15px monospace;color:#f66;">GAME OVER — survived ${nightsCompleted}/99 nights</div>`;
  } else if (won) {
    body = '<div style="font:bold 15px monospace;color:#6f6;">🏆 YOU SURVIVED ALL 99 NIGHTS!</div>';
  } else {
    const sec = String(Math.max(0, Math.ceil(phaseTimer))).padStart(2, '0');
    body = phase === 'night'
      ? `<div style="font:bold 15px monospace;color:#6cf;">🌙 NIGHT ${n}/99 <span style="color:#fff;">(${sec}s)</span></div>`
      : `<div style="font:13px monospace;color:#aef;">☀ Survivors — night ${nightsCompleted}/99 done. Next night in ${String(Math.max(0,Math.ceil(phaseTimer)))}s</div>`;
  }
  _hudEl.innerHTML = '<div style="font:bold 16px monospace;color:#7af;">🌙 99 NIGHTS</div>' + body;
}

function showEnd() {
  if (_overlayEl) _overlayEl.remove();
  _overlayEl = document.createElement('div');
  _overlayEl.id = '99nights-overlay';
  _overlayEl.style.cssText = 'position:fixed;inset:0;z-index:200;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.55);font-family:monospace;';
  const winStyle = won;
  _overlayEl.innerHTML =
    '<div style="background:rgba(20,20,30,0.95);border:1px solid ' + (winStyle ? '#6f6' : '#f66') + ';border-radius:12px;padding:26px 42px;text-align:center;">' +
    `<div style="font:bold 26px monospace;color:${winStyle ? '#6f6' : '#f66'};">${won ? 'YOU WIN!' : 'GAME OVER'}</div>` +
    `<div style="font:16px monospace;color:#fff;margin:14px 0 4px;">${won ? 'All 99 nights survived' : 'Nights survived'}</div>` +
    `<div style="font:bold 36px monospace;color:#ff0;">${nightsCompleted} / ${N_GOAL}</div>` +
    '<button id="btn-nights-quit" style="margin-top:18px;font-family:monospace;font-size:15px;background:#7af;color:#111;border:none;border-radius:8px;padding:10px 26px;cursor:pointer;">BACK TO MINIGAMES</button>' +
    '</div>';
  document.body.appendChild(_overlayEl);
  document.getElementById('btn-nights-quit').addEventListener('click', () => {
    if (typeof _exitCb === 'function') _exitCb();
  });
}