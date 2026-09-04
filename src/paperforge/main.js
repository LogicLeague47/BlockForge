// PAPERFORGE — 2D BlockForge.
// Same blocks, items, textures, recipes and drop rules as BlockForge,
// rendered and played in 2D side view. Shared modules do the heavy lifting:
// tiles.js (atlas painters), blocks.js (ids/defs/drops), items.js,
// recipes.js + crafting.js (CraftingGrid), inventory.js (Inventory),
// ui.js (makeItemIconCanvas for non-block items).
import { BLOCK, BLOCKS, blockDrop, blockHardness, TILES, tileNameFor, SLAB_TO_FULL, slabVariantFor, stairVariantFor } from '../blocks.js';
import { ITEM, itemDef, itemName, maxStack, isBlockItem, isTool, toolInfo, toolSpeedFor, toolHarvestLevel, foodValue, ARMOR, armorInfo, totalArmorDefense } from '../items.js';
import { buildAtlas, makeIcon, TILE } from '../tiles.js';
import { makeItemIconCanvas } from '../ui.js';
import { CraftingGrid } from '../crafting.js';
import { Inventory } from '../inventory.js';

// ---------- BlockForge offshoot identity (same-origin localStorage) ----------
let BF_HERO = '';
try {
  BF_HERO = localStorage.getItem('bf_player_name')
    || localStorage.getItem('bf_login_user')
    || localStorage.getItem('bf_cg_username') || '';
} catch (e) {}
const BF_DEV = (BF_HERO || '').trim().toLowerCase() === 'logicleague';

// ---------- tiny helpers ----------
function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }
function hash2(x, y) {
  let h = (x * 374761393 + y * 668265263) | 0;
  h = (h ^ (h >>> 13)) * 1274126177;
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}
function mulberry(seed) {
  let a = seed | 0;
  return function() {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const el = (id) => document.getElementById(id);
function show(id) { el(id).classList.remove('hidden'); }
function hide(id) { el(id).classList.add('hidden'); }
// On-screen error reporter: if anything throws at runtime, show it instead
// of failing silently behind a black canvas.
function pfError(where, err) {
  try {
    const box = el('pf-errors');
    if (!box) return;
    box.style.display = 'block';
    const msg = String((err && err.message) || err);
    box.textContent = 'ERR [' + where + ']: ' + msg.slice(0, 300);
  } catch (_) {}
}
window.addEventListener('error', (e) => pfError('window', e.error || e.message));
window.addEventListener('unhandledrejection', (e) => pfError('promise', e.reason));

// ---------- audio (tiny local synth) ----------
const Sfx = (() => {
  let ctx = null;
  function ac() {
    if (!ctx) { try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} }
    if (ctx && ctx.state === 'suspended') ctx.resume();
    return ctx;
  }
  function beep(f, d, type, vol, slide) {
    const c = ac();
    if (!c) return;
    try {
      const o = c.createOscillator(), g = c.createGain();
      o.type = type || 'square';
      o.frequency.setValueAtTime(f, c.currentTime);
      if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(20, slide), c.currentTime + d);
      g.gain.setValueAtTime(vol || 0.05, c.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + d);
      o.connect(g); g.connect(c.destination);
      o.start(); o.stop(c.currentTime + d);
    } catch (e) {}
  }
  return {
    unlock: ac,
    click: () => beep(660, 0.06, 'square', 0.04),
    dig: () => beep(220, 0.05, 'square', 0.03, 140),
    break: () => beep(330, 0.09, 'square', 0.05, 90),
    place: () => beep(180, 0.07, 'square', 0.05, 260),
    hurt: () => beep(130, 0.18, 'sawtooth', 0.07, 60),
    hit: () => beep(500, 0.05, 'square', 0.04, 300),
    eat: () => { beep(300, 0.07, 'sine', 0.06, 200); setTimeout(() => beep(420, 0.07, 'sine', 0.06, 250), 80); },
    craft: () => { beep(523, 0.08, 'square', 0.05); setTimeout(() => beep(784, 0.1, 'square', 0.05), 80); },
    level: () => beep(880, 0.12, 'sine', 0.05, 1320),
  };
})();

// ---------- canvas ----------
const canvas = el('game');
const ctx = canvas.getContext('2d');
let DPR = 1, W = 0, H = 0;
function resize() {
  DPR = Math.min(window.devicePixelRatio || 1, 1.5);
  // visualViewport tracks the iOS Safari toolbar; window.innerHeight lies.
  const vv = window.visualViewport;
  W = Math.round(vv ? vv.width : window.innerWidth);
  H = Math.round(vv ? vv.height : window.innerHeight);
  canvas.width = Math.floor(W * DPR);
  canvas.height = Math.floor(H * DPR);
  canvas.style.width = W + 'px';
  canvas.style.height = H + 'px';
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  ctx.imageSmoothingEnabled = false;
}
window.addEventListener('resize', resize);
if (window.visualViewport) window.visualViewport.addEventListener('resize', resize);
window.addEventListener('orientationchange', () => setTimeout(resize, 120));
document.addEventListener('gesturestart', (e) => e.preventDefault());
resize();
if (('ontouchstart' in window) || navigator.maxTouchPoints > 0) document.body.classList.add('touch');

// ---------- world data ----------
const TS = 32;            // tile px (atlas-native, 1:1 blits)
const WW = 256, WH = 96;  // world tiles
const AIR = 0;
let seed = (Math.random() * 1e9) | 0;
let tiles = new Uint8Array(WW * WH);
let edits = [];                       // [x, y, v] gameplay edits (for save)
let doubles = {};                     // "x,y" -> [bottomSlab, topSlab] merged pairs
let atlas = null;
const tidx = (x, y) => y * WW + x;
function tileAt(x, y) {
  if (x < 0 || x >= WW) return BLOCK.BEDROCK;
  if (y < 0) return AIR;
  if (y >= WH) return BLOCK.BEDROCK;
  return tiles[tidx(x, y)];
}
function setTile(x, y, v, record) {
  if (x < 0 || x >= WW || y < 0 || y >= WH) return;
  tiles[tidx(x, y)] = v;
  if (record) edits.push([x, y, v]);
}
function isSolid(b) {
  const d = BLOCKS[b];
  return !!(d && d.solid);
}
// Collision span [lo, hi] within a cell (mirrors the 3D hitbox rules).
function shapeOf(b, fx) {
  const d = BLOCKS[b];
  if (!d || !d.solid) return null;
  if (d.slab) return d.slabTop ? [0.5, 1] : [0, 0.5];
  if (d.stair) {
    const dir = d.stairDir || 'south';
    if (dir === 'east') return fx >= 0.5 ? [0, 1] : [0, 0.5];
    if (dir === 'west') return fx < 0.5 ? [0, 1] : [0, 0.5];
    return [0, 1];
  }
  return [0, 1];
}

function surfaceH(x) {
  const n = Math.sin(x * 0.045) * 4 + Math.sin(x * 0.11 + 1.7) * 3 + (hash2(x, 7) - 0.5) * 4;
  return Math.round(38 + n);
}
function genWorld(s) {
  tiles = new Uint8Array(WW * WH);
  edits = [];
  doubles = {};
  const rng = mulberry(s);
  for (let x = 0; x < WW; x++) {
    const h = surfaceH(x);
    for (let y = h; y < WH; y++) {
      let b = BLOCK.STONE;
      if (y === h) b = BLOCK.GRASS;
      else if (y <= h + 4) b = BLOCK.DIRT;
      const depth = y - h;
      const r = hash2(x * 3 + 1, y * 5 + 2);
      if (b === BLOCK.STONE) {
        if (depth > 4 && r < 0.022) b = BLOCK.COAL_ORE;
        else if (depth > 12 && r < 0.016) b = BLOCK.IRON_ORE;
        else if (depth > 24 && r < 0.009) b = BLOCK.GOLD_ORE;
        else if (y > WH - 18 && r < 0.012) b = BLOCK.DIAMOND_ORE;
      }
      // sand pockets near low surface
      if (h > 40 && y >= h && y <= h + 2 && hash2(x, 99) < 0.3) b = BLOCK.SAND;
      tiles[tidx(x, y)] = b;
    }
    tiles[tidx(x, WH - 1)] = BLOCK.BEDROCK;
  }
  // cave worms
  for (let w = 0; w < 14; w++) {
    let cx = Math.floor(rng() * WW), cy = 48 + Math.floor(rng() * 36);
    let dx = rng() * 6.28;
    const len = 40 + Math.floor(rng() * 80);
    for (let i = 0; i < len; i++) {
      dx += (rng() - 0.5) * 0.9;
      cx += Math.cos(dx); cy += Math.sin(dx) * 0.6;
      const ix = Math.round(cx), iy = Math.round(cy);
      for (let ax = -1; ax <= 1; ax++) for (let ay = -1; ay <= 1; ay++) {
        const bx = ix + ax, by = iy + ay;
        if (bx > 0 && bx < WW - 1 && by > surfaceH(bx) + 3 && by < WH - 1) tiles[tidx(bx, by)] = AIR;
      }
    }
  }
  // trees
  for (let x = 4; x < WW - 4; x++) {
    if (hash2(x, 1234) < 0.09) {
      const h = surfaceH(x);
      if (tiles[tidx(x, h)] !== BLOCK.GRASS) continue;
      const th = 4 + Math.floor(hash2(x, 55) * 2);
      for (let i = 1; i <= th; i++) tiles[tidx(x, h - i)] = BLOCK.WOOD;
      for (let ax = -2; ax <= 2; ax++) for (let ay = -2; ay <= 1; ay++) {
        if (Math.abs(ax) === 2 && ay === -2) continue;
        if (Math.abs(ax) === 2 && ay === 1 && hash2(x + ax, ay) < 0.5) continue;
        const bx = x + ax, by = h - th + ay;
        if (bx < 0 || bx >= WW || by < 0) continue;
        if (tiles[tidx(bx, by)] === AIR) tiles[tidx(bx, by)] = BLOCK.LEAVES;
      }
    }
  }
}

