// Passive mob system — cows, pigs, and sheep.
//
// Each mob is a simple box model (THREE.Group) with basic AI:
//   idle → wander → idle … with ground collision.
// MobManager handles spawning per-chunk, updating, and culling.

import * as THREE from 'three';
import { BLOCK, BLOCKS } from './blocks.js';
import { CHUNK_SIZE, WORLD_HEIGHT, SEA_LEVEL, BIOMES } from './constants.js';
import { calcBiome } from './worldgen.js';
import { PlayerModel, createSkinCanvas } from './playermodel.js';
import { ExplosionManager } from './explosions.js';
// Blob shadows removed — real shadow map shadows used instead

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
    legW: 0.16, legH: 0.7, legD: 0.16,
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
    legW: 0.13, legH: 0.7, legD: 0.13,
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
    legW: 0.15, legH: 0.75, legD: 0.15,
    headOffY: -0.25,
    bodyColor: 0x7C6A4B,
    headColor: 0xD9A57A,
    legColor: 0x5A4632,
    hasArms: true,
    armW: 0.15, armH: 0.75, armD: 0.15,
    armColor: 0x6B5A3B,
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

  traveler: {
    name: 'Traveler',
    hp: 24,
    passive: true,
    variant: 'traveler',
    bipedalLegs: true,
    bodyW: 0.5, bodyH: 0.75, bodyD: 0.25,
    headW: 0.5, headH: 0.5, headD: 0.5,
    legW: 0.15, legH: 0.75, legD: 0.15,
    headOffY: -0.25,
    hasArms: true,
    armW: 0.15, armH: 0.75, armD: 0.15,
    armColor: 0x2a3a4a,
    hasHood: true,
    hoodColor: 0x1a2a3a,
    hasBelt: true,
    beltColor: 0x2a1a0a,
    hasCape: true,
    capeColor: 0x1e2e3e,
    hasStaff: true,
    staffColor: 0x5a4a3a,
    headColor: 0xc8a882,
    bodyColor: 0x2a3a4a,
    legColor: 0x1a2a3a,
    hasTrades: true,
    trades: [
      { give: { item: 710, count: 3 },  receive: { item: 109, count: 1 } },
      { give: { item: 710, count: 1 },  receive: { item: 700, count: 2 } },
      { give: { item: 700, count: 4 },  receive: { item: 710, count: 1 } },
      { give: { item: 710, count: 8 },  receive: { item: 311, count: 1 } },
      { give: { item: 700, count: 10 }, receive: { item: 265, count: 1 } },
      { give: { item: 710, count: 16 }, receive: { item: 702, count: 1 } },
    ],
    drops: [],
    soundChance: 0.0003,
  },

  chicken: {
    name: 'Chicken',
    hp: 4,
    bodyW: 0.4, bodyH: 0.6, bodyD: 0.5,
    headW: 0.35, headH: 0.35, headD: 0.35,
    legW: 0.08, legH: 0.3, legD: 0.08,
    legPositions: [[-0.06, 0.08], [0.06, 0.08]],
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

  blower: {
    name: 'Blower',
    hp: 24,
    hostile: true,
    hostileAtNight: true,
    bipedalLegs: true,
    bodyW: 0.6, bodyH: 1.0, bodyD: 0.4,
    headW: 0.5, headH: 0.5, headD: 0.5,
    legW: 0.14, legH: 0.7, legD: 0.14,
    headOffY: -0.5,
    headOffZ: -0.2,
    hasSnout: true,
    snoutW: 0.42, snoutH: 0.42, snoutD: 0.3,
    bodyColor: 0x4a3a2a,
    headColor: 0x5a4a3a,
    legColor: 0x2a2018,
    attackDamage: 6,
    isBlower: true,
    throwRange: 18,
    throwCooldown: 3.0,
    drops: [{ item: 279, count: [0, 2] }], // gunpowder
    soundChance: 0.0004,
  },

  portalman: {
    name: 'PortalMan',
    hp: 30,
    hostile: true,
    hostileAtNight: true,
    bipedalLegs: true,
    bodyW: 0.5, bodyH: 0.9, bodyD: 0.3,
    headW: 0.5, headH: 0.5, headD: 0.5,
    legW: 0.13, legH: 0.75, legD: 0.13,
    headOffY: -0.4,
    bodyColor: 0x2a1a4a,
    headColor: 0x3a2a5a,
    legColor: 0x1a0a2a,
    hasHood: true,
    hoodColor: 0x2a1a4a,
    hasArms: true,
    armW: 0.13, armH: 0.7, armD: 0.13,
    armColor: 0x3a2a5a,
    attackDamage: 5,
    drops: [{ item: 320, count: [1, 2] }], // portal orb
    soundChance: 0.0004,
  },

  dragon: {
    name: 'Prismite Dragon',
    hp: 200,
    hostile: true,
    bodyW: 2.0, bodyH: 1.2, bodyD: 3.5,
    headW: 1.0, headH: 1.0, headD: 1.2,
    headOffZ: -2.0,
    headOffY: 0.0,
    legW: 0, legH: 0, legD: 0,
    bodyColor: 0x1a0a2a,
    headColor: 0x2a1a4a,
    hasWings: true,
    wingSpan: 5.0,
    wingColor: 0x3a1a5a,
    hasCrest: true,
    crestColor: 0xff3300,
    hasTail: true,
    tailSegments: 6,
    tailColor: 0x2a1a4a,
    attackDamage: 12,
    speed: 18,
    attackRange: 3,
    aggroRange: 40,
    knockbackResist: 0.8,
    isFlying: true,
    flyHeight: 12,
    flyCircleRadius: 20,
    flySpeed: 8,
    drops: [
      { item: 321, count: [2, 5] }, // dragon scales
      { item: 322, count: [1, 1] }, // dragon heart (guaranteed 1)
    ],
    soundChance: 0.001,
  },

  wanderer: {
    name: 'Glitched Wanderer',
    hp: 34,
    hostile: true,
    dimensionOnly: true,
    isPlayerSkin: true,
    skinPath: '/traveler_skin.png',
    variant: 'wanderer',
    bipedalLegs: true,
    bodyW: 0.5, bodyH: 1.6, bodyD: 0.3,
    headW: 0.5, headH: 0.4, headD: 0.4, // stretched, eyeless silhouette
    legW: 0.13, legH: 0.9, legD: 0.13,
    headOffY: -0.55,
    bodyColor: 0x2b2b5c,
    headColor: 0x3a3a6e,
    legColor: 0x18183a,
    hasEyes: true,
    eyeColor: 0xff4488,
    attackDamage: 8,
    provokeOnBreak: true,   // only attacks if you break blocks it stares at
    drops: [{ item: 701, count: [0, 2] }], // memory shards
    soundChance: 0.0005,
  },

  pixie: {
    name: 'Matrix Pixie',
    hp: 12,
    hostile: true,
    dimensionOnly: true,
    isFlying: true,
    bodyW: 0.35, bodyH: 0.35, bodyD: 0.35,
    headW: 0.4, headH: 0.4, headD: 0.4,
    legW: 0, legH: 0, legD: 0,
    headOffY: 0,
    bodyColor: 0x50e0c0,
    headColor: 0x50e0c0,
    legColor: 0x50e0c0,
    hasWings: true,
    wingSpan: 1.6,
    wingColor: 0x80e8d0,
    hasEyes: true,
    eyeColor: 0x000000,
    hasFairyGlow: true,
    attackDamage: 3,
    flyHeight: 2.5,
    flySpeed: 4.5,
    swapsBlocks: true,
    drops: [{ item: 700, count: [0, 2] }],
    soundChance: 0.0006,
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
  constructor(type, x, y, z, scene) {
    this.type = type;
    this._scene = scene;
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
    this.mesh = this._buildMesh(def);
    this.mesh.position.copy(this.position);
    this.mesh.traverse((child) => {
      if (child.isMesh) { child.castShadow = true; child.receiveShadow = true; }
    });

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
    this._cachedBody = null;
    this._cachedHead = null;
    this._cachedSnout = null;
    this.mesh.children.forEach(child => {
      if (child.name === 'body') { this._origBodyY = child.position.y; this._cachedBody = child; }
      if (child.name === 'head') { this._origHeadY = child.position.y; this._cachedHead = child; }
      if (child.name === 'snout') this._cachedSnout = child;
    });
  }

  // Floating name tag above the Traveler so it's easy to identify among the
  // blocky villager/wanderer NPCs.
  _addTravelerLabel(parent) {
    try {
      const c = document.createElement('canvas');
      c.width = 256; c.height = 48;
      const g = c.getContext('2d');
      g.clearRect(0, 0, 256, 48);
      g.font = 'bold 21px monospace';
      g.textAlign = 'center';
      g.textBaseline = 'middle';
      g.lineWidth = 6;
      g.strokeStyle = 'rgba(10,16,20,0.95)';
      g.strokeText('Traveler', 128, 24);
      g.fillStyle = '#55ddbb';
      g.fillText('Traveler', 128, 24);
      const tex = new THREE.CanvasTexture(c);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.minFilter = THREE.LinearFilter;
      const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false, depthWrite: false });
      const sprite = new THREE.Sprite(mat);
      sprite.scale.set(1.5, 0.28, 1);
      sprite.position.set(0, 2.35, 0);
      sprite.renderOrder = 999;
      parent.add(sprite);
    } catch (err) {
      console.warn('[BlockForge] Traveler label failed:', err);
    }
  }

  _cacheMats() {
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
    // ── Player-skin mobs (Traveler) ──
    if (def.isPlayerSkin) {
      const preset = { _dataUrl: null };
      this._playerModelReady = false;
      this._playerModel = null;
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const c = document.createElement('canvas');
        c.width = 64; c.height = 64;
        const g = c.getContext('2d');
        g.imageSmoothingEnabled = false;
        g.drawImage(img, 0, 0, 64, 64);
        if (this.type === 'wanderer') {
          // Glitched Wanderer: corrupt the player skin with a magenta wash and
          // scanlines so it reads as a broken copy, not an actual player.
          g.globalCompositeOperation = 'multiply';
          g.fillStyle = 'rgba(255,110,190,0.18)';
          g.fillRect(0, 0, 64, 64);
          g.globalCompositeOperation = 'source-over';
          g.fillStyle = 'rgba(255,68,136,0.35)';
          for (let y = 0; y < 64; y++) {
            if ((y + Math.floor(y / 4)) % 12 < 2) g.fillRect(0, y, 64, 1);
          }
          g.fillStyle = 'rgba(0,0,0,0.25)';
          g.fillRect(0, 24, 64, 3);
          g.fillRect(0, 52, 64, 2);
        }
        preset._customCanvas = c;
        const pm = new PlayerModel(this._scene, preset);
        pm.setVisible(true);
        pm.group.scale.set(0.9, 0.9, 0.9);
        pm.group.position.copy(this.position);
        this._playerModel = pm;
        this._playerModelReady = true;
        // Replace the placeholder group with the real model
        pm.group.traverse((ch) => { if (ch.isMesh) { ch.castShadow = true; ch.receiveShadow = true; } });
        this._scene.add(pm.group);
        this._scene.remove(this.mesh);
        this.mesh = pm.group;
        if (this.type === 'wanderer') {
          // Glitched Wanderer: faint magenta corruption aura that pulses.
          const gc = document.createElement('canvas');
          gc.width = 64; gc.height = 64;
          const gg = gc.getContext('2d');
          const grad = gg.createRadialGradient(32, 32, 2, 32, 32, 30);
          grad.addColorStop(0, 'rgba(255,80,170,0.6)');
          grad.addColorStop(0.5, 'rgba(255,80,170,0.18)');
          grad.addColorStop(1, 'rgba(255,80,170,0)');
          gg.fillStyle = grad;
          gg.fillRect(0, 0, 64, 64);
          const glowTex = new THREE.CanvasTexture(gc);
          glowTex.colorSpace = THREE.SRGBColorSpace;
          this._wandererGlow = new THREE.Sprite(new THREE.SpriteMaterial({
            map: glowTex, transparent: true, opacity: 0.5,
            blending: THREE.AdditiveBlending, depthWrite: false,
          }));
          this._wandererGlow.scale.set(2.4, 2.4, 1);
          this._wandererGlow.position.set(0, 1.0, 0);
          pm.group.add(this._wandererGlow);
        }
        this._cacheMats();
      };
      img.onerror = () => {
        console.warn('[BlockForge] Failed to load skin:', def.skinPath);
      };
      img.src = def.skinPath;
      // Return a placeholder group while the skin loads
      const group = new THREE.Group();
      return group;
    }

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
        const lx = def.bodyW * 0.45;
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
        pivot.position.set(side * (def.bodyW / 2 + armW / 2 + 0.02), def.legH + def.bodyH - 0.04, -0.04);
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
        pivot.position.set(side * (def.bodyW / 2 + def.armW / 2 + 0.02), def.legH + def.bodyH - 0.05, -0.04);
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

    // ── Staff (held in right hand) ──
    if (def.hasStaff) {
      const staffGeo = new THREE.BoxGeometry(0.06, 1.2, 0.06);
      const staffMat = new THREE.MeshLambertMaterial({ color: def.staffColor || 0x5a4a3a });
      const staff = new THREE.Mesh(staffGeo, staffMat);
      staff.position.set(def.bodyW / 2 + 0.2, def.legH + def.bodyH * 0.5, 0.1);
      staff.name = 'staff';
      group.add(staff);
      const orbGeo = new THREE.BoxGeometry(0.14, 0.14, 0.14);
      const orbMat = new THREE.MeshLambertMaterial({ color: 0x55ddbb, emissive: 0x226655, emissiveIntensity: 0.4 });
      const orb = new THREE.Mesh(orbGeo, orbMat);
      orb.position.set(def.bodyW / 2 + 0.2, def.legH + def.bodyH * 0.5 + 0.62, 0.1);
      orb.name = 'staffOrb';
      group.add(orb);
    }

    // ── Cape (flowing back cloth) ──
    if (def.hasCape) {
      const capeGeo = new THREE.BoxGeometry(def.bodyW * 0.9, def.bodyH * 0.8, 0.04);
      const capeMat = tex && tex.cape ? this._boxMats(tex.cape) : [new THREE.MeshLambertMaterial({ color: def.capeColor || 0x1e2e3e, side: THREE.DoubleSide })];
      const cape = new THREE.Mesh(capeGeo, Array.isArray(capeMat) ? capeMat : capeMat);
      cape.position.set(0, def.legH + def.bodyH * 0.45, -def.bodyD / 2 - 0.03);
      cape.name = 'cape';
      group.add(cape);
      this.cape = cape;
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

    // ── Dragon wings ──
    if (def.hasWings) {
      this.wings = [];
      for (const side of [-1, 1]) {
        const wingGroup = new THREE.Group();
        // Wing membrane (flat box)
        const wingGeo = new THREE.BoxGeometry(def.wingSpan * 0.5, 0.05, 2.0);
        const wingMat = new THREE.MeshLambertMaterial({ color: def.wingColor, side: THREE.DoubleSide });
        const wing = new THREE.Mesh(wingGeo, wingMat);
        wing.position.set(side * def.wingSpan * 0.25, 0, 0);
        wingGroup.add(wing);
        // Wing bone
        const boneGeo = new THREE.BoxGeometry(0.08, 0.08, 2.0);
        const boneMat = new THREE.MeshLambertMaterial({ color: def.headColor });
        const bone = new THREE.Mesh(boneGeo, boneMat);
        bone.position.set(0, 0.03, 0);
        wingGroup.add(bone);
        wingGroup.position.set(side * (def.bodyW / 2), def.legH + def.bodyH * 0.8, 0);
        wingGroup.name = 'wing';
        group.add(wingGroup);
        this.wings.push(wingGroup);
      }
    }

    // ── Fairy glow aura (pixie only) ──
    if (def.hasFairyGlow) {
      const glowGeo = new THREE.SphereGeometry(0.6, 8, 8);
      const glowMat = new THREE.MeshBasicMaterial({ color: 0x80ffe8, transparent: true, opacity: 0.15, side: THREE.DoubleSide });
      const glowMesh = new THREE.Mesh(glowGeo, glowMat);
      glowMesh.position.set(0, def.legH + def.bodyH * 0.5, 0);
      glowMesh.name = 'fairyGlow';
      group.add(glowMesh);
      this.fairyGlow = glowMesh;
    }

    // ── Dragon crest (spikes on head) ──
    if (def.hasCrest) {
      const crestMat = new THREE.MeshLambertMaterial({ color: def.crestColor });
      for (let i = 0; i < 3; i++) {
        const spikeGeo = new THREE.BoxGeometry(0.1, 0.2 + i * 0.05, 0.1);
        const spike = new THREE.Mesh(spikeGeo, crestMat);
        spike.position.set(0, headY + def.headH / 2 + 0.1 + i * 0.02, headZ + def.headD * 0.2 - i * 0.15);
        spike.name = 'crest';
        group.add(spike);
      }
    }

    // ── Dragon tail (segmented) ──
    if (def.hasTail && def.tailSegments) {
      this.tailSegments = [];
      for (let i = 0; i < def.tailSegments; i++) {
        const segSize = 0.12 - i * 0.012;
        const segGeo = new THREE.BoxGeometry(segSize, segSize, 0.3);
        const segMat = new THREE.MeshLambertMaterial({ color: def.tailColor });
        const seg = new THREE.Mesh(segGeo, segMat);
        seg.position.set(0, def.legH + def.bodyH * 0.5, def.bodyD / 2 + 0.15 + i * 0.28);
        seg.name = 'tailSeg';
        group.add(seg);
        this.tailSegments.push(seg);
      }
    }

    // ── Floating name tag so the findable Traveler is easy to spot ──
    if (this.type === 'traveler') this._addTravelerLabel(group);

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
    if (this.type === 'slime') return this._slimeTextures(def);
    if (this.type === 'villager') return this._villagerTextures(def);
    if (this.type === 'traveler') return this._travelerTextures(def);
    if (this.type === 'blower') return this._blowerTextures(def);
    if (this.type === 'portalman') return this._portalmanTextures(def);
    if (this.type === 'dragon') return this._dragonTextures(def);
    if (this.type === 'wanderer') return this._wandererTextures(def);
    if (this.type === 'pixie') return this._pixieTextures(def);
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

  _chickenTextures(def) {
    const s = 64;
    const WHITE = 0xf8f8f8;
    const CREAM = 0xf0e8d8;
    const RED = 0xcc2222;

    const bodySide = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#f8f8f8';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, WHITE, 12);
      // Wing detail — layered feather strokes
      ctx.fillStyle = 'rgba(224,214,200,0.45)';
      ctx.beginPath();
      ctx.ellipse(16, 26, 12, 18, 0.15, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(250,246,240,0.5)';
      for (let i = 0; i < 4; i++) {
        ctx.fillRect(8, 12 + i * 9, 20, 4);
      }
    });
    const bodyFront = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#f8f8f8';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, WHITE, 10);
      // Chest feather patch
      ctx.fillStyle = 'rgba(240,232,216,0.6)';
      ctx.beginPath();
      ctx.ellipse(32, 30, 16, 20, 0, 0, Math.PI * 2);
      ctx.fill();
    });
    const bodyTail = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#f8f8f8';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, WHITE, 12);
      // Tail feathers fanning up
      ctx.fillStyle = 'rgba(224,214,200,0.5)';
      for (let i = 0; i < 5; i++) {
        const bx = 6 + i * 12;
        ctx.beginPath();
        ctx.ellipse(bx, 16, 6, 16, (i - 2) * 0.25, 0, Math.PI * 2);
        ctx.fill();
      }
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
      // Beak — pointed
      ctx.fillStyle = '#e8a020';
      ctx.fillRect(24, 32, 16, 8);
      ctx.fillStyle = '#d09018';
      ctx.fillRect(26, 34, 12, 4);
      // Wattle (dewlap)
      ctx.fillStyle = '#cc2222';
      ctx.beginPath();
      ctx.ellipse(32, 46, 6, 9, 0, 0, Math.PI * 2);
      ctx.fill();
      // Comb — three bumps
      ctx.fillStyle = '#cc2222';
      ctx.beginPath();
      ctx.arc(18, 10, 7, Math.PI, 0);
      ctx.arc(32, 6, 8, Math.PI, 0);
      ctx.arc(46, 10, 7, Math.PI, 0);
      ctx.fill();
    });
    const head = [bodySide, bodySide, bodyTop, bodyBot, bodySide, headFront];
    const body = [bodySide, bodySide, bodyTop, bodyBot, bodyFront, bodyTail];

    const legTex = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#e8a020';
      ctx.fillRect(0, 0, s, s);
      // Toe darkening
      ctx.fillStyle = '#c08020';
      ctx.fillRect(0, s - 8, s, 8);
    });
    const leg = [legTex, legTex, legTex, legTex, legTex, legTex];
    return { body, head, leg };
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
      // Eyebrow furrows (villager's grumpy brow)
      ctx.fillStyle = '#8a6a4a';
      ctx.fillRect(8, 16, 22, 5);
      ctx.fillRect(34, 16, 22, 5);
      // Eyes — big white with brown pupil
      const eyeY = 24;
      ctx.fillStyle = '#fff';
      ctx.fillRect(10, eyeY, 14, 12);
      ctx.fillRect(40, eyeY, 14, 12);
      ctx.fillStyle = '#3a2510';
      ctx.fillRect(14, eyeY + 2, 8, 8);
      ctx.fillRect(44, eyeY + 2, 8, 8);
      ctx.fillStyle = '#fff';
      ctx.fillRect(16, eyeY + 3, 3, 3);
      ctx.fillRect(46, eyeY + 3, 3, 3);
      // Big nose (villager's signature)
      ctx.fillStyle = '#c0906a';
      ctx.fillRect(28, 32, 8, 6);
      ctx.fillStyle = '#b08060';
      ctx.fillRect(30, 38, 4, 4);
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

    const bodyFront = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#' + TUNIC.toString(16).padStart(6,'0');
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, TUNIC, 15);
      // Lighter apron panel down the front
      ctx.fillStyle = 'rgba(240,238,230,0.35)';
      ctx.fillRect(14, 14, 36, 36);
      // Apron cross straps
      ctx.fillStyle = '#' + BELT.toString(16).padStart(6,'0');
      ctx.fillRect(14, 14, 36, 6);
      ctx.fillRect(14, 26, 6, 24);
      ctx.fillRect(44, 26, 6, 24);
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

    const body = [bodySide, bodySide, bodyTop, bodyBot, bodySide, bodyFront];

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

  _travelerTextures(def) {
    const s = 64;
    const SKIN = def.headColor || 0xc8a882;
    const CLOAK = def.bodyColor || 0x2a3a4a;
    const HOOD = def.hoodColor || 0x1a2a3a;
    const BELT = def.beltColor || 0x2a1a0a;
    const BOOTS = def.legColor || 0x1a2a3a;
    const CAPE = def.capeColor || 0x1e2e3e;
    const ACCENT = 0x55ddbb;

    const skinSide = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#' + SKIN.toString(16).padStart(6,'0');
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, SKIN, 10);
      // Wrinkle lines
      ctx.fillStyle = 'rgba(0,0,0,0.08)';
      ctx.fillRect(16, 10, 1, 40);
      ctx.fillRect(40, 8, 1, 44);
    });
    const skinTop = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#' + HOOD.toString(16).padStart(6,'0');
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, HOOD, 10);
      // Hood seam stitch
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      ctx.fillRect(0, s/2 - 1, s, 2);
    });
    const skinFront = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#' + SKIN.toString(16).padStart(6,'0');
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, SKIN, 10);
      // Hood shadow over forehead
      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.fillRect(0, 0, s, 14);
      // Eyes — glowing cyan with slit pupils
      ctx.fillStyle = '#88ffdd';
      ctx.fillRect(10, 22, 12, 8);
      ctx.fillRect(42, 22, 12, 8);
      ctx.fillStyle = '#113322';
      ctx.fillRect(13, 23, 6, 6);
      ctx.fillRect(45, 23, 6, 6);
      // Pupils
      ctx.fillStyle = '#001a10';
      ctx.fillRect(14, 24, 4, 4);
      ctx.fillRect(46, 24, 4, 4);
      // Highlights
      ctx.fillStyle = '#ccffee';
      ctx.fillRect(13, 23, 2, 2);
      ctx.fillRect(45, 23, 2, 2);
      // Thin mouth
      ctx.fillStyle = '#7a5a3a';
      ctx.fillRect(22, 40, 20, 2);
      // Nose
      ctx.fillStyle = 'rgba(0,0,0,0.06)';
      ctx.fillRect(30, 32, 4, 6);
      // Scar across left cheek
      ctx.fillStyle = 'rgba(200,160,120,0.5)';
      ctx.fillRect(14, 30, 2, 12);
    });
    const skinBack = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#' + HOOD.toString(16).padStart(6,'0');
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, HOOD, 10);
      // Hood drape seam
      ctx.fillStyle = 'rgba(0,0,0,0.1)';
      ctx.fillRect(s/2 - 1, 0, 2, s);
    });
    const head = [skinSide, skinSide, skinTop, skinSide, skinBack, skinFront];

    const bodySide = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#' + CLOAK.toString(16).padStart(6,'0');
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, CLOAK, 15);
      // Cloak hem at bottom
      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.fillRect(0, s - 12, s, 12);
      // Tattered edge
      ctx.fillStyle = '#' + CLOAK.toString(16).padStart(6,'0');
      for (let x = 0; x < s; x += 4) {
        const h = 3 + Math.floor(Math.sin(x * 0.7) * 2);
        ctx.fillRect(x, s - h, 2, h);
      }
      // Belt stripe
      ctx.fillStyle = '#' + BELT.toString(16).padStart(6,'0');
      ctx.fillRect(0, s - 12, s, 4);
      // Buckle
      ctx.fillStyle = '#aa8844';
      ctx.fillRect(s/2 - 3, s - 13, 6, 6);
      ctx.fillStyle = '#ddaa55';
      ctx.fillRect(s/2 - 2, s - 12, 4, 4);
    });
    const bodyFront = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#' + CLOAK.toString(16).padStart(6,'0');
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, CLOAK, 15);
      // Cross-strap belt
      ctx.fillStyle = '#' + BELT.toString(16).padStart(6,'0');
      ctx.fillRect(14, 14, 36, 4);
      ctx.fillRect(26, 14, 6, 36);
      // Echo shard pendant (glowing)
      ctx.fillStyle = '#33aa88';
      ctx.fillRect(27, 20, 6, 8);
      ctx.fillStyle = '#55ddbb';
      ctx.fillRect(28, 21, 4, 6);
      ctx.fillStyle = '#88ffee';
      ctx.fillRect(29, 22, 2, 4);
      // Inner tunic detail
      ctx.fillStyle = 'rgba(255,255,255,0.04)';
      ctx.fillRect(16, 30, 32, 10);
      // Bottom hem
      ctx.fillStyle = 'rgba(0,0,0,0.12)';
      ctx.fillRect(0, s - 12, s, 12);
      // Belt with buckle
      ctx.fillStyle = '#' + BELT.toString(16).padStart(6,'0');
      ctx.fillRect(0, s - 12, s, 4);
      ctx.fillStyle = '#aa8844';
      ctx.fillRect(s/2 - 3, s - 13, 6, 6);
    });
    const bodyTop = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#' + CLOAK.toString(16).padStart(6,'0');
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, CLOAK, 15);
      // Hood drape across shoulders
      ctx.fillStyle = 'rgba(0,0,0,0.1)';
      ctx.fillRect(4, 4, s - 8, s - 8);
    });
    const bodyBot = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#' + CLOAK.toString(16).padStart(6,'0');
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, CLOAK, 15);
      // Cloak hem
      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.fillRect(0, 0, s, s);
    });
    const body = [bodySide, bodySide, bodyTop, bodyBot, bodySide, bodyFront];

    // Cape textures
    const capeBack = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#' + CAPE.toString(16).padStart(6,'0');
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, CAPE, 12);
      // Tattered hem
      ctx.fillStyle = 'rgba(0,0,0,0.2)';
      ctx.fillRect(0, s - 16, s, 16);
      ctx.fillStyle = '#' + CAPE.toString(16).padStart(6,'0');
      for (let x = 0; x < s; x += 6) {
        const h = 4 + Math.floor(Math.sin(x * 0.5) * 3);
        ctx.fillRect(x, s - h, 3, h);
      }
      // Echo rune symbol
      ctx.fillStyle = 'rgba(85,221,187,0.3)';
      ctx.fillRect(s/2 - 6, 10, 12, 20);
      ctx.fillStyle = 'rgba(85,221,187,0.15)';
      ctx.fillRect(s/2 - 4, 12, 8, 16);
    });
    const cape = [capeBack, capeBack, capeBack, capeBack, capeBack, capeBack];

    const legTex = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#' + BOOTS.toString(16).padStart(6,'0');
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, BOOTS, 12);
      // Boot strap
      ctx.fillStyle = '#' + BELT.toString(16).padStart(6,'0');
      ctx.fillRect(0, 0, s, 8);
      // Boot sole
      ctx.fillStyle = 'rgba(0,0,0,0.2)';
      ctx.fillRect(0, s - 4, s, 4);
    });
    const leg = [legTex, legTex, legTex, legTex, legTex, legTex];
    return { body, head, leg, cape };
  }

  _blowerTextures(def) {
    const s = 64;
    // Industrial TNT-blower: charcoal metal body with orange hazard bands,
    // and a cannon-barrel snout that lobs lit TNT at the player.
    const IRON = 0x4a4a4a, IRON_DARK = 0x303030, ORANGE = 0xd86820;

    const bodySide = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#4a4a4a';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, IRON, 14);
      // Metal panel rivets
      ctx.fillStyle = 'rgba(20,20,20,0.5)';
      ctx.fillRect(0, s * 0.45, s, 3);
      ctx.fillRect(0, s * 0.55, s, 3);
      // Hazard chevron stripe
      ctx.save();
      ctx.translate(s / 2, s * 0.5);
      ctx.rotate(Math.PI / 4);
      ctx.fillStyle = '#d86820';
      ctx.fillRect(-s * 0.2, -6, s * 0.4, 12);
      ctx.fillRect(-s * 0.65, -6, s * 0.3, 12);
      ctx.fillRect(s * 0.35, -6, s * 0.3, 12);
      ctx.restore();
    });
    const bodyTop = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#4a4a4a';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, IRON, 10);
    });
    const bodyBot = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#303030';
      ctx.fillRect(0, 0, s, s);
    });
    const bodyFront = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#4a4a4a';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, IRON, 12);
      // Glowing TNT-core window
      ctx.fillStyle = '#ff5a20';
      ctx.fillRect(20, 16, 24, 22);
      ctx.fillStyle = '#ffb020';
      ctx.fillRect(24, 20, 16, 14);
      // Core cracks
      ctx.fillStyle = '#c84000';
      ctx.fillRect(30, 20, 3, 14);
      ctx.fillRect(24, 26, 16, 3);
      // Chest vent slots
      ctx.fillStyle = '#222';
      ctx.fillRect(24, 42, 16, 3);
      ctx.fillRect(24, 50, 16, 3);
    });
    const body = [bodySide, bodySide, bodyTop, bodyBot, bodyFront, bodyFront];

    const headSide = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#5a5a5a';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, IRON, 12);
      // Ear bolts
      ctx.fillStyle = '#333';
      ctx.fillRect(6, 10, 8, 8);
      ctx.fillRect(50, 10, 8, 8);
    });
    const headTop = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#5a5a5a';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, IRON, 10);
    });
    const headBot = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#3a3a3a';
      ctx.fillRect(0, 0, s, s);
    });
    const headBack = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#4a4a4a';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, IRON, 10);
    });
    const headFront = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#5a5a5a';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, IRON, 10);
      // Dark goggles over the eyes
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(10, 22, 18, 14);
      ctx.fillRect(36, 22, 18, 14);
      // Glowing amber eye dots
      ctx.fillStyle = '#ffa030';
      ctx.fillRect(16, 26, 6, 6);
      ctx.fillRect(42, 26, 6, 6);
    });
    const head = [headSide, headSide, headTop, headBot, headBack, headFront];

    // Cannon barrel snout — dark with an orange muzzle
    const snoutTex = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#2e2e2e';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, IRON_DARK, 10);
      // Muzzle ring
      ctx.fillStyle = '#d86820';
      ctx.fillRect(0, 0, s, 14);
      // Barrel bands
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(0, 30, s, 4);
      ctx.fillRect(0, 46, s, 4);
    });
    const snout = [snoutTex, snoutTex, snoutTex, snoutTex, snoutTex, snoutTex];

    const legTex = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#303030';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, IRON_DARK, 10);
      // Metal feet
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(0, s - 8, s, 8);
    });
    const leg = [legTex, legTex, legTex, legTex, legTex, legTex];
    // Arms use the same iron skin as the body (for the throw swing animation)
    const armTex = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#4a4a4a';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, IRON, 10);
    });
    const arm = [armTex, armTex, armTex, armTex, armTex, armTex];
    return { body, head, leg, snout, arm };
  }

  _portalmanTextures(def) {
    const s = 64;
    // Portal guardian: pale void robes with a swirling portal core and
    // glowing cyan eyes. Drops Portal Orbs.
    const VOID = 0x2a1a4a, VOID_DARK = 0x1a0a2a, CYAN = 0x40e0ff;

    const bodySide = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#2a1a4a';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, VOID, 14);
      // Runic marks
      ctx.fillStyle = 'rgba(64,224,255,0.25)';
      ctx.fillRect(10, 20, 3, 18);
      ctx.fillRect(50, 28, 3, 14);
    });
    const bodyTop = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#2a1a4a';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, VOID, 10);
    });
    const bodyBot = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#1a0a2a';
      ctx.fillRect(0, 0, s, s);
    });
    const bodyFront = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#2a1a4a';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, VOID, 12);
      // Swirling portal core on the chest
      const g = ctx.createRadialGradient(32, 34, 2, 32, 34, 18);
      g.addColorStop(0, '#80f0ff');
      g.addColorStop(0.5, '#20a0d0');
      g.addColorStop(1, 'rgba(30,80,120,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(32, 34, 18, 0, Math.PI * 2);
      ctx.fill();
      // Swirl streak
      ctx.strokeStyle = 'rgba(200,255,255,0.6)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(32, 34, 10, 0, Math.PI * 1.3);
      ctx.stroke();
    });
    const body = [bodySide, bodySide, bodyTop, bodyBot, bodyFront, bodyFront];

    const headSide = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#2a1a4a';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, VOID, 12);
    });
    const headTop = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#2a1a4a';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, VOID, 10);
    });
    const headBot = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#1a0a2a';
      ctx.fillRect(0, 0, s, s);
    });
    const headBack = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#22133a';
      ctx.fillRect(0, 0, s, s);
    });
    const headFront = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#2a1a4a';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, VOID, 10);
      // Void face — dark, with glowing cyan eyes
      ctx.fillStyle = '#0e0620';
      ctx.fillRect(8, 18, 48, 34);
      ctx.fillStyle = '#40e0ff';
      ctx.fillRect(12, 26, 14, 10);
      ctx.fillRect(38, 26, 14, 10);
      ctx.fillStyle = '#a0f8ff';
      ctx.fillRect(14, 28, 5, 5);
      ctx.fillRect(40, 28, 5, 5);
    });
    const head = [headSide, headSide, headTop, headBot, headBack, headFront];

    const legTex = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#1a0a2a';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, VOID_DARK, 10);
      // Fading robe bottom
      ctx.fillStyle = 'rgba(64,224,255,0.15)';
      ctx.fillRect(0, s - 10, s, 10);
    });
    const leg = [legTex, legTex, legTex, legTex, legTex, legTex];
    return { body, head, leg };
  }

  _dragonTextures(def) {
    const s = 64;
    const DARK = 0x1a0a2a, PURPLE = 0x2a1a4a, RED = 0xff3300, ORANGE = 0xff6600;

    const bodySide = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#1a0a2a';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, DARK, 16);
      // Scale pattern
      ctx.fillStyle = 'rgba(60,20,80,0.4)';
      for (let y = 4; y < s; y += 8) {
        for (let x = (y % 16 === 4 ? 0 : 4); x < s; x += 8) {
          ctx.fillRect(x, y, 6, 6);
          ctx.fillStyle = 'rgba(40,10,60,0.3)';
          ctx.fillRect(x + 1, y + 1, 4, 4);
        }
      }
      // Belly stripe
      ctx.fillStyle = 'rgba(80,30,100,0.5)';
      ctx.fillRect(0, s * 0.3, s, s * 0.4);
    });
    const bodyTop = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#1a0a2a';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, DARK, 12);
    });
    const bodyBot = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#2a1040';
      ctx.fillRect(0, 0, s, s);
    });
    const bodyFront = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#1a0a2a';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, DARK, 14);
      // Chest glow
      const g = ctx.createRadialGradient(32, 32, 4, 32, 32, 24);
      g.addColorStop(0, 'rgba(255,51,0,0.5)');
      g.addColorStop(1, 'rgba(100,20,0,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, s, s);
    });
    const body = [bodySide, bodySide, bodyTop, bodyBot, bodyFront, bodyFront];

    const headSide = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#2a1a4a';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, PURPLE, 12);
    });
    const headFront = this._tex(s, s, (ctx) => {
      ctx.fillStyle = '#2a1a4a';
      ctx.fillRect(0, 0, s, s);
      this._noiseTex(ctx, s, s, PURPLE, 10);
      // Eyes
      ctx.fillStyle = '#ff3300';
      ctx.fillRect(8, 22, 16, 12);
      ctx.fillRect(40, 22, 16, 12);
      ctx.fillStyle = '#ffaa00';
      ctx.fillRect(12, 24, 8, 6);
      ctx.fillRect(44, 24, 8, 6);
      // Pupils
      ctx.fillStyle = '#000';
      ctx.fillRect(14, 26, 3, 4);
      ctx.fillRect(48, 26, 3, 4);
      // Nostrils
      ctx.fillStyle = '#ff2200';
      ctx.fillRect(22, 42, 8, 6);
      ctx.fillRect(34, 42, 8, 6);
      // Fire glow
      const g = ctx.createRadialGradient(32, 50, 2, 32, 50, 14);
      g.addColorStop(0, 'rgba(255,100,0,0.6)');
      g.addColorStop(1, 'rgba(255,50,0,0)');
      ctx.fillStyle = g;
      ctx.fillRect(18, 36, 28, 20);
    });
    const headBot = this._tex(s, s, (ctx) => { ctx.fillStyle = '#2a1040'; ctx.fillRect(0, 0, s, s); });
    const head = [headSide, headSide, headSide, headBot, headSide, headFront];

    const legTex = this._tex(8, 8, (ctx) => { ctx.fillStyle = '#1a0a2a'; ctx.fillRect(0, 0, 8, 8); });
    const leg = [legTex, legTex, legTex, legTex, legTex, legTex];
    return { body, head, leg };
  }

  _wandererTextures(def) {
    const s = 32;
    const BASE = 0x2b2b5c, DARK = 0x181838, EDGE = 0x5050a0,
          GLITCH = 0x22d3ee, EYE = 0xff4488;

    const bodySide = this._tex(s, s, (ctx) => {
      ctx.fillStyle = 'rgb(28,26,58)';
      ctx.fillRect(0, 0, s, s);
      // Vertical wireframe columns (sodium static of the Shattered Echo)
      ctx.strokeStyle = 'rgba(112,112,190,0.55)';
      ctx.lineWidth = 1;
      for (let x = 2; x < s; x += 4) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, s); ctx.stroke();
      }
      // Horizontal scanlines
      ctx.fillStyle = 'rgba(90,90,170,0.12)';
      for (let y = 0; y < s; y += 2) ctx.fillRect(0, y, s, 1);
      // Glitch streaks (random horizontal slices of bright cyan)
      for (let i = 0; i < 4; i++) {
        const gy = Math.floor(Math.random() * s);
        ctx.fillStyle = i % 2 ? 'rgba(34,211,238,0.7)' : 'rgba(200,120,255,0.55)';
        ctx.fillRect(Math.floor(Math.random() * 8), gy, 6 + Math.random() * 18, 1);
      }
      // Wandering dark cracks
      ctx.strokeStyle = 'rgba(10,8,24,0.9)';
      let cx = 4, cy = 0;
      ctx.beginPath(); ctx.moveTo(cx, cy);
      while (cy < s) { cy += 2 + Math.random() * 3; cx += (Math.random() - 0.5) * 6; ctx.lineTo(cx, cy); }
      ctx.stroke();
    });

    const bodyTop = this._tex(s, s, (ctx) => {
      ctx.fillStyle = 'rgb(48,44,92)';
      ctx.fillRect(0, 0, s, s);
      ctx.strokeStyle = 'rgba(120,120,200,0.6)';
      for (let x = 2; x < s; x += 4) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, s); ctx.stroke(); }
      for (let y = 2; y < s; y += 4) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(s, y); ctx.stroke(); }
      ctx.fillStyle = 'rgba(34,211,238,0.5)';
      ctx.fillRect(12, 12, 3, 1);
    });

    const bodyBot = this._tex(s, s, (ctx) => {
      ctx.fillStyle = 'rgb(16,15,38)';
      ctx.fillRect(0, 0, s, s);
      ctx.strokeStyle = 'rgba(70,70,140,0.4)';
      for (let x = 2; x < s; x += 4) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, s); ctx.stroke(); }
    });

    const headSide = this._tex(s, s, (ctx) => {
      ctx.fillStyle = 'rgb(44,42,96)';
      ctx.fillRect(0, 0, s, s);
      ctx.strokeStyle = 'rgba(120,120,200,0.6)';
      for (let x = 2; x < s; x += 4) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, s); ctx.stroke(); }
      // Glitch band
      ctx.fillStyle = 'rgba(255,68,136,0.5)';
      ctx.fillRect(4, Math.floor(Math.random() * 24), 10, 1);
    });

    const headTop = this._tex(s, s, (ctx) => {
      ctx.fillStyle = 'rgb(52,50,108)';
      ctx.fillRect(0, 0, s, s);
      ctx.strokeStyle = 'rgba(140,140,220,0.6)';
      for (let x = 2; x < s; x += 4) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, s); ctx.stroke(); }
      for (let y = 2; y < s; y += 4) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(s, y); ctx.stroke(); }
    });

    const headBot = this._tex(s, s, (ctx) => {
      ctx.fillStyle = 'rgb(24,22,60)';
      ctx.fillRect(0, 0, s, s);
      ctx.strokeStyle = 'rgba(70,70,140,0.4)';
      for (let x = 2; x < s; x += 4) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, s); ctx.stroke(); }
    });

    const headBack = this._tex(s, s, (ctx) => {
      ctx.fillStyle = 'rgb(32,30,74)';
      ctx.fillRect(0, 0, s, s);
      ctx.strokeStyle = 'rgba(90,90,160,0.5)';
      for (let x = 2; x < s; x += 4) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, s); ctx.stroke(); }
      ctx.fillStyle = 'rgba(200,120,255,0.45)';
      ctx.fillRect(14, 6, 4, 1);
    });

    const headFront = this._tex(s, s, (ctx) => {
      ctx.fillStyle = 'rgb(48,46,104)';
      ctx.fillRect(0, 0, s, s);
      ctx.strokeStyle = 'rgba(120,120,200,0.6)';
      for (let x = 2; x < s; x += 4) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, s); ctx.stroke(); }
      // Cracked "screen" glitch eyes (dimension's glitched gaze)
      ctx.fillStyle = 'rgba(255,68,136,0.9)';
      ctx.fillRect(4, 8, 3, 6);
      ctx.fillRect(25, 8, 3, 6);
      ctx.fillStyle = 'rgba(255,150,200,0.95)';
      ctx.fillRect(4, 8, 1, 6);
      ctx.fillRect(25, 8, 1, 6);
      // Scanline tear across the face
      ctx.fillStyle = 'rgba(34,211,238,0.55)';
      ctx.fillRect(0, 16, s, 1);
    });

    const legTex = this._tex(s, s, (ctx) => {
      ctx.fillStyle = 'rgb(20,19,46)';
      ctx.fillRect(0, 0, s, s);
      ctx.strokeStyle = 'rgba(70,70,140,0.45)';
      for (let x = 2; x < s; x += 4) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, s); ctx.stroke(); }
      ctx.fillStyle = 'rgba(34,211,238,0.3)';
      ctx.fillRect(0, 10, s, 1);
    });

    const body = [bodySide, bodySide, bodyTop, bodyBot, bodySide, bodySide];
    const head = [headSide, headSide, headTop, headBot, headBack, headFront];
    return { body, head, leg: [legTex, legTex, legTex, legTex, legTex, legTex] };
  }

  _pixieTextures(def) {
    const s = 32;
    const BASE = 0x50e0c0, DARK = 0x20a080, EDGE = 0x9ff0dc, GLOW = 0xb8fff0;

    const bodySide = this._tex(s, s, (ctx) => {
      ctx.fillStyle = 'rgb(40,140,120)';
      ctx.fillRect(0, 0, s, s);
      // Soft fairy body gradient
      const grad = ctx.createLinearGradient(0, 0, 0, s);
      grad.addColorStop(0, 'rgba(120,255,230,0.4)');
      grad.addColorStop(0.5, 'rgba(60,180,155,0.2)');
      grad.addColorStop(1, 'rgba(25,90,75,0.5)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, s, s);
      // Tiny sparkle dots
      ctx.fillStyle = 'rgba(200,255,245,0.6)';
      for (let i = 0; i < 4; i++) {
        const x = 4 + Math.floor(Math.random() * 24);
        const y = 4 + Math.floor(Math.random() * 24);
        ctx.fillRect(x, y, 1, 1);
      }
    });

    const bodyTop = this._tex(s, s, (ctx) => {
      ctx.fillStyle = 'rgb(65,175,155)';
      ctx.fillRect(0, 0, s, s);
      const grad = ctx.createRadialGradient(s/2, s/2, 2, s/2, s/2, s/2);
      grad.addColorStop(0, 'rgba(200,255,245,0.5)');
      grad.addColorStop(1, 'rgba(40,120,100,0.2)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, s, s);
    });

    const bodyBot = this._tex(s, s, (ctx) => {
      ctx.fillStyle = 'rgb(22,80,68)';
      ctx.fillRect(0, 0, s, s);
    });

    const headSide = this._tex(s, s, (ctx) => {
      ctx.fillStyle = 'rgb(48,155,135)';
      ctx.fillRect(0, 0, s, s);
      const grad = ctx.createLinearGradient(0, 0, 0, s);
      grad.addColorStop(0, 'rgba(150,255,240,0.35)');
      grad.addColorStop(1, 'rgba(30,100,85,0.4)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, s, s);
    });

    const headTop = this._tex(s, s, (ctx) => {
      ctx.fillStyle = 'rgb(75,180,160)';
      ctx.fillRect(0, 0, s, s);
      // Crown glow
      const grad = ctx.createRadialGradient(s/2, s/2, 1, s/2, s/2, s/2);
      grad.addColorStop(0, 'rgba(220,255,250,0.6)');
      grad.addColorStop(1, 'rgba(60,150,130,0.1)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, s, s);
    });

    const headBot = this._tex(s, s, (ctx) => {
      ctx.fillStyle = 'rgb(28,90,78)';
      ctx.fillRect(0, 0, s, s);
    });

    const headBack = this._tex(s, s, (ctx) => {
      ctx.fillStyle = 'rgb(38,120,105)';
      ctx.fillRect(0, 0, s, s);
    });

    const headFront = this._tex(s, s, (ctx) => {
      ctx.fillStyle = 'rgb(55,160,140)';
      ctx.fillRect(0, 0, s, s);
      // Big fairy eyes (larger, more expressive)
      ctx.fillStyle = '#001a14';
      ctx.fillRect(5, 10, 5, 8);   // left eye (bigger)
      ctx.fillRect(22, 10, 5, 8);   // right eye (bigger)
      // Cyan iris glow
      ctx.fillStyle = 'rgba(80,240,210,0.95)';
      ctx.fillRect(6, 12, 3, 5);
      ctx.fillRect(23, 12, 3, 5);
      // White highlight
      ctx.fillStyle = 'rgba(255,255,255,0.9)';
      ctx.fillRect(6, 12, 1, 2);
      ctx.fillRect(23, 12, 1, 2);
      // Tiny smile
      ctx.fillStyle = 'rgba(180,255,245,0.5)';
      ctx.fillRect(13, 22, 6, 1);
    });

    const body = [bodySide, bodySide, bodyTop, bodyBot, bodySide, bodySide];
    const head = [headSide, headSide, headTop, headBot, headBack, headFront];
    return { body, head, leg: [bodySide, bodySide, bodySide, bodySide, bodySide, bodySide] };
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
        // Minecraft-style death: fall over sideways (0.35s), then sink into
        // the ground while flashing and fading out.
        const FALL_T = 0.35;
        const SINK_T = 0.55;
        const total = FALL_T + SINK_T;
        const t = Math.min(this.deathTimer / total, 1);
        // Fall over
        const fall = Math.min(this.deathTimer / FALL_T, 1);
        const ease = 1 - Math.pow(1 - fall, 2);
        this.mesh.rotation.x = ease * Math.PI / 2;
        // Sink into ground
        const sink = t > 1 ? 1 : Math.max((this.deathTimer - FALL_T) / SINK_T, 0);
        this.mesh.position.y = this.position.y - Math.pow(sink, 1.6) * 1.2;
        // Death flash (white→red) then fade
        const opacity = Math.max(1 - (t > 1 ? 1 : Math.max((this.deathTimer - FALL_T) / SINK_T, 0)), 0);
        this.mesh.traverse((child) => {
          if (child.isMesh && child.material) {
            child.material.transparent = opacity < 1;
            child.material.opacity = opacity;
          }
        });
        if (this._allMats && this._allMats.length) {
          const flash = Math.min(this.deathTimer / 0.3, 1);
          const red = 0.65 + flash * 0.35;
          for (const m of this._allMats) {
            if (m.color) m.color.setRGB(red, Math.max(0.35 - flash * 0.35, 0.05), Math.max(0.35 - flash * 0.35, 0.05));
          }
        }
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
      const playerDistSq = pdx * pdx + pdz * pdz;
      if (playerDistSq < 64) {
        // Smoothly turn toward player
        const lookYaw = Math.atan2(-pdx, -pdz);
        let dy = lookYaw - this.yaw;
        while (dy > Math.PI) dy -= Math.PI * 2;
        while (dy < -Math.PI) dy += Math.PI * 2;
        this.yaw += dy * Math.min(1, dt * 2);
        // Head tilt toward player (vertical look) — stored separately, applied in animation block
        const eyeY = this.position.y + (MOB_TYPES[this.type]?.legH || 0) + (MOB_TYPES[this.type]?.bodyH || 0) + (MOB_TYPES[this.type]?.headH || 0) * 0.5;
        const vertDy = (playerPos.y + 1.6) - eyeY;
        const vertAngle = Math.atan2(vertDy, Math.sqrt(playerDistSq)) * 0.3;
        if (!this._lookAtX) this._lookAtX = 0;
        this._lookAtX += (vertAngle - this._lookAtX) * Math.min(1, dt * 3);
      } else {
        if (!this._lookAtX) this._lookAtX = 0;
        this._lookAtX *= 0.9;
      }
    }

    // Movement
    const def = MOB_TYPES[this.type];
    const isFlying = def.isFlying;
    if (isFlying) {
      // Dragon flying AI: circle player, swoop to attack
      if (playerPos) {
        const pdx = playerPos.x - this.position.x;
        const pdz = playerPos.z - this.position.z;
        const playerDistSq = pdx * pdx + pdz * pdz;
        if (playerDistSq < def.aggroRange * def.aggroRange) {
          // Circle the player
          const circleAngle = Math.atan2(pdx, pdz) + Math.PI * 0.5;
          this.targetYaw = circleAngle;
          let dy = this.targetYaw - this.yaw;
          while (dy > Math.PI) dy -= Math.PI * 2;
          while (dy < -Math.PI) dy += Math.PI * 2;
          this.yaw += dy * dt * 2;
          this.velocity.x = -Math.sin(this.yaw) * def.flySpeed;
          this.velocity.z = -Math.cos(this.yaw) * def.flySpeed;
          // Swoop down when close
          if (Math.sqrt(playerDistSq) < def.attackRange * 2) {
            this.velocity.y = -4;
          } else {
            const targetY = playerPos.y + def.flyHeight;
            this.velocity.y += (targetY - this.position.y) * dt * 2;
          }
        } else {
          // Wander
          this.velocity.x = -Math.sin(this.yaw) * def.flySpeed * 0.5;
          this.velocity.z = -Math.cos(this.yaw) * def.flySpeed * 0.5;
          const targetY = this.spawnPos.y + def.flyHeight;
          this.velocity.y += (targetY - this.position.y) * dt;
        }
      }
      this.position.x += this.velocity.x * dt;
      this.position.z += this.velocity.z * dt;
      this.position.y += this.velocity.y * dt;
      // Keep above ground
      if (this.position.y < 5) this.position.y = 5;
      // Wing animation (FA+: variable flap speed with anticipation)
      if (this.wings) {
        const flySpeed = Math.sqrt(this.velocity.x ** 2 + this.velocity.z ** 2);
        const isFleeing = this.state === 'fleeing';
        const flapRate = isFleeing ? 18 : (flySpeed > 0.5 ? 10 : 6);
        this.walkPhase += dt * flapRate;
        const flap = Math.sin(this.walkPhase) * 0.5;
        const anticipate = Math.cos(this.walkPhase) * 0.12;
        this.wings[0].rotation.z = flap + anticipate;
        this.wings[1].rotation.z = -(flap + anticipate);
      }
      // Fairy glow pulse (FA+: layered sine waves for organic feel)
      if (this.fairyGlow) {
        const pulse1 = Math.sin(this.walkPhase * 2) * 0.08;
        const pulse2 = Math.sin(this.walkPhase * 3.5 + 0.7) * 0.04;
        this.fairyGlow.material.opacity = 0.1 + pulse1 + pulse2;
        this.fairyGlow.scale.setScalar(0.9 + Math.sin(this.walkPhase * 1.5) * 0.15 + pulse2 * 0.5);
      }
      // Tail sway (FA+: wave with decreasing amplitude toward tip)
      if (this.tailSegments) {
        for (let i = 0; i < this.tailSegments.length; i++) {
          const amp = 0.2 * (1 - i / this.tailSegments.length * 0.5);
          this.tailSegments[i].rotation.x = Math.sin(this.walkPhase * 0.5 + i * 0.4) * amp;
          this.tailSegments[i].rotation.z = Math.cos(this.walkPhase * 0.3 + i * 0.3) * amp * 0.3;
        }
      }
    } else if (this.state === 'walking' || this.state === 'fleeing') {
      // Smooth turn
      let dy = this.targetYaw - this.yaw;
      while (dy > Math.PI) dy -= Math.PI * 2;
      while (dy < -Math.PI) dy += Math.PI * 2;
      const turnSpeed = this.state === 'fleeing' ? 5 : 3;
      this.yaw += dy * Math.min(1, dt * turnSpeed);

      const moveSpeed = this.state === 'fleeing' ? WALK_SPEED * 2.2 : WALK_SPEED;
      this.velocity.x = -Math.sin(this.yaw) * moveSpeed;
      this.velocity.z = -Math.cos(this.yaw) * moveSpeed;

      if (world) {
        const footY = Math.floor(this.position.y) - 1;
        const lookX = Math.floor(this.position.x - Math.sin(this.yaw) * 0.8);
        const lookZ = Math.floor(this.position.z - Math.cos(this.yaw) * 0.8);
        if (world.getBlock(lookX, footY, lookZ) === BLOCK.LAVA ||
            world.getBlock(lookX, footY + 1, lookZ) === BLOCK.LAVA) {
          this.targetYaw = this.yaw + (Math.random() - 0.5) * Math.PI * 2;
          this.velocity.x = -Math.sin(this.targetYaw) * moveSpeed;
          this.velocity.z = -Math.cos(this.targetYaw) * moveSpeed;
        }
      }

      // Stay near spawn
      const dx = this.position.x - this.spawnPos.x;
      const dz = this.position.z - this.spawnPos.z;
      if (dx * dx + dz * dz > MAX_WANDER_DIST * MAX_WANDER_DIST) {
        this.targetYaw = Math.atan2(-dx, -dz);
      }
    }

    if (!isFlying) {
      // Apply velocity with horizontal + ground collision
      this._moveHoriz(world, this.velocity.x * dt, this.velocity.z * dt);

      // Ground snap. This top-down scan was the single most expensive CPU
      // loop for mobs (up to 256 world.getBlock per mob per frame). Cache the
      // ground height per block column and only rescan when the mob moves onto
      // a new column, when a block edit happens, or after 2.5s (self-heal).
      const bx = Math.floor(this.position.x);
      const bz = Math.floor(this.position.z);
      let groundY;
      this._groundAge = (this._groundAge || 0) + dt;
      if (this._groundColX !== bx || this._groundColZ !== bz || this._groundColStale || this._groundAge > 2.5 || this._groundY == null) {
        this._groundColX = bx;
        this._groundColZ = bz;
        this._groundColStale = false;
        this._groundAge = 0;
        groundY = -1;
        // Scan DOWNWARD from just below the mob's feet, not from the top of
        // the world. A top-down scan found ceilings/roofs/leaves as "ground",
        // snapping the mob up to them (mobs could teleport up arbitrarily high
        // whenever a block sat above or beside them).
        const startY = Math.min(Math.floor(this.position.y) - 1, WORLD_HEIGHT - 1);
        for (let y = startY; y >= 0; y--) {
          const block = world.getBlock(bx, y, bz);
          if (block !== BLOCK.AIR && block !== BLOCK.WATER && BLOCKS[block]?.solid) {
            groundY = y + 1;
            break;
          }
        }
        this._groundY = groundY < 0 ? SEA_LEVEL : groundY;
      }
      groundY = this._groundY;

      // Simple gravity
      if (this.position.y > groundY) {
        this.position.y -= 15 * dt;
        if (this.position.y < groundY) this.position.y = groundY;
      } else if (this.position.y < groundY) {
        this.position.y = groundY;
      }
    }

    // Update mesh transform
    if (this._playerModel && this._playerModelReady) {
      // PlayerModel-driven mobs (Traveler): use player animation system
      const pm = this._playerModel;
      const vel = { x: this.velocity.x, y: this.velocity.y, z: this.velocity.z };
      const speed = Math.sqrt(vel.x * vel.x + vel.z * vel.z);
      const def = MOB_TYPES[this.type];
      const inWater = this.position.y < SEA_LEVEL + 0.5;
      const isSwimming = inWater && speed > 0.1;
      const isFlying = !!def?.isFlying;
      const isClimbing = this.onLadder || false;
      pm.update(dt, this.position, this.yaw, vel, true, speed > 3, false, false, isSwimming, false, false, isFlying, isClimbing, 0);

      // Glitched Wanderer: pulse the corruption aura + lunge on attack.
      if (this._wandererGlow) {
        const p = Math.sin(performance.now() * 0.004);
        this._wandererGlow.material.opacity = 0.4 + p * 0.12;
        this._wandererGlow.scale.set(2.4 + p * 0.3, 2.4 + p * 0.3, 1);
      }
      if (this.attackAnim > 0) {
        this.attackAnim = Math.max(0, this.attackAnim - dt * 5);
        const atk = this.attackAnim;
        pm.group.position.set(
          this.position.x + Math.sin(this.yaw) * atk * 0.2,
          this.position.y,
          this.position.z + Math.cos(this.yaw) * atk * 0.2
        );
        pm.group.rotation.x = atk * 0.25;
      } else {
        pm.group.rotation.x = 0;
      }
    } else {
      this.mesh.position.set(this.position.x, this.position.y, this.position.z);
      this.mesh.rotation.y = this.yaw;
    }

    // ── FA+ Style Mob Animations (non-PlayerModel only) ──
    if (!this._playerModel) {
    const isMoving = (this.state === 'walking' || this.state === 'fleeing') && (Math.abs(this.velocity.x) > 0.01 || Math.abs(this.velocity.z) > 0.01);
    const moveSpeed = isMoving ? Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.z * this.velocity.z) : 0;
    const isFleeing = this.state === 'fleeing';
    const now = performance.now();
    const t = now * 0.001;
    const idle = !isMoving && !this.dead;
    const bipedal = !!MOB_TYPES[this.type]?.bipedalLegs;
    const quadruped = !bipedal && !MOB_TYPES[this.type]?.has8Legs;

    // Accumulate walk phase
    if (isMoving) {
      const rate = isFleeing ? 16 : (8 + moveSpeed * 4);
      this.walkPhase += dt * rate;
    } else {
      this.walkPhase *= 0.88;
    }

    // Smooth damp state
    if (!this._animState) this._animState = { breathePhase: Math.random() * Math.PI * 2, bodyRz: 0 };
    const as = this._animState;
    as.breathePhase += dt * 1.8;

    // ── Breathing cycle ──
    const breatheAmp = this.type === 'chicken' ? 0.012 : this.type === 'slime' ? 0.0 : 0.008;
    const breathe = Math.sin(as.breathePhase) * breatheAmp;
    const breatheFast = Math.sin(as.breathePhase * 2.0 + 0.3) * breatheAmp * 0.35;

    const bodyChild = this._cachedBody;
    const headChild = this._cachedHead;

    // ── Body transforms (additive) ──
    if (bodyChild) {
      const walkBob = isMoving ? Math.sin(this.walkPhase * 2) * 0.045 : 0;
      bodyChild.position.y = this._origBodyY + walkBob + breathe;
      bodyChild.position.z = 0; // reset attack lunge

      // Smooth body roll
      const walkRoll = isMoving ? Math.sin(this.walkPhase) * 0.04 : 0;
      as.bodyRz += (walkRoll - as.bodyRz) * Math.min(1, dt * 8);
      bodyChild.rotation.z = as.bodyRz;
      bodyChild.rotation.x = 0; // reset attack/hurt, re-applied below

      // Breathing scale
      if (this.type !== 'slime') {
        bodyChild.scale.y = 1 + breathe;
        bodyChild.scale.x = 1 - breathe * 0.4;
        bodyChild.scale.z = 1 - breathe * 0.3;
      }
    }

    // ── Head: compute animation offset (NOT final rotation) ──
    let headAnimRx = 0, headAnimRy = 0;
    if (headChild) {
      const headBob = isMoving ? Math.sin(this.walkPhase * 2 + 0.6) * 0.05 : 0;
      headChild.position.y = this._origHeadY + headBob + breatheFast;

      // Walk head dip
      if (isMoving) {
        headAnimRx = -0.12 - Math.sin(this.walkPhase * 2) * 0.06;
      }
      // Idle look-around
      if (idle) {
        headAnimRx += Math.sin(t * 0.5 + this.walkPhase) * 0.08;
        headAnimRy += Math.sin(t * 0.35 + this.walkPhase * 0.7) * 0.12;
      }
      // Pig snout wiggle
      if (this.type === 'pig') {
        const snout = this._cachedSnout;
        if (snout) {
          snout.position.x = isMoving ? Math.sin(this.walkPhase * 4) * 0.06 : Math.sin(t * 2.5) * 0.02;
          snout.rotation.x = isMoving ? Math.sin(this.walkPhase * 3) * 0.04 : 0;
        }
      }
    }

    // ── Limb swing ──
    const swingAmp = isFleeing ? 0.7 : (isMoving ? 0.5 : 0);
    const swing = Math.sin(this.walkPhase) * swingAmp;
    const swing2 = Math.cos(this.walkPhase) * swingAmp * 0.15;
    const idleSwing = idle ? Math.sin(t * 1.5) * 0.03 : 0;

    for (let i = 0; i < this.legs.length; i++) {
      const leg = this.legs[i];
      const isVillagerArm = this.type === 'villager' && i >= this.legs.length - 2;
      const isArmLikeMob = this.type === 'blower' || this.type === 'portalman' || this.type === 'zombie' || this.type === 'skeleton';
      const isArmPivot = isArmLikeMob && i >= this.legs.length - 2;

      if (isVillagerArm) {
        const foldTarget = idle ? (i === 0 ? 0.35 : -0.35) : (i === 0 ? 0.05 : -0.05);
        leg.rotation.x += (foldTarget - leg.rotation.x) * dt * 3;
        leg.rotation.z = idle ? (i === 0 ? 0.15 : -0.15) : 0;
      } else if (isArmPivot) {
        const armSwing = (i % 2 === 0) ? -swing : swing;
        leg.rotation.x = armSwing + idleSwing;
        leg.rotation.z = isMoving ? (i % 2 === 0 ? -0.08 : 0.08) : 0;
      } else if (bipedal) {
        leg.rotation.x = ((i % 2 === 0) ? swing : -swing) + ((i % 2 === 0) ? swing2 : -swing2) + idleSwing;
      } else if (MOB_TYPES[this.type]?.has8Legs) {
        const wave = Math.sin(this.walkPhase + i * 0.8) * swingAmp * 0.6;
        leg.rotation.x = wave + idleSwing;
      } else {
        const diagonal = (i === 0 || i === 3);
        leg.rotation.x = (diagonal ? swing : -swing) + (diagonal ? swing2 : -swing2) + idleSwing;
      }
    }

    // ── Attack animation ──
    if (this.attackAnim > 0) {
      this.attackAnim = Math.max(0, this.attackAnim - dt * 5);
      const atk = this.attackAnim;

      if (bipedal && this.legs.length >= 2) {
        const arm = this.legs[this.legs.length - 1];
        arm.rotation.x = -atk * 2.8 + Math.sin(atk * Math.PI) * 0.3;
        if (this.legs.length >= 4) {
          this.legs[this.legs.length - 2].rotation.x = atk * 1.2;
        }
      }

      if (quadruped) {
        if (bodyChild) {
          bodyChild.position.z = -atk * 0.18;
          bodyChild.rotation.x = -atk * 0.15;
        }
        if (headChild) headAnimRx += atk * 0.3;
      }
    }

    // ── Hurt recoil ──
    if (this.hurtTimer > 0 && this.attackAnim <= 0) {
      const h = this.hurtTimer;
      if (bipedal) {
        if (bodyChild) bodyChild.rotation.x = h * 0.3;
        for (let i = 0; i < this.legs.length; i++) {
          if (i >= this.legs.length - 2) {
            this.legs[i].rotation.x = h * (i % 2 === 0 ? -0.8 : 0.8);
            this.legs[i].rotation.z = h * (i % 2 === 0 ? 0.4 : -0.4);
          }
        }
      } else {
        if (bodyChild) bodyChild.position.y = this._origBodyY - h * 0.06;
      }
      if (headChild) headAnimRx -= h * 0.4;
    }

    // ── Species-specific extras ──
    if (this.type === 'chicken' && isMoving && headChild) {
      headAnimRx += Math.abs(Math.sin(this.walkPhase * 3)) * 0.25;
    }
    if (this.type === 'sheep' && bodyChild && isMoving) {
      bodyChild.scale.y = 1 + Math.abs(Math.sin(this.walkPhase * 3)) * 0.05;
      bodyChild.scale.x = 1 - Math.abs(Math.sin(this.walkPhase * 3)) * 0.025;
    }
    if ((this.type === 'cow' || this.type === 'ox') && idle && headChild) {
      headAnimRx += Math.sin(t * 0.6) * 0.08;
    }
    if ((this.type === 'zombie' || this.type === 'skeleton') && idle && bodyChild) {
      bodyChild.rotation.x = Math.sin(t * 1.1) * 0.04;
    }
    if (this.type === 'spider' && idle && headChild) {
      headAnimRy += Math.sin(t * 1.2) * 0.15;
      headAnimRx += Math.sin(t * 0.8) * 0.06;
    }

    // ── Traveler cape sway ──
    if (this.cape && !this.dead) {
      const windSway = Math.sin(t * 1.3) * 0.1;
      const moveSway = isMoving ? Math.sin(this.walkPhase * 2) * 0.15 : 0;
      this.cape.rotation.x = windSway + moveSway;
      this.cape.position.y = (def.legH + def.bodyH * 0.45) + Math.sin(t * 1.8) * 0.02;
    }

    // ── Apply head rotation: combine look-at-player + animation offsets ──
    if (headChild) {
      headChild.rotation.x = (this._lookAtX || 0) + headAnimRx;
      headChild.rotation.y = headAnimRy;
    }
    } // end !this._playerModel

    // ── CHICKEN: lay eggs occasionally ──
    if (this.type === 'chicken' && !this.dead) {
      const def = MOB_TYPES.chicken;
      if (Math.random() < (def.layEggChance || 0) * dt * 60) {
        this._eggDrop = true; // signal to MobManager to spawn egg item
      }
    }

    // ── SLIME: bounce when walking ──
    if (this.type === 'slime' && !this.dead) {
      const slimeMoving = (this.state === 'walking' || this.state === 'fleeing') && (Math.abs(this.velocity.x) > 0.01 || Math.abs(this.velocity.z) > 0.01);
      const body = this._cachedBody;
      if (body) {
        if (slimeMoving) {
          const bounce = Math.abs(Math.sin(this.walkPhase * 2)) * 0.3;
          body.position.y = this._origBodyY + bounce;
          // Squash and stretch
          body.scale.y = 1 + bounce * 0.3;
          body.scale.x = 1 - bounce * 0.15;
          body.scale.z = 1 - bounce * 0.15;
        } else {
          // Idle squish
          const squish = Math.sin(performance.now() * 0.003) * 0.05;
          body.scale.y = 1 + squish;
          body.scale.x = 1 - squish * 0.5;
          body.scale.z = 1 - squish * 0.5;
        }
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

  distanceSqTo(px, pz) {
    const dx = this.position.x - px;
    const dz = this.position.z - pz;
    return dx * dx + dz * dz;
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

// ── Thrown TNT projectile (launched by Blower mobs) ──────────────────
// A small lit-TNT cube that arcs through the air with gravity and blows up
// on first solid contact or when its fuse runs out.
class ThrownTnt {
  constructor(scene, x, y, z, vx, vy, vz) {
    this.scene = scene;
    this.x = x; this.y = y; this.z = z;
    this.vx = vx; this.vy = vy; this.vz = vz;
    this.fuse = 2.2;           // seconds of flight before self-destruct
    this.age = 0;
    this.done = false;
    this.exploded = false;

    // Small TNT cube built from a hand-drawn canvas texture
    const s = 16;
    const c = document.createElement('canvas');
    c.width = s; c.height = s;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#c8362a';
    ctx.fillRect(0, 0, s, s);
    ctx.fillStyle = '#8a2018';
    ctx.fillRect(0, 11, s, 3);
    ctx.fillRect(0, 4, s, 1);
    ctx.fillStyle = '#f0d0c0';
    ctx.fillRect(4, 2, 8, 1);
    ctx.fillStyle = '#3a3a3a';
    ctx.fillRect(11, 6, 2, 2);
    const tex = new THREE.CanvasTexture(c);
    tex.magFilter = THREE.NearestFilter;
    tex.minFilter = THREE.NearestFilter;

    const geo = new THREE.BoxGeometry(0.4, 0.4, 0.4);
    const mat = new THREE.MeshLambertMaterial({ map: tex });
    this.mesh = new THREE.Mesh(geo, mat);
    this.mesh.position.set(x, y, z);
    this.mesh.castShadow = true;
    this.scene.add(this.mesh);

    // Fuse spark (flickering glow)
    const spark = new THREE.Mesh(
      new THREE.BoxGeometry(0.1, 0.1, 0.1),
      new THREE.MeshBasicMaterial({ color: 0xffd040, transparent: true, opacity: 1 })
    );
    spark.position.set(0, 0.25, 0);
    this.mesh.add(spark);
    this._spark = spark;
  }

  update(dt, world) {
    if (this.done) return;
    this.age += dt;

    // Gravity + ballistic motion
    this.vy -= 14 * dt;
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    this.z += this.vz * dt;
    this.mesh.position.set(this.x, this.y, this.z);

    // Spin
    this.mesh.rotation.x += dt * 10;
    this.mesh.rotation.z += dt * 7;

    // Fuse spark flicker
    this._spark.material.opacity = Math.random() < 0.7 ? 1 : 0.2;
    this._spark.scale.setScalar(1 + Math.sin(this.age * 40) * 0.4);

    // Collide with solid blocks
    const bx = Math.floor(this.x), by = Math.floor(this.y), bz = Math.floor(this.z);
    const blk = world.getBlock(bx, by, bz);
    if (blk !== BLOCK.AIR && blk !== BLOCK.WATER && BLOCKS[blk]?.solid) {
      this.exploded = true;
      this.done = true;
      return;
    }

    if (this.age >= this.fuse) {
      this.exploded = true;
      this.done = true;
    }
  }

  dispose() {
    this.scene.remove(this.mesh);
    this.mesh.geometry.dispose();
    this.mesh.material.map?.dispose();
    this.mesh.material.dispose();
    this._spark.geometry.dispose();
    this._spark.material.dispose();
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
    this._thrownTnts = []; // Blower-launched TNT projectiles
    this._spawnedChunks = new Set();
    this._nightSpawnTimer = 0;
    this._nextEntityId = 1;
    this._remoteMobs = new Map(); // entityId -> remote mob mesh
    this._mobPosSendTimer = 0;
    this.networkSend = null; // set by main.js: { sendMobSpawn, sendMobPosition, sendMobDeath }
    this._lastPlayerPos = null; // cached player pos for spawn distance checks
  }

  _allocEntityId() {
    return this._nextEntityId++;
  }

  // Matrix Pixie special ability: teleport a random nearby solid block to a
  // random nearby air cell (a glitchy block-swap). No-op in void areas.
  _pixieSwap(mob) {
    if (!this.world) return;
    const bx = Math.floor(mob.position.x) + (Math.random() * 7 - 3 | 0);
    const by = Math.floor(mob.position.y) + (Math.random() * 5 - 2 | 0);
    const bz = Math.floor(mob.position.z) + (Math.random() * 7 - 3 | 0);
    if (by < 1 || by >= WORLD_HEIGHT - 1) return;
    const src = this.world.getBlock(bx, by, bz);
    if (src === BLOCK.AIR || src === BLOCK.BEDROCK || src === BLOCK.WATER) return;
    for (let i = 0; i < 12; i++) {
      const tx = bx + (Math.random() * 9 - 4 | 0);
      const ty = by + (Math.random() * 6 - 3 | 0);
      const tz = bz + (Math.random() * 9 - 4 | 0);
      if (ty < 1 || ty >= WORLD_HEIGHT) continue;
      if (this.world.getBlock(tx, ty, tz) === BLOCK.AIR) {
        this.world.setBlock(tx, ty, tz, src);
        this.world.setBlock(bx, by, bz, BLOCK.AIR);
        if (this._refreshFn) this._refreshFn(bx, by, bz);
        if (this._refreshFn) this._refreshFn(tx, ty, tz);
        return;
      }
    }
  }

  // Provoke dimension mobs near a block-break: any wanderer staring at the
  // broken cell becomes hostile (per the README "attacks only if you break
  // the blocks it stares at").
  provokeNearby(px, py, pz, radius = 12) {
    const rSq = radius * radius;
    for (const mob of this.mobs) {
      const def = MOB_TYPES[mob.type];
      if (!def?.provokeOnBreak) continue;
      const dx = mob.position.x - (px + 0.5);
      const dz = mob.position.z - (pz + 0.5);
      if (dx * dx + dz * dz <= rSq) mob.aggro = true;
    }
  }

  // Remote mob management (received from network)
  remoteSpawn(entityId, type, x, y, z) {
    if (this._remoteMobs.has(entityId)) return;
    const def = MOB_TYPES[type];
    if (!def) return;
    const mob = new Mob(type, x, y, z, this.scene);
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
    const types = ['zombie', 'zombie', 'skeleton', 'skeleton', 'spider', 'spider', 'blower', 'portalman'];
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
      // Verify the space above ground is air (prevent spawning inside blocks)
      if (this.world.getBlock(wx, groundY + 1, wz) !== BLOCK.AIR) continue;
      const type = types[Math.floor(rng() * types.length)];
      if (!MOB_TYPES[type]) continue;
      const mob = new Mob(type, wx + 0.5, groundY + 1, wz + 0.5, this.scene);
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
    for (const t of this._thrownTnts) t.dispose();
    this._thrownTnts.length = 0;
    this._spawnedChunks.clear();
  }

  // Launch a lit-TNT projectile from a Blower mob toward the player.
  // Computes an arc that lands near the player's current position.
  _launchTnt(mob, playerPos) {
    const dx = playerPos.x - mob.position.x;
    const dy = (playerPos.y + 1.0) - (mob.position.y + 1.2);
    const dz = playerPos.z - mob.position.z;
    const dist = Math.sqrt(dx * dx + dz * dz) || 1;

    // Pick a flight time so faster shots are flatter, long shots arc more.
    const t = 0.45 + dist * 0.06;
    const vx = dx / t;
    const vz = dz / t;
    const vy = dy / t + 0.5 * 14 * t; // ballistic arc under gravity (g=14)

    const proj = new ThrownTnt(
      this.scene,
      mob.position.x, mob.position.y + 1.2, mob.position.z,
      vx, vy, vz
    );
    proj._source = mob;
    this._thrownTnts.push(proj);
  }

  // Spawn a specific mob type at a world position (for dev commands).
  spawnAt(type, x, y, z) {
    if (!MOB_TYPES[type]) return null;
    const mob = new Mob(type, x, y, z, this.scene);
    mob.entityId = this._allocEntityId();
    this.mobs.push(mob);
    this.scene.add(mob.mesh);
    if (this.networkSend?.sendMobSpawn) {
      this.networkSend.sendMobSpawn(mob.entityId, mob.type, mob.position.x, mob.position.y, mob.position.z);
    }
    return mob;
  }

  // Spawn the Shattered Echo mobs on a chunk's floating islands. Islands are
  // sparse, so we scan columns for any atop solid island surface.
  _spawnDimensionForChunk(cx, cz) {
    const baseX = cx * CHUNK_SIZE;
    const baseZ = cz * CHUNK_SIZE;
    const candidates = [];
    for (let x = 2; x < CHUNK_SIZE - 2; x += 3) {
      for (let z = 2; z < CHUNK_SIZE - 2; z += 3) {
        const wx = baseX + x, wz = baseZ + z;
        // Topmost solid block in this column = island top or void
        let top = -1;
        for (let y = WORLD_HEIGHT - 1; y > 0; y--) {
          const b = this.world.getBlock(wx, y, wz);
          if (BLOCKS[b]?.solid && b !== BLOCK.WATER) { top = y; break; }
        }
        if (top < 30 || top >= WORLD_HEIGHT - 2) continue; // only floating island tops
        // Ensure an open air cell above to actually stand on
        if (this.world.getBlock(wx, top + 1, wz) !== BLOCK.AIR) continue;
        candidates.push({ x: wx + 0.5, z: wz + 0.5, y: top + 1 });
      }
    }
    if (!candidates.length) return;

    const rng = mulberry32(((cx * 73856093) ^ (cz * 19349663)) >>> 0);
    const maxSpawn = Math.min(3, candidates.length);
    for (let i = 0; i < maxSpawn; i++) {
      const pos = candidates[Math.floor(rng() * candidates.length)];
      const type = rng() < 0.55 ? 'wanderer' : 'pixie';
      const mob = new Mob(type, pos.x, pos.y, pos.z, this.scene);
      mob.entityId = this._allocEntityId();
      this.mobs.push(mob);
      this.scene.add(mob.mesh);
      if (this.networkSend?.sendMobSpawn) {
        this.networkSend.sendMobSpawn(mob.entityId, mob.type, mob.position.x, mob.position.y, mob.position.z);
      }
    }
  }

  // Called when a chunk is first generated/loaded
  spawnForChunk(cx, cz, isNight = false) {
    const key = cx + ',' + cz;
    if (this._spawnedChunks.has(key)) return;
    this._spawnedChunks.add(key);

    // Shattered Echo dimension: spawn its two mobs on island tops instead of
    // the overworld grass/dirt surface scan.
    if (this.world.dimension) {
      this._spawnDimensionForChunk(cx, cz);
      return;
    }

    const baseX = cx * CHUNK_SIZE;
    const baseZ = cz * CHUNK_SIZE;
    const noise = this.world.noise;

    // Minimum distance from player (prevent spawning right next to them)
    const MIN_PLAYER_DIST = 16;
    const pp = this._lastPlayerPos;

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
    // Traveler spawns in any biome (1 in 4 chance per spawn slot)
    if (rng() < 0.25) spawnTypes.push('traveler');
    // Hostile mobs (zombie, skeleton, spider) spawn at night everywhere.
    // Blower and PortalMan are rarer night spawns — added to the pool with
    // reduced weight so they appear occasionally but stay uncommon.
    if (isNight) {
      spawnTypes.push('zombie', 'skeleton', 'spider', 'zombie', 'skeleton', 'spider', 'blower', 'portalman');
    }
    const placed = [];

    for (let i = 0; i < count; i++) {
      let bestPos = null;
      let bestIdx = -1;
      let bestDist = -1;

      for (let j = 0; j < spawnPositions.length; j++) {
        const pos = spawnPositions[j];
        let minDistSq = Infinity;
        for (const p of placed) {
          const dx = pos.x - p.x, dz = pos.z - p.z;
          const dSq = dx * dx + dz * dz;
          if (dSq < minDistSq) minDistSq = dSq;
        }
        if (minDistSq > bestDist) {
          bestDist = minDistSq;
          bestPos = pos;
          bestIdx = j;
        }
      }

      if (bestIdx < 0) break;
      if (bestDist < MIN_SPAWN_DISTANCE && placed.length > 0) break;
      // Don't spawn too close to the player
      if (pp) {
        const pdx = bestPos.x - pp.x, pdz = bestPos.z - pp.z;
        if (pdx * pdx + pdz * pdz < MIN_PLAYER_DIST * MIN_PLAYER_DIST) break;
      }

      const type = spawnTypes[Math.floor(rng() * spawnTypes.length)];
      const mob = new Mob(type, bestPos.x, bestPos.y, bestPos.z, this.scene);
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
    // Cache player position for spawn distance checks
    if (playerPos) this._lastPlayerPos = playerPos;
    // dayTime: 0=midnight, 0.25=sunrise, 0.5=noon, 0.75=sunset
    // Night is when dayTime > DAY_FRAC (10/16 ≈ 0.625)
    const isNight = dayTime != null && dayTime > 0.625;

    // Keep a Traveler within range of the player at all times (checks ~every 10s)
    if (playerPos) {
      if (!this._nextTravelerCheck) this._nextTravelerCheck = 0;
      this._nextTravelerCheck -= dt;
      if (this._nextTravelerCheck <= 0) {
        this._nextTravelerCheck = 10;
        let hasNearby = false;
        for (const m of this.mobs) {
          if (m.type === 'traveler' && !m.dead) {
            const dx = m.position.x - playerPos.x;
            const dz = m.position.z - playerPos.z;
            if (dx * dx + dz * dz < 60 * 60) { hasNearby = true; break; }
          }
        }
        if (!hasNearby) {
          const ang = Math.random() * Math.PI * 2;
          const dist = 6 + Math.random() * 8;
          const x = playerPos.x - Math.sin(ang) * dist;
          const z = playerPos.z - Math.cos(ang) * dist;
          let y = playerPos.y + 1.4;
          if (this.world) {
            let gy = this.world.heightAt(x, z);
            if (gy < 1) gy = SEA_LEVEL;
            y = gy + 1;
          }
          this.spawnAt('traveler', x, y, z);
        }
      }
    }

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

    // Block edits invalidate cached ground-snap columns (rare, but keeps mobs
    // from floating/falling when terrain underneath changes).
    if (this.world && this.world.editSeq !== this._groundEditSeq) {
      this._groundEditSeq = this.world.editSeq;
      for (let j = 0; j < this.mobs.length; j++) this.mobs[j]._groundColStale = true;
    }

    // Update all mobs (optimized with distance throttling & frame staggering to eliminate CPU lag)
    if (!this._tickCounter) this._tickCounter = 0;
    this._tickCounter++;

    for (let i = this.mobs.length - 1; i >= 0; i--) {
      const mob = this.mobs[i];

      if (mob.dead) {
        mob.update(dt, this.world, this.world.noise, playerPos);
        continue;
      }

      if (playerPos) {
        const dx = playerPos.x - mob.position.x;
        const dz = playerPos.z - mob.position.z;
        const distSq = dx * dx + dz * dz;
        // Skip AI update for mobs further than 64 blocks away, or stagger far mobs (32-64 blocks) every 3 frames
        if (distSq > 64 * 64) continue;
        if (distSq > 32 * 32 && (this._tickCounter + i) % 3 !== 0) continue;
      }

      const def = MOB_TYPES[mob.type];

      // ── SHATTERED ECHO hostile AI (wanderer, pixie) — always active ──
      if (def.dimensionOnly && def.hostile && playerPos) {
        const dx = playerPos.x - mob.position.x;
        const dz = playerPos.z - mob.position.z;
        const echoDistSq = dx * dx + dz * dz;

        // Wanderer: only hostile once provoked (a block it stares at is broken).
        const isPixie = !!def.swapsBlocks;
        const canAct = mob.aggro;
        const aggroDistSq = (isPixie ? 14 : 10) * (isPixie ? 14 : 10);
        if (canAct && echoDistSq < aggroDistSq) {
          if (def.isFlying) {
            mob.state = 'walking';
            mob.targetYaw = Math.atan2(-dx, -dz);
            mob.stateTimer = 0.5;
            // stay at flyHeight above player; bob gently
            const targetY = playerPos.y + def.flyHeight;
            mob.velocity.y += (targetY - mob.position.y) * dt * 2;
            mob.velocity.x = -Math.sin(mob.targetYaw) * def.flySpeed;
            mob.velocity.z = -Math.cos(mob.targetYaw) * def.flySpeed;
          } else {
            mob.state = 'walking';
            mob.targetYaw = Math.atan2(-dx, -dz);
            mob.stateTimer = 0.5;
          }
          if (echoDistSq < 3.24) {
            mob.attackCooldown = (mob.attackCooldown || 0) - dt;
            if (mob.attackCooldown <= 0) {
              mob.attackCooldown = 1.0;
              mob.attackAnim = 1;
              attackEvents.push({ type: 'attack', damage: def.attackDamage || 4, fromPos: { x: mob.position.x, y: mob.position.y, z: mob.position.z } });
            }
          }
          // Pixie: occasionally "swap" a random nearby block with a higher one
          if (isPixie && Math.random() < dt * 0.5) {
            this._pixieSwap(mob);
          }
        } else {
          mob.velocity.x = 0;
          mob.velocity.z = 0;
        }
      }

      // ── HOSTILE AI (zombie, skeleton, spider, blower, portalman) ──
      if (def.hostileAtNight && playerPos) {
        const dx = playerPos.x - mob.position.x;
        const dz = playerPos.z - mob.position.z;
        const distSq = dx * dx + dz * dz;
        const dist = Math.sqrt(distSq); // only used for actual movement normalization

        // Blower: ranged attacker — keeps its distance and lobs TNT at the player.
        if (def.isBlower) {
          mob.throwCooldown = (mob.throwCooldown || 0) - dt;
          if (isNight || mob.aggro) {
            mob.state = 'walking';
            mob.targetYaw = Math.atan2(-dx, -dz);
            mob.stateTimer = 0.5;

            const throwRangeSq = (def.throwRange || 18) * (def.throwRange || 18);
            if (distSq > throwRangeSq) {
              // Chase to get within range
            } else if (distSq < 36) {
              // Too close — back away
              mob.targetYaw = Math.atan2(dx, dz);
              mob.state = 'fleeing';
              mob.stateTimer = 0.5;
            } else if (mob.throwCooldown <= 0 && distSq >= 36) {
              // In range — stop and launch a TNT
              mob.throwCooldown = def.throwCooldown || 3.0;
              mob.attackAnim = 1;
              this._launchTnt(mob, playerPos);
            }
          } else if (!isNight && !mob.aggro && mob.state === 'walking' && distSq < 400 && distSq < 16) {
            mob.targetYaw = Math.atan2(dx, dz);
            mob.stateTimer = 2;
          }
        } else if ((isNight || mob.aggro) && distSq < 256) {
          mob.state = 'walking';
          mob.targetYaw = Math.atan2(-dx, -dz);
          mob.stateTimer = 0.5;

          // Attack if close enough
          if (distSq < 3.24) {
            mob.attackCooldown = (mob.attackCooldown || 0) - dt;
            if (mob.attackCooldown <= 0) {
              mob.attackCooldown = 1.0;
              mob.attackAnim = 1; // trigger arm swing
              attackEvents.push({ type: 'attack', damage: def.attackDamage || 4, fromPos: { x: mob.position.x, y: mob.position.y, z: mob.position.z } });
            }
          }
        } else if (!isNight && !mob.aggro && mob.state === 'walking' && distSq < 400) {
          if (distSq < 16) {
            mob.targetYaw = Math.atan2(dx, dz);
            mob.stateTimer = 2;
          }
        }
      }

      mob.update(dt, this.world, this.world.noise, playerPos);

      // Idle sounds (passive + hostile) — only audible within ~11-15 blocks
      if (this.audio && mob.state === 'idle' && playerPos) {
        const dx = mob.position.x - playerPos.x;
        const dz = mob.position.z - playerPos.z;
        const dist = Math.sqrt(dx * dx + dz * dz);
        // Each mob rolls its own hearing radius in [11,15] so the soundscape
        // fades in gradually instead of popping at a hard cutoff.
        const hearRange = mob._hearRange || (mob._hearRange = 11 + Math.random() * 4);
        if (dist <= hearRange) {
          if (Math.random() < (MOB_TYPES[mob.type].soundChance || 0.003) * dt * 60) {
            const now = performance.now();
            if (!this._lastSoundTime || now - this._lastSoundTime > 3000) {
              this._lastSoundTime = now;
              this._playMobSound(mob.type);
            }
          }
        }
      }
    }

    // Remote mob shadows handled by shadow map
    for (const [, mob] of this._remoteMobs) {
    }

    // Cull mobs too far from player
    if (playerPos) {
      for (let i = this.mobs.length - 1; i >= 0; i--) {
        const mob = this.mobs[i];
        if (mob.type === 'dragon') continue; // don't cull boss
        if (mob.distanceSqTo(playerPos.x, playerPos.z) > CULL_DIST * CULL_DIST) {
          this.scene.remove(mob.mesh);
          mob.dispose();
          this.mobs[i] = this.mobs[this.mobs.length - 1];
          this.mobs.length--;
        }
      }
    }

    // Remove dead mobs (after death animation completes)
    for (let i = this.mobs.length - 1; i >= 0; i--) {
      const mob = this.mobs[i];
      if (!mob.dead) continue;

      // Death sound — play the moment the mob dies, not when it's removed.
      if (this.audio && !mob._deathSoundPlayed) {
        mob._deathSoundPlayed = true;
        this.audio.mobDeath(mob.type);
      }

      // The dragon boss has its own death sequence in main.js (it drops the
      // Dragon Blade + scales there). We only play its death sound here.
      if (mob.type === 'dragon') continue;

      if (mob.deathTimer <= 0.9) continue;

      // Slime split: spawn 2 smaller slimes on death
      if (mob.type === 'slime' && mob._slimeSize !== 'small') {
          for (let j = 0; j < 2; j++) {
            const ox = (Math.random() - 0.5) * 1.5;
            const oz = (Math.random() - 0.5) * 1.5;
            const baby = new Mob('slime', mob.position.x + ox, mob.position.y, mob.position.z + oz, this.scene);
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
        // Loot — drop the mob's items as visible world entities that the
        // player auto-collects. Applies to every death cause (melee, fall,
        // TNT, etc.) since this is the single place all dead mobs are cleaned
        // up. `onMobDeath` is wired up by main.js to spawn droppedItemManager
        // items at the corpse.
        if (!mob._lootDropped) {
          mob._lootDropped = true;
          if (this.onMobDeath) this.onMobDeath(mob);
        }
        this.scene.remove(mob.mesh);
        mob.dispose();
        this.mobs[i] = this.mobs[this.mobs.length - 1];
        this.mobs.length--;
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

    // Update Blower-launched TNT projectiles; explode on impact/fuse.
    for (let i = this._thrownTnts.length - 1; i >= 0; i--) {
      const proj = this._thrownTnts[i];
      proj.update(dt, this.world);
      if (!proj.done) continue;

      this._thrownTnts[i] = this._thrownTnts[this._thrownTnts.length - 1];
      this._thrownTnts.length--;
      if (proj.exploded) {
        // Blow up blocks
        if (this.explosionManager) {
          this.explosionManager.explode(proj.x, proj.y, proj.z, 2);
        }
        // Damage the player if within blast radius
        if (playerPos) {
          const dmg = ExplosionManager.calcDamage(proj.x, proj.y, proj.z, playerPos, 2);
          if (dmg > 0) {
            attackEvents.push({ type: 'attack', damage: dmg, fromPos: { x: proj.x, y: proj.y, z: proj.z } });
          }
        }
      }
      proj.dispose();
    }

    // Return the strongest attack this tick (backward-compatible with single-event callers)
    if (attackEvents.length === 0) return null;
    return { attack: attackEvents.reduce((a, b) => (b.damage > a.damage ? b : a)) };
  }

  _playMobSound(type) {
    if (this.audio) this.audio.mobIdle(type);
  }

  playHurtSound(type) {
    if (this.audio) this.audio.mobHurt(type);
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

      // Cheap bounding-sphere pre-filter: if the mob's center is farther than
      // reach + its half-extent, it can't be in the way. Most mobs fail this,
      // so we skip the (more expensive) slab test for them.
      const maxDim = Math.max(halfW, halfD, totalH / 2) + 0.1;
      const cdx = mob.position.x - playerPos.x;
      const cdy = mob.position.y + totalH / 2 - playerPos.y;
      const cdz = mob.position.z - playerPos.z;
      if (cdx * cdx + cdy * cdy + cdz * cdz > (reach + maxDim) * (reach + maxDim)) continue;

      const minX = mob.position.x - halfW;
      const maxX = mob.position.x + halfW;
      const minY = mob.position.y;
      const maxY = mob.position.y + totalH;
      const minZ = mob.position.z - halfD;
      const maxZ = mob.position.z + halfD;

      // Ray-AABB intersection test
      let tmin = -Infinity, tmax = Infinity;
      const ox = playerPos.x, oy = playerPos.y, oz = playerPos.z;
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
