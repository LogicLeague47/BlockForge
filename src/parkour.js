import { BLOCK } from './blocks.js';
import { assetBase } from './config.js';

// ─── Parkour Physics Constants (BlockForge-accurate) ───────────────────
// Walking jump:  ~2.4b flat (no sprint)
// Sprint jump:   ~3.4b flat (with sprint)
// Sprint+1momentum: ~4.0b
// Sprint+2momentum: ~4.5b
// Jump height:   ~1.25 blocks
// Player hitbox: 0.6 x 1.8 blocks

// ─── Level Definitions ────────────────────────────────────────────────
// Each level has: gap (air blocks between platforms), platforms per section,
// block type, accent block, special mechanics and a visual theme.
// Gap values account for player hitbox (0.6 wide) so a "2 gap" = ~2.4 effective.

export const PARKOUR_LEVELS = [
  { id: 1,  name: 'First Steps',       desc: 'Easy 1-block gaps',         gap: 1, w: 3, d: 3, count: 5, block: BLOCK.PLANKS,       accent: BLOCK.WOOL,         theme: 'meadow'   },
  { id: 2,  name: 'Getting Warmed Up', desc: '2-block sprint jumps',      gap: 2, w: 3, d: 3, count: 5, block: BLOCK.GRASS,        accent: BLOCK.PLANKS,       theme: 'temple'   },
  { id: 3,  name: 'Dirt Trail',        desc: 'Climbing with stairs',      gap: 2, w: 2, d: 3, count: 5, block: BLOCK.DIRT,          accent: BLOCK.GRASS,        staircase: true, theme: 'trail' },
  { id: 4,  name: 'Frozen Lake',       desc: 'Slippery ice platforms',    gap: 2, w: 3, d: 3, count: 6, block: BLOCK.ICE,           accent: BLOCK.SNOW_BLOCK,   ice: true, theme: 'frozen' },
  { id: 5,  name: 'The Zigzag',        desc: 'Diagonal jumps',            gap: 2, w: 2, d: 2, count: 6, block: BLOCK.COBBLESTONE,   accent: BLOCK.BRICK,        zigzag: true, theme: 'zigzag' },
  { id: 6,  name: 'Bouncy Gaps',       desc: 'Slime bounce pads',         gap: 3, w: 3, d: 3, count: 5, block: BLOCK.STONE,         accent: BLOCK.IRON_BLOCK,   slimePads: true, theme: 'bouncy' },
  { id: 7,  name: 'The Ascent',        desc: 'Climbing platforms',        gap: 2, w: 3, d: 3, count: 5, block: BLOCK.STONE,         accent: BLOCK.IRON_BLOCK,   staircase: true, stepH: 2, theme: 'ascent' },
  { id: 8,  name: 'Ice Precision',     desc: 'Narrow ice + slime',        gap: 2, w: 1, d: 2, count: 7, block: BLOCK.ICE,           accent: BLOCK.SLIME_BLOCK,  ice: true, theme: 'iceprec' },
  { id: 9,  name: 'Mixed Challenge',   desc: 'Long jumps + bounce',       gap: 3, w: 2, d: 3, count: 8, block: BLOCK.STONE_BRICKS,   accent: BLOCK.VOID_STONE,    slimePads: true, theme: 'mixed'    },
  { id: 10, name: 'The Final Leap',    desc: 'Go big or go home',         gap: 4, w: 3, d: 3, count: 6, block: BLOCK.OBSIDIAN,      accent: BLOCK.GOLD_BLOCK,   theme: 'crown'    },
  // ── New MC-style parkour levels (11-20) ──
  { id: 11, name: 'Brimstone Run',     desc: 'Hot brimstone jumps',       gap: 2, w: 2, d: 2, count: 8, block: BLOCK.NETHER_BRICK,  accent: BLOCK.EMBEROCK,     zigzag: true, theme: 'nether'   },
  { id: 12, name: 'Void Parkour',       desc: 'Void jumps over the void',   gap: 3, w: 2, d: 2, count: 7, block: BLOCK.VOIDSTONE,     accent: BLOCK.VOID_STONE,    theme: 'void'      },
  { id: 13, name: 'Ocean Climb',       desc: 'Underwater tower climb',    gap: 2, w: 2, d: 2, count: 8, block: BLOCK.QUARTZ_BLOCK,  accent: BLOCK.GLASS,        staircase: true, stepH: 2, theme: 'ocean'    },
  { id: 14, name: 'Jungle Heights',    desc: 'Vine-covered leaps',        gap: 3, w: 2, d: 3, count: 7, block: BLOCK.WOOD,          accent: BLOCK.LEAVES,       slimePads: true, theme: 'jungle'   },
  { id: 15, name: 'Canyon Drop',       desc: 'Descending precision',      gap: 2, w: 1, d: 2, count: 9, block: BLOCK.SANDSTONE,     accent: BLOCK.GRAVEL,       staircase: true, stepH: -1, theme: 'canyon'   },
  { id: 16, name: 'Ice Shaft',         desc: 'Vertical ice challenge',    gap: 2, w: 2, d: 2, count: 8, block: BLOCK.ICE,           accent: BLOCK.SNOW_BLOCK,   ice: true, staircase: true, stepH: 2, theme: 'frozen'   },
  { id: 17, name: 'Brick Blitz',       desc: 'Speed-run brick jumps',     gap: 3, w: 2, d: 2, count: 8, block: BLOCK.BRICK,         accent: BLOCK.QUARTZ_BLOCK, zigzag: true, theme: 'wide'      },
  { id: 18, name: 'Slime Gauntlet',    desc: 'Mega bounce challenge',     gap: 4, w: 3, d: 3, count: 6, block: BLOCK.IRON_BLOCK,    accent: BLOCK.SLIME_BLOCK,  slimePads: true, theme: 'bouncy'   },
  { id: 19, name: 'Diamond Heights',   desc: 'The ultimate climb',        gap: 3, w: 2, d: 2, count: 10, block: BLOCK.DIAMOND_BLOCK, accent: BLOCK.GOLD_BLOCK,   staircase: true, stepH: 2, theme: 'precision' },
  { id: 20, name: 'The Gauntlet',      desc: 'Master everything',         gap: 4, w: 2, d: 2, count: 10, block: BLOCK.OBSIDIAN,      accent: BLOCK.DIAMOND_BLOCK, ice: true, slimePads: true, zigzag: true, theme: 'crown'   },
];

