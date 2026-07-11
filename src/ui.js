// DOM UI: hotbar (with stack counts), health hearts, hunger drumsticks,
// armor bar, HUD (coords/fps/biome), block-break progress overlay.
//
// The hotbar reads from the player's Inventory in survival mode, or falls back
// to the fixed HOTBAR_BLOCKS creative palette. Stack counts display when > 1.

import { HOTBAR_BLOCKS, BLOCKS } from './blocks.js';
import { makeIcon } from './tiles.js';
import { itemDef, isBlockItem, itemName, maxStack, ITEM } from './items.js';
import { HOTBAR_SLOTS } from './inventory.js';
import { CraftingGrid } from './crafting.js';
import { matchRecipe } from './recipes.js';

const HEART_COLS = '#b00', HEART_HALF_L = '#b00', HEART_HALF_R = '#633';
const HEART_EMPTY = '#411';
const DRUM_COLS = '#b87333', DRUM_HALF_L = '#b87333', DRUM_HALF_R = '#7a4a20';
const DRUM_EMPTY = '#3a2210';

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

const CRACK_STAGES = [
  null,
  // Stage 1: tiny hairline crack
  [[7,3],[8,4],[7,5]],
  // Stage 2: small crack
  [[6,2],[7,3],[8,4],[7,5],[6,6]],
  // Stage 3: branching
  [[5,1],[6,2],[7,3],[8,4],[7,5],[6,6],[5,7],[9,3],[9,5]],
  // Stage 4: more visible
  [[4,0],[5,1],[6,2],[7,3],[8,4],[7,5],[6,6],[5,7],[4,8],[9,2],[10,4],[9,6]],
  // Stage 5: wider cracks
  [[3,0],[4,1],[5,2],[6,3],[7,4],[8,5],[7,6],[6,7],[5,8],[4,9],[10,1],[11,3],[10,5],[9,7],[8,8]],
  // Stage 6: significant cracking
  [[2,0],[3,1],[4,2],[5,3],[6,4],[7,5],[8,6],[7,7],[6,8],[5,9],[4,10],[3,11],[11,0],[12,2],[11,4],[10,6],[9,8],[8,10]],
  // Stage 7: heavy cracking
  [[1,0],[2,1],[3,2],[4,3],[5,4],[6,5],[7,6],[8,7],[7,8],[6,9],[5,10],[4,11],[3,12],[13,1],[12,3],[11,5],[10,7],[9,9],[8,11],[7,12]],
  // Stage 8: severe
  [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[7,10],[6,11],[5,12],[4,13],[14,0],[13,2],[12,4],[11,6],[10,8],[9,10],[8,12]],
  // Stage 9: nearly broken
  [[0,2],[1,3],[2,4],[3,5],[4,6],[5,7],[6,8],[7,9],[8,10],[7,11],[6,12],[5,13],[15,1],[14,3],[13,5],[12,7],[11,9],[10,11],[9,13]],
  // Stage 10: about to shatter
  [[0,3],[1,4],[2,5],[3,6],[4,7],[5,8],[6,9],[7,10],[8,11],[7,12],[6,13],[5,14],[15,2],[14,4],[13,6],[12,8],[11,10],[10,12],[9,14],[4,2],[5,1],[10,1],[11,2],[3,9],[4,10],[11,12],[12,11]],
];

