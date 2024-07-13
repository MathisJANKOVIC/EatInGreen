import { Response, NextFunction } from 'express'

import { JsonWebToken } from '../lib/jwt'
import HTTPError from '../http/HTTPError'
import AuthRequest from '../http/AuthRequest'

function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization

    if (authHeader === undefined) {
        throw new HTTPError(401, 'authorization required')
    }

    const token = authHeader.split(' ')[1]
    const jwt = new JsonWebToken(token)

    try {
        const payload = jwt.extractPayload()
        req.userId = payload.userId
    } catch {
        throw new HTTPError(401, 'invalid or expired authentication token')
    }
    next()
}

export default authenticate