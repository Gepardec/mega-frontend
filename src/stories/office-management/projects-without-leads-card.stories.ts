import {provideHttpClient} from '@angular/common/http';
import {applicationConfig, Meta, StoryObj} from '@storybook/angular';
import {ProjectsWithoutLeadsCardComponent} from '@mega/office-management/feature-office-management';

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
    projectsWithoutLeads: [{comment: 'this is a comment', fetchDate: '2023-05-03', projectName: 'sampleProject', zepId: 2}]
  }
};
