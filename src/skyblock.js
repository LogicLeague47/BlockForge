// SkyBlock minigame: reproduces the "Skyblock Plus" BlockForge map (extracted to
// skyblock-data.js) in a void world. Every island from the source world is
// rebuilt at its original coordinates, chests are filled with their captured
// contents, and water/lava sources are handed to the liquid simulator so the
// falls and lakes flow exactly like the original.

import { BLOCK } from './blocks.js';
import { SKYBLOCK_MAP } from './skyblock-data.js';
import { registerSource } from './liquid.js';

export const SB_SPAWN = SKYBLOCK_MAP.spawn;       // { x, y, z } world spawn
export const SB_VOID_BELOW = -2;                  // fall below this → respawn

// Starter kit handed out in survival so the map is playable from the spawn chest.
export const SB_STARTER_KIT = [
  [BLOCK.OAK_SAPLING, 2],
  [BLOCK.SPRUCE_SAPLING, 1],
  [BLOCK.BIRCH_SAPLING, 1],
  [BLOCK.JUNGLE_SAPLING, 1],
  [BLOCK.DARK_OAK_SAPLING, 1],
];

export function buildSkyblockMap(world) {
  let liquidSources = 0;
  for (const is of SKYBLOCK_MAP.islands) {
    const ox = is.o[0], oy = is.o[1], oz = is.o[2];
    const arr = is.b;
    for (let i = 0; i < arr.length; i += 4) {
      const x = ox + arr[i], y = oy + arr[i + 1], z = oz + arr[i + 2];
      const id = arr[i + 3];
      world.setBlock(x, y, z, id);
      if (id === BLOCK.WATER || id === BLOCK.LAVA) {
        registerSource(x, y, z);
        liquidSources++;
      } else if (id === BLOCK.CHEST) {
        world.getOrCreateChest(x, y, z);
      }
    }
  }

  // Fill chest inventories captured from the source world (block entities).
  for (const c of SKYBLOCK_MAP.chests) {
    const cx = c.p[0], cy = c.p[1], cz = c.p[2];
    if (world.getBlock(cx, cy, cz) !== BLOCK.CHEST) continue;
    const inv = world.getOrCreateChest(cx, cy, cz);
    for (const [slot, item, count] of c.i) {
      if (slot >= 0 && slot < 27 && count > 0) inv[slot] = { item, count };
    }
  }

  return {
    spawn: SKYBLOCK_MAP.spawn,
    islands: SKYBLOCK_MAP.islands.length,
    liquidSources,
  };
}

export function clearSkyblock() {
  // Liquid + map state live on the World instance; nothing module-level to reset.
}
