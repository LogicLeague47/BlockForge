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

export function calcHeight(n, wx, wz, mode) {
  const cont = n.fbm2(n.continentalness, wx * 0.005, wz * 0.005, 6, 2, 0.5);
  const erosion = n.fbm2(n.erosion, wx * 0.006, wz * 0.006, 4, 2, 0.5);
  const ridge = 1 - Math.abs(n.fbm2(n.ridge, wx * 0.007, wz * 0.007, 4, 2, 0.5));
  const detail = n.fbm2(n.detail, wx * 0.025, wz * 0.025, 4, 2, 0.5);
  const depth = n.fbm2(n.depth, wx * 0.01, wz * 0.01, 4, 2, 0.5);
  const oceanDetail = n.fbm2(n.height, wx * 0.018, wz * 0.018, 3, 2, 0.5);

  let h;
  
  // Ocean: continentalness < 0 → terrain below sea level
  if (cont < -0.2) {
    // Deep ocean with varied floor
    h = SEA_LEVEL - 6 + cont * 12 + depth * 6 + oceanDetail * 4;
  } else if (cont < 0.0) {
    // Shallow ocean → beach transition with hilly floor
    const t = (cont + 0.2) / 0.2;
    h = SEA_LEVEL - 4 + t * 8 + depth * 5 + oceanDetail * 3;
  } else {
    // Land: use erosion to control terrain height
    const baseHeight = SEA_LEVEL + 2 + cont * 16;
    const erosionFactor = 1 - erosion * 0.6;
    
    h = baseHeight + detail * 6 * erosionFactor;
    
    // Mountains
    if (cont > 0.3 && erosion < 0.2 && ridge > 0.6) {
      h += ridge * ridge * (cont - 0.3) * 80;
    }
    
    // Hills
    h += ridge * 4 * erosionFactor;
  }

  // River carving: only on land, near sea level
  if (cont > 0.05) {
    const octaves = 4;
    const riverRaw = n.river(wx * 0.012, wz * 0.012) / octaves;
    const riverVal = (riverRaw + n.fbm2(n.river, wx * 0.025, wz * 0.025, octaves, 2, 0.5) * 0.5) / 1.5;
    const riverStrength = 1 - Math.abs(riverVal) * 4;
    if (riverStrength > 0.65 && h > SEA_LEVEL - 3) {
      const carve = (riverStrength - 0.65) / 0.35;
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
    // Gentle terrain — dampen mountains and extreme features
    const deviation = h - SEA_LEVEL;
    h = SEA_LEVEL + deviation * 0.6;
  }
  
  return Math.max(2, Math.min(WORLD_HEIGHT - 6, Math.floor(h)));
}

export function calcBiome(n, wx, wz, h) {
  const t = n.fbm2(n.temp, wx * 0.004, wz * 0.004, 4, 2, 0.5);
  const hu = n.fbm2(n.humid, wx * 0.004, wz * 0.004, 4, 2, 0.5);
  const cont = n.fbm2(n.continentalness, wx * 0.005, wz * 0.005, 6, 2, 0.5);
  const erosion = n.fbm2(n.erosion, wx * 0.006, wz * 0.006, 4, 2, 0.5);

  // River: narrow water channels on land
  if (cont > 0.05 && h <= SEA_LEVEL && h >= SEA_LEVEL - 3) {
    const riverRaw = n.river(wx * 0.012, wz * 0.012);
    const riverVal = (riverRaw + n.river(wx * 0.025, wz * 0.025) * 0.5) / 1.5;
    const riverStrength = 1 - Math.abs(riverVal) * 4;
    if (riverStrength > 0.65) return BIOMES.RIVER;
  }

  // Ocean biomes (excluded from land % — ~30% of world)
  if (cont < -0.2) return h < SEA_LEVEL - 4 ? BIOMES.DEEP_OCEAN : BIOMES.OCEAN;
  
  // Beach: near sea level on coast
  if (h >= SEA_LEVEL - 1 && h <= SEA_LEVEL + 3 && cont < 0.1) return BIOMES.BEACH;
  
  // Stony Peaks (~10% of land): high continentalness + low erosion
  if (cont > 0.3 && erosion < 0.2) return BIOMES.MOUNTAINS;
  
  // Snowy Forest (~10% of land): cold temperatures
  if (t < -0.4) return hu > 0.1 ? BIOMES.TAIGA : BIOMES.SNOWY;
  
  // Forest (~25% of land): cool to mild with humidity
  if (t < 0.3 && hu > -0.1) {
    if (hu > 0.4) return BIOMES.DARK_FOREST;
    if (hu > 0.15) return BIOMES.FOREST;
    if (hu > 0.05) return BIOMES.BIRCH_FOREST;
    return BIOMES.FOREST;
  }
  
  // Plains (~31% of land): moderate temperatures, default
  if (t < 0.5) {
    if (hu > 0.3 && hu < 0.5) return BIOMES.FOREST;
    return BIOMES.PLAINS;
  }
  
  // Other (~24% of land): hot climates (desert, jungle, savanna)
  if (hu < -0.1) return BIOMES.DESERT;
  if (hu > 0.3) return BIOMES.JUNGLE;
  if (hu > 0.05) return BIOMES.SAVANNA;
  return BIOMES.PLAINS;
}

export function surfBlock(biome, h) {
  // Minecraft rule: underwater terrain uses sand/gravel, not grass
  if (h < SEA_LEVEL) return BLOCK.SAND;
  
  switch (biome) {
    case BIOMES.BEACH:       return BLOCK.SAND;
    case BIOMES.OCEAN:       return BLOCK.SAND;
    case BIOMES.DEEP_OCEAN:  return BLOCK.SAND;
    case BIOMES.DESERT:      return BLOCK.SAND;
    case BIOMES.RIVER:       return BLOCK.SAND;
    case BIOMES.SNOWY:       return BLOCK.SNOW_BLOCK;
    case BIOMES.MOUNTAINS:   return h > SEA_LEVEL + 25 ? BLOCK.STONE : (h > SEA_LEVEL + 18 ? BLOCK.DIRT : BLOCK.GRASS);
    case BIOMES.TAIGA:       return BLOCK.GRASS;
    case BIOMES.JUNGLE:      return BLOCK.GRASS;
    default:                 return BLOCK.GRASS;
  }
}

export function fillBlock(biome, h) {
  // Underwater fill is sand/gravel
  if (h < SEA_LEVEL) return BLOCK.SAND;
  
  switch (biome) {
    case BIOMES.BEACH:       return BLOCK.SAND;
    case BIOMES.OCEAN:       return BLOCK.SAND;
    case BIOMES.DEEP_OCEAN:  return BLOCK.SAND;
    case BIOMES.RIVER:       return BLOCK.SAND;
    case BIOMES.DESERT:      return BLOCK.SAND;
    case BIOMES.MOUNTAINS:   return BLOCK.STONE;
    default:                 return BLOCK.DIRT;
  }
}

export function generateColumn(n, chunk, x, z, wx, wz, mode) {
  const h = calcHeight(n, wx, wz, mode);
  const biome = calcBiome(n, wx, wz, h);
  const surf = surfBlock(biome, h);
  const sub = fillBlock(biome, h);

  let topSolid = -1;
  for (let y = 0; y <= h; y++) {
    let b;
    if (y === 0) b = BLOCK.BEDROCK;
    else if (y === h) b = surf;
    else if (y > h - 4) b = sub;
    else b = BLOCK.STONE;

    if (y > 2 && y < h - 3) {
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

    chunk.set(x, y, z, b);
    if (b !== BLOCK.AIR) topSolid = y;
  }

  if (h < SEA_LEVEL) {
    for (let y = h + 1; y <= SEA_LEVEL; y++) chunk.set(x, y, z, BLOCK.WATER);
  }

  return { h, biome, topSolid };
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
  for (const spec of ORE_VEINS) {
    const { block, minY, maxY, attempts, minSize, maxSize, shape } = spec;
    const seed = (baseX * 73856093) ^ (baseZ * 19349663) ^ (block * 83492791);
    const rng = mulberryLocal(seed >>> 0);

    for (let a = 0; a < attempts; a++) {
      const x = (rng() * CHUNK_SIZE) | 0;
      const z = (rng() * CHUNK_SIZE) | 0;
      const y = minY + ((rng() * (maxY - minY + 1)) | 0);
      if (y < 0 || y >= WORLD_HEIGHT) continue;
      if (!isStone(chunk.get(x, y, z))) continue;

      const veinSize = minSize + ((rng() * (maxSize - minSize + 1)) | 0);
      const clusterSeed = (seed + a * 7919) >>> 0;
      const clusterRng = mulberryLocal(clusterSeed);
      placeOreCluster(chunk, x, y, z, block, veinSize, shape, clusterRng);
    }

    // Extra ore attempts in deepslate zone (Y < 4) — "more ores"
    if (minY < 4) {
      const extra = Math.max(1, (attempts * 0.5) | 0);
      for (let a = 0; a < extra; a++) {
        const x = (rng() * CHUNK_SIZE) | 0;
        const z = (rng() * CHUNK_SIZE) | 0;
        const y = 1 + ((rng() * 3) | 0);
        if (!isStone(chunk.get(x, y, z))) continue;
        const veinSize = minSize + ((rng() * (maxSize - minSize + 1)) | 0);
        const cs = (seed + a * 7919 + 0xDEADBEEF) >>> 0;
        placeOreCluster(chunk, x, y, z, block, veinSize, shape, mulberryLocal(cs));
      }
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
            const isDripstone = y >= 30 && y <= 50 && rng() < 0.4;
            placeStalactite(chunk, x, y, z, height, isDripstone ? BLOCK.STONE : BLOCK.STONE);
          }
        }

        // Stalagmite: air above stone floor
        if (isStone(below) && above === BLOCK.AIR) {
          const wx = baseX + x, wz = baseZ + z;
          const seed = (wx * 73856093) ^ (wz * 19349663) ^ (y * 83492791 + 1);
          const rng = mulberryLocal(seed >>> 0);
          if (rng() < 0.12) {
            const height = 1 + ((rng() * 3) | 0);
            const isDripstone = y >= 30 && y <= 50 && rng() < 0.4;
            placeStalagmite(chunk, x, y, z, height, isDripstone ? BLOCK.STONE : BLOCK.STONE);
          }
        }
      }
    }
  }
}

