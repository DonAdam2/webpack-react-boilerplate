const path = require('path');

module.exports = {
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:testing-library/react',
    'plugin:jest-dom/recommended',
  ],
  plugins: ['babel', 'react', 'jest', 'testing-library', 'jest-dom', 'prettier'],
  parser: '@babel/eslint-parser',
  env: {
    browser: true,
    node: true,
    commonjs: true,
    jest: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
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
  settings: {
    'import/resolver': 'webpack',
  },
  rules: {
    'prettier/prettier': 'error',
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 'off',
  },
  ignorePatterns: ['**/src/**/*.json'],
};
