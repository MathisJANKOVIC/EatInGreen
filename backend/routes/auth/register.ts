import jwt from 'jsonwebtoken'
import express from 'express'

import User from '../../models/user'
import { jwt_secret, token_expiration } from '../../settings'

const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body
        const user = new User({email, password, firstName, lastName})
        await user.save()

        const jwt_token = jwt.sign({userId: user._id}, jwt_secret, {expiresIn: token_expiration})
        res.status(201).send({
            token: jwt_token,
            user: {
                id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }
        })
    } catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : 'An unknown error occurred'
        res.status(500).send({message: errorMessage})
    }
})

export default router