import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuestionsStore } from '../state/questions.store';
import { AddQuestionRequest } from '../../../shared/models/quiz.types';

@Component({
  selector: 'app-question-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [QuestionsStore],
  template: `
    <div class="p-2">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h3 class="text-xl font-black tracking-tight">
          {{ quizType === 'check' ? 'Check Quiz Questions' : 'Final Quiz Questions' }}
        </h3>
        <div class="flex gap-2">
          <button 
            (click)="isAdding.set(true)"
            [disabled]="isAdding() || store.isGeneratingAI()"
            class="bg-white text-black px-4 py-2 rounded-lg font-bold border-2 border-black hover:bg-gray-100 disabled:opacity-50 transition-all flex items-center">
            <span class="material-icons mr-1 text-sm">add</span> Add Manual
          </button>
          <button 
            (click)="generateAI()"
            [disabled]="isAdding() || store.isGeneratingAI()"
            class="bg-purple-600 text-white px-4 py-2 rounded-lg font-bold border-2 border-black hover:bg-purple-500 disabled:opacity-50 transition-all flex items-center">
            @if (store.isGeneratingAI()) {
              <span class="material-icons animate-spin mr-2">autorenew</span> Generating...
            } @else {
              <span class="material-icons mr-2 text-sm">auto_awesome</span> AI Generate
            }
          </button>
        </div>
      </div>

      @if (store.isLoading() && store.questions().length === 0) {
        <div class="flex justify-center p-8">
          <span class="material-icons animate-spin text-4xl text-gray-400">autorenew</span>
        </div>
      } 
      
      <div class="space-y-4">
        @for (q of store.questions(); track q.id; let i = $index) {
          <div class="bg-white border-2 border-black rounded-xl p-4 flex flex-col md:flex-row gap-4 justify-between items-start">
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-2">
                <span class="text-xs font-bold bg-gray-200 px-2 py-1 rounded border border-black inline-block">Q{{ i + 1 }}</span>
                @if (q.status === 'PENDING') {
                  <span class="text-xs font-bold bg-yellow-100 text-yellow-800 px-2 py-1 rounded border border-yellow-300 flex items-center">
                    <span class="material-icons text-[14px] mr-1">pending</span> Needs Approval
                  </span>
                } @else if (q.status === 'APPROVED') {
                  <span class="text-xs font-bold bg-green-100 text-green-800 px-2 py-1 rounded border border-green-300 flex items-center">
                    <span class="material-icons text-[14px] mr-1">verified</span> Approved
                  </span>
                }
              </div>
              
              <p class="font-bold text-lg mb-3">{{ q.questionText }}</p>
              
              <div class="space-y-1">
                @for (opt of q.options; track opt.id) {
                  <div class="flex items-center text-sm" 
                       [class.text-green-700]="opt.correct || opt.optionText === q.correctAnswer" 
                       [class.font-bold]="opt.correct || opt.optionText === q.correctAnswer">
                    
                    <span class="material-icons text-[18px] mr-2" 
                          [class.text-green-600]="opt.correct || opt.optionText === q.correctAnswer"
                          [class.text-gray-400]="!(opt.correct || opt.optionText === q.correctAnswer)">
                      {{ (opt.correct || opt.optionText === q.correctAnswer) ? 'check_circle' : 'radio_button_unchecked' }}
                    </span>
                    
                    {{ opt.optionText }}
                  </div>
                }
              </div>
            </div>
            
            <div class="flex md:flex-col gap-2 shrink-0">
              @if (q.status === 'PENDING') {
                <button (click)="toggleApprove(q.id)" class="px-3 py-2 border-2 border-green-700 bg-green-50 text-green-800 font-bold rounded-lg hover:bg-green-100 flex items-center justify-center">
                  <span class="material-icons mr-1 text-[18px]">thumb_up</span> Approve
                </button>
              }
              <button (click)="deleteQuestion(q.id)" class="px-3 py-2 border-2 border-red-700 bg-red-50 text-red-800 font-bold rounded-lg hover:bg-red-100 flex items-center justify-center">
                <span class="material-icons mr-1 text-[18px]">delete</span> Delete
              </button>
            </div>
          </div>
        }

        @if (!store.isLoading() && store.questions().length === 0 && !isAdding()) {
          <div class="text-center p-12 border-4 border-dashed border-gray-300 rounded-2xl bg-gray-50">
            <span class="material-icons text-5xl text-gray-400 mb-2">quiz</span>
            <p class="text-gray-600 font-bold text-lg">No questions yet.</p>
            <p class="text-gray-500 text-sm">Add one manually or let AI generate them.</p>
          </div>
        }
      </div>

      @if (isAdding()) {
        <div class="mt-6 bg-blue-50 border-4 border-blue-900 rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(30,58,138,1)]">
          <h4 class="font-black text-lg text-blue-900 mb-4 flex items-center">
            <span class="material-icons mr-2">edit_note</span> Add New Question
          </h4>
          
          <label class="block mb-4">
            <span class="text-sm font-bold text-blue-900 block mb-1">Question Text <span class="text-red-500">*</span></span>
            <textarea 
              [(ngModel)]="newQuestionText" 
              rows="2" 
              class="w-full px-3 py-2 border-2 border-blue-900 rounded-xl font-medium resize-none"
              placeholder="e.g. What is the capital of France?"></textarea>
          </label>

          <div class="mb-4">
            <span class="text-sm font-bold text-blue-900 block mb-2">Options & Correct Answer <span class="text-red-500">*</span></span>
            <div class="space-y-2">
              @for (opt of newOptions(); track $index; let i = $index) {
                <div class="flex items-center gap-2">
                  <input 
                    type="radio" 
                    name="correctAnswerGroup" 
                    [checked]="opt.isCorrect"
                    (change)="setCorrectOption(i)"
                    class="w-5 h-5 text-blue-600 border-2 border-blue-900 focus:ring-blue-500 cursor-pointer"
                    title="Mark as correct answer">
                  <input 
                    type="text" 
                    [(ngModel)]="opt.text" 
                    class="flex-1 px-3 py-2 border-2 border-blue-900 rounded-lg font-medium"
                    [placeholder]="'Option ' + (i + 1)">
                  @if (newOptions().length > 2) {
                    <button (click)="removeOption(i)" class="p-2 text-red-600 hover:bg-red-100 rounded-lg">
                      <span class="material-icons text-xl">close</span>
                    </button>
                  }
                </div>
              }
            </div>
            
            @if (newOptions().length < 5) {
              <button (click)="addOption()" class="mt-3 text-sm font-bold text-blue-700 hover:text-blue-900 flex items-center">
                <span class="material-icons text-sm mr-1">add_circle</span> Add another option
              </button>
            }
          </div>

          <div class="flex justify-end gap-3 mt-6 pt-4 border-t-2 border-blue-200">
            <button (click)="cancelAdding()" class="px-4 py-2 font-bold text-blue-900 hover:bg-blue-100 rounded-lg transition-all">
              Cancel
            </button>
            <button (click)="submitQuestion()" class="px-6 py-2 bg-blue-900 text-white font-bold rounded-lg hover:bg-blue-800 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              Save Question
            </button>
          </div>
        </div>
      }
    </div>
  `
})
export class QuestionManagerComponent implements OnInit {
  @Input({ required: true }) quizType!: 'check' | 'final';
  @Input({ required: true }) parentId!: string; 
  
