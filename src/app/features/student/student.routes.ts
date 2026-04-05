// src/app/features/student/student.routes.ts
import { Routes } from '@angular/router';
import { ProgressDashboardComponent } from './progress-dashboard/progress-dashboard.component';
import { QuizPlayerComponent } from './quiz-player/quiz-player.component';

export default [
  { path: 'dashboard', component: ProgressDashboardComponent },
  { path: 'lesson-viewer', loadComponent: () => import('./lesson-viewer/lesson-viewer.component').then(m => m.LessonViewerComponent) },
  { path: 'lesson-viewer/:id', loadComponent: () => import('./lesson-viewer/lesson-viewer.component').then(m => m.LessonViewerComponent) },
  { path: 'quiz-player', component: QuizPlayerComponent },
  { path: 'quiz-player/:id', component: QuizPlayerComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
] as Routes;
