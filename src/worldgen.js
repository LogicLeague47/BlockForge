// World generation - height, biomes, features, ores, caves.
// All pure functions. world.js calls into this module.

import { BLOCK } from './blocks.js';
import { CHUNK_SIZE, WORLD_HEIGHT, SEA_LEVEL, BIOMES } from './constants.js';

// Ore vein specs for cluster-based generation
const ORE_VEINS = [
  { block: BLOCK.COAL_ORE,        minY: 1,  maxY: 96,  attempts: 12, minSize: 8,  maxSize: 16, shape: 'spherical' },
  { block: BLOCK.COPPER_ORE,      minY: 1,  maxY: 64,  attempts: 8,  minSize: 4,  maxSize: 8,  shape: 'spherical' },
  { block: BLOCK.IRON_ORE,        minY: 1,  maxY: 64,  attempts: 8,  minSize: 4,  maxSize: 8,  shape: 'elongated' },
  { block: BLOCK.GOLD_ORE,        minY: 1,  maxY: 32,  attempts: 4,  minSize: 3,  maxSize: 6,  shape: 'tight' },
  { block: BLOCK.GREENSTONE_ORE,  minY: 1,  maxY: 48,  attempts: 6,  minSize: 4,  maxSize: 10, shape: 'spherical' },
  { block: BLOCK.DIAMOND_ORE,     minY: 1,  maxY: 16,  attempts: 2,  minSize: 2,  maxSize: 5,  shape: 'tight' },
  { block: BLOCK.EMERALD_ORE,     minY: 1,  maxY: 20,  attempts: 1,  minSize: 1,  maxSize: 3,  shape: 'tight' },
  { block: BLOCK.PRISMITE_ORE,    minY: 1,  maxY: 12,  attempts: 1,  minSize: 1,  maxSize: 3,  shape: 'single' },
];

// Shared river-field helper: BOTH calcHeight (carving) and calcBiome (RIVER
// tag) must sample the identical field, or carved channels lose their biome.
export function riverStrength(n, wx, wz) {
  const octaves = 4;
  const riverRaw = n.river(wx * 0.012, wz * 0.012) / octaves;
  const riverVal = (riverRaw + n.fbm2(n.river, wx * 0.025, wz * 0.025, octaves, 2, 0.5) * 0.5) / 1.5;
  return 1 - Math.abs(riverVal) * 4;
}

export function calcHeight(n, wx, wz, mode, _cache) {
  // MC-style noise router: continentalness, erosion, peaks, detail.
  // IMPORTANT: `continentalness` here has sd≈0.26 over the range ~[-0.75, 0.75]
  // (fbm with 6 octaves flattens toward the mean). Every threshold below is
  // calibrated to THAT distribution, not to [-1, 1].
  const cont = _cache ? _cache.cont : n.fbm2(n.continentalness, wx * 0.003, wz * 0.003, 6, 2, 0.5);
  const erosion = _cache ? _cache.erosion : n.fbm2(n.erosion, wx * 0.004, wz * 0.004, 4, 2, 0.5);
  const ridge = 1 - Math.abs(n.fbm2(n.ridge, wx * 0.005, wz * 0.005, 4, 2, 0.5));
  const detail = n.fbm2(n.detail, wx * 0.02, wz * 0.02, 4, 2, 0.5);
  const depth = n.fbm2(n.depth, wx * 0.008, wz * 0.008, 4, 2, 0.5);
  const oceanDetail = n.fbm2(n.height, wx * 0.012, wz * 0.012, 3, 2, 0.5);

  let h;
  
  // Continentalness bands calibrated to the MEASURED distribution of the fbm
  // output (sd≈0.26, ~50% of values in [-0.2, 0.19]). Shaped like MC:
  // plains hug the sea (+1..+7), hills roll above them, and only high
  // continentalness makes real mountains — no more plateau-everywhere.
  //   cont < -0.50  (~2%)   →  deep ocean
  //   -0.50 .. -0.30 (~13%) →  shallow shelf grading up to the shoreline
  //   -0.30 ..  0.00 (~20%) →  coast: gentle SEA+1 .. SEA+4
  //    0.00 ..  0.30 (~35%) →  plains: SEA+2 .. SEA+7 with erosion valleys
  //   cont >  0.30 (~15%)   →  hills + mountains
  if (cont < -0.50) {
    // Deep ocean floor, sea-8 to sea-14
    h = SEA_LEVEL - 8 + (cont + 0.50) * 22 + depth * 5 + oceanDetail * 3;
  } else if (cont < -0.30) {
    // Shallow shelf: sea-5 rising to just above sea level at the shoreline
    const t = (cont + 0.50) / 0.20;
    h = SEA_LEVEL - 5 + t * 6 + depth * 4 + oceanDetail * 2;
  } else if (cont < 0.00) {
    // Coast: gentle grade so shorelines slope instead of cliffing.
    const t = (cont + 0.30) / 0.30;
    h = SEA_LEVEL + 1 + t * 3 + depth * 3 + oceanDetail * 2;
    if (h < SEA_LEVEL + 1) h = SEA_LEVEL + 1;
  } else if (cont < 0.30) {
    // Plains: low rolling ground hugging the sea, like MC (~+1..+7).
    // High erosion digs valleys that bottom out as lakes.
    const t = cont / 0.30;
    h = SEA_LEVEL + 2 + t * 5 + detail * 4 * (1 - erosion * 0.5);
    h -= Math.max(0, erosion - 0.25) * 14;
    if (h < SEA_LEVEL - 1) h = SEA_LEVEL - 1;
  } else {
    // Hills and mountains: rolling base that steepens with continentalness
    const baseHeight = SEA_LEVEL + 7 + (cont - 0.30) * 45;
    const erosionFactor = 1 - erosion * 0.6;

    h = baseHeight + detail * 5 * erosionFactor;

    // MC mountains: high continentalness + low erosion + ridge peaks
    if (cont > 0.35 && erosion < 0.2 && ridge > 0.6) {
      h += ridge * ridge * (cont - 0.35) * 100;
    }

    // MC hills: ridge-based undulation
    h += ridge * 6 * erosionFactor;
  }

  // River carving: only on land, near sea level
  if (cont > 0.05) {
    const riverStrengthVal = riverStrength(n, wx, wz);
    if (riverStrengthVal > 0.65 && h > SEA_LEVEL - 3) {
      const carve = (riverStrengthVal - 0.65) / 0.35;
      const targetY = SEA_LEVEL - 2 + (1 - carve) * 2;
      h = Math.min(h, Math.round(targetY + detail * 0.5));
    }
  }

  // Fine detail everywhere
  h += n.fbm2(n.detail, wx * 0.04, wz * 0.04, 3, 2, 0.5) * 2;

  // Terrain mode modifiers
  if (mode === 'amplified') {
    // Extreme terrain — multiply deviation from sea level
    const deviation = h - SEA_LEVEL;
    h = SEA_LEVEL + deviation * 2.5;
  } else if (mode === 'normal') {
    // Normal terrain — no dampening, use full height variation
  }
  
  return Math.max(2, Math.min(WORLD_HEIGHT - 6, Math.floor(h)));
}

