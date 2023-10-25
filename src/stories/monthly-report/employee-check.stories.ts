import type {Meta, StoryObj} from '@storybook/angular';
import {applicationConfig} from '@storybook/angular';
import {provideHttpClient} from '@angular/common/http';
import {EmployeeCheckComponent} from '@mega/monthly-report/feature-monthly-report';
import {State} from '@mega/shared/data-model';
import {monthlyReport} from './monthly-reports-args';


const meta: Meta<EmployeeCheckComponent> = {
  component: EmployeeCheckComponent,
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

type Story = StoryObj<EmployeeCheckComponent>;


export const NotAvailable: Story = {
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/LKQ4FJ4bTnCSjedbRpk931/Sample-File',
    },
  },
  args: {
    monthlyReport
  }
};
export const AllDone: Story = {
  args: {
    monthlyReport: {
      ...monthlyReport,
      employeeCheckState: 'DONE',
      internalCheckState: State.DONE
    }
  }
};
export const Error: Story = {
  args: {
    monthlyReport: {
      ...monthlyReport,
      assigned: true
    }
  }
};
export const AllError: Story = {
  args: {
    monthlyReport: {
      ...monthlyReport,
      assigned: true,
      employeeCheckState: 'OPEN'
    }
  }
};

