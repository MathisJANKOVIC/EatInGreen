import ReviewDTO from "../internal/ReviewDTO"

interface PublicReviewDTO extends Omit<ReviewDTO, 'userId'> {}

export default PublicReviewDTO