import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { MilestonesStore } from '../../store/milestones.store';
import { AuthStore } from '../../../auth/store/auth.store';

@Component({
  selector: 'app-milestones',
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
            class="px-6 py-2 border-4 border-black rounded-xl font-black uppercase tracking-tight transition-all"
            [class.bg-[#0ABAB5]]="selectedCategory() === cat"
            [class.text-white]="selectedCategory() === cat"
            [class.shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]]="selectedCategory() === cat"
            [class.bg-white]="selectedCategory() !== cat"
            [class.hover:bg-gray-50]="selectedCategory() !== cat"
          >
            {{ cat }}
          </button>
        }
      </div>

      @if (store.loading()) {
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          @for (i of [1,2,3,4]; track i) {
            <div class="h-64 bg-gray-200 rounded-2xl border-4 border-black animate-pulse"></div>
          }
        </div>
      } @else if (filteredMilestones().length === 0) {
        <div class="bg-white border-4 border-black rounded-3xl p-12 text-center">
          <span class="material-icons text-6xl text-gray-300 mb-4">emoji_events</span>
          <h3 class="text-2xl font-black mb-2">No badges yet</h3>
          <p class="text-gray-600 font-bold">Keep learning to earn your first achievement!</p>
        </div>
      } @else {
        <!-- Badges Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          @for (m of filteredMilestones(); track m.id) {
            <app-card
              class="transition-all"
              [class.opacity-60]="!m.earnedAt"
              [class.grayscale]="!m.earnedAt"
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
                      <div
                        class="h-full bg-gray-400"
                        [style.width.%]="((m.progress ?? 0) / m.goal) * 100"
                      ></div>
                    </div>
                    <p class="text-xs font-black text-gray-400 uppercase tracking-widest">
                      {{ m.progress ?? 0 }}/{{ m.goal }}
                    </p>
                  </div>
                }
              </div>
            </app-card>
          }
        </div>
      }
    </div>
  `,
})
export class MilestonesComponent implements OnInit {
  store = inject(MilestonesStore);
  private authStore = inject(AuthStore);

  categories = ['ALL', 'LEARNING', 'STREAK', 'MASTERY', 'SOCIAL'];
  selectedCategory = signal('ALL');

  filteredMilestones = computed(() => {
    const cat = this.selectedCategory();
    const milestones = this.store.milestones();
    if (cat === 'ALL') return milestones;
    return milestones.filter((m) => m.category.toUpperCase() === cat);
  });

  ngOnInit() {
    const studentId = this.authStore.user()?.id;
    if (studentId) {
      this.store.loadMilestones(studentId);
    }
  }
}
