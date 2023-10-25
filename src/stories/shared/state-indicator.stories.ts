import type {Meta, StoryObj} from '@storybook/angular';
import {State} from '@mega/shared/data-model';
import {StateIndicatorComponent} from '@mega/shared/ui-common';


const meta: Meta<StateIndicatorComponent> = {
  component: StateIndicatorComponent
};

export default meta;

type Story = StoryObj<StateIndicatorComponent>;

export const OPEN: Story = {
  args: {
    state: State.OPEN,
    size: 'small'
  }
};

export const IN_PROGRESS: Story = {
  args: {
    state: State.IN_PROGRESS,
    size: 'medium'
  }
};
export const DONE: Story = {
  args: {
    state: State.DONE,
    size: 'large'
  }
};





