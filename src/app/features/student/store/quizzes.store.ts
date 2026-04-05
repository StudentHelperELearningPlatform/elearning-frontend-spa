import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { computed } from '@angular/core';

export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  type: string;
  points: number;
  options: Option[];
}

export interface Quiz {
  id: string;
  title: string;
  timeLimit: number;
  questions: Question[];
}

export interface QuizResult {
  score: number;
  totalPoints: number;
  timeSpent: number;
  percentage: number;
}

interface QuizzesState {
  currentQuiz: Quiz | null;
  currentQuestionIndex: number;
  answers: Record<string, string>;
  startedAt: Date | null;
  timeRemaining: number | null;
  submitted: boolean;
  result: QuizResult | null;
  loading: boolean;
}

export const QuizzesStore = signalStore(
  { providedIn: 'root' },
  withState<QuizzesState>({
    currentQuiz: null,
    currentQuestionIndex: 0,
    answers: {},
    startedAt: null,
    timeRemaining: null,
    submitted: false,
    result: null,
    loading: false
  }),
  withComputed((state) => ({
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
    showResults: computed(() => state.submitted()),
    score: computed(() => state.result()?.score || 0),
    totalPoints: computed(() => state.result()?.totalPoints || 0),
    timeSpent: computed(() => state.result()?.timeSpent || 0)
  })),
  withMethods((store) => ({
    loadQuizById(id: string) {
      patchState(store, { loading: true });
      // Mock API call
      setTimeout(() => {
        patchState(store, {
          loading: false,
          currentQuiz: {
            id,
            title: 'Advanced Fractions & Decimals',
            timeLimit: 600, // 10 minutes
            questions: [
              { 
                id: 'q1', 
                text: 'What is 1/2 + 1/4?', 
                type: 'MULTIPLE_CHOICE', 
                points: 10,
                options: [
                  { id: 'o1', text: '3/4' },
                  { id: 'o2', text: '2/6' },
                  { id: 'o3', text: '1/8' },
                  { id: 'o4', text: '1/2' }
                ] 
              },
              { 
                id: 'q2', 
                text: 'Which decimal is equivalent to 3/4?', 
                type: 'MULTIPLE_CHOICE',
                points: 15,
                options: [
                  { id: 'o1', text: '0.34' },
                  { id: 'o2', text: '0.75' },
                  { id: 'o3', text: '3.4' },
                  { id: 'o4', text: '0.25' }
                ]
              },
              { 
                id: 'q3', 
                text: 'Is 2/4 equivalent to 1/2?', 
                type: 'TRUE_FALSE',
                points: 5,
                options: [
                  { id: 'true', text: 'True' },
                  { id: 'false', text: 'False' }
                ]
              }
            ]
          },
          currentQuestionIndex: 0,
          answers: {},
          startedAt: new Date(),
          submitted: false,
          result: null
        });
      }, 800);
    },
    answerQuestion(questionId: string, answer: string) {
      patchState(store, (state) => ({
        answers: { ...state.answers, [questionId]: answer }
      }));
    },
    nextQuestion() {
      patchState(store, (state) => ({
        currentQuestionIndex: Math.min(state.currentQuestionIndex + 1, (state.currentQuiz?.questions?.length || 1) - 1)
      }));
    },
    previousQuestion() {
      patchState(store, (state) => ({
        currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1)
      }));
    },
    submitQuiz() {
      const state = store;
      const timeSpent = state.startedAt() ? Math.floor((new Date().getTime() - state.startedAt()!.getTime()) / 1000) : 0;
      
      // Mock grading
      let score = 0;
      let totalPoints = 0;
      const answers = state.answers();
      
      state.currentQuiz()?.questions.forEach((q: Question) => {
        totalPoints += q.points || 10;
        // Mock correct answers
        const correctAnswers: Record<string, string> = { 'q1': 'o1', 'q2': 'o2', 'q3': 'true' };
        if (answers[q.id] === correctAnswers[q.id]) {
          score += q.points || 10;
        }
      });

      patchState(store, { 
        submitted: true, 
        result: { 
          score, 
          totalPoints, 
          timeSpent,
          percentage: Math.round((score / totalPoints) * 100)
        } 
      });
    },
    resetQuiz() {
      patchState(store, {
        currentQuestionIndex: 0,
        answers: {},
        startedAt: new Date(),
        submitted: false,
        result: null
      });
    }
  }))
);
