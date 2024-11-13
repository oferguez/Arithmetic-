import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettier from 'eslint-plugin-prettier';
import spellcheck from 'eslint-plugin-spellcheck';
import typescript from '@typescript-eslint/eslint-plugin'; // TypeScript ESLint plugin
import parser from '@typescript-eslint/parser'; // TypeScript parser

export default [
  // Basic configuration from ESLint's built-in recommended settings
  js.configs.recommended,

  // TypeScript plugin configuration
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser, // Set TypeScript parser
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: globals.browser,
    },
    plugins: {
      '@typescript-eslint': typescript,
    },
    rules: {
      ...typescript.configs.recommended.rules,
    },
  },

  // Prettier integration
  {
    files: ['**/*.{js,jsx,ts,tsx,css,html}'],
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': 'warn', // Run Prettier as a warning
    },
  },

  // React Hooks and React Refresh Plugins
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },

  // Spellcheck plugin
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      spellcheck,
    },
    rules: {
      'spellcheck/spell-checker': [
        'warn',
        {
          comments: true,
          strings: true,
          identifiers: true,
          templates: true,
          lang: 'en_US',
          skipWords: [
            'eslint', 'config', 'prettier', 'react', 'jsx', 'tsconfig',
          ],
          skipIfMatch: [
            '^[-\\w]+$',  // Ignore "kebab-case" or camelCase words
            '^\\/.*$',    // Ignore paths (e.g., "/home/user")
          ],
          skipWordIfMatch: [
            '^\\w{1,2}$'  // Ignore very short words (1-2 characters)
          ],
          minLength: 3,   // Ignore words with fewer than 3 characters
        },
      ],
    },
  },

  // General formatting and code style rules
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      'no-trailing-spaces': 'error',
      'eol-last': ['error', 'always'],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'indent': ['error', 2],
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'no-mixed-spaces-and-tabs': 'error',
    },
  },

  // Ignore specific folders
  {
    ignores: ['dist'],
  },
];
