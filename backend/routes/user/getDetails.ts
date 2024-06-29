import express, { Request, Response} from 'express'

import { handleGenericError } from '../../error_handling'
import User from '../../entities/User'
import { UserRequest, authenticate } from '../../authentication'

const router = express.Router()

router.get('/', authenticate, async (req: Request, res: Response) => {
    try {
        const userId = (req as UserRequest).userId
        const user = await User.findById(userId) as User

        return res.status(200).json({user: user.serialize()})
    }
    catch (error) {
        handleGenericError(error, res)
    }
})

export default router