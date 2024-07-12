import { JwtPayload, sign, verify } from 'jsonwebtoken'

import { Env } from './Envs'

/**
 * A wrapper class for managing and manipulating JSON Web Tokens (JWT).
 */
class JsonWebToken {
    private static readonly SECRET_KEY = Env.get('JWT_SECRET_KEY')
    private static readonly TOKEN_LIFETIME = '20m'

    public readonly token: string

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
            throw new Error('Failed to extract payload due to invalid token.')
        }
    }
}

export default JsonWebToken