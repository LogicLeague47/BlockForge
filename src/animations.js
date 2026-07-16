// Animation system for player model and viewmodel.
// Handles all animation states, blending, and easing.

const lerp = (a, b, t) => a + (b - a) * Math.min(1, Math.max(0, t));
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

// ── Animation State Machine ──────────────────────────────────────────
export class AnimationState {
  constructor() {
    this.current = 'idle';
    this.blend = 0;
    this.time = 0;
    this.phase = 0;
    this.prev = null;
    this.transitionTime = 0;
  }

  set(state, duration = 0.15) {
    if (state === this.current) return;
    this.prev = this.current;
    this.current = state;
    this.blend = 0;
    this.transitionTime = duration;
    this.time = 0;
  }

  update(dt) {
    this.time += dt;
    this.phase += dt;
    if (this.transitionTime > 0) {
      this.blend = clamp(this.blend + dt / this.transitionTime, 0, 1);
    }
  }

  get progress() {
    return this.transitionTime > 0 ? easeOut(this.blend) : 1;
  }
}

// ── Animation Curves ─────────────────────────────────────────────────
export class AnimCurve {
  static sin(phase, freq = 1) {
    return Math.sin(phase * freq);
  }

  static cos(phase, freq = 1) {
    return Math.cos(phase * freq);
  }

  static breathe(time) {
    return Math.sin(time * 2) * 0.01;
  }

  static walkCycle(phase) {
    return Math.sin(phase) * 0.7;
  }

  static sprintLean(phase) {
    return Math.sin(phase * 0.5) * 0.05;
  }

  static armSwing(phase, speed = 1) {
    return Math.sin(phase * speed) * 0.7;
  }

  static legSwing(phase, speed = 1) {
    return Math.sin(phase * speed) * 0.7;
  }
}

// ── Player Model Animation Data ──────────────────────────────────────
export class PlayerAnimData {
  constructor() {
    // Movement
    this.speed = 0;
    this.moving = false;
    this.sprinting = false;
    this.crouching = false;
    this.flying = false;
    this.inWater = false;
    this.onGround = true;
    this.onLadder = false;

    // Actions
    this.breaking = false;
    this.placing = false;
    this.eating = false;
    this.swinging = false;

    // Physics
    this.velocityY = 0;
    this.yaw = 0;
    this.pitch = 0;

    // Timers
    this.hurtTimer = 0;
    this.celebrateTimer = 0;
    this.deathTimer = 0;
    this.landTimer = 0;

    // Internal
    this._walkPhase = 0;
    this._minePhase = 0;
    this._lastMoving = false;
    this._lastOnGround = true;
  }

  update(dt) {
    // Walk phase accumulation
    if (this.moving) {
      const targetSpeed = this.sprinting ? 14 : 10;
      this._walkPhase += dt * targetSpeed;
    } else {
      this._walkPhase *= 0.9;
      if (Math.abs(this._walkPhase) < 0.01) this._walkPhase = 0;
    }

    // Mine phase — always runs so breaking anim works while standing still
    if (this.breaking) {
      this._minePhase += dt * 12;
    } else {
      this._minePhase = 0;
    }

    // Landing detection
    if (this.onGround && !this._lastOnGround) {
      this.landTimer = 0.3;
    }
    this._lastOnGround = this.onGround;

    // Decay timers
    if (this.hurtTimer > 0) this.hurtTimer = Math.max(0, this.hurtTimer - dt * 4);
    if (this.celebrateTimer > 0) this.celebrateTimer -= dt;
    if (this.landTimer > 0) this.landTimer = Math.max(0, this.landTimer - dt * 3);
    if (this.deathTimer > 0) this.deathTimer += dt;

    this._lastMoving = this.moving;
  }

  get walkPhase() { return this._walkPhase; }
  get minePhase() { return this._minePhase; }
  get breathe() { return AnimCurve.breathe(performance.now() * 0.001); }
  get swing() { return AnimCurve.walkCycle(this._walkPhase); }
}

// ── View Model Animation Data ────────────────────────────────────────
export class ViewAnimData {
  constructor() {
    this.swingTime = 0;
    this.swingDur = 0.25;
    this.bobPhase = 0;
    this.eatPhase = 0;
    this.swim = 0;
    this.fly = 0;
    this.landT = 0;
    this.hurtT = 0;
    this.wasGround = true;
    this.clock = 0;

    // State
    this.moving = false;
    this.inWater = false;
    this.flying = false;
    this.onGround = true;
    this.eating = false;
    this.mining = false;
    this.crouching = false;
    this.pitch = 0;
    this.vy = 0;
    this.hurt = false;
  }

