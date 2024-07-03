import jwt, { JwtPayload } from 'jsonwebtoken'

import Env from './Env'

class JsonWebToken {
    private static readonly secretKey = Env.get('JWT_SECRET_KEY')
    private static readonly tokenLifetime = '20m'

    public readonly token: string

    constructor(token: string) {
        this.token = token
    }

    public static createFromPayload(payload: object): JsonWebToken {
        const token = jwt.sign(payload, JsonWebToken.secretKey, { expiresIn: JsonWebToken.tokenLifetime })
        return new JsonWebToken(token)
    }

    public extractPayload(): JwtPayload {
        try {
            return jwt.verify(this.token, JsonWebToken.secretKey) as JwtPayload
        } catch {
            throw new Error('failed to extract payload due to invalid token')
        }
    }
}

export default JsonWebToken