// BlockForge-style extruded item meshes ("item/generated" + "item/handheld").
//
// Java Edition does NOT hand-build tools out of boxes. Every non-block item —
// swords, pickaxes, ingots, food — is the 16x16 pixel-art icon EXTRUDED to one
// texel of thickness: two full alpha-cut quads (front/back) plus thin darkened
// side walls along the sprite silhouette. This module replicates that in
// Three.js with a single draw call per item:
//
//   - front/back: full-texture quads, alphaTest-cut, full-bright vertex color
//   - sides: one quad per exposed texel edge, UV pinned to the edge texel so
//     sides look like dark pixel streaks (0.55x vertex shade, like BlockForge)
//
// Geometry + material are cached per (itemId, size) and SHARED across all
// meshes. Never dispose a mesh flagged with userData.sharedItemMesh — the
// cache owns those resources for the life of the texture pack.

import * as THREE from 'three';

const _cache = new Map(); // `${itemId}:${size}` -> { geometry, material }

export function isSharedItemMesh(o) {
  return !!o?.userData?.sharedItemMesh;
}

// iconCanvas: 16x16 (or NxN) canvas from makeItemIconCanvas(itemId).
// size: world-space width/height of the item quad.
export function getExtrudedItemMesh(itemId, iconCanvas, size = 0.5) {
  const key = itemId + ':' + size;
  let entry = _cache.get(key);
  if (!entry) {
    entry = _buildEntry(iconCanvas, size);
    _cache.set(key, entry);
  }
  const mesh = new THREE.Mesh(entry.geometry, entry.material);
  mesh.userData.sharedItemMesh = true;
  return mesh;
}

export function clearExtrudedItemCache() {
  for (const e of _cache.values()) {
    e.geometry.dispose();
    e.material.map?.dispose();
    e.material.dispose();
  }
  _cache.clear();
}

function _buildEntry(iconCanvas, size) {
  const N = iconCanvas.width;
  const img = iconCanvas.getContext('2d').getImageData(0, 0, N, iconCanvas.height).data;
  const H = iconCanvas.height;
  const opaque = (x, y) =>
    x >= 0 && y >= 0 && x < N && y < H && img[(y * N + x) * 4 + 3] > 128;

  const px = size / N;
  const thick = px; // BlockForge thickness = 1 texel, centered on z=0
  const z1 = thick / 2, z0 = -thick / 2;
  const h = (size * H) / N;

  const positions = [];
  const normals = [];
  const uvs = [];
  const colors = [];
  const indices = [];
  let vi = 0;

  const quad = (corners, normal, shade) => {
    // corners: 4x [x, y, z]; uvs: 4x [u, v]
    for (let i = 0; i < 4; i++) {
      positions.push(corners[i][0], corners[i][1], corners[i][2]);
      normals.push(normal[0], normal[1], normal[2]);
      uvs.push(corners[i][3], corners[i][4]);
      colors.push(shade, shade, shade);
    }
    indices.push(vi, vi + 1, vi + 2, vi, vi + 2, vi + 3);
    vi += 4;
  };

  const S = size / 2, HH = h / 2;
  // Front (+z): full texture, CCW from outside
  quad(
    [[-S, -HH, z1, 0, 0], [S, -HH, z1, 1, 0], [S, HH, z1, 1, 1], [-S, HH, z1, 0, 1]],
    [0, 0, 1], 1.0
  );
  // Back (-z): mirrored winding so it faces -z
  quad(
    [[S, -HH, z0, 1, 0], [-S, -HH, z0, 0, 0], [-S, HH, z0, 0, 1], [S, HH, z0, 1, 1]],
    [0, 0, -1], 1.0
  );

  // Silhouette side walls, one quad per exposed texel edge.
  // UV pinned to the edge texel center; shaded 0.55 like BlockForge side lighting.
  const SHADE = 0.55;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < N; x++) {
      if (!opaque(x, y)) continue;
      const x0 = (x / N - 0.5) * size;
      const x1 = ((x + 1) / N - 0.5) * size;
      const yTop = (0.5 - y / H) * h;
      const yBot = (0.5 - (y + 1) / H) * h;
      const u = (x + 0.5) / N;
      const v = 1 - (y + 0.5) / H;
      if (!opaque(x, y - 1)) {
        quad([[x0, yTop, z1, u, v], [x1, yTop, z1, u, v], [x1, yTop, z0, u, v], [x0, yTop, z0, u, v]], [0, 1, 0], SHADE);
      }
      if (!opaque(x, y + 1)) {
        quad([[x1, yBot, z1, u, v], [x0, yBot, z1, u, v], [x0, yBot, z0, u, v], [x1, yBot, z0, u, v]], [0, -1, 0], SHADE);
      }
      if (!opaque(x - 1, y)) {
        quad([[x0, yBot, z1, u, v], [x0, yTop, z1, u, v], [x0, yTop, z0, u, v], [x0, yBot, z0, u, v]], [-1, 0, 0], SHADE);
      }
      if (!opaque(x + 1, y)) {
        quad([[x1, yTop, z1, u, v], [x1, yBot, z1, u, v], [x1, yBot, z0, u, v], [x1, yTop, z0, u, v]], [1, 0, 0], SHADE);
      }
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.setIndex(indices);

  const tex = new THREE.CanvasTexture(iconCanvas);
  tex.magFilter = THREE.NearestFilter;
  tex.minFilter = THREE.NearestFilter;
  tex.generateMipmaps = false;
  tex.colorSpace = THREE.SRGBColorSpace;

  // Lambert + vertexColors: front/back render full-bright white, silhouette
  // walls render darkened — matches BlockForge's textured-faces / solid-sides look.
  // DoubleSide so hand-rolled windings can never cull a wall.
  const material = new THREE.MeshLambertMaterial({
    map: tex,
    alphaTest: 0.5,
    side: THREE.DoubleSide,
    vertexColors: true,
    fog: false,
  });

  return { geometry, material };
}
