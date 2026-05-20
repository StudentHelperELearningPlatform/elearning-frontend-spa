import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ChatPageComponent } from './chat-page.component';
import { ChatStore } from './chat.store';
import { AuthStore } from '@features/auth/store/auth.store';
import { USER_PLATFORM_API_URL } from '@core/tokens/api.token';
import { ElementRef } from '@angular/core';

describe('ChatPageComponent', () => {
  let fixture: ComponentFixture<ChatPageComponent>;
  let component: ChatPageComponent;
  let store: ChatStore;

  const mockConversations = [
    {
      contactId: 'u1',
      contactName: 'Alice',
      messages: [
        { id: 'm1', senderId: 'u1', receiverId: 'me-id', subject: 'Subject', body: 'Hello Alice', sentAt: '2023-01-01T00:00:00Z', isRead: true },
        { id: 'm2', senderId: 'me-id', receiverId: 'u1', subject: 'Subject', body: 'Hello back', sentAt: '2023-01-01T00:01:00Z', isRead: true }
      ],
      lastMessage: { id: 'm2', senderId: 'me-id', receiverId: 'u1', subject: 'Subject', body: 'Hello back', sentAt: '2023-01-01T00:01:00Z', isRead: true }
    }
  ];

  beforeEach(async () => {
    const mockChatStore = {
      loading: () => false,
      error: () => null,
      sending: () => false,
      sendError: () => null,
      selectedContactId: () => 'u1',
      conversations: () => mockConversations,
      selectedConversation: () => mockConversations[0],
      hasActiveConversations: () => true,
      loadInbox: vi.fn(),
      selectContact: vi.fn(),
      sendMessage: vi.fn()
    };

    const mockAuthStore = {
      user: () => ({ id: 'me-id', name: 'Me', email: 'me@example.com' })
    };

    await TestBed.configureTestingModule({
      imports: [ChatPageComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: USER_PLATFORM_API_URL, useValue: 'http://mock-api' },
        { provide: ChatStore, useValue: mockChatStore },
        { provide: AuthStore, useValue: mockAuthStore }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatPageComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(ChatStore);
  });

  it('should be created and load inbox on init', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(store.loadInbox).toHaveBeenCalled();
  });

  it('should select a contact and scroll to bottom', () => {
    vi.useFakeTimers();
    const scrollSpy = vi.spyOn(component as unknown as { scrollToBottom: () => void }, 'scrollToBottom');
    component.selectContact(mockConversations[0]);
    expect(store.selectContact).toHaveBeenCalledWith('u1');
    vi.advanceTimersByTime(50);
    expect(scrollSpy).toHaveBeenCalled();
    vi.useRealTimers();
  });

  it('should check if message is from me correctly', () => {
    expect(component.isMe('me-id')).toBe(true);
    expect(component.isMe('u1')).toBe(false);
  });

  it('should get initials properly', () => {
    expect(component.initials('John Doe')).toBe('JD');
    expect(component.initials('SingleName')).toBe('S');
    expect(component.initials('')).toBe('?');
    expect(component.initials(undefined)).toBe('?');
  });

  it('should calculate avatar colors consistently', () => {
    const color1 = component.avatarColor('user-1');
    const color2 = component.avatarColor('user-1');
    const color3 = component.avatarColor('user-2');
    expect(color1).toBe(color2);
    expect(color1).not.toBe(color3);
  });

  it('should handle onEnter key press without Shift key', () => {
    const mockEvent = {
      shiftKey: false,
      preventDefault: vi.fn()
    } as unknown as KeyboardEvent;
    
    component.draft.set('New Message');
    const sendSpy = vi.spyOn(component, 'send');
    component.onEnter(mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(sendSpy).toHaveBeenCalled();
  });

  it('should ignore onEnter key press with Shift key', () => {
    const mockEvent = {
      shiftKey: true,
      preventDefault: vi.fn()
    } as unknown as KeyboardEvent;

    const sendSpy = vi.spyOn(component, 'send');
    component.onEnter(mockEvent);

    expect(mockEvent.preventDefault).not.toHaveBeenCalled();
    expect(sendSpy).not.toHaveBeenCalled();
  });

  it('should send a message and scroll to bottom', () => {
    vi.useFakeTimers();
    component.draft.set('Draft text');
    const scrollSpy = vi.spyOn(component as unknown as { scrollToBottom: () => void }, 'scrollToBottom');
    
    component.send();

    expect(store.sendMessage).toHaveBeenCalledWith('u1', 'Draft text');
    expect(component.draft()).toBe('');
    vi.advanceTimersByTime(80);
    expect(scrollSpy).toHaveBeenCalled();
    vi.useRealTimers();
  });

  it('should not send a message if contactId or text is missing', () => {
    vi.spyOn(store, 'selectedContactId').mockReturnValue(null);
    component.draft.set('Draft text');
    component.send();
    expect(store.sendMessage).not.toHaveBeenCalled();

    vi.spyOn(store, 'selectedContactId').mockReturnValue('u1');
    component.draft.set('   ');
    component.send();
    expect(store.sendMessage).not.toHaveBeenCalled();
  });

  it('should scroll thread container to bottom', () => {
    const mockElement = {
      scrollTop: 0,
      scrollHeight: 500
    };
    component.threadRef = {
      nativeElement: mockElement as HTMLDivElement
    } as ElementRef;

    (component as unknown as { scrollToBottom: () => void }).scrollToBottom();
    expect(mockElement.scrollTop).toBe(500);
  });
});
