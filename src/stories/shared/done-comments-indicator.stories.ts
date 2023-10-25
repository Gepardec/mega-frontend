import {Meta, StoryObj} from '@storybook/angular';
import {DoneCommentsIndicatorComponent} from '@mega/shared/ui-common';

const meta: Meta<DoneCommentsIndicatorComponent> = {
  component: DoneCommentsIndicatorComponent,
  argTypes: {
    totalComments: {
      control: 'number'
    },
    finishedComments: {
      control: 'number'
    }
  },
};

export default meta;

type Story = StoryObj<DoneCommentsIndicatorComponent>;


export const DemoStory: Story = {
  args: {
    totalComments: 10,
    finishedComments: 10
  }
};
