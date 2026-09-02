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
  // armor (532+)
  LEATHER_HELMET: 532, LEATHER_CHEST: 533, LEATHER_LEGS: 534, LEATHER_BOOTS: 535,
  CHAIN_HELMET: 536, CHAIN_CHEST: 537, CHAIN_LEGS: 538, CHAIN_BOOTS: 539,
  IRON_HELMET: 540, IRON_CHEST: 541, IRON_LEGS: 542, IRON_BOOTS: 543,
  GOLD_HELMET: 544, GOLD_CHEST: 545, GOLD_LEGS: 546, GOLD_BOOTS: 547,
  DIAMOND_HELMET: 548, DIAMOND_CHEST: 549, DIAMOND_LEGS: 550, DIAMOND_BOOTS: 551,
  // prismite tools + armor (552+)
  PRISMITE: 287,
  PRISMITE_SWORD: 552, PRISMITE_PICKAXE: 553, PRISMITE_AXE: 554, PRISMITE_SHOVEL: 555,
  PRISMITE_HELMET: 556, PRISMITE_CHEST: 557, PRISMITE_LEGS: 558, PRISMITE_BOOTS: 559,
  // misc
  BUCKET: 283,
  WATER_BUCKET: 288,
  LAVA_BUCKET: 289,
  COOKED_APPLE: 284,
  BED: 285,
  SPIDER_EYE: 286,
  // new foods
  ROTTEN_FLESH: 290,
  GOLDEN_APPLE: 296,
  COOKIE: 297,
  MELON_SLICE: 298,
  CARROT: 299,
  POTATO: 300,
  BAKED_POTATO: 301,
  PUMPKIN_PIE: 302,
  GOLDEN_CARROT: 303,
  COPPER_INGOT: 304,
  EMERALD: 305,
  LIME_DYE: 306,
  PINK_DYE: 307,
  BLUE_DYE: 308,
  BONE_MEAL: 309,
  NAME_TAG: 310,
  SADDLE: 311,
  LEAD: 312,
  TRIDENT: 313,
  GREENSTONE_DUST: 314,
  SLIME_BALL: 315,
  FLINT_STEEL: 316,
  VOID_PEARL: 317,
  RIFT_EYE: 318,
  VOID_STONE_ITEM: 319,
  PORTAL_ORB: 320,
  DRAGON_SCALES: 321,
  DRAGON_HEART: 322,
  // copper tools (564+)
  COPPER_PICKAXE: 564, COPPER_AXE: 565, COPPER_SHOVEL: 566, COPPER_SWORD: 567,
  // emerald tools (568+)
  EMERALD_PICKAXE: 568, EMERALD_AXE: 569, EMERALD_SHOVEL: 570, EMERALD_SWORD: 571,
  // mythic weapons (580+)
  DRAGON_BLADE: 580,
  // Wood-type tools (600+)
  OAK_PICKAXE: 600, OAK_AXE: 601, OAK_SHOVEL: 602, OAK_SWORD: 603,
  JUNGLE_PICKAXE: 604, JUNGLE_AXE: 605, JUNGLE_SHOVEL: 606, JUNGLE_SWORD: 607,
  BIRCH_PICKAXE: 608, BIRCH_AXE: 609, BIRCH_SHOVEL: 610, BIRCH_SWORD: 611,
  SPRUCE_PICKAXE: 612, SPRUCE_AXE: 613, SPRUCE_SHOVEL: 614, SPRUCE_SWORD: 615,
  DARK_OAK_PICKAXE: 616, DARK_OAK_AXE: 617, DARK_OAK_SHOVEL: 618, DARK_OAK_SWORD: 619,
  ACACIA_PICKAXE: 620, ACACIA_AXE: 621, ACACIA_SHOVEL: 622, ACACIA_SWORD: 623,
  // The Shattered Echo Dimension (700+)
  NULL_SHARD: 700,
  MEMORY_SHARD: 701,
  PARADOX_CORE: 702,
  ECHO_SHARD: 710,
  // Spawn Eggs (800+)
  COW_SPAWN_EGG: 800,
  PIG_SPAWN_EGG: 801,
  SHEEP_SPAWN_EGG: 802,
  CHICKEN_SPAWN_EGG: 803,
  ZOMBIE_SPAWN_EGG: 804,
  SKELETON_SPAWN_EGG: 805,
  SPIDER_SPAWN_EGG: 806,
  SLIME_SPAWN_EGG: 807,
  VILLAGER_SPAWN_EGG: 808,
  BLOWER_SPAWN_EGG: 809,
  PORTALMAN_SPAWN_EGG: 810,
  CAVE_BAT_SPAWN_EGG: 811,
  WITCH_SPAWN_EGG: 813,
  // Original utility / weapon items (820+)
  GRAPPLE_HOOK: 820,
  FROST_WAND: 821,
  EMBER_LAUNCHER: 822,
  DIMENSION_COMPASS: 823,
  CRYSTAL_PICKAXE: 824,
  GRAVITY_BOOTS: 825,
  MUSIC_DISC_1: 830,
  MUSIC_DISC_2: 831,
  MUSIC_DISC_3: 832,
  MUSIC_DISC_4: 833,
  MUSIC_DISC_5: 834,
  NIGHT_VISION_POTION: 840,
  BOAT: 841,
  MINECART: 842,
  // Dyes (843+)
  WHITE_DYE: 843,
  ORANGE_DYE: 844,
  MAGENTA_DYE: 845,
  LIGHT_BLUE_DYE: 846,
  YELLOW_DYE: 847,
  GRAY_DYE: 848,
  LIGHT_GRAY_DYE: 849,
  CYAN_DYE: 850,
  PURPLE_DYE: 851,
  BROWN_DYE: 852,
  GREEN_DYE: 853,
  RED_DYE: 854,
  BLACK_DYE: 855,
  // Hoes (856+)
  WOOD_HOE: 856,
  STONE_HOE: 857,
  IRON_HOE: 858,
  DIAMOND_HOE: 859,
  // Bow (860)
  BOW: 860,
  // Shield & fishing (861-862)
  SHIELD: 861,
  FISHING_ROD: 862,
};

