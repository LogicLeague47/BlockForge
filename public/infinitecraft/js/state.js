const State = {
  KEY: "infinite-craft-state",
  discovered: new Set(["Fire", "Water", "Earth", "Wind"]),
  workspace: [],

  load() {
    try {
      const raw = localStorage.getItem(this.KEY);
      if (raw) {
        const data = JSON.parse(raw);
        this.discovered = new Set(data.discovered || ["Fire", "Water", "Earth", "Wind"]);
      }
    } catch { /* ignore */ }
  },

  save() {
    localStorage.setItem(this.KEY, JSON.stringify({
      discovered: [...this.discovered],
    }));
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
    this.discovered = new Set(["Fire", "Water", "Earth", "Wind"]);
    this.workspace = [];
    this.save();
  }
};
