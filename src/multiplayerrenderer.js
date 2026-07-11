// Multiplayer player renderer — shows other players as 3D models with name tags.
// Each remote player has a PlayerModel, name tag sprite, and position interpolation.

import * as THREE from 'three';
import { PlayerModel } from './playermodel.js';
import { SKIN_PRESETS, getSelectedSkin } from './skins.js';
import { getDevTag } from './multiplayer.js';
import { ARMOR } from './items.js';

export class RemotePlayer {
  constructor(scene, name, skinIndex, x, y, z, cgUsername) {
    this.name = name;
    this.cgUsername = cgUsername || '';
    this.x = x;
    this.y = y;
    this.z = z;
    this.targetX = x;
    this.targetY = y;
    this.targetZ = z;
    this.yaw = 0;
    this.targetYaw = 0;
    this.skinIndex = skinIndex || 0;
    this.role = 'player'; // owner, admin, staff, player
    this.visible = true;

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

    // Background — manual rounded rect for browser compat
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

    // Player name
    ctx.font = 'bold 28px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3;
    const nameY = cgUsername ? 28 : 32;
    ctx.strokeText(name, 128, nameY);
    ctx.fillText(name, 128, nameY);

    // CG username subtitle
    if (cgUsername) {
      ctx.font = '16px monospace';
      ctx.fillStyle = '#aaaaaa';
      ctx.lineWidth = 2;
      ctx.strokeText(cgUsername, 128, 62);
      ctx.fillText(cgUsername, 128, 62);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.magFilter = THREE.NearestFilter;
    const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false });
    const sprite = new THREE.Sprite(mat);
    sprite.scale.set(1.5, cgUsername ? 0.6 : 0.4, 1);
    sprite.renderOrder = 10;
    return sprite;
  }

  _createRoleBadge(role) {
    const colors = {
      gamedev: '#0ff', owner: '#fa0', admin: '#f55', staff: '#5af', player: null
    };
    const color = colors[role];
    if (!color) return new THREE.Object3D(); // no badge for players

    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, 128, 32);
    ctx.fillStyle = color;
    ctx.font = 'bold 20px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(role === 'gamedev' ? getDevTag() : role.toUpperCase(), 64, 16);

    const tex = new THREE.CanvasTexture(canvas);
    tex.magFilter = THREE.NearestFilter;
    const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false });
    const sprite = new THREE.Sprite(mat);
    sprite.scale.set(0.8, 0.2, 1);
    sprite.renderOrder = 10;
    return sprite;
  }

  setRole(role) {
    this.role = role;
    if (this.roleBadge.parent) this.roleBadge.parent.remove(this.roleBadge);
    this.roleBadge = this._createRoleBadge(role);
    this.roleBadge.position.copy(this.nameTag.position);
    this.roleBadge.position.y += 0.25;
    this.scene.add(this.roleBadge);
  }

  setPosition(x, y, z, yaw, crouching, armor) {
    this.targetX = x;
    this.targetY = y;
    this.targetZ = z;
    if (yaw !== undefined) this.targetYaw = yaw;
    this.targetCrouching = !!crouching;
    if (armor !== undefined) this.armor = armor;
  }

  update(dt) {
    // Smooth interpolation toward target position
    const lerp = Math.min(1, dt * 8);
    this.x += (this.targetX - this.x) * lerp;
    this.y += (this.targetY - this.y) * lerp;
    this.z += (this.targetZ - this.z) * lerp;

    // Yaw interpolation
    let yawDiff = this.targetYaw - this.yaw;
    while (yawDiff > Math.PI) yawDiff -= Math.PI * 2;
    while (yawDiff < -Math.PI) yawDiff += Math.PI * 2;
    this.yaw += yawDiff * lerp;

    // Crouch: lower model slightly
    const targetCrouchOffset = this.targetCrouching ? -0.25 : 0;
    this.crouchOffset = this.crouchOffset || 0;
    this.crouchOffset += (targetCrouchOffset - this.crouchOffset) * lerp;

    // Update armour if changed
    if (this.armor !== this._lastArmor) {
      this._lastArmor = this.armor;
      try { this.model.setArmor(this.armor, ARMOR); } catch (_) {}
    }

    // Calculate velocity for animation
    const vx = this.targetX - this.x;
    const vz = this.targetZ - this.z;
    const speed = Math.sqrt(vx * vx + vz * vz);
    const velocity = { x: vx, z: vz, y: 0 };
    const moving = speed > 0.05;

    // Use the model's built-in animation system
    const drawY = this.y + this.crouchOffset;
    const dummyPos = { x: this.x, y: drawY, z: this.z };
    this.model.update(dt, dummyPos, this.yaw, velocity, true, false, false, false, false);

    // Update name tag (above head, not affected by crouch)
    this.nameTag.position.set(this.x, drawY + 2.2, this.z);

    // Update role badge
    this.roleBadge.position.set(this.x, drawY + 2.45, this.z);
  }

  dispose() {
    if (this.model) this.model.dispose();
    if (this.nameTag && this.nameTag.parent) this.nameTag.parent.remove(this.nameTag);
    if (this.roleBadge && this.roleBadge.parent) this.roleBadge.parent.remove(this.roleBadge);
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

  updatePlayerPosition(name, x, y, z, yaw, crouching, armor) {
    const rp = this.remotePlayers.get(name);
    if (rp) rp.setPosition(x, y, z, yaw, crouching, armor);
  }

  update(dt) {
    for (const rp of this.remotePlayers.values()) {
      rp.update(dt);
    }
  }

  clear() {
    for (const rp of this.remotePlayers.values()) rp.dispose();
    this.remotePlayers.clear();
  }
}
