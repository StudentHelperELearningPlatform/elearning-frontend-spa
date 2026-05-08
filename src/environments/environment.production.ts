// src/environments/environment.production.ts
export const environment = {
  production: true,
  apiUrlAriana: 'https://content-api.elearning.com',
  apiUrlMoisa: 'https://platform-api.elearning.com',

  keycloak: {
    url: 'https://auth.elearning.com',
    realm: 'elearning',
    clientId: 'elearning-spa'
  }
};
