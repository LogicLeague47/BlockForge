// Chunk meshing.
//
// For each voxel we emit the 6 cube faces, but skip a face when the neighbour
// block on that side is opaque (face culling). Transparent blocks (water,
// leaves, glass, plants) are split into a separate "transparent" mesh rendered
// with a different material (alphaTest / depthWrite tricks).
//
// We pack per-vertex data into flat typed arrays:
//   position (3 floats) + uv (2 floats) + color/AO (3 floats) + normal (3 floats)
// Three.js' BufferGeometry reads these directly. Using vertex colors lets us
// bake a cheap directional/AO shading so the world has depth without real-time
// per-pixel lighting on every block.
//
// Two small helpers live here:
//   - face definitions with corner offsets and AO neighbour sampling
//   - a tile lookup that maps a block+face to atlas UVs

import { BLOCK, BLOCKS, tileNameFor } from './blocks.js';
import { tileUVRect } from './tiles.js';
import { CHUNK_SIZE, WORLD_HEIGHT, BIOMES } from './world.js';
import { getLampFaces } from './greenstone.js';
import { acquireMeshBuffers, releaseMeshBuffers } from './chunkbuffer.js';

// Biome tint lookup tables (allocated once, not per chunk rebuild)
const _GRASS_TINT = {
  [BIOMES.PLAINS]:       [1.0,  1.0,  1.0],
  [BIOMES.FOREST]:       [1.0,  1.0,  1.0],
  [BIOMES.BIRCH_FOREST]: [1.0,  1.0,  1.0],
  [BIOMES.DARK_FOREST]:  [0.85, 0.95, 0.85],
  [BIOMES.DESERT]:       [1.2,  1.1,  0.5],
  [BIOMES.TAIGA]:        [0.7,  0.9,  0.7],
  [BIOMES.SNOWY]:        [0.7,  0.9,  0.7],
  [BIOMES.SAVANNA]:      [1.15, 1.1,  0.6],
  [BIOMES.JUNGLE]:       [0.95, 1.05, 0.85],
  [BIOMES.SWAMP]:        [0.65, 0.8,  0.55],
  [BIOMES.MOUNTAINS]:    [1.0,  1.0,  1.0],
  [BIOMES.BEACH]:        [1.0,  1.0,  1.0],
  [BIOMES.OCEAN]:        [1.0,  1.0,  1.0],
  [BIOMES.DEEP_OCEAN]:   [1.0,  1.0,  1.0],
  [BIOMES.RIVER]:        [1.0,  1.0,  1.0],
};
const _LEAF_TINT = {
  [BIOMES.PLAINS]:       [0.9, 1.0, 0.85],
  [BIOMES.FOREST]:       [0.85, 1.0, 0.8],
  [BIOMES.BIRCH_FOREST]: [0.95, 1.0, 0.85],
  [BIOMES.DARK_FOREST]:  [0.7, 0.85, 0.65],
  [BIOMES.DESERT]:       [1.1, 1.0, 0.55],
  [BIOMES.TAIGA]:        [0.6, 0.85, 0.65],
  [BIOMES.SNOWY]:        [0.65, 0.85, 0.7],
  [BIOMES.SAVANNA]:      [1.1, 1.0, 0.55],
  [BIOMES.JUNGLE]:       [0.85, 1.0, 0.75],
  [BIOMES.SWAMP]:        [0.55, 0.75, 0.5],
  [BIOMES.MOUNTAINS]:    [0.85, 0.95, 0.8],
  [BIOMES.BEACH]:        [0.9, 1.0, 0.85],
  [BIOMES.OCEAN]:        [0.9, 1.0, 0.85],
  [BIOMES.DEEP_OCEAN]:   [0.9, 1.0, 0.85],
  [BIOMES.RIVER]:        [0.9, 1.0, 0.85],
};

