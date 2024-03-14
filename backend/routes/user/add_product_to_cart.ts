import express from 'express';
import mongoose from 'mongoose';
import { Users, User } from '../../models/user';
import { authenticate } from '../../authentication';
import { UserRequest } from '../../authentication';

const router = express.Router();

router.post('/', authenticate, async (req, res) => {
    const userId = (req as UserRequest).userId
    const user = await Users.findById(userId) as User
    const { id: productId } = req.params

    const { quantity } = req.body;

    try {
        const productExists = user.cart.some(item => item.productId.toString() === productId);
        if (productExists) {
            user.cart = user.cart.map(item =>
                item.productId.toString() === productId
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            );
        } else {
            user.cart.push({ productId: new mongoose.Types.ObjectId(productId), quantity });
        }

        await user.save();
        res.send({ message: 'Product added to cart' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error adding product to cart' });
    }
});

export default router;