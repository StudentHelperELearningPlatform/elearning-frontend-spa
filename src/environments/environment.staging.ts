// src/environments/environment.staging.ts
export const environment = {
  production: false,
  apiUrl: 'https://staging-api.elearning.com',
  keycloak: {
    url: 'https://staging-auth.elearning.com',
    realm: 'elearning',
    clientId: 'elearning-spa'
  }
};