// Cache canvases to avoid expensive toDataURL every frame
const _heartCache = new Map();
const _drumCache = new Map();

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
    drawToolIcon(x, def.tool.type, def.tool.material);
    return c;
  }

  // Armor — draw a small armor piece icon.
  if (def.armor) {
    drawArmorIcon(x, def.armor, itemId);
    return c;
  }

  // Dispatch every non-tool item by id.
  switch (itemId) {
    case 256: drawStick(x); break;
    case 257: drawCoal(x, false); break;
    case 258: drawCoal(x, true); break;
    case 259: drawIngot(x, '#e6e6e6', '#c8c8c8', '#9a9a9a'); break;        // iron
    case 260: drawIngot(x, '#fce74a', '#e8c832', '#b89818'); break;        // gold
    case 261: drawDiamond(x); break;
    case 262: drawWheat(x); break;
    case 263: drawSeeds(x); break;
    case 264: drawBread(x); break;
    case 265: drawApple(x, false); break;
    case 284: drawApple(x, true); break;
    // meat: raw / cooked pairs
    case 266: drawMeat(x, '#d88', '#b66', '#854', false); break;           // raw porkchop
    case 267: drawMeat(x, '#c87a52', '#a8623c', '#7a4828', true); break;   // cooked porkchop
    case 268: drawMeat(x, '#d66', '#b44', '#833', false); break;           // raw beef
    case 269: drawMeat(x, '#9a5230', '#7a3e22', '#582812', true); break;   // steak
    case 270: drawMeat(x, '#ecc', '#caa', '#999', false); break;           // raw chicken
    case 271: drawMeat(x, '#d8a868', '#b8884a', '#8a6230', true); break;   // cooked chicken
    case 272: drawMeat(x, '#d99', '#b77', '#866', false); break;           // raw mutton
    case 273: drawMeat(x, '#b56838', '#944e26', '#683814', true); break;   // cooked mutton
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
    case 285: drawBed(x); break;
    case 286: drawSpiderEye(x); break;
    case 287: drawPrismiteGem(x); break;
    // New BlockForge foods
    case 290: drawMeat(x, '#7a9a5a', '#5e7a42', '#3e542a', false); break;   // rotten flesh
    case 296: drawGoldenApple(x); break;
    case 297: drawCookie(x); break;
    case 298: drawMelonSlice(x); break;
    case 299: drawCarrot(x, '#e8881e', '#b86410'); break;
    case 300: drawPotato(x, '#b89a5a', '#8a7038'); break;
    case 301: drawPotato(x, '#d8c088', '#a89050'); break;
    case 302: drawPumpkinPie(x); break;
    case 303: drawCarrot(x, '#f5d020', '#c8a410'); break;
    default: {
      // Fallback: a subtle gem-stone so unknown items still read nicely.
      x.fillStyle = '#888';
      x.fillRect(3, 3, 10, 10);
      x.fillStyle = '#aaa';
      x.fillRect(3, 3, 10, 1);
      x.fillStyle = '#666';
      x.fillRect(3, 12, 10, 1);
    }
  }
  return c;
}

// ---- generic helpers used by the item painters ------------------------------
function px(x, col, gx, gy, w = 1, h = 1) { x.fillStyle = col; x.fillRect(gx, gy, w, h); }
function pxa(x, col, gx, gy, w, h) { // alpha helper
  x.save(); x.globalAlpha = col.a; x.fillStyle = col.c;
  x.fillRect(gx, gy, w, h); x.restore();
}
const hl = (c) => ({ c, a: 0.3 });   // top-edge specular tint

// ---- materials --------------------------------------------------------------
function drawStick(x) {
  // A crooked twig with a lighter lit edge and a small branch.
  px(x, '#6e5230', 7, 2, 2, 13);   // body
  px(x, '#8a6a3c', 7, 2, 1, 13);   // lit left edge
  px(x, '#4a3618', 8, 2, 1, 13);   // shadow right edge
  px(x, '#6e5230', 5, 5, 2, 2);    // branch nub
  px(x, '#4a3618', 6, 6, 1, 1);
  px(x, '#7a5c34', 9, 9, 3, 2);    // branch nub
  px(x, '#4a3618', 11, 10, 1, 1);
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
const TOOL_PALETTES = {
  WOOD:    { head: '#9c6b3a', mid: '#7a4f24', dark: '#523018', lit: '#b88a52' },
  STONE:   { head: '#9a9a9a', mid: '#7c7c7c', dark: '#545454', lit: '#b6b6b6' },
  IRON:    { head: '#e2e2e2', mid: '#b8b8b8', dark: '#828282', lit: '#f4f4f4' },
  DIAMOND: { head: '#5fe3c0', mid: '#3fb89a', dark: '#247a64', lit: '#8ff0d8' },
  GOLD:    { head: '#fce74a', mid: '#d8b620', dark: '#a07e10', lit: '#fff48a' },
  PRISMITE:{ head: '#40c850', mid: '#2a9038', dark: '#186820', lit: '#60e870' },
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
  }
}

