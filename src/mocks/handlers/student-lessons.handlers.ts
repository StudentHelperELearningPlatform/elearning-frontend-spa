import { http, HttpResponse } from 'msw';
import { environment } from '../../environments/environment';

// Factory helpers to avoid SonarQube structural duplication flags
const createTextBlock = (id: string, orderIndex: number, content: string) => ({
  id,
  blockType: 'TEXT',
  orderIndex,
  content,
});

const createImageBlock = (id: string, orderIndex: number, content: string, mediaUrl: string) => ({
  id,
  blockType: 'IMAGE',
  orderIndex,
  content,
  mediaUrl,
});

const backendLessons: Record<string, unknown> = {
  '1': {
    id: 1,
    title: 'Intro to Fractions',
    subject: 'Math',
    grade: 5,
    difficultyLevel: 'Easy',
    estimatedDurationMinutes: 15,
    status: 'PUBLISHED',
    shortDescription:
      'Learn the basics of fractions — numerators, denominators, and how to read them.',
    subcapitols: [
      {
        id: 'sub-1-1',
        title: 'What is a fraction?',
        orderIndex: 0,
        blocks: [
          createTextBlock(
            'b-1-1',
            0,
            '<p>A <strong>fraction</strong> represents a part of a whole. It is written as two numbers separated by a line: the <em>numerator</em> (top) and the <em>denominator</em> (bottom).</p><p>For example, ¾ means 3 out of 4 equal parts.</p>',
          ),
          createImageBlock(
            'b-1-2',
            1,
            'A visual diagram of a fraction.',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Cake_quarters.svg/480px-Cake_quarters.svg.png',
          ),
        ],
      },
      {
        id: 'sub-1-2',
        title: 'Numerator and Denominator',
        orderIndex: 1,
        blocks: [
          createTextBlock(
            'b-1-3',
            0,
            '<p>The <strong>numerator</strong> tells you how many parts you have. The <strong>denominator</strong> tells you how many equal parts make up the whole.</p><ul><li>½ → 1 part out of 2</li><li>¾ → 3 parts out of 4</li><li>⅖ → 2 parts out of 5</li></ul>',
          ),
        ],
      },
      {
        id: 'sub-1-3',
        title: 'Practice: Identify the Parts',
        orderIndex: 2,
        blocks: [
          createTextBlock(
            'b-1-4',
            0,
            '<p>Look at the fraction <strong>5/8</strong>. The numerator is <strong>5</strong> and the denominator is <strong>8</strong>. This means we have 5 out of 8 equal parts.</p><p>Try writing three fractions of your own and identifying their parts.</p>',
          ),
        ],
      },
    ],
  },

  '2': {
    id: 2,
    title: 'The Water Cycle',
    subject: 'Science',
    grade: 4,
    difficultyLevel: 'Medium',
    estimatedDurationMinutes: 20,
    status: 'PUBLISHED',
    shortDescription:
      'Explore how water moves through our planet via evaporation, condensation, and precipitation.',
    subcapitols: [
      {
        id: 'sub-2-1',
        title: 'Evaporation',
        orderIndex: 0,
        blocks: [
          createTextBlock(
            'b-2-1',
            0,
            '<p><strong>Evaporation</strong> is the process where liquid water turns into water vapour due to heat from the sun. This happens at the surface of oceans, lakes, and rivers.</p>',
          ),
          createImageBlock(
            'b-2-2',
            1,
            'The water cycle diagram.',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Water_cycle.svg/800px-Water_cycle.svg.png',
          ),
        ],
      },
      {
        id: 'sub-2-2',
        title: 'Condensation & Precipitation',
        orderIndex: 1,
        blocks: [
          createTextBlock(
            'b-2-3',
            0,
            '<p><strong>Condensation</strong> occurs when water vapour cools and forms tiny droplets, creating clouds and fog.</p><p><strong>Precipitation</strong> is when the water falls back to Earth as rain, snow, sleet, or hail.</p>',
          ),
        ],
      },
    ],
  },

  '3': {
    id: 3,
    title: 'World War II Overview',
    subject: 'History',
    grade: 6,
    difficultyLevel: 'Medium',
    estimatedDurationMinutes: 25,
    status: 'PUBLISHED',
    shortDescription:
      'A comprehensive look at the key events, causes, and outcomes of the Second World War.',
    subcapitols: [
      {
        id: 'sub-3-1',
        title: 'Causes of the War',
        orderIndex: 0,
        blocks: [
          createTextBlock(
            'b-3-1',
            0,
            '<p>World War II (1939–1945) was caused by a combination of factors: the harsh terms of the <strong>Treaty of Versailles</strong>, the rise of fascism in Europe, the global economic depression, and the aggressive expansion policies of Nazi Germany, Fascist Italy, and Imperial Japan.</p>',
          ),
        ],
      },
      {
        id: 'sub-3-2',
        title: 'Key Events',
        orderIndex: 1,
        blocks: [
          createTextBlock(
            'b-3-2',
            0,
            '<ul><li><strong>1939</strong> — Germany invades Poland; UK and France declare war.</li><li><strong>1941</strong> — Japan attacks Pearl Harbor; USA enters the war.</li><li><strong>1944</strong> — D-Day: Allied forces land in Normandy.</li><li><strong>1945</strong> — Germany surrenders (May); Japan surrenders (September).</li></ul>',
          ),
        ],
      },
      {
        id: 'sub-3-3',
        title: 'Aftermath',
        orderIndex: 2,
        blocks: [
          createTextBlock(
            'b-3-3',
            0,
            '<p>The war resulted in an estimated 70–85 million deaths. It led to the founding of the <strong>United Nations</strong>, the beginning of the Cold War, and the decolonisation of much of Asia and Africa.</p>',
          ),
        ],
      },
    ],
  },
};

const lessonList = Object.values(backendLessons);

export const studentLessonsHandlers = [
  http.get(`${environment.lessonApiUrl}/api/v1/lessons`, () => {
    return HttpResponse.json(lessonList);
  }),

  http.get(`${environment.lessonApiUrl}/api/v1/lessons/:id`, ({ params }) => {
    const id = String(params['id']);
    const lesson = backendLessons[id];
    if (!lesson) {
      return HttpResponse.json({ message: 'Lesson not found' }, { status: 404 });
    }
    return HttpResponse.json(lesson);
  }),

  // Note: GET .../final-quiz/attempts has been removed from here because
  // it was perfectly duplicated in quizzes.handlers.ts where it belongs.

  http.put(`${environment.lessonApiUrl}/api/v1/lessons/:id/progress`, () => {
    return HttpResponse.json({ message: 'Progress saved' });
  }),
];
