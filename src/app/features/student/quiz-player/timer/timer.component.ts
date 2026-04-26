import { Component, input, output, effect, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (secondsRemaining() !== null) {
      <div
        class="timer-chip flex items-center space-x-2 bg-white px-4 py-2 rounded-full border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        [class.warning]="isWarningTime()"
        [class.danger]="isDangerTime()"
        [class.bg-amber-100]="isWarningTime() && !isDangerTime()"
        [class.text-amber-700]="isWarningTime() && !isDangerTime()"
        [class.bg-red-100]="isDangerTime()"
        [class.text-red-700]="isDangerTime()"
      >
        <span class="material-icons" [class.animate-pulse]="isDangerTime()">timer</span>
        <span class="font-mono font-black text-xl tracking-wider">{{ formattedTime() }}</span>
      </div>
    }
  `,
})
export class TimerComponent implements OnDestroy {
  secondsRemaining = input<number | null>(null); // in seconds
  timeUp = output<void>();
  
  timeLeft = signal(0);
  private intervalId: ReturnType<typeof setInterval> | null = null;

  constructor() {
    effect(() => {
      const incomingSeconds = this.secondsRemaining();
      if (incomingSeconds === null) {
        this.stopTimer();
        this.timeLeft.set(0);
        return;
      }
      this.startTimer(incomingSeconds);
    });
  }

  startTimer(seconds: number) {
    const normalized = Math.max(0, seconds);
    this.timeLeft.set(normalized);
  }

  stopTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  get formattedTime() {
    return () => {
      const t = this.timeLeft();
      const minutes = Math.floor(t / 60);
      const seconds = t % 60;
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
  }

  get isLowTime() {
    return () => this.timeLeft() > 0 && this.timeLeft() <= 60; // Less than 1 minute
  }

  get isWarningTime() {
    return () => this.timeLeft() > 0 && this.timeLeft() <= 300;
  }

  get isDangerTime() {
    return () => this.timeLeft() > 0 && this.timeLeft() <= 60;
  }
}
