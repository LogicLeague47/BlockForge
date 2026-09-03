// Explosion system — handles block destruction + player damage in a radius.
// Used by TNT.

import { BLOCK, BLOCKS } from './blocks.js';
import * as THREE from 'three';

const EXPLOSION_PARTICLE_COUNT = 40;

export class ExplosionManager {
  constructor(scene, world, audio) {
    this.scene = scene;
    this.world = world;
    this.audio = audio;
    this.particles = [];
    this._geo = new THREE.BoxGeometry(1, 1, 1);
    this._matDark = new THREE.MeshLambertMaterial({ color: 0x555555 });
    this._matBrown = new THREE.MeshLambertMaterial({ color: 0x8b6914 });
    this._matGrey = new THREE.MeshLambertMaterial({ color: 0x333333 });
  }

  // Create an explosion at (x, y, z) with given power (radius in blocks).
  // Returns the array of {x, y, z} block positions that were destroyed.
  explode(x, y, z, power = 3) {
    if (this.audio) this.audio.explosion();
    const destroyed = [];
    const p = Math.ceil(power);
    const powerSq = power * power;
    const fx = Math.floor(x), fy = Math.floor(y), fz = Math.floor(z);

    for (let dx = -p; dx <= p; dx++) {
      const bx = fx + dx;
      const dxx = dx * dx;
      for (let dy = -p; dy <= p; dy++) {
        const by = fy + dy;
        const dxyy = dxx + dy * dy;
        for (let dz = -p; dz <= p; dz++) {
          if (dxyy + dz * dz > powerSq) continue;

          const bz = fz + dz;
          const block = this.world.getBlock(bx, by, bz);
          if (block === undefined || block === BLOCK.AIR || block === BLOCK.WATER || block === BLOCK.BEDROCK) continue;

          const def = BLOCKS[block];
          if (!def) continue;
          const resistance = (def.hardness || 0) * 0.3;
          const dist = Math.sqrt(dxyy + dz * dz);
          if (dist <= power - resistance) {
            this.world.setBlock(bx, by, bz, BLOCK.AIR, false);
            if (this.world.doubleSlabs) this.world.doubleSlabs.delete(bx + ',' + by + ',' + bz);
            destroyed.push({ x: bx, y: by, z: bz, block });
          }
        }
      }
    }

    // Spawn particles
    this._spawnParticles(x, y, z, power);

    return destroyed;
  }

  // Calculate damage to a player at playerPos from an explosion at (ex, ey, ez)
  // Returns damage amount (0 if out of range)
  static calcDamage(ex, ey, ez, playerPos, power = 3) {
    const dx = playerPos.x - ex;
    const dy = playerPos.y - ey;
    const dz = playerPos.z - ez;
    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
    const maxDist = power * 2;
    if (dist > maxDist) return 0;
    // Damage scales inversely with distance, up to power*2 at point blank
    const factor = 1 - (dist / maxDist);
    return Math.floor(factor * power * 4);
  }

  // Spawn visual particles (smoke + debris)
  _spawnParticles(x, y, z, power) {
    const count = Math.min(EXPLOSION_PARTICLE_COUNT * power, 120);
    const mats = [this._matDark, this._matBrown, this._matGrey];
    for (let i = 0; i < count; i++) {
      const size = 0.15 + Math.random() * 0.25;
      const mesh = new THREE.Mesh(this._geo, mats[i % 3]);
      mesh.scale.set(size, size, size);
      mesh.position.set(x, y + 0.5, z);

      const speed = 4 + Math.random() * power * 3;
      const angle = Math.random() * Math.PI * 2;
      const elev = (Math.random() - 0.3) * Math.PI;
      const vx = Math.cos(angle) * Math.cos(elev) * speed;
      const vy = Math.sin(elev) * speed + 3;
      const vz = Math.sin(angle) * Math.cos(elev) * speed;

      this.scene.add(mesh);
      this.particles.push({ mesh, vx, vy, vz, life: 0.6 + Math.random() * 0.6 });
    }
  }

  // Update all active explosion particles
  update(dt) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life -= dt;
      if (p.life <= 0) {
        this.scene.remove(p.mesh);
        this.particles[i] = this.particles[this.particles.length - 1];
        this.particles.length--;
        continue;
      }
      p.vy -= 12 * dt;
      p.mesh.position.x += p.vx * dt;
      p.mesh.position.y += p.vy * dt;
      p.mesh.position.z += p.vz * dt;
      p.mesh.rotation.x += dt * 8;
      p.mesh.rotation.z += dt * 6;
    }
  }

  clear() {
    for (const p of this.particles) {
      this.scene.remove(p.mesh);
    }
    this.particles.length = 0;
  }

  dispose() {
    this.clear();
    this._geo.dispose();
    this._matDark.dispose();
    this._matBrown.dispose();
    this._matGrey.dispose();
  }
}
