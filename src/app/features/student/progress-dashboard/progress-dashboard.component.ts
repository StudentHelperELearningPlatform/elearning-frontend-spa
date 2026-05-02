import { Component, inject, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ProgressStore, Activity } from '../store/progress.store';
import { AuthStore } from '../../auth/store/auth.store';
import { SkeletonComponent } from '../../../shared/components/skeleton/skeleton.component';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';
import { TimeAgoPipe } from '../../../shared/pipes/time-ago.pipe';
import { Knob } from 'primeng/knob';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-progress-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, SkeletonComponent, NgxEchartsDirective, TimeAgoPipe, Knob],
  providers: [
    provideEchartsCore({ echarts: () => import('echarts') })
  ],
  template: `
    <div class="p-6 max-w-7xl mx-auto space-y-6">
      <!-- Welcome Card -->
      <div class="bg-white border-2 border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between">
        <div>
          @if (progressStore.loading()) {
            <app-skeleton height="2rem" className="w-64 mb-2" />
            <app-skeleton height="1rem" className="w-48" />
          } @else {
            <h1 class="text-2xl font-bold text-black">{{ greeting }}, {{ (authStore.user()?.name || '').split(' ')[0] || 'Student' }}!</h1>
            <p class="text-gray-600 mt-2">{{ motivationalMessage() }}</p>
          }
        </div>
        @if (!progressStore.loading()) {
          <div class="w-16 h-16 bg-[#0ABAB5] text-white rounded-full flex items-center justify-center text-2xl font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            {{ (authStore.user()?.name || 'S')[0] | uppercase }}
          </div>
        }
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Streak Widget -->
        <div class="bg-white border-2 border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center space-x-4 transition-all"
             [ngClass]="{'ring-4 ring-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.6)]': progressStore.streak() >= 7}">
          @if (progressStore.loading()) {
            <app-skeleton width="4rem" height="4rem" className="rounded-full" />
            <div class="space-y-2 flex-1">
              <app-skeleton height="1.25rem" />
              <app-skeleton height="1rem" className="w-2/3" />
            </div>
          } @else {
            <div class="w-16 h-16 rounded-full flex items-center justify-center border-2 border-black"
                 [ngClass]="progressStore.streak() > 0 ? 'bg-orange-500' : 'bg-gray-200'">
              <span class="material-icons text-white text-3xl">local_fire_department</span>
            </div>
            <div class="flex-1">
              @if (progressStore.streak() > 0) {
                <h3 class="text-lg font-bold text-black">{{ progressStore.streak() }} day streak 🔥</h3>
                <p class="text-sm text-gray-600">Best: {{ progressStore.longestStreak() }} days</p>
              } @else {
                <h3 class="text-lg font-bold text-black">Start your streak today!</h3>
                <button routerLink="/student/lessons" class="mt-1 text-sm font-bold text-[#0ABAB5] hover:underline">Browse Lessons</button>
              }
            </div>
          }
        </div>

        <!-- Overall Progress -->
        <div class="bg-white border-2 border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center text-center">
          @if (progressStore.loading()) {
            <app-skeleton width="6rem" height="6rem" className="rounded-full mb-4" />
            <app-skeleton height="1rem" className="w-2/3" />
          } @else {
            <p-knob [(ngModel)]="overallProgressPercent" [readonly]="true" valueColor="#0ABAB5" [size]="100"></p-knob>
            <p class="text-sm text-gray-600 mt-2 font-medium">12 of 48 lessons completed</p>
            
            <div class="w-full mt-4 space-y-2 text-left">
              @for (subj of progressStore.subjectProgress(); track subj.subject) {
                <div class="flex items-center justify-between text-xs mb-1">
                  <span class="font-bold">{{ subj.subject }}</span>
                  <span>{{ subj.percent }}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-1.5 border border-black">
                  <div class="bg-[#0ABAB5] h-1.5 rounded-full" [style.width.%]="subj.percent"></div>
                </div>
              }
            </div>
          }
        </div>

        <!-- Continue Learning -->
        <div class="bg-white border-2 border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col">
          @if (progressStore.loading()) {
            <app-skeleton height="1.5rem" className="mb-2" />
            <app-skeleton height="4rem" className="mb-4" />
            <app-skeleton height="2.5rem" />
          } @else {
            @if (progressStore.continueLesson(); as lesson) {
              <h3 class="text-lg font-bold text-black mb-2 flex items-center">
                Continue Learning
              </h3>
              
              <div class="flex-1 flex items-center space-x-3 mb-4">
                <div class="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg border-2 border-black flex-shrink-0"></div>
                <div class="flex-1 min-w-0">
                  <span class="text-xs font-bold px-2 py-1 bg-gray-100 border border-black rounded-full uppercase tracking-wider">{{ lesson.subject }}</span>
                  <p class="text-sm font-bold text-black mt-1 leading-tight truncate">{{ lesson.title }}</p>
                </div>
              </div>
              
              <div class="w-full bg-gray-200 rounded-full h-2 border border-black mb-4">
                <div class="bg-[#0ABAB5] h-2 rounded-full" [style.width.%]="lesson.progressPercent"></div>
              </div>

              <button [routerLink]="['/student/lessons', lesson.id]" class="w-full py-2 bg-[#0ABAB5] text-white font-bold rounded border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all">
                Continue
              </button>
            } @else {
              <h3 class="text-lg font-bold text-black mb-2">Pick up where you left off</h3>
              <p class="text-sm text-gray-600 mb-4 flex-1">Explore your paths to find new challenges.</p>
              <button routerLink="/student/lessons" class="w-full py-2 bg-white text-black font-bold rounded border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all">
                Browse Lessons
              </button>
            }
          }
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Upcoming Quizzes -->
        <div class="bg-white border-2 border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col">
          <h3 class="text-xl font-bold text-black mb-4">Upcoming Quizzes</h3>
          @if (progressStore.loading()) {
            <app-skeleton height="3rem" className="mb-2" />
            <app-skeleton height="3rem" className="mb-2" />
          } @else if (progressStore.upcomingQuizzes().length > 0) {
            <ul class="space-y-3 flex-1">
              @for (quiz of progressStore.upcomingQuizzes(); track quiz.id) {
                <li class="flex items-center justify-between border-2 border-gray-200 p-3 rounded-lg hover:border-black transition-colors">
                  <div>
                    <p class="font-bold text-black text-sm">{{ quiz.title }}</p>
                    <p class="text-xs text-gray-500 font-medium">{{ quiz.subject }} &bull; {{ quiz.dueDate ? (quiz.dueDate | date:'shortDate') : 'No due date' }}</p>
                  </div>
                  <button [routerLink]="['/student/quizzes', quiz.id]" class="px-3 py-1 bg-black text-white text-xs font-bold rounded hover:bg-gray-800 transition-colors">
                    Take Quiz
                  </button>
                </li>
              }
            </ul>
          } @else {
            <div class="flex-1 flex items-center justify-center text-gray-500 italic">No upcoming quizzes.</div>
          }
        </div>

        <!-- Recent Activity -->
        <div class="bg-white border-2 border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col">
          <h3 class="text-xl font-bold text-black mb-4">Recent Activity</h3>
          @if (progressStore.loading()) {
            <ul class="space-y-4">
              @for (i of [1, 2, 3]; track i) {
                <li class="flex items-center space-x-4 border-b-2 border-gray-100 pb-4 last:border-0 last:pb-0">
                  <app-skeleton width="2.5rem" height="2.5rem" className="rounded-full" />
                  <div class="space-y-2 flex-1">
                    <app-skeleton height="1rem" className="w-1/2" />
                    <app-skeleton height="0.75rem" className="w-1/4" />
                  </div>
                </li>
              }
            </ul>
          } @else if (progressStore.recentActivity().length > 0) {
            <ul class="space-y-4 flex-1">
              @for (activity of progressStore.recentActivity().slice(0, 5); track activity.id) {
                <li class="flex items-center space-x-4 border-b-2 border-gray-100 pb-4 last:border-0 last:pb-0 cursor-pointer group" tabindex="0" (click)="navigateActivity(activity)" (keyup.enter)="navigateActivity(activity)">
                  <div class="w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors"
                       [ngClass]="{
                         'bg-blue-100 border-blue-500 text-blue-600 group-hover:bg-blue-200': activity.type === 'lesson',
                         'bg-green-100 border-green-500 text-green-600 group-hover:bg-green-200': activity.type === 'quiz',
                         'bg-yellow-100 border-yellow-500 text-yellow-600 group-hover:bg-yellow-200': activity.type === 'milestone'
                       }">
                    <span class="material-icons text-[20px]">
                      {{ activity.type === 'lesson' ? 'menu_book' : activity.type === 'quiz' ? 'check_circle' : 'star' }}
                    </span>
                  </div>
                  <div>
                    <p class="font-bold text-black text-sm group-hover:underline">{{ activity.title }}</p>
                    <p class="text-xs text-gray-500 font-medium">{{ activity.date | timeAgo }}</p>
                  </div>
                </li>
              }
            </ul>
          } @else {
            <div class="flex-1 flex items-center justify-center text-gray-500 italic">No recent activity yet.</div>
          }
        </div>
      </div>

      <!-- Skill Radar Chart -->
      <div class="bg-white border-2 border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <h3 class="text-xl font-bold text-black mb-4">Your Skill Levels</h3>
        @if (progressStore.loading()) {
          <div class="w-full h-[400px]">
            <app-skeleton width="100%" height="100%" className="rounded-xl" />
          </div>
        } @else {
          <div class="w-full h-[400px]">
            <div echarts [options]="chartOptions()" [autoResize]="true" class="h-full w-full"></div>
          </div>
        }
      </div>

    </div>
  `
})
export class ProgressDashboardComponent implements OnInit {
  progressStore = inject(ProgressStore);
  authStore = inject(AuthStore);
  router = inject(Router);

