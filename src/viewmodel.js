import * as THREE from 'three';
import { TILES, tileNameFor, BLOCKS } from './blocks.js';
import { isBlockItem, isTool, itemDef } from './items.js';
import { makeItemIconCanvas, TOOL_PALETTES } from './ui.js';
import { ViewAnimData, lerp, Easing } from './animations.js';

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

    // Build the visible arm mesh (blocky BlockForge-style forearm + hand)
    this._buildArmMesh();

    // Offhand group (mirrored on the left)
    this.offhandGroup = new THREE.Group();
    this.camera.add(this.offhandGroup);
    this._buildOffhandArmMesh();

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

    this.animData = new ViewAnimData();

    // Main hand resting pose (right of centre)
    this._restPos = new THREE.Vector3(0.6, -0.3, -0.7);
    this._restRot = new THREE.Euler(-0.1, -0.3, 0.0);

    // Offhand resting pose (left of centre, mirrored + slightly lower)
    this._ohRestPos = new THREE.Vector3(-0.6, -0.26, -0.7);
    this._ohRestRot = new THREE.Euler(-0.1, 0.3, 0.0);

    this._onResize = () => this._resize();
    window.addEventListener('resize', this._onResize);
  }

  _buildArmMesh(skinColor = 0xc0906a, skinDark = 0xa87850) {
    const mat = new THREE.MeshLambertMaterial({ color: skinColor, fog: false });
    const matDark = new THREE.MeshLambertMaterial({ color: skinDark, fog: false });

    this._armGroup = new THREE.Group();

    // Single forearm box: 4×12×4 pixels (BlockForge standard arm)
    const arm = new THREE.Mesh(
      new THREE.BoxGeometry(4 / 16, 12 / 16, 4 / 16),
      [matDark, mat, mat, mat, mat, matDark]
    );
    arm.position.y = -6 / 16;
    this._armGroup.add(arm);

    this.hand.add(this._armGroup);
  }

  _buildOffhandArmMesh(skinColor = 0xc0906a, skinDark = 0xa87850) {
    const mat = new THREE.MeshLambertMaterial({ color: skinColor, fog: false });
    const matDark = new THREE.MeshLambertMaterial({ color: skinDark, fog: false });

    this._ohArmGroup = new THREE.Group();

    const arm = new THREE.Mesh(
      new THREE.BoxGeometry(4 / 16, 12 / 16, 4 / 16),
      [matDark, mat, mat, mat, mat, matDark]
    );
    arm.position.y = -6 / 16;
    this._ohArmGroup.add(arm);

    this.offhandGroup.add(this._ohArmGroup);
  }

  _resize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }

  setVisible(v) { this.visible = !!v; }

  setSkinColor(skinColor, skinDark) {
    const c = parseInt(skinColor?.replace('#', ''), 16) || 0xc0906a;
    const d = parseInt(skinDark?.replace('#', ''), 16) || 0xa87850;
    if (this._armGroup) {
      this.hand.remove(this._armGroup);
      this._disposeMesh(this._armGroup);
    }
    if (this._ohArmGroup) {
      this.offhandGroup.remove(this._ohArmGroup);
      this._disposeMesh(this._ohArmGroup);
    }
    this._buildArmMesh(c, d);
    this._buildOffhandArmMesh(c, d);
    if (this.heldMesh) {
      this.hand.add(this.heldMesh);
    }
    if (this.offhandMesh) {
      this.offhandGroup.add(this.offhandMesh);
    }
  }

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
      const def = BLOCKS[itemId];
      if (def && def.plant) {
        this.heldMesh = this._buildPlantMesh(itemId);
      } else {
        this.heldMesh = this._buildBlockMesh(itemId);
      }
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
      const def = BLOCKS[itemId];
      if (def && def.plant) {
        this.offhandMesh = this._buildPlantMesh(itemId);
      } else {
        this.offhandMesh = this._buildBlockMesh(itemId);
      }
    } else if (isTool(itemId)) {
      this.offhandMesh = this._buildToolMesh(itemId);
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
      depthTest: true, depthWrite: false, fog: false, side: THREE.DoubleSide,
    });
    return new THREE.Mesh(new THREE.PlaneGeometry(size, size), mat);
  }

  // Minecraft-style held pose: big, diagonal across the view, blade up-right.
  _mcPose(wrap, s = 1.25) {
    wrap.rotation.set(-0.3, -0.75, -0.5);
    wrap.scale.setScalar(s);
    wrap.position.set(0.05, -0.04, 0.02);
    return wrap;
  }

  // Extruded 2D sprite (Minecraft item-model look): icon texture on the two
  // broad faces, dark edge material on the thin sides.
  _extrudedSprite(itemId, w = 0.5, h = 0.5, depth = 0.07) {
    const canvas = makeItemIconCanvas(itemId);
    const tex = new THREE.CanvasTexture(canvas);
    tex.magFilter = THREE.NearestFilter;
    tex.minFilter = THREE.NearestFilter;
    tex.generateMipmaps = false;
    tex.colorSpace = THREE.SRGBColorSpace;
    const face = new THREE.MeshBasicMaterial({ map: tex, transparent: true, alphaTest: 0.5, fog: false });
    const edge = new THREE.MeshLambertMaterial({ color: 0x241c12, fog: false });
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(w, h, depth),
      [edge, edge, edge, edge, face, face]
    );
    const wrap = new THREE.Group();
    wrap.add(mesh);
    return this._mcPose(wrap, 1.15);
  }

  // Tools / weapons (id >= 512): proper 3D shape with head + handle
  _buildToolMesh(itemId) {
    const def = itemDef(itemId);
    if (!def?.tool) return this._buildItemMesh(itemId);
    const p = TOOL_PALETTES[def.tool.woodType || def.tool.material] || TOOL_PALETTES.IRON;
    const wrap = new THREE.Group();

    const mkMat = (color) => new THREE.MeshLambertMaterial({ color, fog: false });
    const headMat = mkMat(p.head);
    const darkMat = mkMat(p.dark);
    const midMat = mkMat(p.mid);
    const litMat = mkMat(p.lit);
    const stickMat = mkMat('#6e5230');
    const stickLit = mkMat('#8a6a3c');

    const type = def.tool.type;

    if (type === 'sword') {
      // Blade: tall thin box
      const blade = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.56, 0.02), [litMat, midMat, headMat, headMat, litMat, midMat]);
      blade.position.y = 0.36;
      wrap.add(blade);
      // Crossguard: wide flat box (top meets blade bottom at y=0.08)
      const guard = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.03, 0.05), mkMat('#8a6a3c'));
      guard.position.y = 0.065;
      wrap.add(guard);
      // Handle (top meets guard bottom at y=0.05)
      const handle = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.13, 0.045), [stickMat, stickLit, stickMat, stickMat, stickLit, stickMat]);
      handle.position.y = -0.015;
      wrap.add(handle);
      // Pommel (top meets handle bottom at y=-0.08)
      const pommel = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.03, 0.05), darkMat);
      pommel.position.y = -0.095;
      wrap.add(pommel);
      return this._mcPose(wrap);

    } else if (type === 'pickaxe') {
      // Handle
      const handle = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.48, 0.045), [stickMat, stickLit, stickMat, stickMat, stickLit, stickMat]);
      handle.position.y = -0.10;
      wrap.add(handle);
      // Head: horizontal bar
      const headBar = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.07, 0.045), [headMat, darkMat, litMat, midMat, headMat, headMat]);
      headBar.position.y = 0.19;
      wrap.add(headBar);
      // Left prong
      const lProng = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.09, 0.045), darkMat);
      lProng.position.set(-0.20, 0.13, 0);
      wrap.add(lProng);
      // Right prong
      const rProng = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.09, 0.045), darkMat);
      rProng.position.set(0.20, 0.13, 0);
      wrap.add(rProng);
      // Binding
      const binding = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.03, 0.05), darkMat);
      binding.position.y = 0.14;
      wrap.add(binding);
      return this._mcPose(wrap);

    } else if (type === 'axe') {
      // Handle
      const handle = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.50, 0.045), [stickMat, stickLit, stickMat, stickMat, stickLit, stickMat]);
      handle.position.y = -0.10;
      wrap.add(handle);
      // Axe head: thick chunk on the left
      const axeHead = new THREE.Mesh(new THREE.BoxGeometry(0.19, 0.23, 0.045), [litMat, darkMat, headMat, midMat, headMat, headMat]);
      axeHead.position.set(-0.04, 0.23, 0);
      wrap.add(axeHead);
      // Sharp edge (front face of axe, slightly lighter)
      const edge = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.17, 0.05), litMat);
      edge.position.set(-0.13, 0.24, 0);
      wrap.add(edge);
      // Binding
      const binding = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.025, 0.05), darkMat);
      binding.position.y = 0.09;
      wrap.add(binding);
      return this._mcPose(wrap);

    } else if (type === 'shovel') {
      // Handle
      const handle = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.48, 0.045), [stickMat, stickLit, stickMat, stickMat, stickLit, stickMat]);
      handle.position.y = -0.08;
      wrap.add(handle);
      // Shovel head: wider flat box at top
      const shovelHead = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.15, 0.03), [midMat, darkMat, headMat, litMat, headMat, headMat]);
      shovelHead.position.y = 0.24;
      wrap.add(shovelHead);
      // Socket
      const socket = new THREE.Mesh(new THREE.BoxGeometry(0.065, 0.03, 0.045), midMat);
      socket.position.y = 0.15;
      wrap.add(socket);
      return this._mcPose(wrap);

    } else if (type === 'hoe') {
      // Handle
      const handle = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.50, 0.045), [stickMat, stickLit, stickMat, stickMat, stickLit, stickMat]);
      handle.position.y = -0.10;
      wrap.add(handle);
      // Hoe blade: horizontal plate jutting left at the top
      const blade = new THREE.Mesh(new THREE.BoxGeometry(0.20, 0.06, 0.045), [headMat, darkMat, litMat, midMat, headMat, headMat]);
      blade.position.set(-0.09, 0.19, 0);
      wrap.add(blade);
      // Socket
      const socket = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.05, 0.05), midMat);
      socket.position.set(0.0, 0.16, 0);
      wrap.add(socket);
      return this._mcPose(wrap);

    } else if (type === 'trident') {
      // Shaft
      const shaft = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.56, 0.04), [stickMat, stickLit, stickMat, stickMat, stickLit, stickMat]);
      shaft.position.y = -0.08;
      wrap.add(shaft);
      // Crossbar
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.035, 0.04), midMat);
      bar.position.y = 0.20;
      wrap.add(bar);
      // Three prongs
      for (const px of [-0.09, 0, 0.09]) {
        const prong = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.22, 0.035), [litMat, midMat, headMat, headMat, litMat, midMat]);
        prong.position.set(px, 0.30, 0);
        wrap.add(prong);
        const tip = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.05, 0.035), litMat);
        tip.position.set(px, 0.43, 0);
        wrap.add(tip);
      }
      return this._mcPose(wrap);

    } else {
      // Anything else with a tool record: extruded sprite in MC pose.
      return this._extrudedSprite(itemId, 0.55, 0.55);
    }
  }

  // Food / materials / other items: extruded sprite, Minecraft held-item look.
  _buildItemMesh(itemId) {
    return this._extrudedSprite(itemId, 0.45, 0.45);
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

  _buildPlantMesh(blockId) {
    const sideName = tileNameFor(blockId, 'side');
    const tex = this._atlasTileTexture(sideName);
    const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, alphaTest: 0.5, depthWrite: false, side: THREE.DoubleSide, fog: false });
    const wrap = new THREE.Group();
    const size = 0.5;
    const plane1 = new THREE.Mesh(new THREE.PlaneGeometry(size, size), mat);
    plane1.rotation.y = Math.PI / 4;
    wrap.add(plane1);
    const plane2 = new THREE.Mesh(new THREE.PlaneGeometry(size, size), mat);
    plane2.rotation.y = -Math.PI / 4;
    wrap.add(plane2);
    wrap.rotation.set(-0.18, -0.55, 0.05);
    return wrap;
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

  swing() { this.animData.swing(); }

  update(dt, swing, moving, eating, crouching = false, state = {}) {
    if (swing) this.swing();
    
    // Update animation state
    this.animData.moving = moving;
    this.animData.sprinting = !!state.sprinting;
    this.animData.inWater = !!state.inWater;
    this.animData.flying = !!state.flying;
    this.animData.onGround = state.onGround !== false;
    this.animData.eating = eating;
    this.animData.mining = !!state.mining;
    this.animData.crouching = crouching;
    this.animData.pitch = state.pitch || 0;
    this.animData.vy = state.vy || 0;
    this.animData.hurt = !!state.hurt;

    // Update animation timers
    this.animData.update(dt);

    const crouchDrop = (crouching ? 0.18 : 0) + this.animData.landT * 0.08;
    const crouchForward = crouching ? 0.06 : 0;
    const swimPose = this.animData.swim;
    const flyPose = this.animData.fly;
    const lookTilt = this.animData.pitch * 0.25;
    const hurtShake = this.animData.hurtT * (Math.random() - 0.5) * 0.06;
    const idle = Math.sin(this.animData.clock * 1.6) * 0.012 * (1 - this.animData.lastMove);
    
    // Main hand
    let py = this._restPos.y - crouchDrop + idle + lookTilt * 0.15;
    let px = this._restPos.x - crouchForward;
    let rx = this._restRot.x;
    let ry = this._restRot.y;

    const sprintBoost = this.animData.sprinting ? 1 : 0;
    const bobAmp = 0.045 * (1 + 0.7 * sprintBoost) * this.animData.lastMove * (1 - swimPose);
    py += Math.sin(this.animData.bobPhase) * bobAmp;
    rx += Math.cos(this.animData.bobPhase) * (0.06 + 0.04 * sprintBoost) * this.animData.lastMove;
    const sway = Math.sin(this.animData.bobPhase * 0.5) * 0.04 * this.animData.lastMove;

    // Jump: raise arms slightly with upward velocity
    if (!this.animData.onGround && this.animData.vy > 0.5) {
      py += Math.min(this.animData.vy, 12) * 0.012;
      rx -= 0.2;
    }
    // Landing dip
    if (this.animData.landT > 0) { py -= this.animData.landT * 0.12; }

    // Swing animation — arm chops downward and forward
    const swingT = this.animData.swingProgress;
    if (swingT > 0) {
      const e = swingT;
      const arc = Math.sin(e * Math.PI);
      rx -= arc * 1.1;
      py -= arc * 0.15;
      ry += arc * 0.3;
    }

    // Continuous mining "dig" wobble while breaking a block
    if (this.animData.mining && swingT === 0) {
      const m = Math.sin(this.animData.clock * 22) * 0.05;
      py += m; rx -= m * 0.4;
    }

    // Swim pose: forward crawl — arms extend forward alternately
    if (swimPose > 0) {
      const bp = this.animData.bobPhase * 0.6;
      py += swimPose * 0.08;
      px += swimPose * 0.08 + Math.sin(bp) * swimPose * 0.04;
      rx -= swimPose * 0.6 + Math.cos(bp) * swimPose * 0.25;
      ry += Math.sin(bp) * swimPose * 0.15;
    }
    // Fly pose: arms relax back slightly
    if (flyPose > 0) {
      rx += flyPose * 0.15;
      px -= flyPose * 0.04;
    }

    // Eating animation: hand rises to center of screen (mouth) and bobs
    if (eating && this.animData.eatBob > 0) {
      const bob = this.animData.eatBob;
      py += bob * 0.45;
      px -= bob * 0.35;
      ry += bob * 0.5;
      rx -= bob * 0.4;
      // Small rapid bob for the crunching motion
      const crunch = Math.sin(this.animData.eatPhase * 3) * 0.04;
      py += crunch;
    }

    // Hurt flinch shake
    px += hurtShake; py += hurtShake;

    this.hand.position.set(px + sway, py, this._restPos.z);
    this.hand.rotation.set(rx, ry, this._restRot.z);

    // --- Offhand ---
    let ohPy = this._ohRestPos.y - crouchDrop + idle - lookTilt * 0.1;
    let ohRx = this._ohRestRot.x;
    let ohRy = this._ohRestRot.y;

    ohPy += Math.sin(this.animData.bobPhase + Math.PI) * bobAmp * 0.7;
    ohRx += Math.cos(this.animData.bobPhase + Math.PI) * 0.04 * this.animData.lastMove;
    const ohSway = Math.sin(this.animData.bobPhase * 0.5 + Math.PI) * 0.03 * this.animData.lastMove;

    if (!this.animData.onGround && this.animData.vy > 0.5) { ohPy += Math.min(this.animData.vy, 12) * 0.012; ohRx -= 0.2; }
    if (this.animData.landT > 0) { ohPy -= this.animData.landT * 0.12; }
    if (swimPose > 0) {
      const bp = this.animData.bobPhase * 0.5;
      ohPy += swimPose * 0.12 + Math.abs(Math.cos(bp)) * swimPose * 0.04;
      ohRx -= swimPose * 0.5 + Math.cos(bp) * swimPose * 0.45;
      ohRy -= Math.sin(bp) * swimPose * 0.35;
    }
    if (flyPose > 0) { ohRx += flyPose * 0.15; ohRy += flyPose * 0.04; }
    if (this.animData.mining && swingT === 0) { const m = Math.sin(this.animData.clock * 22 + 1) * 0.05; ohPy += m; ohRx += m * 0.4; }

    this.offhandGroup.position.set(this._ohRestPos.x + ohSway, ohPy, this._ohRestPos.z);
    this.offhandGroup.rotation.set(ohRx, ohRy, this._ohRestRot.z);
  }

  renderOverlay() {
    if (!this.visible || !this.scene || !this.camera) return;
    this.renderer.clearDepth();
    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    window.removeEventListener('resize', this._onResize);
    if (this._armGroup) this._disposeMesh(this._armGroup);
    if (this._ohArmGroup) this._disposeMesh(this._ohArmGroup);
    if (this.heldMesh) this._disposeMesh(this.heldMesh);
    if (this.offhandMesh) this._disposeMesh(this.offhandMesh);
    this.scene.traverse((o) => {
      if (o.geometry) o.geometry.dispose();
      if (o.material) {
        const mats = Array.isArray(o.material) ? o.material : [o.material];
        for (const mat of mats) mat.dispose();
      }
    });
  }
}
