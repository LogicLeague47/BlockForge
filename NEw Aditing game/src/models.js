// Detailed cartoonish procedural models (CC0-friendly, no voxel, no BlockForge).
// If you want to swap to free CC0 GLBs later (e.g. Quaternius Ultimate Pack - CC0),
// replace these builders with GLTFLoader loads; the game only uses the returned Group.
// CC0 sources to use: https://quaternius.com (CC0), https://kenney.nl/assets (CC0)
import * as THREE from 'three';

function toon(color, opts = {}) {
  return new THREE.MeshToonMaterial({ color, gradientMap: null, ...opts });
}
function lam(color, opts = {}) {
  return new THREE.MeshLambertMaterial({ color, ...opts });
}
function mesh(geo, mat, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  m.castShadow = true; m.receiveShadow = true;
  return m;
}
function eyes(parent, y, spread, s = 0.16) {
  const w = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const b = new THREE.MeshBasicMaterial({ color: 0x1a2333 });
  for (const sx of [-1, 1]) {
    const e = mesh(new THREE.SphereGeometry(s, 12, 10), w, sx * spread, y, 0.32);
    const p = mesh(new THREE.SphereGeometry(s * 0.5, 10, 8), b, sx * spread, y - 0.02, 0.44);
    parent.add(e, p);
  }
}

export function makePlate(grid) {
  const g = new THREE.Group();
  const S = grid * 2;
  const base = mesh(new THREE.BoxGeometry(S + 3, 1.6, S + 3), lam(0x8d6e63), 0, -0.8, 0);
  const grass = mesh(new THREE.BoxGeometry(S, 0.5, S), lam(0x7ed491), 0, 0.05, 0);
  g.add(base, grass);
  // cartoon trim + corner bushes + path
  const trim = mesh(new THREE.BoxGeometry(S + 0.6, 0.3, S + 0.6), lam(0x5dbb72), 0, 0.32, 0);
  trim.scale.set(1, 1, 1); g.add(trim);
  // grid lines (subtle)
  const lineMat = new THREE.MeshBasicMaterial({ color: 0x5aa966, transparent: true, opacity: 0.5 });
  for (let i = 0; i <= grid; i++) {
    const p = -S / 2 + i * 2;
    const v = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.02, S), lineMat);
    v.position.set(p, 0.32, 0); g.add(v);
    const h = new THREE.Mesh(new THREE.BoxGeometry(S, 0.02, 0.06), lineMat);
    h.position.set(0, 0.32, p); g.add(h);
  }
  // corner trees (detailed cartoon: trunk + 3 blobs + apples)
  const treeSpots = [[-S / 2 - 1, -S / 2 - 1], [S / 2 + 1, -S / 2 - 1], [-S / 2 - 1, S / 2 + 1], [S / 2 + 1, S / 2 + 1]];
  for (const [tx, tz] of treeSpots) {
    const t = new THREE.Group();
    t.add(mesh(new THREE.CylinderGeometry(0.35, 0.5, 1.8, 8), lam(0x8d5a3b), 0, 0.9, 0));
    t.add(mesh(new THREE.SphereGeometry(1.2, 12, 10), lam(0x3faf6b), 0, 2.4, 0));
    t.add(mesh(new THREE.SphereGeometry(0.8, 10, 8), lam(0x54cf7e), 0.8, 2.9, 0.3));
    t.add(mesh(new THREE.SphereGeometry(0.35, 8, 6), lam(0xff6b6b), 0.5, 2.4, 0.9));
    t.add(mesh(new THREE.SphereGeometry(0.3, 8, 6), lam(0xff6b6b), -0.6, 2.7, 0.7));
    t.position.set(tx, 0, tz); g.add(t);
  }
  return g;
}

export function makeTownHall(level = 1) {
  const g = new THREE.Group();
  const s = 1 + (level - 1) * 0.08;
  g.add(mesh(new THREE.CylinderGeometry(1.4, 1.7, 1.2, 10), lam(0xf3e5c3), 0, 0.9, 0)); // stone base
  g.add(mesh(new THREE.CylinderGeometry(1.1, 1.3, 1.0, 10), lam(0x87a8d0), 0, 1.9, 0)); // blue mid
  const roof = mesh(new THREE.ConeGeometry(1.7, 1.4, 10), lam(0xff7043), 0, 3.1, 0);
  g.add(roof);
  g.add(mesh(new THREE.SphereGeometry(0.28, 10, 8), lam(0xffd54a), 0, 3.9, 0)); // gold orb
  // door + windows + banner
  g.add(mesh(new THREE.BoxGeometry(0.7, 0.9, 0.15), lam(0x5d4037), 0, 0.75, 1.55));
  g.add(mesh(new THREE.BoxGeometry(0.35, 0.35, 0.1), new THREE.MeshBasicMaterial({ color: 0xfff9c4 }), -0.6, 1.9, 1.25));
  g.add(mesh(new THREE.BoxGeometry(0.35, 0.35, 0.1), new THREE.MeshBasicMaterial({ color: 0xfff9c4 }), 0.6, 1.9, 1.25));
  const pole = mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.6, 6), lam(0x6d4c41), 1.3, 3.4, 0);
  const flag = mesh(new THREE.BoxGeometry(0.8, 0.45, 0.06), lam(0xffd54a), 1.75, 3.9, 0);
  g.add(pole, flag);
  // level stars ring
  for (let i = 0; i < level; i++) {
    const st = mesh(new THREE.OctahedronGeometry(0.18), new THREE.MeshBasicMaterial({ color: 0xffd54a }), -0.8 + i * 0.4, 1.25, 1.45);
    g.add(st);
  }
  eyes(g, 1.9, 0.45, 0.2); // cute face on TH — cartoonish hook
  g.scale.setScalar(s);
  g.userData.flag = flag;
  return g;
}