// ---------- tile rendering (exact BlockForge atlas painters) ----------
function drawTileFace(b, face, dx, dy, dw, dh, sx, sy, sw, sh) {
  const t = TILES[typeof face === 'string' ? face : 'stone'];
  if (!t) return;
  if (sx === undefined) sx = 0;
  if (sy === undefined) sy = 0;
  if (sw === undefined) sw = 1;
  if (sh === undefined) sh = 1;
  ctx.drawImage(atlas, (t[0] + sx) * TILE, (t[1] + sy) * TILE, TILE * sw, TILE * sh, dx, dy, dw, dh);
}
function tileFaceName(b, which) { return tileNameFor(b, which); }
function drawBlockTile(b, px, py) {
  const def = BLOCKS[b];
  if (!def) return;
  if (b === BLOCK.TORCH || b === BLOCK.GREENSTONE_TORCH) { drawTorch(px, py, b); return; }
  const side = tileFaceName(b, 'side');
  if (def.slab) {
    if (def.slabTop) drawTileFace(b, side, px, py, TS, TS / 2, 0, 0, 1, 0.5);
    else drawTileFace(b, side, px, py + TS / 2, TS, TS / 2, 0, 0.5, 1, 0.5);
    return;
  }
  if (def.stair) {
    const dir = def.stairDir || 'south';
    drawTileFace(b, side, px, py + TS / 2, TS, TS / 2, 0, 0.5, 1, 0.5);
    if (dir === 'east') drawTileFace(b, side, px + TS / 2, py, TS / 2, TS / 2, 0.5, 0, 0.5, 0.5);
    else if (dir === 'west') drawTileFace(b, side, px, py, TS / 2, TS / 2, 0, 0, 0.5, 0.5);
    else drawTileFace(b, side, px, py, TS, TS / 2, 0, 0, 1, 0.5);
    return;
  }
  // 2D side view always uses the SIDE texture (never tops).
  drawTileFace(b, side, px, py, TS, TS);
}
// Mixed double slab: two slab SIDE textures in one cell (pair recorded).
function drawDoubleSlab(pair, px, py) {
  const bTile = tileFaceName(pair[0], 'side'), tTile = tileFaceName(pair[1], 'side');
  drawTileFace(pair[0], bTile, px, py + TS / 2, TS, TS / 2, 0, 0.5, 1, 0.5);
  drawTileFace(pair[1], tTile, px, py, TS, TS / 2, 0, 0, 1, 0.5);
}
let torchFlick = 0;
function drawTorch(px, py, b) {
  const green = b === BLOCK.GREENSTONE_TORCH;
  ctx.fillStyle = '#6e5230';
  ctx.fillRect(px + 14, py + 12, 4, 18);
  const f = 4 + Math.sin(torchFlick * 9 + px) * 1.5;
  ctx.fillStyle = green ? '#3ec850' : '#ff9a20';
  ctx.beginPath(); ctx.arc(px + 16, py + 9, 5 + f * 0.3, 0, 6.283); ctx.fill();
  ctx.fillStyle = green ? '#b0ffb0' : '#ffe080';
  ctx.beginPath(); ctx.arc(px + 16, py + 9, 2.5, 0, 6.283); ctx.fill();
}

// ---------- game state ----------
let state = 'menu'; // menu | play | dead
let modalOpen = false;
let player, mobs, parts, floats;
let camX = 0, camY = 0;
let dayT = 0.15, elapsed = 0, daysSurvived = 0, wasNight = false;
let torches = [];
let inv = new Inventory();
let craft = new CraftingGrid(3);
let cursor = null;
let selectedBeforeCraft = 0;
let mineTarget = null, mineProg = 0, mineCooldown = 0;
let atkCooldown = 0;
let spawnClock = 0;
let shake = 0;

function newPlayer(x, y) {
  return {
    x, y, vx: 0, vy: 0, w: 0.7, h: 1.75,
    hp: 20, maxhp: 20, onGround: false, face: 1,
    hurtT: 0, atkT: 0, walkPh: 0, mineAnim: 0,
  };
}
function findSpawn() {
  const cx = WW >> 1;
  const h = surfaceH(cx);
  // Feet must be strictly ABOVE the surface top (smaller y = higher up).
  return { x: cx + 0.5, y: h + 0.9 };
}

// ---------- physics (axis-separated AABB vs shape-aware tiles) ----------
const GRAV = 30;
function cellsOverlap(e) {
  const x0 = Math.floor(e.x - e.w / 2), x1 = Math.floor(e.x + e.w / 2);
  const y0 = Math.floor(e.y), y1 = Math.floor(e.y + e.h);
  return { x0, x1, y0, y1 };
}
function moveBody(e, dt, stepUp) {
  const steps = Math.max(1, Math.ceil((Math.abs(e.vy) * dt) / 0.35));
  const sdt = dt / steps;
  for (let s = 0; s < steps; s++) {
    e.py = e.y;
    e.x += e.vx * sdt;
    collideAxis(e, 'x', stepUp);
    // +y is DOWN-screen: gravity pulls down, jump pushes up (negative)
    e.vy = Math.min(e.vy + GRAV * sdt, 22);
    e.y += e.vy * sdt;
    e.onGround = false;
    collideAxis(e, 'y', stepUp);
  }
}
function collideAxis(e, axis, stepUp) {
  const minX = e.x - e.w / 2, maxX = e.x + e.w / 2;
  const minY = e.y, maxY = e.y + e.h;
  const x0 = Math.floor(minX), x1 = Math.floor(maxX);
  // Include the cell below the feet for vertical sweeps: feet landing exactly
  // on an integer top would otherwise exclude the ground cell next frame and
  // sink one row at a time.
  const y0 = Math.floor(minY) - (axis === 'y' ? 1 : 0), y1 = Math.floor(maxY);
  for (let cy = y0; cy <= y1; cy++) {
    for (let cx = x0; cx <= x1; cx++) {
      const b = tileAt(cx, cy);
      const r = shapeOf(b, clamp((e.x - cx), 0, 0.999));
      if (!r) continue;
      const lo = r[0], hi = r[1];
      const top = cy + hi, bot = cy + lo;
      if (axis === 'x') {
        if (minY >= top - 0.001 || maxY <= bot + 0.001) continue;
        // step-up assist for slabs/stairs
        if (stepUp && (top - minY) <= 0.55) {
          let headroom = true;
          const cy2 = Math.floor(top + e.h);
          for (let ccx = Math.floor(e.x - e.w / 2); ccx <= Math.floor(e.x + e.w / 2); ccx++) {
            const bb = tileAt(ccx, cy2);
            if (isSolid(bb)) { headroom = false; break; }
          }
          if (headroom) { e.y = top + 0.001; e.onGround = true; continue; }
        }
        if (e.vx > 0) e.x = cx - e.w / 2 - 0.001;
        else if (e.vx < 0) e.x = cx + 1 + e.w / 2 + 0.001;
        e.vx = 0;
        e.bumped = true;
          } else {
            if (maxX <= cx || minX >= cx + 1) continue;
            if (e.vy >= 0) {
              // falling down: land on the shape top. The window extends
              // slightly below the top so exact-boundary stands re-snap every
              // frame instead of sinking (walking off still works: once the
              // cell leaves horizontal overlap, gravity takes over).
              if (e.py >= top - 0.45 && e.y <= top + 0.4) {
                e.y = top; e.vy = 0; e.onGround = true;
              }
            } else {
              // rising: bump head on the shape underside
              if (e.py + e.h <= bot + 0.45 && e.y + e.h > bot) {
                e.y = bot - e.h - 0.001; e.vy = 0;
              }
            }
          }
    }
  }
}

