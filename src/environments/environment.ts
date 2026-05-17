// src/environments/environment.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.example.com', // TODO: replace with real production API URL
  contentApiUrl: 'https://api.example.com/api/v1',
  quizApiUrl: 'https://api.example.com/api/v1',
  managementApiUrl: 'https://api.example.com/api/v1',
  keycloak: {
    url: 'https://keycloak-26-0-7-vb34.onrender.com/',
    realm: 'elearning',
    clientId: 'elearning-angular'
  }
};
