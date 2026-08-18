// Sodium-style compact vertex buffer builder + FerriteCore-style pooling.
//
// Building chunk geometry by pushing floats into plain JS arrays then copying
// into Float32Arrays is one of the biggest CPU costs in a voxel game (it
// allocates a JS array per push, doubles it repeatedly, then copies into a
// typed array and abandons the whole tree to the GC).
//
// This module grows a single typed array with a write cursor instead, so mesh
// building is a tight sequence of typed-array writes with ~no intermediate
// garbage. The returned arrays are trimmed copies, so the builders can be
// pooled and reused across chunk rebuilds (FerriteCore memory footprint).

export class MeshBuffer {
  constructor(itemSize, isIndex = false) {
    this.itemSize = itemSize;
    this.isIndex = !!isIndex;
    this.arr = this.isIndex ? new Uint32Array(1024) : new Float32Array(1024);
    this.count = 0; // number of stored elements (not items)
  }

  _grow(need) {
    let cap = this.arr.length * 2;
    while (cap < need) cap *= 2;
    const next = this.isIndex ? new Uint32Array(cap) : new Float32Array(cap);
    next.set(this.arr.subarray(0, this.count));
    this.arr = next;
  }

  // Number of stored elements.
  get length() { return this.count; }

  // Number of complete vertices/indices.
  get itemCount() { return this.count / this.itemSize; }

  push(a, b, c, d, e, f) {
    const need = this.count + arguments.length;
    if (need > this.arr.length) this._grow(need);
    for (let i = 0; i < arguments.length; i++) this.arr[this.count + i] = arguments[i];
    this.count = need;
  }

  push2(a, b) {
    if (this.count + 2 > this.arr.length) this._grow(this.count + 2);
    this.arr[this.count] = a;
    this.arr[this.count + 1] = b;
    this.count += 2;
  }

  push3(a, b, c) {
    if (this.count + 3 > this.arr.length) this._grow(this.count + 3);
    this.arr[this.count] = a;
    this.arr[this.count + 1] = b;
    this.arr[this.count + 2] = c;
    this.count += 3;
  }

  push6(a, b, c, d, e, f) {
    if (this.count + 6 > this.arr.length) this._grow(this.count + 6);
    this.arr[this.count] = a;
    this.arr[this.count + 1] = b;
    this.arr[this.count + 2] = c;
    this.arr[this.count + 3] = d;
    this.arr[this.count + 4] = e;
    this.arr[this.count + 5] = f;
    this.count += 6;
  }

  // Trimmed copy — safe to reuse this builder afterwards.
  toArray() {
    return this.arr.subarray(0, this.count).slice();
  }

  reset() { this.count = 0; }
}

// A pooled set of the four attribute buffers + index buffer used by the mesher.
export class ChunkMeshBuffers {
  constructor() {
    this.pos = new MeshBuffer(3);
    this.uv = new MeshBuffer(2);
    this.col = new MeshBuffer(3);
    this.nor = new MeshBuffer(3);
    this.idx = new MeshBuffer(1, true);
  }
  reset() {
    this.pos.reset();
    this.uv.reset();
    this.col.reset();
    this.nor.reset();
    this.idx.reset();
  }
}

// Pool of ChunkMeshBuffers reused across chunk rebuilds to keep GC pressure low.
const _pool = [];
export function acquireMeshBuffers() {
  if (_pool.length > 0) {
    const b = _pool.pop();
    b.reset();
    return b;
  }
  return new ChunkMeshBuffers();
}

export function releaseMeshBuffers(b) {
  if (_pool.length < 64) _pool.push(b);
}