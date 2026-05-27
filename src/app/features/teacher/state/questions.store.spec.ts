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
import { patchState } from '@ngrx/signals';

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
      getCheckQuiz: vi.fn().mockReturnValue(of({})),
      getFinalQuiz: vi.fn().mockReturnValue(of({})),
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

  it('should patch passThreshold if returned in getFinalQuiz', () => {
    mockService.getFinalQuiz.mockReturnValue(of({ passThreshold: 85 }));
    mockService.getFinalQuizQuestions.mockReturnValue(of([]));
    
    store.loadQuestions({ type: 'final', parentId: 'p1' });
    
    expect(store.passThreshold()).toBe(85);
  });

  it('should return empty array if fetchQuestions$ returns 404', () => {
    mockService.getFinalQuiz.mockReturnValue(of({}));
    mockService.getFinalQuizQuestions.mockReturnValue(
      throwError(() => new HttpErrorResponse({ status: 404 }))
    );

    store.loadQuestions({ type: 'final', parentId: 'p1' });

    expect(store.questions()).toEqual([]);
    expect(store.quizExists()).toBe(true);
  });

  it('should handle 404 gracefully without eager creation during loadQuestions', () => {
    mockService.getCheckQuiz.mockReturnValue(
      throwError(() => new HttpErrorResponse({ status: 404 })),
    );

    store.loadQuestions({ type: 'check', parentId: 'p1' });

    expect(store.questions()).toEqual([]);
    expect(store.quizExists()).toBe(false);
    expect(store.isLoading()).toBe(false);
  });

  it('should handle 404 gracefully without eager creation for final quiz during loadQuestions', () => {
    mockService.getFinalQuiz.mockReturnValue(
      throwError(() => new HttpErrorResponse({ status: 404 })),
    );

    store.loadQuestions({ type: 'final', parentId: 'p2' });

    expect(store.questions()).toEqual([]);
    expect(store.quizExists()).toBe(false);
    expect(store.isLoading()).toBe(false);
  });

  it('should lazily create final quiz and add question when quizExists is false', () => {
    patchState(store, { quizExists: false });
    const payload = { questionText: 'New Q' } as AddQuestionRequest;
    const mockQ = { id: 'q1', questionText: 'New Q' } as QuestionResponse;
    mockService.addCheckQuizQuestion.mockReturnValue(of(mockQ));

    store.addQuestion({ type: 'check', parentId: 'p1', payload });

    const req = httpMock.expectOne('http://api/subcapitols/p1/check-quiz');
    expect(req.request.method).toBe('POST');
    req.flush({});

    expect(mockService.addCheckQuizQuestion).toHaveBeenCalledWith('p1', payload);
    expect(store.questions()).toContain(mockQ);
    expect(store.quizExists()).toBe(true);
  });

  it('should lazily create final quiz and generate AI when quizExists is false', () => {
    patchState(store, { quizExists: false });
    const mockQs = [{ id: 'q1', questionText: 'Gen Q' } as QuestionResponse];
    mockService.generateFinalQuizQuestions.mockReturnValue(of(mockQs));

    store.generateAI({ type: 'final', parentId: 'p1' });

    const req = httpMock.expectOne('http://api/lessons/p1/final-quiz');
    expect(req.request.body).toEqual({ passThreshold: 50, mandatory: false, maxAttempts: 3 });
    req.flush({});

    expect(mockService.generateFinalQuizQuestions).toHaveBeenCalledWith('p1');
    expect(store.questions()).toEqual(mockQs);
    expect(store.quizExists()).toBe(true);
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

  it('should propagate non-404 error from checkExists$', () => {
    mockService.getFinalQuiz.mockReturnValue(
      throwError(() => new HttpErrorResponse({ status: 500 }))
    );

    store.loadQuestions({ type: 'final', parentId: 'p1' });

    expect(store.error()).toBe('Failed to load questions.');
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

  it('should use fallback error message when generating AI without error message', () => {
    mockService.generateFinalQuizQuestions.mockReturnValue(
      throwError(() => new HttpErrorResponse({ status: 500 }))
    );

    store.generateAI({ type: 'final', parentId: 'p1' });

    expect(store.error()).toBe('Failed to generate questions. Ensure your lesson has text content.');
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

  it('should use fallback error message for addQuestion', () => {
    const payload = { questionText: 'New Q' } as AddQuestionRequest;
    mockService.addCheckQuizQuestion.mockReturnValue(
      throwError(() => new HttpErrorResponse({ status: 500 }))
    );

    store.addQuestion({ type: 'check', parentId: 'p1', payload });

    expect(store.error()).toBe('Failed to add question.');
  });

  // --- UPDATE QUESTION ---

  it('should update question via api put', () => {
    mockService.getCheckQuizQuestions.mockReturnValue(
      of([
        { id: 'q1', questionText: 'Old' } as QuestionResponse,
        { id: 'q2', questionText: 'Other' } as QuestionResponse
      ]),
    );
    store.loadQuestions({ type: 'check', parentId: 'p1' });

    const payload = { questionText: 'New' } as AddQuestionRequest;
    const updated = { id: 'q1', questionText: 'New' } as QuestionResponse;

    store.updateQuestion({ id: 'q1', payload });

    const req = httpMock.expectOne('http://api/questions/q1');
    expect(req.request.method).toBe('PUT');
    req.flush(updated);

    expect(store.questions()[0].questionText).toBe('New');
    expect(store.questions()[1].questionText).toBe('Other');
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

  it('should use fallback error message for updateQuestion', () => {
    store.updateQuestion({ id: 'q1', payload: {} as AddQuestionRequest });
    httpMock.expectOne('http://api/questions/q1').flush({}, { status: 500, statusText: 'Server Error' });
    expect(store.error()).toBe('Failed to update question.');
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

  it('should use fallback error message for deleteQuestion', () => {
    mockService.deleteQuestion.mockReturnValue(
      throwError(() => new HttpErrorResponse({ status: 500 }))
    );
    store.deleteQuestion('q1');
    expect(store.error()).toBe('Failed to delete question.');
  });

  // --- APPROVE QUESTION ---

  it('should approve question', () => {
    mockService.getCheckQuizQuestions.mockReturnValue(
      of([
        { id: 'q1', status: 'PENDING' } as QuestionResponse,
        { id: 'q2', status: 'PENDING' } as QuestionResponse
      ]),
    );
    store.loadQuestions({ type: 'check', parentId: 'p1' });

    mockService.approveQuestion.mockReturnValue(of(null));
    store.approveQuestion('q1');

    expect(mockService.approveQuestion).toHaveBeenCalledWith('q1');
    expect(store.questions()[0].status).toBe('APPROVED');
    expect(store.questions()[1].status).toBe('PENDING');
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

  it('should use fallback error message for approveQuestion', () => {
    mockService.approveQuestion.mockReturnValue(
      throwError(() => new HttpErrorResponse({ status: 500 }))
    );
    store.approveQuestion('q1');
    expect(store.error()).toBe('Failed to approve question.');
  });
  // --- UPDATE PASS THRESHOLD ---

  it('should update pass threshold', () => {
    store.updatePassThreshold({ parentId: 'p1', passThreshold: 75 });

    const req = httpMock.expectOne('http://api/lessons/p1/final-quiz');
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ passThreshold: 75 });
    req.flush({});

    expect(store.passThreshold()).toBe(75);
    expect(messageServiceSpy.add).toHaveBeenCalledWith(
      expect.objectContaining({ severity: 'success', summary: 'Settings Saved' }),
    );
  });

  it('should handle error silently during updatePassThreshold', () => {
    store.updatePassThreshold({ parentId: 'p1', passThreshold: 80 });

    const req = httpMock.expectOne('http://api/lessons/p1/final-quiz');
    req.flush({ error: 'Patch failed' }, { status: 400, statusText: 'Bad Request' });

    // Should still update the store since it's an optimistic update
    expect(store.passThreshold()).toBe(80);
    // Should NOT call success message
    expect(messageServiceSpy.add).not.toHaveBeenCalled();
  });

  it('should create quiz when updatePassThreshold called and quizExists is false', () => {
    patchState(store, { quizExists: false });
    
    store.updatePassThreshold({ parentId: 'p1', passThreshold: 90 });
    
    const req = httpMock.expectOne('http://api/lessons/p1/final-quiz');
    expect(req.request.method).toBe('POST');
    expect(req.request.body.passThreshold).toBe(90);
    req.flush({});
    
    expect(store.quizExists()).toBe(true);
    expect(store.passThreshold()).toBe(90);
  });
});
