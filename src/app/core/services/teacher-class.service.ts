import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { USER_PLATFORM_API_URL } from '@core/tokens/api.token';

import { TeacherClass } from '@features/teacher/models/class.model';
import {
  TeacherClassDetail,
  ClassStudent,
  ClassLesson,
} from '@features/teacher/models/class-detail.model';

@Injectable({
  providedIn: 'root',
})
export class TeacherClassService {
  private http = inject(HttpClient);
  private apiUrl = inject(USER_PLATFORM_API_URL);

  private baseUrl = `${this.apiUrl}/teachers/classes`;

  getClasses(): Observable<TeacherClass[]> {
    return this.http.get<TeacherClass[]>(this.baseUrl);
  }

  createClass(data: {
    name: string;
    description?: string;
  }): Observable<TeacherClass> {
    return this.http.post<TeacherClass>(this.baseUrl, data);
  }

  getClassDetail(classId: string): Observable<TeacherClassDetail> {
    return this.http.get<TeacherClassDetail>(
      `${this.baseUrl}/${classId}`,
    );
  }

  updateClass(
    classId: string,
    data: {
      name?: string;
      description?: string;
    },
  ): Observable<TeacherClass> {
    return this.http.put<TeacherClass>(
      `${this.baseUrl}/${classId}`,
      data,
    );
  }

  deleteClass(classId: string): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/${classId}`,
    );
  }

  addStudent(
    classId: string,
    studentId: string,
  ): Observable<void> {
    return this.http.post<void>(
      `${this.baseUrl}/${classId}/students/${studentId}`,
      {},
    );
  }

  removeStudent(
    classId: string,
    studentId: string,
  ): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/${classId}/students/${studentId}`,
    );
  }

  addLesson(
    classId: string,
    lessonId: string,
  ): Observable<void> {
    return this.http.post<void>(
      `${this.baseUrl}/${classId}/lessons/${lessonId}`,
      {},
    );
  }

  removeLesson(
    classId: string,
    lessonId: string,
  ): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/${classId}/lessons/${lessonId}`,
    );
  }

  getStudents(
    classId: string,
  ): Observable<ClassStudent[]> {
    return this.http.get<ClassStudent[]>(
      `${this.baseUrl}/${classId}/students`,
    );
  }

  getLessons(
    classId: string,
  ): Observable<ClassLesson[]> {
    return this.http.get<ClassLesson[]>(
      `${this.baseUrl}/${classId}/lessons`,
    );
  }
}