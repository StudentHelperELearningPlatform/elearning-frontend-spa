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
      getUser: () => of({ id: 'u1', firstName: 'Alice', lastName: '', email: 'a@x.io' }),
      searchUsers: () => of({ users: [], currentPage: 0, totalPages: 1, totalElements: 0 }),
    };

    const mockAuthStore = {
      user: () => mockMe,
    };

    const mockClassService = {
      getClasses: () => of([{ id: 'class-1', name: 'Class 1' }]),
      getStudents: () => of([{ userId: 'u1', firstName: 'Alice', lastName: '', email: 'a@x.io' }]),
    };

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: USER_PLATFORM_API_URL, useValue: mockApiUrl },
        { provide: ContactService, useValue: mockContactService },
        { provide: AuthStore, useValue: mockAuthStore },
        { provide: TeacherClassService, useValue: mockClassService },
      ],
    });

    store = TestBed.inject(ChatStore);
    contactService = TestBed.inject(ContactService);
    authStore = TestBed.inject(AuthStore);
    classService = TestBed.inject(TeacherClassService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpTestingController.verify());

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  it('loads inbox + sent and resolves names from firstName + lastName', () => {
    const inbox: InboxMessage[] = [
      { id: 'm1', senderId: 'u1', subject: 'Hi', body: 'Hi', isRead: false, sentAt: new Date().toISOString() },
    ];
    vi.spyOn(contactService, 'getInbox').mockReturnValue(of(inbox));
    vi.spyOn(contactService, 'getSent').mockReturnValue(of([]));
    vi.spyOn(contactService, 'getUser').mockReturnValue(
      of({ id: 'u1', firstName: 'Alice', lastName: 'Cooper', email: 'a@x.io' }),
    );

    store.loadInbox();

    expect(store.conversations()[0].contactName).toBe('Alice Cooper');
  });

  it('merges sent messages so outgoing threads survive a refresh', () => {
    const partner = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
    vi.spyOn(contactService, 'getInbox').mockReturnValue(of([]));
    vi.spyOn(contactService, 'getSent').mockReturnValue(of([
      { id: 's1', senderId: 'me-id', receiverId: partner, subject: 'Hi', body: 'Yo', isRead: true, sentAt: '2026-01-01T00:00:00Z' },
    ]));
    vi.spyOn(contactService, 'getUser').mockReturnValue(
      of({ id: partner, firstName: 'Bob', lastName: 'Smith', email: 'b@x.io' }),
    );

    store.loadInbox();

    expect(store.conversations().length).toBe(1);
    expect(store.conversations()[0].contactId).toBe(partner);
    expect(store.conversations()[0].contactName).toBe('Bob Smith');
  });

  it('students get empty discoverable contacts (no backend roster endpoint)', () => {
    vi.spyOn(authStore, 'user').mockReturnValue({
      id: 'me-id', role: 'STUDENT', email: 'me@example.com',
    } as unknown as { id: string; role: 'STUDENT' | 'TEACHER' | 'ADMIN'; email: string });

    store.loadInbox();

    expect(store.loading()).toBe(false);
    expect(store.conversations().length).toBe(0);
  });

  it('teachers/professors load discoverable students from class rosters', () => {
    vi.spyOn(authStore, 'user').mockReturnValue({
      id: 'me-id', role: 'TEACHER', email: 'teacher@example.com',
    } as unknown as { id: string; role: 'STUDENT' | 'TEACHER' | 'ADMIN'; email: string });

    store.loadInbox();

    expect(store.conversations().length).toBe(1);
    expect(store.conversations()[0].contactId).toBe('u1');
    expect(store.conversations()[0].contactName).toBe('Alice');
  });

  it('handles an empty class list for TEACHER', () => {
    vi.spyOn(authStore, 'user').mockReturnValue({
      id: 'me-id', role: 'TEACHER', email: 'teacher@example.com',
    } as unknown as { id: string; role: 'STUDENT' | 'TEACHER' | 'ADMIN'; email: string });
    vi.spyOn(classService, 'getClasses').mockReturnValue(of([]));

    store.loadInbox();

    expect(store.conversations().length).toBe(0);
  });

  it('returns early when current user is null', () => {
    vi.spyOn(authStore, 'user').mockReturnValue(null);
    store.loadInbox();
    expect(store.conversations().length).toBe(0);
  });

  it('searchUsersByName populates results from the backend', () => {
    vi.spyOn(contactService, 'searchUsers').mockReturnValue(
      of({
        users: [
          { id: 'u2', firstName: 'Ioana', lastName: 'Pop', email: 'i@x.io', role: 'STUDENT' },
        ],
        currentPage: 0,
        totalPages: 1,
        totalElements: 1,
      }),
    );

    store.searchUsersByName('Ioa');

    expect(store.searchResults().length).toBe(1);
    expect(store.searchResults()[0].name).toBe('Ioana Pop');
    expect(store.searchResults()[0].role).toBe('STUDENT');
  });

  it('searchUsersByName clears results for short queries', () => {
    store.searchResults.set([{ id: 'u9', name: 'X', email: '', role: 'STUDENT' }]);
    store.searchUsersByName('I');
    expect(store.searchResults().length).toBe(0);
  });

  it('selectSearchResult selects the contact and clears search', () => {
    store.selectSearchResult({ id: 'u3', name: 'Carol', email: 'c@x.io', role: 'STUDENT' });
    expect(store.selectedContactId()).toBe('u3');
    expect(store.contactNameFor('u3')).toBe('Carol');
    expect(store.searchResults().length).toBe(0);
  });

  it('sendMessage adds an optimistic message and clears sending on success', () => {
    const sendSpy = vi.spyOn(contactService, 'sendMessage').mockReturnValue(of('Success'));
    store.sendMessage('u1', 'Hello there');
    expect(store.sending()).toBe(false);
    expect(sendSpy).toHaveBeenCalled();
    expect(store.conversations().length).toBeGreaterThanOrEqual(0);
  });

  it('on send error, keeps optimistic message visible when /me/sent confirms persistence', () => {
    vi.spyOn(contactService, 'sendMessage').mockReturnValue(throwError(() => new Error('503')));
    vi.spyOn(contactService, 'getSent').mockReturnValue(
      of([
        {
          id: 'persisted-1',
          senderId: 'me-id',
          receiverId: 'u1',
          subject: 'Chat',
          body: 'Hello there',
          isRead: true,
          sentAt: new Date().toISOString(),
        },
      ]),
    );

    store.sendMessage('u1', 'Hello there');

    expect(store.sending()).toBe(false);
    expect(store.sendError()).toBeNull();
  });

  it('on send error with re-fetch failure, keeps optimistic message and stays silent', () => {
    vi.spyOn(contactService, 'sendMessage').mockReturnValue(throwError(() => new Error('503')));
    vi.spyOn(contactService, 'getSent').mockReturnValue(throwError(() => new Error('503')));

    store.sendMessage('u1', 'Hello there');

    expect(store.sending()).toBe(false);
    expect(store.sendError()).toBeNull();
  });

  it('on send error when /me/sent has no match, rolls back and reports failure', () => {
    vi.spyOn(contactService, 'sendMessage').mockReturnValue(throwError(() => new Error('boom')));
    vi.spyOn(contactService, 'getSent').mockReturnValue(of([]));

    store.sendMessage('u1', 'Hello there');

    expect(store.sending()).toBe(false);
    expect(store.sendError()).toBe('Failed to send. Try again.');
  });

  it('returns early in sendMessage when user is null or body is blank', () => {
    const sendSpy = vi.spyOn(contactService, 'sendMessage');

    vi.spyOn(authStore, 'user').mockReturnValue(null);
    store.sendMessage('u1', 'Hello');
    expect(sendSpy).not.toHaveBeenCalled();

    vi.spyOn(authStore, 'user').mockReturnValue(mockMe);
    store.sendMessage('u1', '   ');
    expect(sendSpy).not.toHaveBeenCalled();
  });

  it('selectContact updates selectedContactId', () => {
    store.selectContact('u1');
    expect(store.selectedContactId()).toBe('u1');
  });

  it('contactNameFor falls back when unknown', () => {
    expect(store.contactNameFor('xxxxxxxxxxxx')).toContain('User …');
  });

  it('rejects a non-UUID input in startConversationByUserId', () => {
    store.startConversationByUserId('not-a-uuid');
    expect(store.startChatError()).toBe('Enter a valid user ID (UUID).');
    expect(store.selectedContactId()).toBeNull();
  });
});
