// Voxel raycasting using the DDA (Amanatides & Woo) algorithm.
//
// Given an origin + unit direction, steps cell-by-cell through the voxel grid,
// always advancing to the nearest boundary. Returns the first non-air block
// hit (within `maxDist`), along with the face normal — which tells the caller
// which adjacent cell to place a new block into.

import { BLOCK, BLOCKS } from './blocks.js';

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
    // Skip air and non-solid liquids (e.g. water) so you can't target/break
    // them and can reach the block behind.
    if (b !== BLOCK.AIR && !BLOCKS[b]?.liquid) {
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

// Mobile: find the closest solid block within radius of a point.
// Scans a cube of blocks around the player and returns the nearest one.
export function closestBlockInRadius(world, pos, radius = 6) {
  const px = Math.floor(pos.x);
  const py = Math.floor(pos.y);
  const pz = Math.floor(pos.z);
  let closest = null;
  let closestDist = radius + 1;

  for (let dy = -radius; dy <= radius; dy++) {
    for (let dz = -radius; dz <= radius; dz++) {
      for (let dx = -radius; dx <= radius; dx++) {
        const bx = px + dx;
        const by = py + dy;
        const bz = pz + dz;
        const b = world.getBlock(bx, by, bz);
        if (b === BLOCK.AIR || BLOCKS[b]?.liquid) continue;

        // Distance from player center to block center
        const cx = bx + 0.5;
        const cy = by + 0.5;
        const cz = bz + 0.5;
        const dist = Math.sqrt((cx - pos.x) ** 2 + (cy - pos.y) ** 2 + (cz - pos.z) ** 2);

        if (dist < closestDist) {
          closestDist = dist;
          // Calculate face normal (direction from player to block)
          const nx = dx === 0 ? 0 : (dx > 0 ? -1 : 1);
          const ny = dy === 0 ? 0 : (dy > 0 ? -1 : 1);
          const nz = dz === 0 ? 0 : (dz > 0 ? -1 : 1);
          closest = {
            block: b,
            x: bx, y: by, z: bz,
            normal: { x: nx, y: ny, z: nz },
            place: { x: bx + nx, y: by + ny, z: bz + nz },
            distance: dist,
          };
        }
      }
    }
  }
  return closest;
}
