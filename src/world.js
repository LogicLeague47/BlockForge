// Voxel world: chunk storage, block access, world management.
// Generation logic lives in worldgen.js.

import { Noise } from './noise.js';
import { BLOCK } from './blocks.js';
import { CHUNK_SIZE, WORLD_HEIGHT, SEA_LEVEL, BIOMES } from './constants.js';
import { generateColumn, generateFeatures, generateUnderground, calcBiome, calcHeight, generateDimensionColumn, generateDimensionFeatures } from './worldgen.js';
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
    this._chunkEdits = new Map(); // numKey(cx,cz) -> Map<numBlockKey, blockId>
    this.doubleSlabs = new Map(); // "x,y,z" -> [bottomSlabId, topSlabId] mixed doubles
    this.chestInventories = new Map(); // numBlockKey -> Array(27) of {item, count} or null
    this.furnaceEntities = new Map(); // numBlockKey -> { input, fuel, output, burnTime, maxBurnTime, smeltTime }
    this.editSeq = 0;
    this.flat = !!opts.flat;
    this.void = !!opts.void;
    this.parkour = !!opts.parkour;
    this.amplified = !!opts.amplified;
    this.weird = !!opts.weird;
    this.dimension = !!opts.dimension;
  }

  getChest(x, y, z) {
    return this.chestInventories.get(x * 1000000 + y * 1000 + z) || null;
  }

  getOrCreateChest(x, y, z) {
    const k = x * 1000000 + y * 1000 + z;
    if (!this.chestInventories.has(k)) {
      this.chestInventories.set(k, new Array(27).fill(null));
    }
    return this.chestInventories.get(k);
  }

  removeChest(x, y, z) {
    this.chestInventories.delete(x * 1000000 + y * 1000 + z);
  }

  getFurnace(x, y, z) {
    return this.furnaceEntities.get(x * 1000000 + y * 1000 + z) || null;
  }

  getOrCreateFurnace(x, y, z) {
    const k = x * 1000000 + y * 1000 + z;
    if (!this.furnaceEntities.has(k)) {
      this.furnaceEntities.set(k, { input: null, fuel: null, output: null, burnTime: 0, maxBurnTime: 0, smeltTime: 0 });
    }
    return this.furnaceEntities.get(k);
  }

  removeFurnace(x, y, z) {
    this.furnaceEntities.delete(x * 1000000 + y * 1000 + z);
  }

  serializeChests() {
    const obj = {};
    for (const [k, v] of this.chestInventories) {
      const x = (k / 1000000) | 0;
      const rem = k - x * 1000000;
      const y = (rem / 1000) | 0;
      const z = rem - y * 1000;
      obj[x + ',' + y + ',' + z] = v.map(s => s ? [s.item, s.count] : null);
    }
    return obj;
  }

  serializeFurnaces() {
    const obj = {};
    for (const [k, v] of this.furnaceEntities) {
      const x = (k / 1000000) | 0;
      const rem = k - x * 1000000;
      const y = (rem / 1000) | 0;
      const z = rem - y * 1000;
      obj[x + ',' + y + ',' + z] = {
        input: v.input ? [v.input.item, v.input.count] : null,
        fuel: v.fuel ? [v.fuel.item, v.fuel.count] : null,
        output: v.output ? [v.output.item, v.output.count] : null,
        burnTime: v.burnTime,
        maxBurnTime: v.maxBurnTime,
        smeltTime: v.smeltTime,
      };
    }
    return obj;
  }

  loadChests(obj) {
    if (!obj) return;
    for (const [k, v] of Object.entries(obj)) {
      const ci = k.indexOf(',');
      const ci2 = k.indexOf(',', ci + 1);
      const x = +k.slice(0, ci);
      const y = +k.slice(ci + 1, ci2);
      const z = +k.slice(ci2 + 1);
      this.chestInventories.set(x * 1000000 + y * 1000 + z, v.map(s => s ? { item: s[0], count: s[1] } : null));
    }
  }

  loadFurnaces(obj) {
    if (!obj) return;
    for (const [k, v] of Object.entries(obj)) {
      const ci = k.indexOf(',');
      const ci2 = k.indexOf(',', ci + 1);
      const x = +k.slice(0, ci);
      const y = +k.slice(ci + 1, ci2);
      const z = +k.slice(ci2 + 1);
      this.furnaceEntities.set(x * 1000000 + y * 1000 + z, {
        input: v.input ? { item: v.input[0], count: v.input[1] } : null,
        fuel: v.fuel ? { item: v.fuel[0], count: v.fuel[1] } : null,
        output: v.output ? { item: v.output[0], count: v.output[1] } : null,
        burnTime: v.burnTime || 0,
        maxBurnTime: v.maxBurnTime || 0,
        smeltTime: v.smeltTime || 0,
      });
    }
  }

  // Numeric chunk key — avoids string allocation in hot loops (meshing).
  // Unique for |cz| < 32768 chunks (≈ ±524k blocks). Plenty for any world.
  numKey(cx, cz) { return cx * 32768 + cz; }

  // String chunk key — kept for compatibility with legacy systems (serialization, etc.)
  key(cx, cz) { return cx + ',' + cz; }

  resetChunks() {
    this.chunks.clear();
  }

  clearEdits() {
    this.edits.clear();
    this._chunkEdits.clear();
    this.doubleSlabs.clear();
    this.chunks.clear();
  }

  getChunk(cx, cz, generate = true) {
    const nk = this.numKey(cx, cz);
    let c = this.chunks.get(nk);
    if (!c) {
      c = new Chunk(cx, cz);
      this.chunks.set(nk, c);
      if (generate) {
        try {
          this.generateChunk(c);
        } catch (e) {
          this.chunks.delete(nk);
          if (!this._genFailWarned) this._genFailWarned = new Set();
          if (!this._genFailWarned.has(nk)) {
            this._genFailWarned.add(nk);
            console.error('Chunk generation failed (' + cx + ',' + cz + '), will retry:', e);
          }
          throw e;
        }
      }
    }
    return c;
  }

  getBlock(x, y, z) {
    if (y < 0) return (this.parkour || this.void) ? BLOCK.AIR : BLOCK.BEDROCK;
    if (y >= WORLD_HEIGHT) return BLOCK.AIR;
    const cx = x >> 4; const cz = z >> 4;
    const c = this.chunks.get(cx * 32768 + cz);
    if (!c) return BLOCK.AIR;
    return c.data[((y * CHUNK_SIZE + (z - (cz << 4))) * CHUNK_SIZE) + (x - (cx << 4))];
  }

  setBlock(x, y, z, v, recordEdit = true) {
    if (y < 0 || y >= WORLD_HEIGHT) return;
    const cx = x >> 4, cz = z >> 4;
    const c = this.getChunk(cx, cz);
    const lx = x - (cx << 4), lz = z - (cz << 4);
    c.set(lx, y, lz, v);
    if (v !== 0 && y > c.surfaceMap[lz * CHUNK_SIZE + lx]) {
      c.surfaceMap[lz * CHUNK_SIZE + lx] = y;
    } else if (v === 0 && y >= c.surfaceMap[lz * CHUNK_SIZE + lx]) {
      let ny = y - 1;
      while (ny >= 0 && c.get(lx, ny, lz) === 0) ny--;
      c.surfaceMap[lz * CHUNK_SIZE + lx] = ny;
    }
    if (recordEdit) {
      this.edits.set(x * 1000000 + y * 1000 + z, v);
      this.editSeq++;
      const ck = this.numKey(cx, cz);
      let cm = this._chunkEdits.get(ck);
      if (!cm) { cm = new Map(); this._chunkEdits.set(ck, cm); }
      cm.set(x * 1000000 + y * 1000 + z, v);
    }
  }

  bulkSetBlock(x, y, z, v) {
    if (y < 0 || y >= WORLD_HEIGHT) return;
    const cx = x >> 4, cz = z >> 4;
    const ck = this.numKey(cx, cz);
    let cm = this._chunkEdits.get(ck);
    if (!cm) { cm = new Map(); this._chunkEdits.set(ck, cm); }
    cm.set(x * 1000000 + y * 1000 + z, v);
    if (v !== 0) this.editSeq++;
  }

  generateChunk(chunk) {
    const baseX = chunk.cx * CHUNK_SIZE;
    const baseZ = chunk.cz * CHUNK_SIZE;
    const n = this.noise;

    if (this.parkour || this.void) {
      for (let x = 0; x < CHUNK_SIZE; x++) {
        for (let z = 0; z < CHUNK_SIZE; z++) {
          chunk.surfaceMap[z * CHUNK_SIZE + x] = 0;
          chunk.biomeMap[z * CHUNK_SIZE + x] = BIOMES.PLAINS;
        }
      }
    } else if (this.flat) {
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
      const terrainMode = this.amplified ? 'amplified' : this.weird ? 'weird' : 'normal';
      for (let x = 0; x < CHUNK_SIZE; x++) {
        for (let z = 0; z < CHUNK_SIZE; z++) {
          const wx = baseX + x, wz = baseZ + z;
          let result;
          if (this.dimension) {
            result = generateDimensionColumn(n, chunk, x, z, wx, wz);
          } else {
            result = generateColumn(n, chunk, x, z, wx, wz, terrainMode);
          }
          chunk.surfaceMap[z * CHUNK_SIZE + x] = result.topSolid;
          chunk.biomeMap[z * CHUNK_SIZE + x] = result.biome;
        }
      }

      if (this.dimension) {
        generateDimensionFeatures(chunk, baseX, baseZ, n);
      } else {
        generateUnderground(chunk, baseX, baseZ, n);
        generateFeatures(chunk, baseX, baseZ, n);
      }

      if (!this.dimension) {
        try { generateVillages(chunk, baseX, baseZ, n, this.seed, this); } catch (e) { console.error('Village generation failed:', e); }
      }
    }

    const chunkKey = this.numKey(chunk.cx, chunk.cz);
    const chunkEdits = this._chunkEdits.get(chunkKey);
    if (chunkEdits) {
      for (const [bk, v] of chunkEdits) {
        const ex = (bk / 1000000) | 0;
        const rem = bk - ex * 1000000;
        const ey = (rem / 1000) | 0;
        const ez = rem - ey * 1000;
        const lx = ex - chunk.cx * CHUNK_SIZE;
        const lz = ez - chunk.cz * CHUNK_SIZE;
        chunk.set(lx, ey, lz, v);
        if (ey > chunk.surfaceMap[lz * CHUNK_SIZE + lx]) {
          chunk.surfaceMap[lz * CHUNK_SIZE + lx] = ey;
        } else if (v === 0 && ey >= chunk.surfaceMap[lz * CHUNK_SIZE + lx]) {
          let ny = ey - 1;
          while (ny >= 0 && chunk.get(lx, ny, lz) === 0) ny--;
          chunk.surfaceMap[lz * CHUNK_SIZE + lx] = ny;
        }
      }
    }

    {
      let oc = 0, rc = 0;
      for (let i = 0; i < chunk.biomeMap.length; i++) {
        const b = chunk.biomeMap[i];
        if (b === BIOMES.OCEAN || b === BIOMES.DEEP_OCEAN) oc++;
        else if (b === BIOMES.RIVER) rc++;
      }
      if (oc > rc && oc > 8) chunk._dominantBiome = 'ocean';
      else if (rc > oc && rc > 8) chunk._dominantBiome = 'river';
      else chunk._dominantBiome = 'default';
    }

    chunk.generated = true;
  }

  evictFar(pcx, pcz, limit) {
    // Edits live in edits/_chunkEdits (reapplied by generateChunk), so evicting
    // raw data is safe — player builds come back on regen.
    for (const k of this.chunks.keys()) {
      // Floor-div decode: JS % keeps the sign, which broke for negative cx.
      const cx = Math.floor(k / 32768);
      const cz = k - cx * 32768;
      if (Math.abs(cx - pcx) > limit || Math.abs(cz - pcz) > limit) {
        this.chunks.delete(k);
      }
    }
  }

  heightAt(wx, wz) {
    const cx = wx >> 4, cz = wz >> 4;
    const c = this.chunks.get(this.numKey(cx, cz));
    if (c && c.generated) {
      const lx = wx - (cx << 4), lz = wz - (cz << 4);
      return c.surfaceMap[lz * CHUNK_SIZE + lx];
    }
    return calcHeight(this.noise, wx, wz);
  }

  biomeAt(wx, wz, y) {
    const cx = wx >> 4, cz = wz >> 4;
    const c = this.chunks.get(this.numKey(cx, cz));
    if (c && c.generated) {
      const lx = wx - (cx << 4), lz = wz - (cz << 4);
      return c.biomeMap[lz * CHUNK_SIZE + lx];
    }
    return calcBiome(this.noise, wx, wz, y);
  }

  serializeEdits() { return { seed: this.seed, edits: Array.from(this.edits.entries()), chests: this.serializeChests(), furnaces: this.serializeFurnaces(), doubleslabs: Array.from(this.doubleSlabs.entries()) }; }
  loadEdits(obj) {
    if (obj && obj.doubleslabs) {
      for (const [k, v] of obj.doubleslabs) {
        if (Array.isArray(v) && v.length === 2) this.doubleSlabs.set(k, [v[0], v[1]]);
      }
    }
    if (!obj || obj.edits == null) return;
    for (const [k, v] of obj.edits) {
      let bx, by, bz, bk;
      if (typeof k === 'string') {
        const ci = k.indexOf(',');
        const ci2 = k.indexOf(',', ci + 1);
        bx = +k.slice(0, ci);
        by = +k.slice(ci + 1, ci2);
        bz = +k.slice(ci2 + 1);
        bk = bx * 1000000 + by * 1000 + bz;
      } else {
        bk = k;
        bx = (k / 1000000) | 0;
        const rem = k - bx * 1000000;
        by = (rem / 1000) | 0;
        bz = rem - by * 1000;
      }
      this.edits.set(bk, v);
      const cx = bx >> 4, cz = bz >> 4;
      const ck = this.numKey(cx, cz);
      let cm = this._chunkEdits.get(ck);
      if (!cm) { cm = new Map(); this._chunkEdits.set(ck, cm); }
      cm.set(bk, v);
    }
    this.loadChests(obj.chests);
    this.loadFurnaces(obj.furnaces);
  }
}
