// Unified item registry.
//
// Item ids are split into two ranges:
//   - 0..255  : BLOCK items. The id IS the block id (e.g. ITEM STONE == BLOCK.STONE == 3).
//               Blocks are stored in a Uint8Array in chunks, hence the 255 ceiling.
//   - 256..   : Non-block items (materials, food, gems). Stored in inventory as numbers.
//   - 512..   : Tools / weapons / armor. Tools carry type + material + durability.
//
// This lets every inventory slot hold either a block id or an item id behind one
// number, and the UI / crafting code treats them uniformly through the ITEMS table.

import { BLOCKS } from './blocks.js';

// --- non-block item ids ----------------------------------------------------
export const ITEM = {
  // materials
  STICK: 256,
  COAL: 257,
  CHARCOAL: 258,
  IRON_INGOT: 259,
  GOLD_INGOT: 260,
  DIAMOND: 261,
  WHEAT: 262,
  SEEDS: 263,
  BREAD: 264,
  APPLE: 265,
  // food
  PORKCHOP_RAW: 266,
  PORKCHOP_COOKED: 267,
  BEEF_RAW: 268,
  BEEF_COOKED: 269,
  CHICKEN_RAW: 270,
  CHICKEN_COOKED: 271,
  MUTTON_RAW: 272,
  MUTTON_COOKED: 273,
  // mob drops
  LEATHER: 274,
  FEATHER: 275,
  WOOL: 276,
  BONE: 277,
  STRING: 278,
  GUNPOWDER: 279,
  FLINT: 280,
  ARROW: 281,
  EGG: 282,
  // tools (id range 512+)
  WOOD_PICKAXE: 512, WOOD_AXE: 513, WOOD_SHOVEL: 514, WOOD_SWORD: 515,
  STONE_PICKAXE: 516, STONE_AXE: 517, STONE_SHOVEL: 518, STONE_SWORD: 519,
  IRON_PICKAXE: 520, IRON_AXE: 521, IRON_SHOVEL: 522, IRON_SWORD: 523,
  DIAMOND_PICKAXE: 524, DIAMOND_AXE: 525, DIAMOND_SHOVEL: 526, DIAMOND_SWORD: 527,
  GOLD_PICKAXE: 528, GOLD_AXE: 529, GOLD_SHOVEL: 530, GOLD_SWORD: 531,
  // misc
  BUCKET: 283,
  COOKED_APPLE: 284,
};

// --- food: how much hunger (in half-drumsticks, 0..20) it restores ----------
const FOOD = {
  [ITEM.APPLE]: 2,
  [ITEM.COOKED_APPLE]: 4,
  [ITEM.BREAD]: 5,
  [ITEM.PORKCHOP_RAW]: 3, [ITEM.PORKCHOP_COOKED]: 8,
  [ITEM.BEEF_RAW]: 3, [ITEM.BEEF_COOKED]: 8,
  [ITEM.CHICKEN_RAW]: 2, [ITEM.CHICKEN_COOKED]: 6,
  [ITEM.MUTTON_RAW]: 2, [ITEM.MUTTON_COOKED]: 6,
};

// --- fuel: burn time in ticks (20 = 1 second at 20 tps); 0 = not fuel -----
const FUEL = {
  [ITEM.COAL]: 80, [ITEM.CHARCOAL]: 80,
  5: 100, 10: 80, [ITEM.STICK]: 5,
};

// --- tool definitions -------------------------------------------------------
// harvestLevel: 0 hand, 1 wood/gold, 2 stone, 3 iron, 4 diamond.
// speed: mining-speed multiplier vs hand (=1). Each tier is ~10% faster.
const TOOL_MATERIALS = {
  WOOD:   { harvest: 1, durability: 59,  speedMult: 1.1,  swordDmg: 2 },
  STONE:  { harvest: 2, durability: 131, speedMult: 1.21, swordDmg: 3 },
  IRON:   { harvest: 3, durability: 250, speedMult: 1.33, swordDmg: 4 },
  DIAMOND:{ harvest: 4, durability: 1561, speedMult: 1.46, swordDmg: 5 },
  GOLD:   { harvest: 1, durability: 32,  speedMult: 1.1,  swordDmg: 2 },
};

// Map tool id -> { type: 'pickaxe'|'axe'|'shovel'|'sword', material }
const TOOLS = {};
(function buildToolTable() {
  const types = ['PICKAXE', 'AXE', 'SHOVEL', 'SWORD'];
  const mats = ['WOOD', 'STONE', 'IRON', 'DIAMOND', 'GOLD'];
  for (const m of mats) {
    for (const t of types) {
      const id = ITEM[`${m}_${t}`];
      if (id != null) TOOLS[id] = { type: t.toLowerCase(), material: m };
    }
  }
})();

