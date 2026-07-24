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
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
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
      // Soft knee threshold
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

      // 9-tap Gaussian
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
    tDiffuse: { value: null },     // blurred bright pixels
    tScene: { value: null },       // original scene render
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

      // Ray direction from fragment toward sun
      vec2 deltaTextCoord = vUv - sunScreenPos;
      deltaTextCoord *= (1.0 / float(samples)) * density * rayLength;

      vec2 uv = vUv;
      vec4 result = vec4(0.0);
      float illuminationDecay = 1.0;

      for (int i = 0; i < 60; i++) {
        if (i >= samples) break;
        uv -= deltaTextCoord;
        vec4 sample = texture2D(tDiffuse, uv);
        sample *= illuminationDecay * weight;
        result += sample;
        illuminationDecay *= decay;
      }

      // Combine scene with god rays
      vec3 godRays = result.rgb * intensity;
      vec3 finalColor = sceneColor.rgb + godRays;

      // Tone mapping to prevent blowout
      finalColor = finalColor / (finalColor + vec3(1.0));

      // Gamma correction (Three.js uses sRGB output)
      finalColor = pow(finalColor, vec3(1.0 / 2.2));

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
   * @param {THREE.DirectionalLight} sun - the sun light (for position)
   */
  constructor(renderer, scene, camera, sun) {
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
    this.sun = sun;
    this.enabled = true;
    this.intensity = 0.8;

    // Half-resolution render targets for performance
    const w = Math.floor(window.innerWidth / 2);
    const h = Math.floor(window.innerHeight / 2);

    const rtOpts = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: THREE.HalfFloatType,
    };

    this.rtBright = new THREE.WebGLRenderTarget(w, h, rtOpts);
    this.rtBlurH = new THREE.WebGLRenderTarget(w, h, rtOpts);
    this.rtBlurV = new THREE.WebGLRenderTarget(w, h, rtOpts);

    // EffectComposer for the post-processing chain
    this.composer = new EffectComposer(renderer, this.rtBright);

    // Pass 1: Render scene (handled externally, we just use the scene buffer)
    // We'll use a custom approach: render scene to a texture first
    this.sceneRT = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
    });

    // Extract bright pixels
    this.extractPass = new ShaderPass(ExtractBrightShader);

    // Horizontal blur
    this.blurHPass = new ShaderPass(BlurShader);
    this.blurHPass.uniforms.direction.value.set(1, 0);
    this.blurHPass.uniforms.resolution.value.set(w, h);

    // Vertical blur
    this.blurVPass = new ShaderPass(BlurShader);
    this.blurVPass.uniforms.direction.value.set(0, 1);
    this.blurVPass.uniforms.resolution.value.set(w, h);

    // Final god ray composite
    this.godRayPass = new ShaderPass(GodRayShader);

    // Build the composer chain for the bright extraction + blur
    this.blurComposer = new EffectComposer(renderer, this.rtBright);
    this.blurComposer.addPass(this.extractPass);
    this.blurComposer.addPass(this.blurHPass);
    this.blurComposer.addPass(this.blurVPass);

    // Handle resize
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
    this.rtBlurH.setSize(hw, hh);
    this.rtBlurV.setSize(hw, hh);

    this.blurComposer.setSize(hw, hh);
    this.godRayPass.uniforms.resolution = { value: new THREE.Vector2(hw, hh) };
  }

  /**
   * Project sun position to screen space.
   * @returns {THREE.Vector2} normalized screen coordinates (0..1)
   */
  _getSunScreenPos() {
    const sunPos = this.sun.position.clone();
    sunPos.project(this.camera);
    // Convert from clip space (-1..1) to UV space (0..1)
    return new THREE.Vector2(
      (sunPos.x + 1) * 0.5,
      (sunPos.y + 1) * 0.5,
    );
  }

  /**
   * Run the full god ray pipeline. Call after rendering the main scene.
   * @param {number} timeOfDay - 0..1 for day/night cycle (affects intensity)
   * @returns {boolean} true if god rays were rendered, false if skipped
   */
  render(timeOfDay) {
    if (!this.enabled) return false;

    // Fade rays at night (full at noon, zero at night)
    // timeOfDay: 0 = midnight, 0.5 = noon, 1 = midnight
    const dayFactor = Math.max(0, Math.sin(timeOfDay * Math.PI));
    const rayIntensity = this.intensity * dayFactor;
    if (rayIntensity < 0.01) return false;

    // Step 1: Render scene to texture
    this.renderer.setRenderTarget(this.sceneRT);
    this.renderer.render(this.scene, this.camera);
    this.renderer.setRenderTarget(null);

    // Step 2: Extract bright pixels + blur
    this.extractPass.uniforms.tDiffuse.value = this.sceneRT.texture;
    this.blurComposer.render();

    // Step 3: Radial blur + composite
    const sunUV = this._getSunScreenPos();
    this.godRayPass.uniforms.tDiffuse.value = this.blurComposer.renderTarget2.texture;
    this.godRayPass.uniforms.tScene.value = this.sceneRT.texture;
    this.godRayPass.uniforms.sunScreenPos.value.copy(sunUV);
    this.godRayPass.uniforms.intensity.value = rayIntensity;

    // Render the final composite to screen
    this.renderer.setRenderTarget(null);
    this.godRayPass.renderToScreen = true;
    this.godRayPass.render(this.renderer, null, this.sceneRT);

    return true;
  }

  dispose() {
    window.removeEventListener('resize', this._onResize);
    this.sceneRT.dispose();
    this.rtBright.dispose();
    this.rtBlurH.dispose();
    this.rtBlurV.dispose();
    this.composer.dispose?.();
    this.blurComposer.dispose?.();
  }
}
