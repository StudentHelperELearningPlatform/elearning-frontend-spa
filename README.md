# Elearning Frontend SPA

Staging URL: https://staging.elearning-platform.example.com
Production URL: https://elearning-platform.example.com

## Staging URL
The staging URL is defined in the GitHub workflow environment (deploy-staging.yml). The deploy job is a placeholder and no deployment target is configured.

## Overview
- Angular 21 standalone app
- State: NgRx SignalStore + Angular signals
- Auth: keycloak-angular with silent SSO (check-sso)
- UI: PrimeNG (Lara), ngx-echarts, d3
- API base: /api/v1 via environment.apiBase
- MSW mocks in non-production builds

## Local development
```bash
npm install
npm run start
```
Open http://localhost:4200.

### Mock API (MSW)
In non-production builds (environment.production = false), main.ts starts MSW with handlers in src/mocks/handlers. Unhandled requests are bypassed.

### Auth notes
Keycloak config comes from src/environments/*. The repo does not include a docker-compose file for Keycloak. The app uses silent SSO via /silent-check-sso.html.

## Scripts
```bash
npm run start
npm run build -- --configuration production
npm run build -- --configuration staging
npm run test
npm run lint
```

## Documentation
- docs/AUTH.md
- docs/ENVIRONMENT.md
- docs/STATE_MANAGEMENT.md
- FRONTEND_CONTRACT.md
- docs/DEPLOY_CHECKLIST.md
