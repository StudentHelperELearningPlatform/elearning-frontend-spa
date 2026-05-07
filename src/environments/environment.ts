export const environment = {
  production: true,
  apiBase: 'https://api.example.com', // Added from develop structure
  apiUrl: 'https://api.example.com',  // TODO: replace with real production API URL
  keycloak: {
    url: 'https://keycloak-26-0-7-vb34.onrender.com/',
    realm: 'elearning',
    clientId: 'elearning-angular'
  }
};