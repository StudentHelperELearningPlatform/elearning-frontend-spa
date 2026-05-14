import { CONTENT_API_URL, USER_PLATFORM_API_URL, LEARNING_PATH_API_URL, QUIZ_API_URL, AUTH_API_URL, API_URL } from '../app/core/tokens/api.token';

export const provideApiMocks = () => [
  { provide: API_URL, useValue: '/api/v1' },
  { provide: CONTENT_API_URL, useValue: '/api/v1' },
  { provide: LEARNING_PATH_API_URL, useValue: '/api/v1' },
  { provide: QUIZ_API_URL, useValue: '/api/v1' },
  { provide: USER_PLATFORM_API_URL, useValue: '/api/v1' },
  { provide: AUTH_API_URL, useValue: '/api/auth' },
];