// ---------- input ----------
const keys = {};
let mouse = { x: 0, y: 0, left: false, right: false };
let placeMode = false; // mobile: tap places instead of mines
window.addEventListener('keydown', (e) => {
  keys[e.code] = true;
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) e.preventDefault();
  if (e.code === 'Escape' || e.code === 'KeyP') togglePause();
  if ((e.code === 'KeyE' || e.code === 'KeyI') && state === 'play') {
    if (modalOpen) closeModals();
    else openInv();
  }
  if (e.code >= 'Digit1' && e.code <= 'Digit9') { inv.selected = +e.code.slice(5) - 1; buildHotbar(); }
});
window.addEventListener('keyup', (e) => { keys[e.code] = false; });
canvas.addEventListener('contextmenu', (e) => e.preventDefault());
canvas.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
canvas.addEventListener('mousedown', (e) => {
  Sfx.unlock();
  if (e.button === 0) { mouse.left = true; beginAction(e.clientX, e.clientY); }
  if (e.button === 2) { tryPlaceAt(e.clientX, e.clientY); }
});
window.addEventListener('mouseup', () => { mouse.left = false; mineTarget = null; mineProg = 0; });
function bindHold(id, down, up) {
  const b = el(id);
  const on = (e) => { e.preventDefault(); Sfx.unlock(); down(); };
  const off = (e) => { e.preventDefault(); up(); };
  b.addEventListener('touchstart', on, { passive: false });
  b.addEventListener('touchend', off, { passive: false });
  b.addEventListener('touchcancel', off, { passive: false });
  b.addEventListener('mousedown', on);
  b.addEventListener('mouseup', off);
  b.addEventListener('mouseleave', up);
}
bindHold('btn-left', () => keys.ArrowLeft = true, () => keys.ArrowLeft = false);
bindHold('btn-right', () => keys.ArrowRight = true, () => keys.ArrowRight = false);
bindHold('btn-jump', () => keys.Space = true, () => keys.Space = false);
canvas.addEventListener('touchstart', (e) => {
  e.preventDefault();
  Sfx.unlock();
  const t = e.changedTouches[0];
  const cx = t.clientX, cy = t.clientY;
  if (placeMode) tryPlaceAt(cx, cy);
  else { mouse.x = cx; mouse.y = cy; mouse.left = true; beginAction(cx, cy); }
}, { passive: false });
canvas.addEventListener('touchmove', (e) => {
  e.preventDefault();
  const t = e.changedTouches[0];
  mouse.x = t.clientX; mouse.y = t.clientY;
  if (placeMode) tryPlaceAt(t.clientX, t.clientY);
}, { passive: false });
canvas.addEventListener('touchend', (e) => { e.preventDefault(); mouse.left = false; mineTarget = null; mineProg = 0; });
function screenToCell(sx, sy) {
  return { x: Math.floor((sx + camX) / TS), y: Math.floor((sy + camY) / TS) };
}

// ---------- mining / placing / attacking (shared drop rules) ----------
function heldToolId() {
  const s = inv.slots[inv.selected];
  return (s && isTool(s.item)) ? s.item : null;
}
function beginAction(sx, sy) {
  const c = screenToCell(sx, sy);
  // mob under cursor? attack instead of mining
  const m = mobAt(sx, sy);
  if (m) { hitMob(m); atkCooldown = 0.45; return; }
  const b = tileAt(c.x, c.y);
  if (b === AIR || b === BLOCK.BEDROCK) return;
  if (Math.hypot(c.x + 0.5 - player.x, c.y + 0.5 - player.y) > 7) return;
  const hard = blockHardness(b);
  if (hard <= 0) { breakBlock(c.x, c.y); return; }
  mineTarget = { x: c.x, y: c.y };
  mineProg = 0;
}
function tickMining(dt) {
  if (!mouse.left || !mineTarget || atkCooldown > 0) { if (!mouse.left) { mineTarget = null; mineProg = 0; } return; }
  const { x, y } = mineTarget;
  const b = tileAt(x, y);
  if (b === AIR || b === BLOCK.BEDROCK) { mineTarget = null; mineProg = 0; return; }
  if (Math.hypot(x + 0.5 - player.x, y + 0.5 - player.y) > 7) return;
  const toolId = heldToolId();
  const speed = toolId ? toolSpeedFor(toolId, b) : 1;
  mineProg += dt * speed / Math.max(0.15, blockHardness(b) * 1.4);
  player.mineAnim = 0.25;
  if (Math.random() < dt * 6) Sfx.dig();
  if (mineProg >= 1) { breakBlock(x, y); mineTarget = null; mineProg = 0; }
}
function breakBlock(x, y) {
  const b = tileAt(x, y);
  if (b === AIR || b === BLOCK.BEDROCK) return;
  const toolId = heldToolId();
  const key = x + ',' + y;
  if (doubles[key]) {
    const pair = doubles[key];
    delete doubles[key];
    for (const id of pair) {
      const base = BLOCKS[id]?.drop ?? id;
      inv.add(base, 1);
    }
  } else {
    const drop = blockDrop(b, toolId ? toolHarvestLevel(toolId) : 0);
    if (drop) inv.add(drop, 1);
  }
  setTile(x, y, AIR, true);
  refreshTorches();
  buildHotbar();
  Sfx.break();
  burst(x + 0.5, y + 0.5, BLOCKS[b] ? [0.5, 0.5, 0.5] : [0.5, 0.5, 0.5]);
}
function tryPlaceAt(sx, sy) {
  const slot = inv.slots[inv.selected];
  if (!slot) return;
  const c = screenToCell(sx, sy);
  if (tileAt(c.x, c.y) !== AIR) {
    // slab merge: used on a slab cell?
    const tb = tileAt(c.x, c.y);
    if (BLOCKS[slot.item]?.slab && BLOCKS[tb]?.slab) {
      const full = SLAB_TO_FULL[tb] || SLAB_TO_FULL[slot.item];
      if (full) {
        setTile(c.x, c.y, full, true);
        doubles[c.x + ',' + c.y] = [tb, slot.item];
        consumeSelected();
        Sfx.place();
        return;
      }
    }
    return;
  }
  if (Math.hypot(c.x + 0.5 - player.x, c.y + 0.5 - player.y) > 7) return;
  let itemId = slot.item;
  if (!isBlockItem(itemId)) return;
  // slab half by click height within the cell
  if (BLOCKS[itemId]?.slab) {
    const frac = ((sy + camY) / TS) - c.y;
    itemId = slabVariantFor(itemId, frac > 0.5);
  }
  // stairs face left/right by look
  if (BLOCKS[itemId]?.stair) {
    itemId = stairVariantFor(itemId, player.face >= 0 ? 'east' : 'west');
  }
  // torch needs a solid neighbour
  if (itemId === BLOCK.TORCH || itemId === BLOCK.GREENSTONE_TORCH) {
    const sup = [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => isSolid(tileAt(c.x + dx, c.y + dy)));
    if (!sup) return;
  }
  // don't place solid blocks inside the player (torches/plants are fine)
  if (BLOCKS[itemId]?.solid) {
    const pb = { x0: player.x - player.w / 2, x1: player.x + player.w / 2, y0: player.y, y1: player.y + player.h };
    if (c.x + 1 > pb.x0 && c.x < pb.x1 && c.y + 1 > pb.y0 && c.y < pb.y1) {
      const r = shapeOf(itemId, 0.5) || [0, 1];
      const bh0 = c.y + r[0], bh1 = c.y + r[1];
      if (bh0 < pb.y1 - 0.05 && bh1 > pb.y0 + 0.05) return;
    }
  }
  setTile(c.x, c.y, itemId, true);
  if (itemId === BLOCK.TORCH || itemId === BLOCK.GREENSTONE_TORCH) refreshTorches();
  consumeSelected();
  buildHotbar();
  Sfx.place();
}
function consumeSelected() {
  const slot = inv.slots[inv.selected];
  if (!slot) return;
  slot.count--;
  if (slot.count <= 0) inv.slots[inv.selected] = null;
}
function hitMob(m) {
  const toolId = heldToolId();
  const dmg = (toolId && toolInfo(toolId)?.swordDmg) || 1;
  m.hp -= dmg;
  m.flash = 0.1;
  m.vx += (m.x < player.x ? -1 : 1) * -2;
  player.mineAnim = 0.3;
  Sfx.hit();
  burst(m.x, m.y + 0.6, [0.8, 0.2, 0.2]);
  if (m.hp <= 0 && !m.dead) killMob(m);
}
function mobAt(sx, sy) {
  const wx = (sx + camX) / TS, wy = (sy + camY) / TS;
  for (let i = mobs.length - 1; i >= 0; i--) {
    const m = mobs[i];
    if (Math.abs(wx - m.x) < m.w / 2 + 0.25 && wy > m.y - 0.25 && wy < m.y + m.h + 0.25) return m;
  }
  return null;
}

