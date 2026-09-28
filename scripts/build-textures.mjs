// Build script: pre-render block atlas + ALL mob textures as PNGs.
// Copies src/ to a temp dir, patches only the THREE import to a mock,
// then runs in Playwright to extract every texture.
//
// Usage: node scripts/build-textures.mjs

import { chromium } from 'playwright-core';
import { createServer } from 'http';
import { readFileSync, writeFileSync, mkdirSync, unlinkSync, cpSync, rmSync, readdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT = join(ROOT, 'public', 'textures');
const STAGE = join(ROOT, '__tex_build');

// ── Stage: copy src/ and patch THREE import ───────────────────────────────
if (rmSync) try { rmSync(STAGE, { recursive: true }); } catch {}
mkdirSync(STAGE, { recursive: true });
cpSync(join(ROOT, 'src'), STAGE, { recursive: true });

// Write THREE mock into staged src
const threeMock = `
export class Vector3 { constructor(x=0,y=0,z=0){this.x=x;this.y=y;this.z=z;} copy(v){this.x=v.x;this.y=v.y;this.z=v.z;return this;} set(x,y,z){this.x=x;this.y=y;this.z=z;return this;} subVectors(a,b){this.x=a.x-b.x;this.y=a.y-b.y;this.z=a.z-b.z;return this;} length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z);} normalize(){const l=this.length()||1;this.x/=l;this.y/=l;this.z/=l;return this;} multiplyScalar(s){this.x*=s;this.y*=s;this.z*=s;return this;} clone(){return new Vector3(this.x,this.y,this.z);} distanceTo(v){return Math.sqrt((this.x-v.x)**2+(this.y-v.y)**2+(this.z-v.z)**2);} setY(y){this.y=y;return this;} lerpVectors(a,b,t){this.x=a.x+(b.x-a.x)*t;this.y=a.y+(b.y-a.y)*t;this.z=a.z+(b.z-a.z)*t;return this;} }
export class Group { constructor(){this.children=[];this.position=new Vector3();this.rotation={x:0,y:0,z:0};this.visible=true;} add(c){this.children.push(c);return this;} remove(c){const i=this.children.indexOf(c);if(i>=0)this.children.splice(i,1);return this;} traverse(fn){fn(this);this.children.forEach(c=>c&&c.traverse&&c.traverse(fn));} }
export class BoxGeometry { constructor(){} }
export class PlaneGeometry extends BoxGeometry { constructor(){} }
export class MeshLambertMaterial { constructor(o){Object.assign(this,o||{});this.color={setRGB:()=>{},set:()=>{}};} }
export class MeshBasicMaterial extends MeshLambertMaterial { constructor(o){super(o);} }
export class SpriteMaterial extends MeshLambertMaterial { constructor(o){super(o);} }
export class Mesh { constructor(g,m){this.geometry=g;this.material=m;this.position=new Vector3();this.rotation={x:0,y:0,z:0};this.scale=new Vector3(1,1,1);this.visible=true;this.isMesh=true;this.children=[];this.traverse=Group.prototype.traverse;this.add=Group.prototype.add;} }
export class Sprite extends Mesh { constructor(m){super(null,m);} }
export class CanvasTexture { constructor(c){this.image=c;this.needsUpdate=false;this.magFilter=0;this.minFilter=0;this.colorSpace='';this.wrapS=0;this.wrapT=0;} }
export class TextureLoader { load(u,onLoad){const i=new Image();i.onload=()=>onLoad&&onLoad(i);i.src=u;} }
export class Color { constructor(r,g,b){if(typeof r==='string'){this.r=0;this.g=0;this.b=0;}else{this.r=r||0;this.g=g||0;this.b=b||0;}} setRGB(r,g,b){this.r=r;this.g=g;this.b=b;} set(c){} clone(){return new Color(this.r,this.g,this.b);} }
export class Clock { constructor(){this._start=performance.now();} getDelta(){return 0.016;} }
export class Quaternion { constructor(){this.x=0;this.y=0;this.z=0;this.w=1;} setFromEuler(){} }
export class Euler { constructor(x,y,z){this.x=x||0;this.y=y||0;this.z=z||0;} }
export class BufferGeometry { constructor(){} }
export class BufferAttribute { constructor(){} }
export class PointsMaterial extends MeshLambertMaterial { constructor(o){super(o);} }
export class Points extends Mesh { constructor(g,m){super(g,m);} }
export const NearestFilter = 1003;
export const SRGBColorSpace = 'srgb';
export const ClampToEdgeWrapping = 1001;
export const AdditiveBlending = 2;
export const DoubleSide = 2;
export const FrontSide = 0;
`;
writeFileSync(join(STAGE, 'three.js'), threeMock);

// Patch ALL files that import 'three' to use local mock
const files = readdirSync(STAGE).filter(f => f.endsWith('.js'));
for (const f of files) {
  const fp = join(STAGE, f);
  let src = readFileSync(fp, 'utf8');
  if (src.includes("from 'three'") || src.includes('from "three"')) {
    src = src.replace(/import \* as THREE from ['"]three['"];/g, 'import * as THREE from \'./three.js\';');
    src = src.replace(/import \{ ([^}]+) \} from ['"]three['"];/g, 'import { $1 } from \'./three.js\';');
    writeFileSync(fp, src);
  }
}
// Also export Mob class from mobs.js
const mobsFile = join(STAGE, 'mobs.js');
let mobsSrc = readFileSync(mobsFile, 'utf8');
mobsSrc = mobsSrc.replace(/^class Mob \{/m, 'export class Mob {');
writeFileSync(mobsFile, mobsSrc);

// ── Static file server ────────────────────────────────────────────────────
const MIME = { '.js': 'application/javascript', '.html': 'text/html', '.png': 'image/png' };
const srv = createServer((req, res) => {
  let url = decodeURIComponent(req.url.split('?')[0]);
  if (url === '/' || url === '/_gen.html') {
    try { res.writeHead(200, { 'Content-Type': 'text/html' }); res.end(readFileSync(join(ROOT, '_gen.html'))); }
    catch { res.writeHead(404); res.end('missing'); }
    return;
  }
  // Serve from staged src dir
  try {
    const fp = join(STAGE, url.replace(/^\//, ''));
    const data = readFileSync(fp);
    const ext = '.' + fp.split('.').pop();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    res.end(data);
  } catch {
    // Fallback: serve from project root (for textures etc)
    try {
      const fp = join(ROOT, url.replace(/^\//, ''));
      const data = readFileSync(fp);
      const ext = '.' + fp.split('.').pop();
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
      res.end(data);
    } catch { res.writeHead(404); res.end('Not found: ' + url); }
  }
});

function startServer() {
  return new Promise(resolve => srv.listen(0, '127.0.0.1', () => resolve(srv.address().port)));
}

// ── Main ──────────────────────────────────────────────────────────────────
async function main() {
  const port = await startServer();
  console.log('[build-textures] staging server on : ' + port);
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('[browser] ' + msg.type() + ': ' + msg.text()));
  page.on('pageerror', err => console.log('[browser-error] ' + err.message));

  // ── 1. Block atlas ────────────────────────────────────────────────────
  console.log('[build-textures] generating block atlas...');
  writeFileSync(join(ROOT, '_gen.html'), `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head><body>
<script type="module">
import { buildAtlas, TILE } from '/tiles.js';
import { TILES } from '/blocks.js';
const atlas = buildAtlas(1337);
const atlasUrl = atlas.toDataURL('image/png');
const tiles = {};
for (const [name, [tx, ty]] of Object.entries(TILES)) {
  const c = document.createElement('canvas');
  c.width = TILE; c.height = TILE;
  const ctx = c.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(atlas, tx * TILE, ty * TILE, TILE, TILE, 0, 0, TILE, TILE);
  tiles[name] = c.toDataURL('image/png');
}
window.__atlasResult = { atlasUrl, tiles, tileCount: Object.keys(tiles).length };
window.dispatchEvent(new Event('done'));
<\/script></body></html>`);

  await page.goto('http://127.0.0.1:' + port + '/_gen.html', { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__atlasResult, { timeout: 30000 });
  const atlasData = await page.evaluate(() => window.__atlasResult);
  console.log('[build-textures] atlas: ' + atlasData.tileCount + ' tiles');

  mkdirSync(OUT, { recursive: true });
  writeFileSync(join(OUT, 'atlas.png'), Buffer.from(atlasData.atlasUrl.split(',')[1], 'base64'));

  const tilesDir = join(OUT, 'tiles');
  mkdirSync(tilesDir, { recursive: true });
  let n = 0;
  for (const [name, dataUrl] of Object.entries(atlasData.tiles)) {
    writeFileSync(join(tilesDir, name + '.png'), Buffer.from(dataUrl.split(',')[1], 'base64'));
    n++;
  }
  console.log('[build-textures] saved ' + n + ' tile PNGs');

  // ── 2. Mob textures ──────────────────────────────────────────────────
  console.log('[build-textures] generating ALL mob textures...');

  writeFileSync(join(ROOT, '_gen.html'), `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head><body>
<script type="module">
import { MOB_TYPES } from '/mobs.js';
import { Mob } from '/mobs.js';

const types = Object.keys(MOB_TYPES);
const results = {};

for (const typeName of types) {
  const def = MOB_TYPES[typeName];
  if (!def || def.isPlayerSkin) continue;

  const texMethod = '_' + typeName + 'Textures';
  if (typeof Mob.prototype[texMethod] !== 'function') {
    console.warn('[skip] ' + typeName);
    continue;
  }

  try {
    const fakeThis = {
      type: typeName,
      _tex: Mob.prototype._tex,
      _noiseTex: Mob.prototype._noiseTex,
      _fillTex: Mob.prototype._fillTex,
    };

    const textures = Mob.prototype[texMethod].call(fakeThis, def);
    if (!textures) continue;

    const faces = {};
    for (const [partName, arr] of Object.entries(textures)) {
      faces[partName] = [];
      for (let i = 0; i < arr.length; i++) {
        const tex = arr[i];
        if (tex && tex.image && tex.image.toDataURL) {
          faces[partName].push(tex.image.toDataURL('image/png'));
        }
      }
    }
    if (Object.keys(faces).length) results[typeName] = faces;
    console.log('[ok] ' + typeName + ': ' + Object.keys(faces).join(', '));
  } catch (e) {
    console.warn('[fail] ' + typeName + ': ' + e.message);
  }
}

window.__mobResult = results;
window.dispatchEvent(new Event('done'));
<\/script></body></html>`);

  await page.goto('http://127.0.0.1:' + port + '/_gen.html', { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__mobResult, { timeout: 60000 });
  const mobData = await page.evaluate(() => window.__mobResult);

  const mobsDir = join(OUT, 'mobs');
  mkdirSync(mobsDir, { recursive: true });
  let mn = 0;
  for (const [typeName, parts] of Object.entries(mobData)) {
    for (const [partName, faces] of Object.entries(parts)) {
      for (let i = 0; i < faces.length; i++) {
        const b64 = faces[i].split(',')[1];
        writeFileSync(join(mobsDir, typeName + '_' + partName + '_' + i + '.png'), Buffer.from(b64, 'base64'));
        mn++;
      }
    }
  }
  console.log('[build-textures] saved ' + mn + ' mob texture PNGs');

  // ── 3. 3D logo + isometric block icons (real three.js, headless GL) ──
  console.log('[build-textures] rendering 3D logo + isometric block icons...');
  writeFileSync(join(ROOT, '_gen.html'), `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head><body>
<script type="module">
import * as THREE from '/node_modules/three/build/three.module.js';
import { BLOCK, BLOCKS, TILES, tileNameFor } from '/blocks.js';
import { buildAtlas, TILE } from '/tiles.js';

const atlas = buildAtlas(1337);
const tileTex = (name) => {
  const t = TILES[name];
  const c = document.createElement('canvas');
  c.width = TILE; c.height = TILE;
  const ctx = c.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  if (t) ctx.drawImage(atlas, t[0] * TILE, t[1] * TILE, TILE, TILE, 0, 0, TILE, TILE);
  const tex = new THREE.CanvasTexture(c);
  tex.magFilter = THREE.NearestFilter;
  tex.minFilter = THREE.NearestFilter;
  tex.generateMipmaps = false;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
};
const grassMats = ['side', 'side', 'top', 'bottom', 'side', 'side'].map((f, i) => {
  const face = ['side', 'side', 'top', 'bottom', 'side', 'side'][i];
  return new THREE.MeshLambertMaterial({ map: tileTex(tileNameFor(BLOCK.GRASS, face)) });
});

function isoShot(mats, size, cross, plantTex) {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
  renderer.setSize(size, size);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
  cam.position.set(2, 1.8, 2);
  cam.lookAt(0, 0, 0);
  scene.add(new THREE.AmbientLight(0xffffff, 0.75));
  const key = new THREE.DirectionalLight(0xffffff, 1.1);
  key.position.set(2, 4, 3);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x88aaff, 0.35);
  rim.position.set(-3, 1, -2);
  scene.add(rim);
  if (cross) {
    const mat = new THREE.MeshLambertMaterial({ map: plantTex, transparent: true, alphaTest: 0.5, side: THREE.DoubleSide });
    const g = new THREE.Group();
    const p1 = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 1.1), mat);
    p1.rotation.y = Math.PI / 4;
    const p2 = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 1.1), mat);
    p2.rotation.y = -Math.PI / 4;
    g.add(p1); g.add(p2);
    scene.add(g);
  } else {
    scene.add(new THREE.Mesh(new THREE.BoxGeometry(1.15, 1.15, 1.15), mats));
  }
  renderer.render(scene, cam);
  const url = renderer.domElement.toDataURL('image/png');
  renderer.dispose();
  return url;
}

const out = {};
// Hero logo: big grass cube
out.logo1024 = isoShot(grassMats, 1024, false, null);
// Per-block isometric icons (96px)
const ids = [];
for (const [name, id] of Object.entries(BLOCK)) {
  if (typeof id !== 'number' || id <= 0 || id > 255) continue;
  const def = BLOCKS[id];
  if (!def || !def.faces) continue;
  ids.push(id);
}
out.items = {};
for (const id of ids) {
  const def = BLOCKS[id];
  let url;
  if (def.plant) {
    url = isoShot(null, 96, true, tileTex(tileNameFor(id, 'side')));
  } else {
    const mats = ['side', 'side', 'top', 'bottom', 'side', 'side'].map((f, i) => {
      const face = ['side', 'side', 'top', 'bottom', 'side', 'side'][i];
      const tx = tileTex(tileNameFor(id, face));
      return new THREE.MeshLambertMaterial({ map: tx });
    });
    url = isoShot(mats, 96, false, null);
  }
  out.items[id] = url;
}
out.blockCount = ids.length;
window.__isoResult = out;
window.dispatchEvent(new Event('done'));
<\/script></body></html>`);

  await page.goto('http://127.0.0.1:' + port + '/_gen.html', { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__isoResult, { timeout: 120000 });
  const iso = await page.evaluate(() => window.__isoResult);
  console.log('[build-textures] isometric icons for ' + iso.blockCount + ' blocks');

  const b64png = (dataUrl, fp) => writeFileSync(fp, Buffer.from(dataUrl.split(',')[1], 'base64'));
  // Logo masters
  const logoDir = join(OUT, '..', 'logo-tmp');
  mkdirSync(logoDir, { recursive: true });
  b64png(iso.logo1024, join(logoDir, 'logo-1024.png'));

  const itemsDir = join(OUT, 'items3d');
  mkdirSync(itemsDir, { recursive: true });
  let in3 = 0;
  for (const [id, url] of Object.entries(iso.items)) {
    b64png(url, join(itemsDir, id + '.png'));
    in3++;
  }
  console.log('[build-textures] saved ' + in3 + ' isometric item PNGs');

  // ── Cleanup ─────────────────────────────────────────────────────────
  await browser.close();
  srv.close();
  try { unlinkSync(join(ROOT, '_gen.html')); } catch {}
  try { rmSync(STAGE, { recursive: true }); } catch {}
  console.log('[build-textures] done!');
}

main().catch(e => { console.error(e); process.exit(1); });
