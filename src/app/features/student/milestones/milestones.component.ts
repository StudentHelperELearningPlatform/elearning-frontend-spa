import { Component, OnInit, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MilestonesStore, Milestone } from '../store/milestones.store';

type Category = 'all' | 'learning' | 'streak' | 'mastery' | 'social';

@Component({
  selector: 'app-milestones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './milestones.component.html',
  styleUrls: ['./milestones.component.scss']
})
export class MilestonesComponent implements OnInit {

  store = inject(MilestonesStore);

  studentId = '1';

  selectedCategory = signal<Category>('all');

  filteredMilestones = computed(() => {
    const cat = this.selectedCategory();
    if (cat === 'all') return this.store.milestones();
    return this.store.milestones().filter(m => m.category === cat);
  });

  ngOnInit() {
    this.store.loadMilestones(this.studentId);
  }

  setCategory(cat: Category) {
    this.selectedCategory.set(cat);
  }

  isEarned(m: Milestone) {
    return !!m.earnedAt;
  }

  progressPercent(): number {
    if (!this.store.totalCount()) return 0;
    return (this.store.earnedCount() / this.store.totalCount()) * 100;
  }

  getRemaining(badge: any) {
  return (badge.goal ?? 0) - (badge.progress ?? 0);
}
}