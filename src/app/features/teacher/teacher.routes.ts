// src/app/features/teacher/teacher.routes.ts
// src/app/features/teacher/teacher.routes.ts
import { Routes } from '@angular/router';
import { AnalyticsDashboardComponent } from './analytics-dashboard/analytics-dashboard.component';
import { ContentEditorComponent } from './content-editor/content-editor.component';
import { PathBuilderComponent } from './content-editor/path-builder/path-builder.component';

// From feat/E5-05-learning-path-builder
import { LearningPathEditorComponent } from './learning-paths/learning-path-editor/learning-path-editor.component';

// From develop
import { LessonEditorComponent } from './lesson-editor/lesson-editor.component';
import { unsavedChangesGuard } from './lesson-editor/unsaved-changes.guard';
import { TeacherDashboardComponent } from './dashboard/teacher-dashboard.component';
import { LessonListComponent } from './lesson-list/lesson-list.component';

import { TeacherClassesPageComponent } from './pages/teacher-classes-page/teacher-classes-page.component';
import { TeacherClassDetailPageComponent } from './pages/teacher-class-detail-page/teacher-class-detail-page.component';

export default [
  { path: 'dashboard', component: TeacherDashboardComponent },
  { path: 'analytics', component: AnalyticsDashboardComponent },
  { path: 'content', component: ContentEditorComponent },
  { path: 'profile', loadComponent: () => import('./profile/teacher-profile.component').then((m) => m.TeacherProfileComponent) },
  
  // Lesson Editor Routes (from develop)
  { path: 'lessons', component: LessonListComponent },
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
  
  
  // Learning Path Routes (from feat branch)
  { path: 'learning-paths/new', component: LearningPathEditorComponent },
  { path: 'learning-paths/:id/edit', component: LearningPathEditorComponent },
  
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'classes', component: TeacherClassesPageComponent },
  { path: 'classes/:classId', component: TeacherClassDetailPageComponent },
  {
    path: 'chat',
    loadComponent: () =>
      import('@features/shared/chat/chat-page.component').then((m) => m.ChatPageComponent),
  },
] as Routes;