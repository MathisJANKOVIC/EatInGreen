import express, { Request, Response } from 'express'
import bcrypt from 'bcrypt'

import { User, Users } from '../../models/user'
import { generateToken, getFields } from '../../utils'

const router = express.Router()

router.post('/', async (req: Request, res: Response) => {

    const email = req.body.email
    const password = req.body.password

    if(email === undefined || password === undefined) {
        return res.status(422).json({error: 'All required fields must be specified'} )
    }

    const user: User | null = await Users.findOne({email})

    if(user === null || !await bcrypt.compare(password.toString(), user.password)) {
        return res.status(404).json({error: 'Wrong email or password'})
    }

    const token: string = generateToken(user._id)
    return res.status(200).json({ token: token, user: getFields(user) })
})

export default router
