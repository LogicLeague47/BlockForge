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
const ABANDONED_TOWER_REGION = 208;  // spacing between abandoned tower regions
const ABANDONED_TOWER_CHANCE = 0.22;
const MINESHAFT_REGION = 224;  // spacing between mineshaft regions
const MINESHAFT_CHANCE = 0.34;

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

  // Ruined portals (rare, spread apart)
  const rpReach = 12;
  const rpMinRX = Math.floor((baseX - rpReach) / RUINED_PORTAL_REGION);
  const rpMaxRX = Math.floor((baseX + CHUNK_SIZE + rpReach) / RUINED_PORTAL_REGION);
  const rpMinRZ = Math.floor((baseZ - rpReach) / RUINED_PORTAL_REGION);
  const rpMaxRZ = Math.floor((baseZ + CHUNK_SIZE + rpReach) / RUINED_PORTAL_REGION);
  for (let rx = rpMinRX; rx <= rpMaxRX; rx++) {
    for (let rz = rpMinRZ; rz <= rpMaxRZ; rz++) {
      const rp = getRuinedPortal(rx, rz, noise, seed);
      if (rp) {
        const set = (wx, wy, wz, b) => {
          if (wx < baseX || wx >= baseX + CHUNK_SIZE) return;
          if (wz < baseZ || wz >= baseZ + CHUNK_SIZE) return;
          if (wy < 0 || wy >= WORLD_HEIGHT) return;
          chunk.set(wx - baseX, wy, wz - baseZ, b);
        };
        buildRuinedPortal(set, rp.cx, rp.baseY, rp.cz, world);
      }
    }
  }

  // Abandoned towers (surface ruins, scattered)
  const atReach = 14;
  const atMinRX = Math.floor((baseX - atReach) / ABANDONED_TOWER_REGION);
  const atMaxRX = Math.floor((baseX + CHUNK_SIZE + atReach) / ABANDONED_TOWER_REGION);
  const atMinRZ = Math.floor((baseZ - atReach) / ABANDONED_TOWER_REGION);
  const atMaxRZ = Math.floor((baseZ + CHUNK_SIZE + atReach) / ABANDONED_TOWER_REGION);
  for (let rx = atMinRX; rx <= atMaxRX; rx++) {
    for (let rz = atMinRZ; rz <= atMaxRZ; rz++) {
      const at = getAbandonedTower(rx, rz, noise, seed);
      if (at) {
        const set = (wx, wy, wz, b) => {
          if (wx < baseX || wx >= baseX + CHUNK_SIZE) return;
          if (wz < baseZ || wz >= baseZ + CHUNK_SIZE) return;
          if (wy < 0 || wy >= WORLD_HEIGHT) return;
          chunk.set(wx - baseX, wy, wz - baseZ, b);
        };
        buildAbandonedTower(set, at.cx, at.baseY, at.cz, world, at.rng);
      }
    }
  }

  // Mineshafts (underground, any biome)
  const msReach = 32;
  const msMinRX = Math.floor((baseX - msReach) / MINESHAFT_REGION);
  const msMaxRX = Math.floor((baseX + CHUNK_SIZE + msReach) / MINESHAFT_REGION);
  const msMinRZ = Math.floor((baseZ - msReach) / MINESHAFT_REGION);
  const msMaxRZ = Math.floor((baseZ + CHUNK_SIZE + msReach) / MINESHAFT_REGION);
  for (let rx = msMinRX; rx <= msMaxRX; rx++) {
    for (let rz = msMinRZ; rz <= msMaxRZ; rz++) {
      const ms = getMineshaft(rx, rz, noise, seed);
      if (ms) {
        const set = (wx, wy, wz, b) => {
          if (wx < baseX || wx >= baseX + CHUNK_SIZE) return;
          if (wz < baseZ || wz >= baseZ + CHUNK_SIZE) return;
          if (wy < 0 || wy >= WORLD_HEIGHT) return;
          chunk.set(wx - baseX, wy, wz - baseZ, b);
        };
        buildMineshaft(set, ms.cx, ms.tunnelY, ms.cz, ms.surfY, world, ms.rng);
      }
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
  // Desert temple: grand 21×25 sandstone structure with twin towers, pillared hall, underground treasure vault
  const w = 21, d = 25;
  const mid = w >> 1;

  // ── Foundation ──
  for (let x = 0; x < w; x++) for (let z = 0; z < d; z++) {
    foundation(set, ox + x, y, oz + z, BLOCK.SANDSTONE);
  }

  // ── Floor: sandstone with terracotta band inlay ──
  for (let x = 0; x < w; x++) for (let z = 0; z < d; z++) {
    const borderX = x <= 1 || x >= w - 2;
    const borderZ = z <= 1 || z >= d - 2;
    set(ox + x, y, oz + z, (borderX || borderZ) ? BLOCK.TERRACOTTA : BLOCK.SANDSTONE);
  }

  // ── Walls (8 high): chiseled sandstone + terracotta band ──
  for (let h = 1; h <= 8; h++) {
    for (let x = 0; x < w; x++) for (let z = 0; z < d; z++) {
      const edge = x === 0 || x === w - 1 || z === 0 || z === d - 1;
      if (!edge) { set(ox + x, y + h, oz + z, BLOCK.AIR); continue; }
      const band = h === 1 || h === 5 || h === 8;
      const pattern = band ? BLOCK.TERRACOTTA : ((x + z + h) % 4 === 0 ? BLOCK.RED_SAND : BLOCK.SANDSTONE);
      set(ox + x, y + h, oz + z, pattern);
    }
  }

  // ── Front entrance: grand archway (3 wide, 3 tall) ──
  for (let dx = -1; dx <= 1; dx++) for (let h = 1; h <= 3; h++) {
    set(ox + mid + dx, y + h, oz, BLOCK.AIR);
  }
  // Entrance pillars (chiseled sandstone)
  for (let h = 1; h <= 3; h++) {
    set(ox + mid - 2, y + h, oz, BLOCK.TERRACOTTA);
    set(ox + mid + 2, y + h, oz, BLOCK.TERRACOTTA);
  }

  // ── Side doors (2 wide) ──
  for (const side of [-1, 1]) {
    const sx = side === -1 ? 0 : w - 1;
    for (let dz = -1; dz <= 0; dz++) {
      set(ox + sx, y + 1, oz + (d >> 1) + dz, BLOCK.AIR);
      set(ox + sx, y + 2, oz + (d >> 1) + dz, BLOCK.AIR);
    }
  }

  // ── Back door ──
  for (let dx = -1; dx <= 0; dx++) {
    set(ox + mid + dx, y + 1, oz + d - 1, BLOCK.AIR);
    set(ox + mid + dx, y + 2, oz + d - 1, BLOCK.AIR);
  }

  // ── Interior: four pillars along the hall ──
  const pillarPositions = [[3, 5], [w - 4, 5], [3, d - 6], [w - 4, d - 6]];
  for (const [px, pz] of pillarPositions) {
    for (let h = 1; h <= 7; h++) {
      set(ox + px, y + h, oz + pz, h % 2 === 0 ? BLOCK.TERRACOTTA : BLOCK.SANDSTONE);
    }
    set(ox + px, y + 7, oz + pz, BLOCK.SANDSTONE); // pillar cap
  }

  // ── Central nave ceiling: vaulted arches ──
  for (let z = 3; z <= d - 4; z++) {
    for (let dx = -1; dx <= 1; dx++) {
      set(ox + mid + dx, y + 8, oz + z, BLOCK.SANDSTONE);
    }
  }

  // ── Tiered tower roofs on front corners ──
  for (const towerX of [0, w - 1]) {
    const tz = -2;
    for (let step = 0; step < 4; step++) {
      const ry = y + 9 + step;
      const inset = step;
      for (let dx = -1 - inset; dx <= 1 + inset; dx++) {
        for (let dz = -1 - inset; dz <= 1 + inset; dz++) {
          const edge = Math.abs(dx) === 1 + inset || Math.abs(dz) === 1 + inset;
          if (edge) set(ox + towerX + dx, ry, oz + tz + dz, BLOCK.SANDSTONE);
        }
      }
    }
  }

  // ── Tiered main roof ──
  for (let step = 0; step < 3; step++) {
    const ry = y + 9 + step;
    const inset = step * 2;
    for (let x = inset; x < w - inset; x++) for (let z = inset; z < d - inset; z++) {
      const edge = x === inset || x === w - 1 - inset || z === inset || z === d - 1 - inset;
      if (edge) set(ox + x, ry, oz + z, step % 2 === 0 ? BLOCK.TERRACOTTA : BLOCK.SANDSTONE);
    }
  }

  // ── Torches: wall-mounted along hall ──
  for (const tz of [3, 8, 13, 18]) {
    set(ox + 1, y + 4, oz + tz, BLOCK.TORCH);
    set(ox + w - 2, y + 4, oz + tz, BLOCK.TORCH);
  }

  // ── Interior furnishings: furnaces + crafting along back wall ──
  set(ox + 2, y + 1, oz + d - 3, BLOCK.FURNACE);
  set(ox + 3, y + 1, oz + d - 3, BLOCK.FURNACE);
  set(ox + w - 3, y + 1, oz + d - 3, BLOCK.CRAFTING);
  set(ox + 2, y + 2, oz + d - 3, BLOCK.TORCH);

  // ── Stairway to treasure vault (center of hall) ──
  const cx = ox + mid, cz = oz + mid;
  for (let i = 0; i < 4; i++) {
    set(cx, y - 1 - i, cz + i, BLOCK.AIR);
    set(cx, y - 2 - i, cz + i, BLOCK.SANDSTONE);
  }
  // Open vault entrance
  set(cx, y - 1, cz, BLOCK.AIR);

  // ── Treasure vault below (7×7) ──
  for (let dx = -3; dx <= 3; dx++) for (let dz = -3; dz <= 3; dz++) {
    set(cx + dx, y - 5, cz + dz, BLOCK.SANDSTONE); // floor
    set(cx + dx, y - 6, cz + dz, BLOCK.TERRACOTTA); // decorative base
    for (let h = -4; h <= -1; h++) {
      const vEdge = Math.abs(dx) === 3 || Math.abs(dz) === 3;
      set(cx + dx, y + h, cz + dz, vEdge ? BLOCK.SANDSTONE : BLOCK.AIR);
    }
  }

  // ── Pressure plate trap in vault center ──
  set(cx, y - 4, cz, BLOCK.STONE_PRESSURE_PLATE);
  set(cx, y - 6, cz, BLOCK.LAVA); // lava beneath trap

  // ── Loot chests in vault corners + sides ──
  set(cx - 2, y - 4, cz - 3, BLOCK.CHEST);
  set(cx + 2, y - 4, cz - 3, BLOCK.CHEST);
  set(cx - 2, y - 4, cz + 3, BLOCK.CHEST);
  set(cx + 2, y - 4, cz + 3, BLOCK.CHEST);
  set(cx - 3, y - 4, cz, BLOCK.CHEST);
  set(cx + 3, y - 4, cz, BLOCK.CHEST);

  // ── Vault torches ──
  set(cx - 3, y - 3, cz - 3, BLOCK.TORCH);
  set(cx + 3, y - 3, cz - 3, BLOCK.TORCH);
  set(cx - 3, y - 3, cz + 3, BLOCK.TORCH);
  set(cx + 3, y - 3, cz + 3, BLOCK.TORCH);
}

function buildJungleTemple(set, ox, y, oz, world) {
  // Jungle temple: mossy cobblestone + stone bricks, 17×19 with two levels, hidden treasure room
  const w = 17, d = 19;
  const mid = w >> 1;

  // ── Foundation ──
  for (let x = 0; x < w; x++) for (let z = 0; z < d; z++) {
    foundation(set, ox + x, y, oz + z, BLOCK.COBBLESTONE);
  }

  // ── Ground floor: cobblestone/mossy mix with stone brick accents ──
  for (let x = 0; x < w; x++) for (let z = 0; z < d; z++) {
    const checker = (x + z) % 2 === 0;
    const border = x <= 1 || x >= w - 2 || z <= 1 || z >= d - 2;
    set(ox + x, y, oz + z, border ? BLOCK.STONE_BRICKS : (checker ? BLOCK.COBBLESTONE : BLOCK.MOSSY_COBBLESTONE));
  }

  // ── Walls (7 high): mossy cobblestone base, stone brick upper ──
  for (let h = 1; h <= 7; h++) {
    for (let x = 0; x < w; x++) for (let z = 0; z < d; z++) {
      const edge = x === 0 || x === w - 1 || z === 0 || z === d - 1;
      if (!edge) { set(ox + x, y + h, oz + z, BLOCK.AIR); continue; }
      const mat = h <= 3
        ? ((x + z + h) % 3 === 0 ? BLOCK.MOSSY_COBBLESTONE : BLOCK.COBBLESTONE)
        : ((x + z + h) % 3 === 0 ? BLOCK.STONE_BRICKS : BLOCK.COBBLESTONE);
      set(ox + x, y + h, oz + z, mat);
    }
  }

  // ── Front entrance: 3-wide arch ──
  for (let dx = -1; dx <= 1; dx++) {
    for (let h = 1; h <= 3; h++) set(ox + mid + dx, y + h, oz, BLOCK.AIR);
  }
  // Arch header
  set(ox + mid - 2, y + 3, oz, BLOCK.STONE_BRICKS);
  set(ox + mid + 2, y + 3, oz, BLOCK.STONE_BRICKS);
  set(ox + mid - 2, y + 4, oz, BLOCK.STONE_BRICKS);
  set(ox + mid + 2, y + 4, oz, BLOCK.STONE_BRICKS);

  // ── Side entrances ──
  for (const side of [-1, 1]) {
    const sx = side === -1 ? 0 : w - 1;
    for (let h = 1; h <= 2; h++) set(ox + sx, y + h, oz + mid, BLOCK.AIR);
    set(ox + sx, y + 3, oz + mid, BLOCK.AIR);
  }

  // ── Back entrance ──
  for (let dx = -1; dx <= 0; dx++) {
    set(ox + mid + dx, y + 1, oz + d - 1, BLOCK.AIR);
    set(ox + mid + dx, y + 2, oz + d - 1, BLOCK.AIR);
  }

  // ── Windows: iron bars on all sides ──
  for (const wz of [4, 8, 12]) {
    set(ox + 1, y + 4, oz + wz, BLOCK.IRON_BARS);
    set(ox + w - 2, y + 4, oz + wz, BLOCK.IRON_BARS);
  }
  for (const wx of [4, 8, 12]) {
    set(ox + wx, y + 4, oz + 1, BLOCK.IRON_BARS);
    set(ox + wx, y + 4, oz + d - 2, BLOCK.IRON_BARS);
  }

  // ── Ground floor pillars (mossy cobblestone) ──
  const pillarPos = [[3, 4], [w - 4, 4], [3, d - 5], [w - 4, d - 5]];
  for (const [px, pz] of pillarPos) {
    for (let h = 1; h <= 6; h++) {
      set(ox + px, y + h, oz + pz, h < 3 ? BLOCK.COBBLESTONE : BLOCK.MOSSY_COBBLESTONE);
    }
    set(ox + px, y + 7, oz + pz, BLOCK.STONE_BRICKS);
  }

  // ── Upper floor/ceiling (stone brick platform over back half) ──
  for (let x = 2; x < w - 2; x++) for (let z = mid + 1; z < d - 2; z++) {
    set(ox + x, y + 4, oz + z, BLOCK.STONE_BRICKS);
  }

  // ── Stairway to upper level ──
  for (let i = 0; i < 3; i++) {
    set(ox + w - 3, y + 5 + i, oz + mid + 1 + i, BLOCK.STONE_BRICKS);
    set(ox + w - 4, y + 5 + i, oz + mid + 1 + i, BLOCK.STONE_BRICKS);
  }

  // ── Upper level: more chests + greenstone torches ──
  set(ox + 3, y + 5, oz + d - 4, BLOCK.CHEST);
  set(ox + 4, y + 5, oz + d - 4, BLOCK.CHEST);
  set(ox + 3, y + 5, oz + d - 3, BLOCK.GREENSTONE_TORCH);
  set(ox + w - 4, y + 5, oz + d - 4, BLOCK.LEVER);

  // ── Triangular mossy roof ──
  for (let step = 0; step < 4; step++) {
    const ry = y + 8 + step;
    for (let x = step; x < w - step; x++) for (let z = step; z < d - step; z++) {
      const edge = x === step || x === w - 1 - step || z === step || z === d - 1 - step;
      if (edge) set(ox + x, ry, oz + z, step % 2 === 0 ? BLOCK.MOSSY_COBBLESTONE : BLOCK.STONE_BRICKS);
    }
  }

  // ── Ground floor furnishings ──
  // Left side: furnaces + crafting
  set(ox + 2, y + 1, oz + 2, BLOCK.FURNACE);
  set(ox + 3, y + 1, oz + 2, BLOCK.FURNACE);
  set(ox + 2, y + 1, oz + 3, BLOCK.CRAFTING);
  set(ox + 2, y + 2, oz + 2, BLOCK.TORCH);

  // Right side: chests
  set(ox + w - 3, y + 1, oz + 2, BLOCK.CHEST);
  set(ox + w - 3, y + 1, oz + 3, BLOCK.CHEST);

  // ── Ground floor torches ──
  set(ox + 1, y + 4, oz + 3, BLOCK.GREENSTONE_TORCH);
  set(ox + w - 2, y + 4, oz + 3, BLOCK.GREENSTONE_TORCH);
  set(ox + 1, y + 4, oz + d - 4, BLOCK.GREENSTONE_TORCH);
  set(ox + w - 2, y + 4, oz + d - 4, BLOCK.GREENSTONE_TORCH);

  // ── Hidden treasure room below (accessible via stairway) ──
  const cz = oz + mid;
  // Stairway down from center of ground floor
  for (let i = 0; i < 4; i++) {
    set(ox + mid, y - 1 - i, cz - 2 + i, BLOCK.AIR);
    set(ox + mid, y - 2 - i, cz - 2 + i, BLOCK.COBBLESTONE);
  }

  // ── Treasure room (5×5) ──
  for (let dx = -2; dx <= 2; dx++) for (let dz = -2; dz <= 2; dz++) {
    set(ox + mid + dx, y - 5, cz + dz, BLOCK.MOSSY_COBBLESTONE); // floor
    for (let h = -4; h <= -1; h++) {
      const vEdge = Math.abs(dx) === 2 || Math.abs(dz) === 2;
      set(ox + mid + dx, y + h, cz + dz, vEdge ? BLOCK.COBBLESTONE : BLOCK.AIR);
    }
  }

  // ── Treasure chests (6 total) ──
  set(ox + mid - 1, y - 4, cz - 2, BLOCK.CHEST);
  set(ox + mid + 1, y - 4, cz - 2, BLOCK.CHEST);
  set(ox + mid - 1, y - 4, cz + 2, BLOCK.CHEST);
  set(ox + mid + 1, y - 4, cz + 2, BLOCK.CHEST);
  set(ox + mid - 2, y - 4, cz, BLOCK.CHEST);
  set(ox + mid + 2, y - 4, cz, BLOCK.CHEST);

  // ── Treasure room torches ──
  set(ox + mid - 2, y - 3, cz - 2, BLOCK.GREENSTONE_TORCH);
  set(ox + mid + 2, y - 3, cz - 2, BLOCK.GREENSTONE_TORCH);
  set(ox + mid - 2, y - 3, cz + 2, BLOCK.GREENSTONE_TORCH);
  set(ox + mid + 2, y - 3, cz + 2, BLOCK.GREENSTONE_TORCH);

  // ── Vine decorations on exterior walls ──
  for (const vz of [3, 7, 11, 15]) {
    for (let h = 2; h <= 5; h++) {
      set(ox - 1, y + h, oz + vz, BLOCK.AIR); // clear air for vines
    }
  }
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
  buildDesertTemple(set, t.cx - 10, t.baseY, t.cz - 12);
}

function placeJungleTemple(t, chunk, baseX, baseZ, world) {
  const set = (wx, wy, wz, b) => {
    if (wx < baseX || wx >= baseX + CHUNK_SIZE) return;
    if (wz < baseZ || wz >= baseZ + CHUNK_SIZE) return;
    if (wy < 0 || wy >= WORLD_HEIGHT) return;
    chunk.set(wx - baseX, wy, wz - baseZ, b);
  };
  buildJungleTemple(set, t.cx - 8, t.baseY, t.cz - 9, world);
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
    case 'boss_arena': {
      buildBossArena(set, ox, oy, oz);
      bb = { minX: ox - 20, maxX: ox + 20, minZ: oz - 20, maxZ: oz + 20 };
      break;
    }
    case 'ruined_portal': {
      buildRuinedPortal(set, ox, oy, oz, world);
      bb = { minX: ox - 6, maxX: ox + 6, minZ: oz - 6, maxZ: oz + 6 };
      break;
    }
    case 'abandoned_tower': case 'tower_ruin': {
      buildAbandonedTower(set, ox, oy, oz, world, makeRng(ox * 31 + oz * 17));
      bb = { minX: ox - 8, maxX: ox + 8, minZ: oz - 8, maxZ: oz + 8 };
      break;
    }
    case 'mineshaft': {
      const surf = Math.max(oy + 4, 4 + 3);
      buildMineshaft(set, ox, Math.max(4 + 2, oy - 12), oz, surf, world, makeRng(ox * 31 + oz * 17));
      bb = { minX: ox - 26, maxX: ox + 26, minZ: oz - 26, maxZ: oz + 26 };
      break;
    }
    default: return null;
  }
  return bb;
}

