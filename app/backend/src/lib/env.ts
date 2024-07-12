import dotenv from 'dotenv'

dotenv.config()

/**
 * An enumeration of the different Node.js server environments.
 */
enum NodeEnv {
    DEV = 'dev',
    TEST = 'test',
    PROD = 'production'
}

/**
 * An exception thrown when an environment variable is not defined.
 */
class UndefinedEnvError extends Error {
    constructor(key: string) {
        super(`environment variable '${key}' is not defined`)
        this.name = 'UndefinedEnvError'
    }
}

/**
 * A utility class for environment variable manipulations.
 */
class Env {
    /**
     * Retrieves the value of an environment variable.
     * @param key The name of the environment variable.
     * @throws {UndefinedEnvError} If the environment variable is not defined.
     * @returns The value of the environment variable.
     */
    public static get(key: string): string {
        const value = process.env[key]
        if (value === undefined) {
            throw new UndefinedEnvError(key)
        }
        return value
    }

    /**
     * Sets the value of an environment variable.
     * @param key The name of the environment variable.
     * @param value The value of the environment variable.
     */
    public static set(key: string, value: string): void {
        process.env[key] = value
    }
}

export { Env, UndefinedEnvError, NodeEnv }