export function makeTower(type, level = 1) {
  const g = new THREE.Group();
  const boost = (level - 1) * 0.15;
  if (type === 'arrow') {
    g.add(mesh(new THREE.CylinderGeometry(0.9, 1.15, 1.2, 8), lam(0xd7ccc8), 0, 0.6, 0));
    g.add(mesh(new THREE.CylinderGeometry(0.7, 0.85, 0.9, 8), lam(0xa1887f), 0, 1.6, 0));
    g.add(mesh(new THREE.CylinderGeometry(0.85, 0.85, 0.35, 8), lam(0x6d4c41), 0, 2.2, 0));
    const hut = mesh(new THREE.ConeGeometry(1.0, 0.9, 8), lam(0xffd54a), 0, 2.8, 0);
    g.add(hut);
    g.add(mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.1, 6), lam(0x4e342e), 0, 2.5, 0.7));
    const bow = mesh(new THREE.TorusGeometry(0.35, 0.07, 8, 14, Math.PI), lam(0x4e342e), 0, 2.5, 0.9);
    bow.rotation.z = -Math.PI / 2; g.add(bow);
    eyes(g, 1.6, 0.32, 0.13);
  } else if (type === 'cannon') {
    g.add(mesh(new THREE.CylinderGeometry(1.0, 1.3, 1.0, 10), lam(0x90a4ae), 0, 0.5, 0));
    g.add(mesh(new THREE.SphereGeometry(0.85, 12, 10), lam(0x546e7a), 0, 1.4, 0));
    const barrel = mesh(new THREE.CylinderGeometry(0.3, 0.38, 1.4, 10), lam(0x37474f), 0, 1.5, 0.9);
    barrel.rotation.x = Math.PI / 2 - 0.15; g.add(barrel);
    g.add(mesh(new THREE.SphereGeometry(0.2, 8, 6), new THREE.MeshBasicMaterial({ color: 0xff5722 }), 0, 1.5, 1.6));
    g.add(mesh(new THREE.TorusGeometry(0.85, 0.12, 8, 16), lam(0xffb74d), 0, 0.55, 0)).children;
    g.children[g.children.length - 1].rotation.x = Math.PI / 2;
    eyes(g, 1.45, 0.35, 0.14);
  } else { // frost
    g.add(mesh(new THREE.CylinderGeometry(0.8, 1.1, 1.4, 7), lam(0xb0bec5), 0, 0.7, 0));
    const cry = mesh(new THREE.OctahedronGeometry(0.75 + boost * 0.5), new THREE.MeshLambertMaterial({ color: 0x4dd0e1, emissive: 0x00838f, emissiveIntensity: 0.5 }), 0, 2.1, 0);
    cry.name = 'crystal'; g.add(cry);
    g.add(mesh(new THREE.TorusGeometry(0.55, 0.1, 8, 7), lam(0xe1f5fe), 0, 1.45, 0)).children;
    g.children[g.children.length - 1].rotation.x = Math.PI / 2;
    eyes(g, 0.9, 0.3, 0.12);
  }
  // level pips
  for (let i = 0; i < level; i++) {
    g.add(mesh(new THREE.SphereGeometry(0.13, 8, 6), new THREE.MeshBasicMaterial({ color: 0xfff176 }), -0.5 + i * 0.33, 0.35, 1.05));
  }
  g.scale.setScalar(1 + boost);
  return g;
}

export function makeWall(level = 1) {
  const g = new THREE.Group();
  const cols = [0xbdbdbd, 0x90caf9, 0xce93d8, 0xffd54a, 0xff8a65];
  const c = cols[Math.min(level - 1, cols.length - 1)];
  g.add(mesh(new THREE.BoxGeometry(1.9, 1.0 + level * 0.12, 0.7), lam(c), 0, 0.6, 0));
  g.add(mesh(new THREE.BoxGeometry(1.9, 0.25, 0.85), lam(0x6d6d6d), 0, 1.2 + level * 0.1, 0));
  // studs
  for (let i = -1; i <= 1; i++) g.add(mesh(new THREE.BoxGeometry(0.3, 0.3, 0.8), lam(0xeeeeee), i * 0.6, 1.35 + level * 0.1, 0));
  return g;
}

