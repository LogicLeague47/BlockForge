const State = {
  KEY: "infinite-craft-state",
  STARTERS: ["Fire", "Water", "Earth", "Wind"],
  discovered: new Set(["Fire", "Water", "Earth", "Wind"]),
  emojiCache: {},
  workspace: [],

  load() {
    try {
      const raw = localStorage.getItem(this.KEY);
      if (raw) {
        const data = JSON.parse(raw);
        this.discovered = new Set(data.discovered || this.STARTERS);
        this.emojiCache = data.emojiCache || {};
      }
    } catch (e) { /* ignore */ }
  },

  save() {
    try {
      const arr = [];
      this.discovered.forEach(function(n) { arr.push(n); });
      // Cap the emoji cache so we never blow the localStorage quota.
      const keys = Object.keys(this.emojiCache);
      const cache = {};
      const start = Math.max(0, keys.length - 2000);
      for (let i = start; i < keys.length; i++) {
        cache[keys[i]] = this.emojiCache[keys[i]];
      }
      this.emojiCache = cache;
      localStorage.setItem(this.KEY, JSON.stringify({
        discovered: arr,
        emojiCache: cache,
      }));
    } catch (e) { /* quota or private mode — game still works in memory */ }
  },

  addDiscovered(name) {
    if (!this.discovered.has(name)) {
      this.discovered.add(name);
      this.save();
      return true;
    }
    return false;
  },

  reset() {
    this.discovered = new Set(this.STARTERS);
    this.emojiCache = {};
    this.workspace = [];
    this.save();
  }
};
