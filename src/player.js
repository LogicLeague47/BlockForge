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
    const h = calcHeight(noise, 0, 0);
    this.position.set(0.5, Math.max(h + 1.05, 33), 0.5);
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
    this.health = Math.max(0, this.health - amount);
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
    if (this.hunger <= 0 && this.health > 1) {
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
    const sens = 0.0022;
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
    // Are we in water (check feet & middle)?
    const fb = this.world.getBlock(
      Math.floor(this.position.x),
      Math.floor(this.position.y + 0.5),
      Math.floor(this.position.z)
    );
    this.inWater = fb === BLOCK.WATER;
    // Head-in-water check (eye level) for drowning.
    this.headInWater = this.eyeBlock() === BLOCK.WATER;

    this.crouching = (!!input.keys['ControlLeft'] || !!input.keys['KeyC']) && !this.flying;
    // Sprinting only works in survival when hunger > 6.
    if (this.isSurvival() && this.hunger <= 6) this.sprinting = false;
    else this.sprinting = !!input.keys['ShiftLeft'] && !this.crouching;

    // Double-tap space to toggle fly in creative (both on and off)
    if (this.isCreative() && input.keys['Space'] && !this.inWater) {
      const now = performance.now();
      if (now - this._lastSpaceTime < 300) {
        this.toggleFly();
        this._lastSpaceTime = 0;
      } else {
        this._lastSpaceTime = now;
      }
    }

    // --- desired horizontal velocity from input ---
    const speed = this.flying ? FLY_SPEED
      : this.inWater ? SWIM_SPEED
      : this.crouching ? CROUCH_SPEED
      : this.sprinting ? SPRINT_SPEED : WALK_SPEED;

    const forward = new THREE.Vector3(-Math.sin(this.yaw), 0, -Math.cos(this.yaw));
    const right = new THREE.Vector3(Math.cos(this.yaw), 0, -Math.sin(this.yaw));

    const move = new THREE.Vector3();
    if (input.keys['KeyW']) move.add(forward);
    if (input.keys['KeyS']) move.sub(forward);
    if (input.keys['KeyD']) move.add(right);
    if (input.keys['KeyA']) move.sub(right);
    if (move.lengthSq() > 0) move.normalize().multiplyScalar(speed);

    this.velocity.x = move.x;
    this.velocity.z = move.z;

    if (this.flying) {
      // vertical fly: space up, crouch (C/Ctrl) down
      this.velocity.y = 0;
      if (input.keys['Space']) this.velocity.y = FLY_SPEED;
      if (input.keys['ControlLeft'] || input.keys['KeyC']) this.velocity.y = -FLY_SPEED;
    } else if (this.inWater) {
      this.velocity.y -= SWIM_GRAVITY * dt;
      this.velocity.y = Math.max(this.velocity.y, -3);
      if (input.keys['Space']) this.velocity.y = SWIM_SPEED;
    } else {
      this.velocity.y -= GRAVITY * dt;
      if (input.keys['Space'] && this.onGround) {
        this.velocity.y = JUMP_VELOCITY;
        this.onGround = false;
        this.fallStartY = this.position.y;
        this.addExhaustion(0.05);
      }
    }

    // --- integrate with per-axis collision ---
    const dx = this.velocity.x * dt;
    const dy = this.velocity.y * dt;
    const dz = this.velocity.z * dt;

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
    this.camera.position.copy(this.position);
    this.camera.position.y += EYE_HEIGHT;
    this.setLookFromCamera();
  }

  // Move along one axis by `delta`, resolving collisions against solid voxels.
  moveAxis(axis, delta) {
    if (delta === 0) return;
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
}
