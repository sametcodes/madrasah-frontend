import pluginNext from '@next/eslint-plugin-next';

import { config as reactConfig } from './react-internal.js';

/**
 * A custom ESLint configuration for libraries that use Next.js.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const nextJsConfig = [
  ...reactConfig,
  {
    plugins: {
      '@next/next': pluginNext,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs['core-web-vitals'].rules,
      // Disable pages directory warning for app directory projects
      '@next/next/no-html-link-for-pages': 'off',
    },
  },
  {
    ignores: ['**/.next/*'],
  },
];
