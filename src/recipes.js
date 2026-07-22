// Crafting recipe definitions.
//
// Two recipe shapes:
//   shaped   : a 2D pattern (array of strings, rows) with a key->item map.
//              The pattern can sit anywhere in the grid (we normalize by
//              trimming empty rows/cols before matching, like Minecraft).
//   shapeless: a multiset of ingredients, order-independent.
//
// `grid` passed to match() is an array of 4 (2x2) or 9 (3x3) item-id slots,
// null where empty. We convert it to the same normalized form and compare.

import { BLOCK, BLOCKS } from './blocks.js';
import { ITEM } from './items.js';

// Keys are short identifiers; we map them to concrete item ids below.
const B = BLOCK;        // block id shortcut
const I = ITEM;         // item id shortcut

// Every recipe: { out: {id, count}, ...either shape or ingredients }
export const RECIPES = [
  // ---- basic wood chain ----
  shaped({
    out: { id: B.PLANKS, count: 4 },
    pattern: ['W'],
    key: { W: B.WOOD },
  }),
  shaped({
    out: { id: I.STICK, count: 4 },
    pattern: ['P', 'P'],
    key: { P: B.PLANKS },
  }),

  // ---- utility blocks ----
  shaped({
    out: { id: B.CRAFTING, count: 1 },
    pattern: ['PP', 'PP'],
    key: { P: B.PLANKS },
  }),
  shaped({
    out: { id: B.FURNACE, count: 1 },
    pattern: ['CCC', 'C C', 'CCC'],
    key: { C: B.COBBLESTONE },
  }),
  shaped({
    out: { id: B.TNT, count: 1 },
    pattern: ['GG', 'SS', 'GG'],
    key: { G: I.GUNPOWDER, S: B.SAND },
  }),
  shaped({
    out: { id: I.FLINT_STEEL, count: 1 },
    pattern: ['F', 'I'],
    key: { F: I.FLINT, I: I.IRON_INGOT },
  }),

  // ---- storage blocks ----
  shaped({
    out: { id: B.BOOKSHELF, count: 1 },
    pattern: ['PPP', 'LLL', 'PPP'],
    key: { P: B.PLANKS, L: I.LEATHER }, // leather stands in for books (no book item yet)
  }),
  shaped({
    out: { id: B.BRICK, count: 1 },
    pattern: ['KK', 'KK'],
    key: { K: B.CLAY },
  }),

  // ---- tools (3x3 needed for the full pickaxe head) ----
  shaped({
    out: { id: I.WOOD_PICKAXE, count: 1, durability: true },
    pattern: ['PPP', ' S ', ' S '],
    key: { P: B.PLANKS, S: I.STICK },
  }),
  shaped({
    out: { id: I.STONE_PICKAXE, count: 1, durability: true },
    pattern: ['CCC', ' S ', ' S '],
    key: { C: B.COBBLESTONE, S: I.STICK },
  }),
  shaped({
    out: { id: I.IRON_PICKAXE, count: 1, durability: true },
    pattern: ['III', ' S ', ' S '],
    key: { I: I.IRON_INGOT, S: I.STICK },
  }),
  shaped({
    out: { id: I.DIAMOND_PICKAXE, count: 1, durability: true },
    pattern: ['DDD', ' S ', ' S '],
    key: { D: I.DIAMOND, S: I.STICK },
  }),

  shaped({
    out: { id: I.WOOD_AXE, count: 1, durability: true },
    pattern: ['PP', 'PS', ' S'],
    key: { P: B.PLANKS, S: I.STICK },
  }),
  shaped({
    out: { id: I.STONE_AXE, count: 1, durability: true },
    pattern: ['CC', 'CS', ' S'],
    key: { C: B.COBBLESTONE, S: I.STICK },
  }),
  shaped({
    out: { id: I.IRON_AXE, count: 1, durability: true },
    pattern: ['II', 'IS', ' S'],
    key: { I: I.IRON_INGOT, S: I.STICK },
  }),
  shaped({
    out: { id: I.DIAMOND_AXE, count: 1, durability: true },
    pattern: ['DD', 'DS', ' S'],
    key: { D: I.DIAMOND, S: I.STICK },
  }),

  shaped({
    out: { id: I.WOOD_SHOVEL, count: 1, durability: true },
    pattern: ['P', 'S', 'S'],
    key: { P: B.PLANKS, S: I.STICK },
  }),
  shaped({
    out: { id: I.STONE_SHOVEL, count: 1, durability: true },
    pattern: ['C', 'S', 'S'],
    key: { C: B.COBBLESTONE, S: I.STICK },
  }),
  shaped({
    out: { id: I.IRON_SHOVEL, count: 1, durability: true },
    pattern: ['I', 'S', 'S'],
    key: { I: I.IRON_INGOT, S: I.STICK },
  }),
  shaped({
    out: { id: I.DIAMOND_SHOVEL, count: 1, durability: true },
    pattern: ['D', 'S', 'S'],
    key: { D: I.DIAMOND, S: I.STICK },
  }),

  shaped({
    out: { id: I.WOOD_SWORD, count: 1, durability: true },
    pattern: ['P', 'P', 'S'],
    key: { P: B.PLANKS, S: I.STICK },
  }),
  shaped({
    out: { id: I.STONE_SWORD, count: 1, durability: true },
    pattern: ['C', 'C', 'S'],
    key: { C: B.COBBLESTONE, S: I.STICK },
  }),
  shaped({
    out: { id: I.IRON_SWORD, count: 1, durability: true },
    pattern: ['I', 'I', 'S'],
    key: { I: I.IRON_INGOT, S: I.STICK },
  }),
  shaped({
    out: { id: I.DIAMOND_SWORD, count: 1, durability: true },
    pattern: ['D', 'D', 'S'],
    key: { D: I.DIAMOND, S: I.STICK },
  }),

  // ---- food ----
  shaped({
    out: { id: I.BREAD, count: 1 },
    pattern: ['WWW'],
    key: { W: I.WHEAT },
  }),

  // ---- misc ----
  shaped({
    out: { id: B.GLASS, count: 1 },
    pattern: ['  ', '  '],
    key: {},
    _disabled: true, // placeholder, glass is smelted
  }),

  // ---- bed ----
  shaped({
    out: { id: I.BED, count: 1 },
    pattern: ['WWW', 'PPP'],
    key: { W: I.WOOL, P: 10 },
  }),

  // ---- armor: Leather ----
  shaped({ out: { id: I.LEATHER_HELMET, count: 1 }, pattern: ['LLL', 'L L'], key: { L: I.LEATHER } }),
  shaped({ out: { id: I.LEATHER_CHEST, count: 1 }, pattern: ['L L', 'LLL', 'LLL'], key: { L: I.LEATHER } }),
  shaped({ out: { id: I.LEATHER_LEGS, count: 1 }, pattern: ['LLL', 'L L', 'L L'], key: { L: I.LEATHER } }),
  shaped({ out: { id: I.LEATHER_BOOTS, count: 1 }, pattern: ['L L', 'L L'], key: { L: I.LEATHER } }),

  // ---- armor: Iron ----
  shaped({ out: { id: I.IRON_HELMET, count: 1 }, pattern: ['III', 'I I'], key: { I: I.IRON_INGOT } }),
  shaped({ out: { id: I.IRON_CHEST, count: 1 }, pattern: ['I I', 'III', 'III'], key: { I: I.IRON_INGOT } }),
  shaped({ out: { id: I.IRON_LEGS, count: 1 }, pattern: ['III', 'I I', 'I I'], key: { I: I.IRON_INGOT } }),
  shaped({ out: { id: I.IRON_BOOTS, count: 1 }, pattern: ['I I', 'I I'], key: { I: I.IRON_INGOT } }),

  // ---- armor: Gold ----
  shaped({ out: { id: I.GOLD_HELMET, count: 1 }, pattern: ['GGG', 'G G'], key: { G: I.GOLD_INGOT } }),
  shaped({ out: { id: I.GOLD_CHEST, count: 1 }, pattern: ['G G', 'GGG', 'GGG'], key: { G: I.GOLD_INGOT } }),
  shaped({ out: { id: I.GOLD_LEGS, count: 1 }, pattern: ['GGG', 'G G', 'G G'], key: { G: I.GOLD_INGOT } }),
  shaped({ out: { id: I.GOLD_BOOTS, count: 1 }, pattern: ['G G', 'G G'], key: { G: I.GOLD_INGOT } }),

  // ---- armor: Diamond ----
  shaped({ out: { id: I.DIAMOND_HELMET, count: 1 }, pattern: ['DDD', 'D D'], key: { D: I.DIAMOND } }),
  shaped({ out: { id: I.DIAMOND_CHEST, count: 1 }, pattern: ['D D', 'DDD', 'DDD'], key: { D: I.DIAMOND } }),
  shaped({ out: { id: I.DIAMOND_LEGS, count: 1 }, pattern: ['DDD', 'D D', 'D D'], key: { D: I.DIAMOND } }),
  shaped({ out: { id: I.DIAMOND_BOOTS, count: 1 }, pattern: ['D D', 'D D'], key: { D: I.DIAMOND } }),

  // ---- Prismite tools ----
  shaped({ out: { id: I.PRISMITE_SWORD, count: 1 }, pattern: ['P', 'P', 'S'], key: { P: I.PRISMITE, S: I.STICK } }),
  shaped({ out: { id: I.PRISMITE_PICKAXE, count: 1 }, pattern: ['PPP', ' S ', ' S '], key: { P: I.PRISMITE, S: I.STICK } }),
  shaped({ out: { id: I.PRISMITE_AXE, count: 1 }, pattern: ['PP', 'PS', ' S'], key: { P: I.PRISMITE, S: I.STICK } }),
  shaped({ out: { id: I.PRISMITE_SHOVEL, count: 1 }, pattern: ['P', 'S', 'S'], key: { P: I.PRISMITE, S: I.STICK } }),

  // ---- Prismite armor ----
  shaped({ out: { id: I.PRISMITE_HELMET, count: 1 }, pattern: ['PPP', 'P P'], key: { P: I.PRISMITE } }),
  shaped({ out: { id: I.PRISMITE_CHEST, count: 1 }, pattern: ['P P', 'PPP', 'PPP'], key: { P: I.PRISMITE } }),
  shaped({ out: { id: I.PRISMITE_LEGS, count: 1 }, pattern: ['PPP', 'P P', 'P P'], key: { P: I.PRISMITE } }),
  shaped({ out: { id: I.PRISMITE_BOOTS, count: 1 }, pattern: ['P P', 'P P'], key: { P: I.PRISMITE } }),

  // ---- New BlockForge blocks ----
  shaped({ out: { id: B.SANDSTONE, count: 1 }, pattern: ['SS', 'SS'], key: { S: B.SAND } }),
  shaped({ out: { id: B.MOSSY_COBBLESTONE, count: 1 }, pattern: ['C', 'V'], key: { C: B.COBBLESTONE, V: B.LEAVES } }),
  shaped({ out: { id: B.COBBLESTONE_WALL, count: 6 }, pattern: ['C', 'C'], key: { C: B.COBBLESTONE } }),
  shaped({ out: { id: B.NETHER_BRICK, count: 1 }, pattern: ['NN', 'NN'], key: { N: B.NETHERRACK } }),
  shaped({ out: { id: B.GLASS_PANE, count: 16 }, pattern: ['GG', 'GG'], key: { G: B.GLASS } }),
  shaped({ out: { id: B.HAY_BLOCK, count: 1 }, pattern: ['WW', 'WW'], key: { W: I.WHEAT } }),
  shaped({ out: { id: B.PRISMITE_BLOCK, count: 1 }, pattern: ['PP', 'PP'], key: { P: I.PRISMITE } }),
  shaped({ out: { id: B.COAL_BLOCK, count: 1 }, pattern: ['CC', 'CC'], key: { C: I.COAL } }),
  shaped({ out: { id: B.IRON_BLOCK, count: 1 }, pattern: ['II', 'II'], key: { I: I.IRON_INGOT } }),
  shaped({ out: { id: B.GOLD_BLOCK, count: 1 }, pattern: ['GG', 'GG'], key: { G: I.GOLD_INGOT } }),
  shaped({ out: { id: B.DIAMOND_BLOCK, count: 1 }, pattern: ['DD', 'DD'], key: { D: I.DIAMOND } }),
  shaped({ out: { id: B.TORCH, count: 4 }, pattern: ['C', 'S'], key: { C: I.COAL, S: I.STICK } }),
  // Reverse storage blocks -> 9 ingots
  shaped({ out: { id: I.COAL, count: 9 }, pattern: ['C'], key: { C: B.COAL_BLOCK } }),
  shaped({ out: { id: I.IRON_INGOT, count: 9 }, pattern: ['I'], key: { I: B.IRON_BLOCK } }),
  shaped({ out: { id: I.GOLD_INGOT, count: 9 }, pattern: ['G'], key: { G: B.GOLD_BLOCK } }),
  shaped({ out: { id: I.DIAMOND, count: 9 }, pattern: ['D'], key: { D: B.DIAMOND_BLOCK } }),
  shaped({ out: { id: I.PRISMITE, count: 9 }, pattern: ['P'], key: { P: B.PRISMITE_BLOCK } }),

  // ---- Foods ----
  shaped({ out: { id: I.GOLDEN_APPLE, count: 1 },
    pattern: ['GGG', 'GAG', 'GGG'], key: { G: I.GOLD_INGOT, A: I.APPLE } }),
  shaped({ out: { id: I.PUMPKIN_PIE, count: 1 },
    pattern: ['P', 'E', 'W'], key: { P: B.PUMPKIN, E: I.EGG, W: I.WHEAT } }),

  // ---- Copper tools ----
  shaped({ out: { id: I.COPPER_PICKAXE, count: 1, durability: true },
    pattern: ['CCC', ' S ', ' S '], key: { C: I.COPPER_INGOT, S: I.STICK } }),
  shaped({ out: { id: I.COPPER_AXE, count: 1, durability: true },
    pattern: ['CC', 'CS', ' S'], key: { C: I.COPPER_INGOT, S: I.STICK } }),
  shaped({ out: { id: I.COPPER_SHOVEL, count: 1, durability: true },
    pattern: ['C', 'S', 'S'], key: { C: I.COPPER_INGOT, S: I.STICK } }),
  shaped({ out: { id: I.COPPER_SWORD, count: 1, durability: true },
    pattern: ['C', 'C', 'S'], key: { C: I.COPPER_INGOT, S: I.STICK } }),

  // ---- Emerald tools ----
  shaped({ out: { id: I.EMERALD_PICKAXE, count: 1, durability: true },
    pattern: ['EEE', ' S ', ' S '], key: { E: I.EMERALD, S: I.STICK } }),
  shaped({ out: { id: I.EMERALD_AXE, count: 1, durability: true },
    pattern: ['EE', 'ES', ' S'], key: { E: I.EMERALD, S: I.STICK } }),
  shaped({ out: { id: I.EMERALD_SHOVEL, count: 1, durability: true },
    pattern: ['E', 'S', 'S'], key: { E: I.EMERALD, S: I.STICK } }),
  shaped({ out: { id: I.EMERALD_SWORD, count: 1, durability: true },
    pattern: ['E', 'E', 'S'], key: { E: I.EMERALD, S: I.STICK } }),

  // ---- Ladder ----
  shaped({ out: { id: B.LADDER, count: 3 },
    pattern: ['S S', 'SSS', 'S S'], key: { S: I.STICK } }),

  // ---- Oak Fence ----
  shaped({ out: { id: B.OAK_FENCE, count: 3 },
    pattern: ['PSP', 'PSP'], key: { P: B.PLANKS, S: I.STICK } }),

  // ---- Oak Door ----
  shaped({ out: { id: B.OAK_DOOR, count: 1 },
    pattern: ['PP', 'PP', 'PP'], key: { P: B.PLANKS } }),

  // ---- Iron Door ----
  shaped({ out: { id: B.IRON_DOOR, count: 1 },
    pattern: ['II', 'II', 'II'], key: { I: I.IRON_INGOT } }),

  // ---- Stone Button ----
  shaped({ out: { id: B.STONE_BUTTON, count: 1 },
    pattern: ['S'], key: { S: B.COBBLESTONE } }),

  // ---- Lever ----
  shaped({ out: { id: B.LEVER, count: 1 },
    pattern: ['S', 'C'], key: { S: I.STICK, C: B.COBBLESTONE } }),

  // ---- Oak Sign ----
  shaped({ out: { id: B.OAK_SIGN, count: 1 },
    pattern: ['PPP', 'PPP', ' S '], key: { P: B.PLANKS, S: I.STICK } }),

  // ---- Stone Pressure Plate ----
  shaped({ out: { id: B.STONE_PRESSURE_PLATE, count: 1 },
    pattern: ['SS'], key: { S: B.COBBLESTONE } }),

  // ---- Carpet ----
  shaped({ out: { id: B.CARPET, count: 3 },
    pattern: ['WW'], key: { W: I.WOOL } }),

  // ---- Wool from string ----
  shaped({ out: { id: I.WOOL, count: 1 },
    pattern: ['SS', 'SS'], key: { S: I.STRING } }),

  // ---- Dye recipes ----
  shapeless({ out: { id: I.BONE_MEAL, count: 3 }, ingredients: [I.BONE] }),

  // ---- Greenstone ----
  shaped({ out: { id: B.GREENSTONE_BLOCK, count: 1 },
    pattern: ['GGG', 'GGG', 'GGG'], key: { G: I.GREENSTONE_DUST } }),
  shaped({ out: { id: I.GREENSTONE_DUST, count: 9 },
    pattern: ['G'], key: { G: B.GREENSTONE_BLOCK } }),
  shaped({ out: { id: B.GREENSTONE_TORCH, count: 1 },
    pattern: ['G', 'S'], key: { G: I.GREENSTONE_DUST, S: I.STICK } }),
  shaped({ out: { id: B.GREENSTONE_LAMP, count: 1 },
    pattern: ['GGG', 'GTG', 'GGG'], key: { G: I.GREENSTONE_DUST, T: B.TORCH } }),

  // ---- Pistons ----
  shaped({ out: { id: B.PISTON, count: 1 },
    pattern: ['PPP', 'CIC', 'CSC'], key: { P: B.PLANKS, C: B.COBBLESTONE, I: I.IRON_INGOT, S: I.STICK } }),
  shaped({ out: { id: B.STICKY_PISTON, count: 1 },
    pattern: ['S', 'P'], key: { S: I.SLIME_BALL, P: B.PISTON } }),

  // ---- Eye of Ender ----
  shaped({ out: { id: I.EYE_OF_ENDER, count: 1 },
    pattern: ['E', 'P'], key: { E: I.ENDER_PEARL, P: I.GREENSTONE_DUST } }),
];

