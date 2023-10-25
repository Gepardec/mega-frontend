import {JourneyCheckComponent} from '@mega/monthly-report/feature-monthly-report';
import type {Meta, StoryObj} from '@storybook/angular';
import {monthlyReport} from './monthly-reports-args';

const meta: Meta<JourneyCheckComponent> = {
  component: JourneyCheckComponent,
  argTypes: {
    monthlyReport: {
      control: 'object'
    }
  },
};

export default meta;

type Story = StoryObj<JourneyCheckComponent>;


export const journeyCorrect: Story = {
  args: {
    monthlyReport
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/LKQ4FJ4bTnCSjedbRpk931/Sample-File',
    },
  },
};

export const journeyError: Story = {
  args: {
    monthlyReport: {
      ...monthlyReport,
      journeyWarnings: [{warnings: ['Error'], date: '2023-09-08'}]
    }
  }
};

