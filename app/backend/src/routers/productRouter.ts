import ProductController from '@controllers/ProductController'
import asyncHandler from '@utils/asyncHandler'
import { productService } from '@/main'

import { Router } from 'express'

const productRouter = Router()

const productController = new ProductController(productService)

productRouter.get('/products', asyncHandler(productController.getAllProducts.bind(productController)))
productRouter.get('/products/:id', asyncHandler(productController.getProductById.bind(productController)))
productRouter.get('/products/:name', asyncHandler(productController.getProductByName.bind(productController)))
productRouter.post('/products', asyncHandler(productController.createProduct.bind(productController)))

export default productRouter
