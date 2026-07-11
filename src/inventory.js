// Player inventory.
//
// 36 main slots (0..8 = hotbar, 9..35 = main grid) + 4 armor slots. Each slot
// is either null or `{ item: id, count: n }`. Tools (stack:1) always occupy
// their own slot. The selected hotbar index tracks which slot the player is
// "holding" for break/place actions.

import { maxStack } from './items.js';

export const HOTBAR_SLOTS = 9;
export const MAIN_SLOTS = 27;
export const TOTAL = HOTBAR_SLOTS + MAIN_SLOTS;
export const ARMOR_SLOTS = 4;

export class Inventory {
  constructor() {
    this.slots = new Array(TOTAL).fill(null);
    this.armor = new Array(ARMOR_SLOTS).fill(null);
    this.offhand = null; // single offhand slot
    this.selected = 0; // hotbar index 0..8
  }

  // --- selection -----------------------------------------------------------
  getSelected() { return this.slots[this.selected]; }

  setSelected(i) {
    this.selected = ((i % HOTBAR_SLOTS) + HOTBAR_SLOTS) % HOTBAR_SLOTS;
  }

  // --- queries -------------------------------------------------------------
  // Total count of a given item id across the whole inventory.
  count(itemId) {
    let n = 0;
    for (const s of this.slots) if (s && s.item === itemId) n += s.count;
    return n;
  }
  has(itemId, n = 1) { return this.count(itemId) >= n; }

  // --- add -----------------------------------------------------------------
  // Tries to add `count` of `itemId`. Returns leftover that didn't fit.
  // Prefers stacking onto existing slots, then empty slots.
  add(itemId, count = 1) {
    if (itemId == null || itemId < 0 || count <= 0) return count;
    const cap = maxStack(itemId);
    // 1. top up existing stacks
    for (let i = 0; i < TOTAL && count > 0; i++) {
      const s = this.slots[i];
      if (s && s.item === itemId && s.count < cap) {
        const add = Math.min(cap - s.count, count);
        s.count += add; count -= add;
      }
    }
    // 2. fill empty slots
    for (let i = 0; i < TOTAL && count > 0; i++) {
      if (!this.slots[i]) {
        const add = Math.min(cap, count);
        this.slots[i] = { item: itemId, count: add };
        count -= add;
      }
    }
    return count; // leftover
  }

  // Sanitize the whole inventory: fix corrupted counts, remove invalid slots
  validate() {
    for (let i = 0; i < TOTAL; i++) {
      const s = this.slots[i];
      if (s) {
        if (s.count <= 0) { this.slots[i] = null; continue; }
        if (s.count > maxStack(s.item)) s.count = maxStack(s.item);
      }
    }
    for (let i = 0; i < ARMOR_SLOTS; i++) {
      const s = this.armor[i];
      if (s && s.count <= 0) this.armor[i] = null;
    }
  }

  // --- remove --------------------------------------------------------------
  // Remove up to `count` of `itemId` from anywhere. Returns amount removed.
  remove(itemId, count = 1) {
    let removed = 0;
    for (let i = 0; i < TOTAL && removed < count; i++) {
      const s = this.slots[i];
      if (s && s.item === itemId) {
        const take = Math.min(s.count, count - removed);
        s.count -= take; removed += take;
        if (s.count <= 0) this.slots[i] = null;
      }
    }
    return removed;
  }

  // Consume exactly 1 from the selected slot (returns the item id, or null).
  consumeSelected() {
    const s = this.slots[this.selected];
    if (!s) return null;
    const id = s.item;
    s.count--;
    if (s.count <= 0) this.slots[this.selected] = null;
    return id;
  }

  // Damage the tool in the selected slot by 1; break if durability hits 0.
  damageSelected() {
    const s = this.slots[this.selected];
    if (!s || !s.durability) return false;
    s.durability--;
    if (s.durability <= 0) {
      this.slots[this.selected] = null;
      return true; // broken
    }
    return false;
  }

  // --- slot manipulation (for the inventory UI) ---------------------------
  swap(i, otherSlot) {
    const tmp = this.slots[i];
    this.slots[i] = otherSlot;
    return tmp;
  }

  // Place a single item into a specific slot if it fits/empty. Returns the
  // slot's previous content (for drag UI). Honors max-stack when merging.
  placeInto(i, stack) {
    if (!stack) { this.slots[i] = null; return null; }
    const cur = this.slots[i];
    if (cur && cur.item === stack.item && cur.count < maxStack(stack.item)) {
      const add = Math.min(maxStack(stack.item) - cur.count, stack.count);
      cur.count += add;
      stack.count -= add;
      if (stack.count <= 0) return null;
      return stack;
    }
    // swap
    this.slots[i] = stack;
    return cur;
  }

  clear() {
    for (let i = 0; i < TOTAL; i++) this.slots[i] = null;
    for (let i = 0; i < ARMOR_SLOTS; i++) this.armor[i] = null;
    this.offhand = null;
  }

  // Sort main inventory: stack-compatible items together and fill gaps.
  sort() {
    const items = this.slots.filter(s => s);
    // Group by item id, merging counts up to max stack
    const byId = new Map();
    for (const s of items) {
      const cap = maxStack(s.item);
      if (!byId.has(s.item)) byId.set(s.item, { item: s.item, count: 0, durability: s.durability });
      const entry = byId.get(s.item);
      entry.count += s.count;
      if (entry.count > cap) {
        // overflow: push extras back as separate stacks later
        this._overflow = this._overflow || [];
      }
    }
    // Rebuild slots in order
    const sortedSlots = [];
    for (const [item, entry] of byId) {
      const cap = maxStack(item);
      let remaining = entry.count;
      while (remaining > 0) {
        const c = Math.min(remaining, cap);
        sortedSlots.push({ item, count: c, ...(entry.durability != null ? { durability: entry.durability } : {}) });
        remaining -= c;
      }
    }
    // Fill slots
    for (let i = 0; i < TOTAL; i++) {
      this.slots[i] = sortedSlots[i] || null;
    }
  }

  // --- serialization -------------------------------------------------------
  serialize() {
    return {
      slots: this.slots.map(s => s ? [s.item, s.count, s.durability ?? null] : null),
      armor: this.armor.map(s => s ? [s.item, s.count, s.durability ?? null] : null),
      offhand: this.offhand ? [this.offhand.item, this.offhand.count, this.offhand.durability ?? null] : null,
      selected: this.selected,
    };
  }

  load(obj) {
    if (!obj) return;
    if (Array.isArray(obj.slots)) {
      this.slots = obj.slots.map(s => s ? { item: s[0], count: Math.max(1, Math.min(s[1], 64)), ...(s[2] != null ? { durability: s[2] } : {}) } : null);
      // Validate: ensure no count exceeds max stack
      for (const s of this.slots) {
        if (s && s.count > maxStack(s.item)) s.count = maxStack(s.item);
        if (s && s.count <= 0) s.count = 1;
      }
    }
    if (Array.isArray(obj.armor)) {
      this.armor = obj.armor.map(s => s ? { item: s[0], count: 1, ...(s[2] != null ? { durability: s[2] } : {}) } : null);
    }
    if (obj.offhand) {
      this.offhand = { item: obj.offhand[0], count: Math.max(1, obj.offhand[1]), ...(obj.offhand[2] != null ? { durability: obj.offhand[2] } : {}) };
    }
    if (typeof obj.selected === 'number') this.selected = Math.max(0, Math.min(obj.selected, 8));
  }
}
