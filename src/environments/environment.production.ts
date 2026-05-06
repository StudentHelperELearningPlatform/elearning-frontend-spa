// src/environments/environment.production.ts
export const environment = {
  production: true,
  useMocks: false,
  services: {
    auth: 'https://api.elearning.com',
    content: 'https://api.elearning.com'
  },
  keycloak: {
    url: 'https://auth.elearning.com',
    realm: 'elearning',
    clientId: 'elearning-spa'
  }
};
