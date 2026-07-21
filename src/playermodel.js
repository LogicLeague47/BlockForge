import * as THREE from 'three';
import { isBlockItem, isTool, itemDef } from './items.js';
import { TOOL_PALETTES, makeItemIconCanvas } from './ui.js';
import { TILES, tileNameFor } from './blocks.js';
import { PlayerAnimData, calculatePose } from './animations.js';

const SCALE = 1 / 16;
function px(v) { return v * SCALE; }
const TILE = 64;

const HEAD = { w: 8, h: 8, d: 8 };
const BODY = { w: 8, h: 12, d: 4 };
const ARM  = { w: 4, h: 12, d: 4 };
const LEG  = { w: 4, h: 12, d: 4 };

export function createSkinCanvas(preset) {
  // If preset has a custom canvas (from the 3D skin editor), use it directly
  if (preset && preset._customCanvas) {
    return preset._customCanvas;
  }
  // If preset has a data URL, load it synchronously
  if (preset && preset._dataUrl) {
    const c = document.createElement('canvas');
    c.width = TILE;
    c.height = TILE;
    const g = c.getContext('2d');
    const img = new Image();
    img.src = preset._dataUrl;
    // Draw immediately if cached
    if (img.complete) {
      g.imageSmoothingEnabled = false;
      g.drawImage(img, 0, 0, TILE, TILE);
    } else {
      // If not cached, return a placeholder and update later
      img.onload = () => {
        g.imageSmoothingEnabled = false;
        g.drawImage(img, 0, 0, TILE, TILE);
      };
    }
    return c;
  }

  const c = document.createElement('canvas');
  c.width = TILE; c.height = TILE;
  const g = c.getContext('2d');
  g.imageSmoothingEnabled = false;

  const SKIN  = (preset && preset.skin) || '#c0906a';
  const SKIN2 = (preset && preset.skin2) || '#a87850';
  const HAIR  = (preset && preset.hair) || '#3b2210';
  const SHIRT = (preset && preset.shirt) || '#1d8db5';
  const PANTS = (preset && preset.pants) || '#2d3364';
  const SHOE  = (preset && preset.shoes) || '#493828';
  const WHITE = (preset && preset.eyes) || '#ffffff';
  const PUPIL = (preset && preset.pupil) || '#263694';
  const MOUTH = (preset && preset.mouth) || '#6b4330';
  const isGirl = preset && preset.gender === 'girl';
  const hairSideLen = isGirl ? 7 : 5;

  function fill(x, y, w, h, col) { g.fillStyle = col; g.fillRect(x, y, w, h); }

  // === HEAD (8x8 per face, canvas positions match cutFace calls) ===
  // +X right (0,8)
  fill(0, 8, 8, 8, SKIN);
  fill(0, 8, 8, 2, HAIR);
  fill(0, 8, 2, hairSideLen, HAIR);
  // -X left (16,8)
  fill(16, 8, 8, 8, SKIN);
  fill(16, 8, 8, 2, HAIR);
  fill(22, 8, 2, hairSideLen, HAIR);
  // +Y top (8,0) — all hair
  fill(8, 0, 8, 8, HAIR);
  // -Y bottom (16,0) — chin/skin
  fill(16, 0, 8, 8, SKIN);
  // Front face (8,8) — mapped to -Z back in materials (faces forward after yaw rotation)
  fill(8, 8, 8, 8, SKIN);
  fill(8, 8, 8, 2, HAIR);
  fill(8, 8, 1, hairSideLen, HAIR);
  fill(15, 8, 1, hairSideLen, HAIR);
  // eyes
  fill(10, 11, 2, 2, WHITE);
  fill(10, 12, 1, 1, PUPIL);
  fill(13, 11, 2, 2, WHITE);
  fill(14, 12, 1, 1, PUPIL);
  // nose
  fill(12, 13, 1, 1, SKIN2);
  // mouth
  fill(11, 14, 3, 1, MOUTH);
  // Back of head (24,8) — mapped to +Z in materials
  fill(24, 8, 8, 8, HAIR);

  // === BODY (8x12 front/back/top/bottom, 4x12 sides) ===
  // +X right (16,20)
  fill(16, 20, 4, 12, SHIRT);
  // -X left (28,20)
  fill(28, 20, 4, 12, SHIRT);
  // +Y top (20,16) — shirt collar
  fill(20, 16, 8, 4, SHIRT);
  fill(22, 16, 4, 2, SKIN);
  // -Y bottom (28,32) — shirt hem
  fill(28, 32, 8, 4, PANTS);
  // +Z front (20,20) — shirt front
  fill(20, 20, 8, 12, SHIRT);
  // -Z back (32,20) — shirt back
  fill(32, 20, 8, 12, SHIRT);

  // === RIGHT ARM (4x12 faces) ===
  // +X outer (40,20)
  fill(40, 20, 4, 9, SHIRT);
  fill(40, 29, 4, 3, SKIN);
  // -X inner (48,20)
  fill(48, 20, 4, 9, SHIRT);
  fill(48, 29, 4, 3, SKIN);
  // +Y top (44,16) — shoulder
  fill(44, 16, 4, 4, SHIRT);
  // -Y bottom (48,16) — hand
  fill(48, 16, 4, 4, SKIN);
  // +Z front (44,20)
  fill(44, 20, 4, 9, SHIRT);
  fill(44, 29, 4, 3, SKIN);
  // -Z back (52,20)
  fill(52, 20, 4, 9, SHIRT);
  fill(52, 29, 4, 3, SKIN);

  // === LEFT ARM (4x12 faces) ===
  // +X outer (32,52)
  fill(32, 52, 4, 9, SHIRT);
  fill(32, 61, 4, 3, SKIN);
  // -X inner (40,52)
  fill(40, 52, 4, 9, SHIRT);
  fill(40, 61, 4, 3, SKIN);
  // +Y top (36,48) — shoulder
  fill(36, 48, 4, 4, SHIRT);
  // -Y bottom (40,48) — hand
  fill(40, 48, 4, 4, SKIN);
  // +Z front (36,52)
  fill(36, 52, 4, 9, SHIRT);
  fill(36, 61, 4, 3, SKIN);
  // -Z back (44,52)
  fill(44, 52, 4, 9, SHIRT);
  fill(44, 61, 4, 3, SKIN);

  // === RIGHT LEG (4x12 faces) ===
  // +X outer (0,20)
  fill(0, 20, 4, 9, PANTS);
  fill(0, 29, 4, 3, SHOE);
  // -X inner (8,20)
  fill(8, 20, 4, 9, PANTS);
  fill(8, 29, 4, 3, SHOE);
  // +Y top (4,16) — hip
  fill(4, 16, 4, 4, PANTS);
  // -Y bottom (8,16) — sole
  fill(8, 16, 4, 4, SHOE);
  // +Z front (4,20)
  fill(4, 20, 4, 9, PANTS);
  fill(4, 29, 4, 3, SHOE);
  // -Z back (12,20)
  fill(12, 20, 4, 9, PANTS);
  fill(12, 29, 4, 3, SHOE);

  // === LEFT LEG (4x12 faces) ===
  // +X outer (16,52)
  fill(16, 52, 4, 9, PANTS);
  fill(16, 61, 4, 3, SHOE);
  // -X inner (24,52)
  fill(24, 52, 4, 9, PANTS);
  fill(24, 61, 4, 3, SHOE);
  // +Y top (20,48) — hip
  fill(20, 48, 4, 4, PANTS);
  // -Y bottom (24,48) — sole
  fill(24, 48, 4, 4, SHOE);
  // +Z front (20,52)
  fill(20, 52, 4, 9, PANTS);
  fill(20, 61, 4, 3, SHOE);
  // -Z back (28,52)
  fill(28, 52, 4, 9, PANTS);
  fill(28, 61, 4, 3, SHOE);

  return c;
}

