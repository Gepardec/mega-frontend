import {provideHttpClient} from '@angular/common/http';
import {applicationConfig, Meta, StoryObj} from '@storybook/angular';
import {EnterpriseCardComponent} from '@mega/office-management/feature-office-management';
import {ProjectState} from '@mega/shared/data-model';
import {enterpriseEntry} from './office-management-args';

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
    enterpriseEntry
  }
};