// ---------- particles / floats ----------
function burst(x, y, col) {
  for (let i = 0; i < 8; i++) {
    if (parts.length > 160) parts.shift();
    const a = Math.random() * 6.28, sp = 1 + Math.random() * 3;
    parts.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp + 2, life: 0.5, col });
  }
}

// ---------- mobs (same types, drops & palettes as BlockForge) ----------
// Palettes mirror mobs.js redesigns: zombie moss #7fa03c/brown #6a4a2a,
// skeleton bone #e8e4d8 + soul eyes #6ef3ff, spider violet #4a2a5a +
// magenta eyes, chicken cream, slime #40c040.
const MOB_DEFS = {
  zombie:   { w: 0.6, h: 1.7, hp: 20, spd: 2.2, dmg: 5, hostile: true, noct: true, burn: true,
              drops: [{ item: 290, count: [0, 2] }, { item: 277, count: [0, 2] }, { item: 315, count: [0, 1] }] },
  skeleton: { w: 0.55, h: 1.65, hp: 16, spd: 2.6, dmg: 4, hostile: true, noct: true, burn: true,
              drops: [{ item: 277, count: [0, 2] }, { item: 281, count: [0, 3] }] },
  spider:   { w: 1.2, h: 0.7, hp: 16, spd: 3.4, dmg: 4, hostile: true, noct: true, burn: false, jumpy: true,
              drops: [{ item: 278, count: [0, 2] }, { item: 286, count: [0, 1] }] },
  slime:    { w: 0.9, h: 0.9, hp: 16, spd: 1.6, dmg: 4, hostile: true, noct: false, burn: false, hopper: true,
              drops: [{ item: 315, count: [0, 2] }] },
  cow:      { w: 1.2, h: 1.1, hp: 10, spd: 1.2, dmg: 0, hostile: false, noct: false, burn: false,
              drops: [{ item: 274, count: [0, 2] }, { item: 268, count: [1, 3] }] },
  pig:      { w: 1.0, h: 1.0, hp: 10, spd: 1.4, dmg: 0, hostile: false, noct: false, burn: false,
              drops: [{ item: 266, count: [1, 3] }] },
  sheep:    { w: 1.0, h: 1.0, hp: 8, spd: 1.1, dmg: 0, hostile: false, noct: false, burn: false,
              drops: [{ item: 276, count: [1, 2] }, { item: 272, count: [1, 2] }] },
  chicken:  { w: 0.5, h: 0.8, hp: 4, spd: 1.8, dmg: 0, hostile: false, noct: false, burn: false,
              drops: [{ item: 275, count: [0, 2] }, { item: 270, count: [1, 1] }] },
};
function rollCount([a, b]) { return a + Math.floor(Math.random() * (b - a + 1)); }
function spawnMob(type, x, y) {
  const d = MOB_DEFS[type];
  mobs.push({
    type, x, y, vx: 0, vy: 0, w: d.w, h: d.h, hp: d.hp * (1 + elapsed / 900),
    maxhp: d.hp, dir: Math.random() < 0.5 ? -1 : 1, t: Math.random() * 4,
    flash: 0, atkT: 0, dead: false, hopT: 1 + Math.random() * 2,
  });
}
function killMob(m) {
  m.dead = true;
  const d = MOB_DEFS[m.type];
  for (const dr of d.drops) {
    const n = rollCount(dr.count);
    if (n > 0) inv.add(dr.item, n);
  }
  burst(m.x, m.y + 0.5, [0.7, 0.7, 0.7]);
  buildHotbar();
}
function tickMobs(dt, night) {
  // spawn
  spawnClock -= dt;
  if (spawnClock <= 0) {
    spawnClock = 4;
    const hostile = night ? ['zombie', 'zombie', 'skeleton', 'spider'] : [];
    const want = [];
    const counts = {};
    for (const m of mobs) counts[m.type] = (counts[m.type] || 0) + 1;
    if (night) {
      const n = mobs.filter(m => MOB_DEFS[m.type].hostile).length;
      if (n < 5) want.push(hostile[(Math.random() * hostile.length) | 0]);
      if (Math.random() < 0.4) want.push('slime');
    } else {
      const pk = ['cow', 'pig', 'sheep', 'chicken'];
      const n = mobs.filter(m => !MOB_DEFS[m.type].hostile).length;
      if (n < 5 && Math.random() < 0.7) want.push(pk[(Math.random() * pk.length) | 0]);
      if (Math.random() < 0.25) want.push('slime');
    }
    for (const t of want) {
      const sx = player.x + (Math.random() < 0.5 ? -1 : 1) * (14 + Math.random() * 10);
      const xi = clamp(Math.round(sx), 1, WW - 2);
      let gy = Math.floor(player.y) + 4;
      while (gy > 0 && !isSolid(tileAt(xi, gy))) gy--;
      if (isSolid(tileAt(xi, gy))) spawnMob(t, xi + 0.5, gy + 1);
    }
  }
  for (let i = mobs.length - 1; i >= 0; i--) {
    const m = mobs[i], d = MOB_DEFS[m.type];
    if (m.dead) { mobs.splice(i, 1); continue; }
    if (Math.abs(m.x - player.x) > 70) { mobs.splice(i, 1); continue; }
    m.t += dt;
    if (m.flash > 0) m.flash -= dt;
    if (m.atkT > 0) m.atkT -= dt;
    // daylight burn
    if (d.burn && !night) {
      m.hp -= 3 * dt;
      m.flash = 0.1;
      if (m.hp <= 0) { killMob(m); continue; }
    }
    const dx = player.x - m.x;
    const aggro = d.hostile && (!d.noct || night) && Math.abs(dx) < 16;
    m.py = m.y;
    if (d.hopper) {
      m.hopT -= dt;
      m.vx *= 0.9;
      if (m.onGround && m.hopT <= 0) {
        m.hopT = 0.8 + Math.random() * 1.2;
        m.vy = -7;
        m.vx = (aggro ? Math.sign(dx) : m.dir) * d.spd;
        if (!aggro && Math.random() < 0.3) m.dir *= -1;
      }
    } else if (aggro) {
      m.dir = Math.sign(dx) || 1;
      m.vx = m.dir * d.spd;
      if (m.bumped) { m.vy = -8; m.bumped = false; }
      if (d.jumpy && m.onGround && Math.random() < dt * 1.5) m.vy = -8;
    } else if (!d.hostile) {
      if (Math.random() < dt * 0.25) m.dir *= -1;
      m.vx = m.dir * d.spd * 0.5;
      if (m.bumped) { m.vy = -7; m.dir *= -1; m.bumped = false; }
    } else {
      m.vx *= 0.9;
    }
    moveBody(m, dt, false);
    // touch damage
    if (d.dmg > 0 && aggro && m.atkT <= 0 &&
        Math.abs(m.x - player.x) < (m.w + player.w) / 2 + 0.1 &&
        m.y < player.y + player.h && m.y + m.h > player.y) {
      hurtPlayer(d.dmg);
      m.atkT = 1.2;
      player.vx = (player.x < m.x ? -1 : 1) * 6;
      player.vy = -5;
    }
  }
}
function hurtPlayer(n) {
  if (player.hurtT > 0) return;
  let def = 0;
  try { def = totalArmorDefense(inv.armor) || 0; } catch (e) {}
  player.hp -= Math.max(1, n - def);
  player.hurtT = 0.8;
  Sfx.hurt();
  shake = 5;
  if (player.hp <= 0) { player.hp = 0; onDeath(); }
}

// ---------- day/night + torches ----------
function brightness() {
  // dayT 0..1, day length 600s. Night roughly 0.55..0.95.
  const s = Math.sin(dayT * Math.PI * 2);
  return clamp(0.22 + 0.78 * Math.max(0, s), 0.18, 1);
}
function isNight() { return brightness() < 0.4; }
function refreshTorches() {
  torches = [];
  for (let y = 0; y < WH; y++) {
    for (let x = 0; x < WW; x++) {
      const b = tiles[tidx(x, y)];
      if (b === BLOCK.TORCH || b === BLOCK.GREENSTONE_TORCH) torches.push({ x: x + 0.5, y: y + 0.5, green: b === BLOCK.GREENSTONE_TORCH });
    }
  }
}