// --- master ITEMS table -----------------------------------------------------
// Every entry: { name, stack (maxStack), food?, fuel?, tool?, block? }
// For blocks we lazily look up BLOCKS; this table holds the non-blocks.
const NONBLOCK_ITEMS = {
  [ITEM.STICK]:      { name: 'Stick', stack: 64, fuel: 5 },
  [ITEM.COAL]:       { name: 'Coal', stack: 64, fuel: 80 },
  [ITEM.CHARCOAL]:   { name: 'Charcoal', stack: 64, fuel: 80 },
  [ITEM.IRON_INGOT]: { name: 'Iron Ingot', stack: 64 },
  [ITEM.GOLD_INGOT]: { name: 'Gold Ingot', stack: 64 },
  [ITEM.DIAMOND]:    { name: 'Diamond', stack: 64 },
  [ITEM.WHEAT]:      { name: 'Wheat', stack: 64 },
  [ITEM.SEEDS]:      { name: 'Seeds', stack: 64 },
  [ITEM.BREAD]:      { name: 'Bread', stack: 64, food: 5 },
  [ITEM.APPLE]:      { name: 'Apple', stack: 64, food: 2 },
  [ITEM.COOKED_APPLE]: { name: 'Cooked Apple', stack: 64, food: 4 },
  [ITEM.PORKCHOP_RAW]:    { name: 'Raw Porkchop', stack: 64, food: 3 },
  [ITEM.PORKCHOP_COOKED]: { name: 'Cooked Porkchop', stack: 64, food: 8 },
  [ITEM.BEEF_RAW]:    { name: 'Raw Beef', stack: 64, food: 3 },
  [ITEM.BEEF_COOKED]: { name: 'Steak', stack: 64, food: 8 },
  [ITEM.CHICKEN_RAW]:    { name: 'Raw Chicken', stack: 64, food: 2 },
  [ITEM.CHICKEN_COOKED]: { name: 'Cooked Chicken', stack: 64, food: 6 },
  [ITEM.MUTTON_RAW]:    { name: 'Raw Mutton', stack: 64, food: 2 },
  [ITEM.MUTTON_COOKED]: { name: 'Cooked Mutton', stack: 64, food: 6 },
  [ITEM.LEATHER]: { name: 'Leather', stack: 64 },
  [ITEM.FEATHER]: { name: 'Feather', stack: 64 },
  [ITEM.WOOL]:    { name: 'Wool', stack: 64 },
  [ITEM.BONE]:    { name: 'Bone', stack: 64 },
  [ITEM.STRING]:  { name: 'String', stack: 64 },
  [ITEM.GUNPOWDER]: { name: 'Gunpowder', stack: 64 },
  [ITEM.FLINT]:   { name: 'Flint', stack: 64 },
  [ITEM.ARROW]:   { name: 'Arrow', stack: 64 },
  [ITEM.EGG]:     { name: 'Egg', stack: 16 },
  [ITEM.BUCKET]:  { name: 'Bucket', stack: 16 },
};

// --- public helpers ---------------------------------------------------------
export function isBlockItem(id) { return id < 256; }

export function itemDef(id) {
  if (id == null) return null;
  if (isBlockItem(id)) {
    const b = BLOCKS[id];
    return b ? { name: b.name, stack: 64, block: true } : null;
  }
  if (TOOLS[id]) {
    const mat = TOOL_MATERIALS[TOOLS[id].material];
    return {
      name: `${TOOLS[id].material.charAt(0) + TOOLS[id].material.slice(1).toLowerCase()} ${TOOLS[id].type}`,
      stack: 1,
      tool: { type: TOOLS[id].type, material: TOOLS[id].material, durability: mat.durability, maxDurability: mat.durability },
    };
  }
  return NONBLOCK_ITEMS[id] || null;
}

export function itemName(id) {
  const d = itemDef(id);
  return d ? d.name : '?';
}

export function maxStack(id) {
  const d = itemDef(id);
  return d ? d.stack : 64;
}

export function isFood(id) {
  const d = itemDef(id);
  return !!(d && d.food);
}
export function foodValue(id) {
  return FOOD[id] || 0;
}
export function fuelValue(id) {
  const d = itemDef(id);
  if (!d) return 0;
  if (d.fuel != null) return d.fuel;
  return FUEL[id] || 0;
}

// Tool queries.
export function isTool(id) { return !!TOOLS[id]; }
export function toolInfo(id) {
  const t = TOOLS[id];
  if (!t) return null;
  return { type: t.type, material: t.material, ...TOOL_MATERIALS[t.material] };
}
export function toolHarvestLevel(id) {
  const t = toolInfo(id);
  return t ? t.harvest : 0;
}
// Mining speed multiplier for a given block, or 1 if no suitable tool.
export function toolSpeedFor(toolId, blockId) {
  const t = toolInfo(toolId);
  if (!t) return 1;
  const need = toolRequired(blockId);
  if (need && need !== t.type) return 1;             // wrong tool type
  if (t.harvest < harvestLevelRequired(blockId)) return 1; // too weak to be fast
  return t.speedMult;
}

// --- block harvest metadata -------------------------------------------------
// These live in blocks.js (imported lazily to avoid a circular import). Each
// block may carry `tool` ('pickaxe'|'axe'|'shovel'), `harvest` (0..4), and
// `hardness` fields. blocks.js exposes `harvestLevelRequired` and `toolRequired`.
let _blockMeta = null;
export function _bindBlockMeta(fns) { _blockMeta = fns; }
export function harvestLevelRequired(blockId) {
  if (_blockMeta) return _blockMeta.harvest(blockId);
  return 0;
}
export function toolRequired(blockId) {
  if (_blockMeta) return _blockMeta.tool(blockId);
  return null;
}
