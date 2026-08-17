// Regenerates public/treasure-island.bin.gz from the raw conversion
// captured in the previously-committed treasure-island.bin.gz.
//
// Why: the original conversion dumped EVERY non-air block of the whole
// Treasure Island world (multiple .mca regions) — 3 arena copies, an ocean
// filled with ~79k water blocks, spanning z in [-491, 1124]. The in-game
// loader's bbox-center recentering then landed in empty void (yShift=-23),
// so the arena rendered far below BW_Y and hundreds of blocks off to the
// side, while the old procedural arena stayed visible on top.
//
// This tool keeps only the primary "arena A" cluster (the one centered on
// x,z ~0), drops all water, re-centers it on the origin, and pre-shifts Y
// so the four team-island tops land at BW_Y+1. Output is stored in game
// coordinates (absolute positions); the loader places them verbatim.

import { readFileSync, writeFileSync } from 'fs';
import { gzipSync, gunzipSync } from 'zlib';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = process.argv[2] || join(ROOT, 'public/treasure-island.bin.gz');
const OUT = process.argv[3] || join(ROOT, 'public/treasure-island.bin.gz');

const BW_Y = 120;          // must match src/bedwars.js
const BASE_REF_Y = 79;     // measured top surface of the 4 team islands (pre-shift)

function parse(inputPath) {
  const compressed = readFileSync(inputPath);
  const buf = gunzipSync(compressed);
  const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  const count = view.getInt32(32, false);
  const records = [];
  for (let i = 0; i < count; i++) {
    const off = 36 + i * 16;
    records.push({
      x: view.getInt32(off, true),
      y: view.getInt32(off + 4, true),
      z: view.getInt32(off + 8, true),
      b: view.getInt32(off + 12, true),
    });
  }
  return records;
}

function emit(records, outPath) {
  records.sort((a, b) => (a.x - b.x) || (a.y - b.y) || (a.z - b.z));
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity, minZ = Infinity, maxZ = -Infinity;
  for (const r of records) {
    minX = Math.min(minX, r.x); maxX = Math.max(maxX, r.x);
    minY = Math.min(minY, r.y); maxY = Math.max(maxY, r.y);
    minZ = Math.min(minZ, r.z); maxZ = Math.max(maxZ, r.z);
  }
  const spawnY = BW_Y + 4;
  const data = Buffer.alloc(36 + records.length * 16);
  const view = new DataView(data.buffer, data.byteOffset, data.byteLength);
  view.setInt32(0, 1, false);                 // version
  view.setInt32(4, minX, false);
  view.setInt32(8, maxX, false);
  view.setInt32(12, minY, false);
  view.setInt32(16, maxY, false);
  view.setInt32(20, minZ, false);
  view.setInt32(24, maxZ, false);
  view.setInt32(28, spawnY, false);
  view.setInt32(32, records.length, false);
  for (let i = 0; i < records.length; i++) {
    const off = 36 + i * 16;
    view.setInt32(off, records[i].x, true);
    view.setInt32(off + 4, records[i].y, true);
    view.setInt32(off + 8, records[i].z, true);
    view.setInt32(off + 12, records[i].b, true);
  }
  writeFileSync(outPath, gzipSync(data, { level: 9 }));
  console.log(`Wrote ${outPath}`);
  console.log(`  blocks=${records.length} bbox x[${minX}..${maxX}] y[${minY}..${maxY}] z[${minZ}..${maxZ}] spawnY=${spawnY}`);
}

const raw = parse(SRC);
console.log(`Parsed ${raw.length} raw records from ${SRC}`);

// Keep only arena A (the cluster whose footprint is centered on x,z ~0), and
// drop water blocks (ocean + courtyard pools). Air is already omitted.
const kept = raw.filter(r =>
  r.x >= -116 && r.x <= 116 &&
  r.z >= -116 && r.z <= 116 &&
  r.b !== 0 && r.b !== 8);

console.log(`Kept ${kept.length} arena-A non-water blocks`);

// Re-center on origin. Arena A is already symmetric, so this is ~identity.
let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
for (const r of kept) {
  minX = Math.min(minX, r.x); maxX = Math.max(maxX, r.x);
  minZ = Math.min(minZ, r.z); maxZ = Math.max(maxZ, r.z);
}
const shiftX = Math.round((minX + maxX) / 2);
const shiftZ = Math.round((minZ + maxZ) / 2);
console.log(`Raw bbox x[${minX}..${maxX}] z[${minZ}..${maxZ}] -> recenter ${shiftX},${shiftZ}`);

const yOffset = BW_Y - BASE_REF_Y; // 120 - 79 = 41
const out = kept.map(r => ({ x: r.x - shiftX, y: r.y + yOffset, z: r.z - shiftZ, b: r.b }));
console.log(`yOffset=${yOffset}`);

emit(out, OUT);