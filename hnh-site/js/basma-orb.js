/**
 * Basma Orb — ElevenLabs UI Animated Orb (Vanilla WebGL Port)
 * Ported from @elevenlabs/ui orb.tsx — pure WebGL, no framework
 * 
 * Agent States: idle → listening → thinking → talking
 * Colors: [primary, secondary] hex strings
 * Volume: inputVolume (mic), outputVolume (speaker) 0–1
 */

const HNH = window.HNH || {};
(function() {
  'use strict';

  // Perlin noise texture URL (cache-friendly, uploaded by elevenlabs)
  const PERLIN_TEXTURE_URL = 'https://storage.googleapis.com/eleven-public-cdn/images/perlin-noise.png';

  // ====== GLSL Shaders ======
  const VERTEX_SHADER = `
    attribute vec2 aPosition;
    varying vec2 vUv;
    void main() {
      vUv = aPosition * 0.5 + 0.5;
      gl_Position = vec4(aPosition, 0.0, 1.0);
    }
  `;

  const FRAGMENT_SHADER = `
    precision highp float;
    uniform float uTime;
    uniform float uAnimation;
    uniform float uInverted;
    uniform float uOffsets[7];
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform float uInputVolume;
    uniform float uOutputVolume;
    uniform float uOpacity;
    uniform sampler2D uPerlinTexture;
    varying vec2 vUv;

    const float PI = 3.14159265358979323846;

    bool drawOval(vec2 polarUv, vec2 polarCenter, float a, float b, bool reverseGradient, float softness, out vec4 color) {
      vec2 p = polarUv - polarCenter;
      float oval = (p.x * p.x) / (a * a) + (p.y * p.y) / (b * b);
      float edge = smoothstep(1.0, 1.0 - softness, oval);
      if (edge > 0.0) {
        float gradient = reverseGradient ? (1.0 - (p.x / a + 1.0) / 2.0) : ((p.x / a + 1.0) / 2.0);
        gradient = mix(0.5, gradient, 0.1);
        color = vec4(vec3(gradient), 0.85 * edge);
        return true;
      }
      return false;
    }

    vec3 colorRamp(float grayscale, vec3 color1, vec3 color2, vec3 color3, vec3 color4) {
      if (grayscale < 0.33) return mix(color1, color2, grayscale * 3.0);
      else if (grayscale < 0.66) return mix(color2, color3, (grayscale - 0.33) * 3.0);
      else return mix(color3, color4, (grayscale - 0.66) * 3.0);
    }

    vec2 hash2(vec2 p) {
      return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
    }

    float noise2D(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      float n = mix(
        mix(dot(hash2(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
            dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
        mix(dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
            dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
        u.y
      );
      return 0.5 + 0.5 * n;
    }

    float sharpRing(vec3 decomposed, float time) {
      float ringStart = 1.0;
      float ringWidth = 0.3;
      float noiseScale = 5.0;
      float noise = mix(
        noise2D(vec2(decomposed.x, time) * noiseScale),
        noise2D(vec2(decomposed.y, time) * noiseScale), decomposed.z
      );
      noise = (noise - 0.5) * 2.5;
      return ringStart + noise * ringWidth * 1.5;
    }

    float smoothRing(vec3 decomposed, float time) {
      float ringStart = 0.9;
      float ringWidth = 0.2;
      float noiseScale = 6.0;
      float noise = mix(
        noise2D(vec2(decomposed.x, time) * noiseScale),
        noise2D(vec2(decomposed.y, time) * noiseScale), decomposed.z
      );
      noise = (noise - 0.5) * 5.0;
      return ringStart + noise * ringWidth;
    }

    float flow(vec3 decomposed, float time) {
      return mix(
        texture2D(uPerlinTexture, vec2(time, decomposed.x / 2.0)).r,
        texture2D(uPerlinTexture, vec2(time, decomposed.y / 2.0)).r, decomposed.z
      );
    }

    void main() {
      vec2 uv = vUv * 2.0 - 1.0;
      float radius = length(uv);
      float theta = atan(uv.y, uv.x);
      if (theta < 0.0) theta += 2.0 * PI;

      vec3 decomposed = vec3(
        theta / (2.0 * PI),
        mod(theta / (2.0 * PI) + 0.5, 1.0) + 1.0,
        abs(theta / PI - 1.0)
      );

      float noise = flow(decomposed, radius * 0.03 - uAnimation * 0.2) - 0.5;
      theta += noise * mix(0.08, 0.25, uOutputVolume);

      vec4 color = vec4(1.0, 1.0, 1.0, 1.0);

      float originalCenters[7];
      originalCenters[0] = 0.0;
      originalCenters[1] = 0.5 * PI;
      originalCenters[2] = 1.0 * PI;
      originalCenters[3] = 1.5 * PI;
      originalCenters[4] = 2.0 * PI;
      originalCenters[5] = 2.5 * PI;
      originalCenters[6] = 3.0 * PI;

      float centers[7];
      for (int i = 0; i < 7; i++) {
        centers[i] = originalCenters[i] + 0.5 * sin(uTime / 20.0 + uOffsets[i]);
      }

      for (int i = 0; i < 7; i++) {
        float n = texture2D(uPerlinTexture, vec2(mod(centers[i] + uTime * 0.05, 1.0), 0.5)).r;
        float a = 0.5 + n * 0.3;
        float b = n * mix(3.5, 2.5, uInputVolume);
        bool rev = (mod(float(i), 2.0) == 1.0);
        float distTheta = min(abs(theta - centers[i]),
          min(abs(theta + 2.0 * PI - centers[i]), abs(theta - 2.0 * PI - centers[i])));
        vec4 oc;
        if (drawOval(vec2(distTheta, radius), vec2(0.0, 0.0), a, b, rev, 0.6, oc)) {
          color.rgb = mix(color.rgb, oc.rgb, oc.a);
          color.a = max(color.a, oc.a);
        }
      }

      float r1 = sharpRing(decomposed, uTime * 0.1);
      float r2 = smoothRing(decomposed, uTime * 0.1);
      float ir1 = radius + uInputVolume * 0.2;
      float ir2 = radius + uInputVolume * 0.15;
      float o1 = mix(0.2, 0.6, uInputVolume);
      float o2 = mix(0.15, 0.45, uInputVolume);
      float ra1 = (ir2 >= r1) ? o1 : 0.0;
      float ra2 = smoothstep(r2 - 0.05, r2 + 0.05, ir1) * o2;
      float tra = max(ra1, ra2);
      color.rgb = 1.0 - (1.0 - color.rgb) * (1.0 - vec3(1.0) * tra);

      vec3 c1 = vec3(0.0, 0.0, 0.0);
      vec3 c4 = vec3(1.0, 1.0, 1.0);
      float luminance = mix(color.r, 1.0 - color.r, uInverted);
      color.rgb = colorRamp(luminance, c1, uColor1, uColor2, c4);
      color.a *= uOpacity;
      gl_FragColor = color;
    }
  `;

  // ====== Orb Class ======
  class Orb {
    constructor(container, options = {}) {
      this.container = typeof container === 'string' ? document.querySelector(container) : container;
      if (!this.container) throw new Error('Orb: container not found');

      this.canvas = null;
      this.gl = null;
      this.program = null;
      this.uniforms = {};
      this.buffer = null;
      this.animId = null;
      this.perlinTexture = null;
      this.isDark = false;
      this.initialized = false;

      // Config
      this.colors = options.colors || ['#0066CC', '#C9A84C'];
      this.agentState = options.agentState || 'idle';
      this.inputVolume = options.inputVolume || 0;
      this.outputVolume = options.outputVolume || 0;
      this.size = options.size || 200;
      this.speed = options.speed || 1;

      // State
      this.startTime = performance.now();
      this.curInputVolume = 0;
      this.curOutputVolume = 0.3;
      this.animSpeed = 0.1;

      // Random seed
      this.seed = options.seed || Math.floor(Math.random() * 4294967296);

      // Generate offsets
      const rng = this.splitmix32(this.seed);
      this.offsets = new Float32Array(7);
      for (let i = 0; i < 7; i++) this.offsets[i] = rng() * Math.PI * 2;

      // Watch for dark mode
      this.checkDarkMode = this.checkDarkMode.bind(this);

      this.init();
    }

    async init() {
      this.canvas = document.createElement('canvas');
      this.canvas.width = this.size;
      this.canvas.height = this.size;
      this.canvas.style.width = this.size + 'px';
      this.canvas.style.height = this.size + 'px';
      this.canvas.style.display = 'block';
      this.container.appendChild(this.canvas);

      try {
        this.gl = this.canvas.getContext('webgl', { alpha: true, antialias: true, premultipliedAlpha: true });
        if (!this.gl) throw new Error('WebGL not supported');
      } catch(e) {
        // Fallback: use Canvas2D placeholder
        this.drawFallback();
        return;
      }

      this.initGL();
      this.loadPerlinTexture().then(() => {
        this.initialized = true;
      });
      this.checkDarkMode();
      this.animate();
    }

    initGL() {
      const gl = this.gl;
      if (!gl) return;

      // Create shaders
      const vs = this.createShader(gl.VERTEX_SHADER, VERTEX_SHADER);
      const fs = this.createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
      if (!vs || !fs) return;

      this.program = gl.createProgram();
      gl.attachShader(this.program, vs);
      gl.attachShader(this.program, fs);
      gl.linkProgram(this.program);
      if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
        console.error('Orb: Program link error:', gl.getProgramInfoLog(this.program));
        return;
      }

      gl.useProgram(this.program);

      // Geometry: full-screen quad
      const positions = new Float32Array([
        -1, -1, 1, -1, -1, 1,
        1, -1, 1, 1, -1, 1
      ]);
      this.buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
      gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

      const aPos = gl.getAttribLocation(this.program, 'aPosition');
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

      // Uniforms
      const color1 = this.hexToRgb(this.colors[0]);
      const color2 = this.hexToRgb(this.colors[1]);

      this.uniforms = {
        uTime: gl.getUniformLocation(this.program, 'uTime'),
        uAnimation: gl.getUniformLocation(this.program, 'uAnimation'),
        uInverted: gl.getUniformLocation(this.program, 'uInverted'),
        uOffsets: gl.getUniformLocation(this.program, 'uOffsets'),
        uColor1: gl.getUniformLocation(this.program, 'uColor1'),
        uColor2: gl.getUniformLocation(this.program, 'uColor2'),
        uInputVolume: gl.getUniformLocation(this.program, 'uInputVolume'),
        uOutputVolume: gl.getUniformLocation(this.program, 'uOutputVolume'),
        uOpacity: gl.getUniformLocation(this.program, 'uOpacity'),
        uPerlinTexture: gl.getUniformLocation(this.program, 'uPerlinTexture'),
      };

      gl.uniform3f(this.uniforms.uColor1, color1[0], color1[1], color1[2]);
      gl.uniform3f(this.uniforms.uColor2, color2[0], color2[1], color2[2]);
      gl.uniform1fv(this.uniforms.uOffsets, this.offsets);
      gl.uniform1f(this.uniforms.uOpacity, 0);

      gl.viewport(0, 0, this.size, this.size);
    }

    createShader(type, source) {
      const gl = this.gl;
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Orb: Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    async loadPerlinTexture() {
      const gl = this.gl;
      if (!gl) return;

      return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          this.perlinTexture = gl.createTexture();
          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_2D, this.perlinTexture);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
          gl.uniform1i(this.uniforms.uPerlinTexture, 0);
          this.initialized = true;
          resolve();
        };
        img.onerror = () => {
          console.warn('Orb: Failed to load perlin texture, using white fallback');
          this.createFallbackTexture();
          resolve();
        };
        img.src = PERLIN_TEXTURE_URL;
        // Timeout fallback
        setTimeout(() => {
          if (!this.initialized) {
            this.createFallbackTexture();
            resolve();
          }
        }, 5000);
      });
    }

    createFallbackTexture() {
      const gl = this.gl;
      if (!gl || this.perlinTexture) return;
      const data = new Uint8Array(256 * 256 * 4);
      for (let i = 0; i < 256 * 256; i++) {
        const v = Math.floor(Math.random() * 256);
        data[i * 4] = v;
        data[i * 4 + 1] = v;
        data[i * 4 + 2] = v;
        data[i * 4 + 3] = 255;
      }
      this.perlinTexture = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.perlinTexture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 256, 256, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.uniform1i(this.uniforms.uPerlinTexture, 0);
      this.initialized = true;
    }

    checkDarkMode() {
      this.isDark = document.documentElement.classList.contains('dark') ||
        window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    animate() {
      if (!this.gl) return;

      const elapsed = (performance.now() - this.startTime) / 1000;
      const gl = this.gl;

      // Calculate target volumes based on state
      let targetIn = 0, targetOut = 0.3;
      const t = elapsed * 2;

      if (this.agentState === 'idle') {
        targetIn = 0;
        targetOut = 0.3;
      } else if (this.agentState === 'listening') {
        targetIn = Math.max(0.55, Math.min(1, 0.55 + Math.sin(t * 3.2) * 0.35));
        targetOut = 0.45;
      } else if (this.agentState === 'talking') {
        targetIn = Math.min(1, 0.65 + Math.sin(t * 4.8) * 0.22);
        targetOut = Math.min(1, 0.75 + Math.sin(t * 3.6) * 0.22);
      } else if (this.agentState === 'thinking') {
        const base = 0.38 + 0.07 * Math.sin(t * 0.7);
        const wander = 0.05 * Math.sin(t * 2.1) * Math.sin(t * 0.37 + 1.2);
        targetIn = Math.min(1, Math.max(0, base + wander));
        targetOut = Math.min(1, 0.48 + 0.12 * Math.sin(t * 1.05 + 0.6));
      }

      // Manual volume override (from mic/speaker)
      if (typeof this.inputVolume === 'number' && this.inputVolume > 0) {
        targetIn = Math.min(1, targetIn + this.inputVolume * 0.5);
      }
      if (typeof this.outputVolume === 'number' && this.outputVolume > 0) {
        targetOut = Math.min(1, targetOut + this.outputVolume * 0.3);
      }

      // Smooth interpolate
      this.curInputVolume += (targetIn - this.curInputVolume) * 0.2;
      this.curOutputVolume += (targetOut - this.curOutputVolume) * 0.2;

      const targetSpeed = 0.1 + (1 - Math.pow(this.curOutputVolume - 1, 2)) * 0.9;
      this.animSpeed += (targetSpeed - this.animSpeed) * 0.12;

      // Set uniforms
      gl.uniform1f(this.uniforms.uTime, elapsed * 0.5 * this.speed);
      gl.uniform1f(this.uniforms.uAnimation, this.animSpeed);
      gl.uniform1f(this.uniforms.uInverted, this.isDark ? 1 : 0);
      gl.uniform1f(this.uniforms.uInputVolume, this.curInputVolume);
      gl.uniform1f(this.uniforms.uOutputVolume, this.curOutputVolume);

      // Fade in opacity
      const opLoc = this.uniforms.uOpacity;
      const curOpacity = gl.getUniform(this.program, opLoc) || 0;
      if (curOpacity < 1) {
        gl.uniform1f(opLoc, Math.min(1, (curOpacity || 0) + 0.02));
      }

      // Draw
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      this.animId = requestAnimationFrame(() => this.animate());
    }

    drawFallback() {
      // Canvas2D fallback if WebGL unavailable
      const ctx = this.canvas.getContext('2d');
      if (!ctx) return;

      const cw = this.size, ch = this.size;
      const cx = cw / 2, cy = ch / 2;
      const radius = Math.min(cw, ch) * 0.4;

      const animate = () => {
        ctx.clearRect(0, 0, cw, ch);
        const elapsed = (performance.now() - this.startTime) / 1000;

        // Draw animated gradient circles
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        const vol = this.curOutputVolume || 0.3;
        grad.addColorStop(0, this.colors[0] + 'cc');
        grad.addColorStop(0.5 + Math.sin(elapsed) * 0.1, this.colors[1] + '88');
        grad.addColorStop(1, this.colors[0] + '00');

        ctx.beginPath();
        ctx.arc(cx, cy, radius + vol * 20, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Pulse ring
        const pulseRadius = radius + 10 + Math.sin(elapsed * 2) * 5;
        ctx.beginPath();
        ctx.arc(cx, cy, pulseRadius, 0, Math.PI * 2);
        ctx.strokeStyle = this.colors[1] + '44';
        ctx.lineWidth = 2;
        ctx.stroke();

        this.animId = requestAnimationFrame(animate);
      };
      animate();
    }

    // ====== Public API ======
    setColors(primary, secondary) {
      this.colors = [primary, secondary];
      if (this.gl && this.program) {
        const c1 = this.hexToRgb(primary);
        const c2 = this.hexToRgb(secondary);
        this.gl.uniform3f(this.uniforms.uColor1, c1[0], c1[1], c1[2]);
        this.gl.uniform3f(this.uniforms.uColor2, c2[0], c2[1], c2[2]);
      }
    }

    setState(state) {
      this.agentState = state;
    }

    setInputVolume(v) {
      this.inputVolume = Math.min(1, Math.max(0, v));
    }

    setOutputVolume(v) {
      this.outputVolume = Math.min(1, Math.max(0, v));
    }

    resize(size) {
      this.size = size;
      if (this.canvas) {
        this.canvas.width = size;
        this.canvas.height = size;
        this.canvas.style.width = size + 'px';
        this.canvas.style.height = size + 'px';
      }
      if (this.gl) {
        this.gl.viewport(0, 0, size, size);
      }
    }

    destroy() {
      if (this.animId) cancelAnimationFrame(this.animId);
      if (this.gl && this.program) {
        this.gl.deleteProgram(this.program);
      }
      if (this.canvas && this.canvas.parentNode) {
        this.canvas.parentNode.removeChild(this.canvas);
      }
    }

    // ====== Utilities ======
    hexToRgb(hex) {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;
      return [r, g, b];
    }

    splitmix32(a) {
      return function() {
        a |= 0;
        a = (a + 0x9e3779b9) | 0;
        let t = a ^ (a >>> 16);
        t = Math.imul(t, 0x21f0aaad);
        t = t ^ (t >>> 15);
        t = Math.imul(t, 0x735a2d97);
        return ((t = t ^ (t >>> 15)) >>> 0) / 4294967296;
      };
    }
  }

  // ====== Factory ======
  HNH.createOrb = function(container, options) {
    return new Orb(container, options);
  };

})();
