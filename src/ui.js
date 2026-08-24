// DOM UI: hotbar (with stack counts), health hearts, hunger drumsticks,
// armor bar, HUD (coords/fps/biome), block-break progress overlay.
//
// The hotbar reads from the player's Inventory in survival mode, or falls back
// to the fixed HOTBAR_BLOCKS creative palette. Stack counts display when > 1.

import { HOTBAR_BLOCKS, BLOCKS } from './blocks.js';
import { makeIcon } from './tiles.js';
import { itemDef, isBlockItem, itemName, maxStack, ITEM, totalArmorDefense } from './items.js';
import { HOTBAR_SLOTS, TOTAL } from './inventory.js';
import { CraftingGrid } from './crafting.js';
import { matchRecipe } from './recipes.js';

const HEART_COLS = '#b00', HEART_HALF_L = '#b00', HEART_HALF_R = '#633';
const HEART_EMPTY = '#411';
const DRUM_COLS = '#b87333', DRUM_HALF_L = '#b87333', DRUM_HALF_R = '#7a4a20';
const DRUM_EMPTY = '#3a2210';
// Minecraft armor bar — light-grey chestplate on a dark empty plate
const ARMOR_COLS = '#e0e0e0', ARMOR_HALF_L = '#e0e0e0', ARMOR_HALF_R = '#4a4a4a';
const ARMOR_EMPTY = '#2b2b2b';

// Minecraft Bedrock hunger drumstick — meat chunk with bone
const HEART_PIXELS = [
  [0,1,1,0,0,0,1,1,0],
  [1,1,1,1,0,1,1,1,1],
  [1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1],
  [0,1,1,1,1,1,1,1,0],
  [0,0,1,1,1,1,1,0,0],
  [0,0,0,1,1,1,0,0,0],
  [0,0,0,0,1,0,0,0,0],
];

const DRUM_PIXELS = [
  [0,0,1,1,1,1,0,0,0],
  [0,1,1,1,1,1,1,0,0],
  [1,1,1,1,1,1,1,1,0],
  [1,1,1,1,1,1,1,1,0],
  [0,1,1,1,1,1,1,0,0],
  [0,0,1,1,1,1,0,0,0],
  [0,0,0,1,1,0,0,0,0],
  [0,0,0,1,1,0,0,0,0],
  [0,0,0,1,0,0,0,0,0],
];

// Minecraft armor bar chestplate icon
const ARMOR_PIXELS = [
  [0,0,1,1,0,1,1,0,0],
  [0,1,1,1,1,1,1,1,0],
  [1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1],
  [1,1,1,0,0,0,1,1,1],
  [1,1,1,0,0,0,1,1,1],
  [0,1,1,0,0,0,1,1,0],
];

// Seed for deterministic crack generation — prevents frame-to-frame jitter.
const _crackSeed = 42;

// Cache canvases and data URLs to avoid expensive toDataURL every frame
const _heartCache = new Map();
const _drumCache = new Map();
const _armorCache = new Map();
const _heartUrlCache = new Map();
const _drumUrlCache = new Map();
const _armorUrlCache = new Map();

function drawPixelIcon(pixels, fullCol, halfL, halfR, emptyCol, full, half, cache) {
  const key = `${full ? 1 : 0}${half ? 1 : 0}`;
  if (cache.has(key)) return cache.get(key);
  const c = document.createElement('canvas');
  c.width = 9; c.height = 9;
  const x = c.getContext('2d');
  const rows = pixels.length;
  for (let py = 0; py < rows; py++) {
    for (let px = 0; px < 9; px++) {
      if (!pixels[py]?.[px]) continue;
      if (full) x.fillStyle = fullCol;
      else if (half) x.fillStyle = px <= 4 ? halfL : halfR;
      else x.fillStyle = emptyCol;
      x.fillRect(px, py, 1, 1);
    }
  }
  cache.set(key, c);
  return c;
}

function drawHeart(full, half) {
  return drawPixelIcon(HEART_PIXELS, HEART_COLS, HEART_HALF_L, HEART_HALF_R, HEART_EMPTY, full, half, _heartCache);
}

function drawDrumstick(full, half) {
  return drawPixelIcon(DRUM_PIXELS, DRUM_COLS, DRUM_HALF_L, DRUM_HALF_R, DRUM_EMPTY, full, half, _drumCache);
}

function drawHeartUrl(full, half) {
  const key = `${full ? 1 : 0}${half ? 1 : 0}`;
  if (_heartUrlCache.has(key)) return _heartUrlCache.get(key);
  const url = drawHeart(full, half).toDataURL();
  _heartUrlCache.set(key, url);
  return url;
}

function drawDrumstickUrl(full, half) {
  const key = `${full ? 1 : 0}${half ? 1 : 0}`;
  if (_drumUrlCache.has(key)) return _drumUrlCache.get(key);
  const url = drawDrumstick(full, half).toDataURL();
  _drumUrlCache.set(key, url);
  return url;
}

function drawArmorUrl(full, half) {
  const key = `${full ? 1 : 0}${half ? 1 : 0}`;
  if (_armorUrlCache.has(key)) return _armorUrlCache.get(key);
  const canvas = drawPixelIcon(ARMOR_PIXELS, ARMOR_COLS, ARMOR_HALF_L, ARMOR_HALF_R, ARMOR_EMPTY, full, half, _armorCache);
  const url = canvas.toDataURL();
  _armorUrlCache.set(key, url);
  return url;
}

// --- item / tool icon painter -------------------------------------------------
// Draws the full 16x16 pixel art for any non-block item id and returns the canvas.
// Shared by the hotbar, inventory, furnace, creative browser and the 3D
// first-person held-item view, so every UI surface shows the exact same art.
//
// Art is hand-built to match vanilla Minecraft item sprites: correct silhouettes,
// multi-tone shading, specular highlights and per-material palettes for tools.
export function makeItemIconCanvas(itemId) {
  const c = document.createElement('canvas');
  c.width = 16; c.height = 16;
  const x = c.getContext('2d');
  x.imageSmoothingEnabled = false;
  const def = itemDef(itemId);
  if (!def) return c;

  // Tools first — they have a material + shape.
  if (def.tool) {
    const palette = def.tool.woodType || def.tool.material;
    drawToolIcon(x, def.tool.type, palette);
    return _compose3D(c);
  }

  // Armor — draw a small armor piece icon.
  if (def.armor) {
    drawArmorIcon(x, def.armor, itemId);
    return _compose3D(c);
  }

  // Dispatch every non-tool item by id.
  switch (itemId) {
    case 256: drawStick(x); break;
    case 257: drawCoal(x, false); break;
    case 258: drawCoal(x, true); break;
    case 259: drawIngot(x, '#e6e6e6', '#c8c8c8', '#9a9a9a'); break;
    case 260: drawIngot(x, '#fce74a', '#e8c832', '#b89818'); break;
    case 261: drawDiamond(x); break;
    case 262: drawWheat(x); break;
    case 263: drawSeeds(x); break;
    case 264: drawBread(x); break;
    case 265: drawApple(x, false); break;
    case 284: drawApple(x, true); break;
    case 266: drawMeat(x, '#d88', '#b66', '#854', false); break;
    case 267: drawMeat(x, '#c87a52', '#a8623c', '#7a4828', true); break;
    case 268: drawMeat(x, '#d66', '#b44', '#833', false); break;
    case 269: drawMeat(x, '#9a5230', '#7a3e22', '#582812', true); break;
    case 270: drawMeat(x, '#ecc', '#caa', '#999', false); break;
    case 271: drawMeat(x, '#d8a868', '#b8884a', '#8a6230', true); break;
    case 272: drawMeat(x, '#d99', '#b77', '#866', false); break;
    case 273: drawMeat(x, '#b56838', '#944e26', '#683814', true); break;
    case 274: drawLeather(x); break;
    case 275: drawFeather(x); break;
    case 276: drawWool(x); break;
    case 277: drawBone(x); break;
    case 278: drawString(x); break;
    case 279: drawGunpowder(x); break;
    case 280: drawFlint(x); break;
    case 281: drawArrow(x); break;
    case 282: drawEgg(x); break;
    case 283: drawBucket(x); break;
    case 288: drawWaterBucket(x); break;
    case 285: drawBed(x); break;
    case 286: drawSpiderEye(x); break;
    case 287: drawPrismiteGem(x); break;
    case 290: drawMeat(x, '#7a9a5a', '#5e7a42', '#3e542a', false); break;
    case 296: drawGoldenApple(x); break;
    case 297: drawCookie(x); break;
    case 298: drawMelonSlice(x); break;
    case 299: drawCarrot(x, '#e8881e', '#b86410'); break;
    case 300: drawPotato(x, '#b89a5a', '#8a7038'); break;
    case 301: drawPotato(x, '#d8c088', '#a89050'); break;
    case 302: drawPumpkinPie(x); break;
    case 303: drawCarrot(x, '#f5d020', '#c8a410'); break;
    case 304: drawIngot(x, '#e89050', '#c87030', '#a05020'); break;
    case 305: drawEmerald(x); break;
    case 306: drawDye(x, '#90c840'); break;
    case 307: drawDye(x, '#e87098'); break;
    case 308: drawDye(x, '#3060d0'); break;
    case 309: drawBoneMeal(x); break;
    case 310: drawNameTag(x); break;
    case 311: drawSaddle(x); break;
    case 312: drawLead(x); break;
    case 314: drawGreenstoneDust(x); break;
    case 315: drawSlimeBall(x); break;
    case 316: drawFlintSteel(x); break;
    case 320: drawPortalOrb(x); break;
    case 289: drawLavaBucket(x); break;
    case 317: drawVoidPearl(x); break;
    case 318: drawRiftEye(x); break;
    case 319: drawEndStoneItem(x); break;
    case 321: drawDragonScales(x); break;
    case 322: drawDragonHeart(x); break;
    // Shattered Echo Dimension items (700+)
    case 700: drawNullShard(x); break;
    case 701: drawMemoryShard(x); break;
    case 702: drawParadoxCore(x); break;
    default: {
      x.fillStyle = '#888';
      x.fillRect(3, 3, 10, 10);
      x.fillStyle = '#aaa';
      x.fillRect(3, 3, 10, 1);
      x.fillStyle = '#666';
      x.fillRect(3, 12, 10, 1);
    }
  }
  return _compose3D(c);
}

// Post-process: take a 16x16 item icon and add dark outline + drop shadow
// to make it pop like a 3D item sitting on the slot.
function _compose3D(src) {
  const W = 16, H = 16;
  const srcCtx = src.getContext('2d');
  const srcData = srcCtx.getImageData(0, 0, W, H).data;

  // Build opacity mask
  const opaque = new Uint8Array(W * H);
  for (let i = 0; i < W * H; i++) opaque[i] = srcData[i * 4 + 3] > 10 ? 1 : 0;

  // Create final canvas (same 16x16, we draw shadow+outline in-place)
  const out = document.createElement('canvas');
  out.width = W; out.height = H;
  const ctx = out.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  const img = ctx.createImageData(W, H);
  const d = img.data;

  // Pass 1: Dark outline — any opaque pixel adjacent to transparent gets darkened
  // along that edge
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = y * W + x;
    if (!opaque[i]) continue;
    const p = i * 4;
    // Check 4 neighbours — if any is transparent, darken this pixel's edge
    const above = y > 0 ? opaque[i - W] : 0;
    const below = y < H - 1 ? opaque[i + W] : 0;
    const left = x > 0 ? opaque[i - 1] : 0;
    const right = x < W - 1 ? opaque[i + 1] : 0;

    // Top-left highlight (light source from top-left)
    if (!above || !left) {
      const f = !above && !left ? 1.45 : (!above ? 1.3 : 1.2);
      d[p]   = Math.min(255, (srcData[p]   * f) | 0);
      d[p+1] = Math.min(255, (srcData[p+1] * f) | 0);
      d[p+2] = Math.min(255, (srcData[p+2] * f) | 0);
      d[p+3] = srcData[p+3];
      continue;
    }
    // Bottom-right shadow
    if (!below || !right) {
      const f = !below && !right ? 0.5 : (!below ? 0.6 : 0.65);
      d[p]   = (srcData[p]   * f) | 0;
      d[p+1] = (srcData[p+1] * f) | 0;
      d[p+2] = (srcData[p+2] * f) | 0;
      d[p+3] = srcData[p+3];
      continue;
    }
    // Interior: copy original with subtle top-left→bottom-right gradient
    const nx = (x - 7.5) / 7.5;
    const ny = (y - 7.5) / 7.5;
    const g = 1 + (-nx - ny) * 0.06;
    d[p]   = Math.min(255, Math.max(0, (srcData[p]   * g) | 0));
    d[p+1] = Math.min(255, Math.max(0, (srcData[p+1] * g) | 0));
    d[p+2] = Math.min(255, Math.max(0, (srcData[p+2] * g) | 0));
    d[p+3] = srcData[p+3];
  }

  // Pass 2: Dark outline border — paint black pixels around the silhouette edge
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = y * W + x;
    if (opaque[i]) continue;
    // This pixel is transparent — check if any neighbour is opaque
    const n = [
      y > 0 ? (y - 1) * W + x : -1,
      y < H - 1 ? (y + 1) * W + x : -1,
      x > 0 ? y * W + (x - 1) : -1,
      x < W - 1 ? y * W + (x + 1) : -1,
    ];
    for (const ni of n) {
      if (ni >= 0 && opaque[ni]) {
        // Draw dark outline (very dark, semi-transparent so it blends)
        const p = i * 4;
        if (d[p + 3] === 0) {
          d[p] = 20; d[p+1] = 12; d[p+2] = 28; d[p+3] = 180;
        }
        break;
      }
    }
  }

  // Pass 3: Drop shadow — 1px down-right offset
  for (let y = H - 1; y >= 0; y--) for (let x = W - 1; x >= 0; x--) {
    const i = y * W + x;
    if (opaque[i]) continue;
    // Is there an opaque item pixel 1 up-left from here?
    const si = (y > 0 && x > 0) ? (y - 1) * W + (x - 1) : -1;
    if (si >= 0 && opaque[si]) {
      const p = i * 4;
      if (d[p + 3] < 100) { // Don't overwrite outline
        d[p] = 0; d[p+1] = 0; d[p+2] = 0; d[p+3] = 70;
      }
    }
  }

  ctx.putImageData(img, 0, 0);
  return out;
}

// ---- generic helpers used by the item painters ------------------------------
function px(x, col, gx, gy, w = 1, h = 1) { x.fillStyle = col; x.fillRect(gx, gy, w, h); }
function pxa(x, col, gx, gy, w, h) { // alpha helper
  x.save(); x.globalAlpha = col.a; x.fillStyle = col.c;
  x.fillRect(gx, gy, w, h); x.restore();
}
const hl = (c) => ({ c, a: 0.3 });   // top-edge specular tint

// ---- materials --------------------------------------------------------------
function drawStick(x, body, lit, shadow) {
  body = body || '#6e5230';
  lit = lit || '#8a6a3c';
  shadow = shadow || '#4a3618';
  // A crooked twig with a lighter lit edge and a small branch.
  px(x, body, 7, 2, 2, 13);   // body
  px(x, lit, 7, 2, 1, 13);    // lit left edge
  px(x, shadow, 8, 2, 1, 13); // shadow right edge
  px(x, body, 5, 5, 2, 2);    // branch nub
  px(x, shadow, 6, 6, 1, 1);
  px(x, lit, 9, 9, 3, 2);     // branch nub
  px(x, shadow, 11, 10, 1, 1);
}

function drawCoal(x, charcoal) {
  const base = charcoal ? '#3a2a22' : '#2b2b2b';
  const mid  = charcoal ? '#4d382c' : '#404040';
  const lit  = charcoal ? '#6b4a38' : '#5a5a5a';
  // Chunky lump silhouette.
  px(x, base, 4, 5, 8, 7);
  px(x, base, 5, 4, 6, 1);
  px(x, base, 5, 12, 6, 1);
  px(x, base, 3, 6, 1, 5);
  px(x, base, 12, 6, 1, 5);
  // Lighter top-left face.
  px(x, mid, 5, 5, 5, 4);
  px(x, lit, 5, 5, 2, 2);
  // Deep shadow bottom-right.
  px(x, charcoal ? '#241a14' : '#1c1c1c', 8, 9, 4, 3);
  // A couple of bright flecks (mineral shine).
  px(x, charcoal ? '#8a6450' : '#777', 6, 5, 1, 1);
  px(x, charcoal ? '#7a5640' : '#6a6a6a', 10, 6, 1, 1);
}

// Iron / gold share one ingot silhouette, recoloured.
function drawIngot(x, hi, mid, lo) {
  // Trapezoidal ingot, viewed from the front.
  px(x, mid, 3, 7, 10, 5);          // body
  px(x, mid, 4, 6, 8, 1);           // top bevel face
  px(x, hi,  4, 6, 8, 1);           // bright top edge
  px(x, hi,  3, 7, 1, 5);           // left highlight
  px(x, lo,  12, 7, 1, 5);          // right shadow
  px(x, lo,  3, 11, 10, 1);         // bottom shadow line
  // Soft specular sweep on the top face.
  pxa(x, hl('#ffffff'), 5, 7, 6, 1);
}

function drawDiamond(x) {
  // Classic Minecraft diamond gem: faceted rhombus.
  const cx = 8;
  // outline / dark facet edges
  const o = '#1f6e6a';
  px(x, '#3eb48c', cx, 2, 1, 1);    // top tip
  px(x, o, cx - 1, 3, 3, 1); px(x, '#5fd0a8', cx, 3, 1, 1);
  px(x, '#4ec6a0', cx - 2, 4, 5, 2);
  px(x, '#4ec6a0', cx - 3, 6, 7, 2);
  px(x, '#3eb48c', cx - 3, 8, 7, 1);
  px(x, o, cx - 2, 9, 1, 1); px(x, o, cx + 2, 9, 1, 1);
  px(x, '#3eb48c', cx - 1, 9, 3, 1);
  px(x, '#6fe0b8', cx, 10, 1, 1);    // bottom tip
  // Bright upper-left facets.
  px(x, '#8ff0d0', cx - 2, 4, 2, 1);
  px(x, '#6fe0b8', cx - 2, 5, 1, 1);
  // Sparkle dot.
  px(x, '#e8fff6', cx - 1, 3, 1, 1);
}

function drawWheat(x) {
  // Pale golden stalk with a grain head.
  // stalk
  px(x, '#caa84a', 8, 8, 1, 6);
  px(x, '#a88832', 8, 8, 1, 6);
  px(x, '#e0c25e', 8, 8, 1, 6);
  // grain head — pairs of kernels either side
  const k = '#e0c060', k2 = '#c0a040';
  for (let i = 0; i < 4; i++) {
    const y = 3 + i * 2;
    px(x, k, 7, y, 1, 1); px(x, k2, 6, y + 1, 1, 1);
    px(x, k, 9, y, 1, 1); px(x, k2, 10, y + 1, 1, 1);
  }
  // top tuft
  px(x, k, 8, 2, 1, 1);
  // a leaf
  px(x, '#9aa83a', 10, 9, 2, 1);
  px(x, '#7a8628', 11, 10, 1, 1);
}

function drawSeeds(x) {
  // A small mound of wheat seeds (golden ovals) plus a green sprout.
  const seed = '#c8a838', seedD = '#9a8024';
  const pts = [[4,9],[5,9],[7,10],[8,9],[9,10],[10,9],[6,10],[11,10],[5,10]];
  for (const [sx, sy] of pts) { px(x, seed, sx, sy, 1, 1); px(x, seedD, sx, sy + 1, 1, 1); }
  // sprout
  px(x, '#5aa83a', 8, 5, 1, 4);
  px(x, '#7cc84a', 6, 6, 2, 1);
  px(x, '#7cc84a', 9, 7, 2, 1);
}

