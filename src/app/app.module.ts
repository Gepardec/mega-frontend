import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, LOCALE_ID, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {APP_BASE_HREF, registerLocaleData} from '@angular/common';
import localeDeAt from '@angular/common/locales/de-AT';
import {OAuthModule, OAuthModuleConfig} from 'angular-oauth2-oidc';
import {authConfigFactory} from '@mega/shared/util-auth';
import {ConfigService} from '@mega/shared/data-service';
import {ErrorHandlerService} from './domains/shared/data-service/error/error-handler.service';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import {HeaderComponent, InfoComponent} from '@mega/shared/ui-common';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {RouterModule} from '@angular/router';
import {routes} from './app.routes';

registerLocaleData(localeDeAt, 'de-AT');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    BrowserAnimationsModule,
    NgxSkeletonLoaderModule,
    HeaderComponent,
    InfoComponent,
    MatSnackBarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    MatDialogModule,
    MatButtonModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'},
    {provide: ErrorHandler, useClass: ErrorHandlerService},
    {provide: OAuthModuleConfig, useFactory: authConfigFactory, deps: [ConfigService]},
    {provide: LOCALE_ID, useValue: 'de-AT'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
