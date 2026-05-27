import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { USER_PLATFORM_API_URL } from '@core/tokens/api.token';
import { NotificationService } from '../../../core/services/notification.service';

export interface Milestone {
  id: string;
  title: string;
  description: string;
  category: 'learning' | 'streak' | 'mastery' | 'social';
  icon?: string;
  earnedAt?: string;
  progress?: number;
  goal?: number;
  lessonId?: string;
}

interface BackendMilestone {
  id: string | number;
  nume?: string;
  title?: string;
  descriere?: string;
  description?: string;
  type?: string;
  category?: Milestone['category'];
  achievedAt?: string;
  earnedAt?: string;
  progress?: number;
  goal?: number;
  lessonId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MilestonesStore {

  private readonly http = inject(HttpClient);
  private readonly notification = inject(NotificationService);

  milestones = signal<Milestone[]>([]);
  loading = signal(false);

  // New signals for detail endpoint
  selectedMilestone = signal<Milestone | null>(null);
  detailLoading = signal(false);

  private readonly lastEarnedIds = new Set<string>();

  earnedMilestones = computed(() =>
    this.milestones().filter(m => !!m.earnedAt)
  );

  lockedMilestones = computed(() =>
    this.milestones().filter(m => !m.earnedAt)
  );

  earnedCount = computed(() => this.earnedMilestones().length);
  totalCount = computed(() => this.milestones().length);

  private readonly userPlatformApi = inject(USER_PLATFORM_API_URL);

  private getIconForCategory(category?: string): string {
    const cat = (category || '').toLowerCase().trim();
    if (cat === 'learning') return 'school';
    if (cat === 'streak') return 'local_fire_department';
    if (cat === 'mastery') return 'military_tech';
    if (cat === 'social') return 'people';
    return 'emoji_events';
  }

  loadMilestones() {
    this.loading.set(true);

    this.http
      .get<BackendMilestone[]>(`${this.userPlatformApi}/progress/me/milestones`)
      .subscribe({
        next: (data) => {
          const mapped: Milestone[] = (data || []).map((m: BackendMilestone & { uuid?: string, milestoneId?: string }) => ({
            id: String(m.id || m.uuid || m.milestoneId || ''),
            title: m.nume || m.title || '',
            description: m.descriere || m.description || '',
            category: (m.type || m.category || 'learning') as Milestone['category'],
            earnedAt: m.achievedAt || m.earnedAt || undefined,
            icon: this.getIconForCategory(m.type || m.category),
            progress: m.progress ?? undefined,
            goal: m.goal ?? undefined,
            lessonId: m.lessonId ?? undefined,
          }));

          this.milestones.set(mapped);

          mapped.forEach((m) => {
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
          this.notification.error('Failed to load milestones');
        }
      });
  }

  loadMilestoneDetail(milestoneId: string) {
    if (!milestoneId || milestoneId === 'undefined' || milestoneId === 'null') {
      this.notification.error('Invalid milestone ID');
      return;
    }

    this.detailLoading.set(true);
    this.selectedMilestone.set(null);

    this.http
      .get<BackendMilestone>(`${this.userPlatformApi}/progress/me/milestones/${milestoneId}`)
      .subscribe({
        next: (data) => {
          if (data) {
            const mapped: Milestone = {
              id: String(data.id),
              title: data.nume || data.title || '',
              description: data.descriere || data.description || '',
              category: (data.type || data.category || 'learning') as Milestone['category'],
              earnedAt: data.achievedAt || data.earnedAt || undefined,
              icon: this.getIconForCategory(data.type || data.category),
              progress: data.progress ?? undefined,
              goal: data.goal ?? undefined,
              lessonId: data.lessonId ?? undefined,
            };
            this.selectedMilestone.set(mapped);
          }
          this.detailLoading.set(false);
        },
        error: () => {
          this.detailLoading.set(false);
          this.notification.error('Failed to load milestone detail');
        }
      });
  }
}
