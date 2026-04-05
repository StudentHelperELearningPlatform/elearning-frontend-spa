import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray, FormsModule } from '@angular/forms';
import { ContentStore, Question } from '../store/content.store';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../../core/services/notification.service';

interface GeneratedQuestion {
  text: string;
  type: string;
  difficulty: string;
  selected: boolean;
}

@Component({
  selector: 'app-quiz-builder',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ButtonComponent, CardComponent, ModalComponent],
  template: `
    <div class="p-6 max-w-4xl mx-auto space-y-8 font-sans text-black">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-4xl font-black tracking-tight uppercase italic">
          {{ isEdit ? 'Edit Quiz' : 'Create New Quiz' }}
        </h1>
        <div class="flex gap-4">
          <app-button variant="secondary" size="sm" (click)="router.navigate(['/teacher/content'])">
            Cancel
          </app-button>
          <app-button variant="primary" size="sm" (click)="showAiModal.set(true)">
            AI Generate <span class="material-icons ml-2 text-sm">auto_awesome</span>
          </app-button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Form -->
        <div class="lg:col-span-2 space-y-8">
          <app-card title="Quiz Details">
            <form [formGroup]="quizForm" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="title" class="block text-sm font-black uppercase tracking-tight mb-2">Quiz Title</label>
                  <input 
                    id="title" 
                    formControlName="title" 
                    class="w-full px-4 py-3 border-4 border-black rounded-xl focus:outline-none focus:bg-[#0ABAB5]/5 font-bold" 
                    placeholder="e.g. Fractions Mastery Test"
                  >
                </div>
                <div>
                  <label for="subject" class="block text-sm font-black uppercase tracking-tight mb-2">Subject</label>
                  <input 
                    id="subject" 
                    formControlName="subject" 
                    class="w-full px-4 py-3 border-4 border-black rounded-xl focus:outline-none focus:bg-[#0ABAB5]/5 font-bold" 
                    placeholder="e.g. Mathematics"
                  >
                </div>
              </div>
            </form>
          </app-card>

          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <h2 class="text-2xl font-black uppercase tracking-tight italic">Questions ({{ questions.length }})</h2>
              <app-button variant="secondary" size="sm" (click)="addQuestion()">
                Add Manually <span class="material-icons ml-2 text-sm">add</span>
              </app-button>
            </div>

            <div formArrayName="questions" class="space-y-6">
              @for (question of questions.controls; track question; let i = $index) {
                <div [formGroupName]="i" class="bg-white border-4 border-black rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative group">
                  <button (click)="removeQuestion(i)" class="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span class="material-icons">delete</span>
                  </button>

                  <div class="space-y-4">
                    <div class="flex gap-4">
                      <span class="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center font-black bg-gray-100">{{ i + 1 }}</span>
                      <input 
                        formControlName="text" 
                        class="flex-1 px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:bg-[#0ABAB5]/5 font-bold" 
                        placeholder="Enter your question..."
                      >
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 ml-12">
                      <div>
                        <label [for]="'type-' + i" class="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Question Type</label>
                        <select [id]="'type-' + i" formControlName="type" class="w-full px-3 py-2 border-2 border-black rounded-lg font-bold bg-white">
                          <option value="multiple-choice">Multiple Choice</option>
                          <option value="true-false">True/False</option>
                        </select>
                      </div>
                      <div>
                        <label [for]="'diff-' + i" class="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Difficulty</label>
                        <select [id]="'diff-' + i" formControlName="difficulty" class="w-full px-3 py-2 border-2 border-black rounded-lg font-bold bg-white">
                          <option value="EASY">Easy</option>
                          <option value="MEDIUM">Medium</option>
                          <option value="HARD">Hard</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>

            @if (questions.length === 0) {
              <div class="text-center py-12 border-4 border-dashed border-black rounded-2xl bg-gray-50">
                <span class="material-icons text-6xl text-gray-300 mb-4">quiz</span>
                <p class="text-xl font-black text-gray-400 uppercase tracking-tight">No questions yet</p>
                <p class="text-gray-400 font-bold mt-2 italic">Add questions manually or use AI to generate them.</p>
              </div>
            }
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-8">
          <app-card title="Quiz Settings">
            <div class="space-y-4">
              <div>
                <label for="status" class="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Status</label>
                <select id="status" [formControl]="quizForm.controls['status']" class="w-full px-4 py-3 border-4 border-black rounded-xl font-black bg-white">
                  <option value="DRAFT">Draft</option>
                  <option value="PUBLISHED">Published</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </div>
              <div class="pt-4 border-t-2 border-black/5">
                <app-button (click)="saveQuiz()" [disabled]="quizForm.invalid" variant="primary" class="w-full py-4 text-xl">
                  {{ isEdit ? 'Update Quiz' : 'Save Quiz' }}
                </app-button>
              </div>
            </div>
          </app-card>
        </div>
      </div>

      <!-- AI Generation Modal -->
      <app-modal 
        [isOpen]="showAiModal()" 
        title="AI Question Generator" 
        (closeModal)="showAiModal.set(false)"
        [showFooter]="!aiLoading()"
      >
        @if (aiLoading()) {
          <div class="text-center py-12 space-y-6">
            <div class="inline-flex items-center justify-center w-20 h-20 bg-[#0ABAB5]/10 rounded-full border-4 border-black animate-pulse">
              <span class="material-icons text-4xl text-[#0ABAB5] animate-spin">auto_awesome</span>
            </div>
            <h3 class="text-2xl font-black uppercase italic tracking-tight">AI is thinking...</h3>
            <p class="text-gray-500 font-bold italic">Generating high-quality questions for your quiz.</p>
          </div>
        } @else if (generatedQuestions().length > 0) {
          <div class="space-y-6">
            <p class="text-gray-600 font-bold">Review and select the questions you want to add.</p>
            <div class="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              @for (q of generatedQuestions(); track q.text) {
                <div class="p-4 border-4 border-black rounded-xl bg-white flex gap-4 items-start">
                  <input type="checkbox" [(ngModel)]="q.selected" class="mt-1 w-5 h-5 border-2 border-black rounded">
                  <div>
                    <p class="font-black text-sm">{{ q.text }}</p>
                    <span class="text-[10px] font-black uppercase tracking-widest text-[#0ABAB5]">{{ q.type }}</span>
                  </div>
                </div>
              }
            </div>
            <div class="flex justify-end gap-4">
              <app-button variant="secondary" (click)="generatedQuestions.set([])">Back</app-button>
              <app-button variant="primary" (click)="addSelectedQuestions()">Add Selected</app-button>
            </div>
          </div>
        } @else {
          <div class="space-y-6">
            <p class="text-gray-600 font-bold">Tell AI what topic or source text to use for generating questions.</p>
            <div>
              <label for="aiPrompt" class="block text-sm font-black uppercase tracking-tight mb-2">Topic or Content</label>
              <textarea 
                id="aiPrompt"
                [(ngModel)]="aiPrompt"
                class="w-full px-4 py-3 border-4 border-black rounded-xl focus:outline-none focus:bg-[#0ABAB5]/5 font-bold" 
                rows="5" 
                placeholder="e.g. Basic arithmetic with fractions, or paste a lesson summary here..."
              ></textarea>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label for="aiCount" class="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Count</label>
                <select id="aiCount" [(ngModel)]="aiCount" class="w-full px-4 py-2 border-2 border-black rounded-lg font-bold bg-white">
                  <option [value]="3">3 Questions</option>
                  <option [value]="5">5 Questions</option>
                  <option [value]="10">10 Questions</option>
                </select>
              </div>
              <div>
                <label for="aiDifficulty" class="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Difficulty</label>
                <select id="aiDifficulty" [(ngModel)]="aiDifficulty" class="w-full px-4 py-2 border-2 border-black rounded-lg font-bold bg-white">
                  <option value="EASY">Easy</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HARD">Hard</option>
                </select>
              </div>
            </div>
            <app-button variant="primary" class="w-full" (click)="generateWithAi()">
              Generate Questions <span class="material-icons ml-2">auto_awesome</span>
            </app-button>
          </div>
        }
      </app-modal>
    </div>
  `
})
export class QuizBuilderComponent implements OnInit {
  store = inject(ContentStore);
  fb = inject(FormBuilder);
  router = inject(Router);
  route = inject(ActivatedRoute);
  private notificationService = inject(NotificationService);
  
