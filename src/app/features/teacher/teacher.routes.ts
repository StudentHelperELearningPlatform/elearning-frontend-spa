// src/app/features/teacher/teacher.routes.ts
import { Routes } from '@angular/router';
import { AnalyticsDashboardComponent } from './analytics-dashboard/analytics-dashboard.component';
import { ClassManagementComponent } from './class-management/class-management.component';
import { ContentEditorComponent } from './content-editor/content-editor.component';
import { QuizBuilderComponent } from './quiz-builder/quiz-builder.component';
import { PathBuilderComponent } from './content-editor/path-builder/path-builder.component';
import { LearningPathEditorComponent } from './learning-paths/learning-path-editor/learning-path-editor.component';
import { LessonEditorComponent } from './lesson-editor/lesson-editor.component';
import { unsavedChangesGuard } from './lesson-editor/unsaved-changes.guard';
import { TeacherDashboardComponent } from './dashboard/teacher-dashboard.component';

export default [
  { path: 'dashboard', component: TeacherDashboardComponent },
  { path: 'analytics', component: AnalyticsDashboardComponent },
  { path: 'classes', component: ClassManagementComponent },
  { path: 'classes/:classId/stats', loadComponent: () => import('./class-stats/class-stats.component').then(m => m.ClassStatsComponent) },
  { path: 'classes/:classId/students/:studentId', loadComponent: () => import('./student-detail/student-detail.component').then(m => m.StudentDetailComponent) },
  { path: 'content', component: ContentEditorComponent },

  // Lesson Editor Routes (develop)
  {
    path: 'lessons/new',
    component: LessonEditorComponent,
    canDeactivate: [unsavedChangesGuard],
  },
  {
    path: 'lessons/:id/edit',
    component: LessonEditorComponent,
    canDeactivate: [unsavedChangesGuard],
  },

  // Builder Routes
  { path: 'path-builder', component: PathBuilderComponent },
  { path: 'quiz-builder', component: QuizBuilderComponent },
  { path: 'quiz-builder/:id', component: QuizBuilderComponent },

  // Learning Path Routes (develop / feat/E5-05)
  { path: 'learning-paths/new', component: LearningPathEditorComponent },
  { path: 'learning-paths/:id/edit', component: LearningPathEditorComponent },

  // Students Overview (S6 — Melora)
  {
    path: 'students',
    loadComponent: () =>
      import('./students-overview/teacher-students-overview.component')
        .then((m) => m.TeacherStudentsOverviewComponent),
  },
  {
    path: 'students/:studentId',
    loadComponent: () =>
      import('./student-detail/student-detail.component')
        .then((m) => m.StudentDetailComponent),
  },

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
] as Routes;