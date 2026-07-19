// Owns the Three.js meshes for every loaded chunk and rebuilds them when a
// chunk is generated or a block changes. Keeps a coarse distance so neighbours
// of an edited chunk get re-meshed too (border faces may now be exposed).

import * as THREE from 'three';
import { CHUNK_SIZE } from './world.js';
import { buildChunkGeometry } from './mesher.js';
import { BLOCK, BLOCKS } from './blocks.js';

export class ChunkMeshManager {
  constructor(scene, world, atlasTexture) {
    this.scene = scene;
    this.world = world;
    this.atlasTexture = atlasTexture;

    this.opaqueMaterial = new THREE.MeshLambertMaterial({
      map: atlasTexture,
      vertexColors: true,
      alphaTest: 0.1,
      side: THREE.FrontSide,
    });

    this.transMaterial = new THREE.MeshLambertMaterial({
      map: atlasTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      side: THREE.FrontSide,
      polygonOffset: true,
      polygonOffsetFactor: -1,
    });
    // Dedicated water material: no vertex colors, uniform blue
    this.waterMaterial = new THREE.MeshLambertMaterial({
      color: 0x2f62bc,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    this.meshes = new Map(); // "cx,cz" -> { group, opaque, trans }

    // Dirty chunk queue: rebuilds are deferred and processed with a time budget
    this._dirtySet = new Set();
    this._dirtyList = [];
    this.MESH_BUDGET_MS = 12;
  }

  _buildChunk(cx, cz) {
    const chunk = this.world.getChunk(cx, cz);
    if (!chunk || !chunk.generated) return;
    const k = cx + ',' + cz;
    let entry = this.meshes.get(k);
    if (entry) {
      this.scene.remove(entry.group);
      entry.opaque.geometry.dispose();
      if (entry.trans) entry.trans.geometry.dispose();
      if (entry.water) entry.water.geometry.dispose();
    }
    const { opaque, trans, water } = buildChunkGeometry(chunk, this.world);

    const og = new THREE.BufferGeometry();
    og.setAttribute('position', new THREE.BufferAttribute(opaque.position, 3));
    og.setAttribute('uv', new THREE.BufferAttribute(opaque.uv, 2));
    og.setAttribute('color', new THREE.BufferAttribute(opaque.color, 3));
    og.setAttribute('normal', new THREE.BufferAttribute(opaque.normal, 3));
    if (opaque.index) og.setIndex(new THREE.BufferAttribute(opaque.index, 1));

    const opaqueMesh = new THREE.Mesh(og, this.opaqueMaterial);
    opaqueMesh.frustumCulled = true;

    const group = new THREE.Group();
    group.add(opaqueMesh);

    let transMesh = null;
    if (trans.position.length) {
      const tg = new THREE.BufferGeometry();
      tg.setAttribute('position', new THREE.BufferAttribute(trans.position, 3));
      tg.setAttribute('uv', new THREE.BufferAttribute(trans.uv, 2));
      tg.setAttribute('color', new THREE.BufferAttribute(trans.color, 3));
      tg.setAttribute('normal', new THREE.BufferAttribute(trans.normal, 3));
      if (trans.index) tg.setIndex(new THREE.BufferAttribute(trans.index, 1));
      transMesh = new THREE.Mesh(tg, this.transMaterial);
      transMesh.renderOrder = 1;
      group.add(transMesh);
    }

    let waterMesh = null;
    if (water.position.length) {
      const wg = new THREE.BufferGeometry();
      wg.setAttribute('position', new THREE.BufferAttribute(water.position, 3));
      wg.setAttribute('uv', new THREE.BufferAttribute(water.uv, 2));
      wg.setAttribute('color', new THREE.BufferAttribute(water.color, 3));
      wg.setAttribute('normal', new THREE.BufferAttribute(water.normal, 3));
      if (water.index) wg.setIndex(new THREE.BufferAttribute(water.index, 1));
      waterMesh = new THREE.Mesh(wg, this.waterMaterial);
      waterMesh.renderOrder = 2;
      group.add(waterMesh);
    }

    this.scene.add(group);
    this.meshes.set(k, { group, opaque: opaqueMesh, trans: transMesh, water: waterMesh });
  }

  // Immediate build — used by the loader for initial chunk generation only.
  buildOrRefresh(cx, cz) {
    this._buildChunk(cx, cz);
  }

  // Queue a chunk for deferred rebuild (used by block place/break).
  _markDirty(cx, cz) {
    const k = cx + ',' + cz;
    if (this._dirtySet.has(k)) return;
    const chunk = this.world.getChunk(cx, cz);
    if (!chunk || !chunk.generated) return;
    this._dirtySet.add(k);
    this._dirtyList.push({ cx, cz });
  }

  // Queue a chunk and its 4 neighbours for deferred rebuild.
  refreshAround(cx, cz) {
    this._markDirty(cx, cz);
    this._markDirty(cx + 1, cz);
    this._markDirty(cx - 1, cz);
    this._markDirty(cx, cz + 1);
    this._markDirty(cx, cz - 1);
  }

  // Process dirty chunks within a time budget. Call every frame.
  tick() {
    if (!this._dirtyList.length) return;
    const start = performance.now();
    while (this._dirtyList.length && (performance.now() - start) < this.MESH_BUDGET_MS) {
      const { cx, cz } = this._dirtyList.shift();
      const k = cx + ',' + cz;
      this._dirtySet.delete(k);
      this._buildChunk(cx, cz);
    }
  }

  remove(cx, cz) {
    const k = cx + ',' + cz;
    this._dirtySet.delete(k);
    const e = this.meshes.get(k);
    if (e) {
      this.scene.remove(e.group);
      e.opaque.geometry.dispose();
      if (e.trans) { e.trans.geometry.dispose(); }
      if (e.water) { e.water.geometry.dispose(); }
      this.meshes.delete(k);
    }
  }

  clear() {
    this._dirtySet.clear();
    this._dirtyList.length = 0;
    for (const k of this.meshes.keys()) {
      const [cx, cz] = k.split(',').map(Number);
      this.remove(cx, cz);
    }
  }
}
