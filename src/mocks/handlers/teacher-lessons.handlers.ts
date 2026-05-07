import { http, HttpResponse } from 'msw';

export interface MockTeacherLesson {
  id: string;
  title: string;
  subject: string;
  grade: number;
  status: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED';
  lastModified: string;
}

const SUBJECTS = ['Math', 'Science', 'History', 'English', 'Geography', 'Art', 'Music'];
const STATUSES: MockTeacherLesson['status'][] = ['PUBLISHED', 'DRAFT', 'ARCHIVED'];
const GRADES = [3, 4, 5, 6, 7, 8, 9];

const TITLES = [
  'Intro to Fractions',
  'Adding Fractions',
  'Multiplying Fractions',
  'Dividing Fractions',
  'Decimals & Percentages',
  'Long Division',
  'Geometry: Triangles',
  'Geometry: Circles',
  'Probability Basics',
  'Algebra Intro',
  'Photosynthesis Basics',
  'The Water Cycle',
  'Cells & Cell Theory',
  'Newton\'s Laws',
  'Solar System',
  'Climate Zones',
  'World War II Overview',
  'Cold War Era',
  'Ancient Civilizations',
  'Industrial Revolution',
  'Civil Rights Movement',
  'Essay Writing Basics',
  'Reading Comprehension',
  'Persuasive Writing',
  'Poetry Forms',
  'Map Reading',
  'Color Theory',
  'Drawing Fundamentals',
  'Watercolor Techniques',
  'Music Notation Basics',
];

const now = Date.now();
const dayMs = 24 * 60 * 60 * 1000;

export const teacherLessonsState: { lessons: MockTeacherLesson[] } = {
  lessons: TITLES.map((title, idx) => ({
    id: `lesson-${idx + 1}`,
    title,
    subject: SUBJECTS[idx % SUBJECTS.length],
    grade: GRADES[idx % GRADES.length],
    status: STATUSES[idx % STATUSES.length],
    lastModified: new Date(now - (idx % 21) * dayMs).toISOString(),
  })),
};

const compare = (a: unknown, b: unknown): number => {
  if (a == null && b == null) return 0;
  if (a == null) return -1;
  if (b == null) return 1;
  if (typeof a === 'number' && typeof b === 'number') return a - b;
  return String(a).localeCompare(String(b));
};

export const teacherLessonsHandlers = [
  http.get('/api/v1/lessons', ({ request }) => {
    const url = new URL(request.url);
    const search = (url.searchParams.get('search') ?? '').toLowerCase().trim();
    const status = url.searchParams.get('status');
    const subject = url.searchParams.get('subject');
    const grade = url.searchParams.get('grade');
    const sortField = url.searchParams.get('sortField') ?? 'lastModified';
    const sortOrder = url.searchParams.get('sortOrder') === 'asc' ? 1 : -1;
    const page = Number.parseInt(url.searchParams.get('page') ?? '0', 10);
    const pageSize = Number.parseInt(url.searchParams.get('pageSize') ?? '20', 10);

    let filtered = [...teacherLessonsState.lessons];
    if (search) filtered = filtered.filter((l) => l.title.toLowerCase().includes(search));
    if (status) filtered = filtered.filter((l) => l.status === status);
    if (subject) filtered = filtered.filter((l) => l.subject === subject);
    if (grade) filtered = filtered.filter((l) => String(l.grade) === grade);

    filtered.sort((a, b) => {
      const av = a[sortField as keyof MockTeacherLesson];
      const bv = b[sortField as keyof MockTeacherLesson];
      return compare(av, bv) * sortOrder;
    });

    const total = filtered.length;
    const items = filtered.slice(page * pageSize, page * pageSize + pageSize);
    return HttpResponse.json({ items, total, page, pageSize });
  }),

  http.post('/api/v1/lessons', async ({ request }) => {
    const body = (await request.json()) as Partial<MockTeacherLesson>;
    const created: MockTeacherLesson = {
      id: `lesson-${crypto.randomUUID()}`,
      title: body.title ?? 'Untitled Lesson',
      subject: body.subject ?? 'General',
      grade: body.grade ?? 5,
      status: 'DRAFT',
      lastModified: new Date().toISOString(),
    };
    teacherLessonsState.lessons.unshift(created);
    return HttpResponse.json(created, { status: 201 });
  }),

  http.post('/api/v1/lessons/:id/duplicate', ({ params }) => {
    const original = teacherLessonsState.lessons.find((l) => l.id === params['id']);
    if (!original) return HttpResponse.json({ message: 'Not found' }, { status: 404 });
    const copy: MockTeacherLesson = {
      ...original,
      id: `lesson-${crypto.randomUUID()}`,
      title: `${original.title} (Copy)`,
      status: 'DRAFT',
      lastModified: new Date().toISOString(),
    };
    teacherLessonsState.lessons.unshift(copy);
    return HttpResponse.json(copy, { status: 201 });
  }),

  http.patch('/api/v1/lessons/:id/publish', ({ params }) => {
    const idx = teacherLessonsState.lessons.findIndex((l) => l.id === params['id']);
    if (idx === -1) return HttpResponse.json({ message: 'Not found' }, { status: 404 });
    teacherLessonsState.lessons[idx] = {
      ...teacherLessonsState.lessons[idx],
      status: 'PUBLISHED',
      lastModified: new Date().toISOString(),
    };
    return HttpResponse.json(teacherLessonsState.lessons[idx]);
  }),

  http.patch('/api/v1/lessons/:id/archive', ({ params }) => {
    const idx = teacherLessonsState.lessons.findIndex((l) => l.id === params['id']);
    if (idx === -1) return HttpResponse.json({ message: 'Not found' }, { status: 404 });
    teacherLessonsState.lessons[idx] = {
      ...teacherLessonsState.lessons[idx],
      status: 'ARCHIVED',
      lastModified: new Date().toISOString(),
    };
    return HttpResponse.json(teacherLessonsState.lessons[idx]);
  }),

  http.patch('/api/v1/lessons/:id/unpublish', ({ params }) => {
    const idx = teacherLessonsState.lessons.findIndex((l) => l.id === params['id']);
    if (idx === -1) return HttpResponse.json({ message: 'Not found' }, { status: 404 });
    teacherLessonsState.lessons[idx] = {
      ...teacherLessonsState.lessons[idx],
      status: 'DRAFT',
      lastModified: new Date().toISOString(),
    };
    return HttpResponse.json(teacherLessonsState.lessons[idx]);
  }),

  http.delete('/api/v1/lessons/:id', ({ params }) => {
    const idx = teacherLessonsState.lessons.findIndex((l) => l.id === params['id']);
    if (idx === -1) return HttpResponse.json({ message: 'Not found' }, { status: 404 });
    teacherLessonsState.lessons.splice(idx, 1);
    return new HttpResponse(null, { status: 204 });
  }),
];
