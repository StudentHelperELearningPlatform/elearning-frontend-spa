import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  host: { style: 'display: contents' },
  template: `
    <button 
      [disabled]="disabled() || loading()"
      (click)="btnClick.emit($event)"
      [ngClass]="[
        'relative font-bold rounded-2xl border-2 border-black transition-all duration-200 flex items-center justify-center outline-none focus:ring-4 focus:ring-[#0ABAB5]/30',
        sizeClasses[size()],
        variantClasses[variant()],
        disabled() || loading() ? 'opacity-50 cursor-not-allowed translate-y-[4px] shadow-none' : 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[4px] active:shadow-none'
      ]"
    >
      @if (loading()) {
        <span class="material-icons animate-spin mr-2 text-sm">autorenew</span>
      }
      @if (icon() && !loading()) {
        <span class="material-icons mr-2 text-lg">{{ icon() }}</span>
      }
      <ng-content></ng-content>
    </button>
  `
})
export class ButtonComponent {
  variant = input<'primary' | 'secondary' | 'danger'>('primary');
  size = input<'sm' | 'md' | 'lg'>('md');
  disabled = input<boolean>(false);
  loading = input<boolean>(false);
  icon = input<string>('');
  btnClick = output<MouseEvent>();

  variantClasses = {
    primary: 'bg-[#0ABAB5] text-white',
    secondary: 'bg-white text-black',
    danger: 'bg-black text-white'
  };
  sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg uppercase tracking-wide'
  };
}
