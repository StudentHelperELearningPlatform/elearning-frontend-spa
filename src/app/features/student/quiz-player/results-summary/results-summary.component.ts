import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-results-summary',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './results-summary.component.html',
})
export class ResultsSummaryComponent {
  score = input.required<number>();
  totalPoints = input.required<number>();
  timeSpent = input.required<number>(); // in seconds
  passed = input<boolean>(false);
  
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
