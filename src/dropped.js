// Dropped item entities — items that appear in the world when dropped (Q key).
// They float, spin, bob up/down, and are collected when the player walks over them.

import * as THREE from 'three';
import { isBlockItem, itemDef } from './items.js';
import { makeIcon } from './tiles.js';
import { TILES, tileNameFor, BLOCKS } from './blocks.js';
import { makeItemIconCanvas } from './ui.js';
import { CHUNK_SIZE } from './constants.js';
// Blob shadows removed — real shadow map shadows used instead

const COLLECT_RANGE = 1.5;
const MAGNET_RANGE = 3.0; // start drifting toward player at this distance
const MAGNET_SPEED = 0.5; // blocks/second — slow, deliberate drift toward player
const FLOAT_HEIGHT = 0.3;
const SPIN_SPEED = 2.0;
const BOB_SPEED = 2.5;
const BOB_AMP = 0.08;
const DESPAWN_TIME = 60; // seconds

export class DroppedItem {
  constructor(scene, atlasCanvas, itemId, x, y, z, count, vx = 0, vz = 0) {
    this.scene = scene;
    this.itemId = itemId;
    this.count = count || 1;
    this.x = x;
    this.y = y + FLOAT_HEIGHT;
    this.z = z;
    this.vx = vx;
    this.vz = vz;
    this.age = 0;
    this.collected = false;
    this._canCollect = false; // grace period before auto-collect
    this._atlasCanvas = atlasCanvas;

    // Create 3D representation
    this.group = new THREE.Group();
    this.group.position.set(this.x, this.y, this.z);

    if (isBlockItem(itemId)) {
      const def = BLOCKS[itemId];
      if (def && def.plant) {
        const sideTex = this._atlasTex(tileNameFor(itemId, 'side'));
        const mat = new THREE.MeshBasicMaterial({ map: sideTex, transparent: true, alphaTest: 0.5, depthWrite: false, side: THREE.DoubleSide, fog: false });
        const plane1 = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.3), mat);
        plane1.rotation.y = Math.PI / 4;
        this.group.add(plane1);
        const plane2 = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.3), mat);
        plane2.rotation.y = -Math.PI / 4;
        this.group.add(plane2);
      } else {
        const sideTex = this._atlasTex(tileNameFor(itemId, 'side'));
        const topTex = this._atlasTex(tileNameFor(itemId, 'top'));
        const botTex = this._atlasTex(tileNameFor(itemId, 'bottom'));
        const mkMat = (t) => new THREE.MeshBasicMaterial({ map: t, fog: false });
        const materials = [mkMat(sideTex), mkMat(sideTex), mkMat(topTex), mkMat(botTex), mkMat(sideTex), mkMat(sideTex)];
        const mesh = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.3), materials);
        this.group.add(mesh);
      }
    } else {
      // Non-block items: two crossed flat boxes (Minecraft-style, visible from all angles while spinning)
      const canvas = makeItemIconCanvas(itemId);
      const tex = new THREE.CanvasTexture(canvas);
      tex.magFilter = THREE.NearestFilter;
      tex.minFilter = THREE.NearestFilter;
      tex.generateMipmaps = false;
      const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, alphaTest: 0.5, depthWrite: false, side: THREE.DoubleSide, fog: false });
      const sideMat = new THREE.MeshBasicMaterial({ color: 0x111111, fog: false });
      const mats = [sideMat, sideMat, sideMat, sideMat, mat, mat];
      const geo = new THREE.BoxGeometry(0.35, 0.35, 1 / 16);
      const front = new THREE.Mesh(geo, mats);
      this.group.add(front);
      const back = new THREE.Mesh(geo, mats);
      back.rotation.y = Math.PI / 2;
      this.group.add(back);
    }

    this.group.renderOrder = 1;
    this.scene.add(this.group);
    this.group.traverse((child) => {
      if (child.isMesh) { child.castShadow = true; child.receiveShadow = true; }
    });

    this._dropGroundY = y;
    this.vy = 0;
  }

  _atlasTex(name) {
    const t = TILES[name];
    if (!t || !this._atlasCanvas) return null;
    const c = document.createElement('canvas');
    c.width = 16; c.height = 16;
    const ctx = c.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(this._atlasCanvas, t[0] * 32, t[1] * 32, 32, 32, 0, 0, 16, 16);
    const tex = new THREE.CanvasTexture(c);
    tex.magFilter = THREE.NearestFilter;
    tex.minFilter = THREE.NearestFilter;
    tex.generateMipmaps = false;
    return tex;
  }

  update(dt, playerPos) {
    this.age += dt;
    if (this.age > DESPAWN_TIME) {
      this.collected = true;
      return;
    }
    // Grace period: can't collect for first 0.5s
    if (!this._canCollect && this.age > 0.5) this._canCollect = true;

    // Gravity with fall speed cap to prevent tunneling through unloaded chunks
    this.vy -= 9.8 * dt;
    this.vy = Math.min(this.vy, -20);
    this.y += this.vy * dt;
    if (this.y < this._dropGroundY + FLOAT_HEIGHT) {
      this.y = this._dropGroundY + FLOAT_HEIGHT;
      this.vy = 0;
    }

    // Horizontal throw velocity (Q drop / overflow) — flies out, slows with
    // friction, and comes to rest so the item lands a short way off instead of
    // sitting at the player's feet and getting immediately sucked back up.
    if (this.vx !== 0 || this.vz !== 0) {
      this.x += this.vx * dt;
      this.z += this.vz * dt;
      const friction = Math.max(0, 1 - 1.8 * dt);
      this.vx *= friction;
      this.vz *= friction;
      if (Math.abs(this.vx) < 0.05 && Math.abs(this.vz) < 0.05) { this.vx = 0; this.vz = 0; }
    }
    this.group.position.x = this.x;
    this.group.position.z = this.z;

    // Spin
    this.group.rotation.y += SPIN_SPEED * dt;
    // Bob
    this.group.position.y = this.y + Math.sin(this.age * BOB_SPEED) * BOB_AMP;

    // Magnet: lerp toward player when within MAGNET_RANGE. A freshly-thrown
    // item ignores magnetism until its throw has settled, so a Q-drop visibly
    // flies out and lands instead of being yo-yo'd straight back.
    if (playerPos && !this.collected && this.vx === 0 && this.vz === 0) {
      const dx = playerPos.x - this.x;
      const dy = (playerPos.y + 0.5) - this.y;
      const dz = playerPos.z - this.z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (dist < MAGNET_RANGE && dist > 0.1) {
        // Constant slow drift (0.5 blocks/sec) along the unit vector to the
        // player, instead of an exponential lerp that gets faster up close.
        const k = MAGNET_SPEED * dt;
        this.x += (dx / dist) * k;
        this.y += (dy / dist) * k;
        this.z += (dz / dist) * k;
        this.group.position.set(this.x, this.y + Math.sin(this.age * BOB_SPEED) * BOB_AMP, this.z);
        // Scale up slightly as it approaches (suck-in feel)
        const scale = 1 + (1 - dist / MAGNET_RANGE) * 0.2;
        this.group.scale.setScalar(scale);
      }
    }
  }

  checkCollect(px, py, pz) {
    if (this.collected || !this._canCollect) return false;
    const dx = this.x - px;
    const dy = this.y - py;
    const dz = this.z - pz;
    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
    if (dist < COLLECT_RANGE) {
      this.collected = true;
      return true;
    }
    return false;
  }

  dispose() {
    if (this.group) {
      this.scene.remove(this.group);
      this.group.traverse(c => {
        if (c.geometry) c.geometry.dispose();
        if (c.material) {
          const mats = Array.isArray(c.material) ? c.material : [c.material];
          for (const mat of mats) {
            if (mat.map && typeof mat.map.dispose === 'function') mat.map.dispose();
            mat.dispose();
          }
        }
      });
    }
  }
}

