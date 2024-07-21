import AuthRequest from '../interfaces/requests/AuthRequest'
import HTTPError from '../utils/HTTPError'
import { JWT } from '../lib/jwt'

import { Response, NextFunction } from 'express'

function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization

    if (authHeader === undefined) {
        throw new HTTPError(401, 'authorization required')
    }

    const token = authHeader.split(' ')[1]
    const jwt = new JWT(token)

    try {
        const payload = jwt.extractPayload()
        req.userId = payload.userId
    } catch {
        throw new HTTPError(401, 'invalid or expired authentication token')
    }
    next()
}

export default authenticate