export function drawCrack(c, stage) {
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, 64, 64);
  if (!stage || stage < 1 || stage > 10) return;
  const cracks = CRACK_STAGES[stage];
  if (!cracks) return;

  // Dark crack lines — get thicker as stage increases
  const thickness = 1 + stage * 0.3;
  const alpha = 0.6 + stage * 0.04;

  // Draw individual crack segments
  ctx.strokeStyle = `rgba(0,0,0,${alpha})`;
  ctx.lineWidth = thickness;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // Connect points into crack lines
  if (cracks.length > 1) {
    ctx.beginPath();
    ctx.moveTo(cracks[0][0] * 4, cracks[0][1] * 4);
    for (let i = 1; i < cracks.length; i++) {
      const [cx, cy] = cracks[i];
      ctx.lineTo(cx * 4, cy * 4);
    }
    ctx.stroke();
  }

  // Draw branch lines at intersections
  ctx.lineWidth = thickness * 0.7;
  for (let i = 0; i < cracks.length; i += 3) {
    const [cx, cy] = cracks[i];
    if (i + 1 < cracks.length) {
      const [nx, ny] = cracks[i + 1];
      ctx.beginPath();
      ctx.moveTo(cx * 4, cy * 4);
      ctx.lineTo(nx * 4 + (Math.random() - 0.5) * 6, ny * 4 + (Math.random() - 0.5) * 6);
      ctx.stroke();
    }
  }

  // Dark center line (main crack vein)
  if (stage >= 5) {
    ctx.strokeStyle = `rgba(0,0,0,${alpha * 0.8})`;
    ctx.lineWidth = thickness + 1;
    ctx.beginPath();
    for (let i = 0; i < cracks.length; i += 2) {
      const [cx, cy] = cracks[i];
      if (i === 0) ctx.moveTo(cx * 4, cy * 4);
      else ctx.lineTo(cx * 4, cy * 4);
    }
    ctx.stroke();
  }
}

