import ProductDTO from "../internal/ProductDTO"

interface PublicProductDTO extends Omit<ProductDTO, 'userId'> {}

export default PublicProductDTO