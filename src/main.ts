import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app.config';
import { AppComponent } from './app.component';
import { environment } from './environments/environment';

async function bootstrap(): Promise<void> {
  // Start MSW mock service worker in development (S1-08, owned by D5)
  if (environment.useMocks) {
    const { worker } = await import('./mocks/browser');
    await worker.start({ onUnhandledRequest: 'bypass' });
  }

  bootstrapApplication(AppComponent, appConfig).catch((err) =>
    console.error('Bootstrap error:', err)
  );
}

bootstrap();
