import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClassStore } from '../state/class.store';
import { TeacherClass } from '../models/class.model';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-class-management',
  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent,
    EmptyStateComponent,
  ],
  template: `
    <div class="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      <!-- Header -->
      <div
        class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
      >
        <div>
          <h1 class="text-3xl font-black text-black">Class Management</h1>
          <p class="text-gray-600 font-medium">Manage your classes and students</p>
        </div>

        @if (!createMode()) {
          <app-button variant="primary" icon="add" (btnClick)="createMode.set(true)">
            Create Class
          </app-button>
        }
      </div>

      <!-- Create Class Form -->
      @if (createMode()) {
        <div class="bg-white p-6 rounded-3xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-4">
          <h2 class="text-xl font-black">New Class</h2>
          <div class="space-y-3">
            <label class="block">
              <span class="text-sm font-bold mb-1 block">Class name *</span>
              <input
                [(ngModel)]="newClassName"
                placeholder="e.g. Algebra 101"
                class="w-full px-4 py-2 border-2 border-black rounded-xl font-medium"
                aria-label="Class name"
              />
            </label>
            <label class="block">
              <span class="text-sm font-bold mb-1 block">Description</span>
              <textarea
                [(ngModel)]="newClassDescription"
                placeholder="Brief description of the class"
                rows="3"
                class="w-full px-4 py-2 border-2 border-black rounded-xl font-medium"
                aria-label="Class description"
              ></textarea>
            </label>
          </div>
          <div class="flex gap-3">
            <app-button variant="primary" icon="check" (btnClick)="submitCreate()">
              Create
            </app-button>
            <app-button variant="secondary" (btnClick)="cancelCreate()">
              Cancel
            </app-button>
          </div>
        </div>
      }

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- CLASSES LIST -->
        <div class="lg:col-span-1 space-y-4">
          <h2 class="text-xl font-black">Your Classes</h2>

          @if (store.loading()) {
            @for (i of [1, 2, 3]; track i) {
              <div class="h-24 bg-gray-200 rounded-2xl animate-pulse"></div>
            }
          } @else {
            @for (cls of store.classes(); track cls.id) {
              <div
                class="p-4 border-4 rounded-2xl cursor-pointer"
                [class.border-black]="selectedClass()?.id === cls.id"
                [class.bg-[#0ABAB5]]="selectedClass()?.id === cls.id"
                [class.text-white]="selectedClass()?.id === cls.id"
                [class.border-gray-300]="selectedClass()?.id !== cls.id"
                [class.bg-white]="selectedClass()?.id !== cls.id"
                role="button"
                tabindex="0"
                (click)="selectClass(cls)"
                (keydown.enter)="selectClass(cls)"
                (keydown.space)="selectClass(cls)"
              >
                <p class="font-black">{{ cls.name }}</p>
                <p class="text-sm mt-2">Students: {{ cls.studentCount }}</p>
              </div>
            } @empty {
              <p class="text-gray-500 font-medium">No classes yet.</p>
            }
          }
        </div>

        <!-- STUDENTS -->
        <div class="lg:col-span-2">
          @if (selectedClassDetail(); as detail) {
            <div class="bg-white rounded-3xl border-4 border-black p-6 space-y-6">
              <h2 class="text-2xl font-black">{{ detail.name }} Students</h2>

              <!-- Invite student -->
              <div class="flex flex-col sm:flex-row gap-3 items-stretch sm:items-end">
                <label class="flex-1">
                  <span class="text-sm font-bold mb-1 block">Invite student by ID</span>
                  <input
                    [(ngModel)]="inviteStudentId"
                    placeholder="Student ID"
                    class="w-full px-4 py-2 border-2 border-black rounded-xl font-medium"
                    aria-label="Student ID to invite"
                  />
                </label>
                <app-button variant="primary" icon="person_add" (btnClick)="inviteStudent()">
                  Invite
                </app-button>
              </div>

              <table class="w-full">
                <thead>
                  <tr class="text-left border-b-2 border-black">
                    <th class="py-2">Name</th>
                    <th class="py-2">Email</th>
                    <th class="py-2">Grade</th>
                    <th class="py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  @for (student of detail.students; track student.id) {
                    <tr class="border-b border-gray-200">
                      <td class="py-2">{{ student.name }}</td>
                      <td class="py-2">{{ student.email }}</td>
                      <td class="py-2">-</td>
                      <td class="py-2 text-right">
                        <button
                          (click)="removeStudent(student.id)"
                          class="text-red-600 font-bold"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  } @empty {
                    <tr>
                      <td colspan="4" class="py-4 text-center text-gray-500 font-medium">
                        No students yet. Invite one above.
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

  createMode = signal(false);
  newClassName = '';
  newClassDescription = '';

  inviteStudentId = '';

  ngOnInit() {
    this.store.loadClasses();
  }

  selectClass(cls: TeacherClass) {
    this.selectedClass.set(cls);
    this.store.loadClassDetail(cls.id);
  }

  removeStudent(studentId: string) {
    const classId = this.selectedClass()?.id;
    if (!classId) return;

    if (confirm('Remove this student?')) {
      this.store.removeStudent(classId, studentId);
    }
  }

  submitCreate() {
    const name = this.newClassName.trim();
    if (!name) return;
    this.store.createClass({
      name,
      description: this.newClassDescription.trim() || undefined,
    });
    this.cancelCreate();
  }

  cancelCreate() {
    this.createMode.set(false);
    this.newClassName = '';
    this.newClassDescription = '';
  }

  inviteStudent() {
    const cls = this.selectedClass();
    const id = this.inviteStudentId.trim();
    if (!cls || !id) return;
    this.store.addStudent(cls.id, id);
    this.inviteStudentId = '';
  }
}
