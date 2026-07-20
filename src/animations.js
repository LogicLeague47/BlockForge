// Animation system for player model and viewmodel.
// Based on Fresh Animations (FA+) player animation patterns.

export const lerp = (a, b, t) => a + (b - a) * Math.min(1, Math.max(0, t));
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const rad = (deg) => deg * Math.PI / 180;

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

// ── Player Model Animation Data ──────────────────────────────────────
export class PlayerAnimData {
  constructor() {
    // Movement state
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
    this.swingProgress = 0; // 0..1 attack swing
    this.swingTime = 0;
    this.swingDur = 0.25;

    // Physics
    this.velocityY = 0;
    this.yaw = 0;
    this.pitch = 0;     // camera pitch
    this.headYaw = 0;   // head yaw relative to body

    // Timers
    this.hurtTimer = 0;
    this.celebrateTimer = 0;
    this.deathTimer = 0;
    this.landTimer = 0;
    this.fallTimer = 0;
    this.jumpTimer = 0;

    // Internal
    this._limbSwing = 0;
    this._limbSpeed = 0;
    this._prevLimbSwing = 0;
    this._time = 0;
    this._lastMoving = false;
    this._lastOnGround = true;
    this._minePhase = 0;
  }

  update(dt) {
    this._time += dt;

    // Limb swing accumulation — FA+ style
    if (this.moving) {
      const targetSpeed = this.sprinting ? 12 : 8;
      this._limbSwing += dt * targetSpeed;
    }

    // Limb speed (smoothed) — used for amplitude weighting
    const rawSpeed = this.moving ? (this.sprinting ? 12 : 8) : 0;
    this._limbSpeed = lerp(this._limbSpeed, rawSpeed, Math.min(1, dt * 12));

    // Mine phase — runs while breaking
    if (this.breaking) {
      this._minePhase += dt * 12;
    } else {
      this._minePhase = 0;
    }

    // Landing detection
    if (this.onGround && !this._lastOnGround) {
      this.landTimer = 1.0; // compression amount
    }
    this._lastOnGround = this.onGround;

    // Jump/fall timers
    if (!this.onGround && this.velocityY > 0) {
      this.jumpTimer = Math.min(1, this.jumpTimer + dt * 6);
    } else {
      this.jumpTimer *= 0.9;
    }
    if (!this.onGround && this.velocityY < 0) {
      this.fallTimer = Math.min(1, this.fallTimer + dt * 4);
    } else {
      this.fallTimer *= 0.9;
    }

    // Decay timers
    if (this.hurtTimer > 0) this.hurtTimer = Math.max(0, this.hurtTimer - dt * 4);
    if (this.celebrateTimer > 0) this.celebrateTimer -= dt;
    if (this.landTimer > 0) this.landTimer = Math.max(0, this.landTimer - dt * 4);

    // Attack swing timer
    if (this.swingTime > 0) {
      this.swingTime = Math.max(0, this.swingTime - dt);
      this.swingProgress = 1 - this.swingTime / this.swingDur;
    } else {
      this.swingProgress = 0;
    }

    this._prevLimbSwing = this._limbSwing;
    this._lastMoving = this.moving;
  }

  swing() {
    this.swingTime = this.swingDur;
  }

