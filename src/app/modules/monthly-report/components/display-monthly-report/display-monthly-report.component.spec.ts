import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {DisplayMonthlyReportComponent} from './display-monthly-report.component';
import {State} from '../../../shared/models/State';
import {TranslateModule} from '@ngx-translate/core';
import {AngularMaterialModule} from '../../../material/material-module';
import {SharedModule} from '../../../shared/shared.module';
import * as _moment from 'moment';
import {MonthlyReportService} from '../../services/monthly-report.service';
import {MonthlyReportModule} from '../../monthly-report.module';
import {RouterTestingModule} from '@angular/router/testing';
import {OAuthModule} from 'angular-oauth2-oidc';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';

const moment = _moment;

describe('DisplayMonthlyReportComponent', () => {

  let component: DisplayMonthlyReportComponent;
  let fixture: ComponentFixture<DisplayMonthlyReportComponent>;

  let monthlyReportService: MonthlyReportService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayMonthlyReportComponent],
      imports: [
        AngularMaterialModule,
        TranslateModule.forRoot(),
        OAuthModule.forRoot(),
        SharedModule,
        MonthlyReportModule,
        RouterTestingModule,
        NgxSkeletonLoaderModule
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(DisplayMonthlyReportComponent);
      component = fixture.componentInstance;

      monthlyReportService = TestBed.inject(MonthlyReportService);
    });
  }));

  beforeEach(() => {
    component.monthlyReport = {
      employeeCheckState: State.OPEN,
      internalCheckState: State.OPEN,
      otherChecksDone: true,
      comments: [],
      timeWarnings: [
        {date: new Date().toString(), description: []},
      ],
      journeyWarnings: [
        {date: new Date().toString(), warnings: ['Bitte', 'hoer', 'auf']}
      ],
      employee: {
        userId: '000-mustermann',
        firstname: 'Max',
        lastname: 'Mustermann',
        salutation: null,
        releaseDate: '2020-07-01',
        workDescription: '05',
        email: 'mario.aslan@gepardec.com',
        title: null,
        active: true
      },
      assigned: false,
      employeeProgresses: null,
      billableTime: '10:00',
      compensatoryDays: 5,
      homeofficeDays: 3,
      vacationDays: 2,
      paidSickLeave: 2,
      totalWorkingTime: '20:00'
    };
  });

  it('#should create', () => {
    expect(component).toBeTruthy();
  });


  it('#isValidDate - should check if valid date', () => {
    fixture.detectChanges();

    const dateStr = `${DateMock.year}-0${DateMock.month}-01`;
    const isValid = component.isValidDate(dateStr);

    expect(isValid).toBeTrue();
  });

  it('#emitRefreshMonthlyReport - should call emit', () => {
    fixture.detectChanges();

    spyOn(component.refreshMonthlyReport, 'emit').and.stub();

    component.emitRefreshMonthlyReport();

    expect(component.refreshMonthlyReport.emit).toHaveBeenCalled();
  });

  class DateMock {
    static month = 1;
    static year = 2020;
  }
});
