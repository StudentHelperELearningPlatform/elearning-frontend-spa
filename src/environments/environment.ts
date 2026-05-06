// src/environments/environment.ts
export const environment = {
  production: true,
  useMocks: false,
  services: {
    auth: 'http://localhost:8082',
    content: 'http://localhost:8081'
  },
  keycloak: {
    url: 'https://keycloak-26-0-7-vb34.onrender.com/',
    realm: 'elearning',
    clientId: 'elearning-angular'
  }
};

