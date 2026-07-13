// Preset skin definitions for the main menu skin picker.
// Each preset defines colors used by createSkinCanvas().
// Also supports custom skins saved as PNG data URLs.
//
// Customizable properties:
//   skin/skin2  — skin tone and shadow
//   hair        — hair color
//   hairStyle   — 'short' | 'long' | 'mohawk' | 'bald' | 'ponytail' | 'curly'
//   shirt       — shirt/torso color
//   shirtStyle  — 'plain' | 'stripe' | 'vneck' | 'sleeveless'
//   pants       — pants color
//   shoes       — shoe color
//   eyes        — eye white color
//   pupil       — iris/pupil color
//   pupilStyle  — 'round' | 'narrow' | 'wide'
//   mouth       — mouth color
//   facialHair  — 'none' | 'stubble' | 'beard' | 'goatee' | 'mustache'
//   accessory   — 'none' | 'glasses' | 'sunglasses' | 'headband' | 'earring'
//   skinTone    — 'light' | 'medium' | 'tan' | 'dark' | 'pale'
//   age         — 'young' | 'adult' | 'elder'

export const SKIN_PRESETS = [
  {
    name: 'James', gender: 'boy',
    skin: '#c0906a', skin2: '#a87850', hair: '#3b2210',
    hairStyle: 'short', shirt: '#1d8db5', shirtStyle: 'plain',
    pants: '#2d3364', shoes: '#493828',
    eyes: '#ffffff', pupil: '#263694', pupilStyle: 'round',
    mouth: '#6b4330', facialHair: 'none', accessory: 'none',
    skinTone: 'medium', age: 'adult',
  },
  {
    name: 'Redstone', gender: 'boy',
    skin: '#c0906a', skin2: '#a87850', hair: '#222222',
    hairStyle: 'mohawk', shirt: '#cc3333', shirtStyle: 'stripe',
    pants: '#333333', shoes: '#222222',
    eyes: '#ffffff', pupil: '#cc3333', pupilStyle: 'narrow',
    mouth: '#6b4330', facialHair: 'stubble', accessory: 'none',
    skinTone: 'medium', age: 'adult',
  },
  {
    name: 'Golden', gender: 'boy',
    skin: '#d4a574', skin2: '#b88860', hair: '#ffcc00',
    hairStyle: 'curly', shirt: '#ffaa00', shirtStyle: 'vneck',
    pants: '#664400', shoes: '#442200',
    eyes: '#ffffff', pupil: '#2244aa', pupilStyle: 'wide',
    mouth: '#6b4330', facialHair: 'none', accessory: 'glasses',
    skinTone: 'tan', age: 'adult',
  },
  {
    name: 'Ocean', gender: 'girl',
    skin: '#c0906a', skin2: '#a87850', hair: '#1a3a5a',
    hairStyle: 'long', shirt: '#0066aa', shirtStyle: 'plain',
    pants: '#003366', shoes: '#002244',
    eyes: '#ffffff', pupil: '#0088cc', pupilStyle: 'round',
    mouth: '#6b4330', facialHair: 'none', accessory: 'headband',
    skinTone: 'medium', age: 'young',
  },
  {
    name: 'Forest', gender: 'boy',
    skin: '#c0906a', skin2: '#a87850', hair: '#3a5a2a',
    hairStyle: 'short', shirt: '#337722', shirtStyle: 'sleeveless',
    pants: '#4a3a22', shoes: '#332211',
    eyes: '#ffffff', pupil: '#336622', pupilStyle: 'round',
    mouth: '#6b4330', facialHair: 'beard', accessory: 'none',
    skinTone: 'medium', age: 'elder',
  },
  {
    name: 'Snow', gender: 'girl',
    skin: '#f0e0d0', skin2: '#ddd0c0', hair: '#cccccc',
    hairStyle: 'ponytail', shirt: '#e8e8f0', shirtStyle: 'plain',
    pants: '#8888aa', shoes: '#666688',
    eyes: '#ffffff', pupil: '#4466aa', pupilStyle: 'narrow',
    mouth: '#bbaa99', facialHair: 'none', accessory: 'sunglasses',
    skinTone: 'pale', age: 'adult',
  },
  {
    name: 'Ember', gender: 'boy',
    skin: '#8b5e3c', skin2: '#6d4a2e', hair: '#cc3300',
    hairStyle: 'mohawk', shirt: '#ff6600', shirtStyle: 'stripe',
    pants: '#3a2211', shoes: '#221100',
    eyes: '#ffffff', pupil: '#ff4400', pupilStyle: 'wide',
    mouth: '#5a3520', facialHair: 'goatee', accessory: 'none',
    skinTone: 'dark', age: 'adult',
  },
  {
    name: 'Frost', gender: 'boy',
    skin: '#e8d8c8', skin2: '#d0c0b0', hair: '#4488cc',
    hairStyle: 'short', shirt: '#88bbee', shirtStyle: 'vneck',
    pants: '#334466', shoes: '#223344',
    eyes: '#ffffff', pupil: '#2266cc', pupilStyle: 'round',
    mouth: '#aa9988', facialHair: 'none', accessory: 'glasses',
    skinTone: 'light', age: 'young',
  },
  {
    name: 'Sage', gender: 'boy',
    skin: '#a07850', skin2: '#886040', hair: '#556633',
    hairStyle: 'long', shirt: '#778855', shirtStyle: 'sleeveless',
    pants: '#554433', shoes: '#443322',
    eyes: '#ffffff', pupil: '#557733', pupilStyle: 'narrow',
    mouth: '#6b5040', facialHair: 'mustache', accessory: 'none',
    skinTone: 'tan', age: 'elder',
  },
  {
    name: 'Ruby', gender: 'girl',
    skin: '#d4a574', skin2: '#b88860', hair: '#990022',
    hairStyle: 'curly', shirt: '#cc2244', shirtStyle: 'vneck',
    pants: '#441122', shoes: '#331111',
    eyes: '#ffffff', pupil: '#cc0033', pupilStyle: 'wide',
    mouth: '#9a6848', facialHair: 'none', accessory: 'earring',
    skinTone: 'medium', age: 'young',
  },
  {
    name: 'Shadow', gender: 'boy',
    skin: '#6d4c3a', skin2: '#553a28', hair: '#111111',
    hairStyle: 'bald', shirt: '#222222', shirtStyle: 'plain',
    pants: '#1a1a1a', shoes: '#111111',
    eyes: '#dddddd', pupil: '#333333', pupilStyle: 'narrow',
    mouth: '#5a3828', facialHair: 'stubble', accessory: 'sunglasses',
    skinTone: 'dark', age: 'adult',
  },
  {
    name: 'Sky', gender: 'girl',
    skin: '#f5dcc0', skin2: '#e0c8a8', hair: '#ffdd44',
    hairStyle: 'ponytail', shirt: '#44aaff', shirtStyle: 'stripe',
    pants: '#2255aa', shoes: '#1a3366',
    eyes: '#ffffff', pupil: '#4488ff', pupilStyle: 'round',
    mouth: '#ccaa88', facialHair: 'none', accessory: 'headband',
    skinTone: 'light', age: 'young',
  },
];

