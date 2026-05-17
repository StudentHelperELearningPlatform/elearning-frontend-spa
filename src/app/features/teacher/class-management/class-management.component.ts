import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClassStore, ClassItem } from '../store/class.store';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { AvatarComponent } from '../../../shared/components/avatar/avatar.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-class-management',
  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent,
    BadgeComponent,
    AvatarComponent,
    EmptyStateComponent,
  ],
  template: `
    <div class="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      <!-- Header -->
      <div
        class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
      >
        <div class="flex items-center space-x-4">
          <div
            class="w-16 h-16 bg-[#0ABAB5]/20 rounded-2xl border-4 border-black flex items-center justify-center"
          >
            <span class="material-icons text-[#0ABAB5] text-3xl">groups</span>
          </div>
          <div>
            <h1 class="text-3xl font-black text-black tracking-tight">Class Management</h1>
            <p class="text-gray-600 font-medium">Manage your classes and students</p>
          </div>
        </div>
        <div class="flex space-x-3">
          <app-button
            variant="primary"
            icon="add"
            (btnClick)="createMode.set(!createMode())"
          >
            {{ createMode() ? 'Close' : 'Create Class' }}
          </app-button>
        </div>
      </div>

      <!-- Create Class Form -->
      @if (createMode()) {
        <div
          class="bg-white p-6 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-4"
        >
          <h2 class="text-xl font-black text-black">New Class</h2>
          <div class="space-y-3">
            <label class="block">
              <span class="text-sm font-black uppercase tracking-wide text-gray-600">
                Class Name *
              </span>
              <input
                [(ngModel)]="newClassName"
                placeholder="e.g. Algebra II Spring 2026"
                class="mt-1 w-full px-4 py-3 border-4 border-black rounded-xl font-bold focus:outline-none focus:ring-4 focus:ring-[#0ABAB5]/30"
              />
            </label>
            <label class="block">
              <span class="text-sm font-black uppercase tracking-wide text-gray-600">
                Description
              </span>
              <textarea
                [(ngModel)]="newClassDescription"
                placeholder="What is this class about?"
                rows="3"
                class="mt-1 w-full px-4 py-3 border-4 border-black rounded-xl font-bold focus:outline-none focus:ring-4 focus:ring-[#0ABAB5]/30"
              ></textarea>
            </label>
          </div>
          @if (store.error()) {
            <p class="text-red-600 font-bold text-sm">{{ store.error() }}</p>
          }
          <div class="flex justify-end gap-3">
            <app-button variant="secondary" (btnClick)="cancelCreate()">Cancel</app-button>
            <app-button
              variant="primary"
              icon="check"
              [disabled]="!newClassName.trim() || store.loading()"
              [loading]="store.loading()"
              (btnClick)="submitCreate()"
            >
              Create
            </app-button>
          </div>
        </div>
      }

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Classes Sidebar -->
        <div class="lg:col-span-1 space-y-4">
          <h2 class="text-xl font-black text-black mb-4">Your Classes</h2>

          @if (store.loading() && store.classes().length === 0) {
            @for (i of [1, 2]; track i) {
              <div class="h-32 bg-gray-200 rounded-2xl border-4 border-gray-300 animate-pulse"></div>
            }
          } @else if (store.classes().length === 0) {
            <app-empty-state
              title="No classes yet"
              description="Create your first class to start teaching."
              icon="class"
            />
          } @else {
            @for (cls of store.classes(); track cls.id) {
              <div
                (click)="selectClass(cls)"
                (keydown.enter)="selectClass(cls)"
                tabindex="0"
                class="p-5 rounded-2xl border-4 cursor-pointer transition-all duration-200 group relative overflow-hidden"
                [class.border-black]="selectedClass()?.id === cls.id"
                [class.bg-[#0ABAB5]]="selectedClass()?.id === cls.id"
                [class.text-white]="selectedClass()?.id === cls.id"
                [class.shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]]="selectedClass()?.id === cls.id"
                [class.border-gray-300]="selectedClass()?.id !== cls.id"
                [class.bg-white]="selectedClass()?.id !== cls.id"
                [class.hover:border-black]="selectedClass()?.id !== cls.id"
              >
                <div class="flex justify-between items-start mb-2">
                  <h3 class="font-black text-xl leading-tight">{{ cls.name }}</h3>
                  <span class="text-sm font-bold px-2 py-1 rounded-lg border-2 bg-white text-black">
                    {{ cls.code }}
                  </span>
                </div>
                @if (cls.description) {
                  <p class="text-sm opacity-90 mb-3 line-clamp-2">{{ cls.description }}</p>
                }
                <div class="flex items-center space-x-4 mt-4">
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
          @if (selectedClass(); as cls) {
            <div
              class="bg-white rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
            >
              <div class="p-6 border-b-4 border-black bg-gray-50 space-y-4">
                <div class="flex justify-between items-center">
                  <div>
                    <h2 class="text-2xl font-black text-black">{{ cls.name }} Students</h2>
                    <p class="text-gray-600 font-medium">Manage students in this class</p>
                  </div>
                </div>

                <!-- Invite Form -->
                <div class="flex flex-col md:flex-row gap-2">
                  <input
                    [(ngModel)]="inviteStudentId"
                    placeholder="Student ID or email"
                    class="flex-1 px-4 py-3 border-4 border-black rounded-xl font-bold focus:outline-none focus:ring-4 focus:ring-[#0ABAB5]/30"
                  />
                  <app-button
                    variant="primary"
                    icon="person_add"
                    [disabled]="!inviteStudentId.trim() || store.loading()"
                    (btnClick)="inviteStudent()"
                  >
                    Invite
                  </app-button>
                </div>
              </div>

              <div class="overflow-x-auto">
                @if (store.students().length === 0) {
                  <div class="p-12 text-center text-gray-500 font-bold">
                    No students in this class yet. Invite one above to get started.
                  </div>
                } @else {
                  <table class="w-full text-left border-collapse">
                    <thead>
                      <tr class="border-b-4 border-black bg-gray-100">
                        <th class="p-4 font-black text-gray-600 uppercase tracking-wider text-sm">
                          Student
                        </th>
                        <th class="p-4 font-black text-gray-600 uppercase tracking-wider text-sm">
                          Progress
                        </th>
                        <th class="p-4 font-black text-gray-600 uppercase tracking-wider text-sm">
                          Grade
                        </th>
                        <th
                          class="p-4 font-black text-gray-600 uppercase tracking-wider text-sm text-right"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      @for (student of store.students(); track student.id) {
                        <tr
                          class="border-b-2 border-gray-100 hover:bg-gray-50 transition-colors group"
                        >
                          <td class="p-4">
                            <div class="flex items-center space-x-3">
                              <app-avatar size="sm" />
                              <div>
                                <p class="font-bold text-black">{{ student.name }}</p>
                                <p class="text-sm text-gray-500">{{ student.email }}</p>
                              </div>
                            </div>
                          </td>
                          <td class="p-4">
                            <div class="flex items-center space-x-2">
                              <div
                                class="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden border border-gray-300 w-24"
                              >
                                <div class="h-full bg-[#0ABAB5]" [style.width.%]="student.progress"></div>
                              </div>
                              <span class="text-sm font-bold text-gray-600">{{ student.progress }}%</span>
                            </div>
                          </td>
                          <td class="p-4">
                            <app-badge
                              [variant]="
                                student.grade >= 90
                                  ? 'success'
                                  : student.grade >= 70
                                    ? 'primary'
                                    : 'warning'
                              "
                            >
                              {{ student.grade }}%
                            </app-badge>
                          </td>
                          <td class="p-4 text-right">
                            <button
                              class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-black hover:text-white transition-colors ml-auto"
                              (click)="removeStudent(student.id)"
                              aria-label="Remove student"
                            >
                              <span class="material-icons text-sm">delete</span>
                            </button>
                          </td>
                        </tr>
                      }
                    </tbody>
                  </table>
                }
              </div>
            </div>
          } @else {
            <div class="h-full flex items-center justify-center">
              <app-empty-state
                title="Select a Class"
                description="Choose a class from the sidebar to view its students."
                icon="class"
              />
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class ClassManagementComponent implements OnInit {
  store = inject(ClassStore);
  selectedClass = signal<ClassItem | null>(null);

  createMode = signal(false);
  newClassName = '';
  newClassDescription = '';
  inviteStudentId = '';

  ngOnInit() {
    this.store.loadClasses();
  }

  selectClass(cls: ClassItem) {
    this.selectedClass.set(cls);
    this.store.loadStudents(cls.id);
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
    this.newClassName = '';
    this.newClassDescription = '';
    this.createMode.set(false);
  }

  inviteStudent() {
    const cls = this.selectedClass();
    const studentId = this.inviteStudentId.trim();
    if (!cls || !studentId) return;
    this.store.addStudent(cls.id, studentId);
    this.inviteStudentId = '';
  }

  removeStudent(studentId: string) {
    const cls = this.selectedClass();
    if (!cls) return;
    if (confirm('Are you sure you want to remove this student from the class?')) {
      this.store.removeStudent(cls.id, studentId);
    }
  }
}
