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
import { RouterModule } from '@angular/router';
import { ProgressStore } from '../store/progress.store';
import { AuthStore } from '../../auth/store/auth.store';
import { SkeletonComponent } from '../../../shared/components/skeleton/skeleton.component';
import * as d3 from 'd3';

@Component({
  selector: 'app-progress-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, SkeletonComponent],
  templateUrl: './progress-dashboard.component.html',
})
export class ProgressDashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  progressStore = inject(ProgressStore);
  authStore = inject(AuthStore);

  @ViewChild('radarContainer') radarContainer!: ElementRef<HTMLDivElement>;

  private resizeObserver: ResizeObserver | null = null;

  ngOnInit() {
    const studentId = this.authStore.user()?.id ?? '1';
    this.progressStore.loadDashboard(studentId);

    // Re-render radar when skill levels arrive
    effect(() => {
      const skills = this.progressStore.skillLevels();
      if (skills.length > 0 && this.radarContainer?.nativeElement) {
        this.renderRadarChart(skills);
      }
    });
  }

  ngAfterViewInit() {
    const skills = this.progressStore.skillLevels();
    if (skills.length > 0 && this.radarContainer?.nativeElement) {
      this.renderRadarChart(skills);
    }

    this.resizeObserver = new ResizeObserver(() => {
      const skills = this.progressStore.skillLevels();
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

  private renderRadarChart(skills: { subject: string; level: number }[]) {
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

    // Grid circles
    for (let lvl = 1; lvl <= levels; lvl++) {
      svg
        .append('circle')
        .attr('r', (radius / levels) * lvl)
        .attr('fill', 'none')
        .attr('stroke', '#e5e7eb')
        .attr('stroke-width', 1);
    }

    // Axis lines
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

    // Data polygon
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

    // Data dots
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

    // Labels
    const labelRadius = radius + 24;
    skills.forEach((d, i) => {
      const angle = angleSlice * i - Math.PI / 2;
      const x = labelRadius * Math.cos(angle);
      const y = labelRadius * Math.sin(angle);
      svg
        .append('text')
        .attr('x', x).attr('y', y)
        .attr('dy', '0.35em')
        .attr('text-anchor', Math.abs(x) < 5 ? 'middle' : x > 0 ? 'start' : 'end')
        .attr('font-size', '11px')
        .attr('font-weight', '700')
        .attr('fill', '#111')
        .text(`${d.subject} (${d.level})`);
    });
  }
}
