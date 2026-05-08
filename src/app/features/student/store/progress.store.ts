import { HttpClient } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { USER_PLATFORM_API_URL } from '@core/tokens/api.token';

export {
  type ProgressRecord,
  type SkillLevel,
  type StreakData,
  type Milestone,
  type ActivityItem,
  type UpcomingQuiz,
} from '@shared/models/progress.model';

import {
  ProgressRecord,
  SkillLevel,
  StreakData,
  Milestone,
  ActivityItem,
  UpcomingQuiz,
  DashboardData,
} from '@shared/models/progress.model';

interface ProgressState {
  firstName: string | null;
  lastName: string | null;
  studentId: string | null;
  skillLevels: SkillLevel[];
  currentStreak: number;
  recentActivity: ActivityItem[];
  upcomingQuizzes: UpcomingQuiz[];
  loading: boolean;
  error: string | null;
}

export const ProgressStore = signalStore(
  { providedIn: 'root' },
  withState<ProgressState>({
    firstName: null,
    lastName: null,
    studentId: null,
    skillLevels: [],
    currentStreak: 0,
    recentActivity: [],
    upcomingQuizzes: [],
    loading: false,
    error: null,
  }),
  withComputed((state) => ({
    overallProgressPercent: computed(() => {
      // In new backend, we don't have total/completed lessons directly in dashboard
      return 0;
    }),
    activeStreak: computed(() => state.currentStreak()),
    streak: computed(() => ({
      currentStreak: state.currentStreak(),
      longestStreak: state.currentStreak(), // Placeholder
    })),
    continueLesson: computed(() => null as ProgressRecord | null), // Placeholder
  })),
  withMethods((store, http = inject(HttpClient), apiBase = inject(USER_PLATFORM_API_URL)) => ({
    loadDashboard(classId: string) {
      patchState(store, { loading: true, error: null });
      
      http.get<DashboardData>(`${apiBase}/progress/me/dashboard?classId=${classId}`).subscribe({
        next: (data) => {
          patchState(store, {
            firstName: data.firstName,
            lastName: data.lastName,
            studentId: data.studentId,
            skillLevels: data.subjects,
            currentStreak: data.currentStreak,
            loading: false,
            error: null,
          });
        },
        error: () => {
          patchState(store, { loading: false, error: 'Failed to load dashboard data.' });
        },
      });
    },
  }))
);