// ---------- icons / hotbar / inventory / crafting UI ----------
function iconFor(id) {
  return isBlockItem(id) ? makeIcon(id, atlas) : makeItemIconCanvas(id);
}
function iconInto(parent, id, size) {
  parent.innerHTML = '';
  if (id == null) return;
  const c = iconFor(id);
  c.style.width = size + 'px'; c.style.height = size + 'px';
  c.style.imageRendering = 'pixelated';
  parent.appendChild(c);
}
function buildHotbar() {
  const hb = el('hotbar');
  hb.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const s = inv.slots[i];
    const d = document.createElement('div');
    d.className = 'slot' + (i === inv.selected ? ' active' : '');
    if (s) {
      iconInto(d, s.item, 30);
      if (s.count > 1) {
        const c = document.createElement('div');
        c.className = 'count'; c.textContent = s.count;
        d.appendChild(c);
      }
      if (s.durability != null) {
        const def = itemDef(s.item);
        if (def && def.tool && def.tool.maxDurability) {
          const bar = document.createElement('div');
          bar.style.cssText = 'position:absolute;bottom:1px;left:3px;width:30px;height:2px;background:rgba(0,0,0,0.5);';
          const f = document.createElement('div');
          f.style.cssText = `width:${Math.round(100 * s.durability / def.tool.maxDurability)}%;height:100%;background:#4a4;`;
          bar.appendChild(f); d.appendChild(bar);
        }
      }
    }
    d.addEventListener('click', () => { inv.selected = i; buildHotbar(); Sfx.click(); });
    hb.appendChild(d);
  }
}
let cursorEl = null;
function cursorIcon() {
  if (!cursorEl) {
    cursorEl = document.createElement('canvas');
    cursorEl.id = 'cursor-stack';
    cursorEl.width = 32; cursorEl.height = 32;
    document.body.appendChild(cursorEl);
  }
  const g = cursorEl.getContext('2d');
  g.clearRect(0, 0, 32, 32);
  if (cursor) {
    const ic = iconFor(cursor.item);
    g.drawImage(ic, 0, 0, 32, 32);
    cursorEl.style.display = 'block';
  } else cursorEl.style.display = 'none';
}
window.addEventListener('mousemove', (e) => {
  if (cursorEl) { cursorEl.style.left = (e.clientX + 12) + 'px'; cursorEl.style.top = (e.clientY + 12) + 'px'; }
});
function renderCraft() {
  const grid = el('craft-grid');
  grid.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const d = document.createElement('div');
    d.className = 'inv-slot craft-cell';
    const s = craft.grid[i];
    if (s) {
      iconInto(d, s.item, 34);
      if (s.count > 1) {
        const c = document.createElement('div');
        c.className = 'count'; c.textContent = s.count;
        d.appendChild(c);
      }
    }
    d.addEventListener('click', () => {
      if (!cursor) cursor = craft.takeCell(i);
      else cursor = craft.putCell(i, cursor);
      cursorIcon(); renderCraft(); Sfx.click();
    });
    grid.appendChild(d);
  }
  const out = el('craft-out');
  out.innerHTML = '';
  out.className = 'inv-slot craft-out';
  const o = craft.output;
  if (o) {
    iconInto(out, o.id, 40);
    const c = document.createElement('div');
    c.className = 'count'; c.textContent = '×' + o.count;
    out.appendChild(c);
  }
  out.onclick = () => {
    const oo = craft.output;
    if (!oo) return;
    const cap = maxStack(oo.id);
    if (!cursor) { cursor = { item: oo.id, count: 0 }; }
    if (cursor.item !== oo.id || cursor.count + oo.count > cap) { Sfx.click(); return; }
    // crafted tools/armor start at full durability, like the main game
    if (cursor.count === 0) {
      const od = itemDef(oo.id);
      const maxD = od && (od.tool ? od.tool.maxDurability : od.armor ? od.armor.maxDurability : null);
      if (maxD) cursor.durability = maxD;
    }
    cursor.count += oo.count;
    craft.consumeIngredients();
    cursorIcon(); renderCraft(); Sfx.craft();
  };
}
function renderInv() {
  const grid = el('inv-grid');
  grid.innerHTML = '';
  // armor row (4) + main 36
  for (let a = 0; a < 4; a++) {
    const d = document.createElement('div');
    d.className = 'inv-slot';
    d.title = ['Helmet', 'Chestplate', 'Leggings', 'Boots'][a];
    const s = inv.armor[a];
    if (s) iconInto(d, s.item, 34);
    d.addEventListener('click', () => {
      const cur = inv.armor[a];
      if (!cursor && cur) { cursor = cur; inv.armor[a] = null; }
      else if (cursor && !cur) {
        const ai = armorInfo(cursor.item);
        if (ai && ai.slotIdx === a) { inv.armor[a] = { item: cursor.item, count: 1 }; cursor.count--; if (cursor.count <= 0) cursor = null; }
        else { inv.armor[a] = cursor; cursor = cur; }
      } else if (cursor && cur) { inv.armor[a] = cursor; cursor = cur; }
      cursorIcon(); renderInv(); buildHotbar(); Sfx.click();
    });
    grid.appendChild(d);
  }
  for (let i = 0; i < 36; i++) {
    const d = document.createElement('div');
    d.className = 'inv-slot';
    const s = inv.slots[i];
    if (s) {
      iconInto(d, s.item, 34);
      if (s.count > 1) {
        const c = document.createElement('div');
        c.className = 'count'; c.textContent = s.count;
        d.appendChild(c);
      }
    }
    d.addEventListener('click', () => {
      const st = inv.slots[i];
      // eat food on click
      if (!cursor && st && foodValue(st.item) > 0) {
        player.hp = Math.min(player.maxhp, player.hp + foodValue(st.item));
        st.count--;
        if (st.count <= 0) inv.slots[i] = null;
        Sfx.eat(); renderInv(); buildHotbar(); updateHearts();
        return;
      }
      if (!cursor && st) { cursor = st; inv.slots[i] = null; }
      else if (cursor && !st) { inv.slots[i] = cursor; cursor = null; }
      else if (cursor && st) {
        if (st.item === cursor.item && st.count < maxStack(st.item)) {
          const add = Math.min(maxStack(st.item) - st.count, cursor.count);
          st.count += add; cursor.count -= add;
          if (cursor.count <= 0) cursor = null;
        } else { inv.slots[i] = cursor; cursor = st; }
      }
      cursorIcon(); renderInv(); buildHotbar(); Sfx.click();
    });
    grid.appendChild(d);
  }
}
function updateHearts() {
  // NOTE: full heart uses U+2764 U+FE0F — bare ❤ renders BLACK on Apple.
  let s = '';
  for (let i = 0; i < 10; i++) s += (player.hp > i * 2 + 1) ? '❤️' : (player.hp > i * 2 ? '💔' : '🖤');
  el('hud-hearts').innerHTML = s;
}

// ---------- save / load / records ----------
const SAVE_KEY = 'paperforge_save_v1';
const BEST_KEY = 'paperforge_best';
function saveGame() {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify({
      seed, edits, doubles,
      player: { x: player.x, y: player.y, hp: player.hp },
      inv: inv.serialize(), armor: inv.armor,
      time: dayT, days: daysSurvived,
    }));
  } catch (e) {}
}
function loadGame() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return false;
    const d = JSON.parse(raw);
    seed = d.seed;
    genWorld(seed);
    for (const [x, y, v] of (d.edits || [])) {
      if (x >= 0 && x < WW && y >= 0 && y < WH) tiles[tidx(x, y)] = v;
    }
    edits = d.edits || [];
    doubles = d.doubles || {};
    atlas = buildAtlas(seed);
    player = newPlayer(d.player.x, d.player.y);
    player.hp = d.player.hp;
    inv = new Inventory();
    inv.load(d.inv);
    inv.armor = d.armor || inv.armor;
    dayT = d.time || 0.15;
    daysSurvived = d.days || 0;
    mobs = []; parts = []; floats = [];
    refreshTorches();
    return true;
  } catch (e) { return false; }
}
function hasSave() {
  try { return !!localStorage.getItem(SAVE_KEY); } catch (e) { return false; }
}
function getBest() {
  try { return JSON.parse(localStorage.getItem(BEST_KEY) || 'null'); } catch (e) { return null; }
}
function setBest(v) {
  try { localStorage.setItem(BEST_KEY, JSON.stringify(v)); } catch (e) {}
}

