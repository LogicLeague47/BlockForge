// DOM UI: hotbar (with stack counts), health hearts, hunger drumsticks,
// armor bar, HUD (coords/fps/biome), block-break progress overlay.
//
// The hotbar reads from the player's Inventory in survival mode, or falls back
// to the fixed HOTBAR_BLOCKS creative palette. Stack counts display when > 1.

import { HOTBAR_BLOCKS, BLOCKS } from './blocks.js';
import { makeIcon } from './tiles.js';
import { itemDef, isBlockItem, itemName, maxStack, ITEM } from './items.js';
import { HOTBAR_SLOTS } from './inventory.js';
import { CraftingGrid } from './crafting.js';
import { matchRecipe } from './recipes.js';

const HEART_COLS = '#b00', HEART_HALF_L = '#b00', HEART_HALF_R = '#633';
const HEART_EMPTY = '#411';
const DRUM_COLS = '#c87', DRUM_HALF_L = '#c87', DRUM_HALF_R = '#654';
const DRUM_EMPTY = '#422';

const HEART_PIXELS = [
  [0,1,1,0,0,0,1,1,0],
  [1,1,1,1,0,1,1,1,1],
  [1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1],
  [0,1,1,1,1,1,1,1,0],
  [0,0,1,1,1,1,1,0,0],
  [0,0,0,1,1,1,0,0,0],
  [0,0,0,0,1,0,0,0,0],
];

// Improved drumstick texture: chicken leg shape with bone
const DRUM_PIXELS = [
  [0,0,1,1,1,1,0,0,0],
  [0,1,1,1,1,1,1,0,0],
  [1,1,1,1,1,1,1,1,0],
  [1,1,1,1,1,1,1,1,0],
  [0,1,1,1,1,1,1,0,0],
  [0,0,1,1,1,1,0,0,0],
  [0,0,0,1,1,0,0,0,0],
  [0,0,0,1,1,0,0,0,0],
  [0,0,1,1,0,0,0,0,0],
];

const CRACK_STAGES = [
  null,
  [[4,3],[10,5],[7,8],[13,2],[1,12],[9,14],[5,1],[12,10]],
  [[3,2],[8,4],[12,7],[2,11],[6,0],[14,8],[1,14],[10,3],[5,12],[13,1],[0,6],[7,13],[11,5],[9,10],[4,9],[15,11]],
  [[1,1],[5,3],[9,2],[13,5],[3,7],[11,6],[0,10],[7,0],[14,4],[2,13],[6,11],[10,14],[4,15],[12,9],[8,12],[15,8]],
];

// Cache canvases to avoid expensive toDataURL every frame
const _heartCache = new Map();
const _drumCache = new Map();

function drawPixelIcon(pixels, fullCol, halfL, halfR, emptyCol, full, half, cache) {
  const key = `${full ? 1 : 0}${half ? 1 : 0}`;
  if (cache.has(key)) return cache.get(key);
  const c = document.createElement('canvas');
  c.width = 9; c.height = 9;
  const x = c.getContext('2d');
  const rows = pixels.length;
  for (let py = 0; py < rows; py++) {
    for (let px = 0; px < 9; px++) {
      if (!pixels[py]?.[px]) continue;
      if (full) x.fillStyle = fullCol;
      else if (half) x.fillStyle = px <= 4 ? halfL : halfR;
      else x.fillStyle = emptyCol;
      x.fillRect(px, py, 1, 1);
    }
  }
  cache.set(key, c);
  return c;
}

function drawHeart(full, half) {
  return drawPixelIcon(HEART_PIXELS, HEART_COLS, HEART_HALF_L, HEART_HALF_R, HEART_EMPTY, full, half, _heartCache);
}

function drawDrumstick(full, half) {
  return drawPixelIcon(DRUM_PIXELS, DRUM_COLS, DRUM_HALF_L, DRUM_HALF_R, DRUM_EMPTY, full, half, _drumCache);
}

export function drawCrack(c, stage) {
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, 64, 64);
  if (!stage || stage < 0 || stage > 3) return;
  const cracks = CRACK_STAGES[stage];
  if (!cracks) return;
  ctx.fillStyle = 'rgba(0,0,0,0.6)';
  ctx.strokeStyle = 'rgba(0,0,0,0.8)';
  ctx.lineWidth = 1;
  for (const [cx, cy] of cracks) {
    const sx = cx * 4, sy = cy * 4;
    ctx.fillRect(sx, sy, 4, 2);
    ctx.fillRect(sx + 1, sy + 2, 2, 2);
    ctx.fillRect(sx, sy, 2, 4);
  }
  // cross cracks
  ctx.strokeStyle = 'rgba(0,0,0,0.7)';
  ctx.beginPath();
  ctx.moveTo(8, 4); ctx.lineTo(4, 20); ctx.lineTo(12, 36); ctx.lineTo(6, 56);
  ctx.moveTo(20, 0); ctx.lineTo(28, 16); ctx.lineTo(24, 32); ctx.lineTo(32, 48);
  ctx.moveTo(44, 8); ctx.lineTo(38, 24); ctx.lineTo(48, 40); ctx.lineTo(40, 60);
  ctx.moveTo(56, 4); ctx.lineTo(52, 26); ctx.lineTo(60, 42);
  ctx.stroke();
}

