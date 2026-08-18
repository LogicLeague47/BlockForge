import { BLOCK } from './blocks.js';
import { raycastVoxel } from './raycast.js';
import * as THREE from 'three';

// ─── GunAffair ─────────────────────────────────────────────────────────
// Hitscan arena shooter: hold left-click to fire an infinite-energy rifle at
// mobs pouring in from the arena edges. Chain kills to build a combo for a
// bigger score before the 60-second clock runs out.

export const GA_Y = 100;           // arena surface level
export const GA_DURATION = 60;     // seconds
export const GA_RANGE = 50;        // hitscan reach (max across guns)
export const GA_FIRE_INTERVAL = 0.16;  // legacy default (first gun)

// Arsenal — switch with 1–4 or the mouse wheel. Each gun is a hitscan profile
// (damage, fire rate, pellets, spread and range).
export const GA_GUNS = [
  { id: 'rifle',   name: 'Rifle',   dmg: 10, interval: 0.16, pellets: 1, spread: 0.00, range: 50, color: '#f66', desc: 'Balanced all-rounder' },
  { id: 'smg',     name: 'SMG',     dmg: 5,  interval: 0.07, pellets: 1, spread: 0.03, range: 40, color: '#ff0', desc: 'Spray & pray' },
  { id: 'shotgun', name: 'Shotgun', dmg: 8,  interval: 0.55, pellets: 5, spread: 0.16, range: 30, color: '#fa0', desc: 'Close-range spread' },
  { id: 'sniper',  name: 'Sniper',  dmg: 40, interval: 1.00, pellets: 1, spread: 0.00, range: 80, color: '#6cf', desc: 'Slow, huge damage' },
];

const HOSTILE_POOL = ['zombie', 'zombie', 'skeleton', 'spider', 'slime', 'blower', 'portalman'];

const EDGE_SPOTS = [
  [0, -16], [0, 16], [-16, 0], [16, 0],
  [-11, -16], [11, -16], [-11, 16], [11, 16],
  [-16, -11], [16, -11], [-16, 11], [16, 11],
];

let active = false;
let timeLeft = GA_DURATION;
let kills = 0;
let score = 0;
let combo = 0;
let comboTime = 0;
let fireCooldown = 0;
let spawnTimer = 0;
let gameOver = false;
let currentGun = 0;
let _hudEl = null;
let _cycleBtn = null;
let _overlayEl = null;
let _exitCb = null;
let _tracer = null;
let _tracerLife = 0;

export function buildGunAffairMap(world) {
  for (let dx = -17; dx <= 17; dx++) {
    for (let dz = -17; dz <= 17; dz++) {
      if (dx * dx + dz * dz > 380) continue;
      world.setBlock(dx, GA_Y, dz, BLOCK.SANDSTONE);
    }
  }
  // Scattered ring of two-block cover pillars with a wool marker on top.
  for (let i = 0; i < 24; i++) {
    const a = i * 2.399963;
    const r = 6 + (i % 7) * 2;
    const px = Math.round(Math.cos(a) * r);
    const pz = Math.round(Math.sin(a) * r);
    if (Math.abs(px) < 3 && Math.abs(pz) < 3) continue;
    world.setBlock(px, GA_Y + 1, pz, BLOCK.COBBLESTONE);
    world.setBlock(px, GA_Y + 2, pz, BLOCK.COBBLESTONE);
    world.setBlock(px, GA_Y + 3, pz, BLOCK.WOOL);
  }
  // Center spawn pad.
  for (let dx = -2; dx <= 2; dx++) {
    for (let dz = -2; dz <= 2; dz++) {
      world.setBlock(dx, GA_Y + 1, dz, BLOCK.STONE_BRICKS);
    }
  }
  return { spawn: { x: 0.5, y: GA_Y + 2, z: 0.5, yaw: 0 } };
}

