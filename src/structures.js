// Village + structure generation (from the VillagePack specs).
//
// Villages are placed deterministically per world seed: the world is divided
// into square "regions"; each region may contain one village at a seeded
// location (grass biomes, above sea level). Because placement is fully
// deterministic, every chunk can independently render its slice of any village
// that overlaps it — so structures are seamless across chunk borders and
// identical for all players sharing a seed.

import { BLOCK } from './blocks.js';
import { CHUNK_SIZE, WORLD_HEIGHT, SEA_LEVEL, BIOMES } from './constants.js';
import { calcHeight, calcBiome } from './worldgen.js';

const REGION = 176;            // blocks per village region
const VILLAGE_CHANCE = 0.42;   // chance a region contains a village
const GRASS_BIOMES = new Set([BIOMES.PLAINS, BIOMES.FOREST, BIOMES.SAVANNA, BIOMES.BIRCH_FOREST]);

// Deterministic hash → float in [0,1)
function rnd(x, z, seed) {
  let h = Math.imul(x | 0, 374761393) ^ Math.imul(z | 0, 668265263) ^ Math.imul(seed | 0, 2246822519);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

// A tiny seeded RNG for per-village variation.
function makeRng(s) {
  let a = (s >>> 0) || 1;
  return function () {
    a ^= a << 13; a ^= a >>> 17; a ^= a << 5; a >>>= 0;
    return a / 4294967296;
  };
}

// Returns the village descriptor for a region, or null.
function getVillage(rx, rz, noise, seed) {
  if (rnd(rx, rz, seed ^ 0x1234) > VILLAGE_CHANCE) return null;
  const margin = 40;
  const cx = rx * REGION + margin + Math.floor(rnd(rx, rz, seed ^ 0xAAAA) * (REGION - margin * 2));
  const cz = rz * REGION + margin + Math.floor(rnd(rx, rz, seed ^ 0x5555) * (REGION - margin * 2));
  const baseY = calcHeight(noise, cx, cz);
  if (baseY <= SEA_LEVEL) return null;                 // not underwater/beach
  if (!GRASS_BIOMES.has(calcBiome(noise, cx, cz, baseY))) return null;

  // Reject very hilly spots (keep villages on flatter ground).
  let lo = baseY, hi = baseY;
  for (const [dx, dz] of [[-16, -16], [16, -16], [-16, 16], [16, 16], [0, 0]]) {
    const h = calcHeight(noise, cx + dx, cz + dz);
    if (h < lo) lo = h; if (h > hi) hi = h;
  }
  if (hi - lo > 6) return null;

  const rng = makeRng((rx * 92837111) ^ (rz * 689287499) ^ seed);
  const buildings = [];
  // Well at the centre.
  buildings.push({ type: 'well', x: cx - 2, z: cz - 2, w: 5, d: 5 });
  // Ring of plots around the centre.
  const plots = [
    [-14, -14], [2, -16], [14, 0], [8, 12], [-10, 12], [-18, 2],
    [14, -14], [-16, -4],
  ];
  const kinds = ['house_small', 'house_medium', 'blacksmith', 'farm', 'house_small', 'house_medium', 'farm', 'house_small'];
  for (let i = 0; i < plots.length; i++) {
    if (rng() < 0.22) continue; // some plots empty for variety
    const [ox, oz] = plots[i];
    const type = kinds[i % kinds.length];
    const size = type === 'well' ? 5 : (type === 'farm' ? 9 : (type === 'house_medium' || type === 'blacksmith') ? 9 : 7);
    buildings.push({ type, x: cx + ox, z: cz + oz, w: size, d: type === 'farm' ? 7 : size });
  }
  // Lamp posts near the well.
  buildings.push({ type: 'lamp', x: cx + 4, z: cz + 4 });
  buildings.push({ type: 'lamp', x: cx - 5, z: cz + 4 });
  buildings.push({ type: 'lamp', x: cx + 4, z: cz - 5 });

  return { cx, cz, baseY, buildings, seed: (rx * 31 + rz) ^ seed };
}

// Place any villages overlapping this chunk into the chunk's block array.
export function generateVillages(chunk, baseX, baseZ, noise, seed, world) {
  const reach = 32; // max building extent from village centre
  const minRX = Math.floor((baseX - reach) / REGION);
  const maxRX = Math.floor((baseX + CHUNK_SIZE + reach) / REGION);
  const minRZ = Math.floor((baseZ - reach) / REGION);
  const maxRZ = Math.floor((baseZ + CHUNK_SIZE + reach) / REGION);

  for (let rx = minRX; rx <= maxRX; rx++) {
    for (let rz = minRZ; rz <= maxRZ; rz++) {
      const v = getVillage(rx, rz, noise, seed);
      if (v) placeVillage(v, chunk, baseX, baseZ, noise, world);
    }
  }
}

function placeVillage(v, chunk, baseX, baseZ, noise, world) {
  // Block setter clipped to this chunk.
  const set = (wx, wy, wz, b) => {
    if (wx < baseX || wx >= baseX + CHUNK_SIZE) return;
    if (wz < baseZ || wz >= baseZ + CHUNK_SIZE) return;
    if (wy < 0 || wy >= WORLD_HEIGHT) return;
    chunk.set(wx - baseX, wy, wz - baseZ, b);
  };
  const baseY = v.baseY;

  // Connecting roads between the well and each building.
  for (const b of v.buildings) {
    if (b.type === 'lamp') continue;
    layPath(set, v.cx, v.cz, b.x + (b.w ? (b.w >> 1) : 0), b.z + (b.d ? (b.d >> 1) : 0), baseY);
  }

  for (const b of v.buildings) {
    switch (b.type) {
      case 'well': buildWell(set, b.x, baseY, b.z); break;
      case 'house_small': buildHouse(set, b.x, baseY, b.z, 7, 7, 4, BLOCK.PLANKS, BLOCK.WOOD, v.seed + b.x); break;
      case 'house_medium': buildHouse(set, b.x, baseY, b.z, 9, 9, 5, BLOCK.PLANKS, BLOCK.WOOD, v.seed + b.x); break;
      case 'blacksmith': buildBlacksmith(set, b.x, baseY, b.z, world); break;
      case 'farm': buildFarm(set, b.x, baseY, b.z); break;
      case 'lamp': buildLamp(set, b.x, baseY, b.z); break;
    }
  }
}

// Flatten a footprint: clear above, set floor, add foundation below.
function foundation(set, x, y, z, block) {
  for (let dy = 1; dy <= 7; dy++) set(x, y + dy, z, BLOCK.AIR);
  set(x, y, z, block);
  set(x, y - 1, z, BLOCK.DIRT);
  set(x, y - 2, z, BLOCK.DIRT);
}

function layPath(set, x0, z0, x1, z1, y) {
  // Simple L-shaped gravel path.
  const stepX = x1 >= x0 ? 1 : -1;
  const stepZ = z1 >= z0 ? 1 : -1;
  for (let x = x0; x !== x1 + stepX; x += stepX) foundation(set, x, y, z0, BLOCK.GRAVEL);
  for (let z = z0; z !== z1 + stepZ; z += stepZ) foundation(set, x1, y, z, BLOCK.GRAVEL);
}

function buildWell(set, ox, y, oz) {
  for (let x = 0; x < 5; x++) for (let z = 0; z < 5; z++) {
    const edge = x === 0 || x === 4 || z === 0 || z === 4;
    foundation(set, ox + x, y, oz + z, edge ? BLOCK.COBBLESTONE : BLOCK.COBBLESTONE);
  }
  // water pool
  for (let x = 1; x <= 3; x++) for (let z = 1; z <= 3; z++) set(ox + x, y, oz + z, BLOCK.WATER);
  // corner posts + roof
  for (const [cx, cz] of [[0, 0], [4, 0], [0, 4], [4, 4]]) {
    set(ox + cx, y + 1, oz + cz, BLOCK.WOOD);
    set(ox + cx, y + 2, oz + cz, BLOCK.WOOD);
  }
  for (let x = 0; x < 5; x++) for (let z = 0; z < 5; z++) set(ox + x, y + 3, oz + z, BLOCK.PLANKS);
}

function buildHouse(set, ox, y, oz, w, d, wallH, wall, corner, seedv) {
  const rng = makeRng(seedv);
  // floor + foundation
  for (let x = 0; x < w; x++) for (let z = 0; z < d; z++) foundation(set, ox + x, y, oz + z, BLOCK.PLANKS);
  // walls
  for (let h = 1; h <= wallH; h++) {
    for (let x = 0; x < w; x++) for (let z = 0; z < d; z++) {
      const edge = x === 0 || x === w - 1 || z === 0 || z === d - 1;
      if (!edge) { set(ox + x, y + h, oz + z, BLOCK.AIR); continue; }
      const isCorner = (x === 0 || x === w - 1) && (z === 0 || z === d - 1);
      set(ox + x, y + h, oz + z, isCorner ? corner : wall);
    }
  }
  // door (front centre)
  const dc = w >> 1;
  set(ox + dc, y + 1, oz, BLOCK.AIR);
  set(ox + dc, y + 2, oz, BLOCK.AIR);
  // windows (glass) along walls at mid height
  const wy = y + 2;
  for (let x = 2; x < w - 2; x += 2) { set(ox + x, wy, oz, BLOCK.GLASS_PANE); set(ox + x, wy, oz + d - 1, BLOCK.GLASS_PANE); }
  for (let z = 2; z < d - 2; z += 2) { set(ox, wy, oz + z, BLOCK.GLASS_PANE); set(ox + w - 1, wy, oz + z, BLOCK.GLASS_PANE); }
  // flat plank roof + log trim
  const ry = y + wallH + 1;
  for (let x = -1; x <= w; x++) for (let z = -1; z <= d; z++) {
    const trim = x === -1 || x === w || z === -1 || z === d;
    set(ox + x, ry, oz + z, trim ? corner : BLOCK.PLANKS);
  }
  // interior: torch + maybe crafting/bed
  set(ox + 1, y + 1, oz + 1, rng() < 0.5 ? BLOCK.CRAFTING : BLOCK.BOOKSHELF);
  set(ox + dc, y + 3, oz + 1, BLOCK.TORCH);
  set(ox + w - 2, y + 1, oz + d - 2, BLOCK.BED);
}

function buildBlacksmith(set, ox, y, oz, world) {
  buildHouse(set, ox, y, oz, 9, 9, 5, BLOCK.COBBLESTONE, BLOCK.WOOD, ox * 7 + oz);
  // Forge: furnaces + lava-lit look using torches, and a loot chest.
  set(ox + 2, y + 1, oz + 2, BLOCK.FURNACE);
  set(ox + 3, y + 1, oz + 2, BLOCK.FURNACE);
  set(ox + 2, y + 2, oz + 2, BLOCK.TORCH);
  const chestX = ox + 6, chestY = y + 1, chestZ = oz + 6;
  set(chestX, chestY, chestZ, BLOCK.CHEST);
  // Fill loot (single-player / host authoritative).
  if (world && world.getOrCreateChest) {
    try {
      const inv = world.getOrCreateChest(chestX, chestY, chestZ);
      if (inv && !inv._filled) {
        const rng = makeRng(chestX * 31 + chestZ * 17);
        const loot = [
          { item: 259, min: 1, max: 4 },  // iron ingot
          { item: 264, min: 1, max: 3 },  // bread
          { item: 261, min: 0, max: 1 },  // diamond (rare)
          { item: 260, min: 0, max: 2 },  // gold ingot
        ];
        let slot = 0;
        for (const l of loot) {
          const count = l.min + Math.floor(rng() * (l.max - l.min + 1));
          if (count > 0) inv[slot++] = { item: l.item, count };
        }
        inv._filled = true;
      }
    } catch (_) {}
  }
}

function buildFarm(set, ox, y, oz) {
  const w = 9, d = 7;
  for (let x = 0; x < w; x++) for (let z = 0; z < d; z++) {
    const edge = x === 0 || x === w - 1 || z === 0 || z === d - 1;
    if (edge) {
      foundation(set, ox + x, y, oz + z, BLOCK.DIRT);
      set(ox + x, y + 1, oz + z, BLOCK.COBBLESTONE_WALL);
    } else if (z === (d >> 1)) {
      foundation(set, ox + x, y, oz + z, BLOCK.WATER);   // central irrigation row
    } else {
      foundation(set, ox + x, y, oz + z, BLOCK.DIRT);
      set(ox + x, y + 1, oz + z, BLOCK.FLOWER_YELLOW); // crop stand-in (no wheat block)
    }
  }
}

function buildLamp(set, ox, y, oz) {
  foundation(set, ox, y, oz, BLOCK.COBBLESTONE);
  for (let h = 1; h <= 4; h++) set(ox, y + h, oz, BLOCK.WOOD);
  set(ox, y + 5, oz, BLOCK.GLASS);
  set(ox, y + 6, oz, BLOCK.TORCH);
}
