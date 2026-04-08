import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonsStore } from '../../store/lessons.store';
import { RouterModule } from '@angular/router';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { BadgeComponent } from '../../../../shared/components/badge/badge.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-lesson-list',
  standalone: true,
  imports: [CommonModule, RouterModule, CardComponent, ButtonComponent, BadgeComponent, EmptyStateComponent],
  template: `
    <div class="p-6 max-w-7xl mx-auto space-y-8">
      <div class="bg-white border-4 border-black rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h1 class="text-4xl font-black text-black tracking-tight">Lesson Catalog</h1>
          <p class="text-gray-600 mt-2 text-lg font-medium">Browse and start your learning journey.</p>
        </div>
        <img src="https://api.dicebear.com/7.x/bottts/svg?seed=learn" alt="Mascot" class="w-24 h-24 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]" referrerpolicy="no-referrer" />
      </div>

      @if (lessonsStore.loading()) {
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          @for (i of [1,2,3]; track i) {
            <div class="bg-gray-200 animate-pulse h-80 rounded-3xl border-4 border-black"></div>
          }
        </div>
      }

      @if (!lessonsStore.loading() && lessonsStore.publishedLessons().length === 0) {
        <app-empty-state 
          title="No lessons found"
          description="Check back later for new content!"
          icon="menu_book"
        ></app-empty-state>
      }

      @if (!lessonsStore.loading() && lessonsStore.publishedLessons().length > 0) {
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          @for (lesson of lessonsStore.publishedLessons(); track lesson.id) {
            <app-card [hoverable]="true" class="h-full flex flex-col">
              <div class="-mx-6 -mt-6 mb-6 h-40 bg-[var(--color-primary)]/20 border-b-4 border-black flex items-center justify-center relative overflow-hidden">
                <img [src]="'https://api.dicebear.com/7.x/shapes/svg?seed=' + lesson.id" alt="Lesson Cover" class="absolute inset-0 w-full h-full object-cover opacity-50" referrerpolicy="no-referrer" />
                <span class="material-icons text-black text-6xl relative z-10 drop-shadow-[2px_2px_0px_rgba(255,255,255,1)]">menu_book</span>
              </div>
              
              <div class="flex-1 flex flex-col">
                <div class="flex justify-between items-start mb-4">
                  <app-badge variant="primary">{{ lesson.subject }}</app-badge>
                  <span class="text-sm font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-lg border-2 border-black">{{ lesson.duration }}</span>
                </div>
                <h3 class="text-2xl font-black text-black mb-2 leading-tight">{{ lesson.title }}</h3>
                <p class="text-base font-bold text-gray-600 mb-6 flex-1">Grade {{ lesson.grade }} &bull; {{ lesson.difficulty }}</p>
                
                <div class="flex justify-between items-center mt-auto pt-4 border-t-4 border-black/10">
                  <span class="text-base font-black uppercase tracking-wide" [ngClass]="{'text-[var(--color-primary)]': lesson.status === 'In Progress', 'text-gray-400': lesson.status === 'Not Started'}">{{ lesson.status }}</span>
                  <app-button [variant]="lesson.status === 'In Progress' ? 'primary' : 'secondary'" size="sm" [routerLink]="['/student/lesson-viewer', lesson.id]">
                    {{ lesson.status === 'In Progress' ? 'Continue' : 'Start' }}
                  </app-button>
                </div>
              </div>
            </app-card>
          }
        </div>
      }
    </div>
  `
})
export class LessonListComponent implements OnInit {
  lessonsStore = inject(LessonsStore);

  ngOnInit() {
    this.lessonsStore.loadLessons();
  }
}

