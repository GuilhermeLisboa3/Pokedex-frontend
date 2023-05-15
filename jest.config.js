module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '<rootDir>/src/main/adapters',
    '!<rootDir>/src/main/**',
    '!<rootDir>/src/**/index.ts',
    '!<rootDir>/src/domain/models/**',
    '!<rootDir>/src/domain/contracts/**',
    '!<rootDir>/src/applications/hooks/**',
    '!<rootDir>/src/**/styles.ts',
    '!<rootDir>/src/app/**'
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  moduleNameMapper: {
    '@/tests/(.+)': '<rootDir>/tests/$1',
    '@/(.+)': '<rootDir>/src/$1',
    '\\.(jpg|jpeg|svg|png|css)$': 'jest-transform-stub',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  testPathIgnorePatterns: [
    '/node_modules/', '/.next/', '<rootDir>/tests/e2e/cypress'
  ],
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  setupFilesAfterEnv: ['<rootDir>/src/main/config/jest-setup.ts'],
  testEnvironment: 'jsdom',
  clearMocks: true
}
