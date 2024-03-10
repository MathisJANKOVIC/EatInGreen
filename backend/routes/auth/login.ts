import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import express from 'express'

import User from '../../models/user'
import { jwt_secret, token_expiration } from '../../settings'

const router = express.Router()

router.post('/', async (req, res) => {

    const {email, password} = req.body

    if(!email || !password) {
        return res.status(422).json({error: 'All required fields must be specified'} )
    }

    const user = await User.findOne({email})
    if(!user) {
        return res.status(404).json({error: 'Wrong email or password'})
    }

    if(await bcrypt.compare(password, user.password)) {
        const jwt_token = jwt.sign({userId: user._id}, jwt_secret, {expiresIn: token_expiration})

        res.status(200).json({
            token: jwt_token,
            user: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }
        })
    } else {
        return res.status(404).json({error: 'Wrong email or password'})
    }
})

export default router