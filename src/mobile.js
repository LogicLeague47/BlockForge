// Mobile touch controls — MultiCraft-style virtual joystick + action buttons.
//
// On mobile devices this replaces keyboard/mouse input with:
//   Left side:  virtual joystick for movement (WASD)
//   Right side: touch-drag for camera look
//   Right side: Jump, Attack, Place buttons
//   Bottom:     hotbar (already works via click events)
//
// Public API:
//   const mobile = initMobileControls(player, input, callbacks)
//   mobile.isMobile        — true if touch device
//   mobile.update(dt)      — call each frame to update joystick state

const DEAD_ZONE = 0.15;
const JOYSTICK_RADIUS = 50;

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
    attackHeld: false,
    jumpHeld: false,
  };

  if (!isMobile) return state;

  // Prevent default touch behaviors on the game canvas
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
    <div class="mc-buttons">
      <button class="mc-btn mc-btn-jump" data-action="jump">▲</button>
      <button class="mc-btn mc-btn-attack" data-action="attack">⚔</button>
      <button class="mc-btn mc-btn-place" data-action="place">✋</button>
    </div>
  `;
  document.body.appendChild(root);

  const joystickBase = root.querySelector('.mc-joystick-base');
  const joystickKnob = root.querySelector('.mc-joystick-knob');
  const cameraZone = root.querySelector('.mc-camera-zone');
  const btnJump = root.querySelector('.mc-btn-jump');
  const btnAttack = root.querySelector('.mc-btn-attack');
  const btnPlace = root.querySelector('.mc-btn-place');

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

  joystickBase.addEventListener('touchstart', (e) => {
    e.stopPropagation();
    const t = e.changedTouches[0];
    state._joystickActive = true;
    state._joystickTouchId = t.identifier;
    handleJoystickMove(t.clientX, t.clientY);
  }, { passive: true });

  // --- Camera zone ---
  cameraZone.addEventListener('touchstart', (e) => {
    e.stopPropagation();
    const t = e.changedTouches[0];
    state._cameraActive = true;
    state._cameraTouchId = t.identifier;
    state._cameraLastX = t.clientX;
    state._cameraLastY = t.clientY;
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
        if (playerRef && playerRef.applyMouse) {
          playerRef.applyMouse(dx * 2, dy * 2);
        }
      }
    }
  }, { passive: true });

  // --- Global touch end ---
  document.addEventListener('touchend', (e) => {
    for (const t of e.changedTouches) {
      if (t.identifier === state._joystickTouchId) resetJoystick();
      if (t.identifier === state._cameraTouchId) {
        state._cameraActive = false;
        state._cameraTouchId = null;
      }
    }
  }, { passive: true });

  document.addEventListener('touchcancel', (e) => {
    for (const t of e.changedTouches) {
      if (t.identifier === state._joystickTouchId) resetJoystick();
      if (t.identifier === state._cameraTouchId) {
        state._cameraActive = false;
        state._cameraTouchId = null;
      }
    }
  }, { passive: true });

  // --- Action buttons ---
  function fireButton(btn, down) {
    const action = btn.dataset.action;
    if (action === 'jump') {
      state.jumpHeld = down;
      input.keys['Space'] = down;
    } else if (action === 'attack') {
      state.attackHeld = down;
      input.mouseLeftHeld = down;
      if (down && callbacks.onAttack) callbacks.onAttack();
    } else if (action === 'place') {
      if (down && callbacks.onPlace) callbacks.onPlace();
    }
  }

  [btnJump, btnAttack, btnPlace].forEach((btn) => {
    btn.addEventListener('touchstart', (e) => { e.stopPropagation(); fireButton(btn, true); }, { passive: true });
    btn.addEventListener('touchend', (e) => { e.stopPropagation(); fireButton(btn, false); }, { passive: true });
    btn.addEventListener('touchcancel', (e) => { e.stopPropagation(); fireButton(btn, false); }, { passive: true });
  });

  // --- Update: map joystick to WASD keys ---
  state.update = function () {
    const dx = state.joystickDx;
    const dy = state.joystickDy;
    // Forward/back
    input.keys['KeyW'] = dy < -DEAD_ZONE;
    input.keys['KeyS'] = dy > DEAD_ZONE;
    // Strafe
    input.keys['KeyA'] = dx < -DEAD_ZONE;
    input.keys['KeyD'] = dx > DEAD_ZONE;
  };

  return state;
}
