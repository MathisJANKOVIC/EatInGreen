import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { jwt_secret } from '../settings'

function authenticateToken(req: any, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization']
    if(authHeader) {
        const token = authHeader.split(' ')[1]
        if(token == null){
            return res.status(401).json({message: 'Token is required'})
        }

        jwt.verify(token, jwt_secret, (err: any, user: any) => {
            if(err) {
                return res.status(401).json({message: 'Invalid or expired token'})
            }
            req.user = user
            next()
        })
    } else {
        res.status(401).json({message: 'Token is null'})
    }
}

export default authenticateToken