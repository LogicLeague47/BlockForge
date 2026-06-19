// Thin wrapper around simplex-noise that gives us deterministic, seedable
// noise functions for terrain. We spin up several independent noise layers:
//   - continents / base height
//   - biome temperature
//   - biome humidity
//   - mountain ridges
//   - 3D cave noise
//   - tree scatter
import { createNoise2D, createNoise3D } from 'simplex-noise';

// Hashable string -> 32-bit int for seeding alea/simplex.
export function hashSeed(str) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// Simple PRNG (mulberry32) used to seed each noise layer differently.
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export class Noise {
  constructor(seedStr) {
    const base = hashSeed(String(seedStr));
    const rng = mulberry32(base);
    this.height   = createNoise2D(mulberry32(base + 1));
    this.detail   = createNoise2D(mulberry32(base + 2));
    this.ridge    = createNoise2D(mulberry32(base + 3));
    this.temp     = createNoise2D(mulberry32(base + 4));
    this.humid    = createNoise2D(mulberry32(base + 5));
    this.cave      = createNoise3D(mulberry32(base + 6));
    this.cave2     = createNoise3D(mulberry32(base + 7));
    this.ore       = createNoise3D(mulberry32(base + 8));
    this.treeRng   = mulberry32(base + 9);   // deterministic per-block scatter
    // Minecraft-style biome noise layers
    this.continentalness = createNoise2D(mulberry32(base + 10));
    this.erosion         = createNoise2D(mulberry32(base + 11));
    this.weirdness       = createNoise2D(mulberry32(base + 12));
    this.depth           = createNoise2D(mulberry32(base + 13));
    this.rng = rng;
  }

  // Fractal Brownian motion (stacked octaves) in 2D, returns ~[-1,1].
  fbm2(fn, x, z, octaves = 4, lacunarity = 2, gain = 0.5) {
    let amp = 1, freq = 1, sum = 0, norm = 0;
    for (let i = 0; i < octaves; i++) {
      sum += amp * fn(x * freq, z * freq);
      norm += amp;
      amp *= gain; freq *= lacunarity;
    }
    return sum / norm;
  }
}
