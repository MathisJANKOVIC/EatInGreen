import { Response, NextFunction, Request } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import fs from 'fs'

const settings = JSON.parse(fs.readFileSync('./settings.json').toString())

interface UserRequest extends Request {
    userId: string
}

function hashPassword(password: string) {
    return bcrypt.hashSync(password, settings.jwt.passwordSalt)
}

function createToken(userId: string) {
    return jwt.sign(userId, settings.jwt.secret)
}

function authenticate(req: Request, res: Response, next: NextFunction) {
    const authHeader: string | undefined = req.headers.authorization

    if(authHeader === undefined) {
        return res.status(401).json({error: 'Authentication credentials are required'})
    }
    const token: string = authHeader.split(' ')[1]

    jwt.verify(token, settings.jwt.secret, (err: any, user: JwtPayload | string | undefined) => {
        if(err || user === undefined) {
            return res.status(401).json({error: 'Invalid credentials'})
        }
        (req as UserRequest).userId = user as string
        next()
    })
}

export { UserRequest, hashPassword, createToken, authenticate } 