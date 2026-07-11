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

// Large prime XOR offsets to spread each noise layer across the full 32-bit range
const LAYER_SEED = [
  0x9E3779B9, 0xBF58476D, 0x6A09E667, 0xBB67AE85,
  0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C,
  0x1F83D9AB, 0x5BE0CD19, 0x243F6A88, 0xC0D16F47,
  0x7A1542D3, 0x41C63B2D,
];

export class Noise {
  constructor(seed) {
    // Use the raw integer seed directly — no string conversion
    const base = (typeof seed === 'number') ? (seed | 0) : hashSeed(String(seed));

    // Each noise layer gets its own independent PRNG seeded with XOR of base + unique constant
    this.height        = createNoise2D(mulberry32(base ^ LAYER_SEED[0]));
    this.detail        = createNoise2D(mulberry32(base ^ LAYER_SEED[1]));
    this.ridge         = createNoise2D(mulberry32(base ^ LAYER_SEED[2]));
    this.temp          = createNoise2D(mulberry32(base ^ LAYER_SEED[3]));
    this.humid         = createNoise2D(mulberry32(base ^ LAYER_SEED[4]));
    this.cave          = createNoise3D(mulberry32(base ^ LAYER_SEED[5]));
    this.cave2         = createNoise3D(mulberry32(base ^ LAYER_SEED[6]));
    this.ore           = createNoise3D(mulberry32(base ^ LAYER_SEED[7]));
    this.treeRng       = mulberry32(base ^ LAYER_SEED[8]);
    this.continentalness = createNoise2D(mulberry32(base ^ LAYER_SEED[9]));
    this.erosion       = createNoise2D(mulberry32(base ^ LAYER_SEED[10]));
    this.weirdness     = createNoise2D(mulberry32(base ^ LAYER_SEED[11]));
    this.depth         = createNoise2D(mulberry32(base ^ LAYER_SEED[12]));
    this.rng           = mulberry32(base ^ LAYER_SEED[13]);
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
