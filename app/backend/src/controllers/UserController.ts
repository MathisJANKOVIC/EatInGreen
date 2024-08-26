import User from '@entities/User'
import UserService from '@services/UserService'
import AuthRequest from '@types-utils/AuthRequest'
import { hash } from '@lib/encrypt'
import HTTPError from '@utils/HTTPError'
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

        await this.userService.update(user)
        res.status(200).json({ user: user.toPublicDto() })
    }

    public async getUser(req: Request, res: Response): Promise<void> {
        const userId = (req as AuthRequest).userId
        const user = await this.userService.getUserById(userId) as User

        res.status(200).json({ user: user.toPublicDto() })
    }


    public async addToCart(req: Request, res: Response): Promise<void> {
        const { quantity, productId } = req.body
        const userId = (req as AuthRequest).userId
        const user = await this.userService.getUserById(userId) as User
        user.addToCart(quantity, productId)
        this.userService.update(user)
        res.status(200).json({ user: user.toPublicDto() })
    }



    public async removeFromCart(req: Request, res: Response): Promise<void> {
        const { id: userId } = req.params
        const { productId } = req.body

        if (!userId || !productId) {
            throw new HTTPError(400, 'User ID and Product ID are required')
        }

        await this.userService.deleteFromCart(userId, productId)
        res.status(200).json({ message: 'Product removed from cart' })
    }


    public async getCart(req: Request, res: Response): Promise<void> {
        const { id: userId } = req.params

        if (!userId) {
            throw new HTTPError(400, 'User ID is required')
        }

        const cart = await this.userService.getCart(userId)
        if (!cart) {
            throw new HTTPError(404, 'Cart not found')
        }

        res.status(200).json(cart)
    }

}

export default UserController