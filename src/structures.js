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
const DESERT_BIOMES = new Set([BIOMES.DESERT]);
const JUNGLE_BIOMES = new Set([BIOMES.JUNGLE]);
const TEMPLE_REGION = 224;     // spacing between temple regions
const TEMPLE_CHANCE = 0.28;

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

  // Desert temples
  const txReach = 20;
  const txMinRX = Math.floor((baseX - txReach) / TEMPLE_REGION);
  const txMaxRX = Math.floor((baseX + CHUNK_SIZE + txReach) / TEMPLE_REGION);
  const txMinRZ = Math.floor((baseZ - txReach) / TEMPLE_REGION);
  const txMaxRZ = Math.floor((baseZ + CHUNK_SIZE + txReach) / TEMPLE_REGION);
  for (let rx = txMinRX; rx <= txMaxRX; rx++) {
    for (let rz = txMinRZ; rz <= txMaxRZ; rz++) {
      const t = getDesertTemple(rx, rz, noise, seed);
      if (t) placeDesertTemple(t, chunk, baseX, baseZ, world);
    }
  }
  // Jungle temples
  for (let rx = txMinRX; rx <= txMaxRX; rx++) {
    for (let rz = txMinRZ; rz <= txMaxRZ; rz++) {
      const t = getJungleTemple(rx, rz, noise, seed);
      if (t) placeJungleTemple(t, chunk, baseX, baseZ, world);
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
    foundation(set, ox + x, y, oz + z, edge ? BLOCK.COBBLESTONE : BLOCK.STONE);
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

function buildTower(set, ox, y, oz) {
  // Reference: abandoned stone watchtower with wooden pagoda roof
  // Wide stone base → tapered shaft → open observation deck → layered roof

  // --- Foundation (7×7) ---
  for (let dx = -3; dx <= 3; dx++) for (let dz = -3; dz <= 3; dz++) {
    foundation(set, ox + dx, y, oz + dz, BLOCK.COBBLESTONE);
  }

  // --- Base section (y+1 to y+3): solid stone with mossy accents ---
  for (let dy = 1; dy <= 3; dy++) {
    for (let dx = -3; dx <= 3; dx++) for (let dz = -3; dz <= 3; dz++) {
      const edge = Math.abs(dx) === 3 || Math.abs(dz) === 3;
      if (edge) {
        set(ox + dx, y + dy, oz + dz, dy === 1 ? BLOCK.COBBLESTONE : (dx + dz) % 3 === 0 ? BLOCK.MOSSY_COBBLESTONE : BLOCK.STONE);
      } else {
        set(ox + dx, y + dy, oz + dz, BLOCK.AIR);
      }
    }
  }
  // door
  set(ox, y + 1, oz - 3, BLOCK.AIR); set(ox, y + 2, oz - 3, BLOCK.AIR);

  // --- Shaft (y+4 to y+10): 5×5 walls with window gaps ---
  for (let dy = 4; dy <= 10; dy++) {
    for (let dx = -2; dx <= 2; dx++) for (let dz = -2; dz <= 2; dz++) {
      const edge = Math.abs(dx) === 2 || Math.abs(dz) === 2;
      if (edge) {
        // window gaps: small openings every 3 blocks
        const isWindow = dy >= 5 && dy <= 9 && (dx === 0 || dz === 0) && dy % 3 === 0 && (Math.abs(dx) === 2 || Math.abs(dz) === 2);
        set(ox + dx, y + dy, oz + dz,
          isWindow ? BLOCK.AIR :
          dy % 5 === 0 ? BLOCK.COBBLESTONE :
          (dx + dz + dy) % 4 === 0 ? BLOCK.MOSSY_COBBLESTONE : BLOCK.STONE);
      } else {
        set(ox + dx, y + dy, oz + dz, BLOCK.AIR);
      }
    }
  }

  // --- Observation deck platform (y+11): wider stone lip ---
  for (let dx = -3; dx <= 3; dx++) for (let dz = -3; dz <= 3; dz++) {
    const edge = Math.abs(dx) === 3 || Math.abs(dz) === 3;
    if (edge && Math.abs(dx) <= 3 && Math.abs(dz) <= 3) {
      set(ox + dx, y + 11, oz + dz, (dx + dz) % 2 === 0 ? BLOCK.COBBLESTONE : BLOCK.MOSSY_COBBLESTONE);
    } else if (!edge) {
      set(ox + dx, y + 11, oz + dz, BLOCK.PLANKS);
    }
  }

  // --- Pillars (y+12 to y+14): corner and mid-edge stone pillars ---
  const pillarPositions = [
    [-3,-3],[-3,0],[-3,3],[0,-3],[0,3],[3,-3],[3,0],[3,3]
  ];
  for (let dy = 12; dy <= 14; dy++) {
    for (const [px, pz] of pillarPositions) {
      set(ox + px, y + dy, oz + pz, dy === 14 ? BLOCK.COBBLESTONE : BLOCK.STONE);
    }
  }

  // Torches on pillars
  set(ox - 3, y + 13, oz, BLOCK.TORCH);
  set(ox + 3, y + 13, oz, BLOCK.TORCH);
  set(ox, y + 13, oz - 3, BLOCK.TORCH);
  set(ox, y + 13, oz + 3, BLOCK.TORCH);

  // --- Roof layer 1 (y+15): 9×9 plank overhang ---
  for (let dx = -4; dx <= 4; dx++) for (let dz = -4; dz <= 4; dz++) {
    if (Math.abs(dx) <= 3 && Math.abs(dz) <= 3) {
      set(ox + dx, y + 15, oz + dz, BLOCK.PLANKS);
    } else {
      // corner fill for the overhang
      set(ox + dx, y + 15, oz + dz, (dx + dz) % 2 === 0 ? BLOCK.PLANKS : BLOCK.WOOD);
    }
  }
  // Wood trim around roof layer 1
  for (let dx = -4; dx <= 4; dx++) {
    set(ox + dx, y + 15, oz - 4, BLOCK.WOOD);
    set(ox + dx, y + 15, oz + 4, BLOCK.WOOD);
  }
  for (let dz = -4; dz <= 4; dz++) {
    set(ox - 4, y + 15, oz + dz, BLOCK.WOOD);
    set(ox + 4, y + 15, oz + dz, BLOCK.WOOD);
  }

  // --- Roof layer 2 (y+16): 7×7, inset ---
  for (let dx = -3; dx <= 3; dx++) for (let dz = -3; dz <= 3; dz++) {
    set(ox + dx, y + 16, oz + dz, (dx + dz) % 2 === 0 ? BLOCK.PLANKS : BLOCK.WOOD);
  }
  // Wood trim
  for (let dx = -3; dx <= 3; dx++) {
    set(ox + dx, y + 16, oz - 3, BLOCK.WOOD);
    set(ox + dx, y + 16, oz + 3, BLOCK.WOOD);
  }
  for (let dz = -3; dz <= 3; dz++) {
    set(ox - 3, y + 16, oz + dz, BLOCK.WOOD);
    set(ox + 3, y + 16, oz + dz, BLOCK.WOOD);
  }

  // --- Roof peak (y+17): 3×3 cap ---
  for (let dx = -1; dx <= 1; dx++) for (let dz = -1; dz <= 1; dz++) {
    set(ox + dx, y + 17, oz + dz, BLOCK.PLANKS);
  }
  // Finial
  set(ox, y + 18, oz, BLOCK.WOOD);
  set(ox, y + 19, oz, BLOCK.TORCH);
}

function buildDesertTemple(set, ox, y, oz) {
  // Desert temple: 19×19 sandstone structure with central chamber, treasure room below
  const w = 19, d = 19;
  // Flatten + foundation
  for (let x = 0; x < w; x++) for (let z = 0; z < d; z++) {
    foundation(set, ox + x, y, oz + z, BLOCK.SANDSTONE);
  }
  // Floor
  for (let x = 0; x < w; x++) for (let z = 0; z < d; z++) {
    set(ox + x, y, oz + z, BLOCK.SANDSTONE);
  }
  // Walls (6 high)
  for (let h = 1; h <= 6; h++) {
    for (let x = 0; x < w; x++) for (let z = 0; z < d; z++) {
      const edge = x === 0 || x === w - 1 || z === 0 || z === d - 1;
      if (!edge) { set(ox + x, y + h, oz + z, BLOCK.AIR); continue; }
      // Chiseled sandstone pattern on walls
      const pattern = (x + z + h) % 3 === 0 ? BLOCK.TERRACOTTA : BLOCK.SANDSTONE;
      set(ox + x, y + h, oz + z, pattern);
    }
  }
  // Door openings (all 4 sides, 2 wide) — clear the perimeter wall, not the interior
  const mid = w >> 1;
  for (const [dx, dz] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
    for (let d = 0; d < 2; d++) {
      const bx = dx !== 0 ? (ox + (dx < 0 ? 0 : w - 1)) : (ox + mid + d);
      const bz = dz !== 0 ? (oz + (dz < 0 ? 0 : w - 1)) : (oz + mid + d);
      set(bx, y + 1, bz, BLOCK.AIR);
      set(bx, y + 2, bz, BLOCK.AIR);
    }
  }
  // Tiered roof
  const ry = y + 7;
  for (let x = -2; x <= w + 1; x++) for (let z = -2; z <= d + 1; z++) {
    const inset = Math.max(Math.abs(x - (w - 1) / 2), Math.abs(z - (d - 1) / 2));
    const roofH = inset > 8 ? 0 : inset > 6 ? 1 : inset > 4 ? 2 : 3;
    if (roofH > 0) set(ox + x, ry + roofH, oz + z, BLOCK.SANDSTONE);
  }
  // Central pillar (chiseled sandstone)
  const cx = ox + mid, cz = oz + mid;
  for (let h = 1; h <= 6; h++) set(cx, y + h, cz, BLOCK.SANDSTONE);
  // Torches on pillars
  for (const [dx, dz] of [[3, 3], [-4, 3], [3, -4], [-4, -4]]) {
    set(ox + mid + dx, y + 4, oz + mid + dz, BLOCK.TORCH);
  }
  // Treasure chamber below (dig down, place pressure plate + loot)
  for (let dx = -2; dx <= 2; dx++) for (let dz = -2; dz <= 2; dz++) {
    set(cx + dx, y - 1, cz + dz, BLOCK.SANDSTONE);
    set(cx + dx, y - 2, cz + dz, BLOCK.AIR);
    set(cx + dx, y - 3, cz + dz, BLOCK.SANDSTONE);
  }
  set(cx, y - 2, cz, BLOCK.STONE_PRESSURE_PLATE); // trigger
  // Four chests in treasure room
  set(cx - 2, y - 2, cz - 2, BLOCK.CHEST);
  set(cx + 2, y - 2, cz - 2, BLOCK.CHEST);
  set(cx - 2, y - 2, cz + 2, BLOCK.CHEST);
  set(cx + 2, y - 2, cz + 2, BLOCK.CHEST);
  // Lava beneath pressure plate (the trap)
  set(cx, y - 3, cz, BLOCK.LAVA);
}

function buildJungleTemple(set, ox, y, oz, world) {
  // Jungle temple: mossy cobblestone + vines, 15×15 with hidden treasure
  const w = 15, d = 15;
  for (let x = 0; x < w; x++) for (let z = 0; z < d; z++) {
    foundation(set, ox + x, y, oz + z, BLOCK.COBBLESTONE);
  }
  // Floor: mix of cobblestone and mossy cobblestone
  for (let x = 0; x < w; x++) for (let z = 0; z < d; z++) {
    set(ox + x, y, oz + z, (x + z) % 3 === 0 ? BLOCK.MOSSY_COBBLESTONE : BLOCK.COBBLESTONE);
  }
  // Walls (5 high)
  for (let h = 1; h <= 5; h++) {
    for (let x = 0; x < w; x++) for (let z = 0; z < d; z++) {
      const edge = x === 0 || x === w - 1 || z === 0 || z === d - 1;
      if (!edge) { set(ox + x, y + h, oz + z, BLOCK.AIR); continue; }
      const mat = h === 1 ? BLOCK.COBBLESTONE :
        ((x + z + h) % 4 === 0 ? BLOCK.MOSSY_COBBLESTONE : BLOCK.COBBLESTONE);
      set(ox + x, y + h, oz + z, mat);
    }
  }
  // Door opening
  const mid = w >> 1;
  set(ox + mid, y + 1, oz, BLOCK.AIR);
  set(ox + mid, y + 2, oz, BLOCK.AIR);
  // Windows: iron bars
  for (let x = 3; x < w - 3; x += 4) {
    set(ox + x, y + 3, oz, BLOCK.IRON_BARS);
    set(ox + x, y + 3, oz + d - 1, BLOCK.IRON_BARS);
  }
  // Triangular roof using stairs-like stepping
  for (let step = 0; step < 3; step++) {
    const ry = y + 6 + step;
    const inset = step;
    for (let x = -1 + inset; x < w - inset; x++) for (let z = -1 + inset; z < d - inset; z++) {
      const isEdge = x === -1 + inset || x === w - 1 - inset || z === -1 + inset || z === d - 1 - inset;
      if (isEdge) set(ox + x, ry, oz + z, BLOCK.MOSSY_COBBLESTONE);
    }
  }
  // Interior: torches + hidden treasure room below
  set(ox + 1, y + 3, oz + 1, BLOCK.TORCH);
  set(ox + w - 2, y + 3, oz + d - 2, BLOCK.TORCH);
  // Lever to open treasure room
  set(ox + 2, y + 2, oz + 2, BLOCK.LEVER);
  // Treasure room below
  for (let dx = -1; dx <= 1; dx++) for (let dz = -1; dz <= 1; dz++) {
    set(ox + mid + dx, y - 1, oz + mid + dz, BLOCK.COBBLESTONE);
    set(ox + mid + dx, y - 2, oz + mid + dz, BLOCK.AIR);
    set(ox + mid + dx, y - 3, oz + mid + dz, BLOCK.COBBLESTONE);
  }
  // Stairway down
  for (let i = 0; i < 3; i++) {
    set(ox + mid, y - 1 - i, oz + mid - 1, BLOCK.AIR);
    set(ox + mid, y - 2 - i, oz + mid - 1, BLOCK.COBBLESTONE);
  }
  // Loot chest
  set(ox + mid - 1, y - 2, oz + mid - 1, BLOCK.CHEST);
  set(ox + mid + 1, y - 2, oz + mid - 1, BLOCK.CHEST);
}

function getDesertTemple(rx, rz, noise, seed) {
  if (rnd(rx, rz, seed ^ 0xDE51) > TEMPLE_CHANCE) return null;
  const cx = rx * TEMPLE_REGION + Math.floor(rnd(rx, rz, seed ^ 0xD1A1) * TEMPLE_REGION);
  const cz = rz * TEMPLE_REGION + Math.floor(rnd(rx, rz, seed ^ 0xD2B2) * TEMPLE_REGION);
  const baseY = calcHeight(noise, cx, cz);
  if (baseY <= SEA_LEVEL) return null;
  if (!DESERT_BIOMES.has(calcBiome(noise, cx, cz, baseY))) return null;
  return { cx, cz, baseY };
}

function getJungleTemple(rx, rz, noise, seed) {
  if (rnd(rx, rz, seed ^ 0x7E51) > TEMPLE_CHANCE) return null;
  const cx = rx * TEMPLE_REGION + Math.floor(rnd(rx, rz, seed ^ 0x71A1) * TEMPLE_REGION);
  const cz = rz * TEMPLE_REGION + Math.floor(rnd(rx, rz, seed ^ 0x72B2) * TEMPLE_REGION);
  const baseY = calcHeight(noise, cx, cz);
  if (baseY <= SEA_LEVEL) return null;
  if (!JUNGLE_BIOMES.has(calcBiome(noise, cx, cz, baseY))) return null;
  return { cx, cz, baseY };
}

function placeDesertTemple(t, chunk, baseX, baseZ, world) {
  const set = (wx, wy, wz, b) => {
    if (wx < baseX || wx >= baseX + CHUNK_SIZE) return;
    if (wz < baseZ || wz >= baseZ + CHUNK_SIZE) return;
    if (wy < 0 || wy >= WORLD_HEIGHT) return;
    chunk.set(wx - baseX, wy, wz - baseZ, b);
  };
  buildDesertTemple(set, t.cx - 9, t.baseY, t.cz - 9);
}

function placeJungleTemple(t, chunk, baseX, baseZ, world) {
  const set = (wx, wy, wz, b) => {
    if (wx < baseX || wx >= baseX + CHUNK_SIZE) return;
    if (wz < baseZ || wz >= baseZ + CHUNK_SIZE) return;
    if (wy < 0 || wy >= WORLD_HEIGHT) return;
    chunk.set(wx - baseX, wy, wz - baseZ, b);
  };
  buildJungleTemple(set, t.cx - 7, t.baseY, t.cz - 7, world);
}

// Place a single structure at a world position (used by the dev tools).
// Returns a bounding box { minX, maxX, minZ, maxZ } for chunk refresh.
export function placeStructure(world, type, ox, oy, oz) {
  const set = (wx, wy, wz, b) => world.setBlock(wx, wy, wz, b);
  const seed = (ox * 31 + oz * 17) | 0;
  let bb = { minX: ox - 12, maxX: ox + 12, minZ: oz - 12, maxZ: oz + 12 };
  switch (type) {
    case 'house': buildHouse(set, ox, oy, oz, 7, 7, 4, BLOCK.PLANKS, BLOCK.WOOD, seed); break;
    case 'house_medium': case 'house2': buildHouse(set, ox, oy, oz, 9, 9, 5, BLOCK.PLANKS, BLOCK.WOOD, seed); break;
    case 'blacksmith': buildBlacksmith(set, ox, oy, oz, world); break;
    case 'well': buildWell(set, ox, oy, oz); break;
    case 'farm': buildFarm(set, ox, oy, oz); break;
    case 'lamp': buildLamp(set, ox, oy, oz); break;
    case 'tower': buildTower(set, ox, oy, oz); break;
    case 'desert_temple': case 'deserttemple': buildDesertTemple(set, ox, oy, oz); bb = { minX: ox - 12, maxX: ox + 12, minZ: oz - 12, maxZ: oz + 12 }; break;
    case 'jungle_temple': case 'jungletemple': buildJungleTemple(set, ox, oy, oz, world); bb = { minX: ox - 10, maxX: ox + 10, minZ: oz - 10, maxZ: oz + 10 }; break;
    case 'village': {
      buildWell(set, ox - 2, oy, oz - 2);
      buildHouse(set, ox - 14, oy, oz - 14, 7, 7, 4, BLOCK.PLANKS, BLOCK.WOOD, seed);
      buildHouse(set, ox + 8, oy, oz - 14, 9, 9, 5, BLOCK.PLANKS, BLOCK.WOOD, seed + 1);
      buildBlacksmith(set, ox + 10, oy, oz + 6, world);
      buildFarm(set, ox - 14, oy, oz + 8);
      buildLamp(set, ox + 4, oy, oz + 4);
      buildLamp(set, ox - 5, oy, oz + 4);
      // roads
      for (const [bx, bz] of [[-11, -11], [12, -10], [14, 10], [-11, 11]]) layPath(set, ox, oz, ox + bx, oz + bz, oy);
      bb = { minX: ox - 24, maxX: ox + 24, minZ: oz - 24, maxZ: oz + 24 };
      break;
    }
    default: return null;
  }
  return bb;
}

export const DEV_STRUCTURES = ['village', 'house', 'house_medium', 'blacksmith', 'well', 'farm', 'lamp', 'tower', 'desert_temple', 'jungle_temple'];
