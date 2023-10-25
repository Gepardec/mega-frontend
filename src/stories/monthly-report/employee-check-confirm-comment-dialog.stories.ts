import type {Meta, StoryObj} from '@storybook/angular';
import {applicationConfig, moduleMetadata} from '@storybook/angular';
import {EmployeeCheckConfirmCommentDialogComponent} from '@mega/monthly-report/feature-monthly-report';
import { provideHttpClient } from '@angular/common/http';

const meta: Meta<EmployeeCheckConfirmCommentDialogComponent> = {
  component: EmployeeCheckConfirmCommentDialogComponent,
  // decorators: [
  //   applicationConfig({
  //     providers: [provideHttpClient()]
  //   })
  // ],
};

export default meta;

type Story = StoryObj<EmployeeCheckConfirmCommentDialogComponent>;


export const ConfirmDialog: Story = {};
