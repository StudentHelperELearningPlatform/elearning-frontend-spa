import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { patchStore } from '../../../../test-utils/patch-store';
import { NotificationStore } from './notification.store';
import { AppNotification } from './notification.types';

const MOCK: AppNotification[] = [
  {
    id: 'n1',
    type: 'lesson_complete',
    title: 'Lesson done',
    message: 'Great job',
    read: false,
    createdAt: '2026-05-10T10:00:00Z',
  },
  {
    id: 'n2',
    type: 'milestone',
    title: 'Badge unlocked',
    message: 'You earned a badge',
    read: true,
    createdAt: '2026-05-12T10:00:00Z',
  },
  {
    id: 'n3',
    type: 'class_invite',
    title: 'New class',
    message: 'You were invited',
    read: false,
    createdAt: '2026-05-15T10:00:00Z',
  },
];

describe('NotificationStore', () => {
  let store: InstanceType<typeof NotificationStore>;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient()] });
    store = TestBed.inject(NotificationStore);
    http = TestBed.inject(HttpClient);
  });

  afterEach(() => vi.restoreAllMocks());

  it('starts empty and not loading', () => {
    expect(store.notifications()).toEqual([]);
    expect(store.loading()).toBe(false);
    expect(store.error()).toBeNull();
  });

  // ─── load ─────────────────────────────────────────────────────────────────

  it('load fetches unread notifications', () => {
    const spy = vi.spyOn(http, 'get').mockReturnValue(of(MOCK));
    store.load();
    expect(spy).toHaveBeenCalledWith('/api/notifications/me/unread');
    expect(store.notifications()).toEqual(MOCK);
    expect(store.loading()).toBe(false);
  });

  it('load handles a null body gracefully', () => {
    vi.spyOn(http, 'get').mockReturnValue(of(null));
    store.load();
    expect(store.notifications()).toEqual([]);
  });

  it('load sets error message on failure', () => {
    vi.spyOn(http, 'get').mockReturnValue(throwError(() => new Error('Boom')));
    store.load();
    expect(store.error()).toBe('Boom');
    expect(store.loading()).toBe(false);
  });

  it('load uses fallback message for non-Error failures', () => {
    vi.spyOn(http, 'get').mockReturnValue(throwError(() => 'nope'));
    store.load();
    expect(store.error()).toBe('Failed to load notifications');
  });

  // ─── computed ─────────────────────────────────────────────────────────────

  it('unreadCount counts unread notifications', () => {
    patchStore(store, { notifications: MOCK });
    expect(store.unreadCount()).toBe(2);
  });

  it('hasUnread is true when any notification is unread', () => {
    patchStore(store, { notifications: MOCK });
    expect(store.hasUnread()).toBe(true);
  });

  it('hasUnread is false when none are unread', () => {
    patchStore(store, { notifications: MOCK.map((n) => ({ ...n, read: true })) });
    expect(store.hasUnread()).toBe(false);
  });

  it('sorted orders newest first by createdAt', () => {
    patchStore(store, { notifications: MOCK });
    expect(store.sorted().map((n) => n.id)).toEqual(['n3', 'n2', 'n1']);
  });

  // ─── markRead ─────────────────────────────────────────────────────────────

  it('markRead optimistically flips read flag', () => {
    patchStore(store, { notifications: [...MOCK] });
    vi.spyOn(http, 'put').mockReturnValue(of({}));
    store.markRead('n1');
    expect(store.notifications().find((n) => n.id === 'n1')?.read).toBe(true);
  });

  it('markRead rolls back on error', () => {
    patchStore(store, { notifications: [...MOCK] });
    vi.spyOn(http, 'put').mockReturnValue(throwError(() => new Error('fail')));
    store.markRead('n1');
    expect(store.notifications().find((n) => n.id === 'n1')?.read).toBe(false);
  });

  // ─── markAllRead ──────────────────────────────────────────────────────────

  it('markAllRead marks every notification read optimistically', () => {
    patchStore(store, { notifications: [...MOCK] });
    vi.spyOn(http, 'put').mockReturnValue(of({}));
    store.markAllRead();
    expect(store.notifications().every((n) => n.read)).toBe(true);
  });

  it('markAllRead rolls back on error', () => {
    patchStore(store, { notifications: [...MOCK] });
    vi.spyOn(http, 'put').mockReturnValue(throwError(() => new Error('fail')));
    store.markAllRead();
    expect(store.notifications()).toEqual(MOCK);
  });

  // ─── remove ───────────────────────────────────────────────────────────────

  it('remove deletes the notification optimistically', () => {
    patchStore(store, { notifications: [...MOCK] });
    vi.spyOn(http, 'delete').mockReturnValue(of({}));
    store.remove('n2');
    expect(store.notifications().some((n) => n.id === 'n2')).toBe(false);
  });

  it('remove rolls back on error', () => {
    patchStore(store, { notifications: [...MOCK] });
    vi.spyOn(http, 'delete').mockReturnValue(throwError(() => new Error('fail')));
    store.remove('n2');
    expect(store.notifications().some((n) => n.id === 'n2')).toBe(true);
  });
});
