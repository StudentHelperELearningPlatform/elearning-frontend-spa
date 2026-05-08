// src/app/features/landing/student-landing/student-landing.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-student-landing',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent],
  template: `
    <div class="min-h-screen bg-white font-sans text-black overflow-x-hidden">
      <!-- Navigation -->
      <nav class="flex items-center justify-between px-6 py-6 border-b-4 border-black sticky top-0 bg-white z-50">
        <div class="flex items-center gap-2 cursor-pointer" routerLink="/">
          <div class="w-10 h-10 bg-[#0ABAB5] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
            <span class="material-icons text-white font-black">school</span>
          </div>
          <span class="text-2xl font-black uppercase tracking-tighter italic">E-Tutor</span>
        </div>
        <app-button variant="primary" size="sm" (btnClick)="navigateToAuth()">
          Start Learning
        </app-button>
      </nav>

      <!-- Hero Section -->
      <section class="px-6 py-20 bg-[#0ABAB5] border-b-4 border-black relative overflow-hidden">
        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div class="space-y-8">
            <span class="inline-block px-4 py-2 bg-black text-white font-black uppercase tracking-widest text-xs">For Students</span>
            <h1 class="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-none text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              Your AI<br>Study Buddy.
            </h1>
            <p class="text-2xl font-bold italic text-black max-w-lg">
              Master any subject with personalized learning paths that adapt to your pace and style.
            </p>
            <app-button variant="secondary" size="lg" class="text-2xl px-12 py-6 bg-white text-black" (btnClick)="navigateToAuth()">
              Create Free Account
            </app-button>
          </div>
          <div class="relative">
            <div class="absolute inset-0 bg-black translate-x-4 translate-y-4 -z-10 border-4 border-black rounded-3xl"></div>
            <div class="bg-white border-4 border-black rounded-3xl p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <img 
                src="https://api.dicebear.com/7.x/bottts/svg?seed=student-ai&backgroundColor=ffffff" 
                alt="Student AI Mascot" 
                class="w-full h-auto animate-bounce"
                referrerpolicy="no-referrer"
              >
            </div>
          </div>
        </div>
      </section>

      <!-- Features -->
      <section class="px-6 py-20 bg-white border-b-4 border-black">
        <div class="max-w-7xl mx-auto space-y-20">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div class="order-2 md:order-1">
              <div class="bg-white border-4 border-black rounded-3xl p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative group">
                <div class="absolute -top-6 -right-6 w-20 h-20 bg-[#0ABAB5] border-4 border-black rounded-full flex items-center justify-center animate-spin-slow">
                  <span class="material-icons text-white text-4xl">auto_awesome</span>
                </div>
                <img src="https://api.dicebear.com/7.x/shapes/svg?seed=path-1" alt="Learning Path" class="w-full h-auto opacity-80" referrerpolicy="no-referrer">
              </div>
            </div>
            <div class="space-y-6 order-1 md:order-2">
              <h2 class="text-4xl md:text-6xl font-black uppercase italic tracking-tight">Adaptive Paths</h2>
              <p class="text-xl font-bold text-gray-500 italic">No more "one size fits all". Our AI analyzes your strengths and weaknesses to build a path that's uniquely yours.</p>
              <ul class="space-y-4 font-black uppercase text-sm tracking-widest">
                <li class="flex items-center gap-3"><span class="material-icons text-[#0ABAB5]">bolt</span> Instant Feedback</li>
                <li class="flex items-center gap-3"><span class="material-icons text-[#0ABAB5]">bolt</span> Skill-Based Progression</li>
                <li class="flex items-center gap-3"><span class="material-icons text-[#0ABAB5]">bolt</span> Dynamic Difficulty</li>
              </ul>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div class="space-y-6">
              <h2 class="text-4xl md:text-6xl font-black uppercase italic tracking-tight">Gamified Learning</h2>
              <p class="text-xl font-bold text-gray-500 italic">Turn study time into play time. Earn badges, maintain streaks, and climb the leaderboard while mastering new skills.</p>
              <div class="flex gap-4">
                <div class="w-16 h-16 bg-yellow-400 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center rotate-12">
                  <span class="material-icons text-black">emoji_events</span>
                </div>
                <div class="w-16 h-16 bg-[#0ABAB5] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center -rotate-12">
                  <span class="material-icons text-white">local_fire_department</span>
                </div>
                <div class="w-16 h-16 bg-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center rotate-6">
                  <span class="material-icons text-white">military_tech</span>
                </div>
              </div>
            </div>
            <div>
              <div class="bg-white border-4 border-black rounded-3xl p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                <img src="https://api.dicebear.com/7.x/shapes/svg?seed=gamify" alt="Gamification" class="w-full h-auto" referrerpolicy="no-referrer">
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="px-6 py-12 border-t-4 border-black bg-white">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div class="flex items-center gap-2 cursor-pointer" routerLink="/">
            <div class="w-8 h-8 bg-[#0ABAB5] border-2 border-black flex items-center justify-center">
              <span class="material-icons text-white text-sm">school</span>
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
    .animate-spin-slow { animation: spin 8s linear infinite; }
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  `]
})
export class StudentLandingComponent {
  private router = inject(Router);
  navigateToAuth() { this.router.navigate(['/auth/login']); }
}
