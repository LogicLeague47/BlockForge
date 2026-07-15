// Procedural pixel-art texture atlas.
//
// Generates a single 512x512 canvas (16x16 grid of 32x32 tiles) so the whole
// world can render with one material + one texture. Every tile is drawn with a
// small mulberry32 PRNG so textures are deterministic for a given seed and
// chunky/pixelated rather than blurry.
//
// Tiles are painted at native 32px resolution (4x the detail of the old 16px
// set), using layered passes: a per-pixel base fill, mottling patches, edge
// bevels/shadows, specular highlights and small decorative strokes — so each
// block reads as 3D and hand-textured instead of a flat colour.
//
// Public API:
//   buildAtlas(seed)            -> canvas (512x512)
//   makeIcon(blockId)           -> small canvas for hotbar icons
//   tileUVRect(name)            -> {u0,v0,u1,v1}
//   TILE                        -> pixels per tile (exported for atlas consumers)

import { TILES, tileNameFor } from './blocks.js';

export const TILE = 32;       // pixels per tile
const COLS = 16;              // tiles per row
const ROWS = 16;
const ATLAS = TILE * COLS;    // 512

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
function clamp(v) { return Math.max(0, Math.min(255, Math.round(v))); }

// Per-pixel "noise" so flat colors look textured (mimics Minecraft's per-texel variance).
function noisy(ctx, x0, y0, base, variance, rng, darkness = 1) {
  for (let y = 0; y < TILE; y++) {
    for (let x = 0; x < TILE; x++) {
      const n = (rng() - 0.5) * 2 * variance;
      const f = darkness * (1 + n);
      ctx.fillStyle = `rgb(${clamp(base[0] * f)},${clamp(base[1] * f)},${clamp(base[2] * f)})`;
      ctx.fillRect(x0 + x, y0 + y, 1, 1);
    }
  }
}

// Scatter `count` specks of the given pixel size, choosing colours randomly
// from `colors`. Used for pebbles, clumps, sparks, etc.
// Shared cobblestone body — used by cobblestone, mossy_cobblestone, and cobblestone_wall painters.
function _drawCobblestoneBody(ctx, x0, y0, rng) {
  noisy(ctx, x0, y0, [110, 110, 110], 0.06, rng);
  const stoneCount = 10 + (rng() * 5 | 0);
  for (let i = 0; i < stoneCount; i++) {
    const sx = (rng() * (TILE - 4)) | 0;
    const sy = (rng() * (TILE - 4)) | 0;
    const sw = 3 + (rng() * 5 | 0);
    const sh = 3 + (rng() * 4 | 0);
    const base = 130 + (rng() * 30 | 0);
    for (let py = 0; py < sh; py++) {
      for (let px = 0; px < sw; px++) {
        if (sx + px >= TILE || sy + py >= TILE) continue;
        const n = (rng() - 0.5) * 0.14;
        const edgeX = px === 0 ? 0.08 : px === sw - 1 ? -0.08 : 0;
        const edgeY = py === 0 ? 0.08 : py === sh - 1 ? -0.08 : 0;
        const s = 1 + n + edgeX + edgeY;
        const c = clamp(base * s);
        ctx.fillStyle = `rgb(${c},${c},${c})`;
        ctx.fillRect(x0 + sx + px, y0 + sy + py, 1, 1);
      }
    }
    ctx.fillStyle = 'rgba(70,70,70,0.5)';
    for (let px = 0; px < sw; px++) {
      if (sy + sh < TILE) ctx.fillRect(x0 + sx + px, y0 + sy + sh, 1, 1);
    }
    for (let py = 0; py < sh; py++) {
      if (sx + sw < TILE) ctx.fillRect(x0 + sx + sw, y0 + sy + py, 1, 1);
    }
  }
  for (let i = 0; i < 10; i++) {
    ctx.fillStyle = 'rgb(155,155,155)';
    ctx.fillRect(x0 + (rng() * TILE | 0), y0 + (rng() * TILE | 0), 1, 1);
  }
}

function speckle(ctx, x0, y0, rng, count, colors, w = 1, h = 1) {
  for (let i = 0; i < count; i++) {
    const x = (rng() * (TILE - w + 1)) | 0;
    const y = (rng() * (TILE - h + 1)) | 0;
    ctx.fillStyle = colors[(rng() * colors.length) | 0];
    ctx.fillRect(x0 + x, y0 + y, w, h);
  }
}

