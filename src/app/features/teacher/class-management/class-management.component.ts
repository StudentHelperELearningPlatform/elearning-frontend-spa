import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassStore, ClassItem } from '../store/class.store';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { AvatarComponent } from '../../../shared/components/avatar/avatar.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-class-management',
  standalone: true,
  imports: [CommonModule, ButtonComponent, BadgeComponent, AvatarComponent, EmptyStateComponent],
  template: `
    <div class="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      
      <!-- Header -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div class="flex items-center space-x-4">
          <div class="w-16 h-16 bg-[#0ABAB5]/20 rounded-2xl border-4 border-black flex items-center justify-center">
            <span class="material-icons text-[#0ABAB5] text-3xl">groups</span>
          </div>
          <div>
            <h1 class="text-3xl font-black text-black tracking-tight">Class Management</h1>
            <p class="text-gray-600 font-medium">Manage your classes and students</p>
          </div>
        </div>
        <div class="flex space-x-3">
          <app-button variant="primary" icon="add">Create Class</app-button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Classes Sidebar -->
        <div class="lg:col-span-1 space-y-4">
          <h2 class="text-xl font-black text-black mb-4">Your Classes</h2>
          
          @if (store.loading()) {
            @for (i of [1,2]; track i) {
              <div class="h-32 bg-gray-200 rounded-2xl border-4 border-gray-300 animate-pulse"></div>
            }
          } @else {
            @for (cls of store.classes(); track cls.id) {
              <div 
                (click)="selectClass(cls)"
                (keydown.enter)="selectClass(cls)"
                tabindex="0"
                class="p-5 rounded-2xl border-4 cursor-pointer transition-all duration-200 group relative overflow-hidden"
                [ngClass]="{
                  'border-black bg-[#0ABAB5] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px]': selectedClass()?.id === cls.id,
                  'border-gray-300 bg-white hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]': selectedClass()?.id !== cls.id
                }">
                
                <div class="flex justify-between items-start mb-2">
                  <h3 class="font-black text-xl leading-tight" [ngClass]="{'text-white': selectedClass()?.id === cls.id, 'text-black': selectedClass()?.id !== cls.id}">
                    {{ cls.name }}
                  </h3>
                  <span class="text-sm font-bold px-2 py-1 rounded-lg border-2"
                        [ngClass]="{'bg-white text-black border-black': selectedClass()?.id === cls.id, 'bg-gray-100 text-gray-600 border-gray-300': selectedClass()?.id !== cls.id}">
                    {{ cls.code }}
                  </span>
                </div>
                
                <div class="flex items-center space-x-4 mt-4" [ngClass]="{'text-white/90': selectedClass()?.id === cls.id, 'text-gray-500': selectedClass()?.id !== cls.id}">
                  <div class="flex items-center">
                    <span class="material-icons text-sm mr-1">person</span>
                    <span class="font-bold">{{ cls.studentCount }}</span>
                  </div>
                  <div class="flex items-center">
                    <span class="material-icons text-sm mr-1">grade</span>
                    <span class="font-bold">{{ cls.averageGrade }}%</span>
                  </div>
                </div>
              </div>
            }
          }
        </div>

        <!-- Student List -->
        <div class="lg:col-span-2">
          @if (selectedClass()) {
            <div class="bg-white rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
              <div class="p-6 border-b-4 border-black flex justify-between items-center bg-gray-50">
                <div>
                  <h2 class="text-2xl font-black text-black">{{ selectedClass()?.name }} Students</h2>
                  <p class="text-gray-600 font-medium">Manage students in this class</p>
                </div>
                <app-button variant="secondary" icon="person_add">Invite</app-button>
              </div>
              
              <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                  <thead>
                    <tr class="border-b-4 border-black bg-gray-100">
                      <th class="p-4 font-black text-gray-600 uppercase tracking-wider text-sm">Student</th>
                      <th class="p-4 font-black text-gray-600 uppercase tracking-wider text-sm">Progress</th>
                      <th class="p-4 font-black text-gray-600 uppercase tracking-wider text-sm">Grade</th>
                      <th class="p-4 font-black text-gray-600 uppercase tracking-wider text-sm text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    @for (student of store.students(); track student.id) {
                      <tr class="border-b-2 border-gray-100 hover:bg-gray-50 transition-colors group">
                        <td class="p-4">
                          <div class="flex items-center space-x-3">
                            <app-avatar size="sm"></app-avatar>
                            <div>
                              <p class="font-bold text-black">{{ student.name }}</p>
                              <p class="text-sm text-gray-500">{{ student.email }}</p>
                            </div>
                          </div>
                        </td>
                        <td class="p-4">
                          <div class="flex items-center space-x-2">
                            <div class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden border border-gray-300 w-24">
                              <div class="h-full bg-[#0ABAB5]" [style.width.%]="student.progress"></div>
                            </div>
                            <span class="text-sm font-bold text-gray-600">{{ student.progress }}%</span>
                          </div>
                        </td>
                        <td class="p-4">
                          <app-badge [variant]="student.grade >= 90 ? 'success' : student.grade >= 70 ? 'primary' : 'warning'">
                            {{ student.grade }}%
                          </app-badge>
                        </td>
                        <td class="p-4 text-right">
                          <button class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-black hover:text-white transition-colors ml-auto opacity-0 group-hover:opacity-100" (click)="removeStudent(student.id)">
                            <span class="material-icons text-sm">more_vert</span>
                          </button>
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
          } @else {
            <div class="h-full flex items-center justify-center">
              <app-empty-state
                title="Select a Class"
                description="Choose a class from the sidebar to view its students."
                icon="class"
              ></app-empty-state>
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class ClassManagementComponent implements OnInit {
  store = inject(ClassStore);
  selectedClass = signal<ClassItem | null>(null);

  ngOnInit() {
    this.store.loadClasses();
    // Auto-select first class when loaded
    setTimeout(() => {
      const classes = this.store.classes();
      if (classes.length > 0) {
        this.selectClass(classes[0]);
      }
    }, 700);
  }

  selectClass(cls: ClassItem) {
    this.selectedClass.set(cls);
    this.store.loadStudents();
  }

  removeStudent(id: string) {
    if (confirm('Are you sure you want to remove this student from the class?')) {
      this.store.removeStudent(id);
    }
  }
}
