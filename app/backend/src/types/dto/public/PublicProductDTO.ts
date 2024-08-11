import ProductDTO from "../internal/ProductDTO"

type PublicProductDTO = Omit<ProductDTO, 'userId'>

export default PublicProductDTO