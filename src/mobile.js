// Mobile touch controls — Bedrock / MultiCraft-style.
//
//   Left side:   virtual joystick for movement (analog → WASD)
//   Right side:  drag to look; tap a block to break it; tap a mob to attack
//   Toggle (⚙):  reveals the action panel (Jump, Place, Sprint, Crouch,
//                Inventory, Chat, Menu, Drop, Swap, Perspective, Command, Exit)
//
// Public API:
//   const mobile = initMobileControls(player, input, callbacks)
//   mobile.isMobile        — true if touch device
//   mobile.update(dt)      — call each frame to update joystick state

const DEAD_ZONE = 0.15;
const LOOK_SENS = 1.0;            // multiplier on player.applyMouse sensitivity
const LOOK_MOVE_THRESHOLD = 8;    // px of movement before a touch counts as "looking"
const HOLD_BREAK_TIME = 180;      // ms held (mostly still) before continuous mining starts

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
    _brokeWhileHolding: false,
    _holdTimer: null,
    sprintOn: false,
    crouchOn: false,
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
  const onCG = !!(window.CrazyGames && window.CrazyGames.SDK) || /crazygames/i.test(location.hostname);
  const showVoice = !onCG;
  const root = document.createElement('div');
  root.id = 'mobile-controls';
  root.innerHTML = `
    <div class="mc-joystick-zone">
      <div class="mc-joystick-base"><div class="mc-joystick-knob"></div></div>
    </div>
    <div class="mc-camera-zone"></div>
    <button class="mc-toggle" data-action="toggle" aria-label="Actions">&#9881;</button>
    <div class="mc-action-panel">
      <button class="mc-btn mc-btn-jump" data-action="jump">&#9650;</button>
      <button class="mc-btn mc-btn-place" data-action="place">&#9995;</button>
      <button class="mc-btn mc-btn-sprint" data-action="sprint">&#187;</button>
      <button class="mc-btn mc-btn-crouch" data-action="crouch">&#9660;</button>
      <button class="mc-btn mc-btn-inv" data-action="inventory">&#127890;</button>
      <button class="mc-btn mc-btn-chat" data-action="chat">&#128172;</button>
      <button class="mc-btn mc-btn-menu" data-action="menu">&#9208;</button>
      <button class="mc-btn-sm mc-btn-drop" data-action="drop">&#10006;</button>
      <button class="mc-btn-sm mc-btn-swap" data-action="swapHands">&#8646;</button>
      <button class="mc-btn-sm mc-btn-perspective" data-action="perspective">&#128065;</button>
      <button class="mc-btn-sm mc-btn-cmd" data-action="command">/</button>
      ${showVoice ? '<button class="mc-btn-sm mc-btn-voice" data-action="voice">&#127908;</button>' : ''}
      <button class="mc-btn-sm mc-btn-exit" data-action="exit">&#128682;</button>
    </div>
  `;
  document.body.appendChild(root);

  const joystickBase = root.querySelector('.mc-joystick-base');
  const joystickKnob = root.querySelector('.mc-joystick-knob');
  const cameraZone = root.querySelector('.mc-camera-zone');

  // --- Joystick (analog, full travel) ---
  function joystickMax() {
    const br = joystickBase.getBoundingClientRect();
    const kr = joystickKnob.getBoundingClientRect();
    return Math.max(1, br.width / 2 - kr.width / 2);
  }

  function handleJoystickMove(cx, cy) {
    const rect = joystickBase.getBoundingClientRect();
    const bx = rect.left + rect.width / 2;
    const by = rect.top + rect.height / 2;
    let dx = cx - bx;
    let dy = cy - by;
    const max = joystickMax();
    const dist = Math.hypot(dx, dy);
    if (dist > max) {
      dx = dx / dist * max;
      dy = dy / dist * max;
    }
    joystickKnob.style.transform = `translate(${dx}px, ${dy}px)`;
    state.joystickDx = dx / max;
    state.joystickDy = dy / max;
  }

  function resetJoystick() {
    joystickKnob.style.transform = 'translate(0, 0)';
    state.joystickDx = 0;
    state.joystickDy = 0;
    state._joystickActive = false;
    state._joystickTouchId = null;
  }

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
    state._brokeWhileHolding = true; // so the release doesn't also break/attack
    input.mouseLeftHeld = true; // main loop breaks the targeted block
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
    // Remember which block the finger is on, for hold-to-break.
    if (callbacks.onAim) callbacks.onAim(t.clientX, t.clientY);
    if (state._holdTimer) clearTimeout(state._holdTimer);
    state._holdTimer = setTimeout(() => {
      if (state._cameraActive && !state._camMoved) startBreak();
    }, HOLD_BREAK_TIME);
  }, { passive: true });

  // --- Global touch move ---
  document.addEventListener('touchmove', (e) => {
    const active = state._joystickActive || state._cameraActive;
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
        if (playerRef && playerRef.applyMouse) playerRef.applyMouse(dx * LOOK_SENS, dy * LOOK_SENS);
      }
    }
    if (active) e.preventDefault();
  }, { passive: false });

  // --- Global touch end ---
  function endCameraTouch() {
    const heldMs = Date.now() - state._camStartTime;
    if (state._holdTimer) { clearTimeout(state._holdTimer); state._holdTimer = null; }
    if (callbacks.onAimEnd) callbacks.onAimEnd();
    // A quick, still tap: break the tapped block (or attack a mob).
    if (!state._camMoved && heldMs < HOLD_BREAK_TIME && !state._brokeWhileHolding) {
      const x = state._camStartX, y = state._camStartY;
      const attacked = callbacks.onAttack ? callbacks.onAttack(x, y) : false;
      if (!attacked && callbacks.onBreakTap) callbacks.onBreakTap(x, y);
    }
    if (state._breaking) stopBreak();
    state._brokeWhileHolding = false;
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

  // --- Action buttons (toggle reveals the panel) ---
  function fireButton(action, down, btnEl) {
    if (action === 'toggle') {
      root.classList.toggle('mc-open');
      return;
    }
    if (action === 'jump') {
      state.jumpHeld = down;
      input.keys['Space'] = down;
    } else if (action === 'sprint') {
      if (down) {
        state.sprintOn = !state.sprintOn;
        input.keys['ShiftLeft'] = state.sprintOn;
        if (btnEl) btnEl.classList.toggle('mc-active', state.sprintOn);
      }
    } else if (action === 'crouch') {
      if (down) {
        state.crouchOn = !state.crouchOn;
        input.keys['ControlLeft'] = state.crouchOn;
        if (btnEl) btnEl.classList.toggle('mc-active', state.crouchOn);
      }
    } else if (action === 'place') {
      if (down && callbacks.onPlace) callbacks.onPlace();
    } else if (action === 'drop' && down) {
      if (callbacks.onDrop) callbacks.onDrop();
    } else if (action === 'swapHands' && down) {
      if (callbacks.onSwapHands) callbacks.onSwapHands();
    } else if (action === 'perspective' && down) {
      if (callbacks.onPerspective) callbacks.onPerspective();
    } else if (action === 'command' && down) {
      if (callbacks.onCommand) callbacks.onCommand();
    } else if (down && action === 'menu') {
      if (callbacks.onPause) callbacks.onPause();
    } else if (down && action === 'chat') {
      if (callbacks.onChat) callbacks.onChat();
    } else if (down && action === 'inventory') {
      if (callbacks.onInventory) callbacks.onInventory();
    } else if (action === 'voice' && down) {
      if (callbacks.onVoice) callbacks.onVoice();
    } else if (action === 'exit' && down) {
      if (callbacks.onExit) callbacks.onExit();
    }
  }

  root.querySelectorAll('[data-action]').forEach((btn) => {
    const action = btn.dataset.action;
    btn.addEventListener('touchstart', (e) => { e.stopPropagation(); e.preventDefault(); fireButton(action, true, btn); }, { passive: false });
    btn.addEventListener('touchend', (e) => { e.stopPropagation(); e.preventDefault(); fireButton(action, false, btn); }, { passive: false });
    btn.addEventListener('touchcancel', (e) => { e.stopPropagation(); fireButton(action, false, btn); }, { passive: true });
  });

  // --- Update: map joystick to analog movement ---
  state.update = function () {
    const dx = state.joystickDx;
    const dy = state.joystickDy;
    const ax = Math.abs(dx) < DEAD_ZONE ? 0 : dx;
    const az = Math.abs(dy) < DEAD_ZONE ? 0 : -dy; // up = forward
    input.analogActive = true;
    input.analogX = ax;
    input.analogZ = az;
    input.keys['KeyW'] = az > 0.05;
    input.keys['KeyS'] = az < -0.05;
    input.keys['KeyA'] = ax < -0.05;
    input.keys['KeyD'] = ax > 0.05;
    const mag = Math.hypot(ax, az);
    input.keys['ShiftLeft'] = state.sprintOn || mag > 0.9;
  };

  return state;
}
