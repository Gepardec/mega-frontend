import type { Preview } from "@storybook/angular";
import { setCompodocJson } from "@storybook/addon-docs/angular";
import docJson from "../documentation.json";
import {moduleMetadata} from '@storybook/angular';
import {StorybookMinimalSetupModule} from '../src/stories/modules/storybook-minimalsetup.module';
setCompodocJson(docJson);

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
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
  ]
};

export default preview;
