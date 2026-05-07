describe('LearningPathEditorComponent', () => {

  it('should not allow a lesson to be prerequisite of itself', () => {

    const lessons = [
      { id: '1', title: 'A', prerequisites: [] },
      { id: '2', title: 'B', prerequisites: [] }
    ];

    const currentIndex = 1;

    const availablePrereqs = lessons.filter((_, idx) => idx < currentIndex);

    expect(availablePrereqs.length).toBe(1);
    expect(availablePrereqs[0].id).toBe('1');

  });

});