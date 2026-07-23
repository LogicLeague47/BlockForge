// Passive mob system — cows, pigs, and sheep.
//
// Each mob is a simple box model (THREE.Group) with basic AI:
//   idle → wander → idle … with ground collision.
// MobManager handles spawning per-chunk, updating, and culling.

import * as THREE from 'three';
import { BLOCK, BLOCKS } from './blocks.js';
import { CHUNK_SIZE, WORLD_HEIGHT, SEA_LEVEL, BIOMES } from './constants.js';
import { calcBiome } from './worldgen.js';

function hexToRgb(hex) {
  return [(hex >> 16) & 255, (hex >> 8) & 255, hex & 255];
}

// Texture cache per mob type to avoid creating duplicate textures
const _texCache = {};
// ── mob type definitions (Minecraft proportions) ─────────────────────
// Dimensions are (width, height, depth) in blocks.  All mobs stand on the
// ground plane with their feet at local y=0.
export const MOB_TYPES = {
  cow: {
    name: 'Cow',
    hp: 10,
    bodyW: 1.1, bodyH: 0.9, bodyD: 1.6,
    headW: 0.9, headH: 0.8, headD: 0.9,
    legW: 0.22, legH: 0.55, legD: 0.22,
    headOffZ: -1.0,
    headOffY: -0.35,
    hasHorns: true,
    hasEars: true,
    hasTail: true,
    tailColor: 0x6b4226,
    drops: [{ item: 274, count: [0, 2] }, { item: 268, count: [1, 3] }],
    soundChance: 0.0006,
  },
  pig: {
    name: 'Pig',
    hp: 10,
    bodyW: 1.0, bodyH: 0.9, bodyD: 1.4,
    headW: 0.9, headH: 0.9, headD: 0.9,
    legW: 0.22, legH: 0.42, legD: 0.22,
    headOffZ: -0.85,
    headOffY: -0.35,
    hasSnout: true,
    snoutW: 0.36, snoutH: 0.24, snoutD: 0.12,
    hasPigEars: true,
    hasTail: true,
    tailColor: 0xf0a0a0,
    drops: [{ item: 266, count: [1, 3] }],
    soundChance: 0.0007,
  },
  sheep: {
    name: 'Sheep',
    hp: 8,
    bodyW: 1.0, bodyH: 0.9, bodyD: 1.4,
    headW: 0.9, headH: 0.9, headD: 0.9,
    legW: 0.22, legH: 0.55, legD: 0.22,
    headOffZ: -0.85,
    headOffY: -0.35,
    hasTail: true,
    tailColor: 0xf0f0f0,
    drops: [{ item: 276, count: [1, 2] }, { item: 272, count: [1, 2] }],
    soundChance: 0.0005,
  },
  spider: {
    name: 'Spider',
    hp: 16,
    hostile: true,
    hostileAtNight: true,
    bodyW: 1.4, bodyH: 0.6, bodyD: 1.0,
    headW: 1.0, headH: 0.6, headD: 0.7,
    legW: 0.12, legH: 0.3, legD: 0.12,
    headOffZ: -0.65,
    has8Legs: true,
    hasEyes: true,
    attackDamage: 4,
    drops: [{ item: 278, count: [0, 2] }, { item: 286, count: [0, 1] }],
    soundChance: 0.0003,
  },
  zombie: {
    name: 'Zombie',
    hp: 20,
    hostile: true,
    hostileAtNight: true,
    bipedalLegs: true,
    bodyW: 0.6, bodyH: 1.1, bodyD: 0.35,
    headW: 0.5, headH: 0.5, headD: 0.5,
    legW: 0.22, legH: 0.7, legD: 0.22,
    headOffY: -0.5,
    bodyColor: 0x3a5a8a,
    headColor: 0x5a9a7a,
    legColor: 0x2a3a6a,
    attackDamage: 5,
    drops: [{ item: 290, count: [0, 2] }, { item: 277, count: [0, 2] }, { item: 315, count: [0, 1] }],
    soundChance: 0.0004,
  },
  skeleton: {
    name: 'Skeleton',
    hp: 16,
    hostile: true,
    hostileAtNight: true,
    bipedalLegs: true,
    bodyW: 0.5, bodyH: 1.0, bodyD: 0.3,
    headW: 0.45, headH: 0.45, headD: 0.45,
    legW: 0.18, legH: 0.7, legD: 0.18,
    headOffY: -0.5,
    bodyColor: 0xe8e4d8,
    headColor: 0xe8e4d8,
    legColor: 0xe0dcd0,
    attackDamage: 4,
    drops: [{ item: 277, count: [0, 2] }, { item: 281, count: [0, 3] }],
    soundChance: 0.0003,
  },


  villager: {
    name: 'Villager',
    hp: 20,
    passive: true,
    bipedalLegs: true,
    bodyW: 0.5, bodyH: 0.75, bodyD: 0.25,
    headW: 0.5, headH: 0.5, headD: 0.5,
    legW: 0.25, legH: 0.75, legD: 0.25,
    headOffY: -0.25,
    bodyColor: 0x7C6A4B,
    headColor: 0xD9A57A,
    legColor: 0x5A4632,
    hasArms: true,
    armW: 0.25, armH: 0.75, armD: 0.25,
    armColor: 0x7C6A4B,
    hasHood: true,
    hoodColor: 0x5D503D,
    hasSatchel: true,
    satchelColor: 0x71563A,
    hasBelt: true,
    beltColor: 0x4E3523,
    hasBeard: true,
    beardColor: 0x8B7355,
    variant: 'farmer',
    drops: [],
    soundChance: 0.0003,
  },

  chicken: {
    name: 'Chicken',
    hp: 4,
    bodyW: 0.4, bodyH: 0.6, bodyD: 0.5,
    headW: 0.35, headH: 0.35, headD: 0.35,
    legW: 0.08, legH: 0.3, legD: 0.08,
    headOffZ: -0.35,
    headOffY: -0.2,
    hasBeak: true,
    hasWattle: true,
    hasComb: true,
    hasTail: true,
    tailColor: 0xf8f8f8,
    drops: [{ item: 275, count: [0, 2] }, { item: 270, count: [1, 1] }], // feather + raw chicken
    soundChance: 0.0008,
    layEggChance: 0.00005, // chance per tick to lay an egg
  },



  slime: {
    name: 'Slime',
    hp: 16,
    hostile: true,
    hostileAtNight: true,
    bodyW: 1.0, bodyH: 1.0, bodyD: 1.0,
    headW: 1.0, headH: 1.0, headD: 1.0,
    legW: 0.0, legH: 0.0, legD: 0.0, // no legs
    headOffY: 0,
    bodyColor: 0x40c040,
    headColor: 0x40c040,
    legColor: 0x40c040,
    hasEyes: true,
    eyeColor: 0x111111,
    isSlime: true,
    splitCount: 2, // splits into 2 smaller slimes
    attackDamage: 4,
    drops: [{ item: 315, count: [0, 2] }], // slimeball
    soundChance: 0.0004,
  },

};

const MOB_SPAWN_BIOMES = new Set([
  BIOMES.PLAINS, BIOMES.FOREST, BIOMES.BIRCH_FOREST,
  BIOMES.SAVANNA, BIOMES.TAIGA, BIOMES.SNOWY,
  BIOMES.DARK_FOREST, BIOMES.SWAMP,
]);

const BIOMES_SPAWN_MIN = 0;
const BIOMES_SPAWN_MAX = 1;
const DESERT_SPAWN_MIN = 0;
const DESERT_SPAWN_MAX = 1;
const SWAMP_SPAWN_MIN = 0;
const SWAMP_SPAWN_MAX = 1;
const MIN_SPAWN_DISTANCE = 8;
const MAX_MOBS_PER_CHUNK = 2;
const MAX_NIGHT_HOSTILES = 12;   // cap on hostiles spawned by the night pass
const NIGHT_SPAWN_INTERVAL = 4;  // seconds between night spawn attempts

const WALK_SPEED = 1.2;
const MAX_WANDER_DIST = 24;
const CULL_DIST = CHUNK_SIZE * 8;

// ── deterministic PRNG for spawning ─────────────────────────────────
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ── Mob class ────────────────────────────────────────────────────────
class Mob {
  constructor(type, x, y, z) {
    this.type = type;
    const def = MOB_TYPES[type];
    this.hp = def.hp;
    this.maxHp = def.hp;
    this.position = new THREE.Vector3(x, y, z);
    this.velocity = new THREE.Vector3();
    this.yaw = Math.random() * Math.PI * 2;
    this.spawnPos = new THREE.Vector3(x, y, z);

    // AI state
    this.state = 'idle';
    this.stateTimer = 2 + Math.random() * 5;
    this.targetYaw = this.yaw;

    // visual feedback
    this.hurtTimer = 0;
    this.dead = false;
    this.deathTimer = 0; // death animation timer (0 = no animation)
    this.aggro = false; // true when provoked (hit by player)
    this.walkPhase = Math.random() * Math.PI * 2;
    this.legs = [];
    // Attack animation state
    this.attackAnim = 0; // arm swing progress (0 = idle, 1 = peak)
    // Creeper-specific state
    this.fusing = false;
    this.fuseTimer = 0;
    this.exploded = false;
    this._fuseFlashPhase = 0;
    this._fuseSwell = 0; // body swell during fuse
    this.mesh = this._buildMesh(def);
    this.mesh.position.copy(this.position);

    // Cache all materials for fast hurt/flash (avoids mesh.traverse)
    this._allMats = [];
    this._savedColors = [];
    this.mesh.traverse((child) => {
      if (child.isMesh && child.material) {
        const mats = Array.isArray(child.material) ? child.material : [child.material];
        for (const m of mats) {
          this._allMats.push(m);
          this._savedColors.push(m.color.getHex());
        }
      }
    });

    // Store original body/head positions for bobbing
    this._origBodyY = 0;
    this._origHeadY = 0;
    this.mesh.children.forEach(child => {
      if (child.name === 'body') this._origBodyY = child.position.y;
      if (child.name === 'head') this._origHeadY = child.position.y;
    });
  }

  // ── Canvas texture helpers ──────────────────────────────────────────
  _tex(w, h, fn) {
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const ctx = c.getContext('2d');
    fn(ctx, w, h);
    const t = new THREE.CanvasTexture(c);
    t.magFilter = THREE.NearestFilter;
    t.minFilter = THREE.NearestFilter;
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }

  _fillTex(ctx, w, h, base) {
    const id = ctx.createImageData(w, h);
    const m = hexToRgb(base);
    const d = id.data;
    for (let i = 0; i < d.length; i += 4) { d[i] = m[0]; d[i+1] = m[1]; d[i+2] = m[2]; d[i+3] = 255; }
    ctx.putImageData(id, 0, 0);
  }

  _noiseTex(ctx, w, h, base, variance) {
    const id = ctx.createImageData(w, h);
    const d = id.data;
    const r0 = (base >> 16) & 0xff, g0 = (base >> 8) & 0xff, b0 = base & 0xff;
    for (let i = 0; i < d.length; i += 4) {
      const v = ((Math.random() - 0.5) * variance * 2) | 0;
      d[i]   = Math.min(255, Math.max(0, r0 + v));
      d[i+1] = Math.min(255, Math.max(0, g0 + v));
      d[i+2] = Math.min(255, Math.max(0, b0 + v));
      d[i+3] = 255;
    }
    ctx.putImageData(id, 0, 0);
  }

  _boxMats(textures) {
    return textures.map(t => new THREE.MeshLambertMaterial({ map: t }));
  }

