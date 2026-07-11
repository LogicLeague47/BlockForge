// Dropped item entities — items that appear in the world when dropped (Q key).
// They float, spin, bob up/down, and are collected when the player walks over them.

import * as THREE from 'three';
import { isBlockItem, itemDef } from './items.js';
import { buildAtlas, makeIcon } from './tiles.js';
import { makeItemIconCanvas } from './ui.js';

const COLLECT_RANGE = 1.5;
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

    // Create 3D representation
    this.group = new THREE.Group();
    this.group.position.set(this.x, this.y, this.z);

    // Use a small plane with the item texture
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;

    if (isBlockItem(itemId)) {
      // Draw block as small isometric cube approximation
      const iconCanvas = makeIcon(itemId, atlasCanvas);
      if (iconCanvas) {
        ctx.drawImage(iconCanvas, 0, 0, 32, 32);
      }
    } else {
      const iconCanvas = makeItemIconCanvas(itemId);
      if (iconCanvas) {
        ctx.drawImage(iconCanvas, 0, 0, 32, 32);
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.magFilter = THREE.NearestFilter;
    tex.minFilter = THREE.NearestFilter;

    // Front face
    const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, side: THREE.DoubleSide });
    const geo = new THREE.PlaneGeometry(0.35, 0.35);
    const front = new THREE.Mesh(geo, mat);
    this.group.add(front);

    // Back face (rotated 90° so item is visible from multiple angles)
    const back = new THREE.Mesh(geo, mat);
    back.rotation.y = Math.PI / 2;
    this.group.add(back);

    this.group.renderOrder = 1;
    this.scene.add(this.group);
  }

  update(dt) {
    this.age += dt;
    if (this.age > DESPAWN_TIME) {
      this.collected = true;
      return;
    }
    // Spin
    this.group.rotation.y += SPIN_SPEED * dt;
    // Bob
    this.group.position.y = this.y + Math.sin(this.age * BOB_SPEED) * BOB_AMP;
  }

  checkCollect(px, py, pz) {
    if (this.collected) return false;
    const dx = this.x - px;
    const dy = (this.y + FLOAT_HEIGHT) - py;
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
          if (c.material.map) c.material.map.dispose();
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
      item.update(dt);
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