export const DEV_STRUCTURES = ['village', 'house', 'house_medium', 'blacksmith', 'well', 'farm', 'lamp', 'tower', 'desert_temple', 'jungle_temple', 'boss_arena', 'ruined_portal', 'abandoned_tower', 'mineshaft'];

function buildBossArena(set, ox, y, oz) {
  // Massive obsidian boss arena: 32x32 floor, 20-high walls, obsidian pillars
  const R = 15;
  // Floor: obsidian
  for (let dx = -R; dx <= R; dx++) for (let dz = -R; dz <= R; dz++) {
    const dist = Math.sqrt(dx * dx + dz * dz);
    if (dist <= R) set(ox + dx, y, oz + dz, BLOCK.OBSIDIAN);
  }
  // Walls: 20 high ring
  for (let dy = 1; dy <= 20; dy++) {
    for (let dx = -R; dx <= R; dx++) for (let dz = -R; dz <= R; dz++) {
      const dist = Math.sqrt(dx * dx + dz * dz);
      if (dist > R - 1 && dist <= R + 0.5) {
        set(ox + dx, y + dy, oz + dz, BLOCK.OBSIDIAN);
      } else {
        set(ox + dx, y + dy, oz + dz, BLOCK.AIR);
      }
    }
  }
  // Corner pillars (taller)
  for (const [sx, sz] of [[-R, -R], [R, -R], [-R, R], [R, R]]) {
    for (let dy = 1; dy <= 25; dy++) {
      set(ox + sx, y + dy, oz + sz, BLOCK.OBSIDIAN);
      set(ox + sx + 1, y + dy, oz + sz, BLOCK.OBSIDIAN);
      set(ox + sx, y + dy, oz + sz + 1, BLOCK.OBSIDIAN);
      set(ox + sx + 1, y + dy, oz + sz + 1, BLOCK.OBSIDIAN);
    }
  }
  // Lava moat in center
  for (let dx = -3; dx <= 3; dx++) for (let dz = -3; dz <= 3; dz++) {
    if (Math.abs(dx) === 3 || Math.abs(dz) === 3) {
      set(ox + dx, y, oz + dz, BLOCK.LAVA);
    }
  }
  // Entrance arch
  for (let dy = 1; dy <= 6; dy++) {
    set(ox, y + dy, oz - R, BLOCK.AIR);
    set(ox + 1, y + dy, oz - R, BLOCK.AIR);
    set(ox - 1, y + dy, oz - R, BLOCK.AIR);
  }
}

