import { Component, inject, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SkeletonComponent } from '../../../../shared/components/skeleton/skeleton.component';

@Component({
  selector: 'app-module-content',
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
      <div class="prose prose-lg max-w-none prose-headings:font-black prose-headings:text-black prose-p:text-gray-800 prose-a:text-[#0ABAB5] prose-a:font-bold prose-strong:text-black overflow-visible">
        <div [innerHTML]="safeContent()"></div>
      </div>
    }
  `,
})
export class ModuleContentComponent {
  content = input<string>('');
  loading = input<boolean>(false);

  private sanitizer = inject(DomSanitizer);

  safeContent = computed((): SafeHtml =>
    this.sanitizer.bypassSecurityTrustHtml(this.content() ?? ''),
  );
}