export const SPAWN_EGG_MOBS = {
  [ITEM.COW_SPAWN_EGG]: 'cow',
  [ITEM.PIG_SPAWN_EGG]: 'pig',
  [ITEM.SHEEP_SPAWN_EGG]: 'sheep',
  [ITEM.CHICKEN_SPAWN_EGG]: 'chicken',
  [ITEM.ZOMBIE_SPAWN_EGG]: 'zombie',
  [ITEM.SKELETON_SPAWN_EGG]: 'skeleton',
  [ITEM.SPIDER_SPAWN_EGG]: 'spider',
  [ITEM.SLIME_SPAWN_EGG]: 'slime',
  [ITEM.VILLAGER_SPAWN_EGG]: 'villager',
  [ITEM.BLOWER_SPAWN_EGG]: 'blower',
  [ITEM.PORTALMAN_SPAWN_EGG]: 'portalman',
  [ITEM.CAVE_BAT_SPAWN_EGG]: 'cave_bat',
  [ITEM.WITCH_SPAWN_EGG]: 'witch',
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
  [ITEM.ROTTEN_FLESH]: 2,
  [ITEM.GOLDEN_APPLE]: 4,
  [ITEM.COOKIE]: 2,
  [ITEM.MELON_SLICE]: 2,
  [ITEM.CARROT]: 3,
  [ITEM.POTATO]: 1,
  [ITEM.BAKED_POTATO]: 5,
  [ITEM.PUMPKIN_PIE]: 8,
  [ITEM.GOLDEN_CARROT]: 6,
};

