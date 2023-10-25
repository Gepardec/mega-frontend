import {provideHttpClient} from '@angular/common/http';
import {applicationConfig, Meta, StoryObj} from '@storybook/angular';
import {EmployeeCardComponent} from '@mega/office-management/feature-office-management';
import {State} from '@mega/shared/data-model';
import {importProvidersFrom} from '@angular/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { omEntries } from './office-management-args';



const meta: Meta<EmployeeCardComponent> = {
  component: EmployeeCardComponent,
  decorators: [
    applicationConfig({
      providers: [provideHttpClient(), importProvidersFrom(MatSnackBarModule)]
    })
  ],
};

export default meta;

type Story = StoryObj<EmployeeCardComponent>;




export const DemoStory: Story = {
  args: {
    omEntries,
    filteredOmEntries: omEntries
  }
};
