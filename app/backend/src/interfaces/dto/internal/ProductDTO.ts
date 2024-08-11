import EntityDTO from "./EntityDTO"

interface ProductDTO extends EntityDTO {
    name: string
    description: string
    price: number
    stock: number
    imagePaths: string[]
    userId: string
}

export default ProductDTO