// Smelting recipes: input item id -> output item id.
export const SMELTING = {
  [B.IRON_ORE]: I.IRON_INGOT,
  [B.GOLD_ORE]: I.GOLD_INGOT,
  [B.COAL_ORE]: I.COAL,
  [B.DIAMOND_ORE]: I.DIAMOND,
  [B.SAND]: B.GLASS,
  [B.RED_SAND]: B.GLASS,
  [B.COBBLESTONE]: B.STONE,
  [B.CLAY]: B.BRICK,
  [B.WOOD]: I.CHARCOAL,
  [B.JUNGLE_WOOD]: I.CHARCOAL,
  [B.DARK_OAK_LEAVES]: I.CHARCOAL,
  [B.CACTUS]: B.GLASS,
  [I.APPLE]: I.COOKED_APPLE,
  [I.PORKCHOP_RAW]: I.PORKCHOP_COOKED,
  [I.BEEF_RAW]: I.BEEF_COOKED,
  [I.CHICKEN_RAW]: I.CHICKEN_COOKED,
  [I.MUTTON_RAW]: I.MUTTON_COOKED,
  [B.NETHERRACK]: B.NETHER_BRICK,
  [B.COPPER_ORE]: I.COPPER_INGOT,
  [B.EMERALD_ORE]: I.EMERALD,
  [B.GREENSTONE_ORE]: I.GREENSTONE_DUST,
};