  swing() {
    this.swingTime = this.swingDur;
  }

  update(dt) {
    this.clock += dt;

    // Smooth swim/fly factors
    const swimTarget = this.inWater ? 1 : 0;
    const flyTarget = this.flying ? 1 : 0;
    this.swim += (swimTarget - this.swim) * Math.min(1, dt * 6);
    this.fly += (flyTarget - this.fly) * Math.min(1, dt * 6);

    // Landing impulse
    if (this.onGround && !this.wasGround) this.landT = 1;
    this.wasGround = this.onGround;
    this.landT = Math.max(0, this.landT - dt * 4);

    // Hurt impulse
    this.hurtT = Math.max(0, this.hurtT - dt * 3);
    if (this.hurt) this.hurtT = 1;

    // Walk bob
    const bobTarget = this.moving ? 1 : 0;
    const lastMove = this._lastMove || 0;
    this._lastMove = lerp(lastMove, bobTarget, Math.min(1, dt * 10));
    this.bobPhase += dt * (this.inWater ? 6 : this.moving ? 10 : 4);

    // Eat phase
    if (this.eating) {
      this.eatPhase += dt * 8;
    } else {
      this.eatPhase = 0;
    }

    // Swing timer
    if (this.swingTime > 0) {
      this.swingTime = Math.max(0, this.swingTime - dt);
    }
  }

  get swingProgress() {
    return this.swingTime > 0 ? 1 - this.swingTime / this.swingDur : 0;
  }

  get lastMove() { return this._lastMove || 0; }
  get eatBob() {
    return this.eating ? Math.abs(Math.sin(this.eatPhase)) : 0;
  }
}

// ── Animation Mixer ──────────────────────────────────────────────────
export class AnimationMixer {
  constructor() {
    this.animations = new Map();
  }

  add(name, animation) {
    this.animations.set(name, animation);
  }

  get(name) {
    return this.animations.get(name);
  }

  update(dt) {
    for (const anim of this.animations.values()) {
      anim.update(dt);
    }
  }
}

// ── Easing Functions ─────────────────────────────────────────────────
export const Easing = {
  linear: (t) => t,
  easeIn: (t) => t * t,
  easeOut: (t) => 1 - (1 - t) * (1 - t),
  easeInOut: (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
  easeInCubic: (t) => t * t * t,
  easeOutCubic: (t) => 1 - Math.pow(1 - t, 3),
  easeInOutCubic: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  bounce: (t) => {
    const n1 = 7.5625;
    const d1 = 2.75;
    if (t < 1 / d1) return n1 * t * t;
    if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
    if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
    return n1 * (t -= 2.625 / d1) * t + 0.984375;
  },
  elastic: (t) => {
    if (t === 0 || t === 1) return t;
    return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * (2 * Math.PI / 3)) + 1;
  }
};

// ── Animation Blending Utilities ─────────────────────────────────────
export function blendAnimations(base, overlay, blendFactor) {
  const result = {};
  for (const key in base) {
    if (key in overlay) {
      result[key] = lerp(base[key], overlay[key], blendFactor);
    } else {
      result[key] = base[key];
    }
  }
  return result;
}

export function applyAnimation(target, pose, weight = 1) {
  for (const [key, value] of Object.entries(pose)) {
    if (key in target) {
      target[key] = lerp(target[key], value, weight);
    }
  }
}