  _buildMesh(def) {
    const group = new THREE.Group();
    const tex = def._tex || this._mobTextures(def);

    // Cache textures on the MOB_TYPES definition so all mobs of same type share textures
    if (!def._tex) def._tex = tex;

    // ── Body ──
    const bodyGeo = new THREE.BoxGeometry(def.bodyW, def.bodyH, def.bodyD);
    const body = new THREE.Mesh(bodyGeo, this._boxMats(tex.body));
    body.position.y = def.legH + def.bodyH / 2;
    body.name = 'body';
    group.add(body);

    // ── Head ──
    const headGeo = new THREE.BoxGeometry(def.headW, def.headH, def.headD);
    const head = new THREE.Mesh(headGeo, this._boxMats(tex.head));
    const headOffY = def.headOffY != null ? def.headOffY : 0;
    const headY = def.legH + def.bodyH + def.headH / 2 - 0.02 + headOffY;
    const headOffZ = def.headOffZ != null ? def.headOffZ : 0;
    // Centered on body by default; headOffZ pushes head forward (negative = forward)
    const headZ = headOffZ;
    head.position.set(0, headY, headZ);
    head.name = 'head';
    group.add(head);

    // ── Pig snout ──
    if (def.hasSnout) {
      const snoutGeo = new THREE.BoxGeometry(def.snoutW, def.snoutH, def.snoutD);
      const snout = new THREE.Mesh(snoutGeo, this._boxMats(tex.snout));
      snout.position.set(0, headY - def.headH * 0.15, headZ - def.headD / 2 - def.snoutD / 2);
      snout.name = 'snout';
      group.add(snout);
    }

    // ── Cow horns ──
    if (def.hasHorns) {
      const hornGeo = new THREE.BoxGeometry(0.1, 0.2, 0.1);
      const hornMat = new THREE.MeshLambertMaterial({ color: 0xf5f0e0 });
      for (const side of [-1, 1]) {
        const horn = new THREE.Mesh(hornGeo, hornMat);
        horn.position.set(side * def.headW * 0.38, headY + def.headH * 0.55, headZ);
        horn.rotation.z = side * -0.3;
        horn.name = 'horn';
        group.add(horn);
      }
    }

    // ── Cow ears ──
    if (def.hasEars) {
      const earGeo = new THREE.BoxGeometry(0.06, 0.14, 0.18);
      const earMat = new THREE.MeshLambertMaterial({ color: def.headColor });
      for (const side of [-1, 1]) {
        const ear = new THREE.Mesh(earGeo, earMat);
        ear.position.set(side * def.headW * 0.52, headY + def.headH * 0.15, headZ);
        ear.rotation.z = side * 0.4;
        ear.name = 'ear';
        group.add(ear);
      }
    }

    // ── Pig ears ──
    if (def.hasPigEars) {
      const earGeo = new THREE.BoxGeometry(0.14, 0.22, 0.06);
      const earMat = new THREE.MeshLambertMaterial({ color: 0xe08888 });
      for (const side of [-1, 1]) {
        const ear = new THREE.Mesh(earGeo, earMat);
        ear.position.set(side * def.headW * 0.42, headY + def.headH * 0.5, headZ + 0.1);
        ear.rotation.z = side * 0.5;
        ear.rotation.x = -0.3;
        ear.name = 'ear';
        group.add(ear);
      }
    }

    // ── Tail ──
    if (def.hasTail) {
      const tailGeo = new THREE.BoxGeometry(0.06, 0.06, 0.22);
      const tailMat = new THREE.MeshLambertMaterial({ color: def.tailColor || def.bodyColor });
      const tail = new THREE.Mesh(tailGeo, tailMat);
      tail.position.set(0, def.legH + def.bodyH * 0.65, def.bodyD / 2 + 0.1);
      tail.rotation.x = 0.4;
      tail.name = 'tail';
      group.add(tail);
    }

    // ── Legs (2 bipedal or 4 quadruped or 8 for spiders, pivoting from hip) ──
    // Skip legs for mobs with no legs (e.g. slime)
    if (def.legW > 0 && def.legH > 0) {
      const legGeo = new THREE.BoxGeometry(def.legW, def.legH, def.legD);
      const legMats = this._boxMats(tex.leg);
      let legPositions;
      if (def.legPositions) {
        legPositions = def.legPositions;
      } else if (def.bipedalLegs) {
        const lx = def.bodyW * 0.32;
        legPositions = [[-lx, 0], [lx, 0]];
      } else if (def.has8Legs) {
        const lx = def.bodyW * 0.32;
        const lz = def.bodyD * 0.3;
        legPositions = [];
        for (let i = 0; i < 4; i++) {
          const zOff = -lz + (def.bodyD * 0.6) * (i / 3);
          legPositions.push([-lx, zOff]);
          legPositions.push([lx, zOff]);
        }
      } else {
        const lx = def.bodyW * 0.32;
        const lz = def.bodyD * 0.3;
        legPositions = [[-lx, -lz], [lx, -lz], [-lx, lz], [lx, lz]];
      }
      for (const [sx, sz] of legPositions) {
        const pivot = new THREE.Group();
        pivot.position.set(sx, def.legH, sz);
        const leg = new THREE.Mesh(legGeo, legMats);
        leg.position.y = -def.legH / 2;
        leg.name = 'leg';
        pivot.add(leg);
        group.add(pivot);
        this.legs.push(pivot);
      }
    }

    // ── Bipedal arms (zombie/skeleton use arm textures, villager uses hasArms) ──
    if (def.bipedalLegs && tex.arm && !def.hasArms) {
      const armW = def.legW * 1.1;
      const armH = def.bodyH * 0.85;
      const armD = def.legD * 1.1;
      const armGeo = new THREE.BoxGeometry(armW, armH, armD);
      const armMats = this._boxMats(tex.arm);
      for (const side of [-1, 1]) {
        const pivot = new THREE.Group();
        pivot.position.set(side * (def.bodyW / 2 + armW / 2), def.legH + def.bodyH - 0.04, 0);
        const arm = new THREE.Mesh(armGeo, armMats);
        arm.position.y = -armH / 2;
        arm.name = 'arm';
        pivot.add(arm);
        group.add(pivot);
        this.legs.push(pivot);
      }
    }

    // ── Villager arms ──
    if (def.hasArms) {
      const armGeo = new THREE.BoxGeometry(def.armW, def.armH, def.armD);
      const armMat = new THREE.MeshLambertMaterial({ color: def.armColor || def.bodyColor });
      for (const side of [-1, 1]) {
        const pivot = new THREE.Group();
        pivot.position.set(side * (def.bodyW / 2 + def.armW / 2), def.legH + def.bodyH - 0.05, 0);
        const arm = new THREE.Mesh(armGeo, armMat);
        arm.position.y = -def.armH / 2;
        arm.name = 'arm';
        pivot.add(arm);
        group.add(pivot);
        this.legs.push(pivot); // reuse legs array for walk animation
      }
    }

    // ── Villager hood ──
    if (def.hasHood) {
      const hoodGeo = new THREE.BoxGeometry(def.headW + 0.06, def.headH + 0.06, def.headD + 0.06);
      const hoodMat = new THREE.MeshLambertMaterial({ color: def.hoodColor || 0x5D503D });
      const hood = new THREE.Mesh(hoodGeo, hoodMat);
      hood.position.set(0, headY + 0.04, 0.03);
      hood.name = 'hood';
      group.add(hood);
    }

    // ── Villager belt ──
    if (def.hasBelt) {
      const beltGeo = new THREE.BoxGeometry(def.bodyW + 0.02, 0.06, def.bodyD + 0.02);
      const beltMat = new THREE.MeshLambertMaterial({ color: def.beltColor || 0x4E3523 });
      const belt = new THREE.Mesh(beltGeo, beltMat);
      belt.position.y = def.legH + def.bodyH * 0.1;
      belt.name = 'belt';
      group.add(belt);
    }

    // ── Villager satchel ──
    if (def.hasSatchel) {
      const satchelGeo = new THREE.BoxGeometry(0.25, 0.3, 0.12);
      const satchelMat = new THREE.MeshLambertMaterial({ color: def.satchelColor || 0x71563A });
      const satchel = new THREE.Mesh(satchelGeo, satchelMat);
      satchel.position.set(def.bodyW / 2 + 0.12, def.legH + def.bodyH * 0.3, 0.15);
      satchel.name = 'satchel';
      group.add(satchel);
    }

    // ── Villager beard ──
    if (def.hasBeard) {
      const beardGeo = new THREE.BoxGeometry(0.25, 0.18, 0.06);
      const beardMat = new THREE.MeshLambertMaterial({ color: def.beardColor || 0x8B7355 });
      const beard = new THREE.Mesh(beardGeo, beardMat);
      beard.position.set(0, headY - def.headH * 0.35, headZ - def.headD / 2 - 0.03);
      beard.name = 'beard';
      group.add(beard);
    }

    return group;
  }

  // ── Texture generation per mob type ──────────────────────────────────
  _mobTextures(def) {
    if (this.type === 'cow') return this._cowTextures(def);
    if (this.type === 'pig') return this._pigTextures(def);
    if (this.type === 'sheep') return this._sheepTextures(def);
    if (this.type === 'chicken') return this._chickenTextures(def);
    if (this.type === 'spider') return this._spiderTextures(def);
    if (this.type === 'zombie') return this._zombieTextures(def);
    if (this.type === 'skeleton') return this._skeletonTextures(def);
    if (this.type === 'creeper') return this._creeperTextures(def);
    if (this.type === 'enderman') return this._endermanTextures(def);
    if (this.type === 'slime') return this._slimeTextures(def);
    if (this.type === 'villager') return this._villagerTextures(def);
    return this._genericTextures(def);
  }

  _cowTextures(def) {
    const s = 64;
    const BROWN = 0x7a4a2e, DARK_BROWN = 0x5a3520, TAN = 0x9c6f52, WHITE = 0xf8f0e8, 
          BLACK = 0x222222, PINK = 0xd8a0a0;

    const bodySide = this._tex(s, s, (ctx) => {
      // Base gradient
      const grad = ctx.createLinearGradient(0, 0, 0, s);
      grad.addColorStop(0, `rgb(${(BROWN>>16)&0xff},${(BROWN>>8)&0xff},${BROWN&0xff})`);
      grad.addColorStop(1, `rgb(${(DARK_BROWN>>16)&0xff},${(DARK_BROWN>>8)&0xff},${DARK_BROWN&0xff})`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, s, s);
      
      // Noise texture
      this._noiseTex(ctx, s, s, BROWN, 20);
      
      // Large white spots with soft edges
      const spots = [
        { x: 8, y: 12, w: 20, h: 16 },
        { x: 40, y: 24, w: 18, h: 20 },
        { x: 4, y: 36, w: 12, h: 12 },
        { x: 36, y: 8, w: 14, h: 10 }
      ];
      
      ctx.fillStyle = `rgb(${(WHITE>>16)&0xff},${(WHITE>>8)&0xff},${WHITE&0xff})`;
      spots.forEach(spot => {
        ctx.beginPath();
        ctx.ellipse(spot.x + spot.w/2, spot.y + spot.h/2, spot.w/2, spot.h/2, 0, 0, Math.PI*2);
        ctx.fill();
      });
      
      // Add subtle shading to spots
      ctx.fillStyle = 'rgba(0,0,0,0.1)';
      spots.forEach(spot => {
        ctx.beginPath();
        ctx.ellipse(spot.x + spot.w/2 + 2, spot.y + spot.h/2 + 2, spot.w/2.2, spot.h/2.2, 0, 0, Math.PI*2);
        ctx.fill();
      });
    });

    const bodyTop = this._tex(s, s, (ctx) => {
      const grad = ctx.createLinearGradient(0, 0, s, s);
      grad.addColorStop(0, `rgb(${(BROWN>>16)&0xff + 20},${(BROWN>>8)&0xff + 20},${(BROWN&0xff) + 20})`);
      grad.addColorStop(1, `rgb(${(BROWN>>16)&0xff},${(BROWN>>8)&0xff},${BROWN&0xff})`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, BROWN, 15);
    });

    const bodyBot = this._tex(s, s, (ctx) => {
      const grad = ctx.createLinearGradient(0, 0, 0, s);
      grad.addColorStop(0, `rgb(${(TAN>>16)&0xff},${(TAN>>8)&0xff},${TAN&0xff})`);
      grad.addColorStop(1, `rgb(${(TAN>>16)&0xff - 20},${(TAN>>8)&0xff - 20},${TAN&0xff - 20})`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, TAN, 12);
    });

    const bodyFront = this._tex(s, s, (ctx) => {
      ctx.fillStyle = `rgb(${(BROWN>>16)&0xff},${(BROWN>>8)&0xff},${BROWN&0xff})`;
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, BROWN, 18);
      
      // Udder hint (soft pink)
      ctx.fillStyle = `rgba(${(PINK>>16)&0xff},${(PINK>>8)&0xff},${PINK&0xff},0.6)`;
      ctx.beginPath();
      ctx.ellipse(32, 56, 20, 8, 0, 0, Math.PI*2);
      ctx.fill();
    });

    const headSide = this._tex(s, s, (ctx) => {
      const grad = ctx.createLinearGradient(0, 0, 0, s);
      grad.addColorStop(0, `rgb(${(TAN>>16)&0xff + 10},${(TAN>>8)&0xff + 10},${TAN&0xff + 10})`);
      grad.addColorStop(1, `rgb(${(TAN>>16)&0xff},${(TAN>>8)&0xff},${TAN&0xff})`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, TAN, 15);
    });