// Face definitions: outward normal + 4 corner offsets.
//
// Corners are ordered [BL, BR, TR, TL] in CCW order when viewed from OUTSIDE
// the cube. With Three.js' default front face (CCW), this makes every triangle
// face outward so `side: FrontSide` culling shows them correctly. Each face's
// winding was verified by cross product: (v1-v0)x(v2-v0) == outward normal.
//
// Triangles are emitted as (0,1,2) + (0,2,3) — a quad split along the BL-TR
// diagonal — which is CCW for both triangles given this corner order.
const FACES = [
  { // +X (east), normal (+1,0,0)
    dir: [1, 0, 0],
    corners: [[1,0,1],[1,0,0],[1,1,0],[1,1,1]],
    name: 'side',
  },
  { // -X (west), normal (-1,0,0)
    dir: [-1, 0, 0],
    corners: [[0,0,0],[0,0,1],[0,1,1],[0,1,0]],
    name: 'side',
  },
  { // +Y (top), normal (0,+1,0)
    dir: [0, 1, 0],
    corners: [[0,1,1],[1,1,1],[1,1,0],[0,1,0]],
    name: 'top',
  },
  { // -Y (bottom), normal (0,-1,0)
    dir: [0, -1, 0],
    corners: [[0,0,0],[1,0,0],[1,0,1],[0,0,1]],
    name: 'bottom',
  },
  { // +Z (south), normal (0,0,+1)
    dir: [0, 0, 1],
    corners: [[0,0,1],[1,0,1],[1,1,1],[0,1,1]],
    name: 'side',
  },
  { // -Z (north), normal (0,0,-1)
    dir: [0, 0, -1],
    corners: [[1,0,0],[0,0,0],[0,1,0],[1,1,0]],
    name: 'side',
  },
];

// Per-face base brightness — directional shading
// Top gets most light, bottom gets least, sides vary by axis
const FACE_SHADE = {
  top: 1.0,
  bottom: 0.45,
  side: 0.75,
};
// E/W sides brighter, N/S sides slightly darker (like MC)
const SIDE_SHADE_AXIS = { '0': 0.88, '1': 0.88, '2': 0.68, '3': 0.68, '4': 0.82, '5': 0.82 };

// Block-specific color tints for visual variety
const BLOCK_TINT = {
  [BLOCK.GRASS]:        [0.95, 1.0, 0.85],
  [BLOCK.DIRT]:         [0.85, 0.72, 0.55],
  [BLOCK.STONE]:        [0.75, 0.75, 0.78],
  [BLOCK.COBBLESTONE]:  [0.72, 0.72, 0.75],
  [BLOCK.SAND]:         [0.95, 0.9, 0.7],
  [BLOCK.GRAVEL]:       [0.7, 0.68, 0.65],
  [BLOCK.CLAY]:         [0.8, 0.78, 0.75],
  [BLOCK.SNOW]:         [0.95, 0.97, 1.0],
  [BLOCK.SNOW_GRASS]:   [0.88, 0.95, 0.92],
  [BLOCK.LEAVES]:       [0.6, 0.9, 0.55],
  [BLOCK.DARK_OAK_LEAVES]: [0.4, 0.7, 0.35],
  [BLOCK.BIRCH_LEAVES]: [0.55, 0.95, 0.5],
  [BLOCK.SPRUCE_LEAVES]: [0.35, 0.75, 0.32],
  [BLOCK.ACACIA_LEAVES]: [0.5, 0.85, 0.4],
  [BLOCK.WOOD]:         [0.82, 0.65, 0.4],
  [BLOCK.PLANKS]:       [0.88, 0.72, 0.45],
  [BLOCK.BRICK]:        [0.85, 0.5, 0.4],
  [BLOCK.TERRACOTTA]:   [0.85, 0.6, 0.45],
  [BLOCK.GLASS]:        [0.9, 0.95, 1.0],
  [BLOCK.BOOKSHELF]:    [0.78, 0.65, 0.42],
  [BLOCK.PUMPKIN]:      [0.9, 0.65, 0.2],
  [BLOCK.CACTUS]:       [0.35, 0.7, 0.3],
  [BLOCK.COAL_ORE]:     [0.6, 0.6, 0.62],
  [BLOCK.IRON_ORE]:     [0.78, 0.72, 0.65],
  [BLOCK.GOLD_ORE]:     [0.9, 0.8, 0.5],
  [BLOCK.DIAMOND_ORE]:  [0.5, 0.85, 0.9],
  [BLOCK.COPPER_ORE]:   [0.72, 0.55, 0.4],
  [BLOCK.EMERALD_ORE]:  [0.4, 0.8, 0.5],
  [BLOCK.GREENSTONE_ORE]: [0.4, 0.9, 0.5],
  [BLOCK.PRISMITE_ORE]: [0.3, 0.9, 0.7],
  [BLOCK.PODZOL]:       [0.6, 0.5, 0.35],
  [BLOCK.MYCELIUM]:     [0.65, 0.55, 0.6],
  [BLOCK.NETHERRACK]:   [0.65, 0.25, 0.2],
  [BLOCK.JUNGLE_WOOD]:  [0.7, 0.55, 0.35],
};

