const NOTES = [523.25, 659.25, 783.99, 880, 783.99, 659.25, 587.33, 523.25];

export class VillageAudio {
  enabled = false;
  private ctx: AudioContext | null = null;
  private musicTimer = 0;
  private stepAt = 0;
  private note = 0;

  private context(): AudioContext {
    if (!this.ctx) this.ctx = new AudioContext();
    if (this.ctx.state === 'suspended') void this.ctx.resume();
    return this.ctx;
  }

  setEnabled(on: boolean): void {
    this.enabled = on;
    if (!on) {
      this.stopMusic();
      return;
    }
    this.context();
    this.startMusic();
    this.boof();
  }

  startMusic(): void {
    if (!this.enabled || this.musicTimer) return;
    this.musicTimer = window.setInterval(() => this.playNote(), 480);
    this.playNote();
  }

  stopMusic(): void {
    window.clearInterval(this.musicTimer);
    this.musicTimer = 0;
  }

  footstep(): void {
    if (!this.enabled) return;
    const now = performance.now();
    if (now - this.stepAt < 230) return;
    this.stepAt = now;
    const ctx = this.context();
    const length = Math.floor(ctx.sampleRate * 0.07);
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i += 1) data[i] = (Math.random() * 2 - 1) * (1 - i / length);
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 900;
    const gain = ctx.createGain();
    gain.gain.value = 0.08;
    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    source.start();
  }

  boof(): void {
    if (!this.enabled) return;
    const ctx = this.context();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(180, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(90, ctx.currentTime + 0.16);
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.22);
  }

  private playNote(): void {
    if (!this.enabled || !this.ctx) return;
    const ctx = this.ctx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.value = NOTES[this.note % NOTES.length];
    this.note += 1;
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.03, ctx.currentTime + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.36);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.38);
  }
}
