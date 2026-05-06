// src/environments/environment.staging.ts
export const environment = {
  production: false,
  useMocks: false,
  services: {
    auth: 'https://staging-api.elearning.com',
    content: 'https://staging-api.elearning.com'
  },
  keycloak: {
    url: 'https://staging-auth.elearning.com',
    realm: 'elearning',
    clientId: 'elearning-spa'
  }
};