function drawBread(x) {
  // Brown loaf with a split top crust and a dusting of flour.
  px(x, '#b07a3a', 3, 7, 10, 5);    // body
  px(x, '#c88a44', 4, 6, 8, 1);     // top crust
  px(x, '#8a5e28', 3, 11, 10, 1);   // bottom shadow
  px(x, '#8a5e28', 2, 8, 1, 3); px(x, '#8a5e28', 13, 8, 1, 3);
  // diagonal slash marks on the crust
  px(x, '#7a4e20', 5, 7, 1, 2);
  px(x, '#7a4e20', 8, 7, 1, 2);
  px(x, '#7a4e20', 11, 7, 1, 2);
  // highlight + flour dust
  pxa(x, hl('#ffffff'), 5, 6, 6, 1);
  px(x, '#e8d8a8', 7, 8, 1, 1);
  px(x, '#e8d8a8', 10, 9, 1, 1);
}

function drawApple(x, cooked) {
  const skin = cooked ? '#9a4a2a' : '#c43030';
  const skinHi = cooked ? '#c46a3a' : '#e85050';
  const flesh = cooked ? '#e0a878' : '#f88';
  // round body
  px(x, skin, 5, 5, 6, 8);
  px(x, skin, 4, 6, 1, 6); px(x, skin, 11, 6, 1, 6);
  px(x, skin, 6, 4, 4, 1); px(x, skin, 6, 13, 4, 1);
  // lit upper-left
  px(x, skinHi, 5, 5, 3, 4);
  px(x, flesh, 5, 5, 2, 2);
  // shadow bottom-right
  px(x, cooked ? '#6e2e18' : '#8a1818', 9, 10, 2, 3);
  // stem
  px(x, '#5a3a1a', 8, 2, 1, 3);
  // leaf
  px(x, '#4a9a2a', 9, 2, 2, 1); px(x, '#3a7a1e', 10, 3, 1, 1);
}

// Generic raw/cooked meat slab. `cooked` swaps to a roasted palette + bone.
function drawMeat(x, hi, mid, lo, cooked) {
  // rounded slab
  px(x, mid, 4, 5, 8, 7);
  px(x, mid, 5, 4, 6, 1); px(x, mid, 5, 12, 6, 1);
  px(x, mid, 3, 6, 1, 5); px(x, mid, 12, 6, 1, 5);
  // lit top
  px(x, hi, 5, 5, 6, 3);
  // char / shadow bottom
  px(x, lo, 5, 10, 6, 2);
  px(x, lo, 4, 9, 1, 2); px(x, lo, 11, 9, 1, 2);
  if (cooked) {
    // grill char marks
    px(x, '#3a2412', 6, 8, 4, 1);
    px(x, '#3a2412', 7, 11, 3, 1);
    // glisten
    pxa(x, hl('#ffd0a0'), 5, 5, 3, 1);
  } else {
    // raw sheen
    pxa(x, hl('#ffffff'), 5, 5, 4, 1);
    // fat streak
    px(x, '#f0e0c8', 6, 8, 2, 1);
  }
}

function drawLeather(x) {
  // A tanned hide: rounded brown shape with stitching holes.
  px(x, '#8a5a2a', 4, 4, 8, 8);
  px(x, '#8a5a2a', 3, 5, 1, 6); px(x, '#8a5a2a', 12, 5, 1, 6);
  px(x, '#6e4418', 4, 4, 8, 1);   // top shadow
  px(x, '#a87a44', 4, 11, 8, 1);  // bottom highlight
  // lit area
  px(x, '#a87a44', 5, 5, 4, 3);
  // stitching holes around the edge
  const hole = '#3a2410';
  for (const [hx2, hy] of [[5,4],[8,4],[11,4],[4,6],[4,9],[12,6],[12,9],[5,11],[8,11],[11,11]]) px(x, hole, hx2, hy, 1, 1);
}

function drawFeather(x) {
  // White quill with a barred vane and dark tip.
  // rachis (shaft)
  px(x, '#e8e8d8', 11, 3, 1, 10);
  px(x, '#b8b8a8', 11, 3, 1, 10);
  // vane — left leaning barbs
  for (let i = 0; i < 6; i++) {
    const y = 3 + i * 2, len = 4 - Math.abs(i - 2);
    px(x, '#f4f4ec', 11 - len, y, len, 1);
    px(x, '#c8c8b8', 11 - len, y + 1, len, 1);
  }
  // dark tip
  px(x, '#3a3a3a', 4, 4, 2, 2);
  px(x, '#5a5a5a', 3, 5, 1, 1);
}

function drawWool(x) {
  // Fluffy white block with soft puffs.
  px(x, '#e8e8e8', 3, 4, 10, 9);
  px(x, '#f8f8f8', 4, 5, 8, 7);    // bright top
  px(x, '#c4c4c4', 3, 12, 10, 1);  // bottom shadow
  // tuft bumps around the edge
  const t = '#f0f0f0';
  for (const [wx, wy] of [[4,3],[7,3],[10,3],[3,6],[12,6],[3,9],[12,9]]) px(x, t, wx, wy, 1, 1);
  // faint grey shadows for depth
  px(x, '#d0d0d0', 6, 10, 2, 1);
  px(x, '#d0d0d0', 9, 7, 2, 1);
}

function drawBone(x) {
  // White dog-leg bone with knobby ends.
  const b = '#f0f0e8', sh = '#b8b8a8';
  // shaft
  px(x, b, 6, 6, 5, 4);
  px(x, sh, 6, 9, 5, 1);
  // knobs (2 at each end)
  px(x, b, 4, 4, 2, 2); px(x, b, 4, 9, 2, 2);
  px(x, b, 11, 4, 2, 2); px(x, b, 11, 9, 2, 2);
  px(x, b, 5, 3, 1, 1); px(x, b, 5, 11, 1, 1);
  px(x, b, 11, 3, 1, 1); px(x, b, 11, 11, 1, 1);
  // shadows
  px(x, sh, 4, 5, 1, 1); px(x, sh, 11, 5, 1, 1);
  px(x, sh, 4, 10, 1, 1); px(x, sh, 11, 10, 1, 1);
  // highlight on shaft
  px(x, '#ffffff', 7, 6, 2, 1);
}

function drawString(x) {
  // A pale coiled thread with loose ends.
  const c2 = '#e8e0c8', sh = '#b8b090';
  // coils
  px(x, c2, 5, 4, 6, 1);
  px(x, c2, 4, 5, 1, 4); px(x, c2, 11, 5, 1, 4);
  px(x, c2, 5, 8, 6, 1);
  px(x, sh, 5, 5, 1, 3); px(x, sh, 10, 5, 1, 3);
  // loose strands
  px(x, c2, 8, 8, 1, 3);
  px(x, c2, 6, 8, 1, 2); px(x, c2, 10, 8, 1, 2);
  px(x, sh, 7, 10, 1, 1); px(x, sh, 9, 10, 1, 1);
}

function drawGunpowder(x) {
  // Dark grey pile with a few sulfur specks.
  const g = '#4a4a4a', g2 = '#5e5e5e', g3 = '#363636';
  px(x, g, 4, 7, 8, 4);
  px(x, g, 3, 8, 1, 2); px(x, g, 12, 8, 1, 2);
  px(x, g, 5, 6, 6, 1); px(x, g, 5, 11, 6, 1);
  px(x, g2, 5, 7, 5, 2);             // lit top
  px(x, g3, 4, 10, 8, 1);            // shadow
  // yellow sulfur + a faint red fleck
  px(x, '#d8c84a', 6, 7, 1, 1);
  px(x, '#d8c84a', 9, 8, 1, 1);
  px(x, '#b85a3a', 7, 9, 1, 1);
}

function drawFlint(x) {
  // Dark glassy shard with a conchoidal highlight.
  px(x, '#2a2a30', 5, 4, 6, 8);
  px(x, '#2a2a30', 4, 5, 1, 6); px(x, '#2a2a30', 11, 5, 1, 6);
  px(x, '#2a2a30', 6, 3, 4, 1); px(x, '#2a2a30', 6, 12, 4, 1);
  px(x, '#3e3e48', 5, 5, 4, 4);      // lighter face
  px(x, '#52525e', 5, 5, 2, 2);      // highlight
  px(x, '#16161a', 8, 9, 4, 3);      // deep edge
  // bright shell-fracture line
  px(x, '#8a8a98', 6, 5, 1, 3);
}

function drawArrow(x) {
  // Arrow pointing up-right: flint head, stick shaft, feather fletching.
  // shaft
  px(x, '#a07840', 4, 12, 8, 1);
  px(x, '#7a5a28', 4, 12, 8, 1);
  // head (flint)
  px(x, '#3a3a40', 12, 3, 2, 2);
  px(x, '#5a5a62', 12, 3, 1, 1);
  px(x, '#2a2a30', 13, 4, 1, 1);
  // fletching (tail) — green-ish
  px(x, '#c8c858', 2, 11, 2, 1); px(x, '#c8c858', 3, 12, 2, 1);
  px(x, '#a8a840', 2, 12, 1, 1);
  // metal/iron band
  px(x, '#9a9a9a', 11, 4, 1, 1);
}

function drawEgg(x) {
  // Pale oval egg with a soft speckle.
  px(x, '#f0e8d8', 6, 3, 4, 10);
  px(x, '#f0e8d8', 5, 5, 1, 6); px(x, '#f0e8d8', 10, 5, 1, 6);
  px(x, '#f8f4e8', 6, 4, 3, 5);   // lit face
  px(x, '#d8cfb8', 9, 9, 1, 4);   // shadow side
  px(x, '#d8cfb8', 6, 12, 4, 1);  // bottom
  // speckles
  px(x, '#c8b890', 8, 7, 1, 1);
  px(x, '#c8b890', 7, 10, 1, 1);
  // specular dot
  px(x, '#ffffff', 6, 5, 1, 1);
}

function drawBucket(x) {
  // Iron bucket: trapezoidal body, handle, rim.
  const m = '#c8c8c8', d = '#9a9a9a', dk = '#6e6e6e';
  // rim
  px(x, m, 3, 3, 9, 1);
  px(x, d, 3, 4, 9, 1);
  // body tapering down
  px(x, m, 4, 5, 7, 8);
  px(x, d, 4, 12, 7, 1);
  px(x, m, 5, 13, 5, 1);
  // side shading
  px(x, d, 4, 5, 1, 8); px(x, dk, 10, 6, 1, 6);
  // highlight stripe
  px(x, '#e8e8e8', 5, 6, 1, 5);
  // handle
  px(x, d, 2, 4, 1, 1); px(x, d, 12, 4, 1, 1);
  px(x, d, 1, 5, 1, 1); px(x, d, 14, 5, 1, 1);
}

function drawWaterBucket(x) {
  // Bucket filled with water (blue).
  const m = '#c8c8c8', d = '#9a9a9a', dk = '#6e6e6e';
  // water fill
  px(x, '#2f6fd0', 4, 4, 7, 8);
  px(x, '#5a9bf0', 4, 4, 7, 1);
  px(x, '#1f4f9f', 4, 11, 7, 1);
  px(x, '#3f7fe0', 5, 5, 5, 6);
  // rim + body
  px(x, m, 3, 3, 9, 1);
  px(x, d, 3, 4, 9, 1);
  px(x, m, 4, 5, 7, 8);
  px(x, d, 4, 12, 7, 1);
  px(x, m, 5, 13, 5, 1);
  px(x, d, 4, 5, 1, 8); px(x, dk, 10, 6, 1, 6);
  px(x, '#e8e8e8', 5, 6, 1, 5);
  // handle
  px(x, d, 2, 4, 1, 1); px(x, d, 12, 4, 1, 1);
  px(x, d, 1, 5, 1, 1); px(x, d, 14, 5, 1, 1);
}

function drawBed(x) {
  // Mini top-down bed: red sheet, pillow, wood frame.
  // frame
  px(x, '#6e4a24', 2, 2, 12, 12);
  // mattress / sheet
  px(x, '#b83a3a', 3, 4, 10, 9);
  px(x, '#d85a5a', 3, 4, 10, 1);    // bright top hem
  // pillow
  px(x, '#f0f0e8', 3, 3, 10, 1);
  px(x, '#d8d8c8', 3, 3, 10, 1);
  // quilt lines
  px(x, '#9a2a2a', 3, 8, 10, 1);
  px(x, '#9a2a2a', 3, 11, 10, 1);
  // frame shadow
  px(x, '#4a2e14', 2, 13, 12, 1);
}

// ---- spider eye / prismite gem ---------------------------------------------
function drawSpiderEye(x) {
  // Red orb with black pupil and green iris ring
  px(x, '#aa1111', 4, 3, 8, 8);
  px(x, '#cc2222', 4, 3, 8, 1);
  px(x, '#881111', 4, 10, 8, 1);
  px(x, '#882222', 4, 3, 1, 8);
  px(x, '#661111', 11, 3, 1, 8);
  // iris
  px(x, '#226622', 6, 5, 4, 4);
  // pupil
  px(x, '#111111', 7, 6, 2, 2);
  // highlight
  px(x, '#ff8888', 5, 4, 2, 1);
}

function drawPrismiteGem(x) {
  // Angular red-green crystalline gem
  px(x, '#30a040', 4, 2, 8, 10);
  px(x, '#40c050', 4, 2, 8, 1);
  px(x, '#208030', 4, 11, 8, 1);
  px(x, '#288838', 4, 2, 1, 10);
  px(x, '#186828', 11, 2, 1, 10);
  // red facets
  px(x, '#c03030', 5, 4, 3, 3);
  px(x, '#e04848', 5, 4, 3, 1);
  px(x, '#a02020', 6, 8, 4, 2);
  // green facets
  px(x, '#30c040', 9, 5, 2, 4);
  px(x, '#50e060', 9, 5, 2, 1);
  // sparkle
  px(x, '#aaffaa', 6, 3, 1, 1);
  px(x, '#ffaaaa', 10, 9, 1, 1);
  // outline
  px(x, '#185820', 4, 2, 1, 1); px(x, '#185820', 11, 2, 1, 1);
  px(x, '#185820', 4, 11, 1, 1); px(x, '#185820', 11, 11, 1, 1);
}

// ---- New BlockForge food icons ----
function drawGoldenApple(x) {
  // Gold apple with leaf
  px(x, '#f5d020', 5, 4, 6, 6);
  px(x, '#fff060', 5, 4, 6, 1);
  px(x, '#c8a010', 5, 9, 6, 1);
  px(x, '#c8a010', 5, 4, 1, 6);
  px(x, '#fff060', 10, 4, 1, 6);
  px(x, '#3a7a2a', 7, 2, 2, 2);   // stem/leaf
  px(x, '#5aa040', 7, 2, 1, 1);
  // sparkle
  px(x, '#ffffff', 6, 5, 1, 1);
}
function drawCookie(x) {
  px(x, '#c8924a', 4, 4, 8, 8);
  px(x, '#e0a860', 4, 4, 8, 1);
  px(x, '#a8722e', 4, 11, 8, 1);
  // chocolate chips
  px(x, '#5a3018', 6, 6, 1, 1);
  px(x, '#5a3018', 9, 7, 1, 1);
  px(x, '#5a3018', 7, 9, 1, 1);
  px(x, '#5a3018', 10, 10, 1, 1);
}
function drawMelonSlice(x) {
  // Red wedge with green rind
  px(x, '#3aaa3a', 3, 8, 10, 3);   // rind
  px(x, '#3aaa3a', 3, 8, 1, 4);
  px(x, '#f04848', 4, 7, 9, 2);    // flesh
  px(x, '#e83838', 4, 7, 9, 1);
  px(x, '#d82828', 4, 8, 9, 1);
  // seeds
  px(x, '#2a1a10', 6, 7, 1, 1);
  px(x, '#2a1a10', 9, 7, 1, 1);
}
function drawCarrot(x, main, dark) {
  // Triangle body pointing down + green top
  px(x, main, 7, 6, 2, 2);
  px(x, main, 6, 8, 4, 2);
  px(x, dark, 6, 9, 4, 1);
  px(x, main, 7, 10, 2, 2);
  px(x, dark, 7, 11, 2, 1);
  // leaves
  px(x, '#3a8a2a', 6, 3, 1, 3);
  px(x, '#4aa838', 7, 2, 2, 4);
  px(x, '#3a8a2a', 9, 3, 1, 3);
}
function drawPotato(x, main, dark) {
  px(x, main, 4, 5, 8, 7);
  px(x, '#ffffff', 4, 5, 8, 1);
  px(x, dark, 4, 11, 8, 1);
  px(x, dark, 4, 5, 1, 7);
  px(x, '#ffffff', 11, 5, 1, 7);
  // eyes
  px(x, dark, 6, 7, 1, 1);
  px(x, dark, 9, 8, 1, 1);
  px(x, dark, 7, 10, 1, 1);
}
function drawPumpkinPie(x) {
  // Crust + orange filling + dollop
  px(x, '#c89040', 3, 9, 10, 4);   // crust
  px(x, '#e0a860', 3, 9, 10, 1);
  px(x, '#e88820', 4, 6, 8, 3);    // filling
  px(x, '#f8a030', 4, 6, 8, 1);
  px(x, '#d87810', 4, 8, 8, 1);
  px(x, '#fff0e0', 7, 4, 2, 2);    // whipped cream
}

function drawEmerald(x) {
  // Emerald gem — hexagonal gem with facet shine
  px(x, '#1a7a30', 5, 4, 6, 8);   // body
  px(x, '#30b050', 5, 4, 6, 2);    // top face
  px(x, '#50d870', 6, 5, 4, 4);    // lit facet
  px(x, '#80f898', 6, 5, 2, 2);    // specular highlight
  px(x, '#0e5a20', 5, 11, 6, 1);   // bottom edge
  // crown
  px(x, '#30b050', 6, 3, 4, 1);
  px(x, '#1a7a30', 7, 2, 2, 1);
}

function drawPortalOrb(x) {
  // Glowing cyan portal orb — swirl core with energy ring
  px(x, '#0a3050', 4, 4, 8, 8);    // dark core base
  px(x, '#105880', 4, 4, 8, 2);    // top of core
  px(x, '#20a0d0', 5, 5, 6, 5);    // orb body
  px(x, '#40d0f0', 6, 5, 4, 3);    // lit face
  px(x, '#a0f0ff', 6, 5, 2, 2);    // specular
  px(x, '#e0ffff', 7, 5, 1, 1);    // hot center
  px(x, '#40d0f0', 5, 4, 1, 1);    // top sparkle
  px(x, '#40d0f0', 10, 6, 1, 1);   // side sparkle
  px(x, '#20a0d0', 10, 9, 1, 1);   // lower sparkle
  px(x, '#0a3050', 5, 11, 6, 1);   // shadow
  // ring
  px(x, '#00e0c0', 3, 7, 1, 2);
  px(x, '#00e0c0', 12, 7, 1, 2);
  px(x, '#00e0c0', 7, 3, 2, 1);
  px(x, '#00e0c0', 7, 12, 2, 1);
}

function drawNullShard(x) {
  // Dark jagged shard — void energy crystal
  px(x, '#1a0a2e', 7, 2, 2, 10);   // main shard body
  px(x, '#2a1040', 6, 3, 1, 8);    // left edge
  px(x, '#2a1040', 9, 3, 1, 8);    // right edge
  px(x, '#3a1850', 7, 3, 2, 6);    // mid body
  px(x, '#5020a0', 7, 4, 2, 3);    // glow core
  px(x, '#8040e0', 7, 5, 1, 1);    // bright center
  px(x, '#4a1880', 5, 6, 1, 2);    // left spike
  px(x, '#4a1880', 10, 5, 1, 3);   // right spike
  px(x, '#6030c0', 8, 4, 1, 1);    // sparkle
  px(x, '#0a0018', 7, 12, 2, 1);   // base shadow
}

function drawMemoryShard(x) {
  // Glowing memory fragment — cyan-blue crystalline shard
  px(x, '#0a2a40', 7, 2, 2, 10);   // main body
  px(x, '#104060', 6, 3, 1, 8);    // left edge
  px(x, '#104060', 9, 3, 1, 8);    // right edge
  px(x, '#2080b0', 7, 3, 2, 6);    // mid glow
  px(x, '#40c0f0', 7, 4, 2, 3);    // bright core
  px(x, '#80e0ff', 7, 5, 1, 1);    // specular
  px(x, '#30a0d0', 5, 6, 1, 2);    // left wisp
  px(x, '#30a0d0', 10, 5, 1, 3);   // right wisp
  px(x, '#60d8ff', 8, 4, 1, 1);    // sparkle
  px(x, '#040a10', 7, 12, 2, 1);   // base shadow
}

