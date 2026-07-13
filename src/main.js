// Entry point: wires up renderer, world, player, input, and the render loop.

import * as THREE from 'three';
import { World, CHUNK_SIZE, BIOMES } from './world.js';
import { ChunkMeshManager } from './chunkmesh.js';
import { ChunkLoader } from './chunkloader.js';
import { Player } from './player.js';
import { raycastVoxel } from './raycast.js';
import { buildAtlas, makeIcon, TILE } from './tiles.js';
import { UI, drawCrack, makeItemIconCanvas } from './ui.js';
import { Audio } from './audio.js';
import { BLOCK, BLOCKS, HOTBAR_BLOCKS, blockDrop, blockHardness, blockTool, blockHarvestLevel, TILES, tileNameFor } from './blocks.js';
import { isBlockItem, isTool, toolInfo, toolSpeedFor, toolHarvestLevel, isFood, foodValue, fuelValue, ITEM, itemDef, itemName, ARMOR } from './items.js';
import { ViewModel } from './viewmodel.js';
import { saveWorld, loadWorld, getWorldList, saveWorldList, createWorld, deleteWorld, migrateLegacy, hasSave, hasTutorialBeenSeen, markTutorialSeen, syncTutorialFromSdk } from './storage.js';
import { SMELTING, RECIPES } from './recipes.js';
import { AchievementManager, ACHIEVEMENTS, CATEGORIES } from './achievements.js';
import { MobManager, MOB_TYPES } from './mobs.js';
import { calcBiome } from './worldgen.js';
import { SKIN_PRESETS, getSelectedSkin, setSelectedSkin } from './skins.js';
import { PlayerModel } from './playermodel.js';
import { SkinEditor } from './skineditor.js';
import { getKeybinds, setKeybind, resetKeybinds, keyName, KEYBIND_ACTIONS } from './keybinds.js';
import { initMobileControls } from './mobile.js';
import { Server, executeCommand, ROLE_OWNER, ROLE_ADMIN, ROLE_STAFF, ROLE_PLAYER, ROLE_GAMEDEV, ROLE_DEV, resolveCgUsername, getDevTag, setDevTag } from './multiplayer.js';
import { DroppedItemManager } from './dropped.js';
import { MultiplayerRenderer } from './multiplayerrenderer.js';
import { BreakParticles, AmbientParticles, CloudSystem } from './particles.js';
import { trackLogin, trackServerCreated, getDailyUsers, getMonthlyUsers, getTotalServersCreated, getTodayUsers, getThisMonthUsers } from './analytics.js';
import { network } from './network.js';
import { filterProfanity } from './profanity.js';

const REACH = 6;
const DAY_LENGTH = 960; // 16 min total: 10 day + 6 night
const DAY_FRAC = 10 / 16; // fraction of cycle that is day
const BASE_BREAK_TIME = 0.8;

// --- Multiplayer server URL ---
// The always-on WebSocket backend (Render free tier, kept awake by a GitHub
// Actions cron ping). When the game is served from GitHub Pages the page host
// is NOT the server, so we connect here instead. Change this if you rename the
// Render service.
const BACKEND_URL = 'wss://blockforge-server.onrender.com';
// Supports ?server=ws://host:port to explicitly set the multiplayer server
// (useful when devices are on different networks or accessing via different URLs)
const _urlParams = new URLSearchParams(window.location.search);
const _serverParam = _urlParams.get('server');
const MP_SERVER_URL = _serverParam
  ? _serverParam
  : window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'ws://localhost:4000'
    // GitHub Pages (or any host that isn't the server itself) → use the backend.
    : window.location.hostname.endsWith('github.io')
      ? BACKEND_URL
      : window.location.protocol === 'https:'
        // Auto-detect: connect to the same host we were served from (works on
        // Render, a Cloudflare tunnel, or any custom domain like blockforge.io)
        ? `wss://${window.location.hostname}`
        : `ws://${window.location.hostname}:4000`;
let _mpSendTimer = 0;

// --- CrazyGames SDK helpers ---
function cgGameplayStart() {
  try { window.CrazyGames?.SDK?.game?.gameplaystart?.(); } catch (_) {}
}
function cgGameplayStop() {
  try { window.CrazyGames?.SDK?.game?.gameplaystop?.(); } catch (_) {}
}
function cgLoadingStart() {
  try { window.CrazyGames?.SDK?.game?.loadingstart?.(); } catch (_) {}
}
function cgLoadingStop() {
  try { window.CrazyGames?.SDK?.game?.loadingstop?.(); } catch (_) {}
}
function cgMidgameAd(callbacks) {
  const ad = window.CrazyGames?.SDK?.ad;
  if (ad?.requestAd) {
    try { ad.requestAd('midgame', callbacks); } catch (_) { callbacks?.adFinished?.(); }
  } else {
    // No CrazyGames SDK (e.g. self-hosted tunnel) — just finish immediately.
    callbacks?.adFinished?.();
  }
}
const app = document.getElementById('app');

// Mobile devices are far weaker — detect early so we can cap the render
// resolution and view distance for a playable frame rate.
const IS_MOBILE = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

// --- renderer / scene / camera ---
const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' });
renderer.setPixelRatio(IS_MOBILE ? 1 : Math.min(window.devicePixelRatio, 1.5));
renderer.setSize(window.innerWidth, window.innerHeight);

// Graphics quality controls the internal render resolution (the main FPS lever
// on high-DPI/Retina screens, where a full-ratio buffer can be 4x the pixels).
function applyGraphicsQuality() {
  let pr;
  if (IS_MOBILE) {
    // Cap the internal buffer well below the device's native (often 2-3x) DPR.
    pr = graphicsQuality === 'high' ? 1 : 0.75;
  } else if (graphicsQuality === 'low') pr = 1;
  else if (graphicsQuality === 'high') pr = Math.min(window.devicePixelRatio, 2);
  else pr = Math.min(window.devicePixelRatio, 1.5); // medium
  renderer.setPixelRatio(pr);
}

// Block iOS/Android double-tap-to-zoom (which can get "stuck" zoomed in since
// user-scalable=no is ignored on iOS). Only cancels the rapid second tap.
if (IS_MOBILE) {
  let _lastTapTime = 0;
  document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - _lastTapTime <= 300) e.preventDefault();
    _lastTapTime = now;
  }, { passive: false });
  // Also block pinch-zoom gestures (iOS Safari).
  document.addEventListener('gesturestart', (e) => e.preventDefault());
  document.addEventListener('gesturechange', (e) => e.preventDefault());
}
renderer.outputColorSpace = THREE.SRGBColorSpace;
app.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const skyColor = new THREE.Color(0x9ad0ff);
scene.background = skyColor.clone();
scene.fog = new THREE.Fog(skyColor.getHex(), 16 * 5, 16 * 9);

// --- Handle window resize (critical for CrazyGames iframe) ---
window.addEventListener('resize', () => {
  const w = window.innerWidth, h = window.innerHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  menuBgCamera.aspect = w / h;
  menuBgCamera.updateProjectionMatrix();
});

// --- Menu Background 3D Scene (real rotating terrain) ---
import { Noise, hashSeed } from './noise.js';
const menuBgScene = new THREE.Scene();
const menuBgCamera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 500);
menuBgScene.fog = new THREE.Fog(0x87ceeb, 20, 55);
menuBgScene.background = new THREE.Color(0x78b9e8);
const menuBgSun = new THREE.DirectionalLight(0xfff8e7, 1.6);
menuBgSun.position.set(40, 80, 30);
menuBgScene.add(menuBgSun);
menuBgScene.add(new THREE.AmbientLight(0xc8d8ff, 0.55));
menuBgScene.add(new THREE.HemisphereLight(0x87ceeb, 0x556b2f, 0.45));
let menuBgTime = 0;

function mulberry32(a) {
  return function() {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildMenuBackground() {
  const SEED = 'menu_' + (Math.random() * 99999 | 0);
  const noise = new Noise(SEED);
  const GRID = 64, SEA = 16;
  const heightMap = [], biomeMap = [];
  for (let x = 0; x < GRID; x++) {
    heightMap[x] = [];
    biomeMap[x] = [];
    for (let z = 0; z < GRID; z++) {
      const cont = noise.fbm2(noise.continentalness, x * 0.025, z * 0.025, 5, 2, 0.5);
      const ridge = 1 - Math.abs(noise.fbm2(noise.ridge, x * 0.03 + 100, z * 0.03 + 100, 4, 2, 0.5));
      const detail = noise.fbm2(noise.detail, x * 0.08, z * 0.08, 4, 2, 0.5);
      let h;
      if (cont < -0.1) {
        h = SEA - 4 + cont * 10 + detail * 3;
      } else if (cont < 0.15) {
        h = SEA + (cont + 0.1) * 12 + detail * 4;
      } else {
        h = SEA + 2 + (cont - 0.15) * 18 + detail * 5;
        if (cont > 0.4 && ridge > 0.55) h += ridge * (cont - 0.4) * 50;
        h += ridge * 3;
      }
      heightMap[x][z] = Math.max(1, Math.min(44, Math.floor(h)));
      const t = noise.fbm2(noise.temp, x * 0.02 + 200, z * 0.02 + 200, 4, 2, 0.5);
      const hu = noise.fbm2(noise.humid, x * 0.02 + 300, z * 0.02 + 300, 4, 2, 0.5);
      biomeMap[x][z] = t < -0.4 ? 'snow' : t < 0.1 ? (hu > 0.1 ? 'taiga' : 'forest') :
        t < 0.4 ? (hu > 0.2 ? 'dark_forest' : 'forest') : t < 0.6 ? (hu > 0.15 ? 'jungle' : 'savanna') :
        hu < -0.1 ? 'desert' : 'savanna';
    }
  }

  const C = {
    grass: 0x79c05a, dirt: 0x866043, stone: 0x7f7f7f,
    sand: 0xdbd3a0, snow: 0xfefefe, water: 0x3f76e4,
    wood: 0x6b5230, leaves: 0x59a533,
    dark_leaves: 0x3a7422, bedrock: 0x545454, coal_ore: 0x606060, iron_ore: 0x8a7563,
  };
  // Grass blocks get multi-material: green top, dirt sides/bottom
  const GRASS_TOP = 0x79c05a, GRASS_SIDE = 0x866043, GRASS_SIDE_TOP = 0x6a9a4a;
  const counts = {}, blocks = [];
  const add = (t, x, y, z) => { blocks.push({ t, x, y, z }); counts[t] = (counts[t] || 0) + 1; };

  for (let x = 0; x < GRID; x++) {
    for (let z = 0; z < GRID; z++) {
      const h = heightMap[x][z], biome = biomeMap[x][z], ox = x - GRID / 2, oz = z - GRID / 2;
      for (let y = 0; y <= h; y++) {
        let type;
        if (y === 0) type = 'bedrock';
        else if (y === h) {
          type = h < SEA ? 'sand' : biome === 'desert' ? 'sand' : biome === 'snow' ? 'snow' : 'grass';
        } else if (y > h - 4) {
          type = h < SEA ? 'sand' : biome === 'desert' ? 'sand' : 'dirt';
        } else {
          type = 'stone';
          if (y < h - 8 && y > 2) {
            const v = noise.ore(x * 0.1, y * 0.1, z * 0.1);
            if (v > 0.82) type = 'coal_ore';
            else if (v > 0.88 && y < 60) type = 'iron_ore';
          }
        }
        add(type, ox, y, oz);
      }
      if (h < SEA) add('water', ox, SEA, oz);
    }
  }

  const rng = mulberry32(hashSeed(SEED) + 777);
  for (let i = 0; i < 70; i++) {
    const tx = (rng() * GRID) | 0, tz = (rng() * GRID) | 0;
    const th = heightMap[tx][tz];
    if (th < SEA + 1 || biomeMap[tx][tz] === 'desert') continue;
    const ox = tx - GRID / 2, oz = tz - GRID / 2;
    const treeH = 5 + (rng() * 4) | 0;
    const isJungle = biomeMap[tx][tz] === 'jungle';
    const trunkH = isJungle ? treeH + 3 : treeH;
    const leafR = isJungle ? 3 : 2;
    for (let dy = 1; dy <= trunkH; dy++) add('wood', ox, th + dy, oz);
    for (let lx = -leafR; lx <= leafR; lx++) {
      for (let lz = -leafR; lz <= leafR; lz++) {
        for (let ly = -1; ly <= 2; ly++) {
          if (lx === 0 && lz === 0 && ly < 1) continue;
          const dist = Math.abs(lx) + Math.abs(lz) + Math.abs(ly);
          if (dist <= leafR + 1 && rng() > 0.12) {
            add(biomeMap[tx][tz] === 'dark_forest' ? 'dark_leaves' : 'leaves',
              ox + lx, th + trunkH + ly, oz + lz);
          }
        }
      }
    }
  }

  const geo = new THREE.BoxGeometry(1, 1, 1);

  function atlasTex(tileName) {
    const t = TILES[tileName];
    if (!t) return null;
    const c = document.createElement('canvas');
    c.width = TILE; c.height = TILE;
    const ctx = c.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(atlasCanvas, t[0] * TILE, t[1] * TILE, TILE, TILE, 0, 0, TILE, TILE);
    const tex = new THREE.CanvasTexture(c);
    tex.magFilter = THREE.NearestFilter;
    tex.minFilter = THREE.NearestFilter;
    tex.generateMipmaps = false;
    return tex;
  }

  const BLOCK_MAP = {
    grass: BLOCK.GRASS, dirt: BLOCK.DIRT, stone: BLOCK.STONE,
    sand: BLOCK.SAND, snow: BLOCK.SNOW_BLOCK, water: BLOCK.WATER,
    wood: BLOCK.WOOD, leaves: BLOCK.LEAVES, dark_leaves: BLOCK.DARK_OAK_LEAVES,
    bedrock: BLOCK.BEDROCK, coal_ore: BLOCK.COAL_ORE, iron_ore: BLOCK.IRON_ORE,
  };

  for (const [type, count] of Object.entries(counts)) {
    if (count === 0 || !(type in BLOCK_MAP)) continue;
    if (type === 'water') continue; // water rendered as flat plane above
    const blockId = BLOCK_MAP[type];
    const isWater = type === 'water';
    const isGrass = type === 'grass';

    let material;
    if (isGrass) {
      const topTex = atlasTex(tileNameFor(blockId, 'top'));
      const sideTex = atlasTex(tileNameFor(blockId, 'side'));
      const botTex = atlasTex(tileNameFor(blockId, 'bottom'));
      const mk = (t) => t ? new THREE.MeshLambertMaterial({ map: t }) : new THREE.MeshLambertMaterial({ color: 0x866043 });
      material = [mk(sideTex), mk(sideTex), mk(topTex), mk(botTex), mk(sideTex), mk(sideTex)];
    } else if (isWater) {
      material = new THREE.MeshLambertMaterial({ color: 0x3f76e4, transparent: true, opacity: 0.6, depthWrite: false, side: THREE.DoubleSide });
    } else {
      const sideTex = atlasTex(tileNameFor(blockId, 'side'));
      const topTex = atlasTex(tileNameFor(blockId, 'top'));
      const botTex = atlasTex(tileNameFor(blockId, 'bottom'));
      if (topTex && botTex && sideTex) {
        const mk = (t) => new THREE.MeshLambertMaterial({ map: t });
        material = [mk(sideTex), mk(sideTex), mk(topTex), mk(botTex), mk(sideTex), mk(sideTex)];
      } else {
        material = new THREE.MeshLambertMaterial({ map: sideTex });
      }
    }

    const mesh = new THREE.InstancedMesh(geo, material, count);
    let idx = 0;
    const dummy = new THREE.Object3D();
    for (const b of blocks) {
      if (b.t !== type) continue;
      dummy.position.set(b.x + 0.5, b.y + 0.5, b.z + 0.5);
      if (isWater) dummy.scale.set(1.01, 1.0, 1.01);
      else dummy.scale.set(1, 1, 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(idx++, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    menuBgScene.add(mesh);
  }
  // Build water as a single flat plane (no grid lines)
  {
    const waterGeo = new THREE.PlaneGeometry(GRID, GRID);
    const waterMat = new THREE.MeshLambertMaterial({
      color: 0x3f76e4, transparent: true, opacity: 0.7, side: THREE.DoubleSide, depthWrite: false
    });
    const waterMesh = new THREE.Mesh(waterGeo, waterMat);
    waterMesh.rotation.x = -Math.PI / 2;
    waterMesh.position.set(0, SEA + 0.01, 0);
    menuBgScene.add(waterMesh);
  }

  menuBgCamera.position.set(0, 22, 32);
  menuBgCamera.lookAt(0, 8, 0);
}
// buildMenuBackground deferred until atlasCanvas is ready (see below)

// --- lights ---
const sun = new THREE.DirectionalLight(0xffffff, 1.0);
sun.position.set(50, 100, 30);
scene.add(sun);
const ambient = new THREE.AmbientLight(0xbfd4ff, 0.55);
scene.add(ambient);
const hemi = new THREE.HemisphereLight(0xa0d8ff, 0x4a6a3a, 0.4);
scene.add(hemi);

// --- sun & moon ---
const sunMesh = new THREE.Mesh(
  new THREE.SphereGeometry(4, 16, 16),
  new THREE.MeshBasicMaterial({ color: 0xfff2c0, fog: false })
);
sunMesh.layers.enable(1);
const moonMesh = new THREE.Mesh(
  new THREE.SphereGeometry(3, 16, 16),
  new THREE.MeshBasicMaterial({ color: 0xdfe6f0, fog: false })
);
scene.add(sunMesh); scene.add(moonMesh);

// --- 3D star field (rendered in the sky, follows the player like a skybox) ---
let starField = null;
{
  const STAR_COUNT = 1400;
  const R = 820;
  const positions = new Float32Array(STAR_COUNT * 3);
  for (let i = 0; i < STAR_COUNT; i++) {
    // Uniform random point on a sphere
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const r = Math.sin(phi);
    // Keep stars above the horizon (y >= 0) so they live in the sky
    const y = Math.abs(Math.cos(phi));
    positions[i * 3]     = R * r * Math.cos(theta);
    positions[i * 3 + 1] = R * Math.max(0.05, y);
    positions[i * 3 + 2] = R * r * Math.sin(theta);
  }
  const starGeo = new THREE.BufferGeometry();
  starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const starMat = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 2.2,
    sizeAttenuation: false,
    transparent: true,
    opacity: 0,
    fog: false,
    depthWrite: false,
  });
  starField = new THREE.Points(starGeo, starMat);
  starField.frustumCulled = false;
  scene.add(starField);
}

// --- texture atlas ---
const atlasCanvas = buildAtlas(1337);
const atlasTexture = new THREE.CanvasTexture(atlasCanvas);
atlasTexture.magFilter = THREE.NearestFilter;
atlasTexture.minFilter = THREE.NearestFilter;
atlasTexture.generateMipmaps = false;
atlasTexture.colorSpace = THREE.SRGBColorSpace;
atlasTexture.wrapS = atlasTexture.wrapT = THREE.ClampToEdgeWrapping;
buildMenuBackground();

// --- first-person held item (view model) ---
// autoClear=false so we can render the world, then the held-item overlay on top.
renderer.autoClear = false;
const viewmodel = new ViewModel(renderer, atlasCanvas);

// --- selection highlight ---
const hlGeo = new THREE.BoxGeometry(1.002, 1.002, 1.002);
const hlEdges = new THREE.EdgesGeometry(hlGeo);
const highlight = new THREE.LineSegments(hlEdges, new THREE.LineBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.5 }));
highlight.visible = false;
scene.add(highlight);

// --- 3D breaking crack overlay ---
const crackCanvas = document.createElement('canvas');
crackCanvas.width = 64; crackCanvas.height = 64;
const crackTexture = new THREE.CanvasTexture(crackCanvas);
crackTexture.magFilter = THREE.NearestFilter;
crackTexture.minFilter = THREE.NearestFilter;
crackTexture.generateMipmaps = false;
const crackMaterial = new THREE.MeshBasicMaterial({
  map: crackTexture, transparent: true, depthTest: true, depthWrite: false,
  polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4,
});
const crackPlane = new THREE.Mesh(new THREE.PlaneGeometry(1.001, 1.001), crackMaterial);
crackPlane.visible = false;
scene.add(crackPlane);

function updateBreaking(progress, hit) {
  if (progress <= 0 || !hit) { crackPlane.visible = false; return; }
  crackPlane.visible = true;
  drawCrack(crackCanvas, Math.min(3, Math.floor(progress * 4)));
  crackTexture.needsUpdate = true;
  crackPlane.position.set(hit.x + 0.5, hit.y + 0.5, hit.z + 0.5);
  const dir = new THREE.Vector3();
  camera.getWorldDirection(dir);
  // Push toward camera so crack sits ON the block face, not inside it
  crackPlane.position.addScaledVector(dir, -0.008);
  crackPlane.lookAt(camera.position);
}

// --- UI / audio ---
const ui = new UI(atlasCanvas);
ui._onSync = syncUIMode;
ui.onCraft = (itemId, count) => {
  achievements.addItemsCrafted(count);
  const STORAGE_BLOCKS = [BLOCK.COAL_BLOCK, BLOCK.IRON_BLOCK, BLOCK.GOLD_BLOCK, BLOCK.DIAMOND_BLOCK, BLOCK.PRISMITE_BLOCK];
  if (STORAGE_BLOCKS.includes(itemId)) achievements.incrementStat('storageBlocksCrafted');
  if (player && player.isSurvival()) {
    const xpGain = Math.ceil(count * 0.5);
    if (player.addXp(xpGain)) ui.showLevelUp(player.level);
  }
};
const audio = new Audio();
const achievements = new AchievementManager();

// --- sleep overlay ---
const sleepOverlay = document.getElementById('sleep-overlay');
const sleepMessage = document.getElementById('sleep-message');

// --- underwater overlay ---
const underwaterOverlay = document.getElementById('underwater-overlay');

// --- stars overlay ---
const starsOverlay = document.getElementById('stars');

// --- block breaking particles ---
const PARTICLE_COUNT = 8;
const PARTICLE_LIFE = 0.6;
const particles = [];
const particleGeo = new THREE.BoxGeometry(0.1, 0.1, 0.1);

const BLOCK_COLORS = {
  [BLOCK.GRASS]: 0x5daa34,
  [BLOCK.DIRT]: 0x866043,
  [BLOCK.STONE]: 0x888888,
  [BLOCK.COBBLESTONE]: 0x777777,
  [BLOCK.WOOD]: 0x6b5230,
  [BLOCK.LEAVES]: 0x4a9a2a,
  [BLOCK.SAND]: 0xdbc67b,
  [BLOCK.WATER]: 0x3a7acc,
  [BLOCK.BEDROCK]: 0x555555,
  [BLOCK.PLANKS]: 0xb8945a,
  [BLOCK.COAL_ORE]: 0x444444,
  [BLOCK.IRON_ORE]: 0xb8a080,
  [BLOCK.GOLD_ORE]: 0xd4c060,
  [BLOCK.DIAMOND_ORE]: 0x60d4d4,
  [BLOCK.GLASS]: 0xc8e8f0,
  [BLOCK.BRICK]: 0x9a4a3a,
  [BLOCK.GRAVEL]: 0x8a8278,
  [BLOCK.CLAY]: 0xa0a0b0,
  [BLOCK.PUMPKIN]: 0xc87820,
  [BLOCK.CACTUS]: 0x3a8a2a,
  [BLOCK.FLOWER_RED]: 0xcc3333,
  [BLOCK.FLOWER_YELLOW]: 0xdddd33,
  [BLOCK.OBSIDIAN]: 0x1a0a2a,
  [BLOCK.NETHERRACK]: 0x6a2222,
  [BLOCK.RED_SAND]: 0xb86030,
  [BLOCK.TERRACOTTA]: 0xb06040,
  [BLOCK.SNOW_BLOCK]: 0xf0f0f8,
  [BLOCK.DARK_OAK_LEAVES]: 0x2a6a1a,
  [BLOCK.JUNGLE_WOOD]: 0x5a7a30,
  [BLOCK.SNOW]: 0xf0f0f8,
  [BLOCK.SNOW_GRASS]: 0xf0f0f8,
  [BLOCK.FURNACE]: 0x888888,
  [BLOCK.BOOKSHELF]: 0x8a6a44,
  [BLOCK.TNT]: 0xcc3333,
  [BLOCK.CRAFTING]: 0x8a6a44,
  [BLOCK.BED]: 0xaa3333,
  [BLOCK.PODZOL]: 0x6a5030,
  [BLOCK.MYCELIUM]: 0x7a7a8a,
};

function spawnBreakParticles(x, y, z, blockId) {
  const color = BLOCK_COLORS[blockId] ?? 0x888888;
  const col = new THREE.Color(color);
  const count = blockId === BLOCK.GLASS ? PARTICLE_COUNT * 2 : PARTICLE_COUNT;
  for (let i = 0; i < count; i++) {
    const brightness = 0.7 + Math.random() * 0.3;
    const mat = new THREE.MeshLambertMaterial({
      color: new THREE.Color(col.r * brightness, col.g * brightness, col.b * brightness),
    });
    const mesh = new THREE.Mesh(particleGeo, mat);
    mesh.position.set(x + 0.5, y + 0.5, z + 0.5);
    mesh.rotation.set(Math.random() * 6, Math.random() * 6, Math.random() * 6);
    const spread = 2.5 + Math.random() * 1.5;
    scene.add(mesh);
    particles.push({
      mesh,
      vx: (Math.random() - 0.5) * spread,
      vy: Math.random() * 3.5 + 1.5,
      vz: (Math.random() - 0.5) * spread,
      life: PARTICLE_LIFE + Math.random() * 0.2,
      rotSpeed: (Math.random() - 0.5) * 6,
    });
  }
}

function updateParticles(dt) {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.life -= dt;
    if (p.life <= 0) {
      scene.remove(p.mesh);
      p.mesh.geometry.dispose();
      p.mesh.material.dispose();
      particles.splice(i, 1);
      continue;
    }
    p.vy -= 9.8 * dt;
    p.mesh.position.x += p.vx * dt;
    p.mesh.position.y += p.vy * dt;
    p.mesh.position.z += p.vz * dt;
    const t = Math.max(0, p.life / PARTICLE_LIFE);
    p.mesh.material.opacity = t;
    p.mesh.material.transparent = true;
    p.mesh.scale.setScalar(0.3 + t * 0.7);
    if (p.rotSpeed) {
      p.mesh.rotation.x += p.rotSpeed * dt;
      p.mesh.rotation.z += p.rotSpeed * dt * 0.7;
    }
  }
}

