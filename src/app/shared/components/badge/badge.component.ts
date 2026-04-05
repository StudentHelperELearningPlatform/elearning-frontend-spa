import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-badge',
  standalone: true,
  host: { style: 'display: contents' },
  imports: [CommonModule],
  template: `
    <span [ngClass]="[
      'inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase tracking-wide',
      variantClasses[variant()]
    ]">
      @if (icon()) {
        <span class="material-icons text-[14px] mr-1">{{ icon() }}</span>
      }
      <ng-content></ng-content>
    </span>
  `
})
export class BadgeComponent {
  variant = input<'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'neutral'>('primary');
  icon = input<string>('');

  variantClasses = {
    primary: 'bg-[#0ABAB5] text-white',
    secondary: 'bg-white text-black',
    success: 'bg-green-500 text-white border-green-700',
    warning: 'bg-yellow-400 text-black border-yellow-600',
    danger: 'bg-red-500 text-white border-red-700',
    neutral: 'bg-gray-100 text-gray-600 border-gray-300'
  };
}
