// Block type registry. Each block id maps to a definition describing its
// appearance (which texture-tile faces to use) and physical properties.
//
// IDs are kept small integers so a chunk can store them in a flat Uint8Array.
// ID 0 is reserved for AIR.

export const BLOCK = {
  AIR: 0,
  GRASS: 1,
  DIRT: 2,
  STONE: 3,
  COBBLESTONE: 4,
  WOOD: 5,        // oak log
  LEAVES: 6,
  SAND: 7,
  WATER: 8,
  BEDROCK: 9,
  PLANKS: 10,
  COAL_ORE: 11,
  IRON_ORE: 12,
  GOLD_ORE: 13,
  DIAMOND_ORE: 14,
  SNOW: 15,
  GLASS: 16,
  BRICK: 17,
  GRAVEL: 18,
  CLAY: 19,
  PUMPKIN: 20,
  CACTUS: 21,
  FLOWER_RED: 22,   // decorative, thin
  FLOWER_YELLOW: 23,
  BOOKSHELF: 24,
  OBSIDIAN: 25,
  TNT: 26,
  CRAFTING: 27,
  NETHERRACK: 28,
  RED_SAND: 29,
  TERRACOTTA: 30,
  SNOW_GRASS: 31,   // snowy grass block (grass with snow top)
  FURNACE: 32,
  PODZOL: 33,
  MYCELIUM: 34,
  JUNGLE_WOOD: 35,
  DARK_OAK_LEAVES: 36,
  SNOW_BLOCK: 37,
};

// Atlas tile name -> [tileX, tileY] in a 16x16 grid (tile 0,0 = top-left).
// tiles.js draws every named tile; this maps block faces to tile coords.
export const TILES = {
  grass_top:       [0, 0],
  grass_side:      [1, 0],
  dirt:            [2, 0],
  stone:           [3, 0],
  cobblestone:     [4, 0],
  wood_top:        [5, 0],
  wood_side:       [6, 0],
  leaves:          [7, 0],
  sand:            [8, 0],
  water:           [9, 0],
  bedrock:         [10, 0],
  planks:          [11, 0],
  coal_ore:        [12, 0],
  iron_ore:        [13, 0],
  gold_ore:        [14, 0],
  diamond_ore:     [15, 0],
  snow:            [0, 1],
  glass:           [1, 1],
  brick:           [2, 1],
  gravel:          [3, 1],
  clay:            [4, 1],
  pumpkin_top:     [5, 1],
  pumpkin_side:    [6, 1],
  pumpkin_front:   [7, 1],
  cactus_top:      [8, 1],
  cactus_side:     [9, 1],
  flower_red:      [10, 1],
  flower_yellow:   [11, 1],
  bookshelf_top:   [12, 1],
  bookshelf_side:  [13, 1],
  obsidian:        [14, 1],
  tnt_top:         [15, 1],
  tnt_side:        [0, 2],
  tnt_bottom:      [1, 2],
  crafting_top:    [2, 2],
  crafting_side:   [3, 2],
  netherrack:      [4, 2],
  red_sand:        [5, 2],
  terracotta:      [6, 2],
  snow_side:       [7, 2],   // grass-side with snow overlay
  brick_top:       [8, 2],
  furnace_top:     [9, 2],
  furnace_side:    [10, 2],
  furnace_front:   [11, 2],
  podzol_top:      [12, 2],
  podzol_side:     [13, 2],
  mycelium_top:    [14, 2],
  mycelium_side:   [15, 2],
  jungle_wood_top: [0, 3],
  jungle_wood_side:[1, 3],
  dark_leaves:     [2, 3],
  snow_block:      [3, 3],
};