export function startGunAffair(scene) {
  active = true;
  timeLeft = GA_DURATION;
  kills = 0;
  score = 0;
  combo = 0;
  comboTime = 0;
  fireCooldown = 0;
  spawnTimer = 1.0;
  gameOver = false;
  currentGun = 0;
  _ensureTracer(scene);
  _ensureHud();
  _setCycleBtnVisible(true);
  updateHud();
}

// Switch to the next/previous gun (wheel), clamped. Returns the new gun id.
export function cycleGun(dir) {
  if (!active || gameOver) return null;
  const n = GA_GUNS.length;
  currentGun = ((currentGun + (dir > 0 ? 1 : -1)) % n + n) % n;
  fireCooldown = Math.max(fireCooldown, 0.12); // small delay on switch
  updateHud();
  return GA_GUNS[currentGun].id;
}

// Direct gun selection (keys 1-4). Returns the new gun id or null.
export function selectGun(index) {
  if (!active || gameOver) return null;
  if (index < 0 || index >= GA_GUNS.length || index === currentGun) return null;
  currentGun = index;
  fireCooldown = Math.max(fireCooldown, 0.12);
  updateHud();
  return GA_GUNS[currentGun].id;
}

export function getCurrentGun() { return active ? GA_GUNS[currentGun] : null; }

export function clearGunAffair() {
  active = false;
  gameOver = false;
  if (_hudEl) { _hudEl.remove(); _hudEl = null; }
  if (_cycleBtn) { _cycleBtn.remove(); _cycleBtn = null; }
  if (_overlayEl) { _overlayEl.remove(); _overlayEl = null; }
  if (_tracer) {
    _tracer.geometry.dispose();
    _tracer.material.dispose();
    _tracer.parent && _tracer.parent.remove(_tracer);
    _tracer = null;
  }
}

export function setGunAffairExit(fn) { _exitCb = fn; }

// Fire the current gun. Guarded by cooldown so holding click fires at its rate.
export function gunFire(ctx) {
  if (!active || gameOver) return;
  if (fireCooldown > 0) return;
  const gun = GA_GUNS[currentGun];
  fireCooldown = gun.interval;

  const { camera, player, world, mobManager, breakParticles, audio } = ctx;
  const origin = camera.position.clone();
  const baseDir = new THREE.Vector3();
  camera.getWorldDirection(baseDir);

  // Right/up vectors for spread (perpendicular to aim direction).
  const _spreadRight = new THREE.Vector3();
  const _spreadUp = new THREE.Vector3();
  if (Math.abs(baseDir.y) < 0.999) {
    _spreadRight.crossVectors(baseDir, new THREE.Vector3(0, 1, 0)).normalize();
  } else {
    _spreadRight.set(1, 0, 0);
  }
  _spreadUp.crossVectors(_spreadRight, baseDir).normalize();

  let anyMobHit = false;
  let bestTracerEnd = null;
  const bestTracerStart = origin;
  for (let p = 0; p < gun.pellets; p++) {
    const dir = baseDir.clone();
    if (gun.spread > 0) {
      const rx = (Math.random() * 2 - 1) * gun.spread;
      const ry = (Math.random() * 2 - 1) * gun.spread;
      dir.addScaledVector(_spreadRight, rx).addScaledVector(_spreadUp, ry).normalize();
    }
    const range = gun.range;
    const mobHit = mobManager && mobManager.hitTest ? mobManager.hitTest(origin, dir, range) : null;
    if (mobHit) {
      anyMobHit = true;
      mobHit.takeDamage(gun.dmg, origin);
      if (mobManager.playHurtSound) mobManager.playHurtSound(mobHit.type);
      if (breakParticles && breakParticles.emit) {
        breakParticles.emit(mobHit.type === 'slime' ? BLOCK.SLIME_BLOCK : BLOCK.STONE, mobHit.position.x, mobHit.position.y, mobHit.position.z, 10);
      }
      bestTracerEnd = mobHit.position;
      if (mobHit.dead) {
        kills++;
        combo = Math.min(combo + 1, 9);
        comboTime = 3;
        score += 10 * combo;
        if (audio) { if (audio.levelUp) audio.levelUp(); }
      }
    } else {
      // No mob in the way: shoot blocks (destructible arena) or a tracer to range.
      const hit = raycastVoxel(world, origin, dir, range);
      if (hit) {
        const b = world.getBlock(hit.x, hit.y, hit.z);
        if (breakParticles && breakParticles.emit) breakParticles.emit(b, hit.x, hit.y, hit.z, 12);
        if (b !== BLOCK.BEDROCK && b !== BLOCK.AIR) world.setBlock(hit.x, hit.y, hit.z, BLOCK.AIR);
        if (!bestTracerEnd) bestTracerEnd = new THREE.Vector3(hit.x + 0.5, hit.y + 0.5, hit.z + 0.5);
      } else if (!bestTracerEnd) {
        bestTracerEnd = origin.clone().addScaledVector(dir, range);
      }
    }
  }
  if (bestTracerEnd) showTracer(bestTracerStart, bestTracerEnd);
  updateHud();
  if (player) {
    // tiny impulse so every shot has a bit of feel
    player.velocity.x += baseDir.x * 0.02;
    player.velocity.z += baseDir.z * 0.02;
  }
}