// --- Game state (set by startGame) ---
let world = null, manager = null, loader = null, player = null, mobManager = null, playerModel = null;
let _lastLocalArmorKey = '';
let gameRunning = false;
let renderDist = 7;
let graphicsQuality = 'medium'; // 'low' | 'medium' | 'high'
let gameDifficulty = 'normal'; // 'normal' | 'hard'
let mouseSensitivity = 1.0; // 0.2 .. 2.0 multiplier
let joiningViaLink = false; // true when auto-joining from a shareable link
let mobile = null;
let isMultiplayer = false;
let droppedItemManager = null;
let mpRenderer = null;
let breakParticles = null, ambientParticles = null, cloudSystem = null;

// --- multiplayer / chat state ---
let playerName = 'Player';
let serverName = '';
let currentServer = null;
let staffList = [];
let bannedPlayers = [];
let chatOpen = false;
let chatInput = '';
let chatHistory = [];
let chatHistoryIdx = -1;
const MAX_CHAT_LINES = 200;
const MAX_CHAT_HISTORY = 50;
let chatDisabled = false;
try {
  const gs = window.CrazyGames?.SDK?.game?.getGameSettings?.();
  if (gs && gs.disableChat) chatDisabled = true;
} catch (_) {}
// Listen for live game settings changes (CrazyGames requirement)
try {
  window.CrazyGames?.SDK?.game?.onGameSettingsUpdate?.((settings) => {
    if (settings && settings.disableChat !== undefined) chatDisabled = !!settings.disableChat;
  });
} catch (_) {}
// Listen for CG auth state changes (guest logs in while playing)
try {
  window.CrazyGames?.SDK?.user?.onAuthStateChange?.((user) => {
    if (user && user.id) {
      const newName = user.username || playerName;
      if (newName !== playerName) {
        playerName = filterProfanity(newName);
        try { localStorage.setItem('bf_player_name', playerName); } catch (_) {}
        const nameEl = document.getElementById('menu-player-name');
        if (nameEl) nameEl.textContent = playerName;
      }
    }
  });
} catch (_) {}

// --- sleep state ---
let sleeping = false;
let sleepPhase = 0; // 0=none, 1=fade to black, 2=hold, 3=fade from black
let sleepTimer = 0;
let bedSpawnPoint = null;

// --- offer banner state ---
let offerActive = false;
let offerTimer = 0;
const OFFER_MIN_INTERVAL = 60;   // min seconds between offers
const OFFER_MAX_INTERVAL = 180;  // max seconds between offers
let offerNextTime = OFFER_MIN_INTERVAL + Math.random() * (OFFER_MAX_INTERVAL - OFFER_MIN_INTERVAL);
const IRON_OFFER_ITEMS = [
  ITEM.IRON_PICKAXE, ITEM.IRON_AXE, ITEM.IRON_SHOVEL, ITEM.IRON_SWORD,
  ITEM.IRON_HELMET, ITEM.IRON_CHEST, ITEM.IRON_LEGS, ITEM.IRON_BOOTS,
];

// --- input state ---
const input = { keys: {}, mouseLeftHeld: false };
let pointerLocked = false;
let breakingTarget = null;
let breakingElapsed = 0;
let lastBreakSound = 0;
let placeAnimTimer = 0;

function lockPointer() {
  if (mobile && mobile.isMobile) return; // no pointer lock on mobile
  const p = renderer.domElement.requestPointerLock();
  if (p && p.catch) p.catch(() => {});
}

renderer.domElement.addEventListener('click', () => {
  if (ui.isOverlayShown()) return;
  if (!pointerLocked) lockPointer();
});

document.addEventListener('pointerlockchange', () => {
  pointerLocked = document.pointerLockElement === renderer.domElement;
  // Don't open the pause menu if another overlay (e.g. death screen) is already up.
  if (!pointerLocked && gameRunning && !ui.inventoryOpen && !ui.furnaceOpen && !ui.isOverlayShown()) {
    if (!(mobile && mobile.isMobile)) {
      ui.showMenu('pause');
      cgGameplayStop();
    }
  }
});

document.addEventListener('mousemove', (e) => {
  if (ui.inventoryOpen) {
    ui.cursorItemEl.style.left = (e.clientX - 16) + 'px';
    ui.cursorItemEl.style.top = (e.clientY - 16) + 'px';
    return;
  }
  if (!pointerLocked || !player) return;
  if (sleeping) return;
  player.applyMouse(e.movementX, e.movementY);
});

 document.addEventListener('keydown', (e) => {
  if (!gameRunning) return;
  const kb = getKeybinds();
  // Escape during sleep wakes up
  if (e.code === 'Escape' && sleeping) {
    sleeping = false;
    sleepPhase = 0;
    sleepOverlay.style.opacity = 0;
    lockPointer();
    return;
  }
  if (sleeping) return;
  // Chat input: T opens chat, / opens chat with / prefix
  if (chatOpen) {
    if (e.code === 'Enter') {
      e.preventDefault();
      submitChat();
    } else if (e.code === 'Escape') {
      e.preventDefault();
      closeChat();
    }
    return; // let browser handle typing in chat input
  }
  if (e.code === kb.chat && gameRunning && !ui.inventoryOpen && !chatDisabled) {
    e.preventDefault();
    openChat('');
    return;
  }
  if (e.code === kb.command && gameRunning && !ui.inventoryOpen && !chatDisabled) {
    e.preventDefault();
    openChat('/');
    return;
  }
  input.keys[e.code] = true;
    if (e.code === 'Escape') {
    if (ui.furnaceOpen) {
      ui.closeFurnace();
      lockPointer();
    } else if (ui.chestOpen) {
      ui.closeChest();
      lockPointer();
    } else if (ui.inventoryOpen) {
      ui.closeInventory();
      syncUIMode();
      lockPointer();
    }
  }
  if (e.code === kb.playerList) {
    e.preventDefault();
    showPlayerList();
    return;
  }
  if (e.code === kb.inventory) {
    e.preventDefault();
    if (ui.inventoryOpen) {
      ui.closeInventory();
      syncUIMode();
      lockPointer();
    } else {
      ui.openInventory(player.inventory, 2, player.isCreative());
      achievements.incrementStat('inventoryOpened');
      document.exitPointerLock();
    }
    return;
  }
  // F3 = debug overlay
  if (e.code === kb.debug) {
    e.preventDefault();
    const dbg = document.getElementById('debug-overlay');
    if (dbg) dbg.style.display = dbg.style.display === 'none' ? '' : 'none';
  }
  // Hotbar keys 1-9
  if (e.code >= 'Digit1' && e.code <= 'Digit9') {
    const idx = parseInt(e.code.slice(5)) - 1;
    ui.setActive(idx);
    player.inventory.setSelected(idx);
    syncUIMode();
    // Show item name briefly
    showHeldItemName();
  }
  // Q = drop item
  if (e.code === kb.drop) {
    const slot = player.inventory.getSelected();
    if (slot) {
      // Spawn visible dropped entity
      if (droppedItemManager) {
        droppedItemManager.drop(slot.item, 1, player.position.x, player.position.y + 1, player.position.z);
      }
      slot.count--;
      if (slot.count <= 0) player.inventory.slots[player.inventory.selected] = null;
      syncUIMode();
    }
  }
  // F = swap selected hotbar item with offhand (Minecraft Java behavior)
  if (e.code === kb.swapHands && !ui.inventoryOpen) {
    const sel = player.inventory.selected;
    const curSlot = player.inventory.slots[sel];
    const offhand = player.inventory.offhand;
    if (curSlot || offhand) {
      player.inventory.slots[sel] = offhand || null;
      player.inventory.offhand = curSlot || null;
      syncUIMode();
    }
  }
  // F5 = cycle camera (1st person → 3rd person back → 3rd person front)
  if (e.code === kb.perspective) {
    e.preventDefault();
    player.cycleCamera();
    const modes = ['First Person', 'Third Person (Behind)', 'Third Person (Front)'];
    ui.itemNameEl.textContent = modes[player.cameraMode];
    ui.itemNameEl.classList.add('visible');
    _itemNameTimer = 1.5;
  }
  // F7 = toggle gamemode (singleplayer only)
  if (e.code === 'F7') {
    e.preventDefault();
    if (!isMultiplayer) {
      toggleGamemode();
    } else {
      ui.itemNameEl.textContent = 'Creative mode locked in multiplayer';
      ui.itemNameEl.classList.add('visible');
      _itemNameTimer = 2;
    }
  }
  // Y = accept offer banner
  if (e.code === 'KeyY' && offerActive) {
    e.preventDefault();
    acceptOffer();
  }
  // X = deny offer banner
  if (e.code === 'KeyX' && offerActive) {
    e.preventDefault();
    denyOffer();
  }
});
document.addEventListener('keyup', (e) => {
  input.keys[e.code] = false;
  if (e.code === getKeybinds().playerList) hidePlayerList();
});

function showPlayerList() {
  const el = document.getElementById('player-list-overlay');
  if (!el) return;
  let names = [];
  if (isMultiplayer && currentServer && currentServer.players) {
    names = currentServer.players.map(p => p.name);
  } else {
    names = [playerName || 'You'];
  }
  const namesEl = el.querySelector('.pl-names');
  namesEl.innerHTML = '';
  for (const n of names) {
    const d = document.createElement('div');
    d.className = 'pl-row';
    d.textContent = n;
    namesEl.appendChild(d);
  }
  el.querySelector('.pl-count').textContent =
    names.length + (names.length === 1 ? ' player online' : ' players online');
  el.style.display = 'block';
}

function hidePlayerList() {
  const el = document.getElementById('player-list-overlay');
  if (el) el.style.display = 'none';
}

// ── Friends menu ───────────────────────────────────────────────────────
let _friendState = { friends: [], incoming: [], outgoing: [] };
let _backgroundAuth = false; // true when re-authing silently (not from login screen)

function openFriendsMenu() {
  const note = document.getElementById('friends-login-note');
  const main = document.getElementById('friends-main');
  let pass = '';
  try { pass = localStorage.getItem('bf_login_pass') || ''; } catch (_) {}
  // Friends require a logged-in account.
  if (!playerName || !pass) {
    if (note) note.style.display = '';
    if (main) main.style.display = 'none';
    return;
  }
  if (note) note.style.display = 'none';
  if (main) main.style.display = '';
  const msg = document.getElementById('friend-msg');
  if (msg) msg.textContent = '';
  // Ensure we're connected + identified, then fetch the friend list.
  // Mark auth as background so the auth_result handler doesn't bounce us to the
  // main menu (that behaviour is only for the login screen).
  if (!network.connected) {
    network.connect(MP_SERVER_URL);
    network.onConnected = () => {
      _backgroundAuth = true;
      network.sendAuth(playerName, pass, 'login');
      network.friendList();
    };
  } else {
    if (!network.isInRoom()) { _backgroundAuth = true; network.sendAuth(playerName, pass, 'login'); }
    network.friendList();
  }
}

function renderFriends() {
  const listEl = document.getElementById('friends-list');
  const reqBox = document.getElementById('friends-requests-box');
  const reqList = document.getElementById('friends-requests-list');
  if (!listEl) return;

  // Pending incoming requests
  const incoming = _friendState.incoming || [];
  if (reqBox) reqBox.style.display = incoming.length ? '' : 'none';
  const reqHeader = document.getElementById('friends-requests-header');
  if (reqHeader) reqHeader.textContent = `${incoming.length} FRIEND REQUEST${incoming.length === 1 ? '' : 'S'} PENDING`;
  if (reqList) {
    reqList.innerHTML = incoming.map(n => `
      <div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid rgba(80,80,80,0.25);">
        <div style="flex:1;font:13px monospace;color:#eee;">${escHtml(n)}</div>
        <button class="fr-accept menu-btn" data-name="${escHtml(n)}" style="min-width:auto;padding:5px 10px;font-size:10px;background:linear-gradient(180deg,#5a8a5a,#366336);border-color:#2a5a2a;">ACCEPT</button>
        <button class="fr-decline menu-btn secondary" data-name="${escHtml(n)}" style="min-width:auto;padding:5px 10px;font-size:10px;">DECLINE</button>
      </div>`).join('');
  }

  // Friend list (online first)
  const friendsArr = (_friendState.friends || []).slice().sort((a, b) => (b.online - a.online) || a.name.localeCompare(b.name));
  const outgoing = _friendState.outgoing || [];
  let html = '';
  if (friendsArr.length === 0 && outgoing.length === 0) {
    html = '<div style="font:12px monospace;color:#888;text-align:center;padding:12px;">No friends yet. Add someone above!</div>';
  }
  html += friendsArr.map(f => `
    <div style="display:flex;align-items:center;gap:8px;padding:7px 0;border-bottom:1px solid rgba(80,80,80,0.25);">
      <div style="width:8px;height:8px;border-radius:50%;background:${f.online ? '#4d4' : '#666'};box-shadow:${f.online ? '0 0 5px #4d4' : 'none'};"></div>
      <div style="flex:1;font:13px monospace;color:#eee;">${escHtml(f.name)} <span style="font-size:10px;color:${f.online ? '#6c6' : '#777'};">${f.online ? 'online' : 'offline'}</span></div>
      <button class="fr-remove menu-btn secondary" data-name="${escHtml(f.name)}" style="min-width:auto;padding:5px 9px;font-size:10px;">REMOVE</button>
    </div>`).join('');
  // Pending outgoing (sent) requests
  html += outgoing.map(n => `
    <div style="display:flex;align-items:center;gap:8px;padding:7px 0;border-bottom:1px solid rgba(80,80,80,0.25);opacity:0.7;">
      <div style="width:8px;height:8px;border-radius:50%;background:#ca6;"></div>
      <div style="flex:1;font:13px monospace;color:#ccc;">${escHtml(n)} <span style="font-size:10px;color:#ca6;">request sent</span></div>
      <button class="fr-decline menu-btn secondary" data-name="${escHtml(n)}" style="min-width:auto;padding:5px 9px;font-size:10px;">CANCEL</button>
    </div>`).join('');
  listEl.innerHTML = html;

  // Wire buttons
  document.querySelectorAll('.fr-accept').forEach(b => b.addEventListener('click', () => network.friendAccept(b.dataset.name)));
  document.querySelectorAll('.fr-decline').forEach(b => b.addEventListener('click', () => network.friendDecline(b.dataset.name)));
  document.querySelectorAll('.fr-remove').forEach(b => b.addEventListener('click', () => network.friendRemove(b.dataset.name)));
}

// --- Controls / key bindings screen ----------------------------------------
let _rebinding = null;

function renderControls() {
  const list = document.getElementById('controls-list');
  if (!list) return;
  const kb = getKeybinds();
  list.innerHTML = '';
  for (const act of KEYBIND_ACTIONS) {
    const row = document.createElement('div');
    row.className = 'control-row';
    const label = document.createElement('label');
    label.textContent = act.label;
    const btn = document.createElement('div');
    btn.className = 'key-btn';
    btn.textContent = keyName(kb[act.id]);
    btn.addEventListener('click', () => startRebind(act.id, btn));
    row.appendChild(label);
    row.appendChild(btn);
    list.appendChild(row);
  }
}

function startRebind(action, btn) {
  if (_rebinding && _rebinding.handler) {
    document.removeEventListener('keydown', _rebinding.handler, true);
  }
  _rebinding = { action, btn };
  document.querySelectorAll('.key-btn').forEach(b => b.classList.remove('listening'));
  btn.classList.add('listening');
  btn.textContent = 'Press a key…';
  const handler = (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    document.removeEventListener('keydown', handler, true);
    btn.classList.remove('listening');
    _rebinding = null;
    if (e.code === 'Escape') { renderControls(); return; }
    setKeybind(action, e.code);
    renderControls();
  };
  document.addEventListener('keydown', handler, true);
  _rebinding.handler = handler;
}

function cancelRebind() {
  if (_rebinding && _rebinding.handler) {
    document.removeEventListener('keydown', _rebinding.handler, true);
  }
  _rebinding = null;
  document.querySelectorAll('.key-btn').forEach(b => b.classList.remove('listening'));
}

// mouse wheel cycles hotbar
window.addEventListener('wheel', (e) => {
  if (!pointerLocked || !gameRunning) return;
  const newIdx = ui.active + Math.sign(e.deltaY);
  ui.setActive(newIdx);
  player.inventory.setSelected(newIdx);
  syncUIMode();
  showHeldItemName();
}, { passive: true });

// Tap a hotbar slot to select it (works on mobile + desktop)
ui.onHotbarSelect = (i) => {
  if (!gameRunning || !player) return;
  ui.setActive(i);
  player.inventory.setSelected(i);
  syncUIMode();
  showHeldItemName();
};

// break / place on mouse buttons
document.addEventListener('mousedown', (e) => {
  if (!pointerLocked || ui.inventoryOpen || !gameRunning) return;
  audio.resume();
  viewmodel.swing();
  if (e.button === 0) {
    breakingTarget = null;
    breakingElapsed = 0;
  } else if (e.button === 1) {
    // Creative block picker: middle-click selects the targeted block into the hotbar
    if (player.isCreative()) {
      const hit = currentTarget();
      if (hit && isBlockItem(hit.block)) {
        player.inventory.slots[player.inventory.selected] = { item: hit.block, count: 1 };
        syncUIMode();
        audio.place();
      }
      e.preventDefault();
    }
  } else if (e.button === 2) {
    const hit = currentTarget();
    const held = player.inventory.getSelected();
    if (held && (held.item === ITEM.BUCKET || held.item === ITEM.WATER_BUCKET)) {
      handleBucket(held, hit);
      e.preventDefault();
      return;
    }
    if (hit && hit.block === BLOCK.CRAFTING) {
      ui.openInventory(player.inventory, 3, false);
      achievements.incrementStat('inventoryOpened');
      document.exitPointerLock();
    } else if (hit && hit.block === BLOCK.FURNACE) {
      ui.openFurnace(player.inventory);
      document.exitPointerLock();
    } else if (hit && hit.block === BLOCK.CHEST) {
      const slots = world.getOrCreateChest(hit.x, hit.y, hit.z);
      ui.openChest(slots, player.inventory, hit.x, hit.y, hit.z);
      document.exitPointerLock();
    } else if (hit && hit.block === BLOCK.BED) {
      trySleep();
    } else {
      // Minecraft Java right-click: main hand first, then off-hand fallback
      let used = false;
      const slot = player.inventory.getSelected();

      // Main hand: eat food or place block
      if (player.isSurvival() && slot && isFood(slot.item)) {
        if (player.eat(foodValue(slot.item))) {
          slot.count--;
          if (slot.count <= 0) player.inventory.slots[player.inventory.selected] = null;
          syncUIMode();
          achievements.incrementStat('foodEaten');
          try { audio.eatBite(); } catch (_) {}
          used = true;
        }
      } else if (slot && isBlockItem(slot.item)) {
        placeBlock();
        used = true;
      }
      // Note: empty main hand does NOT set used=true so off-hand can try

      // Off-hand fallback: eat food or place block
      if (!used && player.inventory.offhand) {
        const oh = player.inventory.offhand;
        if (player.isSurvival() && isFood(oh.item)) {
          if (player.eat(foodValue(oh.item))) {
            oh.count--;
            if (oh.count <= 0) player.inventory.offhand = null;
            syncUIMode();
            achievements.incrementStat('foodEaten');
            try { audio.eatBite(); } catch (_) {}
          }
        } else if (isBlockItem(oh.item)) {
          placeBlock(oh);
        }
      }
    }
  }
});
document.addEventListener('mouseup', (e) => {
  if (e.button === 0) {
    breakingTarget = null;
    breakingElapsed = 0;
    updateBreaking(0, null);
  }
});
document.addEventListener('contextmenu', (e) => e.preventDefault());

