// src/app/features/teacher/teacher.routes.ts
import { Routes } from '@angular/router';
import { AnalyticsDashboardComponent } from './analytics-dashboard/analytics-dashboard.component';
import { ClassManagementComponent } from './class-management/class-management.component';
import { ContentEditorComponent } from './content-editor/content-editor.component';
import { QuizBuilderComponent } from './quiz-builder/quiz-builder.component';
import { LessonBuilderComponent } from './content-editor/lesson-builder/lesson-builder.component';
import { PathBuilderComponent } from './content-editor/path-builder/path-builder.component';

export default [
  { path: 'dashboard', component: AnalyticsDashboardComponent },
  { path: 'classes', component: ClassManagementComponent },
  { path: 'content', component: ContentEditorComponent },
  { path: 'lesson-builder', component: LessonBuilderComponent },
  { path: 'lesson-builder/:id', component: LessonBuilderComponent },
  { path: 'path-builder', component: PathBuilderComponent },
  { path: 'quiz-builder', component: QuizBuilderComponent },
  { path: 'quiz-builder/:id', component: QuizBuilderComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
] as Routes;
