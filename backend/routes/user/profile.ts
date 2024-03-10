import authenticateToken from "../../middlewares/authenticate-token"
import User from "../../models/user"

import express from "express"

const router = express.Router()

router.get('/', authenticateToken, async (req: any, res) => {
    const user = await User.findById(req.user.userId)
    res.status(200).json({
        id: user?._id,
        email: user?.email,
        firstName: user?.firstName,
        lastName: user?.lastName
    })
})

router.post('/update', authenticateToken, async (req: any, res) => {
    const user = await User.findById(req.user.userId)
    if(user) {
        user.firstName = req.body.firstName
        user.lastName = req.body.lastName
        user.password = req.body.password
        await user.save()
        res.status(200).json({
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        })
    } else {
        res.status(404).json({message: 'User not found'})
    }
})

export default router
