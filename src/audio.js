// Footstep sounds + music player via the Web Audio API.
// CC0 footstep samples from Kenney and Fantozzi (OpenGameArt).

import { assetBase } from './config.js';
function assetUrl(p) { return assetBase() + String(p).replace(/^\//, ''); }

export class Audio {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.master = null;
    this.musicGain = null;
    this._stepCooldown = 0;
    this._musicPlaying = false;
    this._musicEl = null;
    this._buffers = {};
  }

  init() {
    if (this.ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    this.ctx = new AC();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.6;
    this.master.connect(this.ctx.destination);

    this.musicGain = this.ctx.createGain();
    this.musicGain.gain.value = 0.3;
    this.musicGain.connect(this.ctx.destination);

    this._initMusic();
    this._loadBuffers();

    const ctx = this.ctx;
    document.addEventListener('touchend', () => {
      if (ctx && ctx.state === 'suspended') ctx.resume();
    }, { passive: true });
  }

  async _loadBuffers() {
    const names = [
      'stone_step1','stone_step2','stone_step3',
      'dirt_step1','dirt_step2','dirt_step3',
      'wood_step1','wood_step2','wood_step3',
      'snow_step1','snow_step2','snow_step3',
      'gravel_step1','gravel_step2',
      'sand_step1',
      'Fantozzi-StoneL1','Fantozzi-StoneL2','Fantozzi-StoneL3',
      'Fantozzi-StoneR1','Fantozzi-StoneR2','Fantozzi-StoneR3',
      'Fantozzi-SandL1','Fantozzi-SandL2','Fantozzi-SandL3',
      'Fantozzi-SandR1','Fantozzi-SandR2','Fantozzi-SandR3',
    ];
    for (const name of names) {
      try {
        const resp = await fetch(assetUrl(`/Sounds/${name}.ogg`));
        if (!resp.ok) continue;
        const arr = await resp.arrayBuffer();
        this._buffers[name] = await this.ctx.decodeAudioData(arr);
      } catch (_) {}
    }
  }

  _playBuf(arr, vol = 0.5, pitchVar = 0) {
    if (!this.ctx || !this.enabled || !arr || !arr.length) return;
    const buf = arr[(Math.random() * arr.length) | 0];
    if (!buf) return;
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    if (pitchVar) src.playbackRate.value = 1 + (Math.random() - 0.5) * pitchVar;
    const g = this.ctx.createGain();
    g.gain.value = vol;
    src.connect(g);
    g.connect(this.master);
    src.onended = () => { try { g.disconnect(); } catch (_) {} };
    src.start();
  }

  _bufs(...names) {
    return names.map(n => this._buffers[n]).filter(Boolean);
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
  }

  _initMusic() {
    this._musicPaths = [
      '/Music/Main1.mp3',
      '/Music/Main2.mp3',
      '/Music/Calm1.mp3',   // CC0 — josepharaoh99 "Calm Ambient 1"
      '/Music/Calm2.mp3',   // CC0 — josepharaoh99 "Calm Piano 1"
      '/Music/Calm3.mp3',   // CC0 — josepharaoh99 "Calm Ambient 3"
      '/Music/ANewTown.mp3',  // CC0 — cynicmusic "A New Town (RPG Theme)"
      '/Music/CalmPiano.mp3', // CC0 — cynicmusic "Calm Piano 1 (Vaporware)"
      '/Music/AnotherAugust.mp3', // CC0 — cynicmusic "Another August"
    ];
    this._musicIdx = (Math.random() * this._musicPaths.length) | 0;
  }

  _playNextTrack() {
    if (!this._musicWanted) return;
    if (this._musicEl) {
      this._musicEl.pause();
      this._musicEl.removeEventListener('ended', this._onMusicEnd);
    }
    this._musicIdx = (this._musicIdx + 1) % this._musicPaths.length;
    const el = document.createElement('audio');
    el.src = assetUrl(this._musicPaths[this._musicIdx]);
    el.volume = 0;
    el.loop = false;
    this._onMusicEnd = () => {
      this._musicPlaying = false;
      setTimeout(() => this._playNextTrack(), 2000 + Math.random() * 4000);
    };
    el.addEventListener('ended', this._onMusicEnd);
    this._musicEl = el;
    el.play().then(() => {
      this._musicPlaying = true;
      this._fadeIn(el, 0.25, 4);
    }).catch(() => {
      // blocked by autoplay — retry on next gesture
      this._musicPlaying = false;
    });
  }

  _fadeIn(el, target, dur) {
    el.volume = 0;
    const step = target / (dur * 30);
    const iv = setInterval(() => {
      if (!el || el.paused) { clearInterval(iv); return; }
      el.volume = Math.min(el.volume + step, target);
      if (el.volume >= target) clearInterval(iv);
    }, 1000 / 30);
  }

  startMusic() {
    this._musicWanted = true;
    if (this._musicPlaying) return;
    if (!this.ctx) return;
    this._playNextTrack();
  }

  stopMusic() {
    this._musicWanted = false;
    if (this._musicEl) {
      this._musicEl.pause();
      this._musicPlaying = false;
    }
  }

  // ── CORE PRIMITIVES ──────────────────────────────────────────────────

  _noise(len, sr) {
    const buf = this.ctx.createBuffer(1, len, sr);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    return buf;
  }

  _brownNoise(len, sr) {
    const buf = this.ctx.createBuffer(1, len, sr);
    const d = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < len; i++) {
      last = (last + (Math.random() * 2 - 1) * 0.1) * 0.97;
      d[i] = last * 4;
    }
    return buf;
  }

  _pinkNoise(len, sr) {
    const buf = this.ctx.createBuffer(1, len, sr);
    const d = buf.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + w * 0.0555179;
      b1 = 0.99332 * b1 + w * 0.0750759;
      b2 = 0.96900 * b2 + w * 0.1538520;
      b3 = 0.86650 * b3 + w * 0.3104856;
      b4 = 0.55000 * b4 + w * 0.5329522;
      b5 = -0.7616 * b5 - w * 0.0168980;
      d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11;
      b6 = w * 0.115926;
    }
    return buf;
  }

  _src(buf, loop = false) {
    const s = this.ctx.createBufferSource();
    s.buffer = buf;
    s.loop = loop;
    return s;
  }

  _filter(type, freq, q = 1) {
    const f = this.ctx.createBiquadFilter();
    f.type = type;
    f.frequency.value = freq;
    f.Q.value = q;
    return f;
  }

  _gain(val) {
    const g = this.ctx.createGain();
    g.gain.value = val;
    return g;
  }

  _envGain(gain, peak, dur, attackFrac = 0.05, releaseFrac = 0.3) {
    const t = this.ctx.currentTime;
    const atk = dur * attackFrac;
    const rel = dur * releaseFrac;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(peak, t + atk);
    gain.gain.setValueAtTime(peak, t + dur - rel);
    gain.gain.linearRampToValueAtTime(0, t + dur);
  }

  // Play a layered sound from a definition array
  _playLayers(layers, pitchVar = 0) {
    if (!this.ctx || !this.enabled || !layers) return;
    if (!Number.isFinite(pitchVar)) pitchVar = 0;
    for (const L of layers) {
      const pv = pitchVar * (Math.random() * 0.4 + 0.8);
      const dur = L.dur || 0.1;
      const gain = L.gain || 0.3;

      // tonal (oscillator)
      if (L.wave) {
        const osc = this.ctx.createOscillator();
        const g = this._gain(0);
        osc.type = L.wave;
        osc.frequency.value = (L.freq || 440) + pv;
        this._envGain(g, gain, dur, 0.01, 0.4);
        osc.connect(g);
        g.connect(this.master);
        osc.onended = () => { try { g.disconnect(); } catch (_) {} };
        osc.start();
        osc.stop(this.ctx.currentTime + dur + 0.02);
        continue;
      }

      // noise-based
      let buf;
      if (L.noise === 'brown') buf = this._brownNoise(Math.floor(this.ctx.sampleRate * dur), this.ctx.sampleRate);
      else if (L.noise === 'pink') buf = this._pinkNoise(Math.floor(this.ctx.sampleRate * dur), this.ctx.sampleRate);
      else buf = this._noise(Math.floor(this.ctx.sampleRate * dur), this.ctx.sampleRate);

      const src = this._src(buf);
      const chain = [];

      if (L.hp) chain.push(this._filter('highpass', L.hp + pv, L.hq || 0.7));
      if (L.bp) chain.push(this._filter('bandpass', L.bp + pv, L.bq || 1));
      if (L.lp) chain.push(this._filter('lowpass', L.lp + pv, L.lq || 1));

      const g = this._gain(0);
      this._envGain(g, gain, dur, L.atk || 0.01, L.rel || 0.3);
      chain.push(g);

      // connect chain
      src.connect(chain[0]);
      for (let i = 1; i < chain.length; i++) chain[i - 1].connect(chain[i]);
      chain[chain.length - 1].connect(this.master);
      src.onended = () => {
        for (const n of chain) { try { n.disconnect(); } catch (_) {} }
      };

      src.start();
      src.stop(this.ctx.currentTime + dur + 0.05);
    }
  }

  // ── BLOCK STEP SOUNDS ────────────────────────────────────────────────

  _stone_step() {
    const b = this._bufs('stone_step1','stone_step2','stone_step3','Fantozzi-StoneL1','Fantozzi-StoneL2','Fantozzi-StoneL3','Fantozzi-StoneR1','Fantozzi-StoneR2','Fantozzi-StoneR3');
    if (b.length) return this._playBuf(b, 0.35, 0.12);
    this._playLayers([
      { noise: 'brown', dur: 0.08, gain: 0.3, lp: 400, atk: 0.005, rel: 0.25 },
      { noise: 'white', dur: 0.05, gain: 0.2, bp: 2000, bq: 1.5, atk: 0.003, rel: 0.2 },
    ]);
  }

  // DIRT: Soft, muffled, earthy — low thud with damp grain
  _dirt_step() {
    if (this._buffers.dirt_step1) {
      return this._playBuf([this._buffers.dirt_step1, this._buffers.dirt_step2, this._buffers.dirt_step3], 0.25, 0.12);
    }
    this._playLayers([
      { noise: 'brown', dur: 0.06, gain: 0.2, lp: 250, atk: 0.01, rel: 0.3 },
      { noise: 'pink', dur: 0.04, gain: 0.1, lp: 500, atk: 0.01, rel: 0.25 },
    ]);
  }

  // WOOD: Hollow, resonant, warm — snap with body
  _wood_step() {
    if (this._buffers.wood_step1) {
      return this._playBuf([this._buffers.wood_step1, this._buffers.wood_step2, this._buffers.wood_step3], 0.3, 0.12);
    }
    this._playLayers([
      { noise: 'white', dur: 0.05, gain: 0.2, bp: 800, bq: 2, atk: 0.003, rel: 0.15 },
      { wave: 'sine', freq: 280, dur: 0.08, gain: 0.1, atk: 0.005, rel: 0.2 },
    ]);
  }

  // LEAVES: Light, airy, wispy — delicate rustle
  _leaves_step() {
    this._playLayers([
      { noise: 'white', dur: 0.04, gain: 0.1, hp: 5000, atk: 0.005, rel: 0.15 },
      { noise: 'pink', dur: 0.03, gain: 0.06, bp: 3500, bq: 0.5, atk: 0.008, rel: 0.2 },
    ]);
  }

  // SAND: Granular, gritty, loose — hiss with fine scatter
  _sand_step() {
    const b = this._bufs('sand_step1','Fantozzi-SandL1','Fantozzi-SandL2','Fantozzi-SandL3','Fantozzi-SandR1','Fantozzi-SandR2','Fantozzi-SandR3');
    if (b.length) return this._playBuf(b, 0.2, 0.12);
    this._playLayers([
      { noise: 'white', dur: 0.06, gain: 0.2, bp: 3500, bq: 0.6, atk: 0.003, rel: 0.15 },
      { noise: 'white', dur: 0.04, gain: 0.12, hp: 6000, atk: 0.002, rel: 0.12 },
    ]);
  }

  // GLASS: Sharp, brittle, tinkling — high crackle
  _glass_step() {
    this._playLayers([
      { noise: 'white', dur: 0.03, gain: 0.2, hp: 5000, hq: 1.5, atk: 0.001, rel: 0.04 },
      { wave: 'sine', freq: 2000, dur: 0.04, gain: 0.1, atk: 0.001, rel: 0.05 },
    ]);
  }

  // SNOW: Soft powdery crunch — light, airy, compressed
  _snow_step() {
    if (this._buffers.snow_step1) {
      return this._playBuf([this._buffers.snow_step1, this._buffers.snow_step2, this._buffers.snow_step3], 0.2, 0.12);
    }
    this._playLayers([
    { noise: 'white', dur: 0.06, gain: 0.15, hp: 3500, hq: 0.4, atk: 0.005, rel: 0.15 },
    { noise: 'pink', dur: 0.04, gain: 0.08, bp: 1800, bq: 0.5, atk: 0.008, rel: 0.18 },
    ]);
  }

  // GRAVEL: Loose rocky tumbling crunch — deeper than sand, more granular
  _gravel_step() {
    if (this._buffers.gravel_step1) {
      return this._playBuf([this._buffers.gravel_step1, this._buffers.gravel_step2], 0.25, 0.12);
    }
    this._playLayers([
    { noise: 'white', dur: 0.07, gain: 0.25, bp: 2200, bq: 0.7, atk: 0.003, rel: 0.15 },
    { noise: 'brown', dur: 0.05, gain: 0.12, lp: 700, atk: 0.005, rel: 0.18 },
    ]);
  }

  // METAL: Sharp metallic clank — bright, resonant ping
  _metal_step() {
    this._playLayers([
    { wave: 'square', freq: 1000, dur: 0.04, gain: 0.2, atk: 0.001, rel: 0.06 },
    { noise: 'white', dur: 0.03, gain: 0.15, hp: 3500, hq: 1.5, atk: 0.001, rel: 0.05 },
    ]);
  }

  // BRIMSTONE: Hot, crackling stone — fire undertone
  _brimstone_step() {
    this._playLayers([
      { noise: 'white', dur: 0.05, gain: 0.2, bp: 1600, bq: 1.2, atk: 0.003, rel: 0.12 },
      { noise: 'pink', dur: 0.04, gain: 0.1, hp: 2200, hq: 0.7, atk: 0.005, rel: 0.15 },
    ]);
  }

  // PLANT: Soft organic rustle — hay, flowers, leaves-adjacent
  _plant_step() {
    this._playLayers([
    { noise: 'white', dur: 0.04, gain: 0.1, hp: 3500, hq: 0.4, atk: 0.005, rel: 0.12 },
    { noise: 'pink', dur: 0.03, gain: 0.06, bp: 2200, bq: 0.5, atk: 0.008, rel: 0.15 },
    ]);
  }

  // LIQUID: Bubbling, gurgling — for lava
  _liquid_step() {
    this._playLayers([
    { noise: 'brown', dur: 0.08, gain: 0.2, bp: 500, bq: 1.8, atk: 0.005, rel: 0.15 },
    { wave: 'sine', freq: 200, dur: 0.06, gain: 0.1, atk: 0.008, rel: 0.12 },
    ]);
  }

  // ── PUBLIC API ───────────────────────────────────────────────────────

  step(blockId) {
    if (!this.ctx || !this.enabled) return;
    const now = this.ctx.currentTime;
    if (now - this._stepCooldown < 0.22) return;
    this._stepCooldown = now;

    switch (blockId) {
      // STONE family
      case 3: case 4: case 9: case 11: case 12: case 13: case 14: case 25: case 30: case 32: case 39: case 42: case 43: case 44: case 48: case 49: case 52: case 53: case 54: case 59: case 60: case 62: case 63: case 64: case 65: case 68: case 73: case 74: case 77: case 83:
        return this._stone_step();
      // DIRT family
      case 1: case 2: case 19: case 33: case 34: case 66: case 69: case 75:
        return this._dirt_step();
      // WOOD family
      case 5: case 10: case 17: case 20: case 21: case 24: case 26: case 27: case 35: case 38: case 40: case 55: case 56: case 57: case 58: case 61: case 67: case 76: case 78: case 79:
        return this._wood_step();
      // LEAVES family
      case 6: case 22: case 23: case 36:
        return this._leaves_step();
      // SAND family
      case 7: case 29: case 85:
        return this._sand_step();
      // GLASS family
      case 16: case 46: case 84:
        return this._glass_step();
      // SNOW family
      case 15: case 31: case 37:
        return this._snow_step();
      // GRAVEL
      case 18:
        return this._gravel_step();
      // BRIMSTONE
      case 28: case 45: case 82:
        return this._brimstone_step();
      // METAL
      case 50: case 51: case 81:
        return this._metal_step();
      // LIQUID
      case 80:
        return this._liquid_step();
      // PLANT
      case 41:
        return this._plant_step();
      default:
        return this._stone_step();
    }
  }

}
