import { Response, NextFunction } from 'express'

import HTTPError from '../lib/HTTPError'
import AuthRequest from '../types/AuthRequest'
import { JsonWebToken } from '../lib/jsonWebToken'

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