// --- gamemode toggle ---
function toggleGamemode() {
  if (player.isCreative()) {
    player.setGamemode('survival');
  } else {
    player.setGamemode('creative');
  }
  syncUIMode();
}

function syncUIMode() {
  if (!player) return;
  const creative = player.isCreative();
  ui.creative = creative;
  ui.buildHotbarFromInventory(player.inventory);
}

// --- block editing ---
function currentTarget() {
  if (!player) return null;
  const dir = new THREE.Vector3();
  camera.getWorldDirection(dir);
  return raycastVoxel(world, camera.position.clone(), dir, REACH);
}

function getHeldItemId() {
  if (!player) return null;
  const slot = player.inventory.getSelected();
  return slot ? slot.item : null;
}

// Show held item name briefly when switching slots
let _itemNameTimer = 0;
function showHeldItemName() {
  const slot = player.inventory.getSelected();
  if (!slot) return;
  const def = itemDef(slot.item);
  const name = def ? def.name : BLOCKS[slot.item]?.name || 'Unknown';
  ui.itemNameEl.textContent = name;
  ui.itemNameEl.classList.add('visible');
  _itemNameTimer = 1.5;
}

// ── Footstep particles ──────────────────────────────────────────────────────
const _stepParticles = [];
const _stepGeo = new THREE.BufferGeometry();
const _stepMat = new THREE.PointsMaterial({ size: 0.08, vertexColors: true, transparent: true, opacity: 0.7, depthWrite: false });
const _stepPoints = new THREE.Points(_stepGeo, _stepMat);
_stepPoints.frustumCulled = false;
scene.add(_stepPoints);

const STEP_COLORS = {
  [BLOCK.GRASS]: [0.4, 0.7, 0.2],
  [BLOCK.DIRT]: [0.55, 0.38, 0.25],
  [BLOCK.SAND]: [0.9, 0.85, 0.6],
  [BLOCK.GRAVEL]: [0.6, 0.58, 0.55],
  [BLOCK.SNOW_GRASS]: [0.95, 0.95, 0.97],
  [BLOCK.SNOW_BLOCK]: [0.95, 0.95, 0.97],
  [BLOCK.MYCELIUM]: [0.55, 0.45, 0.5],
  [BLOCK.PODZOL]: [0.45, 0.32, 0.18],
  [BLOCK.COBBLESTONE]: [0.5, 0.5, 0.5],
  [BLOCK.PLANKS]: [0.72, 0.58, 0.36],
};

function spawnStepParticles(bx, by, bz, blockId) {
  const col = STEP_COLORS[blockId];
  if (!col) return;
  const count = 2 + (Math.random() * 2 | 0);
  for (let i = 0; i < count; i++) {
    _stepParticles.push({
      x: bx + 0.2 + Math.random() * 0.6,
      y: by + 0.05 + Math.random() * 0.1,
      z: bz + 0.2 + Math.random() * 0.6,
      vx: (Math.random() - 0.5) * 0.6,
      vy: 0.8 + Math.random() * 0.5,
      vz: (Math.random() - 0.5) * 0.6,
      life: 0.3 + Math.random() * 0.3,
      r: col[0] + (Math.random() - 0.5) * 0.1,
      g: col[1] + (Math.random() - 0.5) * 0.1,
      b: col[2] + (Math.random() - 0.5) * 0.1,
    });
  }
}

function updateStepParticles(dt) {
  for (let i = _stepParticles.length - 1; i >= 0; i--) {
    const p = _stepParticles[i];
    p.life -= dt;
    if (p.life <= 0) { _stepParticles.splice(i, 1); continue; }
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.z += p.vz * dt;
    p.vy -= 4 * dt;
  }
  // Update buffer
  const n = _stepParticles.length;
  const pos = new Float32Array(n * 3);
  const col = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const p = _stepParticles[i];
    pos[i * 3] = p.x; pos[i * 3 + 1] = p.y; pos[i * 3 + 2] = p.z;
    const fade = Math.max(0, p.life / 0.6);
    col[i * 3] = p.r * fade; col[i * 3 + 1] = p.g * fade; col[i * 3 + 2] = p.b * fade;
  }
  _stepGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  _stepGeo.setAttribute('color', new THREE.BufferAttribute(col, 3));
}

function placeBlock(slotOverride) {
  const hit = currentTarget();
  if (!hit) return;
  const slot = slotOverride || player.inventory.getSelected();
  let itemId = slot ? slot.item : null;
  if (itemId == null) return;

  // BED item places BED block
  if (itemId === ITEM.BED) itemId = BLOCK.BED;

  if (!isBlockItem(itemId)) return;
  const def = BLOCKS[itemId];
  if (!def || def.liquid) return;

  const { x, y, z } = hit.place;
  // don't place inside the player
  const px = Math.floor(player.position.x);
  const py = Math.floor(player.position.y);
  const pz = Math.floor(player.position.z);
  if ((x === px && z === pz) && (y === py || y === py + 1)) return;

  world.setBlock(x, y, z, itemId);
  if (network.isInRoom()) network.sendBlockUpdate(x, y, z, itemId);
  // Beds are 2 blocks wide — place foot block perpendicular to player facing
  if (itemId === BLOCK.BED) {
    const dirX = Math.round(-Math.sin(player.yaw));
    const dirZ = Math.round(-Math.cos(player.yaw));
    // Place foot block beside the head (perpendicular to look direction)
    const footX = x + (Math.abs(dirX) > Math.abs(dirZ) ? 0 : 1);
    const footZ = z + (Math.abs(dirX) > Math.abs(dirZ) ? (dirX >= 0 ? 1 : -1) : 0);
    if (world.getBlock(footX, y, footZ) === BLOCK.AIR) {
      world.setBlock(footX, y, footZ, itemId);
      if (network.isInRoom()) network.sendBlockUpdate(footX, y, footZ, itemId);
    }
  }
  viewmodel.swing();
  placeAnimTimer = 0.3;
  // consume in survival
  if (player.isSurvival()) {
    slot.count--;
    if (slot.count <= 0) {
      if (slotOverride) {
        // offhand slot reference
        player.inventory.offhand = null;
      } else {
        player.inventory.slots[player.inventory.selected] = null;
      }
    }
    syncUIMode();
  }
  manager.refreshAround(Math.floor(x / CHUNK_SIZE), Math.floor(z / CHUNK_SIZE));
  audio.place();
  // Achievement stats: block placed
  achievements.incrementMapStat('blocksPlaced', `${itemId}`);
  achievements.incrementStat('blocksPlacedAny');
  if (itemId === BLOCK.TORCH) achievements.incrementStat('torchesPlaced');
  // XP for building (small amount)
  if (player.isSurvival()) {
    if (player.addXp(1)) ui.showLevelUp(player.level);
  }
}

// Bucket: empty bucket fills from water, water bucket empties into air.
// Returns true if an action was performed.
function handleBucket(held, hit) {
  if (!hit || !hit.place) return false;
  const { x, y, z } = hit.place;
  const sel = player.inventory.selected;

  if (held.item === ITEM.BUCKET) {
    const atPlace = world.getBlock(x, y, z);
    const isWater = atPlace === BLOCK.WATER || hit.block === BLOCK.WATER;
    if (!isWater) return false;
    held.count--;
    if (held.count <= 0) player.inventory.slots[sel] = null;
    player.inventory.add(ITEM.WATER_BUCKET, 1);
    syncUIMode();
    audio.place();
    return true;
  }

  if (held.item === ITEM.WATER_BUCKET) {
    // Don't place water inside the player.
    const px = Math.floor(player.position.x);
    const py = Math.floor(player.position.y);
    const pz = Math.floor(player.position.z);
    if ((x === px && z === pz) && (y === py || y === py + 1)) return false;
    if (world.getBlock(x, y, z) !== BLOCK.AIR) return false;
    world.setBlock(x, y, z, BLOCK.WATER);
    if (network.isInRoom()) network.sendBlockUpdate(x, y, z, BLOCK.WATER);
    held.count--;
    if (held.count <= 0) player.inventory.slots[sel] = null;
    player.inventory.add(ITEM.BUCKET, 1);
    syncUIMode();
    audio.place();
    return true;
  }
  return false;
}

function breakBlock(hit) {
  const b = world.getBlock(hit.x, hit.y, hit.z);
  if (b === BLOCK.AIR || b === BLOCK.BEDROCK || b === BLOCK.WATER) return;

  // tool speed
  const slot = player.inventory.getSelected();
  const toolId = slot && isTool(slot.item) ? slot.item : null;
  const hardness = blockHardness(b);

  let speed = 1;
  if (toolId) speed = toolSpeedFor(toolId, b);
  const isEffective = toolId && toolInfo(toolId)?.type === blockTool(b);

  const breakTime = hardness > 0 ? (BASE_BREAK_TIME / speed) * (isEffective ? 0.5 : 2) : 0;

  if (breakTime <= 0) {
    doBreak(hit, b);
    return;
  }

  breakingElapsed += 0.05;
  if (breakingElapsed >= breakTime) {
    doBreak(hit, b);
    breakingElapsed = 0;
    breakingTarget = null;
  }
}

function doBreak(hit, b) {
  const slot = player.inventory.getSelected();
  const toolId = slot ? slot.item : null;

  // Prismite pickaxe: mine 3x3 area
  if (isTool(toolId) && toolInfo(toolId)?.type === 'pickaxe' && toolInfo(toolId)?.material === 'PRISMITE') {
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        for (let dz = -1; dz <= 1; dz++) {
          if (dx === 0 && dy === 0 && dz === 0) continue;
          const nx = hit.x + dx, ny = hit.y + dy, nz = hit.z + dz;
          const nb = world.getBlock(nx, ny, nz);
          if (nb !== BLOCK.AIR && nb !== BLOCK.BEDROCK) {
            spawnBreakParticles(nx, ny, nz, nb);
            if (breakParticles) breakParticles.emit(nb, nx, ny, nz, 8);
            world.setBlock(nx, ny, nz, BLOCK.AIR);
            if (network.isInRoom()) network.sendBlockUpdate(nx, ny, nz, 0);
            if (player.isSurvival()) {
              const drop = blockDrop(nb, 4);
              if (drop) player.inventory.add(drop, 1);
            }
          }
        }
      }
    }
  }

  // Prismite axe: mine entire tree (all connected logs + leaves above)
  if (isTool(toolId) && toolInfo(toolId)?.type === 'axe' && toolInfo(toolId)?.material === 'PRISMITE') {
    if (b === BLOCK.WOOD || b === BLOCK.JUNGLE_WOOD) {
      const treeBlocks = [];
      const visited = new Set();
      const stack = [[hit.x, hit.y, hit.z]];
      while (stack.length > 0) {
        const [x, y, z] = stack.pop();
        const key = `${x},${y},${z}`;
        if (visited.has(key)) continue;
        visited.add(key);
        const blk = world.getBlock(x, y, z);
        if (blk === BLOCK.WOOD || blk === BLOCK.JUNGLE_WOOD) {
          treeBlocks.push({ x, y, z, b: blk });
          // Check all 6 neighbors + above for leaves
          for (const [dx, dy, dz] of [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]]) {
            stack.push([x + dx, y + dy, z + dz]);
          }
        } else if (blk === BLOCK.LEAVES || blk === BLOCK.DARK_OAK_LEAVES) {
          treeBlocks.push({ x, y, z, b: blk });
          // Check neighbors for more leaves
          for (const [dx, dy, dz] of [[1,0,0],[-1,0,0],[0,1,0],[0,0,1],[0,0,-1]]) {
            stack.push([x + dx, y + dy, z + dz]);
          }
        }
      }
      for (const tb of treeBlocks) {
        spawnBreakParticles(tb.x, tb.y, tb.z, tb.b);
        if (breakParticles) breakParticles.emit(tb.b, tb.x, tb.y, tb.z, 8);
        world.setBlock(tb.x, tb.y, tb.z, BLOCK.AIR);
        if (network.isInRoom()) network.sendBlockUpdate(tb.x, tb.y, tb.z, 0);
        if (player.isSurvival()) {
          const drop = blockDrop(tb.b, 4);
          if (drop) player.inventory.add(drop, 1);
        }
      }
      if (treeBlocks.length > 1) {
        manager.refreshAround(Math.floor(hit.x / CHUNK_SIZE), Math.floor(hit.z / CHUNK_SIZE));
      }
    }
  }

  spawnBreakParticles(hit.x, hit.y, hit.z, b);
  if (breakParticles) breakParticles.emit(b, hit.x, hit.y, hit.z, 12);
  world.setBlock(hit.x, hit.y, hit.z, BLOCK.AIR);
  if (network.isInRoom()) network.sendBlockUpdate(hit.x, hit.y, hit.z, 0);
  // drop item
  if (player.isSurvival()) {
    const drop = blockDrop(b, toolHarvestLevel(toolId || 0));
    if (drop) player.inventory.add(drop, 1);
    syncUIMode();
  }
  // Achievement stats: block broken
  achievements.incrementMapStat('blocksBroken', `${b}`);
  achievements.incrementStat('totalBlocksBroken');
  manager.refreshAround(Math.floor(hit.x / CHUNK_SIZE), Math.floor(hit.z / CHUNK_SIZE));
  audio.dig(b);
  player.addExhaustion(0.05);
  // XP for mining: ore blocks give more
  const oreXp = { [BLOCK.COAL_ORE]: 2, [BLOCK.IRON_ORE]: 3, [BLOCK.GOLD_ORE]: 5, [BLOCK.DIAMOND_ORE]: 7, [BLOCK.PRISMITE_ORE]: 10 };
  const xpGain = oreXp[b] || 1;
  if (player.isSurvival()) {
    if (player.addXp(xpGain)) {
      ui.showLevelUp(player.level);
    }
  }
}

// --- bed sleep mechanic ---
function trySleep() {
  if (sleeping) return;
  const hit = currentTarget();
  if (!hit || hit.block !== BLOCK.BED) return;
  if (dayTime <= DAY_FRAC) {
    showSleepMessage("You can only sleep at night");
    return;
  }

  // Teleport player to bed position
  player.position.set(hit.x + 0.5, hit.y + 1, hit.z + 0.5);
  player.velocity.set(0, 0, 0);

  // Set respawn point
  if (!bedSpawnPoint) {
    showSleepMessage("Respawn set");
  }
  bedSpawnPoint = { x: hit.x + 0.5, y: hit.y + 1, z: hit.z + 0.5 };
  player.spawnPoint.set(hit.x + 0.5, hit.y + 1, hit.z + 0.5);

  // Start sleep sequence
  sleeping = true;
  sleepPhase = 1;
  sleepTimer = 0;
  sleepOverlay.style.opacity = 0;
  document.exitPointerLock();
}

function showSleepMessage(text) {
  if (!sleepMessage) return;
  sleepMessage.textContent = text;
  sleepMessage.classList.add('visible');
  clearTimeout(showSleepMessage._t);
  showSleepMessage._t = setTimeout(() => sleepMessage.classList.remove('visible'), 2500);
}

// --- offer banner ---
function showOfferBanner() {
  if (offerActive || !gameRunning || !player || !player.isSurvival()) return;
  offerActive = true;
  const itemId = IRON_OFFER_ITEMS[Math.floor(Math.random() * IRON_OFFER_ITEMS.length)];
  const def = itemDef(itemId);
  const banner = document.getElementById('offer-banner');
  const iconEl = document.getElementById('offer-item-icon');
  const nameEl = document.getElementById('offer-item-name');
  if (!banner || !iconEl || !nameEl) return;
  nameEl.textContent = def ? def.name : 'Iron Gear';
  // Draw item icon on the canvas
  const ctx = iconEl.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  ctx.clearRect(0, 0, 16, 16);
  const iconCanvas = makeItemIconCanvas(itemId);
  ctx.drawImage(iconCanvas, 0, 0);
  banner.style.display = 'block';
  // Store the item to give
  banner._offerItemId = itemId;
  // Hide pointer lock so keys work
  document.exitPointerLock();
}

function hideOfferBanner() {
  const banner = document.getElementById('offer-banner');
  if (banner) banner.style.display = 'none';
  offerActive = false;
  offerNextTime = OFFER_MIN_INTERVAL + Math.random() * (OFFER_MAX_INTERVAL - OFFER_MIN_INTERVAL);
  offerTimer = 0;
}

function acceptOffer() {
  if (!offerActive || !player) return;
  const banner = document.getElementById('offer-banner');
  const itemId = banner?._offerItemId;
  if (itemId != null) {
    player.inventory.add(itemId, 1);
    syncUIMode();
    // Show item name briefly
    const def = itemDef(itemId);
    if (def) {
      ui.itemNameEl.textContent = '+1 ' + def.name;
      ui.itemNameEl.classList.add('visible');
      _itemNameTimer = 2;
    }
  }
  hideOfferBanner();
  lockPointer();
}

function denyOffer() {
  hideOfferBanner();
  lockPointer();
}



// ── Chat system ─────────────────────────────────────────────────────────

function addChatLine(text, color, raw) {
  chatHistory.push({ text, color: color || '#fff', time: Date.now(), raw: !!raw });
  if (chatHistory.length > MAX_CHAT_LINES) chatHistory.shift();
  renderChatMessages();
}

function renderChatMessages() {
  const el = document.getElementById('chat-messages');
  if (!el) return;
  const start = Math.max(0, chatHistory.length - 50);
  el.innerHTML = chatHistory.slice(start).map(m => {
    const content = m.raw ? m.text : escHtml(m.text);
    return `<div style="color:${m.color};text-shadow:1px 1px 0 #000;word-wrap:break-word;white-space:pre-wrap;">${content}</div>`;
  }).join('');
  el.scrollTop = el.scrollHeight;
}

function escHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function openChat(prefix) {
  chatOpen = true;
  const wrap = document.getElementById('chat-input-wrap');
  const inp = document.getElementById('chat-input');
  const hud = document.getElementById('chat-hud');
  if (hud) hud.style.display = '';
  if (wrap) wrap.style.display = '';
  if (inp) { inp.value = prefix || ''; inp.focus(); }
}

function closeChat() {
  chatOpen = false;
  const wrap = document.getElementById('chat-input-wrap');
  if (wrap) wrap.style.display = 'none';
  const inp = document.getElementById('chat-input');
  if (inp) { inp.blur(); inp.value = ''; }
  lockPointer();
}

function submitChat() {
  const inp = document.getElementById('chat-input');
  if (!inp) return;
  const text = filterProfanity(inp.value.trim());
  closeChat();
  if (!text) return;

  if (text.startsWith('/')) {
    // Command
    if (network.connected && network.roomName) {
      network.sendCommand(text);
    } else if (currentServer) {
      const result = executeCommand(text, playerName, currentServer);
      addChatLine(result.msg, result.ok ? '#5f5' : '#f55');
      currentServer.save();
    } else {
      addChatLine('No server connected.', '#f55');
    }
  } else {
    // Regular chat message
    if (network.connected && network.roomName) {
      // Send to server — server broadcasts back to all including us
      network.sendChat(text);
      return;
    }
    const role = currentServer ? currentServer.getRole(playerName) : null;
    const isGameDev = role === ROLE_GAMEDEV;
    const isDev = role === ROLE_DEV;
    const isOwner = role === ROLE_OWNER;
    const isAdmin = role === ROLE_ADMIN;
    const isStaff = role === ROLE_STAFF;

    let chatHtml;
    if (isGameDev) {
      chatHtml = `<span style="color:#f44">[</span><span style="color:#0ff">${escHtml(getDevTag())}</span><span style="color:#f44">]</span> ${escHtml(playerName)}: ${escHtml(text)}`;
    } else if (isDev) {
      chatHtml = `<span style="color:#f44">[</span><span style="color:#0ff">Dev</span><span style="color:#f44">]</span> ${escHtml(playerName)}: ${escHtml(text)}`;
    } else if (isOwner) {
      chatHtml = `<span style="color:#fa0">[Owner]</span> ${escHtml(playerName)}: ${escHtml(text)}`;
    } else if (isAdmin) {
      chatHtml = `<span style="color:#f55">[Admin]</span> ${escHtml(playerName)}: ${escHtml(text)}`;
    } else if (isStaff) {
      chatHtml = `<span style="color:#5af">[Staff]</span> ${escHtml(playerName)}: ${escHtml(text)}`;
    } else {
      chatHtml = `${escHtml(playerName)}: ${escHtml(text)}`;
    }
    addChatLine(chatHtml, '#fff', true);
  }
}

// ── Multiplayer menu logic ──────────────────────────────────────────────

