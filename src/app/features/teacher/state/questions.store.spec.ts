import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { of, throwError } from 'rxjs';
import { QuestionsStore } from './questions.store';
import { QuestionsService } from '../services/questions.service';
import { CONTENT_API_URL } from '../../../core/tokens/api.token';
import { describe, it, expect, beforeEach, afterEach, vi, Mock } from 'vitest';
import { QuestionResponse, AddQuestionRequest } from '../../../shared/models/quiz.types';
import { HttpErrorResponse } from '@angular/common/http';

describe('QuestionsStore', () => {
  let store: InstanceType<typeof QuestionsStore>;
  let mockService: {
    getCheckQuizQuestions: Mock;
    getFinalQuizQuestions: Mock;
    addCheckQuizQuestion: Mock;
    addFinalQuizQuestion: Mock;
    generateCheckQuizQuestions: Mock;
    generateFinalQuizQuestions: Mock;
    updateQuestion: Mock;
    approveQuestion: Mock;
    deleteQuestion: Mock;
  };
  let httpMock: HttpTestingController;
  let messageServiceSpy: { add: Mock };

  beforeEach(() => {
    mockService = {
      getCheckQuizQuestions: vi.fn(),
      getFinalQuizQuestions: vi.fn(),
      addCheckQuizQuestion: vi.fn(),
      addFinalQuizQuestion: vi.fn(),
      generateCheckQuizQuestions: vi.fn(),
      generateFinalQuizQuestions: vi.fn(),
      updateQuestion: vi.fn(),
      approveQuestion: vi.fn(),
      deleteQuestion: vi.fn(),
    };
    messageServiceSpy = { add: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        QuestionsStore,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: QuestionsService, useValue: mockService },
        { provide: MessageService, useValue: messageServiceSpy },
        { provide: CONTENT_API_URL, useValue: 'http://api' },
      ],
    });

    store = TestBed.inject(QuestionsStore);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    vi.clearAllMocks();
  });

  it('should load check questions successfully', () => {
    const mockQs = [{ id: 'q1', questionText: 'Q1' } as QuestionResponse];
    mockService.getCheckQuizQuestions.mockReturnValue(of(mockQs));

    store.loadQuestions({ type: 'check', parentId: 'p1' });

    expect(mockService.getCheckQuizQuestions).toHaveBeenCalledWith('p1');
    expect(store.questions()).toEqual(mockQs);
    expect(store.isLoading()).toBe(false);
  });

  it('should handle 404 and auto-create check quiz via HTTP intercept', () => {
    mockService.getCheckQuizQuestions.mockReturnValue(
      throwError(() => new HttpErrorResponse({ status: 404 })),
    );

    store.loadQuestions({ type: 'check', parentId: 'p1' });

    const req = httpMock.expectOne('http://api/subcapitols/p1/check-quiz');
    expect(req.request.method).toBe('POST');
    req.flush({});

    expect(store.questions()).toEqual([]);
    expect(store.isLoading()).toBe(false);
  });

  it('should handle error during loadQuestions', () => {
    mockService.getFinalQuizQuestions.mockReturnValue(
      throwError(() => new HttpErrorResponse({ status: 500, error: { error: 'Server Error' } })),
    );

    store.loadQuestions({ type: 'final', parentId: 'p1' });

    expect(store.error()).toBe('Server Error');
    expect(store.isLoading()).toBe(false);
    expect(messageServiceSpy.add).toHaveBeenCalledWith(
      expect.objectContaining({ summary: 'Error' }),
    );
  });

  it('should generate AI questions', () => {
    const mockQs = [{ id: 'q1', questionText: 'Gen Q' } as QuestionResponse];
    mockService.generateFinalQuizQuestions.mockReturnValue(of(mockQs));

    store.generateAI({ type: 'final', parentId: 'p1' });

    expect(mockService.generateFinalQuizQuestions).toHaveBeenCalledWith('p1');
    expect(store.questions()).toEqual(mockQs);
    expect(store.isGeneratingAI()).toBe(false);
    expect(messageServiceSpy.add).toHaveBeenCalledWith(
      expect.objectContaining({ severity: 'success' }),
    );
  });

  it('should add question', () => {
    const payload = { questionText: 'New Q' } as AddQuestionRequest;
    const mockQ = { id: 'q1', questionText: 'New Q' } as QuestionResponse;
    mockService.addCheckQuizQuestion.mockReturnValue(of(mockQ));

    store.addQuestion({ type: 'check', parentId: 'p1', payload });

    expect(mockService.addCheckQuizQuestion).toHaveBeenCalledWith('p1', payload);
    expect(store.questions()).toContain(mockQ);
  });

  it('should delete question', () => {
    // Seed initial state using the actual service and store mechanism
    mockService.getCheckQuizQuestions.mockReturnValue(of([{ id: 'q1' } as QuestionResponse]));
    store.loadQuestions({ type: 'check', parentId: 'p1' });

    // Test the deletion
    mockService.deleteQuestion.mockReturnValue(of(null));
    store.deleteQuestion('q1');

    expect(mockService.deleteQuestion).toHaveBeenCalledWith('q1');
    expect(store.questions().length).toBe(0);
  });

  it('should approve question', () => {
    // Seed initial state
    mockService.getCheckQuizQuestions.mockReturnValue(
      of([{ id: 'q1', status: 'PENDING' } as QuestionResponse]),
    );
    store.loadQuestions({ type: 'check', parentId: 'p1' });

    // Test approval
    mockService.approveQuestion.mockReturnValue(of(null));
    store.approveQuestion('q1');

    expect(mockService.approveQuestion).toHaveBeenCalledWith('q1');
    expect(store.questions()[0].status).toBe('APPROVED');
  });

  it('should update question via api put', () => {
    // Seed initial state
    mockService.getCheckQuizQuestions.mockReturnValue(
      of([{ id: 'q1', questionText: 'Old' } as QuestionResponse]),
    );
    store.loadQuestions({ type: 'check', parentId: 'p1' });

    const payload = { questionText: 'New' } as AddQuestionRequest;
    const updated = { id: 'q1', questionText: 'New' } as QuestionResponse;

    // Test update
    store.updateQuestion({ id: 'q1', payload });

    const req = httpMock.expectOne('http://api/questions/q1');
    expect(req.request.method).toBe('PUT');
    req.flush(updated);

    expect(store.questions()[0].questionText).toBe('New');
  });
});
