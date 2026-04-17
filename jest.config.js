module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  testMatch: ['**/functionnal_tests.js', '**/*.test.js', '**/*.spec.js'],
  moduleFileExtensions: ['js', 'ts', 'json']
};