function getRecentServers() {
  try {
    const raw = localStorage.getItem('bf_recent_servers');
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function addRecentServer(name) {
  if (name !== 'OfficialSMP') return; // Only track OfficialSMP
  const recent = getRecentServers().filter(s => s !== name);
  recent.unshift(name);
  if (recent.length > 10) recent.length = 10;
  try { localStorage.setItem('bf_recent_servers', JSON.stringify(recent)); } catch (_) {}
}

function renderServerList(filter, remoteRooms) {
  const listEl = document.getElementById('server-list');
  if (!listEl) return;

  // Track which rooms are actually online on the server
  const remoteNames = new Set((remoteRooms || []).map(r => r.name));

  // Only show OfficialSMP — filter out all local servers
  const all = [];
  // Always include OfficialSMP
  const official = Server.load('OfficialSMP') || { name: 'OfficialSMP', seed: 12345, gameMode: 'survival', maxPlayers: 50, players: [] };
  all.push(official);
  // Add any remote rooms that aren't already listed
  if (remoteRooms) {
    for (const r of remoteRooms) {
      if (!all.find(s => s.name === r.name)) {
        all.push({ name: r.name, seed: r.seed, gameMode: r.gameMode, maxPlayers: r.maxPlayers, ownerName: r.owner, players: Array(r.playerCount).fill(null), _remote: true });
      }
    }
  }

  // Mark local servers that are also on the network
  for (const s of all) {
    if (remoteNames.has(s.name)) s._online = true;
    else if (!s._remote) s._online = false;
    else s._online = true;
  }

  const servers = filter ? all.filter(s => s.name.toLowerCase().includes(filter.toLowerCase())) : all;
  if (servers.length === 0) {
    listEl.innerHTML = '<div style="text-align:center;color:#666;padding:16px;font:12px monospace;">' + (filter ? 'No servers match your search.' : 'No servers found. Create one!') + '</div>';
  } else {
    listEl.innerHTML = servers.map(s => {
      const isOwner = s.ownerName === playerName && s.name !== 'OfficialSMP';
      const isOnline = s._online !== false;
      const playerCount = isOnline && s.players ? s.players.length : 0;
      const isFull = playerCount >= s.maxPlayers;
      return `<div style="display:flex;align-items:center;gap:10px;padding:10px 12px;margin-bottom:4px;background:rgba(255,255,255,0.04);border:1px solid rgba(80,80,100,0.25);border-radius:4px;cursor:pointer;transition:background 0.15s,border-color 0.15s;" data-server-name="${s.name.replace(/"/g, '&quot;')}" onmouseenter="this.style.background='rgba(255,255,255,0.08)';this.style.borderColor='rgba(100,130,180,0.4)'" onmouseleave="this.style.background='rgba(255,255,255,0.04)';this.style.borderColor='rgba(80,80,100,0.25)'">
        <div style="flex:1;min-width:0;">
          <div style="font:bold 13px monospace;color:#eee;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escHtml(s.name)}</div>
          <div style="font:11px monospace;color:#888;margin-top:2px;">
            ${isOnline ? `<span style="color:${isFull ? '#f88' : '#8c8'};">${playerCount}/${s.maxPlayers}</span>` : '<span style="color:#666;">Offline</span>'}
            <span style="margin:0 4px;">·</span>
            <span style="color:#aaa;">${s.gameMode || 'survival'}</span>
            ${s.seed != null ? '<span style="margin:0 4px;">·</span><span style="color:#777;">seed: ' + escHtml(String(s.seed)) + '</span>' : ''}
          </div>
        </div>
        ${isOwner ? '<button class="sv-delete-btn" style="background:none;border:1px solid rgba(180,60,60,0.5);color:#e88;cursor:pointer;font:bold 10px monospace;padding:5px 10px;border-radius:3px;transition:background 0.15s;" onmouseenter="this.style.background=\'rgba(180,60,60,0.2)\'" onmouseleave="this.style.background=\'none\'">DELETE</button>' : ''}
        <button class="sv-join-btn" style="background:linear-gradient(180deg,#5a8a5a 0%,#4a7a4a 40%,#407040 60%,#366336 100%);border:1px solid #2a5a2a;color:#fff;cursor:pointer;font:bold 11px monospace;padding:6px 14px;border-radius:3px;letter-spacing:0.5px;text-shadow:1px 1px 0 #224;box-shadow:0 2px 0 #224;transition:transform 0.06s,box-shadow 0.06s;" onmouseenter="this.style.transform=\'translateY(-1px)\';this.style.boxShadow=\'0 3px 0 #224\'" onmouseleave="this.style.transform=\'\';this.style.boxShadow=\'0 2px 0 #224\'">JOIN</button>
      </div>`;
    }).join('');

    // Event delegation for join and delete
    listEl.querySelectorAll('.sv-join-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const name = btn.closest('[data-server-name]').dataset.serverName;
        window._joinServer(name);
      });
    });
    listEl.querySelectorAll('.sv-delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const name = btn.closest('[data-server-name]').dataset.serverName;
        if (confirm('Delete server "' + name + '"?')) {
          window._deleteServer(name);
        }
      });
    });
    // Click row to join
    listEl.querySelectorAll('[data-server-name]').forEach(row => {
      row.addEventListener('click', () => {
        window._joinServer(row.dataset.serverName);
      });
    });
  }
}

let _remoteRoomCache = [];

function renderRecentServers() {
  const el = document.getElementById('recent-servers');
  if (!el) return;
  // OfficialSMP is always in the Server Browser, so don't also list it here
  // (avoids showing it as two separate entries).
  const recent = getRecentServers().filter(s => s !== 'OfficialSMP');
  if (recent.length === 0) {
    el.innerHTML = '<div style="color:#555;padding:10px;font:12px monospace;text-align:center;">No recently played servers</div>';
  } else {
    el.innerHTML = recent.map(name =>
      `<div style="display:flex;align-items:center;padding:8px 10px;margin-bottom:3px;background:rgba(255,255,255,0.03);border:1px solid rgba(80,80,100,0.2);border-radius:3px;cursor:pointer;transition:background 0.15s;" data-recent-name="${name.replace(/"/g, '&quot;')}" onmouseenter="this.style.background='rgba(255,255,255,0.07)'" onmouseleave="this.style.background='rgba(255,255,255,0.03)'">
        <span style="font:12px monospace;color:#ccc;flex:1;">${escHtml(name)}</span>
        <span style="font:10px monospace;color:#5a8;letter-spacing:0.5px;">JOIN &#9654;</span>
      </div>`
    ).join('');
    el.querySelectorAll('[data-recent-name]').forEach(row => {
      row.addEventListener('click', () => window._joinServer(row.dataset.recentName));
    });
  }
}

function showMultiplayerMenu() {
  const mpUsername = document.getElementById('input-mp-username');
  if (mpUsername) mpUsername.value = playerName;
  renderRecentServers();
  renderServerList();
  ui.showMenu('multiplayer');

  // Connect to server and fetch remote room list
  if (!network.connected) {
    network.connect(MP_SERVER_URL);
    network.onConnected = () => {
      network.listRooms();
      syncLocalServersToNetwork();
    };
  } else {
    network.listRooms();
    syncLocalServersToNetwork();
  }
}

// Re-broadcast locally-saved servers to the WS server so other devices can see them
function syncLocalServersToNetwork() {
  if (!network.connected) return;
  const localServers = Server.listAll();
  for (const s of localServers) {
    network.registerRoom(s.name, s.seed || 42, s.gameMode, s.maxPlayers, playerName, s.ownerSecret);
  }
}

function updateSvInfo() {
  const ownerEl = document.getElementById('sv-info-owner');
  const playersEl = document.getElementById('sv-info-players');
  const modeEl = document.getElementById('sv-info-mode');
  const svPlayerInput = document.getElementById('input-player-name');
  const svMaxInput = document.getElementById('input-max-players');
  if (ownerEl) ownerEl.textContent = (svPlayerInput?.value || '').trim() || 'Player';
  if (playersEl) playersEl.textContent = svMaxInput?.value || '10';
  if (modeEl) modeEl.textContent = document.getElementById('sv-mode-creative')?.classList.contains('selected') ? 'Creative' : 'Survival';
}

function showCreateServerMenu() {
  const nameInput = document.getElementById('input-server-name');
  const playerInput = document.getElementById('input-player-name');
  if (nameInput) nameInput.value = playerName + "'s Server";
  if (playerInput) playerInput.value = playerName;
  updateSvInfo();
  ui.showMenu('create-server');
}

function joinServer(name, seed) {
  // Connect to WebSocket server and join the room
  if (!network.connected) {
    network.connect(MP_SERVER_URL);
    // Wait for connection then retry
    network.onConnected = () => {
      _doNetworkJoin(name, seed);
    };
    return;
  }
  _doNetworkJoin(name, seed);
}

function _doNetworkJoin(name, seed) {
  let cgUsername = '';
  try { cgUsername = window.CrazyGames?.SDK?.user?.getUsername?.() || ''; } catch {}
  let skinIdx = 0;
  try { skinIdx = parseInt(localStorage.getItem('blockforge_skin') || '0', 10); } catch {}

  // If we have a local server entry, create it on the network
  // (server.js auto-joins if the room already exists)
  let password = '';
  try { password = localStorage.getItem('bf_login_pass') || ''; } catch (_) {}
  const localServer = Server.load(name);
  const ownerSecret = localServer ? localServer.ownerSecret : null;
  if (localServer) {
    network.createRoom(name, localServer.seed || seed || 42, localServer.gameMode, localServer.maxPlayers, playerName, cgUsername, skinIdx, ownerSecret, password, localServer.isPrivate);
  } else {
    // Remote-only room (from server browser) — no owner secret, so no admin
    network.joinRoom(name, playerName, cgUsername, skinIdx, null, password);
  }
}

// ── Network event handlers ─────────────────────────────────────────────
function setupNetworkHandlers() {
  network.onFriendState = (msg) => {
    _friendState = { friends: msg.friends || [], incoming: msg.incoming || [], outgoing: msg.outgoing || [] };
    renderFriends();
    // Update the badge on the Friends button (pending request count)
    const badge = document.getElementById('friends-badge');
    const n = (_friendState.incoming || []).length;
    if (badge) { badge.textContent = n; badge.style.display = n ? '' : 'none'; }
  };
  network.onFriendMsg = (msg) => {
    const el = document.getElementById('friend-msg');
    if (el) { el.textContent = msg.text; el.style.color = msg.ok ? '#8c8' : '#f88'; }
  };
  network.onJoined = (room, seed, gameMode, players, role, maxPlayers, ownerName) => {
    serverName = room;
    isMultiplayer = true;

    // Create local server state for role tracking
    let server = Server.load(room);
    if (!server) {
      server = new Server(room, maxPlayers, gameMode, ownerName || playerName);
      server.seed = seed;
    }
    // Sync players from server
    server.players = [];
    for (const p of players) {
      server._addPlayer(p.name, p.role);
    }
    server.save();
    currentServer = server;

    addRecentServer(room);
    addChatLine(`Joined server: ${room}`, '#5f5');
    addChatLine('Type /help for commands.', '#aaa');

    // CrazyGames SDK: update room so friends can join via platform UI
    try {
      window.CrazyGames?.SDK?.game?.setRoom?.({
        roomId: room,
        isJoinable: true,
        maxPlayers: maxPlayers || 10,
      });
    } catch (_) {}

    // Track multiplayer for achievements
    achievements.incrementStat('multiplayerJoined');

    // Show invite link button
    const inviteBtn = document.getElementById('btn-invite-link');
    if (inviteBtn) inviteBtn.style.display = '';

    const serverSeed = typeof seed === 'number' ? seed : 42;
    startGame('multiplayer_' + room, serverSeed, gameMode, 'normal');

    // Spawn existing remote players from the player list
    setTimeout(() => {
      if (!mpRenderer || !player || !world) return;
      for (const p of players) {
        if (p.name === playerName) continue;
        const sx = player.position.x + (Math.random() - 0.5) * 30;
        const sz = player.position.z + (Math.random() - 0.5) * 30;
        const sy = world.heightAt(Math.floor(sx), Math.floor(sz)) + 1;
        mpRenderer.addPlayer(p.name, p.skinIndex || 0, sx, sy, sz, p.role, p.cgUsername);
      }
    }, 500);
  };

  network.onPlayerJoin = (name, role, skinIndex, cgUsername) => {
    if (!mpRenderer || !player || !world) return;
    // Spawn at a random position near the local player
    const sx = player.position.x + (Math.random() - 0.5) * 20;
    const sz = player.position.z + (Math.random() - 0.5) * 20;
    const sy = world.heightAt(Math.floor(sx), Math.floor(sz)) + 1;
    mpRenderer.addPlayer(name, skinIndex || 0, sx, sy, sz, role, cgUsername);
    addChatLine(`${name} joined the game`, '#5f5');
  };

  network.onPlayerLeave = (name) => {
    if (mpRenderer) mpRenderer.removePlayer(name);
    addChatLine(`${name} left the game`, '#fa0');
  };

  network.onPlayerPosition = (name, x, y, z, yaw, crouching, armor) => {
    if (mpRenderer) mpRenderer.updatePlayerPosition(name, x, y, z, yaw, crouching, armor);
  };

  network.onChat = (name, role, text) => {
    const safeText = filterProfanity(text);
    const safeName = filterProfanity(name);
    let chatHtml;
    if (role === 'server') {
      chatHtml = `<span style="color:#aaa;font-style:italic;">${escHtml(safeText)}</span>`;
    } else if (role === ROLE_GAMEDEV) {
      chatHtml = `<span style="color:#f44">[</span><span style="color:#0ff">${escHtml(getDevTag())}</span><span style="color:#f44">]</span> ${escHtml(safeName)}: ${escHtml(safeText)}`;
    } else if (role === ROLE_DEV) {
      chatHtml = `<span style="color:#f44">[</span><span style="color:#0ff">Dev</span><span style="color:#f44">]</span> ${escHtml(safeName)}: ${escHtml(safeText)}`;
    } else if (role === ROLE_OWNER) {
      chatHtml = `<span style="color:#fa0">[Owner]</span> ${escHtml(safeName)}: ${escHtml(safeText)}`;
    } else if (role === ROLE_ADMIN) {
      chatHtml = `<span style="color:#f55">[Admin]</span> ${escHtml(safeName)}: ${escHtml(safeText)}`;
    } else if (role === ROLE_STAFF) {
      chatHtml = `<span style="color:#5af">[Staff]</span> ${escHtml(safeName)}: ${escHtml(safeText)}`;
    } else {
      chatHtml = `${escHtml(safeName)}: ${escHtml(safeText)}`;
    }
    addChatLine(chatHtml, '#fff', true);
  };

  network.onPlayerList = (players) => {
    if (!currentServer) return;
    // Sync roles from server
    for (const p of players) {
      const existing = currentServer.players.find(x => x.name === p.name);
      if (existing) {
        existing.role = p.role;
        // Update mpRenderer role if changed
        if (mpRenderer) {
          const rp = mpRenderer.remotePlayers.get(p.name);
          if (rp) rp.setRole(p.role);
        }
      } else {
        currentServer._addPlayer(p.name, p.role);
      }
    }
    // Remove players no longer in list
    currentServer.players = currentServer.players.filter(p =>
      p.name === playerName || players.some(x => x.name === p.name)
    );
    currentServer.save();
  };

  network.onKicked = (reason) => {
    addChatLine(`Kicked: ${reason}`, '#f55');
    gameRunning = false;
    isMultiplayer = false;
    currentServer = null;
    network.disconnect();
    try { window.CrazyGames?.SDK?.game?.setRoom?.(null); } catch (_) {}
    ui.showMenu('multiplayer');
    showMultiplayerMenu();
  };

  network.onError = (text) => {
    if (gameRunning) {
      addChatLine(text, '#f55');
    } else {
      console.warn('[Server]', text);
      const el = document.getElementById('mp-error');
      if (el) { el.textContent = text; el.style.color = '#f55'; setTimeout(() => { el.textContent = ''; }, 4000); }
    }
  };

  network.onGameMode = (gameMode) => {
    if (player) player.setGamemode(gameMode);
    if (currentServer) { currentServer.gameMode = gameMode; currentServer.save(); }
  };

  // Apply block edits received from the server (shared multiplayer world).
  network.onBlockUpdate = (x, y, z, block) => {
    if (!world || !gameRunning || !network.isInRoom()) return;
    world.setBlock(x, y, z, block);
    manager.refreshAround(Math.floor(x / CHUNK_SIZE), Math.floor(z / CHUNK_SIZE));
    saveCurrentWorld();
  };

  network.onBlockBatch = (edits) => {
    if (!world || !gameRunning || !network.isInRoom()) return;
    for (const e of edits) {
      world.setBlock(e.x, e.y, e.z, e.block);
      manager.refreshAround(Math.floor(e.x / CHUNK_SIZE), Math.floor(e.z / CHUNK_SIZE));
    }
    saveCurrentWorld();
  };

  network.onDisconnect = () => {
    if (gameRunning && isMultiplayer) {
      addChatLine('Disconnected from server.', '#f55');
      try { window.CrazyGames?.SDK?.game?.setRoom?.(null); } catch (_) {}
      cgGameplayStop();
      gameRunning = false;
      isMultiplayer = false;
      currentServer = null;
      ui.showMenu('multiplayer');
      showMultiplayerMenu();
    }
  };

  network.onPlayerDamage = (from, damage) => {
    if (player && !player.isDead()) {
      player.takeDamage(damage, 'player');
      addChatLine(`${from} hit you for ${damage} damage!`, '#f55');
    }
  };

  network.onRoomList = (rooms) => {
    _remoteRoomCache = rooms;
    // Re-render server list if multiplayer menu is visible
    const mpMenu = document.getElementById('menu-multiplayer');
    if (mpMenu && mpMenu.classList.contains('active')) {
      renderServerList(undefined, rooms);
    }
  };

  network.onAuthResult = (msg) => {
    const loginCreateBtn = document.getElementById('btn-login-create');
    const loginGoBtn = document.getElementById('btn-login-go');
    const loginHint = document.getElementById('login-hint');
    if (loginCreateBtn) loginCreateBtn.disabled = false;
    if (loginGoBtn) loginGoBtn.disabled = false;
    if (msg.ok) {
      playerName = msg.username || playerName;
      try {
        localStorage.setItem('bf_player_name', playerName);
        localStorage.setItem('bf_login_user', playerName);
        const pass = document.getElementById('login-password');
        if (pass) localStorage.setItem('bf_login_pass', pass.value);
      } catch (_) {}
      const nameTag = document.getElementById('menu-player-name');
      if (nameTag) nameTag.textContent = playerName;
      // Only jump to the main menu when this auth came from the login screen —
      // not from a background re-auth (e.g. opening the Friends menu).
      if (_backgroundAuth) {
        _backgroundAuth = false;
      } else {
        if (loginHint) { loginHint.style.color = '#5f5'; loginHint.textContent = msg.created ? 'Account created! Welcome, ' + playerName + '.' : 'Logged in! Welcome back, ' + playerName + '.'; }
        setTimeout(() => { ui.showMenu('main'); }, 600);
      }
    } else {
      if (loginHint) { loginHint.style.color = '#f85'; loginHint.textContent = msg.reason || 'Login failed.'; }
    }
  };
}

// Simulate remote players wandering around (disabled for real multiplayer)
let _simTimer = 0;
function _simulateRemotePlayers(dt) {
  // Only simulate if NOT connected to a real server
  if (network.connected && network.roomName) return;
  _simTimer += dt;
  if (_simTimer < 1) return;
  _simTimer = 0;
  for (const [name, rp] of mpRenderer.remotePlayers) {
    rp.targetX += (Math.random() - 0.5) * 4;
    rp.targetZ += (Math.random() - 0.5) * 4;
    rp.targetYaw = Math.atan2(rp.targetX - rp.x, rp.targetZ - rp.z);
    const gx = Math.floor(rp.targetX);
    const gz = Math.floor(rp.targetZ);
    rp.targetY = world.heightAt(gx, gz) + 1;
  }
}

function createServer(name, maxPlayers, mode, seed, isPrivate) {
  // Save locally for role tracking
  let server = Server.load(name);
  if (!server) {
    server = new Server(name, maxPlayers, mode, playerName);
    if (seed) server.seed = seed;
    server.isPrivate = !!isPrivate;
    server.save();
  }
  trackServerCreated();
  // Connect and create on network
  if (!network.connected) {
    network.connect(MP_SERVER_URL);
    network.onConnected = () => _doNetworkJoin(name, seed);
  } else {
    _doNetworkJoin(name, seed);
  }
}

function showServerAdmin() {
  if (!currentServer) return;
  document.getElementById('admin-server-name').textContent = currentServer.name;
  renderAdminPanel('players');
  ui.showMenu('server-admin');
}

function renderAdminPanel(tab) {
  const el = document.getElementById('admin-panel-content');
  if (!el || !currentServer) return;

  // Update tab button styles
  ['tab-players', 'tab-staff', 'tab-bans'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.classList.toggle('selected', id === 'tab-' + tab);
  });

  if (tab === 'players') {
    el.innerHTML = currentServer.players.map(p => {
      const roleLabel = p.role === ROLE_OWNER ? 'OWNER' : p.role === ROLE_ADMIN ? 'ADMIN' : p.role === ROLE_STAFF ? 'STAFF' : p.role === ROLE_DEV ? 'DEV' : '';
      return `<div style="display:flex;align-items:center;gap:8px;padding:6px;border-bottom:1px solid rgba(80,80,80,0.3);">
        <div style="flex:1;">${escHtml(p.name)} <span style="color:${p.role === ROLE_OWNER ? '#fa0' : p.role === ROLE_ADMIN ? '#f55' : p.role === ROLE_STAFF ? '#5af' : p.role === ROLE_DEV ? '#0ff' : '#888'};font-size:10px;">${roleLabel}</span></div>
      </div>`;
    }).join('') || '<div style="color:#888;text-align:center;padding:10px;">No players online</div>';
  } else if (tab === 'staff') {
    const staff = currentServer.players.filter(p => p.role === ROLE_OWNER || p.role === ROLE_ADMIN || p.role === ROLE_STAFF);
    el.innerHTML = staff.map(p =>
      `<div style="display:flex;align-items:center;gap:8px;padding:6px;border-bottom:1px solid rgba(80,80,80,0.3);">
        <span>${escHtml(p.name)}</span>
        <span style="color:${p.role === ROLE_OWNER ? '#fa0' : p.role === ROLE_ADMIN ? '#f55' : '#5af'};font-size:10px;">${p.role.toUpperCase()}</span>
      </div>`
    ).join('') || '<div style="color:#888;text-align:center;padding:10px;">No staff members</div>';
  } else if (tab === 'bans') {
    el.innerHTML = currentServer.banned.map(b =>
      `<div style="display:flex;align-items:center;gap:8px;padding:6px;border-bottom:1px solid rgba(80,80,80,0.3);">
        <span style="flex:1;">${escHtml(b.name)}</span>
        <span style="color:#888;font-size:10px;">by ${escHtml(b.bannedBy)}</span>
        <span style="color:#f55;font-size:10px;">${escHtml(b.reason)}</span>
      </div>`
    ).join('') || '<div style="color:#888;text-align:center;padding:10px;">No banned players</div>';
  }
}

// Expose for inline onclick handlers
window._joinServer = (name) => {
  const mpInput = document.getElementById('input-mp-username');
  if (mpInput) {
    const v = filterProfanity((mpInput.value || '').trim()) || 'Player';
    playerName = v;
    try { localStorage.setItem('bf_player_name', v); } catch (_) {}
  }
  joinServer(name);
};

window._deleteServer = (name) => {
  // OfficialSMP is a permanent server and can never be deleted.
  if (name === 'OfficialSMP') return;
  // Tell server to delete the room (owner only — server enforces this)
  if (network.connected) {
    network._send({ type: 'delete_room', room: name });
  }
  // Remove from localStorage
  try { localStorage.removeItem('bf_server_' + name); } catch (_) {}
  // Remove from recent servers
  const recent = getRecentServers().filter(s => s !== name);
  try { localStorage.setItem('bf_recent_servers', JSON.stringify(recent)); } catch (_) {}
  if (network.roomName === name) {
    network.leaveRoom();
    try { window.CrazyGames?.SDK?.game?.setRoom?.(null); } catch (_) {}
  }
  renderServerList(undefined, _remoteRoomCache);
  renderRecentServers();
};

