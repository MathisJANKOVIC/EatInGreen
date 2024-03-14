import express, { Request, Response } from "express"
import { Products, getProductData } from "../../models/product"

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    const products = await Products.find()
    return res.status(200).json(products.map(product => getProductData(product)))
})

export default router