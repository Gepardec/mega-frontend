import {provideHttpClient} from '@angular/common/http';
import {applicationConfig, Meta, StoryObj} from '@storybook/angular';
import {ProjectOverviewCardComponent} from '@mega/office-management/feature-office-management';
import {importProvidersFrom} from '@angular/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {TranslateModule} from '@ngx-translate/core';
import {pmEntries} from './office-management-args';


const meta: Meta<ProjectOverviewCardComponent> = {
  component: ProjectOverviewCardComponent,
  decorators: [
    applicationConfig({
      providers: [provideHttpClient(), importProvidersFrom(MatSnackBarModule), importProvidersFrom(TranslateModule.forRoot())]
    })
  ],
};

export default meta;

type Story = StoryObj<ProjectOverviewCardComponent>;


export const DemoStory: Story = {
  args: {
    pmEntries
  }
};
