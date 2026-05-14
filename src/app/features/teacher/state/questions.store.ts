import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { MessageService } from 'primeng/api'; // <--- Injecting PrimeNG Toast Service

import { QuestionsService } from '../services/questions.service'; // Adjust path if you placed this in core
import { QuestionResponse, AddQuestionRequest } from '../../../shared/models/quiz.types';

interface QuestionsState {
  questions: QuestionResponse[];
  isLoading: boolean;
  isGeneratingAI: boolean;
  error: string | null;
}

const initialState: QuestionsState = {
  questions: [],
  isLoading: false,
  isGeneratingAI: false,
  error: null,
};

export const QuestionsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((
    store, 
    service = inject(QuestionsService), 
    messageService = inject(MessageService) // <--- Wiring the Toast Service
  ) => ({
    
    // --- LOAD QUESTIONS ---
    loadQuestions: rxMethod<{ type: 'check' | 'final'; parentId: string }>(
      pipe(
        switchMap(({ type, parentId }) => {
          patchState(store, { isLoading: true, error: null });
          const request$ = type === 'check' 
            ? service.getCheckQuizQuestions(parentId) 
            : service.getFinalQuizQuestions(parentId);
            
          return request$.pipe(
            tapResponse({
              next: (questions) => patchState(store, { questions, isLoading: false }),
              error: (err: HttpErrorResponse) => {
                const errorMessage = err.error?.error || 'Failed to load questions.';
                patchState(store, { error: errorMessage, isLoading: false });
                messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage });
              }
            })
          );
        })
      )
    ),

    // --- AI GENERATE ---
    generateAI: rxMethod<{ type: 'check' | 'final'; parentId: string }>(
      pipe(
        switchMap(({ type, parentId }) => {
          patchState(store, { isGeneratingAI: true, error: null });
          const request$ = type === 'check' 
            ? service.generateCheckQuizQuestions(parentId) 
            : service.generateFinalQuizQuestions(parentId);
            
          return request$.pipe(
            tapResponse({
              next: (newQuestions) => {
                patchState(store, (state) => ({ 
                  questions: [...state.questions, ...newQuestions], 
                  isGeneratingAI: false 
                }));
                messageService.add({ 
                  severity: 'success', 
                  summary: 'AI Generation', 
                  detail: `Successfully generated ${newQuestions.length} questions.` 
                });
              },
              error: (err: HttpErrorResponse) => {
                // Catching that specific 400 error when text blocks are missing
                const errorMessage = err.error?.error || 'Failed to generate questions. Ensure your lesson has text content.';
                patchState(store, { error: errorMessage, isGeneratingAI: false });
                messageService.add({ severity: 'error', summary: 'AI Error', detail: errorMessage });
              }
            })
          );
        })
      )
    ),

    // --- ADD QUESTION ---
    addQuestion: rxMethod<{ type: 'check' | 'final'; parentId: string; payload: AddQuestionRequest }>(
      pipe(
        switchMap(({ type, parentId, payload }) => {
          patchState(store, { isLoading: true, error: null });
          const request$ = type === 'check'
            ? service.addCheckQuizQuestion(parentId, payload)
            : service.addFinalQuizQuestion(parentId, payload);

          return request$.pipe(
            tapResponse({
              next: (newQuestion) => {
                patchState(store, (state) => ({
                  questions: [...state.questions, newQuestion],
                  isLoading: false
                }));
                messageService.add({ severity: 'success', summary: 'Success', detail: 'Question added successfully.' });
              },
              error: (err: HttpErrorResponse) => {
                const errorMessage = err.error?.error || 'Failed to add question.';
                patchState(store, { error: errorMessage, isLoading: false });
                messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage });
              }
            })
          );
        })
      )
    ),

    // --- DELETE QUESTION ---
    deleteQuestion: rxMethod<string>(
      pipe(
        switchMap((questionId) => {
          patchState(store, { isLoading: true, error: null });
          return service.deleteQuestion(questionId).pipe(
            tapResponse({
              next: () => {
                // Optimistically remove it from the UI state
                patchState(store, (state) => ({
                  questions: state.questions.filter(q => q.id !== questionId),
                  isLoading: false
                }));
                messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Question removed.' });
              },
              error: (err: HttpErrorResponse) => {
                const errorMessage = err.error?.error || 'Failed to delete question.';
                patchState(store, { error: errorMessage, isLoading: false });
                messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage });
              }
            })
          );
        })
      )
    ),

    // --- APPROVE QUESTION ---
    approveQuestion: rxMethod<string>(
      pipe(
        switchMap((questionId) => {
          patchState(store, { isLoading: true, error: null });
          return service.approveQuestion(questionId).pipe(
            tapResponse({
              next: () => {
                // Optimistically update the status in the UI
                patchState(store, (state) => ({
                  questions: state.questions.map(q => 
                    q.id === questionId ? { ...q, status: 'APPROVED' } : q
                  ),
                  isLoading: false
                }));
                messageService.add({ severity: 'success', summary: 'Approved', detail: 'Question approved for students.' });
              },
              error: (err: HttpErrorResponse) => {
                const errorMessage = err.error?.error || 'Failed to approve question.';
                patchState(store, { error: errorMessage, isLoading: false });
                messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage });
              }
            })
          );
        })
      )
    )
  }))
);