export function tickGunAffair(dt, ctx) {
  if (!active) return;
  if (gameOver) { updateHud(); return; }

  // Death hands off to the normal death screen; the HUD records the run.
  if (ctx.player && ctx.player.isDead()) {
    gameOver = true;
    return;
  }

  if (fireCooldown > 0) fireCooldown -= dt;
  if (comboTime > 0) { comboTime -= dt; if (comboTime <= 0) combo = 0; }

  // Tracer fade-out.
  if (_tracer && _tracerLife > 0) {
    _tracerLife -= dt;
    _tracer.material.opacity = Math.max(0, _tracerLife / 0.08);
    if (_tracerLife <= 0) _tracer.visible = false;
  }

  // Keep the arena fed with hostiles.
  spawnTimer -= dt;
  if (spawnTimer <= 0) {
    spawnTimer = Math.max(0.5, 1.3 - kills * 0.01);
    const alive = (ctx.mobManager && ctx.mobManager.mobs || []).filter(m => !m.dead).length;
    if (alive < 12) {
      const spot = EDGE_SPOTS[Math.floor(Math.random() * EDGE_SPOTS.length)];
      const type = HOSTILE_POOL[Math.floor(Math.random() * HOSTILE_POOL.length)];
      if (ctx.mobManager && ctx.mobManager.spawnAt) {
        const m = ctx.mobManager.spawnAt(type, spot[0] + 0.5, GA_Y + 1, spot[1] + 0.5);
        if (m) m.aggro = true;
      }
    }
  }

  timeLeft -= dt;
  if (timeLeft <= 0) {
    timeLeft = 0;
    gameOver = true;
    showEnd();
  }
  updateHud();
}

function _ensureHud() {
  if (_hudEl) return;
  _hudEl = document.createElement('div');
  _hudEl.id = 'gunaffair-hud';
  _hudEl.style.cssText = 'position:fixed;top:10px;left:50%;transform:translateX(-50%);z-index:100;pointer-events:none;text-align:center;font-family:monospace;text-shadow:0 1px 3px #000;';
  document.body.appendChild(_hudEl);
  // Tap target to cycle guns (works on mobile where there are no 1-4 keys).
  const cycleBtn = document.createElement('button');
  cycleBtn.id = 'btn-ga-switch';
  cycleBtn.textContent = '🔁 SWITCH GUN';
  cycleBtn.style.cssText = 'position:fixed;right:16px;bottom:120px;z-index:100;font:bold 12px monospace;background:rgba(20,20,30,0.8);color:#fff;border:1px solid rgba(255,255,255,0.3);border-radius:8px;padding:10px 14px;pointer-events:auto;touch-action:none;display:none;';
  cycleBtn.addEventListener('click', () => cycleGun(1));
  document.body.appendChild(cycleBtn);
  _cycleBtn = cycleBtn;
}

