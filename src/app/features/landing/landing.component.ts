// src/app/features/landing/landing.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { CardComponent } from '../../shared/components/card/card.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent, CardComponent],
  template: `
    <div class="min-h-screen bg-white font-sans text-black overflow-x-hidden">
      <!-- Navigation -->
      <nav class="flex items-center justify-between px-6 py-6 border-b-4 border-black sticky top-0 bg-white z-50">
        <div class="flex items-center gap-2">
          <div class="w-10 h-10 bg-[var(--color-primary)] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
            <span class="material-icons text-white font-black">school</span>
          </div>
          <span class="text-2xl font-black uppercase tracking-tighter italic">E-Tutor</span>
        </div>
        <div class="hidden md:flex items-center gap-8 font-black uppercase text-sm tracking-widest">
          <a routerLink="/for-students" class="hover:text-[var(--color-primary)] transition-colors">Students</a>
          <a routerLink="/for-teachers" class="hover:text-[var(--color-primary)] transition-colors">Teachers</a>
          <a routerLink="/for-parents" class="hover:text-[var(--color-primary)] transition-colors">Parents</a>
        </div>
        <app-button variant="primary" size="sm" (btnClick)="navigateToAuth()">
          Signup / Login
        </app-button>
      </nav>

      <!-- Hero Section -->
      <section class="relative px-6 py-20 md:py-32 flex flex-col items-center text-center overflow-hidden border-b-4 border-black">
        <!-- Background Elements -->
        <div class="absolute top-10 left-10 w-24 h-24 bg-[var(--color-primary)]/20 border-4 border-black rounded-full -z-10 animate-bounce"></div>
        <div class="absolute bottom-10 right-10 w-32 h-32 bg-black/5 border-4 border-black rotate-12 -z-10"></div>
        <div class="absolute top-1/2 left-1/4 w-12 h-12 bg-[var(--color-primary)] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -z-10 animate-pulse"></div>

        <h1 class="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-none mb-8">
          Learn <span class="text-[var(--color-primary)] underline decoration-black underline-offset-8">Faster</span>.<br>
          Teach <span class="text-[var(--color-primary)] underline decoration-black underline-offset-8">Smarter</span>.
        </h1>
        <p class="text-xl md:text-2xl font-bold max-w-2xl mb-12 italic text-gray-600">
          The adaptive learning platform that connects students, teachers, and parents for a better educational journey.
        </p>
        <div class="flex flex-col sm:flex-row gap-6">
          <app-button variant="primary" size="lg" class="text-2xl px-12 py-6" (btnClick)="navigateToAuth()">
            Get Started Now
          </app-button>
          <app-button variant="secondary" size="lg" class="text-2xl px-12 py-6">
            View Demo
          </app-button>
        </div>

        <!-- Hero Illustration -->
        <div class="mt-20 relative group">
          <div class="absolute inset-0 bg-[var(--color-primary)] translate-x-4 translate-y-4 -z-10 border-4 border-black rounded-3xl group-hover:translate-x-6 group-hover:translate-y-6 transition-transform"></div>
          <div class="relative bg-white border-4 border-black rounded-3xl overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] max-w-4xl">
            <img 
              src="https://api.dicebear.com/7.x/shapes/svg?seed=education-ai&backgroundColor=ffffff" 
              alt="AI Education Illustration" 
              class="w-full h-auto p-8"
              referrerpolicy="no-referrer"
            >
            <!-- Floating 2D elements -->
            <div class="absolute top-4 right-4 animate-bounce">
              <span class="material-icons text-5xl text-[var(--color-primary)]">auto_awesome</span>
            </div>
            <div class="absolute bottom-10 left-10 animate-pulse">
              <span class="material-icons text-6xl text-black">psychology</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Grid -->
      <section class="px-6 py-20 bg-gray-50 border-b-4 border-black">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl md:text-6xl font-black uppercase italic tracking-tight mb-4">One Platform, Three Worlds</h2>
            <div class="h-2 w-48 bg-[var(--color-primary)] mx-auto border-2 border-black"></div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
            <!-- Students -->
            <div class="space-y-6 group cursor-pointer" routerLink="/for-students">
              <div class="w-20 h-20 bg-[var(--color-primary)] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center mb-8 group-hover:-translate-y-2 transition-transform">
                <span class="material-icons text-white text-4xl">school</span>
              </div>
              <h3 class="text-3xl font-black uppercase italic tracking-tight group-hover:text-[var(--color-primary)] transition-colors">For Students</h3>
              <p class="font-bold text-gray-500 italic">Personalized AI paths to master any subject.</p>
              <app-button variant="secondary" size="sm">Learn More</app-button>
            </div>

            <!-- Teachers -->
            <div class="space-y-6 group cursor-pointer" routerLink="/for-teachers">
              <div class="w-20 h-20 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center mb-8 group-hover:-translate-y-2 transition-transform">
                <span class="material-icons text-black text-4xl">history_edu</span>
              </div>
              <h3 class="text-3xl font-black uppercase italic tracking-tight group-hover:text-[var(--color-primary)] transition-colors">For Teachers</h3>
              <p class="font-bold text-gray-500 italic">Generate content in seconds with AI assistance.</p>
              <app-button variant="secondary" size="sm">Learn More</app-button>
            </div>

            <!-- Parents -->
            <div class="space-y-6 group cursor-pointer" routerLink="/for-parents">
              <div class="w-20 h-20 bg-black border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center mb-8 group-hover:-translate-y-2 transition-transform">
                <span class="material-icons text-white text-4xl">family_restroom</span>
              </div>
              <h3 class="text-3xl font-black uppercase italic tracking-tight group-hover:text-[var(--color-primary)] transition-colors">For Parents</h3>
              <p class="font-bold text-gray-500 italic">Real-time insights into your child's progress.</p>
              <app-button variant="secondary" size="sm">Learn More</app-button>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="px-6 py-20 bg-[var(--color-primary)] text-white text-center">
        <h2 class="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-12 text-black">
          Ready to transform education?
        </h2>
        <app-button variant="secondary" size="lg" class="text-3xl px-16 py-8 bg-white text-black hover:bg-black hover:text-white" (btnClick)="navigateToAuth()">
          Join the Platform
        </app-button>
      </section>

      <!-- Footer -->
      <footer class="px-6 py-12 border-t-4 border-black bg-white">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 bg-[var(--color-primary)] border-2 border-black flex items-center justify-center">
              <span class="material-icons text-white text-sm">school</span>
            </div>
            <span class="text-xl font-black uppercase tracking-tighter italic">E-Tutor</span>
          </div>
          <p class="font-bold text-gray-500">© 2026 E-Learning Adaptive Tutor. All rights reserved.</p>
          <div class="flex gap-6 font-black uppercase text-xs tracking-widest">
            <a href="#" class="hover:text-[var(--color-primary)]">Privacy</a>
            <a href="#" class="hover:text-[var(--color-primary)]">Terms</a>
            <a href="#" class="hover:text-[var(--color-primary)]">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    html {
      scroll-behavior: smooth;
    }
  `]
})
export class LandingComponent {
  private router = inject(Router);

  navigateToAuth() {
    this.router.navigate(['/auth/login']);
  }
}

