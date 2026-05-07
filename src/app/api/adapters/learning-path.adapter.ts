export type BackendLessonStatus = 'LOCKED' | 'locked' | 'AVAILABLE' | 'available' | 'COMPLETED' | 'completed' | 'IN_PROGRESS' | 'in_progress';

export interface BackendLesson {
  id: string | number;
  title: string;
  subject?: string;
  duration?: string;
  status: BackendLessonStatus;
  thumbnail?: string;
  prerequisiteTitle?: string;
  score?: number | null;
  quizScore?: number | null;
}

export interface BackendLearningPath {
  id: string | number;
  title: string;
  description?: string;
  totalLessons?: number;
  estimatedTotalTime?: string;
  lessons: BackendLesson[];
}

export type LessonStatus = 'LOCKED' | 'AVAILABLE' | 'COMPLETED';

export interface PathLessonViewModel {
  id: string;
  title: string;
  subject: string;
  duration: string;
  status: LessonStatus;
  thumbnail?: string;
  prerequisiteTitle?: string;
  score?: number;
}

export interface LearningPathViewModel {
  id: string;
  title: string;
  description: string;
  totalLessons: number;
  estimatedTotalTime: string;
  lessons: PathLessonViewModel[];
}

export function normaliseLessonStatus(raw: BackendLessonStatus): LessonStatus {
  switch (raw?.toUpperCase()) {
    case 'COMPLETED': return 'COMPLETED';
    case 'AVAILABLE':
    case 'IN_PROGRESS': return 'AVAILABLE';
    case 'LOCKED':
    default: return 'LOCKED';
  }
}

export function resolveScore(lesson: Pick<BackendLesson, 'score' | 'quizScore' | 'status'>): number | undefined {
  const status = normaliseLessonStatus(lesson.status);
  if (status !== 'COMPLETED') return undefined;

  const raw = lesson.score ?? lesson.quizScore;
  if (raw === null || raw === undefined) return undefined;

  return Math.round(Math.min(100, Math.max(0, raw)));
}

export function mapLearningPathResponse(backend: BackendLearningPath): LearningPathViewModel {
  const lessons: PathLessonViewModel[] = (backend.lessons ?? []).map((lesson): PathLessonViewModel => {
    const status = normaliseLessonStatus(lesson.status);
    const mapped: PathLessonViewModel = {
      id: String(lesson.id),
      title: lesson.title ?? '',
      subject: lesson.subject ?? '',
      duration: lesson.duration ?? '',
      status,
    };

    if (lesson.thumbnail) mapped.thumbnail = lesson.thumbnail;
    if (lesson.prerequisiteTitle) mapped.prerequisiteTitle = lesson.prerequisiteTitle;
    
    const score = resolveScore(lesson);
    if (score !== undefined) mapped.score = score;

    return mapped;
  });

  return {
    id: String(backend.id),
    title: backend.title ?? '',
    description: backend.description ?? '',
    totalLessons: backend.totalLessons ?? lessons.length,
    estimatedTotalTime: backend.estimatedTotalTime ?? '',
    lessons,
  };
}