import { TestBed } from '@angular/core/testing';

import { PrematureEmployeeCheckService } from './premature-employee-check.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ConfigService } from '../config/config.service';
import { User } from '@mega/shared/data-model';
import { HttpResponse } from '@angular/common/http';
import { PrematureEmployeeCheckState } from '../../data-model/PrematureEmployeeCheckState';

describe('PrematureEmployeeCheckService', () => {

  let prematureEmployeeCheckService: PrematureEmployeeCheckService;
  let httpTestingController: HttpTestingController;
  let configService: ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    prematureEmployeeCheckService = TestBed.inject(PrematureEmployeeCheckService);
    httpTestingController = TestBed.inject(HttpTestingController);
    configService = TestBed.inject(ConfigService);
  });

  it('#should be created', () => {
    expect(prematureEmployeeCheckService).toBeTruthy();
  });

  it('#add - should return true', (done) => {
    prematureEmployeeCheckService.create(PrematureEmployeeCheckMock)
      .subscribe(success => {
        expect(success).toEqual(true);
        done();
      });

    const testRequest = httpTestingController.expectOne(configService.getBackendUrlWithContext('/prematureemployeecheck/'));
    testRequest.event(new HttpResponse<boolean>({body: true}));
  });


  class PrematureEmployeeCheckMock {

    static reason = 'test-reason';
    static forMonth = '2021-11-01';
    static state: PrematureEmployeeCheckState = undefined;

    static user: User = {
      dbId: 1,
      roles: [],
      email: 'max-muster@gepardec.com',
      firstname: 'Max',
      lastname: 'Muster',
      userId: '011-mmuster'
    };
  }
});
