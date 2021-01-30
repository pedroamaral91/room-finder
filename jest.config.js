module.exports = {
  roots: ['<rootDir>/src'],
  bail: 1,
  clearMocks: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  },
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
