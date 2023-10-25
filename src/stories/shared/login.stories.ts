import {provideHttpClient} from '@angular/common/http';
import {applicationConfig, Meta, StoryObj} from '@storybook/angular';

import {OAuthModule} from 'angular-oauth2-oidc';
import {importProvidersFrom} from '@angular/core';
import {LoginComponent} from '@mega/shared/ui-common';

const meta: Meta<LoginComponent> = {
  component: LoginComponent,
  decorators: [
    applicationConfig({
      providers: [provideHttpClient(), importProvidersFrom(OAuthModule.forRoot())]
    })
  ]
};

export default meta;

type Story = StoryObj<LoginComponent>;


export const Login: Story = {};