export class UI {
  constructor(atlasCanvas) {
    this.atlas = atlasCanvas;
    this.hotbarEl = document.getElementById('hotbar');
    this.hudEl = document.getElementById('hud');
    this.overlayEl = document.getElementById('overlay');
    this.crosshair = document.getElementById('crosshair');
    this.itemNameEl = document.getElementById('item-name');
    this.waterOverlay = document.getElementById('water-overlay');
    this.xpFill = document.getElementById('xp-bar-fill');
    this.active = 0;
    this.creative = true;

    this.barsEl = document.getElementById('status-bars');
    this.armorBarEl = document.getElementById('armor-bar');
    this.healthBar = document.createElement('div');
    this.hungerBar = document.createElement('div');
    this.healthBar.style.cssText = 'display:flex;gap:1px;flex-direction:row-reverse;';
    this.hungerBar.style.cssText = 'display:flex;gap:1px;';
    this.barsEl.appendChild(this.healthBar);
    this.barsEl.appendChild(this.hungerBar);

    this.inventoryScreen = document.getElementById('inventory-screen');
    this.inventoryGrid = document.getElementById('inventory-grid');
    this.craftingInput = document.getElementById('crafting-input');
    this.craftingOutput = document.getElementById('crafting-output');
    this.craftingLabel = document.querySelector('.craft-label');
    this.cursorItemEl = document.getElementById('cursor-item');
    this.inventoryOpen = false;

    // Creative browser
    this.creativeBrowser = document.getElementById('creative-browser');
    this.creativeSearch = document.getElementById('creative-search');
    this.creativeGrid = document.getElementById('creative-grid');
    this._creativeItems = [];
    try { this._buildCreativeItemList(); } catch (e) { console.warn('Creative list build failed:', e); }
    if (this.creativeSearch) {
      this.creativeSearch.addEventListener('input', () => this._filterCreativeGrid());
    }

    // Furnace
    this.furnaceScreen = document.getElementById('furnace-screen');
    this.furnaceInputEl = document.getElementById('furnace-input');
    this.furnaceFuelEl = document.getElementById('furnace-fuel');
    this.furnaceOutputEl = document.getElementById('furnace-output');
    this.furnaceProgressFill = document.getElementById('furnace-progress-fill');
    this.furnaceArrowFill = document.getElementById('furnace-arrow-fill');
    this.furnaceFlameFill = document.getElementById('furnace-flame-fill');
    this.furnaceInvGrid = document.getElementById('furnace-inv-grid');
    this.furnaceOpen = false;
    this._prevMenu = 'main';
    this.furnaceSlots = { input: null, fuel: null, output: null };
    this.furnaceBurnTime = 0;
    this.furnaceSmeltTime = 0;
    this.craftingGrid = new CraftingGrid(2);
    this.cursorItem = null;  // {item, count} held by cursor
    this._inventoryRef = null;

    this.buildHotbar();
  }

  // --- hotbar ---------------------------------------------------------------
  buildHotbar() {
    this.hotbarEl.innerHTML = '';
    this.slots = [];
    HOTBAR_BLOCKS.forEach((blockId, i) => {
      const slot = document.createElement('div');
      slot.className = 'slot' + (i === 0 ? ' active' : '');
      const num = document.createElement('div');
      num.className = 'num'; num.textContent = i + 1;
      const icon = makeIcon(blockId, this.atlas);
      slot.appendChild(num);
      slot.appendChild(icon);
      this.hotbarEl.appendChild(slot);
      this.slots.push(slot);
    });
  }

  buildHotbarFromInventory(inventory) {
    this.hotbarEl.innerHTML = '';
    this.slots = [];
    for (let i = 0; i < HOTBAR_SLOTS; i++) {
      const slotEl = document.createElement('div');
      slotEl.className = 'slot' + (i === inventory.selected ? ' active' : '');
      const num = document.createElement('div');
      num.className = 'num'; num.textContent = i + 1;

      const s = inventory.slots[i];
      if (s) {
        const id = s.item;
        const icon = isBlockItem(id)
          ? makeIcon(id, this.atlas)
          : this.makeItemIcon(id);
        if (icon) {
          icon.style.width = '36px'; icon.style.height = '36px';
          icon.style.imageRendering = 'pixelated';
          slotEl.appendChild(icon);
        }
        if (s.count > 1) {
          const cnt = document.createElement('div');
          cnt.className = 'count';
          cnt.textContent = s.count;
          cnt.style.cssText =
            'position:absolute;bottom:1px;right:2px;font:bold 10px monospace;' +
            'color:#fff;text-shadow:1px 1px 0 #000,-1px 1px 0 #000,1px -1px 0 #000,-1px -1px 0 #000;';
          slotEl.appendChild(cnt);
        }
        if (s.durability != null) {
          const def = itemDef(id);
          if (def && def.tool) {
            const pct = s.durability / def.tool.maxDurability;
            const bar = document.createElement('div');
            bar.style.cssText = 'position:absolute;bottom:1px;left:3px;width:40px;height:2px;background:rgba(0,0,0,0.5);border-radius:1px;';
            const fill = document.createElement('div');
            const color = pct > 0.5 ? '#4a4' : pct > 0.2 ? '#ca4' : '#c44';
            fill.style.cssText = `width:${Math.round(pct * 100)}%;height:100%;background:${color};border-radius:1px;`;
            bar.appendChild(fill);
            slotEl.appendChild(bar);
          }
        }
      }
      slotEl.appendChild(num);
      this.hotbarEl.appendChild(slotEl);
      this.slots.push(slotEl);
    }
    this.active = inventory.selected;
  }

