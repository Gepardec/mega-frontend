import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {importProvidersFrom, NgModule} from '@angular/core';
import {HttpClient, provideHttpClient} from '@angular/common/http';
import {httpTranslateLoader} from '../../app/app.config';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {provideAnimations} from '@angular/platform-browser/animations';
import {MatNativeDateModule} from '@angular/material/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetModule, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {OAuthModule} from 'angular-oauth2-oidc';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  imports: [TranslateModule.forRoot(
    {
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      },
      defaultLanguage: 'de',
      useDefaultLang: true
    }
  ),
    MatNativeDateModule,
    MatDialogModule,
    MatBottomSheetModule
  ],
  providers: [
    provideHttpClient(),
    provideAnimations(),
    {provide: MatDialogRef, useValue: {}},
    {
      provide: MAT_BOTTOM_SHEET_DATA,
      useValue: {}
    },
    {provide: MatBottomSheetRef, useValue: {}},
    {
      provide: MAT_DIALOG_DATA,
      useValue: {}
    },
    importProvidersFrom(OAuthModule.forRoot()),
    importProvidersFrom(MatSnackBarModule)],
  exports: []
})
export class StorybookMinimalSetupModule {

}
