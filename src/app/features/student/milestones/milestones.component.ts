import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MilestonesStore, Milestone } from '../store/milestones.store';

@Component({
  selector: 'app-milestones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './milestones.component.html',
  styleUrls: ['./milestones.component.scss']
})
export class MilestonesComponent implements OnInit {

  store = inject(MilestonesStore);

  selectedCategory = signal<'all' | 'learning' | 'streak' | 'mastery' | 'social'>('all');

  ngOnInit() {
    this.store.loadMilestones('1');
  }

  filteredMilestones = computed(() => {
    const category = this.selectedCategory();

    if (category === 'all') {
      return this.store.milestones();
    }

    return this.store.milestones().filter(m => m.category === category);
  });

  setCategory(cat: any) {
    this.selectedCategory.set(cat);
  }

  progressPercent = computed(() => {
    if (this.store.totalCount() === 0) return 0;
    return (this.store.earnedCount() / this.store.totalCount()) * 100;
  });

  getMissing(badge: Milestone) {
    return (badge.goal ?? 0) - (badge.progress ?? 0);
  }
}