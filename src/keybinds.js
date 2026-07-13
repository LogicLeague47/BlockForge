// Key bindings — defaults mirror Minecraft Java Edition, except crouch/sprint
// which are kept as the project's existing controls (crouch = Left Ctrl,
// sprint = Left Shift). Bindings are stored by KeyboardEvent.code and can be
// rebound from the in-game Settings → Controls screen (persisted to localStorage).

const STORAGE_KEY = 'bf_keybinds';

// Actions exposed in the rebind UI.
export const KEYBIND_ACTIONS = [
  { id: 'forward',     label: 'Move Forward' },
  { id: 'back',        label: 'Move Backward' },
  { id: 'left',        label: 'Strafe Left' },
  { id: 'right',       label: 'Strafe Right' },
  { id: 'jump',        label: 'Jump' },
  { id: 'crouch',      label: 'Crouch / Sneak' },
  { id: 'sprint',      label: 'Sprint' },
  { id: 'drop',        label: 'Drop Item' },
  { id: 'inventory',   label: 'Open Inventory' },
  { id: 'chat',        label: 'Open Chat' },
  { id: 'command',     label: 'Open Command' },
  { id: 'playerList',  label: 'Player List' },
  { id: 'swapHands',   label: 'Swap Hands' },
  { id: 'perspective', label: 'Toggle Perspective' },
  { id: 'debug',       label: 'Debug Overlay' },
];

export const DEFAULT_KEYBINDS = {
  forward: 'KeyW',
  back: 'KeyS',
  left: 'KeyA',
  right: 'KeyD',
  jump: 'Space',
  crouch: 'ControlLeft',
  sprint: 'ShiftLeft',
  drop: 'KeyQ',
  inventory: 'KeyE',
  chat: 'KeyT',
  command: 'Slash',
  playerList: 'Tab',
  swapHands: 'KeyF',
  perspective: 'F5',
  debug: 'F3',
};

let binds = loadBinds();

function loadBinds() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT_KEYBINDS, ...JSON.parse(raw) };
  } catch (_) {}
  return { ...DEFAULT_KEYBINDS };
}

export function getKeybinds() { return binds; }

export function setKeybind(action, code) {
  binds[action] = code;
  saveBinds();
}

export function resetKeybinds() {
  binds = { ...DEFAULT_KEYBINDS };
  saveBinds();
}

function saveBinds() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(binds)); } catch (_) {}
}

// Human-readable label for a KeyboardEvent.code.
export function keyName(code) {
  if (!code) return '—';
  if (code.startsWith('Key')) return code.slice(3);
  if (code.startsWith('Digit')) return code.slice(5);
  if (code.startsWith('Arrow')) return code.slice(5) + ' Arrow';
  if (code.startsWith('Numpad')) return 'Num ' + code.slice(6);
  const map = {
    Space: 'Space', ShiftLeft: 'Left Shift', ShiftRight: 'Right Shift',
    ControlLeft: 'Left Ctrl', ControlRight: 'Right Ctrl', AltLeft: 'Left Alt',
    AltRight: 'Right Alt', Tab: 'Tab', Enter: 'Enter', Escape: 'Esc',
    Slash: '/', Backquote: '`', Comma: ',', Period: '.', Minus: '-',
    Equal: '=', Semicolon: ';', Quote: "'", BracketLeft: '[', BracketRight: ']',
    Backslash: '\\', IntlBackslash: '\\', F1: 'F1', F2: 'F2', F3: 'F3', F4: 'F4',
    F5: 'F5', F6: 'F6', F7: 'F7', F8: 'F8', F9: 'F9', F10: 'F10', F11: 'F11',
    F12: 'F12', CapsLock: 'Caps', Backspace: 'Backspace', Delete: 'Delete',
    Insert: 'Insert', Home: 'Home', End: 'End', PageUp: 'Page Up',
    PageDown: 'Page Down', ContextMenu: 'Menu',
  };
  return map[code] || code;
}
