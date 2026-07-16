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
  constructor(seed, opts = {}) {
    this.seed = seed || Math.floor(Math.random() * 1e9);
    this.noise = new Noise(this.seed);
    this.chunks = new Map();
    this.edits = new Map();
    this._chunkEdits = new Map(); // "cx,cz" -> Map<"x,y,z", blockId> for O(1) lookup
    this.chestInventories = new Map(); // "x,y,z" -> Array(27) of {item, count} or null
    this.flat = !!opts.flat;
    this.parkour = !!opts.parkour;
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
    if (y < 0) return this.parkour ? BLOCK.AIR : BLOCK.BEDROCK;
    if (y >= WORLD_HEIGHT) return BLOCK.AIR;
    const cx = Math.floor(x / CHUNK_SIZE), cz = Math.floor(z / CHUNK_SIZE);
    return this.getChunk(cx, cz).get(x - cx * CHUNK_SIZE, y, z - cz * CHUNK_SIZE);
  }

  setBlock(x, y, z, v, recordEdit = true) {
    if (y < 0 || y >= WORLD_HEIGHT) return;
    const cx = Math.floor(x / CHUNK_SIZE), cz = Math.floor(z / CHUNK_SIZE);
    this.getChunk(cx, cz).set(x - cx * CHUNK_SIZE, y, z - cz * CHUNK_SIZE, v);
    if (recordEdit) {
      this.edits.set(`${x},${y},${z}`, v);
      // Index by chunk for O(1) lookup during generation
      const ck = this.key(cx, cz);
      let cm = this._chunkEdits.get(ck);
      if (!cm) { cm = new Map(); this._chunkEdits.set(ck, cm); }
      cm.set(`${x},${y},${z}`, v);
    }
  }

  generateChunk(chunk) {
    const baseX = chunk.cx * CHUNK_SIZE;
    const baseZ = chunk.cz * CHUNK_SIZE;
    const n = this.noise;

    if (this.parkour) {
      // Void world — only set surface/biome defaults, no terrain
      for (let x = 0; x < CHUNK_SIZE; x++) {
        for (let z = 0; z < CHUNK_SIZE; z++) {
          chunk.surfaceMap[z * CHUNK_SIZE + x] = 0;
          chunk.biomeMap[z * CHUNK_SIZE + x] = BIOMES.PLAINS;
        }
      }
    } else if (this.flat) {
      // Superflat: bedrock, 2 dirt, grass on top at y=3. Great for testing.
      const FLAT_TOP = 3;
      for (let x = 0; x < CHUNK_SIZE; x++) {
        for (let z = 0; z < CHUNK_SIZE; z++) {
          chunk.set(x, 0, z, BLOCK.BEDROCK);
          chunk.set(x, 1, z, BLOCK.DIRT);
          chunk.set(x, 2, z, BLOCK.DIRT);
          chunk.set(x, FLAT_TOP, z, BLOCK.GRASS);
          chunk.surfaceMap[z * CHUNK_SIZE + x] = FLAT_TOP;
          chunk.biomeMap[z * CHUNK_SIZE + x] = BIOMES.PLAINS;
        }
      }
    } else {
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
    }

    // Apply player edits for this chunk — O(1) lookup via _chunkEdits index
    const chunkKey = this.key(chunk.cx, chunk.cz);
    const chunkEdits = this._chunkEdits.get(chunkKey);
    if (chunkEdits) {
      for (const [key, v] of chunkEdits) {
        const ci = key.indexOf(',');
        const ci2 = key.indexOf(',', ci + 1);
        const ex = +key.slice(0, ci);
        const ey = +key.slice(ci + 1, ci2);
        const ez = +key.slice(ci2 + 1);
        chunk.set(ex - chunk.cx * CHUNK_SIZE, ey, ez - chunk.cz * CHUNK_SIZE, v);
      }
    }

    chunk.generated = true;
  }

  // Evict generated chunk data (not meshes) outside the given chunk radius.
  // Edits, chests, and the RNG seed live elsewhere, so evicted chunks
  // regenerate identically on demand. Prevents unbounded memory growth.
  evictFar(pcx, pcz, limit) {
    for (const k of this.chunks.keys()) {
      const ci = k.indexOf(',');
      const cx = +k.slice(0, ci), cz = +k.slice(ci + 1);
      if (Math.abs(cx - pcx) > limit || Math.abs(cz - pcz) > limit) {
        this.chunks.delete(k);
      }
    }
  }

  heightAt(wx, wz) {
    const cx = Math.floor(wx / CHUNK_SIZE), cz = Math.floor(wz / CHUNK_SIZE);
    const c = this.chunks.get(this.key(cx, cz));
    if (c && c.generated) {
      const lx = wx - cx * CHUNK_SIZE, lz = wz - cz * CHUNK_SIZE;
      return c.surfaceMap[lz * CHUNK_SIZE + lx];
    }
    return calcHeight(this.noise, wx, wz);
  }

  biomeAt(wx, wz, y) {
    const cx = Math.floor(wx / CHUNK_SIZE), cz = Math.floor(wz / CHUNK_SIZE);
    const c = this.chunks.get(this.key(cx, cz));
    if (c && c.generated) {
      const lx = wx - cx * CHUNK_SIZE, lz = wz - cz * CHUNK_SIZE;
      return c.biomeMap[lz * CHUNK_SIZE + lx];
    }
    return calcBiome(this.noise, wx, wz, y);
  }

  serializeEdits() { return { seed: this.seed, edits: Array.from(this.edits.entries()), chests: this.serializeChests() }; }
  loadEdits(obj) { if (!obj || obj.edits == null) return; for (const [k, v] of obj.edits) this.edits.set(k, v); this.loadChests(obj.chests); }
}