  makeItemIcon(itemId) {
    const c = document.createElement('canvas');
    c.width = 16; c.height = 16;
    const x = c.getContext('2d');
    x.imageSmoothingEnabled = false;
    const def = itemDef(itemId);
    if (!def || !def.tool) {
      // Special icons for non-tool items
      if (itemId === 256) {
        // Stick
        x.fillStyle = '#654';
        x.fillRect(7, 1, 2, 14);
        x.fillStyle = '#765';
        x.fillRect(7, 1, 1, 14);
        return c;
      }
      if (itemId === 265 || itemId === 284) {
        // Apple / Cooked Apple
        const isCooked = itemId === 284;
        const r = isCooked ? '#a64' : '#c33';
        const hi = isCooked ? '#c86' : '#e44';
        const hl = isCooked ? '#da8' : '#f66';
        x.fillStyle = r;
        x.fillRect(5, 5, 6, 8);
        x.fillRect(4, 6, 1, 6);
        x.fillRect(11, 6, 1, 6);
        x.fillRect(6, 4, 4, 1);
        x.fillRect(6, 13, 4, 1);
        x.fillStyle = hi;
        x.fillRect(6, 5, 3, 4);
        x.fillStyle = hl;
        x.fillRect(6, 5, 2, 2);
        // stem
        x.fillStyle = '#654';
        x.fillRect(8, 2, 1, 3);
        // leaf
        x.fillStyle = '#4a4';
        x.fillRect(9, 2, 2, 1);
        x.fillRect(10, 3, 1, 1);
        return c;
      }
      if (itemId >= 266 && itemId <= 273) {
        // Food items (meat, etc)
        const foodCols = {
          266: ['#d88', '#b66', '#854'], 267: ['#a64', '#843', '#632'],
          268: ['#d66', '#b44', '#833'], 269: ['#854', '#643', '#532'],
          270: ['#ecc', '#caa', '#999'], 271: ['#ca8', '#a86', '#864'],
          272: ['#d99', '#b77', '#866'], 273: ['#a77', '#855', '#644'],
        };
        const fc = foodCols[itemId] || ['#aaa', '#888', '#666'];
        // meat shape
        x.fillStyle = fc[0];
        x.fillRect(4, 5, 8, 7);
        x.fillRect(5, 4, 6, 1);
        x.fillRect(5, 12, 6, 1);
        x.fillStyle = fc[1];
        x.fillRect(5, 5, 6, 5);
        x.fillStyle = fc[2];
        x.fillRect(5, 9, 6, 2);
        // bone / fat highlight
        if (itemId >= 270) {
          x.fillStyle = '#fff';
          x.fillRect(3, 7, 2, 1);
        }
        return c;
      }
      if (itemId === 264) {
        // Bread
        x.fillStyle = '#da6';
        x.fillRect(3, 7, 10, 5);
        x.fillRect(4, 6, 8, 1);
        x.fillStyle = '#c95';
        x.fillRect(4, 7, 8, 3);
        x.fillStyle = '#eb7';
        x.fillRect(5, 7, 6, 2);
        return c;
      }
      if (itemId === 257 || itemId === 258) {
        // Coal / Charcoal
        x.fillStyle = itemId === 257 ? '#333' : '#432';
        x.fillRect(4, 4, 8, 8);
        x.fillRect(5, 3, 6, 1);
        x.fillRect(5, 12, 6, 1);
        x.fillStyle = itemId === 257 ? '#444' : '#543';
        x.fillRect(5, 5, 4, 4);
        x.fillStyle = '#222';
        x.fillRect(8, 8, 3, 3);
        return c;
      }
      const colors = {
        259:'#ddd', 260:'#fd0',
        261:'#4df', 262:'#da6', 263:'#6b4',
        274:'#964', 275:'#fff', 276:'#eee', 277:'#aaa', 278:'#ccc',
        279:'#666', 280:'#444', 281:'#888', 282:'#eee', 283:'#aaa',
      };
      x.fillStyle = colors[itemId] || '#888';
      x.fillRect(3, 3, 10, 10);
      x.fillStyle = '#fff';
      x.font = 'bold 8px monospace';
      const name = def ? def.name : '?';
      x.fillText(name[0], 5, 11);
      return c;
    }
    const { type, material } = def.tool;
    const matColors = { WOOD: '#a86', STONE: '#888', IRON: '#ddd', DIAMOND: '#4df', GOLD: '#fd0' };
    const matDark =   { WOOD: '#764', STONE: '#666', IRON: '#aaa', DIAMOND: '#29c', GOLD: '#ca0' };
    const handle = '#654';
    const handleHi = '#765';
    const bg = matColors[material] || '#888';
    const dk = matDark[material] || '#666';
    if (type === 'pickaxe') {
      // handle
      x.fillStyle = handle; x.fillRect(7, 6, 2, 9);
      x.fillStyle = handleHi; x.fillRect(7, 6, 1, 9);
      // head
      x.fillStyle = bg;
      x.fillRect(2, 2, 11, 3);
      x.fillStyle = dk;
      x.fillRect(2, 4, 11, 1);
      x.fillRect(1, 2, 1, 3);
      x.fillRect(12, 2, 1, 3);
      // highlight
      x.fillStyle = 'rgba(255,255,255,0.25)';
      x.fillRect(3, 2, 9, 1);
    } else if (type === 'axe') {
      // handle
      x.fillStyle = handle; x.fillRect(7, 5, 2, 10);
      x.fillStyle = handleHi; x.fillRect(7, 5, 1, 10);
      // head
      x.fillStyle = bg;
      x.fillRect(3, 1, 5, 5);
      x.fillRect(3, 1, 2, 7);
      x.fillStyle = dk;
      x.fillRect(3, 5, 5, 1);
      x.fillRect(2, 1, 1, 6);
      // highlight
      x.fillStyle = 'rgba(255,255,255,0.25)';
      x.fillRect(4, 1, 3, 1);
    } else if (type === 'shovel') {
      // handle
      x.fillStyle = handle; x.fillRect(7, 6, 2, 9);
      x.fillStyle = handleHi; x.fillRect(7, 6, 1, 9);
      // head
      x.fillStyle = bg;
      x.fillRect(5, 1, 5, 6);
      x.fillStyle = dk;
      x.fillRect(5, 6, 5, 1);
      x.fillRect(4, 1, 1, 5);
      x.fillRect(10, 1, 1, 5);
      // highlight
      x.fillStyle = 'rgba(255,255,255,0.25)';
      x.fillRect(6, 1, 3, 1);
    } else if (type === 'sword') {
      // handle
      x.fillStyle = handle; x.fillRect(7, 10, 2, 3);
      x.fillStyle = handleHi; x.fillRect(7, 10, 1, 3);
      // guard
      x.fillStyle = bg;
      x.fillRect(5, 9, 5, 2);
      // blade
      x.fillStyle = bg;
      x.fillRect(7, 1, 2, 8);
      x.fillStyle = dk;
      x.fillRect(8, 1, 1, 8);
      // tip
      x.fillStyle = bg;
      x.fillRect(7, 0, 2, 1);
      // highlight
      x.fillStyle = 'rgba(255,255,255,0.25)';
      x.fillRect(7, 1, 1, 7);
    }
    return c;
  }

