import type {Meta, StoryObj} from '@storybook/angular';
import {PmProgressComponent} from '@mega/shared/ui-common';
import {State} from '@mega/shared/data-model';


const meta: Meta<PmProgressComponent> = {
  component: PmProgressComponent
};

export default meta;

type Story = StoryObj<PmProgressComponent>;


const pmProgress = {};


// pmProgresses: Array<PmProgress>;
// internalCheckState: State;
// displayedEmployees: Array<DisplayedEmployees>;
// displayedColumns = ['in-charge', 'checked'];


//   firstname: string;
//   lastname: string;
//   state: State;
//   project: string;
//   stepId: number;
//   assigneeEmail: string;
export const Done: Story = {
  args: {
    pmProgresses: [{
      firstname: 'max',
      lastname: 'mustermann',
      state: State.DONE,
      project: 'amazing-project',
      stepId: 12,
      assigneeEmail: 'max@mustermann'
    }],
    internalCheckState: State.DONE,
    displayedEmployees: []
  }
};

export const Open: Story = {
  args: {
    pmProgresses: [{
      firstname: 'max',
      lastname: 'mustermann',
      state: State.DONE,
      project: 'amazing-project',
      stepId: 12,
      assigneeEmail: 'max@mustermann'
    }],
    internalCheckState: State.OPEN,
    displayedEmployees: []
  }
};
