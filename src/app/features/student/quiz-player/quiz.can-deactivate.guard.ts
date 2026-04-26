import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { QuizzesStore } from '../store/quizzes.store';
import { QuizPlayerComponent } from './quiz-player.component';

export const quizCanDeactivate: CanDeactivateFn<QuizPlayerComponent> = () => {
  const store = inject(QuizzesStore);
  if (store.started?.() && !store.submitted()) {
    return window.confirm('You have unsaved quiz progress. Leave anyway?');
  }
  return true;
};