  setActive(i) {
    this.active = ((i % HOTBAR_SLOTS) + HOTBAR_SLOTS) % HOTBAR_SLOTS;
    this.slots.forEach((s, idx) => s.classList.toggle('active', idx === this.active));
  }

  selectedBlock() {
    return null;
  }

  // --- held item name -------------------------------------------------------
  updateItemName(inventory, creative) {
    let name = '';
    const s = inventory.getSelected();
    if (s) name = itemName(s.item);
    if (name) {
      this.itemNameEl.textContent = name;
      this.itemNameEl.classList.add('visible');
    } else {
      this.itemNameEl.classList.remove('visible');
    }
  }

  // --- status bars ----------------------------------------------------------
  updateStatusBars(player) {
    // Health hearts (left side)
    let hh = '';
    for (let i = 0; i < 10; i++) {
      const val = player.health - i * 2;
      const full = val >= 2, half = val >= 1;
      const img = drawHeart(full, half && !full);
      hh += `<img src="${img.toDataURL()}" style="width:11px;height:11px;image-rendering:pixelated;vertical-align:middle;margin-right:1px;">`;
    }
    this.healthBar.innerHTML =
      `<div style="display:flex;align-items:center;background:rgba(0,0,0,0.35);padding:3px 5px;border-radius:3px;">${hh}</div>`;

    // Hunger drumsticks (right side)
    let fh = '';
    for (let i = 0; i < 10; i++) {
      const val = player.hunger - i * 2;
      const full = val >= 2, half = val >= 1;
      const img = drawDrumstick(full, half && !full);
      fh += `<img src="${img.toDataURL()}" style="width:11px;height:11px;image-rendering:pixelated;vertical-align:middle;margin-left:1px;">`;
    }
    this.hungerBar.innerHTML =
      `<div style="display:flex;align-items:center;background:rgba(0,0,0,0.35);padding:3px 5px;border-radius:3px;">${fh}</div>`;

    // Armor bar (above health) — show only if player has armor equipped
    this.armorBarEl.innerHTML = '';
  }

  // --- overlay --------------------------------------------------------------
  showOverlay() { this.overlayEl.classList.remove('hidden'); this._setGameUI(false); }
  hideOverlay() { this.overlayEl.classList.add('hidden'); this._setGameUI(true); }
  isOverlayShown() { return !this.overlayEl.classList.contains('hidden'); }

  _setGameUI(visible) {
    const v = visible ? '' : 'none';
    if (this.hotbarEl) this.hotbarEl.style.display = v;
    if (this.hudEl) this.hudEl.style.display = v;
    const xb = document.getElementById('crosshair'); if (xb) xb.style.display = v;
    const xd = document.getElementById('crosshair-dot'); if (xd) xd.style.display = v;
    const sb = document.getElementById('status-bars'); if (sb) sb.style.display = v;
    const xp = document.getElementById('xp-bar'); if (xp) xp.style.display = v;
    const ab = document.getElementById('armor-bar'); if (ab) ab.style.display = v;
  }

