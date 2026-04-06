// src/app/shared/components/loading-spinner/loading-spinner.component.ts
import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  host: { style: 'display: contents' },
  imports: [CommonModule],
  template: `
    <div [ngClass]="[
      'flex flex-col items-center justify-center space-y-4',
      fullScreen() ? 'fixed inset-0 bg-white/80 backdrop-blur-sm z-50' : ''
    ]">
      <div class="relative w-16 h-16">
        <div class="absolute inset-0 border-8 border-gray-100 rounded-full"></div>
        <div class="absolute inset-0 border-8 border-[#0ABAB5] border-t-transparent rounded-full animate-spin border-black/10"></div>
        <div class="absolute inset-0 border-8 border-transparent border-t-black rounded-full animate-spin duration-700"></div>
      </div>
      @if (message()) {
        <p class="text-black font-black uppercase tracking-widest text-sm animate-pulse">{{ message() }}</p>
      }
    </div>
  `
})
export class LoadingSpinnerComponent {
  fullScreen = input<boolean>(false);
  message = input<string>('Loading...');
}
