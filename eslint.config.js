'use strict';

const commonGlobals = {
  require: 'readonly',
  module: 'readonly',
  exports: 'readonly',
  __dirname: 'readonly',
  __filename: 'readonly',
};

const commonRules = {
  'no-unused-vars': 'error',
  'no-undef': 'error',
  eqeqeq: 'error',
  curly: 'error',
  'no-var': 'error',
  'prefer-const': 'error',
};

module.exports = [
  {
    ignores: ['dist/**', 'node_modules/**', '.vscode-test/**'],
  },
  {
    files: ['extension.js', 'src/**/*.js'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'commonjs',
      globals: commonGlobals,
    },
    rules: commonRules,
  },
  {
    files: ['test/unit/**/*.js'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'commonjs',
      globals: {
        ...commonGlobals,
        describe: 'readonly',
        it: 'readonly',
        before: 'readonly',
        after: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
      },
    },
    rules: commonRules,
  },
  {
    files: ['test/suite/**/*.js'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'commonjs',
      globals: {
        ...commonGlobals,
        suite: 'readonly',
        test: 'readonly',
        suiteSetup: 'readonly',
        suiteTeardown: 'readonly',
        setup: 'readonly',
        teardown: 'readonly',
      },
    },
    rules: commonRules,
  },
];
