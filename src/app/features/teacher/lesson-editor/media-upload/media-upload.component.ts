import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { MediaPlayerComponent } from '../../../../shared/components/media-player/media-player.component';
import { environment } from '../../../../../environments/environment';

export interface UploadedMedia {
  id: string;
  url: string;
  name: string;
  type: 'image' | 'video' | 'audio';
  progress: number;
  status: 'uploading' | 'complete' | 'error';
  file?: File;
}

@Component({
  selector: 'app-media-upload',
  standalone: true,
  imports: [CommonModule, DragDropModule, MediaPlayerComponent],
  template: `
    <div class="p-4 border-2 border-black rounded-xl bg-gray-50">
      
      <div class="sr-only" aria-live="polite">
        {{ a11yMessage() }}
      </div>

      <div 
        class="border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer bg-white focus:outline-none focus:ring-2 focus:ring-[#0ABAB5]"
        [ngClass]="{
          'border-[#0ABAB5] bg-[#0ABAB5]/10': isDragging(),
          'border-black/30': !isDragging()
        }"
        role="button"
        tabindex="0"
        (dragover)="onDragOver($event)"
        (dragleave)="onDragLeave($event)"
        (drop)="onDrop($event)"
        (click)="fileInput.click()"
        (keydown.enter)="fileInput.click()"
        (keydown.space)="fileInput.click(); $event.preventDefault()">
        
        <span class="material-icons text-5xl text-gray-400 mb-2 transition-colors" [class.text-[#0ABAB5]]="isDragging()">cloud_upload</span>
        <p class="text-black font-bold text-lg tracking-tight mb-1">Drag and drop media here</p>
        <p class="text-sm text-gray-600 font-medium mb-4">Images, Video, or Audio (Max 50MB)</p>
        
        <label class="sr-only" for="fileInput">Browse files</label>
        <input 
          #fileInput
          type="file" 
          id="fileInput"
          class="sr-only" 
          multiple 
          accept="image/jpeg,image/png,image/gif,image/webp,video/mp4,video/webm,audio/mpeg,audio/wav"
          (change)="onFileSelected($event)"
          tabindex="-1" />
          
        <button 
          type="button"
          (click)="fileInput.click()"
          (keydown.enter)="fileInput.click(); $event.stopPropagation()"
          (keydown.space)="fileInput.click(); $event.preventDefault(); $event.stopPropagation()"
          class="bg-[#0ABAB5] text-white px-5 py-2 rounded-lg font-bold border-2 border-black hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-black transition-all">
          Browse files
        </button>
      </div>

      @if (errorMessage()) {
        <div class="mt-3 p-3 bg-red-100 text-red-900 border-2 border-red-500 rounded-lg flex items-center font-bold text-sm" role="alert">
          <span class="material-icons mr-2 text-red-600 text-lg">error</span>
          {{ errorMessage() }}
        </div>
      }

      @if (mediaList().length > 0) {
        <div class="mt-5 pt-4 border-t-2 border-black/10">
          <h4 class="text-sm font-bold text-black tracking-tight mb-3">Attached Media</h4>
          
          <div 
            cdkDropList 
            cdkDropListOrientation="horizontal" 
            class="flex flex-wrap gap-4" 
            (cdkDropListDropped)="dropMediaList($event)">
            
            @for (media of mediaList(); track media.id) {
              <div cdkDrag class="relative w-40 bg-white border-2 border-black rounded-xl p-2 cursor-move group hover:-translate-y-1 transition-transform">
                
                @if (media.status === 'uploading') {
                  <div class="h-24 flex flex-col items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <span class="material-icons animate-spin text-[#0ABAB5] text-3xl mb-2">autorenew</span>
                    <div class="w-full px-3">
                      <div class="h-2 bg-white rounded-full overflow-hidden border border-black">
                        <div class="h-full bg-[#0ABAB5] transition-all duration-200" [style.width.%]="media.progress"></div>
                      </div>
                    </div>
                  </div>
                }

                @if (media.status === 'complete') {
                  <div class="h-24 rounded-lg overflow-hidden relative border border-black/10">
                    <app-media-player 
                      [url]="media.url" 
                      [type]="media.type" 
                      [title]="media.name">
                    </app-media-player>
                  </div>
                }

                @if (media.status === 'error') {
                  <div class="h-24 flex flex-col items-center justify-center bg-red-50 rounded-lg border-2 border-red-300 p-2 text-center">
                    <span class="material-icons text-red-500 mb-1">error</span>
                    <p class="text-[10px] text-red-700 font-bold leading-tight mb-1">Upload failed. Try again.</p>
                    <button 
                      (click)="retryUpload(media.id)" 
                      class="text-xs bg-red-100 border border-red-500 text-red-700 px-2 py-1 rounded font-bold hover:bg-red-200 focus:ring-2 focus:ring-red-500 cursor-pointer">
                      Retry
                    </button>
                  </div>
                }

                <button 
                  class="absolute -top-2 -right-2 bg-white text-red-500 rounded-full w-6 h-6 flex items-center justify-center border-2 border-black opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 z-10 focus:opacity-100"
                  (click)="removeMedia(media.id)"
                  aria-label="Remove media">
                  <span class="material-icons text-sm font-black" style="font-size: 14px;">close</span>
                </button>

                <p class="text-xs font-bold text-gray-800 mt-2 truncate text-center px-1" [title]="media.name">
                  {{ media.name }}
                </p>
              </div>
            }
          </div>
        </div>
      }
    </div>
  `
})
export class MediaUploadComponent {
  private http = inject(HttpClient);

