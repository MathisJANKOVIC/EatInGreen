import express, { Request, Response } from 'express'

import User from '../../entities/User'
import Encrypter from '../../lib/Encrypter'
import JsonWebToken from '../../lib/jwt'

const router = express.Router()

router.post('/', async (req: Request, res: Response) => {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const password = req.body.password

    if(password !== undefined && String(password).length < 6) {
        return res.status(422).json({ error: 'password must be at least 6 characters long' })
    }

    const hashedPassword = await Encrypter.hash(password)
    const user = new User(firstName, lastName, email, hashedPassword)
    try {
        await user.save()
    } catch (error) {
        return handleMongoError(error, res)
    }

    const jwt = JsonWebToken.createFromPayload({ userId: user.id })

    return res.status(201).json({ token: jwt.token, user: user.serializeDTO()})
})

export default router