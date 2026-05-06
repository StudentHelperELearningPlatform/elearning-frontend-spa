// src/environments/environment.ts
export const environment = {
  production: true,
  apiBase: '/api/v1',
  apiUrl: 'https://api.example.com', // TODO: replace with real production API URL
  keycloak: {
    url: 'https://keycloak-26-0-7-vb34.onrender.com/',
    realm: 'elearning',
    clientId: 'elearning-angular'
  }
};