  showMenu(name) {
    this.overlayEl.classList.remove('hidden');
    this._setGameUI(false);
    this.overlayEl.querySelectorAll('.menu-screen').forEach(s => s.classList.remove('active'));
    const screen = document.getElementById('menu-' + name);
    if (screen) screen.classList.add('active');
  }

  // --- loading screen -------------------------------------------------------
  showLoading() {
    const el = document.getElementById('loading-screen');
    if (el) el.classList.add('active');
    this._loadingEl = el;
  }
  hideLoading() {
    const el = this._loadingEl || document.getElementById('loading-screen');
    if (el) {
      el.style.transition = 'opacity 0.6s';
      el.style.opacity = '0';
      setTimeout(() => { el.classList.remove('active'); el.style.opacity = ''; el.style.transition = ''; }, 600);
    }
  }
  updateLoading(pct, step) {
    const fill = document.getElementById('loading-bar-fill');
    const pctEl = document.getElementById('loading-bar-pct');
    const stepEl = document.getElementById('loading-step');
    if (fill) fill.style.width = Math.round(pct) + '%';
    if (pctEl) pctEl.textContent = Math.round(pct) + '%';
    if (stepEl) stepEl.textContent = step || '';
  }

  // --- HUD ------------------------------------------------------------------
  updateHud({ fps, pos, biome, loadedChunks, facing, gamemode }) {
    const mode = gamemode || (this.creative ? 'Creative' : 'Survival');
    this.hudEl.innerHTML =
      `<div><span class="fps">${fps} FPS</span> <span class="mode">[${mode}]</span></div>` +
      `<div class="coord">XYZ: ${pos.x.toFixed(1)} / ${pos.y.toFixed(1)} / ${pos.z.toFixed(1)}</div>` +
      `<div><span class="biome">${biome}</span> &middot; ${facing} &middot; ${loadedChunks} chunks</div>`;
  }

  // --- water overlay --------------------------------------------------------
  setUnderwater(underwater) {
    this.waterOverlay.classList.toggle('active', underwater);
  }

  // --- XP bar (cosmetic) ----------------------------------------------------
  updateXpBar(progress, level) {
    if (this.xpFill) {
      this.xpFill.style.width = `${Math.round(Math.min(1, progress) * 100)}%`;
    }
  }

  // --- inventory screen -----------------------------------------------------
  openInventory(inventory, gridSize = 2, creative = false) {
    this.inventoryOpen = true;
    this._inventoryRef = inventory;
    this.craftingGrid = new CraftingGrid(gridSize);
    this.cursorItem = null;
    this.cursorItemEl.style.display = 'none';
    this.inventoryScreen.classList.add('open');
    if (this.craftingLabel) {
      this.craftingLabel.textContent = gridSize > 2 ? 'CRAFTING (3x3)' : 'CRAFTING';
    }
    if (this.creativeBrowser) {
      this.creativeBrowser.style.display = creative ? '' : 'none';
    }
    if (creative) this._populateCreativeGrid();
    this.renderInventoryGrid(inventory);
    this.renderCraftingGrid();
  }

  closeInventory() {
    if (this._inventoryRef && this.craftingGrid) {
      this.craftingGrid.returnAll(this._inventoryRef);
    }
    if (this.cursorItem) {
      if (this._inventoryRef) this._inventoryRef.add(this.cursorItem.item, this.cursorItem.count);
      this.cursorItem = null;
    }
    this.cursorItemEl.style.display = 'none';
    this.inventoryOpen = false;
    this.inventoryScreen.classList.remove('open');
    this._inventoryRef = null;
  }

  renderInventoryGrid(inventory) {
    this.inventoryGrid.innerHTML = '';
    for (let i = 0; i < 36; i++) {
      const slotEl = document.createElement('div');
      slotEl.className = 'inv-slot';
      if (i === 9) {
        const sep = document.createElement('div');
        sep.className = 'inv-separator';
        this.inventoryGrid.appendChild(sep);
      }
      if (i < 9) {
        const numEl = document.createElement('div');
        numEl.className = 'inv-num';
        numEl.textContent = i + 1;
        slotEl.appendChild(numEl);
      }
      const s = inventory.slots[i];
      if (s) {
        const id = s.item;
        const icon = isBlockItem(id)
          ? makeIcon(id, this.atlas)
          : this.makeItemIcon(id);
        if (icon) {
          icon.style.width = '32px'; icon.style.height = '32px';
          icon.style.imageRendering = 'pixelated';
          slotEl.appendChild(icon);
        }
        if (s.count > 1) {
          const cnt = document.createElement('div');
          cnt.className = 'inv-count';
          cnt.textContent = s.count;
          slotEl.appendChild(cnt);
        }
      }
      slotEl.addEventListener('click', () => this._onInvSlotClick(i));
      this.inventoryGrid.appendChild(slotEl);
    }
  }

