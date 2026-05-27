import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideEchartsCore } from 'ngx-echarts';

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