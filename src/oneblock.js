import { BLOCK } from './blocks.js';

// ─── OneBlock ─────────────────────────────────────────────────────────
// Classic sky-block grind: one single block in the void. Breaking it drops
// resources and it regenerates as a random block from the current phase's
// pool. The phases mirror Minecraft OneBlock's progression (Plains → Lush),
// minus the Nether and End phases. Each block weight is a percentage of the
// phase's drop pool, tuned from the classic OneBlock block tables.

export const ONEBLOCK_STAGES = [
  // Phase 1 — Plains. The OG starting phase: grass, dirt, wood, sand — no stone.
  // Mirrors classic OneBlock Plains (grass/dirt/wood/leaves/sand/gravel/coal).
  { name: 'Plains', req: 0,   blocks: [[BLOCK.GRASS, 28], [BLOCK.DIRT, 22], [BLOCK.WOOD, 12], [BLOCK.LEAVES, 10], [BLOCK.SAND, 8], [BLOCK.GRAVEL, 6], [BLOCK.COAL_ORE, 5], [BLOCK.CLAY, 4], [BLOCK.FLOWER_YELLOW, 3], [BLOCK.FLOWER_RED, 2]] },
  // Phase 2 — Underground. Stone/cobble world, coal/iron/gold ores, diamond.
  { name: 'Underground', req: 50,  blocks: [[BLOCK.STONE, 30], [BLOCK.COBBLESTONE, 16], [BLOCK.DIRT, 12], [BLOCK.COAL_ORE, 10], [BLOCK.IRON_ORE, 8], [BLOCK.GRAVEL, 8], [BLOCK.DEEPSLATE, 5], [BLOCK.SANDSTONE, 4], [BLOCK.OBSIDIAN, 3], [BLOCK.GOLD_ORE, 2], [BLOCK.DIAMOND_ORE, 2]] },
  // Phase 3 — Winter. Snowy biome, spruce wood, ice-like blocks, gold/diamond.
  { name: 'Winter', req: 120, blocks: [[BLOCK.SNOW, 22], [BLOCK.SNOW_GRASS, 16], [BLOCK.SNOW_BLOCK, 12], [BLOCK.SPRUCE_WOOD, 10], [BLOCK.SPRUCE_LEAVES, 8], [BLOCK.STONE, 8], [BLOCK.DIRT, 8], [BLOCK.COBBLESTONE, 6], [BLOCK.GOLD_ORE, 5], [BLOCK.IRON_ORE, 3], [BLOCK.DIAMOND_ORE, 2]] },
  // Phase 4 — Ocean. Sand/clay/gravel/prismarine, gold & iron, diamonds.
  { name: 'Ocean', req: 200, blocks: [[BLOCK.SAND, 20], [BLOCK.SANDSTONE, 15], [BLOCK.RED_SAND, 12], [BLOCK.GRAVEL, 12], [BLOCK.CLAY, 10], [BLOCK.PRISMARINE, 10], [BLOCK.DIRT, 8], [BLOCK.STONE, 7], [BLOCK.DARK_PRISMARINE, 3], [BLOCK.GOLD_ORE, 2], [BLOCK.IRON_ORE, 1]] },
  // Phase 5 — Jungle. Jungle wood/planks, leaves, ores incl. diamonds.
  { name: 'Jungle', req: 300, blocks: [[BLOCK.JUNGLE_WOOD, 20], [BLOCK.JUNGLE_PLANKS, 12], [BLOCK.LEAVES, 12], [BLOCK.DIRT, 12], [BLOCK.STONE, 10], [BLOCK.GRAVEL, 8], [BLOCK.COAL_ORE, 8], [BLOCK.PUMPKIN, 6], [BLOCK.GOLD_ORE, 5], [BLOCK.DIAMOND_ORE, 4], [BLOCK.EMERALD_ORE, 3]] },
  // Phase 6 — Swamp. Wet/decayed blocks, slime, gold & diamonds.
  { name: 'Swamp', req: 400, blocks: [[BLOCK.DIRT, 18], [BLOCK.GRAVEL, 14], [BLOCK.PODZOL, 12], [BLOCK.CLAY, 10], [BLOCK.SLIME_BLOCK, 8], [BLOCK.WOOD, 8], [BLOCK.COAL_ORE, 8], [BLOCK.LEAVES, 6], [BLOCK.MOSSY_COBBLESTONE, 5], [BLOCK.MYCELIUM, 3], [BLOCK.GOLD_ORE, 5], [BLOCK.DIAMOND_ORE, 3]] },
  // Phase 7 — Dungeon. Cobble/stone-brick ruins, obsidian, loot-friendly ores.
  { name: 'Dungeon', req: 500, blocks: [[BLOCK.COBBLESTONE, 16], [BLOCK.STONE_BRICKS, 14], [BLOCK.MOSSY_COBBLESTONE, 12], [BLOCK.MOSSY_STONE_BRICKS, 10], [BLOCK.CRACKED_STONE_BRICKS, 8], [BLOCK.GRAVEL, 8], [BLOCK.STONE, 8], [BLOCK.COAL_ORE, 6], [BLOCK.IRON_BARS, 5], [BLOCK.IRON_ORE, 5], [BLOCK.OBSIDIAN, 4], [BLOCK.GOLD_ORE, 2], [BLOCK.DIAMOND_ORE, 2]] },
  // Phase 8 — Desert. Sands, cactus, terracotta; emeralds start appearing.
  { name: 'Desert', req: 600, blocks: [[BLOCK.SAND, 28], [BLOCK.SANDSTONE, 18], [BLOCK.RED_SAND, 15], [BLOCK.CACTUS, 10], [BLOCK.TERRACOTTA, 10], [BLOCK.STONE, 7], [BLOCK.GOLD_ORE, 5], [BLOCK.DIAMOND_ORE, 4], [BLOCK.EMERALD_ORE, 3]] },
  // Phase 9 — Plenty. A rich overworld: planks, hay, wool, bookshelves, emeralds.
  { name: 'Plenty', req: 700, blocks: [[BLOCK.PLANKS, 16], [BLOCK.HAY_BLOCK, 12], [BLOCK.WOOL, 10], [BLOCK.WOOD, 10], [BLOCK.LEAVES, 10], [BLOCK.BOOKSHELF, 8], [BLOCK.PUMPKIN, 6], [BLOCK.EMERALD_ORE, 8], [BLOCK.GOLD_ORE, 6], [BLOCK.DIAMOND_ORE, 5], [BLOCK.IRON_ORE, 4], [BLOCK.TERRACOTTA, 5]] },
  // Phase 10 — Desolation. Rare dark blocks, treasure-grade ores.
  { name: 'Desolation', req: 800, blocks: [[BLOCK.VOIDSTONE, 16], [BLOCK.EMBEROCK, 12], [BLOCK.BLOCKSCRAP, 10], [BLOCK.OBSIDIAN, 10], [BLOCK.NETHER_BRICK, 8], [BLOCK.QUARTZ_BLOCK, 8], [BLOCK.STONE_BRICKS, 8], [BLOCK.CRACKED_STONE_BRICKS, 6], [BLOCK.DIAMOND_BLOCK, 8], [BLOCK.GOLD_BLOCK, 6], [BLOCK.DIAMOND_ORE, 5], [BLOCK.EMERALD_ORE, 3]] },
  // Phase 11 — Lush. The final overworld phase: rich soil, moss, prismite ore.
  { name: 'Lush', req: 900, blocks: [[BLOCK.PODZOL, 18], [BLOCK.MYCELIUM, 14], [BLOCK.MOSSY_STONE_BRICKS, 12], [BLOCK.MOSSY_COBBLESTONE, 10], [BLOCK.LEAVES, 10], [BLOCK.PRISMITE_ORE, 10], [BLOCK.EMERALD_ORE, 8], [BLOCK.DIAMOND_BLOCK, 8], [BLOCK.FLOWER_YELLOW, 7], [BLOCK.FLOWER_RED, 3]] },
];

