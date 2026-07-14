import * as THREE from 'three';
import { TILES, tileNameFor } from './blocks.js';
import { isBlockItem, isTool, itemDef } from './items.js';
import { makeItemIconCanvas } from './ui.js';

const TILE = 32;

export class ViewModel {
  constructor(renderer, atlasCanvas) {
    this.renderer = renderer;
    this.atlasCanvas = atlasCanvas;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.05, 10);

    // Main hand group
    this.hand = new THREE.Group();
    this.camera.add(this.hand);

    // Offhand group (mirrored on the left)
    this.offhandGroup = new THREE.Group();
    this.camera.add(this.offhandGroup);

    this.scene.add(this.camera);

    this.scene.add(new THREE.AmbientLight(0xffffff, 0.85));
    const key = new THREE.DirectionalLight(0xffffff, 0.55);
    key.position.set(0.4, 0.8, 0.6);
    this.camera.add(key);
    const rim = new THREE.DirectionalLight(0xbfd0ff, 0.25);
    rim.position.set(-0.5, -0.2, -0.4);
    this.camera.add(rim);

    this.heldId = null;
    this.heldMesh = null;
    this.offhandId = null;
    this.offhandMesh = null;
    this.visible = true;

    this._swingTime = 0;
    this._swingDur = 0.25;
    this._bobPhase = 0;
    this._lastMove = 0;
    this._clock = 0;
    this._eatPhase = 0;
    this._swim = 0;     // smoothed in-water pose factor (0..1)
    this._fly = 0;      // smoothed flying pose factor (0..1)
    this._landT = 0;    // landing dip impulse (decays)
    this._hurtT = 0;    // hurt flinch impulse (decays)
    this._wasGround = true;

    // Main hand resting pose (right of centre)
    this._restPos = new THREE.Vector3(0.55, -0.42, -1.0);
    this._restRot = new THREE.Euler(-0.05, -0.35, 0.05);

    // Offhand resting pose (left of centre, mirrored + slightly lower)
    this._ohRestPos = new THREE.Vector3(-0.55, -0.38, -1.0);
    this._ohRestRot = new THREE.Euler(-0.05, 0.35, -0.05);

