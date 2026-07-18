import { BLOCK } from './blocks.js';
import { CHUNK_SIZE } from './constants.js';

// ─── Parkour Paradise Map Loader ─────────────────────────────────────
export async function loadParkourMap(world) {
  const resp = await fetch('parkour-chunks.bin.gz');
  if (!resp.ok) throw new Error('Failed to load parkour map: ' + resp.status);
  const compressed = new Uint8Array(await resp.arrayBuffer());

  let decompressed;
  if (typeof DecompressionStream !== 'undefined') {
    const ds = new DecompressionStream('gzip');
    const writer = ds.writable.getWriter();
    writer.write(compressed);
    writer.close();
    const reader = ds.readable.getReader();
    const chunks = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }
    const totalLen = chunks.reduce((s, c) => s + c.length, 0);
    decompressed = new Uint8Array(totalLen);
    let off = 0;
    for (const c of chunks) { decompressed.set(c, off); off += c.length; }
  } else {
    const resp2 = await fetch('parkour-chunks.bin');
    decompressed = new Uint8Array(await resp2.arrayBuffer());
  }

  const view = new DataView(decompressed.buffer);
  let p = 0;
  const version = view.getInt32(p); p += 4;
  const minX = view.getInt32(p); p += 4;
  const maxX = view.getInt32(p); p += 4;
  const minY = view.getInt32(p); p += 4;
  const maxY = view.getInt32(p); p += 4;
  const minZ = view.getInt32(p); p += 4;
  const maxZ = view.getInt32(p); p += 4;
  const spawnY = view.getInt32(p); p += 4;
  const blockCount = view.getInt32(p); p += 4;

  const intView = new Int32Array(decompressed.buffer, p);
  for (let i = 0; i < blockCount; i++) {
    const x = intView[i * 4];
    const y = intView[i * 4 + 1];
    const z = intView[i * 4 + 2];
    const bid = intView[i * 4 + 3];
    world.bulkSetBlock(x, y, z, bid);
  }

  return {
    bounds: { minX, maxX, minY, maxY, minZ, maxZ },
    spawnY,
    blockCount
  };
}

// ─── Level Definitions ───────────────────────────────────────────────
// 10 levels with smooth difficulty curve and varied mechanics.
// Layout: single continuous path heading -Z, each level flows into the next.

export const PARKOUR_LEVELS = [
  { id: 1,  name: 'First Steps',     desc: 'Simple 2-block gaps' },
  { id: 2,  name: 'Grassy Fields',   desc: 'Easy jumps on grass' },
  { id: 3,  name: 'Dirt Path',       desc: 'Slightly wider gaps' },
  { id: 4,  name: 'Stone Bridge',    desc: 'Narrow stone platforms' },
  { id: 5,  name: 'Zigzag',          desc: 'Diagonal jumps' },
  { id: 6,  name: 'The Climb',       desc: 'Ascending platforms' },
  { id: 7,  name: 'Deep Gaps',       desc: '4-block leaps' },
  { id: 8,  name: 'Narrow Ledge',    desc: 'One-block wide' },
  { id: 9,  name: 'Mixed Challenge',  desc: 'Everything combined' },
  { id: 10, name: 'The Final Leap',  desc: '5-block finale' },
];

// Difficulty parameters per level — progressive curve
const DIFFICULTY = [
  { gap: 2, w: 3, d: 3, count: 4, block: BLOCK.PLANKS,     accent: BLOCK.WOOL },
  { gap: 2, w: 3, d: 3, count: 5, block: BLOCK.GRASS,      accent: BLOCK.PLANKS },
  { gap: 2, w: 3, d: 4, count: 5, block: BLOCK.DIRT,       accent: BLOCK.GRASS },
  { gap: 2, w: 1, d: 4, count: 6, block: BLOCK.STONE,      accent: BLOCK.COBBLESTONE },
  { gap: 2, w: 3, d: 3, count: 6, block: BLOCK.COBBLESTONE, accent: BLOCK.BRICK, zigzag: true },
  { gap: 2, w: 3, d: 3, count: 5, block: BLOCK.STONE,      accent: BLOCK.IRON_BLOCK, staircase: true },
  { gap: 3, w: 3, d: 3, count: 4, block: BLOCK.COBBLESTONE, accent: BLOCK.GOLD_BLOCK },
  { gap: 2, w: 1, d: 3, count: 7, block: BLOCK.QUARTZ_BLOCK, accent: BLOCK.IRON_BLOCK },
  { gap: 3, w: 3, d: 3, count: 6, block: BLOCK.EMBEROCK,   accent: BLOCK.GREENSTONE_BLOCK, mixed: true },
  { gap: 3, w: 4, d: 4, count: 3, block: BLOCK.VOIDSTONE,  accent: BLOCK.DIAMOND_BLOCK },
];

function fillBox(world, x, y, z, w, d, h, block) {
  for (let dx = 0; dx < w; dx++)
    for (let dz = 0; dz < d; dz++)
      for (let dy = 0; dy < h; dy++)
        world.setBlock(x + dx, y + dy, z + dz, block);
}

