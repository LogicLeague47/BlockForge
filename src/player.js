// First-person player controller.
//
// - Pointer-lock mouse look (yaw on the camera, pitch clamped).
// - WASD movement in the look direction (horizontal only).
// - Sprint (Shift), crouch (Ctrl/C), jump (Space), fly toggle (F or double-tap Space in creative).
// - Gravity + AABB-vs-voxel collision resolved per-axis.
// - Swimming when the eye is in water (slower, gentler gravity, rise with Space).
//
// Collision uses the player's AABB swept against solid voxels. We resolve X,
// then Z, then Y independently which is the standard cheap-and-stable approach
// for voxel worlds and avoids most corner-sticking bugs.

import * as THREE from 'three';
import { BLOCK, BLOCKS } from './blocks.js';
import { WORLD_HEIGHT } from './world.js';
import { Inventory } from './inventory.js';
import { Noise } from './noise.js';
import { calcHeight } from './worldgen.js';
import { totalArmorDefense } from './items.js';
import { getKeybinds } from './keybinds.js';

const EYE_HEIGHT = 1.62;
const PLAYER_HALF_WIDTH = 0.3;
const PLAYER_HEIGHT = 1.8;

const GRAVITY = 28;        // blocks/s^2
const WALK_SPEED = 4.317;  // ~minecraft
const SPRINT_SPEED = 5.6;
const CROUCH_SPEED = 1.5;
const FLY_SPEED = 11;
const JUMP_VELOCITY = 8.4;
const SWIM_GRAVITY = 6;
const SWIM_SPEED = 3.5;

// Survival constants (in half-points unless noted). 20 = full bar.
const MAX_HEALTH = 20;
const MAX_HUNGER = 20;
const MAX_AIR = 300;       // ticks of breath underwater (~15s at 20tps)

export class Player {
  constructor(camera, world, seed) {
    this.camera = camera;
    this.world = world;
    this.seed = seed;
    this.position = new THREE.Vector3(0, 60, 0);
    this.velocity = new THREE.Vector3();
    this.yaw = 0;
    this.pitch = 0;
    this.onGround = false;
    this.flying = false;
    this.knockback = { x: 0, y: 0, z: 0 }; // decaying impulse separate from input velocity
    this.crouching = false;
    this.sprinting = false;
    this.inWater = false;
    this.headInWater = false;
    this._lastSpaceTime = 0;

    // --- survival state ---
    this.gamemode = 'creative';            // 'creative' | 'survival'
    this.health = MAX_HEALTH;
    this.maxHealth = MAX_HEALTH;
    this.hunger = MAX_HUNGER;
    this.maxHunger = MAX_HUNGER;
    this.saturation = 2;   // food saturation; drains before hunger
    this.exhaustion = 0;   // 0..4; crossing 4 drains 0.5 saturation
    this.air = MAX_AIR;
    this.damageTimer = 0;  // i-frames after taking damage (seconds)
    this.spawnPoint = new THREE.Vector3(0.5, 70, 0.5);
    this.inventory = new Inventory();
    this.lastYVelocity = 0;   // for fall damage
    this.fallStartY = -1;     // Y position when player started falling (Minecraft Bedrock style)
    this.cameraMode = 0;      // 0 = first person, 1 = 3rd person back, 2 = 3rd person front
    this.cameraOffset = new THREE.Vector3();

    // --- eating state ---
    this.eating = false;
    this.eatTimer = 0;
    this.eatBiteTimer = 0;

    // --- XP / leveling ---
    this.xp = 0;
    this.level = 0;
    this.xpToNextLevel = 10;

    // --- auto-jump (step up 1-block obstacles) ---
    this.autoJump = true;

    // --- difficulty (normal | hard) ---
    this.difficulty = 'normal';
  }

  // XP thresholds follow a simplified formula: each level needs more XP
  // Level 1 = 10, Level 2 = 20, Level 3 = 35, etc. (roughly level * 10 + level * level)
  static xpForLevel(level) {
    if (level <= 0) return 0;
    return level * 10 + Math.floor(level * level * 1.5);
  }

  addXp(amount) {
    this.xp += amount;
    let leveled = false;
    while (this.xp >= this.xpToNextLevel) {
      this.xp -= this.xpToNextLevel;
      this.level++;
      this.xpToNextLevel = Player.xpForLevel(this.level);
      leveled = true;
    }
    return leveled;
  }

  getXpProgress() {
    return this.xpToNextLevel > 0 ? this.xp / this.xpToNextLevel : 0;
  }

