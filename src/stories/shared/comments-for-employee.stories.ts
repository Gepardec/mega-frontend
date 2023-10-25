import {provideHttpClient} from '@angular/common/http';
import {applicationConfig, Meta, StoryObj} from '@storybook/angular';

import {OAuthModule} from 'angular-oauth2-oidc';
import {importProvidersFrom} from '@angular/core';
import {CommentsForEmployeeComponent} from '@mega/shared/ui-common';
import {Role} from '@mega/shared/data-model';


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
    comments: [{
      authorEmail: 'max@mustermann',
      authorName: 'Max Mustermann',
      id: 1,
      isEditing: false,
      message: 'Ein Testkommentar',
      state: 'DONE',
      updateDate: '2023/05/03'
    }],
    employee: {
      active: true,
      email: 'max@muster',
      firstname: 'Max',
      lastname: 'Muster',
      releaseDate: '2022-03-03',
      salutation: 'salutation string',
      title: 'Mr.',
      userId: '3',
      workDescription: 'super developer'
    },
    user: {
      email: 'max@muster',
      firstname: 'Maxi',
      lastname: 'Musti',
      roles: [Role.EMPLOYEE, Role.OFFICE_MANAGEMENT, Role.PROJECT_LEAD],
      userId: '4'
    }
  }
};
