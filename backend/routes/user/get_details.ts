import express, { Request, Response} from 'express'

import { handleGenericError } from '../../error_handling'
import { Users, User, getUserInfo } from '../../models/user'
import { UserRequest, authenticate } from '../../authentication'

const router = express.Router()

router.get('/', authenticate, async (req: Request, res: Response) => {
    try {
        const userId = (req as UserRequest).userId
        const user = await Users.findById(userId) as User

        return res.status(200).json({user: getUserInfo(user)})
    }
    catch (error) {
        handleGenericError(error, res)
    }
})

export default router