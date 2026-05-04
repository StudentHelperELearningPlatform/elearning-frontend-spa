import { http, HttpResponse } from 'msw';

type QuestionDifficulty = 'EASY' | 'MEDIUM' | 'HARD';

interface QuizQuestionTemplate {
  id: string;
  type: 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'SHORT_ANSWER';
  text: string;
  options?: string[];
  points: number;
  correctAnswer: string | null;
  difficulty: QuestionDifficulty;
  aiExplanation: string;
}

const quizTemplate: {
  title: string;
  subject: string;
  timeLimitSeconds: number;
  lessonId: string;
  nextLessonId: string | null;
  questions: QuizQuestionTemplate[];
} = {
  title: 'Sample Quiz',
  subject: 'Mathematics',
  timeLimitSeconds: 900,
  lessonId: 'lesson-1',
  nextLessonId: 'lesson-2',
  questions: [
    {
      id: 'q1',
      type: 'MULTIPLE_CHOICE',
      text: 'What is 12 + 8?',
      options: ['18', '19', '20', '21'],
      points: 10,
      correctAnswer: 'q1-o3',
      difficulty: 'EASY',
      aiExplanation:
        '12 + 8 equals 20. Adding the ones place (2 + 8) gives 10, carry the 1 — then 1 + 1 = 2 in the tens place, so the result is 20.',
    },
    {
      id: 'q2',
      type: 'MULTIPLE_CHOICE',
      text: 'Which fraction is equivalent to 1/2?',
      options: ['2/3', '3/6', '4/5', '5/8'],
      points: 10,
      correctAnswer: 'q2-o2',
      difficulty: 'EASY',
      aiExplanation:
        '3/6 reduces to 1/2 because both numerator and denominator share a factor of 3. The other options are not equivalent fractions.',
    },
    {
      id: 'q3',
      type: 'MULTIPLE_CHOICE',
      text: 'What is 7 x 6?',
      options: ['36', '40', '42', '48'],
      points: 10,
      correctAnswer: 'q3-o3',
      difficulty: 'EASY',
      aiExplanation:
        'Seven groups of six equals 42. You can verify by adding 7 six times, or by knowing 7 x 6 from the multiplication table.',
    },
    {
      id: 'q4',
      type: 'MULTIPLE_CHOICE',
      text: 'Which decimal equals 3/4?',
      options: ['0.25', '0.5', '0.75', '0.9'],
      points: 10,
      correctAnswer: 'q4-o3',
      difficulty: 'MEDIUM',
      aiExplanation:
        'Dividing 3 by 4 gives 0.75. Another way: 3/4 means three-quarters, and one-quarter is 0.25, so three of those is 0.75.',
    },
    {
      id: 'q5',
      type: 'MULTIPLE_CHOICE',
      text: 'What is 9 squared?',
      options: ['72', '79', '81', '90'],
      points: 10,
      correctAnswer: 'q5-o3',
      difficulty: 'MEDIUM',
      aiExplanation:
        '9 squared means 9 multiplied by itself: 9 x 9 = 81. The exponent of 2 indicates the base is multiplied by itself once.',
    },
    {
      id: 'q6',
      type: 'TRUE_FALSE',
      text: 'A triangle has three sides.',
      options: ['True', 'False'],
      points: 10,
      correctAnswer: 'true',
      difficulty: 'EASY',
      aiExplanation:
        'By definition, a triangle is a polygon with exactly three sides and three angles that sum to 180 degrees.',
    },
    {
      id: 'q7',
      type: 'TRUE_FALSE',
      text: 'Zero is a negative number.',
      options: ['True', 'False'],
      points: 10,
      correctAnswer: 'false',
      difficulty: 'MEDIUM',
      aiExplanation:
        'Zero is neither positive nor negative — it sits at the origin of the number line and serves as the boundary between the two sets.',
    },
    {
      id: 'q8',
      type: 'TRUE_FALSE',
      text: '100 is greater than 10.',
      options: ['True', 'False'],
      points: 10,
      correctAnswer: 'true',
      difficulty: 'EASY',
      aiExplanation:
        '100 is ten times larger than 10, so it is unambiguously greater. Comparing two positive integers always favours the one with more digits when their digit counts differ.',
    },
    {
      id: 'q9',
      type: 'SHORT_ANSWER',
      text: 'Briefly explain why practice helps learning.',
      points: 10,
      correctAnswer: null,
      difficulty: 'HARD',
      aiExplanation:
        'Repeated practice strengthens neural pathways and moves knowledge from short-term to long-term memory. Spaced repetition in particular helps you recall concepts under pressure.',
    },
    {
      id: 'q10',
      type: 'SHORT_ANSWER',
      text: 'Write one real-world use of percentages.',
      points: 10,
      correctAnswer: null,
      difficulty: 'HARD',
      aiExplanation:
        'Percentages appear everywhere — sales tax, exam grades, battery levels, interest rates. Any answer naming a real situation where part-of-a-whole is expressed out of 100 is acceptable.',
    },
  ],
};

interface SubmittedAttempt {
  attemptId: string;
  quizId: string;
  answers: Record<string, string>;
  score: number;
  totalPoints: number;
  percentage: number;
  passed: boolean;
  timeSpent: number;
  submittedAt: number;
}

const submittedAttempts = new Map<string, SubmittedAttempt>();

