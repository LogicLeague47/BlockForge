import { BLOCK } from './blocks.js';
import { CHUNK_SIZE } from './constants.js';

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

// ─── Build one level, returns {x, y, z} of the finish trigger ────────
export function buildParkourLevel(world, levelNum, ox, oy, oz) {
  const cfg = DIFFICULTY[levelNum] || DIFFICULTY[1];
  const b = cfg.block, a = cfg.accent;
  const startW = 5, startD = 4;

  // Start platform
  fillBox(world, ox - 2, oy, oz, startW, startD, 1, BLOCK.GRASS);
  for (let dx = -2; dx <= 2; dx++)
    for (let dz = -1; dz <= 2; dz++)
      if (world.getBlock(ox + dx, oy + 1, oz + dz) === 0)
        world.setBlock(ox + dx, oy + 1, oz + dz, a);

  let px = 0, pz = 0;

  // ── Ladder climb ──────────────────────────────────────────────
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

  // ── Standard / zigzag / staircase / corners ──────────────────
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

  // Finish platform
  fillBox(world, cx - 2, oy + (cfg.staircase ? cfg.count : 0), cz - 1, 5, 4, 1, BLOCK.GOLD_BLOCK);
  return { x: cx + 1, y: oy + (cfg.staircase ? cfg.count : 0) + 2, z: cz + 1 };
}

// ─── Build the parkour lobby ─────────────────────────────────────────
export function buildParkourLobby(world, ox, oy, oz) {
  const half = 12;
  // Glass floor
  fillBox(world, ox - half, oy, oz - half, half * 2 + 1, half * 2 + 1, 1, BLOCK.VOID_GLASS);
  // Glass walls with a doorway on the -X side (toward level 1)
  for (let dx = -half; dx <= half; dx++)
    for (let dz = -half; dz <= half; dz++)
      if (Math.abs(dx) === half || Math.abs(dz) === half) {
        // Skip blocks for the doorway
        if (dx === -half && dz >= -2 && dz <= 2) continue;
        fillBox(world, ox + dx, oy + 1, oz + dz, 1, 1, 4, BLOCK.GLASS);
      }
  // Doorway floor accent
  for (let dz = -2; dz <= 2; dz++)
    for (let dy = 0; dy < 4; dy++)
      world.setBlock(ox - half, oy + 1 + dy, oz + dz, BLOCK.AIR);
  // Gold block step at doorway
  fillBox(world, ox - half - 1, oy, oz - 2, 1, 5, 1, BLOCK.GOLD_BLOCK);

  // Coloured guide path on floor leading to the exit portal
  for (let dx = -2; dx <= 2; dx++)
    for (let dz = 0; dz <= 8; dz++)
      world.setBlock(ox + dx, oy + 1, oz + dz, BLOCK.WOOL);
  // Outer glow ring
  for (let dx = -6; dx <= 6; dx++) {
    world.setBlock(ox + dx, oy + 1, oz - half + 1, BLOCK.GOLD_BLOCK);
    world.setBlock(ox + dx, oy + 1, oz + half - 1, BLOCK.GOLD_BLOCK);
    world.setBlock(ox - half + 1, oy + 1, oz + dx, BLOCK.GOLD_BLOCK);
    world.setBlock(ox + half - 1, oy + 1, oz + dx, BLOCK.GOLD_BLOCK);
  }
  // Centre pillar
  fillBox(world, ox - 1, oy + 1, oz - 1, 3, 3, 5, BLOCK.QUARTZ_BLOCK);
  world.setBlock(ox, oy + 6, oz, BLOCK.GOLD_BLOCK);
  // Torches at entrance
  world.setBlock(ox + half + 1, oy + 2, oz, BLOCK.TORCH);
  world.setBlock(ox + half + 1, oy + 2, oz - 1, BLOCK.TORCH);
  // Information sign — a wool wall
  for (let dy = 1; dy <= 3; dy++)
    world.setBlock(ox - half - 1, oy + dy, oz, BLOCK.WOOL);
  world.setBlock(ox - half - 1, oy + 2, oz + 1, BLOCK.WOOL);
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
  }

  start(levelPositions) {
    this.levelPositions = levelPositions;
    this.currentLevel = 0;
    this.deaths = 0;
    this.elapsed = 0;
    this.startTime = performance.now();
    this.finished = false;
    this.active = true;
    // No teleport — player already at lobby, walks to level 1
  }

  // Called when player reaches a finish trigger
  onFinishTrigger() {
    if (!this.active || this.finished) return;
    const next = this.currentLevel + 1;
    // Show level complete toast
    const lvl = PARKOUR_LEVELS[this.currentLevel];
    if (lvl && this.ui && this.ui.itemNameEl) {
      this.ui.itemNameEl.textContent = `✔ Level ${lvl.id} Complete!`;
      this.ui.itemNameEl.style.color = '#0f0';
      this.ui.itemNameEl.classList.add('visible');
      setTimeout(() => {
        this.ui.itemNameEl.classList.remove('visible');
        this.ui.itemNameEl.style.color = '#fff';
      }, 1500);
    }
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

    // Keep player at full health — no fall damage in parkour
    this.player.health = this.player.maxHealth;

    // Void death
    if (this.player.position.y < -10) {
      this.deaths++;
      const pos = this.levelPositions[this.currentLevel];
      if (pos) {
        this.player.position.set(pos.x, pos.y, pos.z);
        this.player.velocity.set(0, 0, 0);
        this.player.health = this.player.maxHealth;
      }
    }

    // Check if player is near the next level's finish trigger
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
    el.innerHTML = `<div class="pk-hud-level">Level ${this.currentLevel + 1}${lvl ? ': ' + lvl.name : ''}</div>
<div class="pk-hud-time">⏱ ${time}</div>
<div class="pk-hud-deaths">💀 ${this.deaths}</div>`;
  }

  finish() {
    this.finished = true;
    this.active = false;
    this.elapsed = (performance.now() - this.startTime) / 1000;
    const m = Math.floor(this.elapsed / 60);
    const s = Math.floor(this.elapsed % 60);
    const ms = Math.floor((this.elapsed % 1) * 100);
    const timeStr = `${m}:${String(s).padStart(2,'0')}.${String(ms).padStart(2,'0')}`;

    let grade = 'D', gradeColor = '#888';
    if (this.elapsed < 30) { grade = 'S'; gradeColor = '#ffd700'; }
    else if (this.elapsed < 60) { grade = 'A'; gradeColor = '#ff4444'; }
    else if (this.elapsed < 120) { grade = 'B'; gradeColor = '#44aa44'; }
    else if (this.elapsed < 240) { grade = 'C'; gradeColor = '#4488ff'; }

    document.getElementById('parkour-hud').style.display = 'none';
    const el = document.getElementById('parkour-finish');
    if (!el) return;
    el.style.display = 'flex';
    el.innerHTML = `<div class="pk-finish-title">🏁 Course Complete!</div>
<div class="pk-finish-grade" style="color:${gradeColor}">Rank: ${grade}</div>
<div class="pk-finish-time">${timeStr}</div>
<div class="pk-finish-deaths">Deaths: ${this.deaths}</div>
<button class="pk-finish-btn" id="btn-pk-exit">Back to Menu</button>`;
    document.getElementById('btn-pk-exit')?.addEventListener('click', () => {
      el.style.display = 'none';
      this.ui.showMenu('main');
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
