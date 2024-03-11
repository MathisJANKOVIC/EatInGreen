import express, { Request, Response } from 'express'
import bcrypt from 'bcrypt'

import { createToken } from '../../authentication'
import { User, Users, safeFields } from '../../models/user'

const router = express.Router()

router.post('/', async (req: Request, res: Response) => {

    const email = req.body.email
    const password = req.body.password.toString()

    if(email == undefined || password == undefined) {
        return res.status(422).json({error: 'Email and password are required to login'} )
    }

    const user: User | null = await Users.findOne({email})

    if(user === null || !await bcrypt.compare(password, user.password)) {
        return res.status(404).json({error: 'Wrong email or password'})
    }

    const token: string = createToken(user._id.toString())
    return res.status(200).json({ token: token, user: safeFields(user) })
})

export default router
