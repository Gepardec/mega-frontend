import { ComponentFixture, fakeAsync, flush, TestBed, waitForAsync } from '@angular/core/testing';

import { FeatureMonthlyReportComponent } from './feature-monthly-report.component';
import { MonthlyReportService } from '@mega/monthly-report/data-service';
import { MonthlyReport } from '@mega/monthly-report/data-model';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Employee, State } from '@mega/shared/data-model';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { OAuthModule } from 'angular-oauth2-oidc';
import { JourneyCheckComponent } from './journey-check/journey-check.component';
import { DatepickerMonthYearComponent, StateIndicatorComponent } from '@mega/shared/ui-common';
import { EmployeeCheckComponent } from './employee-check/employee-check.component';
import { GeneralInfoComponent } from './general-info/general-info.component';
import { TimeCheckComponent } from './time-check/time-check.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { InformationTopBarComponent } from './information-top-bar/information-top-bar.component';
import { MatDialogModule } from '@angular/material/dialog';

describe('FeatureMonthlyReportComponent', () => {

  let component: FeatureMonthlyReportComponent;
  let fixture: ComponentFixture<FeatureMonthlyReportComponent>;

  let monthlyReportService: MonthlyReportService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        RouterTestingModule,
        OAuthModule.forRoot(),
        ReactiveFormsModule,
        NgxSkeletonLoaderModule,
        FeatureMonthlyReportComponent,
        JourneyCheckComponent,
        StateIndicatorComponent,
        EmployeeCheckComponent,
        GeneralInfoComponent,
        TimeCheckComponent,
        JourneyCheckComponent,
        DatepickerMonthYearComponent,
        InformationTopBarComponent,
        MatDialogModule
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(FeatureMonthlyReportComponent);
      component = fixture.componentInstance;

      monthlyReportService = TestBed.inject(MonthlyReportService);
    });
  }));

  it('#should create', () => {
    expect(component).toBeTruthy();
  });

  it('#afterInit - should call monthlyReportService.getAll', fakeAsync(() => {
    fixture.detectChanges();

    spyOn(monthlyReportService, 'getAll').and.returnValue(of(MonthlyReportServiceMock.monthlyReport));

    component.ngOnInit();
    flush();

    expect(monthlyReportService.getAll).toHaveBeenCalled();
  }));

  it('#getAllTimeEntriesByDate - should call monthlyReportService.getAllByDate', fakeAsync(() => {
    fixture.detectChanges();

    spyOn(monthlyReportService, 'getAllByDate').and.returnValue(of(MonthlyReportServiceMock.monthlyReport));

    component.getAllTimeEntriesByDate(TimeMock.year, TimeMock.month);
    flush();

    expect(monthlyReportService.getAllByDate).toHaveBeenCalled();
  }));

  it('#getAllTimeEntries - should call monthlyReportService.getAll', fakeAsync(() => {
    fixture.detectChanges();

    spyOn(monthlyReportService, 'getAll').and.returnValue(of(MonthlyReportServiceMock.monthlyReport));

    component.getAllTimeEntries();
    flush();

    expect(monthlyReportService.getAll).toHaveBeenCalled();
  }));

  class EmployeeMock {
    static employee: Employee = {
      email: 'LIW-Microservices',
      active: true,
      firstname: 'Max',
      lastname: 'Muster',
      releaseDate: '2021-10-01',
      salutation: 'Herr',
      title: 'MSc',
      userId: '011-mmuster',
      workDescription: 'Software-Engineer'
    };
  }

  class MonthlyReportServiceMock {

    static monthlyReport: MonthlyReport = {
      internalCheckState: State.OPEN,
      initialDate: null,
      vacationDays: 1,
      paidSickLeave: 1,
      totalWorkingTime: '08:00',
      timeWarnings: [],
      otherChecksDone: true,
      journeyWarnings: [],
      homeofficeDays: 2,
      employeeProgresses: [],
      employeeCheckState: '',
      employee: EmployeeMock.employee,
      billableTime: '',
      compensatoryDays: 5,
      comments: [],
      vacationDayBalance: 0,
      overtime: 3,
      prematureEmployeeCheck: undefined,
      guildLead: 'Guild Lead',
      internalProjectLead: 'Internal Project Lead'
    };
  }

  class TimeMock {
    static year = 2020;
    static month = 2;
  }
});
