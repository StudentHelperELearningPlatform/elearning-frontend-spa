import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ContentStore } from '../../store/content.store';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../../../core/services/notification.service';

interface UploadedFile {
  name: string;
  type: string;
  preview: string;
}

@Component({
  selector: 'app-lesson-builder',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, CardComponent],
  template: `
    <div class="p-6 max-w-4xl mx-auto space-y-8 font-sans text-black">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-4xl font-black tracking-tight uppercase italic">
          {{ isEdit ? 'Edit Lesson' : 'Create New Lesson' }}
        </h1>
        <app-button variant="secondary" size="sm" (click)="router.navigate(['/teacher/content'])">
          Cancel
        </app-button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Form -->
        <div class="lg:col-span-2 space-y-8">
          <app-card title="Lesson Details">
            <form [formGroup]="lessonForm" class="space-y-6">
              <div>
                <label for="title" class="block text-sm font-black uppercase tracking-tight mb-2">Lesson Title</label>
                <input 
                  id="title" 
                  formControlName="title" 
                  class="w-full px-4 py-3 border-4 border-black rounded-xl focus:outline-none focus:bg-[#0ABAB5]/5 font-bold" 
                  placeholder="e.g. Introduction to Quantum Physics"
                >
              </div>
              <div>
                <label for="subject" class="block text-sm font-black uppercase tracking-tight mb-2">Subject</label>
                <input 
                  id="subject" 
                  formControlName="subject" 
                  class="w-full px-4 py-3 border-4 border-black rounded-xl focus:outline-none focus:bg-[#0ABAB5]/5 font-bold" 
                  placeholder="e.g. Physics"
                >
              </div>
              <div>
                <label for="content" class="block text-sm font-black uppercase tracking-tight mb-2">Lesson Content</label>
                <textarea 
                  id="content" 
                  formControlName="content" 
                  class="w-full px-4 py-3 border-4 border-black rounded-xl focus:outline-none focus:bg-[#0ABAB5]/5 font-bold" 
                  rows="8" 
                  placeholder="Write your lesson content here..."
                ></textarea>
              </div>
            </form>
          </app-card>

          <!-- Media Upload Section -->
          <app-card title="Lesson Media">
            <div class="space-y-6">
              <!-- Drag & Drop Zone -->
              <div 
                class="border-4 border-dashed border-black rounded-2xl p-10 text-center transition-all cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-[#0ABAB5]/50"
                [ngClass]="{'bg-[#0ABAB5]/5 border-[#0ABAB5]': isDragging()}"
                (dragover)="onDragOver($event)"
                (dragleave)="onDragLeave($event)"
                (drop)="onDrop($event)"
                (click)="fileInput.click()"
                (keydown.enter)="fileInput.click()"
                (keydown.space)="fileInput.click()"
                tabindex="0"
                role="button"
                aria-label="Upload lesson media"
              >
                <input #fileInput type="file" class="hidden" (change)="onFileSelected($event)" multiple>
                <span class="material-icons text-6xl text-gray-400 mb-4">cloud_upload</span>
                <p class="text-xl font-black uppercase tracking-tight">Drag & Drop Files Here</p>
                <p class="text-gray-500 font-bold mt-2 italic">or click to browse from your computer</p>
                <p class="text-xs font-black text-gray-400 mt-4 uppercase tracking-widest">Supports: MP4, MP3, JPG, PNG, PDF</p>
              </div>

              <!-- Upload Progress -->
              @if (uploading()) {
                <div class="bg-white border-4 border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div class="flex justify-between items-center mb-2">
                    <span class="font-black uppercase text-sm">Uploading Assets...</span>
                    <span class="font-black text-[#0ABAB5]">{{ uploadProgress() }}%</span>
                  </div>
                  <div class="h-4 bg-gray-100 border-2 border-black rounded-full overflow-hidden">
                    <div class="h-full bg-[#0ABAB5] transition-all duration-300" [style.width.%]="uploadProgress()"></div>
                  </div>
                </div>
              }

              <!-- Uploaded Files List -->
              @if (uploadedFiles().length > 0) {
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  @for (file of uploadedFiles(); track file.name) {
                    <div class="relative group border-4 border-black rounded-xl overflow-hidden aspect-square bg-gray-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      @if (file.type.startsWith('image')) {
                        <img [src]="file.preview" [alt]="file.name" class="w-full h-full object-cover">
                      } @else {
                        <div class="w-full h-full flex flex-col items-center justify-center p-4">
                          <span class="material-icons text-4xl mb-2">{{ getFileIcon(file.type) }}</span>
                          <span class="text-[10px] font-black uppercase tracking-tighter text-center truncate w-full">{{ file.name }}</span>
                        </div>
                      }
                      <button 
                        (click)="removeFile(file)"
                        class="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full border-2 border-black opacity-0 group-hover:opacity-100 transition-opacity shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                      >
                        <span class="material-icons text-sm">close</span>
                      </button>
                    </div>
                  }
                </div>
              }
            </div>
          </app-card>
        </div>

        <!-- Sidebar -->
        <div class="space-y-8">
          <app-card title="Publishing">
            <div class="space-y-4">
              <div>
                <label for="status" class="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Status</label>
                <select id="status" [formControl]="lessonForm.controls['status']" class="w-full px-4 py-3 border-4 border-black rounded-xl font-black bg-white">
                  <option value="DRAFT">Draft</option>
                  <option value="PUBLISHED">Published</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </div>
              <div class="pt-4 border-t-2 border-black/5">
                <app-button (click)="saveLesson()" [disabled]="lessonForm.invalid || uploading()" variant="primary" class="w-full py-4 text-xl">
                  {{ isEdit ? 'Update Lesson' : 'Save Lesson' }}
                </app-button>
              </div>
            </div>
          </app-card>

          <app-card title="Tips">
            <ul class="space-y-4 text-sm font-bold text-gray-600 italic">
              <li class="flex gap-2">
                <span class="material-icons text-[#0ABAB5] text-sm">lightbulb</span>
                Use clear, descriptive titles for your lessons.
              </li>
              <li class="flex gap-2">
                <span class="material-icons text-[#0ABAB5] text-sm">lightbulb</span>
                Upload high-quality media to engage students.
              </li>
              <li class="flex gap-2">
                <span class="material-icons text-[#0ABAB5] text-sm">lightbulb</span>
                Keep modules concise and focused on one topic.
              </li>
            </ul>
          </app-card>
        </div>
      </div>
    </div>
  `
})
export class LessonBuilderComponent implements OnInit {
  store = inject(ContentStore);
  fb = inject(FormBuilder);
  router = inject(Router);
  route = inject(ActivatedRoute);
  private notificationService = inject(NotificationService);
  
