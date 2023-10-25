import type {Meta, StoryObj} from '@storybook/angular';
import {applicationConfig} from '@storybook/angular';
import {InformationTopBarComponent} from '@mega/monthly-report/feature-monthly-report';
import {provideHttpClient} from '@angular/common/http';
import {monthlyReport} from './monthly-reports-args';

const meta: Meta<InformationTopBarComponent> = {
  component: InformationTopBarComponent,
  decorators: [
    applicationConfig({
      providers: [provideHttpClient()]
    })
  ],
  argTypes: {
    monthlyReport: {
      control: 'object'
    }
  },
};

export default meta;

type Story = StoryObj<InformationTopBarComponent>;

export const TopBar: Story = {
  args: {
    monthlyReport
  }
};
