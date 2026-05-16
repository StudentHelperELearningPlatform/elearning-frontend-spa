import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuizBuilderComponent } from './quiz-builder.component';
import { ContentStore } from '../store/content.store';
import { NotificationService } from '../../../core/services/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { signal } from '@angular/core';
import { describe, it, expect, beforeEach, afterEach, vi, Mock } from 'vitest';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('QuizBuilderComponent', () => {
  let component: QuizBuilderComponent;
  let fixture: ComponentFixture<QuizBuilderComponent>;

  // Mocks
  let mockContentStore: {
    quizzes: ReturnType<typeof signal>;
    createQuiz: Mock;
    updateQuiz: Mock;
  };
  let mockNotificationService: {
    success: Mock;
    error: Mock;
  };
  let mockRouter: {
    navigate: Mock;
  };
  let mockActivatedRoute: {
    snapshot: {
      paramMap: {
        get: Mock;
      };
    };
  };

  const mockQuizData = {
    id: 'quiz-1',
    title: 'Fractions Mastery',
    subject: 'Math',
    status: 'PUBLISHED',
    questions: [{ text: 'What is 1/2 + 1/2?', type: 'multiple-choice', difficulty: 'EASY' }],
  };

  beforeEach(async () => {
    mockContentStore = {
      quizzes: signal([mockQuizData]),
      createQuiz: vi.fn(),
      updateQuiz: vi.fn(),
    };

    mockNotificationService = {
      success: vi.fn(),
      error: vi.fn(),
    };

    mockRouter = {
      navigate: vi.fn(),
    };

    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: vi.fn().mockReturnValue(null), // Default to creation mode
        },
      },
    };

    await TestBed.configureTestingModule({
      imports: [QuizBuilderComponent, CommonModule, ReactiveFormsModule],
      providers: [
        { provide: ContentStore, useValue: mockContentStore },
        { provide: NotificationService, useValue: mockNotificationService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizBuilderComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it('should initialize in creation mode with an empty form', () => {
    fixture.detectChanges();

    expect(component.isEdit).toBe(false);
    expect(component.quizId).toBeNull();
    expect(component.quizForm.get('title')?.value).toBe('');
    expect(component.questions.length).toBe(0);
  });

  it('should initialize in edit mode and patch form if route has an ID', () => {
    mockActivatedRoute.snapshot.paramMap.get.mockReturnValue('quiz-1');
    fixture.detectChanges();

    expect(component.isEdit).toBe(true);
    expect(component.quizId).toBe('quiz-1');
    expect(component.quizForm.get('title')?.value).toBe('Fractions Mastery');
    expect(component.quizForm.get('subject')?.value).toBe('Math');
    expect(component.questions.length).toBe(1);
    expect(component.questions.at(0).get('text')?.value).toBe('What is 1/2 + 1/2?');
  });

  it('should manually add and remove a question', () => {
    fixture.detectChanges();
    expect(component.questions.length).toBe(0);

    // Add question
    component.addQuestion();
    expect(component.questions.length).toBe(1);
    expect(component.questions.at(0).get('type')?.value).toBe('multiple-choice');
    expect(component.questions.at(0).get('difficulty')?.value).toBe('MEDIUM');

    // Remove question
    component.removeQuestion(0);
    expect(component.questions.length).toBe(0);
  });

  it('should show error notification if generating AI questions without a prompt', () => {
    fixture.detectChanges();
    component.aiPrompt = '';

    component.generateWithAi();

    expect(mockNotificationService.error).toHaveBeenCalledWith('Please enter a topic or content.');
    expect(component.aiLoading()).toBe(false);
  });

  it('should generate AI questions successfully after a delay', () => {
    vi.useFakeTimers();
    fixture.detectChanges();

    component.aiPrompt = 'Algebra';
    component.aiCount = 3;
    component.generateWithAi();

    expect(component.aiLoading()).toBe(true);
    expect(component.generatedQuestions().length).toBe(0);

    vi.advanceTimersByTime(2500);

    expect(component.aiLoading()).toBe(false);
    expect(component.generatedQuestions().length).toBe(3);
    expect(mockNotificationService.success).toHaveBeenCalledWith(
      'Questions generated successfully!',
    );
  });

  it('should add selected AI questions to the form and close the modal', () => {
    fixture.detectChanges();

    // Mock generated questions where only one is selected
    const mockGenerated = [
      { text: 'Gen Q1', type: 'true-false', difficulty: 'HARD', selected: true },
      { text: 'Gen Q2', type: 'multiple-choice', difficulty: 'EASY', selected: false },
    ];
    component.generatedQuestions.set(mockGenerated);
    component.showAiModal.set(true);
    component.aiPrompt = 'Math';

    component.addSelectedQuestions();

    expect(component.questions.length).toBe(1);
    expect(component.questions.at(0).get('text')?.value).toBe('Gen Q1');
    expect(component.questions.at(0).get('type')?.value).toBe('true-false');
    expect(component.questions.at(0).get('difficulty')?.value).toBe('HARD');

    // Verify modal resets
    expect(component.showAiModal()).toBe(false);
    expect(component.generatedQuestions().length).toBe(0);
    expect(component.aiPrompt).toBe('');
    expect(mockNotificationService.success).toHaveBeenCalledWith('Added 1 questions to quiz.');
  });

  it('should not save the quiz if the form is invalid', () => {
    fixture.detectChanges();
    // Form is empty and thus invalid
    component.saveQuiz();

    expect(mockContentStore.createQuiz).not.toHaveBeenCalled();
    expect(mockContentStore.updateQuiz).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should call createQuiz and navigate when saving a valid new quiz', () => {
    fixture.detectChanges();

    component.quizForm.patchValue({
      title: 'New Quiz',
      subject: 'Science',
      status: 'DRAFT',
    });
    component.addQuestion({ text: 'Q1', type: 'multiple-choice', difficulty: 'EASY' });

    component.saveQuiz();

    expect(mockContentStore.createQuiz).toHaveBeenCalledWith({
      title: 'New Quiz',
      subject: 'Science',
      status: 'DRAFT',
      questions: [{ text: 'Q1', type: 'multiple-choice', difficulty: 'EASY' }],
    });
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/teacher/content']);
  });

  it('should call updateQuiz and navigate when saving a valid existing quiz', () => {
    mockActivatedRoute.snapshot.paramMap.get.mockReturnValue('quiz-1');
    fixture.detectChanges();

    component.quizForm.patchValue({ title: 'Updated Title' });

    component.saveQuiz();

    expect(mockContentStore.updateQuiz).toHaveBeenCalledWith(
      'quiz-1',
      expect.objectContaining({
        title: 'Updated Title',
        subject: 'Math',
        status: 'PUBLISHED',
      }),
    );
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/teacher/content']);
  });
});
