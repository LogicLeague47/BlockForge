// AudioManager: real CC0 sound samples (Kenney.nl, public domain) layered on
// top of fully procedural Web Audio synthesis as a fallback when samples are
// still loading or unavailable.

const SFX_FILES = [
  'footstep_concrete_000', 'footstep_concrete_001', 'footstep_concrete_002',
  'footstep_grass_000', 'footstep_grass_001', 'footstep_grass_002',
  'footstep_wood_000', 'footstep_wood_001', 'footstep_wood_002',
  'footstep_snow_000', 'footstep_snow_001', 'footstep_snow_002',
  'impactMining_000', 'impactMining_001', 'impactMining_002', 'impactMining_003',
  'impactGeneric_light_000', 'impactGeneric_light_001', 'impactGeneric_light_002',
  'impactBell_heavy_000', 'impactBell_heavy_001',
  'impactPunch_heavy_000', 'impactPunch_heavy_001', 'impactPunch_heavy_002',
  'impactPunch_medium_000', 'impactPunch_medium_001', 'impactPunch_medium_002',
  'impactSoft_heavy_000', 'impactSoft_heavy_001', 'impactSoft_heavy_002',
  'impactSoft_medium_000', 'impactSoft_medium_001', 'impactSoft_medium_002',
  'powerUp2',
  'click_001', 'click_002', 'click_003',
];

// Curated calm CC0 playlist. High-energy/percussive tracks are excluded to
// keep the ambience calm; the calm-* tracks are CC0 by The Cynic Project.
const MUSIC_TRACKS = [
  'Music/dreams-stasis.mp3', 'Music/eternity-2.mp3', 'Music/eternity-4.mp3',
  'Music/happy-flutes.mp3', 'Music/visions-1.mp3', 'Music/visions-2.mp3',
  'Music/visions-4.mp3', 'Music/visions-5.mp3', 'Music/water-owl.mp3',
  'Music/calm-synthwave-4k.mp3', 'Music/calm-synthwave-15k.mp3',
  'Music/calm-piano-vaporware.mp3', 'Music/calm-lifewave-2k.mp3',
  'Music/calm-lifewave.mp3',
];

const STEP_SAMPLES = {
  stone: ['footstep_concrete_000', 'footstep_concrete_001', 'footstep_concrete_002'],
  dirt: ['footstep_grass_000', 'footstep_grass_001', 'footstep_grass_002'],
  leaves: ['footstep_grass_000', 'footstep_grass_001', 'footstep_grass_002'],
  wood: ['footstep_wood_000', 'footstep_wood_001', 'footstep_wood_002'],
  sand: ['footstep_snow_000', 'footstep_snow_001', 'footstep_snow_002'],
  snow: ['footstep_snow_000', 'footstep_snow_001', 'footstep_snow_002'],
  gravel: ['footstep_concrete_000', 'footstep_concrete_001', 'footstep_concrete_002'],
  plant: ['footstep_grass_000', 'footstep_grass_001', 'footstep_grass_002'],
};

export class AudioManager {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.master = null;
    this.musicGain = null;
    this.sfx = {};
    this._sfxLoading = false;
    this._stepCooldown = 0;
    this._musicWanted = false;
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
    this.musicGain.gain.value = 0.6;
    this.musicGain.connect(this.master);

