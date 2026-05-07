import { HttpClient } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';

import {
  Quiz,
  QuizOption,
  QuizResult,
  QuizResultDetail,
} from '@shared/models/quiz.types';

const API = '/api/v1';

type QuestionType = 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'SHORT_ANSWER';

interface QuizApiQuestion {
  id: string;
  type: QuestionType;
  text: string;
  options?: string[];
  points: number;
}

interface QuizApiResponse {
  id: string;
  title: string;
  subject: string;
  timeLimitSeconds?: number | null;
  questions: QuizApiQuestion[];
}

interface SubmitQuizResponse {
  attemptId: string;
  score: number;
  totalPoints: number;
  percentage: number;
  passed: boolean;
  timeSpent?: number;
}

type QuizWithMeta = Quiz & {
  subject?: string;
  timeLimitSeconds?: number | null;
};

type QuizResultWithMeta = QuizResult & {
  attemptId?: string;
  passed?: boolean;
};

const mapQuestionOptions = (question: QuizApiQuestion): QuizOption[] => {
  if (question.type === 'SHORT_ANSWER') return [];

  if (question.type === 'TRUE_FALSE') {
    const opts = question.options ?? ['True', 'False'];
    return opts.map((text) => ({
      id: text.toLowerCase(),
      text,
    }));
  }

  return (question.options ?? []).map((text, index) => ({
    id: `${question.id}-o${index + 1}`,
    text,
  }));
};

const mapQuizResponse = (response: QuizApiResponse): QuizWithMeta => ({
  id: response.id,
  title: response.title,
  subject: response.subject,
  timeLimit: response.timeLimitSeconds ?? 0,
  timeLimitSeconds: response.timeLimitSeconds ?? null,
  questions: response.questions.map((q) => ({
    id: q.id,
    type: q.type,
    text: q.text,
    points: q.points,
    options: mapQuestionOptions(q),
  })),
});

interface QuizzesState {
  currentQuiz: QuizWithMeta | null;
  currentQuestionIndex: number;
  answers: Record<string, string>;
  flaggedQuestions: Set<string>;
  startedAt: Date | null;
  timeRemaining: number | null;
  submitted: boolean;
  result: QuizResultWithMeta | null;
  loading: boolean;
  resultDetail: QuizResultDetail | null;
  resultDetailLoading: boolean;
  resultDetailError: string | null;
}

