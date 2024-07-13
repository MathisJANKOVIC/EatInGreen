/**
 * An exception representing an error that occurred during an HTTP request.
 * This error should be thrown when the server cannot fulfill a request due to a client error.
 */
class HTTPError extends Error {
    public readonly statusCode: number

    constructor(statusCode: number, message: string) {
        super(message)
        if (statusCode < 400 || statusCode > 499) {
            throw new Error("HTTPError statusCode must be in the 4xx range")
        }
        this.statusCode = statusCode
        this.name = 'HTTPError'
    }
}

export default HTTPError