// --- individual tile painters ------------------------------------------------
const PAINTERS = {
  grass_top(ctx, x0, y0, rng) {
    // Meadow-green base with natural variation (Minecraft uses ~95,159,53).
    noisy(ctx, x0, y0, [95, 159, 53], 0.08, rng);
    // Larger darker-green mottling patches (tufts of thicker grass).
    for (let i = 0; i < 14; i++) {
      const x = (rng() * (TILE - 6)) | 0, y = (rng() * (TILE - 6)) | 0;
      ctx.fillStyle = 'rgba(70,120,38,0.45)';
      ctx.fillRect(x0 + x, y0 + y, 4 + (rng() * 3 | 0), 4 + (rng() * 3 | 0));
    }
    // Short grass blades (vertical strokes).
    for (let i = 0; i < 44; i++) {
      const x = (rng() * TILE) | 0, y = (rng() * TILE) | 0;
      const tall = 1 + (rng() * 3 | 0);
      ctx.fillStyle = rng() < 0.5 ? 'rgb(72,135,44)' : 'rgb(120,185,70)';
      ctx.fillRect(x0 + x, y0 + y, 1, tall);
    }
    // Bright sun-lit tips.
    for (let i = 0; i < 14; i++) {
      const x = (rng() * TILE) | 0, y = (rng() * TILE) | 0;
      ctx.fillStyle = 'rgb(150,205,90)';
      ctx.fillRect(x0 + x, y0 + y, 1, 1);
    }
  },

  grass_side(ctx, x0, y0, rng) {
    // Dirt body (Minecraft dirt: 134,96,67).
    noisy(ctx, x0, y0, [134, 96, 67], 0.08, rng);
    // Dirt pebbles below the grass line.
    for (let i = 0; i < 16; i++) {
      const x = (rng() * TILE) | 0, y = 8 + (rng() * (TILE - 8)) | 0;
      ctx.fillStyle = rng() < 0.5 ? 'rgb(104,72,48)' : 'rgb(150,110,78)';
      ctx.fillRect(x0 + x, y0 + y, 2, 2);
    }
    // Grassy overhang on top ~8px with a jagged, dripping blade edge.
    for (let x = 0; x < TILE; x++) {
      const h = 7 + ((rng() * 5) | 0); // 7..11
      for (let y = 0; y < h; y++) {
        const n = (rng() - 0.5) * 0.18;
        const g = (y < 3 ? 1.02 : 0.93) * (1 + n);
        ctx.fillStyle = `rgb(${clamp(95 * g)},${clamp(159 * g)},${clamp(53 * g)})`;
        ctx.fillRect(x0 + x, y0 + y, 1, 1);
      }
      // Occasional longer dripping blade.
      if (rng() < 0.3) {
        const d = 1 + (rng() * 3 | 0);
        ctx.fillStyle = 'rgb(72,130,42)';
        ctx.fillRect(x0 + x, y0 + h, 1, d);
      }
    }
    // Bright grass highlight along the very top edge.
    for (let x = 0; x < TILE; x++) {
      if (rng() < 0.5) { ctx.fillStyle = 'rgb(132,196,82)'; ctx.fillRect(x0 + x, y0, 1, 1); }
    }
  },

  snow_side(ctx, x0, y0, rng) {
    noisy(ctx, x0, y0, [134, 96, 67], 0.08, rng);
    for (let i = 0; i < 12; i++) {
      const x = (rng() * TILE) | 0, y = 9 + (rng() * (TILE - 9)) | 0;
      ctx.fillStyle = 'rgb(110,78,52)';
      ctx.fillRect(x0 + x, y0 + y, 2, 2);
    }
    // Smooth snow cap with a gentle wavy edge.
    for (let x = 0; x < TILE; x++) {
      const h = 8 + ((rng() * 4) | 0);
      for (let y = 0; y < h; y++) {
        const n = (rng() - 0.5) * 0.05;
        const f = 1 + n;
        ctx.fillStyle = `rgb(${clamp(248 * f)},${clamp(250 * f)},${clamp(255 * f)})`;
        ctx.fillRect(x0 + x, y0 + y, 1, 1);
      }
    }
    // Sparkle highlights on the snow surface.
    for (let i = 0; i < 10; i++) {
      const x = (rng() * TILE) | 0, y = (rng() * 8) | 0;
      ctx.fillStyle = 'rgb(255,255,255)';
      ctx.fillRect(x0 + x, y0 + y, 1, 1);
    }
  },

  dirt(ctx, x0, y0, rng) {
    noisy(ctx, x0, y0, [134, 96, 67], 0.09, rng);
    // Darker clods of varying size.
    for (let i = 0; i < 16; i++) {
      const x = (rng() * (TILE - 3)) | 0, y = (rng() * (TILE - 3)) | 0;
      ctx.fillStyle = rng() < 0.5 ? 'rgb(108,76,50)' : 'rgb(122,86,58)';
      ctx.fillRect(x0 + x, y0 + y, 2 + (rng() * 2 | 0), 2 + (rng() * 2 | 0));
    }
    // Small pale stones.
    for (let i = 0; i < 6; i++) {
      const x = (rng() * (TILE - 2)) | 0, y = (rng() * (TILE - 2)) | 0;
      ctx.fillStyle = 'rgb(120,118,112)';
      ctx.fillRect(x0 + x, y0 + y, 2, 2);
      ctx.fillStyle = 'rgb(152,150,144)';
      ctx.fillRect(x0 + x, y0 + y, 1, 1);
    }
    // Light dry specks.
    for (let i = 0; i < 8; i++) {
      const x = (rng() * TILE) | 0, y = (rng() * TILE) | 0;
      ctx.fillStyle = 'rgb(158,118,84)';
      ctx.fillRect(x0 + x, y0 + y, 1, 1);
    }
  },

  stone(ctx, x0, y0, rng) {
    noisy(ctx, x0, y0, [127, 127, 127], 0.07, rng);
    // Soft mottling patches (lighter + darker).
    for (let i = 0; i < 10; i++) {
      const x = (rng() * (TILE - 7)) | 0, y = (rng() * (TILE - 7)) | 0;
      ctx.fillStyle = rng() < 0.5 ? 'rgba(105,105,105,0.4)' : 'rgba(148,148,148,0.4)';
      ctx.fillRect(x0 + x, y0 + y, 5 + (rng() * 4 | 0), 5 + (rng() * 4 | 0));
    }
    // Fine dark/light speckle.
    for (let i = 0; i < 24; i++) {
      const x = (rng() * TILE) | 0, y = (rng() * TILE) | 0;
      ctx.fillStyle = rng() < 0.6 ? 'rgb(105,105,105)' : 'rgb(152,152,152)';
      ctx.fillRect(x0 + x, y0 + y, 1, 1);
    }
    // Wandering crack lines.
    for (let i = 0; i < 3; i++) {
      let x = (rng() * (TILE - 6)) | 0, y = (rng() * (TILE - 6)) | 0;
      ctx.fillStyle = 'rgb(85,85,85)';
      const len = 5 + (rng() * 6 | 0);
      for (let j = 0; j < len; j++) {
        ctx.fillRect(x0 + x, y0 + y, 1, 1);
        x += (rng() < 0.5 ? 1 : 0);
        y += (rng() < 0.6 ? 1 : (rng() < 0.5 ? -1 : 0));
        if (x > TILE - 1 || y < 0 || y > TILE - 1) break;
      }
    }
  },

  cobblestone(ctx, x0, y0, rng) {
    _drawCobblestoneBody(ctx, x0, y0, rng);
    // Dark specks in mortar gaps.
    for (let i = 0; i < 6; i++) {
      ctx.fillStyle = 'rgb(85,85,85)';
      ctx.fillRect(x0 + (rng() * TILE | 0), y0 + (rng() * TILE | 0), 1, 1);
    }
  },

  wood_top(ctx, x0, y0, rng) {
    // Minecraft oak log top: concentric growth rings.
    noisy(ctx, x0, y0, [156, 120, 72], 0.05, rng);
    const cx = TILE / 2, cy = TILE / 2;
    // Outer bark ring (dark).
    ctx.strokeStyle = 'rgb(95,72,42)';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(x0 + cx, y0 + cy, TILE / 2 - 1.5, 0, Math.PI * 2); ctx.stroke();
    // Inner rings.
    for (let r = TILE / 2 - 4; r > 1; r -= 3) {
      ctx.strokeStyle = `rgba(125,92,52,${0.5 + rng() * 0.2})`;
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(x0 + cx, y0 + cy, r, 0, Math.PI * 2); ctx.stroke();
    }
    // Pith (centre).
    ctx.fillStyle = 'rgb(120,90,55)';
    ctx.fillRect(x0 + cx - 1, y0 + cy - 1, 3, 3);
    ctx.fillStyle = 'rgb(95,70,40)';
    ctx.fillRect(x0 + cx, y0 + cy, 1, 1);
  },

  wood_side(ctx, x0, y0, rng) {
    // Minecraft oak bark: dark brown with strong vertical grain.
    noisy(ctx, x0, y0, [109, 84, 52], 0.05, rng);
    // Darker grain grooves running vertically.
    for (let x = 0; x < TILE; x++) {
      if (rng() < 0.35) {
        ctx.fillStyle = 'rgba(82,60,36,0.55)';
        const h = 8 + (rng() * 18 | 0);
        const y = (rng() * (TILE - h)) | 0;
        ctx.fillRect(x0 + x, y0 + y, 1, h);
      }
    }
    // Lighter raised bark ridges.
    for (let x = 0; x < TILE; x++) {
      if (rng() < 0.25) {
        ctx.fillStyle = 'rgba(140,108,66,0.5)';
        const h = 6 + (rng() * 12 | 0);
        const y = (rng() * (TILE - h)) | 0;
        ctx.fillRect(x0 + x, y0 + y, 1, h);
      }
    }
    // Horizontal bark ridge lines.
    for (let i = 0; i < 3; i++) {
      const y = 4 + (rng() * (TILE - 8)) | 0;
      ctx.fillStyle = 'rgba(76,56,33,0.4)';
      ctx.fillRect(x0, y0 + y, TILE, 1);
    }
    // Occasional knot.
    if (rng() < 0.6) {
      const kx = 6 + (rng() * (TILE - 12)) | 0, ky = 6 + (rng() * (TILE - 12)) | 0;
      ctx.fillStyle = 'rgb(70,52,30)';
      ctx.beginPath(); ctx.arc(x0 + kx, y0 + ky, 3, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'rgb(95,72,42)';
      ctx.beginPath(); ctx.arc(x0 + kx, y0 + ky, 1.5, 0, Math.PI * 2); ctx.fill();
    }
  },

  leaves(ctx, x0, y0, rng) {
    // Minecraft leaves: bright green with depth.
    noisy(ctx, x0, y0, [58, 120, 32], 0.14, rng);
    // Darker leaf clumps (inner shadow).
    for (let i = 0; i < 22; i++) {
      const x = (rng() * (TILE - 3)) | 0, y = (rng() * (TILE - 3)) | 0;
      ctx.fillStyle = rng() < 0.5 ? 'rgb(40,92,22)' : 'rgb(50,104,26)';
      ctx.fillRect(x0 + x, y0 + y, 2 + (rng() * 2 | 0), 2 + (rng() * 2 | 0));
    }
    // Mid-tone leaves.
    for (let i = 0; i < 18; i++) {
      const x = (rng() * TILE) | 0, y = (rng() * TILE) | 0;
      ctx.fillStyle = 'rgb(72,140,42)';
      ctx.fillRect(x0 + x, y0 + y, 1 + (rng() * 2 | 0), 1);
    }
    // Bright sun-lit edges (light filtering through).
    for (let i = 0; i < 14; i++) {
      const x = (rng() * TILE) | 0, y = (rng() * TILE) | 0;
      ctx.fillStyle = 'rgb(112,188,62)';
      ctx.fillRect(x0 + x, y0 + y, 1, 1);
    }
    // A few darker gaps (holes between leaves).
    for (let i = 0; i < 3; i++) {
      const x = (rng() * (TILE - 2)) | 0, y = (rng() * (TILE - 2)) | 0;
      ctx.fillStyle = 'rgba(28,58,18,0.5)';
      ctx.fillRect(x0 + x, y0 + y, 2, 2);
    }
  },

  sand(ctx, x0, y0, rng) {
    // Minecraft sand: 219,211,160.
    noisy(ctx, x0, y0, [219, 211, 160], 0.05, rng);
    // Faint ripple bands.
    for (let y = 3; y < TILE; y += 6) {
      ctx.fillStyle = 'rgba(205,197,148,0.4)';
      ctx.fillRect(x0, y0 + y, TILE, 1);
    }
    speckle(ctx, x0, y0, rng, 18, ['rgb(232,224,174)', 'rgb(202,194,145)']);
    // A few pebbles / shell fragments.
    for (let i = 0; i < 4; i++) {
      const x = (rng() * (TILE - 2)) | 0, y = (rng() * (TILE - 2)) | 0;
      ctx.fillStyle = 'rgb(180,170,140)';
      ctx.fillRect(x0 + x, y0 + y, 2, 1);
      ctx.fillStyle = 'rgb(212,202,170)';
      ctx.fillRect(x0 + x, y0 + y, 1, 1);
    }
  },

  red_sand(ctx, x0, y0, rng) {
    noisy(ctx, x0, y0, [191, 110, 64], 0.07, rng);
    for (let y = 4; y < TILE; y += 6) {
      ctx.fillStyle = 'rgba(170,96,54,0.4)';
      ctx.fillRect(x0, y0 + y, TILE, 1);
    }
    speckle(ctx, x0, y0, rng, 16, ['rgb(206,122,72)', 'rgb(172,98,56)']);
  },

  water(ctx, x0, y0, rng) {
    // Minecraft water blue: 47,98,188 with wave highlights.
    noisy(ctx, x0, y0, [47, 98, 188], 0.05, rng);
    // Paired wave lines for a soft ripple feel.
    for (let y = 3; y < TILE; y += 5) {
      ctx.fillStyle = 'rgba(110,160,235,0.3)';
      ctx.fillRect(x0, y0 + y, TILE, 1);
      ctx.fillStyle = 'rgba(90,140,220,0.3)';
      ctx.fillRect(x0, y0 + y + 1, TILE, 1);
    }
    // Scattered ripple streaks.
    for (let i = 0; i < 8; i++) {
      const x = (rng() * (TILE - 6)) | 0, y = (rng() * TILE) | 0;
      ctx.fillStyle = 'rgba(122,172,242,0.4)';
      ctx.fillRect(x0 + x, y0 + y, 4 + (rng() * 4 | 0), 1);
    }
    // Foam sparkles.
    for (let i = 0; i < 6; i++) {
      const x = (rng() * TILE) | 0, y = (rng() * TILE) | 0;
      ctx.fillStyle = 'rgba(222,238,255,0.6)';
      ctx.fillRect(x0 + x, y0 + y, 1, 1);
    }
  },

  bedrock(ctx, x0, y0, rng) {
    noisy(ctx, x0, y0, [85, 85, 85], 0.2, rng);
    // Black chunks.
    for (let i = 0; i < 12; i++) {
      const x = (rng() * (TILE - 3)) | 0, y = (rng() * (TILE - 3)) | 0;
      ctx.fillStyle = 'rgb(38,38,38)';
      ctx.fillRect(x0 + x, y0 + y, 2 + (rng() * 2 | 0), 2 + (rng() * 2 | 0));
    }
    // Lighter grey chunks (mineral veins).
    for (let i = 0; i < 8; i++) {
      const x = (rng() * (TILE - 2)) | 0, y = (rng() * (TILE - 2)) | 0;
      ctx.fillStyle = 'rgb(130,130,130)';
      ctx.fillRect(x0 + x, y0 + y, 2, 2);
    }
    speckle(ctx, x0, y0, rng, 4, ['rgb(166,166,166)']);
  },

  planks(ctx, x0, y0, rng) {
    planksBody(ctx, x0, y0, rng);
    // Staggered nails at the seam of each plank.
    for (let y = 4; y < TILE; y += 8) {
      const row = (y / 8) | 0;
      const xOff = row % 2 ? 6 : TILE - 7;
      ctx.fillStyle = 'rgb(86,68,40)';
      ctx.fillRect(x0 + xOff, y0 + y, 2, 2);
      ctx.fillStyle = 'rgb(152,142,122)';
      ctx.fillRect(x0 + xOff, y0 + y, 1, 1);
    }
  },

  coal_ore(ctx, x0, y0, rng) { ore(ctx, x0, y0, rng, [35, 35, 35]); },
  iron_ore(ctx, x0, y0, rng) { ore(ctx, x0, y0, rng, [196, 168, 132]); },
  gold_ore(ctx, x0, y0, rng) { ore(ctx, x0, y0, rng, [232, 201, 60]); },
  diamond_ore(ctx, x0, y0, rng) { ore(ctx, x0, y0, rng, [99, 220, 206]); },

  snow(ctx, x0, y0, rng) {
    noisy(ctx, x0, y0, [244, 246, 250], 0.04, rng);
    // Bright sparkles.
    for (let i = 0; i < 14; i++) {
      const x = (rng() * TILE) | 0, y = (rng() * TILE) | 0;
      ctx.fillStyle = 'rgb(255,255,255)';
      ctx.fillRect(x0 + x, y0 + y, 1, 1);
    }
    // Faint shadow drifts.
    for (let i = 0; i < 6; i++) {
      const x = (rng() * (TILE - 3)) | 0, y = (rng() * (TILE - 3)) | 0;
      ctx.fillStyle = 'rgba(220,228,240,0.5)';
      ctx.fillRect(x0 + x, y0 + y, 3, 2);
    }
  },

  glass(ctx, x0, y0, rng) {
    // Clear centre with a visible bordered pane (Minecraft style).
    ctx.clearRect(x0, y0, TILE, TILE);
    ctx.fillStyle = 'rgba(180,210,225,0.10)';
    ctx.fillRect(x0, y0, TILE, TILE);
    // 2px border.
    ctx.fillStyle = 'rgba(200,220,230,0.85)';
    ctx.fillRect(x0, y0, TILE, 2);
    ctx.fillRect(x0, y0 + TILE - 2, TILE, 2);
    ctx.fillRect(x0, y0, 2, TILE);
    ctx.fillRect(x0 + TILE - 2, y0, 2, TILE);
    // Inner bevel highlight (top-left).
    ctx.fillStyle = 'rgba(236,248,255,0.7)';
    ctx.fillRect(x0 + 2, y0 + 2, TILE - 4, 1);
    ctx.fillRect(x0 + 2, y0 + 2, 1, TILE - 4);
    // Diagonal shine streak.
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.fillRect(x0 + 4, y0 + 4, 8, 1);
    ctx.fillRect(x0 + 4, y0 + 5, 6, 1);
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.fillRect(x0 + 5, y0 + 6, 4, 1);
  },

  brick(ctx, x0, y0, rng) {
    noisy(ctx, x0, y0, [150, 60, 48], 0.04, rng);
    // Mortar grid.
    ctx.fillStyle = 'rgba(210,208,200,0.92)';
    for (let y = 0; y < TILE; y += 8) ctx.fillRect(x0, y0 + y, TILE, 1);
    for (let y = 0; y < TILE; y += 8) {
      const off = ((y / 8) % 2) ? 16 : 0;
      for (let x = off; x < TILE; x += 16) ctx.fillRect(x0 + x, y0 + y, 1, 8);
    }
    // Per-brick top highlight + bottom shadow for a beveled look.
    for (let y = 0; y < TILE; y += 8) {
      ctx.fillStyle = 'rgba(182,82,64,0.5)';
      ctx.fillRect(x0, y0 + y + 1, TILE, 1);
      ctx.fillStyle = 'rgba(110,42,34,0.4)';
      ctx.fillRect(x0, y0 + y + 7, TILE, 1);
    }
    speckle(ctx, x0, y0, rng, 12, ['rgb(172,74,58)', 'rgb(130,50,40)']);
  },

  brick_top(ctx, x0, y0, rng) {
    noisy(ctx, x0, y0, [150, 60, 48], 0.04, rng);
    speckle(ctx, x0, y0, rng, 14, ['rgb(172,74,58)', 'rgb(130,50,40)']);
  },

  gravel(ctx, x0, y0, rng) {
    noisy(ctx, x0, y0, [128, 120, 116], 0.16, rng);
    // Pebbles of varied tone.
    for (let i = 0; i < 26; i++) {
      const x = (rng() * (TILE - 3)) | 0, y = (rng() * (TILE - 3)) | 0;
      const s = 2 + (rng() * 2 | 0);
      ctx.fillStyle = rng() < 0.5 ? 'rgb(110,102,98)' : 'rgb(150,142,138)';
      ctx.fillRect(x0 + x, y0 + y, s, s);
      ctx.fillStyle = 'rgba(180,174,170,0.6)';
      ctx.fillRect(x0 + x, y0 + y, 1, 1);
    }
    speckle(ctx, x0, y0, rng, 8, ['rgb(85,80,76)']);
  },

  clay(ctx, x0, y0, rng) {
    noisy(ctx, x0, y0, [160, 166, 176], 0.03, rng);
    // Faint drying cracks.
    for (let i = 0; i < 3; i++) {
      let x = (rng() * TILE) | 0, y = (rng() * TILE) | 0;
      ctx.fillStyle = 'rgba(140,146,158,0.5)';
      for (let j = 0; j < 6; j++) {
        ctx.fillRect(x0 + x, y0 + y, 1, 1);
        x += (rng() < 0.5 ? 1 : 0);
        y += (rng() < 0.5 ? 1 : -1);
        if (x > TILE - 1 || y < 0 || y > TILE - 1) break;
      }
    }
  },

  pumpkin_top(ctx, x0, y0, rng) {
    noisy(ctx, x0, y0, [200, 122, 40], 0.05, rng);
    // Ridges radiating from the stem.
    const cx = TILE / 2, cy = TILE / 2;
    ctx.strokeStyle = 'rgba(160,95,30,0.6)';
    ctx.lineWidth = 1;
    for (let a = 0; a < 8; a++) {
      const ang = (a / 8) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(x0 + cx, y0 + cy);
      ctx.lineTo(x0 + cx + Math.cos(ang) * (TILE / 2 - 2), y0 + cy + Math.sin(ang) * (TILE / 2 - 2));
      ctx.stroke();
    }
    // Stem.
    ctx.fillStyle = 'rgb(90,60,28)';
    ctx.fillRect(x0 + cx - 3, y0 + cy - 3, 6, 6);
    ctx.fillStyle = 'rgb(112,78,38)';
    ctx.fillRect(x0 + cx - 2, y0 + cy - 2, 4, 4);
  },

  pumpkin_side(ctx, x0, y0, rng) {
    noisy(ctx, x0, y0, [206, 130, 44], 0.05, rng);
    // Vertical ridges with shadow + highlight.
    for (let x = 2; x < TILE; x += 5) {
      ctx.fillStyle = 'rgba(160,95,30,0.6)';
      ctx.fillRect(x0 + x, y0, 2, TILE);
      ctx.fillStyle = 'rgba(226,156,72,0.4)';
      ctx.fillRect(x0 + x + 2, y0, 1, TILE);
    }
  },

  pumpkin_front(ctx, x0, y0, rng) {
    // Jack-o-lantern: ridged body + glowing carved face.
    noisy(ctx, x0, y0, [206, 130, 44], 0.05, rng);
    for (let x = 2; x < TILE; x += 5) {
      ctx.fillStyle = 'rgba(160,95,30,0.5)';
      ctx.fillRect(x0 + x, y0, 2, TILE);
    }
    ctx.fillStyle = 'rgb(255,180,30)';
    // Triangle eyes.
    ctx.fillRect(x0 + 5, y0 + 8, 6, 1);
    ctx.fillRect(x0 + 6, y0 + 9, 4, 1);
    ctx.fillRect(x0 + 7, y0 + 10, 2, 1);
    ctx.fillRect(x0 + 21, y0 + 8, 6, 1);
    ctx.fillRect(x0 + 22, y0 + 9, 4, 1);
    ctx.fillRect(x0 + 23, y0 + 10, 2, 1);
    // Jagged mouth.
    ctx.fillRect(x0 + 6, y0 + 20, 20, 1);
    ctx.fillRect(x0 + 6, y0 + 21, 3, 2);
    ctx.fillRect(x0 + 12, y0 + 21, 3, 2);
    ctx.fillRect(x0 + 18, y0 + 21, 3, 2);
    ctx.fillRect(x0 + 24, y0 + 21, 2, 2);
    // Inner brighter glow flecks.
    ctx.fillStyle = 'rgb(255,232,120)';
    ctx.fillRect(x0 + 7, y0 + 9, 1, 1);
    ctx.fillRect(x0 + 23, y0 + 9, 1, 1);
  },

  cactus_top(ctx, x0, y0, rng) {
    noisy(ctx, x0, y0, [70, 130, 60], 0.06, rng);
    // Dark outer rim.
    ctx.fillStyle = 'rgb(60,112,52)';
    ctx.fillRect(x0, y0, TILE, 2);
    ctx.fillRect(x0, y0 + TILE - 2, TILE, 2);
    ctx.fillRect(x0, y0, 2, TILE);
    ctx.fillRect(x0 + TILE - 2, y0, 2, TILE);
    // Pale inner flesh.
    ctx.fillStyle = 'rgba(96,166,82,0.6)';
    ctx.fillRect(x0 + 8, y0 + 8, TILE - 16, TILE - 16);
    // Pith.
    ctx.fillStyle = 'rgb(60,112,52)';
    ctx.fillRect(x0 + TILE / 2 - 2, y0 + TILE / 2 - 2, 4, 4);
  },

  cactus_side(ctx, x0, y0, rng) {
    noisy(ctx, x0, y0, [74, 138, 64], 0.06, rng);
    // Dark edge ribs.
    ctx.fillStyle = 'rgba(50,90,40,0.75)';
    ctx.fillRect(x0, y0, 2, TILE);
    ctx.fillRect(x0 + TILE - 2, y0, 2, TILE);
    // Vertical highlight ribs.
    for (let x = 6; x < TILE - 6; x += 6) {
      ctx.fillStyle = 'rgba(100,168,82,0.4)';
      ctx.fillRect(x0 + x, y0, 1, TILE);
    }
    // Areoles (white spine dots) up each edge.
    for (let y = 4; y < TILE; y += 6) {
      ctx.fillStyle = 'rgb(230,230,210)';
      ctx.fillRect(x0 + 2, y0 + y, 1, 1);
      ctx.fillRect(x0 + TILE - 3, y0 + y, 1, 1);
    }
  },

  flower_red(ctx, x0, y0, rng) { flower(ctx, x0, y0, rng, '#d83838', '#3a7d2c'); },
  flower_yellow(ctx, x0, y0, rng) { flower(ctx, x0, y0, rng, '#f0d020', '#3a7d2c'); },

  bookshelf_top(ctx, x0, y0, rng) { planksBody(ctx, x0, y0, rng); },

  bookshelf_side(ctx, x0, y0, rng) {
    // Plank back.
    planksBody(ctx, x0, y0, rng);
    // Top / middle / bottom shelf boards.
    ctx.fillStyle = 'rgb(90,68,40)';
    ctx.fillRect(x0, y0, TILE, 2);
    ctx.fillRect(x0, y0 + TILE / 2 - 1, TILE, 2);
    ctx.fillRect(x0, y0 + TILE - 2, TILE, 2);
    // Coloured books standing on the lower board of each compartment.
    const palette = ['#7a2a2a', '#2a4a7a', '#2a7a3a', '#7a7a2a', '#5a2a7a', '#7a4a2a', '#2a6a7a', '#6a2a5a'];
    function drawShelf(boardBottomY, topY) {
      let x = 2;
      while (x < TILE - 3) {
        const w = 2 + (rng() * 2 | 0);
        const maxH = boardBottomY - topY;
        const h = Math.min(maxH, 9 + (rng() * 3 | 0));
        ctx.fillStyle = palette[(rng() * palette.length) | 0];
        ctx.fillRect(x0 + x, y0 + boardBottomY - h, w, h);
        // Top page edge.
        ctx.fillStyle = 'rgba(240,235,220,0.85)';
        ctx.fillRect(x0 + x, y0 + boardBottomY - h, w, 1);
        // Spine highlight.
        ctx.fillStyle = 'rgba(255,255,255,0.15)';
        ctx.fillRect(x0 + x, y0 + boardBottomY - h + 1, 1, h - 1);
        x += w + 1;
      }
    }
    drawShelf(15, 2);
    drawShelf(30, 17);
  },

  obsidian(ctx, x0, y0, rng) {
    noisy(ctx, x0, y0, [30, 24, 44], 0.14, rng);
    // Glossy purple sheen streaks.
    for (let i = 0; i < 10; i++) {
      const x = (rng() * (TILE - 3)) | 0, y = (rng() * (TILE - 3)) | 0;
      ctx.fillStyle = 'rgba(120,90,180,0.45)';
      ctx.fillRect(x0 + x, y0 + y, 2 + (rng() * 2 | 0), 1);
    }
    // Bright specular flecks.
    for (let i = 0; i < 8; i++) {
      const x = (rng() * TILE) | 0, y = (rng() * TILE) | 0;
      ctx.fillStyle = 'rgba(172,142,222,0.6)';
      ctx.fillRect(x0 + x, y0 + y, 1, 1);
    }
    // Cracks.
    for (let i = 0; i < 2; i++) {
      let x = (rng() * (TILE - 6)) | 0, y = (rng() * (TILE - 6)) | 0;
      ctx.fillStyle = 'rgba(15,10,24,0.8)';
      for (let j = 0; j < 6; j++) {
        ctx.fillRect(x0 + x, y0 + y, 1, 1);
        x += (rng() < 0.5 ? 1 : 0);
        y += (rng() < 0.5 ? 1 : -1);
        if (x > TILE - 1 || y < 0 || y > TILE - 1) break;
      }
    }
  },

  tnt_top(ctx, x0, y0, rng) {
    noisy(ctx, x0, y0, [180, 40, 40], 0.05, rng);
    // Fuse disk in the centre.
    ctx.fillStyle = 'rgb(60,60,60)';
    ctx.beginPath(); ctx.arc(x0 + TILE / 2, y0 + TILE / 2, 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgb(92,92,92)';
    ctx.beginPath(); ctx.arc(x0 + TILE / 2, y0 + TILE / 2, 4, 0, Math.PI * 2); ctx.fill();
    // TNT label.
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 7px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('TNT', x0 + TILE / 2, y0 + TILE / 2 + 1);
    ctx.textAlign = 'start'; ctx.textBaseline = 'alphabetic';
  },

  tnt_side(ctx, x0, y0, rng) {
    noisy(ctx, x0, y0, [190, 44, 44], 0.05, rng);
    // White label band.
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(x0, y0 + 6, TILE, 10);
    ctx.fillStyle = '#000';
    ctx.font = 'bold 7px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('TNT', x0 + TILE / 2, y0 + 11);
    ctx.textAlign = 'start'; ctx.textBaseline = 'alphabetic';
    // Bottom shadow seam.
    ctx.fillStyle = 'rgba(140,28,28,0.6)';
    ctx.fillRect(x0, y0 + 16, TILE, 1);
  },

  tnt_bottom(ctx, x0, y0, rng) { noisy(ctx, x0, y0, [90, 28, 28], 0.05, rng); },

  crafting_top(ctx, x0, y0, rng) {
    planksBody(ctx, x0, y0, rng);
    // 3x3 crafting grid in the centre.
    ctx.strokeStyle = 'rgb(58,37,16)';
    ctx.lineWidth = 1;
    ctx.strokeRect(x0 + 6, y0 + 6, TILE - 12, TILE - 12);
    const inner = TILE - 12;
    ctx.beginPath();
    ctx.moveTo(x0 + 6 + inner / 3, y0 + 6); ctx.lineTo(x0 + 6 + inner / 3, y0 + TILE - 6);
    ctx.moveTo(x0 + 6 + 2 * inner / 3, y0 + 6); ctx.lineTo(x0 + 6 + 2 * inner / 3, y0 + TILE - 6);
    ctx.moveTo(x0 + 6, y0 + 6 + inner / 3); ctx.lineTo(x0 + TILE - 6, y0 + 6 + inner / 3);
    ctx.moveTo(x0 + 6, y0 + 6 + 2 * inner / 3); ctx.lineTo(x0 + TILE - 6, y0 + 6 + 2 * inner / 3);
    ctx.stroke();
    // Outer bevel border.
    ctx.strokeStyle = 'rgb(42,26,8)';
    ctx.strokeRect(x0 + 0.5, y0 + 0.5, TILE - 1, TILE - 1);
  },

  crafting_side(ctx, x0, y0, rng) {
    planksBody(ctx, x0, y0, rng);
    // Saw.
    ctx.fillStyle = 'rgb(42,26,8)';
    ctx.fillRect(x0 + 4, y0 + 12, 10, 2);          // blade back
    ctx.fillStyle = 'rgb(150,150,150)';
    ctx.fillRect(x0 + 4, y0 + 12, 10, 1);          // blade shine
    ctx.fillStyle = 'rgb(120,120,120)';
    for (let x = 4; x < 14; x += 2) ctx.fillRect(x0 + x, y0 + 14, 1, 1); // teeth
    ctx.fillStyle = 'rgb(100,72,40)';
    ctx.fillRect(x0 + 13, y0 + 10, 3, 4);          // handle
    // Hammer.
    ctx.fillStyle = 'rgb(90,90,90)';
    ctx.fillRect(x0 + 6, y0 + 4, 6, 3);
    ctx.fillStyle = 'rgb(122,122,122)';
    ctx.fillRect(x0 + 6, y0 + 4, 6, 1);
    ctx.fillStyle = 'rgb(100,72,40)';
    ctx.fillRect(x0 + 8, y0 + 7, 2, 6);            // handle
    // Border.
    ctx.strokeStyle = 'rgb(42,26,8)';
    ctx.lineWidth = 1;
    ctx.strokeRect(x0 + 0.5, y0 + 0.5, TILE - 1, TILE - 1);
  },

  netherrack(ctx, x0, y0, rng) {
    noisy(ctx, x0, y0, [110, 40, 40], 0.16, rng);
    // Dark porous pits.
    for (let i = 0; i < 10; i++) {
      const x = (rng() * (TILE - 3)) | 0, y = (rng() * (TILE - 3)) | 0;
      ctx.fillStyle = 'rgb(74,20,20)';
      ctx.fillRect(x0 + x, y0 + y, 2 + (rng() * 2 | 0), 2 + (rng() * 2 | 0));
    }
    // Glowing embers.
    speckle(ctx, x0, y0, rng, 5, ['rgb(192,72,50)']);
  },

  terracotta(ctx, x0, y0, rng) {
    noisy(ctx, x0, y0, [150, 90, 70], 0.04, rng);
    // Concentric diamond pattern.
    ctx.strokeStyle = 'rgba(120,60,40,0.6)';
    ctx.lineWidth = 1;
    for (let i = 2; i <= TILE / 2; i += 4) {
      ctx.beginPath();
      ctx.moveTo(x0 + TILE / 2, y0 + TILE / 2 - i);
      ctx.lineTo(x0 + TILE / 2 + i, y0 + TILE / 2);
      ctx.lineTo(x0 + TILE / 2, y0 + TILE / 2 + i);
      ctx.lineTo(x0 + TILE / 2 - i, y0 + TILE / 2);
      ctx.closePath();
      ctx.stroke();
    }
  },

  furnace_top(ctx, x0, y0, rng) {
    noisy(ctx, x0, y0, [110, 110, 110], 0.05, rng);
    // Stone rim.
    ctx.fillStyle = 'rgb(80,80,80)';
    ctx.fillRect(x0 + 2, y0 + 2, TILE - 4, TILE - 4);
    ctx.fillStyle = 'rgb(122,122,122)';
    ctx.fillRect(x0 + 3, y0 + 3, TILE - 6, TILE - 6);
    // Inner bowl.
    ctx.fillStyle = 'rgb(70,70,70)';
    ctx.fillRect(x0 + 6, y0 + 6, TILE - 12, TILE - 12);
  },

  furnace_side(ctx, x0, y0, rng) {
    noisy(ctx, x0, y0, [110, 110, 110], 0.05, rng);
    // Beveled stone frame.
    ctx.fillStyle = 'rgb(80,80,80)';
    ctx.fillRect(x0 + 1, y0 + 1, TILE - 2, TILE - 2);
    ctx.fillStyle = 'rgb(126,126,126)';
    ctx.fillRect(x0 + 2, y0 + 2, TILE - 4, TILE - 4);
    // Top-left highlight.
    ctx.fillStyle = 'rgb(142,142,142)';
    ctx.fillRect(x0 + 2, y0 + 2, TILE - 4, 1);
    ctx.fillRect(x0 + 2, y0 + 2, 1, TILE - 4);
    // Bottom-right shadow.
    ctx.fillStyle = 'rgb(95,95,95)';
    ctx.fillRect(x0 + 2, y0 + TILE - 3, TILE - 4, 1);
    ctx.fillRect(x0 + TILE - 3, y0 + 2, 1, TILE - 4);
  },

  furnace_front(ctx, x0, y0, rng) {
    noisy(ctx, x0, y0, [110, 110, 110], 0.05, rng);
    // Frame.
    ctx.fillStyle = 'rgb(80,80,80)';
    ctx.fillRect(x0 + 1, y0 + 1, TILE - 2, TILE - 2);
    ctx.fillStyle = 'rgb(126,126,126)';
    ctx.fillRect(x0 + 2, y0 + 2, TILE - 4, TILE - 4);
    // Dark furnace opening.
    ctx.fillStyle = 'rgb(40,40,40)';
    ctx.fillRect(x0 + 6, y0 + 8, TILE - 12, 12);
    // Fire glow at the bottom of the opening.
    ctx.fillStyle = 'rgb(255,140,30)';
    ctx.fillRect(x0 + 7, y0 + 17, TILE - 14, 2);
    ctx.fillStyle = 'rgb(255,202,82)';
    ctx.fillRect(x0 + 9, y0 + 18, TILE - 18, 1);
    // Frame top highlight.
    ctx.fillStyle = 'rgb(146,146,146)';
    ctx.fillRect(x0 + 2, y0 + 2, TILE - 4, 1);
  },

  podzol_top(ctx, x0, y0, rng) {
    // Dead-leaf / needle layer.
    noisy(ctx, x0, y0, [120, 88, 40], 0.1, rng);
    // Dark pine-needle clumps.
    for (let i = 0; i < 14; i++) {
      const x = (rng() * (TILE - 3)) | 0, y = (rng() * (TILE - 3)) | 0;
      ctx.fillStyle = 'rgb(60,90,40)';
      ctx.fillRect(x0 + x, y0 + y, 2 + (rng() * 2 | 0), 1);
    }
    // Twig bits.
    for (let i = 0; i < 8; i++) {
      const x = (rng() * (TILE - 2)) | 0, y = (rng() * (TILE - 2)) | 0;
      ctx.fillStyle = 'rgb(90,64,30)';
      ctx.fillRect(x0 + x, y0 + y, 2, 1);
    }
  },

  podzol_side(ctx, x0, y0, rng) {
    noisy(ctx, x0, y0, [120, 88, 40], 0.08, rng);
    // Top needle layer.
    ctx.fillStyle = 'rgb(70,100,46)';
    ctx.fillRect(x0, y0, TILE, 5);
    ctx.fillStyle = 'rgb(60,90,40)';
    for (let i = 0; i < 8; i++) ctx.fillRect(x0 + (rng() * TILE | 0), y0 + (rng() * 4 | 0), 2, 1);
    // Dirt body specks.
    for (let i = 0; i < 8; i++) {
      const x = (rng() * TILE | 0), y = 8 + (rng() * (TILE - 10) | 0);
      ctx.fillStyle = 'rgb(96,68,36)';
      ctx.fillRect(x0 + x, y0 + y, 2, 2);
    }
  },

  mycelium_top(ctx, x0, y0, rng) {
    noisy(ctx, x0, y0, [130, 110, 130], 0.08, rng);
    // Pale mushroom-soil speckle.
    ctx.fillStyle = 'rgb(178,156,178)';
    for (let i = 0; i < 14; i++) ctx.fillRect(x0 + (rng() * TILE | 0), y0 + (rng() * TILE | 0), 1, 1);
    ctx.fillStyle = 'rgb(144,128,160)';
    for (let i = 0; i < 10; i++) ctx.fillRect(x0 + (rng() * (TILE - 2) | 0), y0 + (rng() * (TILE - 2) | 0), 2, 2);
    // White mycelium threads.
    ctx.fillStyle = 'rgb(240,235,245)';
    for (let i = 0; i < 6; i++) {
      const x = (rng() * (TILE - 1) | 0), y = (rng() * TILE | 0);
      ctx.fillRect(x0 + x, y0 + y, 2, 1);
    }
    // A tiny red mushroom cap.
    if (rng() < 0.7) {
      const mx = 6 + (rng() * (TILE - 12) | 0), my = 6 + (rng() * (TILE - 12) | 0);
      ctx.fillStyle = 'rgb(190,60,50)';
      ctx.fillRect(x0 + mx, y0 + my, 4, 2);
      ctx.fillRect(x0 + mx + 1, y0 + my - 1, 2, 1);
      ctx.fillStyle = 'rgb(240,235,225)';
      ctx.fillRect(x0 + mx + 1, y0 + my, 1, 1);
      ctx.fillRect(x0 + mx + 3, y0 + my + 1, 1, 1);
    }
  },

  mycelium_side(ctx, x0, y0, rng) {
    noisy(ctx, x0, y0, [134, 96, 67], 0.07, rng);
    // Mycelium top layer.
    ctx.fillStyle = 'rgb(178,156,178)';
    ctx.fillRect(x0, y0, TILE, 5);
    ctx.fillStyle = 'rgb(144,128,160)';
    for (let i = 0; i < 6; i++) ctx.fillRect(x0 + (rng() * TILE | 0), y0 + (rng() * 4 | 0), 2, 1);
    // White threads dripping down.
    ctx.fillStyle = 'rgb(240,235,245)';
    for (let i = 0; i < 5; i++) ctx.fillRect(x0 + (rng() * TILE | 0), y0 + 5 + (rng() * 4 | 0), 1, 1);
  },

  jungle_wood_top(ctx, x0, y0, rng) {
    noisy(ctx, x0, y0, [100, 75, 40], 0.06, rng);
    const cx = TILE / 2, cy = TILE / 2;
    ctx.strokeStyle = 'rgb(70,52,26)';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(x0 + cx, y0 + cy, TILE / 2 - 2, 0, Math.PI * 2); ctx.stroke();
    for (let r = TILE / 2 - 5; r > 1; r -= 3) {
      ctx.strokeStyle = 'rgba(85,62,32,0.5)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(x0 + cx, y0 + cy, r, 0, Math.PI * 2); ctx.stroke();
    }
    ctx.fillStyle = 'rgb(70,52,26)';
    ctx.fillRect(x0 + cx - 1, y0 + cy - 1, 3, 3);
  },

  jungle_wood_side(ctx, x0, y0, rng) {
    noisy(ctx, x0, y0, [95, 70, 35], 0.08, rng);
    // Jungle bark is strongly horizontally banded.
    ctx.fillStyle = 'rgba(70,52,26,0.5)';
    for (let y = 0; y < TILE; y += 4) ctx.fillRect(x0, y0 + y, TILE, 1);
    // Vertical specks.
    ctx.fillStyle = 'rgba(120,92,50,0.4)';
    for (let i = 0; i < 10; i++) {
      const x = (rng() * TILE | 0), y = (rng() * TILE | 0);
      ctx.fillRect(x0 + x, y0 + y, 1, 2);
    }
  },

  dark_leaves(ctx, x0, y0, rng) {
    noisy(ctx, x0, y0, [35, 60, 25], 0.13, rng);
    for (let i = 0; i < 16; i++) {
      const x = (rng() * (TILE - 3)) | 0, y = (rng() * (TILE - 3)) | 0;
      ctx.fillStyle = 'rgb(28,50,20)';
      ctx.fillRect(x0 + x, y0 + y, 2 + (rng() * 2 | 0), 2 + (rng() * 2 | 0));
    }
    for (let i = 0; i < 10; i++) {
      const x = (rng() * TILE) | 0, y = (rng() * TILE) | 0;
      ctx.fillStyle = 'rgb(60,105,40)';
      ctx.fillRect(x0 + x, y0 + y, 1, 1);
    }
    speckle(ctx, x0, y0, rng, 4, ['rgb(90,150,55)']);
  },

  snow_block(ctx, x0, y0, rng) {
    noisy(ctx, x0, y0, [240, 245, 255], 0.03, rng);
    for (let i = 0; i < 12; i++) {
      ctx.fillStyle = 'rgb(228,236,250)';
      ctx.fillRect(x0 + (rng() * TILE | 0), y0 + (rng() * TILE | 0), 1, 1);
    }
    // Sparkle.
    speckle(ctx, x0, y0, rng, 8, ['rgb(255,255,255)']);
  },

  // ── BED textures ──────────────────────────────────────────────────
  // Red bedspread, white pillow, oak wood frame — Minecraft style.
  // The top texture shows the full bed from above (pillow at top, blanket below).
  // Both blocks use the same textures but orientation makes them look correct.

  bed_top(ctx, x0, y0, rng) {
    const S = TILE;
    // Oak wood frame border (1px)
    const m = 1;
    noisy(ctx, x0, y0, [139, 90, 43], 0.06, rng);
    // Red bedspread fill
    noisy(ctx, x0 + m, y0 + m, [180, 40, 30], 0.06, rng);
    // Quilting lines on blanket
    for (let i = 0; i < 4; i++) {
      const ly = y0 + m + 10 + i * 3;
      ctx.fillStyle = 'rgba(140,30,20,0.25)';
      ctx.fillRect(x0 + m, ly, S - m * 2, 1);
    }
    // Subtle highlights on blanket
    for (let i = 0; i < 4; i++) {
      ctx.fillStyle = 'rgba(220,70,60,0.3)';
      ctx.fillRect(x0 + m + 2 + (rng() * (S - m * 2 - 6) | 0), y0 + m + 12 + (rng() * (S - m * 2 - 12) | 0), 2, 2);
    }
    // White pillow area (top 5px)
    const ph = 5;
    ctx.fillStyle = 'rgb(245,245,250)';
    ctx.fillRect(x0 + m + 1, y0 + m, S - m * 2 - 2, ph);
    // Pillow shading — indent
    ctx.fillStyle = 'rgba(210,210,220,0.5)';
    ctx.fillRect(x0 + m + 3, y0 + m + 1, S - m * 2 - 6, ph - 2);
    // Pillow border
    ctx.fillStyle = 'rgb(200,200,210)';
    ctx.fillRect(x0 + m + 1, y0 + m + ph, S - m * 2 - 2, 1);
  },

  bed_side(ctx, x0, y0, rng) {
    const S = TILE;
    // Bottom half: oak wood frame (legs)
    const woodH = Math.floor(S * 0.5);
    const woodY = S - woodH;
    noisy(ctx, x0, y0 + woodY, [139, 90, 43], 0.06, rng);
    // Wood grain
    for (let i = 0; i < 3; i++) {
      const gy = y0 + woodY + 2 + (rng() * (woodH - 4) | 0);
      ctx.fillStyle = 'rgba(110,70,30,0.35)';
      ctx.fillRect(x0, gy, S, 1);
    }
    // Wood plank divisions
    ctx.fillStyle = 'rgba(100,65,28,0.25)';
    ctx.fillRect(x0 + (S / 3 | 0), y0 + woodY, 1, woodH);
    ctx.fillRect(x0 + (S * 2 / 3 | 0), y0 + woodY, 1, woodH);
    // Top half: red blanket draping over
    const blanketH = S - woodH;
    noisy(ctx, x0, y0, [180, 40, 30], 0.06, rng);
    // Blanket fold lines
    for (let i = 0; i < 3; i++) {
      const fy = y0 + 1 + (rng() * (blanketH - 2) | 0);
      ctx.fillStyle = 'rgba(140,30,20,0.25)';
      ctx.fillRect(x0, fy, S, 1);
    }
    // Frame edge highlight
    ctx.fillStyle = 'rgba(170,115,55,0.4)';
    ctx.fillRect(x0, y0 + woodY, S, 1);
  },

  bed_foot(ctx, x0, y0, rng) {
    const S = TILE;
    // Oak wood footboard — solid wood face
    noisy(ctx, x0, y0, [139, 90, 43], 0.06, rng);
    // Wood grain
    for (let i = 0; i < 4; i++) {
      const gy = y0 + 2 + (rng() * (S - 4) | 0);
      ctx.fillStyle = 'rgba(110,70,30,0.3)';
      ctx.fillRect(x0, gy, S, 1);
    }
    // Plank divisions
    ctx.fillStyle = 'rgba(100,65,28,0.25)';
    ctx.fillRect(x0 + (S / 3 | 0), y0, 1, S);
    ctx.fillRect(x0 + (S * 2 / 3 | 0), y0, 1, S);
    // Top edge
    ctx.fillStyle = 'rgba(170,115,55,0.5)';
    ctx.fillRect(x0, y0, S, 1);
  },

  bed_foot_top(ctx, x0, y0, rng) {
    const S = TILE;
    // Foot block top: blanket only (no pillow) — red blanket with wood frame edges
    const m = 1;
    noisy(ctx, x0, y0, [139, 90, 43], 0.06, rng);
    noisy(ctx, x0 + m, y0 + m, [180, 40, 30], 0.06, rng);
    // Quilting lines
    for (let i = 0; i < 4; i++) {
      const ly = y0 + m + 2 + i * 3;
      ctx.fillStyle = 'rgba(140,30,20,0.25)';
      ctx.fillRect(x0 + m, ly, S - m * 2, 1);
    }
    // Blanket highlights
    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = 'rgba(220,70,60,0.3)';
      ctx.fillRect(x0 + m + 2 + (rng() * (S - m * 2 - 6) | 0), y0 + m + 3 + (rng() * (S - m * 2 - 6) | 0), 2, 2);
    }
    // Blanket tuck lines at bottom edge
    ctx.fillStyle = 'rgba(140,30,20,0.3)';
    ctx.fillRect(x0 + m, y0 + S - m - 2, S - m * 2, 1);
  },

  bed_foot_side(ctx, x0, y0, rng) {
    const S = TILE;
    // Foot side: wooden footboard (full height) with no pillow
    const woodH = S;
    noisy(ctx, x0, y0, [139, 90, 43], 0.06, rng);
    for (let i = 0; i < 5; i++) {
      const gy = y0 + 2 + (rng() * (S - 4) | 0);
      ctx.fillStyle = 'rgba(110,70,30,0.3)';
      ctx.fillRect(x0, gy, S, 1);
    }
    ctx.fillStyle = 'rgba(100,65,28,0.25)';
    ctx.fillRect(x0 + (S / 3 | 0), y0, 1, S);
    ctx.fillRect(x0 + (S * 2 / 3 | 0), y0, 1, S);
    // Top edge highlight
    ctx.fillStyle = 'rgba(170,115,55,0.5)';
    ctx.fillRect(x0, y0, S, 1);
    // Bottom edge highlight
    ctx.fillStyle = 'rgba(100,65,28,0.3)';
    ctx.fillRect(x0, y0 + S - 1, S, 1);
  },

  // ── PRISMITE ORE ──────────────────────────────────────────────────
  // Stone base with mixed red and green ore blobs (same style as other ores).
  prismite_ore(ctx, x0, y0, rng) {
    // Stone base (same as other ores)
    noisy(ctx, x0, y0, [127, 127, 127], 0.07, rng);
    for (let i = 0; i < 8; i++) {
      const x = (rng() * (TILE - 6)) | 0, y = (rng() * (TILE - 6)) | 0;
      ctx.fillStyle = rng() < 0.5 ? 'rgba(105,105,105,0.4)' : 'rgba(148,148,148,0.4)';
      ctx.fillRect(x0 + x, y0 + y, 4 + (rng() * 3 | 0), 4 + (rng() * 3 | 0));
    }
    // Red ore blobs
    const redBlobs = 3 + (rng() * 2 | 0);
    for (let i = 0; i < redBlobs; i++) {
      const bx = 3 + (rng() * (TILE - 8) | 0);
      const by = 3 + (rng() * (TILE - 8) | 0);
      const r = 2 + (rng() * 2 | 0);
      for (let py = -r; py <= r; py++) {
        for (let px = -r; px <= r; px++) {
          const d = Math.sqrt(px * px + py * py);
          if (d > r + 0.5) continue;
          const f = 1 + (rng() - 0.5) * 0.2;
          ctx.fillStyle = `rgb(${clamp(200 * f)},${clamp(48 * f)},${clamp(48 * f)})`;
          ctx.fillRect(x0 + bx + px, y0 + by + py, 1, 1);
        }
      }
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.fillRect(x0 + bx - 1, y0 + by - 1, 1, 1);
    }
    // Green ore blobs
    const greenBlobs = 3 + (rng() * 2 | 0);
    for (let i = 0; i < greenBlobs; i++) {
      const bx = 3 + (rng() * (TILE - 8) | 0);
      const by = 3 + (rng() * (TILE - 8) | 0);
      const r = 2 + (rng() * 2 | 0);
      for (let py = -r; py <= r; py++) {
        for (let px = -r; px <= r; px++) {
          const d = Math.sqrt(px * px + py * py);
          if (d > r + 0.5) continue;
          const f = 1 + (rng() - 0.5) * 0.2;
          ctx.fillStyle = `rgb(${clamp(40 * f)},${clamp(180 * f)},${clamp(60 * f)})`;
          ctx.fillRect(x0 + bx + px, y0 + by + py, 1, 1);
        }
      }
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.fillRect(x0 + bx - 1, y0 + by - 1, 1, 1);
    }
  },

  chest_top(ctx, x0, y0, rng) {
    // Brown planks with darker border
    noisy(ctx, x0, y0, [150, 110, 55], 0.06, rng);
    // Dark border
    ctx.fillStyle = 'rgba(90,65,30,0.7)';
    for (let x = 0; x < TILE; x++) { ctx.fillRect(x0 + x, y0, 1, 1); ctx.fillRect(x0 + x, y0 + TILE - 1, 1, 1); }
    for (let y = 0; y < TILE; y++) { ctx.fillRect(x0, y0 + y, 1, 1); ctx.fillRect(x0 + TILE - 1, y0 + y, 1, 1); }
    // Center latch
    ctx.fillStyle = 'rgb(180,160,80)';
    ctx.fillRect(x0 + 14, y0 + 15, 4, 2);
  },

  chest_side(ctx, x0, y0, rng) {
    // Brown wood with vertical planks
    noisy(ctx, x0, y0, [140, 100, 45], 0.06, rng);
    // Plank lines
    ctx.fillStyle = 'rgba(90,65,30,0.4)';
    for (let x = 6; x < TILE; x += 8) {
      for (let y = 0; y < TILE; y++) ctx.fillRect(x0 + x, y0 + y, 1, 1);
    }
    // Bottom trim
    ctx.fillStyle = 'rgba(100,70,30,0.6)';
    for (let x = 0; x < TILE; x++) ctx.fillRect(x0 + x, y0 + TILE - 1, 1, 1);
    // Highlight top edge
    ctx.fillStyle = 'rgba(180,140,70,0.4)';
    for (let x = 0; x < TILE; x++) ctx.fillRect(x0 + x, y0, 1, 1);
  },

  chest_front(ctx, x0, y0, rng) {
    // Front face with latch
    noisy(ctx, x0, y0, [140, 100, 45], 0.06, rng);
    // Plank lines
    ctx.fillStyle = 'rgba(90,65,30,0.4)';
    for (let x = 6; x < TILE; x += 8) {
      for (let y = 0; y < TILE; y++) ctx.fillRect(x0 + x, y0 + y, 1, 1);
    }
    // Metal latch (gold colored)
    ctx.fillStyle = 'rgb(180,160,80)';
    ctx.fillRect(x0 + 13, y0 + 13, 6, 6);
    ctx.fillStyle = 'rgb(200,180,100)';
    ctx.fillRect(x0 + 14, y0 + 14, 4, 4);
    // Bottom trim
    ctx.fillStyle = 'rgba(100,70,30,0.6)';
    for (let x = 0; x < TILE; x++) ctx.fillRect(x0 + x, y0 + TILE - 1, 1, 1);
  },

  // --- New block painters (BlockForge expansion) ---
  torch(ctx, x0, y0, rng) {
    ctx.clearRect(x0, y0, TILE, TILE);
    // Wooden post.
    ctx.fillStyle = 'rgb(120,86,46)';
    ctx.fillRect(x0 + 14, y0 + 12, 4, 18);
    ctx.fillStyle = 'rgb(96,68,36)';
    ctx.fillRect(x0 + 14, y0 + 12, 1, 18);
    ctx.fillStyle = 'rgb(150,112,64)';
    ctx.fillRect(x0 + 17, y0 + 12, 1, 18);
    // Flame.
    ctx.fillStyle = 'rgb(255,170,40)';
    ctx.beginPath();
    ctx.ellipse(x0 + 16, y0 + 9, 5, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgb(255,225,90)';
    ctx.beginPath();
    ctx.ellipse(x0 + 16, y0 + 11, 2.5, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgb(255,255,210)';
    ctx.fillRect(x0 + 15, y0 + 11, 2, 3);
  },
  sandstone(ctx, x0, y0, rng) {
    noisy(ctx, x0, y0, [222, 206, 158], 0.05, rng);
    // Top cap band + bottom shadow.
    ctx.fillStyle = 'rgba(200,184,140,0.7)';
    ctx.fillRect(x0, y0, TILE, 3);
    ctx.fillStyle = 'rgba(180,164,120,0.7)';
    ctx.fillRect(x0, y0 + TILE - 3, TILE, 3);
    // Chiselled centre block.
    ctx.fillStyle = 'rgba(206,190,146,0.8)';
    ctx.fillRect(x0 + 9, y0 + 9, 14, 14);
    ctx.fillStyle = 'rgba(170,154,112,0.9)';
    ctx.fillRect(x0 + 9, y0 + 9, 14, 2);
    ctx.fillRect(x0 + 9, y0 + 21, 14, 2);
    ctx.fillRect(x0 + 9, y0 + 9, 2, 14);
    ctx.fillRect(x0 + 21, y0 + 9, 2, 14);
    speckle(ctx, x0, y0, rng, 14, ['rgb(236,220,172)', 'rgb(196,180,136)']);
  },
  mossy_cobblestone(ctx, x0, y0, rng) {
    _drawCobblestoneBody(ctx, x0, y0, rng);
    // Green moss patches.
    for (let i = 0; i < 8; i++) {
      const x = (rng() * (TILE - 5)) | 0, y = (rng() * (TILE - 5)) | 0;
      ctx.fillStyle = rng() < 0.5 ? 'rgba(74,128,52,0.7)' : 'rgba(96,150,64,0.7)';
      ctx.fillRect(x0 + x, y0 + y, 3 + (rng() * 3 | 0), 3 + (rng() * 3 | 0));
    }
    speckle(ctx, x0, y0, rng, 10, ['rgb(104,160,72)', 'rgb(60,110,44)']);
  },
  cobblestone_wall(ctx, x0, y0, rng) {
    _drawCobblestoneBody(ctx, x0, y0, rng);
  },
  nether_brick(ctx, x0, y0, rng) {
    // Brimstone bricks: dark red-brown mortar with brick courses.
    noisy(ctx, x0, y0, [92, 48, 40], 0.06, rng);
    // Horizontal mortar lines.
    ctx.fillStyle = 'rgba(60,28,24,0.8)';
    for (let y = 0; y < TILE; y += 8) ctx.fillRect(x0, y0 + y, TILE, 1);
    // Vertical mortar (offset per course).
    for (let y = 0; y < TILE; y += 8) {
      const off = (y / 8) % 2 ? 8 : 16;
      for (let x = off; x < TILE; x += 16) ctx.fillRect(x0 + x, y0 + y, 1, 8);
    }
    // Brick highlights.
    for (let i = 0; i < 20; i++) {
      ctx.fillStyle = 'rgb(120,64,54)';
      ctx.fillRect(x0 + (rng() * TILE | 0), y0 + (rng() * TILE | 0), 1, 1);
    }
  },
  glass_pane(ctx, x0, y0, rng) {
    // Thin transparent pane with border (cube stand-in).
    ctx.clearRect(x0, y0, TILE, TILE);
    ctx.fillStyle = 'rgba(180,210,225,0.08)';
    ctx.fillRect(x0, y0, TILE, TILE);
    ctx.fillStyle = 'rgba(200,220,230,0.85)';
    ctx.fillRect(x0, y0, TILE, 2);
    ctx.fillRect(x0, y0 + TILE - 2, TILE, 2);
    ctx.fillRect(x0, y0, 2, TILE);
    ctx.fillRect(x0 + TILE - 2, y0, 2, TILE);
    ctx.fillStyle = 'rgba(236,248,255,0.7)';
    ctx.fillRect(x0 + 2, y0 + 2, TILE - 4, 1);
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.fillRect(x0 + 4, y0 + 6, TILE - 12, 2);
  },
  hay_block(ctx, x0, y0, rng) {
    // Top: concentric rings. Side: vertical wheat stalks.
    noisy(ctx, x0, y0, [222, 200, 110], 0.05, rng);
    ctx.fillStyle = 'rgba(206,184,96,0.8)';
    ctx.fillRect(x0 + 8, y0 + 8, 16, 16);
    ctx.fillStyle = 'rgba(190,168,84,0.9)';
    ctx.fillRect(x0 + 12, y0 + 12, 8, 8);
    // Side stalks.
    for (let x = 2; x < TILE; x += 4) {
      ctx.fillStyle = rng() < 0.5 ? 'rgb(214,192,104)' : 'rgb(196,174,90)';
      ctx.fillRect(x0 + x, y0 + 2, 2, TILE - 4);
    }
    speckle(ctx, x0, y0, rng, 16, ['rgb(236,214,120)', 'rgb(184,162,80)']);
  },
  prismite_block(ctx, x0, y0, rng) {
    noisy(ctx, x0, y0, [150, 90, 220], 0.06, rng);
    // Faceted gem look.
    ctx.fillStyle = 'rgba(190,140,255,0.7)';
    ctx.beginPath();
    ctx.moveTo(x0 + 16, y0 + 2); ctx.lineTo(x0 + 30, y0 + 16);
    ctx.lineTo(x0 + 16, y0 + 30); ctx.lineTo(x0 + 2, y0 + 16);
    ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(230,200,255,0.9)';
    ctx.fillRect(x0 + 14, y0 + 14, 4, 4);
  },
  coal_block(ctx, x0, y0, rng) {
    noisy(ctx, x0, y0, [42, 42, 46], 0.05, rng);
    // Subtle facet highlights.
    ctx.fillStyle = 'rgba(80,80,88,0.5)';
    ctx.fillRect(x0 + 4, y0 + 4, TILE - 8, 2);
    ctx.fillRect(x0 + 4, y0 + 4, 2, TILE - 8);
    speckle(ctx, x0, y0, rng, 18, ['rgb(70,70,76)', 'rgb(20,20,24)']);
  },
  iron_block(ctx, x0, y0, rng) {
    // Brushed metal base
    noisy(ctx, x0, y0, [200, 200, 205], 0.04, rng);
    // Grid pattern
    ctx.fillStyle = 'rgba(150,150,160,0.5)';
    ctx.fillRect(x0 + 15, y0, 2, TILE);
    ctx.fillRect(x0, y0 + 15, TILE, 2);
    // Bevels
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.fillRect(x0, y0, TILE, 2);
    ctx.fillRect(x0, y0, 2, TILE);
    ctx.fillStyle = 'rgba(80,80,90,0.4)';
    ctx.fillRect(x0, y0 + TILE - 2, TILE, 2);
    ctx.fillRect(x0 + TILE - 2, y0, 2, TILE);
  },
  gold_block(ctx, x0, y0, rng) {
    // Rich gold base
    noisy(ctx, x0, y0, [240, 210, 60], 0.05, rng);
    // Inset pattern
    ctx.fillStyle = 'rgba(180,150,30,0.4)';
    ctx.fillRect(x0 + 4, y0 + 4, TILE - 8, TILE - 8);
    // Shiny bevels
    ctx.fillStyle = 'rgba(255,255,180,0.6)';
    ctx.fillRect(x0, y0, TILE, 2);
    ctx.fillRect(x0, y0, 2, TILE);
    ctx.fillStyle = 'rgba(160,130,20,0.5)';
    ctx.fillRect(x0, y0 + TILE - 2, TILE, 2);
    ctx.fillRect(x0 + TILE - 2, y0, 2, TILE);
  },
  diamond_block(ctx, x0, y0, rng) {
    // Diamond blue base
    noisy(ctx, x0, y0, [100, 200, 220], 0.06, rng);
    // Faceted look
    ctx.beginPath();
    ctx.moveTo(x0, y0); ctx.lineTo(x0 + TILE, y0 + TILE);
    ctx.moveTo(x0 + TILE, y0); ctx.lineTo(x0, y0 + TILE);
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.stroke();
    // Bevel border
    ctx.fillStyle = 'rgba(220,255,255,0.4)';
    ctx.fillRect(x0, y0, TILE, 2);
    ctx.fillRect(x0, y0, 2, TILE);
    ctx.fillStyle = 'rgba(40,120,150,0.5)';
    ctx.fillRect(x0, y0 + TILE - 2, TILE, 2);
    ctx.fillRect(x0 + TILE - 2, y0, 2, TILE);
  },
  end_stone(ctx, x0, y0, rng) {
    noisy(ctx, x0, y0, [222, 220, 168], 0.05, rng);
    speckle(ctx, x0, y0, rng, 30, ['rgb(255,255,210)', 'rgb(190,188,140)']);
  },
  quartz_block(ctx, x0, y0, rng) {
    noisy(ctx, x0, y0, [238, 236, 232], 0.025, rng);
    // Chiselled column.
    ctx.fillStyle = 'rgba(210,208,204,0.8)';
    ctx.fillRect(x0 + 13, y0 + 2, 6, TILE - 4);
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.fillRect(x0 + 13, y0 + 2, 6, 2);
    ctx.fillStyle = 'rgba(180,178,174,0.7)';
    ctx.fillRect(x0 + 13, y0 + TILE - 4, 6, 2);
  },

  ladder(ctx, x0, y0, rng) {
    const S = TILE;
    ctx.clearRect(x0, y0, S, S);
    // Side rails (dark brown wood).
    ctx.fillStyle = 'rgb(100,72,38)';
    ctx.fillRect(x0 + 4, y0, 2, S);
    ctx.fillRect(x0 + S - 6, y0, 2, S);
    // Rail highlight.
    ctx.fillStyle = 'rgb(140,104,56)';
    ctx.fillRect(x0 + 4, y0, 1, S);
    ctx.fillRect(x0 + S - 6, y0, 1, S);
    // Rail shadow.
    ctx.fillStyle = 'rgb(72,50,24)';
    ctx.fillRect(x0 + 5, y0, 1, S);
    ctx.fillRect(x0 + S - 5, y0, 1, S);
    // Horizontal rungs.
    for (let y = 2; y < S; y += 6) {
      ctx.fillStyle = 'rgb(120,88,46)';
      ctx.fillRect(x0 + 6, y0 + y, S - 12, 2);
      ctx.fillStyle = 'rgb(150,114,62)';
      ctx.fillRect(x0 + 6, y0 + y, S - 12, 1);
      ctx.fillStyle = 'rgb(88,62,30)';
      ctx.fillRect(x0 + 6, y0 + y + 1, S - 12, 1);
    }
    // Wood grain noise on rungs.
    speckle(ctx, x0, y0, rng, 12, ['rgb(100,72,38)', 'rgb(140,104,56)']);
  },

  copper_ore(ctx, x0, y0, rng) {
    const S = TILE;
    noisy(ctx, x0, y0, [127, 127, 127], 0.07, rng);
    // Stone mottling.
    for (let i = 0; i < 8; i++) {
      const x = (rng() * (S - 6)) | 0, y = (rng() * (S - 6)) | 0;
      ctx.fillStyle = rng() < 0.5 ? 'rgba(105,105,105,0.4)' : 'rgba(148,148,148,0.4)';
      ctx.fillRect(x0 + x, y0 + y, 4 + (rng() * 3 | 0), 4 + (rng() * 3 | 0));
    }
    // Copper ore blobs (orange-brown).
    const blobs = 4 + (rng() * 2 | 0);
    for (let i = 0; i < blobs; i++) {
      const bx = 3 + (rng() * (S - 8) | 0);
      const by = 3 + (rng() * (S - 8) | 0);
      const r = 2 + (rng() * 2 | 0);
      for (let py = -r; py <= r; py++) {
        for (let px = -r; px <= r; px++) {
          const d = Math.sqrt(px * px + py * py);
          if (d > r + 0.5) continue;
          const f = 1 + (rng() - 0.5) * 0.2;
          ctx.fillStyle = `rgb(${clamp(196 * f)},${clamp(118 * f)},${clamp(56 * f)})`;
          ctx.fillRect(x0 + bx + px, y0 + by + py, 1, 1);
        }
      }
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.fillRect(x0 + bx - 1, y0 + by - 1, 1, 1);
    }
    // Dark specks in stone.
    speckle(ctx, x0, y0, rng, 6, ['rgb(90,90,90)']);
  },

  emerald_ore(ctx, x0, y0, rng) {
    const S = TILE;
    noisy(ctx, x0, y0, [127, 127, 127], 0.07, rng);
    // Stone mottling.
    for (let i = 0; i < 8; i++) {
      const x = (rng() * (S - 6)) | 0, y = (rng() * (S - 6)) | 0;
      ctx.fillStyle = rng() < 0.5 ? 'rgba(105,105,105,0.4)' : 'rgba(148,148,148,0.4)';
      ctx.fillRect(x0 + x, y0 + y, 4 + (rng() * 3 | 0), 4 + (rng() * 3 | 0));
    }
    // Emerald ore blobs (bright green).
    const blobs = 3 + (rng() * 2 | 0);
    for (let i = 0; i < blobs; i++) {
      const bx = 3 + (rng() * (S - 8) | 0);
      const by = 3 + (rng() * (S - 8) | 0);
      const r = 2 + (rng() * 2 | 0);
      for (let py = -r; py <= r; py++) {
        for (let px = -r; px <= r; px++) {
          const d = Math.sqrt(px * px + py * py);
          if (d > r + 0.5) continue;
          const f = 1 + (rng() - 0.5) * 0.2;
          ctx.fillStyle = `rgb(${clamp(40 * f)},${clamp(200 * f)},${clamp(80 * f)})`;
          ctx.fillRect(x0 + bx + px, y0 + by + py, 1, 1);
        }
      }
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.fillRect(x0 + bx - 1, y0 + by - 1, 1, 1);
    }
    // Dark specks in stone.
    speckle(ctx, x0, y0, rng, 6, ['rgb(90,90,90)']);
  },

  wool(ctx, x0, y0, rng) {
    const S = TILE;
    noisy(ctx, x0, y0, [238, 236, 232], 0.03, rng);
    // Soft fiber noise — subtle tonal variation.
    for (let i = 0; i < 20; i++) {
      const x = (rng() * S) | 0, y = (rng() * S) | 0;
      ctx.fillStyle = rng() < 0.5 ? 'rgb(250,248,244)' : 'rgb(226,222,218)';
      ctx.fillRect(x0 + x, y0 + y, 1, 1);
    }
    // Faint woven cross-hatch lines (fabric texture).
    ctx.fillStyle = 'rgba(210,206,200,0.25)';
    for (let y = 3; y < S; y += 4) ctx.fillRect(x0, y0 + y, S, 1);
    for (let x = 3; x < S; x += 4) ctx.fillRect(x0 + x, y0, 1, S);
    // A few brighter specks (lint / highlight).
    speckle(ctx, x0, y0, rng, 8, ['rgb(255,255,255)']);
  },

  // ── GREENSTONE ──────────────────────────────────────────────────
  greenstone_ore(ctx, x0, y0, rng) {
    const S = TILE;
    // Stone base (same style as iron_ore).
    noisy(ctx, x0, y0, [127, 127, 127], 0.07, rng);
    for (let i = 0; i < 8; i++) {
      const x = (rng() * (S - 6)) | 0, y = (rng() * (S - 6)) | 0;
      ctx.fillStyle = rng() < 0.5 ? 'rgba(105,105,105,0.4)' : 'rgba(148,148,148,0.4)';
      ctx.fillRect(x0 + x, y0 + y, 4 + (rng() * 3 | 0), 4 + (rng() * 3 | 0));
    }
    // Bright green ore blobs.
    const blobs = 4 + (rng() * 3 | 0);
    for (let i = 0; i < blobs; i++) {
      const bx = 3 + (rng() * (S - 8) | 0);
      const by = 3 + (rng() * (S - 8) | 0);
      const r = 2 + (rng() * 2 | 0);
      for (let py = -r; py <= r; py++) {
        for (let px = -r; px <= r; px++) {
          const d = Math.sqrt(px * px + py * py);
          if (d > r + 0.5) continue;
          const f = 1 + (rng() - 0.5) * 0.2;
          ctx.fillStyle = `rgb(${clamp(18 * f)},${clamp(130 * f)},${clamp(44 * f)})`;
          ctx.fillRect(x0 + bx + px, y0 + by + py, 1, 1);
        }
      }
      // Specular highlight.
      ctx.fillStyle = 'rgba(255,255,255,0.55)';
      ctx.fillRect(x0 + bx - 1, y0 + by - 1, 1, 1);
    }
    speckle(ctx, x0, y0, rng, 6, ['rgb(90,90,90)']);
  },

  greenstone_block(ctx, x0, y0, rng) {
    const S = TILE;
    // Solid dark green base.
    noisy(ctx, x0, y0, [18, 120, 40], 0.06, rng);
    // Darker green crosshatch pattern.
    ctx.fillStyle = 'rgba(12,80,28,0.4)';
    for (let y = 3; y < S; y += 5) ctx.fillRect(x0, y0 + y, S, 1);
    for (let x = 3; x < S; x += 5) ctx.fillRect(x0 + x, y0, 1, S);
    // Subtle noise specks.
    speckle(ctx, x0, y0, rng, 14, ['rgb(30,140,56)', 'rgb(10,90,28)']);
    // Bevel border.
    ctx.fillStyle = 'rgba(50,170,80,0.4)';
    ctx.fillRect(x0, y0, S, 2);
    ctx.fillRect(x0, y0, 2, S);
    ctx.fillStyle = 'rgba(8,60,20,0.5)';
    ctx.fillRect(x0, y0 + S - 2, S, 2);
    ctx.fillRect(x0 + S - 2, y0, 2, S);
  },

  greenstone_lamp_off(ctx, x0, y0, rng) {
    const S = TILE;
    // Dark wood frame border (2px wide).
    ctx.fillStyle = 'rgb(110,82,48)';
    ctx.fillRect(x0, y0, S, 2);
    ctx.fillRect(x0, y0 + S - 2, S, 2);
    ctx.fillRect(x0, y0, 2, S);
    ctx.fillRect(x0 + S - 2, y0, 2, S);
    // Inner dark area with faint green tint (unpowered).
    ctx.fillStyle = 'rgb(42,42,42)';
    ctx.fillRect(x0 + 2, y0 + 2, S - 4, S - 4);
    // Faint green tint overlay.
    ctx.fillStyle = 'rgba(26,48,32,0.5)';
    ctx.fillRect(x0 + 2, y0 + 2, S - 4, S - 4);
    // Frame highlight (top-left bevel).
    ctx.fillStyle = 'rgba(150,120,72,0.5)';
    ctx.fillRect(x0, y0, S, 1);
    ctx.fillRect(x0, y0, 1, S);
    // Frame shadow (bottom-right bevel).
    ctx.fillStyle = 'rgba(70,50,26,0.5)';
    ctx.fillRect(x0, y0 + S - 1, S, 1);
    ctx.fillRect(x0 + S - 1, y0, 1, S);
    speckle(ctx, x0, y0, rng, 6, ['rgb(60,60,60)', 'rgb(30,42,34)']);
  },

  greenstone_lamp_on(ctx, x0, y0, rng) {
    const S = TILE;
    // Same wood frame as _off.
    ctx.fillStyle = 'rgb(110,82,48)';
    ctx.fillRect(x0, y0, S, 2);
    ctx.fillRect(x0, y0 + S - 2, S, 2);
    ctx.fillRect(x0, y0, 2, S);
    ctx.fillRect(x0 + S - 2, y0, 2, S);
    // Bright glowing green inner area.
    ctx.fillStyle = 'rgb(64,224,96)';
    ctx.fillRect(x0 + 2, y0 + 2, S - 4, S - 4);
    // White-hot centre glow.
    ctx.fillStyle = 'rgb(192,255,192)';
    ctx.fillRect(x0 + 10, y0 + 10, S - 20, S - 20);
    ctx.fillStyle = 'rgb(230,255,230)';
    ctx.fillRect(x0 + 12, y0 + 12, S - 24, S - 24);
    // Outer glow halo on the frame.
    ctx.fillStyle = 'rgba(64,224,96,0.35)';
    ctx.fillRect(x0, y0, S, 2);
    ctx.fillRect(x0, y0 + S - 2, S, 2);
    ctx.fillRect(x0, y0, 2, S);
    ctx.fillRect(x0 + S - 2, y0, 2, S);
    // Frame bevel.
    ctx.fillStyle = 'rgba(150,120,72,0.4)';
    ctx.fillRect(x0, y0, S, 1);
    ctx.fillRect(x0, y0, 1, S);
    ctx.fillStyle = 'rgba(30,100,50,0.5)';
    ctx.fillRect(x0, y0 + S - 1, S, 1);
    ctx.fillRect(x0 + S - 1, y0, 1, S);
  },

  // ── PISTON ──────────────────────────────────────────────────────
  piston_top(ctx, x0, y0, rng) {
    const S = TILE;
    // Wooden planks body.
    planksBody(ctx, x0, y0, rng);
    // Square piston head in centre (iron-block colour).
    const hs = 8;
    const cx = (S - hs) / 2;
    ctx.fillStyle = 'rgb(184,184,184)';
    ctx.fillRect(x0 + cx, y0 + cx, hs, hs);
    // Head bevel highlight.
    ctx.fillStyle = 'rgb(210,210,210)';
    ctx.fillRect(x0 + cx, y0 + cx, hs, 2);
    ctx.fillRect(x0 + cx, y0 + cx, 2, hs);
    // Head shadow.
    ctx.fillStyle = 'rgb(140,140,140)';
    ctx.fillRect(x0 + cx, y0 + cx + hs - 2, hs, 2);
    ctx.fillRect(x0 + cx + hs - 2, y0 + cx, 2, hs);
  },

  piston_side(ctx, x0, y0, rng) {
    const S = TILE;
    // Wooden planks body.
    planksBody(ctx, x0, y0, rng);
    // Horizontal piston arm groove (iron stripe in middle third).
    const y1 = Math.floor(S / 3);
    const y2 = Math.floor(S * 2 / 3);
    ctx.fillStyle = 'rgb(184,184,184)';
    ctx.fillRect(x0, y0 + y1, S, y2 - y1);
    // Top edge highlight of stripe.
    ctx.fillStyle = 'rgb(210,210,210)';
    ctx.fillRect(x0, y0 + y1, S, 2);
    // Bottom edge shadow of stripe.
    ctx.fillStyle = 'rgb(140,140,140)';
    ctx.fillRect(x0, y0 + y2 - 2, S, 2);
    // Faint vertical groove lines in the arm.
    ctx.fillStyle = 'rgba(130,130,130,0.3)';
    for (let x = 6; x < S; x += 8) ctx.fillRect(x0 + x, y0 + y1, 1, y2 - y1);
  },

  piston_bottom(ctx, x0, y0, rng) {
    planksBody(ctx, x0, y0, rng);
  },

  sticky_piston_top(ctx, x0, y0, rng) {
    const S = TILE;
    // Wooden planks body.
    planksBody(ctx, x0, y0, rng);
    // Square piston head in centre (iron-block colour).
    const hs = 8;
    const cx = (S - hs) / 2;
    ctx.fillStyle = 'rgb(184,184,184)';
    ctx.fillRect(x0 + cx, y0 + cx, hs, hs);
    // Head bevel highlight.
    ctx.fillStyle = 'rgb(210,210,210)';
    ctx.fillRect(x0 + cx, y0 + cx, hs, 2);
    ctx.fillRect(x0 + cx, y0 + cx, 2, hs);
    // Head shadow.
    ctx.fillStyle = 'rgb(140,140,140)';
    ctx.fillRect(x0 + cx, y0 + cx + hs - 2, hs, 2);
    ctx.fillRect(x0 + cx + hs - 2, y0 + cx, 2, hs);
    // Green slime dot in the centre of the piston head.
    const d = 3;
    const dcx = cx + hs / 2, dcy = cx + hs / 2;
    ctx.fillStyle = 'rgb(64,160,32)';
    ctx.beginPath();
    ctx.arc(x0 + dcx, y0 + dcy, d, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgb(90,200,50)';
    ctx.beginPath();
    ctx.arc(x0 + dcx - 0.5, y0 + dcy - 0.5, d - 1, 0, Math.PI * 2);
    ctx.fill();
  },

  // ── GREENSTONE TORCH & WIRE ─────────────────────────────────────
  greenstone_torch(ctx, x0, y0, rng) {
    const S = TILE;
    ctx.clearRect(x0, y0, S, S);
    // Thin wooden stick.
    ctx.fillStyle = 'rgb(110,82,48)';
    ctx.fillRect(x0 + 7, y0 + 8, 2, 8);
    ctx.fillStyle = 'rgb(80,58,32)';
    ctx.fillRect(x0 + 7, y0 + 8, 1, 8);
    ctx.fillStyle = 'rgb(140,108,64)';
    ctx.fillRect(x0 + 8, y0 + 8, 1, 8);
    // Dark green flame body.
    ctx.fillStyle = 'rgb(32,170,64)';
    ctx.beginPath();
    ctx.ellipse(x0 + 8, y0 + 6, 3, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    // Bright green inner glow.
    ctx.fillStyle = 'rgb(64,220,96)';
    ctx.beginPath();
    ctx.ellipse(x0 + 8, y0 + 5, 2, 3, 0, 0, Math.PI * 2);
    ctx.fill();
    // White-green hot centre.
    ctx.fillStyle = 'rgb(180,255,190)';
    ctx.fillRect(x0 + 7, y0 + 4, 2, 2);
  },

  greenstone_dust(ctx, x0, y0, rng) {
    const S = TILE;
    ctx.clearRect(x0, y0, S, S);
    // Cross-shaped green dust pattern
    ctx.fillStyle = 'rgb(20,120,40)';
    ctx.fillRect(x0, y0 + S / 2 - 1, S, 2);
    ctx.fillRect(x0 + S / 2 - 1, y0, 2, S);
    ctx.fillStyle = 'rgb(40,160,60)';
    ctx.fillRect(x0 + S / 2 - 1, y0 + S / 2 - 1, 2, 2);
    ctx.fillStyle = 'rgba(14,80,28,0.5)';
    ctx.fillRect(x0, y0 + S / 2 - 2, S, 1);
    ctx.fillRect(x0, y0 + S / 2 + 1, S, 1);
    ctx.fillRect(x0 + S / 2 - 2, y0, 1, S);
    ctx.fillRect(x0 + S / 2 + 1, y0, 1, S);
    // Tiny brightness specks along the wire.
    for (let i = 0; i < 4; i++) {
      const x = (rng() * S) | 0, y = (rng() * S) | 0;
      // Only place on the cross.
      if (Math.abs(x - S / 2) <= 1 || Math.abs(y - S / 2) <= 1) {
        ctx.fillStyle = 'rgb(100,255,140)';
        ctx.fillRect(x0 + x, y0 + y, 1, 1);
      }
    }
  },
  lava(ctx, x0, y0, rng) {
    const S = TILE;
    for (let y = 0; y < S; y++) {
      for (let x = 0; x < S; x++) {
        const v = rng();
        const r = 200 + v * 55 | 0;
        const g = 60 + v * 40 | 0;
        const b = 10 + rng() * 20 | 0;
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillRect(x0 + x, y0 + y, 1, 1);
      }
    }
    // Brighter hot spots
    for (let i = 0; i < 6; i++) {
      const x = rng() * S | 0, y = rng() * S | 0;
      ctx.fillStyle = 'rgb(255,200,40)';
      ctx.fillRect(x0 + x, y0 + y, 2, 2);
    }
  },
  iron_bars(ctx, x0, y0, rng) {
    const S = TILE;
    // Transparent background (default dark)
    ctx.fillStyle = 'rgba(0,0,0,0)';
    ctx.clearRect(x0, y0, S, S);
    // Horizontal bars
    ctx.fillStyle = '#8a8a8a';
    ctx.fillRect(x0, y0 + 3, S, 2);
    ctx.fillRect(x0, y0 + 7, S, 2);
    ctx.fillRect(x0, y0 + 11, S, 2);
    // Vertical bars
    ctx.fillRect(x0 + 4, y0, 2, S);
    ctx.fillRect(x0 + 10, y0, 2, S);
    // Highlights
    ctx.fillStyle = '#b0b0b0';
    ctx.fillRect(x0, y0 + 3, S, 1);
    ctx.fillRect(x0 + 4, y0, 1, S);
    ctx.fillRect(x0 + 10, y0, 1, S);
  },
};

// Oak-planks body shared by planks, bookshelf_top, and the crafting-table faces.
function planksBody(ctx, x0, y0, rng) {
  noisy(ctx, x0, y0, [160, 130, 80], 0.05, rng);
  // Plank seams every 8px.
  ctx.fillStyle = 'rgba(100,78,46,0.85)';
  for (let y = 0; y < TILE; y += 8) ctx.fillRect(x0, y0 + y, TILE, 1);
  // Faint horizontal grain lines.
  for (let y = 0; y < TILE; y++) {
    if (rng() < 0.18) {
      ctx.fillStyle = 'rgba(130,104,62,0.35)';
      ctx.fillRect(x0, y0 + y, TILE, 1);
    }
  }
  // Vertical grain strokes.
  for (let i = 0; i < 18; i++) {
    const x = (rng() * TILE) | 0, y = (rng() * TILE) | 0;
    ctx.fillStyle = 'rgba(138,110,66,0.4)';
    ctx.fillRect(x0 + x, y0 + y, 1, 3 + (rng() * 4 | 0));
  }
}

// Ore deposit on a stone base: irregular coloured blobs with a specular shine.
function ore(ctx, x0, y0, rng, color) {
  noisy(ctx, x0, y0, [127, 127, 127], 0.07, rng);
  for (let i = 0; i < 8; i++) {
    const x = (rng() * (TILE - 6)) | 0, y = (rng() * (TILE - 6)) | 0;
    ctx.fillStyle = rng() < 0.5 ? 'rgba(105,105,105,0.4)' : 'rgba(148,148,148,0.4)';
    ctx.fillRect(x0 + x, y0 + y, 4 + (rng() * 3 | 0), 4 + (rng() * 3 | 0));
  }
  const blobs = 4 + (rng() * 2 | 0);
  for (let i = 0; i < blobs; i++) {
    const bx = 3 + (rng() * (TILE - 8) | 0);
    const by = 3 + (rng() * (TILE - 8) | 0);
    const r = 2 + (rng() * 2 | 0);
    for (let py = -r; py <= r; py++) {
      for (let px = -r; px <= r; px++) {
        const d = Math.sqrt(px * px + py * py);
        if (d > r + 0.5) continue;
        const f = 1 + (rng() - 0.5) * 0.2;
        ctx.fillStyle = `rgb(${clamp(color[0] * f)},${clamp(color[1] * f)},${clamp(color[2] * f)})`;
        ctx.fillRect(x0 + bx + px, y0 + by + py, 1, 1);
      }
    }
    // Specular highlight (upper-left).
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.fillRect(x0 + bx - 1, y0 + by - 1, 1, 1);
  }
}

// Decorative flower (transparent background; rendered as cross quads by the mesher).
function flower(ctx, x0, y0, rng, petal, stem) {
  ctx.clearRect(x0, y0, TILE, TILE);
  // Stem rising from the bottom.
  ctx.fillStyle = stem;
  ctx.fillRect(x0 + TILE / 2 - 1, y0 + TILE / 2, 2, TILE / 2 - 2);
  // Leaves.
  ctx.fillRect(x0 + TILE / 2 - 4, y0 + TILE / 2 + 5, 3, 1);
  ctx.fillRect(x0 + TILE / 2 - 5, y0 + TILE / 2 + 6, 2, 1);
  ctx.fillRect(x0 + TILE / 2 + 2, y0 + TILE / 2 + 9, 3, 1);
  ctx.fillRect(x0 + TILE / 2 + 3, y0 + TILE / 2 + 10, 2, 1);
  // 8-petal bloom ring.
  const cx = x0 + TILE / 2, cy = y0 + TILE / 2 - 2;
  ctx.fillStyle = petal;
  for (let a = 0; a < 8; a++) {
    const ang = (a / 8) * Math.PI * 2;
    const px = cx + Math.round(Math.cos(ang) * 4);
    const py = cy + Math.round(Math.sin(ang) * 4);
    ctx.fillRect(px - 1, py - 1, 3, 3);
  }
  // Fill centre gaps with petal colour.
  ctx.fillRect(cx - 2, cy - 2, 5, 5);
  // Yellow centre.
  ctx.fillStyle = 'rgb(255,225,90)';
  ctx.fillRect(cx - 1, cy - 1, 3, 3);
  ctx.fillStyle = 'rgb(230,180,30)';
  ctx.fillRect(cx, cy, 1, 1);
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
  c.width = TILE; c.height = TILE;
  const ctx = c.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  const name = tileNameFor(blockId, 'side');
  const t = TILES[name];
  if (t) {
    ctx.drawImage(atlasCanvas, t[0] * TILE, t[1] * TILE, TILE, TILE, 0, 0, TILE, TILE);
  }
  return c;
}
