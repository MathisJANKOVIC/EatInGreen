import ReviewDTO from "../internal/ReviewDTO"

type PublicReviewDTO = Omit<ReviewDTO, 'userId'>

export default PublicReviewDTO