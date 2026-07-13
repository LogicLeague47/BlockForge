// Skin Editor + Uploader — a from-scratch pixel editor for 64x64 Minecraft-format
// skins, with a live rotating 3D preview.
//
// Features:
//   - Paint on the standard 64x64 skin layout (zoomed) with region guides
//   - Tools: brush, eraser, fill (bucket), eyedropper
//   - Native colour picker + quick preset swatches
//   - Undo / redo, clear
//   - Import a PNG skin (64x64 or legacy 64x32) — the "skin uploader"
//   - Export the skin as a PNG
//   - Save → applies the skin to your character
//
// The skin is the standard Minecraft UV layout, matching playermodel.js.

import * as THREE from 'three';
import { PlayerModel } from './playermodel.js';
import { createSkinCanvas } from './playermodel.js';
import { getSelectedSkin, saveCustomSkin, reloadCustomSkin } from './skins.js';

const SIZE = 64;          // skin canvas is 64x64
const VIEW = 384;         // on-screen paint area size (px)
const SCALE = VIEW / SIZE; // 6px per skin pixel

// Region guides for the flat layout (front faces of each part) so users know
// where to paint. [x, y, w, h, label, color]
const REGIONS = [
  [8, 8, 8, 8, 'Head', '#ffd24a'],
  [20, 20, 8, 12, 'Body', '#4ac0ff'],
  [44, 20, 4, 12, 'R.Arm', '#8aff6a'],
  [36, 52, 4, 12, 'L.Arm', '#8aff6a'],
  [4, 20, 4, 12, 'R.Leg', '#ff8a6a'],
  [20, 52, 4, 12, 'L.Leg', '#ff8a6a'],
];

const PRESET_COLORS = [
  '#000000', '#404040', '#808080', '#c0c0c0', '#ffffff',
  '#f5dcc0', '#e0c8a8', '#d4a574', '#c0906a', '#8b5e3c', '#6d4c3a',
  '#3b2210', '#663300', '#cc3333', '#ff6600', '#ffcc00', '#337722',
  '#0066aa', '#1a3a5a', '#663399', '#cc2277', '#00aa88',
];

export class SkinEditor {
  constructor() {
    this.color = '#c0906a';
    this.tool = 'brush';
    this.painting = false;
    this._undo = [];
    this._redo = [];
    this._raf = null;
    this._disposed = false;
  }

  init() {
    const root = document.getElementById('skin-editor-root');
    if (!root) return;
    this.root = root;
    root.innerHTML = '';

    // --- editing canvas (64x64, actual skin data) ---
    this.skin = document.createElement('canvas');
    this.skin.width = SIZE; this.skin.height = SIZE;
    this.sctx = this.skin.getContext('2d');
    this.sctx.imageSmoothingEnabled = false;
    this._loadInitialSkin();

    root.appendChild(this._buildLayout());
    this._pushUndo();
    this._redrawPaint();
    this._startPreview();
  }

  // --- initial skin ---------------------------------------------------------
  _loadInitialSkin() {
    // Start blank transparent, then draw the currently selected skin in.
    this.sctx.clearRect(0, 0, SIZE, SIZE);
    const sel = getSelectedSkin();
    if (sel && sel._dataUrl) {
      const img = new Image();
      img.onload = () => {
        this.sctx.clearRect(0, 0, SIZE, SIZE);
        // Handle legacy 64x32 by drawing into the top; else full 64x64.
        this.sctx.drawImage(img, 0, 0, SIZE, SIZE);
        this._afterExternalChange();
      };
      img.src = sel._dataUrl;
    } else {
      const gen = createSkinCanvas(sel || undefined);
      try { this.sctx.drawImage(gen, 0, 0, SIZE, SIZE); } catch (_) {}
    }
  }

