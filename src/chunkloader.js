// Streams chunks in/out around the player based on distance.
//
// Each frame we compute the player's chunk coords and, if they've changed,
// queue chunks within `radius` for generation+meshing. To avoid frame hitches
// we process a small budget of chunks per frame (FIFO) instead of all at once.

import { CHUNK_SIZE } from './world.js';

export class ChunkLoader {
  constructor(world, manager, radius = 6) {
    this.world = world;
    this.manager = manager;
    this.radius = radius;
    this.queue = [];          // array of "cx,cz" pending build
    this.lastPCX = Infinity;
    this.lastPCZ = Infinity;
    this.budget = 2;          // chunks built per frame
    this.genBudget = 4;       // chunks generated per frame (heavier)
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

    // generate a few queued chunks this frame
    let gen = this.genBudget;
    while (gen-- > 0 && this.queue.length) {
      const k = this.queue.shift();
      const [cx, cz] = k.split(',').map(Number);
      const chunk = this.world.getChunk(cx, cz, true);
      if (chunk.generated) this.manager._markDirty(cx, cz);
    }
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
    this.queue = list.map(l => l.cx + ',' + l.cz);
  }

  unloadFar(pcx, pcz) {
    const limit = this.radius + 3;
    for (const k of [...this.manager.meshes.keys()]) {
      const [cx, cz] = k.split(',').map(Number);
      if (Math.abs(cx - pcx) > limit || Math.abs(cz - pcz) > limit) {
        this.manager.remove(cx, cz);
      }
    }
    // Also evict the underlying chunk data (kept a bit further out than meshes
    // so nearby back-and-forth movement doesn't thrash regeneration).
    if (this.world.evictFar) this.world.evictFar(pcx, pcz, this.radius + 5);
  }

  // Async prime: yields to the browser between chunks so loading screen can update.
  // Returns a promise that resolves when done.
  primeAsync(pcx, pcz, onProgress) {
    this.lastPCX = pcx; this.lastPCZ = pcz;
    this.rebuildQueue(pcx, pcz);
    const total = this.queue.length;
    const budget = 8; // chunks per frame
    return new Promise((resolve) => {
      const step = () => {
        let n = budget;
        while (n-- > 0 && this.queue.length) {
          const k = this.queue.shift();
          const [cx, cz] = k.split(',').map(Number);
          const chunk = this.world.getChunk(cx, cz, true);
          if (chunk.generated) this.manager.buildOrRefresh(cx, cz);
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
}
