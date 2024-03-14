import mongoose, { Document } from 'mongoose'

const schema = new mongoose.Schema({
    title: { type: String, required: [true, 'title field is required'] },
    description: { type: String, required: [true, 'description field is required'] },
    createdAt: { type: Date, immutable: true, default: () => Date.now() },
    price: { type: Number, required: [true, 'price field is required'] },
}, { versionKey: false })

interface Product extends Document {
    title: string
    description: string
    createdAt: Date
    price: number
}

function getProductData(product: Product) {
    return {
        id: product._id,
        title: product.title,
        description: product.description,
        createdAt: product.createdAt,
        price: product.price,
    }
}

const Products = mongoose.model('Product', schema)
export { Products, Product, getProductData }