  renderCraftingGrid() {
    const size = this.craftingGrid.size;
    this.craftingInput.innerHTML = '';
    this.craftingInput.style.gridTemplateColumns = `repeat(${size}, 42px)`;
    for (let i = 0; i < size * size; i++) {
      const slotEl = document.createElement('div');
      slotEl.className = 'inv-slot craft-slot';
      const s = this.craftingGrid.grid[i];
      if (s) {
        const id = s.item;
        const icon = isBlockItem(id)
          ? makeIcon(id, this.atlas)
          : this.makeItemIcon(id);
        if (icon) {
          icon.style.width = '32px'; icon.style.height = '32px';
          icon.style.imageRendering = 'pixelated';
          slotEl.appendChild(icon);
        }
        if (s.count > 1) {
          const cnt = document.createElement('div');
          cnt.className = 'inv-count';
          cnt.textContent = s.count;
          slotEl.appendChild(cnt);
        }
      }
      slotEl.addEventListener('click', () => this._onCraftSlotClick(i));
      this.craftingInput.appendChild(slotEl);
    }
    // output
    this.craftingOutput.innerHTML = '';
    const out = this.craftingGrid.output;
    if (out) {
      const icon = isBlockItem(out.id)
        ? makeIcon(out.id, this.atlas)
        : this.makeItemIcon(out.id);
      if (icon) {
        icon.style.width = '32px'; icon.style.height = '32px';
        icon.style.imageRendering = 'pixelated';
        this.craftingOutput.appendChild(icon);
      }
      if (out.count > 1) {
        const cnt = document.createElement('div');
        cnt.className = 'inv-count';
        cnt.textContent = out.count;
        this.craftingOutput.appendChild(cnt);
      }
    }
    this.craftingOutput.onclick = () => this._onCraftOutputClick();
  }

  _onInvSlotClick(i) {
    const inv = this._inventoryRef;
    if (!inv) return;
    if (this.cursorItem) {
      const cur = inv.slots[i];
      if (!cur) {
        // empty slot: place cursor here
        inv.slots[i] = { item: this.cursorItem.item, count: this.cursorItem.count, ...(this.cursorItem.durability != null ? { durability: this.cursorItem.durability } : {}) };
        this.cursorItem = null;
      } else if (cur.item === this.cursorItem.item) {
        // same item: merge
        const cap = maxStack(cur.item);
        const add = Math.min(cap - cur.count, this.cursorItem.count);
        cur.count += add;
        this.cursorItem.count -= add;
        if (this.cursorItem.count <= 0) this.cursorItem = null;
      } else {
        // different item: swap
        inv.slots[i] = { item: this.cursorItem.item, count: this.cursorItem.count, ...(this.cursorItem.durability != null ? { durability: this.cursorItem.durability } : {}) };
        this.cursorItem = { item: cur.item, count: cur.count, durability: cur.durability };
      }
    } else {
      const s = inv.slots[i];
      if (s) {
        this.cursorItem = { item: s.item, count: s.count, durability: s.durability };
        inv.slots[i] = null;
      }
    }
    this.renderInventoryGrid(inv);
    this._updateCursorVisual();
  }

  _onCraftSlotClick(i) {
    const grid = this.craftingGrid;
    if (this.cursorItem) {
      const cur = grid.grid[i];
      if (cur && cur.item === this.cursorItem.item) {
        // same item: add 1 to the slot
        const cap = maxStack(cur.item);
        if (cur.count < cap) {
          cur.count++;
          this.cursorItem.count--;
          if (this.cursorItem.count <= 0) this.cursorItem = null;
        }
      } else if (!cur) {
        // empty slot: place 1
        grid.grid[i] = { item: this.cursorItem.item, count: 1 };
        this.cursorItem.count--;
        if (this.cursorItem.count <= 0) this.cursorItem = null;
      } else {
        // different item: swap entire stacks
        const tmp = grid.grid[i];
        grid.grid[i] = { item: this.cursorItem.item, count: this.cursorItem.count };
        this.cursorItem = { item: tmp.item, count: tmp.count };
      }
    } else {
      const s = grid.takeCell(i);
      if (s) this.cursorItem = { item: s.item, count: s.count };
    }
    grid.refreshOutput();
    this.renderCraftingGrid();
    this._updateCursorVisual();
  }

  _onCraftOutputClick() {
    const grid = this.craftingGrid;
    const out = grid.output;
    if (!out) return;
    if (this.cursorItem && (this.cursorItem.item !== out.id || this.cursorItem.count + out.count > maxStack(out.id))) return;
    if (!this.cursorItem) {
      this.cursorItem = { item: out.id, count: out.count };
    } else {
      this.cursorItem.count += out.count;
    }
    grid.consumeIngredients();
    grid.refreshOutput();
    this.renderCraftingGrid();
    this.renderInventoryGrid(this._inventoryRef);
    this._updateCursorVisual();
  }

  _updateCursorVisual() {
    if (!this.cursorItem) {
      this.cursorItemEl.style.display = 'none';
      return;
    }
    this.cursorItemEl.style.display = 'block';
    this.cursorItemEl.innerHTML = '';
    const id = this.cursorItem.item;
    const icon = isBlockItem(id)
      ? makeIcon(id, this.atlas)
      : this.makeItemIcon(id);
    if (icon) {
      icon.style.width = '32px'; icon.style.height = '32px';
      icon.style.imageRendering = 'pixelated';
      this.cursorItemEl.appendChild(icon);
    }
    if (this.cursorItem.count > 1) {
      const cnt = document.createElement('div');
      cnt.className = 'cur-count';
      cnt.textContent = this.cursorItem.count;
      this.cursorItemEl.appendChild(cnt);
    }
  }

