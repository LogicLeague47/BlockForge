// Entry point: wires up renderer, world, player, input, and the render loop.

import * as THREE from 'three';
import { World, CHUNK_SIZE, BIOMES } from './world.js';
import { ChunkMeshManager } from './chunkmesh.js';
import { ChunkLoader } from './chunkloader.js';
import { Player } from './player.js';
import { raycastVoxel } from './raycast.js';
import { buildAtlas, makeIcon } from './tiles.js';
import { UI, drawCrack } from './ui.js';
import { Audio } from './audio.js';
import { BLOCK, BLOCKS, HOTBAR_BLOCKS, blockDrop, blockHardness, blockTool, blockHarvestLevel, TILES, tileNameFor } from './blocks.js';
import { isBlockItem, isTool, toolInfo, toolSpeedFor, toolHarvestLevel, isFood, foodValue, fuelValue } from './items.js';
import { saveWorld, loadWorld, getWorldList, saveWorldList, createWorld, deleteWorld, migrateLegacy, hasSave } from './storage.js';
import { SMELTING } from './recipes.js';
import { AchievementManager, ACHIEVEMENTS, CATEGORIES } from './achievements.js';

const REACH = 6;
const DAY_LENGTH = 600;
const BASE_BREAK_TIME = 0.8;

const app = document.getElementById('app');

