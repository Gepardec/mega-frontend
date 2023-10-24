import {TestBed} from '@angular/core/testing';

import {MonthlyReportService} from './monthly-report.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {MonthlyReport} from '@mega/monthly-report/data-model';
import {Employee, State} from '@mega/shared/data-model';
import {ConfigService} from '@mega/shared/data-service';

describe('MonthlyReportService', () => {

  let monthlyReportService: MonthlyReportService;
  let httpTestingController: HttpTestingController;
  let configService: ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });

    monthlyReportService = TestBed.inject(MonthlyReportService);
    httpTestingController = TestBed.inject(HttpTestingController);
    configService = TestBed.inject(ConfigService);
  });

  it('#should be created', () => {
    expect(monthlyReportService).toBeTruthy();
  });

  it('#getAll - should return MonthlyReport', (done) => {
    monthlyReportService.getAll()
      .subscribe(monthlyReport => {
        expect(monthlyReport).toEqual(MonthlyReportMock.monthlyReport);
        done();
      });

    const testResult = httpTestingController.expectOne(configService.getBackendUrlWithContext('/worker/monthendreports'));
    testResult.flush(MonthlyReportMock.monthlyReport);
  });

  it('#getAll - should return MonthlyReport by Date', (done) => {
    monthlyReportService.getAllByDate(MonthlyReportMock.year, MonthlyReportMock.month)
      .subscribe(monthlyReport => {
        expect(monthlyReport).toEqual(MonthlyReportMock.monthlyReport);
        done();
      });

    const testResult = httpTestingController.expectOne(
      configService.getBackendUrlWithContext('/worker/monthendreports/' + MonthlyReportMock.year + '/' + MonthlyReportMock.month));

    testResult.flush(MonthlyReportMock.monthlyReport);
  });

  class MonthlyReportMock {

    static year = 2021;
    static month = 11;

    static employee: Employee = {
      email: 'max-muster@gepardec.com',
      active: true,
      firstname: 'Max',
      lastname: 'Muster',
      releaseDate: '2021-10-01',
      salutation: 'Herr',
      title: 'MSc',
      userId: '011-mmuster',
      workDescription: 'Software-Engineer'
    };

    static monthlyReport: MonthlyReport = {
      internalCheckState: State.OPEN,
      initialDate: null,
      assigned: true,
      billableTime: '10:15',
      comments: null,
      compensatoryDays: 2,
      employee: MonthlyReportMock.employee,
      employeeCheckState: 'done',
      employeeProgresses: null,
      homeofficeDays: 3,
      journeyWarnings: null,
      otherChecksDone: true,
      timeWarnings: null,
      totalWorkingTime: '10:15',
      vacationDays: 3,
      paidSickLeave: 2,
      vacationDayBalance: 10
    };
  }
});
