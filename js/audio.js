/**
 * Ambient Lofi Player Engine (Web Audio API)
 * Plays atmospheric chill synth chord progression with animated equalizer bars.
 * 100% self-contained, zero external mp3 dependencies.
 */

(function () {
  'use strict';

  let audioCtx = null;
  let isPlaying = false;
  let masterGain = null;
  let chordInterval = null;

  // Lofi Chill Chords (frequencies in Hz)
  const CHORDS = [
    [261.63, 329.63, 392.00, 493.88], // Cmaj7
    [220.00, 261.63, 329.63, 392.00], // Am7
    [174.61, 220.00, 261.63, 329.63], // Fmaj7
    [196.00, 246.94, 293.66, 349.23]  // G7
  ];
  let chordIndex = 0;

  function initAudio() {
    if (audioCtx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();

    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    masterGain.connect(audioCtx.destination);
  }

  function playSoftChord(frequencies) {
    if (!audioCtx || !isPlaying) return;

    frequencies.forEach((freq) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.025, audioCtx.currentTime + 1.2);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 3.8);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(masterGain);

      osc.start(audioCtx.currentTime);
      osc.stop(audioCtx.currentTime + 4.0);
    });
  }

  window.toggleLofiPlayer = function () {
    if (!audioCtx) initAudio();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    const playerPill = document.querySelector('.music-player-pill');
    const eqBars = document.querySelectorAll('.eq-bar');
    const speakerIcon = document.getElementById('audio-speaker-icon');

    if (!isPlaying) {
      isPlaying = true;
      masterGain.gain.cancelScheduledValues(audioCtx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.7, audioCtx.currentTime + 1.5);

      if (playerPill) playerPill.classList.add('playing');
      eqBars.forEach((b) => b.classList.add('active'));
      if (speakerIcon) speakerIcon.textContent = '🔊';

      playSoftChord(CHORDS[chordIndex]);
      chordInterval = setInterval(() => {
        chordIndex = (chordIndex + 1) % CHORDS.length;
        playSoftChord(CHORDS[chordIndex]);
      }, 3800);
    } else {
      isPlaying = false;
      masterGain.gain.cancelScheduledValues(audioCtx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 1.0);

      if (playerPill) playerPill.classList.remove('playing');
      eqBars.forEach((b) => b.classList.remove('active'));
      if (speakerIcon) speakerIcon.textContent = '🔈';

      if (chordInterval) {
        clearInterval(chordInterval);
        chordInterval = null;
      }
    }

    return isPlaying;
  };
})();
