import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from 'src/app/core/services/notification.service';

export interface Milestone {
  id: string;
  title: string;
  description: string;
  category: 'learning' | 'streak' | 'mastery' | 'social';
  earnedAt?: string;
  progress?: number;
  goal?: number;
}

@Injectable({
  providedIn: 'root'
})
export class MilestonesStore {

  private readonly http = inject(HttpClient);
  private readonly notification = inject(NotificationService);

  // STATE
  milestones = signal<Milestone[]>([]);
  loading = signal<boolean>(false);

  private readonly lastEarnedIds = new Set<string>();

  // COMPUTED
  earnedMilestones = computed(() =>
    this.milestones().filter(m => m.earnedAt)
  );

  lockedMilestones = computed(() =>
    this.milestones().filter(m => !m.earnedAt)
  );

  earnedCount = computed(() =>
    this.earnedMilestones().length
  );

  totalCount = computed(() =>
    this.milestones().length
  );

  // METHOD
  loadMilestones(studentId: string) {
    this.loading.set(true);

    this.http
      .get<Milestone[]>(`/api/students/${studentId}/milestones`)
      .subscribe({
        next: (data) => {
          this.milestones.set(data);

          // detect NEW earned badges
          data.forEach(m => {
            if (m.earnedAt && !this.lastEarnedIds.has(m.id)) {
              this.lastEarnedIds.add(m.id);

              this.notification.success(
                `🏆 You earned a new badge: ${m.title}!`
              );
            }
          });

          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
        }
      });
  }
}