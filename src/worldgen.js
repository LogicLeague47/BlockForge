// World generation - height, biomes, features, ores, caves.
// All pure functions. world.js calls into this module.

import { BLOCK } from './blocks.js';
import { CHUNK_SIZE, WORLD_HEIGHT, SEA_LEVEL, BIOMES } from './constants.js';

// Minecraft ore distribution (scaled to WORLD_HEIGHT=128)
// Coal: Y 1-96, very common. Iron: Y 1-64, common.
// Gold: Y 1-32, uncommon. Diamond: Y 1-16, very rare.
const ORE_SPEC = [
  { block: BLOCK.COAL_ORE,    surfaceDepth: 2,  threshold: 0.80, min: 1, max: 96 },
  { block: BLOCK.IRON_ORE,    surfaceDepth: 5,  threshold: 0.85, min: 1, max: 64 },
  { block: BLOCK.GOLD_ORE,    surfaceDepth: 10, threshold: 0.90, min: 1, max: 32 },
  { block: BLOCK.DIAMOND_ORE, surfaceDepth: 16, threshold: 0.95, min: 1, max: 16 },
];

export function calcHeight(n, wx, wz) {
  const cont = n.fbm2(n.continentalness, wx * 0.003, wz * 0.003, 6, 2, 0.5);
  const erosion = n.fbm2(n.erosion, wx * 0.004, wz * 0.004, 4, 2, 0.5);
  const ridge = 1 - Math.abs(n.fbm2(n.ridge, wx * 0.005, wz * 0.005, 4, 2, 0.5));
  const detail = n.fbm2(n.detail, wx * 0.02, wz * 0.02, 4, 2, 0.5);
  const depth = n.fbm2(n.depth, wx * 0.008, wz * 0.008, 4, 2, 0.5);
  const oceanDetail = n.fbm2(n.height, wx * 0.015, wz * 0.015, 3, 2, 0.5);

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

  // Fine detail everywhere
  h += n.fbm2(n.detail, wx * 0.04, wz * 0.04, 3, 2, 0.5) * 2;
  
  return Math.max(2, Math.min(WORLD_HEIGHT - 6, Math.floor(h)));
}

export function calcBiome(n, wx, wz, h) {
  const t = n.fbm2(n.temp, wx * 0.002, wz * 0.002, 4, 2, 0.5);
  const hu = n.fbm2(n.humid, wx * 0.002, wz * 0.002, 4, 2, 0.5);
  const cont = n.fbm2(n.continentalness, wx * 0.003, wz * 0.003, 6, 2, 0.5);
  const erosion = n.fbm2(n.erosion, wx * 0.004, wz * 0.004, 4, 2, 0.5);

  // Ocean biomes (continentalness < 0)
  if (cont < -0.2) return h < SEA_LEVEL - 4 ? BIOMES.DEEP_OCEAN : BIOMES.OCEAN;
  
  // Beach: near sea level on coast
  if (h >= SEA_LEVEL - 1 && h <= SEA_LEVEL + 3 && cont < 0.1) return BIOMES.BEACH;
  
  // Mountains: high continentalness + low erosion
  if (cont > 0.3 && erosion < 0.2) return BIOMES.MOUNTAINS;
  
  // Temperature-based biomes (with humidity)
  if (t < -0.55) return BIOMES.SNOWY;
  if (t < 0.0) {
    if (hu > 0.1) return BIOMES.TAIGA;
    return BIOMES.FOREST;
  }
  if (t < 0.3) {
    if (hu > 0.25) return BIOMES.DARK_FOREST;
    if (hu > 0.05) return BIOMES.FOREST;
    if (hu > -0.1) return BIOMES.BIRCH_FOREST;
    return BIOMES.PLAINS;
  }
  if (t < 0.5) {
    if (hu > 0.2) return BIOMES.JUNGLE;
    return hu > -0.1 ? BIOMES.SAVANNA : BIOMES.PLAINS;
  }
  if (hu < -0.1) return BIOMES.DESERT;
  return hu > 0.15 ? BIOMES.JUNGLE : BIOMES.SAVANNA;
}

export function surfBlock(biome, h) {
  // Minecraft rule: underwater terrain uses sand/gravel, not grass
  if (h < SEA_LEVEL) return BLOCK.SAND;
  
  switch (biome) {
    case BIOMES.BEACH:       return BLOCK.SAND;
    case BIOMES.OCEAN:       return BLOCK.SAND;
    case BIOMES.DEEP_OCEAN:  return BLOCK.SAND;
    case BIOMES.DESERT:      return BLOCK.SAND;
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
    case BIOMES.DESERT:      return BLOCK.SAND;
    case BIOMES.MOUNTAINS:   return BLOCK.STONE;
    default:                 return BLOCK.DIRT;
  }
}

