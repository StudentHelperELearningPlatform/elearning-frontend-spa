import { http, HttpResponse } from 'msw';

const mockLearningPath = {
  id: 'path-1',
  title: 'Mathematics Mastery',
  description:
    'A structured journey through core maths concepts from fractions to algebra. Complete each lesson in order to unlock the next stage.',
  totalLessons: 8,
  estimatedTotalTime: '4 hours',
  lessons: [
    {
      id: '1',
      title: 'Introduction to Fractions',
      subject: 'Math',
      duration: '20 min',
      status: 'COMPLETED',
      thumbnail: 'https://api.dicebear.com/7.x/shapes/svg?seed=1',
      score: 95,
    },
    {
      id: '2',
      title: 'Adding & Subtracting Fractions',
      subject: 'Math',
      duration: '25 min',
      status: 'COMPLETED',
      thumbnail: 'https://api.dicebear.com/7.x/shapes/svg?seed=2',
      score: 88,
    },
    {
      id: '3',
      title: 'Multiplying Fractions',
      subject: 'Math',
      duration: '20 min',
      status: 'COMPLETED',
      thumbnail: 'https://api.dicebear.com/7.x/shapes/svg?seed=3',
      score: 72,
    },
    {
      id: '4',
      title: 'Dividing Fractions',
      subject: 'Math',
      duration: '25 min',
      status: 'AVAILABLE',
      thumbnail: 'https://api.dicebear.com/7.x/shapes/svg?seed=4',
    },
    {
      id: '5',
      title: 'Fraction Word Problems',
      subject: 'Math',
      duration: '30 min',
      status: 'LOCKED',
      thumbnail: 'https://api.dicebear.com/7.x/shapes/svg?seed=5',
      prerequisiteTitle: 'Dividing Fractions',
    },
    {
      id: '6',
      title: 'Introduction to Decimals',
      subject: 'Math',
      duration: '20 min',
      status: 'LOCKED',
      thumbnail: 'https://api.dicebear.com/7.x/shapes/svg?seed=6',
      prerequisiteTitle: 'Fraction Word Problems',
    },
    {
      id: '7',
      title: 'Percentages Explained',
      subject: 'Math',
      duration: '25 min',
      status: 'LOCKED',
      thumbnail: 'https://api.dicebear.com/7.x/shapes/svg?seed=7',
      prerequisiteTitle: 'Introduction to Decimals',
    },
    {
      id: '8',
      title: 'Ratios & Proportions',
      subject: 'Math',
      duration: '30 min',
      status: 'LOCKED',
      thumbnail: 'https://api.dicebear.com/7.x/shapes/svg?seed=8',
      prerequisiteTitle: 'Percentages Explained',
    },
  ],
};

const mockLesson = (id: string) => ({
  id,
  title: 'Intro to Fractions',
  subject: 'Math',
  grade: 5,
  difficulty: 'Easy',
  duration: '20 min',
  status: 'Not Started',
  subcapitols: [
    {
      id: `${id}-sc1`,
      title: 'Introduction to Fractions',
      blocks: [
        {
          id: `${id}-m1`,
          title: 'What are fractions?',
          blockType: 'TEXT',
          content:
            '<h2>What are fractions?</h2><p>A <strong>fraction</strong> represents a part of a whole. It has a numerator and a denominator.</p>',
        },
        {
          id: `${id}-m2`,
          title: 'Types of fractions',
          blockType: 'VIDEO',
          content: '<p>Watch this short video to see fraction types explained visually.</p>',
          mediaUrl:
            'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        },
      ],
    },
    {
      id: `${id}-sc2`,
      title: 'Equivalent & Comparing Fractions',
      blocks: [
        {
          id: `${id}-m3`,
          title: 'Equivalent fractions',
          blockType: 'TEXT',
          content:
            '<p>Two fractions are <em>equivalent</em> when they represent the same value. For example, 1/2 = 2/4 = 3/6.</p>',
        },
        {
          id: `${id}-m4`,
          title: 'Comparing fractions',
          blockType: 'IMAGE',
          content: '<p>Use the number line below to compare fractions visually.</p>',
          mediaUrl: 'https://picsum.photos/seed/fractions/800/450',
        },
        {
          id: `${id}-m5`,
          title: 'Practice problems',
          blockType: 'TEXT',
          content:
            '<p>Try solving these on your own before moving on to the quiz.</p><ol><li>Simplify 4/8</li><li>Which is larger: 2/3 or 3/4?</li></ol>',
        },
      ],
    },
  ],
});

export const learningPathHandlers = [
  http.get('/api/v1/learning-paths/:id', ({ params }) => {
    return HttpResponse.json({ ...mockLearningPath, id: params['id'] as string });
  }),

  http.get('/api/v1/lessons/:id', ({ params }) => {
    return HttpResponse.json(mockLesson(params['id'] as string));
  }),

  http.put('/api/v1/lessons/:lessonId/progress', async ({ request }) => {
    const body = (await request.json()) as { blockId: string; completedAt: string };
    return HttpResponse.json({
      progressPercent: 40,
      completedBlockIds: [body.blockId],
    });
  }),
];
