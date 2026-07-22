import { BLOCK } from './blocks.js';

// ─── Parkour Physics Constants (Minecraft-accurate) ───────────────────
// Walking jump:  ~2.4b flat (no sprint)
// Sprint jump:   ~3.4b flat (with sprint)
// Sprint+1momentum: ~4.0b
// Sprint+2momentum: ~4.5b
// Jump height:   ~1.25 blocks
// Player hitbox: 0.6 x 1.8 blocks

// ─── Level Definitions ────────────────────────────────────────────────
// Each level has: gap (air blocks between platforms), platforms per section,
// block type, accent block, and special mechanics.
// Gap values account for player hitbox (0.6 wide) so a "2 gap" = ~2.4 effective.

export const PARKOUR_LEVELS = [
  { id: 1,  name: 'First Steps',     desc: 'Easy 1-block gaps',         gap: 1, w: 3, d: 3, count: 5, block: BLOCK.PLANKS,      accent: BLOCK.WOOL },
  { id: 2,  name: 'Getting Warmed Up', desc: '2-block sprint jumps',     gap: 2, w: 3, d: 3, count: 5, block: BLOCK.GRASS,       accent: BLOCK.PLANKS },
  { id: 3,  name: 'Dirt Trail',      desc: 'Mixed gaps with stairs',    gap: 2, w: 2, d: 3, count: 5, block: BLOCK.DIRT,        accent: BLOCK.GRASS, staircase: true },
  { id: 4,  name: 'Stone Bridges',   desc: 'Narrow platforms',          gap: 2, w: 1, d: 3, count: 6, block: BLOCK.STONE,       accent: BLOCK.COBBLESTONE },
  { id: 5,  name: 'The Zigzag',      desc: 'Diagonal jumps',            gap: 2, w: 2, d: 2, count: 6, block: BLOCK.COBBLESTONE, accent: BLOCK.BRICK, zigzag: true },
  { id: 6,  name: 'The Ascent',      desc: 'Climbing platforms',        gap: 2, w: 3, d: 3, count: 5, block: BLOCK.STONE,       accent: BLOCK.IRON_BLOCK, staircase: true, stepH: 2 },
  { id: 7,  name: 'Wide Gaps',       desc: '3-block sprint jumps',      gap: 3, w: 3, d: 3, count: 4, block: BLOCK.COBBLESTONE, accent: BLOCK.GOLD_BLOCK },
  { id: 8,  name: 'Precision',       desc: '1-wide platforms',          gap: 2, w: 1, d: 3, count: 7, block: BLOCK.QUARTZ_BLOCK, accent: BLOCK.IRON_BLOCK },
  { id: 9,  name: 'Mixed Challenge', desc: 'Everything combined',       gap: 3, w: 2, d: 3, count: 5, block: BLOCK.EMBEROCK,    accent: BLOCK.GREENSTONE_BLOCK, mixed: true },
  { id: 10, name: 'The Final Leap',  desc: 'The ultimate challenge',    gap: 2, w: 2, d: 3, count: 4, block: BLOCK.VOIDSTONE,   accent: BLOCK.DIAMOND_BLOCK, staircase: true },
];

// ─── Checkpoint Data ──────────────────────────────────────────────────
// Stores active checkpoints per level for respawn
let _checkpoints = {};   // { levelNum: { x, y, z } }
let _currentLevel = 1;
let _parkourTimer = 0;
let _parkourStartTime = 0;
let _levelStartPositions = [];  // start position of each level

function fillBox(world, x, y, z, w, d, h, block) {
  for (let dx = 0; dx < w; dx++)
    for (let dz = 0; dz < d; dz++)
      for (let dy = 0; dy < h; dy++)
        world.setBlock(x + dx, y + dy, z + dz, block);
}

// Build a single checkpoint platform (subtle gold marker)
function buildCheckpoint(world, x, y, z) {
  fillBox(world, x - 1, y, z - 1, 3, 3, 1, BLOCK.GOLD_BLOCK);
}

