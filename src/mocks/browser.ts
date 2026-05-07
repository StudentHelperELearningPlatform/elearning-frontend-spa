import { setupWorker } from 'msw/browser';
import { authHandlers } from './handlers/auth.handlers';
import { quizzesHandlers } from './handlers/quizzes.handlers';
import { learningPathHandlers } from './handlers/learning-path.handlers';
import { studentsHandlers } from './handlers/students.handlers';
import { teacherLessonEditorHandlers } from './handlers/teacher-lesson-editor.handlers';
import { teacherHandlers } from './handlers/teacher.handlers';

export const worker = setupWorker(
  ...authHandlers,
  ...quizzesHandlers,
  ...learningPathHandlers,
  ...studentsHandlers,
  ...teacherLessonEditorHandlers,
  ...teacherHandlers,
);