// Ruined portal structure: a cracked obsidian/compressed voidstone frame
// with scattered blocks and a loot chest containing echo shards.
const RUINED_PORTAL_REGION = 288;
const RUINED_PORTAL_CHANCE = 0.18;

function getRuinedPortal(rx, rz, noise, seed) {
  if (rnd(rx, rz, seed ^ 0xCAF) > RUINED_PORTAL_CHANCE) return null;
  const cx = rx * RUINED_PORTAL_REGION + 40 + Math.floor(rnd(rx, rz, seed ^ 0xBEEF) * (RUINED_PORTAL_REGION - 80));
  const cz = rz * RUINED_PORTAL_REGION + 40 + Math.floor(rnd(rx, rz, seed ^ 0xDEAD) * (RUINED_PORTAL_REGION - 80));
  const baseY = calcHeight(noise, cx, cz);
  if (baseY <= SEA_LEVEL + 1) return null;
  const rng = makeRng((rx * 918273) ^ (rz * 483920) ^ seed);
  return { cx, cz, baseY, rng };
}

function buildRuinedPortal(set, ox, y, oz, world) {
  const rng = makeRng(ox * 31 + oz * 17);
  // Base platform: a 7x7 of netherrack + cobblestone mixed
  for (let dx = -3; dx <= 3; dx++) {
    for (let dz = -3; dz <= 3; dz++) {
      const dist = Math.sqrt(dx * dx + dz * dz);
      if (dist <= 3.5) {
        const b = rng() < 0.4 ? BLOCK.NETHERRACK : (rng() < 0.5 ? BLOCK.COBBLESTONE : BLOCK.MOSSY_COBBLESTONE);
        set(ox + dx, y, oz + dz, b);
      }
    }
  }
  // Portal frame: 4 wide, 5 tall (Nether-style). Kept complete and lit so it's
  // a working gateway into the Shattered Echo dimension, discoverable in the wild.
  const frameMat = () => (rng() < 0.5 ? BLOCK.OBSIDIAN : BLOCK.COMPRESSED_VOIDSTONE);
  // Bottom row (frame base)
  for (let dx = -1; dx <= 2; dx++) set(ox + dx, y + 1, oz, frameMat());
  // Left & right pillars
  for (let dy = 2; dy <= 4; dy++) {
    set(ox - 1, y + dy, oz, frameMat());
    set(ox + 2, y + dy, oz, frameMat());
  }
  // Top row
  for (let dx = -1; dx <= 2; dx++) set(ox + dx, y + 5, oz, frameMat());
  // Lit 2x3 interior — stepping through warps to the dimension
  for (let dy = 2; dy <= 4; dy++) {
    set(ox, y + dy, oz, BLOCK.VOID_PORTAL);
    set(ox + 1, y + dy, oz, BLOCK.VOID_PORTAL);
  }
  // Scattered debris around the portal
  const debris = [
    [-2, 1, -1, BLOCK.NETHERRACK], [3, 1, 0, BLOCK.OBSIDIAN],
    [-1, 1, 2, BLOCK.MOSSY_COBBLESTONE], [2, 1, -2, BLOCK.COMPRESSED_VOIDSTONE],
    [0, 1, -3, BLOCK.NETHERRACK], [1, 1, 3, BLOCK.COBBLESTONE],
    [-3, 1, 1, BLOCK.OBSIDIAN], [3, 1, 2, BLOCK.NETHERRACK],
  ];
  for (const [dx, dy, dz, b] of debris) {
    if (rng() < 0.3) continue;
    set(ox + dx, y + dy, oz + dz, b);
  }
  // Lava puddle nearby
  for (let dx = -1; dx <= 1; dx++) {
    for (let dz = -1; dz <= 1; dz++) {
      if (rng() < 0.35) set(ox + 5 + dx, y, oz + dz, BLOCK.LAVA);
    }
  }
  // Loot chest
  const chestX = ox - 2, chestY = y + 1, chestZ = oz + 2;
  set(chestX, chestY, chestZ, BLOCK.CHEST);
  if (world && world.getOrCreateChest) {
    try {
      const inv = world.getOrCreateChest(chestX, chestY, chestZ);
      if (inv && !inv._filled) {
        const loot = [
          { item: 710, min: 1, max: 5 },   // Echo Shard
          { item: 700, min: 2, max: 4 },   // Null Shard
          { item: 259, min: 0, max: 2 },   // Iron Ingot
          { item: 260, min: 0, max: 1 },   // Gold Ingot
          { item: 109, min: 0, max: 1 },   // Compressed Voidstone (rare)
          { item: 702, min: 0, max: 1 },   // Paradox Core (very rare)
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

// Abandoned tower: a ruined stone keep, partially collapsed, with a ladder
// climb to a loot room in the broken crown. Deterministic per region.
const ABANDONED_TOWER_MEX = 0x5F5F;

function getAbandonedTower(rx, rz, noise, seed) {
  if (rnd(rx, rz, seed ^ 0x70FE) > ABANDONED_TOWER_CHANCE) return null;
  const cx = rx * ABANDONED_TOWER_REGION + 32 + Math.floor(rnd(rx, rz, seed ^ 0x71FA) * (ABANDONED_TOWER_REGION - 64));
  const cz = rz * ABANDONED_TOWER_REGION + 32 + Math.floor(rnd(rx, rz, seed ^ 0x72FB) * (ABANDONED_TOWER_REGION - 64));
  const baseY = calcHeight(noise, cx, cz);
  if (baseY <= SEA_LEVEL + 1) return null;
  const rng = makeRng((rx * 1122337) ^ (rz * 5566337) ^ seed);
  return { cx, cz, baseY, rng };
}

function buildAbandonedTower(set, ox, y, oz, world, rng) {
  // Footprint: 7x7 cobble base flattened onto terrain.
  for (let dx = -3; dx <= 3; dx++) {
    for (let dz = -3; dz <= 3; dz++) {
      foundation(set, ox + dx, y, oz + dz, BLOCK.COBBLESTONE);
    }
  }

  // Walls: hollow 7x7, up to H tall. Ruin factor grows with height — upper
  // levels crumble into gaps and whole missing sections.
  const H = Math.min(13, WORLD_HEIGHT - 4 - y, 8 + Math.floor(rng() * 6));
  const collapseSide = Math.floor(rng() * 4);   // which wall mostly collapsed
  for (let h = 1; h <= H; h++) {
    for (let dx = -3; dx <= 3; dx++) {
      for (let dz = -3; dz <= 3; dz++) {
        const edge = Math.abs(dx) === 3 || Math.abs(dz) === 3;
        if (!edge) { set(ox + dx, y + h, oz + dz, BLOCK.AIR); continue; }
        // Which wall segment this block belongs to.
        const wall = dx === -3 ? 0 : dx === 3 ? 1 : dz === -3 ? 2 : 3;
        const corner = Math.abs(dx) === 3 && Math.abs(dz) === 3;
        if (corner) {
          // Corner columns always stay (structural skeleton).
          set(ox + dx, y + h, oz + dz, BLOCK.COBBLESTONE);
          continue;
        }
        if (wall === collapseSide && h > H >> 1) {
          // Fully collapsed face up top.
          set(ox + dx, y + h, oz + dz, BLOCK.AIR);
          continue;
        }
        // Progressively more ruin as we climb.
        const ruin = h > H - 3 ? 0.55 : h > H >> 1 ? 0.3 : 0.12;
        if (rng() < ruin) { set(ox + dx, y + h, oz + dz, BLOCK.AIR); continue; }
        // Windows gaps on non-collapsed faces.
        const onMid = dx === 0 || dz === 0;
        const isWindow = onMid && h % 3 === 0 && rng() < 0.4;
        const material = rng() < 0.35 ? BLOCK.MOSSY_COBBLESTONE : BLOCK.COBBLESTONE;
        set(ox + dx, y + h, oz + dz, isWindow ? BLOCK.AIR : material);
      }
    }
  }

  // Interior floors: plank platforms splitting the shaft + ladder up one wall.
  const doorWall = collapseSide !== 0 ? 0 : 1;
  // Door gap at the base (whatever wall survived).
  {
    const gx = doorWall === 0 ? -3 : doorWall === 1 ? 3 : 0;
    const gz = doorWall === 3 ? -3 : doorWall === 2 ? 3 : 0;
    if (gx !== 0 || gz !== 0) {
      set(ox + gx, y + 1, oz + gz, BLOCK.AIR);
      set(ox + gx, y + 2, oz + gz, BLOCK.AIR);
    }
  }
  const ladderWall = collapseSide === 0 ? 1 : 0;   // opposite the door
  // Ladder up one inner wall to the crown; plank platforms every 4 blocks.
  for (let h = 1; h <= H; h++) {
    set(ox + (ladderWall === 0 ? -2 : 2), y + h, oz, BLOCK.LADDER);
    if (h % 4 === 0 && h < H - 1) {
      for (let dx = -2; dx <= 2; dx++) {
        for (let dz = -2; dz <= 2; dz++) {
          if (ladderWall === 0 && dx === -2) continue;
          if (ladderWall === 1 && dx === 2) continue;
          set(ox + dx, y + h, oz + dz, BLOCK.PLANKS);
        }
      }
    }
  }
  // Crown floor: planks across the top room (ladder column left open).
  for (let dx = -2; dx <= 2; dx++) {
    for (let dz = -2; dz <= 2; dz++) {
      if (ladderWall === 0 && dx === -2) continue;
      if (ladderWall === 1 && dx === 2) continue;
      set(ox + dx, y + H - 1, oz + dz, BLOCK.PLANKS);
    }
  }

  // Broken crown: jagged battlements along whatever walls survived.
  for (let dx = -3; dx <= 3; dx++) {
    for (let dz = -3; dz <= 3; dz++) {
      if (Math.abs(dx) === 3 || Math.abs(dz) === 3) {
        if (rng() < 0.45) set(ox + dx, y + H + 1, oz + dz, BLOCK.COBBLESTONE);
        else if (rng() < 0.2) set(ox + dx, y + H + 1, oz + dz, BLOCK.MOSSY_COBBLESTONE);
        else set(ox + dx, y + H + 1, oz + dz, BLOCK.AIR);
      }
    }
  }

  // Rubble scatter around the base.
  for (let i = 0; i < 8; i++) {
    const rx0 = -5 + Math.floor(rng() * 11);
    const rz0 = -5 + Math.floor(rng() * 11);
    if (Math.abs(rx0) <= 3 && Math.abs(rz0) <= 3) continue;
    set(ox + rx0, y, oz + rz0, rng() < 0.5 ? BLOCK.COBBLESTONE : BLOCK.MOSSY_COBBLESTONE);
  }

  // Torch in the crown room, loot chest up top.
  set(ox, y + H, oz, BLOCK.TORCH);
  const cxs = collapseSide === 0 ? 2 : collapseSide === 1 ? -2 : collapseSide === 2 ? rng() < 0.5 ? 2 : -2 : 0;
  const czs = collapseSide === 3 ? -2 : collapseSide === 2 ? 2 : rng() < 0.5 ? 2 : -2;
  addLootChest(world, set, ox + cxs, y + H - 1, oz + czs, rng, [
    { item: 259, min: 1, max: 3 },   // Iron Ingot
    { item: 260, min: 0, max: 2 },   // Gold Ingot
    { item: 261, min: 0, max: 1 },   // Diamond (rare)
    { item: 305, min: 0, max: 2 },   // Emerald
    { item: 264, min: 0, max: 2 },   // Bread
    { item: 314, min: 0, max: 3 },   // GREENSTONE dust
    { item: 541, min: 0, max: 1 },   // Iron Chestplate (rare)
    { item: 516, min: 0, max: 1 },   // Stone Pickaxe
  ]);
}

// Mineshaft: a ruined abandoned mine. A vertical ladder shaft drops from the
// surface into a network of carved tunnels with wooden supports, a flooded
// pit, cobble-blocked dead ends and loot chests. Any biome, underground.
const MINESHAFT_MIN_Y = 12;

function getMineshaft(rx, rz, noise, seed) {
  if (rnd(rx, rz, seed ^ 0x5A17) > MINESHAFT_CHANCE) return null;
  const cx = rx * MINESHAFT_REGION + 24 + Math.floor(rnd(rx, rz, seed ^ 0xA1A2) * (MINESHAFT_REGION - 48));
  const cz = rz * MINESHAFT_REGION + 24 + Math.floor(rnd(rx, rz, seed ^ 0xB3B4) * (MINESHAFT_REGION - 48));
  const surfY = calcHeight(noise, cx, cz);
  if (surfY < SEA_LEVEL + 4) return null;
  const rng = makeRng((rx * 77171737) ^ (rz * 66554321) ^ seed);
  const tunnelY = Math.max(MINESHAFT_MIN_Y, surfY - (9 + Math.floor(rng() * 11)));
  return { cx, cz, surfY, tunnelY, rng };
}

// Carve a 1-wide, tunnel-h-tall passage between (x0,z0) and (x1,z1) (axis
// aligned) with a plank floor and occasional wooden support posts.
function carveMineTunnel(set, x0, z0, x1, z1, y, rng) {
  const dx = Math.sign(x1 - x0), dz = Math.sign(z1 - z0);
  let x = x0, z = z0, i = 0;
  while (true) {
    for (let dy = 0; dy < 2; dy++) set(x, y + dy, z, BLOCK.AIR);
    set(x, y - 1, z, BLOCK.PLANKS);
    // Support posts embedded in the side walls every 4 blocks, torch every 8.
    if (i % 4 === 0) {
      if (dz === 0) { // corridor runs along X
        set(x, y, z - 1, BLOCK.PLANKS); set(x, y + 1, z - 1, BLOCK.PLANKS);
        set(x, y, z + 1, BLOCK.PLANKS); set(x, y + 1, z + 1, BLOCK.PLANKS);
        if (i % 8 === 0) set(x, y + 1, z - 1, BLOCK.TORCH);
      } else {        // corridor runs along Z
        set(x - 1, y, z, BLOCK.PLANKS); set(x - 1, y + 1, z, BLOCK.PLANKS);
        set(x + 1, y, z, BLOCK.PLANKS); set(x + 1, y + 1, z, BLOCK.PLANKS);
        if (i % 8 === 0) set(x - 1, y + 1, z, BLOCK.TORCH);
      }
    }
    if (x === x1 && z === z1) break;
    x += dx; z += dz; i++;
  }
}

// A flooded pit: carve down the floor at one spot and fill it with water.
function carveWaterPit(set, x, y, z, dx, dz) {
  for (let gx = 0; gx <= dx; gx++) {
    for (let gz = 0; gz <= dz; gz++) {
      set(x + gx, y, z + gz, BLOCK.AIR);
      set(x + gx, y - 1, z + gz, BLOCK.WATER);
    }
  }
}

function buildMineshaft(set, cx, tunnelY, cz, surfY, world, rng) {
  // Vertical entrance shaft from the surface down to the tunnels, with a
  // ladder on one side so the shaft is always a working entrance.
  const ladderX = cx + 1;
  for (let wy = surfY; wy >= tunnelY; wy--) {
    set(cx, wy, cz, BLOCK.AIR);
    set(ladderX, wy, cz, wy < surfY ? BLOCK.LADDER : BLOCK.AIR);
  }
  set(cx, tunnelY - 1, cz, BLOCK.PLANKS);
  set(ladderX, tunnelY - 1, cz, BLOCK.PLANKS);

  // Main corridor heading out from the shaft + two side branches.
  const alongX = rng() < 0.5;
  const dir = rng() < 0.5 ? 1 : -1;
  let L = 12 + Math.floor(rng() * 16);               // 12..27
  const endX = alongX ? cx + dir * L : cx;
  const endZ = alongX ? cz : cz + dir * L;
  carveMineTunnel(set, cx, cz, endX, endZ, tunnelY, rng);

  // Branch 1 off the mid tunnel.
  const b1t = Math.floor(L / 3);
  const b1x = alongX ? cx + dir * b1t : cx + (rng() < 0.5 ? -1 : 1);
  const b1z = alongX ? cz + (rng() < 0.5 ? -1 : 1) : cz + dir * b1t;
  const b1Len = 3 + Math.floor(rng() * 3);
  const b1ex = alongX ? b1x : b1x + (b1x > cx ? 1 : -1) * b1Len;
  const b1ez = alongX ? b1z + (b1z > cz ? 1 : -1) * b1Len : b1z;
  carveMineTunnel(set, b1x, b1z, b1ex, b1ez, tunnelY, rng);
  // Dead end blocked by rubble, with a loot chest.
  set(b1ex, tunnelY, b1ez, BLOCK.COBBLESTONE_WALL);
  set(b1ex, tunnelY + 1, b1ez, BLOCK.COBBLESTONE_WALL);
  addLootChest(world, set, b1ex - (b1ex > cx ? 1 : -1) * (alongX ? 0 : 1), tunnelY, b1ez - (alongX ? (b1ez > cz ? 1 : -1) : 0), rng, [
    { item: 257, min: 2, max: 6 },   // Coal
    { item: 259, min: 1, max: 3 },   // Iron Ingot
    { item: 316, min: 0, max: 1 },   // Flint & Steel (rare)
    { item: 279, min: 1, max: 3 },   // Gunpowder
    { item: 264, min: 0, max: 2 },   // Bread
  ]);

  // Flooded pit near the middle of the main tunnel.
  const pitT = Math.floor(L / 2);
  const pitX = alongX ? cx + dir * pitT : cx;
  const pitZ = alongX ? cz : cz + dir * pitT;
  carveWaterPit(set, pitX, tunnelY, pitZ, alongX ? 1 : 1, alongX ? 1 : 1);

  // Branch 2 off the far end → spider nest room with cobwebs (mossy + wall
  // blocks because there's no cobweb block in the game) and a chest.
  const b2t = Math.floor((2 * L) / 3);
  const b2x = alongX ? cx + dir * b2t : cx + (rng() < 0.5 ? -1 : 1);
  const b2z = alongX ? cz + (rng() < 0.5 ? -1 : 1) : cz + dir * b2t;
  const b2Len = 3 + Math.floor(rng() * 3);
  const b2ex = alongX ? b2x : b2x + (b2x > cx ? 1 : -1) * b2Len;
  const b2ez = alongX ? b2z + (b2z > cz ? 1 : -1) * b2Len : b2z;
  carveMineTunnel(set, b2x, b2z, b2ex, b2ez, tunnelY, rng);
  // Mini room 3x3.
  for (let rx0 = -1; rx0 <= 1; rx0++) {
    for (let rz0 = -1; rz0 <= 1; rz0++) {
      set(b2ex + rx0, tunnelY, b2ez + rz0, BLOCK.AIR);
      set(b2ex + rx0, tunnelY + 1, b2ez + rz0, BLOCK.AIR);
    }
  }
  const nestedHang = rng() < 0.5;
  set(b2ex - 1, tunnelY + 1, b2ez, nestedHang ? BLOCK.MOSSY_COBBLESTONE : BLOCK.AIR);
  set(b2ex + 1, tunnelY + 1, b2ez, nestedHang ? BLOCK.MOSSY_COBBLESTONE : BLOCK.AIR);
  set(b2ex, tunnelY + 1, b2ez - 1, nestedHang ? BLOCK.MOSSY_COBBLESTONE : BLOCK.AIR);
  set(b2ex, tunnelY + 1, b2ez + 1, nestedHang ? BLOCK.MOSSY_COBBLESTONE : BLOCK.AIR);
  set(b2ex, tunnelY + 1, b2ez, BLOCK.TORCH);
  addLootChest(world, set, b2ex, tunnelY, b2ez, rng, [
    { item: 260, min: 1, max: 2 },   // Gold Ingot
    { item: 314, min: 1, max: 4 },   // GREENSTONE dust
    { item: 278, min: 1, max: 3 },   // String
    { item: 286, min: 0, max: 2 },   // Spider Eye
    { item: 306, min: 0, max: 2 },   // Lime Dye
  ]);

  // One extra chest tucked along the main tunnel.
  const c3t = L - 2 + Math.floor(rng() * 3);
  const c3x = alongX ? cx + dir * c3t : cx;
  const c3z = alongX ? cz : cz + dir * c3t;
  addLootChest(world, set, c3x, tunnelY, c3z, rng, [
    { item: 304, min: 1, max: 3 },   // Copper Ingot
    { item: 259, min: 1, max: 3 },   // Iron Ingot
    { item: 264, min: 0, max: 2 },   // Bread
  ]);
}

// Fill & place a loot chest with a seeded rng; shared by every structure.
function addLootChest(world, set, x, y, z, rng, table) {
  set(x, y, z, BLOCK.CHEST);
  if (!world || !world.getOrCreateChest) return;
  try {
    const inv = world.getOrCreateChest(x, y, z);
    if (inv && !inv._filled) {
      let slot = 0;
      for (const l of table) {
        const count = l.min + Math.floor(rng() * (l.max - l.min + 1));
        if (count > 0) inv[slot++] = { item: l.item, count };
      }
      inv._filled = true;
    }
  } catch (_) {}
}