  // --- layout ---------------------------------------------------------------
  _buildLayout() {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex;gap:16px;flex-wrap:wrap;justify-content:center;align-items:flex-start;max-width:900px;';

    // Preview column
    const previewCol = document.createElement('div');
    previewCol.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:6px;';
    this.previewWrap = document.createElement('div');
    this.previewWrap.style.cssText = 'width:200px;height:300px;background:linear-gradient(180deg,#1a2a3a,#0d1520);border:1px solid rgba(80,100,140,0.4);border-radius:6px;overflow:hidden;cursor:grab;';
    previewCol.appendChild(this.previewWrap);
    const phint = document.createElement('div');
    phint.style.cssText = 'font:10px monospace;color:#888;';
    phint.textContent = 'Drag to rotate';
    previewCol.appendChild(phint);

    // Paint column
    const paintCol = document.createElement('div');
    paintCol.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:8px;';
    const paintBox = document.createElement('div');
    paintBox.style.cssText = `position:relative;width:${VIEW}px;height:${VIEW}px;flex-shrink:0;background:conic-gradient(#2a2a2a 25%,#333 0 50%,#2a2a2a 0 75%,#333 0) 0 0/16px 16px;border:2px solid rgba(80,80,80,0.6);border-radius:4px;overflow:hidden;touch-action:none;cursor:crosshair;`;
    this.paint = document.createElement('canvas');
    this.paint.width = VIEW; this.paint.height = VIEW;
    this.paint.style.cssText = 'display:block;image-rendering:pixelated;';
    paintBox.appendChild(this.paint);
    // static region-guide overlay
    this.overlay = document.createElement('canvas');
    this.overlay.width = VIEW; this.overlay.height = VIEW;
    this.overlay.style.cssText = 'position:absolute;top:0;left:0;pointer-events:none;';
    paintBox.appendChild(this.overlay);
    this._drawOverlay();
    paintCol.appendChild(paintBox);
    this.paintBox = paintBox;

    // Tools row
    const tools = document.createElement('div');
    tools.style.cssText = 'display:flex;gap:6px;flex-wrap:wrap;justify-content:center;';
    [['brush', 'Brush ✏'], ['eraser', 'Eraser'], ['fill', 'Fill'], ['eyedropper', 'Pick']].forEach(([t, label]) => {
      const b = document.createElement('button');
      b.className = 'menu-btn';
      b.style.cssText = 'min-width:auto;padding:6px 12px;font-size:11px;';
      b.textContent = label;
      b.dataset.tool = t;
      if (t === this.tool) b.classList.add('sel');
      b.addEventListener('click', () => this._setTool(t));
      tools.appendChild(b);
    });
    paintCol.appendChild(tools);
    this.toolBtns = tools;

    const gridToggle = document.createElement('button');
    gridToggle.className = 'menu-btn';
    gridToggle.style.cssText = 'min-width:auto;padding:5px 10px;font-size:10px;';
    gridToggle.textContent = 'Toggle Guides';
    this._showGuides = true;
    gridToggle.addEventListener('click', () => { this._showGuides = !this._showGuides; this.overlay.style.display = this._showGuides ? '' : 'none'; });
    paintCol.appendChild(gridToggle);

    // Controls column
    const ctrlCol = document.createElement('div');
    ctrlCol.style.cssText = 'display:flex;flex-direction:column;gap:10px;width:180px;';

    // Colour picker
    const colorRow = document.createElement('div');
    colorRow.style.cssText = 'display:flex;align-items:center;gap:8px;';
    this.colorInput = document.createElement('input');
    this.colorInput.type = 'color';
    this.colorInput.value = this.color;
    this.colorInput.style.cssText = 'width:44px;height:36px;border:none;background:none;cursor:pointer;';
    this.colorInput.addEventListener('input', () => { this.color = this.colorInput.value; this._updateSwatch(); });
    const swatch = document.createElement('div');
    swatch.style.cssText = 'flex:1;font:12px monospace;color:#ccc;';
    this.hexLabel = swatch;
    colorRow.appendChild(this.colorInput);
    colorRow.appendChild(swatch);
    ctrlCol.appendChild(this._section('COLOUR', colorRow));

    // Preset swatches
    const presets = document.createElement('div');
    presets.style.cssText = 'display:grid;grid-template-columns:repeat(7,1fr);gap:3px;';
    PRESET_COLORS.forEach(c => {
      const cell = document.createElement('div');
      cell.style.cssText = `width:100%;aspect-ratio:1;background:${c};border:1px solid rgba(255,255,255,0.2);border-radius:2px;cursor:pointer;`;
      cell.addEventListener('click', () => { this.color = c; this.colorInput.value = c; this._updateSwatch(); });
      presets.appendChild(cell);
    });
    ctrlCol.appendChild(this._section('QUICK COLOURS', presets));

    // Actions
    const mkBtn = (label, cls, fn) => {
      const b = document.createElement('button');
      b.className = 'menu-btn' + (cls ? ' ' + cls : '');
      b.style.cssText = 'min-width:auto;padding:8px;font-size:11px;';
      b.textContent = label;
      b.addEventListener('click', fn);
      return b;
    };
    const row1 = document.createElement('div');
    row1.style.cssText = 'display:flex;gap:4px;';
    row1.appendChild(mkBtn('Undo', '', () => this._doUndo()));
    row1.appendChild(mkBtn('Redo', '', () => this._doRedo()));
    row1.appendChild(mkBtn('Clear', '', () => this._clear()));
    ctrlCol.appendChild(row1);

    const row2 = document.createElement('div');
    row2.style.cssText = 'display:flex;gap:4px;';
    row2.appendChild(mkBtn('Import PNG', '', () => this._import()));
    row2.appendChild(mkBtn('Export', '', () => this._export()));
    ctrlCol.appendChild(row2);

    const saveBtn = mkBtn('✔ SAVE & USE', '', () => this._save());
    saveBtn.style.cssText = 'min-width:auto;padding:12px;font-size:13px;background:linear-gradient(180deg,#5a8a5a,#366336);border-color:#2a5a2a;';
    ctrlCol.appendChild(saveBtn);

    this.saveMsg = document.createElement('div');
    this.saveMsg.style.cssText = 'font:11px monospace;color:#8c8;min-height:14px;text-align:center;';
    ctrlCol.appendChild(this.saveMsg);

    wrap.appendChild(previewCol);
    wrap.appendChild(paintCol);
    wrap.appendChild(ctrlCol);

    this._updateSwatch();
    this._wirePaint();
    return wrap;
  }

