// src/environments/environment.development.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
  // REPLACE the values below with your actual Keycloak configuration
  keycloak: {
    url: 'http://localhost:8180', // REPLACE
    realm: 'elearning', // REPLACE
    clientId: 'elearning-spa' // REPLACE
  }
};
