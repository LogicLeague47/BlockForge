// Voxel world: chunk storage, block access, world management.
// Generation logic lives in worldgen.js.

import { Noise } from './noise.js';
import { BLOCK } from './blocks.js';
import { CHUNK_SIZE, WORLD_HEIGHT, SEA_LEVEL, BIOMES } from './constants.js';
import { generateColumn, generateFeatures, calcBiome, calcHeight } from './worldgen.js';
import { generateVillages } from './structures.js';
export { CHUNK_SIZE, WORLD_HEIGHT, SEA_LEVEL, BIOMES };

export class Chunk {
  constructor(cx, cz) {
    this.cx = cx; this.cz = cz;
    this.data = new Uint8Array(CHUNK_SIZE * WORLD_HEIGHT * CHUNK_SIZE);
    this.generated = false;
    this.surfaceMap = new Int16Array(CHUNK_SIZE * CHUNK_SIZE);
    this.biomeMap = new Int8Array(CHUNK_SIZE * CHUNK_SIZE);
  }
  idx(x, y, z) { return (y * CHUNK_SIZE + z) * CHUNK_SIZE + x; }
  get(x, y, z) { return (y < 0 || y >= WORLD_HEIGHT) ? BLOCK.AIR : this.data[this.idx(x, y, z)]; }
  set(x, y, z, v) { if (y >= 0 && y < WORLD_HEIGHT) this.data[this.idx(x, y, z)] = v; }
}

export class World {
  constructor(seed) {
    this.seed = seed || Math.floor(Math.random() * 1e9);
    this.noise = new Noise(this.seed);
    this.chunks = new Map();
    this.edits = new Map();
    this.chestInventories = new Map(); // "x,y,z" -> Array(27) of {item, count} or null

  }

  getChest(x, y, z) {
    return this.chestInventories.get(x + ',' + y + ',' + z) || null;
  }

  getOrCreateChest(x, y, z) {
    const k = x + ',' + y + ',' + z;
    if (!this.chestInventories.has(k)) {
      this.chestInventories.set(k, new Array(27).fill(null));
    }
    return this.chestInventories.get(k);
  }

  removeChest(x, y, z) {
    this.chestInventories.delete(x + ',' + y + ',' + z);
  }

  serializeChests() {
    const obj = {};
    for (const [k, v] of this.chestInventories) {
      obj[k] = v.map(s => s ? [s.item, s.count] : null);
    }
    return obj;
  }

  loadChests(obj) {
    if (!obj) return;
    for (const [k, v] of Object.entries(obj)) {
      this.chestInventories.set(k, v.map(s => s ? { item: s[0], count: s[1] } : null));
    }
  }

  key(cx, cz) { return cx + ',' + cz; }

  getChunk(cx, cz, generate = true) {
    const k = this.key(cx, cz);
    let c = this.chunks.get(k);
    if (!c) { c = new Chunk(cx, cz); this.chunks.set(k, c); if (generate) this.generateChunk(c); }
    return c;
  }

  getBlock(x, y, z) {
    if (y < 0) return BLOCK.BEDROCK;
    if (y >= WORLD_HEIGHT) return BLOCK.AIR;
    const cx = Math.floor(x / CHUNK_SIZE), cz = Math.floor(z / CHUNK_SIZE);
    return this.getChunk(cx, cz).get(x - cx * CHUNK_SIZE, y, z - cz * CHUNK_SIZE);
  }

  setBlock(x, y, z, v, recordEdit = true) {
    if (y < 0 || y >= WORLD_HEIGHT) return;
    const cx = Math.floor(x / CHUNK_SIZE), cz = Math.floor(z / CHUNK_SIZE);
    this.getChunk(cx, cz).set(x - cx * CHUNK_SIZE, y, z - cz * CHUNK_SIZE, v);
    if (recordEdit) this.edits.set(`${x},${y},${z}`, v);
  }

  generateChunk(chunk) {
    const baseX = chunk.cx * CHUNK_SIZE;
    const baseZ = chunk.cz * CHUNK_SIZE;
    const n = this.noise;

    for (let x = 0; x < CHUNK_SIZE; x++) {
      for (let z = 0; z < CHUNK_SIZE; z++) {
        const wx = baseX + x, wz = baseZ + z;
        const result = generateColumn(n, chunk, x, z, wx, wz);
        chunk.surfaceMap[z * CHUNK_SIZE + x] = result.topSolid;
        chunk.biomeMap[z * CHUNK_SIZE + x] = result.biome;
      }
    }

    generateFeatures(chunk, baseX, baseZ, n);

    // Structures (villages) — placed after terrain/features, before player edits.
    try { generateVillages(chunk, baseX, baseZ, n, this.seed, this); } catch (e) { /* never break chunk gen */ }

    for (const [key, v] of this.edits) {
      const [ex, ey, ez] = key.split(',').map(Number);
      const cx = Math.floor(ex / CHUNK_SIZE), cz = Math.floor(ez / CHUNK_SIZE);
      if (cx === chunk.cx && cz === chunk.cz) {
        chunk.set(ex - cx * CHUNK_SIZE, ey, ez - cz * CHUNK_SIZE, v);
      }
    }

    chunk.generated = true;
  }

  heightAt(wx, wz) { return calcHeight(this.noise, wx, wz); }

  biomeAt(wx, wz, y) { return calcBiome(this.noise, wx, wz, y); }

  serializeEdits() { return { seed: this.seed, edits: Array.from(this.edits.entries()), chests: this.serializeChests() }; }
  loadEdits(obj) { if (!obj || obj.edits == null) return; for (const [k, v] of obj.edits) this.edits.set(k, v); this.loadChests(obj.chests); }
}