function isOpaque(blockId) {
  if (blockId === BLOCK.AIR) return false;
  const d = BLOCKS[blockId];
  return d && !d.transparent && !d.bed;
}

function isAirLike(blockId) {
  if (blockId === BLOCK.AIR) return true;
  const d = BLOCKS[blockId];
  return d && (d.transparent || d.plant || d.bed);
}

// Fast block sampler for the mesher. Reads the owning chunk's Uint8Array
// directly for in-chunk neighbours (the common case) and only falls back to a
// numeric-key chunk lookup at chunk borders. No string allocation.
function makeSampler(chunk, world) {
  const cx = chunk.cx, cz = chunk.cz;
  const baseX = cx * CHUNK_SIZE, baseZ = cz * CHUNK_SIZE;
  const data = chunk.data;
  const chunks = world.chunks;
  const parkour = world.parkour;
  const voidWorld = world.void;
  return function (wx, wy, wz) {
    if (wy < 0) return (parkour || voidWorld) ? BLOCK.AIR : BLOCK.BEDROCK;
    if (wy >= WORLD_HEIGHT) return BLOCK.AIR;
    const lx = wx - baseX, lz = wz - baseZ;
    if (lx >= 0 && lx < CHUNK_SIZE && lz >= 0 && lz < CHUNK_SIZE) {
      return data[(wy * CHUNK_SIZE + lz) * CHUNK_SIZE + lx];
    }
    const nc = chunks.get((wx >> 4) * 32768 + (wz >> 4));
    if (!nc) return BLOCK.AIR;
    return nc.data[((wy * CHUNK_SIZE + (wz - ((wz >> 4) << 4))) * CHUNK_SIZE) + (wx - ((wx >> 4) << 4))];
  };
}

// UVs per corner, matching the [BL, BR, TR, TL] corner order above.
// (u0/v0 = tile bottom-left, u1/v1 = tile top-right in atlas UV space.)
const UV_CORNERS = [
  [0, 0], // BL
  [1, 0], // BR
  [1, 1], // TR
  [0, 1], // TL
];

