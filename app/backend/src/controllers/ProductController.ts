import ProductFactory from '@factories/ProductFactory'
import ProductService from '@services/ProductService'
import HTTPError from '@utils/HTTPError'

import { Request, Response } from 'express'

class ProductController {
    private readonly productService: ProductService

    constructor(productService: ProductService) {
        this.productService = productService
    }

    public async createProduct(req: Request, res: Response): Promise<void> {
        const product = ProductFactory.createProduct(req.body)

        const newProduct = await this.productService.createProduct(product)
        res.status(201).json(newProduct)
    }

    public async getProductById(req: Request, res: Response): Promise<void> {
        const { id } = req.params

        if (!id) {
            throw new HTTPError(400, 'Product ID is required')
        }

        const product = await this.productService.getProductById(id)
        if (!product) {
            throw new HTTPError(404, 'Product not found')
        }
        res.status(200).json(product)
    }

    public async getProductByName(req: Request, res: Response): Promise<void> {
        const name: string | undefined = req.params.name

        if (!name) {
            throw new HTTPError(400, 'Product name is required')
        }

        const product = await this.productService.getProductByName(name)
        if (!product) {
            throw new HTTPError(404, 'Product not found')
        }
        res.status(200).json(product)
    }

    public async getAllProducts(req: Request, res: Response): Promise<void> {
        const limit = parseInt(req.query.limit as string) || 30
        const products = await this.productService.getAllProduct(limit)
        if (!products || products.length === 0) {
            throw new HTTPError(404, 'No products found')
        }
        res.status(200).json(products)
    }
}

export default ProductController
