import express, { Request, Response} from 'express'
import bcrypt from 'bcrypt'

import { Users } from '../../models/user'
import { minPasswordLength } from '../../settings'
import { generateToken, getFields } from '../../utils'

const router = express.Router()

router.post('/', async (req: Request, res: Response) => {

    const fullName = req.body.fullName
    const email = req.body.email
    const password = req.body.password

    if(!/^[A-Za-zÀ-ÖØ-öø-ÿ\- ]+$/.test(fullName)) {
        return res.status(422).json({error: 'Invalid full name, only letters, spaces and hyphens are allowed'});
    }
    if(email == undefined || password == undefined || fullName == undefined) {
        return res.status(422).json({error: 'All required fields must be specified'})
    }
    if(!/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(422).json({error: 'Invalid email'})
    }
    if(await Users.findOne({email})){
        return res.status(409).json({error: 'User with this email already exists'})
    }
    if(password.length < minPasswordLength) {
        return res.status(422).json({error: `Password cannot be shorter than ${minPasswordLength} characters`})
    }

    const hashedPassword: string = await bcrypt.hash(password.toString(), 10)

    const user = new Users({
        email: email,
        password: hashedPassword,
        fullName: fullName,
        addresses: []
    })
    await user.save()

    const token: string = generateToken(user._id.toString())
    return res.status(201).json({ token: token, user: getFields(user)})
})

export default router