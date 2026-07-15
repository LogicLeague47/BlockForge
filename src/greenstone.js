import { BLOCK, BLOCKS } from './blocks.js';

const CARDINAL = [
  [1, 0, 0],
  [-1, 0, 0],
  [0, 0, 1],
  [0, 0, -1],
];

const DIR_OFFSETS = {
  north:  [0, 0, -1],
  south:  [0, 0,  1],
  east:   [1, 0,  0],
  west:  [-1, 0,  0],
};

function oppositeDir(dir) {
  switch (dir) {
    case 'north': return 'south';
    case 'south': return 'north';
    case 'east':  return 'west';
    case 'west':  return 'east';
    default:      return 'north';
  }
}

const IMMOVABLE = new Set([BLOCK.BEDROCK, BLOCK.OBSIDIAN]);

export class GreenstoneSystem {
  constructor() {
    this._powerMap = new Map();
    this._pistonStates = new Map();
    this._poweredLamps = new Set();
    this._dirty = true;
    this._cooldown = 0;
    this._sources = new Map();
    this._wires = new Set();
  }

  markDirty() {
    this._dirty = true;
  }

  update(dt, world) {
    if (this._dirty) {
      this._dirty = false;
      this._cooldown = 0.05;
      this._propagate(world);
      this._updateLamps(world);
      this._updatePistons(world);
    }
    if (this._cooldown > 0) {
      this._cooldown -= dt;
    }
  }

  getPower(x, y, z) {
    return this._powerMap.get(x + ',' + y + ',' + z) || 0;
  }

  setPower(x, y, z, level) {
    const key = x + ',' + y + ',' + z;
    if (level <= 0) {
      this._powerMap.delete(key);
    } else {
      this._powerMap.set(key, Math.min(15, Math.max(0, level)));
    }
  }

  clearPower(x, y, z) {
    this._powerMap.delete(x + ',' + y + ',' + z);
  }

  onBlockChange(x, y, z, blockId, world) {
    const key = x + ',' + y + ',' + z;
    if (blockId === BLOCK.AIR) {
      this._sources.delete(key);
      this._wires.delete(key);
      this.clearPower(x, y, z);
    } else if (blockId === BLOCK.GREENSTONE_BLOCK || blockId === BLOCK.GREENSTONE_TORCH ||
               blockId === BLOCK.LEVER || blockId === BLOCK.STONE_BUTTON) {
      this._sources.set(key, blockId);
    } else if (blockId === BLOCK.GREENSTONE_WIRE) {
      this._wires.add(key);
    } else {
      this._sources.delete(key);
      this._wires.delete(key);
    }
    this.markDirty();
  }

  _propagate(world) {
    this._powerMap.clear();
    this._collectSources(world);
    this._spreadThroughWires(world);
  }

  _collectSources(world) {
    for (const [key, blockId] of this._sources) {
      const [x, y, z] = key.split(',').map(Number);
      const current = world.getBlock(x, y, z);
      if (current !== blockId) {
        this._sources.delete(key);
        continue;
      }
      this.setPower(x, y, z, 15);
    }
  }

  _spreadThroughWires(world) {
    let changed = true;
    let iterations = 0;
    const maxIterations = 16;

    while (changed && iterations < maxIterations) {
      changed = false;
      iterations++;

      const keys = Array.from(this._powerMap.keys());
      for (const key of keys) {
        const [sx, sy, sz] = key.split(',').map(Number);
        const sourcePower = this._powerMap.get(key);

        const offsets = [...CARDINAL, [0, 1, 0], [0, -1, 0]];
        for (const [dx, dy, dz] of offsets) {
          const nx = sx + dx;
          const ny = sy + dy;
          const nz = sz + dz;
          const nKey = nx + ',' + ny + ',' + nz;
          const blockId = world.getBlock(nx, ny, nz);

          if (blockId === BLOCK.GREENSTONE_WIRE) {
            const wirePower = sourcePower - 1;
            if (wirePower > 0) {
              const existing = this._powerMap.get(nKey) || 0;
              if (wirePower > existing) {
                this.setPower(nx, ny, nz, wirePower);
                changed = true;
              }
            }
          }
        }
      }
    }
  }

  _propagateFromWire(x, y, z, world) {
    const offsets = [...CARDINAL, [0, 1, 0], [0, -1, 0]];
    for (const [dx, dy, dz] of offsets) {
      const nx = x + dx;
      const ny = y + dy;
      const nz = z + dz;
      const blockId = world.getBlock(nx, ny, nz);
      if (blockId === BLOCK.GREENSTONE_WIRE) {
        const key = nx + ',' + ny + ',' + nz;
        const existing = this._powerMap.get(key) || 0;
        if (existing > 0) {
          const wirePower = existing - 1;
          if (wirePower > 0) {
            this.setPower(x, y, z, Math.max(this.getPower(x, y, z), wirePower));
          }
        }
      }
    }
  }

  _updateLamps(world) {
    // First: unpower all previously-powered lamps
    for (const key of [...this._poweredLamps]) {
      const [lx, ly, lz] = key.split(',').map(Number);
      const blockId = world.getBlock(lx, ly, lz);
      if (blockId !== BLOCK.GREENSTONE_LAMP) {
        this._poweredLamps.delete(key);
        continue;
      }
      // Check if any adjacent block still has power
      const offsets = [...CARDINAL, [0, 1, 0], [0, -1, 0]];
      let stillPowered = false;
      for (const [dx, dy, dz] of offsets) {
        if (this.getPower(lx + dx, ly + dy, lz + dz) > 0) {
          stillPowered = true;
          break;
        }
      }
      if (!stillPowered) {
        this._setLampPowered(lx, ly, lz, false, world);
      }
    }

    // Second: power lamps adjacent to powered blocks
    for (const key of this._powerMap.keys()) {
      const [sx, sy, sz] = key.split(',').map(Number);
      const power = this._powerMap.get(key);

      if (power > 0) {
        const offsets = [...CARDINAL, [0, 1, 0], [0, -1, 0]];
        for (const [dx, dy, dz] of offsets) {
          const nx = sx + dx;
          const ny = sy + dy;
          const nz = sz + dz;
          const blockId = world.getBlock(nx, ny, nz);
          if (blockId === BLOCK.GREENSTONE_LAMP) {
            this._setLampPowered(nx, ny, nz, true, world);
          }
        }
      }
    }
  }

