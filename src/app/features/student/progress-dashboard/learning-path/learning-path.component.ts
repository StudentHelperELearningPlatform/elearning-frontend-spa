import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { BadgeComponent } from '../../../../shared/components/badge/badge.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { ErrorStateComponent } from '../../../../shared/components/error-state/error-state.component';
import { SkeletonComponent } from '../../../../shared/components/skeleton/skeleton.component';
import { LearningPathsStore } from '../../store/learning-paths.store';
import { PathLesson } from '../../../../shared/models/learning-path.model';

@Component({
  selector: 'app-learning-path',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CardComponent,
    BadgeComponent,
    ButtonComponent,
    EmptyStateComponent,
    ErrorStateComponent,
    SkeletonComponent,
  ],
  templateUrl: './learning-path.component.html',
})
export class LearningPathComponent implements OnInit {
  store = inject(LearningPathsStore);
  private route = inject(ActivatedRoute);

  private pathId = '';

  ngOnInit() {
    this.pathId = this.route.snapshot.paramMap.get('id') ?? '';
    if (this.pathId) {
      this.store.loadPath(this.pathId);
    }
  }

  reload() {
    if (this.pathId) {
      this.store.loadPath(this.pathId);
    }
  }

  cardClass(lesson: PathLesson): string {
    const parts: string[] = [];
    if (lesson.status === 'LOCKED') parts.push('opacity-60 grayscale');
    if (lesson.status === 'COMPLETED') parts.push('border-[#0ABAB5]');
    return parts.join(' ');
  }
}