    const headTop = this._tex(s, s, (ctx) => {
      ctx.fillStyle = `rgb(${(TAN>>16)&0xff + 15},${(TAN>>8)&0xff + 15},${TAN&0xff + 15})`;
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, TAN, 10);
    });

    const headBot = this._tex(s, s, (ctx) => {
      ctx.fillStyle = `rgb(${(TAN>>16)&0xff - 10},${(TAN>>8)&0xff - 10},${TAN&0xff - 10})`;
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, TAN, 10);
    });

    const headFront = this._tex(s, s, (ctx) => {
      const grad = ctx.createLinearGradient(0, 0, 0, s);
      grad.addColorStop(0, `rgb(${(TAN>>16)&0xff + 15},${(TAN>>8)&0xff + 15},${TAN&0xff + 15})`);
      grad.addColorStop(1, `rgb(${(TAN>>16)&0xff - 5},${(TAN>>8)&0xff - 5},${TAN&0xff - 5})`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, TAN, 12);
      
      // Detailed eyes
      const eyeY = 20;
      // Left eye
      ctx.fillStyle = '#fff';
      ctx.fillRect(10, eyeY, 14, 12);
      ctx.fillStyle = '#111';
      ctx.fillRect(14, eyeY + 2, 8, 10);
      ctx.fillStyle = '#fff';
      ctx.fillRect(16, eyeY + 3, 3, 3);
      ctx.fillRect(19, eyeY + 6, 2, 2);
      
      // Right eye
      ctx.fillStyle = '#fff';
      ctx.fillRect(40, eyeY, 14, 12);
      ctx.fillStyle = '#111';
      ctx.fillRect(44, eyeY + 2, 8, 10);
      ctx.fillStyle = '#fff';
      ctx.fillRect(46, eyeY + 3, 3, 3);
      ctx.fillRect(49, eyeY + 6, 2, 2);
      
      // Nose/muzzle
      ctx.fillStyle = `rgb(${(DARK_BROWN>>16)&0xff},${(DARK_BROWN>>8)&0xff},${DARK_BROWN&0xff})`;
      ctx.beginPath();
      ctx.ellipse(32, 48, 18, 12, 0, 0, Math.PI*2);
      ctx.fill();
      
      // Nostrils
      ctx.fillStyle = '#1a1a1a';
      ctx.beginPath();
      ctx.ellipse(24, 48, 4, 5, 0, 0, Math.PI*2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(40, 48, 4, 5, 0, 0, Math.PI*2);
      ctx.fill();
      
      // Nostril highlights
      ctx.fillStyle = '#444';
      ctx.beginPath();
      ctx.ellipse(23, 46, 2, 2, 0, 0, Math.PI*2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(39, 46, 2, 2, 0, 0, Math.PI*2);
      ctx.fill();
    });

    const headBack = this._tex(s, s, (ctx) => {
      ctx.fillStyle = `rgb(${(TAN>>16)&0xff},${(TAN>>8)&0xff},${TAN&0xff})`;
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, TAN, 12);
    });

    const legTex = this._tex(s, s, (ctx) => {
      const grad = ctx.createLinearGradient(0, 0, 0, s);
      grad.addColorStop(0, `rgb(${(DARK_BROWN>>16)&0xff + 10},${(DARK_BROWN>>8)&0xff + 10},${DARK_BROWN&0xff + 10})`);
      grad.addColorStop(1, `rgb(${(DARK_BROWN>>16)&0xff - 10},${(DARK_BROWN>>8)&0xff - 10},${DARK_BROWN&0xff - 10})`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, DARK_BROWN, 15);
      
      // Hooves
      ctx.fillStyle = '#2a1a10';
      ctx.fillRect(0, 52, s, 12);
      ctx.fillStyle = '#3a2a20';
      ctx.fillRect(0, 50, s, 4);
    });

    const body = [bodySide, bodySide, bodyTop, bodyBot, bodyFront, bodyFront];
    // BoxGeometry face order: +X, -X, +Y, -Y, +Z, -Z. Head faces -Z (forward),
    // so the -Z face (index 5) needs headFront and +Z (index 4) needs headBack to fix backwards face.
    const head = [headSide, headSide, headTop, headBot, headBack, headFront];
    return { body, head, leg: [legTex, legTex, legTex, legTex, legTex, legTex] };
  }

  _pigTextures(def) {
    const s = 64;
    const PINK = 0xf5b5b5, DARK_PINK = 0xe8a0a0, SNOUT_PINK = 0xf0c0c0, 
          DARK_SNOUT = 0xd89090, BLACK = 0x222222;

    const bodySide = this._tex(s, s, (ctx) => {
      const grad = ctx.createLinearGradient(0, 0, 0, s);
      grad.addColorStop(0, `rgb(${(PINK>>16)&0xff + 5},${(PINK>>8)&0xff + 5},${PINK&0xff + 5})`);
      grad.addColorStop(1, `rgb(${(DARK_PINK>>16)&0xff},${(DARK_PINK>>8)&0xff},${DARK_PINK&0xff})`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, PINK, 18);
      
      // Subtle skin texture (freckles)
      ctx.fillStyle = 'rgba(200,120,120,0.3)';
      for (let i = 0; i < 40; i++) {
        const x = Math.random() * s;
        const y = Math.random() * s;
        ctx.beginPath();
        ctx.arc(x, y, 1 + Math.random() * 1.5, 0, Math.PI*2);
        ctx.fill();
      }
    });

    const bodyTop = this._tex(s, s, (ctx) => {
      ctx.fillStyle = `rgb(${(PINK>>16)&0xff + 10},${(PINK>>8)&0xff + 10},${PINK&0xff + 10})`;
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, PINK, 12);
    });

    const bodyBot = this._tex(s, s, (ctx) => {
      ctx.fillStyle = `rgb(${(DARK_PINK>>16)&0xff},${(DARK_PINK>>8)&0xff},${DARK_PINK&0xff})`;
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, DARK_PINK, 10);
    });

    const bodyFront = this._tex(s, s, (ctx) => {
      ctx.fillStyle = `rgb(${(PINK>>16)&0xff},${(PINK>>8)&0xff},${PINK&0xff})`;
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, PINK, 15);
    });

    const headSide = this._tex(s, s, (ctx) => {
      const grad = ctx.createLinearGradient(0, 0, 0, s);
      grad.addColorStop(0, `rgb(${(PINK>>16)&0xff + 8},${(PINK>>8)&0xff + 8},${PINK&0xff + 8})`);
      grad.addColorStop(1, `rgb(${(PINK>>16)&0xff},${(PINK>>8)&0xff},${PINK&0xff})`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, PINK, 12);
    });

    const headTop = this._tex(s, s, (ctx) => {
      ctx.fillStyle = `rgb(${(PINK>>16)&0xff + 12},${(PINK>>8)&0xff + 12},${PINK&0xff + 12})`;
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, PINK, 10);
    });

    const headBot = this._tex(s, s, (ctx) => {
      ctx.fillStyle = `rgb(${(PINK>>16)&0xff - 5},${(PINK>>8)&0xff - 5},${PINK&0xff - 5})`;
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, PINK, 10);
    });

    const headFront = this._tex(s, s, (ctx) => {
      const grad = ctx.createLinearGradient(0, 0, 0, s);
      grad.addColorStop(0, `rgb(${(PINK>>16)&0xff + 10},${(PINK>>8)&0xff + 10},${PINK&0xff + 10})`);
      grad.addColorStop(1, `rgb(${(PINK>>16)&0xff},${(PINK>>8)&0xff},${PINK&0xff})`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, PINK, 12);
      
      // Cute eyes
      const eyeY = 18;
      // Left eye
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.ellipse(14, eyeY, 10, 9, 0, 0, Math.PI*2);
      ctx.fill();
      ctx.fillStyle = '#111';
      ctx.beginPath();
      ctx.ellipse(16, eyeY + 1, 6, 7, 0, 0, Math.PI*2);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.fillRect(17, eyeY, 3, 3);
      ctx.fillRect(20, eyeY + 3, 2, 2);
      
      // Right eye
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.ellipse(50, eyeY, 10, 9, 0, 0, Math.PI*2);
      ctx.fill();
      ctx.fillStyle = '#111';
      ctx.beginPath();
      ctx.ellipse(48, eyeY + 1, 6, 7, 0, 0, Math.PI*2);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.fillRect(45, eyeY, 3, 3);
      ctx.fillRect(42, eyeY + 3, 2, 2);
      
      // Eyebrows
      ctx.fillStyle = 'rgba(180,100,100,0.5)';
      ctx.fillRect(8, 10, 14, 3);
      ctx.fillRect(42, 10, 14, 3);
      
      // Snout base
      ctx.fillStyle = `rgb(${(SNOUT_PINK>>16)&0xff},${(SNOUT_PINK>>8)&0xff},${SNOUT_PINK&0xff})`;
      ctx.beginPath();
      ctx.ellipse(32, 44, 20, 14, 0, 0, Math.PI*2);
      ctx.fill();
    });

    const headBack = this._tex(s, s, (ctx) => {
      ctx.fillStyle = `rgb(${(PINK>>16)&0xff},${(PINK>>8)&0xff},${PINK&0xff})`;
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, PINK, 12);
    });

    const legTex = this._tex(s, s, (ctx) => {
      const grad = ctx.createLinearGradient(0, 0, 0, s);
      grad.addColorStop(0, `rgb(${(DARK_PINK>>16)&0xff + 5},${(DARK_PINK>>8)&0xff + 5},${DARK_PINK&0xff + 5})`);
      grad.addColorStop(1, `rgb(${(DARK_PINK>>16)&0xff - 10},${(DARK_PINK>>8)&0xff - 10},${DARK_PINK&0xff - 10})`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, DARK_PINK, 12);
      
      // Trotters
      ctx.fillStyle = '#c07070';
      ctx.fillRect(0, 50, s, 14);
      ctx.fillStyle = '#a06060';
      ctx.fillRect(0, 48, s, 4);
    });

    const snoutTex = this._tex(s, s, (ctx) => {
      const grad = ctx.createRadialGradient(32, 32, 5, 32, 32, 40);
      grad.addColorStop(0, `rgb(${(SNOUT_PINK>>16)&0xff},${(SNOUT_PINK>>8)&0xff},${SNOUT_PINK&0xff})`);
      grad.addColorStop(1, `rgb(${(DARK_SNOUT>>16)&0xff},${(DARK_SNOUT>>8)&0xff},${DARK_SNOUT&0xff})`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, SNOUT_PINK, 10);
      
      // Large detailed nostrils
      ctx.fillStyle = '#4a2a2a';
      ctx.beginPath();
      ctx.ellipse(20, 32, 8, 10, 0, 0, Math.PI*2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(44, 32, 8, 10, 0, 0, Math.PI*2);
      ctx.fill();
      
      // Nostril highlights
      ctx.fillStyle = '#6a4a4a';
      ctx.beginPath();
      ctx.ellipse(18, 30, 3, 4, 0, 0, Math.PI*2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(42, 30, 3, 4, 0, 0, Math.PI*2);
      ctx.fill();
      
      // Nostril depth
      ctx.fillStyle = '#2a1a1a';
      ctx.beginPath();
      ctx.ellipse(20, 34, 5, 6, 0, 0, Math.PI*2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(44, 34, 5, 6, 0, 0, Math.PI*2);
      ctx.fill();
    });

    const body = [bodySide, bodySide, bodyTop, bodyBot, bodyFront, bodyFront];
    const head = [headSide, headSide, headTop, headBot, headBack, headFront];
    const snout = [snoutTex, snoutTex, snoutTex, snoutTex, snoutTex, snoutTex];
    return { body, head, leg: [legTex, legTex, legTex, legTex, legTex, legTex], snout };
  }

  _sheepTextures(def) {
    const s = 64;
    const WOOL = 0xf5f5f5, WOOL_SHADOW = 0xd8d8d8, WOOL_HIGHLIGHT = 0xffffff,
          FACE = 0x8a8a8a, DARK_FACE = 0x6a6a6a, BLACK = 0x222222;

    const bodySide = this._tex(s, s, (ctx) => {
      // Base wool gradient
      const grad = ctx.createLinearGradient(0, 0, 0, s);
      grad.addColorStop(0, `rgb(${(WOOL_HIGHLIGHT>>16)&0xff},${(WOOL_HIGHLIGHT>>8)&0xff},${WOOL_HIGHLIGHT&0xff})`);
      grad.addColorStop(1, `rgb(${(WOOL_SHADOW>>16)&0xff},${(WOOL_SHADOW>>8)&0xff},${WOOL_SHADOW&0xff})`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, s, s);
      
      this._noiseTex(ctx, s, s, WOOL, 15);
      
      // Wool curls (textured bumps)
      for (let i = 0; i < 35; i++) {
        const x = Math.random() * s;
        const y = Math.random() * s;
        const r = 4 + Math.random() * 6;
        
        // Highlight
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.beginPath();
        ctx.ellipse(x, y, r, r*0.8, 0, 0, Math.PI*2);
        ctx.fill();
        
        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.15)';
        ctx.beginPath();
        ctx.ellipse(x + 2, y + 2, r*0.8, r*0.6, 0, 0, Math.PI*2);
        ctx.fill();
      }
    });

    const bodyTop = this._tex(s, s, (ctx) => {
      const grad = ctx.createLinearGradient(0, 0, s, s);
      grad.addColorStop(0, `rgb(${(WOOL_HIGHLIGHT>>16)&0xff},${(WOOL_HIGHLIGHT>>8)&0xff},${WOOL_HIGHLIGHT&0xff})`);
      grad.addColorStop(0.5, `rgb(${(WOOL>>16)&0xff},${(WOOL>>8)&0xff},${WOOL&0xff})`);
      grad.addColorStop(1, `rgb(${(WOOL_SHADOW>>16)&0xff},${(WOOL_SHADOW>>8)&0xff},${WOOL_SHADOW&0xff})`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, WOOL, 12);
      
      // Add some wool bumps on top
      for (let i = 0; i < 25; i++) {
        const x = Math.random() * s;
        const y = Math.random() * s;
        const r = 3 + Math.random() * 5;
        ctx.fillStyle = 'rgba(255,255,255,0.35)';
        ctx.beginPath();
        ctx.ellipse(x, y, r, r*0.7, 0, 0, Math.PI*2);
        ctx.fill();
      }
    });

    const bodyBot = this._tex(s, s, (ctx) => {
      ctx.fillStyle = `rgb(${(WOOL_SHADOW>>16)&0xff},${(WOOL_SHADOW>>8)&0xff},${WOOL_SHADOW&0xff})`;
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, WOOL_SHADOW, 10);
    });

    const bodyFront = this._tex(s, s, (ctx) => {
      ctx.fillStyle = `rgb(${(WOOL>>16)&0xff},${(WOOL>>8)&0xff},${WOOL&0xff})`;
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, WOOL, 12);
      
      // Front wool curls
      for (let i = 0; i < 30; i++) {
        const x = Math.random() * s;
        const y = Math.random() * s;
        const r = 3 + Math.random() * 5;
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.beginPath();
        ctx.ellipse(x, y, r, r*0.75, 0, 0, Math.PI*2);
        ctx.fill();
      }
    });

    const headSide = this._tex(s, s, (ctx) => {
      const grad = ctx.createLinearGradient(0, 0, 0, s);
      grad.addColorStop(0, `rgb(${(FACE>>16)&0xff + 10},${(FACE>>8)&0xff + 10},${FACE&0xff + 10})`);
      grad.addColorStop(1, `rgb(${(DARK_FACE>>16)&0xff},${(DARK_FACE>>8)&0xff},${DARK_FACE&0xff})`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, FACE, 12);
    });

    const headTop = this._tex(s, s, (ctx) => {
      ctx.fillStyle = `rgb(${(FACE>>16)&0xff + 15},${(FACE>>8)&0xff + 15},${FACE&0xff + 15})`;
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, FACE, 10);
    });

    const headBot = this._tex(s, s, (ctx) => {
      ctx.fillStyle = `rgb(${(DARK_FACE>>16)&0xff},${(DARK_FACE>>8)&0xff},${DARK_FACE&0xff})`;
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, DARK_FACE, 10);
    });

    const headFront = this._tex(s, s, (ctx) => {
      const grad = ctx.createLinearGradient(0, 0, 0, s);
      grad.addColorStop(0, `rgb(${(FACE>>16)&0xff + 15},${(FACE>>8)&0xff + 15},${FACE&0xff + 15})`);
      grad.addColorStop(1, `rgb(${(DARK_FACE>>16)&0xff},${(DARK_FACE>>8)&0xff},${DARK_FACE&0xff})`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, FACE, 12);
      
      // Expressive sheep eyes
      const eyeY = 22;
      
      // Left eye (white part)
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.ellipse(14, eyeY, 12, 10, 0, 0, Math.PI*2);
      ctx.fill();
      
      // Left pupil
      ctx.fillStyle = '#111';
      ctx.fillRect(10, eyeY - 2, 8, 12);
      
      // Left eye highlights
      ctx.fillStyle = '#fff';
      ctx.fillRect(12, eyeY - 1, 3, 4);
      ctx.fillRect(14, eyeY + 4, 2, 2);
      
      // Right eye (white part)
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.ellipse(50, eyeY, 12, 10, 0, 0, Math.PI*2);
      ctx.fill();
      
      // Right pupil
      ctx.fillStyle = '#111';
      ctx.fillRect(46, eyeY - 2, 8, 12);
      
      // Right eye highlights
      ctx.fillStyle = '#fff';
      ctx.fillRect(49, eyeY - 1, 3, 4);
      ctx.fillRect(47, eyeY + 4, 2, 2);
      
      // Ears on sides (visual hint)
      ctx.fillStyle = 'rgba(90,90,90,0.5)';
      ctx.beginPath();
      ctx.ellipse(4, eyeY, 6, 12, -0.3, 0, Math.PI*2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(60, eyeY, 6, 12, 0.3, 0, Math.PI*2);
      ctx.fill();
      
      // Nose/mouth
      ctx.fillStyle = '#555';
      ctx.beginPath();
      ctx.ellipse(32, 46, 10, 6, 0, 0, Math.PI*2);
      ctx.fill();
      
      // Nostrils
      ctx.fillStyle = '#333';
      ctx.beginPath();
      ctx.ellipse(28, 44, 3, 3, 0, 0, Math.PI*2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(36, 44, 3, 3, 0, 0, Math.PI*2);
      ctx.fill();
      
      // Mouth
      ctx.strokeStyle = '#444';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(28, 50);
      ctx.quadraticCurveTo(32, 54, 36, 50);
      ctx.stroke();
    });

    const headBack = this._tex(s, s, (ctx) => {
      ctx.fillStyle = `rgb(${(FACE>>16)&0xff},${(FACE>>8)&0xff},${FACE&0xff})`;
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, FACE, 12);
    });

    const legTex = this._tex(s, s, (ctx) => {
      const grad = ctx.createLinearGradient(0, 0, 0, s);
      grad.addColorStop(0, `rgb(${(DARK_FACE>>16)&0xff + 10},${(DARK_FACE>>8)&0xff + 10},${DARK_FACE&0xff + 10})`);
      grad.addColorStop(1, `rgb(${(DARK_FACE>>16)&0xff - 15},${(DARK_FACE>>8)&0xff - 15},${DARK_FACE&0xff - 15})`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, DARK_FACE, 15);
      
      // Hooves
      ctx.fillStyle = '#3a3a3a';
      ctx.fillRect(0, 50, s, 14);
      ctx.fillStyle = '#2a2a2a';
      ctx.fillRect(0, 48, s, 4);
    });

    const body = [bodySide, bodySide, bodyTop, bodyBot, bodyFront, bodyFront];
    const head = [headSide, headSide, headTop, headBot, headBack, headFront];
    return { body, head, leg: [legTex, legTex, legTex, legTex, legTex, legTex] };
  }

  _spiderTextures(def) {
    const s = 64;
    const BODY = 0x333333, BODY_DARK = 0x222222, LEG = 0x2a2a2a;

    const bodySide = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#333';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, BODY, 12);
      // Stripe pattern
      for (let i = 0; i < 4; i++) {
        const y = 8 + i * 14;
        ctx.fillStyle = 'rgba(60,20,20,0.3)';
        ctx.fillRect(0, y, s, 4);
      }
    });

    const bodyTop = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#3a3a3a';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, BODY, 10);
      // Red hourglass marking
      ctx.fillStyle = '#8b2020';
      ctx.beginPath();
      ctx.moveTo(28, 16); ctx.lineTo(36, 16); ctx.lineTo(32, 24);
      ctx.moveTo(28, 32); ctx.lineTo(36, 32); ctx.lineTo(32, 24);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(28, 32); ctx.lineTo(36, 32); ctx.lineTo(36, 40); ctx.lineTo(28, 40);
      ctx.fill();
    });

    const bodyBot = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#222';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, BODY_DARK, 8);
    });

    const bodyFront = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#2a2a2a';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, BODY_DARK, 10);
    });

    const headSide = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#333';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, BODY, 12);
    });

    const headTop = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#383838';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, BODY, 10);
    });

    const headBot = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#222';
      ctx.fillRect(0, 0, s, s);
    });

    const headFront = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#333';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, BODY, 10);
      // 8 red eyes (4 per side)
      const eyes = [
        [12, 14], [16, 10], [22, 10], [26, 14],
        [38, 14], [42, 10], [48, 10], [52, 14]
      ];
      for (const [ex, ey] of eyes) {
        ctx.fillStyle = '#cc2020';
        ctx.beginPath();
        ctx.ellipse(ex, ey, 3, 3, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ff4040';
        ctx.beginPath();
        ctx.ellipse(ex - 0.5, ey - 0.5, 1.5, 1.5, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      // Fangs
      ctx.fillStyle = '#eee';
      ctx.fillRect(18, 44, 3, 6);
      ctx.fillRect(43, 44, 3, 6);
    });

    const headBack = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#333';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, BODY, 10);
    });

    const legTex = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#2a2a2a';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, LEG, 10);
      // Leg segments
      ctx.fillStyle = 'rgba(80,40,40,0.3)';
      ctx.fillRect(0, 16, s, 2);
      ctx.fillRect(0, 32, s, 2);
    });

    const body = [bodySide, bodySide, bodyTop, bodyBot, bodyFront, bodyFront];
    const head = [headSide, headSide, headTop, headBot, headBack, headFront];
    return { body, head, leg: [legTex, legTex, legTex, legTex, legTex, legTex] };
  }

  _zombieTextures(def) {
    const s = 64;
    // Classic Minecraft zombie: teal skin, blue shirt, dark blue pants
    const SKIN = 0x5a9a7a;
    const SHIRT = 0x3a5a8a;
    const PANTS = 0x2a3a6a;

    // ── HEAD ──
    const skinSide = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#5a9a7a';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, SKIN, 12);
      // Hair strands on sides
      ctx.fillStyle = 'rgba(60,40,25,0.6)';
      ctx.fillRect(0, 0, s, 6);
      ctx.fillRect(0, 0, 4, s);
      ctx.fillRect(s - 4, 0, 4, s);
    });
    const skinTop = this._tex(s, s, (ctx) => {
      // Hair on top (dark brown)
      ctx.fillStyle = '#3a2515';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, 0x3a2515, 10);
    });
    const skinBot = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#5a9a7a';
      ctx.fillRect(0, 0, s, s);
    });
    const skinFront = this._tex(s, s, (ctx) => {
      // Face: teal skin
      ctx.fillStyle = '#5a9a7a';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, SKIN, 10);
      // Hair fringe on top
      ctx.fillStyle = '#3a2515';
      ctx.fillRect(0, 0, s, 8);
      ctx.fillRect(0, 0, 6, 18);
      ctx.fillRect(s - 6, 0, 6, 18);
      // Eyes: white sclera
      const eyeY = 20;
      ctx.fillStyle = '#fff';
      ctx.fillRect(8, eyeY, 18, 12);
      ctx.fillRect(38, eyeY, 18, 12);
      // Pupils (dark, staring)
      ctx.fillStyle = '#111';
      ctx.fillRect(14, eyeY + 3, 8, 7);
      ctx.fillRect(44, eyeY + 3, 8, 7);
      // Eye bags (sunken, undead look)
      ctx.fillStyle = 'rgba(40,70,55,0.5)';
      ctx.fillRect(8, eyeY + 10, 18, 4);
      ctx.fillRect(38, eyeY + 10, 18, 4);
      // Mouth (open, dark interior)
      ctx.fillStyle = '#1a0a05';
      ctx.fillRect(18, 42, 28, 14);
      // Teeth (top and bottom rows)
      ctx.fillStyle = '#ddd';
      for (let x = 18; x < 46; x += 6) {
        ctx.fillRect(x, 42, 3, 3);
        ctx.fillRect(x, 53, 3, 3);
      }
    });
    const skinBack = this._tex(s, s, (ctx) => {
      // Hair covers back of head
      ctx.fillStyle = '#3a2515';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, 0x3a2515, 10);
      // Neck exposed at bottom
      ctx.fillStyle = '#5a9a7a';
      ctx.fillRect(18, s - 12, 28, 12);
    });
    const head = [skinSide, skinSide, skinTop, skinBot, skinBack, skinFront];

    // ── BODY (blue shirt) ──
    const bodySide = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#3a5a8a';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, SHIRT, 14);
      // Torn shirt edges
      ctx.fillStyle = 'rgba(40,60,90,0.5)';
      ctx.fillRect(0, s * 0.65, s, s * 0.35);
      // Shirt seam
      ctx.fillStyle = 'rgba(30,50,80,0.3)';
      ctx.fillRect(s / 2 - 1, 0, 2, s);
    });
    const bodyTop = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#3a5a8a';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, SHIRT, 10);
    });
    const bodyBot = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#2a3a6a';
      ctx.fillRect(0, 0, s, s);
    });
    const bodyFront = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#3a5a8a';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, SHIRT, 12);
      // Collar / neckline
      ctx.fillStyle = '#5a9a7a';
      ctx.fillRect(20, 0, 24, 6);
      // Shirt buttons / center line
      ctx.fillStyle = 'rgba(30,50,80,0.4)';
      ctx.fillRect(30, 10, 4, 50);
    });
    const body = [bodySide, bodySide, bodyTop, bodyBot, bodyFront, bodyFront];

    // ── LEGS (dark blue pants) ──
    const legTex = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#2a3a6a';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, PANTS, 10);
      // Shoe at bottom (darker)
      ctx.fillStyle = '#1a2a4a';
      ctx.fillRect(0, s - 10, s, 10);
    });
    // Arms use same skin color as head
    const armTex = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#5a9a7a';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, SKIN, 10);
    });
    const arm = [armTex, armTex, armTex, armTex, armTex, armTex];
    const leg = [legTex, legTex, legTex, legTex, legTex, legTex];
    return { body, head, leg, arm };
  }

  _skeletonTextures(def) {
    const s = 64;
    const BONE = 0xe8e4d8;
    const BONE_LIGHT = 0xf0ece0;
    const BONE_DARK = 0xc8c4b8;

    // ── HEAD (skull) ──
    const boneSide = this._tex(s, s, (ctx) => {
      // Skull side — rounded bone shape
      ctx.fillStyle = '#e8e4d8';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, BONE, 10);
      // Temporal bone indent
      ctx.fillStyle = 'rgba(180,175,165,0.4)';
      ctx.fillRect(8, 16, 12, 20);
      ctx.fillRect(s - 20, 16, 12, 20);
      // Jaw line
      ctx.fillStyle = 'rgba(160,155,145,0.5)';
      ctx.fillRect(4, s - 18, s - 8, 3);
    });
    const boneTop = this._tex(s, s, (ctx) => {
      // Top of skull — smooth bone
      ctx.fillStyle = '#f0ece0';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, BONE_LIGHT, 8);
      // Cranial ridge
      ctx.fillStyle = 'rgba(200,195,185,0.4)';
      ctx.fillRect(s / 2 - 4, 0, 8, s);
    });
    const boneBot = this._tex(s, s, (ctx) => {
      // Bottom of skull / jaw
      ctx.fillStyle = '#d8d4c8';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, BONE_DARK, 8);
      // Jaw hinge points
      ctx.fillStyle = 'rgba(160,155,145,0.5)';
      ctx.fillRect(6, 10, 8, 8);
      ctx.fillRect(s - 14, 10, 8, 8);
    });
    const boneFront = this._tex(s, s, (ctx) => {
      // Skull face — detailed
      ctx.fillStyle = '#e8e4d8';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, BONE, 8);

      // Forehead / brow ridge
      ctx.fillStyle = 'rgba(200,195,185,0.5)';
      ctx.fillRect(0, 8, s, 6);

      // Eye sockets (deep, dark)
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(8, 18, 18, 16);
      ctx.fillRect(38, 18, 18, 16);
      // Inner eye shadow
      ctx.fillStyle = '#2a2a2a';
      ctx.fillRect(10, 20, 14, 12);
      ctx.fillRect(40, 20, 14, 12);
      // Tiny glowing pupils
      ctx.fillStyle = '#666';
      ctx.fillRect(16, 24, 4, 4);
      ctx.fillRect(46, 24, 4, 4);

      // Nose cavity (inverted triangle)
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(26, 34, 12, 8);
      ctx.fillStyle = '#222';
      ctx.fillRect(28, 36, 8, 6);

      // Cheekbones
      ctx.fillStyle = 'rgba(200,195,185,0.4)';
      ctx.fillRect(4, 28, 6, 12);
      ctx.fillRect(s - 10, 28, 6, 12);

      // Teeth row (upper)
      ctx.fillStyle = '#f5f0e5';
      ctx.fillRect(16, 44, 32, 6);
      // Tooth gaps
      ctx.fillStyle = '#1a1a1a';
      for (let x = 16; x < 48; x += 4) {
        ctx.fillRect(x, 44, 1, 6);
      }
      // Lower jaw
      ctx.fillStyle = '#ddd8c8';
      ctx.fillRect(14, 50, 36, 8);
      // Lower teeth
      ctx.fillStyle = '#f5f0e5';
      ctx.fillRect(16, 50, 32, 4);
      ctx.fillStyle = '#1a1a1a';
      for (let x = 16; x < 48; x += 4) {
        ctx.fillRect(x, 50, 1, 4);
      }
    });
    const boneBack = this._tex(s, s, (ctx) => {
      // Back of skull + spine
      ctx.fillStyle = '#e8e4d8';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, BONE, 8);
      // Occipital bone
      ctx.fillStyle = 'rgba(180,175,165,0.3)';
      ctx.fillRect(12, 8, s - 24, s - 16);
      // Spine (vertebrae)
      ctx.fillStyle = '#d0ccc0';
      ctx.fillRect(26, 0, 12, s);
      this._noiseTex(ctx, s, s, BONE_DARK, 6);
      // Individual vertebrae lines
      ctx.fillStyle = 'rgba(160,155,145,0.6)';
      for (let y = 0; y < s; y += 8) {
        ctx.fillRect(24, y, 16, 1);
      }
    });
    const head = [boneSide, boneSide, boneTop, boneBot, boneBack, boneFront];

    // ── BODY (ribcage) ──
    const bodyFront = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#e8e4d8';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, BONE, 8);
      // Sternum (center chest bone)
      ctx.fillStyle = '#d8d4c8';
      ctx.fillRect(28, 4, 8, 48);
      // Ribs (curved lines from sternum outward)
      ctx.strokeStyle = '#b8b4a8';
      ctx.lineWidth = 3;
      for (let y = 8; y < 52; y += 7) {
        // Left rib
        ctx.beginPath();
        ctx.moveTo(28, y);
        ctx.quadraticCurveTo(16, y + 2, 4, y + 4);
        ctx.stroke();
        // Right rib
        ctx.beginPath();
        ctx.moveTo(36, y);
        ctx.quadraticCurveTo(48, y + 2, 60, y + 4);
        ctx.stroke();
      }
      // Rib tips (lighter)
      ctx.fillStyle = '#f0ece0';
      for (let y = 10; y < 54; y += 7) {
        ctx.fillRect(2, y, 4, 2);
        ctx.fillRect(58, y, 4, 2);
      }
    });
    const bodySide = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#e8e4d8';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, BONE, 8);
      // Side ribs (curved)
      ctx.strokeStyle = '#b8b4a8';
      ctx.lineWidth = 3;
      for (let y = 8; y < 52; y += 7) {
        ctx.beginPath();
        ctx.moveTo(s, y);
        ctx.quadraticCurveTo(s / 2, y + 3, 0, y + 5);
        ctx.stroke();
      }
      // Spine visible on side edge
      ctx.fillStyle = '#d0ccc0';
      ctx.fillRect(s - 8, 0, 8, s);
    });
    const bodyTop = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#e8e4d8';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, BONE, 6);
      // Collar bones
      ctx.fillStyle = '#d8d4c8';
      ctx.fillRect(4, s / 2 - 2, s - 8, 4);
    });
    const bodyBot = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#d8d4c8';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, BONE_DARK, 6);
    });
    const body = [bodySide, bodySide, bodyTop, bodyBot, bodyFront, bodyFront];

    // ── LEGS (thin bone limbs) ──
    const legTex = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#e0dcd0';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, BONE, 8);
      // Knee joint
      ctx.fillStyle = '#d0ccc0';
      ctx.fillRect(0, s / 2 - 4, s, 8);
      // Shin bone detail
      ctx.fillStyle = 'rgba(180,175,165,0.4)';
      ctx.fillRect(s / 2 - 2, 0, 4, s);
    });
    const leg = [legTex, legTex, legTex, legTex, legTex, legTex];

    // ── ARMS (thin bone) ──
    const armTex = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#e0dcd0';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, BONE, 8);
      // Elbow joint
      ctx.fillStyle = '#d0ccc0';
      ctx.fillRect(0, s / 2 - 3, s, 6);
    });
    const arm = [armTex, armTex, armTex, armTex, armTex, armTex];
    return { body, head, leg, arm };
  }

  _creeperTextures(def) {
    const s = 64;
    const GREEN = 0x3baa3b;
    const GREEN_DARK = 0x2d8a2d;

    const greenSide = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#3baa3b';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, GREEN, 18);
      // Mottled darker patches
      ctx.fillStyle = 'rgba(30,100,30,0.3)';
      for (let i = 0; i < 6; i++) {
        const px = (i * 13 + 5) % s, py = (i * 17 + 8) % s;
        ctx.fillRect(px, py, 8 + (i % 3) * 4, 6 + (i % 2) * 4);
      }
    });
    const greenTop = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#3baa3b';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, GREEN, 14);
    });
    const greenBot = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#2d8a2d';
      ctx.fillRect(0, 0, s, s);
    });
    const faceFront = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#3baa3b';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, GREEN, 14);
      // Creeper face: two black eyes + frown mouth
      const eyeY = 20;
      ctx.fillStyle = '#111';
      // Left eye
      ctx.fillRect(12, eyeY, 12, 12);
      // Right eye
      ctx.fillRect(40, eyeY, 12, 12);
      // Mouth (upside-down T / frown)
      ctx.fillStyle = '#111';
      ctx.fillRect(24, 40, 16, 6);  // horizontal bar
      ctx.fillRect(28, 46, 8, 10);   // vertical drop
      ctx.fillRect(24, 46, 4, 8);
      ctx.fillRect(36, 46, 4, 8);
    });
    const faceBack = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#3baa3b';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, GREEN, 14);
    });
    const head = [greenSide, greenSide, greenTop, greenBot, faceBack, faceFront];

    const body = [greenSide, greenSide, greenTop, greenBot, greenSide, greenSide];

    const legTex = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#2d8a2d';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, GREEN_DARK, 12);
    });
    const leg = [legTex, legTex, legTex, legTex, legTex, legTex];
    return { body, head, leg };
  }

  _chickenTextures(def) {
    const s = 64;
    const WHITE = 0xf8f8f8;
    const CREAM = 0xf0e8d8;
    const RED = 0xcc2222;

    const bodySide = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#f8f8f8';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, WHITE, 12);
      // Wing detail
      ctx.fillStyle = 'rgba(220,210,200,0.3)';
      ctx.fillRect(8, 12, 20, 28);
    });
    const bodyTop = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#f8f8f8';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, WHITE, 8);
    });
    const bodyBot = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#f0e8d8';
      ctx.fillRect(0, 0, s, s);
    });
    const headFront = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#f8f8f8';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, WHITE, 10);
      // Eyes
      ctx.fillStyle = '#111';
      ctx.fillRect(12, 20, 6, 6);
      ctx.fillRect(46, 20, 6, 6);
      // Beak
      ctx.fillStyle = '#e8a020';
      ctx.fillRect(24, 32, 16, 8);
      // Wattle
      ctx.fillStyle = '#cc2222';
      ctx.fillRect(28, 40, 8, 10);
      // Comb
      ctx.fillStyle = '#cc2222';
      ctx.fillRect(20, 4, 8, 12);
      ctx.fillRect(32, 6, 8, 10);
    });
    const head = [bodySide, bodySide, bodyTop, bodyBot, bodySide, headFront];

    const legTex = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#e8a020';
      ctx.fillRect(0, 0, s, s);
    });
    const leg = [legTex, legTex, legTex, legTex, legTex, legTex];
    return { body: [bodySide, bodySide, bodyTop, bodyBot, bodySide, bodySide], head, leg };
  }

  _endermanTextures(def) {
    const s = 64;
    const DARK = 0x1a0a2a;
    const DARKER = 0x0a0020;
    const PURPLE = 0xcc44ff;

    const bodySide = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#1a0a2a';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, DARK, 15);
      // Subtle purple particles
      ctx.fillStyle = 'rgba(180,60,255,0.15)';
      for (let i = 0; i < 8; i++) {
        const px = (i * 11 + 3) % s, py = (i * 13 + 7) % s;
        ctx.fillRect(px, py, 3, 3);
      }
    });
    const bodyTop = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#1a0a2a';
      ctx.fillRect(0, 0, s, s);
    });
    const bodyBot = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#0a0020';
      ctx.fillRect(0, 0, s, s);
    });
    const headFront = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#1a0a2a';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, DARK, 10);
      // Glowing purple eyes
      ctx.fillStyle = '#cc44ff';
      ctx.fillRect(10, 22, 14, 8);
      ctx.fillRect(40, 22, 14, 8);
      // Eye glow
      ctx.fillStyle = '#ee88ff';
      ctx.fillRect(14, 24, 6, 4);
      ctx.fillRect(44, 24, 6, 4);
    });
    const headBack = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#1a0a2a';
      ctx.fillRect(0, 0, s, s);
    });
    const head = [bodySide, bodySide, bodyTop, bodyBot, headBack, headFront];

    const legTex = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#0a0020';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, DARKER, 10);
    });
    const leg = [legTex, legTex, legTex, legTex, legTex, legTex];
    return { body: [bodySide, bodySide, bodyTop, bodyBot, bodySide, bodySide], head, leg };
  }

  _slimeTextures(def) {
    const s = 64;
    const GREEN = 0x40c040;
    const GREEN_DARK = 0x2a8a2a;
    const GREEN_LIGHT = 0x60e060;

    const bodySide = this._tex(s, s, (ctx) => {
      // Translucent green slime
      const grad = ctx.createLinearGradient(0, 0, 0, s);
      grad.addColorStop(0, 'rgba(64,192,64,0.85)');
      grad.addColorStop(0.7, 'rgba(42,138,42,0.9)');
      grad.addColorStop(1, 'rgba(30,100,30,0.95)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, GREEN, 20);
      // Inner body visible through slime
      ctx.fillStyle = 'rgba(30,80,30,0.3)';
      ctx.fillRect(16, 16, 32, 32);
    });
    const bodyTop = this._tex(s, s, (ctx) => {
      ctx.fillStyle = 'rgba(80,220,80,0.8)';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, GREEN_LIGHT, 15);
    });
    const bodyBot = this._tex(s, s, (ctx) => {
      ctx.fillStyle = 'rgba(30,100,30,0.9)';
      ctx.fillRect(0, 0, s, s);
    });
    const faceFront = this._tex(s, s, (ctx) => {
      ctx.fillStyle = 'rgba(64,192,64,0.85)';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, GREEN, 15);
      // Eyes
      ctx.fillStyle = '#111';
      ctx.fillRect(14, 20, 10, 10);
      ctx.fillRect(40, 20, 10, 10);
      ctx.fillStyle = '#fff';
      ctx.fillRect(16, 22, 4, 4);
      ctx.fillRect(42, 22, 4, 4);
      // Mouth
      ctx.fillStyle = '#2a6a2a';
      ctx.fillRect(22, 42, 20, 6);
    });
    const head = [bodySide, bodySide, bodyTop, bodyBot, bodySide, faceFront];
    const body = [bodySide, bodySide, bodyTop, bodyBot, bodySide, faceFront];
    return { body, head, leg: [] };
  }

  _villagerTextures(def) {
    const s = 64;
    const SKIN = def.headColor || 0xD9A57A;
    const TUNIC = def.bodyColor || 0x7C6A4B;
    const BELT = def.beltColor || 0x4E3523;
    const BOOTS = def.legColor || 0x5A4632;
    const HOOD = def.hoodColor || 0x5D503D;

    const skinSide = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#' + SKIN.toString(16).padStart(6,'0');
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, SKIN, 12);
    });

    const skinTop = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#' + HOOD.toString(16).padStart(6,'0');
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, HOOD, 10);
    });

    const skinFront = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#' + SKIN.toString(16).padStart(6,'0');
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, SKIN, 10);
      // Eyes
      const eyeY = 22;
      ctx.fillStyle = '#fff';
      ctx.fillRect(10, eyeY, 14, 12);
      ctx.fillRect(40, eyeY, 14, 12);
      ctx.fillStyle = '#3a2510';
      ctx.fillRect(14, eyeY + 2, 8, 8);
      ctx.fillRect(44, eyeY + 2, 8, 8);
      ctx.fillStyle = '#fff';
      ctx.fillRect(16, eyeY + 3, 3, 3);
      ctx.fillRect(46, eyeY + 3, 3, 3);
      // Nose
      ctx.fillStyle = '#c0906a';
      ctx.fillRect(28, 32, 8, 6);
      // Mouth
      ctx.fillStyle = '#8b6340';
      ctx.fillRect(24, 40, 16, 4);
    });

    const skinBack = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#' + HOOD.toString(16).padStart(6,'0');
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, HOOD, 10);
    });

    const head = [skinSide, skinSide, skinTop, skinSide, skinBack, skinFront];

    const bodySide = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#' + TUNIC.toString(16).padStart(6,'0');
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, TUNIC, 15);
      // Belt stripe
      ctx.fillStyle = '#' + BELT.toString(16).padStart(6,'0');
      ctx.fillRect(0, s - 8, s, 8);
    });

    const bodyTop = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#' + TUNIC.toString(16).padStart(6,'0');
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, TUNIC, 10);
    });

    const bodyBot = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#' + BELT.toString(16).padStart(6,'0');
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, BELT, 8);
    });

    const body = [bodySide, bodySide, bodyTop, bodyBot, bodySide, bodySide];

    const legTex = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#' + BOOTS.toString(16).padStart(6,'0');
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, BOOTS, 12);
      // Boot top
      ctx.fillStyle = '#' + BELT.toString(16).padStart(6,'0');
      ctx.fillRect(0, 0, s, 8);
    });

    const leg = [legTex, legTex, legTex, legTex, legTex, legTex];
    return { body, head, leg };
  }

  _genericTextures(def) {
    const s = 8;
    const t = this._tex(s, s, (ctx) => { this._fillTex(ctx, s, s, def.bodyColor); });
    const h = this._tex(s, s, (ctx) => { this._fillTex(ctx, s, s, def.headColor); });
    const l = this._tex(s, s, (ctx) => { this._fillTex(ctx, s, s, def.legColor); });
    const arr = [t,t,t,t,t,t];
    return { body: arr, head: [h,h,h,h,h,h], leg: [l,l,l,l,l,l] };
  }

  takeDamage(amount, fromPos) {
    this.hp -= amount;
    this.hurtTimer = 0.35;
    this._hurtFlashOn = false;
    // Provoke: hostile mobs retaliate after being hit (see MobManager.update).
    this.aggro = true;
    // Flee: passive mobs run away from attacker
    if (!this.type || !MOB_TYPES[this.type]?.hostile) {
      if (fromPos) {
        const dx = this.position.x - fromPos.x;
        const dz = this.position.z - fromPos.z;
        const len = Math.sqrt(dx * dx + dz * dz) || 1;
        this.targetYaw = Math.atan2(dx, dz);
        this.state = 'fleeing';
        this.stateTimer = 2 + Math.random() * 2;
      }
    }
    // Knockback: push away from attacker
    if (fromPos) {
      const dx = this.position.x - fromPos.x;
      const dz = this.position.z - fromPos.z;
      const len = Math.sqrt(dx * dx + dz * dz) || 1;
      const force = 4.0;
      this.velocity.x += (dx / len) * force;
      this.velocity.z += (dz / len) * force;
    }
    if (this.hp <= 0) {
      this.dead = true;
    }
  }

  _solid(world, bx, by, bz) {
    const b = world.getBlock(bx, by, bz);
    return !!(BLOCKS[b]?.solid);
  }

  // Resolve horizontal movement against solid voxels so mobs can't walk
  // through walls. Uses a simple AABB (width = body, height = body+head).
  _moveHoriz(world, dx, dz) {
    const def = MOB_TYPES[this.type];
    const hw = def.bodyW / 2 + 0.02;
    const hd = def.bodyD / 2 + 0.02;
    const height = def.bodyH + def.headH;
    const minY = Math.floor(this.position.y);
    const maxY = Math.floor(this.position.y + height);

    // X axis
    this.position.x += dx;
    if (dx > 0) {
      const x = Math.floor(this.position.x + hw);
      for (let y = minY; y <= maxY; y++)
        for (let z = Math.floor(this.position.z - hd); z <= Math.floor(this.position.z + hd); z++)
          if (this._solid(world, x, y, z)) { this.position.x = x - hw - 0.001; this.velocity.x = 0; break; }
    } else if (dx < 0) {
      const x = Math.floor(this.position.x - hw);
      for (let y = minY; y <= maxY; y++)
        for (let z = Math.floor(this.position.z - hd); z <= Math.floor(this.position.z + hd); z++)
          if (this._solid(world, x, y, z)) { this.position.x = x + 1 + hw + 0.001; this.velocity.x = 0; break; }
    }

    // Z axis
    this.position.z += dz;
    if (dz > 0) {
      const z = Math.floor(this.position.z + hd);
      for (let y = minY; y <= maxY; y++)
        for (let x = Math.floor(this.position.x - hw); x <= Math.floor(this.position.x + hw); x++)
          if (this._solid(world, x, y, z)) { this.position.z = z - hd - 0.001; this.velocity.z = 0; break; }
    } else if (dz < 0) {
      const z = Math.floor(this.position.z - hd);
      for (let y = minY; y <= maxY; y++)
        for (let x = Math.floor(this.position.x - hw); x <= Math.floor(this.position.x + hw); x++)
          if (this._solid(world, x, y, z)) { this.position.z = z + 1 + hd + 0.001; this.velocity.z = 0; break; }
    }
  }

  update(dt, world, noise, playerPos) {
    // Death animation: fall over + fade out over 0.6s
    if (this.dead) {
      this.deathTimer += dt;
      if (this.mesh) {
        // Fall sideways
        const t = Math.min(this.deathTimer / 0.6, 1);
        this.mesh.rotation.x = t * Math.PI / 2;
        // Rise up slightly then sink
        this.mesh.position.y = this.position.y + (t < 0.3 ? t * 0.3 : (1 - t) * 0.3);
        // Fade out
        const opacity = 1 - t;
        this.mesh.traverse((child) => {
          if (child.isMesh && child.material) {
            child.material.transparent = opacity < 1;
            child.material.opacity = opacity;
          }
        });
      }
      return;
    }

    // Hurt flash
    if (this.hurtTimer > 0) {
      this.hurtTimer -= dt;
      if (this.hurtTimer <= 0) {
        this.hurtTimer = 0;
        this._setHurtFlash(false);
      } else {
        this._setHurtFlash(true);
      }
    }

    // AI timer — don't interrupt flee state
    this.stateTimer -= dt;
    if (this.stateTimer <= 0 && this.state !== 'fleeing') {
      if (this.state === 'idle') {
        this.state = 'walking';
        this.stateTimer = 2 + Math.random() * 4;
        this.targetYaw = this.yaw + (Math.random() - 0.5) * Math.PI * 1.5;
      } else {
        this.state = 'idle';
        this.stateTimer = 2 + Math.random() * 8;
        this.velocity.x = 0;
        this.velocity.z = 0;
      }
    } else if (this.stateTimer <= 0 && this.state === 'fleeing') {
      this.state = 'idle';
      this.stateTimer = 1 + Math.random() * 3;
      this.velocity.x = 0;
      this.velocity.z = 0;
    }

    // Look at player (smooth tracking when within 8 blocks)
    if (playerPos) {
      const pdx = playerPos.x - this.position.x;
      const pdz = playerPos.z - this.position.z;
      const playerDist = Math.sqrt(pdx * pdx + pdz * pdz);
      if (playerDist < 8) {
        // Smoothly turn toward player
        const lookYaw = Math.atan2(-pdx, -pdz);
        let dy = lookYaw - this.yaw;
        while (dy > Math.PI) dy -= Math.PI * 2;
        while (dy < -Math.PI) dy += Math.PI * 2;
        this.yaw += dy * Math.min(1, dt * 2);
        // Head tilt toward player (vertical look)
        const headChild = this.mesh.children.find(c => c.name === 'head');
        if (headChild) {
          const eyeY = this.position.y + (MOB_TYPES[this.type]?.legH || 0) + (MOB_TYPES[this.type]?.bodyH || 0) + (MOB_TYPES[this.type]?.headH || 0) * 0.5;
          const vertDy = (playerPos.y + 1.6) - eyeY;
          const vertAngle = Math.atan2(vertDy, playerDist) * 0.3;
          headChild.rotation.x += (vertAngle - headChild.rotation.x) * dt * 3;
        }
      }
    }

    // Movement
    if (this.state === 'walking' || this.state === 'fleeing') {
      // Smooth turn
      let dy = this.targetYaw - this.yaw;
      while (dy > Math.PI) dy -= Math.PI * 2;
      while (dy < -Math.PI) dy += Math.PI * 2;
      const turnSpeed = this.state === 'fleeing' ? 5 : 3;
      this.yaw += dy * Math.min(1, dt * turnSpeed);

      const moveSpeed = this.state === 'fleeing' ? WALK_SPEED * 2.2 : WALK_SPEED;
      this.velocity.x = -Math.sin(this.yaw) * moveSpeed;
      this.velocity.z = -Math.cos(this.yaw) * moveSpeed;

      // Stay near spawn
      const dx = this.position.x - this.spawnPos.x;
      const dz = this.position.z - this.spawnPos.z;
      if (dx * dx + dz * dz > MAX_WANDER_DIST * MAX_WANDER_DIST) {
        this.targetYaw = Math.atan2(-dx, -dz);
      }
    }

    // Apply velocity with horizontal + ground collision
    this._moveHoriz(world, this.velocity.x * dt, this.velocity.z * dt);

    // Ground snap
    const bx = Math.floor(this.position.x);
    const bz = Math.floor(this.position.z);
    let groundY = -1;
    for (let y = WORLD_HEIGHT - 1; y >= 0; y--) {
      const block = world.getBlock(bx, y, bz);
      if (block !== BLOCK.AIR && block !== BLOCK.WATER && BLOCKS[block]?.solid) {
        groundY = y + 1;
        break;
      }
    }
    if (groundY < 0) groundY = SEA_LEVEL;

    // Simple gravity
    if (this.position.y > groundY) {
      this.position.y -= 15 * dt;
      if (this.position.y < groundY) this.position.y = groundY;
    } else if (this.position.y < groundY) {
      this.position.y = groundY;
    }

    // Update mesh transform
    this.mesh.position.set(this.position.x, this.position.y, this.position.z);
    this.mesh.rotation.y = this.yaw;

    // Leg walking animation
    const isMoving = (this.state === 'walking' || this.state === 'fleeing') && (Math.abs(this.velocity.x) > 0.01 || Math.abs(this.velocity.z) > 0.01);
    const moveSpeed = isMoving ? Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.z * this.velocity.z) : 0;
    if (isMoving) {
      // Speed proportional to movement velocity
      this.walkPhase += dt * (4 + moveSpeed * 4);
    } else {
      this.walkPhase *= 0.9;
    }

    // Head and body bobbing when walking
    const bobAmount = isMoving ? Math.sin(this.walkPhase * 2) * 0.04 : 0;
    // Idle breathing bob (all mobs)
    const breathe = Math.sin(performance.now() * 0.002) * 0.008;
    this.mesh.children.forEach(child => {
      if (child.name === 'body') {
        child.position.y = this._origBodyY + bobAmount + breathe;
        // Sheep wool jiggle when walking
        if (this.type === 'sheep' && isMoving) {
          child.scale.y = 1 + Math.abs(Math.sin(this.walkPhase * 3)) * 0.04;
          child.scale.x = 1 - Math.abs(Math.sin(this.walkPhase * 3)) * 0.02;
        } else if (this.type === 'sheep') {
          child.scale.y = 1 + breathe * 0.5;
          child.scale.x = 1;
        }
        // Creeper body swell during fuse
        if (this.type === 'creeper' && this.fusing) {
          this._fuseSwell = Math.min(this._fuseSwell + dt * 0.6, 0.15);
          const swell = 1 + this._fuseSwell;
          child.scale.set(swell, swell, swell);
        } else if (this.type === 'creeper') {
          this._fuseSwell = 0;
          child.scale.set(1, 1, 1);
        }
      } else if (child.name === 'head') {
        child.position.y = this._origHeadY + bobAmount + breathe;
        // Pig snout wiggle
        if (this.type === 'pig') {
          const snout = this.mesh.children.find(c => c.name === 'snout');
          if (snout) {
            const wiggle = isMoving ? Math.sin(this.walkPhase * 4) * 0.06 : Math.sin(performance.now() * 0.003) * 0.02;
            snout.position.x = wiggle;
          }
        }
      }
    });

    // Head tilt forward when walking
    const headChild = this.mesh.children.find(c => c.name === 'head');
    if (headChild) {
      if (isMoving) {
        headChild.rotation.x = -0.08;
      } else {
        headChild.rotation.x *= 0.9;
      }
      // Spider head bob when idle
      if (this.type === 'spider' && !isMoving) {
        headChild.rotation.y = Math.sin(performance.now() * 0.001) * 0.15;
      }
    }

    // Villager idle arm fold: arms cross in front when not moving
    if (this.type === 'villager' && !isMoving) {
      const armPivots = this.legs.slice(-2); // last 2 in legs array are arms
      for (let i = 0; i < armPivots.length; i++) {
        const target = i === 0 ? 0.3 : -0.3;
        armPivots[i].rotation.x += (target - armPivots[i].rotation.x) * dt * 3;
      }
    }

    const swing = Math.sin(this.walkPhase) * 0.5;
    for (let i = 0; i < this.legs.length; i++) {
      const leg = this.legs[i];
      // Check if this is a villager arm (last 2 in array for villager)
      const isVillagerArm = this.type === 'villager' && i >= this.legs.length - 2;
      if (isVillagerArm) {
        // Arms swing opposite to legs
        leg.rotation.x = -swing;
      } else if (MOB_TYPES[this.type]?.bipedalLegs) {
        // Bipedal: both legs swing together
        leg.rotation.x = swing;
      } else {
        // Quadruped: Front-left (0) & back-right (3) swing together
        const phase = (i === 0 || i === 3) ? swing : -swing;
        leg.rotation.x = phase;
      }
    }

    // Attack arm swing animation (zombie/skeleton)
    if (this.attackAnim > 0) {
      this.attackAnim = Math.max(0, this.attackAnim - dt * 5);
      // Bipedal mobs: swing right arm (last leg in array for bipeds = right arm)
      if (MOB_TYPES[this.type]?.bipedalLegs && this.legs.length >= 2) {
        const arm = this.legs[this.legs.length - 1]; // right arm
        arm.rotation.x = -this.attackAnim * 2.5; // swing forward
      }
      // Quadruped mobs: lunge body forward
      if (!MOB_TYPES[this.type]?.bipedalLegs && !MOB_TYPES[this.type]?.has8Legs) {
        const body = this.mesh.children.find(c => c.name === 'body');
        if (body) body.position.z = -this.attackAnim * 0.15;
      }
    }

    // ── CHICKEN: lay eggs occasionally ──
    if (this.type === 'chicken' && !this.dead) {
      const def = MOB_TYPES.chicken;
      if (Math.random() < (def.layEggChance || 0) * dt * 60) {
        this._eggDrop = true; // signal to MobManager to spawn egg item
      }
    }

    // ── ENDERMAN: teleport when idle ──
    if (this.type === 'enderman' && !this.dead && this.state === 'idle') {
      const def = MOB_TYPES.enderman;
      if (Math.random() < (def.teleportChance || 0) * dt) {
        // Teleport to a random nearby position
        const range = 8;
        const nx = this.position.x + (Math.random() - 0.5) * range * 2;
        const nz = this.position.z + (Math.random() - 0.5) * range * 2;
        // Find ground at new position
        const bx = Math.floor(nx), bz = Math.floor(nz);
        let groundY = -1;
        for (let y = WORLD_HEIGHT - 1; y >= 0; y--) {
          const blk = world.getBlock(bx, y, bz);
          if (blk !== BLOCK.AIR && blk !== BLOCK.WATER && BLOCKS[blk]?.solid) {
            groundY = y + 1;
            break;
          }
        }
        if (groundY > 0 && groundY < WORLD_HEIGHT - 2) {
          // Verify destination is not inside a solid block
          const hw = def.bodyW / 2;
          const hd = def.bodyD / 2;
          const height = def.bodyH + def.headH;
          let safe = true;
          const minX = Math.floor(nx - hw);
          const maxX = Math.floor(nx + hw);
          const minZ = Math.floor(nz - hd);
          const maxZ = Math.floor(nz + hd);
          for (let y = Math.floor(groundY); y <= Math.floor(groundY + height) && safe; y++) {
            for (let x = minX; x <= maxX && safe; x++) {
              for (let z = minZ; z <= maxZ; z++) {
                if (this._solid(world, x, y, z)) {
                  safe = false;
                  break;
                }
              }
            }
          }
          if (safe) {
            // Spawn purple particles at old position
            this._teleportFrom = { x: this.position.x, y: this.position.y, z: this.position.z };
            this.position.set(nx, groundY, nz);
            this._teleportTo = { x: nx, y: groundY, z: nz };
          }
        }
      }
    }

    // ── SLIME: bounce when walking ──
    if (this.type === 'slime' && !this.dead && isMoving) {
      const body = this.mesh.children.find(c => c.name === 'body');
      if (body) {
        const bounce = Math.abs(Math.sin(this.walkPhase * 2)) * 0.3;
        body.position.y = this._origBodyY + bounce;
        // Squash and stretch
        body.scale.y = 1 + bounce * 0.3;
        body.scale.x = 1 - bounce * 0.15;
        body.scale.z = 1 - bounce * 0.15;
      }
    } else if (this.type === 'slime' && !this.dead) {
      const body = this.mesh.children.find(c => c.name === 'body');
      if (body) {
        // Idle squish
        const squish = Math.sin(performance.now() * 0.003) * 0.05;
        body.scale.y = 1 + squish;
        body.scale.x = 1 - squish * 0.5;
        body.scale.z = 1 - squish * 0.5;
      }
    }
  }

  _setHurtFlash(on) {
    const mats = this._allMats;
    const colors = this._savedColors;
    for (let i = 0; i < mats.length; i++) {
      if (on) {
        mats[i].color.setHex(0xff3333);
      } else {
        mats[i].color.setHex(colors[i]);
      }
    }
  }

  // Get list of item drops
  getDrops() {
    const def = MOB_TYPES[this.type];
    const drops = [];
    for (const d of def.drops) {
      const count = d.count[0] + Math.floor(Math.random() * (d.count[1] - d.count[0] + 1));
      if (count > 0) drops.push({ item: d.item, count });
    }
    return drops;
  }

  distanceTo(px, pz) {
    const dx = this.position.x - px;
    const dz = this.position.z - pz;
    return Math.sqrt(dx * dx + dz * dz);
  }

  dispose() {
    this.mesh.traverse((child) => {
      if (child.isMesh) {
        child.geometry.dispose();
        const mats = Array.isArray(child.material) ? child.material : [child.material];
        for (const m of mats) {
          if (m.map) m.map.dispose();
          m.dispose();
        }
      }
    });
  }
}

