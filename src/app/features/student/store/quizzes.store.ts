import { HttpClient } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import { API_URL } from '@core/tokens/api.token';
import { 
  signalStore, 
  withState, 
  withMethods, 
  withComputed, 
  patchState 
} from '@ngrx/signals';

// Re-exporting types as requested by the develop branch
export {
  type Question,
  type Quiz,
  type QuizResult,
  type QuizResultDetail,
} from '@shared/models/quiz.types';

import {
  Quiz,
  QuizOption,
  QuizResult,
  QuizResultDetail,
} from '@shared/models/quiz.types';

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
    showResults: computed(() => !!state.result()),

    progress: computed(() => {
      const total = state.currentQuiz()?.questions?.length ?? 1;
      return Math.round((Object.keys(state.answers()).length / total) * 100);
    }),

    isLastQuestion: computed(() => {
      const total = state.currentQuiz()?.questions?.length ?? 0;
      return state.currentQuestionIndex() === total - 1;
    }),

    currentQuestion: computed(() => {
      const quiz = state.currentQuiz();
      return quiz?.questions?.[state.currentQuestionIndex()] ?? null;
    }),

    currentAnswerSelected: computed(() => {
      const quiz = state.currentQuiz();
      if (!quiz?.questions?.length) return null;

      const q = quiz.questions[state.currentQuestionIndex()];
      return q ? state.answers()[q.id] ?? null : null;
    }),

    score: computed(() => state.result()?.score ?? 0),
    totalPoints: computed(() => state.result()?.totalPoints ?? 0),
    timeSpent: computed(() => state.result()?.timeSpent ?? 0),
  })),

  withMethods((store, http = inject(HttpClient), apiBase = inject(API_URL)) => {

    const navigateTo = (index: number) => {
      const total = store.currentQuiz()?.questions?.length ?? 0;
      const safeIndex = Math.max(0, Math.min(index, total - 1));
      patchState(store, { currentQuestionIndex: safeIndex });
    };

    const submitQuizInternal = () => {
      if (store.submitted()) return;

      const quizId = store.currentQuiz()?.id;
      if (!quizId) return;

      const startedAt = store.startedAt();
      const timeSpent = startedAt
        ? Math.floor((Date.now() - startedAt.getTime()) / 1000)
        : 0;

      patchState(store, { submitted: true });

      http.post<SubmitQuizResponse>(
        `${apiBase}/quizzes/${quizId}/submit`,
        { answers: store.answers() }
      ).subscribe({
        next: (res) => {
          patchState(store, {
            result: {
              score: res.score,
              totalPoints: res.totalPoints,
              percentage: res.percentage,
              passed: res.passed,
              attemptId: res.attemptId,
              timeSpent: res.timeSpent ?? timeSpent,
            },
          });
        },
      });
    };

    const loadResultDetailInternal = (quizId: string, attemptId: string) => {
      patchState(store, {
        resultDetailLoading: true,
        resultDetailError: null,
      });

      http.get<QuizResultDetail>(
        `${apiBase}/quizzes/${quizId}/results/${attemptId}`
      ).subscribe({
        next: (data) => {
          patchState(store, {
            resultDetail: data,
            resultDetailLoading: false,
          });
        },
        error: () => {
          patchState(store, {
            resultDetailLoading: false,
            resultDetailError: 'Failed to load result detail',
          });
        },
      });
    };

    const clearResultDetailInternal = () => {
      patchState(store, {
        resultDetail: null,
        resultDetailLoading: false,
        resultDetailError: null,
      });
    };

    return {
      loadQuizById(id: string) {
        patchState(store, { loading: true });
 
        http.get<QuizApiResponse>(`${apiBase}/quizzes/${id}`).subscribe({
          next: (quiz) => {
            patchState(store, {
              loading: false,
              currentQuiz: mapQuizResponse(quiz),
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
 
        http.get<QuizApiResponse>(`${apiBase}/quizzes/${id}`).subscribe({
          next: (quiz) => {
            const mapped = mapQuizResponse(quiz);

            patchState(store, {
              loading: false,
              currentQuiz: mapped,
              currentQuestionIndex: 0,
              answers: {},
              flaggedQuestions: new Set<string>(),
              startedAt: new Date(),
              timeRemaining: mapped.timeLimitSeconds ?? null,
              submitted: false,
              result: null,
            });
          },
          error: () => patchState(store, { loading: false }),
        });
      },

      answerQuestion(id: string, answer: string) {
        patchState(store, (s) => ({
          answers: { ...s.answers, [id]: answer },
        }));
      },

      flagQuestion(id: string) {
        patchState(store, (s) => {
          const set = new Set(s.flaggedQuestions);
          if (set.has(id)) {
            set.delete(id);
          } else {
            set.add(id);
          }
          return { flaggedQuestions: set };
        });
      },

      navigateTo,
      nextQuestion: () => navigateTo(store.currentQuestionIndex() + 1),
      prevQuestion: () => navigateTo(store.currentQuestionIndex() - 1),

      submitQuiz: submitQuizInternal,

      tickTimer() {
        const remaining = store.timeRemaining();
        if (remaining === null) return;

        const next = remaining - 1;
        patchState(store, { timeRemaining: next });

        if (next <= 0 && !store.submitted()) {
          submitQuizInternal();
        }
      },

      loadResultDetail: loadResultDetailInternal,
      clearResultDetail: clearResultDetailInternal,

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

      isAnswered(id: string) {
        return !!store.answers()[id];
      },

      isFlagged(id: string) {
        return store.flaggedQuestions().has(id);
      },
    };
  })
);