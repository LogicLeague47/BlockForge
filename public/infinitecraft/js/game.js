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

  buildEmojiIndex() {
    if (this._emojiIndex) return;
    this._emojiIndex = {};
    for (const key in COMBOS) {
      const val = COMBOS[key];
      if (val && val.name && !(val.name in this._emojiIndex)) {
        this._emojiIndex[val.name] = val.emoji;
      }
    }
  },

  getEmoji(name) {
    if (this.EMOJIS[name]) return this.EMOJIS[name];
    this.buildEmojiIndex();
    return this._emojiIndex[name] || "⭐";
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
