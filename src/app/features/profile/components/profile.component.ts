import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthStore } from '@features/auth/store/auth.store';

// Shared Components
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
    <div class="max-w-6xl mx-auto p-4 md:p-8 font-sans bg-gray-50 text-black min-h-[calc(100vh-84px)]">

      <!-- HEADER -->
      <div class="flex items-center justify-between mb-8 border-b-4 border-black pb-4">
        <h1 class="text-4xl md:text-5xl font-black uppercase tracking-tighter">
          My Profile
        </h1>

        @if (!isEditing()) {
          <app-button variant="primary" icon="edit" (btnClick)="startEdit()">
            Edit Profile
          </app-button>
        } @else {
          <div class="flex gap-4">
            <app-button variant="secondary" (btnClick)="cancelEdit()">
              Cancel
            </app-button>

            <app-button variant="primary" icon="save" (btnClick)="saveProfile()">
              Save Changes
            </app-button>
          </div>
        }
      </div>

      <!-- CONTENT -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-8">

        <!-- LEFT -->
        <div class="md:col-span-4 space-y-8">

          <app-card>
            <div class="flex flex-col items-center text-center">

              <!-- AVATAR -->
              <div class="relative group mb-6">

                <app-avatar
                  size="xl"
                  [initials]="getInitials(user().name)"
                ></app-avatar>

                @if (isEditing()) {
                  <button
                    (click)="uploadAvatar()"
                    class="absolute bottom-0 right-0 w-10 h-10 bg-[#0ABAB5] border-2 border-black rounded-full flex items-center justify-center text-white"
                  >
                    <span class="material-icons text-xl">photo_camera</span>
                  </button>
                }

              </div>

              <h2 class="text-2xl font-black uppercase mb-2">
                {{ user().name }}
              </h2>

              <app-badge variant="primary">
                {{ authStore.role() || 'STUDENT' }}
              </app-badge>

            </div>
          </app-card>

        </div>

        <!-- RIGHT -->
        <div class="md:col-span-8 space-y-8">

          <app-card header="Personal Information">

            @if (!isEditing()) {

              <div class="space-y-4">
                <p><b>Name:</b> {{ user().name }}</p>
                <p><b>Phone:</b> {{ user().phone }}</p>
                <p><b>Bio:</b> {{ user().bio }}</p>
              </div>

            } @else {

              <form class="space-y-6">

                <app-form-field id="name" label="Name" icon="person">
                  <input
                    type="text"
                    [value]="user().name"
                    (input)="updateField('name', $event)"
                    class="w-full border-4 border-black p-3 font-bold"
                  />
                </app-form-field>

                <app-form-field id="phone" label="Phone" icon="phone">
                  <input
                    type="text"
                    [value]="user().phone"
                    (input)="updateField('phone', $event)"
                    class="w-full border-4 border-black p-3 font-bold"
                  />
                </app-form-field>

                <app-form-field id="bio" label="Bio" icon="edit">
                  <textarea
                    [value]="user().bio"
                    (input)="updateField('bio', $event)"
                    class="w-full border-4 border-black p-3 font-bold resize-none"
                  ></textarea>
                </app-form-field>

              </form>

            }

          </app-card>

        </div>

      </div>
    </div>
  `,
})
export class ProfileComponent {
  protected authStore = inject(AuthStore);

  isEditing = signal(false);

  user = signal({
    name: this.authStore.user()?.name || 'John Doe',
    phone: '+40 712 345 678',
    bio: 'Student bio...'
  });

  originalUser: any = null;

  // ENTER EDIT
  startEdit() {
    this.originalUser = structuredClone(this.user());
    this.isEditing.set(true);
  }

  // SAVE
  saveProfile() {
    console.log('PUT /api/users/me', this.user());
    this.isEditing.set(false);
    this.originalUser = null;
    alert('Profile updated');
  }

  // CANCEL
  cancelEdit() {
    if (JSON.stringify(this.user()) !== JSON.stringify(this.originalUser)) {
      const confirmDiscard = confirm('Discard changes?');
      if (!confirmDiscard) return;
    }

    this.user.set(this.originalUser);
    this.isEditing.set(false);
  }

  // FIXED: NO $any, NO any casting issues
  updateField(field: string, event: Event) {
    const value = (event.target as HTMLInputElement | HTMLTextAreaElement).value;

    this.user.update(u => ({
      ...u,
      [field]: value
    }));
  }

  uploadAvatar() {
    console.log('Upload avatar clicked');
    alert('Avatar upload (UI only)');
  }

  getInitials(name?: string): string {
    if (!name) return 'UN';
    const parts = name.split(' ');
    return parts.length > 1
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : name.substring(0, 2).toUpperCase();
  }
}