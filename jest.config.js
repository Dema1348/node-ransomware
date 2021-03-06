module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    '**/*.js',
    '!**/src/**/*.test.js',
    '!**/coverage/**',
    '!**/jest.config.js',
  ],
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'node'],
  testMatch: ['<rootDir>/src/**/*.test.js', '<rootDir>/src/**/**/*.test.js'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
