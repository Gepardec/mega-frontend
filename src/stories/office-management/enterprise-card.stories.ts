import {StorybookMinimalSetupModule} from '../modules/storybook-minimalsetup.module';
import {provideHttpClient} from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';
import {applicationConfig, Meta, moduleMetadata, StoryObj} from '@storybook/angular';
import {EnterpriseCardComponent} from '@mega/office-management/feature-office-management';
import {ProjectState} from '@mega/shared/data-model';

const meta: Meta<EnterpriseCardComponent> = {
  component: EnterpriseCardComponent,
  decorators: [
    applicationConfig({
      providers: [provideHttpClient()]
    })
  ],
};

export default meta;

type Story = StoryObj<EnterpriseCardComponent>;



export const DemoStory: Story = {
    args: {
      enterpriseEntry: {
        chargeabilityExternalEmployeesRecorded: ProjectState.WORK_IN_PROGRESS,
        currentMonthYear: '10',
        payrollAccountingSent: ProjectState.WORK_IN_PROGRESS,
        zepTimesReleased: ProjectState.WORK_IN_PROGRESS
      }
    }
};
