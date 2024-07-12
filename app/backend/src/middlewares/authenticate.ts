import { Response, NextFunction, Request } from 'express'

import {JsonWebToken} from '../lib/jsonWebToken'

export interface UserRequest extends Request {
    userId: string
}

function authenticate(req: Request, res: Response, next: NextFunction) {
    const authHeader: string | undefined = req.headers.authorization

    if(authHeader === undefined) {
        return res.status(401).json({error: 'authentication credentials are required'})
    }
    const token: string = authHeader.split(' ')[1]

    const jsonWebToken = new JsonWebToken(token)
    let payload
    try {
        payload = jsonWebToken.extractPayload()
    } catch {
        return res.status(401).json({error: 'invalid credentials'})
    }
    (req as UserRequest).userId = payload.userId
    next()
}

export default authenticate