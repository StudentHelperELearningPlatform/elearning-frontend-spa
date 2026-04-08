import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-avatar',
  standalone: true,
  host: { style: 'display: contents' },
  imports: [CommonModule],
  template: `
    <div [ngClass]="[
      'rounded-full border-2 border-black overflow-hidden flex items-center justify-center bg-[var(--color-primary)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]',
      sizeClasses[size()]
    ]">
      @if (src()) {
        <img [src]="src()" [alt]="alt()" class="w-full h-full object-cover" referrerpolicy="no-referrer" />
      }
      @if (!src() && initials()) {
        <span class="font-bold text-white tracking-wider" [ngClass]="textClasses[size()]">{{ initials() }}</span>
      }
      @if (!src() && !initials()) {
        <span class="material-icons text-white" [ngClass]="iconClasses[size()]">person</span>
      }
    </div>
  `
})
export class AvatarComponent {
  src = input<string>('');
  alt = input<string>('Avatar');
  initials = input<string>('');
  size = input<'sm' | 'md' | 'lg' | 'xl'>('md');

  sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
    xl: 'w-32 h-32'
  };
  textClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl',
    xl: 'text-4xl'
  };
  iconClasses = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-5xl',
    xl: 'text-7xl'
  };
}

