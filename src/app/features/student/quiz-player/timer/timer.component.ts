import { Component, input, output, effect, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center space-x-2 bg-white px-4 py-2 rounded-full border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
         [ngClass]="{'bg-red-100 text-red-600': isLowTime()}">
      <span class="material-icons" [ngClass]="{'animate-pulse': isLowTime()}">timer</span>
      <span class="font-mono font-black text-xl tracking-wider">{{ formattedTime() }}</span>
    </div>
  `
})
export class TimerComponent implements OnDestroy {
  duration = input.required<number>(); // in seconds
  timeUp = output<void>();
  
  timeLeft = signal(0);
  private intervalId: ReturnType<typeof setInterval> | null = null;

  constructor() {
    effect(() => {
      const initialDuration = this.duration();
      if (initialDuration > 0) {
        this.startTimer(initialDuration);
      }
    });
  }

  startTimer(seconds: number) {
    this.stopTimer();
    this.timeLeft.set(seconds);
    
    this.intervalId = setInterval(() => {
      this.timeLeft.update(t => {
        if (t <= 1) {
          this.stopTimer();
          this.timeUp.emit();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
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
}
