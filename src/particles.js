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
    this._meshPool = []; // recycled Mesh objects to avoid per-particle allocation
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
      let mesh = this._meshPool.pop();
      if (!mesh) mesh = new THREE.Mesh(this._geo, mat);
      else mesh.material = mat;
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
        if (this._meshPool.length < 512) this._meshPool.push(p.mesh);
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

// The cloud field stretches ±CLOUD_FIELD_HALF blocks around the player — well
// past the max render distance (10 chunks → fog far 192) — so clouds cover the
// whole sky all the way to the horizon instead of a small window around spawn.
// Clouds drift slowly and wrap at ±CLOUD_FIELD_HALF; the build grid repeats
// with the same period (2*CLOUD_FIELD_HALF), so a wrapped cloud lands exactly
// on an equivalent grid cell and coverage stays uniform everywhere. Clouds are
// rendered as InstancedMeshes (one draw call per opacity bucket) so the field
// can be huge without thousands of draw calls, and they respect fog so the far
// edge fades into the sky color instead of showing a hard boundary.
const CLOUD_FIELD_HALF = 320;

const _cloudQuat = new THREE.Quaternion();
const _cloudScale = new THREE.Vector3();
const _cloudPos = new THREE.Vector3();

export class CloudSystem {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.group.renderOrder = -1;
    scene.add(this.group);
    this.clouds = [];
    this._meshes = [];
    this._lastBrightness = -1;
    this._lastTintR = -1;
    this._lastTintG = -1;
    this._lastTintB = -1;
    this._geo = new THREE.BoxGeometry(1, 1, 1);
    this._mats = [0.5, 0.68, 0.86].map(opacity => new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity,
      fog: true,
      depthWrite: false,
    }));
    this._mat4 = new THREE.Matrix4();
    this._buildClouds();
  }

  _buildClouds() {
    const lowEnd = ('ontouchstart' in window && navigator.maxTouchPoints > 0) || (navigator.deviceMemory || 8) <= 4 || (navigator.hardwareConcurrency || 4) <= 4;
    // Grid cell size: 24 blocks full quality, 44 on low-end. The grid fills the
    // ±CLOUD_FIELD_HALF window and is periodic with period 2*CLOUD_FIELD_HALF,
    // matching the wrap in update() so coverage is uniform wherever the player
    // goes. ~27×27 = 729 clouds full quality, ~15×15 = 225 on low-end.
    const cell = lowEnd ? 44 : 24;
    const cellsPerAxis = Math.ceil((CLOUD_FIELD_HALF * 2) / cell);
    const gridOffset = -CLOUD_FIELD_HALF;
    const height = 80;

    // Per-opacity-bucket instance data, plus per-cloud drift records.
    const buckets = [[], [], []];

    for (let i = 0; i < cellsPerAxis; i++) {
      for (let j = 0; j < cellsPerAxis; j++) {
        const cloud = {
          x: gridOffset + cell * i + (Math.random() - 0.5) * (cell * 0.4),
          z: gridOffset + cell * j + (Math.random() - 0.5) * (cell * 0.4),
          y: height + (Math.random() - 0.5) * 8,
          speed: 0.3 + Math.random() * 0.5,
          puffs: [],
        };

        // Each cloud is a cluster of soft white boxes
        const puffCount = lowEnd ? 3 : (3 + Math.floor(Math.random() * 3));
        for (let k = 0; k < puffCount; k++) {
          const bucket = Math.floor(Math.random() * 3);
          const puff = {
            ox: (Math.random() - 0.5) * 7,
            oy: (Math.random() - 0.5) * 1.5,
            oz: (Math.random() - 0.5) * 5,
            w: 4 + Math.random() * 6,
            h: 1.2 + Math.random() * 1.3,
            d: 3 + Math.random() * 5,
            bucket,
            idx: buckets[bucket].length,
          };
          cloud.puffs.push(puff);
          buckets[puff.bucket].push(puff);
        }
        this.clouds.push(cloud);
      }
    }

    this._meshes = this._mats.map((mat, b) => {
      const list = buckets[b];
      const mesh = new THREE.InstancedMesh(this._geo, mat, list.length);
      // Instances move via wrap every frame; culling against the mesh's static
      // bounds would hide them, so disable it and let the GPU clip off-screen.
      mesh.frustumCulled = false;
      for (const p of list) {
        _cloudPos.set(p.ox, p.oy, p.oz);
        _cloudScale.set(p.w, p.h, p.d);
        this._mat4.compose(_cloudPos, _cloudQuat, _cloudScale);
        mesh.setMatrixAt(p.idx, this._mat4);
      }
      mesh.instanceMatrix.needsUpdate = true;
      this.group.add(mesh);
      return mesh;
    });
  }

  update(dt, dayTime, playerX, playerZ, sinA) {
    // Drift clouds independently and wrap them back into the field around the
    // player. Because the build grid has the same 2*CLOUD_FIELD_HALF period,
    // wrapping by ±2*CLOUD_FIELD_HALF lands each cloud on an equivalent grid
    // cell, so coverage stays uniform and seamless as the player moves.
    for (const c of this.clouds) {
      c.x += c.speed * dt;
      const dx = c.x - playerX;
      if (dx > CLOUD_FIELD_HALF) c.x -= CLOUD_FIELD_HALF * 2;
      else if (dx < -CLOUD_FIELD_HALF) c.x += CLOUD_FIELD_HALF * 2;
      const dz = c.z - playerZ;
      if (dz > CLOUD_FIELD_HALF) c.z -= CLOUD_FIELD_HALF * 2;
      else if (dz < -CLOUD_FIELD_HALF) c.z += CLOUD_FIELD_HALF * 2;

      const cy = c.y;
      for (const p of c.puffs) {
        _cloudPos.set(c.x + p.ox, cy + p.oy, c.z + p.oz);
        _cloudScale.set(p.w, p.h, p.d);
        this._mat4.compose(_cloudPos, _cloudQuat, _cloudScale);
        this._meshes[p.bucket].setMatrixAt(p.idx, this._mat4);
      }
    }
    for (const m of this._meshes) m.instanceMatrix.needsUpdate = true;

    // Cloud brightness follows day/night
    const sA = sinA !== undefined ? sinA : (dayTime !== undefined ? Math.sin(dayTime * Math.PI * 2 - Math.PI * 0.5) : 1);
    const brightness = Math.max(0.15, Math.min(1, sA * 0.8 + 0.5));

    // Golden hour tint: orange/pink when sun is near horizon
    const nearHorizon = Math.abs(sA) < 0.3;
    let tintR = 1, tintG = 1, tintB = 1;
    if (nearHorizon) {
      const warmth = 1 - Math.abs(sA) / 0.3;
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
      for (const m of this._meshes) m.material.color.setRGB(br, bg, bb);
    }
  }

  clear() {
    for (const m of this._meshes) {
      this.group.remove(m);
      m.dispose();
    }
    this._meshes.length = 0;
    this.clouds.length = 0;
    if (this._geo) { this._geo.dispose(); this._geo = null; }
    if (this._mats) {
      for (const m of this._mats) m.dispose();
      this._mats = null;
    }
  }
}