// ── MobManager ───────────────────────────────────────────────────────
export class MobManager {
  constructor(scene, world, audio, explosionManager) {
    this.scene = scene;
    this.world = world;
    this.audio = audio;
    this.explosionManager = explosionManager;
    this.mobs = [];
    this._spawnedChunks = new Set();
    this._nightSpawnTimer = 0;
    this._nextEntityId = 1;
    this._remoteMobs = new Map(); // entityId -> remote mob mesh
    this._mobPosSendTimer = 0;
    this.networkSend = null; // set by main.js: { sendMobSpawn, sendMobPosition, sendMobDeath }
  }

  _allocEntityId() {
    return this._nextEntityId++;
  }

  // Remote mob management (received from network)
  remoteSpawn(entityId, type, x, y, z) {
    if (this._remoteMobs.has(entityId)) return;
    const def = MOB_TYPES[type];
    if (!def) return;
    const mob = new Mob(type, x, y, z);
    mob.entityId = entityId;
    mob._isRemote = true;
    this._remoteMobs.set(entityId, mob);
    this.scene.add(mob.mesh);
  }

  remoteMove(entityId, x, y, z, yaw) {
    const mob = this._remoteMobs.get(entityId);
    if (!mob) return;
    mob.position.set(x, y, z);
    mob.mesh.position.set(x, y, z);
    mob.yaw = yaw;
    mob.mesh.rotation.y = yaw;
  }

