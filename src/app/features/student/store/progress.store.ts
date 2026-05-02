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
  type: 'lesson' | 'quiz' | 'milestone';
  targetId?: string;
}

export interface ContinueLesson {
  id: string;
  title: string;
  subject: string;
  progressPercent: number;
}

export interface UpcomingQuiz {
  id: string;
  title: string;
  subject: string;
  dueDate?: Date;
}

interface ProgressState {
  progressRecords: ProgressRecord[];
  skillLevels: Record<string, number>;
  streak: number;
  milestones: Milestone[];
  recentActivity: Activity[];
  longestStreak: number;
  continueLesson: ContinueLesson | null;
  upcomingQuizzes: UpcomingQuiz[];
  subjectProgress: { subject: string; percent: number }[];
  loading: boolean;
}

export const ProgressStore = signalStore(
  { providedIn: 'root' },
  withState<ProgressState>({
    progressRecords: [],
    skillLevels: { Math: 80, Science: 65, English: 90 },
    streak: 0,
    milestones: [{ title: 'First Lesson', earned: true }],
    recentActivity: [
      { id: 'a1', title: 'Completed Math Quiz', date: new Date(Date.now() - 3600000), type: 'quiz', targetId: 'q0' },
      { id: 'a2', title: 'Started Intro to Fractions', date: new Date(Date.now() - 86400000), type: 'lesson', targetId: '1' },
      { id: 'a3', title: 'Earned First Lesson Badge', date: new Date(Date.now() - 172800000), type: 'milestone' }
    ],
    longestStreak: 12,
    continueLesson: { id: '2', title: 'Adding Fractions', subject: 'Math', progressPercent: 50 },
    upcomingQuizzes: [
      { id: 'q1', title: 'Fractions Quiz', subject: 'Math', dueDate: new Date(Date.now() + 86400000) },
      { id: 'q2', title: 'Ecosystems Test', subject: 'Science' }
    ],
    subjectProgress: [
      { subject: 'Math', percent: 60 },
      { subject: 'Science', percent: 40 },
      { subject: 'English', percent: 80 }
    ],
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
