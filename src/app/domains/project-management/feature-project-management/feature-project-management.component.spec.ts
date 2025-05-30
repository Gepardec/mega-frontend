import { ComponentFixture, fakeAsync, flush, TestBed, waitForAsync } from '@angular/core/testing';

import { FeatureProjectManagementComponent } from './feature-project-management.component';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import * as _moment from 'moment';
import {
  CommentService,
  ConfigService,
  ProjectCommentService,
  ProjectEntriesService,
  SnackbarService,
  StepEntriesService
} from '@mega/shared/data-service';
import { of } from 'rxjs';
import { ProjectManagementService } from '@mega/project-management/data-service';
import {
  Comment,
  Employee,
  ManagementEntry,
  PmProgress,
  ProjectComment,
  ProjectState,
  State
} from '@mega/shared/data-model';
import { ProjectManagementEntry, ProjectManagementEntryViewModel } from '@mega/project-management/data-model';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { OAuthModule } from 'angular-oauth2-oidc';
import { MatSelectChange } from '@angular/material/select';
import { DatepickerMonthYearComponent, ProjectStateSelectComponent } from '@mega/shared/ui-common';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { configuration } from '@mega/shared/util-constant';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const moment = _moment;
const DATE_FORMAT: string = configuration.dateFormat;