// ---------- run lifecycle ----------
function startNew() {
  seed = (Math.random() * 1e9) | 0;
  genWorld(seed);
  atlas = buildAtlas(seed);
  const s = findSpawn();
  player = newPlayer(s.x, s.y);
  inv = new Inventory();
  if (BF_DEV) {
    inv.add(ITEM.STONE_PICKAXE || 516, 1);
    inv.add(BLOCK.TORCH, 16);
  }
  craft = new CraftingGrid(3);
  cursor = null;
  mobs = []; parts = []; floats = [];
  dayT = 0.1; elapsed = 0; daysSurvived = 0; wasNight = false;
  mineTarget = null; mineProg = 0;
  refreshTorches();
  buildHotbar();
  updateHearts();
  enterPlay();
}
function enterPlay() {
  ['screen-menu', 'screen-how', 'screen-dead', 'screen-pause', 'screen-craft', 'screen-inv'].forEach(hide);
  show('hud');
  state = 'play';
  Sfx.unlock();
}
function toMenu(save) {
  if (save && state === 'play') saveGame();
  state = 'menu';
  ['screen-pause', 'screen-craft', 'screen-inv', 'screen-dead'].forEach(hide);
  hide('hud');
  show('screen-menu');
  refreshMenu();
}
function onDeath() {
  state = 'dead';
  Sfx.hurt();
  burst(player.x, player.y + 1, [0.8, 0.2, 0.2]);
  const b = getBest();
  if (!b || daysSurvived > b.days) {
    setBest({ days: daysSurvived, time: Math.floor(elapsed) });
    el('dead-stats').innerHTML = `Survived <b>${daysSurvived}</b> day(s) — <b>NEW BEST!</b>`;
  } else {
    el('dead-stats').innerHTML = `Survived <b>${daysSurvived}</b> day(s) · best ${b.days}`;
  }
  hide('hud');
  show('screen-dead');
}
function respawn() {
  const s = findSpawn();
  player.x = s.x; player.y = s.y; player.vx = 0; player.vy = 0;
  player.hp = player.maxhp;
  dayT = 0.1;
  updateHearts();
  enterPlay();
}
function closeModals() {
  let any = false;
  for (const id of ['screen-craft', 'screen-inv']) {
    if (!el(id).classList.contains('hidden')) { hide(id); any = true; }
  }
  if (any) {
    // return crafting grid contents before dropping the flag
    const left = craft.returnAll(inv);
    if (cursor) {
      const l = inv.add(cursor.item, cursor.count);
      cursor = null;
    }
    cursorIcon();
    buildHotbar();
    modalOpen = false;
  }
  return any;
}
function togglePause() {
  if (state !== 'play') return;
  if (modalOpen) { closeModals(); return; }
  state = 'pause';
  el('pause-stats').innerHTML = `Day ${daysSurvived + 1} · ${fmtClock()} · ${kills()} kills`;
  show('screen-pause');
}
function fmtClock() {
  const h = Math.floor(dayT * 24), m = Math.floor((dayT * 24 * 60) % 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}
function kills() { return killCount; }
let killCount = 0;
function refreshMenu() {
  el('btn-continue').classList.toggle('hidden', !hasSave());
  const b = getBest();
  el('best-line').textContent = b ? `BEST — survived ${b.days} day(s)` : 'No expeditions logged yet.';
  el('hero-line').textContent = BF_HERO
    ? `🔗 BlockForge hero: ${BF_HERO.toUpperCase().slice(0, 12)}${BF_DEV ? ' 👑DEV kit issued!' : ''}`
    : 'Tip: set a name in BlockForge and we’ll fill it in!';
}

// ---------- per-frame update ----------
let lastT = 0, saveClock = 0;
function frame(t) {
  requestAnimationFrame(frame);
  const dt = Math.min(0.05, (t - lastT) / 1000 || 0.016);
  lastT = t;
  if (state !== 'play' || modalOpen) { drawMenuBg(); return; }
  try {
    update(dt);
  } catch (e) { pfError('update', e); return; }
  try {
    draw();
  } catch (e) { pfError('draw', e); }
}
function drawMenuBg() {
  // gentle starfield behind menus using last world (or plain gradient)
  ctx.fillStyle = '#0a0a18';
  ctx.fillRect(0, 0, W, H);
}
function update(dt) {
  elapsed += dt;
  dayT = (dayT + dt / 600) % 1;
  const night = isNight();
  if (wasNight && !night) { daysSurvived++; }
  wasNight = night;
  torchFlick += dt;
  if (atkCooldown > 0) atkCooldown -= dt;
  if (mineCooldown > 0) mineCooldown -= dt;
  if (player.hurtT > 0) player.hurtT -= dt;
  if (player.mineAnim > 0) player.mineAnim -= dt;

  // movement
  const L = keys.ArrowLeft || keys.KeyA, R = keys.ArrowRight || keys.KeyD;
  const J = keys.Space || keys.ArrowUp || keys.KeyW;
  const SP = 6.2;
  const want = (R ? 1 : 0) - (L ? 1 : 0);
  player.vx += ((want * SP) - player.vx) * Math.min(1, dt * 12);
  if (want !== 0) { player.face = want; player.walkPh += dt * 10; }
  player.py = player.y;
  moveBody(player, dt, true);
  if (J && player.onGround) { player.vy = -10.5; player.onGround = false; Sfx.click(); }
  if (player.y < -2) { player.y = 2; player.vy = 0; }
  if (player.y > WH - 1) { player.y = WH - 2; player.vy = 0; }
  player.x = clamp(player.x, 1, WW - 1);

  // mining hold (mouse held from mousedown; mobile touch sets mouse.left)
  if (mouse.left && mineTarget) tickMining(dt);

  tickMobs(dt, night);

  // camera
  camX += ((player.x * TS - W / 2) - camX) * Math.min(1, dt * 6);
  camY += ((player.y * TS - H / 2) - camY) * Math.min(1, dt * 6);
  camX = clamp(camX, 0, WW * TS - W);
  camY = clamp(camY, -40, WH * TS - H + 40);
  if (shake > 0) shake = Math.max(0, shake - dt * 30);

  // particles
  for (let i = parts.length - 1; i >= 0; i--) {
    const p = parts[i];
    p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 6 * dt; p.life -= dt;
    if (p.life <= 0) parts.splice(i, 1);
  }
  for (let i = floats.length - 1; i >= 0; i--) {
    const f = floats[i];
    f.y -= dt * 0.8; f.life -= dt;
    if (f.life <= 0) floats.splice(i, 1);
  }

  // HUD clock
  el('hud-clock').textContent = night ? '🌙' : '☀';

  saveClock += dt;
  if (saveClock > 15) { saveClock = 0; saveGame(); }
}

// ---------- render ----------
function draw() {
  const bright = brightness();
  const night = isNight();
  // sky
  const skyTop = night ? '#05051a' : '#7ab5e8';
  const skyBot = night ? '#0a0a24' : '#bfe0f0';
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, skyTop);
  g.addColorStop(1, skyBot);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
  window.__skyN = (window.__skyN || 0) + 1;
  // sun/moon
  const sunA = dayT * Math.PI * 2;
  const sx = W * 0.5 + Math.cos(sunA) * W * 0.4;
  const sy = H * 0.42 - Math.sin(sunA) * H * 0.35;
  ctx.fillStyle = night ? '#e8e8f0' : '#ffdd55';
  ctx.beginPath(); ctx.arc(sx, sy, night ? 14 : 20, 0, 6.283); ctx.fill();
  if (!night) {
    ctx.fillStyle = 'rgba(255,220,100,0.35)';
    ctx.beginPath(); ctx.arc(sx, sy, 30, 0, 6.283); ctx.fill();
  }
  // stars at night
  if (night) {
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    for (let i = 0; i < 70; i++) {
      const hx = hash2(i, 3) * W, hy = hash2(i, 9) * H * 0.7;
      const tw = 0.4 + 0.6 * Math.abs(Math.sin(elapsed * 2 + i));
      ctx.globalAlpha = tw * (1 - bright) * 2;
      ctx.fillRect(hx, hy, 2, 2);
    }
    ctx.globalAlpha = 1;
  }
  let shx = 0, shy = 0;
  if (shake > 0) { shx = (Math.random() - 0.5) * shake; shy = (Math.random() - 0.5) * shake; }
  const ox = -camX + shx, oy = -camY + shy;

  // tiles
  const x0 = Math.max(0, Math.floor(camX / TS) - 1), x1 = Math.min(WW - 1, Math.ceil((camX + W) / TS) + 1);
  const y0 = Math.max(0, Math.floor(camY / TS) - 1), y1 = Math.min(WH - 1, Math.ceil((camY + H) / TS) + 1);
  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      const b = tiles[tidx(x, y)];
      if (b === AIR) continue;
      const px = x * TS + ox, py = y * TS + oy;
      const pair = doubles[x + ',' + y];
      if (pair) { drawDoubleSlab(pair, px, py); continue; }
      window.__tileN = (window.__tileN || 0) + 1;
      drawBlockTile(b, px, py);
    }
  }
  // mining crack overlay
  if (mineTarget) {
    const px = mineTarget.x * TS + ox, py = mineTarget.y * TS + oy;
    ctx.strokeStyle = `rgba(0,0,0,${0.3 + mineProg * 0.6})`;
    ctx.lineWidth = 2;
    const n = 1 + Math.floor(mineProg * 4);
    for (let i = 0; i < n; i++) {
      ctx.beginPath();
      ctx.moveTo(px + hash2(i, 1) * TS, py + hash2(i, 2) * TS);
      ctx.lineTo(px + hash2(i, 3) * TS, py + hash2(i, 4) * TS);
      ctx.stroke();
    }
  }
  // mobs
  for (const m of mobs) drawMob(m, ox, oy);
  // player
  drawPlayer(ox, oy);
  // particles
  for (const p of parts) {
    ctx.globalAlpha = clamp(p.life * 2, 0, 1);
    ctx.fillStyle = `rgb(${(p.col[0] * 255) | 0},${(p.col[1] * 255) | 0},${(p.col[2] * 255) | 0})`;
    ctx.fillRect(p.x * TS + ox - 2, p.y * TS + oy - 2, 4, 4);
  }
  ctx.globalAlpha = 1;
  // floats
  ctx.textAlign = 'center';
  ctx.font = 'bold 13px monospace';
  for (const f of floats) {
    ctx.globalAlpha = clamp(f.life, 0, 1);
    ctx.fillStyle = f.col;
    ctx.fillText(f.txt, f.x * TS + ox, f.y * TS + oy);
  }
  ctx.globalAlpha = 1;
  // night darkness + torch light (+ depth darkness underground)
  let dark = clamp((0.42 - bright) * 1.6, 0, 0.72);
  const depthDark = clamp((camY / TS - 46) / 34, 0, 0.82);
  if (depthDark > dark) dark = depthDark;
  if (dark > 0.01) {
    ctx.fillStyle = `rgba(4,4,26,${dark.toFixed(2)})`;
    ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';
    for (const t of torches) {
      const px = t.x * TS + ox, py = t.y * TS + oy;
      if (px < -160 || py < -160 || px > W + 160 || py > H + 160) continue;
      const r = 150 + Math.sin(torchFlick * 8 + t.x) * 12;
      const rg = ctx.createRadialGradient(px, py, 8, px, py, r);
      const core = t.green ? '90,220,120' : '255,190,90';
      rg.addColorStop(0, `rgba(${core},0.55)`);
      rg.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = rg;
      ctx.fillRect(px - r, py - r, r * 2, r * 2);
    }
    ctx.globalCompositeOperation = 'source-over';
  }
  // hurt vignette
  if (player.hurtT > 0) {
    ctx.fillStyle = `rgba(255,30,20,${(player.hurtT * 0.5).toFixed(2)})`;
    ctx.fillRect(0, 0, W, 10);
    ctx.fillRect(0, H - 10, W, 10);
    ctx.fillRect(0, 0, 10, H);
    ctx.fillRect(W - 10, 0, 10, H);
  }
}

