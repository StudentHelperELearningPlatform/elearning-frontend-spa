import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormArray,
  FormsModule,
} from '@angular/forms';
import { ContentStore, Question } from '../state/content.store';
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

interface FormOption {
  text?: string;
}

interface FormQuestion {
  id?: string;
  text?: string;
  type?: string;
  difficulty?: string;
  correctAnswer?: string;
  options?: FormOption[];
}

@Component({
  selector: 'app-quiz-builder',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonComponent,
    CardComponent,
    ModalComponent,
  ],
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
        <div class="lg:col-span-2 space-y-8">
          <app-card title="Quiz Details">
            <form [formGroup]="quizForm" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="title" class="block text-sm font-black uppercase tracking-tight mb-2"
                    >Quiz Title</label
                  >
                  <input
                    id="title"
                    formControlName="title"
                    class="w-full px-4 py-3 border-4 border-black rounded-xl focus:outline-none focus:bg-[#0ABAB5]/5 font-bold"
                    placeholder="e.g. Fractions Mastery Test"
                  />
                </div>
                <div>
                  <label
                    for="subject"
                    class="block text-sm font-black uppercase tracking-tight mb-2"
                    >Subject</label
                  >
                  <input
                    id="subject"
                    formControlName="subject"
                    class="w-full px-4 py-3 border-4 border-black rounded-xl focus:outline-none focus:bg-[#0ABAB5]/5 font-bold"
                    placeholder="e.g. Mathematics"
                  />
                </div>
              </div>
            </form>
          </app-card>

          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <h2 class="text-2xl font-black uppercase tracking-tight italic">
                Questions ({{ questions.length }})
              </h2>
              <app-button variant="secondary" size="sm" (click)="addQuestion()">
                Add Manually <span class="material-icons ml-2 text-sm">add</span>
              </app-button>
            </div>

            <div [formGroup]="quizForm">
              <div formArrayName="questions" class="space-y-6">
                @for (question of questions.controls; track question; let i = $index) {
                  <div
                    [formGroupName]="i"
                    class="bg-white border-4 border-black rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative group"
                  >
                    <button
                      (click)="removeQuestion(i)"
                      class="absolute top-4 right-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <span class="material-icons">delete</span>
                    </button>

                    <div class="space-y-4">
                      <div class="flex gap-4">
                        <span
                          class="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center font-black bg-gray-100"
                          >{{ i + 1 }}</span
                        >
                        <input
                          formControlName="text"
                          class="flex-1 px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:bg-[#0ABAB5]/5 font-bold"
                          placeholder="Enter your question..."
                        />
                      </div>

                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 ml-12">
                        <div>
                          <label
                            [for]="'type-' + i"
                            class="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1"
                            >Question Type</label
                          >
                          <select
                            [id]="'type-' + i"
                            formControlName="type"
                            (change)="onTypeChange(i)"
                            class="w-full px-3 py-2 border-2 border-black rounded-lg font-bold bg-white"
                          >
                            <option value="multiple-choice">Multiple Choice</option>
                            <option value="true-false">True/False</option>
                          </select>
                        </div>
                        <div>
                          <label
                            [for]="'diff-' + i"
                            class="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1"
                            >Difficulty</label
                          >
                          <select
                            [id]="'diff-' + i"
                            formControlName="difficulty"
                            class="w-full px-3 py-2 border-2 border-black rounded-lg font-bold bg-white"
                          >
                            <option value="EASY">Easy</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="HARD">Hard</option>
                          </select>
                        </div>
                      </div>

                      <!-- Options & Answers Section -->
                      <div class="ml-12 mt-4 pt-4 border-t-2 border-dashed border-gray-200 space-y-4">
                        <span class="block text-xs font-black uppercase tracking-wider text-black">
                          Options & Correct Answer <span class="text-[#0ABAB5]">*</span>
                        </span>

                        @if (question.get('type')?.value === 'true-false') {
                          <div class="flex gap-6 mt-2">
                            <label class="flex items-center gap-2 cursor-pointer font-bold">
                              <input
                                type="radio"
                                [name]="'correct-' + i"
                                value="0"
                                [checked]="question.get('correctAnswer')?.value === '0'"
                                (change)="setCorrectAnswer(i, '0')"
                                class="w-5 h-5 text-[#0ABAB5] border-2 border-black focus:ring-[#0ABAB5]"
                              />
                              True
                            </label>
                            <label class="flex items-center gap-2 cursor-pointer font-bold">
                              <input
                                type="radio"
                                [name]="'correct-' + i"
                                value="1"
                                [checked]="question.get('correctAnswer')?.value === '1'"
                                (change)="setCorrectAnswer(i, '1')"
                                class="w-5 h-5 text-[#0ABAB5] border-2 border-black focus:ring-[#0ABAB5]"
                              />
                              False
                            </label>
                          </div>
                        } @else {
                          <div formArrayName="options" class="space-y-3">
                            @for (opt of getOptions(i).controls; track opt; let j = $index) {
                              <div [formGroupName]="j" class="flex items-center gap-2">
                                <input
                                  type="radio"
                                  [name]="'correct-' + i"
                                  [value]="j.toString()"
                                  [checked]="question.get('correctAnswer')?.value === j.toString()"
                                  (change)="setCorrectAnswer(i, j.toString())"
                                  class="w-5 h-5 text-[#0ABAB5] border-2 border-black focus:ring-[#0ABAB5] cursor-pointer shrink-0"
                                  title="Mark as correct answer"
                                />
                                <input
                                  formControlName="text"
                                  class="flex-1 min-w-[100px] px-3 py-2 border-2 border-black rounded-lg font-bold text-sm focus:bg-[#0ABAB5]/5 focus:outline-none"
                                  [placeholder]="'Option ' + (j + 1)"
                                />
                                @if (getOptions(i).length > 2) {
                                  <button
                                    type="button"
                                    (click)="removeOption(i, j)"
                                    class="w-10 h-10 shrink-0 flex items-center justify-center text-white bg-black border-2 border-black rounded-lg hover:bg-gray-800 transition-all"
                                  >
                                    <span class="material-icons text-[20px]">close</span>
                                  </button>
                                }
                              </div>
                            }
                          </div>

                          @if (getOptions(i).length < 6) {
                            <button
                              type="button"
                              (click)="addOption(i)"
                              class="mt-3 text-xs font-black text-black hover:text-[#0ABAB5] flex items-center uppercase tracking-wide transition-colors"
                            >
                              <span class="material-icons text-lg mr-1">add_circle</span> Add Option
                            </button>
                          }
                        }
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>

            @if (questions.length === 0) {
              <div
                class="text-center py-12 border-4 border-dashed border-black rounded-2xl bg-gray-50"
              >
                <span class="material-icons text-6xl text-gray-300 mb-4">quiz</span>
                <p class="text-xl font-black text-gray-400 uppercase tracking-tight">
                  No questions yet
                </p>
                <p class="text-gray-400 font-bold mt-2 italic">
                  Add questions manually or use AI to generate them.
                </p>
              </div>
            }
          </div>
        </div>

        <div class="space-y-8">
          <app-card title="Quiz Settings">
            <div class="space-y-4">
              <div>
                <label
                  for="status"
                  class="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2"
                  >Status</label
                >
                <select
                  id="status"
                  [formControl]="quizForm.controls['status']"
                  class="w-full px-4 py-3 border-4 border-black rounded-xl font-black bg-white"
                >
                  <option value="DRAFT">Draft</option>
                  <option value="PUBLISHED">Published</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </div>
              <div class="pt-4 border-t-2 border-black/5">
                <app-button
                  (click)="saveQuiz()"
                  [disabled]="quizForm.invalid"
                  variant="primary"
                  class="w-full py-4 text-xl"
                >
                  {{ isEdit ? 'Update Quiz' : 'Save Quiz' }}
                </app-button>
              </div>
            </div>
          </app-card>
        </div>
      </div>

      <app-modal
        [isOpen]="showAiModal()"
        title="AI Question Generator"
        (closeModal)="showAiModal.set(false)"
        [showFooter]="!aiLoading()"
      >
        @if (aiLoading()) {
          <div class="text-center py-12 space-y-6">
            <div
              class="inline-flex items-center justify-center w-20 h-20 bg-[#0ABAB5]/10 rounded-full border-4 border-black animate-pulse"
            >
              <span class="material-icons text-4xl text-[#0ABAB5] animate-spin">auto_awesome</span>
            </div>
            <h3 class="text-2xl font-black uppercase italic tracking-tight">AI is thinking...</h3>
            <p class="text-gray-500 font-bold italic">
              Generating high-quality questions for your quiz.
            </p>
          </div>
        } @else if (generatedQuestions().length > 0) {
          <div class="space-y-6">
            <p class="text-gray-600 font-bold">Review and select the questions you want to add.</p>
            <div class="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              @for (q of generatedQuestions(); track q.text) {
                <div class="p-4 border-4 border-black rounded-xl bg-white flex gap-4 items-start">
                  <input
                    type="checkbox"
                    [(ngModel)]="q.selected"
                    class="mt-1 w-5 h-5 border-2 border-black rounded"
                  />
                  <div>
                    <p class="font-black text-sm">{{ q.text }}</p>
                    <span class="text-[10px] font-black uppercase tracking-widest text-[#0ABAB5]">{{
                      q.type
                    }}</span>
                  </div>
                </div>
              }
            </div>
            <div class="flex justify-end gap-4">
              <app-button variant="secondary" (click)="generatedQuestions.set([])">Back</app-button>
              <app-button variant="primary" (click)="addSelectedQuestions()"
                >Add Selected</app-button
              >
            </div>
          </div>
        } @else {
          <div class="space-y-6">
            <p class="text-gray-600 font-bold">
              Tell AI what topic or source text to use for generating questions.
            </p>
            <div>
              <label for="aiPrompt" class="block text-sm font-black uppercase tracking-tight mb-2"
                >Topic or Content</label
              >
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
                <label
                  for="aiCount"
                  class="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2"
                  >Count</label
                >
                <select
                  id="aiCount"
                  [(ngModel)]="aiCount"
                  class="w-full px-4 py-2 border-2 border-black rounded-lg font-bold bg-white"
                >
                  <option [value]="3">3 Questions</option>
                  <option [value]="5">5 Questions</option>
                  <option [value]="10">10 Questions</option>
                </select>
              </div>
              <div>
                <label
                  for="aiDifficulty"
                  class="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2"
                  >Difficulty</label
                >
                <select
                  id="aiDifficulty"
                  [(ngModel)]="aiDifficulty"
                  class="w-full px-4 py-2 border-2 border-black rounded-lg font-bold bg-white"
                >
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
  `,
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
    questions: this.fb.array([]),
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

  getOptions(index: number): FormArray {
    return this.questions.at(index).get('options') as FormArray;
  }

  addOption(questionIndex: number) {
    const optionsArray = this.getOptions(questionIndex);
    optionsArray.push(this.fb.group({ text: ['', Validators.required] }));
  }

  removeOption(questionIndex: number, optionIndex: number) {
    const questionGroup = this.questions.at(questionIndex);
    const optionsArray = this.getOptions(questionIndex);
    
    optionsArray.removeAt(optionIndex);

    // If the removed option was checked as the correct answer, reset the selected correctAnswer index
    const correctAnswerVal = questionGroup.get('correctAnswer')?.value;
    if (correctAnswerVal === optionIndex.toString()) {
      questionGroup.get('correctAnswer')?.setValue('0');
    } else {
      const currentIdx = parseInt(correctAnswerVal || '0', 10);
      if (currentIdx > optionIndex) {
        questionGroup.get('correctAnswer')?.setValue((currentIdx - 1).toString());
      }
    }
  }

  onTypeChange(index: number) {
    const question = this.questions.at(index);
    const type = question.get('type')?.value;
    const optionsArray = this.getOptions(index);

    // Clear existing options
    while (optionsArray.length !== 0) {
      optionsArray.removeAt(0);
    }

    if (type === 'true-false') {
      optionsArray.push(this.fb.group({ text: ['True'] }));
      optionsArray.push(this.fb.group({ text: ['False'] }));
      question.get('correctAnswer')?.setValue('0'); // default to True
    } else {
      optionsArray.push(this.fb.group({ text: ['Option 1', Validators.required] }));
      optionsArray.push(this.fb.group({ text: ['Option 2', Validators.required] }));
      optionsArray.push(this.fb.group({ text: ['Option 3', Validators.required] }));
      question.get('correctAnswer')?.setValue('0'); // default to Option 1
    }
  }

  setCorrectAnswer(questionIndex: number, value: string) {
    this.questions.at(questionIndex).get('correctAnswer')?.setValue(value);
  }

  addQuestion(data?: Partial<Question>) {
    const optionsArray = this.fb.array([]) as FormArray;
    
    // Normalize types to handle lowercase/uppercase from backend or specs
    const type = data?.type === 'TRUE_FALSE' ? 'true-false' : (data?.type === 'MULTIPLE_CHOICE' ? 'multiple-choice' : (data?.type || 'multiple-choice'));
    
    let selectedIndexStr = '0';

    if (data?.options && data.options.length > 0) {
      data.options.forEach((opt, idx) => {
        optionsArray.push(
          this.fb.group({
            text: [opt.text || '', Validators.required],
          })
        );
        if (data.correctAnswer && opt.text === data.correctAnswer) {
          selectedIndexStr = idx.toString();
        }
      });
    } else {
      // Default options if not provided
      if (type === 'true-false') {
        optionsArray.push(this.fb.group({ text: ['True'] }));
        optionsArray.push(this.fb.group({ text: ['False'] }));
        selectedIndexStr = data?.correctAnswer === 'False' ? '1' : '0';
      } else {
        optionsArray.push(this.fb.group({ text: ['Option 1', Validators.required] }));
        optionsArray.push(this.fb.group({ text: ['Option 2', Validators.required] }));
        optionsArray.push(this.fb.group({ text: ['Option 3', Validators.required] }));
        selectedIndexStr = '0';
      }
    }

    this.questions.push(
      this.fb.group({
        id: [data?.id || crypto.randomUUID()],
        text: [data?.text || '', Validators.required],
        type: [type],
        difficulty: [data?.difficulty || 'MEDIUM'],
        correctAnswer: [selectedIndexStr, Validators.required],
        options: optionsArray,
      }),
    );
  }

  removeQuestion(index: number) {
    this.questions.removeAt(index);
  }

  ngOnInit() {
    this.quizId = this.route.snapshot.paramMap.get('id');
    if (this.quizId) {
      this.isEdit = true;
      const quiz = this.store.quizzes().find((q) => q.id === this.quizId);
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
        selected: true,
      }));
      this.generatedQuestions.set(mockQuestions);
      this.aiLoading.set(false);
      this.notificationService.success('Questions generated successfully!');
    }, 2500);
  }

  addSelectedQuestions() {
    const selected = this.generatedQuestions().filter((q) => q.selected);
    selected.forEach((q) => {
      const question: Partial<Question> = {
        text: q.text,
        type: q.type as 'multiple-choice' | 'true-false',
        difficulty: q.difficulty as 'EASY' | 'MEDIUM' | 'HARD',
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
      const questionsData = (formValue.questions || []).map((qVal) => {
        const q = qVal as FormQuestion;
        const typeNormalized = q.type === 'true-false' ? 'TRUE_FALSE' : 'MULTIPLE_CHOICE';
        
        // Map FormArray options back to raw QuizOption shape
        const options = (q.options || []).map((o, idx: number) => ({
          id: `${q.id || crypto.randomUUID()}-o${idx + 1}`,
          text: o.text || '',
        }));

        // Resolve correct answer text from selected index
        let correctAnswer = '';
        const selectedIndex = parseInt(q.correctAnswer || '0', 10);
        if (!isNaN(selectedIndex) && options[selectedIndex]) {
          correctAnswer = options[selectedIndex].text;
        }

        return {
          id: q.id || crypto.randomUUID(),
          text: q.text || '',
          type: typeNormalized as 'MULTIPLE_CHOICE' | 'TRUE_FALSE',
          difficulty: (q.difficulty || 'MEDIUM') as 'EASY' | 'MEDIUM' | 'HARD',
          points: 10,
          options,
          correctAnswer,
        };
      });

      const quizData = {
        title: formValue.title ?? '',
        subject: formValue.subject ?? '',
        status: (formValue.status as 'PUBLISHED' | 'DRAFT') ?? 'DRAFT',
        questions: questionsData,
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
