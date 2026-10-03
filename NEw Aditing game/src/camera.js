import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export function makeCamera(renderer, grid) {
  const S = grid * 2;
  const camera = new THREE.PerspectiveCamera(48, innerWidth / innerHeight, 0.1, 500);
  camera.position.set(S * 0.7, S * 0.85, S * 0.7);
  const ctl = new OrbitControls(camera, renderer.domElement);
  ctl.target.set(0, 0, 0);
  ctl.enableDamping = true;
  ctl.maxPolarAngle = Math.PI / 2.6;
  ctl.minDistance = 8; ctl.maxDistance = 70;
  ctl.mouseButtons = { LEFT: THREE.MOUSE.ROTATE, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.PAN };
  addEventListener('resize', () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  });
  return { camera, ctl };
}

export function lights(scene) {
  scene.add(new THREE.HemisphereLight(0xbfe3ff, 0x3d5a3a, 1.1));
  const sun = new THREE.DirectionalLight(0xfff6e0, 1.6);
  sun.position.set(18, 26, 12);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  sun.shadow.camera.left = -30; sun.shadow.camera.right = 30;
  sun.shadow.camera.top = 30; sun.shadow.camera.bottom = -30;
  scene.add(sun);
  scene.fog = new THREE.Fog(0x0e1420, 70, 160);
}
