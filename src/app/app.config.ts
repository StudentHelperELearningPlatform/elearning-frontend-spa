import { ApplicationConfig, ErrorHandler, provideBrowserGlobalErrorListeners, inject } from '@angular/core';
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
} from 'keycloak-angular';

import { routes } from './app.routes';
import { errorInterceptor } from '@core/interceptors/error.interceptor';
import { loadingInterceptor } from '@core/interceptors/loading.interceptor';
import { GlobalErrorHandler } from '@core/services/error-handler.service';
import { environment } from '../environments/environment';
import { API_URL, CONTENT_API_URL, USER_PLATFORM_API_URL, QUIZ_API_URL, LEARNING_PATH_API_URL } from '@core/tokens/api.token';


import { KeycloakService } from 'keycloak-angular';

const identityHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  // Use localStorage as a stable source for the identity headers 
  // to avoid injecting KeycloakService too early during bootstrap
  const token = localStorage.getItem('access_token');
  
  if (token && (req.url.includes('/api/v1') || req.url.includes(':8081') || req.url.includes(':8082') || req.url.includes(':8083'))) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.sub;
      const roles = payload.realm_access?.roles || [];
      let role = 'STUDENT';
      if (roles.includes('ADMIN')) role = 'ADMIN';
      else if (roles.includes('PROFESSOR') || roles.includes('TEACHER')) role = 'PROFESSOR';
      else if (roles.includes('STUDENT')) role = 'STUDENT';

      const authReq = req.clone({
        setHeaders: {
          'X-User-Id': userId || '',
          'X-User-Role': role,
        },
      });
      return next(authReq);
    } catch (e) {
      return next(req);
    }
  }
  return next(req);
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
    provideHttpClient(withInterceptors([
      identityHeaderInterceptor,
      includeBearerTokenInterceptor, 
      errorInterceptor, 
      loadingInterceptor
    ])),
    KeycloakService,
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: API_URL, useValue: environment.learningPathApiUrl + '/api/v1' },
    { provide: CONTENT_API_URL, useValue: environment.learningPathApiUrl + '/api/v1' },
    { provide: LEARNING_PATH_API_URL, useValue: environment.learningPathApiUrl + '/api/v1' },
    { provide: QUIZ_API_URL, useValue: environment.quizApiUrl + '/api/v1' },
    { provide: USER_PLATFORM_API_URL, useValue: environment.userPlatformApiUrl + '/api/v1' },
    {
      provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
      useValue: [
        createInterceptorCondition<IncludeBearerTokenCondition>({
          urlPattern: /localhost:(8081|8082|8083)\/api\/v1\/.*/i,
          bearerPrefix: 'Bearer',
        }),
      ],
    },
  ],
};
