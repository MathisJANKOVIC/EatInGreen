import { pathsToModuleNameMapper } from 'ts-jest'
import type { Config } from '@jest/types'

import tsconfig from './tsconfig.json'

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFilesAfterEnv: ['./tests/setup.ts'],
    testMatch: ['**/tests/**/*.test.ts'],
    forceExit: true,
    detectOpenHandles: true,
    moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, { prefix: '<rootDir>/' }),
    transform: {
        '^.+\\.ts$': ['ts-jest', { tsconfig: './tsconfig.json' }]
    }
}

export default config