  isEdit = false;
  quizId: string | null = null;
  
  quizForm = this.fb.group({
    title: ['', Validators.required],
    subject: ['', Validators.required],
    status: ['DRAFT'],
    questions: this.fb.array([])
  });

  showAiModal = signal(false);
  aiLoading = signal(false);
  aiPrompt = '';
  aiCount = 5;
  aiDifficulty = 'MEDIUM';
  generatedQuestions = signal<GeneratedQuestion[]>([]);

  get questions() {
    return this.quizForm.get('questions') as FormArray;
  }

  addQuestion(data?: Partial<Question>) {
    this.questions.push(this.fb.group({
      text: [data?.text || '', Validators.required],
      type: [data?.type || 'multiple-choice'],
      difficulty: [data?.difficulty || 'MEDIUM']
    }));
  }

  removeQuestion(index: number) {
    this.questions.removeAt(index);
  }

  ngOnInit() {
    this.quizId = this.route.snapshot.paramMap.get('id');
    if (this.quizId) {
      this.isEdit = true;
      const quiz = this.store.quizzes().find(q => q.id === this.quizId);
      if (quiz) {
        this.quizForm.patchValue(quiz);
        if (quiz.questions) {
          quiz.questions.forEach((q: Question) => this.addQuestion(q));
        }
      }
    }
  }

