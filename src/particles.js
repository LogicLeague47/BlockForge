// Particle effects system: block break, ambient weather, and clouds.
//
// Three particle types:
//   1. Break particles — small colored cubes fly out when a block is broken
//   2. Ambient particles — leaves in forests, dust in deserts, snow in snowy biomes
//   3. Procedural clouds — 3D cloud layer that drifts across the sky

import * as THREE from 'three';
import { BLOCK, BLOCKS } from './blocks.js';
import { BIOMES } from './constants.js';

// ── Block color lookup for break particles ──────────────────────────────

export const BLOCK_COLORS = {
  [BLOCK.GRASS]:       [0.36, 0.55, 0.24],
  [BLOCK.DIRT]:        [0.52, 0.37, 0.24],
  [BLOCK.STONE]:       [0.5, 0.5, 0.52],
  [BLOCK.COBBLESTONE]: [0.48, 0.48, 0.5],
  [BLOCK.WOOD]:        [0.5, 0.38, 0.22],
  [BLOCK.PLANKS]:      [0.6, 0.48, 0.28],
  [BLOCK.LEAVES]:      [0.3, 0.55, 0.2],
  [BLOCK.DARK_OAK_LEAVES]: [0.2, 0.42, 0.15],
  [BLOCK.SAND]:        [0.85, 0.8, 0.55],
  [BLOCK.GRAVEL]:      [0.55, 0.52, 0.5],
  [BLOCK.CLAY]:        [0.65, 0.62, 0.58],
  [BLOCK.SNOW]:        [0.92, 0.95, 0.98],
  [BLOCK.SNOW_GRASS]:  [0.85, 0.9, 0.88],
  [BLOCK.BRICK]:       [0.7, 0.35, 0.25],
  [BLOCK.GLASS]:       [0.8, 0.88, 0.95],
  [BLOCK.BOOKSHELF]:   [0.55, 0.42, 0.25],
  [BLOCK.TNT]:         [0.85, 0.2, 0.15],
  [BLOCK.PUMPKIN]:     [0.85, 0.55, 0.12],
  [BLOCK.CACTUS]:      [0.2, 0.5, 0.18],
  [BLOCK.COAL_ORE]:    [0.35, 0.35, 0.37],
  [BLOCK.IRON_ORE]:    [0.65, 0.6, 0.55],
  [BLOCK.GOLD_ORE]:    [0.82, 0.72, 0.35],
  [BLOCK.DIAMOND_ORE]: [0.3, 0.7, 0.78],
  [BLOCK.COPPER_ORE]:  [0.7, 0.5, 0.3],
  [BLOCK.EMERALD_ORE]: [0.25, 0.7, 0.35],
  [BLOCK.GREENSTONE_ORE]: [0.2, 0.7, 0.3],
  [BLOCK.PRISMITE_ORE]: [0.2, 0.75, 0.55],
  [BLOCK.FURNACE]:     [0.55, 0.55, 0.55],
  [BLOCK.CRAFTING]:    [0.6, 0.48, 0.28],
  [BLOCK.CHEST]:       [0.6, 0.48, 0.25],
  [BLOCK.BED]:         [0.7, 0.25, 0.2],
  [BLOCK.BED_FOOT]:    [0.7, 0.25, 0.2],
  [BLOCK.TERRACOTTA]:  [0.7, 0.45, 0.3],
  [BLOCK.RED_SAND]:    [0.75, 0.45, 0.2],
  [BLOCK.PODZOL]:      [0.4, 0.32, 0.2],
  [BLOCK.MYCELIUM]:    [0.5, 0.42, 0.48],
  [BLOCK.NETHERRACK]:  [0.55, 0.18, 0.12],
  [BLOCK.JUNGLE_WOOD]: [0.45, 0.35, 0.2],
};

function getBlockColor(blockId) {
  return BLOCK_COLORS[blockId] || [0.6, 0.6, 0.6];
}

// ── Break Particles ─────────────────────────────────────────────────────

const POOL_SIZE = 16;

export class BreakParticles {
  constructor(scene) {
    this.scene = scene;
    this.particles = [];
    this.group = new THREE.Group();
    this.group.renderOrder = 5;
    scene.add(this.group);
    this._geo = new THREE.BoxGeometry(1, 1, 1);
    this._materialPools = new Map();
    this._poolIndex = new Map();
  }

