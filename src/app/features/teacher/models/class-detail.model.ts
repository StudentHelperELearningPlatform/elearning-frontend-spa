import { TeacherClass } from './class.model';

export interface ClassStudent {
  id: string;
  userId?: string;
  studentId?: string;
  name: string;
  email: string;
   grade?: number;
}

export interface ClassLesson {
  id: string;
  title: string;
}

export interface TeacherClassDetail extends TeacherClass {
  students: ClassStudent[];
  lessons: ClassLesson[];
}