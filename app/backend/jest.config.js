module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
    collectCoverage: false,

    globals: {
        'ts-jest': {
          tsconfig: './tsconfig.json',
        },
      },
  };
  