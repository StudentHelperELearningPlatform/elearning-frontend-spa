import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { computed } from '@angular/core';

export interface ProgressRecord {
  id: string;
}

export interface Milestone {
  title: string;
  earned: boolean;
}

export interface Activity {
  id: string;
  title: string;
  date: Date;
}

interface ProgressState {
  progressRecords: ProgressRecord[];
  skillLevels: Record<string, number>;
  streak: number;
  milestones: Milestone[];
  recentActivity: Activity[];
  loading: boolean;
}

export const ProgressStore = signalStore(
  { providedIn: 'root' },
  withState<ProgressState>({
    progressRecords: [],
    skillLevels: { Math: 80, Science: 65, English: 90 },
    streak: 5,
    milestones: [{ title: 'First Lesson', earned: true }],
    recentActivity: [{ id: 'a1', title: 'Completed Math Quiz', date: new Date() }],
    loading: false,
  }),
  withComputed((state) => ({
    overallProgress: computed(() => 45),
    activeStreak: computed(() => state.streak()),
    recentMilestones: computed(() => state.milestones())
  })),
  withMethods((store) => ({
    loadDashboard() {
      patchState(store, { loading: true });
      // Mock load
      setTimeout(() => patchState(store, { loading: false }), 500);
    }
  }))
);
