const path = require('path');

const babelParser = require('@babel/eslint-parser');
const js = require('@eslint/js');
const prettierConfig = require('eslint-config-prettier');
const importPlugin = require('eslint-plugin-import');
const jest = require('eslint-plugin-jest');
const jestDom = require('eslint-plugin-jest-dom');
const prettier = require('eslint-plugin-prettier');
const react = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');
const testingLibrary = require('eslint-plugin-testing-library');
const globals = require('globals');

module.exports = [
  // ESLint recommended
  js.configs.recommended,

  // Prettier config (disables conflicting rules)
  prettierConfig,

  // Ignore ESLint config files and Jest setup
  {
    ignores: ['jest.config.js'],
  },

  // Main configuration
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      parser: babelParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
          modules: true,
          arrowFunctions: true,
          restParams: true,
          experimentalObjectRestSpread: true,
        },
        babelOptions: {
          configFile: path.join(__dirname, 'babel.config.js'),
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.commonjs,
        ...globals.jest,
        ...globals.es2015,
        // Additional Jest globals
        it: 'readonly',
        jest: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        describe: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
      },
    },
    plugins: {
      react: react,
      'react-hooks': reactHooks,
      jest: jest,
      'testing-library': testingLibrary,
      'jest-dom': jestDom,
      prettier: prettier,
      import: importPlugin,
    },
    rules: {
      // React recommended rules
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,

      // React Hooks recommended
      ...reactHooks.configs.recommended.rules,

      // Jest recommended
      ...jest.configs.recommended.rules,

      // Testing Library React
      ...testingLibrary.configs.react.rules,

      // Jest DOM recommended
      ...jestDom.configs.recommended.rules,

      // Import sorting and organization
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // Node.js built-in modules
            'external', // External packages
            'internal', // Internal modules (@ prefixed)
            'parent', // Parent imports (../)
            'sibling', // Sibling imports (./)
            'index', // Index imports (./)
          ],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
            {
              pattern: 'react-**',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@/jest/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/store/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/services/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/hooks/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/managers/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/routing/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/pages/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/components/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/constants/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/scss/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/assets/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/public/**',
              group: 'internal',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['react'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'import/no-unresolved': 'error',
      'import/named': 'error',
      'import/default': 'error',
      'import/export': 'error',

      // Custom overrides
      'prettier/prettier': 'error',
      'no-unused-vars': 'warn',
      'no-empty': 'warn',
      'react/prop-types': 'off',
      'react/no-unescaped-entities': 'off',

      // Ensure React hooks rules are active
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
    settings: {
      'import/resolver': {
        webpack: {
          config: path.join(__dirname, 'buildTools/webpack.common.js'),
        },
      },
      'import/internal-regex': '^@/',
      react: {
        version: 'detect',
      },
    },
  },
];
