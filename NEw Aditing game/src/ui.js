export function toast(msg, ms = 2200) {
  const box = document.getElementById('toast');
  const el = document.createElement('div');
  el.className = 'toastmsg'; el.textContent = msg;
  box.appendChild(el);
  setTimeout(() => el.remove(), ms);
}

export function setTopbar(s) {
  document.getElementById('v-gold').textContent = Math.floor(s.gold);
  document.getElementById('v-elixir').textContent = Math.floor(s.elixir);
  document.getElementById('v-trophy').textContent = s.trophies;
}

export function setWaveLabel(t) {
  document.getElementById('v-wave').textContent = t;
}
