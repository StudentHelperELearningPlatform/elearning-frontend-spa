import { setupWorker } from 'msw/browser';
import { authHandlers } from './handlers/auth.handlers';
import { quizzesHandlers } from './handlers/quizzes.handlers';
import { learningPathHandlers } from './handlers/learning-path.handlers';
import { studentsHandlers } from './handlers/students.handlers';
import { studentLessonsHandlers } from './handlers/student-lessons.handlers';
import { teacherLessonEditorHandlers } from './handlers/teacher-lesson-editor.handlers';
import { teacherHandlers } from './handlers/teacher.handlers';
import { teacherProgressHandlers } from './handlers/teacher-progress.handlers';

export const worker = setupWorker(
  ...authHandlers,
  ...quizzesHandlers,
  ...learningPathHandlers,
  ...studentsHandlers,
  // INT-01: disable studentLessonsHandlers once GET /api/v1/lessons/:id
  // is confirmed live on staging.
  ...studentLessonsHandlers,
  ...teacherLessonEditorHandlers,
  ...teacherHandlers,
  // INT-03: MSW mocks for newly wired teacher progress endpoints must be disabled in this PR
  // ...teacherProgressHandlers,
);