  remoteDamage(entityId, hp) {
    const mob = this._remoteMobs.get(entityId);
    if (!mob) return;
    mob.hp = hp;
    mob.hurtTimer = 1;
    this.playHurtSound(mob.type);
    // Flash red
    for (const m of mob._allMats) m.color.setHex(0xff0000);
    setTimeout(() => {
      for (let i = 0; i < mob._allMats.length; i++) {
        mob._allMats[i].color.setHex(mob._savedColors[i]);
      }
    }, 150);
  }

  remoteDeath(entityId) {
    const mob = this._remoteMobs.get(entityId);
    if (!mob) return;
    this.scene.remove(mob.mesh);
    mob.dispose();
    this._remoteMobs.delete(entityId);
  }

  // Periodic night pass: spawn hostile mobs in a ring around the player so that
  // chunks loaded during the day still see monsters after nightfall.
  spawnNightHostiles(playerPos) {
    if (!playerPos) return;
    let hostiles = 0;
    for (const m of this.mobs) if (MOB_TYPES[m.type]?.hostileAtNight) hostiles++;
    if (hostiles >= MAX_NIGHT_HOSTILES) return;

    const seed = (Date.now() ^ (playerPos.x | 0) ^ ((playerPos.z | 0) << 8)) >>> 0;
    const rng = mulberry32(seed);
    const attempts = 4;
    const types = ['zombie', 'skeleton', 'spider'];
    for (let i = 0; i < attempts && hostiles < MAX_NIGHT_HOSTILES; i++) {
      // Ring 24-40 blocks from the player.
      const ang = rng() * Math.PI * 2;
      const dist = 24 + rng() * 16;
      const wx = Math.floor(playerPos.x + Math.cos(ang) * dist);
      const wz = Math.floor(playerPos.z + Math.sin(ang) * dist);
      const h = this.world.heightAt(wx, wz);
      if (h <= SEA_LEVEL || h >= WORLD_HEIGHT - 5) continue;
      let groundY = -1;
      for (let y = Math.min(h + 6, WORLD_HEIGHT - 2); y >= SEA_LEVEL; y--) {
        const blk = this.world.getBlock(wx, y, wz);
        if (BLOCKS[blk]?.solid && blk !== BLOCK.WATER) { groundY = y; break; }
      }
      if (groundY < 0) continue;
      const type = types[Math.floor(rng() * types.length)];
      if (!MOB_TYPES[type]) continue;
      const mob = new Mob(type, wx + 0.5, groundY + 1, wz + 0.5);
      mob.entityId = this._allocEntityId();
      this.mobs.push(mob);
      this.scene.add(mob.mesh);
      if (this.networkSend?.sendMobSpawn) {
        this.networkSend.sendMobSpawn(mob.entityId, mob.type, mob.position.x, mob.position.y, mob.position.z);
      }
      hostiles++;
    }
  }

