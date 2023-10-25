import {provideHttpClient} from '@angular/common/http';
import {applicationConfig, Meta, StoryObj} from '@storybook/angular';
import {ProjectsWithoutLeadsCardComponent} from '@mega/office-management/feature-office-management';
import {projectsWithoutLeads} from './office-management-args';

const meta: Meta<ProjectsWithoutLeadsCardComponent> = {
  component: ProjectsWithoutLeadsCardComponent,
  decorators: [
    applicationConfig({
      providers: [provideHttpClient()]
    })
  ],
};

export default meta;

type Story = StoryObj<ProjectsWithoutLeadsCardComponent>;


export const DemoStory: Story = {
  args: {
    projectsWithoutLeads
  }
};
