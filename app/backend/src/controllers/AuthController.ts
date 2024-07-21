import HTTPError from '../utils/HTTPError'
import * as encrypt from '../lib/encrypt'
import User from '../entities/User'
import { JWT } from '../lib/jwt'

import { Request, Response } from 'express'
import UserService from '../services/UserService'

class AuthController {
    private readonly userService: UserService

    constructor(userService: UserService) {
        this.userService = userService
    }

    public async register(req: Request, res: Response): Promise<void> {
        const { firstName, lastName, email, password } = req.body

        const user = new User(firstName, lastName, email, password)
        await this.userService.save(user)

        const jwt = JWT.createFromPayload({ userId: user.id })

        res.status(201).json({ token: jwt.toString(), user: user.toDto()})
    }

    public async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body

        const user = await this.userService.findByEmail(email)

        if(user == null || !encrypt.matchHash(password, user.passwordHash)) {
            throw new HTTPError(401, 'invalid email or password')
        }

        const jwt = JWT.createFromPayload({ userId: user.id })
        res.status(200).json({ token: jwt.toString(), user: user.toDto() })
    }
}

export default AuthController