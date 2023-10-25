import {provideHttpClient} from '@angular/common/http';
import {applicationConfig, Meta, StoryObj} from '@storybook/angular';

import {importProvidersFrom} from '@angular/core';
import {OAuthModule} from 'angular-oauth2-oidc';
import {HeaderComponent} from '@mega/shared/ui-common';

const meta: Meta<HeaderComponent> = {
  component: HeaderComponent,
  decorators: [
    applicationConfig({
      providers: [provideHttpClient(), importProvidersFrom(OAuthModule.forRoot())]
    })
  ],
};

export default meta;

type Story = StoryObj<HeaderComponent>;




export const Header: Story = {

};