// --- renderer / scene / camera ---
const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
app.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const skyColor = new THREE.Color(0x9ad0ff);
scene.background = skyColor.clone();
scene.fog = new THREE.Fog(skyColor.getHex(), 16 * 3, 16 * 7);

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
    c.width = 16; c.height = 16;
    const ctx = c.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(atlasCanvas, t[0] * 16, t[1] * 16, 16, 16, 0, 0, 16, 16);
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
      material = new THREE.MeshLambertMaterial({ color: 0x3f76e4, transparent: true, opacity: 0.55, depthWrite: false, side: THREE.DoubleSide });
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
      dummy.updateMatrix();
      mesh.setMatrixAt(idx++, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    menuBgScene.add(mesh);
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

// --- texture atlas ---
const atlasCanvas = buildAtlas(1337);
const atlasTexture = new THREE.CanvasTexture(atlasCanvas);
atlasTexture.magFilter = THREE.NearestFilter;
atlasTexture.minFilter = THREE.NearestFilter;
atlasTexture.generateMipmaps = false;
atlasTexture.colorSpace = THREE.SRGBColorSpace;
atlasTexture.wrapS = atlasTexture.wrapT = THREE.ClampToEdgeWrapping;
buildMenuBackground();

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

function updateBreaking(progress, hit) {
  if (progress <= 0 || !hit) { crackPlane.visible = false; return; }
  crackPlane.visible = true;
  drawCrack(crackCanvas, Math.min(3, Math.floor(progress * 4)));
  crackTexture.needsUpdate = true;
  crackPlane.position.set(hit.x + 0.5, hit.y + 0.5, hit.z + 0.5);
  const dir = new THREE.Vector3();
  camera.getWorldDirection(dir);
  crackPlane.position.addScaledVector(dir, -0.005);
  crackPlane.lookAt(camera.position);
}

// --- UI / audio ---
const ui = new UI(atlasCanvas);
const audio = new Audio();
const achievements = new AchievementManager();

// --- Game state (set by startGame) ---
let world = null, manager = null, loader = null, player = null;
let gameRunning = false;
let renderDist = 7;

// --- input state ---
const input = { keys: {} };
let pointerLocked = false;
let breakingTarget = null;
let breakingElapsed = 0;
let lastBreakSound = 0;

function lockPointer() { renderer.domElement.requestPointerLock(); }

renderer.domElement.addEventListener('click', () => {
  if (ui.isOverlayShown()) return;
  if (!pointerLocked) lockPointer();
});

document.addEventListener('pointerlockchange', () => {
  pointerLocked = document.pointerLockElement === renderer.domElement;
  if (!pointerLocked && gameRunning && !ui.inventoryOpen && !ui.furnaceOpen) {
    ui.showMenu('pause');
  }
});

document.addEventListener('mousemove', (e) => {
  if (ui.inventoryOpen) {
    ui.cursorItemEl.style.left = (e.clientX - 16) + 'px';
    ui.cursorItemEl.style.top = (e.clientY - 16) + 'px';
    return;
  }
  if (!pointerLocked || !player) return;
  player.applyMouse(e.movementX, e.movementY);
});

document.addEventListener('keydown', (e) => {
  if (!gameRunning) return;
  input.keys[e.code] = true;
  if (e.code === 'Escape') {
    if (ui.furnaceOpen) {
      ui.closeFurnace();
      lockPointer();
    } else if (ui.inventoryOpen) {
      ui.closeInventory();
      lockPointer();
    }
  }
  if (e.code === 'Tab') {
    e.preventDefault();
    if (ui.furnaceOpen) {
      ui.closeFurnace(); lockPointer();
    } else if (ui.inventoryOpen) {
      ui.closeInventory(); lockPointer();
    } else {
      ui.openInventory(player.inventory, 2, player.isCreative());
      document.exitPointerLock();
    }
  }
  if (e.code === 'KeyE') {
    const hit = currentTarget();
    if (hit && hit.block === BLOCK.CRAFTING) {
      ui.openInventory(player.inventory, 3, false);
      document.exitPointerLock();
    } else if (hit && hit.block === BLOCK.FURNACE) {
      ui.openFurnace(player.inventory);
      document.exitPointerLock();
    } else if (player.isSurvival()) {
      const slot = player.inventory.getSelected();
      if (slot && isFood(slot.item)) {
        if (player.eat(foodValue(slot.item))) {
          slot.count--;
          if (slot.count <= 0) player.inventory.slots[player.inventory.selected] = null;
          syncUIMode();
        }
      } else {
        placeBlock();
      }
    } else {
      placeBlock();
    }
  }
  // Hotbar keys 1-9
  if (e.code >= 'Digit1' && e.code <= 'Digit9') {
    const idx = parseInt(e.code.slice(5)) - 1;
    ui.setActive(idx);
    player.inventory.setSelected(idx);
  }
  // Q = drop item
  if (e.code === 'KeyQ' && player.isSurvival()) {
    const slot = player.inventory.getSelected();
    if (slot) {
      slot.count--;
      if (slot.count <= 0) player.inventory.slots[player.inventory.selected] = null;
      syncUIMode();
    }
  }
  // F = toggle flying
  if (e.code === 'KeyF' && player.isCreative()) {
    player.flying = !player.flying;
    player.velocity.y = 0;
  }
  // F5 = toggle gamemode
  if (e.code === 'F5') {
    e.preventDefault();
    toggleGamemode();
  }
  // G = regenerate world
  if (e.code === 'KeyG') {
    const newSeed = Math.floor(Math.random() * 2147483647);
    const mode = player.gamemode;
    startGame(currentWorldId, newSeed, mode);
  }
});
document.addEventListener('keyup', (e) => { input.keys[e.code] = false; });

// mouse wheel cycles hotbar
window.addEventListener('wheel', (e) => {
  if (!pointerLocked || !gameRunning) return;
  const newIdx = ui.active + Math.sign(e.deltaY);
  ui.setActive(newIdx);
  player.inventory.setSelected(newIdx);
}, { passive: true });

// break / place on mouse buttons
document.addEventListener('mousedown', (e) => {
  if (!pointerLocked || ui.inventoryOpen || !gameRunning) return;
  audio.resume();
  if (e.button === 0) {
    breakingTarget = null;
    breakingElapsed = 0;
  } else if (e.button === 2) {
    const hit = currentTarget();
    if (hit && hit.block === BLOCK.CRAFTING) {
      ui.openInventory(player.inventory, 3, false);
      document.exitPointerLock();
    } else if (hit && hit.block === BLOCK.FURNACE) {
      ui.openFurnace(player.inventory);
      document.exitPointerLock();
    } else if (player.isSurvival()) {
      const slot = player.inventory.getSelected();
      if (slot && isFood(slot.item)) {
        if (player.eat(foodValue(slot.item))) {
          slot.count--;
          if (slot.count <= 0) player.inventory.slots[player.inventory.selected] = null;
          syncUIMode();
        }
      } else {
        placeBlock();
      }
    } else {
      placeBlock();
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

function placeBlock() {
  const hit = currentTarget();
  if (!hit) return;
  const itemId = getHeldItemId();
  if (itemId == null) return;
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
  // consume in survival
  if (player.isSurvival()) {
    const slot = player.inventory.getSelected();
    if (slot) {
      slot.count--;
      if (slot.count <= 0) player.inventory.slots[player.inventory.selected] = null;
      syncUIMode();
    }
  }
  manager.refreshAround(Math.floor(x / CHUNK_SIZE), Math.floor(z / CHUNK_SIZE));
  audio.place();
}

function breakBlock(hit) {
  const b = world.getBlock(hit.x, hit.y, hit.z);
  if (b === BLOCK.AIR || b === BLOCK.BEDROCK) return;

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
  world.setBlock(hit.x, hit.y, hit.z, BLOCK.AIR);
  // drop item
  if (player.isSurvival()) {
    const drop = blockDrop(b, toolHarvestLevel(player.inventory.getSelected()?.item || 0));
    if (drop) player.inventory.add(drop, 1);
    syncUIMode();
  }
  manager.refreshAround(Math.floor(hit.x / CHUNK_SIZE), Math.floor(hit.z / CHUNK_SIZE));
  audio.dig(b);
  player.addExhaustion(0.05);
}

// --- sky ---
let dayTime = 0.3;
function updateSky(dt) {
  dayTime = (dayTime + dt / DAY_LENGTH) % 1;
  const angle = dayTime * Math.PI * 2;
  const skyHue = 0.56 + 0.1 * Math.sin(angle);
  const brightness = Math.max(0.2, Math.sin(angle) * 0.5 + 0.5);
  scene.background.setHSL(skyHue, 0.35, brightness * 0.7);
  scene.fog.color.copy(scene.background);
  sun.position.set(Math.cos(angle) * 500, Math.sin(angle) * 500, 0);
  sun.intensity = Math.max(0.1, Math.sin(angle)) * 1.5;
  ambient.intensity = 0.4 + Math.max(0, Math.sin(angle)) * 0.4;
  sunMesh.position.copy(sun.position);
  moonMesh.position.set(-sun.position.x, -sun.position.y, -sun.position.z);
}

// =========================================================
// GAME START / STOP
// =========================================================
let currentWorldId = null;

const LOADING_TIPS = [
  'Tip: Use TAB to open your inventory.',
  'Tip: Hold left-click to mine blocks continuously.',
  'Tip: Press F to toggle flying in Creative mode.',
  'Tip: Right-click to place blocks or eat food.',
  'Tip: Press E near a crafting table or furnace to use it.',
  'Tip: Use scroll wheel or 1-9 keys to switch hotbar slots.',
  'Tip: Caves can be found underground — explore carefully!',
  'Tip: Smelt raw food in a furnace to restore more hunger.',
  'Tip: Fall damage starts after 3 blocks of falling.',
  'Tip: Sprinting and jumping drain hunger faster.',
];

function startGame(worldId, seed, gamemode) {
  // Tear down previous game
  if (gameRunning) {
    if (player) saveCurrentWorld();
    manager?.clear?.();
  }

  currentWorldId = worldId;
  renderDist = parseInt(document.getElementById('set-render-distance')?.value) || 7;

  world = new World(seed);
  const saved = loadWorld(worldId);
  if (saved) world.loadEdits(saved);
  manager = new ChunkMeshManager(scene, world, atlasTexture);
  loader = new ChunkLoader(world, manager, renderDist);

  scene.fog.far = 16 * renderDist;
  scene.fog.near = 16 * 3;

  player = new Player(camera, world, world.seed);
  if (saved?.player) {
    player.setGamemode(saved.player.gamemode || gamemode);
    player.health = saved.player.health ?? player.maxHealth;
    player.hunger = saved.player.hunger ?? player.maxHunger;
    player.saturation = saved.player.saturation ?? 2;
    if (saved.player.spawnPoint) player.spawnPoint.set(...saved.player.spawnPoint);
    if (saved.player.inventory) player.inventory.load(saved.player.inventory);
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
  const tip = LOADING_TIPS[Math.floor(Math.random() * LOADING_TIPS.length)];
  const tipEl = document.getElementById('loading-tip');
  if (tipEl) tipEl.innerHTML = '<span>' + tip.split(':')[0] + ':</span>' + tip.split(':').slice(1).join(':');
  ui.updateLoading(0, 'Preparing terrain...');
  ui.hideOverlay();

  // Async prime with loading screen updates
  const pcx = Math.floor(player.position.x / CHUNK_SIZE);
  const pcz = Math.floor(player.position.z / CHUNK_SIZE);
  loader.primeAsync(pcx, pcz, (done, total) => {
    const pct = total > 0 ? (done / total) * 100 : 100;
    const stepText = pct < 30 ? 'Generating terrain...' :
                     pct < 60 ? 'Building landscape...' :
                     pct < 85 ? 'Planting trees...' : 'Almost ready...';
    ui.updateLoading(pct, stepText);
  }).then(() => {
    ui.updateLoading(100, 'Done!');
    syncUIMode();
    gameRunning = true;
    dayTime = 0.3;
    stepTimer = 0;
    setTimeout(() => {
      ui.hideLoading();
      lockPointer();
      try { audio.init(); audio.resume(); audio.startMusic(); } catch (_) {}
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

function initMenu() {
  // Migrate old save
  migrateLegacy();

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
    setTimeout(() => toast.classList.remove('show'), 4000);
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

  // --- Main menu ---
  document.getElementById('btn-play').addEventListener('click', () => {
    ui.showMenu('worlds');
    renderWorldList();
  });
  document.getElementById('btn-achievements').addEventListener('click', () => {
    renderAchievementScreen();
    document.getElementById('achievement-screen').classList.add('open');
  });
  document.getElementById('btn-settings').addEventListener('click', () => {
    ui.showMenu('settings');
    ui._prevMenu = 'main';
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
    let seed = seedStr ? parseInt(seedStr) : Math.floor(Math.random() * 2147483647);
    if (isNaN(seed)) seed = Math.floor(Math.random() * 2147483647);
    const mode = document.querySelector('.mode-option.selected')?.dataset.mode || 'creative';
    const w = createWorld(name, seed, mode);
    startGame(w.id, w.seed, w.gamemode);
  });
  document.getElementById('btn-create-back').addEventListener('click', () => {
    ui.showMenu('worlds');
    renderWorldList();
  });

  // Mode select
  document.querySelectorAll('.mode-option').forEach(el => {
    el.addEventListener('click', () => {
      document.querySelectorAll('.mode-option').forEach(m => m.classList.remove('selected'));
      el.classList.add('selected');
    });
  });

  // Seed preview — render a tiny top-down terrain map when user types a seed
  const seedInput = document.getElementById('input-seed');
  const previewName = document.getElementById('seed-preview-name');
  const previewSub = document.getElementById('seed-preview-sub');
  const previewCanvas = document.getElementById('seed-preview-canvas');
  if (seedInput && previewCanvas) {
    function updateSeedPreview() {
      const val = seedInput.value.trim();
      const previewCtx = previewCanvas.getContext('2d');
      previewCtx.imageSmoothingEnabled = false;
      if (!val) {
        previewCanvas.style.display = 'none';
        if (previewName) previewName.textContent = 'A new world awaits...';
        if (previewSub) previewSub.textContent = 'Enter a seed to preview terrain';
        return;
      }
      let seedVal = parseInt(val);
      if (isNaN(seedVal)) {
        let h = 0;
        for (let i = 0; i < val.length; i++) h = ((h << 5) - h + val.charCodeAt(i)) | 0;
        seedVal = Math.abs(h);
      }
      previewCanvas.style.display = 'block';
      if (previewName) previewName.textContent = 'Seed: ' + seedVal;
      if (previewSub) previewSub.textContent = 'Preview below';
      const pw = 200, ph = 80;
      const noise = new Noise(String(seedVal));
      const SEA_LV = 32;
      for (let px = 0; px < pw; px++) {
        for (let py = 0; py < ph; py++) {
          const wx = px * 3, wz = py * 3;
          const cont = noise.fbm2(noise.continentalness, wx * 0.003, wz * 0.003, 4, 2, 0.5);
          const detail = noise.fbm2(noise.detail, wx * 0.02, wz * 0.02, 3, 2, 0.5);
          const t = noise.fbm2(noise.temp, wx * 0.002 + 200, wz * 0.002 + 200, 3, 2, 0.5);
          let h;
          if (cont < -0.1) h = SEA_LV - 6 + cont * 12 + detail * 3;
          else if (cont < 0.15) h = SEA_LV + (cont + 0.1) * 10 + detail * 4;
          else h = SEA_LV + 2 + (cont - 0.15) * 14 + detail * 5;
          let col;
          if (h < SEA_LV) col = '#2a6ab5';
          else if (t < -0.3) col = '#e8f0e8';
          else if (t < 0.15) col = '#3a7a2a';
          else if (t < 0.45) col = '#5a9a3a';
          else if (t < 0.7) col = '#8aaa40';
          else col = '#d4c090';
          previewCtx.fillStyle = col;
          previewCtx.fillRect(px, py, 1, 1);
        }
      }
    }
    seedInput.addEventListener('input', updateSeedPreview);
    updateSeedPreview();
  }

  // --- Settings ---
  document.getElementById('btn-settings-back').addEventListener('click', () => {
    ui.showMenu(ui._prevMenu || 'main');
  });

  // --- Achievement screen close ---
  document.getElementById('ach-close').addEventListener('click', () => {
    document.getElementById('achievement-screen').classList.remove('open');
    ui.showMenu('main');
  });

  // --- Pause ---
  document.getElementById('btn-resume').addEventListener('click', () => {
    ui.hideOverlay();
    lockPointer();
  });
  document.getElementById('btn-pause-settings').addEventListener('click', () => {
    ui.showMenu('settings');
    ui._prevMenu = 'pause';
  });
  document.getElementById('btn-quit').addEventListener('click', () => {
    saveCurrentWorld();
    gameRunning = false;
    ui.showMenu('worlds');
    renderWorldList();
  });

  // --- Death ---
  document.getElementById('btn-respawn').addEventListener('click', () => {
    player.respawn();
    ui.hideOverlay();
    lockPointer();
  });
  document.getElementById('btn-death-quit').addEventListener('click', () => {
    saveCurrentWorld();
    gameRunning = false;
    ui.showMenu('worlds');
    renderWorldList();
  });

  // Show main menu on load
  ui.showMenu('main');
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
      startGame(w.id, w.seed, w.gamemode);
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

  if (!gameRunning) {
    menuBgTime += dt * 0.07;
    const r = 36;
    menuBgCamera.position.set(Math.cos(menuBgTime) * r, 26 + Math.sin(menuBgTime * 0.2) * 3, Math.sin(menuBgTime) * r);
    menuBgCamera.lookAt(0, 10, 0);
    renderer.render(menuBgScene, menuBgCamera);
    return;
  }

  // Continuous block breaking
  if (mouseLeftHeld && pointerLocked) {
    const hit = currentTarget();
    if (hit) {
      const key = hit.x + ',' + hit.y + ',' + hit.z;
      if (key !== breakingTarget) {
        breakingTarget = key;
        breakingElapsed = 0;
      }
      const elapsed = (now - lastBreakSound) / 1000;
      if (elapsed > 0.3) {
        audio.dig(world.getBlock(hit.x, hit.y, hit.z));
        lastBreakSound = now;
      }
      breakingElapsed += dt;
      const b = world.getBlock(hit.x, hit.y, hit.z);
      const slot = player.inventory.getSelected();
      const toolId = slot && isTool(slot.item) ? slot.item : null;
      const hardness = blockHardness(b);
      let speed = 1;
      if (toolId) speed = toolSpeedFor(toolId, b);
      const isEffective = toolId && toolInfo(toolId)?.type === blockTool(b);
      const breakTime = hardness > 0 ? (BASE_BREAK_TIME / speed) * (isEffective ? 0.5 : 2) : 0;
      const progress = breakTime > 0 ? breakingElapsed / breakTime : 1;
      updateBreaking(Math.min(progress, 1), hit);
      if (progress >= 1) {
        breakBlock(hit);
        breakingTarget = null;
        breakingElapsed = 0;
        updateBreaking(0, null);
        lastBreakSound = now;
      }
    } else {
      updateBreaking(0, null);
    }
  }

  // player physics
  player.update(dt, input);

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
    }
  } else {
    stepTimer = 0;
  }

  // damage sound
  if (player.damageTimer > 0 && prevDamageTimer <= 0) {
    audio.damage();
  }
  prevDamageTimer = player.damageTimer;

  // selection highlight
  const target = currentTarget();
  if (target) {
    highlight.visible = true;
    highlight.position.set(target.x + 0.5, target.y + 0.5, target.z + 0.5);
  } else {
    highlight.visible = false;
  }

  // camera already synced by player.update()

  loader.update(player.position.x, player.position.z);
  manager.tick();
  updateSky(dt);

  // underwater tint
  const eye = player.eyeBlock();
  if (eye === BLOCK.WATER) {
    scene.fog.color.setHex(0x2266aa);
    scene.background.setHex(0x2266aa);
    scene.fog.near = 1; scene.fog.far = 22;
  } else {
    scene.fog.near = 16 * 3;
    scene.fog.far = 16 * renderDist;
  }

  renderer.render(scene, camera);

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
  ui.updateXpBar(0.42, 0);

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
      ui.armorBarEl.innerHTML = '';
    }
  }

  // Auto-save periodically
  autoSaveTimer += dt;
  if (autoSaveTimer > 30) {
    autoSaveTimer = 0;
    saveCurrentWorld();
  }

  // Death detection
  if (player.isDead() && !ui.isOverlayShown()) {
    ui.showMenu('death');
    document.exitPointerLock();
  }
}

let mouseLeftHeld = false;
window.addEventListener('mousedown', (e) => { if (e.button === 0) mouseLeftHeld = true; });
window.addEventListener('mouseup', (e) => { if (e.button === 0) mouseLeftHeld = false; });

window.addEventListener('beforeunload', () => saveCurrentWorld());

let statusBarTimer = 0, autoSaveTimer = 0, stepTimer = 0, prevDamageTimer = 0;
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