// ─── Level themes: decorative palettes around the gameplay blocks ─────
const LEVEL_THEMES = {
  meadow:    { trim: BLOCK.HAY_BLOCK,    post: BLOCK.WOOD,          islet: BLOCK.LEAVES       },
  temple:    { trim: BLOCK.STONE_BRICKS, post: BLOCK.COBBLESTONE,   islet: BLOCK.SNOW_BLOCK   },
  trail:     { trim: BLOCK.GRAVEL,       post: BLOCK.PLANKS,        islet: BLOCK.HAY_BLOCK    },
  desert:    { trim: BLOCK.SANDSTONE,    post: BLOCK.SANDSTONE,     islet: BLOCK.SAND         },
  zigzag:    { trim: BLOCK.NETHER_BRICK, post: BLOCK.OBSIDIAN,      islet: BLOCK.EMBEROCK     },
  ascent:    { trim: BLOCK.SNOW_BLOCK,   post: BLOCK.IRON_BLOCK,    islet: BLOCK.SNOW_BLOCK   },
  wide:      { trim: BLOCK.BRICK,        post: BLOCK.QUARTZ_BLOCK,  islet: BLOCK.CONCRETE     },
  precision: { trim: BLOCK.IRON_BARS,    post: BLOCK.QUARTZ_BLOCK,  islet: BLOCK.QUARTZ_BLOCK },
  mixed:     { trim: BLOCK.VOID_STONE,    post: BLOCK.VOIDSTONE,     islet: BLOCK.VOIDSTONE    },
  crown:     { trim: BLOCK.GOLD_BLOCK,   post: BLOCK.DIAMOND_BLOCK, islet: BLOCK.GOLD_BLOCK   },
  frozen:    { trim: BLOCK.ICE,          post: BLOCK.SNOW_BLOCK,    islet: BLOCK.SNOW_BLOCK   },
  bouncy:    { trim: BLOCK.SLIME_BLOCK,  post: BLOCK.COBBLESTONE,   islet: BLOCK.LEAVES       },
  iceprec:   { trim: BLOCK.ICE,          post: BLOCK.QUARTZ_BLOCK,  islet: BLOCK.QUARTZ_BLOCK },
  // New themes (MC parkour map translations)
  nether:    { trim: BLOCK.NETHER_BRICK, post: BLOCK.EMBEROCK,      islet: BLOCK.EMBEROCK     },
  end:       { trim: BLOCK.VOIDSTONE,    post: BLOCK.OBSIDIAN,      islet: BLOCK.VOID_STONE    },
  ocean:     { trim: BLOCK.QUARTZ_BLOCK, post: BLOCK.CONCRETE,      islet: BLOCK.GLASS        },
  jungle:    { trim: BLOCK.LEAVES,       post: BLOCK.WOOD,          islet: BLOCK.LEAVES       },
  canyon:    { trim: BLOCK.SANDSTONE,    post: BLOCK.COBBLESTONE,   islet: BLOCK.GRAVEL       },
};

