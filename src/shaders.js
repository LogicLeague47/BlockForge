// Custom GLSL shaders for terrain rendering.
//
// Three shader programs:
//   1. Opaque — directional light, shadow mapping, AO via vertex colors, fog
//   2. Transparent — same as opaque but with alpha test + blending (leaves, glass)
//   3. Water — animated UV scroll, sine displacement, semi-transparent blue

import * as THREE from 'three';

// ── Shared vertex code ─────────────────────────────────────────────────────
const terrainVert = /* glsl */ `
  attribute vec3 color;

  uniform mat4 modelMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  uniform mat4 modelViewMatrix;
  uniform mat4 shadowMatrix;
  uniform vec3 sunDirection;

  varying vec2 vUv;
  varying vec3 vColor;
  varying vec3 vNormal;
  varying vec3 vWorldPos;
  varying vec4 vShadowCoord;
  varying float vFogDepth;

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
  uniform float shadowBias;

  varying vec2 vUv;
  varying vec3 vColor;
  varying vec3 vNormal;
  varying vec3 vWorldPos;
  varying vec4 vShadowCoord;
  varying float vFogDepth;

  // PCF shadow sampling (3x3 filter)
  float sampleShadow(vec3 coords) {
    if (coords.z > 1.0) return 1.0;
    float shadow = 0.0;
    vec2 texelSize = 1.0 / shadowMapSize;
    float bias = shadowBias;
    for (int x = -1; x <= 1; x++) {
      for (int y = -1; y <= 1; y++) {
        vec2 offset = vec2(float(x), float(y)) * texelSize;
        float pcf = texture2D(shadowMap, coords.xy + offset).r;
        shadow += step(bias, pcf);
      }
    }
    return shadow / 9.0;
  }

  // Simple directional diffuse (N dot L)
  float lambert(vec3 n, vec3 l) {
    return max(dot(n, l), 0.0);
  }

  // Ambient occlusion from vertex color AO channel (stored in RGB equally)
  float aoFromVertex() {
    // AO is baked into vertex color; all channels carry the same AO value
    return vColor.r;
  }
`;

// ── Opaque terrain fragment ─────────────────────────────────────────────────
const opaqueFrag = /* glsl */ `
  ${fragHelpers}

  void main() {
    vec4 tex = texture2D(atlas, vUv);
    if (tex.a < 0.01) discard;

    vec3 normal = normalize(vNormal);
    vec3 lightDir = normalize(sunDirection);

    // Diffuse lighting
    float NdotL = lambert(normal, lightDir);

    // Shadow
    vec3 shadowCoord = vShadowCoord.xyz / vShadowCoord.w;
    float shadow = sampleShadow(shadowCoord);

    // Combine: ambient + diffuse * shadow
    float lighting = 0.0;
    lighting += 0.15; // ambient floor
    lighting += NdotL * 0.85 * shadow;

    // Hemisphere: sky vs ground bounce
    float hemi = normal.y * 0.5 + 0.5; // 0.5..1.0 for upward normals
    lighting += hemi * 0.1;

    // Apply vertex color (AO * biome tint)
    vec3 baseColor = tex.rgb * vColor;

    // Light color
    vec3 finalColor = baseColor * (sunColor * lighting + ambientColor * 0.3);

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

    vec3 shadowCoord = vShadowCoord.xyz / vShadowCoord.w;
    float shadow = sampleShadow(shadowCoord);

    float lighting = 0.15 + NdotL * 0.8 * shadow;
    float hemi = normal.y * 0.5 + 0.5;
    lighting += hemi * 0.1;

    vec3 baseColor = tex.rgb * vColor;
    vec3 finalColor = baseColor * (sunColor * lighting + ambientColor * 0.3);

    float fogFactor = smoothstep(fogNear, fogFar, vFogDepth);
    finalColor = mix(finalColor, fogColor, fogFactor);

    gl_FragColor = vec4(finalColor, tex.a);
  }
`;

