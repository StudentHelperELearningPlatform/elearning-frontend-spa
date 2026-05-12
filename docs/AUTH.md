# Authentication and Authorization

## Keycloak initialization
- app.config.ts uses provideKeycloak with environment.keycloak.url, realm, and clientId.
- initOptions: onLoad "check-sso", silentCheckSsoRedirectUri <origin>/silent-check-sso.html.
- HTTP interceptors: includeBearerTokenInterceptor, errorInterceptor, loadingInterceptor.
- includeBearerTokenInterceptor attaches Authorization: Bearer for http://localhost:8080/** and /api/**.

## Auth service (src/app/core/services/auth.service.ts)
- Uses keycloak-js instance injected via keycloak-angular.
- Syncs user on onAuthSuccess, onAuthRefreshSuccess, onAuthLogout.
- Parses JWT for email/preferred_username and realm_access.roles.
- login() redirects to Keycloak with loginHint; logout() redirects to origin.
- register() and checkEmailAvailability() call /api/v1/auth/* on environment.keycloak.url.

## Auth store (src/app/features/auth/store/auth.store.ts)
- Mirrors AuthService signals into local state.
- isAuthenticated is derived from token presence.
- Maps roles to ADMIN, TEACHER (also PROFESSOR), or STUDENT.
- Sets avatar using a dicebear URL seeded with the user email.

## Route protection
- authGuard redirects to /auth/login with returnUrl when unauthenticated.
- roleGuard checks route data roles and redirects to /unauthorized.
- Role-protected routes: /student (STUDENT), /teacher (TEACHER), /admin (ADMIN).
- Auth-only routes: /profile.

## Error handling
- errorInterceptor logs out on 401/403 and navigates to /auth/login.
- NotificationService displays the error message.

## Custom auth interceptor
- auth.interceptor.ts exists but is not registered in app.config.ts.
