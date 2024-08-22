import EntityRepository from './EntityRepository'
import { ProductDTO } from '../types/dto/productDTO'

interface ProductRepository extends EntityRepository<ProductDTO> {
    findByName(name: string): Promise<ProductDTO | null>
    findAll(limit: number): Promise<ProductDTO[]>
    delete(id: string): Promise<ProductDTO | null>
}

export default ProductRepository