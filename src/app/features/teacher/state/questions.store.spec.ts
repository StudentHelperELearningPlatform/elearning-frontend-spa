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

  // --- LOAD QUESTIONS ---

  it('should load check questions successfully', () => {
    const mockQs = [{ id: 'q1', questionText: 'Q1' } as QuestionResponse];
    mockService.getCheckQuizQuestions.mockReturnValue(of(mockQs));

    store.loadQuestions({ type: 'check', parentId: 'p1' });

    expect(mockService.getCheckQuizQuestions).toHaveBeenCalledWith('p1');
    expect(store.questions()).toEqual(mockQs);
    expect(store.isLoading()).toBe(false);
  });

  it('should load final questions successfully', () => {
    const mockQs = [{ id: 'q2', questionText: 'Q2' } as QuestionResponse];
    mockService.getFinalQuizQuestions.mockReturnValue(of(mockQs));

    store.loadQuestions({ type: 'final', parentId: 'p1' });

    expect(mockService.getFinalQuizQuestions).toHaveBeenCalledWith('p1');
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

  it('should handle 404 and auto-create final quiz via HTTP intercept with correct payload', () => {
    mockService.getFinalQuizQuestions.mockReturnValue(
      throwError(() => new HttpErrorResponse({ status: 404 })),
    );

    store.loadQuestions({ type: 'final', parentId: 'p2' });

    const req = httpMock.expectOne('http://api/lessons/p2/final-quiz');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ passThreshold: 50, mandatory: false, maxAttempts: 3 });
    req.flush({});

    expect(store.questions()).toEqual([]);
    expect(store.isLoading()).toBe(false);
  });

  it('should handle error if auto-creation fails during a 404 response', () => {
    mockService.getCheckQuizQuestions.mockReturnValue(
      throwError(() => new HttpErrorResponse({ status: 404 })),
    );

    store.loadQuestions({ type: 'check', parentId: 'p1' });

    const req = httpMock.expectOne('http://api/subcapitols/p1/check-quiz');
    // Simulate failure during creation POST
    req.flush({ error: 'Failed to create quiz' }, { status: 500, statusText: 'Server Error' });

    expect(store.error()).toBe('Failed to create quiz');
    expect(store.isLoading()).toBe(false);
    expect(messageServiceSpy.add).toHaveBeenCalledWith(
      expect.objectContaining({ summary: 'Error', detail: 'Failed to create quiz' }),
    );
  });

  it('should handle non-404 error during loadQuestions', () => {
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

  // --- GENERATE AI ---

  it('should generate final AI questions', () => {
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

  it('should generate check AI questions', () => {
    const mockQs = [{ id: 'q2', questionText: 'Gen Check' } as QuestionResponse];
    mockService.generateCheckQuizQuestions.mockReturnValue(of(mockQs));

    store.generateAI({ type: 'check', parentId: 'p1' });

    expect(mockService.generateCheckQuizQuestions).toHaveBeenCalledWith('p1');
    expect(store.questions()).toEqual(mockQs);
    expect(store.isGeneratingAI()).toBe(false);
  });

  it('should handle error during generateAI', () => {
    mockService.generateFinalQuizQuestions.mockReturnValue(
      throwError(
        () => new HttpErrorResponse({ status: 500, error: { error: 'AI generation failed' } }),
      ),
    );

    store.generateAI({ type: 'final', parentId: 'p1' });

    expect(store.error()).toBe('AI generation failed');
    expect(store.isGeneratingAI()).toBe(false);
    expect(messageServiceSpy.add).toHaveBeenCalledWith(
      expect.objectContaining({ severity: 'error', detail: 'AI generation failed' }),
    );
  });

  // --- ADD QUESTION ---

  it('should add check question', () => {
    const payload = { questionText: 'New Q' } as AddQuestionRequest;
    const mockQ = { id: 'q1', questionText: 'New Q' } as QuestionResponse;
    mockService.addCheckQuizQuestion.mockReturnValue(of(mockQ));

    store.addQuestion({ type: 'check', parentId: 'p1', payload });

    expect(mockService.addCheckQuizQuestion).toHaveBeenCalledWith('p1', payload);
    expect(store.questions()).toContain(mockQ);
  });

  it('should add final question', () => {
    const payload = { questionText: 'New Final Q' } as AddQuestionRequest;
    const mockQ = { id: 'q2', questionText: 'New Final Q' } as QuestionResponse;
    mockService.addFinalQuizQuestion.mockReturnValue(of(mockQ));

    store.addQuestion({ type: 'final', parentId: 'p1', payload });

    expect(mockService.addFinalQuizQuestion).toHaveBeenCalledWith('p1', payload);
    expect(store.questions()).toContain(mockQ);
  });

  it('should handle error during addQuestion', () => {
    const payload = { questionText: 'New Q' } as AddQuestionRequest;
    mockService.addCheckQuizQuestion.mockReturnValue(
      throwError(
        () => new HttpErrorResponse({ status: 400, error: { error: 'Add question failed' } }),
      ),
    );

    store.addQuestion({ type: 'check', parentId: 'p1', payload });

    expect(store.error()).toBe('Add question failed');
    expect(store.isLoading()).toBe(false);
    expect(messageServiceSpy.add).toHaveBeenCalledWith(
      expect.objectContaining({ severity: 'error', detail: 'Add question failed' }),
    );
  });

  // --- UPDATE QUESTION ---

  it('should update question via api put', () => {
    mockService.getCheckQuizQuestions.mockReturnValue(
      of([{ id: 'q1', questionText: 'Old' } as QuestionResponse]),
    );
    store.loadQuestions({ type: 'check', parentId: 'p1' });

    const payload = { questionText: 'New' } as AddQuestionRequest;
    const updated = { id: 'q1', questionText: 'New' } as QuestionResponse;

    store.updateQuestion({ id: 'q1', payload });

    const req = httpMock.expectOne('http://api/questions/q1');
    expect(req.request.method).toBe('PUT');
    req.flush(updated);

    expect(store.questions()[0].questionText).toBe('New');
    expect(messageServiceSpy.add).toHaveBeenCalledWith(
      expect.objectContaining({ severity: 'success' }),
    );
  });

  it('should handle error during updateQuestion', () => {
    const payload = { questionText: 'New' } as AddQuestionRequest;
    store.updateQuestion({ id: 'q1', payload });

    const req = httpMock.expectOne('http://api/questions/q1');
    req.flush({ error: 'Update failed' }, { status: 400, statusText: 'Bad Request' });

    expect(store.error()).toBe('Update failed');
    expect(store.isLoading()).toBe(false);
    expect(messageServiceSpy.add).toHaveBeenCalledWith(
      expect.objectContaining({ severity: 'error', detail: 'Update failed' }),
    );
  });

  // --- DELETE QUESTION ---

  it('should delete question', () => {
    mockService.getCheckQuizQuestions.mockReturnValue(of([{ id: 'q1' } as QuestionResponse]));
    store.loadQuestions({ type: 'check', parentId: 'p1' });

    mockService.deleteQuestion.mockReturnValue(of(null));
    store.deleteQuestion('q1');

    expect(mockService.deleteQuestion).toHaveBeenCalledWith('q1');
    expect(store.questions().length).toBe(0);
    expect(messageServiceSpy.add).toHaveBeenCalledWith(
      expect.objectContaining({ severity: 'success' }),
    );
  });

  it('should handle error during deleteQuestion', () => {
    mockService.deleteQuestion.mockReturnValue(
      throwError(() => new HttpErrorResponse({ status: 500, error: { error: 'Delete failed' } })),
    );

    store.deleteQuestion('q1');

    expect(store.error()).toBe('Delete failed');
    expect(store.isLoading()).toBe(false);
    expect(messageServiceSpy.add).toHaveBeenCalledWith(
      expect.objectContaining({ severity: 'error', detail: 'Delete failed' }),
    );
  });

  // --- APPROVE QUESTION ---

  it('should approve question', () => {
    mockService.getCheckQuizQuestions.mockReturnValue(
      of([{ id: 'q1', status: 'PENDING' } as QuestionResponse]),
    );
    store.loadQuestions({ type: 'check', parentId: 'p1' });

    mockService.approveQuestion.mockReturnValue(of(null));
    store.approveQuestion('q1');

    expect(mockService.approveQuestion).toHaveBeenCalledWith('q1');
    expect(store.questions()[0].status).toBe('APPROVED');
    expect(messageServiceSpy.add).toHaveBeenCalledWith(
      expect.objectContaining({ severity: 'success' }),
    );
  });

  it('should handle error during approveQuestion', () => {
    mockService.approveQuestion.mockReturnValue(
      throwError(() => new HttpErrorResponse({ status: 500, error: { error: 'Approve failed' } })),
    );

    store.approveQuestion('q1');

    expect(store.error()).toBe('Approve failed');
    expect(store.isLoading()).toBe(false);
    expect(messageServiceSpy.add).toHaveBeenCalledWith(
      expect.objectContaining({ severity: 'error', detail: 'Approve failed' }),
    );
  });
});
