// Streams chunks in/out around the player based on distance.
//
// Each frame we compute the player's chunk coords and, if they've changed,
// queue chunks within `radius` for generation+meshing. To avoid frame hitches
// we process a small budget of chunks per frame (FIFO) instead of all at once.

import { CHUNK_SIZE } from './world.js';

const _IS_MOBILE = ('ontouchstart' in window && navigator.maxTouchPoints > 0);
const _LOW_END = _IS_MOBILE || (navigator.deviceMemory || 8) <= 4 || (navigator.hardwareConcurrency || 4) <= 4;

// Minecraft-style chunk states:
//   loaded   — within radius: generated + meshed + ticked (rendered world)
//   lazy     — ring past radius: data cached (instant re-entry, edits safe)
//              but no mesh and no ticks
//   unloaded — evicted entirely; regenerates (with edits) on approach
export const CHUNK_STATE = { LOADED: 'loaded', LAZY: 'lazy', UNLOADED: 'unloaded' };
const MESH_HOLD = 1;  // meshes survive this far past radius (hides border pop)
const DATA_HOLD = 4;  // chunk data survives this far past radius (lazy ring)

export class ChunkLoader {
  constructor(world, manager, radius = 6) {
    this.world = world;
    this.manager = manager;
    this.radius = radius;
    this.queue = [];          // array of "cx,cz" pending build
    this.lastPCX = Infinity;
    this.lastPCZ = Infinity;
    this.budget = _LOW_END ? 1 : 2;          // chunks built per frame
    this.genBudget = _LOW_END ? 2 : 4;       // chunks generated per frame (heavier)
    this.allVisibleLoaded = false;
  }

  setRadius(r) {
    this.radius = r;
    this.lastPCX = Infinity;
    this.lastPCZ = Infinity;
  }

  update(px, pz) {
    const pcx = Math.floor(px / CHUNK_SIZE);
    const pcz = Math.floor(pz / CHUNK_SIZE);

    if (pcx !== this.lastPCX || pcz !== this.lastPCZ) {
      this.lastPCX = pcx;
      this.lastPCZ = pcz;
      this.rebuildQueue(pcx, pcz);
      this.unloadFar(pcx, pcz);
    }

    // Queue is already sorted nearest-first from rebuildQueue().
    // Processing from the front maintains distance ordering as chunks are consumed.

    let gen = this.genBudget;
    while (gen-- > 0 && this.queue.length) {
      const entry = this.queue.shift();
      try {
        const chunk = this.world.getChunk(entry.cx, entry.cz, true);
        if (chunk.generated) this.manager.markDirty(entry.cx, entry.cz);
        // Not generated (rare: generation threw) — re-queue at the end so it
        // retries after the rest without blocking the visible world.
        else this.queue.push(entry);
      } catch (e) {
        this.queue.push(entry);
      }
    }

    this.allVisibleLoaded = this.queue.length === 0;
  }

  rebuildQueue(pcx, pcz) {
    this.queue.length = 0;
    const list = [];
    for (let dz = -this.radius; dz <= this.radius; dz++) {
      for (let dx = -this.radius; dx <= this.radius; dx++) {
        const d = dx * dx + dz * dz;
        if (d > (this.radius + 0.5) * (this.radius + 0.5)) continue;
        list.push({ cx: pcx + dx, cz: pcz + dz, d });
      }
    }
    // nearest first so the ground pops in under the player
    list.sort((a, b) => a.d - b.d);
    this.queue = list.map(l => ({ key: l.cx + ',' + l.cz, cx: l.cx, cz: l.cz }));
  }

  // State of one chunk column relative to the player (Minecraft-style).
  chunkState(cx, cz) {
    const dx = Math.abs(cx - this.lastPCX), dz = Math.abs(cz - this.lastPCZ);
    const d = Math.max(dx, dz);
    if (d <= this.radius) return CHUNK_STATE.LOADED;
    if (d <= this.radius + DATA_HOLD) return CHUNK_STATE.LAZY;
    return CHUNK_STATE.UNLOADED;
  }

  unloadFar(pcx, pcz) {
    // Meshes: drop anything past the visible radius (+1 hold against popping).
    const meshLimit = this.radius + MESH_HOLD;
    for (const k of this.manager.meshes.keys()) {
      const [cx, cz] = k.split(',').map(Number);
      if (Math.abs(cx - pcx) > meshLimit || Math.abs(cz - pcz) > meshLimit) {
        this.manager.remove(cx, cz);
      }
    }
    // Data: evict past the lazy ring. Edits live separately and reapply on
    // regen, so nearby back-and-forth movement just re-meshes cached data
    // instead of regenerating terrain.
    if (this.world.evictFar) this.world.evictFar(pcx, pcz, this.radius + DATA_HOLD);
  }

  // Async prime: yields to the browser between chunks so loading screen can update.
  // Returns a promise that resolves when done.
  primeAsync(pcx, pcz, onProgress) {
    this.lastPCX = pcx; this.lastPCZ = pcz;
    this.rebuildQueue(pcx, pcz);
    const total = this.queue.length;
    const budget = _LOW_END ? 4 : 8; // chunks per frame
    return new Promise((resolve) => {
      const step = () => {
        let n = budget;
        while (n-- > 0 && this.queue.length) {
          const entry = this.queue.shift();
          try {
            const chunk = this.world.getChunk(entry.cx, entry.cz, true);
            if (chunk.generated) this.manager.buildOrRefresh(entry.cx, entry.cz);
            else this.queue.push(entry);
          } catch (e) {
            this.queue.push(entry);
          }
        }
        const done = total - this.queue.length;
        if (onProgress) onProgress(done, total);
        if (this.queue.length > 0) {
          requestAnimationFrame(step);
        } else {
          resolve();
        }
      };
      requestAnimationFrame(step);
    });
  }

  // Total loaded chunks (for HUD).
  loadedCount() { return this.manager.meshes.size; }

  // Lazy chunks: generated data cached without a mesh (instant re-entry ring).
  lazyCount() {
    let n = 0;
    for (const k of this.world.chunks.keys()) {
      const cx = Math.floor(k / 32768), cz = k - cx * 32768;
      if (this.chunkState(cx, cz) !== CHUNK_STATE.LAZY) continue;
      if (!this.manager.meshes.has(cx + ',' + cz)) n++;
    }
    return n;
  }
}
