import ProductRepository from "../repositories/ProductRepository"
import Product from "../entities/Product"

class ProductService {
    public productRepository: ProductRepository

    constructor(repository:ProductRepository) {
        this.productRepository = repository
    }

    public async createProduct(product: Product): Promise <Product | null> {
        const newProduct = new Product(product);
        await this.productRepository.save(newProduct.toDto());
        return newProduct;
    }

    public async getProductById(id:string): Promise <Product | null> {
        const productDTO = await this.productRepository.findById(id)
        if (productDTO) {
            return new Product(productDTO)
        }
        else {
            return null
        }
    }

    public async getProductByName(name:string): Promise <Product | null> {
        const productDTO = await this.productRepository.findByName(name)
        if (productDTO) {
            return new Product(productDTO)
        }
        else {
            return null
        }
    }

    public async getAllProduct(limit: number): Promise<Product[] | null> {
        const productDTOs = await this.productRepository.findAll(limit);
        
        if (productDTOs && productDTOs.length > 0) {
            return productDTOs.map(dto => new Product(dto));
        } else {
            return null;
        }
    }

    public async updateProduct(id: string, updatedData: Partial<Product>): Promise<Product | null> {
        const existingProduct = await this.getProductById(id);
        if (!existingProduct) {
            return null;
        }
        Object.assign(existingProduct, updatedData);
        await this.productRepository.save(existingProduct.toDto());
        return existingProduct;
    }
    
    public async deleteProduct(id: string): Promise<boolean> {
        const product = await this.getProductById(id);
        if (product) {
            await this.productRepository.delete(id);
            return true;
        }
        return false;
    }
    
    public async saveProduct(Product: Product): Promise<void> {
        await this.productRepository.save(Product.toDto())
    }
}

export default ProductService