// src/environments/environment.production.ts
export const environment = {
  production: true,
  quizApiUrl: 'https://e-learning-backend-team1-api-gateway.onrender.com',
  lessonApiUrl: 'https://e-learning-backend-team1-api-gateway.onrender.com',
  userPlatformApiUrl: 'https://e-learning-backend-team1-api-gateway.onrender.com',

  keycloak: {
    url: 'https://keycloak-26-0-7-vb34.onrender.com/',
    realm: 'elearning',
    clientId: 'elearning-angular'
  }
};