// --- recipe builders --------------------------------------------------------
function shaped({ out, pattern, key, _disabled }) {
  // Convert the string pattern into a normalized 2D grid of item ids (or null).
  // pattern: ['PPP',' S ',' S ']; key: { P: id, S: id }
  const grid = pattern.map(row =>
    row.split('').map(ch => {
      if (ch === ' ') return null;
      const v = key[ch];
      return v == null ? null : v;
    })
  );
  return { type: 'shaped', out, grid, _disabled: !!_disabled };
}

// Shapeless recipe: order-independent multiset of ingredient item ids.
function shapeless({ out, ingredients, _disabled }) {
  return { type: 'shapeless', out, ingredients: ingredients.slice().sort((a, b) => a - b), _disabled: !!_disabled };
}

// --- matching ---------------------------------------------------------------
// Convert a flat array of slots into a normalized (trimmed) 2D grid.
// `size` is 2 or 3 (the crafting grid dimension).
function normalizeGrid(flat, size) {
  // build 2D
  const g = [];
  for (let y = 0; y < size; y++) {
    const row = [];
    for (let x = 0; x < size; x++) {
      const slot = flat[y * size + x];
      row.push(slot ? slot.item : null);
    }
    g.push(row);
  }
  // trim empty rows/cols
  let minY = 0, maxY = size - 1, minX = 0, maxX = size - 1;
  while (minY <= maxY && g[minY].every(v => v == null)) minY++;
  while (maxY >= minY && g[maxY].every(v => v == null)) maxY--;
  while (minX <= maxX && g.every(row => row[minX] == null)) minX++;
  while (maxX >= minX && g.every(row => row[maxX] == null)) maxX--;
  if (minY > maxY || minX > maxX) return null; // empty grid
  const out = [];
  for (let y = minY; y <= maxY; y++) {
    out.push(g[y].slice(minX, maxX + 1));
  }
  return out;
}

function gridsEqual(a, b) {
  if (!a || !b) return false;
  if (a.length !== b.length) return false;
  for (let y = 0; y < a.length; y++) {
    if (a[y].length !== b[y].length) return false;
    for (let x = 0; x < a[y].length; x++) {
      if (a[y][x] !== b[y][x]) return false;
    }
  }
  return true;
}

// Find the first recipe that matches a crafting grid.
// `flat` is the grid slots; `size` is 2 or 3.
export function matchRecipe(flat, size) {
  const norm = normalizeGrid(flat, size);
  if (!norm) return null;
  // Multiset of non-empty ingredient ids for shapeless matching.
  const bag = flat.filter(s => s && s.item != null).map(s => s.item).sort((a, b) => a - b);
  for (const r of RECIPES) {
    if (r._disabled) continue;
    if (r.type === 'shaped' && gridsEqual(norm, r.grid)) {
      return r.out;
    }
    if (r.type === 'shapeless' && bag.length === r.ingredients.length &&
        bag.every((v, i) => v === r.ingredients[i])) {
      return r.out;
    }
  }
  return null;
}