  clear() {
    for (const mob of this.mobs) {
      this.scene.remove(mob.mesh);
      mob.dispose();
    }
    this.mobs.length = 0;
    for (const [, mob] of this._remoteMobs) {
      this.scene.remove(mob.mesh);
      mob.dispose();
    }
    this._remoteMobs.clear();
    this._spawnedChunks.clear();
  }

  // Spawn a specific mob type at a world position (for dev commands).
  spawnAt(type, x, y, z) {
    if (!MOB_TYPES[type]) return null;
    const mob = new Mob(type, x, y, z);
    mob.entityId = this._allocEntityId();
    this.mobs.push(mob);
    this.scene.add(mob.mesh);
    if (this.networkSend?.sendMobSpawn) {
      this.networkSend.sendMobSpawn(mob.entityId, mob.type, mob.position.x, mob.position.y, mob.position.z);
    }
    return mob;
  }

  // Called when a chunk is first generated/loaded
  spawnForChunk(cx, cz, isNight = false) {
    const key = cx + ',' + cz;
    if (this._spawnedChunks.has(key)) return;
    this._spawnedChunks.add(key);

    const baseX = cx * CHUNK_SIZE;
    const baseZ = cz * CHUNK_SIZE;
    const noise = this.world.noise;

    // Check a few positions in the chunk for biome eligibility
    const spawnPositions = [];
    const biomeCounts = {};
    for (let x = 2; x < CHUNK_SIZE - 2; x += 4) {
      for (let z = 2; z < CHUNK_SIZE - 2; z += 4) {
        const wx = baseX + x, wz = baseZ + z;
        const h = this.world.heightAt(wx, wz);
        if (h <= SEA_LEVEL || h >= WORLD_HEIGHT - 5) continue;
        const biome = calcBiome(noise, wx, wz, h);
        if (!MOB_SPAWN_BIOMES.has(biome)) continue;

        // Scan downward from h to find actual ground (skip leaves, air, water, wood)
        let groundY = -1;
        for (let y = Math.min(h + 10, WORLD_HEIGHT - 2); y >= SEA_LEVEL; y--) {
          const blk = this.world.getBlock(wx, y, wz);
          if (blk === BLOCK.GRASS || blk === BLOCK.DIRT || blk === BLOCK.SNOW_BLOCK ||
              blk === BLOCK.SNOW_GRASS || blk === BLOCK.PODZOL || blk === BLOCK.MYCELIUM) {
            groundY = y;
            break;
          }
        }
        if (groundY < 0) continue;

        spawnPositions.push({ x: wx + 0.5, z: wz + 0.5, y: groundY + 1, biome });
        biomeCounts[biome] = (biomeCounts[biome] || 0) + 1;
      }
    }

    if (spawnPositions.length === 0) return;

    const seed = ((cx * 73856093) ^ (cz * 19349663)) >>> 0;
    const rng = mulberry32(seed);

    let dominantBiome = BIOMES.PLAINS;
    let maxCount = 0;
    for (const [b, c] of Object.entries(biomeCounts)) {
      if (c > maxCount) { maxCount = c; dominantBiome = Number(b); }
    }

    let count;
    if (dominantBiome === BIOMES.DESERT) {
      count = DESERT_SPAWN_MIN + Math.floor(rng() * (DESERT_SPAWN_MAX - DESERT_SPAWN_MIN + 1));
    } else if (dominantBiome === BIOMES.SWAMP) {
      count = SWAMP_SPAWN_MIN + Math.floor(rng() * (SWAMP_SPAWN_MAX - SWAMP_SPAWN_MIN + 1));
    } else {
      count = BIOMES_SPAWN_MIN + Math.floor(rng() * (BIOMES_SPAWN_MAX - BIOMES_SPAWN_MIN + 1));
    }
    count = Math.min(count, MAX_MOBS_PER_CHUNK, spawnPositions.length);

    const types = ['cow', 'pig', 'sheep'];
    // Spiders spawn in dark biomes or at night — add them to pool for forests/caves
    const spawnTypes = [...types];
    if (dominantBiome === BIOMES.FOREST || dominantBiome === BIOMES.DARK_FOREST ||
        dominantBiome === BIOMES.TAIGA || dominantBiome === BIOMES.SWAMP) {
      spawnTypes.push('spider');
    }
    // Hostile mobs (zombie, skeleton, spider) spawn at night everywhere
    if (isNight) {
      spawnTypes.push('zombie', 'skeleton', 'spider');
    }
    const placed = [];

    for (let i = 0; i < count; i++) {
      let bestPos = null;
      let bestIdx = -1;
      let bestDist = -1;

      for (let j = 0; j < spawnPositions.length; j++) {
        const pos = spawnPositions[j];
        let minDist = Infinity;
        for (const p of placed) {
          const dx = pos.x - p.x, dz = pos.z - p.z;
          const d = Math.sqrt(dx * dx + dz * dz);
          if (d < minDist) minDist = d;
        }
        if (minDist > bestDist) {
          bestDist = minDist;
          bestPos = pos;
          bestIdx = j;
        }
      }

      if (bestIdx < 0) break;
      if (bestDist < MIN_SPAWN_DISTANCE && placed.length > 0) break;

      const type = spawnTypes[Math.floor(rng() * spawnTypes.length)];
      const mob = new Mob(type, bestPos.x, bestPos.y, bestPos.z);
      mob.entityId = this._allocEntityId();
      this.mobs.push(mob);
      this.scene.add(mob.mesh);
      if (this.networkSend?.sendMobSpawn) {
        this.networkSend.sendMobSpawn(mob.entityId, mob.type, mob.position.x, mob.position.y, mob.position.z);
      }
      placed.push(bestPos);
      spawnPositions.splice(bestIdx, 1);
    }
  }