  setGamemode(mode) {
    this.gamemode = mode;
    if (mode === 'creative') {
      this.health = this.maxHealth;
      this.hunger = this.maxHunger;
      this.saturation = 5;
      this.air = MAX_AIR;
      this.flying = false;
    }
  }

  isCreative() { return this.gamemode === 'creative'; }
  isSurvival() { return this.gamemode === 'survival'; }
  isDead() { return this.health <= 0; }

  spawn() {
    const noise = new Noise(this.seed);
    // Search outward from origin for land (not ocean)
    let bestX = 0.5, bestZ = 0.5, bestH = calcHeight(noise, 0, 0);
    for (let r = 0; r <= 80; r += 4) {
      for (let a = 0; a < 8; a++) {
        const angle = (a / 8) * Math.PI * 2;
        const tx = Math.cos(angle) * r;
        const tz = Math.sin(angle) * r;
        const h = calcHeight(noise, Math.floor(tx), Math.floor(tz));
        if (h > 33) { bestX = tx + 0.5; bestZ = tz + 0.5; bestH = h; r = 999; break; }
      }
    }
    this.position.set(bestX, Math.max(bestH + 1.05, 33), bestZ);
    this.velocity.set(0, 0, 0);
  }

  // Full respawn: restore vitals, move to spawn point, clear velocity.
  respawn() {
    this.position.copy(this.spawnPoint);
    this.velocity.set(0, 0, 0);
    this.health = this.maxHealth;
    this.hunger = this.maxHunger;
    this.saturation = 5;
    this.air = MAX_AIR;
    this.damageTimer = 0;
  }

  // --- damage / death ------------------------------------------------------
  takeDamage(amount, source = 'generic') {
    if (this.isCreative() || this.isDead()) return;
    if (this.damageTimer > 0) return; // i-frames

    // Knockback: push away from the damage source if it has a position.
    if (source && typeof source === 'object' && source.x !== undefined) {
      const dx = this.pos.x - source.x;
      const dz = this.pos.z - source.z;
      const len = Math.hypot(dx, dz) || 1;
      const power = source.knockback ?? 6;
      this.knockback.x += (dx / len) * power;
      this.knockback.z += (dz / len) * power;
      this.knockback.y += 3.2;
    }

    // Armor damage reduction using totalArmorDefense (handles full-set bonuses)
    const armorDef = this.inventory ? totalArmorDefense(this.inventory.armor) : 0;
    if (armorDef >= 999) return true; // Full Prismite set = invincible
    const reduction = Math.min(0.8, armorDef * 0.04);
    const finalDamage = Math.max(1, Math.ceil(amount * (1 - reduction)));

    this.health = Math.max(0, this.health - finalDamage);
    this.damageTimer = 0.5;
    this.addExhaustion(0.1);
    if (this.health <= 0) this.die(source);
    return true;
  }

  die(source = 'generic') {
    this.health = 0;
    // (caller in main.js handles the death overlay + respawn prompt)
  }

  // --- hunger / exhaustion -------------------------------------------------
  // Add exhaustion (from mining, sprinting, jumping, taking damage).
  addExhaustion(amount) {
    if (!this.isSurvival()) return;
    this.exhaustion += amount;
    while (this.exhaustion >= 4) {
      this.exhaustion -= 4;
      if (this.saturation > 0) this.saturation = Math.max(0, this.saturation - 0.5);
      else if (this.hunger > 0) this.hunger = Math.max(0, this.hunger - 0.5);
    }
  }

  // Eat food: restore hunger + saturation. Returns true if consumed.
  eat(foodValue) {
    if (!this.isSurvival()) return false;
    if (this.hunger >= this.maxHunger) return false;
    this.hunger = Math.min(this.maxHunger, this.hunger + foodValue);
    this.saturation = Math.min(this.hunger, this.saturation + foodValue * 0.4);
    // Start eating animation — stops sprint, slows movement
    this.eating = true;
    this.eatTimer = 1.0;   // 1 second eating animation
    this.eatBiteTimer = 0;
    this.sprinting = false;
    return true;
  }

