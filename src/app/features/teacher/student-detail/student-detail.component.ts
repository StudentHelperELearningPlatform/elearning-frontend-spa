import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { TeacherProgressStore } from '../store/progress.store';

@Component({
  selector: 'app-student-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, TableModule, ButtonComponent, CardComponent],
  template: `
    <div class="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      <!-- Header -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div class="flex items-center space-x-4">
          <button (click)="goBack()" class="flex items-center justify-center w-10 h-10 rounded-full border-2 border-black hover:bg-gray-100 transition-colors">
            <span class="material-icons text-black">arrow_back</span>
          </button>
          <div class="w-14 h-14 bg-[#0ABAB5]/20 rounded-full flex items-center justify-center border-2 border-black text-[#0ABAB5] font-black text-2xl">
            {{ store.selectedStudentDetail()?.studentName?.charAt(0) || '?' }}
          </div>
          <div>
            <h1 class="text-3xl font-black text-black tracking-tight">
              {{ store.selectedStudentDetail()?.studentName || 'Loading student...' }}
            </h1>
            <p class="text-gray-600 font-medium">Student Detail View</p>
          </div>
        </div>
      </div>

      <!-- Overview Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <app-card class="block">
          <div class="p-6 text-center">
            <div class="text-gray-500 font-bold uppercase tracking-widest text-xs mb-2">Lessons Completed</div>
            <div class="text-4xl font-black text-black">{{ store.selectedStudentDetail()?.totalLessonsCompleted || 0 }}</div>
          </div>
        </app-card>
        
        <app-card class="block">
          <div class="p-6 text-center">
            <div class="text-gray-500 font-bold uppercase tracking-widest text-xs mb-2">Average Score</div>
            <div class="text-4xl font-black text-[#0ABAB5]">{{ store.selectedStudentDetail()?.averageScore || 0 }}%</div>
          </div>
        </app-card>
        
        <app-card class="block">
          <div class="p-6 text-center">
            <div class="text-gray-500 font-bold uppercase tracking-widest text-xs mb-2">Last Active</div>
            <div class="text-xl font-black text-black mt-4">
              {{ store.selectedStudentDetail()?.lastActive ? (store.selectedStudentDetail()?.lastActive | date:'mediumDate') : 'Never' }}
            </div>
          </div>
        </app-card>
      </div>

      <!-- Lesson Breakdown Table -->
      <app-card class="block" header="Lesson Breakdown">
        <div class="p-4 overflow-x-auto">
          <p-table 
            [value]="store.selectedStudentDetail()?.history || []" 
            [paginator]="true" 
            [rows]="10"
            styleClass="p-datatable-gridlines custom-p-table"
          >
            <ng-template pTemplate="header">
              <tr class="bg-gray-100 border-b-4 border-black">
                <th class="p-4 font-black text-black uppercase tracking-wider text-sm border-r-2 border-black">Lesson Title</th>
                <th class="p-4 font-black text-black uppercase tracking-wider text-sm border-r-2 border-black">Status</th>
                <th class="p-4 font-black text-black uppercase tracking-wider text-sm border-r-2 border-black">Score</th>
                <th class="p-4 font-black text-black uppercase tracking-wider text-sm">Date Completed</th>
              </tr>
            </ng-template>
            <ng-template pTemplate="body" let-lesson>
              <tr class="border-b-2 border-black/10 hover:bg-[#0ABAB5]/5 transition-colors">
                <td class="p-4 font-bold text-black border-r-2 border-black/10">
                  {{ lesson.lessonTitle }}
                </td>
                <td class="p-4 font-bold border-r-2 border-black/10">
                  <span class="px-3 py-1 text-xs font-black uppercase tracking-wider rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        [ngClass]="{
                          'bg-green-100 text-green-700': lesson.status === 'COMPLETED',
                          'bg-amber-100 text-amber-700': lesson.status === 'IN_PROGRESS',
                          'bg-gray-100 text-gray-500': lesson.status === 'NOT_STARTED'
                        }">
                    {{ lesson.status.replace('_', ' ') }}
                  </span>
                </td>
                <td class="p-4 font-bold text-black border-r-2 border-black/10">
                  {{ lesson.score !== null ? lesson.score + '%' : '-' }}
                </td>
                <td class="p-4 font-bold text-gray-500">
                  {{ lesson.dateCompleted ? (lesson.dateCompleted | date:'short') : '-' }}
                </td>
              </tr>
            </ng-template>
            <ng-template pTemplate="emptymessage">
              <tr>
                <td colspan="4" class="p-8 text-center text-gray-500 font-bold">
                  No lesson history available for this student.
                </td>
              </tr>
            </ng-template>
          </p-table>
        </div>
      </app-card>
    </div>
  `,
  styles: [`
    :host ::ng-deep {
      .custom-p-table .p-datatable-thead > tr > th {
        background: #f3f4f6;
        color: black;
        border-color: black;
      }
      .custom-p-table .p-paginator {
        border-top: 4px solid black;
        background: white;
        padding: 1rem;
      }
      .custom-p-table .p-paginator .p-paginator-pages .p-paginator-page.p-highlight {
        background: #0ABAB5;
        color: white;
        border: 2px solid black;
      }
    }
  `]
})
export class StudentDetailComponent implements OnInit {
  store = inject(TeacherProgressStore);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  classId: string | null = null;
  studentId: string | null = null;

  ngOnInit() {
    this.classId = this.route.snapshot.paramMap.get('classId');
    this.studentId = this.route.snapshot.paramMap.get('studentId');
    
    if (this.studentId) {
      this.store.loadStudentDetail(this.studentId);
    }
  }

  goBack() {
    if (this.classId) {
      this.router.navigate(['/teacher/classes', this.classId, 'stats']);
    } else {
      this.router.navigate(['/teacher/students']); // For Melora's flow
    }
  }
}
