// Dropped item entities — items that appear in the world when dropped (Q key).
// They float, spin, bob up/down, and are collected when the player walks over them.

import * as THREE from 'three';
import { isBlockItem, itemDef } from './items.js';
import { makeIcon } from './tiles.js';
import { TILES, tileNameFor } from './blocks.js';
import { makeItemIconCanvas } from './ui.js';

const COLLECT_RANGE = 1.5;
const MAGNET_RANGE = 4.0; // start lerping toward player at this distance
const FLOAT_HEIGHT = 0.3;
const SPIN_SPEED = 2.0;
const BOB_SPEED = 2.5;
const BOB_AMP = 0.08;
const DESPAWN_TIME = 60; // seconds

export class DroppedItem {
  constructor(scene, atlasCanvas, itemId, x, y, z, count) {
    this.scene = scene;
    this.itemId = itemId;
    this.count = count || 1;
    this.x = x;
    this.y = y + FLOAT_HEIGHT;
    this.z = z;
    this.age = 0;
    this.collected = false;
    this._atlasCanvas = atlasCanvas;

    // Create 3D representation
    this.group = new THREE.Group();
    this.group.position.set(this.x, this.y, this.z);

    if (isBlockItem(itemId)) {
      // Render as miniature 3D cube with atlas textures
      const sideTex = this._atlasTex(tileNameFor(itemId, 'side'));
      const topTex = this._atlasTex(tileNameFor(itemId, 'top'));
      const botTex = this._atlasTex(tileNameFor(itemId, 'bottom'));
      const mkMat = (t) => new THREE.MeshBasicMaterial({ map: t, fog: false });
      const materials = [mkMat(sideTex), mkMat(sideTex), mkMat(topTex), mkMat(botTex), mkMat(sideTex), mkMat(sideTex)];
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.3), materials);
      this.group.add(mesh);
    } else {
      // Non-block items: two crossed flat planes (visible from all angles while spinning)
      const canvas = makeItemIconCanvas(itemId);
      const tex = new THREE.CanvasTexture(canvas);
      tex.magFilter = THREE.NearestFilter;
      tex.minFilter = THREE.NearestFilter;
      const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, side: THREE.DoubleSide });
      const geo = new THREE.PlaneGeometry(0.35, 0.35);
      const front = new THREE.Mesh(geo, mat);
      this.group.add(front);
      const back = new THREE.Mesh(geo, mat);
      back.rotation.y = Math.PI / 2;
      this.group.add(back);
    }

    this.group.renderOrder = 1;
    this.scene.add(this.group);
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
    // Spin
    this.group.rotation.y += SPIN_SPEED * dt;
    // Bob
    this.group.position.y = this.y + Math.sin(this.age * BOB_SPEED) * BOB_AMP;

    // Magnet: lerp toward player when within MAGNET_RANGE
    if (playerPos && !this.collected) {
      const dx = playerPos.x - this.x;
      const dy = (playerPos.y + 0.5) - this.y;
      const dz = playerPos.z - this.z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (dist < MAGNET_RANGE && dist > 0.1) {
        const speed = Math.max(6, 20 - dist * 3); // faster as closer
        const t = Math.min(1, dt * speed);
        this.x += dx * t;
        this.y += dy * t;
        this.z += dz * t;
        this.group.position.set(this.x, this.y + Math.sin(this.age * BOB_SPEED) * BOB_AMP, this.z);
        // Scale up slightly as it approaches (suck-in feel)
        const scale = 1 + (1 - dist / MAGNET_RANGE) * 0.2;
        this.group.scale.setScalar(scale);
      }
    }
  }

  checkCollect(px, py, pz) {
    if (this.collected) return false;
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
          if (c.material.map && typeof c.material.map.dispose === 'function') c.material.map.dispose();
          c.material.dispose();
        }
      });
    }
  }
}

// Manages all dropped item entities in the world
export class DroppedItemManager {
  constructor(scene, atlasCanvas) {
    this.scene = scene;
    this.atlasCanvas = atlasCanvas;
    this.items = [];
  }

  drop(itemId, count, x, y, z) {
    // Add small random spread
    const spread = 0.3;
    const dx = (Math.random() - 0.5) * spread;
    const dz = (Math.random() - 0.5) * spread;
    const entity = new DroppedItem(this.scene, this.atlasCanvas, itemId, x + dx, y, z + dz, count);
    this.items.push(entity);
    return entity;
  }

  update(dt, playerPos) {
    for (let i = this.items.length - 1; i >= 0; i--) {
      const item = this.items[i];
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
