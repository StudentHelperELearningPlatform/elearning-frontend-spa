import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  host: { style: 'display: contents' },
  imports: [CommonModule, ButtonComponent],
  template: `
    @if (isOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div 
          class="absolute inset-0 bg-black/40 backdrop-blur-sm" 
          (click)="closeModal.emit()"
          (keydown.escape)="closeModal.emit()"
          tabindex="-1"
          aria-hidden="true"
        ></div>
        
        <!-- Modal Content -->
        <div class="relative bg-white border-4 border-black rounded-3xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
          <!-- Header -->
          <div class="flex items-center justify-between p-6 border-b-4 border-black">
            <h3 class="text-2xl font-black uppercase tracking-tight">{{ title() }}</h3>
            <button (click)="closeModal.emit()" class="text-black hover:text-[#0ABAB5] transition-colors">
              <span class="material-icons text-3xl font-bold">close</span>
            </button>
          </div>
          
          <!-- Body -->
          <div class="p-8">
            <ng-content></ng-content>
          </div>
          
          <!-- Footer -->
          @if (showFooter()) {
            <div class="flex justify-end gap-4 p-6 border-t-4 border-black/10 bg-gray-50">
              <app-button variant="secondary" (click)="closeModal.emit()">Cancel</app-button>
              <ng-content select="[footer]"></ng-content>
            </div>
          }
        </div>
      </div>
    }
  `
})
export class ModalComponent {
  isOpen = input<boolean>(false);
  title = input<string>('Modal Title');
  showFooter = input<boolean>(true);
  closeModal = output<void>();
}