// Returns continentalness value for a world position (used for spawn checks).
export function getCont(n, wx, wz) {
  return n.fbm2(n.continentalness, wx * 0.003, wz * 0.003, 6, 2, 0.5);
}

// MC spawn_target: full climate sample at a world position.
// Mirrors the noise_router parameters MC uses to pick a world spawn.
export function getClimate(n, wx, wz) {
  return {
    temperature:     n.fbm2(n.temp, wx * 0.002, wz * 0.002, 4, 2, 0.5),
    humidity:        n.fbm2(n.humid, wx * 0.002, wz * 0.002, 4, 2, 0.5),
    continentalness: n.fbm2(n.continentalness, wx * 0.003, wz * 0.003, 6, 2, 0.5),
    erosion:         n.fbm2(n.erosion, wx * 0.004, wz * 0.004, 4, 2, 0.5),
    weirdness:       n.fbm2(n.weirdness, wx * 0.004, wz * 0.004, 4, 2, 0.5),
  };
}

// MC spawn_target: the climate window the game aims for when placing world spawn.
// Overworld targets temperate, moderately humid, firmly inland, low-erosion land.
const SPAWN_TARGET = {
  temperature:     [-0.15, 0.45],
  humidity:        [-0.35, 0.60],
  continentalness: [0.15, 1.00],
  erosion:         [-1.00, 0.55],
  weirdness:       [-1.00, 1.00],
};

// Squared distance from a climate sample to the spawn target window.
// 0 means fully inside the target box; larger means further outside.
export function spawnFitness(climate) {
  let dist = 0;
  for (const key in SPAWN_TARGET) {
    const [lo, hi] = SPAWN_TARGET[key];
    const v = climate[key];
    const d = v < lo ? lo - v : (v > hi ? v - hi : 0);
    dist += d * d;
  }
  return dist;
}

export function calcBiome(n, wx, wz, h, _cache) {
  // MC-style climate parameters: temperature, humidity, continentalness, erosion
  const t = _cache ? _cache.temp : n.fbm2(n.temp, wx * 0.002, wz * 0.002, 4, 2, 0.5);
  const hu = _cache ? _cache.humid : n.fbm2(n.humid, wx * 0.002, wz * 0.002, 4, 2, 0.5);
  const cont = _cache ? _cache.cont : n.fbm2(n.continentalness, wx * 0.003, wz * 0.003, 6, 2, 0.5);
  const erosion = _cache ? _cache.erosion : n.fbm2(n.erosion, wx * 0.004, wz * 0.004, 4, 2, 0.5);

  // MC river: narrow water channels on land (same field as the carver)
  if (cont > 0.05 && h <= SEA_LEVEL && h >= SEA_LEVEL - 3) {
    if (riverStrength(n, wx, wz) > 0.65) return BIOMES.RIVER;
  }

  // MC ocean biomes — matches calcHeight's continentalness thresholds:
  //   cont < -0.50  → deep ocean
  //   -0.50 .. -0.30 → shallow ocean
  //   -0.30 .. 0.00 → coast (beach band near sea level)
  if (cont < -0.50) return BIOMES.DEEP_OCEAN;
  if (cont < -0.30) return BIOMES.OCEAN;
  
  // MC beach: near sea level on coast (window matches the clamped coast
  // heights in calcHeight so beaches can actually form)
  if (h >= SEA_LEVEL && h <= SEA_LEVEL + 4 && cont < 0.1) return BIOMES.BEACH;
  
  // MC Stony Peaks: high continentalness + low erosion
  if (cont > 0.3 && erosion < 0.2) return BIOMES.MOUNTAINS;
  
  // MC cold biomes: low temperature
  if (t < -0.4) return hu > 0.1 ? BIOMES.TAIGA : BIOMES.SNOWY;

  // MC swamp: warm-wet lowland flats near sea level (was defined but never returned)
  if (hu > 0.45 && erosion > 0.3 && h <= SEA_LEVEL + 3 && h >= SEA_LEVEL - 1 && t > -0.2 && t < 0.35) {
    return BIOMES.SWAMP;
  }
  
  // MC forest biomes: cool to mild with humidity
  if (t < 0.15 && hu > 0.1) {
    if (hu > 0.4) return BIOMES.DARK_FOREST;
    if (hu > 0.2) return BIOMES.FOREST;
    if (hu > 0.1) return BIOMES.BIRCH_FOREST;
  }
  
  // MC warm biomes: high temperature
  if (t >= 0.15 && t < 0.5) {
    if (hu < -0.1) return BIOMES.DESERT;
    if (hu > 0.3) return BIOMES.JUNGLE;
    if (hu > 0.05) return BIOMES.SAVANNA;
  }
  
  // MC plains: moderate temperatures, default (~40% of land)
  return BIOMES.PLAINS;
}

