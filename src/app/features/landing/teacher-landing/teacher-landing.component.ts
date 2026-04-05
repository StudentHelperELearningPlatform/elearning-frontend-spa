// src/app/features/landing/teacher-landing/teacher-landing.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { CardComponent } from '../../../shared/components/card/card.component';

@Component({
  selector: 'app-teacher-landing',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent, CardComponent],
  template: `
    <div class="min-h-screen bg-white font-sans text-black overflow-x-hidden">
      <!-- Navigation -->
      <nav class="flex items-center justify-between px-6 py-6 border-b-4 border-black sticky top-0 bg-white z-50">
        <div class="flex items-center gap-2 cursor-pointer" routerLink="/">
          <div class="w-10 h-10 bg-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
            <span class="material-icons text-white font-black">history_edu</span>
          </div>
          <span class="text-2xl font-black uppercase tracking-tighter italic">E-Tutor</span>
        </div>
        <app-button variant="primary" size="sm" (btnClick)="navigateToAuth()">
          Start Teaching
        </app-button>
      </nav>

      <!-- Hero Section -->
      <section class="px-6 py-20 bg-white border-b-4 border-black relative overflow-hidden">
        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div class="space-y-8">
            <span class="inline-block px-4 py-2 bg-[#0ABAB5] text-black font-black uppercase tracking-widest text-xs">For Teachers</span>
            <h1 class="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-none text-black drop-shadow-[4px_4px_0px_rgba(0,ABAB5,1)]">
              AI-Powered<br>Curriculum.
            </h1>
            <p class="text-2xl font-bold italic text-gray-500 max-w-lg">
              Save hours of planning. Generate lessons, quizzes, and analytics in seconds with our AI assistant.
            </p>
            <app-button variant="primary" size="lg" class="text-2xl px-12 py-6" (btnClick)="navigateToAuth()">
              Join as Teacher
            </app-button>
          </div>
          <div class="relative">
            <div class="absolute inset-0 bg-[#0ABAB5] translate-x-4 translate-y-4 -z-10 border-4 border-black rounded-3xl"></div>
            <div class="bg-white border-4 border-black rounded-3xl p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <img 
                src="https://api.dicebear.com/7.x/bottts/svg?seed=teacher-ai&backgroundColor=ffffff" 
                alt="Teacher AI Mascot" 
                class="w-full h-auto animate-pulse"
                referrerpolicy="no-referrer"
              >
            </div>
          </div>
        </div>
      </section>

      <!-- Features -->
      <section class="px-6 py-20 bg-black text-white border-b-4 border-black">
        <div class="max-w-7xl mx-auto space-y-20">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div class="space-y-6">
              <h2 class="text-4xl md:text-6xl font-black uppercase italic tracking-tight text-[#0ABAB5]">Smart Content</h2>
              <p class="text-xl font-bold text-gray-400 italic">Generate comprehensive lesson plans and interactive content that aligns with your curriculum goals instantly.</p>
              <ul class="space-y-4 font-black uppercase text-sm tracking-widest">
                <li class="flex items-center gap-3"><span class="material-icons text-[#0ABAB5]">auto_fix_high</span> Instant Lesson Plans</li>
                <li class="flex items-center gap-3"><span class="material-icons text-[#0ABAB5]">auto_fix_high</span> Dynamic Quiz Generation</li>
                <li class="flex items-center gap-3"><span class="material-icons text-[#0ABAB5]">auto_fix_high</span> Custom Media Integration</li>
              </ul>
            </div>
            <div>
              <div class="bg-white border-4 border-black rounded-3xl p-8 shadow-[12px_12px_0px_0px_rgba(0,ABAB5,1)]">
                <img src="https://api.dicebear.com/7.x/shapes/svg?seed=content-gen" alt="Content Generation" class="w-full h-auto" referrerpolicy="no-referrer">
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div class="order-2 md:order-1">
              <div class="bg-white border-4 border-black rounded-3xl p-8 shadow-[12px_12px_0px_0px_rgba(0,ABAB5,1)]">
                <img src="https://api.dicebear.com/7.x/shapes/svg?seed=analytics" alt="Class Analytics" class="w-full h-auto" referrerpolicy="no-referrer">
              </div>
            </div>
            <div class="space-y-6 order-1 md:order-2">
              <h2 class="text-4xl md:text-6xl font-black uppercase italic tracking-tight text-[#0ABAB5]">Deep Analytics</h2>
              <p class="text-xl font-bold text-gray-400 italic">Monitor class performance in real-time. Identify struggling students before they fall behind with AI-driven insights.</p>
              <ul class="space-y-4 font-black uppercase text-sm tracking-widest">
                <li class="flex items-center gap-3"><span class="material-icons text-[#0ABAB5]">trending_up</span> Performance Heatmaps</li>
                <li class="flex items-center gap-3"><span class="material-icons text-[#0ABAB5]">trending_up</span> Individual Skill Tracking</li>
                <li class="flex items-center gap-3"><span class="material-icons text-[#0ABAB5]">trending_up</span> Automated Grading</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="px-6 py-12 border-t-4 border-black bg-white">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div class="flex items-center gap-2 cursor-pointer" routerLink="/">
            <div class="w-8 h-8 bg-black border-2 border-black flex items-center justify-center">
              <span class="material-icons text-white text-sm">history_edu</span>
            </div>
            <span class="text-xl font-black uppercase tracking-tighter italic">E-Tutor</span>
          </div>
          <app-button variant="primary" (btnClick)="navigateToAuth()">Get Started</app-button>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class TeacherLandingComponent {
  private router = inject(Router);
  navigateToAuth() { this.router.navigate(['/auth/login']); }
}