// ── Water fragment ──────────────────────────────────────────────────────────
const waterVert = /* glsl */ `
  attribute vec3 color;

  uniform mat4 modelMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  uniform mat4 modelViewMatrix;
  uniform float time;

  varying vec2 vUv;
  varying vec3 vWorldPos;
  varying vec3 vNormal;

  void main() {
    vec3 pos = position;

    // Animate water surface with sine waves
    float wave1 = sin(pos.x * 1.2 + time * 1.5) * 0.06;
    float wave2 = cos(pos.z * 0.9 + time * 1.1) * 0.04;
    pos.y += wave1 + wave2;

    vec4 worldPos = modelMatrix * vec4(pos, 1.0);
    vWorldPos = worldPos.xyz;
    vUv = uv;
    vNormal = normalize(mat3(modelMatrix) * normal);

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
    // Animated UV scroll for ripple effect
    vec2 scrolledUv = vUv + vec2(time * 0.02, time * 0.015);

    // Water base color with wave variation
    vec3 waterBase = vec3(0.12, 0.24, 0.65);
    float wavePattern = sin(scrolledUv.x * 12.0 + time * 2.0) *
                        cos(scrolledUv.y * 10.0 + time * 1.5) * 0.15;
    vec3 waterColor = waterBase + vec3(wavePattern * 0.3, wavePattern * 0.4, wavePattern * 0.2);

    // Simple specular highlight from sun
    vec3 viewDir = normalize(-vWorldPos);
    vec3 halfVec = normalize(normalize(sunDirection) + viewDir);
    float spec = pow(max(dot(vNormal, halfVec), 0.0), 64.0) * 0.6;

    // Diffuse
    float NdotL = max(dot(vNormal, normalize(sunDirection)), 0.0);
    float lighting = 0.3 + NdotL * 0.5;

    vec3 finalColor = waterColor * lighting + vec3(spec);

    // Rim highlight
    float rim = 1.0 - max(dot(viewDir, vNormal), 0.0);
    rim = pow(rim, 3.0) * 0.25;
    finalColor += vec3(rim);

    // Fog
    vec3 fragPos = vWorldPos;
    float dist = length(fragPos);
    float fogFactor = smoothstep(fogNear, fogFar, dist);
    finalColor = mix(finalColor, fogColor, fogFactor);

    gl_FragColor = vec4(finalColor, 0.55);
  }
`;

// ── Material factory ────────────────────────────────────────────────────────

/**
 * Create the opaque terrain material.
 * @param {THREE.CanvasTexture} atlasTexture - the block texture atlas
 * @returns {THREE.ShaderMaterial}
 */
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
      shadowBias: { value: -0.0005 },
    },
    side: THREE.FrontSide,
  });
}

/**
 * Create the transparent block material (leaves, glass, plants).
 * @param {THREE.CanvasTexture} atlasTexture
 * @returns {THREE.ShaderMaterial}
 */
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
      shadowBias: { value: -0.0005 },
    },
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    polygonOffset: true,
    polygonOffsetFactor: -1,
  });
}

/**
 * Create the water material.
 * @param {THREE.Color} fogColor
 * @returns {THREE.ShaderMaterial}
 */
export function createWaterMaterial(fogColor) {
  return new THREE.ShaderMaterial({
    vertexShader: waterVert,
    fragmentShader: waterFrag,
    uniforms: {
      time: { value: 0.0 },
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

/**
 * Update all material uniforms that change at runtime (sun position, fog, time, shadows).
 * Call once per frame before rendering.
 *
 * @param {object} params
 * @param {THREE.ShaderMaterial} params.opaqueMat
 * @param {THREE.ShaderMaterial} params.transMat
 * @param {THREE.ShaderMaterial} params.waterMat
 * @param {THREE.DirectionalLight} params.sun
 * @param {THREE.Color} params.fogColor
 * @param {number} params.fogNear
 * @param {number} params.fogFar
 * @param {number} params.time
 * @param {THREE.Matrix4} params.shadowMatrix
 * @param {THREE.WebGLRenderTarget} [params.shadowTarget]
 */
export function updateShaderUniforms({ opaqueMat, transMat, waterMat, sun, fogColor, fogNear, fogFar, time, shadowMatrix, shadowTarget }) {
  const sunDir = new THREE.Vector3().subVectors(sun.position, sun.target.position).normalize();

  if (opaqueMat) {
    opaqueMat.uniforms.sunDirection.value.copy(sunDir);
    opaqueMat.uniforms.sunColor.value.copy(sun.color);
    opaqueMat.uniforms.fogColor.value.copy(fogColor);
    opaqueMat.uniforms.fogNear.value = fogNear;
    opaqueMat.uniforms.fogFar.value = fogFar;
    if (shadowMatrix) opaqueMat.uniforms.shadowMatrix.value.copy(shadowMatrix);
    if (shadowTarget && shadowTarget.texture) opaqueMat.uniforms.shadowMap.value = shadowTarget.texture;
  }

  if (transMat) {
    transMat.uniforms.sunDirection.value.copy(sunDir);
    transMat.uniforms.sunColor.value.copy(sun.color);
    transMat.uniforms.fogColor.value.copy(fogColor);
    transMat.uniforms.fogNear.value = fogNear;
    transMat.uniforms.fogFar.value = fogFar;
    if (shadowMatrix) transMat.uniforms.shadowMatrix.value.copy(shadowMatrix);
    if (shadowTarget && shadowTarget.texture) transMat.uniforms.shadowMap.value = shadowTarget.texture;
  }

  if (waterMat) {
    waterMat.uniforms.time.value = time;
    waterMat.uniforms.fogColor.value.copy(fogColor);
    waterMat.uniforms.fogNear.value = fogNear;
    waterMat.uniforms.fogFar.value = fogFar;
    waterMat.uniforms.sunDirection.value.copy(sunDir);
  }
}
