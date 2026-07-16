import { BLOCK } from './blocks.js';
import { CHUNK_SIZE } from './constants.js';

const PK_KEY = 'blockforge_parkour_pbs';

// ─── Level Definitions ───────────────────────────────────────────────
export const PARKOUR_LEVELS = [
  { id: 1, name: 'First Steps',     desc: 'Simple 2-block gaps' },
  { id: 2, name: 'Wide Jump',       desc: '3-block gaps' },
  { id: 3, name: 'Zigzag',          desc: 'Diagonal platforms' },
  { id: 4, name: 'Staircase',       desc: 'Ascending jumps' },
  { id: 5, name: 'Long Jump',       desc: 'Running start needed' },
  { id: 6, name: 'Sharp Turns',     desc: 'Corner platforms' },
  { id: 7, name: 'Ladder Climb',    desc: 'Vertical ascent' },
  { id: 8, name: 'Narrow Path',     desc: 'One-block wide' },
  { id: 9, name: 'Mixed Gaps',      desc: 'Varying distances' },
  { id: 10, name: 'The Final Leap', desc: '5-block gap finale' },
];

const DIFFICULTY = {
  1: { gap: 2, w: 3, d: 3, count: 5, block: BLOCK.PLANKS, accent: BLOCK.WOOL },
  2: { gap: 3, w: 3, d: 3, count: 5, block: BLOCK.PLANKS, accent: BLOCK.WOOL },
  3: { gap: 2, w: 3, d: 3, count: 6, block: BLOCK.STONE, accent: BLOCK.BRICK, zigzag: true },
  4: { gap: 2, w: 3, d: 3, count: 5, block: BLOCK.STONE, accent: BLOCK.BRICK, staircase: true },
  5: { gap: 4, w: 4, d: 3, count: 4, block: BLOCK.COBBLESTONE, accent: BLOCK.GOLD_BLOCK },
  6: { gap: 3, w: 3, d: 3, count: 7, block: BLOCK.COBBLESTONE, accent: BLOCK.GOLD_BLOCK, corners: true },
  7: { gap: 2, w: 3, d: 3, count: 5, block: BLOCK.QUARTZ_BLOCK, accent: BLOCK.IRON_BLOCK, ladder: true },
  8: { gap: 2, w: 1, d: 3, count: 7, block: BLOCK.QUARTZ_BLOCK, accent: BLOCK.IRON_BLOCK },
  9: { gap: 2, w: 3, d: 3, count: 8, block: BLOCK.EMBEROCK, accent: BLOCK.GREENSTONE_BLOCK, mixed: true },
  10: { gap: 5, w: 4, d: 4, count: 3, block: BLOCK.VOIDSTONE, accent: BLOCK.DIAMOND_BLOCK },
};

function fillBox(world, x, y, z, w, d, h, block) {
  for (let dx = 0; dx < w; dx++)
    for (let dz = 0; dz < d; dz++)
      for (let dy = 0; dy < h; dy++)
        world.setBlock(x + dx, y + dy, z + dz, block);
}

export function buildParkourLevel(world, levelNum, ox, oy, oz) {
  const cfg = DIFFICULTY[levelNum] || DIFFICULTY[1];
  const b = cfg.block, a = cfg.accent;
  const startW = 5, startD = 4;

  fillBox(world, ox - 2, oy, oz, startW, startD, 1, BLOCK.GRASS);
  for (let dx = -2; dx <= 2; dx++)
    for (let dz = -1; dz <= 2; dz++)
      if (world.getBlock(ox + dx, oy + 1, oz + dz) === 0)
        world.setBlock(ox + dx, oy + 1, oz + dz, a);

  let px = 0, pz = 0;

  if (cfg.ladder) {
    for (let i = 0; i < cfg.count; i++) {
      const lx = ox + px, lz = oz + pz + i * (cfg.d + cfg.gap);
      fillBox(world, lx, oy + i * 3, lz, cfg.w, cfg.d, 1, b);
      if (i < cfg.count - 1) {
        for (let ly = oy + i * 3 + 1; ly < oy + (i + 1) * 3; ly++)
          world.setBlock(lx + 1, ly, lz - 1, BLOCK.LADDER);
      }
      world.setBlock(lx, oy + i * 3 + 1, lz + 1, a);
    }
    const fx = ox + px, fz = oz + pz + cfg.count * (cfg.d + cfg.gap);
    fillBox(world, fx - 2, oy + cfg.count * 3, fz - 1, 5, 4, 1, a);
    return { x: fx + 1, y: oy + cfg.count * 3 + 2, z: fz + 1 };
  }

  let dir = 1, angle = 0, cx = ox, cz = oz;

  for (let i = 0; i < cfg.count; i++) {
    const gap = cfg.mixed ? 1 + (i % 4) * 1.5 : cfg.gap;
    const g = Math.round(gap);

    if (cfg.corners && i % 2 === 1) angle = angle === 0 ? 1 : 0;

    let offX = 0, offZ = 0;
    if (angle === 0) offZ = dir * (cfg.d + g);
    else offX = dir * (cfg.w + g);

    cx += offX;
    cz += offZ;

    if (cfg.zigzag) dir *= -1;

    let wy = oy + (cfg.staircase ? (i + 1) : 0);
    fillBox(world, cx, wy, cz, cfg.w, cfg.d, 1, b);
    world.setBlock(cx + Math.floor(cfg.w / 2), wy + 1, cz + Math.floor(cfg.d / 2), a);
  }

  fillBox(world, cx - 2, oy + (cfg.staircase ? cfg.count : 0), cz - 1, 5, 4, 1, BLOCK.GOLD_BLOCK);
  return { x: cx + 1, y: oy + (cfg.staircase ? cfg.count : 0) + 2, z: cz + 1 };
}