const REGEN_DELAY = 0.1;

// Phase-specific loot chests (OG OneBlock style): breaking the block sometimes
// spawns a bonus chest filled with items themed to the current phase. Items are
// { item, count: [min,max], weight }. Weight is a percentage of the pool.
export const ONEBLOCK_LOOT = [
  // Phase 1 — Plains: food, seeds, basic tools, saplings + bone meal.
  { loot: [
    { item: 264, count: [1, 3], weight: 18 },  // bread
    { item: 265, count: [1, 2], weight: 14 },  // apple
    { item: 263, count: [1, 4], weight: 12 },  // seeds
    { item: 262, count: [1, 4], weight: 10 },  // wheat
    { item: BLOCK.OAK_SAPLING, count: [1, 2], weight: 10 },  // oak sapling
    { item: 309, count: [1, 3], weight: 8 },   // bone meal
    { item: 256, count: [1, 4], weight: 7 },   // stick
    { item: 257, count: [1, 3], weight: 6 },   // coal
    { item: 259, count: [1, 2], weight: 4 },   // iron ingot
    { item: 512, count: [1, 1], weight: 4 },   // wood pickaxe
    { item: 513, count: [1, 1], weight: 3 },   // wood axe
    { item: 515, count: [1, 1], weight: 3 },   // wood sword
    { item: 282, count: [1, 3], weight: 3 },   // egg
    { item: 275, count: [1, 2], weight: 2 },   // feather
  ]},
  // Phase 2 — Underground: stone tools, ores.
  { loot: [
    { item: 259, count: [1, 4], weight: 20 },  // iron ingot
    { item: 257, count: [2, 6], weight: 15 },  // coal
    { item: 260, count: [1, 2], weight: 8 },   // gold ingot
    { item: 516, count: [1, 1], weight: 8 },   // stone pickaxe
    { item: 519, count: [1, 1], weight: 6 },   // stone sword
    { item: 517, count: [1, 1], weight: 6 },   // stone axe
    { item: 261, count: [1, 1], weight: 5 },   // diamond
    { item: 290, count: [1, 3], weight: 6 },   // rotten flesh
    { item: 278, count: [1, 3], weight: 6 },   // string
    { item: 277, count: [1, 3], weight: 6 },   // bone
    { item: 315, count: [1, 2], weight: 4 },   // slime ball
    { item: 283, count: [1, 1], weight: 3 },   // bucket
  ]},
  // Phase 3 — Winter: food, gold/diamond, spruce saplings.
  { loot: [
    { item: 260, count: [1, 3], weight: 16 },  // gold ingot
    { item: 261, count: [1, 2], weight: 11 },  // diamond
    { item: 265, count: [2, 4], weight: 11 },  // apple
    { item: 264, count: [2, 5], weight: 11 },  // bread
    { item: BLOCK.SPRUCE_SAPLING, count: [1, 2], weight: 10 },  // spruce sapling
    { item: 299, count: [1, 3], weight: 9 },   // carrot
    { item: 267, count: [1, 3], weight: 7 },   // cooked porkchop
    { item: 520, count: [1, 1], weight: 7 },   // iron pickaxe
    { item: 280, count: [1, 3], weight: 5 },   // flint
    { item: 309, count: [1, 2], weight: 5 },   // bone meal
    { item: 286, count: [1, 2], weight: 4 },   // spider eye
    { item: 284, count: [1, 2], weight: 4 },   // cooked apple
  ]},
  // Phase 4 — Ocean: prismarine-ish loot, iron/gold, birch saplings.
  { loot: [
    { item: 259, count: [2, 5], weight: 16 },  // iron ingot
    { item: 260, count: [1, 3], weight: 14 },  // gold ingot
    { item: 261, count: [1, 2], weight: 9 },   // diamond
    { item: 269, count: [1, 3], weight: 9 },   // cooked beef
    { item: BLOCK.BIRCH_SAPLING, count: [1, 2], weight: 10 },  // birch sapling
    { item: 280, count: [1, 4], weight: 7 },   // flint
    { item: 297, count: [2, 5], weight: 7 },   // cookie
    { item: 288, count: [1, 1], weight: 5 },   // water bucket
    { item: 296, count: [1, 1], weight: 5 },   // golden apple
    { item: 315, count: [1, 3], weight: 5 },   // slime ball
    { item: 313, count: [1, 1], weight: 3 },   // trident
  ]},
  // Phase 5 — Jungle: emeralds, diamonds, golden apple, jungle saplings.
  { loot: [
    { item: 305, count: [1, 3], weight: 14 },  // emerald
    { item: 261, count: [1, 3], weight: 14 },  // diamond
    { item: 260, count: [2, 4], weight: 11 },  // gold ingot
    { item: BLOCK.JUNGLE_SAPLING, count: [1, 2], weight: 10 },  // jungle sapling
    { item: 296, count: [1, 2], weight: 9 },   // golden apple
    { item: 302, count: [1, 2], weight: 7 },   // pumpkin pie
    { item: 303, count: [1, 2], weight: 7 },   // golden carrot
    { item: 309, count: [1, 2], weight: 6 },   // bone meal
    { item: 524, count: [1, 1], weight: 7 },   // diamond pickaxe
    { item: 527, count: [1, 1], weight: 5 },   // diamond sword
    { item: 310, count: [1, 1], weight: 4 },   // name tag
  ]},
  // Phase 6 — Swamp: wet/decayed loot, slime, diamonds.
  { loot: [
    { item: 315, count: [2, 5], weight: 15 },  // slime ball
    { item: 261, count: [1, 3], weight: 15 },  // diamond
    { item: 314, count: [2, 5], weight: 12 },  // greenstone dust
    { item: 305, count: [1, 3], weight: 12 },  // emerald
    { item: 296, count: [1, 2], weight: 8 },   // golden apple
    { item: 277, count: [2, 5], weight: 8 },   // bone
    { item: 286, count: [1, 3], weight: 6 },   // spider eye
    { item: 524, count: [1, 1], weight: 6 },   // diamond pickaxe
    { item: 552, count: [1, 1], weight: 4 },   // prismite sword
  ]},
  // Phase 7 — Dungeon: obsidian-adjacent, iron bars, diamonds, dark oak.
  { loot: [
    { item: 259, count: [3, 6], weight: 13 },  // iron ingot
    { item: 261, count: [2, 4], weight: 13 },  // diamond
    { item: 305, count: [2, 4], weight: 11 },  // emerald
    { item: 260, count: [2, 5], weight: 11 },  // gold ingot
    { item: BLOCK.DARK_OAK_SAPLING, count: [1, 2], weight: 10 },  // dark oak sapling
    { item: 296, count: [1, 2], weight: 9 },   // golden apple
    { item: 527, count: [1, 1], weight: 7 },   // diamond sword
    { item: 525, count: [1, 1], weight: 5 },   // diamond axe
    { item: 313, count: [1, 1], weight: 4 },   // trident
    { item: 280, count: [2, 5], weight: 5 },   // flint
    { item: 309, count: [1, 3], weight: 5 },   // bone meal
  ]},
  // Phase 8 — Desert: sand-adjacent, emeralds, diamonds, acacia saplings.
  { loot: [
    { item: 305, count: [2, 5], weight: 16 },  // emerald
    { item: 261, count: [2, 4], weight: 14 },  // diamond
    { item: 260, count: [2, 5], weight: 11 },  // gold ingot
    { item: BLOCK.ACACIA_SAPLING, count: [1, 2], weight: 10 },  // acacia sapling
    { item: 296, count: [1, 2], weight: 9 },   // golden apple
    { item: 303, count: [1, 3], weight: 9 },   // golden carrot
    { item: 568, count: [1, 1], weight: 7 },   // emerald pickaxe
    { item: 527, count: [1, 1], weight: 7 },   // diamond sword
    { item: 309, count: [1, 3], weight: 6 },   // bone meal
    { item: 310, count: [1, 1], weight: 4 },   // name tag
    { item: 311, count: [1, 1], weight: 3 },   // saddle
  ]},
  // Phase 9 — Plenty: rich overworld loot.
  { loot: [
    { item: 261, count: [2, 5], weight: 15 },  // diamond
    { item: 305, count: [3, 6], weight: 15 },  // emerald
    { item: 260, count: [3, 6], weight: 12 },  // gold ingot
    { item: 296, count: [1, 3], weight: 10 },  // golden apple
    { item: 524, count: [1, 1], weight: 8 },   // diamond pickaxe
    { item: 548, count: [1, 1], weight: 6 },   // diamond helmet
    { item: 549, count: [1, 1], weight: 5 },   // diamond chest
    { item: 552, count: [1, 1], weight: 5 },   // prismite sword
    { item: 311, count: [1, 1], weight: 3 },   // saddle
    { item: 310, count: [1, 1], weight: 3 },   // name tag
  ]},
  // Phase 10 — Desolation: rare treasure-grade loot.
  { loot: [
    { item: 261, count: [3, 6], weight: 15 },  // diamond
    { item: 305, count: [3, 6], weight: 15 },  // emerald
    { item: 552, count: [1, 1], weight: 10 },  // prismite sword
    { item: 553, count: [1, 1], weight: 10 },  // prismite pickaxe
    { item: 296, count: [2, 3], weight: 10 },  // golden apple
    { item: 550, count: [1, 1], weight: 6 },   // diamond legs
    { item: 551, count: [1, 1], weight: 6 },   // diamond boots
    { item: 313, count: [1, 1], weight: 5 },   // trident
    { item: 311, count: [1, 1], weight: 3 },   // saddle
    { item: 318, count: [1, 2], weight: 4 },   // eye of ender
  ]},
  // Phase 11 — Lush: prismite-rich final loot.
  { loot: [
    { item: 287, count: [2, 5], weight: 15 },  // prismite
    { item: 552, count: [1, 1], weight: 12 },  // prismite sword
    { item: 553, count: [1, 1], weight: 12 },  // prismite pickaxe
    { item: 261, count: [3, 6], weight: 12 },  // diamond
    { item: 305, count: [3, 6], weight: 12 },  // emerald
    { item: 556, count: [1, 1], weight: 8 },   // prismite helmet
    { item: 557, count: [1, 1], weight: 6 },   // prismite chest
    { item: 296, count: [2, 3], weight: 8 },   // golden apple
    { item: 318, count: [1, 3], weight: 4 },   // eye of ender
  ]},
];

