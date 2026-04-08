import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-media-player',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="w-full bg-black rounded-2xl border-4 border-black overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative aspect-video flex items-center justify-center group">
      @if (type() === 'image') {
        <img [src]="url()" [alt]="title()" class="w-full h-full object-cover" referrerpolicy="no-referrer" />
      }
      
      @if (type() === 'video') {
        <div class="w-full h-full relative bg-gray-900 flex items-center justify-center">
          <!-- Mock Video Player -->
          <img [src]="url()" alt="Video Thumbnail" class="w-full h-full object-cover opacity-50" referrerpolicy="no-referrer" />
          <button class="absolute w-20 h-20 bg-[var(--color-primary)] rounded-full border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:scale-110 transition-transform">
            <span class="material-icons text-white text-4xl ml-2">play_arrow</span>
          </button>
          <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex items-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <span class="material-icons text-white cursor-pointer">pause</span>
            <div class="flex-1 h-2 bg-white/30 rounded-full overflow-hidden">
              <div class="w-1/3 h-full bg-[var(--color-primary)]"></div>
            </div>
            <span class="text-white text-sm font-bold font-mono">02:34 / 10:00</span>
            <span class="material-icons text-white cursor-pointer">fullscreen</span>
          </div>
        </div>
      }

      @if (type() === 'audio') {
        <div class="w-full h-full bg-[var(--color-primary)]/20 flex flex-col items-center justify-center p-8">
          <div class="w-32 h-32 bg-white rounded-full border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6 animate-pulse">
            <span class="material-icons text-[var(--color-primary)] text-6xl">music_note</span>
          </div>
          <div class="w-full max-w-md flex items-center space-x-4 bg-white p-4 rounded-2xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <button class="w-12 h-12 bg-[var(--color-primary)] rounded-full border-2 border-black flex items-center justify-center">
              <span class="material-icons text-white">play_arrow</span>
            </button>
            <div class="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden border-2 border-black">
              <div class="w-1/2 h-full bg-[var(--color-primary)]"></div>
            </div>
            <span class="text-black font-bold font-mono">01:15</span>
          </div>
        </div>
      }
    </div>
  `
})
export class MediaPlayerComponent {
  url = input.required<string>();
  type = input<'image' | 'video' | 'audio'>('image');
  title = input<string>('Media');
}