// Manages all dropped item entities in the world
export class DroppedItemManager {
  constructor(scene, atlasCanvas, world) {
    this.scene = scene;
    this.atlasCanvas = atlasCanvas;
    this.world = world;
    this.items = [];
  }

  drop(itemId, count, x, y, z, vx = 0, vz = 0) {
    // Add small random spread
    const spread = 0.3;
    const dx = (Math.random() - 0.5) * spread;
    const dz = (Math.random() - 0.5) * spread;
    const entity = new DroppedItem(this.scene, this.atlasCanvas, itemId, x + dx, y, z + dz, count, vx, vz);
    this.items.push(entity);
    return entity;
  }

  update(dt, playerPos) {
    for (let i = this.items.length - 1; i >= 0; i--) {
      const item = this.items[i];
      const cx = Math.floor(item.x / CHUNK_SIZE);
      const cz = Math.floor(item.z / CHUNK_SIZE);
      if (!this.world || !this.world.getChunk(cx, cz)) continue;
      item.update(dt, playerPos);
      if (item.collected) {
        item.dispose();
        this.items.splice(i, 1);
        continue;
      }
      // Auto-collect when player walks near
      if (playerPos && item.checkCollect(playerPos.x, playerPos.y, playerPos.z)) {
        item.dispose();
        this.items.splice(i, 1);
        // Return the item info so caller can add to inventory
      }
    }
  }

  // Collect items near player and return collected items
  collectNearby(playerPos) {
    const collected = [];
    for (let i = this.items.length - 1; i >= 0; i--) {
      const item = this.items[i];
      if (item.checkCollect(playerPos.x, playerPos.y, playerPos.z)) {
        collected.push({ itemId: item.itemId, count: item.count });
        item.dispose();
        this.items.splice(i, 1);
      }
    }
    return collected;
  }

  clear() {
    for (const item of this.items) item.dispose();
    this.items.length = 0;
  }
}
