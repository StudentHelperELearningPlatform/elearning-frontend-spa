import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, provideRouter, RouterStateSnapshot } from '@angular/router';
import { patchState } from '@ngrx/signals';
import { QuizzesStore } from '../store/quizzes.store';
import { quizCanDeactivate } from './quiz.can-deactivate.guard';
import { QuizPlayerComponent } from './quiz-player.component';
import { provideApiMocks } from '../../../../test-utils/api-testing';

describe('quizCanDeactivate', () => {
  const runGuard = () =>
    TestBed.runInInjectionContext(() =>
      quizCanDeactivate(
        {} as QuizPlayerComponent,
        {} as ActivatedRouteSnapshot,
        {} as RouterStateSnapshot,
        {} as RouterStateSnapshot,
      ),
    );

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideApiMocks(),
      ],
    });

    const store = TestBed.inject(QuizzesStore);
    patchState(store, {
      currentQuiz: null,
      currentQuestionIndex: 0,
      answers: {},
      flaggedQuestions: new Set<string>(),
      startedAt: null,
      timeRemaining: null,
      submitted: false,
      result: null,
      loading: false,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns true when quiz is already submitted', () => {
    const store = TestBed.inject(QuizzesStore);
    patchState(store, { startedAt: new Date(), submitted: true });

    const result = runGuard();

    expect(result).toBe(true);
  });

  it('calls window.confirm and returns false when user cancels', () => {
    const store = TestBed.inject(QuizzesStore);
    patchState(store, { startedAt: new Date(), submitted: false });
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(false);

    const result = runGuard();

    expect(confirmSpy).toHaveBeenCalledWith('You have unsaved quiz progress. Leave anyway?');
    expect(result).toBe(false);
  });

  it('returns true when user confirms leave', () => {
    const store = TestBed.inject(QuizzesStore);
    patchState(store, { startedAt: new Date(), submitted: false });
    vi.spyOn(window, 'confirm').mockReturnValue(true);

    const result = runGuard();

    expect(result).toBe(true);
  });
});
