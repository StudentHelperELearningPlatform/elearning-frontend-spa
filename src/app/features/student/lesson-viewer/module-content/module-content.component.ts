import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonComponent } from '../../../../shared/components/skeleton/skeleton.component';

@Component({
  selector: 'app-module-content',
  standalone: true,
  imports: [CommonModule, SkeletonComponent],
  template: `
    @if (loading()) {
      <div class="space-y-4">
        <app-skeleton height="2rem" width="60%" />
        <app-skeleton height="1rem" width="100%" />
        <app-skeleton height="1rem" width="100%" />
        <app-skeleton height="1rem" width="80%" />
      </div>
    } @else {
      <div class="prose prose-lg max-w-none prose-headings:font-black prose-headings:text-black prose-p:text-gray-800 prose-a:text-[var(--color-primary)] prose-a:font-bold prose-strong:text-black">
        <div [innerHTML]="content()"></div>
      </div>
    }
  `
})
export class ModuleContentComponent {
  content = input.required<string>();
  loading = input<boolean>(false);
}

