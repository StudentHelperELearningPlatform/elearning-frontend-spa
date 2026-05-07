import { mapLearningPathResponse, BackendLearningPath } from './learning-path.adapter';

describe('LearningPathAdapter', () => {
  it('should map BackendLearningPath to LearningPathViewModel correctly', () => {
    const mockBackendPath: BackendLearningPath = {
      id: 'path-1',
      title: 'Mastering Angular',
      description: 'A complete path',
      totalLessons: 2,
      estimatedTotalTime: '2 hours',
      lessons: [
        {
          id: 'l1',
          title: 'Intro',
          subject: 'Frontend',
          duration: '1h',
          status: 'COMPLETED',
          score: 100,
          prerequisiteTitle: undefined
        },
        {
          id: 'l2',
          title: 'Components',
          subject: 'Frontend',
          duration: '1h',
          status: 'LOCKED',
          prerequisiteTitle: 'Intro'
        }
      ]
    };

    // Trecem datele prin adaptor
    const result = mapLearningPathResponse(mockBackendPath);

    // Verificăm că adaptorul și-a făcut treaba
    expect(result.id).toBe('path-1');
    expect(result.title).toBe('Mastering Angular');
    expect(result.lessons.length).toBe(2);
    expect(result.lessons[0].status).toBe('COMPLETED');
    expect(result.lessons[0].score).toBe(100);
    expect(result.lessons[1].prerequisiteTitle).toBe('Intro');
  });

  it('should handle empty lessons array safely', () => {
    const mockEmptyPath: BackendLearningPath = {
      id: 'path-2',
      title: 'Empty Path',
      description: 'No lessons here',
      totalLessons: 0,
      estimatedTotalTime: '0 hours',
      lessons: []
    };

    const result = mapLearningPathResponse(mockEmptyPath);
    expect(result.lessons.length).toBe(0);
  });
});