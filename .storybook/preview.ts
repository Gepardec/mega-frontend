import type {Preview} from '@storybook/angular';
import {moduleMetadata} from '@storybook/angular';
import {setCompodocJson} from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';
import {StorybookMinimalSetupModule} from '../src/stories/modules/storybook-minimalsetup.module';
import {initialize, mswLoader} from 'msw-storybook-addon';
import {rest} from 'msw';
import {info} from '../src/stories/shared/shared-args';

setCompodocJson(docJson);

initialize({
  onUnhandledRequest: ({method, url}) => {
    const ignoredPathnames = ['/assets', '/node_modules', '/stories-', '/runtime', '/s/materialicons', '/vendors-'];
    if (ignoredPathnames.some((ignored) => {
      return url.pathname.startsWith(ignored);
    })) {
      return;
    }

    console.warn('[MSW] Warning: captured a request without a matching request handler:', url.pathname);
  },
});

const preview: Preview = {
  parameters: {
    actions: {argTypesRegex: '^on[A-Z].*'},
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    msw: {
      handlers: {
        config: [
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
    }
  },
  decorators: [
    moduleMetadata({
      imports: [StorybookMinimalSetupModule],
    }),
  ],
  loaders: [mswLoader]
};

export default preview;
