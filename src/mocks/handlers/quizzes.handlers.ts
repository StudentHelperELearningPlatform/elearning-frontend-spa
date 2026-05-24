import { http, HttpResponse, StrictRequest, DefaultBodyType } from 'msw';
import { environment } from '../../environments/environment';

// NOTE: This is the v1 API contract matching the backend.
// The legacy handler shapes (difficulty, aiExplanation, lessonId, nextLessonId,
// full submit/results breakdown) are preserved below in comments so we know
// what fields the backend will eventually return and how to parse them.
//
// LEGACY SHAPE (keep as reference):
// interface QuizQuestionTemplate {
//   id: string;
//   type: 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'SHORT_ANSWER';
//   text: string;
//   options?: string[];
//   points: number;
//   correctAnswer: string | null;
//   difficulty: 'EASY' | 'MEDIUM' | 'HARD';   // ← backend will send this
//   aiExplanation: string;                      // ← AI-generated per question
// }
//
// LEGACY QUIZ META:
//   lessonId: string;       // which lesson this quiz belongs to
//   nextLessonId: string | null;  // lesson to unlock after passing
//
// LEGACY RESULTS BREAKDOWN per question:
//   questionId, questionText, type, difficulty,
//   studentAnswer (resolved label), correctAnswer (resolved label),
//   isCorrect, timeSpentSeconds, aiExplanation
//
// LEGACY SUBMIT RESPONSE:
//   attemptId, score, totalPoints, percentage, passed (>= 60%), timeSpent
//
// LEGACY RESULTS RESPONSE (GET /api/quizzes/:id/results/:attemptId):
//   attemptId, quizId, quizTitle, subject, lessonId, nextLessonId,
//   score, totalPoints, percentage, passed, timeSpent, questionBreakdown[]

const quizTemplate = {
  title: 'Sample Quiz',
  subject: 'Mathematics',
  timeLimitSeconds: 900,
  questions: [
    {
      id: 'q1',
      type: 'MULTIPLE_CHOICE',
      text: 'What is 12 + 8?',
      options: ['18', '19', '20', '21'],
      points: 10,
      correctAnswer: 'q1-o3',
    },
    {
      id: 'q2',
      type: 'MULTIPLE_CHOICE',
      text: 'Which fraction is equivalent to 1/2?',
      options: ['2/3', '3/6', '4/5', '5/8'],
      points: 10,
      correctAnswer: 'q2-o2',
    },
    {
      id: 'q3',
      type: 'MULTIPLE_CHOICE',
      text: 'What is 7 x 6?',
      options: ['36', '40', '42', '48'],
      points: 10,
      correctAnswer: 'q3-o3',
    },
    {
      id: 'q4',
      type: 'MULTIPLE_CHOICE',
      text: 'Which decimal equals 3/4?',
      options: ['0.25', '0.5', '0.75', '0.9'],
      points: 10,
      correctAnswer: 'q4-o3',
    },
    {
      id: 'q5',
      type: 'MULTIPLE_CHOICE',
      text: 'What is 9 squared?',
      options: ['72', '79', '81', '90'],
      points: 10,
      correctAnswer: 'q5-o3',
    },
    {
      id: 'q6',
      type: 'TRUE_FALSE',
      text: 'A triangle has three sides.',
      options: ['True', 'False'],
      points: 10,
      correctAnswer: 'true',
    },
    {
      id: 'q7',
      type: 'TRUE_FALSE',
      text: 'Zero is a negative number.',
      options: ['True', 'False'],
      points: 10,
      correctAnswer: 'false',
    },
    {
      id: 'q8',
      type: 'TRUE_FALSE',
      text: '100 is greater than 10.',
      options: ['True', 'False'],
      points: 10,
      correctAnswer: 'true',
    },
    {
      id: 'q9',
      type: 'SHORT_ANSWER',
      text: 'Briefly explain why practice helps learning.',
      points: 10,
      correctAnswer: null,
    },
    {
      id: 'q10',
      type: 'SHORT_ANSWER',
      text: 'Write one real-world use of percentages.',
      points: 10,
      correctAnswer: null,
    },
  ],
};

