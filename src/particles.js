// Particle effects system: block break, ambient weather, and clouds.
//
// Three particle types:
//   1. Break particles — small colored cubes fly out when a block is broken
//   2. Ambient particles — leaves in forests, dust in deserts, snow in snowy biomes
//   3. Procedural clouds — 3D cloud layer that drifts across the sky

import * as THREE from 'three';
import { BLOCK, BLOCKS } from './blocks.js';
import { BIOMES } from './world.js';

// ── Block color lookup for break particles ──────────────────────────────

const BLOCK_COLORS = {
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

export class BreakParticles {
  constructor(scene) {
    this.scene = scene;
    this.particles = [];
    this.group = new THREE.Group();
    this.group.renderOrder = 5;
    scene.add(this.group);
  }

  emit(blockId, x, y, z, count) {
    count = count || 12;
    const color = getBlockColor(blockId);
    for (let i = 0; i < count; i++) {
      const size = 0.04 + Math.random() * 0.06;
      const geo = new THREE.BoxGeometry(size, size, size);
      const mat = new THREE.MeshLambertMaterial({
        color: new THREE.Color(
          color[0] * (0.8 + Math.random() * 0.4),
          color[1] * (0.8 + Math.random() * 0.4),
          color[2] * (0.8 + Math.random() * 0.4)
        ),
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x + 0.5, y + 0.5, z + 0.5);

      // Random velocity — burst outward and up
      const vx = (Math.random() - 0.5) * 3;
      const vy = 2 + Math.random() * 3;
      const vz = (Math.random() - 0.5) * 3;

      this.particles.push({
        mesh, vx, vy, vz,
        life: 0.4 + Math.random() * 0.4,
        age: 0,
        rotSpeed: (Math.random() - 0.5) * 10,
      });
      this.group.add(mesh);
    }
  }

  update(dt) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.age += dt;
      if (p.age >= p.life) {
        this.group.remove(p.mesh);
        p.mesh.geometry.dispose();
        p.mesh.material.dispose();
        this.particles.splice(i, 1);
        continue;
      }
      // Physics
      p.vy -= 12 * dt; // gravity
      p.mesh.position.x += p.vx * dt;
      p.mesh.position.y += p.vy * dt;
      p.mesh.position.z += p.vz * dt;
      p.mesh.rotation.x += p.rotSpeed * dt;
      p.mesh.rotation.z += p.rotSpeed * dt;
      // Fade out
      const alpha = 1 - p.age / p.life;
      p.mesh.material.transparent = true;
      p.mesh.material.opacity = alpha;
    }
  }

  clear() {
    for (const p of this.particles) {
      this.group.remove(p.mesh);
      p.mesh.geometry.dispose();
      p.mesh.material.dispose();
    }
    this.particles.length = 0;
  }
}

// ── Ambient Particles (leaves, dust, snow) ──────────────────────────────

export class AmbientParticles {
  constructor(scene) {
    this.scene = scene;
    this.particles = [];
    this.group = new THREE.Group();
    this.group.renderOrder = 5;
    scene.add(this.group);
    this.spawnTimer = 0;
    this.currentBiome = BIOMES.PLAINS;
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

    let color, size, mat;
    if (type === 'leaf') {
      const greens = [[0.3,0.55,0.2],[0.4,0.6,0.25],[0.25,0.5,0.18],[0.5,0.65,0.3]];
      color = greens[Math.floor(Math.random() * greens.length)];
      size = 0.06 + Math.random() * 0.04;
      mat = new THREE.MeshLambertMaterial({ color: new THREE.Color(...color), transparent: true });
    } else if (type === 'dust') {
      color = [0.85, 0.78, 0.6];
      size = 0.03 + Math.random() * 0.02;
      mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(...color), transparent: true });
    } else if (type === 'snow') {
      color = [0.95, 0.97, 1.0];
      size = 0.03 + Math.random() * 0.02;
      mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(...color), transparent: true });
    } else if (type === 'spore') {
      color = [0.5, 0.8, 0.4];
      size = 0.02 + Math.random() * 0.02;
      mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(...color), transparent: true });
    }

    const geo = new THREE.BoxGeometry(size, size, size);
    const mesh = new THREE.Mesh(geo, mat);
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
        p.mesh.geometry.dispose();
        p.mesh.material.dispose();
        this.particles.splice(i, 1);
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
        p.mesh.geometry.dispose();
        p.mesh.material.dispose();
        this.particles.splice(i, 1);
      }
    }
  }

  clear() {
    for (const p of this.particles) {
      this.group.remove(p.mesh);
      p.mesh.geometry.dispose();
      p.mesh.material.dispose();
    }
    this.particles.length = 0;
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
    this._buildClouds();
  }

  _buildClouds() {
    const cloudCount = 40;
    const spread = 200;
    const height = 80;

    for (let i = 0; i < cloudCount; i++) {
      const cloudGroup = new THREE.Group();

      // Each cloud is a cluster of soft white boxes
      const puffCount = 3 + Math.floor(Math.random() * 5);
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

  update(dt, dayTime, playerX, playerZ) {
    // Move clouds
    for (const c of this.clouds) {
      c.group.position.x += c.speed * dt;
      // Wrap around when too far
      if (c.group.position.x > playerX + 120) {
        c.group.position.x = playerX - 120;
      }
    }

    // Position cloud layer above player
    this.group.position.x = playerX;
    this.group.position.z = playerZ;

    // Cloud brightness follows day/night
    const sinA = dayTime !== undefined ? Math.sin(dayTime * Math.PI * 2 - Math.PI * 0.5) : 1;
    const brightness = Math.max(0.15, Math.min(1, sinA * 0.8 + 0.5));

    for (const c of this.clouds) {
      for (const child of c.group.children) {
        if (child.material) {
          child.material.color.setRGB(brightness, brightness, brightness * 1.02);
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