// Per-block definition. `faces` is [top, bottom, side] tile names, or a single
// tile name used for all faces. `solid` affects collision; `transparent`
// means neighbour faces behind it still render (leaves/glass/water/plants).
//
// Survival metadata (all optional):
//   hardness  : seconds to break by hand (≈ Minecraft values). Default 0.
//   tool      : 'pickaxe' | 'axe' | 'shovel' | null — the tool that gives full
//               speed and (for harvestable blocks) the block drop.
//   harvest   : 0..4 — minimum tool tier needed for the drop to actually spawn.
//               0 = drops by hand; 1=wood/gold; 2=stone; 3=iron; 4=diamond.
//   drop      : block id OR an item id (from items.js) to drop when broken.
//               If omitted, the block drops itself (its own id). Use 0 to drop
//               nothing (e.g. glass). Plants drop themselves.
export const BLOCKS = {
  [BLOCK.AIR]:        { name: 'Air', solid: false, transparent: true, liquid: false },
  [BLOCK.GRASS]:      { name: 'Grass', solid: true, hardness: 0.6, tool: 'shovel', drop: BLOCK.DIRT, faces: { top: 'grass_top', bottom: 'dirt', side: 'grass_side' } },
  [BLOCK.DIRT]:       { name: 'Dirt', solid: true, hardness: 0.5, tool: 'shovel', faces: 'dirt' },
  [BLOCK.STONE]:      { name: 'Stone', solid: true, hardness: 1.5, tool: 'pickaxe', harvest: 1, drop: BLOCK.COBBLESTONE, faces: 'stone' },
  [BLOCK.COBBLESTONE]:{ name: 'Cobblestone', solid: true, hardness: 2.0, tool: 'pickaxe', harvest: 1, faces: 'cobblestone' },
  [BLOCK.WOOD]:       { name: 'Oak Log', solid: true, hardness: 2.0, tool: 'axe', faces: { top: 'wood_top', bottom: 'wood_top', side: 'wood_side' } },
  [BLOCK.LEAVES]:     { name: 'Leaves', solid: true, transparent: true, hardness: 0.2, faces: 'leaves' },
  [BLOCK.SAND]:       { name: 'Sand', solid: true, hardness: 0.5, tool: 'shovel', faces: 'sand' },
  [BLOCK.WATER]:      { name: 'Water', solid: false, transparent: true, liquid: true, drop: 0, faces: 'water' },
  [BLOCK.BEDROCK]:    { name: 'Bedrock', solid: true, hardness: -1, unbreakable: true, faces: 'bedrock' },
  [BLOCK.PLANKS]:     { name: 'Oak Planks', solid: true, hardness: 2.0, tool: 'axe', faces: 'planks' },
  [BLOCK.COAL_ORE]:   { name: 'Coal Ore', solid: true, hardness: 3.0, tool: 'pickaxe', harvest: 1, drop: 257 /* COAL item */, faces: 'coal_ore' },
  [BLOCK.IRON_ORE]:   { name: 'Iron Ore', solid: true, hardness: 3.0, tool: 'pickaxe', harvest: 2, faces: 'iron_ore' },
  [BLOCK.GOLD_ORE]:   { name: 'Gold Ore', solid: true, hardness: 3.0, tool: 'pickaxe', harvest: 3, faces: 'gold_ore' },
  [BLOCK.DIAMOND_ORE]:{ name: 'Diamond Ore', solid: true, hardness: 3.0, tool: 'pickaxe', harvest: 3, drop: 261 /* DIAMOND item */, faces: 'diamond_ore' },
  [BLOCK.SNOW]:       { name: 'Snow', solid: true, hardness: 0.2, tool: 'shovel', faces: 'snow' },
  [BLOCK.GLASS]:      { name: 'Glass', solid: true, transparent: true, hardness: 0.3, drop: 0, faces: 'glass' },
  [BLOCK.BRICK]:      { name: 'Bricks', solid: true, hardness: 2.0, tool: 'pickaxe', harvest: 1, faces: 'brick' },
  [BLOCK.GRAVEL]:     { name: 'Gravel', solid: true, hardness: 0.6, tool: 'shovel', faces: 'gravel' },
  [BLOCK.CLAY]:       { name: 'Clay', solid: true, hardness: 0.6, tool: 'shovel', faces: 'clay' },
  [BLOCK.PUMPKIN]:    { name: 'Pumpkin', solid: true, hardness: 1.0, tool: 'axe', faces: { top: 'pumpkin_top', bottom: 'pumpkin_top', side: 'pumpkin_side' } },
  [BLOCK.CACTUS]:     { name: 'Cactus', solid: true, hardness: 0.4, faces: { top: 'cactus_top', bottom: 'cactus_top', side: 'cactus_side' } },
  [BLOCK.FLOWER_RED]: { name: 'Poppy', solid: false, transparent: true, plant: true, hardness: 0, faces: 'flower_red' },
  [BLOCK.FLOWER_YELLOW]:{ name: 'Dandelion', solid: false, transparent: true, plant: true, hardness: 0, faces: 'flower_yellow' },
  [BLOCK.BOOKSHELF]:  { name: 'Bookshelf', solid: true, hardness: 1.5, tool: 'axe', faces: { top: 'planks', bottom: 'planks', side: 'bookshelf_side' } },
  [BLOCK.OBSIDIAN]:   { name: 'Obsidian', solid: true, hardness: 50, tool: 'pickaxe', harvest: 4, faces: 'obsidian' },
  [BLOCK.TNT]:        { name: 'TNT', solid: true, hardness: 0, faces: { top: 'tnt_top', bottom: 'tnt_bottom', side: 'tnt_side' } },
  [BLOCK.CRAFTING]:   { name: 'Crafting Table', solid: true, hardness: 2.5, tool: 'axe', faces: { top: 'crafting_top', bottom: 'planks', side: 'crafting_side' } },
  [BLOCK.NETHERRACK]: { name: 'Netherrack', solid: true, hardness: 0.4, tool: 'pickaxe', harvest: 1, faces: 'netherrack' },
  [BLOCK.RED_SAND]:   { name: 'Red Sand', solid: true, hardness: 0.5, tool: 'shovel', faces: 'red_sand' },
  [BLOCK.TERRACOTTA]: { name: 'Terracotta', solid: true, hardness: 1.25, tool: 'pickaxe', harvest: 1, faces: 'terracotta' },
  [BLOCK.SNOW_GRASS]: { name: 'Snowy Grass', solid: true, hardness: 0.6, tool: 'shovel', drop: BLOCK.DIRT, faces: { top: 'snow', bottom: 'dirt', side: 'snow_side' } },
  [BLOCK.FURNACE]:    { name: 'Furnace', solid: true, hardness: 3.5, tool: 'pickaxe', harvest: 1, faces: { top: 'furnace_top', bottom: 'cobblestone', side: 'furnace_side', front: 'furnace_front' } },
  [BLOCK.PODZOL]:     { name: 'Podzol', solid: true, hardness: 0.6, tool: 'shovel', drop: BLOCK.DIRT, faces: { top: 'podzol_top', bottom: 'dirt', side: 'podzol_side' } },
  [BLOCK.MYCELIUM]:   { name: 'Mycelium', solid: true, hardness: 0.6, tool: 'shovel', drop: BLOCK.DIRT, faces: { top: 'mycelium_top', bottom: 'dirt', side: 'mycelium_side' } },
  [BLOCK.JUNGLE_WOOD]:{ name: 'Jungle Log', solid: true, hardness: 2.0, tool: 'axe', faces: { top: 'jungle_wood_top', bottom: 'jungle_wood_top', side: 'jungle_wood_side' } },
  [BLOCK.DARK_OAK_LEAVES]:{ name: 'Dark Oak Leaves', solid: true, transparent: true, hardness: 0.2, faces: 'dark_leaves' },
  [BLOCK.SNOW_BLOCK]: { name: 'Snow Block', solid: true, hardness: 0.2, tool: 'shovel', faces: 'snow_block' },
};

