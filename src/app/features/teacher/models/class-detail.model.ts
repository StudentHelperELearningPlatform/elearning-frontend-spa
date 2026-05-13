import { TeacherClass } from './class.model';

export interface ClassStudent {
  id: string;
  name: string;
  email: string;
}

export interface ClassLesson {
  id: string;
  title: string;
}

export interface TeacherClassDetail extends TeacherClass {
  students: ClassStudent[];
  lessons: ClassLesson[];
}