// Mobs that can wander onto the OneBlock, per phase. Deeper phases unlock
// tougher (and more rewarding) mobs. { type, weight, count: [min,max] }
export const ONEBLOCK_MOBS = [
  // Phase 1 — Plains: passive farm animals only.
  { mobs: [['cow', 30], ['pig', 30], ['sheep', 25], ['chicken', 15]] },
  // Phase 2 — Underground: first hostiles.
  { mobs: [['cow', 15], ['sheep', 15], ['zombie', 25], ['spider', 20], ['skeleton', 15], ['slime', 10]] },
  // Phase 3 — Winter: more hostiles.
  { mobs: [['zombie', 25], ['skeleton', 20], ['spider', 20], ['slime', 15], ['cow', 10], ['sheep', 10]] },
  // Phase 4 — Ocean: mixed.
  { mobs: [['zombie', 20], ['skeleton', 20], ['spider', 15], ['slime', 15], ['cow', 10], ['chicken', 10], ['blower', 10]] },
  // Phase 5 — Jungle: tougher.
  { mobs: [['zombie', 20], ['skeleton', 20], ['spider', 15], ['blower', 15], ['slime', 10], ['cow', 10], ['chicken', 10]] },
  // Phase 6 — Swamp: slime-heavy.
  { mobs: [['slime', 25], ['zombie', 20], ['spider', 15], ['blower', 15], ['skeleton', 15], ['chicken', 10]] },
  // Phase 7 — Dungeon: dangerous.
  { mobs: [['zombie', 25], ['skeleton', 20], ['blower', 20], ['spider', 15], ['portalman', 10], ['slime', 10]] },
  // Phase 8 — Desert: more portalmen.
  { mobs: [['zombie', 20], ['skeleton', 20], ['blower', 20], ['portalman', 15], ['spider', 15], ['slime', 10]] },
  // Phase 9 — Plenty: late-game mix.
  { mobs: [['zombie', 20], ['skeleton', 20], ['portalman', 20], ['blower', 15], ['spider', 15], ['slime', 10]] },
  // Phase 10 — Desolation: portalman hordes.
  { mobs: [['portalman', 25], ['zombie', 20], ['skeleton', 20], ['blower', 20], ['slime', 15]] },
  // Phase 11 — Lush: everything.
  { mobs: [['portalman', 25], ['zombie', 20], ['skeleton', 20], ['blower', 20], ['slime', 15]] },
];