// Resolve the tile name for a given block face. dir is 'top'|'bottom'|'side'.
export function tileNameFor(blockId, dir) {
  const def = BLOCKS[blockId];
  if (!def || !def.faces) return 'stone';
  if (typeof def.faces === 'string') return def.faces;
  if (dir === 'top') return def.faces.top ?? def.faces.side ?? 'stone';
  if (dir === 'bottom') return def.faces.bottom ?? def.faces.side ?? 'stone';
  return def.faces[dir] ?? def.faces.side ?? 'stone';
}

export function tileUV(name) {
  const t = TILES[name];
  if (!t) return [0, 0];
  return t;
}

// --- survival helpers -------------------------------------------------------
// Hardness in seconds (by hand). -1 = unbreakable.
export function blockHardness(blockId) {
  const d = BLOCKS[blockId];
  return d && d.hardness != null ? d.hardness : 0;
}
// Tool that gives full speed + (if harvestable) the drop. null = any/hand.
export function blockTool(blockId) {
  const d = BLOCKS[blockId];
  return d && d.tool ? d.tool : null;
}
// Minimum tool tier (0..4) for the drop to actually spawn.
export function blockHarvestLevel(blockId) {
  const d = BLOCKS[blockId];
  return d && d.harvest != null ? d.harvest : 0;
}
// Item id to drop (default = the block itself; 0 = nothing).
export function blockDrop(blockId) {
  const d = BLOCKS[blockId];
  if (!d) return blockId;
  if (d.drop != null) return d.drop; // explicit drop (may be 0 for "nothing")
  return blockId;                    // default: drop self
}

// Wire the meta lookups into items.js (avoids a circular import at module load).
import { _bindBlockMeta } from './items.js';
_bindBlockMeta({
  harvest: blockHarvestLevel,
  tool: blockTool,
});

// Hotbar contents (creative-style: infinite blocks).
export const HOTBAR_BLOCKS = [
  BLOCK.GRASS,
  BLOCK.DIRT,
  BLOCK.STONE,
  BLOCK.COBBLESTONE,
  BLOCK.WOOD,
  BLOCK.PLANKS,
  BLOCK.LEAVES,
  BLOCK.GLASS,
  BLOCK.SAND,
];
