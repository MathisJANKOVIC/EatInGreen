import { pathsToModuleNameMapper } from 'ts-jest'
import type { Config } from '@jest/types'
import tsconfig from './tsconfig.json'

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/tests/**/*.test.ts'],
    setupFilesAfterEnv: ['./tests/setup.ts'],
    verbose: true,
    forceExit: true,
    detectOpenHandles: true,
    moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, { prefix: '<rootDir>/' })
}

export default config