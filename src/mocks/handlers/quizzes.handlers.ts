import { http, HttpResponse } from 'msw';

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
    },
    {
      id: 'q2',
      type: 'MULTIPLE_CHOICE',
      text: 'Which fraction is equivalent to 1/2?',
      options: ['2/3', '3/6', '4/5', '5/8'],
      points: 10,
    },
    {
      id: 'q3',
      type: 'MULTIPLE_CHOICE',
      text: 'What is 7 x 6?',
      options: ['36', '40', '42', '48'],
      points: 10,
    },
    {
      id: 'q4',
      type: 'MULTIPLE_CHOICE',
      text: 'Which decimal equals 3/4?',
      options: ['0.25', '0.5', '0.75', '0.9'],
      points: 10,
    },
    {
      id: 'q5',
      type: 'MULTIPLE_CHOICE',
      text: 'What is 9 squared?',
      options: ['72', '79', '81', '90'],
      points: 10,
    },
    {
      id: 'q6',
      type: 'TRUE_FALSE',
      text: 'A triangle has three sides.',
      options: ['True', 'False'],
      points: 10,
    },
    {
      id: 'q7',
      type: 'TRUE_FALSE',
      text: 'Zero is a negative number.',
      options: ['True', 'False'],
      points: 10,
    },
    {
      id: 'q8',
      type: 'TRUE_FALSE',
      text: '100 is greater than 10.',
      options: ['True', 'False'],
      points: 10,
    },
    {
      id: 'q9',
      type: 'SHORT_ANSWER',
      text: 'Briefly explain why practice helps learning.',
      points: 10,
    },
    {
      id: 'q10',
      type: 'SHORT_ANSWER',
      text: 'Write one real-world use of percentages.',
      points: 10,
    },
  ],
};

export const quizzesHandlers = [
  http.get('/api/quizzes/:id', ({ params }) => {
    const { id } = params;
    return HttpResponse.json({
      id,
      ...quizTemplate,
    });
  }),
  http.post('/api/quizzes/:id/submit', async ({ request }) => {
    await request.json() as { answers: Record<string, string> };
    return HttpResponse.json({
      attemptId: `attempt-${Date.now()}`,
      score: 80,
      totalPoints: 100,
      percentage: 80,
      passed: true,
      timeSpent: 450,
    });
  }),
];
