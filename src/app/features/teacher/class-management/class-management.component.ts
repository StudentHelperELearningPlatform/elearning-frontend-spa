import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassStore } from '../store/class.store';
import { TeacherClass } from '../models/class.model';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { AvatarComponent } from '../../../shared/components/avatar/avatar.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-class-management',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    BadgeComponent,
    AvatarComponent,
    EmptyStateComponent,
  ],
  template: `
    <div class="p-6 md:p-8 max-w-7xl mx-auto space-y-8">

      <!-- Header -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div>
          <h1 class="text-3xl font-black text-black">Class Management</h1>
          <p class="text-gray-600 font-medium">Manage your classes and students</p>
        </div>

        <app-button variant="primary" icon="add">
          Create Class
        </app-button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <!-- CLASSES LIST -->
        <div class="lg:col-span-1 space-y-4">
          <h2 class="text-xl font-black">Your Classes</h2>

          @if (store.loading()) {
            @for (i of [1,2,3]; track i) {
              <div class="h-24 bg-gray-200 rounded-2xl animate-pulse"></div>
            }
          } @else {
            @for (cls of store.classes(); track cls.id) {
            <div
           class="p-4 border-4 rounded-2xl cursor-pointer"
           [ngClass]="selectedClass()?.id === cls.id
           ? 'border-black bg-[#0ABAB5] text-white'
           : 'border-gray-300 bg-white'"
           role="button"
          tabindex="0"
          (click)="selectClass(cls)"
          (keydown.enter)="selectClass(cls)"
          (keydown.space)="selectClass(cls)"
            >
           >
                <p class="font-black">{{ cls.name }}</p>

                <p class="text-sm mt-2">
                  Students: {{ cls.studentCount }}
                </p>
              </div>
            }
          }
        </div>

        <!-- STUDENTS -->
        <div class="lg:col-span-2">

          @if (selectedClassDetail()) {

            <div class="bg-white rounded-3xl border-4 border-black p-6">

              <h2 class="text-2xl font-black mb-6">
                {{ selectedClassDetail()?.name }} Students
              </h2>

              <table class="w-full">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Grade</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  @for (student of selectedClassDetail()?.students ?? []; track student.id) {
                    <tr>
                      <td>{{ student.name }}</td>
                      <td>{{ student.email }}</td>
                      <td>-</td>

                      <td class="text-right">
                        <button
                          (click)="removeStudent(student.id)"
                          class="text-red-600 font-bold"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  }
                </tbody>

              </table>
            </div>

          } @else {
            <app-empty-state
              title="Select a class"
              description="Choose a class to see students"
              icon="class"
            />
          }

        </div>
      </div>
    </div>
  `,
})
export class ClassManagementComponent implements OnInit {

  store = inject(ClassStore);

  selectedClass = signal<TeacherClass | null>(null);

  selectedClassDetail = computed(() => this.store.currentClass());

  ngOnInit() {
    this.store.loadClasses();
  }

  selectClass(cls: TeacherClass) {
    this.selectedClass.set(cls);
    this.store.loadClassDetail(cls.id); // ✔ FIX IMPORTANT
  }

  removeStudent(studentId: string) {
    const classId = this.selectedClass()?.id;

    if (!classId) return;

    if (confirm('Remove this student?')) {
      this.store.removeStudent(classId, studentId); // ✔ FIX 2 args
    }
  }
}