const STORAGE_KEY = 'blockforge_skin';
const STORAGE_KEY_CUSTOM = 'blockforge_custom_skin_data'; // legacy single custom skin
const STORAGE_KEY_CUSTOM_LIST = 'blockforge_custom_skins'; // array of saved custom skins

// --- Saved custom skins library -------------------------------------------
export function getCustomSkins() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CUSTOM_LIST);
    if (raw) { const list = JSON.parse(raw); if (Array.isArray(list)) return list; }
  } catch {}
  // Migrate a legacy single custom skin into the list.
  try {
    const old = localStorage.getItem(STORAGE_KEY_CUSTOM);
    if (old) { localStorage.setItem(STORAGE_KEY_CUSTOM_LIST, JSON.stringify([old])); return [old]; }
  } catch {}
  return [];
}

function _saveCustomSkins(list) {
  try { localStorage.setItem(STORAGE_KEY_CUSTOM_LIST, JSON.stringify(list)); } catch {}
}

// Add a new custom skin to the library and select it. Returns its index.
export function addCustomSkin(dataUrl) {
  const list = getCustomSkins();
  list.push(dataUrl);
  _saveCustomSkins(list);
  const idx = list.length - 1;
  setSelectedCustomSkin(idx);
  try { localStorage.setItem('bf_custom_skin_created', '1'); } catch {}
  return idx;
}

