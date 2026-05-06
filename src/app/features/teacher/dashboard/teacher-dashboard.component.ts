import { ChangeDetectionStrategy, Component, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContentStore, RecentActivityItem } from '../state/content.store';
import { AuthStore } from '../../auth/store/auth.store';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ErrorStateComponent } from '../../../shared/components/error-state/error-state.component';

@Component({
  selector: 'app-teacher-dashboard',
  imports: [CommonModule, RouterModule, ButtonComponent, CardComponent, ErrorStateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      <div
        class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
      >
        <div class="flex items-center space-x-4">
          <div
            class="w-16 h-16 bg-[#0ABAB5]/20 rounded-2xl border-4 border-black flex items-center justify-center"
            aria-hidden="true"
          >
            <span class="material-icons text-[#0ABAB5] text-3xl">school</span>
          </div>
          <div>
            <h1 class="text-3xl font-black text-black tracking-tight">Teacher Dashboard</h1>
            <p class="text-gray-600 font-medium">
              Welcome back@if (teacherName()) {<span>, {{ teacherName() }}</span>}
            </p>
          </div>
        </div>
      </div>

      @if (store.error()) {
        <app-error-state
          title="Could not load dashboard"
          [message]="store.error() || 'Unknown error'"
          retryLabel="Retry"
          (retryClick)="reload()"
        />
      }

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <app-card class="block" header="My Content">
          @if (store.loading()) {
            <div
              class="h-32 bg-gray-200 rounded-2xl animate-pulse"
              role="status"
              aria-label="Loading content summary"
            ></div>
          } @else {
            <div class="space-y-3" data-testid="content-summary">
              <p class="font-bold text-lg">
                {{ store.totalLessonsCount() }} lessons
                <span class="text-gray-600 font-medium">
                  ({{ store.publishedLessonsCount() }} published,
                  {{ store.draftLessonsCount() }} drafts)
                </span>
              </p>
              <p class="font-bold text-lg">{{ store.totalQuizzesCount() }} quizzes</p>
            </div>
          }
        </app-card>

        <app-card class="block" header="Quick Actions">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <app-button variant="primary" icon="add_circle" routerLink="/teacher/lessons/new">
              Create Lesson
            </app-button>
            <app-button variant="secondary" icon="add_task" routerLink="/teacher/quizzes/new">
              Create Quiz
            </app-button>
            <app-button variant="secondary" icon="insights" routerLink="/teacher/analytics">
              View Analytics
            </app-button>
            <app-button variant="secondary" icon="menu_book" routerLink="/teacher/lessons">
              All Lessons
            </app-button>
          </div>
        </app-card>

        <app-card class="block" header="Recent Activity">
          @if (store.loading()) {
            <div
              class="h-48 bg-gray-200 rounded-2xl animate-pulse"
              role="status"
              aria-label="Loading recent activity"
            ></div>
          } @else if (recentFive().length === 0) {
            <div class="text-gray-600 font-medium">No recent activity yet.</div>
          } @else {
            <ul class="space-y-2" data-testid="recent-activity">
              @for (item of recentFive(); track item.id) {
                <li
                  class="flex items-start gap-3 p-3 rounded-xl border-2 border-black bg-gray-50"
                >
                  <span class="material-icons text-[#0ABAB5]" aria-hidden="true">{{
                    activityIcon(item.type)
                  }}</span>
                  <div class="flex-1">
                    <p class="font-bold">
                      <span class="capitalize">{{ item.type }}</span>
                      &middot; {{ item.contentTitle }}
                    </p>
                    <p class="text-sm text-gray-600">
                      {{ item.contentType }} &middot;
                      <time [attr.datetime]="item.timestamp.toISOString()">
                        {{ formatTimestamp(item.timestamp) }}
                      </time>
                    </p>
                  </div>
                </li>
              }
            </ul>
          }
        </app-card>

        <app-card class="block" header="Classes">
          @if (store.loading()) {
            <div
              class="h-48 bg-gray-200 rounded-2xl animate-pulse"
              role="status"
              aria-label="Loading classes"
            ></div>
          } @else if (store.classes().length === 0) {
            <div class="text-gray-600 font-medium">You don't have any classes yet.</div>
          } @else {
            <ul class="space-y-2" data-testid="class-overview">
              @for (cls of store.classes(); track cls.id) {
                <li
                  class="flex items-center justify-between p-3 rounded-xl border-2 border-black bg-gray-50"
                >
                  <div>
                    <p class="font-bold">{{ cls.name }}</p>
                    <p class="text-sm text-gray-600">{{ cls.studentCount }} students</p>
                  </div>
                  <div class="text-right">
                    <p class="text-sm font-bold">Avg Progress</p>
                    <p class="text-lg font-black text-[#0ABAB5]">{{ cls.averageProgress }}%</p>
                  </div>
                </li>
              }
            </ul>
          }
        </app-card>
      </div>
    </div>
  `,
})
export class TeacherDashboardComponent implements OnInit {
  protected readonly store = inject(ContentStore);
  private readonly auth = inject(AuthStore);

  protected readonly teacherName = computed(() => this.auth.user()?.name ?? '');
  protected readonly recentFive = computed<RecentActivityItem[]>(() =>
    this.store.recentActivity().slice(0, 5),
  );

  ngOnInit(): void {
    this.reload();
  }

  reload(): void {
    const teacherId = this.auth.user()?.id ?? 'me';
    this.store.loadDashboard(teacherId);
  }

  activityIcon(type: string): string {
    switch (type) {
      case 'created':
        return 'add_circle';
      case 'published':
        return 'cloud_upload';
      case 'archived':
        return 'archive';
      case 'deleted':
        return 'delete';
      default:
        return 'edit';
    }
  }

  formatTimestamp(d: Date): string {
    const diffMs = Date.now() - d.getTime();
    const minutes = Math.round(diffMs / 60000);
    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.round(minutes / 60);
    if (hours < 24) return `${hours} h ago`;
    const days = Math.round(hours / 24);
    return `${days} d ago`;
  }
}
