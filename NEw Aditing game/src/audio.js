let ctx = null;
export function blip(freq = 440, dur = 0.08, type = 'square', vol = 0.06) {
  try {
    ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type; o.frequency.value = freq;
    g.gain.value = vol;
    o.connect(g); g.connect(ctx.destination);
    o.start(); g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
    o.stop(ctx.currentTime + dur);
  } catch {}
}
export const sfx = {
  place: () => blip(520, 0.09),
  merge: () => { blip(660, 0.08); setTimeout(() => blip(880, 0.12), 70); },
  shoot: () => blip(300 + Math.random() * 200, 0.05, 'square', 0.02),
  boom: () => blip(120, 0.25, 'sawtooth', 0.08),
  coin: () => { blip(990, 0.07); setTimeout(() => blip(1320, 0.1), 60); },
  star: () => { blip(740, 0.1); setTimeout(() => blip(980, 0.1), 90); setTimeout(() => blip(1240, 0.16), 180); },
  lose: () => blip(180, 0.4, 'sawtooth', 0.07),
};
