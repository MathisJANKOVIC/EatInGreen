import { Response, NextFunction, Request } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

const jwtSecret = '5f4dcc3b5aa765d61d8327deb882cf99'

interface UserRequest extends Request {
    userId: string
}

function createToken(userId: string) {
    return jwt.sign(userId, jwtSecret)
}

function authenticate(req: Request, res: Response, next: NextFunction) {
    const authHeader: string | undefined = req.headers.authorization

    if(authHeader === undefined) {
        return res.status(401).json({error: 'authentication credentials are required'})
    }
    const token: string = authHeader.split(' ')[1]

    jwt.verify(token, jwtSecret, (err: any, user: JwtPayload | string | undefined) => {
        if(err || user === undefined) {
            return res.status(401).json({error: 'invalid credentials'})
        }
        (req as UserRequest).userId = user as string
        next()
    })
}

export { UserRequest, createToken, authenticate }