const CHEST_CHANCE = 0.08;   // chance a regen spawns a bonus loot chest
const MOB_SPAWN_INTERVAL = 45; // seconds between random mob visits

let _count = 0;
let _pos = { x: 0, y: 201, z: 0 };
let _regenTimer = 0;
let _regenPending = false;
let _nextBlock = BLOCK.GRASS;
let _mobTimer = MOB_SPAWN_INTERVAL * (0.5 + Math.random() * 0.5);
let _chestData = null; // { inventory: [...] } for a spawned loot chest
let _chestBlockPos = null;

function rollBlock(stage) {
  let total = 0;
  for (const [b, w] of stage.blocks) total += w;
  let r = Math.random() * total;
  for (const [b, w] of stage.blocks) {
    r -= w;
    if (r <= 0) return b;
  }
  return stage.blocks[stage.blocks.length - 1][0];
}

export function getOneBlockStage() {
  let s = ONEBLOCK_STAGES[0];
  for (const st of ONEBLOCK_STAGES) {
    if (_count >= st.req) s = st;
  }
  return s;
}

export function getOneBlockProgress() {
  const stage = getOneBlockStage();
  const idx = ONEBLOCK_STAGES.indexOf(stage);
  const next = ONEBLOCK_STAGES[idx + 1] || null;
  const pct = next ? Math.min(1, (_count - stage.req) / (next.req - stage.req)) : 1;
  return { stage, next, pct };
}

