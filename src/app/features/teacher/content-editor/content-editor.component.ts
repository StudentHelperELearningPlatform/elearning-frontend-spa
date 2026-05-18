import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContentStore } from '../state/content.store';
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
            <p class="text-gray-600 font-medium">Manage and organize your lessons</p>
          </div>
        </div>
        <div>
          <app-button variant="primary" icon="add_circle" routerLink="/teacher/lessons/new">New Lesson</app-button>
        </div>
      </div>
 
      <!-- View & Status Switcher Header -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-2xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div class="flex flex-wrap items-center gap-4">
          <span class="font-black text-black text-lg">My Lessons</span>
          
          <!-- Status Filter Switcher -->
          <div class="flex space-x-1.5 bg-gray-100 p-1 rounded-xl border-2 border-black inline-flex">
            <button 
              (click)="setStatusFilter('ALL')"
              class="px-3 py-1.5 rounded-lg font-bold transition-all duration-200 text-xs font-black"
              [ngClass]="{'bg-[#0ABAB5] text-white border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]': statusFilter() === 'ALL', 'text-gray-600 hover:bg-gray-200': statusFilter() !== 'ALL'}"
              title="Show All Lessons">
              All
            </button>
            <button 
              (click)="setStatusFilter('PUBLISHED')"
              class="px-3 py-1.5 rounded-lg font-bold transition-all duration-200 text-xs font-black"
              [ngClass]="{'bg-[#0ABAB5] text-white border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]': statusFilter() === 'PUBLISHED', 'text-gray-600 hover:bg-gray-200': statusFilter() !== 'PUBLISHED'}"
              title="Show Published Lessons">
              Published
            </button>
            <button 
              (click)="setStatusFilter('DRAFT')"
              class="px-3 py-1.5 rounded-lg font-bold transition-all duration-200 text-xs font-black"
              [ngClass]="{'bg-[#0ABAB5] text-white border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]': statusFilter() === 'DRAFT', 'text-gray-600 hover:bg-gray-200': statusFilter() !== 'DRAFT'}"
              title="Show Draft Lessons">
              Drafts
            </button>
          </div>
        </div>

        <div class="flex space-x-2 bg-gray-100 p-1.5 rounded-xl border-2 border-black inline-flex">
          <button 
            (click)="setViewMode('grid')"
            class="p-2 rounded-lg font-bold transition-all duration-200 flex items-center gap-1"
            [ngClass]="{'bg-[#0ABAB5] text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]': viewMode() === 'grid', 'text-gray-600 hover:bg-gray-200': viewMode() !== 'grid'}"
            title="Grid View">
            <span class="material-icons text-sm">grid_view</span>
            <span class="text-xs font-black">Grid</span>
          </button>
          <button 
            (click)="setViewMode('list')"
            class="p-2 rounded-lg font-bold transition-all duration-200 flex items-center gap-1"
            [ngClass]="{'bg-[#0ABAB5] text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]': viewMode() === 'list', 'text-gray-600 hover:bg-gray-200': viewMode() !== 'list'}"
            title="List View">
            <span class="material-icons text-sm">format_list_bulleted</span>
            <span class="text-xs font-black">List</span>
          </button>
        </div>
      </div>
 
      <!-- Content -->
      @if (store.loading()) {
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (i of [1,2,3]; track i) {
            <div class="h-64 bg-gray-200 rounded-3xl border-4 border-gray-300 animate-pulse"></div>
          }
        </div>
      } @else {
        <!-- Grid View -->
        @if (viewMode() === 'grid') {
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (lesson of filteredLessons(); track lesson.id) {
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
                      <button class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-black hover:text-white transition-colors" [routerLink]="['/teacher/lessons', lesson.id, 'edit']" title="Edit Lesson">
                        <span class="material-icons text-sm">edit</span>
                      </button>
                      <button class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors" (click)="deleteLesson(lesson.id)" title="Delete Lesson">
                        <span class="material-icons text-sm">delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </app-card>
            }
          </div>
        } @else {
          <!-- List View -->
          <div class="bg-white border-4 border-black rounded-3xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div class="overflow-x-auto">
              <table class="w-full border-collapse text-left">
                <thead>
                  <tr class="bg-gray-100 border-b-4 border-black">
                    <th class="p-4 font-black text-black text-sm uppercase tracking-wider" scope="col">Lesson Title</th>
                    <th class="p-4 font-black text-black text-sm uppercase tracking-wider" scope="col">Subject</th>
                    <th class="p-4 font-black text-black text-sm uppercase tracking-wider" scope="col">Status</th>
                    <th class="p-4 font-black text-black text-sm uppercase tracking-wider" scope="col">Last Modified</th>
                    <th class="p-4 font-black text-black text-sm uppercase tracking-wider text-right" scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  @for (lesson of filteredLessons(); track lesson.id) {
                    <tr class="border-b-2 border-black/10 hover:bg-[#0ABAB5]/5 transition-colors">
                      <td class="p-4 font-bold text-black">{{ lesson.title }}</td>
                      <td class="p-4">
                        <span class="inline-flex items-center gap-1 text-xs font-black bg-[#0ABAB5]/10 text-[#0ABAB5] border-2 border-[#0ABAB5] px-2.5 py-0.5 rounded-full">
                          {{ lesson.subject }}
                        </span>
                      </td>
                      <td class="p-4">
                        <app-badge [variant]="lesson.status === 'PUBLISHED' ? 'success' : 'warning'">
                          {{ lesson.status }}
                        </app-badge>
                      </td>
                      <td class="p-4 text-sm text-gray-500 font-medium">
                        {{ lesson.lastModified | date:'shortDate' }}
                      </td>
                      <td class="p-4 text-right">
                        <div class="flex justify-end gap-2">
                          <app-button size="sm" variant="secondary" icon="edit" [routerLink]="['/teacher/lessons', lesson.id, 'edit']">
                            Edit
                          </app-button>
                          <app-button size="sm" variant="danger" icon="delete" (btnClick)="deleteLesson(lesson.id)">
                            Delete
                          </app-button>
                        </div>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        }
 
        @if (filteredLessons().length === 0) {
          <app-empty-state
            title="No Lessons Found"
            description="Try selecting a different status filter or create a new lesson to start building your curriculum."
            icon="menu_book"
          ></app-empty-state>
        }
      }
    </div>
  `
})
export class ContentEditorComponent implements OnInit {
  store = inject(ContentStore);
  
  viewMode = signal<'grid' | 'list'>(
    (localStorage.getItem('teacher_lessons_view_mode') as 'grid' | 'list') || 'grid'
  );

  statusFilter = signal<'ALL' | 'PUBLISHED' | 'DRAFT'>(
    (localStorage.getItem('teacher_lessons_status_filter') as 'ALL' | 'PUBLISHED' | 'DRAFT') || 'ALL'
  );

  filteredLessons = computed(() => {
    const filter = this.statusFilter();
    const lessons = this.store.lessons();
    if (filter === 'ALL') return lessons;
    return lessons.filter(l => l.status === filter);
  });

  ngOnInit() {
    this.store.loadContent();
  }

  setViewMode(mode: 'grid' | 'list') {
    this.viewMode.set(mode);
    localStorage.setItem('teacher_lessons_view_mode', mode);
  }

  setStatusFilter(filter: 'ALL' | 'PUBLISHED' | 'DRAFT') {
    this.statusFilter.set(filter);
    localStorage.setItem('teacher_lessons_status_filter', filter);
  }

  deleteLesson(id: string) {
    if (confirm('Are you sure you want to delete this lesson?')) {
      this.store.deleteLesson(id);
    }
  }
}
