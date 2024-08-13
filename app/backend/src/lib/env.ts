/**
 * Retrieves the value of an environment variable.
 * Throws an exception if the variable is not defined.
 */
export function getEnv(key: string): string {
    const value = process.env[key]
    if (value === undefined) {
        throw new Error(
            `Environment variable '${key}' is not defined`
        )
    }
    return value
}

/** Sets the value of an environment variable.*/
export function setEnv(key: string, value: string): void {
    process.env[key] = value
}

/**
 * Contains properties that describe the current Node.js environment.
 */
export const nodeEnv = {
    isDevelopment: getEnv('NODE_ENV') === 'development',
    isTest: getEnv('NODE_ENV') === 'test',
    isProduction: getEnv('NODE_ENV') === 'production'
}