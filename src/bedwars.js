import { BLOCK } from './blocks.js';
import { ITEM } from './items.js';
import { assetBase } from './config.js';

// ─── Bedwars: "Treasure Island" ────────────────────────────────────────
// A faithful reproduction of TriplicataMC's Bedwars map "Treasure Island"
// (extracted from the provided world download). Void-sky team battle.
//
// Layout (source coords, rel. BW_Y):
//   - Center "treasure" island  +-38 blocks, raised emerald vault in the middle
//   - 4 large diamond islands    at is (+-81, +-81) (past the bases, wood/washed)
//   - 8 base islands             at (+-30,+-90)/(+-90,+-30); 4 can hold a bed
//   - 4 small mid islands        at (+-54, +-54)
// Islands are deterministic so every client builds the same arena.
// Iron/gold spawn at bases, diamond at the outer islands, emerald in the vault.

export const BW_Y = 120;          // island surface level
export const BW_VOID_BELOW = 95;  // below this the player falls into the void

export const BW_TEAMS = [
  { key: 'red',    name: 'Red',    color: '#ff4444' },
  { key: 'blue',   name: 'Blue',   color: '#4488ff' },
  { key: 'green',  name: 'Green',  color: '#44ff44' },
  { key: 'yellow', name: 'Yellow', color: '#ffee44' },
];

// Currency ids used by generators + shop
export const BW_RES_IRON = ITEM.IRON_INGOT;     // 259
export const BW_RES_GOLD = ITEM.GOLD_INGOT;     // 260
export const BW_RES_DIAMOND = ITEM.DIAMOND;     // 261
export const BW_RES_EMERALD = ITEM.EMERALD;     // 305

// ── Island placement (from the Treasure Island world, procedural fallback) ─
// The 4 team bases that carry gameplay (bed + spawn + shop + generators).
const BASE_SPOTS = [
  { key: 'red',    x: -32, z: -90 },
  { key: 'blue',   x:  31, z: -90 },
  { key: 'green',  x: -30, z:  91 },
  { key: 'yellow', x:  32, z:  91 },
];
// The other 4 base islands appear in the source as decor — reproduced as-is.
const DECO_SPOTS = [
  [ 91, -31 ], [ 91, 27 ], [ -90, -27 ], [ -90, 28 ],
];
// Large diamond islands past the bases + small mid islands nearer center.
const DIAMOND_SPOTS = [[81, 81], [-81, 81], [81, -81], [-81, -81]];
const MID_SPOTS = [[54, 54], [-54, 54], [54, -54], [-54, -54]];

// ── Imported "Treasure Island" gameplay anchors ──────────────────────────
// Measured from the imported world (scripts/generate-treasure-island.mjs):
// the 4 team islands sit at these offsets from the origin, with their top
// surfaces at BW_Y. The overlay (beds/shops/spawns/generators) is snapped to
// the real island geometry at load time, so these are only starting points.
export const IMP_BASE_SPOTS = [
  { key: 'red',    x: -80, z: -84 },
  { key: 'blue',   x:  81, z: -82 },
  { key: 'green',  x: -71, z:  76 },
  { key: 'yellow', x:  72, z:  78 },
];
// Mid/bridge islands carry the diamond generators in the imported layout.
export const IMP_MID_SPOTS = [[30, 30], [-30, 30], [30, -30], [-30, -30]];

// ─── Imported Treasure Island Map Loader ────────────────────────────────
// Loads the actual Minecraft world data converted from .mca region files.
// Format: 36-byte BE header + LE block records (same as parkour imported maps).

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
  const blob = new Blob([buf]);
  const ds = new Response(blob.stream().pipeThrough(new DecompressionStream('gzip')));
  return new Uint8Array(await ds.arrayBuffer());
}