const resolveStudentAnswerLabel = (
  question: QuizQuestionTemplate,
  rawAnswer: string | undefined,
): string => {
  if (rawAnswer === undefined || rawAnswer === '') {
    return '(no answer)';
  }
  if (question.type === 'TRUE_FALSE') {
    return rawAnswer.charAt(0).toUpperCase() + rawAnswer.slice(1);
  }
  if (question.type === 'MULTIPLE_CHOICE' && question.options) {
    const optionIndex = Number(rawAnswer.split('-o').pop()) - 1;
    return question.options[optionIndex] ?? rawAnswer;
  }
  return rawAnswer;
};

const resolveCorrectAnswerLabel = (question: QuizQuestionTemplate): string => {
  if (question.correctAnswer === null) {
    return '(graded by your teacher)';
  }
  if (question.type === 'TRUE_FALSE') {
    return question.correctAnswer.charAt(0).toUpperCase() + question.correctAnswer.slice(1);
  }
  if (question.type === 'MULTIPLE_CHOICE' && question.options) {
    const optionIndex = Number(question.correctAnswer.split('-o').pop()) - 1;
    return question.options[optionIndex] ?? question.correctAnswer;
  }
  return question.correctAnswer;
};

const isAnswerCorrect = (
  question: QuizQuestionTemplate,
  rawAnswer: string | undefined,
): boolean => {
  if (question.correctAnswer === null) {
    return rawAnswer !== undefined && rawAnswer.trim().length > 0;
  }
  return rawAnswer === question.correctAnswer;
};

export const quizzesHandlers = [
  http.get('/api/quizzes/:id', ({ params }) => {
    const { id } = params;
    return HttpResponse.json({
      id,
      title: quizTemplate.title,
      subject: quizTemplate.subject,
      timeLimitSeconds: quizTemplate.timeLimitSeconds,
      questions: quizTemplate.questions,
    });
  }),
  http.post('/api/quizzes/:id/submit', async ({ params, request }) => {
    const quizId = String(params['id']);
    const body = (await request.json()) as { answers: Record<string, string> };
    const submittedAnswers = body.answers ?? {};

    let score = 0;
    const totalPoints = quizTemplate.questions.reduce((sum, q) => sum + q.points, 0);

    for (const question of quizTemplate.questions) {
      if (isAnswerCorrect(question, submittedAnswers[question.id])) {
        score += question.points;
      }
    }

    const percentage = totalPoints > 0 ? Math.round((score / totalPoints) * 100) : 0;
    const attemptId = `attempt-${Date.now()}`;

    submittedAttempts.set(attemptId, {
      attemptId,
      quizId,
      answers: submittedAnswers,
      score,
      totalPoints,
      percentage,
      passed: percentage >= 60,
      timeSpent: 0,
      submittedAt: Date.now(),
    });

    return HttpResponse.json({
      attemptId,
      score,
      totalPoints,
      percentage,
      passed: percentage >= 60,
      timeSpent: 0,
    });
  }),
  http.get('/api/quizzes/:id/results/:attemptId', ({ params }) => {
    const quizId = String(params['id']);
    const attemptId = String(params['attemptId']);

    const stored = submittedAttempts.get(attemptId);
    const studentAnswers = stored?.answers ?? {};

    const breakdown = quizTemplate.questions.map((question) => {
      const studentRaw = studentAnswers[question.id];
      const correct = isAnswerCorrect(question, studentRaw);
      const baseSeconds = question.difficulty === 'HARD' ? 95 : question.difficulty === 'MEDIUM' ? 55 : 25;
      const timeSpentSeconds = Math.max(8, baseSeconds + (correct ? -10 : 12));

      return {
        questionId: question.id,
        questionText: question.text,
        type: question.type,
        difficulty: question.difficulty,
        studentAnswer: resolveStudentAnswerLabel(question, studentRaw),
        correctAnswer: resolveCorrectAnswerLabel(question),
        isCorrect: correct,
        timeSpentSeconds,
        aiExplanation: question.aiExplanation,
      };
    });

    let score = stored?.score;
    let totalPoints = stored?.totalPoints;
    let percentage = stored?.percentage;
    let passed = stored?.passed;
    let timeSpent = stored?.timeSpent;

    if (score === undefined || totalPoints === undefined) {
      totalPoints = quizTemplate.questions.reduce((sum, q) => sum + q.points, 0);
      score = breakdown.reduce(
        (sum, q) => sum + (q.isCorrect ? quizTemplate.questions.find((qq) => qq.id === q.questionId)!.points : 0),
        0,
      );
      percentage = totalPoints > 0 ? Math.round((score / totalPoints) * 100) : 0;
      passed = percentage >= 60;
      timeSpent = breakdown.reduce((sum, q) => sum + q.timeSpentSeconds, 0);
    } else if (timeSpent === 0) {
      timeSpent = breakdown.reduce((sum, q) => sum + q.timeSpentSeconds, 0);
    }

    return HttpResponse.json({
      attemptId,
      quizId,
      quizTitle: quizTemplate.title,
      subject: quizTemplate.subject,
      lessonId: quizTemplate.lessonId,
      nextLessonId: quizTemplate.nextLessonId,
      score,
      totalPoints,
      percentage,
      passed,
      timeSpent,
      questionBreakdown: breakdown,
    });
  }),
];
