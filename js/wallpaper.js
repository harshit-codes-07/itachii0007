/**
 * Flowing Silk & Fluid Harmonic Waves Engine
 * High-performance 60FPS interactive wave simulation with particle streams.
 * Engineered for Harshit Shukla's modern developer portfolio.
 */

(function () {
  'use strict';

  const canvas = document.getElementById('live-wallpaper-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  // Mouse / Fluid Interaction
  const mouse = {
    x: width * 0.5,
    y: height * 0.5,
    targetX: width * 0.5,
    targetY: height * 0.5,
    vx: 0,
    vy: 0,
    speed: 0,
    active: false
  };

  // Resize handler
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initWaves();
    initParticles();
  });

  window.addEventListener('mousemove', (e) => {
    const dx = e.clientX - mouse.targetX;
    const dy = e.clientY - mouse.targetY;
    mouse.vx = dx * 0.2;
    mouse.vy = dy * 0.2;
    mouse.speed = Math.sqrt(dx * dx + dy * dy);
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
    mouse.active = true;
  });

  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      const tx = e.touches[0].clientX;
      const ty = e.touches[0].clientY;
      const dx = tx - mouse.targetX;
      const dy = ty - mouse.targetY;
      mouse.vx = dx * 0.25;
      mouse.vy = dy * 0.25;
      mouse.speed = Math.sqrt(dx * dx + dy * dy);
      mouse.targetX = tx;
      mouse.targetY = ty;
      mouse.active = true;
    }
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  // Shockwave / Fluid Impulse on click
  const fluidImpulses = [];
  window.addEventListener('click', (e) => {
    if (e.target.closest('button, a, input, textarea, .terminal-box')) return;
    fluidImpulses.push({
      x: e.clientX,
      y: e.clientY,
      radius: 0,
      maxRadius: Math.max(width, height) * 0.4,
      strength: 35,
      decay: 0.94
    });
  });

  // Wave Ribbons Configuration
  class FlowWave {
    constructor(baseY, amplitude, frequency, speed, colorStart, colorEnd, alpha) {
      this.baseY = baseY;
      this.amplitude = amplitude;
      this.frequency = frequency;
      this.speed = speed;
      this.colorStart = colorStart;
      this.colorEnd = colorEnd;
      this.alpha = alpha;
      this.phase = Math.random() * Math.PI * 2;
    }

    draw(time) {
      this.phase += this.speed;

      ctx.save();
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, this.colorStart);
      grad.addColorStop(0.5, this.colorEnd);
      grad.addColorStop(1, 'rgba(8, 9, 13, 0.05)');

      ctx.fillStyle = grad;
      ctx.globalAlpha = this.alpha;
      ctx.beginPath();
      ctx.moveTo(0, height);

      const step = 16;
      for (let x = 0; x <= width + step; x += step) {
        // Multi-harmonic sine waves
        const wave1 = Math.sin(x * this.frequency + this.phase) * this.amplitude;
        const wave2 = Math.cos(x * (this.frequency * 0.5) - this.phase * 0.8) * (this.amplitude * 0.6);
        const wave3 = Math.sin(x * (this.frequency * 1.8) + this.phase * 1.2) * (this.amplitude * 0.25);
        
        let y = this.baseY + wave1 + wave2 + wave3;

        // Interactive mouse displacement (Flowing water effect)
        const dx = x - mouse.x;
        const dy = y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 220;
        if (dist < maxDist) {
          const factor = Math.cos((dist / maxDist) * (Math.PI / 2));
          y += Math.sin(dist * 0.05 - time * 0.1) * (30 * factor);
          y += mouse.vy * factor * 0.8;
        }

        // Fluid click impulses
        for (let i = 0; i < fluidImpulses.length; i++) {
          const imp = fluidImpulses[i];
          const impDist = Math.abs(x - imp.x);
          const ringDist = Math.abs(impDist - imp.radius);
          if (ringDist < 60) {
            const ripple = Math.sin((ringDist / 60) * Math.PI) * imp.strength;
            y += ripple;
          }
        }

        if (x === 0) {
          ctx.lineTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  }

  let waves = [];
  function initWaves() {
    waves = [
      // Deep Background Velvet Crimson
      new FlowWave(height * 0.65, 80, 0.0012, 0.006, 'rgba(159, 18, 57, 0.25)', 'rgba(76, 5, 25, 0.15)', 0.5),
      // Mid Flowing Ruby Wave
      new FlowWave(height * 0.72, 70, 0.0016, 0.009, 'rgba(225, 29, 72, 0.28)', 'rgba(190, 18, 60, 0.20)', 0.6),
      // Violet Depth Wave (creates contrast and luxurious flow)
      new FlowWave(height * 0.78, 60, 0.0018, 0.007, 'rgba(67, 56, 202, 0.18)', 'rgba(225, 29, 72, 0.16)', 0.55),
      // Foreground Vibrant Crimson Crest
      new FlowWave(height * 0.84, 50, 0.0022, 0.012, 'rgba(244, 63, 94, 0.35)', 'rgba(225, 29, 72, 0.25)', 0.7),
      // Soft Surface Shimmer
      new FlowWave(height * 0.90, 35, 0.0028, 0.016, 'rgba(251, 113, 133, 0.22)', 'rgba(244, 63, 94, 0.12)', 0.65)
    ];
  }
  initWaves();

  // Flowing Particle Stream (Light Tendrils)
  class FlowStreamParticle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = initial ? Math.random() * width : -20;
      this.y = Math.random() * height;
      this.speed = Math.random() * 1.6 + 0.8;
      this.length = Math.random() * 25 + 10;
      this.thickness = Math.random() * 1.8 + 0.6;
      this.alpha = Math.random() * 0.5 + 0.2;
      this.angle = 0;
      this.hue = Math.random() > 0.4 ? 345 : 355; // Rose crimson spectrum
      this.history = [];
    }

    update(time) {
      // Flow vector field driven by sine oscillations
      this.angle = Math.sin(this.y * 0.003 + time * 0.01) * 0.6 + Math.cos(this.x * 0.002) * 0.3;
      
      const vx = Math.cos(this.angle) * this.speed + 0.6; // gentle rightward drift
      const vy = Math.sin(this.angle) * (this.speed * 0.5);

      this.history.push({ x: this.x, y: this.y });
      if (this.history.length > 8) this.history.shift();

      this.x += vx;
      this.y += vy;

      // Mouse attraction / gentle flow around cursor
      if (mouse.active) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 160 && d > 10) {
          const force = (1 - d / 160) * 1.5;
          this.x += (dx / d) * force;
          this.y += (dy / d) * force;
        }
      }

      if (this.x > width + 30 || this.y < -30 || this.y > height + 30) {
        this.reset();
      }
    }

    draw() {
      if (this.history.length < 2) return;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(this.history[0].x, this.history[0].y);
      for (let i = 1; i < this.history.length; i++) {
        ctx.lineTo(this.history[i].x, this.history[i].y);
      }
      ctx.strokeStyle = `hsla(${this.hue}, 90%, 65%, ${this.alpha})`;
      ctx.lineWidth = this.thickness;
      ctx.lineCap = 'round';
      ctx.shadowBlur = 8;
      ctx.shadowColor = `hsl(${this.hue}, 90%, 60%)`;
      ctx.stroke();
      ctx.restore();
    }
  }

  let particles = [];
  function initParticles() {
    particles = [];
    const count = width < 768 ? 30 : 60;
    for (let i = 0; i < count; i++) {
      particles.push(new FlowStreamParticle());
    }
  }
  initParticles();

  // Smooth mouse interpolation
  function updateMouse() {
    mouse.x += (mouse.targetX - mouse.x) * 0.1;
    mouse.y += (mouse.targetY - mouse.y) * 0.1;

    // Fade impulses
    for (let i = fluidImpulses.length - 1; i >= 0; i--) {
      const imp = fluidImpulses[i];
      imp.radius += 5;
      imp.strength *= imp.decay;
      if (imp.radius >= imp.maxRadius || imp.strength < 0.2) {
        fluidImpulses.splice(i, 1);
      }
    }
  }

  // Atmospheric Ambient Glow on Top & Bottom
  function drawGlowOrbs(time) {
    // Upper right flowing ambient orb
    const orbX = width * 0.8 + Math.sin(time * 0.008) * 60;
    const orbY = height * 0.25 + Math.cos(time * 0.006) * 40;
    const orbGrad = ctx.createRadialGradient(orbX, orbY, 0, orbX, orbY, Math.min(width, height) * 0.45);
    orbGrad.addColorStop(0, 'rgba(244, 63, 94, 0.15)');
    orbGrad.addColorStop(0.5, 'rgba(225, 29, 72, 0.06)');
    orbGrad.addColorStop(1, 'rgba(8, 9, 13, 0)');

    ctx.fillStyle = orbGrad;
    ctx.beginPath();
    ctx.arc(orbX, orbY, Math.min(width, height) * 0.45, 0, Math.PI * 2);
    ctx.fill();

    // Cursor fluid glow
    if (mouse.active) {
      const curGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 200);
      curGrad.addColorStop(0, 'rgba(244, 63, 94, 0.12)');
      curGrad.addColorStop(0.6, 'rgba(159, 18, 57, 0.04)');
      curGrad.addColorStop(1, 'rgba(8, 9, 13, 0)');

      ctx.fillStyle = curGrad;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 200, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Main 60 FPS Render Loop
  let time = 0;
  function render() {
    ctx.clearRect(0, 0, width, height);

    // Deep Dark Base
    ctx.fillStyle = '#08090d';
    ctx.fillRect(0, 0, width, height);

    updateMouse();
    drawGlowOrbs(time);

    // 1. Draw Flowing Silk Waves
    for (let i = 0; i < waves.length; i++) {
      waves[i].draw(time);
    }

    // 2. Draw Flowing Particle Streams
    for (let i = 0; i < particles.length; i++) {
      particles[i].update(time);
      particles[i].draw();
    }

    time++;
    requestAnimationFrame(render);
  }

  render();
})();
