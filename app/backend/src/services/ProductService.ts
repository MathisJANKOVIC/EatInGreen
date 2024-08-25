import ProductRepository from '@repositories/ProductRepository'
import Product from '@entities/Product'

class ProductService {
    public productRepository: ProductRepository

    constructor(repository: ProductRepository) {
        this.productRepository = repository
    }
    
    public async createProduct(product: Product): Promise <Product | null> {
        const newProduct = new Product(product)
        await this.productRepository.save(newProduct.toDto())
        return newProduct
    }

    public async getProductById(id: string): Promise <Product | null> {
        const productDTO = await this.productRepository.findById(id)
        if (productDTO) {
            return new Product(productDTO)
        } else {
            return null
        }
    }

    public async getProductByName(name: string): Promise <Product | null> {
        const productDTO = await this.productRepository.findByName(name)
        if (productDTO) {
            return new Product(productDTO)
        } else {
            return null
        }
    }

    public async getAllProduct(limit: number): Promise<Product[] | null> {
        const productDTOs = await this.productRepository.findAll(limit)

        if (productDTOs && productDTOs.length > 0) {
            return productDTOs.map(dto => new Product(dto))
        } else {
            return null
        }
    }
}

export default ProductService