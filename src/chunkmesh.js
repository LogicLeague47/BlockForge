// Owns the Three.js meshes for every loaded chunk and rebuilds them when a
// chunk is generated or a block changes. Keeps a coarse distance so neighbours
// of an edited chunk get re-meshed too (border faces may now be exposed).

import * as THREE from 'three';
import { CHUNK_SIZE } from './world.js';
import { buildChunkGeometry } from './mesher.js';
import { BLOCK, BLOCKS } from './blocks.js';
import { BIOMES } from './constants.js';

const _IS_MOBILE = ('ontouchstart' in window && navigator.maxTouchPoints > 0);
const _LOW_END = _IS_MOBILE || (navigator.deviceMemory || 8) <= 4 || (navigator.hardwareConcurrency || 4) <= 4;

export class ChunkMeshManager {
  constructor(scene, world, atlasTexture, fogColor) {
    this.scene = scene;
    this.world = world;
    this.atlasTexture = atlasTexture;

    // Shared terrain materials. The base game uses plain three.js materials so
    // the renderer's own PCF shadow pipeline drives shadows (reliable, cheap).
    // A "shaders" .bfmod can replace these via setShadingMaterials().
    this.opaqueMaterial = this._makeOpaqueMaterial(atlasTexture);
    this.cutoutMaterial = this._makeCutoutMaterial(atlasTexture);
    this.transMaterial = this._makeTransparentMaterial(atlasTexture);
    this.waterMaterial = this._makeWaterMaterial(0x3377c8, 0.65);
    this.oceanWaterMaterial = this._makeWaterMaterial(0x2a6bc0, 0.6);
    this.riverWaterMaterial = this._makeWaterMaterial(0x3a8ad8, 0.7);

    this.meshes = new Map(); // "cx,cz" -> { group, opaque, cutout, trans }

    // Dirty chunk queue: rebuilds are deferred and processed with a time budget
    this._dirtySet = new Set();
    this._dirtyList = [];
    this._dirtyHead = 0;
    this._retryCount = new Map(); // "cx,cz" -> consecutive failed rebuilds
    this.MESH_BUDGET_MS = _IS_MOBILE ? 4 : (_LOW_END ? 7 : 12);
  }

  // ── Base-game materials (plain three.js, native PCF shadows) ──────────────
  _makeOpaqueMaterial(atlasTexture) {
    return new THREE.MeshLambertMaterial({
      map: atlasTexture,
      vertexColors: true,
      side: THREE.FrontSide,
    });
  }

  _makeCutoutMaterial(atlasTexture) {
    return new THREE.MeshLambertMaterial({
      map: atlasTexture,
      vertexColors: true,
      alphaTest: 0.1,
      side: THREE.DoubleSide,
    });
  }

  _makeTransparentMaterial(atlasTexture) {
    return new THREE.MeshLambertMaterial({
      map: atlasTexture,
      vertexColors: true,
      transparent: true,
      alphaTest: 0.1,
      depthWrite: false,
      side: THREE.DoubleSide,
      polygonOffset: true,
      polygonOffsetFactor: -1,
    });
  }

  _makeWaterMaterial(color, opacity) {
    return new THREE.MeshLambertMaterial({
      color,
      transparent: true,
      opacity,
      side: THREE.FrontSide,
      depthWrite: false,
    });
  }

  // Called by the "shaders" mod to install custom materials. Existing meshes
  // share the manager's material instances, so we just swap the references.
  setShadingMaterials(mats) {
    if (mats.opaque) this.opaqueMaterial = mats.opaque;
    if (mats.cutout) this.cutoutMaterial = mats.cutout;
    if (mats.trans) this.transMaterial = mats.trans;
    if (mats.water) this.waterMaterial = mats.water;
    if (mats.oceanWater) this.oceanWaterMaterial = mats.oceanWater;
    if (mats.riverWater) this.riverWaterMaterial = mats.riverWater;
    for (const entry of this.meshes.values()) {
      if (entry.opaque) entry.opaque.material = this.opaqueMaterial;
      if (entry.cutout) entry.cutout.material = this.cutoutMaterial;
      if (entry.trans) entry.trans.material = this.transMaterial;
      if (entry.water) {
        const key = entry.water.userData.matKey;
        entry.water.material = key === 'ocean' ? this.oceanWaterMaterial : key === 'river' ? this.riverWaterMaterial : this.waterMaterial;
      }
    }
  }

