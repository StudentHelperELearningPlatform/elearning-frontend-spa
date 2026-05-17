import { ApplicationConfig, ErrorHandler, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors, HttpInterceptorFn } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Lara from '@primeng/themes/lara';
import {
  provideKeycloak,
  createInterceptorCondition,
  IncludeBearerTokenCondition,
  includeBearerTokenInterceptor,
  INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
  KeycloakService,
} from 'keycloak-angular';
import { inject } from '@angular/core';

import { routes } from './app.routes';
import { errorInterceptor } from '@core/interceptors/error.interceptor';
import { loadingInterceptor } from '@core/interceptors/loading.interceptor';
import { GlobalErrorHandler } from '@core/services/error-handler.service';
import { environment } from '../environments/environment';
import { API_URL, CONTENT_API_URL, USER_PLATFORM_API_URL, QUIZ_API_URL, LEARNING_PATH_API_URL, AUTH_API_URL } from '@core/tokens/api.token';

const identityHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  // Only add headers for our own API calls
  const isApiCall =
    req.url.includes('/api/v1') ||
    req.url.includes(':8081') ||
    req.url.includes(':8082') ||
    req.url.includes(':8083');

  if (!isApiCall) {
    return next(req);
  }

  try {
    // Read token from KeycloakService — this is where keycloak-angular actually stores it
    const keycloak = inject(KeycloakService);
    const token = keycloak.getKeycloakInstance()?.token;

    if (!token) {
      return next(req);
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    const userId = payload.sub ?? '';
    const roles: string[] = payload.realm_access?.roles ?? [];

    let role = 'STUDENT';
    if (roles.includes('ADMIN')) role = 'ADMIN';
    else if (roles.includes('PROFESSOR') || roles.includes('TEACHER')) role = 'PROFESSOR';
    else if (roles.includes('STUDENT')) role = 'STUDENT';

    return next(
      req.clone({
        setHeaders: {
          'X-User-Id': userId,
          'X-User-Role': role,
        },
      }),
    );
  } catch {
    // If anything fails (Keycloak not ready, token malformed), just send the request as-is
    return next(req);
  }
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: { preset: Lara, options: { darkModeSelector: 'none' } },
    }),
    provideKeycloak({
      config: {
        url: environment.keycloak.url,
        realm: environment.keycloak.realm,
        clientId: environment.keycloak.clientId,
      },
      initOptions: {
        onLoad: 'check-sso',
        checkLoginIframe: false,
        silentCheckSsoRedirectUri: globalThis.location.origin + '/silent-check-sso.html',
      },
    }),
    provideHttpClient(
      withInterceptors([
        identityHeaderInterceptor,
        includeBearerTokenInterceptor,
        errorInterceptor,
        loadingInterceptor,
      ]),
    ),
    KeycloakService,
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: API_URL, useValue: environment.lessonApiUrl + '/api/v1' },
    { provide: CONTENT_API_URL, useValue: environment.lessonApiUrl + '/api/v1' },
    { provide: LEARNING_PATH_API_URL, useValue: environment.lessonApiUrl + '/api/v1' },
    { provide: QUIZ_API_URL, useValue: environment.quizApiUrl + '/api/v1' },
    { provide: USER_PLATFORM_API_URL, useValue: environment.userPlatformApiUrl + '/api/v1' },
    { provide: AUTH_API_URL, useValue: environment.lessonApiUrl + '/api/v1/auth' },
    {
      provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
      useValue: [
        createInterceptorCondition<IncludeBearerTokenCondition>({
          urlPattern: /(localhost:(8081|8082|8083)|onrender\.com)\/api\/.*/i,
          bearerPrefix: 'Bearer',
        }),
      ],
    },
  ],
};