import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { ContactService, InboxMessage, SendMessageRequest, UserProfile } from './contact.service';
import { USER_PLATFORM_API_URL } from '@core/tokens/api.token';

describe('ContactService', () => {
  let service: ContactService;
  let httpTestingController: HttpTestingController;
  const mockApiUrl = 'http://mock-api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: USER_PLATFORM_API_URL, useValue: mockApiUrl },
      ],
    });

    service = TestBed.inject(ContactService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get inbox messages', () => {
    const mockInbox: InboxMessage[] = [
      { id: '1', senderId: 'u1', subject: 'Hello', body: 'Test message', isRead: false, sentAt: '2023-01-01T00:00:00Z' }
    ];

    service.getInbox().subscribe((msgs) => {
      expect(msgs).toEqual(mockInbox);
    });

    const req = httpTestingController.expectOne(`${mockApiUrl}/contact/me/inbox`);
    expect(req.request.method).toBe('GET');
    req.flush(mockInbox);
  });

  it('should send a message', () => {
    const payload: SendMessageRequest = {
      senderId: 'u2',
      receiverId: 'u1',
      subject: 'Reply',
      body: 'Replied text'
    };

    service.sendMessage(payload).subscribe((res) => {
      expect(res).toBe('Success');
    });

    const req = httpTestingController.expectOne(`${mockApiUrl}/contact/send`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);
    req.flush('Success');
  });

  it('should get user profile', () => {
    const mockProfile: UserProfile = {
      id: 'u1',
      name: 'Alice',
      email: 'alice@example.com',
      username: 'alice_un'
    };

    service.getUser('u1').subscribe((profile) => {
      expect(profile).toEqual(mockProfile);
    });

    const req = httpTestingController.expectOne(`${mockApiUrl}/users/u1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProfile);
  });
});