function cutFace(skinCanvas, sx, sy, sw, sh) {
  const c = document.createElement('canvas');
  c.width = sw; c.height = sh;
  const x = c.getContext('2d');
  x.imageSmoothingEnabled = false;
  x.drawImage(skinCanvas, sx, sy, sw, sh, 0, 0, sw, sh);
  const tex = new THREE.CanvasTexture(c);
  tex.magFilter = THREE.NearestFilter;
  tex.minFilter = THREE.NearestFilter;
  tex.generateMipmaps = false;
  tex.colorSpace = THREE.SRGBColorSpace;
  return { material: new THREE.MeshLambertMaterial({ map: tex }), canvas: c, sx, sy, sw, sh };
}
// BoxGeometry face order: +X, -X, +Y, -Y, +Z, -Z

function headParts(skin) {
  return [
    cutFace(skin, 0, 8, 8, 8),    // +X right
    cutFace(skin, 16, 8, 8, 8),   // -X left
    cutFace(skin, 8, 0, 8, 8),    // +Y top
    cutFace(skin, 16, 0, 8, 8),   // -Y bottom
    cutFace(skin, 24, 8, 8, 8),   // +Z back of head (hair — swapped for yaw)
    cutFace(skin, 8, 8, 8, 8),    // -Z face (front — swapped for yaw)
  ];
}

