import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideEchartsCore } from 'ngx-echarts';

(async () => {
  if (typeof window !== 'undefined') {
// MSW disabled to allow real backend integration
/*
const { environment } = await import('./environments/environment');
if (!environment.production) {
  const { worker } = await import('./mocks/browser');
  await worker.start({ onUnhandledRequest: 'bypass' });
}
*/
}

bootstrapApplication(App, {
...appConfig,
providers: [
  ...(appConfig.providers ?? []),
  provideEchartsCore({
    echarts: () => import('echarts')
  })
]
})
.catch((err: unknown) => console.error(err));
})();