import type {Preview} from '@storybook/angular';
import {moduleMetadata} from '@storybook/angular';
import {setCompodocJson} from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';
import {StorybookMinimalSetupModule} from '../src/stories/modules/storybook-minimalsetup.module';
import {initialize, mswLoader} from 'msw-storybook-addon';

setCompodocJson(docJson);

initialize({
  onUnhandledRequest: ({method, url}) => {
    if (url.pathname.startsWith('/assets')) {
      return;
    }
    if (url.pathname.startsWith('/node_modules')) {
      return;
    }
    if (url.pathname.startsWith('/stories-')) {
      return;
    }


    console.warn('[MSW] Warning: captured a request without a matching request handler:', url);
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
  },
  decorators: [
    moduleMetadata({
      imports: [StorybookMinimalSetupModule],
    }),
  ],
  loaders: [mswLoader]
};

export default preview;
