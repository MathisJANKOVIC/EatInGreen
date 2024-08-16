export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/tests/**/*.test.ts'],
    setupFilesAfterEnv: ['./tests/setup.ts'],
    forceExit: true,
    detectOpenHandles: true,
    transform: { '^.+\\.ts$': ['ts-jest', { tsconfig: './tsconfig.json' }] },
}