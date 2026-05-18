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
  const body = (await request.json()) as { answers: Record<string, string> | { questionId: string; answer: string }[] };
  const submittedRaw = body.answers ?? {};

  const submitted: Record<string, string> = {};
  if (Array.isArray(submittedRaw)) {
    for (const item of submittedRaw) {
      if (item && item.questionId) {
        submitted[item.questionId] = item.answer;
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
    } else if (submitted[q.id] === q.correctAnswer) {
      score += q.points;
    }
  }

  const percentage = totalPoints > 0 ? Math.round((score / totalPoints) * 100) : 0;

  return {
    attemptId: `${attemptPrefix}-${Date.now()}`,
    score,
    totalPoints,
    percentage,
    passed: percentage >= 70,
    timeSpent: 0,
  };
};

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
    });
  }),

  http.post(
    `${environment.quizApiUrl}/api/v1/lessons/:lessonId/final-quiz`,
    ({ params }) => {
      return HttpResponse.json({
        id: params['lessonId'],
        passThreshold: 70,
        mandatory: true,
        maxAttempts: 3,
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
    async ({ request }) => {
      return HttpResponse.json(await calculateQuizResult(request, 'attempt-final'));
    },
  ),

  http.get(`${environment.quizApiUrl}/api/v1/lessons/:lessonId/final-quiz/attempts`, () => {
    return HttpResponse.json([]);
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