// MC surface_rule: top block for a column.
export function surfBlock(biome, h, wx = 0, wz = 0) {
  // MC rule: underwater terrain mixes sand/gravel/clay by noise, not pure sand
  if (h < SEA_LEVEL) {
    const m = ((wx * 73856093) ^ (wz * 19349663)) >>> 0;
    const r = (m % 100) / 100;
    if (r < 0.12) return BLOCK.GRAVEL;
    if (r < 0.2) return BLOCK.CLAY;
    return BLOCK.SAND;
  }

  switch (biome) {
    case BIOMES.BEACH:       return BLOCK.SAND;
    case BIOMES.OCEAN:       return BLOCK.SAND;
    case BIOMES.DEEP_OCEAN:  return BLOCK.SAND;
    case BIOMES.DESERT:      return BLOCK.SAND;
    case BIOMES.RIVER:       return BLOCK.SAND;
    case BIOMES.SNOWY:       return BLOCK.SNOW_GRASS;
    case BIOMES.SWAMP:       return BLOCK.GRASS;
    // MC stony peaks: bare stone above 25, dirt transition, grass below
    case BIOMES.MOUNTAINS:   return h > SEA_LEVEL + 25 ? BLOCK.STONE : (h > SEA_LEVEL + 18 ? BLOCK.DIRT : BLOCK.GRASS);
    case BIOMES.TAIGA:       return BLOCK.GRASS;
    case BIOMES.JUNGLE:      return BLOCK.GRASS;
    default:                 return BLOCK.GRASS;
  }
}

// MC surface_rule: depth of the sub-surface layer (dirt/sand band under the top block).
export function surfDepth(biome, h) {
  if (h < SEA_LEVEL) return 3;
  switch (biome) {
    case BIOMES.DESERT:    return 5;   // MC: deep sand over sandstone
    case BIOMES.BEACH:     return 4;
    case BIOMES.MOUNTAINS: return h > SEA_LEVEL + 25 ? 0 : 2;  // bare stone peaks
    default:               return 3;   // MC standard: 3 dirt under grass
  }
}

export function fillBlock(biome, h) {
  // Underwater fill mixes sand with gravel pockets
  if (h < SEA_LEVEL) return BLOCK.SAND;

  switch (biome) {
    case BIOMES.BEACH:       return BLOCK.SAND;
    case BIOMES.OCEAN:       return BLOCK.SAND;
    case BIOMES.DEEP_OCEAN:  return BLOCK.SAND;
    case BIOMES.RIVER:       return BLOCK.SAND;
    case BIOMES.DESERT:      return BLOCK.SAND;
    case BIOMES.SWAMP:       return BLOCK.DIRT;
    // MC stony peaks: bare stone up high, but dirt under the grass band —
    // never grass sitting directly on stone.
    case BIOMES.MOUNTAINS:   return h > SEA_LEVEL + 18 ? BLOCK.STONE : BLOCK.DIRT;
    default:                 return BLOCK.DIRT;
  }
}

// MC surface_rule: block beneath the sub-surface band (sandstone under desert sand, etc.)
export function deepBlock(biome, h) {
  switch (biome) {
    case BIOMES.DESERT: return BLOCK.SANDSTONE;  // MC: sandstone under desert sand
    case BIOMES.BEACH:  return BLOCK.SANDSTONE;
    case BIOMES.SWAMP:  return BLOCK.CLAY;       // MC swamp: clay disks under the mud
    default:            return BLOCK.STONE;
  }
}

export function generateColumn(n, chunk, x, z, wx, wz, mode) {
  const _cache = {
    cont: n.fbm2(n.continentalness, wx * 0.003, wz * 0.003, 6, 2, 0.5),
    erosion: n.fbm2(n.erosion, wx * 0.004, wz * 0.004, 4, 2, 0.5),
    temp: n.fbm2(n.temp, wx * 0.002, wz * 0.002, 4, 2, 0.5),
    humid: n.fbm2(n.humid, wx * 0.002, wz * 0.002, 4, 2, 0.5),
  };
  const h = calcHeight(n, wx, wz, mode, _cache);
  const biome = calcBiome(n, wx, wz, h, _cache);
  const surf = surfBlock(biome, h, wx, wz);
  const sub = fillBlock(biome, h);
  // MC surface_rule: variable-depth sub-surface band + transition layer
  const depth = surfDepth(biome, h);
  const deep = deepBlock(biome, h);

  let topSolid = -1;
  // MC bedrock floor: rough 3-layer shell (solid at y=0, noisy y=1-2) so one
  // unlucky explosion can never punch straight into the void.
  const bedrockRng = ((wx * 73856093) ^ (wz * 19349663)) >>> 0;
  for (let y = 0; y <= h; y++) {
    let b;
    if (y === 0) b = BLOCK.BEDROCK;
    else if (y <= 2 && ((bedrockRng >> (y * 7 + (wx & 3))) & 3) !== 0) b = BLOCK.BEDROCK;
    else if (y === h) b = surf;
    else if (y > h - depth) b = sub;
    else if (y > h - depth - 3) b = deep;   // MC transition band (sandstone/stone)
    // MC deepslate blend: stone grades into deepslate from y=8 down, solid by y=0
    else if (y <= 8 && y > 2) b = (((bedrockRng >> y) & 1) === 0 || y <= 3) ? BLOCK.DEEPSLATE : BLOCK.STONE;
    else b = BLOCK.STONE;

    if (y > 2 && y < h - 1) {
      const c1 = n.cave(wx * 0.04, y * 0.05, wz * 0.04);
      const c2 = n.cave2(wx * 0.035, y * 0.06, wz * 0.035);
      const c3 = n.cave(wx * 0.02, y * 0.03, wz * 0.02);
      const c4 = n.cave2(wx * 0.018, y * 0.025, wz * 0.018);

      if (Math.abs(c1) < 0.12 && Math.abs(c2) < 0.12) b = BLOCK.AIR;
      else if (Math.abs(c3) < 0.085 && Math.abs(c4) < 0.085) b = BLOCK.AIR;

      const ravX = n.cave(wx * 0.01, y * 0.15, wz * 0.06);
      const ravZ = n.cave2(wx * 0.06, y * 0.15, wz * 0.01);
      const ravDepth = n.cave(wx * 0.008, y * 0.005, wz * 0.008);
      if (Math.abs(ravX) < 0.035 && Math.abs(ravZ) < 0.035 && ravDepth > 0.2) b = BLOCK.AIR;
    }

    // MC aquifer-lite: sub-sea-level caves flood instead of hanging as air
    // pockets under the ocean.
    if (b === BLOCK.AIR && y <= SEA_LEVEL && y >= 1) b = BLOCK.WATER;

    chunk.set(x, y, z, b);
    if (b !== BLOCK.AIR && b !== BLOCK.WATER) topSolid = y;
  }

  if (h < SEA_LEVEL) {
    for (let y = h + 1; y <= SEA_LEVEL; y++) chunk.set(x, y, z, BLOCK.WATER);
  }

  return { h, biome, topSolid };
}

