/**
 * Itachi Uchiha Live Wallpaper Engine
 * Features:
 * - Blood Moon / Tsukuyomi atmosphere
 * - Procedural flying crows with wing-flapping physics
 * - Rising interactive chakra ember particles (mouse interactive)
 * - Click Tsukuyomi shockwave ripple effect
 */

(function () {
  'use strict';

  const canvas = document.getElementById('live-wallpaper-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  // User Interactive Settings
  window.WallpaperState = {
    crowsEnabled: true,
    emberDensity: 'normal', // 'low', 'normal', 'high'
    tsukuyomiActive: false,
    mouse: { x: width / 2, y: height / 2, active: false }
  };

  // Resize handler
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initMoonPosition();
  });

  // Mouse interaction & Amaterasu Black Flame Trail
  window.WallpaperState.amaterasuEnabled = true;
  const amaterasuFlames = [];

  class AmaterasuFlame {
    constructor(x, y) {
      this.x = x + (Math.random() - 0.5) * 10;
      this.y = y + (Math.random() - 0.5) * 10;
      this.size = Math.random() * 8 + 6;
      this.speedX = (Math.random() - 0.5) * 1.8;
      this.speedY = -(Math.random() * 2.2 + 0.8); // Rise like smoke/fire
      this.alpha = 0.85;
      this.decay = Math.random() * 0.025 + 0.02;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - 0.5) * 0.08;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.rotation += this.rotSpeed;
      this.alpha -= this.decay;
      this.size *= 0.96;
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.globalAlpha = Math.max(0, this.alpha);

      // Crimson burning halo
      ctx.shadowBlur = 12;
      ctx.shadowColor = 'rgba(255, 30, 66, 0.8)';

      // Outer Pitch-Black Amaterasu body
      ctx.fillStyle = '#050508';
      ctx.beginPath();
      ctx.arc(0, 0, this.size, 0, Math.PI * 2);
      ctx.fill();

      // Inner Crimson Core spark
      ctx.fillStyle = this.alpha > 0.4 ? '#ff1e42' : '#8c0018';
      ctx.beginPath();
      ctx.arc(0, -this.size * 0.25, this.size * 0.35, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  function spawnAmaterasu(x, y, count = 2) {
    if (!window.WallpaperState.amaterasuEnabled) return;
    for (let i = 0; i < count; i++) {
      if (amaterasuFlames.length < 90) {
        amaterasuFlames.push(new AmaterasuFlame(x, y));
      }
    }
  }

  window.addEventListener('mousemove', (e) => {
    window.WallpaperState.mouse.x = e.clientX;
    window.WallpaperState.mouse.y = e.clientY;
    window.WallpaperState.mouse.active = true;
    spawnAmaterasu(e.clientX, e.clientY, 2);
  });

  window.addEventListener('mouseleave', () => {
    window.WallpaperState.mouse.active = false;
  });

  // Touch interaction
  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      const tx = e.touches[0].clientX;
      const ty = e.touches[0].clientY;
      window.WallpaperState.mouse.x = tx;
      window.WallpaperState.mouse.y = ty;
      window.WallpaperState.mouse.active = true;
      spawnAmaterasu(tx, ty, 3);
    }
  }, { passive: true });

  // Burst Crow System for Genjutsu Easter Egg
  const burstCrows = [];

  class BurstCrow {
    constructor(x, y, angle) {
      this.x = x;
      this.y = y;
      this.angle = angle;
      this.speed = Math.random() * 6 + 6;
      this.scale = Math.random() * 0.6 + 0.5;
      this.wingState = Math.random() * Math.PI * 2;
      this.wingSpeed = 0.28;
      this.alpha = 1;
    }

    update() {
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed;
      this.wingState += this.wingSpeed;
      if (this.x < -150 || this.x > width + 150 || this.y < -150 || this.y > height + 150) {
        this.alpha = 0;
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.scale(this.scale, this.scale);
      ctx.globalAlpha = this.alpha;

      const flap = Math.sin(this.wingState);
      const wingH = flap * 18;

      ctx.fillStyle = '#050508';
      ctx.shadowBlur = 6;
      ctx.shadowColor = '#ff1e42';

      // Crow Body
      ctx.beginPath();
      ctx.ellipse(0, 0, 12, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Wings
      ctx.beginPath();
      ctx.moveTo(-2, -1);
      ctx.quadraticCurveTo(-10, -wingH - 8, -22, -wingH * 1.3);
      ctx.quadraticCurveTo(-12, -wingH * 0.6 + 2, 2, 0);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(2, -1);
      ctx.quadraticCurveTo(8, -wingH - 6, 20, -wingH * 1.2);
      ctx.quadraticCurveTo(10, -wingH * 0.5 + 2, -2, 0);
      ctx.fill();

      // Red eye
      ctx.fillStyle = '#ff1744';
      ctx.beginPath();
      ctx.arc(8, -2, 1, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  function triggerCrowBurst(ox = width / 2, oy = height / 2, count = 28) {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 / count) * i + (Math.random() - 0.5) * 0.4;
      burstCrows.push(new BurstCrow(ox, oy, angle));
    }
  }
  window.triggerCrowBurst = triggerCrowBurst;

  // Shockwave ripples on click
  const shockwaves = [];
  window.addEventListener('click', (e) => {
    // Don't trigger shockwave if clicking inside interactive buttons or terminal
    if (e.target.closest('button, a, input, select, textarea, .terminal-box')) return;
    triggerShockwave(e.clientX, e.clientY);
  });

  function triggerShockwave(x, y) {
    shockwaves.push({
      x: x,
      y: y,
      radius: 5,
      maxRadius: Math.max(width, height) * 0.45,
      alpha: 0.8,
      speed: 8
    });
  }

  // Moon Configuration
  let moon = {
    x: width * 0.82,
    y: height * 0.28,
    radius: Math.min(width, height) * 0.16,
    glowRadius: Math.min(width, height) * 0.38,
    pulse: 0
  };

  function initMoonPosition() {
    moon.x = width > 768 ? width * 0.8 : width * 0.5;
    moon.y = width > 768 ? height * 0.25 : height * 0.2;
    moon.radius = Math.min(width, height) * (width > 768 ? 0.15 : 0.22);
    moon.glowRadius = moon.radius * 2.4;
  }
  initMoonPosition();

  // Embers Configuration
  let emberCount = 55;
  let embers = [];

  class Ember {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 10 + Math.random() * 20;
      this.size = Math.random() * 2.8 + 1.2;
      this.baseSpeedY = Math.random() * 1.5 + 0.6;
      this.speedY = this.baseSpeedY;
      this.speedX = (Math.random() - 0.5) * 0.8;
      this.alpha = Math.random() * 0.7 + 0.3;
      this.fadeSpeed = Math.random() * 0.006 + 0.002;
      this.hue = Math.random() > 0.3 ? (Math.random() * 15 + 350) : (Math.random() * 20 + 15); // crimson to fiery amber
      this.wobble = Math.random() * Math.PI * 2;
      this.wobbleSpeed = Math.random() * 0.04 + 0.01;
    }

    update() {
      this.wobble += this.wobbleSpeed;
      this.x += this.speedX + Math.sin(this.wobble) * 0.4;
      this.y -= this.speedY;

      // Cursor repel/attract effect
      if (window.WallpaperState.mouse.active) {
        const dx = this.x - window.WallpaperState.mouse.x;
        const dy = this.y - window.WallpaperState.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 130;
        if (dist < maxDist) {
          const force = (1 - dist / maxDist) * 2;
          this.x += (dx / dist) * force;
          this.y += (dy / dist) * force * 0.5;
        }
      }

      this.alpha -= this.fadeSpeed;
      if (this.y < -20 || this.x < -20 || this.x > width + 20 || this.alpha <= 0.05) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.shadowBlur = this.size * 4;
      ctx.shadowColor = `hsl(${this.hue}, 100%, 55%)`;
      ctx.fillStyle = `hsl(${this.hue}, 100%, ${this.hue > 340 ? '60%' : '50%'})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function initEmbers() {
    let count = 55;
    if (window.WallpaperState.emberDensity === 'low') count = 25;
    if (window.WallpaperState.emberDensity === 'high') count = 90;
    embers = [];
    for (let i = 0; i < count; i++) {
      embers.push(new Ember());
    }
  }
  initEmbers();

  // Flying Crow Flock
  class Crow {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      // Fly left to right or slightly diagonal across the moon
      this.x = initial ? Math.random() * width : -100 - Math.random() * 200;
      this.y = Math.random() * (height * 0.65) + 30;
      this.scale = Math.random() * 0.7 + 0.45; // Depth perspective
      this.speedX = (Math.random() * 1.8 + 2.2) * (this.scale * 1.1);
      this.speedY = (Math.random() - 0.5) * 0.7;
      this.wingState = Math.random() * Math.PI * 2;
      this.wingSpeed = Math.random() * 0.12 + 0.14;
      this.opacity = Math.min(1, this.scale * 1.1);
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.wingState += this.wingSpeed;

      // Slight natural swoop
      this.speedY += Math.sin(this.wingState * 0.4) * 0.03;

      if (this.x > width + 120) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.scale(this.scale, this.scale);
      ctx.globalAlpha = this.opacity;

      const flap = Math.sin(this.wingState);
      const wingHeight = flap * 16;

      ctx.fillStyle = '#0a0a0d';
      ctx.shadowBlur = 4;
      ctx.shadowColor = 'rgba(230, 0, 38, 0.4)';

      ctx.beginPath();
      // Crow Body
      ctx.ellipse(0, 0, 11, 4.5, 0.15, 0, Math.PI * 2);
      ctx.fill();

      // Crow Head & Beak
      ctx.beginPath();
      ctx.arc(9, -1, 3.5, 0, Math.PI * 2);
      ctx.fill();
      // Sharp beak
      ctx.beginPath();
      ctx.moveTo(11, -1.5);
      ctx.lineTo(16, 0.5);
      ctx.lineTo(10, 1.5);
      ctx.fill();

      // Left Wing (Up & down flap)
      ctx.beginPath();
      ctx.moveTo(-2, -1);
      ctx.quadraticCurveTo(-10, -wingHeight - 8, -20, -wingHeight * 1.3);
      ctx.quadraticCurveTo(-12, -wingHeight * 0.6 + 2, 2, 0);
      ctx.fill();

      // Right Wing
      ctx.beginPath();
      ctx.moveTo(2, -1);
      ctx.quadraticCurveTo(8, -wingHeight - 6, 18, -wingHeight * 1.2);
      ctx.quadraticCurveTo(10, -wingHeight * 0.5 + 2, -2, 0);
      ctx.fill();

      // Tail feathers
      ctx.beginPath();
      ctx.moveTo(-9, 0);
      ctx.lineTo(-20, 2);
      ctx.lineTo(-18, 5);
      ctx.lineTo(-8, 3);
      ctx.closePath();
      ctx.fill();

      // Subtle red eye glint
      ctx.fillStyle = '#ff1744';
      ctx.beginPath();
      ctx.arc(9.5, -2, 0.9, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  const crows = [];
  const crowCount = 9;
  for (let i = 0; i < crowCount; i++) {
    crows.push(new Crow());
  }

  // Draw Blood Moon / Tsukuyomi
  function drawMoon() {
    moon.pulse += 0.015;
    const pulseScale = 1 + Math.sin(moon.pulse) * 0.02;
    const curRadius = moon.radius * pulseScale;

    // Atmospheric outer crimson halo
    const halo = ctx.createRadialGradient(
      moon.x, moon.y, curRadius * 0.5,
      moon.x, moon.y, moon.glowRadius * 1.5
    );
    halo.addColorStop(0, 'rgba(230, 15, 45, 0.35)');
    halo.addColorStop(0.4, 'rgba(180, 0, 25, 0.18)');
    halo.addColorStop(0.8, 'rgba(60, 0, 10, 0.06)');
    halo.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(moon.x, moon.y, moon.glowRadius * 1.5, 0, Math.PI * 2);
    ctx.fill();

    // Inner Moon Body
    const moonGrad = ctx.createRadialGradient(
      moon.x - curRadius * 0.25, moon.y - curRadius * 0.25, curRadius * 0.1,
      moon.x, moon.y, curRadius
    );
    moonGrad.addColorStop(0, '#ff4763');
    moonGrad.addColorStop(0.5, '#cc0022');
    moonGrad.addColorStop(0.85, '#730012');
    moonGrad.addColorStop(1, '#330008');

    ctx.save();
    ctx.shadowBlur = 35;
    ctx.shadowColor = '#e60026';
    ctx.fillStyle = moonGrad;
    ctx.beginPath();
    ctx.arc(moon.x, moon.y, curRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Subtle Tsukuyomi / Sharingan Tomoe silhouette inside the moon
    ctx.save();
    ctx.translate(moon.x, moon.y);
    ctx.rotate(moon.pulse * 0.3);
    ctx.fillStyle = 'rgba(20, 0, 4, 0.28)';

    // 3 subtle moon swirls / tomoe shapes
    for (let i = 0; i < 3; i++) {
      ctx.rotate((Math.PI * 2) / 3);
      ctx.beginPath();
      ctx.arc(0, -curRadius * 0.48, curRadius * 0.14, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(0, -curRadius * 0.35);
      ctx.quadraticCurveTo(curRadius * 0.16, -curRadius * 0.35, curRadius * 0.12, -curRadius * 0.18);
      ctx.quadraticCurveTo(0, -curRadius * 0.28, 0, -curRadius * 0.35);
      ctx.fill();
    }
    // Center pupil shadow
    ctx.beginPath();
    ctx.arc(0, 0, curRadius * 0.12, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Draw Fog / Atmospheric mist
  let mistOffset = 0;
  function drawAtmosphere() {
    mistOffset += 0.25;
    const mistGrad = ctx.createLinearGradient(0, height - 180, 0, height);
    mistGrad.addColorStop(0, 'rgba(10, 10, 14, 0)');
    mistGrad.addColorStop(0.5, 'rgba(30, 4, 8, 0.35)');
    mistGrad.addColorStop(1, 'rgba(8, 8, 12, 0.95)');

    ctx.fillStyle = mistGrad;
    ctx.fillRect(0, height - 180, width, 180);
  }

  // Draw Shockwaves
  function drawShockwaves() {
    for (let i = shockwaves.length - 1; i >= 0; i--) {
      const sw = shockwaves[i];
      sw.radius += sw.speed;
      sw.alpha -= 0.015;

      if (sw.alpha <= 0 || sw.radius >= sw.maxRadius) {
        shockwaves.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.lineWidth = 3;
      ctx.strokeStyle = `rgba(255, 30, 66, ${sw.alpha})`;
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#ff1e42';
      ctx.beginPath();
      ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
  }

  // Main 60 FPS Render Loop
  let animId;
  function render() {
    ctx.clearRect(0, 0, width, height);

    // Deep Dark Canvas Background
    ctx.fillStyle = '#070709';
    ctx.fillRect(0, 0, width, height);

    // 1. Draw Tsukuyomi Blood Moon
    drawMoon();

    // 2. Draw Flying Crows
    if (window.WallpaperState.crowsEnabled) {
      for (let i = 0; i < crows.length; i++) {
        crows[i].update();
        crows[i].draw();
      }
    }

    // 3. Draw Rising Chakra Embers
    for (let i = 0; i < embers.length; i++) {
      embers[i].update();
      embers[i].draw();
    }

    // 4. Draw Burst Crows (Easter Egg)
    for (let i = burstCrows.length - 1; i >= 0; i--) {
      const bc = burstCrows[i];
      bc.update();
      if (bc.alpha <= 0.05) {
        burstCrows.splice(i, 1);
      } else {
        bc.draw();
      }
    }

    // 5. Draw Amaterasu Black Flames (Cursor Trail)
    for (let i = amaterasuFlames.length - 1; i >= 0; i--) {
      const af = amaterasuFlames[i];
      af.update();
      if (af.alpha <= 0.05 || af.size <= 0.8) {
        amaterasuFlames.splice(i, 1);
      } else {
        af.draw();
      }
    }

    // 6. Ground mist & Shockwaves
    drawAtmosphere();
    drawShockwaves();

    animId = requestAnimationFrame(render);
  }

  render();

  // Public control hooks for UI toggles
  window.updateWallpaperSettings = function (setting, value) {
    if (setting === 'crows') {
      window.WallpaperState.crowsEnabled = value;
    } else if (setting === 'embers') {
      window.WallpaperState.emberDensity = value;
      initEmbers();
    } else if (setting === 'shockwave') {
      triggerShockwave(width / 2, height / 2);
    } else if (setting === 'amaterasu') {
      window.WallpaperState.amaterasuEnabled = value;
    }
  };

})();