describe('FeatureProjectManagementComponent', () => {

  let component: FeatureProjectManagementComponent;
  let fixture: ComponentFixture<FeatureProjectManagementComponent>;

  let dialog: MatDialog;
  let configService: ConfigService;
  let pmService: ProjectManagementService;
  let commentService: CommentService;
  let stepentryService: StepEntriesService;
  let projectEntryService: ProjectEntriesService;
  let snackbarService: SnackbarService;
  let projectCommentService: ProjectCommentService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        BrowserAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        OAuthModule.forRoot(),
        ReactiveFormsModule,
        NgxSkeletonLoaderModule,
        FeatureProjectManagementComponent,
        DatepickerMonthYearComponent,
        MatDialogModule,
        MatSnackBarModule
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(FeatureProjectManagementComponent);
      component = fixture.componentInstance;

      dialog = TestBed.inject(MatDialog);
      configService = TestBed.inject(ConfigService);
      pmService = TestBed.inject(ProjectManagementService);
      commentService = TestBed.inject(CommentService);
      stepentryService = TestBed.inject(StepEntriesService);
      projectEntryService = TestBed.inject(ProjectEntriesService);
      snackbarService = TestBed.inject(SnackbarService);
      projectCommentService = TestBed.inject(ProjectCommentService);
    });
  }));

  it('#should create', () => {
    expect(component).toBeTruthy();
  });

  it('#getDate - should return selected date with first day of month', () => {
    fixture.detectChanges();

    component.selectedYear = moment().year();
    component.selectedMonth = moment().month();

    expect(component.date).toEqual(moment().date(1).startOf('day'));
  });

  it('#afterInit - should call pmService.getEntries and set selectedYear and selectedMonth', fakeAsync(() => {
    fixture.detectChanges();

    spyOn(pmService, 'getEntries').and.returnValue(of(ProjectManagementMock.projectManagementEntries));

    component.dateChanged(moment());
    flush();

    expect(pmService.getEntries).toHaveBeenCalled();
    expect(component.selectedYear).toBeTruthy();
    expect(component.selectedMonth).toBeTruthy();
  }));

  it('#areAllSelected - should return true', () => {
    fixture.detectChanges();

    const pmEntry = ProjectManagementMock.projectManagementEntries[0];
    pmEntry.entries = new Array<ManagementEntry>(ProjectManagementMock.projectManagementEntries[0].entries[0]);
    component.pmEntries = new Array<ProjectManagementEntry>(pmEntry);

    const selectionModel = new SelectionModel<ManagementEntry>();
    selectionModel.select(ProjectManagementMock.projectManagementEntries[0].entries[0]);

    component.pmSelectionModels = new Map<string, SelectionModel<ManagementEntry>>();
    component.pmSelectionModels.set(ProjectManagementMock.project, selectionModel);

    spyOn(component.pmSelectionModels, 'get').and.returnValue(selectionModel);

    const areAllSelected = component.areAllSelected(ProjectManagementMock.project);

    expect(areAllSelected).toBeTrue();
  });

  it('#masterToggle - should clear selection model', () => {
    fixture.detectChanges();

    const pmEntry = ProjectManagementMock.projectManagementEntries[0];
    pmEntry.entries = new Array<ManagementEntry>(ProjectManagementMock.projectManagementEntries[0].entries[0]);
    component.pmEntries = new Array<ProjectManagementEntry>(pmEntry);

    component.pmSelectionModels = new Map<string, SelectionModel<ManagementEntry>>();
    component.pmSelectionModels.set(ProjectManagementMock.project, new SelectionModel<ManagementEntry>());

    const selectionModel = new SelectionModel<ManagementEntry>();

    selectionModel.select(ProjectManagementMock.projectManagementEntries[0].entries[0]);
    spyOn(component.pmSelectionModels, 'get').and.returnValue(selectionModel);

    component.masterToggle(ProjectManagementMock.project);

    expect(component.pmSelectionModels.get(ProjectManagementMock.project).selected.length).toBe(0);
  });

  it('#openDialog - should call commentService.getCommentsForEmployee and dialog.open', fakeAsync(() => {
    fixture.detectChanges();

    spyOn(commentService, 'getCommentsForEmployee').and.returnValue(of(CommentsMock.get()));
    spyOn(dialog, 'open').and.callThrough();

    component.openDialog(EmployeeMock.employee, ProjectManagementMock.project);
    flush();

    expect(dialog.open).toHaveBeenCalled();
  }));

  it('#isAnySelected - should return true', () => {
    fixture.detectChanges();

    component.pmEntries = ProjectManagementMock.projectManagementEntries;

    component.pmSelectionModels = new Map<string, SelectionModel<ManagementEntry>>();
    const selectionModel = new SelectionModel<ManagementEntry>();
    selectionModel.select(ProjectManagementMock.projectManagementEntries[0].entries[0]);
    component.pmSelectionModels.set(ProjectManagementMock.project, selectionModel);

    const isAnySelected = component.isAnySelected();

    expect(isAnySelected).toBeTrue();
  });

  it('#areAllProjectCheckStatesDone - should return true', () => {
    fixture.detectChanges();

    component.pmEntries = ProjectManagementMock.projectManagementEntries;

    component.pmSelectionModels = new Map<string, SelectionModel<ManagementEntry>>();
    const selectionModel = new SelectionModel<ManagementEntry>();
    selectionModel.select(ProjectManagementMock.projectManagementEntries[0].entries[0]);
    component.pmSelectionModels.set(ProjectManagementMock.project, selectionModel);

    const projectToCheck = component.pmEntries.find(entry => entry.projectName === ProjectManagementMock.project);
    component.checkAllProjectCheckStatesDone(projectToCheck);

    expect(projectToCheck.allProjectCheckStatesDone).toBeTrue();
  });

  it('#closeProjectCheckForSelected - should call stepEntryService.updateProjectCheck and set all entry.projectCheckState done', fakeAsync(() => {
    fixture.detectChanges();

    spyOn(stepentryService, 'updateEmployeeStateForProject').and.returnValue(of(true));
    const checkAllProjectCheckStatesDoneSpy = spyOn(component, 'checkAllProjectCheckStatesDone');

    component.pmEntries = ProjectManagementMock.projectManagementEntries;

    component.pmSelectionModels = new Map<string, SelectionModel<ManagementEntry>>();
    const selectionModel = new SelectionModel<ManagementEntry>();
    selectionModel.select(ProjectManagementMock.projectManagementEntries[0].entries[0]);
    component.pmSelectionModels.set(ProjectManagementMock.project, selectionModel);

    component.closeProjectCheckForSelected();
    flush();

    expect(stepentryService.updateEmployeeStateForProject).toHaveBeenCalled();
    selectionModel.selected.forEach(entry => {
      expect(entry.projectCheckState).toEqual(State.DONE);
    });

    expect(checkAllProjectCheckStatesDoneSpy).toHaveBeenCalledOnceWith(ProjectManagementMock.projectManagementEntries[0]);
  }));

  it('#updateProjectCheck - should call stepEntryService.closeProjectCheck and set all entry.projectCheckState done', fakeAsync(() => {
    fixture.detectChanges();

    spyOn(stepentryService, 'updateEmployeeStateForProject').and.returnValue(of(true));
    const checkAllProjectCheckStatesDoneSpy = spyOn(component, 'checkAllProjectCheckStatesDone');

    const managementEntry: ManagementEntry = ProjectManagementMock.projectManagementEntries[0].entries[0];

    component.updateProjectCheck({
      value: State.DONE,
      source: undefined
    }, managementEntry, ProjectManagementMock.projectManagementEntries[0]);
    flush();

    expect(stepentryService.updateEmployeeStateForProject).toHaveBeenCalled();
    expect(checkAllProjectCheckStatesDoneSpy).toHaveBeenCalled();

    expect(managementEntry.projectCheckState).toEqual(State.DONE);
  }));

  it('#getFilteredAndSortedPmEntries - should return filtered and sorted pmEntries', () => {
    fixture.detectChanges();

    const entries = component.getFilteredAndSortedPmEntries(ProjectManagementMock.projectManagementEntries[0], State.DONE, State.DONE, State.DONE);

    expect(entries.length).toBeTruthy();
  });

  it('#onChangeControlProjectState - should call updateProjectEntry and set controlProjectState and presetControlProjectState', fakeAsync(() => {
    fixture.detectChanges();

    spyOn(projectEntryService, 'updateProjectEntry').and.returnValue(of(true));

    const matSelectChange: MatSelectChange = new MatSelectChange(null, ProjectState.DONE);
    const pmEntry: ProjectManagementEntry = ProjectManagementMock.projectManagementEntries[0];

    component.onChangeControlProjectState(matSelectChange, pmEntry, null);
    flush();

    expect(projectEntryService.updateProjectEntry).toHaveBeenCalled();
    expect(pmEntry.controlProjectState).toEqual(ProjectState.DONE);
    expect(pmEntry.presetControlProjectState).toEqual(pmEntry.presetControlProjectState);
  }));

  it('#onChangeControlProjectState - should call snackbarservice.showSnackbarWithMessage', fakeAsync(() => {
    fixture.detectChanges();

    spyOn(projectEntryService, 'updateProjectEntry').and.returnValue(of(false));
    spyOn(snackbarService, 'showSnackbarWithMessage').and.stub();

    const controlProjectStateSelect: ProjectStateSelectComponent = new ProjectStateSelectComponent(null);

    const matSelectChange: MatSelectChange = new MatSelectChange(null, ProjectState.WORK_IN_PROGRESS);
    const pmEntry: ProjectManagementEntry = ProjectManagementMock.projectManagementEntries[0];

    component.onChangeControlProjectState(matSelectChange, pmEntry, controlProjectStateSelect);
    flush();

    expect(projectEntryService.updateProjectEntry).toHaveBeenCalled();
    expect(snackbarService.showSnackbarWithMessage).toHaveBeenCalled();
    expect(pmEntry.controlProjectState).toEqual(ProjectState.DONE);
    expect(pmEntry.presetControlProjectState).toEqual(pmEntry.presetControlProjectState);
  }));

  it('#onChangeControlBillingState - should call updateProjectEntry and set controlBillingState and presetControlBillingState', fakeAsync(() => {
    fixture.detectChanges();

    spyOn(projectEntryService, 'updateProjectEntry').and.returnValue(of(true));

    const matSelectChange: MatSelectChange = new MatSelectChange(null, ProjectState.DONE);
    const pmEntry: ProjectManagementEntry = ProjectManagementMock.projectManagementEntries[0];

    component.onChangeControlBillingState(matSelectChange, pmEntry, null);
    flush();

    expect(projectEntryService.updateProjectEntry).toHaveBeenCalled();
    expect(pmEntry.controlBillingState).toEqual(ProjectState.DONE);
    expect(pmEntry.presetControlBillingState).toEqual(pmEntry.presetControlBillingState);
  }));

  it('#onChangeControlBillingState - should call snackbarservice.showSnackbarWithMessage', fakeAsync(() => {
    fixture.detectChanges();

    spyOn(projectEntryService, 'updateProjectEntry').and.returnValue(of(false));
    spyOn(snackbarService, 'showSnackbarWithMessage').and.stub();

    const controlProjectStateSelect: ProjectStateSelectComponent = new ProjectStateSelectComponent(null);

    const matSelectChange: MatSelectChange = new MatSelectChange(null, ProjectState.DONE);
    const pmEntry: ProjectManagementEntry = ProjectManagementMock.projectManagementEntries[0];

    component.onChangeControlBillingState(matSelectChange, pmEntry, controlProjectStateSelect);
    flush();

    expect(projectEntryService.updateProjectEntry).toHaveBeenCalled();
    expect(snackbarService.showSnackbarWithMessage).toHaveBeenCalled();
    expect(pmEntry.controlBillingState).toEqual(ProjectState.DONE);
    expect(pmEntry.presetControlBillingState).toEqual(pmEntry.presetControlBillingState);
  }));

  it('#onChangePresetControlProjectState - should call snackbarservice.showSnackbarWithMessage', fakeAsync(() => {
    fixture.detectChanges();

    spyOn(projectEntryService, 'updateProjectEntry').and.returnValue(of(false));
    spyOn(snackbarService, 'showSnackbarWithMessage').and.stub();

    const matSelectChange: MatCheckboxChange = new MatCheckboxChange();
    const pmEntry: ProjectManagementEntry = ProjectManagementMock.projectManagementEntries[0];

    component.onChangePresetControlProjectState(matSelectChange, pmEntry);
    flush();

    expect(projectEntryService.updateProjectEntry).toHaveBeenCalled();
    expect(snackbarService.showSnackbarWithMessage).toHaveBeenCalled();
    expect(pmEntry.presetControlProjectState).toEqual(pmEntry.presetControlProjectState);
  }));

  it('#onChangePresetControlBillingState - should call snackbarservice.showSnackbarWithMessage', fakeAsync(() => {
    fixture.detectChanges();

    spyOn(projectEntryService, 'updateProjectEntry').and.returnValue(of(false));
    spyOn(snackbarService, 'showSnackbarWithMessage').and.stub();

    const matSelectChange: MatCheckboxChange = new MatCheckboxChange();
    const pmEntry: ProjectManagementEntry = ProjectManagementMock.projectManagementEntries[0];

    component.onChangePresetControlBillingState(matSelectChange, pmEntry);
    flush();

    expect(projectEntryService.updateProjectEntry).toHaveBeenCalled();
    expect(snackbarService.showSnackbarWithMessage).toHaveBeenCalled();
    expect(pmEntry.presetControlBillingState).toEqual(pmEntry.presetControlBillingState);
  }));

  it('#isProjectStateNotRelevant - should return true', () => {
    fixture.detectChanges();

    const isNotRelevant = component.isProjectStateNotRelevant(ProjectState.NOT_RELEVANT);

    expect(isNotRelevant).toBeTrue();
  });

  it('#onStartEditing - should set forProjectName and showCommentEditor', () => {
    fixture.detectChanges();

    expect(component.showCommentEditor).toBeFalsy();
    expect(component.showCommentEditor).toBeFalse();

    component.onStartEditing(ProjectManagementMock.project);

    expect(component.showCommentEditor).toBeTruthy();
    expect(component.showCommentEditor).toBeTrue();
  });

  it('#onCommentChange - should call projectCommentService.update and call snackbarService.showSnackbarWithMessage', fakeAsync(() => {
    fixture.detectChanges();

    spyOn(projectCommentService, 'update').and.returnValue(of(false));
    spyOn(snackbarService, 'showSnackbarWithMessage').and.stub();

    const projectManagementEntry: ProjectManagementEntry = ProjectManagementMock.projectManagementEntries[0];
    projectManagementEntry.projectComment = ProjectCommentsMock.get()[0];

    component.onCommentChange(projectManagementEntry, CommentsMock.get()[0].message);
    flush();

    expect(projectCommentService.update).toHaveBeenCalled();
    expect(snackbarService.showSnackbarWithMessage).toHaveBeenCalled();
  }));

  it('#onCommentChange - should set right clicked to true and call snackbarService.showSnackbarWithMessage', fakeAsync(() => {
    fixture.detectChanges();

    spyOn(projectCommentService, 'update').and.returnValue(of(false));
    spyOn(snackbarService, 'showSnackbarWithMessage').and.stub();

    const pmEntry = ProjectManagementMock.projectManagementEntries[0];
    pmEntry.projectComment = ProjectCommentsMock.get()[0];

    component.onCommentChange(pmEntry, CommentsMock.get()[0].message);

    expect(snackbarService.showSnackbarWithMessage).toHaveBeenCalled();
  }));

  it('#convertDurationToTime - should return duration in hours', () => {
    fixture.detectChanges();

    const durationInSeconds = 8 * 60 * 60;

    const durationInHours = component.convertDurationToTime(durationInSeconds);

    expect(durationInHours).toEqual(8);
  });

  class ProjectCommentsMock {

    static dateFormat: string = configuration.dateFormat;

    static get(): Array<ProjectComment> {
      return [
        {
          id: 1,
          projectName: ProjectManagementMock.project,
          comment: 'this is a comment',
          date: moment().format(DATE_FORMAT)
        }
      ];
    }
  }

  class CommentsMock {

    static dateFormat: string = configuration.dateFormat;

    static get(): Array<Comment> {
      return [
        {
          authorEmail: 'max@gepardec.com',
          authorName: 'max',
          id: 1,
          message: 'text',
          isEditing: false,
          state: State.DONE,
          updateDate: moment.now().toString(),
          sourceSystem: 'MEGA'
        },
        {
          authorEmail: 'susi@gepardec.com',
          authorName: 'susi',
          id: 2,
          message: 'text',
          isEditing: false,
          state: State.DONE,
          updateDate: moment.now().toString(),
          sourceSystem: 'MEGA'
        },
        {
          authorEmail: 'franz@gepardec.com',
          authorName: 'franz',
          id: 3,
          message: 'text',
          isEditing: false,
          state: State.OPEN,
          updateDate: moment.now().toString(),
          sourceSystem: 'MEGA'
        }
      ];
    }
  }

  class ProjectManagementMock {

    static email = 'max.muster@gepardec.com';
    static firstname = 'Max';
    static lastname = 'Muster';
    static project = 'LIW-Microservices';
    static year = 2021;
    static month = 10;

    static responseStatus = 200;

    static employeeMuster: Employee = {
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

    static employeeHuber: Employee = {
      email: ProjectManagementMock.email,
      active: true,
      firstname: 'Susi',
      lastname: 'Huber',
      releaseDate: '2021-10-01',
      salutation: 'Frau',
      title: 'MSc',
      userId: '011-shuber',
      workDescription: 'Software-Engineer'
    };

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

    static managementEntries: Array<ManagementEntry> = [
      {
        employee: ProjectManagementMock.employeeMuster,
        internalCheckState: State.DONE,
        employeeCheckState: State.DONE,
        projectCheckState: State.DONE,
        billableTime: '15',
        employeeProgresses: ProjectManagementMock.employeeProgresses,
        entryDate: '2021-10-2',
        finishedComments: 11,
        nonBillableTime: '15',
        totalComments: 22,
        percentageOfHoursSpentInThisProject: 11
      },
      {
        employee: ProjectManagementMock.employeeHuber,
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
      },
      {
        employee: ProjectManagementMock.employeeHuber,
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

    static projectManagementEntries: Array<ProjectManagementEntryViewModel> = [
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
    ];
  }

  class EmployeeMock {
    static employee: Employee = {
      email: ProjectManagementMock.project,
      active: true,
      firstname: ProjectManagementMock.firstname,
      lastname: ProjectManagementMock.lastname,
      releaseDate: '2021-10-01',
      salutation: 'Herr',
      title: 'MSc',
      userId: '011-mmuster',
      workDescription: 'Software-Engineer'
    };
  }
});