  protected readonly store = inject(QuestionsStore);

  // Form State
  isAdding = signal(false);
  newQuestionText = signal('');
  newOptions = signal<{text: string, isCorrect: boolean}[]>([
    { text: '', isCorrect: true },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false }
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

  // Form Methods
  setCorrectOption(index: number) {
    this.newOptions.update(opts => 
      opts.map((opt, i) => ({ ...opt, isCorrect: i === index }))
    );
  }

  addOption() {
    this.newOptions.update(opts => [...opts, { text: '', isCorrect: false }]);
  }

  removeOption(index: number) {
    this.newOptions.update(opts => opts.filter((_, i) => i !== index));
  }

  cancelAdding() {
    this.isAdding.set(false);
    this.resetForm();
  }

  submitQuestion() {
    const qText = this.newQuestionText().trim();
    const options = this.newOptions().filter(o => o.text.trim() !== ''); // Strip empty options
    const correctOpt = options.find(o => o.isCorrect);

    if (!qText) {
      alert('Please enter a question text.');
      return;
    }
    if (options.length < 2) {
      alert('Please provide at least 2 valid options.');
      return;
    }
    if (!correctOpt) {
      alert('Please select a correct answer by clicking a radio button.');
      return;
    }

    // FIX: Perfectly mapping the frontend fields to the backend's expected AddOptionRequest shape!
    const payload: AddQuestionRequest = {
      questionText: qText,
      questionType: 'MULTIPLE_CHOICE', 
      correctAnswer: correctOpt.text.trim(),
      options: options.map(o => ({ 
        optionText: o.text.trim(), 
        correct: o.isCorrect 
      }))
    };

    this.store.addQuestion({ type: this.quizType, parentId: this.parentId, payload });
    this.cancelAdding();
  }

  private resetForm() {
    this.newQuestionText.set('');
    this.newOptions.set([
      { text: '', isCorrect: true },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false }
    ]);
  }
}