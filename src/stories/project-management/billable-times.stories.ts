import {Meta, StoryObj} from '@storybook/angular';
import {BillableTimesComponent} from '@mega/project-management/ui-common';

const meta: Meta<BillableTimesComponent> = {
  component: BillableTimesComponent,
};

export default meta;

type Story = StoryObj<BillableTimesComponent>;


export const DemoStory: Story = {
  args: {
    billableTimes: '10',
    nonBillableTimes: '20'
  }
};
