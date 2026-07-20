// Multiplayer player renderer — shows other players as 3D models with name tags.
// Uses entity interpolation: buffers 100ms of position snapshots and renders
// between two past snapshots for perfectly smooth movement.

import * as THREE from 'three';
import { PlayerModel } from './playermodel.js';
import { SKIN_PRESETS, getSelectedSkin } from './skins.js';
import { getDevTag } from './multiplayer.js';
import { ARMOR } from './items.js';

const INTERP_DELAY = 100; // ms — render 100ms in the past
const MAX_BUFFER = 20;    // keep last 20 snapshots (~660ms at 30Hz)

export class RemotePlayer {
  constructor(scene, name, skinIndex, x, y, z, cgUsername) {
    this.name = name;
    this.cgUsername = cgUsername || '';
    this.skinIndex = skinIndex || 0;
    this.role = 'player';
    this.visible = true;

    // Interpolation buffer: [{ time, x, y, z, yaw, crouching }]
    this._snapshots = [];
    this._placed = false;

    // Current rendered position (what the model shows)
    this.x = x;
    this.y = y;
    this.z = z;
    this.yaw = 0;
    this.armor = null;
    this.crouchOffset = 0;

    // Get skin preset
    const skin = SKIN_PRESETS[skinIndex] || SKIN_PRESETS[0];

    // Create player model
    this.model = new PlayerModel(scene, skin);
    this.model.setVisible(true);
    this.model.group.position.set(x, y, z);

    // Create name tag (billboard sprite)
    this.nameTag = this._createNameTag(name, cgUsername);
    this.nameTag.position.set(x, y + 2.2, z);
    scene.add(this.nameTag);

    // Create role badge
    this.roleBadge = this._createRoleBadge('player');
    this.roleBadge.position.set(x, y + 2.45, z);
    scene.add(this.roleBadge);

    this.scene = scene;
  }

