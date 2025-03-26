// filepath: c:\Users\Erik\lucky-empire\jest.config.js
export default {
  preset: 'ts-jest/presets/default-esm', // Use ts-jest with ESM support
  testEnvironment: 'jsdom', // Use jsdom for React tests
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true, // Enable ESM support in ts-jest
      },
    ],
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'], // Setup file for global configurations
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS imports
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'], // Treat TypeScript files as ESM
  testPathIgnorePatterns: ['<rootDir>/dist/'], // Ignore the dist folder
};