  _getMaterialPool(blockId) {
    if (this._materialPools.has(blockId)) return this._materialPools.get(blockId);
    const color = getBlockColor(blockId);
    const pool = [];
    for (let i = 0; i < POOL_SIZE; i++) {
      pool.push(new THREE.MeshLambertMaterial({
        color: new THREE.Color(
          color[0] * (0.7 + (i / POOL_SIZE) * 0.5),
          color[1] * (0.7 + ((i * 7) % POOL_SIZE) / POOL_SIZE * 0.5),
          color[2] * (0.7 + ((i * 13) % POOL_SIZE) / POOL_SIZE * 0.5)
        ),
      }));
    }
    this._materialPools.set(blockId, pool);
    this._poolIndex.set(blockId, 0);
    return pool;
  }

  emit(blockId, x, y, z, count) {
    const _mob = ('ontouchstart' in window && navigator.maxTouchPoints > 0);
    count = count || (_mob ? 6 : 16);
    const pool = this._getMaterialPool(blockId);
    let idx = this._poolIndex.get(blockId);
    for (let i = 0; i < count; i++) {
      const size = 0.05 + Math.random() * 0.09;
      const mat = pool[idx % POOL_SIZE];
      idx++;
      const mesh = new THREE.Mesh(this._geo, mat);
      mesh.scale.set(size, size, size);
      mesh.position.set(
        x + 0.2 + Math.random() * 0.6,
        y + 0.2 + Math.random() * 0.6,
        z + 0.2 + Math.random() * 0.6
      );

      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 2.5;
      const vx = Math.cos(angle) * speed * 0.6;
      const vy = 2 + Math.random() * 3.5;
      const vz = Math.sin(angle) * speed * 0.6;

      this.particles.push({
        mesh, vx, vy, vz,
        size,
        life: 0.5 + Math.random() * 0.5,
        age: 0,
        floor: y + 0.05,
        rotSpeed: (Math.random() - 0.5) * 12,
      });
      this.group.add(mesh);
    }
    this._poolIndex.set(blockId, idx);
  }

  update(dt) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.age += dt;
      if (p.age >= p.life) {
        this.group.remove(p.mesh);
        this.particles[i] = this.particles[this.particles.length - 1];
        this.particles.length--;
        continue;
      }
      p.vy -= 14 * dt;
      p.mesh.position.x += p.vx * dt;
      p.mesh.position.y += p.vy * dt;
      p.mesh.position.z += p.vz * dt;
      if (p.mesh.position.y < p.floor && p.vy < 0) {
        p.mesh.position.y = p.floor;
        p.vy = -p.vy * 0.35;
        p.vx *= 0.6;
        p.vz *= 0.6;
      }
      p.mesh.rotation.x += p.rotSpeed * dt;
      p.mesh.rotation.z += p.rotSpeed * dt;
      const t = p.age / p.life;
      p.mesh.material.transparent = true;
      p.mesh.material.opacity = 1 - t;
      p.mesh.scale.setScalar(p.size * (1 - t * 0.6));
    }
  }

  clear() {
    for (const p of this.particles) {
      this.group.remove(p.mesh);
    }
    this.particles.length = 0;
  }

  dispose() {
    this.clear();
    for (const pool of this._materialPools.values()) {
      for (const mat of pool) mat.dispose();
    }
    this._materialPools.clear();
    this._poolIndex.clear();
    this._geo.dispose();
  }
}

// ── Ambient Particles (leaves, dust, snow) ──────────────────────────────

const AMBIENT_POOL = 12;

export class AmbientParticles {
  constructor(scene) {
    this.scene = scene;
    this.particles = [];
    this.group = new THREE.Group();
    this.group.renderOrder = 5;
    scene.add(this.group);
    this.spawnTimer = 0;
    this.currentBiome = BIOMES.PLAINS;
    this._geo = new THREE.BoxGeometry(1, 1, 1);
    this._leafMats = [];
    this._dustMat = null;
    this._snowMat = null;
    this._sporeMat = null;
    this._leafIdx = 0;
    this._initPools();
  }

