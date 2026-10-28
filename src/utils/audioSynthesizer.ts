/**
 * Web Audio API gentle Music Box Synthesizer
 * Plays an ambient, sweet acoustic music-box rendition of the Happy Birthday theme
 * so that music plays gracefully even before the user puts a custom mp3 in public/audio/!
 */

class BirthdaySynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timer: number | null = null;
  private noteIndex = 0;
  private masterGain: GainNode | null = null;
  private volume = 0.5;

  // Notes and durations for a delicate music box "Happy Birthday" melody (frequencies in Hz)
  private readonly notes: { freq: number; dur: number; rest: number }[] = [
    { freq: 261.63, dur: 0.35, rest: 0.1 }, // C4
    { freq: 261.63, dur: 0.25, rest: 0.05 }, // C4
    { freq: 293.66, dur: 0.6, rest: 0.1 }, // D4
    { freq: 261.63, dur: 0.6, rest: 0.1 }, // C4
    { freq: 349.23, dur: 0.6, rest: 0.1 }, // F4
    { freq: 329.63, dur: 1.1, rest: 0.3 }, // E4

    { freq: 261.63, dur: 0.35, rest: 0.1 }, // C4
    { freq: 261.63, dur: 0.25, rest: 0.05 }, // C4
    { freq: 293.66, dur: 0.6, rest: 0.1 }, // D4
    { freq: 261.63, dur: 0.6, rest: 0.1 }, // C4
    { freq: 392.00, dur: 0.6, rest: 0.1 }, // G4
    { freq: 349.23, dur: 1.1, rest: 0.3 }, // F4

    { freq: 261.63, dur: 0.35, rest: 0.1 }, // C4
    { freq: 261.63, dur: 0.25, rest: 0.05 }, // C4
    { freq: 523.25, dur: 0.6, rest: 0.1 }, // C5
    { freq: 440.00, dur: 0.6, rest: 0.1 }, // A4
    { freq: 349.23, dur: 0.6, rest: 0.1 }, // F4
    { freq: 329.63, dur: 0.6, rest: 0.1 }, // E4
    { freq: 293.66, dur: 0.9, rest: 0.2 }, // D4

    { freq: 466.16, dur: 0.35, rest: 0.1 }, // Bb4
    { freq: 466.16, dur: 0.25, rest: 0.05 }, // Bb4
    { freq: 440.00, dur: 0.6, rest: 0.1 }, // A4
    { freq: 349.23, dur: 0.6, rest: 0.1 }, // F4
    { freq: 392.00, dur: 0.6, rest: 0.1 }, // G4
    { freq: 349.23, dur: 1.5, rest: 0.8 }, // F4
  ];

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume * 0.4, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume * 0.4, this.ctx.currentTime);
    }
  }

  public play() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.noteIndex = 0;
    this.scheduleNextNote();
  }

  private playTone(freq: number, duration: number) {
    if (!this.ctx || !this.masterGain) return;

    // Harmonic bell/celesta sound using 2 oscillators + exponential decay
    const osc = this.ctx.createOscillator();
    const oscHarmonic = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    // Subtle overtone for music box sparkle
    oscHarmonic.type = 'triangle';
    oscHarmonic.frequency.setValueAtTime(freq * 2.01, this.ctx.currentTime);

    const now = this.ctx.currentTime;
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.linearRampToValueAtTime(0.25, now + 0.03); // Fast chime attack
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration + 0.5); // Natural gentle ring

    osc.connect(noteGain);
    oscHarmonic.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc.start(now);
    oscHarmonic.start(now);
    osc.stop(now + duration + 0.6);
    oscHarmonic.stop(now + duration + 0.6);
  }

  private scheduleNextNote = () => {
    if (!this.isPlaying) return;

    const currentNote = this.notes[this.noteIndex];
    this.playTone(currentNote.freq, currentNote.dur);

    const stepDelay = (currentNote.dur + currentNote.rest) * 1000;
    this.noteIndex = (this.noteIndex + 1) % this.notes.length;

    this.timer = window.setTimeout(this.scheduleNextNote, stepDelay);
  };

  public stop() {
    this.isPlaying = false;
    if (this.timer !== null) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  public getIsPlaying() {
    return this.isPlaying;
  }
}

export const birthdaySynth = new BirthdaySynthesizer();

