import express from 'express';
import { Products } from '../../models/product';

const router = express.Router();

router.post('/', async (req, res) => {
    const products = [
        { title: 'Apple iPhone 13', description: 'Latest model of iPhone with A15 Bionic chip', price: 799 },
        { title: 'Samsung Galaxy S21', description: 'Flagship Samsung phone with Exynos 2100', price: 699 },
        { title: 'Google Pixel 6', description: 'Google\'s latest phone with Google Tensor chip',price: 599 },
        { title: 'Sony WH-1000XM4', description: 'High quality noise cancelling headphones', price: 349 },
        { title: 'Apple MacBook Pro', description: 'Latest MacBook Pro with M1 Pro chip', price: 1999 },
    ];

    try {
        await Products.insertMany(products);
        res.status(200).json({ message: 'Products inserted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'There was a problem inserting the products' });
    }
});

export default router