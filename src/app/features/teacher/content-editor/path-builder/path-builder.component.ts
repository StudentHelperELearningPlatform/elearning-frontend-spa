import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ContentStore, ContentItem } from '../../state/content.store';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { BadgeComponent } from '../../../../shared/components/badge/badge.component';
import { NotificationService } from '../../../../core/services/notification.service';

interface PathNode {
  id: string;
  lessonId: string;
  title: string;
  prerequisiteId?: string;
  order: number;
}

@Component({
  selector: 'app-path-builder',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, CardComponent, BadgeComponent],
  template: `
    <div class="p-6 max-w-6xl mx-auto space-y-8 font-sans text-black">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-4xl font-black tracking-tight uppercase italic">Learning Path Builder</h1>
          <p class="text-gray-600 font-bold mt-2 italic">Design the journey for your students.</p>
        </div>
        <div class="flex gap-4">
          <app-button variant="secondary" (click)="router.navigate(['/teacher/content'])">Cancel</app-button>
          <app-button variant="primary" (click)="savePath()">Save Path <span class="material-icons ml-2">save</span></app-button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Path Structure -->
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-white border-4 border-black rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
            <h2 class="text-2xl font-black uppercase tracking-tight mb-8">Path Sequence</h2>
            
            @if (pathNodes().length === 0) {
              <div class="text-center py-12 border-4 border-dashed border-black rounded-2xl bg-gray-50">
                <span class="material-icons text-6xl text-gray-300 mb-4">route</span>
                <p class="text-xl font-black text-gray-400 uppercase tracking-tight">Your path is empty</p>
                <p class="text-gray-400 font-bold mt-2 italic">Add lessons from the library to start building.</p>
              </div>
            } @else {
              <div class="space-y-4 relative">
                <!-- Vertical Line -->
                <div class="absolute left-6 top-0 bottom-0 w-1 bg-black/10"></div>

                @for (node of pathNodes(); track node.id; let i = $index) {
                  <div class="relative flex items-center gap-6 group">
                    <!-- Order Dot -->
                    <div class="z-10 w-12 h-12 rounded-full border-4 border-black bg-white flex items-center justify-center font-black text-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:bg-[#0ABAB5] group-hover:text-white transition-colors">
                      {{ i + 1 }}
                    </div>

                    <!-- Node Card -->
                    <div class="flex-1 bg-white border-4 border-black rounded-2xl p-4 flex items-center justify-between shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-2 transition-transform">
                      <div>
                        <h3 class="font-black text-lg">{{ node.title }}</h3>
                        <div class="flex items-center gap-2 mt-1">
                          <span class="text-xs font-black uppercase tracking-widest text-gray-400">Prerequisite:</span>
                          @if (node.prerequisiteId) {
                            <app-badge variant="secondary" size="sm">{{ getLessonTitle(node.prerequisiteId) }}</app-badge>
                          } @else {
                            <span class="text-xs font-bold text-gray-400 italic">None</span>
                          }
                        </div>
                      </div>

                      <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button (click)="moveUp(i)" [disabled]="i === 0" class="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-30">
                          <span class="material-icons">arrow_upward</span>
                        </button>
                        <button (click)="moveDown(i)" [disabled]="i === pathNodes().length - 1" class="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-30">
                          <span class="material-icons">arrow_downward</span>
                        </button>
                        <button (click)="removeNode(i)" class="p-2 hover:bg-red-50 text-red-500 rounded-lg">
                          <span class="material-icons">delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                }
              </div>
            }
          </div>
        </div>

        <!-- Lesson Library -->
        <div class="space-y-6">
          <app-card title="Lesson Library">
            <div class="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              @for (lesson of store.lessons(); track lesson.id) {
                <div class="p-4 border-4 border-black rounded-xl bg-white hover:bg-[#0ABAB5]/5 transition-colors cursor-pointer group focus:outline-none focus:ring-4 focus:ring-[#0ABAB5]/50"
                     (click)="addLessonToPath(lesson)"
                     (keydown.enter)="addLessonToPath(lesson)"
                     (keydown.space)="addLessonToPath(lesson)"
                     tabindex="0"
                     role="button"
                     [attr.aria-label]="'Add ' + lesson.title + ' to path'">
                  <div class="flex justify-between items-start">
                    <h4 class="font-black text-sm leading-tight">{{ lesson.title }}</h4>
                    <span class="material-icons text-[#0ABAB5] opacity-0 group-hover:opacity-100 transition-opacity">add_circle</span>
                  </div>
                  <p class="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-2">{{ lesson.subject }}</p>
                </div>
              }
            </div>
          </app-card>

          <app-card title="Path Settings">
            <div class="space-y-4">
              <div>
                <label for="pathTitle" class="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Path Title</label>
                <input 
                  id="pathTitle"
                  type="text" 
                  [(ngModel)]="pathName"
                  class="w-full px-4 py-3 border-4 border-black rounded-xl font-bold focus:outline-none focus:bg-[#0ABAB5]/5"
                  placeholder="e.g. Algebra Fundamentals"
                >
              </div>
              <div class="p-4 bg-yellow-50 border-2 border-black rounded-xl border-dashed">
                <p class="text-xs font-bold text-gray-600 italic">
                  <span class="material-icons text-sm align-middle mr-1">info</span>
                  Prerequisites are automatically set to the previous lesson in the sequence by default.
                </p>
              </div>
            </div>
          </app-card>
        </div>
      </div>
    </div>
  `
})
export class PathBuilderComponent {
  store = inject(ContentStore);
  router = inject(Router);
  route = inject(ActivatedRoute);
  private notificationService = inject(NotificationService);