export function makeMine() {
  const g = new THREE.Group();
  g.add(mesh(new THREE.CylinderGeometry(1.0, 1.2, 0.7, 8), lam(0x9e9e9e), 0, 0.35, 0));
  g.add(mesh(new THREE.ConeGeometry(0.9, 0.9, 4), lam(0xffd54a), 0, 1.1, 0));
  g.children[1].rotation.y = Math.PI / 4;
  g.add(mesh(new THREE.SphereGeometry(0.25, 8, 6), lam(0xfff176), 0.5, 0.9, 0.4));
  eyes(g, 0.45, 0.35, 0.13);
  return g;
}

export function makeTroop(type, level = 1) {
  const g = new THREE.Group();
  const s = 0.8 + level * 0.12;
  if (type === 'grunt') {
    g.add(mesh(new THREE.SphereGeometry(0.55, 14, 12), lam(0x9ccc65), 0, 0.7, 0));
    g.add(mesh(new THREE.SphereGeometry(0.4, 10, 8), lam(0x7cb342), 0, 1.15, -0.1));
    g.add(mesh(new THREE.ConeGeometry(0.18, 0.5, 6), lam(0x558b2f), -0.25, 1.55, 0));
    g.add(mesh(new THREE.ConeGeometry(0.18, 0.5, 6), lam(0x558b2f), 0.25, 1.55, 0));
    const club = mesh(new THREE.CylinderGeometry(0.09, 0.12, 0.9, 6), lam(0x8d6e63), 0.6, 0.8, 0.2);
    club.rotation.z = 0.5; g.add(club);
    eyes(g, 0.85, 0.22, 0.14);
  } else if (type === 'archer') {
    g.add(mesh(new THREE.CylinderGeometry(0.4, 0.5, 0.9, 8), lam(0xa5d6a7), 0, 0.65, 0));
    g.add(mesh(new THREE.SphereGeometry(0.38, 12, 10), lam(0xffccbc), 0, 1.35, 0));
    g.add(mesh(new THREE.ConeGeometry(0.35, 0.6, 8), lam(0x66bb6a), 0, 1.75, 0)); // hood
    const bow = mesh(new THREE.TorusGeometry(0.4, 0.06, 8, 14, Math.PI * 1.4), lam(0x5d4037), 0.5, 1.0, 0);
    bow.rotation.z = 0.4; g.add(bow);
    eyes(g, 1.35, 0.16, 0.1);
  } else { // giant
    g.add(mesh(new THREE.SphereGeometry(0.8, 14, 12), lam(0xffb74d), 0, 0.9, 0));
    g.add(mesh(new THREE.SphereGeometry(0.55, 12, 10), lam(0xffe0b2), 0, 1.7, 0.1));
    g.add(mesh(new THREE.BoxGeometry(0.5, 0.4, 0.3), lam(0x8d6e63), -0.9, 1.0, 0));
    g.add(mesh(new THREE.BoxGeometry(0.5, 0.4, 0.3), lam(0x8d6e63), 0.9, 1.0, 0));
    g.add(mesh(new THREE.CylinderGeometry(0.35, 0.45, 0.5, 8), lam(0x6d4c41), 0, 2.15, 0)); // helmet
    eyes(g, 1.7, 0.24, 0.13);
  }
  for (let i = 1; i < level; i++) // shoulder stars
    g.add(mesh(new THREE.OctahedronGeometry(0.14), new THREE.MeshBasicMaterial({ color: 0xffd54a }), 0.55, 0.6 + i * 0.3, 0.3));
  g.scale.setScalar(s);
  return g;
}

export function makeSwarm() { // defend-mode enemy: cute blob monster
  const g = new THREE.Group();
  const c = [0xba68c8, 0x4db6ac, 0xff8a65][Math.floor(Math.random() * 3)];
  g.add(mesh(new THREE.SphereGeometry(0.55, 12, 10), lam(c), 0, 0.65, 0));
  g.add(mesh(new THREE.ConeGeometry(0.2, 0.55, 6), lam(0x37474f), -0.25, 1.2, 0));
  g.add(mesh(new THREE.ConeGeometry(0.2, 0.55, 6), lam(0x37474f), 0.25, 1.2, 0));
  g.add(mesh(new THREE.SphereGeometry(0.18, 8, 6), lam(0x37474f), 0, 0.55, 0.5)); // nose
  const w = new THREE.MeshBasicMaterial({ color: 0xff1744 });
  g.add(mesh(new THREE.SphereGeometry(0.12, 8, 6), w, -0.2, 0.8, 0.42));
  g.add(mesh(new THREE.SphereGeometry(0.12, 8, 6), w, 0.2, 0.8, 0.42));
  return g;
}