// Build a single parkour level at (ox, oy, oz). Returns end platform position.
export function buildParkourLevel(world, levelNum, ox, oy, oz) {
  const cfg = PARKOUR_LEVELS[levelNum - 1] || PARKOUR_LEVELS[0];
  const b = cfg.block;

  // Start platform
  fillBox(world, ox - 2, oy, oz - 2, 5, 6, 1, b);

  // Checkpoint at level start
  buildCheckpoint(world, ox, oy + 1, oz + 1);

  let cx = ox, cz = oz;
  let dir = 1;

  for (let i = 0; i < cfg.count; i++) {
    const gap = cfg.mixed ? 1 + (i % 4) : cfg.gap;
    const g = Math.round(gap);

    let offX = 0;
    if (cfg.zigzag && i % 2 === 1) {
      offX = dir * (cfg.w + g);
      dir *= -1;
    }

    cz -= (cfg.d + g);
    cx += offX;

    const stepH = cfg.stepH || (cfg.staircase ? 1 : 0);
    const wy = oy + (i + 1) * stepH;

    fillBox(world, cx, wy, cz, cfg.w, cfg.d, 1, b);

    // Mid-level checkpoint every 3 platforms
    if (i > 0 && i % 3 === 0) {
      const midX = cx + Math.floor(cfg.w / 2);
      const midZ = cz + Math.floor(cfg.d / 2);
      buildCheckpoint(world, midX, wy + 1, midZ);
    }
  }

  // End platform
  const endY = oy + cfg.count * (cfg.stepH || (cfg.staircase ? 1 : 0));
  fillBox(world, cx - 2, endY, cz - 2, 5, 5, 1, BLOCK.GOLD_BLOCK);

  return { x: cx + 1, y: endY + 2, z: cz + 1, levelEnd: true };
}

// Build the lobby area
export function buildParkourLobby(world, ox, oy, oz) {
  const half = 12;

  // Floor
  fillBox(world, ox - half, oy, oz - half, half * 2 + 1, half * 2 + 1, 1, BLOCK.VOID_GLASS);

  // Walls (2 high)
  for (let dx = -half; dx <= half; dx++) {
    for (let dz = -half; dz <= half; dz++) {
      if (Math.abs(dx) === half || Math.abs(dz) === half) {
        if (dx === -half && dz >= -2 && dz <= 2) continue;
        world.setBlock(ox + dx, oy + 1, oz + dz, BLOCK.GLASS);
        world.setBlock(ox + dx, oy + 2, oz + dz, BLOCK.GLASS);
      }
    }
  }

  // Entrance opening
  for (let dz = -2; dz <= 2; dz++)
    for (let dy = 0; dy < 3; dy++)
      world.setBlock(ox - half, oy + 1 + dy, oz + dz, BLOCK.AIR);

  // Walkway to first level
  for (let dx = -2; dx <= 2; dx++)
    for (let dz = 0; dz <= 8; dz++)
      world.setBlock(ox + dx, oy + 1, oz + dz, BLOCK.PLANKS);
}

// Build all 10 levels in a single continuous path heading -Z.
// Returns array of level end positions.
export function buildAllLevels(world, ox, oy, oz) {
  const positions = [];
  let cx = ox, cy = oy, cz = oz;

  _checkpoints = {};
  _levelStartPositions = [];

  for (let i = 0; i < PARKOUR_LEVELS.length; i++) {
    const startPos = { x: cx + 1, y: cy + 2, z: cz + 1 };
    _levelStartPositions.push(startPos);

    const pos = buildParkourLevel(world, i + 1, cx, cy, cz);
    positions.push(pos);

    // Store start checkpoint for each level
    _checkpoints[i + 1] = { x: cx + 1, y: cy + 2, z: cz + 1 };

    // Connect to next level: safe bridge
    if (i < PARKOUR_LEVELS.length - 1) {
      const nextGap = 4;
      cz -= nextGap;
    }
  }

  return positions;
}

// ─── Parkour Runtime API ──────────────────────────────────────────────
// Called from main.js to manage checkpoints, timer, and respawn.

export function resetParkourState() {
  _checkpoints = {};
  _currentLevel = 1;
  _parkourTimer = 0;
  _parkourStartTime = 0;
  _levelStartPositions = [];
}

export function startParkourTimer() {
  _parkourStartTime = performance.now();
  _parkourTimer = 0;
}

export function getParkourTimer() {
  if (!_parkourStartTime) return 0;
  return (performance.now() - _parkourStartTime) / 1000;
}

