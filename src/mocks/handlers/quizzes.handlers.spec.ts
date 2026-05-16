import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { setupServer } from 'msw/node';
import { quizzesHandlers } from './quizzes.handlers';
import { environment } from '../../environments/environment';

// Folosim environment pentru a crea URL-uri absolute, compatibile cu Node.js fetch
const getTargetUrl = (path: string) => {
  const base = environment.quizApiUrl || 'http://localhost';
  return `${base}${path}`;
};

describe('quizzesHandlers', () => {
  const server = setupServer(...quizzesHandlers);

  beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  describe('GET /api/v1/lessons/:lessonId/final-quiz/questions', () => {
    it('should return questions for the final quiz', async () => {
      const response = await fetch(getTargetUrl('/api/v1/lessons/lesson-123/final-quiz/questions'));

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.id).toBe('lesson-123');
      expect(data.timeLimitSeconds).toBe(900);
      expect(data.questions).toBeDefined();
      expect(data.questions.length).toBe(10);
    });
  });

  describe('GET /api/v1/lessons/:lessonId/final-quiz', () => {
    it('should return final quiz configuration with formatted options', async () => {
      const response = await fetch(getTargetUrl('/api/v1/lessons/lesson-123/final-quiz'));

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.id).toBe('lesson-123');
      expect(data.passThreshold).toBe(70);
      expect(data.mandatory).toBe(true);
      expect(data.questions).toBeDefined();
      // Verifică formatarea opțiunilor (isCorrect)
      expect(data.questions[0].options[0].isCorrect).toBeDefined();
    });
  });

  describe('POST /api/v1/lessons/:lessonId/final-quiz/submit', () => {
    it('should calculate perfect score correctly on final quiz submit', async () => {
      const response = await fetch(getTargetUrl('/api/v1/lessons/lesson-123/final-quiz/submit'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: {
            q1: 'q1-o3',
            q2: 'q2-o2',
            q3: 'q3-o3',
            q4: 'q4-o3',
            q5: 'q5-o3',
            q6: 'true',
            q7: 'false',
            q8: 'true',
            q9: 'Valid text answer',
            q10: 'Another valid text answer',
          },
        }),
      });

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.score).toBe(100);
      expect(data.totalPoints).toBe(100);
      expect(data.percentage).toBe(100);
      expect(data.passed).toBe(true);
      expect(data.attemptId).toContain('attempt-final'); // Verifică prefixul corect
    });
  });

  describe('GET /api/v1/lessons/:lessonId/final-quiz/attempts', () => {
    it('should return an empty array of attempts', async () => {
      const response = await fetch(getTargetUrl('/api/v1/lessons/lesson-123/final-quiz/attempts'));

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data).toEqual([]);
    });
  });

  describe('POST /api/v1/lessons/:lessonId/final-quiz/explain', () => {
    it('should return AI explanations for all questions', async () => {
      const response = await fetch(getTargetUrl('/api/v1/lessons/lesson-123/final-quiz/explain'), {
        method: 'POST',
      });

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data['q1']).toContain('The correct answer for');
      expect(data['q9']).toContain('open-ended'); // Fallback pentru null correctAnswer
    });
  });

  describe('GET /api/v1/subcapitols/:id/check-quiz', () => {
    it('should return a subcapitol check-quiz with NO time limit', async () => {
      const response = await fetch(getTargetUrl('/api/v1/subcapitols/sub-456/check-quiz'));

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.id).toBe('sub-456');
      expect(data.timeLimitSeconds).toBeNull();
    });
  });

  describe('POST /api/v1/subcapitols/:id/check-quiz/submit', () => {
    it('should return 0 score for empty or missing payload', async () => {
      const response = await fetch(getTargetUrl('/api/v1/subcapitols/sub-123/check-quiz/submit'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.score).toBe(0);
      expect(data.percentage).toBe(0);
      expect(data.passed).toBe(false);
      expect(data.attemptId).toContain('attempt-'); // Prefix generic pt check-quiz
    });

    it('should not award points for empty/whitespace short answers', async () => {
      const response = await fetch(getTargetUrl('/api/v1/subcapitols/sub-123/check-quiz/submit'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers: {
            q9: '    ', // Doar spatii
          },
        }),
      });

      const data = await response.json();
      expect(data.score).toBe(0);
    });
  });
});