// =====================================================================
// The Shattered Echo Dimension: fragmented floating islands adrift in a
// starless void. Unlike the overworld there is no continuous sea floor /
// bedrock — solid islands hang at scattered heights with empty air between
// and below. Only the player's constructed world (nobody) generates this.
// =====================================================================

export function generateDimensionColumn(n, chunk, x, z, wx, wz) {
  // Floating islands — Low-frequency field decides whether this column carries
  // an island and how tall it is. ~[-1,1]; pull to ~[-0.35,0.35] so islands
  // are sparse and there are open voids between them.
  const f = n.fbm2(n.weirdness, wx * 0.012, wz * 0.012, 4, 2, 0.5);
  const detail = n.fbm2(n.detail, wx * 0.04, wz * 0.04, 3, 2, 0.5);

  // Island thickness tapers toward zero at the field's low end, so edges
  // shrink to spires and empty columns (f <= 0.15) generate pure void.
  const fw = Math.max(0, f - 0.15);
  const thick = Math.floor(16 + detail * 10) * Math.min(1, fw * 8);

  // Heigeld of the island floats in the sky; empty below it.
  const topH = 58 + Math.floor(f * 28);

  let topSolid = -1;
  const base = topH - thick;
  if (thick > 0) {
    for (let y = Math.max(0, base); y <= topH && y < WORLD_HEIGHT; y++) {
      const t = (base >= 0) ? (y - base) / (thick + 0.001) : 1; // 0..1 through island
      const wobble = n.cave(wx * 0.03, y * 0.05, wz * 0.03) * 0.5;

      // Rounded dome profile: solid core thickens mid-height, thins at rims
      let dens = 1 - Math.abs(0.55 - t) * 1.9 + wobble;
      let b = BLOCK.AIR;
      if (dens > 0) {
        if (t > 0.82) b = BLOCK.VOID_STONE;                       // pale surface cap
        else if (t < 0.15) b = BLOCK.EMBEROCK;               // glowing underside
        else {
          b = (n.cave(wx * 1.3, y * 1.3, wz * 1.3) > 0.6) ? BLOCK.VOID_GLASS : BLOCK.VOIDSTONE;
          // Echo Ore veins: a sparse deterministic hash of the cell position —
          // mining the island interior yields Echo Shards, the dimension's reward.
          const oreHash = ((wx * 0x9E3779B9) + (wz * 0x85EBCA77) + (y * 0xC2B2AE35)) >>> 0;
          if (b === BLOCK.VOIDSTONE && oreHash % 23 === 0) b = BLOCK.ECHO_ORE;
        }
        if (t > 0.84 && dens < 0.5) b = BLOCK.BLOCKSCRAP;     // broken scraps on crust
      }
      chunk.set(x, y, z, b);
      if (b !== BLOCK.AIR) topSolid = y;
    }
  }

  // This dimension has no bedrock floor; expose the void below the islands.
  return { h: topSolid, biome: BIOMES.PLAINS, topSolid };
}

export function generateDimensionFeatures(chunk, baseX, baseZ, n) {
  // Scattered hanging void-glass shards on island undersides + glint crystals
  for (let x = 1; x < CHUNK_SIZE - 1; x++) {
    for (let z = 1; z < CHUNK_SIZE - 1; z++) {
      const wx = baseX + x, wz = baseZ + z;
      const h = chunk.surfaceMap[z * CHUNK_SIZE + x];
      if (h < 0 || h >= WORLD_HEIGHT - 2) continue;
      const rndLocal = mulberryLocal(((wx * 73856093) ^ (wz * 19349663)) >>> 0);
      if (rndLocal() < 0.05 && chunk.get(x, h - 1, z) !== BLOCK.AIR) {
        // underside spire
        const under = Math.max(1, h - 4);
        for (let yy = h - 1; yy >= under; yy--) {
          if (chunk.get(x, yy, z) === BLOCK.AIR) chunk.set(x, yy, z, BLOCK.VOID_GLASS);
        }
      }
      if (rndLocal() < 0.03 && chunk.get(x, h, z) !== BLOCK.AIR) {
        chunk.set(x, h + 1, z, BLOCK.VOID_GLASS);
      }
    }
  }
}

export function generateFeatures(chunk, baseX, baseZ, n) {
  for (let x = 2; x < CHUNK_SIZE - 2; x++) {
    for (let z = 2; z < CHUNK_SIZE - 2; z++) {
      const wx = baseX + x, wz = baseZ + z;
      const h = chunk.surfaceMap[z * CHUNK_SIZE + x];
      if (h < 0 || h >= WORLD_HEIGHT - 14 || h < SEA_LEVEL) continue;
      const biome = calcBiome(n, wx, wz, h);
      const top = chunk.get(x, h, z);
      if (top === BLOCK.WATER || top === BLOCK.AIR) continue;

      const seed = ((wx * 73856093) ^ (wz * 19349663) ^ (h * 83492791)) >>> 0;
      const local = mulberryLocal(seed);
      const roll = local();
      placeFeature(chunk, x, h, z, biome, roll, local, top);
    }
  }
}

// =====================================================================
// Underground generation: ore veins, stalactites, lakes, cave biomes
// =====================================================================

function isStone(b) {
  return b === BLOCK.STONE || b === BLOCK.DEEPSLATE;
}

// --- Ore Veins ---