// --- fuel: burn time in ticks (20 = 1 second at 20 tps); 0 = not fuel -----
const FUEL = {
  [ITEM.COAL]: 80, [ITEM.CHARCOAL]: 80,
  5: 100, 10: 80, [ITEM.STICK]: 5,
  // Wood-type planks (same as oak planks)
  [96]: 80, [97]: 80, [98]: 80, [99]: 80, [100]: 80,
  // Wood-type logs (same as oak log)
  [101]: 100, [102]: 100, [103]: 100, [104]: 100,
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
  COPPER: { harvest: 3, durability: 200, speedMult: 1.3,  swordDmg: 4 },
  EMERALD:{ harvest: 4, durability: 1561,speedMult: 1.46, swordDmg: 5 },
  PRISMITE:{ harvest: 4, durability: 2000, speedMult: 2.0, swordDmg: 25 },
  DRAGON:  { harvest: 5, durability: 4000, speedMult: 2.5, swordDmg: 18 },
  CRYSTAL: { harvest: 5, durability: 3000, speedMult: 2.2, swordDmg: 12 },
};

// Map tool id -> { type: 'pickaxe'|'axe'|'shovel'|'sword', material }
const TOOLS = {};
(function buildToolTable() {
  const types = ['PICKAXE', 'AXE', 'SHOVEL', 'SWORD'];
  const mats = ['WOOD', 'STONE', 'IRON', 'DIAMOND', 'GOLD', 'COPPER', 'EMERALD', 'PRISMITE'];
  for (const m of mats) {
    for (const t of types) {
      const id = ITEM[`${m}_${t}`];
      if (id != null) TOOLS[id] = { type: t.toLowerCase(), material: m };
    }
  }
  // Wood-type tools (each with its own material tier = WOOD stats)
  const woodTypes = ['OAK', 'JUNGLE', 'BIRCH', 'SPRUCE', 'DARK_OAK', 'ACACIA'];
  for (const w of woodTypes) {
    for (const t of types) {
      const id = ITEM[`${w}_${t}`];
      if (id != null) TOOLS[id] = { type: t.toLowerCase(), material: 'WOOD', woodType: w };
    }
  }
  // trident (special, no material tier)
  TOOLS[ITEM.TRIDENT] = { type: 'trident', material: 'PRISMITE' };
  // Dragon Blade (mythic)
  TOOLS[ITEM.DRAGON_BLADE] = { type: 'sword', material: 'DRAGON' };
  // Crystal pickaxe (original)
  TOOLS[ITEM.CRYSTAL_PICKAXE] = { type: 'pickaxe', material: 'CRYSTAL' };
  // Hoes
  TOOLS[ITEM.WOOD_HOE] = { type: 'hoe', material: 'WOOD' };
  TOOLS[ITEM.STONE_HOE] = { type: 'hoe', material: 'STONE' };
  TOOLS[ITEM.IRON_HOE] = { type: 'hoe', material: 'IRON' };
  TOOLS[ITEM.DIAMOND_HOE] = { type: 'hoe', material: 'DIAMOND' };
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
  [ITEM.WATER_BUCKET]: { name: 'Water Bucket', stack: 1 },
  [ITEM.LAVA_BUCKET]: { name: 'Lava Bucket', stack: 1 },
  [ITEM.BED]:     { name: 'Bed', stack: 1 },
  [ITEM.SPIDER_EYE]: { name: 'Spider Eye', stack: 64, food: 3 },
  [ITEM.PRISMITE]:   { name: 'Prismite', stack: 64 },
  [ITEM.ROTTEN_FLESH]: { name: 'Rotten Flesh', stack: 64, food: 2 },
  [ITEM.GOLDEN_APPLE]:  { name: 'Golden Apple', stack: 64, food: 4 },
  [ITEM.COOKIE]:       { name: 'Cookie', stack: 64, food: 2 },
  [ITEM.MELON_SLICE]:   { name: 'Melon Slice', stack: 64, food: 2 },
  [ITEM.CARROT]:       { name: 'Carrot', stack: 64, food: 3 },
  [ITEM.POTATO]:       { name: 'Potato', stack: 64, food: 1 },
  [ITEM.BAKED_POTATO]:  { name: 'Baked Potato', stack: 64, food: 5 },
  [ITEM.PUMPKIN_PIE]:   { name: 'Pumpkin Pie', stack: 64, food: 8 },
  [ITEM.GOLDEN_CARROT]: { name: 'Golden Carrot', stack: 64, food: 6 },
  [ITEM.COPPER_INGOT]:  { name: 'Copper Ingot', stack: 64 },
  [ITEM.EMERALD]:       { name: 'Emerald', stack: 64 },
  [ITEM.LIME_DYE]:      { name: 'Lime Dye', stack: 64 },
  [ITEM.PINK_DYE]:      { name: 'Pink Dye', stack: 64 },
  [ITEM.BLUE_DYE]:      { name: 'Blue Dye', stack: 64 },
  [ITEM.BONE_MEAL]:     { name: 'Bone Meal', stack: 64 },
  [ITEM.NAME_TAG]:      { name: 'Name Tag', stack: 1 },
  [ITEM.SADDLE]:        { name: 'Saddle', stack: 1 },
  [ITEM.LEAD]:          { name: 'Lead', stack: 1 },
  [ITEM.GREENSTONE_DUST]: { name: 'Greenstone Dust', stack: 64 },
  [ITEM.SLIME_BALL]: { name: 'Slime Ball', stack: 64 },
  [ITEM.FLINT_STEEL]: { name: 'Flint and Steel', stack: 1 },
  [ITEM.VOID_PEARL]: { name: 'Void Pearl', stack: 16 },
  [ITEM.RIFT_EYE]: { name: 'Rift Eye', stack: 16 },
  [ITEM.VOID_STONE_ITEM]: { name: 'Void Stone', stack: 64 },
  [ITEM.PORTAL_ORB]: { name: 'Portal Orb', stack: 16 },
  [ITEM.DRAGON_SCALES]: { name: 'Dragon Scales', stack: 64 },
  [ITEM.DRAGON_HEART]: { name: 'Dragon Heart', stack: 1 },
  [ITEM.DRAGON_BLADE]: { name: 'Dragon Blade', stack: 1, tool: true },
  // Shattered Echo Dimension materials
  [ITEM.NULL_SHARD]: { name: 'Null Shard', stack: 64 },
  [ITEM.MEMORY_SHARD]: { name: 'Memory Shard', stack: 64 },
  [ITEM.PARADOX_CORE]: { name: 'Paradox Core', stack: 16 },
  [ITEM.ECHO_SHARD]: { name: 'Echo Shard', stack: 64 },
  [ITEM.COW_SPAWN_EGG]: { name: 'Cow Spawn Egg', stack: 64 },
  [ITEM.PIG_SPAWN_EGG]: { name: 'Pig Spawn Egg', stack: 64 },
  [ITEM.SHEEP_SPAWN_EGG]: { name: 'Sheep Spawn Egg', stack: 64 },
  [ITEM.CHICKEN_SPAWN_EGG]: { name: 'Chicken Spawn Egg', stack: 64 },
  [ITEM.ZOMBIE_SPAWN_EGG]: { name: 'Zombie Spawn Egg', stack: 64 },
  [ITEM.SKELETON_SPAWN_EGG]: { name: 'Skeleton Spawn Egg', stack: 64 },
  [ITEM.SPIDER_SPAWN_EGG]: { name: 'Spider Spawn Egg', stack: 64 },
  [ITEM.SLIME_SPAWN_EGG]: { name: 'Slime Spawn Egg', stack: 64 },
  [ITEM.VILLAGER_SPAWN_EGG]: { name: 'Villager Spawn Egg', stack: 64 },
  [ITEM.BLOWER_SPAWN_EGG]: { name: 'Blower Spawn Egg', stack: 64 },
  [ITEM.PORTALMAN_SPAWN_EGG]: { name: 'Portalman Spawn Egg', stack: 64 },
  [ITEM.CAVE_BAT_SPAWN_EGG]: { name: 'Cave Bat Spawn Egg', stack: 64 },
  [ITEM.WITCH_SPAWN_EGG]:  { name: 'Witch Spawn Egg', stack: 64 },
  // Original utility / weapon items
  [ITEM.GRAPPLE_HOOK]:    { name: 'Grapple Hook', stack: 1 },
  [ITEM.FROST_WAND]:      { name: 'Frost Wand', stack: 1 },
  [ITEM.EMBER_LAUNCHER]:  { name: 'Ember Launcher', stack: 1 },
  [ITEM.DIMENSION_COMPASS]: { name: 'Dimension Compass', stack: 1 },
  [ITEM.MUSIC_DISC_1]:    { name: 'Music Disc - Crystal', stack: 1 },
  [ITEM.MUSIC_DISC_2]:    { name: 'Music Disc - Aurora', stack: 1 },
  [ITEM.MUSIC_DISC_3]:    { name: 'Music Disc - Ember', stack: 1 },
  [ITEM.MUSIC_DISC_4]:    { name: 'Music Disc - Void', stack: 1 },
  [ITEM.MUSIC_DISC_5]:    { name: 'Music Disc - Sky', stack: 1 },
  [ITEM.NIGHT_VISION_POTION]: { name: 'Night Vision Potion', stack: 1 },
  [ITEM.BOAT]:      { name: 'Boat', stack: 1 },
  [ITEM.MINECART]:  { name: 'Minecart', stack: 1 },
  // Dyes
  [ITEM.WHITE_DYE]:       { name: 'White Dye', stack: 64 },
  [ITEM.ORANGE_DYE]:      { name: 'Orange Dye', stack: 64 },
  [ITEM.MAGENTA_DYE]:     { name: 'Magenta Dye', stack: 64 },
  [ITEM.LIGHT_BLUE_DYE]:  { name: 'Light Blue Dye', stack: 64 },
  [ITEM.YELLOW_DYE]:      { name: 'Yellow Dye', stack: 64 },
  [ITEM.GRAY_DYE]:        { name: 'Gray Dye', stack: 64 },
  [ITEM.LIGHT_GRAY_DYE]:  { name: 'Light Gray Dye', stack: 64 },
  [ITEM.CYAN_DYE]:        { name: 'Cyan Dye', stack: 64 },
  [ITEM.PURPLE_DYE]:      { name: 'Purple Dye', stack: 64 },
  [ITEM.BROWN_DYE]:       { name: 'Brown Dye', stack: 64 },
  [ITEM.GREEN_DYE]:       { name: 'Green Dye', stack: 64 },
  [ITEM.RED_DYE]:         { name: 'Red Dye', stack: 64 },
  [ITEM.BLACK_DYE]:       { name: 'Black Dye', stack: 64 },
  // Hoes
  [ITEM.WOOD_HOE]:   { name: 'Wood Hoe', stack: 1, tool: true },
  [ITEM.STONE_HOE]:  { name: 'Stone Hoe', stack: 1, tool: true },
  [ITEM.IRON_HOE]:   { name: 'Iron Hoe', stack: 1, tool: true },
  [ITEM.DIAMOND_HOE]: { name: 'Diamond Hoe', stack: 1, tool: true },
  [ITEM.BOW]:         { name: 'Bow', stack: 1 },
  [ITEM.SHIELD]:      { name: 'Shield', stack: 1 },
  [ITEM.FISHING_ROD]: { name: 'Fishing Rod', stack: 1 },
};

// --- armor definitions -------------------------------------------------------
// armorSlot: 0=helmet, 1=chestplate, 2=leggings, 3=boots
// defense: total armor points (affects damage reduction)
const ARMOR_MATERIALS = {
  LEATHER: { defense: 7,  durability: 55,  slot: 'LEATHER' },
  CHAIN:   { defense: 12, durability: 165, slot: 'CHAIN' },
  IRON:    { defense: 15, durability: 225, slot: 'IRON' },
  GOLD:    { defense: 7,  durability: 77,  slot: 'GOLD' },
  DIAMOND: { defense: 20, durability: 363, slot: 'DIAMOND' },
  PRISMITE:{ defense: 999,durability: 9999,slot: 'PRISMITE' },
  CRYSTAL: { defense: 18, durability: 4000, slot: 'CRYSTAL' },
};

// Per-piece defense and slot index
const ARMOR_PIECES = {
  HELMET:  { slotIdx: 0, defense: 1 },
  CHEST:   { slotIdx: 1, defense: 3 },
  LEGS:    { slotIdx: 2, defense: 2 },
  BOOTS:   { slotIdx: 3, defense: 1 },
};

const ARMOR = {};
(function buildArmorTable() {
  const mats = ['LEATHER', 'CHAIN', 'IRON', 'GOLD', 'DIAMOND', 'PRISMITE'];
  const pieces = ['HELMET', 'CHEST', 'LEGS', 'BOOTS'];
  const pieceNames = { HELMET: 'Helmet', CHEST: 'Chestplate', LEGS: 'Leggings', BOOTS: 'Boots' };
  const matNames = { LEATHER: 'Leather', CHAIN: 'Chainmail', IRON: 'Iron', GOLD: 'Gold', DIAMOND: 'Diamond' };
  for (const m of mats) {
    for (const p of pieces) {
      const id = ITEM[`${m}_${p}`];
      if (id != null) ARMOR[id] = {
        material: m, piece: p,
        slotIdx: ARMOR_PIECES[p].slotIdx,
        defense: ARMOR_PIECES[p].defense + (ARMOR_MATERIALS[m]?.defense || 0),
        totalDefense: ARMOR_MATERIALS[m].defense,
        durability: ARMOR_MATERIALS[m].durability,
      };
    }
  }
})();
// Original armor: Gravity Boots (slow-fall + fall-damage immunity)
ARMOR[ITEM.GRAVITY_BOOTS] = {
  material: 'CRYSTAL', piece: 'BOOTS',
  slotIdx: 3, defense: ARMOR_PIECES.BOOTS.defense + ARMOR_MATERIALS.CRYSTAL.defense,
  totalDefense: ARMOR_MATERIALS.CRYSTAL.defense, durability: ARMOR_MATERIALS.CRYSTAL.durability,
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
    const t = TOOLS[id];
    const mat = TOOL_MATERIALS[t.material];
    const typeLabel = t.type.charAt(0).toUpperCase() + t.type.slice(1);
    let matLabel;
    if (t.woodType) {
      // Wood-type tools: "Oak Pickaxe", "Jungle Sword", etc.
      matLabel = t.woodType === 'DARK_OAK' ? 'Dark Oak' : t.woodType.charAt(0) + t.woodType.slice(1).toLowerCase();
    } else {
      matLabel = t.material.charAt(0) + t.material.slice(1).toLowerCase();
    }
    return {
      name: `${matLabel} ${typeLabel}`,
      stack: 1,
      tool: { type: t.type, material: t.material, woodType: t.woodType, durability: mat.durability, maxDurability: mat.durability },
    };
  }
  if (ARMOR[id]) {
    const a = ARMOR[id];
    const matName = a.material.charAt(0) + a.material.slice(1).toLowerCase();
    const pieceName = { HELMET: 'Helmet', CHEST: 'Chestplate', LEGS: 'Leggings', BOOTS: 'Boots' }[a.piece];
    return { name: `${matName} ${pieceName}`, stack: 1, armor: { material: a.material, slotIdx: a.slotIdx, defense: a.defense, durability: a.durability, maxDurability: a.durability } };
  }
  return NONBLOCK_ITEMS[id] || null;
}

