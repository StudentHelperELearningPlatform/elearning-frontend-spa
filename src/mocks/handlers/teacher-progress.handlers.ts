import { http, HttpResponse } from 'msw';
import { environment } from '../../environments/environment';
import { ClassStatsSummary, StudentProgressRow, StudentDetail, LessonBreakdown } from '../../app/features/teacher/store/progress.store';

const now = Date.now();
const dayMs = 24 * 60 * 60 * 1000;

// Mock data for class stats
const mockClassStatsSummary: ClassStatsSummary = {
  classId: 'cls-1',
  className: 'Math 101 - Period A',
  totalStudents: 24,
  activeStudents: 20,
  averageScore: 78,
  completionRate: 65,
};

const mockClassStudents: StudentProgressRow[] = [
  { studentId: 'stu-1', studentName: 'Alice Smith', lessonsCompleted: 12, averageScore: 92, lastActive: new Date(now - dayMs).toISOString() },
  { studentId: 'stu-2', studentName: 'Bob Johnson', lessonsCompleted: 8, averageScore: 75, lastActive: new Date(now - 3 * dayMs).toISOString() },
  { studentId: 'stu-3', studentName: 'Charlie Brown', lessonsCompleted: 15, averageScore: 88, lastActive: new Date(now - 12 * 60 * 60 * 1000).toISOString() },
  { studentId: 'stu-4', studentName: 'Diana Prince', lessonsCompleted: 10, averageScore: 81, lastActive: new Date(now - 5 * dayMs).toISOString() },
  { studentId: 'stu-5', studentName: 'Evan Wright', lessonsCompleted: 2, averageScore: 45, lastActive: new Date(now - 20 * dayMs).toISOString() },
  { studentId: 'stu-6', studentName: 'Fiona Gallagher', lessonsCompleted: 14, averageScore: 95, lastActive: new Date(now - 2 * dayMs).toISOString() },
  { studentId: 'stu-7', studentName: 'George Costanza', lessonsCompleted: 5, averageScore: 60, lastActive: new Date(now - 8 * dayMs).toISOString() },
  { studentId: 'stu-8', studentName: 'Hannah Abbott', lessonsCompleted: 11, averageScore: 85, lastActive: new Date(now - dayMs).toISOString() },
  { studentId: 'stu-9', studentName: 'Ian Malcolm', lessonsCompleted: 9, averageScore: 78, lastActive: new Date(now - 4 * dayMs).toISOString() },
  { studentId: 'stu-10', studentName: 'Jessica Jones', lessonsCompleted: 13, averageScore: 89, lastActive: new Date(now - 6 * dayMs).toISOString() },
  { studentId: 'stu-11', studentName: 'Kevin Malone', lessonsCompleted: 4, averageScore: 55, lastActive: new Date(now - 15 * dayMs).toISOString() },
];

const mockLessonHistory: LessonBreakdown[] = [
  { lessonId: 'l-1', lessonTitle: 'Intro to Fractions', status: 'COMPLETED', score: 95, dateCompleted: new Date(now - 5 * dayMs).toISOString() },
  { lessonId: 'l-2', lessonTitle: 'Adding Fractions', status: 'COMPLETED', score: 88, dateCompleted: new Date(now - 2 * dayMs).toISOString() },
  { lessonId: 'l-3', lessonTitle: 'Multiplying Fractions', status: 'IN_PROGRESS', score: null, dateCompleted: null },
  { lessonId: 'l-4', lessonTitle: 'Decimals & Percentages', status: 'NOT_STARTED', score: null, dateCompleted: null },
];

export const teacherProgressHandlers = [
  // GET /api/v1/progress/professor/class-stats
  http.get(`${environment.userPlatformApiUrl}/api/v1/progress/professor/class-stats`, ({ request }) => {
    const url = new URL(request.url);
    const classId = url.searchParams.get('classId') || 'cls-1';

    return HttpResponse.json({
      summary: {
        ...mockClassStatsSummary,
        classId
      },
      students: mockClassStudents
    });
  }),

  // GET /api/v1/progress/professor/students/:studentId
  http.get(`${environment.userPlatformApiUrl}/api/v1/progress/professor/students/:studentId`, ({ params }) => {
    const studentId = String(params['studentId']);
    const student = mockClassStudents.find(s => s.studentId === studentId) || mockClassStudents[0];

    const detail: StudentDetail = {
      studentId: student.studentId,
      studentName: student.studentName,
      totalLessonsCompleted: student.lessonsCompleted,
      averageScore: student.averageScore,
      lastActive: student.lastActive,
      history: mockLessonHistory,
    };

    return HttpResponse.json(detail);
  }),

  // GET /api/v1/progress/professor/students
  http.get(`${environment.userPlatformApiUrl}/api/v1/progress/professor/students`, () => {
    // Return all mock students
    return HttpResponse.json(mockClassStudents);
  }),
];