function drawParadoxCore(x) {
  // Swirling paradox core — magenta/purple orb with rift energy
  px(x, '#2a0040', 4, 4, 8, 8);    // dark base
  px(x, '#5010a0', 5, 5, 6, 5);    // orb body
  px(x, '#8020e0', 6, 5, 4, 4);    // inner glow
  px(x, '#c040ff', 7, 6, 2, 2);    // bright core
  px(x, '#e0a0ff', 7, 6, 1, 1);    // hot center
  px(x, '#a030e0', 5, 4, 1, 1);    // top flare
  px(x, '#a030e0', 10, 7, 1, 1);   // side flare
  px(x, '#6020b0', 6, 10, 4, 1);   // bottom glow
  px(x, '#200030', 5, 11, 6, 1);   // shadow
  // Rift cracks
  px(x, '#ff40c0', 6, 7, 1, 1);
  px(x, '#ff40c0', 9, 5, 1, 1);
}

function drawLavaBucket(x) {
  // Bucket shape with lava glow inside
  px(x, '#707070', 3, 3, 10, 2);   // rim
  px(x, '#8a8a8a', 3, 3, 10, 1);   // rim highlight
  px(x, '#606060', 3, 5, 1, 8);    // left wall
  px(x, '#606060', 12, 5, 1, 8);   // right wall
  px(x, '#505050', 4, 12, 8, 1);   // bottom
  px(x, '#ff7a20', 5, 6, 6, 5);    // lava
  px(x, '#ffb040', 6, 6, 4, 2);    // lava glow
  px(x, '#ffe080', 7, 6, 2, 1);    // hot top
  px(x, '#ff7a20', 9, 9, 1, 2);    // drip
}

function drawVoidPearl(x) {
  // Dark teal orb with green swirl
  px(x, '#0a3520', 4, 4, 8, 8);    // base
  px(x, '#11663a', 5, 5, 6, 6);    // body
  px(x, '#22c070', 6, 5, 4, 4);    // inner glow
  px(x, '#40e090', 7, 6, 2, 2);    // bright center
  px(x, '#30a058', 5, 4, 1, 1);    // top glint
  px(x, '#30a058', 10, 7, 1, 1);   // side glint
  px(x, '#083020', 5, 11, 6, 1);   // shadow
}

function drawRiftEye(x) {
  // Purple pearl with vertical eye
  px(x, '#3a1050', 4, 3, 8, 10);   // base orb
  px(x, '#602070', 5, 4, 6, 8);    // body
  px(x, '#9020a0', 6, 4, 4, 8);    // inner
  px(x, '#d040e0', 7, 4, 2, 8);    // vertical eye
  px(x, '#e080f0', 7, 5, 1, 6);    // eye highlight
  px(x, '#401060', 5, 12, 6, 1);   // shadow
}

function drawEndStoneItem(x) {
  // Pale block with speckle pattern
  px(x, '#d8c888', 4, 3, 8, 9);    // body
  px(x, '#e8dc98', 4, 3, 8, 1);    // top edge
  px(x, '#c8b878', 5, 4, 6, 7);    // front
  px(x, '#e8d8a0', 5, 4, 1, 1);    // speckle
  px(x, '#f0e4b0', 7, 6, 1, 1);    // speckle
  px(x, '#c0a868', 9, 8, 1, 1);    // speckle
  px(x, '#a89058', 4, 12, 8, 1);   // shadow
}

function drawDragonScales(x) {
  // Stack of overlapping dark emerald scales
  px(x, '#0a3a2a', 4, 4, 8, 8);    // base
  px(x, '#14523a', 5, 5, 6, 6);    // mid
  px(x, '#1e6a48', 4, 5, 4, 2);    // scale top
  px(x, '#1e6a48', 8, 6, 4, 2);    // scale mid
  px(x, '#1e6a48', 5, 8, 4, 2);    // scale low
  px(x, '#2a8a60', 5, 5, 2, 1);    // highlight
  px(x, '#3ab078', 5, 6, 1, 1);    // sparkle
  px(x, '#06281c', 5, 11, 6, 1);   // shadow
}

function drawDragonHeart(x) {
  // Beating dragon heart — dark red orb with pulse
  px(x, '#401020', 4, 4, 8, 8);    // base
  px(x, '#a02848', 5, 5, 6, 6);    // heart body
  px(x, '#d04868', 6, 5, 4, 4);    // inner
  px(x, '#ff7090', 7, 6, 2, 2);    // pulse center
  px(x, '#ffa0b8', 7, 6, 1, 1);    // hot dot
  px(x, '#d04868', 7, 4, 1, 1);    // top pulse
  px(x, '#d04868', 10, 8, 1, 1);   // side pulse
  px(x, '#300c18', 5, 11, 6, 1);   // shadow
}

function drawDye(x, col) {
  // Small pile of dye powder
  px(x, col, 5, 8, 6, 4);          // base pile
  px(x, col, 6, 7, 4, 1);          // top of pile
  px(x, col, 7, 6, 2, 1);          // peak
  // lighter highlight on top
  const hi = col.replace(/[0-9a-f]{2}$/i, (m) => {
    const v = Math.min(255, parseInt(m, 16) + 60);
    return v.toString(16).padStart(2, '0');
  });
  px(x, hi, 7, 7, 2, 1);
  // dark shadow on bottom
  px(x, '#2a2a2a', 5, 12, 6, 1);
}

function drawBoneMeal(x) {
  // White powder pile
  px(x, '#e8e0d0', 5, 8, 6, 4);
  px(x, '#e8e0d0', 6, 7, 4, 1);
  px(x, '#e8e0d0', 7, 6, 2, 1);
  px(x, '#f8f0e0', 7, 7, 2, 1);    // highlight
  px(x, '#c8c0b0', 5, 12, 6, 1);   // shadow
}

function drawNameTag(x) {
  // Rectangular tag with string
  px(x, '#d8b870', 4, 3, 8, 10);   // tag body
  px(x, '#e8c880', 4, 3, 8, 1);    // top highlight
  px(x, '#a88840', 4, 12, 8, 1);   // bottom shadow
  px(x, '#a88840', 11, 3, 1, 10);  // right edge
  // hole
  px(x, '#4a3618', 7, 4, 2, 2);
  // string loop
  px(x, '#8a8a8a', 7, 1, 2, 3);
  px(x, '#6a6a6a', 7, 1, 1, 3);
  // text lines
  px(x, '#5a3a10', 5, 8, 5, 1);
  px(x, '#5a3a10', 5, 10, 4, 1);
}

function drawSaddle(x) {
  // Leather saddle with iron stirrups
  px(x, '#8a5020', 3, 6, 10, 4);   // seat
  px(x, '#a06830', 3, 6, 10, 2);   // seat highlight
  px(x, '#6a3818', 3, 9, 10, 1);   // seat shadow
  // flaps
  px(x, '#8a5020', 2, 5, 2, 5);
  px(x, '#a06830', 2, 5, 1, 5);
  px(x, '#8a5020', 12, 5, 2, 5);
  px(x, '#a06830', 12, 5, 1, 5);
  // stirrups
  px(x, '#888', 2, 11, 2, 2);
  px(x, '#aaa', 2, 11, 2, 1);
  px(x, '#888', 12, 11, 2, 2);
  px(x, '#aaa', 12, 11, 2, 1);
  // strap
  px(x, '#6a3818', 4, 11, 8, 1);
}

function drawLead(x) {
  // Lead/leash — coiled rope with hook
  px(x, '#8a7a5a', 5, 6, 6, 5);    // coiled rope body
  px(x, '#a09070', 5, 6, 6, 2);    // top highlight
  px(x, '#6a5a3a', 5, 10, 6, 1);   // bottom shadow
  px(x, '#a09070', 6, 7, 4, 3);    // inner coil
  // hook at end
  px(x, '#888', 12, 4, 1, 3);
  px(x, '#aaa', 12, 4, 1, 1);
  px(x, '#888', 11, 3, 2, 1);
  px(x, '#888', 11, 7, 2, 1);
}

function drawGreenstoneDust(x) {
  // Small pile of glowing green dust particles
  px(x, '#20c040', 5, 8, 6, 4);   // base pile
  px(x, '#20c040', 6, 7, 4, 1);
  px(x, '#20c040', 7, 6, 2, 1);
  px(x, '#40e860', 6, 8, 4, 2);   // glow highlight
  px(x, '#60ff80', 7, 7, 2, 1);   // bright speck
  px(x, '#108020', 5, 12, 6, 1);  // shadow
  // scattered dust particles
  px(x, '#30d050', 3, 9, 1, 1);
  px(x, '#30d050', 12, 10, 1, 1);
  px(x, '#50e070', 4, 11, 1, 1);
}

function drawSlimeBall(x) {
  // Green slime ball — roundish blob
  px(x, '#40c020', 5, 5, 6, 7);    // body
  px(x, '#40c020', 4, 6, 1, 5);
  px(x, '#40c020', 11, 6, 1, 5);
  px(x, '#40c020', 6, 4, 4, 1);
  px(x, '#60e040', 5, 5, 4, 4);    // highlight
  px(x, '#80ff60', 6, 5, 2, 2);    // specular
  px(x, '#308010', 5, 11, 6, 1);   // shadow
  px(x, '#308010', 4, 10, 1, 2);
}

function drawFlintSteel(x) {
  // Flint and steel — L-shaped iron piece + flint
  // Iron (silver) part
  px(x, '#c0c0c0', 6, 2, 4, 3);
  px(x, '#a0a0a0', 6, 5, 2, 6);
  px(x, '#c0c0c0', 5, 5, 1, 5);
  px(x, '#e0e0e0', 7, 3, 2, 1);   // highlight
  // Flint (dark gray)
  px(x, '#555', 9, 2, 3, 3);
  px(x, '#666', 10, 1, 2, 1);
  px(x, '#444', 9, 5, 3, 1);
  // Spark
  px(x, '#ff8800', 8, 1, 1, 1);
  px(x, '#ffcc00', 9, 0, 1, 1);
}

// ---- armor icons -----------------------------------------------------------
function drawArmorIcon(x, armorInfo, itemId) {
  // Color palettes per material
  const palettes = {
    LEATHER:  { main: '#a06030', dark: '#704020', lit: '#c88050', mid: '#8a5028' },
    CHAIN:    { main: '#c8c8c8', dark: '#888888', lit: '#e8e8e8', mid: '#aaaaaa' },
    IRON:     { main: '#e0e0e0', dark: '#a0a0a0', lit: '#f8f8f8', mid: '#c0c0c0' },
    GOLD:     { main: '#fce040', dark: '#c8a020', lit: '#fff878', mid: '#d8c030' },
    DIAMOND:  { main: '#50d8b0', dark: '#309878', lit: '#80f0d8', mid: '#40b890' },
    PRISMITE: { main: '#40c850', dark: '#208030', lit: '#60e870', mid: '#30a040' },
  };
  const matName = armorInfo.material || 'IRON';
  const p = palettes[matName] || palettes.IRON;
  const piece = itemId >= 532 && itemId <= 535 ? 'LEATHER' :
                itemId >= 536 && itemId <= 539 ? 'CHAIN' :
                itemId >= 540 && itemId <= 543 ? 'IRON' :
                itemId >= 544 && itemId <= 547 ? 'GOLD' :
                itemId >= 548 && itemId <= 551 ? 'DIAMOND' : 'PRISMITE';
  const isPrismite = matName === 'PRISMITE';

  if (armorInfo.slotIdx === 0) {
    // Helmet: dome shape
    if (isPrismite) {
      // Left half red, right half green
      px(x, '#c03030', 4, 4, 4, 6);
      px(x, '#28b838', 8, 4, 4, 6);
      px(x, '#e04848', 4, 4, 4, 1);
      px(x, '#48e858', 8, 4, 4, 1);
      px(x, '#a02020', 4, 9, 4, 1);
      px(x, '#187020', 8, 9, 4, 1);
      px(x, '#801818', 4, 4, 1, 6);
      px(x, '#156820', 11, 4, 1, 6);
      px(x, '#c03030', 5, 3, 3, 1);
      px(x, '#28b838', 8, 3, 3, 1);
      px(x, '#c03030', 6, 2, 2, 1);
      px(x, '#28b838', 8, 2, 2, 1);
    } else {
      px(x, p.main, 4, 4, 8, 6);
      px(x, p.lit, 4, 4, 8, 1);
      px(x, p.dark, 4, 9, 8, 1);
      px(x, p.dark, 4, 4, 1, 6);
      px(x, p.mid, 11, 4, 1, 6);
      px(x, p.main, 5, 3, 6, 1);
      px(x, p.main, 6, 2, 4, 1);
    }
    // face opening
    px(x, '#333', 5, 10, 6, 3);
    px(x, p.dark, 5, 10, 6, 1);
  } else if (armorInfo.slotIdx === 1) {
    // Chestplate: wide torso
    if (isPrismite) {
      px(x, '#c03030', 3, 2, 5, 10);
      px(x, '#28b838', 8, 2, 5, 10);
      px(x, '#e04848', 3, 2, 5, 1);
      px(x, '#48e858', 8, 2, 5, 1);
      px(x, '#a02020', 3, 11, 5, 1);
      px(x, '#187020', 8, 11, 5, 1);
      px(x, '#801818', 3, 2, 1, 10);
      px(x, '#156820', 12, 2, 1, 10);
      px(x, '#333', 1, 2, 2, 4);
      px(x, '#333', 13, 2, 2, 4);
      px(x, '#801818', 1, 2, 2, 1);
      px(x, '#156820', 13, 2, 2, 1);
    } else {
      px(x, p.main, 3, 2, 10, 10);
      px(x, p.lit, 3, 2, 10, 1);
      px(x, p.dark, 3, 11, 10, 1);
      px(x, p.dark, 3, 2, 1, 10);
      px(x, p.mid, 12, 2, 1, 10);
      px(x, '#333', 1, 2, 2, 4);
      px(x, '#333', 13, 2, 2, 4);
      px(x, p.dark, 1, 2, 2, 1);
      px(x, p.dark, 13, 2, 2, 1);
    }
  } else if (armorInfo.slotIdx === 2) {
    // Leggings: two leg columns
    if (isPrismite) {
      px(x, '#c03030', 3, 2, 5, 4);
      px(x, '#28b838', 8, 2, 5, 4);
      px(x, '#e04848', 3, 2, 5, 1);
      px(x, '#48e858', 8, 2, 5, 1);
      px(x, '#a02020', 3, 5, 5, 1);
      px(x, '#187020', 8, 5, 5, 1);
      px(x, '#c03030', 3, 6, 4, 7);
      px(x, '#28b838', 9, 6, 4, 7);
      px(x, '#801818', 3, 6, 1, 7);
      px(x, '#156820', 12, 6, 1, 7);
      px(x, '#801818', 3, 12, 4, 1);
      px(x, '#156820', 9, 12, 4, 1);
    } else {
      px(x, p.main, 3, 2, 10, 4);
      px(x, p.lit, 3, 2, 10, 1);
      px(x, p.dark, 3, 5, 10, 1);
      px(x, p.main, 3, 6, 4, 7);
      px(x, p.main, 9, 6, 4, 7);
      px(x, p.dark, 3, 12, 4, 1);
      px(x, p.dark, 9, 12, 4, 1);
      px(x, p.dark, 3, 6, 1, 7);
      px(x, p.mid, 6, 6, 1, 7);
      px(x, p.mid, 12, 6, 1, 7);
    }
  } else {
    // Boots: short foot shapes
    if (isPrismite) {
      px(x, '#c03030', 3, 7, 4, 5);
      px(x, '#28b838', 9, 7, 4, 5);
      px(x, '#e04848', 3, 7, 4, 1);
      px(x, '#48e858', 9, 7, 4, 1);
      px(x, '#a02020', 3, 11, 4, 1);
      px(x, '#187020', 9, 11, 4, 1);
      px(x, '#801818', 3, 7, 1, 5);
      px(x, '#156820', 12, 7, 1, 5);
      px(x, '#801818', 2, 12, 5, 1);
      px(x, '#156820', 9, 12, 5, 1);
    } else {
      px(x, p.main, 3, 7, 4, 5);
      px(x, p.main, 9, 7, 4, 5);
      px(x, p.lit, 3, 7, 4, 1);
      px(x, p.lit, 9, 7, 4, 1);
      px(x, p.dark, 3, 11, 4, 1);
      px(x, p.dark, 9, 11, 4, 1);
      px(x, p.dark, 3, 7, 1, 5);
      px(x, p.mid, 6, 7, 1, 5);
      px(x, p.mid, 12, 7, 1, 5);
      // soles
      px(x, p.dark, 2, 12, 5, 1);
      px(x, p.dark, 9, 12, 5, 1);
    }
  }
}

// ---- tools ------------------------------------------------------------------
// Shared handle drawing; the per-material palette drives colour and shading.
export const TOOL_PALETTES = {
  WOOD:    { head: '#9c6b3a', mid: '#7a4f24', dark: '#523018', lit: '#b88a52' },
  OAK:     { head: '#9c6b3a', mid: '#7a4f24', dark: '#523018', lit: '#b88a52' },
  JUNGLE:  { head: '#a06028', mid: '#804818', dark: '#583010', lit: '#c07838' },
  BIRCH:   { head: '#d4b878', mid: '#b89858', dark: '#8a7040', lit: '#e8d098' },
  SPRUCE:  { head: '#6a4828', mid: '#503818', dark: '#382810', lit: '#886838' },
  DARK_OAK:{ head: '#4a3018', mid: '#3a2410', dark: '#281808', lit: '#6a4828' },
  ACACIA:  { head: '#b86030', mid: '#984820', dark: '#683010', lit: '#d87840' },
  STONE:   { head: '#9a9a9a', mid: '#7c7c7c', dark: '#545454', lit: '#b6b6b6' },
  IRON:    { head: '#e2e2e2', mid: '#b8b8b8', dark: '#828282', lit: '#f4f4f4' },
  DIAMOND: { head: '#5fe3c0', mid: '#3fb89a', dark: '#247a64', lit: '#8ff0d8' },
  GOLD:    { head: '#fce74a', mid: '#d8b620', dark: '#a07e10', lit: '#fff48a' },
  PRISMITE:{ head: '#40c850', mid: '#2a9038', dark: '#186820', lit: '#60e870' },
  COPPER:  { head: '#e89050', mid: '#c87030', dark: '#a05020', lit: '#f0a868' },
  EMERALD: { head: '#50d870', mid: '#30b050', dark: '#1a7a30', lit: '#80f898' },
};

function drawHandle(x, gx, gy, len) {
  px(x, '#6e5230', gx, gy, 2, len);    // stick body
  px(x, '#8a6a3c', gx, gy, 1, len);    // lit edge
  px(x, '#4a3618', gx + 1, gy, 1, len);// shadow edge
}