function placeOreCluster(chunk, cx, cy, cz, blockId, veinSize, shape, rng) {
  let rx, ry, rz;
  switch (shape) {
    case 'single':
      for (let i = 0; i < veinSize; i++) {
        const dx = (rng() * 3 - 1) | 0;
        const dy = (rng() * 2 - 1) | 0;
        const dz = (rng() * 3 - 1) | 0;
        const x = cx + dx, y = cy + dy, z = cz + dz;
        if (x < 0 || x >= CHUNK_SIZE || y < 0 || y >= WORLD_HEIGHT || z < 0 || z >= CHUNK_SIZE) continue;
        if (isStone(chunk.get(x, y, z))) chunk.set(x, y, z, blockId);
      }
      return;
    case 'elongated':
      rx = 3; ry = 1; rz = 2;
      break;
    case 'tight':
      rx = 1; ry = 1; rz = 1;
      break;
    case 'spherical':
    default:
      rx = 2; ry = 2; rz = 2;
      break;
  }

  let placed = 0;
  const target = veinSize;
  const maxAttempts = 60;
  for (let attempt = 0; attempt < maxAttempts && placed < target; attempt++) {
    const dx = (rng() * 2 - 1) * rx;
    const dy = (rng() * 2 - 1) * ry;
    const dz = (rng() * 2 - 1) * rz;
    const x = Math.round(cx + dx);
    const y = Math.round(cy + dy);
    const z = Math.round(cz + dz);
    if (x < 0 || x >= CHUNK_SIZE || y < 0 || y >= WORLD_HEIGHT || z < 0 || z >= CHUNK_SIZE) continue;
    const edx = dx / rx, edy = dy / ry, edz = dz / rz;
    if (edx * edx + edy * edy + edz * edz > 1) continue;
    if (!isStone(chunk.get(x, y, z))) continue;
    chunk.set(x, y, z, blockId);
    placed++;
  }
}

function generateOreVeins(chunk, baseX, baseZ) {
  // MC triangular distribution: rejection-sample y toward the band middle so
  // veins cluster like Java's triangle peaks instead of uniform spam.
  const triY = (rng, minY, maxY) =>
    Math.floor(minY + (maxY - minY + 1) * (rng() + rng()) * 0.5);
  for (const spec of ORE_VEINS) {
    const { block, minY, maxY, attempts, minSize, maxSize, shape } = spec;
    const seed = (baseX * 73856093) ^ (baseZ * 19349663) ^ (block * 83492791);
    const rng = mulberryLocal(seed >>> 0);

    for (let a = 0; a < attempts; a++) {
      const x = (rng() * CHUNK_SIZE) | 0;
      const z = (rng() * CHUNK_SIZE) | 0;
      const y = Math.max(1, Math.min(WORLD_HEIGHT - 1, triY(rng, minY, maxY)));
      if (y < 0 || y >= WORLD_HEIGHT) continue;
      if (!isStone(chunk.get(x, y, z))) continue;

      const veinSize = minSize + ((rng() * (maxSize - minSize + 1)) | 0);
      const clusterSeed = (seed + a * 7919) >>> 0;
      const clusterRng = mulberryLocal(clusterSeed);
      placeOreCluster(chunk, x, y, z, block, veinSize, shape, clusterRng);
    }
  }
}

// --- Stalactites & Stalagmites ---

function placeStalactite(chunk, x, y, z, height, material) {
  for (let i = 0; i < height && y - i >= 0; i++) {
    const py = y - i;
    if (i === 0 && height >= 2) {
      for (let dx = 0; dx < 2 && x + dx < CHUNK_SIZE; dx++) {
        for (let dz = 0; dz < 2 && z + dz < CHUNK_SIZE; dz++) {
          if (chunk.get(x + dx, py, z + dz) === BLOCK.AIR)
            chunk.set(x + dx, py, z + dz, material);
        }
      }
    } else {
      if (chunk.get(x, py, z) === BLOCK.AIR)
        chunk.set(x, py, z, material);
    }
  }
}

function placeStalagmite(chunk, x, y, z, height, material) {
  for (let i = 0; i < height && y + i < WORLD_HEIGHT; i++) {
    const py = y + i;
    if (i === 0 && height >= 2) {
      for (let dx = 0; dx < 2 && x + dx < CHUNK_SIZE; dx++) {
        for (let dz = 0; dz < 2 && z + dz < CHUNK_SIZE; dz++) {
          if (chunk.get(x + dx, py, z + dz) === BLOCK.AIR)
            chunk.set(x + dx, py, z + dz, material);
        }
      }
    } else {
      if (chunk.get(x, py, z) === BLOCK.AIR)
        chunk.set(x, py, z, material);
    }
  }
}

function generateCaveDecorations(chunk, baseX, baseZ) {
  for (let x = 1; x < CHUNK_SIZE - 1; x++) {
    for (let z = 1; z < CHUNK_SIZE - 1; z++) {
      for (let y = 3; y < WORLD_HEIGHT - 3; y++) {
        if (chunk.get(x, y, z) !== BLOCK.AIR) continue;

        const above = chunk.get(x, y + 1, z);
        const below = chunk.get(x, y - 1, z);

        // Stalactite: air below stone ceiling
        if (isStone(above) && below === BLOCK.AIR) {
          const wx = baseX + x, wz = baseZ + z;
          const seed = (wx * 73856093) ^ (wz * 19349663) ^ (y * 83492791);
          const rng = mulberryLocal(seed >>> 0);
          if (rng() < 0.15) {
            const height = 1 + ((rng() * 4) | 0);
            placeStalactite(chunk, x, y, z, height, BLOCK.STONE);
          }
        }

        // Stalagmite: air above stone floor
        if (isStone(below) && above === BLOCK.AIR) {
          const wx = baseX + x, wz = baseZ + z;
          const seed = (wx * 73856093) ^ (wz * 19349663) ^ (y * 83492791 + 1);
          const rng = mulberryLocal(seed >>> 0);
          if (rng() < 0.12) {
            const height = 1 + ((rng() * 3) | 0);
            placeStalagmite(chunk, x, y, z, height, BLOCK.STONE);
          }
        }
      }
    }
  }
}

// --- Underground Lakes ---

function generateUndergroundLakes(chunk, baseX, baseZ) {
  for (let x = 2; x < CHUNK_SIZE - 2; x++) {
    for (let z = 2; z < CHUNK_SIZE - 2; z++) {
      for (let y = 2; y < 32; y++) {
        if (chunk.get(x, y, z) !== BLOCK.AIR) continue;
        const floor = chunk.get(x, y - 1, z);
        if (!isStone(floor) && floor !== BLOCK.DIRT && floor !== BLOCK.SAND) continue;

        const wx = baseX + x, wz = baseZ + z;
        const seed = (wx * 73856093) ^ (wz * 19349663) ^ (y * 83492791);
        const rng = mulberryLocal(seed >>> 0);

        if (rng() < 0.06) {
          const radius = 2 + ((rng() * 3) | 0);
          const depth = 1 + ((rng() * 3) | 0);
          const isLava = y < 10 && rng() < 0.3;

          for (let dx = -radius; dx <= radius; dx++) {
            for (let dz = -radius; dz <= radius; dz++) {
              const dist = Math.sqrt(dx * dx + dz * dz);
              if (dist > radius + 0.5) continue;
              const px = x + dx, pz = z + dz;
              if (px < 0 || px >= CHUNK_SIZE || pz < 0 || pz >= CHUNK_SIZE) continue;
              for (let d = 0; d < depth; d++) {
                const py = y - d;
                if (py < 0) break;
                if (d === 0) {
                  if (chunk.get(px, py, pz) === BLOCK.AIR)
                    chunk.set(px, py, pz, isLava ? BLOCK.LAVA : BLOCK.WATER);
                } else {
                  if (chunk.get(px, py, pz) === BLOCK.STONE || chunk.get(px, py, pz) === BLOCK.DEEPSLATE)
                    chunk.set(px, py, pz, isLava ? BLOCK.LAVA : BLOCK.WATER);
                }
              }
            }
          }
        }
      }
    }
  }
}