  pathName = '';
  pathNodes = signal<PathNode[]>([]);

  addLessonToPath(lesson: ContentItem) {
    const newNode: PathNode = {
      id: Math.random().toString(),
      lessonId: lesson.id,
      title: lesson.title,
      order: this.pathNodes().length,
      prerequisiteId: this.pathNodes().length > 0 ? this.pathNodes()[this.pathNodes().length - 1].lessonId : undefined
    };
    this.pathNodes.update(nodes => [...nodes, newNode]);
    this.notificationService.info(`Added "${lesson.title}" to path.`);
  }

  removeNode(index: number) {
    this.pathNodes.update(nodes => {
      const newNodes = [...nodes];
      newNodes.splice(index, 1);
      // Update prerequisites for subsequent nodes
      return newNodes.map((node, i) => ({
        ...node,
        order: i,
        prerequisiteId: i > 0 ? newNodes[i - 1].lessonId : undefined
      }));
    });
  }

  moveUp(index: number) {
    if (index === 0) return;
    this.pathNodes.update(nodes => {
      const newNodes = [...nodes];
      [newNodes[index - 1], newNodes[index]] = [newNodes[index], newNodes[index - 1]];
      return newNodes.map((node, i) => ({
        ...node,
        order: i,
        prerequisiteId: i > 0 ? newNodes[i - 1].lessonId : undefined
      }));
    });
  }

  moveDown(index: number) {
    if (index === this.pathNodes().length - 1) return;
    this.pathNodes.update(nodes => {
      const newNodes = [...nodes];
      [newNodes[index + 1], newNodes[index]] = [newNodes[index], newNodes[index + 1]];
      return newNodes.map((node, i) => ({
        ...node,
        order: i,
        prerequisiteId: i > 0 ? newNodes[i - 1].lessonId : undefined
      }));
    });
  }

  getLessonTitle(lessonId: string) {
    return this.store.lessons().find(l => l.id === lessonId)?.title || 'Unknown Lesson';
  }

  savePath() {
    if (!this.pathName) {
      this.notificationService.error('Please enter a path title.');
      return;
    }
    if (this.pathNodes().length === 0) {
      this.notificationService.error('Please add at least one lesson to the path.');
      return;
    }

    this.notificationService.success('Learning path saved successfully!');
    this.router.navigate(['/teacher/content']);
  }
}