  isEdit = false;
  lessonId: string | null = null;
  
  lessonForm = this.fb.group({
    title: ['', Validators.required],
    subject: ['', Validators.required],
    content: [''],
    status: ['DRAFT']
  });

  isDragging = signal(false);
  uploading = signal(false);
  uploadProgress = signal(0);
  uploadedFiles = signal<UploadedFile[]>([]);

  ngOnInit() {
    this.lessonId = this.route.snapshot.paramMap.get('id');
    if (this.lessonId) {
      this.isEdit = true;
      const lesson = this.store.lessons().find(l => l.id === this.lessonId);
      if (lesson) {
        this.lessonForm.patchValue(lesson);
      }
    }
  }

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
    if (files) this.handleFiles(files);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (files) this.handleFiles(files);
  }

  private handleFiles(files: FileList) {
    this.uploading.set(true);
    this.uploadProgress.set(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      this.uploadProgress.update(p => p + 10);
      if (this.uploadProgress() >= 100) {
        clearInterval(interval);
        this.uploading.set(false);
        
        Array.from(files).forEach(file => {
          const reader = new FileReader();
          reader.onload = (e: ProgressEvent<FileReader>) => {
            const result = e.target?.result as string;
            this.uploadedFiles.update(list => [...list, {
              name: file.name,
              type: file.type,
              preview: result
            }]);
          };
          reader.readAsDataURL(file);
        });

        this.notificationService.success(`${files.length} file(s) uploaded successfully!`);
      }
    }, 200);
  }

  getFileIcon(type: string) {
    if (type.startsWith('audio')) return 'audiotrack';
    if (type.startsWith('video')) return 'videocam';
    if (type === 'application/pdf') return 'picture_as_pdf';
    return 'insert_drive_file';
  }

  removeFile(file: UploadedFile) {
    this.uploadedFiles.update(list => list.filter(f => f !== file));
  }

  saveLesson() {
    if (this.lessonForm.valid) {
      const formValue = this.lessonForm.value;
      const lessonData = {
        title: formValue.title ?? '',
        subject: formValue.subject ?? '',
        content: formValue.content ?? '',
        status: (formValue.status as 'PUBLISHED' | 'DRAFT') ?? 'DRAFT',
        media: this.uploadedFiles().map(f => f.name)
      };

      if (this.isEdit && this.lessonId) {
        this.store.updateLesson(this.lessonId, lessonData);
      } else {
        this.store.createLesson(lessonData);
      }
      this.router.navigate(['/teacher/content']);
    }
  }
}
