import jwt, { JwtPayload } from 'jsonwebtoken'

import { Env } from './env'

class JsonWebToken {
    private static readonly SECRET_KEY = Env.get('JWT_SECRET_KEY')
    private static readonly TOKEN_LIFETIME = '20m'

    public readonly token: string

    constructor(token: string) {
        this.token = token
    }

    public static createFromPayload(payload: object): JsonWebToken {
        const token = jwt.sign(payload, JsonWebToken.SECRET_KEY, { expiresIn: JsonWebToken.TOKEN_LIFETIME })
        return new JsonWebToken(token)
    }

    public extractPayload(): JwtPayload {
        try {
            return jwt.verify(this.token, JsonWebToken.SECRET_KEY) as JwtPayload
        } catch {
            throw new Error('failed to extract payload due to invalid token')
        }
    }
}

export default JsonWebToken