import { Injectable, signal, computed } from '@angular/core';

export interface Milestone {
  id: string;
  title: string;
  description: string;
  category: 'learning' | 'streak' | 'mastery' | 'social';
  earnedAt?: string; // dacă există => earned
  progress?: number;
  goal?: number;
}

@Injectable({
  providedIn: 'root'
})
export class MilestonesStore {

  // STATE
  milestones = signal<Milestone[]>([]);
  loading = signal<boolean>(false);

  // COMPUTED
  earnedMilestones = computed(() =>
    this.milestones().filter(m => m.earnedAt)
  );

  lockedMilestones = computed(() =>
    this.milestones().filter(m => !m.earnedAt)
  );

  earnedCount = computed(() =>
    this.earnedMilestones().length
  );

  totalCount = computed(() =>
    this.milestones().length
  );

  // METHOD
  loadMilestones(studentId: string) {
    this.loading.set(true);

    // MOCK DATA (până faci MSW)
    setTimeout(() => {
      this.milestones.set([
        {
          id: '1',
          title: 'First Lesson',
          description: 'Complete your first lesson',
          category: 'learning',
          earnedAt: '2026-04-20'
        },
        {
          id: '2',
          title: '7-Day Streak',
          description: 'Study 7 days in a row',
          category: 'streak',
          earnedAt: '2026-04-22'
        },
        {
          id: '3',
          title: 'Perfect Score',
          description: 'Get 100% on a quiz',
          category: 'mastery',
          earnedAt: '2026-04-25'
        },
        {
          id: '4',
          title: 'Explorer',
          description: 'Complete 5 lessons',
          category: 'learning',
          progress: 3,
          goal: 5
        },
        {
          id: '5',
          title: 'Consistency King',
          description: 'Maintain a 14-day streak',
          category: 'streak',
          progress: 7,
          goal: 14
        },
        {
          id: '6',
          title: 'Master Student',
          description: 'Complete all quizzes',
          category: 'mastery',
          progress: 2,
          goal: 10
        }
      ]);

      this.loading.set(false);
    }, 800);
  }
}