import {
  Component,
  inject,
  OnInit,
  OnDestroy,
  ElementRef,
  effect,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { ProgressStore } from '../store/progress.store';
import { LessonsStore } from '../store/lessons.store';
import { AuthStore } from '../../auth/store/auth.store';
import { StudentProfileStore } from '../store/profile.store';
import { SkeletonComponent } from '../../../shared/components/skeleton/skeleton.component';
import { TimeAgoPipe } from '../../../shared/pipes/time-ago.pipe';
import { ActivityItem, ProgressRecord } from '@shared/models/progress.model';
import { TeacherClassService } from '../../../core/services/teacher-class.service';
import { TeacherClass } from '../../teacher/models/class.model';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as d3 from 'd3';

@Component({
  selector: 'app-progress-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, SkeletonComponent, TimeAgoPipe],
  templateUrl: './progress-dashboard.component.html',
})
export class ProgressDashboardComponent implements OnInit, OnDestroy {
  progressStore = inject(ProgressStore);
  lessonsStore = inject(LessonsStore);
  authStore = inject(AuthStore);
  profileStore = inject(StudentProfileStore);
  classService = inject(TeacherClassService);
  router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  enrolledClassesList = signal<TeacherClass[]>([]);
  classesLoading = signal(false);

  // Reactive read of ?classId= so navigation from "My Classes → View Class" scopes the dashboard.
  private readonly classIdFromQuery = toSignal(
    this.route.queryParamMap.pipe(map((p) => p.get('classId'))),
    { initialValue: this.route.snapshot.queryParamMap.get('classId') },
  );

  // S6-stats-01: expose live dashboard signal for the aggregate stats card
  protected readonly myDashboard = this.progressStore.dashboard;

  // Signal-based viewChild so the render effect re-fires when the chart container
  // mounts (it lives inside an @if branch that flips from loading → loaded).
  readonly radarContainer = viewChild<ElementRef<HTMLDivElement>>('radarContainer');

  private resizeObserver: ResizeObserver | null = null;
  private lastDispatchedClassId: string | null = null;
  private lastDispatchedLessonId: string | null = null;

  readonly motivationalMessages = [
    'Keep up the great work!',
    'Every lesson brings you closer.',
    'You are on fire today! 🔥',
    'Consistency is the key to mastery.',
    'Small steps lead to big results.',
  ];

  get greeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }

  get motivationalMessage(): string {
    const idx = new Date().getDate() % this.motivationalMessages.length;
    return this.motivationalMessages[idx];
  }

  get studentFirstName(): string {
    return this.progressStore.student()?.firstName ?? 'Student';
  }

  get initials(): string {
    return this.studentFirstName.charAt(0).toUpperCase();
  }

  get completedLessons(): number {
    return this.progressStore.student()?.completedLessons ?? 0;
  }

  get totalLessons(): number {
    return this.progressStore.student()?.totalLessons ?? 0;
  }

  get startedLessonsCount(): number {
    const dashboardStarted = this.myDashboard()?.totalLessons;
    if (dashboardStarted !== null && dashboardStarted !== undefined && dashboardStarted > 0) {
      return dashboardStarted;
    }

    const started = this.progressStore
      .myHistory()
      .filter((h) => h.status === 'in_progress' || h.status === 'completed' || h.dateCompleted != null);
    return new Set(started.map((h) => h.lessonId).filter(Boolean)).size;
  }

  get latestLessonTitle(): string | null {
    const latestLessonId = this.latestLessonId;
    if (!latestLessonId) return null;

    const fromHistory = this.progressStore
      .myHistory()
      .find(
        (h) =>
          h.lessonId === latestLessonId &&
          !!h.lessonTitle &&
          h.lessonTitle.trim().toLowerCase() !== 'untitled lesson',
      )?.lessonTitle;
    if (fromHistory) return fromHistory;

    const current = this.lessonsStore.lessons().find(l => String(l.id).toLowerCase() === String(latestLessonId).toLowerCase());
    if (current && current.title) {
      return current.title;
    }
    return null;
  }

  get latestLessonId(): string | null {
    const history = this.progressStore.myHistory();
    if (!history.length) return null;

    const sorted = [...history].sort((a, b) => {
      const aTimeRaw = new Date(a.dateCompleted ?? '').getTime();
      const bTimeRaw = new Date(b.dateCompleted ?? '').getTime();
      const aTime = Number.isFinite(aTimeRaw) ? aTimeRaw : 0;
      const bTime = Number.isFinite(bTimeRaw) ? bTimeRaw : 0;
      return bTime - aTime;
    });

    const latestWithId = sorted.find((h) => !!h.lessonId);
    return latestWithId?.lessonId || null;
  }

  get streakHasGoldGlow(): boolean {
    return this.progressStore.activeStreak() >= 7;
  }

  constructor() {
    effect(() => {
      const profile = this.profileStore.profile();
      const queryClassId = this.classIdFromQuery();
      if (!profile) {
        return;
      }
      this.classesLoading.set(true);

      untracked(() => {
        this.classService.getStudentClasses().pipe(
          catchError(() => of([]))
        ).subscribe(classes => {
          this.enrolledClassesList.set(classes);

          const firstClassId = classes[0]?.id;
          const dashboardClassId = queryClassId || firstClassId || '00000000-0000-0000-0000-000000000000';

          if (dashboardClassId !== this.lastDispatchedClassId) {
            this.lastDispatchedClassId = dashboardClassId;
            this.progressStore.loadMyDashboard({ classId: dashboardClassId });
          }

          this.classesLoading.set(false);
        });
      });
    });

    // Re-runs when skills change OR when the container ref becomes available.
    effect(() => {
      const skills = this.currentSkills();
      const containerRef = this.radarContainer();
      if (containerRef?.nativeElement) {
        this.renderRadarChart(skills);
      }
    });

    // Attach the ResizeObserver as soon as the container mounts.
    effect((onCleanup) => {
      const containerRef = this.radarContainer();
      const el = containerRef?.nativeElement;
      if (!el) {
        return;
      }
      const observer = new ResizeObserver(() => {
        this.renderRadarChart(this.currentSkills());
      });
      observer.observe(el);
      this.resizeObserver = observer;
      onCleanup(() => observer.disconnect());
    });

    effect(() => {
      const continueLesson = this.progressStore.continueLesson();
      if (continueLesson) {
        this.progressStore.loadMyLessonStats({ lessonId: continueLesson.lessonId });
      }
    });

    effect(() => {
      const latestLessonId = this.latestLessonId;
      if (latestLessonId && latestLessonId !== this.lastDispatchedLessonId) {
        this.lastDispatchedLessonId = latestLessonId;
        untracked(() => this.lessonsStore.loadLesson(latestLessonId));
      }
    });
  }

  ngOnInit() {
    this.profileStore.loadStudentProfile();
    this.progressStore.loadMyHistory();
  }

  ngOnDestroy() {
    this.resizeObserver?.disconnect();
  }

  private currentSkills(): { subject: string; level: number }[] {
    const skills = this.progressStore.skillLevels().map(s => ({
      subject: s.subject,
      level: s.level,
    }));
    if (skills.length === 0) {
      return [
        { subject: 'Math', level: 0 },
        { subject: 'Science', level: 0 },
        { subject: 'Literature', level: 0 },
        { subject: 'History', level: 0 },
      ];
    }
    return skills;
  }

  renderRadarChart(skills: { subject: string; level: number }[]) {
    const el = this.radarContainer()?.nativeElement;
    if (!el) return;

    d3.select(el).selectAll('*').remove();

    const containerWidth = el.clientWidth || 300;
    const size = Math.min(containerWidth, 320);
    const margin = 50;
    const radius = (size - margin * 2) / 2;
    const cx = size / 2;
    const cy = size / 2;

    const levels = 5;
    const angleSlice = (Math.PI * 2) / skills.length;
    const maxVal = 100;
    const rScale = d3.scaleLinear().domain([0, maxVal]).range([0, radius]);

    const svg = d3
      .select(el)
      .append('svg')
      .attr('width', size)
      .attr('height', size)
      .attr('aria-label', 'Skill radar chart')
      .append('g')
      .attr('transform', `translate(${cx},${cy})`);

    for (let lvl = 1; lvl <= levels; lvl++) {
      svg
        .append('circle')
        .attr('r', (radius / levels) * lvl)
        .attr('fill', 'none')
        .attr('stroke', '#e5e7eb')
        .attr('stroke-width', 1);
    }

    skills.forEach((_, i) => {
      const angle = angleSlice * i - Math.PI / 2;
      svg
        .append('line')
        .attr('x1', 0).attr('y1', 0)
        .attr('x2', radius * Math.cos(angle))
        .attr('y2', radius * Math.sin(angle))
        .attr('stroke', '#e5e7eb')
        .attr('stroke-width', 1);
    });

    const points = skills.map((d, i) => {
      const angle = angleSlice * i - Math.PI / 2;
      const r = rScale(d.level);
      return [r * Math.cos(angle), r * Math.sin(angle)];
    });

    const lineGenerator = d3
      .line<number[]>()
      .x((d) => d[0])
      .y((d) => d[1])
      .curve(d3.curveLinearClosed);

    svg
      .append('path')
      .datum(points)
      .attr('d', lineGenerator)
      .attr('fill', 'rgba(10, 186, 181, 0.2)')
      .attr('stroke', '#0ABAB5')
      .attr('stroke-width', 2);

    skills.forEach((d, i) => {
      const angle = angleSlice * i - Math.PI / 2;
      const r = rScale(d.level);
      svg
        .append('circle')
        .attr('cx', r * Math.cos(angle))
        .attr('cy', r * Math.sin(angle))
        .attr('r', 4)
        .attr('fill', '#0ABAB5')
        .attr('stroke', '#fff')
        .attr('stroke-width', 2);
    });

    const labelRadius = radius + 24;
    skills.forEach((d, i) => {
      const angle = angleSlice * i - Math.PI / 2;
      const x = labelRadius * Math.cos(angle);
      const y = labelRadius * Math.sin(angle);

      let textAnchor = 'end';
      if (Math.abs(x) < 5) {
        textAnchor = 'middle';
      } else if (x > 0) {
        textAnchor = 'start';
      }

      svg
        .append('text')
        .attr('x', x).attr('y', y)
        .attr('dy', '0.35em')
        .attr('text-anchor', textAnchor)
        .attr('font-size', '11px')
        .attr('font-weight', '700')
        .attr('fill', '#111')
        .text(`${d.subject} (${d.level})`);
    });
  }

  getActivityIcon(activity: ActivityItem): string {
    switch (activity.type) {
      case 'lesson': return 'menu_book';
      case 'quiz': return 'check_circle';
      case 'milestone': return 'star';
      default: return 'radio_button_checked';
    }
  }

  getActivityRoute(activity: ActivityItem): string[] {
    if (activity.type === 'lesson' && activity.lessonId) {
      return ['/student/lesson-viewer', activity.lessonId];
    }
    if (activity.type === 'quiz' && activity.quizId && activity.attemptId) {
      return ['/student/quizzes', activity.quizId, 'results', activity.attemptId];
    }
    return ['/student/dashboard'];
  }

  getContinueLessonProgress(lesson: ProgressRecord): number {
    if (!lesson.totalModules) return 0;
    return Math.round((lesson.completedModules / lesson.totalModules) * 100);
  }

  navigateToBrowseLessons() {
    this.router.navigate(['/student/lessons']);
  }
}