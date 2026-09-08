// Legacy polyfills for old Safari (iPhone 5 / iOS 9-10). Prepended to the
// legacy IIFE bundle by scripts/build-legacy.mjs. Everything is guarded so
// modern browsers are untouched. Written in plain ES5.
(function () {
  if (typeof NodeList !== 'undefined' && NodeList.prototype && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (cb, thisArg) {
      for (var i = 0; i < this.length; i++) cb.call(thisArg, this[i], i, this);
    };
  }
  if (!Array.prototype.includes) {
    Array.prototype.includes = function (v, from) {
      var o = Object(this), n = o.length >>> 0, i = from | 0;
      if (i < 0) i = Math.max(n + i, 0);
      for (; i < n; i++) {
        var x = o[i];
        if (x === v || (v !== v && x !== x)) return true;
      }
      return false;
    };
  }
  if (!Array.prototype.find) {
    Array.prototype.find = function (cb, thisArg) {
      for (var i = 0; i < this.length; i++) {
        var v = this[i];
        if (cb.call(thisArg, v, i, this)) return v;
      }
      return undefined;
    };
  }
  if (!Array.prototype.findIndex) {
    Array.prototype.findIndex = function (cb, thisArg) {
      for (var i = 0; i < this.length; i++) {
        if (cb.call(thisArg, this[i], i, this)) return i;
      }
      return -1;
    };
  }
  if (!Object.entries) {
    Object.entries = function (o) {
      var r = [];
      for (var k in o) {
        if (Object.prototype.hasOwnProperty.call(o, k)) r.push([k, o[k]]);
      }
      return r;
    };
  }
  if (!Object.values) {
    Object.values = function (o) {
      var r = [];
      for (var k in o) {
        if (Object.prototype.hasOwnProperty.call(o, k)) r.push(o[k]);
      }
      return r;
    };
  }
  if (!String.prototype.padStart) {
    String.prototype.padStart = function (len, ch) {
      var s = String(this);
      ch = ch === undefined ? ' ' : String(ch);
      while (s.length < len) s = ch + s;
      return s;
    };
  }
  if (!String.prototype.padEnd) {
    String.prototype.padEnd = function (len, ch) {
      var s = String(this);
      ch = ch === undefined ? ' ' : String(ch);
      while (s.length < len) s = s + ch;
      return s;
    };
  }
  if (typeof Element !== 'undefined' && Element.prototype && !Element.prototype.closest) {
    Element.prototype.closest = function (sel) {
      var el = this;
      while (el && el.nodeType === 1) {
        if (el.matches && el.matches(sel)) return el;
        el = el.parentNode;
      }
      return null;
    };
  }
})();
