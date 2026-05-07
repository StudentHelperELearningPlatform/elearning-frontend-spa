import { Lesson, Module } from '../../features/student/store/lessons.store';

/**
 * Backend-shaped lesson response (subcapitols → blocks).
 * The frontend continues to consume the `Lesson` view-model defined in
 * `lessons.store.ts` (modules → type/content), so this adapter is the
 * boundary between the two shapes.
 */
export interface BackendBlock {
  id?: string | number;
  blockType: string;
  content?: string | null;
  mediaUrl?: string | null;
  title?: string | null;
}

export interface BackendSubcapitol {
  id?: string | number;
  title?: string | null;
  blocks?: BackendBlock[] | null;
}

export interface BackendLesson {
  id: string | number;
  title: string;
  subject: string;
  grade?: number | string | null;
  difficulty?: string | null;
  duration?: string | null;
  status?: string | null;
  subcapitols?: BackendSubcapitol[] | null;
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

const blockToModule = (block: BackendBlock, subTitle: string | null | undefined): Module => ({
  id: String(block.id ?? `module-${Math.random().toString(36).slice(2)}`),
  title: (block.title ?? subTitle ?? 'Untitled module').toString(),
  type: normaliseModuleType(block.blockType),
  content: (block.content ?? '').toString(),
  ...(block.mediaUrl ? { mediaUrl: block.mediaUrl } : {}),
});

/**
 * Translate a backend lesson (subcapitols → blocks) into the frontend
 * `Lesson` view-model used by `LessonViewerComponent` and the rest of
 * the SPA.
 *
 * Each block becomes a module. If a subcapitol contains multiple blocks
 * each block is emitted as a separate module so the player keeps a flat
 * list. Empty `subcapitols` arrays produce a lesson with no modules
 * (the viewer shows its empty state in that case).
 */
export const mapLessonResponse = (backend: BackendLesson): Lesson => {
  const grade =
    typeof backend.grade === 'string' ? Number.parseInt(backend.grade, 10) : (backend.grade ?? 0);
  const subcapitols = backend.subcapitols ?? [];
  const modules: Module[] = subcapitols.flatMap((sub) =>
    (sub.blocks ?? []).map((block) => blockToModule(block, sub.title)),
  );

  return {
    id: String(backend.id),
    title: backend.title ?? '',
    subject: backend.subject ?? '',
    grade: Number.isFinite(grade as number) ? (grade as number) : 0,
    difficulty: backend.difficulty ?? 'Easy',
    duration: backend.duration ?? '',
    status: backend.status ?? 'Not Started',
    modules,
  };
};
