import {provideHttpClient} from '@angular/common/http';
import {applicationConfig, Meta, StoryObj} from '@storybook/angular';

import {importProvidersFrom} from '@angular/core';
import {OAuthModule} from 'angular-oauth2-oidc';
import {HeaderComponent} from '@mega/shared/ui-common';
import {rest} from 'msw';

const meta: Meta<HeaderComponent> = {
  component: HeaderComponent,
  decorators: [
    applicationConfig({
      providers: [provideHttpClient(), importProvidersFrom(OAuthModule.forRoot())]
    })
  ],
  parameters: {
    msw: [
      rest.get('http://localhost:6006/config', (req, res, context) => {
        return res(
          context.json({
            clientId: 'test-client-id',
            issuer: 'test-issuer',
            scope: 'test-scope',
            version: '12.0.0.1.1',
            budgetCalculationExcelUrl: 'https://google.com',
            zepOrigin: 'https://google.com',
          })
        );
      })
    ]
  }
};

export default meta;

type Story = StoryObj<HeaderComponent>;


export const Header: Story = {};