export function buildChunkGeometry(chunk, world) {
  const baseX = chunk.cx * CHUNK_SIZE;
  const baseZ = chunk.cz * CHUNK_SIZE;

  // Sodium-style compact buffers (pooled across rebuilds — FerriteCore).
  const opaque = acquireMeshBuffers();
  const cutout = acquireMeshBuffers();
  const trans = acquireMeshBuffers();
  const water = acquireMeshBuffers();

  // Fast block sampler: reads the current chunk's typed array directly and
  // uses numeric chunk keys for neighbours, avoiding string-key allocation.
  const sample = makeSampler(chunk, world);

  // Find highest non-air block in the chunk to skip empty space above.
  let maxY = 0;
  for (let z = 0; z < CHUNK_SIZE; z++) {
    for (let x = 0; x < CHUNK_SIZE; x++) {
      const surfY = chunk.surfaceMap ? chunk.surfaceMap[z * CHUNK_SIZE + x] : WORLD_HEIGHT - 1;
      if (surfY > maxY) maxY = surfY;
    }
  }
  maxY = Math.min(maxY + 14, WORLD_HEIGHT);

  // Biome-based grass color tinting (module-level to avoid per-rebuild allocation)
  const GRASS_TINT = _GRASS_TINT;
  const LEAF_TINT = _LEAF_TINT;

  for (let y = 0; y < maxY; y++) {
    for (let z = 0; z < CHUNK_SIZE; z++) {
      for (let x = 0; x < CHUNK_SIZE; x++) {
        const b = chunk.get(x, y, z);
        if (b === BLOCK.AIR) continue;
        const def = BLOCKS[b];
        if (!def) continue;

        const wx = baseX + x, wz = baseZ + z;
        const isWater = def.liquid;
        const target = isWater ? water : (def.cutout ? cutout : (def.transparent ? trans : opaque));

        if (def.plant) {
          pushPlant(target, wx, y, wz, b);
          continue;
        }

        // Beds: emit a real bed model instead of a full cube.
        if (b === BLOCK.BED || b === BLOCK.BED_FOOT) {
          pushBed(opaque, wx, y, wz, b, sample);
          continue;
        }

        for (let f = 0; f < 6; f++) {
          const face = FACES[f];
          const nx = wx + face.dir[0], ny = y + face.dir[1], nz = wz + face.dir[2];
          const neighbour = sample(nx, ny, nz);

          let visible;
          if (isOpaque(neighbour)) {
            visible = false;
          } else if (def.transparent) {
            visible = neighbour !== b && !isOpaque(neighbour);
            if (isWater && neighbour === BLOCK.WATER) visible = false;
          } else {
            visible = true;
          }
          if (!visible) continue;

          let yDrop = 0;
          if (isWater && face.name === 'top') yDrop = -0.12;

          let tile = tileNameFor(b, face.name);
          if (b === BLOCK.GREENSTONE_LAMP) {
            const override = getLampFaces(wx, y, wz);
            if (override) tile = override[face.name] || override.side;
          }
          const uvRect = tileUVRect(tile);
          const shade = face.name === 'top' ? FACE_SHADE.top
                      : face.name === 'bottom' ? FACE_SHADE.bottom
                      : (SIDE_SHADE_AXIS[f] || FACE_SHADE.side);

          const ao = computeAO(face, wx, y, wz, sample);

          // Block-specific color tinting + biome grass/leaves tinting
          let tintR = 1, tintG = 1, tintB = 1;

          // Apply block tint (varies block-to-block color)
          const bt = BLOCK_TINT[b];
          if (bt) { tintR = bt[0]; tintG = bt[1]; tintB = bt[2]; }

          // Grass/leaves get additional biome color multiplier
          if (b === BLOCK.GRASS || b === BLOCK.SNOW_GRASS) {
            const biomeIdx = chunk.biomeMap ? chunk.biomeMap[z * CHUNK_SIZE + x] : BIOMES.PLAINS;
            const tint = GRASS_TINT[biomeIdx] || _ONE3;
            tintR *= tint[0]; tintG *= tint[1]; tintB *= tint[2];
          } else if (b === BLOCK.LEAVES || b === BLOCK.DARK_OAK_LEAVES
            || b === BLOCK.BIRCH_LEAVES || b === BLOCK.SPRUCE_LEAVES || b === BLOCK.ACACIA_LEAVES) {
            const biomeIdx = chunk.biomeMap ? chunk.biomeMap[z * CHUNK_SIZE + x] : BIOMES.PLAINS;
            const tint = LEAF_TINT[biomeIdx] || _DEFAULT_LEAF_TINT;
            tintR *= tint[0]; tintG *= tint[1]; tintB *= tint[2];
          }

          const start = target.pos.itemCount;
          for (let c = 0; c < 4; c++) {
            const co = face.corners[c];
            target.pos.push3(
              wx + co[0],
              y + co[1] + (co[1] === 1 ? yDrop : 0),
              wz + co[2]
            );
            const uvr = UV_CORNERS[c];
            target.uv.push2(
              uvr[0] ? uvRect.u1 : uvRect.u0,
              uvr[1] ? uvRect.v1 : uvRect.v0
            );
            if (isWater) {
              target.col.push3(1, 1, 1);
            } else {
              const a = ao[c];
              const s = shade * a;
              target.col.push3(s * tintR, s * tintG, s * tintB);
            }
            target.nor.push3(face.dir[0], face.dir[1], face.dir[2]);
          }
          target.idx.push6(start, start + 1, start + 2, start, start + 2, start + 3);
        }
      }
    }
  }

  const result = { opaque: toGeometry(opaque), cutout: toGeometry(cutout), trans: toGeometry(trans), water: toGeometry(water) };
  releaseMeshBuffers(opaque);
  releaseMeshBuffers(cutout);
  releaseMeshBuffers(trans);
  releaseMeshBuffers(water);
  return result;
}

