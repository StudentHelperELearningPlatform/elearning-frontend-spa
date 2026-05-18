import { http, HttpResponse } from 'msw';

export interface MockEditorLesson {
  id: string;
  title: string;
  subject: string;
  grade: number | null;
  description: string;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  modules: { id: string; title: string; type: string; content: string }[];
}

export const editorLessonStore: { lessons: Map<string, MockEditorLesson> } = {
  lessons: new Map(),
};

const seed = (lesson: MockEditorLesson) => editorLessonStore.lessons.set(lesson.id, lesson);

seed({
  id: 'lesson-seed-1',
  title: 'Intro to Fractions',
  subject: 'Math',
  grade: 5,
  description: 'A short overview of fractions for grade 5.',
  status: 'DRAFT',
  modules: [
    { id: 'mod-1', title: 'What is a fraction?', type: 'text', content: '<p>Hello world.</p>' },
    { id: 'mod-2', title: 'Numerator vs denominator', type: 'text', content: '' },
  ],
});

const cloneLesson = (l: MockEditorLesson): MockEditorLesson => ({
  ...l,
  modules: l.modules.map((m) => ({ ...m })),
});

export const teacherLessonEditorHandlers = [
  http.get('/api/v1/lessons/:id', ({ params }) => {
    const lesson = editorLessonStore.lessons.get(String(params['id']));
    if (!lesson) return HttpResponse.json({ message: 'Not found' }, { status: 404 });
    return HttpResponse.json(cloneLesson(lesson));
  }),

  http.put('/api/v1/lessons/:id', async ({ params, request }) => {
    const body = (await request.json()) as Partial<MockEditorLesson>;
    const id = String(params['id']);
    const existing = editorLessonStore.lessons.get(id);
    if (!existing) return HttpResponse.json({ message: 'Not found' }, { status: 404 });
    const updated: MockEditorLesson = {
      ...existing,
      ...body,
      id,
      modules: body.modules ?? existing.modules,
    };
    editorLessonStore.lessons.set(id, updated);
    return HttpResponse.json(cloneLesson(updated));
  }),

  http.post('/api/v1/lessons', async ({ request }) => {
    const body = (await request.json()) as Partial<MockEditorLesson>;
    const id = `lesson-${crypto.randomUUID()}`;
    const created: MockEditorLesson = {
      id,
      title: body.title ?? 'Untitled Lesson',
      subject: body.subject ?? '',
      grade: body.grade ?? null,
      description: body.description ?? '',
      status: 'DRAFT',
      modules: body.modules ?? [],
    };
    editorLessonStore.lessons.set(id, created);
    return HttpResponse.json(cloneLesson(created), { status: 201 });
  }),

  // wired: endpoint live as of sprint 6 — backend uses POST not PATCH
  http.post('/api/v1/lessons/:id/publish', ({ params }) => {
    const id = String(params['id']);
    const existing = editorLessonStore.lessons.get(id);
    if (!existing) return HttpResponse.json({ message: 'Not found' }, { status: 404 });
    const updated: MockEditorLesson = { ...existing, status: 'PUBLISHED' };
    editorLessonStore.lessons.set(id, updated);
    return HttpResponse.json(cloneLesson(updated));
  }),

  // wired: endpoint live as of sprint 6 — backend uses POST not PATCH
  http.post('/api/v1/lessons/:id/unpublish', ({ params }) => {
    const id = String(params['id']);
    const existing = editorLessonStore.lessons.get(id);
    if (!existing) return HttpResponse.json({ message: 'Not found' }, { status: 404 });
    const updated: MockEditorLesson = { ...existing, status: 'DRAFT' };
    editorLessonStore.lessons.set(id, updated);
    return HttpResponse.json(cloneLesson(updated));
  }),
];
