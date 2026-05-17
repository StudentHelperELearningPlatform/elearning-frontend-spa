import { http, HttpResponse } from 'msw';

import { environment } from '../../environments/environment';

const base = `${environment.userPlatformApiUrl}/teachers/classes`;

/**
 * TYPES
 */
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
export const getClassDetailResolver = ({ params }: { params?: Record<string, string | readonly string[] | undefined> }) => {
  const classId = typeof params?.['classId'] === 'string' ? params['classId'] : '';

  const found = classes.find((c) => c.id === classId);

  return HttpResponse.json({
    ...found,
    students: studentsByClass[classId] ?? [],
    lessons: lessonsByClass[classId] ?? [],
  });
};
export const getClassDetail = http.get(`${base}/:classId`, getClassDetailResolver);

/**
 * UPDATE class
 */
export const updateClassResolver = async ({ request, params }: { request: Request; params?: Record<string, string | readonly string[] | undefined> }) => {
  const classId = typeof params?.['classId'] === 'string' ? params['classId'] : '';
  
  let body: Record<string, unknown> = {};
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    body = {};
  }

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
};
export const updateClass = http.put(`${base}/:classId`, updateClassResolver);

/**
 * DELETE class
 */
export const deleteClassResolver = ({ params }: { params?: Record<string, string | readonly string[] | undefined> }) => {
  const classId = typeof params?.['classId'] === 'string' ? params['classId'] : '';

  classes = classes.filter((c) => c.id !== classId);

  return HttpResponse.json({ success: true });
};
export const deleteClass = http.delete(`${base}/:classId`, deleteClassResolver);

/**
 * GET students
 */
export const getStudentsResolver = ({ params }: { params?: Record<string, string | readonly string[] | undefined> }) => {
  const classId = typeof params?.['classId'] === 'string' ? params['classId'] : '';

  return HttpResponse.json(studentsByClass[classId] ?? []);
};
export const getStudents = http.get(`${base}/:classId/students`, getStudentsResolver);

/**
 * ADD student
 */
export const addStudentResolver = ({ params }: { params?: Record<string, string | readonly string[] | undefined> }) => {
  const classId = typeof params?.['classId'] === 'string' ? params['classId'] : '';
  const studentId = typeof params?.['studentId'] === 'string' ? params['studentId'] : '';

  studentsByClass[classId] = [
    ...(studentsByClass[classId] ?? []),
    {
      id: studentId,
      name: 'New Student',
      email: 'test@mail.com',
    },
  ];

  return HttpResponse.json({ success: true });
};
export const addStudent = http.post(
  `${base}/:classId/students/:studentId`,
  addStudentResolver,
);

/**
 * REMOVE student
 */
export const removeStudentResolver = ({ params }: { params?: Record<string, string | readonly string[] | undefined> }) => {
  const classId = typeof params?.['classId'] === 'string' ? params['classId'] : '';
  const studentId = typeof params?.['studentId'] === 'string' ? params['studentId'] : '';

  studentsByClass[classId] =
    studentsByClass[classId]?.filter((s) => s.id !== studentId) ?? [];

  return HttpResponse.json({ success: true });
};
export const removeStudent = http.delete(
  `${base}/:classId/students/:studentId`,
  removeStudentResolver,
);

/**
 * GET lessons
 */
export const getLessonsResolver = ({ params }: { params?: Record<string, string | readonly string[] | undefined> }) => {
  const classId = typeof params?.['classId'] === 'string' ? params['classId'] : '';

  return HttpResponse.json(lessonsByClass[classId] ?? []);
};
export const getLessons = http.get(`${base}/:classId/lessons`, getLessonsResolver);

/**
 * ADD lesson
 */
export const addLessonResolver = ({ params }: { params?: Record<string, string | readonly string[] | undefined> }) => {
  const classId = typeof params?.['classId'] === 'string' ? params['classId'] : '';
  const lessonId = typeof params?.['lessonId'] === 'string' ? params['lessonId'] : '';

  lessonsByClass[classId] = [
    ...(lessonsByClass[classId] ?? []),
    {
      id: lessonId,
      title: 'New Lesson',
    },
  ];

  return HttpResponse.json({ success: true });
};
export const addLesson = http.post(
  `${base}/:classId/lessons/:lessonId`,
  addLessonResolver,
);

/**
 * REMOVE lesson
 */
export const removeLessonResolver = ({ params }: { params?: Record<string, string | readonly string[] | undefined> }) => {
  const classId = typeof params?.['classId'] === 'string' ? params['classId'] : '';
  const lessonId = typeof params?.['lessonId'] === 'string' ? params['lessonId'] : '';

  lessonsByClass[classId] =
    lessonsByClass[classId]?.filter((l) => l.id !== lessonId) ?? [];

  return HttpResponse.json({ success: true });
};
export const removeLesson = http.delete(
  `${base}/:classId/lessons/:lessonId`,
  removeLessonResolver,
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