import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthStore, User } from '@features/auth/store/auth.store';

// Import Shared Components
import { CardComponent } from '../../../shared/components/card/card.component';
import { AvatarComponent } from '../../../shared/components/avatar/avatar.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { FormFieldComponent } from '../../../shared/components/form-field/form-field.component';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardComponent,
    AvatarComponent,
    ButtonComponent,
    FormFieldComponent,
    BadgeComponent,
  ],
  template: `
    <div
      class="max-w-6xl mx-auto p-4 md:p-8 font-sans bg-gray-50 text-black min-h-[calc(100vh-84px)]"
    >
      <div class="flex items-center justify-between mb-8 border-b-4 border-black pb-4">
        <h1 class="text-4xl md:text-5xl font-black uppercase tracking-tighter">My Profile</h1>
        @if (!isEditing()) {
          <app-button variant="primary" icon="edit" (btnClick)="toggleEdit()"
            >Edit Profile</app-button
          >
        } @else {
          <div class="flex gap-4">
            <app-button variant="secondary" (btnClick)="toggleEdit()">Cancel</app-button>
            <app-button variant="primary" icon="save">Save Changes</app-button>
          </div>
        }
      </div>

      <div class="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div class="md:col-span-4 space-y-8">
          <app-card>
            <div class="flex flex-col items-center text-center">
              <div class="relative group mb-6">
                <app-avatar size="xl" [initials]="getInitials(authStore.user()?.name)">
                </app-avatar>

                @if (isEditing()) {
                  <button
                    class="absolute bottom-0 right-0 w-10 h-10 bg-[#0ABAB5] border-2 border-black rounded-full flex items-center justify-center text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                  >
                    <span class="material-icons text-xl">photo_camera</span>
                  </button>
                }
              </div>

              <h2 class="text-2xl font-black uppercase tracking-tight mb-2">
                {{ authStore.user()?.name || 'Student Name' }}
              </h2>

              <app-badge variant="primary" class="mb-6">
                {{ authStore.role() || 'STUDENT' }}
              </app-badge>

              <div class="w-full text-left space-y-4 pt-6 border-t-2 border-black/10">
                <div>
                  <p class="text-xs font-black text-gray-500 uppercase tracking-widest">
                    Email Address
                  </p>
                  <p class="font-bold text-lg truncate">
                    {{ authStore.user()?.email || 'student@test.com' }}
                  </p>
                </div>
                <div>
                  <p class="text-xs font-black text-gray-500 uppercase tracking-widest">
                    Member Since
                  </p>
                  <p class="font-bold text-lg">August 2025</p>
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
                  <p class="text-xl font-bold">{{ authStore.user()?.name || 'John Doe' }}</p>
                </div>
                <div>
                  <p class="text-xs font-black text-gray-500 uppercase tracking-widest mb-1">
                    Phone Number
                  </p>
                  <p class="text-xl font-bold">+40 712 345 678</p>
                </div>
                <div class="sm:col-span-2">
                  <p class="text-xs font-black text-gray-500 uppercase tracking-widest mb-1">Bio</p>
                  <p class="text-lg font-medium leading-relaxed">
                    Passionate learner focusing on advanced mathematics and physics. Always looking
                    to solve complex problems and improve my logical thinking.
                  </p>
                </div>
              </div>
            } @else {
              <form class="space-y-6">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <app-form-field id="fullName" label="Full Name" icon="person">
                    <input
                      type="text"
                      id="fullName"
                      class="w-full border-4 border-black p-3 font-bold bg-white focus:outline-none focus:ring-4 focus:ring-[#0ABAB5]/30 transition-all"
                      value="John Doe"
                    />
                  </app-form-field>

                  <app-form-field id="phone" label="Phone Number" icon="phone">
                    <input
                      type="tel"
                      id="phone"
                      class="w-full border-4 border-black p-3 font-bold bg-white focus:outline-none focus:ring-4 focus:ring-[#0ABAB5]/30 transition-all"
                      value="+40 712 345 678"
                    />
                  </app-form-field>
                </div>

                <app-form-field id="bio" label="Bio" icon="edit_note">
                  <textarea
                    id="bio"
                    rows="4"
                    class="w-full border-4 border-black p-3 font-bold bg-white focus:outline-none focus:ring-4 focus:ring-[#0ABAB5]/30 transition-all resize-none"
                  >
Passionate learner focusing on advanced mathematics and physics. Always looking to solve complex problems and improve my logical thinking.</textarea
                  >
                </app-form-field>
              </form>
            }
          </app-card>

          <app-card header="Security Settings">
            <form class="space-y-6">
              <app-form-field id="currentPassword" label="Current Password" icon="lock">
                <input
                  type="password"
                  id="currentPassword"
                  placeholder="Enter current password"
                  class="w-full border-4 border-black p-3 font-bold bg-white focus:outline-none focus:ring-4 focus:ring-[#0ABAB5]/30 transition-all"
                />
              </app-form-field>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <app-form-field id="newPassword" label="New Password" icon="key">
                  <input
                    type="password"
                    id="newPassword"
                    placeholder="Enter new password"
                    class="w-full border-4 border-black p-3 font-bold bg-white focus:outline-none focus:ring-4 focus:ring-[#0ABAB5]/30 transition-all"
                  />
                </app-form-field>

                <app-form-field id="confirmPassword" label="Confirm Password" icon="key">
                  <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm new password"
                    class="w-full border-4 border-black p-3 font-bold bg-white focus:outline-none focus:ring-4 focus:ring-[#0ABAB5]/30 transition-all"
                  />
                </app-form-field>
              </div>

              <div class="pt-4 flex justify-end">
                <app-button variant="primary" icon="shield">Update Password</app-button>
              </div>
            </form>
          </app-card>
        </div>
      </div>
    </div>
  `,
})
export class ProfileComponent {
  protected authStore = inject(AuthStore);

  // Simple boolean signal for view/edit toggle (Alexandra will expand this)
  isEditing = signal(false);

  toggleEdit() {
    this.isEditing.set(!this.isEditing());
  }

  // Helper to extract initials for the avatar
  getInitials(name?: string): string {
    if (!name) return 'UN';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  }
}
