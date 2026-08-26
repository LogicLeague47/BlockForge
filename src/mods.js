// ─── Mod manager ────────────────────────────────────────────────────────
// BlockForge "mods & addons" are plain ES-module files (.bfmod) that export a
// `manifest` and optional `onLoad` / `onTick` / `onUnload` hooks. They are
// downloaded from the BlockForge mods page, imported in-game through the
// "Mods & Addons" menu, persisted to localStorage and re-loaded on boot.
// Mods talk to the game through an API and draw their own HUD via
// api.hud.*. Broken mods are sandboxed (try/catch) and auto-disabled.
// Mods that register gameplay features (blocks, items, mobs) are blocked
// from joining multiplayer to keep servers fair.

import * as THREE from 'three';
import { BLOCK, BLOCKS } from './blocks.js';

const MODS_KEY = 'bf_mods';
export const MODS_URL = 'mods.html';

let _mods = [];   // { id,name,version,description,author,icon,code,enabled,module,api,errors }
let _refs = null; // live game refs injected every frame by main.js

// ── Mod-registered gameplay content ──────────────────────────────────────
const _modBlocks = new Map();   // blockId -> def (custom blocks from mods)
const _modItems = new Map();    // itemId -> def (custom items from mods)
const _modMobs = new Map();     // mobId -> def (custom mobs from mods)
const _modButtons = [];         // { id, label, onClick } (mod-added UI buttons)
let _hasGameplayMods = false;

export function hasGameplayMods() { return _hasGameplayMods; }
export function getModBlocks() { return _modBlocks; }
export function getModItems() { return _modItems; }
export function getModMobs() { return _modMobs; }
export function getModButtons() { return _modButtons; }

// Each mod is stored under its own key so one oversized mod can't blow the
// localStorage quota for the whole collection (which silently dropped mods on
// refresh before).
function modKey(id) { return 'bf_mod:' + id; }

function loadStore() {
  // Migrate the legacy single-blob format to per-mod keys.
  try {
    const old = localStorage.getItem(MODS_KEY);
    if (old) {
      const arr = JSON.parse(old) || [];
      for (const m of arr) {
        if (m && m.id) { try { localStorage.setItem(modKey(m.id), JSON.stringify(m)); } catch (_) {} }
      }
      try { localStorage.removeItem(MODS_KEY); } catch (_) {}
    }
  } catch (_) {}
  const out = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.indexOf('bf_mod:') === 0) {
        try {
          const m = JSON.parse(localStorage.getItem(k));
          if (m && m.id) out.push(m);
        } catch (_) {}
      }
    }
  } catch (_) {}
  return out;
}
function saveStore() {
  const data = _mods.map(({ module, api, errors, ...m }) => m);
  // Save each mod independently — a single failure can't wipe the others.
  for (const m of data) {
    try { localStorage.setItem(modKey(m.id), JSON.stringify(m)); }
    catch (_) { console.warn('[Mods] localStorage write failed for ' + m.id); }
  }
  // Prune keys for mods that were removed.
  try {
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const k = localStorage.key(i);
      if (k && k.indexOf('bf_mod:') === 0 && !data.some(m => modKey(m.id) === k)) {
        try { localStorage.removeItem(k); } catch (_) {}
      }
    }
  } catch (_) {}
}
function refs() { return _refs; }

// Permanently-available block atlas texture (set once at boot by main.js).
let _atlasTexture = null;
export function setAtlasTexture(t) { _atlasTexture = t; }

