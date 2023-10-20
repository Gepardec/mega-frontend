import {HttpClient} from '@angular/common/http';
import {registerLocaleData} from '@angular/common';
import localeDeAt from '@angular/common/locales/de-AT';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

registerLocaleData(localeDeAt, 'de-AT');


// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
