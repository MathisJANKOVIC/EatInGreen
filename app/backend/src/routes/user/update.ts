import express, { Request, Response} from 'express'

import { handleGenericError, handleMongoError } from '../../lib/errorHandling'
import { UserRequest, authenticate } from '../../middlewares/authentication'

const router = express.Router()

router.patch('/', authenticate, async (req: Request, res: Response) => {
    // try {
    //     const userId = (req as UserRequest).userId
    //     const user = await Users.findById(userId) as User

    //     const newFullName = req.body.newFullName
    //     const newPassword = req.body.newPassword
    //     const addresses = req.body.addresses

    //     if(newFullName == undefined && newPassword == undefined && addresses == undefined) {
    //         return res.status(422).json({ error: 'no fields to update were provided' })
    //     }
    //     if(newPassword != undefined && newPassword.toString().length < 6) {
    //         return res.status(422).json({ error: 'password must be at least 6 characters long' })
    //     }

    //     if(newFullName != undefined) {
    //         user.fullName = newFullName
    //     }
    //     if(newPassword != undefined) {
    //         user.password = newPassword
    //     }
    //     if(addresses != undefined) {
    //         user.addresses = addresses
    //     }

    //     try {
    //         await user.save()
    //     } catch(error) {
    //         return handleMongoError(error, res)
    //     }
    //     return res.status(200).json({ user: getUserInfo(user) })
    // }
    // catch(error) {
    //     return handleGenericError(error, res)
    // }
    return res.status(200).json({ user: "ok" })
})

export default router