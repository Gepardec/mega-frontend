import type {Meta, StoryObj} from '@storybook/angular';
import {TimeCheckComponent} from '@mega/monthly-report/feature-monthly-report';
import {MonthlyReport} from '@mega/monthly-report/data-model';
import {State} from '@mega/shared/data-model';
import {monthlyReport} from './monthly-reports-args';


const meta: Meta<TimeCheckComponent> = {
  component: TimeCheckComponent,
  argTypes: {
    monthlyReport: {
      control: 'object'
    }
  },
};

export default meta;

type Story = StoryObj<TimeCheckComponent>;

export const timeError: Story = {
  args: {
    monthlyReport
  }
};

export const timeSucess: Story = {
  args: {
    monthlyReport: {
      ...monthlyReport,
      timeWarnings: []
    }
  }
};

