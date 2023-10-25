import {AppInfo, Comment, Employee, PmProgress, Role, State, User} from '@mega/shared/data-model';

export const comments: Array<Comment> = [{
  authorEmail: 'max@mustermann',
  authorName: 'Max Mustermann',
  id: 1,
  isEditing: false,
  message: 'Ein Testkommentar',
  state: 'DONE',
  updateDate: '2023/05/03'
}];

export const employee: Employee = {
  active: true,
  email: 'max@muster',
  firstname: 'Max',
  lastname: 'Muster',
  releaseDate: '2022-03-03',
  salutation: 'salutation string',
  title: 'Mr.',
  userId: '3',
  workDescription: 'super developer'
};

export const user: User = {
  email: 'max@muster',
  firstname: 'Maxi',
  lastname: 'Musti',
  roles: [Role.EMPLOYEE, Role.OFFICE_MANAGEMENT, Role.PROJECT_LEAD],
  userId: '4'
};


export const info: AppInfo = {
  branch: 'storybook-branch',
  buildDate: '2022-01-01',
  buildNumber: 0,
  commit: 'axa123dasdf',
  startedAt: '2022-01-01',
  upTime: '25',
  version: '12.0.01',
};

export const pmProgresses: Array<PmProgress> = [{
  firstname: 'max',
  lastname: 'mustermann',
  state: State.DONE,
  project: 'amazing-project',
  stepId: 12,
  assigneeEmail: 'max@mustermann'
}];

// class DisplayedEmployees doesn't get exported
export const displayedEmployees = [
  {
    name: 'employee-test',
    state: State.IN_PROGRESS
  }
];
