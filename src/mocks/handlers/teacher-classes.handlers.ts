import { http, HttpResponse } from 'msw';

const base = '/api/v1/teachers/classes';

/**
 * SAFE HELPERS
 */
function parseJsonBody(req: any) {
  return req.body ?? {};
}

function getParam(params: any, key: string) {
  return params?.[key];
}

/**
 * MOCK DB
 */
let classes = [
  {
    id: '1',
    name: 'Math 101',
    description: 'Basic Math',
    studentCount: 2,
    lessonCount: 2,
    createdAt: new Date().toISOString(),
  },
];

let studentsByClass: Record<string, any[]> = {
  '1': [
    { id: 's1', name: 'Alice', email: 'a@mail.com' },
    { id: 's2', name: 'Bob', email: 'b@mail.com' },
  ],
};

let lessonsByClass: Record<string, any[]> = {
  '1': [
    { id: 'l1', title: 'Intro' },
    { id: 'l2', title: 'Algebra' },
  ],
};

/**
 * 1. GET classes
 */
export const getClasses = http.get(base, () => {
  return HttpResponse.json(classes);
});

/**
 * 2. POST create class
 */
export const createClass = http.post(base, async (req) => {
  const body = parseJsonBody(req);

  const newClass = {
    id: crypto.randomUUID(),
    name: body?.name ?? 'Untitled',
    description: body?.description ?? '',
    studentCount: 0,
    lessonCount: 0,
    createdAt: new Date().toISOString(),
  };

  classes.push(newClass);

  return HttpResponse.json(newClass);
});

/**
 * 3. GET class detail
 */
export const getClassDetail = http.get(`${base}/:classId`, (req: any) => {
  const classId = getParam(req.params, 'classId');

  const found = classes.find((c) => c.id === classId);

  return HttpResponse.json({
    ...found,
    students: studentsByClass[classId] ?? [],
    lessons: lessonsByClass[classId] ?? [],
  });
});

/**
 * 4. PUT update class
 */
export const updateClass = http.put(`${base}/:classId`, async (req: any) => {
  const classId = getParam(req.params, 'classId');
  const body = parseJsonBody(req);

  classes = classes.map((c) =>
    c.id === classId ? { ...c, ...body } : c,
  );

  return HttpResponse.json({ success: true });
});

/**
 * 5. DELETE class
 */
export const deleteClass = http.delete(`${base}/:classId`, (req: any) => {
  const classId = getParam(req.params, 'classId');

  classes = classes.filter((c) => c.id !== classId);

  return HttpResponse.json({ success: true });
});

/**
 * 6. GET students
 */
export const getStudents = http.get(`${base}/:classId/students`, (req: any) => {
  const classId = getParam(req.params, 'classId');
  return HttpResponse.json(studentsByClass[classId] ?? []);
});

/**
 * 7. POST add student
 */
export const addStudent = http.post(
  `${base}/:classId/students/:studentId`,
  (req: any) => {
    const classId = getParam(req.params, 'classId');
    const studentId = getParam(req.params, 'studentId');

    studentsByClass[classId] = [
      ...(studentsByClass[classId] ?? []),
      { id: studentId, name: 'New Student', email: 'test@mail.com' },
    ];

    return HttpResponse.json({ success: true });
  },
);

/**
 * 8. DELETE student
 */
export const removeStudent = http.delete(
  `${base}/:classId/students/:studentId`,
  (req: any) => {
    const classId = getParam(req.params, 'classId');
    const studentId = getParam(req.params, 'studentId');

    studentsByClass[classId] =
      studentsByClass[classId]?.filter((s) => s.id !== studentId) ?? [];

    return HttpResponse.json({ success: true });
  },
);

/**
 * 9. GET lessons
 */
export const getLessons = http.get(`${base}/:classId/lessons`, (req: any) => {
  const classId = getParam(req.params, 'classId');
  return HttpResponse.json(lessonsByClass[classId] ?? []);
});

/**
 * 10. POST add lesson
 */
export const addLesson = http.post(
  `${base}/:classId/lessons/:lessonId`,
  (req: any) => {
    const classId = getParam(req.params, 'classId');
    const lessonId = getParam(req.params, 'lessonId');

    lessonsByClass[classId] = [
      ...(lessonsByClass[classId] ?? []),
      { id: lessonId, title: 'New Lesson' },
    ];

    return HttpResponse.json({ success: true });
  },
);

/**
 * 11. DELETE lesson
 */
export const removeLesson = http.delete(
  `${base}/:classId/lessons/:lessonId`,
  (req: any) => {
    const classId = getParam(req.params, 'classId');
    const lessonId = getParam(req.params, 'lessonId');

    lessonsByClass[classId] =
      lessonsByClass[classId]?.filter((l) => l.id !== lessonId) ?? [];

    return HttpResponse.json({ success: true });
  },
);

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