// ---------- entity drawing (BlockForge mob palettes, 2D side view) ----------
function drawPlayer(ox, oy) {
  const px = player.x * TS + ox, py = player.y * TS + oy;
  const blink = player.hurtT > 0 && Math.floor(elapsed * 12) % 2 === 0;
  if (blink) return;
  const f = player.face;
  const legSwing = (Math.abs(player.vx) > 0.5 && player.onGround) ? Math.sin(player.walkPh) * 6 : 0;
  const bx = px, by = py; // feet
  // legs (pants #3535b0 classic)
  ctx.fillStyle = '#3535b0';
  ctx.fillRect(bx - 7, by - 26 + Math.max(0, legSwing), 6, 26 - Math.max(0, legSwing));
  ctx.fillRect(bx + 1, by - 26 + Math.max(0, -legSwing), 6, 26 - Math.max(0, -legSwing));
  // shirt (classic teal)
  ctx.fillStyle = '#00a8a8';
  ctx.fillRect(bx - 9, by - 48, 18, 24);
  ctx.fillStyle = '#008888';
  ctx.fillRect(bx - 9, by - 48, 18, 3);
  // armor tint
  try {
    const am = armorInfo;
    void am;
  } catch (e) {}
  // arm (swings while mining)
  const sw = player.mineAnim > 0 ? Math.sin(player.mineAnim * 30) * 8 : (Math.abs(player.vx) > 0.5 ? -Math.sin(player.walkPh) * 5 : 0);
  ctx.fillStyle = '#00a8a8';
  ctx.fillRect(bx + f * 9 - 3, by - 46 + sw, 6, 18);
  // held item icon
  const slot = inv.slots[inv.selected];
  if (slot) {
    const ic = iconFor(slot.item);
    ctx.drawImage(ic, bx + f * 12 - 8, by - 44 + sw * 1.4, 16, 16);
  }
  // head + hair + face
  ctx.fillStyle = '#c0906a';
  ctx.fillRect(bx - 7, by - 62, 14, 14);
  ctx.fillStyle = '#4a3018';
  ctx.fillRect(bx - 7, by - 62, 14, 5);
  ctx.fillRect(bx - 7, by - 62, 3, 14);
  ctx.fillStyle = '#222';
  ctx.fillRect(bx + (f > 0 ? 1 : -5), by - 56, 4, 4);
}
function drawMob(m, ox, oy) {
  const px = m.x * TS + ox, py = m.y * TS + oy;
  const blink = m.flash > 0 && Math.floor(elapsed * 20) % 2 === 0;
  const X = (lx, w) => px + (m.dir >= 0 ? lx : -lx - w);
  const PXS = 32; // pixels per tile for sprite scale (1 tile = 32px)
  ctx.save();
  if (blink) ctx.globalAlpha = 0.45;
  const s = TS; // 1 tile unit
  if (m.type === 'zombie') {
    // moss skin #7fa03c, ragged brown shirt, dark pants, amber eyes
    ctx.fillStyle = '#3a3230';
    ctx.fillRect(px - 7, py - 26, 6, 26);
    ctx.fillRect(px + 1, py - 26, 6, 26);
    ctx.fillStyle = '#6a4a2a';
    ctx.fillRect(px - 9, py - 48, 18, 22);
    ctx.fillStyle = '#7fa03c';
    ctx.fillRect(px - 6, py - 30, 12, 5); // tear
    ctx.fillStyle = '#7fa03c';
    ctx.fillRect(px + (m.dir >= 0 ? 2 : -14), py - 44, 12, 16); // reaching arm
    ctx.fillStyle = '#7fa03c';
    ctx.fillRect(px - 7, py - 62, 14, 14);
    ctx.fillStyle = '#3a2515';
    ctx.fillRect(px - 7, py - 62, 14, 5);
    ctx.fillStyle = '#ffb020';
    ctx.fillRect(X(-2, 4), py - 56, 4, 4);
  } else if (m.type === 'skeleton') {
    // bone #e8e4d8, soul eyes #6ef3ff
    ctx.fillStyle = '#d8d4c8';
    ctx.fillRect(px - 5, py - 24, 4, 24);
    ctx.fillRect(px + 1, py - 24, 4, 24);
    ctx.fillStyle = '#e8e4d8';
    for (let ry = 0; ry < 4; ry++) {
      ctx.fillRect(px - 10, py - 46 + ry * 6, 20, 3); // ribs
    }
    ctx.fillRect(px - 2, py - 48, 4, 26); // spine
    ctx.fillStyle = '#e8e4d8';
    ctx.fillRect(px + (m.dir >= 0 ? 4 : -16), py - 42, 12, 4); // arm
    ctx.fillStyle = '#f0ece0';
    ctx.fillRect(px - 7, py - 62, 14, 14);
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(X(-3, 5), py - 57, 5, 6); // socket
    ctx.fillStyle = '#6ef3ff';
    ctx.fillRect(X(-2, 3), py - 56, 3, 3); // soul glow
    ctx.fillStyle = '#f5f0e5';
    ctx.fillRect(px - 5, py - 50, 10, 2); // teeth
  } else if (m.type === 'spider') {
    // violet #4a2a5a, magenta eyes, fangs
    ctx.fillStyle = '#2a2a2a';
    for (let li = -1; li <= 1; li++) {
      ctx.fillRect(px - 18, py - 22 + li * 8, 36, 2);
    }
    ctx.fillStyle = '#4a2a5a';
    ctx.beginPath(); ctx.ellipse(px, py - 14, 16, 10, 0, 0, 6.283); ctx.fill();
    ctx.fillStyle = '#5a3270';
    ctx.beginPath(); ctx.ellipse(px + m.dir * 10, py - 16, 8, 7, 0, 0, 6.283); ctx.fill(); // head
    ctx.fillStyle = '#e05aff';
    ctx.fillRect(px + m.dir * 12 - 4, py - 20, 3, 3);
    ctx.fillRect(px + m.dir * 12 + 1, py - 20, 3, 3);
    ctx.fillStyle = '#eee';
    ctx.fillRect(px + m.dir * 8 - 1, py - 8, 2, 5); // fang
  } else if (m.type === 'slime') {
    // translucent green #40c040, core, eyes
    const sq = 0.9 + Math.sin(m.t * 6) * 0.06;
    const wpx = 26 * sq, hpx = 24 / sq;
    ctx.fillStyle = 'rgba(64,192,64,0.75)';
    ctx.fillRect(px - wpx / 2, py - hpx, wpx, hpx);
    ctx.fillStyle = 'rgba(30,90,30,0.6)';
    ctx.fillRect(px - 7, py - hpx + 6, 14, 10); // core
    ctx.fillStyle = 'rgba(220,255,220,0.7)';
    ctx.fillRect(px - wpx / 2 + 2, py - hpx + 2, 8, 3); // gloss
    ctx.fillStyle = '#111';
    ctx.fillRect(px - 7, py - hpx + 8, 5, 6);
    ctx.fillRect(px + 2, py - hpx + 8, 5, 6);
    ctx.fillStyle = '#fff';
    ctx.fillRect(px - 6, py - hpx + 9, 2, 2);
    ctx.fillRect(px + 3, py - hpx + 9, 2, 2);
  } else if (m.type === 'cow') {
    ctx.fillStyle = '#6b4226';
    ctx.fillRect(px - 18, py - 30, 36, 20); // body
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(px - 8, py - 28, 12, 10); // patch
    ctx.fillStyle = '#6b4226';
    ctx.fillRect(px - 15, py - 10, 6, 10);
    ctx.fillRect(px + 9, py - 10, 6, 10); // legs
    ctx.fillStyle = '#7a5230';
    ctx.fillRect(px + (m.dir >= 0 ? 14 : -26), py - 32, 12, 12); // head
    ctx.fillStyle = '#e8b8a0';
    ctx.fillRect(px + (m.dir >= 0 ? 20 : -26), py - 26, 8, 5); // snout
    ctx.fillStyle = '#d8d8d8';
    ctx.fillRect(px + (m.dir >= 0 ? 8 : -14), py - 38, 3, 6); // horn
  } else if (m.type === 'pig') {
    ctx.fillStyle = '#f0a0a0';
    ctx.fillRect(px - 15, py - 26, 30, 16); // body
    ctx.fillStyle = '#f0a0a0';
    ctx.fillRect(px - 12, py - 10, 5, 10);
    ctx.fillRect(px + 7, py - 10, 5, 10);
    ctx.fillStyle = '#f4b8b8';
    ctx.fillRect(px + (m.dir >= 0 ? 11 : -23), py - 30, 12, 12); // head
    ctx.fillStyle = '#e08080';
    ctx.fillRect(px + (m.dir >= 0 ? 17 : -25), py - 25, 7, 5); // snout
    ctx.fillStyle = '#111';
    ctx.fillRect(px + (m.dir >= 0 ? 14 : -22), py - 28, 2, 2); // eye
    ctx.fillStyle = '#f0a0a0';
    ctx.fillRect(px - 20, py - 22, 6, 2); // curly tail
  } else if (m.type === 'sheep') {
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(px - 16, py - 32, 32, 20); // wool
    ctx.fillStyle = '#d8d8d8';
    ctx.fillRect(px - 16, py - 14, 32, 2);
    ctx.fillStyle = '#5a4632';
    ctx.fillRect(px - 12, py - 10, 5, 10);
    ctx.fillRect(px + 7, py - 10, 5, 10);
    ctx.fillStyle = '#c8a882';
    ctx.fillRect(px + (m.dir >= 0 ? 12 : -24), py - 30, 12, 10); // face
    ctx.fillStyle = '#111';
    ctx.fillRect(px + (m.dir >= 0 ? 16 : -22), py - 27, 2, 2);
  } else if (m.type === 'chicken') {
    // cream #f2e4c8, comb/wattle red, beak orange
    ctx.fillStyle = '#f2e4c8';
    ctx.fillRect(px - 8, py - 20, 16, 20); // body
    ctx.fillStyle = '#e8a020';
    ctx.fillRect(px - 5, py - 4, 3, 4);
    ctx.fillRect(px + 2, py - 4, 3, 4); // legs
    ctx.fillStyle = '#f2e4c8';
    ctx.fillRect(px + (m.dir >= 0 ? 2 : -16), py - 32, 14, 13); // head
    ctx.fillStyle = '#e8a020';
    ctx.fillRect(px + (m.dir >= 0 ? 16 : -20), py - 28, 5, 4); // beak
    ctx.fillStyle = '#cc2222';
    ctx.fillRect(px + (m.dir >= 0 ? 4 : -16), py - 38, 10, 6); // comb
    ctx.beginPath(); ctx.arc(px + (m.dir >= 0 ? 12 : -12), py - 20, 3, 0, 6.283); ctx.fill(); // wattle
    ctx.fillStyle = '#111';
    ctx.fillRect(px + (m.dir >= 0 ? 8 : -14), py - 29, 3, 3); // eye
  }
  ctx.restore();
  void PXS;
}

