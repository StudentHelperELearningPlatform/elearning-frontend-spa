# Keycloak Notes

## Local setup
No docker-compose file lives in this repo. If you have the shared infra compose, spin it up with `docker-compose up -d keycloak` and run the frontend as usual.

## Route protection & token
Route protection is wired through `authGuard` and `roleGuard`. `authGuard` checks `AuthStore.isAuthenticated()` and redirects to `/auth/login` with `returnUrl` set to the current URL when the user is not logged in. `roleGuard` reads `data.roles` from the route, compares it to `AuthStore.role()`, and redirects to `/unauthorized` on a role mismatch.

Token attachment is handled by Keycloak Angular, not our custom interceptor. In `app.config.ts` we register `includeBearerTokenInterceptor` with `INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG`, scoped to `http://localhost:8080/**` and `/api/**`. That adds `Authorization: Bearer <token>` when Keycloak has a token. And yeah, there is a custom `auth.interceptor.ts`, but it is only used in its unit test; runtime uses the Keycloak interceptor.

Auth state comes from `AuthService` plus `AuthStore`. `AuthService` listens to Keycloak auth events, parses the JWT, and pulls roles from `realm_access.roles`. `AuthStore` maps roles to `ADMIN`, `TEACHER`/`PROFESSOR`, or `STUDENT`, and mirrors the access token. But if an API call returns 401/403, `errorInterceptor` logs out and navigates back to `/auth/login`.

One more detail: `AuthService` calls `${keycloak.url}/api/v1/auth/register` and `/api/v1/auth/check-email` for registration and email checks, so those routes expect Keycloak to be reachable.

## UI testing bypass
We set `onLoad: 'check-sso'` (Sprint 4) in the Keycloak init options. That means the app does a silent SSO check via `/silent-check-sso.html` and does not block on a login redirect. So you can bypass auth and test UI components in isolation, even with no auth container running.

## Environment variables
Checked `src/environments/environment.ts`: `keycloak.url` is `https://keycloak-26-0-7-vb34.onrender.com/`, `keycloak.realm` is `elearning`, and `keycloak.clientId` is `elearning-angular`. These match what Backend Team 2 confirmed in Sprint 4.