// ---- API handed to every mod --------------------------------------------
function makeApi(modId) {
  const elId = (id) => 'bf-hud-' + modId + '-' + id;
  return {
    modId,
    three: THREE, // live three.js namespace for advanced mods (shaders etc.)
    refs: () => refs(), // live per-frame game refs { sun, renderer, scene, manager, atlasTexture, ... }
    getAtlasTexture: () => _atlasTexture || (refs() && refs().atlasTexture) || null,
    inGame: () => { const r = refs(); return !!(r && r.gameRunning && r.player && r.world); },
    getPlayer: () => {
      const p = refs()?.player;
      if (!p || !p.position) return null;
      return {
        x: p.position.x, y: p.position.y, z: p.position.z,
        yaw: p.yaw || 0, pitch: p.pitch || 0,
        hp: p.health, maxHp: p.maxHealth,
        hunger: p.hunger, maxHunger: p.maxHunger, saturation: p.saturation,
        gamemode: p.gamemode, flying: !!p.flying, onGround: !!p.onGround,
      };
    },
    getWorld: () => {
      const w = refs()?.world;
      if (!w) return null;
      return {
        getBlock: (x, y, z) => w.getBlock(x, y, z),
        setBlock: (x, y, z, id) => { if (w) w.setBlock(x, y, z, id); },
        surfaceHeight: (x, z) => (typeof w.heightAt === 'function' ? w.heightAt(x, z) : 0),
      };
    },
    getTime: () => { const d = refs()?.dayTime ?? 0; return { dayTime: d, night: d > 0.625 }; },
    // ── Gameplay registration (marks mod as gameplay — blocks multiplayer) ──
    registerBlock(blockId, def) {
      if (typeof blockId !== 'number' || blockId < 2000) {
        console.warn('[Mod:' + modId + '] registerBlock requires id >= 2000');
        return;
      }
      _modBlocks.set(blockId, { ...def, modId });
      _hasGameplayMods = true;
    },
    registerItem(itemId, def) {
      if (typeof itemId !== 'number' || itemId < 2000) {
        console.warn('[Mod:' + modId + '] registerItem requires id >= 2000');
        return;
      }
      _modItems.set(itemId, { ...def, modId });
      _hasGameplayMods = true;
    },
    registerMob(mobId, def) {
      if (typeof mobId !== 'string' || !mobId) {
        console.warn('[Mod:' + modId + '] registerMob requires a string mobId');
        return;
      }
      _modMobs.set(mobId, { ...def, modId });
      _hasGameplayMods = true;
    },
    addButton(id, label, onClick) {
      if (!id || !label || typeof onClick !== 'function') return;
      _modButtons.push({ id: modId + '-' + id, label, onClick, modId });
    },
    removeButton(id) {
      const fullId = modId + '-' + id;
      const idx = _modButtons.findIndex(b => b.id === fullId);
      if (idx >= 0) _modButtons.splice(idx, 1);
    },
    spawnMob(mobId, x, y, z) {
      const r = refs();
      if (!r || !r.mobManager) return null;
      return r.mobManager.spawnAt(mobId, x, y, z);
    },
    chat(msg) {
      if (typeof msg === 'string' && refs()) {
        // Dispatch a custom event that main.js can pick up
        window.dispatchEvent(new CustomEvent('bf-mod-chat', { detail: { modId, msg } }));
      }
    },
    hud: {
      upsert(id, html, style) {
        let el = document.getElementById(elId(id));
        if (!el) {
          el = document.createElement('div');
          el.id = elId(id);
          el.dataset.bfmod = modId;
          el.style.cssText = 'position:fixed;z-index:120;pointer-events:none;font-family:monospace;';
          document.body.appendChild(el);
        }
        if (style) Object.assign(el.style, style);
        if (html != null) el.innerHTML = html;
        return el;
      },
      style(id, style) {
        const el = document.getElementById(elId(id));
        if (el && style) Object.assign(el.style, style);
        return el;
      },
      remove(id) {
        const el = document.getElementById(elId(id));
        if (el) el.remove();
      },
    },
  };
}

function modError(m, err) {
  m.errors = (m.errors || 0) + 1;
  console.warn('[Mod:' + m.id + ']', err);
  if (m.errors > 30) {
    console.warn('[Mods] Disabling "' + m.id + '" after repeated errors.');
    m.enabled = false;
    unloadModule(m);
    saveStore();
    renderModsList();
  }
}

function unloadModule(m) {
  try { if (m.module && typeof m.module.onUnload === 'function') m.module.onUnload(m.api); } catch (_) { console.warn('[Mod:' + m.id + '] onUnload threw'); }
  const owned = Array.from(document.querySelectorAll('[data-bfmod]')).filter(el => el.dataset.bfmod === m.id);
  owned.forEach((el) => el.remove());
  m.module = null;
  m.api = null;
}

async function reloadModule(m) {
  try {
    const url = URL.createObjectURL(new Blob([m.code], { type: 'text/javascript' }));
    const mod = await import(/* @vite-ignore */ url);
    m.module = mod;
    m.api = makeApi(m.id);
    m.errors = 0;
    if (typeof mod.onLoad === 'function') {
      try { mod.onLoad(m.api); } catch (e) { modError(m, e); }
    }
  } catch (e) {
    console.warn('[Mods] Failed to load', m.id, e);
    m.enabled = false;
    saveStore();
  }
  renderModsList();
}