// --- Cave Biomes ---

function applyDeepslateBiome(chunk) {
  for (let x = 0; x < CHUNK_SIZE; x++) {
    for (let z = 0; z < CHUNK_SIZE; z++) {
      for (let y = 1; y < 4; y++) {
        if (chunk.get(x, y, z) === BLOCK.STONE)
          chunk.set(x, y, z, BLOCK.DEEPSLATE);
      }
    }
  }
}

function widenLavaCaverns(chunk, baseX, baseZ, n) {
  for (let x = 1; x < CHUNK_SIZE - 1; x++) {
    for (let z = 1; z < CHUNK_SIZE - 1; z++) {
      for (let y = 1; y < 10; y++) {
        const b = chunk.get(x, y, z);
        if (!isStone(b)) continue;
        if (chunk.get(x - 1, y, z) === BLOCK.AIR ||
            chunk.get(x + 1, y, z) === BLOCK.AIR ||
            chunk.get(x, y - 1, z) === BLOCK.AIR ||
            chunk.get(x, y + 1, z) === BLOCK.AIR ||
            chunk.get(x, y, z - 1) === BLOCK.AIR ||
            chunk.get(x, y, z + 1) === BLOCK.AIR) {
          const wx = baseX + x, wz = baseZ + z;
          const nv = n.cave(wx * 0.05, y * 0.06, wz * 0.05);
          if (Math.abs(nv) < 0.2) {
            chunk.set(x, y, z, BLOCK.AIR);
          }
        }
      }
    }
  }
}

// Crystal geodes: rare underground hollows lined with crystal ore and a prism core.
function generateGeodes(chunk, baseX, baseZ) {
  const seed = ((baseX * 73856093) ^ (baseZ * 19349663) ^ 0x9e3779b1) >>> 0;
  const rng = mulberryLocal(seed);
  const count = rng() < 0.5 ? 1 : (rng() < 0.25 ? 2 : 0);
  for (let g = 0; g < count; g++) {
    const cx = 2 + ((rng() * (CHUNK_SIZE - 4)) | 0);
    const cy = 18 + ((rng() * 30) | 0);
    const cz = 2 + ((rng() * (CHUNK_SIZE - 4)) | 0);
    const R = 2 + ((rng() * 2) | 0);
    const r2 = R * R;
    for (let dx = -R - 1; dx <= R + 1; dx++) {
      for (let dy = -R - 1; dy <= R + 1; dy++) {
        for (let dz = -R - 1; dz <= R + 1; dz++) {
          const x = cx + dx, y = cy + dy, z = cz + dz;
          if (x < 0 || x >= CHUNK_SIZE || y < 1 || y >= WORLD_HEIGHT || z < 0 || z >= CHUNK_SIZE) continue;
          const d = dx * dx + dy * dy + dz * dz;
          if (d <= r2) {
            if (!isStone(chunk.get(x, y, z))) continue;
            if (d > (R - 1) * (R - 1)) chunk.set(x, y, z, BLOCK.OBSIDIAN);
            else if (d > (R - 2) * (R - 2)) chunk.set(x, y, z, BLOCK.CRYSTAL_ORE);
            else chunk.set(x, y, z, BLOCK.CRYSTAL_PRISM_1);
          } else if (d <= r2 + 2 * R + 1 && isStone(chunk.get(x, y, z)) && rng() < 0.25) {
            chunk.set(x, y, z, BLOCK.OBSIDIAN);
          }
        }
      }
    }
  }
}

export function generateUnderground(chunk, baseX, baseZ, n) {
  applyDeepslateBiome(chunk);
  generateOreVeins(chunk, baseX, baseZ);
  generateGeodes(chunk, baseX, baseZ);
  widenLavaCaverns(chunk, baseX, baseZ, n);
  generateCaveDecorations(chunk, baseX, baseZ);
  generateUndergroundLakes(chunk, baseX, baseZ);
}

