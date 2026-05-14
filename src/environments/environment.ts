// src/environments/environment.ts
export const environment = {
  production: false,

  // S6 — folosit direct în progress.store.ts (markLessonComplete etc.)
  apiBase: '/api/v1',
  apiUrl: '/api/v1',

  // Develop — folosit de DI tokens (@core/tokens/api.token)
  quizApiUrl: 'https://quiz-api.example.com',
  lessonApiUrl: 'https://content-api.example.com',
  userPlatformApiUrl: 'https://platform-api.example.com',

  keycloak: {
    url: 'https://keycloak-26-0-7-vb34.onrender.com/',
    realm: 'elearning',
    clientId: 'elearning-angular',
  },
};