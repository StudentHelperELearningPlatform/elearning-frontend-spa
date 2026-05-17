import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { USER_PLATFORM_API_URL } from '@core/tokens/api.token';
import { tapResponse } from '@ngrx/operators';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

export interface StudentProfile {
  name: string;
  bio: string;
  avatarUrl?: string;
  contactInfo: {
    email: string;
    phone: string;
  };
  enrolledLessonsCount: number;
  school?: string;
  gradeLevel?: string;
  enrolledClasses?: string[];
}

export interface RawStudentProfile {
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  contactInfo?: {
    email?: string;
    phone?: string;
  };
  bio?: string;
  school?: string;
  gradeLevel?: string;
  enrolledClasses?: string[];
  enrolledLessonsCount?: number;
  avatarUrl?: string;
  profilePictureUrl?: string;
}

export interface RawStudentProfileUpdate {
  firstName?: string;
  lastName?: string;
  school?: string;
  gradeLevel?: string;
  bio?: string;
  profilePictureUrl?: string;
}

interface ProfileState {
  profile: StudentProfile | null;
  loading: boolean;
  saving: boolean;
  error: string | null;
}

export const StudentProfileStore = signalStore(
  { providedIn: 'root' },
  withState<ProfileState>({
    profile: null,
    loading: false,
    saving: false,
    error: null,
  }),
  withMethods((store, http = inject(HttpClient), apiBase = inject(USER_PLATFORM_API_URL)) => {
    const mapProfile = (raw: RawStudentProfile | null): StudentProfile => {
      if (!raw) return {
        name: 'Alex Student',
        bio: '',
        contactInfo: { email: '', phone: '' },
        enrolledLessonsCount: 0,
        school: '',
        gradeLevel: '',
        enrolledClasses: []
      };

      const name = raw.name || `${raw.firstName || ''} ${raw.lastName || ''}`.trim() || 'Alex Student';
      const email = raw.contactInfo?.email || raw.email || '';
      const phone = raw.contactInfo?.phone || raw.phone || '';
      const bio = raw.bio || '';
      const school = raw.school || '';
      const gradeLevel = raw.gradeLevel || '';
      const enrolledClasses = Array.isArray(raw.enrolledClasses) ? raw.enrolledClasses : [];
      const enrolledLessonsCount = raw.enrolledLessonsCount ?? enrolledClasses.length;
      const avatarUrl = raw.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email || 'student')}`;

      return {
        name,
        bio,
        avatarUrl,
        contactInfo: { email, phone },
        enrolledLessonsCount,
        school,
        gradeLevel,
        enrolledClasses
      };
    };

    return {
      loadStudentProfile() {
        patchState(store, { loading: true, error: null });
        http.get<RawStudentProfile>(`${apiBase}/students/me/profile`).subscribe({
          next: (raw) => patchState(store, { profile: mapProfile(raw), loading: false }),
          error: (err: { message?: string }) => patchState(store, { loading: false, error: err.message || 'Failed to load profile' }),
        });
      },
      updateStudentProfile: rxMethod<RawStudentProfileUpdate>(
        pipe(
          tap(() => patchState(store, { saving: true, error: null })),
          switchMap((payload) =>
            http.put<RawStudentProfile>(`${apiBase}/students/me/profile`, payload).pipe(
              tapResponse({
                next: (raw) => {
                  const currentProfile = store.profile();
                  const rawHasData = !!(raw && (raw.name || raw.firstName || raw.email || raw.contactInfo));
                  
                  const updatedProfile = rawHasData
                    ? mapProfile(raw)
                    : {
                        ...currentProfile,
                        ...payload,
                        name: payload.firstName && payload.lastName
                          ? `${payload.firstName} ${payload.lastName}`
                          : currentProfile?.name,
                        avatarUrl: payload.profilePictureUrl || currentProfile?.avatarUrl,
                      } as StudentProfile;

                  patchState(store, { profile: updatedProfile, saving: false });
                },
                error: (err: { message?: string }) => patchState(store, { saving: false, error: err.message || 'Failed to update profile' }),
              })
            )
          )
        )
      )
    };
  })
);
