import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  host: { style: 'display: contents' },
  template: `
    <div [ngClass]="[
      'bg-white border-2 border-black rounded-3xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col',
      hoverable() ? 'transition-all duration-200 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] cursor-pointer' : '',
      selected() ? 'ring-2 ring-[var(--color-primary)] border-[var(--color-primary)] bg-[var(--color-primary)]/10' : '',
      customClass()
    ]">
      @if (header()) {
        <div class="px-6 py-4 border-b-2 border-black bg-gray-50 font-bold text-xl flex items-center justify-between">
          {{ header() }}
          <ng-content select="[card-header-action]"></ng-content>
        </div>
      }
      <div class="p-6 flex-1">
        <ng-content></ng-content>
      </div>
      @if (footer()) {
        <div class="px-6 py-4 border-t-2 border-black bg-gray-50">
          <ng-content select="[card-footer]"></ng-content>
        </div>
      }
    </div>
  `
})
export class CardComponent {
  header = input<string>('');
  footer = input<boolean>(false);
  hoverable = input<boolean>(false);
  selected = input<boolean>(false);
  customClass = input<string>('');
}
