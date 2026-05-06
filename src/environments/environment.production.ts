// src/environments/environment.production.ts
export const environment = {
  production: true,
  apiBase: '/api/v1',
  apiUrl: 'https://api.elearning.com',
  keycloak: {
    url: 'https://auth.elearning.com',
    realm: 'elearning',
    clientId: 'elearning-spa'
  }
};