export const QuizzesStore = signalStore(
  { providedIn: 'root' },

  withState<QuizzesState>({
    currentQuiz: null,
    currentQuestionIndex: 0,
    answers: {},
    flaggedQuestions: new Set<string>(),
    startedAt: null,
    timeRemaining: null,
    submitted: false,
    result: null,
    loading: false,
    resultDetail: null,
    resultDetailLoading: false,
    resultDetailError: null,
  }),

  withComputed((state) => ({
    answeredCount: computed(() => Object.keys(state.answers()).length),
    flaggedCount: computed(() => state.flaggedQuestions().size),
    canSubmit: computed(() => Object.keys(state.answers()).length > 0),
    started: computed(() => state.startedAt() !== null),

    progress: computed(() => {
      const total = state.currentQuiz()?.questions?.length || 1;
      return Math.round((Object.keys(state.answers()).length / total) * 100);
    }),

    isLastQuestion: computed(() => {
      const total = state.currentQuiz()?.questions?.length || 0;
      return state.currentQuestionIndex() === total - 1;
    }),

    currentQuestion: computed(() => {
      const quiz = state.currentQuiz();
      if (!quiz) return null;
      return quiz.questions[state.currentQuestionIndex()];
    }),

    currentAnswerSelected: computed(() => {
      const quiz = state.currentQuiz();
      if (!quiz?.questions?.length) return null;

      const q = quiz.questions[state.currentQuestionIndex()];
      return state.answers()[q.id] ?? null;
    }),

    showResults: computed(() => state.submitted()),
    score: computed(() => state.result()?.score || 0),
    totalPoints: computed(() => state.result()?.totalPoints || 0),
    timeSpent: computed(() => state.result()?.timeSpent || 0),
  })),

  withMethods((store, http = inject(HttpClient)) => {

    const navigateTo = (index: number) => {
      const total = store.currentQuiz()?.questions?.length ?? 0;
      const safe = Math.max(0, Math.min(index, total - 1));
      patchState(store, { currentQuestionIndex: safe });
    };

    const submitInternal = () => {
      if (store.submitted()) return;

      const quizId = store.currentQuiz()?.id;
      if (!quizId) return;

      const timeSpent = store.startedAt()
        ? Math.floor((Date.now() - store.startedAt()!.getTime()) / 1000)
        : 0;

      const answers = store.answers();

      patchState(store, { submitted: true });

      http.post<SubmitQuizResponse>(`${API}/quizzes/${quizId}/submit`, { answers })
        .subscribe({
          next: (res) => {
            patchState(store, {
              result: {
                score: res.score,
                totalPoints: res.totalPoints,
                percentage: res.percentage,
                passed: res.passed,
                timeSpent: res.timeSpent ?? timeSpent,
                attemptId: res.attemptId,
              },
            });
          },
          error: () => {
            const totalPoints =
              store.currentQuiz()?.questions?.reduce((s, q) => s + (q.points || 10), 0) ?? 0;

            patchState(store, {
              result: {
                score: 0,
                totalPoints,
                percentage: 0,
                passed: false,
                timeSpent,
                attemptId: `attempt-${Date.now()}`,
              },
            });
          },
        });
    };

    return {
      loadQuizById(id: string) {
        patchState(store, { loading: true });

        http.get<QuizApiResponse>(`${API}/quizzes/${id}`)
          .subscribe({
            next: (data) => {
              patchState(store, {
                loading: false,
                currentQuiz: mapQuizResponse(data),
                currentQuestionIndex: 0,
                answers: {},
                flaggedQuestions: new Set<string>(),
                submitted: false,
                result: null,
              });
            },
            error: () => patchState(store, { loading: false }),
          });
      },

      startQuiz(id: string) {
        patchState(store, { loading: true });

        http.get<QuizApiResponse>(`${API}/quizzes/${id}`)
          .subscribe({
            next: (data) => {
              const quiz = mapQuizResponse(data);

              patchState(store, {
                loading: false,
                currentQuiz: quiz,
                currentQuestionIndex: 0,
                answers: {},
                flaggedQuestions: new Set<string>(),
                startedAt: new Date(),
                timeRemaining: quiz.timeLimitSeconds ?? null,
                submitted: false,
                result: null,
              });
            },
            error: () => patchState(store, { loading: false }),
          });
      },

      answerQuestion(questionId: string, answer: string) {
        patchState(store, (s) => ({
          answers: { ...s.answers, [questionId]: answer },
        }));
      },

      flagQuestion(questionId: string) {
        patchState(store, (s) => {
          const set = new Set(s.flaggedQuestions);
          set.has(questionId) ? set.delete(questionId) : set.add(questionId);
          return { flaggedQuestions: set };
        });
      },

      nextQuestion: () => navigateTo(store.currentQuestionIndex() + 1),
      prevQuestion: () => navigateTo(store.currentQuestionIndex() - 1),
      navigateTo,

      submitQuiz: submitInternal,

      tickTimer(this: { submitQuiz: () => void }) {
        const remaining = store.timeRemaining();
        if (remaining === null) return;

        if (remaining > 0) {
          const next = remaining - 1;
          patchState(store, { timeRemaining: next });

          if (next === 0 && !store.submitted()) {
            this.submitQuiz();
          }
        }
      },

      loadResultDetail(quizId: string, attemptId: string) {
        patchState(store, { resultDetailLoading: true });

        http.get<QuizResultDetail>(`${API}/quizzes/${quizId}/results/${attemptId}`)
          .subscribe({
            next: (data) => {
              patchState(store, {
                resultDetail: data,
                resultDetailLoading: false,
                resultDetailError: null,
              });
            },
            error: () => {
              patchState(store, {
                resultDetail: null,
                resultDetailLoading: false,
                resultDetailError: 'Unable to load quiz results.',
              });
            },
          });
      },

      clearResultDetail() {
        patchState(store, {
          resultDetail: null,
          resultDetailLoading: false,
          resultDetailError: null,
        });
      },

      resetQuiz() {
        patchState(store, {
          currentQuestionIndex: 0,
          answers: {},
          flaggedQuestions: new Set<string>(),
          startedAt: null,
          timeRemaining: null,
          submitted: false,
          result: null,
        });
      },

      // ✅ FIX pentru erorile tale din component
      isAnswered(questionId: string): boolean {
        return !!store.answers()[questionId];
      },

      isFlagged(questionId: string): boolean {
        return store.flaggedQuestions().has(questionId);
      },
    };
  })
);