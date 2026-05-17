// src/app/features/student/student.routes.ts
import { Routes } from '@angular/router';
import { ProgressDashboardComponent } from './progress-dashboard/progress-dashboard.component';
import { QuizPlayerComponent } from './quiz-player/quiz-player.component';
import { ResultsSummaryComponent } from './quiz-player/results-summary/results-summary.component';
import { LessonListComponent } from './progress-dashboard/lesson-list/lesson-list.component';
import { MilestonesComponent } from './progress-dashboard/milestones/milestones.component';
import { LearningPathComponent } from './progress-dashboard/learning-path/learning-path.component';
import { quizCanDeactivate } from './quiz-player/quiz.can-deactivate.guard';
import { SkillDetailComponent } from './skill-detail/skill-detail.component';


export default [
  { path: 'dashboard', component: ProgressDashboardComponent },
  { path: 'lessons', component: LessonListComponent },
  { path: 'milestones', component: MilestonesComponent },
  {
    path: 'history',
    loadComponent: () =>
      import('./history/history.component').then((m) => m.HistoryComponent),
  },
  { path: 'learning-path', redirectTo: 'learning-paths/path-1', pathMatch: 'full' },
  { path: 'learning-paths/:id', component: LearningPathComponent },
  {
    path: 'lesson-viewer',
    loadComponent: () =>
      import('./lesson-viewer/lesson-viewer.component').then((m) => m.LessonViewerComponent),
  },
  {
    path: 'lesson-viewer/:id',
    loadComponent: () =>
      import('./lesson-viewer/lesson-viewer.component').then((m) => m.LessonViewerComponent),
  },
  {
    // E2 sprint alias — keep consistent with lesson-viewer/:id
    path: 'lessons/:id',
    loadComponent: () =>
      import('./lesson-viewer/lesson-viewer.component').then((m) => m.LessonViewerComponent),
  },
  // quiz-player is NOT directly accessible by URL — only via the lesson viewer's "Start Final Quiz" CTA
  // Navigation: LessonViewerComponent.startFinalQuiz() → router.navigate(['/student/quiz-player', lessonId])
  { path: 'quiz-player/:id', component: QuizPlayerComponent, canDeactivate: [quizCanDeactivate] },
  { path: 'quizzes/:id', component: QuizPlayerComponent, canDeactivate: [quizCanDeactivate] },
  { path: 'quizzes/:id/results/:attemptId', component: ResultsSummaryComponent },
  {
    path: 'payments',
    loadComponent: () =>
      import('./payments/payment-history.component').then((m) => m.PaymentHistoryComponent),
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
   {
    path: 'skills/:subject',
    component: SkillDetailComponent
  }
 /* {
  path: 'skills/:subject',
  loadComponent: () =>
    ('./skill-detail/skill-detail.component')
     .then(m => m.SkillDetailComponent)
   }*/
] as Routes;
