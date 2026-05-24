import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionManagerComponent } from './question-manager.component';
import { QuestionsStore } from '../state/questions.store';
import { signal } from '@angular/core';
import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('QuestionManagerComponent', () => {
  let component: QuestionManagerComponent;
  let fixture: ComponentFixture<QuestionManagerComponent>;
  let storeMock: {
    questions: ReturnType<typeof signal>;
    isLoading: ReturnType<typeof signal>;
    isGeneratingAI: ReturnType<typeof signal>;
    error: ReturnType<typeof signal>;
    passThreshold: ReturnType<typeof signal>;
    loadQuestions: Mock;
    generateAI: Mock;
    deleteQuestion: Mock;
    approveQuestion: Mock;
    addQuestion: Mock;
    updateQuestion: Mock;
  };

  beforeEach(async () => {
    storeMock = {
      questions: signal([]),
      isLoading: signal(false),
      isGeneratingAI: signal(false),
      error: signal<string | null>(null),
      passThreshold: signal(70),
      loadQuestions: vi.fn(),
      generateAI: vi.fn(),
      deleteQuestion: vi.fn(),
      approveQuestion: vi.fn(),
      addQuestion: vi.fn(),
      updateQuestion: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [QuestionManagerComponent, CommonModule, FormsModule],
    })
      .overrideComponent(QuestionManagerComponent, {
        set: { providers: [{ provide: QuestionsStore, useValue: storeMock }] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(QuestionManagerComponent);
    component = fixture.componentInstance;
    component.quizType = 'check';
    component.parentId = 'parent-1';
    fixture.detectChanges();
  });

  it('should load questions on init', () => {
    expect(storeMock.loadQuestions).toHaveBeenCalledWith({ type: 'check', parentId: 'parent-1' });
  });

  it('should start adding a new question with a blank form', () => {
    component.startAdding();
    expect(component.isAdding()).toBe(true);
    expect(component.editingId()).toBeNull();
    expect(component.newQuestionText()).toBe('');
    expect(component.newOptions().length).toBe(3);
  });

  it('should start editing an existing question and map options correctly', () => {
    const question = {
      id: 'q1',
      questionText: 'Test',
      correctAnswer: 'A',
      options: [
        { optionText: 'A', correct: true },
        { optionText: 'B', correct: false },
      ],
    };
    component.startEditing(question);

    expect(component.isAdding()).toBe(false);
    expect(component.editingId()).toBe('q1');
    expect(component.newQuestionText()).toBe('Test');
    expect(component.newOptions()[0].text).toBe('A');
    expect(component.newOptions()[0].isCorrect).toBe(true);
  });

  it('should dynamically add and remove options', () => {
    component.newOptions.set([]);

    component.addOption();
    expect(component.newOptions().length).toBe(1);

    component.newOptions.set([
      { text: 'A', isCorrect: true },
      { text: 'B', isCorrect: false },
    ]);
    component.removeOption(0);

    expect(component.newOptions().length).toBe(1);
    expect(component.newOptions()[0].text).toBe('B');
  });

  it('should set the selected option as correct', () => {
    component.newOptions.set([
      { text: 'A', isCorrect: true },
      { text: 'B', isCorrect: false },
    ]);
    component.setCorrectOption(1);

    expect(component.newOptions()[0].isCorrect).toBe(false);
    expect(component.newOptions()[1].isCorrect).toBe(true);
  });

  it('should cancel form and return to clean state', () => {
    component.isAdding.set(true);
    component.cancelForm();

    expect(component.isAdding()).toBe(false);
    expect(component.editingId()).toBeNull();
  });

  it('should call generateAI through the store', () => {
    component.generateAI();
    expect(storeMock.generateAI).toHaveBeenCalledWith({ type: 'check', parentId: 'parent-1' });
  });

  it('should call approveQuestion through the store', () => {
    component.toggleApprove('q1');
    expect(storeMock.approveQuestion).toHaveBeenCalledWith('q1');
  });

  it('should call deleteQuestion conditionally based on confirmation', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    component.deleteQuestion('q1');
    expect(storeMock.deleteQuestion).toHaveBeenCalledWith('q1');

    storeMock.deleteQuestion.mockClear();

    vi.spyOn(window, 'confirm').mockReturnValue(false);
    component.deleteQuestion('q2');
    expect(storeMock.deleteQuestion).not.toHaveBeenCalled();
  });

  it('should alert and block submit if validation fails', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => undefined);

    component.newQuestionText.set('   '); // Empty string
    component.submitQuestion();

    expect(alertSpy).toHaveBeenCalledWith('Please enter a question text.');
    expect(storeMock.addQuestion).not.toHaveBeenCalled();
  });

  it('should submit a new question successfully', () => {
    component.newQuestionText.set('New Q');
    component.newOptions.set([
      { text: 'Opt 1', isCorrect: true },
      { text: 'Opt 2', isCorrect: false },
    ]);
    component.editingId.set(null);

    component.submitQuestion();

    expect(storeMock.addQuestion).toHaveBeenCalledWith({
      type: 'check',
      parentId: 'parent-1',
      payload: {
        questionText: 'New Q',
        questionType: 'MULTIPLE_CHOICE',
        correctAnswer: 'Opt 1',
        options: [
          { optionText: 'Opt 1', correct: true },
          { optionText: 'Opt 2', correct: false },
        ],
      },
    });
    expect(component.isAdding()).toBe(false);
  });

  it('should submit an edited question successfully', () => {
    component.newQuestionText.set('Updated Q');
    component.newOptions.set([
      { text: 'Opt 1', isCorrect: true },
      { text: 'Opt 2', isCorrect: false },
    ]);
    component.editingId.set('q1');

    component.submitQuestion();

    expect(storeMock.updateQuestion).toHaveBeenCalledWith({
      id: 'q1',
      payload: {
        questionText: 'Updated Q',
        questionType: 'MULTIPLE_CHOICE',
        correctAnswer: 'Opt 1',
        options: [
          { optionText: 'Opt 1', correct: true },
          { optionText: 'Opt 2', correct: false },
        ],
      },
    });
    expect(component.editingId()).toBeNull();
  });

  it('should update pass threshold if valid', () => {
    storeMock.updatePassThreshold = vi.fn();
    const event = { target: { value: '80' } } as unknown as Event;
    component.updatePassThreshold(event);
    expect(storeMock.updatePassThreshold).toHaveBeenCalledWith({ parentId: 'parent-1', passThreshold: 80 });
  });

  it('should revert pass threshold if invalid', () => {
    storeMock.updatePassThreshold = vi.fn();
    // Assuming passThreshold is mocked as returning 100 by default, let's just mock it
    (storeMock as unknown as Record<string, unknown>)['passThreshold'] = signal(70);
    const target = { value: '150' };
    const event = { target } as unknown as Event;
    component.updatePassThreshold(event);
    expect(storeMock.updatePassThreshold).not.toHaveBeenCalled();
    expect(target.value).toBe('70');
  });

  it('should block submit if less than 2 valid options', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => undefined);
    component.newQuestionText.set('Test?');
    component.newOptions.set([{ text: 'Opt 1', isCorrect: true }, { text: '', isCorrect: false }]);
    component.submitQuestion();
    expect(alertSpy).toHaveBeenCalledWith('Please provide at least 2 valid options.');
    expect(storeMock.addQuestion).not.toHaveBeenCalled();
  });

  it('should block submit if no correct option selected', () => {
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => undefined);
    component.newQuestionText.set('Test?');
    component.newOptions.set([{ text: 'Opt 1', isCorrect: false }, { text: 'Opt 2', isCorrect: false }]);
    component.submitQuestion();
    expect(alertSpy).toHaveBeenCalledWith('Please select a correct answer.');
    expect(storeMock.addQuestion).not.toHaveBeenCalled();
  });
});

