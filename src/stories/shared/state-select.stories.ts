import type {Meta, StoryObj} from '@storybook/angular';
import {StateSelectComponent} from '@mega/shared/ui-common';
import {State} from '@mega/shared/data-model';


const meta: Meta<StateSelectComponent> = {
    component: StateSelectComponent,
};

export default meta;

type Story = StoryObj<StateSelectComponent>;




export const Done: Story = {
    args: {
        value: State.DONE
    }
};
