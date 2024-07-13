import express, { Request, Response} from 'express'

import User from '../../entities/User'
import authenticate, { AuthRequest } from '../../middlewares/authenticate'

const router = express.Router()

router.get('/', authenticate, async (req: Request, res: Response) => {
    const userId = (req as AuthRequest).userId
    const user = await User.findById(userId) as User

    return res.status(200).json({user: user.serializeDTO()})
})

export default router