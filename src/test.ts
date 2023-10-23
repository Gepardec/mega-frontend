// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/testing';
import {getTestBed} from '@angular/core/testing';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import localeDeAt from '@angular/common/locales/de-AT';
import {registerLocaleData} from '@angular/common';

registerLocaleData(localeDeAt, 'de-AT');

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
