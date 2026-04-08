import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressStore } from '../store/progress.store';
import { AuthStore } from '../../auth/store/auth.store';
import { SkeletonComponent } from '../../../shared/components/skeleton/skeleton.component';

@Component({
  selector: 'app-progress-dashboard',
  standalone: true,
  imports: [CommonModule, SkeletonComponent],
  template: `
    <div class="p-6 max-w-7xl mx-auto space-y-6">
      <!-- Welcome Card -->
      <div class="bg-white border-2 border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        @if (progressStore.loading()) {
          <app-skeleton height="2rem" className="w-1/3 mb-2" />
          <app-skeleton height="1rem" className="w-1/2" />
        } @else {
          <h1 class="text-2xl font-bold text-black">Good morning, Student!</h1>
          <p class="text-gray-600 mt-2">Ready to learn something new today?</p>
        }
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Streak Widget -->
        <div class="bg-white border-2 border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center space-x-4">
          @if (progressStore.loading()) {
            <app-skeleton width="4rem" height="4rem" className="rounded-full" />
            <div class="space-y-2 flex-1">
              <app-skeleton height="1.25rem" />
              <app-skeleton height="1rem" className="w-2/3" />
            </div>
          } @else {
            <div class="w-16 h-16 bg-[var(--color-primary)] rounded-full flex items-center justify-center border-2 border-black">
              <span class="material-icons text-white text-3xl">local_fire_department</span>
            </div>
            <div>
              <h3 class="text-lg font-bold text-black">{{ progressStore.activeStreak() }} Day Streak</h3>
              <p class="text-sm text-gray-600">Keep it going!</p>
            </div>
          }
        </div>

        <!-- Overall Progress -->
        <div class="bg-white border-2 border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center space-x-4">
          @if (progressStore.loading()) {
            <app-skeleton width="4rem" height="4rem" className="rounded-full" />
            <div class="space-y-2 flex-1">
              <app-skeleton height="1.25rem" />
              <app-skeleton height="1rem" className="w-2/3" />
            </div>
          } @else {
            <div class="w-16 h-16 rounded-full border-4 border-[var(--color-primary)] flex items-center justify-center">
              <span class="font-bold text-black">{{ progressStore.overallProgress() }}%</span>
            </div>
            <div>
              <h3 class="text-lg font-bold text-black">Overall Progress</h3>
              <p class="text-sm text-gray-600">12 of 48 lessons</p>
            </div>
          }
        </div>

        <!-- Continue Learning -->
        <div class="bg-white border-2 border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          @if (progressStore.loading()) {
            <app-skeleton height="1.5rem" className="mb-2" />
            <app-skeleton height="1rem" className="mb-4 w-3/4" />
            <app-skeleton height="2.5rem" />
          } @else {
            <h3 class="text-lg font-bold text-black mb-2">Continue Learning</h3>
            <p class="text-sm font-medium text-gray-800 mb-4">Introduction to Fractions</p>
            <button class="w-full py-2 bg-[var(--color-primary)] text-white font-bold rounded border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all">
              Continue
            </button>
          }
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="bg-white border-2 border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <h3 class="text-xl font-bold text-black mb-4">Recent Activity</h3>
        <ul class="space-y-4">
          @if (progressStore.loading()) {
            @for (i of [1, 2, 3]; track i) {
              <li class="flex items-center space-x-4 border-b-2 border-black pb-4 last:border-0 last:pb-0">
                <app-skeleton width="2.5rem" height="2.5rem" className="rounded-full" />
                <div class="space-y-2 flex-1">
                  <app-skeleton height="1rem" className="w-1/2" />
                  <app-skeleton height="0.75rem" className="w-1/4" />
                </div>
              </li>
            }
          } @else {
            @for (activity of progressStore.recentActivity(); track activity.id) {
              <li class="flex items-center space-x-4 border-b-2 border-black pb-4 last:border-0 last:pb-0">
                <div class="w-10 h-10 bg-[var(--color-primary)]/20 rounded-full flex items-center justify-center border-2 border-black">
                  <span class="material-icons text-[var(--color-primary)]">check_circle</span>
                </div>
                <div>
                  <p class="font-bold text-black">{{ activity.title }}</p>
                  <p class="text-xs text-gray-500">{{ activity.date | date:'short' }}</p>
                </div>
              </li>
            }
          }
        </ul>
      </div>
    </div>
  `
})
export class ProgressDashboardComponent implements OnInit {
  progressStore = inject(ProgressStore);
  authStore = inject(AuthStore);

  ngOnInit() {
    this.progressStore.loadDashboard();
  }
}

