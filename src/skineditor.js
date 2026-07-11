import * as THREE from 'three';
import { SKIN_PRESETS, saveCustomSkin } from './skins.js';
import { PlayerModel } from './playermodel.js';

const TILE = 64;
const ZOOM = 7;

const PRESET_COLORS = [
  '#000000','#1a1a1a','#333333','#4d4d4d','#666666','#808080','#999999','#b3b3b3','#cccccc','#ffffff',
  '#4a0000','#800000','#b30000','#cc0000','#e60000','#ff0000','#ff3333','#ff6666','#ff9999','#ffcccc',
  '#4a2600','#804400','#b36200','#cc7a00','#e69100','#ffaa00','#ffbb33','#ffcc66','#ffdd99','#ffeecc',
  '#4a4a00','#808000','#b3b300','#cccc00','#e6e600','#ffff00','#ffff33','#ffff66','#ffff99','#ffffcc',
  '#004a00','#008000','#00b300','#00cc00','#00e600','#00ff00','#33ff33','#66ff66','#99ff99','#ccffcc',
  '#004a4a','#008080','#00b3b3','#00cccc','#00e6e6','#00ffff','#33ffff','#66ffff','#99ffff','#ccffff',
  '#00004a','#000080','#0000b3','#0000cc','#0000e6','#0000ff','#3333ff','#6666ff','#9999ff','#ccccff',
  '#4a004a','#800080','#b300b3','#cc00cc','#e600e6','#ff00ff','#ff33ff','#ff66ff','#ff99ff','#ffccff',
  '#3d2b1f','#5c4033','#7a5230','#8d6e47','#a47c4e','#c0906a','#d4a574','#e0c090','#f0dab0','#f8ecd0',
  '#2b1504','#4a2600','#5c3310','#704214','#8b4513','#a0522d','#b87333','#cd853f','#deb887','#f5deb3',
];

export class SkinEditor {
  constructor() {
    this.skinCanvas = null;
    this.skinCtx = null;
    this.gridCanvas = null;
    this.gridCtx = null;
    this.color = '#c0906a';
    this.hue = 20;
    this.sat = 0.6;
    this.bright = 0.8;
    this.tool = 'brush';
    this.undoStack = [];
    this.redoStack = [];
    this._active = false;
    this._drawing = false;
    this._lastPx = null;
    this._raf = null;
    this._scene = null;
    this._camera = null;
    this._renderer = null;
    this._playerModel = null;
    this._rotY = 0;
    this._dragRotY = 0;
    this._autoRotate = true;
    this._skinDirty = false;
  }

  init() {
    this._createSkinCanvas();
    this._setupGrid();
    this._setupColorPalette();
    this._setupPresetColors();
    this._setupPreview();
    this._setupTools();
    this._saveUndo();
    this._active = true;
  }

  destroy() {
    this._active = false;
    if (this._raf) cancelAnimationFrame(this._raf);
    if (this._playerModel) { this._playerModel.dispose(); this._playerModel = null; }
    if (this._renderer) {
      this._renderer.dispose();
      const el = this._renderer.domElement;
      if (el.parentNode) el.parentNode.removeChild(el);
      this._renderer = null;
    }
    this._scene = null;
    this._camera = null;
  }

  _createSkinCanvas() {
    this.skinCanvas = document.createElement('canvas');
    this.skinCanvas.width = TILE;
    this.skinCanvas.height = TILE;
    this.skinCtx = this.skinCanvas.getContext('2d');
    this.skinCtx.imageSmoothingEnabled = false;
    const preset = this._loadCurrentPreset();
    this._drawPresetToCanvas(preset);
  }

  _loadCurrentPreset() {
    try {
      const saved = localStorage.getItem('blockforge_skin');
      if (saved === 'custom') {
        const dataUrl = localStorage.getItem('blockforge_custom_skin_data');
        if (dataUrl) return { _dataUrl: dataUrl };
      }
      if (saved) {
        const idx = parseInt(saved, 10);
        if (idx >= 0 && idx < SKIN_PRESETS.length) return SKIN_PRESETS[idx];
      }
    } catch {}
    return SKIN_PRESETS[0];
  }

