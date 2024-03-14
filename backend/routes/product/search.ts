import express from 'express';
import { Products } from '../../models/product'

const router = express.Router();

router.get('/', async (req, res) => {
    const title = req.query.title as string;

    if (!title) {
        return res.status(400).json({ error: 'Missing title query parameter' });
    }

    try {
        const products = await Products.find({ title: new RegExp(title, 'i') });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'There was a problem searching the products' });
    }
});

export default router;