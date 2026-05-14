import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../../shared/components/card/card.component';

interface Milestone {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'LEARNING' | 'STREAKS' | 'MASTERY' | 'SOCIAL';
  earnedDate?: string;
  progress?: number;
  target?: number;
}

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
            <p class="text-3xl font-black">{{ earnedCount() }}/{{ milestones().length }}</p>
          </div>
        </div>
      </div>

      <!-- Categories Filter -->
      <div class="flex flex-wrap gap-4">
        @for (cat of categories; track cat) {
          <button 
            (click)="selectedCategory.set(cat)"
            class="px-6 py-2 border-4 border-black rounded-xl font-black uppercase tracking-tight transition-all"
            [ngClass]="selectedCategory() === cat ? 'bg-[#0ABAB5] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'bg-white hover:bg-gray-50'"
          >
            {{ cat }}
          </button>
        }
      </div>

      <!-- Badges Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        @for (m of filteredMilestones(); track m.id) {
          <app-card 
            class="transition-all"
            [ngClass]="{'opacity-60 grayscale': !m.earnedDate, 'border-[#0ABAB5] shadow-[#0ABAB5]/20': m.earnedDate}"
          >
            <div class="text-center py-4">
              <div class="inline-flex items-center justify-center w-20 h-20 rounded-full border-4 border-black mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                   [ngClass]="m.earnedDate ? 'bg-[#0ABAB5]/10 text-[#0ABAB5]' : 'bg-gray-100 text-gray-400'">
                <span class="material-icons text-4xl">{{ m.icon }}</span>
              </div>
              
              <h3 class="text-xl font-black mb-2">{{ m.title }}</h3>
              <p class="text-sm font-bold text-gray-600 mb-4">{{ m.description }}</p>
              
              @if (m.earnedDate) {
                <div class="pt-4 border-t-2 border-black/5">
                  <p class="text-xs font-black text-[#0ABAB5] uppercase tracking-widest">Earned on {{ m.earnedDate }}</p>
                </div>
              } @else {
                <div class="space-y-2">
                  <div class="h-3 bg-gray-100 border-2 border-black rounded-full overflow-hidden">
                    <div class="h-full bg-gray-400" [style.width.%]="(m.progress! / m.target!) * 100"></div>
                  </div>
                  <p class="text-xs font-black text-gray-400 uppercase tracking-widest">{{ m.progress }}/{{ m.target }}</p>
                </div>
              }
            </div>
          </app-card>
        }
      </div>
    </div>
  `
})
export class MilestonesComponent {
  categories = ['ALL', 'LEARNING', 'STREAKS', 'MASTERY', 'SOCIAL'];
  selectedCategory = signal('ALL');

  milestones = signal<Milestone[]>([
    { 
      id: '1', 
      title: 'First Lesson', 
      description: 'Complete your very first lesson.', 
      icon: 'auto_stories', 
      category: 'LEARNING',
      earnedDate: '2024-03-20'
    },
    { 
      id: '2', 
      title: '7-Day Streak', 
      description: 'Learn for 7 days in a row.', 
      icon: 'local_fire_department', 
      category: 'STREAKS',
      earnedDate: '2024-03-25'
    },
    { 
      id: '3', 
      title: 'Perfect Score', 
      description: 'Get 100% on any quiz.', 
      icon: 'star', 
      category: 'MASTERY',
      earnedDate: '2024-03-28'
    },
    { 
      id: '4', 
      title: 'Social Butterfly', 
      description: 'Link your account to a parent.', 
      icon: 'groups', 
      category: 'SOCIAL',
      earnedDate: '2024-03-15'
    },
    { 
      id: '5', 
      title: 'Knowledge Seeker', 
      description: 'Complete 10 lessons.', 
      icon: 'psychology', 
      category: 'LEARNING',
      progress: 4,
      target: 10
    },
    { 
      id: '6', 
      title: 'Streak Master', 
      description: 'Reach a 30-day streak.', 
      icon: 'workspace_premium', 
      category: 'STREAKS',
      progress: 12,
      target: 30
    },
    { 
      id: '7', 
      title: 'Subject Expert', 
      description: 'Master all lessons in one subject.', 
      icon: 'military_tech', 
      category: 'MASTERY',
      progress: 2,
      target: 5
    },
    { 
      id: '8', 
      title: 'Helpful Peer', 
      description: 'Share 5 lesson results.', 
      icon: 'share', 
      category: 'SOCIAL',
      progress: 1,
      target: 5
    }
  ]);

  filteredMilestones() {
    const cat = this.selectedCategory();
    if (cat === 'ALL') return this.milestones();
    return this.milestones().filter(m => m.category === cat);
  }

  earnedCount() {
    return this.milestones().filter(m => m.earnedDate).length;
  }
}
