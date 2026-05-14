import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { TeacherProgressStore } from '../store/progress.store';

@Component({
  selector: 'app-class-stats',
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
          <div>
            <h1 class="text-3xl font-black text-black tracking-tight">Class Statistics</h1>
            <p class="text-gray-600 font-medium">
              {{ store.classSummary()?.className || 'Loading class...' }}
            </p>
          </div>
        </div>
      </div>

      <!-- Class Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <app-card class="block">
          <div class="p-6 text-center">
            <div class="text-gray-500 font-bold uppercase tracking-widest text-xs mb-2">Total Students</div>
            <div class="text-4xl font-black text-black">{{ store.classSummary()?.totalStudents || 0 }}</div>
            <div class="text-sm font-bold text-green-600 mt-2">{{ store.classSummary()?.activeStudents || 0 }} Active (30 days)</div>
          </div>
        </app-card>
        
        <app-card class="block">
          <div class="p-6 text-center">
            <div class="text-gray-500 font-bold uppercase tracking-widest text-xs mb-2">Average Score</div>
            <div class="text-4xl font-black text-[#0ABAB5]">{{ store.classSummary()?.averageScore || 0 }}%</div>
          </div>
        </app-card>
        
        <app-card class="block">
          <div class="p-6 text-center">
            <div class="text-gray-500 font-bold uppercase tracking-widest text-xs mb-2">Completion Rate</div>
            <div class="text-4xl font-black text-[#FFD700]">{{ store.classSummary()?.completionRate || 0 }}%</div>
          </div>
        </app-card>
      </div>

      <!-- Student Progress Table -->
      <app-card class="block" header="Student Progress">
        <div class="p-4 overflow-x-auto">
          <p-table 
            [value]="store.classStudents()" 
            [paginator]="true" 
            [rows]="10"
            [sortMode]="'multiple'"
            styleClass="p-datatable-gridlines custom-p-table"
          >
            <ng-template pTemplate="header">
              <tr class="bg-gray-100 border-b-4 border-black">
                <th pSortableColumn="studentName" class="p-4 font-black text-black uppercase tracking-wider text-sm border-r-2 border-black">
                  Student Name <p-sortIcon field="studentName"></p-sortIcon>
                </th>
                <th pSortableColumn="lessonsCompleted" class="p-4 font-black text-black uppercase tracking-wider text-sm border-r-2 border-black">
                  Lessons Completed <p-sortIcon field="lessonsCompleted"></p-sortIcon>
                </th>
                <th pSortableColumn="averageScore" class="p-4 font-black text-black uppercase tracking-wider text-sm border-r-2 border-black">
                  Average Score <p-sortIcon field="averageScore"></p-sortIcon>
                </th>
                <th pSortableColumn="lastActive" class="p-4 font-black text-black uppercase tracking-wider text-sm">
                  Last Active <p-sortIcon field="lastActive"></p-sortIcon>
                </th>
              </tr>
            </ng-template>
            <ng-template pTemplate="body" let-student>
              <tr 
                class="border-b-2 border-black/10 hover:bg-[#0ABAB5]/5 cursor-pointer transition-colors"
                (click)="goToStudentDetail(student.studentId)"
              >
                <td class="p-4 font-bold text-black border-r-2 border-black/10">
                  <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 rounded-full bg-[#0ABAB5]/20 flex items-center justify-center text-[#0ABAB5] border-2 border-black">
                      {{ student.studentName.charAt(0) }}
                    </div>
                    <span>{{ student.studentName }}</span>
                  </div>
                </td>
                <td class="p-4 font-bold text-black border-r-2 border-black/10">
                  {{ student.lessonsCompleted }}
                </td>
                <td class="p-4 font-bold text-black border-r-2 border-black/10">
                  {{ student.averageScore }}%
                </td>
                <td class="p-4 font-bold text-gray-500">
                  {{ student.lastActive | date:'mediumDate' }}
                </td>
              </tr>
            </ng-template>
            <ng-template pTemplate="emptymessage">
              <tr>
                <td colspan="4" class="p-8 text-center text-gray-500 font-bold">
                  No students found in this class.
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
export class ClassStatsComponent implements OnInit {
  store = inject(TeacherProgressStore);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  classId: string | null = null;

  ngOnInit() {
    this.classId = this.route.snapshot.paramMap.get('classId');
    if (this.classId) {
      this.store.loadClassStats(this.classId);
    }
  }

  goBack() {
    this.router.navigate(['/teacher/classes']);
  }

  goToStudentDetail(studentId: string) {
    if (this.classId) {
      this.router.navigate(['/teacher/classes', this.classId, 'students', studentId]);
    }
  }
}
