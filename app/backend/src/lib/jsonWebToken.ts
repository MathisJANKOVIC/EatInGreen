import jwt, { JwtPayload } from 'jsonwebtoken'

import { Env } from './env'

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

    /** Creates a new JWT from the given payload.*/
    public static createFromPayload(payload: object): JsonWebToken {
        const token = jwt.sign(payload, JsonWebToken.SECRET_KEY, { expiresIn: JsonWebToken.TOKEN_LIFETIME })
        return new JsonWebToken(token)
    }

    /** Extracts the payload from the JWT. Throws an exception if the JWT is invalid. */
    public extractPayload(): JwtPayload {
        try {
            return jwt.verify(this.token, JsonWebToken.SECRET_KEY) as JwtPayload
        } catch {
            throw new Error('failed to extract the payload due to invalid JWT')
        }
    }

    /** Returns the string representation of the JWT. */
    public toString(): string {
        return this.token
    }
}

export { JsonWebToken, JwtPayload as JWTPayload }