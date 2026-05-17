import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuestionsStore } from '../state/questions.store';
import { AddQuestionRequest } from '../../../shared/models/quiz.types';

export interface EditableQuestion {
  id: string;
  questionText: string;
  correctAnswer: string;
  options: { optionText: string; correct?: boolean }[];
}

@Component({
  selector: 'app-question-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [QuestionsStore],
  template: `
    <div class="p-1 sm:p-2">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div class="text-xl sm:text-2xl font-black text-black">
          {{ quizType === 'check' ? 'Check Quiz Questions' : 'Final Quiz Questions' }}
        </div>

        <div class="flex flex-col sm:flex-row w-full md:w-auto gap-3">
          <button
            (click)="startAdding()"
            [disabled]="isAdding() || editingId() !== null || store.isGeneratingAI()"
            class="w-full sm:w-auto justify-center bg-white text-black px-4 py-2 rounded-xl font-bold border-2 border-black hover:bg-gray-100 disabled:opacity-50 transition-all flex items-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none"
          >
            <span class="material-icons mr-1 text-[18px]">add</span> Add Manual
          </button>

          <button
            (click)="generateAI()"
            [disabled]="isAdding() || editingId() !== null || store.isGeneratingAI()"
            class="w-full sm:w-auto justify-center bg-[#0ABAB5] text-white px-4 py-2 rounded-xl font-bold border-2 border-black hover:bg-[#099994] disabled:opacity-50 transition-all flex items-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none"
          >
            @if (store.isGeneratingAI()) {
              <span class="material-icons animate-spin mr-2 text-[18px]">autorenew</span>
              Generating...
            } @else {
              <span class="material-icons mr-2 text-[18px]">auto_awesome</span> AI Generate
            }
          </button>
        </div>
      </div>

      @if (store.isLoading() && store.questions().length === 0) {
        <div class="flex justify-center p-8">
          <span class="material-icons animate-spin text-4xl text-black">autorenew</span>
        </div>
      }

      <div class="space-y-4">
        @for (q of store.questions(); track q.id; let i = $index) {
          @if (editingId() !== q.id) {
            <div
              class="bg-white border-2 border-black rounded-2xl p-4 sm:p-5 flex flex-col lg:flex-row gap-4 justify-between items-start shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              <div class="flex-1 w-full">
                <div class="flex flex-wrap items-center gap-2 mb-3">
                  <span
                    class="text-xs font-black bg-gray-100 px-3 border-2 border-black rounded-md flex items-center justify-center h-7 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                  >
                    Q{{ i + 1 }}
                  </span>

                  @if (q.status === 'PENDING') {
                    <span
                      class="text-[10px] font-black uppercase tracking-wide bg-[#FFD700] text-black px-2 border-2 border-black flex items-center h-7 rounded-md shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <span class="material-icons text-[14px] mr-1">pending</span> Needs Approval
                    </span>
                  } @else if (q.status === 'APPROVED') {
                    <span
                      class="text-[10px] font-black uppercase tracking-wide bg-[#00FF7F] text-black px-2 border-2 border-black flex items-center h-7 rounded-md shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <span class="material-icons text-[14px] mr-1">verified</span> Approved
                    </span>
                  }
                </div>

                <p class="font-black text-base sm:text-lg text-black mb-3 break-words">
                  {{ q.questionText }}
                </p>

                <div class="space-y-2 sm:space-y-1">
                  @for (opt of q.options; track opt.id) {
                    <div
                      class="flex items-start sm:items-center text-sm"
                      [class.text-[#0ABAB5]]="opt.correct || opt.optionText === q.correctAnswer"
                      [class.font-black]="opt.correct || opt.optionText === q.correctAnswer"
                      [class.font-medium]="!(opt.correct || opt.optionText === q.correctAnswer)"
                    >
                      <span
                        class="material-icons text-[18px] mr-2 shrink-0 mt-0.5 sm:mt-0"
                        [class.text-[#0ABAB5]]="opt.correct || opt.optionText === q.correctAnswer"
                        [class.text-gray-300]="!(opt.correct || opt.optionText === q.correctAnswer)"
                      >
                        {{
                          opt.correct || opt.optionText === q.correctAnswer
                            ? 'check_circle'
                            : 'radio_button_unchecked'
                        }}
                      </span>
                      <span class="break-words">{{ opt.optionText }}</span>
                    </div>
                  }
                </div>
              </div>

              <div
                class="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0 mt-3 lg:mt-0 w-full lg:w-auto"
              >
                @if (q.status === 'PENDING') {
                  <button
                    (click)="toggleApprove(q.id)"
                    class="w-full lg:w-auto px-3 py-2 border-2 border-black bg-[#00FF7F] text-black text-sm font-black uppercase rounded-xl hover:bg-[#00E673] flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all"
                  >
                    <span class="material-icons mr-1 text-[18px]">thumb_up</span> Approve
                  </button>
                }
                <button
                  (click)="startEditing(q)"
                  class="w-full lg:w-auto px-3 py-2 border-2 border-black bg-white text-black text-sm font-black uppercase rounded-xl hover:bg-gray-100 flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all"
                >
                  <span class="material-icons mr-1 text-[18px]">edit</span> Edit
                </button>

                <button
                  (click)="deleteQuestion(q.id)"
                  class="w-full lg:w-auto px-3 py-2 border-2 border-black bg-black text-white text-sm font-black uppercase rounded-xl hover:bg-gray-800 flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all"
                >
                  <span class="material-icons mr-1 text-[18px]">delete</span> Delete
                </button>
              </div>
            </div>
          } @else {
            <ng-container *ngTemplateOutlet="editorForm"></ng-container>
          }
        }

        @if (!store.isLoading() && store.questions().length === 0 && !isAdding() && !editingId()) {
          <div
            class="text-center p-6 sm:p-10 border-2 border-dashed border-gray-400 rounded-2xl bg-gray-50"
          >
            <div
              class="w-16 h-16 bg-white border-2 border-black rounded-xl flex items-center justify-center mx-auto mb-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              <span class="material-icons text-4xl text-[#0ABAB5]">quiz</span>
            </div>
            <p class="text-black font-black text-xl mb-1">No questions yet</p>
            <p class="text-gray-600 font-bold text-sm">
              Add one manually or let AI generate them from your text blocks.
            </p>
          </div>
        }
      </div>

      @if (isAdding()) {
        <ng-container *ngTemplateOutlet="editorForm"></ng-container>
      }
    </div>

    <ng-template #editorForm>
      <div
        class="bg-gray-50 border-2 border-black rounded-2xl p-4 sm:p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        [class.mt-8]="isAdding()"
      >
        <div class="font-black text-lg sm:text-xl text-black mb-6 flex items-center">
          <span class="material-icons mr-2 text-[#0ABAB5] text-2xl">edit_note</span>
          {{ editingId() ? 'Edit Question' : 'Add New Question' }}
        </div>

        <label class="block mb-5">
          <span class="text-xs font-black text-black block mb-2 uppercase tracking-wider"
            >Question Text <span class="text-[#0ABAB5]">*</span></span
          >
          <textarea
            [(ngModel)]="newQuestionText"
            rows="3"
            class="w-full px-3 py-2 border-2 border-black rounded-xl font-bold text-sm sm:text-base resize-none focus:ring-2 focus:ring-[#0ABAB5]/30 outline-none transition-all"
            placeholder="e.g. What is the capital of France?"
          ></textarea>
        </label>

        <div class="mb-6">
          <span class="text-xs font-black text-black block mb-3 uppercase tracking-wider"
            >Options & Correct Answer <span class="text-[#0ABAB5]">*</span></span
          >
          <div class="space-y-3">
            @for (opt of newOptions(); track $index; let i = $index) {
              <div class="flex items-center gap-2">
                <input
                  type="radio"
                  name="correctAnswerGroup"
                  [checked]="opt.isCorrect"
                  (change)="setCorrectOption(i)"
                  class="w-5 h-5 text-[#0ABAB5] border-2 border-black focus:ring-[#0ABAB5] cursor-pointer shrink-0"
                  title="Mark as correct answer"
                />
                <input
                  type="text"
                  [(ngModel)]="opt.text"
                  class="flex-1 min-w-[100px] px-3 py-2 border-2 border-black rounded-xl font-bold text-sm focus:ring-2 focus:ring-[#0ABAB5]/30 outline-none transition-all"
                  [placeholder]="'Option ' + (i + 1)"
                />

                @if (newOptions().length > 2) {
                  <button
                    (click)="removeOption(i)"
                    class="w-10 h-10 sm:w-11 sm:h-11 shrink-0 flex items-center justify-center text-white bg-black border-2 border-black rounded-xl hover:bg-gray-800 transition-all"
                  >
                    <span class="material-icons text-[20px]">close</span>
                  </button>
                }
              </div>
            }
          </div>

          @if (newOptions().length < 5) {
            <button
              (click)="addOption()"
              class="mt-4 text-xs font-black text-black hover:text-[#0ABAB5] flex items-center uppercase tracking-wide transition-colors"
            >
              <span class="material-icons text-lg mr-1">add_circle</span> Add another option
            </button>
          }
        </div>

        <div
          class="flex flex-col sm:flex-row justify-end gap-3 mt-6 pt-5 border-t-2 border-black w-full"
        >
          <button
            (click)="cancelForm()"
            class="w-full sm:w-auto px-6 py-3 sm:py-2 font-black text-black uppercase tracking-wide hover:bg-gray-200 border-2 border-transparent hover:border-black rounded-xl transition-all text-sm"
          >
            Cancel
          </button>
          <button
            (click)="submitQuestion()"
            class="w-full sm:w-auto justify-center flex items-center px-6 py-3 sm:py-2 bg-[#0ABAB5] text-white font-black uppercase tracking-wide border-2 border-black rounded-xl hover:bg-[#099994] transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none text-sm"
          >
            {{ editingId() ? 'Update Question' : 'Save Question' }}
          </button>
        </div>
      </div>
    </ng-template>
  `,
})
export class QuestionManagerComponent implements OnInit {
  @Input({ required: true }) quizType!: 'check' | 'final';
  @Input({ required: true }) parentId!: string;

