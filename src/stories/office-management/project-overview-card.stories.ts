import {provideHttpClient} from '@angular/common/http';
import {applicationConfig, Meta, StoryObj} from '@storybook/angular';
import {ProjectOverviewCardComponent} from '@mega/office-management/feature-office-management';
import {ProjectState, State} from '@mega/shared/data-model';
import {importProvidersFrom} from '@angular/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {TranslateModule} from '@ngx-translate/core';


const meta: Meta<ProjectOverviewCardComponent> = {
  component: ProjectOverviewCardComponent,
  decorators: [
    applicationConfig({
      providers: [provideHttpClient(), importProvidersFrom(MatSnackBarModule), importProvidersFrom(TranslateModule.forRoot())]
    })
  ],
};

export default meta;

type Story = StoryObj<ProjectOverviewCardComponent>;


export const DemoStory: Story = {
  args: {
    pmEntries: [
      {
        aggregatedBillableWorkTimeInSeconds: 7200,
        aggregatedNonBillableWorkTimeInSeconds: 3600,
        controlBillingState: ProjectState.WORK_IN_PROGRESS,
        controlProjectState: ProjectState.WORK_IN_PROGRESS,
        entries: [
          {
            billableTime: '10',
            employee: {
              active: true,
              email: 'max@mustermann',
              firstname: 'Max',
              lastname: 'Mustermann',
              releaseDate: '2022-01-10',
              salutation: 'salutationstring',
              title: 'Mr.',
              userId: '10',
              workDescription: 'Supermax'
            },
            employeeCheckState: State.IN_PROGRESS,
            employeeCheckStateReason: 'this is a reason for employee',
            employeeProgresses: [{
              assigneeEmail: 'max@muster',
              firstname: 'Max',
              lastname: 'Muster',
              project: 'sampleProject',
              state: State.IN_PROGRESS,
              stepId: 3
            }],
            entryDate: '2022-01-03',
            finishedComments: 6,
            internalCheckState: State.IN_PROGRESS,
            nonBillableTime: '24',
            projectCheckState: State.IN_PROGRESS,
            totalComments: 10
          }
        ],
        presetControlBillingState: true,
        presetControlProjectState: true,
        projectComment: {comment: 'thisIsAComment', date: '2022-01-01', id: 1, projectName: 'sampleProject'},
        projectName: 'sampleProject',
        zepId: 2
      }
    ]
  }
};
