// src/environments/environment.production.ts
export const environment = {
  production: true,
  quizApiUrl: 'https://content-api.elearning.com',
  lessonApiUrl: 'https://content-api.elearning.com',
  userPlatformApiUrl: 'https://platform-api.elearning.com',

  keycloak: {
    url: 'https://auth.elearning.com',
    realm: 'elearning',
    clientId: 'elearning-spa'
  }
};