  motivationalMessage = signal('Keep up the great work!');
  messages = [
    "Keep up the great work!",
    "Every lesson brings you closer.",
    "Learning is a journey, enjoy it!",
    "Great things take time.",
    "You're doing amazing today!"
  ];

  overallProgressPercent = 45;

  get greeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }

  chartOptions = computed<EChartsOption>(() => {
    const skills = this.progressStore.skillLevels();
    return {
      tooltip: {
        trigger: 'item'
      },
      radar: {
        indicator: [
          { name: 'Math', max: 100 },
          { name: 'Science', max: 100 },
          { name: 'English', max: 100 },
          { name: 'History', max: 100 },
          { name: 'Geography', max: 100 }
        ],
        splitNumber: 5,
        axisName: {
          color: '#000',
          fontWeight: 'bold'
        }
      },
      series: [
        {
          name: 'Skills',
          type: 'radar',
          data: [
            {
              value: [
                skills['Math'] || 0,
                skills['Science'] || 0,
                skills['English'] || 0,
                skills['History'] || 0,
                skills['Geography'] || 0
              ],
              name: 'Proficiency',
              itemStyle: { color: '#0ABAB5' },
              areaStyle: { color: '#0ABAB5', opacity: 0.3 },
              lineStyle: { color: '#0ABAB5', width: 2 }
            }
          ]
        }
      ]
    };
  });

  ngOnInit() {
    this.progressStore.loadDashboard();
    
    const randomIndex = Math.floor(Math.random() * this.messages.length);
    this.motivationalMessage.set(this.messages[randomIndex]);
    
    // Sync overall progress if it comes from the store
    // this.overallProgressPercent = this.progressStore.overallProgress();
  }

  navigateActivity(activity: Activity) {
    if (!activity.targetId) return;
    if (activity.type === 'lesson') {
      this.router.navigate(['/student/lessons', activity.targetId]);
    } else if (activity.type === 'quiz') {
      this.router.navigate(['/student/quizzes', activity.targetId]);
    }
  }
}
