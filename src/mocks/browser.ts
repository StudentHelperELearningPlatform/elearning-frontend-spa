import { setupWorker } from 'msw/browser';
import { authHandlers } from './handlers/auth.handlers';
import { quizzesHandlers } from './handlers/quizzes.handlers';
import { learningPathHandlers } from './handlers/learning-path.handlers';
import { studentsHandlers } from './handlers/students.handlers';

export const worker = setupWorker(
  ...quizzesHandlers,
  ...learningPathHandlers,
  ...studentsHandlers,
);
