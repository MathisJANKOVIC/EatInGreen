import { userService } from '@/main'
import authenticate from '@middlewares/authenticate'
import UserController from '@controllers/UserController'

import { Router } from 'express'
import asyncHandler from '@utils/asyncHandler'

const userRouter = Router()

const userController = new UserController(userService)

userRouter.patch('/profile', authenticate, userController.updateUserProfile.bind(userController))
userRouter.post('/cart', authenticate, asyncHandler(userController.addToCart.bind(userController)))
userRouter.get('/:id', asyncHandler(userController.getCart.bind(userController)))
userRouter.delete('/remove/:id', asyncHandler(userController.removeFromCart.bind(userController)))

export default userRouter