import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AdminService, ContactMessage, AdminUserRaw, AdminLessonRaw, AdminClassRaw } from '../../../core/services/admin.service';
import { NotificationService } from '../../../core/services/notification.service';

describe('AdminDashboardComponent', () => {
  let fixture: ComponentFixture<AdminDashboardComponent>;
  let component: AdminDashboardComponent;
  let adminService: AdminService;
  let notificationService: NotificationService;

  const mockUsers: AdminUserRaw[] = [
    { id: 'u1', name: 'Alice', email: 'alice@example.com', role: 'STUDENT', status: 'ACTIVE' },
    { id: 'u2', name: 'Bob', email: 'bob@example.com', role: 'TEACHER', status: 'BANNED' },
    { keycloakId: '11111111-2222-3333-4444-555555555555', firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com', role: 'ADMIN' },
    { sub: '22222222-3333-4444-5555-666666666666', username: 'john_uname', email: 'john@example.com' },
    { randomPropUuid: '33333333-4444-5555-6666-777777777777', email: 'random@example.com' }
  ];

  const mockBannedUsers: AdminUserRaw[] = [
    { userId: 'u2', sub: 'u2', name: 'Bob', email: 'bob@example.com', role: 'TEACHER', status: 'BANNED' },
    { targetUserId: '44444444-5555-6666-7777-888888888888', username: 'banned_uname', email: 'banned@example.com' }
  ];

  const mockLessons: AdminLessonRaw[] = [
    { id: 'l1', title: 'Lesson A', subject: 'Math', grade: 10, author: 'Mr. Smith', status: 'PUBLISHED' }
  ];

  const mockClasses: AdminClassRaw[] = [
    { id: 'c1', name: 'Class A', teacher: 'John Doe', studentCount: 15, subject: 'Science' }
  ];

  const mockMessages: ContactMessage[] = [
    { id: 'm1', senderName: 'User X', senderEmail: 'x@example.com', subject: 'Help', message: 'Assistance needed', timestamp: '2023-01-01', read: false }
  ];

  beforeEach(async () => {
    const mockAdminService = {
      getUsers: () => of(mockUsers),
      getBannedUsers: () => of(mockBannedUsers),
      getLessons: () => of(mockLessons),
      getClasses: () => of(mockClasses),
      getContactMessages: () => of(mockMessages),
      banUser: () => of(undefined),
      unbanUser: () => of(undefined),
      deleteUser: () => of(undefined),
      deleteLesson: () => of(undefined),
      deleteClass: () => of(undefined),
      markContactMessageRead: () => of(undefined),
      deleteContactMessage: () => of(undefined)
    };

    const mockNotificationService = {
      success: vi.fn(),
      error: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [AdminDashboardComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: AdminService, useValue: mockAdminService },
        { provide: NotificationService, useValue: mockNotificationService }
      ]
    }).compileComponents();

    adminService = TestBed.inject(AdminService);
    notificationService = TestBed.inject(NotificationService);

    fixture = TestBed.createComponent(AdminDashboardComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize and load all tables correctly on init', () => {
    fixture.detectChanges(); // triggers ngOnInit

    expect(component.users().length).toBe(5);
    expect(component.lessons().length).toBe(1);
    expect(component.classes().length).toBe(1);
    expect(component.contactMessages().length).toBe(1);
  });

  it('should support changing activeTab', () => {
    component.setActiveTab('inbox');
    expect(component.activeTab()).toBe('inbox');
  });

  it('should filter users by search query and status', () => {
    fixture.detectChanges();

    // 1. Search by name
    component.userSearchQuery.set('Alice');
    expect(component.filteredUsers().length).toBe(1);
    expect(component.filteredUsers()[0].name).toBe('Alice');

    // 2. Search by email
    component.userSearchQuery.set('jane@example.com');
    expect(component.filteredUsers().length).toBe(1);
    expect(component.filteredUsers()[0].name).toBe('Jane Doe');

    // 3. Search by name (Bob)
    component.statusFilter.set('ALL');
    component.userSearchQuery.set('bob');
    expect(component.filteredUsers().length).toBe(1);
    expect(component.filteredUsers()[0].name).toBe('Bob');

    // 4. Search with no match
    component.userSearchQuery.set('NonexistentUserQuery');
    expect(component.filteredUsers().length).toBe(0);

    // 5. Status filter check with specific status
    component.userSearchQuery.set('');
    component.statusFilter.set('BANNED');
    expect(component.filteredUsers().length).toBe(1);
    expect(component.filteredUsers()[0].name).toBe('Bob');

    // 6. Status filter check with ALL
    component.statusFilter.set('ALL');
    expect(component.filteredUsers().length).toBe(5);
  });

  it('should update search query correctly', () => {
    const inputEvent = { target: { value: 'Jane' } } as unknown as Event;
    component.updateUserSearch(inputEvent);
    expect(component.userSearchQuery()).toBe('Jane');
  });

  it('should compute user distribution insights correctly', () => {
    fixture.detectChanges();
    expect(component.userInsights()).toEqual({
      studentsPct: 60,
      teachersPct: 20,
      adminsPct: 20,
      studentsCount: 3,
      teachersCount: 1,
      adminsCount: 1
    });
  });

  it('should compute banned users count correctly', () => {
    fixture.detectChanges();
    expect(component.bannedUsersCount()).toBe(1);
  });

  it('should parse object entries properly', () => {
    const obj = { age: 30, city: 'Cluj', avatarSeed: 'x', raw: {}, nestedObj: { custom: 123 } };
    const entries = component.getObjectEntries(obj);
    expect(entries).toEqual([
      { key: 'age', value: 30 },
      { key: 'city', value: 'Cluj' },
      { key: 'nestedObj', value: '{"custom":123}' }
    ]);

    // Handle null/undefined checks
    expect(component.getObjectEntries(null)).toEqual([]);
    expect(component.getObjectEntries(undefined)).toEqual([]);
  });

  it('should handle unban action successfully if confirmed', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    const serviceSpy = vi.spyOn(adminService, 'unbanUser').mockReturnValue(of(undefined));
    const loadSpy = vi.spyOn(component, 'loadUsers');

    const adminUser = {
      id: 'u2',
      name: 'Bob',
      email: 'bob@example.com',
      role: 'TEACHER' as const,
      status: 'BANNED' as const,
      raw: {}
    };

    component.unbanUser(adminUser);
    expect(serviceSpy).toHaveBeenCalledWith('u2');
    expect(notificationService.success).toHaveBeenCalled();
    expect(loadSpy).toHaveBeenCalled();
  });

  it('should show error if unban user target ID is missing', () => {
    const adminUser = {
      id: '',
      name: 'Bob',
      email: 'bob@example.com',
      role: 'TEACHER' as const,
      status: 'BANNED' as const,
      raw: {}
    };

    component.unbanUser(adminUser);
    expect(notificationService.error).toHaveBeenCalledWith('Cannot unban: No valid target User ID could be extracted from database entity.');
  });

  it('should set pending ban state on banUser', () => {
    component.banUser('u1');
    expect(component.userPendingBan()).toBe('u1');
    expect(component.banReason()).toBe('');
  });

  it('should cancel pending ban', () => {
    component.banUser('u1');
    component.cancelBan();
    expect(component.userPendingBan()).toBeNull();
    expect(component.banReason()).toBe('');
  });

  it('should update ban reason correctly', () => {
    const inputEvent = { target: { value: 'Spamming' } } as unknown as Event;
    component.updateBanReason(inputEvent);
    expect(component.banReason()).toBe('Spamming');
  });

  it('should handle ban action successfully through performBan', () => {
    const serviceSpy = vi.spyOn(adminService, 'banUser').mockReturnValue(of(undefined));
    const loadSpy = vi.spyOn(component, 'loadUsers');

    component.banUser('u1');
    component.banReason.set('Spamming');
    component.performBan();

    expect(serviceSpy).toHaveBeenCalledWith('u1', 'Spamming');
    expect(notificationService.success).toHaveBeenCalledWith('User has been banned.');
    expect(component.userPendingBan()).toBeNull();
    expect(component.banReason()).toBe('');
    expect(loadSpy).toHaveBeenCalled();
  });

  it('should handle deleteUser successfully if confirmed', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    const serviceSpy = vi.spyOn(adminService, 'deleteUser').mockReturnValue(of(undefined));
    const loadSpy = vi.spyOn(component, 'loadUsers');

    component.deleteUser('u1');
    expect(serviceSpy).toHaveBeenCalledWith('u1');
    expect(notificationService.success).toHaveBeenCalled();
    expect(loadSpy).toHaveBeenCalled();
  });

  it('should handle deleteLesson successfully if confirmed', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    const serviceSpy = vi.spyOn(adminService, 'deleteLesson').mockReturnValue(of(undefined));
    const loadSpy = vi.spyOn(component, 'loadLessons');

    component.deleteLesson('l1');
    expect(serviceSpy).toHaveBeenCalledWith('l1');
    expect(notificationService.success).toHaveBeenCalled();
    expect(loadSpy).toHaveBeenCalled();
  });

  it('should handle deleteClass successfully if confirmed', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    const serviceSpy = vi.spyOn(adminService, 'deleteClass').mockReturnValue(of(undefined));
    const loadSpy = vi.spyOn(component, 'loadClasses');

    component.deleteClass('c1');
    expect(serviceSpy).toHaveBeenCalledWith('c1');
    expect(notificationService.success).toHaveBeenCalled();
    expect(loadSpy).toHaveBeenCalled();
  });

  it('should select contact message and mark as read if unread', () => {
    const serviceSpy = vi.spyOn(adminService, 'markContactMessageRead').mockReturnValue(of(undefined));
    const loadSpy = vi.spyOn(component, 'loadContactMessages');

    component.selectMessage(mockMessages[0]);
    expect(component.selectedMessage()).toEqual({ ...mockMessages[0], read: true });
    expect(serviceSpy).toHaveBeenCalledWith('m1', true);
    expect(loadSpy).toHaveBeenCalled();
  });

  it('should support selecting and opening message directly from overview', () => {
    const selectSpy = vi.spyOn(component, 'selectMessage');
    component.selectAndOpenMessage(mockMessages[0]);
    expect(component.activeTab()).toBe('inbox');
    expect(selectSpy).toHaveBeenCalledWith(mockMessages[0]);
  });

  it('should toggle message read state', () => {
    const serviceSpy = vi.spyOn(adminService, 'markContactMessageRead').mockReturnValue(of(undefined));
    component.toggleMessageRead(mockMessages[0]);
    expect(serviceSpy).toHaveBeenCalledWith('m1', true); // false toggled is true
  });

  it('should delete contact message successfully if confirmed', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    const serviceSpy = vi.spyOn(adminService, 'deleteContactMessage').mockReturnValue(of(undefined));
    const loadSpy = vi.spyOn(component, 'loadContactMessages');

    component.selectedMessage.set(mockMessages[0]);
    component.deleteMessage('m1');
    expect(serviceSpy).toHaveBeenCalledWith('m1');
    expect(component.selectedMessage()).toBeNull();
    expect(notificationService.success).toHaveBeenCalled();
    expect(loadSpy).toHaveBeenCalled();
  });

  it('should simulate quick reply successfully', () => {
    component.simulateReply();
    expect(notificationService.success).toHaveBeenCalledWith('Reply sent successfully! (Simulated)');
  });

  it('should gracefully handle API failure on loading users', () => {
    vi.spyOn(adminService, 'getBannedUsers').mockReturnValue(throwError(() => new Error('Banned Users API Error')));
    component.loadUsers();

    expect(component.usersLoading()).toBe(false);
    expect(component.usersError()).toBe('Banned Users API Error');
    expect(notificationService.error).toHaveBeenCalled();
  });

  it('should gracefully handle API failure on loading lessons', () => {
    vi.spyOn(adminService, 'getLessons').mockReturnValue(throwError(() => new Error('Lessons API Error')));
    component.loadLessons();

    expect(component.lessonsLoading()).toBe(false);
    expect(component.lessonsError()).toBe('Lessons API Error');
    expect(notificationService.error).toHaveBeenCalled();
  });

  it('should gracefully handle API failure on loading classes', () => {
    vi.spyOn(adminService, 'getClasses').mockReturnValue(throwError(() => new Error('Classes API Error')));
    component.loadClasses();

    expect(component.classesLoading()).toBe(false);
    expect(component.classesError()).toBe('Classes API Error');
    expect(notificationService.error).toHaveBeenCalled();
  });

  it('should gracefully handle API failure on loading inbox support messages', () => {
    vi.spyOn(adminService, 'getContactMessages').mockReturnValue(throwError(() => new Error('Inbox API Error')));
    component.loadContactMessages();

    expect(component.inboxLoading()).toBe(false);
    expect(component.inboxError()).toBe('Inbox API Error');
    expect(notificationService.error).toHaveBeenCalled();
  });

  // ── Edge Case & Error Coverage tests ─────────────────────────────────────
  it('should fallback to banned users list when getUsers fails but getBannedUsers succeeds', () => {
    vi.spyOn(adminService, 'getBannedUsers').mockReturnValue(of(mockBannedUsers));
    vi.spyOn(adminService, 'getUsers').mockReturnValue(throwError(() => new Error('GET Users failed')));
    component.loadUsers();

    expect(component.usersLoading()).toBe(false);
    expect(component.users().length).toBe(2); // mockBannedUsers has 2 items
    expect(component.users()[0].status).toBe('BANNED');
  });

  it('should gracefully handle API failure when performBan fails', () => {
    const serviceSpy = vi.spyOn(adminService, 'banUser').mockReturnValue(throwError(() => new Error('Ban failed')));

    component.banUser('u1');
    component.banReason.set('Spamming');
    component.performBan();

    expect(serviceSpy).toHaveBeenCalledWith('u1', 'Spamming');
    expect(notificationService.error).toHaveBeenCalledWith('Failed to ban user: Ban failed');
  });

  it('should not proceed with performBan if userId or reason is empty', () => {
    const serviceSpy = vi.spyOn(adminService, 'banUser');

    component.performBan();
    expect(serviceSpy).not.toHaveBeenCalled();
  });

  it('should gracefully handle API failure when unbanning a user', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    const serviceSpy = vi.spyOn(adminService, 'unbanUser').mockReturnValue(throwError(() => new Error('Unban failed')));

    const adminUser = {
      id: 'u2',
      name: 'Bob',
      email: 'bob@example.com',
      role: 'TEACHER' as const,
      status: 'BANNED' as const,
      raw: {}
    };

    component.unbanUser(adminUser);
    expect(serviceSpy).toHaveBeenCalledWith('u2');
    expect(notificationService.error).toHaveBeenCalledWith('Failed to restore user: HTTP status: undefined - Unban failed');
  });

  it('should not proceed if unban user confirmation is cancelled', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(false);
    const serviceSpy = vi.spyOn(adminService, 'unbanUser');

    const adminUser = {
      id: 'u2',
      name: 'Bob',
      email: 'bob@example.com',
      role: 'TEACHER' as const,
      status: 'BANNED' as const,
      raw: {}
    };

    component.unbanUser(adminUser);
    expect(serviceSpy).not.toHaveBeenCalled();
  });

  it('should gracefully handle API failure when deleting a user', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    const serviceSpy = vi.spyOn(adminService, 'deleteUser').mockReturnValue(throwError(() => new Error('Delete user failed')));

    component.deleteUser('u1');
    expect(serviceSpy).toHaveBeenCalledWith('u1');
    expect(notificationService.error).toHaveBeenCalledWith('Failed to delete user: Delete user failed');
  });

  it('should not proceed if deleteUser confirmation is cancelled', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(false);
    const serviceSpy = vi.spyOn(adminService, 'deleteUser');

    component.deleteUser('u1');
    expect(serviceSpy).not.toHaveBeenCalled();
  });

  it('should gracefully handle API failure when deleting a lesson', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    const serviceSpy = vi.spyOn(adminService, 'deleteLesson').mockReturnValue(throwError(() => new Error('Delete lesson failed')));

    component.deleteLesson('l1');
    expect(serviceSpy).toHaveBeenCalledWith('l1');
    expect(notificationService.error).toHaveBeenCalledWith('Failed to delete lesson: Delete lesson failed');
  });

  it('should not proceed if deleteLesson confirmation is cancelled', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(false);
    const serviceSpy = vi.spyOn(adminService, 'deleteLesson');

    component.deleteLesson('l1');
    expect(serviceSpy).not.toHaveBeenCalled();
  });

  it('should gracefully handle API failure when deleting a class', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    const serviceSpy = vi.spyOn(adminService, 'deleteClass').mockReturnValue(throwError(() => new Error('Delete class failed')));

    component.deleteClass('c1');
    expect(serviceSpy).toHaveBeenCalledWith('c1');
    expect(notificationService.error).toHaveBeenCalledWith('Failed to delete class: Delete class failed');
  });

  it('should not proceed if deleteClass confirmation is cancelled', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(false);
    const serviceSpy = vi.spyOn(adminService, 'deleteClass');

    component.deleteClass('c1');
    expect(serviceSpy).not.toHaveBeenCalled();
  });

  it('should gracefully handle API failure when marking message read state', () => {
    const serviceSpy = vi.spyOn(adminService, 'markContactMessageRead').mockReturnValue(throwError(() => new Error('Update state failed')));

    component.markMessageReadState('m1', true);
    expect(serviceSpy).toHaveBeenCalledWith('m1', true);
    expect(notificationService.error).toHaveBeenCalledWith('Failed to update message status: Update state failed');
  });

  it('should gracefully handle API failure when deleting a message', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    const serviceSpy = vi.spyOn(adminService, 'deleteContactMessage').mockReturnValue(throwError(() => new Error('Delete message failed')));

    component.deleteMessage('m1');
    expect(serviceSpy).toHaveBeenCalledWith('m1');
    expect(notificationService.error).toHaveBeenCalledWith('Failed to delete message: Delete message failed');
  });

  it('should not proceed if deleteMessage confirmation is cancelled', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(false);
    const serviceSpy = vi.spyOn(adminService, 'deleteContactMessage');

    component.deleteMessage('m1');
    expect(serviceSpy).not.toHaveBeenCalled();
  });

  // ── User Management Pagination and Key Filtering tests ────────────────────
  it('should filter out ID and sub fields case-insensitively in getObjectEntries', () => {
    const obj = {
      id: 'uuid-1',
      userId: 'uuid-2',
      keycloakId: 'uuid-3',
      sub: 'uuid-4',
      targetUserId: 'uuid-5',
      name: 'Alice',
      email: 'alice@example.com'
    };
    const entries = component.getObjectEntries(obj);
    expect(entries).toEqual([
      { key: 'name', value: 'Alice' },
      { key: 'email', value: 'alice@example.com' }
    ]);
  });

  it('should paginate users correctly in pages of 5', () => {
    fixture.detectChanges(); // Loads 5 users
    expect(component.totalUserPages()).toBe(1);
    expect(component.paginatedUsers().length).toBe(5);

    // Let's add more users to test pagination
    const extraUsers = Array.from({ length: 7 }, (_, i) => ({
      id: `u-extra-${i}`,
      name: `User Extra ${i}`,
      email: `extra${i}@example.com`,
      role: 'STUDENT' as const,
      status: 'ACTIVE' as const,
      raw: {}
    }));
    component.users.set([...component.users(), ...extraUsers]); // Total: 12 users
    expect(component.totalUserPages()).toBe(3); // 12 users -> ceil(12/5) = 3 pages

    // Page 1
    expect(component.userPage()).toBe(1);
    expect(component.paginatedUsers().length).toBe(5);
    expect(component.paginatedUsers()[0].name).toBe('Alice');

    // Go to Page 2
    component.nextUserPage();
    expect(component.userPage()).toBe(2);
    expect(component.paginatedUsers().length).toBe(5);
    expect(component.paginatedUsers()[0].name).toBe('User Extra 0');

    // Go to Page 3
    component.nextUserPage();
    expect(component.userPage()).toBe(3);
    expect(component.paginatedUsers().length).toBe(2);
    expect(component.paginatedUsers()[0].name).toBe('User Extra 5');

    // Go back to Page 2
    component.prevUserPage();
    expect(component.userPage()).toBe(2);
    expect(component.paginatedUsers().length).toBe(5);
  });
});
