import { Lesson, Module } from '../../features/student/store/lessons.store';

/**
 * Backend-shaped lesson response (subcapitols → blocks).
 * The frontend continues to consume the `Lesson` view-model defined in
 * `lessons.store.ts` (modules → type/content), so this adapter is the
 * boundary between the two shapes.
 */
export interface BackendBlock {
  id: string;
  blockType: string;
  content?: string | null;
  mediaId?: string | null;
  mediaUrl?: string | null;
  orderIndex?: number;
  languageTag?: string | null;
  codeLanguage?: string | null;
}

export interface BackendSubcapitol {
  id: string;
  title: string;
  orderIndex: number;
  blocks: BackendBlock[];
}

export interface BackendLesson {
  id: string | number;
  title?: string;
  subject?: string;
  difficultyLevel?: string;
  grade?: number | string;
  status?: string;
  estimatedDurationMinutes?: number;
  duration?: string;
  shortDescription?: string;
  authorId?: string;
  subcapitols?: BackendSubcapitol[];
}

const KNOWN_TYPES: readonly Module['type'][] = [
  'video',
  'text',
  'quiz',
  'interactive',
  'audio',
  'image',
];

const normaliseModuleType = (raw: string | null | undefined): Module['type'] => {
  const lc = (raw ?? '').toString().trim().toLowerCase();
  return (KNOWN_TYPES as readonly string[]).includes(lc) ? (lc as Module['type']) : 'text';
};

const blockToModule = (block: BackendBlock, subTitle: string): Module => ({
  id: block.id,
  title: subTitle || 'Untitled module',
  type: normaliseModuleType(block.blockType),
  content: block.content || '',
  mediaUrl: block.mediaUrl || block.mediaId || undefined,
});

/**
 * Translate a backend lesson (subcapitols → blocks) into the frontend
 * `Lesson` view-model used by `LessonViewerComponent` and the rest of
 * the SPA.
 */
export const mapLessonResponse = (backend: BackendLesson): Lesson => {
  const subcapitols = (backend.subcapitols || []).map((sub) => ({
    id: sub.id,
    title: sub.title || 'Untitled Subcapitol',
    blocks: (sub.blocks || []).map((block) => ({
      ...blockToModule(block, sub.title),
      blockType: block.blockType
    }))
  }));

  const modules = subcapitols.flatMap(s => s.blocks);

  return {
    id: backend.id?.toString() || '',
    title: backend.title || '',
    subject: backend.subject || '',
    grade: Number(backend.grade) || 0,
    difficulty: backend.difficultyLevel || 'Easy',
    duration: backend.estimatedDurationMinutes 
      ? `${backend.estimatedDurationMinutes}m` 
      : (backend.duration || ''),
    status: backend.status || 'Not Started',
    description: backend.shortDescription || '',
    subcapitols,
    modules,
  };
};

