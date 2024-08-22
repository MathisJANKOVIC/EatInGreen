import { EntityDocument, EntityModel, entitySchema } from './entityModel'
import { ProductDTO } from '../../types/dto/productDTO'

import { Schema, model } from 'mongoose'

type ProductDocument = EntityDocument<ProductDTO> & Omit<ProductDTO, 'id'>
type ProductModel = EntityModel<ProductDocument, ProductDTO>

const productSchema = new Schema<ProductDocument>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    imagePaths: { type: [String], required: true },
    userId: { type: String, required: true, immutable: true }
})
productSchema.add(entitySchema)

const ProductModel = model<ProductDocument, ProductModel>('Product', productSchema)

export default ProductModel