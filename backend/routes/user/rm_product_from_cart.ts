import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import { Users, User } from '../../models/user';
import { authenticate } from '../../authentication';
import { UserRequest } from '../../authentication';

const router = express.Router();

router.delete('/:productId', authenticate, async (req: Request, res: Response) => {
    const userId = (req as UserRequest).userId
    const user = await Users.findById(userId) as User
    const { productId } = req.params;

    try {
        const productExists = user.cart.some(item => item.productId.toString() === productId);
        if (!productExists) {
            return res.status(404).send({ message: 'Product not found in cart' });
        }

        user.cart = user.cart.filter(item => item.productId.toString() !== productId);

        await user.save();
        res.send({ message: 'Product removed from cart' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error removing product from cart' });
    }
});

export default router;