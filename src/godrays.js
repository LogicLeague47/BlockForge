// Screen-space god rays (volumetric light scattering) post-processing.
//
// Algorithm:
//   1. Render scene normally (already done by Three.js)
//   2. Extract bright pixels (sky + sun disk) to a smaller buffer
//   3. Two-pass Gaussian blur (horizontal + vertical)
//   4. Radial blur from sun's screen position (the "ray march")
//   5. Additively blend result onto the scene
//
// Uses Three.js EffectComposer + ShaderPass from addons.

import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

// ── Brightness extraction shader ───────────────────────────────────────────
const ExtractBrightShader = {
  uniforms: {
    tDiffuse: { value: null },
    luminanceThreshold: { value: 0.7 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float luminanceThreshold;
    varying vec2 vUv;

    void main() {
      vec4 color = texture2D(tDiffuse, vUv);
      float luma = dot(color.rgb, vec3(0.299, 0.587, 0.114));
      float soft = smoothstep(luminanceThreshold - 0.1, luminanceThreshold + 0.2, luma);
      gl_FragColor = vec4(color.rgb * soft, 1.0);
    }
  `,
};

// ── Gaussian blur shader (configurable direction) ──────────────────────────
const BlurShader = {
  uniforms: {
    tDiffuse: { value: null },
    direction: { value: new THREE.Vector2(1, 0) },
    resolution: { value: new THREE.Vector2(1, 1) },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform vec2 direction;
    uniform vec2 resolution;
    varying vec2 vUv;

    void main() {
      vec2 texelSize = direction / resolution;
      vec4 result = vec4(0.0);

      result += texture2D(tDiffuse, vUv - 4.0 * texelSize) * 0.0162;
      result += texture2D(tDiffuse, vUv - 3.0 * texelSize) * 0.0540;
      result += texture2D(tDiffuse, vUv - 2.0 * texelSize) * 0.1216;
      result += texture2D(tDiffuse, vUv - 1.0 * texelSize) * 0.1945;
      result += texture2D(tDiffuse, vUv)                   * 0.2274;
      result += texture2D(tDiffuse, vUv + 1.0 * texelSize) * 0.1945;
      result += texture2D(tDiffuse, vUv + 2.0 * texelSize) * 0.1216;
      result += texture2D(tDiffuse, vUv + 3.0 * texelSize) * 0.0540;
      result += texture2D(tDiffuse, vUv + 4.0 * texelSize) * 0.0162;

      gl_FragColor = result;
    }
  `,
};

// ── Radial blur shader (the actual god ray effect) ─────────────────────────
const GodRayShader = {
  uniforms: {
    tDiffuse: { value: null },
    tScene: { value: null },
    sunScreenPos: { value: new THREE.Vector2(0.5, 0.5) },
    intensity: { value: 0.8 },
    decay: { value: 0.96 },
    density: { value: 0.8 },
    weight: { value: 0.4 },
    samples: { value: 40 },
    rayLength: { value: 1.0 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform sampler2D tScene;
    uniform vec2 sunScreenPos;
    uniform float intensity;
    uniform float decay;
    uniform float density;
    uniform float weight;
    uniform int samples;
    uniform float rayLength;
    varying vec2 vUv;

    void main() {
      vec4 sceneColor = texture2D(tScene, vUv);

      vec2 deltaTextCoord = vUv - sunScreenPos;
      deltaTextCoord *= (1.0 / float(samples)) * density * rayLength;

      vec2 uv = vUv;
      vec4 result = vec4(0.0);
      float illuminationDecay = 1.0;

      for (int i = 0; i < 60; i++) {
        if (i >= samples) break;
        uv -= deltaTextCoord;
        vec4 sam = texture2D(tDiffuse, uv);
        sam *= illuminationDecay * weight;
        result += sam;
        illuminationDecay *= decay;
      }

      vec3 godRays = result.rgb * intensity;
      vec3 finalColor = sceneColor.rgb + godRays;

      // Reinhard tone mapping
      finalColor = finalColor / (finalColor + vec3(1.0));

      gl_FragColor = vec4(finalColor, sceneColor.a);
    }
  `,
};

// ── GodRayPass class ───────────────────────────────────────────────────────

export class GodRayPass {
  /**
   * @param {THREE.WebGLRenderer} renderer
   * @param {THREE.Scene} scene
   * @param {THREE.Camera} camera
   * @param {THREE.DirectionalLight} sun
   */
  constructor(renderer, scene, camera, sun) {
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
    this.sun = sun;
    this.enabled = true;
    this.intensity = 0.8;

    const w = Math.floor(window.innerWidth / 2);
    const h = Math.floor(window.innerHeight / 2);

    const rtOpts = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: THREE.HalfFloatType,
    };

    this.rtBright = new THREE.WebGLRenderTarget(w, h, rtOpts);

    this.sceneRT = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
    });

    this.extractPass = new ShaderPass(ExtractBrightShader);

    this.blurHPass = new ShaderPass(BlurShader);
    this.blurHPass.uniforms.direction.value.set(1, 0);
    this.blurHPass.uniforms.resolution.value.set(w, h);

    this.blurVPass = new ShaderPass(BlurShader);
    this.blurVPass.uniforms.direction.value.set(0, 1);
    this.blurVPass.uniforms.resolution.value.set(w, h);

    this.godRayPass = new ShaderPass(GodRayShader);

    this.blurComposer = new EffectComposer(renderer, this.rtBright);
    this.blurComposer.addPass(this.extractPass);
    this.blurComposer.addPass(this.blurHPass);
    this.blurComposer.addPass(this.blurVPass);

    this._onResize = () => this._resize();
    window.addEventListener('resize', this._onResize);
  }

  _resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const hw = Math.floor(w / 2);
    const hh = Math.floor(h / 2);

    this.sceneRT.setSize(w, h);
    this.rtBright.setSize(hw, hh);

    this.blurComposer.setSize(hw, hh);
  }

  _getSunScreenPos() {
    const sunPos = this.sun.position.clone();
    sunPos.project(this.camera);
    return new THREE.Vector2(
      (sunPos.x + 1) * 0.5,
      (sunPos.y + 1) * 0.5,
    );
  }

  /**
   * @param {number} sunHeight - 0..1, 1 = full sun overhead, 0 = horizon/night
   * @returns {boolean} true if rendered, false if skipped
   */
  render(sunHeight) {
    if (!this.enabled) return false;

    const rayIntensity = this.intensity * Math.max(0, sunHeight);
    if (rayIntensity < 0.01) return false;

    // Render scene to texture
    this.renderer.setRenderTarget(this.sceneRT);
    this.renderer.render(this.scene, this.camera);
    this.renderer.setRenderTarget(null);

    // Extract bright pixels + blur
    this.extractPass.uniforms.tDiffuse.value = this.sceneRT.texture;
    this.blurComposer.render();

    // Radial blur + composite
    const sunUV = this._getSunScreenPos();
    this.godRayPass.uniforms.tDiffuse.value = this.blurComposer.renderTarget2.texture;
    this.godRayPass.uniforms.tScene.value = this.sceneRT.texture;
    this.godRayPass.uniforms.sunScreenPos.value.copy(sunUV);
    this.godRayPass.uniforms.intensity.value = rayIntensity;

    this.renderer.setRenderTarget(null);
    this.godRayPass.renderToScreen = true;
    this.godRayPass.render(this.renderer, null, this.sceneRT);

    return true;
  }

  dispose() {
    window.removeEventListener('resize', this._onResize);
    this.sceneRT.dispose();
    this.rtBright.dispose();
    this.blurComposer.dispose?.();
  }
}
