const Game = {
  EMOJIS: {
    Fire: "🔥", Water: "💧", Earth: "🌎", Wind: "🌬️",
  },

  lookup(a, b) {
    const key = [a, b].sort().join("+");
    return COMBO_LOOKUP[key] || null;
  },

  createElement(name, emoji, inWorkspace = false) {
    const el = document.createElement("div");
    el.className = "element" + (inWorkspace ? " in-workspace" : "");
    el.dataset.name = name;
    el.innerHTML = `<span class="emoji">${emoji}</span><span class="label">${name}</span>`;
    return el;
  },

  _emojiIndex: null,
  _indexKeys: null,
  _indexPos: 0,
  _indexReady: false,
  INDEX_CHUNK: 40000,

  lookup(a, b) {
    if (!this._indexReady) return null;
    const key = [a, b].sort().join("+");
    return COMBO_LOOKUP[key] || null;
  },

  /* Builds COMBO_LOOKUP + emoji index in small chunks so the page stays
     responsive on phones. Call repeatedly via setTimeout until it returns true. */
  buildIndexStep() {
    if (this._indexReady) return true;
    if (!this._indexKeys) {
      this._emojiIndex = {};
      this._indexKeys = Object.keys(COMBOS);
      this._indexPos = 0;
    }
    const end = Math.min(this._indexPos + this.INDEX_CHUNK, this._indexKeys.length);
    for (let i = this._indexPos; i < end; i++) {
      const key = this._indexKeys[i];
      const val = COMBOS[key];
      if (!val) continue;
      const parts = key.split("+");
      parts.sort();
      COMBO_LOOKUP[parts.join("+")] = val;
      if (val.name && !(val.name in this._emojiIndex)) {
        this._emojiIndex[val.name] = val.emoji;
      }
    }
    this._indexPos = end;
    if (this._indexPos >= this._indexKeys.length) {
      this._indexKeys = null;
      this._indexReady = true;
      return true;
    }
    return false;
  },

  indexProgress() {
    if (this._indexReady) return 1;
    if (!this._indexKeys || !this._indexKeys.length) return 0;
    return this._indexPos / this._indexKeys.length;
  },

  getEmoji(name) {
    if (this.EMOJIS[name]) return this.EMOJIS[name];
    if (this._emojiIndex && (name in this._emojiIndex)) return this._emojiIndex[name];
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

  combine(nameA, nameB, dropX, dropY) {
    const result = this.lookup(nameA, nameB);
    if (!result) {
      this.showToast("Nothing happens...");
      return null;
    }
    this.showCombineFlash(dropX, dropY);
    const isNew = State.addDiscovered(result.name);
    if (isNew) {
      this.showToast(`New: ${result.emoji} ${result.name}`);
    }
    return { name: result.name, emoji: result.emoji, isNew };
  }
};
