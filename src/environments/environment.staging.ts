// src/environments/environment.staging.ts
export const environment = {
  production: false,
  quizApiUrl: 'https://staging-content-api.elearning.com',
  lessonApiUrl: 'https://staging-content-api.elearning.com',
  userPlatformApiUrl: 'https://staging-platform-api.elearning.com',

  keycloak: {
    url: 'https://staging-auth.elearning.com',
    realm: 'elearning',
    clientId: 'elearning-spa'
  }
};
