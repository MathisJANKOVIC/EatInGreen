import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import express from 'express'

import User from '../../models/user'
import { jwt_secret, token_expiration } from '../../settings'

const router = express.Router()

router.post('/', async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})
    if(!user) {
        return res.status(404).send({message: 'Invalid email'})
    }

    if(await bcrypt.compare(password, user.password)) {
        const jwt_token = jwt.sign({userId: user._id}, jwt_secret, {expiresIn: token_expiration})
        res.status(200).send({token: jwt_token, user: user.toJSON()})
    } else {
        return res.status(404).send({message: 'Invalid password'})
    }
})

export default router