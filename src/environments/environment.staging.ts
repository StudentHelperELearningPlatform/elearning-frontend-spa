// src/environments/environment.staging.ts
export const environment = {
  production: false,
  apiUrl: 'https://staging-api.elearning.com',
  contentApiUrl: 'https://staging-api.elearning.com/api/v1',
  quizApiUrl: 'https://staging-api.elearning.com/api/v1',
  managementApiUrl: 'https://staging-api.elearning.com/api/v1',
  keycloak: {
    url: 'https://staging-auth.elearning.com',
    realm: 'elearning',
    clientId: 'elearning-spa'
  }
};
