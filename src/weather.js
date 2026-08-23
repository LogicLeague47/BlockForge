import * as THREE from 'three';
import { BIOMES } from './constants.js';

const RAIN_HALF = 12;
const RAIN_HEIGHT = 30;
// Mobile is kept well below desktop so the weather particle loop doesn't add
// ~1-2ms/frame of CPU + fill-rate on a weak phone.
const RAIN_COUNT = ('ontouchstart' in window && navigator.maxTouchPoints > 0) ? 500 : 2000;

const SNOW_HALF = 12;
const SNOW_HEIGHT = 25;
const SNOW_COUNT = ('ontouchstart' in window && navigator.maxTouchPoints > 0) ? 250 : 1000;

const TRANSITION_DURATION = 30;

const BIOME_PROB = {
  [BIOMES.DESERT]:      0,
  [BIOMES.SAVANNA]:     0,
  [BIOMES.JUNGLE]:      0.5,
  [BIOMES.FOREST]:      0.3,
  [BIOMES.BIRCH_FOREST]:0.3,
  [BIOMES.DARK_FOREST]: 0.3,
  [BIOMES.TAIGA]:       0.3,
  [BIOMES.SWAMP]:       0.3,
  [BIOMES.SNOWY]:      -0.4,
  [BIOMES.PLAINS]:      0.15,
  [BIOMES.MOUNTAINS]:   0.2,
  [BIOMES.OCEAN]:       0.2,
  [BIOMES.DEEP_OCEAN]:  0.2,
  [BIOMES.BEACH]:       0.15,
  [BIOMES.RIVER]:       0.2,
};

export class WeatherSystem {
  constructor(scene) {
    this.scene = scene;

    this.state = 'clear';
    this.rainIntensity = 0;
    this.snowIntensity = 0;
    this.thunderFlashIntensity = 0;
    this._targetRain = 0;
    this._targetSnow = 0;

    this.weatherTimer = 0;
    this.weatherDuration = 300 + Math.random() * 300;

    this.thunderTimer = 3 + Math.random() * 5;
    this.lightningPos = new THREE.Vector3();

    this.splashParticles = [];

    // Pooled splash geometry + material (avoids new allocation per splash)
    this._splashGeo = new THREE.BoxGeometry(0.03, 0.03, 0.03);
    this._splashMat = new THREE.MeshBasicMaterial({ color: 0x88aacc, transparent: true, opacity: 0.5 });

    this._createRainTexture();
    this._createSnowTexture();
    this._createRainSystem();
    this._createSnowSystem();
  }

