import type {Meta, StoryObj} from '@storybook/angular';
import {applicationConfig} from '@storybook/angular';
import {provideHttpClient} from '@angular/common/http';
import {InfoDialogComponent} from '@mega/shared/ui-common';
import {rest} from 'msw';
import {info} from './shared-args';


const meta: Meta<InfoDialogComponent> = {
  component: InfoDialogComponent,
  decorators: [
    applicationConfig({
      providers: [provideHttpClient()]
    })
  ],
  parameters: {
    msw: [
      rest.get('http://localhost:6006/info', (req, res, context) => {
        return res(
          context.json(info)
        );
      })
    ]
  }
};

export default meta;

type Story = StoryObj<InfoDialogComponent>;


export const InfoDialo: Story = {};

