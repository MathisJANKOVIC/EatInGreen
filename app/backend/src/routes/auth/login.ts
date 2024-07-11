import express, { Request, Response } from 'express'

import User from '../../entities/User'
import Encrypter from '../../lib/Encrypter'
import JsonWebToken from '../../lib/JsonWebToken'

const router = express.Router()

router.post('/', async (req: Request, res: Response) => {
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
    return res.status(200).json({ token: jwt.token, user: user.serializeDTO() })
})

export default router
