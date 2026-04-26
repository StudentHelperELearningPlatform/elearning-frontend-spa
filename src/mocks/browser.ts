import { setupWorker } from 'msw/browser';
import { authHandlers } from './handlers/auth.handlers';
import { quizzesHandlers } from './handlers/quizzes.handlers';

export const worker = setupWorker(...authHandlers, ...quizzesHandlers);
