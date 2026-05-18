import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContentStore } from '../state/content.store';
import { ClassStore } from '../state/class.store';
import { TeacherProgressStore } from '../state/progress.store';
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
          <app-button variant="primary" icon="add_circle" routerLink="/teacher/lessons/new">New Lesson</app-button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
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
              <div 
                routerLink="/teacher/content" 
                class="flex justify-between items-center p-4 bg-gray-50 rounded-2xl border-2 border-black hover:bg-[#0ABAB5]/10 hover:translate-y-[-2px] transition-all duration-200 cursor-pointer group"
                title="View Published Lessons in Content Editor"
              >
                <span class="font-bold text-gray-600 group-hover:text-black">Published Lessons</span>
                <span class="bg-[#0ABAB5] text-white px-3 py-1 rounded-xl font-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  {{ contentStore.publishedLessons().length }}
                </span>
              </div>
              <div 
                routerLink="/teacher/content" 
                class="flex justify-between items-center p-4 bg-gray-50 rounded-2xl border-2 border-black hover:bg-[#0ABAB5]/10 hover:translate-y-[-2px] transition-all duration-200 cursor-pointer group"
                title="View Draft Lessons in Content Editor"
              >
                <span class="font-bold text-gray-600 group-hover:text-black">Draft Lessons</span>
                <span class="bg-white text-black px-3 py-1 rounded-xl font-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  {{ contentStore.draftLessons().length }}
                </span>
              </div>
            </div>
          </div>
        </app-card>

        <!-- Class Overview -->
        <app-card class="block lg:col-span-2">
          <div class="p-6">
            <div class="flex items-center space-x-3 mb-6">
              <div class="w-10 h-10 bg-gray-100 rounded-xl border-2 border-black flex items-center justify-center">
                <span class="material-icons text-black">groups</span>
              </div>
              <h3 class="text-xl font-black text-black">Class Overview</h3>
            </div>
            
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr class="border-b-4 border-black bg-gray-100">
                    <th class="p-4 font-black text-gray-600 uppercase tracking-wider text-sm rounded-tl-xl" scope="col">Class Name</th>
                    <th class="p-4 font-black text-gray-600 uppercase tracking-wider text-sm" scope="col">Students</th>
                    <th class="p-4 font-black text-gray-600 uppercase tracking-wider text-sm" scope="col">Avg Progress</th>
                    <th class="p-4 font-black text-gray-600 uppercase tracking-wider text-sm text-right rounded-tr-xl" scope="col">Action</th>
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
                          </div>
                        </div>
                      </td>
                      <td class="p-4 font-bold text-gray-600">{{ cls.studentCount }}</td>
                      <td class="p-4">
                        <div class="flex items-center space-x-2">
                          <div class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden border border-gray-300 w-24">
                            <div class="h-full bg-[#0ABAB5]" [style.width.%]="(cls.averageGrade ? cls.averageGrade * 10 : 75)"></div>
                          </div>
                          <span class="text-sm font-bold text-gray-600">
                            {{ cls.averageGrade ? (cls.averageGrade | number:'1.1-1') + '/10' : '7.5/10' }}
                          </span>
                        </div>
                      </td>
                      <td class="p-4 text-right">
                        <button [routerLink]="['/teacher/classes', cls.id]" class="px-4 py-2 bg-white text-black font-bold rounded-xl border-2 border-black hover:bg-black hover:text-white transition-colors text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-[2px] hover:translate-x-[2px]">
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

      <!-- Student Performance Directory -->
      <app-card class="block">
        <div class="p-6 border-b-4 border-black bg-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gray-100 rounded-xl border-2 border-black flex items-center justify-center">
              <span class="material-icons text-black">assignment_ind</span>
            </div>
            <div>
              <h3 class="text-xl font-black text-black">Student Performance Directory</h3>
              <p class="text-xs text-gray-500 font-bold">Real-time learning stats from the PROGRESS CONTROLLER</p>
            </div>
          </div>
          <span class="bg-indigo-500 text-white px-3 py-1 rounded-xl font-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-xs">
            LIVE SYNCED
          </span>
        </div>

        <div class="p-6">
          @if (progressStore.loading()) {
            <div class="flex flex-col items-center justify-center py-12 space-y-3">
              <span class="material-icons animate-spin text-[#0ABAB5] text-4xl">sync</span>
              <p class="text-sm text-gray-500 font-bold">Fetching student progress records from the API...</p>
            </div>
          } @else if (progressStore.error()) {
            <div class="p-6 text-center bg-red-50 text-red-600 font-bold border-2 border-red-500 rounded-2xl">
              <span class="material-icons text-3xl">error_outline</span>
              <p class="text-sm mt-2">Error loading progress data: {{ progressStore.error() }}</p>
            </div>
          } @else if (progressStore.allStudents().length === 0) {
            <div class="text-center py-8">
              <span class="material-icons text-gray-400 text-5xl">group_off</span>
              <h4 class="text-lg font-black text-black mt-2">No Students Enrolled</h4>
              <p class="text-gray-500 font-bold text-sm mt-1">Students enrolled in your classes will appear here with progress reports.</p>
            </div>
          } @else {
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr class="border-b-4 border-black bg-gray-100">
                    <th class="p-4 font-black text-gray-600 uppercase tracking-wider text-sm" scope="col">Student</th>
                    <th class="p-4 font-black text-gray-600 uppercase tracking-wider text-sm text-center" scope="col">Lessons Completed</th>
                    <th class="p-4 font-black text-gray-600 uppercase tracking-wider text-sm text-center" scope="col">Average Score</th>
                    <th class="p-4 font-black text-gray-600 uppercase tracking-wider text-sm" scope="col">Last Active</th>
                    <th class="p-4 font-black text-gray-600 uppercase tracking-wider text-sm text-right" scope="col">Activity Details</th>
                  </tr>
                </thead>
                <tbody>
                  @for (student of progressStore.allStudents(); track student.studentId) {
                    <tr class="border-b-2 border-black/10 hover:bg-[#0ABAB5]/5 transition-colors">
                      <td class="p-4 font-bold text-black flex items-center space-x-3">
                        <div class="w-10 h-10 bg-indigo-100 rounded-full border-2 border-black flex items-center justify-center font-black text-indigo-600">
                          {{ student.studentName.charAt(0) }}
                        </div>
                        <span>{{ student.studentName }}</span>
                      </td>
                      <td class="p-4 text-center">
                        <span class="bg-gray-100 border-2 border-black px-3 py-1 rounded-xl font-bold text-sm">
                          {{ student.lessonsCompleted }}
                        </span>
                      </td>
                      <td class="p-4 text-center">
                        <span 
                          class="px-3 py-1 rounded-xl font-black text-sm border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                          [ngClass]="{
                            'bg-green-100 text-green-700': student.averageScore >= 80,
                            'bg-yellow-100 text-yellow-700': student.averageScore >= 50 && student.averageScore < 80,
                            'bg-red-100 text-red-700': student.averageScore < 50
                          }"
                        >
                          {{ student.averageScore }}%
                        </span>
                      </td>
                      <td class="p-4 text-sm text-gray-500 font-medium">
                        {{ student.lastActive | date:'mediumDate' }}
                      </td>
                      <td class="p-4 text-right">
                        <button (click)="inspectStudent(student.studentId)" class="px-4 py-2 bg-[#0ABAB5] text-white font-black rounded-xl border-2 border-black hover:bg-white hover:text-black transition-colors text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-[2px] hover:translate-x-[2px]">
                          Inspect
                        </button>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          }
        </div>
      </app-card>
    </div>

    <!-- Student Detail Modal -->
    @if (isModalOpen() && progressStore.selectedStudentDetail()) {
      @let detail = progressStore.selectedStudentDetail();
      <div class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200" role="dialog" aria-modal="true">
        <div class="bg-white rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          <!-- Modal Header -->
          <div class="p-6 border-b-4 border-black bg-indigo-50 flex justify-between items-center">
            <div>
              <h2 class="text-2xl font-black text-black">{{ detail?.studentName }}'s Learning Profile</h2>
              <p class="text-xs text-gray-500 font-bold">LMS Progress Report & Lesson History</p>
            </div>
            <button (click)="closeModal()" class="w-10 h-10 rounded-xl border-2 border-black bg-white hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]" title="Close Modal">
              <span class="material-icons">close</span>
            </button>
          </div>

          <!-- Modal Body -->
          <div class="p-6 overflow-y-auto space-y-6 flex-1">
            <!-- Summary Stats -->
            <div class="grid grid-cols-2 gap-4">
              <div class="p-4 bg-gray-50 rounded-2xl border-2 border-black flex flex-col items-center justify-center">
                <span class="text-sm font-bold text-gray-500">Lessons Completed</span>
                <span class="text-3xl font-black text-black mt-1">{{ detail?.totalLessonsCompleted }}</span>
              </div>
              <div class="p-4 bg-gray-50 rounded-2xl border-2 border-black flex flex-col items-center justify-center">
                <span class="text-sm font-bold text-gray-500">Average Grade</span>
                <span class="text-3xl font-black text-[#0ABAB5] mt-1">{{ detail?.averageScore }}%</span>
              </div>
            </div>

            <!-- Lesson Breakdown Table -->
            <div class="space-y-3">
              <h4 class="text-lg font-black text-black">Lesson History</h4>
              
              <div class="border-2 border-black rounded-2xl overflow-hidden bg-white">
                <table class="w-full text-left border-collapse">
                  <thead>
                    <tr class="bg-gray-50 border-b-2 border-black text-xs font-bold text-gray-500">
                      <th class="p-3" scope="col">Lesson Title</th>
                      <th class="p-3 text-center" scope="col">Status</th>
                      <th class="p-3 text-right" scope="col">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    @for (item of detail?.history; track item.lessonId) {
                      <tr class="border-b border-black/10 hover:bg-gray-50 text-sm font-medium">
                        <td class="p-3 font-bold text-black">{{ item.lessonTitle }}</td>
                        <td class="p-3 text-center">
                          <span 
                            class="px-2.5 py-0.5 rounded-full text-xs font-black border-2 border-black inline-flex items-center gap-1"
                            [ngClass]="{
                              'bg-green-100 text-green-700': item.status === 'COMPLETED',
                              'bg-yellow-100 text-yellow-700': item.status === 'IN_PROGRESS',
                              'bg-gray-100 text-gray-500': item.status === 'NOT_STARTED'
                            }"
                          >
                            <span class="material-icons text-xs">
                              {{ item.status === 'COMPLETED' ? 'check_circle' : item.status === 'IN_PROGRESS' ? 'pending' : 'radio_button_unchecked' }}
                            </span>
                            {{ item.status === 'COMPLETED' ? 'Completed' : item.status === 'IN_PROGRESS' ? 'In Progress' : 'Not Started' }}
                          </span>
                        </td>
                        <td class="p-3 text-right font-black text-black">
                          {{ item.score !== null && item.score !== undefined ? item.score + '%' : '—' }}
                        </td>
                      </tr>
                    } @empty {
                      <tr>
                        <td colspan="3" class="p-6 text-center text-gray-500 font-bold">No lesson activity registered yet.</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="p-4 bg-gray-50 border-t-2 border-black flex justify-end">
            <app-button variant="secondary" (btnClick)="closeModal()">Close Report</app-button>
          </div>

        </div>
      </div>
    }
  `
})
export class AnalyticsDashboardComponent implements OnInit {
  contentStore = inject(ContentStore);
  classStore = inject(ClassStore);
  progressStore = inject(TeacherProgressStore);

  isModalOpen = signal(false);

  ngOnInit() {
    this.contentStore.loadContent();
    this.classStore.loadClasses();
    this.progressStore.loadAllStudents();
  }

  inspectStudent(studentId: string) {
    this.progressStore.loadStudentDetail(studentId);
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }
}
