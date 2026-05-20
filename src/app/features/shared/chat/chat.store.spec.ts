import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ChatStore } from './chat.store';
import { ContactService, InboxMessage } from './contact.service';
import { AuthStore } from '@features/auth/store/auth.store';
import { USER_PLATFORM_API_URL } from '@core/tokens/api.token';
import { TeacherClassService } from '@core/services/teacher-class.service';

describe('ChatStore', () => {
  let store: ChatStore;
  let contactService: ContactService;
  let authStore: AuthStore;
  let classService: TeacherClassService;
  let httpTestingController: HttpTestingController;
  const mockApiUrl = 'http://mock-api';

  const mockMe = { id: 'me-id', role: 'ADMIN', email: 'me@example.com' };

  beforeEach(() => {
    const mockContactService = {
      getInbox: () => of([]),
      sendMessage: () => of('Success'),
      getUser: () => of({ id: 'u1', name: 'Alice' })
    };

    const mockAuthStore = {
      user: () => mockMe
    };

    const mockClassService = {
      getClassDetail: () => of({ id: 'class-1', students: [{ id: 'u1', name: 'Alice' }] }),
      getClasses: () => of([{ id: 'class-1', name: 'Class 1' }])
    };

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: USER_PLATFORM_API_URL, useValue: mockApiUrl },
        { provide: ContactService, useValue: mockContactService },
        { provide: AuthStore, useValue: mockAuthStore },
        { provide: TeacherClassService, useValue: mockClassService }
      ]
    });

    store = TestBed.inject(ChatStore);
    contactService = TestBed.inject(ContactService);
    authStore = TestBed.inject(AuthStore);
    classService = TestBed.inject(TeacherClassService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  it('should load inbox and resolve contact names', () => {
    const messages: InboxMessage[] = [
      { id: 'm1', senderId: 'u1', subject: 'Hello', body: 'Hi', isRead: false, sentAt: new Date().toISOString() }
    ];
    vi.spyOn(contactService, 'getInbox').mockReturnValue(of(messages));
    const getUserSpy = vi.spyOn(contactService, 'getUser').mockReturnValue(of({ id: 'u1', name: 'Alice' }));

    store.loadInbox();

    expect(store.loading()).toBe(false);
    expect(getUserSpy).toHaveBeenCalledWith('u1');
    expect(store.hasActiveConversations()).toBe(true);
    expect(store.conversations().length).toBe(1);
    expect(store.conversations()[0].contactName).toBe('Alice');
  });

  it('should handle error when loadInbox fails', () => {
    vi.spyOn(contactService, 'getInbox').mockReturnValue(throwError(() => new Error('Error')));
    store.loadInbox();
    expect(store.loading()).toBe(false);
    expect(store.error()).toBe('Failed to load messages');
  });

  it('should handle empty user profile resolution and failed getUser calls', () => {
    const messages: InboxMessage[] = [
      { id: 'm1', senderId: 'u1', subject: 'Hello', body: 'Hi', isRead: false, sentAt: new Date().toISOString() }
    ];
    vi.spyOn(contactService, 'getInbox').mockReturnValue(of(messages));
    vi.spyOn(contactService, 'getUser').mockReturnValue(throwError(() => new Error('Failed to fetch profile')));

    store.loadInbox();

    expect(store.conversations()[0].contactName).toContain('User …');
  });

  it('should load discoverable classmates for STUDENT', () => {
    vi.spyOn(authStore, 'user').mockReturnValue({ id: 'me-id', role: 'STUDENT', email: 'me@example.com' } as unknown as { id: string; role: 'STUDENT' | 'TEACHER' | 'ADMIN'; email: string });
    const studentProfile = {
      enrolledClasses: ['class-1']
    };

    store.loadInbox();

    const req = httpTestingController.expectOne(`${mockApiUrl}/students/me/profile`);
    expect(req.request.method).toBe('GET');
    req.flush(studentProfile);

    expect(store.conversations().length).toBe(1);
    expect(store.conversations()[0].contactName).toBe('Alice');
  });

  it('should handle empty/null enrolledClasses for STUDENT', () => {
    vi.spyOn(authStore, 'user').mockReturnValue({ id: 'me-id', role: 'STUDENT', email: 'me@example.com' } as unknown as { id: string; role: 'STUDENT' | 'TEACHER' | 'ADMIN'; email: string });
    const studentProfile = {
      enrolledClasses: []
    };

    store.loadInbox();

    const req = httpTestingController.expectOne(`${mockApiUrl}/students/me/profile`);
    req.flush(studentProfile);

    expect(store.conversations().length).toBe(0);
  });

  it('should load discoverable students for TEACHER/PROFESSOR', () => {
    vi.spyOn(authStore, 'user').mockReturnValue({ id: 'me-id', role: 'TEACHER', email: 'teacher@example.com' } as unknown as { id: string; role: 'STUDENT' | 'TEACHER' | 'ADMIN'; email: string });

    store.loadInbox();

    expect(store.conversations().length).toBe(1);
    expect(store.conversations()[0].contactName).toBe('Alice');
  });

  it('should handle empty classes list for TEACHER', () => {
    vi.spyOn(authStore, 'user').mockReturnValue({ id: 'me-id', role: 'TEACHER', email: 'teacher@example.com' } as unknown as { id: string; role: 'STUDENT' | 'TEACHER' | 'ADMIN'; email: string });
    vi.spyOn(classService, 'getClasses').mockReturnValue(of([]));

    store.loadInbox();

    expect(store.conversations().length).toBe(0);
  });

  it('should return early in loadDiscoverableContacts if me user is null', () => {
    vi.spyOn(authStore, 'user').mockReturnValue(null);
    store.loadInbox();
    expect(store.conversations().length).toBe(0);
  });

  it('should handle sendMessage successfully', () => {
    const sendSpy = vi.spyOn(contactService, 'sendMessage').mockReturnValue(of('Success'));
    store.sendMessage('u1', 'Hello there');
    expect(store.sending()).toBe(false);
    expect(sendSpy).toHaveBeenCalled();
  });

  it('should handle sendMessage failure', () => {
    vi.spyOn(contactService, 'sendMessage').mockReturnValue(throwError(() => new Error('Error')));
    store.sendMessage('u1', 'Hello there');
    expect(store.sending()).toBe(false);
    expect(store.sendError()).toBe('Failed to send. Try again.');
  });

  it('should return early in sendMessage if me user is null or body is empty', () => {
    const sendSpy = vi.spyOn(contactService, 'sendMessage');

    // 1. null user
    vi.spyOn(authStore, 'user').mockReturnValue(null);
    store.sendMessage('u1', 'Hello');
    expect(sendSpy).not.toHaveBeenCalled();

    // 2. empty message body
    vi.spyOn(authStore, 'user').mockReturnValue(mockMe);
    store.sendMessage('u1', '   ');
    expect(sendSpy).not.toHaveBeenCalled();
  });

  it('should select contact', () => {
    store.selectContact('u1');
    expect(store.selectedContactId()).toBe('u1');
  });

  it('should return contactNameFor correctly', () => {
    expect(store.contactNameFor('u1')).toContain('User …');
  });

  it('should return empty conversations for other roles', () => {
    vi.spyOn(authStore, 'user').mockReturnValue({ id: 'me-id', role: 'ADMIN', email: 'admin@example.com' } as unknown as { id: string; role: 'STUDENT' | 'TEACHER' | 'ADMIN'; email: string });
    store.loadInbox();
    expect(store.conversations().length).toBe(0);
  });
});
