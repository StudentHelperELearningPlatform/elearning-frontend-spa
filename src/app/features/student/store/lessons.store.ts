import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';



export interface Module {
  id: string;
  title: string;
  type: 'video' | 'text' | 'quiz' | 'interactive' | 'audio' | 'image';
  content: string;
  mediaUrl?: string;
}

export interface Lesson {
  id: string;
  title: string;
  subject: string;
  grade: number;
  difficulty: string;
  duration: string;
  status: string;
  modules: Module[];
}

// Backend-specific interfaces based on contract
interface BackendBlock {
  id: string;
  blockType: string;
  content: string;
  mediaUrl?: string;
}

interface BackendSubcapitol {
  id: string;
  title: string;
  blocks: BackendBlock[];
}

interface BackendLesson {
  id: string;
  title: string;
  subject: string;
  grade: number;
  difficulty: string;
  duration: string;
  status: string;
  subcapitols: BackendSubcapitol[];
}

const mapBackendLessonToFrontend = (backend: BackendLesson): Lesson => {
  const modules: Module[] = [];

  backend.subcapitols.forEach((sub) => {
    sub.blocks.forEach((block, index) => {
      modules.push({
        id: block.id,
        // If it's the first block of a subcapitol, use the subcapitol title
        // Otherwise, maybe append an index or just use the same title
        title: index === 0 ? sub.title : `${sub.title} (cont.)`,
        type: block.blockType.toLowerCase() as any,
        content: block.content,
        mediaUrl: block.mediaUrl,
      });
    });
  });

  return {
    id: backend.id,
    title: backend.title,
    subject: backend.subject,
    grade: backend.grade,
    difficulty: backend.difficulty,
    duration: backend.duration,
    status: backend.status,
    modules: modules,
  };
};


interface LessonsState {
  lessons: Lesson[];
  currentLesson: Lesson | null;
  loading: boolean;
  error: string | null;
}

export const LessonsStore = signalStore(
  { providedIn: 'root' },
  withState<LessonsState>({
    lessons: [],
    currentLesson: null,
    loading: false,
    error: null,
  }),
  withComputed((state) => ({
    publishedLessons: computed(() => state.lessons()),
    lessonCount: computed(() => state.lessons().length),
  })),
  withMethods((store, http = inject(HttpClient)) => ({
    loadLessons() {
      patchState(store, { loading: true });
      const contentUrl = environment.services.content.replace(/\/$/, '');
      http.get<BackendLesson[]>(`${contentUrl}/api/v1/lessons`).subscribe({
        next: (backendLessons) => {
          const mappedLessons = backendLessons.map(mapBackendLessonToFrontend);
          patchState(store, { lessons: mappedLessons, loading: false });
        },
        error: () => {
          patchState(store, { loading: false });
        }
      });
    },

    loadLesson(id: string) {
      patchState(store, { loading: true });
      const contentUrl = environment.services.content.replace(/\/$/, '');
      http.get<BackendLesson>(`${contentUrl}/api/v1/lessons/${id}`).subscribe({
        next: (backendLesson) => {
          const lesson = mapBackendLessonToFrontend(backendLesson);
          patchState(store, { currentLesson: lesson, loading: false });
        },
        error: () => {
          patchState(store, { loading: false });
        }
      });
    },

    updateProgress(lessonId: string, status: string) {
      const contentUrl = environment.services.content.replace(/\/$/, '');
      http.put(`${contentUrl}/api/v1/lessons/${lessonId}/progress`, { status }).subscribe({
        next: () => {
          // Optionally update local state if needed
        },
        error: (err) => {
          console.error('Failed to update progress', err);
        }
      });
    }
  }))


);
