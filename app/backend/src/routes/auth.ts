import AuthController from '../controllers/AuthController'
import { userService } from '../services'
import { Router } from 'express'

const router = Router()

const authController = new AuthController(userService)

router.post('/login', authController.login.bind(authController))
router.post('/register', authController.register.bind(authController))

export { router as authRouter }