// Sample 3 neighbours per corner (side1, side2, corner) for ambient occlusion.
const _AO_STRENGTH = [1.0, 0.8, 0.7, 0.5];
const _ONE3 = [1, 1, 1];
const _DEFAULT_LEAF_TINT = [0.9, 1.0, 0.85];
const _PLANT_QUADS = [
  // Vertical billboard in the X-Y plane, centred at z = 0.5
  [[0,0,0.5],[1,0,0.5],[1,1,0.5],[0,1,0.5]],
  // Vertical billboard in the Z-Y plane, centred at x = 0.5
  [[0.5,0,0],[0.5,0,1],[0.5,1,1],[0.5,1,0]],
];
const _PLANT_UVS_BUF = [[0,0],[0,0],[0,0],[0,0]];
const _AO_T_X = [0, 1, 0];
const _AO_T2_X = [0, 0, 1];
const _AO_T_Y = [1, 0, 0];
const _AO_T2_Y = [0, 0, 1];
const _AO_T_Z = [1, 0, 0];
const _AO_T2_Z = [0, 1, 0];
const _ao = [0, 0, 0, 0];
const _fc = [0, 0, 0];

function computeAO(face, x, y, z, sample) {
  const n = face.dir;
  let t1, t2;
  if (n[0] !== 0) { t1 = _AO_T_X; t2 = _AO_T2_X; }
  else if (n[1] !== 0) { t1 = _AO_T_Y; t2 = _AO_T2_Y; }
  else { t1 = _AO_T_Z; t2 = _AO_T2_Z; }

  const ox = x + n[0], oy = y + n[1], oz = z + n[2];
  _fc[0] = 0.5 + n[0] * 0.5;
  _fc[1] = 0.5 + n[1] * 0.5;
  _fc[2] = 0.5 + n[2] * 0.5;
  for (let c = 0; c < 4; c++) {
    const co = face.corners[c];
    const s1 = 2 * ((co[0] - _fc[0]) * t1[0] + (co[1] - _fc[1]) * t1[1] + (co[2] - _fc[2]) * t1[2]);
    const s2 = 2 * ((co[0] - _fc[0]) * t2[0] + (co[1] - _fc[1]) * t2[1] + (co[2] - _fc[2]) * t2[2]);
    const sx = ox + t1[0] * s1 + t2[0] * s2;
    const sy = oy + t1[1] * s1 + t2[1] * s2;
    const sz = oz + t1[2] * s1 + t2[2] * s2;
    const side1 = isOpaque(sample(
      ox + t1[0] * s1, oy + t1[1] * s1, oz + t1[2] * s1
    )) ? 1 : 0;
    const side2 = isOpaque(sample(
      ox + t2[0] * s2, oy + t2[1] * s2, oz + t2[2] * s2
    )) ? 1 : 0;
    const corner = isOpaque(sample(sx, sy, sz)) ? 1 : 0;
    const occ = (side1 && side2) ? 3 : (side1 + side2 + corner);
    _ao[c] = _AO_STRENGTH[occ];
  }
  return _ao;
}

function pushPlant(target, wx, y, wz, blockId) {
  if (isFoliageBlock(blockId)) { pushFoliage3D(target, wx, y, wz, blockId); return; }
  pushPlantBillboard(target, wx, y, wz, blockId);
}