function fillBox(world, x, y, z, w, d, h, b) {
  for (let dx = 0; dx < w; dx++) for (let dz = 0; dz < d; dz++) for (let dy = 0; dy < h; dy++) {
    world.setBlock(x + dx, y + dy, z + dz, b);
  }
}

// A standing light post (optionally with a torch on top).
function post(world, x, y, z, h, mat, withTorch) {
  for (let i = 0; i < h; i++) world.setBlock(x, y + i, z, mat);
  if (withTorch) world.setBlock(x, y + h, z, BLOCK.TORCH);
}

// Small seeded RNG so decorations are stable across rebuilds.
function makeRng(seed) {
  let a = (seed >>> 0) || 1;
  return () => {
    a ^= a << 13; a ^= a >>> 17; a ^= a << 5; a >>>= 0;
    return a / 4294967296;
  };
}

// ─── Lobby ────────────────────────────────────────────────────────────
// A floating quartz plaza with a gold emblem, torch-lit corner towers,
// flower beds, a central lamp and a tall spire landmark behind the north
// wall. Walls are glass: a south gate leads out to the course.
export function buildParkourLobby(world, ox, oy, oz) {
  const half = 12;
  for (let dx = -half; dx <= half; dx++) {
    for (let dz = -half; dz <= half; dz++) {
      const onEdge = Math.abs(dx) === half || Math.abs(dz) === half;
      const emblem = Math.abs(dx) <= 1 && Math.abs(dz) <= 1;
      world.setBlock(ox + dx, oy, oz + dz, emblem ? BLOCK.GOLD_BLOCK : onEdge ? BLOCK.GLASS : BLOCK.QUARTZ_BLOCK);
    }
  }
  // Glass walls (2 high) with a south-facing gate at z = -half.
  for (let dx = -half; dx <= half; dx++) {
    for (let dz = -half; dz <= half; dz++) {
      if (Math.abs(dx) === half || Math.abs(dz) === half) {
        for (let wy = 1; wy <= 2; wy++) world.setBlock(ox + dx, oy + wy, oz + dz, BLOCK.GLASS);
        if (dz === -half && dx >= -2 && dx <= 2) {
          for (let wy = 1; wy <= 2; wy++) world.setBlock(ox + dx, oy + wy, oz + dz, BLOCK.AIR);
        }
      }
    }
  }
  // Corner towers with torches.
  for (const [cx, cz] of [[-half, -half], [half, -half], [-half, half], [half, half]]) {
    post(world, ox + cx, oy + 1, oz + cz, 3, BLOCK.QUARTZ_BLOCK, true);
    world.setBlock(ox + cx, oy, oz + cz, BLOCK.QUARTZ_BLOCK);
  }
  // Flower beds in the two front corners (away from the gate path).
  for (const [fx, fz] of [[-9, -9], [9, -9]]) {
    fillBox(world, ox + fx, oy, oz + fz, 3, 3, 1, BLOCK.DIRT);
    world.setBlock(ox + fx + 1, oy + 1, oz + fz, BLOCK.FLOWER_RED);
    world.setBlock(ox + fx + 1, oy + 1, oz + fz + 2, BLOCK.FLOWER_YELLOW);
    world.setBlock(ox + fx + 2, oy + 1, oz + fz + 1, BLOCK.TORCH);
  }
  // Central lamp post (kept clear of the spawn point at the emblem).
  post(world, ox, oy + 1, oz + 6, 2, BLOCK.PLANKS, true);
  // Tall spire landmark rising behind the north wall.
  for (let i = 1; i <= 12; i++) {
    world.setBlock(ox, oy + i, oz + half + 4, i % 3 === 0 ? BLOCK.GOLD_BLOCK : BLOCK.QUARTZ_BLOCK);
    if (i % 4 === 0) world.setBlock(ox, oy + i, oz + half + 4, BLOCK.TORCH);
  }
}