  // --- furnace screen -------------------------------------------------------
  openFurnace(inventory) {
    this.furnaceOpen = true;
    this._inventoryRef = inventory;
    this.cursorItem = null;
    this.cursorItemEl.style.display = 'none';
    this.furnaceScreen.classList.add('open');
    this.renderFurnaceSlots();
    this._renderFurnaceInventory(inventory);
  }

  closeFurnace() {
    // Return furnace items to inventory
    const inv = this._inventoryRef;
    if (inv) {
      if (this.furnaceSlots.input) { inv.add(this.furnaceSlots.input.item, this.furnaceSlots.input.count); this.furnaceSlots.input = null; }
      if (this.furnaceSlots.fuel) { inv.add(this.furnaceSlots.fuel.item, this.furnaceSlots.fuel.count); this.furnaceSlots.fuel = null; }
      if (this.furnaceSlots.output) { inv.add(this.furnaceSlots.output.item, this.furnaceSlots.output.count); this.furnaceSlots.output = null; }
    }
    if (this.cursorItem) {
      if (inv) inv.add(this.cursorItem.item, this.cursorItem.count);
      this.cursorItem = null;
    }
    this.cursorItemEl.style.display = 'none';
    this.furnaceOpen = false;
    this.furnaceScreen.classList.remove('open');
    this._inventoryRef = null;
  }

  renderFurnaceSlots() {
    const render = (el, slot) => {
      el.innerHTML = '';
      if (slot) {
        const icon = isBlockItem(slot.item) ? makeIcon(slot.item, this.atlas) : this.makeItemIcon(slot.item);
        if (icon) { icon.style.width = '32px'; icon.style.height = '32px'; icon.style.imageRendering = 'pixelated'; el.appendChild(icon); }
        if (slot.count > 1) { const cnt = document.createElement('div'); cnt.className = 'inv-count'; cnt.textContent = slot.count; el.appendChild(cnt); }
      }
    };
    render(this.furnaceInputEl, this.furnaceSlots.input);
    render(this.furnaceFuelEl, this.furnaceSlots.fuel);
    render(this.furnaceOutputEl, this.furnaceSlots.output);
    this.furnaceInputEl.onclick = () => this._onFurnaceSlotClick('input');
    this.furnaceFuelEl.onclick = () => this._onFurnaceSlotClick('fuel');
    this.furnaceOutputEl.onclick = () => this._onFurnaceSlotClick('output');
  }

  _renderFurnaceInventory(inventory) {
    this.furnaceInvGrid.innerHTML = '';
    for (let i = 0; i < 36; i++) {
      const slotEl = document.createElement('div');
      slotEl.className = 'inv-slot';
      if (i === 9) {
        const sep = document.createElement('div');
        sep.className = 'inv-separator';
        this.furnaceInvGrid.appendChild(sep);
      }
      if (i < 9) {
        const numEl = document.createElement('div');
        numEl.className = 'inv-num';
        numEl.textContent = i + 1;
        slotEl.appendChild(numEl);
      }
      const s = inventory.slots[i];
      if (s) {
        const icon = isBlockItem(s.item)
          ? makeIcon(s.item, this.atlas)
          : this.makeItemIcon(s.item);
        if (icon) {
          icon.style.width = '32px'; icon.style.height = '32px';
          icon.style.imageRendering = 'pixelated';
          slotEl.appendChild(icon);
        }
        if (s.count > 1) {
          const cnt = document.createElement('div');
          cnt.className = 'inv-count';
          cnt.textContent = s.count;
          slotEl.appendChild(cnt);
        }
      }
      slotEl.addEventListener('click', () => this._onFurnaceInvSlotClick(i));
      this.furnaceInvGrid.appendChild(slotEl);
    }
  }

  _onFurnaceInvSlotClick(i) {
    const inv = this._inventoryRef;
    if (!inv) return;
    const slot = inv.slots[i];
    if (this.cursorItem) {
      if (!slot) {
        inv.slots[i] = { item: this.cursorItem.item, count: this.cursorItem.count };
        this.cursorItem = null;
      } else if (slot.item === this.cursorItem.item) {
        const cap = maxStack(slot.item);
        const add = Math.min(cap - slot.count, this.cursorItem.count);
        slot.count += add;
        this.cursorItem.count -= add;
        if (this.cursorItem.count <= 0) this.cursorItem = null;
      } else {
        inv.slots[i] = { item: this.cursorItem.item, count: this.cursorItem.count };
        this.cursorItem = { item: slot.item, count: slot.count };
      }
    } else if (slot) {
      this.cursorItem = { item: slot.item, count: slot.count };
      inv.slots[i] = null;
    }
    this._renderFurnaceInventory(inv);
    this._updateCursorVisual();
  }