// --- Underground Lakes ---

function generateUndergroundLakes(chunk) {
  for (let x = 2; x < CHUNK_SIZE - 2; x++) {
    for (let z = 2; z < CHUNK_SIZE - 2; z++) {
      for (let y = 2; y < 32; y++) {
        if (chunk.get(x, y, z) !== BLOCK.AIR) continue;
        const floor = chunk.get(x, y - 1, z);
        if (!isStone(floor) && floor !== BLOCK.DIRT && floor !== BLOCK.SAND) continue;

        const wx = x, wz = z;
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

export function generateUnderground(chunk, baseX, baseZ, n) {
  applyDeepslateBiome(chunk);
  generateOreVeins(chunk, baseX, baseZ);
  widenLavaCaverns(chunk, baseX, baseZ, n);
  generateCaveDecorations(chunk, baseX, baseZ);
  generateUndergroundLakes(chunk);
}

function placeFeature(chunk, x, h, z, biome, roll, local, top) {
  switch (biome) {
    case BIOMES.DARK_FOREST:
      if (roll < 0.12 && top === BLOCK.GRASS) plantTree(chunk, x, h + 1, z, local, 'oak');
      else if (roll < 0.18 && top === BLOCK.GRASS)
        chunk.set(x, h + 1, z, local() < 0.5 ? BLOCK.FLOWER_RED : BLOCK.FLOWER_YELLOW);
      break;
    case BIOMES.FOREST:
      if (roll < 0.04 && top === BLOCK.GRASS) plantTree(chunk, x, h + 1, z, local, 'large_oak');
      else if (roll < 0.09 && top === BLOCK.GRASS) plantTree(chunk, x, h + 1, z, local, 'oak');
      else if (roll < 0.13 && top === BLOCK.GRASS)
        chunk.set(x, h + 1, z, local() < 0.5 ? BLOCK.FLOWER_RED : BLOCK.FLOWER_YELLOW);
      break;
    case BIOMES.BIRCH_FOREST:
      if (roll < 0.10 && top === BLOCK.GRASS) plantTree(chunk, x, h + 1, z, local, 'birch');
      break;
    case BIOMES.TAIGA:
      if (roll < 0.06 && top === BLOCK.GRASS)
        plantTree(chunk, x, h + 1, z, local, 'taiga');
      break;
    case BIOMES.JUNGLE:
      if (roll < 0.07 && top === BLOCK.GRASS) plantTree(chunk, x, h + 1, z, local, 'jungle');
      else if (roll < 0.14 && top === BLOCK.GRASS) chunk.set(x, h + 1, z, BLOCK.FLOWER_RED);
      break;
    case BIOMES.SAVANNA:
      if (roll < 0.015 && top === BLOCK.GRASS) plantTree(chunk, x, h + 1, z, local, 'large_oak');
      else if (roll < 0.030 && top === BLOCK.GRASS) plantTree(chunk, x, h + 1, z, local, 'savanna');
      else if (roll < 0.040 && top === BLOCK.GRASS) plantTree(chunk, x, h + 1, z, local, 'dead');
      break;
    case BIOMES.PLAINS:
      if (roll < 0.04 && top === BLOCK.GRASS)
        chunk.set(x, h + 1, z, local() < 0.5 ? BLOCK.FLOWER_RED : BLOCK.FLOWER_YELLOW);
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
      if (roll < 0.015 && top === BLOCK.SNOW_BLOCK)
        plantTree(chunk, x, h + 1, z, local, 'taiga');
      break;
    case BIOMES.SWAMP:
      if (roll < 0.04 && top === BLOCK.GRASS) plantTree(chunk, x, h + 1, z, local, 'swamp');
      else if (roll < 0.08 && top === BLOCK.GRASS) plantBush(chunk, x, h + 1, z, local);
      else if (roll < 0.12 && top === BLOCK.GRASS) chunk.set(x, h + 1, z, BLOCK.FLOWER_RED);
      break;
  }
}

export function plantTree(chunk, x, y, z, rng, type) {
  let trunkBlock, leafBlock, trunkH, leafRadius;
  switch (type) {
    case 'jungle':
      trunkBlock = BLOCK.JUNGLE_WOOD; leafBlock = BLOCK.LEAVES;
      trunkH = 4 + ((rng() * 4) | 0); leafRadius = 2; break;
    case 'taiga':
      trunkBlock = BLOCK.WOOD; leafBlock = BLOCK.DARK_OAK_LEAVES;
      trunkH = 4 + ((rng() * 3) | 0); leafRadius = 1; break;
    case 'birch':
      trunkBlock = BLOCK.WOOD; leafBlock = BLOCK.LEAVES;
      trunkH = 5 + ((rng() * 3) | 0); leafRadius = 2; break;
    case 'savanna':
      trunkBlock = BLOCK.WOOD; leafBlock = BLOCK.LEAVES;
      trunkH = 3 + ((rng() * 2) | 0); leafRadius = 2; break;
    case 'swamp':
      trunkBlock = BLOCK.WOOD; leafBlock = BLOCK.LEAVES;
      trunkH = 3 + ((rng() * 2) | 0); leafRadius = 2; break;
    case 'large_oak':
      trunkBlock = BLOCK.WOOD; leafBlock = BLOCK.LEAVES;
      trunkH = 6 + ((rng() * 2) | 0); leafRadius = 3; break;
    case 'dead':
      trunkBlock = BLOCK.WOOD; leafBlock = null;
      trunkH = 3 + ((rng() * 4) | 0); leafRadius = 0; break;
    default:
      trunkBlock = BLOCK.WOOD; leafBlock = BLOCK.LEAVES;
      trunkH = 4 + ((rng() * 3) | 0); leafRadius = 2;
  }
  for (let i = 0; i < trunkH; i++) {
    if (y + i < WORLD_HEIGHT) chunk.set(x, y + i, z, trunkBlock);
  }
  if (!leafBlock) return;
  const top = y + trunkH;
  for (let ly = -leafRadius; ly <= 1; ly++) {
    const r = ly <= 0 ? leafRadius : Math.max(1, leafRadius - 1);
    for (let dx = -r; dx <= r; dx++) {
      for (let dz = -r; dz <= r; dz++) {
        if (Math.abs(dx) === r && Math.abs(dz) === r && rng() < 0.4) continue;
        const lx = x + dx, layerY = top + ly, lz = z + dz;
        if (lx < 0 || lx >= CHUNK_SIZE || lz < 0 || lz >= CHUNK_SIZE) continue;
        if (layerY >= WORLD_HEIGHT) continue;
        if (chunk.get(lx, layerY, lz) === BLOCK.AIR) chunk.set(lx, layerY, lz, leafBlock);
      }
    }
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
