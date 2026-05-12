import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContentStore } from '../store/content.store';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-content-editor',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent, CardComponent, BadgeComponent, EmptyStateComponent],
  template: `
    <div class="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      
      <!-- Header -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div class="flex items-center space-x-4">
          <div class="w-16 h-16 bg-[#0ABAB5]/20 rounded-2xl border-4 border-black flex items-center justify-center">
            <span class="material-icons text-[#0ABAB5] text-3xl">edit_document</span>
          </div>
          <div>
            <h1 class="text-3xl font-black text-black tracking-tight">Content Editor</h1>
            <p class="text-gray-600 font-medium">Manage your lessons and quizzes</p>
          </div>
        </div>
        <div class="flex space-x-3">
          <app-button variant="secondary" icon="add_task" routerLink="/teacher/quiz-builder">New Quiz</app-button>
          <app-button variant="primary" icon="add_circle" routerLink="/teacher/lessons/new">New Lesson</app-button>
        </div>
      </div>

      <!-- Tabs -->
      <div class="flex space-x-2 bg-white p-2 rounded-2xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] inline-flex">
        <button 
          (click)="activeTab.set('lessons')"
          class="px-6 py-3 rounded-xl font-bold transition-all duration-200"
          [ngClass]="{'bg-[#0ABAB5] text-white border-2 border-black': activeTab() === 'lessons', 'text-gray-600 hover:bg-gray-100': activeTab() !== 'lessons'}">
          Lessons
        </button>
        <button 
          (click)="activeTab.set('quizzes')"
          class="px-6 py-3 rounded-xl font-bold transition-all duration-200"
          [ngClass]="{'bg-[#0ABAB5] text-white border-2 border-black': activeTab() === 'quizzes', 'text-gray-600 hover:bg-gray-100': activeTab() !== 'quizzes'}">
          Quizzes
        </button>
      </div>

      <!-- Content Grid -->
      @if (store.loading()) {
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (i of [1,2,3]; track i) {
            <div class="h-64 bg-gray-200 rounded-3xl border-4 border-gray-300 animate-pulse"></div>
          }
        </div>
      } @else {
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          @if (activeTab() === 'lessons') {
            @for (lesson of store.lessons(); track lesson.id) {
              <app-card class="block group">
                <div class="p-6">
                  <div class="flex justify-between items-start mb-4">
                    <div class="w-12 h-12 bg-gray-100 rounded-xl border-2 border-black flex items-center justify-center group-hover:bg-[#0ABAB5]/20 transition-colors">
                      <span class="material-icons text-black group-hover:text-[#0ABAB5] transition-colors">menu_book</span>
                    </div>
                    <app-badge [variant]="lesson.status === 'PUBLISHED' ? 'success' : 'warning'">
                      {{ lesson.status }}
                    </app-badge>
                  </div>
                  
                  <h3 class="text-xl font-black text-black mb-2 line-clamp-2">{{ lesson.title }}</h3>
                  
                  <div class="flex items-center space-x-2 mb-6">
                    <app-badge variant="primary" icon="category">{{ lesson.subject }}</app-badge>
                  </div>
                  
                  <div class="flex items-center justify-between pt-4 border-t-2 border-gray-100">
                    <span class="text-sm text-gray-500 font-medium">
                      Updated {{ lesson.lastModified | date:'shortDate' }}
                    </span>
                    <div class="flex space-x-2">
                      <button class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-black hover:text-white transition-colors" [routerLink]="['/teacher/lessons', lesson.id, 'edit']">
                        <span class="material-icons text-sm">edit</span>
                      </button>
                      <button class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors" (click)="deleteLesson(lesson.id)">
                        <span class="material-icons text-sm">delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </app-card>
            }
            @if (store.lessons().length === 0) {
              <div class="col-span-full">
                <app-empty-state
                  title="No Lessons Yet"
                  description="Create your first lesson to start building your curriculum."
                  icon="menu_book"
                ></app-empty-state>
              </div>
            }
          }

          @if (activeTab() === 'quizzes') {
            @for (quiz of store.quizzes(); track quiz.id) {
              <app-card class="block group">
                <div class="p-6">
                  <div class="flex justify-between items-start mb-4">
                    <div class="w-12 h-12 bg-gray-100 rounded-xl border-2 border-black flex items-center justify-center group-hover:bg-[#0ABAB5]/20 transition-colors">
                      <span class="material-icons text-black group-hover:text-[#0ABAB5] transition-colors">quiz</span>
                    </div>
                    <app-badge [variant]="quiz.status === 'PUBLISHED' ? 'success' : 'warning'">
                      {{ quiz.status }}
                    </app-badge>
                  </div>
                  
                  <h3 class="text-xl font-black text-black mb-2 line-clamp-2">{{ quiz.title }}</h3>
                  
                  <div class="flex items-center space-x-2 mb-6">
                    <app-badge variant="primary" icon="category">{{ quiz.subject }}</app-badge>
                  </div>
                  
                  <div class="flex items-center justify-between pt-4 border-t-2 border-gray-100">
                    <span class="text-sm text-gray-500 font-medium">
                      Updated {{ quiz.lastModified | date:'shortDate' }}
                    </span>
                    <div class="flex space-x-2">
                      <button class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-black hover:text-white transition-colors" [routerLink]="['/teacher/quiz-builder', quiz.id]">
                        <span class="material-icons text-sm">edit</span>
                      </button>
                      <button class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors" (click)="deleteQuiz(quiz.id)">
                        <span class="material-icons text-sm">delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </app-card>
            }
            @if (store.quizzes().length === 0) {
              <div class="col-span-full">
                <app-empty-state
                  title="No Quizzes Yet"
                  description="Create your first quiz to assess your students."
                  icon="quiz"
                ></app-empty-state>
              </div>
            }
          }
        </div>
      }
    </div>
  `
})
export class ContentEditorComponent implements OnInit {
  store = inject(ContentStore);
  activeTab = signal<'lessons' | 'quizzes'>('lessons');

  ngOnInit() {
    this.store.loadContent();
  }

  deleteLesson(id: string) {
    if (confirm('Are you sure you want to delete this lesson?')) {
      this.store.deleteLesson(id);
    }
  }

  deleteQuiz(id: string) {
    if (confirm('Are you sure you want to delete this quiz?')) {
      this.store.deleteQuiz(id);
    }
  }
}
