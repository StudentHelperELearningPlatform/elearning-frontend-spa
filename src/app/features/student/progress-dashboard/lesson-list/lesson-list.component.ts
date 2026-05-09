import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonsStore } from '../../store/lessons.store';
import { AuthStore } from '../../../auth/store/auth.store';
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
      <!-- Header -->
      <div class="bg-white border-4 border-black rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h1 class="text-4xl font-black text-black tracking-tight">Lesson Catalog</h1>
          <p class="text-gray-600 mt-2 text-lg font-medium">Browse, learn, and track your progress in English.</p>
        </div>
        <img src="https://api.dicebear.com/7.x/bottts/svg?seed=learn" alt="Mascot" class="w-24 h-24 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]" referrerpolicy="no-referrer" />
      </div>

      <!-- Navigation Tabs -->
      <div class="flex flex-wrap gap-4 border-b-4 border-black pb-4">
        <button 
          (click)="activeTab.set('browser')"
          [class]="activeTab() === 'browser' ? 'bg-[#0ABAB5] text-white' : 'bg-white text-black'"
          class="px-6 py-3 rounded-xl border-4 border-black font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
        >
          Lesson Browser
        </button>
        <button 
          (click)="activeTab.set('my-lessons')"
          [class]="activeTab() === 'my-lessons' ? 'bg-[#FFD700] text-black' : 'bg-white text-black'"
          class="px-6 py-3 rounded-xl border-4 border-black font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
        >
          My Lessons
        </button>
        <button 
          (click)="activeTab.set('history')"
          [class]="activeTab() === 'history' ? 'bg-[#FF6B6B] text-white' : 'bg-white text-black'"
          class="px-6 py-3 rounded-xl border-4 border-black font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
        >
          Lesson History
        </button>
      </div>

      <!-- Content -->
      @if (lessonsStore.loading()) {
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          @for (i of [1,2,3]; track i) {
            <div class="bg-gray-200 animate-pulse h-80 rounded-3xl border-4 border-black"></div>
          }
        </div>
      } @else {
        @switch (activeTab()) {
          @case ('browser') {
            @if (lessonsStore.publishedLessons().length === 0) {
              <app-empty-state title="No lessons found" description="Check back later for new content!" icon="menu_book" />
            } @else {
              <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                @for (lesson of lessonsStore.publishedLessons(); track lesson.id) {
                  <ng-container *ngTemplateOutlet="lessonCard; context: { $implicit: lesson, type: 'browser' }" />
                }
              </div>
            }
          }
          @case ('my-lessons') {
            @if (lessonsStore.myLessons().length === 0) {
              <app-empty-state title="No active lessons" description="Start a lesson from the catalog to see it here!" icon="school" />
            } @else {
              <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                @for (lesson of lessonsStore.myLessons(); track lesson.id) {
                  <ng-container *ngTemplateOutlet="lessonCard; context: { $implicit: lesson, type: 'my' }" />
                }
              </div>
            }
          }
          @case ('history') {
            @if (lessonsStore.completedLessons().length === 0) {
              <app-empty-state title="No history yet" description="Finish a lesson to see your achievements here!" icon="history" />
            } @else {
              <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                @for (lesson of lessonsStore.completedLessons(); track lesson.id) {
                  <ng-container *ngTemplateOutlet="lessonCard; context: { $implicit: lesson, type: 'history' }" />
                }
              </div>
            }
          }
        }
      }
    </div>

    <!-- Lesson Card Template -->
    <ng-template #lessonCard let-lesson let-type="type">
      <app-card [hoverable]="true" class="h-full flex flex-col transition-all duration-300">
        <div class="-mx-6 -mt-6 mb-6 h-40 bg-[#0ABAB5]/20 border-b-4 border-black flex items-center justify-center relative overflow-hidden">
          <img [src]="'https://api.dicebear.com/7.x/shapes/svg?seed=' + lesson.id" alt="Lesson Cover" class="absolute inset-0 w-full h-full object-cover opacity-50" referrerpolicy="no-referrer" />
          <span class="material-icons text-black text-6xl relative z-10 drop-shadow-[2px_2px_0px_rgba(255,255,255,1)]">menu_book</span>
        </div>
        
        <div class="flex-1 flex flex-col">
          <div class="flex justify-between items-start mb-4">
            <app-badge variant="primary">{{ lesson.subject }}</app-badge>
            <span class="text-sm font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-lg border-2 border-black">{{ lesson.duration }}</span>
          </div>
          <h3 class="text-2xl font-black text-black mb-2 leading-tight">{{ lesson.title }}</h3>
          <p class="text-base font-bold text-gray-600 mb-2">Grade {{ lesson.grade }} &bull; {{ lesson.difficulty }}</p>
          <p class="text-sm font-medium text-gray-500 mb-6 line-clamp-3 flex-1 italic">{{ lesson.description }}</p>
          
          <div class="flex justify-between items-center mt-auto pt-4 border-t-4 border-black/10">
            <span class="text-base font-black uppercase tracking-wide">
              @if (type === 'history') {
                <span class="text-green-600">COMPLETED</span>
              } @else {
                <span [ngClass]="{
                  'text-[#0ABAB5]': getStatus(lesson.id) === 'In Progress',
                  'text-gray-400': getStatus(lesson.id) === 'Not Started'
                }">
                  {{ getStatus(lesson.id) }}
                </span>
              }
            </span>
            
            <app-button 
              [variant]="type === 'history' ? 'secondary' : 'primary'" 
              size="sm" 
              [routerLink]="['/student/lesson-viewer', lesson.id]"
            >
              @if (type === 'history') {
                Review
              } @else {
                {{ getStatus(lesson.id) === 'In Progress' ? 'Continue' : 'Start' }}
              }
            </app-button>
          </div>
        </div>
      </app-card>
    </ng-template>
  `
})
export class LessonListComponent implements OnInit {
  lessonsStore = inject(LessonsStore);
  authStore = inject(AuthStore);
  activeTab = signal<'browser' | 'my-lessons' | 'history'>('browser');

  ngOnInit() {
    this.lessonsStore.loadLessons();
  }

  hasAccess(_lessonId: string): boolean {
    return true;
  }

  getStatus(_lessonId: string): string {
    return 'Not Started';
  }
}