  _onFurnaceSlotClick(which) {
    const slot = this.furnaceSlots[which];
    if (this.cursorItem) {
      if (!slot) {
        this.furnaceSlots[which] = { item: this.cursorItem.item, count: this.cursorItem.count };
        this.cursorItem = null;
      } else if (slot.item === this.cursorItem.item) {
        const cap = maxStack(slot.item);
        const add = Math.min(cap - slot.count, this.cursorItem.count);
        slot.count += add;
        this.cursorItem.count -= add;
        if (this.cursorItem.count <= 0) this.cursorItem = null;
      } else {
        this.furnaceSlots[which] = { item: this.cursorItem.item, count: this.cursorItem.count };
        this.cursorItem = { item: slot.item, count: slot.count };
      }
    } else if (slot) {
      this.cursorItem = { item: slot.item, count: slot.count };
      this.furnaceSlots[which] = null;
    }
    this.renderFurnaceSlots();
    if (this._inventoryRef) this._renderFurnaceInventory(this._inventoryRef);
    this._updateCursorVisual();
  }

  tickFurnace(dt, smelting, fuelValue) {
    if (!this.furnaceOpen) return;
    const fs = this.furnaceSlots;
    // burn fuel
    if (this.furnaceBurnTime > 0) {
      this.furnaceBurnTime -= dt;
    } else if (fs.fuel && fs.input) {
      const fv = fuelValue(fs.fuel.item);
      if (fv > 0) {
        this.furnaceBurnTime = fv * 0.05; // each fuel tick = 0.05s
        fs.fuel.count--;
        if (fs.fuel.count <= 0) fs.fuel = null;
      }
    }
    // smelt
    if (this.furnaceBurnTime > 0 && fs.input) {
      const out = smelting(fs.input.item);
      if (out != null) {
        const outCount = fs.output && fs.output.item === out ? fs.output.count : 0;
        if (outCount < 64) {
          this.furnaceSmeltTime += dt;
          if (this.furnaceSmeltTime >= 3) {
            this.furnaceSmeltTime = 0;
            fs.input.count--;
            if (fs.input.count <= 0) fs.input = null;
            if (fs.output && fs.output.item === out) {
              fs.output.count++;
            } else {
              fs.output = { item: out, count: 1 };
            }
            this.renderFurnaceSlots();
          }
        }
      }
    } else {
      this.furnaceSmeltTime = 0;
    }
    if (this.furnaceProgressFill) {
      const pct = this.furnaceBurnTime > 0 ? Math.round((this.furnaceSmeltTime / 3) * 100) : 0;
      this.furnaceProgressFill.style.width = pct + '%';
    }
    // arrow fill
    if (this.furnaceArrowFill) {
      const apct = this.furnaceBurnTime > 0 ? Math.round((this.furnaceSmeltTime / 3) * 100) : 0;
      const ax = apct / 100 * 40;
      this.furnaceArrowFill.setAttribute('points', `0,6 ${ax},6 ${ax},0 40,12 ${ax},24 ${ax},18 0,18`);
      this.furnaceArrowFill.setAttribute('fill', apct > 0 ? '#f80' : '#555');
    }
    // flame fill
    if (this.furnaceFlameFill) {
      this.furnaceFlameFill.style.display = this.furnaceBurnTime > 0 ? '' : 'none';
    }
  }

  // --- creative block browser ------------------------------------------------
  _buildCreativeItemList() {
    // Blocks
    for (const [idStr, def] of Object.entries(BLOCKS)) {
      const id = Number(idStr);
      if (id === 0 || id === 8) continue; // skip air and water
      if (def.name) this._creativeItems.push({ id, name: def.name, type: 'block' });
    }
    // Non-block items
    for (const [key, val] of Object.entries(ITEM)) {
      if (typeof val !== 'number') continue;
      if (val < 256) continue; // block items already added
      const def = itemDef(val);
      if (def && def.name) {
        this._creativeItems.push({ id: val, name: def.name, type: 'item' });
      }
    }
    // Tools
    for (const [key, val] of Object.entries(ITEM)) {
      if (typeof val !== 'number') continue;
      if (val < 512) continue;
      const def = itemDef(val);
      if (def && def.name) {
        this._creativeItems.push({ id: val, name: def.name, type: 'tool' });
      }
    }
    this._creativeItems.sort((a, b) => a.name.localeCompare(b.name));
  }

  _populateCreativeGrid(filter = '') {
    if (!this.creativeGrid) return;
    this.creativeGrid.innerHTML = '';
    const lf = filter.toLowerCase();
    const items = lf
      ? this._creativeItems.filter(c => c.name.toLowerCase().includes(lf))
      : this._creativeItems;
    for (const ci of items) {
      const slotEl = document.createElement('div');
      slotEl.className = 'inv-slot';
      const icon = isBlockItem(ci.id)
        ? makeIcon(ci.id, this.atlas)
        : this.makeItemIcon(ci.id);
      if (icon) {
        icon.style.width = '28px'; icon.style.height = '28px';
        icon.style.imageRendering = 'pixelated';
        slotEl.appendChild(icon);
      }
      const nameEl = document.createElement('div');
      nameEl.className = 'cri-name';
      nameEl.textContent = ci.name;
      slotEl.appendChild(nameEl);
      slotEl.addEventListener('click', () => {
        const inv = this._inventoryRef;
        if (inv) inv.add(ci.id, ci.type === 'block' ? 64 : 1);
      });
      this.creativeGrid.appendChild(slotEl);
    }
  }

  _filterCreativeGrid() {
    this._populateCreativeGrid(this.creativeSearch ? this.creativeSearch.value : '');
  }
}