function drawToolIcon(x, type, material) {
  const p = TOOL_PALETTES[material] || TOOL_PALETTES.IRON;
  const isPrismite = material === 'PRISMITE';
  if (type === 'pickaxe') {
    drawHandle(x, 7, 6, 9);
    if (isPrismite) {
      // Left half red, right half green
      px(x, '#c03030', 2, 2, 6, 3);
      px(x, '#e04848', 2, 2, 6, 1);
      px(x, '#a02020', 2, 4, 6, 1);
      px(x, '#28b838', 8, 2, 6, 3);
      px(x, '#48e858', 8, 2, 6, 1);
      px(x, '#187020', 8, 4, 6, 1);
      // prong tips
      px(x, '#801818', 1, 3, 2, 3);
      px(x, '#156820', 13, 3, 2, 3);
      px(x, '#c03030', 1, 5, 2, 1); px(x, '#28b838', 13, 5, 2, 1);
      // binding
      px(x, '#888', 7, 5, 2, 1);
    } else {
      // curved head: two prongs dropping at the ends
      px(x, p.head, 2, 2, 12, 3);
      px(x, p.lit,  2, 2, 12, 1);
      px(x, p.mid,  2, 4, 12, 1);
      // prong tips
      px(x, p.dark, 1, 3, 2, 3);
      px(x, p.dark, 13, 3, 2, 3);
      px(x, p.head, 1, 5, 2, 1); px(x, p.head, 13, 5, 2, 1);
      // binding where head meets handle
      px(x, p.dark, 7, 5, 2, 1);
    }
  } else if (type === 'axe') {
    drawHandle(x, 8, 5, 10);
    if (isPrismite) {
      // Left half red, right half green
      px(x, '#c03030', 2, 2, 3, 6);
      px(x, '#e04848', 2, 2, 3, 1);
      px(x, '#a02020', 2, 7, 3, 1);
      px(x, '#28b838', 5, 2, 3, 6);
      px(x, '#48e858', 5, 2, 3, 1);
      px(x, '#187020', 5, 7, 3, 1);
      px(x, '#801818', 2, 3, 1, 4);
      px(x, '#a02020', 3, 3, 1, 4);
      px(x, '#187020', 6, 3, 1, 4);
      px(x, '#c03030', 1, 4, 1, 3);
      // binding
      px(x, '#888', 7, 4, 1, 2);
    } else {
      // blade: thick chunk on the left, tapering
      px(x, p.head, 2, 2, 6, 6);
      px(x, p.lit,  2, 2, 6, 1);
      px(x, p.mid,  2, 7, 6, 1);
      px(x, p.dark, 2, 3, 1, 4);          // back of head
      px(x, p.mid,  4, 3, 2, 4);          // mid facet
      // sharp edge (lighter front)
      px(x, p.lit, 1, 4, 1, 3);
      // binding
      px(x, p.dark, 7, 4, 1, 2);
    }
  } else if (type === 'shovel') {
    drawHandle(x, 7, 6, 9);
    if (isPrismite) {
      // Left half red, right half green
      px(x, '#c03030', 5, 1, 2, 6);
      px(x, '#e04848', 5, 1, 2, 1);
      px(x, '#28b838', 8, 1, 2, 6);
      px(x, '#48e858', 8, 1, 2, 1);
      px(x, '#801818', 4, 2, 1, 4);
      px(x, '#187020', 10, 2, 1, 4);
      px(x, '#888', 6, 6, 3, 1);
      px(x, '#c03030', 6, 2, 1, 1);
      px(x, '#28b838', 8, 2, 1, 1);
    } else {
      // square shovel head
      px(x, p.head, 5, 1, 5, 6);
      px(x, p.lit,  5, 1, 5, 1);
      px(x, p.mid,  4, 2, 1, 4); px(x, p.mid, 10, 2, 1, 4);
      px(x, p.dark, 5, 6, 5, 1);          // bottom edge
      // socket where head meets handle
      px(x, p.mid, 6, 6, 3, 1);
      // shine
      px(x, p.lit, 6, 2, 2, 1);
    }
  } else if (type === 'sword') {
    drawHandle(x, 7, 11, 3);            // grip
    // guard
    px(x, '#6e4a24', 4, 10, 7, 1);
    px(x, '#8a6a3c', 4, 10, 7, 1);
    px(x, '#4a2e14', 4, 10, 1, 1); px(x, '#4a2e14', 10, 10, 1, 1);
    // pommel
    px(x, p.head, 7, 14, 2, 1);
    if (isPrismite) {
      // Left half red, right half green blade
      px(x, '#c03030', 7, 1, 1, 9);
      px(x, '#e04848', 7, 1, 1, 9);
      px(x, '#28b838', 8, 1, 1, 9);
      px(x, '#48e858', 8, 1, 1, 9);
      // tip
      px(x, '#c03030', 7, 0, 1, 1);
      px(x, '#28b838', 8, 0, 1, 1);
    } else {
      // blade
      px(x, p.head, 7, 1, 2, 9);
      px(x, p.lit,  7, 1, 1, 9);          // bright flat
      px(x, p.mid,  8, 1, 1, 9);          // shaded edge
      // tip
      px(x, p.head, 7, 0, 2, 1);
      // fuller line down the centre
      pxa(x, hl('#ffffff'), 7, 2, 1, 6);
    }
  } else if (type === 'trident') {
    // Trident: shaft + three prongs at top
    drawHandle(x, 7, 8, 8);
    // Three prongs
    px(x, p.head, 5, 1, 1, 7);
    px(x, p.head, 7, 0, 2, 8);
    px(x, p.head, 10, 1, 1, 7);
    px(x, p.lit, 5, 1, 1, 1);
    px(x, p.lit, 7, 0, 2, 1);
    px(x, p.lit, 10, 1, 1, 1);
    px(x, p.dark, 5, 7, 1, 1);
    px(x, p.dark, 7, 7, 2, 1);
    px(x, p.dark, 10, 7, 1, 1);
    // barb
    px(x, p.mid, 4, 4, 1, 1);
    px(x, p.mid, 11, 4, 1, 1);
  } else {
    // Generic fallback: diamond-shaped head on a stick
    drawHandle(x, 7, 9, 7);
    px(x, p.head, 4, 1, 8, 5);
    px(x, p.lit, 4, 1, 8, 1);
    px(x, p.dark, 4, 5, 8, 1);
    px(x, p.dark, 4, 2, 1, 3);
    px(x, p.mid, 11, 2, 1, 3);
  }
}

function _crackHash(i) {
  let h = _crackSeed + i * 374761393;
  h = ((h ^ (h >> 13)) * 1274126177) & 0x7fffffff;
  return (h >> 16) / 32768;
}

export function drawCrack(c, stage) {
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, 64, 64);
  if (!stage || stage <= 0) return;

  const s = Math.min(1, stage);
  // Minecraft uses 10 discrete stages; map 0-1 → 1-10
  const stageIdx = Math.max(1, Math.ceil(s * 10));

  // Darken overlay increases with stage
  const overlayAlpha = 0.1 + s * 0.35;
  ctx.fillStyle = `rgba(0,0,0,${overlayAlpha})`;
  ctx.fillRect(0, 0, 64, 64);

  // Crack lines: denser and thicker as stage increases
  const numCracks = 4 + stageIdx * 4;
  const thickness = 0.8 + stageIdx * 0.35;
  const alpha = Math.min(1, 0.5 + s * 0.5);

  ctx.strokeStyle = `rgba(0,0,0,${alpha})`;
  ctx.lineWidth = thickness;
  ctx.lineCap = 'square';
  ctx.lineJoin = 'miter';

  // Generate cracks from center outward, web-like
  const cx = 32, cy = 32;
  for (let i = 0; i < numCracks; i++) {
    const h0 = _crackHash(i * 7);
    const h1 = _crackHash(i * 7 + 1);
    const h2 = _crackHash(i * 7 + 2);
    const h3 = _crackHash(i * 7 + 3);
    const h4 = _crackHash(i * 7 + 4);
    const h5 = _crackHash(i * 7 + 5);

    // Start from a point near center
    const startR = h0 * 12;
    const angle = h1 * Math.PI * 2;
    let x = cx + Math.cos(angle) * startR;
    let y = cy + Math.sin(angle) * startR;

    ctx.beginPath();
    ctx.moveTo(x, y);

    // 2-3 segment crack with sharp angles (like real cracks)
    const segs = 2 + (h2 > 0.5 ? 1 : 0);
    for (let j = 0; j < segs; j++) {
      const len = 6 + h3 * 14 + j * 3;
      // Sharp angular direction changes (not smooth curves)
      const dir = angle + (h4 - 0.5) * 3 + j * (h5 - 0.5) * 2;
      x += Math.cos(dir) * len;
      y += Math.sin(dir) * len;
      ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Branch cracks at higher stages
    if (stageIdx >= 4 && h0 > 0.4) {
      const bx = x, by = y;
      const bLen = 3 + h3 * 8;
      const bDir = angle + h4 * Math.PI;
      ctx.beginPath();
      ctx.moveTo(bx, by);
      ctx.lineTo(bx + Math.cos(bDir) * bLen, by + Math.sin(bDir) * bLen);
      ctx.stroke();
    }
  }
}