  _createNameTag(name, cgUsername) {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = cgUsername ? 96 : 64;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    const r = 6;
    const bgH = cgUsername ? 92 : 60;
    ctx.beginPath();
    ctx.moveTo(4 + r, 4);
    ctx.lineTo(252 - r, 4);
    ctx.quadraticCurveTo(252, 4, 252, 4 + r);
    ctx.lineTo(252, bgH - r);
    ctx.quadraticCurveTo(252, bgH, 252 - r, bgH);
    ctx.lineTo(4 + r, bgH);
    ctx.quadraticCurveTo(4, bgH, 4, bgH - r);
    ctx.lineTo(4, 4 + r);
    ctx.quadraticCurveTo(4, 4, 4 + r, 4);
    ctx.closePath();
    ctx.fill();

    ctx.font = 'bold 28px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3;
    const nameY = cgUsername ? 28 : 32;
    ctx.strokeText(name, 128, nameY);
    ctx.fillText(name, 128, nameY);

    if (cgUsername) {
      ctx.font = '18px monospace';
      ctx.fillStyle = '#aaa';
      ctx.lineWidth = 2;
      ctx.strokeText(cgUsername, 128, 62);
      ctx.fillText(cgUsername, 128, 62);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.minFilter = THREE.LinearFilter;
    const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false });
    const sprite = new THREE.Sprite(mat);
    sprite.scale.set(2.5, cgUsername ? 1.2 : 0.8, 1);
    return sprite;
  }

  _createRoleBadge(role) {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, 64, 32);
    const tag = getDevTag();
    ctx.font = 'bold 16px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.strokeStyle = '#000';
    ctx.lineWidth = 3;
    ctx.strokeText(tag, 32, 16);
    ctx.fillStyle = '#f44';
    ctx.fillText(tag, 32, 16);

    const tex = new THREE.CanvasTexture(canvas);
    tex.minFilter = THREE.LinearFilter;
    const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false });
    const sprite = new THREE.Sprite(mat);
    sprite.scale.set(1.2, 0.6, 1);
    return sprite;
  }

  setRole(role) {
    this.role = role;
  }

  // Add a new position snapshot from the server
  addSnapshot(x, y, z, yaw, crouching) {
    const now = performance.now();
    this._snapshots.push({ time: now, x, y, z, yaw, crouching: !!crouching });
    // Trim old snapshots
    if (this._snapshots.length > MAX_BUFFER) {
      this._snapshots.splice(0, this._snapshots.length - MAX_BUFFER);
    }
    // First snapshot: snap immediately (no interpolation from garbage spawn pos)
    if (!this._placed) {
      this._placed = true;
      this.x = x; this.y = y; this.z = z;
      this.yaw = yaw || 0;
    }
  }

  // Set armor (called from armor sync, not position stream)
  setArmor(armor) {
    if (armor !== null && armor !== undefined) this.armor = armor;
  }

  // Update rendered position using entity interpolation
  update(dt) {
    const now = performance.now();
    const renderTime = now - INTERP_DELAY;
    const buf = this._snapshots;

    if (buf.length === 0) return;

    // If only one snapshot exists, just sit on it
    if (buf.length === 1) {
      const s = buf[0];
      this.x = s.x; this.y = s.y; this.z = s.z;
      this.yaw = s.yaw;
      this._updateModel(dt, s.crouching);
      return;
    }

    // Find the two snapshots that bracket renderTime
    // buf is sorted oldest → newest
    let i0 = 0;
    for (let i = 0; i < buf.length - 1; i++) {
      if (buf[i].time <= renderTime && buf[i + 1].time > renderTime) {
        i0 = i;
        break;
      }
      i0 = i;
    }
    const i1 = Math.min(i0 + 1, buf.length - 1);
    const s0 = buf[i0];
    const s1 = buf[i1];

    // Interpolation factor between the two snapshots
    const span = s1.time - s0.time;
    const t = span > 0 ? Math.max(0, Math.min(1, (renderTime - s0.time) / span)) : 0;

    // Interpolate position
    this.x = s0.x + (s1.x - s0.x) * t;
    this.y = s0.y + (s1.y - s0.y) * t;
    this.z = s0.z + (s1.z - s0.z) * t;

    // Interpolate yaw
    let yawDiff = s1.yaw - s0.yaw;
    while (yawDiff > Math.PI) yawDiff -= Math.PI * 2;
    while (yawDiff < -Math.PI) yawDiff += Math.PI * 2;
    this.yaw = s0.yaw + yawDiff * t;

    // Extrapolate slightly if renderTime is past the latest snapshot
    if (renderTime > s1.time && buf.length >= 2) {
      const age = (renderTime - s1.time) / 1000; // seconds past latest
      // Use velocity from last two snapshots for extrapolation
      const vel = (s1.time - s0.time) > 0 ? 1000 / (s1.time - s0.time) : 30;
      const ex = (s1.x - s0.x) * vel * age * 0.3; // dampened extrapolation
      const ez = (s1.z - s0.z) * vel * age * 0.3;
      this.x += ex;
      this.z += ez;
    }

    const crouching = s0.crouching + (s1.crouching - s0.crouching) * t > 0.5;
    this._updateModel(dt, crouching);
  }

  _updateModel(dt, crouching) {
    // Update armour if changed
    if (this.armor !== this._lastArmor) {
      this._lastArmor = this.armor;
      try { this.model.setArmor(this.armor, ARMOR); } catch (_) {}
    }

    // Crouch offset
    const targetCrouchOffset = crouching ? -0.25 : 0;
    this.crouchOffset = this.crouchOffset || 0;
    this.crouchOffset += (targetCrouchOffset - this.crouchOffset) * Math.min(1, dt * 10);

    // Use the model's built-in animation system
    const drawY = this.y + this.crouchOffset;
    const dummyPos = { x: this.x, y: drawY, z: this.z };
    this.model.update(dt, dummyPos, this.yaw, { x: 0, z: 0, y: 0 }, true, false, false, false, false);

    // Update name tag
    this.nameTag.position.set(this.x, drawY + 2.2, this.z);

    // Update role badge
    this.roleBadge.position.set(this.x, drawY + 2.45, this.z);
  }

  dispose() {
    if (this.model) this.model.dispose();
    for (const obj of [this.nameTag, this.roleBadge]) {
      if (!obj) continue;
      if (obj.parent) obj.parent.remove(obj);
      if (obj.material) {
        if (obj.material.map) obj.material.map.dispose();
        obj.material.dispose();
      }
    }
  }
}

// Manages all remote players
export class MultiplayerRenderer {
  constructor(scene) {
    this.scene = scene;
    this.remotePlayers = new Map(); // name -> RemotePlayer
  }

  addPlayer(name, skinIndex, x, y, z, role, cgUsername) {
    if (this.remotePlayers.has(name)) return this.remotePlayers.get(name);
    const rp = new RemotePlayer(this.scene, name, skinIndex, x, y, z, cgUsername);
    rp.setRole(role || 'player');
    this.remotePlayers.set(name, rp);
    return rp;
  }

  removePlayer(name) {
    const rp = this.remotePlayers.get(name);
    if (rp) {
      rp.dispose();
      this.remotePlayers.delete(name);
    }
  }

  updatePlayerPosition(name, x, y, z, yaw, crouching) {
    const rp = this.remotePlayers.get(name);
    if (rp) rp.addSnapshot(x, y, z, yaw, crouching);
  }

  update(dt, playerX, playerZ) {
    for (const rp of this.remotePlayers.values()) {
      if (playerX !== undefined) {
        const dx = rp.x - playerX;
        const dz = rp.z - playerZ;
        if (dx * dx + dz * dz > 16384) {
          if (rp.model.group.visible) rp.model.setVisible(false);
          continue;
        } else {
          if (!rp.model.group.visible) rp.model.setVisible(true);
        }
      }
      rp.update(dt);
    }
  }

  clear() {
    for (const rp of this.remotePlayers.values()) rp.dispose();
    this.remotePlayers.clear();
  }
}
