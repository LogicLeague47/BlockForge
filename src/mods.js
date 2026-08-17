// ─── Mod manager ────────────────────────────────────────────────────────
// BlockForge "mods & addons" are plain ES-module files (.bfmod) that export a
// `manifest` and optional `onLoad` / `onTick` / `onUnload` hooks. They are
// downloaded from the BlockForge mods page, imported in-game through the
// "Mods & Addons" menu, persisted to localStorage and re-loaded on boot.
// Mods talk to the game through a read-only API and draw their own HUD via
// api.hud.*. Broken mods are sandboxed (try/catch) and auto-disabled.

import * as THREE from 'three';

const MODS_KEY = 'bf_mods';
export const MODS_URL = 'mods.html';

let _mods = [];   // { id,name,version,description,author,icon,code,enabled,module,api,errors }
let _refs = null; // live game refs injected every frame by main.js

function loadStore() {
  try { return JSON.parse(localStorage.getItem(MODS_KEY)) || []; } catch (_) { return []; }
}
function saveStore() {
  const data = _mods.map(({ module, api, errors, ...m }) => m);
  try { localStorage.setItem(MODS_KEY, JSON.stringify(data)); } catch (_) { console.warn('[Mods] localStorage write failed'); }
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
        surfaceHeight: (x, z) => (typeof w.heightAt === 'function' ? w.heightAt(x, z) : 0),
      };
    },
    getTime: () => { const d = refs()?.dayTime ?? 0; return { dayTime: d, night: d > 0.625 }; },
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
  document.getElementById('btn-mods')?.addEventListener('click', () => openModsMenu(ui));
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