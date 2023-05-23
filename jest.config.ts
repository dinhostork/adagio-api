export default {
  bail: true,
  clearMocks: true,
  collectCoverage: true,
  coverageProvider: 'v8',
  preset: 'ts-jest',
  roots: ['<rootDir>/__tests__'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '@/tests/(.*)': '<rootDir>/tests/$1',
    '@/(.*)': '<rootDir>/src/$1'
  },
};
