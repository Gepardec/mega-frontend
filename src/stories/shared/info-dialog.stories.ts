import type {Meta, StoryObj} from '@storybook/angular';
import {applicationConfig} from '@storybook/angular';
import {provideHttpClient} from '@angular/common/http';
import {InfoDialogComponent} from '@mega/shared/ui-common';


const meta: Meta<InfoDialogComponent> = {
  component: InfoDialogComponent,
  decorators: [
    applicationConfig({
      providers: [provideHttpClient()]
    })
  ],
};

export default meta;

type Story = StoryObj<InfoDialogComponent>;


export const InfoDialo: Story = {};