  // Called by the "shaders" mod on unload to restore the plain base materials.
  restoreShading() {
    this.setShadingMaterials({
      opaque: this._makeOpaqueMaterial(this.atlasTexture),
      cutout: this._makeCutoutMaterial(this.atlasTexture),
      trans: this._makeTransparentMaterial(this.atlasTexture),
      water: this._makeWaterMaterial(0x3377c8, 0.65),
      oceanWater: this._makeWaterMaterial(0x2a6bc0, 0.6),
      riverWater: this._makeWaterMaterial(0x3a8ad8, 0.7),
    });
  }

  _buildChunk(cx, cz) {
    const chunk = this.world.getChunk(cx, cz);
    if (!chunk || !chunk.generated || !chunk._dirty) return;
    const k = cx + ',' + cz;
    let entry = this.meshes.get(k);
    if (entry) {
      this.scene.remove(entry.group);
      entry.opaque.geometry.dispose();
      if (entry.cutout) entry.cutout.geometry.dispose();
      if (entry.trans) entry.trans.geometry.dispose();
      if (entry.water) entry.water.geometry.dispose();
    }
    const { opaque, cutout, trans, water } = buildChunkGeometry(chunk, this.world);

    const og = new THREE.BufferGeometry();
    og.setAttribute('position', new THREE.BufferAttribute(opaque.position, 3));
    og.setAttribute('uv', new THREE.BufferAttribute(opaque.uv, 2));
    og.setAttribute('color', new THREE.BufferAttribute(opaque.color, 3));
    og.setAttribute('normal', new THREE.BufferAttribute(opaque.normal, 3));
    if (opaque.index) og.setIndex(new THREE.BufferAttribute(opaque.index, 1));

    const opaqueMesh = new THREE.Mesh(og, this.opaqueMaterial);
    opaqueMesh.frustumCulled = true;
    opaqueMesh.matrixAutoUpdate = false;
    opaqueMesh.updateMatrix();
    opaqueMesh.castShadow = true;
    opaqueMesh.receiveShadow = true;

    const group = new THREE.Group();
    group.matrixAutoUpdate = false;
    group.updateMatrix();
    group.add(opaqueMesh);

    let cutoutMesh = null;
    if (cutout.position.length) {
      const cg = new THREE.BufferGeometry();
      cg.setAttribute('position', new THREE.BufferAttribute(cutout.position, 3));
      cg.setAttribute('uv', new THREE.BufferAttribute(cutout.uv, 2));
      cg.setAttribute('color', new THREE.BufferAttribute(cutout.color, 3));
      cg.setAttribute('normal', new THREE.BufferAttribute(cutout.normal, 3));
      if (cutout.index) cg.setIndex(new THREE.BufferAttribute(cutout.index, 1));
      cutoutMesh = new THREE.Mesh(cg, this.cutoutMaterial);
      cutoutMesh.frustumCulled = true;
      cutoutMesh.matrixAutoUpdate = false;
      cutoutMesh.updateMatrix();
      cutoutMesh.castShadow = true;
      cutoutMesh.receiveShadow = true;
      group.add(cutoutMesh);
    }

    let transMesh = null;
    if (trans.position.length) {
      const tg = new THREE.BufferGeometry();
      tg.setAttribute('position', new THREE.BufferAttribute(trans.position, 3));
      tg.setAttribute('uv', new THREE.BufferAttribute(trans.uv, 2));
      tg.setAttribute('color', new THREE.BufferAttribute(trans.color, 3));
      tg.setAttribute('normal', new THREE.BufferAttribute(trans.normal, 3));
      if (trans.index) tg.setIndex(new THREE.BufferAttribute(trans.index, 1));
      transMesh = new THREE.Mesh(tg, this.transMaterial);
      transMesh.frustumCulled = true;
      transMesh.matrixAutoUpdate = false;
      transMesh.updateMatrix();
      transMesh.renderOrder = 1;
      transMesh.castShadow = true;
      transMesh.receiveShadow = true;
      group.add(transMesh);
    }

    let waterMesh = null;
    if (water.position.length) {
      // Determine water material from chunk biome
      let key = 'water';
      let wMat = this.waterMaterial;
      if (chunk._dominantBiome === 'ocean') { key = 'ocean'; wMat = this.oceanWaterMaterial; }
      else if (chunk._dominantBiome === 'river') { key = 'river'; wMat = this.riverWaterMaterial; }
      const wg = new THREE.BufferGeometry();
      wg.setAttribute('position', new THREE.BufferAttribute(water.position, 3));
      wg.setAttribute('uv', new THREE.BufferAttribute(water.uv, 2));
      wg.setAttribute('color', new THREE.BufferAttribute(water.color, 3));
      wg.setAttribute('normal', new THREE.BufferAttribute(water.normal, 3));
      if (water.index) wg.setIndex(new THREE.BufferAttribute(water.index, 1));
      waterMesh = new THREE.Mesh(wg, wMat);
      waterMesh.frustumCulled = true;
      waterMesh.matrixAutoUpdate = false;
      waterMesh.updateMatrix();
      waterMesh.userData.matKey = key;
      waterMesh.renderOrder = 2;
      group.add(waterMesh);
    }

    this.scene.add(group);
    this.meshes.set(k, { group, opaque: opaqueMesh, cutout: cutoutMesh, trans: transMesh, water: waterMesh });
    chunk._dirty = false;
  }

