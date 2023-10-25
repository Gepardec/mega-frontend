import type {Meta, StoryObj} from '@storybook/angular';
import {ProjectStateSelectComponent} from '@mega/shared/ui-common';
import {ProjectState} from '@mega/shared/data-model';


const meta: Meta<ProjectStateSelectComponent> = {
    component: ProjectStateSelectComponent,
};

export default meta;

type Story = StoryObj<ProjectStateSelectComponent>;


export const Done: Story = {
    args: {
        value: ProjectState.DONE
    }
};
