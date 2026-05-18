import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppNotification, NotificationStore } from './notification.store';
import { provideApiMocks } from '../../../../test-utils/api-testing';

const sample: AppNotification[] = [
  {
    id: 'n1',
    type: 'lesson_complete',
    title: 'Lesson done',
    message: 'Fractions completed',
    read: false,
    createdAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'n2',
    type: 'milestone',
    title: 'Milestone',
    message: 'First badge!',
    read: true,
    createdAt: '2026-01-02T00:00:00Z',
    linkUrl: '/student/milestones',
  },
];

describe('NotificationStore', () => {
  let store: NotificationStore;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NotificationStore, ...provideApiMocks()],
    });

    store = TestBed.inject(NotificationStore);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('starts empty', () => {
    expect(store.notifications()).toEqual([]);
    expect(store.unreadCount()).toBe(0);
    expect(store.loading()).toBe(false);
    expect(store.error()).toBeNull();
  });

  describe('load', () => {
    it('fetches notifications and updates state', () => {
      store.load();
      expect(store.loading()).toBe(true);

      const req = httpMock.expectOne('/api/v1/notifications/me/unread');
      expect(req.request.method).toBe('GET');
      req.flush(sample);

      expect(store.loading()).toBe(false);
      expect(store.notifications()).toEqual(sample);
      expect(store.unreadCount()).toBe(1);
      expect(store.error()).toBeNull();
    });

    it('handles non-array responses safely', () => {
      store.load();
      httpMock.expectOne('/api/v1/notifications/me/unread').flush(null);
      expect(store.notifications()).toEqual([]);
    });

    it('sets error on failure', () => {
      store.load();
      httpMock
        .expectOne('/api/v1/notifications/me/unread')
        .error(new ErrorEvent('boom'));
      expect(store.loading()).toBe(false);
      expect(store.error()).toBe('Failed to load notifications');
    });
  });

  describe('markRead', () => {
    beforeEach(() => {
      store.load();
      httpMock.expectOne('/api/v1/notifications/me/unread').flush(sample);
    });

    it('optimistically marks notification as read', () => {
      store.markRead('n1');
      expect(store.notifications().find((n) => n.id === 'n1')?.read).toBe(true);
      httpMock.expectOne('/api/v1/notifications/n1/read').flush({});
    });

    it('rolls back on failure', () => {
      store.markRead('n1');
      httpMock.expectOne('/api/v1/notifications/n1/read').error(new ErrorEvent('boom'));
      expect(store.notifications().find((n) => n.id === 'n1')?.read).toBe(false);
    });
  });

  describe('markAllRead', () => {
    beforeEach(() => {
      store.load();
      httpMock.expectOne('/api/v1/notifications/me/unread').flush(sample);
    });

    it('marks every notification as read', () => {
      store.markAllRead();
      expect(store.unreadCount()).toBe(0);
      httpMock.expectOne('/api/v1/notifications/me/read-all').flush({});
    });

    it('rolls back the whole list on failure', () => {
      const before = store.notifications();
      store.markAllRead();
      httpMock
        .expectOne('/api/v1/notifications/me/read-all')
        .error(new ErrorEvent('boom'));
      expect(store.notifications()).toEqual(before);
    });
  });

  describe('remove', () => {
    beforeEach(() => {
      store.load();
      httpMock.expectOne('/api/v1/notifications/me/unread').flush(sample);
    });

    it('removes optimistically', () => {
      store.remove('n1');
      expect(store.notifications().some((n) => n.id === 'n1')).toBe(false);
      httpMock.expectOne('/api/v1/notifications/n1').flush({});
    });

    it('restores list on failure', () => {
      const before = store.notifications();
      store.remove('n1');
      httpMock.expectOne('/api/v1/notifications/n1').error(new ErrorEvent('boom'));
      expect(store.notifications()).toEqual(before);
    });
  });
});