function isFoliageBlock(b) {
  return b === BLOCK.TALL_GRASS || b === BLOCK.FLOWER_RED || b === BLOCK.FLOWER_YELLOW ||
    b === BLOCK.OAK_SAPLING || b === BLOCK.JUNGLE_SAPLING || b === BLOCK.BIRCH_SAPLING ||
    b === BLOCK.SPRUCE_SAPLING || b === BLOCK.DARK_OAK_SAPLING || b === BLOCK.ACACIA_SAPLING;
}

function pushPlantBillboard(target, wx, y, wz, blockId) {
  const tile = tileNameFor(blockId, 'side');
  const uv = tileUVRect(tile);
  for (let q = 0; q < 2; q++) {
    const start = target.pos.itemCount;
    const qu = _PLANT_QUADS[q];
    _PLANT_UVS_BUF[0][0] = uv.u0; _PLANT_UVS_BUF[0][1] = uv.v0;
    _PLANT_UVS_BUF[1][0] = uv.u1; _PLANT_UVS_BUF[1][1] = uv.v0;
    _PLANT_UVS_BUF[2][0] = uv.u1; _PLANT_UVS_BUF[2][1] = uv.v1;
    _PLANT_UVS_BUF[3][0] = uv.u0; _PLANT_UVS_BUF[3][1] = uv.v1;
    for (let i = 0; i < 4; i++) {
      const dx = qu[i][0], dy = qu[i][1], dz = qu[i][2];
      target.pos.push3(wx + dx, y + dy, wz + dz);
      target.uv.push2(_PLANT_UVS_BUF[i][0], _PLANT_UVS_BUF[i][1]);
      target.col.push3(1, 1, 1);
      target.nor.push3(0, 1, 0);
    }
    target.idx.push6(start, start + 1, start + 2, start, start + 2, start + 3);
  }
}

// Push a solid 3D box (used for 3D plant models) into the target mesh.
function pushBox(target, x0, y0, z0, x1, y1, z1, tile, tint) {
  const uvRect = tileUVRect(tile);
  const t = tint || _ONE3;
  for (let f = 0; f < 6; f++) {
    const face = FACES[f];
    const start = target.pos.itemCount;
    for (let c = 0; c < 4; c++) {
      const co = face.corners[c];
      const px = co[0] ? x1 : x0;
      const py = co[1] ? y1 : y0;
      const pz = co[2] ? z1 : z0;
      target.pos.push3(px, py, pz);
      const uvr = UV_CORNERS[c];
      target.uv.push2(uvr[0] ? uvRect.u1 : uvRect.u0, uvr[1] ? uvRect.v1 : uvRect.v0);
      const s = face.name === 'top' ? 1.0 : face.name === 'bottom' ? 0.5 : 0.8;
      target.col.push3(s * t[0], s * t[1], s * t[2]);
      target.nor.push3(face.dir[0], face.dir[1], face.dir[2]);
    }
    target.idx.push6(start, start + 1, start + 2, start, start + 2, start + 3);
  }
}

// Real 3D foliage models instead of flat billboards.
function pushFoliage3D(target, wx, y, wz, blockId) {
  if (blockId === BLOCK.TALL_GRASS) {
    const blades = [
      [0.35, 0.85, 0.35], [0.6, 0.7, 0.5], [0.5, 0.92, 0.65],
      [0.35, 0.75, 0.6], [0.66, 0.8, 0.35], [0.5, 0.96, 0.42],
    ];
    for (const [bx, bz, h] of blades) {
      pushBox(target, wx + bx - 0.045, y, wz + bz - 0.045, wx + bx + 0.045, y + h, wz + bz + 0.045, 'tall_grass', _ONE3);
    }
    return;
  }
  if (blockId === BLOCK.FLOWER_RED || blockId === BLOCK.FLOWER_YELLOW) {
    const bloom = blockId === BLOCK.FLOWER_RED ? 'flower_red' : 'flower_yellow';
    pushBox(target, wx + 0.44, y, wz + 0.44, wx + 0.56, y + 0.5, wz + 0.56, 'tall_grass', _ONE3);
    pushBox(target, wx + 0.3, y + 0.45, wz + 0.3, wx + 0.7, y + 0.92, wz + 0.7, bloom, _ONE3);
    return;
  }
  // Saplings: stem + leafy crown
  pushBox(target, wx + 0.44, y, wz + 0.44, wx + 0.56, y + 0.5, wz + 0.56, 'tall_grass', _ONE3);
  pushBox(target, wx + 0.3, y + 0.45, wz + 0.3, wx + 0.7, y + 0.85, wz + 0.7, 'leaves', _ONE3);
  pushBox(target, wx + 0.36, y + 0.72, wz + 0.36, wx + 0.64, y + 1.0, wz + 0.64, 'leaves', _ONE3);
}

