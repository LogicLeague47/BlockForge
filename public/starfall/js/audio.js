// Tiny WebAudio synth — no assets needed.
var STAR_Audio = (function() {
  var ctx = null;
  function ac() {
    if (!ctx) { try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} }
    if (ctx && ctx.state === 'suspended') ctx.resume();
    return ctx;
  }
  function beep(freq, dur, type, vol, slide) {
    var c = ac();
    if (!c) return;
    try {
      var o = c.createOscillator(), g = c.createGain();
      o.type = type || 'square';
      o.frequency.setValueAtTime(freq, c.currentTime);
      if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(20, slide), c.currentTime + dur);
      g.gain.setValueAtTime(vol || 0.06, c.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur);
      o.connect(g); g.connect(c.destination);
      o.start(); o.stop(c.currentTime + dur);
    } catch (e) {}
  }
  return {
    unlock: ac,
    click: function() { beep(660, 0.07, 'square', 0.05); },
    shoot: function() { beep(880, 0.08, 'sawtooth', 0.025, 220); },
    hit: function() { beep(160, 0.1, 'sawtooth', 0.05, 60); },
    pickup: function() { beep(1320, 0.06, 'sine', 0.04, 1980); },
    levelup: function() { beep(523, 0.1, 'square', 0.06); setTimeout(function(){ beep(659, 0.1, 'square', 0.06); }, 90); setTimeout(function(){ beep(784, 0.16, 'square', 0.06); }, 180); },
    hurt: function() { beep(110, 0.2, 'sawtooth', 0.08, 55); },
    over: function() { beep(330, 0.25, 'triangle', 0.08, 110); setTimeout(function(){ beep(220, 0.4, 'triangle', 0.08, 70); }, 220); },
  };
})();