function placeFeature(chunk, x, h, z, biome, roll, local, top) {
  switch (biome) {
    case BIOMES.DARK_FOREST:
      if (roll < 0.03 && top === BLOCK.GRASS) plantTree(chunk, x, h + 1, z, local, 'dark_oak');
      else if (roll < 0.032 && top === BLOCK.GRASS)
        chunk.set(x, h + 1, z, local() < 0.5 ? BLOCK.FLOWER_RED : BLOCK.FLOWER_YELLOW);
      break;
    case BIOMES.FOREST:
      if (roll < 0.015 && top === BLOCK.GRASS) plantTree(chunk, x, h + 1, z, local, 'large_oak');
      else if (roll < 0.025 && top === BLOCK.GRASS) plantTree(chunk, x, h + 1, z, local, 'oak');
      else if (roll < 0.026 && top === BLOCK.GRASS)
        chunk.set(x, h + 1, z, local() < 0.5 ? BLOCK.FLOWER_RED : BLOCK.FLOWER_YELLOW);
      break;
    case BIOMES.BIRCH_FOREST:
      if (roll < 0.025 && top === BLOCK.GRASS) plantTree(chunk, x, h + 1, z, local, 'birch');
      break;
    case BIOMES.TAIGA:
      if (roll < 0.02 && top === BLOCK.GRASS)
        plantTree(chunk, x, h + 1, z, local, 'taiga');
      break;
    case BIOMES.JUNGLE:
      if (roll < 0.03 && top === BLOCK.GRASS) plantTree(chunk, x, h + 1, z, local, 'jungle');
      break;
    case BIOMES.SAVANNA:
      if (roll < 0.005 && top === BLOCK.GRASS) plantTree(chunk, x, h + 1, z, local, 'large_oak');
      else if (roll < 0.010 && top === BLOCK.GRASS) plantTree(chunk, x, h + 1, z, local, 'savanna');
      else if (roll < 0.015 && top === BLOCK.GRASS) plantTree(chunk, x, h + 1, z, local, 'dead');
      break;
    case BIOMES.PLAINS:
      if (roll < 0.001 && top === BLOCK.GRASS)
        chunk.set(x, h + 1, z, local() < 0.5 ? BLOCK.FLOWER_RED : BLOCK.FLOWER_YELLOW);
      else if (roll < 0.04 && top === BLOCK.GRASS)
        chunk.set(x, h + 1, z, local() < 0.7 ? BLOCK.SHORT_GRASS : BLOCK.TALL_GRASS);
      break;
    case BIOMES.DESERT:
      if (roll < 0.015 && top === BLOCK.SAND) plantTree(chunk, x, h + 1, z, local, 'dead');
      else if (roll < 0.035 && top === BLOCK.SAND) {
        const ch = 1 + ((local() * 3) | 0);
        for (let i = 0; i < ch && h + 1 + i < WORLD_HEIGHT; i++)
          chunk.set(x, h + 1 + i, z, BLOCK.CACTUS);
      }
      break;
    case BIOMES.SNOWY:
      if (roll < 0.01 && top === BLOCK.SNOW_BLOCK)
        plantTree(chunk, x, h + 1, z, local, 'taiga');
      break;
    case BIOMES.SWAMP:
      if (roll < 0.02 && top === BLOCK.GRASS) plantTree(chunk, x, h + 1, z, local, 'swamp');
      else if (roll < 0.025 && top === BLOCK.GRASS) plantBush(chunk, x, h + 1, z, local);
      else if (roll < 0.026 && top === BLOCK.GRASS) chunk.set(x, h + 1, z, BLOCK.FLOWER_RED);
      break;
  }
}

export function plantTree(chunk, x, y, z, rng, type) {
  // MC parity: keep whole trees inside the chunk — trunks near the border
  // would grow canopies cut off at the chunk edge.
  if (x < 3 || x > CHUNK_SIZE - 4 || z < 3 || z > CHUNK_SIZE - 4) return;
  const canOverwrite = (bx, by, bz) => {
    if (bx < 0 || bx >= CHUNK_SIZE || bz < 0 || bz >= CHUNK_SIZE) return false;
    if (by < 0 || by >= WORLD_HEIGHT) return false;
    const cur = chunk.get(bx, by, bz);
    if (cur === BLOCK.AIR) return true;
    const d = BLOCKS[cur];
    // MC replaces leaves/plants when canopies overlap, never solid trunks/ground
    return !!d && (!!d.transparent || !!d.plant);
  };
  const setLeaf = (bx, by, bz, leafBlock) => {
    if (canOverwrite(bx, by, bz)) chunk.set(bx, by, bz, leafBlock);
  };
  let trunkBlock, leafBlock, trunkH, leafRadius, doubleTrunk = false;
  switch (type) {
    case 'jungle':
      trunkBlock = BLOCK.JUNGLE_WOOD; leafBlock = BLOCK.LEAVES;
      trunkH = 4 + ((rng() * 4) | 0); leafRadius = 2; doubleTrunk = true; break;
    case 'taiga':
      trunkBlock = BLOCK.SPRUCE_WOOD; leafBlock = BLOCK.SPRUCE_LEAVES;
      trunkH = 5 + ((rng() * 3) | 0); leafRadius = 2; break;
    case 'birch':
      trunkBlock = BLOCK.BIRCH_WOOD; leafBlock = BLOCK.BIRCH_LEAVES;
      trunkH = 5 + ((rng() * 3) | 0); leafRadius = 2; break;
    case 'savanna':
      trunkBlock = BLOCK.ACACIA_WOOD; leafBlock = BLOCK.ACACIA_LEAVES;
      trunkH = 4 + ((rng() * 2) | 0); leafRadius = 2; break;
    case 'swamp':
      trunkBlock = BLOCK.WOOD; leafBlock = BLOCK.LEAVES;
      trunkH = 3 + ((rng() * 2) | 0); leafRadius = 2; break;
    case 'large_oak':
      trunkBlock = BLOCK.WOOD; leafBlock = BLOCK.LEAVES;
      trunkH = 6 + ((rng() * 2) | 0); leafRadius = 2; break;
    case 'dead':
      trunkBlock = BLOCK.WOOD; leafBlock = null;
      trunkH = 3 + ((rng() * 4) | 0); leafRadius = 0; break;
    case 'dark_oak':
      trunkBlock = BLOCK.DARK_OAK_WOOD; leafBlock = BLOCK.DARK_OAK_LEAVES;
      trunkH = 5 + ((rng() * 3) | 0); leafRadius = 2; doubleTrunk = true; break;
    default:
      // MC oak: trunk 4-7 with a 2-layer 5x5 canopy + 3x3 cap + top plus
      trunkBlock = BLOCK.WOOD; leafBlock = BLOCK.LEAVES;
      trunkH = 4 + ((rng() * 4) | 0); leafRadius = 2;
  }
  const tx = doubleTrunk ? [x, x + 1] : [x];
  const tz = doubleTrunk ? [z, z + 1] : [z];
  for (const bx of tx) {
    for (const bz of tz) {
      for (let i = 0; i < trunkH; i++) {
        if (y + i < WORLD_HEIGHT) chunk.set(bx, y + i, bz, trunkBlock);
      }
    }
  }
  if (!leafBlock) return;
  const cx = doubleTrunk ? x : x;
  const cz = doubleTrunk ? z : z;
  const top = y + trunkH;
  if (type === 'taiga') {
    // MC spruce cone: tapering 2-1-1-plus layers, not a cylinder
    const layers = [
      { dy: -3, r: 2 }, { dy: -2, r: 2 }, { dy: -1, r: 1 },
      { dy: 0, r: 1 }, { dy: 1, r: 0 },
    ];
    for (const L of layers) {
      const layerY = top + L.dy;
      if (L.r === 0) {
        setLeaf(cx, layerY, cz, leafBlock);
        setLeaf(cx + 1, layerY, cz, leafBlock);
        setLeaf(cx - 1, layerY, cz, leafBlock);
        setLeaf(cx, layerY, cz + 1, leafBlock);
        setLeaf(cx, layerY, cz - 1, leafBlock);
      } else {
        for (let dx = -L.r; dx <= L.r; dx++) {
          for (let dz = -L.r; dz <= L.r; dz++) {
            if (Math.abs(dx) === L.r && Math.abs(dz) === L.r && (dx !== 0 || dz !== 0) && rng() < 0.5) continue;
            setLeaf(cx + dx, layerY, cz + dz, leafBlock);
          }
        }
      }
    }
    return;
  }
  const ext = doubleTrunk ? 1 : 0;
  for (let ly = -leafRadius; ly <= 1; ly++) {
    const r = ly <= -1 ? leafRadius : (ly === 0 ? leafRadius : Math.max(1, leafRadius - 1));
    for (let dx = -r; dx <= r + ext; dx++) {
      for (let dz = -r; dz <= r + ext; dz++) {
        if (Math.abs(dx) === r + (dx > 0 ? ext : 0) && Math.abs(dz) === r + (dz > 0 ? ext : 0) && rng() < 0.4) continue;
        const lx = cx + dx, layerY = top + ly, lz = cz + dz;
        setLeaf(lx, layerY, lz, leafBlock);
      }
    }
  }
  // MC oak top: 3x3 cap plus a plus-shaped tip
  setLeaf(cx, top + 2, cz, leafBlock);
  setLeaf(cx + 1, top + 2, cz, leafBlock);
  setLeaf(cx - 1, top + 2, cz, leafBlock);
  setLeaf(cx, top + 2, cz + 1, leafBlock);
  setLeaf(cx, top + 2, cz - 1, leafBlock);
}

