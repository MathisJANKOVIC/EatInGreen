import jwt, { JwtPayload } from 'jsonwebtoken'

class JsonWebToken {
    private static readonly secretKey = '5f4dcc3b5aa765d61d8327deb882cf99'
    private static readonly tokenLifetime = '20m'

    public readonly token: string

    constructor(token: string) {
        this.token = token
    }

    public static createFromPayload(payload: object): JsonWebToken {
        const token = jwt.sign(payload, JsonWebToken.secretKey, { expiresIn: JsonWebToken.tokenLifetime })
        const jsonWebToken = new JsonWebToken(token)
        return jsonWebToken
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