  _setLampPowered(x, y, z, powered, world) {
    const key = x + ',' + y + ',' + z;
    if (powered) {
      if (this._poweredLamps.has(key)) return; // already lit
      this._poweredLamps.add(key);
      // Patch the global definition for this block type (all lamps share the def)
      BLOCKS[BLOCK.GREENSTONE_LAMP].luminance = 14;
      BLOCKS[BLOCK.GREENSTONE_LAMP].faces = {
        top: 'greenstone_lamp_on',
        bottom: 'greenstone_lamp_on',
        side: 'greenstone_lamp_on',
      };
    } else {
      if (!this._poweredLamps.has(key)) return; // already off
      this._poweredLamps.delete(key);
      // If no more powered lamps anywhere, revert global def to off state
      if (this._poweredLamps.size === 0) {
        BLOCKS[BLOCK.GREENSTONE_LAMP].luminance = 0;
        BLOCKS[BLOCK.GREENSTONE_LAMP].faces = {
          top: 'greenstone_lamp_off',
          bottom: 'greenstone_lamp_off',
          side: 'greenstone_lamp_off',
        };
      }
    }
  }

  _updatePistons(world) {
    for (const key of this._powerMap.keys()) {
      const [sx, sy, sz] = key.split(',').map(Number);
      const power = this._powerMap.get(key);
      const blockId = world.getBlock(sx, sy, sz);

      if ((blockId === BLOCK.PISTON || blockId === BLOCK.STICKY_PISTON) && power > 0) {
        const pState = this._pistonStates.get(key) || { extended: false, facing: 'north' };
        if (!pState.extended) {
          this._extendPiston(sx, sy, sz, pState, world);
        }
      }
    }
  }

  _extendPiston(x, y, z, pState, world) {
    const faceOff = DIR_OFFSETS[pState.facing];
    if (!faceOff) return;

    const pushStartX = x + faceOff[0];
    const pushStartY = y + faceOff[1];
    const pushStartZ = z + faceOff[2];

    const pushed = this._collectPushable(pushStartX, pushStartY, pushStartZ, faceOff, world);
    if (pushed === null) return;

    for (let i = pushed.length - 1; i >= 0; i--) {
      const [bx, by, bz] = pushed[i];
      const bId = world.getBlock(bx, by, bz);
      const newX = bx + faceOff[0];
      const newY = by + faceOff[1];
      const newZ = bz + faceOff[2];
      world.setBlock(newX, newY, newZ, bId);
      world.setBlock(bx, by, bz, BLOCK.AIR);

      if (bId === BLOCK.PISTON || bId === BLOCK.STICKY_PISTON) {
        const oldKey = bx + ',' + by + ',' + bz;
        const oldState = this._pistonStates.get(oldKey);
        if (oldState) {
          this._pistonStates.set(newX + ',' + newY + ',' + newZ, oldState);
          this._pistonStates.delete(oldKey);
        }
      }
    }

    this._pistonStates.set(x + ',' + y + ',' + z, { extended: true, facing: pState.facing });
  }

  _collectPushable(x, y, z, dirOff, world, visited = new Set()) {
    const maxPush = 12;
    const result = [];
    let cx = x, cy = y, cz = z;

    for (let i = 0; i < maxPush; i++) {
      const key = cx + ',' + cy + ',' + cz;
      if (visited.has(key)) return null;
      visited.add(key);

      const blockId = world.getBlock(cx, cy, cz);
      if (blockId === BLOCK.AIR) break;
      if (IMMOVABLE.has(blockId)) return null;

      if (blockId === BLOCK.PISTON || blockId === BLOCK.STICKY_PISTON) {
        const pKey = cx + ',' + cy + ',' + cz;
        const pState = this._pistonStates.get(pKey);
        if (pState && pState.extended) return null;
      }

      result.push([cx, cy, cz]);
      cx += dirOff[0];
      cy += dirOff[1];
      cz += dirOff[2];
    }

    return result;
  }

  retractPiston(x, y, z, world) {
    const key = x + ',' + y + ',' + z;
    const pState = this._pistonStates.get(key);
    if (!pState || !pState.extended) return;

    const blockId = world.getBlock(x, y, z);
    const isSticky = blockId === BLOCK.STICKY_PISTON;

    const faceOff = DIR_OFFSETS[pState.facing];
    if (!faceOff) return;

    if (isSticky) {
      const pullX = x + faceOff[0] * 2;
      const pullY = y + faceOff[1] * 2;
      const pullZ = z + faceOff[2] * 2;

      const pullBlock = world.getBlock(pullX, pullY, pullZ);
      if (pullBlock !== BLOCK.AIR) {
        const destX = x + faceOff[0];
        const destY = y + faceOff[1];
        const destZ = z + faceOff[2];
        world.setBlock(destX, destY, destZ, pullBlock);
        world.setBlock(pullX, pullY, pullZ, BLOCK.AIR);
      }
    }

    this._pistonStates.set(key, { extended: false, facing: pState.facing });
  }
}
