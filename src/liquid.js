// Flowing water/lava simulation.
//
// Every water/lava block placed by the SkyBlock map (or a bucket) is treated as
// a permanent SOURCE (level 0). Each frame a small budget of cells is stepped:
// liquid falls down when the block below is air (keeping its level), and spreads
// horizontally, gaining one level per step, until it reaches the max reach
// (water 7, lava 3) or is blocked. Placed sources are never consumed, which gives
// skyblock-style infinite water/lava.
//
// Water meeting lava (flowing or source, in any direction) hardens the lava into
// COBBLESTONE. This powers the classic skyblock cobblestone generator: place a
// lava source at one end of a trench and a water source at the other; where the
// flows touch, cobblestone spawns, and mining it re-triggers the two fronts, so
// it regenerates forever.
//
// Mesh refresh is coalesced into a dirty-chunk set and flushed once per tick.

import { BLOCK } from './blocks.js';

const WATER_MAX = 7;
const LAVA_MAX = 3;
const BUDGET = 40;        // cells stepped per frame — keep flows gradual instead of flooding instantly

let world = null;
let refreshFn = null;     // (cx, cz) => void
let active = false;

const _queue = [];        // [x, y, z, ...] consumed from _qHead
let _qHead = 0;
const _inQueue = new Set();
const _levels = new Map(); // "x,y,z" -> level (1..max) for flow cells
const _dirty = new Set();  // "cx,cz" chunks whose mesh needs a refresh
const _key = (x, y, z) => x + ',' + y + ',' + z;
const _HORIZ = [[1, 0], [-1, 0], [0, 1], [0, -1]];

export function initLiquid(w, refresh) {
  world = w;
  refreshFn = refresh;
  active = true;
  _queue.length = 0;
  _qHead = 0;
  _inQueue.clear();
  _levels.clear();
  _dirty.clear();
}

export function clearLiquid() {
  world = null;
  refreshFn = null;
  active = false;
  _queue.length = 0;
  _qHead = 0;
  _inQueue.clear();
  _levels.clear();
  _dirty.clear();
}

export function liquidActive() { return active; }

function enqueue(x, y, z) {
  if (!active) return;
  const k = _key(x, y, z);
  if (_inQueue.has(k)) return;
  _inQueue.add(k);
  _queue.push(x, y, z);
}

function markDirty(x, z) {
  if (x < 0 || z < 0) return;
  _dirty.add((x >> 4) + ',' + (z >> 4));
}

// Register a fresh source (placed water/lava, or one baked into the map).
export function registerSource(x, y, z) {
  if (!active || !world) return;
  _levels.delete(_key(x, y, z));
  enqueue(x, y, z);
}

// Call after any block change that borders a liquid so it can reflow
// (e.g. a solid block broken next to water, or a new block placed in it).
// Mining the cobblestone from a generator re-enqueues the water+lava fronts,
// which immediately lay a fresh cobblestone — the infinite generator loop.
export function liquidBlockChanged(x, y, z) {
  if (!active || !world) return;
  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      for (let dz = -1; dz <= 1; dz++) {
        if (dx === 0 && dy === 0 && dz === 0) continue;
        const b = world.getBlock(x + dx, y + dy, z + dz);
        if (b === BLOCK.WATER || b === BLOCK.LAVA) enqueue(x + dx, y + dy, z + dz);
      }
    }
  }
}

function isLiquid(b) { return b === BLOCK.WATER || b === BLOCK.LAVA; }

// True if any of the 4 horizontal neighbors of (x,y,z) is lava.
function nearLava(x, y, z) {
  for (let i = 0; i < 4; i++) {
    if (world.getBlock(x + _HORIZ[i][0], y, z + _HORIZ[i][1]) === BLOCK.LAVA) return true;
  }
  return false;
}

