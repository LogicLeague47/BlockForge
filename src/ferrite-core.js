// FerriteCore-Inspired Memory Footprint Optimization & State Deduplication Module
// Eliminates redundant object allocations, deduplicates block states, and pools typed arrays.

export class FerriteCoreOptimizer {
  constructor() {
    this.stateRegistry = new Map();
    this.arrayPool = {
      positions: [],
      uvs: [],
      colors: [],
      normals: [],
      indices: []
    };
    this.stats = {
      statesDeduplicated: 0,
      memorySavedBytes: 0,
      arraysRecycled: 0
    };
  }

  // Deduplicate block state objects to minimize garbage collection pressure
  internBlockState(blockId, metadata = 0, properties = {}) {
    const propKey = JSON.stringify(properties);
    const hash = (blockId << 12) ^ (metadata << 8) ^ hashCode(propKey);
    
    if (this.stateRegistry.has(hash)) {
      this.stats.statesDeduplicated++;
      this.stats.memorySavedBytes += 64; // Estimated object overhead saved
      return this.stateRegistry.get(hash);
    }

    const state = Object.freeze({
      id: blockId,
      meta: metadata,
      props: Object.freeze({...properties}),
      opaque: blockId !== 0,
      lightValue: 0
    });

    this.stateRegistry.set(hash, state);
    return state;
  }

  // Typed array memory pooling to avoid GC pauses during chunk meshing
  borrowArray(type, length) {
    const pool = this.arrayPool[type];
    if (pool && pool.length > 0) {
      for (let i = 0; i < pool.length; i++) {
        const arr = pool[i];
        if (arr.length >= length) {
          pool.splice(i, 1);
          this.stats.arraysRecycled++;
          return arr.subarray(0, length);
        }
      }
    }

    switch (type) {
      case 'positions':
      case 'normals':
      case 'colors':
        return new Float32Array(length);
      case 'uvs':
        return new Float32Array(length);
      case 'indices':
        return new Uint32Array(length);
      default:
        return new Float32Array(length);
    }
  }

  returnArray(type, array) {
    if (!array || !this.arrayPool[type]) return;
    if (this.arrayPool[type].length < 128) {
      this.arrayPool[type].push(array);
    }
  }

  getMetrics() {
    return { ...this.stats, registrySize: this.stateRegistry.size };
  }
}

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return hash;
}

export const globalFerriteCore = new FerriteCoreOptimizer();
