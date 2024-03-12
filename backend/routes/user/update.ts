import express, { Request, Response} from 'express'

import { Users, User, getUserInfo } from '../../models/user'
import { FieldValidator, areAllFieldsUndefined } from '../../validations'
import { UserRequest, authenticate, hashPassword} from '../../authentication'

const router = express.Router()

router.patch('/', authenticate, async (req: Request, res: Response) => {
    const userId = (req as UserRequest).userId
    const user = await Users.findById(userId) as User

    const newFullName = req.body.newFullName
    const newPassword = req.body.newPassword
    const addresses = req.body.addresses

    if(areAllFieldsUndefined({ newFullName, newPassword, newAddresses: addresses })){
        return res.status(422).json({error: 'At least one field must be defined to update the user.'})
    }

    if(newFullName !== undefined){
        if(!FieldValidator.fullName.isValid(newFullName)) {
            return res.status(422).json({error: FieldValidator.fullName.requirement})
        }
        user.fullName = newFullName
    }
    if(newPassword !== undefined){
        if(!FieldValidator.password.isValid(newPassword)) {
            return res.status(422).json({error: FieldValidator.password.requirement})
        }
        user.password = await hashPassword(newPassword)
    }
    if(addresses !== undefined){
        if(!FieldValidator.addresses.isValid(addresses)) {
            return res.status(422).json({error: FieldValidator.addresses.requirement})
        }
        user.addresses = addresses
    }

    user.save()
    return res.status(200).json({user: getUserInfo(user)})
})

export default router