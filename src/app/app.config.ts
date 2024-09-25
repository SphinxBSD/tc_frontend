import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, HTTP_INTERCEPTORS, withInterceptorsFromDi } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AuthInterceptor } from './interceptors/auth.interceptor';

import { routes } from './app.routes';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(
      RecaptchaV3Module,
    ),
    {provide: RECAPTCHA_V3_SITE_KEY, useValue: '6Ldnd0gqAAAAAHxgZY6jRZdCviiroG5eLNJF0UgV'},
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    provideHttpClient(withInterceptorsFromDi())

  ]
};
