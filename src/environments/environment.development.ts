// src/environments/environment.development.ts
export const environment = {
  production: false,
  // Everything should go through the Gateway (8082) for CORS and Auth handling
  quizApiUrl: 'http://localhost:8082',
  learningPathApiUrl: 'http://localhost:8082',
  userPlatformApiUrl: 'http://localhost:8082',
  keycloak: {
    url: 'https://keycloak-26-0-7-vb34.onrender.com/',
    realm: 'elearning',
    clientId: 'elearning-angular',
  },
};
