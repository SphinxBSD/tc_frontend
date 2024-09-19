import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(
      RecaptchaV3Module,
    ),
    {provide: RECAPTCHA_V3_SITE_KEY, useValue: '6Ldnd0gqAAAAAHxgZY6jRZdCviiroG5eLNJF0UgV'}
  ]
};
