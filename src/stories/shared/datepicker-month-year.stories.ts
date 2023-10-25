import {Meta, StoryObj} from '@storybook/angular';
import {DatepickerMonthYearComponent} from '@mega/shared/ui-common';

const meta: Meta<DatepickerMonthYearComponent> = {
  component: DatepickerMonthYearComponent,
  argTypes: {
    maxDate: {control: 'date'},
    maxMonth: {control: 'number'}
  }
};

export default meta;

type Story = StoryObj<DatepickerMonthYearComponent>;


export const DemoStory: Story = {
  args: {
    maxDate: '2022-06-05',
    maxMonth: 10
  }
};