  get limbSwing() { return this._limbSwing; }
  get limbSpeed() { return this._limbSpeed; }
  get time() { return this._time; }
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
    this._lastMove = lerp(this._lastMove || 0, bobTarget, Math.min(1, dt * 10));
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

// ── Pose Definitions ─────────────────────────────────────────────────
// Each pose is a set of target rotations/scales for body parts.
export const Poses = {
  idle: {
    headRotX: 0, headRotY: 0, headRotZ: 0,
    bodyRotX: 0, bodyRotY: 0, bodyRotZ: 0,
    bodyTransX: 0, bodyTransY: 0, bodyTransZ: 0,
    leftArmRotX: 0, leftArmRotY: 0, leftArmRotZ: 0,
    rightArmRotX: 0, rightArmRotY: 0, rightArmRotZ: 0,
    leftLegRotX: 0, rightLegRotX: 0,
    bodyScaleX: 1, bodyScaleY: 1, bodyScaleZ: 1,
  },
};

// ── FA+ Style Animation Curves ───────────────────────────────────────
// These match the Fresh Animations mathematical expressions.

function calcBodyPose(state) {
  const ls = state.limbSwing;
  const lsSpeed = Math.sqrt(state.limbSpeed);
  const walk = state.moving ? 1 : 0;
  const run = (state.moving && state.sprinting) ? 1 : 0;
  const sprint = state.sprinting ? 1 : 0;
  const sneak = state.crouching ? 1 : 0;
  const inAir = state.onGround ? 0 : 1;
  const idle = state.onGround && !state.moving ? 1 : 0;
  const swim = state.inWater ? 1 : 0;
  const climb = state.onLadder ? 1 : 0;

  let bodyRx = 0, bodyRy = 0, bodyRz = 0;
  let bodyTx = 0, bodyTy = 0, bodyTz = 0;

  // ── Body rotation X (forward lean) ──
  // Sprint lean + walk body tilt
  const sprintLean = rad(10) * sprint;
  const walkTilt = rad(8) * walk * (1 - sneak);
  bodyRx += (sprintLean + walkTilt) * (1 - inAir);

  // Bob compression on landing
  if (state.landTimer > 0) {
    bodyRx += rad(-5) * state.landTimer;
  }

  // ── Body rotation Y (yaw sway) ──
  // Body sways left-right while walking
  const bodySway = Math.sin(ls) * rad(8) * walk * (1 - 0.3 * run);
  bodyRy += bodySway * lsSpeed * 0.5;

  // ── Body rotation Z (roll) ──
  // Slight roll during walk
  const walkRoll = Math.sin(ls) * rad(-3) * walk * (1 - 0.5 * sprint);
  bodyRz += walkRoll * lsSpeed * 0.5;

  // Strafe roll
  const strafeRoll = rad(-3) * walk;
  bodyRz += strafeRoll * lsSpeed * 0.3;

  // ── Body translation Y (bob) ──
  // FA+ style: sin(ls*2) for walk bounce, with landing compression
  const walkBob = Math.sin(ls * 2) * 0.12 * walk * (1 - sneak) * (1 - inAir);
  const sprintBob = Math.sin(ls * 2) * 0.18 * run * (1 - inAir);
  bodyTy += (walkBob + sprintBob) * lsSpeed * 0.5;

  // Landing compression — squash down briefly
  bodyTy -= state.landTimer * 0.15;

  // Crouch lowers body
  bodyTy -= sneak * 0.15;

  // ── Body translation X (sway) ──
  // Side-to-side sway while walking
  const walkSway = Math.cos(ls) * 0.05 * walk * (1 - sneak);
  bodyTx += walkSway * lsSpeed * 0.3;

  // ── Body translation Z (depth) ──
  // Slight forward/back while walking
  bodyTz += Math.sin(ls) * 0.03 * walk;

  // Climb: tilt back slightly
  if (climb) {
    bodyRx += rad(-10);
    bodyTy += 0.05;
  }

  return { bodyRx, bodyRy, bodyRz, bodyTx, bodyTy, bodyTz };
}

function calcHeadPose(state) {
  const ls = state.limbSwing;
  const walk = state.moving ? 1 : 0;
  const sneak = state.crouching ? 1 : 0;
  const inAir = state.onGround ? 0 : 1;
  const idle = state.onGround && !state.moving ? 1 : 0;
  const climb = state.onLadder ? 1 : 0;

  let headRx = 0, headRy = 0, headRz = 0;

  // ── Head tracks camera pitch ──
  // FA+: torad(60*sin(head_pitch)) * clamp(1-sneak/4*walk, 0, 1)
  const pitchTrack = rad(60 * Math.sin(state.pitch)) * clamp(1 - sneak / 4 * walk, 0, 1 - inAir);
  headRx += pitchTrack;

  // Head recoil when looking down while walking
  headRx += rad(5) * walk * (1 - sneak);

  // ── Head yaw follows body sway ──
  // Subtle head counter-rotation during walk
  headRy += Math.sin(ls * 0.5) * rad(5) * walk * (1 - sneak);

  // ── Head bob ──
  // Subtle vertical bob
  headRx += Math.sin(ls * 2) * rad(2) * walk * (1 - sneak);

  // Climb: look up
  if (climb) {
    headRx += rad(-20);
  }

  return { headRx, headRy, headRz };
}

function calcArmPose(state, side) {
  // side: 'left' or 'right'
  const ls = state.limbSwing;
  const lsSpeed = Math.sqrt(state.limbSpeed);
  const walk = state.moving ? 1 : 0;
  const run = (state.moving && state.sprinting) ? 1 : 0;
  const sprint = state.sprinting ? 1 : 0;
  const sneak = state.crouching ? 1 : 0;
  const inAir = state.onGround ? 0 : 1;
  const idle = state.onGround && !state.moving ? 1 : 0;
  const swim = state.inWater ? 1 : 0;
  const climb = state.onLadder ? 1 : 0;
  const isRight = side === 'right';

  let armRx = 0, armRy = 0, armRz = 0;

  // ── Walk swing ──
  // FA+: cos(ls * 0.6662) for arm swing, opposite to legs
  const walkSwing = Math.cos(ls * 0.6662) * rad(40) * walk * (1 - sneak);
  const sprintSwing = Math.cos(ls * 0.6662) * rad(50) * sprint;
  armRx += (walkSwing + sprintSwing) * lsSpeed * 0.5;

  // Opposite arm to leg direction
  if (!isRight) armRx = -armRx;

  // ── Idle arm sway ──
  // FA+: subtle arm rotation matching head movement
  const idleSway = Math.sin(state.time * 1.6) * rad(3) * idle;
  armRx += idleSway;
  armRy += Math.cos(state.time * 1.2) * rad(2) * idle;

  // ── Crouch: arms slightly forward ──
  armRx += rad(15) * sneak * (1 - inAir);

  // ── Break animation ──
  if (state.breaking && isRight) {
    const mineSwing = Math.sin(state._minePhase) * rad(80);
    armRx = mineSwing;
    armRy = rad(10);
  }

  // ── Attack swing (click without breaking) ──
  if (!state.breaking && !state.placing && state.swingProgress > 0 && isRight) {
    const t = state.swingProgress;
    armRx = rad(-120) * Math.sin(t * Math.PI);
    armRy = rad(10) * Math.sin(t * Math.PI);
  }

  // ── Place animation ──
  if (state.placing && isRight) {
    armRx = rad(-90);
    armRy = rad(-10);
  }

  // ── Eat animation ──
  if (state.eating && isRight) {
    const eatBob = Math.sin(state.time * 8) * 0.15;
    armRx = rad(-70) + eatBob;
    armRy = rad(30);
    armRz = rad(10);
  }

  // ── Hurt recoil ──
  if (state.hurtTimer > 0) {
    armRx += rad(-20) * state.hurtTimer;
    armRz += (isRight ? 1 : -1) * rad(15) * state.hurtTimer;
  }

  // ── Celebrate ──
  if (state.celebrateTimer > 0) {
    const t = state.celebrateTimer;
    const pump = Math.sin(t * 14) * rad(15);
    armRx = rad(-130) + pump;
    armRz = (isRight ? 1 : -1) * rad(30);
  }

  // ── Climb ──
  if (climb) {
    armRx = rad(-100);
    armRy = (isRight ? 1 : -1) * rad(10);
  }

  // ── Swim ──
  if (swim) {
    armRx = rad(-50) + Math.cos(ls * 0.8) * rad(30) * lsSpeed * 0.5;
    armRy = (isRight ? 1 : -1) * rad(15);
  }

  // ── Flying ──
  if (state.flying) {
    armRx = rad(-30);
    armRy = (isRight ? 1 : -1) * rad(10);
  }

  return { armRx, armRy, armRz };
}

function calcLegPose(state, side) {
  const ls = state.limbSwing;
  const lsSpeed = Math.sqrt(state.limbSpeed);
  const walk = state.moving ? 1 : 0;
  const run = (state.moving && state.sprinting) ? 1 : 0;
  const sprint = state.sprinting ? 1 : 0;
  const sneak = state.crouching ? 1 : 0;
  const inAir = state.onGround ? 0 : 1;
  const swim = state.inWater ? 1 : 0;
  const climb = state.onLadder ? 1 : 0;
  const isRight = side === 'right';

  let legRx = 0;

  // ── Walk swing ──
  // FA+: sin(ls) for leg swing
  const walkSwing = Math.sin(ls) * rad(50) * walk * (1 - sneak);
  const sprintSwing = Math.sin(ls) * rad(65) * sprint;
  legRx += (walkSwing + sprintSwing) * lsSpeed * 0.5;

  // Opposite direction for other leg
  if (!isRight) legRx = -legRx;

  // ── Crouch: legs spread ──
  legRx += rad(20) * sneak * (isRight ? 1 : -1);

  // ── Swim: legs kick ──
  if (swim) {
    legRx = Math.sin(ls * 0.8) * rad(30) * lsSpeed * 0.5;
    if (!isRight) legRx = -legRx;
  }

  // ── Climb: legs alternate ──
  if (climb) {
    legRx = Math.sin(ls * 0.5) * rad(25) * lsSpeed * 0.3;
    if (!isRight) legRx = -legRx;
  }

  // ── Celebrate: slight bounce ──
  if (state.celebrateTimer > 0) {
    const t = state.celebrateTimer;
    legRx = Math.sin(t * 14) * rad(5);
  }

  // ── Flying: legs together ──
  if (state.flying) {
    legRx = rad(15);
  }

  return { legRx };
}

// ── Calculate Full Pose from State ───────────────────────────────────
export function calculatePose(state) {
  const pose = { ...Poses.idle };

  // Death pose
  if (state.deathTimer > 0) {
    pose.bodyRotX = rad(50);
    pose.bodyScaleY = 0.8;
    pose.headRotX = rad(30);
    pose.leftArmRotX = rad(30);
    pose.rightArmRotX = rad(30);
    pose.leftArmRotZ = rad(20);
    pose.rightArmRotZ = rad(-20);
    return pose;
  }

  // Celebrate overlay
  if (state.celebrateTimer > 0) {
    const t = state.celebrateTimer;
    const bounce = Math.sin(t * 14);
    pose.bodyScaleY = 1 + bounce * 0.04;
    pose.bodyScaleX = 1 - bounce * 0.02;
    pose.bodyRotX = rad(5);
  }

  // Calculate each body part
  const body = calcBodyPose(state);
  const head = calcHeadPose(state);
  const lArm = calcArmPose(state, 'left');
  const rArm = calcArmPose(state, 'right');
  const lLeg = calcLegPose(state, 'left');
  const rLeg = calcLegPose(state, 'right');

  // Apply body
  pose.bodyRotX += body.bodyRx;
  pose.bodyRotY += body.bodyRy;
  pose.bodyRotZ += body.bodyRz;
  pose.bodyTransX += body.bodyTx;
  pose.bodyTransY += body.bodyTy;
  pose.bodyTransZ += body.bodyTz;

  // Apply head
  pose.headRotX += head.headRx;
  pose.headRotY += head.headRy;
  pose.headRotZ += head.headRz;

  // Apply arms
  pose.leftArmRotX += lArm.armRx;
  pose.leftArmRotY += lArm.armRy;
  pose.leftArmRotZ += lArm.armRz;
  pose.rightArmRotX += rArm.armRx;
  pose.rightArmRotY += rArm.armRy;
  pose.rightArmRotZ += rArm.armRz;

  // Apply legs
  pose.leftLegRotX += lLeg.legRx;
  pose.rightLegRotX += rLeg.legRx;

  // Idle breathing (subtle body scale)
  const breathe = Math.sin(state.time * 2) * 0.008;
  pose.bodyScaleY += breathe;
  pose.bodyTransY += breathe * 0.5;

  // Landing squash
  if (state.landTimer > 0) {
    const squash = state.landTimer;
    pose.bodyScaleY -= squash * 0.25;
    pose.bodyScaleX += squash * 0.12;
    pose.bodyScaleZ += squash * 0.12;
  }

  return pose;
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