// Build a single parkour level at (ox, oy, oz). Returns end platform position.
export function buildParkourLevel(world, levelNum, ox, oy, oz) {
  const cfg = DIFFICULTY[levelNum - 1] || DIFFICULTY[0];
  const b = cfg.block, a = cfg.accent;

  // Start platform (grass with accent border)
  fillBox(world, ox - 2, oy, oz, 5, 4, 1, BLOCK.GRASS);
  for (let dx = -2; dx <= 2; dx++)
    for (let dz = -1; dz <= 2; dz++)
      if (world.getBlock(ox + dx, oy + 1, oz + dz) === 0)
        world.setBlock(ox + dx, oy + 1, oz + dz, a);

  // Ladder levels — vertical ascent
  if (cfg.ladder) {
    for (let i = 0; i < cfg.count; i++) {
      const lx = ox, lz = oz + i * (cfg.d + cfg.gap);
      fillBox(world, lx, oy + i * 3, lz, cfg.w, cfg.d, 1, b);
      if (i < cfg.count - 1) {
        for (let ly = oy + i * 3 + 1; ly < oy + (i + 1) * 3; ly++)
          world.setBlock(lx + 1, ly, lz - 1, BLOCK.LADDER);
      }
      world.setBlock(lx, oy + i * 3 + 1, lz + 1, a);
    }
    const fx = ox, fz = oz + cfg.count * (cfg.d + cfg.gap);
    fillBox(world, fx - 2, oy + cfg.count * 3, fz - 1, 5, 4, 1, a);
    return { x: fx + 1, y: oy + cfg.count * 3 + 2, z: fz + 1 };
  }

  // Standard path — platforms heading -Z
  let cx = ox, cz = oz;
  let dir = 1;

  for (let i = 0; i < cfg.count; i++) {
    const gap = cfg.mixed ? 1 + (i % 4) * 1.5 : cfg.gap;
    const g = Math.round(gap);

    // Zigzag: alternate direction on X
    let offX = 0;
    if (cfg.zigzag && i % 2 === 1) {
      offX = dir * (cfg.w + g);
      dir *= -1;
    }

    cz -= (cfg.d + g);
    cx += offX;

    const wy = oy + (cfg.staircase ? (i + 1) : 0);
    fillBox(world, cx, wy, cz, cfg.w, cfg.d, 1, b);
    world.setBlock(cx + Math.floor(cfg.w / 2), wy + 1, cz + Math.floor(cfg.d / 2), a);
  }

  // End platform (gold block)
  const endY = oy + (cfg.staircase ? cfg.count : 0);
  fillBox(world, cx - 2, endY, cz - 1, 5, 4, 1, BLOCK.GOLD_BLOCK);
  return { x: cx + 1, y: endY + 2, z: cz + 1 };
}

// Build the lobby area
export function buildParkourLobby(world, ox, oy, oz) {
  const half = 12;
  fillBox(world, ox - half, oy, oz - half, half * 2 + 1, half * 2 + 1, 1, BLOCK.VOID_GLASS);

  // Glass walls with entrance
  for (let dx = -half; dx <= half; dx++)
    for (let dz = -half; dz <= half; dz++)
      if (Math.abs(dx) === half || Math.abs(dz) === half) {
        if (dx === -half && dz >= -2 && dz <= 2) continue;
        fillBox(world, ox + dx, oy + 1, oz + dz, 1, 1, 4, BLOCK.GLASS);
      }

  // Entrance opening
  for (let dz = -2; dz <= 2; dz++)
    for (let dy = 0; dy < 4; dy++)
      world.setBlock(ox - half, oy + 1 + dy, oz + dz, BLOCK.AIR);

  // Gold entrance marker
  fillBox(world, ox - half - 1, oy, oz - 2, 1, 5, 1, BLOCK.GOLD_BLOCK);

  // Wool walkway
  for (let dx = -2; dx <= 2; dx++)
    for (let dz = 0; dz <= 8; dz++)
      world.setBlock(ox + dx, oy + 1, oz + dz, BLOCK.WOOL);

  // Gold border trim
  for (let dx = -6; dx <= 6; dx++) {
    world.setBlock(ox + dx, oy + 1, oz - half + 1, BLOCK.GOLD_BLOCK);
    world.setBlock(ox + dx, oy + 1, oz + half - 1, BLOCK.GOLD_BLOCK);
    world.setBlock(ox - half + 1, oy + 1, oz + dx, BLOCK.GOLD_BLOCK);
    world.setBlock(ox + half - 1, oy + 1, oz + dx, BLOCK.GOLD_BLOCK);
  }

  // Center quartz pillar with gold crown
  fillBox(world, ox - 1, oy + 1, oz - 1, 3, 3, 5, BLOCK.QUARTZ_BLOCK);
  world.setBlock(ox, oy + 6, oz, BLOCK.GOLD_BLOCK);

  // Torches
  world.setBlock(ox + half + 1, oy + 2, oz, BLOCK.TORCH);
  world.setBlock(ox + half + 1, oy + 2, oz - 1, BLOCK.TORCH);

  // Wool entrance pillars
  for (let dy = 1; dy <= 3; dy++)
    world.setBlock(ox - half - 1, oy + dy, oz, BLOCK.WOOL);
  world.setBlock(ox - half - 1, oy + 2, oz + 1, BLOCK.WOOL);
}

// Build all 10 levels in a single continuous path heading -Z.
// Returns array of level end positions.
export function buildAllLevels(world, ox, oy, oz) {
  const positions = [];
  let cx = ox, cy = oy, cz = oz;

  for (let i = 0; i < PARKOUR_LEVELS.length; i++) {
    const pos = buildParkourLevel(world, i + 1, cx, cy, cz);
    positions.push(pos);

    // Connect to next level: small gap bridge
    if (i < PARKOUR_LEVELS.length - 1) {
      const nextGap = 4;
      cz -= nextGap;
    }
  }

  return positions;
}
