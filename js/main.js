/**
 * Harshit Shukla Portfolio Engine
 * Inspired by Stark's aesthetic (urstark.is-a.dev)
 * Features:
 * - Dynamic live clock (12-hour format)
 * - Navigation island tab switcher (Home, About, Skills, Projects, Contact)
 * - Lofi music player toggle with equalizer animation
 * - GitHub API metrics integration
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. Dynamic Live Clock in Center Island
  const clockElement = document.getElementById('live-time-clock');
  function updateClock() {
    if (!clockElement) return;
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    clockElement.textContent = `${hours}:${minutes} ${ampm}`;
  }
  updateClock();
  setInterval(updateClock, 1000);

  // 2. Navigation Island Tab Switcher
  const navTabs = document.querySelectorAll('.nav-tab-btn');
  const viewPanels = document.querySelectorAll('.view-panel');

  navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetView = tab.getAttribute('data-view');

      // Update active nav button
      navTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Switch view panel
      viewPanels.forEach(panel => {
        if (panel.id === `view-${targetView}`) {
          panel.classList.add('active');
          panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });

  // 3. Lofi Music Player Toggle
  const musicPlayerPill = document.querySelector('.music-player-pill');
  if (musicPlayerPill) {
    musicPlayerPill.addEventListener('click', () => {
      if (typeof window.toggleLofiPlayer === 'function') {
        window.toggleLofiPlayer();
      }
    });
  }

  // 4. GitHub API Live Data Fetcher
  const GH_USERNAME = 'harshit-codes-07';

  async function fetchGitHubProfile() {
    try {
      const response = await fetch(`https://api.github.com/users/${GH_USERNAME}`);
      if (!response.ok) throw new Error('GitHub API response not ok');
      const data = await response.json();

      const avatarTarget = document.getElementById('hero-orb-avatar');
      const ghRepos = document.getElementById('gh-repo-count');
      const ghFollowers = document.getElementById('gh-follower-count');

      if (avatarTarget && data.avatar_url) avatarTarget.src = data.avatar_url;
      if (ghRepos && data.public_repos !== undefined) ghRepos.textContent = data.public_repos;
      if (ghFollowers && data.followers !== undefined) ghFollowers.textContent = data.followers;
    } catch (err) {
      console.info('Using fallback profile stats:', err.message);
    }
  }
  fetchGitHubProfile();

  // 5. Project Filters in Projects View
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

});
