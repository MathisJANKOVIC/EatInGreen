import ProductController from '../controllers/ProductController'
import asyncHandler from '../utils/asyncHandler'
import { Router } from 'express'
import { productPersistenceService } from '../main'

const prodRouter = Router()

const prodController = new ProductController(productPersistenceService)
prodRouter.post('/product', asyncHandler(prodController.createProduct.bind(prodController)))
prodRouter.get('/products', asyncHandler(prodController.getAllProducts.bind(prodController)))
prodRouter.get('/product/name/:name', asyncHandler(prodController.getProductByName.bind(prodController)))
prodRouter.get('/product/id/:id', asyncHandler(prodController.getProductById.bind(prodController)))
prodRouter.put('/product/:id', asyncHandler(prodController.updateProduct.bind(prodController)))
prodRouter.delete('/product/:id', asyncHandler(prodController.deleteProduct.bind(prodController)))


export default prodRouter