export function deleteCustomSkin(index) {
  const list = getCustomSkins();
  if (index < 0 || index >= list.length) return;
  list.splice(index, 1);
  _saveCustomSkins(list);
  // Fix up the current selection if it pointed at/after the removed skin.
  try {
    const sel = localStorage.getItem(STORAGE_KEY) || '';
    if (sel.startsWith('custom:')) {
      const cur = parseInt(sel.slice(7), 10);
      if (cur === index) localStorage.setItem(STORAGE_KEY, '0');       // fell back to preset
      else if (cur > index) localStorage.setItem(STORAGE_KEY, 'custom:' + (cur - 1));
    }
  } catch {}
  reloadCustomSkin();
}

export function setSelectedCustomSkin(index) {
  try { localStorage.setItem(STORAGE_KEY, 'custom:' + index); } catch {}
  reloadCustomSkin();
}

// Cached custom canvas (loaded async from data URL)
let _customCanvas = null;
let _customCanvasLoading = false;
let _customCanvasPromise = null;

function _loadCustomCanvas() {
  if (_customCanvas) return Promise.resolve(_customCanvas);
  if (_customCanvasPromise) return _customCanvasPromise;
  _customCanvasLoading = true;
  _customCanvasPromise = new Promise((resolve) => {
    try {
      const dataUrl = localStorage.getItem(STORAGE_KEY_CUSTOM);
      if (!dataUrl) {
        _customCanvasLoading = false;
        resolve(null);
        return;
      }
      const img = new Image();
      img.onload = () => {
        const c = document.createElement('canvas');
        c.width = 64; c.height = 64;
        const ctx = c.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(img, 0, 0, 64, 64);
        _customCanvas = c;
        _customCanvasLoading = false;
        resolve(_customCanvas);
      };
      img.onerror = () => {
        _customCanvasLoading = false;
        resolve(null);
      };
      img.src = dataUrl;
    } catch {
      _customCanvasLoading = false;
      resolve(null);
    }
  });
  return _customCanvasPromise;
}

export function getSelectedSkin() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && saved.startsWith('custom:')) {
      const idx = parseInt(saved.slice(7), 10);
      const list = getCustomSkins();
      if (list[idx]) return { name: 'Custom ' + (idx + 1), _dataUrl: list[idx], _customIndex: idx };
      return SKIN_PRESETS[0];
    }
    if (saved === 'custom') {
      // Legacy single custom skin.
      const list = getCustomSkins();
      if (list[0]) return { name: 'Custom 1', _dataUrl: list[0], _customIndex: 0 };
      return SKIN_PRESETS[0];
    }
    if (saved) {
      const idx = parseInt(saved, 10);
      if (idx >= 0 && idx < SKIN_PRESETS.length) return SKIN_PRESETS[idx];
    }
  } catch {}
  return SKIN_PRESETS[0];
}

export function setSelectedSkin(index) {
  try {
    localStorage.setItem(STORAGE_KEY, String(index));
  } catch {}
}

// Called by the skin editor after saving — stores the data URL and selects it
export function saveCustomSkin(dataUrl) {
  try {
    localStorage.setItem(STORAGE_KEY_CUSTOM, dataUrl);
    localStorage.setItem(STORAGE_KEY, 'custom');
    // Flag for achievement tracking
    localStorage.setItem('bf_custom_skin_created', '1');
    // Reload the cached canvas
    _customCanvas = null;
    _customCanvasLoading = false;
    _customCanvasPromise = null;
  } catch {}
}

// Force reload custom skin (e.g. after import)
export function reloadCustomSkin() {
  _customCanvas = null;
  _customCanvasLoading = false;
  _customCanvasPromise = null;
}
