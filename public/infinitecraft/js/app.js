/* Mouse + touch unify: extract client coords from either event type */
function coord(e) {
  if (e.touches && e.touches.length) {
    return { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }
  if (e.changedTouches && e.changedTouches.length) {
    return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
  }
  return { x: e.clientX, y: e.clientY };
}

const App = {
  workspaceElements: [],
  _id: 0,
  _touchActive: false,

  init() {
    State.load();
    this.renderSidebar();
    this.initBg();
    this.bindEvents();
    this.updateCounter();
    this.fitScale();
    var self = this;
    window.addEventListener("resize", function() { self.fitScale(); });
    window.addEventListener("orientationchange", function() {
      setTimeout(function() { self.fitScale(); }, 100);
    });
    // Fill in sidebar icons + wake the server. Re-render when done.
    var names = [];
    State.discovered.forEach(function(n) { names.push(n); });
    Game.fetchEmojis(names, function() { self.renderSidebar(); });
  },

  /* Scale-to-fit for tiny legacy screens (iPhone 5 = 320px).
     - Locks the app to window.innerHeight: iOS Safari's 100vh includes the
       toolbar area, which would cut the workspace bottom off.
     - Shrinks the whole app via zoom on very narrow screens so the topbar
       and pills fit without sideways cutoff. zoom is supported back to
       old iOS Safari and keeps drag math consistent (rects + touch coords
       are both in scaled space). */
  fitScale() {
    var app = document.getElementById("app");
    if (!app) return;
    var vw = document.documentElement.clientWidth || window.innerWidth || 320;
    var vh = window.innerHeight || document.documentElement.clientHeight || 568;
    app.style.height = vh + "px";
    if (vw < 360) {
      var s = vw / 360;
      app.style.zoom = s < 1 ? s : "";
    } else {
      app.style.zoom = "";
    }
  },

  renderSidebar(filter = "") {
    const list = document.getElementById("element-list");
    list.innerHTML = "";
    const sorted = [];
    State.discovered.forEach(function(n) { sorted.push(n); });
    sorted.sort(function(a, b) { return a.localeCompare(b); });
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
      if (this._touchActive) { this._touchActive = false; return; }
      if (e.button !== 0) return;
      e.preventDefault();
      const p = coord(e);
      this.startGhostDrag(el.dataset.name, p.x, p.y);
    });
    el.addEventListener("touchstart", (e) => {
      this._touchActive = true;
      e.preventDefault();
      const p = coord(e);
      this.startGhostDrag(el.dataset.name, p.x, p.y);
    }, { passive: false });
  },

  startGhostDrag(name, sx, sy) {
    const emoji = Game.getEmoji(name);

    const ghost = Game.createElement(name, emoji, true);
    ghost.style.position = "fixed";
    ghost.style.zIndex = "10000";
    ghost.style.pointerEvents = "none";
    ghost.style.opacity = "0.85";
    ghost.style.transition = "none";
    ghost.classList.remove("pop-in");
    ghost.style.left = (sx - 60) + "px";
    ghost.style.top = (sy - 45) + "px";
    document.body.appendChild(ghost);

    let lastTarget = null;

    const onMove = (ev) => {
      if (ev.cancelable) ev.preventDefault();
      const p = coord(ev);
      ghost.style.left = (p.x - 60) + "px";
      ghost.style.top = (p.y - 45) + "px";

      const t = this._findTarget(p.x, p.y, null);
      if (t !== lastTarget) {
        if (lastTarget) lastTarget.classList.remove("drop-target");
        if (t) t.classList.add("drop-target");
        lastTarget = t;
      }
    };

    const onUp = (ev) => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("touchend", onUp);
      document.removeEventListener("touchcancel", onUp);
      ghost.remove();
      if (lastTarget) lastTarget.classList.remove("drop-target");

      const p = coord(ev);
      const ws = document.getElementById("workspace");
      const wsRect = ws.getBoundingClientRect();
      if (
        p.x >= wsRect.left && p.x <= wsRect.right &&
        p.y >= wsRect.top && p.y <= wsRect.bottom
      ) {
        const target = this._findTarget(p.x, p.y, null);
        if (target) {
          this._combine(name, target.dataset.name, p.x, p.y, null, target);
        } else {
          this.addToWorkspace(name, p.x, p.y);
        }
      }
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("touchmove", onMove, { passive: false });
    document.addEventListener("touchend", onUp);
    document.addEventListener("touchcancel", onUp);
  },

  /* ── Workspace drag ── */
  makeWorkspaceDraggable(el) {
    el.addEventListener("mousedown", (e) => {
      if (this._touchActive) { this._touchActive = false; return; }
      if (e.button !== 0) return;
      e.preventDefault();
      e.stopPropagation();
      const p = coord(e);
      this.startElDrag(el, p.x, p.y);
    });
    el.addEventListener("touchstart", (e) => {
      this._touchActive = true;
      e.preventDefault();
      e.stopPropagation();
      const p = coord(e);
      this.startElDrag(el, p.x, p.y);
    }, { passive: false });

    el.addEventListener("dblclick", () => {
      this.removeElement(el);
      this.workspaceElements = this.workspaceElements.filter(w => w.el !== el);
      const ws = document.getElementById("workspace");
      if (!ws.querySelector(".element")) ws.classList.remove("has-elements");
    });
  },

  startElDrag(el, sx, sy) {
      const ws = document.getElementById("workspace");
      const wsRect = ws.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      const offX = sx - elRect.left;
      const offY = sy - elRect.top;

      el.classList.add("dragging");
      el.style.zIndex = "100";
      el.style.transition = "none";

      let lastTarget = null;

      const onMove = (ev) => {
        if (ev.cancelable) ev.preventDefault();
        const p = coord(ev);
        const nx = p.x - wsRect.left - offX;
        const ny = p.y - wsRect.top - offY;
        el.style.left = Math.max(0, nx) + "px";
        el.style.top = Math.max(0, ny) + "px";

        const t = this._findTarget(p.x, p.y, el);
        if (t !== lastTarget) {
          if (lastTarget) lastTarget.classList.remove("drop-target");
          if (t) t.classList.add("drop-target");
          lastTarget = t;
        }
      };

      const onUp = (ev) => {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
        document.removeEventListener("touchmove", onMove);
        document.removeEventListener("touchend", onUp);
        document.removeEventListener("touchcancel", onUp);
        el.classList.remove("dragging");
        el.style.transition = "";
        if (lastTarget) lastTarget.classList.remove("drop-target");

        const p = coord(ev);
        const wsRect2 = ws.getBoundingClientRect();
        if (
          p.x < wsRect2.left || p.x > wsRect2.right ||
          p.y < wsRect2.top || p.y > wsRect2.bottom
        ) {
          this.removeElement(el);
          this.workspaceElements = this.workspaceElements.filter(w => w.el !== el);
          if (!ws.querySelector(".element")) ws.classList.remove("has-elements");
          return;
        }

        const target = this._findTarget(p.x, p.y, el);
        if (target) {
          this._combine(el.dataset.name, target.dataset.name, p.x, p.y, el, target);
        }
      };

      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
      document.addEventListener("touchmove", onMove, { passive: false });
      document.addEventListener("touchend", onUp);
      document.addEventListener("touchcancel", onUp);
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
    var self = this;
    Game.combine(nameA, nameB, x, y, function(result) {
      if (result) {
        if (result.isNew) {
          var s = document.getElementById("search");
          self.renderSidebar(s ? s.value : "");
          self.updateCounter();
        }
        if (elA) self.removeElement(elA);
        if (elB) self.removeElement(elB);
        self.workspaceElements = self.workspaceElements.filter(
          function(w) { return w.el !== elA && w.el !== elB; }
        );
        setTimeout(function() { self.addToWorkspace(result.name, x, y); }, 280);
      } else if (elB) {
        elB.classList.add("fail");
        setTimeout(function() { elB.classList.remove("fail"); }, 400);
      }
    });
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
