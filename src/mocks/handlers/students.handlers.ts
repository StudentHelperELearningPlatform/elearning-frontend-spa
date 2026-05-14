// src/mocks/handlers/students.handlers.ts
import { http, HttpResponse } from 'msw';
import { environment } from '../../environments/environment';

const dashboardData = {
  student: {
    id: '1',
    firstName: 'Alex',
    totalLessons: 48,
    completedLessons: 12,
  },
  streak: {
    currentStreak: 5,
    longestStreak: 14,
    lastActivityDate: new Date().toISOString(),
  },
  skillLevels: [
    { subject: 'Math', level: 72 },
    { subject: 'Science', level: 58 },
    { subject: 'English', level: 85 },
    { subject: 'History', level: 43 },
    { subject: 'Geography', level: 61 },
  ],
  progressRecords: [
    {
      id: 'pr1',
      lessonId: '1',
      lessonTitle: 'Intro to Fractions',
      subject: 'Math',
      status: 'COMPLETED',
      completedModules: 4,
      totalModules: 4,
      lastAccessedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      thumbnailGradient: 'linear-gradient(135deg, #0ABAB5, #0891b2)',
    },
    {
      id: 'pr2',
      lessonId: '2',
      lessonTitle: 'Adding Fractions',
      subject: 'Math',
      status: 'IN_PROGRESS',
      completedModules: 2,
      totalModules: 5,
      lastAccessedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      thumbnailGradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    },
    {
      id: 'pr3',
      lessonId: '3',
      lessonTitle: 'The Water Cycle',
      subject: 'Science',
      status: 'IN_PROGRESS',
      completedModules: 1,
      totalModules: 3,
      lastAccessedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      thumbnailGradient: 'linear-gradient(135deg, #10b981, #059669)',
    },
  ],
  recentActivity: [
    {
      id: 'act1',
      type: 'lesson',
      title: 'Completed: Intro to Fractions',
      subject: 'Math',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      lessonId: '1',
    },
  ],
  milestones: [
    {
      id: 'm1',
      title: 'First Lesson',
      description: 'Complete your first lesson',
      category: 'learning',
      icon: 'pi-book',
      earnedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
  upcomingQuizzes: [],
};

const milestonesData = dashboardData.milestones;

export const studentsHandlers = [

  // GET Learning Path
  http.get(`${environment.userPlatformApiUrl}/learning-paths/:id`, ({ params }) => {
    return HttpResponse.json({
      id: params['id'],
      title: 'Mocked Angular Mastery Path',
      description: 'Calea mockată pentru dezvoltare locală.',
      totalLessons: 3,
      estimatedTotalTime: '1 hour',
      lessons: [
        { id: '1', title: 'Introducere', subject: 'Frontend', duration: '15 min', status: 'COMPLETED', score: 95 },
        { id: '2', title: 'Componente', subject: 'Frontend', duration: '20 min', status: 'AVAILABLE' },
        { id: '3', title: 'Servicii', subject: 'Frontend', duration: '25 min', status: 'LOCKED', prerequisiteTitle: 'Componente' },
      ],
    });
  }),

  // PUT Module Progress
  http.put(`${environment.userPlatformApiUrl}/lessons/:lessonId/progress`, async ({ request, params }) => {
    const body = await request.json() as { moduleId: string | number; completedAt: string };
    return HttpResponse.json({
      message: 'Progress recorded successfully',
      progressPercent: 33,
      completedModuleIds: [String(body.moduleId)],
      lessonId: params['lessonId'],
    }, { status: 200 });
  }),

  // GET Student Dashboard
  http.get('/api/v1/students/:id/dashboard', () => {
    return HttpResponse.json(dashboardData);
  }),

  // GET Student Milestones
  http.get('/api/v1/students/:id/milestones', () => {
    return HttpResponse.json(milestonesData);
  }),
];