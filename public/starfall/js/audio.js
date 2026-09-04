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
  // --- CC0 music (SRG774 Dark Sci-Fi pack, public domain) ---
  var musicMenu = null, musicGame = null, musicOn = true, currentTrack = null;
  try { musicOn = localStorage.getItem('starfall_mute') !== '1'; } catch (e) {}
  function track(name) {
    if (name === 'menu') {
      if (!musicMenu) { musicMenu = new Audio('assets/music/menu.mp3'); musicMenu.loop = true; musicMenu.volume = 0.5; }
      return musicMenu;
    }
    if (!musicGame) { musicGame = new Audio('assets/music/game.mp3'); musicGame.loop = true; musicGame.volume = 0.45; }
    return musicGame;
  }
  function playMusic(name) {
    try {
      var t = track(name);
      if (currentTrack === t) { if (musicOn && t.paused) t.play(); return; }
      if (currentTrack) currentTrack.pause();
      currentTrack = t;
      if (musicOn) t.play();
    } catch (e) {}
  }
  return {
    unlock: ac,
    musicMenu: function() { playMusic('menu'); },
    musicGame: function() { playMusic('game'); },
    musicStop: function() { try { if (currentTrack) currentTrack.pause(); currentTrack = null; } catch (e) {} },
    musicDuck: function(duck) {
      try {
        if (musicMenu) musicMenu.volume = duck ? 0.15 : 0.5;
        if (musicGame) musicGame.volume = duck ? 0.15 : 0.45;
      } catch (e) {}
    },
    isMusicOn: function() { return musicOn; },
    toggleMusic: function() {
      musicOn = !musicOn;
      try { localStorage.setItem('starfall_mute', musicOn ? '0' : '1'); } catch (e) {}
      try {
        if (!musicOn && currentTrack) currentTrack.pause();
        else if (musicOn && currentTrack) currentTrack.play();
      } catch (e) {}
      return musicOn;
    },
    click: function() { beep(660, 0.07, 'square', 0.05); },
    shoot: function() { beep(880, 0.08, 'sawtooth', 0.025, 220); },
    hit: function() { beep(160, 0.1, 'sawtooth', 0.05, 60); },
    pickup: function() { beep(1320, 0.06, 'sine', 0.04, 1980); },
    levelup: function() { beep(523, 0.1, 'square', 0.06); setTimeout(function(){ beep(659, 0.1, 'square', 0.06); }, 90); setTimeout(function(){ beep(784, 0.16, 'square', 0.06); }, 180); },
    hurt: function() { beep(110, 0.2, 'sawtooth', 0.08, 55); },
    over: function() { beep(330, 0.25, 'triangle', 0.08, 110); setTimeout(function(){ beep(220, 0.4, 'triangle', 0.08, 70); }, 220); },
  };
})();
