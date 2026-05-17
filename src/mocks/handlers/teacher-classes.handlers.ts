import { http, HttpResponse } from 'msw';

import { environment } from '../../environments/environment';

const base = `${environment.userPlatformApiUrl}/teachers/classes`;

/**
 * TYPES
 */
interface Params {
  classId?: string;
  studentId?: string;
  lessonId?: string;
}

interface Student {
  id: string;
  name: string;
  email: string;
}

interface Lesson {
  id: string;
  title: string;
}

interface ClassItem {
  id: string;
  name: string;
  description: string;
  studentCount: number;
  lessonCount: number;
  createdAt: string;
}

interface MockRequest {
  params?: Params;
  body?: unknown;
}

/**
 * HELPERS
 */
function parseJsonBody(req: MockRequest): Record<string, unknown> {
  return (req.body as Record<string, unknown>) ?? {};
}

function getParam(
  params: Params | undefined,
  key: keyof Params,
): string {
  const value = params?.[key];

  return typeof value === 'string' ? value : '';
}

/**
 * MOCK DB
 */
let classes: ClassItem[] = [
  {
    id: '1',
    name: 'Math 101',
    description: 'Basic Math',
    studentCount: 2,
    lessonCount: 2,
    createdAt: new Date().toISOString(),
  },
];

const studentsByClass: Record<string, Student[]> = {
  '1': [
    { id: 's1', name: 'Alice', email: 'a@mail.com' },
    { id: 's2', name: 'Bob', email: 'b@mail.com' },
  ],
};

const lessonsByClass: Record<string, Lesson[]> = {
  '1': [
    { id: 'l1', title: 'Intro' },
    { id: 'l2', title: 'Algebra' },
  ],
};

/**
 * GET classes
 */
export const getClasses = http.get(base, () => {
  return HttpResponse.json(classes);
});

/**
 * CREATE class
 */
export const createClass = http.post(base, async ({ request }) => {
  const body = (await request.json()) as Record<string, unknown>;

  const newClass: ClassItem = {
    id: crypto.randomUUID(),
    name: (body['nane'] as string | undefined) ?? (body['name'] as string | undefined) ?? 'Untitled',
    description: (body['bio'] as string | undefined) ?? (body['description'] as string | undefined) ?? '',
    studentCount: 0,
    lessonCount: 0,
    createdAt: new Date().toISOString(),
  };

  classes.push(newClass);

  return HttpResponse.json(newClass);
});

/**
 * CLASS DETAIL
 */
export const getClassDetail = http.get(`${base}/:classId`, (req: MockRequest) => {
  const classId = getParam(req.params, 'classId');

  const found = classes.find((c) => c.id === classId);

  return HttpResponse.json({
    ...found,
    students: studentsByClass[classId] ?? [],
    lessons: lessonsByClass[classId] ?? [],
  });
});

/**
 * UPDATE class
 */
export const updateClass = http.put(`${base}/:classId`, async (req: MockRequest) => {
  const classId = getParam(req.params, 'classId');
  const body = parseJsonBody(req);

  const mappedUpdate: Partial<ClassItem> = {};
  if (body['nane'] !== undefined) {
    mappedUpdate.name = body['nane'] as string;
  }
  if (body['name'] !== undefined) {
    mappedUpdate.name = body['name'] as string;
  }
  if (body['bio'] !== undefined) {
    mappedUpdate.description = body['bio'] as string;
  }
  if (body['description'] !== undefined) {
    mappedUpdate.description = body['description'] as string;
  }

  classes = classes.map((c) =>
    c.id === classId ? { ...c, ...mappedUpdate } : c,
  );

  return HttpResponse.json({ success: true });
});

/**
 * DELETE class
 */
export const deleteClass = http.delete(`${base}/:classId`, (req: MockRequest) => {
  const classId = getParam(req.params, 'classId');

  classes = classes.filter((c) => c.id !== classId);

  return HttpResponse.json({ success: true });
});

/**
 * GET students
 */
export const getStudents = http.get(`${base}/:classId/students`, (req: MockRequest) => {
  const classId = getParam(req.params, 'classId');

  return HttpResponse.json(studentsByClass[classId] ?? []);
});

/**
 * ADD student
 */
export const addStudent = http.post(
  `${base}/:classId/students/:studentId`,
  (req: MockRequest) => {
    const classId = getParam(req.params, 'classId');
    const studentId = getParam(req.params, 'studentId');

    studentsByClass[classId] = [
      ...(studentsByClass[classId] ?? []),
      {
        id: studentId,
        name: 'New Student',
        email: 'test@mail.com',
      },
    ];

    return HttpResponse.json({ success: true });
  },
);

/**
 * REMOVE student
 */
export const removeStudent = http.delete(
  `${base}/:classId/students/:studentId`,
  (req: MockRequest) => {
    const classId = getParam(req.params, 'classId');
    const studentId = getParam(req.params, 'studentId');

    studentsByClass[classId] =
      studentsByClass[classId]?.filter((s) => s.id !== studentId) ?? [];

    return HttpResponse.json({ success: true });
  },
);

/**
 * GET lessons
 */
export const getLessons = http.get(`${base}/:classId/lessons`, (req: MockRequest) => {
  const classId = getParam(req.params, 'classId');

  return HttpResponse.json(lessonsByClass[classId] ?? []);
});

/**
 * ADD lesson
 */
export const addLesson = http.post(
  `${base}/:classId/lessons/:lessonId`,
  (req: MockRequest) => {
    const classId = getParam(req.params, 'classId');
    const lessonId = getParam(req.params, 'lessonId');

    lessonsByClass[classId] = [
      ...(lessonsByClass[classId] ?? []),
      {
        id: lessonId,
        title: 'New Lesson',
      },
    ];

    return HttpResponse.json({ success: true });
  },
);

/**
 * REMOVE lesson
 */
export const removeLesson = http.delete(
  `${base}/:classId/lessons/:lessonId`,
  (req: MockRequest) => {
    const classId = getParam(req.params, 'classId');
    const lessonId = getParam(req.params, 'lessonId');

    lessonsByClass[classId] =
      lessonsByClass[classId]?.filter((l) => l.id !== lessonId) ?? [];

    return HttpResponse.json({ success: true });
  },
);

/**
 * EXPORT
 */
export const teacherClassesHandlers = [
  getClasses,
  createClass,
  getClassDetail,
  updateClass,
  deleteClass,
  getStudents,
  addStudent,
  removeStudent,
  getLessons,
  addLesson,
  removeLesson,
];