export class SoundService {
  private audioContext: AudioContext | null = null;
  private gainNode: GainNode | null = null;
  private soundFiles = ['1.mp3', '2.mp3', '3.mp3', '4.mp3', '5.mp3'];
  private playedFiles: string[] = [];

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

  private async playRandomSound() {

    // Ensure initialization
    this.init();

    // Select a random file without repetition until all have been played
    if (this.playedFiles.length === this.soundFiles.length) {
      this.playedFiles = []; // Reset once all files have been played
    }

    const availableFiles = this.soundFiles.filter(file => !this.playedFiles.includes(file));
    const randomFile = availableFiles[Math.floor(Math.random() * availableFiles.length)];
    this.playedFiles.push(randomFile);

    const soundPath = `/Arithmetic-/VictorySounds/${randomFile}`;
    //const soundPath = `/VictorySounds/${randomFile}`;
    // Fetch and decode the audio
    const response = await fetch(soundPath);
    if (!response.ok) {
      console.error(`Failed to fetch audio file: ${soundPath}`, response.status, response.body);
      return;
    }

    const arrayBuffer = await response.arrayBuffer();

    let audioBuffer;
    try {
      audioBuffer = await this.audioContext!.decodeAudioData(arrayBuffer);
    } catch (error) {
      console.error(`Failed!! to decode ${soundPath} with size ${arrayBuffer.byteLength} audio data:`, error);
      return;
    }

    if (!audioBuffer) {
      console.error("Failed to decode audio: AudioContext is not initialized.");
      return;
    }
    //debugger;
    // Apply random start and end times

    let startCutoff = 0;
    let endCutoff = audioBuffer.duration;
    const randomBounds = audioBuffer.duration/2 - 1;

    if (audioBuffer.duration > 4)
    {
      
      startCutoff = Math.random() * randomBounds;
      endCutoff = audioBuffer.duration - Math.random() * randomBounds;
      endCutoff = Math.min(startCutoff + 6, endCutoff);
      //console.log(`randomizing sound: ${randomFile} randomBounds: ${randomBounds} duration:${audioBuffer.duration} start cutoff: ${startCutoff} end cutoff: ${endCutoff}`);
    }
    else
    {
      //console.log(`sound: ${randomFile} duration:${audioBuffer.duration} start cutoff: ${startCutoff} end cutoff: ${endCutoff}`);
    }
    

    // const maxStartShift = Math.min(2, audioBuffer.duration - 0.5); // Max 2 seconds or within file length
    // const startShift = Math.random() * maxStartShift;
    // const maxEndCutoff = Math.min(2, audioBuffer.duration - startShift); // Max 2 seconds or remaining length
    // const endTime = audioBuffer.duration - Math.random() * maxEndCutoff;

    // Play the sound with random timings
    const source = this.audioContext?.createBufferSource() ?? null;
    if (!source) {
      console.error("Failed to createBufferSource: AudioContext is not initialized.");
      return;
    }
    source.buffer = audioBuffer;

    if (!this.gainNode) {
      console.error("audio failure: gainNode is not initialized.");
      return;
    }
    source.connect(this.gainNode);

    if (!this.audioContext) {
      console.error("audio failure: audioContext is not initialized.");
      return;
    }
    const duration = endCutoff - startCutoff;
    source.start(this.audioContext.currentTime, startCutoff);
    source.stop(this.audioContext.currentTime + duration);

    // Log the playback for debugging
    //console.log(`Playing ${randomFile} from ${startShift.toFixed(2)}s to ${endTime.toFixed(2)}s`);
  }

  private createVoiceNote(frequency: number, startTime: number, duration: number) {
    if (!this.audioContext || !this.gainNode) return;

    // Carrier oscillator (main tone)
    const carrier = this.audioContext.createOscillator();
    carrier.type = 'sine';
    carrier.frequency.setValueAtTime(frequency, startTime);

    // Modulator oscillator (for effects)
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
    //debugger;
    // Call the new function to play an MP3 sound with random effects
    this.playRandomSound();

    const now = this.audioContext.currentTime;

    // Define multiple "Well done!" melodies for random selection
    const melodies = [
      [
        { freq: 400, duration: 0.15, time: 0 },    // We-
        { freq: 350, duration: 0.15, time: 0.15 }, // -ll
        { freq: 500, duration: 0.25, time: 0.3 },  // do-
        { freq: 400, duration: 0.3, time: 0.55 },  // -ne!
      ],
      [
        { freq: 500, duration: 0.2, time: 0 },     // Con-
        { freq: 600, duration: 0.15, time: 0.2 },  // -gra-
        { freq: 700, duration: 0.25, time: 0.35 }, // -tu-
        { freq: 800, duration: 0.3, time: 0.6 },   // -la-
        { freq: 900, duration: 0.35, time: 0.9 },  // -tions!
      ],
      [
        { freq: 450, duration: 0.15, time: 0 },    // Awe-
        { freq: 500, duration: 0.15, time: 0.15 }, // -some
        { freq: 600, duration: 0.2, time: 0.3 },   // job!
        { freq: 700, duration: 0.3, time: 0.55 },  
      ]
    ];

    // Select a random melody each time
    const melody = melodies[Math.floor(Math.random() * melodies.length)];
    //console.log(melody);

    // Play the selected melody
    melody.forEach(({ freq, duration, time }, index) => {
      const isLastNote = index === melody.length - 1;
      const adjustedDuration = isLastNote ? duration * 3 : duration * 2;
      this.createVoiceNote(freq, now + time, adjustedDuration);
    });

    // Add a dynamic sparkle effect
    setTimeout(() => {
      if (!this.audioContext || !this.gainNode) return;

      const sparkleCount = 30 + Math.floor(Math.random() * 10); // Play 3-5 sparkles
      const sparkleLen = 0.1;
      for (let i = 0; i < sparkleCount; i++) {
        const sparkle = this.audioContext.createOscillator();
        const sparkleGain = this.audioContext.createGain();

        sparkle.type = 'sine';
        sparkle.frequency.setValueAtTime(1000 + Math.random() * 1000, this.audioContext.currentTime);
        sparkle.frequency.exponentialRampToValueAtTime(2000 + Math.random() * 2000, this.audioContext.currentTime + 0.1);

        sparkleGain.gain.setValueAtTime(0.2, this.audioContext.currentTime);
        sparkleGain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);

        sparkle.connect(sparkleGain);
        sparkleGain.connect(this.gainNode);

        sparkle.start(this.audioContext.currentTime + sparkleLen * i);
        sparkle.stop(this.audioContext.currentTime + sparkleLen * i + sparkleLen);
      }
    }, 850);
  }
}
