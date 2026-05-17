import {
  Component,
  inject,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  ElementRef,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProgressStore } from '../store/progress.store';
import { AuthStore } from '../../auth/store/auth.store';
import { SkeletonComponent } from '../../../shared/components/skeleton/skeleton.component';
import { TimeAgoPipe } from '../../../shared/pipes/time-ago.pipe';
import { ActivityItem, ProgressRecord } from '@shared/models/progress.model';
import * as d3 from 'd3';

@Component({
  selector: 'app-progress-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, SkeletonComponent, TimeAgoPipe],
  templateUrl: './progress-dashboard.component.html',
})
export class ProgressDashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  progressStore = inject(ProgressStore);
  authStore = inject(AuthStore);
  router = inject(Router);

  // S6-stats-01: expose live dashboard signal for the aggregate stats card
  protected readonly myDashboard = this.progressStore.dashboard;

  @ViewChild('radarContainer') radarContainer!: ElementRef<HTMLDivElement>;

  private resizeObserver: ResizeObserver | null = null;

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

  get streakHasGoldGlow(): boolean {
    return this.progressStore.activeStreak() >= 7;
  }

  constructor() {
    effect(() => {
      const skills = this.progressStore.skillLevels().map(s => ({
        subject: s.subject,
        level: s.level,
      }));
      if (skills.length > 0 && this.radarContainer?.nativeElement) {
        this.renderRadarChart(skills);
      }
    });
  }

  ngOnInit() {
    // Use the authenticated student's own ID — guard against '1' placeholder
    // that would call the wrong account for unauthenticated/test states.
    const studentId = this.authStore.user()?.id;
    if (studentId) {
      this.progressStore.loadDashboard(studentId);
    }
    // S6-stats-01: also pull aggregate stats from the live /progress/me/dashboard endpoint
    this.progressStore.loadMyDashboard();
  }

  ngAfterViewInit() {
    const skills = this.progressStore.skillLevels().map(s => ({
      subject: s.subject,
      level: s.level,
    }));
    if (skills.length > 0 && this.radarContainer?.nativeElement) {
      this.renderRadarChart(skills);
    }

    this.resizeObserver = new ResizeObserver(() => {
      const skills = this.progressStore.skillLevels().map(s => ({
        subject: s.subject,
        level: s.level,
      }));
      if (skills.length > 0 && this.radarContainer?.nativeElement) {
        this.renderRadarChart(skills);
      }
    });
    if (this.radarContainer?.nativeElement) {
      this.resizeObserver.observe(this.radarContainer.nativeElement);
    }
  }

  ngOnDestroy() {
    this.resizeObserver?.disconnect();
  }

  renderRadarChart(skills: { subject: string; level: number }[]) {
    const el = this.radarContainer?.nativeElement;
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