const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths || {}, {
      prefix: '<rootDir>/',
    }),
    '\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    '\\.(css|scss)$': 'identity-obj-proxy',
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "identity-obj-proxy",
  },
  transformIgnorePatterns: [
    '/node_modules/(?!wrap-ansi|string-width|cliui|ansi-regex|strip-ansi|wrap-ansi)/',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
