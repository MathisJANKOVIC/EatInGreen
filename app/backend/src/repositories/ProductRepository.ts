import EntityRepository from "./EntityRepository"
import { ProductDTO } from "types/dto/productDTO"

interface ProductRepository extends EntityRepository<ProductDTO> {
    FindByName(name:string): Promise<ProductDTO | null>
    FindAll(limit:number): Promise<ProductDTO[]> 
}

export default ProductRepository