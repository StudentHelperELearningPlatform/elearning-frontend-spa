import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { NotificationBellComponent } from './notification-bell.component';
import { AppNotification, NotificationStore } from './notification.store';
import { AuthStore } from '@features/auth/store/auth.store';
import { createAuthStoreStub } from '../../../../test-utils/auth-testing';
import { provideApiMocks } from '../../../../test-utils/api-testing';

const fixtureNotifs: AppNotification[] = [
  {
    id: 'n1',
    type: 'PROGRESS',
    title: 'Done',
    message: '',
    isRead: false,
    read: false,
    createdAt: '2026-01-01T00:00:00Z',
  },
];

describe('NotificationBellComponent', () => {
  let fixture: ComponentFixture<NotificationBellComponent>;
  let component: NotificationBellComponent;
  let store: NotificationStore;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    vi.useFakeTimers();

    TestBed.configureTestingModule({
      imports: [NotificationBellComponent, HttpClientTestingModule],
      providers: [
        provideRouter([]),
        ...provideApiMocks(),
        { provide: AuthStore, useValue: createAuthStoreStub({ isAuthenticated: true }) },
      ],
    });

    store = TestBed.inject(NotificationStore);
    httpMock = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(NotificationBellComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    httpMock.verify();
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('does not load notifications on init', () => {
    fixture.detectChanges();
    httpMock.expectNone('/api/v1/notifications/me/unread');
    expect(store.notifications()).toEqual([]);
  });

  it('loads notifications when toggled open and does not auto-mark them', () => {
    fixture.detectChanges();

    component.toggle();
    httpMock.expectOne('/api/v1/notifications/me/unread').flush(fixtureNotifs);
    expect(store.notifications()).toEqual(fixtureNotifs);

    vi.advanceTimersByTime(5000);
    httpMock.expectNone('/api/v1/notifications/me/read-all');
    expect(store.unreadCount()).toBe(1);
  });

  it('toggles the panel open and closed without extra fetches', () => {
    fixture.detectChanges();

    component.toggle();
    httpMock.expectOne('/api/v1/notifications/me/unread').flush(fixtureNotifs);

    component.toggle();
    httpMock.expectNone('/api/v1/notifications/me/unread');
  });

  it('markAll proxies to store', () => {
    fixture.detectChanges();
    const spy = vi.spyOn(store, 'markAllRead');
    component.markAll();
    expect(spy).toHaveBeenCalled();
    httpMock.expectOne('/api/v1/notifications/me/read-all').flush({});
  });

  it('dismiss marks a single notification as read', () => {
    fixture.detectChanges();
    const markSpy = vi.spyOn(store, 'markRead');

    component.dismiss({
      id: 'n1',
      type: 'ACHIEVEMENT',
      title: 't',
      message: 'm',
      isRead: false,
      read: false,
      createdAt: '2026-01-01T00:00:00Z',
    });

    expect(markSpy).toHaveBeenCalledWith('n1');
    httpMock.expectOne('/api/v1/notifications/n1/read').flush({});
  });

  it('maps notification types to icons', () => {
    fixture.detectChanges();

    expect(component.iconFor('PROGRESS')).toBe('menu_book');
    expect(component.iconFor('ACHIEVEMENT')).toBe('emoji_events');
    expect(component.iconFor('CLASS')).toBe('group_add');
    expect(component.iconFor('PAYMENT')).toBe('payments');
    expect(component.iconFor('SYSTEM')).toBe('campaign');
  });
});