export function itemName(idOrSlot) {
  const slot = (idOrSlot && typeof idOrSlot === 'object') ? idOrSlot : null;
  const id = slot ? slot.item : idOrSlot;
  const d = itemDef(id);
  const base = d ? d.name : '?';
  if (slot && slot.customName) return slot.customName;
  return base;
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

// --- armor helpers -----------------------------------------------------------
export { ARMOR };
export function isArmor(id) { return !!ARMOR[id]; }
export function armorInfo(id) { return ARMOR[id] || null; }
// Total defense points from all equipped armor slots.
export function totalArmorDefense(armorArray) {
  let total = 0;
  let prismiteCount = 0;
  for (const slot of armorArray) {
    if (slot && ARMOR[slot.item]) {
      const piece = ARMOR[slot.item];
      if (piece.material === 'PRISMITE') prismiteCount++;
      total += ARMOR_PIECES[piece.piece].defense;
    }
  }
  // Full prismite set = invincible
  if (prismiteCount >= 4) return 999;
  return total;
}

// --- Rarity System --------------------------------------------------------
export const RARITY = {
  COMMON:    { name: 'Common',    color: '#aaa',    glow: 0x000000, particle: null },
  UNCOMMON:  { name: 'Uncommon',  color: '#5f5',    glow: 0x00ff00, particle: null },
  RARE:      { name: 'Rare',      color: '#55f',    glow: 0x4444ff, particle: null },
  EPIC:      { name: 'Epic',      color: '#a5f',    glow: 0xaa55ff, particle: 0xaa55ff },
  LEGENDARY: { name: 'Legendary', color: '#fa0',    glow: 0xffaa00, particle: 0xffaa00 },
  MYTHIC:    { name: 'Mythic',    color: '#f55',    glow: 0xff3333, particle: 0xff3333 },
};

const RARITY_ORDER = ['COMMON', 'UNCOMMON', 'RARE', 'EPIC', 'LEGENDARY', 'MYTHIC'];

// Item rarity assignments
const ITEM_RARITY = {
  [ITEM.DIAMOND]: 'RARE',
  [ITEM.EMERALD]: 'EPIC',
  [ITEM.GOLDEN_APPLE]: 'EPIC',
  [ITEM.GOLDEN_CARROT]: 'UNCOMMON',
  [ITEM.DIAMOND_SWORD]: 'RARE',
  [ITEM.DIAMOND_PICKAXE]: 'RARE',
  [ITEM.DIAMOND_AXE]: 'RARE',
  [ITEM.EMERALD_SWORD]: 'EPIC',
  [ITEM.EMERALD_PICKAXE]: 'EPIC',
  [ITEM.PRISMITE_SWORD]: 'LEGENDARY',
  [ITEM.PRISMITE_PICKAXE]: 'LEGENDARY',
  [ITEM.PRISMITE_CHEST]: 'LEGENDARY',
  [ITEM.PRISMITE_HELMET]: 'LEGENDARY',
  [ITEM.PRISMITE_LEGS]: 'LEGENDARY',
  [ITEM.PRISMITE_BOOTS]: 'LEGENDARY',
  [ITEM.DRAGON_BLADE]: 'MYTHIC',
  [ITEM.DRAGON_SCALES]: 'EPIC',
  [ITEM.DRAGON_HEART]: 'LEGENDARY',
  [ITEM.PORTAL_ORB]: 'EPIC',
  [ITEM.RIFT_EYE]: 'RARE',
  [ITEM.VOID_PEARL]: 'RARE',
};

export function getItemRarity(itemId) {
  return RARITY[ITEM_RARITY[itemId]] || RARITY.COMMON;
}
export function getItemRarityKey(itemId) {
  return ITEM_RARITY[itemId] || 'COMMON';
}
