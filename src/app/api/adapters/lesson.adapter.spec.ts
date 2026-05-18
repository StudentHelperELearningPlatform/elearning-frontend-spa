import { BackendLesson, mapLessonResponse } from './lesson.adapter';

describe('mapLessonResponse', () => {
  it('maps a text block into a text module with lower-case type', () => {
    const backend: BackendLesson = {
      id: 'lesson-1',
      title: 'Intro to Fractions',
      subject: 'Math',
      grade: 5,
      duration: '15 min',
      status: 'Not Started',
      subcapitols: [
        {
          id: 'sub-1',
          title: 'What is a fraction?',
          blocks: [
            { id: 'b-1', blockType: 'TEXT', content: '<p>A fraction is…</p>' },
          ],
        },
      ],
    };

    const result = mapLessonResponse(backend);

    expect(result.id).toBe('lesson-1');
    expect(result.title).toBe('Intro to Fractions');
    expect(result.subject).toBe('Math');
    expect(result.grade).toBe(5);
    expect(result.modules).toEqual([
      {
        id: 'b-1',
        title: 'What is a fraction?',
        type: 'text',
        blockType: 'TEXT',
        content: '<p>A fraction is…</p>',
        mediaUrl: undefined,
      },
    ]);
  });

  it('maps an IMAGE block to type "image" and preserves mediaUrl', () => {
    const backend: BackendLesson = {
      id: 'lesson-2',
      title: 'Visual Lesson',
      subject: 'Science',
      grade: 6,
      subcapitols: [
        {
          id: 'sub-1',
          title: 'Photosynthesis',
          blocks: [
            {
              id: 'b-2',
              blockType: 'IMAGE',
              content: 'Plants converting light into energy',
              mediaUrl: 'https://example.com/leaf.png',
            },
          ],
        },
      ],
    };

    const [module] = mapLessonResponse(backend).modules;

    expect(module.type).toBe('image');
    expect(module.mediaUrl).toBe('https://example.com/leaf.png');
    expect(module.content).toBe('Plants converting light into energy');
  });

  it('returns a lesson with zero modules when subcapitols is empty', () => {
    const backend: BackendLesson = {
      id: 99,
      title: 'Empty Lesson',
      subject: 'History',
      grade: 7,
      subcapitols: [],
    };

    const result = mapLessonResponse(backend);

    expect(result.id).toBe('99');
    expect(result.modules).toEqual([]);
  });

  it('returns a lesson with zero modules when subcapitols is missing entirely', () => {
    const backend = {
      id: 100,
      title: 'No Subcapitols',
      subject: 'Math',
    } as BackendLesson;

    const result = mapLessonResponse(backend);
    expect(result.modules).toEqual([]);
  });

  it('flattens multiple blocks across multiple subcapitols into the modules list', () => {
    const backend: BackendLesson = {
      id: 'lesson-3',
      title: 'Multi-block lesson',
      subject: 'Math',
      grade: 5,
      subcapitols: [
        {
          id: 'sub-1',
          title: 'A',
          blocks: [
            { id: 'b-1', blockType: 'TEXT', content: 'a' },
            { id: 'b-2', blockType: 'VIDEO', content: 'v', mediaUrl: 'https://x/v.mp4' },
          ],
        },
        {
          id: 'sub-2',
          title: 'B',
          blocks: [{ id: 'b-3', blockType: 'AUDIO', content: 'a', mediaUrl: 'https://x/a.mp3' }],
        },
      ],
    };

    const result = mapLessonResponse(backend);

    expect(result.modules.map((m) => m.type)).toEqual(['text', 'video', 'audio']);
    expect(result.modules.map((m) => m.id)).toEqual(['b-1', 'b-2', 'b-3']);
  });

  it('falls back to "text" for unknown block types', () => {
    const backend: BackendLesson = {
      id: 'lesson-4',
      title: 'Unknown',
      subject: 'Math',
      grade: 5,
      subcapitols: [
        {
          blocks: [{ id: 'b-1', blockType: 'CUSTOM_WIDGET', content: 'foo' }],
        },
      ],
    };

    expect(mapLessonResponse(backend).modules[0].type).toBe('text');
  });
});
