import express, { Request, Response} from 'express'

import { Users, User } from '../../models/user'
import { UserRequest, authenticate } from '../../authentication'

const router = express.Router()

router.get('/', authenticate, async (req: Request, res: Response) => {
    const userId = (req as UserRequest).user.userId
    const user = await Users.findById(userId) as User

    return res.status(200).json({user: user.toJSON()})
})

export default router