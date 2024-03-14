import express, { Request, Response } from "express"
import { Products, getProductData } from "../../models/product"

const router = express.Router()

router.get('/:productId', async (req, res) => {
    const { productId } = req.params;

    try {
        const product = await Products.findById(productId);
        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }

        return res.status(200).json(getProductData(product));
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error retrieving product' });
    }
});

export default router