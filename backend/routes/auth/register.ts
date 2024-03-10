import express from 'express'
import jwt from 'jsonwebtoken'

import User from '../../models/user'
import { jwt_secret, token_expiration } from '../../settings'

const router = express.Router()

router.post('/', async (req, res) => {

    const { email, password, firstName, lastName } = req.body

    if(!email || !password || !firstName || !lastName) {
        return res.status(422).json({error: 'All required fields must be specified'})
    }
    if(!/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(422).json({error: 'Invalid email'})
    }
    if(password.length < 6) {
        return res.status(422).json({error: 'Password cannot be shorter than 6 characters'})
    }

    const userWithSameEmail = await User.findOne({email})
    if(userWithSameEmail) {
        return res.status(409).json({error: 'User with this email already exists'})
    }

    const user = new User({ email, password, firstName, lastName })
    await user.save()

    const jwt_token = jwt.sign({userId: user._id}, jwt_secret, {expiresIn: token_expiration})
    res.status(201).json({
        token: jwt_token,
        user: {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        }
    })
})

export default router