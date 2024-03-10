import { Response, NextFunction, Request } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

import { UserRequest } from '../types'
import { jwtSecret } from '../settings'

function authenticate(req: Request, res: Response, next: NextFunction) {
    const authHeader: string | undefined = req.headers.authorization

    if(authHeader === undefined) {
        return res.status(401).json({error: 'Authentication credentials are required'})
    }

    const token: string = authHeader.split(' ')[1]

    jwt.verify(token, jwtSecret, (err, user: JwtPayload | string | undefined) => {
        if(err || user === undefined || typeof user === 'string') {
            return res.status(401).json({error: 'Invalid credentials'})
        }
        (req as UserRequest).user = user as JwtPayload
        next()
    })
}

export default authenticate
