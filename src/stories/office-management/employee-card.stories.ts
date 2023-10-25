import {provideHttpClient} from '@angular/common/http';
import {applicationConfig, Meta, StoryObj} from '@storybook/angular';
import {EmployeeCardComponent} from '@mega/office-management/feature-office-management';
import {State} from '@mega/shared/data-model';
import {importProvidersFrom} from '@angular/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';


const meta: Meta<EmployeeCardComponent> = {
  component: EmployeeCardComponent,
  decorators: [
    applicationConfig({
      providers: [provideHttpClient(), importProvidersFrom(MatSnackBarModule)]
    })
  ],
};

export default meta;

type Story = StoryObj<EmployeeCardComponent>;


const omEntries = [
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

export const DemoStory: Story = {
  args: {
    omEntries,
    filteredOmEntries: omEntries
  }
};
