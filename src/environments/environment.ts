// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'https://api.example.com',
  // REPLACE the values below with your actual Keycloak configuration
  keycloak: {
    url: 'https://auth.example.com', // REPLACE
    realm: 'elearning', // REPLACE
    clientId: 'elearning-spa' // REPLACE
  }
};