// Called every frame by main.js with the current live game references.
export function modsTick(dt, refsIn) {
  _refs = refsIn;
  for (const m of _mods) {
    if (!m.enabled || !m.module || typeof m.module.onTick !== 'function') continue;
    try { m.module.onTick(dt, m.api); } catch (e) { modError(m, e); }
  }
}

// ---- Import ---------------------------------------------------------------
export function importModFile(file, done) {
  const reader = new FileReader();
  reader.onerror = () => done && done(false, 'Could not read the file.');
  reader.onload = () => {
    try { importModCode(String(reader.result), done); }
    catch (e) { done && done(false, e.message || String(e)); }
  };
  reader.readAsText(file);
}

export async function importModCode(code, done) {
  try {
    const url = URL.createObjectURL(new Blob([code], { type: 'text/javascript' }));
    const mod = await import(/* @vite-ignore */ url);
    const m = mod.manifest || {};
    if (!m.id) throw new Error('This file has no manifest.id — is it a BlockForge mod?');
    unloadById(m.id); // replace any existing mod with the same id
    const entry = {
      id: String(m.id),
      name: m.name || String(m.id),
      version: m.version || '1.0',
      description: m.description || '',
      author: m.author || 'Unknown',
      icon: m.icon || '📦',
      code,
      enabled: true,
      module: mod,
      api: makeApi(String(m.id)),
      errors: 0,
    };
    _mods.push(entry);
    saveStore();
    if (typeof mod.onLoad === 'function') {
      try { mod.onLoad(entry.api); } catch (e) { modError(entry, e); }
    }
    done && done(true, entry);
  } catch (e) {
    done && done(false, e.message || String(e));
  }
  renderModsList();
}

function unloadById(id) {
  const i = _mods.findIndex((m) => m.id === id);
  if (i >= 0) { unloadModule(_mods[i]); _mods.splice(i, 1); }
}

// ---- Manager actions ------------------------------------------------------
export function setModEnabled(id, enabled) {
  const m = _mods.find((x) => x.id === id);
  if (!m) return;
  if (enabled) {
    m.enabled = true;
    reloadModule(m);
  } else {
    m.enabled = false;
    unloadModule(m);
    saveStore();
    renderModsList();
  }
}

export function removeMod(id) {
  unloadById(id);
  saveStore();
  renderModsList();
}

// ---- Menu ---------------------------------------------------------------
function status(msg, color) {
  const el = document.getElementById('mods-status');
  if (el) { el.textContent = msg || ''; el.style.color = color || '#aaa'; }
}

export function renderModsList() {
  const list = document.getElementById('mods-list');
  if (!list) return;
  if (!_mods.length) {
    list.innerHTML = '<div style="text-align:center;padding:22px 12px;color:#888;font:13px monospace;line-height:1.7;">No mods installed yet.<br>Download <b>.bfmod</b> files from the BlockForge website,<br>then tap "Import Mod" (or drag the file here).</div>';
    return;
  }
  list.innerHTML = _mods.map((m) => {
    const on = m.enabled;
    const official = m.author === 'BlockForge Dev';
    const tag = official
      ? '<span style="font:bold 9px monospace;color:#ffd;background:linear-gradient(135deg,#a8f,#7f7ff5);border:1px solid rgba(200,180,255,.4);padding:1px 6px;border-radius:5px;margin-left:6px;">OFFICIAL</span>'
      : '<span style="font:bold 9px monospace;color:#7f7;background:rgba(80,200,120,.14);border:1px solid rgba(80,200,120,.35);padding:1px 6px;border-radius:5px;margin-left:6px;">3RD-PARTY</span>';
    return '<div style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.15);border-radius:10px;padding:10px 12px;margin-bottom:8px;">' +
      '<div style="display:flex;align-items:center;gap:10px;">' +
        '<div style="font-size:26px;width:36px;text-align:center;">' + (m.icon || '📦') + '</div>' +
        '<div style="flex:1;min-width:0;">' +
          '<div style="font:bold 14px monospace;color:#e8e8ff;">' + esc(m.name) + ' <span style="color:#888;font-size:11px;">v' + esc(m.version) + '</span>' + tag + '</div>' +
          '<div style="font:11px monospace;color:#999;margin-top:2px;">' + esc(m.description || '') + '</div>' +
          '<div style="font:10px monospace;color:#777;margin-top:3px;">by ' + esc(m.author) + '</div>' +
        '</div>' +
        '<div style="display:flex;flex-direction:column;gap:6px;">' +
          '<button data-mod-toggle="' + esc(m.id) + '" style="font:bold 11px monospace;padding:5px 12px;border-radius:6px;border:none;cursor:pointer;background:' + (on ? '#5f5' : '#555') + ';color:' + (on ? '#111' : '#fff') + ';">' + (on ? 'ON' : 'OFF') + '</button>' +
          '<button data-mod-remove="' + esc(m.id) + '" style="font:11px monospace;padding:5px 12px;border-radius:6px;border:none;cursor:pointer;background:rgba(200,60,60,0.8);color:#fff;">Remove</button>' +
        '</div>' +
      '</div>' +
      (on ? '' : '<div style="font:10px monospace;color:#fa0;margin-top:6px;">Disabled</div>') +
    '</div>';
  }).join('');
}

