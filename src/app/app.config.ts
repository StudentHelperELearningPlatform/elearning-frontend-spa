import { ApplicationConfig, ErrorHandler, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
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
        silentCheckSsoRedirectUri: globalThis.location.origin + '/silent-check-sso.html',
      },
    }),
    provideHttpClient(withInterceptors([includeBearerTokenInterceptor, errorInterceptor, loadingInterceptor])),
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: API_URL, useValue: environment.learningPathApiUrl + '/api/v1' }, // Backward compatibility
    { provide: CONTENT_API_URL, useValue: environment.learningPathApiUrl + '/api/v1' },
    { provide: LEARNING_PATH_API_URL, useValue: environment.learningPathApiUrl + '/api/v1' },
    { provide: QUIZ_API_URL, useValue: environment.quizApiUrl + '/api/v1' },
    { provide: USER_PLATFORM_API_URL, useValue: environment.userPlatformApiUrl + '/api/v1' },
    {
      provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
      useValue: [
        createInterceptorCondition<IncludeBearerTokenCondition>({
          urlPattern: /^http:\/\/localhost:8082\/api\/v1\/(?!users).*/i,
          bearerPrefix: 'Bearer',
        }),
      ],
    },

  ],
};
