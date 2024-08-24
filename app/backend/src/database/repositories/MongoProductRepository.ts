import ProductRepository from '@repositories/ProductRepository'
import { ProductDTO } from '@types-dto/productDTO'
import ProductModel from '../models/ProductModel'

class MongoProductRepository implements ProductRepository {
    public async findById(id: string): Promise<ProductDTO | null> {
        const productDocument = await ProductModel.findOne({ publicId: id }).exec()
        if (productDocument) {
            return productDocument.toDto()
        }
        return null
    }

    public async findByName(name: string): Promise<ProductDTO | null> {
        const productDocument = await ProductModel.findOne({ name }).exec()
        if (productDocument) {
            return productDocument.toDto()
        }
        return null
    }

    public async findAll(limit: number): Promise<ProductDTO[]> {
        const productDocuments = await ProductModel.find().limit(limit).exec()
        return productDocuments.map(doc => doc.toDto())
    }

    public async save(productDto: ProductDTO): Promise<void> {
        const productDocument = ProductModel.fromDto(productDto)
        await productDocument.save()
    }
}

export default MongoProductRepository
