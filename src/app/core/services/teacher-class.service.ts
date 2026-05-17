import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { USER_PLATFORM_API_URL } from '@core/tokens/api.token';

import { TeacherClass } from '@features/teacher/models/class.model';
import {
  TeacherClassDetail,
  ClassStudent,
  ClassLesson,
} from '@features/teacher/models/class-detail.model';

export interface TeacherClassRaw {
  id?: string;
  name?: string;
  nane?: string;
  description?: string;
  bio?: string;
  studentCount?: number;
  lessonCount?: number;
  createdAt?: string;
  code?: string;
  averageGrade?: number;
  students?: ClassStudent[];
  lessons?: ClassLesson[];
  [key: string]: unknown;
}

export const mapClass = (c: TeacherClassRaw): TeacherClass => ({
  id: c.id ?? '',
  name: c.name ?? c.nane ?? '',
  description: c.description ?? c.bio ?? '',
  studentCount: c.studentCount ?? 0,
  lessonCount: c.lessonCount ?? 0,
  createdAt: c.createdAt ?? new Date().toISOString(),
  code: c.code,
  averageGrade: c.averageGrade,
});

export const mapClassDetail = (c: TeacherClassRaw): TeacherClassDetail => ({
  ...mapClass(c),
  students: c.students ?? [],
  lessons: c.lessons ?? [],
});

@Injectable({
  providedIn: 'root',
})
export class TeacherClassService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = inject(USER_PLATFORM_API_URL);

  private readonly baseUrl = `${this.apiUrl}/teachers/classes`;

  getClasses(): Observable<TeacherClass[]> {
    return this.http.get<TeacherClassRaw[]>(this.baseUrl).pipe(
      map((list) => list.map(mapClass))
    );
  }

  createClass(data: {
    name: string;
    description?: string;
  }): Observable<TeacherClass> {
    const payload = {
      nane: data.name,
      bio: data.description ?? '',
    };
    return this.http.post<TeacherClassRaw>(this.baseUrl, payload).pipe(
      map(mapClass)
    );
  }

  getClassDetail(classId: string): Observable<TeacherClassDetail> {
    return this.http.get<TeacherClassRaw>(
      `${this.baseUrl}/${classId}`,
    ).pipe(
      map(mapClassDetail)
    );
  }

  updateClass(
    classId: string,
    data: {
      name?: string;
      description?: string;
    },
  ): Observable<TeacherClass> {
    const payload: Record<string, unknown> = {};
    if (data.name !== undefined) {
      payload['nane'] = data.name;
    }
    if (data.description !== undefined) {
      payload['bio'] = data.description;
    }
    return this.http.put<TeacherClassRaw>(
      `${this.baseUrl}/${classId}`,
      payload,
    ).pipe(
      map(mapClass)
    );
  }

  deleteClass(classId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${classId}`);
  }

  addStudent(classId: string, studentId: string): Observable<void> {
    return this.http.post<void>(
      `${this.baseUrl}/${classId}/students/${studentId}`,
      {},
    );
  }

  removeStudent(classId: string, studentId: string): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/${classId}/students/${studentId}`,
    );
  }

  addLesson(classId: string, lessonId: string): Observable<void> {
    return this.http.post<void>(
      `${this.baseUrl}/${classId}/lessons/${lessonId}`,
      {},
    );
  }

  removeLesson(classId: string, lessonId: string): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/${classId}/lessons/${lessonId}`,
    );
  }

  getStudents(classId: string): Observable<ClassStudent[]> {
    return this.http.get<ClassStudent[]>(
      `${this.baseUrl}/${classId}/students`,
    );
  }

  getLessons(classId: string): Observable<ClassLesson[]> {
    return this.http.get<ClassLesson[]>(
      `${this.baseUrl}/${classId}/lessons`,
    );
  }
}