function _setCycleBtnVisible(show) {
  if (_cycleBtn) _cycleBtn.style.display = show ? '' : 'none';
}

function updateHud() {
  if (!_hudEl) return;
  const m = Math.floor(timeLeft / 60);
  const s = String(Math.max(0, Math.floor(timeLeft % 60))).padStart(2, '0');
  const gun = GA_GUNS[currentGun];
  const gunLabel = `<span style="color:${gun.color};">${gun.name}</span>`;
  let body;
  if (gameOver) {
    body = `<div style="font:bold 15px monospace;color:#f66;">GAME OVER — ${kills} kills</div>`;
  } else {
    body = `<div style="font:13px monospace;color:#fff;">⏱ ${m}:${s} &nbsp;·&nbsp; KILLS <b style="color:#f96;">${kills}</b> &nbsp;·&nbsp; SCORE <b style="color:#6f6;">${score}</b></div>` +
      `<div style="font:12px monospace;color:#aaa;margin-top:2px;">Gun: ${gunLabel} <span style="color:#666;">(1-4 / wheel to switch)</span></div>` +
      (combo > 1 ? `<div style="font:12px monospace;color:#ff0;">COMBO ×${combo}</div>` : '');
  }
  _hudEl.innerHTML = '<div style="font:bold 16px monospace;color:#f66;">🔫 GUN AFFAIR</div>' + body;
}

function _ensureTracer(scene) {
  if (_tracer || !scene) return;
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3));
  const mat = new THREE.LineBasicMaterial({ color: 0xfff060, transparent: true, opacity: 0 });
  _tracer = new THREE.Line(geo, mat);
  _tracer.frustumCulled = false;
  scene.add(_tracer);
}

function showTracer(from, to) {
  if (!_tracer) return;
  const pos = _tracer.geometry.attributes.position;
  pos.setXYZ(0, from.x, from.y, from.z);
  pos.setXYZ(1, to.x, to.y, to.z);
  pos.needsUpdate = true;
  _tracer.visible = true;
  _tracer.material.opacity = 1;
  _tracerLife = 0.08;
}

function showEnd() {
  if (_overlayEl) _overlayEl.remove();
  _overlayEl = document.createElement('div');
  _overlayEl.id = 'gunaffair-overlay';
  _overlayEl.style.cssText = 'position:fixed;inset:0;z-index:200;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.55);font-family:monospace;';
  _overlayEl.innerHTML =
    '<div style="background:rgba(20,20,30,0.95);border:1px solid #f66;border-radius:12px;padding:26px 42px;text-align:center;">' +
    '<div style="font:bold 26px monospace;color:#f66;">TIME&rsquo;S UP!</div>' +
    `<div style="font:16px monospace;color:#fff;margin:14px 0 4px;">Kills</div>` +
    `<div style="font:bold 40px monospace;color:#f96;">${kills}</div>` +
    `<div style="font:12px monospace;color:#aaa;margin-top:6px;">Final score <b style="color:#6f6;">${score}</b> &nbsp;·&nbsp; best combo ×${combo}</div>` +
    '<button id="btn-ga-quit" style="margin-top:18px;font-family:monospace;font-size:15px;background:#f66;color:#111;border:none;border-radius:8px;padding:10px 26px;cursor:pointer;">BACK TO MINIGAMES</button>' +
    '</div>';
  document.body.appendChild(_overlayEl);
  document.getElementById('btn-ga-quit').addEventListener('click', () => {
    if (typeof _exitCb === 'function') _exitCb();
  });
}