function toGeometry(buf) {
  return {
    position: buf.pos.toArray(),
    uv: buf.uv.toArray(),
    color: buf.col.toArray(),
    normal: buf.nor.toArray(),
    index: buf.idx.length ? buf.idx.toArray() : null,
  };
}

// ── bed model ─────────────────────────────────────────
// A bed is two blocks: a head (BED) and a foot (BED_FOOT). Instead of a full
// cube we emit a proper bed: 4 wooden legs, a low mattress with blanket, a tall
// headboard + pillow on the head block, and a low footboard on the foot block.
//
// Orientation is derived from the neighbouring half so no metadata is needed:
// the headboard/pillow point AWAY from the other half of the bed.
const BED_LEG = [0.05, 0, 0.05, 0.15, 0.44, 0.15]; // x0,y0,z0,x1,y1,z1
const BED_MATTRESS = [0, 0.44, 0, 1, 0.75, 1];
const BED_HEADBOARD = [0, 0.44, 0, 1, 1, 0.125];
const BED_FOOTBOARD = [0, 0.44, 0, 1, 0.62, 0.125];

// Rotate the top-face UVs so the pillow edge (v1) of bed_top faces `dir`.
// rot: 0 => pillow at -Z, 1 => +X, 2 => +Z, 3 => -X
function bedRotFromDir(dx, dz) {
  if (dx === 0 && dz === -1) return 0;
  if (dx === 1 && dz === 0) return 1;
  if (dx === 0 && dz === 1) return 2;
  return 3;
}

// Emit a single axis-aligned box with per-face tiles. `box` is
// [x0,y0,z0,x1,y1,z1] in block-local coords; `faceTiles` is an array of 6
// tile names in FACES order (null = skip that face). `uvRotate` rotates the
// texture on the top face only (0-3). Faces that lie flush on a block boundary
// are culled when the neighbouring block is opaque (avoids z-fighting).
function pushBedBox(target, wx, y, wz, box, faceTiles, uvRotate = 0, sample) {
  for (let f = 0; f < 6; f++) {
    const tile = faceTiles[f];
    if (!tile) continue;
    const face = FACES[f];
    const d = face.dir;
    // Flush boundary check: face plane equals block min/max on its axis.
    const atBoundary =
      (d[0] !== 0 && box[d[0] === 1 ? 3 : 0] === (d[0] === 1 ? 1 : 0)) ||
      (d[1] !== 0 && box[d[1] === 1 ? 4 : 1] === (d[1] === 1 ? 1 : 0)) ||
      (d[2] !== 0 && box[d[2] === 1 ? 5 : 2] === (d[2] === 1 ? 1 : 0));
    if (atBoundary && sample && isOpaque(sample(wx + d[0], y + d[1], wz + d[2]))) continue;

    const uv = tileUVRect(tile);
    const shade = face.name === 'top' ? FACE_SHADE.top
                : face.name === 'bottom' ? FACE_SHADE.bottom
                : (SIDE_SHADE_AXIS[f] || FACE_SHADE.side);
    const start = target.pos.itemCount;
    for (let c = 0; c < 4; c++) {
      const co = face.corners[c];
      target.pos.push3(
        wx + box[0] + co[0] * (box[3] - box[0]),
        y + box[1] + co[1] * (box[4] - box[1]),
        wz + box[2] + co[2] * (box[5] - box[2])
      );
      const uvr = UV_CORNERS[(c + uvRotate) % 4];
      target.uv.push2(uvr[0] ? uv.u1 : uv.u0, uvr[1] ? uv.v1 : uv.v0);
      target.col.push3(shade, shade, shade);
      target.nor.push3(face.dir[0], face.dir[1], face.dir[2]);
    }
    target.idx.push6(start, start + 1, start + 2, start, start + 2, start + 3);
  }
}

