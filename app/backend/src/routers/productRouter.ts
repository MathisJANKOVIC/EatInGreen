import ProductController from '@controllers/ProductController'
import asyncHandler from '@utils/asyncHandler'
import { productService } from '@/main'

import { Router } from 'express'

const productRouter = Router()

const prodController = new ProductController(productService)
productRouter.post('/product', asyncHandler(prodController.createProduct.bind(prodController)))
productRouter.get('/products', asyncHandler(prodController.getAllProducts.bind(prodController)))
productRouter.get('/product/name/:name', asyncHandler(prodController.getProductByName.bind(prodController)))
productRouter.get('/product/id/:id', asyncHandler(prodController.getProductById.bind(prodController)))
productRouter.put('/product/:id', asyncHandler(prodController.updateProduct.bind(prodController)))
productRouter.delete('/product/:id', asyncHandler(prodController.deleteProduct.bind(prodController)))


export default productRouter
