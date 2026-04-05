// src/environments/environment.production.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.elearning.com',
  keycloak: {
    url: 'https://auth.elearning.com',
    realm: 'elearning',
    clientId: 'elearning-spa'
  }
};
