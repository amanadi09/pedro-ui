import type { StorybookConfig } from '@storybook/react-vite';
import { resolve } from 'node:path';

const config: StorybookConfig = {
  stories: ['../packages/ui/src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(viteConfig) {
    const { mergeConfig } = await import('vite');
    return mergeConfig(viteConfig, {
      resolve: {
        alias: [
          {
            find: '@nova-ui/hooks',
            replacement: resolve(__dirname, '../packages/hooks/src/index.ts'),
          },
          {
            find: '@nova-ui/utils',
            replacement: resolve(__dirname, '../packages/utils/src/index.ts'),
          },
          {
            find: '@nova-ui/theme',
            replacement: resolve(__dirname, '../packages/theme/src/index.ts'),
          },
        ],
      },
    });
  },
};

export default config;
