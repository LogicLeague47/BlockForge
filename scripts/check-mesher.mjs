// Simulate the mesher on the imported skyblock / treasure island worlds to
// check geometry sanity (NaN positions, out-of-bounds verts, index overflow).

import { World } from '../src/world.js';
import { buildChunkGeometry } from '../src/mesher.js';
import { SKYBLOCK_MAP } from '../src/skyblock-data.js';
import { registerSource } from '../src/liquid.js';
import { readFileSync } from 'fs';
import { gunzipSync } from 'zlib';

function buildSkyblock(world) {
  for (const is of SKYBLOCK_MAP.islands) {
    const ox = is.o[0], oy = is.o[1], oz = is.o[2];
    const arr = is.b;
    for (let i = 0; i < arr.length; i += 4) {
      const x = ox + arr[i], y = oy + arr[i + 1], z = oz + arr[i + 2];
      const id = arr[i + 3];
      world.setBlock(x, y, z, id);
      if (id === 8 || id === 9 || id === 10 || id === 11) registerSource(x, y, z);
    }
  }
}

function buildTreasureIsland(world, path) {
  const buf = gunzipSync(readFileSync(path));
  const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  const count = view.getInt32(32, false);
  for (let i = 0; i < count; i++) {
    const off = 36 + i * 16;
    world.bulkSetBlock(
      view.getInt32(off, true),
      view.getInt32(off + 4, true),
      view.getInt32(off + 8, true),
      view.getInt32(off + 12, true)
    );
  }
  world.resetChunks();
  // Simulate the chunk loader creating chunks on demand.
  for (const ck of world._chunkEdits.keys()) {
    const ci = ck.indexOf(',');
    world.getChunk(+ck.slice(0, ci), +ck.slice(ci + 1));
  }
}

function check(world, name) {
  const chunks = new Set();
  for (const [k] of world.chunks) chunks.add(k);
  console.log(`\n=== ${name}: ${chunks.size} chunks ===`);
  let bad = 0, totalVerts = 0;
  for (const k of chunks) {
    const ci = k.indexOf(',');
    const cx = +k.slice(0, ci), cz = +k.slice(ci + 1);
    const chunk = world.getChunk(cx, cz);
    let geo;
    try { geo = buildChunkGeometry(chunk, world); }
    catch (e) { console.log(`  chunk ${k} THREW ${e.message}`); bad++; continue; }
    for (const t of ['opaque', 'cutout', 'trans', 'water']) {
      const g = geo[t];
      if (!g.position.length) continue;
      totalVerts += g.position.length / 3;
      for (let i = 0; i < g.position.length; i++) {
        const v = g.position[i];
        if (!Number.isFinite(v)) { console.log(`  chunk ${k} ${t}: NaN at ${i}`); bad++; break; }
      }
      // world-space bounds of emitted vertices
      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity, minZ = Infinity, maxZ = -Infinity;
      for (let i = 0; i < g.position.length; i += 3) {
        const x = g.position[i], y = g.position[i + 1], z = g.position[i + 2];
        if (x < minX) minX = x; if (x > maxX) maxX = x;
        if (y < minY) minY = y; if (y > maxY) maxY = y;
        if (z < minZ) minZ = z; if (z > maxZ) maxZ = z;
      }
      // A chunk spans [cx*16, cx*16+15] etc. Vertices inside chunk+1 (AO/face overhang)
      const cminX = cx * 16 - 1, cmaxX = cx * 16 + 16;
      const cminZ = cz * 16 - 1, cmaxZ = cz * 16 + 16;
      const inBounds = minX >= cminX && maxX <= cmaxX && minZ >= cminZ && maxZ <= cmaxZ && maxY <= 256;
      if (!inBounds) {
        console.log(`  chunk ${k} ${t}: verts OUT OF BOUNDS minX=${minX} maxX=${maxX} minY=${minY} maxY=${maxY} minZ=${minZ} maxZ=${maxZ} (chunk x${cminX}..${cmaxX} z${cminZ}..${cmaxZ})`);
        bad++;
      }
    }
  }
  console.log(`  total verts: ${totalVerts}, problems: ${bad}`);
}

// Skyblock
{
  const world = new World(12345, { void: true });
  buildSkyblock(world);
  check(world, 'SKYBLOCK');
}

// Treasure island
{
  const world = new World(12345, { void: true });
  buildTreasureIsland(world, 'public/treasure-island.bin.gz');
  check(world, 'TREASURE ISLAND');
}