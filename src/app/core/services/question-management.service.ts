import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface QuestionDto {
  id: string;
  text: string;
  type: string;
  points: number;
}

@Injectable({ providedIn: 'root' })
export class QuestionManagementService {
  private http = inject(HttpClient);
  private baseUrl = '/api/v1/questions';

  getQuestion(id: string): Observable<QuestionDto> {
    return this.http.get<QuestionDto>(`${this.baseUrl}/${id}`);
  }

  updateQuestion(id: string, payload: Partial<QuestionDto>): Observable<QuestionDto> {
    return this.http.put<QuestionDto>(`${this.baseUrl}/${id}`, payload);
  }

  approveQuestion(id: string): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}/approve`, {});
  }

  deleteQuestion(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
