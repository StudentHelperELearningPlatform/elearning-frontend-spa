// src/app/shared/models/progress.model.ts

export interface ProgressRecord {
  id: string;
  lessonId: string;
  lessonTitle: string;
  subject: string;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
  completedModules: number;
  totalModules: number;
  lastAccessedAt: string;
  thumbnailGradient?: string;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  category: 'learning' | 'streak' | 'mastery' | 'social';
  icon: string;
  earnedAt: string | null;
  progress?: number;
  goal?: number;
}

export interface ActivityItem {
  id: string;
  type: 'lesson' | 'quiz' | 'milestone';
  title: string;
  subject?: string;
  timestamp: string;
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

export interface SkillLevel {
  subject: string;
  level: number;
}

export interface StudentSummary {
  id: string;
  firstName: string;
  totalLessons: number;
  completedLessons: number;
}

export interface DashboardData {
  student: StudentSummary;
  streak: StreakData;
  skillLevels: SkillLevel[];
  progressRecords: ProgressRecord[];
  recentActivity: ActivityItem[];
  milestones: Milestone[];
  upcomingQuizzes: UpcomingQuiz[];
}