const calculateQuizResult = async (
  request: StrictRequest<DefaultBodyType>,
  attemptPrefix: string,
) => {
  const body = (await request.json()) as {
    answers?: Record<string, string> | { questionId: string; answer: string; timeSpentSeconds?: number }[];
    totalTimeSeconds?: number;
  };
  const submittedRaw = body.answers ?? {};

  const submitted: Record<string, string> = {};
  const timeSpentMap: Record<string, number> = {};
  
  if (Array.isArray(submittedRaw)) {
    for (const item of submittedRaw) {
      if (item && item.questionId) {
        submitted[item.questionId] = item.answer;
        timeSpentMap[item.questionId] = item.timeSpentSeconds ?? 0;
      }
    }
  } else {
    Object.assign(submitted, submittedRaw);
  }

  let score = 0;
  const totalPoints = quizTemplate.questions.reduce((sum, q) => sum + q.points, 0);

  for (const q of quizTemplate.questions) {
    if (q.correctAnswer === null) {
      if ((submitted[q.id] ?? '').trim().length > 0) score += q.points;
    } else {
      const studentAns = (submitted[q.id] ?? '').toLowerCase();
      const correctOptionIndex = q.correctAnswer && q.correctAnswer.includes('-o') 
        ? parseInt(q.correctAnswer.split('-o')[1]) - 1 
        : -1;
      const correctOptionText = q.options && correctOptionIndex >= 0 ? q.options[correctOptionIndex] : null;

      const isCorrect =
        studentAns === (q.correctAnswer ?? '').toLowerCase() ||
        (correctOptionText && studentAns === correctOptionText.toLowerCase()) ||
        (studentAns === 'true' && (q.correctAnswer === 'true' || q.correctAnswer === 'True')) ||
        (studentAns === 'false' && (q.correctAnswer === 'false' || q.correctAnswer === 'False'));

      if (isCorrect) score += q.points;
    }
  }

  const percentage = totalPoints > 0 ? Math.round((score / totalPoints) * 100) : 0;

  return {
    attemptId: `${attemptPrefix}-${Date.now()}`,
    score,
    totalPoints,
    percentage,
    passed: percentage >= 70,
    timeSpent: body.totalTimeSeconds ?? 0,
    timeTakenSeconds: body.totalTimeSeconds ?? 0,
    submittedAt: new Date().toISOString(),
    results: quizTemplate.questions.map((q) => {
      const studentAns = submitted[q.id] || '';
      const correctOptionIndex = q.correctAnswer && q.correctAnswer.includes('-o') 
        ? parseInt(q.correctAnswer.split('-o')[1]) - 1 
        : -1;
      const correctOptionText = q.options && correctOptionIndex >= 0 ? q.options[correctOptionIndex] : null;

      const isCorrect = q.correctAnswer === null
        ? studentAns.trim().length > 0
        : studentAns.toLowerCase() === (q.correctAnswer ?? '').toLowerCase() ||
          (correctOptionText && studentAns.toLowerCase() === correctOptionText.toLowerCase()) ||
          (studentAns.toLowerCase() === 'true' && (q.correctAnswer === 'true' || q.correctAnswer === 'True')) ||
          (studentAns.toLowerCase() === 'false' && (q.correctAnswer === 'false' || q.correctAnswer === 'False'));

      return {
        questionId: q.id,
        submittedAnswer: studentAns,
        correctAnswer: q.correctAnswer || 'Correct Answer',
        correct: isCorrect,
        timeSpentSeconds: timeSpentMap[q.id] ?? 0,
      };
    }),
  };
};

interface MockQuestionResult {
  questionId: string;
  submittedAnswer: string;
  correct: boolean;
  correctAnswer: string;
  timeSpentSeconds: number;
}

interface MockAttempt {
  id: string;
  attemptId: string;
  quizId: string;
  quizTitle: string;
  subject: string;
  lessonId: string;
  nextLessonId: string | null;
  score: number;
  totalPoints: number;
  percentage: number;
  passed: boolean;
  timeSpent: number;
  timeTakenSeconds: number;
  submittedAt: string;
  results: MockQuestionResult[];
  recommendedSubcapitols?: string[];
}

const submittedAttemptsMap = new Map<string, MockAttempt[]>();

// Seed a default attempt for local dev testing
submittedAttemptsMap.set('seed-1', [
  {
    id: 'attempt-1',
    attemptId: 'attempt-1',
    quizId: 'seed-1',
    quizTitle: 'Sample Quiz',
    subject: 'Mathematics',
    lessonId: 'seed-1',
    nextLessonId: 'seed-2',
    score: 70,
    totalPoints: 100,
    percentage: 70,
    passed: true,
    timeSpent: 245,
    timeTakenSeconds: 245,
    submittedAt: '2026-05-24T20:19:58.231Z',
    results: [
      {
        questionId: 'q1',
        submittedAnswer: 'q1-o3',
        correct: true,
        correctAnswer: 'q1-o3',
        timeSpentSeconds: 15,
      },
      {
        questionId: 'q2',
        submittedAnswer: 'q5-o1',
        correct: false,
        correctAnswer: 'q5-o3',
        timeSpentSeconds: 65,
      }
    ],
    recommendedSubcapitols: ['Algebra Basics']
  }
]);

