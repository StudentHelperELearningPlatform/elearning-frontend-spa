import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

(async () => {
  if (typeof window !== 'undefined') {
    const { environment } = await import('./environments/environment');
    if (!environment.production) {
      const { worker } = await import('./mocks/browser');
      await worker.start({ onUnhandledRequest: 'bypass' });
    }
  }
  bootstrapApplication(App, appConfig)
    .catch((err: unknown) => console.error(err));
})();
