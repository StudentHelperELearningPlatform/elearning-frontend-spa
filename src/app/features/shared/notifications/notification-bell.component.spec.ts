import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router, provideRouter } from '@angular/router';
import { NotificationBellComponent } from './notification-bell.component';
import { AppNotification, NotificationStore } from './notification.store';
import { AuthStore } from '@features/auth/store/auth.store';
import { createAuthStoreStub } from '../../../../test-utils/auth-testing';
import { provideApiMocks } from '../../../../test-utils/api-testing';

const fixtureNotifs: AppNotification[] = [
  {
    id: 'n1',
    type: 'lesson_complete',
    title: 'Done',
    message: '',
    read: false,
    createdAt: '2026-01-01T00:00:00Z',
  },
];

describe('NotificationBellComponent', () => {
  let fixture: ComponentFixture<NotificationBellComponent>;
  let component: NotificationBellComponent;
  let store: NotificationStore;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(() => {
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
    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(NotificationBellComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    httpMock.verify();
    vi.restoreAllMocks();
  });

  it('loads notifications on init when authenticated', () => {
    fixture.detectChanges();
    httpMock.expectOne('/api/v1/notifications/me/unread').flush(fixtureNotifs);
    expect(store.notifications()).toEqual(fixtureNotifs);
  });

  it('toggles the panel open and refetches', () => {
    fixture.detectChanges();
    httpMock.expectOne('/api/v1/notifications/me/unread').flush(fixtureNotifs);

    component.toggle();
    httpMock.expectOne('/api/v1/notifications/me/unread').flush(fixtureNotifs);

    component.toggle();
    // closing should not refetch
    httpMock.expectNone('/api/v1/notifications/me/unread');
  });

  it('markAll proxies to store', () => {
    fixture.detectChanges();
    httpMock.expectOne('/api/v1/notifications/me/unread').flush(fixtureNotifs);
    const spy = vi.spyOn(store, 'markAllRead');
    component.markAll();
    expect(spy).toHaveBeenCalled();
    httpMock.expectOne('/api/v1/notifications/me/read-all').flush({});
  });

  it('opens link and marks as read when notification clicked', () => {
    fixture.detectChanges();
    httpMock.expectOne('/api/v1/notifications/me/unread').flush(fixtureNotifs);
    const markSpy = vi.spyOn(store, 'markRead');
    const navSpy = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);

    component.openNotification({
      id: 'n1',
      type: 'milestone',
      title: 't',
      message: 'm',
      read: false,
      createdAt: '2026-01-01T00:00:00Z',
      linkUrl: '/student/milestones',
    });

    expect(markSpy).toHaveBeenCalledWith('n1');
    expect(navSpy).toHaveBeenCalledWith('/student/milestones');
    httpMock.expectOne('/api/v1/notifications/n1/read').flush({});
  });

  it('does not mark or navigate for read notifications without link', () => {
    fixture.detectChanges();
    httpMock.expectOne('/api/v1/notifications/me/unread').flush(fixtureNotifs);
    const markSpy = vi.spyOn(store, 'markRead');
    const navSpy = vi.spyOn(router, 'navigateByUrl');

    component.openNotification({
      id: 'n2',
      type: 'announcement',
      title: 't',
      message: 'm',
      read: true,
      createdAt: '2026-01-01T00:00:00Z',
    });

    expect(markSpy).not.toHaveBeenCalled();
    expect(navSpy).not.toHaveBeenCalled();
  });

  it('maps notification types to icons', () => {
    fixture.detectChanges();
    httpMock.expectOne('/api/v1/notifications/me/unread').flush([]);

    expect(component.iconFor('lesson_complete')).toBe('menu_book');
    expect(component.iconFor('quiz_result')).toBe('quiz');
    expect(component.iconFor('milestone')).toBe('emoji_events');
    expect(component.iconFor('class_invite')).toBe('group_add');
    expect(component.iconFor('payment')).toBe('payments');
    expect(component.iconFor('announcement')).toBe('campaign');
  });
});
