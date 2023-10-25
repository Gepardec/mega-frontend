import type {Meta, StoryObj} from '@storybook/angular';
import {PmProgressComponent} from '@mega/shared/ui-common';
import {State} from '@mega/shared/data-model';
import {displayedEmployees, pmProgresses} from './shared-args';


const meta: Meta<PmProgressComponent> = {
  component: PmProgressComponent
};

export default meta;

type Story = StoryObj<PmProgressComponent>;


const pmProgress = {};
export const Done: Story = {
  args: {
    pmProgresses,
    internalCheckState: State.DONE,
    displayedEmployees
  }
};

export const Open: Story = {
  args: {
    pmProgresses,
    internalCheckState: State.OPEN,
    displayedEmployees
  }
};
