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

export const quizzesHandlers = [
  http.get('/api/v1/v1/quizzes/:id', ({ params }) => {
    const { id } = params;
    return HttpResponse.json({
      id,
      ...quizTemplate,
    });
  }),
  http.post('/api/v1/v1/quizzes/:id/submit', async ({ request }) => {
    const body = (await request.json()) as { answers: Record<string, string> };
    const submittedAnswers = body.answers ?? {};

    let score = 0;
    const totalPoints = quizTemplate.questions.reduce((sum, q) => sum + q.points, 0);

    for (const question of quizTemplate.questions) {
      if (question.correctAnswer === null) {
        const userAnswer = submittedAnswers[question.id] ?? '';
        if (userAnswer.trim().length > 0) {
          score += question.points;
        }
      } else {
        if (submittedAnswers[question.id] === question.correctAnswer) {
          score += question.points;
        }
      }
    }

    const percentage = totalPoints > 0 ? Math.round((score / totalPoints) * 100) : 0;

    return HttpResponse.json({
      attemptId: `attempt-${Date.now()}`,
      score,
      totalPoints,
      percentage,
      passed: percentage >= 70,
      timeSpent: 0,
    });
  }),
];

