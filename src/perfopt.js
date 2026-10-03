// Performance wiring: ticks the four optimization modules from the main
// loop — LagController (heap watchdog + low-RAM mesh budget), Sodium-style
// frustum culling (renderopt), and blob entity shadows (shadows.js, used as
// the cheap-shadows path when real PCF shadows are disabled). Memory pooling
// itself (memopt) is wired at the source in world.js chunk storage.

import * as THREE from 'three';
import { masterLagSupervisor4k } from './lagcontroller.js';
import { globalMaxFerriteCore } from './memopt.js';
import { createMaxSodiumRenderer } from './renderopt.js';
import { createShadowMesh, removeShadowMesh, updateShadow, setSunDirection } from './shadows.js';

let _sodium = null;
let _lastCull = 0;
let _lastLag = 0;
let _lastBlobSweep = 0;
let _baseMeshBudget = 0;
let _cheap = null; // null = auto (setting not read yet)
let _shadowApplied = false;
const _blobs = new Map(); // mob object -> blob mesh
let _playerBlob = null;
const _sunDir = new THREE.Vector3();
let _lastRefs = null;

function cheapDefault() {
  try {
    const saved = localStorage.getItem('bf_cheap_shadows');
    if (saved === '1') return true;
    if (saved === '0') return false;
  } catch (_) {}
  // Auto: phones get cheap shadows, desktops keep real PCF.
  try { return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent || ''); } catch (_) { return false; }
}

export function isCheapShadows() {
  if (_cheap === null) _cheap = cheapDefault();
  return _cheap;
}

export function setCheapShadows(on) {
  _cheap = !!on;
  try { localStorage.setItem('bf_cheap_shadows', _cheap ? '1' : '0'); } catch (_) {}
  _shadowApplied = false;
  applyShadowMode();
}

function applyShadowMode() {
  const r = _lastRefs;
  if (!r || !r.sun || !r.scene) return;
  const cheap = isCheapShadows();
  if (r.sun.castShadow !== !cheap) {
    r.sun.castShadow = !cheap;
    // Toggling a shadow-casting light changes shader defines — every compiled
    // material must recompile once (one-time hitch, only on toggle).
    try {
      r.scene.traverse((o) => {
        const m = o.material;
        if (!m) return;
        if (Array.isArray(m)) { for (const x of m) { if (x) x.needsUpdate = true; } }
        else m.needsUpdate = true;
      });
    } catch (_) {}
  }
  if (!cheap) clearBlobs();
  _shadowApplied = true;
}

function clearBlobs() {
  const scene = _lastRefs && _lastRefs.scene;
  try {
    for (const [, mesh] of _blobs) { try { if (scene) removeShadowMesh(scene, mesh); } catch (_) {} }
    _blobs.clear();
    if (_playerBlob) { try { if (scene) removeShadowMesh(scene, _playerBlob); } catch (_) {} _playerBlob = null; }
  } catch (_) {}
}

// Called when leaving a world so blob meshes never leak into the next one.
export function clearPerf() {
  try { clearBlobs(); } catch (_) {}
}

export function perfTick(dt, refs) {
  // refs: { scene, camera, manager, mobManager, player, sun }
  try {
    _lastRefs = refs;
    const now = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
    if (!_sodium && refs.scene && refs.camera) {
      try { _sodium = createMaxSodiumRenderer(refs.scene, refs.camera); } catch (_) { _sodium = null; }
    }
    // 1Hz: heap watchdog. NOTE: we deliberately do NOT scale the mesh
    // rebuild budget down on low-RAM phones anymore — starving rebuilds
    // leaves visible holes (see-through terrain) while moving. The budget
    // stays at whatever the engine chose; only the GC hint runs here.
    if (now - _lastLag > 1000) {
      _lastLag = now;
      try { masterLagSupervisor4k.update(); } catch (_) {}
    }
    // 5Hz: Sodium-style group-level frustum + distance culling, with
    // fail-safes (see tickCulling): inner ring pinned visible, NaN guard,
    // skip hiding right after big camera moves.
    tickCulling(refs, now);
    // Blob shadows (cheap-shadows mode only).
    if (refs.scene && refs.sun) tickBlobs(refs, now);
  } catch (_) {}
}