// Grow a sapling into a tree in the live world (world.setBlock, not chunks).
// Mirrors plantTree's shapes so a planted sapling becomes a real tree.
export function growTreeInWorld(world, x, y, z, saplingBlock) {
  let type;
  switch (saplingBlock) {
    case BLOCK.JUNGLE_SAPLING: type = 'jungle'; break;
    case BLOCK.BIRCH_SAPLING: type = 'birch'; break;
    case BLOCK.SPRUCE_SAPLING: type = 'taiga'; break;
    case BLOCK.DARK_OAK_SAPLING: type = 'dark_oak'; break;
    case BLOCK.ACACIA_SAPLING: type = 'savanna'; break;
    default: type = 'oak';
  }
  // Deterministic-ish rng so growth isn't pure chaos, but still varied.
  let s = ((x * 374761393) + (z * 668265263) + (y * 1274126177)) | 0;
  const rng = mulberryLocal(s);

  let trunkBlock, leafBlock, trunkH, leafRadius;
  switch (type) {
    case 'jungle':
      trunkBlock = BLOCK.JUNGLE_WOOD; leafBlock = BLOCK.LEAVES;
      trunkH = 4 + ((rng() * 4) | 0); leafRadius = 2; break;
    case 'taiga':
      trunkBlock = BLOCK.SPRUCE_WOOD; leafBlock = BLOCK.SPRUCE_LEAVES;
      trunkH = 4 + ((rng() * 3) | 0); leafRadius = 1; break;
    case 'birch':
      trunkBlock = BLOCK.BIRCH_WOOD; leafBlock = BLOCK.BIRCH_LEAVES;
      trunkH = 5 + ((rng() * 3) | 0); leafRadius = 2; break;
    case 'savanna':
      trunkBlock = BLOCK.ACACIA_WOOD; leafBlock = BLOCK.ACACIA_LEAVES;
      trunkH = 3 + ((rng() * 2) | 0); leafRadius = 2; break;
    case 'dark_oak':
      trunkBlock = BLOCK.DARK_OAK_WOOD; leafBlock = BLOCK.DARK_OAK_LEAVES;
      trunkH = 5 + ((rng() * 3) | 0); leafRadius = 2; break;
    default:
      trunkBlock = BLOCK.WOOD; leafBlock = BLOCK.LEAVES;
      trunkH = 4 + ((rng() * 4) | 0); leafRadius = 2;
  }

  for (let i = 0; i < trunkH; i++) {
    if (y + i >= WORLD_HEIGHT) break;
    world.setBlock(x, y + i, z, trunkBlock);
  }
  if (!leafBlock) return;
  const top = y + trunkH;
  for (let ly = -leafRadius; ly <= 1; ly++) {
    const r = ly <= 0 ? leafRadius : Math.max(1, leafRadius - 1);
    for (let dx = -r; dx <= r; dx++) {
      for (let dz = -r; dz <= r; dz++) {
        if (Math.abs(dx) === r && Math.abs(dz) === r && rng() < 0.4) continue;
        const layerY = top + ly;
        if (layerY >= WORLD_HEIGHT) continue;
        const cur = world.getBlock(x + dx, layerY, z + dz);
        if (cur === BLOCK.AIR) {
          world.setBlock(x + dx, layerY, z + dz, leafBlock);
        }
      }
    }
  }
  // MC oak top plus-tip
  const topY = top + 2;
  if (topY < WORLD_HEIGHT) {
    if (world.getBlock(x, topY, z) === BLOCK.AIR) world.setBlock(x, topY, z, leafBlock);
    if (world.getBlock(x + 1, topY, z) === BLOCK.AIR) world.setBlock(x + 1, topY, z, leafBlock);
    if (world.getBlock(x - 1, topY, z) === BLOCK.AIR) world.setBlock(x - 1, topY, z, leafBlock);
    if (world.getBlock(x, topY, z + 1) === BLOCK.AIR) world.setBlock(x, topY, z + 1, leafBlock);
    if (world.getBlock(x, topY, z - 1) === BLOCK.AIR) world.setBlock(x, topY, z - 1, leafBlock);
  }
}

function plantBush(chunk, x, y, z, rng) {
  const h = 2 + ((rng() * 2) | 0);
  for (let i = 0; i < h; i++) {
    if (y + i < WORLD_HEIGHT) chunk.set(x, y + i, z, BLOCK.LEAVES);
  }
}

function mulberryLocal(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
