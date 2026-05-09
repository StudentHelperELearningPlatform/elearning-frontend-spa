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
  type StudentSummary,
} from '@shared/models/progress.model';

import {
  ProgressRecord,
  SkillLevel,
  StreakData,
  Milestone,
  ActivityItem,
  UpcomingQuiz,
  StudentSummary,
  DashboardData,
} from '@shared/models/progress.model';

interface ProgressState {
  student: StudentSummary | null;
  skillLevels: SkillLevel[];
  streak: StreakData | null;
  progressRecords: ProgressRecord[];
  recentActivity: ActivityItem[];
  milestones: Milestone[];
  upcomingQuizzes: UpcomingQuiz[];
  loading: boolean;
  error: string | null;
}

export const ProgressStore = signalStore(
  { providedIn: 'root' },
  withState<ProgressState>({
    student: null,
    skillLevels: [],
    streak: null,
    progressRecords: [],
    recentActivity: [],
    milestones: [],
    upcomingQuizzes: [],
    loading: false,
    error: null,
  }),
  withComputed((state) => ({
    // Convenience accessor used by the component's studentFirstName getter
    firstName: computed(() => state.student()?.firstName ?? null),

    overallProgressPercent: computed(() => {
      const s = state.student();
      if (!s || !s.totalLessons) return 0;
      return Math.round((s.completedLessons / s.totalLessons) * 100);
    }),

    activeStreak: computed(() => state.streak()?.currentStreak ?? 0),

    recentMilestones: computed(() => {
      return [...state.milestones()]
        .filter((m) => !!m.earnedAt)
        .sort((a, b) => new Date(b.earnedAt!).getTime() - new Date(a.earnedAt!).getTime())
        .slice(0, 3);
    }),

    continueLesson: computed((): ProgressRecord | null => {
      const inProgress = state.progressRecords().filter((r) => r.status === 'IN_PROGRESS');
      if (!inProgress.length) return null;
      return inProgress.reduce((latest, r) =>
        new Date(r.lastAccessedAt).getTime() > new Date(latest.lastAccessedAt).getTime() ? r : latest
      );
    }),
  })),
  withMethods((store, http = inject(HttpClient), apiBase = inject(USER_PLATFORM_API_URL)) => ({
    loadDashboard(studentId: string) {
      patchState(store, { loading: true, error: null });

      http.get<DashboardData>(`${apiBase}/students/${studentId}/dashboard`).subscribe({
        next: (data) => {
          patchState(store, {
            student: data.student,
            skillLevels: data.skillLevels ?? [],
            streak: data.streak ?? null,
            progressRecords: data.progressRecords ?? [],
            recentActivity: data.recentActivity ?? [],
            milestones: data.milestones ?? [],
            upcomingQuizzes: data.upcomingQuizzes ?? [],
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