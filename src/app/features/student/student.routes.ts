// src/app/features/student/student.routes.ts
import { Routes } from '@angular/router';
import { ProgressDashboardComponent } from './progress-dashboard/progress-dashboard.component';
import { QuizPlayerComponent } from './quiz-player/quiz-player.component';
import { QuizHistoryComponent } from './quiz-history/quiz-history.component';
import { LessonListComponent } from './progress-dashboard/lesson-list/lesson-list.component';
import { MilestonesComponent } from './progress-dashboard/milestones/milestones.component';
import { LearningPathComponent } from './progress-dashboard/learning-path/learning-path.component';
import { quizCanDeactivate } from './quiz-player/quiz.can-deactivate.guard';

export default [
  { path: 'dashboard', component: ProgressDashboardComponent },
  { path: 'lessons', component: LessonListComponent },
  { path: 'milestones', component: MilestonesComponent },
  { path: 'learning-path', component: LearningPathComponent },
  { path: 'lesson-viewer', loadComponent: () => import('./lesson-viewer/lesson-viewer.component').then(m => m.LessonViewerComponent) },
  { path: 'lesson-viewer/:id', loadComponent: () => import('./lesson-viewer/lesson-viewer.component').then(m => m.LessonViewerComponent) },
  { path: 'quiz-player', component: QuizPlayerComponent, canDeactivate: [quizCanDeactivate] },
  { path: 'quiz-player/:id', component: QuizPlayerComponent, canDeactivate: [quizCanDeactivate] },
  { path: 'quizzes', component: QuizHistoryComponent },
  { path: 'quizzes/:id', component: QuizPlayerComponent, canDeactivate: [quizCanDeactivate] },
  { path: 'quizzes/:id/results/:attemptId', component: QuizPlayerComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
] as Routes;
