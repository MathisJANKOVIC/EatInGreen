import express, { Request, Response } from 'express'

import User from '../../entities/User'
import { createToken } from '../../authentication' 
import { handleMongoError, handleGenericError } from '../../error_handling'

const router = express.Router()

router.post('/', async (req: Request, res: Response) => {
    try {
        const firstName = req.body.firstName
        const lastName = req.body.lastName
        const email = req.body.email
        const password = req.body.password

        if(password !== undefined && String(password).length < 6) {
            return res.status(422).json({ error: 'password must be at least 6 characters long' })
        }

        const user = new User(firstName, lastName, email, password)
        try {
            await user.save()
        } catch (error) {
            return handleMongoError(error, res)
        }

        const token = createToken(String(user.id))

        return res.status(201).json({ token: token, user: user.serialize()})
    }
    catch(error) {
        return handleGenericError(error, res)
    }
})

export default router