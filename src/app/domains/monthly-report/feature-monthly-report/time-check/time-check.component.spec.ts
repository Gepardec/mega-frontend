import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {TimeCheckComponent} from './time-check.component';
import {TranslateModule} from '@ngx-translate/core';
import {TimeWarning} from '@mega/monthly-report/data-model';
import {configuration} from '@mega/shared/util-constant';

import * as _moment from 'moment';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';

const moment = _moment;

describe('TimeCheckComponent', () => {

  let component: TimeCheckComponent;
  let fixture: ComponentFixture<TimeCheckComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        NgxSkeletonLoaderModule,
        TimeCheckComponent
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(TimeCheckComponent);
      component = fixture.componentInstance;
    })
  }));

  it('#should create', () => {
    expect(component).toBeTruthy();
  });

  class TimeWarningMock {
    static timewarning: TimeWarning = {
      date: moment().format(configuration.dateFormat),
      description: []
    }

    static timewarningWithWarnings: TimeWarning = {
      date: moment().format(configuration.dateFormat),
      description: ['hey', 'you', 'do', 'something'],
    }
  }
});
