import {Meta, StoryObj} from '@storybook/angular';
import {BillableTimesFractionComponent} from '@mega/project-management/ui-common';


const meta: Meta<BillableTimesFractionComponent> = {
  component: BillableTimesFractionComponent,
};

export default meta;

type Story = StoryObj<BillableTimesFractionComponent>;


export const DemoStory: Story = {
  args: {
    billableTimes: 10,
    nonBillableTimes: 20
  }
};
