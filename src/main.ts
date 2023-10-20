import {enableProdMode, ErrorHandler, importProvidersFrom, LOCALE_ID} from '@angular/core';

import {httpTranslateLoader} from './app/app.config';
import {environment} from './environments/environment';
import {AppComponent} from './app/app.component';
import {routes} from './app/app.routes';
import {provideRouter} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import {provideAnimations} from '@angular/platform-browser/animations';
import {HttpClient, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {bootstrapApplication, BrowserModule} from '@angular/platform-browser';
import {ConfigService} from '@mega/shared/data-service';
import {authConfigFactory} from '@mega/shared/util-auth';
import {OAuthModule, OAuthModuleConfig} from 'angular-oauth2-oidc';
import {ErrorHandlerService} from './app/domains/shared/data-service/error/error-handler.service';
import {APP_BASE_HREF} from '@angular/common';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      OAuthModule.forRoot(),
      NgxSkeletonLoaderModule,
      MatSnackBarModule,
      TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: httpTranslateLoader,
            deps: [HttpClient]
          }
        }
      ),
      MatDialogModule,
      MatButtonModule
    ),
    {provide: APP_BASE_HREF, useValue: '/'},
    {provide: ErrorHandler, useClass: ErrorHandlerService},
    {provide: OAuthModuleConfig, useFactory: authConfigFactory, deps: [ConfigService]},
    {provide: LOCALE_ID, useValue: 'de-AT'},
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideRouter(routes)
  ]
})
  .catch(err => console.error(err));
