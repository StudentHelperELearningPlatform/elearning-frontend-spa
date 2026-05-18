import { HttpClient } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { QUIZ_API_URL } from '@core/tokens/api.token';
export {
  type Question,
  type Quiz,
  type QuizResult,
  type QuizResultDetail,
} from '@shared/models/quiz.types';
import { Quiz, QuizOption, QuizResult, QuizResultDetail } from '@shared/models/quiz.types';

type QuestionType = 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'SHORT_ANSWER';

interface QuizApiQuestionOption {
  id: string;
  text: string;
  isCorrect?: boolean;
  optionText?: string;
}

interface QuizApiQuestion {
  id: string;
  type?: QuestionType;
  questionType?: QuestionType;
  text?: string;
  questionText?: string;
  options?: (string | QuizApiQuestionOption)[];
  points?: number;
}

interface QuizApiResponse {
  id: string;
  title?: string;
  subject?: string;
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
  const qType = question.questionType || question.type;
  if (qType === 'SHORT_ANSWER') {
    return [];
  }

  const opts = question.options;
  if (opts && opts.length > 0 && typeof opts[0] === 'object') {
    return (opts as QuizApiQuestionOption[]).map((opt) => ({
      id: opt.id,
      text: opt.text || opt.optionText || '',
    }));
  }

  if (qType === 'TRUE_FALSE') {
    const trueFalseOptions = (opts as string[]) ?? ['True', 'False'];
    return trueFalseOptions.map((text) => ({
      id: text.toLowerCase(),
      text,
    }));
  }

  const stringOptions = (opts as string[]) ?? [];
  return stringOptions.map((text, index) => ({
    id: `${question.id}-o${index + 1}`,
    text,
  }));
};

const mapQuizResponse = (response: QuizApiResponse): QuizWithMeta => ({
  id: response.id,
  title: response.title || 'Lesson Final Quiz',
  subject: response.subject || 'General',
  timeLimit: response.timeLimitSeconds ?? 0,
  timeLimitSeconds: response.timeLimitSeconds ?? null,
  questions: (response.questions || []).map((question) => ({
    id: question.id,
    type: question.questionType || question.type || 'MULTIPLE_CHOICE',
    text: question.questionText || question.text || '',
    points: question.points || 10,
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
  error: string | null;
  resultDetail: QuizResultDetail | null;
  resultDetailLoading: boolean;
  resultDetailError: string | null;
}

const getInitialQuizState = (quiz: QuizWithMeta | null, isStart: boolean) => ({
  currentQuestionIndex: 0,
  answers: {},
  flaggedQuestions: new Set<string>(),
  startedAt: isStart ? new Date() : null,
  timeRemaining: isStart ? (quiz?.timeLimitSeconds ?? null) : null,
  submitted: false,
  result: null,
  error: null,
});

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
    error: null,
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
    timeSpent: computed(() => state.result()?.timeSpent || 0),
  })),
  withMethods((store, http = inject(HttpClient), quizApi = inject(QUIZ_API_URL)) => {
    const navigateToIndex = (index: number) => {
      const total = store.currentQuiz()?.questions?.length ?? 0;
      if (total === 0) {
        patchState(store, { currentQuestionIndex: 0 });
        return;
      }
      const boundedIndex = Math.max(0, Math.min(index, total - 1));
      patchState(store, { currentQuestionIndex: boundedIndex });
    };

    const fetchQuiz = (id: string, isStart: boolean) => {
      patchState(store, { loading: true, error: null });

      const quiz$ = http.get<QuizApiResponse>(`${quizApi}/lessons/${id}/final-quiz`);

      const questions$ = http.get<QuizApiQuestion[]>(`${quizApi}/lessons/${id}/final-quiz/questions`).pipe(
        catchError(() => of([] as QuizApiQuestion[]))
      );

      forkJoin([quiz$, questions$]).subscribe({
        next: ([quizRes, questionsRes]) => {
          const combinedQuestions = questionsRes && Array.isArray(questionsRes) && questionsRes.length > 0
            ? questionsRes
            : (quizRes.questions || []);

          const mappedQuiz = mapQuizResponse({
            ...quizRes,
            questions: combinedQuestions,
          });

          patchState(store, {
            loading: false,
            currentQuiz: mappedQuiz,
            ...getInitialQuizState(mappedQuiz, isStart),
          });
        },
        error: (err: unknown) => {
          const message = err instanceof Error ? err.message : 'Failed to load quiz';
          patchState(store, { loading: false, error: message });
        },
      });
    };

    const submitQuizInternal = () => {
      if (store.submitted()) {
        return;
      }

      const timeSpent = store.startedAt()
        ? Math.floor((new Date().getTime() - store.startedAt()!.getTime()) / 1000)
        : 0;

      const answersDict = store.answers();
      const answersArray = Object.entries(answersDict).map(([questionId, answer]) => ({
        questionId,
        answer,
      }));
      const quizId = store.currentQuiz()?.id;
      if (!quizId) {
        return;
      }

      patchState(store, { submitted: true });

      http.post<SubmitQuizResponse>(`${quizApi}/lessons/${quizId}/final-quiz/submit`, { answers: answersArray }).subscribe({
        next: (submission) => {
          patchState(store, {
            result: {
              score: submission.score,
              totalPoints: submission.totalPoints,
              timeSpent: submission.timeSpent ?? timeSpent,
              percentage: submission.percentage,
              passed: submission.passed,
              attemptId: submission.attemptId,
            },
          });
        },
        error: () => {
          const questions = store.currentQuiz()?.questions ?? [];
          const totalPoints = questions.reduce((sum, q) => sum + (q.points || 10), 0);
          patchState(store, {
            result: {
              score: 0,
              totalPoints,
              timeSpent,
              percentage: 0,
              passed: false,
              attemptId: `attempt-${Date.now()}`,
            },
          });
        },
      });
    };

    return {
      loadQuizById(id: string) {
        fetchQuiz(id, false);
      },
      startQuiz(id: string) {
        fetchQuiz(id, true);
      },
      answerQuestion(questionId: string, answer: string) {
        patchState(store, (state) => ({
          answers: { ...state.answers, [questionId]: answer },
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
          return { flaggedQuestions: nextFlags };
        });
      },
      navigateTo: navigateToIndex,
      nextQuestion: () => navigateToIndex(store.currentQuestionIndex() + 1),
      prevQuestion: () => navigateToIndex(store.currentQuestionIndex() - 1),
      previousQuestion() {
        this.prevQuestion();
      },
      submitQuiz: submitQuizInternal,
      tickTimer(this: { submitQuiz: () => void }) {
        const remaining = store.timeRemaining();
        if (remaining === null) return;

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
          if (!questionId) return false;
          return Object.prototype.hasOwnProperty.call(store.answers(), questionId);
        });
      },
      isFlagged(questionId: string | null | undefined) {
        return computed(() => {
          if (!questionId) return false;
          return store.flaggedQuestions().has(questionId);
        });
      },
      resetQuiz() {
        patchState(store, getInitialQuizState(store.currentQuiz(), true));
      },
      loadResultDetail(quizId: string, attemptId: string) {
        patchState(store, { resultDetailLoading: true, resultDetailError: null });
        http.get<QuizResultDetail>(`${quizApi}/lessons/${quizId}/final-quiz/results/${attemptId}`).subscribe({
          next: (detail) => {
            patchState(store, {
              resultDetail: detail,
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
    };
  }),
);
