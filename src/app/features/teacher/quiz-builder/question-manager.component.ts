// src/app/features/teacher/quiz-builder/question-manager.component.ts
import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuestionsStore } from '../state/questions.store';

@Component({
  selector: 'app-question-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [QuestionsStore], // Localized store provider
  template: `
    <div class="p-4 border-2 border-black rounded-xl bg-gray-50">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-black tracking-tight">
          {{ quizType === 'check' ? 'Check Quiz Questions' : 'Final Quiz Questions' }}
        </h3>
        <button
          (click)="generateAI()"
          [disabled]="store.isGeneratingAI()"
          class="bg-purple-600 text-white px-4 py-2 rounded-lg font-bold border-2 border-black hover:bg-purple-500 disabled:opacity-50 transition-all flex items-center"
        >
          @if (store.isGeneratingAI()) {
            <span class="material-icons animate-spin mr-2">autorenew</span> Generating...
          } @else {
            <span class="material-icons mr-2">auto_awesome</span> AI Generate
          }
        </button>
      </div>

      @if (store.isLoading()) {
        <div class="flex justify-center p-8">
          <span class="material-icons animate-spin text-3xl text-gray-500">autorenew</span>
        </div>
      } @else {
        <div class="space-y-4">
          @for (q of store.questions(); track q.id; let i = $index) {
            <div class="bg-white border-2 border-black rounded-xl p-4">
              <div class="flex justify-between items-start">
                <div class="flex-1">
                  <span
                    class="text-xs font-bold bg-gray-200 px-2 py-1 rounded border border-black mb-2 inline-block"
                    >Q{{ i + 1 }}</span
                  >
                  <p class="font-bold text-lg">{{ q.questionText }}</p>

                  <div class="mt-3 space-y-1">
                    @for (opt of q.options; track opt.id) {
                      <div
                        class="flex items-center text-sm"
                        [class.text-green-600]="opt.text === q.correctAnswer"
                        [class.font-bold]="opt.text === q.correctAnswer"
                      >
                        <span class="material-icons text-sm mr-1">
                          {{
                            opt.text === q.correctAnswer ? 'check_circle' : 'radio_button_unchecked'
                          }}
                        </span>
                        {{ opt.text }}
                      </div>
                    }
                  </div>
                </div>

                <div class="flex space-x-2">
                  <button
                    (click)="toggleApprove(q.id)"
                    class="p-2 border-2 border-black rounded-lg hover:bg-gray-100"
                    [title]="q.status === 'APPROVED' ? 'Approved' : 'Needs Approval'"
                  >
                    <span class="material-icons" [class.text-green-500]="q.status === 'APPROVED'"
                      >verified</span
                    >
                  </button>
                  <button
                    (click)="deleteQuestion(q.id)"
                    class="p-2 border-2 border-red-700 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    <span class="material-icons">delete</span>
                  </button>
                </div>
              </div>
            </div>
          }

          @if (store.questions().length === 0) {
            <div class="text-center p-8 border-2 border-dashed border-black/30 rounded-xl bg-white">
              <p class="text-gray-500 font-bold">No questions added yet.</p>
            </div>
          }
        </div>
      }
    </div>
  `,
})
export class QuestionManagerComponent implements OnInit {
  @Input({ required: true }) quizType!: 'check' | 'final';
  @Input({ required: true }) parentId!: string; // subcapitolId OR lessonId

  protected readonly store = inject(QuestionsStore);

  ngOnInit() {
    this.store.loadQuestions({ type: this.quizType, parentId: this.parentId });
  }

  generateAI() {
    this.store.generateAI({ type: this.quizType, parentId: this.parentId });
  }

  deleteQuestion(id: string) {
    if (confirm('Are you sure you want to delete this question?')) {
      this.store.deleteQuestion(id);
    }
  }

  toggleApprove(id: string) {
    this.store.approveQuestion(id);
  }
}
