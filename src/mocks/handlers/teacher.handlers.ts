import { http, HttpResponse, delay } from 'msw';

const now = Date.now();
const dayMs = 24 * 60 * 60 * 1000;

const SUBJECTS = ['Math', 'Science', 'History', 'English', 'Geography', 'Art'];
const GRADES = [3, 4, 5, 6, 7, 8];
const STATUSES = ['PUBLISHED', 'DRAFT', 'ARCHIVED'] as const;

const TEACHER_LESSON_TITLES = [
  'Intro to Fractions',
  'Adding Fractions',
  'Multiplying Fractions',
  'Decimals & Percentages',
  'Photosynthesis Basics',
  'The Water Cycle',
  'Cells & Cell Theory',
  'World War II Overview',
  'Ancient Civilizations',
  'Industrial Revolution',
  'Essay Writing Basics',
  'Reading Comprehension',
  'Poetry Forms',
  'Continents & Oceans',
  'Climate Zones',
  'Map Reading',
  'Color Theory',
  'Drawing Fundamentals',
  'Long Division',
  'Geometry: Triangles',
  'Newton\'s Laws',
  'Solar System',
  'Civil Rights Movement',
  'Cold War Era',
  'Grammar Essentials',
  'Persuasive Writing',
  'Watercolor Techniques',
];

interface MockLesson {
  id: string;
  title: string;
  subject: string;
  grade: number;
  status: typeof STATUSES[number];
  lastModified: string;
}

const lessons: MockLesson[] = TEACHER_LESSON_TITLES.map((title, idx) => ({
  id: `lesson-${idx + 1}`,
  title,
  subject: SUBJECTS[idx % SUBJECTS.length],
  grade: GRADES[idx % GRADES.length],
  status: STATUSES[idx % STATUSES.length],
  lastModified: new Date(now - (idx % 14) * dayMs).toISOString(),
}));

const quizzes = [
  { id: 'quiz-1', title: 'Fractions Quiz', subject: 'Math', status: 'PUBLISHED', lastModified: new Date(now - dayMs).toISOString() },
  { id: 'quiz-2', title: 'Photosynthesis Check', subject: 'Science', status: 'DRAFT', lastModified: new Date(now - 2 * dayMs).toISOString() },
  { id: 'quiz-3', title: 'WWII Timeline', subject: 'History', status: 'PUBLISHED', lastModified: new Date(now - 3 * dayMs).toISOString() },
  { id: 'quiz-4', title: 'Grammar Basics', subject: 'English', status: 'DRAFT', lastModified: new Date(now - 4 * dayMs).toISOString() },
];

const recentActivity = [
  { id: 'act-1', type: 'updated',   contentTitle: 'Adding Fractions',     contentType: 'lesson', timestamp: new Date(now - 1 * 60 * 60 * 1000).toISOString() },
  { id: 'act-2', type: 'published', contentTitle: 'Fractions Quiz',       contentType: 'quiz',   timestamp: new Date(now - 4 * 60 * 60 * 1000).toISOString() },
  { id: 'act-3', type: 'created',   contentTitle: 'Geometry: Triangles',  contentType: 'lesson', timestamp: new Date(now - 1 * dayMs).toISOString() },
  { id: 'act-4', type: 'updated',   contentTitle: 'Solar System',         contentType: 'lesson', timestamp: new Date(now - 2 * dayMs).toISOString() },
  { id: 'act-5', type: 'archived',  contentTitle: 'Old Map Reading',      contentType: 'lesson', timestamp: new Date(now - 3 * dayMs).toISOString() },
];

const teacherClasses = [
  { id: 'cls-1', name: 'Math 101 - Period A', studentCount: 24, averageProgress: 78 },
  { id: 'cls-2', name: 'Math 101 - Period B', studentCount: 22, averageProgress: 64 },
  { id: 'cls-3', name: 'Science 7 - Period C', studentCount: 19, averageProgress: 81 },
  { id: 'cls-4', name: 'History 8 - Period D', studentCount: 26, averageProgress: 72 },
];

