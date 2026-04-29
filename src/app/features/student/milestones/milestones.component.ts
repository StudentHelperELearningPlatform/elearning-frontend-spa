import { Component, OnInit, inject, signal, computed } from '@angular/core';
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

  selectedCategory = signal<Category>('all');

  ngOnInit() {
    this.store.loadMilestones('1');
  }

  setCategory(cat: Category) {
    this.selectedCategory.set(cat);
  }

  filteredMilestones = computed(() => {
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
  }
}