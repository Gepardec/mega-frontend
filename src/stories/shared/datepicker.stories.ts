import {Meta, StoryObj} from '@storybook/angular';
import {DatepickerComponent} from '@mega/shared/ui-common';

const meta: Meta<DatepickerComponent> = {
  component: DatepickerComponent,
  argTypes: {
    selectedDate: {
      control: 'date'
    }
  }
};

export default meta;

type Story = StoryObj<DatepickerComponent>;


export const DemoStory: Story = {
  args: {
    selectedDate: '2023-09-05'
  }
};
