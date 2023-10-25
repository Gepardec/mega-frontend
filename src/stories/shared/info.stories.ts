import {provideHttpClient} from '@angular/common/http';
import {applicationConfig, Meta, StoryObj} from '@storybook/angular';
import {InfoComponent} from '@mega/shared/ui-common';


const meta: Meta<InfoComponent> = {
  component: InfoComponent,
  decorators: [
    applicationConfig({
      providers: [provideHttpClient()]
    })
  ],
  argTypes: {},
};

export default meta;

type Story = StoryObj<InfoComponent>;


export const Info: Story = {
  args: {
    version: '120.0 Final Test Version'
  }
};
