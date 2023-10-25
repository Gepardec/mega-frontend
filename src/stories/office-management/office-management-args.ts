import {CustomerProjectWithoutLeads, ManagementEntry, ProjectState, State} from '@mega/shared/data-model';
import {EnterpriseEntry} from '@mega/office-management/data-model';
import {ProjectManagementEntry} from '@mega/project-management/data-model';

export const omEntries: Array<ManagementEntry> = [
  {
    billableTime: '10',
    employee: {
      userId: '1',
      firstname: 'Max',
      lastname: 'Muster',
      email: 'max@muster',
      title: 'Supermax',
      releaseDate: '2022-04-01',
      workDescription: 'Super max',
      salutation: 'salutation',
      active: true
    },
    employeeCheckState: State.IN_PROGRESS,
    employeeCheckStateReason: 'Some Reason',
    employeeProgresses: [{
      assigneeEmail: 'max@mustermann',
      firstname: 'Max',
      lastname: 'Mustermann',
      project: 'Testproject',
      state: State.IN_PROGRESS,
      stepId: 0
    }],
    entryDate: '2023-05-05',
    finishedComments: 2,
    internalCheckState: State.IN_PROGRESS,
    nonBillableTime: '10',
    projectCheckState: State.IN_PROGRESS,
    totalComments: 5
  }
];

export const enterpriseEntry: EnterpriseEntry = {
  chargeabilityExternalEmployeesRecorded: ProjectState.WORK_IN_PROGRESS,
  currentMonthYear: '10',
  payrollAccountingSent: ProjectState.WORK_IN_PROGRESS,
  zepTimesReleased: ProjectState.WORK_IN_PROGRESS
};


export const pmEntries: Array<ProjectManagementEntry> = [
  {
    aggregatedBillableWorkTimeInSeconds: 7200,
    aggregatedNonBillableWorkTimeInSeconds: 3600,
    controlBillingState: ProjectState.WORK_IN_PROGRESS,
    controlProjectState: ProjectState.WORK_IN_PROGRESS,
    entries: omEntries,
    presetControlBillingState: true,
    presetControlProjectState: true,
    projectComment: {comment: 'thisIsAComment', date: '2022-01-01', id: 1, projectName: 'sampleProject'},
    projectName: 'sampleProject',
    zepId: 2
  }
];


export const projectsWithoutLeads: Array<CustomerProjectWithoutLeads> = [{
  comment: 'this is a comment',
  fetchDate: '2023-05-03',
  projectName: 'sampleProject',
  zepId: 2
}];
