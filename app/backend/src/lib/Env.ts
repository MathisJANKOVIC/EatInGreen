import dotenv from 'dotenv'

dotenv.config()

/**
 * Enumeration of the different Node.js server environments.
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
    /** Retrieves the value of an environment variable if it exists, otherwise throws an exception. */
    public static get(key: string): string {
        const value = process.env[key]
        if (value === undefined) {
            throw new Error(`Environment variable ${key} is not defined.`)
        }
        return value
    }

    /**
     * Sets the value of an environment variable.
     * Updates the value if the variable exists, otherwise creates a new one.
     */
    public static set(key: string, value: string): void {
        process.env[key] = value
    }
}

export { NodeEnv, Env }