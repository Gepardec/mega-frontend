import {TestBed} from '@angular/core/testing';

import {StepEntriesService} from './step-entries.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ConfigService} from '../config/config.service';
import {Employee, State, Step} from '@mega/shared/data-model';
import {HttpResponse} from '@angular/common/http';

describe('StepentriesService', () => {

  let stepentriesService: StepEntriesService;
  let httpTestingController: HttpTestingController;
  let configService: ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    stepentriesService = TestBed.inject(StepEntriesService);
    httpTestingController = TestBed.inject(HttpTestingController);
    configService = TestBed.inject(ConfigService);
  });

  it('#should be created', () => {
    expect(stepentriesService).toBeTruthy();
  });

  it('#close - should return true', (done) => {
    stepentriesService.close(StepentriesMock.employee, Step.CONTROL_INTERNAL_TIMES, StepentriesMock.monthYear)
      .subscribe(success => {
        expect(success).toEqual(true);
        done();
      });

    const testRequest = httpTestingController.expectOne(configService.getBackendUrlWithContext('/stepentry/close'));
    testRequest.event(new HttpResponse<boolean>({body: true}));
  });

  it('#updateEmployeeStateForOffice - should return true', (done) => {
    stepentriesService.updateEmployeeStateForOffice(StepentriesMock.employee, Step.CONTROL_INTERNAL_TIMES, StepentriesMock.monthYear, State.DONE)
      .subscribe(success => {
        expect(success).toEqual(true);
        done();
      });

    const testRequest = httpTestingController.expectOne(configService.getBackendUrlWithContext('/stepentry/updateEmployeeStateForOffice'));
    testRequest.event(new HttpResponse<boolean>({body: true}));
  });

  it('#updateEmployeeStateForProject - should return true', (done) => {
    stepentriesService.updateEmployeeStateForProject(StepentriesMock.employee, StepentriesMock.projectName, StepentriesMock.monthYear, State.DONE)
      .subscribe(success => {
        expect(success).toEqual(true);
        done();
      });

    const testRequest = httpTestingController.expectOne(configService.getBackendUrlWithContext('/stepentry/updateEmployeeStateForProject'));
    testRequest.event(new HttpResponse<boolean>({body: true}));
  });

  class StepentriesMock {

    static projectName: string = 'LIW-Microservices';
    static monthYear: string = '2021-11';

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
  }
});
