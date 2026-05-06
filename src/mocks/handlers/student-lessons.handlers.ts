import { http, HttpResponse } from 'msw';

/**
 * Returns lessons in the backend shape (subcapitols → blocks). The
 * frontend `mapLessonResponse` adapter normalises this into the
 * `modules` view-model. Disable this handler once the real lesson
 * endpoint is live on staging — see INT-01.
 */
const backendLessons: Record<string, unknown> = {
  '1': {
    id: 1,
    title: 'Intro to Fractions',
    subject: 'Math',
    grade: 5,
    difficulty: 'Easy',
    duration: '15 min',
    status: 'Not Started',
    subcapitols: [
      {
        id: 'sub-1-1',
        title: 'What are fractions?',
        blocks: [
          {
            id: 'b-1-1',
            blockType: 'TEXT',
            content: '<p>A fraction represents a part of a whole.</p>',
          },
          {
            id: 'b-1-2',
            blockType: 'VIDEO',
            content: 'Watch this short overview.',
            mediaUrl: 'https://example.com/fractions-intro.mp4',
          },
        ],
      },
      {
        id: 'sub-1-2',
        title: 'Practice',
        blocks: [
          {
            id: 'b-1-3',
            blockType: 'TEXT',
            content: '<p>Try identifying the numerator and denominator.</p>',
          },
        ],
      },
    ],
  },
  '2': {
    id: 2,
    title: 'Adding Fractions',
    subject: 'Math',
    grade: 5,
    difficulty: 'Medium',
    duration: '20 min',
    status: 'In Progress',
    subcapitols: [
      {
        id: 'sub-2-1',
        title: 'Adding like fractions',
        blocks: [
          {
            id: 'b-2-1',
            blockType: 'TEXT',
            content: '<p>Add the numerators when the denominators match.</p>',
          },
        ],
      },
    ],
  },
};

export const studentLessonsHandlers = [
  http.get('/api/v1/lessons/:id', ({ params }) => {
    const id = String(params['id']);
    const lesson = backendLessons[id];
    if (!lesson) {
      return HttpResponse.json({ message: 'Lesson not found' }, { status: 404 });
    }
    return HttpResponse.json(lesson);
  }),
];
