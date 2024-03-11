import express, { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import fs from 'fs'
 
import { createToken } from '../../authentication'
import { Users, safeFields } from '../../models/user'

const settings = JSON.parse(fs.readFileSync('./settings.json').toString())
const router = express.Router()

router.post('/', async (req: Request, res: Response) => {

    const fullName = req.body.fullName
    const email = req.body.email
    const password = req.body.password

    if(email === undefined || password === undefined || fullName === undefined) {
        return res.status(422).json({error: 'All required fields must be specified'})
    }
    if(typeof fullName !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
        return res.status(422).json({error: 'All fields must be of type string'})
    }
    if(!/^[A-Za-zÀ-ÖØ-öø-ÿ\- ]+$/.test(fullName)) {
        return res.status(422).json({error: 'Invalid full name, only letters, spaces and hyphens are allowed'});
    }
    if(!/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(422).json({error: 'Invalid email'})
    }
    if(await Users.findOne({email})){
        return res.status(409).json({error: 'User with this email already exists'})
    }
    if(password.length < settings.minPasswordLength) {
        return res.status(422).json({error: `Password cannot be shorter than ${settings.minPasswordLength} characters`})
    }
    const hashedPassword: string = await bcrypt.hash(password, 10)

    const user = new Users({
        email: email,
        password: hashedPassword,
        fullName: fullName,
        addresses: []
    })
    await user.save()

    const token: string = createToken(user._id.toString())
    return res.status(201).json({ token: token, user: safeFields(user)})
})

export default router