  // --- per-frame survival tick --------------------------------------------
  tickSurvival(dt) {
    if (this.damageTimer > 0) this.damageTimer -= dt;
    if (!this.isSurvival()) return;

    // sprinting exhaustion: 0.1 per meter
    if (this.sprinting && (Math.abs(this.velocity.x) + Math.abs(this.velocity.z)) > 0.1) {
      const speed = Math.sqrt(this.velocity.x ** 2 + this.velocity.z ** 2);
      this.addExhaustion(0.1 * speed * dt);
    }

    // regen: 1 HP / 4s when hunger >= 18 (costs 6.0 exhaustion per HP)
    if (this.hunger >= 18 && this.health < this.maxHealth) {
      if ((this.regenAcc = (this.regenAcc || 0) + dt) >= 4) {
        this.regenAcc -= 4;
        this.health = Math.min(this.maxHealth, this.health + 1);
        this.addExhaustion(6);
      }
    } else {
      this.regenAcc = 0;
    }

    // starvation: 1 HP / 4s when hunger = 0
    // Normal: stops at half a heart (1 HP). Hard: can kill you entirely.
    const starveMin = this.difficulty === 'hard' ? 0 : 1;
    if (this.hunger <= 0 && this.health > starveMin) {
      if ((this.starveAcc = (this.starveAcc || 0) + dt) >= 4) {
        this.starveAcc -= 4;
        this.takeDamage(1, 'starve');
      }
    } else {
      this.starveAcc = 0;
    }

    // drowning
    if (this.headInWater) {
      this.air -= dt * 20;
      if (this.air <= 0) {
        this.air = 0;
        if ((this.drownAcc = (this.drownAcc || 0) + dt) >= 1) {
          this.drownAcc -= 1;
          this.takeDamage(2, 'drown');
        }
      }
    } else {
      this.air = Math.min(MAX_AIR, this.air + dt * 20 * 4); // recover fast
      this.drownAcc = 0;
    }
  }

  setLookFromCamera() {
    this.camera.rotation.order = 'YXZ';
    this.camera.rotation.set(this.pitch, this.yaw, 0);
  }

  applyMouse(dx, dy) {
    const sens = 0.0022 * (window.__mouseSens || 1.0);
    this.yaw -= dx * sens;
    this.pitch -= dy * sens;
    const max = Math.PI / 2 - 0.01;
    this.pitch = Math.max(-max, Math.min(max, this.pitch));
  }

  // Returns the block id at the player's eye, for water/fog detection.
  eyeBlock() {
    const ex = Math.floor(this.position.x);
    const ey = Math.floor(this.position.y + EYE_HEIGHT);
    const ez = Math.floor(this.position.z);
    return this.world.getBlock(ex, ey, ez);
  }

