/**
 * Basma Waveform — Live Audio Waveform Visualization
 * Port of @elevenlabs/ui LiveWaveform component (vanilla Canvas 2D)
 * 
 * Modes: static (symmetric bars from center) | scrolling (scrolls right-to-left)
 * Uses Web Audio API AnalyserNode for real microphone visualization
 */
 
(function() {
'use strict';

const HNH = window.HNH || {};

class BasmaWaveform {
  constructor(container, options = {}) {
    this.container = typeof container === 'string' ? document.querySelector(container) : container;
    if (!this.container) throw new Error('Waveform: container not found');

    this.canvas = null;
    this.ctx = null;
    this.analyser = null;
    this.animId = null;
    this.mode = options.mode || 'static'; // 'static' | 'scrolling'
    this.isActive = false;
    this.isProcessing = false;
    this.sensitivity = options.sensitivity || 1.0;
    this.smoothing = options.smoothing || 0.8;
    this.barCount = options.barCount || 48;
    this.primaryColor = options.primaryColor || '#0066CC';
    this.accentColor = options.accentColor || '#C9A84C';
    this.width = 0;
    this.height = 0;
    this.bufferLength = 0;
    this.dataArray = null;
    
    // Scrolling mode state
    this.scrollHistory = [];
    this.scrollWidth = 0;

    this.init();
  }

  init() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.container.appendChild(this.canvas);
    this.resize();
    
    // Wire up resize observer
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(this.container);
  }

  resize() {
    const rect = this.container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.width = rect.width || 200;
    this.height = rect.height || 48;
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.canvas.style.width = this.width + 'px';
    this.canvas.style.height = this.height + 'px';
    this.ctx.scale(dpr, dpr);
  }

  /**
   * Connect to a MediaStream (from getUserMedia)
   */
  connectStream(stream) {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioCtx.createMediaStreamSource(stream);
      this.analyser = audioCtx.createAnalyser();
      this.analyser.fftSize = 256;
      this.analyser.smoothingTimeConstant = this.smoothing;
      source.connect(this.analyser);
      this.bufferLength = this.analyser.frequencyBinCount;
      this.dataArray = new Uint8Array(this.bufferLength);

      // Initialize scroll history
      this.scrollHistory = [];
      for (let i = 0; i < this.bufferLength; i++) {
        this.scrollHistory[i] = [];
      }

      this.isActive = true;
      this.draw();
      return true;
    } catch (e) {
      console.error('Waveform: Failed to connect stream:', e);
      return false;
    }
  }

  /**
   * Connect to an existing AnalyserNode
   */
  connectAnalyser(analyser) {
    this.analyser = analyser;
    this.bufferLength = analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
    
    this.scrollHistory = [];
    for (let i = 0; i < this.bufferLength; i++) {
      this.scrollHistory[i] = [];
    }
    
    this.isActive = true;
    this.draw();
  }

  setMode(mode) {
    if (mode !== 'static' && mode !== 'scrolling') return;
    this.mode = mode;
  }

  setProcessing(processing) {
    this.isProcessing = processing;
  }

  setSensitivity(s) {
    this.sensitivity = Math.max(0.1, Math.min(3, s));
  }

  /**
   * Drive the waveform from external data (e.g., from agent)
   * @param {number} volume — 0 to 1
   */
  setVolume(volume) {
    if (!this.isActive || !this.analyser || !this.dataArray) return;
    
    // Fill data array with simulated values based on volume
    const v = Math.min(1, Math.max(0, volume));
    for (let i = 0; i < this.bufferLength; i++) {
      const position = i / this.bufferLength;
      // Create a natural-looking spectrum
      const centerBump = 1 - Math.abs(position - 0.5) * 2; // peak in middle
      const noise = Math.random() * 0.2;
      this.dataArray[i] = Math.floor(128 + v * 127 * centerBump + noise * 128);
    }
  }

  start(stream) {
    return this.connectStream(stream);
  }

  stop() {
    this.isActive = false;
    if (this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
    this.clear();
  }

  clear() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  draw() {
    if (!this.isActive || !this.ctx || !this.canvas) {
      this.drawIdle();
      this.animId = requestAnimationFrame(() => this.draw());
      return;
    }

    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    // Clear with slight fade for trailing effect
    if (this.mode === 'static') {
      ctx.clearRect(0, 0, w, h);
    } else {
      // For scrolling, keep previous frame with low opacity for trail
      ctx.fillStyle = 'rgba(255,255,255,0.05)';
      ctx.fillRect(0, 0, w, h);
    }

    if (this.analyser && this.dataArray) {
      this.analyser.getByteFrequencyData(this.dataArray);
    }

    // Apply sensitivity
    const data = new Float32Array(this.bufferLength);
    for (let i = 0; i < this.bufferLength; i++) {
      data[i] = Math.min(255, (this.dataArray[i] || 0) * this.sensitivity);
    }

    if (this.mode === 'static') {
      this.drawStatic(ctx, data, w, h);
    } else {
      this.drawScrolling(ctx, data, w, h);
    }

    this.animId = requestAnimationFrame(() => this.draw());
  }

  drawStatic(ctx, data, w, h) {
    const centerY = h / 2;
    const gap = 1.5;
    const count = Math.min(this.barCount, data.length);
    const barWidth = (w - gap * (count - 1)) / count;
    const dark = document.documentElement.classList.contains('dark');

    for (let i = 0; i < count; i++) {
      // Map to symmetric from center
      const idx = Math.floor(i * data.length / count);
      const normValue = data[idx] / 255;
      
      // Skip very quiet values
      if (normValue < 0.02 && this.isProcessing === false) continue;

      const barHeight = Math.max(1, normValue * h * 0.45);
      const x = i * (barWidth + gap);
      const y = centerY - barHeight / 2;

      // Gradient color from primary to accent based on amplitude
      const mix = Math.min(1, normValue * 1.5);
      const r = Math.round(0 + mix * 201);       // #0066CC → #C9A84C
      const g = Math.round(102 + mix * 168);     // R: 0→201
      const b = Math.round(204 + mix * 76);      // G: 102→270→capped

      ctx.fillStyle = `rgba(${r}, ${Math.min(270, g)}, ${Math.min(204, b + 76 * mix * 0.3)}, ${0.3 + normValue * 0.7})`;
      
      // Rounded rect
      const radius = Math.min(2, barWidth / 4);
      this.roundRect(ctx, x, y, barWidth, barHeight, radius);
      ctx.fill();

      // Bottom half mirror (for symmetric look)
      if (barHeight > 2) {
        ctx.globalAlpha = 0.3 + normValue * 0.3;
        ctx.fillRect(x, centerY + 1, barWidth, barHeight / 2);
        ctx.globalAlpha = 1;
      }
    }
  }

  drawScrolling(ctx, data, w, h) {
    // Add new data to history
    for (let i = 0; i < data.length; i++) {
      this.scrollHistory[i] = this.scrollHistory[i] || [];
      this.scrollHistory[i].push(data[i] / 255);
      
      // Keep only last N values
      if (this.scrollHistory[i].length > w) {
        this.scrollHistory[i].shift();
      }
    }

    const centerY = h / 2;
    const colCount = this.scrollHistory[0]?.length || 0;
    if (colCount < 2) return;

    const dark = document.documentElement.classList.contains('dark');

    // Draw each frequency band as a horizontal line
    const bandCount = Math.min(20, data.length);
    const bandHeight = h / bandCount;

    for (let band = 0; band < bandCount; band++) {
      const idx = Math.floor(band * data.length / bandCount);
      const history = this.scrollHistory[idx] || [];
      
      ctx.beginPath();
      let started = false;

      for (let col = 0; col < history.length; col++) {
        const x = col;
        const amplitude = history[col] * bandHeight * 0.4;
        const y = centerY + (band - bandCount / 2) * bandHeight * 0.5;
        
        // Map to sine-like curve
        const drawY = y - amplitude;
        
        if (!started) {
          ctx.moveTo(x, drawY);
          started = true;
        } else {
          ctx.lineTo(x, drawY);
        }
      }

      // Color based on band position
      const hue = 210 + (band / bandCount) * 40; // Blue to purple
      ctx.strokeStyle = `hsla(${hue}, 70%, ${dark ? 70 : 50}%, 0.6)`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }

  drawIdle() {
    if (!this.ctx || !this.canvas) return;
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    ctx.clearRect(0, 0, w, h);

    // Draw subtle idle bars (very quiet)
    const count = 20;
    const gap = 3;
    const barWidth = (w - gap * count) / count;
    const centerY = h / 2;
    const time = performance.now() / 1000;

    for (let i = 0; i < count; i++) {
      const amplitude = Math.sin(time * 0.5 + i * 0.3) * 0.5 + 0.5;
      const barHeight = 1 + amplitude * 3;
      const x = i * (barWidth + gap);
      const y = centerY - barHeight / 2;
      
      ctx.fillStyle = `rgba(0, 102, 204, ${0.1 + amplitude * 0.15})`;
      this.roundRect(ctx, x, y, barWidth, barHeight, 1);
      ctx.fill();
    }
  }

  roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  destroy() {
    this.stop();
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}

// Expose globally
HNH.createWaveform = function(container, options) {
  return new BasmaWaveform(container, options);
};

})();
