/**
 * Cinematic Misty Mountain Pagoda & Floating Embers Engine
 * Matches the exact aesthetic from Stark's portfolio (urstark.is-a.dev)
 * Features:
 * - Misty mountain pagoda landscape with atmospheric depth
 * - 60FPS floating luminous ember fireflies with cursor interaction
 */

(function () {
  'use strict';

  const canvas = document.getElementById('live-wallpaper-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const mouse = {
    x: width * 0.5,
    y: height * 0.5,
    targetX: width * 0.5,
    targetY: height * 0.5,
    active: false
  };

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initEmbers();
  });

  window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
    mouse.active = true;
  });

  window.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      mouse.targetX = e.touches[0].clientX;
      mouse.targetY = e.touches[0].clientY;
      mouse.active = true;
    }
  }, { passive: true });

  // Floating Glowing Firefly Embers
  class Ember {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 15 + Math.random() * 20;
      this.size = Math.random() * 2.2 + 1.2;
      this.depth = Math.random() * 0.7 + 0.3; // Parallax scale
      this.speedY = (Math.random() * 0.45 + 0.25) * this.depth;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.alpha = Math.random() * 0.55 + 0.3;
      this.pulse = Math.random() * Math.PI * 2;
      this.pulseSpeed = Math.random() * 0.03 + 0.015;
      // Soft rose-amber warm firefly hue
      this.hue = Math.random() > 0.4 ? 355 : 15;
    }

    update() {
      this.pulse += this.pulseSpeed;
      this.y -= this.speedY;
      this.x += this.speedX + Math.sin(this.pulse) * 0.35;

      // Cursor gentle repulsion
      if (mouse.active) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 140;
        if (dist < maxDist && dist > 1) {
          const force = (1 - dist / maxDist) * 1.8;
          this.x += (dx / dist) * force;
          this.y += (dy / dist) * force * 0.6;
        }
      }

      if (this.y < -20 || this.x < -20 || this.x > width + 20) {
        this.reset();
      }
    }

    draw() {
      const currentAlpha = Math.max(0.1, this.alpha + Math.sin(this.pulse) * 0.2);
      ctx.save();
      ctx.globalAlpha = currentAlpha;
      ctx.fillStyle = `hsl(${this.hue}, 85%, 72%)`;
      ctx.shadowBlur = this.size * 5;
      ctx.shadowColor = `hsl(${this.hue}, 90%, 65%)`;

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * this.depth, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  let embers = [];
  function initEmbers() {
    embers = [];
    const count = width < 768 ? 40 : 85;
    for (let i = 0; i < count; i++) {
      embers.push(new Ember());
    }
  }
  initEmbers();

  // Draw Mountain & Pagoda Silhouettes
  function drawBackgroundScenery() {
    // 1. Deep atmospheric gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
    skyGrad.addColorStop(0, '#101217');
    skyGrad.addColorStop(0.4, '#151820');
    skyGrad.addColorStop(0.7, '#181b24');
    skyGrad.addColorStop(1, '#0e1015');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Distant misty mountain ridges
    ctx.save();
    ctx.fillStyle = 'rgba(28, 32, 42, 0.45)';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.65);
    ctx.bezierCurveTo(width * 0.2, height * 0.45, width * 0.35, height * 0.55, width * 0.55, height * 0.42);
    ctx.bezierCurveTo(width * 0.75, height * 0.32, width * 0.9, height * 0.48, width, height * 0.52);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // 3. Middle mountain ridge with soft mist
    ctx.save();
    ctx.fillStyle = 'rgba(20, 23, 30, 0.65)';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.75);
    ctx.bezierCurveTo(width * 0.15, height * 0.58, width * 0.4, height * 0.68, width * 0.65, height * 0.55);
    ctx.bezierCurveTo(width * 0.85, height * 0.45, width * 0.95, height * 0.62, width, height * 0.68);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // 4. Traditional Pagoda Roof Silhouettes (Right & Center Background)
    drawPagodaRoofs();

    // 5. Soft atmospheric mist over roofs
    const mistGrad = ctx.createLinearGradient(0, height * 0.3, 0, height);
    mistGrad.addColorStop(0, 'rgba(24, 27, 36, 0)');
    mistGrad.addColorStop(0.5, 'rgba(22, 25, 34, 0.35)');
    mistGrad.addColorStop(1, 'rgba(12, 14, 18, 0.75)');
    ctx.fillStyle = mistGrad;
    ctx.fillRect(0, 0, width, height);
  }

  function drawPagodaRoofs() {
    ctx.save();
    ctx.fillStyle = '#0c0e13';
    ctx.strokeStyle = '#181b24';
    ctx.lineWidth = 1;

    // Right large Pagoda
    const px = width * 0.68;
    const py = height * 0.62;

    // Tier 1 (Top)
    drawCurvedRoof(px + 40, py - 60, 140, 28);
    // Tier 2 (Middle)
    drawCurvedRoof(px + 10, py, 200, 36);
    // Tier 3 (Base)
    drawCurvedRoof(px - 30, py + 70, 280, 48);

    // Left Subtle Pagoda
    const lx = width * 0.12;
    const ly = height * 0.72;
    drawCurvedRoof(lx, ly - 40, 110, 22);
    drawCurvedRoof(lx - 20, ly + 10, 150, 28);

    ctx.restore();
  }

  function drawCurvedRoof(x, y, roofWidth, roofHeight) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    // Left upward swoop
    ctx.quadraticCurveTo(x + roofWidth * 0.2, y + roofHeight * 0.6, x + roofWidth * 0.5, y + roofHeight * 0.8);
    // Right upward swoop
    ctx.quadraticCurveTo(x + roofWidth * 0.8, y + roofHeight * 0.6, x + roofWidth, y);
    ctx.lineTo(x + roofWidth * 0.9, y + roofHeight);
    ctx.lineTo(x + roofWidth * 0.1, y + roofHeight);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  // Main 60 FPS Render Loop
  function render() {
    ctx.clearRect(0, 0, width, height);

    mouse.x += (mouse.targetX - mouse.x) * 0.08;
    mouse.y += (mouse.targetY - mouse.y) * 0.08;

    // 1. Draw Misty Scenery & Silhouettes
    drawBackgroundScenery();

    // 2. Draw Floating Firefly Embers
    for (let i = 0; i < embers.length; i++) {
      embers[i].update();
      embers[i].draw();
    }

    requestAnimationFrame(render);
  }

  render();
})();
