import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { setupServer } from 'msw/node';
import { teacherProgressHandlers } from './teacher-progress.handlers';
import { environment } from '../../environments/environment';

// Utility pentru a ne asigura că URL-ul este absolut (Node fetch necesită URL-uri absolute),
// chiar dacă environment.userPlatformApiUrl este un string gol.
const getTargetUrl = (path: string) => {
  const base = environment.userPlatformApiUrl || 'http://localhost';
  return `${base}${path}`;
};

describe('teacherProgressHandlers', () => {
  const server = setupServer(...teacherProgressHandlers);

  beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  describe('GET /api/v1/progress/professor/class-stats', () => {
    it('should return default class stats summary and students when no classId is provided', async () => {
      const url = getTargetUrl('/api/v1/progress/professor/class-stats');
      const response = await fetch(url);
      
      expect(response.status).toBe(200);
      const data = await response.json();
      
      expect(data.summary).toBeDefined();
      expect(data.summary.classId).toBe('cls-1');
      expect(data.students).toBeDefined();
      expect(data.students.length).toBe(11);
    });

    it('should use the provided classId query parameter in the summary', async () => {
      const url = getTargetUrl('/api/v1/progress/professor/class-stats?classId=custom-class-99');
      const response = await fetch(url);
      
      expect(response.status).toBe(200);
      const data = await response.json();
      
      expect(data.summary.classId).toBe('custom-class-99');
    });
  });

  describe('GET /api/v1/progress/professor/students/:studentId', () => {
    it('should return specific student detail if the studentId exists', async () => {
      const url = getTargetUrl('/api/v1/progress/professor/students/stu-2');
      const response = await fetch(url);
      
      expect(response.status).toBe(200);
      const data = await response.json();
      
      expect(data.studentId).toBe('stu-2');
      expect(data.studentName).toBe('Bob Johnson');
      expect(data.history).toBeDefined();
      expect(data.history.length).toBe(4);
    });

    it('should fallback to the first student if the studentId is not found', async () => {
      const url = getTargetUrl('/api/v1/progress/professor/students/non-existent-student-id');
      const response = await fetch(url);
      
      expect(response.status).toBe(200);
      const data = await response.json();
      
      // Fallback-ul din handler returnează primul student ('stu-1', 'Alice Smith')
      expect(data.studentId).toBe('stu-1');
      expect(data.studentName).toBe('Alice Smith');
    });
  });

  describe('GET /api/v1/progress/professor/students', () => {
    it('should return the full list of mock students', async () => {
      const url = getTargetUrl('/api/v1/progress/professor/students');
      const response = await fetch(url);
      
      expect(response.status).toBe(200);
      const data = await response.json();
      
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBe(11);
      expect(data[0].studentId).toBe('stu-1');
    });
  });
});