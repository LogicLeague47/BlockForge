// Custom GLSL shaders for terrain rendering.
//
// Three shader programs:
//   1. Opaque — directional + hemisphere lighting, AO via vertex colors, fog
//   2. Transparent — same as opaque but with alpha test + blending (leaves, glass)
//   3. Water — animated UV scroll, sine displacement, semi-transparent blue

import * as THREE from 'three';

// ── Shared vertex code ─────────────────────────────────────────────────────
// Note: modelMatrix, viewMatrix, projectionMatrix, modelViewMatrix, normalMatrix,
// cameraPosition, position, normal, and uv are auto-injected by Three.js r150+.
// Only custom uniforms/attributes need to be declared here.
const terrainVert = /* glsl */ `
  attribute vec3 color;

  uniform vec3 sunDirection;
  uniform mat4 shadowMatrix;

  varying vec2 vUv;
  varying vec3 vColor;
  varying vec3 vNormal;
  varying vec3 vWorldPos;
  varying float vFogDepth;
  varying vec4 vShadowCoord;

  void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPos = worldPos.xyz;
    vUv = uv;
    vColor = color;
    vNormal = normal;
    vShadowCoord = shadowMatrix * worldPos;

    vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
    vFogDepth = -mvPos.z;
    gl_Position = projectionMatrix * mvPos;
  }
`;

// ── Shared fragment helpers ─────────────────────────────────────────────────
const fragHelpers = /* glsl */ `
  precision highp float;

  uniform sampler2D atlas;
  uniform vec3 sunDirection;
  uniform vec3 sunColor;
  uniform vec3 ambientColor;
  uniform vec3 fogColor;
  uniform float fogNear;
  uniform float fogFar;
  uniform sampler2D shadowMap;
  uniform vec2 shadowMapSize;

  varying vec2 vUv;
  varying vec3 vColor;
  varying vec3 vNormal;
  varying vec3 vWorldPos;
  varying float vFogDepth;
  varying vec4 vShadowCoord;

  float lambert(vec3 n, vec3 l) {
    return max(dot(n, l), 0.0);
  }

  float getShadow(vec3 normal, vec3 lightDir) {
    vec3 sc = vShadowCoord.xyz / vShadowCoord.w;
    if (sc.z > 1.0 || sc.x < 0.0 || sc.x > 1.0 || sc.y < 0.0 || sc.y > 1.0) return 1.0;
    float shadow = 0.0;
    vec2 texelSize = 1.0 / shadowMapSize;
    float slopeBias = 0.0005 + 0.005 * (1.0 - max(dot(normal, lightDir), 0.0));
    for (int x = -1; x <= 1; x++) {
      for (int y = -1; y <= 1; y++) {
        float pcfDepth = texture2D(shadowMap, sc.xy + vec2(float(x), float(y)) * texelSize).r;
        shadow += sc.z - slopeBias > pcfDepth ? 0.3 : 1.0;
      }
    }
    return shadow / 9.0;
  }
`;

// ── Opaque terrain fragment ─────────────────────────────────────────────────
const opaqueFrag = /* glsl */ `
  ${fragHelpers}

  void main() {
    vec4 tex = texture2D(atlas, vUv);

    vec3 normal = normalize(vNormal);
    vec3 lightDir = normalize(sunDirection);

    // Diffuse (N dot L)
    float NdotL = lambert(normal, lightDir);

    // Hemisphere: upward faces get more sky light, downward get bounce
    float hemi = normal.y * 0.5 + 0.5;

    // Lighting: ambient floor + diffuse + hemisphere
    float lighting = 0.35 + NdotL * 0.55 + hemi * 0.1;

    // Apply shadow
    float shadow = getShadow(normal, lightDir);
    lighting *= shadow;

    // Vertex color carries AO and biome tint
    vec3 baseColor = tex.rgb * vColor;

    // Combine: sun-tinted diffuse + ambient fill
    vec3 finalColor = baseColor * (sunColor * lighting + ambientColor * 0.25);

    // Fog
    float fogFactor = smoothstep(fogNear, fogFar, vFogDepth);
    finalColor = mix(finalColor, fogColor, fogFactor);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

// ── Transparent fragment (leaves, glass, plants) ───────────────────────────
const transFrag = /* glsl */ `
  ${fragHelpers}

  void main() {
    vec4 tex = texture2D(atlas, vUv);
    if (tex.a < 0.1) discard;

    vec3 normal = normalize(vNormal);
    vec3 lightDir = normalize(sunDirection);

    float NdotL = lambert(normal, lightDir);
    float hemi = normal.y * 0.5 + 0.5;

    float lighting = 0.35 + NdotL * 0.55 + hemi * 0.1;

    float shadow = getShadow(normal, lightDir);
    lighting *= shadow;

    vec3 baseColor = tex.rgb * vColor;
    vec3 finalColor = baseColor * (sunColor * lighting + ambientColor * 0.25);

    float fogFactor = smoothstep(fogNear, fogFar, vFogDepth);
    finalColor = mix(finalColor, fogColor, fogFactor);

    gl_FragColor = vec4(finalColor, tex.a);
  }
