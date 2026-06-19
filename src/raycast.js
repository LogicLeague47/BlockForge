// Voxel raycasting using the DDA (Amanatides & Woo) algorithm.
//
// Given an origin + unit direction, steps cell-by-cell through the voxel grid,
// always advancing to the nearest boundary. Returns the first non-air block
// hit (within `maxDist`), along with the face normal — which tells the caller
// which adjacent cell to place a new block into.

import { BLOCK } from './blocks.js';

export function raycastVoxel(world, origin, dir, maxDist = 6) {
  let x = Math.floor(origin.x);
  let y = Math.floor(origin.y);
  let z = Math.floor(origin.z);

  const stepX = Math.sign(dir.x);
  const stepY = Math.sign(dir.y);
  const stepZ = Math.sign(dir.z);

  // Distance (in t) to cross one full cell along each axis.
  const tDeltaX = dir.x !== 0 ? Math.abs(1 / dir.x) : Infinity;
  const tDeltaY = dir.y !== 0 ? Math.abs(1 / dir.y) : Infinity;
  const tDeltaZ = dir.z !== 0 ? Math.abs(1 / dir.z) : Infinity;

  // t value at which we hit the next cell boundary along each axis.
  const fracX = dir.x > 0 ? (1 - (origin.x - x)) : (origin.x - x);
  const fracY = dir.y > 0 ? (1 - (origin.y - y)) : (origin.y - y);
  const fracZ = dir.z > 0 ? (1 - (origin.z - z)) : (origin.z - z);
  let tMaxX = dir.x !== 0 ? tDeltaX * Math.abs(fracX) : Infinity;
  let tMaxY = dir.y !== 0 ? tDeltaY * Math.abs(fracY) : Infinity;
  let tMaxZ = dir.z !== 0 ? tDeltaZ * Math.abs(fracZ) : Infinity;

  let nx = 0, ny = 0, nz = 0;
  let t = 0;

  while (t <= maxDist) {
    const b = world.getBlock(x, y, z);
    if (b !== BLOCK.AIR) {
      return {
        block: b,
        x, y, z,
        normal: { x: nx, y: ny, z: nz },
        // place position = hit cell + normal
        place: { x: x + nx, y: y + ny, z: z + nz },
        distance: t,
      };
    }

    if (tMaxX < tMaxY && tMaxX < tMaxZ) {
      x += stepX; t = tMaxX; tMaxX += tDeltaX;
      nx = -stepX; ny = 0; nz = 0;
    } else if (tMaxY < tMaxZ) {
      y += stepY; t = tMaxY; tMaxY += tDeltaY;
      nx = 0; ny = -stepY; nz = 0;
    } else {
      z += stepZ; t = tMaxZ; tMaxZ += tDeltaZ;
      nx = 0; ny = 0; nz = -stepZ;
    }
  }
  return null;
}
