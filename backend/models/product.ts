import mongoose, { Document } from 'mongoose'

const schema = new mongoose.Schema({
    label: {
        type: String,
        required: [true, 'label field is required'],
        minLength: [4, 'label cannot be shorter than 4 characters'],
        maxLength: [128, 'label cannot be longer than 64 characters'],
    },
    description: {
        type: String,
        required: [true, 'description field is required'],
        minLength: [16, 'description cannot be shorter than 16 characters'],
        maxLength: [1024, 'description cannot be longer than 1024 characters'],
    },
    keyPoints: {
        type: [{ key: String, value: String }],
        required: [true, 'keyPoints field is required'],
        minLength: [3, 'keyPoints must have at least 3 item'],
        maxLength: [16, 'keyPoints cannot have more than 16 items'],
        validator: function(keyPoints: Array<{ [key: string]: string }>) {
            keyPoints.forEach(({ key, value }) => {
                if (key.length < 3 || key.length > 32) return false
                if (value.length < 3 || value.length > 128) return false
            })
        },
        message: 'invalid keyPoints'
    },
    createdAt: { type: Date, immutable: true, default: () => Date.now() },
    price: { type: Number, required: [true, 'price field is required'] },
}, { versionKey: false })

interface Product extends Document {
    label: string
    description: string
    createdAt: Date
    price: number
}

function getProductData(product: Product) {
    return {
        id: product._id,
        label: product.label,
        description: product.description,
        createdAt: product.createdAt,
        price: product.price,
    }
}

const Products = mongoose.model('Product', schema)
export { Products, Product, getProductData }