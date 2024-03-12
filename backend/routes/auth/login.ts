import express, { Request, Response } from 'express'
import argon2 from 'argon2'

import { createToken } from '../../authentication'
import { User, Users, getUserInfo } from '../../models/user'
import { areFieldStrings, areFieldDefined } from '../../validations'

const router = express.Router()

router.post('/', async (req: Request, res: Response) => {

    const email = req.body.email
    const password = req.body.password

    if(!areFieldStrings(req.body)) {
        return res.status(422).json({error: 'All fields must of type string.'})
    }
    if(!areFieldDefined({ email, password })) {
        return res.status(422).json({error: "Fields 'email' and 'password' are required to login."} )
    }

    const user: User | null = await Users.findOne({email})

    if(user === null || !await argon2.verify(user.password, password)) {
        return res.status(404).json({error: 'Wrong email or password.'})
    }

    const token: string = createToken(user._id.toString())
    return res.status(200).json({ token: token, user: getUserInfo(user) })
})

export default router