export function buildParkourLobby(world, ox, oy, oz) {
  const half = 12;
  fillBox(world, ox - half, oy, oz - half, half * 2 + 1, half * 2 + 1, 1, BLOCK.VOID_GLASS);
  for (let dx = -half; dx <= half; dx++)
    for (let dz = -half; dz <= half; dz++)
      if (Math.abs(dx) === half || Math.abs(dz) === half) {
        if (dx === -half && dz >= -2 && dz <= 2) continue;
        fillBox(world, ox + dx, oy + 1, oz + dz, 1, 1, 4, BLOCK.GLASS);
      }
  for (let dz = -2; dz <= 2; dz++)
    for (let dy = 0; dy < 4; dy++)
      world.setBlock(ox - half, oy + 1 + dy, oz + dz, BLOCK.AIR);
  fillBox(world, ox - half - 1, oy, oz - 2, 1, 5, 1, BLOCK.GOLD_BLOCK);

  for (let dx = -2; dx <= 2; dx++)
    for (let dz = 0; dz <= 8; dz++)
      world.setBlock(ox + dx, oy + 1, oz + dz, BLOCK.WOOL);
  for (let dx = -6; dx <= 6; dx++) {
    world.setBlock(ox + dx, oy + 1, oz - half + 1, BLOCK.GOLD_BLOCK);
    world.setBlock(ox + dx, oy + 1, oz + half - 1, BLOCK.GOLD_BLOCK);
    world.setBlock(ox - half + 1, oy + 1, oz + dx, BLOCK.GOLD_BLOCK);
    world.setBlock(ox + half - 1, oy + 1, oz + dx, BLOCK.GOLD_BLOCK);
  }
  fillBox(world, ox - 1, oy + 1, oz - 1, 3, 3, 5, BLOCK.QUARTZ_BLOCK);
  world.setBlock(ox, oy + 6, oz, BLOCK.GOLD_BLOCK);
  world.setBlock(ox + half + 1, oy + 2, oz, BLOCK.TORCH);
  world.setBlock(ox + half + 1, oy + 2, oz - 1, BLOCK.TORCH);
  for (let dy = 1; dy <= 3; dy++)
    world.setBlock(ox - half - 1, oy + dy, oz, BLOCK.WOOL);
  world.setBlock(ox - half - 1, oy + 2, oz + 1, BLOCK.WOOL);
}

export function loadParkourPBs() {
  try { return JSON.parse(localStorage.getItem(PK_KEY)) || {}; }
  catch { return {}; }
}
function saveParkourPBs(pbs) {
  try { localStorage.setItem(PK_KEY, JSON.stringify(pbs)); }
  catch {}
}

function timeStr(t) {
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  const ms = Math.floor((t % 1) * 100);
  return `${m}:${String(s).padStart(2,'0')}.${String(ms).padStart(2,'0')}`;
}

function gradeFor(t) {
  if (t < 30) return { g: 'S', c: '#ffd700' };
  if (t < 60) return { g: 'A', c: '#ff4444' };
  if (t < 120) return { g: 'B', c: '#44aa44' };
  if (t < 240) return { g: 'C', c: '#4488ff' };
  return { g: 'D', c: '#888' };
}

// ─── Parkour Game State ──────────────────────────────────────────────
export class ParkourGame {
  constructor(world, player, ui) {
    this.world = world;
    this.player = player;
    this.ui = ui;
    this.currentLevel = 0;
    this.startTime = 0;
    this.elapsed = 0;
    this.deaths = 0;
    this.levelPositions = [];
    this.finished = false;
    this.active = false;
    this.training = false;
    this.savestate = null;
    this.pbData = loadParkourPBs();
    this._toastTimer = 0;
  }

  start(levelPositions) {
    this.levelPositions = levelPositions;
    this.currentLevel = 0;
    this.deaths = 0;
    this.elapsed = 0;
    this.startTime = performance.now();
    this.finished = false;
    this.active = true;
    this.training = false;
    this.savestate = null;
  }

  toggleTraining() {
    this.training = !this.training;
    this.showToast(this.training ? '✈ Training Mode ON — no deaths counted' : '⚔ Training Mode OFF');
  }

  saveState() {
    if (!this.active) return;
    const p = this.player.position;
    this.savestate = { x: p.x, y: p.y, z: p.z, vx: this.player.velocity.x, vy: this.player.velocity.y, vz: this.player.velocity.z };
    this.showToast('📸 Position saved (press L to load)');
  }

