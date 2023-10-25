import {provideHttpClient} from '@angular/common/http';
import {applicationConfig, Meta, StoryObj} from '@storybook/angular';

import {OAuthModule} from 'angular-oauth2-oidc';
import {importProvidersFrom} from '@angular/core';
import {CommentsForEmployeeComponent} from '@mega/shared/ui-common';
import {Role} from '@mega/shared/data-model';
import { comments, employee, user } from './shared-args';


const meta: Meta<CommentsForEmployeeComponent> = {
  component: CommentsForEmployeeComponent,
  decorators: [
    applicationConfig({
      providers: [provideHttpClient(), importProvidersFrom(OAuthModule.forRoot())]
    })
  ],
};

export default meta;

type Story = StoryObj<CommentsForEmployeeComponent>;


export const Comments: Story = {
  args: {
    comments,
    employee,
    user
  }
};