  update(dt, playerPos, dayTime) {
    // dayTime: 0=midnight, 0.25=sunrise, 0.5=noon, 0.75=sunset
    // Night is when dayTime > DAY_FRAC (10/16 ≈ 0.625)
    const isNight = dayTime != null && dayTime > 0.625;

    // Periodic night hostile spawns near the player.
    if (isNight) {
      this._nightSpawnTimer -= dt;
      if (this._nightSpawnTimer <= 0) {
        this._nightSpawnTimer = NIGHT_SPAWN_INTERVAL;
        this.spawnNightHostiles(playerPos);
      }
    } else {
      this._nightSpawnTimer = 0;
    }

    const attackEvents = [];
    const explosions = [];

    // Update all mobs
    for (let i = this.mobs.length - 1; i >= 0; i--) {
      const mob = this.mobs[i];
      if (mob.dead) continue;

      const def = MOB_TYPES[mob.type];

      // ── CREEPER AI ──
      if (mob.type === 'creeper' && playerPos) {
        const dx = playerPos.x - mob.position.x;
        const dz = playerPos.z - mob.position.z;
        const dist = Math.sqrt(dx * dx + dz * dz);

        if ((isNight || mob.aggro) && dist < 16 && !mob.exploded) {
          mob.state = 'walking';
          mob.targetYaw = Math.atan2(-dx, -dz);
          mob.stateTimer = 0.5;

          // Start fuse when close enough
          if (dist < 3.0 && !mob.fusing) {
            mob.fusing = true;
            mob.fuseTimer = def.fuseTime || 1.5;
            mob._fuseFlashPhase = 0;
            // Play hiss
            if (this.audio) this.audio.creeperHiss();
          }

          // Update fuse
          if (mob.fusing) {
            mob.fuseTimer -= dt;
            mob._fuseFlashPhase += dt * 12;

            // Flash red/white during fuse (using cached materials)
            if (mob._allMats) {
              const flashOn = Math.sin(mob._fuseFlashPhase) > 0;
              for (let i = 0; i < mob._allMats.length; i++) {
                mob._allMats[i].color.setHex(flashOn ? 0xff4444 : mob._savedColors[i]);
              }
            }

            // Cancel fuse if player moves far away
            if (dist > 5.0) {
              mob.fusing = false;
              mob.fuseTimer = 0;
              mob._fuseFlashPhase = 0;
              // Restore colors from _savedColors array
              if (mob._allMats && mob._savedColors) {
                for (let i = 0; i < mob._allMats.length; i++) {
                  mob._allMats[i].color.setHex(mob._savedColors[i]);
                }
              }
            }

            // Explode!
            if (mob.fuseTimer <= 0) {
              mob.exploded = true;
              mob.dead = true;
              explosions.push({
                x: mob.position.x,
                y: mob.position.y + 0.5,
                z: mob.position.z,
                power: def.explosionPower || 3
              });
            }
          }
        } else if (!isNight && !mob.aggro && mob.state === 'walking' && dist < 20) {
          if (dist < 4) {
            mob.targetYaw = Math.atan2(dx, dz);
            mob.stateTimer = 2;
          }
        }
      }
      // ── OTHER HOSTILE AI (zombie, skeleton, spider) ──
      else if (def.hostileAtNight && playerPos) {
        const dx = playerPos.x - mob.position.x;
        const dz = playerPos.z - mob.position.z;
        const dist = Math.sqrt(dx * dx + dz * dz);

        if ((isNight || mob.aggro) && dist < 16) {
          mob.state = 'walking';
          mob.targetYaw = Math.atan2(-dx, -dz);
          mob.stateTimer = 0.5;

          // Attack if close enough
          if (dist < 1.8) {
            mob.attackCooldown = (mob.attackCooldown || 0) - dt;
            if (mob.attackCooldown <= 0) {
              mob.attackCooldown = 1.0;
              mob.attackAnim = 1; // trigger arm swing
              attackEvents.push({ type: 'attack', damage: def.attackDamage || 4, fromPos: { x: mob.position.x, y: mob.position.y, z: mob.position.z } });
            }
          }
        } else if (!isNight && !mob.aggro && mob.state === 'walking' && dist < 20) {
          if (dist < 4) {
            mob.targetYaw = Math.atan2(dx, dz);
            mob.stateTimer = 2;
          }
        }
      }

      mob.update(dt, this.world, this.world.noise, playerPos);

      // Idle sounds (passive + hostile)
      if (this.audio && mob.state === 'idle' && !mob.dead) {
        if (Math.random() < (MOB_TYPES[mob.type].soundChance || 0.003) * dt * 60) {
          const now = performance.now();
          if (!this._lastSoundTime || now - this._lastSoundTime > 3000) {
            this._lastSoundTime = now;
            this._playMobSound(mob.type);
          }
        }
      }
    }

    // Process explosions
    for (const exp of explosions) {
      if (this.explosionManager) {
        this.explosionManager.explode(exp.x, exp.y, exp.z, exp.power);
      }
    }

    // Cull mobs too far from player
    if (playerPos) {
      for (let i = this.mobs.length - 1; i >= 0; i--) {
        const mob = this.mobs[i];
        if (mob.distanceTo(playerPos.x, playerPos.z) > CULL_DIST) {
          this.scene.remove(mob.mesh);
          mob.dispose();
          this.mobs.splice(i, 1);
        }
      }
    }

    // Remove dead mobs (after death animation completes)
    for (let i = this.mobs.length - 1; i >= 0; i--) {
      const mob = this.mobs[i];
      if (mob.dead && mob.deathTimer > 0.6) {
        // Slime split: spawn 2 smaller slimes on death
        if (mob.type === 'slime' && mob._slimeSize !== 'small') {
          for (let j = 0; j < 2; j++) {
            const ox = (Math.random() - 0.5) * 1.5;
            const oz = (Math.random() - 0.5) * 1.5;
            const baby = new Mob('slime', mob.position.x + ox, mob.position.y, mob.position.z + oz);
            baby._slimeSize = 'small';
            baby.hp = 8;
            baby.maxHp = 8;
            // Scale down the mesh
            if (baby.mesh) baby.mesh.scale.set(0.5, 0.5, 0.5);
            this.mobs.push(baby);
            this.scene.add(baby.mesh);
          }
        }
        // Network: broadcast death
        if (mob.entityId && this.networkSend?.sendMobDeath) {
          this.networkSend.sendMobDeath(mob.entityId);
        }
        this.scene.remove(mob.mesh);
        mob.dispose();
        this.mobs.splice(i, 1);
      }
    }

    // Broadcast local mob positions periodically (~10Hz)
    if (this.networkSend?.sendMobPosition) {
      this._mobPosSendTimer -= dt;
      if (this._mobPosSendTimer <= 0) {
        this._mobPosSendTimer = 0.1;
        for (const mob of this.mobs) {
          if (mob.entityId && !mob.dead) {
            this.networkSend.sendMobPosition(mob.entityId, mob.position.x, mob.position.y, mob.position.z, mob.yaw);
          }
        }
      }
    }

    // Check for chicken egg laying (alive chickens)
    for (const mob of this.mobs) {
      if (mob.type === 'chicken' && mob._eggDrop) {
        mob._eggDrop = false;
        this._eggDrops = this._eggDrops || [];
        this._eggDrops.push({ x: mob.position.x, y: mob.position.y, z: mob.position.z });
      }
    }

    // Return the strongest attack this tick (backward-compatible with single-event callers)
    if (attackEvents.length === 0 && explosions.length === 0) return null;
    const result = {};
    if (attackEvents.length > 0) {
      result.attack = attackEvents.reduce((a, b) => (b.damage > a.damage ? b : a));
    }
    if (explosions.length > 0) {
      result.explosions = explosions;
    }
    return result;
  }

