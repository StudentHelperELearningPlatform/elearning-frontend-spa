import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Question } from '../../store/quizzes.store';

@Component({
  selector: 'app-question-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 md:p-12">
      <!-- Question Header -->
      <div class="flex justify-between items-center mb-8">
        <span class="text-[#0ABAB5] font-black uppercase tracking-widest text-sm">Question {{ index() + 1 }} of {{ total() }}</span>
        <span class="bg-gray-100 text-gray-600 font-bold px-3 py-1 rounded-full border-2 border-gray-300 text-sm">
          {{ question().points || 10 }} pts
        </span>
      </div>

      <!-- Question Text -->
      <h2 class="text-2xl md:text-3xl font-black text-black mb-10 leading-tight">
        {{ question().text }}
      </h2>

      <!-- Options -->
      <div class="space-y-4">
        @for (option of question().options; track option.id; let i = $index) {
          <button 
            (click)="selectOption(option.id)"
            class="w-full text-left p-6 rounded-2xl border-4 transition-all duration-200 flex items-center group relative overflow-hidden"
            [ngClass]="{
              'border-[#0ABAB5] bg-[#0ABAB5]/10 shadow-[4px_4px_0px_0px_#0ABAB5] translate-x-[-2px] translate-y-[-2px]': selectedOptionId() === option.id,
              'border-gray-300 bg-white hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]': selectedOptionId() !== option.id
            }">
            
            <div class="w-10 h-10 rounded-full flex items-center justify-center font-black text-lg mr-4 border-2"
                 [ngClass]="{
                   'bg-[#0ABAB5] text-white border-[#0ABAB5]': selectedOptionId() === option.id,
                   'bg-gray-100 text-gray-500 border-gray-300 group-hover:border-black group-hover:text-black': selectedOptionId() !== option.id
                 }">
              {{ getLetter(i) }}
            </div>
            
            <span class="font-bold text-lg" [ngClass]="{'text-[#0ABAB5]': selectedOptionId() === option.id, 'text-black': selectedOptionId() !== option.id}">
              {{ option.text }}
            </span>
          </button>
        }
      </div>
    </div>
  `
})
export class QuestionCardComponent {
  question = input.required<Question>();
  index = input.required<number>();
  total = input.required<number>();
  selectedOptionId = input<string | null>(null);
  
  optionSelected = output<string>();

  selectOption(id: string) {
    this.optionSelected.emit(id);
  }

  getLetter(index: number): string {
    return String.fromCharCode(65 + index); // A, B, C, D...
  }
}