  protected readonly store = inject(QuestionsStore);

  isAdding = signal(false);
  editingId = signal<string | null>(null);
  newQuestionText = signal('');
  newOptions = signal<{ text: string; isCorrect: boolean }[]>([
    { text: '', isCorrect: true },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
  ]);

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

  startAdding() {
    this.editingId.set(null);
    this.resetForm();
    this.isAdding.set(true);
  }

  startEditing(question: EditableQuestion) {
    this.isAdding.set(false);
    this.editingId.set(question.id);
    this.newQuestionText.set(question.questionText);

    const mappedOptions = question.options.map((o) => ({
      text: o.optionText,
      isCorrect: o.correct || o.optionText === question.correctAnswer,
    }));

    while (mappedOptions.length < 2) mappedOptions.push({ text: '', isCorrect: false });
    this.newOptions.set(mappedOptions);
  }

  setCorrectOption(index: number) {
    this.newOptions.update((opts) => opts.map((opt, i) => ({ ...opt, isCorrect: i === index })));
  }

  addOption() {
    this.newOptions.update((opts) => [...opts, { text: '', isCorrect: false }]);
  }

  removeOption(index: number) {
    this.newOptions.update((opts) => opts.filter((_, i) => i !== index));
  }

  cancelForm() {
    this.isAdding.set(false);
    this.editingId.set(null);
    this.resetForm();
  }

  submitQuestion() {
    const qText = this.newQuestionText().trim();
    const options = this.newOptions().filter((o) => o.text.trim() !== '');
    const correctOpt = options.find((o) => o.isCorrect);

    if (!qText) {
      alert('Please enter a question text.');
      return;
    }
    if (options.length < 2) {
      alert('Please provide at least 2 valid options.');
      return;
    }
    if (!correctOpt) {
      alert('Please select a correct answer.');
      return;
    }

    const payload: AddQuestionRequest = {
      questionText: qText,
      questionType: 'MULTIPLE_CHOICE',
      correctAnswer: correctOpt.text.trim(),
      options: options.map((o) => ({
        optionText: o.text.trim(),
        correct: o.isCorrect,
      })),
    };

    const editId = this.editingId();
    if (editId) {
      this.store.updateQuestion({ id: editId, payload });
    } else {
      this.store.addQuestion({ type: this.quizType, parentId: this.parentId, payload });
    }

    this.cancelForm();
  }

  private resetForm() {
    this.newQuestionText.set('');
    this.newOptions.set([
      { text: '', isCorrect: true },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
    ]);
  }
}
