export interface LearningPathLesson {
  id: string;
  title: string;
  prerequisites: string[];
}

export interface LearningPath {
  id?: string;
  name: string;
  description?: string;
  lessons: LearningPathLesson[];
  status: 'draft' | 'published';
}