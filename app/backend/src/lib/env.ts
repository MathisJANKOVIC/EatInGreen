import dotenv from 'dotenv'

dotenv.config()

/**
 * An enumeration of the different Node.js server environments.
 */
export enum NodeEnv {
    DEV = 'dev',
    TEST = 'test',
    PROD = 'production'
}

/**
 * Retrieves the value of an environment variable.
 * Throws an exception if the variable is not defined.
 */
export function get(key: string): string {
    const value = process.env[key]
    if (value === undefined) {
        throw new Error(`Environment variable '${key}' is not defined`)
    }
    return value
}

/** Sets the value of an environment variable.*/
export function set(key: string, value: string): void {
    process.env[key] = value
}
