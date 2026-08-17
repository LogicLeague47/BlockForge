import * as THREE from 'three';

const GEO_SEGMENTS = 20;
let _sharedGeo = null;

function getShadowGeo() {
  if (!_sharedGeo) {
    _sharedGeo = new THREE.CircleGeometry(1, GEO_SEGMENTS);
  }
  return _sharedGeo;
}

export function createShadowMesh(scene) {
  const geo = getShadowGeo();
  const mat = new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    opacity: 0.35,
    depthWrite: true,
    depthTest: true,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.rotation.x = -Math.PI / 2;
  mesh.renderOrder = -1;
  scene.add(mesh);
  return mesh;
}

export function removeShadowMesh(scene, mesh) {
  if (mesh) {
    scene.remove(mesh);
    mesh.material.dispose();
  }
}

const _sunDir = new THREE.Vector3(0.4, 0.8, 0.3);
const _sunVertical = { value: 0.8 };

export function setSunDirection(dir) {
  _sunDir.copy(dir);
  _sunVertical.value = Math.max(0, dir.y);
}

export function getSunVertical() {
  return _sunVertical.value;
}

export function updateShadow(mesh, entityPos, groundY, baseRadius) {
  if (!mesh) return;

  const sunVertical = _sunVertical.value;

  if (sunVertical < 0.02) {
    mesh.visible = false;
    return;
  }
  mesh.visible = true;

  mesh.position.set(entityPos.x, groundY + 0.02, entityPos.z);

  const stretch = Math.min(6, 1.0 / Math.max(0.08, sunVertical));

  const hLen = Math.sqrt(_sunDir.x * _sunDir.x + _sunDir.z * _sunDir.z);

  if (hLen > 0.001) {
    const angle = Math.atan2(_sunDir.x, _sunDir.z);
    mesh.rotation.y = angle;
    const base = baseRadius || 0.5;
    mesh.scale.set(base, 1, base * stretch);
  } else {
    const base = baseRadius || 0.5;
    mesh.scale.set(base, 1, base);
    mesh.rotation.y = 0;
  }

  mesh.material.opacity = 0.35 * Math.min(1, sunVertical * 1.5);
}
