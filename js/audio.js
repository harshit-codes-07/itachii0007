/**
 * Shinobi Ambient Audio Generator (Web Audio API)
 * Synthesizes deep atmospheric wind & meditative chakra drone with zero external assets.
 */

(function () {
  'use strict';

  let audioCtx = null;
  let isPlaying = false;
  let masterGain = null;
  let osc1 = null;
  let osc2 = null;
  let filter = null;
  let lfo = null;
  let lfoGain = null;

  function initAudio() {
    if (audioCtx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();

    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    masterGain.connect(audioCtx.destination);

    // Deep resonant filter
    filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(160, audioCtx.currentTime);
    filter.Q.setValueAtTime(4.0, audioCtx.currentTime);
    filter.connect(masterGain);

    // Low Drone Oscillator 1 (55Hz - A1 note)
    osc1 = audioCtx.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(55, audioCtx.currentTime);
    osc1.connect(filter);

    // Subtle Harmonic Oscillator 2 (110Hz - A2 octave)
    osc2 = audioCtx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(110, audioCtx.currentTime);
    osc2.connect(filter);

    // LFO for slow breathing wind / chakra pulse
    lfo = audioCtx.createOscillator();
    lfo.frequency.setValueAtTime(0.12, audioCtx.currentTime); // 8-second slow breath cycle
    lfoGain = audioCtx.createGain();
    lfoGain.gain.setValueAtTime(40, audioCtx.currentTime);
    lfo.connect(filter.frequency);

    osc1.start();
    osc2.start();
    lfo.start();
  }

  // Play single Tsukuyomi chime / strike
  window.playJutsuChime = function () {
    if (!audioCtx || audioCtx.state === 'suspended') return;
    try {
      const strikeOsc = audioCtx.createOscillator();
      const strikeGain = audioCtx.createGain();

      strikeOsc.type = 'sine';
      strikeOsc.frequency.setValueAtTime(440, audioCtx.currentTime);
      strikeOsc.frequency.exponentialRampToValueAtTime(110, audioCtx.currentTime + 1.2);

      strikeGain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      strikeGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.5);

      strikeOsc.connect(strikeGain);
      strikeGain.connect(audioCtx.destination);

      strikeOsc.start();
      strikeOsc.stop(audioCtx.currentTime + 1.5);
    } catch (e) {
      console.warn('Audio chime error:', e);
    }
  };

  window.toggleAmbientAudio = function () {
    if (!audioCtx) {
      initAudio();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const soundBtn = document.getElementById('audio-toggle-btn');
    const soundText = document.getElementById('audio-status-text');

    if (!isPlaying) {
      // Fade in
      masterGain.gain.cancelScheduledValues(audioCtx.currentTime);
      masterGain.gain.setValueAtTime(masterGain.gain.value, audioCtx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.08, audioCtx.currentTime + 2.0);
      isPlaying = true;

      if (soundBtn) soundBtn.classList.add('playing');
      if (soundText) soundText.textContent = 'Audio: Active';
    } else {
      // Fade out
      masterGain.gain.cancelScheduledValues(audioCtx.currentTime);
      masterGain.gain.setValueAtTime(masterGain.gain.value, audioCtx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);
      isPlaying = false;

      if (soundBtn) soundBtn.classList.remove('playing');
      if (soundText) soundText.textContent = 'Audio: Muted';
    }
    return isPlaying;
  };
})();
