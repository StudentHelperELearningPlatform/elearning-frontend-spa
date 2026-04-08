import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  host: { style: 'display: contents' },
  imports: [CommonModule, ButtonComponent],
  template: `
    <div class="flex flex-col items-center justify-center p-12 text-center border-4 border-dashed border-black/20 rounded-3xl bg-white">
      @if (imageUrl()) {
        <img [src]="imageUrl()" alt="Empty" class="w-48 h-48 mb-6 object-contain drop-shadow-[4px_4px_0px_rgba(0,0,0,0.2)] hover:scale-105 transition-transform duration-300" referrerpolicy="no-referrer" />
      }
      @if (!imageUrl() && icon()) {
        <div class="w-24 h-24 bg-[var(--color-primary)] rounded-full border-2 border-black flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <span class="material-icons text-5xl text-white">{{ icon() }}</span>
        </div>
      }
      <h3 class="text-2xl font-bold text-black mb-2">{{ title() }}</h3>
      <p class="text-gray-600 mb-8 max-w-md text-lg">{{ description() }}</p>
      @if (actionLabel()) {
        <app-button (btnClick)="action.emit()" icon="add" size="lg">{{ actionLabel() }}</app-button>
      }
    </div>
  `
})
export class EmptyStateComponent {
  title = input.required<string>();
  description = input.required<string>();
  icon = input<string>('inbox');
  imageUrl = input<string>('');
  actionLabel = input<string>('');
  action = output<void>();
}