  // State
  isDragging = signal(false);
  errorMessage = signal<string | null>(null);
  a11yMessage = signal<string>(''); 
  mediaList = signal<UploadedMedia[]>([]);

  // Constants
  readonly MAX_SIZE_MB = 50;
  readonly MAX_SIZE_BYTES = this.MAX_SIZE_MB * 1024 * 1024;
  readonly ALLOWED_TYPES = [
    'image/jpeg', 'image/png', 'image/gif', 'image/webp',
    'video/mp4', 'video/webm',
    'audio/mpeg', 'audio/wav'
  ];

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(true);
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);
    
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFiles(Array.from(files));
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFiles(Array.from(input.files));
    }
    input.value = '';
  }

  handleFiles(files: File[]) {
    this.errorMessage.set(null);

    const errors: string[] = [];
    const validFiles: File[] = [];

    for (const file of files) {
      if (!this.ALLOWED_TYPES.includes(file.type)) {
        errors.push(`Invalid file type: ${file.name}. Only images, videos, and audio are allowed.`);
      } else if (file.size > this.MAX_SIZE_BYTES) {
        errors.push(`File too large: ${file.name}. Maximum size is ${this.MAX_SIZE_MB}MB.`);
      } else {
        validFiles.push(file);
      }
    }

    if (errors.length > 0) {
      this.errorMessage.set(errors.join(' '));
      this.announceA11y('Some files failed to upload. ' + errors.join(' '));
    }

    for (const file of validFiles) {
      this.uploadFile(file);
    }
  }

  uploadFile(file: File, existingId?: string) {
    const mediaType = file.type.split('/')[0] as 'image' | 'video' | 'audio';
    const id = existingId || crypto.randomUUID();

    if (!existingId) {
      const newMedia: UploadedMedia = {
        id, url: '', name: file.name, type: mediaType, progress: 0, status: 'uploading', file
      };
      this.mediaList.update(list => [...list, newMedia]);
    } else {
      this.mediaList.update(list => list.map(m => m.id === id ? { ...m, status: 'uploading', progress: 0 } : m));
    }

    const formData = new FormData();
    formData.append('file', file);

    const uploadUrl = `${environment.apiBase}/media/upload`;

    this.http.post<{url: string}>(uploadUrl, formData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          const progress = Math.round((100 * event.loaded) / event.total);
          this.mediaList.update(list => list.map(m => m.id === id ? { ...m, progress } : m));
        } else if (event.type === HttpEventType.Response) {
          const url = event.body?.url || URL.createObjectURL(file);
          this.mediaList.update(list => list.map(m => m.id === id ? { ...m, status: 'complete', progress: 100, url } : m));
          this.announceA11y(`Upload complete: ${file.name}`);
        }
      },
      error: () => {
        this.mediaList.update(list => list.map(m => m.id === id ? { ...m, status: 'error' } : m));
        this.announceA11y(`Upload failed for ${file.name}`);
      }
    });
  }

  retryUpload(id: string) {
    const media = this.mediaList().find(m => m.id === id);
    if (media && media.file) {
      this.uploadFile(media.file, id);
    }
  }

  removeMedia(id: string) {
    if (confirm('Are you sure you want to remove this media?')) {
      this.mediaList.update(list => list.filter(m => m.id !== id));
      this.announceA11y('Media removed');
    }
  }

  dropMediaList(event: CdkDragDrop<UploadedMedia[]>) {
    this.mediaList.update(list => {
      moveItemInArray(list, event.previousIndex, event.currentIndex);
      return [...list];
    });
  }

  private announceA11y(message: string) {
    this.a11yMessage.set(message);
  }
}