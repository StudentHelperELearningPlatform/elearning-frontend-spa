import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizzesStore, Question } from '../store/quizzes.store';
import { QuestionCardComponent } from './question-card/question-card.component';
import { TimerComponent } from './timer/timer.component';
import { ResultsSummaryComponent } from './results-summary/results-summary.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-quiz-player',
  standalone: true,
  imports: [
    CommonModule,
    QuestionCardComponent,
    TimerComponent,
    ResultsSummaryComponent,
    ButtonComponent
  ],
  template: `
    <div class="min-h-[calc(100vh-80px)] bg-gray-50 flex flex-col relative overflow-hidden">
      <!-- Decorative Background Pattern -->
      <div class="absolute inset-0 opacity-5 pointer-events-none" style="background-image: radial-gradient(#000 2px, transparent 2px); background-size: 30px 30px;"></div>
      
      @if (store.loading()) {
        <div class="flex-1 flex items-center justify-center z-10">
          <div class="w-16 h-16 border-8 border-gray-200 border-t-[var(--color-primary)] rounded-full animate-spin"></div>
        </div>
      } @else if (store.showResults()) {
        <div class="flex-1 flex items-center justify-center p-6 z-10">
          <app-results-summary
            [score]="store.score()"
            [totalPoints]="store.totalPoints()"
            [timeSpent]="store.timeSpent()"
            (retry)="retryQuiz()"
            (continue)="goBack()"
          ></app-results-summary>
        </div>
      } @else if (currentQuestion()) {
        <!-- Quiz Header -->
        <div class="bg-white border-b-4 border-black p-4 md:p-6 flex items-center justify-between z-20 shadow-[0px_4px_0px_0px_rgba(0,0,0,1)] sticky top-0">
          <div class="flex items-center space-x-4">
            <button (click)="goBack()" class="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center hover:bg-gray-100 transition-colors">
              <span class="material-icons text-black">close</span>
            </button>
            <h1 class="text-xl md:text-2xl font-black text-black hidden sm:block">{{ store.currentQuiz()?.title }}</h1>
          </div>
          
          <!-- Progress Bar -->
          <div class="flex-1 max-w-md mx-4 hidden md:block">
            <div class="h-4 bg-gray-200 rounded-full border-2 border-black overflow-hidden">
              <div class="h-full bg-[var(--color-primary)] transition-all duration-300" [style.width.%]="progressPercentage()"></div>
            </div>
          </div>
          
          <app-timer [duration]="store.currentQuiz()?.timeLimit || 0" (timeUp)="handleTimeUp()"></app-timer>
        </div>

        <!-- Mobile Progress Bar -->
        <div class="md:hidden bg-white border-b-4 border-black p-4 z-20">
          <div class="h-3 bg-gray-200 rounded-full border-2 border-black overflow-hidden">
            <div class="h-full bg-[var(--color-primary)] transition-all duration-300" [style.width.%]="progressPercentage()"></div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="flex-1 overflow-y-auto p-6 md:p-12 z-10 flex flex-col">
          <div class="max-w-3xl mx-auto w-full flex-1 flex flex-col justify-center">
            <app-question-card
              [question]="currentQuestion()!"
              [index]="store.currentQuestionIndex()"
              [total]="store.currentQuiz()?.questions?.length || 0"
              [selectedOptionId]="selectedOptionId()"
              (optionSelected)="selectOption($event)"
            ></app-question-card>
          </div>
        </div>

        <!-- Bottom Navigation -->
        <div class="bg-white border-t-4 border-black p-4 md:p-6 flex items-center justify-between z-20 shadow-[0px_-4px_0px_0px_rgba(0,0,0,1)] sticky bottom-0">
          <app-button 
            variant="secondary" 
            [disabled]="store.currentQuestionIndex() === 0"
            (btnClick)="previousQuestion()">
            Previous
          </app-button>
          
          @if (store.currentQuestionIndex() < (store.currentQuiz()?.questions?.length || 0) - 1) {
            <app-button 
              variant="primary" 
              [disabled]="!selectedOptionId()"
              (btnClick)="nextQuestion()">
              Next Question
            </app-button>
          } @else {
            <app-button 
              variant="primary" 
              icon="check_circle" 
              iconPosition="right"
              [disabled]="!selectedOptionId()"
              (btnClick)="submitQuiz()">
              Submit Quiz
            </app-button>
          }
        </div>
      } @else {
        <div class="flex-1 flex items-center justify-center z-10">
          <div class="text-center">
            <h2 class="text-2xl font-black mb-4">Quiz not found or no questions available.</h2>
            <app-button variant="primary" (btnClick)="goBack()">Go Back</app-button>
          </div>
        </div>
      }
    </div>
  `
})
export class QuizPlayerComponent implements OnInit {
  store = inject(QuizzesStore);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  selectedOptionId = signal<string | null>(null);

  currentQuestion = computed<Question | undefined>(() => {
    const quiz = this.store.currentQuiz();
    if (!quiz || !quiz.questions) return undefined;
    return quiz.questions[this.store.currentQuestionIndex()];
  });

  progressPercentage = computed(() => {
    const total = this.store.currentQuiz()?.questions?.length || 1;
    const current = this.store.currentQuestionIndex();
    return (current / total) * 100;
  });

  ngOnInit() {
    const quizId = this.route.snapshot.paramMap.get('id');
    if (quizId) {
      this.store.loadQuizById(quizId);
    } else {
      // Fallback for testing
      this.store.loadQuizById('1');
    }
  }

  selectOption(optionId: string) {
    this.selectedOptionId.set(optionId);
    // Save answer to store
    const qId = this.currentQuestion()?.id;
    if (qId) {
      this.store.answerQuestion(qId, optionId);
    }
  }

  nextQuestion() {
    this.store.nextQuestion();
    this.restoreSelectedOption();
  }

  previousQuestion() {
    this.store.previousQuestion();
    this.restoreSelectedOption();
  }

  private restoreSelectedOption() {
    const qId = this.currentQuestion()?.id;
    if (qId) {
      const answer = this.store.answers()[qId];
      this.selectedOptionId.set(answer || null);
    } else {
      this.selectedOptionId.set(null);
    }
  }

  submitQuiz() {
    this.store.submitQuiz();
  }

  handleTimeUp() {
    this.store.submitQuiz();
  }

  retryQuiz() {
    this.store.resetQuiz();
    this.selectedOptionId.set(null);
  }

  goBack() {
    this.router.navigate(['/student/dashboard']);
  }
}


