import * as THREE from 'three';
import { GRID } from './save.js';
import { makePlate, makeTownHall, makeTower, makeWall, makeMine } from './models.js';

export const TILE = 2;
export const gridToWorld = (gx, gz) => ({ x: (gx - GRID / 2 + 0.5) * TILE, z: (gz - GRID / 2 + 0.5) * TILE });

export class BaseView {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    scene.add(this.group);
    this.group.add(makePlate(GRID));
    this.meshes = new Map(); // id -> group
    this.hl = new THREE.Mesh(
      new THREE.BoxGeometry(TILE * 0.95, 0.15, TILE * 0.95),
      new THREE.MeshBasicMaterial({ color: 0xffd54a, transparent: true, opacity: 0.7 })
    );
    this.hl.visible = false;
    this.group.add(this.hl);
    // mine + well deco (income visual, fixed spots)
    const mine = makeMine(); const p = gridToWorld(2, 2); mine.position.set(p.x, 0.3, p.z); this.group.add(mine);
    const well = makeMine(); well.children[1].material = well.children[1].material.clone();
    const p2 = gridToWorld(GRID - 3, 2); well.position.set(p2.x, 0.3, p2.z); well.scale.setScalar(0.9); this.group.add(well);
    this.mine = mine;
  }
  clear() {
    for (const [, m] of this.meshes) { this.group.remove(m); }
    this.meshes.clear();
    if (this.thMesh) { this.group.remove(this.thMesh); this.thMesh = null; }
  }
  render(state, ghostTowers = []) {
    this.clear();
    // TH (level-scaled cartoon model)
    const tp = gridToWorld(state.th.x, state.th.z);
    this.thMesh = makeTownHall(state.thLevel || 2);
    this.thMesh.position.set(tp.x, 0.3, tp.z);
    this.thMesh.userData.hp = state.th.hp;
    this.group.add(this.thMesh);
    const all = [...state.towers, ...state.walls, ...ghostTowers];
    for (const b of all) {
      const p = gridToWorld(b.x, b.z);
      let m = b.type === 'wall' ? makeWall(b.level) : makeTower(b.type, b.level);
      m.position.set(p.x, 0.3, p.z);
      m.userData.bid = b.id;
      this.group.add(m);
      if (b.id) this.meshes.set(b.id, m);
    }
  }
  highlight(gx, gz) {
    if (gx == null) { this.hl.visible = false; return; }
    const p = gridToWorld(gx, gz);
    this.hl.position.set(p.x, 0.45, p.z);
    this.hl.visible = true;
  }
  pickCell(raycaster, groundY = 0.3) {
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -groundY);
    const pt = new THREE.Vector3();
    if (!raycaster.ray.intersectPlane(plane, pt)) return null;
    const gx = Math.floor(pt.x / TILE + GRID / 2);
    const gz = Math.floor(pt.z / TILE + GRID / 2);
    if (gx < 0 || gz < 0 || gx >= GRID || gz >= GRID) return null;
    return { gx, gz };
  }
}
