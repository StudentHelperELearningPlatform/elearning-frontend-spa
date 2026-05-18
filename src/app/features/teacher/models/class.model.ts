export interface TeacherClass {
  id: string;
  name: string;
  description?: string;
  studentCount: number;
  lessonCount: number;
  createdAt: string;
   code?: string;
   averageGrade?: number;
}