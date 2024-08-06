module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['./tests/**/*.test.ts'],
  collectCoverage: false,
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json',
    },
  },
}
