/**
 * An enumeration of the different server environments.
 */
export const enum NodeEnv {
    DEVELOPMENT = 'development',
    TEST = 'test',
    PRODUCTION = 'production'
}

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