// ---------- main loop ----------
function modalAnyOpen() {
  return !el('screen-craft').classList.contains('hidden')
    || !el('screen-inv').classList.contains('hidden')
    || state !== 'play';
}

function openCraft() {
  if (state !== 'play') return;
  Sfx.click();
  hide('screen-inv');
  cursor = null; cursorIcon();
  renderCraft();
  show('screen-craft');
  modalOpen = true;
}
function openInv() {
  if (state !== 'play') return;
  Sfx.click();
  hide('screen-craft');
  renderInv();
  show('screen-inv');
  modalOpen = true;
}
document.getElementById('btn-craft').addEventListener('click', openCraft);
document.getElementById('btn-inv').addEventListener('click', openInv);
document.getElementById('btn-inv-close').addEventListener('click', () => {
  if (cursor) {
    inv.add(cursor.item, cursor.count);
    cursor = null; cursorIcon();
  }
  buildHotbar();
  hide('screen-inv');
  modalOpen = false;
  Sfx.click();
});
document.getElementById('btn-craft-close').addEventListener('click', () => {
  const left = craft.returnAll(inv);
  cursor = null; cursorIcon();
  buildHotbar();
  hide('screen-craft');
  modalOpen = false;
  Sfx.click();
});
document.getElementById('btn-mode').addEventListener('click', (e) => {
  placeMode = !placeMode;
  e.target.textContent = placeMode ? '🧱' : '⛏';
  Sfx.click();
});
document.getElementById('btn-pause').addEventListener('click', () => togglePause());
document.getElementById('btn-resume').addEventListener('click', () => togglePause());
document.getElementById('btn-save-quit').addEventListener('click', () => { saveGame(); toMenu(); Sfx.click(); });
document.getElementById('btn-play').addEventListener('click', () => { startNew(); });
document.getElementById('btn-continue').addEventListener('click', () => {
  if (loadGame()) { buildHotbar(); updateHearts(); enterPlay(); }
  else startNew();
});
document.getElementById('btn-how').addEventListener('click', () => { hide('screen-menu'); show('screen-how'); Sfx.click(); });
document.getElementById('btn-how-back').addEventListener('click', () => { hide('screen-how'); show('screen-menu'); Sfx.click(); });
document.getElementById('btn-back-bf').addEventListener('click', () => { try { window.location.href = '../games.html?v=2'; } catch (e) {} });
document.getElementById('btn-respawn').addEventListener('click', () => { respawn(); Sfx.click(); });
document.getElementById('btn-dead-menu').addEventListener('click', () => { toMenu(true); Sfx.click(); });

// boot: menu content + the frame loop kickoff (without this, nothing renders)
refreshMenu();
requestAnimationFrame(frame);
