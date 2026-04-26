import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-results-summary',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div class="bg-white rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 md:p-12 max-w-2xl mx-auto text-center">
      
      <!-- Mascot/Illustration -->
      <div class="w-40 h-40 mx-auto bg-[#0ABAB5]/20 rounded-full border-4 border-black flex items-center justify-center mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <img [src]="getMascotUrl()" alt="Result Mascot" class="w-32 h-32 object-contain" referrerpolicy="no-referrer" />
      </div>

      <h1 class="text-4xl md:text-5xl font-black text-black mb-4 tracking-tight uppercase">
        {{ getTitle() }}
      </h1>
      
      <p class="text-xl text-gray-600 font-medium mb-10">
        You scored <span class="font-black text-black">{{ score() }}</span> out of <span class="font-black text-black">{{ totalPoints() }}</span> points.
      </p>

      <!-- Stats Grid -->
      <div class="grid grid-cols-2 gap-4 mb-10">
        <div class="bg-gray-50 p-6 rounded-2xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <span class="block text-gray-500 font-bold uppercase tracking-wider text-sm mb-2">Accuracy</span>
          <span class="text-3xl font-black text-[#0ABAB5]">{{ getPercentage() }}%</span>
        </div>
        <div class="bg-gray-50 p-6 rounded-2xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <span class="block text-gray-500 font-bold uppercase tracking-wider text-sm mb-2">Time Taken</span>
          <span class="text-3xl font-black text-black font-mono">{{ formatTime(timeSpent()) }}</span>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <app-button variant="secondary" icon="refresh" (btnClick)="retry.emit()">Try Again</app-button>
        <app-button variant="primary" icon="arrow_forward" iconPosition="right" (btnClick)="continue.emit()">Continue Learning</app-button>
      </div>
    </div>
  `
})
export class ResultsSummaryComponent {
  score = input.required<number>();
  totalPoints = input.required<number>();
  timeSpent = input.required<number>(); // in seconds
  
  retry = output<void>();
  continue = output<void>();

  getPercentage(): number {
    if (this.totalPoints() === 0) return 0;
    return Math.round((this.score() / this.totalPoints()) * 100);
  }

  getTitle(): string {
    const pct = this.getPercentage();
    if (pct >= 90) return 'Incredible!';
    if (pct >= 70) return 'Great Job!';
    if (pct >= 50) return 'Good Effort!';
    return 'Keep Practicing!';
  }

  getMascotUrl(): string {
    const pct = this.getPercentage();
    let seed = 'happy';
    if (pct < 50) seed = 'sad';
    else if (pct >= 90) seed = 'star';
    return `https://api.dicebear.com/9.x/fun-emoji/svg?seed=${seed}&backgroundColor=transparent`;
  }

  formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }
}
