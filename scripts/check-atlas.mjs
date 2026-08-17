// Build the atlas with a minimal canvas stub in Node and report any painter
// that throws (buildAtlas would paint magenta for it) plus which tiles land on
// magenta (the fallback color).

class CtxStub {
  constructor() {
    this.ops = [];
    this.globalCompositeOperation = 'source-over';
  }
  fillRect(...a) { this.ops.push(['fr', ...a]); }
  clearRect(...a) { this.ops.push(['cr', ...a]); }
  beginPath() {}
  arc() {}
  fill() {}
  save() {}
  restore() {}
  fillText() {}
  set fillStyle(v) { this._fs = v; }
  get fillStyle() { return this._fs; }
  set font(v) {}
  set textAlign(v) {}
  set textBaseline(v) {}
  drawImage() {}
  getImageData() { return { data: new Uint8ClampedArray(4) }; }
  putImageData() {}
  measureText() { return { width: 10 }; }
  set lineWidth(v) {}
  set strokeStyle(v) {}
  stroke() {}
  strokeRect() {}
  moveTo() {}
  lineTo() {}
  closePath() {}
  clip() {}
  translate() {}
  rotate() {}
  scale() {}
  setTransform() {}
}
class CanvasStub {
  constructor(w, h) { this.width = w; this.height = h; this._calls = []; }
  getContext() { this._ctx = new CtxStub(); return this._ctx; }
}
globalThis.document = {
  createElement(tag) { return new CanvasStub(32, 32); },
};

const { TILES } = await import('../src/blocks.js');
const { buildAtlas, tileUVRect } = await import('../src/tiles.js');

// Manually replicate buildAtlas' loop to catch per-tile failures.
const painters = (await import('../src/tiles.js')).default || null;

const canvas = buildAtlas(1337);
console.log('buildAtlas OK, canvas', canvas.width + 'x' + canvas.height);

// Detect magenta tiles by scanning painter output is hard in stub; instead
// verify every tile name maps to a painter or falls back, and report names
// whose painter is missing.
const PAINTERS = Object.keys(painters ?? {}).filter(k => k !== 'default');
const missing = [];
for (const name of Object.keys(TILES)) {
  if (!PAINTERS.includes(name)) missing.push(name);
}
console.log('tiles without dedicated painter:', missing.length, missing);