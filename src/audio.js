// AudioManager: real CC0 sound samples (Kenney.nl, public domain) layered on
// top of fully procedural Web Audio synthesis as a fallback when samples are
// still loading or unavailable.

// Expand a base name into the numbered variants Kenney ships (e.g. 000..004).
const variants = (base, n, pad = 3) =>
  Array.from({ length: n }, (_, i) => `${base}_${String(i).padStart(pad, '0')}`);

const SFX_FILES = [
  // ── Footsteps: one surface set per material ──
  // Real per-material CC0 recordings (Fantozzi + field-recorded step sets) so
  // sand, gravel, snow, dirt and wood each have their own true footstep timbre.
  'Fantozzi-StoneL1', 'Fantozzi-StoneL2', 'Fantozzi-StoneL3',
  'Fantozzi-StoneR1', 'Fantozzi-StoneR2', 'Fantozzi-StoneR3',
  'Fantozzi-SandL1', 'Fantozzi-SandL2', 'Fantozzi-SandL3',
  'Fantozzi-SandR1', 'Fantozzi-SandR2', 'Fantozzi-SandR3',
  'stone_step1', 'stone_step2', 'stone_step3',
  'dirt_step1', 'dirt_step2', 'dirt_step3',
  'sand_step1', 'gravel_step1', 'gravel_step2',
  'snow_step1', 'snow_step2', 'snow_step3',
  'wood_step1', 'wood_step2', 'wood_step3',
  ...variants('footstep_concrete', 5),
  ...variants('footstep_grass', 5),
  ...variants('footstep_wood', 5),
  ...variants('footstep_snow', 5),
  ...variants('footstep_carpet', 5),
  // ── Impacts: full per-material coverage for break/place ──
  ...variants('impactMining', 4),
  ...variants('impactGeneric_light', 5),
  ...variants('impactGlass_light', 5),
  ...variants('impactGlass_medium', 5),
  ...variants('impactGlass_heavy', 5),
  ...variants('impactWood_light', 5),
  ...variants('impactWood_medium', 5),
  ...variants('impactWood_heavy', 5),
  ...variants('impactPlank_medium', 5),
  ...variants('impactMetal_light', 5),
  ...variants('impactMetal_medium', 5),
  ...variants('impactMetal_heavy', 5),
  ...variants('impactPlate_light', 5),
  ...variants('impactPlate_medium', 5),
  ...variants('impactTin_medium', 5),
  ...variants('impactSoft_heavy', 5),
  ...variants('impactSoft_medium', 5),
  ...variants('impactPunch_heavy', 5),
  ...variants('impactPunch_medium', 5),
  ...variants('impactBell_heavy', 5),
  // ── RPG pack: organic material sounds ──
  'chop', 'creak1', 'creak2', 'creak3',
  'cloth1', 'cloth2', 'cloth3', 'cloth4',
  'metalPot1', 'metalPot2', 'metalPot3', 'metalClick', 'metalLatch',
  ...variants('footstep', 10, 2),
  // ── Animals / mobs ──
  'animal_cow_1', 'animal_cow_2', 'animal_pig_1', 'animal_sheep_1',
  'animal_chicken_1', 'animal_chicken_2', 'animal_bat_1',
  'mob_snarl_1', 'mob_snarl_attack',
  // ── UI ──
  'powerUp2', 'click_001', 'click_002', 'click_003',
];

// CC0 playlist chosen to match Minecraft's ambience: sparse solo piano and
// slow contemplative pads rather than beat-driven synth. See Music/CREDITS.txt.
const MUSIC_TRACKS = [
  'Music/mystical-piano.mp3',
  'Music/slow-piano-intermission.ogg',
  'Music/november-snow.mp3',
  'Music/esther.ogg',
  'Music/another-august.mp3',
  'Music/contemplation.mp3',
  'Music/exploration-theme.ogg',
  'Music/cave-explorer.mp3',
  'Music/emerald-tower.ogg',
  'Music/calm-relaxing.mp3',
];

