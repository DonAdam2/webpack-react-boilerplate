const path = require('path'),
  globals = require('globals'),
  pluginJs = require('@eslint/js'),
  //plugins
  eslintConfigPrettier = require('eslint-config-prettier'),
  babel = require('eslint-plugin-babel'),
  react = require('eslint-plugin-react'),
  reactHooks = require('eslint-plugin-react-hooks'),
  jest = require('eslint-plugin-jest'),
  testingLibrary = require('eslint-plugin-testing-library'),
  jestDom = require('eslint-plugin-jest-dom'),
  prettier = require('eslint-plugin-prettier'),
  babelParser = require('@babel/eslint-parser');

module.exports = [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        it: 'readonly',
        jest: 'readonly',
        test: 'readonly',
        expect: 'readonly',
        indexedDB: 'readonly',
        describe: 'readonly',
      },
    },
  },
  pluginJs.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    ...jest.configs['flat/recommended'],
    plugins: {
      babel,
      react,
      'react-hooks': reactHooks,
      jest,
      'testing-library': testingLibrary,
      'jest-dom': jestDom,
      prettier,
    },
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
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
    },
    settings: {
      'import/resolver': 'webpack',
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...jest.configs['flat/recommended'].rules,
      'prettier/prettier': 'error',
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'no-unused-vars': 'warn',
      'no-empty': 'warn',
    },
    ignores: ['**/src/**/*.json', '**/public/**/*.json'],
  },
  eslintConfigPrettier,
];