  _initPools() {
    const greens = [[0.3,0.55,0.2],[0.4,0.6,0.25],[0.25,0.5,0.18],[0.5,0.65,0.3]];
    for (let i = 0; i < AMBIENT_POOL; i++) {
      const c = greens[i % greens.length];
      this._leafMats.push(new THREE.MeshLambertMaterial({ color: new THREE.Color(...c), transparent: true }));
    }
    this._dustMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.85, 0.78, 0.6), transparent: true });
    this._snowMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.95, 0.97, 1.0), transparent: true });
    this._sporeMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(0.5, 0.8, 0.4), transparent: true });
  }

  setBiome(biomeId) {
    this.currentBiome = biomeId;
  }

  _getParticleType() {
    const b = this.currentBiome;
    if (b === BIOMES.FOREST || b === BIOMES.DARK_FOREST || b === BIOMES.BIRCH_FOREST || b === BIOMES.JUNGLE) return 'leaf';
    if (b === BIOMES.DESERT || b === BIOMES.SAVANNA) return 'dust';
    if (b === BIOMES.SNOWY || b === BIOMES.TAIGA) return 'snow';
    if (b === BIOMES.SWAMP) return 'spore';
    return null;
  }

  _spawn(playerX, playerY, playerZ) {
    const type = this._getParticleType();
    if (!type) return;

    const angle = Math.random() * Math.PI * 2;
    const dist = 8 + Math.random() * 12;
    const x = playerX + Math.cos(angle) * dist;
    const z = playerZ + Math.sin(angle) * dist;
    const y = playerY + 2 + Math.random() * 10;

    let size, mat;
    if (type === 'leaf') {
      size = 0.06 + Math.random() * 0.04;
      mat = this._leafMats[this._leafIdx % AMBIENT_POOL];
      this._leafIdx++;
    } else if (type === 'dust') {
      size = 0.03 + Math.random() * 0.02;
      mat = this._dustMat;
    } else if (type === 'snow') {
      size = 0.03 + Math.random() * 0.02;
      mat = this._snowMat;
    } else if (type === 'spore') {
      size = 0.02 + Math.random() * 0.02;
      mat = this._sporeMat;
    }

    const mesh = new THREE.Mesh(this._geo, mat);
    mesh.scale.set(size, size, size);
    mesh.position.set(x, y, z);
    this.group.add(mesh);

    this.particles.push({
      mesh, type,
      vx: (Math.random() - 0.5) * 0.5,
      vy: type === 'snow' ? -0.3 - Math.random() * 0.3 : -0.1 - Math.random() * 0.2,
      vz: (Math.random() - 0.5) * 0.5,
      life: 4 + Math.random() * 4,
      age: 0,
      swayPhase: Math.random() * Math.PI * 2,
      swaySpeed: 1 + Math.random() * 2,
    });
  }

  update(dt, playerPos) {
    if (!playerPos) return;
    const type = this._getParticleType();

    // Spawn new particles
    this.spawnTimer += dt;
    if (type && this.spawnTimer > 0.15) {
      this.spawnTimer = 0;
      if (this.particles.length < 60) {
        this._spawn(playerPos.x, playerPos.y, playerPos.z);
      }
    }

    // Update existing
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.age += dt;
      if (p.age >= p.life) {
        this.group.remove(p.mesh);
        this.particles[i] = this.particles[this.particles.length - 1];
        this.particles.length--;
        continue;
      }
      // Sway / drift
      if (p.type === 'leaf') {
        p.mesh.position.x += (Math.sin(p.age * p.swaySpeed + p.swayPhase) * 0.3 + p.vx) * dt;
        p.mesh.position.z += (Math.cos(p.age * p.swaySpeed * 0.7 + p.swayPhase) * 0.2 + p.vz) * dt;
        p.mesh.rotation.x += dt * 1.5;
        p.mesh.rotation.z += dt * 1.2;
      } else if (p.type === 'snow') {
        p.mesh.position.x += Math.sin(p.age * p.swaySpeed + p.swayPhase) * 0.15 * dt;
        p.mesh.position.z += Math.cos(p.age * p.swaySpeed * 0.8 + p.swayPhase) * 0.1 * dt;
        p.mesh.position.y += p.vy * dt;
      } else {
        p.mesh.position.x += p.vx * dt;
        p.mesh.position.y += p.vy * dt;
        p.mesh.position.z += p.vz * dt;
      }

      // Fade
      const alpha = p.age < 1 ? p.age : (p.age > p.life - 1 ? (p.life - p.age) : 1);
      p.mesh.material.opacity = Math.max(0, Math.min(1, alpha));

      // Remove if too far from player
      const dx = p.mesh.position.x - playerPos.x;
      const dz = p.mesh.position.z - playerPos.z;
      if (dx * dx + dz * dz > 400) {
        this.group.remove(p.mesh);
        this.particles[i] = this.particles[this.particles.length - 1];
        this.particles.length--;
      }
    }
  }

  clear() {
    for (const p of this.particles) {
      this.group.remove(p.mesh);
    }
    this.particles.length = 0;
  }

  dispose() {
    this.clear();
    for (const m of this._leafMats) m.dispose();
    if (this._dustMat) this._dustMat.dispose();
    if (this._snowMat) this._snowMat.dispose();
    if (this._sporeMat) this._sporeMat.dispose();
    this._geo.dispose();
  }
}