export class UI {
  constructor(atlasCanvas) {
    this.atlas = atlasCanvas;
    this.hotbarEl = document.getElementById('hotbar');
    this.hudEl = document.getElementById('hud');
    this.overlayEl = document.getElementById('overlay');
    this.crosshair = document.getElementById('crosshair');
    this.itemNameEl = document.getElementById('item-name');
    this.waterOverlay = document.getElementById('water-overlay');
    this.xpFill = document.getElementById('xp-bar-fill');
    this.active = 0;
    this.creative = true;

    this.barsEl = document.getElementById('status-bars');
    this.armorBarEl = document.getElementById('armor-bar');

    // Hide game UI elements immediately so they don't flash over menus
    ['hotbar', 'crosshair', 'crosshair-dot', 'status-bars', 'xp-bar', 'armor-bar', 'offhand-slot', 'chat-hud', 'coords-hud'].forEach(id => {
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

    this.pauseEl = document.getElementById('menu-pause');

    this.buildHotbar();
  }

  // --- hotbar ---------------------------------------------------------------
  buildHotbar() {
    this.hotbarEl.innerHTML = '';
    this.slots = [];
    HOTBAR_BLOCKS.forEach((blockId, i) => {
      const slot = document.createElement('div');
      slot.className = 'slot' + (i === 0 ? ' active' : '');
      const num = document.createElement('div');
      num.className = 'num'; num.textContent = i + 1;
      const icon = makeIcon(blockId, this.atlas);
      slot.appendChild(num);
      slot.appendChild(icon);
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
      this.hotbarEl.appendChild(slotEl);
      this.slots.push(slotEl);
    }
    this.active = inventory.selected;
  }

  makeItemIcon(itemId) {
    return makeItemIconCanvas(itemId);
  }

  setActive(i) {
    this.active = ((i % HOTBAR_SLOTS) + HOTBAR_SLOTS) % HOTBAR_SLOTS;
    this.slots.forEach((s, idx) => s.classList.toggle('active', idx === this.active));
  }

  selectedBlock() {
    return null;
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
    // Health hearts (left side) — no background panel, just icons
    let hh = '';
    for (let i = 9; i >= 0; i--) {
      const val = player.health - i * 2;
      const full = val >= 2, half = val >= 1;
      const img = drawHeart(full, half && !full);
      hh += `<img src="${img.toDataURL()}" style="width:12px;height:12px;image-rendering:pixelated;vertical-align:middle;margin:0 0.5px;">`;
    }
    this.healthBar.innerHTML = hh;

    // Hunger drumsticks (right side)
    let fh = '';
    for (let i = 0; i < 10; i++) {
      const val = player.hunger - i * 2;
      const full = val >= 2, half = val >= 1;
      const img = drawDrumstick(full, half && !full);
      fh += `<img src="${img.toDataURL()}" style="width:12px;height:12px;image-rendering:pixelated;vertical-align:middle;margin:0 0.5px;">`;
    }
    this.hungerBar.innerHTML = fh;
    // Hunger warning pulse when below 3 drumsticks (6 hunger)
    if (player.hunger <= 6) this.hungerBar.classList.add('hunger-warn');
    else this.hungerBar.classList.remove('hunger-warn');

    // Armor slots — show equipped armor icons
    const armorSlots = document.querySelectorAll('.armor-slot');
    if (player.inventory && armorSlots.length) {
      for (let i = 0; i < 4; i++) {
        const slot = armorSlots[i];
        const equipped = player.inventory.armor[i];
        const label = slot.querySelector('.armor-slot-label');
        // Remove old icon
        const oldIcon = slot.querySelector('img');
        if (oldIcon) oldIcon.remove();
        if (equipped) {
          const iconCanvas = this.makeItemIcon(equipped.item);
          if (iconCanvas) {
            const img = document.createElement('img');
            img.src = iconCanvas.toDataURL();
            img.style.width = '22px'; img.style.height = '22px';
            img.style.imageRendering = 'pixelated';
            slot.appendChild(img);
            if (label) label.style.display = 'none';
          }
        } else {
          if (label) label.style.display = '';
        }
      }
    }
  }

  // Armor slots + offhand — standalone update for creative mode
  updateArmorSlots(player) {
    const armorSlots = document.querySelectorAll('.armor-slot');
    if (player.inventory && armorSlots.length) {
      for (let i = 0; i < 4; i++) {
        const slot = armorSlots[i];
        const equipped = player.inventory.armor[i];
        const label = slot.querySelector('.armor-slot-label');
        const oldIcon = slot.querySelector('img');
        if (oldIcon) oldIcon.remove();
        if (equipped) {
          const iconCanvas = this.makeItemIcon(equipped.item);
          if (iconCanvas) {
            const img = document.createElement('img');
            img.src = iconCanvas.toDataURL();
            img.style.width = '22px'; img.style.height = '22px';
            img.style.imageRendering = 'pixelated';
            slot.appendChild(img);
            if (label) label.style.display = 'none';
          }
        } else {
          if (label) label.style.display = '';
        }
      }
    }
    // Off-hand HUD
    const offhandEl = document.getElementById('offhand-slot');
    if (offhandEl && player.inventory) {
      const oldIcon = offhandEl.querySelector('img');
      if (oldIcon) oldIcon.remove();
      const oldCount = offhandEl.querySelector('.inv-count');
      if (oldCount) oldCount.remove();
      const label = offhandEl.querySelector('.offhand-label');
      const equipped = player.inventory.offhand;
      if (equipped) {
        const iconCanvas = this.makeItemIcon(equipped.item);
        if (iconCanvas) {
          const img = document.createElement('img');
          img.src = iconCanvas.toDataURL();
          img.style.width = '30px'; img.style.height = '30px';
          img.style.imageRendering = 'pixelated';
          offhandEl.appendChild(img);
          if (label) label.style.display = 'none';
        }
        if (equipped.count > 1) {
          const cnt = document.createElement('div');
          cnt.className = 'inv-count';
          cnt.textContent = equipped.count;
          cnt.style.cssText = 'position:absolute;bottom:1px;right:2px;font:bold 9px monospace;color:#fff;text-shadow:1px 1px 0 #000;';
          offhandEl.appendChild(cnt);
        }
      } else {
        if (label) label.style.display = '';
      }
    }
  }

  // --- overlay --------------------------------------------------------------
  showOverlay() { this.overlayEl.classList.remove('hidden'); this._setGameUI(false); }
  hideOverlay() { this.overlayEl.classList.add('hidden'); this._setGameUI(true); }
  isOverlayShown() { return !this.overlayEl.classList.contains('hidden'); }

  _setGameUI(visible) {
    const v = visible ? '' : 'none';
    if (this.hotbarEl) this.hotbarEl.style.display = visible ? 'flex' : 'none';
    if (this.hudEl) this.hudEl.style.display = v;
    const xb = document.getElementById('crosshair'); if (xb) xb.style.display = v;
    const xd = document.getElementById('crosshair-dot'); if (xd) xd.style.display = v;
    const sb = document.getElementById('status-bars'); if (sb) sb.style.display = v;
    const xp = document.getElementById('xp-bar'); if (xp) xp.style.display = v;
    const ab = document.getElementById('armor-bar'); if (ab) ab.style.display = v;
    const oh = document.getElementById('offhand-slot'); if (oh) oh.style.display = v;
    const mp = document.querySelector('.menu-player-preview'); if (mp) mp.style.display = visible ? 'none' : '';
    const bl = document.querySelector('.menu-bottom-left'); if (bl) bl.style.display = visible ? 'none' : '';
    const br = document.querySelector('.menu-bottom-right'); if (br) br.style.display = visible ? 'none' : '';
    const ch = document.getElementById('chat-hud'); if (ch) ch.style.display = visible ? '' : 'none';
    const chd = document.getElementById('coords-hud'); if (chd) chd.style.display = visible ? '' : 'none';
  }

  showMenu(name) {
    if (name === 'pause') {
      if (this.pauseEl) this.pauseEl.classList.add('active');
      this._setGameUI(false);
      return;
    }
    this.overlayEl.classList.remove('hidden');
    this._setGameUI(false);
    this.overlayEl.querySelectorAll('.menu-screen').forEach(s => s.classList.remove('active'));
    const screen = document.getElementById('menu-' + name);
    if (screen) screen.classList.add('active');
    if (name === 'main') this._cycleSplash();
  }

  _cycleSplash() {
    const el = document.querySelector('.menu-splash');
    if (!el) return;
    const splashes = [
      'More Updates Coming Soon!',
      'Also try Terraria!',
      '100% JavaScript!',
      'Open source!',
      'Block by block!',
      'Made with love!',
      'Not affiliated with Mojang!',
      'Punch trees, get wood!',
      'Craft all the things!',
      'Now with XP!',
      'Survival mode activated!',
      'Cave exploration included!',
      'Multiplayer is here!',
      'Free to play!',
      'No ads required!',
      'Built with Three.js!',
      'WebGL powered!',
      'Bedrock inspired!',
    ];
    el.textContent = splashes[Math.floor(Math.random() * splashes.length)];
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
    // Populate the loading bar with green segments
    const fill = document.getElementById('loading-bar-fill');
    if (fill && !fill.children.length) {
      for (let i = 0; i < 12; i++) {
        const seg = document.createElement('div');
        seg.className = 'load-seg';
        fill.appendChild(seg);
      }
    }
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
  updateHud({ fps, pos, biome, loadedChunks, facing, gamemode }) {
    const mode = gamemode || (this.creative ? 'Creative' : 'Survival');
    this.hudEl.innerHTML =
      `<div><span class="fps">${fps} FPS</span> <span class="mode">[${mode}]</span></div>` +
      `<div class="coord">XYZ: ${pos.x.toFixed(1)} / ${pos.y.toFixed(1)} / ${pos.z.toFixed(1)}</div>` +
      `<div><span class="biome">${biome}</span> &middot; ${facing} &middot; ${loadedChunks} chunks</div>`;
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
    const lvlEl = document.getElementById('xp-level');
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
  }

  closeInventory() {
    if (this._inventoryRef && this.craftingGrid) {
      this.craftingGrid.returnAll(this._inventoryRef);
    }
    if (this.cursorItem) {
      if (this._inventoryRef) this._inventoryRef.add(this.cursorItem.item, this.cursorItem.count);
      this.cursorItem = null;
    }
    this.cursorItemEl.style.display = 'none';
    this.inventoryOpen = false;
    this.inventoryScreen.classList.remove('open');
    this._inventoryRef = null;
    if (this._onSync) this._onSync();
  }

  renderInventoryGrid(inventory) {
    this.inventoryGrid.innerHTML = '';
    for (let i = 0; i < 36; i++) {
      const slotEl = document.createElement('div');
      slotEl.className = 'inv-slot';
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
      slotEl.addEventListener('click', () => this._onInvSlotClick(i));
      slotEl.addEventListener('contextmenu', (e) => { e.preventDefault(); this._onInvSlotRightClick(i); });
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
      slotEl.addEventListener('click', () => this._onCraftSlotClick(i));
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
    }
    this.craftingOutput.onclick = () => this._onCraftOutputClick();
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
        el.onclick = () => this._onArmorSlotClick(idx);
      }
    });
  }

  _onArmorSlotClick(idx) {
    const inv = this._inventoryRef;
    if (!inv) return;
    const equipped = inv.armor[idx];
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
      }
    } else {
      if (equipped) {
        this.cursorItem = { item: equipped.item, count: 1, ...(equipped.durability != null ? { durability: equipped.durability } : {}) };
        inv.armor[idx] = null;
      }
    }
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

