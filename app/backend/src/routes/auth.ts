import AuthController from '../controllers/AuthController'
import asyncHandler from '../utils/asyncHandler'
import { userService } from '../services'
import { Router } from 'express'

const router = Router()

const authController = new AuthController(userService)

router.post('/login', asyncHandler(authController.login.bind(authController)))
router.post('/register', asyncHandler(authController.register.bind(authController)))

export { router as authRouter }