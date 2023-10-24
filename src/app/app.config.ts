import {HttpClient, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {APP_BASE_HREF, registerLocaleData} from '@angular/common';
import localeDeAt from '@angular/common/locales/de-AT';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {ApplicationConfig, ErrorHandler, importProvidersFrom, LOCALE_ID} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {OAuthModule, OAuthModuleConfig} from 'angular-oauth2-oidc';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {MatDialogModule} from '@angular/material/dialog';
import {ErrorHandlerService} from './domains/shared/data-service/error/error-handler.service';
import {authConfigFactory} from '@mega/shared/util-auth';
import {ConfigService} from '@mega/shared/data-service';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {MatMomentDateModule} from '@angular/material-moment-adapter';

registerLocaleData(localeDeAt, 'de-AT');


// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      BrowserModule,
      MatMomentDateModule,
      MatSnackBarModule,
      NgxSkeletonLoaderModule,
      MatDialogModule,
      OAuthModule.forRoot(),
      TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: httpTranslateLoader,
            deps: [HttpClient]
          }
        }
      )
    ),
    {provide: LOCALE_ID, useValue: 'de-AT'},
    {provide: APP_BASE_HREF, useValue: '/'},
    {provide: ErrorHandler, useClass: ErrorHandlerService},
    {provide: OAuthModuleConfig, useFactory: authConfigFactory, deps: [ConfigService]},
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideRouter(routes)
  ]
};
