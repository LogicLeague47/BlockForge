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
const HOLD_BREAK_TIME = 450;      // ms held (mostly still) before continuous mining starts.
                                  // Must be comfortably longer than a tap so quick taps
                                  // place/interact instead of starting a block break.

export function initMobileControls(playerRef, input, callbacks) {
  // A device is touch-capable if it can receive touch events. Hybrid machines
  // (touchscreen laptops/convertibles) also have a fine pointer, so we start in
  // PC mode and switch to mobile mode the moment a finger touches the screen.
  const supportsTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isHybrid = supportsTouch && !!(window.matchMedia && window.matchMedia('(pointer: fine)').matches);
  const isMobile = supportsTouch && !isHybrid;
  const state = {
    isMobile,
    supportsTouch,
    setMobileMode,
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
    _lastTapTime: 0,
    _lastTapX: 0,
    _lastTapY: 0,
  };

  // Declared here so setMobileMode can be defined after `state` and `root`.
  function setMobileMode(enabled) {
    enabled = !!enabled;
    const changed = state.isMobile !== enabled;
    state.isMobile = enabled;
    if (root) root.style.display = enabled ? 'block' : 'none';
    if (!enabled) {
      // Reset any in-progress touch state so it can't leak into PC mode.
      if (typeof resetJoystick === 'function') resetJoystick();
      if (typeof stopBreak === 'function' && state._breaking) stopBreak();
      state._cameraActive = false;
      state._joystickActive = false;
      state._cameraTouchId = null;
      state._joystickTouchId = null;
      input.mouseLeftHeld = false;
    }
    if (changed) {
      if (callbacks.onModeChange) callbacks.onModeChange(enabled);
      window.dispatchEvent(new CustomEvent('mobile-mode-change', { detail: { isMobile: enabled } }));
    }
  }

  if (!supportsTouch) return state;
  callbacks = callbacks || {};

  // Hybrid input detection (touchscreen laptops / convertibles): a touch
  // switches to mobile mode, a mouse/trackpad or physical keyboard switches
  // back to PC mode. Virtual keyboards report keyCode 229 / 'Unidentified',
  // and synthetic mouse events follow real touches — both are ignored.
  // Use a shared window flag + latest-state pointer so re-initializing
  // (new game) can't stack listeners or close over a stale state object.
  window.__bf_mobileState__ = state;
  if (!window.__bf_hybridHooked__) {
    window.__bf_hybridHooked__ = true;
    const setMobile = (on) => { const s = window.__bf_mobileState__; if (s && s.setMobileMode) s.setMobileMode(on); };
    if (window.PointerEvent) {
      document.addEventListener('pointerdown', (e) => {
        if (e.pointerType === 'touch') setMobile(true);
        else if (e.pointerType === 'mouse' || e.pointerType === 'pen') setMobile(false);
      }, { passive: true });
    } else {
      let _lastTouchEnd = 0;
      document.addEventListener('touchstart', () => setMobile(true), { passive: true });
      document.addEventListener('touchend', () => { _lastTouchEnd = Date.now(); }, { passive: true });
      document.addEventListener('mousedown', () => {
        if (Date.now() - _lastTouchEnd < 800) return;
        setMobile(false);
      }, { passive: true });
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Unidentified' || e.keyCode === 229) return; // virtual keyboard
      const el = document.activeElement;
      if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA')) return;
      setMobile(false);
    }, { passive: true });
  }

  const canvas = document.getElementById('game-canvas') || document.querySelector('canvas');
  if (canvas) {
    canvas.style.touchAction = 'none';
  }

  // --- Build DOM ---
  const onCG = /crazygames/i.test(location.hostname);
  const showVoice = !onCG;
  const root = document.createElement('div');
  root.id = 'bf-controls';
  root.innerHTML = `
    <div class="bf-joystick-zone">
      <div class="bf-joystick-base"><div class="bf-joystick-knob"></div></div>
    </div>
    <div class="bf-camera-zone"></div>
    <div class="bf-main-btns">
      <button class="mc-btn bf-btn-jump" data-action="jump">&#9650;</button>
    </div>
    <div class="bf-side-btns">
      <button class="bf-btn-mid bf-btn-sprint" data-action="sprint">&#187;</button>
      <button class="bf-btn-mid bf-btn-crouch" data-action="crouch">&#9660;</button>
      <button class="bf-btn-mid bf-btn-inv" data-action="inventory">&#127890;</button>
    </div>
    <button class="bf-toggle" data-action="toggle" aria-label="Actions">&#9881;</button>
    <div class="bf-action-panel">
      <button class="bf-btn-ap bf-btn-place" data-action="place">&#9995;</button>
      <button class="bf-btn-ap bf-btn-chat" data-action="chat">&#128172;</button>
      <button class="bf-btn-ap bf-btn-menu" data-action="menu">&#9208;</button>
      <button class="bf-btn-ap bf-btn-drop" data-action="drop">&#10006;</button>
      <button class="bf-btn-ap bf-btn-swap" data-action="swapHands">&#8646;</button>
      <button class="bf-btn-ap bf-btn-perspective" data-action="perspective">&#128065;</button>
      <button class="bf-btn-ap bf-btn-cmd" data-action="command">/</button>
      <button class="bf-btn-ap bf-btn-f3" data-action="f3">F3</button>
      ${showVoice ? '<button class="bf-btn-ap bf-btn-voice" data-action="voice">&#127908;</button>' : ''}
      <button class="bf-btn-ap bf-btn-exit" data-action="exit">&#128682;</button>
    </div>
  `;
  const prevRoot = document.getElementById('bf-controls');
  if (prevRoot) prevRoot.remove();
  document.body.appendChild(root);
  root.style.display = state.isMobile ? 'block' : 'none';

  const joystickBase = root.querySelector('.bf-joystick-base');
  const joystickKnob = root.querySelector('.bf-joystick-knob');
  const cameraZone = root.querySelector('.bf-camera-zone');

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
    if (dist === 0) {
      joystickKnob.style.transform = 'translate(0px, 0px)';
      state.joystickDx = 0;
      state.joystickDy = 0;
      return;
    }
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

  const joystickZone = root.querySelector('.bf-joystick-zone');
  joystickZone.addEventListener('touchstart', (e) => {
    e.stopPropagation();
    e.preventDefault(); // no ghost mousedown/click — this touch is a joystick input
    const t = e.changedTouches[0];
    state._joystickActive = true;
    state._joystickTouchId = t.identifier;
    handleJoystickMove(t.clientX, t.clientY);
  }, { passive: false });

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
    e.preventDefault(); // no ghost mousedown/click — a tap must place, not break
    const t = e.changedTouches[0];
    // Double-tap to equip item
    const now = Date.now();
    const dtap = now - state._lastTapTime;
    const dist = Math.hypot(t.clientX - state._lastTapX, t.clientY - state._lastTapY);
    if (dtap < 350 && dist < 50 && !state._cameraActive) {
      if (callbacks.onDoubleTap) callbacks.onDoubleTap();
      state._lastTapTime = 0;
      return;
    }
    state._lastTapTime = now;
    state._lastTapX = t.clientX;
    state._lastTapY = t.clientY;
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
    // A quick, still tap: place a block / interact with the tapped block
    // (or attack a mob). Hold still to break.
    if (!state._camMoved && heldMs < HOLD_BREAK_TIME && !state._brokeWhileHolding) {
      const x = state._camStartX, y = state._camStartY;
      const attacked = callbacks.onAttack ? callbacks.onAttack(x, y) : false;
      if (!attacked && callbacks.onPlaceTap) callbacks.onPlaceTap(x, y);
    }
    if (state._breaking) stopBreak();
    state._brokeWhileHolding = false;
    state._cameraActive = false;
    state._cameraTouchId = null;
    state._camMoved = false;
  }

  document.addEventListener('touchend', (e) => {
    let ours = false;
    for (const t of e.changedTouches) {
      if (t.identifier === state._joystickTouchId) { resetJoystick(); ours = true; }
      if (t.identifier === state._cameraTouchId) { endCameraTouch(); ours = true; }
    }
    // Swallow the ghost click for handled touches so it can't act as a break.
    if (ours) e.preventDefault();
  }, { passive: false });

  document.addEventListener('touchcancel', (e) => {
    let ours = false;
    for (const t of e.changedTouches) {
      if (t.identifier === state._joystickTouchId) { resetJoystick(); ours = true; }
      if (t.identifier === state._cameraTouchId) { endCameraTouch(); ours = true; }
    }
    if (ours) e.preventDefault();
  }, { passive: false });

  // --- Action buttons (toggle reveals the panel) ---
  function fireButton(action, down, btnEl) {
    input.keys = input.keys || {};
    if (action === 'toggle') {
      root.classList.toggle('bf-open');
      return;
    }
    if (action === 'jump') {
      state.jumpHeld = down;
      // Don't clear Space immediately on touchend — the player update may not
      // have run yet. Instead, let the per-frame `update()` below clear it.
      if (down) input.keys['Space'] = true;
    } else if (action === 'sprint') {
      if (down) {
        state.sprintOn = !state.sprintOn;
        input.keys['ShiftLeft'] = state.sprintOn;
        if (btnEl) btnEl.classList.toggle('bf-active', state.sprintOn);
      }
    } else if (action === 'crouch') {
      if (down) {
        state.crouchOn = !state.crouchOn;
        input.keys['ControlLeft'] = state.crouchOn;
        if (btnEl) btnEl.classList.toggle('bf-active', state.crouchOn);
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
    } else if (action === 'f3' && down) {
      if (callbacks.onF3) callbacks.onF3();
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
    input.keys = input.keys || {};
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

  // Called AFTER player.update() so the jump key pulse is consumed.
  state.postUpdate = function () {
    if (!state.jumpHeld) input.keys['Space'] = false;
  };

  return state;
}
