import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs"
  ],
  framework: "@storybook/react-vite",
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../src'),
        },
      },
      assetsInclude: ['**/*.jpg', '**/*.png', '**/*.jpeg', '**/*.webp'],
      define: {
        'import.meta.env.VITE_IMAGES_URL': JSON.stringify(
          'https://cardgame.alemdoscript.com.br/public/'
        ),
      },
    });
  },
};

export default config;
