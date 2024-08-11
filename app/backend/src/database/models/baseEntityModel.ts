import EntityDTO from "../../types/dto/internal/EntityDTO"

import { Document, Model, Schema } from "mongoose"

interface EntityDocument<TEntityDTO> extends Document, Omit<EntityDTO, 'id'> {
    publicId: string
    toDto(): TEntityDTO
}

interface EntityModel<TEntityDocument, TEntityDTO> extends Model<TEntityDocument> {
    fromDto(entityDto: TEntityDTO): TEntityDocument
}

const entitySchema = new Schema<EntityDocument<EntityDTO>>({
    publicId: { type: String, required: true, immutable: true, unique: true },
    createdAt: { type: Date, required: true, immutable: true},
}, { versionKey: false }
)

entitySchema.methods.toDto = function(): EntityDTO {
    const { publicId, ...entityWithoutId } = this.toObject()
    return { id: publicId, ...entityWithoutId }
}

entitySchema.statics.fromDto = function(entityDto: EntityDTO): EntityDocument<EntityDTO> {
    const entityDoc = { publicId: entityDto.id, ...entityDto }
    return new this(entityDoc)
}

export { entitySchema, EntityModel, EntityDocument }