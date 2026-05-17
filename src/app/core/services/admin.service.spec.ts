import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { AdminService, ContactMessage, AdminUserRaw, AdminLessonRaw, AdminClassRaw } from './admin.service';
import { USER_PLATFORM_API_URL, CONTENT_API_URL } from '@core/tokens/api.token';
import { lastValueFrom } from 'rxjs';

describe('AdminService', () => {
  let service: AdminService;
  let httpTestingController: HttpTestingController;
  const mockUserApiUrl = 'http://mock-user-api';
  const mockContentApiUrl = 'http://mock-content-api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: USER_PLATFORM_API_URL, useValue: mockUserApiUrl },
        { provide: CONTENT_API_URL, useValue: mockContentApiUrl },
      ],
    });

    service = TestBed.inject(AdminService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should get all users', () => {
    const mockUsers: AdminUserRaw[] = [
      { id: 'u1', name: 'Alice', email: 'alice@example.com', role: 'STUDENT', status: 'ACTIVE' }
    ];

    service.getUsers().subscribe((users) => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpTestingController.expectOne(`${mockUserApiUrl}/users`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should get banned users', () => {
    const mockBanned: AdminUserRaw[] = [
      { userId: 'u2', name: 'Bob', email: 'bob@example.com', role: 'TEACHER', status: 'BANNED' }
    ];

    service.getBannedUsers().subscribe((users) => {
      expect(users).toEqual(mockBanned);
    });

    const req = httpTestingController.expectOne(`${mockUserApiUrl}/admin/users/banned`);
    expect(req.request.method).toBe('GET');
    req.flush(mockBanned);
  });

  it('should delete a user', () => {
    service.deleteUser('u1').subscribe();

    const req = httpTestingController.expectOne(`${mockUserApiUrl}/admin/users/u1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should ban a user', () => {
    service.banUser('u1').subscribe();

    const req = httpTestingController.expectOne(`${mockUserApiUrl}/admin/users/u1/ban`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({});
    req.flush(null);
  });

  it('should unban a user', () => {
    service.unbanUser('u1').subscribe();

    const req = httpTestingController.expectOne(`${mockUserApiUrl}/admin/users/u1/ban`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should get lessons', () => {
    const mockLessons: AdminLessonRaw[] = [
      { id: 'l1', title: 'Lesson 1', subject: 'Math', grade: 9 }
    ];

    service.getLessons().subscribe((lessons) => {
      expect(lessons).toEqual(mockLessons);
    });

    const req = httpTestingController.expectOne(`${mockContentApiUrl}/lessons`);
    expect(req.request.method).toBe('GET');
    req.flush(mockLessons);
  });

  it('should delete a lesson', () => {
    service.deleteLesson('l1').subscribe();

    const req = httpTestingController.expectOne(`${mockUserApiUrl}/admin/lessons/l1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should get classes', () => {
    const mockClasses: AdminClassRaw[] = [
      { id: 'c1', name: 'Class A', teacher: 'John Doe', studentCount: 15 }
    ];

    service.getClasses().subscribe((classes) => {
      expect(classes).toEqual(mockClasses);
    });

    const req = httpTestingController.expectOne(`${mockUserApiUrl}/teachers/classes`);
    expect(req.request.method).toBe('GET');
    req.flush(mockClasses);
  });

  it('should delete a class', () => {
    service.deleteClass('c1').subscribe();

    const req = httpTestingController.expectOne(`${mockUserApiUrl}/admin/classes/c1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should get contact messages', () => {
    const mockMessages: ContactMessage[] = [
      { id: 'm1', senderName: 'Alice', senderEmail: 'alice@example.com', subject: 'Help', message: 'I need assistance', timestamp: '2023-01-01', read: false }
    ];

    service.getContactMessages().subscribe((messages) => {
      expect(messages).toEqual(mockMessages);
    });

    const req = httpTestingController.expectOne(`${mockUserApiUrl}/contact/me/inbox`);
    expect(req.request.method).toBe('GET');
    req.flush(mockMessages);
  });

  it('should mark contact message as read', () => {
    service.markContactMessageRead('m1', true).subscribe();

    const req = httpTestingController.expectOne(`${mockUserApiUrl}/notifications/m1/read`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({ read: true });
    req.flush(null);
  });

  it('should return completed observable on deleteContactMessage', async () => {
    await lastValueFrom(service.deleteContactMessage('m1'));
    expect(true).toBe(true);
  });
});