export async function loadTreasureIslandData() {
  const url = assetBase() + 'treasure-island.bin.gz';
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch Treasure Island map: ${res.status}`);
  const compressed = await res.arrayBuffer();
  const buf = await decompressGzip(compressed);

  const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  const version = view.getInt32(0, false);
  const minX = view.getInt32(4, false);
  const maxX = view.getInt32(8, false);
  const minY = view.getInt32(12, false);
  const maxY = view.getInt32(16, false);
  const minZ = view.getInt32(20, false);
  const maxZ = view.getInt32(24, false);
  const spawnY = view.getInt32(28, false);
  const count = view.getInt32(32, false);

  return { version, minX, maxX, minY, maxY, minZ, maxZ, spawnY, count, buf, view };
}

export function buildTreasureIslandMap(world, data) {
  const { view } = data;
  const count = data.count;

  // The .bin.gz is pre-processed into game coordinates (origin-centered, Y
  // shifted so team-island surfaces sit at ~BW_Y) by
  // scripts/generate-treasure-island.mjs — so place records verbatim.
  let placed = 0;
  for (let i = 0; i < count; i++) {
    const off = 36 + i * 16;
    const x = view.getInt32(off, true);
    const y = view.getInt32(off + 4, true);
    const z = view.getInt32(off + 8, true);
    const b = view.getInt32(off + 12, true);
    if (b !== 0) {
      world.bulkSetBlock(x, y, z, b);
      placed++;
    }
  }

  // First solid surface near the center — the vault deck the player spawns on.
  return snapTop(world, 0, 0, 6, { minY: BW_Y - 40 });
}

// Deterministic per-team assignment: sort the roster by name and deal teams
// round-robin, so every client agrees on the mapping without extra network.
export function assignBedwarsTeam(playerName, roster) {
  const names = [...(roster || [])].filter(n => n && n !== playerName);
  names.push(playerName);
  names.sort();
  const idx = names.indexOf(playerName);
  return BW_TEAMS[((idx % BW_TEAMS.length) + BW_TEAMS.length) % BW_TEAMS.length];
}

function setR(world, x, y, z, b) { world.setBlock(x, y, z, b); }

// Rounded-square platform (chamfered corners) centered at (cx,cz) on layer y.
function roundedSquare(world, cx, cz, half, y, block) {
  const chamfer = Math.ceil(half / 3);
  for (let dx = -half; dx <= half; dx++) {
    for (let dz = -half; dz <= half; dz++) {
      if (Math.abs(dx) + Math.abs(dz) > half + chamfer) continue; // chamfer corners
      setR(world, cx + dx, y, cz + dz, block);
    }
  }
}

// Overwrite the outer `rim` of a platform with a different block (sand rim).
function rimSquare(world, cx, cz, half, y, block, rimW = 2) {
  for (let dx = -half; dx <= half; dx++) {
    for (let dz = -half; dz <= half; dz++) {
      if (Math.abs(dx) + Math.abs(dz) > half * 2) continue;
      if (Math.abs(dx) >= half - rimW || Math.abs(dz) >= half - rimW) {
        setR(world, cx + dx, y, cz + dz, block);
      }
    }
  }
}

// Build a floating island: top layer `fill` with a `rim` border, tapering
// `depth` blocks down into the void (underside = same palette).
function buildIsland(world, cx, cz, half, y, fill, rim, depth = 3) {
  for (let d = 0; d < depth; d++) {
    const h = half - d;
    if (h < 1) break;
    roundedSquare(world, cx, cz, h, y - d, d === 0 ? fill : (fill === rim ? fill : rim));
    if (d === 0 && rim && rim !== fill) rimSquare(world, cx, cz, h, y, rim);
  }
}

// Find the best solid surface within `radius` of (x,z). Forces chunk
// generation so imported bulk-loaded geometry (stored in _chunkEdits, applied
// lazily by generateChunk) is visible. Returns {x,z,y} or null.
//
// Uses the modal (most common) surface height — the flat deck — rather than the
// tallest column, so generators/beds/shops land on playable island surfaces
// instead of decorative spires (towers, trees, masts). Ties resolve to the
// higher height, then the column nearest (x,z).
function snapTop(world, x, z, radius, { minY = 0, maxY = BW_Y + 60 } = {}) {
  const cols = [];
  for (let dx = -radius; dx <= radius; dx++) {
    for (let dz = -radius; dz <= radius; dz++) {
      const wx = x + dx, wz = z + dz;
      world.getChunk(wx >> 4, wz >> 4);
      const t = world.heightAt(wx, wz);
      if (t >= minY && t <= maxY) cols.push({ x: wx, z: wz, y: t });
    }
  }
  if (!cols.length) return null;

  // Modal height, tie-break toward the higher surface.
  const freq = new Map();
  for (const c of cols) freq.set(c.y, (freq.get(c.y) || 0) + 1);
  let modeY = cols[0].y, modeN = 0;
  for (const [y, n] of freq) {
    if (n > modeN || (n === modeN && y > modeY)) { modeY = y; modeN = n; }
  }

  // Nearest column at the modal height.
  let best = null, bestD = Infinity;
  for (const c of cols) {
    if (c.y !== modeY) continue;
    const d = (c.x - x) * (c.x - x) + (c.z - z) * (c.z - z);
    if (d < bestD) { bestD = d; best = c; }
  }
  return best;
}

// Build the island platforms + beds. Returns team + generator metadata.
// If gameplayOnly=true, skips geometry and only places beds/shops/generators.
// Pass { snap:true, base: IMP_BASE_SPOTS, mid: IMP_MID_SPOTS } to place the
// overlay on the imported Treasure Island geometry by snapping to its real
// islands (used after the imported map has been bulk-loaded).
export function buildBedwarsMap(world, gameplayOnly = false, spots = {}) {
  const map = {
    beds: {},        // teamKey -> [{x,y,z}] bed cells
    spawn: {},       // teamKey -> {x,y,z,yaw}
    shop: {},        // teamKey -> {x,y,z}
    generators: [],  // { item, stack, every, x, y, z }
  };

  const baseSpots = spots.base || BASE_SPOTS;
  const diamondSpots = spots.diamond || DIAMOND_SPOTS;
  const midSpots = spots.mid || MID_SPOTS;
  const snap = !!(spots.snap && gameplayOnly);

  const gen = (item, stack, every, x, z, y) => {
    map.generators.push({ item, stack, every, x, y: y ?? BW_Y + 3, z });
  };

  // ── Imported-arena overlay: snap every item to the real island surfaces ─
  if (snap) {
    // Emerald vault: center island, diamond gens: the 4 mid/bridge islands.
    const vt = snapTop(world, 0, 0, 6, {});
    gen(BW_RES_EMERALD, 1, 30, vt ? vt.x : 0, vt ? vt.z : 0, (vt ? vt.y : BW_Y) + 4);
    for (const [dx, dz] of midSpots) {
      const t = snapTop(world, dx, dz, 6, { minY: BW_Y - 30, maxY: BW_Y + 24 });
      const gx = t ? t.x : dx, gz = t ? t.z : dz, gy = t ? t.y : BW_Y;
      gen(BW_RES_DIAMOND, 1, 12, gx, gz, gy + 3);
    }

    for (const spot of baseSpots) {
      const team = BW_TEAMS.find(t => t.key === spot.key);
      const dirX = -spot.x, dirZ = -spot.z;
      const nx = dirX === 0 ? 0 : dirX / Math.abs(dirX);
      const nz = dirZ === 0 ? 0 : dirZ / Math.abs(dirZ);

      // Snap onto the imported island so beds/shops land on solid ground.
      const top = snapTop(world, spot.x, spot.z, 14, { minY: BW_Y - 20, maxY: BW_Y + 24 });
      const ox = top ? top.x : spot.x;
      const oz = top ? top.z : spot.z;
      const oy = (top ? top.y : BW_Y);

      const bedCells = [
        { x: ox, y: oy + 1, z: oz },
        { x: ox + nx, y: oy + 1, z: oz + nz },
      ];
      setR(world, bedCells[0].x, bedCells[0].y, bedCells[0].z, BLOCK.BED_FOOT);
      setR(world, bedCells[1].x, bedCells[1].y, bedCells[1].z, BLOCK.BED);
      map.beds[team.key] = bedCells;

      const spx = ox + nz * 2 - nx * 0.5;
      const spz = oz + nx * 2 + nz * 0.5;
      const spSnap = snapTop(world, Math.floor(spx), Math.floor(spz), 4, { minY: BW_Y - 20, maxY: BW_Y + 24 });
      const sp = {
        x: spSnap ? spSnap.x : spx,
        y: (spSnap ? spSnap.y : oy) + 1,
        z: spSnap ? spSnap.z : spz,
        yaw: Math.atan2(-spot.x, -spot.z),
      };
      map.spawn[team.key] = sp;

      let sx = ox - nz * 4, sz = oz + nx * 4, shopY = oy;
      const st = snapTop(world, sx, sz, 8, { minY: BW_Y - 30, maxY: BW_Y + 24 });
      if (st) { sx = st.x; sz = st.z; shopY = st.y; }
      setR(world, sx, shopY + 1, sz, BLOCK.CRAFTING);
      setR(world, sx - nz, shopY + 1, sz + nx, BLOCK.CHEST);
      map.shop[team.key] = { x: sx, y: shopY + 1, z: sz };

      // Base generators: iron (fast) + gold (slow) — snapped so resources
      // drip onto the island instead of a neighboring void gap.
      const g1 = snapTop(world, sx + nx * 2, sz + nz * 2, 4, { minY: BW_Y - 30, maxY: BW_Y + 24 });
      const g2 = snapTop(world, sx + nx * 3, sz + nz * 3, 4, { minY: BW_Y - 30, maxY: BW_Y + 24 });
      gen(BW_RES_IRON, 4, 3.5, g1 ? g1.x : sx, g1 ? g1.z : sz, (g1 ? g1.y : shopY) + 3);
      gen(BW_RES_GOLD, 2, 8, g2 ? g2.x : sx, g2 ? g2.z : sz, (g2 ? g2.y : shopY) + 3);
    }

    return map;
  }

  // ── Center island: big stone/andesite platform with a sand rim ─────────
  // (source: ~76x76, smooth_sandstone + andesite deck, water shore)
  if (!gameplayOnly) {
    buildIsland(world, 0, 0, 38, BW_Y, BLOCK.SMOOTH_STONE, BLOCK.SAND, 4);

    // Raised treasure vault in the middle (source: emerald blocks ~15x15)
    const V = BLOCK.GOLD_BLOCK, OBS = BLOCK.OBSIDIAN, DB = BLOCK.DIAMOND_BLOCK;
    roundedSquare(world, 0, 0, 9, BW_Y + 1, BLOCK.SMOOTH_STONE);
    roundedSquare(world, 0, 0, 4, BW_Y + 2, BLOCK.OBSIDIAN);
    setR(world, 0, BW_Y + 3, 0, V);
    setR(world, 0, BW_Y + 3, 1, V);
    setR(world, 1, BW_Y + 3, 0, V);
    setR(world, 1, BW_Y + 3, 1, DB);
    setR(world, -1, BW_Y + 3, 0, DB);
    setR(world, 0, BW_Y + 3, -1, DB);
    setR(world, -1, BW_Y + 3, -1, V);
    setR(world, 0, BW_Y + 4, 0, OBS);

    // A few buried chests to dress the treasure look
    setR(world, 3, BW_Y + 1, -3, BLOCK.CHEST);
    setR(world, -3, BW_Y + 1, 3, BLOCK.CHEST);
  }

  // Mid generators: emerald in the vault, diamond on the deck corner.
  gen(BW_RES_EMERALD, 1, 30, 0, 0);
  gen(BW_RES_DIAMOND, 1, 18, 5, 5);

  // ── Small mid islands (source: stone + sand ~18x18, no generators) ─────
  if (!gameplayOnly) {
    for (const [mx, mz] of midSpots) {
      buildIsland(world, mx, mz, 9, BW_Y, BLOCK.STONE, BLOCK.SAND, 3);
      setR(world, mx, BW_Y + 1, mz, BLOCK.GOLD_BLOCK);
    }
  }

  // ── Large diamond islands past the bases (source: wood/sandstone isles) ─
  for (const [dx, dz] of diamondSpots) {
    if (!gameplayOnly) {
      buildIsland(world, dx, dz, 17, BW_Y, BLOCK.SMOOTH_SANDSTONE, BLOCK.SAND, 3);
      // Palm-trunk accents (mangrove in the source -> dark oak here)
      for (let i = -12; i <= 12; i += 6) {
        setR(world, dx + i, BW_Y + 1, dz - 12, BLOCK.DARK_OAK_WOOD);
        setR(world, dx + i, BW_Y + 1, dz + 12, BLOCK.DARK_OAK_WOOD);
        setR(world, dx - 12, BW_Y + 1, dz + i, BLOCK.DARK_OAK_WOOD);
        setR(world, dx + 12, BW_Y + 1, dz + i, BLOCK.DARK_OAK_WOOD);
      }
      // Diamond gen + blocks (source had diamond_block clusters here)
      setR(world, dx, BW_Y + 1, dz, BLOCK.DIAMOND_BLOCK);
      setR(world, dx + 1, BW_Y + 1, dz, BLOCK.DIAMOND_BLOCK);
      setR(world, dx, BW_Y + 1, dz + 1, BLOCK.DIAMOND_BLOCK);
    }
    gen(BW_RES_DIAMOND, 1, 12, dx, dz);
  }

  // ── The 4 unused base islands (decoration only, from the source map) ────
  if (!gameplayOnly) {
    for (const [dx, dz] of DECO_SPOTS) {
      buildIsland(world, dx, dz, 15, BW_Y, BLOCK.DEEPSLATE, BLOCK.SMOOTH_SANDSTONE, 3);
      setR(world, dx, BW_Y + 1, dz, BLOCK.DIAMOND_BLOCK);
    }
  }

  // ── Team bases: 4 gameplay islands (gray deck, sand rim, wool marker) ───
  for (const spot of baseSpots) {
    const team = BW_TEAMS.find(t => t.key === spot.key);
    const bx = spot.x, bz = spot.z, by = BW_Y;

    if (!gameplayOnly) {
      buildIsland(world, bx, bz, 15, by, BLOCK.DEEPSLATE, BLOCK.SMOOTH_SANDSTONE, 3);
      // Cobble inner apron (source: cobbled_deepslate ring)
      rimSquare(world, bx, bz, 11, by, BLOCK.COBBLESTONE, 2);
      // Team-colored wool pillar ring (helps identify bases while far away)
      for (let dy = 1; dy <= 3; dy++) setR(world, bx - 6, by + dy, bz - 6, BLOCK.WOOL);
    }

    // Bed: two cells facing the middle (inner edge of the platform)
    const dirX = -bx, dirZ = -bz;
    const nx = dirX === 0 ? 0 : dirX / Math.abs(dirX);
    const nz = dirZ === 0 ? 0 : dirZ / Math.abs(dirZ);
    const bedCells = [
      { x: bx + nx * 2, y: by + 1, z: bz + nz * 2 },
      { x: bx + nx * 3, y: by + 1, z: bz + nz * 3 },
    ];
    setR(world, bedCells[0].x, bedCells[0].y, bedCells[0].z, BLOCK.BED_FOOT);
    setR(world, bedCells[1].x, bedCells[1].y, bedCells[1].z, BLOCK.BED);
    map.beds[team.key] = bedCells;

    // Spawn: beside the bed, facing the middle (off the wool pillar).
    const sp = {
      x: bx + nz * 4.5 - nx * 1.5,
      y: by + 1,
      z: bz + nx * 4.5 + nz * 1.5,
      yaw: Math.atan2(bx, bz),
    };
    map.spawn[team.key] = sp;

    // Shop: workbench (opens the shop when right-clicked) + a chest
    const sx = bx - nz * 4, sz = bz + nx * 4;
    setR(world, sx, by + 1, sz, BLOCK.CRAFTING);
    setR(world, sx - nz, by + 1, sz + nx, BLOCK.CHEST);
    map.shop[team.key] = { x: sx, y: by + 1, z: sz };

    // Base generators: iron (fast) + gold (slow) near the shop corner
    gen(BW_RES_IRON, 4, 3.5, sx + nx * 2, sz + nz * 2, by + 3);
    gen(BW_RES_GOLD, 2, 8, sx + nx * 3, sz + nz * 3, by + 3);
  }

  for (const cells of Object.values(map.beds)) {
    for (const c of cells) if (c.x == null) void c;
  }

  return map;
}

// ─── Shop catalog ─────────────────────────────────────────────────────
// cost = { <currency itemId>: <amount> } — a purchase needs all of them.
export const BW_SHOP = [
  { cat: 'Blocks', items: [
    { id: BLOCK.WOOL, name: 'Wool', count: 16, cost: { [BW_RES_IRON]: 4 }, desc: 'Cheap bridge block' },
    { id: BLOCK.PLANKS, name: 'Oak Planks', count: 16, cost: { [BW_RES_IRON]: 12 }, desc: 'Solid bridge block' },
    { id: BLOCK.END_STONE, name: 'End Stone', count: 16, cost: { [BW_RES_EMERALD]: 3 }, desc: 'Tough building block' },
    { id: BLOCK.OBSIDIAN, name: 'Obsidian', count: 4, cost: { [BW_RES_EMERALD]: 6 }, desc: 'Defend your bed!' },
  ]},
  { cat: 'Weapons', items: [
    { id: ITEM.WOOD_SWORD, name: 'Wooden Sword', count: 1, cost: { [BW_RES_IRON]: 6 }, desc: 'Basic melee' },
    { id: ITEM.IRON_SWORD, name: 'Iron Sword', count: 1, cost: { [BW_RES_IRON]: 20 }, desc: 'Strong melee' },
    { id: ITEM.DIAMOND_SWORD, name: 'Diamond Sword', count: 1, cost: { [BW_RES_EMERALD]: 24 }, desc: 'Best melee' },
  ]},
  { cat: 'Tools', items: [
    { id: ITEM.WOOD_PICKAXE, name: 'Wooden Pickaxe', count: 1, cost: { [BW_RES_IRON]: 12 }, desc: 'Break enemy bases' },
    { id: ITEM.IRON_PICKAXE, name: 'Iron Pickaxe', count: 1, cost: { [BW_RES_IRON]: 30 }, desc: 'Faster breaking' },
    { id: ITEM.DIAMOND_PICKAXE, name: 'Diamond Pickaxe', count: 1, cost: { [BW_RES_EMERALD]: 20 }, desc: 'Breaks almost anything' },
  ]},
  { cat: 'Utility', items: [
    { id: ITEM.GOLDEN_APPLE, name: 'Golden Apple', count: 1, cost: { [BW_RES_GOLD]: 6 }, desc: 'Restores health' },
    { id: ITEM.IRON_HELMET, name: 'Iron Helmet', count: 1, cost: { [BW_RES_IRON]: 12 }, desc: '+2 armor' },
    { id: ITEM.IRON_CHEST, name: 'Iron Chestplate', count: 1, cost: { [BW_RES_IRON]: 20 }, desc: '+6 armor' },
    { id: ITEM.IRON_LEGS, name: 'Iron Leggings', count: 1, cost: { [BW_RES_IRON]: 16 }, desc: '+5 armor' },
    { id: ITEM.IRON_BOOTS, name: 'Iron Boots', count: 1, cost: { [BW_RES_IRON]: 8 }, desc: '+2 armor' },
  ]},
];