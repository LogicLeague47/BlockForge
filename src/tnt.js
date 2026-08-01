// Lit TNT entity — a full-size animated TNT block that stays visible while its
// fuse burns: it blinks brighter, hops faster and faster, and sparks at the top
// before exploding (Minecraft-Java style), instead of vanishing instantly.

import * as THREE from 'three';
import { BLOCK, TILES, tileNameFor } from './blocks.js';

const GRAVITY = 9.8;
const EXPLOSION_POWER = 4;

export class LitTnt {
  constructor(scene, atlasCanvas, x, y, z, fuseTime = 1.5) {
    this.scene = scene;
    this.atlasCanvas = atlasCanvas;
    this.x = x;
    this.y = y;
    this.z = z;
    this._groundY = y;
    this.fuseTime = fuseTime;
    this.age = 0;
    this.done = false;

    this.group = new THREE.Group();
    this.group.position.set(x, y, z);

    // Full-size TNT cube built from the block atlas textures
    const norm = {
      side: this._atlasTex(tileNameFor(BLOCK.TNT, 'side')),
      top: this._atlasTex(tileNameFor(BLOCK.TNT, 'top')),
      bot: this._atlasTex(tileNameFor(BLOCK.TNT, 'bottom')),
    };
    const lit = {
      side: this._litVersion(norm.side),
      top: this._litVersion(norm.top),
      bot: this._litVersion(norm.bot),
    };
    this._texNorm = [norm.side, norm.side, norm.top, norm.bot, norm.side, norm.side];
    this._texLit = [lit.side, lit.side, lit.top, lit.bot, lit.side, lit.side];

    const mkMat = (t) => new THREE.MeshBasicMaterial({ map: t });
    this._mats = this._texNorm.map(mkMat);
    this.mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), this._mats);
    this.mesh.position.y = 0.5;
    this.group.add(this.mesh);

    // Fuse spark: flickering glow cube at the top of the block
    this._spark = new THREE.Mesh(
      new THREE.BoxGeometry(0.18, 0.18, 0.18),
      new THREE.MeshBasicMaterial({ map: this._sparkTex(), transparent: true, opacity: 1 })
    );
    this._spark.position.y = 1.02;
    this._sparkT = 0;
    this.group.add(this._spark);

    this.group.traverse((c) => {
      if (c.isMesh) { c.castShadow = true; c.receiveShadow = true; }
    });
    this.scene.add(this.group);

    // Initial hop when lit
    this.vy = 2.1;
  }

  _atlasTex(name) {
    const t = TILES[name];
    if (!t || !this.atlasCanvas) return null;
    const c = document.createElement('canvas');
    c.width = 16; c.height = 16;
    const ctx = c.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(this.atlasCanvas, t[0] * 32, t[1] * 32, 32, 32, 0, 0, 16, 16);
    const tex = new THREE.CanvasTexture(c);
    tex.magFilter = THREE.NearestFilter;
    tex.minFilter = THREE.NearestFilter;
    tex.generateMipmaps = false;
    return tex;
  }

  // A brighter, whiter copy of a face texture used for the blink effect.
  _litVersion(src) {
    if (!src) return null;
    const c = document.createElement('canvas');
    c.width = 16; c.height = 16;
    const ctx = c.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(src.image, 0, 0, 16, 16);
    ctx.globalCompositeOperation = 'source-atop';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
    ctx.fillRect(0, 0, 16, 16);
    const tex = new THREE.CanvasTexture(c);
    tex.magFilter = THREE.NearestFilter;
    tex.minFilter = THREE.NearestFilter;
    tex.generateMipmaps = false;
    return tex;
  }

  _sparkTex() {
    const c = document.createElement('canvas');
    c.width = 16; c.height = 16;
    const ctx = c.getContext('2d');
    const g = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    g.addColorStop(0, '#fff8d0');
    g.addColorStop(0.4, '#ffd040');
    g.addColorStop(1, 'rgba(255,120,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 16, 16);
    const tex = new THREE.CanvasTexture(c);
    tex.magFilter = THREE.NearestFilter;
    tex.minFilter = THREE.NearestFilter;
    return tex;
  }

  update(dt) {
    if (this.done) return;
    this.age += dt;
    const t = Math.min(1, this.age / this.fuseTime);

    // Hop: gravity + increasing bounce impulse as the fuse burns down
    this.vy -= GRAVITY * dt;
    this.y += this.vy * dt;
    if (this.y <= this._groundY) {
      this.y = this._groundY;
      this.vy = 2.0 + t * 2.6;
    }
    this.group.position.set(this.x, this.y, this.z);

    // Blink: swap normal/bright textures, flashing faster near the end
    const blinkRate = 7 + t * 26;
    const flashOn = Math.sin(this.age * blinkRate * Math.PI) > 0;
    for (let i = 0; i < this._mats.length; i++) {
      const tex = flashOn ? this._texLit[i] : this._texNorm[i];
      if (tex) this._mats[i].map = tex;
    }

    // Fuse spark flicker
    this._sparkT += dt;
    this._spark.material.opacity = Math.random() < (0.5 + t * 0.4) ? 1 : 0.1;
    const s = 1 + Math.sin(this._sparkT * 40) * 0.25;
    this._spark.scale.setScalar(s);

    if (this.age >= this.fuseTime) this.done = true;
  }

  dispose() {
    if (this.group) {
      this.scene.remove(this.group);
      this.group.traverse((c) => {
        if (c.geometry) c.geometry.dispose();
        if (c.material) {
          if (c.material.map && typeof c.material.map.dispose === 'function') c.material.map.dispose();
          c.material.dispose();
        }
      });
    }
  }
}

// Manages all lit TNT entities in the world.
export class LitTntManager {
  constructor(scene, atlasCanvas, world, explosionManager) {
    this.scene = scene;
    this.atlasCanvas = atlasCanvas;
    this.world = world;
    this.explosionManager = explosionManager;
    this.list = [];
    this.onExplode = null; // (x, y, z, power) callback for player damage
  }

  ignite(x, y, z, fuseTime) {
    // The block is consumed immediately, but a visible entity takes its place.
    this.world.setBlock(x, y, z, BLOCK.AIR);
    const e = new LitTnt(this.scene, this.atlasCanvas, x, y, z, fuseTime);
    this.list.push(e);
  }

  update(dt) {
    for (let i = this.list.length - 1; i >= 0; i--) {
      const e = this.list[i];
      e.update(dt);
      if (e.done) {
        const cx = e.x + 0.5, cy = e.y + 0.5, cz = e.z + 0.5;
        if (this.explosionManager) {
          this.explosionManager.explode(cx, cy, cz, EXPLOSION_POWER);
        }
        if (this.onExplode) this.onExplode(e.x, e.y, e.z, EXPLOSION_POWER);
        e.dispose();
        this.list.splice(i, 1);
      }
    }
  }

  clear() {
    for (const e of this.list) e.dispose();
    this.list.length = 0;
  }
}
