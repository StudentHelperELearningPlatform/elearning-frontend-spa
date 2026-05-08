// src/environments/environment.staging.ts
export const environment = {
  production: false,
  apiUrlAriana: 'https://staging-content-api.elearning.com',
  apiUrlMoisa: 'https://staging-platform-api.elearning.com',

  keycloak: {
    url: 'https://staging-auth.elearning.com',
    realm: 'elearning',
    clientId: 'elearning-spa'
  }
};
