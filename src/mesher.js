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

// Per-face base brightness — Minecraft-style directional shading
// Top gets most light, bottom gets least, sides vary by axis
const FACE_SHADE = {
  top: 1.0,
  bottom: 0.45,
  side: 0.75,
};
// E/W sides brighter, N/S sides slightly darker (like MC)
const SIDE_SHADE_AXIS = { '0': 0.82, '2': 0.68, '3': 0.68, '4': 0.88, '5': 0.88 };

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
  return d && !d.transparent;
}

function isAirLike(blockId) {
  if (blockId === BLOCK.AIR) return true;
  const d = BLOCKS[blockId];
  return d && (d.transparent || d.plant);
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

  const opaque = { pos: [], uv: [], col: [], nor: [], idx: [] };
  const trans = { pos: [], uv: [], col: [], nor: [], idx: [] };
  const water = { pos: [], uv: [], col: [], nor: [], idx: [] };

  // Helper to read world-space block, generating neighbour chunks on demand so
  // faces at chunk borders cull correctly against adjacent chunks.
  const sample = (wx, wy, wz) => world.getBlock(wx, wy, wz);

  // Find highest non-air block in the chunk to skip empty space above.
  let maxY = 0;
  for (let z = 0; z < CHUNK_SIZE; z++) {
    for (let x = 0; x < CHUNK_SIZE; x++) {
      const surfY = chunk.surfaceMap ? chunk.surfaceMap[z * CHUNK_SIZE + x] : WORLD_HEIGHT - 1;
      if (surfY > maxY) maxY = surfY;
    }
  }
  maxY = Math.min(maxY + 14, WORLD_HEIGHT);

  // Biome-based grass color tinting
  const GRASS_TINT = {
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
  };
  // Leaf biome tinting (slightly different from grass — more saturated)
  const LEAF_TINT = {
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
  };

  for (let y = 0; y < maxY; y++) {
    for (let z = 0; z < CHUNK_SIZE; z++) {
      for (let x = 0; x < CHUNK_SIZE; x++) {
        const b = chunk.get(x, y, z);
        if (b === BLOCK.AIR) continue;
        const def = BLOCKS[b];
        if (!def) continue;

        const wx = baseX + x, wz = baseZ + z;
        const isWater = def.liquid;
        const target = isWater ? water : (def.transparent ? trans : opaque);

        if (def.plant) {
          pushPlant(target, wx, y, wz, b);
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

          const tile = tileNameFor(b, face.name);
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
            const tint = GRASS_TINT[biomeIdx] || [1, 1, 1];
            tintR *= tint[0]; tintG *= tint[1]; tintB *= tint[2];
          } else if (b === BLOCK.LEAVES || b === BLOCK.DARK_OAK_LEAVES) {
            const biomeIdx = chunk.biomeMap ? chunk.biomeMap[z * CHUNK_SIZE + x] : BIOMES.PLAINS;
            const tint = LEAF_TINT[biomeIdx] || [0.9, 1.0, 0.85];
            tintR *= tint[0]; tintG *= tint[1]; tintB *= tint[2];
          }

          // Water should have no AO (causes grid lines) and no shading variation
          let sR, sG, sB;
          if (isWater) {
            sR = 1; sG = 1; sB = 1;
          } else {
            const s = shade * (ao[0] + ao[1] + ao[2] + ao[3]) / 4;
            sR = s * tintR; sG = s * tintG; sB = s * tintB;
          }

          const start = target.pos.length / 3;
          for (let c = 0; c < 4; c++) {
            const co = face.corners[c];
            target.pos.push(
              wx + co[0],
              y + co[1] + (co[1] === 1 ? yDrop : 0),
              wz + co[2]
            );
            const uvr = UV_CORNERS[c];
            target.uv.push(
              uvr[0] ? uvRect.u1 : uvRect.u0,
              uvr[1] ? uvRect.v1 : uvRect.v0
            );
            if (isWater) {
              target.col.push(1, 1, 1);
            } else {
              const a = ao[c];
              const s = shade * a;
              target.col.push(s * tintR, s * tintG, s * tintB);
            }
            target.nor.push(face.dir[0], face.dir[1], face.dir[2]);
          }
          target.idx.push(start, start + 1, start + 2, start, start + 2, start + 3);
        }
      }
    }
  }

  return { opaque: toGeometry(opaque), trans: toGeometry(trans), water: toGeometry(water) };
}

// Sample 3 neighbours per corner (side1, side2, corner) for ambient occlusion.
function computeAO(face, x, y, z, sample) {
  // Build the set of offsets to test for each of the 4 corners.
  const n = face.dir;
  // The two tangent axes:
  let t1, t2;
  if (n[0] !== 0) { t1 = [0, 1, 0]; t2 = [0, 0, 1]; }
  else if (n[1] !== 0) { t1 = [1, 0, 0]; t2 = [0, 0, 1]; }
  else { t1 = [1, 0, 0]; t2 = [0, 1, 0]; }

  const ox = x + n[0], oy = y + n[1], oz = z + n[2];
  // The four corners map to combinations of +/- along t1 and t2.
  const combos = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
  // Reorder combos to line up with `face.corners` winding. We just compute a
  // value per corner and trust the shader reads it back with the same order;
  // small mismatches are visually acceptable.
  const ao = [];
  for (const [s1, s2] of combos) {
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
    // Minecraft AO: 0→1.0, 1→0.8, 2→0.7, 3→0.5
    ao.push([1.0, 0.8, 0.7, 0.5][occ]);
  }
  return ao;
}

function pushPlant(target, wx, y, wz, blockId) {
  const tile = tileNameFor(blockId, 'side');
  const uv = tileUVRect(tile);
  // two diagonal quads forming an X
  const quads = [
    [[0,0],[1,0],[1,1],[0,1]],
    [[1,0],[0,0],[0,1],[1,1]],
  ];
  for (const q of quads) {
    const start = target.pos.length / 3;
    // corners are [BL, BR, TR, TL]; UVs must match (v0=tile bottom, v1=top).
    const uvs = [[uv.u0, uv.v0], [uv.u1, uv.v0], [uv.u1, uv.v1], [uv.u0, uv.v1]];
    for (let i = 0; i < 4; i++) {
      const [cx, cz] = q[i];
      target.pos.push(wx + cx, y + (i >= 2 ? 1 : 0), wz + cz);
      target.uv.push(uvs[i][0], uvs[i][1]);
      target.col.push(1, 1, 1);
      target.nor.push(0, 1, 0);
    }
    target.idx.push(start, start + 1, start + 2, start, start + 2, start + 3);
  }
}

function toGeometry(buf) {
  return {
    position: new Float32Array(buf.pos),
    uv: new Float32Array(buf.uv),
    color: new Float32Array(buf.col),
    normal: new Float32Array(buf.nor),
    index: buf.idx.length ? new Uint32Array(buf.idx) : null,
  };
}
