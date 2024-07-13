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
 * A utility class for environment variable manipulations.
 */
class Env {
    /**
     * Retrieves the value of an environment variable.
     * Throws an exception if the variable is not defined.
     */
    public static get(key: string): string {
        const value = process.env[key]
        if (value === undefined) {
            throw new Error(`environment variable '${key}' is not defined`)
        }
        return value
    }

    /** Sets the value of an environment variable.*/
    public static set(key: string, value: string): void {
        process.env[key] = value
    }
}

export { Env, NodeEnv }