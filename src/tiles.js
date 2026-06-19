// Procedural pixel-art texture atlas.
//
// Generates a single 256x256 canvas (16x16 grid of 16x16 tiles) so the whole
// world can render with one material + one texture. Every tile is drawn with a
// small mulberry32 PRNG so textures are deterministic for a given seed and
// chunky/pixelated rather than blurry.
//
// Public API:
//   buildAtlas(seed)            -> { canvas, getTile(name) -> {u0,v0,u1,v1} }
//   makeIcon(blockId)           -> small canvas for hotbar icons

import { TILES, tileNameFor } from './blocks.js';

const TILE = 16;             // pixels per tile
const COLS = 16;             // tiles per row
const ROWS = 16;
const ATLAS = TILE * COLS;   // 256

// --- small deterministic PRNG -------------------------------------------------
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hexToRgb(h) {
  const n = parseInt(h.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function mix(a, b, t) {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}
function shade(c, f) { return [c[0] * f, c[1] * f, c[2] * f]; }

// Per-pixel "noise" so flat colors look textured (mimics Minecraft's per-texel variance).
function noisy(ctx, x0, y0, base, variance, rng, darkness = 1) {
  for (let y = 0; y < TILE; y++) {
    for (let x = 0; x < TILE; x++) {
      const n = (rng() - 0.5) * 2 * variance;
      const f = darkness * (1 + n);
      ctx.fillStyle = `rgb(${clamp(base[0]*f)},${clamp(base[1]*f)},${clamp(base[2]*f)})`;
      ctx.fillRect(x0 + x, y0 + y, 1, 1);
    }
  }
}
function clamp(v) { return Math.max(0, Math.min(255, Math.round(v))); }

// --- individual tile painters ------------------------------------------------
const PAINTERS = {
  grass_top(ctx, x0, y0, rng) {
    // Base green with natural variation (Minecraft uses 95,159,53)
    noisy(ctx, x0, y0, [95, 159, 53], 0.10, rng);
    // Scattered darker grass blades
    for (let i = 0; i < 18; i++) {
      const x = (rng() * TILE) | 0, y = (rng() * TILE) | 0;
      ctx.fillStyle = rng() < 0.4 ? `rgb(70,130,38)` : `rgb(110,175,60)`;
      ctx.fillRect(x0 + x, y0 + y, 1, 1);
    }
  },
  grass_side(ctx, x0, y0, rng) {
    // Dirt body (Minecraft dirt: 134,96,67)
    noisy(ctx, x0, y0, [134, 96, 67], 0.10, rng);
    // Dirt specks
    for (let i = 0; i < 6; i++) {
      const x = (rng() * TILE) | 0, y = 3 + (rng() * 12) | 0;
      ctx.fillStyle = `rgb(110,78,52)`;
      ctx.fillRect(x0 + x, y0 + y, 1, 1);
    }
    // Grassy overhang on top ~4px, with jagged dripping edge
    for (let x = 0; x < TILE; x++) {
      const h = 3 + ((rng() * 3) | 0);
      for (let y = 0; y < h; y++) {
        const n = (rng() - 0.5) * 0.15;
        ctx.fillStyle = `rgb(${clamp(95*(1+n))},${clamp(159*(1+n))},${clamp(53*(1+n))})`;
        ctx.fillRect(x0 + x, y0 + y, 1, 1);
      }
    }
  },
  snow_side(ctx, x0, y0, rng) {
    noisy(ctx, x0, y0, [134, 96, 67], 0.10, rng);
    for (let x = 0; x < TILE; x++) {
      const h = 4 + ((rng() * 2) | 0);
      for (let y = 0; y < h; y++) {
        const n = (rng() - 0.5) * 0.06;
        ctx.fillStyle = `rgb(${clamp(248*(1+n))},${clamp(250*(1+n))},${clamp(255*(1+n))})`;
        ctx.fillRect(x0 + x, y0 + y, 1, 1);
      }
    }
  },
  dirt(ctx, x0, y0, rng) {
    // Minecraft dirt: 134,96,67
    noisy(ctx, x0, y0, [134, 96, 67], 0.10, rng);
    // Scattered darker pixels
    for (let i = 0; i < 10; i++) {
      const x = (rng() * TILE) | 0, y = (rng() * TILE) | 0;
      ctx.fillStyle = rng() < 0.5 ? `rgb(110,78,52)` : `rgb(125,90,62)`;
      ctx.fillRect(x0 + x, y0 + y, 1, 1);
    }
    // A few slightly lighter specks
    for (let i = 0; i < 4; i++) {
      const x = (rng() * TILE) | 0, y = (rng() * TILE) | 0;
      ctx.fillStyle = `rgb(150,110,78)`;
      ctx.fillRect(x0 + x, y0 + y, 1, 1);
    }
  },
  stone(ctx, x0, y0, rng) {
    // Minecraft stone: 125,125,125 base with cracks
    noisy(ctx, x0, y0, [125, 125, 125], 0.08, rng);
    // Darker pixel noise for texture
    for (let i = 0; i < 20; i++) {
      const x = (rng() * TILE) | 0, y = (rng() * TILE) | 0;
      ctx.fillStyle = rng() < 0.6 ? `rgb(105,105,105)` : `rgb(140,140,140)`;
      ctx.fillRect(x0 + x, y0 + y, 1, 1);
    }
    // Crack lines (darker grey)
    for (let i = 0; i < 3; i++) {
      let x = (rng() * 14) | 0, y = (rng() * 14) | 0;
      ctx.fillStyle = `rgb(85,85,85)`;
      for (let j = 0; j < 4; j++) {
        ctx.fillRect(x0 + x, y0 + y, 1, 1);
        x += (rng() < 0.5 ? 1 : 0);
        y += (rng() < 0.6 ? 1 : -1);
        if (x > 15 || y < 0 || y > 15) break;
      }
    }
  },
  cobblestone(ctx, x0, y0, rng) {
    // Minecraft cobblestone: irregular grey stone chunks with dark mortar
    noisy(ctx, x0, y0, [122, 122, 122], 0.12, rng);
    // Mortar lines (dark grey grid)
    ctx.fillStyle = `rgb(65,65,65)`;
    // Irregular mortar lines
    for (let y = 0; y < TILE; y += 3 + (rng() * 2 | 0)) {
      ctx.fillRect(x0, y0 + y, TILE, 1);
    }
    for (let x = 0; x < TILE; x += 3 + (rng() * 3 | 0)) {
      ctx.fillRect(x0 + x, y0, 1, TILE);
    }
    // Lighter stone highlights on chunks
    for (let i = 0; i < 12; i++) {
      const x = (rng() * 14) | 0, y = (rng() * 14) | 0;
      ctx.fillStyle = `rgb(140,140,140)`;
      ctx.fillRect(x0 + x, y0 + y, 2, 2);
    }
  },
  wood_top(ctx, x0, y0, rng) {
    // Minecraft oak log top
    noisy(ctx, x0, y0, [156, 120, 72], 0.06, rng);
    // Outer bark ring
    ctx.strokeStyle = `rgba(100,75,45,0.7)`;
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(x0 + 8, y0 + 8, 7, 0, Math.PI * 2); ctx.stroke();
    // Inner rings
    ctx.strokeStyle = `rgba(130,98,58,0.5)`;
    for (let r = 5; r > 0; r -= 2) {
      ctx.beginPath(); ctx.arc(x0 + 8, y0 + 8, r, 0, Math.PI * 2); ctx.stroke();
    }
    // Center dot
    ctx.fillStyle = `rgb(120,90,55)`;
    ctx.fillRect(x0 + 7, y0 + 7, 2, 2);
  },
  wood_side(ctx, x0, y0, rng) {
    // Minecraft oak bark: dark brown with vertical grain
    noisy(ctx, x0, y0, [109, 84, 52], 0.06, rng);
    // Vertical bark grain lines
    for (let x = 0; x < TILE; x++) {
      if (rng() < 0.3) {
        ctx.fillStyle = `rgba(85,62,38,0.5)`;
        const h = 4 + (rng() * 8 | 0);
        const y = (rng() * (TILE - h)) | 0;
        ctx.fillRect(x0 + x, y0 + y, 1, h);
      }
    }
    // Horizontal bark ridges
    for (let i = 0; i < 3; i++) {
      const y = (rng() * 12 + 2) | 0;
      ctx.fillStyle = `rgba(80,60,35,0.4)`;
      ctx.fillRect(x0, y0 + y, TILE, 1);
    }
  },
  leaves(ctx, x0, y0, rng) {
    // Minecraft leaves: bright green with depth
    noisy(ctx, x0, y0, [58, 120, 32], 0.18, rng);
    // Darker leaf clumps
    for (let i = 0; i < 16; i++) {
      const x = (rng() * TILE) | 0, y = (rng() * TILE) | 0;
      ctx.fillStyle = rng() < 0.5 ? `rgb(42,95,22)` : `rgb(72,140,42)`;
      ctx.fillRect(x0 + x, y0 + y, 1 + (rng() * 1 | 0), 1);
    }
    // A few bright spots (light filtering through)
    for (let i = 0; i < 6; i++) {
      const x = (rng() * TILE) | 0, y = (rng() * TILE) | 0;
      ctx.fillStyle = `rgb(90,165,55)`;
      ctx.fillRect(x0 + x, y0 + y, 1, 1);
    }
  },
  sand(ctx, x0, y0, rng) {
    // Minecraft sand: 219,211,160
    noisy(ctx, x0, y0, [219, 211, 160], 0.06, rng);
    // Lighter specks
    for (let i = 0; i < 8; i++) {
      const x = (rng() * TILE) | 0, y = (rng() * TILE) | 0;
      ctx.fillStyle = rng() < 0.5 ? `rgb(230,222,172)` : `rgb(205,197,148)`;
      ctx.fillRect(x0 + x, y0 + y, 1, 1);
    }
  },
  red_sand(ctx, x0, y0, rng) {
    noisy(ctx, x0, y0, [191, 110, 64], 0.08, rng);
  },
  water(ctx, x0, y0, rng) {
    // Minecraft water blue: 47,98,188 with wave highlights
    noisy(ctx, x0, y0, [47, 98, 188], 0.06, rng);
    // Horizontal wave highlights
    for (let y = 2; y < TILE; y += 4) {
      ctx.fillStyle = `rgba(100,150,230,0.3)`;
      ctx.fillRect(x0, y0 + y, TILE, 1);
    }
    // Lighter blue ripples
    for (let i = 0; i < 4; i++) {
      const x = (rng() * 12) | 0, y = (rng() * TILE) | 0;
      ctx.fillStyle = `rgba(80,130,210,0.4)`;
      ctx.fillRect(x0 + x, y0 + y, 3, 1);
    }
  },
  bedrock(ctx, x0, y0, rng) {
    noisy(ctx, x0, y0, [85, 85, 85], 0.25, rng);
    for (let i = 0; i < 10; i++) { ctx.fillStyle = `rgb(40,40,40)`; ctx.fillRect(x0 + (rng()*16|0), y0 + (rng()*16|0), 2, 2); }
  },
  planks(ctx, x0, y0, rng) {
    noisy(ctx, x0, y0, [160, 130, 80], 0.06, rng);
    ctx.fillStyle = `rgba(110,86,52,0.8)`;
    for (let y = 0; y < TILE; y += 4) ctx.fillRect(x0, y0 + y, TILE, 1);     // plank seams
    for (let y = 0; y < TILE; y += 4) {                                      // staggered nail line
      const x = (y / 4) % 2 ? 4 : 12;
      ctx.fillStyle = `rgba(90,70,40,0.9)`; ctx.fillRect(x0 + x, y0 + y + 1, 1, 1);
    }
  },
  coal_ore(ctx, x0, y0, rng) { ore(ctx, x0, y0, rng, [35, 35, 35]); },
  iron_ore(ctx, x0, y0, rng) { ore(ctx, x0, y0, rng, [196, 168, 132]); },
  gold_ore(ctx, x0, y0, rng) { ore(ctx, x0, y0, rng, [232, 201, 60]); },
  diamond_ore(ctx, x0, y0, rng) { ore(ctx, x0, y0, rng, [99, 220, 206]); },
  snow(ctx, x0, y0, rng) {
    noisy(ctx, x0, y0, [244, 246, 250], 0.05, rng);
  },
  glass(ctx, x0, y0, rng) {
    // Clear center with visible border (Minecraft style)
    ctx.clearRect(x0, y0, TILE, TILE);
    ctx.fillStyle = `rgba(180,210,225,0.12)`;
    ctx.fillRect(x0, y0, TILE, TILE);
    // Border (2px thick)
    ctx.fillStyle = `rgba(200,220,230,0.85)`;
    ctx.fillRect(x0, y0, TILE, 2);
    ctx.fillRect(x0, y0 + TILE - 2, TILE, 2);
    ctx.fillRect(x0, y0, 2, TILE);
    ctx.fillRect(x0 + TILE - 2, y0, 2, TILE);
    // Corner bevels
    ctx.fillStyle = `rgba(230,245,255,0.7)`;
    ctx.fillRect(x0, y0, 4, 1);
    ctx.fillRect(x0, y0, 1, 4);
    // Shine highlight
    ctx.fillStyle = `rgba(255,255,255,0.5)`;
    ctx.fillRect(x0 + 2, y0 + 2, 5, 1);
    ctx.fillRect(x0 + 2, y0 + 2, 1, 5);
  },
  brick(ctx, x0, y0, rng) {
    noisy(ctx, x0, y0, [150, 60, 48], 0.05, rng);
    ctx.fillStyle = `rgba(200,200,195,0.9)`;
    for (let y = 0; y < TILE; y += 4) ctx.fillRect(x0, y0 + y, TILE, 1);
    for (let y = 0; y < TILE; y += 4) {
      const off = (y / 4) % 2 ? 8 : 0;
      for (let x = off; x < TILE; x += 8) ctx.fillRect(x0 + x, y0 + y, 1, 4);
    }
  },
  brick_top(ctx, x0, y0, rng) { noisy(ctx, x0, y0, [150, 60, 48], 0.05, rng); },
  gravel(ctx, x0, y0, rng) {
    noisy(ctx, x0, y0, [128, 120, 116], 0.20, rng);
    for (let i = 0; i < 18; i++) { ctx.fillStyle = rng() < .5 ? `#6f6764` : `#a59d99`; ctx.fillRect(x0 + (rng()*16|0), y0 + (rng()*16|0), 2, 2); }
  },
  clay(ctx, x0, y0, rng) { noisy(ctx, x0, y0, [160, 166, 176], 0.04, rng); },
  pumpkin_top(ctx, x0, y0, rng) { noisy(ctx, x0, y0, [200, 122, 40], 0.06, rng); ctx.fillStyle = `#6b4a22`; ctx.fillRect(x0 + 6, y0 + 6, 4, 4); },
  pumpkin_side(ctx, x0, y0, rng) {
    noisy(ctx, x0, y0, [206, 130, 44], 0.06, rng);
    for (let x = 1; x < TILE; x += 4) { ctx.fillStyle = `rgba(160,95,30,0.6)`; ctx.fillRect(x0 + x, y0, 1, TILE); }
  },
  pumpkin_front(ctx, x0, y0, rng) {
    noisy(ctx, x0, y0, [206, 130, 44], 0.06, rng);
    ctx.fillStyle = `#3a2410`; // eyes + mouth
    ctx.fillRect(x0 + 3, y0 + 4, 3, 3); ctx.fillRect(x0 + 10, y0 + 4, 3, 3);
    ctx.fillRect(x0 + 4, y0 + 10, 8, 2); ctx.fillRect(x0 + 5, y0 + 12, 6, 1);
  },
  cactus_top(ctx, x0, y0, rng) { noisy(ctx, x0, y0, [70, 130, 60], 0.07, rng); ctx.fillStyle = `#3c6e34`; ctx.fillRect(x0 + 6, y0 + 6, 4, 4); },
  cactus_side(ctx, x0, y0, rng) {
    noisy(ctx, x0, y0, [74, 138, 64], 0.07, rng);
    ctx.fillStyle = `rgba(50,90,40,0.7)`; ctx.fillRect(x0, y0, 1, TILE); ctx.fillRect(x0 + 15, y0, 1, TILE);
  },
  flower_red(ctx, x0, y0, rng) { flower(ctx, x0, y0, rng, '#d83838', '#3a7d2c'); },
  flower_yellow(ctx, x0, y0, rng) { flower(ctx, x0, y0, rng, '#f0d020', '#3a7d2c'); },
  bookshelf_top(ctx, x0, y0, rng) { noisy(ctx, x0, y0, [160, 130, 80], 0.06, rng); },
  bookshelf_side(ctx, x0, y0, rng) {
    noisy(ctx, x0, y0, [120, 85, 50], 0.05, rng); // shelf back
    const cols = ['#7a2a2a', '#2a4a7a', '#2a7a3a', '#7a7a2a', '#5a2a7a', '#7a4a2a'];
    for (let row = 0; row < 2; row++) {
      const y0b = y0 + 1 + row * 8;
      for (let x = 0; x < 4; x++) {
        const c = cols[(rng() * cols.length) | 0];
        ctx.fillStyle = c;
        ctx.fillRect(x0 + 1 + x * 4 - (x > 0 ? 0.5 : 0), y0b, 3, 6);
      }
    }
  },
  obsidian(ctx, x0, y0, rng) {
    noisy(ctx, x0, y0, [30, 24, 44], 0.18, rng);
    for (let i = 0; i < 6; i++) { ctx.fillStyle = `rgba(120,90,180,0.5)`; ctx.fillRect(x0 + (rng()*16|0), y0 + (rng()*16|0), 1, 1); }
  },
  tnt_top(ctx, x0, y0, rng) { noisy(ctx, x0, y0, [180, 40, 40], 0.06, rng); ctx.fillStyle = `#4a4a4a`; ctx.fillRect(x0 + 5, y0 + 5, 6, 6); ctx.fillStyle = `#fff`; ctx.font = '6px monospace'; ctx.fillText('TNT', x0 + 2, y0 + 11); },
  tnt_side(ctx, x0, y0, rng) { noisy(ctx, x0, y0, [190, 44, 44], 0.06, rng); ctx.fillStyle = `#f5f5f5`; for (let i = 0; i < 3; i++) ctx.fillText('TNT', x0 + 1, y0 + 5 + i * 5); ctx.font = '5px monospace'; },
  tnt_bottom(ctx, x0, y0, rng) { noisy(ctx, x0, y0, [90, 28, 28], 0.06, rng); },
  crafting_top(ctx, x0, y0, rng) {
    // Wood plank base
    noisy(ctx, x0, y0, [140, 100, 60], 0.04, rng);
    // Plank lines
    ctx.fillStyle = '#7a5a30';
    for (let i = 0; i < 16; i += 4) ctx.fillRect(x0, y0 + i, 16, 1);
    for (let i = 0; i < 16; i += 8) { ctx.fillRect(x0 + i, y0, 1, 16); }
    // 3x3 crafting grid in center
    ctx.strokeStyle = '#3a2510'; ctx.lineWidth = 1;
    ctx.strokeRect(x0 + 3.5, y0 + 3.5, 9, 9);
    ctx.beginPath();
    ctx.moveTo(x0 + 6.5, y0 + 3.5); ctx.lineTo(x0 + 6.5, y0 + 12.5);
    ctx.moveTo(x0 + 9.5, y0 + 3.5); ctx.lineTo(x0 + 9.5, y0 + 12.5);
    ctx.moveTo(x0 + 3.5, y0 + 6.5); ctx.lineTo(x0 + 12.5, y0 + 6.5);
    ctx.moveTo(x0 + 3.5, y0 + 9.5); ctx.lineTo(x0 + 12.5, y0 + 9.5);
    ctx.stroke();
    // Dark border
    ctx.strokeStyle = '#2a1a08'; ctx.lineWidth = 0.5;
    ctx.strokeRect(x0 + 0.5, y0 + 0.5, 15, 15);
  },
  crafting_side(ctx, x0, y0, rng) {
    noisy(ctx, x0, y0, [130, 92, 55], 0.04, rng);
    // Plank lines
    ctx.fillStyle = '#7a5a30';
    for (let i = 0; i < 16; i += 4) ctx.fillRect(x0, y0 + i, 16, 1);
    // Tool icons: saw + hammer
    ctx.fillStyle = '#2a1a08';
    ctx.fillRect(x0 + 2, y0 + 5, 4, 1);
    ctx.fillRect(x0 + 2, y0 + 4, 1, 3);
    ctx.fillRect(x0 + 6, y0 + 8, 2, 4);
    ctx.fillRect(x0 + 5, y0 + 8, 4, 2);
    ctx.fillStyle = '#888';
    ctx.fillRect(x0 + 10, y0 + 4, 3, 3);
    ctx.fillStyle = '#654';
    ctx.fillRect(x0 + 11, y0 + 7, 1, 4);
    // Dark border
    ctx.strokeStyle = '#2a1a08'; ctx.lineWidth = 0.5;
    ctx.strokeRect(x0 + 0.5, y0 + 0.5, 15, 15);
  },
  netherrack(ctx, x0, y0, rng) { noisy(ctx, x0, y0, [110, 40, 40], 0.20, rng); for (let i = 0; i < 5; i++) { ctx.fillStyle = `#5a1818`; ctx.fillRect(x0 + (rng()*16|0), y0 + (rng()*16|0), 2, 2); } },
  terracotta(ctx, x0, y0, rng) { noisy(ctx, x0, y0, [150, 90, 70], 0.05, rng); ctx.strokeStyle = `rgba(120,60,40,0.6)`; for (let i = 0; i <= 4; i += 2) { ctx.strokeRect(x0 + i, y0 + i, 16 - i * 2, 16 - i * 2); } },
  furnace_top(ctx, x0, y0, rng) { noisy(ctx, x0, y0, [110, 110, 110], 0.06, rng); ctx.fillStyle = '#666'; ctx.fillRect(x0 + 2, y0 + 2, 12, 12); ctx.fillStyle = '#888'; ctx.fillRect(x0 + 3, y0 + 3, 10, 10); ctx.fillStyle = '#555'; ctx.fillRect(x0 + 5, y0 + 5, 6, 6); },
  furnace_side(ctx, x0, y0, rng) { noisy(ctx, x0, y0, [110, 110, 110], 0.06, rng); ctx.fillStyle = '#555'; ctx.fillRect(x0 + 1, y0 + 1, 14, 14); ctx.fillStyle = '#777'; ctx.fillRect(x0 + 2, y0 + 2, 12, 12); ctx.fillStyle = '#888'; ctx.fillRect(x0 + 2, y0 + 2, 12, 1); ctx.fillRect(x0 + 2, y0 + 2, 1, 12); ctx.fillStyle = '#666'; ctx.fillRect(x0 + 2, y0 + 13, 12, 1); ctx.fillRect(x0 + 13, y0 + 2, 1, 12); },
  furnace_front(ctx, x0, y0, rng) { noisy(ctx, x0, y0, [110, 110, 110], 0.06, rng); ctx.fillStyle = '#555'; ctx.fillRect(x0 + 1, y0 + 1, 14, 14); ctx.fillStyle = '#777'; ctx.fillRect(x0 + 2, y0 + 2, 12, 12); ctx.fillStyle = '#444'; ctx.fillRect(x0 + 4, y0 + 4, 8, 7); ctx.fillStyle = '#333'; ctx.fillRect(x0 + 5, y0 + 5, 6, 5); ctx.fillStyle = '#666'; ctx.fillRect(x0 + 5, y0 + 12, 6, 2); ctx.fillStyle = '#555'; ctx.fillRect(x0 + 6, y0 + 13, 4, 1); },
  podzol_top(ctx, x0, y0, rng) { noisy(ctx, x0, y0, [90, 65, 35], 0.12, rng); ctx.fillStyle = '#4a7a30'; for (let i = 0; i < 12; i++) { ctx.fillRect(x0 + (rng()*16|0), y0 + (rng()*16|0), 2, 1); } ctx.fillStyle = '#3a2815'; for (let i = 0; i < 8; i++) { ctx.fillRect(x0 + (rng()*16|0), y0 + (rng()*16|0), 2, 2); } },
  podzol_side(ctx, x0, y0, rng) { noisy(ctx, x0, y0, [90, 65, 35], 0.08, rng); ctx.fillStyle = '#5a3a1a'; ctx.fillRect(x0, y0, 16, 3); ctx.fillStyle = '#6b4c33'; for (let i = 0; i < 6; i++) { ctx.fillRect(x0 + (rng()*16|0), y0 + (rng()*14|0), 2, 2); } },
  mycelium_top(ctx, x0, y0, rng) { noisy(ctx, x0, y0, [130, 110, 130], 0.10, rng); ctx.fillStyle = '#b09ab0'; for (let i = 0; i < 10; i++) { ctx.fillRect(x0 + (rng()*16|0), y0 + (rng()*16|0), 1, 1); } ctx.fillStyle = '#9080a0'; for (let i = 0; i < 6; i++) { ctx.fillRect(x0 + (rng()*16|0), y0 + (rng()*16|0), 2, 2); } },
  mycelium_side(ctx, x0, y0, rng) { noisy(ctx, x0, y0, [90, 65, 35], 0.08, rng); ctx.fillStyle = '#b09ab0'; ctx.fillRect(x0, y0, 16, 3); ctx.fillStyle = '#9080a0'; for (let i = 0; i < 4; i++) { ctx.fillRect(x0 + (rng()*16|0), y0 + (rng()*14|0), 2, 1); } },
  jungle_wood_top(ctx, x0, y0, rng) { noisy(ctx, x0, y0, [100, 75, 40], 0.08, rng); ctx.fillStyle = '#6a5028'; ctx.fillRect(x0 + 4, y0 + 4, 8, 8); ctx.fillStyle = '#8a6a38'; for (let i = 0; i < 4; i++) { ctx.fillRect(x0 + 5 + (rng()*6|0), y0 + 5 + (rng()*6|0), 2, 2); } },
  jungle_wood_side(ctx, x0, y0, rng) { noisy(ctx, x0, y0, [95, 70, 35], 0.10, rng); ctx.fillStyle = '#6a5028'; for (let y = 0; y < 16; y += 3) { ctx.fillRect(x0, y0 + y, 16, 1); } ctx.fillStyle = '#8a6a38'; for (let i = 0; i < 4; i++) { ctx.fillRect(x0 + (rng()*16|0), y0 + (rng()*16|0), 1, 2); } },
  dark_leaves(ctx, x0, y0, rng) { noisy(ctx, x0, y0, [35, 60, 25], 0.15, rng); ctx.fillStyle = '#2a5018'; for (let i = 0; i < 10; i++) { ctx.fillRect(x0 + (rng()*16|0), y0 + (rng()*16|0), 2, 2); } ctx.fillStyle = '#4a8a34'; for (let i = 0; i < 6; i++) { ctx.fillRect(x0 + (rng()*16|0), y0 + (rng()*16|0), 1, 1); } },
  snow_block(ctx, x0, y0, rng) { noisy(ctx, x0, y0, [240, 245, 255], 0.03, rng); ctx.fillStyle = '#e8eef8'; for (let i = 0; i < 8; i++) { ctx.fillRect(x0 + (rng()*16|0), y0 + (rng()*16|0), 1, 1); } },
};

function ore(ctx, x0, y0, rng, color) {
  noisy(ctx, x0, y0, [128, 128, 128], 0.08, rng); // stone base
  for (let i = 0; i < 7; i++) {
    const x = 1 + ((rng() * 13) | 0), y = 1 + ((rng() * 13) | 0);
    ctx.fillStyle = `rgb(${clamp(color[0])},${clamp(color[1])},${clamp(color[2])})`;
    ctx.fillRect(x0 + x, y0 + y, 2, 2);
    ctx.fillStyle = `rgba(255,255,255,0.4)`; ctx.fillRect(x0 + x, y0 + y, 1, 1);
  }
}

function flower(ctx, x0, y0, rng, petal, stem) {
  ctx.clearRect(x0, y0, TILE, TILE);
  // Stem: straight center line going up from bottom
  ctx.fillStyle = stem;
  ctx.fillRect(x0 + 7, y0 + 7, 2, 9);
  // Small leaf on stem
  ctx.fillRect(x0 + 5, y0 + 11, 2, 1);
  ctx.fillRect(x0 + 10, y0 + 13, 2, 1);
  // Petals: 4 around center (cross pattern, centered)
  ctx.fillStyle = petal;
  ctx.fillRect(x0 + 6, y0 + 2, 4, 4);  // top
  ctx.fillRect(x0 + 6, y0 + 8, 4, 2);  // bottom
  ctx.fillRect(x0 + 3, y0 + 4, 3, 4);  // left
  ctx.fillRect(x0 + 10, y0 + 4, 3, 4); // right
  // Center
  ctx.fillStyle = `#fff3a0`;
  ctx.fillRect(x0 + 6, y0 + 5, 4, 3);
}

// --- atlas build -------------------------------------------------------------
export function buildAtlas(seed = 1337) {
  const canvas = document.createElement('canvas');
  canvas.width = ATLAS; canvas.height = ATLAS;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, ATLAS, ATLAS);

  for (const [name, [tx, ty]] of Object.entries(TILES)) {
    const rng = mulberry32(seed + tx * 131 + ty * 17 + name.length);
    const x0 = tx * TILE, y0 = ty * TILE;
    const painter = PAINTERS[name] || ((c, x, y) => noisy(c, x, y, [255, 0, 255], 0, rng));
    painter(ctx, x0, y0, rng);
  }

  return canvas;
}

// UV rect for a tile name (with a tiny inset to avoid bleeding between tiles).
export function tileUVRect(name) {
  const t = TILES[name];
  if (!t) return { u0: 0, v0: 0, u1: 1, v1: 1 };
  const [tx, ty] = t;
  const pad = 0.2 / ATLAS;
  return {
    u0: (tx * TILE) / ATLAS + pad,
    v0: 1 - ((ty + 1) * TILE) / ATLAS + pad, // flip Y (atlas rows go down, UV v goes up)
    u1: ((tx + 1) * TILE) / ATLAS - pad,
    v1: 1 - (ty * TILE) / ATLAS - pad,
  };
}

// Render a single block's "icon" (its side texture, or top for plants) for UI.
export function makeIcon(blockId, atlasCanvas) {
  const c = document.createElement('canvas');
  c.width = 16; c.height = 16;
  const ctx = c.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  const name = tileNameFor(blockId, 'side');
  const t = TILES[name];
  if (t) {
    ctx.drawImage(atlasCanvas, t[0] * 16, t[1] * 16, 16, 16, 0, 0, 16, 16);
  }
  return c;
}
