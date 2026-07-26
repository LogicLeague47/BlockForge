// Sound effects + music player via the Web Audio API.
// Block sounds loaded from CC0 Kenney impact sounds (public/Sounds/).
// Mob sounds loaded from CC0 creature sounds (public/Sounds/).
// Eating, weather, and ambient sounds are procedural.

import { assetBase } from './config.js';
function assetUrl(p) { return assetBase() + String(p).replace(/^\//, ''); }

export class Audio {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.master = null;
    this.musicGain = null;
    this.wind = null;
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
      'stone_dig1','stone_dig2','stone_dig3',
      'stone_place1','stone_place2',
      'stone_step1','stone_step2','stone_step3',
      'dirt_dig1','dirt_dig2','dirt_dig3',
      'dirt_step1','dirt_step2','dirt_step3',
      'wood_dig1','wood_dig2','wood_dig3',
      'wood_place1','wood_place2',
      'wood_step1','wood_step2','wood_step3',
      'glass_dig1','glass_dig2','glass_dig3',
      'glass_place1','glass_place2',
      'metal_dig1','metal_dig2','metal_dig3',
      'metal_place1','metal_place2',
      'snow_step1','snow_step2','snow_step3',
      'snow_dig1','snow_dig2',
      'gravel_dig1','gravel_dig2','gravel_dig3',
      'gravel_step1','gravel_step2',
      'sand_dig1','sand_dig2','sand_dig3',
      'sand_step1',
      'leaves_dig1','leaves_dig2',
      'player_hurt1','player_hurt2',
      'zombie_groan1','zombie_groan2','zombie_groan3','zombie_groan4',
      'zombie_hurt1','zombie_hurt2',
      'skeleton_bone1','skeleton_bone2','skeleton_bone3',
      'skeleton_hurt1','skeleton_hurt2',
      'spider_hiss1','spider_hiss2','spider_hiss3',
      'spider_hurt1','spider_attack1','spider_attack2',
      'slime1','slime2','slime3',
      'slime_hurt1','slime_hurt2',
      'cow1','cow2',
      'pig1','pig2',
      'sheep1','sheep2',
      'chicken1','chicken2',
      'creature_hurt1','creature_hurt2','creature_hurt3',
      'monster1','monster2','monster3',
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

  loadSfx() {}

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
  }

  // ── ZOMBIE SOUNDS (procedural) ─────────────────────────────────────

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

  // ── WEATHER SOUNDS ──────────────────────────────────────────────────

  // Thunder: a sharp lightning crack followed by a rolling low rumble.
  // ── BLOCK SOUNDS ─────────────────────────────────────────────────────

  // STONE: Hard, sharp crunch — heavy impact with gravel scatter
  _stone_dig() {
    if (this._buffers.stone_dig1) {
      return this._playBuf([this._buffers.stone_dig1, this._buffers.stone_dig2, this._buffers.stone_dig3], 0.6, 0.15);
    }
    this._playLayers([
      { noise: 'brown', dur: 0.22, gain: 0.6, lp: 350, lq: 0.8, atk: 0.005, rel: 0.4 },
      { noise: 'white', dur: 0.14, gain: 0.45, bp: 1800, bq: 1.8, atk: 0.003, rel: 0.25 },
      { noise: 'white', dur: 0.1, gain: 0.3, hp: 5000, hq: 0.5, atk: 0.002, rel: 0.15 },
      { wave: 'square', freq: 120, dur: 0.08, gain: 0.15, atk: 0.003, rel: 0.2 },
    ]);
  }

  _stone_step() {
    if (this._buffers.stone_step1) {
      return this._playBuf([this._buffers.stone_step1, this._buffers.stone_step2, this._buffers.stone_step3], 0.35, 0.12);
    }
    this._playLayers([
      { noise: 'brown', dur: 0.08, gain: 0.3, lp: 400, atk: 0.005, rel: 0.25 },
      { noise: 'white', dur: 0.05, gain: 0.2, bp: 2000, bq: 1.5, atk: 0.003, rel: 0.2 },
    ]);
  }

  _stone_place() {
    if (this._buffers.stone_place1) {
      return this._playBuf([this._buffers.stone_place1, this._buffers.stone_place2], 0.5, 0.12);
    }
    this._playLayers([
      { noise: 'brown', dur: 0.15, gain: 0.45, lp: 300, atk: 0.005, rel: 0.3 },
      { noise: 'white', dur: 0.08, gain: 0.3, bp: 1500, bq: 2, atk: 0.003, rel: 0.2 },
      { wave: 'square', freq: 100, dur: 0.06, gain: 0.12, atk: 0.003, rel: 0.15 },
    ]);
  }

  // DIRT: Soft, muffled, earthy — low thud with damp grain
  _dirt_dig() {
    if (this._buffers.dirt_dig1) {
      return this._playBuf([this._buffers.dirt_dig1, this._buffers.dirt_dig2, this._buffers.dirt_dig3], 0.5, 0.15);
    }
    this._playLayers([
      { noise: 'brown', dur: 0.18, gain: 0.5, lp: 200, lq: 0.6, atk: 0.008, rel: 0.35 },
      { noise: 'pink', dur: 0.12, gain: 0.3, lp: 600, lq: 0.5, atk: 0.005, rel: 0.3 },
      { noise: 'white', dur: 0.06, gain: 0.1, bp: 1200, bq: 0.8, atk: 0.01, rel: 0.2 },
    ]);
  }

  _dirt_step() {
    if (this._buffers.dirt_step1) {
      return this._playBuf([this._buffers.dirt_step1, this._buffers.dirt_step2, this._buffers.dirt_step3], 0.25, 0.12);
    }
    this._playLayers([
      { noise: 'brown', dur: 0.06, gain: 0.2, lp: 250, atk: 0.01, rel: 0.3 },
      { noise: 'pink', dur: 0.04, gain: 0.1, lp: 500, atk: 0.01, rel: 0.25 },
    ]);
  }

  _dirt_place() {
    this._playLayers([
      { noise: 'brown', dur: 0.12, gain: 0.4, lp: 220, atk: 0.008, rel: 0.3 },
      { noise: 'pink', dur: 0.08, gain: 0.2, lp: 500, atk: 0.005, rel: 0.25 },
    ]);
  }

  // WOOD: Hollow, resonant, warm — snap with body
  _wood_dig() {
    if (this._buffers.wood_dig1) {
      return this._playBuf([this._buffers.wood_dig1, this._buffers.wood_dig2, this._buffers.wood_dig3], 0.55, 0.15);
    }
    this._playLayers([
      { noise: 'white', dur: 0.08, gain: 0.45, bp: 900, bq: 2.5, atk: 0.002, rel: 0.15 },
      { wave: 'sine', freq: 320, dur: 0.15, gain: 0.2, atk: 0.003, rel: 0.3 },
      { noise: 'brown', dur: 0.12, gain: 0.35, bp: 400, bq: 1.2, atk: 0.005, rel: 0.3 },
      { wave: 'triangle', freq: 180, dur: 0.1, gain: 0.1, atk: 0.005, rel: 0.25 },
    ]);
  }

  _wood_step() {
    if (this._buffers.wood_step1) {
      return this._playBuf([this._buffers.wood_step1, this._buffers.wood_step2, this._buffers.wood_step3], 0.3, 0.12);
    }
    this._playLayers([
      { noise: 'white', dur: 0.05, gain: 0.2, bp: 800, bq: 2, atk: 0.003, rel: 0.15 },
      { wave: 'sine', freq: 280, dur: 0.08, gain: 0.1, atk: 0.005, rel: 0.2 },
    ]);
  }

  _wood_place() {
    if (this._buffers.wood_place1) {
      return this._playBuf([this._buffers.wood_place1, this._buffers.wood_place2], 0.45, 0.12);
    }
    this._playLayers([
      { noise: 'white', dur: 0.06, gain: 0.35, bp: 900, bq: 2.5, atk: 0.002, rel: 0.12 },
      { wave: 'sine', freq: 300, dur: 0.1, gain: 0.15, atk: 0.003, rel: 0.25 },
      { noise: 'brown', dur: 0.08, gain: 0.2, bp: 350, bq: 1, atk: 0.005, rel: 0.2 },
    ]);
  }

  // LEAVES: Light, airy, wispy — delicate rustle
  _leaves_dig() {
    if (this._buffers.leaves_dig1) {
      return this._playBuf([this._buffers.leaves_dig1, this._buffers.leaves_dig2], 0.3, 0.15);
    }
    this._playLayers([
      { noise: 'white', dur: 0.12, gain: 0.25, hp: 4000, hq: 0.4, atk: 0.005, rel: 0.2 },
      { noise: 'pink', dur: 0.1, gain: 0.15, bp: 3000, bq: 0.6, atk: 0.008, rel: 0.25 },
      { noise: 'brown', dur: 0.06, gain: 0.08, lp: 600, atk: 0.01, rel: 0.2 },
    ]);
  }

  _leaves_step() {
    this._playLayers([
      { noise: 'white', dur: 0.04, gain: 0.1, hp: 5000, atk: 0.005, rel: 0.15 },
      { noise: 'pink', dur: 0.03, gain: 0.06, bp: 3500, bq: 0.5, atk: 0.008, rel: 0.2 },
    ]);
  }

  _leaves_place() {
    this._playLayers([
      { noise: 'white', dur: 0.06, gain: 0.15, hp: 4500, atk: 0.005, rel: 0.15 },
      { noise: 'pink', dur: 0.04, gain: 0.08, bp: 3000, bq: 0.6, atk: 0.008, rel: 0.2 },
    ]);
  }

  // SAND: Granular, gritty, loose — hiss with fine scatter
  _sand_dig() {
    if (this._buffers.sand_dig1) {
      return this._playBuf([this._buffers.sand_dig1, this._buffers.sand_dig2, this._buffers.sand_dig3], 0.45, 0.15);
    }
    this._playLayers([
      { noise: 'white', dur: 0.18, gain: 0.4, bp: 4000, bq: 0.7, atk: 0.003, rel: 0.2 },
      { noise: 'white', dur: 0.12, gain: 0.3, hp: 6000, hq: 0.4, atk: 0.002, rel: 0.15 },
      { noise: 'brown', dur: 0.1, gain: 0.15, lp: 500, atk: 0.008, rel: 0.25 },
    ]);
  }

  _sand_step() {
    if (this._buffers.sand_step1) {
      return this._playBuf([this._buffers.sand_step1], 0.2, 0.12);
    }
    this._playLayers([
      { noise: 'white', dur: 0.06, gain: 0.2, bp: 3500, bq: 0.6, atk: 0.003, rel: 0.15 },
      { noise: 'white', dur: 0.04, gain: 0.12, hp: 6000, atk: 0.002, rel: 0.12 },
    ]);
  }

  _sand_place() {
    this._playLayers([
      { noise: 'white', dur: 0.1, gain: 0.3, bp: 3800, bq: 0.7, atk: 0.003, rel: 0.18 },
      { noise: 'brown', dur: 0.06, gain: 0.12, lp: 450, atk: 0.008, rel: 0.2 },
    ]);
  }

  // GLASS: Sharp, brittle, tinkling — high crackle
  _glass_dig() {
    if (this._buffers.glass_dig1) {
      return this._playBuf([this._buffers.glass_dig1, this._buffers.glass_dig2, this._buffers.glass_dig3], 0.55, 0.15);
    }
    this._playLayers([
      { noise: 'white', dur: 0.06, gain: 0.5, hp: 6000, hq: 1.5, atk: 0.001, rel: 0.1 },
      { wave: 'sine', freq: 1800, dur: 0.08, gain: 0.25, atk: 0.001, rel: 0.08 },
      { noise: 'white', dur: 0.05, gain: 0.3, bp: 4000, bq: 2, atk: 0.001, rel: 0.08 },
      { wave: 'triangle', freq: 2400, dur: 0.04, gain: 0.12, atk: 0.001, rel: 0.06 },
    ]);
  }

  _glass_place() {
    if (this._buffers.glass_place1) {
      return this._playBuf([this._buffers.glass_place1, this._buffers.glass_place2], 0.35, 0.12);
    }
    this._playLayers([
      { noise: 'white', dur: 0.04, gain: 0.35, hp: 5000, hq: 2, atk: 0.001, rel: 0.08 },
      { wave: 'sine', freq: 1600, dur: 0.05, gain: 0.15, atk: 0.001, rel: 0.06 },
    ]);
  }

  _glass_step() {
    this._playLayers([
      { noise: 'white', dur: 0.03, gain: 0.2, hp: 5000, hq: 1.5, atk: 0.001, rel: 0.04 },
      { wave: 'sine', freq: 2000, dur: 0.04, gain: 0.1, atk: 0.001, rel: 0.05 },
    ]);
  }

  // SNOW: Soft powdery crunch — light, airy, compressed
  _snow_dig() {
    if (this._buffers.snow_dig1) {
      return this._playBuf([this._buffers.snow_dig1, this._buffers.snow_dig2], 0.4, 0.15);
    }
    this._playLayers([
      { noise: 'white', dur: 0.15, gain: 0.3, hp: 3000, hq: 0.5, atk: 0.005, rel: 0.2 },
      { noise: 'pink', dur: 0.12, gain: 0.2, bp: 1500, bq: 0.6, atk: 0.008, rel: 0.25 },
      { noise: 'white', dur: 0.06, gain: 0.1, hp: 6000, hq: 0.3, atk: 0.003, rel: 0.12 },
    ]);
  }

  _snow_step() {
    if (this._buffers.snow_step1) {
      return this._playBuf([this._buffers.snow_step1, this._buffers.snow_step2, this._buffers.snow_step3], 0.2, 0.12);
    }
    this._playLayers([
    { noise: 'white', dur: 0.06, gain: 0.15, hp: 3500, hq: 0.4, atk: 0.005, rel: 0.15 },
    { noise: 'pink', dur: 0.04, gain: 0.08, bp: 1800, bq: 0.5, atk: 0.008, rel: 0.18 },
    ]);
  }

  _snow_place() {
    this._playLayers([
      { noise: 'white', dur: 0.08, gain: 0.2, hp: 3200, hq: 0.5, atk: 0.005, rel: 0.15 },
      { noise: 'pink', dur: 0.06, gain: 0.1, bp: 1600, bq: 0.5, atk: 0.008, rel: 0.18 },
    ]);
  }

  // GRAVEL: Loose rocky tumbling crunch — deeper than sand, more granular
  _gravel_dig() {
    if (this._buffers.gravel_dig1) {
      return this._playBuf([this._buffers.gravel_dig1, this._buffers.gravel_dig2, this._buffers.gravel_dig3], 0.5, 0.15);
    }
    this._playLayers([
      { noise: 'white', dur: 0.2, gain: 0.45, bp: 2500, bq: 0.8, atk: 0.002, rel: 0.2 },
      { noise: 'brown', dur: 0.15, gain: 0.3, lp: 800, atk: 0.005, rel: 0.25 },
      { noise: 'white', dur: 0.1, gain: 0.25, hp: 4500, hq: 0.6, atk: 0.002, rel: 0.15 },
    ]);
  }

  _gravel_step() {
    if (this._buffers.gravel_step1) {
      return this._playBuf([this._buffers.gravel_step1, this._buffers.gravel_step2], 0.25, 0.12);
    }
    this._playLayers([
    { noise: 'white', dur: 0.07, gain: 0.25, bp: 2200, bq: 0.7, atk: 0.003, rel: 0.15 },
    { noise: 'brown', dur: 0.05, gain: 0.12, lp: 700, atk: 0.005, rel: 0.18 },
    ]);
  }

  _gravel_place() {
    this._playLayers([
      { noise: 'white', dur: 0.12, gain: 0.35, bp: 2300, bq: 0.8, atk: 0.003, rel: 0.18 },
      { noise: 'brown', dur: 0.08, gain: 0.2, lp: 650, atk: 0.005, rel: 0.2 },
    ]);
  }

  // METAL: Sharp metallic clank — bright, resonant ping
  _metal_dig() {
    if (this._buffers.metal_dig1) {
      return this._playBuf([this._buffers.metal_dig1, this._buffers.metal_dig2, this._buffers.metal_dig3], 0.55, 0.12);
    }
    this._playLayers([
      { wave: 'square', freq: 1200, dur: 0.12, gain: 0.35, atk: 0.001, rel: 0.15 },
      { noise: 'white', dur: 0.06, gain: 0.4, hp: 3000, hq: 2, atk: 0.001, rel: 0.08 },
      { wave: 'sine', freq: 800, dur: 0.15, gain: 0.15, atk: 0.002, rel: 0.2 },
      { noise: 'brown', dur: 0.08, gain: 0.2, lp: 500, atk: 0.003, rel: 0.15 },
    ]);
  }

  _metal_step() {
    this._playLayers([
    { wave: 'square', freq: 1000, dur: 0.04, gain: 0.2, atk: 0.001, rel: 0.06 },
    { noise: 'white', dur: 0.03, gain: 0.15, hp: 3500, hq: 1.5, atk: 0.001, rel: 0.05 },
    ]);
  }

  _metal_place() {
    if (this._buffers.metal_place1) {
      return this._playBuf([this._buffers.metal_place1, this._buffers.metal_place2], 0.45, 0.1);
    }
    this._playLayers([
      { wave: 'square', freq: 1100, dur: 0.08, gain: 0.3, atk: 0.001, rel: 0.1 },
      { noise: 'white', dur: 0.04, gain: 0.25, hp: 3200, hq: 2, atk: 0.001, rel: 0.08 },
      { wave: 'sine', freq: 900, dur: 0.1, gain: 0.12, atk: 0.002, rel: 0.15 },
    ]);
  }

  // BRIMSTONE: Hot, crackling stone — fire undertone
  _brimstone_dig() {
    this._playLayers([
      // hot stone crack
      { noise: 'white', dur: 0.1, gain: 0.4, bp: 1800, bq: 1.5, atk: 0.002, rel: 0.15 },
      // fire crackle undertone
      { noise: 'pink', dur: 0.12, gain: 0.2, hp: 2000, hq: 0.8, atk: 0.005, rel: 0.2 },
      // deep heat body
      { noise: 'brown', dur: 0.15, gain: 0.25, lp: 400, atk: 0.005, rel: 0.25 },
    ]);
  }

  _brimstone_step() {
    this._playLayers([
      { noise: 'white', dur: 0.05, gain: 0.2, bp: 1600, bq: 1.2, atk: 0.003, rel: 0.12 },
      { noise: 'pink', dur: 0.04, gain: 0.1, hp: 2200, hq: 0.7, atk: 0.005, rel: 0.15 },
    ]);
  }

  _brimstone_place() {
    this._playLayers([
      { noise: 'white', dur: 0.08, gain: 0.3, bp: 1700, bq: 1.5, atk: 0.002, rel: 0.12 },
      { noise: 'brown', dur: 0.1, gain: 0.2, lp: 420, atk: 0.005, rel: 0.2 },
    ]);
  }

  // PLANT: Soft organic rustle — hay, flowers, leaves-adjacent
  _plant_dig() {
    this._playLayers([
      // soft rustle
      { noise: 'white', dur: 0.1, gain: 0.2, hp: 3000, hq: 0.5, atk: 0.005, rel: 0.18 },
      // organic body
      { noise: 'pink', dur: 0.08, gain: 0.12, bp: 2000, bq: 0.6, atk: 0.008, rel: 0.2 },
    ]);
  }

  _plant_step() {
    this._playLayers([
    { noise: 'white', dur: 0.04, gain: 0.1, hp: 3500, hq: 0.4, atk: 0.005, rel: 0.12 },
    { noise: 'pink', dur: 0.03, gain: 0.06, bp: 2200, bq: 0.5, atk: 0.008, rel: 0.15 },
    ]);
  }

  _plant_place() {
    this._playLayers([
      { noise: 'white', dur: 0.05, gain: 0.15, hp: 3200, hq: 0.5, atk: 0.005, rel: 0.15 },
      { noise: 'pink', dur: 0.04, gain: 0.08, bp: 2100, bq: 0.5, atk: 0.008, rel: 0.18 },
    ]);
  }

  // LIQUID: Bubbling, gurgling — for lava
  _liquid_dig() {
    this._playLayers([
      // thick bubble pop
      { noise: 'brown', dur: 0.2, gain: 0.4, bp: 400, bq: 2, atk: 0.003, rel: 0.25 },
      // gurgle
      { wave: 'sine', freq: 180, dur: 0.15, gain: 0.2, atk: 0.005, rel: 0.2 },
      // hiss
      { noise: 'white', dur: 0.1, gain: 0.15, hp: 2000, hq: 0.6, atk: 0.008, rel: 0.15 },
    ]);
  }

  _liquid_step() {
    this._playLayers([
    { noise: 'brown', dur: 0.08, gain: 0.2, bp: 500, bq: 1.8, atk: 0.005, rel: 0.15 },
    { wave: 'sine', freq: 200, dur: 0.06, gain: 0.1, atk: 0.008, rel: 0.12 },
    ]);
  }

  _liquid_place() {
    this._playLayers([
      { noise: 'brown', dur: 0.12, gain: 0.3, bp: 450, bq: 2, atk: 0.003, rel: 0.2 },
      { wave: 'sine', freq: 190, dur: 0.1, gain: 0.15, atk: 0.005, rel: 0.15 },
    ]);
  }

  // ── PUBLIC API ───────────────────────────────────────────────────────

  dig(blockId) {
    switch (blockId) {
      // STONE family: stone, cobble, ores, obsidian, terracotta, furnace, buttons, pressure plates, doors, prismite, mossy cobble, walls, blocks
      case 3: case 4: case 9: case 11: case 12: case 13: case 14: case 25: case 30: case 32: case 39: case 42: case 43: case 44: case 48: case 49: case 52: case 53: case 54: case 59: case 60: case 62: case 63: case 64: case 65: case 68: case 73: case 74: case 77: case 83:
        return this._stone_dig();
      // DIRT family: grass, dirt, podzol, mycelium, carpet, wool, greenstone dust, clay
      case 1: case 2: case 19: case 33: case 34: case 66: case 69: case 75:
        return this._dirt_dig();
      // WOOD family: logs, planks, bricks, pumpkin, cactus, bookshelf, TNT, workbench, beds, ladder, fence, door, sign, painting, greenstone torch, piston
      case 5: case 10: case 17: case 20: case 21: case 24: case 26: case 27: case 35: case 38: case 40: case 55: case 56: case 57: case 58: case 61: case 67: case 76: case 78: case 79:
        return this._wood_dig();
      // LEAVES family: leaves, flowers
      case 6: case 22: case 23: case 36:
        return this._leaves_dig();
      // SAND family: sand, red sand, quicksand
      case 7: case 29: case 85:
        return this._sand_dig();
      // GLASS family: glass, glass pane, void glass
      case 16: case 46: case 84:
        return this._glass_dig();
      // SNOW family
      case 15: case 31: case 37:
        return this._snow_dig();
      // GRAVEL
      case 18:
        return this._gravel_dig();
      // BRIMSTONE (hot stone)
      case 28: case 45: case 82:
        return this._brimstone_dig();
      // METAL: iron/gold blocks, iron bars
      case 50: case 51: case 81:
        return this._metal_dig();
      // LIQUID (lava)
      case 80:
        return this._liquid_dig();
      // PLANT: torch
      case 41:
        return this._plant_dig();
      // WATER
      case 8:
        return this.splash();
      default:
        return this._stone_dig();
    }
  }

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

  place(blockId) {
    if (blockId) return this.placeBlock(blockId);
    this._dirt_place();
  }

  placeBlock(blockId) {
    switch (blockId) {
      // STONE family
      case 3: case 4: case 9: case 11: case 12: case 13: case 14: case 25: case 30: case 32: case 39: case 42: case 43: case 44: case 48: case 49: case 52: case 53: case 54: case 59: case 60: case 62: case 63: case 64: case 65: case 68: case 73: case 74: case 77: case 83:
        return this._stone_place();
      // DIRT family
      case 1: case 2: case 19: case 33: case 34: case 66: case 69: case 75:
        return this._dirt_place();
      // WOOD family
      case 5: case 10: case 17: case 20: case 21: case 24: case 26: case 27: case 35: case 38: case 40: case 55: case 56: case 57: case 58: case 61: case 67: case 76: case 78: case 79:
        return this._wood_place();
      // LEAVES family
      case 6: case 22: case 23: case 36:
        return this._leaves_place();
      // SAND family
      case 7: case 29: case 85:
        return this._sand_place();
      // GLASS family
      case 16: case 46: case 84:
        return this._glass_place();
      // SNOW family
      case 15: case 31: case 37:
        return this._snow_place();
      // GRAVEL
      case 18:
        return this._gravel_place();
      // BRIMSTONE
      case 28: case 45: case 82:
        return this._brimstone_place();
      // METAL
      case 50: case 51: case 81:
        return this._metal_place();
      // LIQUID
      case 80:
        return this._liquid_place();
      // PLANT
      case 41:
        return this._plant_place();
      default:
        return this._stone_place();
    }
  }

  splash() {
    if (!this.ctx || !this.enabled) return;
    const ctx = this.ctx;
    const dur = 0.35;
    const len = Math.floor(ctx.sampleRate * dur);
    const buf = this._noise(len, ctx.sampleRate);
    const src = this._src(buf);
    const f = this._filter('lowpass', 2000, 0.5);
    f.frequency.setValueAtTime(3000, ctx.currentTime);
    f.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + dur);
    const g = this._gain(0);
    this._envGain(g, 0.45, dur, 0.01, 0.3);
    src.connect(f); f.connect(g); g.connect(this.master);
    src.start(); src.stop(ctx.currentTime + dur + 0.05);
    // bubble pops
    for (let i = 0; i < 4; i++) {
      setTimeout(() => {
        if (!this.ctx || !this.enabled) return;
        const osc = this.ctx.createOscillator();
        const gg = this._gain(0);
        osc.type = 'sine';
        osc.frequency.value = 250 + Math.random() * 500;
        this._envGain(gg, 0.1, 0.06, 0.01, 0.3);
        osc.connect(gg); gg.connect(this.master);
        osc.start(); osc.stop(this.ctx.currentTime + 0.06);
      }, 60 + i * 55 + Math.random() * 30);
    }
  }

  damage() {
    if (!this.ctx || !this.enabled) return;
    this._playLayers([
      { noise: 'white', dur: 0.08, gain: 0.5, hp: 200, atk: 0.001, rel: 0.08 },
      { noise: 'brown', dur: 0.15, gain: 0.35, lp: 250, atk: 0.002, rel: 0.18 },
      { wave: 'sawtooth', freq: 120, dur: 0.07, gain: 0.15, atk: 0.001, rel: 0.08 },
      { wave: 'sine', freq: 60, dur: 0.12, gain: 0.25, atk: 0.003, rel: 0.15 },
    ]);
  }

  hit() {
    if (!this.ctx || !this.enabled) return;
    this._playLayers([
      { noise: 'white', dur: 0.05, gain: 0.55, hp: 3000, atk: 0.001, rel: 0.06 },
      { noise: 'brown', dur: 0.1, gain: 0.3, lp: 500, atk: 0.002, rel: 0.12 },
      { wave: 'sawtooth', freq: 200, dur: 0.04, gain: 0.18, atk: 0.001, rel: 0.06 },
      { wave: 'sine', freq: 80, dur: 0.08, gain: 0.2, atk: 0.002, rel: 0.1 },
    ]);
  }

  // ── EATING SOUND ──────────────────────────────────────────────────────
  // Crunchy bite + chewy texture + soft swallow

  eatBite() {
    if (!this.ctx || !this.enabled) return;
    this._playLayers([
      { noise: 'white', dur: 0.06, gain: 0.35, hp: 2000, hq: 1.2, atk: 0.001, rel: 0.12 },
      { noise: 'brown', dur: 0.1, gain: 0.25, bp: 600, bq: 1.5, atk: 0.002, rel: 0.15 },
      { wave: 'square', freq: 350, dur: 0.04, gain: 0.1, atk: 0.001, rel: 0.06 },
    ]);
  }

  eatChew() {
    if (!this.ctx || !this.enabled) return;
    this._playLayers([
      // wet squishy chew
      { noise: 'pink', dur: 0.08, gain: 0.2, bp: 1200, bq: 2, atk: 0.002, rel: 0.12 },
      // soft mastication low
      { noise: 'brown', dur: 0.1, gain: 0.15, lp: 500, atk: 0.003, rel: 0.2 },
      // tonal swallow hint
      { wave: 'sine', freq: 280, dur: 0.05, gain: 0.06, atk: 0.002, rel: 0.08 },
    ]);
  }

  // ── PLAYER HURT SOUND ──────────────────────────────────────────────

  playHurt() {
    if (!this.ctx || !this.enabled) return;
    const bufs = this._bufs('player_hurt1', 'player_hurt2');
    if (bufs.length) { this._playBuf(bufs, 0.5, 0.15); return; }
    this._playLayers([
      { noise: 'white', dur: 0.05, gain: 0.5, bp: 1500, bq: 1.2, atk: 0.001, rel: 0.06 },
      { noise: 'brown', dur: 0.12, gain: 0.4, lp: 300, atk: 0.002, rel: 0.15 },
      { wave: 'sawtooth', freq: 150, dur: 0.08, gain: 0.2, atk: 0.001, rel: 0.08 },
      { wave: 'sine', freq: 80, dur: 0.1, gain: 0.25, atk: 0.003, rel: 0.12 },
    ]);
  }

  // ── ANIMAL SOUNDS (procedural) ─────────────────────────────────────

  cowSound() {
    if (!this.ctx || !this.enabled) return;
    const bufs = this._bufs('cow1', 'cow2');
    if (bufs.length) { this._playBuf(bufs, 0.35, 0.2); return; }
    const dur = 0.5 + Math.random() * 0.3;
    const ctx = this.ctx;
    const buf = this._brownNoise(Math.floor(ctx.sampleRate * dur), ctx.sampleRate);
    const src = this._src(buf);
    const lp = this._filter('lowpass', 400, 0.6);
    const g = this._gain(0);
    this._envGain(g, 0.18, dur, 0.08, 0.3);
    src.connect(lp); lp.connect(g); g.connect(this.master);
    src.start(); src.stop(ctx.currentTime + dur + 0.05);
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(120, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(90, ctx.currentTime + dur * 0.7);
    osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + dur);
    const og = this._gain(0);
    this._envGain(og, 0.12, dur, 0.06, 0.3);
    osc.connect(og); og.connect(this.master);
    osc.start(); osc.stop(ctx.currentTime + dur + 0.05);
  }

  pigSound() {
    if (!this.ctx || !this.enabled) return;
    const bufs = this._bufs('pig1', 'pig2');
    if (bufs.length) { this._playBuf(bufs, 0.3, 0.15); return; }
    const dur = 0.2 + Math.random() * 0.15;
    const ctx = this.ctx;
    const pigSnorts = 2 + ((Math.random() * 2) | 0);
    for (let i = 0; i < pigSnorts; i++) {
      const t = ctx.currentTime + i * 0.08;
      const osc = ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(300 + Math.random() * 200, t);
      osc.frequency.linearRampToValueAtTime(200 + Math.random() * 100, t + 0.06);
      const g = this._gain(0);
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.12, t + 0.01);
      g.gain.linearRampToValueAtTime(0, t + 0.06);
      osc.connect(g); g.connect(this.master);
      osc.start(t); osc.stop(t + 0.07);
    }
    const buf = this._noise(Math.floor(ctx.sampleRate * 0.08), ctx.sampleRate);
    const src = this._src(buf);
    const hp = this._filter('highpass', 2000, 0.5);
    const g = this._gain(0);
    this._envGain(g, 0.1, 0.08, 0.005, 0.1);
    src.connect(hp); hp.connect(g); g.connect(this.master);
    src.start(); src.stop(ctx.currentTime + 0.1);
  }

  sheepSound() {
    if (!this.ctx || !this.enabled) return;
    const bufs = this._bufs('sheep1', 'sheep2');
    if (bufs.length) { this._playBuf(bufs, 0.3, 0.15); return; }
    const dur = 0.3 + Math.random() * 0.2;
    const ctx = this.ctx;
    const buf = this._noise(Math.floor(ctx.sampleRate * dur), ctx.sampleRate);
    const src = this._src(buf);
    const bp = this._filter('bandpass', 700, 1.5);
    const g = this._gain(0);
    this._envGain(g, 0.15, dur, 0.02, 0.25);
    src.connect(bp); bp.connect(g); g.connect(this.master);
    src.start(); src.stop(ctx.currentTime + dur + 0.05);
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(200 + Math.random() * 60, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(160, ctx.currentTime + dur * 0.6);
    osc.frequency.linearRampToValueAtTime(180, ctx.currentTime + dur);
    const og = this._gain(0);
    this._envGain(og, 0.08, dur, 0.02, 0.25);
    osc.connect(og); og.connect(this.master);
    osc.start(); osc.stop(ctx.currentTime + dur + 0.05);
  }

  // ── PER-MOB HURT SOUNDS ─────────────────────────────────────────────

  hurtAnimal() {
    if (!this.ctx || !this.enabled) return;
    const bufs = this._bufs('creature_hurt1', 'creature_hurt2', 'creature_hurt3');
    if (bufs.length) { this._playBuf(bufs, 0.35, 0.2); return; }
    const ctx = this.ctx;
    const dur = 0.15;
    const buf = this._noise(Math.floor(ctx.sampleRate * dur), ctx.sampleRate);
    const src = this._src(buf);
    const bp = this._filter('bandpass', 1200, 0.8);
    const g = this._gain(0);
    this._envGain(g, 0.15, dur, 0.005, 0.1);
    src.connect(bp); bp.connect(g); g.connect(this.master);
    src.start(); src.stop(ctx.currentTime + dur + 0.05);
  }

  hurtCow() {
    if (!this.ctx || !this.enabled) return;
    const bufs = this._bufs('cow1', 'cow2');
    if (bufs.length) { this._playBuf(bufs, 0.35, 0.1); return; }
    const ctx = this.ctx;
    const dur = 0.25;
    const buf = this._brownNoise(Math.floor(ctx.sampleRate * dur), ctx.sampleRate);
    const src = this._src(buf);
    const lp = this._filter('lowpass', 300, 0.7);
    const g = this._gain(0);
    this._envGain(g, 0.2, dur, 0.01, 0.15);
    src.connect(lp); lp.connect(g); g.connect(this.master);
    src.start(); src.stop(ctx.currentTime + dur + 0.05);
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(90, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(60, ctx.currentTime + dur);
    const og = this._gain(0);
    this._envGain(og, 0.12, dur, 0.01, 0.15);
    osc.connect(og); og.connect(this.master);
    osc.start(); osc.stop(ctx.currentTime + dur + 0.05);
  }

  hurtPig() {
    if (!this.ctx || !this.enabled) return;
    const bufs = this._bufs('pig1', 'pig2');
    if (bufs.length) { this._playBuf(bufs, 0.35, 0.1); return; }
    const ctx = this.ctx;
    const dur = 0.18;
    const buf = this._noise(Math.floor(ctx.sampleRate * dur), ctx.sampleRate);
    const src = this._src(buf);
    const hp = this._filter('highpass', 1500, 0.6);
    const g = this._gain(0);
    this._envGain(g, 0.15, dur, 0.005, 0.1);
    src.connect(hp); hp.connect(g); g.connect(this.master);
    src.start(); src.stop(ctx.currentTime + dur + 0.05);
    const osc = ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(250, ctx.currentTime + dur);
    const og = this._gain(0);
    this._envGain(og, 0.1, dur, 0.005, 0.1);
    osc.connect(og); og.connect(this.master);
    osc.start(); osc.stop(ctx.currentTime + dur + 0.05);
  }

  hurtSheep() {
    if (!this.ctx || !this.enabled) return;
    const bufs = this._bufs('sheep1', 'sheep2');
    if (bufs.length) { this._playBuf(bufs, 0.35, 0.1); return; }
    const ctx = this.ctx;
    const dur = 0.22;
    const buf = this._noise(Math.floor(ctx.sampleRate * dur), ctx.sampleRate);
    const src = this._src(buf);
    const bp = this._filter('bandpass', 800, 1.2);
    const g = this._gain(0);
    this._envGain(g, 0.18, dur, 0.008, 0.12);
    src.connect(bp); bp.connect(g); g.connect(this.master);
    src.start(); src.stop(ctx.currentTime + dur + 0.05);
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(250, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(180, ctx.currentTime + dur * 0.5);
    osc.frequency.linearRampToValueAtTime(220, ctx.currentTime + dur);
    const og = this._gain(0);
    this._envGain(og, 0.1, dur, 0.008, 0.12);
    osc.connect(og); og.connect(this.master);
    osc.start(); osc.stop(ctx.currentTime + dur + 0.05);
  }

  hurtChicken() {
    if (!this.ctx || !this.enabled) return;
    const bufs = this._bufs('chicken1', 'chicken2');
    if (bufs.length) { this._playBuf(bufs, 0.3, 0.2); return; }
    const ctx = this.ctx;
    const dur = 0.12;
    const buf = this._noise(Math.floor(ctx.sampleRate * dur), ctx.sampleRate);
    const src = this._src(buf);
    const hp = this._filter('highpass', 3000, 0.8);
    const g = this._gain(0);
    this._envGain(g, 0.15, dur, 0.005, 0.08);
    src.connect(hp); hp.connect(g); g.connect(this.master);
    src.start(); src.stop(ctx.currentTime + dur + 0.05);
  }

  hurtZombie() {
    if (!this.ctx || !this.enabled) return;
    const bufs = this._bufs('zombie_hurt1', 'zombie_hurt2', 'monster1');
    if (bufs.length) { this._playBuf(bufs, 0.4, 0.15); return; }
    const ctx = this.ctx;
    const dur = 0.25;
    const buf = this._noise(Math.floor(ctx.sampleRate * dur), ctx.sampleRate);
    const src = this._src(buf);
    const lp = this._filter('lowpass', 400, 0.7);
    const g = this._gain(0);
    this._envGain(g, 0.25, dur, 0.01, 0.15);
    src.connect(lp); lp.connect(g); g.connect(this.master);
    src.start(); src.stop(ctx.currentTime + dur + 0.05);
  }

  hurtSkeleton() {
    if (!this.ctx || !this.enabled) return;
    const bufs = this._bufs('skeleton_hurt1', 'skeleton_hurt2', 'creature_hurt1');
    if (bufs.length) { this._playBuf(bufs, 0.4, 0.15); return; }
    const ctx = this.ctx;
    const dur = 0.18;
    const buf = this._noise(Math.floor(ctx.sampleRate * dur), ctx.sampleRate);
    const src = this._src(buf);
    const bp = this._filter('bandpass', 2500, 1.0);
    const g = this._gain(0);
    this._envGain(g, 0.2, dur, 0.005, 0.12);
    src.connect(bp); bp.connect(g); g.connect(this.master);
    src.start(); src.stop(ctx.currentTime + dur + 0.05);
  }

  hurtSpider() {
    if (!this.ctx || !this.enabled) return;
    const bufs = this._bufs('spider_hurt1', 'bug_04');
    if (bufs.length) { this._playBuf(bufs, 0.35, 0.2); return; }
    const ctx = this.ctx;
    const dur = 0.15;
    const buf = this._noise(Math.floor(ctx.sampleRate * dur), ctx.sampleRate);
    const src = this._src(buf);
    const bp = this._filter('bandpass', 1800, 0.9);
    const g = this._gain(0);
    this._envGain(g, 0.2, dur, 0.005, 0.1);
    src.connect(bp); bp.connect(g); g.connect(this.master);
    src.start(); src.stop(ctx.currentTime + dur + 0.05);
  }

  hurtSlime() {
    if (!this.ctx || !this.enabled) return;
    const bufs = this._bufs('slime_hurt1', 'slime_hurt2', 'slime3');
    if (bufs.length) { this._playBuf(bufs, 0.35, 0.15); return; }
    const ctx = this.ctx;
    const dur = 0.2;
    const buf = this._noise(Math.floor(ctx.sampleRate * dur), ctx.sampleRate);
    const src = this._src(buf);
    const lp = this._filter('lowpass', 250, 0.6);
    const g = this._gain(0);
    this._envGain(g, 0.18, dur, 0.01, 0.12);
    src.connect(lp); lp.connect(g); g.connect(this.master);
    src.start(); src.stop(ctx.currentTime + dur + 0.05);
  }

  // ── HOSTILE MOB SOUNDS (procedural) ────────────────────────────────

  zombieSound() {
    if (!this.ctx || !this.enabled) return;
    const bufs = this._bufs('zombie_groan1', 'zombie_groan2', 'zombie_groan3', 'zombie_groan4', 'monster2', 'monster3');
    if (bufs.length) { this._playBuf(bufs, 0.3, 0.15); return; }
    const ctx = this.ctx;
    // Low groan: filtered noise + low sine
    const dur = 0.6;
    const buf = this._noise(Math.floor(ctx.sampleRate * dur), ctx.sampleRate);
    const src = this._src(buf);
    const lp = this._filter('lowpass', 300, 0.8);
    const g = this._gain(0);
    this._envGain(g, 0.15, dur, 0.05, 0.3);
    src.connect(lp); lp.connect(g); g.connect(this.master);
    src.start(); src.stop(ctx.currentTime + dur + 0.05);
    // Add low moan
    const osc = ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(80, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(55, ctx.currentTime + dur);
    const og = this._gain(0);
    this._envGain(og, 0.08, dur, 0.05, 0.3);
    osc.connect(og); og.connect(this.master);
    osc.start(); osc.stop(ctx.currentTime + dur + 0.05);
  }

  skeletonSound() {
    if (!this.ctx || !this.enabled) return;
    const bufs = this._bufs('skeleton_bone1', 'skeleton_bone2', 'skeleton_bone3');
    if (bufs.length) { this._playBuf(bufs, 0.3, 0.15); return; }
    const ctx = this.ctx;
    // Bone rattle: short noise bursts
    const dur = 0.3;
    for (let i = 0; i < 3; i++) {
      const t = ctx.currentTime + i * 0.08;
      const buf = this._noise(Math.floor(ctx.sampleRate * 0.06), ctx.sampleRate);
      const src = this._src(buf);
      const bp = this._filter('bandpass', 2000 + i * 500, 0.8);
      const g = this._gain(0);
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.12, t + 0.02);
      g.gain.linearRampToValueAtTime(0, t + 0.06);
      src.connect(bp); bp.connect(g); g.connect(this.master);
      src.start(t); src.stop(t + 0.07);
    }
  }

  spiderSound() {
    if (!this.ctx || !this.enabled) return;
    const bufs = this._bufs('spider_hiss1', 'spider_hiss2', 'spider_hiss3');
    if (bufs.length) { this._playBuf(bufs, 0.25, 0.2); return; }
    const ctx = this.ctx;
    // Hiss: high-pass noise
    const dur = 0.4;
    const buf = this._noise(Math.floor(ctx.sampleRate * dur), ctx.sampleRate);
    const src = this._src(buf);
    const hp = this._filter('highpass', 3000, 0.5);
    const lp = this._filter('lowpass', 6000, 0.3);
    const g = this._gain(0);
    this._envGain(g, 0.1, dur, 0.02, 0.2);
    src.connect(hp); hp.connect(lp); lp.connect(g); g.connect(this.master);
    src.start(); src.stop(ctx.currentTime + dur + 0.05);
  }



  explosionSound() {
    if (!this.ctx || !this.enabled) return;
    const ctx = this.ctx;
    // Deep boom + debris
    const dur = 0.8;
    // Low boom
    const boomBuf = this._brownNoise(Math.floor(ctx.sampleRate * dur), ctx.sampleRate);
    const boomSrc = this._src(boomBuf);
    const boomLp = this._filter('lowpass', 250, 0.5);
    const boomG = this._gain(0);
    this._envGain(boomG, 0.6, dur, 0.01, 0.5);
    boomSrc.connect(boomLp); boomLp.connect(boomG); boomG.connect(this.master);
    boomSrc.start(); boomSrc.stop(ctx.currentTime + dur + 0.05);
    // Sharp crack
    const crackBuf = this._noise(Math.floor(ctx.sampleRate * 0.15), ctx.sampleRate);
    const crackSrc = this._src(crackBuf);
    const crackHp = this._filter('highpass', 800, 0.6);
    const crackG = this._gain(0);
    this._envGain(crackG, 0.4, 0.15, 0.005, 0.1);
    crackSrc.connect(crackHp); crackHp.connect(crackG); crackG.connect(this.master);
    crackSrc.start(); crackSrc.stop(ctx.currentTime + 0.2);
  }

  hurtHostile() {
    if (!this.ctx || !this.enabled) return;
    const ctx = this.ctx;
    const dur = 0.2;
    const buf = this._noise(Math.floor(ctx.sampleRate * dur), ctx.sampleRate);
    const src = this._src(buf);
    const bp = this._filter('bandpass', 1200, 0.6);
    const g = this._gain(0);
    this._envGain(g, 0.2, dur, 0.01, 0.15);
    src.connect(bp); bp.connect(g); g.connect(this.master);
    src.start(); src.stop(ctx.currentTime + dur + 0.05);
  }

  // ── AMBIENT WIND ─────────────────────────────────────────────────────

  startWind() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const len = ctx.sampleRate * 4;
    const buf = this._brownNoise(len, ctx.sampleRate);
    const src = this._src(buf, true);
    const f = this._filter('lowpass', 200, 0.3);
    const g = this._gain(0.015);
    src.connect(f); f.connect(g); g.connect(this.master);
    src.start();
    this.wind = { src, g };
  }

  setWindIntensity(v) {
    if (this.wind) this.wind.g.gain.value = 0.015 + v * 0.035;
  }

  // ── RAIN AMBIENT ──────────────────────────────────────────────────────

  startRain() {
    if (!this.ctx || this._rainSrc) return;
    const ctx = this.ctx;
    const len = ctx.sampleRate * 3;
    const buf = this._pinkNoise(len, ctx.sampleRate);
    const src = this._src(buf, true);
    const hp = this._filter('highpass', 800, 0.5);
    const lp = this._filter('lowpass', 8000, 0.3);
    const g = this._gain(0);
    src.connect(hp); hp.connect(lp); lp.connect(g); g.connect(this.master);
    src.start();
    this._rainSrc = src;
    this._rainGain = g;
    this._rainFadeTo(0.12, 2);
  }

  stopRain() {
    if (!this._rainSrc) return;
    this._rainFadeTo(0, 2);
    const src = this._rainSrc;
    setTimeout(() => { try { src.stop(); } catch (_) {} }, 2500);
    this._rainSrc = null;
    this._rainGain = null;
  }

  _rainFadeTo(target, dur) {
    const g = this._rainGain;
    if (!g) return;
    if (dur <= 0) { g.gain.value = target; return; }
    const step = (target - g.gain.value) / (dur * 30);
    const iv = setInterval(() => {
      if (!g) { clearInterval(iv); return; }
      g.gain.value += step;
      if ((step > 0 && g.gain.value >= target) || (step < 0 && g.gain.value <= target)) {
        g.gain.value = target;
        clearInterval(iv);
      }
    }, 1000 / 30);
  }

  // ── THUNDER ───────────────────────────────────────────────────────────

  thunder() {
    if (!this.ctx || !this.enabled) return;
    const ctx = this.ctx;

    // Initial crack — sharp noise burst
    const crackDur = 0.4;
    const crackBuf = this._noise(Math.floor(ctx.sampleRate * crackDur), ctx.sampleRate);
    const crackSrc = this._src(crackBuf);
    const crackHp = this._filter('highpass', 1000, 0.6);
    const crackG = this._gain(0);
    this._envGain(crackG, 0.55, crackDur, 0.002, 0.25);
    crackSrc.connect(crackHp); crackHp.connect(crackG); crackG.connect(this.master);
    crackSrc.start(); crackSrc.stop(ctx.currentTime + crackDur + 0.05);

    // Rolling rumble — brown noise with slow swell
    const rumbleDur = 2.5;
    const rumbleBuf = this._brownNoise(Math.floor(ctx.sampleRate * rumbleDur), ctx.sampleRate);
    const rumbleSrc = this._src(rumbleBuf);
    const rumbleLp = this._filter('lowpass', 220, 0.4);
    const rumbleG = this._gain(0);
    // swell in then out
    const t = ctx.currentTime;
    rumbleG.gain.setValueAtTime(0, t);
    rumbleG.gain.linearRampToValueAtTime(0.5, t + 0.2);
    rumbleG.gain.setValueAtTime(0.5, t + rumbleDur - 0.8);
    rumbleG.gain.linearRampToValueAtTime(0, t + rumbleDur);
    rumbleSrc.connect(rumbleLp); rumbleLp.connect(rumbleG); rumbleG.connect(this.master);
    rumbleSrc.start(); rumbleSrc.stop(ctx.currentTime + rumbleDur + 0.05);
  }

  // ── PARKOUR SOUNDS ──────────────────────────────────────────────────

  levelComplete() {
    if (!this.ctx || !this.enabled) return;
    this._playLayers([
      { wave: 'sine', freq: 880, dur: 0.08, gain: 0.2, atk: 0.005, rel: 0.2 },
      { wave: 'sine', freq: 1320, dur: 0.1, gain: 0.25, atk: 0.008, rel: 0.3 },
      { wave: 'sine', freq: 1760, dur: 0.12, gain: 0.15, atk: 0.01, rel: 0.35 },
    ]);
  }

  finish() {
    if (!this.ctx || !this.enabled) return;
    this._playLayers([
      { wave: 'sine', freq: 523, dur: 0.15, gain: 0.2, atk: 0.01, rel: 0.3 },
      { wave: 'sine', freq: 659, dur: 0.15, gain: 0.2, atk: 0.01, rel: 0.3 },
      { wave: 'sine', freq: 784, dur: 0.15, gain: 0.2, atk: 0.01, rel: 0.3 },
      { wave: 'sine', freq: 1047, dur: 0.25, gain: 0.3, atk: 0.01, rel: 0.5 },
      { wave: 'triangle', freq: 1047, dur: 0.3, gain: 0.1, atk: 0.02, rel: 0.5 },
    ]);
  }
}
