import EntityDTO from "./EntityDTO"

interface ReviewDTO extends EntityDTO {
    rating: number
    title?: string
    comment?: string
    updatedAt: Date
    productId: string
    userId: string
}

export default ReviewDTO