  // Quick-equip from inventory right-click
  _onInvSlotRightClick(i) {
    const inv = this._inventoryRef;
    if (!inv) return;
    const s = inv.slots[i];
    if (!s) return;
    const def = itemDef(s.item);
    // Armor: equip to correct slot
    if (def && def.armor) {
      const slotIdx = def.armor.slotIdx;
      const equipped = inv.armor[slotIdx];
      inv.armor[slotIdx] = { item: s.item, count: 1 };
      inv.slots[i] = equipped ? { item: equipped.item, count: 1, ...(equipped.durability != null ? { durability: equipped.durability } : {}) } : null;
      this.renderInventoryGrid(inv);
      this.renderArmorSlots();
      return;
    }
    // Non-armor: equip to off-hand
    const equipped = inv.offhand;
    inv.offhand = { item: s.item, count: s.count, ...(s.durability != null ? { durability: s.durability } : {}) };
    inv.slots[i] = equipped ? { item: equipped.item, count: equipped.count, ...(equipped.durability != null ? { durability: equipped.durability } : {}) } : null;
    this.renderInventoryGrid(inv);
    this.renderArmorSlots();
  }

  _onInvSlotClick(i) {
    const inv = this._inventoryRef;
    if (!inv) return;
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
    this._updateCursorVisual();
  }