function esc(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function openModsMenu(ui) {
  if (ui && typeof ui.showMenu === 'function') ui.showMenu('mods');
  status('');
  renderModsList();
}

export function bindModsMenu(ui) {
  document.getElementById('btn-mods')?.addEventListener('click', () => {
    if (/crazygames/i.test(location.hostname)) {
      const overlay = document.createElement('div');
      overlay.style.cssText = 'position:fixed;inset:0;z-index:999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.7);';
      overlay.innerHTML = '<div style="max-width:340px;width:90%;background:rgba(20,22,32,0.97);border:2px solid rgba(100,150,200,0.25);border-radius:10px;padding:32px 28px;text-align:center;font-family:monospace;color:#ddd;box-shadow:0 0 40px rgba(0,0,0,0.5);"><div style="font-size:18px;font-weight:bold;margin-bottom:12px;color:#f88;">&#128274; Mods Unavailable</div><div style="font-size:13px;line-height:1.6;color:#bbb;">Mods are not available on CrazyGames.<br><span style="font-size:11px;color:#888;">Visit blockforge-1.onrender.com to use and play mods!</span></div><button style="margin-top:18px;padding:10px 28px;font:bold 13px monospace;background:rgba(60,80,120,0.5);color:#e0e8ff;border:1px solid rgba(100,140,255,0.25);border-radius:6px;cursor:pointer;">OK</button></div>';
      overlay.querySelector('button').onclick = () => overlay.remove();
      overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
      document.body.appendChild(overlay);
      return;
    }
    openModsMenu(ui);
  });
  document.getElementById('btn-mods-back')?.addEventListener('click', () => ui && ui.showMenu('main'));
  document.getElementById('btn-mod-import')?.addEventListener('click', () => {
    const input = document.getElementById('mod-file-input');
    if (input) input.click();
  });
  document.getElementById('btn-mod-browse')?.addEventListener('click', () => {
    window.open(MODS_URL, '_blank', 'noopener');
  });
  const input = document.getElementById('mod-file-input');
  if (input) input.addEventListener('change', () => {
    const f = input.files && input.files[0];
    if (!f) return;
    status('Importing ' + f.name + '…', '#aaa');
    importModFile(f, (ok, res) => {
      if (ok) status('✅ ' + res.name + ' imported and enabled.', '#6f6');
      else status('⚠ ' + (res || 'Import failed'), '#f88');
      if (input) input.value = '';
    });
  });
  // Drag & drop a .bfmod anywhere over the mods menu.
  const drop = document.getElementById('menu-mods');
  if (drop) {
    drop.addEventListener('dragover', (e) => { e.preventDefault(); });
    drop.addEventListener('drop', (e) => {
      e.preventDefault();
      const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
      if (!f) return;
      status('Importing ' + f.name + '…', '#aaa');
      importModFile(f, (ok, res) => {
        if (ok) status('✅ ' + res.name + ' imported and enabled.', '#6f6');
        else status('⚠ ' + (res || 'Import failed'), '#f88');
      });
    });
  }
  // Toggle / remove buttons (event delegation).
  const list = document.getElementById('mods-list');
  if (list) list.addEventListener('click', (e) => {
    const t = e.target.closest('[data-mod-toggle]');
    if (t) {
      const id = t.getAttribute('data-mod-toggle');
      const cur = _mods.find((m) => m.id === id);
      setModEnabled(id, !(cur && cur.enabled));
      return;
    }
    const r = e.target.closest('[data-mod-remove]');
    if (r) removeMod(r.getAttribute('data-mod-remove'));
  });
}

// Called once at boot: restore + re-load any saved mods.
export function initMods() {
  const stored = loadStore();
  _mods = stored.map((m) => ({ ...m, enabled: !!m.enabled, module: null, api: null, errors: 0 }));
  renderModsList();
  for (const m of _mods) {
    if (m.enabled) reloadModule(m);
  }
}