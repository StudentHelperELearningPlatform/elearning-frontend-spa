import { HttpClient } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { Question, Quiz, QuizOption, QuizResult } from '@shared/models/quiz.types';

export type { Question, Quiz, QuizResult };

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
  if (question.type === 'SHORT_ANSWER') {
    return [];
  }

  if (question.type === 'TRUE_FALSE') {
    const trueFalseOptions = question.options ?? ['True', 'False'];
    return trueFalseOptions.map((text) => ({
      id: text.toLowerCase(),
      text,
    }));
  }

  const options = question.options ?? [];
  return options.map((text, index) => ({
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
  questions: response.questions.map((question) => ({
    id: question.id,
    type: question.type,
    text: question.text,
    points: question.points,
    options: mapQuestionOptions(question),
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
    loading: false
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
      return state.currentQuestionIndex() === (total - 1);
    }),
    currentQuestion: computed(() => {
      const quiz = state.currentQuiz();
      if (!quiz || !quiz.questions) return null;
      return quiz.questions[state.currentQuestionIndex()];
    }),
    currentAnswerSelected: computed(() => {
      const quiz = state.currentQuiz();
      if (!quiz || !quiz.questions?.length) return null;
      const question = quiz.questions[state.currentQuestionIndex()];
      if (!question) return null;
      return state.answers()[question.id] ?? null;
    }),
    showResults: computed(() => state.submitted()),
    score: computed(() => state.result()?.score || 0),
    totalPoints: computed(() => state.result()?.totalPoints || 0),
    timeSpent: computed(() => state.result()?.timeSpent || 0)
  })),
  withMethods((store, http = inject(HttpClient), router = inject(Router)) => {
    const navigateToIndex = (index: number) => {
      const total = store.currentQuiz()?.questions?.length ?? 0;
      if (total === 0) {
        patchState(store, { currentQuestionIndex: 0 });
        return;
      }

      const boundedIndex = Math.max(0, Math.min(index, total - 1));
      patchState(store, { currentQuestionIndex: boundedIndex });
    };

    const submitQuizInternal = () => {
      const state = store;
      const timeSpent = state.startedAt()
        ? Math.floor((new Date().getTime() - state.startedAt()!.getTime()) / 1000)
        : 0;

      const answers = state.answers();
      const quizId = state.currentQuiz()?.id;
      if (!quizId) {
        return;
      }

      http.post<SubmitQuizResponse>(`/api/quizzes/${quizId}/submit`, { answers }).subscribe({
        next: (submission) => {
          patchState(store, {
            submitted: true,
            result: {
              score: submission.score,
              totalPoints: submission.totalPoints,
              timeSpent: submission.timeSpent || timeSpent,
              percentage: submission.percentage,
              passed: submission.passed,
              attemptId: submission.attemptId,
            },
          });

        },
      });
    };

    return {
    loadQuizById(id: string) {
      patchState(store, { loading: true });
      http.get<QuizApiResponse>(`/api/quizzes/${id}`).subscribe({
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
        error: () => {
          patchState(store, { loading: false });
        },
      });
    },
    startQuiz(id: string) {
      patchState(store, { loading: true });
      http.get<QuizApiResponse>(`/api/quizzes/${id}`).subscribe({
        next: (quiz) => {
          const mappedQuiz = mapQuizResponse(quiz);
          patchState(store, {
            loading: false,
            currentQuiz: mappedQuiz,
            currentQuestionIndex: 0,
            answers: {},
            flaggedQuestions: new Set<string>(),
            startedAt: new Date(),
            timeRemaining: mappedQuiz.timeLimitSeconds ?? null,
            submitted: false,
            result: null,
          });
        },
        error: () => {
          patchState(store, { loading: false });
        },
      });
    },
    answerQuestion(questionId: string, answer: string) {
      patchState(store, (state) => ({
        answers: { ...state.answers, [questionId]: answer }
      }));
    },
    flagQuestion(questionId: string) {
      patchState(store, (state) => {
        const nextFlags = new Set(state.flaggedQuestions);
        if (nextFlags.has(questionId)) {
          nextFlags.delete(questionId);
        } else {
          nextFlags.add(questionId);
        }

        return {
          flaggedQuestions: nextFlags,
        };
      });
    },
    navigateTo(index: number) {
      navigateToIndex(index);
    },
    nextQuestion() {
      navigateToIndex(store.currentQuestionIndex() + 1);
    },
    prevQuestion() {
      navigateToIndex(store.currentQuestionIndex() - 1);
    },
    previousQuestion() {
      navigateToIndex(store.currentQuestionIndex() - 1);
    },
    submitQuiz() {
      submitQuizInternal();
    },
    tickTimer(this: { submitQuiz: () => void }) {
      const remaining = store.timeRemaining();
      if (remaining === null) {
        return;
      }

      if (remaining > 0) {
        const nextValue = remaining - 1;
        patchState(store, { timeRemaining: nextValue });
        if (nextValue === 0 && !store.submitted()) {
          this.submitQuiz();
        }
        return;
      }

      if (remaining === 0 && !store.submitted()) {
        this.submitQuiz();
      }
    },
    isAnswered(questionId: string | null | undefined) {
      return computed(() => {
        if (!questionId) {
          return false;
        }
        return Object.prototype.hasOwnProperty.call(store.answers(), questionId);
      });
    },
    isFlagged(questionId: string | null | undefined) {
      return computed(() => {
        if (!questionId) {
          return false;
        }
        return store.flaggedQuestions().has(questionId);
      });
    },
    resetQuiz() {
      patchState(store, {
        currentQuestionIndex: 0,
        answers: {},
        flaggedQuestions: new Set<string>(),
        startedAt: new Date(),
        timeRemaining: store.currentQuiz()?.timeLimitSeconds ?? null,
        submitted: false,
        result: null
      });
    }
  };
  })
);