export function generateColumn(n, chunk, x, z, wx, wz) {
  const h = calcHeight(n, wx, wz);
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
      if (Math.abs(c1) < 0.06 && Math.abs(c2) < 0.06) b = BLOCK.AIR;
    }

    if (b === BLOCK.STONE) {
      for (const o of ORE_SPEC) {
        if (y >= o.min && y <= o.max && (h - y) >= o.surfaceDepth) {
          const v = n.ore(wx * 0.1 + o.block, y * 0.1, wz * 0.1);
          if (v > o.threshold) { b = o.block; break; }
        }
      }
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

function placeFeature(chunk, x, h, z, biome, roll, local, top) {
  switch (biome) {
    case BIOMES.DARK_FOREST:
      if (roll < 0.12 && top === BLOCK.GRASS) plantTree(chunk, x, h + 1, z, local, 'oak');
      else if (roll < 0.18 && top === BLOCK.GRASS)
        chunk.set(x, h + 1, z, local() < 0.5 ? BLOCK.FLOWER_RED : BLOCK.FLOWER_YELLOW);
      break;
    case BIOMES.FOREST:
      if (roll < 0.09 && top === BLOCK.GRASS) plantTree(chunk, x, h + 1, z, local, 'oak');
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
      if (roll < 0.035 && top === BLOCK.GRASS) plantTree(chunk, x, h + 1, z, local, 'savanna');
      break;
    case BIOMES.PLAINS:
      if (roll < 0.015 && top === BLOCK.GRASS) plantTree(chunk, x, h + 1, z, local, 'oak');
      else if (roll < 0.08 && top === BLOCK.GRASS)
        chunk.set(x, h + 1, z, local() < 0.5 ? BLOCK.FLOWER_RED : BLOCK.FLOWER_YELLOW);
      break;
    case BIOMES.DESERT:
      if (roll < 0.02 && top === BLOCK.SAND) {
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
      if (roll < 0.05 && top === BLOCK.GRASS) plantTree(chunk, x, h + 1, z, local, 'swamp');
      else if (roll < 0.09 && top === BLOCK.GRASS) chunk.set(x, h + 1, z, BLOCK.FLOWER_RED);
      break;
  }
}

export function plantTree(chunk, x, y, z, rng, type) {
  let trunkBlock, leafBlock, trunkH, leafRadius;
  switch (type) {
    case 'jungle':
      trunkBlock = BLOCK.JUNGLE_WOOD; leafBlock = BLOCK.LEAVES;
      trunkH = 4 + ((rng() * 3) | 0); leafRadius = 2; break;
    case 'taiga':
      trunkBlock = BLOCK.WOOD; leafBlock = BLOCK.DARK_OAK_LEAVES;
      trunkH = 4 + ((rng() * 3) | 0); leafRadius = 1; break;
    case 'birch':
      trunkBlock = BLOCK.WOOD; leafBlock = BLOCK.LEAVES;
      trunkH = 5 + ((rng() * 2) | 0); leafRadius = 2; break;
    case 'savanna':
      trunkBlock = BLOCK.WOOD; leafBlock = BLOCK.LEAVES;
      trunkH = 3 + ((rng() * 2) | 0); leafRadius = 2; break;
    case 'swamp':
      trunkBlock = BLOCK.WOOD; leafBlock = BLOCK.LEAVES;
      trunkH = 3 + ((rng() * 2) | 0); leafRadius = 2; break;
    default:
      trunkBlock = BLOCK.WOOD; leafBlock = BLOCK.LEAVES;
      trunkH = 4 + ((rng() * 2) | 0); leafRadius = 2;
  }
  for (let i = 0; i < trunkH; i++) {
    if (y + i < WORLD_HEIGHT) chunk.set(x, y + i, z, trunkBlock);
  }
  const top = y + trunkH;
  for (let ly = -leafRadius; ly <= 1; ly++) {
    const r = ly <= 0 ? leafRadius : Math.max(1, leafRadius - 1);
    for (let dx = -r; dx <= r; dx++) {
      for (let dz = -r; dz <= r; dz++) {
        if (Math.abs(dx) === r && Math.abs(dz) === r && rng() < 0.4) continue;
        const lx = x + dx, ly2 = top + ly, lz = z + dz;
        if (lx < 0 || lx >= CHUNK_SIZE || lz < 0 || lz >= CHUNK_SIZE) continue;
        if (ly2 >= WORLD_HEIGHT) continue;
        if (chunk.get(lx, ly2, lz) === BLOCK.AIR) chunk.set(lx, ly2, lz, leafBlock);
      }
    }
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