  loadState() {
    if (!this.active || !this.savestate) return;
    const s = this.savestate;
    this.player.position.set(s.x, s.y, s.z);
    this.player.velocity.set(s.vx || 0, s.vy || 0, s.vz || 0);
    this.showToast('↩ Savestate loaded');
  }

  showToast(msg, color = '#0f0') {
    const el = this.ui?.itemNameEl;
    if (!el) return;
    el.textContent = msg;
    el.style.color = color;
    el.classList.add('visible');
    this._toastTimer = 2.5;
  }

  onFinishTrigger() {
    if (!this.active || this.finished) return;
    if (this.training) {
      this.showToast('✔ Level would be complete! (Exit training to progress)');
      return;
    }
    const next = this.currentLevel + 1;
    const lvl = PARKOUR_LEVELS[this.currentLevel];
    if (lvl) {
      // Record PB for this level
      const key = String(lvl.id);
      const t = this.elapsed;
      if (!this.pbData[key] || t < this.pbData[key]) {
        this.pbData[key] = t;
        saveParkourPBs(this.pbData);
      }
    }
    this.showToast(`✔ Level ${lvl.id} Complete!`, '#0f0');
    if (next >= this.levelPositions.length) {
      this.finish();
      return;
    }
    this.currentLevel = next;
    const pos = this.levelPositions[next];
    if (pos) {
      this.player.position.set(pos.x, pos.y, pos.z);
      this.player.velocity.set(0, 0, 0);
    }
  }

  update() {
    if (!this.active || this.finished) return;
    this.elapsed = (performance.now() - this.startTime) / 1000;

    // Decrement toast timer
    if (this._toastTimer > 0) {
      this._toastTimer -= 1 / 60;
      if (this._toastTimer <= 0) {
        const el = this.ui?.itemNameEl;
        if (el) el.classList.remove('visible');
      }
    }

    this.player.health = this.player.maxHealth;

    if (this.player.position.y < -10) {
      if (!this.training) this.deaths++;
      const pos = this.levelPositions[this.currentLevel];
      if (pos) {
        this.player.position.set(pos.x, pos.y, pos.z);
        this.player.velocity.set(0, 0, 0);
        this.player.health = this.player.maxHealth;
      }
    }

    const pos = this.levelPositions[this.currentLevel];
    if (pos) {
      const dx = this.player.position.x - pos.x;
      const dz = this.player.position.z - pos.z;
      if (Math.sqrt(dx * dx + dz * dz) < 2) {
        this.onFinishTrigger();
      }
    }

    this.updateHUD();
  }

  updateHUD() {
    const m = Math.floor(this.elapsed / 60);
    const s = Math.floor(this.elapsed % 60);
    const ms = Math.floor((this.elapsed % 1) * 100);
    const time = `${m}:${String(s).padStart(2,'0')}.${String(ms).padStart(2,'0')}`;
    const el = document.getElementById('parkour-hud');
    if (!el) return;
    el.style.display = 'block';
    const lvl = PARKOUR_LEVELS[this.currentLevel];
    const pbKey = lvl ? String(lvl.id) : null;
    const pb = pbKey && this.pbData[pbKey] ? timeStr(this.pbData[pbKey]) : null;
    const trainTag = this.training ? ' [TRAINING]' : '';
    el.innerHTML = `<div class="pk-hud-level">Level ${this.currentLevel + 1}${lvl ? ': ' + lvl.name : ''}${trainTag}</div>
<div class="pk-hud-time">⏱ ${time}${pb ? ` <span class="pk-hud-pb">(PB: ${pb})</span>` : ''}</div>
<div class="pk-hud-deaths">💀 ${this.deaths}</div>`;
  }

  finish() {
    this.finished = true;
    this.active = false;
    this.elapsed = (performance.now() - this.startTime) / 1000;
    const t = this.elapsed;
    const gr = gradeFor(t);
    const timeS = timeStr(t);

    document.getElementById('parkour-hud').style.display = 'none';
    const el = document.getElementById('parkour-finish');
    if (!el) return;
    el.style.display = 'flex';
    el.innerHTML = `<div class="pk-finish-title">🏁 Course Complete!</div>
<div class="pk-finish-grade" style="color:${gr.c}">Rank: ${gr.g}</div>
<div class="pk-finish-time">${timeS}</div>
<div class="pk-finish-deaths">Deaths: ${this.deaths}</div>
<button class="pk-finish-btn" id="btn-pk-exit">Back to Menu</button>`;
    document.getElementById('btn-pk-exit')?.addEventListener('click', () => {
      el.style.display = 'none';
      this.cleanup();
      this.ui.hideOverlay();
      if (window._exitParkourToMinigames) window._exitParkourToMinigames();
    });
  }

  cleanup() {
    this.active = false;
    const h = document.getElementById('parkour-hud');
    if (h) h.style.display = 'none';
    const f = document.getElementById('parkour-finish');
    if (f) f.style.display = 'none';
  }
}
