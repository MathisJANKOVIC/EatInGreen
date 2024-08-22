import { ProductDTO } from '../types/dto/productDTO'
import { createEntityId } from '../lib/uid'
import Product from '../entities/Product'

class ProductFactory {
    public static createProduct(productData: {
        name: string
        description: string
        price: number
        stock: number
        imagePaths: string[]
        userId: string
    }): Product {
        return new Product ({
            id: createEntityId('Product'),
            createdAt: new Date(),
            name: productData.name,
            description: productData.description,
            price: productData.price,
            stock: productData.stock,
            imagePaths: productData.imagePaths,
            userId: productData.userId
        })
    }

    public static createProductFromDto(productDTO: ProductDTO): Product {
        return new Product(productDTO)
    }
}
export default ProductFactory