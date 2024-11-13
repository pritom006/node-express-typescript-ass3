import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'node',  // Suitable for Node.js API testing
  coverageDirectory: 'coverage',  // Directory for coverage reports
  collectCoverage: true,  // Enable code coverage
  collectCoverageFrom: [
    'src/controllers/*.ts',   // Track coverage for controllers
    'src/routes/*.ts'         // Track coverage for routes
  ],
  moduleFileExtensions: ['ts', 'js'],  // Support for TypeScript and JavaScript files
  transform: {
    '^.+\\.ts$': 'ts-jest',  // Use ts-jest to transform TypeScript files
  },
  verbose: true,  // Output detailed test results
};

export default config;

