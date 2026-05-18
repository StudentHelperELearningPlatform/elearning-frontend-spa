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
import { Quiz, QuizOption, QuizResult, QuizResultDetail, QuestionResultBreakdown } from '@shared/models/quiz.types';

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
  attemptId?: string;
  id?: string;
  score: number;
  totalPoints: number;
  percentage: number;
  passed: boolean;
  timeSpent?: number;
}

interface QuizAttemptResult {
  questionId: string;
  submittedAnswer?: string;
  correctAnswer?: string;
  correct?: boolean;
}

interface QuizAttempt {
  attemptId?: string;
  id?: string;
  score?: number;
  submittedAt?: number;
  results?: QuizAttemptResult[];
  quizId?: string;
  quizTitle?: string;
  subject?: string;
  lessonId?: string;
  nextLessonId?: string | null;
  passed?: boolean;
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

const resolveOptionLabel = (question: { options?: QuizOption[] } | undefined, optionId: string | undefined): string => {
  if (!optionId) return '';
  if (question?.options && question.options.length > 0) {
    const opt = question.options.find(o => o.id === optionId);
    if (opt) return opt.text;
  }
  return optionId;
};

interface QuizzesState {
  lessonId: string | null;
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
    lessonId: null,
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

    const fetchQuiz = (lessonId: string, isStart: boolean) => {
      patchState(store, { lessonId, loading: true, error: null });

      const quiz$ = http.get<QuizApiResponse>(`${quizApi}/lessons/${lessonId}/final-quiz`);

      const questions$ = http.get<QuizApiQuestion[]>(`${quizApi}/lessons/${lessonId}/final-quiz/questions`).pipe(
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
      console.log('[QuizzesStore] submitQuizInternal called. submitted:', store.submitted(), 'lessonId:', store.lessonId());
      if (store.submitted()) {
        console.warn('[QuizzesStore] Quiz already submitted. Returning early.');
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

      const lessonId = store.lessonId();
      if (!lessonId) {
        console.error('[QuizzesStore] Cannot submit quiz: lessonId is missing from store state!');
        return;
      }

      patchState(store, { submitted: true });
      const url = `${quizApi}/lessons/${lessonId}/final-quiz/submit`;
      console.log('[QuizzesStore] Posting answers to submit URL:', url, answersArray);

      http.post<SubmitQuizResponse>(url, { answers: answersArray }).subscribe({
        next: (submission) => {
          console.log('[QuizzesStore] Quiz submit API response received:', submission);
          const rawAttemptId = submission?.attemptId || submission?.id || `attempt-fallback-${Date.now()}`;
          console.log('[QuizzesStore] Resolved attempt ID:', rawAttemptId);

          patchState(store, {
            result: {
              score: submission?.score ?? 0,
              totalPoints: submission?.totalPoints ?? 100,
              timeSpent: submission?.timeSpent ?? timeSpent,
              percentage: submission?.percentage ?? 0,
              passed: submission?.passed ?? false,
              attemptId: rawAttemptId,
            },
          });
        },
        error: (err) => {
          console.error('[QuizzesStore] Failed to submit quiz via API:', err);
          const questions = store.currentQuiz()?.questions ?? [];
          const totalPoints = questions.reduce((sum, q) => sum + (q.points || 10), 0);
          const fallbackAttemptId = `attempt-${Date.now()}`;
          console.log('[QuizzesStore] Falling back to local failed submission state with attemptId:', fallbackAttemptId);

          patchState(store, {
            result: {
              score: 0,
              totalPoints,
              timeSpent,
              percentage: 0,
              passed: false,
              attemptId: fallbackAttemptId,
            },
          });
        },
      });
    };

    return {
      loadQuizById(lessonId: string) {
        fetchQuiz(lessonId, false);
      },
      startQuiz(lessonId: string) {
        fetchQuiz(lessonId, true);
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
      loadResultDetail(lessonId: string, attemptId: string) {
        console.log('[QuizzesStore] loadResultDetail called with lessonId:', lessonId, 'attemptId:', attemptId);
        patchState(store, { resultDetailLoading: true, resultDetailError: null });

        const patchResultDetailFromStoreResult = (errorMessage: string) => {
          const storeResult = store.result();
          if (storeResult) {
            patchState(store, {
              resultDetail: {
                attemptId: storeResult.attemptId || attemptId,
                quizId: lessonId,
                quizTitle: 'Lesson Final Quiz',
                subject: 'General',
                lessonId: lessonId,
                nextLessonId: null,
                score: storeResult.score,
                totalPoints: storeResult.totalPoints,
                percentage: storeResult.percentage,
                passed: storeResult.passed ?? false,
                timeSpent: storeResult.timeSpent ?? 0,
                questionBreakdown: [],
              },
              resultDetailLoading: false,
              resultDetailError: null,
            });
          } else {
            patchState(store, {
              resultDetail: null,
              resultDetailLoading: false,
              resultDetailError: errorMessage,
            });
          }
        };

        const url = `${quizApi}/lessons/${lessonId}/final-quiz/attempts`;
        console.log('[QuizzesStore] Getting attempts from:', url);
        http.get<unknown>(url).subscribe({
          next: (response) => {
            console.log('[QuizzesStore] loadResultDetail attempts API response:', response);
            let attemptsArray: QuizAttempt[] = [];
            if (Array.isArray(response)) {
              attemptsArray = response as QuizAttempt[];
            } else if (response && typeof response === 'object') {
              const obj = response as Record<string, unknown>;
              if (Array.isArray(obj['attempts'])) {
                attemptsArray = obj['attempts'] as QuizAttempt[];
              } else if (Array.isArray(obj['content'])) {
                attemptsArray = obj['content'] as QuizAttempt[];
              } else if (Array.isArray(obj['attemptsList'])) {
                attemptsArray = obj['attemptsList'] as QuizAttempt[];
              }
            }

            let foundAttempt = attemptsArray.find(
              (a) => a.attemptId === attemptId || a.id === attemptId
            );

            if (!foundAttempt && attemptsArray.length > 0) {
              console.log('[QuizzesStore] Specific attemptId not matched. Filtering and sorting to get the latest attempt.');
              const sortedAttempts = [...attemptsArray].sort((a, b) => (b.submittedAt || 0) - (a.submittedAt || 0));
              foundAttempt = sortedAttempts[0];
            }

            if (foundAttempt) {
              console.log('[QuizzesStore] Found attempt for display:', foundAttempt);
              const currentQuiz = store.currentQuiz();
              const questions = currentQuiz?.questions || [];
              const calculatedTotalPoints = questions.reduce((sum, q) => sum + (q.points || 10), 0) || 100;
              const rawScore = foundAttempt.score ?? 0;
              const calculatedPercentage = Math.round((rawScore / calculatedTotalPoints) * 100);

              const mappedBreakdown: QuestionResultBreakdown[] = (foundAttempt.results || []).map((r) => {
                const q = questions.find((quest) => quest.id === r.questionId);

                return {
                  questionId: r.questionId,
                  questionText: q?.text || 'Question',
                  type: q?.type || 'MULTIPLE_CHOICE',
                  difficulty: 'MEDIUM',
                  studentAnswer: resolveOptionLabel(q, r.submittedAnswer),
                  correctAnswer: resolveOptionLabel(q, r.correctAnswer) || 'Correct Answer',
                  isCorrect: r.correct ?? false,
                  timeSpentSeconds: 0,
                  aiExplanation: 'AI Explanation is not available for this question.',
                };
              });

              const detail: QuizResultDetail = {
                attemptId: foundAttempt.attemptId || foundAttempt.id || attemptId,
                quizId: foundAttempt.quizId || lessonId,
                quizTitle: foundAttempt.quizTitle || currentQuiz?.title || 'Lesson Final Quiz',
                subject: foundAttempt.subject || currentQuiz?.subject || 'General',
                lessonId: foundAttempt.lessonId || lessonId,
                nextLessonId: foundAttempt.nextLessonId || null,
                score: rawScore,
                totalPoints: calculatedTotalPoints,
                percentage: calculatedPercentage,
                passed: foundAttempt.passed ?? (calculatedPercentage >= 70),
                timeSpent: foundAttempt.timeSpent ?? 0,
                questionBreakdown: mappedBreakdown,
              };

              patchState(store, {
                resultDetail: detail,
                resultDetailLoading: false,
                resultDetailError: null,
              });
            } else {
              console.warn('[QuizzesStore] No matching attempt found. Falling back to local store result.');
              patchResultDetailFromStoreResult('Unable to find quiz results for this attempt.');
            }
          },
          error: (err) => {
            console.error('[QuizzesStore] Failed to load result details via API:', err);
            patchResultDetailFromStoreResult('Unable to load quiz results.');
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