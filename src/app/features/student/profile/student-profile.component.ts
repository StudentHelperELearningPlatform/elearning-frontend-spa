import { Component, inject, OnInit, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { StudentProfileStore, RawStudentProfileUpdate } from '../store/profile.store';
import { AuthStore } from '../../auth/store/auth.store';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { AvatarComponent } from '../../../shared/components/avatar/avatar.component';
import { FormFieldComponent } from '../../../shared/components/form-field/form-field.component';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { getInitials, handleFileSelect, parseFullName } from '../../../shared/utils/profile.utils';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastModule,
    CardComponent,
    ButtonComponent,
    AvatarComponent,
    FormFieldComponent,
    BadgeComponent,
  ],
  providers: [MessageService],
  template: `
    <div class="max-w-6xl mx-auto p-4 md:p-8 font-sans bg-gray-50 text-black min-h-[calc(100vh-84px)]">
      <p-toast></p-toast>
      <div class="flex items-center justify-between mb-8 border-b-4 border-black pb-4">
        <h1 class="text-4xl md:text-5xl font-black uppercase tracking-tighter">My Profile</h1>

        @if (!isEditing()) {
          <app-button variant="primary" icon="edit" (btnClick)="startEdit()">
            Edit Profile
          </app-button>
        } @else {
          <div class="flex gap-4">
            <app-button variant="secondary" (btnClick)="cancelEdit()">Cancel</app-button>
            <app-button variant="primary" icon="save" [disabled]="form.invalid || profileStore.saving()" (btnClick)="saveProfile()">
              {{ profileStore.saving() ? 'Saving...' : 'Save Changes' }}
            </app-button>
          </div>
        }
      </div>

      @if (profileStore.loading()) {
        <div class="flex justify-center p-8">
          <p class="text-xl font-bold">Loading profile...</p>
        </div>
      } @else if (profileStore.profile(); as profile) {
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div class="md:col-span-4 space-y-8">
            <app-card>
              <div class="flex flex-col items-center text-center">
                <div class="relative group mb-6">
                  <app-avatar size="xl" [initials]="getInitials(profile.name)" [src]="profile.avatarUrl ?? ''">
                  </app-avatar>

                  @if (isEditing()) {
                    <label
                      class="absolute bottom-0 right-0 w-10 h-10 bg-[#0ABAB5] border-2 border-black rounded-full flex items-center justify-center text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all cursor-pointer"
                    >
                      <span class="material-icons text-xl">photo_camera</span>
                      <input type="file" accept="image/*" class="hidden" (change)="onFileSelected($event)" />
                    </label>
                  }
                </div>

                <h2 class="text-2xl font-black uppercase tracking-tight mb-2">
                  {{ profile.name }}
                </h2>

                <app-badge variant="primary" class="mb-6">
                  {{ authStore.role() || 'STUDENT' }}
                </app-badge>

                <div class="w-full text-left space-y-4 pt-6 border-t-2 border-black/10">
                  <div class="flex justify-between items-center bg-white p-4 border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <div>
                      <p class="text-xs font-black text-gray-500 uppercase tracking-widest">
                        Enrolled Lessons
                      </p>
                      <p class="text-3xl font-black text-[#0ABAB5]">{{ profile.enrolledLessonsCount }}</p>
                    </div>
                    <span class="material-icons text-4xl text-gray-200">menu_book</span>
                  </div>
                </div>
              </div>
            </app-card>
          </div>

          <div class="md:col-span-8 space-y-8">
            <app-card header="Personal Information">
              @if (!isEditing()) {
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <p class="text-xs font-black text-gray-500 uppercase tracking-widest mb-1">
                      Full Name
                    </p>
                    <p class="text-xl font-bold">{{ profile.name }}</p>
                  </div>
                  <div>
                    <p class="text-xs font-black text-gray-500 uppercase tracking-widest mb-1">
                      School / Institution
                    </p>
                    <p class="text-xl font-bold">{{ profile.school || 'Not specified' }}</p>
                  </div>
                  <div>
                    <p class="text-xs font-black text-gray-500 uppercase tracking-widest mb-1">
                      Grade Level
                    </p>
                    <p class="text-xl font-bold">{{ profile.gradeLevel || 'Not specified' }}</p>
                  </div>

                  <div class="sm:col-span-2">
                    <p class="text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Bio</p>
                    <p class="text-lg font-medium leading-relaxed">{{ profile.bio }}</p>
                  </div>
                </div>
              } @else {
                <form [formGroup]="form" class="space-y-6">
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <app-form-field id="name" label="Full Name">
                      <span class="material-icons prefix text-[#0ABAB5] mr-2">person</span>
                      <input
                        type="text"
                        id="name"
                        formControlName="name"
                        class="w-full border-4 border-black p-3 font-bold bg-white focus:outline-none focus:ring-4 focus:ring-[#0ABAB5]/30 transition-all"
                      />
                    </app-form-field>

                    <app-form-field id="school" label="School / Institution">
                      <span class="material-icons prefix text-[#0ABAB5] mr-2">school</span>
                      <input
                        type="text"
                        id="school"
                        formControlName="school"
                        class="w-full border-4 border-black p-3 font-bold bg-white focus:outline-none focus:ring-4 focus:ring-[#0ABAB5]/30 transition-all"
                      />
                    </app-form-field>
                  </div>

                  <app-form-field id="gradeLevel" label="Grade Level">
                    <span class="material-icons prefix text-[#0ABAB5] mr-2">grade</span>
                    <input
                      type="text"
                      id="gradeLevel"
                      formControlName="gradeLevel"
                      placeholder="e.g. Clasa a IX-a"
                      class="w-full border-4 border-black p-3 font-bold bg-white focus:outline-none focus:ring-4 focus:ring-[#0ABAB5]/30 transition-all"
                    />
                  </app-form-field>

                  <app-form-field id="bio" label="Bio">
                    <span class="material-icons prefix text-[#0ABAB5] mr-2">edit_note</span>
                    <textarea
                      id="bio"
                      rows="4"
                      formControlName="bio"
                      class="w-full border-4 border-black p-3 font-bold bg-white focus:outline-none focus:ring-4 focus:ring-[#0ABAB5]/30 transition-all resize-none"
                    ></textarea>
                  </app-form-field>
                </form>
              }
            </app-card>
          </div>
        </div>
      }
    </div>
  `,
})
export class StudentProfileComponent implements OnInit {
  protected profileStore = inject(StudentProfileStore);
  protected authStore = inject(AuthStore);
  private fb = inject(FormBuilder);
  private messageService = inject(MessageService);

