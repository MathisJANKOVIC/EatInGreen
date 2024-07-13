import { Request, Response } from 'express'

import HTTPError from '../lib/HTTPError'
import User from '../entities/User'
import Encrypter from '../lib/Encrypter'
import { JsonWebToken } from '../lib/jsonWebToken'

class AuthController {
    public static async register(req: Request, res: Response): Promise<void> {
        const firstName = req.body.firstName
        const lastName = req.body.lastName
        const email = req.body.email
        const password = req.body.password

        if(password !== undefined && String(password).length < 6) {
            throw new HTTPError(422, 'password must be at least 6 characters long')
        }

        const hashedPassword = await Encrypter.hash(password)
        const user = new User(firstName, lastName, email, hashedPassword)
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

        if(user == null || !await Encrypter.matchHash(password, user.password)) {
            throw new HTTPError(401, 'invalid email or password')
        }

        const jwt = JsonWebToken.createFromPayload({ userId: user.id })
        res.status(200).json({ token: jwt.toString(), user: user.toDto() })
    }
}

export default AuthController