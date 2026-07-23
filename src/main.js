// Entry point: wires up renderer, world, player, input, and the render loop.

import * as THREE from 'three';
import { World, CHUNK_SIZE, BIOMES } from './world.js';
import { ChunkMeshManager } from './chunkmesh.js';
import { ChunkLoader } from './chunkloader.js';
import { Player } from './player.js';
import { raycastVoxel, closestBlockInRadius } from './raycast.js';
import { buildAtlas, makeIcon, TILE } from './tiles.js';
import { UI, drawCrack, makeItemIconCanvas } from './ui.js';
import { Audio } from './audio.js';
import { BLOCK, BLOCKS, HOTBAR_BLOCKS, blockDrop, blockHardness, blockTool, blockHarvestLevel, TILES, tileNameFor } from './blocks.js';
import { isBlockItem, isTool, toolInfo, toolSpeedFor, toolHarvestLevel, isFood, foodValue, fuelValue, ITEM, itemDef, itemName, ARMOR } from './items.js';
import { ViewModel } from './viewmodel.js';
import { saveWorld, loadWorld, getWorldList, saveWorldList, createWorld, deleteWorld, migrateLegacy, hasSave, hasTutorialBeenSeen, markTutorialSeen, syncTutorialFromSdk, cleanDevWorldsFromPlayerList, getDevWorldList, saveDevWorldList, getParkourWorldList, saveParkourWorldList, saveMultiplayerInventory, loadMultiplayerInventory } from './storage.js';
import { SMELTING, RECIPES } from './recipes.js';
import { AchievementManager, ACHIEVEMENTS, CATEGORIES } from './achievements.js';
import { MobManager, MOB_TYPES } from './mobs.js';
import { calcBiome } from './worldgen.js';
import { SKIN_PRESETS, getSelectedSkin, setSelectedSkin, getCustomSkins, deleteCustomSkin, setSelectedCustomSkin, setSkinUser, getStoredSkinIndex } from './skins.js';
import { PlayerModel } from './playermodel.js';
import { SkinEditor } from './skineditor.js';
import { getKeybinds, setKeybind, resetKeybinds, keyName, KEYBIND_ACTIONS } from './keybinds.js';
import { initMobileControls } from './mobile.js';
import { Server, executeCommand, ROLE_OWNER, ROLE_ADMIN, ROLE_STAFF, ROLE_PLAYER, ROLE_GAMEDEV, ROLE_DEV, resolveCgUsername, getDevTag, setDevTag } from './multiplayer.js';
import { DroppedItemManager } from './dropped.js';
import { MultiplayerRenderer } from './multiplayerrenderer.js';
import { placeStructure, DEV_STRUCTURES } from './structures.js';
import { buildParkourLevel, buildParkourLobby, buildAllLevels, PARKOUR_LEVELS, resetParkourState, startParkourTimer, checkCheckpoint, checkLevelEnd, getRespawnPosition, getCurrentLevel, getCurrentLevelInfo, getParkourTimerFormatted, setParkourLevel, loadImportedParkourChunks, buildImportedParkour } from './parkour.js';
import { BreakParticles, AmbientParticles, CloudSystem } from './particles.js';
import { ExplosionManager } from './explosions.js';
import { trackLogin, trackServerCreated, getDailyUsers, getMonthlyUsers, getTotalServersCreated, getTodayUsers, getThisMonthUsers } from './analytics.js';
import { network } from './network.js';
import { filterProfanity } from './profanity.js';
import { GreenstoneSystem } from './greenstone.js';
import { VoiceChat } from './voice.js';

const REACH = 6;
const DAY_LENGTH = 960; // 16 min total: 10 day + 6 night
const DAY_FRAC = 10 / 16; // fraction of cycle that is day
const BASE_BREAK_TIME = 0.8;

// --- Multiplayer server URL ---
import { BACKEND_URL, IS_CG_BUILD } from './config.js';
// The always-on WebSocket backend (Render free tier, kept awake by a GitHub
// Actions cron ping). When the game is served from GitHub Pages the page host
// is NOT the server, so we connect here instead. Change this if you rename the
// Render service.
// Supports ?server=ws://host:port to explicitly set the multiplayer server
// (useful when devices are on different networks or accessing via different URLs)
const _urlParams = new URLSearchParams(window.location.search);
const _serverParam = _urlParams.get('server');
const MP_SERVER_URL = _serverParam
  ? _serverParam
  // On CrazyGames the page host is crazygames.com (NOT our server), so the
  // generic https auto-detect below would wrongly point at CG's own host.
  // Route multiplayer (and asset streaming) at our always-on Render server.
  // On the CrazyGames build (IS_CG_BUILD is injected at build time and
  // is reliable; the SDK script itself loads async so a runtime check
  // alone would race module init and misroute to wss://crazygames.com).
  : (IS_CG_BUILD || (window.CrazyGames && window.CrazyGames.SDK) || window.Capacitor)
    ? BACKEND_URL
    : window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? 'ws://localhost:3000'
      // GitHub Pages (or any host that isn't the server itself) → use the backend.
      : window.location.hostname.endsWith('github.io')
        ? BACKEND_URL
        : window.location.protocol === 'https:'
          // Auto-detect: connect to the same host we were served from (works on
          // Render, a Cloudflare tunnel, or any custom domain like blockforge.io)
          ? `wss://${window.location.hostname}`
          : `ws://${window.location.hostname}:4000`;
let _mpSendTimer = 0;
let _lastMpPos = { x: 0, y: 0, z: 0, yaw: 0, crouching: false, armor: '' };

// --- CrazyGames SDK helpers ---
// Voice (and other CG-only restrictions) apply ONLY when actually running on the
// real CrazyGames domain — NOT when locally testing with ?cg=1, which also loads
// the SDK but should behave like a normal self-hosted build (voice stays on).
const isOnCrazyGames = () => /crazygames/i.test(location.hostname);

// The official CrazyGames SDK is injected as a classic <script> from
// sdk.crazygames.com and may not be ready by the time this module initializes,
// so poll briefly instead of reading window.CrazyGames.SDK synchronously.
// Resolves with the real SDK object, or null if we're not on CrazyGames.
let _cgSdkPromise = null;
function crazyGamesSDK() {
  if (_cgSdkPromise) return _cgSdkPromise;
  _cgSdkPromise = new Promise((resolve) => {
    if (window.CrazyGames && window.CrazyGames.SDK) return resolve(window.CrazyGames.SDK);
    let tries = 0;
    const id = setInterval(() => {
      if (window.CrazyGames && window.CrazyGames.SDK) {
        clearInterval(id);
        resolve(window.CrazyGames.SDK);
      } else if (++tries > 100) {
        clearInterval(id);
        resolve(null);
      }
    }, 50);
  });
  return _cgSdkPromise;
}
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
  if (!isOnCrazyGames()) {
    callbacks?.adFinished?.();
    return;
  }
  const ad = window.CrazyGames?.SDK?.ad;
  if (ad?.requestAd) {
    try { ad.requestAd('midgame', callbacks); } catch (_) { callbacks?.adFinished?.(); }
  } else {
    // No CrazyGames SDK (e.g. self-hosted tunnel) — just finish immediately.
    callbacks?.adFinished?.();
  }
}
function cgHappyTime() {
  try { window.CrazyGames?.SDK?.game?.happytime?.(); } catch (_) {}
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
  polygonOffset: true, polygonOffsetFactor: -10, polygonOffsetUnits: -10,
});
const crackPlane = new THREE.Mesh(new THREE.PlaneGeometry(1.001, 1.001), crackMaterial);
crackPlane.visible = false;
scene.add(crackPlane);

function updateBreaking(progress, hit) {
  if (progress <= 0 || !hit) { crackPlane.visible = false; return; }
  crackPlane.visible = true;
  drawCrack(crackCanvas, Math.min(10, Math.floor(progress * 10) + 1));
  crackTexture.needsUpdate = true;
  // Position crack flush on the face that was hit
  const nx = hit.normal.x, ny = hit.normal.y, nz = hit.normal.z;
  crackPlane.position.set(
    hit.x + 0.5 + nx * 0.505,
    hit.y + 0.5 + ny * 0.505,
    hit.z + 0.5 + nz * 0.505
  );
  // Orient the crack plane to match the block face, then billboard toward camera
  if (Math.abs(ny) > 0.5) {
    // Top/bottom face: rotate to be horizontal
    crackPlane.rotation.set(ny > 0 ? -Math.PI / 2 : Math.PI / 2, 0, 0);
  } else if (Math.abs(nx) > 0.5) {
    // Left/right face
    crackPlane.rotation.set(0, 0, nx > 0 ? Math.PI / 2 : -Math.PI / 2);
  } else {
    // Front/back face
    crackPlane.rotation.set(0, nz > 0 ? 0 : Math.PI, 0);
  }
}

