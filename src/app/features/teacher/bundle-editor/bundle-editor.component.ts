import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TeacherBundleStore } from '../state/teacher-bundle.store';
import { ContentStore } from '../state/content.store';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';

@Component({
  selector: 'app-bundle-editor',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, ButtonComponent, CardComponent, BadgeComponent],
  template: `
    <div class="p-6 md:p-8 max-w-4xl mx-auto space-y-8">
      
      <!-- Header -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div class="flex items-center space-x-4">
          <button class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors" (click)="goBack()">
            <span class="material-icons text-black">arrow_back</span>
          </button>
          <div>
            <h1 class="text-3xl font-black text-black tracking-tight">
              {{ bundleId() ? 'Edit Bundle' : 'Create New Bundle' }}
            </h1>
            <p class="text-gray-600 font-medium">Group your lessons and set a price</p>
          </div>
        </div>
        <div>
          <app-button variant="primary" icon="save" (btnClick)="saveBundle()">Save Bundle</app-button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Left Column: Form -->
        <div class="lg:col-span-2 space-y-6">
          <app-card>
            <div class="p-6">
              <h2 class="text-2xl font-black text-black mb-6">Bundle Details</h2>
              
              <form [formGroup]="form" class="space-y-4">
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-1" for="bundle-name">Name</label>
                  <input type="text" id="bundle-name" formControlName="name" class="w-full px-4 py-2 border-2 border-black rounded-xl font-medium focus:ring-2 focus:ring-[#0ABAB5] outline-none" placeholder="e.g. Math Starter Pack">
                </div>
                
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-1" for="bundle-description">Description</label>
                  <textarea id="bundle-description" formControlName="description" rows="3" class="w-full px-4 py-2 border-2 border-black rounded-xl font-medium focus:ring-2 focus:ring-[#0ABAB5] outline-none" placeholder="Describe the bundle contents..."></textarea>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-bold text-gray-700 mb-1" for="bundle-price">Price (RON)</label>
                    <input type="number" id="bundle-price" formControlName="price" min="0" step="0.01" class="w-full px-4 py-2 border-2 border-black rounded-xl font-medium focus:ring-2 focus:ring-[#0ABAB5] outline-none">
                  </div>
                  <div>
                    <label class="block text-sm font-bold text-gray-700 mb-1" for="bundle-grade">Grade Level</label>
                    <input type="number" id="bundle-grade" formControlName="grade" min="1" max="12" class="w-full px-4 py-2 border-2 border-black rounded-xl font-medium focus:ring-2 focus:ring-[#0ABAB5] outline-none">
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-1" for="bundle-subjects">Subjects (comma separated)</label>
                  <input type="text" id="bundle-subjects" formControlName="subjects" class="w-full px-4 py-2 border-2 border-black rounded-xl font-medium focus:ring-2 focus:ring-[#0ABAB5] outline-none" placeholder="e.g. Math, Geometry">
                </div>
              </form>
            </div>
          </app-card>
        </div>

        <!-- Right Column: Lesson Selector -->
        <div class="space-y-6">
          <app-card>
            <div class="p-6">
              <h2 class="text-xl font-black text-black mb-4 flex justify-between items-center">
                Included Lessons
                <app-badge variant="primary">{{ selectedLessonIds().length }}</app-badge>
              </h2>
              
              <div class="bg-gray-50 border-2 border-black rounded-xl p-4 max-h-96 overflow-y-auto space-y-2">
                @if (contentStore.loading()) {
                  <div class="text-center py-4 text-gray-500 font-medium">Loading lessons...</div>
                } @else if (availableLessons().length === 0) {
                  <div class="text-center py-4 text-gray-500 font-medium text-sm">No published lessons available to add.</div>
                } @else {
                  @for (lesson of availableLessons(); track lesson.id) {
                    <label class="flex items-start gap-3 p-3 bg-white border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#0ABAB5] transition-colors has-[:checked]:border-[#0ABAB5] has-[:checked]:bg-[#0ABAB5]/5">
                      <input type="checkbox" [checked]="selectedLessonIds().includes(lesson.id)" (change)="toggleLesson(lesson.id)" class="mt-1 w-4 h-4 text-[#0ABAB5] focus:ring-[#0ABAB5] border-gray-300 rounded">
                      <div>
                        <div class="font-bold text-sm text-black leading-tight mb-1">{{ lesson.title }}</div>
                        <div class="text-xs text-gray-500 font-medium">{{ lesson.subject }}</div>
                      </div>
                    </label>
                  }
                }
              </div>
            </div>
          </app-card>
        </div>
        
      </div>
    </div>
  `
})
export class BundleEditorComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  
  bundleStore = inject(TeacherBundleStore);
  contentStore = inject(ContentStore);
  
  bundleId = signal<string | null>(null);
  selectedLessonIds = signal<string[]>([]);
  
  availableLessons = computed(() => this.contentStore.publishedLessons());

  form = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    price: [0, [Validators.required, Validators.min(0)]],
    grade: [null as number | null],
    subjects: ['']
  });

  ngOnInit() {
    // Load content to populate lesson selector
    if (this.contentStore.lessons().length === 0) {
      this.contentStore.loadDashboard();
    }

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bundleId.set(id);
      this.loadExistingBundle(id);
    }
  }

  loadExistingBundle(id: string) {
    // Ensure bundles are loaded first
    if (this.bundleStore.bundles().length === 0) {
      this.bundleStore.loadBundles();
    }
    
    // In a real app we might fetch the single bundle if not in state
    const existing = this.bundleStore.bundles().find(b => b.id === id);
    if (existing) {
      this.form.patchValue({
        name: existing.name,
        description: existing.description,
        price: existing.price,
        grade: existing.grade,
        subjects: existing.subjects.join(', ')
      });
      // Try to match based on available lessons or IDs
      this.selectedLessonIds.set(existing.lessons.map(l => l.id));
    }
  }

  toggleLesson(lessonId: string) {
    const current = this.selectedLessonIds();
    if (current.includes(lessonId)) {
      this.selectedLessonIds.set(current.filter(id => id !== lessonId));
    } else {
      this.selectedLessonIds.set([...current, lessonId]);
    }
  }

  saveBundle() {
    if (this.form.invalid) {
      alert('Please fill out all required fields properly.');
      return;
    }

    const val = this.form.value;
    const subjectsArray = val.subjects 
      ? val.subjects.split(',').map(s => s.trim()).filter(s => s.length > 0) 
      : [];

    const payload = {
      name: val.name!,
      description: val.description || '',
      price: val.price || 0,
      grade: val.grade || null,
      subjects: subjectsArray,
      lessonIds: this.selectedLessonIds()
    };

    if (this.bundleId()) {
      // this.bundleStore.updateBundle(this.bundleId()!, payload);
      alert('Updated bundle: ' + payload.name + ' (Mock)');
    } else {
      // this.bundleStore.createBundle(payload);
      alert('Created bundle: ' + payload.name + ' (Mock)');
    }
    
    this.router.navigate(['/teacher/content']);
  }

  goBack() {
    this.router.navigate(['/teacher/content']);
  }
}
