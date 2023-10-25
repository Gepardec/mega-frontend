import {provideHttpClient} from '@angular/common/http';
import {applicationConfig, Meta, StoryObj} from '@storybook/angular';
import {ProjektNameWithZepLinkComponent} from '@mega/office-management/ui-common';

const meta: Meta<ProjektNameWithZepLinkComponent> = {
  component: ProjektNameWithZepLinkComponent,
  decorators: [
    applicationConfig({
      providers: [provideHttpClient()]
    })
  ],
};

export default meta;

type Story = StoryObj<ProjektNameWithZepLinkComponent>;


export const DemoStory: Story = {
  args: {
    projectManagementUrl: 'https://sample.com',
    projectName: 'sampleName'
  }
};