`;

// ── Water vertex ────────────────────────────────────────────────────────────
const waterVert = /* glsl */ `
  uniform float time;
  uniform float waveAmp;

  varying vec2 vUv;
  varying vec3 vWorldPos;
  varying vec3 vNormal;

  void main() {
    vec3 pos = position;

    float wave1 = sin(pos.x * 1.2 + time * 1.5) * 0.06 * waveAmp;
    float wave2 = cos(pos.z * 0.9 + time * 1.1) * 0.04 * waveAmp;
    pos.y += wave1 + wave2;

    vec4 worldPos = modelMatrix * vec4(pos, 1.0);
    vWorldPos = worldPos.xyz;
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);

    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPos;
  }
`;

const waterFrag = /* glsl */ `
  precision highp float;

  uniform float time;
  uniform vec3 fogColor;
  uniform float fogNear;
  uniform float fogFar;
  uniform vec3 sunDirection;

  varying vec2 vUv;
  varying vec3 vWorldPos;
  varying vec3 vNormal;

  void main() {
    vec2 scrolledUv = vUv + vec2(time * 0.02, time * 0.015);

    vec3 waterBase = vec3(0.12, 0.24, 0.65);
    float wavePattern = sin(scrolledUv.x * 12.0 + time * 2.0) *
                        cos(scrolledUv.y * 10.0 + time * 1.5) * 0.15;
    vec3 waterColor = waterBase + vec3(wavePattern * 0.3, wavePattern * 0.4, wavePattern * 0.2);

    vec3 viewDir = normalize(cameraPosition - vWorldPos);
    vec3 halfVec = normalize(normalize(sunDirection) + viewDir);
    float spec = pow(max(dot(vNormal, halfVec), 0.0), 64.0) * 0.6;

    float NdotL = max(dot(vNormal, normalize(sunDirection)), 0.0);
    float lighting = 0.3 + NdotL * 0.5;

    vec3 finalColor = waterColor * lighting + vec3(spec);

    float rim = 1.0 - max(dot(viewDir, vNormal), 0.0);
    rim = pow(rim, 3.0) * 0.25;
    finalColor += vec3(rim);

    float dist = distance(vWorldPos, cameraPosition);
    float fogFactor = smoothstep(fogNear, fogFar, dist);
    finalColor = mix(finalColor, fogColor, fogFactor);

    gl_FragColor = vec4(finalColor, 0.55);
  }
