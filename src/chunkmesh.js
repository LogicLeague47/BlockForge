// Owns the Three.js meshes for every loaded chunk and rebuilds them when a
// chunk is generated or a block changes. Keeps a coarse distance so neighbours
// of an edited chunk get re-meshed too (border faces may now be exposed).

import * as THREE from 'three';
import { CHUNK_SIZE } from './world.js';
import { buildChunkGeometry } from './mesher.js';
import { BLOCK, BLOCKS } from './blocks.js';
import { createOpaqueMaterial, createCutoutMaterial, createTransparentMaterial, createWaterMaterial, createOceanWaterMaterial, createRiverWaterMaterial } from './shaders.js';
import { BIOMES } from './constants.js';

export class ChunkMeshManager {
  constructor(scene, world, atlasTexture, fogColor) {
    this.scene = scene;
    this.world = world;
    this.atlasTexture = atlasTexture;

    // Shared custom shader materials for all chunks
    this.opaqueMaterial = createOpaqueMaterial(atlasTexture);
    this.cutoutMaterial = createCutoutMaterial(atlasTexture);
    this.transMaterial = createTransparentMaterial(atlasTexture);
    this.waterMaterial = createWaterMaterial(fogColor || new THREE.Color(0x9ad0ff));
    this.oceanWaterMaterial = createOceanWaterMaterial(fogColor || new THREE.Color(0x9ad0ff));
    this.riverWaterMaterial = createRiverWaterMaterial(fogColor || new THREE.Color(0x9ad0ff));

    this.meshes = new Map(); // "cx,cz" -> { group, opaque, cutout, trans }

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
    opaqueMesh.castShadow = true;
    opaqueMesh.receiveShadow = true;

    const group = new THREE.Group();
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
      transMesh.renderOrder = 1;
      transMesh.castShadow = true;
      transMesh.receiveShadow = true;
      group.add(transMesh);
    }

    let waterMesh = null;
    if (water.position.length) {
      // Determine water material from chunk biome
      let wMat = this.waterMaterial;
      if (chunk._dominantBiome === 'ocean') wMat = this.oceanWaterMaterial;
      else if (chunk._dominantBiome === 'river') wMat = this.riverWaterMaterial;
      const wg = new THREE.BufferGeometry();
      wg.setAttribute('position', new THREE.BufferAttribute(water.position, 3));
      wg.setAttribute('uv', new THREE.BufferAttribute(water.uv, 2));
      wg.setAttribute('color', new THREE.BufferAttribute(water.color, 3));
      wg.setAttribute('normal', new THREE.BufferAttribute(water.normal, 3));
      if (water.index) wg.setIndex(new THREE.BufferAttribute(water.index, 1));
      waterMesh = new THREE.Mesh(wg, wMat);
      waterMesh.renderOrder = 2;
      group.add(waterMesh);
    }

    this.scene.add(group);
    this.meshes.set(k, { group, opaque: opaqueMesh, cutout: cutoutMesh, trans: transMesh, water: waterMesh });
  }

  // Immediate build — used by the loader for initial chunk generation only.
  buildOrRefresh(cx, cz) {
    this._buildChunk(cx, cz);
  }

  // Queue a chunk for deferred rebuild (e.g. when a block changes).
  _markDirty(cx, cz) {
    const k = cx + ',' + cz;
    if (this._dirtySet.has(k)) return;
    const chunk = this.world.getChunk(cx, cz);
    if (!chunk || !chunk.generated) return;
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
    while (this._dirtyList.length && performance.now() - t0 < this.MESH_BUDGET_MS) {
      const { cx, cz } = this._dirtyList.shift();
      this._dirtySet.delete(cx + ',' + cz);
      this._buildChunk(cx, cz);
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
  }
}
