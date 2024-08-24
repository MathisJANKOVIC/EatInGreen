import { userService } from '@/main'
import authenticate from '@middlewares/authenticate'
import UserController from '@controllers/UserController'

import { Router } from 'express'

const userRouter = Router()

const userController = new UserController(userService)

userRouter.patch('/profile', authenticate, userController.updateUserProfile.bind(userController))

export default userRouter