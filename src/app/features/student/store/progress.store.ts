import { HttpClient } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { environment } from '../../../../environments/environment';
import {
  ProgressRecord,
  SkillLevel,
  StreakData,
  Milestone,
  ActivityItem,
  UpcomingQuiz,
  DashboardData,
} from '@shared/models/progress.model';

export type { ProgressRecord, SkillLevel, StreakData, Milestone, ActivityItem, UpcomingQuiz };

interface ProgressState {
  student: DashboardData['student'] | null;
  progressRecords: ProgressRecord[];
  skillLevels: SkillLevel[];
  streak: StreakData | null;
  milestones: Milestone[];
  recentActivity: ActivityItem[];
  upcomingQuizzes: UpcomingQuiz[];
  loading: boolean;
  error: string | null;
}

export const ProgressStore = signalStore(
  { providedIn: 'root' },
  withState<ProgressState>({
    student: null,
    progressRecords: [],
    skillLevels: [],
    streak: null,
    milestones: [],
    recentActivity: [],
    upcomingQuizzes: [],
    loading: false,
    error: null,
  }),
  withComputed((state) => ({
    overallProgressPercent: computed(() => {
      const s = state.student();
      if (!s || s.totalLessons === 0) return 0;
      return Math.round((s.completedLessons / s.totalLessons) * 100);
    }),
    activeStreak: computed(() => state.streak()?.currentStreak ?? 0),
    recentMilestones: computed(() =>
      state
        .milestones()
        .filter((m) => m.earnedAt !== null)
        .sort((a, b) => new Date(b.earnedAt!).getTime() - new Date(a.earnedAt!).getTime())
        .slice(0, 3)
    ),
    continueLesson: computed(() => {
      const inProgress = state
        .progressRecords()
        .filter((r) => r.status === 'IN_PROGRESS')
        .sort(
          (a, b) => new Date(b.lastAccessedAt).getTime() - new Date(a.lastAccessedAt).getTime()
        );
      return inProgress[0] ?? null;
    }),
  })),
  withMethods((store, http = inject(HttpClient)) => ({
    loadDashboard(studentId: string) {
      patchState(store, { loading: true, error: null });
      http.get<DashboardData>(`${environment.apiBase}/students/${studentId}/dashboard`).subscribe({
        next: (data) => {
          patchState(store, {
            student: data.student,
            streak: data.streak,
            skillLevels: data.skillLevels,
            progressRecords: data.progressRecords,
            recentActivity: data.recentActivity,
            milestones: data.milestones,
            upcomingQuizzes: data.upcomingQuizzes,
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
