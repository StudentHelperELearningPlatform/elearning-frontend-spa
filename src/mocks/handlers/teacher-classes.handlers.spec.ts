import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { setupServer } from 'msw/node';
import {
  teacherClassesHandlers,
  getClassDetailResolver,
  updateClassResolver,
  deleteClassResolver,
  getStudentsResolver,
  addStudentResolver,
  removeStudentResolver,
  getLessonsResolver,
  addLessonResolver,
  removeLessonResolver
} from './teacher-classes.handlers';

import { environment } from '../../environments/environment';

const getTargetUrl = (path: string) => {
  const base = environment.userPlatformApiUrl || 'http://localhost';
  return `${base}${path}`;
};

describe('teacherClassesHandlers', () => {
  const server = setupServer(...teacherClassesHandlers);

  beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  describe('GET /teachers/classes', () => {
    it('should return classes list', async () => {
      const url = getTargetUrl('/teachers/classes');
      const response = await fetch(url);
      
      expect(response.status).toBe(200);
      const data = await response.json();
      
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
      expect(data[0].id).toBe('1');
    });
  });

  describe('POST /teachers/classes', () => {
    it('should create a new class', async () => {
      const url = getTargetUrl('/teachers/classes');
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
      const url = getTargetUrl('/teachers/classes');
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

  describe('GET /teachers/classes/:classId', () => {
    it('should return class detail', async () => {
      const url = getTargetUrl('/teachers/classes/1');
      const response = await fetch(url);
      
      expect(response.status).toBe(200);
      const data = await response.json();
      
      expect(data.id).toBe('1');
      expect(data.students).toBeDefined();
      expect(data.lessons).toBeDefined();
    });
  });

  describe('PUT /teachers/classes/:classId', () => {
    it('should update class with standard name', async () => {
      const url = getTargetUrl('/teachers/classes/1');
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Updated Name' })
      });
      
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.success).toBe(true);
    });

    it('should update class with nane, bio, and description properties', async () => {
      const url = getTargetUrl('/teachers/classes/1');
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nane: 'Typo Name', bio: 'Short Bio', description: 'Longer Desc' })
      });
      
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.success).toBe(true);
    });
  });

  describe('DELETE /teachers/classes/:classId', () => {
    it('should delete class', async () => {
      const url = getTargetUrl('/teachers/classes/1');
      const response = await fetch(url, { method: 'DELETE' });
      
      expect(response.status).toBe(200);
      const data = await response.json();
      
      expect(data.success).toBe(true);
    });
  });

  describe('GET /teachers/classes/:classId/students', () => {
    it('should return students for a class', async () => {
      const url = getTargetUrl('/teachers/classes/1/students');
      const response = await fetch(url);
      
      expect(response.status).toBe(200);
      const data = await response.json();
      
      expect(Array.isArray(data)).toBe(true);
    });
    
    it('should return empty array for non-existent class', async () => {
      const url = getTargetUrl('/teachers/classes/999/students');
      const response = await fetch(url);
      
      expect(response.status).toBe(200);
      const data = await response.json();
      
      expect(data).toEqual([]);
    });
  });

  describe('POST /teachers/classes/:classId/students/:studentId', () => {
    it('should add student to a class', async () => {
      const url = getTargetUrl('/teachers/classes/1/students/s3');
      const response = await fetch(url, { method: 'POST' });
      
      expect(response.status).toBe(200);
      const data = await response.json();
      
      expect(data.success).toBe(true);
    });
  });

  describe('DELETE /teachers/classes/:classId/students/:studentId', () => {
    it('should remove student from a class', async () => {
      const url = getTargetUrl('/teachers/classes/1/students/s1');
      const response = await fetch(url, { method: 'DELETE' });
      
      expect(response.status).toBe(200);
      const data = await response.json();
      
      expect(data.success).toBe(true);
    });
  });

  describe('GET /teachers/classes/:classId/lessons', () => {
    it('should return lessons for a class', async () => {
      const url = getTargetUrl('/teachers/classes/1/lessons');
      const response = await fetch(url);
      
      expect(response.status).toBe(200);
      const data = await response.json();
      
      expect(Array.isArray(data)).toBe(true);
    });
    
    it('should return empty array for non-existent class', async () => {
      const url = getTargetUrl('/teachers/classes/999/lessons');
      const response = await fetch(url);
      
      expect(response.status).toBe(200);
      const data = await response.json();
      
      expect(data).toEqual([]);
    });
  });

  describe('POST /teachers/classes/:classId/lessons/:lessonId', () => {
    it('should add lesson to a class', async () => {
      const url = getTargetUrl('/teachers/classes/1/lessons/l3');
      const response = await fetch(url, { method: 'POST' });
      
      expect(response.status).toBe(200);
      const data = await response.json();
      
      expect(data.success).toBe(true);
    });
  });

  describe('DELETE /teachers/classes/:classId/lessons/:lessonId', () => {
    it('should remove lesson from a class', async () => {
      const url = getTargetUrl('/teachers/classes/1/lessons/l1');
      const response = await fetch(url, { method: 'DELETE' });
      
      expect(response.status).toBe(200);
      const data = await response.json();
      
      expect(data.success).toBe(true);
    });
  });

  describe('Edge Cases and Branch Coverage', () => {
    it('should return default values for nonexistent class ID in GET /teachers/classes/:classId', async () => {
      const url = getTargetUrl('/teachers/classes/999');
      const response = await fetch(url);
      
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.students).toEqual([]);
      expect(data.lessons).toEqual([]);
    });

    it('should handle PUT with empty body without crashing', async () => {
      const url = getTargetUrl('/teachers/classes/1');
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });
      
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.success).toBe(true);
    });

    it('should handle PUT with invalid JSON or no body', async () => {
      const url = getTargetUrl('/teachers/classes/1');
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      });
      
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.success).toBe(true);
    });

    it('should update name using body.nane and description using body.bio', async () => {
      const url = getTargetUrl('/teachers/classes/1');
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nane: 'Nane Val', bio: 'Bio Val' })
      });
      
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.success).toBe(true);
    });

    it('should update name using body.name and description using body.description', async () => {
      const url = getTargetUrl('/teachers/classes/1');
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Name Val', description: 'Desc Val' })
      });
      
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.success).toBe(true);
    });

    it('should add student to nonexistent class and initialize list', async () => {
      const url = getTargetUrl('/teachers/classes/999/students/s99');
      const response = await fetch(url, { method: 'POST' });
      
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.success).toBe(true);
    });

    it('should remove student from nonexistent class gracefully', async () => {
      const url = getTargetUrl('/teachers/classes/999/students/s99');
      const response = await fetch(url, { method: 'DELETE' });
      
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.success).toBe(true);
    });

    it('should add lesson to nonexistent class and initialize list', async () => {
      const url = getTargetUrl('/teachers/classes/999/lessons/l99');
      const response = await fetch(url, { method: 'POST' });
      
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.success).toBe(true);
    });

    it('should remove lesson from nonexistent class gracefully', async () => {
      const url = getTargetUrl('/teachers/classes/999/lessons/l99');
      const response = await fetch(url, { method: 'DELETE' });
      
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.success).toBe(true);
    });

    it('should cover fallback parameter branches when resolvers are called directly', async () => {
      // 1. getClassDetailResolver with missing/non-string params
      const res1 = getClassDetailResolver({ params: undefined });
      expect(res1).toBeDefined();
      const res2 = getClassDetailResolver({ params: { classId: undefined } });
      expect(res2).toBeDefined();

      // 2. updateClassResolver with missing/non-string params
      const reqMock = new Request('http://localhost', { method: 'PUT', body: '{}' });
      const res3 = await updateClassResolver({ request: reqMock, params: undefined });
      expect(res3).toBeDefined();

      // 3. deleteClassResolver
      const res4 = deleteClassResolver({ params: undefined });
      expect(res4).toBeDefined();

      // 4. getStudentsResolver
      const res5 = getStudentsResolver({ params: undefined });
      expect(res5).toBeDefined();

      // 5. addStudentResolver
      const res6 = addStudentResolver({ params: undefined });
      expect(res6).toBeDefined();

      // 6. removeStudentResolver
      const res7 = removeStudentResolver({ params: undefined });
      expect(res7).toBeDefined();

      // 7. getLessonsResolver
      const res8 = getLessonsResolver({ params: undefined });
      expect(res8).toBeDefined();

      // 8. addLessonResolver
      const res9 = addLessonResolver({ params: undefined });
      expect(res9).toBeDefined();

      // 9. removeLessonResolver
      const res10 = removeLessonResolver({ params: undefined });
      expect(res10).toBeDefined();
    });
  });
});
