// src/environments/environment.production.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.elearning.com',
  contentApiUrl: 'https://api.elearning.com/api/v1',
  quizApiUrl: 'https://api.elearning.com/api/v1',
  managementApiUrl: 'https://api.elearning.com/api/v1',
  keycloak: {
    url: 'https://auth.elearning.com',
    realm: 'elearning',
    clientId: 'elearning-spa'
  }
};
