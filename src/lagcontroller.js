/**
 * BlockForge Ultimate Low-RAM Lag Control & Performance Supervisor (Detailed Expansion)
 * Specialized for low-RAM devices (2GB - 6GB RAM phones, tablets, and low-end PCs).
 */

export class LagController4k {
  constructor(options = {}) {
    this.targetFps = options.targetFps || 60;
    this.minFps = options.minFps || 30;
    this.sampleInterval = options.sampleInterval || 1000;
    this.enabled = true;
    this.fpsHistory = [];
    this.frameTimeHistory = [];
    this.currentFps = 60;
    this.averageFrameTime = 16.67;
    this.lagSeverity = 'none';
    this.entityTickMultiplier = 1.0;
    this.chunkLoadMultiplier = 1.0;
    this.particleDensityMultiplier = 1.0;
    this.shadowQualityLevel = 2;
    this.renderDistanceMultiplier = 1.0;
    this.lastSampleTime = performance.now();
    this.frameCount = 0;
    this.lastFrameTimestamp = performance.now();
    this.diagnosticLogs = [];
    this.maxLogs = 100;
    this.memoryUsageBaseline = performance.memory ? performance.memory.usedJSHeapSize : 0;
    this.garbageCollectionTriggers = 0;
    this.isLowRamDevice = this._detectLowRamDevice();
    this.maxAllowedHeapBytes = this._calculateHeapLimit();
    this._initListeners();
  }

  _detectLowRamDevice() {
    if (typeof navigator !== 'undefined') {
      const deviceMemory = navigator.deviceMemory;
      const hardwareConcurrency = navigator.hardwareConcurrency || 4;
      if (deviceMemory && deviceMemory <= 6) return true;
      if (hardwareConcurrency <= 4) return true;
    }
    return false;
  }

  _calculateHeapLimit() {
    if (typeof performance !== 'undefined' && performance.memory && performance.memory.jsHeapSizeLimit) {
      return performance.memory.jsHeapSizeLimit * 0.65;
    }
    return 3 * 1024 * 1024 * 1024;
  }