// Hardens a lava cell (or converts lava adjacent to water) into cobblestone.
// Returns true if it converted anything so the caller can stop.
function convertLava(x, y, z) {
  const here = world.getBlock(x, y, z);
  if (!isLiquid(here)) return false;

  // Below: water sitting on lava, or lava sitting on water → harden the lava.
  const below = world.getBlock(x, y - 1, z);
  if (isLiquid(below) && below !== here) {
    const lavaCell = here === BLOCK.LAVA ? [x, y, z] : [x, y - 1, z];
    world.setBlock(lavaCell[0], lavaCell[1], lavaCell[2], BLOCK.COBBLESTONE);
    _levels.delete(_key(lavaCell[0], lavaCell[1], lavaCell[2]));
    markDirty(lavaCell[0], lavaCell[2]);
    liquidBlockChanged(lavaCell[0], lavaCell[1], lavaCell[2]);
    return true;
  }

  // Horizontal: if we're lava next to water, we harden; if we're water next
  // to lava, the lava hardens. Either way the lava block becomes cobblestone.
  for (let i = 0; i < 4; i++) {
    const nx = x + _HORIZ[i][0];
    const nz = z + _HORIZ[i][1];
    const nb = world.getBlock(nx, y, nz);
    if (nb === BLOCK.AIR || nb === here) continue;
    if (!isLiquid(nb)) continue;
    const lavaCell = here === BLOCK.LAVA ? [x, y, z] : [nx, y, nz];
    world.setBlock(lavaCell[0], lavaCell[1], lavaCell[2], BLOCK.COBBLESTONE);
    _levels.delete(_key(lavaCell[0], lavaCell[1], lavaCell[2]));
    markDirty(lavaCell[0], lavaCell[2]);
    liquidBlockChanged(lavaCell[0], lavaCell[1], lavaCell[2]);
    return true;
  }
  return false;
}

function step(x, y, z) {
  const here = world.getBlock(x, y, z);
  if (!isLiquid(here)) {
    _levels.delete(_key(x, y, z));
    return;
  }
  const isLava = here === BLOCK.LAVA;
  const max = isLava ? LAVA_MAX : WATER_MAX;
  const myLevel = _levels.get(_key(x, y, z)) ?? 0;

  // Water meeting lava hardens into cobblestone (classic skyblock generator).
  if (convertLava(x, y, z)) return;

  // Fall: drop into air below (level preserved, like MC).
  const below = world.getBlock(x, y - 1, z);
  if (below === BLOCK.AIR) {
    world.setBlock(x, y - 1, z, here);
    _levels.set(_key(x, y - 1, z), myLevel);
    markDirty(x, z);
    enqueue(x, y - 1, z);
    return;
  }

  if (myLevel >= max) return;

  // Spread sideways; also drop one level into air below the new cell.
  for (let i = 0; i < 4; i++) {
    const nx = x + _HORIZ[i][0];
    const nz = z + _HORIZ[i][1];
    if (world.getBlock(nx, y, nz) !== BLOCK.AIR) continue;
    // Water never flows into a cell that touches lava: the lava front claims
    // it instead and re-hardens there, pinning the cobblestone generator to a
    // fixed cell instead of creeping toward (and consuming) the lava source.
    if (here === BLOCK.WATER && nearLava(nx, y, nz)) continue;
    const next = myLevel + 1;
    if (world.getBlock(nx, y - 1, nz) === BLOCK.AIR) {
      world.setBlock(nx, y - 1, nz, here);
      _levels.set(_key(nx, y - 1, nz), next);
      markDirty(nx, nz);
      enqueue(nx, y - 1, nz);
    } else {
      world.setBlock(nx, y, nz, here);
      _levels.set(_key(nx, y, nz), next);
      markDirty(nx, nz);
      enqueue(nx, y, nz);
    }
  }
}

export function tickLiquid(dt) {
  if (!active || !world) return;
  // Compact the queue occasionally so _queue doesn't grow unboundedly.
  if (_qHead > 100000) {
    _queue.splice(0, _qHead);
    _qHead = 0;
  }
  let processed = 0;
  while (_qHead + 3 <= _queue.length && processed < BUDGET) {
    const x = _queue[_qHead], y = _queue[_qHead + 1], z = _queue[_qHead + 2];
    _qHead += 3;
    _inQueue.delete(_key(x, y, z));
    step(x, y, z);
    processed++;
  }
  if (_qHead === _queue.length) {
    _queue.length = 0;
    _qHead = 0;
  }
  if (_dirty.size) {
    for (const ck of _dirty) {
      const i = ck.indexOf(',');
      const cx = +ck.slice(0, i);
      const cz = +ck.slice(i + 1);
      if (refreshFn) refreshFn(cx, cz);
    }
    _dirty.clear();
  }
}
