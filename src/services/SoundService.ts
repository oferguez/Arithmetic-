export class SoundService {
  private audioContext: AudioContext | null = null;
  private gainNode: GainNode | null = null;

  constructor() {
    this.init = this.init.bind(this);
    this.playSuccess = this.playSuccess.bind(this);
  }

  private init() {
    if (!this.audioContext) {
      this.audioContext = new AudioContext();
      this.gainNode = this.audioContext.createGain();
      this.gainNode.connect(this.audioContext.destination);
      this.gainNode.gain.value = 0.2;
    }
  }

  private createVoiceNote(frequency: number, startTime: number, duration: number) {
    if (!this.audioContext || !this.gainNode) return;

    // Carrier oscillator (main tone)
    const carrier = this.audioContext.createOscillator();
    carrier.type = 'sine';
    carrier.frequency.setValueAtTime(frequency, startTime);

    // Modulator oscillator (for vowel-like sounds)
    const modulator = this.audioContext.createOscillator();
    modulator.type = 'sine';
    modulator.frequency.setValueAtTime(frequency * 0.1, startTime);

    // Modulation gain
    const modGain = this.audioContext.createGain();
    modGain.gain.setValueAtTime(frequency * 0.5, startTime);

    // Note envelope
    const noteGain = this.audioContext.createGain();
    noteGain.gain.setValueAtTime(0, startTime);
    noteGain.gain.linearRampToValueAtTime(1, startTime + 0.05);
    noteGain.gain.setValueAtTime(1, startTime + duration - 0.05);
    noteGain.gain.linearRampToValueAtTime(0, startTime + duration);

    // Connect modulation chain
    modulator.connect(modGain);
    modGain.connect(carrier.frequency);

    // Connect audio chain
    carrier.connect(noteGain);
    noteGain.connect(this.gainNode);

    // Schedule playback
    carrier.start(startTime);
    carrier.stop(startTime + duration);
    modulator.start(startTime);
    modulator.stop(startTime + duration);
  }

  playSuccess() {
    this.init();
    if (!this.audioContext) return;

    const now = this.audioContext.currentTime;
    
    // "Well done!" melody
    // Using specific frequencies and timing to create speech-like sounds
    const speech = [
      { freq: 400, duration: 0.15, time: 0 },    // We-
      { freq: 350, duration: 0.15, time: 0.15 }, // -ll
      { freq: 500, duration: 0.25, time: 0.3 },  // do-
      { freq: 400, duration: 0.3, time: 0.55 },  // -ne!
    ];

    speech.forEach(({ freq, duration, time }) => {
      this.createVoiceNote(freq, now + time, duration);
    });

    // Add a cheerful sparkle effect
    setTimeout(() => {
      if (!this.audioContext || !this.gainNode) return;
      const sparkle = this.audioContext.createOscillator();
      const sparkleGain = this.audioContext.createGain();
      
      sparkle.type = 'sine';
      sparkle.frequency.setValueAtTime(1200, this.audioContext.currentTime);
      sparkle.frequency.exponentialRampToValueAtTime(2400, this.audioContext.currentTime + 0.1);
      
      sparkleGain.gain.setValueAtTime(0.2, this.audioContext.currentTime);
      sparkleGain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
      
      sparkle.connect(sparkleGain);
      sparkleGain.connect(this.gainNode);
      
      sparkle.start();
      sparkle.stop(this.audioContext.currentTime + 0.1);
    }, 850);
  }
}