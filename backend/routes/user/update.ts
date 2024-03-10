import express, { Request, Response} from 'express'
import bcrypt from 'bcrypt'

import { getFields } from '../../utils'
import { UserRequest } from '../../types'
import { Users, User } from '../../models/user'
import { minPasswordLength } from '../../settings'
import authenticate from '../../middlewares/authentication'

const router = express.Router()

router.patch('/', authenticate, async (req: Request, res: Response) => {
    const userId = (req as UserRequest).user.userId
    const user = await Users.findById(userId) as User

    const newFullName = req.body.fullName
    const newPassword = req.body.newPassword

    if(newFullName !== undefined) {
        if(!/^[A-Za-zÀ-ÖØ-öø-ÿ\- ]+$/.test(newFullName)) {
            return res.status(422).json({error: 'Invalid full name, only letters, spaces and hyphens are allowed'});
        }
        user.fullName = newFullName
    }
    if(newPassword !== undefined) {
        const password = req.body.password

        if(newPassword.length < minPasswordLength) {
            return res.status(422).json({error: `Password cannot be shorter than ${minPasswordLength} characters`})
        }
        if(password === undefined) {
            return res.status(422).json({error: 'Current password is required to change the password'})
        }
        if(!await bcrypt.compare(password, user.password)) {
            return res.status(401).json({error: 'Invalid password'})
        }
        user.password = await bcrypt.hash(newPassword.toString(), 10)
    }

    user.save()
    return res.status(200).json({user: getFields(user)})
})

export default router