`;

// ── Material factory ────────────────────────────────────────────────────────

export function createOpaqueMaterial(atlasTexture) {
  return new THREE.ShaderMaterial({
    vertexShader: terrainVert,
    fragmentShader: opaqueFrag,
    uniforms: {
      atlas: { value: atlasTexture },
      sunDirection: { value: new THREE.Vector3(0.4, 0.8, 0.3).normalize() },
      sunColor: { value: new THREE.Color(1.0, 0.98, 0.92) },
      ambientColor: { value: new THREE.Color(0.4, 0.45, 0.55) },
      fogColor: { value: new THREE.Color(0x9ad0ff) },
      fogNear: { value: 80.0 },
      fogFar: { value: 144.0 },
      shadowMatrix: { value: new THREE.Matrix4() },
      shadowMap: { value: null },
      shadowMapSize: { value: new THREE.Vector2(4096, 4096) },
    },
    side: THREE.FrontSide,
  });
}

export function createCutoutMaterial(atlasTexture) {
  return new THREE.ShaderMaterial({
    vertexShader: terrainVert,
    fragmentShader: transFrag,
    uniforms: {
      atlas: { value: atlasTexture },
      sunDirection: { value: new THREE.Vector3(0.4, 0.8, 0.3).normalize() },
      sunColor: { value: new THREE.Color(1.0, 0.98, 0.92) },
      ambientColor: { value: new THREE.Color(0.4, 0.45, 0.55) },
      fogColor: { value: new THREE.Color(0x9ad0ff) },
      fogNear: { value: 80.0 },
      fogFar: { value: 144.0 },
      shadowMatrix: { value: new THREE.Matrix4() },
      shadowMap: { value: null },
      shadowMapSize: { value: new THREE.Vector2(4096, 4096) },
    },
    alphaTest: 0.1,
    depthWrite: true,
    side: THREE.DoubleSide,
  });
}

export function createTransparentMaterial(atlasTexture) {
  return new THREE.ShaderMaterial({
    vertexShader: terrainVert,
    fragmentShader: transFrag,
    uniforms: {
      atlas: { value: atlasTexture },
      sunDirection: { value: new THREE.Vector3(0.4, 0.8, 0.3).normalize() },
      sunColor: { value: new THREE.Color(1.0, 0.98, 0.92) },
      ambientColor: { value: new THREE.Color(0.4, 0.45, 0.55) },
      fogColor: { value: new THREE.Color(0x9ad0ff) },
      fogNear: { value: 80.0 },
      fogFar: { value: 144.0 },
      shadowMatrix: { value: new THREE.Matrix4() },
      shadowMap: { value: null },
      shadowMapSize: { value: new THREE.Vector2(4096, 4096) },
    },
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    polygonOffset: true,
    polygonOffsetFactor: -1,
  });
}

function _makeWaterMaterial(fogColor, waveAmp) {
  return new THREE.ShaderMaterial({
    vertexShader: waterVert,
    fragmentShader: waterFrag,
    uniforms: {
      time: { value: 0.0 },
      waveAmp: { value: waveAmp },
      fogColor: { value: fogColor || new THREE.Color(0x9ad0ff) },
      fogNear: { value: 80.0 },
      fogFar: { value: 144.0 },
      sunDirection: { value: new THREE.Vector3(0.4, 0.8, 0.3).normalize() },
    },
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
}

export function createWaterMaterial(fogColor) {
  return _makeWaterMaterial(fogColor, 1.0);
}

export function createOceanWaterMaterial(fogColor) {
  return _makeWaterMaterial(fogColor, 2.0);
}

export function createRiverWaterMaterial(fogColor) {
  return _makeWaterMaterial(fogColor, 0.5);
}

import { setSunDirection } from './shadows.js';

function _syncWaterMat(mat, time, fogColor, fogNear, fogFar, sunDir) {
  if (!mat) return;
  mat.uniforms.time.value = time;
  mat.uniforms.fogColor.value.copy(fogColor);
  mat.uniforms.fogNear.value = fogNear;
  mat.uniforms.fogFar.value = fogFar;
  mat.uniforms.sunDirection.value.copy(sunDir);
}

export function updateShaderUniforms({ opaqueMat, cutoutMat, transMat, waterMat, oceanWaterMat, riverWaterMat, sun, ambient, fogColor, fogNear, fogFar, time, renderer, camera }) {
  const sunDir = new THREE.Vector3().subVectors(sun.position, sun.target.position).normalize();
  setSunDirection(sunDir);

  const sunCol = sun.color.clone().multiplyScalar(sun.intensity);
  const ambCol = ambient.color.clone().multiplyScalar(ambient.intensity);

  sun.shadow.updateMatrices(sun, camera);
  const shadowMat = sun.shadow.matrix;
  const shadowTex = sun.shadow.map ? sun.shadow.map.texture : null;

  function _applyTerrain(m) {
    if (!m) return;
    m.uniforms.sunDirection.value.copy(sunDir);
    m.uniforms.sunColor.value.copy(sunCol);
    m.uniforms.ambientColor.value.copy(ambCol);
    m.uniforms.fogColor.value.copy(fogColor);
    m.uniforms.fogNear.value = fogNear;
    m.uniforms.fogFar.value = fogFar;
    m.uniforms.shadowMatrix.value.copy(shadowMat);
    if (shadowTex) m.uniforms.shadowMap.value = shadowTex;
    m.uniforms.shadowMapSize.value.copy(sun.shadow.mapSize);
  }

  _applyTerrain(opaqueMat);
  _applyTerrain(transMat);
  _applyTerrain(cutoutMat);

  _syncWaterMat(waterMat, time, fogColor, fogNear, fogFar, sunDir);
  _syncWaterMat(oceanWaterMat, time, fogColor, fogNear, fogFar, sunDir);
  _syncWaterMat(riverWaterMat, time, fogColor, fogNear, fogFar, sunDir);
}