  _drawPresetToCanvas(preset) {
    if (preset && preset._dataUrl) {
      const img = new Image();
      img.onload = () => {
        this.skinCtx.drawImage(img, 0, 0, 64, 64);
        this._renderGrid();
        this._updateSkin();
      };
      img.src = preset._dataUrl;
      return;
    }
    const g = this.skinCtx;
    g.clearRect(0, 0, 64, 64);
    const S = preset.skin||'#c0906a', S2 = preset.skin2||'#a87850', H = preset.hair||'#3b2210';
    const SH = preset.shirt||'#1d8db5', P = preset.pants||'#2d3364', SHO = preset.shoes||'#493828';
    const W = preset.eyes||'#fff', PU = preset.pupil||'#263694', M = preset.mouth||'#6b4330';
    const f = (x,y,w,h,c)=>{g.fillStyle=c;g.fillRect(x,y,w,h);};
    f(0,8,8,8,S);f(0,8,8,2,H);f(0,8,2,5,H);
    f(16,8,8,8,S);f(16,8,8,2,H);f(22,8,2,5,H);
    f(8,0,8,8,H);f(16,0,8,8,S);
    f(8,8,8,8,S);f(8,8,8,2,H);f(8,8,1,5,H);f(15,8,1,5,H);
    f(10,11,2,2,W);f(10,12,1,1,PU);f(13,11,2,2,W);f(14,12,1,1,PU);
    f(12,13,1,1,S2);f(11,14,3,1,M);f(24,8,8,8,H);
    f(16,20,4,12,SH);f(28,20,4,12,SH);f(20,16,8,4,SH);f(22,16,4,2,S);
    f(28,32,8,4,P);f(20,20,8,12,SH);f(32,20,8,12,SH);
    f(40,20,4,9,SH);f(40,29,4,3,S);f(48,20,4,9,SH);f(48,29,4,3,S);
    f(44,16,4,4,SH);f(48,16,4,4,S);f(44,20,4,9,SH);f(44,29,4,3,S);
    f(52,20,4,9,SH);f(52,29,4,3,S);
    f(32,52,4,9,SH);f(32,61,4,3,S);f(40,52,4,9,SH);f(40,61,4,3,S);
    f(36,48,4,4,SH);f(40,48,4,4,S);f(36,52,4,9,SH);f(36,61,4,3,S);
    f(44,52,4,9,SH);f(44,61,4,3,S);
    f(0,20,4,9,P);f(0,29,4,3,SHO);f(8,20,4,9,P);f(8,29,4,3,SHO);
    f(4,16,4,4,P);f(8,16,4,4,SHO);f(4,20,4,9,P);f(4,29,4,3,SHO);
    f(12,20,4,9,P);f(12,29,4,3,SHO);
    f(16,52,4,9,P);f(16,61,4,3,SHO);f(24,52,4,9,P);f(24,61,4,3,SHO);
    f(20,48,4,4,P);f(24,48,4,4,SHO);f(20,52,4,9,P);f(20,61,4,3,SHO);
    f(28,52,4,9,P);f(28,61,4,3,SHO);
  }

  _setupGrid() {
    this.gridCanvas = document.getElementById('skin-grid-canvas');
    if (!this.gridCanvas) return;
    this.gridCtx = this.gridCanvas.getContext('2d');
    this.gridCtx.imageSmoothingEnabled = false;
    this._renderGrid();
    const el = this.gridCanvas;
    el.addEventListener('mousedown', (e) => this._onGridDown(e));
    el.addEventListener('mousemove', (e) => this._onGridMove(e));
    el.addEventListener('mouseup', () => this._onGridUp());
    el.addEventListener('mouseleave', () => this._onGridUp());
    el.addEventListener('contextmenu', (e) => e.preventDefault());
    this._setupRegionLabels();
  }

