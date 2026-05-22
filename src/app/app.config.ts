import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(), provideRouter(routes),
  provideToastr({
    timeOut: 2000,
    positionClass: 'toast-bottom-right',
    preventDuplicates: true,
  }),
  provideHttpClient(withInterceptors([authInterceptor]), withFetch())
  ],
};