// ─── Level building ───────────────────────────────────────────────────
// Builds one level: a start pad (with gold checkpoint + corner beacon),
// the configured platform run (physics identical to the classic course),
// side light beacons beside the path, and a gold end pad with back-corner
// towers. Returns the end marker plus geometry needed for transitions.
export function buildParkourLevel(world, levelNum, ox, oy, oz) {
  const cfg = PARKOUR_LEVELS[levelNum - 1] || PARKOUR_LEVELS[0];
  const theme = LEVEL_THEMES[cfg.theme] || LEVEL_THEMES.meadow;
  const b = cfg.block;
  const g = cfg.gap;
  let wy = oy;
  let cz = oz;

  // Start pad + gold checkpoint.
  fillBox(world, ox - 2, oy, oz - 2, 5, 6, 1, b);
  fillBox(world, ox - 1, oy + 1, oz + 1, 3, 3, 1, BLOCK.GOLD_BLOCK);
  // Back-corner beacon on the start pad.
  post(world, ox - 2, oy + 1, oz - 2, 2, theme.post, true);

  // Platform run.
  let prevCz = cz;
  let prevWy = oy;
  let prevWx = ox;
  for (let i = 0; i < cfg.count; i++) {
    cz -= (cfg.d + g);
    const wx = cfg.zigzag ? ox + (i % 2 === 0 ? 1 : -1) * (i + 1) : ox;
    const wy2 = cfg.staircase ? wy + (i + 1) * (cfg.stepH || 1) : wy;
    const accentBlocks = cfg.zigzag ? [] : [cfg.accent];
    fillBox(world, wx, wy2, cz, cfg.w, cfg.d, 1, b);
    if (accentBlocks.length) {
      const accentX = wx + Math.floor(cfg.w / 2);
      const accentZ = cz + cfg.d - 1;
      fillBox(world, accentX, wy2 + 1, accentZ, 1, 1, 1, accentBlocks[0]);
    }
    // Slime bounce pad in the middle of each gap
    if (cfg.slimePads && i > 0) {
      const midCz = Math.floor((prevCz + cz + cfg.d) / 2);
      const midWy = Math.floor((prevWy + wy2) / 2);
      fillBox(world, prevWx, midWy, midCz, 1, 1, 1, BLOCK.SLIME_BLOCK);
    }
    // Side light beacons beside the path (never on the landing line).
    if (!cfg.zigzag && i % 2 === 1) {
      const bx = wx + Math.floor(cfg.w / 2) + 3;
      post(world, bx, wy2, cz + 1, 3 + (i % 3), theme.post, true);
    }
    prevCz = cz;
    prevWy = wy2;
    prevWx = wx;
  }

  // Gold end pad + back-corner towers.
  const endWy = cfg.staircase ? wy + (cfg.count) * (cfg.stepH || 1) : wy;
  const endCz = cz - 2;
  fillBox(world, ox - 2, endWy, endCz, 5, 5, 1, BLOCK.GOLD_BLOCK);
  post(world, ox - 2, endWy + 1, endCz, 2, theme.post, true);
  post(world, ox + 2, endWy + 1, endCz, 2, theme.post, true);

  return { x: ox + 1, y: endWy + 2, z: endCz + 2, levelEnd: true, endWy, endCz };
}

// Stair bridge connecting an end pad (row rowFrom) up to the next level's
// start pad (row rowTo). Merges cleanly into both pads.
function stairBridge(world, ox, rowFrom, zStart, rowTo) {
  const rise = rowTo - rowFrom;
  const steps = 6;
  for (let k = 1; k <= steps; k++) {
    const row = rowFrom + Math.floor((k * rise) / steps);
    fillBox(world, ox - 2, row, zStart - k, 5, 1, 1, BLOCK.PLANKS);
  }
}

