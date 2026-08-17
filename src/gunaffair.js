import { BLOCK } from './blocks.js';
import { raycastVoxel } from './raycast.js';
import * as THREE from 'three';

// ─── GunAffair ─────────────────────────────────────────────────────────
// Hitscan arena shooter: hold left-click to fire an infinite-energy rifle at
// mobs pouring in from the arena edges. Chain kills to build a combo for a
// bigger score before the 60-second clock runs out.

export const GA_Y = 100;           // arena surface level
export const GA_DURATION = 60;     // seconds
export const GA_RANGE = 50;        // hitscan reach
export const GA_DMG = 10;          // damage per hit
export const GA_FIRE_INTERVAL = 0.16;  // ~6 rounds/sec

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
let _hudEl = null;
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
  _ensureTracer(scene);
  _ensureHud();
  updateHud();
}

export function clearGunAffair() {
  active = false;
  gameOver = false;
  if (_hudEl) { _hudEl.remove(); _hudEl = null; }
  if (_overlayEl) { _overlayEl.remove(); _overlayEl = null; }
  if (_tracer) {
    _tracer.geometry.dispose();
    _tracer.material.dispose();
    _tracer.parent && _tracer.parent.remove(_tracer);
    _tracer = null;
  }
}

export function setGunAffairExit(fn) { _exitCb = fn; }

// Fire the rifle. Guarded by cooldown so holding click fires at full-auto rate.
export function gunFire(ctx) {
  if (!active || gameOver) return;
  if (fireCooldown > 0) return;
  fireCooldown = GA_FIRE_INTERVAL;

  const { camera, player, world, mobManager, breakParticles, audio } = ctx;
  const origin = camera.position.clone();
  const dir = new THREE.Vector3();
  camera.getWorldDirection(dir);

  const mobHit = mobManager && mobManager.hitTest ? mobManager.hitTest(origin, dir, GA_RANGE) : null;
  if (mobHit) {
    mobHit.takeDamage(GA_DMG, origin);
    if (mobManager.playHurtSound) mobManager.playHurtSound(mobHit.type);
    if (breakParticles && breakParticles.emit) {
      breakParticles.emit(mobHit.type === 'slime' ? BLOCK.SLIME_BLOCK : BLOCK.STONE, mobHit.position.x, mobHit.position.y, mobHit.position.z, 10);
    }
    showTracer(origin, mobHit.position);
    if (mobHit.dead) {
      kills++;
      combo = Math.min(combo + 1, 9);
      comboTime = 3;
      score += 10 * combo;
      if (audio) { if (audio.levelUp) audio.levelUp(); }
    }
  } else {
    // No mob in the way: shoot blocks (destructible arena) or a tracer to range.
    const hit = raycastVoxel(world, origin, dir, GA_RANGE);
    if (hit) {
      const b = world.getBlock(hit.x, hit.y, hit.z);
      if (breakParticles && breakParticles.emit) breakParticles.emit(b, hit.x, hit.y, hit.z, 12);
      if (b !== BLOCK.BEDROCK && b !== BLOCK.AIR) world.setBlock(hit.x, hit.y, hit.z, BLOCK.AIR);
      showTracer(origin, new THREE.Vector3(hit.x + 0.5, hit.y + 0.5, hit.z + 0.5));
    } else {
      showTracer(origin, origin.clone().add(dir.clone().multiplyScalar(GA_RANGE)));
    }
  }
  if (player) {
    // tiny impulse so every shot has a bit of feel
    player.velocity.x += dir.x * 0.02;
    player.velocity.z += dir.z * 0.02;
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
}

function updateHud() {
  if (!_hudEl) return;
  const m = Math.floor(timeLeft / 60);
  const s = String(Math.max(0, Math.floor(timeLeft % 60))).padStart(2, '0');
  let body;
  if (gameOver) {
    body = `<div style="font:bold 15px monospace;color:#f66;">GAME OVER — ${kills} kills</div>`;
  } else {
    body = `<div style="font:13px monospace;color:#fff;">⏱ ${m}:${s} &nbsp;·&nbsp; KILLS <b style="color:#f96;">${kills}</b> &nbsp;·&nbsp; SCORE <b style="color:#6f6;">${score}</b></div>` +
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