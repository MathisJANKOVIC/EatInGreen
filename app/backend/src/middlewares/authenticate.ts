import { Request, Response, NextFunction } from 'express'

import HTTPError from '../lib/HTTPError'
import { JsonWebToken } from '../lib/jsonWebToken'

export interface AuthRequest extends Request {
    userId: string
}

function authenticate(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization

    if (authHeader === undefined) {
        throw new HTTPError(401, 'Authentication credentials are required')
    }

    const token = authHeader.split(' ')[1]
    const jwt = new JsonWebToken(token)

    try {
        const payload = jwt.extractPayload();
        (req as AuthRequest).userId = payload.userId
    } catch {
        throw new HTTPError(401, 'Invalid credentials')
    }
    next()
}

export default authenticate