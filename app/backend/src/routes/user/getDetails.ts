import express, { Request, Response} from 'express'

import User from '../../entities/User'
import authenticate, { UserRequest } from '../../middlewares/authenticate'

const router = express.Router()

router.get('/', authenticate, async (req: Request, res: Response) => {
    const userId = (req as UserRequest).userId
    const user = await User.findById(userId) as User

    return res.status(200).json({user: user.serialize()})
})

export default router