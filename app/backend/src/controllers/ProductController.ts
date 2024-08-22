import ProductService from '@services/ProductService'
import ProductFactory from '@factories/ProductFactory'
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
        try {
            const { id } = req.params

            if (!id) {
                throw new HTTPError(400, 'Product ID is required')
            }

            const product = await this.productService.getProductById(id)
            if (!product) {
                throw new HTTPError(404, 'Product not found')
            }
            res.status(200).json(product)
        } catch (error) {
            console.error('Error retrieving product by ID:', error)
            throw new HTTPError(500, 'Failed to retrieve product by ID')
        }
    }

    public async getProductByName(req: Request, res: Response): Promise<void> {
        try {
            const name: string | undefined = req.params.name

            if (!name) {
                throw new HTTPError(400, 'Product name is required')
            }

            const product = await this.productService.getProductByName(name)
            if (!product) {
                throw new HTTPError(404, 'Product not found')
            }
            res.status(200).json(product)
        } catch (error) {
            console.error('Error retrieving product by name:', error)
            throw new HTTPError(500, 'Failed to retrieve product')
        }
    }

    public async getAllProducts(req: Request, res: Response): Promise<void> {
        try {
            const limit = parseInt(req.query.limit as string) || 30
            const products = await this.productService.getAllProduct(limit)
            if (!products || products.length === 0) {
                throw new HTTPError(404, 'No products found')
            }
            res.status(200).json(products)
        } catch (error) {
            console.error('Error retrieving all products:', error)
            throw new HTTPError(500, 'Failed to retrieve products')
        }
    }

    public async updateProduct(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params
            const updatedData = req.body

            if (!id) {
                throw new HTTPError(400, 'Product ID is required')
            }

            const updatedProduct = await this.productService.updateProduct(id, updatedData)
            if (!updatedProduct) {
                throw new HTTPError(404, 'Product not found')
            }

            res.status(200).json(updatedProduct)
        } catch (error) {
            console.error('Error updating product:', error)
            throw new HTTPError(500, 'Failed to update product')
        }
    }

    public async deleteProduct(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params

            if (!id) {
                throw new HTTPError(400, 'Product ID is required')
            }

            const deleted = await this.productService.deleteProduct(id)
            if (!deleted) {
                throw new HTTPError(404, 'Product not found')
            }

            res.status(200).json({ message: 'Product successfully deleted' })
        } catch (error) {
            console.error('Error deleting product:', error)
            throw new HTTPError(500, 'Failed to delete product')
        }
    }

}

export default ProductController
