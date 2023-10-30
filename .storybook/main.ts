import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-designs',
    '@storybook/addon-console',
    '@storybook/addon-a11y',
    '@whitespace/storybook-addon-html',
    'storybook-design-token'
  ],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  docs: {
    autodocs: true,
    defaultName: 'Documentation'
  },
  staticDirs: [{from: '../src/assets/', to: '/assets'}, {from: '../src/stories/mockServiceWorker.js', to: '/mockServiceWorker.js'}]
};
export default config;
