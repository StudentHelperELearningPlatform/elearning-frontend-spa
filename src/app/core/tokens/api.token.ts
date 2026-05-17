import { InjectionToken } from '@angular/core';

// Factory defaults keep existing unit tests passing when no override is provided.
// Production wiring lives in app.config.ts, where each token receives a concrete URL.

export const API_URL = new InjectionToken<string>('API_URL', {
  providedIn: 'root',
  factory: () => '/api',
});

export const CONTENT_API_URL = new InjectionToken<string>('CONTENT_API_URL', {
  providedIn: 'root',
  factory: () => '/api',
});

export const USER_PLATFORM_API_URL = new InjectionToken<string>('USER_PLATFORM_API_URL', {
  providedIn: 'root',
  factory: () => '/api',
});

export const QUIZ_API_URL = new InjectionToken<string>('QUIZ_API_URL', {
  providedIn: 'root',
  factory: () => '/api',
});

export const LEARNING_PATH_API_URL = new InjectionToken<string>('LEARNING_PATH_API_URL', {
  providedIn: 'root',
  factory: () => '/api',
});

export const AUTH_API_URL = new InjectionToken<string>('AUTH_API_URL', {
  providedIn: 'root',
  factory: () => '/api',
});
