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
  http.get('/api/quizzes/:id', ({ params }) => {
    const { id } = params;
    return HttpResponse.json({
      id,
      ...quizTemplate,
    });
  }),
  http.post('/api/quizzes/:id/submit', async ({ request }) => {
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
  http.get('/api/quizzes/attempts', () => {
    return HttpResponse.json([
      {
        id: 'a1',
        quizId: 'quiz-1',
        quizTitle: 'Algebra Basics',
        subject: 'Math',
        dateTaken: '2026-04-20T10:00:00Z',
        score: 85,
        totalPoints: 100,
        percentage: 85,
        passed: true,
        timeSpent: 300,
        attemptId: 'a1',
      },
      {
        id: 'a2',
        quizId: 'quiz-1',
        quizTitle: 'Algebra Basics',
        subject: 'Math',
        dateTaken: '2026-04-18T14:30:00Z',
        score: 45,
        totalPoints: 100,
        percentage: 45,
        passed: false,
        timeSpent: 450,
        attemptId: 'a2',
      },
      {
        id: 'a3',
        quizId: 'quiz-2',
        quizTitle: 'Geometry Fundamentals',
        subject: 'Math',
        dateTaken: '2026-04-15T09:00:00Z',
        score: 92,
        totalPoints: 100,
        percentage: 92,
        passed: true,
        timeSpent: 600,
        attemptId: 'a3',
      },
      {
        id: 'a4',
        quizId: 'quiz-2',
        quizTitle: 'Geometry Fundamentals',
        subject: 'Math',
        dateTaken: '2026-04-12T16:00:00Z',
        score: 55,
        totalPoints: 100,
        percentage: 55,
        passed: false,
        timeSpent: 380,
        attemptId: 'a4',
      },
      {
        id: 'a5',
        quizId: 'quiz-3',
        quizTitle: 'Biology 101',
        subject: 'Science',
        dateTaken: '2026-04-22T11:00:00Z',
        score: 78,
        totalPoints: 100,
        percentage: 78,
        passed: true,
        timeSpent: 520,
        attemptId: 'a5',
      },
      {
        id: 'a6',
        quizId: 'quiz-3',
        quizTitle: 'Biology 101',
        subject: 'Science',
        dateTaken: '2026-04-19T13:00:00Z',
        score: 35,
        totalPoints: 100,
        percentage: 35,
        passed: false,
        timeSpent: 280,
        attemptId: 'a6',
      },
      {
        id: 'a7',
        quizId: 'quiz-4',
        quizTitle: 'Chemistry Intro',
        subject: 'Science',
        dateTaken: '2026-04-16T10:30:00Z',
        score: 65,
        totalPoints: 100,
        percentage: 65,
        passed: true,
        timeSpent: 420,
        attemptId: 'a7',
      },
      {
        id: 'a8',
        quizId: 'quiz-4',
        quizTitle: 'Chemistry Intro',
        subject: 'Science',
        dateTaken: '2026-04-10T15:00:00Z',
        score: 42,
        totalPoints: 100,
        percentage: 42,
        passed: false,
        timeSpent: 350,
        attemptId: 'a8',
      },
      {
        id: 'a9',
        quizId: 'quiz-5',
        quizTitle: 'English Literature',
        subject: 'English',
        dateTaken: '2026-04-21T09:30:00Z',
        score: 88,
        totalPoints: 100,
        percentage: 88,
        passed: true,
        timeSpent: 480,
        attemptId: 'a9',
      },
      {
        id: 'a10',
        quizId: 'quiz-5',
        quizTitle: 'English Literature',
        subject: 'English',
        dateTaken: '2026-04-14T11:00:00Z',
        score: 72,
        totalPoints: 100,
        percentage: 72,
        passed: true,
        timeSpent: 390,
        attemptId: 'a10',
      },
      {
        id: 'a11',
        quizId: 'quiz-1',
        quizTitle: 'Grammar & Composition',
        subject: 'English',
        dateTaken: '2026-04-08T14:00:00Z',
        score: 58,
        totalPoints: 100,
        percentage: 58,
        passed: false,
        timeSpent: 410,
        attemptId: 'a11',
      },
      {
        id: 'a12',
        quizId: 'quiz-3',
        quizTitle: 'Physics Basics',
        subject: 'Science',
        dateTaken: '2026-04-05T10:00:00Z',
        score: 95,
        totalPoints: 100,
        percentage: 95,
        passed: true,
        timeSpent: 550,
        attemptId: 'a12',
      },
      {
        id: 'a13',
        quizId: 'quiz-2',
        quizTitle: 'Calculus Intro',
        subject: 'Math',
        dateTaken: '2026-04-02T16:30:00Z',
        score: 60,
        totalPoints: 100,
        percentage: 60,
        passed: true,
        timeSpent: 320,
        attemptId: 'a13',
      },
    ]);
  }),
];
