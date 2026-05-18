import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, catchError, of, throwError } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { MessageService } from 'primeng/api';
import { CONTENT_API_URL } from '../../../core/tokens/api.token';

import { QuestionsService } from '../services/questions.service';
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
  withMethods(
    (
      store,
      service = inject(QuestionsService),
      messageService = inject(MessageService, { optional: true }),
      http = inject(HttpClient),
      apiBase = inject(CONTENT_API_URL),
    ) => ({
      // --- LOAD QUESTIONS (WITH AUTO-CREATE) ---
      loadQuestions: rxMethod<{ type: 'check' | 'final'; parentId: string }>(
        pipe(
          switchMap(({ type, parentId }) => {
            patchState(store, { isLoading: true, error: null });

            const getReq$ =
              type === 'check'
                ? service.getCheckQuizQuestions(parentId)
                : service.getFinalQuizQuestions(parentId);

            // The payloads needed to instantiate the quizzes if they are missing
            const createReq$ =
              type === 'check'
                ? http.post(`${apiBase}/subcapitols/${parentId}/check-quiz`, {})
                : http.post(`${apiBase}/lessons/${parentId}/final-quiz`, {
                    passThreshold: 50,
                    mandatory: false,
                    maxAttempts: 3,
                  });

            return getReq$.pipe(
              catchError((err: HttpErrorResponse) => {
                // 🪄 MAGIC INTERCEPT: If 404, the quiz entity doesn't exist yet in the database.
                // We automatically create it, then return an empty array to the UI!
                if (err.status === 404) {
                  return createReq$.pipe(
                    switchMap(() => of([] as QuestionResponse[])),
                    catchError((createErr) => throwError(() => createErr)),
                  );
                }
                return throwError(() => err);
              }),
              tapResponse({
                next: (questions) => patchState(store, { questions, isLoading: false }),
                error: (err: HttpErrorResponse) => {
                  const errorMessage = err.error?.error || 'Failed to load questions.';
                  patchState(store, { error: errorMessage, isLoading: false });
                  messageService?.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: errorMessage,
                  });
                },
              }),
            );
          }),
        ),
      ),

      // --- AI GENERATE ---
      generateAI: rxMethod<{ type: 'check' | 'final'; parentId: string }>(
        pipe(
          switchMap(({ type, parentId }) => {
            patchState(store, { isGeneratingAI: true, error: null });
            const request$ =
              type === 'check'
                ? service.generateCheckQuizQuestions(parentId)
                : service.generateFinalQuizQuestions(parentId);

            return request$.pipe(
              tapResponse({
                next: (newQuestions) => {
                  patchState(store, (state) => ({
                    questions: [...state.questions, ...newQuestions],
                    isGeneratingAI: false,
                  }));
                  messageService?.add({
                    severity: 'success',
                    summary: 'AI Generation',
                    detail: `Successfully generated ${newQuestions.length} questions.`,
                  });
                },
                error: (err: HttpErrorResponse) => {
                  const errorMessage =
                    err.error?.error ||
                    'Failed to generate questions. Ensure your lesson has text content.';
                  patchState(store, { error: errorMessage, isGeneratingAI: false });
                  messageService?.add({
                    severity: 'error',
                    summary: 'AI Error',
                    detail: errorMessage,
                  });
                },
              }),
            );
          }),
        ),
      ),

      // --- ADD QUESTION ---
      addQuestion: rxMethod<{
        type: 'check' | 'final';
        parentId: string;
        payload: AddQuestionRequest;
      }>(
        pipe(
          switchMap(({ type, parentId, payload }) => {
            patchState(store, { isLoading: true, error: null });
            const request$ =
              type === 'check'
                ? service.addCheckQuizQuestion(parentId, payload)
                : service.addFinalQuizQuestion(parentId, payload);

            return request$.pipe(
              tapResponse({
                next: (newQuestion) => {
                  patchState(store, (state) => ({
                    questions: [...state.questions, newQuestion],
                    isLoading: false,
                  }));
                  messageService?.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Question added successfully.',
                  });
                },
                error: (err: HttpErrorResponse) => {
                  const errorMessage = err.error?.error || 'Failed to add question.';
                  patchState(store, { error: errorMessage, isLoading: false });
                  messageService?.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: errorMessage,
                  });
                },
              }),
            );
          }),
        ),
      ),

      // --- UPDATE QUESTION ---
      updateQuestion: rxMethod<{ id: string; payload: AddQuestionRequest }>(
        pipe(
          switchMap(({ id, payload }) => {
            patchState(store, { isLoading: true, error: null });
            return http.put<QuestionResponse>(`${apiBase}/questions/${id}`, payload).pipe(
              tapResponse({
                next: (updatedQuestion) => {
                  patchState(store, (state) => ({
                    // Replace the old question with the updated one in the list
                    questions: state.questions.map((q) => (q.id === id ? updatedQuestion : q)),
                    isLoading: false,
                  }));
                  messageService?.add({
                    severity: 'success',
                    summary: 'Updated',
                    detail: 'Question updated successfully.',
                  });
                },
                error: (err: HttpErrorResponse) => {
                  const errorMessage = err.error?.error || 'Failed to update question.';
                  patchState(store, { error: errorMessage, isLoading: false });
                  messageService?.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: errorMessage,
                  });
                },
              }),
            );
          }),
        ),
      ),

      // --- DELETE QUESTION ---
      deleteQuestion: rxMethod<string>(
        pipe(
          switchMap((questionId) => {
            patchState(store, { isLoading: true, error: null });
            return service.deleteQuestion(questionId).pipe(
              tapResponse({
                next: () => {
                  patchState(store, (state) => ({
                    questions: state.questions.filter((q) => q.id !== questionId),
                    isLoading: false,
                  }));
                  messageService?.add({
                    severity: 'success',
                    summary: 'Deleted',
                    detail: 'Question removed.',
                  });
                },
                error: (err: HttpErrorResponse) => {
                  const errorMessage = err.error?.error || 'Failed to delete question.';
                  patchState(store, { error: errorMessage, isLoading: false });
                  messageService?.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: errorMessage,
                  });
                },
              }),
            );
          }),
        ),
      ),

      // --- APPROVE QUESTION ---
      approveQuestion: rxMethod<string>(
        pipe(
          switchMap((questionId) => {
            patchState(store, { isLoading: true, error: null });
            return service.approveQuestion(questionId).pipe(
              tapResponse({
                next: () => {
                  patchState(store, (state) => ({
                    questions: state.questions.map((q) =>
                      q.id === questionId ? { ...q, status: 'APPROVED' } : q,
                    ),
                    isLoading: false,
                  }));
                  messageService?.add({
                    severity: 'success',
                    summary: 'Approved',
                    detail: 'Question approved for students.',
                  });
                },
                error: (err: HttpErrorResponse) => {
                  const errorMessage = err.error?.error || 'Failed to approve question.';
                  patchState(store, { error: errorMessage, isLoading: false });
                  messageService?.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: errorMessage,
                  });
                },
              }),
            );
          }),
        ),
      ),
    }),
  ),
);