  update(dt, input) {
    // Eating timer countdown
    if (this.eating) {
      this.eatTimer -= dt;
      this.eatBiteTimer -= dt;
      if (this.eatTimer <= 0) {
        this.eating = false;
        this.eatTimer = 0;
        this.eatBiteTimer = 0;
      }
    }

    // Are we in water (check feet & middle)?
    const fb = this.world.getBlock(
      Math.floor(this.position.x),
      Math.floor(this.position.y + 0.5),
      Math.floor(this.position.z)
    );
    this.inWater = fb === BLOCK.WATER;
    // Head-in-water check (eye level) for drowning.
    this.headInWater = this.eyeBlock() === BLOCK.WATER;

    const kb = getKeybinds();
    this.crouching = (!!input.keys[kb.crouch] || !!input.keys['KeyC']) && !this.flying;
    // Sprinting: disabled when hungry, crouching, or eating
    if (this.isSurvival() && this.hunger <= 6) this.sprinting = false;
    else this.sprinting = !!input.keys[kb.sprint] && !this.crouching && !this.eating;

    // Double-tap space to start fly in creative (only toggles ON, not OFF)
    // Only detect on initial press, not while held (prevents flicker)
    if (this.isCreative() && !this.flying && input.keys[kb.jump] && !this.inWater && !this._spaceHeld) {
      const now = performance.now();
      if (now - this._lastSpaceTime < 300) {
        this.toggleFly();
        this._lastSpaceTime = 0;
      } else {
        this._lastSpaceTime = now;
      }
    }
    this._spaceHeld = !!input.keys[kb.jump];

    // --- desired horizontal velocity from input ---
    const EAT_SPEED = 1.3;  // slower than crouch when eating
    const speed = this.flying ? FLY_SPEED
      : this.inWater ? SWIM_SPEED
      : this.eating ? EAT_SPEED
      : this.crouching ? CROUCH_SPEED
      : this.sprinting ? SPRINT_SPEED : WALK_SPEED;

    const forward = new THREE.Vector3(-Math.sin(this.yaw), 0, -Math.cos(this.yaw));
    const right = new THREE.Vector3(Math.cos(this.yaw), 0, -Math.sin(this.yaw));

    const move = new THREE.Vector3();
    if (input.keys[kb.forward]) move.add(forward);
    if (input.keys[kb.back]) move.sub(forward);
    if (input.keys[kb.right]) move.add(right);
    if (input.keys[kb.left]) move.sub(right);
    if (move.lengthSq() > 0) move.normalize().multiplyScalar(speed);

    this.velocity.x = move.x;
    this.velocity.z = move.z;

    if (this.flying) {
      // vertical fly: jump up, crouch (C/Ctrl) down
      this.velocity.y = 0;
      if (input.keys[kb.jump]) this.velocity.y = FLY_SPEED;
      if (input.keys[kb.crouch] || input.keys['KeyC']) this.velocity.y = -FLY_SPEED;
    } else if (this.inWater) {
      this.velocity.y -= SWIM_GRAVITY * dt;
      this.velocity.y = Math.max(this.velocity.y, -3);
      if (input.keys[kb.jump]) this.velocity.y = SWIM_SPEED;
    } else {
      this.velocity.y -= GRAVITY * dt;
      if (input.keys[kb.jump] && this.onGround) {
        this.velocity.y = JUMP_VELOCITY;
        this.onGround = false;
        this.fallStartY = this.position.y;
        this.addExhaustion(0.05);
      }
    }

    // --- auto-jump: step up 1-block obstacles when walking into them ---
    if (this.autoJump && !this.flying && !this.crouching && this.onGround && !this.inWater && move.lengthSq() > 0) {
      const aheadX = Math.floor(this.position.x + move.x * (PLAYER_HALF_WIDTH + 0.4));
      const aheadZ = Math.floor(this.position.z + move.z * (PLAYER_HALF_WIDTH + 0.4));
      const feetY = Math.floor(this.position.y);
      const groundAhead = this.world.getBlock(aheadX, feetY, aheadZ);
      const stepAhead = this.world.getBlock(aheadX, feetY + 1, aheadZ);
      const headAhead = this.world.getBlock(aheadX, feetY + 2, aheadZ);
      if (!BLOCKS[groundAhead]?.solid && BLOCKS[stepAhead]?.solid && !BLOCKS[headAhead]?.solid) {
        this.velocity.y = JUMP_VELOCITY;
        this.onGround = false;
        this.fallStartY = this.position.y;
      }
    }

    // --- integrate with per-axis collision ---
    let dx = this.velocity.x * dt;
    let dy = this.velocity.y * dt;
    let dz = this.velocity.z * dt;

    // Knockback impulse (decays quickly, separate from input velocity).
    if (Math.abs(this.knockback.x) > 0.001 || this.knockback.y > 0.001 || Math.abs(this.knockback.z) > 0.001) {
      dx += this.knockback.x * dt;
      dy += this.knockback.y * dt;
      dz += this.knockback.z * dt;
      const decay = Math.exp(-7 * dt);
      this.knockback.x *= decay;
      this.knockback.z *= decay;
      this.knockback.y -= GRAVITY * dt * 0.6; // settle the upward pop
      if (this.knockback.y < 0) this.knockback.y *= decay;
    }

    this.moveAxis('x', dx);
    this.moveAxis('y', dy);
    this.moveAxis('z', dz);

    // respawn if we fall out of the world
    if (this.position.y < -10) {
      if (this.isSurvival()) this.takeDamage(100, 'void');
      this.spawn();
    }

    // run survival systems (hunger drain, regen, drowning)
    this.tickSurvival(dt);

    // sync camera
    const crouchEyeOffset = this.crouching ? -0.25 : 0;
    if (this.cameraMode === 0) {
      // First person: camera at eye level
      this.camera.position.copy(this.position);
      this.camera.position.y += EYE_HEIGHT + crouchEyeOffset;
    } else {
      // 3rd person: camera behind or in front of player
      const dist = 4;
      const height = 2;
      const dir = this.cameraMode === 1 ? 1 : -1; // 1=behind, -1=front
      const offsetX = Math.sin(this.yaw) * dist * dir;
      const offsetZ = Math.cos(this.yaw) * dist * dir;
      this.camera.position.set(
        this.position.x + offsetX,
        this.position.y + height + crouchEyeOffset,
        this.position.z + offsetZ
      );
    }
    if (this.cameraMode === 0) {
      this.setLookFromCamera();
    } else {
      // 3rd person: look at the player's head
      this.camera.lookAt(this.position.x, this.position.y + EYE_HEIGHT + crouchEyeOffset, this.position.z);
    }
  }