// Floating decorative islets around a level — always far from the course in
// X so they never interact with a fall or a jump.
function scatterIslets(world, ox, rowY, centerZ, cfg, seed) {
  const theme = LEVEL_THEMES[cfg.theme] || LEVEL_THEMES.meadow;
  const rng = makeRng(seed * 7919 + 13);
  const span = (cfg.count + 1) * (cfg.d + cfg.g) + 8;
  for (let k = 0; k < 4; k++) {
    const side = rng() < 0.5 ? -1 : 1;
    const dist = 14 + Math.floor(rng() * 7);
    const ix = ox + side * dist;
    const iz = centerZ - Math.floor(rng() * span);
    const iy = rowY - 2 + Math.floor(rng() * 5);
    fillBox(world, ix - 1, iy, iz - 1, 3, 1, 1, theme.islet);
    world.setBlock(ix, iy + 1, iz, theme.trim);
  }
}

// ─── Full course ──────────────────────────────────────────────────────
// The "Sky Temple": lobby plaza at (ox, oy, oz), a south bridge into level 1,
// then 10 themed levels climbing the sky, each linked by stair bridges.
// Returns the level-end markers for main.js checkLevelEnd().
export function buildAllLevels(world, ox, oy, oz) {
  const positions = [];
  _checkpoints = {};
  _levelStartPositions = [];

  buildParkourLobby(world, ox, oy, oz);

  // Bridge from the plaza's south gate to level 1's start pad front edge.
  // Level 1 start pad occupies z [oz-2 .. oz+3]; the gate sits at z = -12.
  for (let z = -13; z <= oz + 3; z++) {
    for (let dx = -2; dx <= 2; dx++) world.setBlock(ox + dx, oy, z, BLOCK.PLANKS);
  }

  let cy = oy;
  let cz = oz;
  for (let i = 0; i < PARKOUR_LEVELS.length; i++) {
    const startPos = { x: ox + 1, y: cy + 2, z: cz + 1 };
    _levelStartPositions.push(startPos);
    _checkpoints[i + 1] = startPos;

    const r = buildParkourLevel(world, i + 1, ox, cy, cz);
    positions.push(r);
    scatterIslets(world, ox, r.endWy, r.endCz, PARKOUR_LEVELS[i], i + 1);

    if (i < PARKOUR_LEVELS.length - 1) {
      const nextCz = r.endCz - 5;
      const nextCy = r.endWy + 3;
      stairBridge(world, ox, r.endWy, r.endCz, nextCy);
      cz = nextCz;
      cy = nextCy;
    }
  }

  // Grand finish: a raised gold shrine below the final crown pad.
  const last = positions[positions.length - 1];
  if (last) {
    fillBox(world, ox - 3, last.endWy - 3, last.endCz + 4, 7, 7, 1, BLOCK.GOLD_BLOCK);
    post(world, ox - 3, last.endWy - 2, last.endCz + 4, 3, BLOCK.DIAMOND_BLOCK, true);
    post(world, ox + 3, last.endWy - 2, last.endCz + 4, 3, BLOCK.DIAMOND_BLOCK, true);
  }

  return positions;
}

// ─── Parkour Runtime API ──────────────────────────────────────────────
// Called from main.js to manage checkpoints, timer, and respawn.

let _checkpoints = {};   // { levelNum: { x, y, z } }
let _currentLevel = 1;
let _parkourTimer = 0;
let _parkourStartTime = 0;
let _levelStartPositions = [];  // start position of each level
let _elapsed = 0;
let _running = false;
let _deaths = 0;
let _levelSplits = [];   // [{level, time, name}] — recorded on each level completion

export function resetParkourState() {
  _checkpoints = {};
  _currentLevel = 1;
  _parkourTimer = 0;
  _parkourStartTime = 0;
  _elapsed = 0;
  _running = false;
  _levelStartPositions = [];
  _deaths = 0;
  _levelSplits = [];
}

