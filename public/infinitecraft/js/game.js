const Game = {
  API: 'https://blockforge-server.onrender.com',

  EMOJIS: {
    Fire: "🔥", Water: "💧", Earth: "🌎", Wind: "🌬️",
  },

  /* Server-side recipe lookup. cb(resultOrNull, ok).
     ok=false means the server couldn't be reached (NOT "no recipe"). */
  lookup(a, b, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', Game.API + '/api/ic-lookup?a=' + encodeURIComponent(a) + '&b=' + encodeURIComponent(b), true);
    xhr.timeout = 20000;
    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          var d = JSON.parse(xhr.responseText);
          cb(d.result || null, true);
          return;
        } catch (e) { /* fall through */ }
      }
      cb(null, false);
    };
    xhr.onerror = function() { cb(null, false); };
    xhr.ontimeout = function() { cb(null, false); };
    xhr.send();
  },

  /* Batch-fill emoji cache for names we haven't seen. cb() always runs. */
  fetchEmojis(names, cb) {
    var missing = [];
    for (var i = 0; i < names.length; i++) {
      var n = names[i];
      if (!this.EMOJIS[n] && !State.emojiCache[n]) missing.push(n);
    }
    if (!missing.length) { if (cb) cb(); return; }
    var q = '';
    for (var j = 0; j < missing.length; j++) {
      q += (j ? '&' : '') + 'n=' + encodeURIComponent(missing[j]);
    }
    var xhr = new XMLHttpRequest();
    xhr.open('GET', Game.API + '/api/ic-emojis?' + q, true);
    xhr.timeout = 20000;
    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          var d = JSON.parse(xhr.responseText);
          var changed = false;
          for (var k in d.emojis) {
            if (d.emojis[k] && !State.emojiCache[k]) {
              State.emojiCache[k] = d.emojis[k];
              changed = true;
            }
          }
          if (changed) State.save();
        } catch (e) { /* ignore */ }
      }
      if (cb) cb();
    };
    xhr.onerror = function() { if (cb) cb(); };
    xhr.ontimeout = function() { if (cb) cb(); };
    xhr.send();
  },

  createElement(name, emoji, inWorkspace = false) {
    const el = document.createElement("div");
    el.className = "element" + (inWorkspace ? " in-workspace" : "");
    el.dataset.name = name;
    el.innerHTML = `<span class="emoji">${emoji}</span><span class="label">${name}</span>`;
    return el;
  },

  getEmoji(name) {
    if (this.EMOJIS[name]) return this.EMOJIS[name];
    if (State.emojiCache[name]) return State.emojiCache[name];
    return "⭐";
  },

  showToast(msg) {
    const toast = document.getElementById("toast");
    toast.textContent = msg;
    toast.classList.remove("hidden");
    toast.classList.add("visible");
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => {
      toast.classList.remove("visible");
      toast.classList.add("hidden");
    }, 2500);
  },

  showCombineFlash(x, y) {
    const flash = document.createElement("div");
    flash.className = "combine-flash";
    flash.style.left = x + "px";
    flash.style.top = y + "px";
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 500);
  },

  combine(nameA, nameB, dropX, dropY, cb) {
    var self = this;
    this.lookup(nameA, nameB, function(result, ok) {
      if (!ok) {
        self.showToast("Couldn't reach server — check connection");
        cb(null);
        return;
      }
      if (!result) {
        self.showToast("Nothing happens...");
        cb(null);
        return;
      }
      self.showCombineFlash(dropX, dropY);
      if (result.emoji) State.emojiCache[result.name] = result.emoji;
      const isNew = State.addDiscovered(result.name);
      if (isNew) {
        self.showToast(`New: ${result.emoji} ${result.name}`);
      }
      cb({ name: result.name, emoji: result.emoji, isNew: isNew });
    });
  }
};
