import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  host: { style: 'display: contents' },
  imports: [CommonModule],
  template: `
    <div 
      class="animate-pulse bg-gray-200 rounded-xl" 
      [style.width]="width()" 
      [style.height]="height()"
      [class]="className()">
    </div>
  `
})
export class SkeletonComponent {
  width = input<string>('100%');
  height = input<string>('1rem');
  className = input<string>('');
}
