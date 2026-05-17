import { TestBed } from '@angular/core/testing';
import { ElementRef, EnvironmentInjector, runInInjectionContext, signal } from '@angular/core';
import { Router, provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { NotificationBellComponent } from './notification-bell.component';
import { NotificationStore } from './notification.store';
import { AppNotification } from './notification.types';

describe('NotificationBellComponent', () => {
  let injector: EnvironmentInjector;
  let router: Router;
  let storeMock: {
    load: ReturnType<typeof vi.fn>;
    markRead: ReturnType<typeof vi.fn>;
    markAllRead: ReturnType<typeof vi.fn>;
    remove: ReturnType<typeof vi.fn>;
    notifications: ReturnType<typeof signal<AppNotification[]>>;
    loading: ReturnType<typeof signal<boolean>>;
    error: ReturnType<typeof signal<string | null>>;
    unreadCount: ReturnType<typeof signal<number>>;
    sorted: ReturnType<typeof signal<AppNotification[]>>;
    hasUnread: ReturnType<typeof signal<boolean>>;
  };

  let hostElement: HTMLElement;

  beforeEach(() => {
    storeMock = {
      load: vi.fn(),
      markRead: vi.fn(),
      markAllRead: vi.fn(),
      remove: vi.fn(),
      notifications: signal<AppNotification[]>([]),
      loading: signal(false),
      error: signal<string | null>(null),
      unreadCount: signal(0),
      sorted: signal<AppNotification[]>([]),
      hasUnread: signal(false),
    };

    hostElement = document.createElement('div');

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideRouter([]),
        { provide: NotificationStore, useValue: storeMock },
        { provide: ElementRef, useValue: new ElementRef(hostElement) },
      ],
    });
    injector = TestBed.inject(EnvironmentInjector);
    router = TestBed.inject(Router);
  });

  afterEach(() => vi.restoreAllMocks());

  function make() {
    return runInInjectionContext(injector, () => new NotificationBellComponent());
  }

  it('creates without errors', () => {
    expect(make()).toBeTruthy();
  });

  it('ngOnInit triggers store.load()', () => {
    make().ngOnInit();
    expect(storeMock.load).toHaveBeenCalled();
  });

  it('toggle flips the open signal and stops event propagation', () => {
    const comp = make();
    const stop = vi.fn();
    expect(comp.open()).toBe(false);
    comp.toggle({ stopPropagation: stop } as unknown as Event);
    expect(comp.open()).toBe(true);
    expect(stop).toHaveBeenCalled();
    comp.toggle({ stopPropagation: stop } as unknown as Event);
    expect(comp.open()).toBe(false);
  });

  it('markAllRead delegates to the store', () => {
    make().markAllRead();
    expect(storeMock.markAllRead).toHaveBeenCalled();
  });

  it('openNotification marks an unread notification as read', () => {
    const comp = make();
    comp.openNotification({
      id: 'n1',
      type: 'lesson_complete',
      title: 't',
      message: 'm',
      read: false,
      createdAt: '2026-05-15',
    });
    expect(storeMock.markRead).toHaveBeenCalledWith('n1');
  });

  it('openNotification does NOT mark already-read notifications', () => {
    const comp = make();
    comp.openNotification({
      id: 'n1',
      type: 'milestone',
      title: 't',
      message: 'm',
      read: true,
      createdAt: '2026-05-15',
    });
    expect(storeMock.markRead).not.toHaveBeenCalled();
  });

  it('openNotification navigates when linkUrl is present and closes the dropdown', () => {
    const navSpy = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
    const comp = make();
    comp.open.set(true);
    comp.openNotification({
      id: 'n2',
      type: 'class_invite',
      title: 't',
      message: 'm',
      read: false,
      createdAt: '2026-05-15',
      linkUrl: '/teacher/classes/abc',
    });
    expect(navSpy).toHaveBeenCalledWith('/teacher/classes/abc');
    expect(comp.open()).toBe(false);
  });

  it('openNotification skips navigation when linkUrl is missing', () => {
    const navSpy = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
    const comp = make();
    comp.open.set(true);
    comp.openNotification({
      id: 'n3',
      type: 'announcement',
      title: 't',
      message: 'm',
      read: false,
      createdAt: '2026-05-15',
    });
    expect(navSpy).not.toHaveBeenCalled();
    expect(comp.open()).toBe(true);
  });

  it('remove delegates to the store and stops propagation', () => {
    const stop = vi.fn();
    make().remove({ stopPropagation: stop } as unknown as Event, 'n9');
    expect(stop).toHaveBeenCalled();
    expect(storeMock.remove).toHaveBeenCalledWith('n9');
  });

  it('iconFor returns expected icons for known types', () => {
    const comp = make();
    expect(comp.iconFor('lesson_complete')).toBe('menu_book');
    expect(comp.iconFor('quiz_result')).toBe('quiz');
    expect(comp.iconFor('milestone')).toBe('emoji_events');
    expect(comp.iconFor('class_invite')).toBe('groups');
    expect(comp.iconFor('announcement')).toBe('campaign');
    expect(comp.iconFor('payment')).toBe('payments');
  });

  it('iconFor falls back to "notifications" for unknown types', () => {
    expect(make().iconFor('weird' as unknown as 'milestone')).toBe('notifications');
  });

  it('onEscape closes the dropdown', () => {
    const comp = make();
    comp.open.set(true);
    comp.onEscape();
    expect(comp.open()).toBe(false);
  });

  it('onDocumentClick does nothing when the dropdown is closed', () => {
    const comp = make();
    comp.open.set(false);
    comp.onDocumentClick({ target: document.body } as unknown as MouseEvent);
    expect(comp.open()).toBe(false);
  });

  it('onDocumentClick closes when click target is outside the host', () => {
    const comp = make();
    comp.open.set(true);
    comp.onDocumentClick({ target: document.body } as unknown as MouseEvent);
    expect(comp.open()).toBe(false);
  });

  it('onDocumentClick keeps dropdown open when click target is inside the host', () => {
    const inner = document.createElement('span');
    hostElement.appendChild(inner);
    const comp = make();
    comp.open.set(true);
    comp.onDocumentClick({ target: inner } as unknown as MouseEvent);
    expect(comp.open()).toBe(true);
  });
});
