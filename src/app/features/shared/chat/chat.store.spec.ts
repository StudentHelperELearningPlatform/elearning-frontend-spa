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
      getSent: () => of([]),
      sendMessage: () => of('Success'),
      getUser: () => of({ id: 'u1', name: 'Alice' })
    };

    const mockAuthStore = {
      user: () => mockMe
    };

    const mockClassService = {
      getClasses: () => of([{ id: 'class-1', name: 'Class 1' }]),
      getStudents: () => of([{ userId: 'u1', firstName: 'Alice', lastName: '', email: 'alice@x.io' }]),
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

  it('should handle error when loadInbox fails on both endpoints', () => {
    vi.spyOn(contactService, 'getInbox').mockReturnValue(throwError(() => new Error('Error')));
    vi.spyOn(contactService, 'getSent').mockReturnValue(throwError(() => new Error('Error')));
    store.loadInbox();
    expect(store.loading()).toBe(false);
    // forkJoin with catchError on each branch yields empty arrays, so we
    // fall through to discoverable contacts rather than the error path.
    expect(store.error()).toBeNull();
    expect(store.conversations().length).toBe(0);
  });

  it('merges sent messages with the inbox so outgoing threads survive a refresh', () => {
    const myId = 'me-id';
    const partner = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
    vi.spyOn(contactService, 'getInbox').mockReturnValue(of([]));
    vi.spyOn(contactService, 'getSent').mockReturnValue(of([
      { id: 's1', senderId: myId, receiverId: partner, subject: 'Hi', body: 'Yo', isRead: true, sentAt: '2026-01-01T00:00:00Z' },
    ]));
    vi.spyOn(contactService, 'getUser').mockReturnValue(
      of({ id: partner, firstName: 'Bob', lastName: 'Smith', email: 'b@x.io' }),
    );

    store.loadInbox();

    expect(store.conversations().length).toBe(1);
    expect(store.conversations()[0].contactId).toBe(partner);
    expect(store.conversations()[0].contactName).toBe('Bob Smith');
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

  it('leaves students with empty discoverable contacts (no user-search endpoint exposed to them)', () => {
    vi.spyOn(authStore, 'user').mockReturnValue({ id: 'me-id', role: 'STUDENT', email: 'me@example.com' } as unknown as { id: string; role: 'STUDENT' | 'TEACHER' | 'ADMIN'; email: string });

    store.loadInbox();

    expect(store.loading()).toBe(false);
    expect(store.conversations().length).toBe(0);
  });

  it('lets a student start a new conversation by user ID via GET /users/{id}', () => {
    vi.spyOn(authStore, 'user').mockReturnValue({ id: 'me-id', role: 'STUDENT', email: 'me@example.com' } as unknown as { id: string; role: 'STUDENT' | 'TEACHER' | 'ADMIN'; email: string });
    const target = '11111111-1111-1111-1111-111111111111';
    const getUserSpy = vi.spyOn(contactService, 'getUser').mockReturnValue(
      of({ id: target, firstName: 'Bob', lastName: 'Smith', email: 'bob@x.io' }),
    );

    store.startConversationByUserId(target);

    expect(getUserSpy).toHaveBeenCalledWith(target);
    expect(store.selectedContactId()).toBe(target);
    expect(store.contactNameFor(target)).toBe('Bob Smith');
  });

  it('rejects a non-UUID input from startConversationByUserId', () => {
    store.startConversationByUserId('not-a-uuid');
    expect(store.startChatError()).toBe('Enter a valid user ID (UUID).');
    expect(store.selectedContactId()).toBeNull();
  });

  it('should load discoverable students for TEACHER/PROFESSOR', () => {
    vi.spyOn(authStore, 'user').mockReturnValue({ id: 'me-id', role: 'TEACHER', email: 'teacher@example.com' } as unknown as { id: string; role: 'STUDENT' | 'TEACHER' | 'ADMIN'; email: string });

    store.loadInbox();

    expect(store.conversations().length).toBe(1);
    expect(store.conversations()[0].contactName).toBe('Alice');
    expect(store.conversations()[0].contactId).toBe('u1');
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

  it('uses firstName + lastName from UserResponse when resolving contact names', () => {
    const messages: InboxMessage[] = [
      { id: 'm1', senderId: 'u1', subject: 'Hi', body: 'Hi', isRead: false, sentAt: new Date().toISOString() },
    ];
    vi.spyOn(contactService, 'getInbox').mockReturnValue(of(messages));
    vi.spyOn(contactService, 'getUser').mockReturnValue(
      of({ id: 'u1', firstName: 'Alice', lastName: 'Cooper', email: 'a@x.io' }),
    );

    store.loadInbox();

    expect(store.conversations()[0].contactName).toBe('Alice Cooper');
  });
});
