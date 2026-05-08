import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LEARNING_PATH_API_URL } from '@core/tokens/api.token';
import { Question } from '@shared/models/quiz.types';

export interface BackendBlock {
  id: string;
  blockType: string;
  content: string;
  mediaUrl?: string;
}

@Injectable({ providedIn: 'root' })
export class ContentManagementService {
  private readonly http = inject(HttpClient);
  private readonly apiBase = inject(LEARNING_PATH_API_URL);

  getSubcapitolBlocks(subcapitolId: string): Observable<BackendBlock[]> {
    return this.http.get<BackendBlock[]>(`${this.apiBase}/subcapitols/${subcapitolId}/blocks`);
  }

  // Question Management
  getQuestion(id: string): Observable<Question> {
    return this.http.get<Question>(`${this.apiBase}/questions/${id}`);
  }

  updateQuestion(id: string, question: Partial<Question>): Observable<Question> {
    return this.http.put<Question>(`${this.apiBase}/questions/${id}`, question);
  }

  approveQuestion(id: string): Observable<void> {
    return this.http.patch<void>(`${this.apiBase}/questions/${id}/approve`, {});
  }

  deleteQuestion(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiBase}/questions/${id}`);
  }
}