// ── Tutorial / first-time intro ─────────────────────────────────────────

function showTutorial() {
  const overlay = document.getElementById('tutorial-overlay');
  if (overlay) overlay.style.display = 'flex';
  document.exitPointerLock();
}

function closeTutorial() {
  const cb = document.getElementById('tutorial-dont-show');
  if (cb && cb.checked) markTutorialSeen();
  else markTutorialSeen(); // always mark seen so it doesn't re-show
  const overlay = document.getElementById('tutorial-overlay');
  if (overlay) overlay.style.display = 'none';
  if (gameRunning) lockPointer();
}

// --- sky ---
let dayTime = 0.3;
let totalDays = 1;

// --- weather system ---
let weather = 'clear'; // 'clear' | 'rain' | 'thunder'
let weatherTimer = 0;
let weatherDuration = 300; // starts clear for a while (overridden properly in startGame)
const WEATHER_MIN_CLEAR = 120;  // min seconds of clear sky
const WEATHER_MAX_CLEAR = 600;
const WEATHER_MIN_RAIN = 30;
const WEATHER_MAX_RAIN = 120;
let thunderFlash = 0;
let rainDrops = null;
let RAIN_COUNT = 2000;
let rainPositions = null;
let rainVelocities = null;

function initRain() {
  RAIN_COUNT = graphicsQuality === 'low' ? 500 : graphicsQuality === 'high' ? 3000 : 2000;
  const geo = new THREE.BufferGeometry();
  rainPositions = new Float32Array(RAIN_COUNT * 3);
  rainVelocities = new Float32Array(RAIN_COUNT);
  for (let i = 0; i < RAIN_COUNT; i++) {
    rainPositions[i * 3] = (Math.random() - 0.5) * 80;
    rainPositions[i * 3 + 1] = Math.random() * 40;
    rainPositions[i * 3 + 2] = (Math.random() - 0.5) * 80;
    rainVelocities[i] = 15 + Math.random() * 10;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(rainPositions, 3));
  const mat = new THREE.PointsMaterial({
    color: 0x99bbdd,
    size: 0.15,
    transparent: true,
    opacity: 0.5,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  rainDrops = new THREE.Points(geo, mat);
  rainDrops.visible = false;
  scene.add(rainDrops);
}

function updateWeather(dt) {
  weatherTimer += dt;
  if (weatherTimer >= weatherDuration) {
    weatherTimer = 0;
    const wasRaining = weather === 'rain' || weather === 'thunder';
    if (weather === 'clear') {
      weather = Math.random() < 0.6 ? 'rain' : 'thunder';
      weatherDuration = WEATHER_MIN_RAIN + Math.random() * (WEATHER_MAX_RAIN - WEATHER_MIN_RAIN);
    } else {
      weather = 'clear';
      weatherDuration = WEATHER_MIN_CLEAR + Math.random() * (WEATHER_MAX_CLEAR - WEATHER_MIN_CLEAR);
    }
    const isRaining = weather === 'rain' || weather === 'thunder';
    if (isRaining && !wasRaining) {
      try { audio.startRain(); } catch (_) {}
    } else if (!isRaining && wasRaining) {
      try { audio.stopRain(); } catch (_) {}
    }
  }
  // Rain particles
  const isRaining = weather === 'rain' || weather === 'thunder';
  if (rainDrops) {
    rainDrops.visible = isRaining;
    if (isRaining && player) {
      const pos = rainDrops.geometry.attributes.position.array;
      const px = player.position.x, pz = player.position.z;
      for (let i = 0; i < RAIN_COUNT; i++) {
        pos[i * 3 + 1] -= rainVelocities[i] * dt;
        if (pos[i * 3 + 1] < -2) {
          pos[i * 3] = px + (Math.random() - 0.5) * 80;
          pos[i * 3 + 1] = 30 + Math.random() * 10;
          pos[i * 3 + 2] = pz + (Math.random() - 0.5) * 80;
        }
      }
      rainDrops.geometry.attributes.position.needsUpdate = true;
    }
  }
  // Thunder flash
  if (weather === 'thunder') {
    if (Math.random() < dt * 0.3) {
      thunderFlash = 0.3 + Math.random() * 0.2;
      try { audio.thunder(); } catch (_) {}
    }
  }
  if (thunderFlash > 0) {
    thunderFlash -= dt * 2;
    if (thunderFlash <= 0) thunderFlash = 0;
  }
}

// --- coordinates HUD ---
let coordsHudVisible = true;
let coordsHudTimer = 0;

function updateCoordsHud(dt) {
  coordsHudTimer += dt;
  if (coordsHudTimer < 0.1) return;
  coordsHudTimer = 0;
  const el = document.getElementById('coords-hud');
  if (!el || !player) return;
  if (!coordsHudVisible) { el.style.display = 'none'; return; }
  el.style.display = '';
  const x = player.position.x.toFixed(1);
  const y = player.position.y.toFixed(1);
  const z = player.position.z.toFixed(1);
  const facing = facingName(player.yaw);
  const biome = world.biomeAt(
    Math.floor(player.position.x),
    Math.floor(player.position.z),
    Math.floor(player.position.y)
  );
  el.innerHTML = `XYZ: <span class="ch-val">${x}</span> / <span class="ch-val">${y}</span> / <span class="ch-val">${z}</span><br>` +
    `Block: <span class="ch-val">${Math.floor(player.position.x)} ${Math.floor(player.position.y)} ${Math.floor(player.position.z)}</span><br>` +
    `Facing: <span class="ch-val">${facing}</span> &middot; <span class="ch-val">${biome}</span>`;
}

// --- time of day HUD ---
function updateTimeHud() {
  const el = document.getElementById('time-hud');
  if (!el || !player) return;
  // dayTime 0..1: 0=noon start, 0.625=midnight, 0.875=sunrise
  // Map to a 24h clock: dayTime 0 -> 12:00, 0.5 -> 00:00
  const totalMins = dayTime * 24 * 60;
  const hrs = Math.floor(totalMins / 60) % 24;
  const mins = Math.floor(totalMins % 60);
  const timeStr = `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  const isDay = dayTime < 0.625;
  const icon = isDay ? '☀' : '☾';
  const color = isDay ? '#ffe080' : '#a0c0ff';
  el.innerHTML = `<span style="color:${color}">${icon}</span> Day ${totalDays} &middot; ${timeStr}`;
}
function lerpColor(a, b, t) {
  t = Math.max(0, Math.min(1, t));
  const ca = new THREE.Color(a);
  const cb = new THREE.Color(b);
  ca.lerp(cb, t);
  return ca;
}

function updateSky(dt) {
  const prevDayTime = dayTime;
  dayTime = (dayTime + dt / DAY_LENGTH) % 1;
  if (dayTime < prevDayTime) totalDays++;

  // Define time windows (in dayTime units):
  // dayTime 0.0 = midnight, 0.25 = sunrise, 0.5 = noon, 0.75 = sunset
  // But with DAY_FRAC = 10/16 = 0.625 being the "day" portion,
  // the cycle is: 0.0 = noon start, 0.625 = midnight start
  // Let's work with the angle directly:
  let angle;
  if (dayTime < DAY_FRAC) {
    angle = (dayTime / DAY_FRAC) * Math.PI; // 0→π during day
  } else {
    angle = Math.PI + ((dayTime - DAY_FRAC) / (1 - DAY_FRAC)) * Math.PI; // π→2π during night
  }

  // angle: 0 = sunrise/horizon, π/2 = noon, π = sunset/horizon, 3π/2 = midnight
  const sinA = Math.sin(angle); // -1 to 1, positive during day
  const cosA = Math.cos(angle);

  // Sky color: piecewise based on sun position
  const NIGHT_COLOR = 0x0a0a2e;
  const DAWN_COLOR = 0xff7744;
  const DAY_COLOR = 0x87ceeb;
  const DUSK_COLOR = 0xff5533;

  let skyColor;
  if (sinA > 0.15) {
    // High daytime
    skyColor = lerpColor(DAWN_COLOR, DAY_COLOR, Math.min(1, (sinA - 0.15) / 0.3));
  } else if (sinA > 0) {
    // Sunrise/sunset transition zone
    const t = sinA / 0.15;
    const isRising = cosA > 0; // angle < π/2 means sunrise, angle > π/2 means sunset
    if (isRising) {
      skyColor = lerpColor(NIGHT_COLOR, DAWN_COLOR, t);
    } else {
      skyColor = lerpColor(DAWN_COLOR, NIGHT_COLOR, 1 - t);
    }
  } else if (sinA > -0.15) {
    // Twilight zone near horizon
    const t = (sinA + 0.15) / 0.15;
    const isDusk = cosA > 0; // angle just past π = sunset side
    if (isDusk) {
      skyColor = lerpColor(NIGHT_COLOR, DUSK_COLOR, t);
    } else {
      skyColor = lerpColor(NIGHT_COLOR, DUSK_COLOR, t);
    }
  } else {
    // Deep night
    skyColor = new THREE.Color(NIGHT_COLOR);
  }

  scene.background.copy(skyColor);
  scene.fog.color.copy(skyColor);

  // Scale lights by time of day — bright at noon, dim at night
  const dayBrightness = Math.max(0, sinA); // 0 at night, 1 at noon
  const sunIntensity = 0.15 + dayBrightness * 1.2;   // night: 0.15, day: 1.35
  const ambIntensity = 0.15 + dayBrightness * 0.5;    // night: 0.15, day: 0.65
  const hemiIntensity = 0.1 + dayBrightness * 0.45;   // night: 0.1, day: 0.55

  // Sun color shifts warm at dawn/dusk, white at noon
  const warmth = sinA < 0.5 ? Math.max(0, sinA) * 2 : Math.max(0, (1 - sinA) * 2);
  const sunR = 1.0;
  const sunG = 0.85 + warmth * 0.15;
  const sunB = 0.7 + warmth * 0.3;
  sun.color.setRGB(sunR * sunIntensity, sunG * sunIntensity, sunB * sunIntensity);
  ambient.intensity = ambIntensity;
  hemi.intensity = hemiIntensity;

  // Weather: darken sky during rain/thunder
  if (weather === 'rain' || weather === 'thunder') {
    const darkening = weather === 'thunder' ? 0.55 : 0.7;
    scene.background.multiplyScalar(darkening);
    scene.fog.color.multiplyScalar(darkening);
  }
  // Thunder flash overlay
  if (thunderFlash > 0) {
    scene.background.lerp(new THREE.Color(0xffffff), thunderFlash * 0.6);
  }

  // Stars: visible only at night, fade in/out with twilight.
  // Rendered as a 3D star field in the sky (follows the camera like a skybox).
  if (starField) {
    const nightAlpha = sinA < 0 ? Math.min(1, (-sinA) / 0.3) : 0;
    starField.material.opacity = nightAlpha;
    if (player) starField.position.copy(player.position);
    else if (camera) starField.position.copy(camera.position);
  }

  sun.position.set(Math.cos(angle) * 500, Math.sin(angle) * 500, 0);
  sun.intensity = Math.max(0.1, sinA * 0.5 + 0.5) * 1.5;
  ambient.intensity = 0.3 + Math.max(0, sinA) * 0.5;
  sunMesh.position.copy(sun.position);
  moonMesh.position.set(-sun.position.x, -sun.position.y, -sun.position.z);
}

// =========================================================
// GAME START / STOP
// =========================================================
let currentWorldId = null;

const LOADING_TIPS = [
  'Use TAB to open your inventory and craft tools.',
  'Hold left-click to mine blocks continuously.',
  'Press F5 to toggle third-person view.',
  'Press F7 to switch between Creative and Survival.',
  'Right-click to place blocks or eat food.',
  'Press E near a crafting table or furnace to use it.',
  'Use the scroll wheel or 1-9 keys to switch hotbar slots.',
  'Caves can be found underground — explore carefully!',
  'Smelt raw food in a furnace to restore more hunger.',
  'Fall damage starts after 3 blocks of falling.',
  'Sprinting and jumping drain hunger faster.',
  'Cows drop leather and beef when killed.',
  'Place a bed to set your respawn point.',
  'Sleep in a bed at night to skip to morning.',
  'Use the creative inventory to find any block.',
  'Double-tap Space to toggle flying in Creative.',
  'Shift + Space to sprint in Survival.',
  'Sheep drop wool and mutton.',
  'Ores are found deeper underground.',
  'Caves contain valuable resources.',
  'Watch your hunger bar in Survival mode.',
  'Gold tools mine faster but wear out quicker.',
  'Build a shelter before the first night falls.',
  'Explore different biomes for unique resources.',
  'Crafting tables unlock advanced recipes.',
  'Furnaces can smelt ores into ingots.',
  'String can be used to craft bows and fishing rods.',
  'Keep an eye on your armor durability.',
  'Torches prevent mobs from spawning nearby.',
  'Water flows faster than you can swim.',
  'Diamonds are found deep underground near lava level.',
];

function startGame(worldId, seed, gamemode, difficulty) {
  // Tear down previous game
  if (gameRunning) {
    if (player) saveCurrentWorld();
    manager?.clear?.();
    if (mobManager) { mobManager.clear(); mobManager = null; }
    if (playerModel) { playerModel.dispose(); playerModel = null; }
    if (rainDrops) { scene.remove(rainDrops); rainDrops = null; }
    if (droppedItemManager) { droppedItemManager.clear(); droppedItemManager = null; }
    if (mpRenderer) { mpRenderer.clear(); mpRenderer = null; }
    if (breakParticles) { breakParticles.clear(); breakParticles = null; }
    if (ambientParticles) { ambientParticles.clear(); ambientParticles = null; }
    if (cloudSystem) { cloudSystem.clear(); cloudSystem = null; }
    weather = 'clear';
    weatherTimer = 0;
    weatherDuration = WEATHER_MIN_CLEAR + Math.random() * (WEATHER_MAX_CLEAR - WEATHER_MIN_CLEAR);
    try { audio.stopRain(); } catch (_) {}
  }

  currentWorldId = worldId;
  renderDist = parseInt(document.getElementById('set-render-distance')?.value) || 7;
  graphicsQuality = document.getElementById('set-quality')?.value || 'medium';
  // Mobile: hard-cap view distance so the GPU/CPU isn't meshing far chunks.
  if (IS_MOBILE) renderDist = Math.min(renderDist, 4);
  applyGraphicsQuality();
  gameDifficulty = difficulty || 'normal';

  world = new World(seed);
  const saved = loadWorld(worldId);
  if (saved) world.loadEdits(saved);
  manager = new ChunkMeshManager(scene, world, atlasTexture);
  loader = new ChunkLoader(world, manager, renderDist);
  mobManager = new MobManager(scene, world, audio);
  droppedItemManager = new DroppedItemManager(scene, atlasCanvas);
  mpRenderer = new MultiplayerRenderer(scene);
  breakParticles = new BreakParticles(scene);
  ambientParticles = new AmbientParticles(scene);
  cloudSystem = new CloudSystem(scene);
  initRain();
  playerModel = new PlayerModel(scene, getSelectedSkin());

  scene.fog.far = 16 * (renderDist + 2);
  scene.fog.near = 16 * 5;

  player = new Player(camera, world, world.seed);
  if (player) {
    player.autoJump = (document.getElementById('set-autojump')?.value || '1') !== '0';
    player.difficulty = gameDifficulty;
  }

  // Initialize mobile touch controls if on a touch device
  mobile = initMobileControls(player, input, {
    onAttack() {
      // Attack button (⚔) = left click: start breaking / attack
      if (!gameRunning) return;
      audio.resume();
      breakingTarget = null;
      breakingElapsed = 0;
      const hit = currentTarget();
      if (hit) viewmodel.swing();
    },
    onPlace() {
      // Place button (✋) = right click: place block / interact
      if (!gameRunning) return;
      audio.resume();
      const hit = currentTarget();
      if (hit && hit.block === BLOCK.CRAFTING) {
        ui.openInventory(player.inventory, 3, false);
        achievements.incrementStat('inventoryOpened');
      } else if (hit && hit.block === BLOCK.FURNACE) {
        ui.openFurnace(player.inventory);
      } else if (hit && hit.block === BLOCK.CHEST) {
        const slots = world.getOrCreateChest(hit.x, hit.y, hit.z);
        ui.openChest(slots, player.inventory, hit.x, hit.y, hit.z);
      } else if (hit && hit.block === BLOCK.BED) {
        trySleep();
      } else {
        let used = false;
        const slot = player.inventory.getSelected();
        if (player.isSurvival() && slot && isFood(slot.item)) {
          if (player.eat(foodValue(slot.item))) {
            slot.count--;
            if (slot.count <= 0) player.inventory.slots[player.inventory.selected] = null;
            syncUIMode();
            achievements.incrementStat('foodEaten');
            try { audio.eatBite(); } catch (_) {}
            used = true;
          }
        } else if (slot && isBlockItem(slot.item)) {
          placeBlock();
          used = true;
        }
        if (!used && player.inventory.offhand) {
          const oh = player.inventory.offhand;
          if (player.isSurvival() && isFood(oh.item)) {
            if (player.eat(foodValue(oh.item))) {
              oh.count--;
              if (oh.count <= 0) player.inventory.offhand = null;
              syncUIMode();
              achievements.incrementStat('foodEaten');
              try { audio.eatBite(); } catch (_) {}
            }
          } else if (isBlockItem(oh.item)) {
            placeBlock(oh);
          }
        }
      }
    },
    onTapTarget() {
      // Returns true if the tap hit a mob (so it's an attack, not a place).
      if (!gameRunning || !mobManager || !player) return false;
      const dir = new THREE.Vector3();
      camera.getWorldDirection(dir);
      const mobHit = mobManager.hitTest(camera.position, dir, REACH);
      if (!mobHit) return false;
      const atkSlot = player.inventory.getSelected();
      const atkTool = atkSlot && isTool(atkSlot.item) ? toolInfo(atkSlot.item) : null;
      const attackDamage = atkTool ? atkTool.swordDmg || 1 : 1;
      mobHit.takeDamage(attackDamage, camera.position);
      audio.hit();
      viewmodel.swing();
      mobManager.playHurtSound(mobHit.type);
      if (mobHit.type === 'spider' || mobHit.type === 'zombie' || mobHit.type === 'skeleton') mobHit.aggro = true;
      if (mobHit.dead) {
        if (player.isSurvival()) { for (const drop of mobHit.getDrops()) { player.inventory.add(drop.item, drop.count); syncUIMode(); } }
        scene.remove(mobHit.mesh); mobHit.dispose();
        const idx = mobManager.mobs.indexOf(mobHit); if (idx >= 0) mobManager.mobs.splice(idx, 1);
      }
      return true;
    },
    onPause() {
      if (!gameRunning) return;
      if (ui.isOverlayShown() || ui.inventoryOpen || ui.furnaceOpen) return;
      ui.showMenu('pause');
      cgGameplayStop();
    },
    onChat() {
      if (!gameRunning || chatDisabled) return;
      openChat('');
    },
    onInventory() {
      if (!gameRunning) return;
      if (ui.inventoryOpen) { ui.closeInventory(); syncUIMode(); }
      else { ui.openInventory(player.inventory, 2, player.isCreative()); achievements.incrementStat('inventoryOpened'); }
    },
  });
  if (saved?.player) {
    player.setGamemode(saved.player.gamemode || gamemode);
    player.health = saved.player.health ?? player.maxHealth;
    player.hunger = saved.player.hunger ?? player.maxHunger;
    player.saturation = saved.player.saturation ?? 2;
    if (saved.player.spawnPoint) player.spawnPoint.set(...saved.player.spawnPoint);
    if (saved.player.bedSpawnPoint) bedSpawnPoint = saved.player.bedSpawnPoint;
    if (saved.player.inventory) player.inventory.load(saved.player.inventory);
    if (typeof saved.player.level === 'number') {
      player.level = saved.player.level;
      player.xp = saved.player.xp || 0;
      player.xpToNextLevel = Player.xpForLevel(player.level);
    }
    if (typeof saved.player.totalDays === 'number') totalDays = saved.player.totalDays;
    if (saved.player.position) {
      player.position.set(...saved.player.position);
      player.velocity.set(0, 0, 0);
    } else {
      player.spawn();
    }
  } else {
    player.setGamemode(gamemode);
    player.spawn();
  }

  // Show loading screen
  ui.showLoading();
  cgLoadingStart();

  // Rotate tips during loading
  const tipEl = document.getElementById('loading-tip');
  let _loadingTipIdx = Math.floor(Math.random() * LOADING_TIPS.length);
  const _tipInterval = setInterval(() => {
    _loadingTipIdx = (_loadingTipIdx + 1) % LOADING_TIPS.length;
    if (tipEl) tipEl.innerHTML = '<span>' + LOADING_TIPS[_loadingTipIdx].split(' ')[0] + '</span> ' + LOADING_TIPS[_loadingTipIdx].split(' ').slice(1).join(' ');
  }, 3000);

  ui.updateLoading(0, 'Preparing terrain...');
  ui.hideOverlay();

  // Async prime with loading screen updates
  const pcx = Math.floor(player.position.x / CHUNK_SIZE);
  const pcz = Math.floor(player.position.z / CHUNK_SIZE);
  loader.primeAsync(pcx, pcz, (done, total) => {
    const pct = total > 0 ? (done / total) * 100 : 100;
    const stepText = pct < 25 ? 'Generating terrain...' :
                     pct < 50 ? 'Building landscape...' :
                     pct < 75 ? 'Planting trees...' : 'Almost ready...';
    ui.updateLoading(pct, stepText);
  }).then(() => {
    clearInterval(_tipInterval);
    ui.updateLoading(100, 'Done!');
    cgLoadingStop();
    syncUIMode();
    gameRunning = true;
    dayTime = 0.3;
    stepTimer = 0;
    _prevPlayerPos.copy(player.position);
    setTimeout(() => {
      ui.hideLoading();
      lockPointer();
      cgGameplayStart();
      try { audio.init(); audio.resume(); audio.startMusic(); } catch (_) {}
      // Show tutorial on first play
      if (!hasTutorialBeenSeen()) {
        setTimeout(() => showTutorial(), 500);
      }
    }, 400);
  });
}

function saveCurrentWorld() {
  if (!currentWorldId || !world || !player) return;
  saveWorld(currentWorldId, {
    ...world.serializeEdits(),
    player: {
      gamemode: player.gamemode,
      health: player.health,
      hunger: player.hunger,
      saturation: player.saturation,
      position: [player.position.x, player.position.y, player.position.z],
      spawnPoint: [player.spawnPoint.x, player.spawnPoint.y, player.spawnPoint.z],
      inventory: player.inventory.serialize(),
      bedSpawnPoint: bedSpawnPoint,
      xp: player.xp,
      level: player.level,
      totalDays: totalDays,
    },
  });
}

// =========================================================
// MENU WIRING
// =========================================================
function renderAchievementScreen() {
  const list = document.getElementById('ach-list');
  const progressText = document.getElementById('ach-progress-text');
  const progressFill = document.getElementById('ach-progress-fill');
  if (!list) return;
  list.innerHTML = '';
  const progress = achievements.getProgress();
  if (progressText) progressText.textContent = `${progress.unlocked} / ${progress.total}`;
  if (progressFill) progressFill.style.width = `${(progress.unlocked / progress.total) * 100}%`;

  // Group by category
  const grouped = {};
  for (const cat of Object.keys(CATEGORIES)) grouped[cat] = [];
  for (const a of ACHIEVEMENTS) {
    const cat = a.category || 'tutorial';
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(a);
  }

  for (const [cat, items] of Object.entries(grouped)) {
    const catInfo = CATEGORIES[cat] || { name: cat, icon: '' };
    const section = document.createElement('div');
    section.className = 'ach-category';
    section.innerHTML = `<div class="ach-cat-title">${catInfo.icon} ${catInfo.name}</div>`;
    const grid = document.createElement('div');
    grid.className = 'ach-grid';
    for (const a of items) {
      const unlocked = achievements.isUnlocked(a.id);
      const card = document.createElement('div');
      card.className = 'ach-card' + (unlocked ? '' : ' locked');
      let iconHtml = '';
      try {
        const ic = makeIcon(a.icon, atlasCanvas);
        iconHtml = ic.toDataURL ? `<img class="ach-card-icon" src="${ic.toDataURL()}" />` : '';
      } catch (_) {}
      card.innerHTML = `${iconHtml}<div class="ach-card-info"><div class="ach-card-name">${unlocked ? a.name : '???'}</div><div class="ach-card-desc">${unlocked ? a.desc : 'Locked'}</div></div>`;
      grid.appendChild(card);
    }
    section.appendChild(grid);
    list.appendChild(section);
  }
}

// --- Recipe Book ---
function recipeCategory(recipe) {
  const out = recipe.out.id;
  const name = itemName(out).toLowerCase();
  if (name.includes('sword') || name.includes('pickaxe') || name.includes('axe') || name.includes('shovel')) return 'tools';
  if (name.includes('helmet') || name.includes('chest') || name.includes('legs') || name.includes('boots')) return 'armor';
  if (name.includes('bread') || name.includes('cooked') || name.includes('apple') || name.includes('porkchop') || name.includes('beef') || name.includes('mutton') || name.includes('chicken') || name.includes('cookie') || name.includes('melon') || name.includes('carrot') || name.includes('potato') || name.includes('pie') || name.includes('golden')) return 'food';
  if (isBlockItem(out)) return 'blocks';
  return 'misc';
}

function renderRecipeCard(recipe) {
  const card = document.createElement('div');
  card.className = 'recipe-card';
  // Draw mini grid
  const grid = document.createElement('div');
  grid.className = 'recipe-grid-mini';
  const pattern = recipe.pattern || [];
  const rows = pattern.length;
  const cols = rows > 0 ? Math.max(...pattern.map(r => r.length)) : 0;
  grid.style.gridTemplateColumns = `repeat(${cols}, 16px)`;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < (pattern[y] ? pattern[y].length : 0); x++) {
      const ch = pattern[y][x];
      const cell = document.createElement('div');
      cell.style.cssText = 'width:16px;height:16px;display:flex;align-items:center;justify-content:center;';
      if (ch && ch !== ' ' && recipe.key && recipe.key[ch] != null) {
        const iconCanvas = isBlockItem(recipe.key[ch])
          ? makeIcon(recipe.key[ch], atlasCanvas)
          : makeItemIconCanvas(recipe.key[ch]);
        if (iconCanvas) {
          iconCanvas.style.width = '16px'; iconCanvas.style.height = '16px';
          cell.appendChild(iconCanvas);
        }
      }
      grid.appendChild(cell);
    }
  }
  const info = document.createElement('div');
  info.className = 'recipe-info';
  const def = itemDef(recipe.out.id);
  info.innerHTML = `<div class="recipe-name">${def ? def.name : '?'}</div>` +
    `<div class="recipe-cat">${recipeCategory(recipe).toUpperCase()}${recipe.out.count > 1 ? ' x' + recipe.out.count : ''}</div>`;
  card.appendChild(grid);
  card.appendChild(info);
  return card;
}

function renderSmeltingCard(inputId, outputId) {
  const card = document.createElement('div');
  card.className = 'recipe-card';
  const grid = document.createElement('div');
  grid.className = 'recipe-grid-mini';
  grid.style.gridTemplateColumns = 'repeat(1, 16px)';
  const inCanvas = isBlockItem(inputId) ? makeIcon(inputId, atlasCanvas) : makeItemIconCanvas(inputId);
  if (inCanvas) { inCanvas.style.width = '16px'; inCanvas.style.height = '16px'; grid.appendChild(inCanvas); }
  const arrow = document.createElement('div');
  arrow.textContent = '↓';
  arrow.style.cssText = 'color:#fa0;font:bold 14px monospace;text-align:center;width:16px;';
  const outCanvas = isBlockItem(outputId) ? makeIcon(outputId, atlasCanvas) : makeItemIconCanvas(outputId);
  grid.appendChild(arrow);
  if (outCanvas) { outCanvas.style.width = '16px'; outCanvas.style.height = '16px'; grid.appendChild(outCanvas); }
  const info = document.createElement('div');
  info.className = 'recipe-info';
  const def = itemDef(outputId);
  info.innerHTML = `<div class="recipe-name">${def ? def.name : '?'}</div><div class="recipe-cat">SMELTING</div>`;
  card.appendChild(grid);
  card.appendChild(info);
  return card;
}

function renderRecipeBook(cat) {
  const listEl = document.getElementById('recipe-list');
  if (!listEl) return;
  listEl.innerHTML = '';
  // Crafting recipes
  for (const r of RECIPES) {
    if (r._disabled) continue;
    if (cat !== 'all' && cat !== 'smelting' && recipeCategory(r) !== cat) continue;
    if (cat === 'smelting') continue;
    listEl.appendChild(renderRecipeCard(r));
  }
  // Smelting recipes
  if (cat === 'all' || cat === 'smelting') {
    for (const [inp, out] of Object.entries(SMELTING)) {
      listEl.appendChild(renderSmeltingCard(Number(inp), out));
    }
  }
}

function renderStatsScreen() {
  const listEl = document.getElementById('stats-list');
  if (!listEl) return;
  const s = achievements.stats || {};
  const dist = Math.floor(s.distanceTraveled || 0);
  const playMins = Math.floor((s.playTime || 0) / 60);
  const rows = [
    ['Level', s.level || 0],
    ['Days Survived', totalDays],
    ['Blocks Mined', s.totalBlocksBroken || 0],
    ['Blocks Placed', s.blocksPlacedAny || 0],
    ['Mobs Defeated', s.mobKillsAny || 0],
    ['Items Crafted', s.itemsCrafted || 0],
    ['Distance Walked', dist + ' m'],
    ['Play Time', playMins + ' min'],
    ['Deaths', s.deaths || 0],
    ['Multiplayer Joins', s.multiplayerJoined || 0],
  ];
  listEl.innerHTML = rows.map(([label, val]) =>
    `<div class="stat-row"><span class="stat-label">${label}</span><span class="stat-value">${val}</span></div>`
  ).join('');
}

function initMenu() {
  // Clean up stale local server data — only OfficialSMP is a valid server,
  // so remove any other locally-saved servers (e.g. old MyWorld1) and purge
  // them from the recently-played list.
  try {
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const k = localStorage.key(i);
      if (k && k.startsWith('bf_server_') && k !== 'bf_server_OfficialSMP') {
        localStorage.removeItem(k);
      }
    }
    const rec = getRecentServers().filter(s => s === 'OfficialSMP');
    localStorage.setItem('bf_recent_servers', JSON.stringify(rec));
  } catch (_) {}

  // Migrate old save
  migrateLegacy();

  // Sync tutorial flag from SDK cloud (in case another device set it)
  syncTutorialFromSdk();

  // Track login for analytics
  trackLogin();

  // Set up real multiplayer network handlers
  setupNetworkHandlers();

  // CrazyGames: listen for room join via invite link (not just at startup)
  try {
    window.CrazyGames?.SDK?.game?.onGameRoomJoin?.((roomId) => {
      if (!roomId) return;
      addChatLine('Joining room via invite...', '#5f5');
      if (network.connected) {
        _doNetworkJoin(roomId);
      } else {
        network.connect(MP_SERVER_URL);
        network.onConnected = () => _doNetworkJoin(roomId);
      }
    });
  } catch (_) {}

  // Check if joining via CrazyGames invite link (instant multiplayer)
  setTimeout(() => {
    try {
      const isInstant = window.CrazyGames?.SDK?.lobby?.isInstantMultiplayer?.();
      if (isInstant) {
        const roomId = window.CrazyGames?.SDK?.lobby?.getRoomId?.();
        if (roomId) {
          // Skip menu — go straight into multiplayer
          addChatLine('Instant multiplayer — joining room...', '#5f5');
          ui.showMenu(null);
          if (network.connected) {
            _doNetworkJoin(roomId);
          } else {
            network.connect(MP_SERVER_URL);
            network.onConnected = () => _doNetworkJoin(roomId);
          }
          return;
        }
      }
    } catch (_) {}
  }, 1000);

  // Check if joining via standalone shareable link (?join=ROOM)
  try {
    const params = new URLSearchParams(location.search);
    const joinRoom = params.get('join');
    if (joinRoom && !window.CrazyGames?.SDK?.lobby?.isInstantMultiplayer?.()) {
      joiningViaLink = true;
      setTimeout(() => {
        addChatLine('Joining room from invite link...', '#5f5');
        ui.showMenu(null);
        if (network.connected) {
          _doNetworkJoin(joinRoom);
        } else {
          network.connect(MP_SERVER_URL);
          network.onConnected = () => _doNetworkJoin(joinRoom);
        }
      }, 1200);
    }
  } catch (_) {}

  // Load saved player name
  let hadSavedName = false;
  try {
    const saved = localStorage.getItem('bf_player_name');
    if (saved) { playerName = filterProfanity(saved); hadSavedName = true; }
  } catch (_) {}

  // Load auto-jump setting
  try {
    const aj = localStorage.getItem('bf_autojump');
    if (aj !== null) {
      const el = document.getElementById('set-autojump');
      if (el) el.value = aj;
    }
  } catch (_) {}

  // Load mouse sensitivity setting
  try {
    const sens = localStorage.getItem('bf_sensitivity');
    if (sens !== null) {
      const el = document.getElementById('set-sensitivity');
      if (el) el.value = sens;
      mouseSensitivity = Math.max(0.2, Math.min(2.0, parseInt(sens) / 100));
      window.__mouseSens = mouseSensitivity;
    }
  } catch (_) {}

  // First-time name prompt (standalone / non-CG users)
  try {
    const launchedFromCG = window.CrazyGames?.SDK?.user?.getUsername?.();
    // Name prompt only needed for CrazyGames users (login screen handles others)
    if (!hadSavedName && launchedFromCG && !joiningViaLink) {
      setTimeout(() => showNamePrompt(), 1200);
    }
  } catch (_) {}

  // Check for custom skin creation achievement
  try {
    if (localStorage.getItem('bf_custom_skin_created') === '1') {
      achievements.setStat('customSkinCreated', 1);
    }
  } catch (_) {}

  // Achievement toast callback
  achievements.onUnlock((ach) => {
    const toast = document.getElementById('achievement-toast');
    if (!toast) return;
    const nameEl = toast.querySelector('.ach-name');
    const descEl = toast.querySelector('.ach-desc');
    const iconEl = toast.querySelector('.ach-icon');
    if (nameEl) nameEl.textContent = ach.name;
    if (descEl) descEl.textContent = ach.desc;
    if (iconEl) {
      try {
        const iconCanvas = makeIcon(ach.icon, atlasCanvas);
        iconEl.width = 40; iconEl.height = 40;
        const ctx = iconEl.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(iconCanvas, 0, 0, 40, 40);
      } catch (_) {}
    }
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  });

  // Start music on first user click (browser autoplay policy)
  let musicStarted = false;
  function startMusicOnce() {
    if (musicStarted) return;
    musicStarted = true;
    try { audio.init(); audio.resume(); audio.startMusic(); } catch (_) {}
    document.removeEventListener('click', startMusicOnce);
    document.removeEventListener('pointerlockchange', startMusicOnce);
  }
  document.addEventListener('click', startMusicOnce);
  document.addEventListener('pointerlockchange', startMusicOnce);

  // --- Live settings ---
  document.getElementById('set-autojump')?.addEventListener('change', (e) => {
    if (player) player.autoJump = e.target.value !== '0';
    try { localStorage.setItem('bf_autojump', e.target.value); } catch (_) {}
  });
  document.getElementById('set-sensitivity')?.addEventListener('input', (e) => {
    mouseSensitivity = Math.max(0.2, Math.min(2.0, parseInt(e.target.value) / 100));
    window.__mouseSens = mouseSensitivity;
    try { localStorage.setItem('bf_sensitivity', e.target.value); } catch (_) {}
  });
  document.getElementById('set-quality')?.addEventListener('change', (e) => {
    graphicsQuality = e.target.value || 'medium';
    applyGraphicsQuality();
    try { localStorage.setItem('bf_quality', graphicsQuality); } catch (_) {}
  });

  // --- Main menu ---
  document.getElementById('btn-play').addEventListener('click', () => {
    ui.showMenu('worlds');
    renderWorldList();
  });

  // --- Friends menu ---
  document.getElementById('btn-friends').addEventListener('click', () => {
    ui.showMenu('friends');
    openFriendsMenu();
  });
  document.getElementById('btn-friends-back')?.addEventListener('click', () => {
    ui.showMenu('main');
  });
  document.getElementById('btn-friend-add')?.addEventListener('click', () => {
    const input = document.getElementById('input-friend-name');
    const name = (input?.value || '').trim();
    if (!name) return;
    network.friendRequest(name);
    if (input) input.value = '';
  });
  document.getElementById('input-friend-name')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') document.getElementById('btn-friend-add')?.click();
  });
  // Advancements screen (achievements + statistics tabs)
  function _showAdvTab(which) {
    document.querySelectorAll('.adv-tab').forEach(t => t.classList.toggle('active', t.dataset.adv === which));
    const achEl = document.getElementById('adv-achievements');
    const statEl = document.getElementById('adv-statistics');
    if (which === 'statistics') {
      renderStatsScreen();
      if (achEl) achEl.style.display = 'none';
      if (statEl) statEl.style.display = '';
    } else {
      renderAchievementScreen();
      if (achEl) achEl.style.display = '';
      if (statEl) statEl.style.display = 'none';
    }
  }
  document.getElementById('btn-achievements').addEventListener('click', () => {
    _showAdvTab('achievements');
    document.getElementById('achievement-screen').classList.add('open');
  });
  document.querySelectorAll('.adv-tab').forEach(tab => {
    tab.addEventListener('click', () => _showAdvTab(tab.dataset.adv));
  });
  // Recipe book — opened from inventory / crafting table only.
  document.getElementById('btn-inv-recipes')?.addEventListener('click', () => {
    renderRecipeBook('all');
    document.getElementById('recipe-screen').classList.add('open');
  });
  document.getElementById('recipe-close')?.addEventListener('click', () => {
    document.getElementById('recipe-screen').classList.remove('open');
  });
  document.querySelectorAll('.recipe-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.recipe-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderRecipeBook(tab.dataset.cat);
    });
  });
  document.getElementById('btn-settings').addEventListener('click', () => {
    ui.showMenu('settings');
    ui._prevMenu = 'main';
  });

  // --- Multiplayer menu ---
  document.getElementById('btn-multiplayer').addEventListener('click', () => {
    showMultiplayerMenu();
  });
  document.getElementById('btn-create-server').addEventListener('click', () => {
    showCreateServerMenu();
  });
  document.getElementById('btn-mp-back').addEventListener('click', () => {
    ui.showMenu('main');
  });

  // Invite link button — friends feature coming soon
  document.getElementById('btn-invite-link')?.addEventListener('click', () => {
    addChatLine('Friends option coming soon!', '#fa0');
  });

  // Multiplayer username display — set from logged-in account (read-only)
  const mpUsernameInput = document.getElementById('input-mp-username');
  if (mpUsernameInput) {
    mpUsernameInput.value = playerName;
  }

  // Server search — live filtering
  const searchInput = document.getElementById('input-server-search');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      renderServerList(searchInput.value, _remoteRoomCache);
    });
  }

  // Create server — live info panel updates
  const svNameInput = document.getElementById('input-server-name');
  const svMaxInput = document.getElementById('input-max-players');
  const svPlayerInput = document.getElementById('input-player-name');
  if (svNameInput) svNameInput.addEventListener('input', updateSvInfo);
  if (svMaxInput) svMaxInput.addEventListener('input', updateSvInfo);
  if (svPlayerInput) svPlayerInput.addEventListener('input', updateSvInfo);

  document.getElementById('btn-create-server-go').addEventListener('click', () => {
    const name = (document.getElementById('input-server-name').value || '').trim();
    const maxP = parseInt(document.getElementById('input-max-players').value) || 10;
    const mode = document.getElementById('sv-mode-creative').classList.contains('selected') ? 'creative' : 'survival';
    const pname = (document.getElementById('input-player-name').value || '').trim() || 'Player';
    const seedInput = (document.getElementById('input-server-seed')?.value || '').trim();
    const isPrivate = document.getElementById('sv-priv-private')?.classList.contains('selected');
    playerName = pname;
    try { localStorage.setItem('bf_player_name', pname); } catch (_) {}
    if (!name) return;
    createServer(name, maxP, mode, seedInput || undefined, isPrivate);
  });
  document.getElementById('btn-create-server-back').addEventListener('click', () => {
    showMultiplayerMenu();
  });
  document.getElementById('sv-mode-survival').addEventListener('click', () => {
    document.getElementById('sv-mode-survival').classList.add('selected');
    document.getElementById('sv-mode-creative').classList.remove('selected');
    updateSvInfo();
  });
  document.getElementById('sv-mode-creative').addEventListener('click', () => {
    document.getElementById('sv-mode-creative').classList.add('selected');
    document.getElementById('sv-mode-survival').classList.remove('selected');
    updateSvInfo();
  });
  document.getElementById('sv-priv-public')?.addEventListener('click', () => {
    document.getElementById('sv-priv-public').classList.add('selected');
    document.getElementById('sv-priv-private').classList.remove('selected');
  });
  document.getElementById('sv-priv-private')?.addEventListener('click', () => {
    document.getElementById('sv-priv-private').classList.add('selected');
    document.getElementById('sv-priv-public').classList.remove('selected');
  });
  document.getElementById('tab-players').addEventListener('click', () => renderAdminPanel('players'));
  document.getElementById('tab-staff').addEventListener('click', () => renderAdminPanel('staff'));
  document.getElementById('tab-bans').addEventListener('click', () => renderAdminPanel('bans'));
  document.getElementById('btn-admin-back').addEventListener('click', () => {
    showMultiplayerMenu();
  });

  // --- Credits ---
  document.getElementById('btn-credits').addEventListener('click', () => {
    ui.showMenu('credits');
    ui._prevMenu = 'main';
  });
  document.getElementById('btn-credits-back').addEventListener('click', () => {
    ui.showMenu('main');
  });

  // --- Feedback ---
  function renderFeedbackList() {
    const list = document.getElementById('feedback-list');
    const entries = JSON.parse(localStorage.getItem('bf_feedback') || '[]');
    list.innerHTML = '';
    if (entries.length === 0) {
      list.innerHTML = '<div style="font:11px monospace;color:#666;text-align:center;padding:8px;">No submissions yet</div>';
      return;
    }
    entries.slice().reverse().forEach(e => {
      const div = document.createElement('div');
      div.style.cssText = 'background:#0a1a2a;border:1px solid #345;border-radius:4px;padding:6px 8px;';
      const icon = e.type === 'bug' ? '\u{1F41B}' : '\u{1F4A1}';
      const label = e.type === 'bug' ? 'Bug' : 'Feature';
      const color = e.type === 'bug' ? '#e88' : '#8cf';
      div.innerHTML = `<div style="font:10px monospace;color:${color};margin-bottom:2px;">${icon} ${label} &mdash; ${e.date}</div><div style="font:11px monospace;color:#bbb;word-break:break-word;">${e.text.replace(/</g,'&lt;')}</div>`;
      list.appendChild(div);
    });
  }
  document.getElementById('btn-feedback').addEventListener('click', () => {
    ui.showMenu('feedback');
    renderFeedbackList();
  });
  document.getElementById('btn-feedback-back').addEventListener('click', () => {
    ui.showMenu('main');
  });
  document.getElementById('btn-feedback-submit').addEventListener('click', () => {
    const text = document.getElementById('feedback-text').value.trim();
    const type = document.getElementById('feedback-type').value;
    const status = document.getElementById('feedback-status');
    if (!text) { status.textContent = 'Please enter some text'; status.style.color = '#e88'; return; }
    const entries = JSON.parse(localStorage.getItem('bf_feedback') || '[]');
    const date = new Date().toLocaleDateString();
    entries.push({ type, text, date });
    localStorage.setItem('bf_feedback', JSON.stringify(entries));
    document.getElementById('feedback-text').value = '';
    status.textContent = 'Submitted! Thank you.';
    status.style.color = '#5a5';
    renderFeedbackList();
    setTimeout(() => { status.textContent = ''; }, 3000);
  });

  // --- Tutorial ---
  document.getElementById('tutorial-ok-btn').addEventListener('click', () => {
    closeTutorial();
  });

  // --- World list ---
  document.getElementById('btn-new-world').addEventListener('click', () => {
    ui.showMenu('create');
  });
  document.getElementById('btn-worlds-back').addEventListener('click', () => {
    ui.showMenu('main');
  });

  // --- Create world ---
  document.getElementById('btn-create-confirm').addEventListener('click', () => {
    const name = document.getElementById('input-world-name').value.trim() || 'My World';
    const seedStr = document.getElementById('input-seed').value.trim();
    let seed;
    if (seedStr) {
      seed = parseInt(seedStr);
      if (isNaN(seed)) {
        let h = 0;
        for (let i = 0; i < seedStr.length; i++) h = ((h << 5) - h + seedStr.charCodeAt(i)) | 0;
        seed = Math.abs(h);
      }
    } else {
      const buf = new Uint32Array(1);
      crypto.getRandomValues(buf);
      seed = buf[0];
    }
    const mode = document.querySelector('.mode-option.selected')?.dataset.mode || 'creative';
    const diff = document.querySelector('.mode-option[data-diff].selected')?.dataset.diff || 'normal';
    const w = createWorld(name, seed, mode, diff);
    startGame(w.id, w.seed, w.gamemode, w.difficulty);
  });
  document.getElementById('btn-create-back').addEventListener('click', () => {
    ui.showMenu('worlds');
    renderWorldList();
  });

  // Mode select (game mode + difficulty are independent groups)
  document.querySelectorAll('.mode-option').forEach(el => {
    el.addEventListener('click', () => {
      const group = el.dataset.mode ? 'mode' : 'diff';
      document.querySelectorAll(`.mode-option[data-${group}]`).forEach(m => m.classList.remove('selected'));
      el.classList.add('selected');
    });
  });

  // Seed preview — render a tiny top-down terrain map when user types a seed
  const seedInput = document.getElementById('input-seed');
  const previewName = document.getElementById('seed-preview-name');
  const previewSub = document.getElementById('seed-preview-sub');
  const previewCanvas = document.getElementById('seed-preview-canvas');
  let _previewNoise = null;
  if (seedInput && previewCanvas) {
    function renderTerrainPreview(seedStr) {
      const previewCtx = previewCanvas.getContext('2d');
      previewCtx.imageSmoothingEnabled = false;
      const pw = 240, ph = 160;
      let seedVal = parseInt(seedStr);
      if (!seedStr || isNaN(seedVal)) {
        let h = 0;
        const s = seedStr || 'default';
        for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
        seedVal = Math.abs(h) || 42;
      }
      const noise = new Noise(String(seedVal));
      const SEA_LV = 32;
      for (let px = 0; px < pw; px++) {
        for (let py = 0; py < ph; py++) {
          const wx = px * 4, wz = py * 4;
          const cont = noise.fbm2(noise.continentalness, wx * 0.003, wz * 0.003, 4, 2, 0.5);
          const detail = noise.fbm2(noise.detail, wx * 0.02, wz * 0.02, 3, 2, 0.5);
          const t = noise.fbm2(noise.temp, wx * 0.002 + 200, wz * 0.002 + 200, 3, 2, 0.5);
          const hu = noise.fbm2(noise.humid, wx * 0.002 + 300, wz * 0.002 + 300, 3, 2, 0.5);
          let h;
          if (cont < -0.1) h = SEA_LV - 6 + cont * 12 + detail * 3;
          else if (cont < 0.15) h = SEA_LV + (cont + 0.1) * 10 + detail * 4;
          else h = SEA_LV + 2 + (cont - 0.15) * 14 + detail * 5;
          let col;
          if (h < SEA_LV) {
            const depth = Math.min(1, (SEA_LV - h) / 8);
            const r = Math.floor(0x22 + (0x3f - 0x22) * depth);
            const g = Math.floor(0x6a - depth * 30);
            const b = Math.floor(0xb5 - depth * 20);
            col = `rgb(${r},${g},${b})`;
          } else if (t < -0.3) {
            col = '#e8f0e8';
            if (h > SEA_LV + 3) col = '#d0d8d0';
          } else if (t < 0.1) {
            col = hu > 0.1 ? '#2a6a2a' : '#3a7a2a';
          } else if (t < 0.4) {
            col = hu > 0.2 ? '#4a8a3a' : '#5a9a3a';
          } else if (t < 0.6) {
            col = hu > 0.15 ? '#6aaa3a' : '#8aaa40';
          } else {
            col = hu < -0.1 ? '#c4b080' : '#d4c090';
          }
          // Beach transition
          if (h >= SEA_LV && h < SEA_LV + 2 && t > -0.2) col = '#d4c890';
          // Snow caps
          if (h > SEA_LV + 8 && t < -0.2) col = '#f0f4f0';
          previewCtx.fillStyle = col;
          previewCtx.fillRect(px, py, 1, 1);
        }
      }
    }
    function updateSeedPreview() {
      const val = seedInput.value.trim();
      if (previewName) previewName.textContent = val ? 'Seed: ' + val : 'A new world awaits...';
      if (previewSub) previewSub.textContent = val ? 'Top-down terrain preview' : 'Enter a seed above to preview terrain';
      renderTerrainPreview(val);
    }
    seedInput.addEventListener('input', updateSeedPreview);
    updateSeedPreview();
  }

  // --- Settings ---
  document.getElementById('btn-settings-back').addEventListener('click', () => {
    ui.showMenu(ui._prevMenu || 'main');
  });

  // --- Controls / key bindings ---
  document.getElementById('btn-open-controls').addEventListener('click', () => {
    ui.showMenu('controls');
    renderControls();
  });
  document.getElementById('btn-controls-back').addEventListener('click', () => {
    cancelRebind();
    ui.showMenu('settings');
  });
  document.getElementById('btn-controls-reset').addEventListener('click', () => {
    cancelRebind();
    resetKeybinds();
    renderControls();
  });

  // --- Achievement screen close ---
  document.getElementById('ach-close').addEventListener('click', () => {
    document.getElementById('achievement-screen').classList.remove('open');
    ui.showMenu('main');
  });

  // --- Pause ---
  document.getElementById('btn-resume').addEventListener('click', () => {
    ui.hidePause();
    cgGameplayStart();
    lockPointer();
  });
  document.getElementById('btn-pause-settings').addEventListener('click', () => {
    ui.hidePause();
    ui.showMenu('settings');
    ui._prevMenu = 'pause';
  });
  document.getElementById('btn-quit').addEventListener('click', () => {
    ui.hidePause();
    saveCurrentWorld();
    cgGameplayStop();
    if (isMultiplayer) network.leaveRoom();
    try { window.CrazyGames?.SDK?.game?.setRoom?.(null); } catch (_) {}
    // Show midgame ad before returning to menu
    cgMidgameAd({
      adStarted() { audio.stopMusic(); },
      adFinished() { showWorldList(); },
      adError() { showWorldList(); },
    });
  });

  function showWorldList() {
    gameRunning = false;
    ui.showMenu('worlds');
    renderWorldList();
  }

  // --- Death ---
  document.getElementById('btn-respawn').addEventListener('click', () => {
    if (player) {
      player.respawn();
      ui.hideOverlay();
      lockPointer();
    }
  });
  document.getElementById('btn-death-quit').addEventListener('click', () => {
    saveCurrentWorld();
    cgGameplayStop();
    if (isMultiplayer) network.leaveRoom();
    try { window.CrazyGames?.SDK?.game?.setRoom?.(null); } catch (_) {}
    cgMidgameAd({
      adStarted() { audio.stopMusic(); },
      adFinished() { deathQuitToMenu(); },
      adError() { deathQuitToMenu(); },
    });
  });

  function deathQuitToMenu() {
    gameRunning = false;
    ui.showMenu('worlds');
    renderWorldList();
  }

  // --- Dev Panel (GameDev account only — SDK account is the auth) ---
  let isGameDevAccount = false;
  try {
    const cgUser = window.CrazyGames?.SDK?.user?.getUsername?.();
    if (cgUser && resolveCgUsername(cgUser)) isGameDevAccount = true;
  } catch {}
  const devBtn = document.getElementById('btn-dev-panel');
  if (devBtn && isGameDevAccount) {
    devBtn.style.display = '';
    devBtn.addEventListener('click', () => {
      // Populate stats
      document.getElementById('dev-dau').textContent = getTodayUsers();
      document.getElementById('dev-mau').textContent = getThisMonthUsers();
      document.getElementById('dev-servers').textContent = getTotalServersCreated();
      document.getElementById('dev-current-tag').textContent = getDevTag();
      document.getElementById('dev-tag-input').value = '';
      renderDevDailyChart();
      ui.showMenu('dev-panel');
    });
  }

  // Dev tag save
  const devTagSave = document.getElementById('dev-tag-save');
  if (devTagSave) {
    devTagSave.addEventListener('click', () => {
      const input = document.getElementById('dev-tag-input');
      const val = (input?.value || '').trim();
      if (val) {
        setDevTag(val);
        document.getElementById('dev-current-tag').textContent = val;
        input.value = '';
      }
    });
  }

  // Dev panel back
  const devBackBtn = document.getElementById('dev-panel-back');
  if (devBackBtn) {
    devBackBtn.addEventListener('click', () => ui.showMenu('main'));
  }

  // --- Login screen (account required before main menu) ---
  const loginUser = document.getElementById('login-username');
  const loginPass = document.getElementById('login-password');
  const loginHint = document.getElementById('login-hint');
  const loginCreateBtn = document.getElementById('btn-login-create');
  const loginGoBtn = document.getElementById('btn-login-go');

  // Pre-fill saved username
  try {
    const savedUser = localStorage.getItem('bf_login_user');
    if (savedUser && loginUser) loginUser.value = savedUser;
  } catch (_) {}

  function setLoginDisabled(disabled) {
    if (loginCreateBtn) loginCreateBtn.disabled = disabled;
    if (loginGoBtn) loginGoBtn.disabled = disabled;
  }

  function showOfflineFallback() {
    if (!loginHint) return;
    loginHint.style.color = '#fa0';
    loginHint.textContent = "Can't reach server. ";
    const a = document.createElement('a');
    a.href = '#'; a.textContent = 'Play Offline'; a.style.color = '#5af';
    a.onclick = (e) => { e.preventDefault(); ui.showMenu('main'); };
    loginHint.appendChild(a);
    setLoginDisabled(false);
  }

  function doLogin(mode) {
    const user = (loginUser.value || '').trim().slice(0, 16);
    const pass = (loginPass.value || '');
    if (!user) { loginHint.style.color = '#f85'; loginHint.textContent = 'Please enter a username.'; loginUser.focus(); return; }
    if (pass.length < 3) { loginHint.style.color = '#f85'; loginHint.textContent = 'Password must be at least 3 characters.'; loginPass.focus(); return; }
    setLoginDisabled(true);
    loginHint.style.color = '#5a8'; loginHint.textContent = mode === 'register' ? 'Creating account...' : 'Logging in...';
    playerName = filterProfanity(user);
    if (!playerName) playerName = 'Player';
    const attempt = () => network.sendAuth(playerName, pass, mode);
    if (!network.connected) {
      network.connect(MP_SERVER_URL);
      network.onConnected = attempt;
      setTimeout(() => { if (!network.connected) showOfflineFallback(); }, 6000);
    } else {
      attempt();
    }
  }
  if (loginCreateBtn) loginCreateBtn.addEventListener('click', () => doLogin('register'));
  if (loginGoBtn) loginGoBtn.addEventListener('click', () => doLogin('login'));
  if (loginPass) loginPass.addEventListener('keydown', (e) => { if (e.key === 'Enter') doLogin('login'); });

  // Decide initial screen: skip login if launched from CrazyGames (CG handles identity)
  const launchedFromCG = !!window.CrazyGames?.SDK?.user?.getUsername?.();
  if (launchedFromCG) {
    ui.showMenu('main');
  } else {
    ui.showMenu('login');
  }

  // Platform-aware footer links
  try {
    const onCrazyGames = !!window.CrazyGames?.SDK;
    if (!onCrazyGames) {
      const terms = document.getElementById('footer-terms');
      const privacy = document.getElementById('footer-privacy');
      if (terms) { terms.href = './terms.html'; terms.textContent = 'Terms'; }
      if (privacy) { privacy.href = './privacy.html'; privacy.textContent = 'Privacy Policy'; }
    }
  } catch (_) {}
}

function showNamePrompt() {
  const promptEl = document.getElementById('name-prompt');
  const inputEl = document.getElementById('name-prompt-input');
  const confirmEl = document.getElementById('name-prompt-confirm');
  if (!promptEl || !inputEl || !confirmEl) return;
  promptEl.style.display = 'flex';
  setTimeout(() => inputEl.focus(), 50);

  const submit = () => {
    const name = (inputEl.value || '').trim().slice(0, 20);
    if (!name) { inputEl.focus(); return; }
    playerName = filterProfanity(name);
    if (!playerName) playerName = 'Player';
    try { localStorage.setItem('bf_player_name', playerName); } catch (_) {}
    const nameTag = document.getElementById('menu-player-name');
    if (nameTag) nameTag.textContent = playerName;
    promptEl.style.display = 'none';
  };

  confirmEl.onclick = submit;
  inputEl.onkeydown = (e) => { if (e.key === 'Enter') submit(); };
}

function renderDevDailyChart() {
  const container = document.getElementById('dev-daily-chart');
  if (!container) return;
  const data = getDailyUsers(7);
  const maxCount = Math.max(1, ...data.map(d => d.count));
  container.innerHTML = '';
  for (const d of data) {
    const barH = Math.max(2, (d.count / maxCount) * 56);
    const day = d.date.slice(5); // MM-DD
    const bar = document.createElement('div');
    bar.style.cssText = 'flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;';
    bar.innerHTML = `<div style="font:9px monospace;color:#5f5;margin-bottom:2px;">${d.count}</div><div style="width:100%;height:${barH}px;background:linear-gradient(180deg,#5f5,#3a3);border-radius:2px 2px 0 0;"></div><div style="font:8px monospace;color:#888;margin-top:2px;">${day}</div>`;
    container.appendChild(bar);
  }
}

function renderWorldList() {
  const list = document.getElementById('world-list');
  const worlds = getWorldList();
  list.innerHTML = '';
  if (worlds.length === 0) {
    list.innerHTML = '<div style="color:#777;font-size:12px;padding:20px;">No worlds yet. Create one!</div>';
    return;
  }
  for (const w of worlds) {
    const card = document.createElement('div');
    card.className = 'world-card';
    const date = new Date(w.createdAt).toLocaleDateString();
    card.innerHTML = `
      <div class="wc-info">
        <div class="wc-name">${w.name}</div>
        <div class="wc-meta">Seed: ${w.seed} &middot; ${date}</div>
      </div>
      <div style="display:flex;align-items:center;gap:6px;">
        <span class="wc-mode ${w.gamemode}">${w.gamemode.toUpperCase()}</span>
        <button class="wc-delete" title="Delete world">&times;</button>
      </div>
    `;
    card.querySelector('.wc-delete').addEventListener('click', (e) => {
      e.stopPropagation();
      deleteWorld(w.id);
      renderWorldList();
    });
    card.addEventListener('click', () => {
      startGame(w.id, w.seed, w.gamemode, w.difficulty);
    });
    list.appendChild(card);
  }
}

initMenu();

// --- render loop ---
let lastTime = performance.now();
function loop() {
  requestAnimationFrame(loop);
  const now = performance.now();
  const dt = Math.min((now - lastTime) / 1000, 0.1);
  lastTime = now;

  // autoClear is disabled (so the held-item overlay can draw on top of the
  // world), so clear colour+depth explicitly at the start of every frame.
  renderer.clear();

  if (!gameRunning) {
    menuBgTime += dt * 0.07;
    const r = 36;
    menuBgCamera.position.set(Math.cos(menuBgTime) * r, 26 + Math.sin(menuBgTime * 0.2) * 3, Math.sin(menuBgTime) * r);
    menuBgCamera.lookAt(0, 10, 0);
    renderer.render(menuBgScene, menuBgCamera);
    return;
  }

  // On mobile, treat as always pointer-locked for game logic
  if (mobile && mobile.isMobile) {
    pointerLocked = true;
    mobile.update();
  }

  // Continuous block breaking / mob attacking
  if (input.mouseLeftHeld && pointerLocked) {
    // Check for mob hit first
    if (mobManager && player) {
      const dir = new THREE.Vector3();
      camera.getWorldDirection(dir);
      const mobHit = mobManager.hitTest(camera.position, dir, REACH);
      if (mobHit) {
        updateBreaking(0, null);
        breakingTarget = null;
        breakingElapsed = 0;
        mobAttackTimer += dt;
        if (mobAttackTimer >= 0.4) { // attack every 0.4s
          mobAttackTimer -= 0.4;
          // Calculate damage from held weapon
          const atkSlot = player.inventory.getSelected();
          const atkTool = atkSlot && isTool(atkSlot.item) ? toolInfo(atkSlot.item) : null;
          const attackDamage = atkTool ? atkTool.swordDmg || 1 : 1;
          mobHit.takeDamage(attackDamage, camera.position);
          audio.hit();
          viewmodel.swing();
          mobManager.playHurtSound(mobHit.type);
          // Provoke hostile mobs to attack when hit
          if (mobHit.type === 'spider' || mobHit.type === 'zombie' || mobHit.type === 'skeleton') mobHit.aggro = true;
          if (mobHit.dead) {
            // Drop items
            if (player.isSurvival()) {
              for (const drop of mobHit.getDrops()) {
                player.inventory.add(drop.item, drop.count);
                syncUIMode();
              }
              // XP for killing mobs
              const mobXp = { cow: 3, pig: 3, sheep: 3, spider: 5, zombie: 5, skeleton: 5 };
              const mobXpGain = mobXp[mobHit.type] || 2;
              if (player.addXp(mobXpGain)) {
                ui.showLevelUp(player.level);
              }
            }
            scene.remove(mobHit.mesh);
            mobHit.dispose();
            // Remove from mob manager
            const idx = mobManager.mobs.indexOf(mobHit);
            if (idx >= 0) mobManager.mobs.splice(idx, 1);
            player.addExhaustion(0.1);
            // Achievement stats: mob killed
            achievements.incrementStat('mobKillsAny');
            if (atkTool && toolInfo(atkSlot.item)?.type === 'sword') {
              achievements.incrementStat('mobKillsSword');
            }
            if (mobHit.type === 'cow') {
              achievements.incrementStat('mobKillsCow');
            }
            if (mobHit.type === 'zombie') achievements.incrementStat('mobKillsZombie');
            if (mobHit.type === 'skeleton') achievements.incrementStat('mobKillsSkeleton');
            // Check distance for long-range kill
            const mobDist = camera.position.distanceTo(mobHit.position);
            if (mobDist >= 50) {
              achievements.incrementStat('mobKillsLongRange');
            }
          }
        }
      } else {
        mobAttackTimer = 0;

        // PvP: check for remote player hit
        let hitPlayer = false;
        if (isMultiplayer && mpRenderer && player) {
          const dir = new THREE.Vector3();
          camera.getWorldDirection(dir);
          const origin = camera.position;
          let closestDist = 3.5; // PvP reach (slightly shorter than block reach)
          let closestName = null;
          for (const [name, rp] of mpRenderer.remotePlayers) {
            if (!rp.model || !rp.model.group) continue;
            const rpPos = rp.model.group.position;
            // Simple sphere test: camera ray to player center
            const toPlayer = new THREE.Vector3().subVectors(rpPos, origin);
            const proj = toPlayer.dot(dir);
            if (proj < 0 || proj > closestDist) continue;
            const closest = origin.clone().add(dir.clone().multiplyScalar(proj));
            const dist = closest.distanceTo(rpPos);
            if (dist < 1.2) {
              closestDist = proj;
              closestName = name;
            }
          }
          if (closestName) {
            _playerAttackTimer = (_playerAttackTimer || 0) + dt;
            if (_playerAttackTimer >= 0.4) {
              _playerAttackTimer = 0;
              hitPlayer = true;
              const atkSlot = player.inventory.getSelected();
              const atkTool = atkSlot && isTool(atkSlot.item) ? toolInfo(atkSlot.item) : null;
              const dmg = atkTool ? (atkTool.swordDmg || 1) : 1;
              network._send({ type: 'player_damage', target: closestName, damage: dmg });
              viewmodel.swing();
            }
          } else {
            _playerAttackTimer = 0.4; // reset so next click is instant
          }
        }

        if (!hitPlayer) {
          // Normal block breaking
          const hit = currentTarget();
          if (hit) {
            const key = hit.x + ',' + hit.y + ',' + hit.z;
            if (key !== breakingTarget) {
              breakingTarget = key;
              breakingElapsed = 0;
              viewmodel.swing();
            }
            const b = world.getBlock(hit.x, hit.y, hit.z);
            // Creative: instant break with brief crack flash
            if (player.isCreative()) {
              doBreak(hit, b);
              breakingTarget = null;
              breakingElapsed = 0;
              requestAnimationFrame(() => updateBreaking(0, null));
            } else {
              const elapsed = (now - lastBreakSound) / 1000;
              if (elapsed > 0.3) {
                audio.dig(b);
                lastBreakSound = now;
              }
              breakingElapsed += dt;
              const slot = player.inventory.getSelected();
              const toolId = slot && isTool(slot.item) ? slot.item : null;
              const hardness = blockHardness(b);
              let speed = 1;
              if (toolId) speed = toolSpeedFor(toolId, b);
              const isEffective = toolId && toolInfo(toolId)?.type === blockTool(b);
              // Prismite shovel: insta-mine dirt-type blocks
              let breakTime = hardness > 0 ? (BASE_BREAK_TIME / speed) * (isEffective ? 0.5 : 2) : 0;
              if (toolId && isTool(toolId) && toolInfo(toolId)?.material === 'PRISMITE' && toolInfo(toolId)?.type === 'shovel') {
                if (b === BLOCK.DIRT || b === BLOCK.GRASS || b === BLOCK.SAND || b === BLOCK.GRAVEL ||
                    b === BLOCK.CLAY || b === BLOCK.RED_SAND || b === BLOCK.SNOW ||
                    b === BLOCK.SNOW_GRASS || b === BLOCK.SNOW_BLOCK || b === BLOCK.PODZOL || b === BLOCK.MYCELIUM) {
                  breakTime = 0;
                }
              }
              const progress = breakTime > 0 ? breakingElapsed / breakTime : 1;
              updateBreaking(Math.min(progress, 1), hit);
              if (progress >= 1) {
                doBreak(hit, b);
                breakingTarget = null;
                breakingElapsed = 0;
                updateBreaking(0, null);
                lastBreakSound = now;
              }
            }
          } else {
            updateBreaking(0, null);
          }
        }
      }
    }
  }

  // Track distance traveled for achievements
  if (player && !sleeping) {
    const prevX = _prevPlayerPos.x, prevZ = _prevPlayerPos.z;
    const dx = player.position.x - prevX, dz = player.position.z - prevZ;
    const dist = Math.sqrt(dx * dx + dz * dz);
    if (dist > 0.01) achievements.setStat('distanceTraveled', (achievements.stats.distanceTraveled || 0) + dist);
    _prevPlayerPos.copy(player.position);
  }

  // Block movement input while a menu is open / the game isn't focused.
  // On desktop that's exactly when the pointer isn't locked; mobile forces
  // pointerLocked = true above so touch controls still work.
  if (!pointerLocked) {
    for (const k in input.keys) input.keys[k] = false;
  }

  // player physics (skip during sleep)
  if (!sleeping) {
    player.update(dt, input);
  } else {
    // Sleep overlay fade animation
    sleepTimer += dt;
    if (sleepPhase === 1) {
      sleepOverlay.style.opacity = Math.min(1, sleepTimer / 1.5);
      if (sleepTimer >= 1.5) {
        dayTime = 0.01; // advance to morning
        sleepPhase = 2;
        sleepTimer = 0;
      }
    } else if (sleepPhase === 2) {
      sleepOverlay.style.opacity = 1;
      if (sleepTimer >= 0.5) {
        sleepPhase = 3;
        sleepTimer = 0;
      }
    } else if (sleepPhase === 3) {
      sleepOverlay.style.opacity = Math.max(0, 1 - sleepTimer / 0.5);
      if (sleepTimer >= 0.5) {
        sleeping = false;
        sleepPhase = 0;
        sleepOverlay.style.opacity = 0;
        lockPointer();
      }
    }
  }

  // step sounds
  if (player.onGround && (player.velocity.x !== 0 || player.velocity.z !== 0)) {
    stepTimer += dt;
    const stepInterval = player.sprinting ? 0.28 : 0.4;
    if (stepTimer >= stepInterval) {
      stepTimer -= stepInterval;
      const bx = Math.floor(player.position.x);
      const by = Math.floor(player.position.y - 0.05);
      const bz = Math.floor(player.position.z);
      audio.step(world.getBlock(bx, by, bz));
      // Spawn footstep particles for grass/sand/dirt
      spawnStepParticles(bx, by, bz, world.getBlock(bx, by, bz));
    }
  } else {
    stepTimer = 0;
  }

  // damage sound + camera shake
  if (player.damageTimer > 0 && prevDamageTimer <= 0) {
    audio.damage();
    _cameraShakeIntensity = 0.15;
    const dmgOverlay = document.getElementById('damage-overlay');
    if (dmgOverlay) {
      dmgOverlay.classList.add('flash');
      setTimeout(() => dmgOverlay.classList.remove('flash'), 180);
    }
  }
  prevDamageTimer = player.damageTimer;

  // Apply camera shake (decays over time)
  if (_cameraShakeIntensity > 0) {
    _cameraShakeIntensity *= Math.max(0, 1 - dt * 8);
    if (_cameraShakeIntensity < 0.001) _cameraShakeIntensity = 0;
    if (_cameraShakeIntensity > 0) {
      camera.position.x += (Math.random() - 0.5) * _cameraShakeIntensity * 0.3;
      camera.position.y += (Math.random() - 0.5) * _cameraShakeIntensity * 0.3;
    }
  }

  // selection highlight
  const target = currentTarget();
  if (target) {
    highlight.visible = true;
    highlight.position.set(target.x + 0.5, target.y + 0.5, target.z + 0.5);
  } else {
    highlight.visible = false;
  }

  // camera already synced by player.update()

  // Update player model visibility based on camera mode
  if (playerModel) {
    const showModel = player.cameraMode !== 0;
    playerModel.setVisible(showModel);
    if (showModel) {
      const eye = world.getBlock(Math.floor(player.position.x), Math.floor(player.position.y + player.eyeHeight), Math.floor(player.position.z));
      const isSwimming = eye === BLOCK.WATER;
      const isBreaking = input.mouseLeftHeld && pointerLocked && breakingTarget != null;
      const isPlacing = placeAnimTimer > 0;
      playerModel.update(dt, player.position, player.yaw, player.velocity, player.onGround, player.sprinting, isBreaking, isPlacing, isSwimming);
      const armorIds = player.inventory.armor.map(s => s ? s.item : null);
      const armorKey = armorIds.join(',');
      if (armorKey !== _lastLocalArmorKey) {
        _lastLocalArmorKey = armorKey;
        try { playerModel.setArmor(armorIds, ARMOR); } catch (_) {}
      }
    }
  }

  // Update footstep particles
  updateStepParticles(dt);

  // Item name fade timer
  if (_itemNameTimer > 0) {
    _itemNameTimer -= dt;
    if (_itemNameTimer <= 0) {
      ui.itemNameEl.classList.remove('visible');
    }
  }
  if (placeAnimTimer > 0) placeAnimTimer -= dt;

  // F3 debug overlay
  if (player && document.getElementById('debug-overlay')?.style.display !== 'none') {
    const dbg = document.getElementById('debug-overlay');
    if (dbg) {
      const bx = Math.floor(player.position.x);
      const by = Math.floor(player.position.y);
      const bz = Math.floor(player.position.z);
      const biomeId = world.noise ? calcBiome(world.noise, bx, bz, world.heightAt(bx, bz)) : '?';
      const biomeNames = ['Plains','Forest','Desert','Taiga','Mountains','Oce','DeepOc','Beach','Snowy','Savan','DarkF','Jungl','Swamp','Birch'];
      const cameraModes = ['First Person', 'Third Person (Back)', 'Third Person (Front)'];
      dbg.innerHTML = `XYZ: ${player.position.x.toFixed(1)} / ${player.position.y.toFixed(1)} / ${player.position.z.toFixed(1)}<br>` +
        `Chunk: ${Math.floor(bx/CHUNK_SIZE)}, ${Math.floor(bz/CHUNK_SIZE)}<br>` +
        `Biome: ${biomeNames[biomeId] || biomeId}<br>` +
        `Day: ${totalDays} &middot; Level: ${player.level}<br>` +
        `Camera: ${cameraModes[player.cameraMode]}<br>` +
        `FPS: ${Math.round(1/dt)}<br>` +
        `Mobs: ${mobManager ? mobManager.mobs.length : 0}<br>` +
        `Chunks: ${loader.loadedCount()}`;
    }
  }

  loader.update(player.position.x, player.position.z);
  manager.tick();

  // Spawn mobs for newly generated chunks
  if (mobManager) {
    const pcx = Math.floor(player.position.x / CHUNK_SIZE);
    const pcz = Math.floor(player.position.z / CHUNK_SIZE);
    for (let dz = -renderDist; dz <= renderDist; dz++) {
      for (let dx = -renderDist; dx <= renderDist; dx++) {
        const cx = pcx + dx, cz = pcz + dz;
        const chunk = world.chunks.get(cx + ',' + cz);
        if (chunk && chunk.generated) mobManager.spawnForChunk(cx, cz, dayTime > 0.625);
      }
    }
  }

  updateSky(dt);
  updateWeather(dt);
  updateCoordsHud(dt);
  updateTimeHud();

  // Eating chew sounds (periodic while eating)
  if (player && player.eating && player.eatBiteTimer <= 0) {
    try { audio.eatChew(); } catch (_) {}
    player.eatBiteTimer = 0.35;
  }

  // Update dropped items + auto-collect
  if (droppedItemManager && player) {
    droppedItemManager.update(dt, player.position);
    const collected = droppedItemManager.collectNearby(player.position);
    for (const c of collected) {
      if (player.inventory.add(c.itemId, c.count)) {
        // Item added to inventory
      }
    }
  }

  // Update multiplayer remote players
  if (mpRenderer) {
    mpRenderer.update(dt);
    // Simulate other players moving around in multiplayer
    if (isMultiplayer && currentServer) {
      _simulateRemotePlayers(dt);
    }
  }

  // Update mobs
  if (mobManager) {
    const mobEvent = mobManager.update(dt, player.position, dayTime);
    // Handle mob attacks on player (e.g. spider at night)
    if (mobEvent && mobEvent.type === 'attack') {
      const dmgMult = gameDifficulty === 'hard' ? 1.5 : 1.0;
      player.takeDamage(Math.round(mobEvent.damage * dmgMult), mobEvent.fromPos || 'mob');
    }
  }

  // underwater tint
  const eye = player.eyeBlock();
  if (eye === BLOCK.WATER) {
    scene.fog.color.setHex(0x2266aa);
    scene.background.setHex(0x2266aa);
    scene.fog.near = 1; scene.fog.far = 22;
    if (underwaterOverlay) underwaterOverlay.style.display = 'block';
  } else {
    scene.fog.near = 16 * 5; scene.fog.far = 16 * (renderDist + 2);
    if (underwaterOverlay) underwaterOverlay.style.display = 'none';
  }

  // update block breaking particles (skip on low quality)
  updateParticles(dt);
  if (breakParticles && graphicsQuality !== 'low') breakParticles.update(dt);
  if (ambientParticles && graphicsQuality !== 'low') {
    ambientParticles.setBiome(world.biomeAt(Math.floor(player.position.x), Math.floor(player.position.z), Math.floor(player.position.y)));
    ambientParticles.update(dt, player.position);
  }
  if (cloudSystem && graphicsQuality !== 'low') cloudSystem.update(dt, dayTime, player.position.x, player.position.z);

  // Sprint FOV effect (subtle zoom out when sprinting)
  const targetFov = player && player.sprinting ? 80 : (player && player.cameraMode !== 0 ? 70 : 75);
  camera.fov += (targetFov - camera.fov) * Math.min(1, dt * 8);
  camera.updateProjectionMatrix();

  renderer.render(scene, camera);

  // --- Mob health bar tooltip ---
  const mobHealthEl = document.getElementById('mob-health');
  if (mobHealthEl) {
    if (mobManager && player && pointerLocked) {
      const dir = new THREE.Vector3();
      camera.getWorldDirection(dir);
      const targeted = mobManager.hitTest(camera.position, dir, 5);
      if (targeted && !targeted.dead) {
        const nameEl = document.getElementById('mob-health-name');
        const fillEl = document.getElementById('mob-health-fill');
        const heartsEl = document.getElementById('mob-health-hearts');
        const def = MOB_TYPES[targeted.type];
        if (def) {
          if (nameEl) nameEl.textContent = def.name;
          if (fillEl) fillEl.style.width = ((targeted.hp / targeted.maxHp) * 100) + '%';
          if (heartsEl) {
            const fullHearts = Math.floor(targeted.hp / 2);
            const halfHeart = targeted.hp % 2 === 1;
            const maxHearts = Math.ceil(targeted.maxHp / 2);
            let h = '';
            for (let i = 0; i < maxHearts; i++) {
              if (i < fullHearts) h += '❤';
              else if (i === fullHearts && halfHeart) h += '💔';
              else h += '🖤';
            }
            heartsEl.textContent = h;
          }
          // Project mob head position to screen
          const mobPos = new THREE.Vector3(targeted.position.x, targeted.position.y + (def.legH + def.bodyH + def.headH) + 0.6, targeted.position.z);
          mobPos.project(camera);
          const hw = window.innerWidth / 2;
          const hh = window.innerHeight / 2;
          const sx = mobPos.x * hw + hw;
          const sy = -(mobPos.y * hh) + hh;
          // Only show if in front of camera
          if (mobPos.z < 1) {
            mobHealthEl.style.display = 'block';
            mobHealthEl.style.left = sx + 'px';
            mobHealthEl.style.top = (sy - 10) + 'px';
          } else {
            mobHealthEl.style.display = 'none';
          }
        } else {
          mobHealthEl.style.display = 'none';
        }
      } else {
        mobHealthEl.style.display = 'none';
      }
    } else {
      mobHealthEl.style.display = 'none';
    }
  }

  // First-person held item: sync both hands with inventory, render overlay.
  const heldId = getHeldItemId();
  viewmodel.setHeld(heldId);
  const ohSlot = player.inventory.offhand;
  viewmodel.setOffhand(ohSlot ? ohSlot.item : null);
  const overlayShown = ui.isOverlayShown() || ui.inventoryOpen || ui.furnaceOpen;
  const inThirdPerson = player && player.cameraMode !== 0;
  viewmodel.setVisible(!overlayShown && !inThirdPerson);
  if (!overlayShown && !inThirdPerson) {
    const moving = player.onGround && (player.velocity.x !== 0 || player.velocity.z !== 0);
    const mining = input.mouseLeftHeld && pointerLocked && !!breakingTarget;
    viewmodel.update(dt, false, moving, player.eating, player.crouching, {
      inWater: player.inWater,
      flying: player.flying,
      onGround: player.onGround,
      vy: player.velocity.y,
      pitch: player.pitch,
      hurt: player.damageTimer > 0.3,
      mining,
    });
    viewmodel.renderOverlay();
  }

  // HUD update
  ui.updateHud({
    fps,
    pos: player.position,
    biome: world.biomeAt(
      Math.floor(player.position.x),
      Math.floor(player.position.z),
      Math.floor(player.position.y)
    ),
    loadedChunks: loader.loadedCount(),
    facing: facingName(player.yaw),
    gamemode: player.gamemode,
  });
  ui.updateItemName(player.inventory, player.isCreative());
  ui.setUnderwater(eye === BLOCK.WATER);
  ui.updateXpBar(player.getXpProgress(), player.level);

  // Furnace tick
  ui.tickFurnace(dt, (id) => SMELTING[id], (id) => fuelValue(id));

  // Throttled status bar update
  statusBarTimer += dt;
  if (statusBarTimer > 0.25) {
    statusBarTimer = 0;
    if (player.isSurvival()) {
      ui.updateStatusBars(player);
    } else {
      ui.healthBar.innerHTML = '';
      ui.hungerBar.innerHTML = '';
    }
    // Always update armor + offhand display in both modes
    ui.updateArmorSlots(player);
  }

  // Auto-save periodically
  autoSaveTimer += dt;
  achievements.addPlayTime(dt);
  if (autoSaveTimer > 30) {
    autoSaveTimer = 0;
    saveCurrentWorld();
  }

  // Send position to multiplayer server (throttled to ~20Hz)
  if (network.connected && network.roomName && player) {
    _mpSendTimer += dt;
    if (_mpSendTimer >= 0.05) {
      _mpSendTimer = 0;
      network.sendPosition(player.position.x, player.position.y, player.position.z, player.yaw, player.crouching, player.inventory.armor.map(s => s ? s.item : null));
    }
  }

  // Offer banner timer (random popup during survival gameplay)
  if (gameRunning && player && player.isSurvival() && !offerActive) {
    offerTimer += dt;
    if (offerTimer >= offerNextTime) {
      showOfferBanner();
    }
  }

  // Death detection
  if (player.isDead() && !ui.isOverlayShown()) {
    ui.showMenu('death');
    document.exitPointerLock();
    // Populate death stats
    const ds = document.getElementById('death-stats');
    if (ds) {
      const blocks = achievements.stats.totalBlocksBroken || 0;
      const mobKills = achievements.stats.mobKillsAny || 0;
      const dist = Math.floor(achievements.stats.distanceTraveled || 0);
      ds.innerHTML = `Level Reached: <b style="color:#7fff5f">${player.level}</b><br>` +
        `Days Survived: <b style="color:#ffd040">${totalDays}</b><br>` +
        `Blocks Broken: <b>${blocks}</b><br>` +
        `Mobs Defeated: <b>${mobKills}</b><br>` +
        `Distance Walked: <b>${dist} m</b>`;
    }
    // Track death for achievements (only once per death)
    if (!_deathTracked) {
      _deathTracked = true;
      achievements.incrementStat('deaths');
    }
  } else if (!player.isDead()) {
    _deathTracked = false;
  }
}
window.addEventListener('mousedown', (e) => { if (e.button === 0) input.mouseLeftHeld = true; });

window.addEventListener('mouseup', (e) => { if (e.button === 0) input.mouseLeftHeld = false; });
window.addEventListener('beforeunload', () => saveCurrentWorld());

// --- Menu 3D Player Preview ---
let menuPreviewRenderer = null, menuPreviewScene = null, menuPreviewCamera = null, menuPreviewModel = null, menuPreviewSkin = null;
function initMenuPreview() {
  const container = document.getElementById('menu-player-container');
  if (!container || menuPreviewRenderer) return;
  menuPreviewRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
  menuPreviewRenderer.setSize(120, 180);
  menuPreviewRenderer.setPixelRatio(1);
  menuPreviewRenderer.setClearColor(0x000000, 0);
  container.appendChild(menuPreviewRenderer.domElement);
  menuPreviewScene = new THREE.Scene();
  menuPreviewCamera = new THREE.PerspectiveCamera(35, 120 / 180, 0.1, 100);
  menuPreviewCamera.position.set(0, 1.2, 3.5);
  menuPreviewCamera.lookAt(0, 0.9, 0);
  const amb = new THREE.AmbientLight(0xffffff, 0.8);
  menuPreviewScene.add(amb);
  const dir = new THREE.DirectionalLight(0xffffff, 0.6);
  dir.position.set(2, 4, 3);
  menuPreviewScene.add(dir);
  menuPreviewSkin = getSelectedSkin();
  menuPreviewModel = new PlayerModel(menuPreviewScene, menuPreviewSkin);
  menuPreviewModel.setVisible(true);
  menuPreviewModel.group.position.set(0, 0, 0);
  menuPreviewModel.group.rotation.y = 0.3;
  const nameEl = document.getElementById('menu-player-name');
  if (nameEl) nameEl.textContent = menuPreviewSkin.name;
  animateMenuPreview();
}
function animateMenuPreview() {
  requestAnimationFrame(animateMenuPreview);
  if (!menuPreviewRenderer || !menuPreviewScene || !menuPreviewCamera) return;
  if (!menuPreviewModel || !menuPreviewModel.group.visible) return;
  menuPreviewModel.group.rotation.y += 0.008;
  menuPreviewRenderer.render(menuPreviewScene, menuPreviewCamera);
}
function updateMenuPreviewSkin(preset) {
  if (!menuPreviewModel) return;
  menuPreviewModel.setSkin(preset);
  menuPreviewModel.setVisible(true);
  menuPreviewModel.group.position.set(0, 0, 0);
  const nameEl = document.getElementById('menu-player-name');
  if (nameEl) nameEl.textContent = preset.name;
}
initMenuPreview();

// --- Skin Picker ---
function buildSkinPicker() {
  const boysGrid = document.getElementById('skin-grid-boys');
  const girlsGrid = document.getElementById('skin-grid-girls');
  if (!boysGrid || !girlsGrid) return;
  boysGrid.innerHTML = '';
  girlsGrid.innerHTML = '';
  const current = getSelectedSkin();
  SKIN_PRESETS.forEach((preset, i) => {
    const isGirl = preset.gender === 'girl';
    const targetGrid = isGirl ? girlsGrid : boysGrid;
    const card = document.createElement('div');
    card.className = 'skin-card' + (preset.name === current.name ? ' selected' : '');
    const cvs = document.createElement('canvas');
    cvs.width = 16; cvs.height = 24;
    cvs.style.width = '48px'; cvs.style.height = '72px';
    drawMiniSkin(cvs, preset);
    card.appendChild(cvs);
    const label = document.createElement('div');
    label.className = 'skin-card-name';
    label.textContent = preset.name;
    card.appendChild(label);
    card.addEventListener('click', () => {
      setSelectedSkin(i);
      document.querySelectorAll('.skin-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      updateMenuPreviewSkin(preset);
    });
    targetGrid.appendChild(card);
  });
}
function drawMiniSkin(cvs, preset) {
  const x = cvs.getContext('2d');
  x.imageSmoothingEnabled = false;
  const s = 2;
  const SKIN = preset.skin || '#c0906a';
  const HAIR = preset.hair || '#3b2210';
  const SHIRT = preset.shirt || '#1d8db5';
  const PANTS = preset.pants || '#2d3364';
  const SHOE = preset.shoes || '#493828';
  const WHITE = preset.eyes || '#fff';
  const PUPIL = preset.pupil || '#263694';
  const MOUTH = preset.mouth || '#6b4330';
  const isGirl = preset.gender === 'girl';
  function px(col, gx, gy) { x.fillStyle = col; x.fillRect(gx * s, gy * s, s, s); }
  // Head (6x5 at y=0)
  for (let i = 0; i < 6; i++) px(HAIR, i + 1, 0);
  for (let r = 1; r < 5; r++) {
    for (let i = 0; i < 6; i++) px(SKIN, i + 1, r);
    if (r <= 3) { px(HAIR, 1, r); px(HAIR, 6, r); }
    if (r === 2) { px(WHITE, 2, r); px(PUPIL, 3, r); px(WHITE, 4, r); px(PUPIL, 5, r); }
    if (r === 4 && isGirl) { px(HAIR, 1, r); px(HAIR, 6, r); }
  }
  // Body (6x4 at y=5)
  for (let by = 0; by < 4; by++) for (let bx = 0; bx < 6; bx++) px(by < 3 ? SHIRT : PANTS, bx + 1, 5 + by);
  // Arms (1x4 each side at y=5)
  for (let ay = 0; ay < 4; ay++) { px(SKIN, 0, 5 + ay); px(SKIN, 7, 5 + ay); }
  // Legs (6x4 at y=9)
  for (let ly = 0; ly < 4; ly++) for (let lx = 0; lx < 6; lx++) px(ly >= 3 ? SHOE : PANTS, lx + 1, 9 + ly);
}
buildSkinPicker();

// Wire up skin picker buttons
document.getElementById('btn-skin-customize')?.addEventListener('click', () => {
  buildSkinPicker();
  ui.showMenu('skins');
});
document.getElementById('btn-skins-back')?.addEventListener('click', () => {
  ui.showMenu('main');
});

// --- Skin Editor ---
let skinEditor = null;
document.getElementById('btn-skins-edit')?.addEventListener('click', () => {
  ui.showMenu('skin-editor');
  setTimeout(() => {
    skinEditor = new SkinEditor();
    skinEditor.init();
  }, 50);
});
document.getElementById('btn-skin-editor-back')?.addEventListener('click', () => {
  if (skinEditor) { skinEditor.destroy(); skinEditor = null; }
  ui.showMenu('skins');
});

// --- Inventory sort ---
document.getElementById('btn-sort-inv')?.addEventListener('click', () => {
  if (player && player.inventory) {
    player.inventory.sort();
    syncUIMode();
    if (ui.inventoryOpen) ui.renderInventoryGrid(player.inventory);
  }
});

// --- Close buttons (needed on mobile where there's no Tab/Esc) ---
document.getElementById('btn-close-inv')?.addEventListener('click', () => {
  ui.closeInventory(); syncUIMode(); lockPointer();
});
document.getElementById('btn-close-furnace')?.addEventListener('click', () => {
  ui.closeFurnace(); lockPointer();
});
document.getElementById('btn-close-chest')?.addEventListener('click', () => {
  ui.closeChest(); lockPointer();
});


let statusBarTimer = 0, autoSaveTimer = 0, stepTimer = 0, prevDamageTimer = 0, mobAttackTimer = 0, _playerAttackTimer = 0, _cameraShakeIntensity = 0, _deathTracked = false;
const _prevPlayerPos = new THREE.Vector3();
function facingName(yaw) {
  const a = ((yaw * 180 / Math.PI) % 360 + 360) % 360;
  if (a < 45 || a >= 315) return 'South';
  if (a < 135) return 'West';
  if (a < 225) return 'North';
  return 'East';
}

// FPS counter
let fps = 0, fpsFrames = 0, fpsLastTime = performance.now();
(function fpsLoop() {
  requestAnimationFrame(fpsLoop);
  fpsFrames++;
  const now = performance.now();
  if (now - fpsLastTime >= 1000) {
    fps = Math.round(fpsFrames * 1000 / (now - fpsLastTime));
    fpsFrames = 0;
    fpsLastTime = now;
  }
})();

requestAnimationFrame(loop);