    this._onResize = () => this._resize();
    window.addEventListener('resize', this._onResize);
  }

  _resize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }

  setVisible(v) { this.visible = !!v; }

  setHeld(itemId) {
    if (itemId === this.heldId) return;
    this.heldId = itemId;
    if (this.heldMesh) {
      this.hand.remove(this.heldMesh);
      this._disposeMesh(this.heldMesh);
      this.heldMesh = null;
    }
    if (itemId == null) return;

    if (isBlockItem(itemId)) {
      this.heldMesh = this._buildBlockMesh(itemId);
    } else if (isTool(itemId)) {
      this.heldMesh = this._buildToolMesh(itemId);
    } else {
      this.heldMesh = this._buildItemMesh(itemId);
    }
    if (this.heldMesh) this.hand.add(this.heldMesh);
  }

  setOffhand(itemId) {
    if (itemId === this.offhandId) return;
    this.offhandId = itemId;
    if (this.offhandMesh) {
      this.offhandGroup.remove(this.offhandMesh);
      this._disposeMesh(this.offhandMesh);
      this.offhandMesh = null;
    }
    if (itemId == null) return;

    if (isBlockItem(itemId)) {
      this.offhandMesh = this._buildBlockMesh(itemId);
    } else {
      this.offhandMesh = this._buildItemMesh(itemId);
    }
    if (this.offhandMesh) this.offhandGroup.add(this.offhandMesh);
  }

  _disposeMesh(m) {
    m.traverse?.((o) => {
      if (o.geometry) o.geometry.dispose();
      if (o.material) {
        const mats = Array.isArray(o.material) ? o.material : [o.material];
        for (const mat of mats) {
          if (mat.map) mat.map.dispose();
          mat.dispose();
        }
      }
    });
  }

  // --- builders --------------------------------------------------------------

  _planeFromCanvas(canvas, size = 0.5, transparent = true) {
    const tex = new THREE.CanvasTexture(canvas);
    tex.magFilter = THREE.NearestFilter;
    tex.minFilter = THREE.NearestFilter;
    tex.generateMipmaps = false;
    tex.colorSpace = THREE.SRGBColorSpace;
    const mat = new THREE.MeshBasicMaterial({
      map: tex, transparent, alphaTest: transparent ? 0.5 : 0,
      depthTest: true, depthWrite: !transparent, fog: false, side: THREE.DoubleSide,
    });
    return new THREE.Mesh(new THREE.PlaneGeometry(size, size), mat);
  }

  // Tools / weapons (id >= 512): held at a diagonal with the head up-left
  _buildToolMesh(itemId) {
    const canvas = makeItemIconCanvas(itemId);
    const mesh = this._planeFromCanvas(canvas, 0.66, true);
    const wrap = new THREE.Group();
    wrap.add(mesh);
    // Tool pose: handle in palm, head up-left
    wrap.rotation.set(-1.3, 0.5, 0.15);
    wrap.position.set(0, 0, 0);
    return wrap;
  }

  // Food / materials / other items (id 256-511): held flatter, like a small item
  _buildItemMesh(itemId) {
    const canvas = makeItemIconCanvas(itemId);
    const mesh = this._planeFromCanvas(canvas, 0.5, true);
    const wrap = new THREE.Group();
    wrap.add(mesh);
    // Flat items (food, ingots, etc.): angled slightly toward the player.
    wrap.rotation.set(-0.45, 0.35, 0.15);
    wrap.position.set(0, -0.05, 0);
    return wrap;
  }

  // Block items: a small bevelled cube textured from the atlas.
  _buildBlockMesh(blockId) {
    const sideName = tileNameFor(blockId, 'side');
    const topName = tileNameFor(blockId, 'top');
    const botName = tileNameFor(blockId, 'bottom');
    const sideTex = this._atlasTileTexture(sideName);
    const topTex = this._atlasTileTexture(topName);
    const botTex = this._atlasTileTexture(botName);
    const mk = (t) => new THREE.MeshLambertMaterial({ map: t, fog: false });
    const materials = [mk(sideTex), mk(sideTex), mk(topTex), mk(botTex), mk(sideTex), mk(sideTex)];
    const size = 0.42;
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(size, size, size), materials);
    mesh.rotation.set(-0.18, -0.55, 0.05);
    mesh.position.set(0, 0, 0);
    return mesh;
  }

  _atlasTileTexture(name) {
    const t = TILES[name];
    const c = document.createElement('canvas');
    c.width = TILE; c.height = TILE;
    const ctx = c.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    if (t) {
      ctx.drawImage(this.atlasCanvas, t[0] * TILE, t[1] * TILE, TILE, TILE, 0, 0, TILE, TILE);
    }
    const tex = new THREE.CanvasTexture(c);
    tex.magFilter = THREE.NearestFilter;
    tex.minFilter = THREE.NearestFilter;
    tex.generateMipmaps = false;
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }

  // --- animation -------------------------------------------------------------

  swing() { this._swingTime = this._swingDur; }

  update(dt, swing, moving, eating, crouching = false, state = {}) {
    if (swing) this.swing();
    this._clock += dt;

    const inWater = !!state.inWater;
    const flying = !!state.flying;
    const onGround = state.onGround !== false;
    const vy = state.vy || 0;
    const pitch = state.pitch || 0;            // camera pitch (radians, -up .. +down)
    const hurt = state.hurt ? 1 : 0;
    const mining = state.mining ? 1 : 0;

    // Smooth pose factors for swimming / flying.
    const swimTarget = inWater ? 1 : 0;
    const flyTarget = flying ? 1 : 0;
    this._swim += (swimTarget - this._swim) * Math.min(1, dt * 6);
    this._fly += (flyTarget - this._fly) * Math.min(1, dt * 6);

    // Landing impulse: detect ground transition and briefly dip the arms.
    if (onGround && !this._wasGround) this._landT = 1;
    this._wasGround = onGround;
    this._landT = Math.max(0, this._landT - dt * 4);
    this._hurtT = Math.max(0, this._hurtT - dt * 3);
    if (hurt) this._hurtT = 1;

    const crouchDrop = (crouching ? 0.28 : 0) + this._landT * 0.08;

    const bobTarget = moving ? 1 : 0;
    this._lastMove += (bobTarget - this._lastMove) * Math.min(1, dt * 10);
    // Slow bob while swimming, normal while walking.
    this._bobPhase += dt * (inWater ? 6 : moving ? 10 : 4);

    // Eating timer for hand bob
    if (eating) {
      this._eatPhase = (this._eatPhase || 0) + dt * 8;
    } else {
      this._eatPhase = 0;
    }
    const eatT = eating ? Math.abs(Math.sin(this._eatPhase || 0)) : 0;

    let swingT = 0;
    if (this._swingTime > 0) {
      this._swingTime = Math.max(0, this._swingTime - dt);
      swingT = 1 - this._swingTime / this._swingDur;
    }

    const idle = Math.sin(this._clock * 1.6) * 0.012 * (1 - this._lastMove); // breathing
    const swimPose = this._swim;
    const flyPose = this._fly;
    const lookTilt = pitch * 0.25;        // look up -> arms rise a touch
    const hurtShake = this._hurtT * (Math.random() - 0.5) * 0.06;

    // --- Main hand ---
    let py = this._restPos.y - crouchDrop + idle + lookTilt * 0.15;
    let px = this._restPos.x;
    let rx = this._restRot.x;
    let ry = this._restRot.y;

    const bobAmp = 0.045 * this._lastMove * (1 - swimPose);
    py += Math.sin(this._bobPhase) * bobAmp;
    rx += Math.cos(this._bobPhase) * 0.06 * this._lastMove;
    const sway = Math.sin(this._bobPhase * 0.5) * 0.04 * this._lastMove;

    // Jump: raise arms slightly with upward velocity.
    if (!onGround && vy > 0.5) { py += Math.min(vy, 12) * 0.012; rx -= 0.2; }
    // Landing dip
    if (this._landT > 0) { py -= this._landT * 0.12; }

    if (swingT > 0) {
      const e = swingT;
      const arc = Math.sin(e * Math.PI);
      rx += arc * 1.1;
      py -= arc * 0.18;
      ry += arc * 0.25;
    }

    // Continuous mining "dig" wobble while breaking a block.
    if (mining && swingT === 0) {
      const m = Math.sin(this._clock * 22) * 0.05;
      py += m; rx += m * 0.4;
    }

    // Swim pose: arms forward and a bit higher, gentler motion.
    if (swimPose > 0) {
      py += swimPose * 0.12;
      px += swimPose * 0.05;
      rx -= swimPose * 0.5;
      ry += swimPose * 0.15;
    }
    // Fly pose: arms relax back slightly.
    if (flyPose > 0) {
      rx += flyPose * 0.15;
      px -= flyPose * 0.04;
    }

    // Eating animation: hand bobs up toward center of screen (mouth)
    if (eating && eatT > 0) {
      py += eatT * 0.35;
      px -= eatT * 0.25;
      ry += eatT * 0.4;
      rx -= eatT * 0.3;
    }

    // Hurt flinch shake
    px += hurtShake; py += hurtShake;

    this.hand.position.set(px + sway, py, this._restPos.z);
    this.hand.rotation.set(rx, ry, this._restRot.z);

    // --- Offhand ---
    let ohPy = this._ohRestPos.y - crouchDrop + idle - lookTilt * 0.1;
    let ohRx = this._ohRestRot.x;
    let ohRy = this._ohRestRot.y;

    ohPy += Math.sin(this._bobPhase + Math.PI) * bobAmp * 0.7;
    ohRx += Math.cos(this._bobPhase + Math.PI) * 0.04 * this._lastMove;
    const ohSway = Math.sin(this._bobPhase * 0.5 + Math.PI) * 0.03 * this._lastMove;

    if (!onGround && vy > 0.5) { ohPy += Math.min(vy, 12) * 0.012; ohRx -= 0.2; }
    if (this._landT > 0) { ohPy -= this._landT * 0.12; }
    if (swimPose > 0) { ohPy += swimPose * 0.12; ohRx -= swimPose * 0.5; ohRy -= swimPose * 0.15; }
    if (flyPose > 0) { ohRx += flyPose * 0.15; ohRy += flyPose * 0.04; }
    if (mining && swingT === 0) { const m = Math.sin(this._clock * 22 + 1) * 0.05; ohPy += m; ohRx += m * 0.4; }

    this.offhandGroup.position.set(this._ohRestPos.x + ohSway, ohPy, this._ohRestPos.z);
    this.offhandGroup.rotation.set(ohRx, ohRy, this._ohRestRot.z);
  }

  renderOverlay() {
    if (!this.visible) return;
    this.renderer.clearDepth();
    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    window.removeEventListener('resize', this._onResize);
    if (this.heldMesh) this._disposeMesh(this.heldMesh);
    if (this.offhandMesh) this._disposeMesh(this.offhandMesh);
  }
}
