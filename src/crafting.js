// Crafting controller.
//
// Owns the crafting grid state (2x2 for inventory, 3x3 for crafting table) and
// the cursor-held stack. The UI reads/writes this; we resolve the recipe.

import { matchRecipe } from './recipes.js';
import { maxStack } from './items.js';
import { Inventory } from './inventory.js';

export class CraftingGrid {
  constructor(size = 2) {
    this.size = size;
    this.grid = new Array(size * size).fill(null);
    this.output = null;     // current recipe output preview
    this.cursor = null;     // {item, count} held by the mouse
  }

  // Re-evaluate the output slot from the current grid contents.
  refreshOutput() {
    this.output = matchRecipe(this.grid, this.size);
  }

  // Place/drag a stack into a grid cell. Handles merging + cursor swap.
  putCell(i, stack) {
    if (!stack) { this.grid[i] = null; this.refreshOutput(); return null; }
    const cur = this.grid[i];
    if (cur && cur.item === stack.item && cur.count < maxStack(stack.item)) {
      const add = Math.min(maxStack(stack.item) - cur.count, stack.count);
      cur.count += add;
      stack.count -= add;
      if (stack.count <= 0) stack = null;
      this.refreshOutput();
      return stack;
    }
    this.grid[i] = stack;
    this.refreshOutput();
    return cur;
  }

  takeCell(i) {
    const s = this.grid[i];
    this.grid[i] = null;
    this.refreshOutput();
    return s;
  }

  // Consume one ingredient from each grid cell (after crafting an item).
  consumeIngredients() {
    for (let i = 0; i < this.grid.length; i++) {
      const s = this.grid[i];
      if (s) { s.count--; if (s.count <= 0) this.grid[i] = null; }
    }
    this.refreshOutput();
  }

  // When closing the crafting screen, return all grid items to an inventory.
  returnAll(inventory) {
    for (let i = 0; i < this.grid.length; i++) {
      const s = this.grid[i];
      if (s) {
        const left = inventory.add(s.item, s.count);
        this.grid[i] = null;
      }
    }
    if (this.cursor) {
      inventory.add(this.cursor.item, this.cursor.count);
      this.cursor = null;
    }
    this.refreshOutput();
  }

  clear() {
    this.grid.fill(null);
    this.output = null;
    this.cursor = null;
  }
}