export class UI {
  constructor(atlasCanvas, audio) {
    this.atlas = atlasCanvas;
    this.audio = audio;
    this.world = null; // set when a world is loaded
    this.hotbarEl = document.getElementById('hotbar');
    this.hudEl = document.getElementById('hud');
    this.overlayEl = document.getElementById('overlay');
    this.crosshair = document.getElementById('crosshair');
    this.itemNameEl = document.getElementById('item-name');
    this.waterOverlay = document.getElementById('water-overlay');
    this.xpFill = document.getElementById('xp-bar-fill');
    this._xpLevelEl = document.getElementById('xp-level');
    this.active = 0;
    this.creative = true;

    this.barsEl = document.getElementById('status-bars');
    this.armorRowEl = document.getElementById('armor-row');
    this._lastArmorPoints = -1;
    this._iconUrlCache = new Map();

    // Hide game UI elements immediately so they don't flash over menus
    ['hotbar', 'crosshair', 'status-bars', 'xp-bar', 'armor-row', 'offhand-slot', 'chat-hud', 'coords-hud'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
    const mp = document.querySelector('.menu-player-preview'); if (mp) mp.style.display = 'none';
    const bl = document.querySelector('.menu-bottom-left'); if (bl) bl.style.display = 'none';
    const br = document.querySelector('.menu-bottom-right'); if (br) br.style.display = 'none';
    this.healthBar = document.createElement('div');
    this.hungerBar = document.createElement('div');
    this.healthBar.style.cssText = 'display:flex;gap:1px;flex-direction:row-reverse;';
    this.hungerBar.style.cssText = 'display:flex;gap:1px;';
    this.barsEl.appendChild(this.healthBar);
    this.barsEl.appendChild(this.hungerBar);

    this.inventoryScreen = document.getElementById('inventory-screen');
    this.inventoryGrid = document.getElementById('inventory-grid');
    this.craftingInput = document.getElementById('crafting-input');
    this.craftingOutput = document.getElementById('crafting-output');
    this.craftingLabel = document.querySelector('.craft-label');
    this.cursorItemEl = document.getElementById('cursor-item');
    this.inventoryOpen = false;

    // Creative browser
    this.creativeBrowser = document.getElementById('creative-browser');
    this.creativeSearch = document.getElementById('creative-search');
    this.creativeGrid = document.getElementById('creative-grid');
    this._creativeItems = [];
    try { this._buildCreativeItemList(); } catch (e) { console.warn('Creative list build failed:', e); }
    if (this.creativeSearch) {
      this.creativeSearch.addEventListener('input', () => this._filterCreativeGrid());
    }

    // Furnace
    this.furnaceScreen = document.getElementById('furnace-screen');
    this.furnaceInputEl = document.getElementById('furnace-input');
    this.furnaceFuelEl = document.getElementById('furnace-fuel');
    this.furnaceOutputEl = document.getElementById('furnace-output');
    this.furnaceProgressFill = document.getElementById('furnace-progress-fill');
    this.furnaceArrowFill = document.getElementById('furnace-arrow-fill');
    this.furnaceFlameFill = document.getElementById('furnace-flame-fill');
    this.furnaceFuelBarFill = document.getElementById('furnace-fuel-bar-fill');
    this.furnaceInvGrid = document.getElementById('furnace-inv-grid');
    this.furnaceOpen = false;
    // Chest
    this.chestScreen = document.getElementById('chest-screen');
    this.chestGrid = document.getElementById('chest-grid');
    this.chestOpen = false;
    this.chestSlots = null; // reference to chest inventory array
    this.chestPos = null;   // {x,y,z} of opened chest
    this._prevMenu = 'main';
    this.furnaceSlots = { input: null, fuel: null, output: null };
    this.furnaceBurnTime = 0;
    this.furnaceMaxBurnTime = 0;
    this.furnaceSmeltTime = 0;
    this.craftingGrid = new CraftingGrid(2);
    this.cursorItem = null;  // {item, count} held by cursor
    this._inventoryRef = null;
    this._dragState = null;
    this._suppressClick = false;
    this._lastMousePos = { x: 0, y: 0 };

    this.pauseEl = document.getElementById('menu-pause');

    this._tooltipEl = document.createElement('div');
    this._tooltipEl.style.cssText =
      'position:fixed;z-index:9999;pointer-events:none;display:none;' +
      'background:rgba(0,0,0,0.8);color:#fff;font:11px monospace;' +
      'padding:2px 6px;border-radius:4px;max-width:200px;word-wrap:break-word;';
    document.body.appendChild(this._tooltipEl);
    this._hoveredSlotData = null;

    // Re-scale the active menu when the window resizes so it always fits.
    window.addEventListener('resize', () => { this._fitMenuToScreen(); });

    this.buildHotbar();
    document.addEventListener('pointerdown', (e) => this._onDragPointerDown(e), true);
    document.addEventListener('pointermove', (e) => this._onDragPointerMove(e), true);
    document.addEventListener('pointerup', (e) => this._onDragPointerUp(e), true);
    document.addEventListener('mousemove', (e) => { this._lastMousePos.x = e.clientX; this._lastMousePos.y = e.clientY; }, { passive: true });
  }

  // --- hotbar ---------------------------------------------------------------
  buildHotbar() {
    this.hotbarEl.innerHTML = '';
    this.slots = [];
    HOTBAR_BLOCKS.filter(b => b != null).forEach((blockId, i) => {
      const slot = document.createElement('div');
      slot.className = 'slot' + (i === 0 ? ' active' : '');
      const num = document.createElement('div');
      num.className = 'num'; num.textContent = i + 1;
      const icon = makeIcon(blockId, this.atlas);
      slot.appendChild(num);
      slot.appendChild(icon);
      slot.addEventListener('click', () => { if (this.onHotbarSelect) this.onHotbarSelect(i); });
      this.hotbarEl.appendChild(slot);
      this.slots.push(slot);
    });
  }

  buildHotbarFromInventory(inventory) {
    this.hotbarEl.innerHTML = '';
    this.slots = [];
    for (let i = 0; i < HOTBAR_SLOTS; i++) {
      const slotEl = document.createElement('div');
      slotEl.className = 'slot' + (i === inventory.selected ? ' active' : '');
      const num = document.createElement('div');
      num.className = 'num'; num.textContent = i + 1;

      const s = inventory.slots[i];
      if (s) {
        const id = s.item;
        slotEl.dataset.itemName = itemName(id);
        const icon = isBlockItem(id)
          ? makeIcon(id, this.atlas)
          : this.makeItemIcon(id);
        if (icon) {
          icon.style.width = '36px'; icon.style.height = '36px';
          icon.style.imageRendering = 'pixelated';
          slotEl.appendChild(icon);
        }
        if (s.count > 1) {
          const cnt = document.createElement('div');
          cnt.className = 'count';
          cnt.textContent = s.count;
          cnt.style.cssText =
            'position:absolute;bottom:1px;right:2px;font:bold 10px monospace;' +
            'color:#fff;text-shadow:1px 1px 0 #000,-1px 1px 0 #000,1px -1px 0 #000,-1px -1px 0 #000;';
          slotEl.appendChild(cnt);
        }
        if (s.durability != null) {
          const def = itemDef(id);
          if (def && def.tool) {
            const pct = s.durability / def.tool.maxDurability;
            const bar = document.createElement('div');
            bar.style.cssText = 'position:absolute;bottom:1px;left:3px;width:40px;height:2px;background:rgba(0,0,0,0.5);border-radius:1px;';
            const fill = document.createElement('div');
            const color = pct > 0.5 ? '#4a4' : pct > 0.2 ? '#ca4' : '#c44';
            fill.style.cssText = `width:${Math.round(pct * 100)}%;height:100%;background:${color};border-radius:1px;`;
            bar.appendChild(fill);
            slotEl.appendChild(bar);
            // Low durability warning pulse on selected slot
            if (pct <= 0.2 && i === inventory.selected) slotEl.classList.add('low-dur');
          }
        }
      }
      slotEl.appendChild(num);
      slotEl.addEventListener('click', () => { if (this.onHotbarSelect) this.onHotbarSelect(i); });
      this._addSlotTooltipListeners(slotEl, s);
      this.hotbarEl.appendChild(slotEl);
      this.slots.push(slotEl);
    }
    this.active = inventory.selected;
  }

  makeItemIcon(itemId) {
    return makeItemIconCanvas(itemId);
  }

  _getCachedIconUrl(itemId) {
    if (this._iconUrlCache.has(itemId)) return this._iconUrlCache.get(itemId);
    const c = this.makeItemIcon(itemId);
    const url = c.toDataURL();
    this._iconUrlCache.set(itemId, url);
    return url;
  }

  setActive(i) {
    this.active = ((i % HOTBAR_SLOTS) + HOTBAR_SLOTS) % HOTBAR_SLOTS;
    this.slots.forEach((s, idx) => s.classList.toggle('active', idx === this.active));
  }

  selectedBlock() {
    return null;
  }

  _buildTooltipContent(slot) {
    if (!slot) return '';
    const id = slot.item;
    const def = itemDef(id);
    if (!def) return 'Unknown';
    let html = `<b>${def.name}</b>`;
    if (def.tool) {
      const cur = slot.durability != null ? slot.durability : def.tool.durability;
      const max = def.tool.maxDurability;
      html += `<br>Durability: ${cur}/${max}`;
    } else if (def.armor) {
      html += `<br>Defense: +${def.armor.defense}`;
    } else if (def.food != null) {
      html += `<br>Hunger: +${def.food}`;
    }
    return html;
  }

  _onSlotMouseEnter(slotData, e) {
    this._hoveredSlotData = slotData;
    const html = this._buildTooltipContent(slotData);
    if (!html) { this._onSlotMouseLeave(); return; }
    this._tooltipEl.innerHTML = html;
    this._tooltipEl.style.display = 'block';
    this._positionTooltip(e);
  }

  _onSlotMouseMove(e) {
    if (this._hoveredSlotData) this._positionTooltip(e);
  }

  _onSlotMouseLeave() {
    this._hoveredSlotData = null;
    this._tooltipEl.style.display = 'none';
  }

  _positionTooltip(e) {
    const x = e.clientX + 12;
    const y = e.clientY + 12;
    const el = this._tooltipEl;
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      if (r.right > window.innerWidth) el.style.left = (e.clientX - r.width - 4) + 'px';
      if (r.bottom > window.innerHeight) el.style.top = (e.clientY - r.height - 4) + 'px';
    });
  }

  _addSlotTooltipListeners(slotEl, slotData, furnaceKey) {
    const getSlot = () => furnaceKey ? this.furnaceSlots[furnaceKey] : slotData;
    slotEl.addEventListener('mouseenter', (e) => this._onSlotMouseEnter(getSlot(), e));
    slotEl.addEventListener('mousemove', (e) => this._onSlotMouseMove(e));
    slotEl.addEventListener('mouseleave', () => this._onSlotMouseLeave());
  }

  // --- held item name -------------------------------------------------------
  updateItemName(inventory, creative) {
    let name = '';
    const s = inventory.getSelected();
    if (s) name = itemName(s.item);
    if (name) {
      this.itemNameEl.textContent = name;
      this.itemNameEl.classList.add('visible');
    } else {
      this.itemNameEl.classList.remove('visible');
    }
  }

  // --- status bars ----------------------------------------------------------
  updateStatusBars(player) {
    // Armor bar (MC style) — 10 chestplate icons above the hearts, 1 icon = 2 points
    if (this.armorRowEl) {
      const points = player.inventory ? totalArmorDefense(player.inventory.armor) : 0;
      if (points > 0) {
        const capped = Math.min(20, points);
        if (capped !== this._lastArmorPoints) {
          this._lastArmorPoints = capped;
          let ah = '';
          for (let i = 0; i < 10; i++) {
            const val = capped - i * 2;
            const full = val >= 2, half = val >= 1;
            ah += `<img src="${drawArmorUrl(full, half && !full)}" style="width:9px;height:9px;image-rendering:pixelated;vertical-align:middle;margin:0 0.5px;">`;
          }
          this.armorRowEl.innerHTML = ah;
        }
        this.armorRowEl.style.display = '';
      } else if (this._lastArmorPoints !== 0) {
        // MC hides the armor bar entirely when you have no armor
        this._lastArmorPoints = 0;
        this.armorRowEl.innerHTML = '';
        this.armorRowEl.style.display = 'none';
      }
    }

    // Health hearts (left side) — no background panel, just icons
    let hh = '';
    for (let i = 9; i >= 0; i--) {
      const val = player.health - i * 2;
      const full = val >= 2, half = val >= 1;
      hh += `<img src="${drawHeartUrl(full, half && !full)}" style="width:9px;height:9px;image-rendering:pixelated;vertical-align:middle;margin:0 0.5px;">`;
    }
    this.healthBar.innerHTML = hh;

    // Hunger drumsticks (right side)
    let fh = '';
    for (let i = 0; i < 10; i++) {
      const val = player.hunger - i * 2;
      const full = val >= 2, half = val >= 1;
      fh += `<img src="${drawDrumstickUrl(full, half && !full)}" style="width:9px;height:9px;image-rendering:pixelated;vertical-align:middle;margin:0 0.5px;">`;
    }
    this.hungerBar.innerHTML = fh;
    // Hunger warning pulse when below 3 drumsticks (6 hunger)
    if (player.hunger <= 6) this.hungerBar.classList.add('hunger-warn');
    else this.hungerBar.classList.remove('hunger-warn');

  }

  // Off-hand HUD — standalone update for creative mode
  updateArmorSlots(player) {
    // Off-hand HUD
    const offhandEl = document.getElementById('offhand-slot');
    if (offhandEl && player.inventory) {
      const equipped = player.inventory.offhand;
      const label = offhandEl.querySelector('.offhand-label');
      let offImg = offhandEl.querySelector('img');
      if (!offImg) {
        offImg = document.createElement('img');
        offImg.style.cssText = 'width:30px;height:30px;image-rendering:pixelated;';
        offhandEl.appendChild(offImg);
      }
      let cnt = offhandEl.querySelector('.inv-count');
      if (!cnt) {
        cnt = document.createElement('div');
        cnt.className = 'inv-count';
        cnt.style.cssText = 'position:absolute;bottom:1px;right:2px;font:bold 9px monospace;color:#fff;text-shadow:1px 1px 0 #000;';
        offhandEl.appendChild(cnt);
      }
      if (equipped) {
        offImg.src = this._getCachedIconUrl(equipped.item);
        offImg.style.display = '';
        if (label) label.style.display = 'none';
        cnt.textContent = equipped.count;
        cnt.style.display = equipped.count > 1 ? '' : 'none';
      } else {
        offImg.style.display = 'none';
        cnt.style.display = 'none';
        if (label) label.style.display = '';
      }
    }
  }

  // --- overlay --------------------------------------------------------------
  showOverlay() { this.overlayEl.classList.remove('hidden'); this._setGameUI(false); this._updateScreenOpen(); }
  hideOverlay() { this.overlayEl.classList.add('hidden'); this._setGameUI(true); this._updateScreenOpen(); }
  isOverlayShown() { return !this.overlayEl.classList.contains('hidden'); }
  // Toggle a body class while any full-screen modal is open so the on-screen
  // mobile controls are hidden and can't overlap or intercept the modal's taps.
  _updateScreenOpen() {
    const open = this.inventoryOpen || this.furnaceOpen || this.chestOpen || this.isOverlayShown();
    document.body.classList.toggle('screen-open', open);
  }

  _setGameUI(visible) {
    const v = visible ? '' : 'none';
    if (this.hotbarEl) this.hotbarEl.style.display = visible ? 'flex' : 'none';
    if (this.hudEl) this.hudEl.style.display = v;
    if (!this._sguiCached) {
      this._sguiCrosshair = document.getElementById('crosshair');
      this._sguiAttackCd = document.getElementById('attack-cooldown');
      this._sguiStatusBars = document.getElementById('status-bars');
      this._sguiXpBar = document.getElementById('xp-bar');
      this._sguiArmorRow = document.getElementById('armor-row');
      this._sguiOffhandSlot = document.getElementById('offhand-slot');
      this._sguiChatHud = document.getElementById('chat-hud');
      this._sguiCoordsHud = document.getElementById('coords-hud');
      this._sguiMenuPlayerPreview = document.querySelector('.menu-player-preview');
      this._sguiMenuBottomLeft = document.querySelector('.menu-bottom-left');
      this._sguiMenuBottomRight = document.querySelector('.menu-bottom-right');
      this._sguiCached = true;
    }
    if (this._sguiCrosshair) this._sguiCrosshair.style.display = v;
    if (this._sguiAttackCd) this._sguiAttackCd.style.display = v;
    if (this._sguiStatusBars) this._sguiStatusBars.style.display = v;
    if (this._sguiXpBar) this._sguiXpBar.style.display = v;
    if (this._sguiArmorRow) this._sguiArmorRow.style.display = v;
    if (this._sguiOffhandSlot) this._sguiOffhandSlot.style.display = v;
    if (this._sguiMenuPlayerPreview) this._sguiMenuPlayerPreview.style.display = visible ? 'none' : '';
    if (this._sguiMenuBottomLeft) this._sguiMenuBottomLeft.style.display = visible ? 'none' : '';
    if (this._sguiMenuBottomRight) this._sguiMenuBottomRight.style.display = visible ? 'none' : '';
    if (this._sguiChatHud) this._sguiChatHud.style.display = visible ? '' : 'none';
    if (this._sguiCoordsHud) this._sguiCoordsHud.style.display = visible ? '' : 'none';
    // Hide mobile controls when leaving the game world
    const bfControls = document.getElementById('bf-controls');
    if (bfControls) bfControls.style.display = visible ? '' : 'none';
  }

  showMenu(name) {
    if (name === 'pause') {
      if (this.pauseEl) this.pauseEl.classList.add('active');
      this.overlayEl.querySelectorAll('.menu-screen').forEach(s => s.classList.remove('active'));
      this.overlayEl.classList.add('hidden');
      this._setGameUI(false);
      return;
    }
    this.overlayEl.classList.remove('hidden');
    this._setGameUI(false);
    this.overlayEl.querySelectorAll('.menu-screen').forEach(s => s.classList.remove('active'));
    const screen = document.getElementById('menu-' + name);
    if (screen) screen.classList.add('active');
    this._fitMenuToScreen();
    if (this._onMenuShown) this._onMenuShown(name);
    if (name === 'main') this._cycleSplash();
    const mp = document.querySelector('.menu-player-preview');
    if (mp) mp.style.display = (name === 'login') ? 'none' : '';
    // Show bottom buttons only on main menu, hide on login
    const bl = document.querySelector('.menu-bottom-left');
    const br = document.querySelector('.menu-bottom-right');
    if (bl) bl.style.display = (name === 'login') ? 'none' : 'block';
    if (br) br.style.display = (name === 'login') ? 'none' : 'block';
  }

  // Scale the active menu down so it always fits the current screen. Never
  // scales up. If the content is still too tall, the overlay's own scrollbar
  // takes over (margin:auto keeps the top reachable).
  _fitMenuToScreen() {
    const screen = this.overlayEl && this.overlayEl.querySelector('.menu-screen.active');
    if (!screen) return;
    screen.classList.remove('menu-fit');
    screen.style.transform = '';
    screen.style.width = '';
    const pad = 24;
    const vw = window.innerWidth, vh = window.innerHeight;
    const w = screen.offsetWidth, h = screen.offsetHeight;
    if (!w || !h) return;
    const scale = Math.min(1, (vw - pad) / w, (vh - pad) / h);
    if (scale >= 1) return;
    screen.style.transformOrigin = 'top center';
    screen.style.transform = `scale(${scale})`;
    screen.style.width = `${Math.ceil(w * scale)}px`;
    screen.classList.add('menu-fit');
  }

  _cycleSplash() {
    const el = document.getElementById('main-splash') || document.querySelector('#menu-main .menu-splash');
    if (!el) return;
    // Weighted splash texts — rarer messages appear less often
    const POOL = [
      // Common (2.0% each)
      { t: 'Now with 100% more cubes!', w: 20 },
      { t: 'Rectangular engineering!', w: 20 },
      { t: 'Watch out for gravity!', w: 20 },
      { t: 'Dig straight down, what could go wrong?', w: 20 },
      { t: 'Grass blocks are green on top!', w: 20 },
      { t: 'Trees float in our hearts!', w: 20 },
      { t: 'Punny wooden pickaxe!', w: 20 },
      { t: 'Mined with passion!', w: 20 },
      { t: "Don't look at the moon too long!", w: 20 },
      { t: 'Inventory full of dirt!', w: 20 },
      { t: 'Press W to advance!', w: 20 },
      { t: 'Where did I put my workbench?', w: 20 },
      { t: 'Placed by a script!', w: 20 },
      { t: 'Pixels are cheap!', w: 20 },
      { t: 'Voxel-tastic!', w: 20 },
      { t: 'Not legally blocky!', w: 20 },
      { t: 'May contain small bugs!', w: 20 },
      { t: 'Infinite worlds, finite patience!', w: 20 },
      { t: 'Sound effects recorded in a cave!', w: 20 },
      { t: 'Check behind you!', w: 20 },
      { t: 'Smooth lighting optional!', w: 20 },
      { t: 'Panic in the panic room!', w: 20 },
      { t: 'Keep calm and punch wood!', w: 20 },
      { t: 'Sand castles in the sky!', w: 20 },
      { t: "Water physics? Never heard of 'em.", w: 20 },
      { t: 'Also try playing outside!', w: 20 },
      { t: 'Powered by pure imagination!', w: 20 },
      { t: 'No actual diamonds included!', w: 20 },
      { t: 'Certified organic cobblestone!', w: 20 },
      { t: 'Loading chunks of fun!', w: 20 },
      { t: 'Hide your valuables!', w: 20 },
      { t: 'The cake is a relative truth!', w: 20 },
      { t: 'Listen to the ambient wind!', w: 20 },
      { t: 'Wool comes in colors!', w: 20 },
      { t: 'It compiles!', w: 20 },
      { t: 'Sweating in iron armor!', w: 20 },
      { t: 'Better than real work!', w: 20 },
      { t: 'Now with functioning doors!', w: 20 },
      { t: 'Watch your step near cliffs!', w: 20 },
      { t: 'Torches keep things bright!', w: 20 },
      { t: 'Made with a keyboard!', w: 20 },
      { t: 'Read the patch notes!', w: 20 },
      { t: 'Definitely not a remake!', w: 20 },
      { t: 'Nostalgia trip incoming!', w: 20 },
      { t: 'Gather the flock!', w: 20 },
      { t: 'Beware of nightfall!', w: 20 },
      { t: 'Crafting happiness!', w: 20 },
      { t: 'Smelt the night away!', w: 20 },
      { t: 'Blocks upon blocks!', w: 20 },
      { t: 'Hello, world!', w: 20 },
      // Uncommon (1.0% each)
      { t: 'Also try the original game!', w: 10 },
      { t: "Wait, this isn't a 2D platformer!", w: 10 },
      { t: 'Warning: Creeper sympathizer detected.', w: 10 },
      { t: 'Procedurally generated confusion!', w: 10 },
      { t: 'Code written at 3 AM!', w: 10 },
      { t: 'Your inventory is an extradimensional void.', w: 10 },
      { t: 'Pushing hardware to its absolute limits!', w: 10 },
      { t: "Don't eat the mysterious mushrooms!", w: 10 },
      { t: 'Who turned off the sun?', w: 10 },
      { t: 'Now supporting up to twelve frames per second!', w: 10 },
      { t: 'Error 404: Bedrock not found.', w: 10 },
      { t: 'Perfectly balanced, as all biomes should be.', w: 10 },
      { t: 'Shovels are underrated tools.', w: 10 },
      { t: "Don't build your house out of leaves!", w: 10 },
      { t: 'Friendly neighborhood zombie!', w: 10 },
      { t: 'Certified bug-free zone (lies).', w: 10 },
      { t: 'Master of the pickaxe swing!', w: 10 },
      { t: 'Respect the village iron golem.', w: 10 },
      { t: 'Redstone logic hurts my brain.', w: 10 },
      { t: 'Powered by coffee and dreams!', w: 10 },
      { t: 'Please feed the tame wolves.', w: 10 },
      { t: 'Watch out for low ceilings!', w: 10 },
      { t: 'Finding diamonds in a haystack.', w: 10 },
      { t: 'Why is the rum gone?', w: 10 },
      { t: 'Re-routing chunk requests...', w: 10 },
      { t: 'Generating terrain noise...', w: 10 },
      { t: 'Look ma, no hands!', w: 10 },
      { t: "It's a feature, not a bug!", w: 10 },
      { t: 'Keep your feet on the voxel grid.', w: 10 },
      { t: 'Placed with precision!', w: 10 },
      // Rare (0.25% each)
      { t: 'I am completely out of witty ideas.', w: 2.5 },
      { t: 'You found the 1-in-400 rarity message!', w: 2.5 },
      { t: 'The phantom menace of the desert biome.', w: 2.5 },
      { t: 'Look behind the painting for secrets.', w: 2.5 },
      { t: 'Herobrine is on vacation this week.', w: 2.5 },
      { t: 'Did you remember to hydrate today?', w: 2.5 },
      { t: 'Free the Void-Lizard!', w: 2.5 },
      { t: 'Pitchforks ready for the physics engine!', w: 2.5 },
      { t: 'Unlicensed block arrangement!', w: 2.5 },
      { t: 'May cause sudden urges to build castles.', w: 2.5 },
      { t: 'Dedicated to the patient beta testers.', w: 2.5 },
      { t: 'The cows are plotting something.', w: 2.5 },
      { t: "Don't question the floating sand.", w: 2.5 },
      { t: 'Written entirely in assembly (not really).', w: 2.5 },
      { t: 'Loading faster than light speed!', w: 2.5 },
      { t: 'Absolutely zero microtransactions!', w: 2.5 },
      { t: 'Bring a bucket of water to the volcano.', w: 2.5 },
      { t: 'Welcome back, architect!', w: 2.5 },
      // Ultra-rare (0.1% each)
      { t: 'The cake was actually a block of cheese.', w: 1 },
      { t: 'This message will self-destruct in five seconds.', w: 1 },
    ];
    const totalWeight = POOL.reduce((s, e) => s + e.w, 0);
    let r = Math.random() * totalWeight;
    for (const e of POOL) { r -= e.w; if (r <= 0) { el.textContent = e.t; return; } }
    el.textContent = POOL[0].t;
  }

  hidePause() {
    if (this.pauseEl) this.pauseEl.classList.remove('active');
    this._setGameUI(true);
  }

  // --- loading screen -------------------------------------------------------
  showLoading() {
    const el = document.getElementById('loading-screen');
    if (el) el.classList.add('active');
    this._loadingEl = el;
    // Smooth flowing green bar — no segments.
    const fill = document.getElementById('loading-bar-fill');
    if (fill) fill.innerHTML = '';
  }
  hideLoading() {
    const el = this._loadingEl || document.getElementById('loading-screen');
    if (el) {
      el.style.transition = 'opacity 0.6s';
      el.style.opacity = '0';
      setTimeout(() => { el.classList.remove('active'); el.style.opacity = ''; el.style.transition = ''; }, 600);
    }
  }
  updateLoading(pct, step) {
    const fill = document.getElementById('loading-bar-fill');
    const pctEl = document.getElementById('loading-bar-pct');
    const stepEl = document.getElementById('loading-step');
    if (fill) fill.style.width = Math.round(pct) + '%';
    if (pctEl) pctEl.textContent = Math.round(pct) + '%';
    if (stepEl) stepEl.textContent = step || '';
  }

  // --- HUD ------------------------------------------------------------------
  updateHud({ fps, pos, biome, loadedChunks, facing, gamemode, showFps }) {
    const mode = gamemode || (this.creative ? 'Creative' : 'Survival');
    if (!this._hudLine1) {
      this._hudLine1 = document.createElement('div');
      this._hudFpsSpan = document.createElement('span');
      this._hudFpsSpan.className = 'fps';
      this._hudModeSpan = document.createElement('span');
      this._hudModeSpan.className = 'mode';
      this._hudLine1.appendChild(this._hudFpsSpan);
      this._hudLine1.appendChild(document.createTextNode(' '));
      this._hudLine1.appendChild(this._hudModeSpan);
      this._hudCoordDiv = document.createElement('div');
      this._hudCoordDiv.className = 'coord';
      this._hudLine3 = document.createElement('div');
      this._hudBiomeSpan = document.createElement('span');
      this._hudBiomeSpan.className = 'biome';
      this._hudLine3.appendChild(this._hudBiomeSpan);
      this._hudLine3.appendChild(document.createTextNode(' \u00b7 '));
      this._hudFacingNode = document.createTextNode('');
      this._hudLine3.appendChild(this._hudFacingNode);
      this._hudLine3.appendChild(document.createTextNode(' \u00b7 '));
      this._hudChunksNode = document.createTextNode('');
      this._hudLine3.appendChild(this._hudChunksNode);
      this.hudEl.appendChild(this._hudLine1);
      this.hudEl.appendChild(this._hudCoordDiv);
      this.hudEl.appendChild(this._hudLine3);
    }
    if (showFps !== false) {
      this._hudFpsSpan.textContent = fps + ' FPS';
      this._hudFpsSpan.style.display = '';
    } else {
      this._hudFpsSpan.style.display = 'none';
    }
    this._hudModeSpan.textContent = '[' + mode + ']';
    this._hudCoordDiv.textContent = 'XYZ: ' + pos.x.toFixed(1) + ' / ' + pos.y.toFixed(1) + ' / ' + pos.z.toFixed(1);
    this._hudBiomeSpan.textContent = biome;
    this._hudFacingNode.textContent = facing;
    this._hudChunksNode.textContent = loadedChunks + ' chunks';
  }

  // --- water overlay --------------------------------------------------------
  setUnderwater(underwater) {
    this.waterOverlay.classList.toggle('active', underwater);
  }

  // --- XP bar (real leveling system) ----------------------------------------
  updateXpBar(progress, level) {
    if (this.xpFill) {
      this.xpFill.style.width = `${Math.round(Math.min(1, progress) * 100)}%`;
    }
    const lvlEl = this._xpLevelEl;
    if (lvlEl) {
      if (level > 0 || progress > 0) {
        lvlEl.textContent = `${level}`;
        lvlEl.classList.add('visible');
      } else {
        lvlEl.classList.remove('visible');
      }
    }
  }

  showLevelUp(level) {
    const toast = document.getElementById('achievement-toast');
    if (!toast) return;
    const nameEl = toast.querySelector('.ach-name');
    const descEl = toast.querySelector('.ach-desc');
    const iconEl = toast.querySelector('.ach-icon');
    const titles = {
      1: 'Newcomer', 5: 'Settler', 10: 'Explorer', 15: 'Adventurer',
      20: 'Veteran', 30: 'Veteran', 40: 'Master Builder', 50: 'Champion',
      75: 'Legend', 100: 'Mythic',
    };
    const title = titles[level] || `Level ${level}`;
    if (nameEl) nameEl.textContent = `Level ${level}!`;
    if (descEl) descEl.textContent = title;
    if (iconEl) {
      try {
        const iconCanvas = makeIcon(7, this.atlas);
        iconEl.width = 40; iconEl.height = 40;
        const ctx = iconEl.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(iconCanvas, 0, 0, 40, 40);
      } catch (_) {}
    }
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  // --- inventory screen -----------------------------------------------------
  openInventory(inventory, gridSize = 2, creative = false) {
    if (this.audio) this.audio.inventoryOpen();
    this.inventoryOpen = true;
    this._inventoryRef = inventory;
    this.craftingGrid = new CraftingGrid(gridSize);
    this.cursorItem = null;
    this.cursorItemEl.style.display = 'none';
    this.inventoryScreen.classList.add('open');
    if (this.craftingLabel) {
      this.craftingLabel.textContent = gridSize > 2 ? 'CRAFTING (3x3)' : 'CRAFTING';
    }
    if (this.creativeBrowser) {
      this.creativeBrowser.style.display = creative ? '' : 'none';
    }
    if (creative) this._populateCreativeGrid();
    this.renderInventoryGrid(inventory);
    this.renderCraftingGrid();
    this.renderArmorSlots();
    this._updateScreenOpen();
  }

  closeInventory() {
    if (this.audio) this.audio.inventoryClose();
    const overflow = [];
    if (this._inventoryRef && this.craftingGrid) {
      overflow.push(...this.craftingGrid.returnAll(this._inventoryRef));
    }
    if (this.cursorItem) {
      const left = this._inventoryRef ? this._inventoryRef.add(this.cursorItem.item, this.cursorItem.count) : this.cursorItem.count;
      if (left > 0) overflow.push({ item: this.cursorItem.item, count: left });
      this.cursorItem = null;
    }
    // Items that couldn't fit get dropped instead of being destroyed
    if (overflow.length && this.onItemOverflow) this.onItemOverflow(overflow);
    this.cursorItemEl.style.display = 'none';
    this.inventoryOpen = false;
    this.inventoryScreen.classList.remove('open');
    this._inventoryRef = null;
    if (this._onSync) this._onSync();
    this._updateScreenOpen();
  }

  // MC behavior: clicking outside any inventory slot drops the cursor item
  dropCursorItem() {
    if (!this.cursorItem) return;
    const stacks = [{ item: this.cursorItem.item, count: this.cursorItem.count }];
    this.cursorItem = null;
    this._updateCursorVisual();
    if (this.onItemOverflow) this.onItemOverflow(stacks);
  }

  renderInventoryGrid(inventory) {
    this.inventoryGrid.innerHTML = '';
    for (let i = 0; i < 36; i++) {
      const slotEl = document.createElement('div');
      slotEl.className = 'inv-slot';
      slotEl.dataset.kind = 'inv';
      slotEl.dataset.idx = i;
      if (i === 9) {
        const sep = document.createElement('div');
        sep.className = 'inv-separator';
        this.inventoryGrid.appendChild(sep);
      }
      if (i < 9) {
        const numEl = document.createElement('div');
        numEl.className = 'inv-num';
        numEl.textContent = i + 1;
        slotEl.appendChild(numEl);
      }
      const s = inventory.slots[i];
      if (s) {
        const id = s.item;
        slotEl.dataset.itemName = itemName(id);
        const icon = isBlockItem(id)
          ? makeIcon(id, this.atlas)
          : this.makeItemIcon(id);
        if (icon) {
          icon.style.width = '32px'; icon.style.height = '32px';
          icon.style.imageRendering = 'pixelated';
          slotEl.appendChild(icon);
        }
        if (s.count > 1) {
          const cnt = document.createElement('div');
          cnt.className = 'inv-count';
          cnt.textContent = s.count;
          slotEl.appendChild(cnt);
        }
      }
      slotEl.addEventListener('click', (e) => { if (this._suppressClick) { this._suppressClick = false; return; } this._onInvSlotClick(i, e.shiftKey); });
      slotEl.addEventListener('contextmenu', (e) => { e.preventDefault(); if (this._suppressClick) { this._suppressClick = false; return; } this._onInvSlotRightClick(i); });
      slotEl.addEventListener('dblclick', () => this._onSlotDblClick('inv', i));
      this._addSlotTooltipListeners(slotEl, s);
      this.inventoryGrid.appendChild(slotEl);
    }
  }

  renderCraftingGrid() {
    const size = this.craftingGrid.size;
    this.craftingInput.innerHTML = '';
    this.craftingInput.style.gridTemplateColumns = `repeat(${size}, 42px)`;
    for (let i = 0; i < size * size; i++) {
      const slotEl = document.createElement('div');
      slotEl.className = 'inv-slot craft-slot';
      slotEl.dataset.kind = 'craft';
      slotEl.dataset.idx = i;
      const s = this.craftingGrid.grid[i];
      if (s) {
        const id = s.item;
        const icon = isBlockItem(id)
          ? makeIcon(id, this.atlas)
          : this.makeItemIcon(id);
        if (icon) {
          icon.style.width = '32px'; icon.style.height = '32px';
          icon.style.imageRendering = 'pixelated';
          slotEl.appendChild(icon);
        }
        if (s.count > 1) {
          const cnt = document.createElement('div');
          cnt.className = 'inv-count';
          cnt.textContent = s.count;
          slotEl.appendChild(cnt);
        }
      }
      slotEl.addEventListener('click', () => { if (this._suppressClick) { this._suppressClick = false; return; } this._onCraftSlotClick(i); });
      slotEl.addEventListener('contextmenu', (e) => { e.preventDefault(); if (this._suppressClick) { this._suppressClick = false; return; } this._onCraftSlotRightClick(i); });
      slotEl.addEventListener('dblclick', () => this._onSlotDblClick('craft', i));
      this._addSlotTooltipListeners(slotEl, s);
      this.craftingInput.appendChild(slotEl);
    }
    // output
    this.craftingOutput.innerHTML = '';
    const out = this.craftingGrid.output;
    if (out) {
      const icon = isBlockItem(out.id)
        ? makeIcon(out.id, this.atlas)
        : this.makeItemIcon(out.id);
      if (icon) {
        icon.style.width = '32px'; icon.style.height = '32px';
        icon.style.imageRendering = 'pixelated';
        this.craftingOutput.appendChild(icon);
      }
      if (out.count > 1) {
        const cnt = document.createElement('div');
        cnt.className = 'inv-count';
        cnt.textContent = out.count;
        this.craftingOutput.appendChild(cnt);
      }
      this._addSlotTooltipListeners(this.craftingOutput, { item: out.id, count: out.count });
    }
    this.craftingOutput.onclick = (e) => { if (this._suppressClick) { this._suppressClick = false; return; } this._onCraftOutputClick(e.shiftKey); };
    this.craftingOutput.ondblclick = () => this._onSlotDblClick('craft-out', 0);
  }

  // --- armor slots in inventory screen ---
  renderArmorSlots() {
    const inv = this._inventoryRef;
    if (!inv) return;
    const slots = document.querySelectorAll('.inv-armor-slot');
    slots.forEach((el) => {
      const key = el.dataset.armorSlot;
      // clear
      el.querySelectorAll('canvas, .inv-count').forEach(c => c.remove());
      const label = el.querySelector('.inv-armor-name');
      if (key === 'offhand') {
        const equipped = inv.offhand;
        if (equipped) {
          const icon = this.makeItemIcon(equipped.item);
          if (icon) {
            icon.style.width = '32px'; icon.style.height = '32px';
            icon.style.imageRendering = 'pixelated';
            el.appendChild(icon);
          }
          if (label) label.style.display = 'none';
        } else {
          if (label) label.style.display = '';
        }
        this._addSlotTooltipListeners(el, equipped);
        el.onclick = () => this._onOffhandSlotClick();
      } else {
        const idx = parseInt(key);
        const equipped = inv.armor[idx];
        if (equipped) {
          const icon = this.makeItemIcon(equipped.item);
          if (icon) {
            icon.style.width = '32px'; icon.style.height = '32px';
            icon.style.imageRendering = 'pixelated';
            el.appendChild(icon);
          }
          if (label) label.style.display = 'none';
        } else {
          if (label) label.style.display = '';
        }
        this._addSlotTooltipListeners(el, equipped);
        el.onclick = () => this._onArmorSlotClick(idx);
      }
    });
  }

  _onArmorSlotClick(idx) {
    const inv = this._inventoryRef;
    if (!inv) return;
    const equipped = inv.armor[idx];
    let equippedArmor = false;
    if (this.cursorItem) {
      const def = itemDef(this.cursorItem.item);
      if (def && def.armor && def.armor.slotIdx === idx) {
        if (equipped) {
          inv.armor[idx] = { item: this.cursorItem.item, count: 1, ...(this.cursorItem.durability != null ? { durability: this.cursorItem.durability } : {}) };
          this.cursorItem = { item: equipped.item, count: 1, ...(equipped.durability != null ? { durability: equipped.durability } : {}) };
        } else {
          inv.armor[idx] = { item: this.cursorItem.item, count: 1, ...(this.cursorItem.durability != null ? { durability: this.cursorItem.durability } : {}) };
          this.cursorItem.count--;
          if (this.cursorItem.count <= 0) this.cursorItem = null;
        }
        equippedArmor = true;
      }
    } else {
      if (equipped) {
        this.cursorItem = { item: equipped.item, count: 1, ...(equipped.durability != null ? { durability: equipped.durability } : {}) };
        inv.armor[idx] = null;
      }
    }
    if (equippedArmor && this.audio) this.audio.armorEquip();
    this.renderArmorSlots();
    this.renderInventoryGrid(inv);
    this._updateCursorVisual();
  }

  _onOffhandSlotClick() {
    const inv = this._inventoryRef;
    if (!inv) return;
    const equipped = inv.offhand;
    if (this.cursorItem) {
      // Any item can go in off-hand
      if (equipped) {
        // Swap cursor <-> offhand, preserving full stacks
        const tmp = { item: equipped.item, count: equipped.count, ...(equipped.durability != null ? { durability: equipped.durability } : {}) };
        inv.offhand = { item: this.cursorItem.item, count: this.cursorItem.count, ...(this.cursorItem.durability != null ? { durability: this.cursorItem.durability } : {}) };
        this.cursorItem = tmp;
      } else {
        // Move cursor item to offhand
        inv.offhand = { item: this.cursorItem.item, count: this.cursorItem.count, ...(this.cursorItem.durability != null ? { durability: this.cursorItem.durability } : {}) };
        this.cursorItem = null;
      }
    } else {
      if (equipped) {
        this.cursorItem = { item: equipped.item, count: equipped.count, ...(equipped.durability != null ? { durability: equipped.durability } : {}) };
        inv.offhand = null;
      }
    }
    this.renderArmorSlots();
    this.renderInventoryGrid(inv);
    this._updateCursorVisual();
  }

  // Right-click: place 1 from cursor, or pick up half from slot
  _onInvSlotRightClick(i) {
    const inv = this._inventoryRef;
    if (!inv) return;
    if (this.cursorItem) {
      const cur = inv.slots[i];
      if (!cur) {
        // Empty slot: place 1 from cursor
        inv.slots[i] = { item: this.cursorItem.item, count: 1, ...(this.cursorItem.durability != null ? { durability: this.cursorItem.durability } : {}) };
        this.cursorItem.count--;
        if (this.cursorItem.count <= 0) this.cursorItem = null;
      } else if (cur.item === this.cursorItem.item) {
        // Same item: add 1 if room
        const cap = maxStack(cur.item);
        if (cur.count < cap) {
          cur.count++;
          this.cursorItem.count--;
          if (this.cursorItem.count <= 0) this.cursorItem = null;
        }
      } else {
        // Different item: swap entire stacks (same as left-click swap)
        const tmp = { item: cur.item, count: cur.count, ...(cur.durability != null ? { durability: cur.durability } : {}) };
        inv.slots[i] = { item: this.cursorItem.item, count: this.cursorItem.count, ...(this.cursorItem.durability != null ? { durability: this.cursorItem.durability } : {}) };
        this.cursorItem = tmp;
      }
    } else {
      const s = inv.slots[i];
      if (!s) return;
      // Pick up half (ceil) of the stack
      const half = Math.ceil(s.count / 2);
      this.cursorItem = { item: s.item, count: half, ...(s.durability != null ? { durability: s.durability } : {}) };
      s.count -= half;
      if (s.count <= 0) inv.slots[i] = null;
    }
    this.renderInventoryGrid(inv);
    this.renderArmorSlots();
    this._updateCursorVisual();
  }

  _onInvSlotClick(i, shiftKey) {
    const inv = this._inventoryRef;
    if (!inv) return;

    // Shift+click: quick move to other section
    if (shiftKey) {
      const s = inv.slots[i];
      if (!s) return;
      const def = itemDef(s.item);
      // Armor: shift-click goes to armor slot
      if (def && def.armor) {
        const idx = def.armor.slotIdx;
        const prev = inv.armor[idx];
        const equipDur = s.durability != null ? { durability: s.durability } : {};
        const remainder = (s.count || 1) - 1;
        inv.armor[idx] = { item: s.item, count: 1, ...equipDur };
        if (prev) {
          // Slot occupied: swap previously-equipped piece back into source slot
          inv.slots[i] = { item: prev.item, count: 1, ...(prev.durability != null ? { durability: prev.durability } : {}) };
        } else if (remainder > 0) {
          // Equipped one from a stack: keep the rest in the source slot
          inv.slots[i] = { item: s.item, count: remainder, ...equipDur };
        } else {
          inv.slots[i] = null;
        }
        if (this.audio) this.audio.armorEquip();
        this.renderInventoryGrid(inv);
        this.renderArmorSlots();
        this._updateCursorVisual();
        return;
      }
      // Hotbar slot (0-8) → move to main inventory (9-35), and vice versa
      if (i < HOTBAR_SLOTS) {
        // Move to main inventory: find first empty slot, or first slot with same item
        let target = -1;
        for (let j = HOTBAR_SLOTS; j < TOTAL; j++) {
          if (inv.slots[j] && inv.slots[j].item === s.item && inv.slots[j].count < maxStack(s.item)) { target = j; break; }
        }
        if (target === -1) {
          for (let j = HOTBAR_SLOTS; j < TOTAL; j++) {
            if (!inv.slots[j]) { target = j; break; }
          }
        }
        if (target === -1) return; // no room
        const dest = inv.slots[target];
        if (dest && dest.item === s.item) {
          const cap = maxStack(s.item);
          const add = Math.min(cap - dest.count, s.count);
          dest.count += add;
          s.count -= add;
          if (s.count <= 0) inv.slots[i] = null;
        } else if (!dest) {
          inv.slots[target] = { item: s.item, count: s.count, ...(s.durability != null ? { durability: s.durability } : {}) };
          inv.slots[i] = null;
        }
      } else {
        // Move from main inventory → hotbar: find first empty or matching hotbar slot
        let target = -1;
        for (let j = 0; j < HOTBAR_SLOTS; j++) {
          if (inv.slots[j] && inv.slots[j].item === s.item && inv.slots[j].count < maxStack(s.item)) { target = j; break; }
        }
        if (target === -1) {
          for (let j = 0; j < HOTBAR_SLOTS; j++) {
            if (!inv.slots[j]) { target = j; break; }
          }
        }
        if (target === -1) return;
        const dest = inv.slots[target];
        if (dest && dest.item === s.item) {
          const cap = maxStack(s.item);
          const add = Math.min(cap - dest.count, s.count);
          dest.count += add;
          s.count -= add;
          if (s.count <= 0) inv.slots[i] = null;
        } else if (!dest) {
          inv.slots[target] = { item: s.item, count: s.count, ...(s.durability != null ? { durability: s.durability } : {}) };
          inv.slots[i] = null;
        }
      }
      this.renderInventoryGrid(inv);
      this.renderArmorSlots();
      this._updateCursorVisual();
      return;
    }

    // Normal left-click (no shift)
    if (this.cursorItem) {
      const cur = inv.slots[i];
      if (!cur) {
        // empty slot: place cursor here
        inv.slots[i] = { item: this.cursorItem.item, count: this.cursorItem.count, ...(this.cursorItem.durability != null ? { durability: this.cursorItem.durability } : {}) };
        this.cursorItem = null;
      } else if (cur.item === this.cursorItem.item) {
        // same item: merge
        const cap = maxStack(cur.item);
        const add = Math.min(cap - cur.count, this.cursorItem.count);
        cur.count += add;
        this.cursorItem.count -= add;
        if (this.cursorItem.count <= 0) this.cursorItem = null;
      } else {
        // different item: swap
        inv.slots[i] = { item: this.cursorItem.item, count: this.cursorItem.count, ...(this.cursorItem.durability != null ? { durability: this.cursorItem.durability } : {}) };
        this.cursorItem = { item: cur.item, count: cur.count, durability: cur.durability };
      }
    } else {
      const s = inv.slots[i];
      if (s) {
        this.cursorItem = { item: s.item, count: s.count, durability: s.durability };
        inv.slots[i] = null;
      }
    }
    this.renderInventoryGrid(inv);
    this.renderArmorSlots();
    this._updateCursorVisual();
  }

  _onCraftSlotClick(i) {
    const grid = this.craftingGrid;
    if (this.cursorItem) {
      const cur = grid.grid[i];
      if (cur && cur.item === this.cursorItem.item) {
        // same item: fill up slot
        const cap = maxStack(cur.item);
        const add = Math.min(cap - cur.count, this.cursorItem.count);
        cur.count += add;
        this.cursorItem.count -= add;
        if (this.cursorItem.count <= 0) this.cursorItem = null;
      } else if (!cur) {
        // empty slot: place entire stack from cursor
        grid.grid[i] = { item: this.cursorItem.item, count: this.cursorItem.count, ...(this.cursorItem.durability != null ? { durability: this.cursorItem.durability } : {}) };
        this.cursorItem = null;
      } else {
        // different item: swap entire stacks
        const tmp = { item: cur.item, count: cur.count, ...(cur.durability != null ? { durability: cur.durability } : {}) };
        grid.grid[i] = { item: this.cursorItem.item, count: this.cursorItem.count, ...(this.cursorItem.durability != null ? { durability: this.cursorItem.durability } : {}) };
        this.cursorItem = tmp;
      }
    } else {
      const s = grid.takeCell(i);
      if (s) this.cursorItem = { item: s.item, count: s.count, durability: s.durability };
    }
    grid.refreshOutput();
    this.renderCraftingGrid();
    this._updateCursorVisual();
  }

  // Right-click: place 1 item from cursor into crafting slot (like MC)
  _onCraftSlotRightClick(i) {
    const grid = this.craftingGrid;
    if (!this.cursorItem) {
      // Empty cursor: pick up half from slot
      const s = grid.grid[i];
      if (!s) return;
      const half = Math.ceil(s.count / 2);
      this.cursorItem = { item: s.item, count: half, ...(s.durability != null ? { durability: s.durability } : {}) };
      s.count -= half;
      if (s.count <= 0) grid.grid[i] = null;
    } else {
      const cur = grid.grid[i];
      if (!cur) {
        // Empty slot: place 1 from cursor
        grid.grid[i] = { item: this.cursorItem.item, count: 1, ...(this.cursorItem.durability != null ? { durability: this.cursorItem.durability } : {}) };
        this.cursorItem.count--;
        if (this.cursorItem.count <= 0) this.cursorItem = null;
      } else if (cur.item === this.cursorItem.item) {
        // Same item: add 1 if room
        const cap = maxStack(cur.item);
        if (cur.count < cap) {
          cur.count++;
          this.cursorItem.count--;
          if (this.cursorItem.count <= 0) this.cursorItem = null;
        }
      } else {
        // Different item: swap entire stacks
        const tmp = { item: cur.item, count: cur.count, ...(cur.durability != null ? { durability: cur.durability } : {}) };
        grid.grid[i] = { item: this.cursorItem.item, count: this.cursorItem.count, ...(this.cursorItem.durability != null ? { durability: this.cursorItem.durability } : {}) };
        this.cursorItem = tmp;
      }
    }
    grid.refreshOutput();
    this.renderCraftingGrid();
    this._updateCursorVisual();
  }

  // Fresh stack from an id/count, initialising durability for tools/armour.
  _freshStack(itemId, count = 1) {
    const def = itemDef(itemId);
    const maxD = def && (def.tool ? def.tool.maxDurability : def.armor ? def.armor.maxDurability : null);
    return { item: itemId, count, ...(maxD != null && maxD > 0 ? { durability: maxD } : {}) };
  }

  _onCraftOutputClick(shiftKey) {
    const grid = this.craftingGrid;
    const out = grid.output;
    if (!out) return;
    // Shift+click: craft directly into inventory (like MC)
    if (shiftKey && this._inventoryRef) {
      const left = this._inventoryRef.add(out.id, out.count);
      if (left > 0) return; // inventory full, don't consume ingredients
      grid.consumeIngredients();
      grid.refreshOutput();
      this.renderCraftingGrid();
      this.renderInventoryGrid(this._inventoryRef);
      this.renderArmorSlots();
      this._updateCursorVisual();
      if (this.onCraft) this.onCraft(out.id, out.count);
      return;
    }
    if (this.cursorItem && (this.cursorItem.item !== out.id || this.cursorItem.count + out.count > maxStack(out.id))) return;
    if (!this.cursorItem) {
      this.cursorItem = this._freshStack(out.id, out.count);
    } else {
      this.cursorItem.count += out.count;
    }
    grid.consumeIngredients();
    grid.refreshOutput();
    this.renderCraftingGrid();
    this.renderInventoryGrid(this._inventoryRef);
    this._updateCursorVisual();
    // Craft XP callback
    if (this.onCraft) this.onCraft(out.id, out.count);
  }

  _updateCursorVisual() {
    if (!this.cursorItem) {
      this.cursorItemEl.style.display = 'none';
      return;
    }
    this.cursorItemEl.style.display = 'block';
    this.cursorItemEl.innerHTML = '';
    const id = this.cursorItem.item;
    const icon = isBlockItem(id)
      ? makeIcon(id, this.atlas)
      : this.makeItemIcon(id);
    if (icon) {
      icon.style.width = '32px'; icon.style.height = '32px';
      icon.style.imageRendering = 'pixelated';
      this.cursorItemEl.appendChild(icon);
    }
    if (this.cursorItem.count > 1) {
      const cnt = document.createElement('div');
      cnt.className = 'cur-count';
      cnt.textContent = this.cursorItem.count;
      this.cursorItemEl.appendChild(cnt);
    }
  }

  // --- furnace screen -------------------------------------------------------
  openFurnace(inventory, fx, fy, fz) {
    this.furnaceOpen = true;
    this._inventoryRef = inventory;
    this.furnacePos = (fx != null) ? { x: fx, y: fy, z: fz } : null;
    this.cursorItem = null;
    this.cursorItemEl.style.display = 'none';
    // Load furnace state from world if available
    if (this.world && this.furnacePos) {
      const fe = this.world.getFurnace(this.furnacePos.x, this.furnacePos.y, this.furnacePos.z);
      if (fe) {
        this.furnaceSlots.input = fe.input;
        this.furnaceSlots.fuel = fe.fuel;
        this.furnaceSlots.output = fe.output;
        this.furnaceBurnTime = fe.burnTime;
        this.furnaceMaxBurnTime = fe.maxBurnTime;
        this.furnaceSmeltTime = fe.smeltTime;
      } else {
        this.furnaceSlots = { input: null, fuel: null, output: null };
        this.furnaceBurnTime = 0;
        this.furnaceMaxBurnTime = 0;
        this.furnaceSmeltTime = 0;
      }
    }
    this.furnaceScreen.classList.add('open');
    if (this.audio) this.audio.containerOpen();
    this.renderFurnaceSlots();
    this._renderFurnaceInventory(inventory);
    this._updateScreenOpen();
    // Add tooltip listeners once (elements persist, slot data looked up dynamically)
    if (!this.furnaceInputEl._hasTooltip) {
      this._addSlotTooltipListeners(this.furnaceInputEl, null, 'input');
      this._addSlotTooltipListeners(this.furnaceFuelEl, null, 'fuel');
      this._addSlotTooltipListeners(this.furnaceOutputEl, null, 'output');
      this.furnaceInputEl._hasTooltip = this.furnaceFuelEl._hasTooltip = this.furnaceOutputEl._hasTooltip = true;
    }
  }

  closeFurnace() {
    // Save furnace state to world so it keeps cooking while UI is closed
    if (this.world && this.furnacePos) {
      const fe = this.world.getOrCreateFurnace(this.furnacePos.x, this.furnacePos.y, this.furnacePos.z);
      fe.input = this.furnaceSlots.input;
      fe.fuel = this.furnaceSlots.fuel;
      fe.output = this.furnaceSlots.output;
      fe.burnTime = this.furnaceBurnTime;
      fe.maxBurnTime = this.furnaceMaxBurnTime;
      fe.smeltTime = this.furnaceSmeltTime;
    }
    // Only cursor item goes back to inventory (items in slots stay in furnace)
    const overflow = [];
    if (this.cursorItem) {
      const inv = this._inventoryRef;
      if (inv) {
        const left = inv.add(this.cursorItem.item, this.cursorItem.count);
        if (left > 0) overflow.push({ item: this.cursorItem.item, count: left });
      } else {
        overflow.push({ item: this.cursorItem.item, count: this.cursorItem.count });
      }
      this.cursorItem = null;
    }
    if (overflow.length && this.onItemOverflow) this.onItemOverflow(overflow);
    this.cursorItemEl.style.display = 'none';
    this.furnaceOpen = false;
    this.furnaceScreen.classList.remove('open');
    if (this.audio) this.audio.containerClose();
    this.furnacePos = null;
    this._inventoryRef = null;
    this._updateScreenOpen();
  }

  openChest(chestSlots, inventory, chestX, chestY, chestZ) {
    this.chestOpen = true;
    this.chestSlots = chestSlots;
    this.chestPos = { x: chestX, y: chestY, z: chestZ };
    this._inventoryRef = inventory;
    this.cursorItem = null;
    this.cursorItemEl.style.display = 'none';
    this.chestScreen.classList.add('open');
    if (this.audio) this.audio.containerOpen();
    this._renderChestGrid();
    this._renderChestInventory(inventory);
    this._updateScreenOpen();
  }

  closeChest() {
    const overflow = [];
    if (this.cursorItem) {
      if (this._inventoryRef) {
        const left = this._inventoryRef.add(this.cursorItem.item, this.cursorItem.count);
        if (left > 0) overflow.push({ item: this.cursorItem.item, count: left });
      } else {
        overflow.push({ item: this.cursorItem.item, count: this.cursorItem.count });
      }
      this.cursorItem = null;
    }
    if (overflow.length && this.onItemOverflow) this.onItemOverflow(overflow);
    this.cursorItemEl.style.display = 'none';
    this.chestOpen = false;
    this.chestScreen.classList.remove('open');
    if (this.audio) this.audio.containerClose();
    this.chestSlots = null;
    this.chestPos = null;
    this._updateScreenOpen();
    this._inventoryRef = null;
  }

  _renderChestGrid() {
    this.chestGrid.innerHTML = '';
    for (let i = 0; i < 27; i++) {
      const slotEl = document.createElement('div');
      slotEl.className = 'inv-slot';
      slotEl.dataset.kind = 'chest';
      slotEl.dataset.idx = i;
      const s = this.chestSlots[i];
      if (s) {
        const icon = isBlockItem(s.item) ? makeIcon(s.item, this.atlas) : this.makeItemIcon(s.item);
        if (icon) { icon.style.width = '32px'; icon.style.height = '32px'; icon.style.imageRendering = 'pixelated'; slotEl.appendChild(icon); }
        if (s.count > 1) { const cnt = document.createElement('div'); cnt.className = 'inv-count'; cnt.textContent = s.count; slotEl.appendChild(cnt); }
      }
      const idx = i;
      this._addSlotTooltipListeners(slotEl, s);
      slotEl.addEventListener('click', (e) => { if (this._suppressClick) { this._suppressClick = false; return; } this._onChestSlotClick(idx, e.shiftKey); });
      slotEl.addEventListener('contextmenu', (e) => { e.preventDefault(); if (this._suppressClick) { this._suppressClick = false; return; } this._onChestSlotRightClick(idx); });
      slotEl.addEventListener('dblclick', () => this._onSlotDblClick('chest', idx));
      this.chestGrid.appendChild(slotEl);
    }
    this._notifyChestChange();
  }

  // Notify (throttled + de-duplicated) when the open chest's contents change so
  // multiplayer clients stay in sync. Wired up by main.js via onChestChange.
  _notifyChestChange() {
    if (!this.chestPos || !this.chestSlots || !this.onChestChange) return;
    const now = performance.now();
    if (now - (this._chestLastSend || 0) < 120) return;
    let sig;
    try { sig = JSON.stringify(this.chestSlots); } catch (e) { sig = ''; }
    if (sig === this._chestLastSig) return;
    this._chestLastSig = sig;
    this._chestLastSend = now;
    this.onChestChange(this.chestPos.x, this.chestPos.y, this.chestPos.z, this.chestSlots);
  }

  _onChestSlotClick(i, shiftKey) {
    const slot = this.chestSlots[i];
    const inv = this._inventoryRef;
    // Shift+click: quick move between chest and player inventory
    if (shiftKey && slot && inv) {
      const left = inv.add(slot.item, slot.count);
      if (left === 0) {
        this.chestSlots[i] = null;
      } else {
        slot.count = left;
      }
      this._renderChestGrid();
      if (inv) this._renderChestInventory(inv);
      this._updateCursorVisual();
      return;
    }
    if (this.cursorItem) {
      if (!slot) {
        this.chestSlots[i] = { item: this.cursorItem.item, count: this.cursorItem.count, ...(this.cursorItem.durability != null ? { durability: this.cursorItem.durability } : {}) };
        this.cursorItem = null;
      } else if (slot.item === this.cursorItem.item) {
        const cap = maxStack(slot.item);
        const add = Math.min(cap - slot.count, this.cursorItem.count);
        slot.count += add;
        this.cursorItem.count -= add;
        if (this.cursorItem.count <= 0) this.cursorItem = null;
      } else {
        const tmp = { item: slot.item, count: slot.count, ...(slot.durability != null ? { durability: slot.durability } : {}) };
        this.chestSlots[i] = { item: this.cursorItem.item, count: this.cursorItem.count, ...(this.cursorItem.durability != null ? { durability: this.cursorItem.durability } : {}) };
        this.cursorItem = tmp;
      }
    } else if (slot) {
      this.cursorItem = { item: slot.item, count: slot.count, ...(slot.durability != null ? { durability: slot.durability } : {}) };
      this.chestSlots[i] = null;
    }
    this._renderChestGrid();
    if (this._inventoryRef) this._renderChestInventory(this._inventoryRef);
    this._updateCursorVisual();
  }

  _renderChestInventory(inventory) {
    this.chestInvGrid = document.getElementById('chest-inv-grid');
    this.chestHotbarGrid = document.getElementById('chest-hotbar-grid');
    this.chestInvGrid.innerHTML = '';
    this.chestHotbarGrid.innerHTML = '';
    // Main inventory: slots 9-35 (3 rows of 9)
    for (let i = 9; i < 36; i++) {
      const slotEl = document.createElement('div');
      slotEl.className = 'inv-slot';
      slotEl.dataset.kind = 'chest-inv';
      slotEl.dataset.idx = i;
      const s = inventory.slots[i];
      if (s) {
        const icon = isBlockItem(s.item) ? makeIcon(s.item, this.atlas) : this.makeItemIcon(s.item);
        if (icon) { icon.style.width = '32px'; icon.style.height = '32px'; icon.style.imageRendering = 'pixelated'; slotEl.appendChild(icon); }
        if (s.count > 1) { const cnt = document.createElement('div'); cnt.className = 'inv-count'; cnt.textContent = s.count; slotEl.appendChild(cnt); }
      }
      const idx = i;
      slotEl.addEventListener('click', (e) => { if (this._suppressClick) { this._suppressClick = false; return; } this._onChestInvSlotClick(idx, e.shiftKey); });
      slotEl.addEventListener('contextmenu', (e) => { e.preventDefault(); if (this._suppressClick) { this._suppressClick = false; return; } this._onChestInvSlotRightClick(idx); });
      slotEl.addEventListener('dblclick', () => this._onSlotDblClick('chest-inv', idx));
      this._addSlotTooltipListeners(slotEl, s);
      this.chestInvGrid.appendChild(slotEl);
    }
    // Hotbar: slots 0-8 (1 row of 9)
    for (let i = 0; i < 9; i++) {
      const slotEl = document.createElement('div');
      slotEl.className = 'inv-slot';
      slotEl.dataset.kind = 'chest-hot';
      slotEl.dataset.idx = i;
      const numEl = document.createElement('div');
      numEl.className = 'inv-num';
      numEl.textContent = i + 1;
      slotEl.appendChild(numEl);
      const s = inventory.slots[i];
      if (s) {
        const icon = isBlockItem(s.item) ? makeIcon(s.item, this.atlas) : this.makeItemIcon(s.item);
        if (icon) { icon.style.width = '32px'; icon.style.height = '32px'; icon.style.imageRendering = 'pixelated'; slotEl.appendChild(icon); }
        if (s.count > 1) { const cnt = document.createElement('div'); cnt.className = 'inv-count'; cnt.textContent = s.count; slotEl.appendChild(cnt); }
      }
      const idx = i;
      slotEl.addEventListener('click', (e) => { if (this._suppressClick) { this._suppressClick = false; return; } this._onChestInvSlotClick(idx, e.shiftKey); });
      slotEl.addEventListener('contextmenu', (e) => { e.preventDefault(); if (this._suppressClick) { this._suppressClick = false; return; } this._onChestInvSlotRightClick(idx); });
      slotEl.addEventListener('dblclick', () => this._onSlotDblClick('chest-hot', idx));
      this._addSlotTooltipListeners(slotEl, s);
      this.chestHotbarGrid.appendChild(slotEl);
    }
  }

  _onChestInvSlotClick(i, shiftKey) {
    const inv = this._inventoryRef;
    if (!inv) return;
    const slot = inv.slots[i];
    // Shift+click: quick move from player inventory to chest
    if (shiftKey && slot) {
      // Find first empty or matching chest slot
      let target = -1;
      for (let j = 0; j < this.chestSlots.length; j++) {
        const cs = this.chestSlots[j];
        if (cs && cs.item === slot.item && cs.count < maxStack(slot.item)) { target = j; break; }
      }
      if (target === -1) {
        for (let j = 0; j < this.chestSlots.length; j++) {
          if (!this.chestSlots[j]) { target = j; break; }
        }
      }
      if (target === -1) return; // chest full
      const dest = this.chestSlots[target];
      if (dest && dest.item === slot.item) {
        const cap = maxStack(slot.item);
        const add = Math.min(cap - dest.count, slot.count);
        dest.count += add;
        slot.count -= add;
        if (slot.count <= 0) inv.slots[i] = null;
      } else if (!dest) {
        this.chestSlots[target] = { item: slot.item, count: slot.count };
        inv.slots[i] = null;
      }
      this._renderChestGrid();
      this._renderChestInventory(inv);
      this._updateCursorVisual();
      return;
    }
    if (this.cursorItem) {
      if (!slot) {
        inv.slots[i] = { item: this.cursorItem.item, count: this.cursorItem.count, ...(this.cursorItem.durability != null ? { durability: this.cursorItem.durability } : {}) };
        this.cursorItem = null;
      } else if (slot.item === this.cursorItem.item) {
        const cap = maxStack(slot.item);
        const add = Math.min(cap - slot.count, this.cursorItem.count);
        slot.count += add;
        this.cursorItem.count -= add;
        if (this.cursorItem.count <= 0) this.cursorItem = null;
      } else {
        const tmp = { item: slot.item, count: slot.count, ...(slot.durability != null ? { durability: slot.durability } : {}) };
        inv.slots[i] = { item: this.cursorItem.item, count: this.cursorItem.count, ...(this.cursorItem.durability != null ? { durability: this.cursorItem.durability } : {}) };
        this.cursorItem = tmp;
      }
    } else if (slot) {
      this.cursorItem = { item: slot.item, count: slot.count, ...(slot.durability != null ? { durability: slot.durability } : {}) };
      inv.slots[i] = null;
    }
    this._renderChestGrid();
    this._renderChestInventory(inv);
    this._updateCursorVisual();
  }

  renderFurnaceSlots() {
    const render = (el, slot) => {
      el.innerHTML = '';
      if (slot) {
        const icon = isBlockItem(slot.item) ? makeIcon(slot.item, this.atlas) : this.makeItemIcon(slot.item);
        if (icon) { icon.style.width = '32px'; icon.style.height = '32px'; icon.style.imageRendering = 'pixelated'; el.appendChild(icon); }
        if (slot.count > 1) { const cnt = document.createElement('div'); cnt.className = 'inv-count'; cnt.textContent = slot.count; el.appendChild(cnt); }
      }
    };
    render(this.furnaceInputEl, this.furnaceSlots.input);
    render(this.furnaceFuelEl, this.furnaceSlots.fuel);
    render(this.furnaceOutputEl, this.furnaceSlots.output);
    this.furnaceInputEl.dataset.kind = 'furnace-input';
    this.furnaceInputEl.dataset.idx = 'input';
    this.furnaceFuelEl.dataset.kind = 'furnace-fuel';
    this.furnaceFuelEl.dataset.idx = 'fuel';
    this.furnaceOutputEl.dataset.kind = 'furnace-output';
    this.furnaceOutputEl.dataset.idx = 'output';
    this.furnaceInputEl.onclick = (e) => { if (this._suppressClick) { this._suppressClick = false; return; } this._onFurnaceSlotClick('input', e.shiftKey); };
    this.furnaceFuelEl.onclick = (e) => { if (this._suppressClick) { this._suppressClick = false; return; } this._onFurnaceSlotClick('fuel', e.shiftKey); };
    this.furnaceOutputEl.onclick = (e) => { if (this._suppressClick) { this._suppressClick = false; return; } this._onFurnaceSlotClick('output', e.shiftKey); };
    this.furnaceInputEl.oncontextmenu = (e) => { e.preventDefault(); if (this._suppressClick) { this._suppressClick = false; return; } this._onFurnaceSlotRightClick('input'); };
    this.furnaceFuelEl.oncontextmenu = (e) => { e.preventDefault(); if (this._suppressClick) { this._suppressClick = false; return; } this._onFurnaceSlotRightClick('fuel'); };
    this.furnaceOutputEl.oncontextmenu = (e) => { e.preventDefault(); if (this._suppressClick) { this._suppressClick = false; return; } this._onFurnaceSlotRightClick('output'); };
    this.furnaceInputEl.ondblclick = () => this._onSlotDblClick('furnace-input', 'input');
    this.furnaceFuelEl.ondblclick = () => this._onSlotDblClick('furnace-fuel', 'fuel');
    this.furnaceOutputEl.ondblclick = () => this._onSlotDblClick('furnace-output', 'output');
  }

  _renderFurnaceInventory(inventory) {
    this.furnaceInvGrid.innerHTML = '';
    for (let i = 0; i < 36; i++) {
      const slotEl = document.createElement('div');
      slotEl.className = 'inv-slot';
      slotEl.dataset.kind = 'furnace-inv';
      slotEl.dataset.idx = i;
      if (i === 9) {
        const sep = document.createElement('div');
        sep.className = 'inv-separator';
        this.furnaceInvGrid.appendChild(sep);
      }
      if (i < 9) {
        const numEl = document.createElement('div');
        numEl.className = 'inv-num';
        numEl.textContent = i + 1;
        slotEl.appendChild(numEl);
      }
      const s = inventory.slots[i];
      if (s) {
        const icon = isBlockItem(s.item)
          ? makeIcon(s.item, this.atlas)
          : this.makeItemIcon(s.item);
        if (icon) {
          icon.style.width = '32px'; icon.style.height = '32px';
          icon.style.imageRendering = 'pixelated';
          slotEl.appendChild(icon);
        }
        if (s.count > 1) {
          const cnt = document.createElement('div');
          cnt.className = 'inv-count';
          cnt.textContent = s.count;
          slotEl.appendChild(cnt);
        }
      }
      slotEl.addEventListener('click', (e) => { if (this._suppressClick) { this._suppressClick = false; return; } this._onFurnaceInvSlotClick(i, e.shiftKey); });
      slotEl.addEventListener('contextmenu', (e) => { e.preventDefault(); if (this._suppressClick) { this._suppressClick = false; return; } this._onFurnaceInvSlotRightClick(i); });
      slotEl.addEventListener('dblclick', () => this._onSlotDblClick('furnace-inv', i));
      this._addSlotTooltipListeners(slotEl, s);
      this.furnaceInvGrid.appendChild(slotEl);
    }
  }

  _onFurnaceInvSlotClick(i, shiftKey) {
    const inv = this._inventoryRef;
    if (!inv) return;
    const slot = inv.slots[i];
    // Shift+click: move item from inventory to furnace input or fuel
    if (shiftKey && slot) {
      const def = itemDef(slot.item);
      const isFuel = def && def.burnTime;
      const target = isFuel ? 'fuel' : 'input';
      const dest = this.furnaceSlots[target];
      if (dest && dest.item === slot.item) {
        const cap = maxStack(slot.item);
        const add = Math.min(cap - dest.count, slot.count);
        dest.count += add;
        slot.count -= add;
        if (slot.count <= 0) inv.slots[i] = null;
      } else if (!dest) {
        this.furnaceSlots[target] = { item: slot.item, count: slot.count };
        inv.slots[i] = null;
      }
      this.renderFurnaceSlots();
      this._renderFurnaceInventory(inv);
      this._updateCursorVisual();
      return;
    }
    if (this.cursorItem) {
      if (!slot) {
        inv.slots[i] = { item: this.cursorItem.item, count: this.cursorItem.count };
        this.cursorItem = null;
      } else if (slot.item === this.cursorItem.item) {
        const cap = maxStack(slot.item);
        const add = Math.min(cap - slot.count, this.cursorItem.count);
        slot.count += add;
        this.cursorItem.count -= add;
        if (this.cursorItem.count <= 0) this.cursorItem = null;
      } else {
        inv.slots[i] = { item: this.cursorItem.item, count: this.cursorItem.count };
        this.cursorItem = { item: slot.item, count: slot.count };
      }
    } else if (slot) {
      this.cursorItem = { item: slot.item, count: slot.count };
      inv.slots[i] = null;
    }
    this._renderFurnaceInventory(inv);
    this._updateCursorVisual();
  }

  _onFurnaceSlotClick(which, shiftKey) {
    const slot = this.furnaceSlots[which];
    const inv = this._inventoryRef;
    // Shift+click: output goes to inventory, input/fuel goes from inventory
    if (shiftKey && slot && inv) {
      if (which === 'output') {
        const left = inv.add(slot.item, slot.count);
        if (left === 0) {
          this.furnaceSlots[which] = null;
        } else {
          slot.count = left;
        }
      }
      this.renderFurnaceSlots();
      if (inv) this._renderFurnaceInventory(inv);
      this._updateCursorVisual();
      return;
    }
    if (this.cursorItem) {
      if (!slot) {
        this.furnaceSlots[which] = { item: this.cursorItem.item, count: this.cursorItem.count, ...(this.cursorItem.durability != null ? { durability: this.cursorItem.durability } : {}) };
        this.cursorItem = null;
      } else if (slot.item === this.cursorItem.item) {
        const cap = maxStack(slot.item);
        const add = Math.min(cap - slot.count, this.cursorItem.count);
        slot.count += add;
        this.cursorItem.count -= add;
        if (this.cursorItem.count <= 0) this.cursorItem = null;
      } else {
        const tmp = { item: slot.item, count: slot.count, ...(slot.durability != null ? { durability: slot.durability } : {}) };
        this.furnaceSlots[which] = { item: this.cursorItem.item, count: this.cursorItem.count, ...(this.cursorItem.durability != null ? { durability: this.cursorItem.durability } : {}) };
        this.cursorItem = tmp;
      }
    } else if (slot) {
      this.cursorItem = { item: slot.item, count: slot.count, ...(slot.durability != null ? { durability: slot.durability } : {}) };
      this.furnaceSlots[which] = null;
    }
    this.renderFurnaceSlots();
    if (this._inventoryRef) this._renderFurnaceInventory(this._inventoryRef);
    this._updateCursorVisual();
  }

  tickFurnace(dt, smelting, fuelValue, smeltTime) {
    // Tick ALL furnaces in the world (background cooking when UI is closed)
    if (this.world && this.world.furnaceEntities) {
      for (const [k, fe] of this.world.furnaceEntities) {
        this._tickSingleFurnace(dt, fe, smelting, fuelValue, smeltTime);
      }
    }
    // Also tick the UI-open furnace slots (which may differ from world state during interaction)
    if (this.furnaceOpen) {
      this._tickSingleFurnace(dt, this.furnaceSlots, smelting, fuelValue, smeltTime);
      this._updateFurnaceUI();
    }
  }

  _tickSingleFurnace(dt, fs, smelting, fuelValue, smeltTime) {
    // burn fuel
    const burnKey = fs === this.furnaceSlots ? 'furnaceBurnTime' : null;
    let burnTime = burnKey ? this.furnaceBurnTime : (fs._burnTime || 0);
    let maxBurn = burnKey ? this.furnaceMaxBurnTime : (fs._maxBurn || 0);
    let smeltProg = burnKey ? this.furnaceSmeltTime : (fs._smeltTime || 0);

    if (burnTime > 0) {
      burnTime -= dt;
    } else if (fs.fuel && fs.input) {
      const fv = fuelValue(fs.fuel.item);
      if (fv > 0) {
        burnTime = fv * 0.05;
        maxBurn = burnTime;
        fs.fuel.count--;
        if (fs.fuel.count <= 0) fs.fuel = null;
      }
    }

    // smelt
    let didSmelt = false;
    if (burnTime > 0 && fs.input) {
      const out = smelting(fs.input.item);
      if (out != null) {
        const outCount = fs.output && fs.output.item === out ? fs.output.count : 0;
        if (outCount < 64) {
          const smeltDuration = smeltTime ? smeltTime(fs.input.item) : 10;
          smeltProg += dt;
          if (smeltProg >= smeltDuration) {
            smeltProg = 0;
            const inputItem = fs.input.item;
            fs.input.count--;
            if (fs.input.count <= 0) fs.input = null;
            if (fs.output && fs.output.item === out) {
              fs.output.count++;
            } else {
              fs.output = { item: out, count: 1 };
            }
            didSmelt = true;
            if (this.audio && this.furnaceOpen && fs === this.furnaceSlots) this.audio.furnaceCook();
            if (this.onSmelt) this.onSmelt(inputItem, 1);
          }
        }
      }
    } else {
      smeltProg = 0;
    }

    // Persist back to furnace entity
    if (burnKey) {
      this.furnaceBurnTime = burnTime;
      this.furnaceMaxBurnTime = maxBurn;
      this.furnaceSmeltTime = smeltProg;
    } else {
      fs._burnTime = burnTime;
      fs._maxBurn = maxBurn;
      fs._smeltTime = smeltProg;
    }

    return didSmelt;
  }

  _updateFurnaceUI() {
    const fs = this.furnaceSlots;
    const smeltDuration = 10; // UI-only fallback
    if (this.furnaceProgressFill) {
      const pct = this.furnaceBurnTime > 0 ? Math.round((this.furnaceSmeltTime / smeltDuration) * 100) : 0;
      this.furnaceProgressFill.style.width = pct + '%';
    }
    // arrow fill
    if (this.furnaceArrowFill) {
      const apct = this.furnaceBurnTime > 0 ? Math.round((this.furnaceSmeltTime / smeltDuration) * 100) : 0;
      const ax = apct / 100 * 40;
      this.furnaceArrowFill.setAttribute('points', `0,6 ${ax},6 ${ax},0 40,12 ${ax},24 ${ax},18 0,18`);
      this.furnaceArrowFill.setAttribute('fill', apct > 0 ? '#f80' : '#555');
    }
    // flame fill
    if (this.furnaceFlameFill) {
      this.furnaceFlameFill.style.display = this.furnaceBurnTime > 0 ? '' : 'none';
    }
    // fuel bar
    if (this.furnaceFuelBarFill) {
      const pct = this.furnaceMaxBurnTime > 0 ? Math.max(0, Math.round((this.furnaceBurnTime / this.furnaceMaxBurnTime) * 100)) : 0;
      this.furnaceFuelBarFill.style.width = pct + '%';
    }
    if (this.furnaceOpen) this.renderFurnaceSlots();
  }

  _slotAtElement(el) {
    if (!el) return null;
    let node = el;
    while (node && node !== document.body) {
      if (node.dataset && node.dataset.kind != null && node.dataset.idx != null) {
        const kind = node.dataset.kind;
        const idx = isNaN(node.dataset.idx) ? node.dataset.idx : parseInt(node.dataset.idx);
        return { kind, idx };
      }
      node = node.parentElement;
    }
    return null;
  }

  _getSlot(kind, idx) {
    const inv = this._inventoryRef;
    switch (kind) {
      case 'inv': return inv ? inv.slots[idx] : null;
      case 'craft': return this.craftingGrid ? this.craftingGrid.grid[idx] : null;
      case 'craft-out': {
        const out = this.craftingGrid ? this.craftingGrid.output : null;
        return out ? { item: out.id, count: out.count, ...(out.durability != null ? { durability: out.durability } : {}) } : null;
      }
      case 'chest': return this.chestSlots ? this.chestSlots[idx] : null;
      case 'chest-inv':
      case 'chest-hot': return inv ? inv.slots[idx] : null;
      case 'furnace-input': return this.furnaceSlots.input;
      case 'furnace-fuel': return this.furnaceSlots.fuel;
      case 'furnace-output': return this.furnaceSlots.output;
      case 'furnace-inv': return inv ? inv.slots[idx] : null;
      default: return null;
    }
  }

  _setSlot(kind, idx, data) {
    const inv = this._inventoryRef;
    switch (kind) {
      case 'inv': if (inv) inv.slots[idx] = data; break;
      case 'craft': if (this.craftingGrid) this.craftingGrid.grid[idx] = data; break;
      case 'chest': if (this.chestSlots) this.chestSlots[idx] = data; break;
      case 'chest-inv':
      case 'chest-hot': if (inv) inv.slots[idx] = data; break;
      case 'furnace-input': this.furnaceSlots.input = data; break;
      case 'furnace-fuel': this.furnaceSlots.fuel = data; break;
      case 'furnace-output': this.furnaceSlots.output = data; break;
      case 'furnace-inv': if (inv) inv.slots[idx] = data; break;
    }
  }

  _refreshScreen() {
    if (this.inventoryOpen) {
      this.renderInventoryGrid(this._inventoryRef);
      this.renderCraftingGrid();
      this.renderArmorSlots();
    } else if (this.chestOpen) {
      this._renderChestGrid();
      if (this._inventoryRef) this._renderChestInventory(this._inventoryRef);
    } else if (this.furnaceOpen) {
      this.renderFurnaceSlots();
      if (this._inventoryRef) this._renderFurnaceInventory(this._inventoryRef);
    }
  }

  _getAllVisibleSlots() {
    const result = [];
    const inv = this._inventoryRef;
    if (this.inventoryOpen) {
      for (let i = 0; i < 36; i++) result.push({ kind: 'inv', idx: i });
      for (let i = 0; i < this.craftingGrid.size * this.craftingGrid.size; i++) result.push({ kind: 'craft', idx: i });
    }
    if (this.chestOpen) {
      for (let i = 0; i < 27; i++) result.push({ kind: 'chest', idx: i });
      if (inv) {
        for (let i = 9; i < 36; i++) result.push({ kind: 'chest-inv', idx: i });
        for (let i = 0; i < 9; i++) result.push({ kind: 'chest-hot', idx: i });
      }
    }
    if (this.furnaceOpen) {
      result.push({ kind: 'furnace-input', idx: 'input' });
      result.push({ kind: 'furnace-fuel', idx: 'fuel' });
      result.push({ kind: 'furnace-output', idx: 'output' });
      if (inv) {
        for (let i = 0; i < 36; i++) result.push({ kind: 'furnace-inv', idx: i });
      }
    }
    return result;
  }

  _hoveredSlot() {
    const el = document.elementFromPoint(this._lastMousePos.x, this._lastMousePos.y);
    return this._slotAtElement(el);
  }

  _rightClickSlot(kind, idx) {
    const cur = this._getSlot(kind, idx);
    if (this.cursorItem) {
      if (!cur) {
        this._setSlot(kind, idx, { item: this.cursorItem.item, count: 1, ...(this.cursorItem.durability != null ? { durability: this.cursorItem.durability } : {}) });
        this.cursorItem.count--;
        if (this.cursorItem.count <= 0) this.cursorItem = null;
      } else if (cur.item === this.cursorItem.item) {
        const cap = maxStack(cur.item);
        if (cur.count < cap) {
          cur.count++;
          this.cursorItem.count--;
          if (this.cursorItem.count <= 0) this.cursorItem = null;
        }
      } else {
        const tmp = { item: cur.item, count: cur.count, ...(cur.durability != null ? { durability: cur.durability } : {}) };
        this._setSlot(kind, idx, { item: this.cursorItem.item, count: this.cursorItem.count, ...(this.cursorItem.durability != null ? { durability: this.cursorItem.durability } : {}) });
        this.cursorItem = tmp;
      }
    } else {
      if (!cur) return;
      const half = Math.ceil(cur.count / 2);
      this.cursorItem = { item: cur.item, count: half, ...(cur.durability != null ? { durability: cur.durability } : {}) };
      cur.count -= half;
      if (cur.count <= 0) this._setSlot(kind, idx, null);
    }
  }

  _onChestSlotRightClick(i) {
    this._rightClickSlot('chest', i);
    this._renderChestGrid();
    if (this._inventoryRef) this._renderChestInventory(this._inventoryRef);
    this._updateCursorVisual();
  }

  _onChestInvSlotRightClick(i) {
    this._rightClickSlot('chest-inv', i);
    this._renderChestGrid();
    if (this._inventoryRef) this._renderChestInventory(this._inventoryRef);
    this._updateCursorVisual();
  }

  _onFurnaceSlotRightClick(which) {
    const kind = 'furnace-' + which;
    this._rightClickSlot(kind, which);
    this.renderFurnaceSlots();
    if (this._inventoryRef) this._renderFurnaceInventory(this._inventoryRef);
    this._updateCursorVisual();
  }

  _onFurnaceInvSlotRightClick(i) {
    this._rightClickSlot('furnace-inv', i);
    this.renderFurnaceSlots();
    if (this._inventoryRef) this._renderFurnaceInventory(this._inventoryRef);
    this._updateCursorVisual();
  }

  _onSlotDblClick(kind, idx) {
    if (!this.cursorItem) return;
    const targetType = this.cursorItem.item;
    const cap = maxStack(targetType);
    const slots = this._getAllVisibleSlots();
    for (const { kind: sk, idx: si } of slots) {
      if (this.cursorItem.count >= cap) break;
      const s = this._getSlot(sk, si);
      if (s && s.item === targetType) {
        const canAdd = Math.min(s.count, cap - this.cursorItem.count);
        if (canAdd > 0) {
          this.cursorItem.count += canAdd;
          s.count -= canAdd;
          if (s.count <= 0) this._setSlot(sk, si, null);
        }
      }
    }
    this._refreshScreen();
    this._updateCursorVisual();
  }

  _onDragPointerDown(e) {
    if (e.button !== 0 && e.button !== 2) return;
    if (!this.inventoryOpen && !this.chestOpen && !this.furnaceOpen) return;
    const el = document.elementFromPoint(e.clientX, e.clientY);
    const slot = this._slotAtElement(el);
    if (!slot) return;
    this._dragState = {
      button: e.button,
      startKind: slot.kind,
      startIdx: slot.idx,
      visited: new Map(),
      moved: false,
      startX: e.clientX,
      startY: e.clientY,
    };
  }

  _onDragPointerMove(e) {
    if (!this._dragState) return;
    const ds = this._dragState;
    const dx = e.clientX - ds.startX;
    const dy = e.clientY - ds.startY;
    if (!ds.moved && (dx * dx + dy * dy > 16)) {
      ds.moved = true;
      if (ds.button === 0) {
        const cur = this._getSlot(ds.startKind, ds.startIdx);
        if (cur && !this.cursorItem) {
          this.cursorItem = { item: cur.item, count: cur.count, ...(cur.durability != null ? { durability: cur.durability } : {}) };
          this._setSlot(ds.startKind, ds.startIdx, null);
          this._refreshScreen();
          this._updateCursorVisual();
        }
      }
    }
    if (!ds.moved) return;
    const el = document.elementFromPoint(e.clientX, e.clientY);
    const slot = this._slotAtElement(el);
    if (!slot) return;
    const key = slot.kind + ':' + slot.idx;
    if (ds.visited.has(key)) return;
    ds.visited.set(key, slot);
    if (ds.button === 2 && this.cursorItem) {
      const cur = this._getSlot(slot.kind, slot.idx);
      if (!cur) {
        this._setSlot(slot.kind, slot.idx, { item: this.cursorItem.item, count: 1, ...(this.cursorItem.durability != null ? { durability: this.cursorItem.durability } : {}) });
        this.cursorItem.count--;
        if (this.cursorItem.count <= 0) this.cursorItem = null;
      } else if (cur.item === this.cursorItem.item) {
        const cap = maxStack(cur.item);
        if (cur.count < cap) {
          cur.count++;
          this.cursorItem.count--;
          if (this.cursorItem.count <= 0) this.cursorItem = null;
        }
      }
      this._refreshScreen();
      this._updateCursorVisual();
    }
  }

  _onDragPointerUp(e) {
    if (!this._dragState) return;
    const ds = this._dragState;
    this._dragState = null;
    if (!ds.moved) return;
    if (ds.button === 0 && this.cursorItem) {
      const visited = Array.from(ds.visited.values());
      const startKey = ds.startKind + ':' + ds.startIdx;
      if (!ds.visited.has(startKey)) {
        visited.push({ kind: ds.startKind, idx: ds.startIdx });
      }
      if (visited.length > 0 && this.cursorItem) {
        const item = this.cursorItem.item;
        const total = this.cursorItem.count;
        const perSlot = Math.floor(total / visited.length);
        let remainder = total % visited.length;
        for (const { kind, idx } of visited) {
          const cur = this._getSlot(kind, idx);
          const toAdd = perSlot + (remainder > 0 ? 1 : 0);
          if (remainder > 0) remainder--;
          if (toAdd <= 0) continue;
          if (!cur) {
            this._setSlot(kind, idx, { item, count: toAdd, ...(this.cursorItem.durability != null ? { durability: this.cursorItem.durability } : {}) });
          } else if (cur.item === item) {
            cur.count += toAdd;
          }
        }
        this.cursorItem = null;
      }
    }
    this._suppressClick = true;
    this._refreshScreen();
    this._updateCursorVisual();
  }

  // --- creative block browser ------------------------------------------------
  _buildCreativeItemList() {
    // Blocks
    for (const [idStr, def] of Object.entries(BLOCKS)) {
      const id = Number(idStr);
      if (id === 0 || id === 8) continue; // skip air and water
      if (def.name) this._creativeItems.push({ id, name: def.name, type: 'block' });
    }
    // Non-block items
    for (const [key, val] of Object.entries(ITEM)) {
      if (typeof val !== 'number') continue;
      if (val < 256) continue; // block items already added
      const def = itemDef(val);
      if (def && def.name) {
        this._creativeItems.push({ id: val, name: def.name, type: 'item' });
      }
    }
    // Tools
    for (const [key, val] of Object.entries(ITEM)) {
      if (typeof val !== 'number') continue;
      if (val < 512) continue;
      const def = itemDef(val);
      if (def && def.name) {
        this._creativeItems.push({ id: val, name: def.name, type: 'tool' });
      }
    }
    this._creativeItems.sort((a, b) => a.name.localeCompare(b.name));
  }

  _populateCreativeGrid(filter = '') {
    if (!this.creativeGrid) return;
    this.creativeGrid.innerHTML = '';
    const lf = filter.toLowerCase();
    const items = lf
      ? this._creativeItems.filter(c => c.name.toLowerCase().includes(lf))
      : this._creativeItems;
    for (const ci of items) {
      const slotEl = document.createElement('div');
      slotEl.className = 'inv-slot';
      const icon = isBlockItem(ci.id)
        ? makeIcon(ci.id, this.atlas)
        : this.makeItemIcon(ci.id);
      if (icon) {
        icon.style.width = '28px'; icon.style.height = '28px';
        icon.style.imageRendering = 'pixelated';
        slotEl.appendChild(icon);
      }
      const nameEl = document.createElement('div');
      nameEl.className = 'cri-name';
      nameEl.textContent = ci.name;
      slotEl.appendChild(nameEl);
      slotEl.addEventListener('click', () => {
        const inv = this._inventoryRef;
        if (!inv) return;
        if (this.creative) {
          const count = ci.type === 'block' ? 64 : 1;
          // Stack onto existing matching slot first, then find empty slot
          let placed = false;
          for (let s = 0; s < 36; s++) {
            const slot = inv.slots[s];
            if (slot && slot.item === ci.id) {
              const cap = maxStack(ci.id);
              if (slot.count < cap) {
                slot.count = Math.min(slot.count + count, cap);
                placed = true;
                break;
              }
            }
          }
          if (!placed) {
            for (let s = 0; s < 36; s++) {
              if (!inv.slots[s]) { inv.slots[s] = { item: ci.id, count }; placed = true; break; }
            }
          }
          if (!placed) inv.slots[inv.selected] = { item: ci.id, count };
          this.renderInventoryGrid(inv);
          this.buildHotbarFromInventory(inv);
          this._updateCursorVisual();
        } else {
          inv.add(ci.id, ci.type === 'block' ? 64 : 1);
        }
      });
      this.creativeGrid.appendChild(slotEl);
    }
  }

  _filterCreativeGrid() {
    this._populateCreativeGrid(this.creativeSearch ? this.creativeSearch.value : '');
  }
}