  // Move along one axis by `delta`, resolving collisions against solid voxels.
  // Returns true if the block at (bx,by,bz) is solid.
  _solid(bx, by, bz) {
    const b = this.world.getBlock(bx, by, bz);
    return !!(BLOCKS[b]?.solid);
  }

  // Edge protection: when crouching on ground, prevent walking off block edges.
  // Checks if the player's AABB at the new X/Z position still has ground beneath it.
  _crouchEdgeBlocked(dx, dz) {
    if (!this.crouching || this.flying || !this.onGround) return false;
    const nx = this.position.x + dx;
    const nz = this.position.z + dz;
    // Check all 4 corners of the player AABB at the new position
    const corners = [
      [nx - PLAYER_HALF_WIDTH, nz - PLAYER_HALF_WIDTH],
      [nx + PLAYER_HALF_WIDTH, nz - PLAYER_HALF_WIDTH],
      [nx - PLAYER_HALF_WIDTH, nz + PLAYER_HALF_WIDTH],
      [nx + PLAYER_HALF_WIDTH, nz + PLAYER_HALF_WIDTH]
    ];
    const footY = Math.floor(this.position.y - 0.05);
    for (const [cx, cz] of corners) {
      if (!this._solid(Math.floor(cx), footY, Math.floor(cz))) return true;
    }
    return false;
  }

  moveAxis(axis, delta) {
    if (delta === 0) return;

    // Crouch edge protection: block horizontal movement that would walk off an edge
    if (axis === 'x' && this._crouchEdgeBlocked(delta, 0)) return;
    if (axis === 'z' && this._crouchEdgeBlocked(0, delta)) return;

    this.position[axis] += delta;

    // player AABB at the new position
    const min = new THREE.Vector3(
      this.position.x - PLAYER_HALF_WIDTH,
      this.position.y,
      this.position.z - PLAYER_HALF_WIDTH
    );
    const max = new THREE.Vector3(
      this.position.x + PLAYER_HALF_WIDTH,
      this.position.y + PLAYER_HEIGHT,
      this.position.z + PLAYER_HALF_WIDTH
    );

    const x0 = Math.floor(min.x), x1 = Math.floor(max.x);
    const y0 = Math.floor(min.y), y1 = Math.floor(max.y);
    const z0 = Math.floor(min.z), z1 = Math.floor(max.z);

    let collided = false;
    let resolveTo = 0;
    for (let y = y0; y <= y1; y++) {
      for (let z = z0; z <= z1; z++) {
        for (let x = x0; x <= x1; x++) {
          const b = this.world.getBlock(x, y, z);
          if (!BLOCKS[b]?.solid) continue;
          // collision happened; snap back along this axis
          if (axis === 'x') {
            resolveTo = delta > 0 ? x - PLAYER_HALF_WIDTH - 0.0001 : x + 1 + PLAYER_HALF_WIDTH + 0.0001;
            this.position.x = resolveTo;
          } else if (axis === 'z') {
            resolveTo = delta > 0 ? z - PLAYER_HALF_WIDTH - 0.0001 : z + 1 + PLAYER_HALF_WIDTH + 0.0001;
            this.position.z = resolveTo;
          } else {
            if (delta < 0) {
              // Landing: apply fall damage based on fall distance (Minecraft Bedrock)
              if (this.isSurvival() && this.fallStartY > 0) {
                const fallDistance = this.fallStartY - this.position.y;
                if (fallDistance > 3) {
                  const damage = Math.floor(fallDistance - 3);
                  if (damage > 0) this.takeDamage(damage, 'fall');
                }
              }
              this.fallStartY = -1;
              this.position.y = y + 1 + 0.0001;
              this.onGround = true;
            } else {
              this.position.y = y - PLAYER_HEIGHT - 0.0001;
            }
            this.velocity.y = 0;
          }
          collided = true;
        }
      }
    }
    if (axis === 'y' && !collided && delta < 0) {
      if (this.onGround) this.fallStartY = this.position.y;
      this.onGround = false;
    }
  }

  toggleFly() {
    this.flying = !this.flying;
    this.velocity.set(0, 0, 0);
  }

  cycleCamera() {
    this.cameraMode = (this.cameraMode + 1) % 3;
  }
}