  _initListeners() {
    if (typeof window !== 'undefined') {
      window.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this.enterLowPowerMode();
        } else {
          this.exitLowPowerMode();
        }
      });
    }
  }

  update(timestamp) {
    if (!this.enabled) return;
    const delta = timestamp - this.lastFrameTimestamp;
    this.lastFrameTimestamp = timestamp;
    this.frameCount++;
    if (delta > 0) {
      this.frameTimeHistory.push(delta);
      if (this.frameTimeHistory.length > 60) {
        this.frameTimeHistory.shift();
      }
    }
    if (timestamp - this.lastSampleTime >= this.sampleInterval) {
      this._evaluatePerformance(timestamp);
      this.lastSampleTime = timestamp;
      this.frameCount = 0;
    }
  }

  _evaluatePerformance(timestamp) {
    if (this.frameTimeHistory.length === 0) return;
    let sum = 0;
    for (let i = 0; i < this.frameTimeHistory.length; i++) {
      sum += this.frameTimeHistory[i];
    }
    this.averageFrameTime = sum / this.frameTimeHistory.length;
    this.currentFps = 1000 / this.averageFrameTime;
    if (this.isLowRamDevice) {
      if (this.currentFps >= 45) {
        this.lagSeverity = 'none';
        this._restorePerformanceDefaults();
      } else if (this.currentFps >= 30) {
        this.lagSeverity = 'mild';
        this._applyMildMitigations();
      } else if (this.currentFps >= 20) {
        this.lagSeverity = 'moderate';
        this._applyModerateMitigations();
      } else {
        this.lagSeverity = 'severe';
        this._applySevereMitigations();
      }
    } else {
      if (this.currentFps >= 50) {
        this.lagSeverity = 'none';
        this._restorePerformanceDefaults();
      } else if (this.currentFps >= 40) {
        this.lagSeverity = 'mild';
        this._applyMildMitigations();
      } else if (this.currentFps >= 25) {
        this.lagSeverity = 'moderate';
        this._applyModerateMitigations();
      } else {
        this.lagSeverity = 'severe';
        this._applySevereMitigations();
      }
    }
    this._logDiagnostic();
  }

  _restorePerformanceDefaults() {
    this.entityTickMultiplier = this.isLowRamDevice ? 0.75 : 1.0;
    this.chunkLoadMultiplier = this.isLowRamDevice ? 0.75 : 1.0;
    this.particleDensityMultiplier = this.isLowRamDevice ? 0.5 : 1.0;
    this.shadowQualityLevel = this.isLowRamDevice ? 1 : 2;
    this.renderDistanceMultiplier = this.isLowRamDevice ? 0.8 : 1.0;
  }

  _applyMildMitigations() {
    this.entityTickMultiplier = 0.6;
    this.chunkLoadMultiplier = 0.65;
    this.particleDensityMultiplier = 0.4;
    this.shadowQualityLevel = 1;
    this.renderDistanceMultiplier = 0.75;
  }

  _applyModerateMitigations() {
    this.entityTickMultiplier = 0.4;
    this.chunkLoadMultiplier = 0.45;
    this.particleDensityMultiplier = 0.2;
    this.shadowQualityLevel = 0;
    this.renderDistanceMultiplier = 0.6;
  }

  _applySevereMitigations() {
    this.entityTickMultiplier = 0.2;
    this.chunkLoadMultiplier = 0.25;
    this.particleDensityMultiplier = 0.05;
    this.shadowQualityLevel = 0;
    this.renderDistanceMultiplier = 0.45;
  }

  _logDiagnostic() {
    const entry = {
      timestamp: Date.now(),
      fps: Math.round(this.currentFps * 10) / 10,
      frameTime: Math.round(this.averageFrameTime * 100) / 100,
      severity: this.lagSeverity,
      isLowRam: this.isLowRamDevice,
      multipliers: {
        entity: this.entityTickMultiplier,
        chunk: this.chunkLoadMultiplier,
        particle: this.particleDensityMultiplier
      }
    };
    this.diagnosticLogs.push(entry);
    if (this.diagnosticLogs.length > this.maxLogs) {
      this.diagnosticLogs.shift();
    }
  }

  enterLowPowerMode() {
    this.entityTickMultiplier = 0.15;
    this.chunkLoadMultiplier = 0.2;
    this.particleDensityMultiplier = 0.0;
    this.shadowQualityLevel = 0;
  }

  exitLowPowerMode() {
    this._restorePerformanceDefaults();
  }

  getMetrics() {
    return {
      fps: Math.round(this.currentFps * 10) / 10,
      frameTime: Math.round(this.averageFrameTime * 100) / 100,
      severity: this.lagSeverity,
      isLowRamDevice: this.isLowRamDevice,
      multipliers: {
        entity: this.entityTickMultiplier,
        chunk: this.chunkLoadMultiplier,
        particle: this.particleDensityMultiplier,
        renderDistance: this.renderDistanceMultiplier
      },
      shadowQuality: this.shadowQualityLevel,
      logsCount: this.diagnosticLogs.length
    };
  }

  forceMemoryGarbageCollection() {
    this.garbageCollectionTriggers++;
    if (typeof window !== 'undefined' && window.gc) {
      try { window.gc(); } catch (_) {}
    }
  }
}

export class LowRamMemoryPoolManager {
  constructor() {
    this.pools = new Map();
  }
  registerPool(name, factory, reset) {
    this.pools.set(name, { factory, reset, items: [] });
  }
  acquire(name) {
    const pool = this.pools.get(name);
    if (!pool) return null;
    return pool.items.length > 0 ? pool.items.pop() : pool.factory();
  }
  release(name, item) {
    const pool = this.pools.get(name);
    if (!pool) return;
    if (pool.reset) pool.reset(item);
    if (pool.items.length < 256) pool.items.push(item);
  }
}

export class LowRamTextureCompressionGuard {
  constructor() {
    this.compressedFormats = ['astc', 'etc2', 's3tc'];
  }
  isSupported(format) {
    return this.compressedFormats.includes(format);
  }
}

export class LowRamGarbageCollectionController {
  constructor(thresholdMb = 256) {
    this.threshold = thresholdMb * 1024 * 1024;
  }
  shouldCollect(usedBytes) {
    return usedBytes > this.threshold;
  }
}

export class LowRamChunkDistanceClamping {
  constructor(maxDistance = 4) {
    this.maxDistance = maxDistance;
  }
  clamp(requestedDistance) {
    return Math.min(requestedDistance, this.maxDistance);
  }
}

export const masterLagSupervisor = new LagController4k();
