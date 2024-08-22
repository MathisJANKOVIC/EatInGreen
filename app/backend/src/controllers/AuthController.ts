import UserFactory from '@factories/UserFactory'
import UserService from '@services/UserService'
import HTTPError from '@utils/HTTPError'
import { matchHash } from '@lib/encrypt'
import { JWT } from '@lib/jwt'

import { Request, Response } from 'express'

class AuthController {
    private readonly userService: UserService

    constructor(userService: UserService) {
        this.userService = userService
    }

    public async register(req: Request, res: Response): Promise<void> {
        const userData = req.body

        const user = UserFactory.createUser(userData)
        await this.userService.saveUser(user)

        const jwt = JWT.createFromPayload({ userId: user.id })

        res.status(201).json({ token: jwt.toString(), user: user.toPublicDto() })
    }

    public async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body

        const user = await this.userService.getUserByEmail(email)

        if (!user || !matchHash(password, user.passwordHash)) {
            throw new HTTPError(401, 'Invalid email or password')
        }

        const jwt = JWT.createFromPayload({ userId: user.id })
        res.status(200).json({ token: jwt.toString(), user: user.toPublicDto() })
    }
}

export default AuthController