export const quizzesHandlers = [
  http.get(
    `${environment.quizApiUrl}/api/v1/lessons/:lessonId/final-quiz/questions`,
    ({ params }) => {
      return HttpResponse.json({ id: params['lessonId'], ...quizTemplate });
    },
  ),

  http.get(`${environment.quizApiUrl}/api/v1/lessons/:lessonId/final-quiz`, ({ params }) => {
    return HttpResponse.json({
      id: params['lessonId'],
      questions: quizTemplate.questions.map((q) => ({
        id: q.id,
        questionType: q.type,
        questionText: q.text,
        options: q.options
          ? q.options.map((text, i) => ({
              id: `${q.id}-o${i + 1}`,
              text,
              isCorrect: `${q.id}-o${i + 1}` === q.correctAnswer,
            }))
          : undefined,
        orderIndex: 0,
      })),
      passThreshold: 70,
      mandatory: true,
      maxAttempts: null,
      timeLimitSeconds: 900,
    });
  }),

  http.post(
    `${environment.quizApiUrl}/api/v1/lessons/:lessonId/final-quiz`,
    async ({ request, params }) => {
      const body = (await request.json()) as {
        passThreshold?: number;
        mandatory?: boolean;
        maxAttempts?: number | null;
        timeLimit?: number | null;
      };
      return HttpResponse.json({
        id: params['lessonId'],
        passThreshold: body.passThreshold ?? 70,
        mandatory: body.mandatory ?? true,
        maxAttempts: body.maxAttempts ?? 3,
        timeLimitSeconds: body.timeLimit ?? 900,
        timeLimit: body.timeLimit ?? 900,
      });
    },
  ),

  http.post(
    `${environment.quizApiUrl}/api/v1/lessons/:lessonId/final-quiz/questions`,
    async ({ request }) => {
      const body = (await request.json()) as Record<string, unknown>;
      return HttpResponse.json({
        id: `q-${Date.now()}`,
        ...body,
        status: 'APPROVED',
        orderIndex: 0,
      });
    },
  ),

  // Uses the shared helper
  http.post(
    `${environment.quizApiUrl}/api/v1/lessons/:lessonId/final-quiz/submit`,
    async ({ request, params }) => {
      const lessonId = params['lessonId'] as string;
      const result = await calculateQuizResult(request, 'attempt-final');
      
      if (lessonId !== 'lesson-123') {
        if (!submittedAttemptsMap.has(lessonId)) {
          submittedAttemptsMap.set(lessonId, []);
        }
        
        const detailedAttempt: MockAttempt = {
          id: result.attemptId,
          attemptId: result.attemptId,
          quizId: lessonId,
          quizTitle: 'Sample Quiz',
          subject: 'Mathematics',
          lessonId: lessonId,
          nextLessonId: 'seed-2',
          score: result.score,
          totalPoints: result.totalPoints,
          percentage: result.percentage,
          passed: result.passed,
          timeSpent: result.timeTakenSeconds,
          timeTakenSeconds: result.timeTakenSeconds,
          submittedAt: result.submittedAt,
          results: result.results,
          recommendedSubcapitols: ['Mathematics Advanced']
        };
        
        submittedAttemptsMap.get(lessonId)!.push(detailedAttempt);
      }
      return HttpResponse.json(result);
    },
  ),

  http.get(`${environment.quizApiUrl}/api/v1/lessons/:lessonId/final-quiz/attempts`, ({ params }) => {
    const lessonId = params['lessonId'] as string;
    const attempts = submittedAttemptsMap.get(lessonId) || [];
    return HttpResponse.json(attempts);
  }),

  http.post(`${environment.quizApiUrl}/api/v1/lessons/:lessonId/final-quiz/explain`, () => {
    return HttpResponse.json(
      Object.fromEntries(
        quizTemplate.questions.map((q) => [
          q.id,
          `The correct answer for "${q.text}" is "${q.correctAnswer ?? 'open-ended'}". Review the relevant section to reinforce your understanding.`,
        ]),
      ),
    );
  }),

  http.get(`${environment.quizApiUrl}/api/v1/subcapitols/:id/check-quiz`, ({ params }) => {
    return HttpResponse.json({
      id: params['id'],
      ...quizTemplate,
      timeLimitSeconds: null,
    });
  }),

  // Uses the shared helper
  http.post(
    `${environment.quizApiUrl}/api/v1/subcapitols/:id/check-quiz/submit`,
    async ({ request }) => {
      return HttpResponse.json(await calculateQuizResult(request, 'attempt'));
    },
  ),
];