function bodyParts(skin) {
  return [
    cutFace(skin, 16, 20, 4, 12),  // +X right
    cutFace(skin, 28, 20, 4, 12),  // -X left
    cutFace(skin, 20, 16, 8, 4),   // +Y top
    cutFace(skin, 28, 32, 8, 4),   // -Y bottom
    cutFace(skin, 20, 20, 8, 12),  // +Z front
    cutFace(skin, 32, 20, 8, 12),  // -Z back
  ];
}

function rightArmParts(skin) {
  return [
    cutFace(skin, 40, 20, 4, 12),  // +X outer
    cutFace(skin, 48, 20, 4, 12),  // -X inner
    cutFace(skin, 44, 16, 4, 4),   // +Y top
    cutFace(skin, 48, 16, 4, 4),   // -Y bottom (hand)
    cutFace(skin, 44, 20, 4, 12),  // +Z front
    cutFace(skin, 52, 20, 4, 12),  // -Z back
  ];
}

function leftArmParts(skin) {
  return [
    cutFace(skin, 32, 52, 4, 12),  // +X outer
    cutFace(skin, 40, 52, 4, 12),  // -X inner
    cutFace(skin, 36, 48, 4, 4),   // +Y top
    cutFace(skin, 40, 48, 4, 4),   // -Y bottom (hand)
    cutFace(skin, 36, 52, 4, 12),  // +Z front
    cutFace(skin, 44, 52, 4, 12),  // -Z back
  ];
}

function rightLegParts(skin) {
  return [
    cutFace(skin, 0, 20, 4, 12),   // +X outer
    cutFace(skin, 8, 20, 4, 12),   // -X inner
    cutFace(skin, 4, 16, 4, 4),    // +Y top
    cutFace(skin, 8, 16, 4, 4),    // -Y bottom (shoe)
    cutFace(skin, 4, 20, 4, 12),   // +Z front
    cutFace(skin, 12, 20, 4, 12),  // -Z back
  ];
}

function leftLegParts(skin) {
  return [
    cutFace(skin, 16, 52, 4, 12),  // +X outer
    cutFace(skin, 24, 52, 4, 12),  // -X inner
    cutFace(skin, 20, 48, 4, 4),   // +Y top
    cutFace(skin, 24, 48, 4, 4),   // -Y bottom (shoe)
    cutFace(skin, 20, 52, 4, 12),  // +Z front
    cutFace(skin, 28, 52, 4, 12),  // -Z back
  ];
}

export class PlayerModel {
  constructor(scene, preset, atlasCanvas) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.group.visible = false;
    scene.add(this.group);
    this._atlasCanvas = atlasCanvas;
    this.animData = new PlayerAnimData();

