/**
 * Ambient Aurora Glow Canvas Engine
 * Modern, subtle, professional ambient lighting with interactive cursor responsiveness.
 * Designed for Harshit Shukla's Professional Developer Portfolio.
 */

(function () {
  'use strict';

  const canvas = document.getElementById('live-wallpaper-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.WallpaperState = {
    auroraActive: true,
    particlesActive: true,
    mouse: { x: width * 0.5, y: height * 0.3, targetX: width * 0.5, targetY: height * 0.3 }
  };

  // Resize listener
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initOrbs();
  });

  // Smooth mouse tracking
  window.addEventListener('mousemove', (e) => {
    window.WallpaperState.mouse.targetX = e.clientX;
    window.WallpaperState.mouse.targetY = e.clientY;
  });

  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      window.WallpaperState.mouse.targetX = e.touches[0].clientX;
      window.WallpaperState.mouse.targetY = e.touches[0].clientY;
    }
  }, { passive: true });

  // Aurora Light Orbs
  class AuroraOrb {
    constructor(x, y, radius, color, speedX, speedY, phase) {
      this.baseX = x;
      this.baseY = y;
      this.radius = radius;
      this.color = color;
      this.speedX = speedX;
      this.speedY = speedY;
      this.phase = phase;
      this.x = x;
      this.y = y;
    }

    update(time) {
      this.phase += 0.008;
      this.x = this.baseX + Math.sin(this.phase * this.speedX) * (width * 0.15);
      this.y = this.baseY + Math.cos(this.phase * this.speedY) * (height * 0.12);
    }

    draw() {
      const grad = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, this.radius
      );
      grad.addColorStop(0, this.color);
      grad.addColorStop(0.5, this.color.replace(/[\d\.]+\)$/, '0.08)'));
      grad.addColorStop(1, 'rgba(9, 10, 15, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  let orbs = [];
  function initOrbs() {
    orbs = [
      // Primary Crimson Aurora
      new AuroraOrb(width * 0.75, height * 0.25, Math.max(width, height) * 0.38, 'rgba(225, 29, 72, 0.22)', 0.6, 0.8, 0),
      // Deep Ruby Glow
      new AuroraOrb(width * 0.25, height * 0.45, Math.max(width, height) * 0.35, 'rgba(159, 18, 57, 0.18)', 0.5, 0.7, 2),
      // Subtle Slate Violet for richness
      new AuroraOrb(width * 0.55, height * 0.75, Math.max(width, height) * 0.42, 'rgba(79, 70, 229, 0.13)', 0.7, 0.5, 4),
      // Warm Rose Accent
      new AuroraOrb(width * 0.85, height * 0.7, Math.max(width, height) * 0.32, 'rgba(244, 63, 94, 0.16)', 0.8, 0.6, 1)
    ];
  }
  initOrbs();

  // Subtle Stardust Particles
  class StarDust {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 10;
      this.size = Math.random() * 1.5 + 0.6;
      this.speedY = Math.random() * 0.35 + 0.15;
      this.speedX = (Math.random() - 0.5) * 0.2;
      this.alpha = Math.random() * 0.45 + 0.15;
      this.pulse = Math.random() * Math.PI * 2;
    }

    update() {
      this.pulse += 0.02;
      this.y -= this.speedY;
      this.x += this.speedX;

      if (this.y < -10 || this.x < -10 || this.x > width + 10) {
        this.reset();
      }
    }

    draw() {
      const currentAlpha = Math.max(0.05, this.alpha + Math.sin(this.pulse) * 0.15);
      ctx.save();
      ctx.globalAlpha = currentAlpha;
      ctx.fillStyle = '#ffffff';
      ctx.shadowBlur = 4;
      ctx.shadowColor = 'rgba(244, 63, 94, 0.6)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  const particles = [];
  const particleCount = 35;
  for (let i = 0; i < particleCount; i++) {
    particles.push(new StarDust());
  }

  // Draw Interactive Cursor Light
  function drawCursorGlow() {
    const mouse = window.WallpaperState.mouse;
    mouse.x += (mouse.targetX - mouse.x) * 0.08;
    mouse.y += (mouse.targetY - mouse.y) * 0.08;

    const cursorGrad = ctx.createRadialGradient(
      mouse.x, mouse.y, 0,
      mouse.x, mouse.y, Math.min(width, height) * 0.22
    );
    cursorGrad.addColorStop(0, 'rgba(244, 63, 94, 0.10)');
    cursorGrad.addColorStop(0.5, 'rgba(225, 29, 72, 0.04)');
    cursorGrad.addColorStop(1, 'rgba(9, 10, 15, 0)');

    ctx.fillStyle = cursorGrad;
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, Math.min(width, height) * 0.22, 0, Math.PI * 2);
    ctx.fill();
  }

  // Main 60 FPS Render Loop
  let time = 0;
  function render() {
    ctx.clearRect(0, 0, width, height);

    // Deep modern dark base
    ctx.fillStyle = '#08090d';
    ctx.fillRect(0, 0, width, height);

    // 1. Draw Aurora Orbs
    if (window.WallpaperState.auroraActive) {
      for (let i = 0; i < orbs.length; i++) {
        orbs[i].update(time);
        orbs[i].draw();
      }
    }

    // 2. Draw Interactive Cursor Glow
    drawCursorGlow();

    // 3. Draw Subtle Stardust Particles
    if (window.WallpaperState.particlesActive) {
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
    }

    time++;
    requestAnimationFrame(render);
  }

  render();

  // Public control hook
  window.updateWallpaperSettings = function (setting, value) {
    if (setting === 'aurora') {
      window.WallpaperState.auroraActive = value;
    } else if (setting === 'particles') {
      window.WallpaperState.particlesActive = value;
    }
  };
})();
