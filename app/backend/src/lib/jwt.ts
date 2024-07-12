import { JwtPayload, sign, verify } from 'jsonwebtoken'

import { Env } from './env'

/**
 * An error class for representing an invalid token error.
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

    /** Creates a new JWT from the given payload. */
    public static createFromPayload(payload: object): JsonWebToken {
        const token = sign(payload, JsonWebToken.SECRET_KEY, { expiresIn: JsonWebToken.TOKEN_LIFETIME })
        return new JsonWebToken(token)
    }

    /** Extracts the payload from the JWT. Throws an exception if the token is invalid. */
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