  generateWithAi() {
    if (!this.aiPrompt) {
      this.notificationService.error('Please enter a topic or content.');
      return;
    }

    this.aiLoading.set(true);
    // Simulate AI generation
    setTimeout(() => {
      const mockQuestions = Array.from({ length: this.aiCount }).map((_, i) => ({
        text: `Generated Question ${i + 1} about ${this.aiPrompt.substring(0, 20)}...`,
        type: Math.random() > 0.5 ? 'multiple-choice' : 'true-false',
        difficulty: this.aiDifficulty,
        selected: true
      }));
      this.generatedQuestions.set(mockQuestions);
      this.aiLoading.set(false);
      this.notificationService.success('Questions generated successfully!');
    }, 2500);
  }

  addSelectedQuestions() {
    const selected = this.generatedQuestions().filter(q => q.selected);
    selected.forEach(q => {
      const question: Partial<Question> = {
        text: q.text,
        type: q.type as 'multiple-choice' | 'true-false',
        difficulty: q.difficulty as 'EASY' | 'MEDIUM' | 'HARD'
      };
      this.addQuestion(question);
    });
    this.showAiModal.set(false);
    this.generatedQuestions.set([]);
    this.aiPrompt = '';
    this.notificationService.success(`Added ${selected.length} questions to quiz.`);
  }

  saveQuiz() {
    if (this.quizForm.valid) {
      const formValue = this.quizForm.value;
      const quizData = {
        title: formValue.title ?? '',
        subject: formValue.subject ?? '',
        status: (formValue.status as 'PUBLISHED' | 'DRAFT') ?? 'DRAFT',
        questions: (formValue.questions as Question[]) || []
      };

      if (this.isEdit && this.quizId) {
        this.store.updateQuiz(this.quizId, quizData);
      } else {
        this.store.createQuiz(quizData);
      }
      this.router.navigate(['/teacher/content']);
    }
  }
}
