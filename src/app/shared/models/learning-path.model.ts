export interface PathLesson {
  id: string;
  title: string;
  subject: string;
  duration: string;
  status: 'LOCKED' | 'AVAILABLE' | 'COMPLETED';
  thumbnail?: string;
  prerequisiteTitle?: string;
  score?: number;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  totalLessons: number;
  estimatedTotalTime: string;
  lessons: PathLesson[];
}
