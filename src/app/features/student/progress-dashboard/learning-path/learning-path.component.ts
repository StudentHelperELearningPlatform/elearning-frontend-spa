import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { BadgeComponent } from '../../../../shared/components/badge/badge.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

interface PathNode {
  id: string;
  title: string;
  status: 'LOCKED' | 'AVAILABLE' | 'COMPLETED';
  thumbnail: string;
  prerequisite?: string;
  score?: number;
}

@Component({
  selector: 'app-learning-path',
  standalone: true,
  imports: [CommonModule, RouterModule, CardComponent, BadgeComponent, ButtonComponent],
  template: `
    <div class="p-6 max-w-4xl mx-auto space-y-12 font-sans text-black">
      <!-- Header -->
      <div class="bg-white border-4 border-black rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h1 class="text-4xl font-black text-black tracking-tight uppercase italic">{{ pathTitle() }}</h1>
          <p class="text-gray-600 mt-2 text-lg font-bold">Master this subject step by step.</p>
          
          <div class="mt-6 flex items-center gap-4">
            <div class="flex-1 h-4 bg-gray-100 border-2 border-black rounded-full overflow-hidden w-64">
              <div class="h-full bg-[#0ABAB5] transition-all duration-500 border-r-2 border-black" [style.width.%]="overallProgress()"></div>
            </div>
            <span class="font-black text-xl">{{ completedCount() }}/{{ nodes().length }}</span>
          </div>
        </div>
        <img src="https://api.dicebear.com/7.x/bottts/svg?seed=path" alt="Mascot" class="w-24 h-24 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]" referrerpolicy="no-referrer" />
      </div>

      <!-- Path Timeline -->
      <div class="relative space-y-16 pb-20">
        <!-- Vertical Line -->
        <div class="absolute left-1/2 top-0 bottom-0 w-2 bg-black -translate-x-1/2 hidden md:block"></div>

        @for (node of nodes(); track node.id; let i = $index; let last = $last) {
          <div class="relative flex flex-col md:flex-row items-center gap-8" [ngClass]="{'md:flex-row-reverse': i % 2 !== 0}">
            
            <!-- Node Content -->
            <div class="flex-1 w-full md:w-auto">
              <app-card 
                [hoverable]="node.status !== 'LOCKED'" 
                class="transition-all"
                [ngClass]="{'opacity-60 grayscale': node.status === 'LOCKED', 'border-[#0ABAB5]': node.status === 'COMPLETED'}"
              >
                <div class="flex gap-4">
                  <div class="w-24 h-24 rounded-xl border-4 border-black overflow-hidden flex-shrink-0 bg-gray-100 relative">
                    <img [src]="node.thumbnail" [alt]="node.title + ' thumbnail'" class="w-full h-full object-cover" referrerpolicy="no-referrer">
                    @if (node.status === 'LOCKED') {
                      <div class="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span class="material-icons text-white">lock</span>
                      </div>
                    }
                  </div>
                  
                  <div class="flex-1">
                    <div class="flex justify-between items-start mb-2">
                      <h3 class="text-xl font-black leading-tight">{{ node.title }}</h3>
                      @if (node.status === 'COMPLETED') {
                        <span class="material-icons text-[#0ABAB5] font-black">check_circle</span>
                      }
                    </div>
                    
                    @if (node.status === 'LOCKED') {
                      <p class="text-xs font-bold text-red-500 uppercase tracking-tight">Prerequisite: {{ node.prerequisite }}</p>
                    } @else if (node.status === 'COMPLETED') {
                      <app-badge variant="primary">Score: {{ node.score }}%</app-badge>
                    } @else {
                      <app-badge variant="secondary">Available</app-badge>
                    }

                    <div class="mt-4 flex justify-end">
                      @if (node.status !== 'LOCKED') {
                        <app-button [routerLink]="['/student/lessons', node.id]" variant="primary" size="sm">
                          {{ node.status === 'COMPLETED' ? 'Review' : 'Start' }}
                        </app-button>
                      }
                    </div>
                  </div>
                </div>
              </app-card>
            </div>

            <!-- Connector Dot -->
            <div class="relative z-10 w-12 h-12 rounded-full border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-colors"
                 [ngClass]="{
                   'bg-[#0ABAB5] text-white': node.status === 'COMPLETED',
                   'bg-white text-black': node.status === 'AVAILABLE',
                   'bg-gray-200 text-gray-400': node.status === 'LOCKED'
                 }">
              <span class="font-black text-xl">{{ i + 1 }}</span>
            </div>

            <!-- Spacer for alignment -->
            <div class="flex-1 hidden md:block"></div>
          </div>
        }
      </div>
    </div>
  `
})
export class LearningPathComponent {
  private route = inject(ActivatedRoute);

  pathTitle = signal('Mathematics Mastery');
  nodes = signal<PathNode[]>([
    { 
      id: '1', 
      title: 'Introduction to Fractions', 
      status: 'COMPLETED', 
      thumbnail: 'https://api.dicebear.com/7.x/shapes/svg?seed=1',
      score: 95
    },
    { 
      id: '2', 
      title: 'Adding & Subtracting Fractions', 
      status: 'COMPLETED', 
      thumbnail: 'https://api.dicebear.com/7.x/shapes/svg?seed=2',
      score: 88
    },
    { 
      id: '3', 
      title: 'Multiplying Fractions', 
      status: 'AVAILABLE', 
      thumbnail: 'https://api.dicebear.com/7.x/shapes/svg?seed=3'
    },
    { 
      id: '4', 
      title: 'Dividing Fractions', 
      status: 'LOCKED', 
      thumbnail: 'https://api.dicebear.com/7.x/shapes/svg?seed=4',
      prerequisite: 'Multiplying Fractions'
    },
    { 
      id: '5', 
      title: 'Fraction Word Problems', 
      status: 'LOCKED', 
      thumbnail: 'https://api.dicebear.com/7.x/shapes/svg?seed=5',
      prerequisite: 'Dividing Fractions'
    }
  ]);

  completedCount() {
    return this.nodes().filter(n => n.status === 'COMPLETED').length;
  }

  overallProgress() {
    return (this.completedCount() / this.nodes().length) * 100;
  }
}
