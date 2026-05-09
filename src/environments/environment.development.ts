// src/environments/environment.development.ts
export const environment = {
  production: false,
  quizApiUrl: 'http://localhost:8082',
  lessonApiUrl: 'http://localhost:8082',
  userPlatformApiUrl: 'http://localhost:8082',
  keycloak: {
    url: 'https://keycloak-26-0-7-vb34.onrender.com/',
    realm: 'elearning',
    clientId: 'elearning-angular',
  },
};
