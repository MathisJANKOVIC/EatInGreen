import * as env from './env'

import jwt, { JwtPayload } from 'jsonwebtoken'

/**
 * A wrapper class for managing and manipulating JSON Web Tokens (JWT).
 */
export class JWT {
    private static readonly SECRET_KEY = env.get('JWT_SECRET_KEY')
    private static readonly TOKEN_LIFETIME = '20m'

    private readonly token: string

    constructor(token: string) {
        this.token = token
    }

    /** Creates a new JWT from the given payload.*/
    public static createFromPayload(payload: object): JWT {
        const token = jwt.sign(payload, JWT.SECRET_KEY, { expiresIn: JWT.TOKEN_LIFETIME })
        return new JWT(token)
    }

    /** Extracts the payload from the JWT. Throws an exception if the JWT is invalid. */
    public extractPayload(): JwtPayload {
        try {
            return jwt.verify(this.token, JWT.SECRET_KEY) as JwtPayload
        } catch {
            throw new Error('Failed to extract the payload due to invalid JWT')
        }
    }

    /** Returns the string representation of the JWT. */
    public toString(): string {
        return this.token
    }
}

export { JwtPayload as JWTPayload }