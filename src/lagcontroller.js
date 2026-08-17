// Lightweight High-Performance Lag Controller for Low-RAM Devices
export class LagController {
  constructor() {
    this.isLowRam = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || (navigator.deviceMemory && navigator.deviceMemory <= 6);
    this.chunkMultiplier = this.isLowRam ? 0.75 : 1.0;
  }
  update() {
    if (performance.memory && performance.memory.usedJSHeapSize > 300 * 1024 * 1024) {
      if (window.gc) { try { window.gc(); } catch (_) {} }
    }
  }
  getMetrics() {
    return { isLowRam: this.isLowRam, chunkMultiplier: this.chunkMultiplier };
  }
}
export const masterLagSupervisor4k = new LagController();
