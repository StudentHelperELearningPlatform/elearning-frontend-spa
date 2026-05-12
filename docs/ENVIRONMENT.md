# Environment configuration

## Files and values
| File | production | apiBase | apiUrl | keycloak.url | keycloak.realm | keycloak.clientId |
| --- | --- | --- | --- | --- | --- | --- |
| src/environments/environment.ts | true | /api/v1 | https://api.example.com | https://keycloak-26-0-7-vb34.onrender.com/ | elearning | elearning-angular |
| src/environments/environment.development.ts | false | /api/v1 | http://localhost:8080 | https://keycloak-26-0-7-vb34.onrender.com/ | elearning | elearning-angular |
| src/environments/environment.staging.ts | false | /api/v1 | https://staging-api.elearning.com | https://staging-auth.elearning.com | elearning | elearning-spa |
| src/environments/environment.production.ts | true | /api/v1 | https://api.elearning.com | https://auth.elearning.com | elearning | elearning-spa |

## Notes
- apiBase is used by all app HTTP calls (stores and services) and is /api/v1 across environments.
- apiUrl is defined in environment files but is not referenced in the app.
- environment.ts (default import) sets production true and apiUrl https://api.example.com with a TODO comment in code.
- main.ts starts MSW only when environment.production is false.
- No runtime environment variable usage was found; values are compiled from environment files.
