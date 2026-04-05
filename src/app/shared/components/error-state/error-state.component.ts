import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-error-state',
  standalone: true,
  host: { style: 'display: contents' },
  imports: [CommonModule, ButtonComponent],
  template: `
    <div class="flex flex-col items-center justify-center p-8 border-2 border-black rounded-xl bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <span class="material-icons text-6xl text-black mb-4">error_outline</span>
      <h3 class="text-xl font-bold text-black mb-2">{{ title() }}</h3>
      <p class="text-gray-600 mb-6 text-center">{{ message() }}</p>
      @if (retryLabel()) {
        <app-button variant="primary" (btnClick)="retryClick.emit()">
          {{ retryLabel() }}
        </app-button>
      }
    </div>
  `
})
export class ErrorStateComponent {
  title = input<string>('Oops!');
  message = input<string>('Something went wrong.');
  retryLabel = input<string>('Retry');
  retryClick = output<void>();
}
