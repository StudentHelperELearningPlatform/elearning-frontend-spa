import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { USER_PLATFORM_API_URL, CONTENT_API_URL } from '@core/tokens/api.token';

export interface ContactMessage {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  message: string;
  timestamp: string;
  read: boolean;
}

@Injectable({ providedIn: 'root' })
export class AdminService {
  private readonly http = inject(HttpClient);
  private readonly apiBase = inject(USER_PLATFORM_API_URL); // Contains '/api/v1' already!
  private readonly contentApi = inject(CONTENT_API_URL);     // Contains '/api/v1' already!

  // Manage Users (Moisa Admin Controller & User Controller)
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBase}/users`);
  }

  getBannedUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBase}/admin/users/banned`);
  }

  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiBase}/admin/users/${userId}`);
  }

  banUser(userId: string): Observable<void> {
    return this.http.post<void>(`${this.apiBase}/admin/users/${userId}/ban`, {});
  }

  unbanUser(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiBase}/admin/users/${userId}/ban`);
  }

  // Manage Lessons
  getLessons(): Observable<any[]> {
    return this.http.get<any[]>(`${this.contentApi}/lessons`);
  }

  deleteLesson(lessonId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiBase}/admin/lessons/${lessonId}`);
  }

  // Manage Classes
  getClasses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBase}/teachers/classes`);
  }

  deleteClass(classId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiBase}/admin/classes/${classId}`);
  }

  // S6-contact (Moisa Contact Controller)
  getContactMessages(): Observable<ContactMessage[]> {
    return this.http.get<ContactMessage[]>(`${this.apiBase}/contact/me/inbox`);
  }

  markContactMessageRead(messageId: string, read: boolean): Observable<void> {
    return this.http.put<void>(`${this.apiBase}/notifications/${messageId}/read`, {});
  }

  deleteContactMessage(messageId: string): Observable<void> {
    return new Observable<void>(observer => {
      observer.next();
      observer.complete();
    });
  }
}
