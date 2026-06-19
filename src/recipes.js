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

  // ---- storage blocks ----
  shaped({
    out: { id: B.BOOKSHELF, count: 1 },
    pattern: ['PPP', 'BBB', 'PPP'],
    key: { P: B.PLANKS, B: 'book' }, // book not craftable yet; placeholder
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
};

// --- recipe builders --------------------------------------------------------
function shaped({ out, pattern, key }) {
  // Convert the string pattern into a normalized 2D grid of item ids (or null).
  // pattern: ['PPP',' S ',' S ']; key: { P: id, S: id }
  const grid = pattern.map(row =>
    row.split('').map(ch => {
      if (ch === ' ') return null;
      const v = key[ch];
      return v == null ? null : v;
    })
  );
  return { type: 'shaped', out, grid };
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
  for (const r of RECIPES) {
    if (r.type === 'shaped' && gridsEqual(norm, r.grid)) {
      return r.out;
    }
  }
  return null;
}