// --- UI / audio ---
const ui = new UI(atlasCanvas);
ui._onSync = syncUIMode;
ui.onCraft = (itemId, count) => {
  achievements.addItemsCrafted(count);
  achievements.incrementMapStat('crafted', itemId, count);
  const STORAGE_BLOCKS = [BLOCK.COAL_BLOCK, BLOCK.IRON_BLOCK, BLOCK.GOLD_BLOCK, BLOCK.DIAMOND_BLOCK, BLOCK.PRISMITE_BLOCK];
  if (STORAGE_BLOCKS.includes(itemId)) achievements.incrementStat('storageBlocksCrafted');
  const tInfo = toolInfo(itemId);
  if (tInfo && tInfo.type === 'hoe') achievements.incrementStat('craftedHoe');
  const aInfo = ARMOR[itemId];
  if (aInfo) {
    if (aInfo.material === 'IRON') achievements.incrementStat('craftedAnyIronArmor');
    if (aInfo.material === 'DIAMOND') achievements.incrementStat('craftedAllDiamondArmor');
  }
  if (player && player.isSurvival()) {
    const xpGain = Math.ceil(count * 0.5);
    if (player.addXp(xpGain)) ui.showLevelUp(player.level);
  }
};
ui.onSmelt = (inputItem, count) => {
  achievements.incrementMapStat('smelted', inputItem, count);
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
  [BLOCK.BED_FOOT]: 0xaa3333,
  [BLOCK.PODZOL]: 0x6a5030,
  [BLOCK.MYCELIUM]: 0x7a7a8a,
  [BLOCK.LADDER]: 0x8a6a3c,
  [BLOCK.OAK_FENCE]: 0xbc9458,
  [BLOCK.OAK_DOOR]: 0xbc9458,
  [BLOCK.STONE_BUTTON]: 0x8a8a8a,
  [BLOCK.LEVER]: 0x8a8a8a,
  [BLOCK.OAK_SIGN]: 0xbc9458,
  [BLOCK.STONE_PRESSURE_PLATE]: 0x8a8a8a,
  [BLOCK.COPPER_ORE]: 0xb07040,
  [BLOCK.EMERALD_ORE]: 0x40b060,
  [BLOCK.FLOWER_POT]: 0xa06830,
  [BLOCK.CARPET]: 0xe8e0d0,
  [BLOCK.PAINTING]: 0xbc9458,
  [BLOCK.IRON_DOOR]: 0xb8b8b8,
  [BLOCK.WOOL]: 0xe8e0d0,
  [BLOCK.GREENSTONE_ORE]: 0x1a8040,
  [BLOCK.GREENSTONE_BLOCK]: 0x187838,
  [BLOCK.GREENSTONE_DUST]: 0x147830,
  [BLOCK.GREENSTONE_TORCH]: 0x28a050,
  [BLOCK.GREENSTONE_LAMP]: 0x28a050,
  [BLOCK.PISTON]: 0xbc9458,
  [BLOCK.STICKY_PISTON]: 0xbc9458,
  [BLOCK.LAVA]: 0xff6600,
  [BLOCK.IRON_BARS]: 0x8a8a8a,
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
      if (p.mesh.geometry !== particleGeo) p.mesh.geometry.dispose();
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
let world = null, manager = null, loader = null, player = null, mobManager = null, explosionManager = null, playerModel = null;
let _lastLocalArmorKey = '';
let _particles = [];
const _particleGeoSmall = new THREE.BoxGeometry(0.05, 0.05, 0.05);
const _particleGeoMed = new THREE.BoxGeometry(0.06, 0.06, 0.06);
const _particleGeoTiny = new THREE.BoxGeometry(0.03, 0.03, 0.03);
const _sprintParticleMat = new THREE.MeshBasicMaterial({ color: 0xcccccc, transparent: true, opacity: 0.5 });
const _waterSplashMat = new THREE.MeshBasicMaterial({ color: 0x4488cc, transparent: true, opacity: 0.6 });
const _critParticleMat = new THREE.MeshBasicMaterial({ color: 0xffff44, transparent: true, opacity: 0.7 });

const _dirVec = new THREE.Vector3();
const _mobDirVec = new THREE.Vector3();
const _pvpDirVec = new THREE.Vector3();
const _pvpToPlayer = new THREE.Vector3();
const _pvpClosest = new THREE.Vector3();
const _mobHealthDir = new THREE.Vector3();
const _mobHealthPos = new THREE.Vector3();
const _mobileTapDir = new THREE.Vector3();
let _sprintParticleTimer = 0;
let _waterSplashTimer = 0;
let gameRunning = false;
let voiceChat = null;
let renderDist = 7;
let graphicsQuality = 'medium'; // 'low' | 'medium' | 'high'
let _dwState = { mode: 'creative', diff: 'normal', terrain: 'flat', mp: 'solo', maxPlayers: 10 };
let _pendingDevWorldOpts = null;
let gameDifficulty = 'normal'; // 'normal' | 'hard'
let mouseSensitivity = 1.0; // 0.2 .. 2.0 multiplier
let showFps = true;
let joiningViaLink = false; // true when auto-joining from a shareable link
let mobile = null;
let isMultiplayer = false;
let droppedItemManager = null;
let mpRenderer = null;
let breakParticles = null, ambientParticles = null, cloudSystem = null;

// --- door open/close state ---
const doorStates = new Map(); // key: "x,y,z" -> { blockId }

// --- redstone states (buttons, levers, pressure plates) ---
const redstoneStates = new Map(); // key: "x,y,z" -> { blockId, expiresAt }

// --- piston facing directions ---
const pistonFacings = new Map(); // key: "x,y,z" -> 'north'|'south'|'east'|'west'

// --- greenstone system ---
const greenstoneSystem = new GreenstoneSystem();

// --- multiplayer / chat state ---
let playerName = 'Player';
const DEV_USERS = new Set(['logicleague', 'cdkide2']);
const DEV_ACCOUNT = 'LogicLeague';
let playerRole = 'player';

function _refreshDevButtons() {
  const isDev = DEV_USERS.has(playerName.toLowerCase()) || playerRole === 'dev' || playerRole === 'gamedev' || playerRole === 'owner';
  const bWorld = document.getElementById('btn-dev-world');
  if (bWorld) bWorld.style.display = isDev ? '' : 'none';
  const bPanel = document.getElementById('btn-dev-panel');
  if (bPanel) bPanel.style.display = isDev ? '' : 'none';
}
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
let _chatAutoHideTimer = null;
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
let isDevWorld = false; // dev creative superflat test world
let isParkour = false;   // parkour mode
let _isImportedParkour = false; // imported Minecraft parkour map
let _parkourLevelEnds = null;
let _parkourTimerEl = null;
let _parkourLevelEl = null;
let _importedParkourData = null; // holds binary map header info
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
let _relocking = false; // true while trying to re-lock after closing a UI panel
let breakingTarget = null;
let mobileAimPoint = null; // {x, y} client coords of the active mobile touch, for tap-targeting
let breakingElapsed = 0;
let lastBreakSound = 0;
let placeAnimTimer = 0;

function lockPointer() {
  if (mobile && mobile.isMobile) return; // no pointer lock on mobile
  _relocking = true;
  try {
    const p = renderer.domElement.requestPointerLock();
    if (p && typeof p.then === 'function') {
      p.catch(e => { e && e.preventDefault && e.preventDefault(); });
    }
  } catch (_) {}
}

renderer.domElement.addEventListener('click', () => {
  if (ui.isOverlayShown()) return;
  if (!pointerLocked) lockPointer();
});

document.addEventListener('pointerlockchange', () => {
  pointerLocked = document.pointerLockElement === renderer.domElement;
  // Don't open the pause menu if we just closed a UI panel and are trying to re-lock,
  // or if chat/inventory/chest/furnace is open, or if on mobile, or voice panel is open.
  if (_relocking) {
    _relocking = false;
    // If pointer didn't actually lock (denied by browser), re-lock after a beat
    if (!pointerLocked && gameRunning) {
      setTimeout(() => { if (gameRunning) lockPointer(); }, 100);
    }
    return;
  }
  if (!pointerLocked && gameRunning && !ui.inventoryOpen && !ui.furnaceOpen && !ui.chestOpen && !chatOpen && !ui.isOverlayShown()) {
    if (!(mobile && mobile.isMobile) && !(voiceChat && voiceChat.panelOpen)) {
      ui.showMenu('pause');
      cgGameplayStop();
    }
  }
});

// Voice panel toggle — lock/unlock pointer
window.addEventListener('voice-panel-toggle', (e) => {
  if (e.detail && e.detail.open) {
    if (document.pointerLockElement) document.exitPointerLock();
  } else {
    // Re-lock if game is still running and no other UI is open
    if (gameRunning && !ui.inventoryOpen && !ui.furnaceOpen && !ui.isOverlayShown()) {
      renderer.domElement.requestPointerLock();
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
  // Always prevent browser Quick Find / search for /
  if (e.code === 'Slash') e.preventDefault();
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
  // Block game keys while any text input is focused (creative search, etc.)
  if (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) {
    if (e.code === 'Escape') {
      document.activeElement.blur();
      e.preventDefault();
    }
    return;
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
  // Block game input while voice panel is open (except Escape to close it)
  if (voiceChat && voiceChat.panelOpen) {
    if (e.code === 'Escape') voiceChat.closePanel();
    return;
  }
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
  // F = toggle fly in creative
  if (e.code === 'KeyF' && player && player.isCreative()) {
    e.preventDefault();
    player.toggleFly();
  }
  // V = voice chat settings (disabled on CrazyGames)
  if (e.code === kb.voice && voiceChat && !isOnCrazyGames()) {
    e.preventDefault();
    voiceChat.togglePanel();
  }
  // F7 = toggle gamemode (singleplayer only)
  if (e.code === 'F7') {
    e.preventDefault();
    if (isParkour) {
      ui.itemNameEl.textContent = 'Cannot change gamemode in Parkour';
      ui.itemNameEl.classList.add('visible');
      setTimeout(() => ui.itemNameEl.classList.remove('visible'), 2000);
    } else if (!isMultiplayer) {
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

// Offer banner buttons must be tappable — on mobile there is no Y/X keyboard,
// so the ACCEPT/DENY buttons are the only way to dismiss the banner there.
document.getElementById('offer-accept')?.addEventListener('click', acceptOffer);
document.getElementById('offer-deny')?.addEventListener('click', denyOffer);

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
let _devPanelNeedsAccounts = false;
let _pendingLinkProvider = ''; // used to track which OAuth provider is being linked
let _linkedAccountCallback = null; // called when dev_account_detail arrives for linked accounts

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
    network.onConnectedOnce(() => {
      _backgroundAuth = true;
      network.sendAuth(playerName, pass, 'login');
      network.friendList();
    });
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
  if (player && player.isSpectator()) return; // no interactions in spectator
  audio.resume();
  viewmodel.swing();
  if (playerModel) playerModel.swing();
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
        audio.place(hit.block);
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
    } else if (hit && (hit.block === BLOCK.BED || hit.block === BLOCK.BED_FOOT)) {
      trySleep();
    } else if (hit && (hit.block === BLOCK.OAK_DOOR || hit.block === BLOCK.IRON_DOOR)) {
      const doorKey = `${hit.x},${hit.y},${hit.z}`;
      const state = doorStates.get(doorKey);
      if (state) {
        // Door is open — close it (restore original block)
        world.setBlock(hit.x, hit.y, hit.z, state.blockId);
        doorStates.delete(doorKey);
      } else {
        // Door is closed — open it (set to air so player can walk through)
        doorStates.set(doorKey, { blockId: hit.block });
        world.setBlock(hit.x, hit.y, hit.z, BLOCK.AIR);
      }
      manager.refreshAround(Math.floor(hit.x / CHUNK_SIZE), Math.floor(hit.z / CHUNK_SIZE));
    } else if (hit && hit.block === BLOCK.LEVER) {
      const leverKey = `${hit.x},${hit.y},${hit.z}`;
      const existing = redstoneStates.get(leverKey);
      if (existing && existing.expiresAt === Infinity) {
        // Lever is on — turn off
        redstoneStates.delete(leverKey);
        greenstoneSystem.clearPower(hit.x, hit.y, hit.z);
      } else {
        // Lever is off — turn on (persistent, never expires)
        redstoneStates.set(leverKey, { blockId: hit.block, expiresAt: Infinity });
        greenstoneSystem.setPower(hit.x, hit.y, hit.z, 15);
      }
    } else if (hit && hit.block === BLOCK.STONE_BUTTON) {
      const btnKey = `${hit.x},${hit.y},${hit.z}`;
      if (!redstoneStates.has(btnKey)) {
        // Button not pressed — activate for 1.5 seconds
        redstoneStates.set(btnKey, { blockId: hit.block, expiresAt: performance.now() + 1500 });
        greenstoneSystem.setPower(hit.x, hit.y, hit.z, 15);
      }
    } else {
      // Minecraft Java right-click: main hand first, then off-hand fallback
      let used = false;
      const slot = player.inventory.getSelected();

      // Flint and Steel: ignite TNT
      if (slot && slot.item === ITEM.FLINT_STEEL) {
        const hit = currentTarget();
        if (hit && hit.block === BLOCK.TNT) {
          igniteTNT(hit.x, hit.y, hit.z);
          if (player.isSurvival()) {
            slot.count--;
            if (slot.count <= 0) player.inventory.slots[player.inventory.selected] = null;
            syncUIMode();
          }
          used = true;
        }
      }

      // Main hand: eat food or place block
      if (!used && player.isSurvival() && slot && isFood(slot.item)) {
        if (player.eat(foodValue(slot.item))) {
          slot.count--;
          if (slot.count <= 0) player.inventory.slots[player.inventory.selected] = null;
          syncUIMode();
          achievements.incrementStat('foodEaten');
          if (slot.item === ITEM.PORKCHOP_COOKED) achievements.incrementStat('foodEatenPorkchop');
          try { audio.eatBite(); } catch (_) {}
          used = true;
        }
      } else if (slot && isBlockItem(slot.item)) {
        placeBlock();
        used = true;
      }
      // Note: empty main hand does NOT set used=true so off-hand can try

      // Off-hand fallback: eat food, ignite TNT, or place block
      if (!used && player.inventory.offhand) {
        const oh = player.inventory.offhand;
        if (oh.item === ITEM.FLINT_STEEL) {
          const hit = currentTarget();
          if (hit && hit.block === BLOCK.TNT) {
            igniteTNT(hit.x, hit.y, hit.z);
            if (player.isSurvival()) {
              oh.count--;
              if (oh.count <= 0) player.inventory.offhand = null;
              syncUIMode();
            }
            used = true;
          }
        } else if (player.isSurvival() && isFood(oh.item)) {
          if (player.eat(foodValue(oh.item))) {
            oh.count--;
            if (oh.count <= 0) player.inventory.offhand = null;
            syncUIMode();
            achievements.incrementStat('foodEaten');
            if (oh.item === ITEM.PORKCHOP_COOKED) achievements.incrementStat('foodEatenPorkchop');
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
const GAMEMODE_CYCLE = ['creative', 'survival', 'adventure', 'spectator'];
function toggleGamemode() {
  const cur = player.gamemode || 'survival';
  const idx = GAMEMODE_CYCLE.indexOf(cur);
  const next = GAMEMODE_CYCLE[(idx + 1) % GAMEMODE_CYCLE.length];
  player.setGamemode(next);
  syncUIMode();
  addChatLine(`Gamemode set to ${next}.`, '#5f5');
}

function syncUIMode() {
  if (!player) return;
  const creative = player.isCreative();
  ui.creative = creative;
  ui.spectator = player.isSpectator();
  ui.buildHotbarFromInventory(player.inventory);
}

// --- block editing ---
const _rayDir = new THREE.Vector3();
const _rayOrigin = new THREE.Vector3();
let _cachedTarget = null;
let _cachedTargetFrame = -1;

function currentTarget() {
  if (!player) return null;
  // Cache per frame — avoid duplicate raycast
  const frame = performance.now();
  if (_cachedTargetFrame === frame) return _cachedTarget;
  _cachedTargetFrame = frame;
  camera.getWorldDirection(_rayDir);
  _rayOrigin.copy(camera.position);
  _cachedTarget = raycastVoxel(world, _rayOrigin, _rayDir, REACH);
  return _cachedTarget;
}

// Ray from an arbitrary screen point (used for mobile tap-to-break / tap-to-attack).
const _tapNdc = new THREE.Vector2();
const _tapRay = new THREE.Raycaster();
function screenRay(clientX, clientY) {
  _tapNdc.x = (clientX / window.innerWidth) * 2 - 1;
  _tapNdc.y = -(clientY / window.innerHeight) * 2 + 1;
  _tapRay.setFromCamera(_tapNdc, camera);
  return { origin: _tapRay.ray.origin, dir: _tapRay.ray.direction };
}
function screenTarget(clientX, clientY) {
  const { origin, dir } = screenRay(clientX, clientY);
  return raycastVoxel(world, origin, dir, REACH);
}

function getHeldItemId() {
  if (!player) return null;
  const slot = player.inventory.getSelected();
  return slot ? slot.item : null;
}

function isCriticalHit() {
  return player && !player.onGround && player.velocity.y < 0;
}

 function spawnCritParticles(pos) {
  if (!scene) return;
  for (let i = 0; i < 6; i++) {
    const mat = new THREE.MeshBasicMaterial({ color: 0xffff44, transparent: true, opacity: 0.8 });
    const m = new THREE.Mesh(_particleGeoTiny, mat);
    m.position.set(pos.x + (Math.random() - 0.5) * 0.6, pos.y + Math.random() * 1.5, pos.z + (Math.random() - 0.5) * 0.6);
    scene.add(m);
    _particles.push({ mesh: m, vx: (Math.random() - 0.5) * 3, vy: 2 + Math.random() * 3, vz: (Math.random() - 0.5) * 3, life: 0.5, maxLife: 0.5 });
  }
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

// Show a temporary toast message
// ── One-time announcement (shown once per device, then self-deletes) ──
const ONE_TIME_MESSAGES = [
  {
    id: 'v1.0-launch',
    title: 'Welcome to BlockForge!',
    body: 'BlockForge v1.0 is here!\n\n- 100 Levels parkour map imported\n- Multiplayer with friends\n- Cross-platform OAuth login\n- Custom skins and more\n\nThank you for playing!'
  }
];

function showOneTimeMessages() {
  const seen = (() => { try { return JSON.parse(localStorage.getItem('bf_seen_messages') || '[]'); } catch { return []; } })();
  const modal = document.getElementById('announcement-modal');
  const titleEl = document.getElementById('announcement-title');
  const bodyEl = document.getElementById('announcement-body');
  const dismissBtn = document.getElementById('announcement-dismiss');
  if (!modal || !titleEl || !bodyEl || !dismissBtn) return;

  // Find first unseen message
  const msg = ONE_TIME_MESSAGES.find(m => !seen.includes(m.id));
  if (!msg) return;

  titleEl.textContent = msg.title;
  bodyEl.textContent = msg.body;
  modal.style.display = 'flex';

  const dismiss = () => {
    modal.style.display = 'none';
    seen.push(msg.id);
    try { localStorage.setItem('bf_seen_messages', JSON.stringify(seen)); } catch {}
  };
  dismissBtn.onclick = dismiss;
}

function clearToast() {
  if (ui && ui.itemNameEl) {
    ui.itemNameEl.classList.remove('visible');
    _itemNameTimer = 0;
  }
}
function showToast(msg, color = '#0f0', duration = 2) {
  if (!ui || !ui.itemNameEl) return;
  clearToast();
  ui.itemNameEl.textContent = msg;
  ui.itemNameEl.style.color = color;
  ui.itemNameEl.classList.add('visible');
  _itemNameTimer = duration;
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
  [BLOCK.WOOL]: [0.91, 0.88, 0.82],
  [BLOCK.CARPET]: [0.91, 0.88, 0.82],
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

const _stepMaxParticles = 64;
const _stepPosArr = new Float32Array(_stepMaxParticles * 3);
const _stepColArr = new Float32Array(_stepMaxParticles * 3);

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
  // Update buffer — reuse pre-allocated arrays
  const n = Math.min(_stepParticles.length, _stepMaxParticles);
  for (let i = 0; i < n; i++) {
    const p = _stepParticles[i];
    _stepPosArr[i * 3] = p.x; _stepPosArr[i * 3 + 1] = p.y; _stepPosArr[i * 3 + 2] = p.z;
    const fade = Math.max(0, p.life / 0.6);
    _stepColArr[i * 3] = p.r * fade; _stepColArr[i * 3 + 1] = p.g * fade; _stepColArr[i * 3 + 2] = p.b * fade;
  }
  // Only set attributes once at init, then update existing buffers
  if (!_stepGeo._initialized) {
    _stepGeo.setAttribute('position', new THREE.BufferAttribute(_stepPosArr, 3));
    _stepGeo.setAttribute('color', new THREE.BufferAttribute(_stepColArr, 3));
    _stepGeo._initialized = true;
  }
  _stepGeo.attributes.position.needsUpdate = true;
  _stepGeo.attributes.color.needsUpdate = true;
  _stepGeo.setDrawRange(0, n);
}

// ── TNT ignition ─────────────────────────────────────────────────────
function igniteTNT(x, y, z) {
  // Replace TNT block with air and schedule explosion
  world.setBlock(x, y, z, BLOCK.AIR);

  // Fuse: 1.5 seconds
  setTimeout(() => {
    if (explosionManager) {
      explosionManager.explode(x + 0.5, y + 0.5, z + 0.5, 4);
    }
    // Damage player if nearby
    if (player) {
      const dmg = ExplosionManager.calcDamage(x + 0.5, y + 0.5, z + 0.5, player.position, 4);
      if (dmg > 0) player.takeDamage(dmg, { x: x + 0.5, y: y + 0.5, z: z + 0.5 });
      if (playerModel) playerModel.triggerHurt();
    }
  }, 1500);
}

function placeBlock(slotOverride) {
  if (player && player.isAdventure()) return;
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

  // Block place particles: small dust puff
  if (graphicsQuality !== 'low') {
    for (let i = 0; i < 4; i++) {
      const col = BLOCK_COLORS[itemId] || 0x888888;
      const mat = new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.5 });
      const m = new THREE.Mesh(_particleGeoSmall, mat);
      m.position.set(x + 0.5, y + 0.5, z + 0.5);
      scene.add(m);
      _particles.push({
        mesh: m,
        vx: (Math.random() - 0.5) * 2,
        vy: 1 + Math.random() * 2,
        vz: (Math.random() - 0.5) * 2,
        life: 0.4, maxLife: 0.4
      });
    }
  }

  // Pistons: store facing direction based on player look
  if (itemId === BLOCK.PISTON || itemId === BLOCK.STICKY_PISTON) {
    const dir = _mobileTapDir;
    camera.getWorldDirection(dir);
    const ax = Math.abs(dir.x), az = Math.abs(dir.z);
    let facing;
    if (az >= ax) {
      facing = dir.z < 0 ? 'north' : 'south';
    } else {
      facing = dir.x > 0 ? 'east' : 'west';
    }
    pistonFacings.set(`${x},${y},${z}`, facing);
  }

  // Greenstone dust: trigger power recalculation
  if (itemId === BLOCK.GREENSTONE_DUST) {
    greenstoneSystem.onBlockChange(x, y, z, itemId, world);
  }

  // Beds are 2 blocks wide — place foot block perpendicular to player facing
  if (itemId === BLOCK.BED) {
    const dirX = Math.round(-Math.sin(player.yaw));
    const dirZ = Math.round(-Math.cos(player.yaw));
    // Place foot block beside the head (perpendicular to look direction)
    const footX = x + (Math.abs(dirX) > Math.abs(dirZ) ? 0 : 1);
    const footZ = z + (Math.abs(dirX) > Math.abs(dirZ) ? (dirX >= 0 ? 1 : -1) : 0);
    if (world.getBlock(footX, y, footZ) === BLOCK.AIR) {
      world.setBlock(footX, y, footZ, BLOCK.BED_FOOT);
      if (network.isInRoom()) network.sendBlockUpdate(footX, y, footZ, BLOCK.BED_FOOT);
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
  audio.place(itemId);
  // Achievement stats: block placed
  achievements.incrementMapStat('blocksPlaced', `${itemId}`);
  achievements.incrementStat('blocksPlacedAny');
  if (itemId === BLOCK.TORCH) achievements.incrementStat('torchesPlaced');
  // XP for building (small amount)
  if (player.isSurvival()) {
    if (player.addXp(1)) ui.showLevelUp(player.level);
  }
}

// Bucket: empty bucket fills from water/lava, water/lava bucket empties into air.
// Returns true if an action was performed.
function handleBucket(held, hit) {
  if (!hit || !hit.place) return false;
  const { x, y, z } = hit.place;
  const sel = player.inventory.selected;

  if (held.item === ITEM.BUCKET) {
    const atPlace = world.getBlock(x, y, z);
    const isWater = atPlace === BLOCK.WATER || hit.block === BLOCK.WATER;
    const isLava = atPlace === BLOCK.LAVA || hit.block === BLOCK.LAVA;
    if (!isWater && !isLava) return false;
    held.count--;
    if (held.count <= 0) player.inventory.slots[sel] = null;
    if (isWater) {
      player.inventory.add(ITEM.WATER_BUCKET, 1);
    } else {
      player.inventory.add(ITEM.LAVA_BUCKET, 1);
      achievements.incrementStat('bucketLava');
    }
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

  if (held.item === ITEM.LAVA_BUCKET) {
    const px = Math.floor(player.position.x);
    const py = Math.floor(player.position.y);
    const pz = Math.floor(player.position.z);
    if ((x === px && z === pz) && (y === py || y === py + 1)) return false;
    if (world.getBlock(x, y, z) !== BLOCK.AIR) return false;
    world.setBlock(x, y, z, BLOCK.LAVA);
    if (network.isInRoom()) network.sendBlockUpdate(x, y, z, BLOCK.LAVA);
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
  if (player && player.isAdventure()) return; // adventure mode: can't break blocks

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
  const oreXp = { [BLOCK.COAL_ORE]: 2, [BLOCK.IRON_ORE]: 3, [BLOCK.GOLD_ORE]: 5, [BLOCK.DIAMOND_ORE]: 7, [BLOCK.COPPER_ORE]: 3, [BLOCK.EMERALD_ORE]: 7, [BLOCK.PRISMITE_ORE]: 10 };
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
  if (!hit || (hit.block !== BLOCK.BED && hit.block !== BLOCK.BED_FOOT)) return;
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
  // Auto-show chat-hud briefly when messages arrive (Minecraft-style)
  if (!chatOpen) {
    const hud = document.getElementById('chat-hud');
    if (hud) {
      hud.style.display = '';
      hud.style.opacity = '1';
      clearTimeout(_chatAutoHideTimer);
      _chatAutoHideTimer = setTimeout(() => {
        if (hud) hud.style.opacity = '0';
        setTimeout(() => { if (hud && !chatOpen) hud.style.display = 'none'; }, 500);
      }, 5000);
    }
  }
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
  if (hud) { hud.style.display = ''; hud.style.opacity = '1'; }
  clearTimeout(_chatAutoHideTimer);
  if (wrap) wrap.style.display = '';
  if (inp) { inp.value = prefix || ''; inp.focus(); }
  // Release pointer lock so WASD/camera controls stop
  if (document.pointerLockElement) {
    document.exitPointerLock();
  }
  // Clear all held keys so player stops moving
  for (const k in input.keys) input.keys[k] = false;
  input.mouseLeftHeld = false;
  input.mouseRightHeld = false;
}

function closeChat() {
  chatOpen = false;
  const wrap = document.getElementById('chat-input-wrap');
  if (wrap) wrap.style.display = 'none';
  const inp = document.getElementById('chat-input');
  if (inp) { inp.blur(); inp.value = ''; }
  lockPointer();
  // Start auto-hide timer so recent messages remain visible briefly
  const hud = document.getElementById('chat-hud');
  if (hud && chatHistory.length > 0) {
    clearTimeout(_chatAutoHideTimer);
    _chatAutoHideTimer = setTimeout(() => {
      if (hud) hud.style.opacity = '0';
      setTimeout(() => { if (hud && !chatOpen) hud.style.display = 'none'; }, 500);
    }, 5000);
  }
}

function submitChat() {
  const inp = document.getElementById('chat-input');
  if (!inp) return;
  const text = filterProfanity(inp.value.trim());
  closeChat();
  if (!text) return;

  if (text.startsWith('/')) {
    // Command
    const cmdPart = text.slice(1).trim().split(/\s+/)[0].toLowerCase();
    const inMultiplayer = network.connected && network.roomName;
    // Dev structure spawn commands (dev world only)
    if (isDevWorld && DEV_STRUCTURES.includes(cmdPart)) {
      if (!world) return;
      const ox = Math.floor(player.position.x);
      const oy = Math.floor(player.position.y);
      const oz = Math.floor(player.position.z);
      const bb = placeStructure(world, cmdPart, ox, oy, oz);
      if (bb) {
        const cx1 = Math.floor((bb.minX - 1) / CHUNK_SIZE);
        const cx2 = Math.floor((bb.maxX + 1) / CHUNK_SIZE);
        const cz1 = Math.floor((bb.minZ - 1) / CHUNK_SIZE);
        const cz2 = Math.floor((bb.maxZ + 1) / CHUNK_SIZE);
        for (let cx = cx1; cx <= cx2; cx++) {
          for (let cz = cz1; cz <= cz2; cz++) {
            manager.refreshAround(cx, cz);
          }
        }
      }
      addChatLine(`Placed ${cmdPart} at (${ox}, ${oy}, ${oz}).`, '#5f5');
      return;
    }
    // Dev spawn animal commands (dev world only)
    const SPAWN_ANIMALS = ['cow', 'pig', 'sheep', 'spider', 'zombie', 'skeleton', 'villager'];
    if (isDevWorld && cmdPart === 'spawn') {
      const animal = (text.slice(1).trim().split(/\s+/)[1] || '').toLowerCase();
      if (!animal || !SPAWN_ANIMALS.includes(animal)) {
        addChatLine(`Usage: /spawn <${SPAWN_ANIMALS.join('|')}>`, '#f55');
        return;
      }
      if (!mobManager || !player) return;
      const sx = player.position.x + -Math.sin(player.yaw) * 3;
      const sz = player.position.z + -Math.cos(player.yaw) * 3;
      const sy = player.position.y;
      mobManager.spawnAt(animal, sx, sy, sz);
      addChatLine(`Spawned ${animal} at (${Math.floor(sx)}, ${Math.floor(sy)}, ${Math.floor(sz)}).`, '#5f5');
      return;
    }
    // /gamemode command — works in singleplayer; in multiplayer sent to server
    if (cmdPart === 'gamemode' && !inMultiplayer) {
      const mode = (text.slice(1).trim().split(/\s+/)[1] || '').toLowerCase();
      const VALID_MODES = ['creative', 'survival', 'adventure', 'spectator'];
      if (!mode || !VALID_MODES.includes(mode)) {
        addChatLine('Usage: /gamemode <creative|survival|adventure|spectator>', '#f55');
        return;
      }
      if (player) {
        player.setGamemode(mode);
        syncUIMode();
      }
      if (currentServer) {
        currentServer.gameMode = mode;
        currentServer.save();
      }
      if (network.connected && network.roomName) {
        network.sendCommand(text);
      }
      addChatLine(`Gamemode set to ${mode}.`, '#5f5');
      return;
    }
    // /give command — singleplayer only
    if (cmdPart === 'give' && !inMultiplayer) {
      const args = text.slice(1).trim().split(/\s+/);
      const itemName = (args[1] || '').toUpperCase().replace(/ /g, '_');
      const count = parseInt(args[2]) || 1;
      if (!itemName) {
        addChatLine('Usage: /give <item> [count]', '#f55');
        return;
      }
      // Search for item by name in ITEM enum
      let foundId = null;
      for (const [key, val] of Object.entries(ITEM)) {
        if (key === itemName) { foundId = val; break; }
      }
      if (foundId == null) {
        addChatLine(`Unknown item: ${itemName}`, '#f55');
        return;
      }
      if (player) {
        player.inventory.add({ item: foundId, count });
        syncUIMode();
      }
      addChatLine(`Gave ${count}x ${itemName}.`, '#5f5');
      return;
    }
    // /time command — singleplayer only
    if (cmdPart === 'time' && !inMultiplayer) {
      const val = (text.slice(1).trim().split(/\s+/)[1] || '').toLowerCase();
      if (val === 'day' || val === '0') { dayTime = 0.01; addChatLine('Time set to day.', '#5f5'); }
      else if (val === 'night' || val === '13000') { dayTime = 0.625; addChatLine('Time set to night.', '#5f5'); }
      else if (val === 'noon') { dayTime = 0.5; addChatLine('Time set to noon.', '#5f5'); }
      else if (val === 'midnight') { dayTime = 0; addChatLine('Time set to midnight.', '#5f5'); }
      else addChatLine('Usage: /time <day|noon|night|midnight>', '#f55');
      return;
    }
    // /difficulty command — singleplayer only
    if (cmdPart === 'difficulty' && !inMultiplayer) {
      const val = (text.slice(1).trim().split(/\s+/)[1] || '').toLowerCase();
      const VALID_DIFF = ['peaceful', 'easy', 'normal', 'hard'];
      if (!val || !VALID_DIFF.includes(val)) {
        addChatLine('Usage: /difficulty <peaceful|easy|normal|hard>', '#f55');
        return;
      }
      gameDifficulty = val;
      if (player) player.difficulty = val;
      addChatLine(`Difficulty set to ${val}.`, '#5f5');
      return;
    }
    // /tp command — singleplayer only
    if (cmdPart === 'tp' && !inMultiplayer) {
      const args = text.slice(1).trim().split(/\s+/);
      if (args.length >= 4 && player) {
        const x = parseFloat(args[1]) || 0;
        const y = parseFloat(args[2]) || 0;
        const z = parseFloat(args[3]) || 0;
        player.position.set(x, y, z);
        addChatLine(`Teleported to (${x}, ${y}, ${z}).`, '#5f5');
        return;
      }
      addChatLine('Usage: /tp <x> <y> <z>', '#f55');
      return;
    }
    // /heal command — singleplayer only
    if (cmdPart === 'heal' && !inMultiplayer) {
      if (player) {
        player.health = player.maxHealth;
        player.hunger = player.maxHunger;
        player.saturation = 5;
        player.air = 300;
        player.damageTimer = 0;
        addChatLine('Health restored.', '#5f5');
      }
      return;
    }
    // /kill command — singleplayer only
    if (cmdPart === 'kill' && !inMultiplayer) {
      if (player) {
        player.health = 0;
        addChatLine('You died.', '#f55');
      }
      return;
    }
    // /weather command — singleplayer only
    if (cmdPart === 'weather' && !inMultiplayer) {
      const val = (text.slice(1).trim().split(/\s+/)[1] || '').toLowerCase();
      if (val === 'clear') { weather = 'clear'; addChatLine('Weather set to clear.', '#5f5'); }
      else if (val === 'rain' || val === 'rainy') { weather = 'rain'; addChatLine('Weather set to rain.', '#5f5'); }
      else if (val === 'thunder' || val === 'storm') { weather = 'thunder'; addChatLine('Weather set to thunder.', '#5f5'); }
      else addChatLine('Usage: /weather <clear|rain|thunder>', '#f55');
      return;
    }
    // /help command — singleplayer
    if (cmdPart === 'help') {
      const cmds = [
        '/gamemode <creative|survival|adventure|spectator>',
        '/give <item> [count]',
        '/tp <x> <y> <z>',
        '/time <day|noon|night|midnight>',
        '/difficulty <peaceful|easy|normal|hard>',
        '/weather <clear|rain|thunder>',
        '/heal — Restore health',
        '/kill — Die',
        '/help — Show this help',
      ];
      addChatLine(cmds.join('\n'), '#5f5');
      return;
    }
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
      return `<div style="display:flex;align-items:center;gap:10px;padding:10px 12px;margin-bottom:4px;background:rgba(255,255,255,0.04);border:1px solid rgba(80,80,100,0.25);border-radius:4px;cursor:pointer;transition:background 0.15s,border-color 0.15s;" data-server-name="${escHtml(s.name)}" onmouseenter="this.style.background='rgba(255,255,255,0.08)';this.style.borderColor='rgba(100,130,180,0.4)'" onmouseleave="this.style.background='rgba(255,255,255,0.04)';this.style.borderColor='rgba(80,80,100,0.25)'">
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
    network.onConnectedOnce(() => {
      network.listRooms();
      syncLocalServersToNetwork();
    });
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
    network.onConnectedOnce(() => {
      _doNetworkJoin(name, seed);
    });
    return;
  }
  _doNetworkJoin(name, seed);
}

function _doNetworkJoin(name, seed) {
  let cgUsername = '';
  try { cgUsername = window.CrazyGames?.SDK?.user?.getUsername?.() || ''; } catch {}
  let skinIdx = getStoredSkinIndex();

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

    // Start voice chat (starts muted by default) — disabled on CrazyGames builds
    // Reset _registered so re-enable sends voice_join even after auto-reconnect
    if (!isOnCrazyGames()) {
      if (!voiceChat) voiceChat = new VoiceChat(network, playerName);
      voiceChat._registered = false;
      voiceChat.setState(1); // ON_MUTED
    }

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
    const dwOpts = _pendingDevWorldOpts || {};
    _pendingDevWorldOpts = null;
    startGame('multiplayer_' + room, serverSeed, gameMode, dwOpts.diff || 'normal', { flat: !!dwOpts.flat, dev: !!dwOpts.dev });

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

  network.onPlayerArmor = (name, armor) => {
    if (mpRenderer) {
      const rp = mpRenderer.remotePlayers.get(name);
      if (rp) rp.armor = armor;
    }
  };

  network.onChat = (name, role, text) => {
    const safeText = filterProfanity(text);
    const safeName = filterProfanity(name);
    let chatHtml;
    if (role === 'server') {
      chatHtml = `<span style="color:#aaa;font-style:italic;">${escHtml(safeText)}</span>`;
    } else if (role === 'pm') {
      chatHtml = `<span style="color:#d0f;font-weight:bold;">${escHtml(safeName)}</span> <span style="color:#d0f;font-style:italic;">${escHtml(safeText)}</span>`;
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
    if (voiceChat) { voiceChat.stop(); voiceChat = null; }
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
      // In non-parkour mode, ignore blocks far above normal terrain (parkour map bleed)
      if (!isParkour && e.y > 140) continue;
      world.setBlock(e.x, e.y, e.z, e.block);
      manager.refreshAround(Math.floor(e.x / CHUNK_SIZE), Math.floor(e.z / CHUNK_SIZE));
    }
    saveCurrentWorld();
  };

  // ── Mob sync callbacks ──────────────────────────────────────────────
  network.onMobSpawn = (id, type, x, y, z) => {
    if (!mobManager) return;
    mobManager.remoteSpawn(id, type, x, y, z);
  };
  network.onMobPosition = (id, x, y, z, yaw) => {
    if (!mobManager) return;
    mobManager.remoteMove(id, x, y, z, yaw);
  };
  network.onMobDamage = (id, hp) => {
    if (!mobManager) return;
    mobManager.remoteDamage(id, hp);
  };
  network.onMobDeath = (id) => {
    if (!mobManager) return;
    mobManager.remoteDeath(id);
  };

  network.onDisconnect = () => {
    if (gameRunning && isMultiplayer) {
      if (voiceChat) { voiceChat.stop(); voiceChat = null; }
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
      if (playerModel) playerModel.triggerHurt();
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
      playerRole = msg.role || 'player';
      try {
        localStorage.setItem('bf_player_name', playerName);
        localStorage.setItem('bf_login_user', playerName);
        const pass = document.getElementById('login-password');
        if (pass) localStorage.setItem('bf_login_pass', pass.value);
      } catch (_) {}
      setSkinUser(playerName);
      const nameTag = document.getElementById('menu-player-name');
      if (nameTag) nameTag.textContent = playerName;
      _refreshDevButtons();
      // Only jump to the main menu when this auth came from the login screen —
      // not from a background re-auth (e.g. opening the Friends menu).
      if (_backgroundAuth) {
        _backgroundAuth = false;
        if (_devPanelNeedsAccounts) {
          _devPanelNeedsAccounts = false;
          network.devListAccounts();
        }
      } else {
        if (loginHint) { loginHint.style.color = '#5f5'; loginHint.textContent = msg.created ? 'Account created! Welcome, ' + playerName + '.' : 'Logged in! Welcome back, ' + playerName + '.'; }
        setTimeout(() => {
          window.location.href = '?user=' + encodeURIComponent(playerName) + '&role=' + encodeURIComponent(playerRole);
        }, 600);
      }
    } else {
      if (_backgroundAuth) {
        _backgroundAuth = false;
        if (_devPanelNeedsAccounts) {
          _devPanelNeedsAccounts = false;
          setDevAccountListMsg('Auth failed: ' + (msg.reason || 'unknown error'));
        }
      }
      if (loginHint) { loginHint.style.color = '#f85'; loginHint.textContent = msg.reason || 'Login failed.'; }
    }
  };

  network.onRoleChanged = (newRole) => {
    playerRole = newRole;
    _refreshDevButtons();
    addChatLine(`Your role has been updated to ${newRole}.`, '#5af');
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
    network.onConnectedOnce(() => _doNetworkJoin(name, seed));
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

window._exitParkourToMinigames = () => {
  gameRunning = false;
  isParkour = false;
  _isImportedParkour = false;
  _parkourLevelEnds = null;
  _importedParkourData = null;
  resetParkourState();
  const parkourHud = document.getElementById('parkour-hud');
  if (parkourHud) parkourHud.remove();
  _parkourTimerEl = null;
  _parkourLevelEl = null;
  document.getElementById('status-bars').style.display = '';
  document.getElementById('armor-bar').style.display = '';
  if (player) { saveCurrentWorld(); }
  manager?.clear?.();
  if (mobManager) { mobManager.clear(); mobManager = null; }
  if (explosionManager) { explosionManager.clear(); explosionManager = null; }
  if (playerModel) { playerModel.dispose(); playerModel = null; }
  if (rainDrops) { scene.remove(rainDrops); rainDrops = null; }
  if (droppedItemManager) { droppedItemManager.clear(); droppedItemManager = null; }
  if (mpRenderer) { mpRenderer.clear(); mpRenderer = null; }
  if (breakParticles) { breakParticles.clear(); breakParticles = null; }
  if (ambientParticles) { ambientParticles.clear(); ambientParticles = null; }
  if (cloudSystem) { cloudSystem.clear(); cloudSystem = null; }
  weather = 'clear'; weatherTimer = 0;
  try { audio.stopRain(); } catch (_) {}
  ui.showMenu('minigames');
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
let _rainSplashTimer = 0;

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
      _rainSplashTimer = (_rainSplashTimer || 0) - dt;
      for (let i = 0; i < RAIN_COUNT; i++) {
        pos[i * 3 + 1] -= rainVelocities[i] * dt;
        if (pos[i * 3 + 1] < -2) {
          // Spawn splash particle at impact (only a few per frame)
          if (_rainSplashTimer <= 0 && graphicsQuality !== 'low' && Math.random() < 0.05) {
            _rainSplashTimer = 0.08;
            const mat = new THREE.MeshBasicMaterial({ color: 0x88aacc, transparent: true, opacity: 0.4 });
            const m = new THREE.Mesh(_particleGeoTiny, mat);
            m.position.set(pos[i * 3], 0.1, pos[i * 3 + 2]);
            scene.add(m);
            _particles.push({ mesh: m, vx: (Math.random()-0.5)*0.5, vy: 0.8+Math.random()*0.5, vz: (Math.random()-0.5)*0.5, life: 0.3, maxLife: 0.3 });
          }
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
const _lerpA = new THREE.Color();
const _lerpB = new THREE.Color();
const _lerpResult = new THREE.Color();
const _nightColor = new THREE.Color();
const _whiteColor = new THREE.Color(0xffffff);
function lerpColor(a, b, t) {
  t = Math.max(0, Math.min(1, t));
  _lerpA.set(a);
  _lerpB.set(b);
  _lerpResult.copy(_lerpA).lerp(_lerpB, t);
  return _lerpResult;
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
    skyColor = _nightColor.set(NIGHT_COLOR);
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
    scene.background.lerp(_whiteColor, thunderFlash * 0.6);
  }

  // Stars: visible only at night, fade in/out with twilight.
  // Rendered as a 3D star field in the sky (follows the camera like a skybox).
  // Twinkle: vary size subtly over time
  if (starField) {
    const nightAlpha = sinA < 0 ? Math.min(1, (-sinA) / 0.3) : 0;
    starField.material.opacity = nightAlpha;
    starField.material.size = 2.2 + Math.sin(performance.now() * 0.001) * 0.3;
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

function startGame(worldId, seed, gamemode, difficulty, opts = {}) {
  isDevWorld = !!opts.dev;
  // Tear down previous game
  if (gameRunning) {
    const prevParkour = isParkour;
    isParkour = false;
    if (prevParkour) {
      document.getElementById('status-bars').style.display = '';
      document.getElementById('armor-bar').style.display = '';
    }
    _isImportedParkour = false;
    _importedParkourData = null;
    if (player) saveCurrentWorld();
    manager?.clear?.();
    if (mobManager) { mobManager.clear(); mobManager = null; }
    if (explosionManager) { explosionManager.clear(); explosionManager = null; }
    if (playerModel) { playerModel.dispose(); playerModel = null; }
    if (rainDrops) { scene.remove(rainDrops); rainDrops = null; }
    if (droppedItemManager) { droppedItemManager.clear(); droppedItemManager = null; }
      if (mpRenderer) { mpRenderer.clear(); mpRenderer = null; }
      if (voiceChat) { voiceChat.stop(); voiceChat = null; }
    if (breakParticles) { breakParticles.clear(); breakParticles = null; }
    if (ambientParticles) { ambientParticles.clear(); ambientParticles = null; }
    if (cloudSystem) { cloudSystem.clear(); cloudSystem = null; }
    weather = 'clear';
    weatherTimer = 0;
    weatherDuration = WEATHER_MIN_CLEAR + Math.random() * (WEATHER_MAX_CLEAR - WEATHER_MIN_CLEAR);
    try { audio.stopRain(); } catch (_) {}
  }

  isParkour = !!opts.parkour;
  _isImportedParkour = !!opts.importedParkour;
  currentWorldId = worldId;
  renderDist = parseInt(document.getElementById('set-render-distance')?.value) || 7;
  graphicsQuality = document.getElementById('set-quality')?.value || 'medium';
  // Mobile: hard-cap view distance so the GPU/CPU isn't meshing far chunks.
  if (IS_MOBILE) renderDist = Math.min(renderDist, 6);
  applyGraphicsQuality();
  gameDifficulty = difficulty || 'normal';

  world = new World(seed, { flat: !!opts.flat, void: !!opts.void, parkour: !!opts.parkour });
  const saved = (!isParkour) ? loadWorld(worldId) : null;
  if (saved) world.loadEdits(saved);
  manager = new ChunkMeshManager(scene, world, atlasTexture);
  loader = new ChunkLoader(world, manager, renderDist);
  explosionManager = new ExplosionManager(scene, world, audio);
  mobManager = new MobManager(scene, world, audio, explosionManager);
  mobManager.networkSend = {
    sendMobSpawn: (id, type, x, y, z) => network.sendMobSpawn(id, type, x, y, z),
    sendMobPosition: (id, x, y, z, yaw) => network.sendMobPosition(id, x, y, z, yaw),
    sendMobDeath: (id) => network.sendMobDeath(id),
  };
  droppedItemManager = new DroppedItemManager(scene, atlasCanvas);
  mpRenderer = new MultiplayerRenderer(scene);
  breakParticles = new BreakParticles(scene);
  ambientParticles = new AmbientParticles(scene);
  cloudSystem = new CloudSystem(scene);
  initRain();
  playerModel = new PlayerModel(scene, getSelectedSkin(), atlasCanvas);
  { const sk = getSelectedSkin(); viewmodel.setSkinColor(sk?.skin, sk?.skin2); }

  scene.fog.far = 16 * (renderDist + 2);
  scene.fog.near = 16 * 5;

  // Apply FOV and volume at world load
  camera.fov = parseInt(document.getElementById('set-fov')?.value) || 75;
  camera.updateProjectionMatrix();
  showFps = (document.getElementById('set-fps')?.value || '1') !== '0';
  const vol = parseInt(document.getElementById('set-volume')?.value) || 50;
  if (audio && audio.master) audio.master.gain.value = Math.max(0, Math.min(100, vol)) / 100;

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
      } else if (hit && (hit.block === BLOCK.BED || hit.block === BLOCK.BED_FOOT)) {
        trySleep();
      } else if (hit && (hit.block === BLOCK.OAK_DOOR || hit.block === BLOCK.IRON_DOOR)) {
        const doorKey = `${hit.x},${hit.y},${hit.z}`;
        const state = doorStates.get(doorKey);
        if (state) {
          world.setBlock(hit.x, hit.y, hit.z, state.blockId);
          doorStates.delete(doorKey);
        } else {
          doorStates.set(doorKey, { blockId: hit.block });
          world.setBlock(hit.x, hit.y, hit.z, BLOCK.AIR);
        }
        manager.refreshAround(Math.floor(hit.x / CHUNK_SIZE), Math.floor(hit.z / CHUNK_SIZE));
      } else if (hit && hit.block === BLOCK.LEVER) {
        const leverKey = `${hit.x},${hit.y},${hit.z}`;
        const existing = redstoneStates.get(leverKey);
        if (existing && existing.expiresAt === Infinity) {
          redstoneStates.delete(leverKey);
          greenstoneSystem.clearPower(hit.x, hit.y, hit.z);
        } else {
          redstoneStates.set(leverKey, { blockId: hit.block, expiresAt: Infinity });
          greenstoneSystem.setPower(hit.x, hit.y, hit.z, 15);
        }
      } else if (hit && hit.block === BLOCK.STONE_BUTTON) {
        const btnKey = `${hit.x},${hit.y},${hit.z}`;
        if (!redstoneStates.has(btnKey)) {
          redstoneStates.set(btnKey, { blockId: hit.block, expiresAt: performance.now() + 1500 });
          greenstoneSystem.setPower(hit.x, hit.y, hit.z, 15);
        }
      } else {
        let used = false;
        const slot = player.inventory.getSelected();
        if (player.isSurvival() && slot && isFood(slot.item)) {
          if (player.eat(foodValue(slot.item))) {
            slot.count--;
            if (slot.count <= 0) player.inventory.slots[player.inventory.selected] = null;
            syncUIMode();
            achievements.incrementStat('foodEaten');
            if (slot.item === ITEM.PORKCHOP_COOKED) achievements.incrementStat('foodEatenPorkchop');
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
              if (oh.item === ITEM.PORKCHOP_COOKED) achievements.incrementStat('foodEatenPorkchop');
              try { audio.eatBite(); } catch (_) {}
            }
          } else if (isBlockItem(oh.item)) {
            placeBlock(oh);
          }
        }
      }
    },
    onAim(x, y) {
      mobileAimPoint = { x, y };
    },
    onAimEnd() {
      mobileAimPoint = null;
    },
    onBreakTap(x, y) {
      // Quick tap on a block: break the block under the finger.
      if (!gameRunning) return;
      audio.resume();
      const hit = screenTarget(x, y);
      if (!hit) return;
      const b = world.getBlock(hit.x, hit.y, hit.z);
      if (b == null || b === BLOCK.AIR) return;
      doBreak(hit, b);
      viewmodel.swing();
      audio.dig(b);
    },
    onAttack(x, y) {
      // Returns true if the tap hit a mob (so it's an attack, not a break).
      if (!gameRunning || !mobManager || !player) return false;
      const { origin, dir } = screenRay(x, y);
      const mobHit = mobManager.hitTest(origin, dir, REACH);
      if (!mobHit) return false;
      const atkSlot = player.inventory.getSelected();
      const atkTool = atkSlot && isTool(atkSlot.item) ? toolInfo(atkSlot.item) : null;
      const attackDamage = atkTool ? atkTool.swordDmg || 1 : 1;
      const crit = isCriticalHit();
      const finalDmg = crit ? Math.ceil(attackDamage * 1.5) : attackDamage;
      mobHit.takeDamage(finalDmg, camera.position);
      audio.hit();
      if (crit) spawnCritParticles(mobHit.position);
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
    onDrop() {
      if (!gameRunning) return;
      const slot = player.inventory.getSelected();
      if (slot) {
        if (droppedItemManager) {
          droppedItemManager.drop(slot.item, 1, player.position.x, player.position.y + 1, player.position.z);
        }
        slot.count--;
        if (slot.count <= 0) player.inventory.slots[player.inventory.selected] = null;
        syncUIMode();
      }
    },
    onSwapHands() {
      if (!gameRunning) return;
      const sel = player.inventory.selected;
      const curSlot = player.inventory.slots[sel];
      const offhand = player.inventory.offhand;
      if (curSlot || offhand) {
        player.inventory.slots[sel] = offhand || null;
        player.inventory.offhand = curSlot || null;
        syncUIMode();
      }
    },
    onPerspective() {
      if (!gameRunning || !player) return;
      player.cycleCamera();
      const modes = ['First Person', 'Third Person (Behind)', 'Third Person (Front)'];
      ui.itemNameEl.textContent = modes[player.cameraMode];
      ui.itemNameEl.classList.add('visible');
      _itemNameTimer = 1.5;
    },
    onCommand() {
      if (!gameRunning || chatDisabled) return;
      openChat('/');
    },
    onVoice() {
      if (!gameRunning || !voiceChat || isOnCrazyGames()) return;
      voiceChat.togglePanel();
    },
    onExit() {
      if (!gameRunning) return;
      ui.hidePause();
      saveCurrentWorld();
      cgGameplayStop();
      if (isMultiplayer) network.leaveRoom();
      try { window.CrazyGames?.SDK?.game?.setRoom?.(null); } catch (_) {}
      if (isParkour) showMinigames();
      else showWorldList();
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
    if (isMultiplayer && playerName && currentWorldId) {
      const mpInv = loadMultiplayerInventory(currentWorldId, playerName);
      if (mpInv) player.inventory.load(mpInv);
    }
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
    if (!isParkour) player.spawn();
  }

  // Dev world is always creative and spawns on the flat surface.
  if (isDevWorld) {
    player.setGamemode('creative');
    player.position.set(0.5, 6, 0.5);
    player.velocity.set(0, 0, 0);
    player.spawnPoint.set(0.5, 6, 0.5);
  }

  // ── Parkour mode ───
  let parkourLoadPromise = null;
  if (isParkour) {
    player.setGamemode('adventure');
    if (mobManager) { mobManager.clear(); }
    dayTime = 0.3;
    weather = 'clear';
    weatherTimer = 0;
    if (player.inventory) {
      player.inventory.slots.fill(null);
      player.inventory.offhand = null;
    }

    parkourLoadPromise = (async () => {
      if (_isImportedParkour) {
        // Load imported Minecraft parkour map from binary
        console.log('[Parkour] Loading imported map...');
        const mapUrl = (typeof assetBase === 'function' ? assetBase() : '') + 'parkour-chunks.bin.gz';
        const data = await loadImportedParkourChunks(mapUrl);
        _importedParkourData = data;
        const spawn = buildImportedParkour(world, data);
        player.position.set(spawn.x, spawn.y, spawn.z);
        player.velocity.set(0, 0, 0);
        player.spawnPoint.set(spawn.x, spawn.y, spawn.z);
        startParkourTimer();
      } else {
        // Build procedural parkour levels in a clean void world
        const PARKOUR_Y = 200;
        console.log('[Parkour] Building procedural levels...');
        resetParkourState();
        buildParkourLobby(world, 0, PARKOUR_Y, 0);
        _parkourLevelEnds = buildAllLevels(world, 0, PARKOUR_Y, -12);

        // Spawn at procedural lobby
        player.position.set(0.5, PARKOUR_Y + 2, 0.5);
        player.velocity.set(0, 0, 0);
        player.spawnPoint.set(0.5, PARKOUR_Y + 2, 0.5);
        startParkourTimer();
      }

      // Create parkour HUD elements
      _parkourTimerEl = document.getElementById('parkour-timer');
      _parkourLevelEl = document.getElementById('parkour-level');
      if (!_parkourTimerEl) {
        const hud = document.createElement('div');
        hud.id = 'parkour-hud';
        hud.style.cssText = 'position:fixed;top:10px;right:10px;z-index:100;pointer-events:none;text-align:right;font-family:monospace;';
        hud.innerHTML = '<div id="parkour-level" style="font:bold 14px monospace;color:#ff0;text-shadow:0 1px 3px #000;"></div><div id="parkour-timer" style="font:bold 18px monospace;color:#fff;text-shadow:0 1px 3px #000;"></div>';
        document.body.appendChild(hud);
        _parkourTimerEl = document.getElementById('parkour-timer');
        _parkourLevelEl = document.getElementById('parkour-level');
      }
    })();
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

  // For parkour: load the binary map FIRST so _chunkEdits are populated
  // before any chunks are generated. Without this, primeAsync generates
  // empty chunks because _chunkEdits is still empty during generateChunk().
  const _parkourReady = parkourLoadPromise
    ? parkourLoadPromise.then(() => ui.updateLoading(5, 'Parkour map loaded.'))
    : Promise.resolve();

  _parkourReady.then(() => {
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
        try { audio.init(); audio.resume(); audio.startMusic(); audio.loadSfx(); } catch (_) {}
        if (!hasTutorialBeenSeen()) {
          setTimeout(() => showTutorial(), 500);
        }
      }, 400);
    });
  });
}

function saveCurrentWorld() {
  if (isDevWorld || isParkour) return;
  // Upload stats to server for dev panel
  if (isMultiplayer && network && network.connected && achievements && achievements.stats) {
    network._send({ type: 'player_stats_set', stats: achievements.stats });
  }
  if (!currentWorldId || !world || !player) return;

  // In multiplayer, save inventory per-player so each player has their own
  const playerData = {
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
  };
  if (isMultiplayer && playerName) {
    saveMultiplayerInventory(currentWorldId, playerName, playerData.inventory);
    const perPlayer = { ...playerData, inventory: undefined };
    saveWorld(currentWorldId, { ...world.serializeEdits(), player: perPlayer });
  } else {
    saveWorld(currentWorldId, { ...world.serializeEdits(), player: playerData });
  }
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

  // Migrate old save + purge leaked dev worlds
  migrateLegacy();
  cleanDevWorldsFromPlayerList();

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
        network.onConnectedOnce(() => _doNetworkJoin(roomId));
      }
    });
  } catch (_) {}

  // Client-side keepalive: ping server every 5 min while tab is open
  setInterval(() => {
    fetch(MP_SERVER_URL + '/health').catch(() => {});
  }, 300000);

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
            network.onConnectedOnce(() => _doNetworkJoin(roomId));
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
          network.onConnectedOnce(() => _doNetworkJoin(joinRoom));
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
  setSkinUser(playerName);

  // Load ALL settings from localStorage
  function loadSetting(id, key) {
    try {
      const v = localStorage.getItem(key);
      if (v !== null) {
        const el = document.getElementById(id);
        if (el) el.value = v;
      }
    } catch (_) {}
  }
  loadSetting('set-render-distance', 'bf_render_dist');
  loadSetting('set-fov', 'bf_fov');
  loadSetting('set-autojump', 'bf_autojump');
  loadSetting('set-fps', 'bf_fps');
  loadSetting('set-quality', 'bf_quality');

  // Load mouse sensitivity setting (also applies it live)
  try {
    const sens = localStorage.getItem('bf_sensitivity');
    if (sens !== null) {
      const el = document.getElementById('set-sensitivity');
      if (el) el.value = sens;
      mouseSensitivity = Math.max(0.2, Math.min(2.0, parseInt(sens) / 100));
      window.__mouseSens = mouseSensitivity;
    }
  } catch (_) {}

  // Load volume setting (applied to audio when audio is initialized)
  try {
    const vol = localStorage.getItem('bf_volume');
    if (vol !== null) {
      const el = document.getElementById('set-volume');
      if (el) el.value = vol;
      const volNum = Math.max(0, Math.min(100, parseInt(vol) || 50)) / 100;
      if (audio && audio.master) audio.master.gain.value = volNum;
    }
  } catch (_) {}

  // Load FPS setting into a module-level flag
  showFps = (document.getElementById('set-fps')?.value || '1') !== '0';
  // Apply FOV from loaded setting
  const fovVal = parseInt(document.getElementById('set-fov')?.value) || 75;
  camera.fov = fovVal;
  camera.updateProjectionMatrix();

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
    cgHappyTime();
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
  document.getElementById('set-render-distance')?.addEventListener('change', (e) => {
    renderDist = parseInt(e.target.value) || 7;
    if (IS_MOBILE) renderDist = Math.min(renderDist, 6);
    try { localStorage.setItem('bf_render_dist', e.target.value); } catch (_) {}
    // Apply to current world if loaded
    scene.fog.far = 16 * (renderDist + 2);
    scene.fog.near = 16 * 5;
    if (loader && loader.setRadius) loader.setRadius(renderDist);
  });
  document.getElementById('set-fov')?.addEventListener('change', (e) => {
    camera.fov = parseInt(e.target.value) || 75;
    camera.updateProjectionMatrix();
    try { localStorage.setItem('bf_fov', e.target.value); } catch (_) {}
  });
  document.getElementById('set-autojump')?.addEventListener('change', (e) => {
    if (player) player.autoJump = e.target.value !== '0';
    try { localStorage.setItem('bf_autojump', e.target.value); } catch (_) {}
  });
  document.getElementById('set-volume')?.addEventListener('change', (e) => {
    const vol = Math.max(0, Math.min(100, parseInt(e.target.value) || 50)) / 100;
    if (audio && audio.master) audio.master.gain.value = vol;
    try { localStorage.setItem('bf_volume', e.target.value); } catch (_) {}
  });
  document.getElementById('set-fps')?.addEventListener('change', (e) => {
    showFps = e.target.value !== '0';
    try { localStorage.setItem('bf_fps', e.target.value); } catch (_) {}
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

  // --- Minigames menu ---
  document.getElementById('btn-minigames')?.addEventListener('click', () => {
    ui.showMenu('minigames');
  });
  document.getElementById('btn-minigames-back')?.addEventListener('click', () => {
    ui.showMenu('main');
  });

  // Coming-soon minigames
  const MG_COMING = ['bedwars','skywars','murder','blockzones','99nights','gunaffairs','miningsim','gunsurvival'];
  for (const id of MG_COMING) {
    document.getElementById('btn-minigame-' + id)?.addEventListener('click', (e) => {
      const names = { bedwars:'BedWars', skywars:'SkyWars', murder:'Murder Mystery', blockzones:'BlockZones',
        '99nights':'99 Nights', gunaffairs:'Gun Affairs', miningsim:'Mining Sim', gunsurvival:'Gun Survival' };
      showToast(names[id] + ' — Coming Soon!', '#fa0');
    });
  }

  // Parkour → mode select
  document.getElementById('btn-minigame-parkour')?.addEventListener('click', () => {
    ui.showMenu('parkour-select');
  });
  document.getElementById('btn-pk-back')?.addEventListener('click', () => {
    ui.showMenu('minigames');
  });

  // Parkour singleplayer — start fresh game directly
  document.getElementById('btn-pk-singleplayer')?.addEventListener('click', () => {
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    startGame(id, Math.floor(Math.random() * 1e9), 'adventure', 'peaceful', { parkour: true });
  });
  // Parkour 100 Levels — load imported Minecraft map
  document.getElementById('btn-pk-100-levels')?.addEventListener('click', () => {
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    startGame(id, 0, 'adventure', 'peaceful', { parkour: true, importedParkour: true });
  });
  // Parkour saved worlds list
  document.getElementById('btn-pk-worlds')?.addEventListener('click', () => {
    renderParkourWorldList();
    ui.showMenu('parkour-worlds');
  });
  // Parkour worlds list (saved worlds)
  document.getElementById('btn-pk-worlds-back')?.addEventListener('click', () => {
    ui.showMenu('parkour-select');
  });
  document.getElementById('btn-new-pk-world')?.addEventListener('click', () => {
    const w = createWorld('Parkour World', Math.floor(Math.random() * 1e9), 'adventure', 'peaceful', { parkour: true });
    startGame(w.id, w.seed, 'adventure', 'peaceful', { parkour: true });
  });

  // Parkour multiplayer → quick-join a parkour server
  document.getElementById('btn-pk-multiplayer')?.addEventListener('click', () => {
    showToast('Multiplayer Parkour — Coming Soon!', '#5f5');
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
    // Hide superflat option — only available in Dev World screen
    const cb = document.getElementById('cb-flat-world');
    const cbLabel = cb ? cb.parentElement : null;
    if (cb) cb.checked = false;
    if (cbLabel) cbLabel.style.display = 'none';
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
    const flatWorld = document.getElementById('cb-flat-world')?.checked || false;
    const w = createWorld(name, seed, mode, diff, { flat: flatWorld });
    startGame(w.id, w.seed, w.gamemode, w.difficulty, { flat: w.flat });
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
  // Key bindings don't apply on touch devices — hide the button on mobile.
  const _controlsBtn = document.getElementById('btn-open-controls');
  if (_controlsBtn && IS_MOBILE) _controlsBtn.style.display = 'none';
  _controlsBtn?.addEventListener('click', () => {
    if (IS_MOBILE) return;
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

  // --- Linked Accounts ---
  const linkedAccountsBtn = document.getElementById('btn-linked-accounts');
  const linkedAccountsBackBtn = document.getElementById('btn-linked-accounts-back');
  const linkedAccountsList = document.getElementById('linked-accounts-list');

  function showLinkedAccounts() {
    if (!linkedAccountsList) return;
    network.onLinkIdentityResult = (msg) => {
      if (msg.ok) {
        showToast('Account linked!', '#5f5', 3);
        showLinkedAccounts();
      } else {
        showToast('Link failed: ' + (msg.reason || ''), '#f44', 4);
      }
    };
    network.onStartOAuthLinkResult = (msg) => {
      if (msg.ok && msg.linkToken) {
        const serverUrl = BACKEND_URL.replace(/^wss?:\/\//, 'https://');
        const origin = window.location.origin;
        const provider = _pendingLinkProvider;
        if (!provider) return;
        const popup = window.open(`${serverUrl}/auth/${provider}?origin=${encodeURIComponent(origin)}&linkToken=${msg.linkToken}`, 'oauth', 'width=600,height=700');
        if (!popup) { showToast('Please allow popups for linking', '#ff0', 4); return; }
        const linkTimer = setTimeout(() => window.removeEventListener('message', linkHandler), 120000);
        const linkHandler = (e) => {
          if (e.origin !== serverUrl) return;
          if (e.data && e.data.provider === provider) {
            window.removeEventListener('message', linkHandler);
            clearTimeout(linkTimer);
            if (e.data.error) showToast('Link failed: ' + e.data.error, '#f44', 4);
            else if (e.data.linked) showToast('Account linked!', '#5f5', 3);
            showLinkedAccounts();
          }
        };
        window.addEventListener('message', linkHandler);
      }
    };
    const providers = [
      { id: 'github', label: 'GitHub' },
      { id: 'google', label: 'Google' },
      { id: 'crazygames', label: 'CrazyGames' },
    ];
    _linkedAccountCallback = (msg) => {
      if (msg.type === 'dev_account_detail' && msg.account) {
        const links = msg.account.identities || {};
        let html = '';
        for (const p of providers) {
          const linked = links[p.id];
          html += `<div class="settings-row" style="justify-content:space-between;">
            <span>${p.label}</span>
            <span>${linked ? '<span style="color:#5f5">✓ Linked</span>' : '<span style="color:#888">Not linked</span>'}</span>
            <button class="menu-btn" style="font-size:12px;padding:4px 12px;" data-link-provider="${p.id}">
              ${linked ? 'Unlink' : 'Link'}
            </button>
          </div>`;
        }
        linkedAccountsList.innerHTML = html;
        linkedAccountsList.querySelectorAll('[data-link-provider]').forEach(btn => {
          btn.addEventListener('click', () => {
            const prov = btn.dataset.linkProvider;
            const links2 = msg.account.identities || {};
            if (links2[prov]) {
              showToast('Unlink not available yet', '#ff0', 3);
            } else {
              _pendingLinkProvider = prov;
              if (prov === 'crazygames') {
                crazyGamesSDK().then(sdk => {
                  if (!sdk) { showToast('Not on CrazyGames', '#ff0', 3); return; }
                  const cgId = sdk.user?.getId?.() || sdk.user?.getUsername?.();
                  if (cgId) network.linkIdentity('crazygames', cgId);
                  else showToast('No CG identity found', '#f44', 3);
                });
              } else {
                network.startOAuthLink(prov);
              }
            }
          });
        });
      }
    };
    if (playerName) network.devGetAccount(playerName);
  }

  if (linkedAccountsBtn) linkedAccountsBtn.addEventListener('click', () => {
    ui.showMenu('linked-accounts');
    showLinkedAccounts();
  });
  if (linkedAccountsBackBtn) linkedAccountsBackBtn.addEventListener('click', () => {
    ui.showMenu('settings');
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
    try { audio.loadSfx(); } catch (_) {}
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
    cgMidgameAd({
      adStarted() { audio.stopMusic(); },
      adFinished() { if (isParkour) showMinigames(); else showWorldList(); },
      adError() { if (isParkour) showMinigames(); else showWorldList(); },
    });
  });

  function showWorldList() {
    gameRunning = false;
    ui.showMenu('worlds');
    renderWorldList();
  }

  function showMinigames() {
    gameRunning = false;
    isParkour = false;
    ui.showMenu('minigames');
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
      adFinished() { if (isParkour) showMinigames(); else deathQuitToMenu(); },
      adError() { if (isParkour) showMinigames(); else deathQuitToMenu(); },
    });
  });

  function deathQuitToMenu() {
    gameRunning = false;
    ui.showMenu('worlds');
    renderWorldList();
  }

  // --- Dev Panel (GameDev account or Dev role) ---
  let devAccountsCache = [];
  let devSelectedAccount = null;
  const devBtn = document.getElementById('btn-dev-panel');
  if (devBtn) {
    devBtn.addEventListener('click', () => {
      // Populate server stats from client-side analytics
      document.getElementById('dev-dau').textContent = getTodayUsers();
      document.getElementById('dev-mau').textContent = getThisMonthUsers();
      document.getElementById('dev-servers').textContent = getTotalServersCreated();
      document.getElementById('dev-account-detail').style.display = 'none';
      devSelectedAccount = null;
      devAccountsCache = [];
      renderDevAccountList();
      ui.showMenu('dev-panel');
      // Ensure connection before fetching accounts
      const doDevFetch = () => {
        if (network && network.connected) {
          network.devListAccounts();
        } else if (network) {
          setDevAccountListMsg('Connecting...');
          _devPanelNeedsAccounts = true;
          _backgroundAuth = true;
          const url = network.serverUrl || MP_SERVER_URL;
          network.onConnectedOnce(() => {
            const pass = localStorage.getItem('bf_login_pass') || '';
            network.sendAuth(playerName, pass, 'login');
          });
          if (!network.connected) network.connect(url);
          // Timeout after 8s
          setTimeout(() => {
            if (_devPanelNeedsAccounts) {
              _devPanelNeedsAccounts = false;
              _backgroundAuth = false;
              if (!network.connected) setDevAccountListMsg('Server unreachable. Check your connection.');
            }
          }, 8000);
        } else {
          setDevAccountListMsg('Network not available');
        }
      };
      doDevFetch();
    });
  }

  // Dev account search filter
  document.getElementById('dev-account-search')?.addEventListener('input', () => {
    renderDevAccountList();
  });

  // Dev panel message handler
  network.onDevMessage = (msg) => {
    if (msg.type === 'dev_account_list') {
      devAccountsCache = msg.accounts || [];
      renderDevAccountList();
    } else if (msg.type === 'dev_account_detail') {
      if (_linkedAccountCallback) {
        _linkedAccountCallback(msg);
        return;
      }
      if (msg.error) {
        renderDevAccountDetail({ error: msg.error });
        return;
      }
      renderDevAccountDetail(msg);
    } else if (msg.type === 'dev_set_tag_result') {
      if (!msg.ok) { addChatLine(`Tag error: ${msg.reason}`, '#f55'); return; }
      addChatLine(`Tag updated`, '#5f5');
      // Refresh account list and selected detail
      if (devSelectedAccount) network.devGetAccount(devSelectedAccount);
      network.devListAccounts();
    } else if (msg.type === 'dev_set_role_result') {
      if (!msg.ok) { addChatLine(`Role error: ${msg.reason}`, '#f55'); return; }
      addChatLine(`${msg.username} role set to ${msg.role}`, '#5f5');
      if (devSelectedAccount) network.devGetAccount(devSelectedAccount);
      network.devListAccounts();
    } else if (msg.type === 'dev_delete_account_result') {
      if (!msg.ok) { addChatLine(`Delete error: ${msg.reason}`, '#f55'); return; }
      addChatLine(`Account "${msg.username}" deleted`, '#f55');
      devSelectedAccount = null;
      const detail = document.getElementById('dev-account-detail');
      if (detail) detail.style.display = 'none';
      network.devListAccounts();
    }
  };

  // Dev panel back
  const devBackBtn = document.getElementById('dev-panel-back');
  if (devBackBtn) {
    devBackBtn.addEventListener('click', () => ui.showMenu('main'));
  }

  function setDevAccountListMsg(text) {
    const list = document.getElementById('dev-account-list');
    if (list) list.innerHTML = `<div style="font:12px monospace;color:#888;text-align:center;padding:10px;">${text}</div>`;
  }

  function renderDevAccountList() {
    const list = document.getElementById('dev-account-list');
    if (!list) return;
    const search = (document.getElementById('dev-account-search')?.value || '').toLowerCase();
    const filtered = devAccountsCache.filter(a => a.username.toLowerCase().includes(search));
    if (filtered.length === 0) {
      list.innerHTML = '<div style="font:12px monospace;color:#888;text-align:center;padding:10px;">No accounts found</div>';
      return;
    }
    list.innerHTML = filtered.map(a => {
      const isDev = a.role === 'dev' || a.role === 'gamedev' || a.role === 'owner';
      const roleColor = a.role === 'gamedev' ? '#0ff' : a.role === 'owner' ? '#fa0' : a.role === 'dev' ? '#5af' : '#888';
      const tagDisplay = a.tag ? `<span style="color:#5f5;font-size:10px;"> [${escHtml(a.tag)}]</span>` : '';
      const sel = devSelectedAccount === a.username ? 'background:rgba(80,150,255,0.2);' : '';
      return `<div data-username="${escHtml(a.username)}" style="cursor:pointer;padding:5px 8px;border-radius:4px;${sel}font:12px monospace;color:#ddd;display:flex;align-items:center;gap:6px;">
        <span style="color:${roleColor};font-weight:bold;">${isDev ? '★' : '·'}</span>
        <span>${escHtml(a.username)}${tagDisplay}</span>
        <span style="margin-left:auto;font-size:10px;color:${roleColor};">${a.role.toUpperCase()}</span>
      </div>`;
    }).join('');
    // Click to select account
    list.querySelectorAll('[data-username]').forEach(el => {
      el.addEventListener('click', () => {
        const username = el.dataset.username;
        devSelectedAccount = username;
        // Highlight selected
        list.querySelectorAll('[data-username]').forEach(e => e.style.background = '');
        el.style.background = 'rgba(80,150,255,0.2)';
        // Show loading
        const detail = document.getElementById('dev-account-detail');
        if (detail) { detail.style.display = 'block'; detail.innerHTML = '<div style="font:12px monospace;color:#888;text-align:center;">Loading...</div>'; }
        network.devGetAccount(username);
      });
    });
  }

  function renderDevAccountDetail(data) {
    const detail = document.getElementById('dev-account-detail');
    if (!detail) return;
    if (data.error) {
      detail.innerHTML = `<div style="font:12px monospace;color:#f55;text-align:center;">${escHtml(data.error)}</div>`;
      return;
    }
    const isDevRole = data.role === 'dev' || data.role === 'gamedev' || data.role === 'owner';
    const roleColor = data.role === 'gamedev' ? '#0ff' : data.role === 'owner' ? '#fa0' : data.role === 'dev' ? '#5af' : '#888';
    const stats = data.stats || {};
    const playTime = stats.playTime ? Math.round(stats.playTime / 60) + 'm' : '—';
    const blocksBroken = stats.totalBlocksBroken || stats.blocksBrokenAny || 0;
    const deaths = stats.deaths || 0;
    const mobKills = stats.mobKillsAny || 0;

    detail.innerHTML = `
      <div style="font:bold 14px monospace;color:#fff;margin-bottom:8px;">${escHtml(data.username)}</div>
      <div class="settings-row" style="margin:0 0 4px;">
        <label>Role</label>
        <div style="display:flex;gap:6px;align-items:center;">
          <span id="dev-detail-role" style="font:12px monospace;color:${roleColor};font-weight:bold;">${data.role.toUpperCase()}</span>
          ${data.role !== 'owner' && data.role !== 'gamedev' ? `
            <button id="dev-role-promote" style="padding:2px 8px;font:10px monospace;border-radius:3px;border:1px solid #5af;background:rgba(80,150,255,0.15);color:#5af;cursor:pointer;">${isDevRole ? 'DEMOTE' : 'PROMOTE'}</button>
          ` : ''}
        </div>
      </div>
      <div class="settings-row" style="margin:0 0 4px;">
        <label>Tag</label>
        <div style="display:flex;gap:4px;align-items:center;flex:1;">
          <span id="dev-detail-tag" style="font:12px monospace;color:${data.tag ? '#5f5' : '#666'};">${data.tag ? escHtml(data.tag) : '(none)'}</span>
          <input id="dev-tag-input" type="text" placeholder="Set tag..." maxlength="20" value="${escHtml(data.tag || '')}" style="flex:1;min-width:0;padding:3px 6px;background:rgba(0,0,0,0.4);color:#fff;border:1px solid rgba(100,100,100,0.3);border-radius:3px;font:11px monospace;outline:none;" />
          <button id="dev-tag-save" style="padding:3px 8px;font:10px monospace;border-radius:3px;border:1px solid #5f5;background:rgba(80,255,80,0.1);color:#5f5;cursor:pointer;">SAVE</button>
        </div>
      </div>
      <div style="font:bold 10px monospace;color:#5af;margin:8px 0 4px;">STATS</div>
      <div style="display:flex;flex-wrap:wrap;gap:4px;">
        <div style="background:rgba(0,0,0,0.25);border-radius:4px;padding:3px 8px;font:10px monospace;">
          <span style="color:#888;">Playtime </span><span style="color:#fff;">${playTime}</span>
        </div>
        <div style="background:rgba(0,0,0,0.25);border-radius:4px;padding:3px 8px;font:10px monospace;">
          <span style="color:#888;">Blocks </span><span style="color:#fff;">${blocksBroken}</span>
        </div>
        <div style="background:rgba(0,0,0,0.25);border-radius:4px;padding:3px 8px;font:10px monospace;">
          <span style="color:#888;">Kills </span><span style="color:#fff;">${mobKills}</span>
        </div>
        <div style="background:rgba(0,0,0,0.25);border-radius:4px;padding:3px 8px;font:10px monospace;">
          <span style="color:#888;">Deaths </span><span style="color:#f55;">${deaths}</span>
        </div>
      </div>
      <div style="font:bold 10px monospace;color:#5af;margin:6px 0 2px;">ACHIEVEMENTS</div>
      <div style="font:10px monospace;color:#aaa;max-height:80px;overflow-y:auto;">
        ${Object.entries(stats).filter(([k]) => k !== 'playTime' && k !== 'totalBlocksBroken' && k !== 'deaths' && k !== 'mobKillsAny').map(([k, v]) => {
          if (typeof v === 'number' && v > 0) return `<div>${k}: ${v}</div>`;
          return '';
        }).filter(Boolean).join('') || '<span style="color:#666;">No data</span>'}
      </div>
      ${data.username !== 'LogicLeague' && data.role !== 'gamedev' ? `
      <div style="margin-top:8px;border-top:1px solid rgba(255,80,80,0.3);padding-top:6px;">
        <button id="dev-delete-account" style="padding:4px 12px;font:10px monospace;border-radius:3px;border:1px solid #f55;background:rgba(255,60,60,0.15);color:#f55;cursor:pointer;">DELETE ACCOUNT</button>
      </div>` : ''}
    `;

    // Wire tag save
    const tagSave = detail.querySelector('#dev-tag-save');
    if (tagSave) {
      tagSave.addEventListener('click', () => {
        const input = detail.querySelector('#dev-tag-input');
        const val = (input?.value || '').trim();
        network.devSetTag(data.username, val);
      });
    }

    // Wire role promote/demote
    const roleBtn = detail.querySelector('#dev-role-promote');
    if (roleBtn) {
      roleBtn.addEventListener('click', () => {
        const newRole = isDevRole ? 'player' : 'dev';
        network.devSetRole(data.username, newRole);
      });
    }

    // Wire delete account
    const deleteBtn = detail.querySelector('#dev-delete-account');
    if (deleteBtn) {
      deleteBtn.addEventListener('click', () => {
        if (confirm(`Are you sure you want to delete "${data.username}"? This cannot be undone.`)) {
          network.devDeleteAccount(data.username);
        }
      });
    }
  }

  // --- Dev World — dev account shows separate dev world list ---
  const devWorldBtn = document.getElementById('btn-dev-world');
  if (devWorldBtn) {
    devWorldBtn.addEventListener('click', () => {
      ui.showMenu('dev-worlds');
      renderDevWorldList();
    });
  }
  document.getElementById('btn-dev-worlds-back')?.addEventListener('click', () => {
    ui.showMenu('main');
  });
  document.getElementById('btn-new-dev-world')?.addEventListener('click', () => {
    const form = document.getElementById('dev-world-create-form');
    const list = document.getElementById('dev-world-list');
    if (form) form.style.display = form.style.display === 'none' ? '' : 'none';
    if (list) list.style.display = form.style.display === 'none' ? '' : 'none';
    // Reset form selections
    _dwState = { mode: 'creative', diff: 'normal', terrain: 'flat', mp: 'solo', maxPlayers: 10 };
    _updateDWForm();
  });
  document.getElementById('dw-create-cancel')?.addEventListener('click', () => {
    const form = document.getElementById('dev-world-create-form');
    const list = document.getElementById('dev-world-list');
    if (form) form.style.display = 'none';
    if (list) list.style.display = '';
  });

  // Dev world creation form: mode buttons
  document.querySelectorAll('.dw-mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.dw-mode-btn').forEach(b => { b.classList.remove('selected'); b.style.borderColor = '#555'; b.style.color = '#888'; b.style.background = 'rgba(100,100,100,0.2)'; });
      btn.classList.add('selected'); btn.style.borderColor = '#0ff'; btn.style.color = '#0ff'; btn.style.background = 'rgba(0,255,255,0.15)';
      _dwState.mode = btn.dataset.mode;
    });
  });
  // Dev world creation form: difficulty buttons
  document.querySelectorAll('.dw-diff-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.dw-diff-btn').forEach(b => { b.classList.remove('selected'); b.style.borderColor = '#555'; b.style.color = '#888'; b.style.background = 'rgba(100,100,100,0.2)'; });
      btn.classList.add('selected'); btn.style.borderColor = '#0ff'; btn.style.color = '#0ff'; btn.style.background = 'rgba(0,255,255,0.15)';
      _dwState.diff = btn.dataset.diff;
    });
  });
  // Dev world creation form: terrain buttons
  document.querySelectorAll('.dw-terrain-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.dw-terrain-btn').forEach(b => { b.classList.remove('selected'); b.style.borderColor = '#555'; b.style.color = '#888'; b.style.background = 'rgba(100,100,100,0.2)'; });
      btn.classList.add('selected'); btn.style.borderColor = '#0ff'; btn.style.color = '#0ff'; btn.style.background = 'rgba(0,255,255,0.15)';
      _dwState.terrain = btn.dataset.terrain;
    });
  });
  // Dev world creation form: multiplayer buttons
  document.querySelectorAll('.dw-mp-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.dw-mp-btn').forEach(b => { b.classList.remove('selected'); b.style.borderColor = '#555'; b.style.color = '#888'; b.style.background = 'rgba(100,100,100,0.2)'; });
      btn.classList.add('selected'); btn.style.borderColor = '#0ff'; btn.style.color = '#0ff'; btn.style.background = 'rgba(0,255,255,0.15)';
      _dwState.mp = btn.dataset.mp;
      const mpWrap = document.getElementById('dw-max-players-wrap');
      if (mpWrap) mpWrap.style.display = btn.dataset.mp === 'host' ? '' : 'none';
    });
  });
  // Dev world creation form: create button
  document.getElementById('dw-create-go')?.addEventListener('click', () => {
    const name = document.getElementById('dw-name')?.value?.trim() || 'Dev World';
    const seedInput = document.getElementById('dw-seed')?.value?.trim();
    let seed = 42;
    if (seedInput) {
      const n = parseInt(seedInput);
      seed = isNaN(n) ? [...seedInput].reduce((a, c) => a + c.charCodeAt(0), 0) : n;
    }
    const maxP = parseInt(document.getElementById('dw-max-players')?.value) || 10;

    if (_dwState.mp === 'host') {
      // Create multiplayer dev world on the server
      const roomName = name.replace(/[^a-zA-Z0-9_ -]/g, '').slice(0, 32) || 'DevWorld';
      if (!network.connected) {
        network.connect(MP_SERVER_URL);
        network.onConnectedOnce(() => {
          createDevWorldMultiplayer(roomName, seed, _dwState.mode, _dwState.diff, _dwState.terrain, maxP);
        });
      } else {
        createDevWorldMultiplayer(roomName, seed, _dwState.mode, _dwState.diff, _dwState.terrain, maxP);
      }
    } else {
      // Single-player dev world
      const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
      createWorld(name, seed, _dwState.mode, _dwState.diff, { flat: _dwState.terrain === 'flat', dev: true });
      startGame(id, seed, _dwState.mode, _dwState.diff, { flat: _dwState.terrain === 'flat', void: _dwState.terrain === 'void', dev: true });
    }
  });

  // --- Dev world form helpers ---
  function _updateDWForm() {
    // Sync button styles with _dwState
    document.querySelectorAll('.dw-mode-btn').forEach(b => {
      const active = b.dataset.mode === _dwState.mode;
      b.style.borderColor = active ? '#0ff' : '#555';
      b.style.color = active ? '#0ff' : '#888';
      b.style.background = active ? 'rgba(0,255,255,0.15)' : 'rgba(100,100,100,0.2)';
      if (active) b.classList.add('selected'); else b.classList.remove('selected');
    });
    document.querySelectorAll('.dw-diff-btn').forEach(b => {
      const active = b.dataset.diff === _dwState.diff;
      b.style.borderColor = active ? '#0ff' : '#555';
      b.style.color = active ? '#0ff' : '#888';
      b.style.background = active ? 'rgba(0,255,255,0.15)' : 'rgba(100,100,100,0.2)';
      if (active) b.classList.add('selected'); else b.classList.remove('selected');
    });
    document.querySelectorAll('.dw-terrain-btn').forEach(b => {
      const active = b.dataset.terrain === _dwState.terrain;
      b.style.borderColor = active ? '#0ff' : '#555';
      b.style.color = active ? '#0ff' : '#888';
      b.style.background = active ? 'rgba(0,255,255,0.15)' : 'rgba(100,100,100,0.2)';
      if (active) b.classList.add('selected'); else b.classList.remove('selected');
    });
    document.querySelectorAll('.dw-mp-btn').forEach(b => {
      const active = b.dataset.mp === _dwState.mp;
      b.style.borderColor = active ? '#0ff' : '#555';
      b.style.color = active ? '#0ff' : '#888';
      b.style.background = active ? 'rgba(0,255,255,0.15)' : 'rgba(100,100,100,0.2)';
      if (active) b.classList.add('selected'); else b.classList.remove('selected');
    });
    const mpWrap = document.getElementById('dw-max-players-wrap');
    if (mpWrap) mpWrap.style.display = _dwState.mp === 'host' ? '' : 'none';
  }

  function createDevWorldMultiplayer(roomName, seed, mode, diff, terrain, maxPlayers) {
    const isFlat = terrain === 'flat';
    const isVoid = terrain === 'void';
    createWorld(roomName, seed, mode, diff, { flat: isFlat, dev: true });
    createServer(roomName, maxPlayers, mode, seed, true); // private by default
    // The createServer flow connects → joins → onJoined fires → startGame is called from there
    // We need to pass dev world options through, so set a flag
    _pendingDevWorldOpts = { flat: isFlat, void: isVoid, dev: true, diff };
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
  _refreshDevButtons();

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
    clearToast();
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
      network.onConnectedOnce(attempt);
      setTimeout(() => { if (!network.connected) showOfflineFallback(); }, 6000);
    } else {
      attempt();
    }
  }
  if (loginCreateBtn) loginCreateBtn.addEventListener('click', () => doLogin('register'));
  if (loginGoBtn) loginGoBtn.addEventListener('click', () => doLogin('login'));
  if (loginPass) loginPass.addEventListener('keydown', (e) => { if (e.key === 'Enter') doLogin('login'); });

  // Auto-login when redirected from /u/ with ?user= param (already authed there)
  const _urlUserParam = new URLSearchParams(location.search).get('user');
  const _urlRoleParam = new URLSearchParams(location.search).get('role');
  if (_urlUserParam) {
    playerName = _urlUserParam;
    playerRole = _urlRoleParam || 'player';
    setSkinUser(playerName);
    const nameTag = document.getElementById('menu-player-name');
    if (nameTag) nameTag.textContent = playerName;
    _refreshDevButtons();
    ui.showMenu('main');
  } else {
    ui.showMenu('login');
  }
  showOneTimeMessages();
  crazyGamesSDK().then((sdk) => {
    if (!sdk) return;
    try {
      const cgName = sdk.user?.getUsername?.();
      if (cgName) {
        const ni = document.getElementById('login-username');
        if (ni && !ni.value) ni.value = cgName;
      }
    } catch (_) {}
  });

  // Show password form and CrazyGames login on both CG and the regular website.
  const loginAccountSection = document.getElementById('login-account-section');
  const loginCgSection = document.getElementById('login-cg-section');
  if (loginAccountSection) loginAccountSection.style.display = '';
  if (loginCgSection) loginCgSection.style.display = '';

  // Social login buttons always visible (GitHub/Google work everywhere).

  // --- Social + CG login handlers ---
  function doCgLogin() {
    clearToast();
    crazyGamesSDK().then((sdk) => {
      if (!sdk) { showToast('Sorry, you\'re not on CrazyGames. This button is for CrazyGames users only.', '#fa0', 5); return; }
      try {
        const cgName = sdk.user?.getUsername?.();
        const cgId = sdk.user?.getId?.();
        if (!cgId && !cgName) { showToast('CrazyGames: could not get user info. Make sure you are logged into CrazyGames.', '#f85', 5); return; }
        const serverUrl = BACKEND_URL.replace(/^wss?:\/\//, 'https://');
        fetch(`${serverUrl}/auth/crazygames`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cgUserId: cgId || cgName, cgUsername: cgName || 'Player' }),
        })
          .then(r => r.json())
          .then(data => {
            if (!data.ok) { showToast('CG auth failed: ' + (data.reason || ''), '#f44', 4); return; }
            playerName = filterProfanity(data.username) || 'Player';
            setSkinUser(playerName);
            try { localStorage.setItem('bf_player_name', playerName); } catch (_) {}
            const attempt = () => network.sendIdentityAuth('crazygames', data.providerId || playerName, playerName);
            if (!network.connected) {
              network.connect(MP_SERVER_URL);
              network.onConnectedOnce(attempt);
              setTimeout(() => { if (!network.connected) showOfflineFallback(); }, 6000);
            } else {
              attempt();
            }
          })
          .catch(() => { showToast('CG auth network error', '#f44', 4); });
      } catch (_) {}
    });
  }

  function startOAuth(provider) {
    const serverUrl = BACKEND_URL.replace(/^wss?:\/\//, 'https://');
    const origin = window.location.origin;
    const popup = window.open(`${serverUrl}/auth/${provider}?origin=${encodeURIComponent(origin)}`, 'oauth', 'width=600,height=700');
    if (!popup) {
      showToast('Please allow popups for OAuth login', '#ff0', 4);
      return;
    }
    const OAuthTimeout = 120000;
    const timer = setTimeout(() => {
      window.removeEventListener('message', handler);
    }, OAuthTimeout);
    const handler = (e) => {
      if (e.origin !== serverUrl) return;
      if (e.data && e.data.provider === provider) {
        window.removeEventListener('message', handler);
        clearTimeout(timer);
        if (e.data.error) {
          showToast('OAuth failed: ' + e.data.error, '#f44', 4);
          return;
        }
        const suggestedName = filterProfanity(e.data.username) || 'Player';
        const providerId = e.data.providerId || suggestedName;
        // Show name prompt with suggested name from provider
        const promptEl = document.getElementById('name-prompt');
        const inputEl = document.getElementById('name-prompt-input');
        const confirmEl = document.getElementById('name-prompt-confirm');
        if (promptEl && inputEl && confirmEl) {
          inputEl.value = suggestedName;
          inputEl.placeholder = 'Choose a username...';
          document.querySelector('#name-prompt div div:first-child').textContent = 'Choose Your Username';
          document.querySelector('#name-prompt div div:nth-child(2)').textContent = 'This will be your in-game name. You can change it later.';
          promptEl.style.display = 'flex';
          setTimeout(() => inputEl.focus(), 50);
          confirmEl.onclick = () => {
            const name = (inputEl.value || '').trim().slice(0, 20);
            if (!name) { inputEl.focus(); return; }
            playerName = filterProfanity(name);
            if (!playerName) playerName = 'Player';
            setSkinUser(playerName);
            try { localStorage.setItem('bf_player_name', playerName); } catch (_) {}
            promptEl.style.display = 'none';
            const attempt = () => network.sendIdentityAuth(provider, providerId, playerName);
            if (!network.connected) {
              network.connect(MP_SERVER_URL);
              network.onConnectedOnce(attempt);
              setTimeout(() => { if (!network.connected) showOfflineFallback(); }, 6000);
            } else {
              attempt();
            }
          };
          inputEl.onkeydown = (e) => { if (e.key === 'Enter') confirmEl.onclick(); };
        } else {
          // Fallback if name prompt elements not found
          playerName = suggestedName;
          try { localStorage.setItem('bf_player_name', playerName); } catch (_) {}
          const attempt = () => network.sendIdentityAuth(provider, providerId, playerName);
          if (!network.connected) {
            network.connect(MP_SERVER_URL);
            network.onConnectedOnce(attempt);
            setTimeout(() => { if (!network.connected) showOfflineFallback(); }, 6000);
          } else {
            attempt();
          }
        }
      }
    };
    window.addEventListener('message', handler);
  }

  const btnCg = document.getElementById('btn-login-crazygames');
  if (btnCg) btnCg.addEventListener('click', doCgLogin);

  const btnGh = document.getElementById('btn-login-github');
  if (btnGh) btnGh.addEventListener('click', () => { clearToast(); startOAuth('github'); });

  const btnGl = document.getElementById('btn-login-google');
  if (btnGl) btnGl.addEventListener('click', () => { clearToast(); startOAuth('google'); });

  // Guest login
  const btnGuest = document.getElementById('btn-login-guest');
  if (btnGuest) btnGuest.addEventListener('click', () => {
    clearToast();
    const num = Math.floor(Math.random() * 90000000) + 10000000; // 8-digit random
    playerName = 'Guest' + String(num).slice(0, 8);
    try { localStorage.setItem('bf_player_name', playerName); } catch (_) {}
    const attempt = () => network.sendIdentityAuth('guest', playerName, playerName);
    if (!network.connected) {
      network.connect(MP_SERVER_URL);
      network.onConnectedOnce(attempt);
      setTimeout(() => { if (!network.connected) showOfflineFallback(); }, 6000);
    } else {
      attempt();
    }
  });

  // Platform-aware footer links: point at our own Terms/Privacy ONLY when NOT
  // running on the real CrazyGames domain.
  if (!isOnCrazyGames()) {
    try {
      const terms = document.getElementById('footer-terms');
      const privacy = document.getElementById('footer-privacy');
      if (terms) { terms.href = './terms.html'; terms.textContent = 'Terms'; }
      if (privacy) { privacy.href = './privacy.html'; privacy.textContent = 'Privacy Policy'; }
    } catch (_) {}
  }
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
        <div class="wc-name">${escHtml(w.name)}</div>
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
      startGame(w.id, w.seed, w.gamemode, w.difficulty, { flat: !!w.flat });
    });
    list.appendChild(card);
  }
}

function renderDevWorldList() {
  const list = document.getElementById('dev-world-list');
  if (!list) return;
  const worlds = getDevWorldList();
  list.innerHTML = '';
  if (worlds.length === 0) {
    list.innerHTML = '<div style="color:#777;font-size:12px;padding:20px;">No dev worlds yet. Create one!</div>';
    return;
  }
  for (const w of worlds) {
    const card = document.createElement('div');
    card.className = 'world-card';
    const date = new Date(w.createdAt).toLocaleDateString();
    card.innerHTML = `
      <div class="wc-info">
        <div class="wc-name">${escHtml(w.name)}</div>
        <div class="wc-meta">Seed: ${w.seed} &middot; ${date}</div>
      </div>
      <div style="display:flex;align-items:center;gap:6px;">
        <span class="wc-mode creative">DEV</span>
        <button class="wc-delete" title="Delete world">&times;</button>
      </div>
    `;
    card.querySelector('.wc-delete').addEventListener('click', (e) => {
      e.stopPropagation();
      deleteWorld(w.id, true);
      renderDevWorldList();
    });
    card.addEventListener('click', () => {
      startGame(w.id, w.seed, w.gamemode, w.difficulty, { flat: !!w.flat, dev: true });
    });
    list.appendChild(card);
  }
}

function renderParkourWorldList() {
  const list = document.getElementById('parkour-world-list');
  if (!list) return;
  const worlds = getParkourWorldList();
  list.innerHTML = '';
  if (worlds.length === 0) {
    list.innerHTML = '<div style="color:#777;font-size:12px;padding:20px;">No parkour worlds yet. Create one!</div>';
    return;
  }
  for (const w of worlds) {
    const card = document.createElement('div');
    card.className = 'world-card';
    const date = new Date(w.createdAt).toLocaleDateString();
    card.innerHTML = `
      <div class="wc-info">
        <div class="wc-name">${escHtml(w.name)}</div>
        <div class="wc-meta">Seed: ${w.seed} &middot; ${date}</div>
      </div>
      <div style="display:flex;align-items:center;gap:6px;">
        <span class="wc-mode adventure">PARKOUR</span>
        <button class="wc-delete" title="Delete world">&times;</button>
      </div>
    `;
    card.querySelector('.wc-delete').addEventListener('click', (e) => {
      e.stopPropagation();
      deleteWorld(w.id, false, true);
      renderParkourWorldList();
    });
    card.addEventListener('click', () => {
      startGame(w.id, w.seed, 'adventure', 'peaceful', { parkour: true });
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

  // FPS counter (was a separate rAF loop, now merged)
  fpsFrames++;
  if (now - fpsLastTime >= 1000) {
    fps = Math.round(fpsFrames * 1000 / (now - fpsLastTime));
    fpsFrames = 0;
    fpsLastTime = now;
  }

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
      const dir = _mobDirVec;
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
          const crit = isCriticalHit();
          const finalDmg = crit ? Math.ceil(attackDamage * 1.5) : attackDamage;
          mobHit.takeDamage(finalDmg, camera.position);
          audio.hit();
          if (crit) spawnCritParticles(mobHit.position);
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
          const dir = _pvpDirVec;
          camera.getWorldDirection(dir);
          const origin = camera.position;
          let closestDist = 3.5; // PvP reach (slightly shorter than block reach)
          let closestName = null;
          for (const [name, rp] of mpRenderer.remotePlayers) {
            if (!rp.model || !rp.model.group) continue;
            const rpPos = rp.model.group.position;
            // Simple sphere test: camera ray to player center
            const toPlayer = _pvpToPlayer.subVectors(rpPos, origin);
            const proj = toPlayer.dot(dir);
            if (proj < 0 || proj > closestDist) continue;
            _pvpClosest.copy(origin).addScaledVector(dir, proj);
            const dist = _pvpClosest.distanceTo(rpPos);
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

        if (!hitPlayer && !(player && player.isAdventure())) {
          // Normal block breaking — on mobile, target the block the user tapped
          const isMobileBreak = mobile && mobile.isMobile;
          let hit;
          if (isMobileBreak && mobileAimPoint) hit = screenTarget(mobileAimPoint.x, mobileAimPoint.y);
          else if (isMobileBreak) hit = closestBlockInRadius(world, player.position, 6);
          else hit = currentTarget();
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

    // ── Parkour runtime logic ───────────────────────────────────────
    if (isParkour && world && player) {
      // Check for checkpoints
      if (checkCheckpoint(player, world)) {
        const lvl = getCurrentLevelInfo();
        if (lvl) addChatLine(`Checkpoint: Level ${lvl.id} — ${lvl.name}`, '#5f5');
        audio.levelComplete();
      }

      // Check for level/parkour completion
      if (_isImportedParkour && _importedParkourData) {
        if (player.position.y >= _importedParkourData.maxY - 1) {
          _importedParkourData = null;
          const time = getParkourTimerFormatted();
          addChatLine(`PARKOUR COMPLETE! Time: ${time}`, '#0ff');
          cgHappyTime();
          audio.finish();
          ui.itemNameEl.textContent = `PARKOUR COMPLETE! Time: ${time}`;
          ui.itemNameEl.classList.add('visible');
          setTimeout(() => ui.itemNameEl.classList.remove('visible'), 5000);
        }
      }
      if (_parkourLevelEnds) {
        const result = checkLevelEnd(player, _parkourLevelEnds);
        if (result === 'level_complete') {
          const lvl = getCurrentLevelInfo();
          if (lvl) addChatLine(`Level ${lvl.id}: ${lvl.name} — Go!`, '#ff0');
          audio.levelComplete();
        } else if (result === 'parkour_complete') {
          const time = getParkourTimerFormatted();
          addChatLine(`PARKOUR COMPLETE! Time: ${time}`, '#0ff');
          cgHappyTime();
          audio.finish();
          ui.itemNameEl.textContent = `PARKOUR COMPLETE! Time: ${time}`;
          ui.itemNameEl.classList.add('visible');
          setTimeout(() => ui.itemNameEl.classList.remove('visible'), 5000);
        }
      }

      // Update timer display
      if (_parkourTimerEl) {
        _parkourTimerEl.textContent = getParkourTimerFormatted();
      }

      // Update level indicator
      if (_parkourLevelEl) {
        if (_isImportedParkour) {
          _parkourLevelEl.textContent = '100 Levels';
        } else {
          const lvl = getCurrentLevelInfo();
          _parkourLevelEl.textContent = lvl ? `Level ${lvl.id}: ${lvl.name}` : 'Lobby';
        }
      }

      // Void respawn: if player falls below world, respawn at checkpoint
      const _voidFloor = _isImportedParkour && _importedParkourData
        ? _importedParkourData.minY - 2 : 180;
      if (player.position.y < _voidFloor) {
        const respawn = _isImportedParkour && _importedParkourData
          ? { x: 0.5, y: _importedParkourData.spawnY + 2, z: 0.5 }
          : getRespawnPosition();
        if (respawn) {
          player.position.set(respawn.x, respawn.y, respawn.z);
          player.velocity.set(0, 0, 0);
          addChatLine('Fell! Respawning...', '#f55');
        } else {
          player.position.set(0.5, 202, 0.5);
          player.velocity.set(0, 0, 0);
          addChatLine('Fell! Respawning at lobby...', '#f55');
        }
      }
    }
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
      const stepBlock = world.getBlock(bx, by, bz);
      audio.step(stepBlock);
      // Spawn footstep particles for grass/sand/dirt
      spawnStepParticles(bx, by, bz, stepBlock);
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

  // Low health vignette — persistent red border when health <= 4 hearts (8 HP)
  const lowVig = document.getElementById('low-health-vignette');
  if (lowVig && player) {
    const maxHp = player.maxHealth || 20;
    const hpRatio = player.health / maxHp;
    if (hpRatio <= 0.4 && !player.isDead()) {
      // Pulse between 0.5 and 1.0 opacity based on time
      const pulse = 0.5 + 0.5 * Math.sin(performance.now() * 0.004);
      lowVig.style.opacity = String(0.5 + pulse * 0.5);
    } else {
      lowVig.style.opacity = '0';
    }
  }

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
        playerModel.update(dt, player.position, player.yaw, player.velocity, player.onGround, player.sprinting, isBreaking, isPlacing, isSwimming, player.eating, player.crouching, player.flying, player.onLadder, player.pitch);
      const armorIds = player.inventory.armor.map(s => s ? s.item : null);
      const armorKey = armorIds.join(',');
      if (armorKey !== _lastLocalArmorKey) {
        _lastLocalArmorKey = armorKey;
        try { playerModel.setArmor(armorIds, ARMOR); } catch (_) {}
        if (network.connected && network.roomName) network.sendArmor(armorKey || null);
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

  // --- Redstone: auto-reset expired buttons ---
  const nowMs = performance.now();
  for (const [key, state] of redstoneStates) {
    if (state.expiresAt !== Infinity && nowMs >= state.expiresAt) {
      const [bx, by, bz] = key.split(',').map(Number);
      redstoneStates.delete(key);
      greenstoneSystem.clearPower(bx, by, bz);
    }
  }

  // --- Pressure plate detection ---
  if (player && !sleeping) {
    const plateX = Math.floor(player.position.x);
    const plateY = Math.floor(player.position.y - 0.05);
    const plateZ = Math.floor(player.position.z);
    const plateBlock = world.getBlock(plateX, plateY, plateZ);
    if (plateBlock === BLOCK.STONE_PRESSURE_PLATE) {
      const plateKey = `${plateX},${plateY},${plateZ}`;
      if (!redstoneStates.has(plateKey)) {
        redstoneStates.set(plateKey, { blockId: plateBlock, expiresAt: Infinity });
        console.log(`[Redstone] Pressure plate activated at ${plateKey}`);
      }
    } else {
      // Check if player stepped off a previously active pressure plate
      for (const [key, state] of redstoneStates) {
        if (state.blockId === BLOCK.STONE_PRESSURE_PLATE) {
          const [kx, ky, kz] = key.split(',').map(Number);
          const currentBlock = world.getBlock(kx, ky, kz);
          if (currentBlock !== BLOCK.STONE_PRESSURE_PLATE) {
            redstoneStates.delete(key);
          }
        }
      }
    }
  }

  loader.update(player.position.x, player.position.z);
  manager.tick();

  // Spawn mobs for newly generated chunks (throttled to once per second)
  if (mobManager) {
    _mobSpawnTimer = (_mobSpawnTimer || 0) - dt;
    if (_mobSpawnTimer <= 0) {
      _mobSpawnTimer = 1.0;
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
  }

  updateSky(dt);
  updateWeather(dt);
  greenstoneSystem.update(dt, world);
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
    mpRenderer.update(dt, player ? player.position.x : undefined, player ? player.position.z : undefined);
    // Simulate other players moving around in multiplayer
    if (isMultiplayer && currentServer) {
      _simulateRemotePlayers(dt);
    }
  }

  // Update mobs
  if (mobManager) {
    const mobEvent = mobManager.update(dt, player.position, dayTime);
    if (mobEvent) {
      // Handle mob attacks on player
      if (mobEvent.attack) {
        const dmgMult = gameDifficulty === 'hard' ? 1.5 : 1.0;
        player.takeDamage(Math.round(mobEvent.attack.damage * dmgMult), mobEvent.attack.fromPos || 'mob');
        if (playerModel) playerModel.triggerHurt();
      }

    }
    // Handle chicken egg drops
    if (mobManager._eggDrops && mobManager._eggDrops.length > 0) {
      for (const egg of mobManager._eggDrops) {
        droppedItemManager?.drop(ITEM.EGG, 1, egg.x, egg.y, egg.z);
      }
      mobManager._eggDrops.length = 0;
    }

  }

  // Update explosion particles
  if (explosionManager) {
    explosionManager.update(dt);
  }

  // ── SPRINT TRAIL PARTICLES ──
  if (player && player.sprinting && player.onGround && graphicsQuality !== 'low') {
    _sprintParticleTimer = (_sprintParticleTimer || 0) - dt;
    if (_sprintParticleTimer <= 0) {
      _sprintParticleTimer = 0.05;
      const px = player.position.x + (Math.random() - 0.5) * 0.4;
      const py = player.position.y + 0.1;
      const pz = player.position.z + (Math.random() - 0.5) * 0.4;
      const geo = _particleGeoMed;
      const mat = _sprintParticleMat;
      const m = new THREE.Mesh(geo, mat);
      m.position.set(px, py, pz);
      scene.add(m);
      _particles.push({ mesh: m, vx: 0, vy: 1.5, vz: 0, life: 0.4, maxLife: 0.4 });
    }
  }

  // ── WATER SPLASH PARTICLES (when walking through water) ──
  if (player && player.onGround && graphicsQuality !== 'low') {
    const pEye = player.eyeBlock();
    if (pEye === BLOCK.WATER) {
      _waterSplashTimer = (_waterSplashTimer || 0) - dt;
      if (_waterSplashTimer <= 0) {
        _waterSplashTimer = 0.15;
        for (let i = 0; i < 3; i++) {
          const geo = _particleGeoSmall;
          const mat = _waterSplashMat;
          const m = new THREE.Mesh(geo, mat);
          m.position.set(
            player.position.x + (Math.random() - 0.5) * 0.6,
            player.position.y + 0.2,
            player.position.z + (Math.random() - 0.5) * 0.6
          );
          scene.add(m);
          _particles.push({
            mesh: m,
            vx: (Math.random() - 0.5) * 2,
            vy: 2 + Math.random() * 2,
            vz: (Math.random() - 0.5) * 2,
            life: 0.5, maxLife: 0.5
          });
        }
      }
    }
  }

  // ── BREAKING BLOCK WOBBLE ──
  if (breakingTarget && breakParticles) {
    const wobble = Math.sin(performance.now() * 0.02) * 0.015;
    crackPlane.position.x += wobble;
    crackPlane.position.z += wobble * 0.7;
  }

  // ── GENERIC PARTICLE SYSTEM (sprint, water splash, etc.) ──
  for (let i = (_particles || []).length - 1; i >= 0; i--) {
    const p = _particles[i];
    p.life -= dt;
    if (p.life <= 0) {
      scene.remove(p.mesh);
      if (p.mesh.material) p.mesh.material.dispose();
      _particles.splice(i, 1);
      continue;
    }
    p.vy -= 8 * dt;
    p.mesh.position.x += p.vx * dt;
    p.mesh.position.y += p.vy * dt;
    p.mesh.position.z += p.vz * dt;
    p.mesh.material.opacity = (p.life / p.maxLife) * 0.6;
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

  // --- Attack cooldown indicator (ring around crosshair) ---
  const cooldownEl = document.getElementById('attack-cooldown');
  if (cooldownEl && pointerLocked) {
    const cdProg = Math.min(1, (_playerAttackTimer || 0) / 0.4);
    if (cdProg < 1) {
      cooldownEl.style.opacity = '1';
      const deg = cdProg * 360;
      cooldownEl.style.background = `conic-gradient(rgba(255,255,255,0.8) ${deg}deg, transparent ${deg}deg)`;
    } else {
      cooldownEl.style.opacity = '0';
    }
  }

  // --- Mob health bar tooltip ---
  const mobHealthEl = document.getElementById('mob-health');
  if (mobHealthEl) {
    if (mobManager && player && pointerLocked) {
      const dir = _mobHealthDir;
      camera.getWorldDirection(dir);
      const targeted = mobManager.hitTest(camera.position, dir, REACH);
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
          const mobPos = _mobHealthPos.set(targeted.position.x, targeted.position.y + (def.legH + def.bodyH + def.headH) + 0.6, targeted.position.z);
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
  if (playerModel) playerModel.setHeld(heldId);
  const ohSlot = player.inventory.offhand;
  const ohItemId = ohSlot ? ohSlot.item : null;
  viewmodel.setOffhand(ohItemId);
  // Only show offhand arm when actually holding something
  viewmodel.offhandGroup.visible = ohItemId != null;
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
      onLadder: player.onLadder,
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
    showFps,
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

  // Send position to multiplayer server (30Hz)
  if (network.connected && network.roomName && player) {
    _mpSendTimer += dt;
    if (_mpSendTimer >= 0.033) {
      _mpSendTimer = 0;
      network.sendPosition(player.position.x, player.position.y, player.position.z, player.yaw, player.crouching);
    }
  }

  // Offer banner timer (random popup during survival gameplay)
  if (gameRunning && player && player.isSurvival() && !offerActive && isOnCrazyGames()) {
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
  menuPreviewModel = new PlayerModel(menuPreviewScene, menuPreviewSkin, atlasCanvas);
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
// Draw a small front-facing avatar from a 64x64 custom skin data URL.
function drawMiniCustomSkin(cvs, dataUrl) {
  const ctx = cvs.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  const img = new Image();
  img.onload = () => {
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    const draw = (sx, sy, sw, sh, dx, dy) => { try { ctx.drawImage(img, sx, sy, sw, sh, dx, dy, sw, sh); } catch (_) {} };
    // Front faces from the standard MC layout, composed into a 16x32 avatar.
    draw(8, 8, 8, 8, 4, 0);    // head
    draw(20, 20, 8, 12, 4, 8); // body
    draw(44, 20, 4, 12, 0, 8); // right arm
    draw(36, 52, 4, 12, 12, 8);// left arm
    draw(4, 20, 4, 12, 4, 20); // right leg
    draw(20, 52, 4, 12, 8, 20);// left leg
  };
  img.src = dataUrl;
}

function buildSkinPicker() {
  const boysGrid = document.getElementById('skin-grid-boys');
  const girlsGrid = document.getElementById('skin-grid-girls');
  if (!boysGrid || !girlsGrid) return;
  boysGrid.innerHTML = '';
  girlsGrid.innerHTML = '';
  const current = getSelectedSkin();

  // --- Custom Skins section (saved from the editor) ---
  const customSection = document.getElementById('skin-custom-section');
  const customGrid = document.getElementById('skin-grid-custom');
  if (customGrid) {
    customGrid.innerHTML = '';
    const customs = getCustomSkins();
    if (customSection) customSection.style.display = customs.length ? '' : 'none';
    customs.forEach((dataUrl, ci) => {
      const card = document.createElement('div');
      card.className = 'skin-card' + (current._customIndex === ci ? ' selected' : '');
      card.style.position = 'relative';
      const cvs = document.createElement('canvas');
      cvs.width = 16; cvs.height = 32;
      cvs.style.width = '48px'; cvs.style.height = '96px';
      cvs.style.imageRendering = 'pixelated';
      drawMiniCustomSkin(cvs, dataUrl);
      card.appendChild(cvs);
      const label = document.createElement('div');
      label.className = 'skin-card-name';
      label.textContent = 'Custom ' + (ci + 1);
      card.appendChild(label);
      // delete (x) button
      const del = document.createElement('div');
      del.textContent = '✕';
      del.title = 'Delete';
      del.style.cssText = 'position:absolute;top:2px;right:2px;width:18px;height:18px;display:flex;align-items:center;justify-content:center;background:rgba(140,40,40,0.85);color:#fff;border-radius:3px;font:bold 11px monospace;cursor:pointer;';
      del.addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm('Delete Custom ' + (ci + 1) + '?')) { deleteCustomSkin(ci); buildSkinPicker(); updateMenuPreviewSkin(getSelectedSkin()); }
      });
      card.appendChild(del);
      card.addEventListener('click', () => {
        setSelectedCustomSkin(ci);
        buildSkinPicker();
        updateMenuPreviewSkin(getSelectedSkin());
      });
      customGrid.appendChild(card);
    });
  }

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
      viewmodel.setSkinColor(preset.skin, preset.skin2);
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
let _prevMenuScreen = 'main';
document.getElementById('btn-skin-customize')?.addEventListener('click', () => {
  _prevMenuScreen = document.getElementById('menu-login')?.classList.contains('active') ? 'login' : 'main';
  buildSkinPicker();
  ui.showMenu('skins');
});
document.getElementById('btn-skins-back')?.addEventListener('click', () => {
  ui.showMenu(_prevMenuScreen);
});

// --- Skin Editor ---
let skinEditor = null;
document.getElementById('btn-skins-edit')?.addEventListener('click', () => {
  ui.showMenu('skin-editor');
  setTimeout(() => {
    if (skinEditor) { try { skinEditor.destroy(); } catch (_) {} }
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


let statusBarTimer = 0, autoSaveTimer = 0, stepTimer = 0, prevDamageTimer = 0, mobAttackTimer = 0, _playerAttackTimer = 0, _cameraShakeIntensity = 0, _deathTracked = false, _mobSpawnTimer = 0;
const _prevPlayerPos = new THREE.Vector3();
let _lastMpArmorKey = '', _lastMpYaw = 0, _mpForceSend = true;
function facingName(yaw) {
  const a = ((yaw * 180 / Math.PI) % 360 + 360) % 360;
  if (a < 45 || a >= 315) return 'South';
  if (a < 135) return 'West';
  if (a < 225) return 'North';
  return 'East';
}

// FPS counter (merged into main loop — no separate rAF)
let fps = 0, fpsFrames = 0, fpsLastTime = performance.now();

// Bottom-left: BlockForge Portal
document.getElementById('btn-blockforge-portal')?.addEventListener('click', () => {
  const user = encodeURIComponent(playerName || '');
  const role = encodeURIComponent(playerRole || '');
  window.open('portal.html' + (user ? '?user=' + user + '&role=' + role : ''));
});
// Bottom-right: Account Info → opens user-data page at /u/data.html
document.getElementById('btn-account-info')?.addEventListener('click', () => {
  const user = encodeURIComponent(playerName || '');
  const role = encodeURIComponent(playerRole || '');
  window.open('u/data.html' + (user ? '?user=' + user + '&role=' + role : ''));
});

requestAnimationFrame(loop);