export function getParkourTimerFormatted() {
  const t = getParkourTimer();
  const mins = Math.floor(t / 60);
  const secs = Math.floor(t % 60);
  const ms = Math.floor((t % 1) * 100);
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${String(ms).padStart(2, '0')}`;
}

// Check if player reached a checkpoint beacon block
export function checkCheckpoint(player, world) {
  if (!player || !world) return false;
  const px = Math.floor(player.position.x);
  const py = Math.floor(player.position.y);
  const pz = Math.floor(player.position.z);

  // Check if standing on gold block (checkpoint)
  const blockBelow = world.getBlock(px, py - 1, pz);
  const blockAt = world.getBlock(px, py, pz);

  // Detect gold block = checkpoint
  if (blockBelow === BLOCK.GOLD_BLOCK || blockAt === BLOCK.GOLD_BLOCK) {
    // Find which level this checkpoint belongs to
    for (let lvl = 1; lvl <= PARKOUR_LEVELS.length; lvl++) {
      const cp = _checkpoints[lvl];
      if (cp && Math.abs(px - cp.x) <= 2 && Math.abs(pz - cp.z) <= 2) {
        if (cp.y >= py - 2 && cp.y <= py + 2) {
          if (_currentLevel < lvl) {
            _currentLevel = lvl;
            return true; // checkpoint activated
          }
        }
      }
    }
  }
  return false;
}

// Check if player reached the end of a level
export function checkLevelEnd(player, positions) {
  if (!player || !positions || !positions[_currentLevel - 1]) return false;
  const end = positions[_currentLevel - 1];
  const px = player.position.x;
  const py = player.position.y;
  const pz = player.position.z;

  const dx = px - end.x;
  const dy = py - end.y;
  const dz = pz - end.z;

  if (Math.abs(dx) < 2 && Math.abs(dy) < 3 && Math.abs(dz) < 2) {
    if (_currentLevel < PARKOUR_LEVELS.length) {
      _currentLevel++;
      return 'level_complete';
    } else {
      return 'parkour_complete';
    }
  }
  return false;
}

// Get the respawn position for the current level
export function getRespawnPosition() {
  const cp = _checkpoints[_currentLevel];
  if (cp) return { x: cp.x, y: cp.y, z: cp.z };
  return null;
}

// Get current level info
export function getCurrentLevel() {
  return _currentLevel;
}

export function getCurrentLevelInfo() {
  if (_currentLevel >= 1 && _currentLevel <= PARKOUR_LEVELS.length) {
    return PARKOUR_LEVELS[_currentLevel - 1];
  }
  return null;
}

// Set level externally (for dev panel / admin)
export function setParkourLevel(lvl) {
  _currentLevel = Math.max(1, Math.min(PARKOUR_LEVELS.length, lvl));
}

// ─── Imported Parkour Map Loader ─────────────────────────────────────
// Loads .bin.gz files produced by convert-parkour.cjs (Minecraft Anvil → binary)

export async function loadImportedParkourChunks(url) {
  const res = await fetch(url);
  const compressed = await res.arrayBuffer();
  // Decompress gzip using native Compression Streams API
  const ds = new DecompressionStream('gzip');
  const writer = ds.writable.getWriter();
  writer.write(new Uint8Array(compressed));
  writer.close();
  const reader = ds.readable.getReader();
  const chunks = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }
  const totalLen = chunks.reduce((s, c) => s + c.length, 0);
  const buf = new Uint8Array(totalLen);
  let offset = 0;
  for (const c of chunks) { buf.set(c, offset); offset += c.length; }

  const view = new DataView(buf.buffer);
  const version = view.getInt32(0);
  const minX = view.getInt32(4);
  const maxX = view.getInt32(8);
  const minY = view.getInt32(12);
  const maxY = view.getInt32(16);
  const minZ = view.getInt32(20);
  const maxZ = view.getInt32(24);
  const spawnY = view.getInt32(28);
  const count = view.getInt32(32);

  console.log(`[Parkour] Loaded map: X[${minX}..${maxX}] Y[${minY}..${maxY}] Z[${minZ}..${maxZ}] spawnY=${spawnY} blocks=${count}`);
  return { version, minX, maxX, minY, maxY, minZ, maxZ, spawnY, count, buf, view };
}

export function buildImportedParkour(world, data) {
  const { buf, view } = data;
  const count = data.count;
  const spawnY = data.spawnY;

  // Place all blocks into _chunkEdits (bulk, no chunk creation)
  let placed = 0;
  for (let i = 0; i < count; i++) {
    const off = 36 + i * 16;
    const x = view.getInt32(off);
    const y = view.getInt32(off + 4);
    const z = view.getInt32(off + 8);
    const b = view.getInt32(off + 12);
    if (b !== 0) {
      world.bulkSetBlock(x, y, z, b);
      placed++;
    }
  }
  console.log(`[Parkour] Placed ${placed} blocks in world`);

  // Calculate spawn position at center of map, just above floor
  const spawnX = Math.round((data.minX + data.maxX) / 2);
  const spawnZ = Math.round((data.minZ + data.maxZ) / 2);
  const spawnYAdjusted = Math.max(data.minY + 3, spawnY || data.minY + 3);
  return { x: spawnX + 0.5, y: spawnYAdjusted, z: spawnZ + 0.5 };
}
