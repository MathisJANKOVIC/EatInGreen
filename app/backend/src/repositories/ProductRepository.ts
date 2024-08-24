import EntityRepository from './EntityRepository'
import { ProductDTO } from '@types-dto/productDTO'

interface ProductRepository extends EntityRepository<ProductDTO> {
    findByName(name: string): Promise<ProductDTO | null>
    findAll(limit: number): Promise<ProductDTO[]>
}

export default ProductRepository