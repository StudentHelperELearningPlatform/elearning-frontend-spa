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

<<<<<<< HEAD
  selectedCategory = signal<Category>('all');
=======
  studentId = '1';
>>>>>>> ba80346ec9d4e7860dd14291cca7d7565967bbd8

  selectedCategory = signal<Category>('all');

  setCategory(cat: Category) {
    this.selectedCategory.set(cat);
  }

  filteredMilestones = computed(() => {
<<<<<<< HEAD
    const category = this.selectedCategory();

    if (category === 'all') {
      return this.store.milestones();
    }

    return this.store.milestones().filter(
      m => m.category === category
    );
  });

  progressPercent = computed(() => {
    const total = this.store.totalCount();
    if (total === 0) return 0;

    return (this.store.earnedCount() / total) * 100;
  });

  getMissing(badge: Milestone): number {
    return (badge.goal ?? 0) - (badge.progress ?? 0);
=======
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
>>>>>>> ba80346ec9d4e7860dd14291cca7d7565967bbd8
  }

  progressPercent(): number {
    if (!this.store.totalCount()) return 0;
    return (this.store.earnedCount() / this.store.totalCount()) * 100;
  }

  getRemaining(badge: any) {
  return (badge.goal ?? 0) - (badge.progress ?? 0);
}
}