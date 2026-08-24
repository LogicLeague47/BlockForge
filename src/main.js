// Entry point: wires up renderer, world, player, input, and the render loop.

import * as THREE from 'three';
import { BACKEND_URL } from './config.js';
import { World, CHUNK_SIZE, BIOMES } from './world.js';
import { ChunkMeshManager } from './chunkmesh.js';
import { ChunkLoader } from './chunkloader.js';
import { Player } from './player.js';
import { raycastVoxel, closestBlockInRadius } from './raycast.js';
import { buildAtlas, makeIcon, TILE } from './tiles.js';
import { UI, drawCrack, makeItemIconCanvas } from './ui.js';
import { AudioManager } from './audio.js';
import { BLOCK, BLOCKS, HOTBAR_BLOCKS, blockDrop, blockHardness, blockTool, blockHarvestLevel, isCraftingTable, TILES, tileNameFor } from './blocks.js';
import { isBlockItem, isTool, toolInfo, toolSpeedFor, toolHarvestLevel, isFood, foodValue, fuelValue, ITEM, itemDef, itemName, ARMOR, getItemRarity, SPAWN_EGG_MOBS } from './items.js';
import { ViewModel } from './viewmodel.js';
import { saveWorld, loadWorld, getWorldList, saveWorldList, createWorld, deleteWorld, migrateLegacy, hasSave, hasTutorialBeenSeen, markTutorialSeen, syncTutorialFromSdk, cgPullProgress, cleanDevWorldsFromPlayerList, getDevWorldList, saveDevWorldList, getParkourWorldList, saveParkourWorldList, getOneBlockWorldList, saveOneBlockWorldList, saveMultiplayerInventory, loadMultiplayerInventory, saveMultiplayerBedSpawn, loadMultiplayerBedSpawn, cloudSet } from './storage.js';
import { SMELTING, SMELT_TIME, SMELT_TIME_DEFAULT, RECIPES } from './recipes.js';
import { AchievementManager, ACHIEVEMENTS, CATEGORIES } from './achievements.js';
import { MobManager, MOB_TYPES } from './mobs.js';
import { calcBiome, growTreeInWorld } from './worldgen.js';
import { initCrazyGamesAccountManager, setupCrazyGamesAuthHandlers, startCrazyGamesGameplay } from './crazygames-integration.js';
import { cgGameplayStart, cgGameplayStop, cgLoadingStart, cgLoadingStop, cgHappyTime, cgMidgameAd, cgRewardedAd, cgHasAdblock, cgShouldMuteAudio, cgOnSettingsChange, cgIsInstantMultiplayer, cgReportProgress, cgSetGameContext, cgClearGameContext, cgShowAuthPrompt, cgShowBanner, cgShowResponsiveBanner, cgClearBanner, cgClearAllBanners, cgEnvironment } from './cg-helper.js';

// XOR obfuscation for locally-stored passwords (matching linkedaccounts.js)
function _xorEncode(str) {
  let out = '';
  for (let i = 0; i < str.length; i++) out += String.fromCharCode(str.charCodeAt(i) ^ 0x5A);
  return out;
}
function _xorDecode(str) {
  let out = '';
  for (let i = 0; i < str.length; i++) out += String.fromCharCode(str.charCodeAt(i) ^ 0x5A);
  return out;
}
import { SKIN_PRESETS, getSelectedSkin, setSelectedSkin, getCustomSkins, deleteCustomSkin, setSelectedCustomSkin, setSkinUser, getStoredSkinIndex } from './skins.js';
import { PlayerModel } from './playermodel.js';
import { SkinEditor } from './skineditor.js';
import { getKeybinds, setKeybind, resetKeybinds, keyName, KEYBIND_ACTIONS } from './keybinds.js';
import { initMobileControls } from './mobile.js';
import { Server, executeCommand, ROLE_OWNER, ROLE_ADMIN, ROLE_STAFF, ROLE_PLAYER, ROLE_GAMEDEV, ROLE_DEV, resolveCgUsername, getDevTag, setDevTag } from './multiplayer.js';
import { DroppedItemManager } from './dropped.js';
import { LitTntManager } from './tnt.js';
import { MultiplayerRenderer } from './multiplayerrenderer.js';
import { placeStructure, DEV_STRUCTURES } from './structures.js';
import { buildParkourLevel, buildParkourLobby, buildAllLevels, PARKOUR_LEVELS, resetParkourState, startParkourTimer, checkCheckpoint, checkLevelEnd, getRespawnPosition, getCurrentLevel, getCurrentLevelInfo, getParkourTimerFormatted, setParkourLevel, loadImportedParkourChunks, buildImportedParkour, addParkourDeath, getParkourDeaths, getLevelSplits, saveParkourBestTime, getParkourBestTime, getParkourTimer, getParkourLeaderboard } from './parkour.js';
import { resetOneBlock, clearOneBlockState, updateOneBlock, onOneBlockBroken, forceRegen, getOneBlockStage, getOneBlockProgress, getOneBlockCount, getOneBlockPos, getOneBlockSave, restoreOneBlock, tickOneBlockMobTimer, rollOneBlockMob } from './oneblock.js';
import { BW_TEAMS, BW_Y, BW_SHOP, BW_VOID_BELOW, buildBedwarsMap, assignBedwarsTeam, BW_RES_IRON, BW_RES_GOLD, BW_RES_DIAMOND, BW_RES_EMERALD, loadTreasureIslandData, buildTreasureIslandMap, IMP_BASE_SPOTS, IMP_MID_SPOTS } from './bedwars.js';
import { buildBlockZonesMap, startBlockZones, tickBlockZones, onBlockZonesBroken, clearBlockZones, setBlockZonesExit, BZ_Y } from './blockzones.js';
import { buildNightsMap, startNights, tickNights, clearNights, setNightsExit, N_Y } from './nights.js';
import { buildGunAffairMap, startGunAffair, tickGunAffair, gunFire, clearGunAffair, setGunAffairExit, GA_Y, cycleGun, selectGun, GA_GUNS } from './gunaffair.js';
import { buildSkyblockMap, clearSkyblock, SB_SPAWN, SB_VOID_BELOW, SB_STARTER_KIT } from './skyblock.js';
import { initLiquid, clearLiquid, tickLiquid, registerSource, liquidBlockChanged } from './liquid.js';
import { GreenstoneSystem } from './greenstone.js';
import { initMods, bindModsMenu, modsTick, setAtlasTexture } from './mods.js';
import { BreakParticles, AmbientParticles, CloudSystem, BLOCK_COLORS } from './particles.js';
import { ExplosionManager } from './explosions.js';
import { trackLogin, trackServerCreated, getDailyUsers, getMonthlyUsers, getTotalServersCreated, getTodayUsers, getThisMonthUsers } from './analytics.js';
import { network } from './network.js';
import { VoiceChat } from './voice.js';
import { WeatherSystem } from './weather.js';
import { filterProfanity } from './profanity.js';

const app = document.getElementById('app');

// Return a promise resolving to the CrazyGames SDK (or null when unavailable).
function crazyGamesSDK() {
  return new Promise((resolve) => {
    if (window.CrazyGames && window.CrazyGames.SDK) { resolve(window.CrazyGames.SDK); return; }
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
}

// Whether we are running on the CrazyGames platform.
function isOnCrazyGames() {
  return /crazygames/i.test(location.hostname);
}

// Open an external (off-platform) page. On CrazyGames, developer terms prohibit
// promoting our own sites/products through the game, so we never navigate away
// — we just tell the player where to go on the official site instead.
function openExternal(url, target) {
  if (isOnCrazyGames()) {
    addChatLine('Open ' + url + ' on the official BlockForge site.', '#7af', true);
    return null;
  }
  try { return window.open(url, target || '_blank'); } catch (_) { return null; }
}

// Mobile devices are far weaker — detect early so we can cap the render
// resolution and view distance for a playable frame rate.
const IS_MOBILE = ('ontouchstart' in window && navigator.maxTouchPoints > 0);

// Low-memory / low-core devices get automatic downgrades (smaller shadow map,
// capped resolution / render distance) so the game stays playable.
const DEVICE_MEM_GB = navigator.deviceMemory || (IS_MOBILE ? 4 : 8); // GB, Chrome exposes it
const DEVICE_CORES = navigator.hardwareConcurrency || 4;
// Safari doesn't expose navigator.deviceMemory — assume 4GB to trigger LOW_END
// path on Macs where shared-memory integrated GPUs can't handle 4096 shadow maps.
const IS_SAFARI = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
const LOW_END = IS_MOBILE || DEVICE_MEM_GB <= 4 || DEVICE_CORES <= 4 || IS_SAFARI;

// Detect weak GPU via WEBGL_debug_renderer_info (exposed by Chrome/Edge).
// Known low-VRAM GPUs get WEAK_GPU = true so we can aggressively cut shadow
// maps, disable effects, and lower render distance.
let WEAK_GPU = false;
try {
  const _testCanvas = document.createElement('canvas');
  const _testGL = _testCanvas.getContext('webgl2') || _testCanvas.getContext('webgl');
  if (_testGL) {
    const ext = _testGL.getExtension('WEBGL_debug_renderer_info');
    if (ext) {
      const gpuStr = _testGL.getParameter(ext.UNMASKED_RENDERER_WEBGL).toLowerCase();
      // Intel HD/Iris/UHD 6xx and below = ≤1.5 GB VRAM shared
      // AMD Radeon Vega integrated = ~2 GB shared
      // Old Kepler/Maxwell NVIDIA = 1–2 GB
      const weakPatterns = [
        'intel hd', 'intel uhd', 'intel iris', 'intel(r) hd', 'intel(r) uhd', 'intel(r) iris',
        'amd Radeon(TM) Vega', 'radeon r5', 'radeon r7',
        'geforce 6', 'geforce 7', 'geforce 8', 'geforce gt 6', 'geforce gt 7', 'geforce gt 9',
        'mesa dri', 'swiftshader', 'llvmpipe',
      ];
      WEAK_GPU = weakPatterns.some(p => gpuStr.indexOf(p) !== -1);
      // Also flag anything with "intel" in the name (all Intel iGPUs are ≤1.5GB)
      if (!WEAK_GPU && gpuStr.indexOf('intel') !== -1) WEAK_GPU = true;
      console.log('[GPU]', gpuStr, WEAK_GPU ? '(weak — VRAM-safe mode)' : '(ok)');
    }
  }
  // Clean up the test context — don't leave a dangling WebGL context alive
  if (_testGL) { const ext = _testGL.getExtension('WEBGL_lose_context'); if (ext) ext.loseContext(); }
} catch (_) {}

// Combined flag: either heuristic low-end or confirmed weak GPU
const VERY_LOW_END = LOW_END || WEAK_GPU;

// Block reach / mining pace.
// REACH = how far (in blocks) you can hit mobs and target blocks — Minecraft's
// classic 3-block range. BASE_BREAK_TIME scales the break formula below.
const REACH = 3;
const BASE_BREAK_TIME = 1.0; // (hardness * BASE) / toolSpeed → seconds to break

// --- renderer / scene / camera ---
let renderer;
try {
  renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: IS_MOBILE ? 'default' : 'high-performance' });
} catch (_) {
  renderer = new THREE.WebGLRenderer({ antialias: false });
}
renderer.setPixelRatio(Math.min(window.devicePixelRatio, IS_MOBILE ? 1 : 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = !VERY_LOW_END;
renderer.shadowMap.type = (VERY_LOW_END) ? THREE.PCFShadowMap : THREE.PCFSoftShadowMap;

// Handle WebGL context loss (common on low-memory iOS devices like iPhone 5)
let _contextRestored = false;
let _contextLostTimer = null;
renderer.domElement.addEventListener('webglcontextlost', (e) => {
  e.preventDefault();
  console.warn('[Render] WebGL context lost — scheduling reload');
  if (typeof gameRunning !== 'undefined' && gameRunning) {
    gameRunning = false;
    try { document.exitPointerLock?.(); } catch (_) {}
  }
  // On low-memory iOS (iPhone 5 etc.), context restoration rarely fires.
  // Reload immediately so the user doesn't see a permanent black screen.
  if (!_contextLostTimer) {
    _contextLostTimer = setTimeout(() => { _contextLostTimer = null; window.location.reload(); }, 1500);
  }
}, false);
renderer.domElement.addEventListener('webglcontextrestored', () => {
  if (_contextRestored) { console.warn('[Render] context restored again — ignoring'); return; }
  _contextRestored = true;
  if (_contextLostTimer) { clearTimeout(_contextLostTimer); _contextLostTimer = null; }
  console.log('[Render] WebGL context restored — reloading');
  setTimeout(() => window.location.reload(), 500);
}, false);

// Graphics quality controls the internal render resolution (the main FPS lever
// on high-DPI/Retina screens, where a full-ratio buffer can be 4x the pixels).
function applyGraphicsQuality() {
  let pr;
  if (IS_MOBILE) {
    // Mobile: use native resolution for medium/high, slightly reduced for low
    pr = graphicsQuality === 'low' ? 0.85 : 1;
  } else if (VERY_LOW_END) {
    // Weak GPUs / low-end desktops: cap at 1x so we never render supersampled pixels
    pr = 1;
  } else if (graphicsQuality === 'low') pr = 1;
  else if (graphicsQuality === 'high') pr = Math.min(window.devicePixelRatio, 2);
  else pr = Math.min(window.devicePixelRatio, 1.5); // medium
  renderer.setPixelRatio(pr);
}

// Block iOS/Android double-tap-to-zoom (which can get "stuck" zoomed in since
// user-scalable=no is ignored on iOS). Only cancel multi-touch (pinch-zoom)
// gestures — single taps are left alone so click handlers still fire.
if (IS_MOBILE) {
  let _lastTapTime = 0; // timestamp of the last touchend, used below
  let _lastTapX = -1, _lastTapY = -1; // position of the last tap
  document.addEventListener('touchend', (e) => {
    if (e.changedTouches.length > 1) { e.preventDefault(); return; }
    const t = e.changedTouches[0];
    const now = Date.now();
    // Only treat it as a double-tap-zoom when the two taps land close together
    // (iOS zooms on two taps near the same spot). Rapid taps in different spots
    // are separate actions and must NOT be suppressed, or fast placing/mining
    // on mobile drops inputs.
    const dx = _lastTapX >= 0 ? t.clientX - _lastTapX : 1e9;
    const dy = _lastTapY >= 0 ? t.clientY - _lastTapY : 1e9;
    if (now - _lastTapTime <= 300 && Math.hypot(dx, dy) < 30) e.preventDefault();
    _lastTapTime = now;
    _lastTapX = t.clientX;
    _lastTapY = t.clientY;
  }, { passive: false });
  // Also block pinch-zoom gestures (iOS Safari).
  document.addEventListener('gesturestart', (e) => e.preventDefault());
  document.addEventListener('gesturechange', (e) => e.preventDefault());
}
renderer.outputColorSpace = THREE.SRGBColorSpace;
app.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);

const skyColor = new THREE.Color(0x9ad0ff);
scene.background = skyColor.clone();
scene.fog = new THREE.Fog(skyColor.getHex(), 16 * 5, 16 * 9);

// --- Handle window resize (critical for CrazyGames iframe) ---
window.addEventListener('resize', () => {
  const w = window.innerWidth, h = window.innerHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
    if (typeof menuBgCamera !== 'undefined' && menuBgCamera) {
    menuBgCamera.aspect = w / h;
    menuBgCamera.updateProjectionMatrix();
  }
});

// --- Menu Background 3D Scene (real rotating terrain) ---
import { Noise, hashSeed } from './noise.js';
const menuBgScene = new THREE.Scene();
const menuBgCamera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 500);
menuBgScene.fog = new THREE.Fog(0x87ceeb, 20, 55);
menuBgScene.background = new THREE.Color(0x78b9e8);
const menuBgSun = new THREE.DirectionalLight(0xfff8e7, 1.6);
menuBgSun.position.set(40, 80, 30);
menuBgSun.castShadow = !IS_MOBILE && !VERY_LOW_END;
menuBgSun.shadow.mapSize.width = IS_MOBILE ? 512 : (VERY_LOW_END ? 512 : 2048);
menuBgSun.shadow.mapSize.height = IS_MOBILE ? 512 : (VERY_LOW_END ? 512 : 2048);
menuBgSun.shadow.camera.near = 0.5;
menuBgSun.shadow.camera.far = 200;
menuBgSun.shadow.camera.left = -40;
menuBgSun.shadow.camera.right = 40;
menuBgSun.shadow.camera.top = 40;
menuBgSun.shadow.camera.bottom = -40;
menuBgSun.shadow.bias = -0.001;
menuBgSun.shadow.camera.updateProjectionMatrix();
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
      const isCutout = blockId === BLOCK.LEAVES || blockId === BLOCK.DARK_OAK_LEAVES;
      const mkLeaf = (t) => new THREE.MeshLambertMaterial({ map: t, alphaTest: 0.1, side: THREE.DoubleSide });
      const mk = (t) => new THREE.MeshLambertMaterial({ map: t });
      if (isCutout) {
        if (topTex && botTex && sideTex) {
          material = [mkLeaf(sideTex), mkLeaf(sideTex), mkLeaf(topTex), mkLeaf(botTex), mkLeaf(sideTex), mkLeaf(sideTex)];
        } else {
          material = mkLeaf(sideTex);
        }
      } else if (topTex && botTex && sideTex) {
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
    mesh.receiveShadow = true;
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

  menuBgScene.add(menuBgSun.target);
  menuBgSun.target.position.set(0, 0, 0);

  menuBgCamera.position.set(0, 22, 32);
  menuBgCamera.lookAt(0, 8, 0);
}
// buildMenuBackground deferred until atlasCanvas is ready (see below)

// --- lights ---
const sun = new THREE.DirectionalLight(0xffffff, 1.0);
sun.position.set(50, 100, 30);
sun.castShadow = true;
 sun.shadow.mapSize.width = IS_MOBILE ? 512 : (VERY_LOW_END ? 1024 : (LOW_END ? 2048 : 4096));
 sun.shadow.mapSize.height = IS_MOBILE ? 512 : (VERY_LOW_END ? 1024 : (LOW_END ? 2048 : 4096));
sun.shadow.camera.near = 0.5;
sun.shadow.camera.far = IS_MOBILE ? 300 : (VERY_LOW_END ? 400 : 700);
sun.shadow.camera.left = IS_MOBILE ? -25 : (VERY_LOW_END ? -35 : -50);
sun.shadow.camera.right = IS_MOBILE ? 25 : (VERY_LOW_END ? 35 : 50);
sun.shadow.camera.top = IS_MOBILE ? 25 : (VERY_LOW_END ? 35 : 50);
sun.shadow.camera.bottom = IS_MOBILE ? -25 : (VERY_LOW_END ? -35 : -50);
sun.shadow.bias = -0.0003;
sun.shadow.normalBias = 0.015;
sun.shadow.camera.updateProjectionMatrix();
scene.add(sun);
scene.add(sun.target);
const ambient = new THREE.AmbientLight(0x667799, 0.15);
scene.add(ambient);
const hemi = new THREE.HemisphereLight(0x88bbff, 0x4a6a3a, 0.08);
scene.add(hemi);
// Moonlight: a dim cool light that takes over when the sun sets. Without it,
// night scenes render pitch black — Minecraft keeps a faint blue cast so the
// terrain stays readable. No shadows (moon shadows cost a second shadow pass
// for almost no visual gain).
const moonLight = new THREE.DirectionalLight(0x8899cc, 0);
moonLight.castShadow = false;
scene.add(moonLight);
scene.add(moonLight.target);

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
// Guarded so a texture error can never prevent the game from booting: if the
// atlas fails we fall back to a blank canvas and the game still runs.
let atlasCanvas;
try {
  atlasCanvas = buildAtlas(1337);
} catch (_e) {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 512;
  const cx = c.getContext('2d');
  cx.fillStyle = '#000';
  cx.fillRect(0, 0, 512, 512);
  cx.fillStyle = '#ff00ff';
  for (let y = 0; y < 16; y++) for (let x = 0; x < 16; x++) cx.fillRect(x * 32, y * 32, 30, 30);
  atlasCanvas = c;
}
const atlasTexture = new THREE.CanvasTexture(atlasCanvas);
atlasTexture.magFilter = THREE.NearestFilter;
atlasTexture.minFilter = THREE.NearestFilter;
atlasTexture.generateMipmaps = false;
atlasTexture.colorSpace = THREE.SRGBColorSpace;
atlasTexture.wrapS = atlasTexture.wrapT = THREE.ClampToEdgeWrapping;
setAtlasTexture(atlasTexture);
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
  polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1,
});
const crackPlane = new THREE.Mesh(new THREE.PlaneGeometry(1.001, 1.001), crackMaterial);
crackPlane.visible = false;
scene.add(crackPlane);

// --- Ghost block preview (semi-transparent block at placement position) ---
const ghostGeo = new THREE.BoxGeometry(1, 1, 1);
const ghostMat = new THREE.MeshBasicMaterial({
  transparent: true, opacity: 0.35, depthWrite: false, color: 0xffffff,
  polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1,
});
const ghostMesh = new THREE.Mesh(ghostGeo, ghostMat);
ghostMesh.visible = false;
ghostMesh.renderOrder = 999;
scene.add(ghostMesh);

function updateBreaking(progress, hit) {
  if (progress <= 0 || !hit) { crackPlane.visible = false; return; }
  crackPlane.visible = true;
  drawCrack(crackCanvas, Math.min(1, progress));
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
    // Top/bottom face: rotate around X to be horizontal
    crackPlane.rotation.set(ny > 0 ? -Math.PI / 2 : Math.PI / 2, 0, 0);
  } else if (Math.abs(nx) > 0.5) {
    // Left/right face: rotate around Y to face sideways
    crackPlane.rotation.set(0, nx > 0 ? Math.PI / 2 : -Math.PI / 2, 0);
  } else {
    // Front/back face: rotate around Y to face forward/back
    crackPlane.rotation.set(0, nz > 0 ? 0 : Math.PI, 0);
  }
}

// --- UI / audio ---
const audio = new AudioManager();
const achievements = new AchievementManager();
const ui = new UI(atlasCanvas, audio);
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
    if (player.addXp(xpGain)) {
      ui.showLevelUp(player.level);
      if (audio) audio.levelUp();
    }
  }
};
ui.onSmelt = (inputItem, count) => {
  achievements.incrementMapStat('smelted', inputItem, count);
};

// Overflowing items (crafting/inventory close with a full inventory) drop on the ground.
 ui.onItemOverflow = (stacks) => {
   if (!gameRunning || !player || !droppedItemManager) return;
   const px = player.position.x, py = player.position.y + 1, pz = player.position.z;
   for (const s of stacks) droppedItemManager.drop(s.item, s.count, px, py, pz);
 };

 // Broadcast local chest edits to other players in the room.
 ui.onChestChange = (x, y, z, slots) => {
   if (network && network.isInRoom()) network.sendChestUpdate(x, y, z, slots);
 };

// --- sleep overlay ---
const sleepOverlay = document.getElementById('sleep-overlay');
const sleepMessage = document.getElementById('sleep-message');

// --- underwater overlay ---
const underwaterOverlay = document.getElementById('underwater-overlay');

// --- stars overlay ---
const starsOverlay = document.getElementById('stars');

// --- Game state (set by startGame) ---
let world = null, manager = null, loader = null, player = null, mobManager = null, explosionManager = null, playerModel = null;
let _lastLocalArmorKey = '';
let _particles = [];
let _rarityGlowTimer = 0;
const _particleGeoSmall = new THREE.BoxGeometry(0.05, 0.05, 0.05);
let _portalOrbs = [];

// Boss state
let bossActive = false, bossEntity = null, bossSpawnTimer = 0, bossAttackTimer = 0;
let _portalRings = [];      // up to 2 linked portal rings ({ entry, exit })
let _portalRingCooldown = 0; // prevents instant re-teleport loops
const _particleGeoMed = new THREE.BoxGeometry(0.06, 0.06, 0.06);
const _particleGeoTiny = new THREE.BoxGeometry(0.03, 0.03, 0.03);
const _sprintParticleMat = new THREE.MeshBasicMaterial({ color: 0xcccccc, transparent: true, opacity: 0.5 });
const _waterSplashMat = new THREE.MeshBasicMaterial({ color: 0x4488cc, transparent: true, opacity: 0.6 });
const _critParticleMat = new THREE.MeshBasicMaterial({ color: 0xffff44, transparent: true, opacity: 0.7 });
const _bossHitMat = new THREE.MeshBasicMaterial({ color: 0xff3300, transparent: true, opacity: 0.8 });
const _rarityMatCache = new Map();
const _biomeNames = ['Ocean','DeepOc','Beach','Plains','Forest','Birch','DarkF','Taiga','Desert','Jungle','Savanna','Swamp','Snowy','Mountains','River'];
const _cameraModes = ['First Person', 'Third Person (Back)', 'Third Person (Front)'];

// Particle pool: reuse Mesh objects instead of allocating new ones
const _particlePool = [];
function _acquireParticleMesh(geo, mat) {
  const pooled = _particlePool.pop();
  if (pooled) {
    pooled.geometry = geo;
    pooled.material = mat;
    return pooled;
  }
  return new THREE.Mesh(geo, mat);
}
function _releaseParticleMesh(m) {
  m.visible = false;
  _particlePool.push(m);
}

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
let baseFov = 70; // FOV setting; sprint FOV zooms from this
let _dwState = { mode: 'creative', diff: 'normal', terrain: 'flat', mp: 'solo', maxPlayers: 10 };
let _pendingDevWorldOpts = null;
let gameDifficulty = 'normal'; // 'normal' | 'hard'
let mouseSensitivity = 1.0; // 0.2 .. 2.0 multiplier
let showFps = true;
let joiningViaLink = false; // true when auto-joining from a shareable link
let mobile = null;
let isMultiplayer = false;
let droppedItemManager = null;
let tntManager = null;
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
  const bErrors = document.getElementById('btn-pause-errors');
  if (bErrors) bErrors.style.display = isDev ? '' : 'none';
  const bMenuErrors = document.getElementById('btn-menu-errors');
  if (bMenuErrors) bMenuErrors.style.display = isDev ? '' : 'none';
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
  if (gs && gs.muteAudio) { if (audio) audio.setMuted(true); }
} catch (_) {}
// Listen for live game settings changes (CrazyGames requirement)
try {
  window.CrazyGames?.SDK?.game?.onGameSettingsUpdate?.((settings) => {
    if (settings && settings.disableChat !== undefined) chatDisabled = !!settings.disableChat;
    if (settings && settings.muteAudio !== undefined) { if (audio) audio.setMuted(!!settings.muteAudio); }
  });
} catch (_) {}
// Listen for CG auth state changes (guest logs in while playing)
// Use addAuthListener (v3 API) with fallback to onAuthStateChange (legacy).
try {
  const _cgUser = window.CrazyGames?.SDK?.user;
  const _authCb = (user) => {
    if (user && user.id) {
      const newName = user.username || playerName;
      if (newName !== playerName) {
        playerName = filterProfanity(newName);
        cloudSet('bf_player_name', playerName);
        const nameEl = document.getElementById('menu-player-name');
        if (nameEl) nameEl.textContent = playerName;
      }
    }
  };
  if (_cgUser && typeof _cgUser.addAuthListener === 'function') {
    _cgUser.addAuthListener(_authCb);
  } else if (_cgUser && typeof _cgUser.onAuthStateChange === 'function') {
    _cgUser.onAuthStateChange(_authCb);
  }
} catch (_) {}

// --- sleep state ---
let sleeping = false;
let isDevWorld = false; // dev creative superflat test world
let cheatsEnabled = false; // world-gen "Allow Cheats" setting (commands/replay/F7)
let isParkour = false;   // parkour mode
let isOneBlock = false;  // OneBlock minigame mode
let isBedwars = false;   // Bedwars minigame mode
let isBlockZones = false; // BlockZones minigame mode
let isNights = false;    // 99Nights minigame mode
let isGunAffair = false; // GunAffair minigame mode
let isSkyblock = false;  // SkyBlock minigame mode

// --- Bedwars state ---
let bwMyTeamKey = null;   // local player's team key
let bwMyTeam = null;      // local player's BW_TEAMS entry
let bwMap = null;         // built map metadata (beds, spawn, shop, generators)
let bwGens = [];          // [{ item, stack, every, x, y, z, timer }]
let bwBeds = {};          // teamKey -> { cells, intact }
let bwGameOver = false;   // a winner has been decided
let bwWinTeamKey = null;  // winning team
let bwSpec = false;       // local player eliminated → spectator
let bwHudEl = null;       // HUD element
let _pendingRoomEdits = null; // block_batch edits buffered while the world loads
let _isImportedParkour = false; // imported Minecraft parkour map
let _parkourLevelEnds = null;
let _parkourTimerEl = null;
let _parkourLevelEl = null;
let _parkourDeathsEl = null;
let _oneBlockEl = null;
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
let miningSfxActive = false; // looping mining grit currently playing
let placeAnimTimer = 0;
let _plateCleanTimer = 0; // throttle for the pressure-plate cleanup scan (see _gameFrame)
let _leafDecayPositions = new Set();
let _leafDecayTimer = 0;
let _portalTeleportCooldown = 0;
let _portalHomePos = null; // stored position before first portal teleport (for return trip)
let _portalHomeVelocity = null; // saved velocity for return trip
let _portalTriggered = false; // signal for dimension switch in game loop
let _dimensionOverworld = null; // overworld World instance (when in dimension mode)
let _dimensionTarget = null;   // dimension World instance (when in dimension mode)
let _isDimensionMode = false;  // whether this world has dual dimensions
let _activeDimension = 'overworld'; // 'overworld' or 'dimension'
let _overworldSpawnPos = null; // saved player position before dimension switch
let _dimensionSpawnPos = null; // saved player position before overworld switch
let _dimensionSeed = null;     // seed used to lazily generate the dimension world
let _pendingDimensionLoad = null; // saved dimension edits to apply on first entry

function lockPointer() {
  if (mobile && mobile.isMobile) return; // no pointer lock on mobile
  _relocking = true;
  try {
    const p = renderer.domElement.requestPointerLock();
    if (p && typeof p.then === 'function') {
      p.catch(e => { e && e.preventDefault && e.preventDefault(); });
    }
  } catch (_) { console.warn("operation failed"); }
}

renderer.domElement.addEventListener('click', () => {
  if (ui.isOverlayShown()) return;
  if (!pointerLocked) lockPointer();
});

document.addEventListener('pointerlockchange', () => {
  pointerLocked = document.pointerLockElement === renderer.domElement;
  // External pointer lock change — we didn't initiate it, so bail out.
  if (pointerLocked && !_relocking) return;
  // Don't open the pause menu if we just closed a UI panel and are trying to re-lock,
  // or if chat/inventory/chest/furnace is open, or if on mobile, or voice panel is open.
  if (_relocking) {
    _relocking = false;
    // If pointer didn't actually lock (denied by browser), re-lock after a beat
    if (!pointerLocked && gameRunning && !chatOpen) {
      setTimeout(() => { if (gameRunning && !chatOpen) lockPointer(); }, 100);
    }
    return;
  }
  if (!pointerLocked && gameRunning && !ui.inventoryOpen && !ui.furnaceOpen && !ui.chestOpen && !chatOpen && !ui.isOverlayShown()) {
    if (!(mobile && mobile.isMobile) && !(voiceChat && voiceChat.panelOpen)) {
      refreshDevPauseBtn();
      ui.showMenu('pause');
      cgGameplayStop();
      cgClearGameContext();
    }
  }
});

// Voice panel toggle — lock/unlock pointer
window.addEventListener('voice-panel-toggle', (e) => {
  if (e.detail && e.detail.open) {
    if (document.pointerLockElement) document.exitPointerLock?.();
  } else {
    // Re-lock if game is still running and no other UI is open
    if (gameRunning && !ui.inventoryOpen && !ui.furnaceOpen && !ui.isOverlayShown()) {
      try { renderer.domElement.requestPointerLock(); } catch (_) { console.warn("pointer lock request failed"); }
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
  if (replayMode) {
    const sens = 0.0022 * (window.__mouseSens || 1.0);
    replayCam.yaw -= e.movementX * sens;
    replayCam.pitch -= e.movementY * sens;
    const max = Math.PI / 2 - 0.01;
    replayCam.pitch = Math.max(-max, Math.min(max, replayCam.pitch));
    return;
  }
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
      document.exitPointerLock?.();
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
    // MC behavior: number keys swap hovered slot with hotbar slot in any screen
    const hovered = ui._hoveredSlot && ui._hoveredSlot();
    if (hovered && (ui.inventoryOpen || ui.chestOpen || ui.furnaceOpen)) {
      const inv = player.inventory;
      const tmp = inv.slots[idx];
      const hoveredData = ui._getSlot(hovered.kind, hovered.idx);
      if (hovered.kind === 'inv' || hovered.kind === 'chest-inv' || hovered.kind === 'chest-hot' || hovered.kind === 'furnace-inv') {
        inv.slots[idx] = hoveredData;
        ui._setSlot(hovered.kind, hovered.idx, tmp);
      } else if (hovered.kind === 'craft') {
        inv.slots[idx] = hoveredData;
        ui._setSlot(hovered.kind, hovered.idx, tmp);
      } else if (hovered.kind === 'chest') {
        inv.slots[idx] = hoveredData;
        ui.chestSlots[hovered.idx] = tmp;
      } else if (hovered.kind.startsWith('furnace-') && hovered.kind !== 'furnace-inv') {
        inv.slots[idx] = hoveredData;
        ui.furnaceSlots[hovered.idx] = tmp;
      } else if (hovered.kind === 'craft-out') {
        inv.slots[idx] = hoveredData;
        if (ui.craftingGrid.output) {
          ui.craftingGrid.output = { id: tmp ? tmp.item : 0, count: tmp ? tmp.count : 0 };
        }
      }
      ui._refreshScreen();
      ui._updateCursorVisual();
    } else if (ui.inventoryOpen && ui.cursorItem) {
      const inv = player.inventory;
      const tmp = inv.slots[idx];
      inv.slots[idx] = ui.cursorItem;
      ui.cursorItem = tmp;
      ui.renderInventoryGrid(inv);
      ui.renderArmorSlots();
      ui._updateCursorVisual();
    } else {
      ui.setActive(idx);
      player.inventory.setSelected(idx);
      syncUIMode();
      showHeldItemName();
    }
  }
  // Q = drop item (thrown in the direction you're looking)
  if (e.code === kb.drop) {
    if (ui.inventoryOpen || ui.chestOpen || ui.furnaceOpen) {
      if (ui.cursorItem) {
        if (droppedItemManager) {
          const throwSpeed = 3.5;
          const tvx = -Math.sin(player.yaw) * throwSpeed + (Math.random() - 0.5) * 0.6;
          const tvz = -Math.cos(player.yaw) * throwSpeed + (Math.random() - 0.5) * 0.6;
          droppedItemManager.drop(ui.cursorItem.item, 1, player.position.x, player.position.y + 1, player.position.z, tvx, tvz);
        }
        ui.cursorItem.count--;
        if (ui.cursorItem.count <= 0) ui.cursorItem = null;
        ui._updateCursorVisual();
      } else {
        const hovered = ui._hoveredSlot && ui._hoveredSlot();
        if (hovered) {
          const s = ui._getSlot(hovered.kind, hovered.idx);
          if (s) {
            if (droppedItemManager) {
              const throwSpeed = 3.5;
              const tvx = -Math.sin(player.yaw) * throwSpeed + (Math.random() - 0.5) * 0.6;
              const tvz = -Math.cos(player.yaw) * throwSpeed + (Math.random() - 0.5) * 0.6;
              droppedItemManager.drop(s.item, 1, player.position.x, player.position.y + 1, player.position.z, tvx, tvz);
            }
            s.count--;
            if (s.count <= 0) ui._setSlot(hovered.kind, hovered.idx, null);
            ui._refreshScreen();
            ui._updateCursorVisual();
          }
        }
      }
    } else {
      const slot = player.inventory.getSelected();
      if (slot) {
        if (droppedItemManager) {
          const throwSpeed = 3.5;
          const tvx = -Math.sin(player.yaw) * throwSpeed + (Math.random() - 0.5) * 0.6;
          const tvz = -Math.cos(player.yaw) * throwSpeed + (Math.random() - 0.5) * 0.6;
          droppedItemManager.drop(slot.item, 1, player.position.x, player.position.y + 1, player.position.z, tvx, tvz);
        }
        slot.count--;
        if (slot.count <= 0) player.inventory.slots[player.inventory.selected] = null;
        syncUIMode();
      }
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
  // Z = toggle replay (free cinematic) camera
  if (e.code === kb.replay && gameRunning && !ui.inventoryOpen && !chatOpen) {
    e.preventDefault();
    if (!cheatsEnabled) {
      ui.itemNameEl.textContent = 'Cheats are disabled in this world';
      ui.itemNameEl.classList.add('visible');
      _itemNameTimer = 1.5;
      return;
    }
    toggleReplayMode();
    return;
  }
  // F5 = cycle camera (1st person → 3rd person back → 3rd person front)
  if (e.code === kb.perspective) {
    e.preventDefault();
    if (replayMode) return;
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
  // F7 = toggle gamemode (singleplayer + cheats only) — locked inside minigames.
  if (e.code === 'F7') {
    e.preventDefault();
    const inMinigame = isParkour || isOneBlock || isBedwars || isBlockZones || isNights || isGunAffair || isSkyblock;
    if (inMinigame) {
      ui.itemNameEl.textContent = 'Cannot change gamemode in minigames';
      ui.itemNameEl.classList.add('visible');
      setTimeout(() => ui.itemNameEl.classList.remove('visible'), 2000);
    } else if (!cheatsEnabled) {
      ui.itemNameEl.textContent = 'Cheats are disabled in this world';
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
  // GunAffair weapon switching: number keys 1-4 select a gun directly.
  if (isGunAffair && e.key >= '1' && e.key <= String(GA_GUNS.length)) {
    e.preventDefault();
    selectGun(Number(e.key) - 1);
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
  namesEl.textContent = '';
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
let _autoRegisterFallback = false; // when true, retry auth with 'register' mode if account not found
let _devPanelNeedsAccounts = false;
let _pendingLinkProvider = ''; // used to track which OAuth provider is being linked

function openFriendsMenu() {
  const note = document.getElementById('friends-login-note');
  const main = document.getElementById('friends-main');
  let pass = '';
  try { pass = _xorDecode(localStorage.getItem('bf_login_pass') || '') || ''; } catch (_) { console.warn("localStorage read failed"); }
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
    addChatLine('Please connect to WiFi or Data to use Friends & DMs.', '#fa0', true);
    return;
  }
  if (!network.isInRoom()) { _backgroundAuth = true; network.sendAuth(playerName, pass, 'login'); }
  network.friendList();
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
      <button class="fr-dm menu-btn" data-name="${escHtml(f.name)}" style="min-width:auto;padding:5px 10px;font-size:10px;background:linear-gradient(180deg,#5a7aaa,#365070);border-color:#2a5080;${f.online ? '' : 'opacity:0.5;'}">MESSAGE</button>
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
  document.querySelectorAll('.fr-dm').forEach(b => b.addEventListener('click', () => openDM(b.dataset.name)));
}

// ── Direct Messages (localStorage-based, Roblox-style) ────────────────
function _dmKey(a, b) {
  return 'bf_dm_' + [a, b].sort().join('__');
}
function _loadDMThread(name) {
  const me = playerName || '';
  if (!me || !name) return [];
  try { return JSON.parse(localStorage.getItem(_dmKey(me, name)) || '[]'); } catch (_) { return []; }
}
function _saveDMThread(name, msgs) {
  const me = playerName || '';
  if (!me || !name) return;
  cloudSet(_dmKey(me, name), JSON.stringify(msgs));
}
// Deduplicate: check if a message already exists (prevents multi-tab doubling)
function _dmExists(name, from, text, time) {
  const msgs = _loadDMThread(name);
  return msgs.some(m => m.from === from && m.text === text && Math.abs(m.time - time) < 2000);
}
// Load raw DM thread by localStorage key (for cross-device sync)
function _loadDMThreadRaw(key) {
  try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch (_) { return []; }
}
// Merge two message arrays, deduplicating by message id
function _mergeDmArrays(local, remote) {
  const seen = new Set(local.map(m => m.id));
  const merged = [...local];
  for (const m of remote) {
    if (m && m.id && !seen.has(m.id)) {
      merged.push(m);
      seen.add(m.id);
    }
  }
  merged.sort((a, b) => (a.time || 0) - (b.time || 0));
  return merged;
}
let _dmOpenFor = '';
function openDM(friendName) {
  if (chatDisabled) {
    addChatLine('Chat is disabled on this world.', '#f55', true);
    return;
  }
  _dmOpenFor = friendName;
  const friendsMain = document.getElementById('friends-main');
  const dmPanel = document.getElementById('dm-panel');
  const dmRecipient = document.getElementById('dm-recipient');
  const dmOnline = document.getElementById('dm-online-dot');
  const backBtn = document.getElementById('dm-back');
  const sendBtn = document.getElementById('dm-send');
  const input = document.getElementById('dm-input');
  if (friendsMain) friendsMain.style.display = 'none';
  if (dmPanel) dmPanel.style.display = '';
  if (dmRecipient) dmRecipient.textContent = friendName;
  const fr = (_friendState.friends || []).find(f => f.name === friendName);
  if (dmOnline) dmOnline.style.background = fr?.online ? '#4d4' : '#666';
  if (input) { input.value = ''; input.focus(); }
  renderDMMessages();
  if (backBtn) backBtn.onclick = closeDM;
  if (sendBtn) sendBtn.onclick = () => _dmSend();
  if (input) input.onkeydown = (e) => { if (e.key === 'Enter') _dmSend(); };
  // Notify the sender we read their messages (triggers blue tick)
  if (network.connected) {
    try { network.sendDmRead(friendName); } catch (_) {}
  }
}
function closeDM() {
  _dmOpenFor = '';
  const friendsMain = document.getElementById('friends-main');
  const dmPanel = document.getElementById('dm-panel');
  if (dmPanel) dmPanel.style.display = 'none';
  if (friendsMain) friendsMain.style.display = '';
}
let _dmOfflineQueue = []; // { to, text, time, id } — queued DMs to send when online
let _dmIdCounter = Date.now();
function _nextDmId() { return String(++_dmIdCounter); }

function _dmSend() {
  if (!_dmOpenFor) return;
  if (chatDisabled) {
    addChatLine('Chat is disabled on this world.', '#f55', true);
    return;
  }
  const input = document.getElementById('dm-input');
  const text = filterProfanity((input?.value || '').trim());
  if (!text) return;
  const msgId = _nextDmId();
  const msgs = _loadDMThread(_dmOpenFor);
  msgs.push({ from: playerName, text, time: Date.now(), id: msgId, status: 'sent' });
  _saveDMThread(_dmOpenFor, msgs);
  if (input) input.value = '';
  renderDMMessages();
  // Send over the network so the other player receives it too.
  if (network.connected) {
    try { network.sendDm(_dmOpenFor, text, msgId); } catch (_) { console.warn("network sendDm failed"); }
  } else {
    // Queue for delivery when we come back online
    _dmOfflineQueue.push({ to: _dmOpenFor, text, time: Date.now(), id: msgId });
    cloudSet('bf_dm_offline_queue', JSON.stringify(_dmOfflineQueue));
    addChatLine('Message queued — will send when you\'re online.', '#fa0', true);
  }
}

function _flushOfflineDMs() {
  if (!network.connected || !_dmOfflineQueue.length) return;
  const queue = [..._dmOfflineQueue];
  _dmOfflineQueue = [];
  try { localStorage.removeItem('bf_dm_offline_queue'); } catch {}
  for (const dm of queue) {
    try { network.sendDm(dm.to, dm.text, dm.id); } catch (_) { console.warn("network sendDm failed"); }
  }
  if (queue.length > 0) addChatLine(`Sent ${queue.length} queued message${queue.length > 1 ? 's' : ''}.`, '#8c8', true);
}
function renderDMMessages() {
  const el = document.getElementById('dm-messages');
  if (!el) return;
  const msgs = _loadDMThread(_dmOpenFor);
  if (msgs.length === 0) {
    el.innerHTML = '<div style="font:11px monospace;color:#666;text-align:center;padding:20px;">Send a message to start chatting!</div>';
    return;
  }
  el.innerHTML = msgs.map(m => {
    const mine = m.from === playerName;
    let rendered = escHtml(m.text);
    rendered = rendered.replace(/(https?:\/\/[^\s<]+)/g, url => {
      if (/\.(gif|png|jpe?g|webp|svg)/i.test(url) || /giphy\.com|imgur\.com|i\.redd\.it/i.test(url)) {
        return '<img src="' + url + '" style="max-width:180px;max-height:130px;border-radius:4px;margin-top:3px;" loading="lazy">';
      }
      return '<a href="' + url + '" target="_blank" rel="noopener" style="color:#8af;text-decoration:underline;">' + url + '</a>';
    });
    // WhatsApp-style ticks for sent messages
    let ticks = '';
    if (mine) {
      const st = m.status || 'sent';
      if (st === 'read') {
        ticks = '<span style="color:#53bdeb;font-size:11px;margin-left:4px;">✓✓</span>';
      } else if (st === 'delivered') {
        ticks = '<span style="color:#888;font-size:11px;margin-left:4px;">✓✓</span>';
      } else {
        ticks = '<span style="color:#888;font-size:11px;margin-left:4px;">✓</span>';
      }
    }
    return `<div style="display:flex;${mine ? 'justify-content:flex-end' : 'justify-content:flex-start'};">
      <div style="max-width:75%;padding:7px 10px;border-radius:8px;font:12px monospace;color:#eee;background:${mine ? 'rgba(60,100,160,0.6)' : 'rgba(50,50,60,0.6)'};border:1px solid ${mine ? 'rgba(80,120,180,0.4)' : 'rgba(80,80,100,0.3)'};">
        ${mine ? '' : `<div style="font-size:10px;color:#8bd;margin-bottom:2px;">${escHtml(m.from)}</div>`}
        <div>${rendered}${ticks}</div>
      </div>
    </div>`;
  }).join('');
  el.scrollTop = el.scrollHeight;
}

// --- Controls / key bindings screen ----------------------------------------
let _rebinding = null;
let _controlsKeybindsCache = '';

function renderControls() {
  const list = document.getElementById('controls-list');
  if (!list) return;
  const kb = getKeybinds();
  const snapshot = JSON.stringify(kb);
  if (snapshot === _controlsKeybindsCache && list.children.length > 0) return;
  _controlsKeybindsCache = snapshot;
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

// mouse wheel cycles hotbar (or the GunAffair arsenal)
window.addEventListener('wheel', (e) => {
  if (!gameRunning) return;
  if (replayMode) {
    replayCam.speed = Math.max(2, Math.min(300, replayCam.speed * (e.deltaY > 0 ? 0.9 : 1.12)));
    return;
  }
  if (isGunAffair) {
    cycleGun(Math.sign(e.deltaY));
    return;
  }
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
  if (replayMode) return; // no world interactions in replay camera
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

      }
      e.preventDefault();
    }
  } else if (e.button === 2) {
    const hit = currentTarget();
    const held = player.inventory.getSelected();
    if (held && SPAWN_EGG_MOBS[held.item]) {
      if (hit && mobManager) {
        const mobType = SPAWN_EGG_MOBS[held.item];
        mobManager.spawnAt(mobType, hit.nx + 0.5, hit.ny, hit.nz + 0.5);
        audio.play('place_stone', 0.5);
        if (!player.isCreative()) {
          held.count--;
          if (held.count <= 0) player.inventory.slots[player.inventory.selected] = null;
        }
        syncUIMode();
        e.preventDefault();
        return;
      }
    }
    if (held && (held.item === ITEM.BUCKET || held.item === ITEM.WATER_BUCKET || held.item === ITEM.LAVA_BUCKET)) {
      handleBucket(held, hit);
      e.preventDefault();
      return;
    }
    // Traveler trade: right-click while looking at a Traveler mob
    if (mobManager && player) {
      const tdir = _mobDirVec;
      camera.getWorldDirection(tdir);
      const mobHit = mobManager.hitTest(camera.position, tdir, REACH);
      if (mobHit && mobHit.type === 'traveler' && !mobHit.dead) {
        openTravelerTrade(mobHit);
        e.preventDefault();
        return;
      }
    }
    if (hit && isCraftingTable(hit.block)) {
      if (isBedwars) {
        openBedwarsShop();
        e.preventDefault();
        return;
      }
      ui.openInventory(player.inventory, 3, false);
      achievements.incrementStat('inventoryOpened');
      document.exitPointerLock?.();
    } else if (hit && hit.block === BLOCK.FURNACE) {
      ui.openFurnace(player.inventory, hit.x, hit.y, hit.z);
      document.exitPointerLock?.();
    } else if (hit && hit.block === BLOCK.CHEST) {
      const slots = world.getOrCreateChest(hit.x, hit.y, hit.z);
      ui.openChest(slots, player.inventory, hit.x, hit.y, hit.z);
      document.exitPointerLock?.();
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

      // Portal Orb: throw like an ender pearl. Sneak = place a linked portal ring.
      if (!used && slot && slot.item === ITEM.PORTAL_ORB) {
        const isSneaking = !!(player && player.crouching);
        throwPortalOrb(isSneaking ? 'portal' : 'warp');
        if (player.isSurvival()) {
          slot.count--;
          if (slot.count <= 0) player.inventory.slots[player.inventory.selected] = null;
          syncUIMode();
        }
        used = true;
      }

      // Paradox Core: ignite a 4x5 Compressed-Voidstone portal frame (dimension only)
      if (!used && slot && slot.item === ITEM.PARADOX_CORE) {
        const hit = currentTarget();
        if (hit && tryIgniteVoidPortal(hit)) {
          if (player.isSurvival()) {
            slot.count--;
            if (slot.count <= 0) player.inventory.slots[player.inventory.selected] = null;
            syncUIMode();
          }
          if (audio) audio.portalOpen?.();
          used = true;
        }
      }

      // Grapple Hook: pull the player to the targeted surface
      if (!used && slot && slot.item === ITEM.GRAPPLE_HOOK) {
        const hit = currentTarget();
        if (hit) {
          _grappleTarget.set(hit.x + 0.5, hit.y + 0.5, hit.z + 0.5);
          _grappleUntil = performance.now() / 1000 + 1.6;
          if (audio && audio.grapple) audio.grapple();
          used = true;
        }
      }

      // Frost Wand: freeze water/lava, or chill a mob in the crosshair
      if (!used && slot && slot.item === ITEM.FROST_WAND) {
        const hit = currentTarget();
        if (hit) {
          const b = world.getBlock(hit.x, hit.y, hit.z);
          if (b === BLOCK.WATER) world.setBlock(hit.x, hit.y, hit.z, BLOCK.ICE);
          else if (b === BLOCK.LAVA) world.setBlock(hit.x, hit.y, hit.z, BLOCK.OBSIDIAN);
          else {
            const mob = raycastMob(REACH);
            if (mob) mob._frostSlow = performance.now() / 1000 + 3;
          }
          spawnFrostParticles(hit.x + 0.5, hit.y + 0.5, hit.z + 0.5);
          if (audio && audio.frost) audio.frost();
          if (player.isSurvival()) { slot.count--; if (slot.count <= 0) player.inventory.slots[player.inventory.selected] = null; syncUIMode(); }
          used = true;
        }
      }

      // Blaze Rod Launcher: shoot a fireball
      if (!used && slot && slot.item === ITEM.BLAZE_LAUNCHER) {
        throwFireball();
        if (player.isSurvival()) { slot.count--; if (slot.count <= 0) player.inventory.slots[player.inventory.selected] = null; syncUIMode(); }
        used = true;
      }

      // Dimension Compass: point back to spawn / nearest portal
      if (!used && slot && slot.item === ITEM.DIMENSION_COMPASS) {
        const sp = player.spawnPoint || { x: 0, y: 64, z: 0 };
        const dx = sp.x - player.position.x, dz = sp.z - player.position.z;
        const ang = Math.atan2(dz, dx) * 180 / Math.PI;
        let dir = 'unknown';
        if (ang >= -45 && ang < 45) dir = 'East'; else if (ang >= 45 && ang < 135) dir = 'South';
        else if (ang >= 135 || ang < -135) dir = 'West'; else dir = 'North';
        addChatLine(`Dimension Compass → Spawn is to the ${dir} (${Math.round(sp.x)}, ${Math.round(sp.z)})`, '#7fd0ff');
        used = true;
      }

      // Main hand: eat food or place block
      if (!used && slot && slot.item === ITEM.BONE_MEAL) {
        const bHit = currentTarget();
        if (useBoneMeal(bHit)) {
          if (player.isSurvival()) {
            slot.count--;
            if (slot.count <= 0) player.inventory.slots[player.inventory.selected] = null;
            syncUIMode();
          }
          used = true;
        }
      }
      if (!used && player.isSurvival() && slot && isFood(slot.item)) {
        if (player.eat(foodValue(slot.item))) {
          slot.count--;
          if (slot.count <= 0) player.inventory.slots[player.inventory.selected] = null;
          syncUIMode();
          achievements.incrementStat('foodEaten');
          if (audio) audio.eat();
          if (slot.item === ITEM.PORKCHOP_COOKED) achievements.incrementStat('foodEatenPorkchop');
          used = true;
        }
      } else if (slot && isPlaceableBlockItem(slot.item)) {
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
        } else if (oh.item === ITEM.BONE_MEAL) {
          const bHit = currentTarget();
          if (useBoneMeal(bHit)) {
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
            if (audio) audio.eat();
          }
        } else if (isPlaceableBlockItem(oh.item)) {
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
  // Hide the on-screen mobile controls whenever a full-screen modal (inventory,
  // furnace, chest, overlay) is open so they can't overlap the UI or steal the
  // taps meant for the modal's buttons (e.g. the inventory CLOSE button).
  const screenOpen = ui.inventoryOpen || ui.furnaceOpen || ui.chestOpen || ui.isOverlayShown();
  document.body.classList.toggle('screen-open', screenOpen);
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

function spawnDragonBladeParticles(pos) {
  if (!scene) return;
  for (let i = 0; i < 12; i++) {
    const mat = new THREE.MeshBasicMaterial({ color: 0xff3300, transparent: true, opacity: 0.9 });
    const m = new THREE.Mesh(_particleGeoTiny, mat);
    m.position.set(pos.x + (Math.random() - 0.5) * 1.5, pos.y + Math.random() * 2, pos.z + (Math.random() - 0.5) * 1.5);
    scene.add(m);
    _particles.push({ mesh: m, vx: (Math.random() - 0.5) * 4, vy: 1 + Math.random() * 4, vz: (Math.random() - 0.5) * 4, life: 0.8, maxLife: 0.8 });
  }
}

// ── CrazyGames-exclusive "Crazy Trail" cosmetic (visual-only, local player) ──
let cgTrailEnabled = true;
let _cgTrailTimer = 0;
function spawnCGTrail() {
  if (!scene || !player || !player.position) return;
  const hue = (performance.now() / 18) % 360;
  const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color('hsl(' + hue + ',100%,62%)'), transparent: true, opacity: 0.7 });
  const m = new THREE.Mesh(_particleGeoTiny, mat);
  m.position.set(
    player.position.x + (Math.random() - 0.5) * 0.4,
    player.position.y + 0.12,
    player.position.z + (Math.random() - 0.5) * 0.4
  );
  scene.add(m);
  _particles.push({ mesh: m, vx: (Math.random() - 0.5) * 0.5, vy: 0.5 + Math.random() * 0.6, vz: (Math.random() - 0.5) * 0.5, life: 0.6, maxLife: 0.6 });
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
  // Rarity glow color
  const rarity = getItemRarity(slot.item);
  if (rarity && rarity.color !== '#aaa') {
    ui.itemNameEl.style.color = rarity.color;
    ui.itemNameEl.style.textShadow = `0 0 8px ${rarity.color}, 0 0 16px ${rarity.color}`;
  } else {
    ui.itemNameEl.style.color = '';
    ui.itemNameEl.style.textShadow = '';
  }
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
    cloudSet('bf_seen_messages', JSON.stringify(seen));
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
    if (p.life <= 0) { _stepParticles[i] = _stepParticles[_stepParticles.length - 1]; _stepParticles.length--; continue; }
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
  // Spawns an animated lit-TNT entity that bounces and blinks, then explodes.
  if (tntManager) tntManager.ignite(x, y, z, 1.5);
}

// ── Portal Orb throwable (ender-pearl style teleport) ───────────────
const _portalOrbVel = new THREE.Vector3();

class PortalOrb {
  constructor(x, y, z, vx, vy, vz, mode) {
    this.x = x; this.y = y; this.z = z;
    this.vx = vx; this.vy = vy; this.vz = vz;
    this.age = 0;
    this.done = false;
    this.landed = false;
    // mode: 'warp' = instant teleport on landing (ender-pearl style),
    //       'portal' = place a portal ring at the landing point.
    this.mode = mode || 'warp';

    const geo = new THREE.SphereGeometry(0.18, 8, 8);
    const mat = new THREE.MeshBasicMaterial({ color: 0x50f0ff, transparent: true, opacity: 0.95 });
    this.mesh = new THREE.Mesh(geo, mat);
    this.mesh.position.set(x, y, z);
    scene.add(this.mesh);

    const glowGeo = new THREE.SphereGeometry(0.32, 8, 8);
    const glowMat = new THREE.MeshBasicMaterial({ color: 0x30d0ff, transparent: true, opacity: 0.25 });
    this.glow = new THREE.Mesh(glowGeo, glowMat);
    this.mesh.add(this.glow);

    // Point light so the orb lights up its surroundings as it flies
    this.light = new THREE.PointLight(0x40e0ff, 0.9, 6, 1.8);
    this.mesh.add(this.light);

    // Two spinning halo rings around the core (one cyan, one white)
    const haloGeo = new THREE.TorusGeometry(0.34, 0.015, 4, 12);
    this.haloA = new THREE.Mesh(haloGeo, new THREE.MeshBasicMaterial({ color: 0x80e0ff, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false }));
    this.haloB = new THREE.Mesh(haloGeo.clone(), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false }));
    this.mesh.add(this.haloA, this.haloB);
  }

  update(dt) {
    this.age += dt;
    this.vy -= 14 * dt;
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    this.z += this.vz * dt;
    this.mesh.position.set(this.x, this.y, this.z);
    this.mesh.rotation.y += dt * 6;
    this.mesh.rotation.z += dt * 4;
    this.haloA.rotation.x += dt * 5;
    this.haloB.rotation.y += dt * 7;

    // Pulsing glow
    this.glow.material.opacity = 0.2 + 0.15 * Math.sin(this.age * 12);
    this.glow.scale.setScalar(1 + 0.15 * Math.sin(this.age * 9));

    // Trail particles
    if (Math.random() < 0.75) {
      const m = new THREE.Mesh(_particleGeoTiny, new THREE.MeshBasicMaterial({ color: 0x40e0ff, transparent: true, opacity: 0.7 }));
      m.position.set(this.x, this.y, this.z);
      scene.add(m);
      _particles.push({ mesh: m, vx: (Math.random() - 0.5) * 0.6, vy: (Math.random() - 0.5) * 0.6, vz: (Math.random() - 0.5) * 0.6, life: 0.4, maxLife: 0.4 });
    }

    // Landing check: colliding with solid blocks, or after max flight time
    const bx = Math.floor(this.x), by = Math.floor(this.y), bz = Math.floor(this.z);
    const blk = world.getBlock(bx, by, bz);
    if (this.vy <= 0 && BLOCKS[blk] && BLOCKS[blk].solid) {
      this.done = true;
      this.landed = true;
    } else if (this.age > 4) {
      this.done = true;
    }
  }

  dispose() {
    scene.remove(this.mesh);
    this.mesh.geometry.dispose();
    this.light.dispose();
    this.haloA.geometry.dispose(); this.haloA.material.dispose();
    this.haloB.geometry.dispose(); this.haloB.material.dispose();
    this.mesh.material.dispose();
    this.glow.geometry.dispose();
    this.glow.material.dispose();
  }
}

function throwPortalOrb(mode) {
  if (!player || !world || !camera) return;
  camera.getWorldDirection(_portalOrbVel);
  _portalOrbVel.multiplyScalar(21);
  _portalOrbVel.y += 2.5;
  const o = camera.position;
  const orb = new PortalOrb(o.x, o.y, o.z, _portalOrbVel.x, _portalOrbVel.y, _portalOrbVel.z, mode || 'warp');
  _portalOrbs.push(orb);
  achievements.incrementStat('portalOrbsUsed');
  if (audio && audio.throwProjectile) audio.throwProjectile();
}

function updatePortalOrbs(dt) {
  if (!_portalOrbs.length) return;
  for (let i = _portalOrbs.length - 1; i >= 0; i--) {
    const orb = _portalOrbs[i];
    orb.update(dt);
    if (orb.done) {
      if (orb.landed) {
        portalOrbImpact(orb);
        if (orb.mode === 'portal') placePortalRing(orb);
        else teleportToPortalOrb(orb);
      }
      orb.dispose();
      _portalOrbs[i] = _portalOrbs[_portalOrbs.length - 1];
      _portalOrbs.length--;
    }
  }
}

// ── Utility-item helpers (grapple, frost, fireball) ────────────────────────────
const _grappleTarget = new THREE.Vector3();
let _grappleUntil = 0;

// Nearest mob along the camera ray within `range` (for the Frost Wand).
function raycastMob(range) {
  if (!camera || !mobManager || !mobManager.mobs) return null;
  camera.getWorldDirection(_rayDir);
  let best = null, bestT = Infinity;
  for (const mob of mobManager.mobs) {
    const p = mob.position;
    const dx = p.x - camera.position.x, dy = (p.y + 0.8) - camera.position.y, dz = p.z - camera.position.z;
    const t = dx * _rayDir.x + dy * _rayDir.y + dz * _rayDir.z;
    if (t < 0 || t > range) continue;
    const px = camera.position.x + _rayDir.x * t, py = camera.position.y + _rayDir.y * t, pz = camera.position.z + _rayDir.z * t;
    const perp = Math.hypot(dx - _rayDir.x * t, dy - _rayDir.y * t, dz - _rayDir.z * t);
    if (perp < 1.1 && t < bestT) { bestT = t; best = mob; }
  }
  return best;
}

function spawnFrostParticles(x, y, z) {
  if (!scene) return;
  for (let i = 0; i < 14; i++) {
    const mat = new THREE.MeshBasicMaterial({ color: 0xbfeaff, transparent: true, opacity: 0.9 });
    const m = new THREE.Mesh(_particleGeoTiny, mat);
    m.position.set(x + (Math.random() - 0.5), y + (Math.random() - 0.5), z + (Math.random() - 0.5));
    scene.add(m);
    _particles.push({ mesh: m, vx: (Math.random() - 0.5) * 1.5, vy: Math.random() * 1.5, vz: (Math.random() - 0.5) * 1.5, life: 0.7, maxLife: 0.7 });
  }
}

// Blaze fireballs: glowing projectile that damages mobs on impact.
const _fireballs = [];
function throwFireball() {
  if (!player || !camera) return;
  camera.getWorldDirection(_rayDir);
  _rayDir.multiplyScalar(24); _rayDir.y += 1.5;
  const o = camera.position;
  const fb = { x: o.x, y: o.y, z: o.z, vx: _rayDir.x, vy: _rayDir.y, vz: _rayDir.z, life: 4 };
  const mat = new THREE.MeshBasicMaterial({ color: 0xff7a1a });
  const mesh = new THREE.Mesh(_particleGeoTiny, mat);
  mesh.scale.setScalar(2.2);
  if (scene) scene.add(mesh);
  fb.mesh = mesh;
  _fireballs.push(fb);
  if (audio && audio.throwProjectile) audio.throwProjectile();
}
function updateFireballs(dt) {
  for (let i = _fireballs.length - 1; i >= 0; i--) {
    const fb = _fireballs[i];
    fb.life -= dt;
    fb.x += fb.vx * dt; fb.y += fb.vy * dt; fb.z += fb.vz * dt;
    fb.vy -= 9 * dt * 0.5;
    if (fb.mesh) fb.mesh.position.set(fb.x, fb.y, fb.z);
    const bx = Math.floor(fb.x), by = Math.floor(fb.y), bz = Math.floor(fb.z);
    const blk = world ? world.getBlock(bx, by, bz) : 0;
    let hitMob = null;
    if (mobManager && mobManager.mobs) {
      const fdir = new THREE.Vector3(fb.vx, fb.vy, fb.vz).normalize();
      hitMob = mobManager.hitTest(new THREE.Vector3(fb.x, fb.y, fb.z), fdir, 1.4);
    }
    if ((BLOCKS[blk] && BLOCKS[blk].solid) || fb.life <= 0 || hitMob) {
      if (hitMob && hitMob.damage) hitMob.damage(6, 'fire');
      if (audio && audio.explode) audio.explode();
      if (fb.mesh) scene.remove(fb.mesh);
      _fireballs.splice(i, 1);
    }
  }
}
function updateUtilityItems(dt) {
  updateFireballs(dt);
  const t = performance.now() / 1000;
  if (_grappleUntil > t && player) {
    const dx = _grappleTarget.x - player.position.x;
    const dy = _grappleTarget.y - (player.position.y + 0.9);
    const dz = _grappleTarget.z - player.position.z;
    const d = Math.hypot(dx, dy, dz);
    if (d < 1.2) { _grappleUntil = 0; }
    else {
      const pull = Math.min(d, 14) * 1.6;
      player.velocity.x += (dx / d) * pull * dt;
      player.velocity.y += (dy / d) * pull * dt;
      player.velocity.z += (dz / d) * pull * dt;
    }
  }
}

function teleportToPortalOrb(orb) {
  if (!player || !world) return;
  const bx = Math.floor(orb.x), bz = Math.floor(orb.z);
  // Find the topmost solid block below the orb's landing point
  let gy = Math.floor(orb.y);
  while (gy > 0) {
    const blk = world.getBlock(bx, gy, bz);
    if (BLOCKS[blk] && BLOCKS[blk].solid) break;
    gy--;
  }
  const groundBlk = world.getBlock(bx, gy, bz);
  if (!(BLOCKS[groundBlk] && BLOCKS[groundBlk].solid)) return; // no ground
  // Don't teleport into solid blocks above the ground (e.g. inside a wall)
  const headBlk = world.getBlock(bx, gy + 1, bz);
  const feetBlk = world.getBlock(bx, gy + 2, bz);
  if ((BLOCKS[headBlk] && BLOCKS[headBlk].solid) || (BLOCKS[feetBlk] && BLOCKS[feetBlk].solid)) return;
  if (gy <= 0) return;

  // Teleport particles at both ends
  spawnPortalOrbParticles(player.position);
  player.position.set(orb.x, gy + 0.001, orb.z);
  player.velocity.set(0, 0, 0);
  player.fallStartY = -1;
  spawnPortalOrbParticles(player.position);
  if (audio && audio.teleport) audio.teleport();
}

function spawnPortalOrbParticles(pos) {
  if (!scene) return;
  for (let i = 0; i < 10; i++) {
    const mat = new THREE.MeshBasicMaterial({ color: 0x40e0ff, transparent: true, opacity: 0.8 });
    const m = new THREE.Mesh(_particleGeoTiny, mat);
    m.position.set(pos.x, pos.y + 0.5, pos.z);
    scene.add(m);
    _particles.push({ mesh: m, vx: (Math.random() - 0.5) * 2, vy: 0.5 + Math.random() * 2, vz: (Math.random() - 0.5) * 2, life: 0.6, maxLife: 0.6 });
  }
}

// ── Portal rings (dual-portal linking) ───────────────────────────────────
// Throw the orb in 'portal' mode (sneak+use) to place a ring. The first ring
// is the entry (cyan); the second becomes the exit (orange). Stepping into
// either ring teleports you to the other, preserving momentum. A single
// unlinked ring recalls you to where you threw it.

// Generates a swirling vortex texture for the portal face.
function _portalVortexTexture(color) {
  const s = 128;
  const c = document.createElement('canvas');
  c.width = s; c.height = s;
  const ctx = c.getContext('2d');
  const [r, g, b] = [(color >> 16) & 255, (color >> 8) & 255, color & 255];
  const cx = s / 2, cy = s / 2;
  const img = ctx.createImageData(s, s);
  const d = img.data;
  for (let y = 0; y < s; y++) {
    for (let x = 0; x < s; x++) {
      const dx = x - cx, dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy) / cx; // 0..~1.4
      const ang = Math.atan2(dy, dx);
      // Spiral bands + falloff toward the edge
      const spiral = Math.sin(ang * 3 + dist * 9);
      const alpha = Math.max(0, 1 - dist * 1.05);
      const a = Math.floor(60 + (spiral * 0.5 + 0.5) * 140) * alpha;
      const i = (y * s + x) * 4;
      d[i] = r; d[i + 1] = g; d[i + 2] = b;
      d[i + 3] = Math.max(0, Math.min(255, a));
    }
  }
  ctx.putImageData(img, 0, 0);
  const t = new THREE.CanvasTexture(c);
  t.magFilter = THREE.LinearFilter;
  t.minFilter = THREE.LinearFilter;
  return t;
}

class PortalRing {
  constructor(x, y, z, isEntry, yaw) {
    this.x = x; this.y = y; this.z = z;
    this.isEntry = isEntry;
    this.age = 0;
    this.done = false;
    this.yaw = yaw || 0;
    const color = isEntry ? 0x40e0ff : 0xff9a40;
    const rgb = isEntry ? '80,224,255' : '255,154,64';
    this.group = new THREE.Group();
    this.group.position.set(x, y, z);
    this.group.rotation.y = this.yaw;
    scene.add(this.group);

    // Vertical torus rim (stands upright — you walk through it)
    const rimGeo = new THREE.TorusGeometry(0.55, 0.07, 10, 28);
    this.rim = new THREE.Mesh(rimGeo, new THREE.MeshBasicMaterial({
      color, transparent: true, opacity: 0.95,
      blending: THREE.AdditiveBlending, depthWrite: false,
    }));
    this.group.add(this.rim);

    // Inner vortex disc facing +Z (the walk-through surface)
    this.vortexTex = _portalVortexTexture(color);
    const discGeo = new THREE.CircleGeometry(0.55, 28);
    this.disc = new THREE.Mesh(discGeo, new THREE.MeshBasicMaterial({
      map: this.vortexTex, transparent: true, side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending, depthWrite: false,
    }));
    this.group.add(this.disc);

    // Back disc (mirrored swirl, dimmer)
    this.discBack = new THREE.Mesh(discGeo.clone(), new THREE.MeshBasicMaterial({
      map: this.vortexTex, transparent: true, side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.4,
    }));
    this.discBack.rotation.y = Math.PI;
    this.group.add(this.discBack);

    // Glow light
    this.light = new THREE.PointLight(color, 0.7, 8, 1.6);
    this.light.position.y = 1.0;
    this.group.add(this.light);

    // Sparkle particles swirling around the rim
    this.sparks = [];
    for (let i = 0; i < 8; i++) {
      const s = new THREE.Mesh(_particleGeoTiny, new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 }));
      this.group.add(s);
      this.sparks.push({ mesh: s, angle: (i / 8) * Math.PI * 2, speed: 2.5 + Math.random() * 2 });
    }

    // Funnel particles get sucked in each frame (only a few so perf stays fine)
    this._funnelTimer = 0;
  }

  update(dt) {
    this.age += dt;
    // Slow spin of the swirl + rim shimmer
    this.disc.rotation.z += dt * 0.8;
    this.discBack.rotation.z -= dt * 0.5;
    this.rim.rotation.z += dt * 0.6;
    // Sparks orbit the rim in 3D
    for (const s of this.sparks) {
      s.angle += dt * s.speed;
      const r = 0.55;
      s.mesh.position.set(Math.cos(s.angle) * r, Math.sin(s.angle * 1.7) * 0.12, Math.sin(s.angle) * r * 0.4);
      s.mesh.material.opacity = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(this.age * 6 + s.angle * 3));
    }
    // Funnel sparks drawn into the portal mouth
    this._funnelTimer -= dt;
    if (this._funnelTimer <= 0 && Math.random() < 0.5) {
      this._funnelTimer = 0.06;
      const m = new THREE.Mesh(_particleGeoTiny, new THREE.MeshBasicMaterial({ color: this.isEntry ? 0x80e0ff : 0xffb060, transparent: true, opacity: 0.85 }));
      m.position.set(this.x + (Math.random() - 0.5) * 1.4, this.y + 0.3 + Math.random() * 1.4, this.z + (Math.random() - 0.5) * 1.4);
      scene.add(m);
      _particles.push({
        mesh: m, vx: 0, vy: 0, vz: 0, life: 0.5, maxLife: 0.5,
        pull: { x: this.x, y: this.y + 0.9, z: this.z },
      });
    }
  }

  dispose() {
    scene.remove(this.group);
    this.rim.geometry.dispose(); this.rim.material.dispose();
    this.disc.geometry.dispose(); this.disc.material.dispose(); this.vortexTex.dispose();
    this.discBack.geometry.dispose(); this.discBack.material.dispose();
    this.light.dispose();
    for (const s of this.sparks) { s.mesh.geometry.dispose(); s.mesh.material.dispose(); }
  }
}

// Place a ring. First → entry, second → exit, third → replaces the entry.
function placePortalRing(orb) {
  // Orient the ring to face the direction the player threw it.
  const yaw = player ? player.yaw : 0;
  // Remember where the thrower stood so a lone ring can recall them.
  const origin = player ? { x: player.position.x, y: player.position.y, z: player.position.z } : null;
  // Find the ground so the ring sits at foot level (not where the orb stopped mid-air).
  let gy = Math.floor(orb.y);
  const bx = Math.floor(orb.x), bz = Math.floor(orb.z);
  while (gy > 0) {
    const blk = world.getBlock(bx, gy, bz);
    if (BLOCKS[blk] && BLOCKS[blk].solid) break;
    gy--;
  }
  const groundY = gy + 1; // block above the solid ground
  const target = _portalRings.length === 0 ? 'entry'
               : _portalRings.length === 1 ? 'exit'
               : 'entry'; // replace oldest
  if (target === 'entry') {
    // Remove existing entry ring
    for (let i = _portalRings.length - 1; i >= 0; i--) {
      if (_portalRings[i].isEntry) {
        _portalRings[i].dispose();
        _portalRings[i] = _portalRings[_portalRings.length - 1];
        _portalRings.length--;
      }
    }
    const ring = new PortalRing(bx, groundY, bz, true, yaw);
    ring.origin = origin;
    _portalRings.push(ring);
  } else {
    const ring = new PortalRing(bx, groundY, bz, false, yaw);
    ring.origin = origin;
    _portalRings.push(ring);
  }
  // Only ever keep 2 rings
  if (_portalRings.length > 2) {
    const old = _portalRings.shift();
    old.dispose();
  }
  spawnPortalOrbParticles(orb);
  if (audio && audio.portalOpen) audio.portalOpen();
}

function updatePortalRings(dt) {
  if (_portalRingCooldown > 0) _portalRingCooldown -= dt;
  if (!_portalRings.length) return;
  for (let i = _portalRings.length - 1; i >= 0; i--) {
    const ring = _portalRings[i];
    ring.update(dt);
    if (ring.age > 30) {
      ring.dispose();
      _portalRings[i] = _portalRings[_portalRings.length - 1];
      _portalRings.length--;
    }
  }
  if (!player) return;
  // Two linked rings → stepping into either sends you to the other.
  if (_portalRings.length === 2 && _portalRingCooldown <= 0) {
    const entry = _portalRings.find(r => r.isEntry);
    const exit = _portalRings.find(r => !r.isEntry);
    if (entry && exit) {
      // Visual link beam between the pair (created once, moved to match).
      _ensurePortalBeam(entry, exit);
      const p = player.position;
      if (_inRing(p, entry)) portalTraverse(entry, exit, p);
      else if (_inRing(p, exit)) portalTraverse(exit, entry, p);
      // Mobs can ride the portal too!
      if (mobManager && mobManager.mobs) {
        for (const mob of mobManager.mobs) {
          if (mob.dead) continue;
          const mp = mob.position;
          if (_inRing(mp, entry)) mobPortalTraverse(mob, exit);
          else if (_inRing(mp, exit)) mobPortalTraverse(mob, entry);
        }
      }
    } else {
      _clearPortalBeam();
    }
  } else {
    _clearPortalBeam();
    // Lone ring → stepping in recalls you to where it was thrown from.
    if (_portalRings.length === 1 && _portalRingCooldown <= 0) {
      const ring = _portalRings[0];
      if (ring.origin && _inRing(player.position, ring)) {
        _portalRingCooldown = 1.0;
        spawnPortalOrbParticles(player.position);
        player.position.set(ring.origin.x, ring.origin.y + 0.1, ring.origin.z);
        player.velocity.set(0, 0, 0);
        player.fallStartY = -1;
        spawnPortalOrbParticles(player.position);
        if (audio && audio.teleport) audio.teleport();
        achievements.incrementStat('portalTraversals');
      }
    }
  }
}

function _inRing(pos, ring) {
  // Vertical ring: player must be near the ring center horizontally and within
  // its height band — works from either side, like walking through a portal.
  const dx = pos.x - ring.x, dz = pos.z - ring.z;
  const dist = Math.sqrt(dx * dx + dz * dz);
  return dist < 0.6 && pos.y >= ring.y && pos.y <= ring.y + 1.9;
}

function portalTraverse(fromRing, toRing, pos) {
  _portalRingCooldown = 1.0;
  spawnPortalOrbParticles(pos);
  // Preserve momentum — like Portal, you keep your velocity through the link.
  // Exit facing the same direction you entered (Portal-style orientation).
  const yaw = fromRing.yaw;
  const cos = Math.cos(yaw), sin = Math.sin(yaw);
  player.position.set(toRing.x + -sin * 0.4, toRing.y + 0.4, toRing.z + cos * 0.4);
  player.fallStartY = -1;
  // Keep horizontal velocity relative to the exit's facing.
  player.velocity.y = Math.max(player.velocity.y, 2);
  spawnPortalOrbParticles(player.position);
  if (audio && audio.teleport) audio.teleport();
  achievements.incrementStat('portalTraversals');
}

// Teleport a mob through a linked portal (momentum preserved).
function mobPortalTraverse(mob, toRing) {
  spawnPortalOrbParticles(mob.position);
  const yaw = toRing.yaw;
  const cos = Math.cos(yaw), sin = Math.sin(yaw);
  mob.position.set(toRing.x + -sin * 0.4, toRing.y + 0.4, toRing.z + cos * 0.4);
  mob.velocity.set(0, 0, 0);
  spawnPortalOrbParticles(mob.position);
}

// A faint energy beam connecting a linked pair of rings.
let _portalBeam = null;
function _ensurePortalBeam(a, b) {
  if (!scene) return;
  if (!_portalBeam) {
    const geo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
    const mat = new THREE.LineBasicMaterial({ color: 0x40d0ff, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending });
    _portalBeam = new THREE.Line(geo, mat);
    scene.add(_portalBeam);
  }
  _portalBeam.geometry.attributes.position.setXYZ(0, a.x, a.y + 0.9, a.z);
  _portalBeam.geometry.attributes.position.setXYZ(1, b.x, b.y + 0.9, b.z);
  _portalBeam.geometry.attributes.position.needsUpdate = true;
  _portalBeam.visible = true;
}
function _clearPortalBeam() {
  if (_portalBeam) _portalBeam.visible = false;
}

// Shockwave on orb impact: knocks nearby mobs back and stuns them briefly.
function portalOrbImpact(orb) {
  spawnPortalOrbParticles(orb);
  if (!mobManager || !mobManager.mobs) return;
  for (const mob of mobManager.mobs) {
    if (mob.dead) continue;
    const dx = mob.position.x - orb.x, dz = mob.position.z - orb.z;
    const dist = Math.sqrt(dx * dx + dz * dz);
    if (dist < 4) {
      const f = (1 - dist / 4) * 5;
      mob.velocity.x += (dx / (dist || 1)) * f;
      mob.velocity.z += (dz / (dist || 1)) * f;
      mob.velocity.y = Math.max(mob.velocity.y, 1.5);
    }
  }
}

// Items that can be placed as blocks. Most block items are ids < 256, but the
// bed is an "item" (285) that maps to a multi-block BLOCK.BED — treat it as a
// block item so every placement gate lets it through.
function isPlaceableBlockItem(id) {
  return isBlockItem(id) || id === ITEM.BED;
}

// Ignite a Void portal: right-clicking a Compressed-Voidstone frame block with
// a Paradox Core activates the 4-wide x 5-tall frame (dimension only for now).
// Detects a valid frame anywhere on the clicked cell and fills its 2x3 interior
// with VOID_PORTAL blocks.
function tryIgniteVoidPortal(hit) {
  if (!world) return false;
  const HEAD = BLOCK.COMPRESSED_VOIDSTONE;
  const P = BLOCK.VOID_PORTAL;

  // Scan a bounded region around the clicked cell for a frame origin whose
  // border is all Compressed Voidstone and whose interior is empty air.
  for (const horizontal of [true, false]) {
    const wx = horizontal ? 1 : 0;
    const wz = horizontal ? 0 : 1;
    for (let dx = -6; dx <= 6; dx++) {
      for (let dy = -6; dy <= 4; dy++) {
        const sx = hit.x + (horizontal ? dx : 0);
        const sz = hit.z + (horizontal ? 0 : dx);
        const y0 = hit.y + dy;
        if (validateAndLight(sx, sz, y0, wx, wz)) return true;
      }
    }
  }
  return false;

  function validateAndLight(sx, sz, y0, wx, wz) {
    // 4 wide (x/wx) x 5 tall (y0..y0+4) hollow frame of HEAD.
    for (let i = 0; i < 4; i++) {
      if (world.getBlock(sx + wx * i, y0, sz + wz * i) !== HEAD) return false;     // bottom
      if (world.getBlock(sx + wx * i, y0 + 4, sz + wz * i) !== HEAD) return false; // top
    }
    for (let yy = y0 + 1; yy <= y0 + 3; yy++) {
      if (world.getBlock(sx, yy, sz) !== HEAD) return false;                       // left
      if (world.getBlock(sx + wx * 3, yy, sz + wz * 3) !== HEAD) return false;     // right
      for (let i = 1; i < 3; i++) {
        if (world.getBlock(sx + wx * i, yy, sz + wz * i) !== BLOCK.AIR) return false; // interior empty
      }
    }
    for (let yy = y0 + 1; yy <= y0 + 3; yy++) {
      for (let i = 1; i < 3; i++) {
        world.setBlock(sx + wx * i, yy, sz + wz * i, P);
      }
    }
    manager.refreshAround(Math.floor(sx / CHUNK_SIZE), Math.floor(sz / CHUNK_SIZE));
    return true;
  }
}

function placeBlock(slotOverride, targetHit) {
  if (player && player.isAdventure()) return;
  if (isBedwars && bwSpec) return; // bedwars spectator can't place
  const hit = targetHit || currentTarget();
  if (!hit) return;
  const slot = slotOverride || player.inventory.getSelected();
  let itemId = slot ? slot.item : null;
  if (itemId == null) return;

  // BED item places BED_FOOT at clicked block, BED (head) in facing direction
  if (itemId === ITEM.BED) itemId = BLOCK.BED_FOOT;

  if (!isPlaceableBlockItem(itemId)) return;
  const def = BLOCKS[itemId];
  if (!def || def.liquid) return;
  if (def.creativeOnly && !(player && player.isCreative())) return;

  const { x, y, z } = hit.place;
  // don't place inside the player
  const px = Math.floor(player.position.x);
  const py = Math.floor(player.position.y);
  const pz = Math.floor(player.position.z);
  if ((x === px && z === pz) && (y === py || y === py + 1)) return;

  world.setBlock(x, y, z, itemId);
  if (isSkyblock) liquidBlockChanged(x, y, z);
  if (isSaplingBlock(itemId)) {
    _saplingGrowth.set(`${x},${y},${z}`, 0);
  }
  if (audio) audio.blockPlace(itemId);
  if (network.isInRoom()) network.sendBlockUpdate(x, y, z, itemId);

  // Block place particles: small dust puff
  if (graphicsQuality !== 'low') {
    for (let i = 0; i < 4; i++) {
      const c = BLOCK_COLORS[itemId];
      const col = c ? ((c[0]*255|0)<<16 | (c[1]*255|0)<<8 | (c[2]*255|0)) : 0x888888;
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

  // Beds are 2 blocks wide — place head block in front of player
  if (itemId === BLOCK.BED_FOOT) {
    const dirX = Math.round(-Math.sin(player.yaw));
    const dirZ = Math.round(-Math.cos(player.yaw));
    const headX = x + dirX;
    const headZ = z + dirZ;
    if (world.getBlock(headX, y, headZ) === BLOCK.AIR) {
      world.setBlock(headX, y, headZ, BLOCK.BED);
      if (network.isInRoom()) network.sendBlockUpdate(headX, y, headZ, BLOCK.BED);
    }
  }
  viewmodel.swing();
  placeAnimTimer = 0.3;
  // consume in survival — clear whichever slot the block actually came from
  // (the offhand, or any hotbar slot: mobile passes the selected slot as
  // slotOverride, so clearing the offhand for every slotOverride was wrong).
  if (slot && player.isSurvival()) {
    slot.count--;
    if (slot.count <= 0) {
      if (slot === player.inventory.offhand) {
        player.inventory.offhand = null;
      } else {
        const idx = player.inventory.slots.indexOf(slot);
        if (idx !== -1) player.inventory.slots[idx] = null;
        else player.inventory.slots[player.inventory.selected] = null;
      }
    }
    syncUIMode();
  }
  manager.refreshAround(Math.floor(x / CHUNK_SIZE), Math.floor(z / CHUNK_SIZE));
  // place sfx removed
  // Achievement stats: block placed
  achievements.incrementMapStat('blocksPlaced', `${itemId}`);
  achievements.incrementStat('blocksPlacedAny');
  if (itemId === BLOCK.TORCH) achievements.incrementStat('torchesPlaced');
  // XP for building (small amount)
  if (player.isSurvival()) {
    if (player.addXp(1)) ui.showLevelUp(player.level);
  }
}

// Bone Meal: grows a sapling into a tree instantly. Returns true on success.
function useBoneMeal(hit) {
  if (!hit || !world) return false;
  const b = hit.block;
  if (!(b === BLOCK.OAK_SAPLING || b === BLOCK.JUNGLE_SAPLING || b === BLOCK.BIRCH_SAPLING ||
        b === BLOCK.SPRUCE_SAPLING || b === BLOCK.DARK_OAK_SAPLING || b === BLOCK.ACACIA_SAPLING)) {
    return false;
  }
  // Only grow if there's a little headroom (same rule as natural growth).
  const floorY = hit.y - 1;
  const floor = world.getBlock(hit.x, floorY, hit.z);
  if (floor === BLOCK.AIR) return false;
  growTreeInWorld(world, hit.x, hit.y, hit.z, b);
  if (audio) audio.blockPlace?.(BLOCK.WOOD);
  if (breakParticles) breakParticles.emit(b, hit.x, hit.y, hit.z, 12);
  const cx = Math.floor(hit.x / CHUNK_SIZE), cz = Math.floor(hit.z / CHUNK_SIZE);
  for (let dx = -1; dx <= 1; dx++) {
    for (let dz = -1; dz <= 1; dz++) {
      manager.refreshAround(cx + dx, cz + dz);
    }
  }
  return true;
}

// Natural sapling growth: tracked saplings grow into a tree after a while.
function tickSaplingGrowth(dt) {
  if (_saplingGrowth.size === 0) return;
  _saplingTickTimer -= dt;
  if (_saplingTickTimer > 0) return;
  _saplingTickTimer = 0.25; // check every 0.25s

  for (const [key, elapsed] of _saplingGrowth) {
    const [x, y, z] = key.split(',').map(Number);
    if (world.getBlock(x, y, z) === BLOCK.AIR) {
      _saplingGrowth.delete(key); // block got removed some other way
      continue;
    }
    const floor = world.getBlock(x, y - 1, z);
    if (floor === BLOCK.AIR) continue; // sapling floating — don't grow yet
    _saplingGrowth.set(key, elapsed + 0.25);
    if (elapsed + 0.25 >= SAPLING_GROWTH_TIME) {
      _saplingGrowth.delete(key);
      const sapling = world.getBlock(x, y, z);
      if (isSaplingBlock(sapling)) {
        growTreeInWorld(world, x, y, z, sapling);
        if (breakParticles) breakParticles.emit(sapling, x, y, z, 10);
        const cx = Math.floor(x / CHUNK_SIZE), cz = Math.floor(z / CHUNK_SIZE);
        for (let dx = -1; dx <= 1; dx++) {
          for (let dz = -1; dz <= 1; dz++) {
            manager.refreshAround(cx + dx, cz + dz);
          }
        }
      }
    }
  }
}

// ── Traveler Trading ──
// Simple trade: player clicks a trade in the list, items swap if they have enough.
function openTravelerTrade(travelerMob) {
  const def = MOB_TYPES.traveler;
  if (!def || !def.trades) return;
  document.exitPointerLock?.();

  // Build trade UI
  let html = `<div style="font:bold 16px monospace;color:#55ddbb;text-align:center;margin-bottom:8px;">✦ Traveler ✦</div>`;
  html += `<div style="font:11px monospace;color:#aaa;margin-bottom:8px;text-align:center;">Trade your shards for rare goods</div>`;
  html += `<div style="max-height:300px;overflow-y:auto;">`;

  for (let i = 0; i < def.trades.length; i++) {
    const t = def.trades[i];
    const giveName = itemName(t.give.item);
    const recvName = itemName(t.receive.item);
    const canTrade = player.inventory.count(t.give.item) >= t.give.count;
    const color = canTrade ? '#5f5' : '#f55';
    html += `<div class="trade-row" data-trade="${i}" style="display:flex;align-items:center;gap:8px;padding:6px 8px;margin:3px 0;border:1px solid ${canTrade ? 'rgba(80,255,80,0.3)' : 'rgba(255,80,80,0.2)'};border-radius:4px;background:rgba(255,255,255,0.04);cursor:${canTrade ? 'pointer' : 'default'};opacity:${canTrade ? '1' : '0.5'};">`;
    html += `<span style="font:12px monospace;color:${color};flex:1;">${t.give.count}x ${giveName}</span>`;
    html += `<span style="font:14px monospace;color:#ffd700;">→</span>`;
    html += `<span style="font:12px monospace;color:#8cf;flex:1;">${t.receive.count}x ${recvName}</span>`;
    html += `</div>`;
  }
  html += `</div>`;
  html += `<div style="text-align:center;margin-top:8px;"><button id="trade-close" style="padding:4px 16px;font:12px monospace;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);color:#ccc;border-radius:4px;cursor:pointer;">Close</button></div>`;

  // Show in a floating panel
  let panel = document.getElementById('trade-panel');
  if (!panel) {
    panel = document.createElement('div');
    panel.id = 'trade-panel';
    panel.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:100;background:rgba(20,20,30,0.95);border:2px solid rgba(85,221,187,0.4);border-radius:8px;padding:16px;min-width:320px;max-width:400px;pointer-events:auto;backdrop-filter:blur(8px);box-shadow:0 4px 24px rgba(0,0,0,0.6);';
    document.body.appendChild(panel);
  }
  panel.innerHTML = html;
  panel.style.display = 'block';

  // Wire trade clicks
  panel.querySelectorAll('.trade-row').forEach(row => {
    row.addEventListener('click', () => {
      const idx = parseInt(row.dataset.trade);
      const trade = def.trades[idx];
      if (!trade) return;
      // Check and remove give items
      if (player.inventory.count(trade.give.item) < trade.give.count) return;
      player.inventory.remove(trade.give.item, trade.give.count);
      // Add receive items
      player.inventory.add(trade.receive.item, trade.receive.count);
      syncUIMode();
      // Flash the row
      row.style.background = 'rgba(80,255,80,0.2)';
      setTimeout(() => { row.style.background = 'rgba(255,255,255,0.04)'; }, 200);
      // Refresh trade availability
      openTravelerTrade(travelerMob);
    });
  });

  const closeBtn = document.getElementById('trade-close');
  if (closeBtn) closeBtn.addEventListener('click', () => { panel.style.display = 'none'; });
}

// Bucket: empty bucket fills from water/lava, water/lava bucket empties into air.
// Returns true if an action was performed.
function handleBucket(held, hit) {
  if (!hit || !hit.place) return false;
  const { x, y, z } = hit.place;
  const sel = player.inventory.selected;

  if (held.item === ITEM.BUCKET) {
    // Scooping must target the liquid itself, which the normal raycast skips —
    // use a liquid-aware ray so pools and falls can be picked up again.
    let lq = hit;
    if (hit.block !== BLOCK.WATER && hit.block !== BLOCK.LAVA) {
      camera.getWorldDirection(_rayDir);
      _rayOrigin.copy(camera.position);
      lq = raycastVoxel(world, _rayOrigin, _rayDir, REACH, { liquids: true });
      if (!lq) return false;
    }
    const atPlace = world.getBlock(lq.x, lq.y, lq.z);
    const isWater = atPlace === BLOCK.WATER || lq.block === BLOCK.WATER;
    const isLava = atPlace === BLOCK.LAVA || lq.block === BLOCK.LAVA;
    if (!isWater && !isLava) return false;
    held.count--;
    if (held.count <= 0) player.inventory.slots[sel] = null;
    world.setBlock(lq.x, lq.y, lq.z, BLOCK.AIR);
    if (isSkyblock) liquidBlockChanged(lq.x, lq.y, lq.z);
    if (isWater) {
      player.inventory.add(ITEM.WATER_BUCKET, 1);
    } else {
      player.inventory.add(ITEM.LAVA_BUCKET, 1);
      achievements.incrementStat('bucketLava');
    }
    syncUIMode();

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
    if (isSkyblock) registerSource(x, y, z);
    if (network.isInRoom()) network.sendBlockUpdate(x, y, z, BLOCK.WATER);
    held.count--;
    if (held.count <= 0) player.inventory.slots[sel] = null;
    player.inventory.add(ITEM.BUCKET, 1);
    syncUIMode();

    return true;
  }

  if (held.item === ITEM.LAVA_BUCKET) {
    const px = Math.floor(player.position.x);
    const py = Math.floor(player.position.y);
    const pz = Math.floor(player.position.z);
    if ((x === px && z === pz) && (y === py || y === py + 1)) return false;
    if (world.getBlock(x, y, z) !== BLOCK.AIR) return false;
    world.setBlock(x, y, z, BLOCK.LAVA);
    if (isSkyblock) registerSource(x, y, z);
    if (network.isInRoom()) network.sendBlockUpdate(x, y, z, BLOCK.LAVA);
    held.count--;
    if (held.count <= 0) player.inventory.slots[sel] = null;
    player.inventory.add(ITEM.BUCKET, 1);
    syncUIMode();

    return true;
  }

  return false;
}

function breakBlock(hit) {
  const b = world.getBlock(hit.x, hit.y, hit.z);
  if (b === BLOCK.AIR || b === BLOCK.BEDROCK || b === BLOCK.WATER) return;
  if (player && player.isAdventure()) return; // adventure mode: can't break blocks
  if (isBedwars && bwSpec) return; // bedwars spectator can't break

  // tool speed
  const slot = player.inventory.getSelected();
  const toolId = slot && isTool(slot.item) ? slot.item : null;
  const hardness = blockHardness(b);

  let speed = 1;
  if (toolId) speed = toolSpeedFor(toolId, b);
  const isEffective = toolId && toolInfo(toolId)?.type === blockTool(b);

  const breakTime = hardness > 0 ? (BASE_BREAK_TIME * hardness / speed) * (isEffective ? 0.5 : 2) : 0;

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
  if (b === BLOCK.BEDROCK) return; // bedrock is unbreakable in survival
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
            if (breakParticles) breakParticles.emit(nb, nx, ny, nz, 8);
            world.setBlock(nx, ny, nz, BLOCK.AIR);
            if (isSkyblock) liquidBlockChanged(nx, ny, nz);
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
        if (breakParticles) breakParticles.emit(tb.b, tb.x, tb.y, tb.z, 8);
        world.setBlock(tb.x, tb.y, tb.z, BLOCK.AIR);
        if (isSkyblock) liquidBlockChanged(tb.x, tb.y, tb.z);
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

  if (breakParticles) breakParticles.emit(b, hit.x, hit.y, hit.z, 20);
  world.setBlock(hit.x, hit.y, hit.z, BLOCK.AIR);
  if (isSkyblock) liquidBlockChanged(hit.x, hit.y, hit.z);
  if (isLogBlock(b)) _leafDecayPositions.add(`${hit.x},${hit.y},${hit.z}`);
  if (isSaplingBlock(b)) _saplingGrowth.delete(`${hit.x},${hit.y},${hit.z}`);
  if (network.isInRoom()) network.sendBlockUpdate(hit.x, hit.y, hit.z, 0);

  // OneBlock minigame: breaking the OneBlock schedules its regeneration.
  if (isOneBlock) onOneBlockBroken(hit);

  // BlockZones minigame: score on every broken block (targets worth more).
  if (isBlockZones) onBlockZonesBroken(b);

  // Shattered Echo: breaking a block provokes nearby Glitched Wanderers that
  // stare at that spot (they attack only if you break what they look at).
  if (world.dimension && mobManager) mobManager.provokeNearby(hit.x, hit.y, hit.z);

  // Beds: breaking one half also breaks the other
  if (b === BLOCK.BED || b === BLOCK.BED_FOOT) {
    const other = b === BLOCK.BED ? BLOCK.BED_FOOT : BLOCK.BED;
    for (const [dx, dz] of [[1,0],[-1,0],[0,1],[0,-1]]) {
      const nx = hit.x + dx, nz = hit.z + dz;
      if (world.getBlock(nx, hit.y, nz) === other) {
        world.setBlock(nx, hit.y, nz, BLOCK.AIR);
        if (network.isInRoom()) network.sendBlockUpdate(nx, hit.y, nz, 0);
        if (breakParticles) breakParticles.emit(other, nx, hit.y, nz, 12);
        break;
      }
    }
  }

  // drop item
  if (player.isSurvival()) {
    // Bedwars: beds drop nothing (and breaking one triggers the win check).
    const drop = isBedwars && (b === BLOCK.BED || b === BLOCK.BED_FOOT) ? 0 : blockDrop(b, toolHarvestLevel(toolId || 0));
    if (drop) player.inventory.add(drop, 1);
    syncUIMode();
  }
  // Achievement stats: block broken
  achievements.incrementMapStat('blocksBroken', `${b}`);
  achievements.incrementStat('totalBlocksBroken');
  manager.refreshAround(Math.floor(hit.x / CHUNK_SIZE), Math.floor(hit.z / CHUNK_SIZE));
  audio?.blockBreak(b);

  if (player.isSurvival()) player.addExhaustion(0.005);
  // XP for mining: ore blocks give more
  const oreXp = { [BLOCK.COAL_ORE]: 2, [BLOCK.IRON_ORE]: 3, [BLOCK.GOLD_ORE]: 5, [BLOCK.DIAMOND_ORE]: 7, [BLOCK.COPPER_ORE]: 3, [BLOCK.EMERALD_ORE]: 7, [BLOCK.PRISMITE_ORE]: 10 };
  const xpGain = oreXp[b] || 1;
  if (player.isSurvival()) {
    if (player.addXp(xpGain)) {
      ui.showLevelUp(player.level);
      if (audio) audio.levelUp();
    }
  }
}

// --- bed sleep mechanic ---
function trySleep() {
  if (sleeping) return;
  if (isBedwars) { addChatLine('You can\'t sleep — protect your bed instead!', '#fa0'); return; }
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
  if (isMultiplayer && network && network.connected) {
    network.sendBedSpawn(bedSpawnPoint.x, bedSpawnPoint.y, bedSpawnPoint.z);
  }

  // Start sleep sequence
  sleeping = true;
  sleepPhase = 1;
  sleepTimer = 0;
  sleepOverlay.style.opacity = 0;
  document.exitPointerLock?.();
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
  document.exitPointerLock?.();
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

// DM notification toast — a short-lived banner that pops up during gameplay
// when someone DMs you (so you notice even with pointer lock on). Clicking
// "Reply" jumps to the DM panel; clicking elsewhere dismisses it.
let _dmToast = null;
let _dmToastTimer = null;
function showDmToast(from, text) {
  if (!_dmToast) {
    _dmToast = document.createElement('div');
    _dmToast.id = 'dm-toast';
    _dmToast.style.cssText = 'position:fixed;top:64px;left:50%;transform:translateX(-50%);z-index:1009;display:flex;align-items:center;gap:8px;background:rgba(24,26,34,0.96);border:1px solid rgba(224,164,0,0.55);border-radius:8px;padding:8px 12px;font:12px monospace;color:#eee;box-shadow:0 4px 14px rgba(0,0,0,0.5);max-width:min(90vw,420px);cursor:pointer;';
    _dmToast.innerHTML =
      '<span style="flex:0 0 auto;">💬</span>' +
      '<span class="dm-toast-body" style="flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"></span>' +
      '<button class="dm-toast-reply" style="flex:0 0 auto;background:#3a4d8c;color:#fff;border:none;border-radius:5px;padding:3px 8px;font:11px monospace;cursor:pointer;">Reply</button>' +
      '<button class="dm-toast-dismiss" style="flex:0 0 auto;background:transparent;color:#999;border:none;font:14px monospace;cursor:pointer;">✕</button>';
    _dmToast.addEventListener('click', (e) => {
      if (document.pointerLockElement) return; // don't hijack gameplay clicks
      const fromName = _dmToast._from || '';
      if (e.target && e.target.classList && e.target.classList.contains('dm-toast-reply') && fromName) {
        try {
          document.exitPointerLock?.();
          ui.showMenu('friends');
          openFriendsMenu();
          openDM(fromName);
        } catch (_) { console.warn('open DM from toast failed'); }
      }
      hideDmToast();
    });
    document.body.appendChild(_dmToast);
  }
  _dmToast._from = from;
  const body = _dmToast.querySelector('.dm-toast-body');
  if (body) body.textContent = 'DM from ' + from + ': ' + (text.length > 48 ? text.slice(0, 48) + '…' : text);
  _dmToast.style.display = 'flex';
  clearTimeout(_dmToastTimer);
  _dmToastTimer = setTimeout(hideDmToast, 7000);
}
function hideDmToast() {
  if (_dmToast) { _dmToast.style.display = 'none'; clearTimeout(_dmToastTimer); }
}

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
    let content = m.raw ? m.text : escHtml(m.text);
    content = content.replace(/(https?:\/\/[^\s<]+)/g, url => {
      if (/\.(gif|png|jpe?g|webp|svg)/i.test(url)) {
        return '<img src="' + url + '" style="max-width:200px;max-height:140px;border-radius:4px;vertical-align:middle;" loading="lazy">';
      }
      return '<a href="' + url + '" target="_blank" rel="noopener" style="color:#8af;text-decoration:underline;">' + url + '</a>';
    });
    return `<div style="color:${m.color};text-shadow:1px 1px 0 #000;word-wrap:break-word;white-space:pre-wrap;">${content}</div>`;
  }).join('');
  el.scrollTop = el.scrollHeight;
}

function escHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// ── In-game emoji + GIF picker ─────────────────────────────────────
const _emojiList = ['😀','😂','🤣','😊','😍','😎','🤩','🥳','😢','😭','😡','🤔','👍','👎','❤️','🔥','💯','🎉','🎮','⛏️','🗡️','🛡️','💎','🧱','💀','🏆','👀','💪','✌️','🫡','👻','☀️','🌙','⚡'];
let _emojiPanel = null;
function _initEmojiPicker() {
  const btn = document.getElementById('chat-emoji-btn');
  const inp = document.getElementById('chat-input');
  if (!btn || !inp || _emojiPanel) return;
  const GIF_URL = 'https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=6&q=';
  const panel = document.createElement('div');
  panel.style.cssText = 'display:none;position:fixed;bottom:80px;left:12px;background:rgba(0,0,0,0.9);border:1px solid rgba(100,100,100,0.5);border-radius:8px;padding:10px;z-index:20;width:280px;box-shadow:0 4px 20px rgba(0,0,0,0.6);';
  // GIF search
  const search = document.createElement('input');
  search.placeholder = 'Search GIFs...';
  search.style.cssText = 'width:100%;padding:6px 10px;background:rgba(0,0,0,0.4);border:1px solid rgba(100,100,100,0.4);border-radius:5px;color:#ddd;font:12px monospace;outline:none;margin-bottom:6px;box-sizing:border-box;';
  const gifGrid = document.createElement('div');
  gifGrid.style.cssText = 'display:grid;grid-template-columns:repeat(3,1fr);gap:4px;max-height:120px;overflow-y:auto;margin-bottom:8px;';
  gifGrid.innerHTML = '<div style="grid-column:1/-1;text-align:center;color:#666;font-size:11px;padding:6px;">Type to search GIFs</div>';
  let gifTimer = null;
  search.addEventListener('input', () => {
    clearTimeout(gifTimer);
    const q = search.value.trim();
    if (!q) { gifGrid.innerHTML = '<div style="grid-column:1/-1;text-align:center;color:#666;font-size:11px;padding:6px;">Type to search GIFs</div>'; return; }
    gifTimer = setTimeout(() => {
      fetch(GIF_URL + encodeURIComponent(q)).then(r => r.json()).then(data => {
        gifGrid.innerHTML = '';
        (data.data || []).forEach(gif => {
          const img = document.createElement('img');
          img.src = gif.images.fixed_height.url;
          img.style.cssText = 'width:100%;border-radius:4px;cursor:pointer;border:1px solid transparent;transition:.15s;';
          img.onmouseenter = () => img.style.borderColor = '#5af';
          img.onmouseleave = () => img.style.borderColor = 'transparent';
          img.addEventListener('click', () => { inp.value += gif.images.original.url; inp.focus(); panel.style.display = 'none'; });
          gifGrid.appendChild(img);
        });
        if (!data.data || !data.data.length) gifGrid.innerHTML = '<div style="grid-column:1/-1;text-align:center;color:#666;font-size:11px;padding:6px;">No GIFs found</div>';
      }).catch(() => { gifGrid.innerHTML = '<div style="grid-column:1/-1;text-align:center;color:#666;font-size:11px;padding:6px;">Failed to load</div>'; });
    }, 400);
  });
  panel.appendChild(search);
  panel.appendChild(gifGrid);
  // Emoji grid
  const grid = document.createElement('div');
  grid.style.cssText = 'display:grid;grid-template-columns:repeat(8,1fr);gap:2px;';
  _emojiList.forEach(em => {
    const eb = document.createElement('button');
    eb.textContent = em;
    eb.style.cssText = 'background:none;border:none;font-size:16px;padding:3px;cursor:pointer;border-radius:3px;line-height:1;';
    eb.onmouseenter = () => eb.style.background = 'rgba(100,140,255,0.2)';
    eb.onmouseleave = () => eb.style.background = 'none';
    eb.addEventListener('click', () => { inp.value += em; inp.focus(); });
    grid.appendChild(eb);
  });
  panel.appendChild(grid);
  document.body.appendChild(panel);
  _emojiPanel = panel;
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
  });
  document.addEventListener('click', (e) => {
    if (!panel.contains(e.target) && e.target !== btn) panel.style.display = 'none';
  });
}
_initEmojiPicker();
// DM emoji + GIF + image picker
(function() {
  const btn = document.getElementById('dm-emoji-btn');
  const inp = document.getElementById('dm-input');
  if (!btn || !inp) return;
  const GIF_URL = 'https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&limit=6&q=';
  const panel = document.createElement('div');
  panel.style.cssText = 'display:none;position:fixed;bottom:120px;right:40px;background:rgba(0,0,0,0.9);border:1px solid rgba(100,100,100,0.5);border-radius:8px;padding:10px;z-index:25;width:280px;box-shadow:0 4px 20px rgba(0,0,0,0.6);';
  // GIF search
  const search = document.createElement('input');
  search.placeholder = 'Search GIFs...';
  search.style.cssText = 'width:100%;padding:6px 10px;background:rgba(0,0,0,0.4);border:1px solid rgba(100,100,100,0.4);border-radius:5px;color:#ddd;font:12px monospace;outline:none;margin-bottom:6px;box-sizing:border-box;';
  const gifGrid = document.createElement('div');
  gifGrid.style.cssText = 'display:grid;grid-template-columns:repeat(3,1fr);gap:4px;max-height:120px;overflow-y:auto;margin-bottom:8px;';
  gifGrid.innerHTML = '<div style="grid-column:1/-1;text-align:center;color:#666;font-size:11px;padding:6px;">Type to search GIFs</div>';
  let gifTimer = null;
  search.addEventListener('input', () => {
    clearTimeout(gifTimer);
    const q = search.value.trim();
    if (!q) { gifGrid.innerHTML = '<div style="grid-column:1/-1;text-align:center;color:#666;font-size:11px;padding:6px;">Type to search GIFs</div>'; return; }
    gifTimer = setTimeout(() => {
      fetch(GIF_URL + encodeURIComponent(q)).then(r => r.json()).then(data => {
        gifGrid.innerHTML = '';
        (data.data || []).forEach(gif => {
          const img = document.createElement('img');
          img.src = gif.images.fixed_height.url;
          img.style.cssText = 'width:100%;border-radius:4px;cursor:pointer;border:1px solid transparent;transition:.15s;';
          img.onmouseenter = () => img.style.borderColor = '#5af';
          img.onmouseleave = () => img.style.borderColor = 'transparent';
          img.addEventListener('click', () => { inp.value += gif.images.original.url; inp.focus(); panel.style.display = 'none'; });
          gifGrid.appendChild(img);
        });
        if (!data.data || !data.data.length) gifGrid.innerHTML = '<div style="grid-column:1/-1;text-align:center;color:#666;font-size:11px;padding:6px;">No GIFs found</div>';
      }).catch(() => { gifGrid.innerHTML = '<div style="grid-column:1/-1;text-align:center;color:#666;font-size:11px;padding:6px;">Failed to load</div>'; });
    }, 400);
  });
  panel.appendChild(search);
  panel.appendChild(gifGrid);
  // Emoji grid
  const grid = document.createElement('div');
  grid.style.cssText = 'display:grid;grid-template-columns:repeat(8,1fr);gap:2px;';
  _emojiList.forEach(em => {
    const eb = document.createElement('button');
    eb.textContent = em;
    eb.style.cssText = 'background:none;border:none;font-size:16px;padding:3px;cursor:pointer;border-radius:3px;line-height:1;';
    eb.onmouseenter = () => eb.style.background = 'rgba(100,140,255,0.2)';
    eb.onmouseleave = () => eb.style.background = 'none';
    eb.addEventListener('click', () => { inp.value += em; inp.focus(); });
    grid.appendChild(eb);
  });
  panel.appendChild(grid);
  // Image upload button
  const uploadRow = document.createElement('div');
  uploadRow.style.cssText = 'margin-top:6px;display:flex;gap:6px;';
  const uploadBtn = document.createElement('button');
  uploadBtn.textContent = '📷 Image';
  uploadBtn.style.cssText = 'flex:1;padding:5px;background:rgba(60,90,180,0.3);border:1px solid rgba(100,100,100,0.4);border-radius:5px;color:#aaa;font:11px monospace;cursor:pointer;';
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  fileInput.style.display = 'none';
  uploadBtn.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { inp.value += reader.result; inp.focus(); panel.style.display = 'none'; };
    reader.readAsDataURL(file);
    fileInput.value = '';
  });
  uploadRow.appendChild(uploadBtn);
  uploadRow.appendChild(fileInput);
  panel.appendChild(uploadRow);
  document.body.appendChild(panel);
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
  });
  document.addEventListener('click', (e) => {
    if (!panel.contains(e.target) && e.target !== btn) panel.style.display = 'none';
  });
})();

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
    document.exitPointerLock?.();
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
    // Dev structure spawn commands (dev world + cheats only)
    if (isDevWorld && cheatsEnabled && DEV_STRUCTURES.includes(cmdPart)) {
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
    // /structure command (dev world + cheats only) — place any structure by name
    if (isDevWorld && cheatsEnabled && cmdPart === 'structure') {
      if (!world) return;
      const name = (text.slice(1).trim().split(/\s+/)[1] || '').toLowerCase();
      if (!name) {
        addChatLine(`Structures: ${DEV_STRUCTURES.join(', ')}`, '#5f5');
        return;
      }
      const ox = Math.floor(player.position.x);
      const oy = Math.floor(player.position.y);
      const oz = Math.floor(player.position.z);
      const bb = placeStructure(world, name, ox, oy, oz);
      if (!bb) {
        addChatLine(`Unknown structure '${name}'. Structures: ${DEV_STRUCTURES.join(', ')}`, '#f55');
        return;
      }
      const cx1 = Math.floor((bb.minX - 1) / CHUNK_SIZE);
      const cx2 = Math.floor((bb.maxX + 1) / CHUNK_SIZE);
      const cz1 = Math.floor((bb.minZ - 1) / CHUNK_SIZE);
      const cz2 = Math.floor((bb.maxZ + 1) / CHUNK_SIZE);
      for (let cx = cx1; cx <= cx2; cx++) {
        for (let cz = cz1; cz <= cz2; cz++) {
          manager.refreshAround(cx, cz);
        }
      }
      addChatLine(`Placed ${name} at (${ox}, ${oy}, ${oz}).`, '#5f5');
      return;
    }
    // Dev spawn animal commands (dev world + cheats only)
    const SPAWN_ANIMALS = ['cow', 'pig', 'sheep', 'chicken', 'spider', 'zombie', 'skeleton', 'slime', 'villager', 'blower', 'portalman', 'traveler', 'pixie', 'wanderer'];
    if (isDevWorld && cheatsEnabled && cmdPart === 'spawn') {
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
    // /gamemode command — works in singleplayer with cheats; in multiplayer sent to server
    if (cmdPart === 'gamemode' && (inMultiplayer || cheatsEnabled)) {
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
    // /give command — singleplayer + cheats only
    if (cmdPart === 'give' && !inMultiplayer && cheatsEnabled) {
      const args = text.slice(1).trim().split(/\s+/);
      const itemName = (args[1] || '').toUpperCase().replace(/ /g, '_');
      const count = parseInt(args[2]) || 1;
      if (!itemName) {
        addChatLine('Usage: /give <item> [count]', '#f55');
        return;
      }
      // Search for item by name in ITEM enum
      let foundId = null;
      for (const [key, val] of Object.entries(ITEM).filter(([k]) => typeof k === 'string')) {
        if (key === itemName) { foundId = val; break; }
      }
      if (foundId == null) {
        addChatLine(`Unknown item: ${itemName}`, '#f55');
        return;
      }
      if (player) {
        player.inventory.add(foundId, count);
        syncUIMode();
      }
      addChatLine(`Gave ${count}x ${itemName}.`, '#5f5');
      return;
    }
    // /time command — singleplayer + cheats only
    if (cmdPart === 'time' && !inMultiplayer && cheatsEnabled) {
      const val = (text.slice(1).trim().split(/\s+/)[1] || '').toLowerCase();
      if (val === 'day' || val === '1000') { dayTime = 0.1; addChatLine('Time set to day.', '#5f5'); }
      else if (val === 'night' || val === '13000') { dayTime = 0.625; addChatLine('Time set to night.', '#5f5'); }
      else if (val === 'noon' || val === '6000') { dayTime = 0.3125; addChatLine('Time set to noon.', '#5f5'); }
      else if (val === 'midnight' || val === '18000') { dayTime = 0.8125; addChatLine('Time set to midnight.', '#5f5'); }
      else addChatLine('Usage: /time <day|noon|night|midnight>', '#f55');
      return;
    }
    // /difficulty command — singleplayer only
    if (cmdPart === 'difficulty' && !inMultiplayer && cheatsEnabled) {
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
    // /tp command — singleplayer + cheats only
    if (cmdPart === 'tp' && !inMultiplayer && cheatsEnabled) {
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
    // /heal command — singleplayer + cheats only
    if (cmdPart === 'heal' && !inMultiplayer && cheatsEnabled) {
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
    // /kill command — singleplayer + cheats only
    if (cmdPart === 'kill' && !inMultiplayer && cheatsEnabled) {
      if (player) {
        player.health = 0;
        addChatLine('You died.', '#f55');
      }
      return;
    }
    // /boss command — spawn the Ender Dragon (cheats only)
    if (cmdPart === 'boss' && !inMultiplayer && cheatsEnabled) {
      if (bossActive) { addChatLine('A boss is already active!', '#f55'); return; }
      if (!player || !mobManager || !scene) return;
      const bx = Math.round(player.position.x);
      const by = Math.round(player.position.y + 20);
      const bz = Math.round(player.position.z);
      const boss = mobManager.spawnAt('dragon', bx, by, bz);
      if (!boss) { addChatLine('Failed to spawn boss.', '#f55'); return; }
      boss.maxHp = boss.hp;
      bossActive = true;
      bossEntity = boss;
      bossAttackTimer = 2;
      addChatLine('The Prismite Dragon has appeared!', '#ff3');
      return;
    }
    // /weather command — singleplayer + cheats only
    if (cmdPart === 'weather' && !inMultiplayer && cheatsEnabled) {
      const val = (text.slice(1).trim().split(/\s+/)[1] || '').toLowerCase();
      if (val === 'clear') { weatherSystem?.setState('clear'); addChatLine('Weather set to clear.', '#5f5'); }
      else if (val === 'rain' || val === 'rainy') { weatherSystem?.setState('rain'); addChatLine('Weather set to rain.', '#5f5'); }
      else if (val === 'thunder' || val === 'storm') { weatherSystem?.setState('thunder'); addChatLine('Weather set to thunder.', '#5f5'); }
      else addChatLine('Usage: /weather <clear|rain|thunder>', '#f55');
      return;
    }
    // /replay command — toggle free cinematic camera (requires cheats)
    if (cmdPart === 'replay') {
      if (!cheatsEnabled) {
        addChatLine('Cheats are disabled in this world — /replay is unavailable.', '#f55');
        return;
      }
      toggleReplayMode();
      return;
    }
    // /help command
    if (cmdPart === 'help') {
      const cmds = [];
      if (cheatsEnabled) {
        cmds.push(
          '/gamemode <creative|survival|adventure|spectator>',
          '/give <item> [count]',
          '/tp <x> <y> <z>',
          '/time <day|noon|night|midnight>',
          '/difficulty <peaceful|easy|normal|hard>',
          '/weather <clear|rain|thunder>',
          '/replay — Free cinematic camera (Z key)',
          '/heal — Restore health',
          '/kill — Die',
          '/boss — Spawn the Prismite Dragon',
        );
        if (isDevWorld) {
          cmds.push(`/spawn <cow|pig|sheep|chicken|spider|zombie|skeleton|slime|villager|blower|portalman>`);
          cmds.push(`/village|house|blacksmith|well|farm|lamp|tower|desert_temple|jungle_temple — Spawn structure`);
        }
      }
      if (inMultiplayer) {
        cmds.push(
          '/pm <player> <message>',
          '/staff <player> — Promote to staff',
          '/admin <player> — Promote to admin',
          '/deop <player> — Demote to player',
          '/kick <player> — Kick a player',
          '/ban <player> [reason]',
          '/unban <player>',
          '/list — List online players',
        );
      }
      cmds.push('/help — Show this help');
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
      try { network.sendChat(text); } catch (_) { console.warn("network sendChat failed"); }
      // Don't return — show locally too, server echo will be deduplicated below
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
  try { localStorage.setItem('bf_recent_servers', JSON.stringify(recent)); } catch (_) { console.warn("localStorage write failed"); }
}

function renderServerList(filter, remoteRooms) {
  const listEl = document.getElementById('server-list');
  if (!listEl) return;

  // Build the full list: OfficialSMP + locally created servers + remote rooms.
  const remoteByName = new Map((remoteRooms || []).map(r => [r.name, r]));

  const all = [];
  // Always include OfficialSMP (create it locally if missing).
  let official = Server.load('OfficialSMP');
  if (!official) {
    official = new Server('OfficialSMP', 50, 'survival', null);
    official.seed = 12345;
    official.ownerSecret = null;
    official.save();
  }
  official._online = true;
  all.push(official);

  // Local (created) servers — merge live network state when available.
  for (const s of Server.listAll()) {
    if (s.name === 'OfficialSMP') continue;
    const remote = remoteByName.get(s.name);
    s._online = !!remote;
    if (remote) {
      if (remote.seed != null) s.seed = remote.seed;
      if (remote.gameMode) s.gameMode = remote.gameMode;
      if (remote.maxPlayers) s.maxPlayers = remote.maxPlayers;
      if (remote.players) s.players = remote.players;
    }
    all.push(s);
  }

  // Remote-only rooms (not saved locally).
  for (const [name, r] of remoteByName) {
    if (all.some(s => s.name === name)) continue;
    const s = new Server(name, r.maxPlayers || 10, r.gameMode || 'survival', r.ownerName || null);
    s.seed = r.seed != null ? r.seed : null;
    s.players = r.players || [];
    s._online = true;
    s._remote = true;
    all.push(s);
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

// ── Live server directory (player-hosted + Official SMP) ───────────────
// Minecraft-Java style multiplayer: the client keeps a list of servers LOCALLY
// (added by the player with name + address) and pings each one directly for
// live status (name / MOTD / players / version) — exactly like Minecraft's
// Server List Ping. There is no central directory in the in-game list.
const SAVED_SERVERS_KEY = 'bf_saved_servers';

function normalizeServerAddress(input) {
  let a = (input || '').trim();
  if (!a) return '';
  if (!/^wss?:\/\//i.test(a)) a = 'ws://' + a;
  const m = a.match(/^(wss?:\/\/)([^:/?#]+)(:[0-9]+)?(\/.*)?$/i);
  if (m && !m[3]) {
    const host = m[2];
    const isLocal = host === 'localhost' || /^(\d{1,3}\.){3}\d{1,3}$/.test(host);
    // Only assume the default port for bare IPs / localhost (like Minecraft
    // assumes 25565). Domains usually go through a tunnel on 443 already.
    if (isLocal) a = m[1] + host + ':4000' + (m[4] || '');
  }
  return a;
}

// Browsers block ws:// connections from an https page (mixed content), so a
// self-hosted server must be reachable over wss:// (via a tunnel) or the game
// must be served over http.
function wsSchemeWarning(url) {
  if (window.location && window.location.protocol === 'https:' && url.indexOf('wss://') !== 0) {
    return 'That server is ws:// but the game is on https. Use a wss:// address (a tunnel like playit.gg or cloudflared) or open the game over http.';
  }
  return null;
}

function getSavedServers() {
  try {
    const v = JSON.parse(localStorage.getItem(SAVED_SERVERS_KEY) || '[]');
    return Array.isArray(v) ? v : [];
  } catch { return []; }
}
function saveServers(list) { try { localStorage.setItem(SAVED_SERVERS_KEY, JSON.stringify(list)); } catch (_) {} }
function addSavedServer(name, address) {
  const norm = normalizeServerAddress(address);
  if (!norm) return false;
  const list = getSavedServers();
  if (list.some(s => s.address === norm)) return true;
  list.push({ name: (name || '').trim() || norm, address: norm, official: false });
  saveServers(list);
  return true;
}
function removeSavedServer(address) {
  saveServers(getSavedServers().filter(s => s.address !== address));
}
function ensureSeedOfficialServer() {
  const list = getSavedServers();
  if (list.some(s => s.address === BACKEND_URL)) return;
  if (list.length === 0) {
    list.push({ name: 'Official SMP', address: BACKEND_URL, official: true });
    saveServers(list);
  }
}

// Server List Ping — connect, ask for status, no auth/join. Returns the
// server's public info or {error}.
function pingServerStatus(address) {
  return new Promise((resolve) => {
    const url = normalizeServerAddress(address);
    if (!url) { resolve({ error: 'Invalid address' }); return; }
    const warn = wsSchemeWarning(url);
    if (warn) { resolve({ error: 'needs wss://' }); return; }
    const now = () => (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
    let done = false, ws = null;
    const finish = (res) => { if (done) return; done = true; try { if (ws) ws.close(); } catch (_) {} resolve(res); };
    let to;
    try { ws = new WebSocket(url); } catch (e) { finish({ error: 'bad url' }); return; }
    to = setTimeout(() => finish({ error: 'timed out' }), 4500);
    ws.onopen = () => { try { ws.send(JSON.stringify({ type: 'status' })); } catch (_) {} };
    ws.onmessage = (e) => {
      try {
        const msg = JSON.parse(typeof e.data === 'string' ? e.data : '');
        if (msg && msg.type === 'status') {
          clearTimeout(to);
          finish({
            ok: true,
            name: msg.name,
            description: msg.description || '',
            players: msg.players || 0,
            maxPlayers: msg.maxPlayers || 0,
            version: msg.version || '?',
            latency: Math.round(now() - t0),
          });
        }
      } catch (_) {}
    };
    ws.onerror = () => finish({ error: 'unreachable' });
    ws.onclose = () => { if (!done) finish({ error: 'closed' }); };
    const t0 = now();
  });
}

function updateServerRowStatus(idx, status) {
  const row = document.querySelector('.sv-row[data-index="' + idx + '"]');
  if (!row) return;
  const st = row.querySelector('.sv-status');
  if (!st) return;
  if (status.error) {
    st.textContent = 'Offline (' + status.error + ')';
    st.style.color = '#f88';
  } else {
    const motd = status.description ? ' — ' + status.description : '';
    st.textContent = status.players + '/' + status.maxPlayers + ' players · v' + status.version + ' · ' + status.latency + 'ms' + motd;
    st.style.color = '#9aa4b8';
  }
}

async function renderSavedServers() {
  const el = document.getElementById('saved-servers');
  if (!el) return;
  ensureSeedOfficialServer();
  const list = getSavedServers();
  if (list.length === 0) {
    el.innerHTML = '<div style="color:#888;padding:10px;font:11px monospace;text-align:center;">No servers yet. Click "+ Add Server" or type an address above.</div>';
    return;
  }
  el.innerHTML = list.map((s, i) => `
    <div class="sv-row" data-index="${i}" style="display:flex;align-items:center;gap:8px;padding:8px 10px;margin-bottom:4px;background:rgba(255,255,255,0.04);border:1px solid rgba(80,80,100,0.25);border-radius:4px;">
      <div style="flex:1;min-width:0;">
        <div style="font:bold 12px monospace;color:#eee;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escHtml(s.name)}${s.official ? '<span style="color:#fa0;font:9px monospace;margin-left:6px;letter-spacing:1px;">OFFICIAL</span>' : ''}</div>
        <div class="sv-status" style="font:10px monospace;color:#888;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">Pinging…</div>
        <div style="font:10px monospace;color:#788;margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escHtml(s.address)}</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:4px;align-items:flex-end;">
        <button class="sv-join" data-address="${escHtml(s.address)}" style="background:linear-gradient(180deg,#5a8a5a 0%,#4a7a4a 40%,#407040 60%,#366336 100%);border:1px solid #2a5a2a;color:#fff;cursor:pointer;font:bold 11px monospace;padding:6px 14px;border-radius:3px;letter-spacing:0.5px;">JOIN</button>
        ${s.official ? '' : '<button class="sv-del" data-address="' + escHtml(s.address) + '" style="background:transparent;border:1px solid rgba(150,80,80,0.5);color:#f99;cursor:pointer;font:10px monospace;padding:3px 8px;border-radius:3px;">✕</button>'}
      </div>
    </div>`).join('');
  el.querySelectorAll('.sv-join').forEach(btn => btn.addEventListener('click', () => joinServerByAddress(btn.dataset.address)));
  el.querySelectorAll('.sv-del').forEach(btn => btn.addEventListener('click', () => { removeSavedServer(btn.dataset.address); renderSavedServers(); }));
  // Ping each server directly (Minecraft-style Server List Ping)
  for (let i = 0; i < list.length; i++) {
    const status = await pingServerStatus(list[i].address);
    updateServerRowStatus(i, status);
  }
}

// Minecraft-style LAN auto-discovery (web edition): instead of typing an IP,
// the official backend's directory of online servers is fetched and shown here
// automatically. Players join with one click — the address is filled in for them.
function joinServerByAddress(address) {
  address = normalizeServerAddress(address);
  if (!address) return;
  if (playerName.startsWith('Guest')) {
    addChatLine('Create an account to play multiplayer!', '#fa0');
    return;
  }
  const warn = wsSchemeWarning(address);
  if (warn) { addChatLine(warn, '#f66', true); return; }
  const errEl = document.getElementById('mp-error');
  if (errEl) errEl.textContent = '';
  addChatLine('Connecting to ' + address + '…', '#7af', true);
  stopMpStatusTimer();
  if (network.connected) network.disconnect();
  network.connect(address);
  network.onConnectedOnce(() => {
    showWorldsView();
    renderServerList();
    network.listRooms();
    syncLocalServersToNetwork();
  });
}

function showServersView() {
  const sp = document.getElementById('servers-panel');
  const wp = document.getElementById('worlds-panel');
  if (sp) sp.style.display = '';
  if (wp) wp.style.display = 'none';
}
function showWorldsView() {
  const sp = document.getElementById('servers-panel');
  const wp = document.getElementById('worlds-panel');
  if (sp) sp.style.display = 'none';
  if (wp) wp.style.display = '';
}

// Minecraft-style: while the Multiplayer menu is open, keep pinging saved
// servers so their live status (name / MOTD / players) stays current.
let _mpStatusTimer = null;
function stopMpStatusTimer() { if (_mpStatusTimer) { clearInterval(_mpStatusTimer); _mpStatusTimer = null; } }

function showMultiplayerMenu() {
  if (playerName.startsWith('Guest')) {
    addChatLine('Create an account to play multiplayer!', '#fa0');
    return;
  }
  const mpUsername = document.getElementById('input-mp-username');
  if (mpUsername) mpUsername.value = playerName;
  renderRecentServers();
  renderSavedServers();
  showServersView();
  ui.showMenu('multiplayer');
  stopMpStatusTimer();
  _mpStatusTimer = setInterval(() => { renderSavedServers(); }, 5000);

  // Connect to server and fetch remote room list
  if (!network.connected) {
    addChatLine('Please connect to WiFi or Data to play online.', '#fa0', true);
    return;
  }
  renderServerList();
  network.listRooms();
  syncLocalServersToNetwork();
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
  if (modeEl) modeEl.textContent =
    document.getElementById('sv-mode-creative')?.classList.contains('selected') ? 'Creative'
    : 'Survival';
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
    addChatLine('Please connect to WiFi or Data to play online.', '#fa0', true);
    return;
  }
  _doNetworkJoin(name, seed);
}

function _doNetworkJoin(name, seed) {
  if (playerName.startsWith('Guest')) {
    addChatLine('Create an account to play multiplayer!', '#fa0');
    return;
  }
  let cgUsername = '';
  try { cgUsername = window.CrazyGames?.SDK?.user?.getUsername?.() || ''; } catch {}
  let skinIdx = getStoredSkinIndex();

  // If we have a local server entry, create it on the network
  // (server.js auto-joins if the room already exists)
  let password = '';
  try { password = _xorDecode(localStorage.getItem('bf_login_pass') || '') || ''; } catch (_) { console.warn("localStorage read failed"); }
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
    // Show queued confirmation in chat as well
    if (msg.ok && msg.queued) {
      addChatLine(msg.text, '#8c8', true);
    }
    // Surface failed DM sends where the user can see them (the friends-menu
    // error element is hidden while the DM panel is open).
    if (!msg.ok && _dmOpenFor) {
      addChatLine('DM failed: ' + (msg.text || 'message not delivered'), '#f55', true);
    }
  };
  network.onDm = (from, text, offline, id) => {
    if (!from || from === playerName) return;
    // Deduplicate: skip if another tab already saved this message
    const now = Date.now();
    if (!_dmExists(from, from, text, now)) {
      const msgs = _loadDMThread(from);
      msgs.push({ from, text, time: now, id: id || _nextDmId(), status: 'delivered' });
      _saveDMThread(from, msgs);
    }
    if (_dmOpenFor === from) {
      renderDMMessages();
      // Tell server we read it (triggers blue tick for the sender)
      if (network.connected) {
        try { network.sendDmRead(from, id); } catch (_) {}
      }
    } else {
      // Notify the recipient even if the DM panel is closed. Text is already
      // escaped, so pass raw=true to avoid double-escaping in addChatLine.
      const prefix = offline ? '[Offline] ' : '';
      addChatLine('DM from ' + escHtml(from) + ': ' + prefix + escHtml(text), '#d0f', true);
      showDmToast(from, prefix + text);
    }
  };
  network.onDmStatus = (id, status, from) => {
    if (!id || !from) return;
    // Update the message status in the thread
    const msgs = _loadDMThread(from);
    for (let i = msgs.length - 1; i >= 0; i--) {
      if (msgs[i].id === id) {
        msgs[i].status = status;
        break;
      }
    }
    _saveDMThread(from, msgs);
    if (_dmOpenFor === from) renderDMMessages();
  };
  network.onDmOfflineCount = (count) => {
    if (count > 0) {
      addChatLine(`You received ${count} offline message${count > 1 ? 's' : ''} while you were away.`, '#d0f', true);
    }
  };
  // Cross-device DM sync: server sends merged history, we merge into localStorage
  network.onDmSyncPull = (threads) => {
    if (!threads || typeof threads !== 'object') return;
    for (const [serverKey, msgs] of Object.entries(threads)) {
      if (!Array.isArray(msgs)) continue;
      const localKey = 'bf_dm_' + serverKey;
      const existing = _loadDMThreadRaw(localKey);
      const merged = _mergeDmArrays(existing, msgs);
      cloudSet(localKey, JSON.stringify(merged));
    }
    // Re-render DM panel if open
    if (_dmOpenFor) renderDMMessages();
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
    } catch (_) { console.warn("operation failed"); }

    // Track multiplayer for achievements
    achievements.incrementStat('multiplayerJoined');

    // Show invite link button
    const inviteBtn = document.getElementById('btn-invite-link');
    if (inviteBtn) inviteBtn.style.display = '';

    const serverSeed = typeof seed === 'number' ? seed : 42;
    const dwOpts = _pendingDevWorldOpts || {};
    _pendingDevWorldOpts = null;
    const _isBedwarsRoom = gameMode === 'bedwars';
    startGame('multiplayer_' + room, serverSeed, gameMode, dwOpts.diff || 'normal', {
      flat: _isBedwarsRoom ? false : !!dwOpts.flat,
      void: _isBedwarsRoom ? true : !!dwOpts.void,
      dev: !!dwOpts.dev,
      bedwars: _isBedwarsRoom,
    });

    // Spawn existing remote players from the player list
    setTimeout(() => {
      if (!mpRenderer || !player || !world) return;
      for (const p of players) {
        if (p.name === playerName) continue;
        const sy = world.heightAt(Math.floor(player.position.x), Math.floor(player.position.z)) + 1;
        const bwColor = isBedwars ? (BW_TEAMS.find(t => t.key === bwTeamKeyFor(p.name)) || {}).color : undefined;
        mpRenderer.addPlayer(p.name, p.skinIndex || 0, 0, sy, 0, p.role, p.cgUsername, bwColor);
      }
    }, 500);
  };

  network.onPlayerJoin = (name, role, skinIndex, cgUsername) => {
    if (!mpRenderer || !player || !world) return;
    const sy = world.heightAt(Math.floor(player.position.x), Math.floor(player.position.z)) + 1;
    const bwColor = isBedwars ? (BW_TEAMS.find(t => t.key === bwTeamKeyFor(name)) || {}).color : undefined;
    mpRenderer.addPlayer(name, skinIndex || 0, 0, sy, 0, role, cgUsername, bwColor);
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
    // Skip our own messages — already displayed locally
    if (name === playerName) return;
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
    try { window.CrazyGames?.SDK?.game?.setRoom?.(null); } catch (_) { console.warn("CG SDK setRoom failed"); }
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

  // Chest contents sync: a remote player changed a chest — store it locally so
  // the contents stay consistent across clients, and refresh the UI if we have
  // that chest open.
  network.onChestUpdate = (x, y, z, slots) => {
    if (!world) return;
    const k = x * 1000000 + y * 1000 + z;
    world.chestInventories.set(k, Array.isArray(slots) ? slots.slice() : []);
    if (ui.chestOpen && ui.chestPos && ui.chestPos.x === x && ui.chestPos.y === y && ui.chestPos.z === z) {
      ui.chestSlots = world.getOrCreateChest(x, y, z);
      ui._renderChestGrid();
    }
  };

  network.onBlockBatch = (edits) => {
    if (!world || !network.isInRoom()) return;
    // Room edits can arrive right after 'joined', while the world is still
    // loading (gameRunning is still false). Buffer them and flush on the first
    // running frame, otherwise joins miss bedwars bed-breaks and builds.
    if (!gameRunning) {
      _pendingRoomEdits = (_pendingRoomEdits || []).concat(edits || []);
      return;
    }
    for (const e of edits) {
      // In non-parkour mode, ignore blocks far above normal terrain (parkour map bleed)
      if (!isParkour && !isBedwars && e.y > 140) continue;
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
      try { window.CrazyGames?.SDK?.game?.setRoom?.(null); } catch (_) { console.warn("CG SDK setRoom failed"); }
      cgGameplayStop();
      cgClearGameContext();
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
        cloudSet('bf_player_name', playerName);
        cloudSet('bf_login_user', playerName);
        const pass = document.getElementById('login-password');
        if (pass) localStorage.setItem('bf_login_pass', _xorEncode(pass.value));
      } catch (_) { console.warn("operation failed"); }
      sessionStorage.setItem('bf_authenticated', '1');
      setSkinUser(playerName);
      // Sync DM history to server for cross-device support
      try {
        const dmThreads = {};
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith('bf_dm_')) {
            const serverKey = key.slice(7); // strip 'bf_dm_' prefix
            try { dmThreads[serverKey] = JSON.parse(localStorage.getItem(key)); } catch (_) {}
          }
        }
        if (Object.keys(dmThreads).length > 0) {
          network.sendDmSyncPush(dmThreads);
        }
      } catch (_) {}
      const nameTag = document.getElementById('menu-player-name');
      if (nameTag) nameTag.textContent = playerName;
      _refreshDevButtons();
      // Only jump to the main menu when this auth came from the login screen —
      // not from a background re-auth (e.g. opening the Friends menu).
      if (_backgroundAuth) {
        _backgroundAuth = false;
        if (_autoRegisterFallback) _autoRegisterFallback = false;
        if (window._autoLoggingIn) {
          window._autoLoggingIn = false;
          showToast(msg.created ? 'Account created! Welcome, ' + playerName + '!' : 'Welcome back, ' + playerName + '!', '#5f5', 3);
        }
        if (_devPanelNeedsAccounts) {
          _devPanelNeedsAccounts = false;
          network.devListAccounts();
        }
      } else {
        if (loginHint) { loginHint.style.color = '#5f5'; loginHint.textContent = msg.created ? 'Account created! Welcome, ' + playerName + '.' : 'Logged in! Welcome back, ' + playerName + '.'; }
        cloudSet('bf_role', playerRole);
        // Bot gate (non-CG website): correct credentials issue a one-time entry
        // token, then go straight into the game with the player link in the URL.
        // Manual reloads and direct link opens have no token and land on the
        // login screen. CrazyGames keeps its SDK account-integration flow.
        if (isOnCrazyGames()) {
          ui.showMenu('main');
        } else {
          try { sessionStorage.setItem('bf_entry_token', '1'); } catch (_) { console.warn("sessionStorage write failed"); }
          window.location.href = '/?user=' + encodeURIComponent(playerName || '') + '&from=game';
        }
      }
    } else {
      // Auto-register fallback: when a portal login uses a brand-new username,
      // the server has no account yet — retry once with 'register' mode.
      const reason = msg.reason || '';
      if (_autoRegisterFallback && (reason.includes('Account not found') || reason.includes('account not found') || reason.includes('Account does not exist'))) {
        _autoRegisterFallback = false;
        const regUser = document.getElementById('login-username');
        const regPass = document.getElementById('login-password');
        network.sendAuth(regUser ? regUser.value : playerName, regPass ? regPass.value : '', 'register');
        return;
      }
      _autoRegisterFallback = false;
      if (_backgroundAuth) {
        _backgroundAuth = false;
        if (_devPanelNeedsAccounts) {
          _devPanelNeedsAccounts = false;
          setDevAccountListMsg('Auth failed: ' + (msg.reason || 'unknown error'));
        }
      }
      if (window._autoLoggingIn) {
        // Auto-login from portal/redirect failed — bring up the login screen
        // so the user can correct their credentials.
        window._autoLoggingIn = false;
        _autoRegisterFallback = false;
        if (loginHint) { loginHint.style.color = '#f85'; loginHint.textContent = msg.reason || 'Login failed. Please try again.'; }
        ui.showMenu('login');
      } else if (loginHint) { loginHint.style.color = '#f85'; loginHint.textContent = msg.reason || 'Login failed.'; }
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

function createServer(name, maxPlayers, mode, seed, isPrivate, address) {
  // Save locally for role tracking
  let server = Server.load(name);
  if (!server) {
    server = new Server(name, maxPlayers, mode, playerName);
    if (seed) server.seed = seed;
    server.isPrivate = !!isPrivate;
    server.save();
  }
  trackServerCreated();

  // Host on the player's own server via a custom IP (from their server files)
  if (address) {
    const addr = normalizeServerAddress(address);
    if (!addr) { addChatLine('Invalid server address.', '#f55', true); return; }
    const warn = wsSchemeWarning(addr);
    if (warn) { addChatLine(warn, '#f66', true); return; }
    if (network.connected) network.disconnect();
    network.connect(addr);
    network.onConnectedOnce(() => _doNetworkJoin(name, seed));
    addChatLine('Hosting "' + name + '" on ' + addr + '…', '#7af', true);
    return;
  }

  // Connect and create on network
  if (!network.connected) {
    addChatLine('Please connect to WiFi or Data to play online.', '#fa0', true);
    return;
  }
  _doNetworkJoin(name, seed);
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
    cloudSet('bf_player_name', v);
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
  try { localStorage.removeItem('bf_server_' + name); } catch (_) { console.warn("localStorage write failed"); }
  // Remove from recent servers
  const recent = getRecentServers().filter(s => s !== name);
  try { localStorage.setItem('bf_recent_servers', JSON.stringify(recent)); } catch (_) { console.warn("localStorage write failed"); }
  if (network.roomName === name) {
    network.leaveRoom();
    try { window.CrazyGames?.SDK?.game?.setRoom?.(null); } catch (_) { console.warn("CG SDK setRoom failed"); }
  }
  renderServerList(undefined, _remoteRoomCache);
  renderRecentServers();
};

window._exitParkourToMinigames = () => {
  gameRunning = false;
isParkour = false;
    isOneBlock = false;
    isBedwars = false;
    isBlockZones = false;
    isNights = false;
    isGunAffair = false;
    isSkyblock = false;
    clearOneBlockState();
    clearBlockZones();
    clearNights();
    clearGunAffair();
    clearSkyblock();
    clearLiquid();
  const _obHud = document.getElementById('oneblock-hud');
  if (_obHud) _obHud.remove();
  _oneBlockEl = null;
  _isImportedParkour = false;
  _parkourLevelEnds = null;
  _importedParkourData = null;
  resetParkourState();
  const parkourHud = document.getElementById('parkour-hud');
  if (parkourHud) parkourHud.remove();
  _parkourTimerEl = null;
  _parkourLevelEl = null;
  document.getElementById('status-bars').style.display = '';
  { const _ar = document.getElementById('armor-row'); if (_ar) _ar.style.display = ''; }
  if (player) { saveCurrentWorld(); }
  manager?.clear?.();
  if (mobManager) { mobManager.clear(); mobManager = null; }
  if (explosionManager) { explosionManager.clear(); explosionManager = null; }
  if (playerModel) { playerModel.dispose(); playerModel = null; }
  if (weatherSystem) { weatherSystem.clear(); weatherSystem = null; }
  if (droppedItemManager) { droppedItemManager.clear(); droppedItemManager = null; }
  if (tntManager) { tntManager.clear(); tntManager = null; }
  if (mpRenderer) { mpRenderer.clear(); mpRenderer = null; }
  if (breakParticles) { breakParticles.clear(); breakParticles = null; }
  if (ambientParticles) { ambientParticles.clear(); ambientParticles = null; }
  if (cloudSystem) { cloudSystem.clear(); cloudSystem = null; }
  if (_portalOrbs.length) { _portalOrbs.forEach(o => o.dispose()); _portalOrbs = []; }
  if (_portalRings.length) { _portalRings.forEach(r => r.dispose()); _portalRings = []; }
  _clearPortalBeam();
  ui.showMenu('minigames');
};

// Update the OneBlock HUD (stage, block name, progress to next stage).
function updateOneBlockHud() {
  if (!_oneBlockEl || !world) return;
  const title = document.getElementById('oneblock-title');
  const sub = document.getElementById('oneblock-sub');
  const fill = document.getElementById('oneblock-progress-fill');
  if (!title || !sub || !fill) return;
  const pos = getOneBlockPos();
  const blockId = world.getBlock(pos.x, pos.y, pos.z);
  const blockName = (BLOCKS[blockId] && BLOCKS[blockId].name) || '???';
  const count = getOneBlockCount();
  const prog = getOneBlockProgress();
  title.textContent = `⛏ OneBlock — ${blockName}`;
  if (prog.next) {
    const left = Math.max(0, prog.next.req - count);
    sub.textContent = `Phase ${prog.stage.name} • ${count} broken • ${left} to ${prog.next.name}`;
    fill.style.width = `${(prog.pct * 100).toFixed(0)}%`;
  } else {
    sub.textContent = `Phase ${prog.stage.name} • ${count} broken • MAX PHASE`;
    fill.style.width = '100%';
  }
  const pool = document.getElementById('oneblock-pool');
  if (pool) {
    const total = prog.stage.blocks.reduce((s, b) => s + b[1], 0);
    pool.innerHTML = prog.stage.blocks
      .map(([b, w]) => {
        const name = (BLOCKS[b] && BLOCKS[b].name) || '?';
        return `<span style="color:#8f8;">${name}</span> <span style="color:#888;">${((w / total) * 100).toFixed(1)}%</span>`;
      })
      .join('<span style="color:#444;"> • </span>');
  }
}

// ── Bedwars helpers ─────────────────────────────────────────────────────

// Deterministic team lookup for a player from the current room roster.
function bwTeamKeyFor(name) {
  const roster = ((currentServer && currentServer.players) || []).map(p => p.name);
  return assignBedwarsTeam(name, roster).key;
}

function renderBedwarsHud() {
  if (!bwHudEl || !world) return;
  let html = '<div style="font:bold 15px monospace;color:#ffd;text-shadow:0 1px 2px #000;">⚔ BEDWARS</div>';
  if (bwMyTeam) {
    html += `<div style="font:12px monospace;color:#fff;text-shadow:0 1px 2px #000;margin-top:2px;">Team: <span style="color:${bwMyTeam.color};">${bwMyTeam.name}</span></div>`;
  }
  let beds = '';
  for (const team of BW_TEAMS) {
    const bed = bwBeds[team.key];
    const ok = !bed || bed.intact;
    const own = team.key === bwMyTeamKey;
    beds += `<span style="color:${ok ? '#6f6' : '#f66'};${own ? ';font-weight:bold;text-decoration:underline' : ''}">${ok ? '🛏' : '✗'} ${team.name}</span> `;
  }
  html += `<div style="font:11px monospace;margin-top:4px;">${beds}</div>`;
  if (bwGameOver) {
    const winner = BW_TEAMS.find(t => t.key === bwWinTeamKey);
    html += `<div style="font:bold 20px monospace;color:#ff0;text-shadow:0 2px 4px #000;margin-top:10px;">${winner ? `${winner.name.toUpperCase()} WINS!` : 'DRAW!'}</div>`;
    if (bwSpec || (bwWinTeamKey && bwWinTeamKey === bwMyTeamKey) || !bwWinTeamKey) {
      html += '<div style="font:11px monospace;color:#fff;text-shadow:0 1px 2px #000;">Match over — keep building or start a new server.</div>';
    }
  }
  bwHudEl.innerHTML = html;
}

function bwRespawnLocal() {
  if (!player || !bwMap) return;
  player.dead = false;
  const sp = bwMap.spawn[bwMyTeamKey];
  if (sp) {
    // Validate spawn is on solid ground (prevent respawn loop if platform destroyed)
    const spawnBlock = world?.getBlock(Math.floor(sp.x), Math.floor(sp.y) - 1, Math.floor(sp.z));
    const spawnAir = world?.getBlock(Math.floor(sp.x), Math.floor(sp.y), Math.floor(sp.z));
    if (spawnBlock && !BLOCKS[spawnBlock]?.solid) {
      // Platform destroyed — find nearest solid ground upward
      let found = false;
      for (let y = Math.floor(sp.y); y < Math.floor(sp.y) + 10; y++) {
        const b = world.getBlock(Math.floor(sp.x), y, Math.floor(sp.z));
        if (BLOCKS[b]?.solid) {
          sp.y = y + 1;
          found = true;
          break;
        }
      }
      if (!found) sp.y += 3; // fallback: spawn higher
    }
    player.position.set(sp.x, sp.y, sp.z);
    player.velocity.set(0, 0, 0);
    player.spawnPoint.set(sp.x, sp.y, sp.z);
    player.yaw = sp.yaw;
  }
  player.health = player.maxHealth;
  player.hunger = player.maxHunger;
  player.setGamemode('survival');
}

function bedwarsEliminateLocal() {
  if (bwSpec) return;
  bwSpec = true;
  if (player) {
    player.dead = false;
    player.setGamemode('spectator'); // sets this.flying = true
    player.health = Math.max(1, player.health);
  }
  const shop = document.getElementById('bedwars-shop');
  if (shop) shop.remove();
}

function checkBedwarsWin() {
  if (bwGameOver) return;
  const intact = BW_TEAMS.filter(t => {
    const b = bwBeds[t.key];
    return b && b.intact;
  });
  if (intact.length > 1) return;
  bwGameOver = true;
  bwWinTeamKey = intact.length === 1 ? intact[0].key : null;
  const winning = intact.length === 1 ? intact[0] : null;
  if (winning) {
    addChatLine(`🏆 ${winning.name} team has won Bedwars!`, winning.color);
    if (bwMyTeamKey === winning.key) addChatLine('Congratulations — you held the last bed!', '#ff0');
  } else {
    addChatLine('🏆 Draw — every bed was destroyed!', '#fff');
  }
  if (audio) audio.levelUp?.();
  renderBedwarsHud();

  // CG midgame ad after Bedwars win (natural break point)
  cgHappyTime();
  cgGameplayStop();
  try { window.CrazyGames?.SDK?.game?.setRoom?.(null); } catch (_) {}
  cgMidgameAd({
    adStarted() { audio.stopMusic(); audio.setMuted(true); },
    adFinished() { audio.setMuted(false); showMinigames(); },
    adError() { audio.setMuted(false); showMinigames(); },
  });
}

const BW_CURRENCY_META = [
  { id: BW_RES_IRON, sym: '⛏', color: '#dcdcdc', name: 'Iron' },
  { id: BW_RES_GOLD, sym: '◆', color: '#ffe050', name: 'Gold' },
  { id: BW_RES_DIAMOND, sym: '✦', color: '#55e0ff', name: 'Diamond' },
  { id: BW_RES_EMERALD, sym: '❖', color: '#44ff88', name: 'Emerald' },
];

function bwCurrencyChip(id) {
  const m = BW_CURRENCY_META.find(c => c.id === id) || { sym: '?', color: '#fff', name: '?' };
  return `<b style="color:${m.color};">${m.sym}</b> ${m.name}`;
}

function openBedwarsShop() {
  if (document.getElementById('bedwars-shop')) return;
  if (bwSpec || bwGameOver || !player || !isBedwars) return;
  const panel = document.createElement('div');
  panel.id = 'bedwars-shop';
  panel.style.cssText = 'position:fixed;inset:0;z-index:3000;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.5);font-family:monospace;';
  const box = document.createElement('div');
  box.style.cssText = 'width:min(460px,92vw);max-height:80vh;background:#1c232b;border:2px solid #3a4b5e;border-radius:8px;padding:16px;box-shadow:0 8px 30px rgba(0,0,0,0.6);overflow-y:auto;color:#eee;';
  box.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;"><div style="font:bold 18px monospace;color:#ffd;">⚒ BASE SHOP</div><button id="bw-shop-close" style="background:#3a4b5e;border:none;color:#fff;width:26px;height:26px;border-radius:4px;cursor:pointer;font-size:14px;">✕</button></div>';
  panel.appendChild(box);
  document.body.appendChild(panel);
  document.exitPointerLock?.();
  renderBedwarsShop();

  panel.addEventListener('click', (e) => {
    if (e.target.id === 'bw-shop-close') { closeBedwarsShop(); return; }
    const buy = e.target.closest('[data-buy]');
    if (buy) {
      const idx = parseInt(buy.dataset.buy, 10);
      buyBedwarsItem(idx);
    }
  });
}

function renderBedwarsShop() {
  const panel = document.getElementById('bedwars-shop');
  const box = panel ? panel.firstElementChild : null;
  if (!box || !player || !player.inventory) return;

  // Currency header
  const chips = BW_CURRENCY_META.map(c => {
    const n = player.inventory.count(c.id);
    return `<span style="margin-right:12px;color:${c.color};">${c.sym} ${n}</span>`;
  }).join('');
  box.innerHTML =
    '<div style="display:flex;justify-content:space-between;align-items:center;"><div style="font:bold 18px monospace;color:#ffd;">⚒ BASE SHOP</div><button id="bw-shop-close" style="background:#3a4b5e;border:none;color:#fff;width:26px;height:26px;border-radius:4px;cursor:pointer;font-size:14px;">✕</button></div>' +
    `<div style="margin:10px 0 4px;font:13px monospace;color:#9fb;border-bottom:1px solid #3a4b5e;padding-bottom:6px;">${chips}</div>`;

  for (const cat of BW_SHOP) {
    box.insertAdjacentHTML('beforeend', `<div style="font:bold 13px monospace;color:#ffd;margin:10px 0 4px;">${cat.cat}</div>`);
    for (let i = 0; i < cat.items.length; i++) {
      const item = cat.items[i];
      const afford = Object.entries(item.cost).every(([cid, amt]) => player.inventory.has(parseInt(cid, 10), amt));
      const costHtml = Object.entries(item.cost).map(([cid, amt]) => `${amt} ${bwCurrencyChip(parseInt(cid, 10))}`).join(' + ');
      box.insertAdjacentHTML('beforeend',
        `<div style="display:flex;justify-content:space-between;align-items:center;background:#242e38;border-radius:5px;padding:6px 8px;margin-bottom:5px;${afford ? '' : 'opacity:0.55;'}">
          <div>
            <div style="font:12px monospace;color:#fff;">${escHtml(item.name)}</div>
            <div style="font:10px monospace;color:#889;">${escHtml(item.desc)} — ${costHtml}</div>
          </div>
          <button data-buy="${cat.cat}-${i}" style="background:${afford ? '#3f8f4f' : '#444'};border:none;color:#fff;border-radius:4px;padding:5px 12px;cursor:${afford ? 'pointer' : 'not-allowed'};font:11px monospace;${afford ? '' : 'pointer-events:none;'}">BUY</button>
        </div>`);
    }
  }
}

function buyBedwarsItem(idx) {
  if (!player || !player.inventory || bwSpec || bwGameOver) return;
  // idx is now "categoryName-itemIndex" format
  if (typeof idx === 'string') {
    const dashIdx = idx.indexOf('-');
    if (dashIdx === -1) return;
    const catName = idx.slice(0, dashIdx);
    const itemIdx = parseInt(idx.slice(dashIdx + 1), 10);
    const cat = BW_SHOP.find(c => c.cat === catName);
    if (!cat || itemIdx < 0 || itemIdx >= cat.items.length) return;
    const item = cat.items[itemIdx];
    for (const [cid, amt] of Object.entries(item.cost)) {
      if (!player.inventory.has(parseInt(cid, 10), amt)) return;
    }
    for (const [cid, amt] of Object.entries(item.cost)) player.inventory.remove(parseInt(cid, 10), amt);
    const leftover = player.inventory.add(item.id, item.count);
    if (leftover > 0 && droppedItemManager) {
      droppedItemManager.drop(item.id, leftover, player.position.x, player.position.y + 0.5, player.position.z);
    }
    if (audio) audio.click?.();
    syncUIMode();
    renderBedwarsShop();
    return;
  }
  // Legacy numeric fallback
  for (const cat of BW_SHOP) {
    for (const item of cat.items) {
      if (idx !== cat.items.indexOf(item)) continue;
      for (const [cid, amt] of Object.entries(item.cost)) {
        if (!player.inventory.has(parseInt(cid, 10), amt)) return;
      }
      for (const [cid, amt] of Object.entries(item.cost)) player.inventory.remove(parseInt(cid, 10), amt);
      const leftover = player.inventory.add(item.id, item.count);
      if (leftover > 0 && droppedItemManager) {
        droppedItemManager.drop(item.id, leftover, player.position.x, player.position.y + 0.5, player.position.z);
      }
      if (audio) audio.click?.();
      syncUIMode();
      renderBedwarsShop();
      return;
    }
  }
}

function closeBedwarsShop() {
  const panel = document.getElementById('bedwars-shop');
  if (panel) panel.remove();
  if (gameRunning && !ui.isOverlayShown() && player) lockPointer();
}

// ── Tutorial / first-time intro ─────────────────────────────────────────

function showTutorial() {
  const overlay = document.getElementById('tutorial-overlay');
  if (overlay) overlay.style.display = 'flex';
  document.exitPointerLock?.();
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
// Full day/night cycle length in seconds (Minecraft-style: 20 minutes).
// DAY_FRAC is the fraction of the cycle that counts as daytime (10/16 = 0.625).
const DAY_LENGTH = 1200;
const DAY_FRAC = 10 / 16;
let dayTime = 0.3;
let totalDays = 1;
let _cricketTimer = 0;

// ── Replay mode: free cinematic camera (spectator-style) ──────────────
// Toggle with the "replay" keybind (default Z) or `/replay`. While active the
// camera detaches from the player and becomes a noclip free-fly camera:
// WASD to move, Space/Shift to go up/down, mouse wheel to change speed, and
// the normal mouse-look to rotate. HUD + player model are hidden so the view
// is pure scenery — ideal for cinematics and recording trailers.
let replayMode = false;
const replayCam = {
  pos: new THREE.Vector3(),
  yaw: 0,
  pitch: 0,
  speed: 24,
  _fromPos: new THREE.Vector3(),
  _fromYaw: 0,
  _fromPitch: 0,
};

function applyReplayMode() {
  document.body.classList.toggle('replay-mode', replayMode);
  if (playerModel) playerModel.setVisible(!replayMode);
  viewmodel.setVisible(!replayMode);
  if (replayMode) {
    replayCam.pos.copy(camera.position);
    replayCam.yaw = player ? player.yaw : 0;
    replayCam.pitch = player ? player.pitch : 0;
    if (player) player.velocity.set(0, 0, 0);
    addChatLine('Replay camera: WASD to fly, Space/Shift up & down, wheel for speed, Z to exit.', '#9cf');
  } else {
    addChatLine('Replay camera off.', '#9cf');
  }
}

function toggleReplayMode() {
  if (!gameRunning || !player) return false;
  replayMode = !replayMode;
  if (replayMode) {
    replayCam._fromPos.copy(camera.position);
    replayCam._fromYaw = player.yaw;
    replayCam._fromPitch = player.pitch;
  } else {
    camera.position.copy(replayCam._fromPos);
    camera.rotation.order = 'YXZ';
    camera.rotation.set(replayCam._fromPitch, replayCam._fromYaw, 0);
  }
  applyReplayMode();
  return replayMode;
}

function updateReplayCamera(dt) {
  const kb = getKeybinds();
  const fwd = (input.keys[kb.forward] ? 1 : 0) - (input.keys[kb.back] ? 1 : 0);
  const strafe = (input.keys[kb.right] ? 1 : 0) - (input.keys[kb.left] ? 1 : 0);
  const up = (input.keys[kb.jump] ? 1 : 0) - (input.keys[kb.sprint] ? 1 : 0);
  const fx = -Math.sin(replayCam.yaw), fz = -Math.cos(replayCam.yaw);
  const rx = Math.cos(replayCam.yaw), rz = -Math.sin(replayCam.yaw);
  let mx = fx * fwd + rx * strafe;
  let mz = fz * fwd + rz * strafe;
  const len = Math.hypot(mx, mz);
  if (len > 0) { mx /= len; mz /= len; }
  const spd = replayCam.speed * dt;
  replayCam.pos.x += mx * spd;
  replayCam.pos.z += mz * spd;
  replayCam.pos.y += up * spd;
  const badge = document.getElementById('replay-badge');
  if (badge) badge.textContent = 'REPLAY \u00d7' + (Math.round(replayCam.speed * 10) / 10);
}

// --- saplings ---
// Planted saplings waiting to grow into trees: key "x,y,z" -> seconds elapsed.
const _saplingGrowth = new Map();
let _saplingTickTimer = 0;
const SAPLING_GROWTH_TIME = 45; // seconds for a naturally-grown tree

function isSaplingBlock(id) {
  return id === BLOCK.OAK_SAPLING || id === BLOCK.JUNGLE_SAPLING || id === BLOCK.BIRCH_SAPLING ||
         id === BLOCK.SPRUCE_SAPLING || id === BLOCK.DARK_OAK_SAPLING || id === BLOCK.ACACIA_SAPLING;
}

const _LOG_IDS = new Set([BLOCK.WOOD, BLOCK.JUNGLE_WOOD, BLOCK.BIRCH_WOOD, BLOCK.SPRUCE_WOOD, BLOCK.DARK_OAK_WOOD, BLOCK.ACACIA_WOOD]);
const _LEAF_IDS = new Set([BLOCK.LEAVES, BLOCK.DARK_OAK_LEAVES, BLOCK.BIRCH_LEAVES, BLOCK.SPRUCE_LEAVES, BLOCK.ACACIA_LEAVES]);
function isLogBlock(id) { return _LOG_IDS.has(id); }
function isLeafBlock(id) { return _LEAF_IDS.has(id); }

function _tickLeafDecay(dt) {
  if (_leafDecayPositions.size === 0) return;
  _leafDecayTimer += dt;
  if (_leafDecayTimer < 1.5) return;
  _leafDecayTimer = 0;
  const positions = _leafDecayPositions;
  _leafDecayPositions = new Set();
  let changed = false;
  for (const key of positions) {
    const parts = key.split(',');
    const bx = +parts[0], by = +parts[1], bz = +parts[2];
    for (let dx = -4; dx <= 4; dx++) {
      for (let dy = -4; dy <= 4; dy++) {
        for (let dz = -4; dz <= 4; dz++) {
          if (Math.abs(dx) + Math.abs(dy) + Math.abs(dz) > 4) continue;
          const lx = bx + dx, ly = by + dy, lz = bz + dz;
          const lb = world.getBlock(lx, ly, lz);
          if (!isLeafBlock(lb)) continue;
          let hasLog = false;
          for (let ddx = -4; ddx <= 4 && !hasLog; ddx++) {
            for (let ddy = -4; ddy <= 4 && !hasLog; ddy++) {
              for (let ddz = -4; ddz <= 4 && !hasLog; ddz++) {
                if (Math.abs(ddx) + Math.abs(ddy) + Math.abs(ddz) > 4) continue;
                if (isLogBlock(world.getBlock(lx + ddx, ly + ddy, lz + ddz))) hasLog = true;
              }
            }
          }
          if (!hasLog && Math.random() < 0.3) {
            world.setBlock(lx, ly, lz, BLOCK.AIR);
            changed = true;
          }
        }
      }
    }
  }
  if (changed && manager) {
    const pcx = Math.floor((player ? player.position.x : 0) / CHUNK_SIZE);
    const pcz = Math.floor((player ? player.position.z : 0) / CHUNK_SIZE);
    manager.refreshAround(pcx, pcz);
  }
}

// --- weather system ---
let weatherSystem = null;



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
  // Solar model: dayTime 0 = sunrise, 0.3125 = noon (sun highest),
  // 0.625 = sunset, 0.8125 = midnight, 1.0 = sunrise again.
  // Map to a 24h clock with sunrise ≈ 4:30, noon = 12:00, sunset ≈ 19:30,
  // midnight = 00:00 (offset of 270 mins = 4h30 from the raw dayTime * 24h).
  const totalMins = (dayTime * 24 * 60 + 270) % (24 * 60);
  const hrs = Math.floor(totalMins / 60) % 24;
  const mins = Math.floor(totalMins % 60);
  const timeStr = `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  const isDay = dayTime < 0.625;
  const icon = isDay ? '☀' : '☾';
  const color = isDay ? '#ffe080' : '#a0c0ff';
  const html = `<span style="color:${color}">${icon}</span> Day ${totalDays} &middot; ${timeStr}`;
  // Only touch the DOM when the text actually changes (minute rollover) —
  // innerHTML every frame is a major layout cost on the main thread.
  if (el._lastHtml !== html) {
    el._lastHtml = html;
    el.innerHTML = html;
  }
}
const _lerpA = new THREE.Color();
const _lerpB = new THREE.Color();
const _lerpResult = new THREE.Color();
const _nightColor = new THREE.Color();
const _whiteColor = new THREE.Color(0xffffff);
const _rainFog = new THREE.Color(0x8899aa);
const _sunPos = new THREE.Vector3();
const _cSunrise = new THREE.Color(0xff4400);
const _cDaySun = new THREE.Color(0xfff5e0);
const _cAmbSunrise = new THREE.Color(0x884422);
const _cAmbDay = new THREE.Color(0x667799);
const _cHemiSunrise = new THREE.Color(0xbb7733);
const _cHemiDay = new THREE.Color(0x88bbff);
const _cSunset = new THREE.Color(0xff4400);
const _cDusk = new THREE.Color(0x220022);
const _cAmbDusk = new THREE.Color(0x111122);
const _cAmbSunset = new THREE.Color(0x884422);
const _cHemiDusk = new THREE.Color(0x111133);
const _cHemiSunset = new THREE.Color(0xbb7733);
const _cOrange = new THREE.Color(0xff8800);
const _cMoonLight = new THREE.Color(0x8899cc);
const _cAmbNight = new THREE.Color(0x334466);
const _cHemiNight = new THREE.Color(0x5566aa);
let _lastSinA = 0;
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

  // Night ambient cricket sounds (dayTime > 0.625 = after sunset, before sunrise)
  if (dayTime > 0.625 && audio && !audio._musicPlaying) {
    if (!_cricketTimer) _cricketTimer = 0;
    _cricketTimer -= dt;
    if (_cricketTimer <= 0) {
      audio.cricket();
      _cricketTimer = 2 + Math.random() * 5; // chirp every 2-7 seconds
    }
  }

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
  _lastSinA = sinA;
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
    skyColor = cosA > 0
      ? lerpColor(DUSK_COLOR, DAWN_COLOR, t)     // rising
      : lerpColor(DAWN_COLOR, DUSK_COLOR, 1 - t); // setting
  } else if (sinA > -0.15) {
    // Twilight zone near horizon
    const t = (sinA + 0.15) / 0.15;
    skyColor = lerpColor(NIGHT_COLOR, DUSK_COLOR, t);
  } else {
    // Deep night — dark navy (never pure black, matching Minecraft's sky).
    skyColor = _nightColor.set(NIGHT_COLOR);
  }

  scene.background.copy(skyColor);
  scene.fog.color.copy(skyColor);

  // Weather: darken sky during rain (the fog override below reuses whatever
  // scene.background became here, so rain tint survives).
  if (weatherSystem) {
    const ri = weatherSystem.getRainIntensity();
    if (ri > 0.01) {
      const d = 1 - ri * 0.3;
      scene.background.multiplyScalar(d);
      scene.fog.color.multiplyScalar(d);
    }
    const tf = weatherSystem.getThunderFlash();
    if (tf > 0.01) {
      scene.background.lerp(_whiteColor, tf * 0.6);
      scene.fog.color.lerp(_whiteColor, tf * 0.6);
    }
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

  const sunBaseX = player ? player.position.x : 0;
  const sunBaseZ = player ? player.position.z : 0;
  sun.position.set(Math.cos(angle) * 500 + sunBaseX, Math.sin(angle) * 500, Math.sin(angle * 0.7) * 200 + sunBaseZ);

  // Smooth sun position for shadow calculations (reduces jitter when teleporting)
  if (_sunPos.length() === 0) _sunPos.copy(sun.position);
  _sunPos.lerp(sun.position, 0.1);

  // Golden hour: boost warmth when sun is near the horizon
  const nearHorizon = Math.abs(sinA) < 0.3;
  const goldenBoost = nearHorizon ? 1.0 + (0.5 * (1 - Math.abs(sinA) / 0.3)) : 1.0;

  // dayAmt 1 = full daylight, 0 = deep night. Every light below is driven from
  // this single value (plus the sun angle), so the world can never desync from
  // the sky or get stuck black after a night that wasn't skipped.
  const dayAmt = Math.max(0, Math.min(1, (sinA + 0.15) / 0.3));
  const nightAmt = 1 - dayAmt;

  // Moonlight — the sun fades out at night and the moon takes over, keeping a
  // cool blue cast on terrain instead of pitch black.
  sun.intensity = Math.max(0, sinA) * 2.0 * goldenBoost;
  moonLight.intensity += (0.38 * nightAmt - moonLight.intensity) * Math.min(1, dt * 4);
  moonLight.color.copy(_cMoonLight);
  moonMesh.position.set(-Math.cos(angle) * 500 + sunBaseX, -Math.sin(angle) * 500, -Math.sin(angle * 0.7) * 200 + sunBaseZ);
  moonLight.position.set(moonMesh.position.x, moonMesh.position.y, moonMesh.position.z);
  moonLight.target.position.set(sunBaseX, player ? player.position.y : 0, sunBaseZ);

  // Ambient / hemisphere: always keep a moonlit floor on at night. These are
  // only ever lerped toward targets (never hard-clamped), so daylight always
  // returns smoothly after a natural night.
  const targetAmbientI = 0.06 + dayAmt * 0.42 + nightAmt * 0.26;
  const targetHemiI = 0.04 + dayAmt * 0.18 + nightAmt * 0.12;
  ambient.intensity += (targetAmbientI - ambient.intensity) * Math.min(1, dt * 5);
  hemi.intensity += (targetHemiI - hemi.intensity) * Math.min(1, dt * 5);

  if (sinA > 0.3) {
    sun.color.setHex(0xfff5e0);
    ambient.color.setHex(0x667799);
    hemi.color.setHex(0x88bbff);
  } else if (sinA > 0.05) {
    const t = (sinA - 0.05) / 0.25;
    sun.color.lerpColors(_cSunrise, _cDaySun, t);
    ambient.color.lerpColors(_cAmbSunrise, _cAmbDay, t);
    hemi.color.lerpColors(_cHemiSunrise, _cHemiDay, t);
    // Golden hour orange shift for sun color
    if (nearHorizon) {
      const warmth = 1 - Math.abs(sinA) / 0.3;
      sun.color.lerp(_cOrange, warmth * 0.4);
    }
  } else if (sinA > -0.05) {
    sun.color.lerpColors(_cDusk, _cSunset, (sinA + 0.05) / 0.1);
    ambient.color.lerpColors(_cAmbDusk, _cAmbSunset, (sinA + 0.05) / 0.1);
    hemi.color.lerpColors(_cHemiDusk, _cHemiSunset, (sinA + 0.05) / 0.1);
  } else {
    // Deep night — cool moonlit colors, far from black.
    sun.color.copy(_cMoonLight);
    ambient.color.copy(_cAmbNight);
    hemi.color.copy(_cHemiNight);
  }
  // Darken ambient light during rain
  if (weatherSystem) {
    const ri = weatherSystem.getRainIntensity();
    if (ri > 0.5) {
      const t = (ri - 0.5) / 0.5;
      ambient.intensity *= (1 - t * 0.4);
    }
  }
  sunMesh.position.copy(sun.position);
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
  // Tear down previous game (always, even if gameRunning=false from menu nav)
  if (manager || mobManager || playerModel || droppedItemManager || world) {
    const prevParkour = isParkour;
    isParkour = false;
    isOneBlock = false;
    isBedwars = false;
    isSkyblock = false;
    clearOneBlockState();
    clearSkyblock();
    clearLiquid();
    const _obHud = document.getElementById('oneblock-hud');
    if (_obHud) _obHud.remove();
    bwGameOver = false;
    bwWinTeamKey = null;
    bwSpec = false;
    bwMap = null;
    bwGens = [];
    bwBeds = {};
    bwMyTeamKey = null;
    bwMyTeam = null;
    bwHudEl = null;
    if (prevParkour) {
      document.getElementById('status-bars').style.display = '';
      { const _ar = document.getElementById('armor-row'); if (_ar) _ar.style.display = ''; }
    }
    _isImportedParkour = false;
    _importedParkourData = null;
    if (player) saveCurrentWorld();
    manager?.clear?.();
    if (mobManager) { mobManager.clear(); mobManager = null; }
    if (explosionManager) { explosionManager.clear(); explosionManager = null; }
    if (playerModel) { playerModel.dispose(); playerModel = null; }
    if (weatherSystem) { weatherSystem.clear(); weatherSystem = null; }
    if (droppedItemManager) { droppedItemManager.clear(); droppedItemManager = null; }
    if (tntManager) { tntManager.clear(); tntManager = null; }
    if (mpRenderer) { mpRenderer.clear(); mpRenderer = null; }
    if (voiceChat) { voiceChat.stop(); voiceChat = null; }
    if (breakParticles) { breakParticles.clear(); breakParticles = null; }
    if (ambientParticles) { ambientParticles.clear(); ambientParticles = null; }
    if (cloudSystem) { cloudSystem.clear(); cloudSystem = null; }
  if (_portalOrbs.length) { _portalOrbs.forEach(o => o.dispose()); _portalOrbs = []; }
  if (_portalRings.length) { _portalRings.forEach(r => r.dispose()); _portalRings = []; }
  _clearPortalBeam();
  }

  isParkour = !!opts.parkour;
  isOneBlock = !!opts.oneblock;
  isBedwars = !!opts.bedwars;
  isBlockZones = !!opts.blockzones;
  isNights = !!opts.nights;
  isGunAffair = !!opts.gunaffair;
  isSkyblock = !!opts.skyblock;
  _isImportedParkour = !!opts.importedParkour;
  currentWorldId = worldId;
  // Cheats are a world-gen-only choice. Dev/creative worlds default to on,
  // minigames/imported courses default to off, solo worlds honour the flag.
  cheatsEnabled = isDevWorld
    ? true
    : (isParkour || isOneBlock || isBedwars || isBlockZones || isNights || isGunAffair || isSkyblock)
      ? false
      : opts.cheats !== false;
  renderDist = parseInt(document.getElementById('set-render-distance')?.value) || (VERY_LOW_END ? 4 : (LOW_END ? 5 : 7));
  graphicsQuality = document.getElementById('set-quality')?.value || 'medium';
  // Mobile / low-end: hard-cap view distance so the GPU/CPU isn't meshing far chunks.
  if (IS_MOBILE) renderDist = Math.min(renderDist, 5);
  if (LOW_END) renderDist = Math.min(renderDist, 6);
  if (VERY_LOW_END) renderDist = Math.min(renderDist, 4);
  applyGraphicsQuality();
  gameDifficulty = difficulty || 'normal';

  world = new World(seed, { flat: !!opts.flat, void: !!opts.void || !!opts.bedwars || !!opts.skyblock, parkour: !!opts.parkour, amplified: !!opts.amplified, weird: !!opts.weird });
  ui.world = world;
  const saved = (!isParkour && !isOneBlock && !isBedwars && !isSkyblock) ? loadWorld(worldId) : (isOneBlock ? loadWorld(worldId) : null);
  if (saved) world.loadEdits(saved);

  // The Shattered Echo dimension is part of every world (Nether-style), not a
  // world type: the main world is always the overworld, and the dimension is
  // generated lazily the first time the player steps through a Void portal.
  // Parkour courses and multiplayer rooms keep the single-world behaviour.
  _isDimensionMode = !isParkour && !isOneBlock && !isBedwars && !isBlockZones && !isNights && !isGunAffair && !isSkyblock && !_isImportedParkour && !network.isInRoom();
  _activeDimension = 'overworld';
  _dimensionOverworld = world;
  _dimensionTarget = null;
  _dimensionSeed = seed;
  _overworldSpawnPos = null;
  _dimensionSpawnPos = null;
  _pendingDimensionLoad = null;
  // Load saved edits: legacy dimension-type saves store overworld + dimension separately.
  if (saved && saved.dimensionEdits) {
    _pendingDimensionLoad = { seed, edits: saved.dimensionEdits, chests: saved.dimensionChests, furnaces: saved.dimensionFurnaces };
    if (saved.edits == null && saved.overworldEdits) {
      world.loadEdits({ seed, edits: saved.overworldEdits, chests: saved.overworldChests, furnaces: saved.overworldFurnaces });
    }
  }
  manager = new ChunkMeshManager(scene, world, atlasTexture, scene.fog.color);
  loader = new ChunkLoader(world, manager, renderDist);
  explosionManager = new ExplosionManager(scene, world, audio);
  mobManager = new MobManager(scene, world, audio, explosionManager);
  mobManager._refreshFn = (bx, by, bz) => {
    if (manager) manager.refreshAround(Math.floor(bx / CHUNK_SIZE), Math.floor(bz / CHUNK_SIZE));
  };
  mobManager.networkSend = {
    sendMobSpawn: (id, type, x, y, z) => network.sendMobSpawn(id, type, x, y, z),
    sendMobPosition: (id, x, y, z, yaw) => network.sendMobPosition(id, x, y, z, yaw),
    sendMobDeath: (id) => network.sendMobDeath(id),
  };
  // All mob deaths funnel through MobManager, so this is the single loot-drop
  // point — visible world items the player auto-collects on approach.
  mobManager.onMobDeath = (mob) => {
    if (!droppedItemManager || !mob) return;
    for (const drop of mob.getDrops()) {
      droppedItemManager.drop(drop.item, drop.count, mob.position.x, mob.position.y + 0.5, mob.position.z);
    }
  };
  droppedItemManager = new DroppedItemManager(scene, atlasCanvas, world);
  tntManager = new LitTntManager(scene, atlasCanvas, world, explosionManager);
  tntManager.onExplode = (x, y, z) => {
    // Damage player if nearby
    if (player) {
      const dmg = ExplosionManager.calcDamage(x + 0.5, y + 0.5, z + 0.5, player.position, 4);
      if (dmg > 0) player.takeDamage(dmg, { x: x + 0.5, y: y + 0.5, z: z + 0.5 });
      if (playerModel) playerModel.triggerHurt();
    }
  };
  mpRenderer = new MultiplayerRenderer(scene);
  breakParticles = new BreakParticles(scene);
  ambientParticles = new AmbientParticles(scene);
  cloudSystem = new CloudSystem(scene);
  weatherSystem = new WeatherSystem(scene);
  playerModel = new PlayerModel(scene, getSelectedSkin(), atlasCanvas);
  { const sk = getSelectedSkin(); viewmodel.setSkinColor(sk?.skin, sk?.skin2); }

  scene.fog.far = 16 * (renderDist + 2);
  scene.fog.near = 16 * 5;

  // Apply FOV and volume at world load
  baseFov = parseInt(document.getElementById('set-fov')?.value) || 70;
  camera.fov = baseFov;
  camera.updateProjectionMatrix();
  showFps = (document.getElementById('set-fps')?.value || '1') !== '0';
  const vol = parseInt(document.getElementById('set-volume')?.value) || 50;
  if (audio && audio.master) audio.master.gain.value = Math.max(0, Math.min(100, vol)) / 100;

  player = new Player(camera, world, world.seed);
  if (player) {
    player.difficulty = gameDifficulty;
    player.onHurt = () => { if (audio) audio.playerHurt(); };
    player.onDeath = () => { if (audio) audio.playerDie(); };
    player.onLand = () => {
      if (audio) audio.land();
      // Spawn dust particles on landing
      if (player && world && breakParticles) {
        const px = Math.floor(player.position.x);
        const py = Math.floor(player.position.y - 0.5);
        const pz = Math.floor(player.position.z);
        for (let i = 0; i < 6; i++) {
          const ox = (Math.random() - 0.5) * 1.2;
          const oz = (Math.random() - 0.5) * 1.2;
          breakParticles.spawn(px + ox + 0.5, py + 0.1, pz + oz + 0.5, 0x9e8e7a, 0.3 + Math.random() * 0.3);
        }
      }
    };
    player.onSplash = () => { if (audio) audio.splash(); };
    player.onJump = () => { if (audio) audio.jump(); };
  }

  // Shared place/interact logic. `hit` may be null (use crosshair center target).
  function mobilePlaceAt(hit) {
    const target = hit || currentTarget();
    const held = player.inventory.getSelected();
    if (held && SPAWN_EGG_MOBS[held.item]) {
      if (target && mobManager) {
        const mobType = SPAWN_EGG_MOBS[held.item];
        mobManager.spawnAt(mobType, target.nx + 0.5, target.ny, target.nz + 0.5);
        audio.play('place_stone', 0.5);
        if (!player.isCreative()) {
          held.count--;
          if (held.count <= 0) player.inventory.slots[player.inventory.selected] = null;
        }
        syncUIMode();
        return;
      }
    }
    if (target && isCraftingTable(target.block)) {
      if (isBedwars) { openBedwarsShop(); return; }
      ui.openInventory(player.inventory, 3, false);
      achievements.incrementStat('inventoryOpened');
    } else if (target && target.block === BLOCK.FURNACE) {
      ui.openFurnace(player.inventory, target.x, target.y, target.z);
    } else if (target && target.block === BLOCK.CHEST) {
      const slots = world.getOrCreateChest(target.x, target.y, target.z);
      ui.openChest(slots, player.inventory, target.x, target.y, target.z);
    } else if (target && (target.block === BLOCK.BED || target.block === BLOCK.BED_FOOT)) {
      trySleep();
    } else if (target && (target.block === BLOCK.OAK_DOOR || target.block === BLOCK.IRON_DOOR)) {
      const doorKey = `${target.x},${target.y},${target.z}`;
      const state = doorStates.get(doorKey);
      if (state) {
        world.setBlock(target.x, target.y, target.z, state.blockId);
        doorStates.delete(doorKey);
      } else {
        doorStates.set(doorKey, { blockId: target.block });
        world.setBlock(target.x, target.y, target.z, BLOCK.AIR);
      }
      manager.refreshAround(Math.floor(target.x / CHUNK_SIZE), Math.floor(target.z / CHUNK_SIZE));
    } else if (target && target.block === BLOCK.LEVER) {
      const leverKey = `${target.x},${target.y},${target.z}`;
      const existing = redstoneStates.get(leverKey);
      if (existing && existing.expiresAt === Infinity) {
        redstoneStates.delete(leverKey);
        greenstoneSystem.clearPower(target.x, target.y, target.z);
      } else {
        redstoneStates.set(leverKey, { blockId: target.block, expiresAt: Infinity });
        greenstoneSystem.setPower(target.x, target.y, target.z, 15);
      }
    } else if (target && target.block === BLOCK.STONE_BUTTON) {
      const btnKey = `${target.x},${target.y},${target.z}`;
      if (!redstoneStates.has(btnKey)) {
        redstoneStates.set(btnKey, { blockId: target.block, expiresAt: performance.now() + 1500 });
        greenstoneSystem.setPower(target.x, target.y, target.z, 15);
      }
    } else {
      let used = false;
      const slot = player.inventory.getSelected();
      if (slot && (slot.item === ITEM.BUCKET || slot.item === ITEM.WATER_BUCKET || slot.item === ITEM.LAVA_BUCKET)) {
        if (handleBucket(slot, target)) used = true;
      }
      if (slot && slot.item === ITEM.PORTAL_ORB) {
        const isSneaking = !!(player && player.crouching);
        throwPortalOrb(isSneaking ? 'portal' : 'warp');
        if (player.isSurvival()) {
          slot.count--;
          if (slot.count <= 0) player.inventory.slots[player.inventory.selected] = null;
          syncUIMode();
        }
        used = true;
      }
      if (slot && slot.item === ITEM.BONE_MEAL) {
        if (useBoneMeal(target)) {
          if (player.isSurvival()) {
            slot.count--;
            if (slot.count <= 0) player.inventory.slots[player.inventory.selected] = null;
            syncUIMode();
          }
          used = true;
        }
      }
      if (!used && player.isSurvival() && slot && isFood(slot.item)) {
        if (player.eat(foodValue(slot.item))) {
          slot.count--;
          if (slot.count <= 0) player.inventory.slots[player.inventory.selected] = null;
          syncUIMode();
          achievements.incrementStat('foodEaten');
          if (slot.item === ITEM.PORKCHOP_COOKED) achievements.incrementStat('foodEatenPorkchop');
          if (audio) audio.eat();
          used = true;
        }
      } else if (slot && isPlaceableBlockItem(slot.item)) {
        placeBlock(slot, target);
        used = true;
      }
      if (!used && player.inventory.offhand) {
        const oh = player.inventory.offhand;
        if (oh.item === ITEM.BONE_MEAL) {
          if (useBoneMeal(target)) {
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
            if (audio) audio.eat();
          }
        } else if (isPlaceableBlockItem(oh.item)) {
          placeBlock(oh, target);
        }
      }
    }
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
      // Traveler trade: check mob hit first (mobile)
      if (mobManager && player) {
        const tdir = new THREE.Vector3();
        camera.getWorldDirection(tdir);
        const mobHit = mobManager.hitTest(camera.position, tdir, REACH);
        if (mobHit && mobHit.type === 'traveler' && !mobHit.dead) {
          openTravelerTrade(mobHit);
          return;
        }
      }
      mobilePlaceAt(null);
    },
    onPlaceTap(x, y) {
      // Quick tap on the world = place a block / interact (Bedrock-style),
      // targeting the block under the finger instead of the crosshair center.
      if (!gameRunning) return;
      audio.resume();
      // Traveler trade: check the tapped mob first
      if (mobManager && player) {
        const { origin, dir } = screenRay(x, y);
        const mobHit = mobManager.hitTest(origin, dir, REACH);
        if (mobHit && mobHit.type === 'traveler' && !mobHit.dead) {
          openTravelerTrade(mobHit);
          return;
        }
      }
      const hit = screenTarget(x, y);
      mobilePlaceAt(hit);
    },
    onAim(x, y) {
      mobileAimPoint = { x, y };
    },
    onAimEnd() {
      mobileAimPoint = null;
    },
    onAttack(x, y) {
      // Returns true if the tap hit a mob (so it's an attack, not a break).
      if (!gameRunning || !mobManager || !player) return false;
      const { origin, dir } = screenRay(x, y);
      const mobHit = mobManager.hitTest(origin, dir, REACH);
      if (!mobHit) return false;
      // A short tap on an interactable (peaceful trader) should OPEN it, not
      // hit it. Longer holds still break/attack via the camera-zone logic.
      if (mobHit.type === 'traveler' && !mobHit.dead) {
        openTravelerTrade(mobHit);
        return true;
      }
      const atkSlot = player.inventory.getSelected();
      const atkTool = atkSlot && isTool(atkSlot.item) ? toolInfo(atkSlot.item) : null;
      const attackDamage = atkTool ? atkTool.swordDmg || 1 : 1;
      const crit = isCriticalHit();
      const finalDmg = crit ? Math.ceil(attackDamage * 1.5) : attackDamage;
      mobHit.takeDamage(finalDmg, camera.position);

      // Dragon Blade: area damage to nearby mobs
      if (atkSlot && atkSlot.item === ITEM.DRAGON_BLADE) {
        for (const otherMob of mobManager.mobs) {
          if (otherMob === mobHit || otherMob.dead) continue;
          const dx = otherMob.position.x - mobHit.position.x;
          const dy = otherMob.position.y - mobHit.position.y;
          const dz = otherMob.position.z - mobHit.position.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < 4) {
            const splashDmg = Math.ceil(finalDmg * 0.6);
            otherMob.takeDamage(splashDmg, camera.position);
            mobManager.playHurtSound(otherMob.type);
            // Loot + removal handled centrally by MobManager.onMobDeath
          }
        }
        // Dragon Blade fire particle effect
        spawnDragonBladeParticles(mobHit.position);
      }

      if (crit) spawnCritParticles(mobHit.position);
      viewmodel.swing();
      mobManager.playHurtSound(mobHit.type);
      if (mobHit.type === 'spider' || mobHit.type === 'zombie' || mobHit.type === 'skeleton' || mobHit.type === 'blower' || mobHit.type === 'portalman') mobHit.aggro = true;
      if (mobHit.dead) {
        // Loot + removal handled centrally by MobManager.onMobDeath
        if (player.isSurvival()) {
          const mobXp = { cow: 3, pig: 3, sheep: 3, spider: 5, zombie: 5, skeleton: 5, blower: 8, portalman: 10 };
          const mobXpGain = mobXp[mobHit.type] || 2;
          if (player.addXp(mobXpGain)) { ui.showLevelUp(player.level); if (audio) audio.xpOrb(); }
        }
      }
      return true;
    },
    onPause() {
      if (!gameRunning || !ui) return;
      try {
        if (ui.isOverlayShown() || ui.inventoryOpen || ui.furnaceOpen) return;
        refreshDevPauseBtn();
        ui.showMenu('pause');
        cgGameplayStop();
      cgClearGameContext();
      } catch (e) { console.warn("onPause error", e); }
    },
    onChat() {
      if (!gameRunning || chatDisabled) return;
      try { openChat(''); } catch (e) { console.warn("onChat error", e); }
    },
    onInventory() {
      if (!gameRunning || !player || !ui) return;
      try {
        if (ui.inventoryOpen) { ui.closeInventory(); syncUIMode(); }
        else { ui.openInventory(player.inventory, 2, player.isCreative()); achievements.incrementStat('inventoryOpened'); }
      } catch (e) { console.warn("onInventory error", e); }
    },
    onDrop() {
      if (!gameRunning || !player || !player.inventory) return;
      try {
        const slot = player.inventory.getSelected();
        if (slot) {
          if (droppedItemManager) {
            const throwSpeed = 3.5;
            const tvx = -Math.sin(player.yaw) * throwSpeed + (Math.random() - 0.5) * 0.6;
            const tvz = -Math.cos(player.yaw) * throwSpeed + (Math.random() - 0.5) * 0.6;
            droppedItemManager.drop(slot.item, 1, player.position.x, player.position.y + 1, player.position.z, tvx, tvz);
          }
          slot.count--;
          if (slot.count <= 0) player.inventory.slots[player.inventory.selected] = null;
          syncUIMode();
        }
      } catch (e) { console.warn("onDrop error", e); }
    },
    onSwapHands() {
      if (!gameRunning || !player || !player.inventory) return;
      try {
        const sel = player.inventory.selected;
        const curSlot = player.inventory.slots[sel];
        const offhand = player.inventory.offhand;
        if (curSlot || offhand) {
          player.inventory.slots[sel] = offhand || null;
          player.inventory.offhand = curSlot || null;
          syncUIMode();
        }
      } catch (e) { console.warn("onSwapHands error", e); }
    },
    onPerspective() {
      if (!gameRunning || !player) return;
      try {
        player.cycleCamera();
        const modes = ['First Person', 'Third Person (Behind)', 'Third Person (Front)'];
        if (ui && ui.itemNameEl) {
          ui.itemNameEl.textContent = modes[player.cameraMode];
          ui.itemNameEl.classList.add('visible');
        }
        _itemNameTimer = 1.5;
      } catch (e) { console.warn("onPerspective error", e); }
    },
    onCommand() {
      if (!gameRunning || chatDisabled) return;
      try { openChat('/'); } catch (e) { console.warn("onCommand error", e); }
    },
    onVoice() {
      if (!gameRunning || !voiceChat || isOnCrazyGames()) return;
      try { voiceChat.togglePanel(); } catch (e) { console.warn("onVoice error", e); }
    },
    onExit() {
      if (!gameRunning) return;
      try {
        if (ui && typeof ui.hidePause === 'function') ui.hidePause();
        if (typeof saveCurrentWorld === 'function') saveCurrentWorld();
        cgGameplayStop();
      cgClearGameContext();
        if (isMultiplayer && network && typeof network.leaveRoom === 'function') network.leaveRoom();
        try { window.CrazyGames?.SDK?.game?.setRoom?.(null); } catch (_) { console.warn("CG SDK setRoom failed"); }
        if (isMultiplayer) {
          showMultiplayerMenu();
        } else if (isParkour || isOneBlock || isBedwars || isBlockZones || isNights || isGunAffair || isSkyblock) {
          if (typeof showMinigames === 'function') showMinigames();
        } else {
          if (typeof showWorldList === 'function') showWorldList();
        }
      } catch (e) { console.warn("onExit error", e); }
    },
    onF3() {
      if (!gameRunning) return;
      try {
        const dbg = document.getElementById('debug-overlay');
        if (dbg) dbg.style.display = dbg.style.display === 'none' ? '' : 'none';
      } catch (e) { console.warn("onF3 error", e); }
    },
    onDoubleTap() {
      if (!gameRunning) return;
      // Double-tap to equip: swap current hotbar item with offhand
      const sel = player.inventory.selected;
      const curSlot = player.inventory.slots[sel];
      const offhand = player.inventory.offhand;
      if (curSlot || offhand) {
        player.inventory.slots[sel] = offhand || null;
        player.inventory.offhand = curSlot || null;
        syncUIMode();
      }
    },
    onModeChange(isMobileMode) {
      // Hybrid devices: switching to mobile releases pointer lock; switching
      // back to PC re-locks it (if a game is running and no overlay is up).
      if (isMobileMode) {
        if (document.pointerLockElement) document.exitPointerLock?.();
        pointerLocked = false;
        if (ui.isOverlayShown()) return;
      } else {
        if (gameRunning && !ui.isOverlayShown() && !pointerLocked) lockPointer();
      }
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
      const mpBed = loadMultiplayerBedSpawn(currentWorldId, playerName);
      if (mpBed) bedSpawnPoint = mpBed;
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
    if (world.dimension) {
      player.spawnDimension();
    } else {
      player.position.set(0.5, 6, 0.5);
      player.velocity.set(0, 0, 0);
      player.spawnPoint.set(0.5, 6, 0.5);
    }
  }

  // ── Parkour mode ───
  let parkourLoadPromise = null;
  if (isParkour) {
    player.setGamemode('adventure');
    if (mobManager) { mobManager.clear(); }
    dayTime = 0.3;
    if (weatherSystem) { weatherSystem.setState('clear'); }
    if (player.inventory) {
      player.inventory.slots.fill(null);
      player.inventory.offhand = null;
    }

    parkourLoadPromise = (async () => {
      if (_isImportedParkour) {
        // Load imported Minecraft parkour map from binary
        try {
          const mapUrl = assetBase() + 'parkour-chunks.bin.gz';
          const data = await loadImportedParkourChunks(mapUrl);
          const spawn = buildImportedParkour(world, data);
          data.spawnPos = spawn;
          _importedParkourData = data;
          resetParkourState();
          player.position.set(spawn.x, spawn.y, spawn.z);
          player.velocity.set(0, 0, 0);
          player.spawnPoint.set(spawn.x, spawn.y, spawn.z);
          startParkourTimer();
          addChatLine('Welcome to 100 Levels! Climb the spiral tower to the top!', '#0ff');
        } catch (e) {
          console.error('[Parkour] Failed to load imported map:', e);
          addChatLine('Parkour map loading failed. Falling back to procedural levels.', '#f55');
          _isImportedParkour = false;
          const PARKOUR_Y = 200;
          resetParkourState();
          _parkourLevelEnds = buildAllLevels(world, 0, PARKOUR_Y, -12);
          player.position.set(0.5, PARKOUR_Y + 2, 0.5);
          player.velocity.set(0, 0, 0);
          player.spawnPoint.set(0.5, PARKOUR_Y + 2, 0.5);
          startParkourTimer();
        }
      } else {
        // Build procedural parkour levels in a clean void world
        const PARKOUR_Y = 200;
        resetParkourState();
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
      _parkourDeathsEl = document.getElementById('parkour-deaths');
      if (!_parkourTimerEl) {
        const hud = document.createElement('div');
        hud.id = 'parkour-hud';
        hud.style.cssText = 'position:fixed;top:10px;right:10px;z-index:100;pointer-events:none;text-align:right;font-family:monospace;';
        hud.innerHTML = '<div id="parkour-level" style="font:bold 14px monospace;color:#ff0;text-shadow:0 1px 3px #000;"></div><div id="parkour-timer" style="font:bold 18px monospace;color:#fff;text-shadow:0 1px 3px #000;"></div><div id="parkour-deaths" style="font:bold 12px monospace;color:#f88;text-shadow:0 1px 3px #000;margin-top:2px;">Deaths: 0</div>';
        document.body.appendChild(hud);
        _parkourTimerEl = document.getElementById('parkour-timer');
        _parkourLevelEl = document.getElementById('parkour-level');
        _parkourDeathsEl = document.getElementById('parkour-deaths');
      }
    })();
  }

  // ── OneBlock minigame setup ──────────────────────────────────────
  if (isOneBlock && world && player) {
    player.setGamemode('survival');
    if (mobManager) { mobManager.clear(); }
    dayTime = 0.35;
    if (weatherSystem) { weatherSystem.setState('clear'); }

    // Build the tiny arena: a bedrock pedestal with the OneBlock on top.
    const obX = 0, obY = 201, obZ = 0;
    for (let dx = -1; dx <= 1; dx++) {
      for (let dz = -1; dz <= 1; dz++) {
        world.setBlock(obX + dx, 200, obZ + dz, BLOCK.BEDROCK);
        world.setBlock(obX + dx, 199, obZ + dz, BLOCK.BEDROCK);
      }
    }
    for (let dx = -2; dx <= 2; dx++) world.setBlock(obX + dx, 198, obZ + 2, BLOCK.TORCH);

    // Restore a saved OneBlock world (progress + inventory + position).
    const obSave = (saved && saved.oneblock) ? saved.oneblock : null;
    if (obSave && obSave.count != null) {
      restoreOneBlock(world, obSave);
      if (player.inventory) {
        player.inventory.slots.fill(null);
        player.inventory.offhand = null;
        if (obSave.inventory) player.inventory.deserialize(obSave.inventory);
        else {
          player.inventory.add(ITEM.STONE_PICKAXE, 1);
          player.inventory.add(ITEM.WOOD_SWORD, 1);
        }
        syncUIMode();
      }
      if (obSave.pos && Array.isArray(obSave.playerPos) && obSave.playerPos.length === 3) {
        player.position.set(obSave.playerPos[0], obSave.playerPos[1], obSave.playerPos[2]);
      } else {
        player.position.set(obX + 0.5, obY + 1, obZ + 0.5);
      }
      player.velocity.set(0, 0, 0);
      player.spawnPoint.set(obX + 0.5, obY + 1, obZ + 0.5);
      addChatLine(`⛏ Welcome back! You've broken ${obSave.count} blocks.`, '#5f5');
    } else {
      resetOneBlock(world, obX, obY, obZ);
      if (player.inventory) {
        player.inventory.slots.fill(null);
        player.inventory.offhand = null;
        player.inventory.add(ITEM.STONE_PICKAXE, 1);
        player.inventory.add(ITEM.WOOD_SWORD, 1);
        syncUIMode();
      }
      player.position.set(obX + 0.5, obY + 1, obZ + 0.5);
      player.velocity.set(0, 0, 0);
      player.spawnPoint.set(obX + 0.5, obY + 1, obZ + 0.5);
    }

    // OneBlock HUD
    _oneBlockEl = document.getElementById('oneblock-hud');
    if (!_oneBlockEl) {
      const hud = document.createElement('div');
      hud.id = 'oneblock-hud';
      hud.style.cssText = 'position:fixed;top:10px;left:10px;z-index:100;pointer-events:none;text-align:left;font-family:monospace;';
      hud.innerHTML = '<div id="oneblock-title" style="font:bold 16px monospace;color:#6f6;text-shadow:0 1px 3px #000;"></div><div id="oneblock-sub" style="font:12px monospace;color:#fff;text-shadow:0 1px 2px #000;"></div><div id="oneblock-progress" style="width:150px;height:6px;background:rgba(0,0,0,0.4);border:1px solid rgba(255,255,255,0.25);border-radius:3px;margin-top:4px;"><div id="oneblock-progress-fill" style="width:0%;height:100%;background:#6f6;border-radius:3px;"></div></div><div id="oneblock-pool" style="font:11px monospace;color:#bbb;text-shadow:0 1px 2px #000;margin-top:6px;max-width:280px;line-height:1.5;"></div>';
      document.body.appendChild(hud);
      _oneBlockEl = document.getElementById('oneblock-hud');
    }
    updateOneBlockHud();
    if (!obSave || obSave.count == null) {
      addChatLine('⛏ OneBlock — break the block, it regenerates forever!', '#5f5');
      addChatLine('Phases unlock better blocks as you mine.', '#ff0');
    }
  }

  // ── Bedwars minigame setup ─────────────────────────────────────────
  if (isBedwars && world && player) {
    player.setGamemode('survival');
    if (mobManager) mobManager.clear();
    dayTime = 0.35;
    if (weatherSystem) weatherSystem.setState('clear');

    // Build the deterministic arena — try imported map first, fall back to procedural.
    // The procedural layout is built synchronously so there is a floor to stand
    // on while the imported map streams in; a successful import then clears it
    // (world.clearEdits) and replaces it with the real Treasure Island geometry.
    bwMap = buildBedwarsMap(world);
    (async () => {
      let imported = false;
      try {
        const tiData = await loadTreasureIslandData();
        world.clearEdits();                       // drop the procedural arena above
        buildTreasureIslandMap(world, tiData);    // place imported map (game coords)
        // The synchronous buildBedwarsMap above created chunks; drop generated
        // data so they regenerate from the imported edits.
        world.resetChunks();
        // Gameplay overlay snapped onto the imported islands (no geometry)
        bwMap = buildBedwarsMap(world, true, { snap: true, base: IMP_BASE_SPOTS, mid: IMP_MID_SPOTS });
        bwGens = (bwMap.generators || []).map(g => ({ ...g, timer: 1 + Math.random() * 1 }));
        for (const team of BW_TEAMS) {
          const cells = (bwMap.beds && bwMap.beds[team.key]) || [];
          bwBeds[team.key] = {
            cells,
            intact: cells.some(c => world.getBlock(c.x, c.y, c.z) !== BLOCK.AIR),
          };
        }
        // Refresh chunks around the arena so imported geometry renders
        if (manager) {
          for (let cx = -10; cx <= 10; cx++) {
            for (let cz = -10; cz <= 10; cz++) {
              manager.refreshAround(cx, cz);
            }
          }
        }
        // Move the player onto their real imported base island.
        if (bwMyTeamKey) {
          const sp = bwMap.spawn[bwMyTeamKey];
          if (sp) {
            player.position.set(sp.x, sp.y, sp.z);
            player.velocity.set(0, 0, 0);
            player.spawnPoint.set(sp.x, sp.y, sp.z);
            player.yaw = sp.yaw;
          }
        }
        imported = true;
        addChatLine('🗺 Real Treasure Island map loaded!', '#5ff');
      } catch (e) {
        console.warn('Failed to load imported Treasure Island, using procedural:', e);
      }
      if (!imported) {
        addChatLine('Imported Treasure Island failed to load — using procedural arena.', '#f55');
      }
    })();
    bwGens = (bwMap.generators || []).map(g => ({ ...g, timer: 1 + Math.random() * 1 }));
    // Bed state tracking. Pre-broken beds are detected on the initial scan.
    bwBeds = {};
    for (const team of BW_TEAMS) {
      const cells = (bwMap.beds && bwMap.beds[team.key]) || [];
      bwBeds[team.key] = {
        cells,
        intact: cells.some(c => world.getBlock(c.x, c.y, c.z) !== BLOCK.AIR),
      };
    }

    // Assign a team deterministically from the room roster.
    const roster = ((currentServer && currentServer.players) || []).map(p => p.name);
    const team = assignBedwarsTeam(playerName, roster);
    bwMyTeamKey = team.key;
    bwMyTeam = team;

    // Fresh loadout + spawn on the team island.
    if (player.inventory) {
      player.inventory.slots.fill(null);
      player.inventory.offhand = null;
      player.inventory.add(ITEM.STONE_SWORD, 1);
      player.inventory.add(ITEM.WOOD_PICKAXE, 1);
      player.inventory.add(BLOCK.WOOL, 16);
      syncUIMode();
    }
    const sp = bwMap.spawn[team.key];
    if (sp) {
      player.position.set(sp.x, sp.y, sp.z);
      player.velocity.set(0, 0, 0);
      player.spawnPoint.set(sp.x, sp.y, sp.z);
      player.yaw = sp.yaw;
      player.health = player.maxHealth;
      player.hunger = player.maxHunger;
    }
    player.setGamemode('survival');

    // Bedwars HUD (team + bed status + win banner).
    if (bwHudEl) bwHudEl.remove();
    bwHudEl = document.createElement('div');
    bwHudEl.id = 'bedwars-hud';
    bwHudEl.style.cssText = 'position:fixed;top:10px;left:10px;z-index:100;pointer-events:none;text-align:left;font-family:monospace;';
    document.body.appendChild(bwHudEl);
    renderBedwarsHud();

    addChatLine(`🏝 Bedwars — destroy enemy beds, last bed standing wins!`, '#5f5');
    addChatLine(`Your team: [${team.name}]`, team.color);
    addChatLine('Right-click the ⚒ Workbench on your island to open the shop.', '#ff0');
    addChatLine('Falling into the void respawns you — unless your bed is broken!', '#fa0');
  }

  // Local single-player minigames share this "back to the menu" path.
  const _minigameExit = () => {
    gameRunning = false;
    saveCurrentWorld();
    cgGameplayStop();
    if (isMultiplayer) network.leaveRoom();
    isBlockZones = false;
    isNights = false;
    isGunAffair = false;
    isSkyblock = false;
    clearBlockZones();
    clearNights();
    clearGunAffair();
    clearSkyblock();
    clearLiquid();
    ui.showMenu('minigames');
  };

  // ── BlockZones minigame setup ─────────────────────────────────────
  if (isBlockZones && world && player) {
    player.setGamemode('survival');
    if (mobManager) mobManager.clear();
    dayTime = 0.3;
    if (weatherSystem) weatherSystem.setState('clear');
    buildBlockZonesMap(world);
    if (player.inventory) {
      player.inventory.slots.fill(null);
      player.inventory.offhand = null;
      player.inventory.add(ITEM.IRON_PICKAXE, 1);
      syncUIMode();
    }
    const sp = { x: 0.5, y: BZ_Y + 2, z: 0.5, yaw: 0 };
    player.position.set(sp.x, sp.y, sp.z);
    player.velocity.set(0, 0, 0);
    player.spawnPoint.set(sp.x, sp.y, sp.z);
    player.health = player.maxHealth;
    player.hunger = player.maxHunger;
    startBlockZones();
    setBlockZonesExit(_minigameExit);
    addChatLine('🧱 BlockZones — break blocks before the timer runs out!', '#fb0');
    addChatLine('Mine the highlighted TARGET block for a ×5 bonus — chain for combos!', '#ff0');
  }

  // ── 99 Nights minigame setup ──────────────────────────────────────
  if (isNights && world && player) {
    player.setGamemode('survival');
    if (mobManager) mobManager.clear();
    dayTime = 0.66; // locked to night
    if (weatherSystem) weatherSystem.setState('clear');
    buildNightsMap(world);
    if (player.inventory) {
      player.inventory.slots.fill(null);
      player.inventory.offhand = null;
      player.inventory.add(ITEM.IRON_SWORD, 1);
      player.inventory.add(BLOCK.PLANKS, 32);
      player.inventory.add(ITEM.IRON_CHEST, 1);
      syncUIMode();
    }
    const sp = { x: 0.5, y: N_Y + 2, z: 0.5, yaw: 0 };
    player.position.set(sp.x, sp.y, sp.z);
    player.velocity.set(0, 0, 0);
    player.spawnPoint.set(sp.x, sp.y, sp.z);
    player.health = player.maxHealth;
    player.hunger = player.maxHunger;
    startNights();
    setNightsExit(_minigameExit);
    addChatLine('🌙 99 Nights — survive 99 nights of the undead on this arena!', '#7af');
    addChatLine('Fight with your sword, build with planks, and never stop moving.', '#ff0');
  }

  // ── GunAffair minigame setup ──────────────────────────────────────
  if (isGunAffair && world && player) {
    player.setGamemode('survival');
    if (mobManager) mobManager.clear();
    dayTime = 0.35;
    if (weatherSystem) weatherSystem.setState('clear');
    buildGunAffairMap(world);
    if (player.inventory) {
      player.inventory.slots.fill(null);
      player.inventory.offhand = null;
      syncUIMode();
    }
    const sp = { x: 0.5, y: GA_Y + 2, z: 0.5, yaw: 0 };
    player.position.set(sp.x, sp.y, sp.z);
    player.velocity.set(0, 0, 0);
    player.spawnPoint.set(sp.x, sp.y, sp.z);
    player.health = player.maxHealth;
    player.hunger = player.maxHunger;
    startGunAffair(scene);
    setGunAffairExit(_minigameExit);
    addChatLine('🔫 GunAffair — hold left-click to fire the rifle!', '#f66');
    addChatLine('Chain kills for a combo multiplier before the clock runs out.', '#ff0');
  }

  // ── SkyBlock minigame setup ──────────────────────────────────────
  if (isSkyblock && world && player) {
    player.setGamemode('survival');
    if (mobManager) mobManager.clear();
    dayTime = 0.3;
    if (weatherSystem) weatherSystem.setState('clear');

    initLiquid(world, (cx, cz) => { if (manager) manager.refreshAround(cx, cz); });
    const sbMap = buildSkyblockMap(world);

    if (player.inventory) {
      player.inventory.slots.fill(null);
      player.inventory.offhand = null;
      for (const [it, n] of SB_STARTER_KIT) player.inventory.add(it, n);
      player.inventory.add(ITEM.WATER_BUCKET, 1);
      player.inventory.add(ITEM.LAVA_BUCKET, 1);
      player.inventory.add(ITEM.WOOD_AXE, 1);
      player.inventory.add(ITEM.WOOD_PICKAXE, 1);
      player.inventory.add(BLOCK.WOOD, 16);
      syncUIMode();
    }
    const sp = SB_SPAWN;
    player.position.set(sp.x + 0.5, sp.y, sp.z + 0.5);
    player.velocity.set(0, 0, 0);
    player.spawnPoint.set(sp.x + 0.5, sp.y, sp.z + 0.5);
    player.health = player.maxHealth;
    player.hunger = player.maxHunger;

    addChatLine(`🏝 SkyBlock — explore all ${sbMap.islands} islands from the original map!`, '#5f5');
    addChatLine('Water and lava flow — gather resources and build your base.', '#ff0');
    addChatLine('Falling into the void respawns you on your island.', '#fa0');
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
    ? parkourLoadPromise.then(() => ui.updateLoading(5, _isImportedParkour ? '100-level map loaded.' : 'Parkour map loaded.'))
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
        // Attach context for user feedback reports
        try {
          const mode = isParkour ? 'parkour' : isOneBlock ? 'oneblock' : isBedwars ? 'bedwars' : isBlockZones ? 'blockzones' : isNights ? '99nights' : isGunAffair ? 'gunaffair' : isSkyblock ? 'skyblock' : 'creative';
          cgSetGameContext({ mode, worldId: currentWorldId || null });
        } catch (_) {}
        try { audio.init(); audio.resume(); audio.startMusic(); audio.loadSfx(VERY_LOW_END); } catch (_) { console.warn("audio operation failed"); }
        if (!hasTutorialBeenSeen()) {
          setTimeout(() => showTutorial(), 500);
        }
        if (cheatsEnabled) addChatLine('Cheats enabled — commands, replay camera (Z) and F7 gamemode are available.', '#9cf');
        else addChatLine('Cheats disabled — gameplay commands are locked.', '#f99');
      }, 400);
    }).catch((err) => {
      console.error('[BlockForge] World load failed:', err);
      clearInterval(_tipInterval);
      ui.hideLoading();
      cgLoadingStop();
      gameRunning = false;
      isMultiplayer = false;
      currentServer = null;
      ui.showMenu('main');
      const el = document.getElementById('mp-error');
      if (el) { el.textContent = 'Failed to load world: ' + (err?.message || err); el.style.color = '#f55'; setTimeout(() => { el.textContent = ''; }, 6000); }
    });
  }).catch((err) => {
    console.error('[BlockForge] World init failed:', err);
    clearInterval(_tipInterval);
    ui.hideLoading();
    cgLoadingStop();
    gameRunning = false;
    isMultiplayer = false;
    currentServer = null;
    ui.showMenu('main');
    const el = document.getElementById('mp-error');
    if (el) { el.textContent = 'Failed to initialize: ' + (err?.message || err); el.style.color = '#f55'; setTimeout(() => { el.textContent = ''; }, 6000); }
  });
}

function saveCurrentWorld() {
  if (isDevWorld || isParkour || isSkyblock) return;
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

  // In dimension mode, save edits from BOTH worlds
  let saveData;
  if (_isDimensionMode && _dimensionOverworld && _dimensionTarget) {
    const owEdits = _dimensionOverworld.serializeEdits();
    const dimEdits = _dimensionTarget.serializeEdits();
    saveData = {
      seed: world.seed,
      overworldEdits: owEdits.edits,
      overworldChests: owEdits.chests,
      overworldFurnaces: owEdits.furnaces,
      dimensionEdits: dimEdits.edits,
      dimensionChests: dimEdits.chests,
      dimensionFurnaces: dimEdits.furnaces,
      player: playerData,
    };
  } else {
    saveData = { ...world.serializeEdits(), player: playerData };
  }

  // OneBlock worlds also persist their minigame progress (broken-block count,
  // block position, inventory) so a run can be resumed from the menu.
  if (isOneBlock) {
    const ob = getOneBlockSave();
    saveData.oneblock = {
      count: ob.count,
      pos: ob.pos,
      nextBlock: ob.nextBlock,
      inventory: playerData.inventory,
      playerPos: playerData.position,
    };
  }

  let saveOk;
  if (isMultiplayer && playerName) {
    saveMultiplayerInventory(currentWorldId, playerName, playerData.inventory);
    saveMultiplayerBedSpawn(currentWorldId, playerName, playerData.bedSpawnPoint);
    const perPlayer = { ...playerData, inventory: undefined, bedSpawnPoint: undefined };
    saveOk = saveWorld(currentWorldId, { ...saveData, player: perPlayer });
  } else {
    saveOk = saveWorld(currentWorldId, saveData);
  }
  if (!saveOk) {
    const now = Date.now();
    if (!window.__storageFullToastAt || now - window.__storageFullToastAt > 60000) {
      window.__storageFullToastAt = now;
      showToast('⚠ Browser storage is full — progress may not be saved! Free up space in your browser settings.', '#f44', 6);
    }
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
      } catch (_) { console.warn("operation failed"); }
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

// Show/hide the pause-menu "Errors" button based on dev status. Re-evaluated
// whenever the pause menu opens (not just once) so it appears after the dev
// has logged in — the name/role only land after auth.
function refreshDevPauseBtn() {
  const isDev = DEV_USERS.has(playerName.toLowerCase()) || playerRole === 'dev' || playerRole === 'gamedev' || playerRole === 'owner';
  const btn = document.getElementById('btn-pause-errors');
  if (!btn) return;
  btn.style.display = isDev ? '' : 'none';
}

function initMenu() {
  const verEl = document.getElementById('menu-version');
  if (verEl) verEl.textContent = 'v2026-07-26';

  // Migrate old save + purge leaked dev worlds
  migrateLegacy();
  cleanDevWorldsFromPlayerList();

  // Sync tutorial flag from SDK cloud (in case another device set it)
  syncTutorialFromSdk();

  // CrazyGames only: pull saved worlds/settings from the cloud when the local
  // (partitioned) storage came up empty. Runs on the CG platform only.
  cgPullProgress();

  // Check for adblock on CG — warn gracefully if detected.
  cgHasAdblock().then(blocked => {
    if (blocked) window._cgAdblockDetected = true;
  }).catch(() => {});

  // Prompt guest users to create a CG account for cloud saves (one-time).
  if (cgEnvironment() === 'crazygames' && !localStorage.getItem('bf_cg_linked')) {
    setTimeout(() => {
      const me = window.CrazyGames?.SDK?.user?.getUser?.();
      if (!me || !me.id) {
        showToast('Create a CrazyGames account to save progress across devices!', '#4af');
        setTimeout(() => cgShowAuthPrompt(), 3000);
      }
    }, 15000);
  }

  // Track login for analytics
  trackLogin();

  // Set up real multiplayer network handlers
  setupNetworkHandlers();

  // Load offline DM queue from localStorage
  try {
    const saved = localStorage.getItem('bf_dm_offline_queue');
    if (saved) _dmOfflineQueue = JSON.parse(saved);
  } catch {}

  // Flush offline DM queue when connection is established
  network.onConnectedOnce(() => { _flushOfflineDMs(); });

  // CrazyGames: listen for room join via invite link (not just at startup)
  try {
    window.CrazyGames?.SDK?.game?.onGameRoomJoin?.((roomId) => {
      if (!roomId) return;
      addChatLine('Joining room via invite...', '#5f5');
      if (network.connected) {
        _doNetworkJoin(roomId);
      } else {
        addChatLine('Please connect to WiFi or Data to play online.', '#fa0', true);
      }
    });
  } catch (_) { console.warn("operation failed"); }

  // Client-side keepalive: ping server every 5 min while tab is open
  const _healthUrl = BACKEND_URL.replace(/^wss?:\/\//, 'https://') + '/health';
  setInterval(() => {
    fetch(_healthUrl).catch(() => {});
  }, 300000);

  // Check if joining via CrazyGames invite link (instant multiplayer)
  setTimeout(() => {
    try {
      const isInstant = window.CrazyGames?.SDK?.game?.isInstantMultiplayer;
      if (isInstant) {
        const roomId = window.CrazyGames?.SDK?.lobby?.getRoomId?.();
        if (roomId) {
          // Bypass detection: must be authenticated before joining multiplayer
          if (!sessionStorage.getItem('bf_authenticated')) {
            addChatLine('Please log in first to join multiplayer.', '#f55');
            return;
          }
          // Skip menu — go straight into multiplayer
          addChatLine('Instant multiplayer — joining room...', '#5f5');
          ui.showMenu(null);
          if (network.connected) {
            _doNetworkJoin(roomId);
          } else {
            addChatLine('Please connect to WiFi or Data to play online.', '#fa0', true);
          }
          return;
        }
      }
    } catch (_) { console.warn("operation failed"); }
  }, 1000);

  // Check if joining via standalone shareable link (?join=ROOM)
  try {
    const params = new URLSearchParams(location.search);
    const joinRoom = params.get('join');
    if (joinRoom && !window.CrazyGames?.SDK?.game?.isInstantMultiplayer) {
      // Bypass detection: must be authenticated before joining multiplayer
      if (!sessionStorage.getItem('bf_authenticated')) {
        console.log('Blocked join link — not authenticated');
      } else {
        joiningViaLink = true;
        setTimeout(() => {
          addChatLine('Joining room from invite link...', '#5f5');
          ui.showMenu(null);
          if (network.connected) {
            _doNetworkJoin(joinRoom);
          } else {
            addChatLine('Please connect to WiFi or Data to play online.', '#fa0', true);
          }
        }, 1200);
      }
    }
  } catch (_) { console.warn("operation failed"); }

  // Load saved player name
  let hadSavedName = false;
  try {
    const saved = localStorage.getItem('bf_player_name');
    if (saved) { playerName = filterProfanity(saved); hadSavedName = true; }
  } catch (_) { console.warn("operation failed"); }
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
  // Save a setting to both localStorage and CrazyGames cloud
  function saveSetting(key, value) {
    try { localStorage.setItem(key, value); } catch (_) {}
    try {
      if (window.CrazyGames && window.CrazyGames.SDK && window.CrazyGames.SDK.data) {
        window.CrazyGames.SDK.data.setItem(key, String(value)).catch(() => {});
      }
    } catch (_) {}
  }
  loadSetting('set-render-distance', 'bf_render_dist');
  loadSetting('set-fov', 'bf_fov');
  loadSetting('set-fps', 'bf_fps');
  loadSetting('set-quality', 'bf_quality');
  loadSetting('set-shadows', 'bf_shadows');
  // Apply shadows setting on startup
  try {
    const sh = localStorage.getItem('bf_shadows');
    // On weak GPUs / mobile, default to shadows OFF unless user enabled them
    const shadowsOn = sh !== null ? sh !== '0' : (!VERY_LOW_END && !IS_MOBILE);
    window.__shadowsEnabled = shadowsOn;
    if (!shadowsOn) renderer.shadowMap.enabled = false;
    // Update the toggle UI to reflect the actual state
    const shEl = document.getElementById('set-shadows');
    if (shEl) shEl.value = shadowsOn ? '1' : '0';
  } catch (_) { console.warn("operation failed"); }

  // CrazyGames-exclusive "Crazy Trail" setting (only shown on CG)
  try {
    if (isOnCrazyGames()) {
      const row = document.getElementById('row-cg-trail');
      if (row) row.style.display = 'flex';
      const saved = localStorage.getItem('bf_cg_trail');
      if (saved !== null) {
        cgTrailEnabled = saved !== '0';
        const el = document.getElementById('set-cg-trail');
        if (el) el.value = cgTrailEnabled ? '1' : '0';
      }
      // Suppress off-platform external links inside the game on CrazyGames (TOS)
      ['btn-ai-portal', 'ai-data-page'].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
      });
      // One-time welcome toast for the CG-exclusive perk
      if (!localStorage.getItem('bf_cg_seen_trail')) {
        try { localStorage.setItem('bf_cg_seen_trail', '1'); } catch (_) {}
        setTimeout(() => {
          try { showToast('✨ CrazyGames Exclusive: you have the Crazy Trail! Toggle it in Settings.', '#9af', 6); } catch (_) {}
        }, 2600);
      }
    }
  } catch (_) { console.warn("operation failed"); }

  // Load mouse sensitivity setting (also applies it live)
  try {
    const sens = localStorage.getItem('bf_sensitivity');
    if (sens !== null) {
      const el = document.getElementById('set-sensitivity');
      if (el) el.value = sens;
      mouseSensitivity = Math.max(0.2, Math.min(2.0, parseInt(sens) / 100));
      window.__mouseSens = mouseSensitivity;
    }
  } catch (_) { console.warn("operation failed"); }

  // Load volume setting (applied to audio when audio is initialized)
  try {
    const vol = localStorage.getItem('bf_volume');
    if (vol !== null) {
      const el = document.getElementById('set-volume');
      if (el) el.value = vol;
      const volNum = Math.max(0, Math.min(100, parseInt(vol) || 50)) / 100;
      if (audio && audio.master) audio.master.gain.value = volNum;
    }
  } catch (_) { console.warn("operation failed"); }

  // Load FPS setting into a module-level flag
  showFps = (document.getElementById('set-fps')?.value || '1') !== '0';
  // Apply FOV from loaded setting
  baseFov = parseInt(document.getElementById('set-fov')?.value) || 70;
  camera.fov = baseFov;
  camera.updateProjectionMatrix();

  // First-time name prompt (standalone / non-CG users)
  try {
    const launchedFromCG = window.CrazyGames?.SDK?.user?.getUsername?.();
    // Name prompt only needed for CrazyGames users (login screen handles others)
    if (!hadSavedName && launchedFromCG && !joiningViaLink) {
      setTimeout(() => showNamePrompt(), 1200);
    }
  } catch (_) { console.warn("operation failed"); }

  // Check for custom skin creation achievement
  try {
    if (localStorage.getItem('bf_custom_skin_created') === '1') {
      achievements.setStat('customSkinCreated', 1);
    }
  } catch (_) { console.warn("operation failed"); }

  // Achievement toast callback
  achievements.onUnlock((ach) => {
    cgHappyTime();
    // Report progress to CG based on achievements unlocked
    try {
      const total = Object.keys(ACHIEVEMENTS || {}).length || 20;
      const unlocked = achievements.unlocked ? achievements.unlocked.size : 0;
      cgReportProgress(Math.round((unlocked / total) * 100));
    } catch (_) {}
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
      } catch (_) { console.warn("operation failed"); }
    }
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  });

  // Start music on first user click (browser autoplay policy)
  let musicStarted = false;
  function startMusicOnce() {
    if (musicStarted) return;
    musicStarted = true;
    try { audio.init(); audio.resume(); audio.startMusic(); } catch (_) { console.warn("audio operation failed"); }
    document.removeEventListener('click', startMusicOnce);
    document.removeEventListener('pointerlockchange', startMusicOnce);
  }
  document.addEventListener('click', startMusicOnce);
  document.addEventListener('pointerlockchange', startMusicOnce);

  // Global button click sound — Minecraft-style wooden "click" on every UI button.
  document.addEventListener('click', (e) => {
    const t = e.target;
    if (t.closest('button, .menu-btn, .slot, .mode-option, .inv-slot, .craft-slot, .setting-btn, .key-btn, .btn-badge, [role="button"]')) {
      try { audio.buttonClick(); } catch (_) {}
    }
  });

  // --- Live settings ---
  document.getElementById('set-cg-trail')?.addEventListener('change', (e) => {
    cgTrailEnabled = e.target.value !== '0';
    saveSetting('bf_cg_trail', cgTrailEnabled ? '1' : '0');
  });
  document.getElementById('set-render-distance')?.addEventListener('change', (e) => {
    renderDist = parseInt(e.target.value) || 7;
    if (IS_MOBILE) renderDist = Math.min(renderDist, 5);
    if (LOW_END) renderDist = Math.min(renderDist, 6);
    if (VERY_LOW_END) renderDist = Math.min(renderDist, 4);
    saveSetting('bf_render_dist', e.target.value);
    // Apply to current world if loaded
    scene.fog.far = 16 * (renderDist + 2);
    scene.fog.near = 16 * 5;
    if (loader && loader.setRadius) loader.setRadius(renderDist);
  });
  document.getElementById('set-fov')?.addEventListener('change', (e) => {
    baseFov = parseInt(e.target.value) || 70;
    camera.fov = baseFov;
    camera.updateProjectionMatrix();
    saveSetting('bf_fov', e.target.value);
  });
  document.getElementById('set-volume')?.addEventListener('input', (e) => {
    const vol = Math.max(0, Math.min(100, parseInt(e.target.value) || 50)) / 100;
    if (audio && audio.master) audio.master.gain.value = vol;
    saveSetting('bf_volume', e.target.value);
  });
  document.getElementById('set-fps')?.addEventListener('change', (e) => {
    showFps = e.target.value !== '0';
    saveSetting('bf_fps', e.target.value);
  });
  document.getElementById('set-sensitivity')?.addEventListener('input', (e) => {
    mouseSensitivity = Math.max(0.2, Math.min(2.0, parseInt(e.target.value) / 100));
    window.__mouseSens = mouseSensitivity;
    saveSetting('bf_sensitivity', e.target.value);
  });
  document.getElementById('set-quality')?.addEventListener('change', (e) => {
    graphicsQuality = e.target.value || 'medium';
    applyGraphicsQuality();
    saveSetting('bf_quality', graphicsQuality);
  });
  document.getElementById('set-shadows')?.addEventListener('change', (e) => {
    const enabled = e.target.value !== '0';
    window.__shadowsEnabled = enabled;
    renderer.shadowMap.enabled = enabled;
    renderer.shadowMap.type = (VERY_LOW_END) ? THREE.PCFShadowMap : THREE.PCFSoftShadowMap;
    saveSetting('bf_shadows', e.target.value);
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
  const MG_COMING = ['skywars','murder','miningsim','gunsurvival'];
  for (const id of MG_COMING) {
    document.getElementById('btn-minigame-' + id)?.addEventListener('click', (e) => {
      const names = { skywars:'SkyWars', murder:'Murder Mystery', miningsim:'Mining Sim', gunsurvival:'Gun Survival' };
      showToast(names[id] + ' — Coming Soon!', '#fa0');
    });
  }

  function _populateParkourLeaderboard() {
    const lb = document.getElementById('pk-leaderboard');
    const content = document.getElementById('pk-lb-content');
    if (!lb || !content) return;
    const data = getParkourLeaderboard();
    const keys = Object.keys(data);
    if (keys.length === 0) { lb.style.display = 'none'; return; }
    lb.style.display = '';
    const labels = { default: 'Default Parkour', imported: '100 Levels' };
    let html = '';
    for (const key of keys) {
      const d = data[key];
      const m = Math.floor(d.time / 60);
      const s = Math.floor(d.time % 60);
      const ms = Math.floor((d.time % 1) * 100);
      const tStr = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(ms).padStart(2, '0')}`;
      html += `<div style="margin:3px 0;"><span style="color:#fa0;">${labels[key] || key}</span>: <span style="color:#fff;">${tStr}</span> <span style="color:${d.grade === 'S' ? '#ffd700' : '#aaa'};">${d.grade}</span> <span style="color:#888;">(${d.deaths} deaths)</span></div>`;
    }
    content.innerHTML = html;
  }

  // Parkour → mode select
  document.getElementById('btn-minigame-parkour')?.addEventListener('click', () => {
    ui.showMenu('parkour-select');
    _populateParkourLeaderboard();
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

  // OneBlock → mode select
  document.getElementById('btn-minigame-oneblock')?.addEventListener('click', () => {
    ui.showMenu('oneblock-select');
  });
  document.getElementById('btn-ob-back')?.addEventListener('click', () => {
    ui.showMenu('minigames');
  });
  document.getElementById('btn-ob-worlds')?.addEventListener('click', () => {
    renderOneBlockWorldList();
    ui.showMenu('oneblock-worlds');
  });
  document.getElementById('btn-ob-worlds-back')?.addEventListener('click', () => {
    ui.showMenu('oneblock-select');
  });
  document.getElementById('btn-ob-singleplayer')?.addEventListener('click', () => {
    startOneBlockGame();
  });
  document.getElementById('btn-new-ob-world')?.addEventListener('click', () => {
    startOneBlockGame();
  });

  function startOneBlockGame() {
    const w = createWorld('OneBlock World', Math.floor(Math.random() * 1e9), 'survival', 'peaceful', { oneblock: true, void: true });
    startGame(w.id, w.seed, 'survival', 'peaceful', { oneblock: true, void: true });
  }

  // BedWars → direct minigame start (fresh match, no saved worlds)
  document.getElementById('btn-minigame-bedwars')?.addEventListener('click', () => {
    const id = 'bw_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    startGame(id, Math.floor(Math.random() * 1e9), 'survival', 'normal', { bedwars: true, void: true });
  });
  // SkyBlock → reproduce the "Skyblock Plus" map in a void world (fresh game)
  document.getElementById('btn-minigame-skyblock')?.addEventListener('click', () => {
    const id = 'sb_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    startGame(id, Math.floor(Math.random() * 1e9), 'survival', 'normal', { skyblock: true, void: true });
  });
  // BlockZones → timed mining frenzy (fresh match)
  document.getElementById('btn-minigame-blockzones')?.addEventListener('click', () => {
    const id = 'bz_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    startGame(id, Math.floor(Math.random() * 1e9), 'survival', 'peaceful', { blockzones: true, void: true });
  });
  // 99 Nights → coming soon (button marked .mg-coming)
  document.getElementById('btn-minigame-99nights')?.addEventListener('click', () => {
    ui.itemNameEl.textContent = '99Nights is coming soon!';
    ui.itemNameEl.classList.add('visible');
    setTimeout(() => ui.itemNameEl.classList.remove('visible'), 2500);
  });
  // GunAffair → hitscan arena shooter (fresh match)
  document.getElementById('btn-minigame-gunaffairs')?.addEventListener('click', () => {
    const id = 'ga_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    startGame(id, Math.floor(Math.random() * 1e9), 'survival', 'normal', { gunaffair: true, void: true });
  });

  // --- Friends menu ---
  document.getElementById('btn-friends').addEventListener('click', () => {
    ui.showMenu('friends');
    openFriendsMenu();
  });
  document.getElementById('btn-friends-back')?.addEventListener('click', () => {
    showMultiplayerMenu();
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
    if (isOnCrazyGames()) {
      const overlay = document.createElement('div');
      overlay.style.cssText = 'position:fixed;inset:0;z-index:999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.7);';
      overlay.innerHTML = '<div style="max-width:340px;width:90%;background:rgba(20,22,32,0.97);border:2px solid rgba(100,150,200,0.25);border-radius:10px;padding:32px 28px;text-align:center;font-family:monospace;color:#ddd;box-shadow:0 0 40px rgba(0,0,0,0.5);"><div style="font-size:18px;font-weight:bold;margin-bottom:12px;color:#f88;">&#128274; Computer Required</div><div style="font-size:13px;line-height:1.6;color:#bbb;">Hosting a server requires a computer.<br><span style="font-size:11px;color:#888;">Visit blockforge-1.onrender.com to host your own server!</span></div><button style="margin-top:18px;padding:10px 28px;font:bold 13px monospace;background:rgba(60,80,120,0.5);color:#e0e8ff;border:1px solid rgba(100,140,255,0.25);border-radius:6px;cursor:pointer;">OK</button></div>';
      overlay.querySelector('button').onclick = () => overlay.remove();
      overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
      document.body.appendChild(overlay);
      return;
    }
    if ('ontouchstart' in window && navigator.maxTouchPoints > 0) {
      const overlay = document.createElement('div');
      overlay.style.cssText = 'position:fixed;inset:0;z-index:999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.7);';
      overlay.innerHTML = '<div style="max-width:340px;width:90%;background:rgba(20,22,32,0.97);border:2px solid rgba(100,150,200,0.25);border-radius:10px;padding:32px 28px;text-align:center;font-family:monospace;color:#ddd;box-shadow:0 0 40px rgba(0,0,0,0.5);"><div style="font-size:18px;font-weight:bold;margin-bottom:12px;color:#f88;">&#128274; Computer Required</div><div style="font-size:13px;line-height:1.6;color:#bbb;">Sorry, you need a computer to host a server.<br><span style="font-size:11px;color:#888;">You can still join servers from mobile!</span></div><button style="margin-top:18px;padding:10px 28px;font:bold 13px monospace;background:rgba(60,80,120,0.5);color:#e0e8ff;border:1px solid rgba(100,140,255,0.25);border-radius:6px;cursor:pointer;">OK</button></div>';
      overlay.querySelector('button').onclick = () => overlay.remove();
      overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
      document.body.appendChild(overlay);
      return;
    }
    window.open('/create-server.html', '_blank');
  });
  document.getElementById('btn-new-mp-world')?.addEventListener('click', () => {
    showCreateServerMenu();
  });
  document.getElementById('btn-back-to-servers')?.addEventListener('click', () => {
    showServersView();
  });
  document.getElementById('btn-direct-connect').addEventListener('click', () => {
    const v = document.getElementById('input-direct-connect')?.value || '';
    joinServerByAddress(v);
  });
  document.getElementById('input-direct-connect')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') joinServerByAddress(e.target.value || '');
  });

  // --- Add Server modal (Minecraft-style saved servers) ---
  const addModal = document.getElementById('add-server-modal');
  const openAddModal = () => {
    const e = document.getElementById('add-server-error');
    if (e) e.textContent = '';
    const n = document.getElementById('input-add-name');
    const a = document.getElementById('input-add-address');
    if (n) n.value = '';
    if (a) a.value = '';
    if (addModal) addModal.style.display = 'flex';
    if (n) setTimeout(() => n.focus(), 30);
  };
  const closeAddModal = () => { if (addModal) addModal.style.display = 'none'; };
  document.getElementById('btn-add-server')?.addEventListener('click', openAddModal);
  document.getElementById('btn-add-server-cancel')?.addEventListener('click', closeAddModal);
  document.getElementById('btn-add-server-go')?.addEventListener('click', () => {
    const n = document.getElementById('input-add-name')?.value || '';
    const a = document.getElementById('input-add-address')?.value || '';
    if (!a.trim()) {
      const e = document.getElementById('add-server-error');
      if (e) e.textContent = 'Enter a server address.';
      return;
    }
    if (addSavedServer(n, a)) {
      closeAddModal();
      renderSavedServers();
    } else {
      const e = document.getElementById('add-server-error');
      if (e) e.textContent = 'Invalid address.';
    }
  });
  document.getElementById('input-add-address')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') document.getElementById('btn-add-server-go')?.click();
  });
  if (addModal) addModal.addEventListener('click', (e) => { if (e.target === addModal) closeAddModal(); });
  document.getElementById('btn-refresh-servers')?.addEventListener('click', () => renderSavedServers());
  document.getElementById('btn-mp-back').addEventListener('click', () => {
    stopMpStatusTimer();
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
    cloudSet('bf_player_name', pname);
    if (!name) return;
    const addr = (document.getElementById('input-server-address')?.value || '').trim();
    createServer(name, maxP, mode, seedInput || undefined, isPrivate, addr);
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

  // --- Updates ---
  // Each entry = one clickable commit button with categorized details.
  // { hash, heading, desc, date, bugs: [], updates: [], features: [] }
  const UPDATE_SECTIONS = [
    {
      hash: '07a16ac',
      heading: 'Menu UI — Glass Morphism Overhaul',
      desc: 'Modernized menu with glass-morphism panels, gradient text, glow effects, and smoother animations.',
      date: 'Jul 30',
      bugs: ['Menu cut-off on minigame screen', 'Promo-short scene 2 block rendering issues'],
      updates: ['Glass-morphism blur on menu panels', 'Gradient text for titles', 'Glow effects on hover', 'Smoother fade-in animations'],
      features: [],
    },
    {
      hash: '905becf',
      heading: 'Crouch, Weather & Underground Biomes',
      desc: 'Major gameplay update: crouch mechanics, weather system, underground biomes, and visual polish.',
      date: 'Jul 28',
      bugs: ['Player floats after walking off edge', 'Crouch edge protection too restrictive', 'Remote players spawned at world origin', 'Shadow matrix desync', 'Ghost blocks from previous worlds', '120 BUGS_SCAN issues fixed'],
      updates: ['Crouch: smooth camera, fall damage negation, faster animation', 'Water: fresnel reflections, sharper specular', 'Chunks: priority queue loads nearest first', 'Day/night: golden hour glow, smooth lerp', 'All sounds replaced with CC0/procedural', 'Switch to Render hosting'],
      features: ['Weather: rain, snow, thunderstorms, biome-based', 'Underground: ore veins, stalactites, deepslate caves', 'Item tooltips on hover', 'Grass/foliage sway animation', 'Block preview ghost', 'Dynamic fog', 'Real-time PCF shadows', 'River biome', 'Head bobbing', 'Breast stroke swimming', 'Block break cracks'],
    },
    {
      hash: '74767f9',
      heading: 'Real-Time Shadows & Block Sounds',
      desc: 'Added shadow mapping to custom shaders and CC0 Kenney block impact sounds.',
      date: 'Jul 26',
      bugs: ['Shadow pass not synced with custom shaders'],
      updates: ['Shadow map in custom shaders', 'CC0 Kenney block impact sounds'],
      features: ['Real-time PCF shadow mapping'],
    },
    {
      hash: '27831b6',
      heading: '120 Bug Fixes from BUGS_SCAN',
      desc: 'Fixed all 120 issues found in the BUGS_SCAN audit across 16 files.',
      date: 'Jul 25',
      bugs: ['NaN crash on zero-vector normalize', 'SurfaceMap edge cases', 'DOM memory leaks', 'Server guest persistence', 'Block ID truncation', 'River octaves', 'Cave width', 'Duplicate owner', 'IS_LAN hoisting', 'BIOMES import', 'Login redirect loop'],
      updates: ['Comprehensive bug scan and fix pass'],
      features: [],
    },
    {
      hash: '0884d91',
      heading: 'Updates Accordion — Collapsible Sections',
      desc: 'Made the Updates screen accordion-style: collapsible sections, newest expanded by default.',
      date: 'Jul 25',
      bugs: [],
      updates: ['Accordion UI for updates list', 'Newest section expanded by default'],
      features: [],
    },
    {
      hash: '7802f0d',
      heading: 'Creature Sounds & Mobile Controls',
      desc: 'Added CC0 creature sounds, menu shadows, and mobile control improvements.',
      date: 'Jul 24',
      bugs: ['pigSound infinite loop (operator precedence)'],
      updates: ['CC0 creature sounds', 'Menu shadow effects', 'Double-tap mobile controls'],
      features: ['F3 debug overlay'],
    },
  ];
  document.getElementById('btn-updates')?.addEventListener('click', () => {
    ui.showMenu('updates');
    ui._prevMenu = 'main';
    const list = document.getElementById('updates-list');
    if (!list.dataset.rendered) {
      list.innerHTML = UPDATE_SECTIONS.map((s, i) => `
        <div class="update-section" style="margin-bottom:6px;border:1px solid rgba(255,255,255,0.08);border-radius:6px;overflow:hidden;">
          <div class="update-head" data-idx="${i}" style="cursor:pointer;padding:10px 12px;background:rgba(255,170,0,0.06);font:13px/1.4 monospace;color:#fa0;display:flex;justify-content:space-between;align-items:center;user-select:none;gap:8px;">
            <div style="flex:1;min-width:0;">
              <div style="display:flex;align-items:center;gap:6px;margin-bottom:2px;">
                <span style="font:bold 10px monospace;color:#666;background:rgba(255,255,255,0.05);padding:1px 5px;border-radius:3px;">${s.hash}</span>
                <span style="font:bold 10px monospace;color:#888;">${s.date}</span>
              </div>
              <span style="font-weight:bold;">${s.heading}</span>
              <div style="font:11px monospace;color:#999;margin-top:2px;line-height:1.3;">${s.desc}</div>
            </div>
            <span class="update-arrow" style="font-size:10px;transition:.2s;flex-shrink:0;">${i === 0 ? '▲' : '▼'}</span>
          </div>
          <div class="update-body" style="padding:${i === 0 ? '8px 12px 10px' : '0 12px'};max-height:${i === 0 ? 'none' : '0'};overflow:hidden;transition:.25s;">
            ${s.bugs.length ? `<div style="font:bold 10px monospace;color:#f88;margin-bottom:3px;">BUGS FIXED</div>${s.bugs.map(b => `<div style="font:10px monospace;color:#ccc;padding:2px 8px;margin-bottom:1px;border-left:2px solid #f55;background:rgba(255,80,80,0.05);border-radius:2px;">${b}</div>`).join('')}` : ''}
            ${s.updates.length ? `<div style="font:bold 10px monospace;color:#8cf;margin-top:${s.bugs.length ? '8' : '0'}px;margin-bottom:3px;">UPDATES</div>${s.updates.map(u => `<div style="font:10px monospace;color:#ccc;padding:2px 8px;margin-bottom:1px;border-left:2px solid #5af;background:rgba(80,160,255,0.05);border-radius:2px;">${u}</div>`).join('')}` : ''}
            ${s.features.length ? `<div style="font:bold 10px monospace;color:#8f8;margin-top:${s.updates.length || s.bugs.length ? '8' : '0'}px;margin-bottom:3px;">NEW FEATURES</div>${s.features.map(f => `<div style="font:10px monospace;color:#ccc;padding:2px 8px;margin-bottom:1px;border-left:2px solid #5c5;background:rgba(80,255,80,0.05);border-radius:2px;">${f}</div>`).join('')}` : ''}
          </div>
        </div>
      `).join('');
      list.addEventListener('click', (e) => {
        const head = e.target.closest('.update-head');
        if (!head) return;
        const sec = head.closest('.update-section');
        const body = sec.querySelector('.update-body');
        const arrow = head.querySelector('.update-arrow');
        const isOpen = body.style.maxHeight !== '0px' && body.style.maxHeight !== '0';
        body.style.maxHeight = isOpen ? '0' : 'none';
        body.style.padding = isOpen ? '0 12px' : '8px 12px 10px';
        arrow.textContent = isOpen ? '▼' : '▲';
      });
      list.dataset.rendered = '1';
    }
  });
  document.getElementById('btn-updates-back')?.addEventListener('click', () => {
    ui.showMenu('main');
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
    try {
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
    } catch (_) { console.warn("operation failed"); }
  }
  document.getElementById('btn-feedback')?.addEventListener('click', () => {
    ui.showMenu('feedback');
    renderFeedbackList();
  });
  document.getElementById('btn-feedback-back')?.addEventListener('click', () => {
    ui.showMenu('main');
  });
  document.getElementById('btn-feedback-submit')?.addEventListener('click', () => {
    const text = document.getElementById('feedback-text').value.trim();
    const type = document.getElementById('feedback-type').value;
    const status = document.getElementById('feedback-status');
    if (!text) { status.textContent = 'Please enter some text'; status.style.color = '#e88'; return; }
    try {
      const entries = JSON.parse(localStorage.getItem('bf_feedback') || '[]');
      entries.push({ type, text, date: new Date().toLocaleDateString() });
      localStorage.setItem('bf_feedback', JSON.stringify(entries));
      document.getElementById('feedback-text').value = '';
      status.textContent = 'Submitted! Thank you.';
      status.style.color = '#5a5';
      renderFeedbackList();
      setTimeout(() => { status.textContent = ''; }, 3000);
    } catch (_) { status.textContent = 'Failed to save feedback.'; status.style.color = '#e88'; }
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
  document.getElementById('btn-import-world').addEventListener('click', () => {
    document.getElementById('world-import-input').click();
  });
  document.getElementById('world-import-input').addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) importWorldFromFile(file);
    e.target.value = '';
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
    const mode = document.querySelector('#menu-create .mode-option.selected[data-mode]')?.dataset.mode || 'creative';
    const diff = document.querySelector('#menu-create .mode-option.selected[data-diff]')?.dataset.diff || 'normal';
    const terrain = document.querySelector('#terrain-select .mode-option.selected')?.dataset.terrain || 'normal';
    const isFlat = terrain === 'flat';
    const isAmplified = terrain === 'amplified';
    const isWeird = terrain === 'weird';
    const cheats = document.getElementById('input-cheats')?.checked ?? (mode === 'creative');
    const w = createWorld(name, seed, mode, diff, { flat: isFlat, amplified: isAmplified, weird: isWeird, cheats });
    startGame(w.id, w.seed, w.gamemode, w.difficulty, { flat: w.flat, amplified: w.amplified, weird: w.weird, cheats: w.cheats });
  });
  document.getElementById('btn-create-back').addEventListener('click', () => {
    ui.showMenu('worlds');
    renderWorldList();
  });

  // Mode select (game mode + difficulty + terrain are independent groups)
  document.querySelectorAll('.mode-option').forEach(el => {
    el.addEventListener('click', () => {
      let group;
      if (el.dataset.mode) group = 'mode';
      else if (el.dataset.diff) group = 'diff';
      else if (el.dataset.terrain) group = 'terrain';
      else return;
      const parent = el.closest('.mode-select') || el.parentElement;
      // Auto-tie the cheats checkbox to the chosen mode (creative → on,
      // survival → off). The player can flip it manually afterwards — it is
      // only chosen at world generation and locked in once the world exists.
      if (group === 'mode') {
        const chk = document.getElementById('input-cheats');
        if (chk) chk.checked = el.dataset.mode === 'creative';
      }
      parent.querySelectorAll(`.mode-option`).forEach(m => m.classList.remove('selected'));
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
  // (Tracks dynamic hybrid mode: shown again when a keyboard is used.)
  const _controlsBtn = document.getElementById('btn-open-controls');
  const updateControlsBtn = () => {
    if (!_controlsBtn) return;
    _controlsBtn.style.display = (mobile && mobile.isMobile) ? 'none' : '';
  };
  updateControlsBtn();
  window.addEventListener('mobile-mode-change', updateControlsBtn);
  _controlsBtn?.addEventListener('click', () => {
    if (mobile && mobile.isMobile) return;
    ui.showMenu('controls');
    renderControls();
  });
  document.getElementById('btn-controls-back').addEventListener('click', () => {
    if (_rebinding && _rebinding.handler) document.removeEventListener('keydown', _rebinding.handler, true);
    _rebinding = null;
    document.querySelectorAll('.key-btn').forEach(b => b.classList.remove('listening'));
    ui.showMenu('settings');
  });
  document.getElementById('btn-controls-reset').addEventListener('click', () => {
    if (_rebinding && _rebinding.handler) document.removeEventListener('keydown', _rebinding.handler, true);
    _rebinding = null;
    document.querySelectorAll('.key-btn').forEach(b => b.classList.remove('listening'));
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
    network.onLinkAccountResult = (msg) => {
      const hint = document.getElementById('link-creds-hint');
      if (msg.ok) {
        if (hint) hint.textContent = 'Linked ' + (msg.linkedUsername || '') + ' into your account!';
        showToast('Accounts linked!', '#5f5', 3);
        showLinkedAccounts();
      } else {
        const reason = msg.reason || 'Could not link that account.';
        if (hint) { hint.textContent = reason; hint.style.color = '#f55'; }
        showToast(reason, '#f44', 4);
      }
    };
    network.onUnlinkIdentityResult = (msg) => {
      if (msg.ok) {
        showToast('Unlinked ' + msg.identityType, '#ff0', 3);
        showLinkedAccounts();
      } else {
        showToast(msg.reason || 'Could not unlink.', '#f44', 4);
      }
    };
    network.onOwnAccountDetail = (msg) => { renderLinkedAccounts(msg); };
    network.onAccountDeleted = (msg) => {
      try { localStorage.removeItem('bf_login_pass'); localStorage.removeItem('bf_login_user'); } catch (_) {}
      playerName = 'Guest' + Math.floor(Math.random() * 9000 + 1000);
      addChatLine('Your account "' + (msg.username || '') + '" was deleted.', '#f99', true);
      const modal = document.getElementById('account-info-modal');
      if (modal) modal.style.display = 'none';
      ui.showMenu('login');
    };
    const credsForm = document.getElementById('link-creds-form');
    if (credsForm) credsForm.style.display = 'block';
    if (playerName) network.onConnectedOnce(() => network.getOwnAccount());
  }

  const allProviders = [
    { id: 'github', label: 'GitHub' },
    { id: 'google', label: 'Google' },
    { id: 'crazygames', label: 'CrazyGames' },
  ];
  function renderLinkedAccounts(msg) {
    if (!linkedAccountsList) return;
    const providers = allProviders;
    const links = msg.identities || {};
    let html = '';
    for (const p of providers) {
      const linked = links[p.id];
      const state = linked ? '<span style="color:#5f5">✓ Linked</span>' : '<span style="color:#888">Not linked</span>';
      const btn = linked
        ? `<button class="menu-btn" style="font-size:12px;padding:4px 12px;background:rgba(255,85,85,.15);border-color:#a44;" data-link-provider="${p.id}" data-action="unlink">Unlink</button>`
        : `<button class="menu-btn" style="font-size:12px;padding:4px 12px;" data-link-provider="${p.id}" data-action="link">Link</button>`;
      html += `<div class="settings-row" style="justify-content:space-between;">
        <span>${p.label}</span>
        <span>${state}</span>
        ${btn}
      </div>`;
    }
    const pwNote = msg.hasPassword
      ? 'Password login is active for this account'
      : 'No password set — use "Other username" below or the OAuth buttons to add login methods';
    html += `<div style="margin-top:10px;font-size:12px;color:#888;text-align:center;">${pwNote}</div>`;
    linkedAccountsList.innerHTML = html;
    linkedAccountsList.querySelectorAll('[data-link-provider]').forEach(btn => {
      btn.addEventListener('click', () => {
        const prov = btn.dataset.linkProvider;
        if (btn.dataset.action === 'unlink') {
          network.unlinkIdentity(prov);
          return;
        }
        const links2 = msg.identities || {};
        if (links2[prov]) return;
        _pendingLinkProvider = prov;
        if (prov === 'crazygames') {
          crazyGamesSDK().then(sdk => {
            if (!sdk) { showToast('Not on CrazyGames', '#ff0', 3); return; }
            const cgId = sdk.user?.getId?.() || sdk.user?.getUsername?.();
            if (cgId) network.linkIdentity('crazygames', cgId);
            else showToast('No CG identity found', '#f44', 3);
          });
        } else if (isOnCrazyGames()) {
          // On CG: use the official account link prompt before OAuth linking
          crazyGamesSDK().then(sdk => {
            if (!sdk || !sdk.user?.showAccountLinkPrompt) { network.startOAuthLink(prov); return; }
            sdk.user.showAccountLinkPrompt().then(resp => {
              if (resp && resp.response === 'yes') network.startOAuthLink(prov);
            }).catch(() => network.startOAuthLink(prov));
          });
        } else {
          network.startOAuthLink(prov);
        }
      });
    });
  }

  const btnLinkCreds = document.getElementById('btn-link-creds');
  if (btnLinkCreds) btnLinkCreds.addEventListener('click', () => {
    const u = document.getElementById('link-creds-username').value.trim().slice(0, 16);
    const p = document.getElementById('link-creds-password').value;
    const hint = document.getElementById('link-creds-hint');
    if (!u || !p) { if (hint) hint.textContent = 'Enter a username and password.'; return; }
    if (hint) { hint.textContent = 'Linking...'; hint.style.color = '#888'; }
    network.linkAccount(u, p);
  });

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
    try { audio.loadSfx(VERY_LOW_END); } catch (_) { console.warn("audio operation failed"); }
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
    try { window.CrazyGames?.SDK?.game?.setRoom?.(null); } catch (_) { console.warn("CG SDK setRoom failed"); }
    cgMidgameAd({
      adStarted() { audio.stopMusic(); audio.setMuted(true); },
      adFinished() { audio.setMuted(false); if (isParkour || isOneBlock || isBedwars || isBlockZones || isNights || isGunAffair || isSkyblock) showMinigames(); else showWorldList(); },
      adError() { audio.setMuted(false); if (isParkour || isOneBlock || isBedwars || isBlockZones || isNights || isGunAffair || isSkyblock) showMinigames(); else showWorldList(); },
    });
  });

  // --- Dev error log (view + copy captured errors) ---
  const errorLogPanel = document.getElementById('error-log-panel');
  const errorLogList = document.getElementById('elog-list');
  const errorLogCount = document.getElementById('elog-count');
  const btnPauseErrors = document.getElementById('btn-pause-errors');

  function renderErrorLog() {
    const errs = (window.__devErrors || []).slice().reverse();
    errorLogCount.textContent = errs.length ? `(${errs.length})` : '';
    errorLogList.innerHTML = '';
    if (!errs.length) {
      errorLogList.innerHTML = '<div class="elog-empty">No errors captured yet.</div>';
      return;
    }
    for (const e of errs) {
      const t = new Date(e.t).toLocaleTimeString();
      const item = document.createElement('div');
      item.className = 'elog-item';
      const meta = `${t}  ${e.type}  ${e.file ? e.file.replace(/^.*[\\/]/, '') : ''}${e.line ? ':' + e.line : ''}`;
      item.innerHTML = `<div class="elog-meta">${meta}</div>${(e.msg || '').replace(/</g, '&lt;')}${e.stack ? `<div class="elog-stack">${e.stack.split('\n').slice(0, 6).join('\n').replace(/</g, '&lt;')}</div>` : ''}`;
      errorLogList.appendChild(item);
    }
  }

    // Re-evaluate dev visibility whenever the pause menu opens, so the Errors
  // button appears once the dev has logged in (name/role land in localStorage
  // after auth, which may happen after initMenu has already run).
  refreshDevPauseBtn();
  document.getElementById('btn-pause-errors').addEventListener('click', () => {
    renderErrorLog();
    errorLogPanel.classList.add('active');
    if (window.CrazyGames?.SDK?.game?.haltGame) { try { window.CrazyGames.SDK.game.haltGame('errorlog'); } catch (_) {} }
  });
  const btnMenuErrors = document.getElementById('btn-menu-errors');
  if (btnMenuErrors) {
    btnMenuErrors.addEventListener('click', () => {
      renderErrorLog();
      errorLogPanel.classList.add('active');
      if (window.CrazyGames?.SDK?.game?.haltGame) { try { window.CrazyGames.SDK.game.haltGame('errorlog'); } catch (_) {} }
    });
  }
  document.getElementById('elog-close').addEventListener('click', () => {
    errorLogPanel.classList.remove('active');
    if (window.CrazyGames?.SDK?.game?.resumeGame) { try { window.CrazyGames.SDK.game.resumeGame(); } catch (_) {} }
  });
  const elogCopyBtn = document.getElementById('elog-copy');
  elogCopyBtn.addEventListener('click', async () => {
    const text = (window.__devErrors || []).map((e) => {
      const t = new Date(e.t).toLocaleString();
      return `[${t}] ${e.type}: ${e.msg}\n  ${e.file || ''}${e.line ? ':' + e.line : ''}${e.stack ? '\n' + e.stack : ''}`;
    }).join('\n\n');
    try {
      await navigator.clipboard.writeText(text);
      elogCopyBtn.textContent = 'Copied!';
      setTimeout(() => { elogCopyBtn.textContent = 'Copy All'; }, 1200);
    } catch (_) {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      elogCopyBtn.textContent = 'Copied!';
      setTimeout(() => { elogCopyBtn.textContent = 'Copy All'; }, 1200);
    }
  });
  document.getElementById('elog-clear').addEventListener('click', () => {
    window.__devErrors = [];
    renderErrorLog();
  });
  errorLogPanel.addEventListener('click', (ev) => { if (ev.target === errorLogPanel) errorLogPanel.classList.remove('active'); });

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
    try { window.CrazyGames?.SDK?.game?.setRoom?.(null); } catch (_) { console.warn("CG SDK setRoom failed"); }
    cgMidgameAd({
      adStarted() { audio.stopMusic(); audio.setMuted(true); },
      adFinished() { audio.setMuted(false); if (isParkour || isOneBlock || isBedwars || isBlockZones || isNights || isGunAffair || isSkyblock) showMinigames(); else deathQuitToMenu(); },
      adError() { audio.setMuted(false); if (isParkour || isOneBlock || isBedwars || isBlockZones || isNights || isGunAffair || isSkyblock) showMinigames(); else deathQuitToMenu(); },
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
          const url = network.serverUrl || BACKEND_URL;
          network.onConnectedOnce(() => {
            const pass = _xorDecode(localStorage.getItem('bf_login_pass') || '') || '';
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
    } else if (msg.type === 'dev_ban_result') {
      if (!msg.ok) { addChatLine(`Ban error: ${msg.reason}`, '#f55'); return; }
      addChatLine(`${msg.target} banned${msg.duration} — ${msg.reason}`, '#f55');
      if (devSelectedAccount) network.devGetAccount(devSelectedAccount);
    } else if (msg.type === 'dev_unban_result') {
      if (!msg.ok) { addChatLine(`Unban error: ${msg.reason}`, '#f55'); return; }
      addChatLine(`${msg.target} unbanned`, '#5f5');
    }
  };

  // Dev panel back
  const devBackBtn = document.getElementById('dev-panel-back');
  if (devBackBtn) {
    devBackBtn.addEventListener('click', () => ui.showMenu('main'));
  }

  function setDevAccountListMsg(text) {
    const list = document.getElementById('dev-account-list');
    if (list) list.innerHTML = `<div class="dev-empty">${escHtml(text)}</div>`;
  }

  function renderDevAccountList() {
    const list = document.getElementById('dev-account-list');
    if (!list) return;
    const search = (document.getElementById('dev-account-search')?.value || '').toLowerCase();
    const filtered = devAccountsCache.filter(a => a.username.toLowerCase().includes(search));
    if (filtered.length === 0) {
      list.innerHTML = '<div class="dev-empty">No accounts found</div>';
      return;
    }
    list.innerHTML = filtered.map(a => {
      const isDev = a.role === 'dev' || a.role === 'gamedev' || a.role === 'owner';
      const roleColor = a.role === 'gamedev' ? '#0ff' : a.role === 'owner' ? '#fa0' : a.role === 'dev' ? '#5af' : '#888';
      const roleBg = a.role === 'gamedev' ? 'rgba(0,200,200,0.15)' : a.role === 'owner' ? 'rgba(255,170,0,0.15)' : a.role === 'dev' ? 'rgba(80,150,255,0.15)' : 'rgba(100,100,120,0.15)';
      const tagDisplay = a.tag ? `<span style="color:#5f5;font-size:10px;"> [${escHtml(a.tag)}]</span>` : '';
      const sel = devSelectedAccount === a.username ? ' selected' : '';
      return `<div data-username="${escHtml(a.username)}" class="dev-account-item${sel}">
        <span style="color:${roleColor};font-weight:bold;">${isDev ? '★' : '·'}</span>
        <span>${escHtml(a.username)}${tagDisplay}</span>
        <span class="role-badge" style="margin-left:auto;color:${roleColor};background:${roleBg};">${a.role.toUpperCase()}</span>
      </div>`;
    }).join('');
    list.querySelectorAll('[data-username]').forEach(el => {
      el.addEventListener('click', () => {
        const username = el.dataset.username;
        devSelectedAccount = username;
        list.querySelectorAll('[data-username]').forEach(e => e.classList.remove('selected'));
        el.classList.add('selected');
        const detail = document.getElementById('dev-account-detail');
        if (detail) { detail.style.display = 'block'; detail.innerHTML = '<div class="dev-empty">Loading...</div>'; }
        network.devGetAccount(username);
      });
    });
  }

  function renderDevAccountDetail(data) {
    const detail = document.getElementById('dev-account-detail');
    if (!detail) return;
    if (data.error) {
      detail.innerHTML = `<div class="dev-empty" style="color:#f55;">${escHtml(data.error)}</div>`;
      return;
    }
    const isDevRole = data.role === 'dev' || data.role === 'gamedev' || data.role === 'owner';
    const roleColor = data.role === 'gamedev' ? '#0ff' : data.role === 'owner' ? '#fa0' : data.role === 'dev' ? '#5af' : '#888';
    const stats = data.stats || {};
    const playTime = stats.playTime ? Math.round(stats.playTime / 60) + 'm' : '—';
    const blocksBroken = stats.totalBlocksBroken || stats.blocksBrokenAny || 0;
    const deaths = stats.deaths || 0;
    const mobKills = stats.mobKillsAny || 0;
    const distance = stats.distanceTraveled ? Math.round(stats.distanceTraveled) : 0;
    const distLabel = distance > 1000 ? (distance / 1000).toFixed(1) + 'k' : distance;

    detail.innerHTML = `
      <div class="dev-detail-header">
        <span style="color:${roleColor};">●</span>
        ${escHtml(data.username)}
      </div>
      <div class="dev-detail-row">
        <label>Role</label>
        <div style="display:flex;gap:6px;align-items:center;">
          <span class="value" style="color:${roleColor};font-weight:bold;">${data.role.toUpperCase()}</span>
          ${data.role !== 'owner' && data.role !== 'gamedev' ? `
            <button id="dev-role-promote" class="dev-detail-btn primary">${isDevRole ? 'DEMOTE' : 'PROMOTE'}</button>
          ` : ''}
        </div>
      </div>
      <div class="dev-detail-row">
        <label>Tag</label>
        <div style="display:flex;gap:4px;align-items:center;flex:1;">
          <input id="dev-tag-input" class="dev-detail-input" type="text" placeholder="Set tag..." maxlength="20" value="${escHtml(data.tag || '')}" style="flex:1;" />
          <button id="dev-tag-save" class="dev-detail-btn green">SAVE</button>
        </div>
      </div>
      <div style="margin-top:8px;">
        <div style="font:bold 10px monospace;color:#5af;margin-bottom:6px;">STATS</div>
        <div class="dev-stats-pill" style="flex-wrap:wrap;">
          <span><span class="sl">⏱ </span><span class="sv">${playTime}</span></span>
          <span><span class="sl">🧱 </span><span class="sv">${blocksBroken}</span></span>
          <span><span class="sl">⚔️ </span><span class="sv">${mobKills}</span></span>
          <span><span class="sl">💀 </span><span class="sv red">${deaths}</span></span>
          <span><span class="sl">🏃 </span><span class="sv">${distLabel}</span></span>
        </div>
      </div>
      <div style="margin-top:8px;">
        <div style="font:bold 10px monospace;color:#5af;margin-bottom:4px;">ACHIEVEMENTS</div>
        <div class="dev-achievements">
          ${Object.entries(stats).filter(([k]) => k !== 'playTime' && k !== 'totalBlocksBroken' && k !== 'deaths' && k !== 'mobKillsAny' && k !== 'distanceTraveled').map(([k, v]) => {
            if (typeof v === 'number' && v > 0) return `<div>${k}: ${v}</div>`;
            return '';
          }).filter(Boolean).join('') || '<span style="color:#556;">No data</span>'}
        </div>
      </div>
      ${data.username !== 'LogicLeague' && data.role !== 'gamedev' ? `
      <div style="margin-top:10px;padding-top:8px;border-top:1px solid rgba(255,60,60,0.15);display:flex;gap:6px;">
        <button id="dev-ban-player" class="dev-detail-btn red" style="flex:1;font-size:10px;">⏱ BAN</button>
        <button id="dev-delete-account" class="dev-detail-btn red" style="flex:1;font-size:10px;">DELETE</button>
      </div>` : ''}
    `;

    const tagSave = detail.querySelector('#dev-tag-save');
    if (tagSave) {
      tagSave.addEventListener('click', () => {
        const input = detail.querySelector('#dev-tag-input');
        const val = (input?.value || '').trim();
        network.devSetTag(data.username, val);
      });
    }

    const roleBtn = detail.querySelector('#dev-role-promote');
    if (roleBtn) {
      roleBtn.addEventListener('click', () => {
        const newRole = isDevRole ? 'player' : 'dev';
        network.devSetRole(data.username, newRole);
      });
    }

    const banBtn = detail.querySelector('#dev-ban-player');
    if (banBtn) {
      banBtn.addEventListener('click', () => {
        const modal = document.getElementById('dev-ban-modal');
        const targetEl = document.getElementById('ban-target-name');
        if (modal && targetEl) {
          targetEl.textContent = data.username;
          modal.style.display = 'flex';
          _banSelectedMs = 0;
          _banTargetName = data.username;
          document.getElementById('ban-duration-label').textContent = 'Select a duration above';
          document.querySelectorAll('.dev-ban-dur').forEach(b => b.style.borderColor = '');
        }
      });
    }

    const deleteBtn = detail.querySelector('#dev-delete-account');
    if (deleteBtn) {
      deleteBtn.addEventListener('click', () => {
        if (confirm(`Are you sure you want to delete "${data.username}"? This cannot be undone.`)) {
          network.devDeleteAccount(data.username);
        }
      });
    }
  }

  let _banSelectedMs = 0;
  let _banTargetName = '';

  // Ban modal duration buttons
  document.querySelectorAll('.dev-ban-dur').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.dev-ban-dur').forEach(b => b.style.borderColor = '');
      btn.style.borderColor = 'rgba(255,80,80,0.6)';
      _banSelectedMs = parseInt(btn.dataset.ms) || 0;
      const label = document.getElementById('ban-duration-label');
      if (_banSelectedMs === 0) label.textContent = 'Permanent ban';
      else if (_banSelectedMs >= 604800000) label.textContent = Math.round(_banSelectedMs / 86400000) + ' days';
      else if (_banSelectedMs >= 86400000) label.textContent = Math.round(_banSelectedMs / 3600000) + ' hours';
      else label.textContent = Math.round(_banSelectedMs / 60000) + ' minutes';
    });
  });

  // Ban confirm
  const banConfirm = document.getElementById('ban-confirm-btn');
  if (banConfirm) {
    banConfirm.addEventListener('click', () => {
      if (!_banTargetName) return;
      const reason = (document.getElementById('ban-reason-input')?.value || '').trim();
      network.devTimedBan(_banTargetName, _banSelectedMs, reason);
      document.getElementById('dev-ban-modal').style.display = 'none';
      document.getElementById('ban-reason-input').value = '';
    });
  }

  // Ban cancel
  const banCancel = document.getElementById('ban-cancel-btn');
  if (banCancel) {
    banCancel.addEventListener('click', () => {
      document.getElementById('dev-ban-modal').style.display = 'none';
      document.getElementById('ban-reason-input').value = '';
    });
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
        network.connect(BACKEND_URL);
        network.onConnectedOnce(() => {
          createDevWorldMultiplayer(roomName, seed, _dwState.mode, _dwState.diff, _dwState.terrain, maxP);
        });
      } else {
        createDevWorldMultiplayer(roomName, seed, _dwState.mode, _dwState.diff, _dwState.terrain, maxP);
      }
    } else {
      // Single-player dev world
      const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
      const dwOpts = { flat: _dwState.terrain === 'flat', void: _dwState.terrain === 'void', dev: true };
      createWorld(name, seed, _dwState.mode, _dwState.diff, dwOpts);
      startGame(id, seed, _dwState.mode, _dwState.diff, dwOpts);
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

  _refreshDevButtons();

  function setLoginDisabled(disabled) {
    if (loginCreateBtn) loginCreateBtn.disabled = disabled;
    if (loginGoBtn) loginGoBtn.disabled = disabled;
  }

  function showOfflineFallback() {
    // Server unreachable — just go to main menu with the username set.
    // Multiplayer/DMs will show a friendly "connect to WiFi" message when attempted.
    ui.showMenu('main');
    setLoginDisabled(false);
  }

  function doLogin(mode) {
    clearToast();
    if (isUnder13Blocked()) {
      loginHint.style.color = '#f85'; loginHint.textContent = 'Accounts require players to be 13 or older.';
      return;
    }
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
      network.connect(BACKEND_URL);
      network.onConnectedOnce(attempt);
      setTimeout(() => { if (!network.connected) showOfflineFallback(); }, 6000);
    } else {
      attempt();
    }
  }
  if (loginCreateBtn) loginCreateBtn.addEventListener('click', () => doLogin('register'));
  if (loginGoBtn) loginGoBtn.addEventListener('click', () => doLogin('login'));
  if (loginPass) loginPass.addEventListener('keydown', (e) => { if (e.key === 'Enter') doLogin('login'); });

  // Pre-fill username from player-link URL params or saved storage (NOT password —
  // prevents Safari auto-submit). Silent auto-login (skipping the login screen)
  // only happens when it's clearly intended: a returning CrazyGames user (CG
  // account-integration rule), or a player-specific link that exactly matches the
  // saved account. Everywhere else the login screen is shown, pre-filled.
  // v3: bot gate — on the regular website you can only enter through a
  // legitimate flow. Correct credentials issue a one-time entry token and
  // reload into the main menu. Direct loads, copy-pasted links and manual
  // reloads have no token and are sent to the login screen (blocked).
  console.debug('bf-auth-v3');
  let autoLogin = false;
  let fromU = false;
  let entryToken = false;
  let savedName = '';
  let savedPass = '';
  let oauthProvider = '';
  let oauthProviderId = '';
  try {
    entryToken = sessionStorage.getItem('bf_entry_token') === '1';
    if (entryToken) sessionStorage.removeItem('bf_entry_token');
    fromU = sessionStorage.getItem('bf_from_u') === '1';
    if (fromU) sessionStorage.removeItem('bf_from_u');
    const params = new URLSearchParams(location.search);
    const urlUser = params.get('user');
    savedName = localStorage.getItem('bf_player_name') || localStorage.getItem('bf_login_user') || '';
    const targetUser = urlUser || savedName;
    if (targetUser && !targetUser.startsWith('Guest') && loginUser) loginUser.value = targetUser;
    savedPass = _xorDecode(localStorage.getItem('bf_login_pass') || '') || '';
    oauthProvider = localStorage.getItem('bf_oauth_provider') || '';
    oauthProviderId = localStorage.getItem('bf_oauth_provider_id') || '';
    const hasSavedCreds = savedName && !savedName.startsWith('Guest') && savedPass && savedPass.length >= 3;
    const hasOauthCreds = savedName && !savedName.startsWith('Guest') && oauthProvider && oauthProviderId;
    // Only trust saved credentials when the saved account is the one this link targets.
    const credsMatchTarget = savedName && targetUser && savedName.toLowerCase() === targetUser.toLowerCase();
    if (credsMatchTarget) loginPass.value = savedPass || '';
    // Player-specific link / login reload that matches the saved account and
    // carries a fresh entry token → enter directly.
    if (entryToken && credsMatchTarget && (hasOauthCreds || hasSavedCreds) && !isUnder13Blocked()) autoLogin = true;
    // Returning CrazyGames users are auto-logged-in via their saved identity.
    if (isOnCrazyGames() && (hasOauthCreds || hasSavedCreds) && !isUnder13Blocked()) autoLogin = true;
  } catch (_) { console.warn("operation failed"); }
  if (autoLogin) {
    // Skip login screen entirely — go straight to main menu after auth
    window._autoLoggingIn = true;
    _backgroundAuth = true;
    _autoRegisterFallback = true;
    ui.showMenu('main');
    setTimeout(() => {
      if (oauthProvider && oauthProviderId && !(savedPass && savedPass.length >= 3)) {
        // OAuth/CrazyGames users have no password — silently re-auth via identity.
        playerName = savedName;
        setSkinUser(playerName);
        cloudSet('bf_player_name', playerName);
        const attempt = () => network.sendIdentityAuth(oauthProvider, oauthProviderId, playerName);
        if (!network.connected) {
          network.connect(BACKEND_URL);
          network.onConnectedOnce(attempt);
          setTimeout(() => { if (!network.connected) showOfflineFallback(); }, 6000);
        } else {
          attempt();
        }
      } else {
        doLogin('login');
      }
    }, 100);
  } else {
    ui.showMenu('login');
  }
  showOneTimeMessages();
  showConsentNotice();
  crazyGamesSDK().then((sdk) => {
    if (!sdk) return;
    try {
      const cgName = sdk.user?.getUsername?.();
      if (cgName) {
        const ni = document.getElementById('login-username');
        if (ni && !ni.value) ni.value = cgName;
      }
      // Returning CrazyGames users are auto-logged-in (account integration
      // requirement: "returning logged in CrazyGames users are automatically
      // logged in within your game").
      const cgId = sdk.user?.getId?.();
      if (cgId && !autoLogin) {
        window._autoLoggingIn = true;
        _backgroundAuth = true;
        ui.showMenu('main');
        cgLoginFlow(cgId, cgName, true);
      }
    } catch (_) { console.warn("operation failed"); }
  });

  // Show password form and CrazyGames login on both CG and the regular website.
  const loginAccountSection = document.getElementById('login-account-section');
  const loginCgSection = document.getElementById('login-cg-section');
  if (loginAccountSection) loginAccountSection.style.display = '';
  if (loginCgSection) loginCgSection.style.display = '';

  // Social login buttons always visible (GitHub/Google work everywhere).

  // --- Social + CG login handlers ---
  // Shared CrazyGames auth flow. `silent` suppresses error toasts so it can run
  // automatically at boot (no confusing popups for auto-logged-in users).
  function cgLoginFlow(cgId, cgName, silent) {
    const serverUrl = BACKEND_URL.replace(/^wss?:\/\//, 'https://');
    fetch(`${serverUrl}/auth/crazygames`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cgUserId: cgId || cgName, cgUsername: cgName || 'Player' }),
    })
      .then(r => r.json())
      .then(data => {
        if (!data.ok) { if (!silent) showToast('CG auth failed: ' + (data.reason || ''), '#f44', 4); return; }
        playerName = filterProfanity(data.username) || 'Player';
        setSkinUser(playerName);
        cloudSet('bf_player_name', playerName);
        try { localStorage.setItem('bf_oauth_provider', 'crazygames'); localStorage.setItem('bf_oauth_provider_id', data.providerId || playerName); } catch (_) { console.warn("localStorage write failed"); }
        const attempt = () => network.sendIdentityAuth('crazygames', data.providerId || playerName, playerName);
        if (!network.connected) {
          network.connect(BACKEND_URL);
          network.onConnectedOnce(attempt);
          setTimeout(() => { if (!network.connected) showOfflineFallback(); }, 6000);
        } else {
          attempt();
        }
      })
      .catch(() => { if (!silent) showToast('CG auth network error', '#f44', 4); });
  }

  function doCgLogin() {
    clearToast();
    crazyGamesSDK().then((sdk) => {
      if (!sdk) { showToast('Sorry, you\'re not on CrazyGames. This button is for CrazyGames users only.', '#fa0', 5); return; }
      try {
        const cgName = sdk.user?.getUsername?.();
        const cgId = sdk.user?.getId?.();
        if (!cgId && !cgName) { showToast('CrazyGames: could not get user info. Make sure you are logged into CrazyGames.', '#f85', 5); return; }
        cgLoginFlow(cgId, cgName, false);
      } catch (_) { console.warn("operation failed"); }
    });
  }

  function startOAuth(provider) {
    const serverUrl = BACKEND_URL.replace(/^wss?:\/\//, 'https://');
    const origin = window.location.origin;

    // On CrazyGames: auto-link OAuth identity with the CG account
    if (isOnCrazyGames()) {
      crazyGamesSDK().then(sdk => {
        if (!sdk) { openOAuthPopup(provider, serverUrl, origin); return; }
        const cgId = sdk.user?.getId?.();
        const cgName = sdk.user?.getUsername?.();
        if (!cgId) { openOAuthPopup(provider, serverUrl, origin); return; }
        fetch(`${serverUrl}/auth/cg-link`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cgUserId: cgId, cgUsername: cgName || 'Player' }),
        })
          .then(r => r.json())
          .then(data => {
            if (data.ok && data.linkToken) {
              openOAuthPopup(provider, serverUrl, origin, data.linkToken);
            } else {
              openOAuthPopup(provider, serverUrl, origin);
            }
          })
          .catch(() => openOAuthPopup(provider, serverUrl, origin));
      });
      return;
    }

    openOAuthPopup(provider, serverUrl, origin);
  }

  function openOAuthPopup(provider, serverUrl, origin, linkToken) {
    const url = `${serverUrl}/auth/${provider}?origin=${encodeURIComponent(origin)}${linkToken ? '&linkToken=' + linkToken : ''}`;
    const popup = window.open(url, 'oauth', 'width=600,height=700');
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

        // If already linked (CG auto-merge or existing link), skip name prompt
        if (e.data.linked) {
          playerName = suggestedName;
          setSkinUser(playerName);
          cloudSet('bf_player_name', playerName);
          try { localStorage.setItem('bf_oauth_provider', provider); localStorage.setItem('bf_oauth_provider_id', providerId); } catch (_) { console.warn("localStorage write failed"); }
          const attempt = () => network.sendIdentityAuth(provider, providerId, playerName);
          if (!network.connected) {
            network.connect(BACKEND_URL);
            network.onConnectedOnce(attempt);
            setTimeout(() => { if (!network.connected) showOfflineFallback(); }, 6000);
          } else {
            attempt();
          }
          return;
        }

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
            cloudSet('bf_player_name', playerName);
            try { localStorage.setItem('bf_oauth_provider', provider); localStorage.setItem('bf_oauth_provider_id', providerId); } catch (_) { console.warn("localStorage write failed"); }
            promptEl.style.display = 'none';
            const attempt = () => network.sendIdentityAuth(provider, providerId, playerName);
            if (!network.connected) {
              network.connect(BACKEND_URL);
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
          cloudSet('bf_player_name', playerName);
          try { localStorage.setItem('bf_oauth_provider', provider); localStorage.setItem('bf_oauth_provider_id', providerId); } catch (_) { console.warn("localStorage write failed"); }
          const attempt = () => network.sendIdentityAuth(provider, providerId, playerName);
          if (!network.connected) {
            network.connect(BACKEND_URL);
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
    cloudSet('bf_player_name', playerName);
    const attempt = () => network.sendIdentityAuth('guest', playerName, playerName);
    if (!network.connected) {
      network.connect(BACKEND_URL);
      network.onConnectedOnce(attempt);
      setTimeout(() => { if (!network.connected) showOfflineFallback(); }, 6000);
    } else {
      attempt();
    }
  });

  // Platform-aware footer links: point at our own Terms/Privacy ONLY when NOT
  // running on the real CrazyGames domain. On CG, hide them entirely since
  // relative URLs don't exist on CrazyGames' domain and external links are
  // prohibited.
  if (isOnCrazyGames()) {
    try {
      const footer = document.querySelector('#login-screen span[style*="font-size:9px"]');
      if (footer) footer.style.display = 'none';
    } catch (_) {}
  } else {
    try {
      const terms = document.getElementById('footer-terms');
      const privacy = document.getElementById('footer-privacy');
      if (terms) { terms.href = './terms.html'; terms.textContent = 'Terms'; }
      if (privacy) { privacy.href = './privacy.html'; privacy.textContent = 'Privacy Policy'; }
    } catch (_) { console.warn("operation failed"); }
  }

  // CrazyGames account rules: "Logging out in the game and allowing login with
  // external login options (e.g. Facebook, Google, email) is not allowed."
  // On the CrazyGames build we hide the username/password form and the GitHub/
  // Google OAuth buttons, keeping only Login with CrazyGames + Play as Guest.
  // We also hide buttons that open separate pages (Portal, Account Info, Browse
  // Mods), since those relative URLs don't exist on CrazyGames' domain.
  if (isOnCrazyGames()) {
    try {
      const accSection = document.getElementById('login-account-section');
      if (accSection) accSection.style.display = 'none';
      const ghBtn = document.getElementById('btn-login-github');
      if (ghBtn) ghBtn.style.display = 'none';
      const glBtn = document.getElementById('btn-login-google');
      if (glBtn) glBtn.style.display = 'none';
      const portalBtn = document.getElementById('btn-blockforge-portal');
      if (portalBtn) portalBtn.style.display = 'none';
      const accInfoBtn = document.getElementById('btn-account-info');
      if (accInfoBtn) accInfoBtn.style.display = 'none';
      const browseModsBtn = document.getElementById('btn-mod-browse');
      if (browseModsBtn) browseModsBtn.style.display = 'none';
    } catch (_) { console.warn("operation failed"); }
  }
}

function showConsentNotice() {
  // CrazyGames User Consent requirement: games that collect personal data
  // beyond the SDK's events must show a Terms & Conditions / Privacy Policy
  // notice to new players. We collect a username, hashed password and game
  // progress via our own backend, so show a simple non-blocking notice once.
  let acked = false;
  try { acked = !!localStorage.getItem('bf_consent_ack'); } catch (_) {}
  if (acked) return;
  const onCG = isOnCrazyGames();
  const base = onCG ? '' : '';
  const el = document.createElement('div');
  el.id = 'consent-notice';
  el.style.cssText = 'position:fixed;left:12px;right:12px;bottom:12px;z-index:99999;background:rgba(10,12,20,0.96);border:1px solid rgba(120,140,200,0.4);border-radius:10px;padding:12px 16px;font:12px/1.5 system-ui,sans-serif;color:#ddd;box-shadow:0 6px 24px rgba(0,0,0,0.5);max-width:560px;margin:0 auto;';
  const p = document.createElement('p');
  p.style.margin = '0 0 8px';
  p.appendChild(document.createTextNode('BlockForge stores your username, a hashed password and your in-game progress to keep your saves across devices. By playing you agree to our '));
  if (onCG) {
    const tSpan = document.createElement('span');
    tSpan.textContent = 'Terms';
    tSpan.style.color = '#8af';
    p.appendChild(tSpan);
    p.appendChild(document.createTextNode(' and '));
    const pvSpan = document.createElement('span');
    pvSpan.textContent = 'Privacy Policy';
    pvSpan.style.color = '#8af';
    p.appendChild(pvSpan);
  } else {
    const t = document.createElement('a');
    t.href = base + '/terms.html';
    t.target = '_blank';
    t.rel = 'noopener';
    t.textContent = 'Terms';
    t.style.color = '#8af';
    p.appendChild(t);
    p.appendChild(document.createTextNode(' and '));
    const pv = document.createElement('a');
    pv.href = base + '/privacy.html';
    pv.target = '_blank';
    pv.rel = 'noopener';
    pv.textContent = 'Privacy Policy';
    pv.style.color = '#8af';
    p.appendChild(pv);
  }
  p.appendChild(document.createTextNode('.'));
  const btn = document.createElement('button');
  btn.textContent = 'Got it';
  btn.style.cssText = 'background:#2a3f5f;color:#fff;border:none;border-radius:6px;padding:6px 14px;font:12px system-ui,sans-serif;cursor:pointer;';
  btn.onclick = () => {
    try { localStorage.setItem('bf_consent_ack', '1'); } catch (_) {}
    el.remove();
  };
  el.appendChild(p);
  el.appendChild(btn);
  document.body.appendChild(el);
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
    cloudSet('bf_player_name', playerName);
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

function showWorldList() {
  gameRunning = false;
  ui.showMenu('worlds');
  renderWorldList();
}

function showMinigames() {
  gameRunning = false;
  isParkour = false;
  isOneBlock = false;
  isBedwars = false;
  isBlockZones = false;
  isNights = false;
  isGunAffair = false;
  isSkyblock = false;
  clearOneBlockState();
  clearBlockZones();
  clearNights();
  clearGunAffair();
  clearSkyblock();
  clearLiquid();
  const _obHud = document.getElementById('oneblock-hud');
  if (_obHud) _obHud.remove();
  _oneBlockEl = null;
  bwGameOver = false;
  bwWinTeamKey = null;
  bwSpec = false;
  bwMap = null;
  bwGens = [];
  bwBeds = {};
  bwMyTeamKey = null;
  bwMyTeam = null;
  const _bwHud = document.getElementById('bedwars-hud');
  if (_bwHud) _bwHud.remove();
  const _bwShop = document.getElementById('bedwars-shop');
  if (_bwShop) _bwShop.remove();
  bwHudEl = null;
  ui.showMenu('minigames');
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
        ${w.cheats ? '<span class="wc-mode" style="background:rgba(76,175,80,0.18);border-color:rgba(76,175,80,0.5);color:#9be89b;">⚡ CHEATS</span>' : ''}
        <button class="wc-export" title="Export world">&darr;</button>
        <button class="wc-delete" title="Delete world">&times;</button>
      </div>
    `;
    card.querySelector('.wc-export').addEventListener('click', (e) => {
      e.stopPropagation();
      exportWorld(w);
    });
    card.querySelector('.wc-delete').addEventListener('click', (e) => {
      e.stopPropagation();
      deleteWorld(w.id);
      renderWorldList();
    });
    card.addEventListener('click', () => {
      startGame(w.id, w.seed, w.gamemode, w.difficulty, { flat: !!w.flat, amplified: !!w.amplified, weird: !!w.weird, cheats: w.cheats });
    });
    list.appendChild(card);
  }
}

// Export a world to a downloadable .json file.
function showWorldToast(msg, ok = true) {
  const el = document.getElementById('world-toast');
  if (!el) return;
  el.textContent = msg;
  el.style.color = ok ? '#0fc' : '#f55';
  el.style.borderColor = ok ? 'rgba(0,255,204,0.4)' : 'rgba(255,85,85,0.4)';
  el.style.opacity = '1';
  clearTimeout(el._t);
  el._t = setTimeout(() => { el.style.opacity = '0'; }, 3500);
}

function exportWorld(w) {
  const data = loadWorld(w.id);
  const file = JSON.stringify({
    blockforge: 1,
    name: w.name,
    seed: w.seed,
    gamemode: w.gamemode,
    difficulty: w.difficulty,
    flat: !!w.flat,
    cheats: w.cheats,
    createdAt: w.createdAt,
    world: data || { seed: w.seed, edits: {} },
  }, null, 2);
  const blob = new Blob([file], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'BlockForge-' + (w.name || 'world').replace(/[^\w\- ]+/g, '').trim().replace(/\s+/g, '-') + '.json';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
  showWorldToast('Exported: ' + w.name + ' (save this .json file)', true);
}

// Import a world from an exported .json file (or any valid { seed, edits } object).
function importWorldFromFile(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result));
      let meta = null, data = null;
      if (parsed && parsed.blockforge === 1 && parsed.world) {
        meta = parsed;
        data = parsed.world;
      } else if (parsed && typeof parsed === 'object' && 'seed' in parsed && 'edits' in parsed) {
        meta = { name: parsed.name || 'Imported World', seed: parsed.seed, gamemode: parsed.gamemode || 'creative', difficulty: parsed.difficulty || 'normal', flat: !!parsed.flat, cheats: parsed.cheats !== false };
        data = parsed;
      }
      if (!data || typeof data !== 'object' || !('seed' in data && 'edits' in data)) {
        throw new Error('Not a valid BlockForge world file');
      }
      let seed = data.seed ?? meta.seed;
      if (typeof seed !== 'number') {
        let h = 0;
        const s = String(seed);
        for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
        seed = h || 1;
      }
      const world = createWorld(meta.name || 'Imported World', seed, meta.gamemode || 'creative', meta.difficulty || 'normal', { flat: !!meta.flat, cheats: meta.cheats });
      saveWorld(world.id, data);
      renderWorldList();
      showWorldToast('World imported: ' + (meta.name || 'Imported World'), true);
    } catch (e) {
      showWorldToast('Import failed: invalid world file', false);
    }
  };
  reader.readAsText(file);
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
      startGame(w.id, w.seed, w.gamemode, w.difficulty, { flat: !!w.flat, void: !!w.void, dev: !!w.dev });
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

function renderOneBlockWorldList() {
  const list = document.getElementById('oneblock-world-list');
  if (!list) return;
  const worlds = getOneBlockWorldList();
  list.innerHTML = '';
  if (worlds.length === 0) {
    list.innerHTML = '<div style="color:#777;font-size:12px;padding:20px;">No OneBlock worlds yet. Start one!</div>';
    return;
  }
  for (const w of worlds) {
    const card = document.createElement('div');
    card.className = 'world-card';
    const date = new Date(w.createdAt).toLocaleDateString();
    const save = loadWorld(w.id);
    const blocks = (save && save.oneblock && save.oneblock.count != null) ? save.oneblock.count : 0;
    card.innerHTML = `
      <div class="wc-info">
        <div class="wc-name">${escHtml(w.name)}</div>
        <div class="wc-meta">Seed: ${w.seed} &middot; ${date} &middot; ${blocks} blocks broken</div>
      </div>
      <div style="display:flex;align-items:center;gap:6px;">
        <span class="wc-mode survival">ONEBLOCK</span>
        <button class="wc-delete" title="Delete world">&times;</button>
      </div>
    `;
    card.querySelector('.wc-delete').addEventListener('click', (e) => {
      e.stopPropagation();
      deleteWorld(w.id, false, false, true);
      renderOneBlockWorldList();
    });
    card.addEventListener('click', () => {
      startGame(w.id, w.seed, 'survival', 'peaceful', { oneblock: true, void: true });
    });
    list.appendChild(card);
  }
}

// --- Main-menu music player widget -----------------------------------------
const musicPlayerEl = document.getElementById('music-player');
const musicTrackEl = document.getElementById('music-track-name');
const musicToggleBtn = document.getElementById('music-toggle');
let musicPollTimer = null;
const TRACK_DISPLAY_NAMES = {
  'Music/calm-ambient-3.m4a': 'Calm Ambient 3',
  'Music/catmint.m4a': 'Catmint',
  'Music/forget-me-not.m4a': 'Forget Me Not',
  'Music/somnium.m4a': 'Somnium',
  'Music/daydream.m4a': 'Daydream',
  'Music/restful-meadow.m4a': 'Restful Meadow',
  'Music/soft-piano-emotional-1.m4a': 'Soft Piano 1',
  'Music/piano-emotional-101.m4a': 'Piano Emotional 101',
  'Music/piano-emotional-solo-139.m4a': 'Piano Emotional Solo 139',
  'Music/piano-melody-solo-17.m4a': 'Piano Melody Solo 17',
  'Music/piano-melody-solo-19.m4a': 'Piano Melody Solo 19',
  'Music/bluebonnet.m4a': 'Bluebonnet',
};

function trackDisplayName(url) {
  return (url && TRACK_DISPLAY_NAMES[url]) || (url ? url.split('/').pop().replace(/\.[^.]+$/, '').replace(/-/g, ' ') : '—');
}

function updateMusicWidget() {
  if (!musicPlayerEl || !musicTrackEl) return;
  try {
    const cur = audio ? audio.getCurrentTrack() : null;
    if (cur && cur.title) {
      musicTrackEl.textContent = trackDisplayName(cur.title);
    } else {
      musicTrackEl.textContent = 'Music starting…';
    }
  } catch (_) { musicTrackEl.textContent = '—'; }
  const playing = !!(audio && audio._musicCurrentSrc && audio._musicPlaying);
  if (musicToggleBtn) musicToggleBtn.textContent = playing ? '⏸' : '▶';
}

function refreshMusicWidget() {
  updateMusicWidget();
}

function showMusicPlayer(show) {
  if (!musicPlayerEl) { if (musicPollTimer) { clearInterval(musicPollTimer); musicPollTimer = null; } return; }
  musicPlayerEl.style.display = show ? 'block' : 'none';
  if (show) {
    updateMusicWidget();
    if (!musicPollTimer) {
      musicPollTimer = setInterval(() => {
        // Only refresh the track name on change to avoid pointless DOM churn.
        try {
          const cur = audio ? audio.getCurrentTrack() : null;
          const t = (cur && cur.title) ? trackDisplayName(cur.title) : '';
          if (musicTrackEl.textContent !== t) musicTrackEl.textContent = t || 'Music starting…';
          const playing = !!(audio && audio._musicCurrentSrc && audio._musicPlaying);
          if (musicToggleBtn && ((playing && musicToggleBtn.textContent !== '⏸') || (!playing && musicToggleBtn.textContent !== '▶'))) {
            musicToggleBtn.textContent = playing ? '⏸' : '▶';
          }
        } catch (_) {}
      }, 500);
    }
  } else {
    if (musicPollTimer) { clearInterval(musicPollTimer); musicPollTimer = null; }
  }
}

// Show/hide based on the screen shown (main menu only)
ui._onMenuShown = function (name) {
  showMusicPlayer(name === 'main');
};

// Wire up the nav buttons
document.getElementById('music-next')?.addEventListener('click', () => {
  if (audio) audio.skipTrack(1);
  updateMusicWidget();
});
document.getElementById('music-prev')?.addEventListener('click', () => {
  if (audio) audio.skipTrack(-1);
  updateMusicWidget();
});
document.getElementById('music-toggle')?.addEventListener('click', () => {
  if (!audio) return;
  if (audio._musicPlaying && audio._musicCurrentSrc) {
    audio._musicCurrentSrc.pause();
    audio._musicPlaying = false;
  } else if (!audio._musicPlaying) {
    if (audio._musicCurrentSrc) {
      audio._musicCurrentSrc.play().catch(() => {});
    } else {
      audio.startMusic();
    }
    audio._musicPlaying = true;
  }
  updateMusicWidget();
});

initMenu();
initMods();
bindModsMenu(ui);

// --- render loop ---
let lastTime = performance.now();
function loop() {
requestAnimationFrame(loop);
  try {
    _gameFrame();
  } catch (_e) {
    // Never let a single bad frame kill the game — swallow it and keep going.
    if (window.__devErrors) {
      window.__devErrors.push({ type: 'loop', msg: String((_e && _e.message) || _e), time: Date.now() });
    }
    // _gameFrame clears the canvas at the start of every frame, so an
    // exception thrown mid-frame leaves the screen BLACK. Re-render the last
    // known scene so a transient error during logic (chunk streaming, mobs,
    // shader sync) doesn't flash a black screen while moving.
    try {
      if (gameRunning) renderer.render(scene, camera);
      else renderer.render(menuBgScene, menuBgCamera);
    } catch (_e2) { /* give up on this frame entirely */ }
  }
}

function _gameFrame() {
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

  // Continuous block breaking / mob attacking. GunAffair hijacks the click
  // to fire the rifle instead of the regular melee/break.
  if (isGunAffair && input.mouseLeftHeld && pointerLocked) {
    gunFire({ camera, player, world, mobManager, breakParticles, audio });
  }
  if (!isGunAffair && input.mouseLeftHeld && pointerLocked && !replayMode) {
    // Check for mob hit first
    if (mobManager && player) {
      const dir = _mobDirVec;
      camera.getWorldDirection(dir);
      const mobHit = mobManager.hitTest(camera.position, dir, REACH);
      if (mobHit) {
        if (miningSfxActive) { if (audio) audio.miningEnd(); miningSfxActive = false; }
        updateBreaking(0, null);
        breakingTarget = null;
        breakingElapsed = 0;
        mobAttackTimer += dt;
        if (mobAttackTimer >= 0.6) { // attack every 0.6s
          mobAttackTimer -= 0.6;
          // Calculate damage from held weapon
          const atkSlot = player.inventory.getSelected();
          const atkTool = atkSlot && isTool(atkSlot.item) ? toolInfo(atkSlot.item) : null;
          const attackDamage = atkTool ? atkTool.swordDmg || 1 : 1;
          const crit = isCriticalHit();
          const finalDmg = crit ? Math.ceil(attackDamage * 1.5) : attackDamage;
          mobHit.takeDamage(finalDmg, camera.position);

          if (crit) spawnCritParticles(mobHit.position);
          viewmodel.swing();
          mobManager.playHurtSound(mobHit.type);
          // Provoke hostile mobs to attack when hit
          if (mobHit.type === 'spider' || mobHit.type === 'zombie' || mobHit.type === 'skeleton' || mobHit.type === 'blower' || mobHit.type === 'portalman') mobHit.aggro = true;
          if (mobHit.dead) {
            // Loot + removal are handled centrally by MobManager.onMobDeath
            // (world-item drops) once the death animation finishes, so the
            // mob isn't yanked out of the world instantly here. We still award
            // XP and achievements at the killing blow.
            if (player.isSurvival()) {
              // XP for killing mobs
              const mobXp = { cow: 3, pig: 3, sheep: 3, spider: 5, zombie: 5, skeleton: 5, blower: 8, portalman: 10 };
              const mobXpGain = mobXp[mobHit.type] || 2;
              if (player.addXp(mobXpGain)) {
                ui.showLevelUp(player.level);
              }
            }
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
            if (mobHit.type === 'blower') achievements.incrementStat('mobKillsBlower');
            if (mobHit.type === 'portalman') achievements.incrementStat('mobKillsPortalman');
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
            if (_playerAttackTimer >= 0.6) {
              _playerAttackTimer = 0;
              hitPlayer = true;
              // Bedwars: no friendly fire, and spectators can't attack.
              const bwFriendly = isBedwars && !bwSpec && bwTeamKeyFor(closestName) === bwMyTeamKey;
              if (!bwFriendly) {
                const atkSlot = player.inventory.getSelected();
                const atkTool = atkSlot && isTool(atkSlot.item) ? toolInfo(atkSlot.item) : null;
                const dmg = atkTool ? (atkTool.swordDmg || 1) : 1;
                network._send({ type: 'player_damage', target: closestName, damage: dmg });
              }
              viewmodel.swing();
            }
          } else {
            _playerAttackTimer = 0.6; // reset so next click is instant
          }
        }

        if (!hitPlayer && !(player && player.isAdventure()) && !(isBedwars && bwSpec)) {
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
              lastBreakSound = 0;
              viewmodel.swing();
              if (miningSfxActive) { if (audio) audio.miningEnd(); miningSfxActive = false; }
              if (audio && !(player && player.isCreative())) {
                audio.miningStart(world.getBlock(hit.x, hit.y, hit.z));
                miningSfxActive = true;
              }
            }
            const b = world.getBlock(hit.x, hit.y, hit.z);
            // Creative: instant break with brief crack flash
            if (player.isCreative()) {
              doBreak(hit, b);
              breakingTarget = null;
              breakingElapsed = 0;
              if (miningSfxActive) { if (audio) audio.miningEnd(); miningSfxActive = false; }
              requestAnimationFrame(() => updateBreaking(0, null));
            } else {
              const elapsed = (now - lastBreakSound) / 1000;
              if (elapsed > 0.3) {
                // Mining crackle — plays for the whole break, not just the
                // final tick. Scheduled every ~0.3s while the block is held.
                lastBreakSound = now;
                if (audio) audio.blockMine(b);
              }
              breakingElapsed += dt;
              const slot = player.inventory.getSelected();
              const toolId = slot && isTool(slot.item) ? slot.item : null;
              const hardness = blockHardness(b);
              let speed = 1;
              if (toolId) speed = toolSpeedFor(toolId, b);
              const isEffective = toolId && toolInfo(toolId)?.type === blockTool(b);
              // Prismite shovel: insta-mine dirt-type blocks
              let breakTime = hardness > 0 ? (BASE_BREAK_TIME * hardness / speed) * (isEffective ? 0.5 : 2) : 0;
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
                if (miningSfxActive) { if (audio) audio.miningEnd(); miningSfxActive = false; }
              }
            }
          } else {
            if (miningSfxActive) { if (audio) audio.miningEnd(); miningSfxActive = false; }
            updateBreaking(0, null);
          }
        }
      }
    }
  } else if (miningSfxActive) {
    // Released the button mid-break — stop the mining grit immediately.
    if (audio) audio.miningEnd();
    miningSfxActive = false;
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

  // player physics (skip during sleep / replay camera)
  if (!sleeping && !replayMode) {
    player.update(dt, input);

    updateUtilityItems(dt);

    // Flush room edits that arrived while the world was loading (bedwars beds,
    // builds, anything a late joiner would otherwise miss).
    if (gameRunning && world && _pendingRoomEdits && _pendingRoomEdits.length) {
      const edits = _pendingRoomEdits;
      _pendingRoomEdits = null;
      for (const e of edits) {
        if (!isParkour && !isBedwars && e.y > 140) continue;
        world.setBlock(e.x, e.y, e.z, e.block);
        if (manager) manager.refreshAround(Math.floor(e.x / CHUNK_SIZE), Math.floor(e.z / CHUNK_SIZE));
      }
      saveCurrentWorld();
    }

    // ── Parkour runtime logic ───────────────────────────────────────
    if (isParkour && world && player) {
      // Check for checkpoints
      if (checkCheckpoint(player, world)) {
        if (audio) audio.checkpoint();
        if (_isImportedParkour) {
          addChatLine('Checkpoint saved!', '#5f5');
        } else {
          const lvl = getCurrentLevelInfo();
          if (lvl) addChatLine(`Checkpoint: Level ${lvl.id} — ${lvl.name}`, '#5f5');
        }

      }

      // Check for level/parkour completion
      if (_isImportedParkour && _importedParkourData) {
        if (player.position.y >= _importedParkourData.maxY - 1) {
          _importedParkourData = null;
          const time = getParkourTimerFormatted();
          addChatLine(`PARKOUR COMPLETE! Time: ${time}`, '#0ff');
          cgHappyTime();

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
          if (audio) audio.levelComplete();

        } else if (result === 'parkour_complete') {
          const time = getParkourTimerFormatted();
          const deaths = getParkourDeaths();
          const splits = getLevelSplits();
          addChatLine(`PARKOUR COMPLETE! Time: ${time}`, '#0ff');
          if (audio) audio.parkourComplete();
          cgHappyTime();

          ui.itemNameEl.textContent = `PARKOUR COMPLETE! Time: ${time}`;
          ui.itemNameEl.classList.add('visible');
          setTimeout(() => ui.itemNameEl.classList.remove('visible'), 5000);

          // Show finish screen with grade / time / deaths / splits
          (function showParkourFinish() {
            const finishEl = document.getElementById('parkour-finish');
            if (!finishEl) return;
            const t = getParkourTimer();
            // Grade: S = under 60s with 0 deaths, A = under 120s or 0 deaths, etc.
            let grade, gradeColor;
            if (t < 60 && deaths === 0) { grade = 'S'; gradeColor = '#ffd700'; }
            else if (t < 120 || deaths <= 2) { grade = 'A'; gradeColor = '#5f5'; }
            else if (t < 240 || deaths <= 5) { grade = 'B'; gradeColor = '#55f'; }
            else if (t < 480) { grade = 'C'; gradeColor = '#ff5'; }
            else { grade = 'D'; gradeColor = '#f55'; }

            // Save best time per theme
            const pkKey = _isImportedParkour ? 'imported' : 'default';
            const prevBest = getParkourBestTime(pkKey);
            saveParkourBestTime(pkKey, t, deaths, grade);

            let splitsHtml = '';
            if (splits.length > 0) {
              splitsHtml = '<div style="margin-top:12px;border-top:1px solid rgba(255,255,255,0.2);padding-top:8px;">';
              for (const sp of splits) {
                const mins = Math.floor(sp.time / 60);
                const secs = Math.floor(sp.time % 60);
                const ms = Math.floor((sp.time % 1) * 100);
                const tStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${String(ms).padStart(2, '0')}`;
                splitsHtml += `<div style="font:13px monospace;color:#aaa;margin:2px 0;">Level ${sp.level}: ${sp.name} — ${tStr}</div>`;
              }
              splitsHtml += '</div>';
            }

            let bestHtml = '';
            if (prevBest && prevBest.time < t) {
              const bm = Math.floor(prevBest.time / 60);
              const bs = Math.floor(prevBest.time % 60);
              const bms = Math.floor((prevBest.time % 1) * 100);
              bestHtml = `<div style="font:13px monospace;color:#ff5;margin-top:4px;">Best: ${String(bm).padStart(2, '0')}:${String(bs).padStart(2, '0')}.${String(bms).padStart(2, '0')} (${prevBest.grade})</div>`;
            } else if (prevBest) {
              bestHtml = `<div style="font:13px monospace;color:#5f5;margin-top:4px;">New Record!</div>`;
            }

            finishEl.innerHTML = `
              <div class="pk-finish-title">PARKOUR COMPLETE!</div>
              <div class="pk-finish-grade" style="color:${gradeColor}">${grade}</div>
              <div class="pk-finish-time">Time: ${time}</div>
              ${bestHtml}
              <div class="pk-finish-deaths">Deaths: ${deaths}</div>
              ${splitsHtml}
              <button class="pk-finish-btn" id="pk-replay-btn">Play Again</button>
              <button class="pk-finish-btn" id="pk-menu-btn">Menu</button>
            `;
            finishEl.style.display = 'flex';

            document.getElementById('pk-replay-btn')?.addEventListener('click', () => {
              finishEl.style.display = 'none';
              if (audio) audio.click?.();
              closeFurnace();
              ui.closeInventory();
              gameRunning = false;
              loadWorld('parkour', { startParkour: true });
            });
            document.getElementById('pk-menu-btn')?.addEventListener('click', () => {
              finishEl.style.display = 'none';
              if (audio) audio.click?.();
              closeFurnace();
              ui.closeInventory();
              showMinigames();
            });
          })();

          // CG midgame ad after parkour completion (natural break point)
          cgGameplayStop();
      cgClearGameContext();
          cgMidgameAd({
            adStarted() { audio.stopMusic(); audio.setMuted(true); },
            adFinished() { audio.setMuted(false); cgGameplayStart(); },
            adError() { audio.setMuted(false); cgGameplayStart(); },
          });
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
        if (audio) audio.playerFall();
        player.dead = false;
        const respawn = _isImportedParkour && _importedParkourData?.spawnPos
          ? _importedParkourData.spawnPos
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
        addParkourDeath();
        if (_parkourDeathsEl) _parkourDeathsEl.textContent = `Deaths: ${getParkourDeaths()}`;
      }
    }

    // ── OneBlock runtime logic ────────────────────────────────────
    if (isOneBlock && world && player) {
      // Peaceful-style hunger: no starvation during the grind.
      player.hunger = player.maxHunger;
      player.saturation = 2;
      player.health = Math.min(player.maxHealth, player.health + dt * 0.2);

      // Regenerate the OneBlock after it is broken.
      if (updateOneBlock(world, dt)) {
        const pos = getOneBlockPos();
        manager.refreshAround(Math.floor(pos.x / CHUNK_SIZE), Math.floor(pos.z / CHUNK_SIZE));
        if (audio) audio.blockBreak?.(world.getBlock(pos.x, pos.y, pos.z));
      }

      // Void fall → respawn on top of the (regenerating) block.
      if (player.position.y < 180) {
        if (forceRegen(world)) {
          const pos = getOneBlockPos();
          manager.refreshAround(Math.floor(pos.x / CHUNK_SIZE), Math.floor(pos.z / CHUNK_SIZE));
        }
        if (audio) audio.playerFall();
        player.dead = false;
        const pos = getOneBlockPos();
        player.position.set(pos.x + 0.5, pos.y + 1, pos.z + 0.5);
        player.velocity.set(0, 0, 0);
        player.spawnPoint.set(pos.x + 0.5, pos.y + 1, pos.z + 0.5);
        addChatLine('Fell! Respawned on your OneBlock.', '#5f5');
      }

      // Safety: if the player somehow gets launched way up, snap them back
      // over the block.
      if (player.position.y > 300) {
        const pos = getOneBlockPos();
        player.position.set(pos.x + 0.5, pos.y + 1, pos.z + 0.5);
        player.velocity.set(0, 0, 0);
      }

      // Random mob spawns while grinding (zombies, skeletons, creepers...).
      if (tickOneBlockMobTimer(dt)) {
        const pos = getOneBlockPos();
        const mobType = rollOneBlockMob();
        if (mobManager && mobManager.spawnAt) {
          mobManager.spawnAt(mobType, pos.x + 0.5, pos.y + 1, pos.z + 0.5);
        }
      }

      updateOneBlockHud();
    }
  }

  // ── Bedwars runtime logic ──────────────────────────────────────
  if (isBedwars && world && player) {
    // No natural hunger/starve death; gentle health regen.
    player.hunger = player.maxHunger;
    player.saturation = 2;
    if (!bwSpec) player.health = Math.min(player.maxHealth, player.health + dt * 0.15);

    // Generator drops — per-client, so every player gets their own resources.
    for (const g of bwGens) {
      g.timer -= dt;
      if (g.timer <= 0) {
        g.timer = g.every;
        // Only drop if there's solid ground beneath the generator. Generators sit
        // at a snapped surface height (g.y - 3), which varies per island on the
        // imported map — so check near the generator, not a fixed BW_Y.
        if (droppedItemManager && world.heightAt(g.x, g.z) >= g.y - 5) {
          droppedItemManager.drop(g.item, g.stack, g.x, g.y, g.z);
        }
      }
    }

    // Bed break detection (block state is synced to every client).
    if (!bwGameOver) {
      for (const team of BW_TEAMS) {
        const bed = bwBeds[team.key];
        if (!bed) continue;
        const nowIntact = bed.cells.some(c => world.getBlock(c.x, c.y, c.z) !== BLOCK.AIR);
        if (bed.intact && !nowIntact) {
          bed.intact = false;
          if (audio) audio.blockBreak?.(BLOCK.BED);
          addChatLine(`🛏 ${team.name} team's bed was destroyed!`, team.color);
          checkBedwarsWin();
        } else {
          bed.intact = nowIntact;
        }
      }
    }

    // Void fall → respawn (bed alive) or spectate (bed gone).
    if (player.position.y < BW_VOID_BELOW) {
      if (audio) audio.playerFall();
      if (bwSpec) {
        const sp = (bwMap && bwMap.spawn && bwMap.spawn[bwMyTeamKey]) || { x: 0.5, y: BW_Y + 2, z: 0.5 };
        player.position.set(sp.x, sp.y + 5, sp.z);
        player.velocity.set(0, 0, 0);
      } else if (bwBeds[bwMyTeamKey] && bwBeds[bwMyTeamKey].intact) {
        bwRespawnLocal();
        addChatLine('Fell! Your bed is safe — respawned.', '#5f5');
      } else {
        bedwarsEliminateLocal();
        addChatLine('Fell! Your bed was broken — you are out.', '#f66');
      }
    }

    // Death → respawn (bed alive) or spectate (bed gone). Runs before the
    // generic death-screen check further down, so no death menu in bedwars.
    if (player.isDead() && !bwSpec) {
      if (bwBeds[bwMyTeamKey] && bwBeds[bwMyTeamKey].intact) {
        bwRespawnLocal();
        addChatLine('You died! Your bed is safe — respawned.', '#5f5');
      } else {
        bedwarsEliminateLocal();
        addChatLine('You died! Your bed was broken — you are out.', '#f66');
      }
    }

    // Spectators stay alive and can fly around looking at the action.
    if (bwSpec) {
      player.health = Math.min(player.maxHealth, player.health + dt * 4);
      player.hunger = player.maxHunger;
    }

    renderBedwarsHud();
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

  // ── BlockZones runtime logic ────────────────────────────────────
  if (isBlockZones && world && player) {
    player.hunger = player.maxHunger;
    player.saturation = 2;
    player.health = Math.min(player.maxHealth, player.health + dt * 0.2);
    if (player.position.y < BZ_Y - 30) {
      if (audio) audio.playerFall();
      player.position.set(0.5, BZ_Y + 2, 0.5);
      player.velocity.set(0, 0, 0);
      player.health = player.maxHealth;
    }
    tickBlockZones(dt);
  }

  // ── 99 Nights runtime logic ──────────────────────────────────────
  if (isNights && world && player) {
    dayTime = 0.66; // lock the sun to night for the whole run
    player.hunger = player.maxHunger;
    player.saturation = 2;
    player.health = Math.min(player.maxHealth, player.health + dt * 0.08);
    if (player.position.y < N_Y - 30) {
      if (audio) audio.playerFall();
      player.position.set(0.5, N_Y + 2, 0.5);
      player.velocity.set(0, 0, 0);
      player.health = player.maxHealth;
    }
    tickNights(dt, { player, mobManager });
  }

  // ── GunAffair runtime logic ─────────────────────────────────────
  if (isGunAffair && world && player) {
    player.hunger = player.maxHunger;
    player.saturation = 2;
    if (player.position.y < GA_Y - 30) {
      if (audio) audio.playerFall();
      player.position.set(0.5, GA_Y + 2, 0.5);
      player.velocity.set(0, 0, 0);
      if (!player.isDead()) player.health = player.maxHealth;
    }
    tickGunAffair(dt, { player, mobManager });
  }

  // ── SkyBlock runtime logic ──────────────────────────────────────
  if (isSkyblock && world && player) {
    player.saturation = 2;
    player.health = Math.min(player.maxHealth, player.health + dt * 0.1);
    if (player.position.y < SB_VOID_BELOW) {
      if (audio) audio.playerFall();
      player.dead = false;
      const sp = SB_SPAWN;
      player.position.set(sp.x + 0.5, sp.y, sp.z + 0.5);
      player.velocity.set(0, 0, 0);
      player.health = player.maxHealth;
      player.hunger = player.maxHunger;
      addChatLine('You fell into the void — back to your island!', '#5f5');
    }
  }

  // Flowing water/lava simulation (SkyBlock uses it for the map's falls/lakes).
  if (isSkyblock) tickLiquid(dt);

  // ── Mods & Addons: hand live game references to every running mod ───
  if (world && player) {
    try {
      modsTick(dt, { gameRunning, player, world, dayTime, mobManager, camera, sun, ambient, renderer, scene, manager, atlasTexture });
    } catch (_me) {
      if (window.__devErrors) window.__devErrors.push({ type: 'mods', msg: String((_me && _me.message) || _me), time: Date.now() });
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
  // Hide the block wireframe when aiming at a mob — the voxel raycast passes
  // straight through mobs, so without this the black outline appears behind
  // the mob body, creating a "box around it" look.
  // Use fresh camera direction (not cached _rayDir) to avoid stale direction
  // from the per-frame currentTarget() cache.
  const _mobDir = camera.getWorldDirection(_mobDirVec);
  const mobInWay = mobManager?.hitTest(camera.position, _mobDir, REACH);
  if (target && !mobInWay && !replayMode) {
    highlight.visible = true;
    highlight.position.set(target.x + 0.5, target.y + 0.5, target.z + 0.5);
  } else {
    highlight.visible = false;
  }

  // camera already synced by player.update()

  // Update player model visibility based on camera mode
  if (playerModel) {
    const showModel = player.cameraMode !== 0 && !replayMode;
    playerModel.setVisible(showModel);
    if (showModel) {
      const isSwimming = player.inWater && !player.onGround;
      const isBreaking = input.mouseLeftHeld && pointerLocked && breakingTarget != null;
      const isPlacing = placeAnimTimer > 0;
        playerModel.update(dt, player.position, player.yaw, player.velocity, player.onGround, player.sprinting, isBreaking, isPlacing, isSwimming, player.eating, player.crouching, player.flying, player.onLadder, player.pitch);
      const armorKey = (player.inventory.armor[0] ? player.inventory.armor[0].item : '') + ',' +
        (player.inventory.armor[1] ? player.inventory.armor[1].item : '') + ',' +
        (player.inventory.armor[2] ? player.inventory.armor[2].item : '') + ',' +
        (player.inventory.armor[3] ? player.inventory.armor[3].item : '');
      if (armorKey !== _lastLocalArmorKey) {
        _lastLocalArmorKey = armorKey;
        const armorIds = player.inventory.armor.map(s => s ? s.item : null);
        try { playerModel.setArmor(armorIds, ARMOR); } catch (_) { console.warn("playerModel operation failed"); }
        if (network.connected && network.roomName) network.sendArmor(armorKey || null);
      }
    }
  }

  // Update footstep particles
  updateStepParticles(dt);

  // CrazyGames-exclusive Crazy Trail (cosmetic, local player only)
  if (isOnCrazyGames() && cgTrailEnabled && gameRunning && player && player.position) {
    _cgTrailTimer -= dt;
    if (_cgTrailTimer <= 0) { _cgTrailTimer = 0.09; spawnCGTrail(); }
  }

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
      dbg.innerHTML = `XYZ: ${player.position.x.toFixed(1)} / ${player.position.y.toFixed(1)} / ${player.position.z.toFixed(1)}<br>` +
        `Chunk: ${Math.floor(bx/CHUNK_SIZE)}, ${Math.floor(bz/CHUNK_SIZE)}<br>` +
        `Biome: ${_biomeNames[biomeId] || biomeId}<br>` +
        `Day: ${totalDays} &middot; Level: ${player.level}<br>` +
        `Camera: ${_cameraModes[player.cameraMode]}<br>` +
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
        redstoneStates.set(plateKey, { blockId: plateBlock, expiresAt: Infinity, x: plateX, y: plateY, z: plateZ });
      }
    } else {
      // Player stepped off — clean up any plate states whose block changed.
      // Throttled: scanning the whole redstone map with string splits every
      // frame was pure waste (this branch runs ~every frame while walking).
      _plateCleanTimer = (_plateCleanTimer || 0) + dt;
      if (_plateCleanTimer >= 0.5) {
        _plateCleanTimer = 0;
        for (const [key, state] of redstoneStates) {
          if (state.blockId === BLOCK.STONE_PRESSURE_PLATE) {
            const kx = state.x ?? Number(key.split(',')[0]);
            const ky = state.y ?? Number(key.split(',')[1]);
            const kz = state.z ?? Number(key.split(',')[2]);
            if (world.getBlock(kx, ky, kz) !== BLOCK.STONE_PRESSURE_PLATE) {
              redstoneStates.delete(key);
            }
          }
        }
      }
    }
  }

  loader.update(player.position.x, player.position.z);
  manager.update();

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
          if (chunk && chunk.generated && !isBlockZones && !isNights && !isGunAffair) mobManager.spawnForChunk(cx, cz, dayTime > 0.625);
        }
      }
    }
  }

  updateSky(dt);
  if (weatherSystem && player) {
    const b = world.biomeAt(Math.floor(player.position.x), Math.floor(player.position.z), Math.floor(player.position.y));
    weatherSystem.update(player.position, camera, performance.now() / 1000, dt, b, world);
  }
  greenstoneSystem.update(dt, world);
  tickSaplingGrowth(dt);
  _tickLeafDecay(dt);
  updateCoordsHud(dt);
  updateTimeHud();

  // Eating chew sounds (periodic while eating)
  if (player && player.eating && player.eatBiteTimer <= 0) {
    if (audio) audio.eat();
    player.eatBiteTimer = 0.35;
  }

  // Update dropped items + auto-collect
  if (droppedItemManager && player) {
    droppedItemManager.update(dt, player.position);
    const collected = droppedItemManager.collectNearby(player.position);
    for (const c of collected) {
      player.inventory.add(c.itemId, c.count);
    }
    if (collected.length) {
      if (audio) audio.pickup();
      ui.buildHotbarFromInventory(player.inventory);
    }
  }

  // Update lit TNT entities (bounce/blink animation + fuse countdown)
  if (tntManager) tntManager.update(dt);

  // Update thrown portal orbs (ender-pearl style teleport)
  updatePortalOrbs(dt);

  // Update linked portal rings (stepping through links)
  updatePortalRings(dt);

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

    // Boss update
    if (bossActive && bossEntity && !bossEntity.dead) {
      // Update health bar UI
      const fill = document.getElementById('boss-health-fill');
      const text = document.getElementById('boss-health-text');
      const bar = document.getElementById('boss-health-bar');
      if (bar) bar.style.display = 'block';
      if (fill) fill.style.width = Math.max(0, (bossEntity.hp / bossEntity.maxHp) * 100) + '%';
      if (text) text.textContent = bossEntity.hp + ' / ' + bossEntity.maxHp;
      // Boss attack
      bossAttackTimer -= dt;
      if (bossAttackTimer <= 0 && player) {
        const dx = player.position.x - bossEntity.position.x;
        const dy = player.position.y - bossEntity.position.y;
        const dz = player.position.z - bossEntity.position.z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 5) {
          const dmgMult = gameDifficulty === 'hard' ? 1.5 : 1.0;
          player.takeDamage(Math.round(12 * dmgMult), 'boss');
          if (playerModel) playerModel.triggerHurt();
          bossAttackTimer = 1.5;
        } else {
          bossAttackTimer = 0.3;
        }
      }
      // Boss fire particles
      if (Math.random() < 0.1) {
        const px = bossEntity.position.x + (Math.random() - 0.5) * 3;
        const py = bossEntity.position.y + Math.random() * 2;
        const pz = bossEntity.position.z + (Math.random() - 0.5) * 3;
        const m = _acquireParticleMesh(_particleGeoTiny, _bossHitMat);
        m.position.set(px, py, pz);
        scene.add(m);
        _particles.push({ mesh: m, vx: (Math.random() - 0.5) * 2, vy: 1 + Math.random() * 2, vz: (Math.random() - 0.5) * 2, life: 1, maxLife: 1, shared: true });
      }
    }
    // Boss died — drop loot
    if (bossActive && bossEntity && bossEntity.dead) {
      const bar = document.getElementById('boss-health-bar');
      if (bar) bar.style.display = 'none';
      // Drop dragon blade + scales + heart
      droppedItemManager?.drop(ITEM.DRAGON_BLADE, 1, bossEntity.position.x, bossEntity.position.y + 1, bossEntity.position.z);
      for (const drop of bossEntity.getDrops()) {
        droppedItemManager?.drop(drop.item, drop.count, bossEntity.position.x + (Math.random() - 0.5) * 2, bossEntity.position.y + 1, bossEntity.position.z + (Math.random() - 0.5) * 2);
      }
      addChatLine('The Prismite Dragon has been defeated! You received the Dragon Blade!', '#ff5');
      // Remove from scene
      scene.remove(bossEntity.mesh);
      bossEntity.dispose();
      const idx = mobManager.mobs.indexOf(bossEntity);
      if (idx >= 0) {
        mobManager.mobs[idx] = mobManager.mobs[mobManager.mobs.length - 1];
        mobManager.mobs.length--;
      }
      bossActive = false;
      bossEntity = null;
    }
  }

  // Update explosion particles
  if (explosionManager) {
    explosionManager.update(dt);
  }

  // ── SPRINT TRAIL PARTICLES ──
  if (player && player.sprinting && player.onGround && graphicsQuality !== 'low' && !LOW_END) {
    _sprintParticleTimer = (_sprintParticleTimer || 0) - dt;
    if (_sprintParticleTimer <= 0) {
      _sprintParticleTimer = 0.05;
      const px = player.position.x + (Math.random() - 0.5) * 0.4;
      const py = player.position.y + 0.1;
      const pz = player.position.z + (Math.random() - 0.5) * 0.4;
      const geo = _particleGeoMed;
      const mat = _sprintParticleMat;
      const m = _acquireParticleMesh(geo, mat);
      m.position.set(px, py, pz);
      m.visible = true;
      scene.add(m);
      _particles.push({ mesh: m, vx: 0, vy: 1.5, vz: 0, life: 0.4, maxLife: 0.4, shared: true });
    }
  }

  // ── RARITY GLOW PARTICLES ──
  if (player && graphicsQuality !== 'low' && !LOW_END) {
    const selSlot = player.inventory.getSelected();
    if (selSlot) {
      const rarity = getItemRarity(selSlot.item);
      if (rarity && rarity.particle) {
        _rarityGlowTimer = (_rarityGlowTimer || 0) - dt;
        if (_rarityGlowTimer <= 0) {
          _rarityGlowTimer = 0.12;
          const px = player.position.x + (Math.random() - 0.5) * 0.6;
          const py = player.position.y + 0.8 + Math.random() * 0.6;
          const pz = player.position.z + (Math.random() - 0.5) * 0.6;
          const matKey = rarity.particle | 0;
          let mat = _rarityMatCache.get(matKey);
          if (!mat) { mat = new THREE.MeshBasicMaterial({ color: rarity.particle, transparent: true, opacity: 0.8 }); _rarityMatCache.set(matKey, mat); }
          const m = _acquireParticleMesh(_particleGeoTiny, mat);
          m.position.set(px, py, pz);
          m.visible = true;
          scene.add(m);
          _particles.push({ mesh: m, vx: (Math.random() - 0.5) * 1, vy: 0.5 + Math.random() * 1.5, vz: (Math.random() - 0.5) * 1, life: 0.6, maxLife: 0.6, shared: true });
        }
      }
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
          const m = _acquireParticleMesh(geo, mat);
          m.position.set(
            player.position.x + (Math.random() - 0.5) * 0.6,
            player.position.y + 0.2,
            player.position.z + (Math.random() - 0.5) * 0.6
          );
          m.visible = true;
          scene.add(m);
          _particles.push({
            mesh: m,
            vx: (Math.random() - 0.5) * 2,
            vy: 2 + Math.random() * 2,
            vz: (Math.random() - 0.5) * 2,
            life: 0.5, maxLife: 0.5, shared: true
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
      if (p.shared) {
        _releaseParticleMesh(p.mesh);
      } else {
        if (Array.isArray(p.mesh.material)) { p.mesh.material.forEach(m => m.dispose()); }
        else if (p.mesh.material) p.mesh.material.dispose();
        if (p.mesh.geometry) p.mesh.geometry.dispose();
      }
      _particles[i] = _particles[_particles.length - 1];
      _particles.length--;
      continue;
    }
    p.vy -= 8 * dt;
    p.mesh.position.x += p.vx * dt;
    p.mesh.position.y += p.vy * dt;
    p.mesh.position.z += p.vz * dt;
    // Optional "pull" target: particle gets sucked toward it (portal funnels)
    if (p.pull) {
      const dx = p.pull.x - p.mesh.position.x;
      const dy = p.pull.y - p.mesh.position.y;
      const dz = p.pull.z - p.mesh.position.z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1;
      const force = Math.min(14, 30 / (dist + 0.5));
      p.mesh.position.x += (dx / dist) * force * dt;
      p.mesh.position.y += (dy / dist) * force * dt;
      p.mesh.position.z += (dz / dist) * force * dt;
    }
    p.mesh.material.opacity = (p.life / p.maxLife) * 0.6;
  }

  // underwater tint
  const eye = player.eyeBlock();
  const inDimensionZone = _isDimensionMode && _activeDimension === 'dimension';
  if (inDimensionZone) {
    // Shattered Echo sky — starless indigo, nearest fade for a soft void
    scene.fog.color.setHex(0x2b2b57);
    scene.background.setHex(0x1c1c3e);
    scene.fog.near = 16 * 3;
    scene.fog.far = 16 * (renderDist + 3) * 0.85;
    if (underwaterOverlay) underwaterOverlay.style.display = 'none';
  } else if (eye === BLOCK.WATER) {
    scene.fog.color.setHex(0x2266aa);
    scene.background.setHex(0x2266aa);
    scene.fog.near = 1; scene.fog.far = 22;
    if (underwaterOverlay) underwaterOverlay.style.display = 'block';
  } else {
    const isRaining = weatherSystem ? weatherSystem.getRainIntensity() > 0.1 : false;
    const fogFar = 16 * (renderDist + 2) * (isRaining ? 0.6 : 1.0);
    scene.fog.far = fogFar;
    scene.fog.near = fogFar * 0.35;
    // Reuse the dynamic sky color that updateSky computed (already rain/thunder
    // tinted) so fog, background and lights all agree on the time of day.
    if (isRaining) {
      scene.fog.color.copy(scene.background).lerp(_rainFog, 0.65);
    } else {
      scene.fog.color.copy(scene.background);
    }
    scene.background.copy(scene.fog.color);
    if (underwaterOverlay) underwaterOverlay.style.display = 'none';
  }

  // update block breaking particles
  if (breakParticles) breakParticles.update(dt);
  if (ambientParticles && graphicsQuality !== 'low' && !IS_MOBILE && !LOW_END) {
    ambientParticles.setBiome(world.biomeAt(Math.floor(player.position.x), Math.floor(player.position.z), Math.floor(player.position.y)));
    ambientParticles.update(dt, player.position);
  }
  if (cloudSystem && graphicsQuality !== 'low' && !IS_MOBILE && !LOW_END) cloudSystem.update(dt, dayTime, player.position.x, player.position.z, _lastSinA);

  // ── GHOST BLOCK PREVIEW ──
  if (player && !ui.isOverlayShown() && !ui.inventoryOpen && !ui.furnaceOpen && !ui.chestOpen) {
    const hit = currentTarget();
    const slot = player.inventory.getSelected();
    const itemId = slot ? slot.item : null;
    if (hit && itemId != null && isPlaceableBlockItem(itemId) && !(player && player.isAdventure()) && !(isBedwars && bwSpec)) {
      const placePos = hit.place;
      const existing = world.getBlock(placePos.x, placePos.y, placePos.z);
      ghostMesh.position.set(placePos.x + 0.5, placePos.y + 0.5, placePos.z + 0.5);
      ghostMesh.visible = true;
      ghostMesh.material.color.setHex(existing !== 0 ? 0xff4444 : 0x44ff44);
      ghostMesh.material.opacity = existing !== 0 ? 0.25 : 0.35;
    } else {
      ghostMesh.visible = false;
    }
  } else {
    ghostMesh.visible = false;
  }

  // ── DIMENSION SWITCH: swap between overworld and dimension worlds ──
  if (_isDimensionMode && _portalTriggered) {
    _portalTriggered = false;
    if (_activeDimension === 'overworld' && !_dimensionTarget) {
      // First trip through a Void portal: lazily generate the dimension world
      _dimensionTarget = new World(_dimensionSeed || world.seed, { dimension: true });
      if (_pendingDimensionLoad) {
        _dimensionTarget.loadEdits(_pendingDimensionLoad);
        _pendingDimensionLoad = null;
      }
      _dimensionSpawnPos = null;
    }
    const targetWorld = (_activeDimension === 'overworld') ? _dimensionTarget : _dimensionOverworld;
    if (targetWorld) {
      // Save current player position for return trip
      const savedPos = player.position.clone();
      if (_activeDimension === 'overworld') {
        _overworldSpawnPos = savedPos;
      } else {
        _dimensionSpawnPos = savedPos;
      }

      // Clear chunk meshes
      manager?.clear?.();
      mobManager?.clear?.();

      // Swap world
      world = targetWorld;
      _activeDimension = (_activeDimension === 'overworld') ? 'dimension' : 'overworld';

      // Recreate world-dependent managers
      manager = new ChunkMeshManager(scene, world, atlasTexture, scene.fog.color);
      loader = new ChunkLoader(world, manager, renderDist);
      explosionManager = new ExplosionManager(scene, world, audio);
      mobManager = new MobManager(scene, world, audio, explosionManager);
      mobManager._refreshFn = (bx, by, bz) => {
        if (manager) manager.refreshAround(Math.floor(bx / CHUNK_SIZE), Math.floor(bz / CHUNK_SIZE));
      };
      mobManager.networkSend = {
        sendMobSpawn: (id, type, x, y, z) => network.sendMobSpawn(id, type, x, y, z),
        sendMobPosition: (id, type, x, y, z, yaw) => network.sendMobPosition(id, x, y, z, yaw),
        sendMobDeath: (id) => network.sendMobDeath(id),
      };
      mobManager.onMobDeath = (mob) => {
        if (!droppedItemManager || !mob) return;
        for (const drop of mob.getDrops()) {
          droppedItemManager.drop(drop.item, drop.count, mob.position.x, mob.position.y + 0.5, mob.position.z);
        }
      };
      droppedItemManager = new DroppedItemManager(scene, atlasCanvas, world);
      tntManager = new LitTntManager(scene, atlasCanvas, world, explosionManager);
      tntManager.onExplode = (x, y, z) => {
        if (player) {
          const dmg = ExplosionManager.calcDamage(x + 0.5, y + 0.5, z + 0.5, player.position, 4);
          if (dmg > 0) player.takeDamage(dmg, { x: x + 0.5, y: y + 0.5, z: z + 0.5 });
          if (playerModel) playerModel.triggerHurt();
        }
      };

      // Update player's world reference
      player.world = world;

      // Restore player position (from saved position in target dimension, or find safe spawn)
      const returnPos = (_activeDimension === 'overworld') ? _overworldSpawnPos : _dimensionSpawnPos;
      if (returnPos) {
        // Returning to a previously visited position — place a portal block there
        // so the player can go back again
        const px = Math.floor(returnPos.x);
        const py = Math.floor(returnPos.y);
        const pz = Math.floor(returnPos.z);
        // Only place portal if there's solid ground below
        let safeY = py;
        for (let y = py; y >= Math.max(0, py - 10); y--) {
          if (world.getBlock(px, y, pz) !== 0 && BLOCKS[world.getBlock(px, y, pz)]?.solid) {
            safeY = y + 1; break;
          }
        }
        player.position.set(returnPos.x, safeY + 0.05, returnPos.z);
      } else {
        // First visit: find a safe island in the dimension, or use overworld spawn
        if (_activeDimension === 'dimension') {
          // Find a solid island near origin to place portal + spawn
          let found = false;
          for (let r = 0; r <= 120 && !found; r += 4) {
            for (let a = 0; a < 16 && !found; a++) {
              const angle = (a / 16) * Math.PI * 2;
              const tx = Math.round(Math.cos(angle) * r);
              const tz = Math.round(Math.sin(angle) * r);
              for (let y = 100; y >= 10; y--) {
                if (world.getBlock(tx, y, tz) !== 0 && BLOCKS[world.getBlock(tx, y, tz)]?.solid) {
                  // Place portal blocks at destination
                  world.setBlock(tx, y + 1, tz, BLOCK.VOID_PORTAL);
                  world.setBlock(tx, y + 2, tz, BLOCK.VOID_PORTAL);
                  world.setBlock(tx + 1, y + 1, tz, BLOCK.VOID_PORTAL);
                  world.setBlock(tx + 1, y + 2, tz, BLOCK.VOID_PORTAL);
                  manager.refreshAround(Math.floor(tx / CHUNK_SIZE), Math.floor(tz / CHUNK_SIZE));
                  player.position.set(tx + 0.5, y + 3.05, tz + 0.5);
                  showToast('The Shattered Echo — mine Echo Ore for shards! Step back through the void portal to return.', '#8ff', 6);
                  found = true;
                  break;
                }
              }
            }
          }
          if (!found) {
            // Last resort: build a voidstone platform
            world.setBlock(0, 50, 0, BLOCK.VOIDSTONE);
            world.setBlock(1, 50, 0, BLOCK.VOIDSTONE);
            world.setBlock(0, 50, 1, BLOCK.VOIDSTONE);
            world.setBlock(1, 50, 1, BLOCK.VOIDSTONE);
            world.setBlock(0, 51, 0, BLOCK.VOID_PORTAL);
            world.setBlock(0, 52, 0, BLOCK.VOID_PORTAL);
            world.setBlock(1, 51, 0, BLOCK.VOID_PORTAL);
            world.setBlock(1, 52, 0, BLOCK.VOID_PORTAL);
            manager.refreshAround(0, 0);
            player.position.set(0.5, 51.05, 0.5);
            showToast('The Shattered Echo — mine Echo Ore for shards! Step back through the void portal to return.', '#8ff', 6);
          }
        } else {
          // Returning to overworld: use player.spawn() for overworld terrain
          player.spawn();
          // Place a return portal next to spawn
          const px = Math.floor(player.position.x) + 2;
          const py = Math.floor(player.position.y) - 1;
          const pz = Math.floor(player.position.z);
          world.setBlock(px, py, pz, BLOCK.VOIDSTONE);
          world.setBlock(px + 1, py, pz, BLOCK.VOIDSTONE);
          world.setBlock(px, py + 1, pz, BLOCK.VOID_PORTAL);
          world.setBlock(px, py + 2, pz, BLOCK.VOID_PORTAL);
          world.setBlock(px + 1, py + 1, pz, BLOCK.VOID_PORTAL);
          world.setBlock(px + 1, py + 2, pz, BLOCK.VOID_PORTAL);
          manager.refreshAround(Math.floor(px / CHUNK_SIZE), Math.floor(pz / CHUNK_SIZE));
          _overworldSpawnPos = player.position.clone();
        }
      }
      player.velocity.set(0, 0, 0);
      player.spawnPoint.copy(player.position);
      player.voidRespawnPos = player.position.clone();
    }
  }

  // ── VOID PORTAL: standing in a lit portal teleports you between worlds ──
  if (world && player && player.position) {
    const pp = player.position;
    const feet = Math.floor(pp.y);
    const b1 = world.getBlock(Math.floor(pp.x), feet, Math.floor(pp.z));
    const b2 = world.getBlock(Math.floor(pp.x), feet + 1, Math.floor(pp.z));
    if (b1 === BLOCK.VOID_PORTAL || b2 === BLOCK.VOID_PORTAL) {
      _portalTeleportCooldown = (_portalTeleportCooldown || 0) - dt;
      if (_portalTeleportCooldown <= 0) {
        _portalTeleportCooldown = 2.0;
        if (_isDimensionMode) {
          // Minecraft-style: swap to the other world entirely
          _portalTriggered = true;
          if (audio) audio.portalOpen?.();
        } else {
          // Non-dimension world: legacy single-world teleport (unchanged)
          if (_portalHomePos) {
            player.position.set(_portalHomePos.x, _portalHomePos.y, _portalHomePos.z);
            player.velocity.set(0, 0, 0);
            _portalHomePos = null;
          } else {
            _portalHomePos = player.position.clone();
            // Teleport to a random nearby location as a fallback
            const angle = Math.random() * Math.PI * 2;
            const r = 20 + Math.random() * 30;
            const tx = Math.round(Math.cos(angle) * r);
            const tz = Math.round(Math.sin(angle) * r);
            for (let y = 80; y >= 10; y--) {
              if (world.getBlock(tx, y, tz) !== BLOCK.AIR && BLOCKS[world.getBlock(tx, y, tz)]?.solid) {
                player.position.set(tx + 0.5, y + 1.05, tz + 0.5);
                player.velocity.set(0, 0, 0);
                break;
              }
            }
          }
          if (audio) audio.portalOpen?.();
        }
      }
    }
  }

  // Sprint FOV effect (smooth zoom out when sprinting, respects the FOV setting)
  const baseTarget = (player && player.cameraMode !== 0) ? baseFov - 5 : baseFov;
  const targetFov = player && player.sprinting ? baseTarget + 5 : baseTarget;
  camera.fov += (targetFov - camera.fov) * Math.min(1, dt * 8);
  camera.updateProjectionMatrix();

  // Update shadow camera to follow player. The light's own position (cap-added
  // below) is used directly so the snapped shadow matrix always matches what the
  // renderer bakes from sun.position — using the lerped _sunPos here made the
  // map lag and distort while walking.
  if (player && renderer.shadowMap.enabled) {
    const p = player.position;
    sun.target.position.set(p.x, p.y, p.z);
    sun.target.updateMatrixWorld();

    // Tighten near/far around the player so the shadow map spends its depth
    // precision on the visible region (prevents acne + drifting shadows).
    _shadowLightDir.subVectors(sun.position, p).normalize();
    const distToPlayer = sun.position.distanceTo(p);
    const reach = 90; // covers the ±50 ortho bounds + a safety margin
    const sc = sun.shadow.camera;
    sc.near = Math.max(0.5, distToPlayer - reach);
    sc.far = distToPlayer + reach;
    sc.updateProjectionMatrix();

    // Snap shadow camera to texel grid to prevent shimmer
    const tW = (sc.right - sc.left) / sun.shadow.mapSize.width;
    const tH = (sc.top - sc.bottom) / sun.shadow.mapSize.height;
    _shadowLookAt.lookAt(sun.position, p, sun.up);
    _shadowLocalPos.copy(p).applyMatrix4(_shadowLookAt);
    const sx = Math.round(_shadowLocalPos.x / tW) * tW;
    const sy = Math.round(_shadowLocalPos.y / tH) * tH;
    if (sx !== _shadowLocalPos.x || sy !== _shadowLocalPos.y) {
      _shadowOffset.set(sx - _shadowLocalPos.x, sy - _shadowLocalPos.y, 0);
      _shadowInvMat.copy(_shadowLookAt).invert();
      _shadowOffset.applyMatrix4(_shadowInvMat);
      sun.target.position.copy(p).add(_shadowOffset);
      sun.target.updateMatrixWorld();
    }
  }

  // Replay camera overrides the player-attached camera each frame so the
  // free cinematic camera is authoritative during replay mode.
  if (replayMode) {
    updateReplayCamera(dt);
    camera.position.copy(replayCam.pos);
    camera.rotation.order = 'YXZ';
    camera.rotation.set(replayCam.pitch, replayCam.yaw, 0);
  }

  // Render scene
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
      sprinting: player.sprinting,
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

  // HUD update — each subsystem is isolated so a single failure (e.g. a bad
  // slot reference) can never starve the status bars or the rest of the HUD.
  try { ui.updateHud({
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
  }); } catch (e) { console.warn('HUD update failed:', e); }
  try { ui.updateItemName(player.inventory, player.isCreative()); } catch (e) { console.warn('Item-name update failed:', e); }
  try { ui.setUnderwater(eye === BLOCK.WATER); } catch (e) { console.warn('Underwater update failed:', e); }
  try { ui.updateXpBar(player.getXpProgress(), player.level); } catch (e) { console.warn('XP bar update failed:', e); }

  // Furnace tick — ticks all world furnaces (background cooking)
  try { ui.tickFurnace(dt, (id) => SMELTING[id], (id) => fuelValue(id), (id) => SMELT_TIME[id] ?? SMELT_TIME_DEFAULT); } catch (e) { console.warn('Furnace tick failed:', e); }

  // Throttled status bar update — adventure keeps health/hunger like survival
  statusBarTimer += dt;
  if (statusBarTimer > 0.25) {
    statusBarTimer = 0;
    if (player.isSurvival() || player.isAdventure()) {
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
    document.exitPointerLock?.();
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
        `Distance Walked: <b>${dist} m</b><br>` +
        `Position: <b style="color:#88aaff">${Math.floor(player.position.x)}, ${Math.floor(player.position.y)}, ${Math.floor(player.position.z)}</b>`;
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
  // Skip 3D preview on very low-end devices (second WebGL context = OOM on iPhone 5)
  if (VERY_LOW_END) { container.style.display = 'none'; return; }
  try {
    menuPreviewRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
  } catch (_) { container.style.display = 'none'; return; }
  menuPreviewRenderer.setSize(120, 180);
  menuPreviewRenderer.setPixelRatio(1);
  menuPreviewRenderer.setClearColor(0x000000, 0);
  menuPreviewRenderer.shadowMap.enabled = !VERY_LOW_END;
  menuPreviewRenderer.shadowMap.type = THREE.PCFShadowMap;
  container.appendChild(menuPreviewRenderer.domElement);
  menuPreviewScene = new THREE.Scene();
  menuPreviewCamera = new THREE.PerspectiveCamera(35, 120 / 180, 0.1, 100);
  menuPreviewCamera.position.set(0, 1.2, 3.5);
  menuPreviewCamera.lookAt(0, 0.9, 0);
  const amb = new THREE.AmbientLight(0xffffff, 0.8);
  menuPreviewScene.add(amb);
  const dir = new THREE.DirectionalLight(0xffffff, 0.6);
  dir.position.set(2, 4, 3);
  dir.castShadow = true;
  dir.shadow.mapSize.width = 512;
  dir.shadow.mapSize.height = 512;
  dir.shadow.camera.near = 0.1;
  dir.shadow.camera.far = 10;
  dir.shadow.camera.left = -2;
  dir.shadow.camera.right = 2;
  dir.shadow.camera.top = 2;
  dir.shadow.camera.bottom = -2;
  menuPreviewScene.add(dir);
  const previewGround = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    new THREE.ShadowMaterial({ opacity: 0.55 })
  );
  previewGround.rotation.x = -Math.PI / 2;
  previewGround.receiveShadow = true;
  menuPreviewScene.add(previewGround);
  // Soft "pedestal" glow disc behind the shadow so the dark shadow reads
  // against the near-black menu background.
  const pedestalCanvas = document.createElement('canvas');
  pedestalCanvas.width = pedestalCanvas.height = 128;
  const pctx = pedestalCanvas.getContext('2d');
  const grad = pctx.createRadialGradient(64, 64, 4, 64, 64, 62);
  grad.addColorStop(0, 'rgba(120,160,255,0.30)');
  grad.addColorStop(0.55, 'rgba(60,80,180,0.12)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  pctx.fillStyle = grad;
  pctx.fillRect(0, 0, 128, 128);
  const pedestalTex = new THREE.CanvasTexture(pedestalCanvas);
  const pedestal = new THREE.Mesh(
    new THREE.PlaneGeometry(2.6, 2.6),
    new THREE.MeshBasicMaterial({ map: pedestalTex, transparent: true, depthWrite: false })
  );
  pedestal.rotation.x = -Math.PI / 2;
  // Slightly BELOW the shadow plane so the dropped shadow renders on top of the
  // glow and shows up against the near-black background (was on top, hiding it).
  pedestal.position.y = -0.01;
  menuPreviewScene.add(pedestal);
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
    const draw = (sx, sy, sw, sh, dx, dy) => { try { ctx.drawImage(img, sx, sy, sw, sh, dx, dy, sw, sh); } catch (_) { console.warn("icon rendering failed"); } };
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
    if (skinEditor) { try { skinEditor.destroy(); } catch (_) { console.warn("skin editor operation failed"); } }
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
// --- Inventory theme toggle (dark/light) ---
document.getElementById('btn-inv-theme')?.addEventListener('click', () => {
  const el = document.getElementById('inventory-screen');
  if (!el) return;
  el.classList.toggle('inv-light');
  const theme = el.classList.contains('inv-light') ? 'light' : 'dark';
  localStorage.setItem('bf_inv_theme', theme);
  try {
    if (window.CrazyGames && window.CrazyGames.SDK && window.CrazyGames.SDK.data) {
      window.CrazyGames.SDK.data.setItem('bf_inv_theme', theme).catch(() => {});
    }
  } catch (_) {}
});
// Restore saved inventory theme
try {
  if (localStorage.getItem('bf_inv_theme') === 'light') {
    document.getElementById('inventory-screen')?.classList.add('inv-light');
  }
} catch (_) {}
document.getElementById('btn-close-furnace')?.addEventListener('click', () => {
  ui.closeFurnace(); lockPointer();
});
document.getElementById('btn-close-chest')?.addEventListener('click', () => {
  ui.closeChest(); lockPointer();
});


let statusBarTimer = 0, autoSaveTimer = 0, stepTimer = 0, prevDamageTimer = 0, mobAttackTimer = 0, _playerAttackTimer = 0, _cameraShakeIntensity = 0, _deathTracked = false, _mobSpawnTimer = 0;
const _prevPlayerPos = new THREE.Vector3();
const _shadowLightDir = new THREE.Vector3();
const _shadowLookAt = new THREE.Matrix4();
const _shadowLocalPos = new THREE.Vector3();
const _shadowOffset = new THREE.Vector3();
const _shadowInvMat = new THREE.Matrix4();
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
    openExternal('portal.html' + (user ? '?user=' + user + '&role=' + role : ''));
});
// Bottom-right: Account Info → shows account details incl. shareable player link
document.getElementById('btn-account-info')?.addEventListener('click', () => {
  const aiModal = document.getElementById('account-info-modal');
  const aiUser = document.getElementById('ai-username');
  const aiPass = document.getElementById('ai-password');
  const aiProv = document.getElementById('ai-provider');
  const aiLink = document.getElementById('ai-player-link');
  if (aiUser) aiUser.textContent = playerName || '—';
  if (aiPass) {
    let pass = '';
    try { pass = _xorDecode(localStorage.getItem('bf_login_pass') || '') || ''; } catch (_) { console.warn("localStorage read failed"); }
    aiPass.textContent = pass ? pass : '—';
  }
  if (aiProv) aiProv.textContent = localStorage.getItem('bf_oauth_provider') || localStorage.getItem('bf_cg_provider') || 'password';
  if (aiLink && playerName) aiLink.textContent = location.origin + '/u/?user=' + encodeURIComponent(playerName);
  if (aiModal) aiModal.style.display = 'flex';
});
document.getElementById('ai-backdrop')?.addEventListener('click', () => {
  const aiModal = document.getElementById('account-info-modal');
  if (aiModal) aiModal.style.display = 'none';
});
document.getElementById('btn-ai-close')?.addEventListener('click', () => {
  const aiModal = document.getElementById('account-info-modal');
  if (aiModal) aiModal.style.display = 'none';
});
document.getElementById('btn-ai-copy-link')?.addEventListener('click', async () => {
  const link = document.getElementById('ai-player-link')?.textContent || '';
  const btn = document.getElementById('btn-ai-copy-link');
  if (!link || link === '—') return;
  try { await navigator.clipboard.writeText(link); } catch (_) { console.warn("clipboard write failed"); }
  if (btn) { const t = btn.textContent; btn.textContent = 'COPIED!'; setTimeout(() => { btn.textContent = t; }, 1200); }
});
// OPEN: legitimately open your own player menu — issues a fresh entry token so
// the /u/ page shows the menu instead of the bot block. Copy-pasting the link
// (fresh tab, no token) is blocked.
document.getElementById('btn-ai-open-link')?.addEventListener('click', () => {
  const link = document.getElementById('ai-player-link')?.textContent || '';
  const m = link.match(/[?&]user=([^&]+)/);
  const user = m ? decodeURIComponent(m[1]) : playerName;
  if (!user || user === '—') return;
  if (isOnCrazyGames()) { addChatLine('Open your profile on the official BlockForge site.', '#7af', true); return; }
  try { sessionStorage.setItem('bf_entry_token', '1'); } catch (_) { console.warn("sessionStorage write failed"); }
  window.location.href = '/u/?user=' + encodeURIComponent(user);
});
document.getElementById('ai-username')?.addEventListener('click', async () => {
  const u = document.getElementById('ai-username')?.textContent || '';
  try { if (u && u !== '—') await navigator.clipboard.writeText(u); } catch (_) { console.warn("clipboard write failed"); }
});
document.getElementById('ai-data-page')?.addEventListener('click', () => {
  const user = encodeURIComponent(playerName || '');
  const role = encodeURIComponent(playerRole || '');
  openExternal('u/data.html' + (user ? '?user=' + user + '&role=' + role : ''));
});
document.getElementById('btn-ai-portal')?.addEventListener('click', () => {
  openExternal('portal.html');
});

// Delete Account (right to erasure). First click reveals a confirm; the second
// sends the request. Only works while authenticated (server enforces ownership).
(function initDeleteAccount() {
  const del = document.getElementById('btn-ai-delete');
  const hint = document.getElementById('ai-delete-hint');
  const confirm = document.getElementById('ai-delete-confirm');
  if (!del || !hint || !confirm) return;
  del.addEventListener('click', () => { hint.style.display = hint.style.display === 'none' ? 'block' : 'none'; });
  confirm.addEventListener('click', () => {
    if (!network.connected) { addChatLine('Connect to the internet to delete your account.', '#f66', true); return; }
    network.send({ type: 'delete_account' });
  });
})();

// Deep link from the portal ("Add to BlockForge"): ?add=<ws://host:port> adds
// the server to the player's local saved list (Minecraft-style) so they can
// join it from Multiplayer. The param is stripped so a refresh won't re-add.
(function handleAddServerParam() {
  try {
    const params = new URLSearchParams(window.location.search);
    const add = params.get('add');
    if (!add) return;
    const ok = addSavedServer('', add);
    const url = new URL(window.location.href);
    url.searchParams.delete('add');
    window.history.replaceState({}, '', url.pathname + url.search + url.hash);
    if (ok) {
      const notice = () => addChatLine('Server added: ' + add + ' — open Multiplayer to join it.', '#7af', true);
      if (document.getElementById('chat-log')) notice();
      else window.addEventListener('DOMContentLoaded', notice);
    }
  } catch (_) {}
})();

// Auto-connect to the official backend on launch — like Minecraft's always-online
// main menu, so social (friends / DMs / accounts) is live immediately. Auth still
// only happens on login; this is just the socket.
if (!network.connected) {
  try { network.connect(BACKEND_URL); } catch (_) { console.warn('auto-connect to backend failed'); }
}

// Initialise the CrazyGames SDK (no-op off-platform — the SDK script is only
// injected on crazygames.com, so this is safe everywhere else).
try { cgInit(); } catch (_) { console.warn('cgInit failed'); }

// CrazyGames sitelock: prevent the game from running on unauthorized domains.
// CG requires a sitelock for review approval. Off-platform builds are unaffected.
(function cgSitelock() {
  const h = location.hostname;
  if (/crazygames/i.test(h)) {
    const allowed = ['crazygames.com', 'www.crazygames.com'];
    const ok = allowed.some(d => h === d || h.endsWith('.' + d));
    if (!ok) {
      document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#111;color:#fff;font-family:sans-serif;text-align:center;"><div><h1>Unauthorized Domain</h1><p>This game can only be played on CrazyGames.</p></div></div>';
      throw new Error('Sitelock: unauthorized domain');
    }
  }
})();

// Age gate (COPPA / 13+): block first launch and account creation for under-13.
(function initAgeGate() {
  try {
    if (localStorage.getItem('bf_age_ok') === '1') return;
    const gate = document.getElementById('age-gate');
    if (!gate) return;
    gate.style.display = 'flex';
    const yes = document.getElementById('age-yes');
    const no = document.getElementById('age-no');
    const msg = document.getElementById('age-msg');
    if (yes) yes.addEventListener('click', () => {
      try { localStorage.setItem('bf_age_ok', '1'); } catch (_) {}
      gate.style.display = 'none';
    });
    if (no) no.addEventListener('click', () => {
      try { localStorage.setItem('bf_age_under13', '1'); } catch (_) {}
      if (msg) msg.textContent = 'Sorry — accounts require players to be 13 or older. You can still play single-player locally.';
      setTimeout(() => { gate.style.display = 'none'; }, 2600);
    });
  } catch (_) {}
})();
function isUnder13Blocked() {
  try { return localStorage.getItem('bf_age_under13') === '1' && localStorage.getItem('bf_age_ok') !== '1'; } catch (_) { return false; }
}

requestAnimationFrame(loop);