export function getOneBlockCount() {
  return _count;
}

export function getOneBlockPos() {
  return _pos;
}

export function resetOneBlock(world, x, y, z) {
  _count = 0;
  _pos = { x, y, z };
  _regenTimer = 0;
  _regenPending = false;
  _nextBlock = BLOCK.GRASS;
  world.setBlock(x, y, z, BLOCK.GRASS);
}

export function getOneBlockSave() {
  return { count: _count, pos: { ..._pos }, nextBlock: _nextBlock };
}

export function restoreOneBlock(world, save) {
  if (!save) return false;
  _count = save.count || 0;
  if (save.pos) _pos = { ...save.pos };
  _regenTimer = 0;
  _regenPending = false;
  _nextBlock = save.nextBlock || rollBlock(getOneBlockStage());
  return true;
}

function rollFromPool(pool) {
  let total = 0;
  for (const e of pool) total += e.weight;
  let r = Math.random() * total;
  for (const e of pool) {
    r -= e.weight;
    if (r <= 0) return e;
  }
  return pool[pool.length - 1];
}

export function rollOneBlockLoot() {
  const stage = getOneBlockStage();
  const idx = ONEBLOCK_STAGES.indexOf(stage);
  const table = ONEBLOCK_LOOT[Math.max(0, Math.min(idx, ONEBLOCK_LOOT.length - 1))];
  const roll = rollFromPool(table.loot);
  const count = Math.max(1, Math.round(roll.count[0] + Math.random() * (roll.count[1] - roll.count[0])));
  return { item: roll.item, count };
}