// ── Procedural Clouds ──────────────────────────────────────────────────

export class CloudSystem {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.group.renderOrder = -1;
    scene.add(this.group);
    this.clouds = [];
    this._lastBrightness = -1;
    this._lastTintR = -1;
    this._lastTintG = -1;
    this._lastTintB = -1;
    this._buildClouds();
  }

  _buildClouds() {
    const lowEnd = ('ontouchstart' in window && navigator.maxTouchPoints > 0) || (navigator.deviceMemory || 8) <= 4 || (navigator.hardwareConcurrency || 4) <= 4;
    const cloudCount = lowEnd ? 20 : 40;
    const spread = 200;
    const height = 80;

    for (let i = 0; i < cloudCount; i++) {
      const cloudGroup = new THREE.Group();

      // Each cloud is a cluster of soft white boxes
      const puffCount = lowEnd ? 3 : (3 + Math.floor(Math.random() * 5));
      const baseX = (Math.random() - 0.5) * spread;
      const baseZ = (Math.random() - 0.5) * spread;
      const baseY = height + (Math.random() - 0.5) * 8;

      for (let j = 0; j < puffCount; j++) {
        const w = 3 + Math.random() * 6;
        const h = 1 + Math.random() * 2;
        const d = 2 + Math.random() * 4;
        const geo = new THREE.BoxGeometry(w, h, d);
        const mat = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.6 + Math.random() * 0.3,
          fog: false,
          depthWrite: false,
        });
        const puff = new THREE.Mesh(geo, mat);
        puff.position.set(
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 1.5,
          (Math.random() - 0.5) * 6
        );
        cloudGroup.add(puff);
      }

      cloudGroup.position.set(baseX, baseY, baseZ);
      this.group.add(cloudGroup);
      this.clouds.push({
        group: cloudGroup,
        speed: 0.3 + Math.random() * 0.5,
        baseX,
        baseZ,
      });
    }
  }

  update(dt, dayTime, playerX, playerZ, sinA) {
    // Drift clouds independently within the layer
    for (const c of this.clouds) {
      c.group.position.x += c.speed * dt;
    }

    // Wrap clouds to stay within ~120 blocks of the player (world-space, no follow)
    for (const c of this.clouds) {
      const dx = c.group.position.x - playerX;
      if (dx > 120) c.group.position.x -= 240;
      else if (dx < -120) c.group.position.x += 240;
      const dz = c.group.position.z - playerZ;
      if (dz > 120) c.group.position.z -= 240;
      else if (dz < -120) c.group.position.z += 240;
    }

    // Cloud brightness follows day/night
    const sA = sinA !== undefined ? sinA : (dayTime !== undefined ? Math.sin(dayTime * Math.PI * 2 - Math.PI * 0.5) : 1);
    const brightness = Math.max(0.15, Math.min(1, sA * 0.8 + 0.5));

    // Golden hour tint: orange/pink when sun is near horizon
    const nearHorizon = Math.abs(sA) < 0.3;
    let tintR = 1, tintG = 1, tintB = 1;
    if (nearHorizon && sA > 0) {
      const warmth = 1 - sA / 0.3;
      tintR = 1;
      tintG = 0.7 + warmth * 0.2;
      tintB = 0.5 + warmth * 0.3;
    } else if (nearHorizon && sA < 0) {
      const warmth = 1 + sA / 0.3;
      tintR = 1;
      tintG = 0.7 + warmth * 0.2;
      tintB = 0.5 + warmth * 0.3;
    }

    const br = brightness * tintR;
    const bg = brightness * tintG;
    const bb = brightness * tintB * 1.02;
    if (br !== this._lastBrightness || bg !== this._lastTintG || bb !== this._lastTintB) {
      this._lastBrightness = br;
      this._lastTintG = bg;
      this._lastTintB = bb;
      for (const c of this.clouds) {
        for (const child of c.group.children) {
          if (child.material) {
            child.material.color.setRGB(br, bg, bb);
          }
        }
      }
    }
  }

  clear() {
    for (const c of this.clouds) {
      this.group.remove(c.group);
      c.group.traverse(child => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) child.material.dispose();
      });
    }
    this.clouds.length = 0;
  }
}