  _renderGrid() {
    if (!this.gridCtx) return;
    const ctx = this.gridCtx;
    const W = TILE * ZOOM, H = TILE * ZOOM;
    ctx.clearRect(0, 0, W, H);
    for (let y = 0; y < TILE; y++)
      for (let x = 0; x < TILE; x++) {
        ctx.fillStyle = ((x + y) % 2 === 0) ? '#1a1a2e' : '#16162a';
        ctx.fillRect(x * ZOOM, y * ZOOM, ZOOM, ZOOM);
      }
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(this.skinCanvas, 0, 0, TILE, ZOOM * TILE);
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= TILE; i++) {
      const p = i * ZOOM;
      ctx.beginPath(); ctx.moveTo(p, 0); ctx.lineTo(p, H); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, p); ctx.lineTo(W, p); ctx.stroke();
    }
  }

  _pxFromEvent(e) {
    const rect = this.gridCanvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / (rect.width / TILE));
    const y = Math.floor((e.clientY - rect.top) / (rect.height / TILE));
    if (x < 0 || x >= TILE || y < 0 || y >= TILE) return null;
    return { x, y };
  }

  _onGridDown(e) {
    const p = this._pxFromEvent(e);
    if (!p) return;
    this._drawing = true;
    this._lastPx = p;
    if (this.tool === 'eyedropper') {
      const d = this.skinCtx.getImageData(p.x, p.y, 1, 1).data;
      this._setColor('#' + [d[0],d[1],d[2]].map(v=>v.toString(16).padStart(2,'0')).join(''));
      return;
    }
    if (this.tool === 'fill') {
      this._saveUndo();
      this._floodFill(p.x, p.y);
      this._renderGrid();
      this._updateSkin();
      return;
    }
    this._saveUndo();
    this._paintPx(p.x, p.y);
    this._renderGrid();
    this._updateSkin();
  }

  _onGridMove(e) {
    if (!this._drawing) return;
    if (this.tool === 'brush' || this.tool === 'eraser') {
      const p = this._pxFromEvent(e);
      if (!p) return;
      if (this._lastPx && (p.x !== this._lastPx.x || p.y !== this._lastPx.y)) {
        this._line(this._lastPx.x, this._lastPx.y, p.x, p.y);
      } else {
        this._paintPx(p.x, p.y);
      }
      this._lastPx = p;
      this._renderGrid();
      this._updateSkin();
    }
  }

  _onGridUp() { this._drawing = false; this._lastPx = null; }

  _paintPx(x, y) {
    if (this.tool === 'eraser') this.skinCtx.clearRect(x, y, 1, 1);
    else { this.skinCtx.fillStyle = this.color; this.skinCtx.fillRect(x, y, 1, 1); }
  }

  _line(x0, y0, x1, y1) {
    const dx = Math.abs(x1-x0), sx = x0<x1?1:-1;
    const dy = -Math.abs(y1-y0), sy = y0<y1?1:-1;
    let err = dx+dy;
    while (true) {
      this._paintPx(x0, y0);
      if (x0===x1&&y0===y1) break;
      const e2=2*err;
      if (e2>=dy){err+=dy;x0+=sx;}
      if (e2<=dx){err+=dx;y0+=sy;}
    }
  }

  _floodFill(sx, sy) {
    const img = this.skinCtx.getImageData(0,0,64,64);
    const d = img.data;
    const idx = (y,x) => (y*64+x)*4;
    const si = idx(sy,sx);
    const sr=d[si],sg=d[si+1],sb=d[si+2],sa=d[si+3];
    const fc = document.createElement('canvas').getContext('2d');
    fc.fillStyle = this.color; fc.fillRect(0,0,1,1);
    const fd = fc.getImageData(0,0,1,1).data;
    if (sr===fd[0]&&sg===fd[1]&&sb===fd[2]&&sa===255) return;
    const stack=[[sx,sy]], vis=new Set();
    while (stack.length) {
      const [x,y]=stack.pop();
      const k=y*64+x;
      if (vis.has(k)||x<0||x>=64||y<0||y>=64) continue;
      const i=idx(y,x);
      if (d[i]!==sr||d[i+1]!==sg||d[i+2]!==sb||d[i+3]!==sa) continue;
      vis.add(k);
      d[i]=fd[0];d[i+1]=fd[1];d[i+2]=fd[2];d[i+3]=255;
      stack.push([x+1,y],[x-1,y],[x,y+1],[x,y-1]);
    }
    this.skinCtx.putImageData(img,0,0);
  }

  _setupRegionLabels() {
    const overlay = document.getElementById('skin-grid-overlay');
    if (!overlay) return;
    overlay.innerHTML = '';
    const labels = [
      ['HEAD', 8, 8, 8, 8], ['BODY', 20, 20, 8, 12],
      ['R ARM', 44, 20, 4, 12], ['L ARM', 36, 52, 4, 12],
      ['R LEG', 4, 20, 4, 12], ['L LEG', 20, 52, 4, 12],
    ];
    const scale = overlay.offsetWidth / (TILE * ZOOM);
    for (const [text, rx, ry, rw, rh] of labels) {
      const el = document.createElement('div');
      el.textContent = text;
      el.style.cssText = 'position:absolute;font:bold 6px monospace;color:rgba(255,255,255,0.3);text-shadow:1px 1px 0 rgba(0,0,0,0.5);pointer-events:none;';
      el.style.left = ((rx + rw / 2) * ZOOM * scale) + 'px';
      el.style.top = (ry * ZOOM * scale - 1) + 'px';
      el.style.transform = 'translateX(-50%)';
      overlay.appendChild(el);
    }
  }

  _setupColorPalette() {
    this._drawHueBar();
    this._drawSatBright();
    this._updateColorFromHSL();
    const hueBar = document.getElementById('skin-hue-bar');
    const hueCursor = document.getElementById('skin-hue-cursor');
    const sbCanvas = document.getElementById('skin-sat-bright');
    const sbCursor = document.getElementById('skin-sb-cursor');
    let draggingHue = false, draggingSB = false;
    const setHueFromEvent = (e) => {
      const rect = hueBar.getBoundingClientRect();
      const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
      this.hue = y * 360;
      hueCursor.style.top = (y * rect.height) + 'px';
      this._drawSatBright();
      this._updateColorFromHSL();
    };
    const setSBFromEvent = (e) => {
      const rect = sbCanvas.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
      this.sat = x;
      this.bright = 1 - y;
      sbCursor.style.left = (x * rect.width) + 'px';
      sbCursor.style.top = (y * rect.height) + 'px';
      this._updateColorFromHSL();
    };
    hueBar.addEventListener('mousedown', (e) => { draggingHue = true; setHueFromEvent(e); });
    hueBar.addEventListener('touchstart', (e) => { draggingHue = true; setHueFromEvent(e.touches[0]); e.preventDefault(); }, {passive:false});
    window.addEventListener('mousemove', (e) => { if (draggingHue) setHueFromEvent(e); });
    window.addEventListener('touchmove', (e) => { if (draggingHue) setHueFromEvent(e.touches[0]); }, {passive:true});
    window.addEventListener('mouseup', () => { draggingHue = false; });
    window.addEventListener('touchend', () => { draggingHue = false; });
    sbCanvas.addEventListener('mousedown', (e) => { draggingSB = true; setSBFromEvent(e); });
    sbCanvas.addEventListener('touchstart', (e) => { draggingSB = true; setSBFromEvent(e.touches[0]); e.preventDefault(); }, {passive:false});
    window.addEventListener('mousemove', (e) => { if (draggingSB) setSBFromEvent(e); });
    window.addEventListener('touchmove', (e) => { if (draggingSB) setSBFromEvent(e.touches[0]); }, {passive:true});
    window.addEventListener('mouseup', () => { draggingSB = false; });
    window.addEventListener('touchend', () => { draggingSB = false; });
  }

  _drawHueBar() {
    const c = document.getElementById('skin-hue-bar');
    if (!c) return;
    const ctx = c.getContext('2d');
    const h = c.height;
    for (let y = 0; y < h; y++) {
      ctx.fillStyle = `hsl(${(y/h)*360}, 100%, 50%)`;
      ctx.fillRect(0, y, c.width, 1);
    }
    const cursor = document.getElementById('skin-hue-cursor');
    if (cursor) cursor.style.top = (this.hue / 360 * h) + 'px';
  }

  _drawSatBright() {
    const c = document.getElementById('skin-sat-bright');
    if (!c) return;
    const ctx = c.getContext('2d');
    const w = c.width, h = c.height;
    const [r, g, b] = this._hslToRgb(this.hue / 360, 1, 0.5);
    const hueCol = `rgb(${r},${g},${b})`;
    const gradH = ctx.createLinearGradient(0, 0, w, 0);
    gradH.addColorStop(0, '#ffffff');
    gradH.addColorStop(1, hueCol);
    ctx.fillStyle = gradH;
    ctx.fillRect(0, 0, w, h);
    const gradV = ctx.createLinearGradient(0, 0, 0, h);
    gradV.addColorStop(0, 'rgba(0,0,0,0)');
    gradV.addColorStop(1, '#000000');
    ctx.fillStyle = gradV;
    ctx.fillRect(0, 0, w, h);
    const cursor = document.getElementById('skin-sb-cursor');
    if (cursor) {
      cursor.style.left = (this.sat * w) + 'px';
      cursor.style.top = ((1 - this.bright) * h) + 'px';
    }
  }

  _updateColorFromHSL() {
    const [r, g, b] = this._hslToRgb(this.hue / 360, this.sat, this.bright);
    this.color = '#' + [r,g,b].map(v=>v.toString(16).padStart(2,'0')).join('');
    const swatch = document.getElementById('skin-color-swatch');
    const hex = document.getElementById('skin-color-hex');
    if (swatch) swatch.style.background = this.color;
    if (hex) hex.textContent = this.color;
    document.querySelectorAll('.skin-color-cell').forEach(el => {
      el.classList.toggle('selected', el.dataset.color === this.color);
    });
  }

  _hslToRgb(h, s, l) {
    let r, g, b;
    if (s === 0) { r = g = b = l; }
    else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = this._hueToRgb(p, q, h + 1/3);
      g = this._hueToRgb(p, q, h);
      b = this._hueToRgb(p, q, h - 1/3);
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }

  _hueToRgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  }

  _setColor(hex) {
    this.color = hex;
    const r = parseInt(hex.slice(1,3),16)/255;
    const g = parseInt(hex.slice(3,5),16)/255;
    const b = parseInt(hex.slice(5,7),16)/255;
    const max = Math.max(r,g,b), min = Math.min(r,g,b);
    const l = (max+min)/2;
    if (max !== min) {
      const d = max - min;
      const s = l > 0.5 ? d/(2-max-min) : d/(max+min);
      let h = 0;
      if (max === r) h = ((g-b)/d + (g<b?6:0)) / 6;
      else if (max === g) h = ((b-r)/d + 2) / 6;
      else h = ((r-g)/d + 4) / 6;
      this.hue = h * 360;
      this.sat = s;
      this.bright = max;
    }
    this._drawHueBar();
    this._drawSatBright();
    this._updateColorFromHSL();
  }

  _setupPresetColors() {
    const grid = document.getElementById('skin-preset-colors');
    if (!grid) return;
    grid.innerHTML = '';
    for (const c of PRESET_COLORS) {
      const el = document.createElement('div');
      el.className = 'skin-color-cell' + (c === this.color ? ' selected' : '');
      el.style.background = c;
      el.dataset.color = c;
      el.addEventListener('click', () => this._setColor(c));
      grid.appendChild(el);
    }
  }

  _setupPreview() {
    const container = document.querySelector('.skin-editor-preview-box');
    if (!container) return;

    this._scene = new THREE.Scene();
    this._scene.background = new THREE.Color(0x1a1a2e);

    this._camera = new THREE.PerspectiveCamera(35, container.clientWidth / container.clientHeight, 0.1, 20);
    this._camera.position.set(0, 1.4, 3.5);
    this._camera.lookAt(0, 0.9, 0);

    const sun = new THREE.DirectionalLight(0xfff8e7, 1.8);
    sun.position.set(5, 10, 7);
    this._scene.add(sun);
    this._scene.add(new THREE.AmbientLight(0xc8d8ff, 0.5));
    this._scene.add(new THREE.HemisphereLight(0x87ceeb, 0x556b2f, 0.4));

    this._renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    this._renderer.setSize(container.clientWidth, container.clientHeight);
    this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(this._renderer.domElement);

    this._playerModel = new PlayerModel(this._scene, { _customCanvas: this.skinCanvas });
    this._playerModel.group.position.set(0, 0, 0);
    this._playerModel.setVisible(true);

    // Set up raycaster for painting on 3D model
    this._raycaster = new THREE.Raycaster();
    this._mouse = new THREE.Vector2();
    this._painting3D = false;
    this._lastPx3D = null;

    this._bindPreviewDrag(container);
    this._bindPreviewPaint(container);
    this._startPreviewLoop();
  }

  _renderPreview() {
    if (!this._renderer || !this._scene || !this._camera) return;
    this._renderer.render(this._scene, this._camera);
  }

  _updateSkin() {
    if (!this._playerModel) return;
    this._playerModel.setSkin({ _customCanvas: this.skinCanvas });
  }

  _bindPreviewDrag(container) {
    let dragging = false, lastX = 0;
    container.addEventListener('mousedown', (e) => { 
      if (e.button !== 2) { // Don't rotate if right-clicking (context menu)
        dragging = true; 
        this._autoRotate = false; 
        lastX = e.clientX; 
      }
      e.preventDefault(); 
    });
    container.addEventListener('touchstart', (e) => { 
      dragging = true; 
      this._autoRotate = false; 
      lastX = e.touches[0].clientX; 
    }, {passive:true});
    window.addEventListener('mousemove', (e) => {
      if (!dragging) return;
      this._rotY += (e.clientX - lastX) * 0.01;
      lastX = e.clientX;
    });
    window.addEventListener('touchmove', (e) => {
      if (!dragging) return;
      this._rotY += (e.touches[0].clientX - lastX) * 0.01;
      lastX = e.touches[0].clientX;
    }, {passive:true});
    window.addEventListener('mouseup', () => { dragging = false; setTimeout(() => { this._autoRotate = true; }, 2000); });
    window.addEventListener('touchend', () => { dragging = false; setTimeout(() => { this._autoRotate = true; }, 2000); });
  }

  // --- 3D Painting ---

  _getPartFaceInfo(partName, faceIndex) {
    // Map each part's face index to: [sx, sy, sw, sh] (cutFace params) and [w, h] (face size in pixels)
    const mappings = {
      head: [
        [0, 8, 8, 8],   // +X right
        [16, 8, 8, 8],  // -X left
        [8, 0, 8, 8],   // +Y top
        [16, 0, 8, 8],  // -Y bottom
        [24, 8, 8, 8],  // +Z back
        [8, 8, 8, 8],   // -Z front
      ],
      body: [
        [16, 20, 4, 12], // +X right
        [28, 20, 4, 12], // -X left
        [20, 16, 8, 4],  // +Y top
        [28, 32, 8, 4],  // -Y bottom
        [20, 20, 8, 12], // +Z front
        [32, 20, 8, 12], // -Z back
      ],
      rightArm: [
        [40, 20, 4, 12], // +X outer
        [48, 20, 4, 12], // -X inner
        [44, 16, 4, 4],  // +Y top
        [48, 16, 4, 4],  // -Y bottom
        [44, 20, 4, 12], // +Z front
        [52, 20, 4, 12], // -Z back
      ],
      leftArm: [
        [32, 52, 4, 12], // +X outer
        [40, 52, 4, 12], // -X inner
        [36, 48, 4, 4],  // +Y top
        [40, 48, 4, 4],  // -Y bottom
        [36, 52, 4, 12], // +Z front
        [44, 52, 4, 12], // -Z back
      ],
      rightLeg: [
        [0, 20, 4, 12],  // +X outer
        [8, 20, 4, 12],  // -X inner
        [4, 16, 4, 4],   // +Y top
        [8, 16, 4, 4],   // -Y bottom
        [4, 20, 4, 12],  // +Z front
        [12, 20, 4, 12], // -Z back
      ],
      leftLeg: [
        [16, 52, 4, 12], // +X outer
        [24, 52, 4, 12], // -X inner
        [20, 48, 4, 4],  // +Y top
        [24, 48, 4, 4],  // -Y bottom
        [20, 52, 4, 12], // +Z front
        [28, 52, 4, 12], // -Z back
      ],
    };
    return mappings[partName]?.[faceIndex];
  }

  _uvToSkinPixel(partName, faceIndex, u, v) {
    const info = this._getPartFaceInfo(partName, faceIndex);
    if (!info) return null;
    const [sx, sy, sw, sh] = info;
    // Flip V vertically because Three.js uses bottom-left as (0,0)
    const x = Math.floor(sx + u * sw);
    const y = Math.floor(sy + (1 - v) * sh);
    // Clamp to 0-63
    return {
      x: Math.max(0, Math.min(63, x)),
      y: Math.max(0, Math.min(63, y))
    };
  }

  _getSkinPixelFromEvent(e, container) {
    if (!this._playerModel) return null;

    const rect = container.getBoundingClientRect();
    // Calculate mouse position in normalized device coords (-1 to +1)
    this._mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this._mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    // Raycast!
    this._raycaster.setFromCamera(this._mouse, this._camera);
    const meshes = [
      this._playerModel.head,
      this._playerModel.body,
      this._playerModel.rightArm,
      this._playerModel.leftArm,
      this._playerModel.rightLeg,
      this._playerModel.leftLeg,
    ];
    const intersects = this._raycaster.intersectObjects(meshes);

    if (intersects.length === 0) return null;

    const hit = intersects[0];
    const partName = hit.object.userData.partName;
    const faceIndex = hit.faceIndex;
    const uv = hit.uv;

    return this._uvToSkinPixel(partName, faceIndex, uv.x, uv.y);
  }

  _bindPreviewPaint(container) {
    container.style.cursor = 'crosshair';

    container.addEventListener('mousedown', (e) => this._onPreviewDown(e, container));
    container.addEventListener('mousemove', (e) => this._onPreviewMove(e, container));
    window.addEventListener('mouseup', () => this._onPreviewUp());
    container.addEventListener('contextmenu', (e) => e.preventDefault());

    // Touch events
    container.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this._onPreviewDown(e.touches[0], container);
    }, {passive:false});
    container.addEventListener('touchmove', (e) => {
      if (!this._painting3D) return;
      this._onPreviewMove(e.touches[0], container);
    }, {passive:false});
    window.addEventListener('touchend', () => this._onPreviewUp());
  }

  _onPreviewDown(e, container) {
    const pixel = this._getSkinPixelFromEvent(e, container);
    if (!pixel) return;

    this._painting3D = true;
    this._lastPx3D = pixel;
    this._saveUndo();

    if (this.tool === 'eyedropper') {
      // Eyedropper: pick color from skin
      const imgData = this.skinCtx.getImageData(pixel.x, pixel.y, 1, 1);
      const hex = '#' + 
        imgData.data[0].toString(16).padStart(2, '0') + 
        imgData.data[1].toString(16).padStart(2, '0') + 
        imgData.data[2].toString(16).padStart(2, '0');
      this._setColor(hex);
    } else {
      // Brush or eraser: paint!
      this._paintPx(pixel.x, pixel.y);
      this._updateSkinAndGrid();
    }
  }

  _onPreviewMove(e, container) {
    if (!this._painting3D || this.tool === 'eyedropper') return;
    const pixel = this._getSkinPixelFromEvent(e, container);
    if (!pixel) return;

    if (this._lastPx3D && (pixel.x !== this._lastPx3D.x || pixel.y !== this._lastPx3D.y)) {
      this._line(this._lastPx3D.x, this._lastPx3D.y, pixel.x, pixel.y);
    } else {
      this._paintPx(pixel.x, pixel.y);
    }

    this._lastPx3D = pixel;
    this._updateSkinAndGrid();
  }

  _onPreviewUp() {
    this._painting3D = false;
    this._lastPx3D = null;
  }

  _updateSkinAndGrid() {
    // Refresh the 3D model and the 2D grid
    this._updateSkin();
    this._renderGrid();
  }

  _startPreviewLoop() {
    const loop = () => {
      if (!this._active) return;
      this._raf = requestAnimationFrame(loop);
      if (this._autoRotate) this._rotY += 0.008;
      if (this._playerModel) this._playerModel.group.rotation.y = this._rotY;
      this._renderPreview();
    };
    loop();
  }

  _saveUndo() {
    this.undoStack.push(this.skinCtx.getImageData(0,0,64,64));
    if (this.undoStack.length > 50) this.undoStack.shift();
    this.redoStack = [];
  }
  undo() {
    if (this.undoStack.length <= 1) return;
    this.redoStack.push(this.undoStack.pop());
    this.skinCtx.putImageData(this.undoStack[this.undoStack.length-1], 0, 0);
    this._renderGrid(); this._updateSkin();
  }
  redo() {
    if (!this.redoStack.length) return;
    const s = this.redoStack.pop(); this.undoStack.push(s);
    this.skinCtx.putImageData(s, 0, 0);
    this._renderGrid(); this._updateSkin();
  }

  _setupTools() {
    document.querySelectorAll('[data-skin-tool]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.tool = btn.dataset.skinTool;
        document.querySelectorAll('[data-skin-tool]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
    document.getElementById('skin-undo')?.addEventListener('click', () => this.undo());
    document.getElementById('skin-redo')?.addEventListener('click', () => this.redo());
    document.getElementById('skin-clear')?.addEventListener('click', () => {
      this._saveUndo(); this.skinCtx.clearRect(0,0,64,64);
      this._renderGrid(); this._updateSkin();
    });
    document.getElementById('skin-fill-all')?.addEventListener('click', () => {
      this._saveUndo(); this.skinCtx.fillStyle = this.color; this.skinCtx.fillRect(0,0,64,64);
      this._renderGrid(); this._updateSkin();
    });
    document.getElementById('skin-save')?.addEventListener('click', () => {
      const dataUrl = this.skinCanvas.toDataURL('image/png');
      saveCustomSkin(dataUrl);
      alert('Skin saved!');
    });
    document.getElementById('skin-load-preset')?.addEventListener('click', () => {
      const preset = this._loadCurrentPreset();
      this._saveUndo();
      this._drawPresetToCanvas(preset);
      this._renderGrid(); this._updateSkin();
    });
    document.getElementById('skin-export')?.addEventListener('click', () => {
      const a = document.createElement('a'); a.download = 'skin.png';
      a.href = this.skinCanvas.toDataURL('image/png'); a.click();
    });
    document.getElementById('skin-import')?.addEventListener('click', () => {
      const inp = document.createElement('input'); inp.type='file'; inp.accept='image/png';
      inp.onchange = (e) => {
        const f = e.target.files[0]; if (!f) return;
        const img = new Image();
        img.onload = () => {
          this._saveUndo(); this.skinCtx.clearRect(0,0,64,64);
          this.skinCtx.drawImage(img, 0, 0, 64, 64);
          this._renderGrid(); this._updateSkin();
        };
        img.src = URL.createObjectURL(f);
      };
      inp.click();
    });
  }

  getSkinCanvas() { return this.skinCanvas; }
}