  _playMobSound(type) {
    if (!this.audio) return;
    if (type === 'cow') this.audio.cowSound();
    else if (type === 'pig') this.audio.pigSound();
    else if (type === 'sheep') this.audio.sheepSound();
    else if (type === 'zombie') this.audio.zombieSound();
    else if (type === 'skeleton') this.audio.skeletonSound();
    else if (type === 'spider') this.audio.spiderSound();

  }

  playHurtSound(type) {
    if (!this.audio) return;
    switch (type) {
      case 'zombie': this.audio.hurtZombie(); break;
      case 'skeleton': this.audio.hurtSkeleton(); break;
      case 'spider': this.audio.hurtSpider(); break;
      case 'slime': this.audio.hurtSlime(); break;
      case 'cow': this.audio.hurtCow(); break;
      case 'pig': this.audio.hurtPig(); break;
      case 'sheep': this.audio.hurtSheep(); break;
      case 'chicken': this.audio.hurtChicken(); break;
      default: this.audio.hurtAnimal(); break;
    }
  }

  // Try to hit a mob using ray-AABB intersection. Returns the hit mob or null.
  hitTest(playerPos, lookDir, reach) {
    let best = null;
    let bestDist = reach * reach;

    for (const mob of this.mobs) {
      if (mob.dead) continue;
      const def = MOB_TYPES[mob.type];
      const totalH = def.legH + def.bodyH + def.headH;

      const halfW = Math.max(def.bodyW, def.headW) / 2 + 0.1;
      const halfD = Math.max(def.bodyD, def.headD) / 2 + 0.1;

      const minX = mob.position.x - halfW;
      const maxX = mob.position.x + halfW;
      const minY = mob.position.y;
      const maxY = mob.position.y + totalH;
      const minZ = mob.position.z - halfD;
      const maxZ = mob.position.z + halfD;

      // Ray-AABB intersection test
      let tmin = -Infinity, tmax = Infinity;
      const ox = playerPos.x, oy = playerPos.y + 1.62, oz = playerPos.z;
      const dx = lookDir.x, dy = lookDir.y, dz = lookDir.z;

      if (dx !== 0) {
        let t1 = (minX - ox) / dx, t2 = (maxX - ox) / dx;
        if (t1 > t2) { const tmp = t1; t1 = t2; t2 = tmp; }
        tmin = Math.max(tmin, t1);
        tmax = Math.min(tmax, t2);
      } else if (ox < minX || ox > maxX) continue;
      if (dy !== 0) {
        let t1 = (minY - oy) / dy, t2 = (maxY - oy) / dy;
        if (t1 > t2) { const tmp = t1; t1 = t2; t2 = tmp; }
        tmin = Math.max(tmin, t1);
        tmax = Math.min(tmax, t2);
      } else if (oy < minY || oy > maxY) continue;
      if (dz !== 0) {
        let t1 = (minZ - oz) / dz, t2 = (maxZ - oz) / dz;
        if (t1 > t2) { const tmp = t1; t1 = t2; t2 = tmp; }
        tmin = Math.max(tmin, t1);
        tmax = Math.min(tmax, t2);
      } else if (oz < minZ || oz > maxZ) continue;

      if (tmin > tmax || tmax < 0) continue;

      const hitDist = tmin >= 0 ? tmin : tmax;
      if (hitDist > reach) continue;

      if (hitDist * hitDist < bestDist) {
        bestDist = hitDist * hitDist;
        best = mob;
      }
    }

    return best;
  }
}