function pushBed(target, wx, y, wz, blockId, sample) {
  const isHead = blockId === BLOCK.BED;
  const other = isHead ? BLOCK.BED_FOOT : BLOCK.BED;

  // Direction toward the OTHER half of the bed.
  let dx = 0, dz = 0;
  if (sample(wx + 1, y, wz) === other) dx = 1;
  else if (sample(wx - 1, y, wz) === other) dx = -1;
  else if (sample(wx, y, wz + 1) === other) dz = 1;
  else if (sample(wx, y, wz - 1) === other) dz = -1;
  if (dx === 0 && dz === 0) dz = -1; // orphan half: fallback orientation

  // Head end = away from the other half. Headboard/pillow sit there.
  const hx = -dx, hz = -dz;
  const rot = bedRotFromDir(hx, hz);

  // 4 legs at the corners (planks). Skip bottom face (sits on the floor).
  const legTiles = ['planks', 'planks', 'planks', null, 'planks', 'planks'];
  for (const [lx, lz] of [[0, 0], [1, 0], [0, 1], [1, 1]]) {
    const leg = [lx === 0 ? BED_LEG[0] : 1 - BED_LEG[3], BED_LEG[1], lz === 0 ? BED_LEG[2] : 1 - BED_LEG[5],
                 lx === 0 ? BED_LEG[3] : 1 - BED_LEG[0], BED_LEG[4], lz === 0 ? BED_LEG[5] : 1 - BED_LEG[2]];
    pushBedBox(target, wx, y, wz, leg, legTiles, 0, sample);
  }

  // Mattress + blanket. Top shows pillow/blanket (rotated toward head end).
  // Skip the side face that the headboard/footboard covers (coplanar → z-fight).
  const topTile = isHead ? 'bed_top' : 'bed_foot_top';
  const sideTile = isHead ? 'bed_side' : 'bed_foot_side';
  const skipFace = hx === 1 ? 0 : hx === -1 ? 1 : hz === 1 ? 4 : 5;
  const mattressTiles = [
    skipFace === 0 ? null : sideTile,
    skipFace === 1 ? null : sideTile,
    topTile,
    null,
    skipFace === 4 ? null : sideTile,
    skipFace === 5 ? null : sideTile,
  ];
  pushBedBox(target, wx, y, wz, BED_MATTRESS, mattressTiles, rot);

  if (isHead) {
    let hb;
    if (hx === -1) hb = [0, 0.44, 0, 0.125, 1, 1];
    else if (hz === 1) hb = [0, 0.44, 1 - 0.125, 1, 1, 1];
    else if (hz === -1) hb = [0, 0.44, 0, 1, 1, 0.125];
    else hb = [1 - 0.125, 0.44, 0, 1, 1, 1];
    pushBedBox(target, wx, y, wz, hb, ['planks', 'planks', 'planks', null, 'planks', 'planks']);
  } else {
    let fb;
    if (hx === -1) fb = [0, 0.44, 0, 0.125, 0.62, 1];
    else if (hz === 1) fb = [0, 0.44, 1 - 0.125, 1, 0.62, 1];
    else if (hz === -1) fb = [0, 0.44, 0, 1, 0.62, 0.125];
    else fb = [1 - 0.125, 0.44, 0, 1, 0.62, 1];
    pushBedBox(target, wx, y, wz, fb, ['planks', 'planks', 'planks', null, 'planks', 'planks']);
  }
}
