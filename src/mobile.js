// Mobile touch controls — MultiCraft / Minecraft-Bedrock-style.
//
//   Left side:   large virtual joystick for movement (WASD)
//   Right side:  drag to look; tap/hold to break or attack (no button needed)
//   Buttons:     Jump, Place, Inventory, Chat, Menu
//   Bottom:      hotbar (already works via click events)
//
// Public API:
//   const mobile = initMobileControls(player, input, callbacks)
//   mobile.isMobile        — true if touch device
//   mobile.update(dt)      — call each frame to update joystick state

const DEAD_ZONE = 0.18;
const JOYSTICK_RADIUS = 64;        // bigger joystick throw
const LOOK_MOVE_THRESHOLD = 8;     // px of movement before a touch counts as "looking"
const HOLD_BREAK_TIME = 180;       // ms held (mostly still) before continuous mining starts

export function initMobileControls(playerRef, input, callbacks) {
  const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const state = {
    isMobile,
    joystickDx: 0,
    joystickDy: 0,
    _joystickActive: false,
    _joystickTouchId: null,
    _cameraActive: false,
    _cameraTouchId: null,
    _cameraLastX: 0,
    _cameraLastY: 0,
    _camStartX: 0,
    _camStartY: 0,
    _camStartTime: 0,
    _camMoved: false,
    _breaking: false,
    _holdTimer: null,
    attackHeld: false,
    jumpHeld: false,
  };

  if (!isMobile) return state;
  callbacks = callbacks || {};

  const canvas = document.getElementById('game-canvas') || document.querySelector('canvas');
  if (canvas) {
    canvas.style.touchAction = 'none';
    canvas.addEventListener('touchstart', (e) => e.preventDefault(), { passive: false });
    canvas.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
  }

  // --- Build DOM ---
  const root = document.createElement('div');
  root.id = 'mobile-controls';
  root.innerHTML = `
    <div class="mc-joystick-zone">
      <div class="mc-joystick-base">
        <div class="mc-joystick-knob"></div>
      </div>
    </div>
    <div class="mc-camera-zone"></div>
    <div class="mc-top-buttons">
      <button class="mc-tbtn mc-btn-menu" data-action="menu">&#9208;</button>
      <button class="mc-tbtn mc-btn-chat" data-action="chat">&#128172;</button>
      <button class="mc-tbtn mc-btn-inv" data-action="inventory">&#127890;</button>
    </div>
    <div class="mc-buttons">
      <button class="mc-btn mc-btn-jump" data-action="jump">&#9650;</button>
      <button class="mc-btn mc-btn-place" data-action="place">&#9995;</button>
    </div>
  `;
  document.body.appendChild(root);

  const joystickBase = root.querySelector('.mc-joystick-base');
  const joystickKnob = root.querySelector('.mc-joystick-knob');
  const cameraZone = root.querySelector('.mc-camera-zone');

  // --- Joystick ---
  function handleJoystickMove(cx, cy) {
    const rect = joystickBase.getBoundingClientRect();
    const bx = rect.left + rect.width / 2;
    const by = rect.top + rect.height / 2;
    let dx = cx - bx;
    let dy = cy - by;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > JOYSTICK_RADIUS) {
      dx = dx / dist * JOYSTICK_RADIUS;
      dy = dy / dist * JOYSTICK_RADIUS;
    }
    joystickKnob.style.transform = `translate(${dx}px, ${dy}px)`;
    const nx = dx / JOYSTICK_RADIUS;
    const ny = dy / JOYSTICK_RADIUS;
    state.joystickDx = Math.abs(nx) > DEAD_ZONE ? nx : 0;
    state.joystickDy = Math.abs(ny) > DEAD_ZONE ? ny : 0;
  }

  function resetJoystick() {
    joystickKnob.style.transform = 'translate(0, 0)';
    state.joystickDx = 0;
    state.joystickDy = 0;
    state._joystickActive = false;
    state._joystickTouchId = null;
  }

  // The joystick zone grabs any touch that starts within it (not just on the base)
  // so it feels forgiving.
  const joystickZone = root.querySelector('.mc-joystick-zone');
  joystickZone.addEventListener('touchstart', (e) => {
    e.stopPropagation();
    const t = e.changedTouches[0];
    state._joystickActive = true;
    state._joystickTouchId = t.identifier;
    handleJoystickMove(t.clientX, t.clientY);
  }, { passive: true });

  // --- Camera / break-attack zone ---
  function startBreak() {
    if (state._breaking) return;
    state._breaking = true;
    input.mouseLeftHeld = true; // main loop breaks the targeted block / attacks
  }
  function stopBreak() {
    state._breaking = false;
    input.mouseLeftHeld = false;
  }

  cameraZone.addEventListener('touchstart', (e) => {
    e.stopPropagation();
    const t = e.changedTouches[0];
    state._cameraActive = true;
    state._cameraTouchId = t.identifier;
    state._cameraLastX = t.clientX;
    state._cameraLastY = t.clientY;
    state._camStartX = t.clientX;
    state._camStartY = t.clientY;
    state._camStartTime = Date.now();
    state._camMoved = false;
    // If the finger stays put, begin mining after a short hold.
    if (state._holdTimer) clearTimeout(state._holdTimer);
    state._holdTimer = setTimeout(() => {
      if (state._cameraActive && !state._camMoved) startBreak();
    }, HOLD_BREAK_TIME);
  }, { passive: true });

  // --- Global touch move ---
  document.addEventListener('touchmove', (e) => {
    for (const t of e.changedTouches) {
      if (state._joystickActive && t.identifier === state._joystickTouchId) {
        handleJoystickMove(t.clientX, t.clientY);
      }
      if (state._cameraActive && t.identifier === state._cameraTouchId) {
        const dx = t.clientX - state._cameraLastX;
        const dy = t.clientY - state._cameraLastY;
        state._cameraLastX = t.clientX;
        state._cameraLastY = t.clientY;
        const totalMove = Math.hypot(t.clientX - state._camStartX, t.clientY - state._camStartY);
        if (totalMove > LOOK_MOVE_THRESHOLD) {
          state._camMoved = true;
          // Once we're clearly looking around, cancel any mining hold.
          if (state._holdTimer) { clearTimeout(state._holdTimer); state._holdTimer = null; }
          if (state._breaking) stopBreak();
        }
        if (playerRef && playerRef.applyMouse) playerRef.applyMouse(dx * 2, dy * 2);
      }
    }
  }, { passive: true });

  // --- Global touch end ---
  function endCameraTouch() {
    const heldMs = Date.now() - state._camStartTime;
    if (state._holdTimer) { clearTimeout(state._holdTimer); state._holdTimer = null; }
    // A quick, still tap = a single break/attack action.
    if (!state._camMoved && heldMs < HOLD_BREAK_TIME) {
      if (callbacks.onAttack) callbacks.onAttack();
      input.mouseLeftHeld = true;
      setTimeout(() => { if (!state._breaking) input.mouseLeftHeld = false; }, 120);
    }
    if (state._breaking) stopBreak();
    state._cameraActive = false;
    state._cameraTouchId = null;
    state._camMoved = false;
  }

  document.addEventListener('touchend', (e) => {
    for (const t of e.changedTouches) {
      if (t.identifier === state._joystickTouchId) resetJoystick();
      if (t.identifier === state._cameraTouchId) endCameraTouch();
    }
  }, { passive: true });

  document.addEventListener('touchcancel', (e) => {
    for (const t of e.changedTouches) {
      if (t.identifier === state._joystickTouchId) resetJoystick();
      if (t.identifier === state._cameraTouchId) endCameraTouch();
    }
  }, { passive: true });

  // --- Action buttons ---
  function fireButton(action, down) {
    if (action === 'jump') {
      state.jumpHeld = down;
      input.keys['Space'] = down;
    } else if (action === 'place') {
      if (down && callbacks.onPlace) callbacks.onPlace();
    } else if (down && action === 'menu') {
      if (callbacks.onPause) callbacks.onPause();
    } else if (down && action === 'chat') {
      if (callbacks.onChat) callbacks.onChat();
    } else if (down && action === 'inventory') {
      if (callbacks.onInventory) callbacks.onInventory();
    }
  }

  root.querySelectorAll('[data-action]').forEach((btn) => {
    const action = btn.dataset.action;
    btn.addEventListener('touchstart', (e) => { e.stopPropagation(); e.preventDefault(); fireButton(action, true); }, { passive: false });
    btn.addEventListener('touchend', (e) => { e.stopPropagation(); e.preventDefault(); fireButton(action, false); }, { passive: false });
    btn.addEventListener('touchcancel', (e) => { e.stopPropagation(); fireButton(action, false); }, { passive: true });
  });

  // --- Update: map joystick to WASD keys ---
  state.update = function () {
    const dx = state.joystickDx;
    const dy = state.joystickDy;
    input.keys['KeyW'] = dy < -DEAD_ZONE;
    input.keys['KeyS'] = dy > DEAD_ZONE;
    input.keys['KeyA'] = dx < -DEAD_ZONE;
    input.keys['KeyD'] = dx > DEAD_ZONE;
  };

  return state;
}
