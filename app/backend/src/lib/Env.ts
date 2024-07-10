import dotenv from 'dotenv'

dotenv.config()

enum NodeEnv {
    DEV = 'dev',
    TEST = 'test',
    PROD = 'production'
}

class Env {
    /**
     * Retrieves the value of an environment variable.
     *
     * @param {string} key - The key of the environment variable to retrieve.
     * @returns {string} The value of the environment variable.
     * @throws {Error} If the environment variable is not defined.
     */
    public static get(key: string): string {
        const value = process.env[key]
        if (value === undefined) {
            throw new Error(`environment variable ${key} is not defined`)
        }
        return value
    }

    /**
     * Sets the value of an environment variable.
     *
     * @param {string} key - The key of the environment variable to set.
     * @param {string} value - The value to set for the environment variable.
     */
    public static set(key: string, value: string): void {
        process.env[key] = value
    }
}

export { NodeEnv, Env }