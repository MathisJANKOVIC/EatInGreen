import express, { Request, Response } from 'express'
import argon2 from 'argon2'

import { createToken } from '../../authentication'
import { handleGenericError } from '../../error_handling'
import { User, Users, getUserInfo } from '../../models/user'

const router = express.Router()

router.post('/', async (req: Request, res: Response) => {
    try {
        const email = req.body.email
        const password = req.body.password

        if(email == undefined || password == undefined) {
            return res.status(422).json({ error: 'email and password fields are required' })
        }

        const user: User | null = await Users.findOne({email})

        if(user == null || !await argon2.verify(user.password, password.toString())) {
            return res.status(404).json({error: 'Wrong email or password.'})
        }

        const token = createToken(user._id.toString())
        return res.status(200).json({ token: token, user: getUserInfo(user) })
    }
    catch(error) {
        return handleGenericError(error, res)
    }
})

export default router
