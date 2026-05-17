import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { USER_PLATFORM_API_URL } from '@core/tokens/api.token';
import { tapResponse } from '@ngrx/operators';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

export interface TeacherProfile {
  name: string;
  bio: string;
  avatarUrl?: string;
  contactInfo: {
    email: string;
    phone: string;
  };
  subjectsTaught: string[];
  school?: string;
  subjects?: Array<{ id: string; name: string; bio: string; }>;
  classes?: Array<{ id: string; name: string; bio: string; }>;
}

interface ProfileState {
  profile: TeacherProfile | null;
  loading: boolean;
  saving: boolean;
  error: string | null;
}

export const TeacherProfileStore = signalStore(
  { providedIn: 'root' },
  withState<ProfileState>({
    profile: null,
    loading: false,
    saving: false,
    error: null,
  }),
  withMethods((store, http = inject(HttpClient), apiBase = inject(USER_PLATFORM_API_URL)) => {
    const mapTeacherProfile = (raw: any): TeacherProfile => {
      if (!raw) return {
        name: 'Elena Dumitrescu',
        bio: '',
        contactInfo: { email: '', phone: '' },
        subjectsTaught: [],
        school: '',
        subjects: [],
        classes: []
      };

      const name = raw.name || `${raw.firstName || ''} ${raw.lastName || ''}`.trim() || 'Elena Dumitrescu';
      const email = raw.contactInfo?.email || raw.email || '';
      const phone = raw.contactInfo?.phone || raw.phone || '';
      const bio = raw.bio || '';
      const school = raw.school || '';
      const subjects = Array.isArray(raw.subjects) ? raw.subjects : [];
      const classes = Array.isArray(raw.classes) ? raw.classes : [];
      
      const subjectsTaught = subjects.map((s: any) => typeof s === 'string' ? s : s.name);
        
      const avatarUrl = raw.avatarUrl || raw.profilePictureUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email || 'teacher')}`;

      return {
        name,
        bio,
        avatarUrl,
        contactInfo: { email, phone },
        subjectsTaught,
        school,
        subjects,
        classes
      };
    };

    return {
      loadTeacherProfile() {
        patchState(store, { loading: true, error: null });
        http.get<any>(`${apiBase}/teachers/me/profile`).subscribe({
          next: (raw) => patchState(store, { profile: mapTeacherProfile(raw), loading: false }),
          error: (err) => patchState(store, { loading: false, error: err.message || 'Failed to load profile' }),
        });
      },
      updateTeacherProfile: rxMethod<any>(
        pipe(
          tap(() => patchState(store, { saving: true, error: null })),
          switchMap((payload) =>
            http.put<any>(`${apiBase}/teachers/me/profile`, payload).pipe(
              tapResponse({
                next: (raw) => {
                  const currentProfile = store.profile();
                  const rawHasData = raw && (raw.name || raw.firstName || raw.email || raw.contactInfo);
                  
                  const updatedProfile = rawHasData
                    ? mapTeacherProfile(raw)
                    : {
                        ...currentProfile,
                        ...payload,
                        name: payload.firstName && payload.lastName
                          ? `${payload.firstName} ${payload.lastName}`
                          : currentProfile?.name,
                        avatarUrl: payload.profilePictureUrl || currentProfile?.avatarUrl,
                      } as TeacherProfile;

                  patchState(store, { profile: updatedProfile, saving: false });
                },
                error: (err: any) => patchState(store, { saving: false, error: err.message || 'Failed to update profile' }),
              })
            )
          )
        )
      )
    };
  })
);
