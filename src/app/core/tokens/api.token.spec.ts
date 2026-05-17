import { TestBed } from '@angular/core/testing';
import {
  API_URL,
  AUTH_API_URL,
  CONTENT_API_URL,
  LEARNING_PATH_API_URL,
  QUIZ_API_URL,
  USER_PLATFORM_API_URL,
} from './api.token';

describe('API injection tokens', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [] });
  });

  it('CONTENT_API_URL defaults to /api when no provider overrides it', () => {
    expect(TestBed.inject(CONTENT_API_URL)).toBe('/api');
  });

  it('QUIZ_API_URL defaults to /api', () => {
    expect(TestBed.inject(QUIZ_API_URL)).toBe('/api');
  });

  it('USER_PLATFORM_API_URL defaults to /api', () => {
    expect(TestBed.inject(USER_PLATFORM_API_URL)).toBe('/api');
  });

  it('API_URL, LEARNING_PATH_API_URL, AUTH_API_URL also default to /api', () => {
    expect(TestBed.inject(API_URL)).toBe('/api');
    expect(TestBed.inject(LEARNING_PATH_API_URL)).toBe('/api');
    expect(TestBed.inject(AUTH_API_URL)).toBe('/api');
  });

  it('an explicit provider overrides the factory default', () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [{ provide: CONTENT_API_URL, useValue: 'https://override.example.com/api/v1' }],
    });
    expect(TestBed.inject(CONTENT_API_URL)).toBe('https://override.example.com/api/v1');
  });
});
