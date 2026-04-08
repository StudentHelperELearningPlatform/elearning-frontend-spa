// src/app/shared/components/form-field/form-field.component.ts
import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  standalone: true,
  host: { style: 'display: contents' },
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="space-y-2">
      <label [for]="id()" class="block text-lg font-black text-black mb-2 uppercase tracking-tight">{{ label() }}</label>
      <div class="relative group">
        <ng-content></ng-content>
        @if (icon()) {
          <span class="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[var(--color-primary)] transition-colors">
            {{ icon() }}
          </span>
        }
      </div>
      @if (error()) {
        <p class="text-red-500 text-xs font-black mt-1 uppercase tracking-wider">{{ error() }}</p>
      }
    </div>
  `
})
export class FormFieldComponent {
  id = input<string>('');
  label = input<string>('');
  icon = input<string>('');
  error = input<string>('');
}

