import {ComponentFixture, fakeAsync, flush, TestBed, waitForAsync} from '@angular/core/testing';

import {ProjectOverviewCardComponent} from './project-overview-card.component';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ProjectManagementService} from '@mega/project-management/data-service';
import {ConfigService, ProjectCommentService, SnackbarService} from '@mega/shared/data-service';
import {Config, Employee, ManagementEntry, ProjectComment, ProjectState, State} from '@mega/shared/data-model';
import {of} from 'rxjs';
import {ProjectManagementEntry} from '@mega/project-management/data-model';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';

describe('ProjectOverviewCardComponent', () => {

  let component: ProjectOverviewCardComponent;
  let fixture: ComponentFixture<ProjectOverviewCardComponent>;

  let configService: ConfigService;
  let projectManagementService: ProjectManagementService;
  let projectCommentService: ProjectCommentService;
  let translateService: TranslateService;
  let snackbarService: SnackbarService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        RouterTestingModule,
        NgxSkeletonLoaderModule,
        ProjectOverviewCardComponent,
        MatSnackBarModule,
        MatBottomSheetModule
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ProjectOverviewCardComponent);
      component = fixture.componentInstance;

      configService = TestBed.inject(ConfigService);
      projectManagementService = TestBed.inject(ProjectManagementService);
      projectCommentService = TestBed.inject(ProjectCommentService);
      translateService = TestBed.inject(TranslateService);
      snackbarService = TestBed.inject(SnackbarService);
    });
  }));

  it('#should create', () => {
    expect(component).toBeTruthy();
  });

  it('#afterInit - should call projectManagementService.getEntries and projectCommentService.get', fakeAsync(() => {
    fixture.detectChanges();

    spyOn(projectManagementService, 'getEntries').and.returnValue(of(ProjectManagementEntryMock.projectManagementEntries));
    spyOn(projectCommentService, 'get').and.returnValue(of(ProjectCommentMock.projectComment));

    component.ngOnInit();
    flush();

    expect(projectManagementService.getEntries).toHaveBeenCalled();
    expect(projectCommentService.get).toHaveBeenCalled();
  }));

  it('#afterDestroy - should call dateSelectionSub.unsubscribe', fakeAsync(() => {
    fixture.detectChanges();

    spyOn(component.dateSelectionSub, 'unsubscribe').and.callThrough();

    component.ngOnDestroy();
    flush();

    expect(component.dateSelectionSub.unsubscribe).toHaveBeenCalled();
  }));

  it('#areAllEmployeeChecksDone - should check if all employees are checked', () => {
    fixture.detectChanges();

    const checkDone: ProjectState = component.areAllEmployeeChecksDone(ProjectManagementEntryMock.projectManagementEntries[0]);

    expect(checkDone).toEqual(ProjectState.DONE);
  });

  it('#onStartEditing - should set forProjectName and showCommentEditor', () => {
    fixture.detectChanges();

    expect(component.forProjectName).not.toEqual(ProjectCommentMock.projectName);
    expect(component.showCommentEditor).toBeFalse();

    component.onStartEditing(ProjectCommentMock.projectName);

    expect(component.forProjectName).toEqual(ProjectCommentMock.projectName);
    expect(component.showCommentEditor).toBeTrue();
  });

  it('#onCommentChange - should call projectCommentService.update and call snackbarService.showSnackbarWithMessage', fakeAsync(() => {
    fixture.detectChanges();

    spyOn(projectCommentService, 'update').and.returnValue(of(false));
    spyOn(snackbarService, 'showSnackbarWithMessage').and.stub();

    const projectManagementEntry: ProjectManagementEntry = ProjectManagementEntryMock.projectManagementEntries[0];
    projectManagementEntry.projectComment = ProjectCommentMock.projectComment;

    component.onCommentChange(projectManagementEntry, ProjectCommentMock.projectComment2.comment);
    flush();

    expect(projectCommentService.update).toHaveBeenCalled();
    expect(snackbarService.showSnackbarWithMessage).toHaveBeenCalled();
  }));

  it('#onCommentChange - should set right clicked to true and call snackbarService.showSnackbarWithMessage', fakeAsync(() => {
    fixture.detectChanges();

    spyOn(projectCommentService, 'update').and.returnValue(of(false));
    spyOn(snackbarService, 'showSnackbarWithMessage').and.stub();

    const pmEntry = ProjectManagementEntryMock.projectManagementEntries[0];
    pmEntry.projectComment = ProjectCommentMock.projectComment;

    component.onCommentChange(pmEntry, ProjectCommentMock.comment);

    expect(snackbarService.showSnackbarWithMessage).toHaveBeenCalled();
  }));

  it('#getTooltipText - should getTooltipText', () => {
    fixture.detectChanges();

    const toolTipText = component.getTooltipText(ProjectState.DONE);

    expect(toolTipText).toEqual(translateService.instant('STATE.' + ProjectState.DONE));
  });

  class ProjectCommentMock {

    static comment: string = 'this is a comment';
    static anotherComment: string = 'another comment';
    static monthYear: string = '2021-11';
    static projectName: string = 'LIW-Microservices'

    static projectComment: ProjectComment = {
      comment: ProjectCommentMock.comment,
      projectName: ProjectCommentMock.projectName,
      id: 1,
      date: '2021-11-23'
    }

    static projectComment2: ProjectComment = {
      comment: ProjectCommentMock.anotherComment,
      projectName: ProjectCommentMock.projectName,
      id: 1,
      date: '2021-11-23'
    }
  }

  class ConfigMock {

    static frontendOriginSegment: number = 9876;
    static context: string = '/context/employee'

    static config: Config = {
      budgetCalculationExcelUrl: 'budgetCalculationExcelUrl',
      clientId: 'clientId',
      issuer: 'issuer',
      scope: 'scope',
      version: 'version',
      zepOrigin: 'zepOrigin'
    }
  }

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

  class ManagementEntryMock {
    static managementEntries: Array<ManagementEntry> = [
      {
        employee: EmployeeMock.employee,
        internalCheckState: State.DONE,
        employeeCheckState: State.DONE,
        projectCheckState: State.DONE,
        billableTime: '15',
        employeeProgresses: null,
        entryDate: '2021-10-2',
        finishedComments: 11,
        nonBillableTime: '15',
        totalComments: 22,
        percentageOfHoursSpentInThisProject: 11
      },
      {
        employee: EmployeeMock.employee,
        internalCheckState: State.DONE,
        employeeCheckState: State.DONE,
        projectCheckState: State.DONE,
        billableTime: '15',
        employeeProgresses: null,
        entryDate: '2021-10-2',
        finishedComments: 11,
        nonBillableTime: '15',
        totalComments: 22,
        percentageOfHoursSpentInThisProject: 11
      },
      {
        employee: EmployeeMock.employee,
        internalCheckState: State.DONE,
        employeeCheckState: State.DONE,
        projectCheckState: State.DONE,
        billableTime: '15',
        employeeProgresses: null,
        entryDate: '2021-10-2',
        finishedComments: 11,
        nonBillableTime: '15',
        totalComments: 22,
        percentageOfHoursSpentInThisProject: 11
      },
    ];
  }

  class ProjectManagementEntryMock {
    static projectManagementEntries: Array<ProjectManagementEntry> = [
      {
        entries: ManagementEntryMock.managementEntries,
        controlProjectState: ProjectState.DONE,
        controlBillingState: ProjectState.DONE,
        projectName: 'LIW-Allgemein',
        aggregatedBillableWorkTimeInSeconds: 10000,
        aggregatedNonBillableWorkTimeInSeconds: 3000,
        projectComment: null,
        presetControlProjectState: false,
        presetControlBillingState: true
      }
    ];
  }
});
