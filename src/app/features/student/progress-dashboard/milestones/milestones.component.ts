import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { MilestonesStore, Milestone } from '../../store/milestones.store';
import { AuthStore } from '../../../auth/store/auth.store';

@Component({
  selector: 'app-milestones',
  standalone: true,
  imports: [CommonModule, CardComponent],
  template: `
    <div class="p-6 max-w-6xl mx-auto space-y-12 font-sans text-black">
      <!-- Header -->
      <div class="bg-white border-4 border-black rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h1 class="text-4xl font-black text-black tracking-tight uppercase italic">Your Achievements</h1>
          <p class="text-gray-600 mt-2 text-lg font-bold">Collect badges and celebrate your progress!</p>
        </div>
        <div class="flex items-center gap-4 bg-[#0ABAB5]/10 p-4 border-4 border-black rounded-2xl">
          <span class="material-icons text-4xl text-[#0ABAB5]">emoji_events</span>
          <div>
            <p class="text-xs font-black uppercase tracking-widest text-gray-500">Total Badges</p>
            <p class="text-3xl font-black">{{ store.earnedCount() }}/{{ store.totalCount() }}</p>
          </div>
        </div>
      </div>

      <!-- Categories Filter -->
      <div class="flex flex-wrap gap-4">
        @for (cat of categories; track cat) {
          <button
            (click)="selectedCategory.set(cat)"
            class="px-6 py-2 border-4 border-black rounded-xl font-black uppercase tracking-tight transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            [class.bg-[#0ABAB5]]="selectedCategory() === cat"
            [class.text-white]="selectedCategory() === cat"
            [class.bg-white]="selectedCategory() !== cat"
          >
            {{ cat }}
          </button>
        }
      </div>

      <!-- Loading skeleton -->
      @if (store.loading()) {
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          @for (i of [1, 2, 3, 4]; track i) {
            <div class="h-64 bg-gray-200 rounded-2xl border-4 border-gray-300 animate-pulse"></div>
          }
        </div>
      } @else {
        <!-- Badges Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          @for (m of filteredMilestones(); track m.id) {
            <app-card
              (click)="viewMilestoneDetail(m)"
              class="transition-all cursor-pointer hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px]"
              [class.opacity-60]="!m.earnedAt"
              [class.grayscale]="!m.earnedAt"
              [class.border-[#0ABAB5]]="!!m.earnedAt"
            >
              <div class="text-center py-4">
                <div
                  class="inline-flex items-center justify-center w-20 h-20 rounded-full border-4 border-black mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  [class.bg-[#0ABAB5]/10]="!!m.earnedAt"
                  [class.text-[#0ABAB5]]="!!m.earnedAt"
                  [class.bg-gray-100]="!m.earnedAt"
                  [class.text-gray-400]="!m.earnedAt"
                >
                  <span class="material-icons text-4xl">{{ m.icon || 'emoji_events' }}</span>
                </div>

                <h3 class="text-xl font-black mb-2">{{ m.title }}</h3>
                <p class="text-sm font-bold text-gray-600 mb-4">{{ m.description }}</p>

                @if (m.earnedAt) {
                  <div class="pt-4 border-t-2 border-black/5">
                    <p class="text-xs font-black text-[#0ABAB5] uppercase tracking-widest">
                      Earned on {{ m.earnedAt | date: 'mediumDate' }}
                    </p>
                  </div>
                } @else if (m.goal) {
                  <div class="space-y-2">
                    <div class="h-3 bg-gray-100 border-2 border-black rounded-full overflow-hidden">
                      <div class="h-full bg-gray-400" [style.width.%]="((m.progress ?? 0) / m.goal) * 100"></div>
                    </div>
                    <p class="text-xs font-black text-gray-400 uppercase tracking-widest">
                      {{ m.progress ?? 0 }}/{{ m.goal }}
                    </p>
                  </div>
                }
              </div>
            </app-card>
          } @empty {
            <p class="col-span-full text-center text-gray-500 font-bold py-8">
              No achievements yet — keep learning to earn badges!
            </p>
          }
        </div>
      }

      <!-- Milestone Detail Modal -->
      @if (selectedBadge()) {
        <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div class="bg-white border-4 border-black rounded-3xl p-8 max-w-lg w-full shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative animate-in fade-in zoom-in-95 duration-200">
            <button
              (click)="closeModal()"
              class="absolute top-4 right-4 w-10 h-10 border-4 border-black rounded-xl flex items-center justify-center bg-white hover:bg-gray-100 font-black text-xl transition-all shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px]"
            >
              ✕
            </button>

            @if (store.detailLoading()) {
              <div class="py-12 flex flex-col items-center justify-center space-y-4">
                <div class="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
                <p class="font-bold text-gray-500">Loading details...</p>
              </div>
            } @else {
              @if (store.selectedMilestone(); as detail) {
                <div class="text-center space-y-6">
                  <div
                    class="inline-flex items-center justify-center w-24 h-24 rounded-full border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    [class.bg-[#0ABAB5]/10]="!!detail.earnedAt"
                    [class.text-[#0ABAB5]]="!!detail.earnedAt"
                    [class.bg-gray-100]="!detail.earnedAt"
                    [class.text-gray-400]="!detail.earnedAt"
                  >
                    <span class="material-icons text-5xl">{{ detail.icon || 'emoji_events' }}</span>
                  </div>

                  <div>
                    <span class="px-4 py-1.5 border-2 border-black rounded-full text-xs font-black uppercase bg-gray-100">
                      {{ detail.category }}
                    </span>
                    <h2 class="text-3xl font-black mt-4">{{ detail.title }}</h2>
                  </div>

                  <p class="text-base font-bold text-gray-600 px-4">{{ detail.description }}</p>

                  @if (detail.earnedAt) {
                    <div class="bg-green-50 border-4 border-black rounded-2xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <p class="text-xs font-black uppercase text-gray-500 tracking-wider">Date Achieved</p>
                      <p class="text-lg font-black text-green-600 mt-1">
                        {{ detail.earnedAt | date: 'longDate' }}
                      </p>
                    </div>
                  } @else if (detail.goal) {
                    <div class="space-y-2 px-4">
                      <p class="text-xs font-black text-gray-500 uppercase tracking-widest text-left">Progress</p>
                      <div class="h-6 bg-gray-100 border-4 border-black rounded-xl overflow-hidden relative flex items-center justify-center">
                        <div class="absolute inset-0 bg-[#0ABAB5] transition-all duration-500 animate-pulse" [style.width.%]="((detail.progress ?? 0) / detail.goal) * 100"></div>
                        <span class="relative z-10 text-xs font-black text-black">
                          {{ detail.progress ?? 0 }} / {{ detail.goal }}
                        </span>
                      </div>
                    </div>
                  }

                  <div class="pt-4">
                    <button
                      (click)="closeModal()"
                      class="px-8 py-3 bg-[#0ABAB5] text-white border-4 border-black rounded-2xl font-black uppercase tracking-widest shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                    >
                      Awesome!
                    </button>
                  </div>
                </div>
              }
            }
          </div>
        </div>
      }
    </div>
  `,
})
export class MilestonesComponent implements OnInit {
  readonly store = inject(MilestonesStore);
  private readonly authStore = inject(AuthStore);

  categories = ['ALL', 'learning', 'streak', 'mastery', 'social'];
  selectedCategory = signal('ALL');
  selectedBadge = signal<Milestone | null>(null);

  filteredMilestones = computed(() => {
    const cat = this.selectedCategory();
    return cat === 'ALL'
      ? this.store.milestones()
      : this.store.milestones().filter((m) => m.category === cat);
  });

  ngOnInit() {
    this.store.loadMilestones();
  }

  viewMilestoneDetail(badge: Milestone) {
    this.selectedBadge.set(badge);
    this.store.loadMilestoneDetail(badge.id);
  }

  closeModal() {
    this.selectedBadge.set(null);
  }
}
