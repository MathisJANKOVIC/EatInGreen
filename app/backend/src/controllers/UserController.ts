import User from '@entities/User'
import UserService from '@services/UserService'
import AuthRequest from '@types-utils/AuthRequest'
import { hash } from '@lib/encrypt'

import { Request, Response } from 'express'

class UserController {
    private readonly userService: UserService

    constructor(userService: UserService) {
        this.userService = userService
    }

    public async updateUserProfile(req: Request, res: Response) {
        const userId = (req as AuthRequest).userId
        const user = await this.userService.getUserById(userId) as User

        const { firstName, lastName, phoneNumber, email, passwordHash } = req.body

        if (firstName !== undefined) {
            user.setFirstName(firstName)
        }
        if (lastName !== undefined) {
            user.setLastName(lastName)
        }
        if (phoneNumber !== undefined) {
            user.setPhoneNumber(phoneNumber)
        }
        if (email !== undefined) {
            user.setEmail(email)
        }
        if (passwordHash !== undefined) {
            const hashedPassword = hash(passwordHash)
            user.setPasswordHash(hashedPassword)
        }

        await this.userService.saveUser(user)
        res.status(200).json({ user: user.toPublicDto() })
    }
}

export default UserController