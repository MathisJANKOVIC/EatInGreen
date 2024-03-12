import express, { Request, Response } from 'express'

import { Users, getUserInfo } from '../../models/user'
import { hashPassword, createToken } from '../../authentication'
import { FieldValidator, areFieldStrings, areFieldDefined } from '../../validations'

const router = express.Router()

router.post('/', async (req: Request, res: Response) => {

    const fullName = req.body.fullName
    const email = req.body.email
    const password = req.body.password

    if(!areFieldStrings(req.body)) {
        return res.status(422).json({error: 'All fields must be of type string.'})
    }
    if(!areFieldDefined({ fullName, email, password })) {
        return res.status(422).json({error: "Fields 'fullName', 'email' and 'password' are required to register."})
    }
    if(!FieldValidator.fullName.isValid(fullName)) {
        return res.status(422).json({error: FieldValidator.fullName.requirement})
    }
    if(!FieldValidator.email.isValid(email)) {
        return res.status(422).json({error: FieldValidator.email.requirement})
    }
    if(await Users.findOne({email})){
        return res.status(409).json({error: 'User with this email already exists.'})
    }
    if(!FieldValidator.password.isValid(password)) {
        return res.status(422).json({error: FieldValidator.password.requirement})
    }
    const hashedPassword = await hashPassword(password)

    const user = new Users({
        email: email,
        password: hashedPassword,
        fullName: fullName,
        addresses: []
    })
    await user.save()

    const token: string = createToken(user._id.toString())
    return res.status(201).json({ token: token, user: getUserInfo(user)})
})

export default router