  // Immediate build — used by the loader for initial chunk generation only.
  buildOrRefresh(cx, cz) {
    const chunk = this.world.getChunk(cx, cz);
    if (chunk) chunk._dirty = true;
    this._buildChunk(cx, cz);
  }

  // Queue a chunk for deferred rebuild (e.g. when a block changes).
  _markDirty(cx, cz) {
    const k = cx + ',' + cz;
    if (this._dirtySet.has(k)) return;
    const chunk = this.world.getChunk(cx, cz);
    if (!chunk || !chunk.generated) return;
    chunk._dirty = true;
    this._dirtySet.add(k);
    this._dirtyList.push({ cx, cz });
  }

  // Public wrapper for _markDirty
  markDirty(cx, cz) {
    this._markDirty(cx, cz);
  }

  // Queue a chunk and its 4 neighbours for deferred rebuild.
  refreshAround(cx, cz) {
    this._markDirty(cx, cz);
    for (const [dx, dz] of [[1,0],[-1,0],[0,1],[0,-1]]) {
      this._markDirty(cx + dx, cz + dz);
    }
  }

  // Process deferred rebuilds (called each frame with a time budget).
  update() {
    const t0 = performance.now();
    const list = this._dirtyList;
    while (this._dirtyHead < list.length && performance.now() - t0 < this.MESH_BUDGET_MS) {
      const idx = this._dirtyHead++;
      const { cx, cz } = list[idx];
      list[idx] = null;
      this._dirtySet.delete(cx + ',' + cz);
      try {
        this._buildChunk(cx, cz);
      } catch (e) {
        // A chunk whose mesh build failed must NOT be silently dropped — that
        // leaves a permanent ghost/invisible block until the chunk re-streams.
        // Re-queue it for a later frame (bounded so a genuinely broken chunk
        // can't spin the queue forever).
        console.error('Chunk mesh build failed (' + cx + ',' + cz + '), will retry:', e);
        const retries = this._retryCount.get(cx + ',' + cz) || 0;
        if (retries < 10) {
          this._retryCount.set(cx + ',' + cz, retries + 1);
          this._dirtySet.add(cx + ',' + cz);
          this._dirtyList.push({ cx, cz });
        } else {
          this._retryCount.delete(cx + ',' + cz);
        }
      }
    }
    if (this._dirtyHead >= list.length) {
      this._dirtyList.length = 0;
      this._dirtyHead = 0;
    }
  }

  // Remove a chunk from the scene.
  remove(cx, cz) {
    const k = cx + ',' + cz;
    const entry = this.meshes.get(k);
    if (!entry) return;
    this.scene.remove(entry.group);
    entry.opaque.geometry.dispose();
    if (entry.cutout) entry.cutout.geometry.dispose();
    if (entry.trans) entry.trans.geometry.dispose();
    if (entry.water) entry.water.geometry.dispose();
    this.meshes.delete(k);
  }

  clear() {
    for (const [k, entry] of this.meshes) {
      this.scene.remove(entry.group);
      entry.opaque.geometry.dispose();
      if (entry.cutout) entry.cutout.geometry.dispose();
      if (entry.trans) entry.trans.geometry.dispose();
      if (entry.water) entry.water.geometry.dispose();
    }
    this.meshes.clear();
    this._dirtySet.clear();
    this._dirtyList.length = 0;
    this._dirtyHead = 0;
  }
}
