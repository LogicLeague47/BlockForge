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
    this.swimFactor = 0;
    this.swimStroke = 0;
    this.crouchFactor = 0;
  }

  update(dt) {
    this._time += dt;

    // Smoothed swim factor — prevent the pose snapping when entering water
    const swimTarget = this.inWater ? 1 : 0;
    this.swimFactor = lerp(this.swimFactor, swimTarget, Math.min(1, dt * 6));

    // Limb swing accumulation — FA+ style.
    // MC: swim strokes cycle faster than a walk; treading water is slow sculling.
    if (this.moving || this.inWater) {
      const targetSpeed = this.inWater
        ? (this.moving ? 11 : 3)
        : this.sprinting ? 14 : 8;
      this._limbSwing += dt * targetSpeed;
    }

    // Limb speed (smoothed) — used for amplitude weighting
    const rawSpeed = this.inWater
      ? (this.moving ? 11 : 3)
      : this.moving ? (this.sprinting ? 14 : 8) : 0;
    this._limbSpeed = lerp(this._limbSpeed, rawSpeed, Math.min(1, dt * 12));

    // Swim stroke factor — 1 while actively swimming, low while treading water.
    // MC only goes fully prone when you're moving through the water.
    const strokeTarget = (this.inWater && this.moving) ? 1 : 0;
    this.swimStroke = lerp(this.swimStroke || 0, strokeTarget, Math.min(1, dt * 5));

    // Smoothed crouch factor — MC eases into the sneak pose rather than snapping
    this.crouchFactor = lerp(this.crouchFactor || 0, this.crouching ? 1 : 0, Math.min(1, dt * 12));

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
    this.sprinting = false;
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
    this.bobPhase += dt * (this.inWater ? 4 : this.sprinting ? 3.74 : this.moving ? 2.88 : 4);

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
// Enhanced Fresh Animations curves with expressive head tilt, body sway,
// breath cycles, and attack anticipation.

function calcBodyPose(state) {
  const ls = state.limbSwing;
  const lsSpeed = Math.sqrt(state.limbSpeed);
  const walk = state.moving ? 1 : 0;
  const run = (state.moving && state.sprinting) ? 1 : 0;
  const sneak = state.crouchFactor !== undefined ? state.crouchFactor : (state.crouching ? 1 : 0);
  const inAir = state.onGround ? 0 : 1;
  const idle = state.onGround && !state.moving ? 1 : 0;
  const swim = state.swimFactor !== undefined ? state.swimFactor : (state.inWater ? 1 : 0);
  const ground = 1 - swim;
  const climb = state.onLadder ? 1 : 0;

  let bodyRx = 0, bodyRy = 0, bodyRz = 0;
  let bodyTx = 0, bodyTy = 0, bodyTz = 0;

  // ── Swim ──
  if (swim > 0) {
    const stroke = state.swimStroke !== undefined ? state.swimStroke : (state.moving ? 1 : 0);
    const tread = swim * (1 - stroke);

// Prone pitch with spine undulation (nose down, MC-style dive)
    bodyRx += rad(-72) * swim * stroke;
    bodyRz += Math.sin(ls * 0.5) * rad(11) * swim * stroke;
    bodyRy += Math.sin(ls * 0.5) * rad(6) * swim * stroke;
    bodyRx += Math.sin(ls) * rad(5) * swim * stroke;
    bodyTz += -0.22 * swim * stroke;
    bodyTy += Math.sin(ls) * 0.04 * swim * stroke;

    // Treading water — upright bob with slight forward lean
    bodyRx += rad(-18) * tread;
    bodyTy += Math.sin(ls * 0.5) * 0.06 * tread;
    bodyRz += Math.sin(ls * 0.35) * rad(3) * tread;
    // Side-to-side treading sway
    bodyTy += Math.sin(ls * 0.25) * 0.02 * tread;
  }

  // ── Ground walk/run ──
  if (ground > 0) {
    // Forward lean — sprint pitches significantly, walk has gentle tilt
    const sprintLean = rad(28) * run * ground;
    const walkTilt = rad(8) * walk * (1 - sneak) * ground;
    bodyRx += (sprintLean + walkTilt) * (1 - inAir);

    // ── Body yaw sway — shoulders counter-rotate during stride ──
    const bodySway = Math.sin(ls) * rad(8) * walk * ground;
    bodyRy += bodySway * lsSpeed * 0.5;
    bodyRy += Math.sin(ls) * rad(7) * run * ground;

    // ── Body roll — dips into each step ──
    const walkRoll = Math.sin(ls) * rad(-3) * walk * (1 - 0.5 * run) * ground;
    bodyRz += walkRoll * lsSpeed * 0.5;
    bodyRz += Math.cos(ls) * rad(4) * run * ground;

    // ── Vertical bob — sprint bounces noticeably higher ──
    const walkBob = Math.sin(ls * 2) * 0.12 * walk * (1 - sneak) * (1 - inAir) * ground;
    const sprintBob = Math.sin(ls * 2) * 0.3 * run * (1 - inAir) * ground;
    bodyTy += (walkBob + sprintBob) * lsSpeed * 0.5;

    // ── Horizontal sway — torso shifts side to side ──
    const walkSway = Math.cos(ls) * 0.05 * walk * (1 - sneak) * ground;
    bodyTx += walkSway * lsSpeed * 0.3;
    bodyTz += Math.sin(ls) * 0.03 * walk * ground;
    // Sprint torso drives forward into the stride
    bodyTz += -0.07 * run * ground;

    // ── Idle body sway (FA+: subtle weight shift) ──
    if (idle) {
      bodyTy += Math.sin(state.time * 1.1) * 0.005;
      bodyRz += Math.sin(state.time * 0.7) * rad(0.5);
    }
  }

  // Landing compression
  if (state.landTimer > 0) {
    bodyRx += rad(-5) * state.landTimer;
  }
  bodyTy -= state.landTimer * 0.15;

  // ── Crouch ──
  bodyRx += rad(28) * sneak;
  bodyTz += 0.06 * sneak;

  // ── Flying ──
  if (state.flying) {
    // Body tilts forward proportional to movement, with a gentle hover bob
    const flySpeed = Math.sqrt(state.velocityY * state.velocityY || 0) * 0.05;
    bodyRx += rad(-12);
    bodyTy += Math.sin(state.time * 2.2) * 0.05;
    bodyRz += Math.sin(state.time * 1.5) * rad(2.5);
    // Slight body tilt when ascending/descending
    bodyRx += rad(3) * Math.max(0, -state.velocityY * 0.1);
  }

  // Climb: tilt back
  if (climb) {
    bodyRx += rad(-10);
    bodyTy += 0.05;
  }

  return { bodyRx, bodyRy, bodyRz, bodyTx, bodyTy, bodyTz };
}

function calcHeadPose(state) {
  const ls = state.limbSwing;
  const lsSpeed = Math.sqrt(state.limbSpeed);
  const walk = state.moving ? 1 : 0;
  const run = (state.moving && state.sprinting) ? 1 : 0;
  const sneak = state.crouchFactor !== undefined ? state.crouchFactor : (state.crouching ? 1 : 0);
  const inAir = state.onGround ? 0 : 1;
  const idle = state.onGround && !state.moving ? 1 : 0;
  const climb = state.onLadder ? 1 : 0;
  const swim = state.swimFactor !== undefined ? state.swimFactor : (state.inWater ? 1 : 0);

  let headRx = 0, headRy = 0, headRz = 0;

  // ── Head tracks camera pitch (1:1, clamped to ±90°) ──
  headRx += clamp(state.pitch, rad(-90), rad(90));

  // ── Walk/run head bob — double-frequency leads the body ──
  if (walk) {
    // Head dips forward on each step with anticipation
    headRx += rad(4) * (1 - sneak) + Math.sin(ls * 2 + 0.6) * rad(3) * (1 - sneak);
    // Sprint: head tilts down more aggressively into the run
    headRx += rad(3) * run;
  }

  // ── Idle head fidgets (FA+: subtle look-around) ──
  if (idle) {
    headRy += Math.sin(state.time * 0.4) * rad(3);
    headRx += Math.sin(state.time * 0.55) * rad(1.5);
    headRz += Math.sin(state.time * 0.3) * rad(1);
  }

  // ── Head counter-rotation during walk (stabilizes gaze) ──
  headRy += Math.sin(ls * 0.5) * rad(5) * walk * (1 - sneak);

  // ── Swim ──
  {
    const stroke = state.swimStroke !== undefined ? state.swimStroke : (state.moving ? 1 : 0);
    const tread = swim * (1 - stroke);
    // Head stays lifted (crown up) above the prone body so you look ahead
    // while swimming, not at the seabed.
    headRx += rad(28) * swim * stroke;
    headRy += Math.sin(ls * 0.5) * rad(22) * swim * stroke;
    headRz += Math.sin(ls * 0.5) * rad(-10) * swim * stroke;
    headRx += Math.sin(ls * 0.5) * rad(-6) * tread;
    // Treading water: head bobs more actively
    headRy += Math.sin(state.time * 2) * rad(3) * tread;
  }

  // Climb: look up
  if (climb) {
    headRx += rad(-20);
  }

  // ── Flying: head leads direction ──
  if (state.flying) {
    headRx += rad(-5);
    headRy += Math.sin(state.time * 0.8) * rad(4);
  }

  return { headRx, headRy, headRz };
}

function calcArmPose(state, side) {
  const ls = state.limbSwing;
  const lsSpeed = Math.sqrt(state.limbSpeed);
  const walk = state.moving ? 1 : 0;
  const run = (state.moving && state.sprinting) ? 1 : 0;
  const sneak = state.crouchFactor !== undefined ? state.crouchFactor : (state.crouching ? 1 : 0);
  const inAir = state.onGround ? 0 : 1;
  const idle = state.onGround && !state.moving ? 1 : 0;
  const swim = state.swimFactor !== undefined ? state.swimFactor : (state.inWater ? 1 : 0);
  const ground = 1 - swim;
  const climb = state.onLadder ? 1 : 0;
  const isRight = side === 'right';

  let armRx = 0, armRy = 0, armRz = 0;

  // ── Swim ──
  if (swim > 0) {
    const stroke = state.swimStroke !== undefined ? state.swimStroke : (state.moving ? 1 : 0);
    const tread = swim * (1 - stroke);
    const phase = ls * 0.85 + (isRight ? 0 : Math.PI);
    const sp = swim * stroke;

    // Front crawl: full overhead sweep with catch and recovery phases
    armRx += (rad(-105) + Math.sin(phase) * rad(78)) * sp;
    armRz += (isRight ? 1 : -1) * (rad(14) + Math.cos(phase) * rad(18)) * sp;
    armRy += (isRight ? 1 : -1) * rad(8) * sp;

    // Treading water: slow sculling
    armRx += (rad(-18) + Math.sin(ls * 0.5 + (isRight ? 0 : Math.PI)) * rad(14)) * tread;
    armRz += (isRight ? 1 : -1) * rad(42) * tread;
  }

  // ── Ground arm swing ──
  if (ground > 0) {
    // FA+: wider arc for sprint, slight elbow tuck, anticipation offset
    let swing = Math.cos(ls * 0.6662) * (run ? rad(48) : rad(33)) * walk * (1 - 0.45 * sneak) * ground;
    swing *= 1 + lsSpeed * 0.12;

    if (run) {
      swing += rad(12) * ground;
      armRy += (isRight ? 1 : -1) * rad(6) * ground;
      // Elbow tuck during sprint
      armRz += (isRight ? 1 : -1) * (rad(-14) + Math.sin(ls) * rad(5)) * ground;
    }

    if (!isRight) swing = -swing;
    armRx += swing;

    // ── Idle arm sway (FA+: subtle weight shift) ──
    if (idle) {
      armRx += Math.sin(state.time * 1.6) * rad(3);
      armRy += Math.cos(state.time * 1.2) * rad(2);
    }
  }

  // ── Break animation (one-sided chop, always in front of the player) ──
  if (state.breaking && isRight) {
    const mineSwing = rad(15) + (1 - Math.cos(state._minePhase)) * rad(55);
    armRx = mineSwing;
    armRy = rad(10);
  }

  // ── Attack swing (FA+: whip with anticipation & overshoot) ──
  if (!state.breaking && !state.placing && state.swingProgress > 0 && isRight) {
    const t = state.swingProgress;
    // Overshoot arc: rises fast, snaps down, then recoils
    armRx = rad(120) * Math.sin(t * Math.PI) + rad(-10) * Math.sin(t * Math.PI * 3);
    armRy = rad(-10) * Math.sin(t * Math.PI);
    armRz = rad(5) * Math.sin(t * Math.PI * 2);
  }

  // ── Place animation ──
  if (state.placing && isRight) {
    armRx = rad(-90);
    armRy = rad(-10);
  }

  // ── Eat animation (bobbing bite) ──
  if (state.eating && isRight) {
    const eatPhase = state.time * 8;
    const bite = Math.sin(eatPhase) * 0.15;
    const chew = Math.abs(Math.sin(eatPhase * 3)) * 0.08;
    armRx = rad(-70) + bite + chew;
    armRy = rad(30);
    armRz = rad(10);
  }

  // ── Hurt recoil (FA+: arms fling outward, body flinches) ──
  if (state.hurtTimer > 0) {
    const h = state.hurtTimer;
    armRx += rad(-25) * h;
    armRz += (isRight ? 1 : -1) * rad(20) * h;
    armRy += (isRight ? 1 : -1) * rad(8) * h;
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

  // ── Flying (FA+: arms spread with wind resistance, subtle flutter) ──
  if (state.flying) {
    const flyFlutter = Math.sin(state.time * 3) * 0.06;
    const windResistance = Math.sin(state.time * 1.8) * rad(3);
    armRx = rad(-30) + flyFlutter + windResistance;
    armRy = (isRight ? 1 : -1) * rad(18);
    armRz = (isRight ? 1 : -1) * rad(-10);
  }

  return { armRx, armRy, armRz };
}

function calcLegPose(state, side) {
  const ls = state.limbSwing;
  const lsSpeed = Math.sqrt(state.limbSpeed);
  const walk = state.moving ? 1 : 0;
  const run = (state.moving && state.sprinting) ? 1 : 0;
  const sneak = state.crouchFactor !== undefined ? state.crouchFactor : (state.crouching ? 1 : 0);
  const inAir = state.onGround ? 0 : 1;
  const swim = state.swimFactor !== undefined ? state.swimFactor : (state.inWater ? 1 : 0);
  const ground = 1 - swim;
  const climb = state.onLadder ? 1 : 0;
  const isRight = side === 'right';

  let legRx = 0;

  // ── Swim ──
  if (swim > 0) {
    const stroke = state.swimStroke !== undefined ? state.swimStroke : (state.moving ? 1 : 0);
    const tread = swim * (1 - stroke);
    const sp = swim * stroke;

    // Legs trail behind the prone torso instead of dangling straight down —
    // the leg pivots sit on the root group (not the body), so they don't
    // inherit the body's swim pitch automatically.
    legRx += rad(-70) * sp + rad(-26) * tread;

    // Flutter kick: fast, shallow, oscillating around the trailing pose
    legRx += Math.sin(ls * 2.1 + (isRight ? 0 : Math.PI)) * rad(19) * sp;

    // Treading water: slow alternating eggbeater
    legRx += Math.sin(ls * 0.7 + (isRight ? 0 : Math.PI)) * rad(26) * tread;
    // Extra kick when treading — wider sweep
    legRx += Math.sin(ls * 0.35 + (isRight ? 0 : Math.PI)) * rad(8) * tread;
  }

  // ── Ground: walk vs run leg swing ──
  if (ground > 0) {
    // FA+: wider stride for sprint, slight anticipation offset
    const swingAmp = run ? rad(60) : rad(42);
    let swing = Math.sin(ls) * swingAmp * walk * (1 - 0.45 * sneak) * ground;
    // Anticipation: legs prepare slightly ahead of the body
    const anticipate = Math.cos(ls) * rad(5) * walk * run * ground;
    if (!isRight) { swing = -swing; }
    legRx += (swing + anticipate) * (1 + lsSpeed * 0.12);

    // Crouch: knees bend, legs stay under
    legRx += rad(8) * sneak;
  }

  // ── Climb: legs alternate with reach ──
  if (climb) {
    legRx = Math.sin(ls * 0.5) * rad(25) * lsSpeed * 0.3;
    if (!isRight) legRx = -legRx;
  }

  // ── Celebrate: slight bounce ──
  if (state.celebrateTimer > 0) {
    const t = state.celebrateTimer;
    legRx = Math.sin(t * 14) * rad(5);
  }

  // ── Flying (FA+: legs trail behind with gentle flutter) ──
  if (state.flying) {
    const flutter = Math.sin(state.time * 4) * rad(5);
    legRx = rad(18) + flutter;
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

  // Torso-only vertical offset. Applied to the body node instead of the model
  // root so crouching sinks the upper body while the legs keep their footing.
  const crouchAmt = state.crouchFactor !== undefined ? state.crouchFactor : (state.crouching ? 1 : 0);
  pose.bodyCrouchY = -0.18 * crouchAmt;

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

  // Idle breathing (subtle body scale with expansion cycle)
  const breathe = Math.sin(state.time * 2) * 0.01;
  const breatheFast = Math.sin(state.time * 4) * 0.003;
  pose.bodyScaleY += breathe + breatheFast;
  pose.bodyScaleX -= (breathe + breatheFast) * 0.3;
  pose.bodyScaleZ -= (breathe + breatheFast) * 0.2;
  pose.bodyTransY += (breathe + breatheFast) * 0.5;

  // Landing squash & stretch
  if (state.landTimer > 0) {
    const squash = state.landTimer;
    pose.bodyScaleY -= squash * 0.25;
    pose.bodyScaleX += squash * 0.12;
    pose.bodyScaleZ += squash * 0.12;
  }

  // Flying body sway (gentle oscillation)
  if (state.flying) {
    pose.bodyTransX += Math.sin(state.time * 1.2) * 0.015;
    pose.bodyTransZ += Math.cos(state.time * 0.9) * 0.01;
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