export function startParkourTimer() {
  _parkourStartTime = performance.now();
  _parkourTimer = 0;
  _elapsed = 0;
  _running = true;
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

export function addParkourDeath() { _deaths++; }
export function getParkourDeaths() { return _deaths; }

export function recordLevelSplit(levelNum, time, name) {
  _levelSplits.push({ level: levelNum, time, name });
}
export function getLevelSplits() { return _levelSplits; }

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
    // Check level-start checkpoints (advance to next level)
    for (let lvl = 1; lvl <= PARKOUR_LEVELS.length; lvl++) {
      const cp = _checkpoints[lvl];
      if (cp && Math.abs(px - cp.x) <= 2 && Math.abs(pz - cp.z) <= 2) {
        if (cp.y >= py - 2 && cp.y <= py + 2) {
          if (lvl > _currentLevel) {
            _currentLevel = lvl;
            return true;
          }
          return false;
        }
      }
    }

    // Mid-level or same-level checkpoint: save and respawn here on death
    if (_currentLevel >= 1 && _currentLevel <= PARKOUR_LEVELS.length) {
      _checkpoints[_currentLevel] = { x: px, y: py, z: pz };
      return true;
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
      const lvl = PARKOUR_LEVELS[_currentLevel - 1];
      recordLevelSplit(_currentLevel, getParkourTimer(), lvl ? lvl.name : '');
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
  if (!Number.isFinite(lvl)) return;
  _currentLevel = Math.max(1, Math.min(PARKOUR_LEVELS.length, lvl));
}

// ─── Imported Parkour Map Loader ─────────────────────────────────────
// Loads .bin.gz files produced by convert-parkour.cjs (BlockForge Anvil → binary)

async function decompressGzip(buf) {
  if (typeof DecompressionStream !== 'undefined') {
    const ds = new DecompressionStream('gzip');
    const writer = ds.writable.getWriter();
    writer.write(new Uint8Array(buf));
    writer.close();
    const reader = ds.readable.getReader();
    const chunks = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }
    const totalLen = chunks.reduce((s, c) => s + c.length, 0);
    const result = new Uint8Array(totalLen);
    let offset = 0;
    for (const c of chunks) { result.set(c, offset); offset += c.length; }
    return result;
  }
  // Fallback: use a manual gzip decompressor via fetch with 'gzip' encoding hint
  const blob = new Blob([buf]);
  const ds = new Response(blob.stream().pipeThrough(new DecompressionStream('gzip')));
  return new Uint8Array(await ds.arrayBuffer());
}

export async function loadImportedParkourChunks(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch map: ${res.status}`);
  const compressed = await res.arrayBuffer();
  const buf = await decompressGzip(compressed);

  const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  const version = view.getInt32(0, false);  // Big Endian (conversion script writes BE header)
  const minX = view.getInt32(4, false);
  const maxX = view.getInt32(8, false);
  const minY = view.getInt32(12, false);
  const maxY = view.getInt32(16, false);
  const minZ = view.getInt32(20, false);
  const maxZ = view.getInt32(24, false);
  const spawnY = view.getInt32(28, false);
  const count = view.getInt32(32, false);

  // Loaded map
  return { version, minX, maxX, minY, maxY, minZ, maxZ, spawnY, count, buf, view };
}

export function buildImportedParkour(world, data) {
  const { buf, view } = data;
  const count = data.count;

  const centerX = Math.round((data.minX + data.maxX) / 2);
  const centerZ = Math.round((data.minZ + data.maxZ) / 2);
  let lowestSolid = 255;

  // Place all blocks into _chunkEdits (bulk, no chunk creation)
  let placed = 0;
  for (let i = 0; i < count; i++) {
    const off = 36 + i * 16;
    const x = view.getInt32(off, true);   // Little Endian (body is LE)
    const y = view.getInt32(off + 4, true);
    const z = view.getInt32(off + 8, true);
    const b = view.getInt32(off + 12, true);
    if (b !== 0) {
      world.bulkSetBlock(x, y, z, b);
      placed++;
      if (Math.abs(x - centerX) <= 2 && Math.abs(z - centerZ) <= 2 && b !== 9 && y < lowestSolid) {
        lowestSolid = y;
      }
    }
  }

  const spawnYAdjusted = lowestSolid + 1;
  return { x: centerX + 0.5, y: spawnYAdjusted, z: centerZ + 0.5 };
}

// ── Best Times / Leaderboard ──────────────────────────────────────────
const _BEST_TIMES_KEY = 'bf_parkour_best';

function _loadBestTimes() {
  try { return JSON.parse(localStorage.getItem(_BEST_TIMES_KEY)) || {}; } catch (_) { return {}; }
}
function _saveBestTimes(data) {
  try { localStorage.setItem(_BEST_TIMES_KEY, JSON.stringify(data)); } catch (_) {}
}

export function saveParkourBestTime(theme, time, deaths, grade) {
  const all = _loadBestTimes();
  if (!all[theme] || time < all[theme].time) {
    all[theme] = { time, deaths, grade, date: Date.now() };
    _saveBestTimes(all);
  }
}

export function getParkourBestTime(theme) {
  const all = _loadBestTimes();
  return all[theme] || null;
}

export function getParkourLeaderboard() {
  return _loadBestTimes();
}
