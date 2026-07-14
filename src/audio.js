// Procedural sound effects + music player via the Web Audio API.
// 100% open source — every sound synthesized at runtime, no external files needed.

// Resolve asset paths against the page's base path so audio works both at the
// site root (Render) and under a subpath (GitHub Pages, e.g. /BlockForge/).
const ASSET_BASE = (typeof location !== 'undefined') ? location.pathname.replace(/[^/]*$/, '') : '/';
function assetUrl(p) { return ASSET_BASE + String(p).replace(/^\//, ''); }
//
// Each block type gets a unique sonic signature:
//   Stone:   sharp crunch + deep resonance (hard, heavy)
//   Dirt:    soft muffled thud + earthy grain (soft, damp)
//   Wood:    hollow snap + woody resonance (warm, resonant)
//   Leaves:  light airy rustle (delicate, wispy)
//   Sand:    granular hiss + scatter (loose, gritty)
//   Glass:   sharp crackle + tonal ping (brittle, bright)
//   Water:   bubbly splash + descending sweep
//   Cobble:  deeper stone crunch

export class Audio {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.master = null;
    this.musicGain = null;
    this.wind = null;
    this._stepCooldown = 0;
    this._musicTracks = [];
    this._currentTrack = -1;
    this._musicPlaying = false;
    this._musicElement = null;
    this._musicStarted = false;
  }

  init() {
    if (this.ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    this.ctx = new AC();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.35;
    this.master.connect(this.ctx.destination);

    this.musicGain = this.ctx.createGain();
    this.musicGain.gain.value = 0.3;
    this.musicGain.connect(this.ctx.destination);

    this._initMusic();

    // iOS: resume AudioContext on touchend (required after backgrounding)
    const ctx = this.ctx;
    document.addEventListener('touchend', () => {
      if (ctx && ctx.state === 'suspended') ctx.resume();
    }, { passive: true });
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
  }

  // ── MUSIC SYSTEM ─────────────────────────────────────────────────────
  // Uses HTML5 <audio> elements with simple volume fading.
  // Music plays on first user gesture (browser autoplay policy).

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

      src.start();
      src.stop(this.ctx.currentTime + dur + 0.05);
    }
  }

  // ── WEATHER SOUNDS ──────────────────────────────────────────────────

  // Thunder: a sharp lightning crack followed by a rolling low rumble.
  // ── BLOCK SOUNDS ─────────────────────────────────────────────────────

  // STONE: Hard, sharp crunch — heavy impact with gravel scatter
  _stone_dig() {
    this._playLayers([
      // deep impact thud
      { noise: 'brown', dur: 0.22, gain: 0.6, lp: 350, lq: 0.8, atk: 0.005, rel: 0.4 },
      // mid crunch
      { noise: 'white', dur: 0.14, gain: 0.45, bp: 1800, bq: 1.8, atk: 0.003, rel: 0.25 },
      // high gravel scatter
      { noise: 'white', dur: 0.1, gain: 0.3, hp: 5000, hq: 0.5, atk: 0.002, rel: 0.15 },
      // hard tonal knock
      { wave: 'square', freq: 120, dur: 0.08, gain: 0.15, atk: 0.003, rel: 0.2 },
    ]);
  }

  _stone_step() {
    this._playLayers([
      { noise: 'brown', dur: 0.08, gain: 0.3, lp: 400, atk: 0.005, rel: 0.25 },
      { noise: 'white', dur: 0.05, gain: 0.2, bp: 2000, bq: 1.5, atk: 0.003, rel: 0.2 },
    ]);
  }

  _stone_place() {
    this._playLayers([
      { noise: 'brown', dur: 0.15, gain: 0.45, lp: 300, atk: 0.005, rel: 0.3 },
      { noise: 'white', dur: 0.08, gain: 0.3, bp: 1500, bq: 2, atk: 0.003, rel: 0.2 },
      { wave: 'square', freq: 100, dur: 0.06, gain: 0.12, atk: 0.003, rel: 0.15 },
    ]);
  }

  // DIRT: Soft, muffled, earthy — low thud with damp grain
  _dirt_dig() {
    this._playLayers([
      // deep muffled thud
      { noise: 'brown', dur: 0.18, gain: 0.5, lp: 200, lq: 0.6, atk: 0.008, rel: 0.35 },
      // earthy grain
      { noise: 'pink', dur: 0.12, gain: 0.3, lp: 600, lq: 0.5, atk: 0.005, rel: 0.3 },
      // very faint top crunch
      { noise: 'white', dur: 0.06, gain: 0.1, bp: 1200, bq: 0.8, atk: 0.01, rel: 0.2 },
    ]);
  }

  _dirt_step() {
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
    this._playLayers([
      // wooden snap
      { noise: 'white', dur: 0.08, gain: 0.45, bp: 900, bq: 2.5, atk: 0.002, rel: 0.15 },
      // hollow body resonance
      { wave: 'sine', freq: 320, dur: 0.15, gain: 0.2, atk: 0.003, rel: 0.3 },
      // woody thud
      { noise: 'brown', dur: 0.12, gain: 0.35, bp: 400, bq: 1.2, atk: 0.005, rel: 0.3 },
      // second resonance
      { wave: 'triangle', freq: 180, dur: 0.1, gain: 0.1, atk: 0.005, rel: 0.25 },
    ]);
  }

  _wood_step() {
    this._playLayers([
      { noise: 'white', dur: 0.05, gain: 0.2, bp: 800, bq: 2, atk: 0.003, rel: 0.15 },
      { wave: 'sine', freq: 280, dur: 0.08, gain: 0.1, atk: 0.005, rel: 0.2 },
    ]);
  }

  _wood_place() {
    this._playLayers([
      { noise: 'white', dur: 0.06, gain: 0.35, bp: 900, bq: 2.5, atk: 0.002, rel: 0.12 },
      { wave: 'sine', freq: 300, dur: 0.1, gain: 0.15, atk: 0.003, rel: 0.25 },
      { noise: 'brown', dur: 0.08, gain: 0.2, bp: 350, bq: 1, atk: 0.005, rel: 0.2 },
    ]);
  }

  // LEAVES: Light, airy, wispy — delicate rustle
  _leaves_dig() {
    this._playLayers([
      // airy rustle
      { noise: 'white', dur: 0.12, gain: 0.25, hp: 4000, hq: 0.4, atk: 0.005, rel: 0.2 },
      // soft mid
      { noise: 'pink', dur: 0.1, gain: 0.15, bp: 3000, bq: 0.6, atk: 0.008, rel: 0.25 },
      // very faint body
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
    this._playLayers([
      // main hiss
      { noise: 'white', dur: 0.18, gain: 0.4, bp: 4000, bq: 0.7, atk: 0.003, rel: 0.2 },
      // fine scatter top
      { noise: 'white', dur: 0.12, gain: 0.3, hp: 6000, hq: 0.4, atk: 0.002, rel: 0.15 },
      // soft body
      { noise: 'brown', dur: 0.1, gain: 0.15, lp: 500, atk: 0.008, rel: 0.25 },
    ]);
  }

  _sand_step() {
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
    this._playLayers([
      // sharp shatter
      { noise: 'white', dur: 0.06, gain: 0.5, hp: 6000, hq: 1.5, atk: 0.001, rel: 0.1 },
      // tonal ping
      { wave: 'sine', freq: 1800, dur: 0.08, gain: 0.25, atk: 0.001, rel: 0.08 },
      // mid crackle
      { noise: 'white', dur: 0.05, gain: 0.3, bp: 4000, bq: 2, atk: 0.001, rel: 0.08 },
      // second ping
      { wave: 'triangle', freq: 2400, dur: 0.04, gain: 0.12, atk: 0.001, rel: 0.06 },
    ]);
  }

  _glass_place() {
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

  // ── PUBLIC API ───────────────────────────────────────────────────────

  dig(blockId) {
    switch (blockId) {
      case 3: case 4: case 11: case 12: case 13: case 14: case 25: case 30: case 32: case 59: case 60: case 62: case 63: case 64: case 65: case 68: case 73: case 74: case 77: // stone, cobble, coal ore, iron ore, gold ore, diamond ore, obsidian, terracotta, furnace, stone button, lever, stone pressure plate, copper ore, emerald ore, flower pot, iron door, greenstone ore, greenstone block, greenstone lamp
        return this._stone_dig();
      case 1: case 2: case 33: case 34: case 66: case 69: case 75: // grass, dirt, podzol, mycelium, carpet, wool, greenstone wire
        return this._dirt_dig();
      case 5: case 10: case 11: case 17: case 20: case 21: case 24: case 26: case 27: case 28: case 35: case 56: case 57: case 58: case 61: case 67: case 76: case 78: case 79: // wood, planks, pumpkin, cactus, bookshelf, TNT, crafting, netherrack, jungle wood, ladder, fence, door, sign, painting, greenstone torch, piston, sticky piston
        return this._wood_dig();
      case 6: case 36: // leaves, dark oak leaves
        return this._leaves_dig();
      case 7: case 29: // sand, red sand
        return this._sand_dig();
      case 16: case 46: // glass, glass pane
        return this._glass_dig();
      case 8: // water
        return this.splash();
      case 15: case 31: case 37: // snow, snow grass, snow block
        return this._dirt_dig();
      case 18: // gravel
        return this._sand_dig();
      case 19: // clay
        return this._dirt_dig();
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
      case 3: case 4: case 11: case 12: case 13: case 14: case 25: case 30: case 32: case 59: case 60: case 62: case 63: case 64: case 65: case 68: case 73: case 74: case 77:
        return this._stone_step();
      case 1: case 2: case 33: case 34: case 66: case 69: case 75:
        return this._dirt_step();
      case 5: case 10: case 17: case 20: case 21: case 24: case 26: case 27: case 28: case 35: case 56: case 57: case 58: case 61: case 67: case 76: case 78: case 79:
        return this._wood_step();
      case 6: case 36:
        return this._leaves_step();
      case 7: case 29: case 18:
        return this._sand_step();
      case 16: case 46:
        return this._glass_step ? this._glass_step() : this._wood_step();
      case 15: case 31: case 37:
        return this._dirt_step();
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
      case 3: case 4: case 11: case 12: case 13: case 14: case 25: case 30: case 32: case 59: case 60: case 62: case 63: case 64: case 65: case 68: case 73: case 74: case 77:
        return this._stone_place();
      case 1: case 2: case 33: case 34: case 66: case 69: case 75:
        return this._dirt_place();
      case 5: case 10: case 17: case 20: case 21: case 24: case 26: case 27: case 28: case 35: case 56: case 57: case 58: case 61: case 67: case 76: case 78: case 79:
        return this._wood_place();
      case 6: case 36:
        return this._leaves_place();
      case 7: case 29:
        return this._sand_place();
      case 16: case 46:
        return this._glass_place();
      case 15: case 31: case 37:
        return this._dirt_place();
      case 18: case 19:
        return this._sand_place();
      default:
        return this._dirt_place();
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
      { noise: 'white', dur: 0.12, gain: 0.4, bp: 800, bq: 2, atk: 0.002, rel: 0.15 },
      { noise: 'brown', dur: 0.1, gain: 0.25, lp: 300, atk: 0.003, rel: 0.2 },
      { wave: 'square', freq: 180, dur: 0.06, gain: 0.12, atk: 0.002, rel: 0.1 },
    ]);
  }

  hit() {
    if (!this.ctx || !this.enabled) return;
    this._playLayers([
      { noise: 'white', dur: 0.06, gain: 0.5, bp: 3500, bq: 1.5, atk: 0.001, rel: 0.08 },
      { noise: 'brown', dur: 0.08, gain: 0.3, lp: 600, atk: 0.002, rel: 0.1 },
      { wave: 'square', freq: 220, dur: 0.05, gain: 0.15, atk: 0.001, rel: 0.08 },
    ]);
  }

  // ── EATING SOUND ──────────────────────────────────────────────────────
  // Crunchy bite + chewy texture + soft swallow

  eatBite() {
    if (!this.ctx || !this.enabled) return;
    this._playLayers([
      // crunchy bite — sharp white noise snap
      { noise: 'white', dur: 0.06, gain: 0.35, hp: 2000, hq: 1.2, atk: 0.001, rel: 0.12 },
      // body crunch — brown noise thud
      { noise: 'brown', dur: 0.1, gain: 0.25, bp: 600, bq: 1.5, atk: 0.002, rel: 0.15 },
      // tonal crunch snap
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

  // ── ANIMAL SOUNDS ────────────────────────────────────────────────────
  // Real MP3 sounds loaded from /Sounds/

  _animalSound(files) {
    if (!this.enabled) return;
    const src = files[(Math.random() * files.length) | 0];
    const el = new window.Audio(assetUrl(src));
    el.volume = 0.6;
    el.play().catch(() => {});
  }

  cowSound() {
    this._animalSound([
      '/Sounds/cow_idle1.mp3',
      '/Sounds/cow_idle2.mp3',
      '/Sounds/cow_idle3.mp3',
      '/Sounds/cow_idle4.mp3',
      '/Sounds/cow_idle5.mp3',
    ]);
  }

  pigSound() {
    this._animalSound([
      '/Sounds/pig_idle1.mp3',
      '/Sounds/pig_idle2.mp3',
      '/Sounds/pig_idle3.mp3',
      '/Sounds/pig_idle4.mp3',
    ]);
  }

  sheepSound() {
    this._animalSound([
      '/Sounds/sheep_idle1.mp3',
      '/Sounds/sheep_idle2.mp3',
      '/Sounds/sheep_idle3.mp3',
      '/Sounds/sheep_idle4.mp3',
    ]);
  }

  hurtAnimal() {
    this._animalSound([
      '/Sounds/cow_hit1.mp3',
      '/Sounds/cow_hit2.mp3',
      '/Sounds/pig_hit1.mp3',
      '/Sounds/pig_hit2.mp3',
      '/Sounds/sheep_hit1.mp3',
    ]);
  }

  // ── HOSTILE MOB SOUNDS (procedural) ────────────────────────────────

  zombieSound() {
    if (!this.ctx || !this.enabled) return;
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

  creeperHiss() {
    if (!this.ctx || !this.enabled) return;
    const ctx = this.ctx;
    // Sharp hiss — escalating
    const dur = 0.5;
    const buf = this._noise(Math.floor(ctx.sampleRate * dur), ctx.sampleRate);
    const src = this._src(buf);
    const hp = this._filter('highpass', 2000, 0.6);
    const lp = this._filter('lowpass', 8000, 0.4);
    const g = this._gain(0);
    // Crescendo
    const t = ctx.currentTime;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.25, t + dur * 0.8);
    g.gain.linearRampToValueAtTime(0, t + dur);
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
}
