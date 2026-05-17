// src/environments/environment.development.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
  contentApiUrl: 'http://localhost:8081/api/v1',
  quizApiUrl: 'http://localhost:8081/api/v1',
  managementApiUrl: 'http://localhost:8080/api/v1',
  keycloak: {
    url: 'https://keycloak-26-0-7-vb34.onrender.com/',
    realm: 'elearning',
    clientId: 'elearning-angular'
  }
};
