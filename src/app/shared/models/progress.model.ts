// src/app/shared/models/progress.model.ts

export interface ProgressRecord {
  id: string;
  lessonId: string;
  lessonTitle: string;
  subject: string;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
  completedModules: number;
  totalModules: number;
  lastAccessedAt: string; // ISO date string
  thumbnailGradient?: string;
}

export interface SkillLevel {
  subject: string;
  level: number; // 0-100
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string; // ISO date string
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  category: 'learning' | 'streak' | 'mastery' | 'social';
  icon: string; // PrimeIcon class e.g. 'pi-star'
  earnedAt: string | null; // ISO date or null if locked
  progress?: number;
  goal?: number;
}

export interface ActivityItem {
  id: string;
  type: 'lesson' | 'quiz' | 'milestone';
  title: string;
  subject?: string;
  timestamp: string; // ISO date string
  lessonId?: string;
  quizId?: string;
  attemptId?: string;
}

export interface UpcomingQuiz {
  id: string;
  title: string;
  subject: string;
  dueDate?: string;
}

export interface DashboardData {
  student: {
    id: string;
    firstName: string;
    totalLessons: number;
    completedLessons: number;
  };
  streak: StreakData;
  skillLevels: SkillLevel[];
  progressRecords: ProgressRecord[];
  recentActivity: ActivityItem[];
  milestones: Milestone[];
  upcomingQuizzes: UpcomingQuiz[];
}
