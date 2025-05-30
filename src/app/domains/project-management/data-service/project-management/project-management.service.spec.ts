import {TestBed} from '@angular/core/testing';

import {ProjectManagementService} from './project-management.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ConfigService} from '@mega/shared/data-service';
import {Employee, ManagementEntry, PmProgress, ProjectState, State} from '@mega/shared/data-model';
import {ProjectManagementEntry} from '@mega/project-management/data-model';

describe('ProjectManagementService', () => {

  let projectManagementService: ProjectManagementService;
  let httpTestingController: HttpTestingController;
  let configService: ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    projectManagementService = TestBed.inject(ProjectManagementService);
    httpTestingController = TestBed.inject(HttpTestingController);
    configService = TestBed.inject(ConfigService);
  });

  it('#should be created', () => {
    expect(projectManagementService).toBeTruthy();
  });

  it('#getEntries - should return entries', (done) => {
    projectManagementService.getEntries(ProjectManagementMock.year, ProjectManagementMock.month, false)
      .subscribe(projectManagementEntries => {
        expect(projectManagementEntries).toEqual(ProjectManagementMock.projectManagementEntries);
        done();
      });

    const testRequest = httpTestingController.expectOne(
      configService.getBackendUrlWithContext(`/management/projectmanagemententries/${ProjectManagementMock.year}/${ProjectManagementMock.month}?all=false`));
    testRequest.flush(ProjectManagementMock.projectManagementEntries);
  });

  it('#getEntries - should set all to true', (done) => {
    projectManagementService.getEntries(ProjectManagementMock.year, ProjectManagementMock.month, true)
      .subscribe(projectManagementEntries => {
        expect(projectManagementEntries).toEqual(ProjectManagementMock.projectManagementEntries);
        done();
      });

    const testRequest = httpTestingController.expectOne(
      configService.getBackendUrlWithContext(`/management/projectmanagemententries/${ProjectManagementMock.year}/${ProjectManagementMock.month}?all=true`));
    testRequest.flush(ProjectManagementMock.projectManagementEntries);
  });

  class ProjectManagementMock {

    static year: number = 2021;
    static month: number = 10;

    private static email: string = 'max.muster@gepardec.com';
    private static firstname: string = 'Max';
    private static lastname: string = 'Muster';
    private static project: string = 'LIW-Microservices';

    static employeeProgresses: Array<PmProgress> = [
      {
        firstname: ProjectManagementMock.firstname,
        lastname: ProjectManagementMock.lastname,
        state: State.DONE,
        assigneeEmail: ProjectManagementMock.email,
        project: ProjectManagementMock.project,
        stepId: 1
      }
    ];

    static employee: Employee = {
      email: ProjectManagementMock.email,
      active: true,
      firstname: ProjectManagementMock.firstname,
      lastname: ProjectManagementMock.lastname,
      releaseDate: '2021-10-01',
      salutation: 'Herr',
      title: 'MSc',
      userId: '011-mmuster',
      workDescription: 'Software-Engineer'
    };

    static managementEntries: Array<ManagementEntry> = [
      {
        employee: ProjectManagementMock.employee,
        internalCheckState: State.DONE,
        employeeCheckState: State.DONE,
        projectCheckState: State.DONE,
        billableTime: '14',
        employeeProgresses: ProjectManagementMock.employeeProgresses,
        entryDate: '2021-10-01',
        finishedComments: 10,
        nonBillableTime: '14',
        totalComments: 20,
        percentageOfHoursSpentInThisProject: 11
      }
    ];

    static projectManagementEntries: Array<ProjectManagementEntry> = [
      {
        entries: ProjectManagementMock.managementEntries,
        controlProjectState: ProjectState.DONE,
        controlBillingState: ProjectState.DONE,
        projectName: ProjectManagementMock.project,
        aggregatedBillableWorkTimeInSeconds: 10000,
        aggregatedNonBillableWorkTimeInSeconds: 3000,
        projectComment: null,
        presetControlProjectState: false,
        presetControlBillingState: true
      }
    ]
  }
});
