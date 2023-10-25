import {provideHttpClient} from '@angular/common/http';
import {applicationConfig, Meta, StoryObj} from '@storybook/angular';
import {InfoComponent} from '@mega/shared/ui-common';
import {rest} from 'msw';
import {info} from './shared-args';


const meta: Meta<InfoComponent> = {
  component: InfoComponent,
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

type Story = StoryObj<InfoComponent>;


export const Info: Story = {};