  _onCraftSlotClick(i) {
    const grid = this.craftingGrid;
    if (this.cursorItem) {
      const cur = grid.grid[i];
      if (cur && cur.item === this.cursorItem.item) {
        // same item: add 1 to the slot
        const cap = maxStack(cur.item);
        if (cur.count < cap) {
          cur.count++;
          this.cursorItem.count--;
          if (this.cursorItem.count <= 0) this.cursorItem = null;
        }
      } else if (!cur) {
        // empty slot: place 1
        grid.grid[i] = { item: this.cursorItem.item, count: 1 };
        this.cursorItem.count--;
        if (this.cursorItem.count <= 0) this.cursorItem = null;
      } else {
        // different item: swap entire stacks
        const tmp = grid.grid[i];
        grid.grid[i] = { item: this.cursorItem.item, count: this.cursorItem.count };
        this.cursorItem = { item: tmp.item, count: tmp.count };
      }
    } else {
      const s = grid.takeCell(i);
      if (s) this.cursorItem = { item: s.item, count: s.count };
    }
    grid.refreshOutput();
    this.renderCraftingGrid();
    this._updateCursorVisual();
  }

  _onCraftOutputClick() {
    const grid = this.craftingGrid;
    const out = grid.output;
    if (!out) return;
    if (this.cursorItem && (this.cursorItem.item !== out.id || this.cursorItem.count + out.count > maxStack(out.id))) return;
    if (!this.cursorItem) {
      this.cursorItem = { item: out.id, count: out.count };
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
  openFurnace(inventory) {
    this.furnaceOpen = true;
    this._inventoryRef = inventory;
    this.cursorItem = null;
    this.cursorItemEl.style.display = 'none';
    this.furnaceScreen.classList.add('open');
    this.renderFurnaceSlots();
    this._renderFurnaceInventory(inventory);
  }

  closeFurnace() {
    // Return furnace items to inventory
    const inv = this._inventoryRef;
    if (inv) {
      if (this.furnaceSlots.input) { inv.add(this.furnaceSlots.input.item, this.furnaceSlots.input.count); this.furnaceSlots.input = null; }
      if (this.furnaceSlots.fuel) { inv.add(this.furnaceSlots.fuel.item, this.furnaceSlots.fuel.count); this.furnaceSlots.fuel = null; }
      if (this.furnaceSlots.output) { inv.add(this.furnaceSlots.output.item, this.furnaceSlots.output.count); this.furnaceSlots.output = null; }
    }
    if (this.cursorItem) {
      if (inv) inv.add(this.cursorItem.item, this.cursorItem.count);
      this.cursorItem = null;
    }
    this.cursorItemEl.style.display = 'none';
    this.furnaceOpen = false;
    this.furnaceScreen.classList.remove('open');
    this._inventoryRef = null;
  }

  openChest(chestSlots, inventory, chestX, chestY, chestZ) {
    this.chestOpen = true;
    this.chestSlots = chestSlots;
    this.chestPos = { x: chestX, y: chestY, z: chestZ };
    this._inventoryRef = inventory;
    this.cursorItem = null;
    this.cursorItemEl.style.display = 'none';
    this.chestScreen.classList.add('open');
    this._renderChestGrid();
    this._renderChestInventory(inventory);
  }

  closeChest() {
    if (this.cursorItem) {
      if (this._inventoryRef) this._inventoryRef.add(this.cursorItem.item, this.cursorItem.count);
      this.cursorItem = null;
    }
    this.cursorItemEl.style.display = 'none';
    this.chestOpen = false;
    this.chestScreen.classList.remove('open');
    this.chestSlots = null;
    this.chestPos = null;
    this._inventoryRef = null;
  }

  _renderChestGrid() {
    this.chestGrid.innerHTML = '';
    for (let i = 0; i < 27; i++) {
      const slotEl = document.createElement('div');
      slotEl.className = 'inv-slot';
      const s = this.chestSlots[i];
      if (s) {
        const icon = isBlockItem(s.item) ? makeIcon(s.item, this.atlas) : this.makeItemIcon(s.item);
        if (icon) { icon.style.width = '32px'; icon.style.height = '32px'; icon.style.imageRendering = 'pixelated'; slotEl.appendChild(icon); }
        if (s.count > 1) { const cnt = document.createElement('div'); cnt.className = 'inv-count'; cnt.textContent = s.count; slotEl.appendChild(cnt); }
      }
      const idx = i;
      slotEl.addEventListener('click', () => this._onChestSlotClick(idx));
      this.chestGrid.appendChild(slotEl);
    }
  }

  _onChestSlotClick(i) {
    const slot = this.chestSlots[i];
    if (this.cursorItem) {
      if (!slot) {
        this.chestSlots[i] = { item: this.cursorItem.item, count: this.cursorItem.count };
        this.cursorItem = null;
      } else if (slot.item === this.cursorItem.item) {
        const cap = maxStack(slot.item);
        const add = Math.min(cap - slot.count, this.cursorItem.count);
        slot.count += add;
        this.cursorItem.count -= add;
        if (this.cursorItem.count <= 0) this.cursorItem = null;
      } else {
        this.chestSlots[i] = { item: this.cursorItem.item, count: this.cursorItem.count };
        this.cursorItem = { item: slot.item, count: slot.count };
      }
    } else if (slot) {
      this.cursorItem = { item: slot.item, count: slot.count };
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
      const s = inventory.slots[i];
      if (s) {
        const icon = isBlockItem(s.item) ? makeIcon(s.item, this.atlas) : this.makeItemIcon(s.item);
        if (icon) { icon.style.width = '32px'; icon.style.height = '32px'; icon.style.imageRendering = 'pixelated'; slotEl.appendChild(icon); }
        if (s.count > 1) { const cnt = document.createElement('div'); cnt.className = 'inv-count'; cnt.textContent = s.count; slotEl.appendChild(cnt); }
      }
      const idx = i;
      slotEl.addEventListener('click', () => this._onChestInvSlotClick(idx));
      this.chestInvGrid.appendChild(slotEl);
    }
    // Hotbar: slots 0-8 (1 row of 9)
    for (let i = 0; i < 9; i++) {
      const slotEl = document.createElement('div');
      slotEl.className = 'inv-slot';
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
      slotEl.addEventListener('click', () => this._onChestInvSlotClick(idx));
      this.chestHotbarGrid.appendChild(slotEl);
    }
  }

  _onChestInvSlotClick(i) {
    const inv = this._inventoryRef;
    if (!inv) return;
    const slot = inv.slots[i];
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
    this.furnaceInputEl.onclick = () => this._onFurnaceSlotClick('input');
    this.furnaceFuelEl.onclick = () => this._onFurnaceSlotClick('fuel');
    this.furnaceOutputEl.onclick = () => this._onFurnaceSlotClick('output');
  }

  _renderFurnaceInventory(inventory) {
    this.furnaceInvGrid.innerHTML = '';
    for (let i = 0; i < 36; i++) {
      const slotEl = document.createElement('div');
      slotEl.className = 'inv-slot';
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
      slotEl.addEventListener('click', () => this._onFurnaceInvSlotClick(i));
      this.furnaceInvGrid.appendChild(slotEl);
    }
  }

  _onFurnaceInvSlotClick(i) {
    const inv = this._inventoryRef;
    if (!inv) return;
    const slot = inv.slots[i];
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

  _onFurnaceSlotClick(which) {
    const slot = this.furnaceSlots[which];
    if (this.cursorItem) {
      if (!slot) {
        this.furnaceSlots[which] = { item: this.cursorItem.item, count: this.cursorItem.count };
        this.cursorItem = null;
      } else if (slot.item === this.cursorItem.item) {
        const cap = maxStack(slot.item);
        const add = Math.min(cap - slot.count, this.cursorItem.count);
        slot.count += add;
        this.cursorItem.count -= add;
        if (this.cursorItem.count <= 0) this.cursorItem = null;
      } else {
        this.furnaceSlots[which] = { item: this.cursorItem.item, count: this.cursorItem.count };
        this.cursorItem = { item: slot.item, count: slot.count };
      }
    } else if (slot) {
      this.cursorItem = { item: slot.item, count: slot.count };
      this.furnaceSlots[which] = null;
    }
    this.renderFurnaceSlots();
    if (this._inventoryRef) this._renderFurnaceInventory(this._inventoryRef);
    this._updateCursorVisual();
  }

  tickFurnace(dt, smelting, fuelValue) {
    if (!this.furnaceOpen) return;
    const fs = this.furnaceSlots;
    // burn fuel
    if (this.furnaceBurnTime > 0) {
      this.furnaceBurnTime -= dt;
    } else if (fs.fuel && fs.input) {
      const fv = fuelValue(fs.fuel.item);
      if (fv > 0) {
        this.furnaceBurnTime = fv * 0.05; // each fuel tick = 0.05s
        this.furnaceMaxBurnTime = this.furnaceBurnTime;
        fs.fuel.count--;
        if (fs.fuel.count <= 0) fs.fuel = null;
      }
    }
    // smelt
    if (this.furnaceBurnTime > 0 && fs.input) {
      const out = smelting(fs.input.item);
      if (out != null) {
        const outCount = fs.output && fs.output.item === out ? fs.output.count : 0;
        if (outCount < 64) {
          this.furnaceSmeltTime += dt;
          if (this.furnaceSmeltTime >= 3) {
            this.furnaceSmeltTime = 0;
            fs.input.count--;
            if (fs.input.count <= 0) fs.input = null;
            if (fs.output && fs.output.item === out) {
              fs.output.count++;
            } else {
              fs.output = { item: out, count: 1 };
            }
            this.renderFurnaceSlots();
          }
        }
      }
    } else {
      this.furnaceSmeltTime = 0;
    }
    if (this.furnaceProgressFill) {
      const pct = this.furnaceBurnTime > 0 ? Math.round((this.furnaceSmeltTime / 3) * 100) : 0;
      this.furnaceProgressFill.style.width = pct + '%';
    }
    // arrow fill
    if (this.furnaceArrowFill) {
      const apct = this.furnaceBurnTime > 0 ? Math.round((this.furnaceSmeltTime / 3) * 100) : 0;
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
        if (inv) inv.add(ci.id, ci.type === 'block' ? 64 : 1);
      });
      this.creativeGrid.appendChild(slotEl);
    }
  }

  _filterCreativeGrid() {
    this._populateCreativeGrid(this.creativeSearch ? this.creativeSearch.value : '');
  }
}
