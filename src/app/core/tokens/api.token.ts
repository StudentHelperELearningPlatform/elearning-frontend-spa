import { InjectionToken } from '@angular/core';

export const CONTENT_API_URL = new InjectionToken<string>('CONTENT_API_URL', {
  providedIn: 'root',
  factory: () => '/api',
});

export const QUIZ_API_URL = new InjectionToken<string>('QUIZ_API_URL', {
  providedIn: 'root',
  factory: () => '/api',
});

export const MANAGEMENT_API_URL = new InjectionToken<string>('MANAGEMENT_API_URL', {
  providedIn: 'root',
  factory: () => '/api/v1',
});
