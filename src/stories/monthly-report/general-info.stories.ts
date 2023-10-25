import type {Meta, StoryObj} from '@storybook/angular';
import {applicationConfig} from '@storybook/angular';
import {GeneralInfoComponent} from '@mega/monthly-report/feature-monthly-report';
import {provideHttpClient} from '@angular/common/http';
import {monthlyReport} from './monthly-reports-args';

const meta: Meta<GeneralInfoComponent> = {
  component: GeneralInfoComponent,
  decorators: [
    applicationConfig({
      providers: [provideHttpClient()]
    })
  ],
  argTypes: {
    monthlyReport: {
      control: 'object'
    }
  }
};

export default meta;

type Story = StoryObj<GeneralInfoComponent>;


export const GeneralInfo: Story = {
  args: {
    monthlyReport
  }
};
