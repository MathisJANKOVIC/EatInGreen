import express, { Request, Response } from 'express'

import { handleGenericError } from '../../lib/errorHandling'
import JsonWebToken from '../../lib/JsonWebToken'
import Encrypter from '../../lib/Encrypter'
import User from '../../entities/User'

const router = express.Router()

router.post('/', async (req: Request, res: Response) => {
    try {
        const email = req.body.email
        const password = req.body.password

        if(email === undefined || password === undefined) {
            return res.status(422).json({ error: 'fields email and password are required' })
        }

        const user = await User.findByEmail(email)

        if(user == null || !await Encrypter.matchHash(password, user.password)) {
            return res.status(404).json({ error: 'wrong email or password' })
        }

        const jwt = JsonWebToken.createFromPayload({ userId: user.id })
        return res.status(200).json({ token: jwt.token, user: user.serialize() })
    }
    catch(error) {
        return handleGenericError(error, res)
    }
})

export default router
