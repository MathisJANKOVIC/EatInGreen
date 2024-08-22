import { EntityDocument, EntityModel, entitySchema } from './entityModel'
import { ReviewDTO } from '@types-dto/reviewDTO'

import { Schema, model } from 'mongoose'

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

const ReviewModel = model<ReviewDocument, ReviewModel>('Review', reviewSchema)

export default ReviewModel