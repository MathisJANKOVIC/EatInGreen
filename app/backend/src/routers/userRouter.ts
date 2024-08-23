import { userService } from '@src/main'
import { Router } from 'express'

import UserController from '@controllers/UserController'

const userRouter = Router()

const userController = new UserController(userService)

userRouter.patch('/profile', userController.updateUserProfile.bind(userController))

export default userRouter