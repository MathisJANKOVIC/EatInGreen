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
}

export default Env