// ── Pose Definitions ─────────────────────────────────────────────────
export const Poses = {
  idle: {
    headRotX: 0,
    headRotY: 0,
    bodyRotX: 0,
    leftArmRotX: 0,
    leftArmRotZ: 0,
    rightArmRotX: 0,
    rightArmRotZ: 0,
    leftLegRotX: 0,
    rightLegRotX: 0,
    bodyScaleX: 1,
    bodyScaleY: 1,
    bodyScaleZ: 1,
  },
  walk: {
    headRotX: 0,
    headRotY: 0,
    bodyRotX: 0,
    leftArmRotX: -0.7,
    leftArmRotZ: 0,
    rightArmRotX: 0.7,
    rightArmRotZ: 0,
    leftLegRotX: 0.7,
    rightLegRotX: -0.7,
    bodyScaleX: 1,
    bodyScaleY: 1,
    bodyScaleZ: 1,
  },
  sprint: {
    headRotX: 0.08,
    headRotY: 0,
    bodyRotX: 0.08,
    leftArmRotX: -0.8,
    leftArmRotZ: 0,
    rightArmRotX: 0.8,
    rightArmRotZ: 0,
    leftLegRotX: 0.8,
    rightLegRotX: -0.8,
    bodyScaleX: 1,
    bodyScaleY: 1,
    bodyScaleZ: 1,
  },
  swim: {
    headRotX: -0.3,
    headRotY: 0,
    bodyRotX: 0.6,
    leftArmRotX: -0.8,
    leftArmRotZ: 0,
    rightArmRotX: -0.8,
    rightArmRotZ: 0,
    leftLegRotX: 0,
    rightLegRotX: 0,
    bodyScaleX: 1,
    bodyScaleY: 1,
    bodyScaleZ: 1,
  },
  crouch: {
    headRotX: 0,
    headRotY: 0,
    bodyRotX: 0,
    leftArmRotX: -0.2,
    leftArmRotZ: 0.1,
    rightArmRotX: 0.2,
    rightArmRotZ: -0.1,
    leftLegRotX: 0.3,
    rightLegRotX: -0.3,
    bodyScaleX: 1.05,
    bodyScaleY: 0.9,
    bodyScaleZ: 1.05,
  },
  jump: {
    headRotX: -0.1,
    headRotY: 0,
    bodyRotX: 0,
    leftArmRotX: -0.5,
    leftArmRotZ: -0.3,
    rightArmRotX: -0.5,
    rightArmRotZ: 0.3,
    leftLegRotX: -0.3,
    rightLegRotX: -0.3,
    bodyScaleX: 1,
    bodyScaleY: 1.05,
    bodyScaleZ: 1,
  },
  fall: {
    headRotX: 0.1,
    headRotY: 0,
    bodyRotX: 0.1,
    leftArmRotX: 0.3,
    leftArmRotZ: -0.2,
    rightArmRotX: 0.3,
    rightArmRotZ: 0.2,
    leftLegRotX: 0.2,
    rightLegRotX: 0.2,
    bodyScaleX: 1,
    bodyScaleY: 0.98,
    bodyScaleZ: 1,
  },
  climb: {
    headRotX: -0.2,
    headRotY: 0,
    bodyRotX: -0.1,
    leftArmRotX: -1.2,
    leftArmRotZ: 0,
    rightArmRotX: -1.2,
    rightArmRotZ: 0,
    leftLegRotX: 0.4,
    rightLegRotX: -0.4,
    bodyScaleX: 1,
    bodyScaleY: 1,
    bodyScaleZ: 1,
  },
  hurt: {
    headRotX: -0.3,
    headRotY: 0,
    bodyRotX: -0.4,
    leftArmRotX: 0.3,
    leftArmRotZ: 0.2,
    rightArmRotX: 0.3,
    rightArmRotZ: -0.2,
    leftLegRotX: 0,
    rightLegRotX: 0,
    bodyScaleX: 1,
    bodyScaleY: 1,
    bodyScaleZ: 1,
  },
  celebrate: {
    headRotX: -0.35,
    headRotY: 0,
    bodyRotX: 0.08,
    leftArmRotX: -2.2,
    leftArmRotZ: 0.5,
    rightArmRotX: -2.2,
    rightArmRotZ: -0.5,
    leftLegRotX: 0,
    rightLegRotX: 0,
    bodyScaleX: 1,
    bodyScaleY: 1,
    bodyScaleZ: 1,
  },
  mine: {
    headRotX: 0,
    headRotY: 0,
    bodyRotX: 0,
    leftArmRotX: -0.2,
    leftArmRotZ: 0,
    rightArmRotX: 1.57,
    rightArmRotZ: 0,
    leftLegRotX: 0,
    rightLegRotX: 0,
    bodyScaleX: 1,
    bodyScaleY: 1,
    bodyScaleZ: 1,
  },
  place: {
    headRotX: 0,
    headRotY: 0,
    bodyRotX: 0,
    leftArmRotX: 0,
    leftArmRotZ: 0,
    rightArmRotX: -1.57,
    rightArmRotZ: 0,
    leftLegRotX: 0,
    rightLegRotX: 0,
    bodyScaleX: 1,
    bodyScaleY: 1,
    bodyScaleZ: 1,
  },
  eat: {
    headRotX: 0.2,
    headRotY: 0,
    bodyRotX: 0,
    leftArmRotX: 0,
    leftArmRotZ: 0,
    rightArmRotX: -1.2,
    rightArmRotZ: 0.5,
    leftLegRotX: 0,
    rightLegRotX: 0,
    bodyScaleX: 1,
    bodyScaleY: 1,
    bodyScaleZ: 1,
  },
  death: {
    headRotX: 0.5,
    headRotY: 0.3,
    bodyRotX: 0.8,
    leftArmRotX: 0.5,
    leftArmRotZ: 0.3,
    rightArmRotX: 0.5,
    rightArmRotZ: -0.3,
    leftLegRotX: 0.3,
    rightLegRotX: -0.3,
    bodyScaleX: 1,
    bodyScaleY: 0.8,
    bodyScaleZ: 1,
  },
  fly: {
    headRotX: -0.1,
    headRotY: 0,
    bodyRotX: 0.15,
    leftArmRotX: -0.3,
    leftArmRotZ: 0,
    rightArmRotX: -0.3,
    rightArmRotZ: 0,
    leftLegRotX: 0.2,
    rightLegRotX: -0.2,
    bodyScaleX: 1,
    bodyScaleY: 1,
    bodyScaleZ: 1,
  },
};

