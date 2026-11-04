/**
 * Harshit Shukla - Main Application Logic
 * Modern, Professional Developer Portfolio
 * - GitHub API Live Metrics Fetcher
 * - Interactive Developer Terminal (CLI)
 * - Project Filter Controls
 * - Smooth Navigation & Scroll Handling
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. Navbar Scroll Effect & Mobile Menu
  const nav = document.querySelector('.site-nav');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
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

  // 2. GitHub API Live Data Fetcher
  const GH_USERNAME = 'harshit-codes-07';

  async function fetchGitHubProfile() {
    try {
      const response = await fetch(`https://api.github.com/users/${GH_USERNAME}`);
      if (!response.ok) throw new Error('GitHub API response not ok');
      const data = await response.json();

      const avatarEl = document.getElementById('gh-avatar-img');
      const heroAvatarEl = document.getElementById('hero-avatar-target');
      const nameEl = document.getElementById('gh-name');
      const bioEl = document.getElementById('gh-bio-text');
      const reposEl = document.getElementById('gh-repo-count');
      const heroReposEl = document.getElementById('hero-repo-count');
      const followersEl = document.getElementById('gh-follower-count');

      if (avatarEl && data.avatar_url) avatarEl.src = data.avatar_url;
      if (heroAvatarEl && data.avatar_url) heroAvatarEl.src = data.avatar_url;
      if (nameEl && data.name) nameEl.textContent = data.name;
      if (bioEl && data.bio) bioEl.textContent = data.bio;
      if (reposEl && data.public_repos !== undefined) reposEl.textContent = data.public_repos;
      if (heroReposEl && data.public_repos !== undefined) heroReposEl.textContent = `${data.public_repos}+`;
      if (followersEl && data.followers !== undefined) followersEl.textContent = data.followers;
    } catch (err) {
      console.info('Using fallback GitHub profile statistics:', err.message);
    }
  }
  fetchGitHubProfile();

  // 3. Project Category Filter
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

  // 4. Interactive Developer Terminal (CLI)
  const termInput = document.getElementById('term-cmd-input');
  const termBody = document.getElementById('term-output-body');

  const COMMANDS = {
    help: () => [
      { text: '═══ HARSHIT SHUKLA - DEVELOPER TERMINAL ═══', cls: 'accent' },
      { text: 'Available commands:', cls: 'system' },
      { text: '  about        - View developer background & summary', cls: 'system' },
      { text: '  skills       - List core technical stack & competencies', cls: 'system' },
      { text: '  projects     - View featured repositories & case studies', cls: 'system' },
      { text: '  contact      - Display email, GitHub & channels', cls: 'system' },
      { text: '  github       - Open GitHub profile directly', cls: 'success' },
      { text: '  clear        - Clear console screen', cls: 'system' }
    ],
    about: () => [
      { text: '>> ABOUT HARSHIT SHUKLA:', cls: 'accent' },
      { text: 'Software Developer passionate about Python backend logic, task automation, and modern web applications.', cls: 'system' },
      { text: 'Core mindset: Continuous learning, disciplined problem-solving, and clean, self-documenting code architecture.', cls: 'system' }
    ],
    skills: () => [
      { text: '>> TECHNICAL COMPETENCIES:', cls: 'accent' },
      { text: '  • Languages: Python 3, JavaScript (ES6+), HTML5, CSS3', cls: 'system' },
      { text: '  • Systems & Tools: Git, GitHub Actions, Linux / PowerShell, REST APIs', cls: 'system' },
      { text: '  • Practices: Clean Architecture, Workflow Automation, Data Structures', cls: 'system' }
    ],
    projects: () => [
      { text: '>> FEATURED SOFTWARE REPOSITORIES:', cls: 'accent' },
      { text: '  [1] Workflow Automation Suite - Python CLI tooling & pipeline automation', cls: 'system' },
      { text: '  [2] Modern Developer Portfolio - Canvas ambient aurora & responsive UI', cls: 'system' },
      { text: '  [3] Habit & Performance Protocol - Structured productivity engine', cls: 'system' },
      { text: '  Visit https://github.com/harshit-codes-07 for full source code.', cls: 'success' }
    ],
    contact: () => [
      { text: '>> GET IN TOUCH:', cls: 'accent' },
      { text: '  Email: harshitshukla8138@gmail.com', cls: 'system' },
      { text: '  GitHub: https://github.com/harshit-codes-07', cls: 'system' },
      { text: '  Location: India (Available for Remote Work & Projects)', cls: 'system' }
    ],
    github: () => {
      window.open('https://github.com/harshit-codes-07', '_blank');
      return [{ text: 'Opening https://github.com/harshit-codes-07 in new tab...', cls: 'success' }];
    }
  };

  if (termInput && termBody) {
    termInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const rawCmd = termInput.value.trim();
        const cmd = rawCmd.toLowerCase();
        termInput.value = '';

        if (!rawCmd) return;

        appendTermLine(`harshit@dev-box:~$ ${rawCmd}`, 'term-user-cmd');

        if (cmd === 'clear') {
          termBody.innerHTML = '';
          return;
        }

        if (COMMANDS[cmd]) {
          const lines = COMMANDS[cmd]();
          lines.forEach(item => appendTermLine(item.text, item.cls));
        } else {
          appendTermLine(`Command not found: '${rawCmd}'. Type 'help' to view available commands.`, 'error');
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