export const teacherHandlers = [
  http.get('/api/v1/teacher/:teacherId/dashboard', ({ params }) => {
    void params['teacherId'];
    return HttpResponse.json({
      lessons,
      quizzes,
      recentActivity,
      classes: teacherClasses,
    });
  }),

  http.get('/api/v1/lessons', ({ request }) => {
    const url = new URL(request.url);
    const search = (url.searchParams.get('search') ?? '').toLowerCase();
    const status = url.searchParams.get('status');
    const subject = url.searchParams.get('subject');
    const grade = url.searchParams.get('grade');
    const sortField = url.searchParams.get('sortField') ?? 'lastModified';
    const sortOrder = url.searchParams.get('sortOrder') === 'asc' ? 1 : -1;
    const page = Number.parseInt(url.searchParams.get('page') ?? '0', 10);
    const pageSize = Number.parseInt(url.searchParams.get('pageSize') ?? '20', 10);

    let filtered = [...lessons];
    if (search) {
      filtered = filtered.filter((l) => l.title.toLowerCase().includes(search));
    }
    if (status) filtered = filtered.filter((l) => l.status === status);
    if (subject) filtered = filtered.filter((l) => l.subject === subject);
    if (grade) filtered = filtered.filter((l) => String(l.grade) === grade);

    filtered.sort((a, b) => {
      const av = a[sortField as keyof MockLesson];
      const bv = b[sortField as keyof MockLesson];
      if (av == null || bv == null) return 0;
      if (av < bv) return -1 * sortOrder;
      if (av > bv) return 1 * sortOrder;
      return 0;
    });

    const total = filtered.length;
    const slice = filtered.slice(page * pageSize, page * pageSize + pageSize);

    return HttpResponse.json({ items: slice, total, page, pageSize });
  }),

  http.post('/api/v1/lessons', async ({ request }) => {
    const body = (await request.json()) as Partial<MockLesson>;
    const created: MockLesson = {
      id: `lesson-${crypto.randomUUID()}`,
      title: body.title ?? 'Untitled Lesson',
      subject: body.subject ?? 'General',
      grade: body.grade ?? 5,
      status: 'DRAFT',
      lastModified: new Date().toISOString(),
    };
    lessons.unshift(created);
    return HttpResponse.json(created, { status: 201 });
  }),

  http.put('/api/v1/lessons/:id', async ({ params, request }) => {
    const body = (await request.json()) as Partial<MockLesson>;
    const idx = lessons.findIndex((l) => l.id === params['id']);
    if (idx === -1) return HttpResponse.json({ message: 'Not found' }, { status: 404 });
    lessons[idx] = { ...lessons[idx], ...body, lastModified: new Date().toISOString() };
    return HttpResponse.json(lessons[idx]);
  }),

  http.patch('/api/v1/lessons/:id/publish', ({ params }) => {
    const idx = lessons.findIndex((l) => l.id === params['id']);
    if (idx === -1) return HttpResponse.json({ message: 'Not found' }, { status: 404 });
    lessons[idx] = { ...lessons[idx], status: 'PUBLISHED', lastModified: new Date().toISOString() };
    return HttpResponse.json(lessons[idx]);
  }),

  http.patch('/api/v1/lessons/:id/archive', ({ params }) => {
    const idx = lessons.findIndex((l) => l.id === params['id']);
    if (idx === -1) return HttpResponse.json({ message: 'Not found' }, { status: 404 });
    lessons[idx] = { ...lessons[idx], status: 'ARCHIVED', lastModified: new Date().toISOString() };
    return HttpResponse.json(lessons[idx]);
  }),

  http.patch('/api/v1/lessons/:id/unpublish', ({ params }) => {
    const idx = lessons.findIndex((l) => l.id === params['id']);
    if (idx === -1) return HttpResponse.json({ message: 'Not found' }, { status: 404 });
    lessons[idx] = { ...lessons[idx], status: 'DRAFT', lastModified: new Date().toISOString() };
    return HttpResponse.json(lessons[idx]);
  }),

  http.delete('/api/v1/lessons/:id', ({ params }) => {
    const idx = lessons.findIndex((l) => l.id === params['id']);
    if (idx === -1) return HttpResponse.json({ message: 'Not found' }, { status: 404 });
    lessons.splice(idx, 1);
    return new HttpResponse(null, { status: 204 });
  }),

  http.post('/api/v1/lessons/:id/duplicate', ({ params }) => {
    const original = lessons.find((l) => l.id === params['id']);
    if (!original) return HttpResponse.json({ message: 'Not found' }, { status: 404 });
    const copy: MockLesson = {
      ...original,
      id: `lesson-${crypto.randomUUID()}`,
      title: `${original.title} (Copy)`,
      status: 'DRAFT',
      lastModified: new Date().toISOString(),
    };
    lessons.unshift(copy);
    return HttpResponse.json(copy, { status: 201 });
  }),

  http.post('/api/v1/lessons/:id/media', async () => {
    // Simulate a 2.5 second network delay
    await delay(2500);

    // Return a mock asset URL. We use a placeholder image colored with your brand teal!
    return HttpResponse.json({
      url: 'https://placehold.co/600x400/0ABAB5/FFFFFF/png?text=Mock+Media+Asset'
    }, { status: 201 });
  }),
];
