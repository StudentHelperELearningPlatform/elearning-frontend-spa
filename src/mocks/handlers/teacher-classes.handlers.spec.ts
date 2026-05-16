import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { setupServer } from 'msw/node';
import { teacherClassesHandlers } from './teacher-classes.handlers';

const getTargetUrl = (path: string) => {
  return `http://localhost${path}`;
};

describe('teacherClassesHandlers', () => {
  const server = setupServer(...teacherClassesHandlers);

  beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  describe('GET /api/v1/teachers/classes', () => {
    it('should return classes list', async () => {
      const url = getTargetUrl('/api/v1/teachers/classes');
      const response = await fetch(url);
      
      expect(response.status).toBe(200);
      const data = await response.json();
      
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
      expect(data[0].id).toBe('1');
    });
  });

  describe('POST /api/v1/teachers/classes', () => {
    it('should create a new class', async () => {
      const url = getTargetUrl('/api/v1/teachers/classes');
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'New Test Class', description: 'Test Desc' })
      });
      
      expect(response.status).toBe(200);
      const data = await response.json();
      
      expect(data.id).toBeDefined();
      expect(data.name).toBe('New Test Class');
      expect(data.description).toBe('Test Desc');
    });
    
    it('should create a new class with default values if not provided', async () => {
      const url = getTargetUrl('/api/v1/teachers/classes');
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });
      
      expect(response.status).toBe(200);
      const data = await response.json();
      
      expect(data.name).toBe('Untitled');
      expect(data.description).toBe('');
    });
  });

  describe('GET /api/v1/teachers/classes/:classId', () => {
    it('should return class detail', async () => {
      const url = getTargetUrl('/api/v1/teachers/classes/1');
      const response = await fetch(url);
      
      expect(response.status).toBe(200);
      const data = await response.json();
      
      expect(data.id).toBe('1');
      expect(data.students).toBeDefined();
      expect(data.lessons).toBeDefined();
    });
  });

  describe('PUT /api/v1/teachers/classes/:classId', () => {
    it('should update class', async () => {
      const url = getTargetUrl('/api/v1/teachers/classes/1');
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Updated Name' })
      });
      
      expect(response.status).toBe(200);
      const data = await response.json();
      
      expect(data.success).toBe(true);
    });
  });

  describe('DELETE /api/v1/teachers/classes/:classId', () => {
    it('should delete class', async () => {
      const url = getTargetUrl('/api/v1/teachers/classes/1');
      const response = await fetch(url, { method: 'DELETE' });
      
      expect(response.status).toBe(200);
      const data = await response.json();
      
      expect(data.success).toBe(true);
    });
  });

  describe('GET /api/v1/teachers/classes/:classId/students', () => {
    it('should return students for a class', async () => {
      const url = getTargetUrl('/api/v1/teachers/classes/1/students');
      const response = await fetch(url);
      
      expect(response.status).toBe(200);
      const data = await response.json();
      
      expect(Array.isArray(data)).toBe(true);
    });
    
    it('should return empty array for non-existent class', async () => {
      const url = getTargetUrl('/api/v1/teachers/classes/999/students');
      const response = await fetch(url);
      
      expect(response.status).toBe(200);
      const data = await response.json();
      
      expect(data).toEqual([]);
    });
  });

  describe('POST /api/v1/teachers/classes/:classId/students/:studentId', () => {
    it('should add student to a class', async () => {
      const url = getTargetUrl('/api/v1/teachers/classes/1/students/s3');
      const response = await fetch(url, { method: 'POST' });
      
      expect(response.status).toBe(200);
      const data = await response.json();
      
      expect(data.success).toBe(true);
    });
  });

  describe('DELETE /api/v1/teachers/classes/:classId/students/:studentId', () => {
    it('should remove student from a class', async () => {
      const url = getTargetUrl('/api/v1/teachers/classes/1/students/s1');
      const response = await fetch(url, { method: 'DELETE' });
      
      expect(response.status).toBe(200);
      const data = await response.json();
      
      expect(data.success).toBe(true);
    });
  });

  describe('GET /api/v1/teachers/classes/:classId/lessons', () => {
    it('should return lessons for a class', async () => {
      const url = getTargetUrl('/api/v1/teachers/classes/1/lessons');
      const response = await fetch(url);
      
      expect(response.status).toBe(200);
      const data = await response.json();
      
      expect(Array.isArray(data)).toBe(true);
    });
    
    it('should return empty array for non-existent class', async () => {
      const url = getTargetUrl('/api/v1/teachers/classes/999/lessons');
      const response = await fetch(url);
      
      expect(response.status).toBe(200);
      const data = await response.json();
      
      expect(data).toEqual([]);
    });
  });

  describe('POST /api/v1/teachers/classes/:classId/lessons/:lessonId', () => {
    it('should add lesson to a class', async () => {
      const url = getTargetUrl('/api/v1/teachers/classes/1/lessons/l3');
      const response = await fetch(url, { method: 'POST' });
      
      expect(response.status).toBe(200);
      const data = await response.json();
      
      expect(data.success).toBe(true);
    });
  });

  describe('DELETE /api/v1/teachers/classes/:classId/lessons/:lessonId', () => {
    it('should remove lesson from a class', async () => {
      const url = getTargetUrl('/api/v1/teachers/classes/1/lessons/l1');
      const response = await fetch(url, { method: 'DELETE' });
      
      expect(response.status).toBe(200);
      const data = await response.json();
      
      expect(data.success).toBe(true);
    });
  });
});