export function rollOneBlockMob() {
  const stage = getOneBlockStage();
  const idx = ONEBLOCK_STAGES.indexOf(stage);
  const table = ONEBLOCK_MOBS[Math.max(0, Math.min(idx, ONEBLOCK_MOBS.length - 1))];
  const picked = rollFromPool(table.mobs.map(([type, weight]) => ({ type, weight })));
  return picked.type;
}

export function getOneBlockMobTimer() {
  return _mobTimer;
}

export function resetOneBlockMobTimer() {
  _mobTimer = MOB_SPAWN_INTERVAL * (0.5 + Math.random() * 0.5);
}

export function tickOneBlockMobTimer(dt) {
  _mobTimer -= dt;
  if (_mobTimer <= 0) {
    _mobTimer = MOB_SPAWN_INTERVAL * (0.6 + Math.random() * 0.8);
    return true;
  }
  return false;
}

// Whether the next regen should spawn a bonus loot chest instead of a block.
export function shouldSpawnOneBlockChest() {
  return Math.random() < CHEST_CHANCE;
}

export function setOneBlockChestData(data) {
  _chestData = data;
  _chestBlockPos = data && data.pos ? { x: data.pos.x, y: data.pos.y, z: data.pos.z } : null;
}

export function getOneBlockChestData() {
  return _chestData;
}

