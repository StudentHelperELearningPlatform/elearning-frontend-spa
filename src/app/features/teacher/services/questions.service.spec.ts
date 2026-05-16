import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { QuestionsService } from './questions.service';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  QuestionResponse,
  AddQuestionRequest,
  UpdateQuestionRequest,
} from '../../../shared/models/quiz.types';
import { environment } from '../../../../environments/environment';

describe('QuestionsService', () => {
  let service: QuestionsService;
  let httpMock: HttpTestingController;
  const baseUrl = `${environment.lessonApiUrl}/api/v1`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionsService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(QuestionsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get check quiz questions', () => {
    const mockResponse = [{ id: '1', questionText: 'Q1' } as QuestionResponse];
    service.getCheckQuizQuestions('sub-1').subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(`${baseUrl}/subcapitols/sub-1/check-quiz/questions`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should get final quiz questions', () => {
    const mockResponse = [{ id: '1', questionText: 'Q1' } as QuestionResponse];
    service.getFinalQuizQuestions('les-1').subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(`${baseUrl}/lessons/les-1/final-quiz/questions`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should add check quiz question', () => {
    const payload = { questionText: 'New Q' } as AddQuestionRequest;
    const mockResponse = { id: '2', questionText: 'New Q' } as QuestionResponse;
    service.addCheckQuizQuestion('sub-1', payload).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(`${baseUrl}/subcapitols/sub-1/check-quiz/questions`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);
    req.flush(mockResponse);
  });

  it('should add final quiz question', () => {
    const payload = { questionText: 'New Q' } as AddQuestionRequest;
    const mockResponse = { id: '2', questionText: 'New Q' } as QuestionResponse;
    service.addFinalQuizQuestion('les-1', payload).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(`${baseUrl}/lessons/les-1/final-quiz/questions`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);
    req.flush(mockResponse);
  });

  it('should generate check quiz questions', () => {
    const mockResponse = [{ id: '1', questionText: 'Gen Q' } as QuestionResponse];
    service.generateCheckQuizQuestions('sub-1').subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(`${baseUrl}/subcapitols/sub-1/check-quiz/questions/generate`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should generate final quiz questions', () => {
    const mockResponse = [{ id: '1', questionText: 'Gen Q' } as QuestionResponse];
    service.generateFinalQuizQuestions('les-1').subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(`${baseUrl}/lessons/les-1/final-quiz/questions/generate`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should update question', () => {
    const payload = { questionText: 'Upd Q' } as UpdateQuestionRequest;
    const mockResponse = { id: '1', questionText: 'Upd Q' } as QuestionResponse;
    service.updateQuestion('q-1', payload).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });
    const req = httpMock.expectOne(`${baseUrl}/questions/q-1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(payload);
    req.flush(mockResponse);
  });

  it('should approve question', () => {
    service.approveQuestion('q-1').subscribe();
    const req = httpMock.expectOne(`${baseUrl}/questions/q-1/approve`);
    expect(req.request.method).toBe('PATCH');
    req.flush(null);
  });

  it('should delete question', () => {
    service.deleteQuestion('q-1').subscribe();
    const req = httpMock.expectOne(`${baseUrl}/questions/q-1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
