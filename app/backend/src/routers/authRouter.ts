import AuthController from '@controllers/AuthController'
import asyncHandler from '@utils/asyncHandler'
import { userPersistenceService } from '@src/main'

import { Router } from 'express'

const authRouter = Router()

const authController = new AuthController(userPersistenceService)

authRouter.post('/register', asyncHandler(authController.register.bind(authController)))
authRouter.post('/login', asyncHandler(authController.login.bind(authController)))

export default authRouter