let _lastCamPos = null;

function tickCulling(refs, now) {
  if (!_sodium || !refs.manager || !refs.manager.meshes) return;
  if (now - _lastCull < 200) return;
  _lastCull = now;
  try {
    const cam = refs.camera;
    const px = cam?.position?.x, py = cam?.position?.y, pz = cam?.position?.z;
    // NaN camera (physics glitch) would make the frustum hide EVERYTHING —
    // fail open instead.
    if (!Number.isFinite(px) || !Number.isFinite(py) || !Number.isFinite(pz)) return;
    // Big camera jump since last cull (teleport/respawn/fast turn): matrices
    // are stale, so only ALLOW showing this round, never hide.
    let allowHide = true;
    if (_lastCamPos) {
      const dx = px - _lastCamPos.x, dy = py - _lastCamPos.y, dz = pz - _lastCamPos.z;
      if (dx * dx + dy * dy + dz * dz > 64) allowHide = false;
    }
    _lastCamPos = { x: px, y: py, z: pz };
    if (!allowHide) {
      for (const [, entry] of refs.manager.meshes) {
        try { if (entry && entry.group) entry.group.visible = true; } catch (_) {}
      }
      return;
    }
    _sodium.updateCulling(refs.manager.meshes);
    // Inner ring (≤2 chunks from camera) is ALWAYS visible — guarantees no
    // holes near the player even if frustum math is ever off. Chunk groups
    // sit at the origin (geometry is world-space), so the ring is computed
    // from the "cx,cz" map key, never group.position.
    for (const [key, entry] of refs.manager.meshes) {
      try {
        if (!entry || !entry.group) continue;
        const sep = String(key).indexOf(',');
        if (sep <= 0) { entry.group.visible = true; continue; }
        const cx = Number(String(key).slice(0, sep));
        const cz = Number(String(key).slice(sep + 1));
        if (!Number.isFinite(cx) || !Number.isFinite(cz)) { entry.group.visible = true; continue; }
        const gx = cx * 16 + 8 - px;
        const gz = cz * 16 + 8 - pz;
        if (gx * gx + gz * gz <= 32 * 32) entry.group.visible = true;
      } catch (_) {}
    }
  } catch (_) {}
}

function tickBlobs(refs, now) {
  if (!isCheapShadows()) return;
  if (!_shadowApplied) applyShadowMode();
  const scene = refs.scene;
  try { _sunDir.copy(refs.sun.position).normalize(); setSunDirection(_sunDir); } catch (_) {}
  // Player blob (hidden while flying — no ground to project on).
  try {
    const p = refs.player;
    if (p && p.position && !p.flying) {
      if (!_playerBlob) _playerBlob = createShadowMesh(scene);
      updateShadow(_playerBlob, p.position, p.position.y, 0.45);
    } else if (_playerBlob) {
      _playerBlob.visible = false;
    }
  } catch (_) {}
  // Mob blobs at 2Hz, with a sweep so despawned mobs don't leak meshes.
  if (now - _lastBlobSweep > 500) {
    _lastBlobSweep = now;
    try {
      const mobs = (refs.mobManager && refs.mobManager.mobs) || [];
      const alive = new Set();
      for (const m of mobs) {
        if (!m || !m.position) continue;
        alive.add(m);
        let b = _blobs.get(m);
        if (!b) { b = createShadowMesh(scene); _blobs.set(m, b); }
        updateShadow(b, m.position, m.position.y, 0.5);
      }
      for (const [m, b] of _blobs) {
        if (!alive.has(m)) { try { removeShadowMesh(scene, b); } catch (_) {} _blobs.delete(m); }
      }
    } catch (_) {}
  }
}

export function getPerfMetrics() {
  try {
    return {
      lag: masterLagSupervisor4k.getMetrics(),
      mem: globalMaxFerriteCore.getMetrics(),
      sodium: _sodium ? _sodium.getMetrics() : null,
      cheapShadows: isCheapShadows(),
      blobs: _blobs.size,
    };
  } catch (_) { return null; }
}
