import express, { Request, Response } from 'express'

import { createToken } from '../../authentication'
import { Users, getUserInfo } from '../../models/user'
import { handleMongoError, handleGenericError } from '../../error_handling'

const router = express.Router()

router.post('/', async (req: Request, res: Response) => {
    try {
        const fullName = req.body.fullName
        const email = req.body.email
        const password = req.body.password

        if(password != undefined && password.toString().length < 6) {
            return res.status(422).json({ error: 'password must be at least 6 characters long' })
        }

        const user = new Users({ fullName, email, password })
        try {
            await user.save()
        } catch (error) {
            return handleMongoError(error, res)
        }

        const token = createToken(user._id.toString())
        return res.status(201).json({ token: token, user: getUserInfo(user)})
    }
    catch(error) {
        return handleGenericError(error, res)
    }
})

export default router