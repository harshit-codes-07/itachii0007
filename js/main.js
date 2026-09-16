/**
 * Main Application Logic
 * - Typewriter quote animation
 * - GitHub API live statistics
 * - Interactive Jutsu Terminal
 * - Project filtering & smooth navigation
 * - Wallpaper controls
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. Navbar Scroll Effect & Mobile Menu
  const nav = document.querySelector('.site-nav');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  // 2. Wallpaper Controls Bar
  const crowToggleBtn = document.getElementById('toggle-crows-btn');
  const emberDensityBtn = document.getElementById('toggle-embers-btn');
  const shockwaveBtn = document.getElementById('trigger-shockwave-btn');

  if (crowToggleBtn) {
    crowToggleBtn.addEventListener('click', () => {
      const currentState = window.WallpaperState?.crowsEnabled ?? true;
      const newState = !currentState;
      window.updateWallpaperSettings('crows', newState);
      crowToggleBtn.classList.toggle('active', newState);
      crowToggleBtn.textContent = newState ? '🦅 Crows: ON' : '🦅 Crows: OFF';
    });
  }

  if (emberDensityBtn) {
    const densities = ['low', 'normal', 'high'];
    let currentIdx = 1;
    emberDensityBtn.addEventListener('click', () => {
      currentIdx = (currentIdx + 1) % densities.length;
      const nextDensity = densities[currentIdx];
      window.updateWallpaperSettings('embers', nextDensity);
      emberDensityBtn.textContent = `🔥 Embers: ${nextDensity.toUpperCase()}`;
    });
  }

  if (shockwaveBtn) {
    shockwaveBtn.addEventListener('click', () => {
      window.updateWallpaperSettings('shockwave');
      if (typeof window.playJutsuChime === 'function') {
        window.playJutsuChime();
      }
    });
  }

  // Audio Toggle
  const audioBtn = document.getElementById('audio-toggle-btn');
  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      if (typeof window.toggleAmbientAudio === 'function') {
        window.toggleAmbientAudio();
      }
    });
  }

  // 3. GitHub API Live Data Fetcher
  const GH_USERNAME = 'harshit-codes-07';

  async function fetchGitHubProfile() {
    try {
      const response = await fetch(`https://api.github.com/users/${GH_USERNAME}`);
      if (!response.ok) throw new Error('GitHub API response not ok');
      const data = await response.json();

      // Update elements if elements exist
      const avatarEl = document.getElementById('gh-avatar-img');
      const nameEl = document.getElementById('gh-name');
      const bioEl = document.getElementById('gh-bio-text');
      const reposEl = document.getElementById('gh-repo-count');
      const followersEl = document.getElementById('gh-follower-count');
      const heroAvatarEl = document.getElementById('hero-avatar-target');

      if (avatarEl && data.avatar_url) avatarEl.src = data.avatar_url;
      if (heroAvatarEl && data.avatar_url) heroAvatarEl.src = data.avatar_url;
      if (nameEl && data.name) nameEl.textContent = data.name;
      if (bioEl && data.bio) bioEl.textContent = data.bio;
      if (reposEl && data.public_repos !== undefined) reposEl.textContent = data.public_repos;
      if (followersEl && data.followers !== undefined) followersEl.textContent = data.followers;
    } catch (err) {
      console.info('Using fallback GitHub profile statistics:', err.message);
    }
  }
  fetchGitHubProfile();

  // 4. Project Filters
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 5. Interactive Jutsu Terminal
  const termInput = document.getElementById('term-cmd-input');
  const termBody = document.getElementById('term-output-body');

  const COMMANDS = {
    help: () => [
      { text: '═══ ITACHI SHINOBI PROTOCOL ═══', cls: 'accent' },
      { text: 'Available commands:', cls: 'system' },
      { text: '  skills       - View shinobi jutsu & technical arsenal', cls: 'system' },
      { text: '  projects     - View developer scrolls & repositories', cls: 'system' },
      { text: '  itachi       - Invoke Itachi Uchiha lore & wisdom', cls: 'system' },
      { text: '  quote        - Display iconic shinobi philosophies', cls: 'system' },
      { text: '  mangekyo     - Awaken the Mangekyo Sharingan', cls: 'accent' },
      { text: '  tsukuyomi    - Cast Tsukuyomi visual illusion', cls: 'accent' },
      { text: '  contact      - Summon the messenger raven (email & links)', cls: 'system' },
      { text: '  clear        - Purge terminal buffer', cls: 'system' }
    ],
    skills: () => [
      { text: '>> INVENTORY OF ARSENAL:', cls: 'accent' },
      { text: '  • Python: Core Logic, Automation scripts, Bot workflows', cls: 'system' },
      { text: '  • Web Frontend: Semantic HTML5, CSS3 Glassmorphism, Modern JS', cls: 'system' },
      { text: '  • Version Control: Git branching, GitHub Pages, CI workflows', cls: 'system' },
      { text: '  • Mindset: Problem solving, Calisthenics discipline, Clean code', cls: 'system' }
    ],
    projects: () => [
      { text: '>> SCROLLS OF POWER:', cls: 'accent' },
      { text: '  [1] Tsukuyomi Automation Suite - Python workflow scripts', cls: 'system' },
      { text: '  [2] Sharingan UI Components - Modern responsive dark-mode UI', cls: 'system' },
      { text: '  [3] Shinobi Discipline Tracker - Calisthenics & productivity logger', cls: 'system' },
      { text: '  Visit https://github.com/harshit-codes-07 for full source code.', cls: 'success' }
    ],
    itachi: () => [
      { text: '“Self-sacrifice... A nameless shinobi who protects peace within its shadow. That is a true shinobi.”', cls: 'accent' },
      { text: '— Itachi Uchiha, Clan of the Sharingan', cls: 'system' }
    ],
    quote: () => {
      const quotes = [
        '“It is not wise to judge others based on your own preconceptions and by their appearances.”',
        '“Those who cannot acknowledge themselves will eventually fail.”',
        '“Knowledge and awareness are vague, and perhaps better called illusions.”',
        '“Even the strongest opponent always has a weakness.”'
      ];
      const pick = quotes[Math.floor(Math.random() * quotes.length)];
      return [{ text: pick, cls: 'accent' }, { text: '— Itachi Uchiha', cls: 'system' }];
    },
    mangekyo: () => {
      const icons = document.querySelectorAll('.mangekyo-icon, .hero-avatar-frame');
      icons.forEach(el => {
        el.style.transition = 'transform 1.5s cubic-bezier(0.68, -0.55, 0.27, 1.55), filter 1s';
        el.style.transform = 'scale(1.2) rotate(720deg)';
        el.style.filter = 'drop-shadow(0 0 35px #ff1e42)';
        setTimeout(() => {
          el.style.transform = '';
          el.style.filter = '';
        }, 2500);
      });
      window.updateWallpaperSettings('shockwave');
      if (typeof window.playJutsuChime === 'function') window.playJutsuChime();
      return [{ text: '👁️ MANGEKYO SHARINGAN AWAKENED! Reality distorted.', cls: 'accent' }];
    },
    tsukuyomi: () => {
      document.body.style.transition = 'filter 0.5s ease';
      document.body.style.filter = 'invert(1) hue-rotate(180deg) contrast(1.4)';
      window.updateWallpaperSettings('shockwave');
      if (typeof window.playJutsuChime === 'function') window.playJutsuChime();
      setTimeout(() => {
        document.body.style.filter = '';
      }, 1400);
      return [{ text: '🌑 TSUKUYOMI CAST! You are trapped in 72 hours of illusions.', cls: 'error' }];
    },
    contact: () => [
      { text: '>> SUMMON HARSHIT SHUKLA:', cls: 'accent' },
      { text: '  Email: harshitshukla8138@gmail.com', cls: 'system' },
      { text: '  GitHub: https://github.com/harshit-codes-07', cls: 'system' },
      { text: '  Domain: itachii0007', cls: 'system' }
    ]
  };

  if (termInput && termBody) {
    termInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const rawCmd = termInput.value.trim();
        const cmd = rawCmd.toLowerCase();
        termInput.value = '';

        if (!rawCmd) return;

        // Print entered command
        appendTermLine(`itachi@shinobi:~$ ${rawCmd}`, 'term-user-cmd');

        if (cmd === 'clear') {
          termBody.innerHTML = '';
          return;
        }

        if (COMMANDS[cmd]) {
          const lines = COMMANDS[cmd]();
          lines.forEach(item => appendTermLine(item.text, item.cls));
        } else {
          appendTermLine(`Command not found: '${rawCmd}'. Type 'help' for Jutsu commands.`, 'error');
        }

        termBody.scrollTop = termBody.scrollHeight;
      }
    });
  }

  function appendTermLine(text, className) {
    const div = document.createElement('div');
    div.className = `term-line ${className || ''}`;
    div.textContent = text;
    termBody.appendChild(div);
  }

});
