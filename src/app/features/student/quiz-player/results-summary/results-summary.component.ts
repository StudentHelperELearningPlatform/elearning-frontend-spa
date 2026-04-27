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
    if (pct === 100) return 'PERFECT SCORE!';
    if (pct >= 90) return 'Incredible!';
    if (pct >= 70) return 'Great Job!';
    if (pct >= 50) return 'Good Effort!';
    if (pct >= 30) return 'Keep Practicing!';
    return "Don't Give Up!";
  }

  getMascotUrl(): string {
    const pct = this.getPercentage();
    if (pct === 100)
      return `https://api.dicebear.com/9.x/fun-emoji/svg?seed=perfect&backgroundColor=transparent`;
    if (pct >= 90)
      return `https://api.dicebear.com/9.x/fun-emoji/svg?seed=star&backgroundColor=transparent`;
    if (pct >= 70)
      return `https://api.dicebear.com/9.x/fun-emoji/svg?seed=happy&backgroundColor=transparent`;
    if (pct >= 50)
      return `https://api.dicebear.com/9.x/fun-emoji/svg?seed=effort&backgroundColor=transparent`;
    if (pct >= 30)
      return `https://api.dicebear.com/9.x/fun-emoji/svg?seed=sad&backgroundColor=transparent`;
    return `https://api.dicebear.com/9.x/fun-emoji/svg?seed=fail&backgroundColor=transparent`;
  }
  getMascotEmoji(): string {
    const pct = this.getPercentage();
    if (pct === 100) return '🏆';
    if (pct >= 90) return '🌟';
    if (pct >= 70) return '😄';
    if (pct >= 50) return '💪';
    if (pct >= 30) return '😅';
    return '😢';
  }

  formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }
}
