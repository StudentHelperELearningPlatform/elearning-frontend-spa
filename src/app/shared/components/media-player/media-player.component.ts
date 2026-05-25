import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-media-player',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="w-full bg-black rounded-2xl border-4 border-black overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative aspect-video flex items-center justify-center group">

      @if (type() === 'image') {
        <img
          [src]="url()"
          [alt]="title()"
          class="w-full h-full object-cover"
          referrerpolicy="no-referrer"
        />
      }

      @if (type() === 'video') {
        <video
          [src]="url()"
          controls
          class="w-full h-full object-cover"
          referrerpolicy="no-referrer"
        >
        </video>
      }

      @if (type() === 'audio') {
        <div class="w-full h-full bg-[#0ABAB5]/20 flex flex-col items-center justify-center p-8">
          <div class="w-32 h-32 bg-white rounded-full border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6 animate-pulse">
            <span class="material-icons text-[#0ABAB5] text-6xl">
              music_note
            </span>
          </div>

          <audio
            [src]="url()"
            controls
            class="w-full"
          >
          </audio>
        </div>
      }

      @if (type() === 'pdf') {
        <a
          [href]="url()"
          target="_blank"
          class="w-full h-full bg-red-50 flex flex-col items-center justify-center"
        >
          <span class="material-icons text-red-500 text-6xl">
            picture_as_pdf
          </span>

          <span class="text-red-700 font-bold text-sm mt-2">
            Open PDF
          </span>
        </a>
      }

    </div>
  `
})
export class MediaPlayerComponent {
  url = input.required<string>();
  type = input<'image' | 'video' | 'audio' | 'pdf'>('image');
  title = input<string>('Media');
}
