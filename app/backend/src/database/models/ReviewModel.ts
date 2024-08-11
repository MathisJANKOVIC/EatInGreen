import { EntityDocument, EntityModel, entitySchema } from "./baseEntityModel"
import ReviewDTO from "../../interfaces/dto/internal/ReviewDTO"

import mongoose, { Schema } from "mongoose"

type ReviewDocument = EntityDocument<ReviewDTO> & Omit<ReviewDTO, 'id'>
type ReviewModel = EntityModel<ReviewDocument, ReviewDTO>

const reviewSchema = new Schema<ReviewDocument>({
    rating: { type: Number, required: true, min: 0, max: 5 },
    title: { type: String },
    comment: { type: String },
    updatedAt: { type: Date, required: true },
    userId: { type: String, required: true, immutable: true },
    productId: { type: String, required: true, immutable: true }
})
reviewSchema.add(entitySchema)

const ReviewModel = mongoose.model<ReviewDocument, ReviewModel>('Review', reviewSchema)

export default ReviewModel