  isEditing = signal(false);
  
  form = this.fb.group({
    name: ['', Validators.required],
    school: [''],
    gradeLevel: [''],
    bio: [''],
  });

  private pendingAvatarBase64: string | null = null;

  constructor() {
    effect(() => {
      const error = this.profileStore.error();
      if (error) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
      }
    });
  }

  ngOnInit() {
    this.profileStore.loadStudentProfile();
  }

  startEdit() {
    const profile = this.profileStore.profile();
    if (profile) {
      this.form.patchValue({
        name: profile.name,
        school: profile.school || '',
        gradeLevel: profile.gradeLevel || '',
        bio: profile.bio,
      });
      this.pendingAvatarBase64 = null;
      this.isEditing.set(true);
    }
  }

  cancelEdit() {
    this.isEditing.set(false);
    this.pendingAvatarBase64 = null;
  }

  saveProfile() {
    if (this.form.invalid) return;

    const { firstName, lastName } = parseFullName(this.form.value.name);

    const payload: RawStudentProfileUpdate = {
      firstName,
      lastName,
      school: this.form.value.school || undefined,
      gradeLevel: this.form.value.gradeLevel || undefined,
      bio: this.form.value.bio || undefined,
    };

    if (this.pendingAvatarBase64) {
      payload.profilePictureUrl = this.pendingAvatarBase64;
    }

    this.profileStore.updateStudentProfile(payload);
    
    setTimeout(() => {
      if (!this.profileStore.error()) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Profile updated successfully' });
        this.isEditing.set(false);
      }
    }, 500);
  }

  onFileSelected(event: Event) {
    handleFileSelect(event, this.messageService, (base64) => {
      this.pendingAvatarBase64 = base64;
    });
  }

  getInitials(name?: string): string {
    return getInitials(name);
  }
}
