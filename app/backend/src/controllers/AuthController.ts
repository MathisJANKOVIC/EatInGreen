import { JsonWebToken } from '../lib/jwt'
import encrypt from '../lib/encrypt'
import HTTPError from '../http/HTTPError'
import User from '../entities/User'

import { Request, Response } from 'express'

class AuthController {
    public static async register(req: Request, res: Response): Promise<void> {
        const firstName = req.body.firstName
        const lastName = req.body.lastName
        const email = req.body.email
        const password = req.body.password

        if(password !== undefined && String(password).length < 6) {
            throw new HTTPError(422, 'password must be at least 6 characters long')
        }

        const user = new User(firstName, lastName, email, password)
        await user.save()

        const jwt = JsonWebToken.createFromPayload({ userId: user.id })

        res.status(201).json({ token: jwt.toString(), user: user.toDto()})
    }

    public static async login(req: Request, res: Response): Promise<void> {
        const email = req.body.email
        const password = req.body.password

        if(email === undefined || password === undefined) {
            throw new HTTPError(422, 'fields email and password are required')
        }

        const user = await User.findByEmail(email)

        if(user == null || !await encrypt.matchHash(password, user.passwordHash)) {
            throw new HTTPError(401, 'invalid email or password')
        }

        const jwt = JsonWebToken.createFromPayload({ userId: user.id })
        res.status(200).json({ token: jwt.toString(), user: user.toDto() })
    }
}

export default AuthController