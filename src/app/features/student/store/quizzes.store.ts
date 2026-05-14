import { HttpClient } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import { QUIZ_API_URL } from '@core/tokens/api.token';
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


interface QuizApiQuestion {
  id: string;
  questionType: 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'SHORT_ANSWER';
  questionText: string;
  options?: { id: string; text: string; isCorrect: boolean }[];
  orderIndex: number;
}

interface QuizApiResponse {
  id: string;
  questions: QuizApiQuestion[];
  passThreshold?: number;
  mandatory?: boolean;
  maxAttempts?: number;
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
  if (question.questionType === 'SHORT_ANSWER') return [];

  if (question.questionType === 'TRUE_FALSE') {
    // For TRUE_FALSE, we expect the options to be either provided by backend or default to True/False
    const opts = (question.options ?? []).map(o => o.text);
    const displayOpts = opts.length > 0 ? opts : ['True', 'False'];
    return displayOpts.map((text) => ({
      id: text.toLowerCase(),
      text,
    }));
  }

  return (question.options ?? []).map((opt) => ({
    id: opt.id,
    text: opt.text,
  }));
};

const mapQuizResponse = (response: QuizApiResponse, title = 'Quiz', subject = ''): QuizWithMeta => ({
  id: response.id,
  title,
  subject,
  timeLimit: 0,
  timeLimitSeconds: null,
  questions: response.questions.map((q) => ({
    id: q.id,
    type: q.questionType,
    text: q.questionText,
    points: 1, // Default points if not in DTO
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
  error: string | null;
  /** AI explanations keyed by lessonId+attemptId */
  aiExplanations: Record<string, string> | null;
  aiExplainLoading: boolean;
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
    error: null,
    aiExplanations: null,
    aiExplainLoading: false,
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

  withMethods((store, http = inject(HttpClient), apiBase = inject(QUIZ_API_URL)) => {

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

      // Note: Generic quiz submission is deprecated in backend. 
      // This should ideally call submitCheckQuiz or submitFinalQuiz.
      // We fall back to lessons final-quiz if unsure.
      http.post<SubmitQuizResponse>(
        `${apiBase}/lessons/${quizId}/final-quiz/submit`,
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

      // Try lesson results first as it's the most common
      http.get<QuizResultDetail>(
        `${apiBase}/lessons/${quizId}/final-quiz/results/${attemptId}`
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
 
        // Default to loading as a final quiz for now
        http.get<QuizApiResponse>(`${apiBase}/lessons/${id}/final-quiz`).subscribe({
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
 
        http.get<QuizApiResponse>(`${apiBase}/lessons/${id}/final-quiz`).subscribe({
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

      submitCheckQuiz(subcapitolId: string) {
        if (store.submitted()) return;
        patchState(store, { submitted: true, error: null });

        http.post<SubmitQuizResponse>(
          `${apiBase}/subcapitols/${subcapitolId}/check-quiz/submit`,
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
                timeSpent: 0,
              },
            });
          },
          error: (err) => {
            console.error('[QuizzesStore] Failed to submit check quiz:', err);
            patchState(store, { error: err.message || 'Failed to submit quiz' });
          }
        });
      },

      loadFinalQuiz(lessonId: string) {
        patchState(store, { loading: true, error: null });
        http.get<QuizApiResponse>(`${apiBase}/lessons/${lessonId}/final-quiz`).subscribe({
          next: (quiz) => {
            patchState(store, {
              loading: false,
              currentQuiz: mapQuizResponse(quiz, 'Final Quiz'),
              currentQuestionIndex: 0,
              answers: {},
              flaggedQuestions: new Set<string>(),
              submitted: false,
              result: null,
            });
          },
          error: (err) => {
            console.error('[QuizzesStore] Failed to load final quiz:', err);
            patchState(store, { 
              loading: false, 
              error: (err as { message?: string })?.message || 'Failed to load quiz' 
            });
          },
        });
      },

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
          aiExplanations: null,
          aiExplainLoading: false,
        });
      },

      /**
       * Submit the final quiz for a lesson.
       * Endpoint: POST /api/v1/lessons/{lessonId}/final-quiz/submit
       * This is the primary submission path for S6-final-quiz-ui.
       */
      submitFinalQuiz(lessonId: string) {
        if (store.submitted()) return;

        const startedAt = store.startedAt();
        const timeSpent = startedAt
          ? Math.floor((Date.now() - startedAt.getTime()) / 1000)
          : 0;

        patchState(store, { submitted: true, error: null });

        http.post<SubmitQuizResponse>(
          `${apiBase}/lessons/${lessonId}/final-quiz/submit`,
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
          error: (err) => {
            console.error('[QuizzesStore] Failed to submit final quiz:', err);
            patchState(store, {
              submitted: false,
              error: (err as { message?: string })?.message || 'Failed to submit quiz',
            });
          },
        });
      },

      /**
       * Request AI explanations for wrong answers after final quiz submission.
       * Endpoint: POST /api/v1/lessons/{lessonId}/final-quiz/explain
       */
      explainFinalQuizMistakes(lessonId: string) {
        patchState(store, { aiExplainLoading: true });
        http.post<Record<string, string>>(
          `${apiBase}/lessons/${lessonId}/final-quiz/explain`,
          { answers: store.answers() }
        ).subscribe({
          next: (explanations) => {
            patchState(store, { aiExplanations: explanations, aiExplainLoading: false });
          },
          error: () => {
            // Non-blocking — don't show error, just clear loading
            patchState(store, { aiExplainLoading: false });
          },
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