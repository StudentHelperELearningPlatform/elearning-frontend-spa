import { HttpClient } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import { QUIZ_API_URL } from '@core/tokens/api.token';
import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { type Quiz, type QuizResult, type QuizResultDetail } from '@shared/models/quiz.types';

interface QuizzesState {
  currentQuiz: Quiz | null;
  answers: Record<string, string | string[]>;
  loading: boolean;
  error: string | null;
  submitted: boolean;
  result: QuizResult | null;
  resultDetail: QuizResultDetail | null;
  resultDetailLoading: boolean;
  resultDetailError: string | null;
}

export const QuizzesStore = signalStore(
  { providedIn: 'root' },
  withState<QuizzesState>({
    currentQuiz: null,
    answers: {},
    loading: false,
    error: null,
    submitted: false,
    result: null,
    resultDetail: null,
    resultDetailLoading: false,
    resultDetailError: null,
  }),
  withComputed((state) => ({
    isAnswered: computed(() => (id: string) => !!state.answers()[id]),
    score: computed(() => state.result()?.score ?? 0),
  })),
  withMethods((store, http = inject(HttpClient), apiBase = inject(QUIZ_API_URL)) => ({
    loadQuiz(id: string) {
      patchState(store, { loading: true, error: null });
      http.get<Quiz>(`${apiBase}/quizzes/${id}`).subscribe({
        next: (quiz) => patchState(store, { currentQuiz: quiz, loading: false }),
        error: (err) => patchState(store, { loading: false, error: err.message }),
      });
    },
    setAnswer(id: string, answer: string | string[]) {
      patchState(store, (state) => ({ answers: { ...state.answers, [id]: answer } }));
    },
    submitQuiz() {
      const quiz = store.currentQuiz();
      if (!quiz) return;
      patchState(store, { loading: true });
      http.post<QuizResult>(`${apiBase}/quizzes/${quiz.id}/submit`, { answers: store.answers() }).subscribe({
        next: (result) => patchState(store, { result, loading: false, submitted: true }),
        error: (err) => patchState(store, { loading: false, error: err.message }),
      });
    },
    loadResultDetail(quizId: string, attemptId: string) {
      patchState(store, { resultDetailLoading: true });
      http.get<QuizResultDetail>(`${apiBase}/quizzes/${quizId}/attempts/${attemptId}`).subscribe({
        next: (detail) => patchState(store, { resultDetail: detail, resultDetailLoading: false }),
        error: (err) => patchState(store, { resultDetailError: err.message, resultDetailLoading: false }),
      });
    }
  }))
);