// ── Calculate Pose from State ────────────────────────────────────────
export function calculatePose(state) {
  let basePose = { ...Poses.idle };

  // Determine primary pose
  if (state.deathTimer > 0) {
    basePose = { ...Poses.death };
  } else if (state.celebrateTimer > 0) {
    basePose = { ...Poses.celebrate };
  } else if (state.inWater) {
    basePose = { ...Poses.swim };
  } else if (state.flying) {
    basePose = { ...Poses.fly };
  } else if (state.onLadder) {
    basePose = { ...Poses.climb };
  } else if (state.crouching) {
    basePose = { ...Poses.crouch };
  } else if (!state.onGround) {
    basePose = state.velocityY > 0 ? { ...Poses.jump } : { ...Poses.fall };
  } else if (state.moving) {
    basePose = state.sprinting ? { ...Poses.sprint } : { ...Poses.walk };
  }

  // Apply walk cycle to limbs
  if (state.moving && state.onGround && !state.inWater && !state.flying) {
    const swing = Math.sin(state.walkPhase);
    basePose.leftLegRotX = swing * 0.7;
    basePose.rightLegRotX = -swing * 0.7;

    if (!state.breaking && !state.placing && !state.eating) {
      basePose.leftArmRotX = -swing * 0.7;
      basePose.rightArmRotX = swing * 0.7;
    }
  }

  // Apply action overlays
  if (state.breaking) {
    const mineSwing = Math.sin(state._minePhase) * 1.57;
    basePose.rightArmRotX = mineSwing;
    basePose.leftArmRotX = -0.2;
  } else if (state.placing) {
    basePose.rightArmRotX = -1.57;
    basePose.leftArmRotX = -Math.sin(state.walkPhase);
  } else if (state.eating) {
    const eatBob = Math.sin(state.walkPhase * 2) * 0.1;
    basePose.rightArmRotX = -1.2 + eatBob;
    basePose.rightArmRotZ = 0.5;
    basePose.headRotX = 0.2 + eatBob * 0.2;
  }

  // Hurt overlay
  if (state.hurtTimer > 0) {
    const hurtWeight = state.hurtTimer;
    basePose = blendAnimations(basePose, Poses.hurt, hurtWeight * 0.6);
  }

  // Idle breathing
  basePose.headRotX += state.breathe;
  basePose.bodyScaleY += state.breathe * 0.5;

  // Landing squash
  if (state.landTimer > 0) {
    const squash = state.landTimer;
    basePose.bodyScaleY -= squash * 0.3;
    basePose.bodyScaleX += squash * 0.15;
    basePose.bodyScaleZ += squash * 0.15;
  }

  // Celebrate bounce
  if (state.celebrateTimer > 0) {
    const t = state.celebrateTimer;
    const pump = Math.sin(t * 14) * 0.25;
    basePose.leftArmRotX = -2.2 + pump;
    basePose.rightArmRotX = -2.2 - pump;
    basePose.bodyScaleY = 1 + Math.sin(t * 14) * 0.04;
    basePose.bodyScaleX = 1 - Math.sin(t * 14) * 0.02;
  }

  return basePose;
}