  _section(label, contentEl) {
    const s = document.createElement('div');
    const l = document.createElement('div');
    l.style.cssText = 'font:bold 10px monospace;color:#8bd;letter-spacing:1px;margin-bottom:5px;';
    l.textContent = label;
    s.appendChild(l);
    s.appendChild(contentEl);
    return s;
  }

  _setTool(t) {
    this.tool = t;
    this.toolBtns.querySelectorAll('button').forEach(b => b.classList.toggle('sel', b.dataset.tool === t));
  }

  _updateSwatch() {
    if (this.hexLabel) this.hexLabel.textContent = this.color.toUpperCase();
  }

  // --- paint canvas rendering ----------------------------------------------
  _redrawPaint() {
    const ctx = this.paint.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, VIEW, VIEW);
    ctx.drawImage(this.skin, 0, 0, SIZE, SIZE, 0, 0, VIEW, VIEW);
  }

  _drawOverlay() {
    const ctx = this.overlay.getContext('2d');
    ctx.clearRect(0, 0, VIEW, VIEW);
    // faint pixel grid
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= SIZE; i++) {
      ctx.beginPath(); ctx.moveTo(i * SCALE, 0); ctx.lineTo(i * SCALE, VIEW); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i * SCALE); ctx.lineTo(VIEW, i * SCALE); ctx.stroke();
    }
    // region outlines + labels
    ctx.font = '9px monospace';
    for (const [x, y, w, h, label, color] of REGIONS) {
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(x * SCALE, y * SCALE, w * SCALE, h * SCALE);
      ctx.fillStyle = color;
      ctx.fillText(label, x * SCALE + 1, y * SCALE - 2);
    }
  }

  _wirePaint() {
    const toPixel = (e) => {
      const rect = this.paint.getBoundingClientRect();
      const cx = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      const cy = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
      const px = Math.floor(cx / rect.width * SIZE);
      const py = Math.floor(cy / rect.height * SIZE);
      return { px, py };
    };
    const down = (e) => {
      e.preventDefault();
      const { px, py } = toPixel(e);
      if (px < 0 || py < 0 || px >= SIZE || py >= SIZE) return;
      if (this.tool === 'eyedropper') { this._pick(px, py); return; }
      if (this.tool === 'fill') { this._pushUndo(); this._flood(px, py); this._afterEdit(); return; }
      this._pushUndo();
      this.painting = true;
      this._apply(px, py);
      this._afterEdit();
    };
    const move = (e) => {
      if (!this.painting) return;
      e.preventDefault();
      const { px, py } = toPixel(e);
      if (px < 0 || py < 0 || px >= SIZE || py >= SIZE) return;
      this._apply(px, py);
      this._afterEdit();
    };
    const up = () => { this.painting = false; };

    this._onDown = down; this._onMove = move; this._onUp = up;
    this.paint.addEventListener('mousedown', down);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    this.paint.addEventListener('touchstart', down, { passive: false });
    this.paint.addEventListener('touchmove', move, { passive: false });
    window.addEventListener('touchend', up);
  }

  _apply(px, py) {
    if (this.tool === 'eraser') {
      this.sctx.clearRect(px, py, 1, 1);
    } else {
      this.sctx.fillStyle = this.color;
      this.sctx.fillRect(px, py, 1, 1);
    }
  }

  _pick(px, py) {
    const d = this.sctx.getImageData(px, py, 1, 1).data;
    if (d[3] === 0) return;
    const hex = '#' + [d[0], d[1], d[2]].map(v => v.toString(16).padStart(2, '0')).join('');
    this.color = hex; this.colorInput.value = hex; this._updateSwatch();
    this._setTool('brush');
  }

  _flood(sx, sy) {
    const img = this.sctx.getImageData(0, 0, SIZE, SIZE);
    const data = img.data;
    const idx = (x, y) => (y * SIZE + x) * 4;
    const target = data.slice(idx(sx, sy), idx(sx, sy) + 4);
    const rgb = this._hexRgb(this.color);
    const same = (i) => data[i] === target[0] && data[i + 1] === target[1] && data[i + 2] === target[2] && data[i + 3] === target[3];
    if (rgb[0] === target[0] && rgb[1] === target[1] && rgb[2] === target[2] && target[3] === 255) return;
    const stack = [[sx, sy]];
    while (stack.length) {
      const [x, y] = stack.pop();
      if (x < 0 || y < 0 || x >= SIZE || y >= SIZE) continue;
      const i = idx(x, y);
      if (!same(i)) continue;
      data[i] = rgb[0]; data[i + 1] = rgb[1]; data[i + 2] = rgb[2]; data[i + 3] = 255;
      stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
    }
    this.sctx.putImageData(img, 0, 0);
  }

  _hexRgb(hex) {
    const h = hex.replace('#', '');
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  }

  _afterEdit() {
    this._redrawPaint();
    this._syncPreview();
  }

  _afterExternalChange() {
    this._pushUndo();
    this._redrawPaint();
    this._syncPreview();
  }

  // --- undo/redo ------------------------------------------------------------
  _pushUndo() {
    try {
      this._undo.push(this.sctx.getImageData(0, 0, SIZE, SIZE));
      if (this._undo.length > 40) this._undo.shift();
      this._redo.length = 0;
    } catch (_) {}
  }
  _doUndo() {
    if (this._undo.length < 2) return;
    this._redo.push(this._undo.pop());
    this.sctx.putImageData(this._undo[this._undo.length - 1], 0, 0);
    this._afterEdit();
  }
  _doRedo() {
    if (!this._redo.length) return;
    const img = this._redo.pop();
    this._undo.push(img);
    this.sctx.putImageData(img, 0, 0);
    this._afterEdit();
  }
  _clear() {
    this._pushUndo();
    this.sctx.clearRect(0, 0, SIZE, SIZE);
    this._afterEdit();
  }

  // --- import / export / save ----------------------------------------------
  _import() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/png,image/*';
    input.onchange = () => {
      const file = input.files && input.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          this._pushUndo();
          this.sctx.clearRect(0, 0, SIZE, SIZE);
          // 64x64 direct; legacy 64x32 stretched to top half only.
          if (img.width === 64 && img.height === 32) {
            this.sctx.drawImage(img, 0, 0, 64, 32, 0, 0, 64, 32);
          } else {
            this.sctx.drawImage(img, 0, 0, SIZE, SIZE);
          }
          this._afterEdit();
          this._flash('Imported! Press Save to use it.');
        };
        img.onerror = () => this._flash('Could not read that image.', true);
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    };
    input.click();
  }

  _export() {
    const url = this.skin.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url; a.download = 'blockforge-skin.png';
    document.body.appendChild(a); a.click(); a.remove();
    this._flash('Exported PNG.');
  }

  _save() {
    try {
      const url = this.skin.toDataURL('image/png');
      saveCustomSkin(url);
      reloadCustomSkin();
      this._flash('Saved! Your character now uses this skin.');
    } catch (_) {
      this._flash('Save failed.', true);
    }
  }

  _flash(msg, err) {
    if (this.saveMsg) { this.saveMsg.textContent = msg; this.saveMsg.style.color = err ? '#f88' : '#8c8'; }
  }

  // --- 3D preview -----------------------------------------------------------
  _startPreview() {
    const w = 200, h = 300;
    this.pRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.pRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.pRenderer.setSize(w, h);
    this.previewWrap.appendChild(this.pRenderer.domElement);
    this.pScene = new THREE.Scene();
    this.pCamera = new THREE.PerspectiveCamera(40, w / h, 0.1, 100);
    this.pCamera.position.set(0, 1.0, 4.2);
    this.pCamera.lookAt(0, 0.9, 0);
    this.pScene.add(new THREE.AmbientLight(0xffffff, 0.9));
    const dir = new THREE.DirectionalLight(0xffffff, 0.6);
    dir.position.set(1, 2, 1.5);
    this.pScene.add(dir);

    this.model = new PlayerModel(this.pScene, { name: 'edit' });
    this.model.setVisible(true);
    this.model.group.position.y = -0.9;
    this._syncPreview();

    // drag to rotate
    this._yaw = 0.4;
    let dragging = false, lastX = 0;
    const dom = this.previewWrap;
    const dStart = (e) => { dragging = true; lastX = (e.touches ? e.touches[0].clientX : e.clientX); dom.style.cursor = 'grabbing'; };
    const dMove = (e) => { if (!dragging) return; const x = (e.touches ? e.touches[0].clientX : e.clientX); this._yaw += (x - lastX) * 0.01; lastX = x; };
    const dEnd = () => { dragging = false; dom.style.cursor = 'grab'; };
    dom.addEventListener('mousedown', dStart);
    window.addEventListener('mousemove', dMove);
    window.addEventListener('mouseup', dEnd);
    dom.addEventListener('touchstart', dStart, { passive: true });
    dom.addEventListener('touchmove', dMove, { passive: true });
    window.addEventListener('touchend', dEnd);
    this._pDrag = { dStart, dMove, dEnd, dom };

    const loop = () => {
      if (this._disposed) return;
      this._raf = requestAnimationFrame(loop);
      if (this.model) this.model.group.rotation.y = this._yaw;
      this.pRenderer.render(this.pScene, this.pCamera);
    };
    loop();
  }

  _syncPreview() {
    if (!this.model || !this.model.skin) return;
    try {
      const g = this.model.skin.getContext('2d');
      g.clearRect(0, 0, SIZE, SIZE);
      g.drawImage(this.skin, 0, 0);
      this.model._updateSkinTexture();
    } catch (_) {}
  }

  // --- cleanup --------------------------------------------------------------
  destroy() {
    this._disposed = true;
    if (this._raf) cancelAnimationFrame(this._raf);
    window.removeEventListener('mousemove', this._onMove);
    window.removeEventListener('mouseup', this._onUp);
    window.removeEventListener('touchend', this._onUp);
    if (this._pDrag) {
      window.removeEventListener('mousemove', this._pDrag.dMove);
      window.removeEventListener('mouseup', this._pDrag.dEnd);
      window.removeEventListener('touchend', this._pDrag.dEnd);
    }
    try { if (this.model) this.model.dispose(); } catch (_) {}
    try { if (this.pRenderer) { this.pRenderer.dispose(); this.pRenderer.domElement.remove(); } } catch (_) {}
    if (this.root) this.root.innerHTML = '';
  }
}