    const ctx = this.ctx;
    document.addEventListener('touchend', () => {
      if (ctx && ctx.state === 'suspended') ctx.resume();
    }, { passive: true });
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
  }

  loadSfx() {
    if (!this.ctx || this._sfxLoading) return;
    this._sfxLoading = true;
    for (const f of SFX_FILES) {
      fetch(`Sounds/${f}.ogg`)
        .then((r) => (r.ok ? r.arrayBuffer() : Promise.reject()))
        .then((buf) => this.ctx.decodeAudioData(buf))
        .then((ab) => { this.sfx[f] = ab; })
        .catch(() => {});
    }
  }

  // Play a decoded CC0 sample. Returns false (→ caller keeps the procedural
  // fallback) when the sample is missing or still loading.
  _sample(names, vol = 0.5, pitchVar = 0.06) {
    if (!this.ctx || !this.enabled) return false;
    if (Array.isArray(names)) {
      if (!names.length) return false;
      names = names[Math.floor(Math.random() * names.length)];
    }
    const buf = this.sfx[names];
    if (!buf) return false;
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    if (pitchVar) src.playbackRate.value = 1 + (Math.random() * 2 - 1) * pitchVar;
    const g = this._gain(vol);
    src.connect(g);
    g.connect(this.master);
    src.start();
    src.onended = () => { try { g.disconnect(); src.disconnect(); } catch (_) {} };
    return true;
  }

  // ── NOISE GENERATORS ──────────────────────────────────────────────────

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

  // ── LAYERED SOUND PLAYER ──────────────────────────────────────────────

  _playLayers(layers, pitchVar = 0) {
    if (!this.ctx || !this.enabled || !layers) return;
    if (!Number.isFinite(pitchVar)) pitchVar = 0;
    for (const L of layers) {
      const pv = pitchVar * (Math.random() * 0.4 + 0.8);
      const dur = L.dur || 0.1;
      const gain = L.gain || 0.3;

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

  // ── STEP SOUNDS ────────────────────────────────────────────────────────

  _stone_step() {
    this._playLayers([
      { noise: 'brown', dur: 0.08, gain: 0.3, lp: 400, atk: 0.005, rel: 0.25 },
      { noise: 'white', dur: 0.05, gain: 0.2, bp: 2000, bq: 1.5, atk: 0.003, rel: 0.2 },
    ]);
  }

  _dirt_step() {
    this._playLayers([
      { noise: 'brown', dur: 0.06, gain: 0.2, lp: 250, atk: 0.01, rel: 0.3 },
      { noise: 'pink', dur: 0.04, gain: 0.1, lp: 500, atk: 0.01, rel: 0.25 },
    ]);
  }

  _wood_step() {
    this._playLayers([
      { noise: 'white', dur: 0.05, gain: 0.2, bp: 800, bq: 2, atk: 0.003, rel: 0.15 },
      { wave: 'sine', freq: 280, dur: 0.08, gain: 0.1, atk: 0.005, rel: 0.2 },
    ]);
  }

  _leaves_step() {
    this._playLayers([
      { noise: 'white', dur: 0.04, gain: 0.1, hp: 5000, atk: 0.005, rel: 0.15 },
      { noise: 'pink', dur: 0.03, gain: 0.06, bp: 3500, bq: 0.5, atk: 0.008, rel: 0.2 },
    ]);
  }

  _sand_step() {
    this._playLayers([
      { noise: 'white', dur: 0.06, gain: 0.2, bp: 3500, bq: 0.6, atk: 0.003, rel: 0.15 },
      { noise: 'white', dur: 0.04, gain: 0.12, hp: 6000, atk: 0.002, rel: 0.12 },
    ]);
  }

  _glass_step() {
    this._playLayers([
      { noise: 'white', dur: 0.03, gain: 0.2, hp: 5000, hq: 1.5, atk: 0.001, rel: 0.04 },
      { wave: 'sine', freq: 2000, dur: 0.04, gain: 0.1, atk: 0.001, rel: 0.05 },
    ]);
  }

  _snow_step() {
    this._playLayers([
      { noise: 'white', dur: 0.06, gain: 0.15, hp: 3500, hq: 0.4, atk: 0.005, rel: 0.15 },
      { noise: 'pink', dur: 0.04, gain: 0.08, bp: 1800, bq: 0.5, atk: 0.008, rel: 0.18 },
    ]);
  }

  _gravel_step() {
    this._playLayers([
      { noise: 'white', dur: 0.07, gain: 0.25, bp: 2200, bq: 0.7, atk: 0.003, rel: 0.15 },
      { noise: 'brown', dur: 0.05, gain: 0.12, lp: 700, atk: 0.005, rel: 0.18 },
    ]);
  }

  _metal_step() {
    this._playLayers([
      { wave: 'square', freq: 1000, dur: 0.04, gain: 0.2, atk: 0.001, rel: 0.06 },
      { noise: 'white', dur: 0.03, gain: 0.15, hp: 3500, hq: 1.5, atk: 0.001, rel: 0.05 },
    ]);
  }

  _brimstone_step() {
    this._playLayers([
      { noise: 'white', dur: 0.05, gain: 0.2, bp: 1600, bq: 1.2, atk: 0.003, rel: 0.12 },
      { noise: 'pink', dur: 0.04, gain: 0.1, hp: 2200, hq: 0.7, atk: 0.005, rel: 0.15 },
    ]);
  }

  _plant_step() {
    this._playLayers([
      { noise: 'white', dur: 0.04, gain: 0.1, hp: 3500, hq: 0.4, atk: 0.005, rel: 0.12 },
      { noise: 'pink', dur: 0.03, gain: 0.06, bp: 2200, bq: 0.5, atk: 0.008, rel: 0.15 },
    ]);
  }

  _liquid_step() {
    this._playLayers([
      { noise: 'brown', dur: 0.08, gain: 0.2, bp: 500, bq: 1.8, atk: 0.005, rel: 0.15 },
      { wave: 'sine', freq: 200, dur: 0.06, gain: 0.1, atk: 0.008, rel: 0.12 },
    ]);
  }

  // ── BLOCK BREAK SOUNDS ────────────────────────────────────────────────

  _stone_break() {
    this._playLayers([
      { noise: 'brown', dur: 0.15, gain: 0.35, lp: 600, atk: 0.005, rel: 0.35 },
      { noise: 'white', dur: 0.08, gain: 0.2, bp: 2500, bq: 1.2, atk: 0.002, rel: 0.2 },
      { noise: 'white', dur: 0.04, gain: 0.15, hp: 4000, hq: 1, atk: 0.001, rel: 0.1 },
    ]);
  }

  _dirt_break() {
    this._playLayers([
      { noise: 'brown', dur: 0.12, gain: 0.25, lp: 300, atk: 0.008, rel: 0.4 },
      { noise: 'pink', dur: 0.08, gain: 0.15, lp: 600, atk: 0.008, rel: 0.3 },
    ]);
  }

  _wood_break() {
    this._playLayers([
      { noise: 'white', dur: 0.1, gain: 0.25, bp: 900, bq: 1.5, atk: 0.003, rel: 0.25 },
      { wave: 'sawtooth', freq: 200, dur: 0.12, gain: 0.12, atk: 0.005, rel: 0.3 },
    ]);
  }

  _sand_break() {
    this._playLayers([
      { noise: 'white', dur: 0.1, gain: 0.2, bp: 3000, bq: 0.5, atk: 0.003, rel: 0.2 },
      { noise: 'brown', dur: 0.06, gain: 0.1, lp: 400, atk: 0.005, rel: 0.15 },
    ]);
  }

  _glass_break() {
    this._playLayers([
      { noise: 'white', dur: 0.06, gain: 0.3, hp: 5000, hq: 2, atk: 0.001, rel: 0.05 },
      { wave: 'sine', freq: 3000, dur: 0.05, gain: 0.15, atk: 0.001, rel: 0.04 },
      { wave: 'sine', freq: 2000, dur: 0.04, gain: 0.1, atk: 0.002, rel: 0.03 },
    ]);
  }

  _gravel_break() {
    this._playLayers([
      { noise: 'white', dur: 0.12, gain: 0.3, bp: 2000, bq: 0.8, atk: 0.002, rel: 0.2 },
      { noise: 'brown', dur: 0.08, gain: 0.15, lp: 500, atk: 0.005, rel: 0.25 },
    ]);
  }

  _metal_break() {
    this._playLayers([
      { wave: 'square', freq: 800, dur: 0.1, gain: 0.25, atk: 0.001, rel: 0.08 },
      { noise: 'white', dur: 0.06, gain: 0.2, hp: 3000, hq: 2, atk: 0.001, rel: 0.05 },
    ]);
  }

  // ── BLOCK PLACE SOUNDS ────────────────────────────────────────────────

  _stone_place() {
    this._playLayers([
      { noise: 'brown', dur: 0.06, gain: 0.25, lp: 500, atk: 0.005, rel: 0.2 },
      { noise: 'white', dur: 0.03, gain: 0.12, bp: 2000, bq: 1, atk: 0.003, rel: 0.15 },
    ]);
  }

  _dirt_place() {
    this._playLayers([
      { noise: 'brown', dur: 0.05, gain: 0.18, lp: 300, atk: 0.008, rel: 0.25 },
      { noise: 'pink', dur: 0.03, gain: 0.08, lp: 500, atk: 0.008, rel: 0.2 },
    ]);
  }

  _wood_place() {
    this._playLayers([
      { noise: 'white', dur: 0.04, gain: 0.18, bp: 900, bq: 2, atk: 0.003, rel: 0.12 },
      { wave: 'sine', freq: 300, dur: 0.05, gain: 0.08, atk: 0.005, rel: 0.15 },
    ]);
  }

  _sand_place() {
    this._playLayers([
      { noise: 'white', dur: 0.05, gain: 0.15, bp: 3500, bq: 0.6, atk: 0.003, rel: 0.12 },
      { noise: 'white', dur: 0.03, gain: 0.08, hp: 6000, atk: 0.002, rel: 0.1 },
    ]);
  }

  _glass_place() {
    this._playLayers([
      { noise: 'white', dur: 0.02, gain: 0.18, hp: 5000, hq: 1.5, atk: 0.001, rel: 0.03 },
      { wave: 'sine', freq: 2000, dur: 0.03, gain: 0.08, atk: 0.001, rel: 0.04 },
    ]);
  }

  _gravel_place() {
    this._playLayers([
      { noise: 'white', dur: 0.05, gain: 0.2, bp: 2200, bq: 0.7, atk: 0.003, rel: 0.12 },
      { noise: 'brown', dur: 0.04, gain: 0.1, lp: 700, atk: 0.005, rel: 0.15 },
    ]);
  }

  _metal_place() {
    this._playLayers([
      { wave: 'square', freq: 1000, dur: 0.03, gain: 0.18, atk: 0.001, rel: 0.05 },
      { noise: 'white', dur: 0.02, gain: 0.12, hp: 3500, hq: 1.5, atk: 0.001, rel: 0.04 },
    ]);
  }

  // ── MATERIAL DISPATCH ──────────────────────────────────────────────────

  _material(blockId) {
    switch (blockId) {
      case 3: case 4: case 9: case 11: case 12: case 13: case 14: case 25: case 30: case 32: case 39: case 42: case 43: case 44: case 48: case 49: case 52: case 53: case 54: case 59: case 60: case 62: case 63: case 64: case 65: case 68: case 73: case 74: case 77: case 83:
        return 'stone';
      case 1: case 2: case 19: case 33: case 34: case 66: case 69: case 75:
        return 'dirt';
      case 5: case 10: case 17: case 20: case 21: case 24: case 26: case 27: case 35: case 38: case 40: case 55: case 56: case 57: case 58: case 61: case 67: case 76: case 78: case 79:
        return 'wood';
      case 6: case 22: case 23: case 36:
        return 'leaves';
      case 7: case 29: case 85:
        return 'sand';
      case 16: case 46: case 84:
        return 'glass';
      case 15: case 31: case 37:
        return 'snow';
      case 18:
        return 'gravel';
      case 28: case 45: case 82:
        return 'brimstone';
      case 50: case 51: case 81:
        return 'metal';
      case 80:
        return 'liquid';
      case 41:
        return 'plant';
      default:
        return 'stone';
    }
  }

  // ── PUBLIC API ─────────────────────────────────────────────────────────

  step(blockId) {
    if (!this.ctx || !this.enabled) return;
    const now = this.ctx.currentTime;
    if (now - this._stepCooldown < 0.22) return;
    this._stepCooldown = now;

    const mat = this._material(blockId);
    if (this._sample(STEP_SAMPLES[mat], 0.5, 0.08)) return;

    switch (mat) {
      case 'stone': return this._stone_step();
      case 'dirt': return this._dirt_step();
      case 'wood': return this._wood_step();
      case 'leaves': return this._leaves_step();
      case 'sand': return this._sand_step();
      case 'glass': return this._glass_step();
      case 'snow': return this._snow_step();
      case 'gravel': return this._gravel_step();
      case 'brimstone': return this._brimstone_step();
      case 'metal': return this._metal_step();
      case 'liquid': return this._liquid_step();
      case 'plant': return this._plant_step();
    }
  }

  blockBreak(blockId) {
    if (!this.ctx || !this.enabled) return;
    if (this._sample(['impactMining_000', 'impactMining_001', 'impactMining_002', 'impactMining_003'], 0.5, 0.05)) return;
    switch (this._material(blockId)) {
      case 'stone': return this._stone_break();
      case 'dirt': return this._dirt_break();
      case 'wood': return this._wood_break();
      case 'sand': return this._sand_break();
      case 'glass': return this._glass_break();
      case 'gravel': return this._gravel_break();
      case 'metal': return this._metal_break();
      default: return this._stone_break();
    }
  }

  blockPlace(blockId) {
    if (!this.ctx || !this.enabled) return;
    if (this._sample(['impactGeneric_light_000', 'impactGeneric_light_001', 'impactGeneric_light_002'], 0.45, 0.06)) return;
    switch (this._material(blockId)) {
      case 'stone': return this._stone_place();
      case 'dirt': return this._dirt_place();
      case 'wood': return this._wood_place();
      case 'sand': return this._sand_place();
      case 'glass': return this._glass_place();
      case 'gravel': return this._gravel_place();
      case 'metal': return this._metal_place();
      default: return this._stone_place();
    }
  }

  inventoryOpen() {
    if (!this.ctx || !this.enabled) return;
    if (this._sample('click_001', 0.35, 0)) return;
    this._playLayers([
      { wave: 'sine', freq: 600, dur: 0.08, gain: 0.12, atk: 0.005, rel: 0.15 },
      { wave: 'sine', freq: 900, dur: 0.06, gain: 0.08, atk: 0.01, rel: 0.1 },
    ]);
  }

  inventoryClose() {
    if (!this.ctx || !this.enabled) return;
    if (this._sample('click_003', 0.35, 0)) return;
    this._playLayers([
      { wave: 'sine', freq: 800, dur: 0.06, gain: 0.1, atk: 0.005, rel: 0.12 },
      { wave: 'sine', freq: 500, dur: 0.08, gain: 0.07, atk: 0.01, rel: 0.15 },
    ]);
  }

  startMusic() {
    this._musicWanted = true;
    if (this.ctx && !this._musicPlaying) {
      this._musicPlaylist = this._shuffleArray([...MUSIC_TRACKS]);
      this._musicIdx = 0;
      this._playNextTrack();
    }
  }

  stopMusic() {
    this._musicWanted = false;
    if (this._musicCurrentSrc) {
      try { this._musicCurrentSrc.pause(); } catch (_) {}
      this._musicCurrentSrc = null;
    }
    this._musicPlaying = false;
  }

  _playNextTrack() {
    if (!this._musicWanted || !this.ctx) return;
    if (this._musicIdx >= this._musicPlaylist.length) {
      this._musicPlaylist = this._shuffleArray([...MUSIC_TRACKS]);
      this._musicIdx = 0;
    }
    const url = this._musicPlaylist[this._musicIdx++];
    const audio = new Audio(url);
    audio.crossOrigin = 'anonymous';
    audio.loop = false;
    const source = this.ctx.createMediaElementSource(audio);
    const g = this.ctx.createGain();
    g.gain.value = 0.5;
    source.connect(g);
    g.connect(this.musicGain);
    audio.addEventListener('ended', () => {
      try { source.disconnect(); g.disconnect(); } catch (_) {}
      this._musicCurrentSrc = null;
      this._playNextTrack();
    });
    audio.play().catch(() => {});
    this._musicCurrentSrc = audio;
    this._musicPlaying = true;
  }

  _shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // ── GAMEPLAY SFX ────────────────────────────────────────────────────────

  playerHurt() {
    if (!this.ctx || !this.enabled) return;
    if (this._sample(['impactPunch_heavy_000', 'impactPunch_heavy_001', 'impactPunch_heavy_002'], 0.5, 0.06)) return;
    this._playLayers([
      { wave: 'sawtooth', freq: 260, dur: 0.16, gain: 0.2, atk: 0.005, rel: 0.3 },
      { wave: 'sawtooth', freq: 190, dur: 0.18, gain: 0.16, atk: 0.01, rel: 0.35 },
      { noise: 'white', dur: 0.06, gain: 0.08, bp: 900, bq: 1, atk: 0.002, rel: 0.2 },
    ]);
  }

  playerDie() {
    if (!this.ctx || !this.enabled) return;
    if (this._sample(['impactSoft_heavy_000', 'impactSoft_heavy_001', 'impactSoft_heavy_002'], 0.55, 0.03)) return;
    const t0 = this.ctx.currentTime;
    [400, 320, 250, 180].forEach((f, i) => {
      const osc = this.ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.value = f;
      const g = this._gain(0);
      this._envGain(g, 0.16, 0.28, 0.01, 0.5);
      const lp = this._filter('lowpass', f * 2);
      osc.connect(g);
      g.connect(lp);
      lp.connect(this.master);
      osc.start(t0 + i * 0.15);
      osc.stop(t0 + i * 0.15 + 0.32);
      osc.onended = () => { try { osc.disconnect(); g.disconnect(); lp.disconnect(); } catch (_) {} };
    });
  }

  mobHurt() {
    if (!this.ctx || !this.enabled) return;
    if (this._sample(['impactPunch_medium_000', 'impactPunch_medium_001', 'impactPunch_medium_002'], 0.45, 0.06)) return;
    this._playLayers([
      { noise: 'brown', dur: 0.12, gain: 0.32, lp: 500, atk: 0.003, rel: 0.3 },
      { wave: 'sine', freq: 160, dur: 0.1, gain: 0.14, atk: 0.005, rel: 0.25 },
    ]);
  }

  mobDeath() {
    if (!this.ctx || !this.enabled) return;
    if (this._sample(['impactSoft_heavy_000', 'impactSoft_heavy_001', 'impactSoft_heavy_002'], 0.5, 0.05)) return;
    this._playLayers([
      { noise: 'brown', dur: 0.25, gain: 0.35, lp: 300, atk: 0.005, rel: 0.4 },
      { wave: 'sine', freq: 90, dur: 0.3, gain: 0.2, atk: 0.005, rel: 0.5 },
    ]);
  }

  explosion() {
    if (!this.ctx || !this.enabled) return;
    if (this._sample(['impactBell_heavy_000', 'impactBell_heavy_001'], 0.7, 0)) return;
    this._playLayers([
      { noise: 'brown', dur: 0.8, gain: 0.5, lp: 400, atk: 0.002, rel: 0.5 },
      { noise: 'white', dur: 0.35, gain: 0.24, lp: 1600, atk: 0.001, rel: 0.3 },
      { wave: 'sine', freq: 58, dur: 0.7, gain: 0.32, atk: 0.002, rel: 0.6 },
    ]);
  }

  eat() {
    this._playLayers([
      { noise: 'white', dur: 0.07, gain: 0.2, bp: 1200, bq: 1.5, atk: 0.002, rel: 0.25 },
      { noise: 'brown', dur: 0.06, gain: 0.14, lp: 500, atk: 0.003, rel: 0.2 },
    ]);
  }

  land() {
    if (!this.ctx || !this.enabled) return;
    if (this._sample(['impactSoft_medium_000', 'impactSoft_medium_001', 'impactSoft_medium_002'], 0.4, 0.06)) return;
    this._playLayers([
      { noise: 'brown', dur: 0.1, gain: 0.22, lp: 320, atk: 0.002, rel: 0.3 },
    ]);
  }

  splash() {
    this._playLayers([
      { noise: 'white', dur: 0.25, gain: 0.2, bp: 1500, bq: 0.8, atk: 0.005, rel: 0.4 },
      { noise: 'white', dur: 0.12, gain: 0.12, hp: 3200, atk: 0.002, rel: 0.3 },
    ]);
  }

  levelUp() {
    if (!this.ctx || !this.enabled) return;
    if (this._sample('powerUp2', 0.4, 0)) return;
    const t0 = this.ctx.currentTime;
    [72, 76, 79, 84].forEach((n, i) => {
      const osc = this.ctx.createOscillator();
      osc.type = 'square';
      osc.frequency.value = 440 * Math.pow(2, (n - 69) / 12);
      const g = this._gain(0);
      this._envGain(g, 0.07, 0.18, 0.01, 0.5);
      osc.connect(g);
      g.connect(this.master);
      osc.start(t0 + i * 0.07);
      osc.stop(t0 + i * 0.07 + 0.22);
      osc.onended = () => { try { osc.disconnect(); g.disconnect(); } catch (_) {} };
    });
  }
}