  _createRainTexture() {
    const c = document.createElement('canvas');
    c.width = 4; c.height = 32;
    const ctx = c.getContext('2d');
    const g = ctx.createLinearGradient(0, 0, 0, 32);
    g.addColorStop(0, 'rgba(180,210,255,0)');
    g.addColorStop(0.15, 'rgba(180,210,255,0.7)');
    g.addColorStop(0.5, 'rgba(180,210,255,1)');
    g.addColorStop(0.85, 'rgba(180,210,255,0.7)');
    g.addColorStop(1, 'rgba(180,210,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(1, 0, 2, 32);
    this.rainTexture = new THREE.CanvasTexture(c);
  }

  _createSnowTexture() {
    const c = document.createElement('canvas');
    c.width = 16; c.height = 16;
    const ctx = c.getContext('2d');
    const g = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.3, 'rgba(255,255,255,0.9)');
    g.addColorStop(0.7, 'rgba(255,255,255,0.4)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 16, 16);
    this.snowTexture = new THREE.CanvasTexture(c);
  }

  _createRainSystem() {
    const pos = new Float32Array(RAIN_COUNT * 3);
    this.rainVel = new Float32Array(RAIN_COUNT);
    for (let i = 0; i < RAIN_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * RAIN_HALF * 2;
      pos[i * 3 + 1] = Math.random() * RAIN_HEIGHT;
      pos[i * 3 + 2] = (Math.random() - 0.5) * RAIN_HALF * 2;
      this.rainVel[i] = 20 * (0.85 + Math.random() * 0.3);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({
      map: this.rainTexture,
      color: 0x99bbdd,
      size: 0.25,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    this.rainMesh = new THREE.Points(geo, mat);
    this.rainMesh.visible = false;
    this.scene.add(this.rainMesh);
    this._rainPos = pos;
  }

  _createSnowSystem() {
    const pos = new Float32Array(SNOW_COUNT * 3);
    this.snowVel = new Float32Array(SNOW_COUNT);
    this.snowSway = new Float32Array(SNOW_COUNT);
    this.snowPhase = new Float32Array(SNOW_COUNT);
    for (let i = 0; i < SNOW_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * SNOW_HALF * 2;
      pos[i * 3 + 1] = Math.random() * SNOW_HEIGHT;
      pos[i * 3 + 2] = (Math.random() - 0.5) * SNOW_HALF * 2;
      this.snowVel[i] = 4 * (0.7 + Math.random() * 0.6);
      this.snowSway[i] = 0.3 + Math.random() * 0.4;
      this.snowPhase[i] = Math.random() * Math.PI * 2;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({
      map: this.snowTexture,
      color: 0xffffff,
      size: 0.25,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    this.snowMesh = new THREE.Points(geo, mat);
    this.snowMesh.visible = false;
    this.scene.add(this.snowMesh);
    this._snowPos = pos;
  }

  getRainIntensity() { return this.rainIntensity; }
  getThunderFlash()  { return this.thunderFlashIntensity; }

  setState(s) {
    this.state = s;
    this.weatherTimer = 0;
    this.weatherDuration = 120 + Math.random() * 480;
    if (s === 'clear') {
      this._targetRain = 0;
      this._targetSnow = 0;
    } else if (s === 'snow') {
      this._targetRain = 0;
      this._targetSnow = 1;
    } else {
      this._targetRain = 1;
      this._targetSnow = 0;
    }
  }

  update(playerPos, camera, time, dt, biome, worldRef) {
    if (!playerPos) return;

    this._cycleWeather(dt, biome);
    if (this.rainIntensity > 0.01) this._updateRainParticles(playerPos, dt, worldRef);
    if (this.snowIntensity > 0.01) this._updateSnowParticles(playerPos, time, dt);
    this._updateThunder(playerPos, dt);
    this._updateSplashParticles(dt);

    this.rainMesh.visible = this.rainIntensity > 0.01;
    this.snowMesh.visible = this.snowIntensity > 0.01;
    this.rainMesh.material.opacity = this.rainIntensity;
    this.snowMesh.material.opacity = this.snowIntensity;
  }

  _cycleWeather(dt, biome) {
    this.weatherTimer += dt;

    const rate = dt / TRANSITION_DURATION;
    if (this.rainIntensity < this._targetRain) {
      this.rainIntensity = Math.min(this._targetRain, this.rainIntensity + rate);
    } else if (this.rainIntensity > this._targetRain) {
      this.rainIntensity = Math.max(this._targetRain, this.rainIntensity - rate);
    }
    if (this.snowIntensity < this._targetSnow) {
      this.snowIntensity = Math.min(this._targetSnow, this.snowIntensity + rate);
    } else if (this.snowIntensity > this._targetSnow) {
      this.snowIntensity = Math.max(this._targetSnow, this.snowIntensity - rate);
    }

    if (this.weatherTimer < this.weatherDuration) return;
    this.weatherTimer = 0;

    const prob = BIOME_PROB[biome] ?? 0.15;

    if (this.state === 'clear') {
      let ns = 'clear';
      if (prob > 0 && Math.random() < prob) {
        ns = Math.random() < 0.25 ? 'thunder' : 'rain';
      } else if (prob < 0 && Math.random() < -prob) {
        ns = 'snow';
      }
      this.state = ns;
    } else {
      this.state = 'clear';
    }

    if (this.state === 'clear') {
      this._targetRain = 0;
      this._targetSnow = 0;
    } else if (this.state === 'snow') {
      this._targetRain = 0;
      this._targetSnow = 1;
    } else {
      this._targetRain = 1;
      this._targetSnow = 0;
    }

    this.weatherDuration = 120 + Math.random() * 480;
  }

  _updateRainParticles(playerPos, dt, worldRef) {
    const pos = this._rainPos;
    const px = playerPos.x, py = playerPos.y, pz = playerPos.z;
    const half = RAIN_HALF;
    const killY = py - 2;
    const respawnY = py + RAIN_HEIGHT;

    for (let i = 0; i < RAIN_COUNT; i++) {
      const i3 = i * 3;
      pos[i3 + 1] -= this.rainVel[i] * dt;
      if (pos[i3 + 1] < killY) {
        if (Math.random() < 0.08) {
          this._spawnSplash(pos[i3], killY, pos[i3 + 2]);
        }
        pos[i3] = px + (Math.random() - 0.5) * half * 2;
        pos[i3 + 1] = respawnY + Math.random() * 5;
        pos[i3 + 2] = pz + (Math.random() - 0.5) * half * 2;
        continue;
      }
      if (worldRef) {
        const bx = Math.floor(pos[i3]), bz = Math.floor(pos[i3 + 2]);
        const surfaceY = worldRef.heightAt(bx, bz);
        if (surfaceY > 0 && pos[i3 + 1] <= surfaceY + 0.5) {
          if (Math.random() < 0.08) {
            this._spawnSplash(pos[i3], surfaceY + 0.5, pos[i3 + 2]);
          }
          pos[i3] = px + (Math.random() - 0.5) * half * 2;
          pos[i3 + 1] = respawnY + Math.random() * 5;
          pos[i3 + 2] = pz + (Math.random() - 0.5) * half * 2;
        }
      }
    }
    this.rainMesh.geometry.attributes.position.needsUpdate = true;
  }

  _updateSnowParticles(playerPos, time, dt) {
    const pos = this._snowPos;
    const px = playerPos.x, py = playerPos.y, pz = playerPos.z;
    const half = SNOW_HALF;
    const killY = py - 2;
    const respawnY = py + SNOW_HEIGHT;

    for (let i = 0; i < SNOW_COUNT; i++) {
      const i3 = i * 3;
      pos[i3 + 1] -= this.snowVel[i] * dt;
      pos[i3] += Math.sin(time * 0.5 + this.snowPhase[i]) * this.snowSway[i] * dt * 2;
      pos[i3 + 2] += Math.cos(time * 0.7 + this.snowPhase[i]) * this.snowSway[i] * dt * 1.5;
      if (pos[i3 + 1] < killY) {
        pos[i3] = px + (Math.random() - 0.5) * half * 2;
        pos[i3 + 1] = respawnY + Math.random() * 5;
        pos[i3 + 2] = pz + (Math.random() - 0.5) * half * 2;
      }
    }
    this.snowMesh.geometry.attributes.position.needsUpdate = true;
  }

  _updateThunder(playerPos, dt) {
    if (this.state !== 'thunder') {
      this.thunderFlashIntensity = 0;
      return;
    }

    if (this.thunderFlashIntensity > 0) {
      this.thunderFlashIntensity -= dt * 10;
      if (this.thunderFlashIntensity < 0) this.thunderFlashIntensity = 0;
    }

    this.thunderTimer -= dt;
    if (this.thunderTimer > 0) return;
    this.thunderTimer = 3 + Math.random() * 8;

    const angle = Math.random() * Math.PI * 2;
    const dist = 8 + Math.random() * 24;
    this.lightningPos.set(
      playerPos.x + Math.cos(angle) * dist,
      0,
      playerPos.z + Math.sin(angle) * dist
    );

    const ddx = this.lightningPos.x - playerPos.x;
    const ddz = this.lightningPos.z - playerPos.z;
    const distSq = ddx * ddx + ddz * ddz;
    const euclidDist = Math.sqrt(distSq);
    const intensity = Math.max(0.2, 1 - euclidDist / 32) * (0.6 + Math.random() * 0.4);
    this.thunderFlashIntensity = intensity;

    window.dispatchEvent(new CustomEvent('weather-thunder', {
      detail: { delay: euclidDist / 343, intensity, x: this.lightningPos.x, z: this.lightningPos.z }
    }));
  }

  _spawnSplash(x, y, z) {
    const m = new THREE.Mesh(this._splashGeo, this._splashMat);
    m.position.set(x, y, z);
    this.scene.add(m);
    this.splashParticles.push({
      mesh: m, vx: (Math.random() - 0.5) * 0.5, vy: 0.8 + Math.random() * 0.5,
      vz: (Math.random() - 0.5) * 0.5, life: 0.3, maxLife: 0.3,
    });
  }

  _updateSplashParticles(dt) {
    for (let i = this.splashParticles.length - 1; i >= 0; i--) {
      const p = this.splashParticles[i];
      p.life -= dt;
      if (p.life <= 0) {
        this.scene.remove(p.mesh);
        this.splashParticles[i] = this.splashParticles[this.splashParticles.length - 1];
        this.splashParticles.length--;
      }
    }
  }

  clear() {
    if (this.rainMesh) {
      this.scene.remove(this.rainMesh);
      this.rainMesh.geometry.dispose();
      this.rainMesh.material.dispose();
      this.rainMesh = null;
    }
    if (this.snowMesh) {
      this.scene.remove(this.snowMesh);
      this.snowMesh.geometry.dispose();
      this.snowMesh.material.dispose();
      this.snowMesh = null;
    }
    if (this.rainTexture) this.rainTexture.dispose();
    if (this.snowTexture) this.snowTexture.dispose();

    for (const p of this.splashParticles) {
      this.scene.remove(p.mesh);
    }
    this.splashParticles = [];
    if (this._splashGeo) this._splashGeo.dispose();
    if (this._splashMat) this._splashMat.dispose();
  }
}