    this.skin = createSkinCanvas(preset);
    this._buildBody();
  }

  _buildBody() {
    const s = this.skin;

    this._headParts = headParts(s);
    this.head = new THREE.Mesh(
      new THREE.BoxGeometry(px(HEAD.w), px(HEAD.h), px(HEAD.d)),
      this._headParts.map(p => p.material)
    );
    this.head.userData.partName = 'head';
    // Head relative to body center
    this.head.position.y = px(BODY.h / 2 + HEAD.h / 2);

    this._bodyParts = bodyParts(s);
    this.body = new THREE.Mesh(
      new THREE.BoxGeometry(px(BODY.w), px(BODY.h), px(BODY.d)),
      this._bodyParts.map(p => p.material)
    );
    this.body.userData.partName = 'body';
    this.body.position.y = px(LEG.h + BODY.h / 2);

    this._rightArmParts = rightArmParts(s);
    this.rightArm = new THREE.Mesh(new THREE.BoxGeometry(px(ARM.w), px(ARM.h), px(ARM.d)), this._rightArmParts.map(p => p.material));
    this.rightArm.userData.partName = 'rightArm';
    this.rightArm.geometry.translate(0, -px(ARM.h / 2), 0);
    this.rightArmPivot = new THREE.Group();
    // Arm pivot relative to body center (shoulder at top of body)
    this.rightArmPivot.position.set(px(BODY.w / 2 + ARM.w / 2), px(BODY.h / 2), 0);
    this.rightArmPivot.add(this.rightArm);

    this._leftArmParts = leftArmParts(s);
    this.leftArm = new THREE.Mesh(new THREE.BoxGeometry(px(ARM.w), px(ARM.h), px(ARM.d)), this._leftArmParts.map(p => p.material));
    this.leftArm.userData.partName = 'leftArm';
    this.leftArm.geometry.translate(0, -px(ARM.h / 2), 0);
    this.leftArmPivot = new THREE.Group();
    // Arm pivot relative to body center
    this.leftArmPivot.position.set(px(-BODY.w / 2 - ARM.w / 2), px(BODY.h / 2), 0);
    this.leftArmPivot.add(this.leftArm);

    const legGeo = new THREE.BoxGeometry(px(LEG.w), px(LEG.h), px(LEG.d));

    this._rightLegParts = rightLegParts(s);
    this.rightLeg = new THREE.Mesh(legGeo, this._rightLegParts.map(p => p.material));
    this.rightLeg.userData.partName = 'rightLeg';
    this.rightLeg.position.set(0, -px(LEG.h / 2), 0);
    this.rightLegPivot = new THREE.Group();
    // Leg pivots stay on group (hip level)
    this.rightLegPivot.position.set(px(BODY.w / 2 - LEG.w / 2), px(LEG.h), 0);
    this.rightLegPivot.add(this.rightLeg);

    this._leftLegParts = leftLegParts(s);
    this.leftLeg = new THREE.Mesh(legGeo.clone(), this._leftLegParts.map(p => p.material));
    this.leftLeg.userData.partName = 'leftLeg';
    this.leftLeg.position.set(0, -px(LEG.h / 2), 0);
    this.leftLegPivot = new THREE.Group();
    this.leftLegPivot.position.set(px(-BODY.w / 2 + LEG.w / 2), px(LEG.h), 0);
    this.leftLegPivot.add(this.leftLeg);

    this.group.add(this.body);
    this.body.add(this.head);
    this.body.add(this.rightArmPivot);
    this.body.add(this.leftArmPivot);
    this.group.add(this.rightLegPivot);
    this.group.add(this.leftLegPivot);
  }

  setVisible(v) { this.group.visible = !!v; }

  _updateSkinTexture() {
    // Update all part canvases and mark textures as needing update
    const updatePart = (parts) => {
      for (const p of parts) {
        // Redraw the face canvas from the main skin
        const ctx = p.canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(this.skin, p.sx, p.sy, p.sw, p.sh, 0, 0, p.sw, p.sh);
        // Tell Three.js the texture needs update
        p.material.map.needsUpdate = true;
      }
    };

    if (this._headParts) updatePart(this._headParts);
    if (this._bodyParts) updatePart(this._bodyParts);
    if (this._rightArmParts) updatePart(this._rightArmParts);
    if (this._leftArmParts) updatePart(this._leftArmParts);
    if (this._rightLegParts) updatePart(this._rightLegParts);
    if (this._leftLegParts) updatePart(this._leftLegParts);
  }

  setSkin(preset) {
    this.skin = createSkinCanvas(preset);
    this._updateSkinTexture();
  }

  setHeld(itemId) {
    if (itemId === this._heldId) return;
    this._heldId = itemId;
    if (this._heldMesh) {
      this.rightArm.remove(this._heldMesh);
      this._disposeMesh(this._heldMesh);
      this._heldMesh = null;
    }
    if (itemId == null) return;

    const mkMat = (color) => new THREE.MeshLambertMaterial({ color, fog: false });
    const wrap = new THREE.Group();

    if (isBlockItem(itemId)) {
      const sideCanvas = this._getBlockCanvas(itemId, 'side');
      const topCanvas = this._getBlockCanvas(itemId, 'top');
      const sideTex = this._canvasTex(sideCanvas);
      const topTex = this._canvasTex(topCanvas);
      const botTex = this._canvasTex(sideCanvas);
      const mats = [
        new THREE.MeshLambertMaterial({ map: sideTex, fog: false }),
        new THREE.MeshLambertMaterial({ map: sideTex, fog: false }),
        new THREE.MeshLambertMaterial({ map: topTex, fog: false }),
        new THREE.MeshLambertMaterial({ map: botTex, fog: false }),
        new THREE.MeshLambertMaterial({ map: sideTex, fog: false }),
        new THREE.MeshLambertMaterial({ map: sideTex, fog: false }),
      ];
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(px(5), px(5), px(5)), mats);
      wrap.add(mesh);
    } else if (isTool(itemId)) {
      const def = itemDef(itemId);
      const p = TOOL_PALETTES[def?.tool?.material] || TOOL_PALETTES.IRON;
      const type = def?.tool?.type || 'sword';

      if (type === 'sword') {
        const gripY = px(2.5);
        const blade = new THREE.Mesh(new THREE.BoxGeometry(px(1), px(11), px(0.5)), [mkMat(p.lit), mkMat(p.mid), mkMat(p.head), mkMat(p.head), mkMat(p.lit), mkMat(p.mid)]);
        blade.position.y = px(6) + gripY;
        wrap.add(blade);
        const guard = new THREE.Mesh(new THREE.BoxGeometry(px(3), px(0.8), px(1)), mkMat('#8a6a3c'));
        guard.position.y = px(-0.5) + gripY;
        wrap.add(guard);
        const handle = new THREE.Mesh(new THREE.BoxGeometry(px(0.8), px(3), px(0.8)), mkMat('#6e5230'));
        handle.position.y = px(-2.5) + gripY;
        wrap.add(handle);
      } else if (type === 'pickaxe') {
        const gripY = px(1);
        const handle = new THREE.Mesh(new THREE.BoxGeometry(px(0.8), px(9), px(0.8)), mkMat('#6e5230'));
        handle.position.y = px(-1) + gripY;
        wrap.add(handle);
        const headBar = new THREE.Mesh(new THREE.BoxGeometry(px(8), px(1.5), px(1)), [mkMat(p.head), mkMat(p.dark), mkMat(p.lit), mkMat(p.mid), mkMat(p.head), mkMat(p.head)]);
        headBar.position.y = px(4) + gripY;
        wrap.add(headBar);
      } else if (type === 'axe') {
        const gripY = px(1);
        const handle = new THREE.Mesh(new THREE.BoxGeometry(px(0.8), px(9), px(0.8)), mkMat('#6e5230'));
        handle.position.y = px(-1) + gripY;
        wrap.add(handle);
        const axeHead = new THREE.Mesh(new THREE.BoxGeometry(px(4), px(4.5), px(1)), [mkMat(p.lit), mkMat(p.dark), mkMat(p.head), mkMat(p.mid), mkMat(p.head), mkMat(p.head)]);
        axeHead.position.set(px(-0.8), px(4.5) + gripY, 0);
        wrap.add(axeHead);
      } else if (type === 'shovel') {
        const gripY = px(1);
        const handle = new THREE.Mesh(new THREE.BoxGeometry(px(0.8), px(9), px(0.8)), mkMat('#6e5230'));
        handle.position.y = px(-1) + gripY;
        wrap.add(handle);
        const shovelHead = new THREE.Mesh(new THREE.BoxGeometry(px(3), px(3), px(0.8)), [mkMat(p.mid), mkMat(p.dark), mkMat(p.head), mkMat(p.lit), mkMat(p.head), mkMat(p.head)]);
        shovelHead.position.y = px(5) + gripY;
        wrap.add(shovelHead);
      } else {
        // trident / other: flat sprite
        const canvas = this._getItemCanvas(itemId);
        const tex = this._canvasTex(canvas);
        const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, alphaTest: 0.5, depthWrite: false, side: THREE.DoubleSide });
        const mesh = new THREE.Mesh(new THREE.PlaneGeometry(px(8), px(8)), mat);
        wrap.add(mesh);
      }

      wrap.rotation.x = -Math.PI / 2;
    } else {
      // Non-block, non-tool items: flat sprite like Minecraft
      const canvas = this._getItemCanvas(itemId);
      const tex = this._canvasTex(canvas);
      const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, alphaTest: 0.5, depthWrite: false, side: THREE.DoubleSide });
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(px(8), px(8)), mat);
      mesh.rotation.set(-0.45, 0.35, 0.15);
      wrap.add(mesh);
    }

    // Position at the bottom of the arm (the hand), pushed forward (-Z = character front)
    wrap.position.set(0, -px(ARM.h - 1), -px(3));
    this._heldMesh = wrap;
    this.rightArm.add(wrap);
  }

  _getBlockCanvas(blockId, face) {
    const t = TILES[tileNameFor(blockId, face)];
    const c = document.createElement('canvas');
    c.width = 16; c.height = 16;
    const ctx = c.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    if (t && this._atlasCanvas) ctx.drawImage(this._atlasCanvas, t[0] * 32, t[1] * 32, 32, 32, 0, 0, 16, 16);
    return c;
  }

  _getItemCanvas(itemId) {
    return makeItemIconCanvas(itemId);
  }

  _canvasTex(canvas) {
    const tex = new THREE.CanvasTexture(canvas);
    tex.magFilter = THREE.NearestFilter;
    tex.minFilter = THREE.NearestFilter;
    tex.generateMipmaps = false;
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
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

  update(dt, playerPos, playerYaw, velocity, onGround, sprinting, breaking, placing, swimming, eating, crouching = false, flying = false, onLadder = false, headYaw = 0) {
    if (!this.group.visible) return;

    this.group.position.set(playerPos.x, playerPos.y, playerPos.z);
    this.group.rotation.y = playerYaw;

    // Update animation state
    const speed = Math.sqrt(velocity.x ** 2 + velocity.z ** 2);
    this.animData.moving = speed > 0.3;
    this.animData.sprinting = sprinting;
    this.animData.breaking = breaking;
    this.animData.placing = placing;
    this.animData.inWater = swimming;
    this.animData.eating = eating;
    this.animData.onGround = onGround;
    this.animData.crouching = crouching;
    this.animData.flying = flying;
    this.animData.onLadder = onLadder;
    this.animData.velocityY = velocity.y;
    this.animData.headYaw = headYaw;

    // Update animation timers
    this.animData.update(dt);

    // Calculate pose
    const pose = calculatePose(this.animData);

    // Apply pose — body translation moves entire model (group)
    this.group.position.y = playerPos.y + pose.bodyTransY;

    this.body.rotation.x = pose.bodyRotX;
    this.body.rotation.y = pose.bodyRotY;
    this.body.rotation.z = pose.bodyRotZ;
    this.body.position.x = pose.bodyTransX;
    this.body.position.z = pose.bodyTransZ;
    this.body.scale.set(pose.bodyScaleX, pose.bodyScaleY, pose.bodyScaleZ);

    this.head.rotation.x = pose.headRotX;
    this.head.rotation.y = pose.headRotY;
    this.head.rotation.z = pose.headRotZ;

    this.leftArmPivot.rotation.x = pose.leftArmRotX;
    this.leftArmPivot.rotation.y = pose.leftArmRotY;
    this.leftArmPivot.rotation.z = pose.leftArmRotZ;

    this.rightArmPivot.rotation.x = pose.rightArmRotX;
    this.rightArmPivot.rotation.y = pose.rightArmRotY;
    this.rightArmPivot.rotation.z = pose.rightArmRotZ;

    this.leftLegPivot.rotation.x = pose.leftLegRotX;
    this.rightLegPivot.rotation.x = pose.rightLegRotX;
  }

  // Trigger hurt tilt animation (called when player takes damage)
  triggerHurt() {
    this.animData.hurtTimer = 1.0;
  }

  // Trigger attack swing (called on click)
  swing() {
    this.animData.swing();
  }

  // Trigger celebration animation (arms up, ~1.2s duration)
  triggerCelebrate() {
    this.animData.celebrateTimer = 2.0;
  }

  // ── Armour overlay rendering ──────────────────────────────────────────
  // armourSlots: [helmetId, chestId, leggingsId, bootsId] (null = empty)
  setArmor(armorSlots, ARMOR) {
    // Remove old armour meshes
    if (this._armorMeshes) {
      for (const m of this._armorMeshes) {
        if (m.parent) m.parent.remove(m);
        m.geometry.dispose();
        if (m.material.map) m.material.map.dispose();
        m.material.dispose();
      }
    }
    this._armorMeshes = [];
    if (!armorSlots || !ARMOR) return;

    const ARMOR_COLORS = {
      LEATHER: '#A0522D', CHAIN: '#C0C0C0', IRON: '#D0D0D0',
      GOLD: '#FFD700', DIAMOND: '#00CED1', PRISMITE: '#B060E0',
    };

    const _makeArmorMat = (color) => {
      const canvas = document.createElement('canvas');
      canvas.width = 4; canvas.height = 4;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, 4, 4);
      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.fillRect(0, 0, 1, 4);
      ctx.fillRect(3, 0, 1, 4);
      ctx.fillRect(0, 0, 4, 1);
      ctx.fillRect(0, 3, 4, 1);
      const tex = new THREE.CanvasTexture(canvas);
      tex.magFilter = THREE.NearestFilter;
      return new THREE.MeshLambertMaterial({ map: tex, transparent: true, opacity: 0.85 });
    };

    // Helmet — child of head, follows head rotation
    const helmetId = armorSlots[0];
    if (helmetId != null && ARMOR[helmetId]) {
      const color = ARMOR_COLORS[ARMOR[helmetId].material] || '#888';
      const geo = new THREE.BoxGeometry(px(HEAD.w + 1), px(HEAD.h + 1), px(HEAD.d + 1));
      const mesh = new THREE.Mesh(geo, _makeArmorMat(color));
      mesh.userData.partName = 'armor';
      this.head.add(mesh);
      this._armorMeshes.push(mesh);
    }

    // Chestplate — child of body, follows body tilt
    const chestId = armorSlots[1];
    if (chestId != null && ARMOR[chestId]) {
      const color = ARMOR_COLORS[ARMOR[chestId].material] || '#888';
      const geo = new THREE.BoxGeometry(px(BODY.w + 1), px(BODY.h), px(BODY.d + 1));
      const mesh = new THREE.Mesh(geo, _makeArmorMat(color));
      mesh.userData.partName = 'armor';
      this.body.add(mesh);
      this._armorMeshes.push(mesh);
    }

    // Leggings — children of leg pivots, follow leg swing
    const leggingId = armorSlots[2];
    if (leggingId != null && ARMOR[leggingId]) {
      const color = ARMOR_COLORS[ARMOR[leggingId].material] || '#888';
      const geo = new THREE.BoxGeometry(px(LEG.w + 1), px(LEG.h), px(LEG.d + 1));
      const meshR = new THREE.Mesh(geo.clone(), _makeArmorMat(color));
      meshR.position.set(0, -px(LEG.h / 2), 0);
      meshR.userData.partName = 'armor';
      this.rightLegPivot.add(meshR);
      this._armorMeshes.push(meshR);

      const meshL = new THREE.Mesh(geo.clone(), _makeArmorMat(color));
      meshL.position.set(0, -px(LEG.h / 2), 0);
      meshL.userData.partName = 'armor';
      this.leftLegPivot.add(meshL);
      this._armorMeshes.push(meshL);
    }

    // Boots — children of leg pivots, follow leg swing
    const bootId = armorSlots[3];
    if (bootId != null && ARMOR[bootId]) {
      const color = ARMOR_COLORS[ARMOR[bootId].material] || '#888';
      const geo = new THREE.BoxGeometry(px(LEG.w + 1), px(4), px(LEG.d + 1));
      const meshR = new THREE.Mesh(geo.clone(), _makeArmorMat(color));
      meshR.position.set(0, -px(LEG.h - 2), 0);
      meshR.userData.partName = 'armor';
      this.rightLegPivot.add(meshR);
      this._armorMeshes.push(meshR);

      const meshL = new THREE.Mesh(geo.clone(), _makeArmorMat(color));
      meshL.position.set(0, -px(LEG.h - 2), 0);
      meshL.userData.partName = 'armor';
      this.leftLegPivot.add(meshL);
      this._armorMeshes.push(meshL);
    }
  }

  dispose() {
    this.scene.remove(this.group);
    this.group.traverse((o) => {
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
}
