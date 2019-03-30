const path = require('path');

module.exports = {
  extends: [
    'eslint-config-synacor',
    'prettier',
    'prettier/react',
    'plugin:jest/recommended',
  ],
  plugins: ['jest'],
  rules: {
    'no-unused-vars': 'warn',
    'react/sort-comp': 'off',
    'lines-around-comment': 'off',
    'react/prefer-stateless-function': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  globals: {
    fetch: true,
    __DEV__: true,
    window: true,
    FormData: true,
    XMLHttpRequest: true,
    requestAnimationFrame: true,
    cancelAnimationFrame: true,
    page: true,
    browser: true,
    jestPuppeteer: true,
  },
};
