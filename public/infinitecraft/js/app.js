const App = {
  workspaceElements: [],
  _id: 0,

  init() {
    State.load();
    this.renderSidebar();
    this.initBg();
    this.bindEvents();
    this.updateCounter();
  },

  renderSidebar(filter = "") {
    const list = document.getElementById("element-list");
    list.innerHTML = "";
    const sorted = [...State.discovered].sort((a, b) => a.localeCompare(b));
    const filtered = filter
      ? sorted.filter(n => n.toLowerCase().includes(filter.toLowerCase()))
      : sorted;

    filtered.forEach(name => {
      const emoji = Game.getEmoji(name);
      const el = Game.createElement(name, emoji, false);
      this.makeSidebarDraggable(el);
      list.appendChild(el);
    });
  },

  addToWorkspace(name, x, y) {
    const emoji = Game.getEmoji(name);
    const ws = document.getElementById("workspace");
    const el = Game.createElement(name, emoji, true);
    const id = ++this._id;
    el.dataset.wsId = id;

    const wsRect = ws.getBoundingClientRect();
    let px, py;
    if (x !== undefined && y !== undefined) {
      px = x - wsRect.left;
      py = y - wsRect.top;
    } else {
      px = 80 + Math.random() * (wsRect.width - 200);
      py = 60 + Math.random() * (wsRect.height - 140);
    }
    px = Math.max(10, Math.min(px, wsRect.width - 120));
    py = Math.max(10, Math.min(py, wsRect.height - 50));

    el.style.left = px + "px";
    el.style.top = py + "px";
    el.classList.add("pop-in");
    this.makeWorkspaceDraggable(el);
    ws.appendChild(el);
    this.workspaceElements.push({ name, el, id });
    ws.classList.add("has-elements");
  },

  removeElement(el) {
    el.style.transition = "all 0.25s ease";
    el.style.opacity = "0";
    el.style.transform = (el.style.transform || "") + " scale(0.4)";
    el.style.pointerEvents = "none";
    setTimeout(() => el.remove(), 250);
  },

  updateCounter() {
    document.getElementById("counter").textContent =
      `${State.discovered.size} / ∞`;
  },

  /* ── Sidebar drag ── */
  makeSidebarDraggable(el) {
    el.addEventListener("mousedown", (e) => {
      if (e.button !== 0) return;
      e.preventDefault();
      const name = el.dataset.name;
      const emoji = Game.getEmoji(name);

      const ghost = Game.createElement(name, emoji, true);
      ghost.style.position = "fixed";
      ghost.style.zIndex = "10000";
      ghost.style.pointerEvents = "none";
      ghost.style.opacity = "0.85";
      ghost.style.transition = "none";
      ghost.classList.remove("pop-in");
      ghost.style.left = (e.clientX - 60) + "px";
      ghost.style.top = (e.clientY - 45) + "px";
      document.body.appendChild(ghost);

      let lastTarget = null;

      const onMove = (ev) => {
        ghost.style.left = (ev.clientX - 60) + "px";
        ghost.style.top = (ev.clientY - 45) + "px";

        const t = this._findTarget(ev.clientX, ev.clientY, null);
        if (t !== lastTarget) {
          if (lastTarget) lastTarget.classList.remove("drop-target");
          if (t) t.classList.add("drop-target");
          lastTarget = t;
        }
      };

      const onUp = (ev) => {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
        ghost.remove();
        if (lastTarget) lastTarget.classList.remove("drop-target");

        const ws = document.getElementById("workspace");
        const wsRect = ws.getBoundingClientRect();
        if (
          ev.clientX >= wsRect.left && ev.clientX <= wsRect.right &&
          ev.clientY >= wsRect.top && ev.clientY <= wsRect.bottom
        ) {
          const target = this._findTarget(ev.clientX, ev.clientY, null);
          if (target) {
            this._combine(name, target.dataset.name, ev.clientX, ev.clientY, null, target);
          } else {
            this.addToWorkspace(name, ev.clientX, ev.clientY);
          }
        }
      };

      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    });
  },

  /* ── Workspace drag ── */
  makeWorkspaceDraggable(el) {
    el.addEventListener("mousedown", (e) => {
      if (e.button !== 0) return;
      e.preventDefault();
      e.stopPropagation();

      const ws = document.getElementById("workspace");
      const wsRect = ws.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const offX = e.clientX - elRect.left;
      const offY = e.clientY - elRect.top;

      el.classList.add("dragging");
      el.style.zIndex = "100";
      el.style.transition = "none";

      let lastTarget = null;

      const onMove = (ev) => {
        const nx = ev.clientX - wsRect.left - offX;
        const ny = ev.clientY - wsRect.top - offY;
        el.style.left = Math.max(0, nx) + "px";
        el.style.top = Math.max(0, ny) + "px";

        const t = this._findTarget(ev.clientX, ev.clientY, el);
        if (t !== lastTarget) {
          if (lastTarget) lastTarget.classList.remove("drop-target");
          if (t) t.classList.add("drop-target");
          lastTarget = t;
        }
      };

      const onUp = (ev) => {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
        el.classList.remove("dragging");
        el.style.transition = "";
        if (lastTarget) lastTarget.classList.remove("drop-target");

        const wsRect2 = ws.getBoundingClientRect();
        if (
          ev.clientX < wsRect2.left || ev.clientX > wsRect2.right ||
          ev.clientY < wsRect2.top || ev.clientY > wsRect2.bottom
        ) {
          this.removeElement(el);
          this.workspaceElements = this.workspaceElements.filter(w => w.el !== el);
          if (!ws.querySelector(".element")) ws.classList.remove("has-elements");
          return;
        }

        const target = this._findTarget(ev.clientX, ev.clientY, el);
        if (target) {
          this._combine(el.dataset.name, target.dataset.name, ev.clientX, ev.clientY, el, target);
        }
      };

      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    });

    el.addEventListener("dblclick", () => {
      this.removeElement(el);
      this.workspaceElements = this.workspaceElements.filter(w => w.el !== el);
      const ws = document.getElementById("workspace");
      if (!ws.querySelector(".element")) ws.classList.remove("has-elements");
    });
  },

  /* ── Collision detection ── */
  _findTarget(x, y, excludeEl) {
    const ws = document.getElementById("workspace");
    const children = ws.querySelectorAll(".element");
    let best = null;
    let bestArea = Infinity;

    for (let i = 0; i < children.length; i++) {
      const other = children[i];
      const r = other.getBoundingClientRect();

      if (r.width === 0 || r.height === 0) continue;
      if (x < r.left || x > r.right || y < r.top || y > r.bottom) continue;

      if (excludeEl && other === excludeEl) continue;

      const area = r.width * r.height;
      if (area < bestArea) {
        bestArea = area;
        best = other;
      }
    }
    return best;
  },

  /* ── Combine ── */
  _combine(nameA, nameB, x, y, elA, elB) {
    const result = Game.combine(nameA, nameB, x, y);
    if (result) {
      if (result.isNew) {
        this.renderSidebar(document.getElementById("search").value);
        this.updateCounter();
      }
      if (elA) this.removeElement(elA);
      if (elB) this.removeElement(elB);
      this.workspaceElements = this.workspaceElements.filter(
        w => w.el !== elA && w.el !== elB
      );
      setTimeout(() => this.addToWorkspace(result.name, x, y), 280);
    } else {
      if (elB) {
        elB.classList.add("fail");
        setTimeout(() => elB.classList.remove("fail"), 400);
      }
    }
  },

  bindEvents() {
    document.getElementById("search").addEventListener("input", (e) => {
      this.renderSidebar(e.target.value);
    });

    document.getElementById("reset-btn").addEventListener("click", () => {
      if (confirm("Reset all progress?")) {
        State.reset();
        this.workspaceElements = [];
        document.querySelectorAll("#workspace .element").forEach(e => e.remove());
        document.getElementById("workspace").classList.remove("has-elements");
        this.renderSidebar();
        this.updateCounter();
      }
    });
  },

  initBg() {
    const bg = document.getElementById("bg-animation");
    for (let i = 0; i < 12; i++) {
      const line = document.createElement("div");
      line.className = "grid-line horizontal";
      line.style.top = (i / 12 * 100) + "%";
      line.style.animationDuration = (15 + Math.random() * 20) + "s";
      line.style.animationDelay = (-Math.random() * 20) + "s";
      bg.appendChild(line);
    }
    for (let i = 0; i < 8; i++) {
      const line = document.createElement("div");
      line.className = "grid-line vertical";
      line.style.left = (i / 8 * 100) + "%";
      line.style.animationName = "gridScrollV";
      line.style.animationDuration = (18 + Math.random() * 25) + "s";
      line.style.animationDelay = (-Math.random() * 25) + "s";
      bg.appendChild(line);
    }
    const colors = ["rgba(0,255,200,0.25)", "rgba(192,132,252,0.25)", "rgba(255,110,199,0.2)"];
    for (let i = 0; i < 30; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      const size = 2 + Math.random() * 3;
      p.style.width = size + "px";
      p.style.height = size + "px";
      p.style.left = Math.random() * 100 + "%";
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      p.style.animationDuration = (8 + Math.random() * 15) + "s";
      p.style.animationDelay = (-Math.random() * 15) + "s";
      bg.appendChild(p);
    }
  }
};

document.addEventListener("DOMContentLoaded", () => App.init());
