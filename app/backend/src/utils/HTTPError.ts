/**
 * An exception representing an error that occures during the processing of an HTTP request.
 * @extends {Error}
 */
class HTTPError extends Error {
    public readonly statusCode: number

    constructor(statusCode: number, message: string) {
        super(message)
        this.statusCode = statusCode
        this.name = 'HTTPError'
    }
}

export default HTTPError
