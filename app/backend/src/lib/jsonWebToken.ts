import { JwtPayload, sign, verify } from 'jsonwebtoken'

import { Env } from './env'

/**
 * An exception thrown when a JWT is invalid.
 */
class InvalidTokenError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "InvalidTokenError"
    }
}

/**
 * A wrapper class for managing and manipulating JSON Web Tokens (JWT).
 */
class JsonWebToken {
    private static readonly SECRET_KEY = Env.get('JWT_SECRET_KEY')
    private static readonly TOKEN_LIFETIME = '20m'

    private readonly token: string

    constructor(token: string) {
        this.token = token
    }

    /**
     * Creates a new JWT from the given payload.
     * @param payload The payload to be stored in the JWT.
     * @returns A new JWT instance.
     */
    public static createFromPayload(payload: object): JsonWebToken {
        const token = sign(payload, JsonWebToken.SECRET_KEY, { expiresIn: JsonWebToken.TOKEN_LIFETIME })
        return new JsonWebToken(token)
    }

    /**
     * Extracts the payload from the JWT.
     * @throws {InvalidTokenError} If the token is invalid.
     * @returns The payload of the JWT.
     */
    public extractPayload(): JwtPayload {
        try {
            return verify(this.token, JsonWebToken.SECRET_KEY) as JwtPayload
        } catch {
            throw new InvalidTokenError('failed to extract payload due to invalid token')
        }
    }

    /** Returns the string representation of the JWT. */
    public toString(): string {
        return this.token
    }
}

export { JsonWebToken, InvalidTokenError }