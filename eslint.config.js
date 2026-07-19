// @ts-check
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import storybook from 'eslint-plugin-storybook';

export default tseslint.config(
  {
    ignores: [
      '**/dist/**',
      '**/coverage/**',
      '**/storybook-static/**',
      '**/node_modules/**',
      '**/*.d.ts',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      'react/prop-types': 'off',
      // Flags plain apostrophes/quotes in JSX text ("don't", "here's") as
      // though they need &apos;/&quot; escaping. Technically-correct but
      // makes prose-heavy JSX (this repo's docs site) much harder to read
      // and write for negligible real-world benefit — off by convention in
      // a lot of production codebases for exactly this reason.
      'react/no-unescaped-entities': 'off',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
  {
    files: ['**/*.stories.tsx'],
    plugins: { storybook },
    rules: {
      ...storybook.configs.recommended.rules,
    },
  },
  {
    files: ['**/*.test.{ts,tsx}', '**/test/**'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    files: ['**/*.config.{js,ts}', '**/*.setup.{js,ts}'],
    languageOptions: {
      globals: { module: 'readonly', require: 'readonly', __dirname: 'readonly' },
    },
  },
);
