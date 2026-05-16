import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContentStore } from '../store/content.store';
import { ClassStore } from '../store/class.store';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { CardComponent } from '../../../shared/components/card/card.component';

@Component({
  selector: 'app-analytics-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent, CardComponent],
  template: `
    <div class="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      
      <!-- Header -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div class="flex items-center space-x-4">
          <div class="w-16 h-16 bg-[#0ABAB5]/20 rounded-2xl border-4 border-black flex items-center justify-center">
            <span class="material-icons text-[#0ABAB5] text-3xl">insights</span>
          </div>
          <div>
            <h1 class="text-3xl font-black text-black tracking-tight">Analytics Dashboard</h1>
            <p class="text-gray-600 font-medium">Overview of your content and classes</p>
          </div>
        </div>
        <div class="flex space-x-3">
          <app-button variant="primary" icon="add_circle">New Lesson</app-button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <!-- Content Summary -->
        <app-card class="block">
          <div class="p-6">
            <div class="flex items-center space-x-3 mb-6">
              <div class="w-10 h-10 bg-gray-100 rounded-xl border-2 border-black flex items-center justify-center">
                <span class="material-icons text-black">library_books</span>
              </div>
              <h3 class="text-xl font-black text-black">Content</h3>
            </div>
            
            <div class="space-y-4">
              <div class="flex justify-between items-center p-4 bg-gray-50 rounded-2xl border-2 border-black">
                <span class="font-bold text-gray-600">Published Lessons</span>
                <span class="bg-[#0ABAB5] text-white px-3 py-1 rounded-xl font-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  {{ contentStore.publishedLessons().length }}
                </span>
              </div>
              <div class="flex justify-between items-center p-4 bg-gray-50 rounded-2xl border-2 border-black">
                <span class="font-bold text-gray-600">Draft Lessons</span>
                <span class="bg-white text-black px-3 py-1 rounded-xl font-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  {{ contentStore.draftLessons().length }}
                </span>
              </div>
              <div class="flex justify-between items-center p-4 bg-gray-50 rounded-2xl border-2 border-black">
                <span class="font-bold text-gray-600">Total Quizzes</span>
                <span class="bg-white text-black px-3 py-1 rounded-xl font-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  {{ contentStore.quizzes().length }}
                </span>
              </div>
            </div>
          </div>
        </app-card>

        <!-- Class Overview -->
        <app-card class="block md:col-span-2">
          <div class="p-6">
            <div class="flex items-center space-x-3 mb-6">
              <div class="w-10 h-10 bg-gray-100 rounded-xl border-2 border-black flex items-center justify-center">
                <span class="material-icons text-black">groups</span>
              </div>
              <h3 class="text-xl font-black text-black">Class Overview</h3>
            </div>
            
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="border-b-4 border-black bg-gray-100">
                    <th class="p-4 font-black text-gray-600 uppercase tracking-wider text-sm rounded-tl-xl">Class Name</th>
                    <th class="p-4 font-black text-gray-600 uppercase tracking-wider text-sm">Students</th>
                    <th class="p-4 font-black text-gray-600 uppercase tracking-wider text-sm">Avg Progress</th>
                    <th class="p-4 font-black text-gray-600 uppercase tracking-wider text-sm text-right rounded-tr-xl">Action</th>
                  </tr>
                </thead>
                <tbody>
                  @for (cls of classStore.classes(); track cls.id) {
                    <tr class="border-b-2 border-gray-100 hover:bg-gray-50 transition-colors group">
                      <td class="p-4">
                        <div class="flex items-center space-x-3">
                          <div class="w-10 h-10 bg-[#0ABAB5]/20 rounded-xl border-2 border-black flex items-center justify-center font-black text-[#0ABAB5]">
                            {{ cls.name.charAt(0) }}
                          </div>
                          <div>
                            <p class="font-bold text-black">{{ cls.name }}</p>
                            <p class="text-xs text-gray-500 font-bold">{{ cls.code }}</p>
                          </div>
                        </div>
                      </td>
                      <td class="p-4 font-bold text-gray-600">{{ cls.studentCount }}</td>
                      <td class="p-4">
                        <div class="flex items-center space-x-2">
                          <div class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden border border-gray-300 w-24">
                            <div class="h-full bg-[#0ABAB5]" [style.width.%]="cls.averageGrade"></div>
                          </div>
                          <span class="text-sm font-bold text-gray-600">{{ cls.averageGrade }}%</span>
                        </div>
                      </td>
                      <td class="p-4 text-right">
                        <button [routerLink]="['/teacher/classes', cls.id, 'stats']" class="px-4 py-2 bg-white text-black font-bold rounded-xl border-2 border-black hover:bg-black hover:text-white transition-colors text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-[2px] hover:translate-x-[2px]">
                          View
                        </button>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        </app-card>
      </div>
    </div>
  `
})
export class AnalyticsDashboardComponent implements OnInit {
  contentStore = inject(ContentStore);
  classStore = inject(ClassStore);

  ngOnInit() {
    this.contentStore.loadContent();
    this.classStore.loadClasses();
  }
}