// ── Per-material footstep samples ──
// Real CC0 recordings where they exist (stone/dirt/sand/gravel/snow/wood), with
// the Kenney surface sets as a varied supplement.
const STEP_SAMPLES = {
  stone:      ['Fantozzi-StoneL1', 'Fantozzi-StoneL2', 'Fantozzi-StoneL3', 'Fantozzi-StoneR1', 'Fantozzi-StoneR2', 'Fantozzi-StoneR3', 'stone_step1', 'stone_step2', 'stone_step3'],
  dirt:       ['dirt_step1', 'dirt_step2', 'dirt_step3', 'footstep_grass_000', 'footstep_grass_001', 'footstep_grass_002'],
  grass:      variants('footstep_grass', 5),
  leaves:     ['cloth1', 'cloth2', 'cloth3', 'cloth4'],
  wood:       ['wood_step1', 'wood_step2', 'wood_step3', 'footstep_wood_000', 'footstep_wood_001', 'footstep_wood_002'],
  sand:       ['Fantozzi-SandL1', 'Fantozzi-SandL2', 'Fantozzi-SandL3', 'Fantozzi-SandR1', 'Fantozzi-SandR2', 'Fantozzi-SandR3', 'sand_step1'],
  snow:       ['snow_step1', 'snow_step2', 'snow_step3', 'footstep_snow_000', 'footstep_snow_001', 'footstep_snow_002'],
  gravel:     ['gravel_step1', 'gravel_step2'],
  glass:      ['Fantozzi-StoneL1', 'Fantozzi-StoneL2', 'Fantozzi-StoneR1', 'Fantozzi-StoneR2'],
  metal:      ['metalClick', 'metalLatch', 'metalPot1', 'metalPot2', 'impactMetal_light_000'],
  brimstone:  ['Fantozzi-StoneL1', 'Fantozzi-StoneL2', 'Fantozzi-StoneL3', 'Fantozzi-StoneR1', 'Fantozzi-StoneR2', 'Fantozzi-StoneR3'],
  plant:      ['cloth1', 'cloth2', 'cloth3', 'cloth4'],
  wool:       variants('footstep_carpet', 5),
  liquid:     variants('footstep_carpet', 5),
};

// ── Per-material break samples ──
// Each material gets its own timbre so mining sandstone doesn't sound like glass.
const BREAK_SAMPLES = {
  stone:      variants('impactMining', 4),
  dirt:       variants('impactSoft_medium', 5),
  grass:      variants('impactSoft_medium', 5),
  leaves:     ['cloth1', 'cloth2', 'cloth3', 'cloth4'],
  wood:       ['chop', ...variants('impactWood_medium', 5)],
  sand:       variants('impactSoft_heavy', 5),
  snow:       variants('impactSoft_medium', 5),
  gravel:     variants('impactSoft_heavy', 5),
  glass:      variants('impactGlass_medium', 5),
  metal:      variants('impactMetal_medium', 5),
  brimstone:  variants('impactMining', 4),
  plant:      ['cloth1', 'cloth2', 'cloth3', 'cloth4'],
  wool:       variants('impactSoft_medium', 5),
  liquid:     variants('impactSoft_medium', 5),
};

// ── Per-material mining tick samples ──
// Light, short sounds for the ongoing "chipping away" texture during mining.
// These repeat every ~0.3s so they need to be subtle and non-fatiguing.
const MINE_SAMPLES = {
  stone:      variants('impactMining', 4),
  dirt:       variants('impactSoft_medium', 5),
  grass:      variants('impactSoft_medium', 5),
  leaves:     ['cloth1', 'cloth2', 'cloth3', 'cloth4'],
  wood:       ['chop', ...variants('impactWood_light', 5)],
  sand:       variants('impactSoft_medium', 5),
  snow:       variants('impactSoft_medium', 5),
  gravel:     variants('impactSoft_medium', 5),
  glass:      variants('impactGlass_light', 5),
  metal:      variants('impactMetal_light', 5),
  brimstone:  variants('impactMining', 4),
  plant:      ['cloth1', 'cloth2', 'cloth3', 'cloth4'],
  wool:       variants('impactSoft_medium', 5),
  liquid:     variants('impactSoft_medium', 5),
};

// ── Per-material place samples ──
// Placing is a lighter, shorter version of the same material's break sound.
const PLACE_SAMPLES = {
  stone:      variants('impactPlate_medium', 5),
  dirt:       variants('impactSoft_medium', 5),
  grass:      variants('impactSoft_medium', 5),
  leaves:     ['cloth1', 'cloth2', 'cloth3', 'cloth4'],
  wood:       variants('impactWood_light', 5),
  sand:       variants('impactSoft_medium', 5),
  snow:       variants('impactSoft_medium', 5),
  gravel:     variants('impactSoft_heavy', 5),
  glass:      variants('impactGlass_light', 5),
  metal:      variants('impactMetal_light', 5),
  brimstone:  variants('impactPlate_medium', 5),
  plant:      ['cloth1', 'cloth2', 'cloth3', 'cloth4'],
  wool:       variants('footstep_carpet', 5),
  liquid:     variants('impactSoft_medium', 5),
};