export function clearOneBlockChest() {
  _chestData = null;
  _chestBlockPos = null;
}

export function getOneBlockChestPos() {
  return _chestBlockPos;
}

export function clearOneBlockState() {
  _count = 0;
  _regenTimer = 0;
  _regenPending = false;
}

export function onOneBlockBroken(hit) {
  if (hit.x !== _pos.x || hit.y !== _pos.y || hit.z !== _pos.z) return false;
  _count++;
  if (shouldSpawnOneBlockChest()) {
    _chestData = { chest: true };
  } else {
    _chestData = null;
  }
  _nextBlock = rollBlock(getOneBlockStage());
  _regenPending = true;
  _regenTimer = REGEN_DELAY;
  return true;
}

// Called when the player falls into the void: instantly rebuild the block so
// the respawn above it never drops them through a missing block.
export function forceRegen(world) {
  if (_regenPending) {
    _regenPending = false;
    _regenTimer = 0;
    if (_chestData) {
      world.setBlock(_pos.x, _pos.y, _pos.z, BLOCK.CHEST);
      fillOneBlockChest(world, _pos.x, _pos.y, _pos.z);
      _chestData = null;
    } else {
      world.setBlock(_pos.x, _pos.y, _pos.z, _nextBlock);
    }
    return true;
  }
  return false;
}

function fillOneBlockChest(world, x, y, z) {
  try {
    const slots = world.getOrCreateChest(x, y, z);
    slots.fill(null);
    const count = 2 + Math.floor(Math.random() * 4); // 2-5 stacks
    for (let i = 0; i < count; i++) {
      const loot = rollOneBlockLoot();
      let placed = false;
      for (let s = 0; s < slots.length; s++) {
        if (!slots[s]) {
          slots[s] = { item: loot.item, count: loot.count };
          placed = true;
          break;
        }
      }
      if (!placed) break;
    }
  } catch (_) {}
}

export function updateOneBlock(world, dt) {
  if (!_regenPending) return false;
  _regenTimer -= dt;
  if (_regenTimer <= 0) {
    _regenPending = false;
    if (_chestData) {
      world.setBlock(_pos.x, _pos.y, _pos.z, BLOCK.CHEST);
      fillOneBlockChest(world, _pos.x, _pos.y, _pos.z);
      _chestData = null;
    } else {
      world.setBlock(_pos.x, _pos.y, _pos.z, _nextBlock);
    }
    return true;
  }
  return false;
}
