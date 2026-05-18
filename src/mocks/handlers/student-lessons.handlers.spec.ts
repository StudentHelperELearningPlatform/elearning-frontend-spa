import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { setupServer } from 'msw/node';
import { studentLessonsHandlers } from './student-lessons.handlers';
import { environment } from '../../environments/environment';

const getTargetUrl = (path: string) => {
  const base = environment.lessonApiUrl || 'http://localhost';
  return `${base}${path}`;
};

describe('studentLessonsHandlers', () => {
  const server = setupServer(...studentLessonsHandlers);

  beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should return a list of all published lessons', async () => {
    const response = await fetch(getTargetUrl('/api/v1/lessons'));

    expect(response.status).toBe(200);
    const data = await response.json();

    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(3);
    expect(data[0].title).toBe('Intro to Fractions');
    expect(data[1].title).toBe('The Water Cycle');
  });

  it('should return a specific lesson successfully if the ID exists', async () => {
    const response = await fetch(getTargetUrl('/api/v1/lessons/1'));

    expect(response.status).toBe(200);
    const data = await response.json();

    expect(data.id).toBe(1);
    expect(data.title).toBe('Intro to Fractions');
    expect(data.subcapitols).toBeDefined();
    expect(data.subcapitols.length).toBe(3);
  });

  it('should return a 404 error if the lesson ID is not found', async () => {
    const response = await fetch(getTargetUrl('/api/v1/lessons/999'));

    expect(response.status).toBe(404);
    const data = await response.json();

    expect(data.message).toBe('Lesson not found');
  });

  it('should return success message when saving progress', async () => {
    const response = await fetch(getTargetUrl('/api/v1/lessons/1/progress'), {
      method: 'PUT',
    });

    expect(response.status).toBe(200);
    const data = await response.json();

    expect(data.message).toBe('Progress saved');
  });
});