// ── Per-animal / per-mob voices ──
// idle = ambient call, hurt = pain, death = final cry. Pitch shifts give each
// species a distinct register from a small CC0 sample pool.
const MOB_VOICES = {
  cow:       { idle: ['animal_cow_1', 'animal_cow_2'], rate: 0.85 },
  pig:       { idle: ['animal_pig_1'],                 rate: 1.15 },
  sheep:     { idle: ['animal_sheep_1'],               rate: 1.0 },
  chicken:   { idle: ['animal_chicken_1', 'animal_chicken_2'], rate: 1.35 },
  villager:  { idle: ['animal_pig_1'],                 rate: 0.7 },
  zombie:    { idle: ['mob_snarl_1'],                  rate: 0.75 },
  skeleton:  { idle: ['metalClick', 'metalLatch'],     rate: 1.0 },
  spider:    { idle: ['animal_bat_1'],                 rate: 1.2 },
  slime:     { idle: variants('impactSoft_medium', 5), rate: 0.9 },
  blower:    { idle: ['animal_bat_1'],                 rate: 0.8 },
  portalman: { idle: ['mob_snarl_1'],                  rate: 1.4 },
  dragon:    { idle: ['mob_snarl_attack'],             rate: 0.6 },
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
  _sample(names, vol = 0.5, pitchVar = 0.06, baseRate = 1) {
    if (!this.ctx || !this.enabled) return false;
    if (Array.isArray(names)) {
      if (!names.length) return false;
      names = names[Math.floor(Math.random() * names.length)];
    }
    const buf = this.sfx[names];
    if (!buf) return false;
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    // baseRate sets the species/material register; pitchVar adds per-hit jitter.
    src.playbackRate.value = baseRate * (1 + (Math.random() * 2 - 1) * pitchVar);
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

  // Scratchy "digging" crackle heard for the whole duration of mining a block,
  // not just on the final break. A running low thud plus loosely-spaced
  // band-filtered noise ticks that ramp in speed as the block is about to give.
  // Played periodically (every ~0.3s) from the breaking loop in main.js.
  blockMine(blockId) {
    if (!this.ctx || !this.enabled) return;
    const mat = this._material(blockId);
    // CC0 mining sample is the PRIMARY sound — loud and prominent. Procedural
    // layers add subtle texture underneath but don't overpower the real audio.
    this._sample(MINE_SAMPLES[mat], 0.45, 0.12, 1.1);
    const t0 = this.ctx.currentTime;
    // Subtle low thud — just enough to give weight without masking the sample.
    if (mat === 'metal') this._playLayers([
      { noise: 'white', dur: 0.04, gain: 0.08, bp: 3200, bq: 6, atk: 0.002, rel: 0.03 },
    ]);
    else this._playLayers([
      { noise: 'brown', dur: 0.06, gain: 0.1, lp: 600, atk: 0.003, rel: 0.05 },
    ]);

    // One scratch tick — quieter, adds "chipping" texture.
    const scratch = mat === 'glass' || mat === 'metal'
      ? { noise: 'white', bp: 4600, bq: 4, gain: 0.06 }
      : { noise: 'white', bp: 2200, bq: 5, gain: 0.08 };
    const n = this._noise(Math.floor(this.ctx.sampleRate * 0.04), this.ctx.sampleRate);
    const start = t0 + 0.03;
    const src = this._src(n);
    const f = this._filter('bandpass', scratch.bp + (Math.random() - 0.5) * 600, scratch.bq);
    const g = this._gain(0);
    const peak = scratch.gain * (0.7 + Math.random() * 0.4);
    g.gain.setValueAtTime(0, start);
    g.gain.linearRampToValueAtTime(peak, start + 0.003);
    g.gain.setValueAtTime(peak, start + 0.02);
    g.gain.linearRampToValueAtTime(0, start + 0.04);
    src.connect(f); f.connect(g); g.connect(this.master);
    src.start(start);
    src.stop(start + 0.05);
    src.onended = () => { try { f.disconnect(); g.disconnect(); src.disconnect(); } catch (_) {} };
  }

  blockBreak(blockId) {
    if (!this.ctx || !this.enabled) return;
    const mat = this._material(blockId);
    // Per-material sample first; procedural synthesis is the fallback.
    if (this._sample(BREAK_SAMPLES[mat], 0.5, 0.07)) return;
    switch (mat) {
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
    const mat = this._material(blockId);
    if (this._sample(PLACE_SAMPLES[mat], 0.45, 0.07)) return;
    switch (mat) {
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

  // ── Per-animal mob voices ────────────────────────────────────────────
  // `kind` is a MOB_TYPES key (cow, pig, sheep, chicken, zombie, ...).
  // Each species has its own sample set and base pitch, so a chicken and a
  // dragon never share a voice.
  _mobVoice(kind, mode, vol) {
    const v = MOB_VOICES[kind];
    if (!v) return false;
    // hurt is pitched up and clipped short; death is pitched down and slower.
    const rate = v.rate * (mode === 'hurt' ? 1.25 : mode === 'death' ? 0.7 : 1);
    return this._sample(v.idle, vol, 0.08, rate);
  }

  mobIdle(kind) {
    if (!this.ctx || !this.enabled) return;
    this._mobVoice(kind, 'idle', 0.35);
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

  // `kind` is optional — when given, the species' own voice is used so a cow
  // and a skeleton sound different when hit.
  mobHurt(kind) {
    if (!this.ctx || !this.enabled) return;
    if (kind && this._mobVoice(kind, 'hurt', 0.45)) return;
    if (this._sample(variants('impactPunch_medium', 5), 0.45, 0.06)) return;
    this._playLayers([
      { noise: 'brown', dur: 0.12, gain: 0.32, lp: 500, atk: 0.003, rel: 0.3 },
      { wave: 'sine', freq: 160, dur: 0.1, gain: 0.14, atk: 0.005, rel: 0.25 },
    ]);
  }

  mobDeath(kind) {
    if (!this.ctx || !this.enabled) return;
    if (kind && this._mobVoice(kind, 'death', 0.5)) return;
    if (this._sample(variants('impactSoft_heavy', 5), 0.5, 0.05)) return;
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

  throwProjectile() {
    if (!this.ctx || !this.enabled) return;
    this._playLayers([
      { noise: 'white', dur: 0.1, gain: 0.14, bp: 2200, bq: 1.2, atk: 0.002, rel: 0.2 },
    ]);
  }

  teleport() {
    if (!this.ctx || !this.enabled) return;
    if (this._sample('powerUp2', 0.3, 0)) return;
    const t0 = this.ctx.currentTime;
    [64, 70, 76].forEach((n, i) => {
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = 440 * Math.pow(2, (n - 69) / 12);
      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0, t0 + i * 0.06);
      g.gain.linearRampToValueAtTime(0.18, t0 + i * 0.06 + 0.01);
      g.gain.exponentialRampToValueAtTime(0.001, t0 + i * 0.06 + 0.35);
      osc.connect(g).connect(this.master);
      osc.start(t0 + i * 0.06);
      osc.stop(t0 + i * 0.06 + 0.4);
    });
  }

  portalOpen() {
    if (!this.ctx || !this.enabled) return;
    const t0 = this.ctx.currentTime;
    // Airy whoosh down, then shimmer up — a "portal opening" feel.
    const noise = this.ctx.createBufferSource();
    const len = this.ctx.sampleRate * 0.35;
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
    noise.buffer = buf;
    const bp = this.ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(400, t0);
    bp.frequency.exponentialRampToValueAtTime(2600, t0 + 0.3);
    bp.Q.value = 1.4;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(0.22, t0 + 0.08);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.35);
    noise.connect(bp).connect(g).connect(this.master);
    noise.start(t0);
    noise.stop(t0 + 0.4);
    // Rising shimmer
    [76, 80, 84].forEach((n, i) => {
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = 440 * Math.pow(2, (n - 69) / 12);
      const og = this.ctx.createGain();
      og.gain.setValueAtTime(0, t0 + i * 0.05);
      og.gain.linearRampToValueAtTime(0.08, t0 + i * 0.05 + 0.02);
      og.gain.exponentialRampToValueAtTime(0.001, t0 + i * 0.05 + 0.3);
      osc.connect(og).connect(this.master);
      osc.start(t0 + i * 0.05);
      osc.stop(t0 + i * 0.05 + 0.35);
    });
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
