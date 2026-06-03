import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CardComponent } from '@shared/components/card/card.component';
import { BadgeComponent } from '@shared/components/badge/badge.component';
import { ButtonComponent } from '@shared/components/button/button.component';
import { EmptyStateComponent } from '@shared/components/empty-state/empty-state.component';
import { MyClassesStore } from '../store/my-classes.store';

@Component({
  selector: 'app-my-classes',
  imports: [
    CommonModule,
    RouterModule,
    CardComponent,
    BadgeComponent,
    ButtonComponent,
    EmptyStateComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-6 max-w-7xl mx-auto space-y-8">
      <div
        class="bg-white border-4 border-black rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div>
          <h1 class="text-4xl font-black text-black tracking-tight">My Classes</h1>
          <p class="text-gray-600 mt-2 text-lg font-medium">
            Every class you are enrolled in, all in one place.
          </p>
          @if (store.usingMockData()) {
            <p class="text-xs font-bold text-amber-700 mt-3 uppercase tracking-wide">
              Showing demo data
            </p>
          }
        </div>
        <img
          src="https://api.dicebear.com/7.x/bottts/svg?seed=classes"
          alt="Mascot"
          class="w-24 h-24 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]"
          referrerpolicy="no-referrer"
        />
      </div>

      @if (store.loading()) {
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (i of skeletonItems; track i) {
            <div class="bg-gray-200 animate-pulse h-72 rounded-3xl border-4 border-black"></div>
          }
        </div>
      } @else if (!store.hasClasses()) {
        <app-empty-state
          [title]="'You are not enrolled in any classes yet'"
          [description]="'Ask your teacher for a class code, or check back later for new invitations.'"
          [icon]="'groups'"
        ></app-empty-state>
      } @else {
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (cls of store.classes(); track cls.id) {
            <app-card [hoverable]="true" class="h-full flex flex-col transition-all duration-300">
              <div
                class="-mx-6 -mt-6 mb-6 h-40 bg-[#0ABAB5]/20 border-b-4 border-black flex items-center justify-center relative overflow-hidden"
              >
                <img
                  [src]="'https://api.dicebear.com/7.x/shapes/svg?seed=' + cls.id"
                  alt="Class cover"
                  class="absolute inset-0 w-full h-full object-cover opacity-50"
                  referrerpolicy="no-referrer"
                />
                <span
                  class="material-icons text-black text-6xl relative z-10 drop-shadow-[2px_2px_0px_rgba(255,255,255,1)]"
                >
                  school
                </span>
              </div>

              <div class="flex-1 flex flex-col">
                <div class="flex justify-between items-start mb-4">
                  @if (cls.code) {
                    <app-badge variant="primary">{{ cls.code }}</app-badge>
                  } @else {
                    <app-badge variant="secondary">Class</app-badge>
                  }
                  @if (cls.averageGrade !== undefined && cls.averageGrade !== null) {
                    <span
                      class="text-sm font-bold text-gray-700 bg-gray-100 px-2 py-1 rounded-lg border-2 border-black"
                    >
                      Avg {{ cls.averageGrade }}%
                    </span>
                  }
                </div>

                <h3 class="text-2xl font-black text-black mb-2 leading-tight">{{ cls.name }}</h3>

                @if (cls.description) {
                  <p class="text-sm font-medium text-gray-500 mb-6 line-clamp-3 flex-1 italic">
                    {{ cls.description }}
                  </p>
                } @else {
                  <div class="flex-1"></div>
                }

                <div class="flex flex-wrap gap-3 mb-6 text-sm font-bold text-gray-600">
                  <span class="flex items-center gap-1">
                    <span class="material-icons text-base">groups</span>
                    {{ cls.studentCount }} students
                  </span>
                  <span class="flex items-center gap-1">
                    <span class="material-icons text-base">menu_book</span>
                    {{ cls.lessonCount }} lessons
                  </span>
                </div>

                <div
                  class="flex justify-between items-center mt-auto pt-4 border-t-4 border-black/10"
                >
                  <span class="text-xs font-bold uppercase tracking-wide text-gray-500">
                    Joined {{ cls.createdAt | date: 'mediumDate' }}
                  </span>
                  <app-button variant="primary" size="sm" (btnClick)="openClass(cls.id)">View Class</app-button>
                </div>
              </div>
            </app-card>
          }
        </div>
      }
    </div>
  `,
})
export class MyClassesComponent implements OnInit {
  protected readonly store = inject(MyClassesStore);
  private readonly router = inject(Router);
  protected readonly skeletonItems = [1, 2, 3];

  ngOnInit(): void {
    this.store.loadMyClasses();
  }

  openClass(classId: string): void {
    this.router.navigate(['/student/dashboard'], { queryParams: { classId } });
  }
}
