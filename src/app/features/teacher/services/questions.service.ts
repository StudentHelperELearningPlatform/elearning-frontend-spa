// src/app/features/teacher/services/questions.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import {
  QuestionResponse,
  AddQuestionRequest,
  UpdateQuestionRequest,
} from '../../../shared/models/quiz.types';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class QuestionsService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.lessonApiUrl}/api/v1`;

  // --- GET ---
  getCheckQuizQuestions(subcapitolId: string): Observable<QuestionResponse[]> {
    return this.http.get<QuestionResponse[]>(
      `${this.baseUrl}/subcapitols/${subcapitolId}/check-quiz/questions`,
    );
  }

  getFinalQuizQuestions(lessonId: string): Observable<QuestionResponse[]> {
    return this.http.get<QuestionResponse[]>(
      `${this.baseUrl}/lessons/${lessonId}/final-quiz/questions`,
    );
  }

  // --- POST (Add) ---
  addCheckQuizQuestion(
    subcapitolId: string,
    payload: AddQuestionRequest,
  ): Observable<QuestionResponse> {
    return this.http.post<QuestionResponse>(
      `${this.baseUrl}/subcapitols/${subcapitolId}/check-quiz/questions`,
      payload,
    );
  }

  addFinalQuizQuestion(
    lessonId: string,
    payload: AddQuestionRequest,
  ): Observable<QuestionResponse> {
    return this.http.post<QuestionResponse>(
      `${this.baseUrl}/lessons/${lessonId}/final-quiz/questions`,
      payload,
    );
  }

  // --- POST (AI Generate) ---
  generateCheckQuizQuestions(subcapitolId: string): Observable<QuestionResponse[]> {
    return this.http.post<QuestionResponse[]>(
      `${this.baseUrl}/subcapitols/${subcapitolId}/check-quiz/questions/generate`,
      {},
    );
  }

  generateFinalQuizQuestions(lessonId: string): Observable<QuestionResponse[]> {
    return this.http.post<QuestionResponse[]>(
      `${this.baseUrl}/lessons/${lessonId}/final-quiz/questions/generate`,
      {},
    );
  }

  // --- PUT / PATCH / DELETE (Standardized by Question ID) ---
  updateQuestion(id: string, payload: UpdateQuestionRequest): Observable<QuestionResponse> {
    return this.http.put<QuestionResponse>(`${this.baseUrl}/questions/${id}`, payload);
  }

  approveQuestion(id: string): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/questions/${id}/approve`, {});
  }

  deleteQuestion(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/questions/${id}`);
  }
}
